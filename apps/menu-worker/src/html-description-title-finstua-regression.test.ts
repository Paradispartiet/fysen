import { describe, expect, it } from "vitest";
import { normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { recoverDescriptionNamedHtmlItems } from "./html-description-title-recovery.js";

function observed(
  name: string,
  position: number,
  priceMinor: number,
): MenuObservedItem {
  return {
    sourceKey: `finstua:${position}`,
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor,
    currency: "NOK",
    position,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt: `${name} — ${priceMinor / 100}`,
  };
}

describe("Finstua description-title recovery", () => {
  it("does not replace long dishes with parenthesized allergen codes or lunch section labels", () => {
    const soup =
      "Kremet fiskesuppe med med reker, fisk og friske grønnsaker";
    const visibleText = [
      "Lunsjretter",
      soup,
      "(SK, F, M, S)",
      "335",
    ].join("\n");

    const result = recoverDescriptionNamedHtmlItems(
      [observed(soup, 3, 33500)],
      visibleText,
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe(soup);
    expect(result[0]?.name).not.toBe("(SK, F, M, S)");
    expect(result[0]?.name).not.toBe("Lunsjretter");
  });

  it("does not replace a long sandwich dish with the Sandwiches section or allergen codes", () => {
    const toast =
      "Toast Skagen servert på kefirbrød med ørretrogn, sitron og pepperrot";
    const visibleText = [
      "Sandwiches",
      toast,
      "(M, G1, G2, S)",
      "325",
    ].join("\n");

    const result = recoverDescriptionNamedHtmlItems(
      [observed(toast, 3, 32500)],
      visibleText,
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe(toast);
    expect(result[0]?.name).not.toBe("(M, G1, G2, S)");
    expect(result[0]?.name).not.toBe("Sandwiches");
  });
});
