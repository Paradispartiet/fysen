import { materializeRestaurantCatalog } from "./catalog-materialization.js";

async function main(): Promise<void> {
  const summary = await materializeRestaurantCatalog();
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  if (summary.blockingFailedCount > 0) process.exitCode = 1;
}

void main().catch((error: unknown) => {
  const message = error instanceof Error ? (error.stack ?? error.message) : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
