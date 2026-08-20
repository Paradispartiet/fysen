import type { Pool, QueryResultRow } from "pg";
import { createDatabasePool } from "./client.js";
import { assertLocalOperatorEnvironment } from "./operator-environment.js";
import { reviewRestaurantClaim, type RestaurantClaimRole } from "./restaurant-claims.js";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type RestaurantClaimOperatorCommand =
  | { readonly kind: "list"; readonly limit: number }
  | {
      readonly kind: "review";
      readonly claimId: string;
      readonly outcome: "verified" | "rejected";
      readonly reviewedBy: string;
      readonly reviewNote: string;
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

function required(value: string | undefined, name: string): string {
  const normalized = value?.trim();
  if (!normalized) throw new Error(`${name} is required.`);
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

  if (operation === "list") {
    if (args.length > 2) throw new Error("Usage: claim:operator -- list [limit]");
    return { kind: "list", limit: parseLimit(args[1]) };
  }

  if (operation !== "verify" && operation !== "reject") {
    throw new Error("operation must be one of: list, verify, reject.");
  }

  const claimId = required(args[1], "claimId");
  if (!UUID_PATTERN.test(claimId)) throw new Error("claimId must be a UUID.");
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

async function main(): Promise<void> {
  assertLocalOperatorEnvironment();
  const command = parseRestaurantClaimOperatorCommand(process.argv.slice(2));
  const pool = createDatabasePool({ maxConnections: 1 });

  try {
    if (command.kind === "list") {
      process.stderr.write(
        "Claim operator output contains claimant PII. Use locally only; do not redirect it to GitHub logs, workflow artifacts or commits.\n",
      );
      const pendingClaims = await listPendingRestaurantClaims(pool, command.limit);
      process.stdout.write(`${JSON.stringify({ pendingClaims }, null, 2)}\n`);
      return;
    }

    const receipt = await reviewRestaurantClaim(pool, {
      claimId: command.claimId,
      outcome: command.outcome,
      reviewNote: command.reviewNote,
      reviewedBy: command.reviewedBy,
    });

    process.stdout.write(
      `${JSON.stringify({
        claimId: receipt.claimId,
        status: receipt.status,
        accessGrantId: receipt.accessGrantId,
        nextStep:
          receipt.status === "verified" && receipt.accessGrantId
            ? `pnpm --filter @fysen/database pro:issue-setup -- ${receipt.accessGrantId} ${command.reviewedBy}`
            : null,
      }, null, 2)}\n`,
    );
  } finally {
    await pool.end();
  }
}

void main().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
