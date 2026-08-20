CREATE OR REPLACE FUNCTION fysen.dedupe_menu_item_source_key()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM fysen.menu_items
    WHERE snapshot_id = NEW.snapshot_id
      AND source_key = NEW.source_key
  ) THEN
    RETURN NULL;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS menu_items_dedupe_source_key ON fysen.menu_items;

CREATE TRIGGER menu_items_dedupe_source_key
BEFORE INSERT ON fysen.menu_items
FOR EACH ROW
EXECUTE FUNCTION fysen.dedupe_menu_item_source_key();
