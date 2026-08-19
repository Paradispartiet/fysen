import { createHash, randomBytes } from "node:crypto";
import type { Pool, PoolClient, QueryResultRow } from "pg";
import { buildDemandLoop } from "./demand-loop.js";

export interface FysenProSetupTokenReceipt {
  readonly setupToken: string;
  readonly expiresAt: string;
}

export interface FysenProSessionReceipt {
  readonly sessionToken: string;
  readonly expiresAt: string;
}

export interface FysenProDashboard {
  readonly restaurant: {
    readonly slug: string;
    readonly name: string;
    readonly address: string;
    readonly city: string;
  };
  readonly periodDays: 30;
  readonly metrics: {
    readonly impressions: number;
    readonly clicks: number;
    readonly ctr: number;
    readonly clickBreakdown: {
      readonly menu: number;
      readonly restaurant: number;
      readonly directions: number;
      readonly booking: number;
      readonly order: number;
    };
  };
  readonly topDishes: readonly {
    readonly name: string;
    readonly impressions: number;
    readonly clicks: number;
  }[];
  readonly menuSources: readonly {
    readonly url: string;
    readonly enabled: boolean;
    readonly lastCheckedAt: string | null;
    readonly freshUntil: string | null;
    readonly consecutiveFailures: number;
    readonly latestOutcome: string | null;
  }[];
  readonly actions: readonly {
    readonly type: "booking" | "order";
    readonly enabled: boolean;
    readonly verifiedAt: string;
    readonly expiresAt: string;
    readonly publishable: boolean;
  }[];
  readonly cityDemandGaps: readonly {
    readonly query: string;
    readonly searches7d: number;
    readonly signal: "zero_result" | "fuzzy_only" | "zero_and_fuzzy";
  }[];
}

interface GrantContextRow extends QueryResultRow {
  access_grant_id: string;
  restaurant_id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
}

interface SetupRow extends QueryResultRow {
  id: string;
  access_grant_id: string;
  restaurant_id: string;
}

interface SessionRow extends GrantContextRow {
  session_id: string;
}

interface MetricsRow extends QueryResultRow {
  impressions: number;
  clicks: number;
  engaged_impressions: number;
  menu_clicks: number;
  restaurant_clicks: number;
  directions_clicks: number;
  booking_clicks: number;
  order_clicks: number;
}

interface TopDishRow extends QueryResultRow {
  name: string;
  impressions: number;
  clicks: number;
}

interface MenuSourceRow extends QueryResultRow {
  url: string;
  enabled: boolean;
  last_checked_at: Date | null;
  fresh_until: Date | null;
  consecutive_failures: number;
  latest_outcome: string | null;
}

interface ActionRow extends QueryResultRow {
  action_type: "booking" | "order";
  enabled: boolean;
  verified_at: Date;
  expires_at: Date;
  publishable: boolean;
}

interface IdGrantRow extends QueryResultRow {
  id: string;
  access_grant_id: string;
}

function rawToken(): string {
  return randomBytes(32).toString("base64url");
}

