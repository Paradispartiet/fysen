import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { runMigrations } from "./migrate.js";
import { buildQualityDashboard } from "./quality-dashboard.js";
import { MenuIndexRepository } from "./repository.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("quality dashboard integration", () => {
  let pool: Pool;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.restaurants CASCADE");
    await pool.query("TRUNCATE fysen.search_events CASCADE");

    const repository = new MenuIndexRepository(pool);
    const restaurantId = await repository.upsertRestaurant({
      slug: "quality-bistro-oslo",
      name: "Quality Bistro",
      websiteUrl: "https://example.com/",
      address: "Kvalitetsgata 1",
      city: "Oslo",
      countryCode: "NO",
      latitude: 59.91,
      longitude: 10.75,
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
    const snapshotId = await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: null,
      fetchedAt: now,
      startedAt: now,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "a".repeat(64),
      normalizedSha256: "b".repeat(64),
      normalizedText: "Quality burger 199",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 5,
      extractorVersion: "quality-dashboard-test",
      items: [
        {
          sourceKey: "c".repeat(64),
          name: "Quality burger",
          normalizedName: "quality burger",
          description: null,
          sectionName: null,
          priceMinor: 19900,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.9,
          sourceExcerpt: "Quality burger 199",
        },
      ],
      changes: [],
    });

    const menuItem = await pool.query<{ id: string }>(
      "SELECT id FROM fysen.menu_items WHERE snapshot_id = $1 LIMIT 1",
      [snapshotId],
    );
    const menuItemId = menuItem.rows[0]?.id;
    if (!menuItemId) throw new Error("Expected menu item");

    const search = await pool.query<{ id: string }>(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count)
       VALUES ('quality burger', 'Oslo', 1)
       RETURNING id`,
    );
    const searchId = search.rows[0]?.id;
    if (!searchId) throw new Error("Expected search event");
    const impression = await pool.query<{ id: string }>(
      `INSERT INTO fysen.search_result_impressions (
         search_id, menu_item_id, restaurant_id, rank, match_type, match_score
       ) VALUES ($1, $2, $3, 1, 'exact', 1)
       RETURNING id`,
      [searchId, menuItemId, restaurantId],
    );
    const impressionId = impression.rows[0]?.id;
    if (!impressionId) throw new Error("Expected impression");
    await pool.query(
      `INSERT INTO fysen.conversion_events (client_event_id, impression_id, event_type)
       VALUES (gen_random_uuid(), $1, 'menu_clicked')`,
      [impressionId],
    );
    await pool.query(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count)
       VALUES ('ramen', 'Oslo', 0), ('ramen', 'Oslo', 0), ('dumplings', 'Oslo', 0)`,
    );
  });

  afterAll(async () => {
    await pool.end();
  });

  it("reports fresh coverage, current item counts, demand and zero results", async () => {
    const report = await buildQualityDashboard(pool);
    expect(report.totals.activeRestaurants).toBe(1);
    expect(report.totals.menuSources).toBe(1);
    expect(report.totals.healthyMenuSources).toBe(1);
    expect(report.totals.currentMenuItems).toBe(1);
    expect(report.totals.zeroResultSearches7d).toBe(3);
    expect(report.totals.conversions7d).toBe(1);

    const restaurant = report.restaurants[0];
    expect(restaurant?.name).toBe("Quality Bistro");
    expect(restaurant?.menuSources[0]).toMatchObject({
      health: "healthy",
      currentItemCount: 1,
      consecutiveFailures: 0,
      lastOutcome: "changed",
    });
    expect(restaurant?.impressions7d).toBe(1);
    expect(restaurant?.conversions7d).toBe(1);
    expect(restaurant?.hours.health).toBe("unverified");

    expect(report.topZeroResultQueries7d[0]).toMatchObject({ normalizedQuery: "ramen", count7d: 2 });
    expect(report.topZeroResultQueries7d[1]).toMatchObject({ normalizedQuery: "dumplings", count7d: 1 });
  });
});
