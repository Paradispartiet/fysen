# Repository-based retry hook for Fysen restaurant catalog health.
#
# workflow_dispatch remains the preferred manual trigger. When an automation
# client cannot call workflow_dispatch, update the nonce below in a small PR.
# The health workflow is read-only and validates the complete canonical catalog.
nonce: 2026-08-26-post-viet-source-final-07
