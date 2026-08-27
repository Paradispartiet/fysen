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

test("Matlyst production proof følger den gjenopprettede sekskorts-forsiden", () => {
  for (const cuisine of ["Asiatisk", "Indisk", "Fast food", "Italiensk", "Midtøsten", "Mexicansk"]) {
    assert.match(proofSource, new RegExp(cuisine, "u"));
  }
  assert.match(proofSource, /cuisineCard cuisineCardInteractive/u);
  assert.match(proofSource, /cuisineRestaurantNames/u);
  assert.match(proofSource, /På menyen nå/u);
});

test("Matlyst production proof bruker dagens direkte kjøkken-deep links", () => {
  for (const cuisine of ["Japansk", "Italiensk", "Nepalsk", "Polsk", "Etiopisk", "Filippinsk", "Egyptisk", "Levantinsk"]) {
    assert.match(proofSource, new RegExp(`cuisine=${cuisine}`, "u"));
  }
  assert.doesNotMatch(proofSource, /[?&]world=/u);
  assert.doesNotMatch(proofSource, /[?&]region=/u);
  assert.match(proofSource, /Production-backed canonical Matlyst-retter/u);
});
