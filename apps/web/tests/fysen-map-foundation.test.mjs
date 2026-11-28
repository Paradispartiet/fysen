import { test } from "node:test";
import assert from "node:assert/strict";
import { restaurantMapFeatures, fysenBaseStyle, FYSEN_MAP_COLORS, FYSEN_MAP_STYLE_URL } from "../lib/fysen-map-foundation.mjs";

test("catalog coordinates are converted to unique longitude-first GeoJSON", () => {
  const result = restaurantMapFeatures([
    ["a", "A", "Gate 1", 59.91, 10.75],
    ["a", "Duplicate", "Gate 2", 59.92, 10.76],
    ["b", "B", "Gate 3", NaN, 10.75],
    ["c", "C", "Gate 4", 10.75, 59.91],
  ]);
  assert.deepEqual(result, { type: "FeatureCollection", features: [{
    type: "Feature", id: "a", geometry: { type: "Point", coordinates: [10.75, 59.91] },
    properties: { slug: "a", name: "A", address: "Gate 1" },
  }] });
});

test("daylight map uses Liberty and preserves provider cartography, attribution and original style", () => {
  assert.equal(FYSEN_MAP_STYLE_URL, "https://tiles.openfreemap.org/styles/liberty");
  const style = {version:8,sources:{base:{type:"vector",attribution:"OSM"}},glyphs:"https://example.org/fonts/{fontstack}/{range}.pbf",sprite:"https://example.org/sprites",layers:[
    {id:"background",type:"background",paint:{"background-color":"#f8f4f0"}},
    {id:"landuse_residential",type:"fill","source-layer":"landuse",paint:{"fill-color":["interpolate",["linear"],["zoom"],9,"#eee",12,"#f5eee4"]}},
    {id:"water",type:"fill","source-layer":"water",paint:{"fill-color":"rgb(158,189,255)"}},
    {id:"landcover_sand",type:"fill","source-layer":"landcover",paint:{"fill-color":"#f7efc3"}},
    {id:"landcover_wetland",type:"fill","source-layer":"landcover",paint:{"fill-pattern":"wetland_bg_11"}},
    {id:"building",type:"fill","source-layer":"building",paint:{"fill-color":"hsl(35,8%,85%)"}},
    {id:"road_minor_casing",type:"line","source-layer":"transportation",paint:{"line-color":"#cfcdca","line-width":4}},
    {id:"road_minor",type:"line","source-layer":"transportation",paint:{"line-color":"#fff","line-width":3}},
    {id:"road_trunk_primary",type:"line","source-layer":"transportation",paint:{"line-color":"#fea"}},
    {id:"street-label",type:"symbol","source-layer":"transportation_name",paint:{"text-color":"#333"}},
    {id:"poi_r1",type:"symbol","source-layer":"poi"},
  ]};
  const original = JSON.stringify(style);
  const mapped = fysenBaseStyle(style);
  assert.deepEqual(mapped.layers, style.layers.slice(0,-1));
  assert.equal(mapped.sources.base.attribution,"OSM");
  assert.equal(mapped.glyphs,style.glyphs);
  assert.equal(mapped.sprite,style.sprite);
  assert.equal(JSON.stringify(style),original);
  assert.throws(() => fysenBaseStyle({version:7}), TypeError);
});

test("only known Liberty grass, park and woodland layers receive stronger natural greens", () => {
  const filter = ["==",["get","class"],"grass"];
  const style = {version:8,sources:{base:{type:"vector"}},layers:[
    {id:"park",type:"fill","source-layer":"park",paint:{"fill-color":"#ddd"}},
    {id:"landcover_grass",type:"fill","source-layer":"landcover",filter,paint:{"fill-color":"#aaa","fill-opacity":0.3}},
    {id:"landcover_wood",type:"fill","source-layer":"landcover",paint:{"fill-color":"#bbb","fill-opacity":0.4}},
    {id:"landcover_ice",type:"fill","source-layer":"landcover",paint:{"fill-color":"#e0ecec"}},
    {id:"road_minor",type:"line","source-layer":"transportation",paint:{"line-color":"#fff"}},
  ]};
  const mapped = fysenBaseStyle(style);
  assert.equal(mapped.layers[0].paint["fill-color"],FYSEN_MAP_COLORS.park);
  assert.equal(mapped.layers[1].paint["fill-color"],FYSEN_MAP_COLORS.grass);
  assert.equal(mapped.layers[2].paint["fill-color"],FYSEN_MAP_COLORS.forest);
  assert.deepEqual(mapped.layers[1].filter,filter);
  assert.equal(mapped.layers[1].paint["fill-opacity"],0.8);
  assert.deepEqual(mapped.layers.slice(3),style.layers.slice(3));
  assert.equal(style.layers[1].paint["fill-opacity"],0.3);
});
