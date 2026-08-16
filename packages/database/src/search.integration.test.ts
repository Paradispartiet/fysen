import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";
import { searchDishes } from "./search.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("dish search integration", () => {
  let pool: Pool;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.restaurants CASCADE");

    const repository = new MenuIndexRepository(pool);
    const restaurantId = await repository.upsertRestaurant({
      slug: "search-bistro-oslo",
      name: "Search Bistro",
      websiteUrl: "https://example.com/",
      address: "Søkegata 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.9139,
      longitude: 10.7522,
    });
    const source = await repository.upsertMenuSource({
      restaurantId,
      url: "https://example.com/menu",
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 360,
      minimumExpectedItems: 1,
    });

    const firstAt = new Date(Date.now() - 60_000).toISOString();
    const firstSnapshotId = await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: null,
      fetchedAt: firstAt,
      startedAt: firstAt,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "1".repeat(64),
      normalizedSha256: "2".repeat(64),
      normalizedText: "Ramen 249",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 10,
      extractorVersion: "search-integration",
      items: [
        {
          sourceKey: "3".repeat(64),
          name: "Ramen",
          normalizedName: "ramen",
          description: "Gammel snapshot-rett",
          sectionName: "Middag",
          priceMinor: 24900,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.92,
          sourceExcerpt: "Ramen 249",
        },
      ],
      changes: [],
    });

    const secondAt = new Date().toISOString();
    await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: firstSnapshotId,
      fetchedAt: secondAt,
      startedAt: secondAt,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "4".repeat(64),
      normalizedSha256: "5".repeat(64),
      normalizedText: "Biff tartar 225",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 9,
      extractorVersion: "search-integration",
      items: [
        {
          sourceKey: "6".repeat(64),
          name: "Biff tartar",
          normalizedName: "biff tartar",
          description: "Kapers og sennep",
          sectionName: "Forretter",
          priceMinor: 22500,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.97,
          sourceExcerpt: "Biff tartar 225",
        },
      ],
      changes: [],
    });
  });

  afterAll(async () => {
    await pool.end();
  });

  it("returns exact and partial matches from only the latest fresh snapshot", async () => {
    const exact = await searchDishes(pool, { normalizedQuery: "biff tartar", city: "Oslo", limit: 20 });
    expect(exact).toHaveLength(1);
    expect(exact[0]?.dishName).toBe("Biff tartar");
    expect(exact[0]?.restaurantName).toBe("Search Bistro");
    expect(exact[0]?.matchType).toBe("exact");
    expect(exact[0]?.score).toBe(1);

    const partial = await searchDishes(pool, { normalizedQuery: "tartar", city: "Oslo", limit: 20 });
    expect(partial).toHaveLength(1);
    expect(partial[0]?.matchType).toBe("contains");

    const oldSnapshot = await searchDishes(pool, { normalizedQuery: "ramen", city: "Oslo", limit: 20 });
    expect(oldSnapshot).toEqual([]);
  });

  it("supports typo-tolerant trigram matching and city scoping", async () => {
    const fuzzy = await searchDishes(pool, { normalizedQuery: "bif tartar", city: "Oslo", limit: 20 });
    expect(fuzzy).toHaveLength(1);
    expect(fuzzy[0]?.dishName).toBe("Biff tartar");
    expect(fuzzy[0]?.matchType).toBe("fuzzy");

    const otherCity = await searchDishes(pool, { normalizedQuery: "biff tartar", city: "Bergen", limit: 20 });
    expect(otherCity).toEqual([]);
  });
});
