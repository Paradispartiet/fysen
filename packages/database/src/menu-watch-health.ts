import type { Pool, QueryResultRow } from "pg";
import type { WatchOutcome } from "./repository.js";

interface WatchOutcomeRow extends QueryResultRow {
  outcome: WatchOutcome;
}

export async function getLatestMenuWatchOutcome(
  pool: Pool,
  menuSourceId: string,
): Promise<WatchOutcome | null> {
  const result = await pool.query<WatchOutcomeRow>(
    `SELECT outcome
       FROM fysen.menu_watch_runs
      WHERE menu_source_id = $1
      ORDER BY started_at DESC, id DESC
      LIMIT 1`,
    [menuSourceId],
  );
  return result.rows[0]?.outcome ?? null;
}
