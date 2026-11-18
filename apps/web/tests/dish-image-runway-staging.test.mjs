import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import process from "node:process";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, URL } from "node:url";

const web = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const stage = path.resolve(web, "../../scripts/stage-runway-dish-image.mjs");

function run(dish, url) {
  const env = { ...process.env };
  if (url === undefined) delete env.RUNWAY_IMAGE_URL;
  else env.RUNWAY_IMAGE_URL = url;
  return spawnSync(process.execPath, [stage, dish], {
    env, encoding: "utf8", timeout: 10000,
  });
}

test("Runway staging requires a signed asset URL and does not expose one", () => {
  const result = run("sushi");
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Set RUNWAY_IMAGE_URL/u);
  assert.doesNotMatch(result.stdout + result.stderr, /_jwt=/u);
});

test("Runway staging refuses non-Runway asset hosts without fetching", () => {
  const result = run("sushi", "https://example.org/malicious.png?_jwt=private-test-token");
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /refusing other hosts/u);
  assert.doesNotMatch(result.stdout + result.stderr, /private-test-token/u);
});

test("Runway staging requires an exact, existing food ID", () => {
  const result = run("nonexistent-dish", "https://dnznrvs05pmza.cloudfront.net/fake.png?_jwt=test");
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown dish ID/u);
});
