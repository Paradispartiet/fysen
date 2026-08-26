INSERT INTO fysen.dish_concepts (slug, canonical_name, normalized_name, active)
VALUES ('spring-rolls', 'Spring Rolls', 'spring rolls', true)
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
SELECT
  concept.id,
  'Spring Rolls',
  'spring rolls',
  'both',
  'en',
  'Exact menu wording observed in the active Viet Kitchen catalog source.'
FROM fysen.dish_concepts AS concept
WHERE concept.slug = 'spring-rolls'
ON CONFLICT (normalized_alias) DO NOTHING;
