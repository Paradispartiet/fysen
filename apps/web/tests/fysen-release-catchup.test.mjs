import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, URL } from "node:url";

const web = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const read = (relativePath) => readFileSync(path.join(web, relativePath), "utf8");
const workflow = read("../../.github/workflows/vercel-production-release.yml");
const publicProof = read("tests/matlyst-live-image-proof.mjs");

test("safe daily catch-up after quota reset retains the merged-PR and CI gates", () => {
  assert.match(workflow, /schedule:\s*\n\s*- cron: "17 3 \* \* \*"/u);
  assert.match(workflow, /GITHUB_EVENT_NAME" == "push" \|\| "\$GITHUB_EVENT_NAME" == "schedule"/u);
  assert.match(workflow, /commits\/\$GITHUB_SHA\/pulls/u);
  assert.match(workflow, /verified_ci/u);
  assert.match(workflow, /qualified-scheduled-catchup/u);
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
