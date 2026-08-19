import { createHash, randomBytes } from "node:crypto";
import type { Pool } from "pg";

const SESSION_TTL_DAYS = 30;
const HANDOFF_TTL_MINUTES = 5;
const EXPECTED_SCOPES = ["fysen:min_mat", "fysen:analysis_handoff"] as const;
const POLICY_VERSION = "aha_fysen_connection_v1" as const;

export interface AhaVerifiedAuthorization {
  authorizationId: string;
  subject: string;
  provider: string;
  scopes: readonly ["fysen:min_mat", "fysen:analysis_handoff"];
  policyVersion: "aha_fysen_connection_v1";
  expiresAt: string;
}

export interface AhaConsumerSessionReceipt {
  sessionToken: string;
  expiresAt: string;
  scopes: readonly ["fysen:min_mat", "fysen:analysis_handoff"];
  policyVersion: "aha_fysen_connection_v1";
}

export interface MinMatItemRecord {
  savedItemId: string;
  menuItemId: string;
  snapshotId: string;
  restaurantId: string;
  dishName: string;
  restaurantName: string;
  restaurantSlug: string;
  city: string;
  priceMinor: number | null;
  currency: string;
  savedAt: string;
}

export interface AhaAnalysisHandoffReceipt {
  handoffToken: string;
  expiresAt: string;
  itemCount: number;
}

export interface FysenFoodCollectionV1 {
  version: "fysen_food_collection_v1";
  source: "fysen";
  purpose: "user_requested_analysis";
  generatedAt: string;
  privacy: {
    scope: "private_user";
    includesSearchHistory: false;
    publicSharing: false;
    modelTrainingAllowed: false;
  };
  items: Array<{
    savedItemId: string;
    menuItemId: string;
    dishName: string;
    restaurantName: string;
    restaurantSlug: string;
    city: string;
    priceMinor: number | null;
    currency: string;
    savedAt: string;
  }>;
}

interface SessionRow {
  id: string;
  aha_subject: string;
  expires_at: Date;
}

function token(): string {
  return randomBytes(32).toString("base64url");
}

