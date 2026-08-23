# Contributing to Fysen

## Branch discipline

- `main` is canonical and should remain green.
- Product changes go through focused branches and pull requests.
- Do not mix refactors, dependency upgrades and product behavior in the same PR without a concrete reason.
- Do not create TEMP/proof/writer/rebase pull requests merely to run GitHub Actions. Evidence belongs on the real PR or in a permanent reusable workflow.

## Quality and CI model

Fysen uses **scope-aware gates**. Quality requirements stay strict, but an unrelated subsystem must not be revalidated merely because another part of the repository changed.

### Pull requests

- Code changes run lint, typecheck, tests and build for the affected workspace graph.
- Shared/root build configuration still forces the complete suite.
- Database integration runs only when database/menu-core or shared build configuration can affect it.
- Menu browser smoke runs only when the menu runtime or its relevant shared dependencies are affected.
- Restaurant `candidates/` and `catalog/` changes are validated by the restaurant-domain workflow and do not run the generic TypeScript suite by themselves.
- Documentation/research-only changes do not run generic code gates.
- Unknown paths fail closed into ordinary code CI.

`pnpm check` remains the full-repository local command and is appropriate for global/shared changes or deliberate full verification. It is **not** a mandatory precondition for every isolated PR; the authoritative PR gate is the scope-aware CI result.

### Restaurant live proof on the real PR

Changed restaurant manifests are live-validated automatically on the exact PR head.

When menu-worker/menu-core runtime code needs one or more concrete live-source proofs, list those existing manifests in the PR body on one line:

```text
Live-proof manifests: catalog/example-oslo.json, catalog/another-oslo.json
```

The permanent restaurant proof workflow validates those manifests on the same PR head. Put semantic expectations in the canonical manifest assertions and permanent tests so the evidence is reproducible.

Do **not** create a second TEMP PR, writer PR or proof branch for:

- source discovery,
- live menu proof,
- parser proof,
- catalog proof,
- transport retry,
- rebase/writeback,
- production smoke.

Use the actual implementation PR, the permanent `workflow_dispatch` entry points, or rerun the failed permanent job when the documented failure is transient. If a new proof capability is genuinely reusable, add it permanently rather than inventing a disposable workflow.

### Full catalog health

The entire live restaurant catalog is a **main/release/health concern**, not a merge gate for an unrelated restaurant PR.

`.github/workflows/restaurant-catalog-health.yml` runs the canonical full catalog after relevant `main` changes, on schedule, and on manual dispatch. Existing restaurant drift discovered there must be repaired as its own source/catalog issue. It must not retroactively invalidate an otherwise correct unrelated PR.

Deterministic extraction, menu-assertion and hours failures remain fail-closed. Transport/action failures keep the validator's bounded retry policy.

## Deployment discipline

Fysen uses fully explicit, batched Vercel production releases. Git pushes and merges must not create Vercel deployments automatically.

- `apps/web/vercel.json` and `apps/api/vercel.json` set `git.deploymentEnabled` to `false`. This applies to `main`, feature branches and preview branches alike.
- GitHub Pages is the normal Fysen working preview. Do not use Vercel Git previews for ordinary visual QA.
- Merging to `main` only changes canonical source. It does not deploy web or API to Vercel.
- The normal production cadence is **twice per day at 10:00 and 22:00 Europe/Oslo** through `.github/workflows/vercel-production-release.yml`.
- The workflow uses UTC candidate triggers plus an `Europe/Oslo` guard so the two release windows stay at 10:00 and 22:00 through both CET and CEST.
- Scheduled runs use `auto` mode. They query each Vercel project's latest successful production deployment and compare its recorded Fysen source SHA with fresh canonical `main`.
- A scheduled window creates **no Vercel deployment** when no production-relevant changes have accumulated.
- Web is deployed only when `apps/web`, `packages/contracts`, or shared root build/workspace configuration changed since the latest successful web production release.
- API is deployed only when `apps/api`, `packages/contracts`, `packages/database`, `packages/menu-core`, or shared root build/workspace configuration changed since the latest successful API production release.
- Documentation-only changes therefore wait on `main` without consuming Vercel deployment quota.
- The release workflow locks the exact current `main` SHA before deploying. Web and API jobs both check out that locked SHA, so a later concurrent merge cannot silently change the release contents.
- Every explicit CLI deployment records `fysenSourceSha=<locked-main-sha>` as Vercel deployment metadata. For older production deployments, the batch planner falls back to Vercel's `githubCommitSha` metadata.
- `workflow_dispatch` remains the emergency/manual override. `auto` keeps normal change detection; choosing `web`, `api`, or `both` forces exactly those production targets even if the planner sees no relevant diff.
- The workflow targets the existing Vercel projects through their stable team/project IDs and authenticates with the repository secret `VERCEL_TOKEN`.
- `VERCEL_TOKEN` must be a Vercel access token with permission to deploy both Fysen projects. Never commit the token or copy it into workflow source.
- Web releases are deployed explicitly with Vercel CLI to the `fysen` production project and then checked through the public production site.
- API releases are deployed explicitly with Vercel CLI to `fysen-api` and then checked through `/v1/health` and `/v1/dishes/browse?city=Oslo`.
- A failed verification is a failed production release even if Vercel completed a build. Investigate before retrying.
- Do not restore `.vercel-release`, `scripts/vercel-ignore.sh`, `ignoreCommand`, branch allowlists, dated one-shot workflows or empty commits as deployment mechanisms. Use the batched release workflow.

This architecture lets development accumulate safely on `main`, keeps preview work independent on GitHub Pages, and normally caps production activity at two release windows per day instead of turning every merge into a Vercel deployment.

## Domain rule

Do not make source-specific fields canonical just because a provider exposes them. Add an adapter and preserve the Fysen domain boundary.

## Menu evidence rule

No searchable dish occurrence without a traceable source and verification timestamp.
