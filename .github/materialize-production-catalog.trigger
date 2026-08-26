# Repository-based retry hook for Materialize Fysen production catalog.
#
# workflow_dispatch remains the preferred manual trigger. When an automation
# client cannot call workflow_dispatch, update the nonce below in a small PR.
# The materializer is idempotent and production reconcile runs after success.
nonce: 2026-08-26-post-semeny-rendered-health-retry-01
