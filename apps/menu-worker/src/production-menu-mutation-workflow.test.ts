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

describe("production menu mutation workflows", () => {
  it("serializes materializer and watcher through one production mutation queue", () => {
    for (const workflow of [materializer, watcher]) {
      expect(workflow).toContain("group: fysen-production-menu-mutation");
      expect(workflow).toContain("cancel-in-progress: false");
    }
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

  it("keeps catalog onboarding inside the serialized watcher job", () => {
    expect(watcher).toContain("name: Onboard catalog candidates");
    expect(watcher).toContain("run: pnpm --filter @fysen/menu-worker onboard:catalog");
  });

  it("reconciles canonical catalog metadata before watching due restaurant hours", () => {
    const onboardingStep = watcher.indexOf("name: Onboard catalog candidates");
    const hoursStep = watcher.indexOf("name: Watch due restaurant hours");

    expect(onboardingStep).toBeGreaterThan(-1);
    expect(hoursStep).toBeGreaterThan(-1);
    expect(onboardingStep).toBeLessThan(hoursStep);
  });
});