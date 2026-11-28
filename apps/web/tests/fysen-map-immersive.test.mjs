import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { fysenBaseStyle } from "../lib/fysen-map-foundation.mjs";

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

test("daylight map preserves native road and label styling within black workspace", () => {
  const style = {version:8,sources:{base:{attribution:"OSM"}},layers:[
    {id:"road",type:"line","source-layer":"transportation",paint:{"line-color":"#fff"}},
    {id:"street-label",type:"symbol",layout:{"text-field":["get","name"]},paint:{"text-color":"#333"}},
    {id:"land",type:"fill","source-layer":"landcover",paint:{"fill-color":"#eee"}}
  ]};
  const mapped = fysenBaseStyle(style);
  assert.deepEqual(mapped.layers, style.layers);
  assert.equal(mapped.sources.base.attribution,"OSM");
  const frame = read("../lib/fysen-map-frame.ts");
  assert.match(frame, /"circle-color":"#28734b"/);
  assert.match(frame, /"text-color":"#24352c"/);
  assert.match(frame, /cluster:false/);
  assert.doesNotMatch(frame, /point_count|fysen-clusters/);
});
