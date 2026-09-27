import { describe, expect, it } from "vitest";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { filterHtmlBeverageSectionItemsWithScopedProvenance } from "./html-text-section-scope.js";

function item(
  name: string,
  priceMinor: number,
  sourceExcerpt: string,
): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor,
    currency: "NOK",
    position: 1,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt,
  };
}

describe("Finstua text-section provenance", () => {
  it("keeps long food titles directly priced through standalone allergen metadata", () => {
    const salad =
      "Høstsalat serveres med syltede kantareller, bakt gresskar, salte gresskarkjerner, chevre og sherrysirup";
    const charcuterie =
      "Spekefjøl med tronfjellskinke, speket elgpølse og fenalår serveres med ramsløkost, pickles, rømme og flatbrød";
    const toast =
      "Toast Skagen servert på kefirbrød med ørretrogn, sitron og pepperrot";
    const items = [
      item(salad, 31500, `${salad} — (M, G1, S) — 315`),
      item(charcuterie, 31500, `${charcuterie} — (M, G1) — 315`),
      item(toast, 32500, `${toast} — (M, G1, G2, S) — 325`),
    ];
    const visibleText = [
      "Lunsjretter",
      salad,
      "(M, G1, S)",
      "315",
      charcuterie,
      "(M, G1)",
      "315",
      "Sandwiches",
      toast,
      "(M, G1, G2, S)",
      "325",
    ].join("\n");

    const result = filterHtmlBeverageSectionItemsWithScopedProvenance(
      items,
      visibleText,
      visibleText,
    );

    expect(result.map((entry) => entry.name)).toEqual([
      salad,
      charcuterie,
      toast,
    ]);
  });

  it("recovers scoped direct-priced dishes when the scoped slice starts after the food heading", () => {
    const charcuterie =
      "Spekefjøl med tronfjellskinke, speket elgpølse og fenalår serveres med ramsløkost, pickles, rømme og flatbrød";
    const toast =
      "Toast Skagen servert på kefirbrød med ørretrogn, sitron og pepperrot";
    const items = [
      item(charcuterie, 31500, `${charcuterie} — (M, G1, G2, S) — Kr. 315,-`),
      item(toast, 32500, `${toast} — (SK, M, G1, E, SP) — Kr. 325,-`),
    ];
    const scopedVisibleText = [
      charcuterie,
      "(M, G1, G2, S)",
      "Kr. 315,-",
      toast,
      "(SK, M, G1, E, SP)",
      "Kr. 325,-",
    ].join("\n");
    const fullVisibleText = [
      "Lunsjretter",
      charcuterie,
      "(M, G1, G2, S)",
      "Kr. 315,-",
      "Sandwiches",
      toast,
      "(SK, M, G1, E, SP)",
      "Kr. 325,-",
    ].join("\n");

    const result = filterHtmlBeverageSectionItemsWithScopedProvenance(
      items,
      scopedVisibleText,
      fullVisibleText,
    );

    expect(result.map((entry) => entry.name)).toEqual([
      charcuterie,
      toast,
    ]);
  });
});
