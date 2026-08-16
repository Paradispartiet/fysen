WITH restaurant AS (
  INSERT INTO fysen.restaurants (
    slug,
    name,
    website_url,
    address,
    city,
    country_code,
    location
  ) VALUES (
    'rodeo-oslo',
    'Rodeo',
    'https://www.rodeooslo.no/',
    'Sannergata 2',
    'Oslo',
    'NO',
    ST_SetSRID(ST_MakePoint(10.758157, 59.9285684), 4326)::geography
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    website_url = EXCLUDED.website_url,
    address = EXCLUDED.address,
    city = EXCLUDED.city,
    country_code = EXCLUDED.country_code,
    location = EXCLUDED.location,
    active = true,
    updated_at = now()
  RETURNING id
)
INSERT INTO fysen.menu_sources (
  restaurant_id,
  url,
  source_type,
  user_agent,
  check_interval_minutes,
  minimum_expected_items,
  enabled,
  next_check_at
)
SELECT
  id,
  'https://www.rodeooslo.no/',
  'html',
  'FysenMenuBot/0.1',
  360,
  5,
  true,
  now()
FROM restaurant
ON CONFLICT (restaurant_id, url) DO UPDATE SET
  source_type = EXCLUDED.source_type,
  user_agent = EXCLUDED.user_agent,
  check_interval_minutes = EXCLUDED.check_interval_minutes,
  minimum_expected_items = EXCLUDED.minimum_expected_items,
  enabled = true,
  next_check_at = LEAST(fysen.menu_sources.next_check_at, now()),
  updated_at = now();
