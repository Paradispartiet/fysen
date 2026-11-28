import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { archivedMenuPriceLabel } from "../lib/archived-menu-price.ts";

test("map and list reuse archive prices without inventing unknown values", () => {
  assert.equal(archivedMenuPriceLabel(null, null, "exact", "NOK"), "Pris ikke oppgitt");
  assert.match(archivedMenuPriceLabel(15000, null, "from", "NOK"), /^Fra /);
  assert.match(archivedMenuPriceLabel(15000, 25000, "multiple", "NOK"), /150.*250/u);
  const map = readFileSync(new URL("../app/search/page.tsx", import.meta.url), "utf8");
  const list = readFileSync(new URL("../components/verified-menu-archive-view.tsx", import.meta.url), "utf8");
  assert.match(map, /archivedMenuPriceLabel\(result\.priceMinor, result\.priceMaxMinor, result\.priceKind, result\.currency\)/);
  assert.match(list, /archivedMenuPriceLabel as priceLabel/);
});

test("map restaurant cards use shared identity checks and show credits", () => {
  const view = readFileSync(new URL("../components/restaurant-map.tsx", import.meta.url), "utf8");
  const artwork = readFileSync(new URL("../components/map-restaurant-artwork.tsx", import.meta.url), "utf8");
  assert.match(view, /<MapRestaurantArtwork key=\{current\.id\} restaurant=\{current\.properties\}/);
  assert.match(artwork, /restaurantVisuals\(restaurant\)/);
  assert.match(artwork, /scene\.credit\.photoCredit/);
  assert.match(artwork, /scene\.credit\.licenseUrl/);
  assert.match(artwork, /Illustrasjon/);
  assert.match(artwork, /href=\{imageUrl\}/);
});
