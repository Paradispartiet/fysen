import { describe, expect, it } from "vitest";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { HTML_SOURCE_PRICED_QA_VERSION, reconcileSourcePricedHtmlDishes } from "./html-source-priced-qa.js";

function dish(name: string, kroner: number, position: number): MenuObservedItem {
  return {
    name, normalizedName: normalizeDishName(name), sourceKey: createMenuItemSourceKey(name),
    description: null, sectionName: null, priceMinor: kroner * 100,
    priceKind: "exact", priceMaxMinor: null, currency: "NOK", position,
    extractionMethod: "html_heuristic", confidence: 0.95,
    sourceExcerpt: name + " — kr " + kroner,
  };
}

describe("HTML first-party price provenance", () => {
  it("retains published named portion choices, not an unqualified maximum price", () => {
    const lines = [
      "FORRETTER",
      "Rakfisk Rakørret fra Noraker. ALL: fisk. Liten (4) kr 235 Stor (8) kr 465",
    ].join("\n");
    const out = reconcileSourcePricedHtmlDishes([dish("Rakfisk", 465, 2)], lines);
    expect(out.map((v) => [v.name, v.priceMinor])).toEqual([
      ["Rakfisk (liten, 4 biter)", 23500],
      ["Rakfisk (stor, 8 biter)", 46500],
    ]);
    expect(new Set(out.map((v) => v.sourceKey)).size).toBe(2);
  });

  it("corrects nearby-price leakage only from the exact heading and its own description", () => {
    const source = [
      "Grynsodd",
      "Schrøder, 1957. med reinsdyrkraft. ALL: gluten kr 178",
      "Steinsopp- og kantarellsuppe. Skogsopp fra Jessheim. ALL: melk kr 195",
      "Kjøttkaker i brun saus",
      "Med poteter. ALL: egg kr 287",
    ].join("\n");
    const out = reconcileSourcePricedHtmlDishes([
      dish("Grynsodd", 195, 2), dish("Kjøttkaker i brun saus", 287, 6),
    ], source);
    expect(out.map((v) => [v.name, v.priceMinor])).toEqual([
      ["Grynsodd", 17800],
      ["Steinsopp- og kantarellsuppe", 19500],
      ["Kjøttkaker i brun saus", 28700],
    ]);
  });

  it("recovers a source-priced dessert with allergen metadata without inventing a title", () => {
    const source = [
      "DESSERT",
      "Karamellpudding med vanilje- og karamellsaus. ALL: laktose, egg kr 189",
      "Kvæfjordkake",
      "«Verdens beste». ALL: hvete, melk kr 189",
    ].join("\n");
    const out = reconcileSourcePricedHtmlDishes([dish("Kvæfjordkake", 189, 3)], source);
    expect(out.map((v) => v.name)).toEqual(["Karamellpudding med vanilje- og karamellsaus", "Kvæfjordkake"]);
  });

  it("recovers split title + allergy/price descriptions while rejecting source description duplicates", () => {
    const source = [
      "FORRETTER",
      "Reinsdyrhjerte",
      "Med rødbete og solbær. ALL: melk kr 225",
      "Steinsopp- og kantarellsuppe.",
      "Skogsopp fra Jessheim. ALL: melk kr 195",
      "DESSERT",
      "Brimsoll",
      "Fra Sogn. Brunostsaus. ALL: melk kr 179",
      "Stiftgårdskake",
      "Fra Trøndelag. Med epler. ALL: melk kr 195",
      "Karamellpudding med vanilje- og karamellsaus.",
      "ALL: melk, egg kr 189",
    ].join("\n");
    const out = reconcileSourcePricedHtmlDishes([
      dish("Reinsdyrhjerte", 225, 1),
      dish("Med rødbete og solbær", 225, 2),
      dish("Brimsoll", 179, 7),
      dish("Fra Sogn", 179, 8),
      dish("Stiftgårdskake", 195, 9),
      dish("Fra Trøndelag", 195, 10),
    ], source);
    expect(out.map((x) => [x.name, x.priceMinor])).toEqual([
      ["Reinsdyrhjerte", 22500],
      ["Steinsopp- og kantarellsuppe", 19500],
      ["Brimsoll", 17900],
      ["Stiftgårdskake", 19500],
      ["Karamellpudding med vanilje- og karamellsaus", 18900],
    ]);
  });

  it("marks the priced per-person platter and removes the sauce add-on", () => {
    const source = [
      "Schrøder panne kr 595 PP",
      "Schrøder panne",
      "Minimum 2 pers. ALL: sulfitt kr 595 Per person",
      "Indrefilet 150 g kr 415",
      "Gulsaus (Béarnaise) kr 78",
    ].join("\n");
    const out = reconcileSourcePricedHtmlDishes([
      dish("Schrøder panne", 415, 1),
      dish("Indrefilet 150 g", 415, 4),
      dish("Gulsaus (Béarnaise)", 78, 5),
    ], source);
    expect(out.map((v) => [v.name, v.priceMinor])).toEqual([
      ["Schrøder panne (per person, minst 2)", 59500],
      ["Indrefilet 150 g", 41500],
    ]);
  });

  it("fails closed on ambiguous multiple prices and keeps unrelated existing dishes unchanged", () => {
    const source = [
      "Torsk",
      "Dagens pris kr 225 eller kr 275",
      "Blandet iskrem / Mixed ice cream",
      "Kr 125",
    ].join("\n");
    const input = [dish("Torsk", 249, 1), dish("Blandet iskrem / Mixed ice cream", 125, 3)];
    expect(reconcileSourcePricedHtmlDishes(input, source)).toEqual(input);
    expect(HTML_SOURCE_PRICED_QA_VERSION).toBe("source-priced-v4");
  });
});