function tokenHash(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

async function activeGrant(client: PoolClient, accessGrantId: string): Promise<GrantContextRow | null> {
  const result = await client.query<GrantContextRow>(
    `SELECT
       grant_row.id AS access_grant_id,
       restaurant.id AS restaurant_id,
       restaurant.slug,
       restaurant.name,
       restaurant.address,
       restaurant.city
     FROM fysen.restaurant_access_grants AS grant_row
     JOIN fysen.restaurants AS restaurant ON restaurant.id = grant_row.restaurant_id
     WHERE grant_row.id = $1
       AND grant_row.status = 'active'
       AND restaurant.active = true
     LIMIT 1`,
    [accessGrantId],
  );
  return result.rows[0] ?? null;
}

export async function issueRestaurantProSetupToken(
  pool: Pool,
  input: { readonly accessGrantId: string; readonly createdBy: string; readonly ttlHours?: number },
): Promise<FysenProSetupTokenReceipt> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const grant = await activeGrant(client, input.accessGrantId);
    if (!grant) throw new Error("An active restaurant access grant is required.");

    const ttlHours = Math.min(Math.max(Math.trunc(input.ttlHours ?? 24), 1), 168);
    const setupToken = rawToken();
    const hash = tokenHash(setupToken);
    const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);

    await client.query(
      `UPDATE fysen.restaurant_pro_setup_tokens
          SET revoked_at = now()
        WHERE access_grant_id = $1
          AND redeemed_at IS NULL
          AND revoked_at IS NULL`,
      [grant.access_grant_id],
    );

    const inserted = await client.query<{ id: string }>(
      `INSERT INTO fysen.restaurant_pro_setup_tokens (
         access_grant_id, token_hash, expires_at, created_by
       ) VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [grant.access_grant_id, hash, expiresAt.toISOString(), input.createdBy.trim()],
    );
    const setupTokenId = inserted.rows[0]?.id;
    if (!setupTokenId) throw new Error("Failed to issue Fysen Pro setup token.");

    await client.query(
      `INSERT INTO fysen.restaurant_pro_access_audit_log (
         access_grant_id, setup_token_id, actor_ref, event_type
       ) VALUES ($1, $2, $3, 'setup_token_issued')`,
      [grant.access_grant_id, setupTokenId, input.createdBy.trim()],
    );
    await client.query("COMMIT");
    return { setupToken, expiresAt: expiresAt.toISOString() };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function redeemRestaurantProSetupToken(
  pool: Pool,
  setupToken: string,
): Promise<FysenProSessionReceipt | null> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const setup = await client.query<SetupRow>(
      `SELECT
         setup.id,
         setup.access_grant_id,
         grant_row.restaurant_id
       FROM fysen.restaurant_pro_setup_tokens AS setup
       JOIN fysen.restaurant_access_grants AS grant_row ON grant_row.id = setup.access_grant_id
       JOIN fysen.restaurants AS restaurant ON restaurant.id = grant_row.restaurant_id
       WHERE setup.token_hash = $1
         AND setup.redeemed_at IS NULL
         AND setup.revoked_at IS NULL
         AND setup.expires_at > now()
         AND grant_row.status = 'active'
         AND restaurant.active = true
       FOR UPDATE OF setup
       LIMIT 1`,
      [tokenHash(setupToken.trim())],
    );
    const row = setup.rows[0];
    if (!row) {
      await client.query("ROLLBACK");
      return null;
    }

    const sessionToken = rawToken();
    const sessionHash = tokenHash(sessionToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await client.query(
      "UPDATE fysen.restaurant_pro_setup_tokens SET redeemed_at = now() WHERE id = $1",
      [row.id],
    );
    const session = await client.query<{ id: string }>(
      `INSERT INTO fysen.restaurant_pro_sessions (access_grant_id, token_hash, expires_at)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [row.access_grant_id, sessionHash, expiresAt.toISOString()],
    );
    const sessionId = session.rows[0]?.id;
    if (!sessionId) throw new Error("Failed to create Fysen Pro session.");

    await client.query(
      `INSERT INTO fysen.restaurant_pro_access_audit_log (
         access_grant_id, setup_token_id, session_id, event_type
       ) VALUES
         ($1, $2, $3, 'setup_token_redeemed'),
         ($1, $2, $3, 'session_created')`,
      [row.access_grant_id, row.id, sessionId],
    );
    await client.query("COMMIT");
    return { sessionToken, expiresAt: expiresAt.toISOString() };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function authenticateRestaurantProSession(
  pool: Pool,
  sessionToken: string,
): Promise<SessionRow | null> {
  const result = await pool.query<SessionRow>(
    `SELECT
       session.id AS session_id,
       grant_row.id AS access_grant_id,
       restaurant.id AS restaurant_id,
       restaurant.slug,
       restaurant.name,
       restaurant.address,
       restaurant.city
     FROM fysen.restaurant_pro_sessions AS session
     JOIN fysen.restaurant_access_grants AS grant_row ON grant_row.id = session.access_grant_id
     JOIN fysen.restaurants AS restaurant ON restaurant.id = grant_row.restaurant_id
     WHERE session.token_hash = $1
       AND session.revoked_at IS NULL
       AND session.expires_at > now()
       AND grant_row.status = 'active'
       AND restaurant.active = true
     LIMIT 1`,
    [tokenHash(sessionToken.trim())],
  );
  const row = result.rows[0] ?? null;
  if (row) {
    await pool.query(
      `UPDATE fysen.restaurant_pro_sessions
          SET last_seen_at = now()
        WHERE id = $1
          AND last_seen_at < now() - interval '15 minutes'`,
      [row.session_id],
    );
  }
  return row;
}

