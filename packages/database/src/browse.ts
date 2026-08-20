import type { Pool, QueryResultRow } from "pg";
import {
  canonicalMenuDishIdentity,
  canonicalMenuDishName,
  classifyDiscoveryCandidate,
  discoveryExclusionCategories,
  type DiscoveryExclusionCategory,
} from "./discovery-catalog.js";

export interface DishBrowseDatabaseInput {
  readonly city: string;
}

export interface DishBrowseDatabaseResult {
  readonly id: string;
  readonly name: string;
  readonly query: string;
  readonly restaurantCount: number;
}

export interface DishBrowseDatabaseQuality {
  readonly filterVersion: "consumer-v1";
  readonly rawItemCount: number;
  readonly validItemCount: number;
  readonly excludedItemCount: number;
  readonly deduplicatedItemCount: number;
  readonly exclusions: Readonly<Record<DiscoveryExclusionCategory, number>>;
}

export interface DishBrowseDatabaseResponse {
  readonly dishes: readonly DishBrowseDatabaseResult[];
  readonly quality: DishBrowseDatabaseQuality;
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
  confidence: number;
  position: number;
  fetched_at: Date;
}

export async function browseDishes(
  pool: Pool,
  input: DishBrowseDatabaseInput,
): Promise<DishBrowseDatabaseResponse> {
  const result = await pool.query<DishBrowseRow>(
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
      )
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
    `,
    [input.city],
  );

  const exclusions = Object.fromEntries(discoveryExclusionCategories.map((category) => [category, 0])) as Record<DiscoveryExclusionCategory, number>;
  const groups = new Map<string, { rows: DishBrowseRow[]; restaurants: Set<string> }>();

  for (const row of result.rows) {
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
    const representative = [...group.rows].sort((left, right) =>
      right.confidence - left.confidence
      || right.fetched_at.getTime() - left.fetched_at.getTime()
      || left.position - right.position
      || left.original_name.localeCompare(right.original_name, "nb"))[0]!;
    const name = representative.concept_name ?? canonicalMenuDishName(representative.original_name);
    return {
      id,
      name,
      query: representative.preferred_query ?? canonicalMenuDishIdentity(name),
      restaurantCount: group.restaurants.size,
    };
  }).sort((left, right) => left.name.localeCompare(right.name, "nb") || left.id.localeCompare(right.id));

  const excludedItemCount = Object.values(exclusions).reduce((sum, count) => sum + count, 0);
  const validItemCount = result.rows.length - excludedItemCount;
  return {
    dishes,
    quality: {
      filterVersion: "consumer-v1",
      rawItemCount: result.rows.length,
      validItemCount,
      excludedItemCount,
      deduplicatedItemCount: validItemCount - dishes.length,
      exclusions,
    },
  };
}
