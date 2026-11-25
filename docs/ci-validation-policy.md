# Fysen CI policy

CI runs on every PR and stays the release gate. Asset-only changes in the explicitly listed dish-image paths run the existing image resolution, master integrity, gallery and source preflight tests without installing the workspace. Any code change alongside assets retains affected-package CI; workflow/dependency/configuration changes retain full CI. The responsive browser workflow still runs on web code, layout, branding and CSS, and can be dispatched manually. Native bundles run for shared contracts and native dependencies; the expensive native simulator runs for native source/dependency changes and on manual request, especially before native distribution. An API-only contract addition no longer starts macOS automatically.

Full Linux CI (lint, types, tests, build, database, menu-worker browser) runs nightly at 02:17 UTC and on manual dispatch. Scheduled CI does not deploy or mutate production. Existing per-ref cancellation remains enabled. Production release, quotas and public smoke tests are unchanged.

Never treat a missing check as a passed check. Use the relevant checks for the PR, and run native simulator manually if a shared-contract change affects device behavior. Use manual full CI for high-risk cross-cutting changes. GitHub schedules are best-effort and may be delayed.
