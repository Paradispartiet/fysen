import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import {
  listDueRestaurantHoursSources,
  recordRestaurantHoursObservation,
} from "./restaurant-hours.js";
import { MenuIndexRepository } from "./repository.js";
import { searchDishes } from "./search.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

function osloIsoWeekday(): number {
  const short = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Oslo",
    weekday: "short",
  }).format(new Date());
  return ({ Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 } as const)[short as "Mon"] ?? 1;
}

integrationDescribe("restaurant hours integration", () => {
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
      slug: "hours-bistro-oslo",
      name: "Hours Bistro",
      websiteUrl: "https://example.com/",
      address: "Tidsgata 1",
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
    const now = new Date().toISOString();
    await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: null,
      fetchedAt: now,
      startedAt: now,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "1".repeat(64),
      normalizedSha256: "2".repeat(64),
      normalizedText: "Biff tartar 225",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 5,
      extractorVersion: "hours-integration",
      items: [
        {
          sourceKey: "3".repeat(64),
          name: "Biff tartar",
          normalizedName: "biff tartar",
          description: null,
          sectionName: null,
          priceMinor: 22500,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.99,
          sourceExcerpt: "Biff tartar 225",
        },
      ],
      changes: [],
    });

    const hoursSource = await pool.query<{ id: string }>(
      `INSERT INTO fysen.restaurant_hours_sources (
         restaurant_id, service_type, url, time_zone, extractor,
         check_interval_minutes, minimum_expected_intervals, next_check_at
       ) VALUES ($1, 'kitchen', 'https://example.com/hours', 'Europe/Oslo', 'visible_text_v1', 60, 1, now())
       RETURNING id`,
      [restaurantId],
    );
    hoursSourceId = hoursSource.rows[0]?.id ?? "";
    if (!hoursSourceId) throw new Error("Hours source insert failed");
  });

  afterAll(async () => {
    await pool.end();
  });

  it("publishes open, closed and unknown from fresh source-backed snapshots", async () => {
    const due = await listDueRestaurantHoursSources(pool, 25);
    expect(due.map((source) => source.id)).toContain(hoursSourceId);

    const currentDay = osloIsoWeekday();
    const firstAt = new Date().toISOString();
    const openObservation = await recordRestaurantHoursObservation(pool, {
      sourceId: hoursSourceId,
      startedAt: firstAt,
      completedAt: firstAt,
      fetchedAt: firstAt,
      httpStatus: 200,
      rawSha256: "4".repeat(64),
      scheduleFingerprint: "5".repeat(64),
      extractorVersion: "hours-test-v1",
      sourceExcerpt: "Open all current day",
      etag: null,
      lastModified: null,
      intervals: [
        { isoWeekday: currentDay, opensAt: "00:00", closesAt: "00:00", closesNextDay: true },
      ],
    });
    expect(openObservation.outcome).toBe("changed");

    const openSearch = await searchDishes(pool, {
      normalizedQuery: "biff tartar",
      city: "Oslo",
      limit: 20,
      latitude: null,
      longitude: null,
      sort: "relevance",
    });
    expect(openSearch[0]?.opening.state).toBe("open");
    expect(openSearch[0]?.opening.sourceUrl).toBe("https://example.com/hours");

    const nextDay = currentDay === 7 ? 1 : currentDay + 1;
    const secondAt = new Date(Date.now() + 1_000).toISOString();
    const closedObservation = await recordRestaurantHoursObservation(pool, {
      sourceId: hoursSourceId,
      startedAt: secondAt,
      completedAt: secondAt,
      fetchedAt: secondAt,
      httpStatus: 200,
      rawSha256: "6".repeat(64),
      scheduleFingerprint: "7".repeat(64),
      extractorVersion: "hours-test-v1",
      sourceExcerpt: "Only tomorrow",
      etag: null,
      lastModified: null,
      intervals: [
        { isoWeekday: nextDay, opensAt: "10:00", closesAt: "11:00", closesNextDay: false },
      ],
    });
    expect(closedObservation.outcome).toBe("changed");

    const closedSearch = await searchDishes(pool, {
      normalizedQuery: "biff tartar",
      city: "Oslo",
      limit: 20,
      latitude: null,
      longitude: null,
      sort: "relevance",
    });
    expect(closedSearch[0]?.opening.state).toBe("closed");

    await pool.query(
      `UPDATE fysen.restaurant_hours_sources
          SET last_checked_at = now() - interval '3 days'
        WHERE id = $1`,
      [hoursSourceId],
    );
    const staleSearch = await searchDishes(pool, {
      normalizedQuery: "biff tartar",
      city: "Oslo",
      limit: 20,
      latitude: null,
      longitude: null,
      sort: "relevance",
    });
    expect(staleSearch[0]?.opening).toEqual({
      state: "unknown",
      serviceType: "kitchen",
      sourceUrl: null,
      verifiedAt: null,
      freshUntil: null,
    });
  });

  it("quarantines a suspicious interval collapse without publishing it", async () => {
    await pool.query(
      `UPDATE fysen.restaurant_hours_sources
          SET last_checked_at = now(), next_check_at = now()
        WHERE id = $1`,
      [hoursSourceId],
    );
    const observedAt = new Date(Date.now() + 2_000).toISOString();
    const result = await recordRestaurantHoursObservation(pool, {
      sourceId: hoursSourceId,
      startedAt: observedAt,
      completedAt: observedAt,
      fetchedAt: observedAt,
      httpStatus: 200,
      rawSha256: "8".repeat(64),
      scheduleFingerprint: "9".repeat(64),
      extractorVersion: "hours-test-v1",
      sourceExcerpt: "No reliable hours",
      etag: null,
      lastModified: null,
      intervals: [],
    });
    expect(result).toEqual({ outcome: "quarantined", snapshotId: null });

    const latest = await pool.query<{ interval_count: number }>(
      `SELECT interval_count
         FROM fysen.restaurant_hours_snapshots
        WHERE source_id = $1
        ORDER BY fetched_at DESC, created_at DESC
        LIMIT 1`,
      [hoursSourceId],
    );
    expect(Number(latest.rows[0]?.interval_count)).toBe(1);
  });
});
