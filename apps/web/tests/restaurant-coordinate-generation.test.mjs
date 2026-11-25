import assert from "node:assert/strict";
import test from "node:test";
import { collectCoordinateRows, coordinateRow, renderCoordinateModule } from "../scripts/generate-restaurant-coordinates.mjs";

test("all eligible catalog coordinates are collected with stable identities", () => {
  const { rows, catalogCount } = collectCoordinateRows();
  assert.ok(catalogCount >= 987);
  assert.ok(rows.length >= 349, "Catalog coordinate coverage should not regress");
  assert.ok(rows.length <= catalogCount);
  assert.equal(new Set(rows.map(row => row[0])).size, rows.length);
  for (const slug of ["ki-sushi-ramen-oslo", "kagayaki-oslo", "basara-sushi-grensen-oslo", "sushihjornet-adamstuen-oslo"]) {
    assert.ok(rows.some(row => row[0] === slug), "Missing catalog coordinates: " + slug);
  }
  assert.equal(renderCoordinateModule(rows), renderCoordinateModule(collectCoordinateRows().rows));
});

test("invalid or unrelated positions are never filled in", () => {
  const restaurant = { slug: "example", name: "Example", address: "Example 1", city: "Oslo", countryCode: "NO", latitude: 59.9, longitude: 10.7 };
  assert.deepEqual(coordinateRow(restaurant), ["example", "Example", "Example 1", 59.9, 10.7]);
  for (const invalid of [{ latitude: null }, { longitude: "10.7" }, { latitude: 0 }, { city: "Bergen" }, { address: "" }]) {
    assert.equal(coordinateRow({ ...restaurant, ...invalid }), null);
  }
});
