import assert from "node:assert/strict";
import test from "node:test";
import { URL } from "node:url";
import { citySwitchHref, nordicCities } from "../lib/public-path.ts";

test("Nordic cities have distinct canonical city names and local currencies", () => {
  assert.deepEqual(nordicCities.map(({ name, country, currency }) => [name, country, currency]), [
    ["Oslo", "NO", "NOK"], ["København", "DK", "DKK"],
    ["Stockholm", "SE", "SEK"], ["Helsinki", "FI", "EUR"], ["Reykjavík", "IS", "ISK"],
  ]);
});

test("switching city keeps the dish query and drops old geographic coordinates", () => {
  for (const { name } of nordicCities) {
    const url = new URL(citySwitchHref(name, "dal makhani"), "https://example.com");
    assert.equal(url.searchParams.get("city"), name);
    assert.equal(url.searchParams.get("q"), "dal makhani");
    assert.equal(url.searchParams.has("lat"), false);
    assert.equal(url.searchParams.has("lon"), false);
    const browse = new URL(citySwitchHref(name), "https://example.com");
    assert.equal(browse.searchParams.get("city"), name);
    assert.equal(browse.searchParams.has("q"), false);
  }
});
