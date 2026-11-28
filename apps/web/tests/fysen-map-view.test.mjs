import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { URL } from "node:url";

const frame = readFileSync(new URL("../lib/fysen-map-frame.ts", import.meta.url), "utf8");
const view = readFileSync(new URL("../components/restaurant-map.tsx", import.meta.url), "utf8");
const page = readFileSync(new URL("../app/kart/page.tsx", import.meta.url), "utf8");
const header = readFileSync(new URL("../components/global-header.tsx", import.meta.url), "utf8");

test("map runtime script parses and is isolated from the account origin", () => {
  const script = frame.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script);
  assert.doesNotThrow(() => new Function(script));
  assert.match(view, /sandbox="allow-scripts"/);
  assert.doesNotMatch(view, /allow-same-origin/);
  assert.match(view, /event\.source !== frame\.current\?\.contentWindow/);
  assert.match(view, /event\.origin !== "null"/);
  assert.match(frame, /event\.source !== parent/);
});

test("Oslo map uses existing catalog rows, clusters and a menu entry", () => {
  assert.match(page, /rows=\{restaurantCoordinateRows\}/);
  assert.match(view, /restaurantMapFeatures\(rows\)/);
  assert.match(frame, /cluster:true/);
  assert.match(frame, /fysen-map-select/);
  assert.match(header, /withPublicBasePath\("\/kart"\)/);
  assert.match(view, /Restaurantlisten fungerer fortsatt/);
});
