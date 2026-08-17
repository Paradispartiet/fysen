# Contributing to Fysen

## Branch discipline

- `main` is production-bound and should remain green.
- Product changes go through focused branches and pull requests.
- Do not mix refactors, dependency upgrades and product behavior in the same PR without a concrete reason.

## Required quality gate

```bash
pnpm check
```

A change is not complete while lint, typecheck, tests or build are red.

## Deployment discipline

Fysen uses automatic Git deployments. Normal product work must not require manual Vercel promotion.

- Prefer one pushed commit per logical change when several files belong to the same implementation. Do not push a sequence of file-by-file commits merely because multiple files are being edited.
- Ordinary feature branches use GitHub CI only and do not create Vercel deployments.
- Use a branch named `preview-*` only when an explicit Vercel preview is useful for visual or runtime QA.
- Merge to `main` is the normal production release path.
- The `fysen` web project uses Turborepo affected detection for `@fysen/web`. Frontend changes build web; changes to web dependencies such as `@fysen/contracts` also build web automatically.
- The `fysen-api` project uses affected detection for `@fysen/api`. API changes and changes to its workspace dependencies (`@fysen/contracts`, `@fysen/database`, `@fysen/menu-core`) build the API automatically.
- Documentation-only changes should not build either Vercel project.
- A shared package change intentionally builds every deployed app that depends on that package.
- Vercel auto-cancels superseded Git jobs so the newest eligible commit wins when pushes happen close together.
- Manual promotion or redeploy is a recovery mechanism, not part of everyday development.

The Vercel branch gates and `ignoreCommand` rules are stored with each app in `apps/web/vercel.json` and `apps/api/vercel.json`. Keep these dependency-aware rules instead of hand-maintained file lists unless the workspace graph can no longer express the deployment boundary.

## Domain rule

Do not make source-specific fields canonical just because a provider exposes them. Add an adapter and preserve the Fysen domain boundary.

## Menu evidence rule

No searchable dish occurrence without a traceable source and verification timestamp.
