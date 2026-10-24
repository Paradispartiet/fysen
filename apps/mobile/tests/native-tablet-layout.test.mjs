import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { isWideLayout } from "../src/layout.ts";

test("responsive layout adapts to phones, tablets, rotation and split view", () => {
  for (const width of [320, 390, 600, 759]) assert.equal(isWideLayout(width), false);
  for (const width of [760, 820, 1024, 1366]) assert.equal(isWideLayout(width), true);
  assert.equal(isWideLayout(Number.NaN), false);
  assert.equal(isWideLayout(-1), false);
});

test("native tablet design constrains wide screens without changing phone cards", () => {
  const app = fs.readFileSync(new URL("../App.tsx", import.meta.url), "utf8");
  const config = JSON.parse(fs.readFileSync(new URL("../app.json", import.meta.url), "utf8"));
  assert.match(app, /useWindowDimensions\(\)/);
  assert.match(app, /isWideLayout\(width\)/);
  assert.match(app, /wide && styles\.wideContent/);
  assert.match(app, /wide \? styles\.tabletGrid : undefined/);
  assert.match(app, /styles\.tabletGridCell/);
  assert.equal(config.expo.ios.supportsTablet, true);
  assert.equal(config.expo.orientation, "default");
});
