import { readFile } from "node:fs/promises";
import { z } from "zod";
import { findMatchingFreeSourceIndex, type FreeIndex } from "./free-static-refresh-core.js";

// A quarantine is a reviewed editorial decision, never an automatic
// consequence of a failed HTTP request or a non-NOK extractor result.
// Reject incorrect or incomplete policy files before touching the public index.
const reviewedDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const parsed = new Date(value + "T00:00:00.000Z");
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}, "Invalid calendar date");

const reviewedEntry = z.strictObject({
  code: z.literal("identity-unverified"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  expectedSourceUrl: z.url().refine((value) => {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password &&
      !url.hash && !url.search;
  }, "Source must be a credential-free exact HTTPS URL"),
  issue: z.string().regex(
    /^https:\/\/github\.com\/Paradispartiet\/fysen\/issues\/[1-9]\d*$/,
    "A reviewed quarantine requires a canonical repository issue",
  ),
  quarantinedAt: reviewedDate,
});

const registry = z.strictObject({
  version: z.literal(1),
  quarantines: z.array(reviewedEntry).max(25),
}).superRefine((input, context) => {
  const slugs = new Set<string>();
  const sources = new Set<string>();
  for (const [index, policy] of input.quarantines.entries()) {
    if (slugs.has(policy.slug)) {
      context.addIssue({
        code: "custom", path: ["quarantines", index, "slug"],
        message: "Duplicate restaurant identity quarantine",
      });
    }
    if (sources.has(policy.expectedSourceUrl)) {
      context.addIssue({
        code: "custom", path: ["quarantines", index, "expectedSourceUrl"],
        message: "Duplicate source identity quarantine",
      });
    }
    slugs.add(policy.slug);
    sources.add(policy.expectedSourceUrl);
  }
});

export type ReviewedIdentityQuarantine = z.infer<typeof reviewedEntry>;

export function parseReviewedIdentityQuarantines(input: unknown): readonly ReviewedIdentityQuarantine[] {
  return registry.parse(input).quarantines;
}

export async function readReviewedIdentityQuarantines(path: string): Promise<readonly ReviewedIdentityQuarantine[]> {
  return parseReviewedIdentityQuarantines(JSON.parse(await readFile(path, "utf8")) as unknown);
}

// Resolve against BOTH the last published index and the current catalog.
// Do not quarantine a different restaurant merely because a menu URL points
// to the same address or a catalog entry has migrated unexpectedly.
export function resolveReviewedIdentityQuarantines(
  index: FreeIndex,
  catalog: ReadonlyMap<number, { readonly menuSource: { readonly url: string } }>,
  policies: readonly ReviewedIdentityQuarantine[],
): ReadonlyMap<number, ReviewedIdentityQuarantine> {
  const resolved = new Map<number, ReviewedIdentityQuarantine>();
  for (const policy of policies) {
    const sourceIndex = findMatchingFreeSourceIndex(
      index, policy.slug, policy.expectedSourceUrl,
    );
    if (sourceIndex === null ||
        index.sources[sourceIndex]?.[1] !== policy.expectedSourceUrl ||
        catalog.get(sourceIndex)?.menuSource.url !== policy.expectedSourceUrl ||
        resolved.has(sourceIndex)) {
      throw new Error("Quarantined source no longer matches reviewed evidence; refuse automatic publication");
    }
    resolved.set(sourceIndex, policy);
  }
  return resolved;
}

// Removing or silently changing a previously published quarantine must not
// resurrect an unverified restaurant. Require a separate explicit release
// implementation and its own reviewed evidence before re-enabling sources.
export function assertNoImplicitQuarantineRelease(
  previouslyPublished: Readonly<Record<string, { readonly slug: string }>>,
  activePolicies: ReadonlyMap<number, ReviewedIdentityQuarantine>,
): void {
  for (const [key, previous] of Object.entries(previouslyPublished)) {
    const index = Number(key);
    if (!Number.isSafeInteger(index) || index < 0 ||
        activePolicies.get(index)?.slug !== previous.slug) {
      throw new Error("Previously published identity quarantine disappeared or changed: manual release review required");
    }
  }
}
