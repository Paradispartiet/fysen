#!/usr/bin/env bash
set -u

app="${1:?app is required}"
cd "$(git rev-parse --show-toplevel)"
ref="${VERCEL_GIT_COMMIT_REF:-}"
marker="apps/$app/.vercel-release"

# Production releases on main are intentionally controlled by the marker
# contract, not by Vercel's previous-production SHA. Vercel may use a shallow
# clone where that old commit object is unavailable.
if [[ "$ref" == "main" ]]; then
  parent_sha="$(git show -s --format=%P HEAD | awk '{print $1}')"
  queued_through="$(sed -n 's/^queued-through=//p' "$marker" | head -n 1)"

  if [[ -n "$parent_sha" && "$queued_through" == "$parent_sha" ]]; then
    echo "Vercel release gate: build $app (queued through parent $parent_sha)"
    exit 1
  fi

  echo "Vercel release gate: skip $app (release marker was not advanced for this main commit)"
  exit 0
fi

case "$app" in
  web) package="@fysen/web" ;;
  api) package="@fysen/api" ;;
  *) echo "Unknown Vercel app: $app" >&2; exit 2 ;;
esac

# Deliberate preview branches still use dependency-aware affected detection.
# If Vercel supplies a base SHA that is not present in its shallow clone, fall
# back to the immediate parent. If even that is unavailable, skip the preview
# instead of failing the deployment before the build starts.
base="${VERCEL_GIT_PREVIOUS_SHA:-}"
if [[ -n "$base" ]] && git cat-file -e "${base}^{commit}" 2>/dev/null; then
  :
elif git rev-parse --verify --quiet HEAD^1 >/dev/null; then
  base="HEAD^1"
else
  echo "Vercel release gate: skip $app preview (no comparison base available)"
  exit 0
fi

exec turbo query affected --base="$base" --packages "$package" --exit-code
