import { describe, expect, it } from "vitest";
import type { MenuObservedItem } from "@fysen/menu-core";
import { recoverDescriptionNamedHtmlItems } from "./html-description-title-recovery.js";

function observed(
  name: string,
  position: number,
  priceMinor: number,
  sourceExcerpt: string,
): MenuObservedItem {
  return {
    sourceKey: `test:${position}`,
    name,
    normalizedName: name.toLocaleLowerCase("nb-NO"),
    description: null,
    sectionName: null,
    priceMinor,
    currency: "NOK",
    position,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt,
  };
}

describe("inline-priced observed title provenance", () => {
  it("does not reinterpret a directly priced title-case dish whose first word is description-like", () => {
    const visibleText = [
      "Mango Sorbet 119,-",
      "Mango ice sorbet.",
      "Mixed Ice Cream 129,-",
      "Mango sorbet and vanilla ice cream.",
      "Lemon Sorbet 129,-",
    ].join("\n");

    const result = recoverDescriptionNamedHtmlItems(
      [
        observed("Mango Sorbet", 0, 11900, "Mango Sorbet 119,-"),
        observed("Mixed Ice Cream", 2, 12900, "Mixed Ice Cream 129,-"),
        observed("Lemon Sorbet", 4, 12900, "Lemon Sorbet 129,-"),
      ],
      visibleText,
    );

    expect(result.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Mango Sorbet", 11900],
      ["Mixed Ice Cream", 12900],
      ["Lemon Sorbet", 12900],
    ]);
  });
});
