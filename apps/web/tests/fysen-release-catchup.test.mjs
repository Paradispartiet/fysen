import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, URL } from "node:url";

const web = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const read = (relativePath) => readFileSync(path.join(web, relativePath), "utf8");
const workflow = read("../../.github/workflows/vercel-production-release.yml");
const publicProof = read("tests/matlyst-live-image-proof.mjs");

test("production releases remain explicitly dispatched and quota protected", () => {
  assert.match(workflow, /workflow_dispatch:/u);
  assert.doesNotMatch(workflow, /^\s+schedule:/mu);
  assert.match(workflow, /GITHUB_EVENT_NAME" == "push"/u);
  assert.match(workflow, /commits\/\$GITHUB_SHA\/pulls/u);
  assert.match(workflow, /verified_ci/u);
  assert.match(workflow, /releases_today < 3/u);
  assert.match(workflow, /release_capacity_available=false/u);
  assert.match(workflow, /web_needed=false/u);
});

test("published gallery proof requires the calm closed-by-default homepage", () => {
  assert.match(publicProof, /class="dishPhotosPreview"/u);
  assert.match(publicProof, /Gallery must be closed by default/u);
  assert.match(publicProof, /Cuisine choices must precede imagery/u);
  assert.match(publicProof, /availableCards/u);
  assert.match(publicProof, /sha256/u);
});
