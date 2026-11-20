import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import type { Pool, QueryResultRow } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { listMigrationFiles, runMigrations } from "./migrate.js";
import { verifyProductionDatabase } from "./verify-production.js";
import { ConcurrentMenuUpdateError, MenuIndexRepository } from "./repository.js";

interface DistanceRow extends QueryResultRow {
  meters: number;
}

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("MenuIndexRepository integration", () => {
  let pool: Pool;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.restaurants CASCADE");
  });

  afterAll(async () => {
    await pool.end();
  });

  it("persists geolocation, shared menu URLs and repeatable immutable observations safely", async () => {
    const repository = new MenuIndexRepository(pool);
    const suffix = randomUUID();
    const restaurantId = await repository.upsertRestaurant({
      slug: `integration-${suffix}`,
      name: "Fysen Integration Restaurant",
      websiteUrl: "https://example.com/",
      address: "Testgata 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.9139,
      longitude: 10.7522,
    });
    const sourceUrl = `https://example.com/menu/${suffix}`;
    const source = await repository.upsertMenuSource({
      restaurantId,
      url: sourceUrl,
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 720,
      minimumExpectedItems: 1,
    });

    const firstFetchedAt = new Date().toISOString();
    const firstSnapshotId = await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: null,
      fetchedAt: firstFetchedAt,
      startedAt: firstFetchedAt,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "a".repeat(64),
      normalizedSha256: "b".repeat(64),
      normalizedText: "Biff tartar 225",
      etag: "integration-etag-a",
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 12,
      extractorVersion: "integration-test",
      items: [
        {
          sourceKey: "c".repeat(64),
          name: "Biff tartar",
          normalizedName: "biff tartar",
          description: null,
          sectionName: "Forretter",
          priceMinor: 22500,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.9,
          sourceExcerpt: "Biff tartar 225",
        },
      ],
      changes: [
        {
          itemSourceKey: "c".repeat(64),
          kind: "added",
          before: null,
          after: { name: "Biff tartar", priceMinor: 22500 },
        },
      ],
    });

    await expect(
      repository.recordSnapshot({
        menuSourceId: source.id,
        expectedPreviousSnapshotId: null,
        fetchedAt: new Date(Date.now() + 500).toISOString(),
        startedAt: firstFetchedAt,
        httpStatus: 200,
        responseContentType: "text/html",
        rawSha256: "d".repeat(64),
        normalizedSha256: "e".repeat(64),
        normalizedText: "Stale concurrent writer",
        etag: null,
        lastModified: null,
        robotsAllowed: true,
        fetchDurationMs: 1,
        extractorVersion: "integration-test",
        items: [],
        changes: [],
      }),
    ).rejects.toBeInstanceOf(ConcurrentMenuUpdateError);

    const secondFetchedAt = new Date(Date.now() + 1000).toISOString();
    const secondSnapshotId = await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: firstSnapshotId,
      fetchedAt: secondFetchedAt,
      startedAt: secondFetchedAt,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "d".repeat(64),
      normalizedSha256: "e".repeat(64),
      normalizedText: "Ramen 249",
      etag: "integration-etag-b",
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 10,
      extractorVersion: "integration-test",
      items: [
        {
          sourceKey: "f".repeat(64),
          name: "Ramen",
          normalizedName: "ramen",
          description: null,
          sectionName: null,
          priceMinor: 24900,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.9,
          sourceExcerpt: "Ramen 249",
        },
      ],
      changes: [
        {
          itemSourceKey: "c".repeat(64),
          kind: "removed",
          before: { name: "Biff tartar", priceMinor: 22500 },
          after: null,
        },
        {
          itemSourceKey: "f".repeat(64),
          kind: "added",
          before: null,
          after: { name: "Ramen", priceMinor: 24900 },
        },
      ],
    });

    const thirdFetchedAt = new Date(Date.now() + 2000).toISOString();
    const thirdSnapshotId = await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: secondSnapshotId,
      fetchedAt: thirdFetchedAt,
      startedAt: thirdFetchedAt,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "a".repeat(64),
      normalizedSha256: "b".repeat(64),
      normalizedText: "Biff tartar 225",
      etag: "integration-etag-c",
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 9,
      extractorVersion: "integration-test",
      items: [
        {
          sourceKey: "c".repeat(64),
          name: "Biff tartar",
          normalizedName: "biff tartar",
          description: null,
          sectionName: "Forretter",
          priceMinor: 22500,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.9,
          sourceExcerpt: "Biff tartar 225",
        },
      ],
      changes: [
        {
          itemSourceKey: "f".repeat(64),
          kind: "removed",
          before: { name: "Ramen", priceMinor: 24900 },
          after: null,
        },
        {
          itemSourceKey: "c".repeat(64),
          kind: "added",
          before: null,
          after: { name: "Biff tartar", priceMinor: 22500 },
        },
      ],
    });

    expect(thirdSnapshotId).not.toBe(firstSnapshotId);
    const latest = await repository.getLatestSnapshotWithItems(source.id);
    expect(latest?.id).toBe(thirdSnapshotId);
    expect(latest?.items[0]?.name).toBe("Biff tartar");

    const secondRestaurantId = await repository.upsertRestaurant({
      slug: `integration-second-${suffix}`,
      name: "Fysen Integration Restaurant 2",
      websiteUrl: "https://example.com/",
      address: "Testgata 2",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.914,
      longitude: 10.7523,
    });
    const secondRestaurantSource = await repository.upsertMenuSource({
      restaurantId: secondRestaurantId,
      url: sourceUrl,
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 720,
      minimumExpectedItems: 1,
    });
    expect(secondRestaurantSource.id).not.toBe(source.id);

    const distance = await pool.query<DistanceRow>(
      `
        SELECT ST_Distance(
          location,
          ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography
        ) AS meters
        FROM fysen.restaurants
        WHERE id = $3
      `,
      [59.9139, 10.7522, restaurantId],
    );
    expect(Number(distance.rows[0]?.meters ?? Infinity)).toBeLessThan(0.1);
  });
});


