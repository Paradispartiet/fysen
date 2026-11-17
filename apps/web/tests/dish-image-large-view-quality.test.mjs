import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, URL } from "node:url";

const web = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const imageRoot = path.join(web, "public", "dish-images");
const manifest = JSON.parse(readFileSync(path.join(imageRoot, "manifest.json"), "utf8"));

// Large viewing means up to 800 CSS px on a 2x iPad screen. Files sized for
// 50–150px thumbnails cannot be treated as full-size originals.
const largeViewCssPixels = 800;
const largeViewDevicePixelRatio = 2;
const minimumNativePixels = largeViewCssPixels * largeViewDevicePixelRatio;

function avifDimensions(filename) {
  const bytes = readFileSync(path.join(imageRoot, filename));
  assert.equal(bytes.toString("ascii", 4, 12), "ftypavif", `${filename}: invalid AVIF format`);
  const index = bytes.indexOf(Buffer.from("ispe"));
  assert.ok(index >= 0 && bytes.length >= index + 16, `${filename}: missing AVIF image dimensions`);
  return {
    width: bytes.readUInt32BE(index + 8),
    height: bytes.readUInt32BE(index + 12),
  };
}

test("Matlyst must not publish gallery originals as sharp in large view without 1600px verified masters", () => {
  const failures = [];
  const seenMasters = new Set();

  for (const image of manifest.images) {
    const master = image.largeSource;
    if (typeof master !== "string" || !/^[a-z0-9-]+\.avif$/u.test(master)) {
      failures.push(`${image.id}: missing largeSource AVIF master (>= ${minimumNativePixels}px)`);
      continue;
    }

    if (master === image.atlas || /^(collection|series-04)\.avif$/u.test(master)) {
      failures.push(`${image.id}: largeSource must be a distinct full-size image, never an atlas or thumbnail`);
      continue;
    }
    if (seenMasters.has(master)) {
      failures.push(`${image.id}: full-size master ${master} is reused for multiple dish IDs`);
      continue;
    }
    seenMasters.add(master);

    let dimensions;
    try {
      dimensions = avifDimensions(master);
    } catch (error) {
      failures.push(`${image.id}: ${error.message}`);
      continue;
    }
    if (dimensions.width < minimumNativePixels || dimensions.height < minimumNativePixels) {
      failures.push(`${image.id}: ${master} is ${dimensions.width}x${dimensions.height}, need >= ${minimumNativePixels}x${minimumNativePixels}`);
    }

    // Export size alone is insufficient. A 700px crop re-exported as 1600px
    // is not a high-resolution source. These native-detail figures must come
    // from reviewed production evidence, never from the AVIF header.
    if (!Number.isInteger(image.largeSourceNativeWidth) ||
        !Number.isInteger(image.largeSourceNativeHeight) ||
        image.largeSourceNativeWidth < minimumNativePixels ||
        image.largeSourceNativeHeight < minimumNativePixels) {
      failures.push(`${image.id}: source-native detail >= ${minimumNativePixels}px not documented`);
    }
    if (!["independent-original", "high-resolution-redraw"].includes(image.largeSourceMethod)) {
      failures.push(`${image.id}: dedicated source method/review is missing; upscale and collage crops do not qualify`);
    }
  }

  assert.deepEqual(failures, [], `Large-view release blocked for ${failures.length} issues across ${manifest.images.length} dishes.\n${failures.join("\n")}`);
});
