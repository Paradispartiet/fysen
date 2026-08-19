CREATE TABLE IF NOT EXISTS fysen.aha_consumer_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aha_authorization_id uuid NOT NULL UNIQUE,
  aha_subject text NOT NULL CHECK (char_length(aha_subject) BETWEEN 1 AND 512),
  aha_provider text NOT NULL CHECK (char_length(aha_provider) BETWEEN 1 AND 120),
  scopes text[] NOT NULL CHECK (scopes = ARRAY['fysen:min_mat', 'fysen:analysis_handoff']::text[]),
  policy_version text NOT NULL CHECK (policy_version = 'aha_fysen_connection_v1'),
  token_hash char(64) NOT NULL UNIQUE CHECK (token_hash ~ '^[a-f0-9]{64}$'),
  expires_at timestamptz NOT NULL,
  last_seen_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (expires_at > created_at)
);

CREATE INDEX IF NOT EXISTS aha_consumer_sessions_subject_idx
  ON fysen.aha_consumer_sessions (aha_subject, created_at DESC);

CREATE TABLE IF NOT EXISTS fysen.min_mat_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aha_subject text NOT NULL CHECK (char_length(aha_subject) BETWEEN 1 AND 512),
  menu_item_id uuid NOT NULL,
  snapshot_id uuid NOT NULL,
  restaurant_id uuid NOT NULL,
  dish_name text NOT NULL CHECK (char_length(dish_name) BETWEEN 1 AND 300),
  restaurant_name text NOT NULL CHECK (char_length(restaurant_name) BETWEEN 1 AND 200),
  restaurant_slug text NOT NULL CHECK (char_length(restaurant_slug) BETWEEN 1 AND 160),
  city text NOT NULL CHECK (char_length(city) BETWEEN 1 AND 120),
  price_minor integer CHECK (price_minor IS NULL OR price_minor >= 0),
  currency char(3) NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
  saved_at timestamptz NOT NULL DEFAULT now(),
  removed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS min_mat_items_active_unique_idx
  ON fysen.min_mat_items (aha_subject, menu_item_id)
  WHERE removed_at IS NULL;

CREATE INDEX IF NOT EXISTS min_mat_items_subject_saved_idx
  ON fysen.min_mat_items (aha_subject, saved_at DESC)
  WHERE removed_at IS NULL;

CREATE TABLE IF NOT EXISTS fysen.aha_analysis_handoffs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aha_subject text NOT NULL CHECK (char_length(aha_subject) BETWEEN 1 AND 512),
  token_hash char(64) NOT NULL UNIQUE CHECK (token_hash ~ '^[a-f0-9]{64}$'),
  item_ids uuid[] NOT NULL CHECK (cardinality(item_ids) BETWEEN 1 AND 50),
  expires_at timestamptz NOT NULL,
  redeemed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (expires_at > created_at)
);

CREATE INDEX IF NOT EXISTS aha_analysis_handoffs_subject_idx
  ON fysen.aha_analysis_handoffs (aha_subject, created_at DESC);

CREATE TABLE IF NOT EXISTS fysen.aha_consumer_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aha_subject text NOT NULL CHECK (char_length(aha_subject) BETWEEN 1 AND 512),
  consumer_session_id uuid,
  action text NOT NULL CHECK (action IN (
    'session_created',
    'session_revoked',
    'min_mat_saved',
    'min_mat_removed',
    'handoff_issued',
    'handoff_redeemed'
  )),
  target_id uuid,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS aha_consumer_audit_subject_idx
  ON fysen.aha_consumer_audit_log (aha_subject, created_at DESC);

COMMENT ON TABLE fysen.aha_consumer_sessions IS
  'Consumer-only AHA sessions. Separate from restaurant claims and Fysen Pro. Raw session tokens are never stored.';
COMMENT ON TABLE fysen.min_mat_items IS
  'Private snapshots of dishes explicitly saved by an AHA-authenticated Fysen consumer. Does not mutate canonical menu evidence.';
COMMENT ON TABLE fysen.aha_analysis_handoffs IS
  'Short-lived one-time capabilities for explicit Min mat -> AHA analysis handoff. Raw handoff tokens are never stored.';
