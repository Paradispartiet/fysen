import type { Pool, QueryResultRow } from "pg";
import type { RestaurantClaimRole } from "./restaurant-claims.js";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type RestaurantClaimOperatorCommand =
  | { readonly kind: "list"; readonly limit: number }
  | { readonly kind: "grants"; readonly limit: number }
  | {
      readonly kind: "review";
      readonly claimId: string;
      readonly outcome: "verified" | "rejected";
      readonly reviewedBy: string;
      readonly reviewNote: string;
    }
  | {
      readonly kind: "revoke";
      readonly accessGrantId: string;
      readonly revokedBy: string;
    };

interface PendingClaimRow extends QueryResultRow {
  claim_id: string;
  restaurant_slug: string;
  restaurant_name: string;
  restaurant_address: string;
  claimant_name: string;
  claimant_email: string;
  claimant_role: RestaurantClaimRole;
  evidence_url: string | null;
  evidence_note: string | null;
  submitted_at: Date;
}

interface ActiveGrantRow extends QueryResultRow {
  access_grant_id: string;
  claim_id: string;
  restaurant_slug: string;
  restaurant_name: string;
  restaurant_address: string;
  principal_email: string;
  role: RestaurantClaimRole;
  granted_at: Date;
}

export interface PendingRestaurantClaim {
  readonly claimId: string;
  readonly restaurant: {
    readonly slug: string;
    readonly name: string;
    readonly address: string;
  };
  readonly claimant: {
    readonly name: string;
    readonly email: string;
    readonly role: RestaurantClaimRole;
  };
  readonly evidence: {
    readonly url: string | null;
    readonly note: string | null;
  };
  readonly submittedAt: string;
}

export interface ActiveRestaurantAccessGrant {
  readonly accessGrantId: string;
  readonly claimId: string;
  readonly restaurant: {
    readonly slug: string;
    readonly name: string;
    readonly address: string;
  };
  readonly principal: {
    readonly email: string;
    readonly role: RestaurantClaimRole;
  };
  readonly grantedAt: string;
}

function required(value: string | undefined, name: string): string {
  const normalized = value?.trim();
  if (!normalized) throw new Error(`${name} is required.`);
  return normalized;
}

function uuid(value: string | undefined, name: string): string {
  const normalized = required(value, name);
  if (!UUID_PATTERN.test(normalized)) throw new Error(`${name} must be a UUID.`);
  return normalized;
}

function parseLimit(value: string | undefined): number {
  if (value === undefined) return 25;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 100) {
    throw new Error("list limit must be an integer between 1 and 100.");
  }
  return parsed;
}

export function parseRestaurantClaimOperatorCommand(argv: readonly string[]): RestaurantClaimOperatorCommand {
  const args = argv.filter((value) => value !== "--");
  const operation = required(args[0], "operation").toLowerCase();

  if (operation === "list" || operation === "grants") {
    if (args.length > 2) throw new Error(`Usage: claim:operator -- ${operation} [limit]`);
    return { kind: operation, limit: parseLimit(args[1]) };
  }

  if (operation === "revoke") {
    if (args.length !== 3) throw new Error("Usage: claim:operator -- revoke <accessGrantId> <reviewer>");
    return {
      kind: "revoke",
      accessGrantId: uuid(args[1], "accessGrantId"),
      revokedBy: required(args[2], "revokedBy"),
    };
  }

  if (operation !== "verify" && operation !== "reject") {
    throw new Error("operation must be one of: list, grants, verify, reject, revoke.");
  }

  const claimId = uuid(args[1], "claimId");
  const reviewedBy = required(args[2], "reviewedBy");
  const reviewNote = required(args.slice(3).join(" "), "reviewNote");

  return {
    kind: "review",
    claimId,
    outcome: operation === "verify" ? "verified" : "rejected",
    reviewedBy,
    reviewNote,
  };
}

export async function listPendingRestaurantClaims(pool: Pool, limit = 25): Promise<readonly PendingRestaurantClaim[]> {
  const result = await pool.query<PendingClaimRow>(
    `SELECT
       claim.id AS claim_id,
       restaurant.slug AS restaurant_slug,
       restaurant.name AS restaurant_name,
       restaurant.address AS restaurant_address,
       claim.claimant_name,
       claim.claimant_email,
       claim.claimant_role,
       claim.evidence_url,
       claim.evidence_note,
       claim.submitted_at
     FROM fysen.restaurant_claims AS claim
     JOIN fysen.restaurants AS restaurant ON restaurant.id = claim.restaurant_id
     WHERE claim.status = 'pending'
     ORDER BY claim.submitted_at ASC, claim.id ASC
     LIMIT $1`,
    [limit],
  );

  return result.rows.map((row) => ({
    claimId: row.claim_id,
    restaurant: {
      slug: row.restaurant_slug,
      name: row.restaurant_name,
      address: row.restaurant_address,
    },
    claimant: {
      name: row.claimant_name,
      email: row.claimant_email,
      role: row.claimant_role,
    },
    evidence: {
      url: row.evidence_url,
      note: row.evidence_note,
    },
    submittedAt: row.submitted_at.toISOString(),
  }));
}

export async function listActiveRestaurantAccessGrants(
  pool: Pool,
  limit = 25,
): Promise<readonly ActiveRestaurantAccessGrant[]> {
  const result = await pool.query<ActiveGrantRow>(
    `SELECT
       grant_row.id AS access_grant_id,
       grant_row.claim_id,
       restaurant.slug AS restaurant_slug,
       restaurant.name AS restaurant_name,
       restaurant.address AS restaurant_address,
       grant_row.principal_email,
       grant_row.role,
       grant_row.granted_at
     FROM fysen.restaurant_access_grants AS grant_row
     JOIN fysen.restaurants AS restaurant ON restaurant.id = grant_row.restaurant_id
     WHERE grant_row.status = 'active'
     ORDER BY grant_row.granted_at ASC, grant_row.id ASC
     LIMIT $1`,
    [limit],
  );

  return result.rows.map((row) => ({
    accessGrantId: row.access_grant_id,
    claimId: row.claim_id,
    restaurant: {
      slug: row.restaurant_slug,
      name: row.restaurant_name,
      address: row.restaurant_address,
    },
    principal: {
      email: row.principal_email,
      role: row.role,
    },
    grantedAt: row.granted_at.toISOString(),
  }));
}
