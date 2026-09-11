ALTER TABLE fysen.menu_source_support_origins
  ADD COLUMN IF NOT EXISTS block_browser_request boolean NOT NULL DEFAULT false;

ALTER TABLE fysen.menu_source_support_origins
  DROP CONSTRAINT IF EXISTS menu_source_support_origin_has_purpose;

ALTER TABLE fysen.menu_source_support_origins
  ADD CONSTRAINT menu_source_support_origin_has_purpose CHECK (
    (
      block_browser_request
      AND NOT allow_redirect
      AND NOT allow_browser_data
    )
    OR (
      NOT block_browser_request
      AND (allow_redirect OR allow_browser_data)
    )
  );
