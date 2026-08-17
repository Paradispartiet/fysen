import { pathToFileURL } from "node:url";
import type { Pool, QueryResultRow } from "pg";
import { createDatabasePool } from "./client.js";
import { listMigrationFiles } from "./migrate.js";

const requiredExtensions = ["pgcrypto", "postgis", "pg_trgm"] as const;
const requiredTables = [
  "fysen.restaurants",
  "fysen.menu_sources",
  "fysen.menu_snapshots",
  "fysen.menu_items",
  "fysen.menu_changes",
  "fysen.menu_watch_runs",
  "fysen.search_events",
  "fysen.search_result_impressions",
  "fysen.conversion_events",
  "fysen.restaurant_actions",
  "fysen.restaurant_action_verification_runs",
  "fysen.schema_migrations",
] as const;

interface MigrationRow extends QueryResultRow {
  version: string;
}

interface ExtensionRow extends QueryResultRow {
  extname: string;
}

interface RelationRow extends QueryResultRow {
  relation_name: string;
  resolved_name: string | null;
}

export interface ProductionDatabaseVerification {
  readonly migrations: readonly string[];
  readonly extensions: readonly string[];
  readonly relations: readonly string[];
}

export async function verifyProductionDatabase(pool: Pool): Promise<ProductionDatabaseVerification> {
  const expectedMigrations = (await listMigrationFiles()).map((fileName) => fileName.replace(/\.sql$/, ""));

  const migrationsResult = await pool.query<MigrationRow>(
    "SELECT version FROM fysen.schema_migrations ORDER BY version",
  );
  const appliedMigrations = migrationsResult.rows.map((row) => row.version);
  const appliedSet = new Set(appliedMigrations);
  const expectedSet = new Set(expectedMigrations);
  const missingMigrations = expectedMigrations.filter((version) => !appliedSet.has(version));
  const unexpectedMigrations = appliedMigrations.filter((version) => !expectedSet.has(version));

  const extensionsResult = await pool.query<ExtensionRow>(
    "SELECT extname FROM pg_extension WHERE extname = ANY($1::text[]) ORDER BY extname",
    [requiredExtensions],
  );
  const installedExtensions = extensionsResult.rows.map((row) => row.extname);
  const installedExtensionSet = new Set(installedExtensions);
  const missingExtensions = requiredExtensions.filter((extension) => !installedExtensionSet.has(extension));

  const relationsResult = await pool.query<RelationRow>(
    `SELECT relation_name, to_regclass(relation_name)::text AS resolved_name
       FROM unnest($1::text[]) AS relations(relation_name)
      ORDER BY relation_name`,
    [requiredTables],
  );
  const missingRelations = relationsResult.rows
    .filter((row) => row.resolved_name === null)
    .map((row) => row.relation_name);

  if (missingMigrations.length > 0 || unexpectedMigrations.length > 0 || missingExtensions.length > 0 || missingRelations.length > 0) {
    throw new Error(
      `Production database verification failed: ${JSON.stringify({
        missingMigrations,
        unexpectedMigrations,
        missingExtensions,
        missingRelations,
      })}`,
    );
  }

  return {
    migrations: appliedMigrations,
    extensions: installedExtensions,
    relations: relationsResult.rows.map((row) => row.resolved_name).filter((value): value is string => value !== null),
  };
}

async function main(): Promise<void> {
  const pool = createDatabasePool({ maxConnections: 2 });
  try {
    const verification = await verifyProductionDatabase(pool);
    process.stdout.write(`${JSON.stringify({ status: "verified", ...verification })}\n`);
  } finally {
    await pool.end();
  }
}

const invokedPath = process.argv[1];
if (invokedPath && import.meta.url === pathToFileURL(invokedPath).href) {
  void main().catch((error: unknown) => {
    const message = error instanceof Error ? error.stack ?? error.message : String(error);
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
  });
}
