import type { Pool, QueryResultRow } from "pg";

export type DishSearchMatchType = "exact" | "prefix" | "contains" | "fuzzy";
export type DishSearchSort = "relevance" | "distance";

export interface DishSearchDatabaseInput {
  readonly normalizedQuery: string;
  readonly city: string;
  readonly limit: number;
  readonly latitude: number | null;
  readonly longitude: number | null;
  readonly sort: DishSearchSort;
}

export interface RestaurantActionDatabaseResult {
  readonly url: string;
  readonly sourceUrl: string;
  readonly provider: string | null;
  readonly verifiedAt: string;
  readonly expiresAt: string;
}

export interface DishSearchDatabaseResult {
  readonly menuItemId: string;
  readonly snapshotId: string;
  readonly menuSourceId: string;
  readonly dishName: string;
  readonly normalizedName: string;
  readonly description: string | null;
  readonly sectionName: string | null;
  readonly priceMinor: number | null;
  readonly currency: string;
  readonly confidence: number;
  readonly restaurantId: string;
  readonly restaurantSlug: string;
  readonly restaurantName: string;
  readonly restaurantWebsiteUrl: string | null;
  readonly restaurantAddress: string;
  readonly restaurantCity: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly distanceMeters: number | null;
  readonly sourceUrl: string;
  readonly observedAt: string;
  readonly lastCheckedAt: string;
  readonly freshUntil: string;
  readonly bookingAction: RestaurantActionDatabaseResult | null;
  readonly orderAction: RestaurantActionDatabaseResult | null;
  readonly matchType: DishSearchMatchType;
  readonly score: number;
}

interface DishSearchRow extends QueryResultRow {
  menu_item_id: string;
  snapshot_id: string;
  menu_source_id: string;
  original_name: string;
  normalized_name: string;
  description: string | null;
  section_name: string | null;
  price_minor: number | null;
  currency: string;
  confidence: number;
  restaurant_id: string;
  restaurant_slug: string;
  restaurant_name: string;
  website_url: string | null;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  distance_meters: number | null;
  source_url: string;
  observed_at: Date;
  last_checked_at: Date;
  fresh_until: Date;
  booking_url: string | null;
  booking_source_url: string | null;
  booking_provider: string | null;
  booking_verified_at: Date | null;
  booking_expires_at: Date | null;
  order_url: string | null;
  order_source_url: string | null;
  order_provider: string | null;
  order_verified_at: Date | null;
  order_expires_at: Date | null;
  match_type: DishSearchMatchType;
  score: number;
}

function mapAction(
  url: string | null,
  sourceUrl: string | null,
  provider: string | null,
  verifiedAt: Date | null,
  expiresAt: Date | null,
): RestaurantActionDatabaseResult | null {
  if (!url || !sourceUrl || !verifiedAt || !expiresAt) return null;
  return {
    url,
    sourceUrl,
    provider,
    verifiedAt: verifiedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };
}

function mapRow(row: DishSearchRow): DishSearchDatabaseResult {
  return {
    menuItemId: row.menu_item_id,
    snapshotId: row.snapshot_id,
    menuSourceId: row.menu_source_id,
    dishName: row.original_name,
    normalizedName: row.normalized_name,
    description: row.description,
    sectionName: row.section_name,
    priceMinor: row.price_minor,
    currency: row.currency,
    confidence: Number(row.confidence),
    restaurantId: row.restaurant_id,
    restaurantSlug: row.restaurant_slug,
    restaurantName: row.restaurant_name,
    restaurantWebsiteUrl: row.website_url,
    restaurantAddress: row.address,
    restaurantCity: row.city,
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    distanceMeters: row.distance_meters === null ? null : Number(row.distance_meters),
    sourceUrl: row.source_url,
    observedAt: row.observed_at.toISOString(),
    lastCheckedAt: row.last_checked_at.toISOString(),
    freshUntil: row.fresh_until.toISOString(),
    bookingAction: mapAction(
      row.booking_url,
      row.booking_source_url,
      row.booking_provider,
      row.booking_verified_at,
      row.booking_expires_at,
    ),
    orderAction: mapAction(
      row.order_url,
      row.order_source_url,
      row.order_provider,
      row.order_verified_at,
      row.order_expires_at,
    ),
    matchType: row.match_type,
    score: Number(row.score),
  };
}

