import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const materializer = readFileSync(
  new URL("../../../.github/workflows/materialize-production-catalog.yml", import.meta.url),
  "utf8",
);
const watcher = readFileSync(
  new URL("../../../.github/workflows/watch-menus.yml", import.meta.url),
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

  it("maintains source-check capacity above the live catalog's scheduled demand", () => {
    expect(watcher).toContain("timeout-minutes: 30");
    expect(watcher).toContain('cron: "17,47 * * * *"');
    expect(watcher).toContain('FYSEN_MENU_WATCH_BATCH_SIZE: "100"');

    const catalogUrl = new URL("../catalog/", import.meta.url);
    const manifestFiles = readdirSync(catalogUrl).filter((name) => name.endsWith(".json"));
    const requiredChecksPerHour = manifestFiles.reduce((total, fileName) => {
      const manifest = JSON.parse(readFileSync(new URL(fileName, catalogUrl), "utf8")) as {
        menuSource: { checkIntervalMinutes: number };
      };
      const interval = manifest.menuSource.checkIntervalMinutes;
      expect(Number.isFinite(interval) && interval > 0).toBe(true);
      return total + 60 / interval;
    }, 0);

    // The due-source query is capped at 100 per run. Reserve 50% headroom
    // for delayed GitHub schedules, retries and a growing catalog.
    const hourlyCapacity = 2 * 100;
    expect(hourlyCapacity).toBeGreaterThan(requiredChecksPerHour * 1.5);
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
