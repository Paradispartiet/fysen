import { describe, expect, it } from "vitest";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { canonicalizeHtmlOutputItems } from "./html-output-canonicalizer.js";

function item(
  name: string,
  priceMinor: number,
  sourceExcerpt: string,
  position: number,
): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor,
    priceKind: "exact",
    currency: "NOK",
    position,
    extractionMethod: "html_heuristic",
    confidence: 0.95,
    sourceExcerpt,
  };
}

describe("HTML output contextual-description canonicalization", () => {
  it("drops a same-price with-description only when another dish excerpt owns it", () => {
    const canonical = item(
      "SALMON AND KIMCHI ROLL",
      13900,
      "SALMON AND KIMCHI ROLL — Salmon with kimchi — NOK 139",
      10,
    );
    const description = item(
      "Salmon with kimchi",
      13900,
      "Salmon with kimchi — NOK 139",
      11,
    );
    const legitimateWithTitle = item(
      "SPRING ROLL WITH CHICKEN",
      13000,
      "SPRING ROLL WITH CHICKEN — NOK 130",
      12,
    );
    const unrelatedSamePriceTitle = item(
      "Fish with herbs",
      14500,
      "Fish with herbs — NOK 145",
      13,
    );

    const result = canonicalizeHtmlOutputItems([
      canonical,
      description,
      legitimateWithTitle,
      unrelatedSamePriceTitle,
    ]);

    expect(result.map((entry) => entry.name)).toEqual([
      "SALMON AND KIMCHI ROLL",
      "SPRING ROLL WITH CHICKEN",
      "Fish with herbs",
    ]);
  });
});
