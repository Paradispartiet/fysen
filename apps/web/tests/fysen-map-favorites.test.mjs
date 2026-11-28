import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { parseRestaurantFavorites, toggleRestaurantFavorite } from "../lib/map-favorites.mjs";

test("local favorites retain only distinct valid restaurant identifiers", () => {
  assert.deepEqual(parseRestaurantFavorites('["a-oslo","a-oslo","b-oslo",123,"<x>"]'), ["a-oslo","b-oslo"]);
  assert.deepEqual(parseRestaurantFavorites("{"), []);
  assert.deepEqual(toggleRestaurantFavorite(["a-oslo"],"a-oslo"), []);
  assert.deepEqual(toggleRestaurantFavorite(["a-oslo"],"b-oslo"), ["a-oslo","b-oslo"]);
});

test("AHA map save requires the enabled pilot and a real live menu item ID", () => {
  const view = readFileSync(new URL("../components/restaurant-map.tsx", import.meta.url), "utf8");
  const page = readFileSync(new URL("../app/search/page.tsx", import.meta.url), "utf8");
  assert.match(view, /ahaMinMatPilotEnabled && withPublicBasePath\("\/"\) === "\/" && entry\.origin === "live" && entry\.menuItemId/);
  assert.match(page, /menuItemId: result\.menuItemId/);
  assert.match(view, /window\.localStorage\.setItem\(restaurantFavoritesKey/);
  assert.match(view, /ikke i AHA/);
});
