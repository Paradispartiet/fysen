import {
  createDatabasePool,
  getMenuSourceSupport,
  listDueMenuSourceIds,
  MenuIndexRepository,
  type WatchOutcome,
} from "@fysen/database";
import { HttpMenuClient } from "./http-client.js";
import { watchMenuSourceOnce, type MenuWatchSummary } from "./watcher.js";

const failingOutcomes = new Set<WatchOutcome>([
  "blocked_by_robots",
  "fetch_error",
  "extraction_error",
  "quarantined",
]);

export interface DueMenuSourceResult {
  readonly menuSourceId: string;
  readonly summary: MenuWatchSummary | null;
  readonly error: string | null;
}

export interface DueMenuRunSummary {
  readonly dueCount: number;
  readonly failedCount: number;
  readonly results: readonly DueMenuSourceResult[];
}

export async function runDueMenuSources(limit = 25): Promise<DueMenuRunSummary> {
  const pool = createDatabasePool();
  try {
    const repository = new MenuIndexRepository(pool);
    const httpClient = new HttpMenuClient();
    const sourceIds = await listDueMenuSourceIds(pool, limit);
    const results: DueMenuSourceResult[] = [];
    let failedCount = 0;

    for (const menuSourceId of sourceIds) {
      try {
        const sourceSupport = await getMenuSourceSupport(pool, menuSourceId);
        const summary = await watchMenuSourceOnce(repository, menuSourceId, httpClient, sourceSupport);
        if (failingOutcomes.has(summary.outcome)) failedCount += 1;
        results.push({ menuSourceId, summary, error: null });
      } catch (error) {
        failedCount += 1;
        results.push({
          menuSourceId,
          summary: null,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return { dueCount: sourceIds.length, failedCount, results };
  } finally {
    await pool.end();
  }
}
