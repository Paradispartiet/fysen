import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { Buffer } from "node:buffer";
import process from "node:process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, URL } from "node:url";

const web = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const script = path.resolve(web, "../../scripts/check-dish-image-source.mjs");

function checkSource(width, height, type = "png") {
  const directory = mkdtempSync(path.join(tmpdir(), "fysen-native-source-"));
  const file = path.join(directory, "candidate.png");
  try {
    // Header-only fixture: this tests the lightweight dimension preflight,
    // not image decoding or a visual approval of the actual dish.
    const bytes = Buffer.alloc(33);
    if (type === "png") {
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]).copy(bytes, 0);
      bytes.write("IHDR", 12, 4, "ascii");
      bytes.writeUInt32BE(width, 16);
      bytes.writeUInt32BE(height, 20);
    } else {
      bytes.write("not-a-png", 0);
    }
    writeFileSync(file, bytes);
    return spawnSync(process.execPath, [script, file], {
      encoding: "utf8",
      timeout: 10000,
    });
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

test("1600px source-size preflight rejects 1254px generated candidates", () => {
  const result = checkSource(1254, 1254);
  assert.equal(result.status, 1);
  const report = JSON.parse(result.stdout);
  assert.equal(report.verdict, "REJECTED_TOO_SMALL");
  assert.equal(report.safe2xCssPixels, 627);
  assert.equal(report.requiredNativePixels, 1600);
});

test("1600px source-size preflight permits qualifying pixel dimensions for later review", () => {
  const result = checkSource(2048, 2048);
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.verdict, "DIMENSION_PREFLIGHT_PASS");
  assert.equal(report.safe2xCssPixels, 1024);
  assert.match(report.note, /visual review/u);
});

test("source preflight rejects a file without a PNG header", () => {
  const result = checkSource(2048, 2048, "invalid");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /not a valid PNG header/u);
});
