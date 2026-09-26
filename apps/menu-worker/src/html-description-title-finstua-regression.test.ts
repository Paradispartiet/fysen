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
  it("preserves an allergen-adjacent long dish instead of scanning back to the page heading", () => {
    const soup =
      "Kremet fiskesuppe med med reker, fisk og friske grønnsaker";
    const visibleText = [
      "Restaurant Finstua Lunsjmeny",
      "Lunsjretter",
      soup,
      "(SK, F, M, S)",
      "335",
    ].join("\n");
    const soupItem = {
      ...observed(soup, 4, 33500),
      sourceExcerpt: `${soup} — (SK, F, M, S) — 335`,
    };

    const result = recoverDescriptionNamedHtmlItems([soupItem], visibleText);

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe(soup);
    expect(result[0]?.name).not.toBe("Restaurant Finstua Lunsjmeny");
    expect(result[0]?.name).not.toBe("(SK, F, M, S)");
    expect(result[0]?.name).not.toBe("Lunsjretter");
  });

  it("preserves an allergen-adjacent long sandwich instead of its section heading", () => {
    const toast =
      "Toast Skagen servert på kefirbrød med ørretrogn, sitron og pepperrot";
    const visibleText = [
      "Restaurant Finstua Lunsjmeny",
      "Sandwiches",
      toast,
      "(M, G1, G2, S)",
      "325",
    ].join("\n");
    const toastItem = {
      ...observed(toast, 4, 32500),
      sourceExcerpt: `${toast} — (M, G1, G2, S) — 325`,
    };

    const result = recoverDescriptionNamedHtmlItems([toastItem], visibleText);

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe(toast);
    expect(result[0]?.name).not.toBe("Restaurant Finstua Lunsjmeny");
    expect(result[0]?.name).not.toBe("(M, G1, G2, S)");
    expect(result[0]?.name).not.toBe("Sandwiches");
  });
});
