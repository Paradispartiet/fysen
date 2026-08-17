CREATE TABLE IF NOT EXISTS fysen.restaurant_hours_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES fysen.restaurants(id) ON DELETE CASCADE,
  service_type text NOT NULL CHECK (service_type IN ('kitchen')),
  url text NOT NULL CHECK (url ~ '^https://'),
  time_zone text NOT NULL CHECK (char_length(time_zone) BETWEEN 1 AND 100),
  extractor text NOT NULL CHECK (extractor IN ('visible_text_v1')),
  check_interval_minutes integer NOT NULL CHECK (check_interval_minutes BETWEEN 60 AND 10080),
  minimum_expected_intervals integer NOT NULL CHECK (minimum_expected_intervals BETWEEN 1 AND 14),
  etag text,
  last_modified text,
  last_schedule_fingerprint text CHECK (last_schedule_fingerprint IS NULL OR last_schedule_fingerprint ~ '^[a-f0-9]{64}$'),
  last_checked_at timestamptz,
  last_changed_at timestamptz,
  next_check_at timestamptz NOT NULL DEFAULT now(),
  consecutive_failures integer NOT NULL DEFAULT 0 CHECK (consecutive_failures >= 0),
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (restaurant_id, service_type)
);

CREATE INDEX IF NOT EXISTS restaurant_hours_sources_due_idx
  ON fysen.restaurant_hours_sources (next_check_at, id)
  WHERE enabled = true;

CREATE TABLE IF NOT EXISTS fysen.restaurant_hours_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid NOT NULL REFERENCES fysen.restaurant_hours_sources(id) ON DELETE CASCADE,
  fetched_at timestamptz NOT NULL,
  raw_sha256 text NOT NULL CHECK (raw_sha256 ~ '^[a-f0-9]{64}$'),
  schedule_fingerprint text NOT NULL CHECK (schedule_fingerprint ~ '^[a-f0-9]{64}$'),
  extractor_version text NOT NULL CHECK (char_length(extractor_version) BETWEEN 1 AND 100),
  interval_count integer NOT NULL CHECK (interval_count BETWEEN 1 AND 28),
  source_excerpt text CHECK (source_excerpt IS NULL OR char_length(source_excerpt) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS restaurant_hours_snapshots_source_fetched_idx
  ON fysen.restaurant_hours_snapshots (source_id, fetched_at DESC, created_at DESC);

CREATE TABLE IF NOT EXISTS fysen.restaurant_hours_intervals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_id uuid NOT NULL REFERENCES fysen.restaurant_hours_snapshots(id) ON DELETE CASCADE,
  iso_weekday smallint NOT NULL CHECK (iso_weekday BETWEEN 1 AND 7),
  opens_at time NOT NULL,
  closes_at time NOT NULL,
  closes_next_day boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (snapshot_id, iso_weekday, opens_at, closes_at, closes_next_day),
  CHECK (closes_next_day OR closes_at > opens_at)
);

CREATE INDEX IF NOT EXISTS restaurant_hours_intervals_snapshot_day_idx
  ON fysen.restaurant_hours_intervals (snapshot_id, iso_weekday, opens_at, closes_at);

CREATE TABLE IF NOT EXISTS fysen.restaurant_hours_watch_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid NOT NULL REFERENCES fysen.restaurant_hours_sources(id) ON DELETE CASCADE,
  snapshot_id uuid REFERENCES fysen.restaurant_hours_snapshots(id) ON DELETE SET NULL,
  outcome text NOT NULL CHECK (outcome IN ('changed', 'unchanged', 'not_modified', 'fetch_error', 'extraction_error', 'quarantined')),
  started_at timestamptz NOT NULL,
  completed_at timestamptz NOT NULL,
  http_status integer CHECK (http_status IS NULL OR http_status BETWEEN 100 AND 599),
  error_code text,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS restaurant_hours_watch_runs_source_started_idx
  ON fysen.restaurant_hours_watch_runs (source_id, started_at DESC);

INSERT INTO fysen.restaurant_hours_sources (
  restaurant_id,
  service_type,
  url,
  source_url,
  provider,
  time_zone,
  extractor,
  check_interval_minutes,
  minimum_expected_intervals,
  next_check_at,
  enabled
)
SELECT
  restaurant.id,
  'kitchen',
  'https://www.rodeooslo.no/',
  'https://www.rodeooslo.no/',
  NULL,
  'Europe/Oslo',
  'visible_text_v1',
  720,
  5,
  now(),
  true
FROM fysen.restaurants AS restaurant
WHERE restaurant.slug = 'rodeo-oslo'
ON CONFLICT (restaurant_id, service_type) DO UPDATE SET
  url = EXCLUDED.url,
  source_url = EXCLUDED.source_url,
  provider = EXCLUDED.provider,
  time_zone = EXCLUDED.time_zone,
  extractor = EXCLUDED.extractor,
  check_interval_minutes = EXCLUDED.check_interval_minutes,
  minimum_expected_intervals = EXCLUDED.minimum_expected_intervals,
  next_check_at = LEAST(fysen.restaurant_hours_sources.next_check_at, now()),
  enabled = true,
  updated_at = now();
