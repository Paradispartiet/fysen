import type { Pool, QueryResultRow } from "pg";

interface DueSourceRow extends QueryResultRow {
  id: string;
}

export async function listDueMenuSourceIds(
  pool: Pool,
  limit = 25,
): Promise<readonly string[]> {
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) {
    throw new Error("Due menu source limit must be an integer between 1 and 100");
  }

  const result = await pool.query<DueSourceRow>(
    `
      SELECT id
      FROM fysen.menu_sources
      WHERE enabled = true
        AND next_check_at <= now()
      ORDER BY next_check_at ASC, id ASC
      LIMIT $1
    `,
    [limit],
  );

  return result.rows.map((row) => row.id);
}
