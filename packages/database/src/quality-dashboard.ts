import type { Pool, QueryResultRow } from "pg";

export type QualityHealth = "healthy" | "degraded" | "stale" | "unverified" | "disabled";
export type QualityMatchType = "exact" | "canonical" | "prefix" | "contains" | "fuzzy";

export interface QualityMenuSourceReport {
  readonly sourceId: string;
  readonly url: string;
  readonly enabled: boolean;
  readonly health: QualityHealth;
  readonly currentItemCount: number;
  readonly lastCheckedAt: string | null;
  readonly lastChangedAt: string | null;
  readonly freshUntil: string | null;
  readonly nextCheckAt: string;
  readonly consecutiveFailures: number;
  readonly lastOutcome: string | null;
  readonly lastErrorCode: string | null;
}

export interface QualityHoursReport {
  readonly sourceUrl: string | null;
  readonly health: QualityHealth;
  readonly intervalCount: number;
  readonly lastCheckedAt: string | null;
  readonly freshUntil: string | null;
  readonly nextCheckAt: string | null;
  readonly consecutiveFailures: number;
  readonly lastOutcome: string | null;
  readonly lastErrorCode: string | null;
}

export interface QualityActionReport {
  readonly type: "booking" | "order";
  readonly enabled: boolean;
  readonly expiresAt: string;
  readonly status: "verified" | "expiring" | "expired" | "disabled";
}

export interface QualityRestaurantReport {
  readonly restaurantId: string;
  readonly slug: string;
  readonly name: string;
  readonly active: boolean;
  readonly city: string;
  readonly menuSources: readonly QualityMenuSourceReport[];
  readonly hours: QualityHoursReport;
  readonly actions: readonly QualityActionReport[];
  readonly impressions7d: number;
  readonly conversions7d: number;
}

export interface QualityZeroResultQuery {
  readonly normalizedQuery: string;
  readonly count7d: number;
  readonly lastSeenAt: string;
}

export interface QualityCanonicalConceptReport {
  readonly slug: string;
  readonly canonicalName: string;
  readonly queryAliases: readonly string[];
  readonly menuAliases: readonly string[];
  readonly currentMenuItemMatches: number;
  readonly canonicalImpressions7d: number;
}

export interface QualityCanonicalQueryReport {
  readonly normalizedQuery: string;
  readonly canonicalDishSlug: string;
  readonly canonicalDishName: string;
  readonly searches7d: number;
  readonly impressions7d: number;
  readonly averageScore: number;
}

export interface QualityFuzzyQueryReport {
  readonly normalizedQuery: string;
  readonly searches7d: number;
  readonly impressions7d: number;
  readonly averageScore: number;
  readonly bestScore: number;
}

export interface QualityMatchingReport {
  readonly impressions7d: number;
  readonly byMatchType: Readonly<Record<QualityMatchType, number>>;
  readonly canonicalConcepts: readonly QualityCanonicalConceptReport[];
  readonly topCanonicalQueries7d: readonly QualityCanonicalQueryReport[];
  readonly topFuzzyQueries7d: readonly QualityFuzzyQueryReport[];
}

export interface QualityDashboardReport {
  readonly generatedAt: string;
  readonly totals: {
    readonly activeRestaurants: number;
    readonly candidateRestaurants: number;
    readonly menuSources: number;
    readonly healthyMenuSources: number;
    readonly degradedMenuSources: number;
    readonly currentMenuItems: number;
    readonly zeroResultSearches7d: number;
    readonly conversions7d: number;
  };
  readonly restaurants: readonly QualityRestaurantReport[];
  readonly topZeroResultQueries7d: readonly QualityZeroResultQuery[];
  readonly matching: QualityMatchingReport;
}

interface SourceRow extends QueryResultRow {
  restaurant_id: string;
  restaurant_slug: string;
  restaurant_name: string;
  restaurant_active: boolean;
  restaurant_city: string;
  source_id: string;
  source_url: string;
  source_enabled: boolean;
  check_interval_minutes: number;
  source_last_checked_at: Date | null;
  source_last_changed_at: Date | null;
  source_next_check_at: Date;
  source_consecutive_failures: number;
  current_item_count: number;
  last_outcome: string | null;
  last_error_code: string | null;
  hours_source_url: string | null;
  hours_enabled: boolean | null;
  hours_check_interval_minutes: number | null;
  hours_last_checked_at: Date | null;
  hours_next_check_at: Date | null;
  hours_consecutive_failures: number | null;
  hours_interval_count: number | null;
  hours_last_outcome: string | null;
  hours_last_error_code: string | null;
  impressions_7d: number;
  conversions_7d: number;
}