function tokenHash(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function iso(value: Date | string): string {
  return new Date(value).toISOString();
}

async function activeSession(pool: Pool, sessionToken: string): Promise<SessionRow | null> {
  if (!/^[A-Za-z0-9_-]{43,200}$/.test(sessionToken)) return null;
  const result = await pool.query<SessionRow>(
    `UPDATE fysen.aha_consumer_sessions
        SET last_seen_at = now()
      WHERE token_hash = $1
        AND revoked_at IS NULL
        AND expires_at > now()
      RETURNING id, aha_subject, expires_at`,
    [tokenHash(sessionToken)],
  );
  return result.rows[0] ?? null;
}

async function audit(
  pool: Pool,
  subject: string,
  sessionId: string | null,
  action: string,
  targetId: string | null,
  details: Record<string, unknown> = {},
): Promise<void> {
  await pool.query(
    `INSERT INTO fysen.aha_consumer_audit_log
       (aha_subject, consumer_session_id, action, target_id, details)
     VALUES ($1, $2, $3, $4, $5::jsonb)`,
    [subject, sessionId, action, targetId, JSON.stringify(details)],
  );
}

export async function createAhaConsumerSession(
  pool: Pool,
  authorization: AhaVerifiedAuthorization,
): Promise<AhaConsumerSessionReceipt | null> {
  if (
    authorization.policyVersion !== POLICY_VERSION
    || authorization.scopes.length !== EXPECTED_SCOPES.length
    || !EXPECTED_SCOPES.every((scope, index) => authorization.scopes[index] === scope)
    || new Date(authorization.expiresAt).getTime() <= Date.now()
  ) return null;

  const sessionToken = token();
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
  try {
    const inserted = await pool.query<{ id: string }>(
      `INSERT INTO fysen.aha_consumer_sessions
         (aha_authorization_id, aha_subject, aha_provider, scopes, policy_version, token_hash, expires_at)
       VALUES ($1, $2, $3, $4::text[], $5, $6, $7)
       RETURNING id`,
      [
        authorization.authorizationId,
        authorization.subject,
        authorization.provider,
        [...authorization.scopes],
        authorization.policyVersion,
        tokenHash(sessionToken),
        expiresAt,
      ],
    );
    const sessionId = inserted.rows[0]?.id;
    if (!sessionId) return null;
    await audit(pool, authorization.subject, sessionId, "session_created", sessionId, {
      authorizationId: authorization.authorizationId,
      policyVersion: authorization.policyVersion,
    });
    return {
      sessionToken,
      expiresAt: expiresAt.toISOString(),
      scopes: EXPECTED_SCOPES,
      policyVersion: POLICY_VERSION,
    };
  } catch (error) {
    if ((error as { code?: string })?.code === "23505") return null;
    throw error;
  }
}

export async function revokeAhaConsumerSession(pool: Pool, sessionToken: string): Promise<boolean> {
  if (!/^[A-Za-z0-9_-]{43,200}$/.test(sessionToken)) return false;
  const result = await pool.query<{ id: string; aha_subject: string }>(
    `UPDATE fysen.aha_consumer_sessions
        SET revoked_at = COALESCE(revoked_at, now())
      WHERE token_hash = $1
      RETURNING id, aha_subject`,
    [tokenHash(sessionToken)],
  );
  const row = result.rows[0];
  if (!row) return false;
  await audit(pool, row.aha_subject, row.id, "session_revoked", row.id);
  return true;
}

export async function listMinMatItems(pool: Pool, sessionToken: string): Promise<MinMatItemRecord[] | null> {
  const session = await activeSession(pool, sessionToken);
  if (!session) return null;
  const result = await pool.query<{
    id: string;
    menu_item_id: string;
    snapshot_id: string;
    restaurant_id: string;
    dish_name: string;
    restaurant_name: string;
    restaurant_slug: string;
    city: string;
    price_minor: number | null;
    currency: string;
    saved_at: Date;
  }>(
    `SELECT id, menu_item_id, snapshot_id, restaurant_id, dish_name, restaurant_name,
            restaurant_slug, city, price_minor, currency, saved_at
       FROM fysen.min_mat_items
      WHERE aha_subject = $1
        AND removed_at IS NULL
      ORDER BY saved_at DESC, id DESC
      LIMIT 500`,
    [session.aha_subject],
  );
  return result.rows.map((row) => ({
    savedItemId: row.id,
    menuItemId: row.menu_item_id,
    snapshotId: row.snapshot_id,
    restaurantId: row.restaurant_id,
    dishName: row.dish_name,
    restaurantName: row.restaurant_name,
    restaurantSlug: row.restaurant_slug,
    city: row.city,
    priceMinor: row.price_minor,
    currency: row.currency,
    savedAt: iso(row.saved_at),
  }));
}

export async function saveMinMatItem(
  pool: Pool,
  sessionToken: string,
  menuItemId: string,
): Promise<MinMatItemRecord | null> {
  const session = await activeSession(pool, sessionToken);
  if (!session) return null;
  const canonical = await pool.query<{
    menu_item_id: string;
    snapshot_id: string;
    restaurant_id: string;
    dish_name: string;
    restaurant_name: string;
    restaurant_slug: string;
    city: string;
    price_minor: number | null;
    currency: string;
  }>(
    `SELECT mi.id AS menu_item_id,
            mi.snapshot_id,
            src.restaurant_id,
            mi.original_name AS dish_name,
            r.name AS restaurant_name,
            r.slug AS restaurant_slug,
            r.city,
            mi.price_minor,
            mi.currency
       FROM fysen.menu_items mi
       JOIN fysen.menu_snapshots snap ON snap.id = mi.snapshot_id
       JOIN fysen.menu_sources src ON src.id = snap.menu_source_id
       JOIN fysen.restaurants r ON r.id = src.restaurant_id
      WHERE mi.id = $1
        AND r.active = true
        AND src.enabled = true
      LIMIT 1`,
    [menuItemId],
  );
  const item = canonical.rows[0];
  if (!item) return null;

  const inserted = await pool.query<{
    id: string;
    menu_item_id: string;
    snapshot_id: string;
    restaurant_id: string;
    dish_name: string;
    restaurant_name: string;
    restaurant_slug: string;
    city: string;
    price_minor: number | null;
    currency: string;
    saved_at: Date;
  }>(
    `INSERT INTO fysen.min_mat_items
       (aha_subject, menu_item_id, snapshot_id, restaurant_id, dish_name, restaurant_name,
        restaurant_slug, city, price_minor, currency)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     ON CONFLICT (aha_subject, menu_item_id) WHERE removed_at IS NULL
     DO UPDATE SET aha_subject = EXCLUDED.aha_subject
     RETURNING id, menu_item_id, snapshot_id, restaurant_id, dish_name, restaurant_name,
               restaurant_slug, city, price_minor, currency, saved_at`,
    [
      session.aha_subject,
      item.menu_item_id,
      item.snapshot_id,
      item.restaurant_id,
      item.dish_name,
      item.restaurant_name,
      item.restaurant_slug,
      item.city,
      item.price_minor,
      item.currency,
    ],
  );
  const row = inserted.rows[0];
  if (!row) return null;
  await audit(pool, session.aha_subject, session.id, "min_mat_saved", row.id, { menuItemId: row.menu_item_id });
  return {
    savedItemId: row.id,
    menuItemId: row.menu_item_id,
    snapshotId: row.snapshot_id,
    restaurantId: row.restaurant_id,
    dishName: row.dish_name,
    restaurantName: row.restaurant_name,
    restaurantSlug: row.restaurant_slug,
    city: row.city,
    priceMinor: row.price_minor,
    currency: row.currency,
    savedAt: iso(row.saved_at),
  };
}

export async function removeMinMatItem(pool: Pool, sessionToken: string, savedItemId: string): Promise<boolean | null> {
  const session = await activeSession(pool, sessionToken);
  if (!session) return null;
  const result = await pool.query<{ id: string }>(
    `UPDATE fysen.min_mat_items
        SET removed_at = now()
      WHERE id = $1
        AND aha_subject = $2
        AND removed_at IS NULL
      RETURNING id`,
    [savedItemId, session.aha_subject],
  );
  const removed = result.rows[0]?.id;
  if (!removed) return false;
  await audit(pool, session.aha_subject, session.id, "min_mat_removed", removed);
  return true;
}

export async function issueAhaAnalysisHandoff(
  pool: Pool,
  sessionToken: string,
): Promise<AhaAnalysisHandoffReceipt | null> {
  const session = await activeSession(pool, sessionToken);
  if (!session) return null;
  const items = await pool.query<{ id: string }>(
    `SELECT id
       FROM fysen.min_mat_items
      WHERE aha_subject = $1
        AND removed_at IS NULL
      ORDER BY saved_at DESC, id DESC
      LIMIT 50`,
    [session.aha_subject],
  );
  const itemIds = items.rows.map((row) => row.id);
  if (itemIds.length === 0) return null;
  const handoffToken = token();
  const expiresAt = new Date(Date.now() + HANDOFF_TTL_MINUTES * 60 * 1000);
  const inserted = await pool.query<{ id: string }>(
    `INSERT INTO fysen.aha_analysis_handoffs (aha_subject, token_hash, item_ids, expires_at)
     VALUES ($1, $2, $3::uuid[], $4)
     RETURNING id`,
    [session.aha_subject, tokenHash(handoffToken), itemIds, expiresAt],
  );
  const handoffId = inserted.rows[0]?.id;
  if (!handoffId) return null;
  await audit(pool, session.aha_subject, session.id, "handoff_issued", handoffId, { itemCount: itemIds.length });
  return { handoffToken, expiresAt: expiresAt.toISOString(), itemCount: itemIds.length };
}

export async function redeemAhaAnalysisHandoff(
  pool: Pool,
  handoffToken: string,
): Promise<FysenFoodCollectionV1 | null> {
  if (!/^[A-Za-z0-9_-]{43,200}$/.test(handoffToken)) return null;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const handoff = await client.query<{
      id: string;
      aha_subject: string;
      item_ids: string[];
      created_at: Date;
    }>(
      `SELECT id, aha_subject, item_ids, created_at
         FROM fysen.aha_analysis_handoffs
        WHERE token_hash = $1
          AND redeemed_at IS NULL
          AND expires_at > now()
        FOR UPDATE`,
      [tokenHash(handoffToken)],
    );
    const row = handoff.rows[0];
    if (!row) {
      await client.query("ROLLBACK");
      return null;
    }
    await client.query(
      `UPDATE fysen.aha_analysis_handoffs SET redeemed_at = now() WHERE id = $1`,
      [row.id],
    );
    const items = await client.query<{
      id: string;
      menu_item_id: string;
      dish_name: string;
      restaurant_name: string;
      restaurant_slug: string;
      city: string;
      price_minor: number | null;
      currency: string;
      saved_at: Date;
    }>(
      `SELECT id, menu_item_id, dish_name, restaurant_name, restaurant_slug, city,
              price_minor, currency, saved_at
         FROM fysen.min_mat_items
        WHERE aha_subject = $1
          AND id = ANY($2::uuid[])
        ORDER BY array_position($2::uuid[], id)`,
      [row.aha_subject, row.item_ids],
    );
    await client.query(
      `INSERT INTO fysen.aha_consumer_audit_log
         (aha_subject, consumer_session_id, action, target_id, details)
       VALUES ($1, NULL, 'handoff_redeemed', $2, $3::jsonb)`,
      [row.aha_subject, row.id, JSON.stringify({ itemCount: items.rows.length })],
    );
    await client.query("COMMIT");
    return {
      version: "fysen_food_collection_v1",
      source: "fysen",
      purpose: "user_requested_analysis",
      generatedAt: iso(row.created_at),
      privacy: {
        scope: "private_user",
        includesSearchHistory: false,
        publicSharing: false,
        modelTrainingAllowed: false,
      },
      items: items.rows.map((item) => ({
        savedItemId: item.id,
        menuItemId: item.menu_item_id,
        dishName: item.dish_name,
        restaurantName: item.restaurant_name,
        restaurantSlug: item.restaurant_slug,
        city: item.city,
        priceMinor: item.price_minor,
        currency: item.currency,
        savedAt: iso(item.saved_at),
      })),
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
