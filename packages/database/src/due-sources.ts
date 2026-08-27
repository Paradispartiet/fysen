import type { Pool, QueryResultRow } from "pg";

interface DueSourceRow extends QueryResultRow {
  id: string;
  restaurant_slug: string;
  url: string;
}

export interface DueMenuSourceTarget {
  readonly id: string;
  readonly restaurantSlug: string;
  readonly url: string;
}

export async function listDueMenuSources(
  pool: Pool,
  limit = 25,
): Promise<readonly DueMenuSourceTarget[]> {
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) {
    throw new Error("Due menu source limit must be an integer between 1 and 100");
  }

  const result = await pool.query<DueSourceRow>(
    `
      SELECT source.id,
             restaurant.slug AS restaurant_slug,
             source.url
      FROM fysen.menu_sources AS source
      JOIN fysen.restaurants AS restaurant ON restaurant.id = source.restaurant_id
      WHERE source.enabled = true
        AND source.next_check_at <= now()
      ORDER BY source.next_check_at ASC, source.id ASC
      LIMIT $1
    `,
    [limit],
  );

  return result.rows.map((row) => ({
    id: row.id,
    restaurantSlug: row.restaurant_slug,
    url: row.url,
  }));
}

export async function listDueMenuSourceIds(
  pool: Pool,
  limit = 25,
): Promise<readonly string[]> {
  return (await listDueMenuSources(pool, limit)).map((source) => source.id);
}
