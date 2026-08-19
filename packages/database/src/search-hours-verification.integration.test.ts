import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";
import { recordRestaurantHoursObservation } from "./restaurant-hours.js";
import { upsertRestaurantHoursSource } from "./restaurant-hours-sources.js";
import { searchDishes } from "./search.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("search opening-hours verification", () => {
  let pool: Pool;
  let restaurantId: string;
  let hoursSourceId: string;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.restaurants CASCADE");

    const repository = new MenuIndexRepository(pool);
    restaurantId = await repository.upsertRestaurant({
      slug: "provisional-hours-bistro-oslo",
      name: "Provisional Hours Bistro",
      websiteUrl: "https://example.com/",
      address: "Usikkergata 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.91,
      longitude: 10.75,
    });
    const menuSource = await repository.upsertMenuSource({
      restaurantId,
      url: "https://example.com/menu",
      sourceType: "html",
      userAgent: "FysenMenuBot/0.1",
      checkIntervalMinutes: 360,
      minimumExpectedItems: 1,
    });
    const fetchedAt = new Date().toISOString();
    await repository.recordSnapshot({
      menuSourceId: menuSource.id,
      expectedPreviousSnapshotId: null,
      fetchedAt,
      startedAt: fetchedAt,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "a".repeat(64),
      normalizedSha256: "b".repeat(64),
      normalizedText: "Testrett 199",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 5,
      extractorVersion: "search-hours-verification-test",
      items: [
        {
          sourceKey: "c".repeat(64),
          name: "Testrett",
          normalizedName: "testrett",
          description: null,
          sectionName: "Middag",
          priceMinor: 19900,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.99,
          sourceExcerpt: "Testrett 199",
        },
      ],
      changes: [],
    });

    hoursSourceId = await upsertRestaurantHoursSource(pool, {
      restaurantId,
      url: "https://example.com/hours",
      timeZone: "Europe/Oslo",
      checkIntervalMinutes: 360,
      minimumExpectedIntervals: 7,
      verificationStatus: "provisional",
      verificationNote: "Two first-party sections disagree.",
      verificationCheckedAt: "2026-08-19",
    });

    const intervals = Array.from({ length: 7 }, (_, index) => ({
      isoWeekday: index + 1,
      opensAt: "00:00:00",
      closesAt: "23:59:00",
      closesNextDay: false,
    }));
    const observed = await recordRestaurantHoursObservation(pool, {
      sourceId: hoursSourceId,
      startedAt: fetchedAt,
      completedAt: fetchedAt,
      fetchedAt,
      httpStatus: 200,
      rawSha256: "d".repeat(64),
      scheduleFingerprint: "e".repeat(64),
      extractorVersion: "hours-verification-test",
      sourceExcerpt: "Mon-Sun 00:00-23:59",
      etag: null,
      lastModified: null,
      intervals,
    });
    expect(observed.outcome).toBe("changed");
  });

  afterAll(async () => {
    await pool.end();
  });

  it("keeps a restaurant searchable while refusing provisional hours as open/closed evidence", async () => {
    const provisional = await searchDishes(pool, {
      normalizedQuery: "testrett",
      city: "Oslo",
      limit: 10,
      latitude: null,
      longitude: null,
      sort: "relevance",
    });
    expect(provisional).toHaveLength(1);
    expect(provisional[0]?.restaurantName).toBe("Provisional Hours Bistro");
    expect(provisional[0]?.opening).toEqual({
      state: "unknown",
      serviceType: "kitchen",
      sourceUrl: null,
      verifiedAt: null,
      freshUntil: null,
    });

    await upsertRestaurantHoursSource(pool, {
      restaurantId,
      url: "https://example.com/hours",
      timeZone: "Europe/Oslo",
      checkIntervalMinutes: 360,
      minimumExpectedIntervals: 7,
      verificationStatus: "verified",
    });

    const verified = await searchDishes(pool, {
      normalizedQuery: "testrett",
      city: "Oslo",
      limit: 10,
      latitude: null,
      longitude: null,
      sort: "relevance",
    });
    expect(verified).toHaveLength(1);
    expect(verified[0]?.opening.state).not.toBe("unknown");
    expect(verified[0]?.opening.sourceUrl).toBe("https://example.com/hours");
  });
});
