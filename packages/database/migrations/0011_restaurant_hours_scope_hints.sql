ALTER TABLE fysen.restaurant_hours_sources
  ADD COLUMN IF NOT EXISTS scope_hints text[] NOT NULL DEFAULT ARRAY[]::text[];

ALTER TABLE fysen.restaurant_hours_sources
  DROP CONSTRAINT IF EXISTS restaurant_hours_sources_scope_hints_count_check;

ALTER TABLE fysen.restaurant_hours_sources
  ADD CONSTRAINT restaurant_hours_sources_scope_hints_count_check
  CHECK (cardinality(scope_hints) <= 8) NOT VALID;

ALTER TABLE fysen.restaurant_hours_sources
  VALIDATE CONSTRAINT restaurant_hours_sources_scope_hints_count_check;
