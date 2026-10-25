import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

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
    { src: "/fysen-app-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
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
  assert.match(page, /apple: "\/brand\/fysen-mark-exact.png"/);
  assert.match(page, /themeColor: "#090b09"/);
});
