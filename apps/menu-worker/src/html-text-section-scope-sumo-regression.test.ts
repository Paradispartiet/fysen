import { describe, expect, it } from "vitest";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import {
  filterHtmlBeverageSectionItemsWithScopedProvenance,
} from "./html-text-section-scope.js";

function observed(name: string, position: number, priceMinor: number): MenuObservedItem {
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
    confidence: 0.97,
    sourceExcerpt: name,
  };
}

// These are the food headings on Sumo's published English menu, 13 Oct 2026.
// Their exact section labels need to switch back to food scope following an
// earlier Drinks heading; otherwise the beverage filter deletes priced dishes.
const cases = [
  ["Poké bowl", "Sim-Sim Poké", 26900],
  ["Beyond fusion", "Dirty Ushi Maki", 26900],
  ["Deluxe Maki", "Veggie Ringo", 17900],
  ["Classic Maki", "Spicy Tuna", 19900],
  ["Sushi Combos", "Sushi for Beginners", 34900],
  ["Sushi Sharing Combos", "Family Combo", 119900],
  ["Take away specials", "Takeaway Selection", 25900],
  ["Sashimi", "Salmon Sashimi", 19900],
  ["Nigiri", "Salmon Nigiri", 9900],
  ["Extras", "Kimchi Salad", 5900],
] as const;

describe("Sumo food sections after beverage navigation", () => {
  for (const [heading, name, priceMinor] of cases) {
    it("restores food scope at " + heading + " without retaining drinks", () => {
      const items = [
        observed("House Lemonade", 0, 8900),
        observed(name, 1, priceMinor),
        observed("Iced Tea", 2, 8900),
      ];
      const text = [
        "Drinks",
        "House Lemonade", "89",
        heading,
        name, String(priceMinor / 100),
        "Drinks",
        "Iced Tea", "89",
      ].join("\n");
      const result = filterHtmlBeverageSectionItemsWithScopedProvenance(
        items, text, text,
      );
      expect(result.map((item) => item.name)).toEqual([name]);
    });
  }

  it("preserves all four live quality-locked dishes through shuffled groups", () => {
    const required = [
      ["Poké bowl", "Sim-Sim Poké", 26900],
      ["Extras", "Kimchi Salad", 5900],
      ["Beyond fusion", "Dirty Ushi Maki", 26900],
      ["Sushi Sharing Combos", "Family Combo", 119900],
    ] as const;
    const items = [
      ...required.map(([, name, price], position) => observed(name, position, price)),
      observed("House Lemonade", 5, 8900),
    ];

    for (const order of [[0, 1, 2, 3], [2, 3, 0, 1], [1, 0, 3, 2]]) {
      const sections = order.flatMap((index) => {
        const entry = required[index];
        if (!entry) throw new Error("Unknown test section");
        const [heading, name, price] = entry;
        return [heading, name, String(price / 100)];
      });
      const page = [
        "menu", "Starters", "Drinks", "House Lemonade", "89",
        ...sections,
        "Drinks", "House Lemonade", "89",
      ].join("\n");

      const kept = filterHtmlBeverageSectionItemsWithScopedProvenance(
        items, page, page,
      ).map((item) => item.name);

      expect(kept.sort()).toEqual(required.map(([, name]) => name).sort());
      expect(kept).not.toContain("House Lemonade");
    }
  });
});
