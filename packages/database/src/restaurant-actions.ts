import type { Pool, PoolClient, QueryResultRow } from "pg";

export type RestaurantActionType = "booking" | "order";
export type RestaurantActionVerificationMethod = "first_party_page" | "manual" | "provider_api";

export interface UpsertRestaurantActionInput {
  readonly restaurantId: string;
  readonly actionType: RestaurantActionType;
  readonly url: string;
  readonly sourceUrl: string;
  readonly provider: string | null;
  readonly verificationMethod: RestaurantActionVerificationMethod;
  readonly verifiedAt: string;
  readonly expiresAt: string;
}

export interface RestaurantActionVerificationTarget {
  readonly id: string;
  readonly restaurantId: string;
  readonly actionType: RestaurantActionType;
  readonly url: string;
  readonly sourceUrl: string;
  readonly provider: string | null;
  readonly expiresAt: string;
}

interface RestaurantActionVerificationRow extends QueryResultRow {
  id: string;
  restaurant_id: string;
  action_type: RestaurantActionType;
  url: string;
  source_url: string;
  provider: string | null;
  expires_at: Date;
}

export interface RestaurantActionVerificationSuccessInput {
  readonly actionId: string;
  readonly startedAt: string;
  readonly completedAt: string;
  readonly httpStatus: number;
  readonly verifiedAt: string;
  readonly expiresAt: string;
}

export interface RestaurantActionVerificationFailureInput {
  readonly actionId: string;
  readonly startedAt: string;
  readonly completedAt: string;
  readonly httpStatus: number | null;
  readonly errorCode: string;
  readonly errorMessage: string;
}

export async function upsertRestaurantAction(
  pool: Pool,
  input: UpsertRestaurantActionInput,
): Promise<string> {
  const result = await pool.query<{ id: string }>(
    `INSERT INTO fysen.restaurant_actions (
       restaurant_id,
       action_type,
       url,
       source_url,
       provider,
       verification_method,
       verified_at,
       expires_at,
       enabled
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true)
     ON CONFLICT (restaurant_id, action_type) DO UPDATE SET
       url = EXCLUDED.url,
       source_url = EXCLUDED.source_url,
       provider = EXCLUDED.provider,
       verification_method = EXCLUDED.verification_method,
       verified_at = EXCLUDED.verified_at,
       expires_at = EXCLUDED.expires_at,
       enabled = true,
       updated_at = now()
     RETURNING id`,
    [
      input.restaurantId,
      input.actionType,
      input.url,
      input.sourceUrl,
      input.provider,
      input.verificationMethod,
      input.verifiedAt,
      input.expiresAt,
    ],
  );

  const id = result.rows[0]?.id;
  if (!id) throw new Error("Restaurant action upsert did not return an id");
  return id;
}

export async function disableRestaurantAction(
  pool: Pool,
  restaurantId: string,
  actionType: RestaurantActionType,
): Promise<boolean> {
  const result = await pool.query(
    `UPDATE fysen.restaurant_actions
        SET enabled = false,
            updated_at = now()
      WHERE restaurant_id = $1
        AND action_type = $2
        AND enabled = true`,
    [restaurantId, actionType],
  );

  return (result.rowCount ?? 0) > 0;
}

export async function listRestaurantActionsForReverification(
  pool: Pool,
  limit: number,
  now = new Date(),
): Promise<readonly RestaurantActionVerificationTarget[]> {
  const boundedLimit = Math.max(1, Math.min(100, Math.trunc(limit)));
  const result = await pool.query<RestaurantActionVerificationRow>(
    `SELECT id, restaurant_id, action_type, url, source_url, provider, expires_at
       FROM fysen.restaurant_actions
      WHERE enabled = true
        AND expires_at <= $1::timestamptz + interval '7 days'
      ORDER BY expires_at ASC, id ASC
      LIMIT $2`,
    [now.toISOString(), boundedLimit],
  );

  return result.rows.map((row) => ({
    id: row.id,
    restaurantId: row.restaurant_id,
    actionType: row.action_type,
    url: row.url,
    sourceUrl: row.source_url,
    provider: row.provider,
    expiresAt: row.expires_at.toISOString(),
  }));
}

async function inTransaction<T>(pool: Pool, work: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await work(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function recordRestaurantActionVerificationSuccess(
  pool: Pool,
  input: RestaurantActionVerificationSuccessInput,
): Promise<void> {
  await inTransaction(pool, async (client) => {
    await client.query(
      `UPDATE fysen.restaurant_actions
          SET verified_at = $2,
              expires_at = $3,
              enabled = true,
              updated_at = now()
        WHERE id = $1`,
      [input.actionId, input.verifiedAt, input.expiresAt],
    );
    await client.query(
      `INSERT INTO fysen.restaurant_action_verification_runs (
         restaurant_action_id, outcome, started_at, completed_at, http_status
       ) VALUES ($1, 'verified', $2, $3, $4)`,
      [input.actionId, input.startedAt, input.completedAt, input.httpStatus],
    );
  });
}

export async function recordRestaurantActionVerificationFailure(
  pool: Pool,
  input: RestaurantActionVerificationFailureInput,
): Promise<void> {
  await pool.query(
    `INSERT INTO fysen.restaurant_action_verification_runs (
       restaurant_action_id,
       outcome,
       started_at,
       completed_at,
       http_status,
       error_code,
       error_message
     ) VALUES ($1, 'fetch_error', $2, $3, $4, $5, $6)`,
    [
      input.actionId,
      input.startedAt,
      input.completedAt,
      input.httpStatus,
      input.errorCode,
      input.errorMessage.slice(0, 2000),
    ],
  );
}
