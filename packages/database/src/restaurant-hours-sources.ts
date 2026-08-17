import type { Pool, QueryResultRow } from "pg";
import type { RestaurantHoursSourceTarget } from "./restaurant-hours.js";

export interface UpsertRestaurantHoursSourceInput {
  readonly restaurantId: string;
  readonly url: string;
  readonly timeZone: string;
  readonly checkIntervalMinutes: number;
  readonly minimumExpectedIntervals: number;
}

interface RestaurantHoursSourceRow extends QueryResultRow {
  id: string;
  restaurant_id: string;
  restaurant_slug: string;
  restaurant_name: string;
  service_type: "kitchen";
  url: string;
  time_zone: string;
  extractor: "visible_text_v1";
  check_interval_minutes: number;
  minimum_expected_intervals: number;
  etag: string | null;
  last_modified: string | null;
  last_schedule_fingerprint: string | null;
}

function mapRestaurantHoursSource(row: RestaurantHoursSourceRow): RestaurantHoursSourceTarget {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    restaurantSlug: row.restaurant_slug,
    restaurantName: row.restaurant_name,
    serviceType: row.service_type,
    url: row.url,
    timeZone: row.time_zone,
    extractor: row.extractor,
    checkIntervalMinutes: Number(row.check_interval_minutes),
    minimumExpectedIntervals: Number(row.minimum_expected_intervals),
    etag: row.etag,
    lastModified: row.last_modified,
    lastScheduleFingerprint: row.last_schedule_fingerprint,
  };
}

export async function getRestaurantHoursSourceById(
  pool: Pool,
  sourceId: string,
): Promise<RestaurantHoursSourceTarget | null> {
  const result = await pool.query<RestaurantHoursSourceRow>(
    `SELECT s.id,
            s.restaurant_id,
            r.slug AS restaurant_slug,
            r.name AS restaurant_name,
            s.service_type,
            s.url,
            s.time_zone,
            s.extractor,
            s.check_interval_minutes,
            s.minimum_expected_intervals,
            s.etag,
            s.last_modified,
            s.last_schedule_fingerprint
       FROM fysen.restaurant_hours_sources s
       JOIN fysen.restaurants r ON r.id = s.restaurant_id
      WHERE s.id = $1
        AND s.enabled = true
      LIMIT 1`,
    [sourceId],
  );
  const row = result.rows[0];
  return row ? mapRestaurantHoursSource(row) : null;
}

export async function upsertRestaurantHoursSource(
  pool: Pool,
  input: UpsertRestaurantHoursSourceInput,
): Promise<string> {
  const result = await pool.query<{ id: string }>(
    `INSERT INTO fysen.restaurant_hours_sources (
       restaurant_id,
       service_type,
       url,
       time_zone,
       extractor,
       check_interval_minutes,
       minimum_expected_intervals,
       next_check_at,
       enabled
     ) VALUES ($1, 'kitchen', $2, $3, 'visible_text_v1', $4, $5, now(), true)
     ON CONFLICT (restaurant_id, service_type) DO UPDATE SET
       url = EXCLUDED.url,
       time_zone = EXCLUDED.time_zone,
       extractor = EXCLUDED.extractor,
       check_interval_minutes = EXCLUDED.check_interval_minutes,
       minimum_expected_intervals = EXCLUDED.minimum_expected_intervals,
       next_check_at = CASE
         WHEN fysen.restaurant_hours_sources.last_checked_at IS NULL
           OR fysen.restaurant_hours_sources.url IS DISTINCT FROM EXCLUDED.url
           OR fysen.restaurant_hours_sources.time_zone IS DISTINCT FROM EXCLUDED.time_zone
           OR fysen.restaurant_hours_sources.minimum_expected_intervals IS DISTINCT FROM EXCLUDED.minimum_expected_intervals
         THEN now()
         ELSE fysen.restaurant_hours_sources.next_check_at
       END,
       enabled = true,
       updated_at = now()
     RETURNING id`,
    [
      input.restaurantId,
      input.url,
      input.timeZone,
      input.checkIntervalMinutes,
      input.minimumExpectedIntervals,
    ],
  );
  const id = result.rows[0]?.id;
  if (!id) throw new Error("Restaurant hours source upsert did not return an id");
  return id;
}
