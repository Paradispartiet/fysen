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
    assert.deepEqual(Object.keys(row), ["slug", "name", "address", "latitude", "longitude", ...(row.logoPath ? ["logoPath"] : [])]);
    if (row.logoPath) assert.match(row.logoPath, /^\/restaurants\/[a-z0-9-]+\/logo\.(svg|png|webp)$/u);
    assert.ok(row.latitude >= 59.7 && row.latitude <= 60.2 && row.longitude >= 10.4 && row.longitude <= 11.1);
  }
  assert.throws(() => buildRestaurantMap("main"));
});

test("map reuses the exact restaurant visual identity and never guesses", () => {
  const data = buildRestaurantMap("a".repeat(40), { catalogCount: 3, rows: [
    ["egon-one", "Egon Byporten", "Jernbanetorget 6", 59.91, 10.75],
    ["egon-other", "Egon Byporten", "Test gate 3", 59.91, 10.75],
    ["unknown", "Unknown", "Test gate 1", 59.91, 10.75]
  ] });
  assert.equal(data.restaurants[0].logoPath, "/restaurants/egon-byporten/logo.svg");
  assert.equal(data.restaurants[1].logoPath, undefined);
  assert.equal(data.restaurants[2].logoPath, undefined);
});
