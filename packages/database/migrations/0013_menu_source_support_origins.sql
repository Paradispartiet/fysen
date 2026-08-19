CREATE TABLE IF NOT EXISTS fysen.menu_source_support_origins (
  menu_source_id uuid NOT NULL REFERENCES fysen.menu_sources(id) ON DELETE CASCADE,
  origin text NOT NULL,
  allow_redirect boolean NOT NULL DEFAULT false,
  allow_browser_data boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (menu_source_id, origin),
  CONSTRAINT menu_source_support_origin_https CHECK (
    origin ~ '^https://[^/?#]+$' AND origin !~ '@'
  ),
  CONSTRAINT menu_source_support_origin_has_purpose CHECK (
    allow_redirect OR allow_browser_data
  )
);

CREATE INDEX IF NOT EXISTS menu_source_support_origins_menu_source_idx
  ON fysen.menu_source_support_origins(menu_source_id);
