#!/usr/bin/env bash
set -euo pipefail

for config in apps/web/vercel.json apps/api/vercel.json; do
  grep -F '"deploymentEnabled": false' "$config" >/dev/null
  if grep -F '"ignoreCommand"' "$config" >/dev/null; then
    echo "$config must not use ignoreCommand when Git deployments are disabled" >&2
    exit 1
  fi
  if grep -F '"main": true' "$config" >/dev/null || grep -F '"preview-*": true' "$config" >/dev/null; then
    echo "$config must not allow automatic Git deployments" >&2
    exit 1
  fi
done

workflow=.github/workflows/vercel-production-release.yml
test -f "$workflow"
grep -F 'workflow_dispatch:' "$workflow" >/dev/null
grep -F 'secrets.VERCEL_TOKEN' "$workflow" >/dev/null
grep -F 'team_mV3NpMYd5l7yGmuZkbTf46y8' "$workflow" >/dev/null
grep -F 'prj_G0Vm4jhCg3hWRvVBSEIt5klHO6sS' "$workflow" >/dev/null
grep -F 'prj_sSNtWlPc13Lgr2ws6DdhCfPFtr4E' "$workflow" >/dev/null
grep -F 'deploy --prebuilt --prod' "$workflow" >/dev/null

for obsolete in \
  apps/web/.vercel-release \
  apps/api/.vercel-release \
  scripts/vercel-ignore.sh \
  scripts/vercel-ignore.test.sh; do
  if [[ -e "$obsolete" ]]; then
    echo "Obsolete Git release-gate artifact still exists: $obsolete" >&2
    exit 1
  fi
done

echo "Explicit Vercel production release contract passed"
