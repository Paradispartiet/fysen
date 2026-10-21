import assert from "node:assert/strict";
import test from "node:test";
import { groupDishMatches, priceProvenanceLabel } from "../src/search-presentation.ts";

test("separates fuzzy suggestions while preserving API ranking inside each section", () => {
  const results = [
    { id: "a", match: { type: "exact" } },
    { id: "b", match: { type: "fuzzy" } },
    { id: "c", match: { type: "canonical" } },
    { id: "d", match: { type: "prefix" } },
    { id: "e", match: { type: "contains" } },
    { id: "f", match: { type: "fuzzy" } },
  ];
  const { direct, similar } = groupDishMatches(results);
  assert.deepEqual(direct.map(item => item.id), ["a", "c", "d", "e"]);
  assert.deepEqual(similar.map(item => item.id), ["b", "f"]);
  assert.equal(results.length, 6);
  assert.equal(results[1].id, "b");
});

test("labels genuine Wolt and Foodora hosts without trusting lookalikes", () => {
  assert.match(priceProvenanceLabel("https://wolt.com/en/nor/oslo/restaurant/abc"), /Wolt-leveringspris/);
  assert.match(priceProvenanceLabel("https://www.wolt.com/foo"), /Wolt-leveringspris/);
  assert.match(priceProvenanceLabel("https://foodora.no/restaurant/abc"), /Foodora-leveringspris/);
  assert.match(priceProvenanceLabel("https://delivery.foodora.no/foo"), /Foodora-leveringspris/);
  assert.equal(priceProvenanceLabel("https://wolt.com.evil.invalid/foo"), "Pris fra menykilden");
  assert.equal(priceProvenanceLabel("https://restaurant.example.no/"), "Pris fra menykilden");
  assert.equal(priceProvenanceLabel("not-an-url"), "Pris fra menykilden");
});

test("empty or wholly fuzzy results never invent direct matches", () => {
  assert.deepEqual(groupDishMatches([]), { direct: [], similar: [] });
  assert.equal(groupDishMatches([{ match: { type: "fuzzy" } }]).direct.length, 0);
});
