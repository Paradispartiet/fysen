import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { describe, it } from "node:test";
import { discoveryCoverage } from "../lib/dish-discovery.ts";

function menuDish(name, restaurantCount, restaurants = []) {
  return {
    id: name.toLowerCase().replaceAll(" ", "-"),
    name,
    query: name.toLowerCase(),
    restaurantCount,
    restaurantExamples: restaurants.map((id) => ({ id, name: id, address: "Oslo" })),
  };
}

describe("Mobile homepage dish coverage", () => {
  it("still prioritizes exact names, keeps the strongest identity count and deduplicates restaurants", () => {
    const data = [
      menuDish("Ramen", 3, ["a", "b"]),
      menuDish("Ramen spesial", 12, ["a", "c"]),
      menuDish("Ramen", 5, ["b", "d"]),
      menuDish("Burger", 18, ["e"]),
    ];
    const result = discoveryCoverage(data, { label: "Ramen", query: "ramen", aliases: ["shoyu ramen"] });
    assert.equal(result.restaurantCount, 5);
    assert.deepEqual(result.matchedDishes.map((dish) => dish.restaurantCount), [5, 3]);
    assert.deepEqual(result.restaurantExamples.map((restaurant) => restaurant.id), ["b", "d"]);
  });

  it("does not monopolize the main thread while ranking a broad browse catalog", () => {
    const dishes = Array.from({ length: 2500 }, (_, index) =>
      menuDish(`Rett ${index} med navn`, (index % 8) + 1),
    );
    dishes[2300] = menuDish("Ramen", 9, ["a"]);
    const queries = Array.from({ length: 70 }, (_, index) => ({
      label: index === 69 ? "Ramen" : `Matrett ${index}`,
      query: index === 69 ? "ramen" : `matrett ${index}`,
      aliases: [],
    }));
    const start = performance.now();
    const results = queries.map((query) => discoveryCoverage(dishes, query));
    const durationMs = performance.now() - start;
    assert.equal(results[69].restaurantCount, 9);
    assert.equal(results[0].restaurantCount, 0);
    assert.ok(durationMs < 2500, `Discovery took ${Math.round(durationMs)}ms for 175,000 comparisons`);
  });
});
