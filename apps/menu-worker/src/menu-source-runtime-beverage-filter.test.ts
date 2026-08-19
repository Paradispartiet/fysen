import { describe, expect, it } from "vitest";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { isCanonicalHtmlMenuItem } from "./menu-source-runtime.js";

function item(name: string): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor: 9500,
    currency: "NOK",
    position: 0,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt: name,
  };
}

describe("generic HTML beverage filtering", () => {
  it.each([
    "Brown Sugar Boba Milk",
    "Taro Milk",
    "Chocolate Milk",
    "Iced Cocoa Oreo Milk",
    "Avocado & Coconut Smoothie",
    "Red Bull 250ml",
    "Solo 0.5L",
    "Saigon Special Cafe - Cafe sua da",
    "Salt Cafe",
    "Egg Cafe",
    "Homemade Lemonade with Mint",
  ])("rejects beverage-only menu item %s", (name) => {
    expect(isCanonicalHtmlMenuItem(item(name))).toBe(false);
  });

  it.each([
    "Coconut Milk Curry",
    "Milk Bread",
    "Cafe de Paris Steak",
    "Egg Fried Rice",
    "Salt and Pepper Squid",
    "Solo Garlic Noodles",
  ])("keeps food item %s", (name) => {
    expect(isCanonicalHtmlMenuItem(item(name))).toBe(true);
  });
});
