import { randomUUID } from "node:crypto";
import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";
import { recordRestaurantHoursObservation } from "./restaurant-hours.js";
import {
  getLatestRestaurantHoursSnapshotExtractorVersion,
  upsertRestaurantHoursSource,
} from "./restaurant-hours-sources.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("restaurant hours extractor refresh persistence", () => {
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

  it("persists a new snapshot when only the extractor version changes", async () => {
    const repository = new MenuIndexRepository(pool);
    const suffix = randomUUID();
    const restaurantId = await repository.upsertRestaurant({
      slug: `hours-refresh-${suffix}`,
      name: "Hours Refresh Test",
      websiteUrl: "https://example.com/",
      address: "Testgata 5",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.9139,
      longitude: 10.7522,
    });
    const sourceId = await upsertRestaurantHoursSource(pool, {
      restaurantId,
      url: `https://example.com/hours-${suffix}`,
      timeZone: "Europe/Oslo",
      checkIntervalMinutes: 360,
      minimumExpectedIntervals: 1,
      scopeHints: ["Hours Refresh Test"],
    });
    const intervals = [
      {
        isoWeekday: 1,
        opensAt: "12:00",
        closesAt: "21:00",
        closesNextDay: false,
      },
    ];
    const fingerprint = "a".repeat(64);
    const firstAt = new Date().toISOString();
    const first = await recordRestaurantHoursObservation(pool, {
      sourceId,
      startedAt: firstAt,
      completedAt: firstAt,
      fetchedAt: firstAt,
      httpStatus: 200,
      rawSha256: "b".repeat(64),
      scheduleFingerprint: fingerprint,
      extractorVersion: "hours-visible-v4",
      sourceExcerpt: "Monday 12:00-21:00",
      etag: "old-etag",
      lastModified: null,
      intervals,
    });
    expect(first.outcome).toBe("changed");
    expect(first.snapshotId).not.toBeNull();

    const secondAt = new Date(Date.now() + 1000).toISOString();
    const second = await recordRestaurantHoursObservation(pool, {
      sourceId,
      startedAt: secondAt,
      completedAt: secondAt,
      fetchedAt: secondAt,
      httpStatus: 200,
      rawSha256: "c".repeat(64),
      scheduleFingerprint: fingerprint,
      extractorVersion: "hours-visible-v15+refresh-test",
      sourceExcerpt: "Monday 12:00-21:00",
      etag: "new-etag",
      lastModified: null,
      intervals,
    });
    expect(second.outcome).toBe("unchanged");
    expect(second.snapshotId).not.toBeNull();
    expect(
      await getLatestRestaurantHoursSnapshotExtractorVersion(pool, sourceId),
    ).toBe("hours-visible-v15+refresh-test");

    const snapshots = await pool.query<{ count: string }>(
      `SELECT count(*)::text AS count
         FROM fysen.restaurant_hours_snapshots
        WHERE source_id = $1`,
      [sourceId],
    );
    expect(Number(snapshots.rows[0]?.count)).toBe(2);
  });
});
