import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { describe, expect, it } from "vitest";
import {
  canonicalizeHtmlOutputItems,
  HTML_OUTPUT_CANONICALIZER_VERSION,
} from "./html-output-canonicalizer.js";

function item(
  name: string,
  priceMinor: number,
  sectionName: string | null = null,
  sourceExcerpt = `${name} — ${priceMinor / 100}`,
): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name, sectionName),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName,
    priceMinor,
    currency: "NOK",
    position: 0,
    extractionMethod: "html_heuristic",
    confidence: 0.95,
    sourceExcerpt,
  };
}

describe("structural HTML output canonicalization", () => {
  it("drops a repeated promotional label that mirrors distinct priced parent dishes", () => {
    expect(HTML_OUTPUT_CANONICALIZER_VERSION).toBe("output-canonical-v10");
    const items = [
      item("Spicy Popcorn", 6500),
      item("Tortilla Chips", 10900),
      item("Marinated Olives", 5900),
      item("Taste Everything", 6500, "Spicy Popcorn"),
      item("Taste Everything", 10900, "Tortilla Chips"),
      item("Taste Everything", 5900, "Marinated Olives"),
    ];

    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "Spicy Popcorn",
      "Tortilla Chips",
      "Marinated Olives",
    ]);
  });

  it("preserves a repeated real dish when section prices do not mirror parent dish cards", () => {
    const items = [
      item("House Curry", 22900, "Lunch"),
      item("House Curry", 26900, "Dinner"),
      item("House Curry", 28900, "Sharing"),
      item("Lunch", 19900),
      item("Dinner", 19900),
      item("Sharing", 19900),
    ];
    expect(canonicalizeHtmlOutputItems(items)).toHaveLength(items.length);
  });

  it("drops a same-price numeric-prefix suffix fragment but preserves the full dish", () => {
    const items = [
      item("GRAM HAMBURGER", 13900, null, "90 GRAM HAMBURGER — 139"),
      item("90 GRAM HAMBURGER", 13900),
      item("Chicken Burger", 14900),
    ];
    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "90 GRAM HAMBURGER",
      "Chicken Burger",
    ]);
  });

  it("drops only the add-on-scoped copy of an otherwise identical dish", () => {
    const items = [
      item("Classic Caesar", 21900, "SALADS"),
      item("Classic Caesar", 21900, "Add chicken +50"),
      item("Herb Salad", 21900, "SALADS"),
      item("Herb Salad", 21900, "With chicken 269,-"),
    ];
    expect(
      canonicalizeHtmlOutputItems(items).map((entry) => [entry.name, entry.sectionName]),
    ).toEqual([
      ["Classic Caesar", "SALADS"],
      ["Herb Salad", "SALADS"],
    ]);
  });

  it("preserves a canonical suffix when the numeric prefix is a menu index", () => {
    const items = [
      item("KEBAB PIZZA", 29900, null, "65. KEBAB PIZZA — 299"),
      item("65. KEBAB PIZZA", 29900),
    ];
    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "KEBAB PIZZA",
      "65. KEBAB PIZZA",
    ]);
  });
  it("drops generic priced section, upgrade and short allergen labels", () => {
    const items = [
      item("DUMPLINGS", 19500),
      item("PROTEINS", 24500),
      item("Upgrades & Extras", 7500),
      item("SN", 8900),
      item("SY", 4900),
      item("Chicken Gyoza", 19500),
      item("The Godfather", 26900),
    ];
    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "Chicken Gyoza",
      "The Godfather",
    ]);
  });

  it("drops a short title whose numeric suffix was misread as its price", () => {
    const items = [
      item("Chicken", 6500),
      item("Chicken 65", 15500),
      item("Rice", 6500),
    ];
    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "Chicken 65",
      "Rice",
    ]);
  });


  it("drops menu-package, pairing, supplement and multi-price display labels", () => {
    const items = [
      item("2-course", 49500),
      item("Supplement:", 35500),
      item("Wine pairing NOK", 85000),
      item("Wine Pairing", 149500),
      item("98 piece / 495 1⁄2 dozen", 39500),
      item("Mussels", 39500),
      item("Catch of the Day", 52500),
    ];
    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "Mussels",
      "Catch of the Day",
    ]);
  });


  it("drops only high-priced component-quantity labels while preserving a plausibly priced dish", () => {
    const items = [
      item("2 Types of oysters", 299500),
      item("2 Types of oysters", 49500, "Shellfish Bar"),
      item("I Deserved It Fish & Shellfish Plateau", 299500),
    ];
    expect(
      canonicalizeHtmlOutputItems(items).map((entry) => [entry.name, entry.priceMinor]),
    ).toEqual([
      ["2 Types of oysters", 49500],
      ["I Deserved It Fish & Shellfish Plateau", 299500],
    ]);
  });


  it("drops a same-price description fragment when a stronger card excerpt contains it verbatim", () => {
    const items = [
      item(
        "Entrecote",
        54500,
        null,
        "Entrecote — Grilla selleri, sellerirot, syltet rødløk — estragonsaus — 545",
      ),
      item("estragonsaus", 54500),
      item("Svinenakke", 47500, null, "Svinenakke — Mais, nepe, tomat — Sjalottløk- timian saus — 475"),
      item("Sjalottløk- timian saus", 47500),
    ];
    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "Entrecote",
      "Svinenakke",
    ]);
  });

  it("preserves canonical same-price dishes when neighboring card excerpts merely mention them", () => {
    const items = [
      item("Diavola", 25900),
      item("Chef Special", 25900, null, "Chef Special — Diavola — 259"),
      item("NO 7 Spicy Cumin Lamb", 20900),
      item(
        "Homemade Noodles",
        20900,
        null,
        "Homemade Noodles — NO 7 Spicy Cumin Lamb — 209",
      ),
      item("DAMPET HAVABBOR 特 色 蒸 海 鱼", 39800),
      item(
        "Signatur Klassisk",
        39800,
        null,
        "Signatur Klassisk — DAMPET HAVABBOR 特 色 蒸 海 鱼 — 398",
      ),
    ];

    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "Diavola",
      "Chef Special",
      "NO 7 Spicy Cumin Lamb",
      "Homemade Noodles",
      "DAMPET HAVABBOR 特 色 蒸 海 鱼",
      "Signatur Klassisk",
    ]);
  });

  it("drops temporary closure notices that were misread as priced first cards", () => {
    const items = [
      item(
        "Statholderens Mat og Vinkjeller holder sommerlukket fra 12.07-04.08.2026",
        28500,
      ),
      item("Krabbesalat", 28500),
    ];
    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "Krabbesalat",
    ]);
  });

  it("drops bilingual course-package labels and inherited extreme duplicate prices", () => {
    const items = [
      item("3-retters meny // 3 course menu", 89500),
      item("3-retters meny // 3 course menu kr", 89500),
      item("4-retters meny // 4 course menu", 99500),
      item("5-retters meny // 5 course menu kr", 109500),
      item("Tilslørte bondepiker", 14500),
      item("Tilslørte bondepiker", 72500),
      item("BEEF TARTARE", 27500),
    ];
    expect(canonicalizeHtmlOutputItems(items).map((entry) => [entry.name, entry.priceMinor])).toEqual([
      ["Tilslørte bondepiker", 14500],
      ["BEEF TARTARE", 27500],
    ]);
  });

  it("preserves uppercase dish titles with parenthetical allergen metadata", () => {
    const items = [
      item("VEGETABLE SAMOSA (GLUTEN)", 11900),
      item("GULAB JAMUN (GLUTEN)", 12900),
      item("NO 5 Sweet potato noodles (Vegan/gluten free)", 18900),
      item("trufle and porcini (wheat, milk, egg, sulfite)", 21000),
      item("60G", 45900),
      item("120G", 92000),
    ];

    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "VEGETABLE SAMOSA (GLUTEN)",
      "GULAB JAMUN (GLUTEN)",
      "NO 5 Sweet potato noodles (Vegan/gluten free)",
    ]);
  });

  it("drops generic display metadata and lowercase same-price component fragments", () => {
    const items = [
      item("Grillet kveite", 49500),
      item("røkt persillemajones", 49500),
      item("Festningsburger", 26900),
      item("BEEF TARTARE", 27500),
      item("CHEESECAKE", 18500),
      item("PETITS FOURS", 8500),
      item("toast", 26900),
      item("KALDE FORRETTER", 26900),
      item("Sideretter", 9500),
      item("For hele bordet", 9500),
      item("30 gr.", 26900),
      item("Large", 19500),
      item("Gjelder fra 19. august", 19500),
      item("Copyright © Frognerseteren", 202500),
      item("Holmenkollveien", 202500),
      item("Delefat for 2 eller 4 personar 295/", 29500),
      item("3 stk 195 kr / 6 stk", 19500),
      item("Gewürztraminer Vendage Tardive 2015, Hugel", 14900),
      item("Gewürstraminer Vendage Tardive 2015, Hugel", 14900),
      item("gr", 65000),
      item("syltet delikatesseløk og hasselbackpotet", 45500),
      item("trufle and porcini (wheat, milk, egg, sulfite)", 21000),
      item("forest berries and milk icecream (milk, egg)", 18500),
    ];
    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "Grillet kveite",
      "Festningsburger",
      "BEEF TARTARE",
      "CHEESECAKE",
      "PETITS FOURS",
    ]);
  });

});
