import test from "node:test";
import assert from "node:assert/strict";
import { nordicDishAliases, resolveNordicDishQuery, normalizeNordicDishQuery, matchesNordicDishAlternative } from "../lib/nordic-dish-search.ts";
import { foodDishCatalog } from "../content/food-knowledge/catalog.ts";
import { searchPublicMenuArchive } from "../lib/verified-menu-archive.ts";

test("Nordic aliases have distinct canonical catalog targets", () => {
  for (const [id, query, aliases] of nordicDishAliases) {
    assert.equal(foodDishCatalog.find(dish => dish.id === id)?.query, query);
    for (const alias of [query, ...aliases]) assert.equal(resolveNordicDishQuery(alias)?.id, id);
  }
  for (const input of ["kylling", "taco", "curry", "kyllingstrimlar", "vårruller", "kalataco med ost", "pho bo"]) {
    assert.equal(resolveNordicDishQuery(input), null, input);
  }
  assert.equal(resolveNordicDishQuery("  KALATACO  ")?.canonicalQuery, "fish taco");
  assert.equal(resolveNordicDishQuery("BA\u0301NH MI\u0300")?.id, "banh-mi");
});

test("expanded matches use complete words", () => {
  const alternatives = resolveNordicDishQuery("kalataco").alternatives;
  assert.ok(matchesNordicDishAlternative(normalizeNordicDishQuery("Baja fish tacos"), alternatives));
  assert.ok(!matchesNordicDishAlternative("fish tacoish", alternatives));
  assert.ok(!matchesNordicDishAlternative("shrimp tacos", alternatives));
});

const archive = {
  version: 2, archiveDate: "2026-11-01", lastRefreshAt: null,
  restaurants: [["A","a","Street","Helsinki",""],["B","b","Street","Stockholm",""],["C","c","Street","Helsinki",""]],
  sources: [[0,"https://example.com/a","2026-11-01"],[1,"https://example.com/b","2026-11-01"],[2,"https://example.com/c","2026-11-01"]],
  items: [
    [0,"Kalataco","kalataco",1200,"exact",null,"","","EUR"],
    [0,"Baja fish tacos","baja fish tacos",1400,"exact",null,"","","EUR"],
    [0,"Fisktaco","fisktaco",1500,"exact",null,"","","EUR"],
    [0,"Fish tacoish","fish tacoish",1600,"exact",null,"","","EUR"],
    [0,"Shrimp taco","shrimp taco",1700,"exact",null,"","","EUR"],
    [1,"Fish taco","fish taco",14000,"exact",null,"","","SEK"],
    [2,"Fish taco","fish taco",1300,"exact",null,"","","EUR"]
  ],
  quarantinedSourceIndices: new Set([2]), quarantinedSlugs: new Set(["c"])
};

test("archive expansion retains all literal and equivalent matches, city, price and source", () => {
  const normal = searchPublicMenuArchive(archive, "kalataco", "Helsinki", Infinity);
  assert.deepEqual(normal.map(x => x.name), ["Kalataco"]);
  const expanded = searchPublicMenuArchive(archive, "kalataco", "Helsinki", Infinity, true);
  assert.equal(expanded[0].name, "Kalataco");
  assert.deepEqual(expanded.map(x => x.name).sort(), ["Baja fish tacos","Fisktaco","Kalataco"]);
  assert.ok(expanded.every(x => x.currency === "EUR" && x.restaurantSlug === "a" && x.sourceUrl === "https://example.com/a"));
  assert.equal(expanded.find(x => x.name === "Baja fish tacos").priceMinor, 1400);
  assert.equal(searchPublicMenuArchive(archive, "kalataco", "Stockholm", Infinity, true)[0].currency, "SEK");
});