// This rehearsal can run only in GitHub Actions against the ephemeral, loopback
// PostgreSQL 17/PostGIS database from ci.yml. Never point it at Supabase.
// The metadata baseline was read from recovery using read-only pg_catalog SQL.
const expectedRecoveryMetadata = {
  columns: { entries: 297, md5: "7c906254154ac0c581f9b3f1ea6e717d" },
  constraints: { entries: 209, md5: "a975cb3f84f68cfdf71349814fc35126" },
  indexes: { entries: 87, md5: "559201d3dadb6e82f660978436debef2" },
  tables: { entries: 29, md5: "d591c97597af8656e643cc31dac86c20" },
} as const;

const metadataFingerprintSql = String.raw`
WITH
tab AS (
  SELECT format('%I.%I|rls=%s|force=%s',n.nspname,c.relname,c.relrowsecurity,c.relforcerowsecurity) AS entry
  FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace
  WHERE n.nspname='fysen' AND c.relkind IN ('r','p') AND c.relname <> 'schema_migrations'
),
col AS (
  SELECT format('%I.%I.%I|type=%s|notnull=%s|default=%s|identity=%s|generated=%s',n.nspname,c.relname,a.attname,pg_catalog.format_type(a.atttypid,a.atttypmod),a.attnotnull,coalesce(pg_catalog.pg_get_expr(d.adbin,d.adrelid),'<none>'),a.attidentity,a.attgenerated) AS entry
  FROM pg_catalog.pg_attribute a JOIN pg_catalog.pg_class c ON c.oid=a.attrelid JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace
  LEFT JOIN pg_catalog.pg_attrdef d ON d.adrelid=a.attrelid AND d.adnum=a.attnum
  WHERE n.nspname='fysen' AND c.relkind IN ('r','p') AND c.relname <> 'schema_migrations' AND a.attnum>0 AND NOT a.attisdropped
),
con AS (
  SELECT format('%I.%I|%s|%s|validated=%s|deferrable=%s|deferred=%s',n.nspname,c.relname,k.conname,pg_catalog.pg_get_constraintdef(k.oid,true),k.convalidated,k.condeferrable,k.condeferred) AS entry
  FROM pg_catalog.pg_constraint k JOIN pg_catalog.pg_class c ON c.oid=k.conrelid JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace
  WHERE n.nspname='fysen' AND c.relkind IN ('r','p') AND c.relname <> 'schema_migrations'
),
idx AS (
  SELECT format('%s|%s',indexname,indexdef) AS entry
  FROM pg_catalog.pg_indexes WHERE schemaname='fysen' AND tablename <> 'schema_migrations'
)
SELECT kind, count(*)::int AS entries, md5(coalesce(string_agg(entry,E'\\n' ORDER BY entry),'')) AS md5
FROM (SELECT 'tables' AS kind, entry FROM tab UNION ALL SELECT 'columns',entry FROM col
      UNION ALL SELECT 'constraints',entry FROM con UNION ALL SELECT 'indexes',entry FROM idx) x
GROUP BY kind ORDER BY kind
`;