export async function getRestaurantProDashboard(
  pool: Pool,
  sessionToken: string,
): Promise<FysenProDashboard | null> {
  const session = await authenticateRestaurantProSession(pool, sessionToken);
  if (!session) return null;

  const [metricsResult, topDishesResult, sourcesResult, actionsResult, demandLoop] = await Promise.all([
    pool.query<MetricsRow>(
      `WITH impression_scope AS (
         SELECT id
         FROM fysen.search_result_impressions
         WHERE restaurant_id = $1
           AND created_at >= now() - interval '30 days'
       ), conversion_scope AS (
         SELECT conversion.impression_id, conversion.event_type
         FROM fysen.conversion_events AS conversion
         JOIN impression_scope AS impression ON impression.id = conversion.impression_id
         WHERE conversion.occurred_at >= now() - interval '30 days'
       )
       SELECT
         (SELECT count(*)::integer FROM impression_scope) AS impressions,
         (SELECT count(*)::integer FROM conversion_scope) AS clicks,
         (SELECT count(DISTINCT impression_id)::integer FROM conversion_scope) AS engaged_impressions,
         (SELECT count(*)::integer FROM conversion_scope WHERE event_type = 'menu_clicked') AS menu_clicks,
         (SELECT count(*)::integer FROM conversion_scope WHERE event_type = 'restaurant_clicked') AS restaurant_clicks,
         (SELECT count(*)::integer FROM conversion_scope WHERE event_type = 'directions_clicked') AS directions_clicks,
         (SELECT count(*)::integer FROM conversion_scope WHERE event_type = 'booking_clicked') AS booking_clicks,
         (SELECT count(*)::integer FROM conversion_scope WHERE event_type = 'order_clicked') AS order_clicks`,
      [session.restaurant_id],
    ),
    pool.query<TopDishRow>(
      `WITH impression_counts AS (
         SELECT menu_item_id, count(*)::integer AS impressions
         FROM fysen.search_result_impressions
         WHERE restaurant_id = $1
           AND created_at >= now() - interval '30 days'
           AND menu_item_id IS NOT NULL
         GROUP BY menu_item_id
       ), click_counts AS (
         SELECT impression.menu_item_id, count(*)::integer AS clicks
         FROM fysen.conversion_events AS conversion
         JOIN fysen.search_result_impressions AS impression ON impression.id = conversion.impression_id
         WHERE impression.restaurant_id = $1
           AND conversion.occurred_at >= now() - interval '30 days'
           AND impression.menu_item_id IS NOT NULL
         GROUP BY impression.menu_item_id
       )
       SELECT
         item.original_name AS name,
         impression_counts.impressions,
         COALESCE(click_counts.clicks, 0)::integer AS clicks
       FROM impression_counts
       JOIN fysen.menu_items AS item ON item.id = impression_counts.menu_item_id
       LEFT JOIN click_counts ON click_counts.menu_item_id = impression_counts.menu_item_id
       ORDER BY impression_counts.impressions DESC, clicks DESC, item.original_name ASC
       LIMIT 10`,
      [session.restaurant_id],
    ),
    pool.query<MenuSourceRow>(
      `SELECT
         source.url,
         source.enabled,
         source.last_checked_at,
         CASE
           WHEN source.last_checked_at IS NULL THEN NULL
           ELSE source.last_checked_at + make_interval(mins => GREATEST(source.check_interval_minutes * 3, 1440))
         END AS fresh_until,
         source.consecutive_failures,
         latest.outcome AS latest_outcome
       FROM fysen.menu_sources AS source
       LEFT JOIN LATERAL (
         SELECT run.outcome
         FROM fysen.menu_watch_runs AS run
         WHERE run.menu_source_id = source.id
         ORDER BY run.started_at DESC, run.created_at DESC
         LIMIT 1
       ) AS latest ON true
       WHERE source.restaurant_id = $1
       ORDER BY source.enabled DESC, source.url ASC`,
      [session.restaurant_id],
    ),
    pool.query<ActionRow>(
      `SELECT
         action.action_type,
         action.enabled,
         action.verified_at,
         action.expires_at,
         (action.enabled = true AND action.expires_at > now()) AS publishable
       FROM fysen.restaurant_actions AS action
       WHERE action.restaurant_id = $1
       ORDER BY action.action_type ASC`,
      [session.restaurant_id],
    ),
    buildDemandLoop(pool),
  ]);

  const metrics = metricsResult.rows[0] ?? {
    impressions: 0,
    clicks: 0,
    engaged_impressions: 0,
    menu_clicks: 0,
    restaurant_clicks: 0,
    directions_clicks: 0,
    booking_clicks: 0,
    order_clicks: 0,
  };
  const impressions = Number(metrics.impressions);
  const engagedImpressions = Number(metrics.engaged_impressions);

  return {
    restaurant: {
      slug: session.slug,
      name: session.name,
      address: session.address,
      city: session.city,
    },
    periodDays: 30,
    metrics: {
      impressions,
      clicks: Number(metrics.clicks),
      ctr: impressions > 0 ? engagedImpressions / impressions : 0,
      clickBreakdown: {
        menu: Number(metrics.menu_clicks),
        restaurant: Number(metrics.restaurant_clicks),
        directions: Number(metrics.directions_clicks),
        booking: Number(metrics.booking_clicks),
        order: Number(metrics.order_clicks),
      },
    },
    topDishes: topDishesResult.rows.map((row) => ({
      name: row.name,
      impressions: Number(row.impressions),
      clicks: Number(row.clicks),
    })),
    menuSources: sourcesResult.rows.map((row) => ({
      url: row.url,
      enabled: row.enabled,
      lastCheckedAt: row.last_checked_at?.toISOString() ?? null,
      freshUntil: row.fresh_until?.toISOString() ?? null,
      consecutiveFailures: Number(row.consecutive_failures),
      latestOutcome: row.latest_outcome,
    })),
    actions: actionsResult.rows.map((row) => ({
      type: row.action_type,
      enabled: row.enabled,
      verifiedAt: row.verified_at.toISOString(),
      expiresAt: row.expires_at.toISOString(),
      publishable: row.publishable,
    })),
    cityDemandGaps: demandLoop.queue
      .filter((item) => item.city.toLocaleLowerCase("nb") === session.city.toLocaleLowerCase("nb"))
      .slice(0, 5)
      .map((item) => ({ query: item.normalizedQuery, searches7d: item.searches7d, signal: item.signal })),
  };
}

export async function revokeRestaurantProSession(pool: Pool, sessionToken: string): Promise<boolean> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query<IdGrantRow>(
      `UPDATE fysen.restaurant_pro_sessions
          SET revoked_at = now()
        WHERE token_hash = $1
          AND revoked_at IS NULL
        RETURNING id, access_grant_id`,
      [tokenHash(sessionToken.trim())],
    );
    const session = result.rows[0];
    if (!session) {
      await client.query("ROLLBACK");
      return false;
    }
    await client.query(
      `INSERT INTO fysen.restaurant_pro_access_audit_log (
         access_grant_id, session_id, event_type
       ) VALUES ($1, $2, 'session_revoked')`,
      [session.access_grant_id, session.id],
    );
    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
