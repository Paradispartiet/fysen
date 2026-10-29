import { describe, expect, it } from "vitest";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { restoreIndependentlyPricedVolumeVariants } from "./html-explicit-volume-variant-recovery.js";

const name = "Ben & Jerry's Cookie Dough";
const item = {
  name,
  normalizedName: normalizeDishName(name),
  sourceKey: createMenuItemSourceKey(name, "Ice Cream & Dessert"),
  sectionName: "Ice Cream & Dessert",
  priceMinor: 11900,
  priceKind: "exact",
  priceMaxMinor: null,
  position: 4,
  confidence: 0.9,
  sourceExcerpt: name,
} as MenuObservedItem;

describe("independently priced duplicate dessert volumes", () => {
  it("keeps two separately published volume-and-price food choices rather than collapsing them", () => {
    const text = [
      "Ice Cream & Dessert",
      name,
      "Vanilla ice cream with chunks. 100ML",
      "NOK 55.00",
      name,
      "Vanilla ice cream with chunks. 465ML",
      "NOK 119.00",
    ].join("\n");
    const result = restoreIndependentlyPricedVolumeVariants([item], text);
    expect(result.map((choice) => [choice.name, choice.priceMinor])).toEqual([
      ["Ben & Jerry's Cookie Dough (100 ml)", 5500],
      ["Ben & Jerry's Cookie Dough (465 ml)", 11900],
    ]);
    expect(new Set(result.map((choice) => choice.sourceKey)).size).toBe(2);
  });

  it("never expands a repeated title at the same price or without an explicit volume", () => {
    expect(restoreIndependentlyPricedVolumeVariants([item], [
      name, "Vanilla 465ML", "NOK 119.00",
      name, "Vanilla 465ML", "NOK 119.00",
    ].join("\n"))).toEqual([item]);
    expect(restoreIndependentlyPricedVolumeVariants([item], [
      name, "Vanilla large tub", "NOK 55.00",
      name, "Vanilla small tub", "NOK 119.00",
    ].join("\n"))).toEqual([item]);
  });

  it("does not infer variants if the extracted item price cannot be verified or the same size has conflicting prices", () => {
    const text = [
      name, "Vanilla 100ML", "NOK 55.00",
      name, "Vanilla 465ML", "NOK 119.00",
    ].join("\n");
    expect(restoreIndependentlyPricedVolumeVariants([
      { ...item, priceMinor: 9900 },
    ], text)).toHaveLength(1);
    expect(restoreIndependentlyPricedVolumeVariants([item], [
      name, "Vanilla 100ML", "NOK 55.00",
      name, "Vanilla 100ML", "NOK 65.00",
      name, "Vanilla 465ML", "NOK 119.00",
    ].join("\n"))).toEqual([item]);
  });
});
