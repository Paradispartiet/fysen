import type { Pool, QueryResultRow } from "pg";
import {
  canonicalMenuDishIdentity,
  canonicalMenuDishName,
  classifyDiscoveryCandidate,
  discoveryExclusionCategories,
  type DiscoveryExclusionCategory,
} from "./discovery-catalog.js";
import { normalizeDishName } from "@fysen/menu-core";

export interface DishBrowseDatabaseInput {
  readonly city: string;
}

export interface DishBrowseDatabaseResult {
  readonly id: string;
  readonly name: string;
  readonly query: string;
  readonly restaurantCount: number;
  readonly restaurantExamples: readonly {
    readonly id: string;
    readonly name: string;
    readonly address: string;
  }[];
}

export interface DishBrowseDatabaseQuality {
  readonly filterVersion: "consumer-v1";
  readonly rawItemCount: number;
  readonly validItemCount: number;
  readonly excludedItemCount: number;
  readonly deduplicatedItemCount: number;
  readonly exclusions: Readonly<Record<DiscoveryExclusionCategory, number>>;
}

export interface RecentlyAddedDish {
  readonly id: string;
  readonly name: string;
  readonly query: string;
  readonly restaurantName: string;
  readonly restaurantAddress: string;
  readonly priceMinor: number | null;
  readonly priceKind: "exact" | "from" | "multiple";
  readonly priceMaxMinor: number | null;
  readonly currency: string;
  readonly sourceUrl: string;
  readonly detectedAt: string;
}

export interface PopularDish {
  readonly id: string;
  readonly name: string;
  readonly query: string;
  readonly restaurantCount: number;
  readonly searchCount: number;
}

export interface DishBrowseDatabaseResponse {
  readonly dishes: readonly DishBrowseDatabaseResult[];
  readonly recentDishes: readonly RecentlyAddedDish[];
  readonly popularDishes: readonly PopularDish[];
  readonly quality: DishBrowseDatabaseQuality;
}

interface PopularSearchRow extends QueryResultRow {
  normalized_query: string;
  search_count: string;
}

interface RecentlyAddedRow extends QueryResultRow {
  menu_source_id: string;
  source_key: string;
  concept_slug: string | null;
  original_name: string;
  normalized_name: string;
  description: string | null;
  section_name: string | null;
  price_minor: number | null;
  price_kind: "exact" | "from" | "multiple";
  price_max_minor: number | null;
  currency: string;
  restaurant_id: string;
  restaurant_name: string;
  restaurant_address: string;
  source_url: string;
  detected_at: Date;
}

interface DishBrowseRow extends QueryResultRow {
  concept_slug: string | null;
  concept_name: string | null;
  preferred_query: string | null;
  original_name: string;
  normalized_name: string;
  description: string | null;
  section_name: string | null;
  price_minor: number | null;
  restaurant_id: string;
  restaurant_name: string;
  restaurant_address: string;
  confidence: number;
  position: number;
  fetched_at: Date;
}

type CompactMenuRow = readonly [
  string | null, string | null, string | null, string, string,
  string | null, string | null, number | null, number, number, string,
];

interface CompactRestaurantRow extends QueryResultRow {
  restaurant_id: string;
  restaurant_name: string;
  restaurant_address: string;
  menu_rows: readonly CompactMenuRow[];
}

