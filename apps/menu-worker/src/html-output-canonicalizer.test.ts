import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
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
    expect(HTML_OUTPUT_CANONICALIZER_VERSION).toBe("output-canonical-v1");
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
});
