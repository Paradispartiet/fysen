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

    const concept = await pool.query<{ id: string }>(
      `INSERT INTO fysen.dish_concepts (slug, canonical_name, normalized_name, active)
       VALUES ('quality-burger', 'Quality Burger', 'quality burger', true)
       ON CONFLICT (slug) DO UPDATE SET active = true, updated_at = now()
       RETURNING id`,
    );
    const conceptId = concept.rows[0]?.id;
    if (!conceptId) throw new Error("Expected quality dish concept");
    await pool.query(
      `INSERT INTO fysen.dish_aliases (
         dish_concept_id, alias, normalized_alias, alias_scope, locale, curation_note
       ) VALUES
         ($1, 'Quality burger', 'quality burger', 'both', 'en', 'Integration menu alias'),
         ($1, 'Quality sandwich', 'quality sandwich', 'query', 'en', 'Integration query alias')
       ON CONFLICT (normalized_alias) DO NOTHING`,
      [conceptId],
    );

    const exactSearch = await pool.query<{ id: string }>(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count)
       VALUES ('quality burger', 'Oslo', 1)
       RETURNING id`,
    );
    const exactSearchId = exactSearch.rows[0]?.id;
    if (!exactSearchId) throw new Error("Expected exact search event");
    const exactImpression = await pool.query<{ id: string }>(
      `INSERT INTO fysen.search_result_impressions (
         search_id, menu_item_id, restaurant_id, rank, match_type, match_score
       ) VALUES ($1, $2, $3, 1, 'exact', 1)
       RETURNING id`,
      [exactSearchId, menuItemId, restaurantId],
    );
    const exactImpressionId = exactImpression.rows[0]?.id;
    if (!exactImpressionId) throw new Error("Expected exact impression");
    await pool.query(
      `INSERT INTO fysen.conversion_events (client_event_id, impression_id, event_type)
       VALUES (gen_random_uuid(), $1, 'menu_clicked')`,
      [exactImpressionId],
    );

    const canonicalSearch = await pool.query<{ id: string }>(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count)
       VALUES ('quality sandwich', 'Oslo', 1)
       RETURNING id`,
    );
    const canonicalSearchId = canonicalSearch.rows[0]?.id;
    if (!canonicalSearchId) throw new Error("Expected canonical search event");
    await pool.query(
      `INSERT INTO fysen.search_result_impressions (
         search_id, menu_item_id, restaurant_id, rank, match_type, match_score
       ) VALUES ($1, $2, $3, 1, 'canonical', 0.98)`,
      [canonicalSearchId, menuItemId, restaurantId],
    );

    const fuzzySearch = await pool.query<{ id: string }>(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count)
       VALUES ('qualty burger', 'Oslo', 1)
       RETURNING id`,
    );
    const fuzzySearchId = fuzzySearch.rows[0]?.id;
    if (!fuzzySearchId) throw new Error("Expected fuzzy search event");
    await pool.query(
      `INSERT INTO fysen.search_result_impressions (
         search_id, menu_item_id, restaurant_id, rank, match_type, match_score
       ) VALUES ($1, $2, $3, 1, 'fuzzy', 0.82)`,
      [fuzzySearchId, menuItemId, restaurantId],
    );

    const staleExactFuzzySearch = await pool.query<{ id: string }>(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count)
       VALUES ('quality burger', 'Oslo', 1)
       RETURNING id`,
    );
    const staleExactFuzzySearchId = staleExactFuzzySearch.rows[0]?.id;
    if (!staleExactFuzzySearchId) throw new Error("Expected stale exact fuzzy search event");
    await pool.query(
      `INSERT INTO fysen.search_result_impressions (
         search_id, menu_item_id, restaurant_id, rank, match_type, match_score
       ) VALUES ($1, $2, $3, 1, 'fuzzy', 0.65)`,
      [staleExactFuzzySearchId, menuItemId, restaurantId],
    );

    const staleCanonicalFuzzySearch = await pool.query<{ id: string }>(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count)
       VALUES ('quality sandwich', 'Oslo', 1)
       RETURNING id`,
    );
    const staleCanonicalFuzzySearchId = staleCanonicalFuzzySearch.rows[0]?.id;
    if (!staleCanonicalFuzzySearchId) throw new Error("Expected stale canonical fuzzy search event");
    await pool.query(
      `INSERT INTO fysen.search_result_impressions (
         search_id, menu_item_id, restaurant_id, rank, match_type, match_score
       ) VALUES ($1, $2, $3, 1, 'fuzzy', 0.66)`,
      [staleCanonicalFuzzySearchId, menuItemId, restaurantId],
    );

    await pool.query(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count)
       VALUES
         ('ramen', 'Oslo', 0),
         ('ramen', 'Oslo', 0),
         ('dumplings', 'Oslo', 0),
         ('quality burger', 'Oslo', 0),
         ('quality sandwich', 'Oslo', 0)`,
    );
  });

  afterAll(async () => {
    await pool.end();
  });

  it("reports fresh coverage, current-index demand review and matching quality", async () => {
    const report = await buildQualityDashboard(pool);
    expect(report.totals.activeRestaurants).toBe(1);
    expect(report.totals.menuSources).toBe(1);
    expect(report.totals.healthyMenuSources).toBe(1);
    expect(report.totals.currentMenuItems).toBe(1);
    expect(report.totals.zeroResultSearches7d).toBe(5);
    expect(report.totals.unresolvedZeroResultSearches7d).toBe(3);
    expect(report.totals.conversions7d).toBe(1);

    const restaurant = report.restaurants[0];
    expect(restaurant?.name).toBe("Quality Bistro");
    expect(restaurant?.menuSources[0]).toMatchObject({
      health: "healthy",
      currentItemCount: 1,
      consecutiveFailures: 0,
      lastOutcome: "changed",
    });
    expect(restaurant?.impressions7d).toBe(5);
    expect(restaurant?.conversions7d).toBe(1);
    expect(restaurant?.hours.health).toBe("unverified");

    expect(report.matching.impressions7d).toBe(5);
    expect(report.matching.byMatchType).toEqual({
      exact: 1,
      canonical: 1,
      prefix: 0,
      contains: 0,
      fuzzy: 3,
    });
    const concept = report.matching.canonicalConcepts.find((item) => item.slug === "quality-burger");
    expect(concept).toMatchObject({
      canonicalName: "Quality Burger",
      queryAliases: ["quality burger", "quality sandwich"],
      menuAliases: ["quality burger"],
      currentMenuItemMatches: 1,
      canonicalImpressions7d: 1,
    });
    expect(report.matching.topCanonicalQueries7d[0]).toMatchObject({
      normalizedQuery: "quality sandwich",
      canonicalDishSlug: "quality-burger",
      searches7d: 1,
      impressions7d: 1,
      averageScore: 0.98,
    });

    const unresolvedFuzzy = report.matching.topFuzzyQueries7d.find((item) => item.normalizedQuery === "qualty burger");
    expect(unresolvedFuzzy).toMatchObject({
      city: "Oslo",
      searches7d: 1,
      impressions7d: 1,
      averageScore: 0.82,
      bestScore: 0.82,
      currentResolution: null,
    });
    const resolvedExactFuzzy = report.matching.topFuzzyQueries7d.find(
      (item) => item.normalizedQuery === "quality burger",
    );
    expect(resolvedExactFuzzy).toMatchObject({ city: "Oslo", currentResolution: "exact" });
    const resolvedCanonicalFuzzy = report.matching.topFuzzyQueries7d.find(
      (item) => item.normalizedQuery === "quality sandwich",
    );
    expect(resolvedCanonicalFuzzy).toMatchObject({ city: "Oslo", currentResolution: "canonical" });

    const unresolvedZeroRamen = report.topZeroResultQueries7d.find((item) => item.normalizedQuery === "ramen");
    expect(unresolvedZeroRamen).toMatchObject({ city: "Oslo", count7d: 2, currentResolution: null });
    const unresolvedZeroDumplings = report.topZeroResultQueries7d.find(
      (item) => item.normalizedQuery === "dumplings",
    );
    expect(unresolvedZeroDumplings).toMatchObject({ city: "Oslo", count7d: 1, currentResolution: null });
    const resolvedExactZero = report.topZeroResultQueries7d.find(
      (item) => item.normalizedQuery === "quality burger",
    );
    expect(resolvedExactZero).toMatchObject({ city: "Oslo", count7d: 1, currentResolution: "exact" });
    const resolvedCanonicalZero = report.topZeroResultQueries7d.find(
      (item) => item.normalizedQuery === "quality sandwich",
    );
    expect(resolvedCanonicalZero).toMatchObject({ city: "Oslo", count7d: 1, currentResolution: "canonical" });
  });
});