interface ActionRow extends QueryResultRow {
  restaurant_id: string;
  action_type: "booking" | "order";
  enabled: boolean;
  expires_at: Date;
}

interface ZeroQueryRow extends QueryResultRow {
  normalized_query: string;
  count_7d: number;
  last_seen_at: Date;
}

interface CountRow extends QueryResultRow {
  count: number;
}

interface MatchTypeRow extends QueryResultRow {
  match_type: string;
  count_7d: number;
}

interface CanonicalConceptRow extends QueryResultRow {
  slug: string;
  canonical_name: string;
  query_aliases: string[] | null;
  menu_aliases: string[] | null;
  current_menu_item_matches: number;
  canonical_impressions_7d: number;
}

interface CanonicalQueryRow extends QueryResultRow {
  normalized_query: string;
  canonical_dish_slug: string;
  canonical_dish_name: string;
  searches_7d: number;
  impressions_7d: number;
  average_score: number;
}

interface FuzzyQueryRow extends QueryResultRow {
  normalized_query: string;
  searches_7d: number;
  impressions_7d: number;
  average_score: number;
  best_score: number;
}

function iso(value: Date | null): string | null {
  return value?.toISOString() ?? null;
}

function freshnessUntil(lastCheckedAt: Date | null, checkIntervalMinutes: number | null): string | null {
  if (!lastCheckedAt || checkIntervalMinutes === null) return null;
  const freshnessMinutes = Math.max(checkIntervalMinutes * 3, 1440);
  return new Date(lastCheckedAt.getTime() + freshnessMinutes * 60_000).toISOString();
}

function sourceHealth(input: {
  readonly enabled: boolean;
  readonly lastCheckedAt: Date | null;
  readonly freshUntil: string | null;
  readonly consecutiveFailures: number;
  readonly lastOutcome: string | null;
}): QualityHealth {
  if (!input.enabled) return "disabled";
  if (!input.lastCheckedAt || !input.freshUntil) return "unverified";
  if (new Date(input.freshUntil).getTime() < Date.now()) return "stale";
  if (
    input.consecutiveFailures > 0 ||
    input.lastOutcome === "quarantined" ||
    input.lastOutcome === "fetch_error" ||
    input.lastOutcome === "extraction_error" ||
    input.lastOutcome === "blocked_by_robots"
  ) {
    return "degraded";
  }
  return "healthy";
}

function actionStatus(enabled: boolean, expiresAt: Date): QualityActionReport["status"] {
  if (!enabled) return "disabled";
  const remainingMs = expiresAt.getTime() - Date.now();
  if (remainingMs <= 0) return "expired";
  if (remainingMs <= 7 * 24 * 60 * 60 * 1000) return "expiring";
  return "verified";
}

function isQualityMatchType(value: string): value is QualityMatchType {
  return value === "exact" || value === "canonical" || value === "prefix" || value === "contains" || value === "fuzzy";
}

function finiteScore(value: number): number {
  const score = Number(value);
  return Number.isFinite(score) ? score : 0;
}

