import { createDatabasePool } from "./client.js";
import { assertLocalOperatorEnvironment } from "./operator-environment.js";
import { listPendingRestaurantClaims, parseRestaurantClaimOperatorCommand } from "./restaurant-claim-operator.js";
import { reviewRestaurantClaim } from "./restaurant-claims.js";

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
