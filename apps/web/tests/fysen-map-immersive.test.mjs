import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { fysenBaseStyle, FYSEN_MAP_COLORS } from "../lib/fysen-map-foundation.mjs";

const read = path => readFileSync(new URL(path, import.meta.url), "utf8");

test("map workspace uses a dark full-width layout with an independent header action", () => {
  const css = read("../components/restaurant-map.module.css");
  const map = read("../components/restaurant-map.tsx");
  const header = read("../components/global-header.tsx");
  assert.match(css, /background: #080908/);
  assert.match(css, /height: clamp\(350px, 74dvh, 1050px\)/);
  assert.match(css, /\[data-immersive="true"\].*position: fixed; inset: 0/);
  assert.match(css, /\.map \{ height: 100%;/);
  assert.match(header, /fysenHeaderMapMode/);
  assert.match(map, /aria-pressed=\{immersive\} onClick=\{toggleImmersive\}/);
  assert.match(map, /Avslutt kartmodus/);
  assert.match(map, /hidden=\{!exploreOpen && mode !== "list"\}/);
  assert.match(map, /setExploreOpen\(false\);\s*setSelected\(null\);\s*setImmersive/);
  assert.match(map, /new ResizeObserver\(resize\)/);
});

test("map startup retries its ready handshake, without sharing user location", () => {
  const map = read("../components/restaurant-map.tsx");
  const frame = read("../lib/fysen-map-frame.ts");
  assert.match(frame, /setInterval\(\(\) => \{ if \(data\) clearInterval/);
  assert.match(map, /setFrameReady\(value => value \+ 1\)/);
  assert.match(map, /onClick=\{retryMap\}/);
  assert.doesNotMatch(map, /postMessage\([^)]*location/);
});

test("dark map labels stay legible and preserve provider attribution", () => {
  const style = {version:8,sources:{base:{attribution:"OSM"}},layers:[
    {id:"road",type:"line","source-layer":"transportation"},
    {id:"street-label",type:"symbol",layout:{"text-field":["get","name"]}},
    {id:"land",type:"fill","source-layer":"landcover"}
  ]};
  const mapped = fysenBaseStyle(style);
  assert.equal(mapped.layers[0].paint["line-color"], FYSEN_MAP_COLORS.road);
  assert.equal(mapped.layers[1].paint["text-color"], FYSEN_MAP_COLORS.ink);
  assert.equal(mapped.layers[2].paint["fill-color"], FYSEN_MAP_COLORS.paper);
  assert.equal(mapped.sources.base.attribution,"OSM");
});
