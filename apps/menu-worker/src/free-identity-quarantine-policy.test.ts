import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  assertNoImplicitQuarantineRelease, parseReviewedIdentityQuarantines,
  readReviewedIdentityQuarantines, resolveReviewedIdentityQuarantines,
} from "./free-identity-quarantine-policy.js";
import type { FreeIndex } from "./free-static-refresh-core.js";

const cityWork = {
  code: "identity-unverified",
  slug: "city-work-akersgata-oslo",
  expectedSourceUrl: "https://www.meny.semeny.no/public/dk/sted/citywork1",
  issue: "https://github.com/Paradispartiet/fysen/issues/1133",
  quarantinedAt: "2026-11-05",
} as const;

const falafelStation = {
  code: "identity-unverified",
  slug: "falafel-station-brugata-oslo",
  expectedSourceUrl: "https://semeny.no/sted/falafelstation",
  issue: "https://github.com/Paradispartiet/fysen/issues/1139",
  quarantinedAt: "2026-11-05",
} as const;

const fancii = {
  code: "identity-unverified",
  slug: "fancii-oslo",
  expectedSourceUrl: "https://www.meny.semeny.no/public/dk/sted/fancii",
  issue: "https://github.com/Paradispartiet/fysen/issues/1141",
  quarantinedAt: "2026-11-05",
} as const;

const ferrys = {
  code: "identity-unverified",
  slug: "ferrys-pizzeria-filipstad-oslo",
  expectedSourceUrl: "https://semeny.no/sted/ferryspizzeria",
  issue: "https://github.com/Paradispartiet/fysen/issues/1142",
  quarantinedAt: "2026-11-05",
} as const;

describe("manually reviewed Free identity quarantines", () => {
  it("loads the committed City Work policy, rather than an implicit error-code rule", async () => {
    const policies = await readReviewedIdentityQuarantines(
      fileURLToPath(new URL("../free-identity-quarantines.json", import.meta.url)),
    );
    expect(policies).toEqual([cityWork, falafelStation, fancii, ferrys]);
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

  it("matches the exact published source and catalog record, never a coincident address", () => {
    const index: FreeIndex = {
      version: 1, archiveDate: "2026-11-02",
      restaurants: [
        ["City Work", cityWork.slug, "Akersgata 34", "Oslo", ""],
        ["Other", "other-restaurant", "Akersgata 34", "Oslo", ""],
      ],
      sources: [
        [0, cityWork.expectedSourceUrl, "2026-11-02T12:00:00Z"],
        [1, "https://example.org/safe", "2026-11-02T12:00:00Z"],
      ],
      items: [],
    };
    const matching = new Map([
      [0, { menuSource: { url: cityWork.expectedSourceUrl } }],
      [1, { menuSource: { url: "https://example.org/safe" } }],
    ]);
    expect([...resolveReviewedIdentityQuarantines(index, matching, [cityWork]).keys()]).toEqual([0]);
    expect(() => resolveReviewedIdentityQuarantines(index, new Map(), [cityWork])).toThrow();
    expect(() => resolveReviewedIdentityQuarantines(index, new Map([
      [0, { menuSource: { url: "https://example.org/replaced" } }],
    ]), [cityWork])).toThrow();
    expect(() => resolveReviewedIdentityQuarantines({
      ...index, sources: [[0, "https://example.org/replaced", index.sources[0]![2]], index.sources[1]!],
    }, matching, [cityWork])).toThrow();
    expect(() => resolveReviewedIdentityQuarantines(index, matching, [{
      ...cityWork, slug: "other-restaurant",
    }])).toThrow();
    expect(() => resolveReviewedIdentityQuarantines(index, matching, [
      cityWork, cityWork,
    ])).toThrow();
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
