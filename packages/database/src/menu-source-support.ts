import type { Pool } from "pg";

export interface MenuSourceSupport {
  readonly redirectOrigins: readonly string[];
  readonly browserDataOrigins: readonly string[];
}

export const EMPTY_MENU_SOURCE_SUPPORT: MenuSourceSupport = {
  redirectOrigins: [],
  browserDataOrigins: [],
};

interface SupportRow {
  origin: string;
  allow_redirect: boolean;
  allow_browser_data: boolean;
}

export async function replaceMenuSourceSupport(
  pool: Pool,
  menuSourceId: string,
  support: MenuSourceSupport,
): Promise<void> {
  const purposes = new Map<string, { redirect: boolean; browserData: boolean }>();
  for (const origin of support.redirectOrigins) {
    purposes.set(origin, { redirect: true, browserData: purposes.get(origin)?.browserData ?? false });
  }
  for (const origin of support.browserDataOrigins) {
    purposes.set(origin, { redirect: purposes.get(origin)?.redirect ?? false, browserData: true });
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
           menu_source_id, origin, allow_redirect, allow_browser_data
         ) VALUES ($1, $2, $3, $4)`,
        [menuSourceId, origin, purpose.redirect, purpose.browserData],
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
    `SELECT origin, allow_redirect, allow_browser_data
       FROM fysen.menu_source_support_origins
      WHERE menu_source_id = $1
      ORDER BY origin ASC`,
    [menuSourceId],
  );
  return {
    redirectOrigins: result.rows.filter((row) => row.allow_redirect).map((row) => row.origin),
    browserDataOrigins: result.rows.filter((row) => row.allow_browser_data).map((row) => row.origin),
  };
}
