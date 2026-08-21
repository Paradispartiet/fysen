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

function item(
  name: string,
  position: number,
  priceMinor = 10000,
): MenuObservedItem {
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

    expect(HTML_TEXT_SECTION_SCOPE_VERSION).toBe("text-section-scope-v6");
    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual(["Falafel", "Baklava"]);
  });

  it("scopes a beverage-first menu before the first price and resumes at burgers", () => {
    const items = [
      item("Brooklyn Lager", 1, 13900),
      item("Paloma", 2, 16900),
      item("The Classic", 3, 19900),
      item("Brownie", 4, 16900),
    ];
    const visibleText = `
      DRAUGHT BEER
      BROOKLYN LAGER
      139
      APERITIF
      PALOMA
      169
      BURGERS
      THE CLASSIC
      199
      DESSERTS
      BROWNIE
      169
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual(["The Classic", "Brownie"]);
  });

  it("resets an early drinks navigation state when an actual Food section starts", () => {
    const items = [
      item("Pollo", 1, 24900),
      item("Margherita", 2, 21900),
      item("Oche Burger & Fries", 3, 27900),
      item("House Lager", 4, 11900),
    ];
    const visibleText = `
      Food
      ØL & CIDER
      VIN & MUSSERENDE
      Cocktails
      ALKOHOLFRITT
      Food
      Stonebaked White Pizza
      Pollo 249
      Stonebaked Red Pizza
      Margherita 219
      Big Tactics Main Courses
      Oche Burger & Fries 279
      Cocktails
      House Lager 119
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual(["Pollo", "Margherita", "Oche Burger & Fries"]);
  });

  it("resets navigation Drikke when a specific food category starts", () => {
    const items = [
      item("Kylling Tikka Masala", 1, 20900),
      item("Lahori Lam Karahi Fresh", 2, 20900),
      item("Chapli Kebab", 3, 19400),
      item("Saag Paneer", 4, 16900),
      item("Mix Grill", 5, 37900),
      item("Coca-Cola", 6, 4000),
    ];
    const visibleText = `
      Kylling
      Lam
      Kebab
      Vegetar
      Spesial
      Nan
      Drikke
      Kylling
      Kylling Tikka Masala
      209 NOK
      Lam
      Lahori Lam Karahi Fresh
      209 NOK
      Kebab
      Chapli Kebab
      194 NOK
      Vegetar
      Saag Paneer
      169 NOK
      Spesial
      Mix Grill
      379 NOK
      Drikke
      Coca-Cola
      40 NOK
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual([
      "Kylling Tikka Masala",
      "Lahori Lam Karahi Fresh",
      "Chapli Kebab",
      "Saag Paneer",
      "Mix Grill",
    ]);
  });

  it("recognizes bilingual tap and bottled beer headings", () => {
    const items = [
      item("Butter Chicken", 1, 28500),
      item("House Lager", 2, 11800),
      item("Bottle Lager", 3, 10500),
    ];
    const visibleText = `
      HOVEDRETTER
      Butter Chicken
      285
      FAT ØL / TAP BEER
      House Lager
      118
      FLASKE ØL / BOTTLE BEER
      Bottle Lager
      105
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual(["Butter Chicken"]);
  });

  it("filters beverage sections when item and price share one text line", () => {
    const items = [
      item("Brownie", 1, 16900),
      item("SOFT DRINKS", 2, 5900),
      item("Thomas Henry Ginger Ale", 3, 4900),
      item("VEGANSK MILKSHAKE", 4, 11900),
      item("Freshly ground coffee", 5, 4500),
    ];
    const visibleText = `
      DESSERTS
      Brownie 169
      SOFT DRINKS
      Thomas Henry Ginger Ale 49
      MILKSHAKES
      VEGANSK MILKSHAKE 119
      COFFEE AND TEA
      Freshly ground coffee 45
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual(["Brownie"]);
  });

  it("recognizes coffee, beer and wine families as beverage sections", () => {
    const items = [
      item("Kulfi", 1, 12900),
      item("Cuppucino", 2, 5500),
      item("King Chakra", 3, 16500),
      item("Paxis Arinto", 4, 9900),
    ];
    const visibleText = `
      DESSERT
      Kulfi
      129
      KAFFE / COFFEE
      Cuppucino
      55
      ØL / BEER
      King Chakra
      165
      Hvitvin / White wine
      Paxis Arinto
      99
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual(["Kulfi"]);
  });

  it("removes conservative output metadata and description fragments even without a beverage section", () => {
    const items = [
      item("(p,s)", 1),
      item("(E, N, M)", 2),
      item("2 Per ________", 3, 63900),
      item("Ring oss på 476 52 724", 4, 72400),
      item("1199,- per person", 5, 119900),
      item("FORRETTER/APETIZERS", 6, 12900),
      item("Pieces of chicken, lamb and scampi", 7, 28900),
      item("(CAN BE MADE VEGAN)", 8, 26900),
      item("/Gluten fri", 9, 260000),
      item("American chocolate cake with walnuts, served with vanilla ice cream", 10, 16900),
      item("Butter Chicken", 11, 28900),
      item("Fish N Chips", 12, 24900),
    ];

    expect(
      filterPlainTextBeverageSectionItems(items, "HOVEDRETTER\nButter Chicken\nFish N Chips").map(
        (entry) => entry.name,
      ),
    ).toEqual(["Butter Chicken", "Fish N Chips"]);
  });

  it("cleans layout leaders, dangling dashes and mirrored trailing prices without changing legitimate dash numbers", () => {
    const items = [
      item("Linser (rød eller gul)___________", 1, 26900),
      item("Crispy Chicken Tenders - 179", 2, 17900),
      item("Mango Sorbet 119,-", 3, 12900),
      item("CLASSIC CAESAR-", 4, 21900),
      item("Table 42 - 7", 5, 700),
    ];

    expect(
      filterPlainTextBeverageSectionItems(items, "HOVEDRETTER").map(
        (entry) => entry.name,
      ),
    ).toEqual([
      "Linser (rød eller gul)",
      "Crispy Chicken Tenders",
      "Mango Sorbet",
      "CLASSIC CAESAR",
      "Table 42 - 7",
    ]);
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

  it("still applies output cleanup when no plain beverage boundary is present", () => {
    const items = [item("Falafel", 1), item("(su)", 2), item("Baklava", 3)];
    expect(
      filterPlainTextBeverageSectionItems(
        items,
        "Forretter\nFalafel\nDessert\nBaklava",
      ).map((entry) => entry.name),
    ).toEqual(["Falafel", "Baklava"]);
  });
});
