import assert from "node:assert/strict";
import test from "node:test";
import { restaurantDirectionsUrl } from "../src/directions.ts";

const cafe = {
  name: "Fysen Testrestaurant",
  address: "Karl Johans gate 1, Oslo",
  latitude: 59.91111,
  longitude: 10.74612,
};

test("iPhone opens Apple Maps directions to verified coordinates", () => {
  const url = restaurantDirectionsUrl("ios", cafe);
  assert.equal(url, "https://maps.apple.com/?daddr=59.91111%2C10.74612&dirflg=d");
  assert.equal(new URL(url).searchParams.get("daddr"), "59.91111,10.74612");
});

test("Android opens Google Maps directions instead of a generic search", () => {
  const url = restaurantDirectionsUrl("android", cafe);
  assert.equal(url, "https://www.google.com/maps/dir/?api=1&destination=59.91111%2C10.74612&travelmode=driving");
  assert.doesNotMatch(url, /\/maps\/search/);
});

test("missing, bogus and 0,0 coordinates fall back to restaurant name and address", () => {
  for (const latitude of [null, NaN, 100, 0]) {
    const longitude = latitude === 0 ? 0 : cafe.longitude;
    const url = restaurantDirectionsUrl("ios", { ...cafe, latitude, longitude });
    const destination = new URL(url).searchParams.get("daddr");
    assert.equal(destination, "Fysen Testrestaurant, Karl Johans gate 1, Oslo");
  }
});

test("native UI calls the platform-specific directions helper", async () => {
  const { readFileSync } = await import("node:fs");
  const code = readFileSync(new URL("../App.tsx", import.meta.url), "utf8");
  assert.match(code, /restaurantDirectionsUrl\(Platform\.OS, result\.restaurant\)/);
  assert.doesNotMatch(code, /maps\/search/);
});
