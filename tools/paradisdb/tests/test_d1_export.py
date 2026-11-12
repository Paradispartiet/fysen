"""Public-only D1 exporter contract; no cloud account or network access needed."""
from __future__ import annotations

import importlib.util
import json
import sqlite3
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
def load(path: Path, module_name: str):
    spec = importlib.util.spec_from_file_location(module_name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

db = load(ROOT / "paradisdb.py", "paradisdb_local")
exporter = load(ROOT / "worker" / "export_d1.py", "paradisdb_export_d1")

PUBLIC_ROW = (
    4, "Mat & Mat", "mat-og-mat", "Løkka 3", "Oslo",
    "Ramen med løk og 'saus'", "ramen med løk og saus",
    19900, "exact", None,
    "https://example.org/menu?dish=4", "2026-11-11T11:00:00Z"
)
META = {
    "archiveDate": "2026-11-02", "lastRefreshAt": "2026-11-12T11:40:54.434Z",
    "sha256": "a" * 64, "restaurants": 973, "sources": 973,
    "originalItems": 47265, "publicItems": 1, "quarantinedSources": 4,
}

class ExportTests(unittest.TestCase):
    def setUp(self):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        self.path = Path(tmp.name)
        self.sqlite = self.path / "local.sqlite"
        self.sql = self.path / "public-export.sql"
        db.initialize(self.sqlite)
        con = sqlite3.connect(self.sqlite)
        with con:
            for key, value in META.items():
                con.execute("INSERT INTO metadata(key,value) VALUES (?,?)",
                            ("fysen_" + key, json.dumps(value, ensure_ascii=False)))
            con.execute("INSERT INTO fysen_public_items VALUES (" + ",".join(["?"] * 12) + ")", PUBLIC_ROW)
        con.close()

    def test_public_export_contains_zero_private_documents(self):
        db.put(self.sqlite, "aha", "private", {"secret": "DO_NOT_EXPORT"})
        db.put(self.sqlite, "footballmanager", "private", {"secret": "PRIVATE_PLAYER_STATE"})
        result = exporter.export_public(self.sqlite, self.sql)
        self.assertTrue(result["ok"])
        self.assertEqual(result["menuItems"], 1)
        self.assertFalse(result["realtime"])
        text = self.sql.read_text(encoding="utf8")
        self.assertNotIn("DO_NOT_EXPORT", text)
        self.assertNotIn("PRIVATE_PLAYER_STATE", text)
        self.assertNotIn("documents", text)
        self.assertNotIn("aha", text)
        self.assertNotIn("footballmanager", text)
        self.assertNotIn("user", text)
        self.assertNotIn("auth", text)
        self.assertIn("Mat & Mat", text)
        self.assertIn("løk", text)
        target = sqlite3.connect(":memory:")
        target.executescript(text)
        self.assertEqual(target.execute("SELECT COUNT(*) FROM fysen_public_items").fetchone()[0], 1)
        self.assertEqual(target.execute("SELECT value FROM public_archive_meta WHERE key='public_ready'").fetchone()[0], "true")
        self.assertEqual(target.execute("SELECT dish_name FROM fysen_public_items").fetchone()[0], PUBLIC_ROW[5])
        self.assertFalse(any(r[0] == "documents" for r in target.execute("SELECT name FROM sqlite_master WHERE type='table'")))
        target.close()
        self.assertLess(text.index("INSERT INTO fysen_public_items"),
                        text.index("VALUES ('public_ready','true')"))

    def test_incomplete_or_wrong_checksum_metadata_refuses_export(self):
        con = sqlite3.connect(self.sqlite)
        with con:
            con.execute("UPDATE metadata SET value=? WHERE key='fysen_publicItems'", ("2",))
        con.close()
        with self.assertRaises(ValueError):
            exporter.export_public(self.sqlite, self.sql)
        self.assertFalse(self.sql.exists())

    def test_cannot_overwrite_existing_sql_export(self):
        exporter.export_public(self.sqlite, self.sql)
        old = self.sql.read_bytes()
        with self.assertRaises(FileExistsError):
            exporter.export_public(self.sqlite, self.sql)
        self.assertEqual(self.sql.read_bytes(), old)

    def test_quote_is_sql_safe_for_untrusted_public_source_labels(self):
        self.assertEqual(exporter.quote("A'B"), "'A''B'")
        self.assertEqual(exporter.quote(None), "NULL")
        self.assertEqual(exporter.quote(100), "100")
        with self.assertRaises(ValueError):
            exporter.quote("bad\0value")
        with self.assertRaises(ValueError):
            exporter.quote({"bad": "object"})

if __name__ == "__main__":
    unittest.main()
