CREATE TABLE IF NOT EXISTS fysen.restaurant_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES fysen.restaurants(id) ON DELETE CASCADE,
  claimant_name text NOT NULL CHECK (char_length(claimant_name) BETWEEN 2 AND 160),
  claimant_email text NOT NULL CHECK (
    claimant_email = lower(claimant_email)
    AND char_length(claimant_email) BETWEEN 3 AND 320
    AND position('@' IN claimant_email) > 1
  ),
  claimant_role text NOT NULL CHECK (claimant_role IN ('owner', 'manager', 'authorized_agent')),
  evidence_url text CHECK (evidence_url IS NULL OR evidence_url ~ '^https://'),
  evidence_note text CHECK (evidence_note IS NULL OR char_length(evidence_note) BETWEEN 20 AND 2000),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'withdrawn')),
  submitted_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,
  review_note text CHECK (review_note IS NULL OR char_length(review_note) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (evidence_url IS NOT NULL OR evidence_note IS NOT NULL),
  CHECK (
    (status IN ('pending', 'withdrawn') AND reviewed_at IS NULL)
    OR (status IN ('verified', 'rejected') AND reviewed_at IS NOT NULL)
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS restaurant_claims_pending_identity_idx
  ON fysen.restaurant_claims (restaurant_id, claimant_email)
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS restaurant_claims_restaurant_status_idx
  ON fysen.restaurant_claims (restaurant_id, status, submitted_at DESC);

CREATE TABLE IF NOT EXISTS fysen.restaurant_access_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES fysen.restaurants(id) ON DELETE CASCADE,
  claim_id uuid NOT NULL UNIQUE REFERENCES fysen.restaurant_claims(id) ON DELETE RESTRICT,
  principal_email text NOT NULL CHECK (
    principal_email = lower(principal_email)
    AND char_length(principal_email) BETWEEN 3 AND 320
    AND position('@' IN principal_email) > 1
  ),
  role text NOT NULL CHECK (role IN ('owner', 'manager', 'authorized_agent')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
  granted_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (
    (status = 'active' AND revoked_at IS NULL)
    OR (status = 'revoked' AND revoked_at IS NOT NULL)
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS restaurant_access_grants_active_identity_idx
  ON fysen.restaurant_access_grants (restaurant_id, principal_email)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS restaurant_access_grants_restaurant_status_idx
  ON fysen.restaurant_access_grants (restaurant_id, status, granted_at DESC);

CREATE TABLE IF NOT EXISTS fysen.restaurant_owned_profiles (
  restaurant_id uuid PRIMARY KEY REFERENCES fysen.restaurants(id) ON DELETE CASCADE,
  display_name text CHECK (display_name IS NULL OR char_length(display_name) BETWEEN 1 AND 200),
  public_contact_email text CHECK (
    public_contact_email IS NULL
    OR (char_length(public_contact_email) BETWEEN 3 AND 320 AND position('@' IN public_contact_email) > 1)
  ),
  public_contact_phone text CHECK (public_contact_phone IS NULL OR char_length(public_contact_phone) BETWEEN 3 AND 40),
  website_url text CHECK (website_url IS NULL OR website_url ~ '^https://'),
  short_description text CHECK (short_description IS NULL OR char_length(short_description) BETWEEN 1 AND 1000),
  updated_by_access_grant_id uuid NOT NULL REFERENCES fysen.restaurant_access_grants(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fysen.restaurant_claim_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES fysen.restaurants(id) ON DELETE CASCADE,
  claim_id uuid REFERENCES fysen.restaurant_claims(id) ON DELETE SET NULL,
  access_grant_id uuid REFERENCES fysen.restaurant_access_grants(id) ON DELETE SET NULL,
  actor_type text NOT NULL CHECK (actor_type IN ('claimant', 'reviewer', 'system')),
  actor_ref text CHECK (actor_ref IS NULL OR char_length(actor_ref) BETWEEN 1 AND 200),
  event_type text NOT NULL CHECK (event_type IN (
    'claim_submitted',
    'claim_verified',
    'claim_rejected',
    'claim_withdrawn',
    'access_granted',
    'access_revoked',
    'owner_fields_updated'
  )),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object'),
  occurred_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS restaurant_claim_audit_restaurant_occurred_idx
  ON fysen.restaurant_claim_audit_log (restaurant_id, occurred_at DESC);

CREATE INDEX IF NOT EXISTS restaurant_claim_audit_claim_occurred_idx
  ON fysen.restaurant_claim_audit_log (claim_id, occurred_at DESC)
  WHERE claim_id IS NOT NULL;
