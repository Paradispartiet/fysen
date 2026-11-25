import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import process from "node:process";

const workflow = readFileSync(new URL("../.github/workflows/ci.yml", import.meta.url), "utf8");
const block = workflow.match(/      - name: Classify changed scope\n[\s\S]*?        run: \|\n([\s\S]*?)\n  quality:/u);
assert.ok(block, "CI classification shell block not found");
const script = block[1].split("\n").map((line) => line.replace(/^ {10}/u, "")).join("\n");

function classify(paths, event = "pull_request") {
  const cwd = mkdtempSync(join(tmpdir(), "fysen-ci-scope-"));
  const git = (...args) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  try {
    git("init", "-q");
    git("config", "user.email", "ci@example.invalid");
    git("config", "user.name", "CI test");
    git("commit", "--allow-empty", "-qm", "base");
    const base = git("rev-parse", "HEAD");
    for (const path of paths) {
      const file = join(cwd, path);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, "fixture");
    }
    git("add", ".");
    git("commit", "--allow-empty", "-qm", "change");
    const head = git("rev-parse", "HEAD");
    const output = join(cwd, "github-output");
    execFileSync("bash", ["-c", script], {
      cwd,
      env: { ...process.env, GITHUB_EVENT_NAME: event, GITHUB_OUTPUT: output,
        PR_BASE_SHA: base, PR_HEAD_SHA: head, PUSH_BASE_SHA: "", PUSH_HEAD_SHA: head },
      stdio: ["ignore", "pipe", "pipe"],
    });
    return Object.fromEntries(readFileSync(output, "utf8").trim().split("\n").map((line) => line.split("=")));
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
}

test("pure dish assets use targeted integrity only", () => {
  const scope = classify(["apps/web/public/dish-images/ramen.avif", "apps/web/public/dish-images/manifest.json", "assets/fysen-dish-originals/ramen.png"]);
  assert.equal(scope.dish_images, "true");
  assert.equal(scope.code, "false");
  assert.equal(scope.database, "false");
  assert.equal(scope.full, "false");
});

test("mixed image and code changes retain ordinary affected CI", () => {
  const scope = classify(["apps/web/public/dish-images/ramen.avif", "apps/web/components/dish-photo-gallery.tsx"]);
  assert.equal(scope.dish_images, "true");
  assert.equal(scope.code, "true");
});

test("unknown image-directory code is not treated as an asset", () => {
  assert.equal(classify(["apps/web/public/dish-images/script.js"]).code, "true");
});

test("database changes retain database and affected code tests", () => {
  const scope = classify(["packages/database/src/search.ts"]);
  assert.equal(scope.database, "true");
  assert.equal(scope.code, "true");
});

test("workflow changes and scheduled runs retain full validation", () => {
  for (const scope of [classify([".github/workflows/ci.yml"]), classify([], "schedule")]) {
    for (const gate of ["full", "code", "database", "browser"]) assert.equal(scope[gate], "true");
  }
});
