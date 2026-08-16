CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE SCHEMA IF NOT EXISTS fysen;

CREATE TABLE IF NOT EXISTS fysen.restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (char_length(slug) BETWEEN 1 AND 160),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  website_url text,
  address text NOT NULL CHECK (char_length(address) BETWEEN 1 AND 500),
  city text NOT NULL CHECK (char_length(city) BETWEEN 1 AND 120),
  country_code char(2) NOT NULL DEFAULT 'NO' CHECK (country_code ~ '^[A-Z]{2}$'),
  location geography(Point, 4326) NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS restaurants_location_gist_idx
  ON fysen.restaurants USING gist (location);

CREATE TABLE IF NOT EXISTS fysen.menu_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES fysen.restaurants(id) ON DELETE CASCADE,
  url text NOT NULL UNIQUE CHECK (url ~ '^https?://'),
  source_type text NOT NULL CHECK (source_type IN ('html', 'json_ld', 'pdf', 'image', 'api')),
  enabled boolean NOT NULL DEFAULT true,
  user_agent text NOT NULL DEFAULT 'FysenMenuBot/0.1',
  check_interval_minutes integer NOT NULL DEFAULT 720 CHECK (check_interval_minutes BETWEEN 5 AND 10080),
  minimum_expected_items integer NOT NULL DEFAULT 1 CHECK (minimum_expected_items >= 1),
  etag text,
  last_modified text,
  last_http_status integer CHECK (last_http_status IS NULL OR last_http_status BETWEEN 100 AND 599),
  last_menu_fingerprint char(64) CHECK (last_menu_fingerprint IS NULL OR last_menu_fingerprint ~ '^[a-f0-9]{64}$'),
  last_checked_at timestamptz,
  last_changed_at timestamptz,
  next_check_at timestamptz NOT NULL DEFAULT now(),
  consecutive_failures integer NOT NULL DEFAULT 0 CHECK (consecutive_failures >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS menu_sources_due_idx
  ON fysen.menu_sources (next_check_at)
  WHERE enabled = true;

CREATE TABLE IF NOT EXISTS fysen.menu_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_source_id uuid NOT NULL REFERENCES fysen.menu_sources(id) ON DELETE CASCADE,
  fetched_at timestamptz NOT NULL,
  http_status integer NOT NULL CHECK (http_status BETWEEN 100 AND 599),
  response_content_type text,
  raw_sha256 char(64) NOT NULL CHECK (raw_sha256 ~ '^[a-f0-9]{64}$'),
  normalized_sha256 char(64) NOT NULL CHECK (normalized_sha256 ~ '^[a-f0-9]{64}$'),
  normalized_text text NOT NULL,
  etag text,
  last_modified text,
  robots_allowed boolean NOT NULL,
  fetch_duration_ms integer NOT NULL CHECK (fetch_duration_ms >= 0),
  extractor_version text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (menu_source_id, raw_sha256)
);

CREATE INDEX IF NOT EXISTS menu_snapshots_source_fetched_idx
  ON fysen.menu_snapshots (menu_source_id, fetched_at DESC);

CREATE TABLE IF NOT EXISTS fysen.menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_id uuid NOT NULL REFERENCES fysen.menu_snapshots(id) ON DELETE CASCADE,
  source_key char(64) NOT NULL CHECK (source_key ~ '^[a-f0-9]{64}$'),
  original_name text NOT NULL CHECK (char_length(original_name) BETWEEN 1 AND 300),
  normalized_name text NOT NULL CHECK (char_length(normalized_name) BETWEEN 1 AND 300),
  description text,
  section_name text,
  price_minor integer CHECK (price_minor IS NULL OR price_minor >= 0),
  currency char(3) NOT NULL DEFAULT 'NOK' CHECK (currency ~ '^[A-Z]{3}$'),
  position integer NOT NULL DEFAULT 0 CHECK (position >= 0),
  extraction_method text NOT NULL CHECK (extraction_method IN ('json_ld', 'html_heuristic', 'manual', 'api')),
  confidence double precision NOT NULL CHECK (confidence BETWEEN 0 AND 1),
  source_excerpt text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (snapshot_id, source_key)
);

CREATE INDEX IF NOT EXISTS menu_items_snapshot_idx
  ON fysen.menu_items (snapshot_id, position);

CREATE INDEX IF NOT EXISTS menu_items_normalized_name_trgm_idx
  ON fysen.menu_items USING gin (normalized_name gin_trgm_ops);

CREATE TABLE IF NOT EXISTS fysen.menu_changes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_source_id uuid NOT NULL REFERENCES fysen.menu_sources(id) ON DELETE CASCADE,
  previous_snapshot_id uuid REFERENCES fysen.menu_snapshots(id) ON DELETE SET NULL,
  current_snapshot_id uuid NOT NULL REFERENCES fysen.menu_snapshots(id) ON DELETE CASCADE,
  item_source_key char(64),
  kind text NOT NULL CHECK (kind IN ('added', 'removed', 'price_changed', 'content_changed')),
  before_value jsonb,
  after_value jsonb,
  detected_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS menu_changes_source_detected_idx
  ON fysen.menu_changes (menu_source_id, detected_at DESC);

CREATE TABLE IF NOT EXISTS fysen.menu_watch_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_source_id uuid NOT NULL REFERENCES fysen.menu_sources(id) ON DELETE CASCADE,
  snapshot_id uuid REFERENCES fysen.menu_snapshots(id) ON DELETE SET NULL,
  outcome text NOT NULL CHECK (outcome IN ('changed', 'unchanged', 'not_modified', 'blocked_by_robots', 'fetch_error', 'extraction_error', 'quarantined')),
  started_at timestamptz NOT NULL,
  completed_at timestamptz NOT NULL,
  http_status integer CHECK (http_status IS NULL OR http_status BETWEEN 100 AND 599),
  extracted_item_count integer CHECK (extracted_item_count IS NULL OR extracted_item_count >= 0),
  error_code text,
  error_message text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS menu_watch_runs_source_started_idx
  ON fysen.menu_watch_runs (menu_source_id, started_at DESC);
