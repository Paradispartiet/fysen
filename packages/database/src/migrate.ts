import { readdir, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import type { Pool, QueryResultRow } from "pg";
import { createDatabasePool } from "./client.js";

const migrationDirectory = new URL("../migrations/", import.meta.url);
const migrationLockName = "fysen-schema-migrations-v1";

interface MigrationRow extends QueryResultRow {
  version: string;
}

export async function listMigrationFiles(): Promise<readonly string[]> {
  const entries = await readdir(migrationDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && /^\d{4}_.+\.sql$/.test(entry.name))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, "en"));
}

export async function runMigrations(pool: Pool): Promise<readonly string[]> {
  const client = await pool.connect();
  const appliedNow: string[] = [];

  try {
    await client.query("CREATE SCHEMA IF NOT EXISTS fysen");
    await client.query(`
      CREATE TABLE IF NOT EXISTS fysen.schema_migrations (
        version text PRIMARY KEY,
        applied_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    await client.query("SELECT pg_advisory_lock(hashtext($1))", [migrationLockName]);
    try {
      const appliedResult = await client.query<MigrationRow>("SELECT version FROM fysen.schema_migrations");
      const applied = new Set(appliedResult.rows.map((row) => row.version));

      for (const fileName of await listMigrationFiles()) {
        const version = fileName.replace(/\.sql$/, "");
        if (applied.has(version)) continue;

        const sql = await readFile(new URL(fileName, migrationDirectory), "utf8");
        await client.query("BEGIN");
        try {
          await client.query(sql);
          await client.query("INSERT INTO fysen.schema_migrations(version) VALUES ($1)", [version]);
          await client.query("COMMIT");
          appliedNow.push(version);
        } catch (error) {
          await client.query("ROLLBACK");
          throw error;
        }
      }
    } finally {
      await client.query("SELECT pg_advisory_unlock(hashtext($1))", [migrationLockName]);
    }
  } finally {
    client.release();
  }

  return appliedNow;
}

async function main(): Promise<void> {
  const pool = createDatabasePool();
  try {
    const applied = await runMigrations(pool);
    process.stdout.write(`${JSON.stringify({ applied })}\n`);
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
