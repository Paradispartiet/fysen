import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, URL } from "node:url";

const web = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const imageRoot = path.join(web, "public", "dish-images");
const repoRoot = path.resolve(web, "../..");
const manifest = JSON.parse(readFileSync(path.join(imageRoot, "manifest.json"), "utf8"));

// Large viewing means up to 800 CSS px on a 2x iPad screen. Files sized for
// 50–150px thumbnails cannot be treated as full-size originals.
const largeViewCssPixels = 800;
const largeViewDevicePixelRatio = 2;
const minimumNativePixels = largeViewCssPixels * largeViewDevicePixelRatio;

// Retain source PNGs outside public/ so a full-size asset can be audited
// without shipping an uncompressed multi-megabyte master to every visitor.
function originalPngEvidence(imageId, originalPath) {
  const expectedPath = `assets/fysen-dish-originals/${imageId}.png`;
  assert.equal(originalPath, expectedPath, `${imageId}: original source must use the canonical per-dish path`);
  const bytes = readFileSync(path.join(repoRoot, expectedPath));
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a",
    `${imageId}: original source must be a real PNG, not an AVIF re-export or a collage filename`);
  assert.equal(bytes.toString("ascii", 12, 16), "IHDR", `${imageId}: missing PNG dimensions`);
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
}

