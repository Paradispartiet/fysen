import { describe, expect, it } from "vitest";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { reconcileStructuredNumberedVisibleDishes } from "./menu-source-runtime.js";

function dish(
  name: string,
  priceMinor: number | null,
  position: number,
  extractionMethod: "json_ld" | "html_heuristic" = "json_ld",
): MenuObservedItem {
  return {
    name,
    normalizedName: normalizeDishName(name),
    sourceKey: createMenuItemSourceKey(name),
    description: null,
    sectionName: null,
    priceMinor,
    currency: "NOK",
    position,
    extractionMethod,
    confidence: 0.99,
    sourceExcerpt: `${name} — ${priceMinor === null ? "price unavailable" : priceMinor / 100 + ",-"}`,
  };
}

describe("JSON-LD / visibly priced numbered menu reconciliation", () => {
  const structured = Array.from({ length: 8 }, (_, index) =>
    dish(`No. ${index + 1} Dish ${index + 1}`, (index + 100) * 100, index),
  );
  const priceCards = [
    ...structured.map((item, index) =>
      dish(item.name, item.priceMinor, index, "html_heuristic")),
    dish("No. 43 Creamed Broccoli", 6500, 8, "html_heuristic"),
    dish("No. 44 Fried Vegetables", 6500, 9, "html_heuristic"),
  ];

  it("restores independently priced and numbered side dishes without weakening any original contract", () => {
    const result = reconcileStructuredNumberedVisibleDishes(structured, priceCards);
    expect(result).toHaveLength(10);
    expect(result.slice(0, 8)).toEqual(structured);
    expect(result.slice(8).map((item) => [item.name, item.priceMinor])).toEqual([
      ["No. 43 Creamed Broccoli", 6500],
      ["No. 44 Fried Vegetables", 6500],
    ]);
  });

  it("does not invent unpriced items or accept unrelated titles", () => {
    const result = reconcileStructuredNumberedVisibleDishes(structured, [
      ...priceCards,
      dish("No. 45 Unpriced Dish", null, 10, "html_heuristic"),
      dish("Gift Card", 15000, 11, "html_heuristic"),
    ]);
    expect(result.map((item) => item.name)).not.toContain("No. 45 Unpriced Dish");
    expect(result.map((item) => item.name)).not.toContain("Gift Card");
  });

  it("refuses insufficient overlap and never overwrites an existing JSON-LD price", () => {
    const unrelated = priceCards.slice(0, 5).concat(priceCards.slice(8));
    expect(reconcileStructuredNumberedVisibleDishes(structured, unrelated)).toEqual(structured);
    const changedPrice = priceCards.map((item, i) =>
      i === 0 ? { ...item, priceMinor: 90000 } : item,
    );
    const result = reconcileStructuredNumberedVisibleDishes(structured, changedPrice);
    expect(result.find((item) => item.name === "No. 1 Dish 1")?.priceMinor).toBe(10000);
  });
});
