#!/usr/bin/env bash
set -euo pipefail

source_repo="$(git rev-parse --show-toplevel)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

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

# An ordinary main commit after the release must skip both apps.
printf 'ordinary main change\n' > README.md
git add README.md
git commit -qm "ordinary main change"

VERCEL_GIT_COMMIT_REF=main VERCEL_GIT_PREVIOUS_SHA=deadbeef bash scripts/vercel-ignore.sh web >/dev/null
VERCEL_GIT_COMMIT_REF=main VERCEL_GIT_PREVIOUS_SHA=deadbeef bash scripts/vercel-ignore.sh api >/dev/null

echo "Vercel release-gate regression passed"
