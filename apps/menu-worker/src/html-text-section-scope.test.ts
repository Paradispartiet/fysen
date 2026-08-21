import { describe, expect, it } from "vitest";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import {
  filterPlainTextBeverageSectionItems,
  HTML_TEXT_SECTION_SCOPE_VERSION,
} from "./html-text-section-scope.js";

function item(name: string, position: number, priceMinor = 10000): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor,
    currency: "NOK",
    position,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt: name,
  };
}

describe("plain-text HTML section scoping", () => {
  it("filters items that occur only inside a plain beverage section and resumes at later food", () => {
    const items = [
      item("Falafel", 1),
      item("House Soda", 2),
      item("Ayran", 3),
      item("Baklava", 4),
    ];
    const visibleText = `
      Forretter
      Drikke
      Forretter
      Falafel
      99 NOK
      Drikke
      House Soda
      55 NOK
      Ayran
      55 NOK
      Dessert
      Baklava
      119 NOK
    `;

    expect(HTML_TEXT_SECTION_SCOPE_VERSION).toBe("text-section-scope-v4");
    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual(["Falafel", "Baklava"]);
  });

  it("restores burger food state after an opening drinks block and stops again at mineral water", () => {
    const items = [
      item("Frydenlund Pilsner", 1, 11900),
      item("THE CLASSIC", 2, 19900),
      item("CHEDDAR & BACON", 3, 24900),
      item("Thomas Henry Ginger Ale", 4, 4900),
      item("Farris", 5, 5900),
    ];
    const visibleText = `
      DRAUGHT BEER
      Frydenlund Pilsner
      119 NOK
      BURGERS
      THE CLASSIC
      199 NOK
      CHEDDAR & BACON
      249 NOK
      MINERAL WATER
      Thomas Henry Ginger Ale
      49 NOK
      Farris
      59 NOK
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual(["THE CLASSIC", "CHEDDAR & BACON"]);
  });

  it("ignores unknown duplicate DOM text when the canonical occurrence is inside a beverage section", () => {
    const items = [item("Falafel", 1), item("House Soda", 2), item("Ayran", 3)];
    const visibleText = `
      House Soda
      Ayran
      Forretter
      Falafel
      99 NOK
      Drikke
      House Soda
      55 NOK
      Ayran
      55 NOK
      Restaurant information
      House Soda
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual(["Falafel"]);
  });

  it("preserves an item when the same title also occurs in a food section", () => {
    const items = [item("House Special", 1)];
    const visibleText = `
      Hovedretter
      House Special
      249 NOK
      Drikke
      House Special
      79 NOK
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual(["House Special"]);
  });

  it("filters bilingual beverage tails and allergen-normalized beverage item names", () => {
    const items = [
      item("BUTTER CHICKEN", 1),
      item("NANBRØD/ NANBREAD", 2),
      item("GARLIC NAN", 3),
      item("KAFFE / COFFEE", 4),
      item("CUPPUCINO", 5),
      item("FAT ØL / TAP BEER", 6),
      item("HOUSE LAGER", 7),
      item("Hvitvin / White wine", 8),
      item("Paxis Arinto", 9),
    ];
    const visibleText = `
      KJØTT CURRIES/ NON-VEG CURRIES
      BUTTER CHICKEN
      285 NOK
      NANBRØD/ NANBREAD
      GARLIC NAN
      69 NOK
      KAFFE / COFFEE
      CUPPUCINO (M)
      55 NOK
      FAT ØL / TAP BEER
      HOUSE LAGER
      118 NOK
      Hvitvin / White wine
      Paxis Arinto
      99 NOK
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual(["BUTTER CHICKEN", "GARLIC NAN"]);
  });

  it("removes safe parser and menu metadata artifacts without broad description heuristics", () => {
    const items = [
      item("__FYSEN_ADJACENT_HEADING_LEVEL_5__ 59", 1, 5900),
      item("(E, N, M)", 2),
      item("(p,s)", 3),
      item("Ring oss på 476 52", 4),
      item("1199,- per person", 5),
      item("2 Per ________", 6),
      item("/Gluten fri", 7),
      item("kuler", 8),
      item("ALL DISHES ARE SERVED WITH RICE", 9),
      item("(CAN BE MADE VEGAN)", 10),
      item("Mango Sorbet 119,-", 11, 11900),
      item("CRISPY CHICKEN TENDERS - 179", 12, 17900),
      item("Linser (rod eller gul)___________", 13, 26900),
      item("Fromage Pizza 109", 14, 20500),
      item("American chocolate cake with walnuts, served with vanilla ice cream", 15, 16900),
    ];

    expect(
      filterPlainTextBeverageSectionItems(items, "No beverage boundary").map(
        (entry) => entry.name,
      ),
    ).toEqual([
      "Mango Sorbet",
      "CRISPY CHICKEN TENDERS",
      "Linser (rod eller gul)",
      "Fromage Pizza 109",
      "American chocolate cake with walnuts, served with vanilla ice cream",
    ]);
  });

  it("does nothing to ordinary food items when no plain beverage boundary is present", () => {
    const items = [item("Falafel", 1), item("Baklava", 2)];
    expect(
      filterPlainTextBeverageSectionItems(
        items,
        "Forretter\nFalafel\nDessert\nBaklava",
      ),
    ).toEqual(items);
  });
});
