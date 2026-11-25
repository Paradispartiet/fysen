import assert from "node:assert/strict";
import test from "node:test";
import { buildRestaurantMap } from "../scripts/export-restaurant-map.mjs";

test("map export contains only public catalog identity and coordinates", () => {
  const data = buildRestaurantMap("a".repeat(40));
  assert.equal(data.schemaVersion, 1);
  assert.equal(data.source, "fysen-catalog");
  assert.equal(data.city, "Oslo");
  assert.ok(data.catalogCount >= 987);
  assert.ok(data.restaurants.length >= 349);
  assert.equal(new Set(data.restaurants.map(row => row.slug)).size, data.restaurants.length);
  for (const row of data.restaurants) {
    assert.deepEqual(Object.keys(row), ["slug", "name", "address", "latitude", "longitude"]);
    assert.ok(row.latitude >= 59.7 && row.latitude <= 60.2 && row.longitude >= 10.4 && row.longitude <= 11.1);
  }
  assert.throws(() => buildRestaurantMap("main"));
});
