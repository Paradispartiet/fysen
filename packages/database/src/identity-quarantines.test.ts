import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { publicIdentityQuarantineSlugs } from "./identity-quarantines.js";

interface RegistryEntry {
  readonly slug: string;
  readonly code: string;
  readonly expectedSourceUrl: string;
  readonly issue: string;
  readonly quarantinedAt: string;
}

describe("public DB identity quarantine registry parity", () => {
  it("matches every source-proven Free quarantine without silently reopening or adding slugs", () => {
    const registry = JSON.parse(readFileSync(
      new URL("../../../apps/menu-worker/free-identity-quarantines.json", import.meta.url),
      "utf8",
    )) as { version: number; quarantines: RegistryEntry[] };

    expect(registry.version).toBe(1);
    expect(registry.quarantines.length).toBeGreaterThan(0);
    for (const item of registry.quarantines) {
      expect(item.code).toBe("identity-unverified");
      expect(item.expectedSourceUrl).toMatch(/^https:\/\//u);
      expect(item.issue).toMatch(/^https:\/\/github\.com\/Paradispartiet\/fysen\/issues\/\d+$/u);
      expect(item.quarantinedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/u);
    }
    const expectedSlugs = registry.quarantines.map((item) => item.slug).sort();
    expect(new Set(expectedSlugs).size).toBe(expectedSlugs.length);
    expect([...publicIdentityQuarantineSlugs].sort()).toEqual(expectedSlugs);
  });
});
