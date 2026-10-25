import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const base = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, base), "utf8");

test("TestFlight is a store-signed iPhone/iPad build, never simulator preview", () => {
  const eas = JSON.parse(read("eas.json"));
  const app = JSON.parse(read("app.json"));
  assert.equal(eas.cli.appVersionSource, "remote");
  assert.equal(eas.build.testflight.distribution, "store");
  assert.equal(eas.build.testflight.ios.simulator, false);
  assert.equal(eas.build.testflight.autoIncrement, true);
  assert.equal(eas.build.preview.ios.simulator, true, "Simulator QA remains separate");
  assert.equal(app.expo.ios.bundleIdentifier, "no.fysen.app");
  assert.equal(app.expo.ios.supportsTablet, true);
  assert.equal(app.expo.orientation, "default");
});

test("iOS distribution is gated, manual, and requires Apple/Expo credentials", () => {
  const workflow = read("../../.github/workflows/native-ios-testflight.yml");
  assert.match(workflow, /^\s+workflow_dispatch:/m);
  assert.doesNotMatch(workflow, /^\s+pull_request:/m);
  assert.doesNotMatch(workflow, /^\s+push:/m);
  assert.match(workflow, /github\.ref == 'refs\/heads\/main'/);
  assert.match(workflow, /secrets\.EXPO_TOKEN/);
  assert.match(workflow, /vars\.EAS_PROJECT_ID/);
  assert.match(workflow, /vars\.APP_STORE_CONNECT_APP_ID/);
  assert.match(workflow, /--profile testflight/);
  assert.match(workflow, /--auto-submit/);
  assert.match(workflow, /--no-wait/);
  assert.match(workflow, /--non-interactive/);
  assert.match(workflow, /Source commit: \$GITHUB_SHA/);
  assert.match(workflow, /does NOT prove Apple processed it/);
});

test("never embed account-specific provisioning credentials in the repository", () => {
  const app = JSON.parse(read("app.json"));
  const eas = JSON.parse(read("eas.json"));
  assert.equal(app.expo.extra?.eas?.projectId, undefined);
  assert.equal(eas.submit.testflight.ios.ascAppId, undefined);
  const workflow = read("../../.github/workflows/native-ios-testflight.yml");
  assert.doesNotMatch(workflow, /BEGIN PRIVATE KEY/);
  assert.doesNotMatch(workflow, /APPLE_PASSWORD\s*:/);
});
