ALTER TABLE fysen.menu_sources
  ADD COLUMN IF NOT EXISTS max_response_bytes integer;

ALTER TABLE fysen.menu_sources
  DROP CONSTRAINT IF EXISTS menu_sources_max_response_bytes_check;

ALTER TABLE fysen.menu_sources
  ADD CONSTRAINT menu_sources_max_response_bytes_check
  CHECK (
    max_response_bytes IS NULL OR (
      max_response_bytes >= 65536 AND
      max_response_bytes <= 4194304
    )
  );
