import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseNordicMenuPrice, type NordicCurrency } from "./nordic-menu-price.js";

type Review = { status: string; menus: { currency: NordicCurrency; items: { name: string; priceField: string; publishEligible: boolean; note?: string }[] }[] };
const review = JSON.parse(readFileSync(new URL("../../../docs/nordic-pilot-reviewed-food-menus.json", import.meta.url), "utf8")) as Review;

describe("reviewed Nordic food menu fixtures", () => {
  it("parses every reviewed food price in local units without publishing fixtures", () => {
    expect(review.status).toBe("review-only-not-runtime");
    expect(review.menus.map((m) => m.items.length)).toEqual([33, 22, 69]);
    for (const menu of review.menus) {
      expect(new Set(menu.items.map((r) => r.name)).size).toBe(menu.items.length);
      for (const row of menu.items) {
        expect(row.publishEligible).toBe(false);
        expect(parseNordicMenuPrice(row.priceField, menu.currency)?.currency).toBe(menu.currency);
      }
    }
    expect(parseNordicMenuPrice("118/173", "DKK")?.priceMaxMinor).toBe(17300);
    expect(parseNordicMenuPrice("195/295", "SEK")?.priceMaxMinor).toBe(29500);
    expect(parseNordicMenuPrice("7,90", "EUR")?.priceMinor).toBe(790);
  });
});
