import assert from "node:assert/strict";
import test from "node:test";
import { URL } from "node:url";
import { dishSearchQuerySchema } from "@fysen/contracts";
import { dishSearchHref } from "../lib/public-path.ts";
const queryFrom = (name) => new URL(dishSearchHref(name), "https://example.com").searchParams.get("q");

test("long published dish names produce a valid search query prefix", () => {
  for (const name of [
    "Reinsdyrbiff med stekte kantareller, selleripuré, rosenkål, viltsaus med reinsdyrtunge og stekte poteter",
    "LARGE SHELLFISH PLATTER (per person, minimum 2 persons; preorder at least 1 day)",
  ]) {
    const q = queryFrom(name);
    assert.equal(dishSearchQuerySchema.safeParse({ q }).success, true);
    assert.ok(name.startsWith(q));
    assert.ok(q.length >= 20);
  }
});

test("short source queries and the eighty-character boundary remain unchanged", () => {
  for (const name of ["Østers (4 pcs)", "Søtpotetfries med aioli", "a".repeat(80)]) {
    assert.equal(queryFrom(name), name);
  }
});

test("unbroken long words and supplementary characters stay valid prefixes", () => {
  for (const name of ["a".repeat(120), "A " + "x".repeat(100), "a".repeat(79) + "🍣 sushi"]) {
    const q = queryFrom(name);
    assert.equal(dishSearchQuerySchema.safeParse({ q }).success, true);
    assert.ok(name.startsWith(q));
    assert.doesNotMatch(q, /[\uD800-\uDBFF]$/u);
  }
});
