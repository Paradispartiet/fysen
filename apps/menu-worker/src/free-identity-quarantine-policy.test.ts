import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  assertNoImplicitQuarantineRelease, parseReviewedIdentityQuarantines,
  readReviewedIdentityQuarantines,
} from "./free-identity-quarantine-policy.js";

const cityWork = {
  code: "identity-unverified",
  slug: "city-work-akersgata-oslo",
  expectedSourceUrl: "https://www.meny.semeny.no/public/dk/sted/citywork1",
  issue: "https://github.com/Paradispartiet/fysen/issues/1133",
  quarantinedAt: "2026-11-05",
} as const;

describe("manually reviewed Free identity quarantines", () => {
  it("loads the committed City Work policy, rather than an implicit error-code rule", async () => {
    const policies = await readReviewedIdentityQuarantines(
      fileURLToPath(new URL("../free-identity-quarantines.json", import.meta.url)),
    );
    expect(policies).toEqual([cityWork]);
  });

  it("accepts two independent, separately reviewed entries", () => {
    const another = {
      ...cityWork,
      slug: "hypothetical-reviewed-second-source",
      expectedSourceUrl: "https://example.org/verified-identity-dispute",
      issue: "https://github.com/Paradispartiet/fysen/issues/1234",
    };
    expect(parseReviewedIdentityQuarantines({
      version: 1, quarantines: [cityWork, another],
    })).toHaveLength(2);
  });

  it("fails closed for missing, invalid, duplicated, or insufficient evidence", () => {
    const parse = (policies: unknown) => parseReviewedIdentityQuarantines(policies);
    expect(() => parse({ version: 2, quarantines: [cityWork] })).toThrow();
    expect(() => parse({ version: 1, quarantines: [{ ...cityWork, quarantinedAt: "2026-02-30" }] })).toThrow();
    expect(() => parse({ version: 1, quarantines: [{ ...cityWork, issue: "https://example.org/note" }] })).toThrow();
    expect(() => parse({ version: 1, quarantines: [{ ...cityWork, issue: "" }] })).toThrow();
    expect(() => parse({ version: 1, quarantines: [{ ...cityWork, expectedSourceUrl: "http://example.org/menu" }] })).toThrow();
    expect(() => parse({ version: 1, quarantines: [{ ...cityWork, expectedSourceUrl: "https://user:pass@example.org/menu" }] })).toThrow();
    expect(() => parse({ version: 1, quarantines: [{ ...cityWork, unexpected: true }] })).toThrow();
    expect(() => parse({ version: 1, quarantines: [cityWork, cityWork] })).toThrow();
    expect(() => parse({ version: 1, quarantines: [
      cityWork, { ...cityWork, slug: "another-restaurant", issue: "https://github.com/Paradispartiet/fysen/issues/1234" },
    ] })).toThrow();
    expect(() => parse({ version: 1, quarantines: Array.from({ length: 26 }, (_, i) => ({
      ...cityWork, slug: `restaurant-${i}`, expectedSourceUrl: `https://example.org/${i}`,
    })) })).toThrow();
  });

  it("does not silently release an already published quarantine", () => {
    const published = { "155": { slug: cityWork.slug } };
    const active = new Map([[155, cityWork]]);
    expect(() => assertNoImplicitQuarantineRelease(published, active)).not.toThrow();
    expect(() => assertNoImplicitQuarantineRelease(published, new Map())).toThrow(/manual release review/);
    expect(() => assertNoImplicitQuarantineRelease(published, new Map([[155, { ...cityWork, slug: "wrong-restaurant" }]]))).toThrow();
    expect(() => assertNoImplicitQuarantineRelease({ "-1": { slug: cityWork.slug } }, active)).toThrow();
    // A newly reviewed quarantine may be added, but cannot implicitly
    // remove or reassign any already published quarantine.
    expect(() => assertNoImplicitQuarantineRelease({}, active)).not.toThrow();
  });
});
