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

test("Native Fysen icon is a real 1024px PNG matching brand setup", () => {
  const app = JSON.parse(read("app.json"));
  assert.equal(app.expo.icon, "./assets/icon.png");
  assert.equal(app.expo.android.adaptiveIcon.foregroundImage, "./assets/icon.png");
  const icon = fs.readFileSync(new URL("assets/icon.png", base));
  assert.equal(icon.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(icon.readUInt32BE(16), 1024);
  assert.equal(icon.readUInt32BE(20), 1024);
});

test("iPhone simulator smoke runs for native UI changes and checks distinct tab content", () => {
  const workflow = fs.readFileSync(new URL("../../.github/workflows/native-ios-simulator.yml", base), "utf8");
  assert.ok(workflow.includes('"apps/mobile/App.tsx"'));
  assert.ok(workflow.includes('"apps/mobile/src/**"'));
  assert.ok(workflow.includes("ios/fysen-iphone-favorites.png"));
  assert.ok(workflow.includes("cropToHeightWidth 1700 1080"));
  assert.ok(workflow.includes("ios/qa-content/matlyst.png"));
});