export async function searchDishes(
  pool: Pool,
  input: DishSearchDatabaseInput,
): Promise<readonly DishSearchDatabaseResult[]> {
  const result = await pool.query<DishSearchRow>(
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
        item.id AS menu_item_id,
        latest.id AS snapshot_id,
        source.id AS menu_source_id,
        item.original_name,
        item.normalized_name,
        item.description,
        item.section_name,
        item.price_minor,
        item.currency,
        item.confidence,
        restaurant.id AS restaurant_id,
        restaurant.slug AS restaurant_slug,
        restaurant.name AS restaurant_name,
        restaurant.website_url,
        restaurant.address,
        restaurant.city,
        ST_Y(restaurant.location::geometry) AS latitude,
        ST_X(restaurant.location::geometry) AS longitude,
        CASE
          WHEN $4::double precision IS NOT NULL AND $5::double precision IS NOT NULL
          THEN ST_Distance(
            restaurant.location,
            ST_SetSRID(ST_MakePoint($5::double precision, $4::double precision), 4326)::geography
          )
          ELSE NULL
        END AS distance_meters,
        source.url AS source_url,
        latest.fetched_at AS observed_at,
        source.last_checked_at,
        source.last_checked_at
          + make_interval(mins => GREATEST(source.check_interval_minutes * 3, 1440)) AS fresh_until,
        booking_action.url AS booking_url,
        booking_action.source_url AS booking_source_url,
        booking_action.provider AS booking_provider,
        booking_action.verified_at AS booking_verified_at,
        booking_action.expires_at AS booking_expires_at,
        order_action.url AS order_url,
        order_action.source_url AS order_source_url,
        order_action.provider AS order_provider,
        order_action.verified_at AS order_verified_at,
        order_action.expires_at AS order_expires_at,
        CASE
          WHEN item.normalized_name = $1 THEN 'exact'
          WHEN item.normalized_name LIKE $1 || '%' THEN 'prefix'
          WHEN item.normalized_name LIKE '%' || $1 || '%' THEN 'contains'
          ELSE 'fuzzy'
        END AS match_type,
        CASE
          WHEN item.normalized_name = $1 THEN 1.0
          WHEN item.normalized_name LIKE $1 || '%' THEN 0.95
          WHEN item.normalized_name LIKE '%' || $1 || '%' THEN 0.90
          ELSE LEAST(0.89, GREATEST(0.0, similarity(item.normalized_name, $1)))
        END AS score
      FROM latest_snapshots AS latest
      JOIN fysen.menu_items AS item ON item.snapshot_id = latest.id
      JOIN fysen.menu_sources AS source ON source.id = latest.menu_source_id
      JOIN fysen.restaurants AS restaurant ON restaurant.id = source.restaurant_id
      LEFT JOIN fysen.restaurant_actions AS booking_action
        ON booking_action.restaurant_id = restaurant.id
       AND booking_action.action_type = 'booking'
       AND booking_action.enabled = true
       AND booking_action.expires_at > now()
      LEFT JOIN fysen.restaurant_actions AS order_action
        ON order_action.restaurant_id = restaurant.id
       AND order_action.action_type = 'order'
       AND order_action.enabled = true
       AND order_action.expires_at > now()
      WHERE lower(restaurant.city) = lower($2)
        AND (
          item.normalized_name = $1
          OR item.normalized_name LIKE $1 || '%'
          OR item.normalized_name LIKE '%' || $1 || '%'
          OR item.normalized_name % $1
        )
      ORDER BY
        CASE
          WHEN $6 = 'distance'
            AND $4::double precision IS NOT NULL
            AND $5::double precision IS NOT NULL
          THEN ST_Distance(
            restaurant.location,
            ST_SetSRID(ST_MakePoint($5::double precision, $4::double precision), 4326)::geography
          )
          ELSE NULL
        END ASC NULLS LAST,
        score DESC,
        CASE
          WHEN $6 = 'relevance'
            AND $4::double precision IS NOT NULL
            AND $5::double precision IS NOT NULL
          THEN ST_Distance(
            restaurant.location,
            ST_SetSRID(ST_MakePoint($5::double precision, $4::double precision), 4326)::geography
          )
          ELSE NULL
        END ASC NULLS LAST,
        item.confidence DESC,
        latest.fetched_at DESC,
        restaurant.name ASC,
        item.position ASC
      LIMIT $3
    `,
    [input.normalizedQuery, input.city, input.limit, input.latitude, input.longitude, input.sort],
  );

  return result.rows.map(mapRow);
}
