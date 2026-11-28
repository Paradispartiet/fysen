import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { registeredMenuSource } from "../scripts/generate-restaurant-coordinates.mjs";

test("registered menu links require a real Oslo catalog identity and web URL", () => {
  const restaurant = { slug: "test-oslo", name: "Test", address: "Gate 1", city: "Oslo", countryCode: "NO", latitude: 59.91, longitude: 10.75 };
  assert.deepEqual(registeredMenuSource({ restaurant, menuSource: { url: "https://example.org/menu" } }), ["test-oslo", "https://example.org/menu"]);
  for (const url of ["javascript:alert(1)", "https://user:secret@example.org/menu", "not a URL"]) {
    assert.equal(registeredMenuSource({ restaurant, menuSource: { url } }), null);
  }
  assert.equal(registeredMenuSource({ restaurant: { ...restaurant, latitude: null }, menuSource: { url: "https://example.org" } }), null);
});

test("dish map shares the reconciled search results and does not map fuzzy matches", () => {
  const page = readFileSync(new URL("../app/search/page.tsx", import.meta.url), "utf8");
  const view = readFileSync(new URL("../components/restaurant-map.tsx", import.meta.url), "utf8");
  assert.match(page, /for \(const result of primaryResults\)/);
  assert.match(page, /for \(const result of archiveMatches\)/);
  assert.match(page, /restaurantCoordinateRows\.filter\(row => Object\.hasOwn\(mapEvidence, row\[0\]\)\)/);
  assert.doesNotMatch(page, /for \(const result of nearResults\)/);
  assert.match(view, /name="view" value="map"/);
  assert.match(view, /Meny sist registrert/);
});
