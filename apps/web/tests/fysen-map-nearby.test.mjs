import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { restaurantMapFeatures, nearestMapFeatures, distanceMeters } from "../lib/fysen-map-foundation.mjs";

test("nearest map restaurants are sorted by local distance with a four-item default", () => {
  const origin = [10.75, 59.91];
  const features = restaurantMapFeatures([5, 2, 1, 4, 3].map(n => ["r" + n, "Restaurant " + n, "Gate 1", 59.91 + n / 1000, 10.75])).features;
  assert.deepEqual(nearestMapFeatures(features, origin).map(row => row.feature.id), ["r1", "r2", "r3", "r4"]);
  assert.equal(distanceMeters(origin, origin), 0);
  assert.ok(Math.abs(distanceMeters(origin, [10.75, 59.911]) - 111.2) < 1);
  assert.equal(distanceMeters(origin, [NaN, 59.91]), Infinity);
  assert.deepEqual(nearestMapFeatures(features, [200, 59.91]), []);
});

test("nearby uses explicit position request and does not pass position to map iframe", () => {
  const view = readFileSync(new URL("../components/restaurant-map.tsx", import.meta.url), "utf8");
  const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(view, /onClick=\{requestLocation\}/);
  assert.match(view, /navigator\.geolocation\.getCurrentPosition/);
  assert.match(view, /nearestMapFeatures\(filtered\.features, location, 4\)/);
  assert.match(view, /features: filtered,/);
  assert.doesNotMatch(view, /postMessage\([^)]*location/);
  assert.match(view, /Slå av posisjon/);
  assert.match(home, /withPublicBasePath\("\/kart"\)/);
});
