import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(testDirectory, "../../..");
const proofSource = await readFile(
  path.join(repositoryRoot, ".github/workflows/matlyst-production-proof.yml"),
  "utf8",
);


const releaseSource = await readFile(
  path.join(repositoryRoot, ".github/workflows/vercel-production-release.yml"),
  "utf8",
);

test("Matlyst runs on deployed web only, not an automatic no-op release", () => {
  assert.match(proofSource, /^  workflow_call:/mu);
  assert.match(proofSource, /^      source_sha:/mu);
  assert.match(proofSource, /ref: \$\{\{ inputs\.source_sha \|\| github\.sha \}\}/u);
  assert.doesNotMatch(proofSource, /^  workflow_run:/mu);
  assert.match(releaseSource, /^  matlyst_proof:/mu);
  assert.match(releaseSource, /needs\.web\.result == 'success'/u);
  assert.match(releaseSource, /needs\.proof\.result == 'success'/u);
  assert.match(releaseSource, /uses: \.\/\.github\/workflows\/matlyst-production-proof\.yml/u);
  assert.match(releaseSource, /source_sha: \$\{\{ needs\.prepare\.outputs\.source_sha \}\}/u);
});

test("Matlyst production proof følger dagens tolv kjøkken i en lukket utbrettmeny", () => {
  for (const cuisine of [
    // The workflow samples these six labels; the full twelve-item taxonomy
    // is asserted in matlyst-v3-contract.test.mjs and in live browser proof.
    "Asiatisk", "Indisk", "Fast food", "Italiensk", "Midtøsten", "Mexicansk",
  ]) {
    assert.match(proofSource, new RegExp(cuisine, "u"));
  }
  assert.match(proofSource, /cuisineBrowseDisclosure/u);
  assert.match(proofSource, /cuisineBrowseChoice/u);
  assert.match(proofSource, /requireOccurrences\(home, 'class="cuisineBrowseChoice"', 12\)/u);
  assert.match(proofSource, /Utforsk matretter/u);
  assert.match(proofSource, /matlyst-live-browser-proof\.mjs/u);
  assert.doesNotMatch(proofSource, /cuisineCard cuisineCardInteractive/u);
  assert.doesNotMatch(proofSource, /Restauranter og retter/u);
  assert.doesNotMatch(proofSource, /"På menyen nå"/u);
});

test("Matlyst production proof bruker dagens direkte kjøkken-deep links", () => {
  for (const cuisine of ["Japansk", "Italiensk", "Nepalsk", "Polsk", "Etiopisk", "Filippinsk", "Egyptisk", "Levantinsk"]) {
    assert.match(proofSource, new RegExp(`cuisine=${cuisine}`, "u"));
  }
  assert.doesNotMatch(proofSource, /[?&]world=/u);
  assert.doesNotMatch(proofSource, /[?&]region=/u);
  assert.match(proofSource, /"Finn retten"/u);
  assert.doesNotMatch(proofSource, /Production-backed canonical Matlyst-retter/u);
});

test("Matlyst production proof normaliserer bare Reacts tomme SSR-separator", () => {
  assert.match(proofSource, /function normalizeRenderedHtml\(html\)/u);
  assert.match(proofSource, /replaceAll\("<!-- -->", ""\)/u);
  assert.match(proofSource, /const renderedHtml = normalizeRenderedHtml\(surface\.html\)/u);
  assert.match(proofSource, /"Alle retter i Oslo"/u);
});
