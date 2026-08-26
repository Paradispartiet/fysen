import type { Pool, QueryResultRow } from "pg";

export interface CanonicalRestaurantCoverageKey {
  readonly slug: string;
  readonly city: string;
}

export interface CatalogCoverageReconcileResult {
  readonly quiescedRestaurantCount: number;
  readonly deactivatedRestaurantCount: number;
  readonly menuSourcesDisabled: number;
  readonly hoursSourcesDisabled: number;
  readonly actionsDisabled: number;
  readonly slugs: readonly string[];
}

interface CatalogCoverageRow extends QueryResultRow {
  id: string;
  slug: string;
  active: boolean;
}

export async function reconcileRestaurantCatalogCoverage(
  pool: Pool,
  canonicalRestaurants: readonly CanonicalRestaurantCoverageKey[],
): Promise<CatalogCoverageReconcileResult> {
  if (canonicalRestaurants.length === 0) {
    throw new Error("Refusing to reconcile restaurant coverage from an empty canonical catalog");
  }

  const canonicalSlugs = [...new Set(canonicalRestaurants.map((entry) => entry.slug))].sort();
  const cities = [...new Set(canonicalRestaurants.map((entry) => entry.city))].sort();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const stale = await client.query<CatalogCoverageRow>(
      `SELECT restaurant.id, restaurant.slug, restaurant.active
         FROM fysen.restaurants AS restaurant
        WHERE restaurant.city = ANY($2::text[])
          AND NOT (restaurant.slug = ANY($1::text[]))
          AND (
            restaurant.active = true
            OR EXISTS (
              SELECT 1 FROM fysen.menu_sources AS source
               WHERE source.restaurant_id = restaurant.id AND source.enabled = true
            )
            OR EXISTS (
              SELECT 1 FROM fysen.restaurant_hours_sources AS hours
               WHERE hours.restaurant_id = restaurant.id AND hours.enabled = true
            )
            OR EXISTS (
              SELECT 1 FROM fysen.restaurant_actions AS action
               WHERE action.restaurant_id = restaurant.id AND action.enabled = true
            )
          )
        ORDER BY restaurant.slug
        FOR UPDATE OF restaurant`,
      [canonicalSlugs, cities],
    );

    if (stale.rows.length === 0) {
      await client.query("COMMIT");
      return {
        quiescedRestaurantCount: 0,
        deactivatedRestaurantCount: 0,
        menuSourcesDisabled: 0,
        hoursSourcesDisabled: 0,
        actionsDisabled: 0,
        slugs: [],
      };
    }

    const restaurantIds = stale.rows.map((row) => row.id);
    const deactivated = await client.query(
      `UPDATE fysen.restaurants
          SET active = false,
              updated_at = now()
        WHERE id = ANY($1::uuid[])
          AND active = true`,
      [restaurantIds],
    );
    const menuSources = await client.query(
      `UPDATE fysen.menu_sources
          SET enabled = false,
              updated_at = now()
        WHERE restaurant_id = ANY($1::uuid[])
          AND enabled = true`,
      [restaurantIds],
    );
    const hoursSources = await client.query(
      `UPDATE fysen.restaurant_hours_sources
          SET enabled = false,
              updated_at = now()
        WHERE restaurant_id = ANY($1::uuid[])
          AND enabled = true`,
      [restaurantIds],
    );
    const actions = await client.query(
      `UPDATE fysen.restaurant_actions
          SET enabled = false,
              updated_at = now()
        WHERE restaurant_id = ANY($1::uuid[])
          AND enabled = true`,
      [restaurantIds],
    );

    await client.query("COMMIT");
    return {
      quiescedRestaurantCount: stale.rows.length,
      deactivatedRestaurantCount: deactivated.rowCount ?? 0,
      menuSourcesDisabled: menuSources.rowCount ?? 0,
      hoursSourcesDisabled: hoursSources.rowCount ?? 0,
      actionsDisabled: actions.rowCount ?? 0,
      slugs: stale.rows.map((row) => row.slug),
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
