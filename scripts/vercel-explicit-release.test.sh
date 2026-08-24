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
grep -F 'schedule:' "$workflow" >/dev/null
grep -F 'cron: "23 8,9,20,21 * * *"' "$workflow" >/dev/null
grep -F 'TZ=Europe/Oslo date +%H' "$workflow" >/dev/null
grep -F 'workflow_dispatch:' "$workflow" >/dev/null
grep -F 'default: auto' "$workflow" >/dev/null
grep -F 'Manual Fysen production releases must be dispatched from main.' "$workflow" >/dev/null
grep -F 'ref: ${{ github.sha }}' "$workflow" >/dev/null
grep -F 'Locked release source $source_sha does not match workflow trigger $GITHUB_SHA' "$workflow" >/dev/null
if grep -F 'ref: main' "$workflow" >/dev/null; then
  echo "Production release must checkout the immutable trigger SHA, not a moving main ref" >&2
  exit 1
fi
grep -F 'secrets.VERCEL_TOKEN' "$workflow" >/dev/null
grep -F 'team_mV3NpMYd5l7yGmuZkbTf46y8' "$workflow" >/dev/null
grep -F 'prj_G0Vm4jhCg3hWRvVBSEIt5klHO6sS' "$workflow" >/dev/null
grep -F 'prj_sSNtWlPc13Lgr2ws6DdhCfPFtr4E' "$workflow" >/dev/null
grep -F 'https://api.vercel.com/v7/deployments' "$workflow" >/dev/null
grep -F '.meta.fysenSourceSha // .meta.githubCommitSha' "$workflow" >/dev/null
grep -F 'packages/contracts/*' "$workflow" >/dev/null
grep -F 'packages/database/*' "$workflow" >/dev/null
grep -F 'packages/menu-core/*' "$workflow" >/dev/null
grep -F 'No production-relevant changes have accumulated' "$workflow" >/dev/null
grep -F -- '--meta "fysenSourceSha=$SOURCE_SHA"' "$workflow" >/dev/null
grep -F 'deploy --prebuilt --prod' "$workflow" >/dev/null
grep -F 'https://fysen.vercel.app/' "$workflow" >/dev/null
if grep -F 'https://fysen-matsgran-8572s-projects.vercel.app/' "$workflow" >/dev/null; then
  echo "Release verification must use the public Fysen web alias, not the Vercel team alias" >&2
  exit 1
fi

proof_workflow=.github/workflows/production-pilot-proof.yml
test -f "$proof_workflow"
grep -F 'workflow_dispatch:' "$proof_workflow" >/dev/null
grep -F 'Materialize Fysen production catalog' "$proof_workflow" >/dev/null
grep -F 'workflow_call:' "$proof_workflow" >/dev/null
grep -F 'source_sha:' "$proof_workflow" >/dev/null
grep -F 'uses: ./.github/workflows/production-pilot-proof.yml' "$workflow" >/dev/null
grep -F 'source_sha: ${{ needs.prepare.outputs.source_sha }}' "$workflow" >/dev/null
grep -F 'secrets: inherit' "$workflow" >/dev/null
grep -F 'github.event.workflow_run.head_sha' "$proof_workflow" >/dev/null
grep -F 'FYSEN_PUBLIC_WEB_URL: https://fysen.vercel.app' "$proof_workflow" >/dev/null
if grep -Eq '^  push:' "$proof_workflow"; then
  echo "Production proof must not run directly on main pushes before the batched Vercel production release" >&2
  exit 1
fi
if grep -F 'FYSEN_PUBLIC_WEB_URL: https://fysen-matsgran-8572s-projects.vercel.app' "$proof_workflow" >/dev/null; then
  echo "Production proof must use the public Fysen web alias, not the Vercel team alias" >&2
  exit 1
fi

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

echo "Twice-daily batched Vercel production release contract passed"
