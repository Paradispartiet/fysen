import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { filterSearchResults, oneResultPerRestaurant } from "../lib/search-result-filters.ts";

function row({ slug, price, opening = "unknown", distance = null }) {
  return {
    restaurant: { slug },
    dish: { priceMinor: price },
    opening: { state: opening },
    distanceMeters: distance,
  };
}

describe("Search filters use only provable values from returned results", () => {
  const results = [
    row({ slug: "a", price: 12500, opening: "open", distance: 650 }),
    row({ slug: "a", price: null, opening: "open", distance: 650 }),
    row({ slug: "b", price: 18000, opening: "unknown", distance: null }),
    row({ slug: "c", price: 29000, opening: "closed", distance: 4200 }),
  ];

  it("does not manufacture prices, distances or opening information", () => {
    assert.deepEqual(filterSearchResults(results, {
      openNow: true, maxPriceMinor: 15000, maxDistanceMeters: 1000,
    }), [results[0]]);
    assert.deepEqual(filterSearchResults(results, {
      openNow: false, maxPriceMinor: null, maxDistanceMeters: 3000,
    }), results.slice(0, 2));
  });

  it("preserves returned ordering and deduplicates map restaurants", () => {
    const all = filterSearchResults(results, { openNow: false, maxPriceMinor: null, maxDistanceMeters: null });
    assert.deepEqual(all, results);
    assert.deepEqual(oneResultPerRestaurant(all), [results[0], results[2], results[3]]);
  });
});

describe("Client map and list contract", () => {
  it("loads OpenStreetMap only on demand and keeps fuzzy results separate", async () => {
    const { readFileSync } = await import("node:fs");
    const { fileURLToPath, URL } = await import("node:url");
    const read = (relative) => readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");
    const code = read("../components/search-results.tsx");
    const page = read("../app/search/page.tsx");
    assert.match(code, /showMap \? \(/u);
    assert.match(code, /openstreetmap\.org\/export\/embed\.html/u);
    assert.match(code, /filteredNear\.map/u);
    assert.match(code, /filteredPrimary\.map/u);
    assert.match(code, /maksimalt 20/u);
    assert.match(page, /<SearchResults/u);
  });
});
