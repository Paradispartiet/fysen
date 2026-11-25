import assert from "node:assert/strict";
import test from "node:test";
import { distanceMeters, rankRestaurantsByDistance, restaurantCoordinates } from "../lib/restaurant-distance.ts";
import { restaurantCoordinateRows } from "../lib/restaurant-coordinate-data.ts";

const first = restaurantCoordinateRows.find(row => row[0] === "ki-sushi-ramen-oslo");
const second = restaurantCoordinateRows.find(row => row[0] === "kagayaki-oslo");
assert.ok(first && second, "Known catalog fixtures must be available");
const identity = ([id, name, address]) => ({ id, name, address });
const a = identity(first), b = identity(second);
const unknown = { id: "unknown", name: "Unknown", address: "Unknown" };
const from = { latitude: first[3], longitude: first[4] };

test("known locations rank by actual distance and unknowns remain separate", () => {
  assert.ok(restaurantCoordinateRows.length >= 349);
  assert.equal(distanceMeters(from, from), 0);
  assert.ok(distanceMeters(from, restaurantCoordinates(b)) > 0);
  assert.deepEqual(rankRestaurantsByDistance([unknown, b, a], from), { known: [a, b], unknown: [unknown] });
  assert.deepEqual(rankRestaurantsByDistance([unknown, b, a], null), { known: [], unknown: [unknown, b, a] });
});
test("coordinate matching protects against moved branches and different addresses", () => {
  assert.equal(restaurantCoordinates({ ...a, address: "Other address" }), null);
  assert.deepEqual(restaurantCoordinates({ ...a, id: "live-uuid" }), from);
  assert.equal(restaurantCoordinates({ ...a, id: "live-uuid", address: "Other address" }), null);
});
