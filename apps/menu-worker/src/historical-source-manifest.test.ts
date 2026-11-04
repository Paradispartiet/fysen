import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { restaurantOnboardingManifestSchema } from "./onboarding-manifest.js";

const original = JSON.parse(await readFile(
  new URL("../catalog/zaiqa-dalsbergstien-oslo.json", import.meta.url),
  "utf8",
)) as Record<string, unknown>;
const initial = restaurantOnboardingManifestSchema.parse(original);
const snapshot = {
  ...initial,
  menuSource: {
    ...initial.menuSource,
    url: "https://raw.githubusercontent.com/Paradispartiet/fysen/main/apps/menu-worker/source-archives/zaiqa-dalsbergstien-20261104.html",
    sourceType: "json_ld" as const,
    historicalSnapshotAt: "2026-11-04T22:38:36Z",
  },
};

describe("historical menu provenance is explicit and constrained", () => {
  it("permits a dated, archived GitHub source without changing old assertions", () => {
    const value = restaurantOnboardingManifestSchema.parse(snapshot);
    expect(value.menuSource.historicalSnapshotAt).toBe("2026-11-04T22:38:36Z");
    expect(value.qualityAssertions.requiredDishNames).toEqual(initial.qualityAssertions.requiredDishNames);
    expect(value.menuSource.minimumExpectedItems).toBe(initial.menuSource.minimumExpectedItems);
  });

  it("does not let an active restaurant webpage masquerade as a dated archive", () => {
    const bogus = { ...snapshot, menuSource: { ...snapshot.menuSource, url: "https://zaiqa.no/var-meny/" } };
    expect(restaurantOnboardingManifestSchema.safeParse(bogus).success).toBe(false);
  });

  it("rejects HTML and browser sources with an archive observation date", () => {
    expect(restaurantOnboardingManifestSchema.safeParse({
      ...snapshot,
      menuSource: { ...snapshot.menuSource, sourceType: "html" },
    }).success).toBe(false);
    expect(restaurantOnboardingManifestSchema.safeParse({
      ...snapshot,
      menuSource: { ...snapshot.menuSource, fetchMode: "browser" },
    }).success).toBe(false);
    expect(restaurantOnboardingManifestSchema.safeParse({
      ...snapshot,
      menuSource: { ...snapshot.menuSource, historicalSnapshotAt: "yesterday" },
    }).success).toBe(false);
  });
});
