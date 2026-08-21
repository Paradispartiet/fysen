import type { Pool, QueryResultRow } from "pg";

interface MenuSourceAuthorityRow extends QueryResultRow {
  id: string;
  url: string;
  enabled: boolean;
}

export interface EnabledMenuSourceSummary {
  readonly id: string;
  readonly url: string;
}

export interface ReplacePublishedMenuSourceAuthorityResult {
  readonly authoritativeMenuSourceId: string;
  readonly disabledOtherCount: number;
}

export async function setMenuSourceEnabled(
  pool: Pool,
  menuSourceId: string,
  enabled: boolean,
): Promise<boolean> {
  const result = await pool.query(
    `UPDATE fysen.menu_sources
        SET enabled = $2,
            next_check_at = CASE WHEN $2 THEN now() ELSE next_check_at END,
            updated_at = now()
      WHERE id = $1
        AND enabled IS DISTINCT FROM $2`,
    [menuSourceId, enabled],
  );
  return (result.rowCount ?? 0) > 0;
}

export async function listEnabledMenuSourcesForRestaurant(
  pool: Pool,
  restaurantId: string,
): Promise<readonly EnabledMenuSourceSummary[]> {
  const result = await pool.query<MenuSourceAuthorityRow>(
    `SELECT id, url, enabled
       FROM fysen.menu_sources
      WHERE restaurant_id = $1
        AND enabled = true
      ORDER BY created_at ASC, id ASC`,
    [restaurantId],
  );
  return result.rows.map((row) => ({ id: row.id, url: row.url }));
}

export async function replacePublishedMenuSourceAuthority(
  pool: Pool,
  restaurantId: string,
  authoritativeMenuSourceId: string,
): Promise<ReplacePublishedMenuSourceAuthorityResult> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const locked = await client.query<MenuSourceAuthorityRow>(
      `SELECT id, url, enabled
         FROM fysen.menu_sources
        WHERE restaurant_id = $1
        ORDER BY created_at ASC, id ASC
        FOR UPDATE`,
      [restaurantId],
    );
    const authoritative = locked.rows.find(
      (row) => row.id === authoritativeMenuSourceId,
    );
    if (!authoritative) {
      throw new Error(
        `Menu source ${authoritativeMenuSourceId} does not belong to restaurant ${restaurantId}`,
      );
    }

    const disabledOtherCount = locked.rows.filter(
      (row) => row.id !== authoritativeMenuSourceId && row.enabled,
    ).length;
    await client.query(
      `UPDATE fysen.menu_sources
          SET enabled = (id = $2),
              next_check_at = CASE WHEN id = $2 THEN now() ELSE next_check_at END,
              updated_at = now()
        WHERE restaurant_id = $1`,
      [restaurantId, authoritativeMenuSourceId],
    );
    await client.query("COMMIT");
    return { authoritativeMenuSourceId, disabledOtherCount };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
