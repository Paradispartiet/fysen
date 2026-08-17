ALTER TABLE fysen.menu_items
  ADD COLUMN IF NOT EXISTS price_kind text NOT NULL DEFAULT 'exact';

ALTER TABLE fysen.menu_items
  ADD COLUMN IF NOT EXISTS price_max_minor integer;

ALTER TABLE fysen.menu_items
  DROP CONSTRAINT IF EXISTS menu_items_price_kind_check;

ALTER TABLE fysen.menu_items
  ADD CONSTRAINT menu_items_price_kind_check
  CHECK (price_kind IN ('exact', 'from', 'multiple'));

ALTER TABLE fysen.menu_items
  DROP CONSTRAINT IF EXISTS menu_items_price_shape_check;

ALTER TABLE fysen.menu_items
  ADD CONSTRAINT menu_items_price_shape_check
  CHECK (
    (
      price_kind = 'exact'
      AND price_max_minor IS NULL
    )
    OR
    (
      price_kind = 'from'
      AND price_minor IS NOT NULL
      AND price_max_minor IS NULL
    )
    OR
    (
      price_kind = 'multiple'
      AND price_minor IS NOT NULL
      AND price_max_minor IS NOT NULL
      AND price_max_minor >= price_minor
    )
  );

ALTER TABLE fysen.menu_items
  VALIDATE CONSTRAINT menu_items_price_kind_check;

ALTER TABLE fysen.menu_items
  VALIDATE CONSTRAINT menu_items_price_shape_check;
