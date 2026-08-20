import { describe, expect, it } from "vitest";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import {
  HTML_HEADING_RECOVERY_SUPPLEMENT_VERSION,
  supplementStrongHeadingRecovery,
} from "./html-heading-recovery-supplement.js";

function item(name: string, position: number, sectionName: string | null = null): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name, sectionName),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName,
    priceMinor: 10000 + position,
    currency: "NOK",
    position,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt: name,
  };
}

describe("strong heading recovery supplementation", () => {
  it("adds a missing first card when the heading recovery has strong menu coverage", () => {
    const primary = [
      item("Dish Two", 2),
      item("Dish Three", 3),
      item("Dish Four", 4),
      item("Dish Five", 5),
      item("Drink One", 6),
      item("Drink Two", 7),
      item("Drink Three", 8),
      item("Drink Four", 9),
    ];
    const heading = [
      item("Dish One", 1),
      item("Dish Two", 2),
      item("Dish Three", 3),
      item("Dish Four", 4),
    ];

    expect(HTML_HEADING_RECOVERY_SUPPLEMENT_VERSION).toBe("heading-supplement-v1");
    expect(supplementStrongHeadingRecovery(primary, heading).map((entry) => entry.name)).toEqual([
      "Dish One",
      "Dish Two",
      "Dish Three",
      "Dish Four",
      "Dish Five",
      "Drink One",
      "Drink Two",
      "Drink Three",
      "Drink Four",
    ]);
  });

  it("does not supplement a weak alternate recovery", () => {
    const primary = Array.from({ length: 10 }, (_, index) => item(`Dish ${index + 1}`, index + 1));
    const heading = [item("Missing One", 0), item("Dish 1", 1), item("Dish 2", 2), item("Dish 3", 3)];

    expect(supplementStrongHeadingRecovery(primary, heading)).toEqual(primary);
  });

  it("never overwrites or collapses duplicate dish names already owned by separate sections", () => {
    const primary = [
      item("Fatouche", 1, "Small"),
      item("Fatouche", 2, "Large"),
      item("Hummus", 3),
      item("Falafel", 4),
      item("Shish Tawook", 5),
      item("Baklava", 6),
      item("Kibbeh", 7),
      item("Labneh", 8),
    ];
    const heading = [
      item("Fatouche", 0),
      item("Hummus", 3),
      item("Falafel", 4),
      item("New Dish", 5),
    ];

    const result = supplementStrongHeadingRecovery(primary, heading);
    expect(result.filter((entry) => entry.normalizedName === normalizeDishName("Fatouche"))).toHaveLength(2);
    expect(result.some((entry) => entry.name === "New Dish")).toBe(true);
  });
});
