#!/usr/bin/env node
/**
 * Fast preflight for a Fysen full-size dish source.
 * This checks only file type and native pixel dimensions, NOT visual quality.
 * Run before converting a new PNG to AVIF and collecting review evidence.
 */
import { readFileSync } from "node:fs";
import process from "node:process";

const minNativeSize = 1600;
const deviceScale = 2;
const maxTargetCssWidth = 800;

function fail(message, status = 1) {
  process.stderr.write(message + "\n");
  process.exit(status);
}

const [filename, extra] = process.argv.slice(2);
if (!filename || extra) {
  fail("Usage: node scripts/check-dish-image-source.mjs /path/to/original.png", 2);
}

let bytes;
try {
  bytes = readFileSync(filename);
} catch (error) {
  fail("Cannot read source image: " + error.message);
}

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
if (bytes.length < 33 || !bytes.subarray(0, 8).equals(signature) ||
    bytes.toString("ascii", 12, 16) !== "IHDR") {
  fail("REJECTED: input is not a valid PNG header. Supply the original PNG, not an upscaled or renamed thumbnail.");
}

const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (!width || !height || width > 40000 || height > 40000) {
  fail("REJECTED: invalid PNG dimensions.");
}

const safeCssWidth = Math.floor(Math.min(width, height) / deviceScale);
const accepted = width >= minNativeSize && height >= minNativeSize;
const result = {
  verdict: accepted ? "DIMENSION_PREFLIGHT_PASS" : "REJECTED_TOO_SMALL",
  width,
  height,
  requiredNativePixels: minNativeSize,
  fullSizeCssPixels: maxTargetCssWidth,
  safe2xCssPixels: safeCssWidth,
  note: "Dimensions alone do not establish native detail. The original must be independent, not upscaled, and requires visual review.",
};
process.stdout.write(JSON.stringify(result, null, 2) + "\n");
if (!accepted) process.exitCode = 1;
