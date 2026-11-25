import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { URL } from "node:url";

const root = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");

test("Fysen can be added to iPhone and iPad Home Screen without Apple signing", () => {
  const manifest = JSON.parse(read("public/manifest.webmanifest"));
  assert.equal(manifest.short_name, "Fysen");
  assert.equal(manifest.lang, "nb");
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.start_url, "/");
  assert.equal(manifest.scope, "/");
  assert.equal(manifest.id, "/");
  assert.equal(manifest.theme_color, "#090b09");
  assert.equal(manifest.background_color, "#090b09");
  assert.deepEqual(manifest.icons, [
    { src: "/fysen-wordmark-icon-320.png", sizes: "320x320", type: "image/png", purpose: "any" },
    { src: "/fysen-wordmark-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
  ]);
});

test("Fysen iOS web app reuses its native brand icon and declares Apple metadata", () => {
  const svg = read("public/fysen-app-icon.svg");
  const native = read("../mobile/assets/icon-source.svg");
  const page = read("app/layout.tsx");
  assert.equal(svg, native, "Home-screen icon must match the native app");
  assert.match(page, /manifest: "\/manifest.webmanifest"/);
  assert.match(page, /appleWebApp:\s*\{/);
  assert.match(page, /capable: true/);
  assert.match(page, /title: "Fysen"/);
  assert.match(page, /apple: "\/fysen-wordmark-icon-320.png"/);
  assert.match(page, /themeColor: "#090b09"/);
});

test("shared Fysen wordmark is the food-free vector on every GlobalHeader", () => {
  const logo = read("components/fysen-logo.tsx");
  assert.match(logo, /\/brand\/fysen-wordmark\.svg/u);
  assert.match(read("components/global-header.tsx"), /<FysenLogo\s*\/>/u);
  const vector = read("public/brand/fysen-wordmark.svg");
  assert.match(vector, /viewBox="0 0 1133 531"/u);
  assert.match(vector, /#faf5d2/u);
  assert.match(vector, /#08300c/u);
  assert.doesNotMatch(vector, /<image\b/u);
  for (const size of [320, 512]) {
    const png = fs.readFileSync(new URL(`public/fysen-wordmark-icon-${size}.png`, root));
    assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
});
