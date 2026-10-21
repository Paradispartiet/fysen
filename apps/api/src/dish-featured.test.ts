import { describe, expect, it, vi } from "vitest";
import { DishSearchController } from "./dish-search.controller.js";
import type { DishSearchService } from "./dish-search.service.js";

describe("GET /v1/dishes/featured", () => {
  it("returns only bounded Matlyst cards, never the full Oslo catalog", async () => {
    const browse = vi.fn().mockResolvedValue({
      city: "Oslo",
      count: 20_202,
      dishes: [{ id: "large-menu-index-is-private" }],
      recentDishes: [{ id: "recent-1", name: "Bánh mì" }],
      popularDishes: [{ id: "popular-1", name: "Ramen" }],
    });
    const controller = new DishSearchController({ browse } as unknown as DishSearchService);
    const result = await controller.featured({ city: "Oslo" });

    expect(browse).toHaveBeenCalledWith({ city: "Oslo" });
    expect(result).toEqual({
      city: "Oslo",
      count: 20_202,
      recentDishes: [{ id: "recent-1", name: "Bánh mì" }],
      popularDishes: [{ id: "popular-1", name: "Ramen" }],
    });
    expect(result).not.toHaveProperty("dishes");
  });

  it("returns empty featured arrays when the feature has no data", async () => {
    const browse = vi.fn().mockResolvedValue({ city: "Oslo", count: 0, dishes: [] });
    const controller = new DishSearchController({ browse } as unknown as DishSearchService);
    const result = await controller.featured({});
    expect(result.recentDishes).toEqual([]);
    expect(result.popularDishes).toEqual([]);
  });

  it("rejects an invalid city before any database query", async () => {
    const browse = vi.fn();
    const controller = new DishSearchController({ browse } as unknown as DishSearchService);
    await expect(controller.featured({ city: "" })).rejects.toThrow();
    expect(browse).not.toHaveBeenCalled();
  });
});
