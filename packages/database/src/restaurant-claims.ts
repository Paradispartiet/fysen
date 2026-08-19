import type { Pool, PoolClient, QueryResultRow } from "pg";

export type RestaurantClaimRole = "owner" | "manager" | "authorized_agent";
export type RestaurantClaimState = "unclaimed" | "under_review" | "claimed";
export type RestaurantClaimReviewOutcome = "verified" | "rejected";

export interface RestaurantClaimContext {
  readonly restaurant: {
    readonly slug: string;
    readonly name: string;
    readonly address: string;
    readonly city: string;
  };
  readonly claimState: RestaurantClaimState;
}

export interface RestaurantClaimRequestInput {
  readonly restaurantSlug: string;
  readonly claimantName: string;
  readonly claimantEmail: string;
  readonly claimantRole: RestaurantClaimRole;
  readonly evidenceUrl: string | null;
  readonly evidenceNote: string | null;
}

export interface RestaurantClaimReceipt {
  readonly claimId: string;
  readonly status: "pending";
  readonly duplicate: boolean;
}

export interface RestaurantClaimReviewInput {
  readonly claimId: string;
  readonly outcome: RestaurantClaimReviewOutcome;
  readonly reviewNote: string;
  readonly reviewedBy: string;
}

export interface RestaurantClaimReviewReceipt {
  readonly claimId: string;
  readonly status: RestaurantClaimReviewOutcome;
  readonly accessGrantId: string | null;
}

export interface RestaurantOwnedProfileInput {
  readonly accessGrantId: string;
  readonly displayName: string | null;
  readonly publicContactEmail: string | null;
  readonly publicContactPhone: string | null;
  readonly websiteUrl: string | null;
  readonly shortDescription: string | null;
}

export interface RestaurantOwnedProfile {
  readonly restaurantId: string;
  readonly displayName: string | null;
  readonly publicContactEmail: string | null;
  readonly publicContactPhone: string | null;
  readonly websiteUrl: string | null;
  readonly shortDescription: string | null;
  readonly updatedByAccessGrantId: string;
  readonly updatedAt: string;
}

export class RestaurantClaimStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RestaurantClaimStateError";
  }
}

interface RestaurantRow extends QueryResultRow {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
}

interface ContextRow extends RestaurantRow {
  claim_state: RestaurantClaimState;
}

interface ClaimRow extends QueryResultRow {
  id: string;
  restaurant_id: string;
  claimant_email: string;
  claimant_role: RestaurantClaimRole;
  status: "pending" | "verified" | "rejected" | "withdrawn";
}

interface IdRow extends QueryResultRow {
  id: string;
}

interface GrantRow extends QueryResultRow {
  id: string;
  restaurant_id: string;
  claim_id: string;
  principal_email: string;
  role: RestaurantClaimRole;
  status: "active" | "revoked";
}

