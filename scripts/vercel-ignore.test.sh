#!/usr/bin/env bash
set -euo pipefail

source_repo="$(git rev-parse --show-toplevel)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

# Vercel branch filtering uses minimatch. The catch-all must therefore be **,
# not *, otherwise branch names containing / (agent/..., fix/..., candidate/...)
# fall through as unspecified branches and Vercel enables them by default.
for config in "$source_repo/apps/web/vercel.json" "$source_repo/apps/api/vercel.json"; do
  node - "$config" <<'NODE'
const fs = require("node:fs");
const path = process.argv[2];
const config = JSON.parse(fs.readFileSync(path, "utf8"));
const rules = config.git?.deploymentEnabled;
if (!rules || rules.main !== true || rules["preview-*"] !== true || rules["**"] !== false) {
  throw new Error(`${path}: invalid Vercel deploymentEnabled gate`);
}
if (Object.prototype.hasOwnProperty.call(rules, "*")) {
  throw new Error(`${path}: single-star catch-all leaks slash branch names`);
}
NODE
done

mkdir -p "$tmp/scripts" "$tmp/apps/web" "$tmp/apps/api"
cp "$source_repo/scripts/vercel-ignore.sh" "$tmp/scripts/vercel-ignore.sh"

cd "$tmp"
git init -q
git config user.name "Fysen CI"
git config user.email "ci@fysen.invalid"

printf 'queued-through=bootstrap\nrelease-reason=test\n' > apps/web/.vercel-release
printf 'queued-through=bootstrap\nrelease-reason=test\n' > apps/api/.vercel-release
git add .
git commit -qm "base"
base_sha="$(git rev-parse HEAD)"

# A web-only release must build web (exit 1) and skip API (exit 0), even when
# VERCEL_GIT_PREVIOUS_SHA points at an object that does not exist locally.
printf 'queued-through=%s\nrelease-reason=test-web\n' "$base_sha" > apps/web/.vercel-release
git add apps/web/.vercel-release
git commit -qm "Release Fysen web test"

set +e
VERCEL_GIT_COMMIT_REF=main VERCEL_GIT_PREVIOUS_SHA=deadbeef bash scripts/vercel-ignore.sh web >/dev/null
web_release_status=$?
VERCEL_GIT_COMMIT_REF=main VERCEL_GIT_PREVIOUS_SHA=deadbeef bash scripts/vercel-ignore.sh api >/dev/null
api_release_status=$?
set -e

[[ "$web_release_status" -eq 1 ]]
[[ "$api_release_status" -eq 0 ]]

# An ordinary main commit after the release must skip both apps at build time.
printf 'ordinary main change\n' > README.md
git add README.md
git commit -qm "ordinary main change"

VERCEL_GIT_COMMIT_REF=main VERCEL_GIT_PREVIOUS_SHA=deadbeef bash scripts/vercel-ignore.sh web >/dev/null
VERCEL_GIT_COMMIT_REF=main VERCEL_GIT_PREVIOUS_SHA=deadbeef bash scripts/vercel-ignore.sh api >/dev/null

echo "Vercel release-gate regression passed"
