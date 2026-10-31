import type { Pool } from "pg";
import { describe, expect, it } from "vitest";
import { browseDishes } from "./browse.js";

function poolFor(rows: unknown[]): Pool {
  let call = 0;
  return { query: async () => ({ rows: call++ === 0 ? rows : [] }) } as unknown as Pool;
}

describe("compact browse transport", () => {
  it("preserves dish identities, filtering, ranking and restaurant examples", async () => {
    const pool = poolFor([
      { restaurant_id: "a", restaurant_name: "Bistro Æ", restaurant_address: "Gate 1", menu_rows: [
        ["ramen", "Ramen", "ramen", "Spicy Ramen", "spicy ramen", null, "Middag", 24900, 0.95, 1, "2026-10-30T10:00:00Z"],
        [null, null, null, "1. Laks Maki 8 biter", "laks maki 8 biter", "Laks og avokado", "Sushi", 16900, 0.9, 0, "2026-10-30T10:00:00Z"],
        [null, null, null, "Pepsi Max", "pepsi max", null, "Drikke", 4500, 1, 2, "2026-10-30T10:00:00Z"],
        [null, null, null, "Allergenliste", "allergenliste", null, null, null, 1, 3, "2026-10-30T10:00:00Z"],
      ] },
      { restaurant_id: "b", restaurant_name: "Bistro Ø", restaurant_address: "Gate 2", menu_rows: [
        ["ramen", "Ramen", "ramen", "Ramen", "ramen", null, "Middag", 22900, 0.99, 0, "2026-10-31T10:00:00Z"],
      ] },
    ]);
    const result = await browseDishes(pool, { city: "Oslo" });
    expect(result.dishes).toEqual([
      { id: "menu:laks maki", name: "Laks Maki", query: "laks maki", restaurantCount: 1, restaurantExamples: [{ id: "a", name: "Bistro Æ", address: "Gate 1" }] },
      { id: "concept:ramen", name: "Ramen", query: "ramen", restaurantCount: 2, restaurantExamples: [
        { id: "b", name: "Bistro Ø", address: "Gate 2" },
        { id: "a", name: "Bistro Æ", address: "Gate 1" },
      ] },
    ]);
    expect(result.quality).toMatchObject({ rawItemCount: 5, validItemCount: 3, excludedItemCount: 2, deduplicatedItemCount: 1, exclusions: { beverage: 1, allergen_or_information: 1 } });
    expect(result.recentDishes).toEqual([]);
    expect(result.popularDishes).toEqual([]);
  });

  it("ranks decoded timestamps as dates when confidence is tied", async () => {
    const pool = poolFor([{ restaurant_id: "a", restaurant_name: "Bistro", restaurant_address: "Gate 1", menu_rows: [
      ["ramen", "Ramen", "old query", "Ramen", "ramen", null, null, 20000, 1, 0, "2026-10-30T10:00:00Z"],
      ["ramen", "Ramen", "new query", "Ramen", "ramen", null, null, 20000, 1, 0, "2026-10-31T10:00:00Z"],
    ] }]);
    const result = await browseDishes(pool, { city: "Oslo" });
    expect(result.dishes).toHaveLength(1);
    expect(result.dishes[0]?.query).toBe("new query");
    expect(result.dishes[0]?.restaurantExamples).toHaveLength(1);
  });
});
