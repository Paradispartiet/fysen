/* global URL, process, fetch, AbortSignal, setTimeout, Buffer, console */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(fileURLToPath(new URL("../../..", import.meta.url)));
const webRoot = path.join(repoRoot, "apps/web");
const manifest = JSON.parse(readFileSync(path.join(webRoot, "public/dish-images/manifest.json"), "utf8"));
const base = (process.env.FYSEN_PUBLIC_WEB_URL || "https://fysen.vercel.app").replace(/\/$/, "");
assert.equal(manifest.images.length, 40, "The release must contain every approved food illustration");

async function fetchWithRetry(uri, validate, tries = 15) {
  let lastError = "no response";
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const response = await fetch(uri, {
        headers: { "user-agent": "FysenApprovedImageSmoke/1.0" },
        cache: "no-store",
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await validate(response);
    } catch (error) {
      lastError = String(error);
      if (attempt < tries) await new Promise((resolve) => setTimeout(resolve, 5_000));
    }
  }
  throw new Error(`${uri} failed after ${tries} attempts: ${lastError}`);
}
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");

const atlases = [...new Set(manifest.images.map((entry) => entry.atlas))];
for (const atlas of atlases) {
  const expected = readFileSync(path.join(webRoot, "public/dish-images", atlas));
  await fetchWithRetry(`${base}/dish-images/${atlas}`, async (response) => {
    const actual = Buffer.from(await response.arrayBuffer());
    assert.equal(hash(actual), hash(expected), `Public ${atlas} does not match released source`);
  });
}

await fetchWithRetry(`${base}/`, async (response) => {
  const html = (await response.text()).replaceAll("<!-- -->", "");
  assert.ok(html.includes("Hva frister?"), "The Matlyst gallery heading is missing");
  // The full catalog is available in the DOM, but intentionally not shown
  // until the user opens the native details control. A home-page image wall
  // is a design regression even if all original files are still served.
  const disclosure = html.match(/<details[^>]*class="dishPhotos"[^>]*>/u);
  assert.ok(disclosure, "Matlyst gallery must use an opt-in details control");
  assert.doesNotMatch(disclosure[0], /\sopen(?:\s|>)/u, "Gallery must be closed by default");
  assert.ok(html.includes('class="dishPhotosPreview"'), "Small gallery teaser is missing");
  assert.ok(html.includes("Utforsk " + manifest.images.length + " retter"), "Gallery count is out of sync");
  assert.ok(html.indexOf('class="cuisineGrid"') < html.indexOf('class="dishPhotos"'), "Cuisine choices must precede imagery");
  const availableCards = html.split('class="dishPhotoCard"').length - 1;
  assert.equal(availableCards, manifest.images.length, "Not all approved images remain available in the opt-in Matlyst gallery");
  for (const entry of manifest.images) {
    assert.ok(html.includes(entry.label), `Missing dish image card: ${entry.id}`);
  }
});
console.log(`Verified ${manifest.images.length} Matlyst images in a closed-by-default gallery and ${atlases.length} public atlases at ${base}`);
