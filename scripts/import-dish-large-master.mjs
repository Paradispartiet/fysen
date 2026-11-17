#!/usr/bin/env node
// Import a reviewed native-resolution master for an exact Matlyst dish.
// Does NOT upscale, invent source dimensions, or approve image aesthetics.
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import process from "node:process";
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesRoot = path.join(repo, "apps/web/public/dish-images");
const manifestPath = path.join(imagesRoot, "manifest.json");
const reviewDir = path.join(repo, "docs/fysen-image-reviews");
const minSize = 1600;
const [dishId, originalPngPath, masterAvifPath, reviewPath, method] = process.argv.slice(2);

if (!dishId || !originalPngPath || !masterAvifPath || !reviewPath || !method) {
  process.stderr.write(
    "Usage: node scripts/import-dish-large-master.mjs <dish-id> <native-original.png> <same-size-master.avif> <review.md> <independent-original|high-resolution-redraw>\n"
  );
  process.exit(2);
}
assert.match(dishId, /^[a-z0-9-]+$/u, "Unsafe dish ID");
assert.ok(["independent-original", "high-resolution-redraw"].includes(method), "Unknown source method");
assert.equal(path.extname(originalPngPath).toLowerCase(), ".png", "Native source must be PNG");
assert.equal(path.extname(masterAvifPath).toLowerCase(), ".avif", "Large delivery must be AVIF");

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const entry = manifest.images.find((image) => image.id === dishId);
assert.ok(entry, "Unknown Matlyst dish ID: " + dishId);
assert.ok(!entry.largeSource, "This dish already has a large master; review it manually");

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}
function nativePngDimensions(bytes) {
  assert.ok(bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), "Invalid PNG source");
  assert.equal(bytes.toString("ascii", 12, 16), "IHDR", "PNG missing IHDR");
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}
function avifDimensions(bytes) {
  assert.equal(bytes.toString("ascii", 4, 12), "ftypavif", "Invalid AVIF master");
  const index = bytes.indexOf(Buffer.from("ispe"));
  assert.ok(index >= 0 && bytes.length >= index + 16, "AVIF missing ispe dimensions");
  return { width: bytes.readUInt32BE(index + 8), height: bytes.readUInt32BE(index + 12) };
}

const original = readFileSync(originalPngPath);
const master = readFileSync(masterAvifPath);
const sourceSize = nativePngDimensions(original);
const masterSize = avifDimensions(master);
assert.ok(sourceSize.width >= minSize && sourceSize.height >= minSize,
  "Original is only " + sourceSize.width + "x" + sourceSize.height + "; native source must be >= 1600x1600");
assert.deepEqual(masterSize, sourceSize,
  "Delivery AVIF must match native PNG pixel dimensions; no interpolation/upscaling or resolution changes");

const originalHash = sha256(original);
const masterHash = sha256(master);
const review = readFileSync(reviewPath, "utf8");
assert.ok(review.includes(originalHash), "Review must cite exact SHA-256 of native source PNG");
assert.match(review, /^Reviewed for full-size display:\s*yes\s*$/imu,
  "Full-size human review is required");
assert.match(review, /^No collage crop or upscale:\s*yes\s*$/imu,
  "Human review must explicitly confirm no collage crop or upscaling");
assert.match(review, /^Correct dish and black background:\s*yes\s*$/imu,
  "Human review must explicitly confirm dish and background");

const filename = dishId + "-master-" + sourceSize.width + ".avif";
const outputPath = path.join(imagesRoot, filename);
const reviewName = dishId + ".md";
const outputReview = path.join(reviewDir, reviewName);
assert.ok(!existsSync(outputPath), "Master path already exists: " + filename);
assert.ok(!existsSync(outputReview), "Review exists; avoid accidentally overwriting prior evidence");
assert.ok(manifest.images.every((image) => image.largeSource !== filename),
  "Large source already belongs to another dish");

mkdirSync(reviewDir, { recursive: true });
copyFileSync(masterAvifPath, outputPath);
writeFileSync(outputReview, review, "utf8");
entry.largeSource = filename;
entry.largeSourceNativeWidth = sourceSize.width;
entry.largeSourceNativeHeight = sourceSize.height;
entry.largeSourceMethod = method;
entry.largeSourceSha256 = masterHash;
entry.largeSourceOriginalSha256 = originalHash;
entry.largeSourceReview = "docs/fysen-image-reviews/" + reviewName;
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
process.stdout.write("IMPORTED " + dishId + " " + sourceSize.width + "x" + sourceSize.height +
  " original=" + originalHash + " delivery=" + masterHash + "\n");