export async function buildQualityDashboard(pool: Pool): Promise<QualityDashboardReport> {
  const [
    sourceResult,
    actionResult,
    zeroQueryResult,
    zeroCountResult,
    conversionCountResult,
    matchTypeResult,
    canonicalConceptResult,
    canonicalQueryResult,
    fuzzyQueryResult,
  ] = await Promise.all([
    pool.query<SourceRow>(`
      WITH latest_menu_snapshot AS (
        SELECT DISTINCT ON (snapshot.menu_source_id)
          snapshot.menu_source_id,
          snapshot.id
        FROM fysen.menu_snapshots AS snapshot
        ORDER BY snapshot.menu_source_id, snapshot.fetched_at DESC, snapshot.created_at DESC
      ),
      menu_item_counts AS (
        SELECT latest.menu_source_id, count(item.id)::integer AS item_count
        FROM latest_menu_snapshot AS latest
        LEFT JOIN fysen.menu_items AS item ON item.snapshot_id = latest.id
        GROUP BY latest.menu_source_id
      ),
      latest_menu_run AS (
        SELECT DISTINCT ON (run.menu_source_id)
          run.menu_source_id,
          run.outcome,
          run.error_code
        FROM fysen.menu_watch_runs AS run
        ORDER BY run.menu_source_id, run.started_at DESC, run.created_at DESC
      ),
      latest_hours_snapshot AS (
        SELECT DISTINCT ON (snapshot.source_id)
          snapshot.source_id,
          snapshot.interval_count
        FROM fysen.restaurant_hours_snapshots AS snapshot
        ORDER BY snapshot.source_id, snapshot.fetched_at DESC, snapshot.created_at DESC
      ),
      latest_hours_run AS (
        SELECT DISTINCT ON (run.source_id)
          run.source_id,
          run.outcome,
          run.error_code
        FROM fysen.restaurant_hours_watch_runs AS run
        ORDER BY run.source_id, run.started_at DESC, run.created_at DESC
      ),
      demand AS (
        SELECT
          impression.restaurant_id,
          count(DISTINCT impression.id)::integer AS impressions_7d,
          count(conversion.id)::integer AS conversions_7d
        FROM fysen.search_result_impressions AS impression
        LEFT JOIN fysen.conversion_events AS conversion
          ON conversion.impression_id = impression.id
         AND conversion.occurred_at >= now() - interval '7 days'
        WHERE impression.created_at >= now() - interval '7 days'
          AND impression.restaurant_id IS NOT NULL
        GROUP BY impression.restaurant_id
      )
      SELECT
        restaurant.id AS restaurant_id,
        restaurant.slug AS restaurant_slug,
        restaurant.name AS restaurant_name,
        restaurant.active AS restaurant_active,
        restaurant.city AS restaurant_city,
        source.id AS source_id,
        source.url AS source_url,
        source.enabled AS source_enabled,
        source.check_interval_minutes,
        source.last_checked_at AS source_last_checked_at,
        source.last_changed_at AS source_last_changed_at,
        source.next_check_at AS source_next_check_at,
        source.consecutive_failures AS source_consecutive_failures,
        coalesce(item_count.item_count, 0)::integer AS current_item_count,
        menu_run.outcome AS last_outcome,
        menu_run.error_code AS last_error_code,
        hours.url AS hours_source_url,
        hours.enabled AS hours_enabled,
        hours.check_interval_minutes AS hours_check_interval_minutes,
        hours.last_checked_at AS hours_last_checked_at,
        hours.next_check_at AS hours_next_check_at,
        hours.consecutive_failures AS hours_consecutive_failures,
        hours_snapshot.interval_count AS hours_interval_count,
        hours_run.outcome AS hours_last_outcome,
        hours_run.error_code AS hours_last_error_code,
        coalesce(demand.impressions_7d, 0)::integer AS impressions_7d,
        coalesce(demand.conversions_7d, 0)::integer AS conversions_7d
      FROM fysen.restaurants AS restaurant
      JOIN fysen.menu_sources AS source ON source.restaurant_id = restaurant.id
      LEFT JOIN menu_item_counts AS item_count ON item_count.menu_source_id = source.id
      LEFT JOIN latest_menu_run AS menu_run ON menu_run.menu_source_id = source.id
      LEFT JOIN fysen.restaurant_hours_sources AS hours
        ON hours.restaurant_id = restaurant.id
       AND hours.service_type = 'kitchen'
      LEFT JOIN latest_hours_snapshot AS hours_snapshot ON hours_snapshot.source_id = hours.id
      LEFT JOIN latest_hours_run AS hours_run ON hours_run.source_id = hours.id
      LEFT JOIN demand ON demand.restaurant_id = restaurant.id
      ORDER BY restaurant.active DESC, restaurant.name ASC, source.url ASC
    `),
    pool.query<ActionRow>(`
      SELECT restaurant_id, action_type, enabled, expires_at
      FROM fysen.restaurant_actions
      ORDER BY restaurant_id, action_type
    `),
    pool.query<ZeroQueryRow>(`
      SELECT
        normalized_query,
        count(*)::integer AS count_7d,
        max(occurred_at) AS last_seen_at
      FROM fysen.search_events
      WHERE result_count = 0
        AND occurred_at >= now() - interval '7 days'
      GROUP BY normalized_query
      ORDER BY count_7d DESC, last_seen_at DESC, normalized_query ASC
      LIMIT 20
    `),
    pool.query<CountRow>(`
      SELECT count(*)::integer AS count
      FROM fysen.search_events
      WHERE result_count = 0
        AND occurred_at >= now() - interval '7 days'
    `),
    pool.query<CountRow>(`
      SELECT count(*)::integer AS count
      FROM fysen.conversion_events
      WHERE occurred_at >= now() - interval '7 days'
    `),
    pool.query<MatchTypeRow>(`
      SELECT match_type, count(*)::integer AS count_7d
      FROM fysen.search_result_impressions
      WHERE created_at >= now() - interval '7 days'
      GROUP BY match_type
      ORDER BY match_type
    `),
    pool.query<CanonicalConceptRow>(`
      WITH latest_menu_snapshot AS (
        SELECT DISTINCT ON (snapshot.menu_source_id)
          snapshot.menu_source_id,
          snapshot.id
        FROM fysen.menu_snapshots AS snapshot
        JOIN fysen.menu_sources AS source ON source.id = snapshot.menu_source_id
        JOIN fysen.restaurants AS restaurant ON restaurant.id = source.restaurant_id
        WHERE source.enabled = true
          AND restaurant.active = true
        ORDER BY snapshot.menu_source_id, snapshot.fetched_at DESC, snapshot.created_at DESC
      ),
      current_menu_coverage AS (
        SELECT
          menu_alias.dish_concept_id,
          count(DISTINCT item.id)::integer AS current_menu_item_matches
        FROM latest_menu_snapshot AS latest
        JOIN fysen.menu_items AS item ON item.snapshot_id = latest.id
        JOIN fysen.dish_aliases AS menu_alias
          ON menu_alias.normalized_alias = item.normalized_name
         AND menu_alias.alias_scope IN ('menu', 'both')
        GROUP BY menu_alias.dish_concept_id
      ),
      canonical_demand AS (
        SELECT
          menu_alias.dish_concept_id,
          count(impression.id)::integer AS canonical_impressions_7d
        FROM fysen.search_result_impressions AS impression
        JOIN fysen.search_events AS search ON search.id = impression.search_id
        JOIN fysen.menu_items AS item ON item.id = impression.menu_item_id
        JOIN fysen.dish_aliases AS menu_alias
          ON menu_alias.normalized_alias = item.normalized_name
         AND menu_alias.alias_scope IN ('menu', 'both')
        JOIN fysen.dish_aliases AS query_alias
          ON query_alias.dish_concept_id = menu_alias.dish_concept_id
         AND query_alias.normalized_alias = search.normalized_query
         AND query_alias.alias_scope IN ('query', 'both')
        WHERE impression.match_type = 'canonical'
          AND impression.created_at >= now() - interval '7 days'
        GROUP BY menu_alias.dish_concept_id
      )
      SELECT
        concept.slug,
        concept.canonical_name,
        array_agg(alias.normalized_alias ORDER BY alias.normalized_alias)
          FILTER (WHERE alias.alias_scope IN ('query', 'both')) AS query_aliases,
        array_agg(alias.normalized_alias ORDER BY alias.normalized_alias)
          FILTER (WHERE alias.alias_scope IN ('menu', 'both')) AS menu_aliases,
        coalesce(coverage.current_menu_item_matches, 0)::integer AS current_menu_item_matches,
        coalesce(demand.canonical_impressions_7d, 0)::integer AS canonical_impressions_7d
      FROM fysen.dish_concepts AS concept
      LEFT JOIN fysen.dish_aliases AS alias ON alias.dish_concept_id = concept.id
      LEFT JOIN current_menu_coverage AS coverage ON coverage.dish_concept_id = concept.id
      LEFT JOIN canonical_demand AS demand ON demand.dish_concept_id = concept.id
      WHERE concept.active = true
      GROUP BY
        concept.id,
        concept.slug,
        concept.canonical_name,
        coverage.current_menu_item_matches,
        demand.canonical_impressions_7d
      ORDER BY concept.canonical_name ASC, concept.slug ASC
    `),
    pool.query<CanonicalQueryRow>(`
      SELECT
        search.normalized_query,
        concept.slug AS canonical_dish_slug,
        concept.canonical_name AS canonical_dish_name,
        count(DISTINCT search.id)::integer AS searches_7d,
        count(impression.id)::integer AS impressions_7d,
        avg(impression.match_score)::double precision AS average_score
      FROM fysen.search_result_impressions AS impression
      JOIN fysen.search_events AS search ON search.id = impression.search_id
      JOIN fysen.menu_items AS item ON item.id = impression.menu_item_id
      JOIN fysen.dish_aliases AS menu_alias
        ON menu_alias.normalized_alias = item.normalized_name
       AND menu_alias.alias_scope IN ('menu', 'both')
      JOIN fysen.dish_concepts AS concept
        ON concept.id = menu_alias.dish_concept_id
       AND concept.active = true
      JOIN fysen.dish_aliases AS query_alias
        ON query_alias.dish_concept_id = concept.id
       AND query_alias.normalized_alias = search.normalized_query
       AND query_alias.alias_scope IN ('query', 'both')
      WHERE impression.match_type = 'canonical'
        AND impression.created_at >= now() - interval '7 days'
      GROUP BY search.normalized_query, concept.slug, concept.canonical_name
      ORDER BY searches_7d DESC, impressions_7d DESC, search.normalized_query ASC
      LIMIT 20
    `),
    pool.query<FuzzyQueryRow>(`
      SELECT
        search.normalized_query,
        count(DISTINCT search.id)::integer AS searches_7d,
        count(impression.id)::integer AS impressions_7d,
        avg(impression.match_score)::double precision AS average_score,
        max(impression.match_score)::double precision AS best_score
      FROM fysen.search_result_impressions AS impression
      JOIN fysen.search_events AS search ON search.id = impression.search_id
      WHERE impression.match_type = 'fuzzy'
        AND impression.created_at >= now() - interval '7 days'
      GROUP BY search.normalized_query
      ORDER BY searches_7d DESC, average_score DESC, search.normalized_query ASC
      LIMIT 20
    `),
  ]);

  const actionsByRestaurant = new Map<string, QualityActionReport[]>();
  for (const row of actionResult.rows) {
    const actions = actionsByRestaurant.get(row.restaurant_id) ?? [];
    actions.push({
      type: row.action_type,
      enabled: row.enabled,
      expiresAt: row.expires_at.toISOString(),
      status: actionStatus(row.enabled, row.expires_at),
    });
    actionsByRestaurant.set(row.restaurant_id, actions);
  }

  const restaurantsById = new Map<string, QualityRestaurantReport & { menuSources: QualityMenuSourceReport[] }>();
  for (const row of sourceResult.rows) {
    const menuFreshUntil = freshnessUntil(row.source_last_checked_at, Number(row.check_interval_minutes));
    const menuSource: QualityMenuSourceReport = {
      sourceId: row.source_id,
      url: row.source_url,
      enabled: row.source_enabled,
      health: sourceHealth({
        enabled: row.source_enabled,
        lastCheckedAt: row.source_last_checked_at,
        freshUntil: menuFreshUntil,
        consecutiveFailures: Number(row.source_consecutive_failures),
        lastOutcome: row.last_outcome,
      }),
      currentItemCount: Number(row.current_item_count),
      lastCheckedAt: iso(row.source_last_checked_at),
      lastChangedAt: iso(row.source_last_changed_at),
      freshUntil: menuFreshUntil,
      nextCheckAt: row.source_next_check_at.toISOString(),
      consecutiveFailures: Number(row.source_consecutive_failures),
      lastOutcome: row.last_outcome,
      lastErrorCode: row.last_error_code,
    };

    const existing = restaurantsById.get(row.restaurant_id);
    if (existing) {
      existing.menuSources.push(menuSource);
      continue;
    }

    const hoursFreshUntil = freshnessUntil(
      row.hours_last_checked_at,
      row.hours_check_interval_minutes === null ? null : Number(row.hours_check_interval_minutes),
    );
    const hasHoursSource = row.hours_source_url !== null;
    const hours: QualityHoursReport = {
      sourceUrl: row.hours_source_url,
      health: hasHoursSource
        ? sourceHealth({
            enabled: row.hours_enabled ?? false,
            lastCheckedAt: row.hours_last_checked_at,
            freshUntil: hoursFreshUntil,
            consecutiveFailures: Number(row.hours_consecutive_failures ?? 0),
            lastOutcome: row.hours_last_outcome,
          })
        : "unverified",
      intervalCount: Number(row.hours_interval_count ?? 0),
      lastCheckedAt: iso(row.hours_last_checked_at),
      freshUntil: hoursFreshUntil,
      nextCheckAt: iso(row.hours_next_check_at),
      consecutiveFailures: Number(row.hours_consecutive_failures ?? 0),
      lastOutcome: row.hours_last_outcome,
      lastErrorCode: row.hours_last_error_code,
    };

    restaurantsById.set(row.restaurant_id, {
      restaurantId: row.restaurant_id,
      slug: row.restaurant_slug,
      name: row.restaurant_name,
      active: row.restaurant_active,
      city: row.restaurant_city,
      menuSources: [menuSource],
      hours,
      actions: actionsByRestaurant.get(row.restaurant_id) ?? [],
      impressions7d: Number(row.impressions_7d),
      conversions7d: Number(row.conversions_7d),
    });
  }

  const restaurants = [...restaurantsById.values()];
  const menuSources = restaurants.flatMap((restaurant) => restaurant.menuSources);
  const byMatchType: Record<QualityMatchType, number> = {
    exact: 0,
    canonical: 0,
    prefix: 0,
    contains: 0,
    fuzzy: 0,
  };
  for (const row of matchTypeResult.rows) {
    if (isQualityMatchType(row.match_type)) byMatchType[row.match_type] = Number(row.count_7d);
  }

  return {
    generatedAt: new Date().toISOString(),
    totals: {
      activeRestaurants: restaurants.filter((restaurant) => restaurant.active).length,
      candidateRestaurants: restaurants.filter((restaurant) => !restaurant.active).length,
      menuSources: menuSources.length,
      healthyMenuSources: menuSources.filter((source) => source.health === "healthy").length,
      degradedMenuSources: menuSources.filter((source) => source.health !== "healthy" && source.health !== "disabled").length,
      currentMenuItems: menuSources.reduce((sum, source) => sum + source.currentItemCount, 0),
      zeroResultSearches7d: Number(zeroCountResult.rows[0]?.count ?? 0),
      conversions7d: Number(conversionCountResult.rows[0]?.count ?? 0),
    },
    restaurants,
    topZeroResultQueries7d: zeroQueryResult.rows.map((row) => ({
      normalizedQuery: row.normalized_query,
      count7d: Number(row.count_7d),
      lastSeenAt: row.last_seen_at.toISOString(),
    })),
    matching: {
      impressions7d: Object.values(byMatchType).reduce((sum, count) => sum + count, 0),
      byMatchType,
      canonicalConcepts: canonicalConceptResult.rows.map((row) => ({
        slug: row.slug,
        canonicalName: row.canonical_name,
        queryAliases: row.query_aliases ?? [],
        menuAliases: row.menu_aliases ?? [],
        currentMenuItemMatches: Number(row.current_menu_item_matches),
        canonicalImpressions7d: Number(row.canonical_impressions_7d),
      })),
      topCanonicalQueries7d: canonicalQueryResult.rows.map((row) => ({
        normalizedQuery: row.normalized_query,
        canonicalDishSlug: row.canonical_dish_slug,
        canonicalDishName: row.canonical_dish_name,
        searches7d: Number(row.searches_7d),
        impressions7d: Number(row.impressions_7d),
        averageScore: finiteScore(row.average_score),
      })),
      topFuzzyQueries7d: fuzzyQueryResult.rows.map((row) => ({
        normalizedQuery: row.normalized_query,
        searches7d: Number(row.searches_7d),
        impressions7d: Number(row.impressions_7d),
        averageScore: finiteScore(row.average_score),
        bestScore: finiteScore(row.best_score),
      })),
    },
  };
}
