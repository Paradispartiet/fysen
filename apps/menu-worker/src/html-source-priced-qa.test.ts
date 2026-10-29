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

  it("links both size-priced steak options to their documented Biff med løk parent", () => {
    const source = [
      "HOVEDRETTER",
      "Biff med løk",
      "«Schrøders biff er viden kjent.» Dagbladet 1969.",
      "m/løkkompott, sprø poteter og salat. ALL: sulfitt, laktose.",
      "Indrefilet 150 g kr 415",
      "Indrefilet 220 g kr 585",
      "Gulsaus (Béarnaise) kr 78",
    ].join("\n");
    const result = reconcileSourcePricedHtmlDishes([
      dish("Indrefilet 150 g", 415, 4),
      dish("Indrefilet 220 g", 585, 5),
    ], source);
    expect(result.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Biff med løk (indrefilet 150 g)", 41500],
      ["Biff med løk (indrefilet 220 g)", 58500],
    ]);
    expect(result.every((item) => item.description?.includes("Biff med løk"))).toBe(true);
    expect(result.every((item) => item.sourceExcerpt?.includes("Biff med løk"))).toBe(true);
  });

  it("recovers steak parent when heading text and priced choices collapse into one HTML text block", () => {
    const source = [
      "HOVEDRETTER",
      "Biff med løk «Schrøders biff er viden kjent.» Dagbladet, 1969. m/løkkompott.",
      "ALL: sulfitt, laktose, selleri. (Bordeaux)",
      "Indrefilet 150 g kr 415 Indrefilet 220 g kr 585 Gulsaus (Béarnaise) kr 78",
      "DESSERT",
    ].join("\n");
    const result = reconcileSourcePricedHtmlDishes([
      dish("Indrefilet 150 g", 415, 3),
      dish("Indrefilet 220 g", 585, 4),
    ], source);
    expect(result.map((item) => item.name)).toEqual([
      "Biff med løk (indrefilet 150 g)",
      "Biff med løk (indrefilet 220 g)",
    ]);
  });

  it("corrects source-confirmed price and never invents an unsupported parent heading", () => {
    const source = [
      "Biff med løk",
      "Indrefilet 150 g kr 415",
      "Indrefilet 220 g kr 585",
    ].join("\n");
    // The wrong extracted price is corrected from the exact first-party
    // size-price line; the parent is then safe to restore.
    expect(reconcileSourcePricedHtmlDishes([dish("Indrefilet 150 g", 499, 1)], source)
      .map((item) => [item.name, item.priceMinor]))
      .toEqual([["Biff med løk (indrefilet 150 g)", 41500]]);
    expect(reconcileSourcePricedHtmlDishes([dish("Indrefilet 150 g", 415, 1)],
      "Indrefilet 150 g kr 415").map((item) => item.name))
      .toEqual(["Indrefilet 150 g"]);
  });

  it("does not classify a 2 cl port-wine and brunost pairing as a pure food dish", () => {
    const source = [
      "DESSERT",
      "Brimsoll Fra Sogn. Brunostsaus. ALL: laktose kr 179",
      "Efter maten – kombinasjon Et stykke av den beste brunosten, og et lite glass (2 cl) portvin fra 1974. ALL: laktose kr 205",
      "Stiftgårdskake Fra Trøndelag. ALL: laktose kr 195",
    ].join("\n");
    const rows = [
      dish("Brimsoll", 179, 1),
      dish("Efter maten – kombinasjon", 205, 2),
      dish("Stiftgårdskake", 195, 3),
    ];
    expect(reconcileSourcePricedHtmlDishes(rows, source).map((item) => item.name))
      .toEqual(["Brimsoll", "Stiftgårdskake"]);
    // Wine pairing suggestions are not the same as wine being sold in a dish.
    const recommendationOnly = source.replace(
      "et lite glass (2 cl) portvin fra 1974",
      "anbefalt med portvin",
    );
    expect(reconcileSourcePricedHtmlDishes(rows, recommendationOnly).map((item) => item.name))
      .toEqual(["Brimsoll", "Efter maten – kombinasjon", "Stiftgårdskake"]);
  });

  it("excludes a wine-containing pairing even when the source splits heading and description", () => {
    const source = [
      "Dessert",
      "Efter maten – kombinasjon",
      "Et stykke av den beste brunosten fra Stordalen,",
      "og et lite glass (2 cl) veldig god portvin fra 1974.",
      "ALL: laktose kr 205",
      "Åpningstider",
    ].join("\n");
    const result = reconcileSourcePricedHtmlDishes([
      dish("Efter maten – kombinasjon", 205, 2),
      dish("Kvæfjordkake", 189, 4),
    ], source);
    expect(result.map((item) => item.name)).toEqual(["Kvæfjordkake"]);
  });

  it("preserves directly priced sauce in a dedicated first-party sauce section", () => {
    const source = [
      "Sideretter",
      "Pommes frites",
      "(Inneholder: Sulfitter)",
      "80 kr",
      "Saus",
      "Bristols Béarnaisesaus",
      "(Inneholder: Egg, melk, sulfitter)",
      "65 kr",
      "Peppersaus",
      "(Inneholder: Hvete, fisk, melk)",
      "69 kr",
      "Bordelaise-saus",
      "(Inneholder: Sulfitter)",
      "69 kr",
      "Klassiske viner",
    ].join("\\n");
    const out = reconcileSourcePricedHtmlDishes([
      dish("Bordelaise-saus", 69, 11),
      dish("Peppersaus", 69, 8),
      dish("Pommes frites", 80, 1),
    ], source);
    expect(out.map((row) => [row.name, row.priceMinor])).toEqual([
      ["Pommes frites", 8000],
      ["Peppersaus", 6900],
      ["Bordelaise-saus", 6900],
    ]);
  });

  it("still rejects unpriced sauce add-ons, missing prices, and sauces outside their section", () => {
    const items = [dish("Bordelaise-saus", 69, 2)];
    expect(reconcileSourcePricedHtmlDishes(items, [
      "Hovedretter", "Bordelaise-saus", "69 kr",
    ].join("\\n"))).toEqual([]);
    expect(reconcileSourcePricedHtmlDishes(items, [
      "Saus", "Bordelaise-saus", "uten egen pris", "Klassiske viner",
    ].join("\\n"))).toEqual([]);
    expect(reconcileSourcePricedHtmlDishes(items, [
      "Saus", "Bordelaise-saus", "79 kr",
    ].join("\\n"))).toEqual([]);
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
    expect(HTML_SOURCE_PRICED_QA_VERSION).toBe("source-priced-v6");
  });
});
