import { randomUUID } from "node:crypto";
import type { Pool, QueryResultRow } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";

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

  it("persists a geolocated restaurant, source and immutable menu snapshot", async () => {
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
    const source = await repository.upsertMenuSource({
      restaurantId,
      url: `https://example.com/menu/${suffix}`,
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 720,
      minimumExpectedItems: 1,
    });

    const fetchedAt = new Date().toISOString();
    const snapshotId = await repository.recordSnapshot({
      menuSourceId: source.id,
      fetchedAt,
      startedAt: fetchedAt,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "a".repeat(64),
      normalizedSha256: "b".repeat(64),
      normalizedText: "Biff tartar 225",
      etag: "integration-etag",
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

    const latest = await repository.getLatestSnapshotWithItems(source.id);
    expect(latest?.id).toBe(snapshotId);
    expect(latest?.items).toHaveLength(1);
    expect(latest?.items[0]?.name).toBe("Biff tartar");

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
