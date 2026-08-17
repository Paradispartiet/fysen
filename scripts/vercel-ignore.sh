#!/usr/bin/env bash
set -u

app="${1:?app is required}"
cd "$(git rev-parse --show-toplevel)"
base="${VERCEL_GIT_PREVIOUS_SHA:-HEAD^1}"
ref="${VERCEL_GIT_COMMIT_REF:-}"

if [[ "$ref" == "main" ]]; then
  git diff --quiet "$base" HEAD -- "apps/$app/.vercel-release"
  exit $?
fi

case "$app" in
  web) package="@fysen/web" ;;
  api) package="@fysen/api" ;;
  *) echo "Unknown Vercel app: $app" >&2; exit 2 ;;
esac

exec turbo query affected --base="$base" --packages "$package" --exit-code
