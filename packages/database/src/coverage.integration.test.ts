import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { setRestaurantCoverageActive, upsertRestaurantCandidate } from "./coverage.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";
import { searchDishes } from "./search.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("restaurant coverage gate", () => {
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

  it("keeps a candidate invisible until the onboarding gate activates it", async () => {
    const candidate = await upsertRestaurantCandidate(pool, {
      slug: "candidate-bistro-oslo",
      name: "Candidate Bistro",
      websiteUrl: "https://example.com/",
      address: "Pilotgata 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.92,
      longitude: 10.75,
    });
    expect(candidate.active).toBe(false);

    const repository = new MenuIndexRepository(pool);
    const source = await repository.upsertMenuSource({
      restaurantId: candidate.id,
      url: "https://example.com/menu",
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 360,
      minimumExpectedItems: 1,
    });
    const now = new Date().toISOString();
    await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: null,
      fetchedAt: now,
      startedAt: now,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "a".repeat(64),
      normalizedSha256: "b".repeat(64),
      normalizedText: "Pilot burger 199",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 5,
      extractorVersion: "coverage-test",
      items: [
        {
          sourceKey: "c".repeat(64),
          name: "Pilot burger",
          normalizedName: "pilot burger",
          description: null,
          sectionName: null,
          priceMinor: 19900,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.9,
          sourceExcerpt: "Pilot burger 199",
        },
      ],
      changes: [],
    });

    const hidden = await searchDishes(pool, {
      normalizedQuery: "pilot burger",
      city: "Oslo",
      limit: 20,
      latitude: null,
      longitude: null,
      sort: "relevance",
    });
    expect(hidden).toEqual([]);

    const published = await setRestaurantCoverageActive(pool, candidate.id, true);
    expect(published.active).toBe(true);

    const visible = await searchDishes(pool, {
      normalizedQuery: "pilot burger",
      city: "Oslo",
      limit: 20,
      latitude: null,
      longitude: null,
      sort: "relevance",
    });
    expect(visible).toHaveLength(1);
    expect(visible[0]?.restaurantSlug).toBe("candidate-bistro-oslo");
  });
});
