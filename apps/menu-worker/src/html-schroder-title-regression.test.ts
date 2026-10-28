import { describe, expect, it } from "vitest";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { canonicalizeHtmlOutputItems } from "./html-output-canonicalizer.js";

// Representative first-party Norwegian menu fragments (Schrøder, October 2026).
// These assert semantic output only. Live source/price validation is a separate gate.
function observed(name: string, priceMinor: number): MenuObservedItem {
  return {
    name,
    normalizedName: normalizeDishName(name),
    sourceKey: createMenuItemSourceKey(name),
    description: null,
    sectionName: null,
    priceMinor,
    priceKind: "exact",
    currency: "NOK",
    position: 0,
    extractionMethod: "html_heuristic",
    confidence: 0.95,
    sourceExcerpt: `${name} — kr ${priceMinor / 100}`,
  };
}

describe("Norwegian menus with inline allergen and wine descriptions", () => {
  it("recovers only explicitly delimited real dish titles without changing prices", () => {
    const rows = [
      observed(
        "Hvaltartar Håndskåret hvaltartar med rå og røkt hval, neper, potet, rømme og løpstikke.ALL: laktose, sulfitt (Champagne, Riesling, Burgund.)",
        25500,
      ),
      observed(
        "Hellefisk Pannestekt hellefisk (villkveite) med rømmesjy, agurksalat,potetstappe med muskat ALL: fisk, laktose, sulfitt. (Mâcon. St Aubin.)",
        46700,
      ),
      observed(
        "Kjøttkaker i brun saus Schrøder, 1957. m/surkål, ertestuing, poteter, tyttebær. ALL: hvete, laktose, selleri, egg, sennep, sulfitt. (Rhône)",
        28700,
      ),
      observed(
        "Schrøder panne Minimum 2 pers. Bredt utvalg tradisjonsmat (kan variere). ALL: sulfitt. (Riesling. Burgund.)",
        59500,
      ),
      observed(
        "Steinsopp- og kantarellsuppe. Skogsopp fra Jessheim og Askim, fløte og sherry. ALL: laktose, sulfitt, gluten, selleri.",
        19500,
      ),
      observed("Flesk og duppe", 32500),
    ];

    const result = canonicalizeHtmlOutputItems(rows);
    expect(result.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Hvaltartar", 25500],
      ["Hellefisk", 46700],
      ["Kjøttkaker i brun saus", 28700],
      ["Schrøder panne", 59500],
      ["Steinsopp- og kantarellsuppe", 19500],
      ["Flesk og duppe", 32500],
    ]);
    expect(result[0]?.description).toContain("ALL: laktose");
    expect(result[2]?.sourceExcerpt).toContain("Schrøder, 1957");
    expect(result[3]?.confidence).toBeLessThan(0.95);
  });

  it("keeps a clearly delimited short dish title with an allergen-only suffix", () => {
    const rows = [
      observed("Karamellpudding med vanilje- og karamellsaus. ALL: laktose, egg", 18900),
      observed("Bøkling", 17800),
    ];
    expect(canonicalizeHtmlOutputItems(rows).map((item) => item.name)).toEqual([
      "Karamellpudding med vanilje- og karamellsaus",
      "Bøkling",
    ]);
  });

  it("repairs extracted titles even when the HTML parser truncated the ALL suffix", () => {
    const rows = [
      observed("Hvaltartar Håndskåret hvaltartar med rå og røkt hval", 25500),
      observed("Hellefisk Pannestekt hellefisk (villkveite) med rømmesjy", 46700),
      observed("Steinsopp- og kantarellsuppe. Skogsopp fra Jessheim", 19500),
      observed("Flesk og duppe", 32500),
    ];
    expect(canonicalizeHtmlOutputItems(rows).map((item) => [item.name, item.priceMinor])).toEqual([
      ["Hvaltartar", 25500],
      ["Hellefisk", 46700],
      ["Steinsopp- og kantarellsuppe", 19500],
      ["Flesk og duppe", 32500],
    ]);
  });

  it("recovers uniquely capitalized heading-to-description connectors without inventing prices", () => {
    const rows = [
      observed("Reinsdyrhjerte Med rødbete og solbær", 22500),
      observed("Brimsoll Fra Sogn. Brunostsaus", 17900),
      observed("Hummer med skrei og grønnsaker", 42500),
      observed("Ørret Fra Lofoten", 31500),
    ];
    expect(canonicalizeHtmlOutputItems(rows).map((item) => [item.name, item.priceMinor])).toEqual([
      ["Reinsdyrhjerte", 22500], ["Brimsoll", 17900],
      ["Hummer med skrei og grønnsaker", 42500], ["Ørret Fra Lofoten", 31500],
    ]);
  });

  it("fails closed when the menu has no safe title/description boundary", () => {
    const rows = [
      observed("Stikkelsbærgrøt Grønne stikkelsbær fra Hovelsrud, cognac og fløte. ALL: sulfitt, laktose", 18900),
      observed("Grynsodd", 17800),
    ];
    expect(canonicalizeHtmlOutputItems(rows).map((item) => item.name)).toEqual(["Grynsodd"]);
  });

  it("preserves normal priced dish titles, including long titles with ingredients", () => {
    const rows = [
      observed("Fjellørret med ertepuré, brokkolini, rømmesaus og kokte poteter", 49500),
      observed("Vegetarisk lasagne med spinat og ricotta", 25500),
    ];
    expect(canonicalizeHtmlOutputItems(rows).map((item) => item.name)).toEqual(rows.map((row) => row.name));
  });
});
