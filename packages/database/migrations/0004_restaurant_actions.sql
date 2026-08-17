CREATE TABLE IF NOT EXISTS fysen.restaurant_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES fysen.restaurants(id) ON DELETE CASCADE,
  action_type text NOT NULL CHECK (action_type IN ('booking', 'order')),
  url text NOT NULL CHECK (url ~ '^https://'),
  source_url text NOT NULL CHECK (source_url ~ '^https://'),
  provider text CHECK (provider IS NULL OR char_length(provider) BETWEEN 1 AND 120),
  verification_method text NOT NULL CHECK (verification_method IN ('first_party_page', 'manual', 'provider_api')),
  verified_at timestamptz NOT NULL,
  expires_at timestamptz NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (expires_at > verified_at),
  UNIQUE (restaurant_id, action_type)
);

CREATE INDEX IF NOT EXISTS restaurant_actions_publishable_idx
  ON fysen.restaurant_actions (restaurant_id, action_type, expires_at)
  WHERE enabled = true;

CREATE TABLE IF NOT EXISTS fysen.restaurant_action_verification_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_action_id uuid NOT NULL REFERENCES fysen.restaurant_actions(id) ON DELETE CASCADE,
  outcome text NOT NULL CHECK (outcome IN ('verified', 'fetch_error')),
  started_at timestamptz NOT NULL,
  completed_at timestamptz NOT NULL,
  http_status integer CHECK (http_status IS NULL OR http_status BETWEEN 100 AND 599),
  error_code text,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS restaurant_action_verification_runs_action_started_idx
  ON fysen.restaurant_action_verification_runs (restaurant_action_id, started_at DESC);

INSERT INTO fysen.restaurant_actions (
  restaurant_id,
  action_type,
  url,
  source_url,
  provider,
  verification_method,
  verified_at,
  expires_at,
  enabled
)
SELECT
  restaurant.id,
  'booking',
  'https://www.rodeooslo.no/booking',
  'https://www.rodeooslo.no/booking',
  NULL,
  'first_party_page',
  now(),
  now() + interval '6 days',
  true
FROM fysen.restaurants AS restaurant
WHERE restaurant.slug = 'rodeo-oslo'
ON CONFLICT (restaurant_id, action_type) DO UPDATE SET
  url = EXCLUDED.url,
  source_url = EXCLUDED.source_url,
  provider = EXCLUDED.provider,
  verification_method = EXCLUDED.verification_method,
  verified_at = EXCLUDED.verified_at,
  expires_at = EXCLUDED.expires_at,
  enabled = EXCLUDED.enabled,
  updated_at = now();