function avifDimensions(filename) {
  const bytes = readFileSync(path.join(imageRoot, filename));
  assert.equal(bytes.toString("ascii", 4, 12), "ftypavif", `${filename}: invalid AVIF format`);
  const index = bytes.indexOf(Buffer.from("ispe"));
  assert.ok(index >= 0 && bytes.length >= index + 16, `${filename}: missing AVIF image dimensions`);
  return {
    width: bytes.readUInt32BE(index + 8),
    height: bytes.readUInt32BE(index + 12),
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
}

test("Every enabled Matlyst large view requires a source-verified sharp 1600px master", () => {
  const failures = [];
  const seenMasters = new Set();
  let acceptedCount = 0;

  for (const image of manifest.images) {
    const failuresBeforeDish = failures.length;
    const master = image.largeSource;
    if (!master && image.largeViewEnabled !== true) {
      // This dish remains thumbnail-only; it must not opt into large display.
      continue;
    }
    if (typeof master !== "string" || !/^[a-z0-9-]+\.avif$/u.test(master)) {
      failures.push(`${image.id}: largeViewEnabled requires largeSource AVIF (>= ${minimumNativePixels}px)`);
      continue;
    }
    if (image.largeViewEnabled !== true) {
      failures.push(`${image.id}: largeSource exists but largeViewEnabled is not true`);
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
    if (Number.isInteger(image.largeSourceNativeWidth) && Number.isInteger(image.largeSourceNativeHeight) &&
        (dimensions.width > image.largeSourceNativeWidth || dimensions.height > image.largeSourceNativeHeight)) {
      failures.push(`${image.id}: AVIF is larger than native original; apparent resolution may be upscaled`);
    }
    // Verify the original bytes, not merely an unsubstantiated field in the manifest.
    try {
      const original = originalPngEvidence(image.id, image.largeSourceOriginalPath);
      if (original.width !== image.largeSourceNativeWidth || original.height !== image.largeSourceNativeHeight) {
        failures.push(`${image.id}: claimed native dimensions do not match retained PNG source`);
      }
      if (original.width < minimumNativePixels || original.height < minimumNativePixels) {
        failures.push(`${image.id}: original PNG is only ${original.width}x${original.height}`);
      }
      if (original.sha256 !== image.largeSourceOriginalSha256) {
        failures.push(`${image.id}: original source SHA-256 does not match retained source bytes`);
      }
    } catch (error) {
      failures.push(`${image.id}: original source evidence missing or invalid (${error.code ?? error.message})`);
    }
    if (!["independent-original", "high-resolution-redraw"].includes(image.largeSourceMethod)) {
      failures.push(`${image.id}: dedicated source method/review is missing; upscale and collage crops do not qualify`);
    }
    if (typeof image.largeSourceSha256 !== "string" || image.largeSourceSha256 !== dimensions.sha256) {
      failures.push(`${image.id}: reviewed large-source SHA-256 missing or does not match the actual AVIF bytes`);
    }
    if (typeof image.largeSourceOriginalSha256 !== "string" || !/^[a-f0-9]{64}$/u.test(image.largeSourceOriginalSha256)) {
      failures.push(`${image.id}: original source SHA-256 missing`);
    }
    const expectedReview = `docs/fysen-image-reviews/${image.id}.md`;
    if (image.largeSourceReview !== expectedReview) {
      failures.push(`${image.id}: exact dish review document is missing`);
    } else {
      try {
        const review = readFileSync(path.join(repoRoot, expectedReview), "utf8");
        if (!review.includes(image.largeSourceOriginalSha256) ||
            !/^Reviewed for full-size display:\s*yes\s*$/imu.test(review) ||
            !/^No collage crop or upscale:\s*yes\s*$/imu.test(review) ||
            !/^Correct dish and black background:\s*yes\s*$/imu.test(review)) {
          failures.push(`${image.id}: source review or no-upscale verification is incomplete`);
        }
      } catch (error) {
        failures.push(`${image.id}: cannot read review evidence (${error.code ?? error.message})`);
      }
    }
    if (failures.length === failuresBeforeDish) acceptedCount += 1;
  }

  assert.ok(acceptedCount > 0, "No verified full-size originals. Only thumbnail-only dishes may remain without largeSource.");
  assert.deepEqual(failures, [], `Large-view release blocked: ${acceptedCount}/${manifest.images.length} photos verified for optional full-size display.\n${failures.join("\n")}`);
});


test("Editorial food photos are only large-view enabled with real provenance and separate thumbnails", () => {
  const photos = manifest.images.filter((image) => image.kind === "Redaksjonelt rettfoto");
  assert.ok(photos.length >= 2, "Both sushi and butter chicken need separate full-size masters");
  assert.ok(photos.some((photo) => photo.id === "sushi"));
  assert.ok(photos.some((photo) => photo.id === "butter-chicken"));
  for (const photo of photos) {
    assert.equal(photo.largeViewEnabled, true, photo.id + " must pass full-size gate");
    assert.match(photo.atlas, /-thumb-\d+\.avif$/u);
    assert.match(photo.largeSource, /-master-\d+\.avif$/u);
    assert.notEqual(photo.atlas, photo.largeSource);
    assert.match(photo.photoLicense, /^https:\/\//u);
    if (photo.id === "rekesmorbrod") {
      assert.match(photo.photoSource, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/u);
      assert.match(photo.photoCredit, /Susanne Nilsson.*CC BY-SA 2\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/licenses/by-sa/2.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/rekesmorbrod-LICENSE.txt");
      const notice = readFileSync(path.join(imageRoot, "rekesmorbrod-LICENSE.txt"), "utf8");
      assert.match(notice, /Foto: Susanne Nilsson/u);
      assert.match(notice, /CC BY-SA 2\.0/u);
    } else if (photo.id === "pasta-bolognese") {
      assert.match(photo.photoSource, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/u);
      assert.match(photo.photoCredit, /Alex Sirac.*CC BY 4\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/licenses/by/4.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/pasta-bolognese-LICENSE.txt");
      const notice = readFileSync(path.join(imageRoot, "pasta-bolognese-LICENSE.txt"), "utf8");
      assert.match(notice, /Fotograf: Alex Sirac/u);
      assert.match(notice, /CC BY 4\.0/u);
    } else {
      assert.match(photo.photoSource, /^https:\/\/www\.pexels\.com\/photo\//u);
      assert.match(photo.photoCredit, /Pexels/u);
    }
  }
});
