import { describe, expect, it } from "vitest";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import {
  filterHtmlBeverageSectionItemsWithScopedProvenance,
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

    expect(HTML_TEXT_SECTION_SCOPE_VERSION).toBe("text-section-scope-v14");
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


  it("resumes food scope at common French restaurant section headings after beverage navigation", () => {
    const items = [
      item("House Bordeaux", 1, 16500),
      item("Gratinert løksuppe Tradition", 2, 19500),
      item("Spinatgalette med rødbettartar og chèvre", 3, 45500),
      item("Entrecôte med pommes frites", 4, 49500),
      item("Crème Brûlée Maison", 5, 24500),
      item("Dampede blåskjell fra Trøndelag", 6, 26000),
    ];
    const visibleText = `
      WINE LIST
      House Bordeaux
      165
      ENTRÉES ET PLATS POUR UNE PETITE FAIM
      Gratinert løksuppe Tradition
      195
      PLAT VÉGÉTARIEN
      Spinatgalette med rødbettartar og chèvre
      455
      PLATS PRINCIPAUX
      Entrecôte med pommes frites
      495
      FROMAGES ET DESSERTS
      Crème Brûlée Maison
      245
      COQUILLAGES ET CRUSTACÉS
      Dampede blåskjell fra Trøndelag
      260
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual([
      "Gratinert løksuppe Tradition",
      "Spinatgalette med rødbettartar og chèvre",
      "Entrecôte med pommes frites",
      "Crème Brûlée Maison",
      "Dampede blåskjell fra Trøndelag",
    ]);
  });

  it("treats multilingual food headings as food scope after beverage navigation", () => {
    const items = [
      item(
        "Kalvesnitzel med erter, potetpure og brunet smør",
        4,
        46500,
      ),
      item(
        "Confit duck leg, Savoy cabbage, peas, baby potatoes, honey jus",
        8,
        46500,
      ),
    ];
    const visibleText = `
      Vin
      House Bordeaux 165
      Hovedretter / Plats Principaux / Main Courses
      Kalvesnitzel med erter, potetpure og brunet smør 465,-
      CONFITERT ANDELÅR med SAVOYKÅL, ERTER, SMÅPOTETER OG HONNINGSJY 465,-
      Wiener Schnitzel, peas, potato purée and beurre noisette 465,-
      Confit duck leg, Savoy cabbage, peas, baby potatoes, honey jus 465,-
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual([
      "Kalvesnitzel med erter, potetpure og brunet smør",
    ]);
  });

  it("rejects a conflicting embedded title price only inside a repeated translated block", () => {
    const items = [
      item(
        "Kalvesnitzel med erter, potetpure og brunet smør 465,-",
        1,
        49500,
      ),
      item(
        "Grillet Entrecôte med syltet løk, pommes frites og saus Béarnaise",
        2,
        49500,
      ),
    ];
    const visibleText = `
      Hovedretter / Plats Principaux / Main Courses
      Kalvesnitzel med erter, potetpure og brunet smør 465,-
      Grillet Entrecôte med syltet løk, pommes frites og saus Béarnaise 495,-
      Wiener Schnitzel, peas, potato purée and beurre noisette 465,-
      Grilled entrecôte, pickled onions, fries and Béarnaise 495,-
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => [entry.name, entry.priceMinor],
      ),
    ).toEqual([
      [
        "Grillet Entrecôte med syltet løk, pommes frites og saus Béarnaise",
        49500,
      ],
    ]);
  });


  it("collapses interleaved bilingual dish cards and removes standalone allergen text from the repeated title", () => {
    const items = [
      item("SPEKEMAT", 1, 15000),
      item("CURED MEAT", 2, 15000),
      item("BEEF TARTARE", 3, 27500),
      item("TRUFFLE AND MUSHROOM RISOTTO (milk, sulfitte)", 4, 29500),
      item("CHEESECAKE", 5, 18500),
      item("PETITS FOURS", 6, 8500),
    ];
    const visibleText = `
      SNACKS
      ARANCINI
      ARANCINI
      trøffel og steinsopp (hvete, melk, egg, sulfitt)
      ARANCINI
      trufle and porcini (wheat, milk, egg, sulfite)
      Kr 210,-
      SPEKEMAT
      CURED MEAT
      Kr 150,-
      FORRETTER // STARTERS
      BEEF TARTARE
      BIFF TARTAR
      soppmajones, jordskokk og syltet kantareller (bygg, sulfitt, egg)
      BEEF TARTARE
      mushroom mayonnaise, Jerusalem artichoke and pickled chantarells (barley, sulfitte, eggs)
      Kr 275,-
      TRUFFLE AND MUSHROOM RISOTTO
      TRØFFEL- OG SKOGSOPPRISOTTO
      (melk, sulfitt)
      TRUFFLE AND MUSHROOM RISOTTO
      (milk, sulfitte)
      Kr 295,-
      DESSERT OG OST // DESSERT & CHEESE
      CHEESECAKE
      OSTEKAKE
      skogsbær og melkeis (melk, egg)
      CHEESECAKE
      forest berries and milk icecream (milk, egg)
      Kr 185,-
      PETITS FOURS
      85,-
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => [entry.name, entry.priceMinor],
      ),
    ).toEqual([
      ["SPEKEMAT", 15000],
      ["BEEF TARTARE", 27500],
      ["TRUFFLE AND MUSHROOM RISOTTO", 29500],
      ["CHEESECAKE", 18500],
      ["PETITS FOURS", 8500],
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

  it("does not strip parenthetical words as allergen codes", () => {
    const items = [item("House Special", 1, 24900)];
    const visibleText = `
      Chef Selection
      House Special
      249
      Drikke
      House Special (VEGAN)
      79
    `;

    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual(["House Special"]);
  });

  it("uses full-page drink evidence for scoped items when they are beverage-only", () => {
    const items = [
      item("House Special", 1, 24900),
      item("House Soda", 2, 5500),
    ];
    const scopedVisibleText = `
      Vin
      House Special (M, E, HV, F)
      249
    `;
    const fullVisibleText = `
      Vin
      House Special (M, E, HV, F)
      249
      Drikke
      House Special
      79
      House Soda (M)
      55
    `;

    expect(
      filterHtmlBeverageSectionItemsWithScopedProvenance(
        items,
        scopedVisibleText,
        fullVisibleText,
      ).map((entry) => entry.name),
    ).toEqual([]);
  });

  it("resets beverage navigation at small-dishes and classics sections", () => {
    const items = [
      item("Triple Chili Cheese", 1, 13500),
      item("Original Ribs", 2, 36900),
      item("The Godfather", 3, 26900),
    ];
    const visibleText = `
      Milkshakes
      Beverage Menu
      Small Dishes & Sharing Plates
      Triple Chili Cheese
      135
      Classics
      Original Ribs
      369
      Burgers
      The Godfather
      269
    `;
    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map((entry) => entry.name),
    ).toEqual(["Triple Chili Cheese", "Original Ribs", "The Godfather"]);
  });
});
