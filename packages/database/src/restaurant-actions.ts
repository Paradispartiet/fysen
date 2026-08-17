import type { Pool } from "pg";

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
