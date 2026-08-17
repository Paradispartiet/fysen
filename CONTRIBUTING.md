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

Fysen batches Vercel production releases so rapid development cannot consume the Hobby build-rate limit.

- Ordinary feature branches use GitHub CI only. They do not create Vercel deployments unless the branch is explicitly named `preview-*`.
- Merging to `main` accumulates the next release. A normal `main` merge does **not** build either Vercel project by itself.
- Production builds are released by changing the app-specific release marker: `apps/web/.vercel-release` for web and `apps/api/.vercel-release` for API.
- The marker contains the latest canonical `main` state included in that release. One marker update may therefore publish many merged changes at once.
- `apps/web/vercel.json` builds production only when the web release marker changes. `apps/api/vercel.json` does the same for the API marker.
- A web-only release updates only the web marker; an API-only release updates only the API marker. Shared changes may update both.
- `preview-*` branches retain dependency-aware Turborepo affected detection for deliberate visual/runtime previews.
- Vercel auto-cancels superseded Git jobs so the newest eligible release wins when release pushes happen close together.
- Do not create empty commits merely to redeploy. Advance the relevant release marker instead.
- Manual promotion or dashboard redeploy is a recovery mechanism, not part of everyday development.

This makes `main` the deployment queue while the release markers are the only production triggers. Preserve that separation unless Vercel is moved to a plan or CI/CD path where build-rate pressure is no longer relevant.

## Domain rule

Do not make source-specific fields canonical just because a provider exposes them. Add an adapter and preserve the Fysen domain boundary.

## Menu evidence rule

No searchable dish occurrence without a traceable source and verification timestamp.
