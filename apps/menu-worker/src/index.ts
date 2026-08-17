import { normalizeDishName } from "@fysen/menu-core";
import { runRestaurantActionVerification } from "./action-verifier.js";
import { extractHtmlMenu } from "./html-extractor.js";
import { HttpMenuClient } from "./http-client.js";
import {
  validateRestaurantManifestDirectory,
  validateRestaurantManifestPath,
} from "./manifest-validator.js";
import { onboardRestaurantCatalog, onboardRestaurantManifest } from "./onboarding.js";
import { runRodeoPilot } from "./pilot.js";
import { runDueMenuSources } from "./run-due.js";
import { runDueRestaurantHours } from "./run-opening-hours.js";

function print(value: unknown): void {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

async function probe(url: string): Promise<void> {
  const userAgent = process.env.FYSEN_MENU_BOT_USER_AGENT?.trim() || "FysenMenuBot/0.1";
  const client = new HttpMenuClient();
  const result = await client.fetchSource({ url, userAgent, etag: null, lastModified: null });
  if (result.kind === "not_modified") {
    print(result);
    return;
  }
  const extracted = extractHtmlMenu(result.body);
  print({
    url,
    status: result.status,
    method: extracted.method,
    itemCount: extracted.items.length,
    sample: extracted.items.slice(0, 10).map((item) => ({
      name: item.name,
      priceMinor: item.priceMinor,
      currency: item.currency,
    })),
  });
}

async function main(): Promise<void> {
  const command = process.argv[2] ?? "status";
  if (command === "status") {
    print({
      service: "fysen-menu-worker",
      status: "ready",
      normalizationProbe: normalizeDishName("  Biff-tartar  "),
    });
    return;
  }
  if (command === "probe") {
    const url = process.argv[3];
    if (!url) throw new Error("Usage: pnpm --filter @fysen/menu-worker probe -- <url>");
    await probe(url);
    return;
  }
  if (command === "pilot:rodeo") {
    print(await runRodeoPilot());
    return;
  }
  if (command === "validate:manifest") {
    const path = process.argv[3];
    if (!path) throw new Error("Usage: pnpm --filter @fysen/menu-worker validate:manifest -- <manifest.json>");
    const result = await validateRestaurantManifestPath(path);
    print(result);
    if (!result.accepted) process.exitCode = 1;
    return;
  }
  if (command === "validate:directory") {
    const directory = process.argv[3];
    if (!directory) throw new Error("Usage: pnpm --filter @fysen/menu-worker validate:directory -- <directory>");
    const summary = await validateRestaurantManifestDirectory(directory);
    print(summary);
    if (summary.failedCount > 0) process.exitCode = 1;
    return;
  }
  if (command === "onboard:manifest") {
    const path = process.argv[3];
    if (!path) throw new Error("Usage: pnpm --filter @fysen/menu-worker onboard:manifest -- <manifest.json>");
    const result = await onboardRestaurantManifest(path);
    print(result);
    if (result.outcome === "failed") process.exitCode = 1;
    return;
  }
  if (command === "onboard:catalog") {
    const summary = await onboardRestaurantCatalog();
    print(summary);
    if (summary.failedCount > 0) process.exitCode = 1;
    return;
  }
  if (command === "run:due") {
    const configuredLimit = Number.parseInt(process.env.FYSEN_MENU_WATCH_BATCH_SIZE ?? "25", 10);
    const summary = await runDueMenuSources(configuredLimit);
    print(summary);
    if (summary.failedCount > 0) process.exitCode = 1;
    return;
  }
  if (command === "watch:hours") {
    const configuredLimit = Number.parseInt(process.env.FYSEN_HOURS_WATCH_BATCH_SIZE ?? "25", 10);
    const summary = await runDueRestaurantHours(configuredLimit);
    print(summary);
    if (summary.failedCount > 0) process.exitCode = 1;
    return;
  }
  if (command === "verify:actions") {
    const configuredLimit = Number.parseInt(process.env.FYSEN_ACTION_VERIFY_BATCH_SIZE ?? "25", 10);
    const summary = await runRestaurantActionVerification(configuredLimit);
    print(summary);
    if (summary.failedCount > 0) process.exitCode = 1;
    return;
  }
  throw new Error(`Unknown menu-worker command: ${command}`);
}

void main().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
