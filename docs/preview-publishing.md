# Preview publishing

`fysen-preview` is a compiled public mirror of the current `fysen/main` web application.

## Invariant

Every push to `main` must trigger the static preview workflow. The workflow must:

1. build the static web preview;
2. stamp it with the exact `main` commit in `source-main-sha.txt`;
3. publish the snapshot to `Paradispartiet/fysen-preview` branch `site`;
4. dispatch the GitHub Pages deployment;
5. remain non-green until the public preview serves the same source SHA.

Publishing must fail loudly if the cross-repository token is missing or if either the `site` branch or the public GitHub Pages preview remains stale.

This file also acts as a docs-only canary: changes outside `apps/web` must still trigger the preview workflow after merge.
