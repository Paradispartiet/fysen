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

  it("does not strip pipes that are part of the dish text", () => {
    const input = "Surf | Turf";
    expect(normalizeHtmlItemName(item(input)).name).toBe(input);
  });
});
