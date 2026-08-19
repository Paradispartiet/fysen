import type { Pool, QueryResultRow } from "pg";

export type DemandSafeResolution = "exact" | "canonical" | "prefix" | "contains";
export type DemandGapSignal = "zero_result" | "fuzzy_only" | "zero_and_fuzzy";
export type DemandGapReviewLane = "coverage_or_alias" | "alias_or_parser";

export interface DemandLoopSignal {
  readonly normalizedQuery: string;
  readonly city: string;
  readonly searches7d: number;
  readonly zeroResultSearches7d: number;
  readonly fuzzySearches7d: number;
  readonly fuzzyImpressions7d: number;
  readonly averageFuzzyScore: number | null;
  readonly bestFuzzyScore: number | null;
  readonly lastSeenAt: string;
  readonly signal: DemandGapSignal;
  readonly reviewLane: DemandGapReviewLane;
  readonly currentResolution: DemandSafeResolution | null;
}

export interface DemandLoopReport {
  readonly generatedAt: string;
  readonly totals: {
    readonly explicitSignalSearches7d: number;
    readonly unresolvedSignalSearches7d: number;
    readonly resolvedSignalSearches7d: number;
    readonly queueSize: number;
    readonly legacyUnclassifiedSignalSearches7d: number;
  };
  readonly queue: readonly DemandLoopSignal[];
  readonly resolvedByCurrentIndex: readonly DemandLoopSignal[];
}

interface DemandRow extends QueryResultRow {
  normalized_query: string;
  city: string;
  searches_7d: number;
  zero_result_searches_7d: number;
  fuzzy_searches_7d: number;
  fuzzy_impressions_7d: number;
  average_fuzzy_score: number | null;
  best_fuzzy_score: number | null;
  last_seen_at: Date;
  current_resolution: string | null;
}

interface CountRow extends QueryResultRow {
  count: number;
}

function safeResolution(value: string | null): DemandSafeResolution | null {
  if (value === "exact" || value === "canonical" || value === "prefix" || value === "contains") return value;
  return null;
}

function finiteScore(value: number | null): number | null {
  if (value === null) return null;
  const score = Number(value);
  return Number.isFinite(score) ? score : null;
}

function signalFor(zeroResultSearches: number, fuzzySearches: number): DemandGapSignal {
  if (zeroResultSearches > 0 && fuzzySearches > 0) return "zero_and_fuzzy";
  if (zeroResultSearches > 0) return "zero_result";
  return "fuzzy_only";
}

function reviewLaneFor(zeroResultSearches: number): DemandGapReviewLane {
  return zeroResultSearches > 0 ? "coverage_or_alias" : "alias_or_parser";
}

function compareSignals(left: DemandLoopSignal, right: DemandLoopSignal): number {
  return (
    right.searches7d - left.searches7d ||
    right.zeroResultSearches7d - left.zeroResultSearches7d ||
    right.fuzzySearches7d - left.fuzzySearches7d ||
    right.lastSeenAt.localeCompare(left.lastSeenAt) ||
    left.normalizedQuery.localeCompare(right.normalizedQuery, "nb") ||
    left.city.localeCompare(right.city, "nb")
  );
}

function mapSignal(row: DemandRow): DemandLoopSignal {
  const zeroResultSearches7d = Number(row.zero_result_searches_7d);
  const fuzzySearches7d = Number(row.fuzzy_searches_7d);
  return {
    normalizedQuery: row.normalized_query,
    city: row.city,
    searches7d: Number(row.searches_7d),
    zeroResultSearches7d,
    fuzzySearches7d,
    fuzzyImpressions7d: Number(row.fuzzy_impressions_7d),
    averageFuzzyScore: finiteScore(row.average_fuzzy_score),
    bestFuzzyScore: finiteScore(row.best_fuzzy_score),
    lastSeenAt: row.last_seen_at.toISOString(),
    signal: signalFor(zeroResultSearches7d, fuzzySearches7d),
    reviewLane: reviewLaneFor(zeroResultSearches7d),
    currentResolution: safeResolution(row.current_resolution),
  };
}

