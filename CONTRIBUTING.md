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

Fysen uses fully explicit Vercel production releases. Git pushes and merges must not create Vercel deployments automatically.

- `apps/web/vercel.json` and `apps/api/vercel.json` set `git.deploymentEnabled` to `false`. This applies to `main`, feature branches and preview branches alike.
- GitHub Pages is the normal Fysen working preview. Do not use Vercel Git previews for ordinary visual QA.
- Merging to `main` only changes canonical source. It does not deploy web or API to Vercel.
- Production is released only through the GitHub Actions workflow **Fysen explicit Vercel production release** (`.github/workflows/vercel-production-release.yml`).
- The release workflow locks the exact current `main` SHA before deploying. Web and API jobs both check out that locked SHA, so a later concurrent merge cannot silently change the release contents.
- The workflow can release `web`, `api`, or `both`. Select only the target that actually needs a production deployment.
- The workflow targets the existing Vercel projects through their stable team/project IDs and authenticates with the repository secret `VERCEL_TOKEN`.
- `VERCEL_TOKEN` must be a Vercel access token with permission to deploy both Fysen projects. Never commit the token or copy it into workflow source.
- Web releases are deployed explicitly with Vercel CLI to the `fysen` production project and then checked through the public production site.
- API releases are deployed explicitly with Vercel CLI to `fysen-api` and then checked through `/v1/health` and `/v1/dishes/browse?city=Oslo`.
- A failed verification is a failed production release even if Vercel completed a build. Investigate before retrying.
- Do not restore `.vercel-release`, `scripts/vercel-ignore.sh`, `ignoreCommand`, or branch allowlists as a deployment mechanism. They are obsolete in the explicit-release model.
- Do not create empty commits to trigger Vercel. Run the explicit production-release workflow against canonical `main` instead.

This architecture makes Vercel deployment creation an intentional release action rather than a side effect of repository activity. It protects the deployment quota while allowing development and GitHub Pages previews to continue independently.

## Domain rule

Do not make source-specific fields canonical just because a provider exposes them. Add an adapter and preserve the Fysen domain boundary.

## Menu evidence rule

No searchable dish occurrence without a traceable source and verification timestamp.
