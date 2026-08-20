import { createDatabasePool } from "./client.js";
import { issueRestaurantProSetupToken } from "./fysen-pro.js";
import { assertLocalOperatorEnvironment } from "./operator-environment.js";

function requiredArgument(value: string | undefined, name: string): string {
  const normalized = value?.trim();
  if (!normalized) throw new Error(`${name} is required.`);
  return normalized;
}

async function main(): Promise<void> {
  assertLocalOperatorEnvironment();
  const args = process.argv.slice(2).filter((value) => value !== "--");
  const accessGrantId = requiredArgument(args[0], "accessGrantId");
  const createdBy = requiredArgument(args[1], "createdBy");
  const pool = createDatabasePool({ maxConnections: 1 });

  try {
    const receipt = await issueRestaurantProSetupToken(pool, { accessGrantId, createdBy });
    process.stdout.write(`${JSON.stringify({
      accessGrantId,
      setupToken: receipt.setupToken,
      expiresAt: receipt.expiresAt,
      warning: "Secret shown once. Deliver out-of-band; do not paste into GitHub logs or artifacts.",
    })}\n`);
  } finally {
    await pool.end();
  }
}

void main().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
