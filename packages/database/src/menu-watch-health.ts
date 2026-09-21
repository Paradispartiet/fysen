import type { Pool, QueryResultRow } from "pg";
import type { WatchOutcome } from "./repository.js";

interface WatchOutcomeRow extends QueryResultRow {
  outcome: WatchOutcome;
}

interface MenuSourceWatchHealthRow extends QueryResultRow {
  last_checked_at: Date | null;
  check_interval_minutes: number;
  outcome: WatchOutcome | null;
}

export interface MenuSourceWatchHealth {
  readonly latestOutcome: WatchOutcome | null;
  readonly lastCheckedAt: string | null;
  readonly checkIntervalMinutes: number;
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

export async function getMenuSourceWatchHealth(
  pool: Pool,
  menuSourceId: string,
): Promise<MenuSourceWatchHealth | null> {
  const result = await pool.query<MenuSourceWatchHealthRow>(
    `SELECT source.last_checked_at,
            source.check_interval_minutes,
            watch.outcome
       FROM fysen.menu_sources AS source
       LEFT JOIN LATERAL (
         SELECT run.outcome
           FROM fysen.menu_watch_runs AS run
          WHERE run.menu_source_id = source.id
          ORDER BY run.started_at DESC, run.id DESC
          LIMIT 1
       ) AS watch ON true
      WHERE source.id = $1`,
    [menuSourceId],
  );
  const row = result.rows[0];
  if (!row) return null;
  return {
    latestOutcome: row.outcome ?? null,
    lastCheckedAt: row.last_checked_at?.toISOString() ?? null,
    checkIntervalMinutes: Number(row.check_interval_minutes),
  };
}
