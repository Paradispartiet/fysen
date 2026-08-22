import { describe, expect, it } from "vitest";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { isCanonicalHtmlMenuItem } from "./menu-source-runtime.js";

function item(name: string): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor: 199900,
    currency: "NOK",
    position: 0,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt: name,
  };
}

describe("beverage package metadata filtering", () => {
  it.each([
    "With wine package",
    "Wine package",
    "Drink package",
    "Beverage package",
  ])("rejects beverage package metadata %s", (name) => {
    expect(isCanonicalHtmlMenuItem(item(name))).toBe(false);
  });

  it.each([
    "Wine Braised Beef",
    "Red Wine Sauce Steak",
    "Beverage Pairing Chicken",
    "Drink Me Curry",
  ])("keeps food names that merely contain beverage words %s", (name) => {
    expect(isCanonicalHtmlMenuItem(item(name))).toBe(true);
  });
});
