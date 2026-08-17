CREATE TABLE IF NOT EXISTS fysen.dish_concepts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  canonical_name text NOT NULL CHECK (char_length(canonical_name) BETWEEN 1 AND 200),
  normalized_name text NOT NULL UNIQUE CHECK (char_length(normalized_name) BETWEEN 1 AND 300),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fysen.dish_aliases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dish_concept_id uuid NOT NULL REFERENCES fysen.dish_concepts(id) ON DELETE CASCADE,
  alias text NOT NULL CHECK (char_length(alias) BETWEEN 1 AND 200),
  normalized_alias text NOT NULL UNIQUE CHECK (char_length(normalized_alias) BETWEEN 1 AND 300),
  alias_scope text NOT NULL CHECK (alias_scope IN ('query', 'menu', 'both')),
  locale text NOT NULL DEFAULT 'und' CHECK (char_length(locale) BETWEEN 2 AND 35),
  curation_note text CHECK (curation_note IS NULL OR char_length(curation_note) <= 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS dish_aliases_concept_scope_idx
  ON fysen.dish_aliases (dish_concept_id, alias_scope);

ALTER TABLE fysen.search_result_impressions
  DROP CONSTRAINT IF EXISTS search_result_impressions_match_type_check;

ALTER TABLE fysen.search_result_impressions
  ADD CONSTRAINT search_result_impressions_match_type_check
  CHECK (match_type IN ('exact', 'canonical', 'prefix', 'contains', 'fuzzy'));

INSERT INTO fysen.dish_concepts (slug, canonical_name, normalized_name, active)
VALUES
  ('beef-tartare', 'Biff tartar', 'biff tartar', true),
  ('chicken-caesar-burger', 'Chicken Caesar Burger', 'chicken caesar burger', true)
ON CONFLICT (slug) DO UPDATE SET
  canonical_name = EXCLUDED.canonical_name,
  normalized_name = EXCLUDED.normalized_name,
  active = EXCLUDED.active,
  updated_at = now();

INSERT INTO fysen.dish_aliases (
  dish_concept_id,
  alias,
  normalized_alias,
  alias_scope,
  locale,
  curation_note
)
SELECT concept.id, alias.alias, alias.normalized_alias, alias.alias_scope, alias.locale, alias.curation_note
FROM (
  VALUES
    ('beef-tartare', 'Biff tartar', 'biff tartar', 'both', 'nb-NO', 'Canonical Norwegian full dish name.'),
    ('beef-tartare', 'Beef tartare', 'beef tartare', 'both', 'en', 'Direct English name for the same beef preparation.'),
    ('beef-tartare', 'Steak tartare', 'steak tartare', 'query', 'en', 'Common query name; not assumed to be a menu spelling.'),
    ('beef-tartare', 'Tartar av okse', 'tartar av okse', 'both', 'nb-NO', 'Observed full menu wording in the Oslo pilot.'),
    ('chicken-caesar-burger', 'Chicken Caesar Burger', 'chicken caesar burger', 'both', 'en', 'Canonical corrected spelling.'),
    ('chicken-caesar-burger', 'Chicken Ceasar Burger', 'chicken ceasar burger', 'both', 'en', 'Observed full menu spelling in the Oslo pilot.')
) AS alias(concept_slug, alias, normalized_alias, alias_scope, locale, curation_note)
JOIN fysen.dish_concepts AS concept ON concept.slug = alias.concept_slug
ON CONFLICT (normalized_alias) DO NOTHING;
