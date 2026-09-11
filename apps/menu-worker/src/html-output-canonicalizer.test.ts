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
  position = 0,
): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name, sectionName),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName,
    priceMinor,
    currency: "NOK",
    position,
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

  it("does not let a description-like one-way candidate delete a named dish title", () => {
    const items = [
      item(
        "Vietnamesisk Baguette (Bánh mì)",
        16900,
        null,
        "Vietnamesisk Baguette (Bánh mì) — 169",
      ),
      item(
        "2 stk. Svinekjøtt med scampi, salat og agurk.",
        16900,
        null,
        "2 stk. Svinekjøtt med scampi, salat og agurk. — Vietnamesisk Baguette (Bánh mì) — 169",
      ),
    ];

    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "Vietnamesisk Baguette (Bánh mì)",
      "2 stk. Svinekjøtt med scampi, salat og agurk.",
    ]);
  });

  it("uses source order to keep the leading dish title in reciprocal same-price pairs", () => {
    const items = [
      item(
        "Diavola",
        25900,
        null,
        "Diavola — Rykende fersk italiensk pizza fra steinovnen — 259",
        10,
      ),
      item(
        "Rykende fersk italiensk pizza fra steinovnen",
        25900,
        null,
        "Rykende fersk italiensk pizza fra steinovnen — Diavola — 259",
        11,
      ),
      item(
        "Hommus",
        9800,
        null,
        "Hommus — Moste kikerter med sesam, hvitløk og olivenolje — 98",
        20,
      ),
      item(
        "Moste kikerter med sesam, hvitløk og olivenolje",
        9800,
        null,
        "Moste kikerter med sesam, hvitløk og olivenolje — Hommus — 98",
        21,
      ),
    ];

    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "Diavola",
      "Hommus",
    ]);
  });

  it("preserves reciprocal evidence when source order does not prove a leading title", () => {
    const items = [
      item(
        "Description first",
        19900,
        null,
        "Description first — Real Dish — 199",
        10,
      ),
      item(
        "Real Dish",
        19900,
        null,
        "Real Dish — Description first — 199",
        10,
      ),
    ];

    expect(canonicalizeHtmlOutputItems(items)).toHaveLength(2);
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

  it("allows short and all-caps preparation-led dishes to remove same-price fragments", () => {
    const items = [
      item(
        "Bakt Røye",
        53500,
        null,
        "Bakt Røye — Pepperrot- sennep beurre blanc — 535",
        10,
      ),
      item(
        "Pepperrot- sennep beurre blanc",
        53500,
        null,
        "Pepperrot- sennep beurre blanc — Bakt Røye — 535",
        11,
      ),
      item(
        "DAMPET HAVABBOR 特 色 蒸 海 鱼",
        39800,
        null,
        "DAMPET HAVABBOR 特 色 蒸 海 鱼 — Signatur Klassisk — 398",
        20,
      ),
      item(
        "Signatur Klassisk",
        39800,
        null,
        "Signatur Klassisk — DAMPET HAVABBOR 特 色 蒸 海 鱼 — 398",
        21,
      ),
    ];

    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "Bakt Røye",
      "DAMPET HAVABBOR 特 色 蒸 海 鱼",
    ]);
  });


  it("keeps strong all-caps preferred titles over same-price labels", () => {
    const items = [
      item(
        "DAMPET HAVABBOR 特 色 蒸 海 鱼",
        39800,
        null,
        "DAMPET HAVABBOR 特 色 蒸 海 鱼 — 398",
        20,
      ),
      item(
        "Signatur Klassisk",
        39800,
        null,
        "Signatur Klassisk — DAMPET HAVABBOR 特 色 蒸 海 鱼 — 398",
        19,
      ),
    ];

    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toContain(
      "DAMPET HAVABBOR 特 色 蒸 海 鱼",
    );
  });

  it("drops a lower-case same-price prose fragment after a named dish", () => {
    const items = [
      item(
        "Josper Grilled Langoustines",
        39500,
        null,
        "Josper Grilled Langoustines — lemon and ginger butter, wine and cream — 395",
        30,
      ),
      item(
        "lemon and ginger butter, wine and cream",
        39500,
        null,
        "lemon and ginger butter, wine and cream — 395",
        31,
      ),
    ];

    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "Josper Grilled Langoustines",
    ]);
  });


  it("drops a short lower-case component only with explicit same-price excerpt evidence", () => {
    const items = [
      item(
        "Krabbesalat",
        28500,
        null,
        "Krabbesalat — røkt eplebuljong — 285",
        10,
      ),
      item(
        "røkt eplebuljong",
        28500,
        null,
        "røkt eplebuljong — 285",
        10,
      ),
      item("cacio e pepe", 28500, null, "cacio e pepe — 285", 30),
      item("Other Dish", 28500, null, "Other Dish — 285", 31),
    ];

    expect(canonicalizeHtmlOutputItems(items).map((entry) => entry.name)).toEqual([
      "Krabbesalat",
      "cacio e pepe",
      "Other Dish",
    ]);
  });


});
