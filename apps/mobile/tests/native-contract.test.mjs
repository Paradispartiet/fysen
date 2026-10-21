import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const base = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, base), "utf8");

test("Expo entry points at the real React Native screen", () => {
  const p = JSON.parse(read("package.json"));
  const app = JSON.parse(read("app.json"));
  assert.equal(p.main, "index.ts");
  assert.equal(app.expo.slug, "fysen");
  assert.equal(app.expo.ios.bundleIdentifier, "no.fysen.app");
  assert.ok(p.dependencies["react-native"]);
  assert.ok(p.dependencies.expo);
  assert.match(read("index.ts"), /registerRootComponent\(App\)/);
  assert.doesNotMatch(read("App.tsx"), /WebView/);
});

test("Native API consumes bounded featured response and live dish search", () => {
  const api = read("src/api.ts");
  assert.match(api, /\/v1\/dishes\/featured\?city=Oslo/);
  assert.match(api, /\/v1\/dishes\/search\?/);
  assert.doesNotMatch(api, /\/v1\/dishes\/browse\?/);
  assert.match(api, /REQUEST_TIMEOUT_MS/);
});

test("Favorites are local and limited, and external URLs are validated", () => {
  assert.match(read("src/favorites.ts"), /AsyncStorage/);
  assert.match(read("src/favorites.ts"), /MAX_FAVORITES = 100/);
  assert.match(read("src/format.ts"), /url\.protocol === "https:"/);
});

test("First release does not ask for GPS or account access", () => {
  const app = JSON.parse(read("app.json"));
  assert.equal(app.expo.android.package, "no.fysen.app");
  assert.equal(app.expo.plugins, undefined);
  const screen = read("App.tsx");
  assert.doesNotMatch(screen, /requestForegroundPermissions|requestLocationPermissions/);
});
