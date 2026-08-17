ALTER TABLE fysen.menu_sources
  ADD COLUMN IF NOT EXISTS fetch_mode text NOT NULL DEFAULT 'http';

ALTER TABLE fysen.menu_sources
  DROP CONSTRAINT IF EXISTS menu_sources_fetch_mode_check;

ALTER TABLE fysen.menu_sources
  ADD CONSTRAINT menu_sources_fetch_mode_check
  CHECK (fetch_mode IN ('http', 'browser'));
