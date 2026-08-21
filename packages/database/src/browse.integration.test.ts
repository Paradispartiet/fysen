import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { browseDishes } from "./browse.js";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("dish browse integration", () => {
  let pool: Pool;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.restaurants CASCADE");

    const repository = new MenuIndexRepository(pool);
    const firstRestaurantId = await repository.upsertRestaurant({
      slug: "browse-bistro-oslo",
      name: "Browse Bistro",
      websiteUrl: "https://browse.example.com/",
      address: "Rettgata 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.9139,
      longitude: 10.7522,
    });
    const firstSource = await repository.upsertMenuSource({
      restaurantId: firstRestaurantId,
      url: "https://browse.example.com/menu",
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 360,
      minimumExpectedItems: 1,
    });

    const oldAt = new Date(Date.now() - 60_000).toISOString();
    const oldSnapshotId = await repository.recordSnapshot({
      menuSourceId: firstSource.id,
      expectedPreviousSnapshotId: null,
      fetchedAt: oldAt,
      startedAt: oldAt,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "1".repeat(64),
      normalizedSha256: "2".repeat(64),
      normalizedText: "Ramen 249",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 10,
      extractorVersion: "browse-integration",
      items: [
        {
          sourceKey: "3".repeat(64),
          name: "Ramen",
          normalizedName: "ramen",
          description: null,
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

    const currentAt = new Date().toISOString();
    await repository.recordSnapshot({
      menuSourceId: firstSource.id,
      expectedPreviousSnapshotId: oldSnapshotId,
      fetchedAt: currentAt,
      startedAt: currentAt,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "4".repeat(64),
      normalizedSha256: "5".repeat(64),
      normalizedText: "Biff tartar 225",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 9,
      extractorVersion: "browse-integration",
      items: [
        {
          sourceKey: "6".repeat(64),
          name: "Biff tartar",
          normalizedName: "biff tartar",
          description: null,
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

    const secondRestaurantId = await repository.upsertRestaurant({
      slug: "browse-brasserie-oslo",
      name: "Browse Brasserie",
      websiteUrl: "https://brasserie.example.com/",
      address: "Rettgata 2",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.9145,
      longitude: 10.753,
    });
    const secondSource = await repository.upsertMenuSource({
      restaurantId: secondRestaurantId,
      url: "https://brasserie.example.com/menu",
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 360,
      minimumExpectedItems: 1,
    });

    const secondAt = new Date().toISOString();
    await repository.recordSnapshot({
      menuSourceId: secondSource.id,
      expectedPreviousSnapshotId: null,
      fetchedAt: secondAt,
      startedAt: secondAt,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "7".repeat(64),
      normalizedSha256: "8".repeat(64),
      normalizedText: "Tartar av okse 239",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 8,
      extractorVersion: "browse-integration",
      items: [
        {
          sourceKey: "9".repeat(64),
          name: "Tartar av okse",
          normalizedName: "tartar av okse",
          description: null,
          sectionName: "Forretter",
          priceMinor: 23900,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.95,
          sourceExcerpt: "Tartar av okse 239",
        },
      ],
      changes: [],
    });
  });

  afterAll(async () => {
    await pool.end();
  });

  it("groups canonical aliases across restaurants and ignores older snapshots", async () => {
    const result = await browseDishes(pool, { city: "Oslo" });

    expect(result.dishes).toEqual([
      {
        id: "concept:beef-tartare",
        name: "Biff tartar",
        query: "biff tartar",
        restaurantCount: 2,
        restaurantExamples: [
          {
            id: expect.any(String),
            name: "Browse Bistro",
            address: "Rettgata 1",
          },
          {
            id: expect.any(String),
            name: "Browse Brasserie",
            address: "Rettgata 2",
          },
        ],
      },
    ]);
    expect(result.quality).toEqual({
      filterVersion: "consumer-v1",
      rawItemCount: 2,
      validItemCount: 2,
      excludedItemCount: 0,
      deduplicatedItemCount: 1,
      exclusions: {
        beverage: 0,
        sauce_or_side: 0,
        modifier: 0,
        allergen_or_information: 0,
        menu_heading: 0,
        invalid_fragment: 0,
      },
    });
  });

  it("keeps browse results city-scoped", async () => {
    await expect(browseDishes(pool, { city: "Bergen" })).resolves.toEqual({
      dishes: [],
      quality: {
        filterVersion: "consumer-v1",
        rawItemCount: 0,
        validItemCount: 0,
        excludedItemCount: 0,
        deduplicatedItemCount: 0,
        exclusions: {
          beverage: 0,
          sauce_or_side: 0,
          modifier: 0,
          allergen_or_information: 0,
          menu_heading: 0,
          invalid_fragment: 0,
        },
      },
    });
  });
});
