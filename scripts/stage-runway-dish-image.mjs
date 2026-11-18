#!/usr/bin/env node
/**
 * Stage a finished Runway image from its signed asset link.
 * Never stores the signed link and never marks a candidate as approved.
 * Use RUNWAY_IMAGE_URL environment variable to avoid leaking tokens in command history.
 */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dishId = process.argv[2];
if (!dishId || process.argv.length !== 3 || !/^[a-z0-9-]+$/u.test(dishId)) {
  process.stderr.write("Usage: RUNWAY_IMAGE_URL='<signed image URL>' node scripts/stage-runway-dish-image.mjs <dish-id>\n");
  process.exit(2);
}
const manifest = JSON.parse(readFileSync(path.join(repo, "apps/web/public/dish-images/manifest.json"), "utf8"));
assert.ok(manifest.images.some((image) => image.id === dishId), "Unknown dish ID (use manifest ID)");
const urlText = process.env.RUNWAY_IMAGE_URL;
assert.ok(urlText, "Set RUNWAY_IMAGE_URL from the completed Runway task; do not commit or log it.");
const sourceUrl = new URL(urlText);
assert.ok(
  sourceUrl.protocol === "https:" &&
  sourceUrl.hostname === "dnznrvs05pmza.cloudfront.net" &&
  sourceUrl.searchParams.has("_jwt") &&
  sourceUrl.pathname.endsWith(".png"),
  "Expected a signed Runway PNG delivery URL; refusing other hosts/paths."
);

const targetDir = path.join(repo, ".fysen-candidates");
const targetPath = path.join(targetDir, dishId + ".png");
assert.ok(!existsSync(targetPath), "Candidate already staged; move it away before intentionally replacing it.");

const response = await fetch(sourceUrl.href, {
  redirect: "error",
  signal: AbortSignal.timeout(60000),
});
if (!response.ok) throw Error("Runway image download failed: HTTP " + response.status);
const expectedBytes = Number(response.headers.get("content-length"));
if (Number.isFinite(expectedBytes) && expectedBytes > 30000000) throw Error("Asset exceeds the 30 MB safety limit");
const chunks = [];
let downloaded = 0;
for await (const chunk of response.body) {
  downloaded += chunk.byteLength;
  if (downloaded > 30000000) throw Error("Asset exceeds the 30 MB safety limit");
  chunks.push(Buffer.from(chunk));
}
const bytes = Buffer.concat(chunks);
assert.ok(bytes.length >= 45, "Truncated PNG");
assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", "Image is not a PNG");
assert.equal(bytes.toString("ascii", 12, 16), "IHDR", "PNG missing image dimensions");
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
assert.ok(width > 0 && height > 0 && width <= 40000 && height <= 40000, "Invalid PNG dimensions");
assert.ok(bytes.subarray(bytes.length - 8, bytes.length - 4).toString("ascii") === "IEND", "PNG truncated or missing IEND");
const sha256 = createHash("sha256").update(bytes).digest("hex");

mkdirSync(targetDir, { recursive: true });
writeFileSync(targetPath, bytes, { flag: "wx" });
process.stdout.write(JSON.stringify({
  dishId,
  stagedPath: path.relative(repo, targetPath),
  width,
  height,
  sha256,
  meets1600PixelPreflight: width >= 1600 && height >= 1600,
  approvedForLargeView: false,
  next: "Visually inspect original, convert to AVIF without scaling, then use import-dish-large-master.mjs with reviewed source evidence.",
}, null, 2) + "\n");
