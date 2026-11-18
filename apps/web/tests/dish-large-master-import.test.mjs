import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import process from "node:process";
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const importer = path.join(repoRoot, "scripts/import-dish-large-master.mjs");

function fakePng(width, height) {
  const bytes = Buffer.alloc(24);
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]).copy(bytes, 0);
  Buffer.from("IHDR").copy(bytes, 12);
  bytes.writeUInt32BE(width, 16);
  bytes.writeUInt32BE(height, 20);
  return bytes;
}
function fakeAvif(width, height) {
  // This fixture only exercises rejecting dimensions, not AVIF decoding.
  const bytes = Buffer.alloc(32);
  Buffer.from("ftypavif").copy(bytes, 4);
  Buffer.from("ispe").copy(bytes, 12);
  bytes.writeUInt32BE(width, 20);
  bytes.writeUInt32BE(height, 24);
  return bytes;
}
function tryImport(sourceSize, deliverySize, reviewed) {
  const dir = mkdtempSync(path.join(os.tmpdir(), "fysen-large-source-"));
  try {
    const scriptDir = path.join(dir, "scripts");
    const imageDir = path.join(dir, "apps/web/public/dish-images");
    mkdirSync(scriptDir, { recursive: true });
    mkdirSync(imageDir, { recursive: true });
    const tempScript = path.join(scriptDir, "import-dish-large-master.mjs");
    copyFileSync(importer, tempScript);
    const manifestPath = path.join(imageDir, "manifest.json");
    writeFileSync(manifestPath, JSON.stringify({ images: [{ id: "pizza-margherita", atlas: "pizza-margherita-512.avif" }] }));
    const pngPath = path.join(dir, "original.png");
    const avifPath = path.join(dir, "delivery.avif");
    const reviewPath = path.join(dir, "review.md");
    const png = fakePng(sourceSize, sourceSize);
    writeFileSync(pngPath, png);
    writeFileSync(avifPath, fakeAvif(deliverySize, deliverySize));
    const hash = createHash("sha256").update(png).digest("hex");
    writeFileSync(reviewPath,
      "SHA-256 original: " + hash + "\n" +
      "Reviewed for full-size display: " + (reviewed ? "yes" : "no") + "\n" +
      "No collage crop or upscale: yes\n" +
      "Correct dish and black background: yes\n");
    const run = spawnSync(process.execPath, [
      tempScript, "pizza-margherita", pngPath, avifPath, reviewPath, "independent-original",
    ], { encoding: "utf8" });
    return {
      run,
      manifest: JSON.parse(readFileSync(manifestPath, "utf8")),
      outputExists: existsSync(path.join(imageDir, "pizza-margherita-master-" + sourceSize + ".avif")),
    };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test("large-image importer rejects a 1254px original disguised as a large AVIF", () => {
  const result = tryImport(1254, 2048, true);
  assert.notEqual(result.run.status, 0);
  assert.match(result.run.stderr, /Original is only 1254x1254/u);
  assert.equal(result.outputExists, false);
  assert.equal(result.manifest.images[0].largeSource, undefined);
});

test("large-image importer rejects re-exported AVIF dimensions even with a large native PNG", () => {
  const result = tryImport(2048, 1254, true);
  assert.notEqual(result.run.status, 0);
  assert.match(result.run.stderr, /must match native PNG pixel dimensions/u);
  assert.equal(result.outputExists, false);
  assert.equal(result.manifest.images[0].largeSource, undefined);
});

test("large-image importer requires human full-size review", () => {
  const result = tryImport(2048, 2048, false);
  assert.notEqual(result.run.status, 0);
  assert.match(result.run.stderr, /Full-size human review is required/u);
  assert.equal(result.outputExists, false);
  assert.equal(result.manifest.images[0].largeSource, undefined);
});
