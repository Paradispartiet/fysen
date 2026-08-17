import type { Pool, QueryResultRow } from "pg";
import type { RestaurantActionType } from "./restaurant-actions.js";

export interface RestaurantActionState {
  readonly id: string;
  readonly actionType: RestaurantActionType;
  readonly url: string;
  readonly sourceUrl: string;
  readonly provider: string | null;
  readonly enabled: boolean;
  readonly verifiedAt: string;
  readonly expiresAt: string;
}

interface ActionStateRow extends QueryResultRow {
  id: string;
  action_type: RestaurantActionType;
  url: string;
  source_url: string;
  provider: string | null;
  enabled: boolean;
  verified_at: Date;
  expires_at: Date;
}

export async function getRestaurantActionState(
  pool: Pool,
  restaurantId: string,
  actionType: RestaurantActionType,
): Promise<RestaurantActionState | null> {
  const result = await pool.query<ActionStateRow>(
    `SELECT id, action_type, url, source_url, provider, enabled, verified_at, expires_at
       FROM fysen.restaurant_actions
      WHERE restaurant_id = $1 AND action_type = $2
      LIMIT 1`,
    [restaurantId, actionType],
  );
  const row = result.rows[0];
  if (!row) return null;
  return {
    id: row.id,
    actionType: row.action_type,
    url: row.url,
    sourceUrl: row.source_url,
    provider: row.provider,
    enabled: row.enabled,
    verifiedAt: row.verified_at.toISOString(),
    expiresAt: row.expires_at.toISOString(),
  };
}
