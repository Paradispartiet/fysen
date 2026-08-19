import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";
import { listDueRestaurantHoursSources } from "./restaurant-hours.js";
import { upsertRestaurantHoursSource } from "./restaurant-hours-sources.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("restaurant hours source upsert", () => {
  let pool: Pool;
  let restaurantId: string;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.restaurants CASCADE");

    const repository = new MenuIndexRepository(pool);
    restaurantId = await repository.upsertRestaurant({
      slug: "metadata-bistro-oslo",
      name: "Metadata Bistro",
      websiteUrl: "https://example.com/",
      address: "Metadatagata 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.91,
      longitude: 10.75,
    });
  });

  afterAll(async () => {
    await pool.end();
  });

  it("is idempotent, persists scope hints and makes a newly configured source due", async () => {
    const firstId = await upsertRestaurantHoursSource(pool, {
      restaurantId,
      url: "https://example.com/",
      timeZone: "Europe/Oslo",
      checkIntervalMinutes: 720,
      minimumExpectedIntervals: 5,
      scopeHints: ["Pizzeria", "Pizzeria"],
    });
    const secondId = await upsertRestaurantHoursSource(pool, {
      restaurantId,
      url: "https://example.com/",
      timeZone: "Europe/Oslo",
      checkIntervalMinutes: 720,
      minimumExpectedIntervals: 5,
      scopeHints: ["Pizzeria"],
    });
    expect(secondId).toBe(firstId);

    const due = await listDueRestaurantHoursSources(pool, 25);
    const source = due.find((target) => target.id === firstId);
    expect(source).toMatchObject({
      restaurantId,
      url: "https://example.com/",
      timeZone: "Europe/Oslo",
      minimumExpectedIntervals: 5,
      scopeHints: ["Pizzeria"],
    });
  });

  it("persists explicit provisional verification metadata without disabling monitoring", async () => {
    const sourceId = await upsertRestaurantHoursSource(pool, {
      restaurantId,
      url: "https://example.com/hours",
      timeZone: "Europe/Oslo",
      checkIntervalMinutes: 360,
      minimumExpectedIntervals: 7,
      verificationStatus: "provisional",
      verificationNote: "First-party page exposes conflicting opening-hours sections.",
      verificationCheckedAt: "2026-08-19",
    });

    const result = await pool.query<{
      verification_status: string;
      verification_note: string | null;
      verification_checked_at: string;
      enabled: boolean;
    }>(
      `SELECT verification_status,
              verification_note,
              verification_checked_at::text,
              enabled
         FROM fysen.restaurant_hours_sources
        WHERE id = $1`,
      [sourceId],
    );
    expect(result.rows[0]).toEqual({
      verification_status: "provisional",
      verification_note: "First-party page exposes conflicting opening-hours sections.",
      verification_checked_at: "2026-08-19",
      enabled: true,
    });

    const due = await listDueRestaurantHoursSources(pool, 25);
    expect(due.some((target) => target.id === sourceId)).toBe(true);
  });
});
