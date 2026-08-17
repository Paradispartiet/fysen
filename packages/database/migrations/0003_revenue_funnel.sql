CREATE TABLE IF NOT EXISTS fysen.search_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  normalized_query text NOT NULL CHECK (char_length(normalized_query) BETWEEN 1 AND 300),
  city text NOT NULL CHECK (char_length(city) BETWEEN 1 AND 120),
  result_count integer NOT NULL CHECK (result_count BETWEEN 0 AND 50),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS search_events_query_occurred_idx
  ON fysen.search_events (normalized_query, occurred_at DESC);

CREATE INDEX IF NOT EXISTS search_events_city_occurred_idx
  ON fysen.search_events (city, occurred_at DESC);

CREATE INDEX IF NOT EXISTS search_events_zero_results_idx
  ON fysen.search_events (occurred_at DESC)
  WHERE result_count = 0;

CREATE TABLE IF NOT EXISTS fysen.search_result_impressions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id uuid NOT NULL REFERENCES fysen.search_events(id) ON DELETE CASCADE,
  menu_item_id uuid REFERENCES fysen.menu_items(id) ON DELETE SET NULL,
  restaurant_id uuid REFERENCES fysen.restaurants(id) ON DELETE SET NULL,
  rank integer NOT NULL CHECK (rank BETWEEN 1 AND 50),
  match_type text NOT NULL CHECK (match_type IN ('exact', 'prefix', 'contains', 'fuzzy')),
  match_score double precision NOT NULL CHECK (match_score BETWEEN 0 AND 1),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (search_id, rank),
  UNIQUE (search_id, menu_item_id)
);

CREATE INDEX IF NOT EXISTS search_result_impressions_restaurant_created_idx
  ON fysen.search_result_impressions (restaurant_id, created_at DESC);

CREATE INDEX IF NOT EXISTS search_result_impressions_menu_item_created_idx
  ON fysen.search_result_impressions (menu_item_id, created_at DESC);

CREATE TABLE IF NOT EXISTS fysen.conversion_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_event_id uuid NOT NULL UNIQUE,
  impression_id uuid NOT NULL REFERENCES fysen.search_result_impressions(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (
    event_type IN (
      'menu_clicked',
      'restaurant_clicked',
      'directions_clicked',
      'booking_clicked',
      'order_clicked'
    )
  ),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS conversion_events_impression_created_idx
  ON fysen.conversion_events (impression_id, created_at DESC);

CREATE INDEX IF NOT EXISTS conversion_events_type_created_idx
  ON fysen.conversion_events (event_type, created_at DESC);
