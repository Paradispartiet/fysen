import { createMenuItemSourceKey, type MenuObservedItem } from "@fysen/menu-core";
import { describe, expect, it } from "vitest";
import {
  ConflictingMenuSourceKeyError,
  MENU_SOURCE_KEY_CANONICALIZER_VERSION,
  canonicalizeUniqueMenuSourceKeys,
} from "./menu-source-key-canonicalizer.js";

function observed(
  overrides: Partial<MenuObservedItem> = {},
): MenuObservedItem {
  const name = overrides.name ?? "Corba";
  const sectionName = overrides.sectionName ?? "Forretter";
  return {
    sourceKey: overrides.sourceKey ?? createMenuItemSourceKey(name, sectionName),
    name,
    normalizedName: overrides.normalizedName ?? "corba",
    description:
      overrides.description === undefined
        ? "Vår egen dagens suppe med smaker rett fra Tyrkia."
        : overrides.description,
    sectionName,
    priceMinor: overrides.priceMinor ?? 9900,
    priceKind: overrides.priceKind ?? "exact",
    priceMaxMinor: overrides.priceMaxMinor ?? null,
    currency: overrides.currency ?? "NOK",
    position: overrides.position ?? 10,
    extractionMethod: overrides.extractionMethod ?? "html_heuristic",
    confidence: overrides.confidence ?? 0.95,
    sourceExcerpt: overrides.sourceExcerpt ?? "Corba — 99,-",
  };
}

describe("menu source-key canonicalization", () => {
  it("collapses the repeated identical Confusion Corba card", () => {
    const first = observed({ position: 10 });
    const repeated = observed({ position: 20 });

    expect(MENU_SOURCE_KEY_CANONICALIZER_VERSION).toBe("source-key-v1");
    expect(canonicalizeUniqueMenuSourceKeys([first, repeated])).toEqual([first]);
  });

  it("keeps the richer observation when the other duplicate has no description", () => {
    const sparse = observed({ description: null, confidence: 0.99, position: 5 });
    const richer = observed({ position: 20 });

    expect(canonicalizeUniqueMenuSourceKeys([sparse, richer])).toEqual([richer]);
  });

  it("fails closed when one canonical key carries conflicting prices", () => {
    const exact = observed({ priceMinor: 9900 });
    const conflicting = observed({ priceMinor: 11900, position: 20 });

    expect(() => canonicalizeUniqueMenuSourceKeys([exact, conflicting])).toThrow(
      ConflictingMenuSourceKeyError,
    );
  });

  it("fails closed when one canonical key carries conflicting descriptions", () => {
    const first = observed();
    const conflicting = observed({
      description: "En annen rett med samme canonical navn.",
      position: 20,
    });

    expect(() => canonicalizeUniqueMenuSourceKeys([first, conflicting])).toThrow(
      /Conflicting observations share menu source key/,
    );
  });
});