export async function browseDishes(
  pool: Pool,
  input: DishBrowseDatabaseInput,
): Promise<DishBrowseDatabaseResponse> {
  const result = await pool.query<CompactRestaurantRow>(
    `
      WITH latest_snapshots AS (
        SELECT DISTINCT ON (snapshot.menu_source_id)
          snapshot.id,
          snapshot.menu_source_id,
          snapshot.fetched_at
        FROM fysen.menu_snapshots AS snapshot
        JOIN fysen.menu_sources AS source ON source.id = snapshot.menu_source_id
        JOIN fysen.restaurants AS restaurant ON restaurant.id = source.restaurant_id
        WHERE source.enabled = true
          AND restaurant.active = true
          AND source.last_checked_at IS NOT NULL
          AND now() <= source.last_checked_at
            + make_interval(mins => GREATEST(source.check_interval_minutes * 3, 1440))
        ORDER BY snapshot.menu_source_id, snapshot.fetched_at DESC, snapshot.created_at DESC
      ), browse_rows AS (
      SELECT
          concept.slug AS concept_slug,
          concept.canonical_name AS concept_name,
          COALESCE(preferred_query.normalized_alias, concept.normalized_name) AS preferred_query,
          item.original_name,
          item.normalized_name,
          item.description,
          item.section_name,
          item.price_minor,
          restaurant.id AS restaurant_id,
          restaurant.name AS restaurant_name,
          restaurant.address AS restaurant_address,
          item.confidence,
          item.position,
          latest.fetched_at
        FROM latest_snapshots AS latest
        JOIN fysen.menu_items AS item ON item.snapshot_id = latest.id
        JOIN fysen.menu_sources AS source ON source.id = latest.menu_source_id
        JOIN fysen.restaurants AS restaurant ON restaurant.id = source.restaurant_id
        LEFT JOIN fysen.dish_aliases AS menu_alias
          ON menu_alias.normalized_alias = item.normalized_name
         AND menu_alias.alias_scope IN ('menu', 'both')
        LEFT JOIN fysen.dish_concepts AS concept
          ON concept.id = menu_alias.dish_concept_id
         AND concept.active = true
        LEFT JOIN LATERAL (
          SELECT query_alias.normalized_alias
          FROM fysen.dish_aliases AS query_alias
          WHERE query_alias.dish_concept_id = concept.id
            AND query_alias.alias_scope IN ('query', 'both')
          ORDER BY
            (query_alias.normalized_alias = concept.normalized_name) DESC,
            query_alias.created_at ASC
          LIMIT 1
        ) AS preferred_query ON concept.id IS NOT NULL
        WHERE lower(restaurant.city) = lower($1)
      )
      SELECT restaurant_id, restaurant_name, restaurant_address,
        json_agg(json_build_array(
          concept_slug, concept_name, preferred_query, original_name,
          normalized_name, description, section_name, price_minor,
          confidence, position, fetched_at
        )) AS menu_rows
      FROM browse_rows
      GROUP BY restaurant_id, restaurant_name, restaurant_address
    `,
    [input.city],
  );

  // Send restaurant metadata once instead of repeating it for every menu item.
  // Expand before applying the existing classification and ranking rules.
  const rows: DishBrowseRow[] = result.rows.flatMap((restaurant) =>
    restaurant.menu_rows.map(([
      concept_slug, concept_name, preferred_query, original_name, normalized_name,
      description, section_name, price_minor, confidence, position, fetched_at,
    ]) => ({
      restaurant_id: restaurant.restaurant_id,
      restaurant_name: restaurant.restaurant_name,
      restaurant_address: restaurant.restaurant_address,
      concept_slug, concept_name, preferred_query, original_name, normalized_name,
      description, section_name, price_minor, confidence, position,
      fetched_at: new Date(fetched_at),
    })),
  );

  // Only first-time additions still in an enabled, freshly checked source are eligible.
  const additions = await pool.query<RecentlyAddedRow>(
    `
      WITH candidates AS (
        SELECT changes.menu_source_id, changes.item_source_key, changes.detected_at,
          ROW_NUMBER() OVER (PARTITION BY restaurant.id ORDER BY changes.detected_at DESC, changes.id DESC) AS restaurant_rank
        FROM fysen.menu_changes AS changes
        JOIN fysen.menu_sources AS source ON source.id = changes.menu_source_id
        JOIN fysen.restaurants AS restaurant ON restaurant.id = source.restaurant_id
        WHERE changes.kind = 'added'
          AND changes.item_source_key IS NOT NULL
          AND changes.detected_at BETWEEN now() - interval '14 days' AND now()
          AND source.enabled = true
          AND restaurant.active = true
          AND lower(restaurant.city) = lower($1)
          AND source.last_checked_at IS NOT NULL
          AND now() <= source.last_checked_at
            + make_interval(mins => GREATEST(source.check_interval_minutes * 3, 1440))
          AND NOT EXISTS (
            SELECT 1 FROM fysen.menu_changes AS older
            WHERE older.menu_source_id = changes.menu_source_id
              AND older.item_source_key = changes.item_source_key
              AND older.kind = 'added'
              AND (
                older.detected_at < changes.detected_at
                OR (older.detected_at = changes.detected_at AND older.id < changes.id)
              )
          )
      )
      SELECT source.id AS menu_source_id, item.source_key, concept.slug AS concept_slug,
        item.original_name, item.normalized_name, item.description, item.section_name,
        item.price_minor, item.price_kind, item.price_max_minor, item.currency,
        restaurant.id AS restaurant_id, restaurant.name AS restaurant_name,
        restaurant.address AS restaurant_address, source.url AS source_url, candidates.detected_at
      FROM candidates
      JOIN fysen.menu_sources AS source ON source.id = candidates.menu_source_id
      JOIN fysen.restaurants AS restaurant ON restaurant.id = source.restaurant_id
      JOIN LATERAL (
        SELECT snapshot.id FROM fysen.menu_snapshots AS snapshot
        WHERE snapshot.menu_source_id = source.id
        ORDER BY snapshot.fetched_at DESC, snapshot.created_at DESC LIMIT 1
      ) AS latest ON true
      JOIN fysen.menu_items AS item
        ON item.snapshot_id = latest.id AND item.source_key = candidates.item_source_key
      LEFT JOIN fysen.dish_aliases AS menu_alias
        ON menu_alias.normalized_alias = item.normalized_name
        AND menu_alias.alias_scope IN ('menu', 'both')
      LEFT JOIN fysen.dish_concepts AS concept
        ON concept.id = menu_alias.dish_concept_id AND concept.active = true
      WHERE candidates.restaurant_rank <= 5
      ORDER BY candidates.detected_at DESC, restaurant.name, item.original_name
      LIMIT 300
    `,
    [input.city],
  );

  const exclusions = Object.fromEntries(discoveryExclusionCategories.map((category) => [category, 0])) as Record<DiscoveryExclusionCategory, number>;
  const groups = new Map<string, { rows: DishBrowseRow[]; restaurants: Set<string> }>();

  for (const row of rows) {
    const category = classifyDiscoveryCandidate({
      name: row.original_name,
      normalizedName: row.normalized_name,
      description: row.description,
      sectionName: row.section_name,
      priceMinor: row.price_minor,
    });
    if (category !== "dish") {
      exclusions[category] += 1;
      continue;
    }
    const identity = row.concept_slug ? `concept:${row.concept_slug}` : `menu:${canonicalMenuDishIdentity(row.original_name)}`;
    if (identity === "menu:") {
      exclusions.invalid_fragment += 1;
      continue;
    }
    const group = groups.get(identity) ?? { rows: [], restaurants: new Set<string>() };
    group.rows.push(row);
    group.restaurants.add(row.restaurant_id);
    groups.set(identity, group);
  }

  const dishes = [...groups.entries()].map(([id, group]) => {
    const rankedRows = [...group.rows].sort((left, right) =>
      right.confidence - left.confidence
      || right.fetched_at.getTime() - left.fetched_at.getTime()
      || left.position - right.position
      || left.restaurant_name.localeCompare(right.restaurant_name, "nb")
      || left.original_name.localeCompare(right.original_name, "nb"));
    const representative = rankedRows[0]!;
    const seenRestaurants = new Set<string>();
    const restaurantExamples = rankedRows.flatMap((row) => {
      if (seenRestaurants.has(row.restaurant_id) || seenRestaurants.size >= 2) return [];
      seenRestaurants.add(row.restaurant_id);
      return [{
        id: row.restaurant_id,
        name: row.restaurant_name,
        address: row.restaurant_address,
      }];
    });
    const name = representative.concept_name ?? canonicalMenuDishName(representative.original_name);
    return {
      id,
      name,
      query: representative.preferred_query ?? canonicalMenuDishIdentity(name),
      restaurantCount: group.restaurants.size,
      restaurantExamples,
    };
  }).sort((left, right) => left.name.localeCompare(right.name, "nb") || left.id.localeCompare(right.id));

  // Popularity comes from actual intentional user searches, not page views,
  // editorial defaults, suggestions or individual impressions.
  const popularSearches = await pool.query<PopularSearchRow>(
    `
      SELECT normalized_query, count(*)::text AS search_count
      FROM fysen.search_events
      WHERE lower(city) = lower($1)
        AND demand_source = 'explicit_search'
        AND result_count > 0
        AND occurred_at BETWEEN now() - interval '30 days' AND now()
      GROUP BY normalized_query
      HAVING count(*) >= 3
      ORDER BY count(*) DESC, normalized_query ASC
      LIMIT 200
    `,
    [input.city],
  );
  const dishesByQuery = new Map<string, DishBrowseDatabaseResult>();
  for (const dish of dishes) {
    for (const term of [dish.query, dish.name]) {
      const key = normalizeDishName(term);
      const prior = dishesByQuery.get(key);
      if (key && (!prior || dish.restaurantCount > prior.restaurantCount)) {
        dishesByQuery.set(key, dish);
      }
    }
  }
  const popularDishes: PopularDish[] = [];
  const shownPopular = new Set<string>();
  for (const row of popularSearches.rows) {
    const dish = dishesByQuery.get(normalizeDishName(row.normalized_query));
    if (!dish || shownPopular.has(dish.id)) continue;
    shownPopular.add(dish.id);
    popularDishes.push({
      id: dish.id,
      name: dish.name,
      query: dish.query,
      restaurantCount: dish.restaurantCount,
      searchCount: Number(row.search_count),
    });
    if (popularDishes.length === 6) break;
  }

  const recentDishes: RecentlyAddedDish[] = [];
  const seen = new Set<string>();
  const byRestaurant = new Map<string, number>();
  for (const row of additions.rows) {
    if (classifyDiscoveryCandidate({
      name: row.original_name,
      normalizedName: row.normalized_name,
      description: row.description,
      sectionName: row.section_name,
      priceMinor: row.price_minor,
    }) !== "dish") continue;
    const identity = row.concept_slug
      ? `concept:${row.concept_slug}`
      : `menu:${canonicalMenuDishIdentity(row.original_name)}`;
    if (identity === "menu:" || seen.has(identity)) continue;
    if ((byRestaurant.get(row.restaurant_id) ?? 0) >= 2) continue;
    const name = canonicalMenuDishName(row.original_name);
    if (!name.trim() || !row.normalized_name.trim()) continue;
    seen.add(identity);
    byRestaurant.set(row.restaurant_id, (byRestaurant.get(row.restaurant_id) ?? 0) + 1);
    recentDishes.push({
      id: `${row.menu_source_id}:${row.source_key}`,
      name,
      query: row.normalized_name,
      restaurantName: row.restaurant_name,
      restaurantAddress: row.restaurant_address,
      priceMinor: row.price_minor,
      priceKind: row.price_kind,
      priceMaxMinor: row.price_max_minor,
      currency: row.currency,
      sourceUrl: row.source_url,
      detectedAt: row.detected_at.toISOString(),
    });
    if (recentDishes.length === 8) break;
  }

  const excludedItemCount = Object.values(exclusions).reduce((sum, count) => sum + count, 0);
  const validItemCount = rows.length - excludedItemCount;
  return {
    dishes,
    recentDishes,
    popularDishes,
    quality: {
      filterVersion: "consumer-v1",
      rawItemCount: rows.length,
      validItemCount,
      excludedItemCount,
      deduplicatedItemCount: validItemCount - dishes.length,
      exclusions,
    },
  };
}
