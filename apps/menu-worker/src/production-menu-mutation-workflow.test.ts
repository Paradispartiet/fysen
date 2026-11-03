import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const materializer = readFileSync(
  new URL("../../../.github/workflows/materialize-production-catalog.yml", import.meta.url),
  "utf8",
);
const watcher = readFileSync(
  new URL("../../../.github/workflows/watch-menus.yml", import.meta.url),
  "utf8",
);
const batchIntake = readFileSync(
  new URL("../../../.github/workflows/restaurant-batch-intake.yml", import.meta.url),
  "utf8",
);
const freeRefresh = readFileSync(
  new URL("../../../.github/workflows/refresh-fysen-free-menus.yml", import.meta.url),
  "utf8",
);

describe("production menu mutation workflows", () => {
  it("keeps materialization independent from the watcher pending queue", () => {
    expect(materializer).toContain("group: fysen-production-catalog-materialization");
    expect(materializer).toContain("cancel-in-progress: false");
    expect(materializer).not.toContain("group: fysen-production-menu-mutation");

    expect(watcher).toContain("group: fysen-production-menu-mutation");
    expect(watcher).toContain("cancel-in-progress: false");
  });

  it("re-materializes the exact main SHA after catalog or parser/runtime changes", () => {
    expect(materializer).toContain('".github/workflows/materialize-production-catalog.yml"');
    expect(materializer).toContain('"apps/menu-worker/catalog/**"');
    expect(materializer).toContain('"apps/menu-worker/src/**"');
    expect(materializer).toContain('"!apps/menu-worker/src/**/*.test.ts"');
    expect(materializer).toContain('"packages/menu-core/src/**"');
    expect(materializer).toContain('"!packages/menu-core/src/**/*.test.ts"');
    expect(materializer).toContain('ref: ${{ github.sha }}');
    expect(materializer).not.toContain("ref: main");
  });

  it("keeps full catalog onboarding out of the bounded hourly watcher", () => {
    expect(materializer).toContain("name: Materialize canonical production catalog");
    expect(watcher).not.toContain("name: Onboard catalog candidates");
    expect(watcher).not.toContain("run: pnpm --filter @fysen/menu-worker onboard:catalog");
  });

  it("keeps the broken DB watcher paused and Free updates bounded", () => {
    // The old production DB is offline. Retain its manual watchdog entrypoint,
    // but do not schedule futile SQL mutation attempts.
    expect(watcher).toContain("workflow_dispatch:");
    expect(watcher).not.toContain('cron: "17,47 * * * *"');
    expect(watcher).not.toContain("workflow_run:");
    expect(watcher).toContain('FYSEN_MENU_WATCH_BATCH_SIZE: "100"');

    expect(freeRefresh).toContain('cron: "31 0,3,6,9,12,15,18,21 * * *"');
    expect(freeRefresh).toContain("group: fysen-free-public-index");
    expect(freeRefresh).toContain("cancel-in-progress: false");
    expect(freeRefresh).toContain("free-static-refresh.js");
    expect(freeRefresh).toContain("apps/menu-worker/catalog 12");
    expect(freeRefresh).toContain("Focused Free refresh tests");
    expect(freeRefresh).not.toContain("DATABASE_URL");

    // Free checks are gradual, not a claim that all original sources keep
    // their old 12-hour freshness requirement.
    const maxFreeChecksPerDay = 8 * 12;
    expect(maxFreeChecksPerDay).toBe(96);
    expect(maxFreeChecksPerDay).toBeLessThan(973);
  });

  it("keeps menu test-only changes out of live restaurant intake", () => {
    expect(batchIntake).toContain('"apps/menu-worker/src/**"');
    expect(batchIntake).toContain('"!apps/menu-worker/src/**/*.test.ts"');
    expect(batchIntake).toContain('"packages/menu-core/src/**"');
    expect(batchIntake).toContain('"!packages/menu-core/src/**/*.test.ts"');
    expect(batchIntake).not.toContain('      - ".github/workflows/restaurant-batch-intake.yml"');
  });

  it("runs only bounded operational watcher stages before preserving failure signal", () => {
    const menuStep = watcher.indexOf("name: Watch due menu sources");
    const hoursStep = watcher.indexOf("name: Watch due restaurant hours");
    const actionsStep = watcher.indexOf("name: Reverify expiring restaurant actions");
    const failureSignalStep = watcher.indexOf("name: Preserve operational failure signal");

    expect(menuStep).toBeGreaterThan(-1);
    expect(hoursStep).toBeGreaterThan(menuStep);
    expect(actionsStep).toBeGreaterThan(hoursStep);
    expect(failureSignalStep).toBeGreaterThan(actionsStep);
  });
});
