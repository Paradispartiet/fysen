ALTER TABLE fysen.menu_items
  DROP CONSTRAINT IF EXISTS menu_items_extraction_method_check;

ALTER TABLE fysen.menu_items
  ADD CONSTRAINT menu_items_extraction_method_check
  CHECK (extraction_method IN ('json_ld', 'html_heuristic', 'pdf_text', 'manual', 'api'))
  NOT VALID;

ALTER TABLE fysen.menu_items
  VALIDATE CONSTRAINT menu_items_extraction_method_check;
