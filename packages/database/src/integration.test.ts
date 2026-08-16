import { randomUUID } from "node:crypto";
import type { Pool, QueryResultRow } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
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
