import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { recordConversionEvent, recordSearchFunnel } from "./funnel.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("revenue funnel integration", () => {
  let pool: Pool;
  let restaurantId: string;
  let menuItemId: string;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.search_events CASCADE");
    await pool.query("TRUNCATE fysen.restaurants CASCADE");

    const repository = new MenuIndexRepository(pool);
    restaurantId = await repository.upsertRestaurant({
      slug: "revenue-test-oslo",
      name: "Revenue Test",
      websiteUrl: "https://example.com/",
      address: "Målegata 1",
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
    const snapshotId = await repository.recordSnapshot({
      menuSourceId: source.id,
      expectedPreviousSnapshotId: null,
      fetchedAt: now,
      startedAt: now,
      httpStatus: 200,
      responseContentType: "text/html",
      rawSha256: "a".repeat(64),
      normalizedSha256: "b".repeat(64),
      normalizedText: "Tartar 265",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 10,
      extractorVersion: "revenue-test",
      items: [
        {
          sourceKey: "c".repeat(64),
          name: "Tartar av okse",
          normalizedName: "tartar av okse",
          description: null,
          sectionName: null,
          priceMinor: 26500,
          currency: "NOK",
          position: 0,
          extractionMethod: "html_heuristic",
          confidence: 0.9,
          sourceExcerpt: "Tartar 265",
        },
      ],
      changes: [],
    });

    const item = await pool.query<{ id: string }>(
      "SELECT id FROM fysen.menu_items WHERE snapshot_id = $1 LIMIT 1",
      [snapshotId],
    );
    menuItemId = item.rows[0]?.id ?? "";
    if (!menuItemId) throw new Error("Revenue test menu item was not created");
  });

  afterAll(async () => {
    await pool.end();
  });

  it("records canonical search demand and result impressions without a user profile", async () => {
    const recorded = await recordSearchFunnel(pool, {
      normalizedQuery: "beef tartare",
      city: "Oslo",
      impressions: [
        {
          menuItemId,
          restaurantId,
          rank: 1,
          matchType: "canonical",
          matchScore: 0.98,
        },
      ],
    });

    expect(recorded.searchId).toMatch(/^[0-9a-f-]{36}$/);
    expect(recorded.impressionIdsByMenuItemId[menuItemId]).toMatch(/^[0-9a-f-]{36}$/);

    const search = await pool.query<{
      normalized_query: string;
      city: string;
      result_count: number;
    }>("SELECT normalized_query, city, result_count FROM fysen.search_events WHERE id = $1", [recorded.searchId]);

    expect(search.rows[0]).toEqual({
      normalized_query: "beef tartare",
      city: "Oslo",
      result_count: 1,
    });

    const impression = await pool.query<{ match_type: string; match_score: number }>(
      `SELECT match_type, match_score
         FROM fysen.search_result_impressions
        WHERE search_id = $1`,
      [recorded.searchId],
    );
    expect(impression.rows[0]).toEqual({ match_type: "canonical", match_score: 0.98 });
  });

  it("deduplicates retried conversion events by client event id", async () => {
    const recorded = await recordSearchFunnel(pool, {
      normalizedQuery: "tartar",
      city: "Oslo",
      impressions: [
        {
          menuItemId,
          restaurantId,
          rank: 1,
          matchType: "prefix",
          matchScore: 0.95,
        },
      ],
    });
    const impressionId = recorded.impressionIdsByMenuItemId[menuItemId];
    if (!impressionId) throw new Error("Revenue impression id missing");

    const clientEventId = "22222222-2222-4222-8222-222222222222";
    const first = await recordConversionEvent(pool, {
      clientEventId,
      impressionId,
      eventType: "menu_clicked",
    });
    const retry = await recordConversionEvent(pool, {
      clientEventId,
      impressionId,
      eventType: "menu_clicked",
    });

    expect(retry).toBe(first);
    const count = await pool.query<{ count: string }>(
      "SELECT count(*)::text AS count FROM fysen.conversion_events WHERE client_event_id = $1",
      [clientEventId],
    );
    expect(count.rows[0]?.count).toBe("1");
  });

  it("can identify zero-result demand directly", async () => {
    const recorded = await recordSearchFunnel(pool, {
      normalizedQuery: "okonomiyaki",
      city: "Oslo",
      impressions: [],
    });

    const zero = await pool.query<{ result_count: number }>(
      "SELECT result_count FROM fysen.search_events WHERE id = $1",
      [recorded.searchId],
    );
    expect(zero.rows[0]?.result_count).toBe(0);
  });
});