export async function buildDemandLoop(pool: Pool): Promise<DemandLoopReport> {
  const [signalResult, legacyResult] = await Promise.all([
    pool.query<DemandRow>(`
      WITH explicit_history AS (
        SELECT
          search.id AS search_id,
          search.normalized_query,
          search.city,
          search.result_count,
          search.occurred_at,
          impression.id AS impression_id,
          impression.match_type,
          impression.match_score
        FROM fysen.search_events AS search
        LEFT JOIN fysen.search_result_impressions AS impression
          ON impression.search_id = search.id
        WHERE search.demand_source = 'explicit_search'
          AND search.occurred_at >= now() - interval '7 days'
      ),
      history AS (
        SELECT
          normalized_query,
          city,
          count(DISTINCT search_id)
            FILTER (WHERE result_count = 0 OR match_type = 'fuzzy')::integer AS searches_7d,
          count(DISTINCT search_id)
            FILTER (WHERE result_count = 0)::integer AS zero_result_searches_7d,
          count(DISTINCT search_id)
            FILTER (WHERE match_type = 'fuzzy')::integer AS fuzzy_searches_7d,
          count(impression_id)
            FILTER (WHERE match_type = 'fuzzy')::integer AS fuzzy_impressions_7d,
          avg(match_score)
            FILTER (WHERE match_type = 'fuzzy')::double precision AS average_fuzzy_score,
          max(match_score)
            FILTER (WHERE match_type = 'fuzzy')::double precision AS best_fuzzy_score,
          max(occurred_at)
            FILTER (WHERE result_count = 0 OR match_type = 'fuzzy') AS last_seen_at
        FROM explicit_history
        GROUP BY normalized_query, city
        HAVING count(DISTINCT search_id)
          FILTER (WHERE result_count = 0 OR match_type = 'fuzzy') > 0
      ),
      latest_searchable_snapshot AS (
        SELECT DISTINCT ON (snapshot.menu_source_id)
          snapshot.id,
          snapshot.menu_source_id,
          source.restaurant_id
        FROM fysen.menu_snapshots AS snapshot
        JOIN fysen.menu_sources AS source ON source.id = snapshot.menu_source_id
        JOIN fysen.restaurants AS restaurant ON restaurant.id = source.restaurant_id
        WHERE source.enabled = true
          AND restaurant.active = true
          AND source.last_checked_at IS NOT NULL
          AND now() <= source.last_checked_at
            + make_interval(mins => GREATEST(source.check_interval_minutes * 3, 1440))
        ORDER BY snapshot.menu_source_id, snapshot.fetched_at DESC, snapshot.created_at DESC
      ),
      current_searchable_items AS (
        SELECT item.normalized_name, restaurant.city
        FROM latest_searchable_snapshot AS latest
        JOIN fysen.menu_items AS item ON item.snapshot_id = latest.id
        JOIN fysen.restaurants AS restaurant ON restaurant.id = latest.restaurant_id
      ),
      replayed AS (
        SELECT
          history.*,
          CASE
            WHEN EXISTS (
              SELECT 1
              FROM current_searchable_items AS current_item
              WHERE lower(current_item.city) = lower(history.city)
                AND current_item.normalized_name = history.normalized_query
            ) THEN 'exact'
            WHEN EXISTS (
              SELECT 1
              FROM fysen.dish_aliases AS query_alias
              JOIN fysen.dish_concepts AS concept
                ON concept.id = query_alias.dish_concept_id
               AND concept.active = true
              JOIN fysen.dish_aliases AS menu_alias
                ON menu_alias.dish_concept_id = concept.id
               AND menu_alias.alias_scope IN ('menu', 'both')
              JOIN current_searchable_items AS current_item
                ON current_item.normalized_name = menu_alias.normalized_alias
               AND lower(current_item.city) = lower(history.city)
              WHERE query_alias.normalized_alias = history.normalized_query
                AND query_alias.alias_scope IN ('query', 'both')
            ) THEN 'canonical'
            WHEN EXISTS (
              SELECT 1
              FROM current_searchable_items AS current_item
              WHERE lower(current_item.city) = lower(history.city)
                AND current_item.normalized_name LIKE history.normalized_query || '%'
            ) THEN 'prefix'
            WHEN EXISTS (
              SELECT 1
              FROM current_searchable_items AS current_item
              WHERE lower(current_item.city) = lower(history.city)
                AND current_item.normalized_name LIKE '%' || history.normalized_query || '%'
            ) THEN 'contains'
            ELSE NULL
          END AS current_resolution
        FROM history
      )
      SELECT
        normalized_query,
        city,
        searches_7d,
        zero_result_searches_7d,
        fuzzy_searches_7d,
        fuzzy_impressions_7d,
        average_fuzzy_score,
        best_fuzzy_score,
        last_seen_at,
        current_resolution
      FROM replayed
    `),
    pool.query<CountRow>(`
      SELECT count(*)::integer AS count
      FROM fysen.search_events AS search
      WHERE search.demand_source = 'legacy_unclassified'
        AND search.occurred_at >= now() - interval '7 days'
        AND (
          search.result_count = 0
          OR EXISTS (
            SELECT 1
            FROM fysen.search_result_impressions AS impression
            WHERE impression.search_id = search.id
              AND impression.match_type = 'fuzzy'
          )
        )
    `),
  ]);

  const signals = signalResult.rows.map(mapSignal).sort(compareSignals);
  const unresolved = signals.filter((signal) => signal.currentResolution === null);
  const resolved = signals.filter((signal) => signal.currentResolution !== null);
  const signalSearchCount = (items: readonly DemandLoopSignal[]) =>
    items.reduce((sum, signal) => sum + signal.searches7d, 0);

  return {
    generatedAt: new Date().toISOString(),
    totals: {
      explicitSignalSearches7d: signalSearchCount(signals),
      unresolvedSignalSearches7d: signalSearchCount(unresolved),
      resolvedSignalSearches7d: signalSearchCount(resolved),
      queueSize: Math.min(unresolved.length, 20),
      legacyUnclassifiedSignalSearches7d: Number(legacyResult.rows[0]?.count ?? 0),
    },
    queue: unresolved.slice(0, 20),
    resolvedByCurrentIndex: resolved.slice(0, 20),
  };
}
