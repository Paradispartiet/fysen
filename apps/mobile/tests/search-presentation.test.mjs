import assert from "node:assert/strict";
import test from "node:test";
import { groupDishMatches, hasLongDescription } from "../src/search-presentation.ts";

test("keeps API-ranked matching results before fuzzy results, without dropping or deduplicating", () => {
  const items = [
    { menuItemId: "a", match: { type: "fuzzy" } },
    { menuItemId: "b", match: { type: "canonical" } },
    { menuItemId: "c", match: { type: "exact" } },
    { menuItemId: "d", match: { type: "fuzzy" } },
    { menuItemId: "e", match: { type: "contains" } },
  ];
  const { matching, similar } = groupDishMatches(items);
  assert.deepEqual(matching.map((x) => x.menuItemId), ["b", "c", "e"]);
  assert.deepEqual(similar.map((x) => x.menuItemId), ["a", "d"]);
  assert.deepEqual(items.map((x) => x.menuItemId), ["a", "b", "c", "d", "e"], "API array must remain unmodified");
});

test("only expands very long menu descriptions; never deletes the source text", () => {
  assert.equal(hasLongDescription(null), false);
  assert.equal(hasLongDescription("Nudler og buljong"), false);
  assert.equal(hasLongDescription("x".repeat(151)), true);
});

test("result cards keep price visible ahead of expandable menu text", async () => {
  const fs = await import("node:fs");
  const file = fs.readFileSync(new URL("../App.tsx", import.meta.url), "utf8");
  const start = file.indexOf("function SearchResultCard(");
  const end = file.indexOf("function SearchScreen(", start);
  const card = file.slice(start, end);
  assert.ok(card.includes("numberOfLines={expandableDescription && !expandedDescription ? 3 : undefined}"), "description must initially fit three lines");
  assert.ok(card.includes("Les mer") && card.includes("Vis mindre"), "full source text must remain accessible");
  assert.ok(card.indexOf("{formatPrice(result.dish)}") < card.indexOf("numberOfLines={expandableDescription"), "price appears before description");
});
