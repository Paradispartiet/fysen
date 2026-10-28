import { describe, expect, it } from "vitest";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { recoverDescriptionNamedHtmlItems, rejectAmbiguousMultiPriceDescriptionRows } from "./html-description-title-recovery.js";

function item(name: string, priceMinor: number, position: number): MenuObservedItem {
  return {
    name, normalizedName: normalizeDishName(name),
    sourceKey: createMenuItemSourceKey(name),
    description: null, sectionName: null, priceMinor, priceKind: "exact",
    currency: "NOK", position, extractionMethod: "html_heuristic",
    confidence: 0.95, sourceExcerpt: name + " — kr " + (priceMinor / 100),
  };
}

describe("adjacent heading recovery for first-party priced descriptions", () => {
  const visibleText = [
    "FORRETTER",
    "Rakfisk",
    "Rakørret fra Noraker Gård i Aurdal. ALL: fisk, hvete. Liten (4) kr 235 Stor (8) kr 465",
    "Fetsild",
    "m/rød pepperrot, potet. ALL: fisk, sulfitt, egg. kr 225",
    "HOVEDRETTER",
    "Kjøttkaker i brun saus",
    "Schrøder, 1957. m/surkål, ertestuing, poteter, tyttebær. ALL: hvete, laktose kr 287",
    "Flesk og duppe",
    "Økologisk svin, potet, stappe. ALL: hvete, sulfitt, laktose. kr 325",
    "DESSERT",
    "Kvæfjordkake",
    "«Verdens beste», etter Turid Hammerø. ALL: hvete, laktose, egg, mandler kr 189",
  ].join("\n");

  it("restores unique adjacent dish headings, never borrowing the description's opening words", () => {
    const result = recoverDescriptionNamedHtmlItems([
      item("Schrøder", 28700, 7),
      item("Økologisk svin", 32500, 9),
      item("m/rød pepperrot", 22500, 4),
      item("«Verdens beste»", 18900, 12),
    ], visibleText);
    expect(result.map((row) => [row.name, row.priceMinor])).toEqual([
      ["Fetsild", 22500],
      ["Kjøttkaker i brun saus", 28700],
      ["Flesk og duppe", 32500],
      ["Kvæfjordkake", 18900],
    ]);
    expect(result.every((row) => row.description && row.confidence <= 0.80)).toBe(true);
  });

  it("fails closed for a line offering two different portion prices", () => {
    const row = item("Rakfisk Rakørret fra Noraker Gård i Aurdal", 46500, 2);
    const result = recoverDescriptionNamedHtmlItems([row], visibleText);
    expect(result[0]?.name).not.toBe("Rakfisk");
  });

  it("quarantines ambiguous two-size exact-price rows but keeps single-price dishes", () => {
    const rows = [
      item("Rakfisk Rakørret fra Noraker Gård i Aurdal", 46500, 2),
      item("Kjøttkaker i brun saus", 28700, 7),
    ];
    expect(rejectAmbiguousMultiPriceDescriptionRows(rows, visibleText).map((row) => row.name))
      .toEqual(["Kjøttkaker i brun saus"]);
  });

  it("does not rewrite directly priced normal titles without a description/allergen line", () => {
    const result = recoverDescriptionNamedHtmlItems(
      [item("Grynsodd", 17800, 1)],
      "FORRETTER\nGrynsodd kr 178\nHOVEDRETTER",
    );
    expect(result[0]?.name).toBe("Grynsodd");
  });
});
