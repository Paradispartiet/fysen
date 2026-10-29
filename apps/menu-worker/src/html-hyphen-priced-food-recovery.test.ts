import { describe, expect, it } from "vitest";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import {
  recoverHyphenDescriptionPricedFoodItems,
  mergeSourceBackedHyphenPricedFoodItems,
} from "./html-hyphen-priced-food-recovery.js";

function oldRow(name: string, priceMinor: number): MenuObservedItem {
  return {
    name,
    normalizedName: normalizeDishName(name),
    sourceKey: createMenuItemSourceKey(name),
    description: null,
    sectionName: null,
    priceMinor,
    priceKind: "exact",
    priceMaxMinor: null,
    currency: "NOK",
    position: 1,
    extractionMethod: "html_heuristic",
    confidence: 0.90,
    sourceExcerpt: name,
  };
}

describe("food lines with hyphen descriptions and source-owned NOK prices", () => {
  it("recovers the individually priced Bjørvika dishes and binds their own prices", () => {
    const source = [
      "APERITIF",
      "Vermouth Bianco / Classico - Carpano vermouth med ansjos – 150,-",
      "Østers (3 stk / 6 stk / 12 stk)",
      "Fine No.3 - klassisk, mineralsk, lett 150,- / 295,- / 585,-",
      "SMÅRETTER",
      "Torskekroketter - Fylt med ris & Västerbottenost. Serveras med grillet paprikasaus, røkt chipotlemajones 229,-",
      "Laksetataki - avokadokrem, ørretrogn & pastinakk krisp 229,- (F, M)",
      "Tørrmodnet Hamachi - Tindveddressing & sprø persille 229,- (F)",
      "Sjømatbisque - dagens skalldyr & fetaost. Servert med ristet brød & aioli 249,- (M)",
      "HOVEDRETTER",
      "Fish & Chips - Dagens ølpanerte fisk, pommes frites, remulade & syltet løk - 298,- (F, H, SE, E)",
      "Bacalao - Klippfisk, tomat, ristet paprika, oliven, potet, brød & aioli - 298,- (F, H, SE)",
      "Kremet fiskesuppe - dagens fisk, blåskjell, grønnsaker, brød & aioli - 298,-",
    ].join(String.fromCharCode(10));
    const items = recoverHyphenDescriptionPricedFoodItems(source);
    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Torskekroketter", 22900],
      ["Laksetataki", 22900],
      ["Tørrmodnet Hamachi", 22900],
      ["Sjømatbisque", 24900],
      ["Fish & Chips", 29800],
      ["Bacalao", 29800],
      ["Kremet fiskesuppe", 29800],
    ]);
    expect(items.every((item) => item.sourceExcerpt?.includes(",-"))).toBe(true);
  });

  it("repairs verbose title fragments and preserves a single source price", () => {
    const source = "Torskekroketter - Fylt med ris & Västerbottenost. Servert med paprikasaus 229,-";
    const recovered = recoverHyphenDescriptionPricedFoodItems(source);
    const result = mergeSourceBackedHyphenPricedFoodItems([
      { ...oldRow("Torskekroketter - Fylt med ris & Västerbottenost", 22900), sectionName: "SMÅRETTER" },
      oldRow("Grønn salat", 9800),
    ], recovered);
    expect(result.map((item) => item.name)).toContain("Torskekroketter");
    expect(result.map((item) => item.name)).not.toContain("Torskekroketter - Fylt med ris & Västerbottenost");
    expect(result.filter((item) => item.name === "Torskekroketter")).toHaveLength(1);
    expect(result.find((item) => item.name === "Torskekroketter")?.sectionName).toBe("SMÅRETTER");
    expect(result.find((item) => item.name === "Torskekroketter")?.priceMinor).toBe(22900);
    expect(result.find((item) => item.name === "Grønn salat")?.priceMinor).toBe(9800);
  });

  it("fails closed for multi-size prices, beverage titles and unpriced descriptions", () => {
    const source = [
      "Fine No.3 - klassisk, mineralsk, lett 150,- / 295,- / 585,-",
      "Oscietra - fast, salt, smør – 10g 459,- / 30g 1229,-",
      "Vermouth Bianco / Classico - Carpano vermouth med ansjos – 150,-",
      "Laksetataki - avokadokrem uten oppgitt pris",
    ].join(String.fromCharCode(10));
    expect(recoverHyphenDescriptionPricedFoodItems(source)).toEqual([]);
  });
});
