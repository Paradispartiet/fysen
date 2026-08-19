# Contributing to Fysen

## Branch discipline

- `main` is canonical and should remain green.
- Product changes go through focused branches and pull requests.
- Do not mix refactors, dependency upgrades and product behavior in the same PR without a concrete reason.

## Required quality gate

```bash
pnpm check
```

A change is not complete while lint, typecheck, tests or build are red.

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
- Do not restore `.vercel-release`, `scripts/vercel-ignore.sh`, `ignoreCommand`, or branch allowlists as a deployment mechanism. They are obsolete in the batched explicit-release model.
- Do not create empty commits to trigger Vercel. Use the next scheduled batch or, for a real production emergency, the manual release override.

This architecture lets development accumulate safely on `main`, keeps preview work independent on GitHub Pages, and normally caps production activity at two release windows per day instead of turning every merge into a Vercel deployment.

## Domain rule

Do not make source-specific fields canonical just because a provider exposes them. Add an adapter and preserve the Fysen domain boundary.

## Menu evidence rule

No searchable dish occurrence without a traceable source and verification timestamp.
