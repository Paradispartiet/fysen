"""Offline bounded Fysen 500-row D1 trial export; synthetic verified archive only."""
from __future__ import annotations

import gzip
import hashlib
import importlib.util
import json
import sqlite3
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "worker"))
spec = importlib.util.spec_from_file_location("fysen_d1_sample", ROOT / "worker" / "export_sample_d1.py")
sample = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sample)


class SampleExportTests(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.folder = Path(temp.name)
        self.manifest = self.folder / "manifest.json"
        self.archive = self.folder / "index.json.gz"
        self.output = self.folder / "preview-only.sql"

        restaurants = [
            [f"Spisested {i}", f"restaurant-{i}", f"Gata {i}", "Oslo" if i % 2 else "Bergen", "NO"]
            for i in range(14)
        ]
        sources = [[i, f"https://example.org/menu/{i}", "2026-11-13T10:00:00Z"] for i in range(14)]
        items = []
        # More than 500 distinct public items across ten source restaurants.
        for i in range(800):
            src = i % 10
            dish = f"Ramen løk {i}" if i % 4 == 0 else f"Pizza med ost {i}"
            items.append([src, dish, dish.casefold(), 10000 + i, "exact", None, "", ""])
        # Four quarantined identities must never appear in a public sample.
        for i in range(40):
            src = 10 + (i % 4)
            items.append([src, "Hemmelig forbudt rett", "hemmelig forbudt rett",
                          99900, "exact", None, "", ""])
        index = {
            "version": 1, "archiveDate": "2026-11-13",
            "restaurants": restaurants, "sources": sources, "items": items,
        }
        quarantine = {
            str(i): {"code": "identity-unverified", "slug": restaurants[i][1]}
            for i in range(10, 14)
        }
        blob = gzip.compress(json.dumps(index, ensure_ascii=False).encode("utf-8"))
        self.manifest.write_text(json.dumps({
            "version": 1, "archiveDate": "2026-11-13",
            "sha256": hashlib.sha256(blob).hexdigest(),
            "bytes": len(blob), "restaurants": len(restaurants),
            "sources": len(sources), "dishes": len(items),
            "sourceQuarantines": quarantine,
            "lastRefreshAt": "2026-11-13T11:00:00Z",
        }), encoding="utf-8")
        self.archive.write_bytes(blob)

    def test_reproducible_sample_sql_and_search_parity(self):
        receipt = sample.export_sample(self.manifest, self.archive, self.output, 500)
        self.assertEqual(receipt["sampleRows"], 500)
        self.assertEqual(receipt["sourcePublicRows"], 800)
        self.assertTrue(receipt["sampleRestaurants"] >= 8)
        self.assertFalse(receipt["remoteWrites"])
        self.assertLess(receipt["sqlBytes"], sample.MAX_SQL_BYTES)
        sql = self.output.read_text(encoding="utf-8")
        self.assertNotIn("Hemmelig forbudt rett", sql)
        self.assertNotIn("documents", sql)
        self.assertNotIn("public_ready", sql)
        self.assertNotIn("DROP TABLE", sql)
        self.assertNotIn("DELETE FROM", sql)
        self.assertIn("SELECT item_index FROM fysen_probe_items", sql)
        self.assertIn("CREATE VIRTUAL TABLE fysen_sample_trigrams", sql)
        self.assertLess(sql.index("INSERT INTO fysen_sample_items"),
                        sql.index("INSERT INTO fysen_sample_trigrams"))

        again = self.folder / "again.sql"
        other = sample.export_sample(self.manifest, self.archive, again, 500)
        self.assertEqual(self.output.read_bytes(), again.read_bytes())
        self.assertEqual(receipt["sampleRowsSha256"], other["sampleRowsSha256"])

        # Import to a synthetic local preview only; test is entirely offline.
        con = sqlite3.connect(":memory:")
        with self.assertRaises(sqlite3.OperationalError):
            con.executescript(sql)  # no fysen_probe_items means sample guard fails
        self.assertEqual(
            con.execute("SELECT COUNT(*) FROM sqlite_master WHERE name='fysen_sample_items'").fetchone()[0], 0
        )
        con.executescript("CREATE TABLE fysen_probe_items(item_index INTEGER PRIMARY KEY);"
                          "INSERT INTO fysen_probe_items VALUES(1);")
        con.executescript(sql)
        self.assertEqual(
            con.execute("SELECT COUNT(*) FROM fysen_sample_items").fetchone()[0], 500
        )
        self.assertEqual(
            con.execute("SELECT value FROM fysen_sample_meta WHERE key='sample_ready'").fetchone()[0],
            "true"
        )
        self.assertEqual(
            con.execute("SELECT value FROM fysen_sample_meta WHERE key='sample_rows_sha256'").fetchone()[0],
            receipt["sampleRowsSha256"]
        )
        for name in ("ramen", "pizza", "ost", "med"):
            base = con.execute(
                "SELECT COUNT(*) FROM fysen_sample_items WHERE instr(normalized_name, ?) > 0",
                (name,)
            ).fetchone()[0]
            indexed = con.execute(
                "SELECT COUNT(*) FROM fysen_sample_trigrams WHERE normalized_name LIKE ?",
                ("%" + name + "%",)
            ).fetchone()[0]
            self.assertEqual(base, indexed, name)
        self.assertEqual(
            con.execute("SELECT COUNT(*) FROM sqlite_master WHERE name='documents'").fetchone()[0], 0
        )
        con.close()

    def test_tampered_archive_stops_before_writing(self):
        self.archive.write_bytes(self.archive.read_bytes() + b"tampered")
        with self.assertRaises(ValueError):
            sample.export_sample(self.manifest, self.archive, self.output, 500)
        self.assertFalse(self.output.exists())

    def test_invalid_sample_size_and_existing_output_fail_closed(self):
        for count in (0, 501, -1, "500", True):
            with self.assertRaises(ValueError):
                sample.export_sample(self.manifest, self.archive, self.output, count)
        sample.export_sample(self.manifest, self.archive, self.output, 500)
        previous = self.output.read_bytes()
        with self.assertRaises(FileExistsError):
            sample.export_sample(self.manifest, self.archive, self.output, 100)
        self.assertEqual(previous, self.output.read_bytes())

    def test_small_sample_is_public_and_sql_quote_safe(self):
        report = sample.export_sample(self.manifest, self.archive, self.output, 12)
        self.assertEqual(report["sampleRows"], 12)
        con = sqlite3.connect(":memory:")
        con.executescript("CREATE TABLE fysen_probe_items(item_index INTEGER PRIMARY KEY);"
                          "INSERT INTO fysen_probe_items VALUES(1);")
        con.executescript(self.output.read_text(encoding="utf-8"))
        self.assertEqual(con.execute("SELECT COUNT(*) FROM fysen_sample_items").fetchone()[0], 12)
        self.assertEqual(con.execute(
            "SELECT COUNT(*) FROM fysen_sample_items WHERE source_url LIKE 'https://%'"
        ).fetchone()[0], 12)
        con.close()


if __name__ == "__main__":
    unittest.main()
