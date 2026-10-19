import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath, URL } from "node:url";
import { formatDishPrice } from "../lib/dish-price.ts";
import { priceProvenanceLabel } from "../lib/price-provenance.ts";

const read = (file) => readFileSync(fileURLToPath(new URL(file, import.meta.url)), "utf8");

test("new and most searched dishes are part of Matlyst rather than a separate hero section", () => {
  const home = read("../app/page.tsx");
  const explorer = read("../components/cuisine-explorer.tsx");
  const recent = read("../components/recent-dishes.tsx");
  const popular = read("../components/popular-dishes.tsx");
  assert.doesNotMatch(home, /<RecentDishes/u);
  assert.doesNotMatch(home, /<PopularDishes/u);
  assert.match(explorer, /<RecentDishes dishes=\{effectiveBrowseData\?\.recentDishes \?\? \[\]\}/u);
  assert.match(explorer, /<PopularDishes dishes=\{effectiveBrowseData\?\.popularDishes \?\? \[\]\}/u);
  assert.ok(explorer.indexOf("<RecentDishes") < explorer.indexOf('className="cuisineGrid"'));
  assert.match(recent, /if \(dishes\.length === 0\) return null/u);
  assert.match(recent, /ikke nødvendigvis nytt på restaurantens meny/u);
  assert.match(popular, /Mest søkt/u);
  assert.match(popular, /dishSearchHref\(dish\.query\)/u);
});

test("price semantics are correct on cards and delivery prices are labeled", () => {
  const base = { currency: "NOK", priceMaxMinor: null, priceKind: "exact" };
  assert.equal(formatDishPrice({ ...base, priceMinor: 24900 }), "249 kr");
  assert.equal(formatDishPrice({ ...base, priceMinor: 17900, priceKind: "from" }), "fra 179 kr");
  assert.equal(formatDishPrice({ ...base, priceMinor: 17900, priceMaxMinor: 22900, priceKind: "multiple" }), "179–229 kr");
  assert.equal(formatDishPrice({ ...base, priceMinor: null }), "Pris ikke oppgitt");
  assert.match(priceProvenanceLabel("https://wolt.com/nb/nor/oslo/restaurant/example"), /leveringspris/u);
});
