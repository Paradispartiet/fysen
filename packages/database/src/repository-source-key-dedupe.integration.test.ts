import { randomUUID } from "node:crypto";
import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("MenuIndexRepository sourceKey dedupe", () => {
  let pool: Pool;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
  });

  afterAll(async () => {
    await pool.end();
  });

  it("keeps the first observed item when one snapshot contains a duplicate sourceKey", async () => {
    const repository = new MenuIndexRepository(pool);
    const suffix = randomUUID();
    const restaurantId = await repository.upsertRestaurant({
      slug: `source-key-dedupe-${suffix}`,
      name: "Source key dedupe test",
      websiteUrl: "https://example.com/",
      address: "Testgata 18",
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
    const sourceKey = "d".repeat(64);

    const snapshotId = await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: null,
      fetchedAt,
      startedAt: fetchedAt,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "a".repeat(64),
      normalizedSha256: "b".repeat(64),
      normalizedText: "Duplicate dish 199 Duplicate dish 249",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 1,
      extractorVersion: "source-key-dedupe-test",
      items: [
        {
          sourceKey,
          name: "Duplicate Dish",
          normalizedName: "duplicate dish",
          description: "First observation",
          sectionName: "Mains",
          priceMinor: 19900,
          currency: "NOK",
          position: 1,
          extractionMethod: "html_heuristic",
          confidence: 0.9,
          sourceExcerpt: "Duplicate Dish 199",
        },
        {
          sourceKey,
          name: "Duplicate Dish",
          normalizedName: "duplicate dish",
          description: "Duplicate observation",
          sectionName: "Mains",
          priceMinor: 24900,
          currency: "NOK",
          position: 2,
          extractionMethod: "html_heuristic",
          confidence: 0.8,
          sourceExcerpt: "Duplicate Dish 249",
        },
      ],
      changes: [],
    });

    const latest = await repository.getLatestSnapshotWithItems(source.id);
    expect(latest?.id).toBe(snapshotId);
    expect(latest?.items).toHaveLength(1);
    expect(latest?.items[0]?.priceMinor).toBe(19900);
    expect(latest?.items[0]?.description).toBe("First observation");
  });
});
