import type { Pool } from "pg";

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
