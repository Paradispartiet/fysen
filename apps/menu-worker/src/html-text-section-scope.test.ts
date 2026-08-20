import { describe, expect, it } from "vitest";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import {
  filterPlainTextBeverageSectionItems,
  HTML_TEXT_SECTION_SCOPE_VERSION,
} from "./html-text-section-scope.js";

function item(name: string, position: number): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor: 10000,
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

    expect(HTML_TEXT_SECTION_SCOPE_VERSION).toBe("text-section-scope-v1");
    expect(filterPlainTextBeverageSectionItems(items, visibleText).map((entry) => entry.name)).toEqual([
      "Falafel",
      "Baklava",
    ]);
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

    expect(filterPlainTextBeverageSectionItems(items, visibleText).map((entry) => entry.name)).toEqual([
      "House Special",
    ]);
  });

  it("does nothing when no plain beverage boundary is present", () => {
    const items = [item("Falafel", 1), item("Baklava", 2)];
    expect(filterPlainTextBeverageSectionItems(items, "Forretter\nFalafel\nDessert\nBaklava")).toEqual(items);
  });
});