interface OwnedProfileRow extends QueryResultRow {
  restaurant_id: string;
  display_name: string | null;
  public_contact_email: string | null;
  public_contact_phone: string | null;
  website_url: string | null;
  short_description: string | null;
  updated_by_access_grant_id: string;
  updated_at: Date;
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function cleanNullable(value: string | null): string | null {
  if (value === null) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

async function activeRestaurant(client: PoolClient, slug: string): Promise<RestaurantRow | null> {
  const result = await client.query<RestaurantRow>(
    `SELECT id, slug, name, address, city
       FROM fysen.restaurants
      WHERE slug = $1 AND active = true
      LIMIT 1`,
    [slug],
  );
  return result.rows[0] ?? null;
}

export async function getRestaurantClaimContext(pool: Pool, slug: string): Promise<RestaurantClaimContext | null> {
  const result = await pool.query<ContextRow>(
    `SELECT
       restaurant.id,
       restaurant.slug,
       restaurant.name,
       restaurant.address,
       restaurant.city,
       CASE
         WHEN EXISTS (
           SELECT 1
             FROM fysen.restaurant_access_grants AS grant_row
            WHERE grant_row.restaurant_id = restaurant.id
              AND grant_row.status = 'active'
         ) THEN 'claimed'
         WHEN EXISTS (
           SELECT 1
             FROM fysen.restaurant_claims AS claim
            WHERE claim.restaurant_id = restaurant.id
              AND claim.status = 'pending'
         ) THEN 'under_review'
         ELSE 'unclaimed'
       END AS claim_state
     FROM fysen.restaurants AS restaurant
     WHERE restaurant.slug = $1
       AND restaurant.active = true
     LIMIT 1`,
    [slug],
  );
  const row = result.rows[0];
  if (!row) return null;
  return {
    restaurant: { slug: row.slug, name: row.name, address: row.address, city: row.city },
    claimState: row.claim_state,
  };
}

export async function requestRestaurantClaim(
  pool: Pool,
  input: RestaurantClaimRequestInput,
): Promise<RestaurantClaimReceipt | null> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const restaurant = await activeRestaurant(client, input.restaurantSlug);
    if (!restaurant) {
      await client.query("ROLLBACK");
      return null;
    }

    const claimantEmail = normalizeEmail(input.claimantEmail);
    const inserted = await client.query<IdRow>(
      `INSERT INTO fysen.restaurant_claims (
         restaurant_id,
         claimant_name,
         claimant_email,
         claimant_role,
         evidence_url,
         evidence_note
       ) VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (restaurant_id, claimant_email) WHERE status = 'pending'
       DO NOTHING
       RETURNING id`,
      [
        restaurant.id,
        input.claimantName.trim(),
        claimantEmail,
        input.claimantRole,
        cleanNullable(input.evidenceUrl),
        cleanNullable(input.evidenceNote),
      ],
    );

    const insertedId = inserted.rows[0]?.id;
    if (!insertedId) {
      const existing = await client.query<IdRow>(
        `SELECT id
           FROM fysen.restaurant_claims
          WHERE restaurant_id = $1
            AND claimant_email = $2
            AND status = 'pending'
          LIMIT 1`,
        [restaurant.id, claimantEmail],
      );
      const existingId = existing.rows[0]?.id;
      if (!existingId) throw new Error("Failed to resolve pending restaurant claim");
      await client.query("COMMIT");
      return { claimId: existingId, status: "pending", duplicate: true };
    }

    await client.query(
      `INSERT INTO fysen.restaurant_claim_audit_log (
         restaurant_id, claim_id, actor_type, event_type, metadata
       ) VALUES ($1, $2, 'claimant', 'claim_submitted', $3::jsonb)`,
      [restaurant.id, insertedId, JSON.stringify({ role: input.claimantRole })],
    );
    await client.query("COMMIT");
    return { claimId: insertedId, status: "pending", duplicate: false };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function reviewRestaurantClaim(
  pool: Pool,
  input: RestaurantClaimReviewInput,
): Promise<RestaurantClaimReviewReceipt> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const claimResult = await client.query<ClaimRow>(
      `SELECT id, restaurant_id, claimant_email, claimant_role, status
         FROM fysen.restaurant_claims
        WHERE id = $1
        FOR UPDATE`,
      [input.claimId],
    );
    const claim = claimResult.rows[0];
    if (!claim) throw new RestaurantClaimStateError("Restaurant claim does not exist.");
    if (claim.status !== "pending") {
      throw new RestaurantClaimStateError(`Restaurant claim is already ${claim.status}.`);
    }

    const status = input.outcome;
    await client.query(
      `UPDATE fysen.restaurant_claims
          SET status = $2,
              reviewed_at = now(),
              review_note = $3,
              updated_at = now()
        WHERE id = $1`,
      [claim.id, status, input.reviewNote.trim()],
    );

    let accessGrantId: string | null = null;
    if (status === "verified") {
      const existingGrant = await client.query<GrantRow>(
        `SELECT id, restaurant_id, claim_id, principal_email, role, status
           FROM fysen.restaurant_access_grants
          WHERE restaurant_id = $1
            AND principal_email = $2
            AND status = 'active'
          LIMIT 1`,
        [claim.restaurant_id, claim.claimant_email],
      );
      accessGrantId = existingGrant.rows[0]?.id ?? null;

      if (!accessGrantId) {
        const grant = await client.query<IdRow>(
          `INSERT INTO fysen.restaurant_access_grants (
             restaurant_id, claim_id, principal_email, role
           ) VALUES ($1, $2, $3, $4)
           RETURNING id`,
          [claim.restaurant_id, claim.id, claim.claimant_email, claim.claimant_role],
        );
        accessGrantId = grant.rows[0]?.id ?? null;
        if (!accessGrantId) throw new Error("Failed to grant restaurant access");
        await client.query(
          `INSERT INTO fysen.restaurant_claim_audit_log (
             restaurant_id, claim_id, access_grant_id, actor_type, actor_ref, event_type
           ) VALUES ($1, $2, $3, 'reviewer', $4, 'access_granted')`,
          [claim.restaurant_id, claim.id, accessGrantId, input.reviewedBy.trim()],
        );
      }
    }

    await client.query(
      `INSERT INTO fysen.restaurant_claim_audit_log (
         restaurant_id, claim_id, access_grant_id, actor_type, actor_ref, event_type, metadata
       ) VALUES ($1, $2, $3, 'reviewer', $4, $5, $6::jsonb)`,
      [
        claim.restaurant_id,
        claim.id,
        accessGrantId,
        input.reviewedBy.trim(),
        status === "verified" ? "claim_verified" : "claim_rejected",
        JSON.stringify({ reviewNote: input.reviewNote.trim() }),
      ],
    );

    await client.query("COMMIT");
    return { claimId: claim.id, status, accessGrantId };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function upsertRestaurantOwnedProfile(
  pool: Pool,
  input: RestaurantOwnedProfileInput,
): Promise<RestaurantOwnedProfile> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const grantResult = await client.query<GrantRow>(
      `SELECT id, restaurant_id, claim_id, principal_email, role, status
         FROM fysen.restaurant_access_grants
        WHERE id = $1
        FOR UPDATE`,
      [input.accessGrantId],
    );
    const grant = grantResult.rows[0];
    if (!grant || grant.status !== "active") {
      throw new RestaurantClaimStateError("An active restaurant access grant is required.");
    }

    const fields = {
      displayName: cleanNullable(input.displayName),
      publicContactEmail: cleanNullable(input.publicContactEmail)?.toLowerCase() ?? null,
      publicContactPhone: cleanNullable(input.publicContactPhone),
      websiteUrl: cleanNullable(input.websiteUrl),
      shortDescription: cleanNullable(input.shortDescription),
    };
    const result = await client.query<OwnedProfileRow>(
      `INSERT INTO fysen.restaurant_owned_profiles (
         restaurant_id,
         display_name,
         public_contact_email,
         public_contact_phone,
         website_url,
         short_description,
         updated_by_access_grant_id
       ) VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (restaurant_id) DO UPDATE SET
         display_name = EXCLUDED.display_name,
         public_contact_email = EXCLUDED.public_contact_email,
         public_contact_phone = EXCLUDED.public_contact_phone,
         website_url = EXCLUDED.website_url,
         short_description = EXCLUDED.short_description,
         updated_by_access_grant_id = EXCLUDED.updated_by_access_grant_id,
         updated_at = now()
       RETURNING
         restaurant_id,
         display_name,
         public_contact_email,
         public_contact_phone,
         website_url,
         short_description,
         updated_by_access_grant_id,
         updated_at`,
      [
        grant.restaurant_id,
        fields.displayName,
        fields.publicContactEmail,
        fields.publicContactPhone,
        fields.websiteUrl,
        fields.shortDescription,
        grant.id,
      ],
    );
    const row = result.rows[0];
    if (!row) throw new Error("Failed to persist restaurant-owned profile");

    await client.query(
      `INSERT INTO fysen.restaurant_claim_audit_log (
         restaurant_id, claim_id, access_grant_id, actor_type, event_type, metadata
       ) VALUES ($1, $2, $3, 'system', 'owner_fields_updated', $4::jsonb)`,
      [
        grant.restaurant_id,
        grant.claim_id,
        grant.id,
        JSON.stringify({
          changedFields: ["displayName", "publicContactEmail", "publicContactPhone", "websiteUrl", "shortDescription"],
        }),
      ],
    );
    await client.query("COMMIT");

    return {
      restaurantId: row.restaurant_id,
      displayName: row.display_name,
      publicContactEmail: row.public_contact_email,
      publicContactPhone: row.public_contact_phone,
      websiteUrl: row.website_url,
      shortDescription: row.short_description,
      updatedByAccessGrantId: row.updated_by_access_grant_id,
      updatedAt: row.updated_at.toISOString(),
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function revokeRestaurantAccess(
  pool: Pool,
  accessGrantId: string,
  revokedBy: string,
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query<GrantRow>(
      `UPDATE fysen.restaurant_access_grants
          SET status = 'revoked', revoked_at = now(), updated_at = now()
        WHERE id = $1 AND status = 'active'
        RETURNING id, restaurant_id, claim_id, principal_email, role, status`,
      [accessGrantId],
    );
    const grant = result.rows[0];
    if (!grant) throw new RestaurantClaimStateError("Active restaurant access grant not found.");
    await client.query(
      `INSERT INTO fysen.restaurant_claim_audit_log (
         restaurant_id, claim_id, access_grant_id, actor_type, actor_ref, event_type
       ) VALUES ($1, $2, $3, 'reviewer', $4, 'access_revoked')`,
      [grant.restaurant_id, grant.claim_id, grant.id, revokedBy.trim()],
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
