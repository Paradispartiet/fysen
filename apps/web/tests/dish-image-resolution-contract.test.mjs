import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, URL } from "node:url";

const web = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const imageRoot = path.join(web, "public", "dish-images");
const manifest = JSON.parse(readFileSync(path.join(imageRoot, "manifest.json"), "utf8"));
const css = readFileSync(path.join(web, "styles", "dish-photos.css"), "utf8");

// A photo card can be as wide as 150 CSS pixels. Retain at least 2×
// source density at that width on Retina/high-DPI phones and tablets.
const minimumSourcePixels = 320;
const atlasGeometry = {
  "collection.avif": { columns: 6, rows: 4 },
  "series-04.avif": { columns: 3, rows: 3 },
};

function dimensionsOfAvif(bytes, filename) {
  assert.equal(bytes.toString("ascii", 4, 12), "ftypavif", `${filename}: expected AVIF file`);
  const ispe = bytes.indexOf(Buffer.from("ispe"));
  assert.ok(ispe >= 0, `${filename}: image spatial extent metadata not found`);
  assert.ok(bytes.length >= ispe + 16, `${filename}: truncated spatial extent metadata`);
  const width = bytes.readUInt32BE(ispe + 8);
  const height = bytes.readUInt32BE(ispe + 12);
  assert.ok(width > 0 && height > 0, `${filename}: zero-size image`);
  return { width, height };
}

test("Every published Matlyst image has sufficient actual source pixels", () => {
  assert.ok(manifest.images.length > 0, "The image manifest must not be empty");
  const imageIds = new Set();
  const checkedFiles = new Map();
  for (const [index, entry] of manifest.images.entries()) {
    assert.equal(entry.index, index, `${entry.id}: gallery index must match manifest order`);
    assert.ok(!imageIds.has(entry.id), `${entry.id}: duplicate gallery image ID`);
    imageIds.add(entry.id);
    assert.equal(path.basename(entry.atlas), entry.atlas, `${entry.id}: unsafe image path`);
    assert.match(entry.atlas, /^[a-z0-9-]+\.avif$/u, `${entry.id}: expected local AVIF image`);
    if (!checkedFiles.has(entry.atlas)) {
      const bytes = readFileSync(path.join(imageRoot, entry.atlas));
      checkedFiles.set(entry.atlas, dimensionsOfAvif(bytes, entry.atlas));
    }
    const dimensions = checkedFiles.get(entry.atlas);
    const geometry = atlasGeometry[entry.atlas] ?? { columns: 1, rows: 1 };
    assert.equal(dimensions.width % geometry.columns, 0, `${entry.atlas}: partial sprite column`);
    assert.equal(dimensions.height % geometry.rows, 0, `${entry.atlas}: partial sprite row`);
    const tileWidth = dimensions.width / geometry.columns;
    const tileHeight = dimensions.height / geometry.rows;
    assert.ok(tileWidth >= minimumSourcePixels && tileHeight >= minimumSourcePixels,
      `${entry.id}: image has only ${tileWidth}×${tileHeight} pixels; need at least ${minimumSourcePixels}×${minimumSourcePixels}`);
  }
});

test("Matlyst photo cards keep Retina-safe display sizes", () => {
  assert.match(css, /\.dishPhotoCard \.dishPhotoThumb[\s\S]*?max-width:\s*150px/u);
  assert.match(css, /@media\(max-width:600px\)[\s\S]*?\.dishPhotoCard \.dishPhotoThumb[\s\S]*?max-width:\s*144px/u);
});
