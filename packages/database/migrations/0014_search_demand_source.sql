ALTER TABLE fysen.search_events
  ADD COLUMN IF NOT EXISTS demand_source text;

UPDATE fysen.search_events
SET demand_source = 'legacy_unclassified'
WHERE demand_source IS NULL;

ALTER TABLE fysen.search_events
  ALTER COLUMN demand_source SET DEFAULT 'legacy_unclassified';

ALTER TABLE fysen.search_events
  ALTER COLUMN demand_source SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'search_events_demand_source_check'
      AND conrelid = 'fysen.search_events'::regclass
  ) THEN
    ALTER TABLE fysen.search_events
      ADD CONSTRAINT search_events_demand_source_check
      CHECK (demand_source IN ('legacy_unclassified', 'explicit_search'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS search_events_demand_source_occurred_idx
  ON fysen.search_events (demand_source, occurred_at DESC);
