import { describe, expect, it } from "vitest";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { normalizeHtmlItemName } from "./menu-source-runtime.js";

function item(name: string): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor: 20500,
    currency: "NOK",
    position: 0,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt: name,
  };
}

describe("generic HTML item-name normalization", () => {
  it.each([
    ["PAD THAI WITH CHICKEN |", "PAD THAI WITH CHICKEN"],
    ["GREEN CURRY WITH CHICKEN|", "GREEN CURRY WITH CHICKEN"],
    ["SPRING ROLLS ¦", "SPRING ROLLS"],
  ])("strips a trailing menu delimiter from %s", (input, expected) => {
    const normalized = normalizeHtmlItemName(item(input));
    expect(normalized.name).toBe(expected);
    expect(normalized.normalizedName).toBe(normalizeDishName(expected));
    expect(normalized.sourceKey).toBe(createMenuItemSourceKey(expected));
  });

  it("strips a menu index only when it precedes a numeric dish quantity", () => {
    const normalized = normalizeHtmlItemName(item("3. 5 Hot Wings"));
    expect(normalized.name).toBe("5 Hot Wings");
    expect(normalized.normalizedName).toBe(normalizeDishName("5 Hot Wings"));
    expect(normalized.sourceKey).toBe(createMenuItemSourceKey("5 Hot Wings"));
  });

  it.each([
    "43. Crispy Scampi 12 biter",
    "15. HOT WINGS MEAL",
    "12 Inch Pizza",
  ])("preserves a leading number when it is part of the canonical dish label: %s", (input) => {
    expect(normalizeHtmlItemName(item(input)).name).toBe(input);
  });

  it("does not strip pipes that are part of the dish text", () => {
    const input = "Surf | Turf";
    expect(normalizeHtmlItemName(item(input)).name).toBe(input);
  });
});