async function assertRecoveryCatalogMatches(pool: Pool): Promise<void> {
  const results = await pool.query<{ kind: string; entries: number; md5: string }>(metadataFingerprintSql);
  const actual = Object.fromEntries(results.rows.map(({ kind, entries, md5 }) => [kind, { entries, md5 }]));
  expect(actual).toEqual(expectedRecoveryMetadata);
}

const rehearsalDescribe = databaseUrl && process.env.GITHUB_ACTIONS === "true" ? describe : describe.skip;

rehearsalDescribe("isolated recovery ledger rehearsal", () => {
  it("recreates the 23-version ledger only after exact catalog verification, without replay", async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL required");
    const base = new URL(databaseUrl);
    if (!["localhost", "127.0.0.1"].includes(base.hostname) || base.pathname !== "/fysen") {
      throw new Error("FYSEN_REHEARSAL_REQUIRES_EPHEMERAL_LOCALHOST_POSTGRES");
    }

    const dbName = `fysen_rehearsal_\${randomUUID().replaceAll("-", "")}`;
    const admin = createDatabasePool({ connectionString: databaseUrl, maxConnections: 1, ssl: false });
    const sandboxUrl = new URL(base.toString());
    sandboxUrl.pathname = `/\${dbName}`;
    let sandbox: Pool | null = null;
    let created = false;

    try {
      // The ci.yml service creates the local superuser 'fysen'; there is no
      // connection to production or recovery, and only synthetic seed data.
      await admin.query(`CREATE DATABASE "\${dbName}" TEMPLATE template0`);
      created = true;
      sandbox = createDatabasePool({ connectionString: sandboxUrl.toString(), maxConnections: 1, ssl: false });

      const expectedVersions = (await listMigrationFiles()).map((file) => file.slice(0, -4));
      expect(expectedVersions).toHaveLength(23);
      expect(await runMigrations(sandbox)).toEqual(expectedVersions);

      // This reference schema must exactly match the read-only recovery
      // metadata before testing any ledger reconstruction.
      await assertRecoveryCatalogMatches(sandbox);

      const before = await sandbox.query("SELECT count(*)::int AS count FROM fysen.restaurants");
      await sandbox.query("DROP TABLE fysen.schema_migrations");
      const missing = await sandbox.query("SELECT to_regclass('fysen.schema_migrations') AS ledger");
      expect(missing.rows[0]?.ledger).toBeNull();
      await assertRecoveryCatalogMatches(sandbox);

      // A single missing index must fail closed. Restore it ONLY in sandbox.
      await sandbox.query("DROP INDEX fysen.menu_changes_added_date_idx");
      await expect(assertRecoveryCatalogMatches(sandbox)).rejects.toThrow();
      expect((await sandbox.query("SELECT to_regclass('fysen.schema_migrations') AS ledger")).rows[0]?.ledger).toBeNull();
      await sandbox.query(await readFile(new URL("../migrations/0023_recent_menu_additions.sql", import.meta.url), "utf8"));
      await assertRecoveryCatalogMatches(sandbox);

      // Controlled one-off reconstruction in a throwaway DB. Do not expose
      // this as a live recovery command or use it against Supabase.
      await sandbox.query("BEGIN");
      try {
        await sandbox.query(`
          CREATE TABLE fysen.schema_migrations (
            version text PRIMARY KEY,
            applied_at timestamptz NOT NULL DEFAULT now()
          )
        `);
        for (const version of expectedVersions) {
          await sandbox.query("INSERT INTO fysen.schema_migrations(version) VALUES ($1)", [version]);
        }
        await sandbox.query("COMMIT");
      } catch (error) {
        await sandbox.query("ROLLBACK");
        throw error;
      }
      expect(await runMigrations(sandbox)).toEqual([]);
      await verifyProductionDatabase(sandbox);
      await assertRecoveryCatalogMatches(sandbox);
      expect((await sandbox.query("SELECT count(*)::int AS count FROM fysen.restaurants")).rows[0]?.count)
        .toBe(before.rows[0]?.count);
    } finally {
      if (sandbox) await sandbox.end();
      if (created) await admin.query(`DROP DATABASE "\${dbName}" WITH (FORCE)`);
      await admin.end();
    }
  }, 120_000);
});
