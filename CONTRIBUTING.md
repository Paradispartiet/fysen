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

## Domain rule

Do not make source-specific fields canonical just because a provider exposes them. Add an adapter and preserve the Fysen domain boundary.

## Menu evidence rule

No searchable dish occurrence without a traceable source and verification timestamp.
