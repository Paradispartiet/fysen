import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(fileURLToPath(new URL("../../..", import.meta.url)));
const webRoot = path.join(repoRoot, "apps/web");
const manifest = JSON.parse(readFileSync(path.join(webRoot, "public/dish-images/manifest.json"), "utf8"));
const base = (process.env.FYSEN_PUBLIC_WEB_URL || "https://fysen.vercel.app").replace(/\/$/, "");
assert.equal(manifest.images.length, 33, "The release must contain every approved food illustration");

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
  const visibleCards = html.split('class="dishPhotoCard"').length - 1;
  assert.equal(visibleCards, manifest.images.length, "Not all approved images are rendered in Matlyst");
  for (const entry of manifest.images) {
    assert.ok(html.includes(entry.label), `Missing dish image card: ${entry.id}`);
  }
});
console.log(`Verified ${manifest.images.length} rendered Matlyst images and ${atlases.length} public atlases at ${base}`);
