import type { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabasePool } from "./client.js";
import { buildDemandLoop } from "./demand-loop.js";
import { runMigrations } from "./migrate.js";
import { MenuIndexRepository } from "./repository.js";

const databaseUrl = process.env.DATABASE_URL;
const integrationDescribe = databaseUrl ? describe : describe.skip;

integrationDescribe("demand loop integration", () => {
  let pool: Pool;

  beforeAll(async () => {
    if (!databaseUrl) throw new Error("DATABASE_URL is required for integration tests");
    pool = createDatabasePool({ connectionString: databaseUrl });
    await runMigrations(pool);
    await pool.query("TRUNCATE fysen.search_events CASCADE");
    await pool.query("TRUNCATE fysen.restaurants CASCADE");

    const repository = new MenuIndexRepository(pool);
    const restaurantId = await repository.upsertRestaurant({
      slug: "demand-loop-bistro-oslo",
      name: "Demand Loop Bistro",
      websiteUrl: "https://example.com/",
      address: "Demandgata 1",
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
      rawSha256: "d".repeat(64),
      normalizedSha256: "e".repeat(64),
      normalizedText: "Quality burger 199",
      etag: null,
      lastModified: null,
      robotsAllowed: true,
      fetchDurationMs: 5,
      extractorVersion: "demand-loop-test",
      items: [
        {
          sourceKey: "f".repeat(64),
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

    const menuItemResult = await pool.query<{ id: string }>(
      "SELECT id FROM fysen.menu_items WHERE snapshot_id = $1 LIMIT 1",
      [snapshotId],
    );
    const menuItemId = menuItemResult.rows[0]?.id;
    if (!menuItemId) throw new Error("Expected demand-loop menu item");

    const conceptResult = await pool.query<{ id: string }>(
      `INSERT INTO fysen.dish_concepts (slug, canonical_name, normalized_name, active)
       VALUES ('demand-quality-burger', 'Demand Quality Burger', 'demand quality burger', true)
       ON CONFLICT (slug) DO UPDATE SET active = true, updated_at = now()
       RETURNING id`,
    );
    const conceptId = conceptResult.rows[0]?.id;
    if (!conceptId) throw new Error("Expected demand-loop dish concept");
    await pool.query(
      `INSERT INTO fysen.dish_aliases (
         dish_concept_id, alias, normalized_alias, alias_scope, locale, curation_note
       ) VALUES
         ($1, 'Quality burger', 'quality burger', 'menu', 'en', 'Demand loop integration menu alias'),
         ($1, 'Quality sandwich', 'quality sandwich', 'query', 'en', 'Demand loop integration query alias')
       ON CONFLICT (normalized_alias) DO UPDATE SET
         dish_concept_id = EXCLUDED.dish_concept_id,
         alias = EXCLUDED.alias,
         alias_scope = EXCLUDED.alias_scope,
         locale = EXCLUDED.locale,
         curation_note = EXCLUDED.curation_note`,
      [conceptId],
    );

    await pool.query(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count, demand_source)
       VALUES
         ('ramen', 'Oslo', 0, 'explicit_search'),
         ('ramen', 'Oslo', 0, 'explicit_search'),
         ('fusion gap', 'Oslo', 0, 'explicit_search'),
         ('quality burger', 'Oslo', 0, 'explicit_search'),
         ('legacy ramen', 'Oslo', 0, 'legacy_unclassified')`,
    );

    const fuzzySearch = await pool.query<{ id: string }>(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count, demand_source)
       VALUES ('qualty burger', 'Oslo', 1, 'explicit_search')
       RETURNING id`,
    );
    const fuzzySearchId = fuzzySearch.rows[0]?.id;
    if (!fuzzySearchId) throw new Error("Expected unresolved fuzzy search");
    await pool.query(
      `INSERT INTO fysen.search_result_impressions (
         search_id, menu_item_id, restaurant_id, rank, match_type, match_score
       ) VALUES ($1, $2, $3, 1, 'fuzzy', 0.82)`,
      [fuzzySearchId, menuItemId, restaurantId],
    );

    const combinedFuzzySearch = await pool.query<{ id: string }>(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count, demand_source)
       VALUES ('fusion gap', 'Oslo', 1, 'explicit_search')
       RETURNING id`,
    );
    const combinedFuzzySearchId = combinedFuzzySearch.rows[0]?.id;
    if (!combinedFuzzySearchId) throw new Error("Expected combined fuzzy search");
    await pool.query(
      `INSERT INTO fysen.search_result_impressions (
         search_id, menu_item_id, restaurant_id, rank, match_type, match_score
       ) VALUES ($1, $2, $3, 1, 'fuzzy', 0.61)`,
      [combinedFuzzySearchId, menuItemId, restaurantId],
    );

    const resolvedCanonicalFuzzy = await pool.query<{ id: string }>(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count, demand_source)
       VALUES ('quality sandwich', 'Oslo', 1, 'explicit_search')
       RETURNING id`,
    );
    const resolvedCanonicalFuzzyId = resolvedCanonicalFuzzy.rows[0]?.id;
    if (!resolvedCanonicalFuzzyId) throw new Error("Expected resolved canonical fuzzy search");
    await pool.query(
      `INSERT INTO fysen.search_result_impressions (
         search_id, menu_item_id, restaurant_id, rank, match_type, match_score
       ) VALUES ($1, $2, $3, 1, 'fuzzy', 0.66)`,
      [resolvedCanonicalFuzzyId, menuItemId, restaurantId],
    );

    const legacyFuzzy = await pool.query<{ id: string }>(
      `INSERT INTO fysen.search_events (normalized_query, city, result_count, demand_source)
       VALUES ('legacy qualty burger', 'Oslo', 1, 'legacy_unclassified')
       RETURNING id`,
    );
    const legacyFuzzyId = legacyFuzzy.rows[0]?.id;
    if (!legacyFuzzyId) throw new Error("Expected legacy fuzzy search");
    await pool.query(
      `INSERT INTO fysen.search_result_impressions (
         search_id, menu_item_id, restaurant_id, rank, match_type, match_score
       ) VALUES ($1, $2, $3, 1, 'fuzzy', 0.5)`,
      [legacyFuzzyId, menuItemId, restaurantId],
    );
  });

  afterAll(async () => {
    await pool.end();
  });

  it("builds one bounded queue from explicit unresolved zero/fuzzy demand only", async () => {
    const report = await buildDemandLoop(pool);

    expect(report.totals).toMatchObject({
      explicitSignalSearches7d: 7,
      unresolvedSignalSearches7d: 5,
      resolvedSignalSearches7d: 2,
      queueSize: 3,
      legacyUnclassifiedSignalSearches7d: 2,
    });

    expect(report.queue.map((item) => item.normalizedQuery)).toEqual(["ramen", "fusion gap", "qualty burger"]);
    expect(report.queue[0]).toMatchObject({
      searches7d: 2,
      zeroResultSearches7d: 2,
      fuzzySearches7d: 0,
      signal: "zero_result",
      reviewLane: "coverage_or_alias",
      currentResolution: null,
    });
    expect(report.queue[1]).toMatchObject({
      searches7d: 2,
      zeroResultSearches7d: 1,
      fuzzySearches7d: 1,
      fuzzyImpressions7d: 1,
      signal: "zero_and_fuzzy",
      reviewLane: "coverage_or_alias",
      currentResolution: null,
    });
    expect(report.queue[2]).toMatchObject({
      searches7d: 1,
      zeroResultSearches7d: 0,
      fuzzySearches7d: 1,
      averageFuzzyScore: 0.82,
      signal: "fuzzy_only",
      reviewLane: "alias_or_parser",
      currentResolution: null,
    });

    expect(report.queue.some((item) => item.normalizedQuery.startsWith("legacy"))).toBe(false);
    expect(report.resolvedByCurrentIndex).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ normalizedQuery: "quality burger", currentResolution: "exact" }),
        expect.objectContaining({ normalizedQuery: "quality sandwich", currentResolution: "canonical" }),
      ]),
    );
  });
});
