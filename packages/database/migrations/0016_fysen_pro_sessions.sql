CREATE TABLE IF NOT EXISTS fysen.restaurant_pro_setup_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  access_grant_id uuid NOT NULL REFERENCES fysen.restaurant_access_grants(id) ON DELETE CASCADE,
  token_hash char(64) NOT NULL UNIQUE CHECK (token_hash ~ '^[a-f0-9]{64}$'),
  expires_at timestamptz NOT NULL,
  redeemed_at timestamptz,
  revoked_at timestamptz,
  created_by text NOT NULL CHECK (char_length(created_by) BETWEEN 1 AND 200),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (expires_at > created_at),
  CHECK (redeemed_at IS NULL OR revoked_at IS NULL)
);

CREATE INDEX IF NOT EXISTS restaurant_pro_setup_tokens_grant_active_idx
  ON fysen.restaurant_pro_setup_tokens (access_grant_id, expires_at DESC)
  WHERE redeemed_at IS NULL AND revoked_at IS NULL;

CREATE TABLE IF NOT EXISTS fysen.restaurant_pro_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  access_grant_id uuid NOT NULL REFERENCES fysen.restaurant_access_grants(id) ON DELETE CASCADE,
  token_hash char(64) NOT NULL UNIQUE CHECK (token_hash ~ '^[a-f0-9]{64}$'),
  expires_at timestamptz NOT NULL,
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (expires_at > created_at)
);

CREATE INDEX IF NOT EXISTS restaurant_pro_sessions_grant_active_idx
  ON fysen.restaurant_pro_sessions (access_grant_id, expires_at DESC)
  WHERE revoked_at IS NULL;

CREATE TABLE IF NOT EXISTS fysen.restaurant_pro_access_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  access_grant_id uuid NOT NULL REFERENCES fysen.restaurant_access_grants(id) ON DELETE CASCADE,
  setup_token_id uuid REFERENCES fysen.restaurant_pro_setup_tokens(id) ON DELETE SET NULL,
  session_id uuid REFERENCES fysen.restaurant_pro_sessions(id) ON DELETE SET NULL,
  actor_ref text CHECK (actor_ref IS NULL OR char_length(actor_ref) BETWEEN 1 AND 200),
  event_type text NOT NULL CHECK (event_type IN (
    'setup_token_issued',
    'setup_token_redeemed',
    'session_created',
    'session_revoked'
  )),
  occurred_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS restaurant_pro_access_audit_grant_occurred_idx
  ON fysen.restaurant_pro_access_audit_log (access_grant_id, occurred_at DESC);
