import type { Pool, QueryResultRow } from "pg";

export interface DishBrowseDatabaseInput {
  readonly city: string;
}

export interface DishBrowseDatabaseResult {
  readonly id: string;
  readonly name: string;
  readonly query: string;
  readonly restaurantCount: number;
}

interface DishBrowseRow extends QueryResultRow {
  dish_id: string;
  dish_name: string;
  search_query: string;
  restaurant_count: number;
}

export async function browseDishes(
  pool: Pool,
  input: DishBrowseDatabaseInput,
): Promise<readonly DishBrowseDatabaseResult[]> {
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
      ),
      dish_rows AS (
        SELECT
          CASE
            WHEN concept.id IS NOT NULL THEN 'concept:' || concept.slug
            ELSE 'menu:' || item.normalized_name
          END AS dish_id,
          COALESCE(concept.canonical_name, item.original_name) AS dish_name,
          COALESCE(preferred_query.normalized_alias, concept.normalized_name, item.normalized_name) AS search_query,
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
      ),
      ranked AS (
        SELECT
          dish_rows.*,
          row_number() OVER (
            PARTITION BY dish_id
            ORDER BY confidence DESC, fetched_at DESC, position ASC, dish_name ASC
          ) AS representative_rank
        FROM dish_rows
      ),
      restaurant_counts AS (
        SELECT
          dish_id,
          count(DISTINCT restaurant_id)::integer AS restaurant_count
        FROM dish_rows
        GROUP BY dish_id
      )
      SELECT
        ranked.dish_id,
        ranked.dish_name,
        ranked.search_query,
        restaurant_counts.restaurant_count
      FROM ranked
      JOIN restaurant_counts USING (dish_id)
      WHERE ranked.representative_rank = 1
      ORDER BY lower(ranked.dish_name), ranked.dish_name, ranked.dish_id
    `,
    [input.city],
  );

  return result.rows.map((row) => ({
    id: row.dish_id,
    name: row.dish_name,
    query: row.search_query,
    restaurantCount: Number(row.restaurant_count),
  }));
}
