import type { Pool } from "pg";

export interface UpsertRestaurantHoursSourceInput {
  readonly restaurantId: string;
  readonly url: string;
  readonly timeZone: string;
  readonly checkIntervalMinutes: number;
  readonly minimumExpectedIntervals: number;
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
         WHEN fysen.restaurant_hours_sources.url IS DISTINCT FROM EXCLUDED.url
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
