import { test } from "node:test";
import assert from "node:assert/strict";
import { restaurantMapFeatures, fysenBaseStyle, FYSEN_MAP_COLORS } from "../lib/fysen-map-foundation.mjs";

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

test("Fysen palette preserves source attribution, street labels and original style", () => {
  const style = { version: 8, sources: { base: { type: "vector", attribution: "OSM" } }, layers: [
    { id: "background", type: "background", paint: { "background-color": "#fff" } },
    { id: "water", type: "fill", "source-layer": "water", paint: { "fill-opacity": 0.9 } },
    { id: "poi-label", type: "symbol", "source-layer": "poi" },
    { id: "street-label", type: "symbol", "source-layer": "transportation_name" },
  ] };
  const mapped = fysenBaseStyle(style);
  assert.equal(mapped.layers.length, 3);
  assert.equal(mapped.layers[0].paint["background-color"], FYSEN_MAP_COLORS.background);
  assert.equal(mapped.layers[1].paint["fill-color"], FYSEN_MAP_COLORS.water);
  assert.equal(mapped.layers[1].paint["fill-opacity"], 0.9);
  assert.equal(mapped.layers[2].id, "street-label");
  assert.equal(mapped.sources.base.attribution, "OSM");
  assert.equal(style.layers[0].paint["background-color"], "#fff");
  assert.throws(() => fysenBaseStyle({ version: 7 }), TypeError);
});


test("green land cover is derived from real vector classes, beneath streets and buildings", () => {
  const style = {version:8,sources:{base:{type:"vector",attribution:"OSM"}},layers:[
    {id:"background",type:"background"},
    {id:"landuse_residential",type:"fill",source:"base","source-layer":"landuse"},
    {id:"building",type:"fill",source:"base","source-layer":"building"},
    {id:"highway_minor",type:"line",source:"base","source-layer":"transportation"},
    {id:"highway_major_inner",type:"line",source:"base","source-layer":"transportation"},
    {id:"highway_major_casing",type:"line",source:"base","source-layer":"transportation"},
    {id:"highway_path",type:"line",source:"base","source-layer":"transportation"},
  ]};
  const mapped = fysenBaseStyle(style);
  const layer = id => mapped.layers.find(item => item.id === id);
  assert.equal(layer("landuse_residential").paint["fill-color"], FYSEN_MAP_COLORS.paper);
  assert.equal(layer("fysen-grass-cover").paint["fill-color"], FYSEN_MAP_COLORS.park);
  assert.equal(layer("fysen-wood-cover").paint["fill-color"], FYSEN_MAP_COLORS.forest);
  assert.equal(layer("fysen-grass-cover")["source-layer"], "landcover");
  assert.ok(JSON.stringify(layer("fysen-grass-cover").filter).includes("grass"));
  assert.ok(mapped.layers.indexOf(layer("fysen-grass-cover")) < mapped.layers.indexOf(layer("building")));
  assert.equal(layer("highway_minor").paint["line-color"], FYSEN_MAP_COLORS.road);
  assert.equal(layer("highway_major_inner").paint["line-color"], FYSEN_MAP_COLORS.majorRoad);
  assert.equal(layer("highway_major_casing").paint["line-color"], FYSEN_MAP_COLORS.casing);
  assert.equal(layer("highway_path").paint["line-color"], FYSEN_MAP_COLORS.path);
  assert.equal(layer("highway_minor").paint["line-opacity"], 1);
  assert.ok(layer("highway_minor").paint["line-width"].includes(1.3));
  assert.equal(style.layers.length, 7);
});
