import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";
import { upsertRestaurantAction } from "./restaurant-actions.js";
import { searchDishes, type DishSearchDatabaseInput } from "./search.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

function searchInput(
  normalizedQuery: string,
  overrides: Partial<DishSearchDatabaseInput> = {},
): DishSearchDatabaseInput {
  return {
    normalizedQuery,
    city: "Oslo",
    limit: 20,
    latitude: null,
    longitude: null,
    sort: "relevance",
    ...overrides,
  };
}

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

    const now = Date.now();
    await upsertRestaurantAction(pool, {
      restaurantId,
      actionType: "booking",
      url: "https://example.com/book",
      sourceUrl: "https://example.com/book",
      provider: "TestBook",
      verificationMethod: "first_party_page",
      verifiedAt: new Date(now - 60_000).toISOString(),
      expiresAt: new Date(now + 3_600_000).toISOString(),
    });
    await upsertRestaurantAction(pool, {
      restaurantId,
      actionType: "order",
      url: "https://example.com/order",
      sourceUrl: "https://example.com/order",
      provider: "TestOrder",
      verificationMethod: "first_party_page",
      verifiedAt: new Date(now - 7_200_000).toISOString(),
      expiresAt: new Date(now - 3_600_000).toISOString(),
    });
  });

  afterAll(async () => {
    await pool.end();
  });

  it("returns exact and partial matches from only the latest fresh snapshot", async () => {
    const exact = await searchDishes(pool, searchInput("biff tartar"));
    expect(exact).toHaveLength(1);
    expect(exact[0]?.dishName).toBe("Biff tartar");
    expect(exact[0]?.restaurantName).toBe("Search Bistro");
    expect(exact[0]?.matchType).toBe("exact");
    expect(exact[0]?.score).toBe(1);
    expect(exact[0]?.distanceMeters).toBeNull();

    const partial = await searchDishes(pool, searchInput("tartar"));
    expect(partial).toHaveLength(1);
    expect(partial[0]?.matchType).toBe("contains");

    const oldSnapshot = await searchDishes(pool, searchInput("ramen"));
    expect(oldSnapshot).toEqual([]);
  });

  it("publishes only enabled, unexpired restaurant actions", async () => {
    const result = await searchDishes(pool, searchInput("biff tartar"));
    expect(result[0]?.bookingAction).toMatchObject({
      url: "https://example.com/book",
      sourceUrl: "https://example.com/book",
      provider: "TestBook",
    });
    expect(result[0]?.orderAction).toBeNull();
  });

  it("supports typo-tolerant trigram matching and city scoping", async () => {
    const fuzzy = await searchDishes(pool, searchInput("bif tartar"));
    expect(fuzzy).toHaveLength(1);
    expect(fuzzy[0]?.dishName).toBe("Biff tartar");
    expect(fuzzy[0]?.matchType).toBe("fuzzy");

    const otherCity = await searchDishes(pool, searchInput("biff tartar", { city: "Bergen" }));
    expect(otherCity).toEqual([]);
  });

  it("calculates geography distance and can rank nearby matches before stronger distant matches", async () => {
    const repository = new MenuIndexRepository(pool);
    const farRestaurantId = await repository.upsertRestaurant({
      slug: "far-tartar-oslo",
      name: "Far Tartar",
      websiteUrl: "https://far.example.com/",
      address: "Langtvekk 2",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.9539,
      longitude: 10.7522,
    });
    const farSource = await repository.upsertMenuSource({
      restaurantId: farRestaurantId,
      url: "https://far.example.com/menu",
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 360,
      minimumExpectedItems: 1,
    });
    const fetchedAt = new Date().toISOString();
    await repository.recordSnapshot({
      menuSourceId: farSource.id,
      expectedPreviousSnapshotId: null,
      fetchedAt,
      startedAt: fetchedAt,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "7".repeat(64),
      normalizedSha256: "8".repeat(64),
      normalizedText: "Tartar 250",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 8,
      extractorVersion: "search-distance-integration",
      items: [
        {
          sourceKey: "9".repeat(64),
          name: "Tartar",
          normalizedName: "tartar",
          description: null,
          sectionName: "Forretter",
          priceMinor: 25000,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.99,
          sourceExcerpt: "Tartar 250",
        },
      ],
      changes: [],
    });

    const userLocation = { latitude: 59.914, longitude: 10.7522 };
    const relevance = await searchDishes(
      pool,
      searchInput("tartar", { ...userLocation, sort: "relevance" }),
    );
    expect(relevance).toHaveLength(2);
    expect(relevance[0]?.restaurantName).toBe("Far Tartar");
    expect(relevance[0]?.matchType).toBe("exact");
    expect(relevance[1]?.restaurantName).toBe("Search Bistro");

    const distance = await searchDishes(
      pool,
      searchInput("tartar", { ...userLocation, sort: "distance" }),
    );
    expect(distance).toHaveLength(2);
    expect(distance[0]?.restaurantName).toBe("Search Bistro");
    expect(distance[0]?.distanceMeters).not.toBeNull();
    expect(distance[0]!.distanceMeters!).toBeLessThan(50);
    expect(distance[1]?.restaurantName).toBe("Far Tartar");
    expect(distance[1]!.distanceMeters!).toBeGreaterThan(4_000);
  });
});
