import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { canonicalCity, citySwitchHref, dishBrowseHref, nordicCities } from "../lib/public-path.ts";

test("all Nordic city switches lead home; browse remains an explicit separate action", () => {
  for (const { name } of nordicCities) {
    const home = new URL(citySwitchHref(name), "https://example.com");
    const browse = new URL(dishBrowseHref(name), "https://example.com");
    assert.ok(home.pathname.endsWith("/"));
    assert.ok(browse.pathname.endsWith("/search"));
    assert.equal(home.searchParams.get("city"), name);
    assert.equal(browse.searchParams.get("city"), name);
    assert.equal(canonicalCity(name.toLowerCase()), name);
  }
  assert.equal(canonicalCity("unknown"), "Oslo");
});

test("static-compatible homepage has just one city-specific browse link and never gives Oslo browse data to another city", () => {
  const home = readFileSync(new URL("../components/home-city-content.tsx", import.meta.url), "utf8");
  assert.match(home, /canonicalCity\(params\.get\("city"\)\)/);
  assert.match(home, /<GlobalHeader city=\{city\}/);
  assert.match(home, /<DishSearch [^>]*city=\{city\}/);
  assert.equal((home.match(/Se alle retter i /g) ?? []).length, 1);
  assert.match(home, /dishBrowseHref\(city\)/);
  assert.match(home, /browseData=\{city === "Oslo" \? osloBrowseData : null\}/);
  assert.match(home, /archiveCoverage=\{archiveCoverage\[city\] \?\? null\}/);
});
