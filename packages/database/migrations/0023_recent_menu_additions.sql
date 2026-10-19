-- Efficient recent additions and historic first-addition checks.
CREATE INDEX IF NOT EXISTS menu_changes_added_date_idx
  ON fysen.menu_changes (detected_at DESC)
  WHERE kind = 'added' AND item_source_key IS NOT NULL;

CREATE INDEX IF NOT EXISTS menu_changes_added_source_key_idx
  ON fysen.menu_changes (menu_source_id, item_source_key, detected_at, id)
  WHERE kind = 'added' AND item_source_key IS NOT NULL;
