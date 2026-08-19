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

describe("generic HTML canonical item filtering", () => {
  it.each([
    "Brown Sugar Boba Milk",
    "Taro Milk",
    "Chocolate Milk",
    "Iced Cocoa Oreo Milk",
    "Matcha Milk Latte Cheese",
    "Avocado & Coconut Smoothie",
    "Red Bull 250ml",
    "Solo 0.5L",
    "Saigon Special Cafe - Cafe sua da",
    "Salt Cafe",
    "Egg Cafe",
    "Homemade Lemonade with Mint",
    "Pepsi",
    "Pepsi Max",
    "Aranciata",
    "Chinotto",
    "Gazzosa",
    "Limonata",
    "Ice Tea Lemon",
    "Ice Tea Peach",
    "Galvanina Bellini Mocktail Økol 200ml",
    "Gin Tonic",
    "DRY MARTINI",
    "Telemark Still Naturell",
    "Telemark Sparkling Naturell 0,5l",
    "Arabisk kaffe med kardemomme",
    "Pizzakutter",
    "Pizza Cutter",
    "Levering",
    "Delivery",
    "A teapot",
    "fra 27 NOK54 NOK",
    "from 99 kr109 kr",
    "129 NOK",
  ])("rejects non-food or beverage-only menu item %s", (name) => {
    expect(isCanonicalHtmlMenuItem(item(name))).toBe(false);
  });

  it.each([
    "MENY",
    "À la carte",
    "FORRETTER",
    "SMÅRETTER",
    "GRILLRETTER",
    "HOVEDRETTER",
    "DESSERTER",
    "Drikkemeny",
    "DRIKKEVARER",
    "COCKTAILS",
    "VIN",
    "ØL",
    "BESTILL",
    "BORD",
    "ÅPNINGSTIDER",
    "KONTAKT",
  ])("rejects menu/navigation heading %s", (name) => {
    expect(isCanonicalHtmlMenuItem(item(name))).toBe(false);
  });

  it.each([
    "Coconut Milk Curry",
    "Milk Bread",
    "Cafe de Paris Steak",
    "Matcha Latte Cake",
    "Egg Fried Rice",
    "Salt and Pepper Squid",
    "Solo Garlic Noodles",
    "Pepsi-glazed Chicken Wings",
    "Chinotto Braised Pork",
    "Iced Tea Smoked Duck",
    "Pizza Cutter Steak",
    "Leverpostei med bacon",
    "Teapot Dumplings",
    "27 Spice Chicken",
    "Fromage Pizza 109",
    "Dessert Pizza",
    "Dry Martini Sauce Steak",
  ])("keeps food item %s", (name) => {
    expect(isCanonicalHtmlMenuItem(item(name))).toBe(true);
  });
});
