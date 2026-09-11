import type { Pool, QueryResultRow } from "pg";

export interface MenuSourceSupport {
  readonly redirectOrigins: readonly string[];
  readonly browserDataOrigins: readonly string[];
  readonly browserBlockedOrigins?: readonly string[];
}

export const EMPTY_MENU_SOURCE_SUPPORT: MenuSourceSupport = {
  redirectOrigins: [],
  browserDataOrigins: [],
  browserBlockedOrigins: [],
};

interface SupportRow extends QueryResultRow {
  origin: string;
  allow_redirect: boolean;
  allow_browser_data: boolean;
  block_browser_request: boolean;
}

export async function replaceMenuSourceSupport(
  pool: Pool,
  menuSourceId: string,
  support: MenuSourceSupport,
): Promise<void> {
  const purposes = new Map<string, { redirect: boolean; browserData: boolean; blocked: boolean }>();
  for (const origin of support.redirectOrigins) {
    const existing = purposes.get(origin);
    if (existing?.blocked) throw new Error(`Support origin cannot be both allowed and blocked: ${origin}`);
    purposes.set(origin, {
      redirect: true,
      browserData: existing?.browserData ?? false,
      blocked: false,
    });
  }
  for (const origin of support.browserDataOrigins) {
    const existing = purposes.get(origin);
    if (existing?.blocked) throw new Error(`Support origin cannot be both allowed and blocked: ${origin}`);
    purposes.set(origin, {
      redirect: existing?.redirect ?? false,
      browserData: true,
      blocked: false,
    });
  }
  for (const origin of support.browserBlockedOrigins ?? []) {
    const existing = purposes.get(origin);
    if (existing?.redirect || existing?.browserData) {
      throw new Error(`Support origin cannot be both allowed and blocked: ${origin}`);
    }
    purposes.set(origin, { redirect: false, browserData: false, blocked: true });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "DELETE FROM fysen.menu_source_support_origins WHERE menu_source_id = $1",
      [menuSourceId],
    );
    for (const [origin, purpose] of [...purposes.entries()].sort(([a], [b]) => a.localeCompare(b))) {
      await client.query(
        `INSERT INTO fysen.menu_source_support_origins (
           menu_source_id, origin, allow_redirect, allow_browser_data, block_browser_request
         ) VALUES ($1, $2, $3, $4, $5)`,
        [menuSourceId, origin, purpose.redirect, purpose.browserData, purpose.blocked],
      );
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function getMenuSourceSupport(
  pool: Pool,
  menuSourceId: string,
): Promise<MenuSourceSupport> {
  const result = await pool.query<SupportRow>(
    `SELECT origin, allow_redirect, allow_browser_data, block_browser_request
       FROM fysen.menu_source_support_origins
      WHERE menu_source_id = $1
      ORDER BY origin ASC`,
    [menuSourceId],
  );
  return {
    redirectOrigins: result.rows.filter((row) => row.allow_redirect).map((row) => row.origin),
    browserDataOrigins: result.rows.filter((row) => row.allow_browser_data).map((row) => row.origin),
    browserBlockedOrigins: result.rows
      .filter((row) => row.block_browser_request)
      .map((row) => row.origin),
  };
}
