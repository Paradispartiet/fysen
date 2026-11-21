"Tests for ParadisDB local-only pilot; all input data are synthetic."
from __future__ import annotations

import gzip
import hashlib
import http.client
import importlib.util
import json
import tempfile
import threading
import unittest
from pathlib import Path
from http.server import ThreadingHTTPServer

SOURCE = Path(__file__).resolve().parents[1] / "paradisdb.py"
spec = importlib.util.spec_from_file_location("paradisdb", SOURCE)
db = importlib.util.module_from_spec(spec)
spec.loader.exec_module(db)

class ParadisDbTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.folder = Path(self.tmp.name)
        self.dbpath = self.folder / "db.sqlite"
        db.initialize(self.dbpath)

    def archive_files(self, *, tamper=False, invalid_quarantine=False, invalid_count=False):
        restaurants = [
            ["Ramenhuset", "ramenhuset", "Oslogata 1", "Oslo", "NO"],
            *[[f"Uavklart {i}", f"uavklart-{i}", "X 1", "Oslo", "NO"] for i in range(4)],
        ]
        sources = [[i, f"https://example.org/menu/{i}", "2026-11-11T10:00:00Z"] for i in range(5)]
        items = [
            [0, "Ramen med tofu", "ramen med tofu", 17500, "exact", None, "", ""],
            [0, "Blåbærgrøt", "blåbærgrøt", 12000, "exact", None, "", ""],
            [1, "Forbudt ramen", "ramen", 99900, "exact", None, "", ""],
        ]
        idx = {
            "version": 1, "archiveDate": "2026-11-12",
            "restaurants": restaurants, "sources": sources, "items": items,
        }
        quarantine = {
            str(i): {"code": "identity-unverified", "slug": restaurants[i][1]}
            for i in range(1, 5)
        }
        if invalid_quarantine:
            quarantine["1"]["slug"] = "incorrect-restaurant"
        blob = gzip.compress(json.dumps(idx, ensure_ascii=False).encode("utf-8"))
        manifest = {
            "version": 1, "archiveDate": "2026-11-12",
            "sha256": hashlib.sha256(blob).hexdigest(), "bytes": len(blob),
            "restaurants": 5, "sources": 5, "dishes": 3 + int(invalid_count),
            "sourceQuarantines": quarantine, "lastRefreshAt": "2026-11-12T10:00:00Z",
        }
        if tamper:
            blob += b"extra"
        m = self.folder / "manifest.json"
        a = self.folder / "index.json.gz"
        m.write_text(json.dumps(manifest), encoding="utf-8")
        a.write_bytes(blob)
        return m, a

    def test_initialize_and_namespaces_keep_app_data_separate(self):
        self.assertEqual(db.status(self.dbpath)["apps"]["aha"], 0)
        db.put(self.dbpath, "aha", "project:1", {"title": "Aha", "note": "Kun lokal pilot"})
        db.put(self.dbpath, "historygo", "project:1", {"title": "History GO"})
        self.assertEqual(db.get(self.dbpath, "aha", "project:1")["title"], "Aha")
        self.assertEqual(db.get(self.dbpath, "historygo", "project:1")["title"], "History GO")
        self.assertEqual(db.status(self.dbpath)["apps"]["aha"], 1)
        with self.assertRaises(ValueError):
            db.put(self.dbpath, "other", "key", {"x": 2})
        with self.assertRaises(ValueError):
            db.put(self.dbpath, "aha", "../invalid", {"x": 2})
        with self.assertRaises(FileExistsError):
            db.initialize(self.dbpath)

    def test_document_size_and_json_portability(self):
        with self.assertRaises(ValueError):
            db.put(self.dbpath, "aha", "huge", {"payload": "x" * (1024 * 1024 + 1)})
        self.assertEqual(db.status(self.dbpath)["apps"]["aha"], 0)
        document = {"tag": ["natur", "kunst"], "title": "Økonomi", "count": 1}
        db.put(self.dbpath, "paradisavisa", "article:1", document)
        self.assertEqual(db.get(self.dbpath, "paradisavisa", "article:1"), document)

    def test_verified_archive_import_preserves_source_and_excludes_quarantines(self):
        manifest, index = self.archive_files()
        result = db.import_fysen(self.dbpath, manifest, index)
        self.assertEqual(result["publicItems"], 2)
        self.assertEqual(result["quarantinedSources"], 4)
        self.assertFalse(result["realtime"])
        matches = db.search(self.dbpath, "ramen")
        self.assertEqual(matches["count"], 1)
        self.assertEqual(matches["results"][0]["restaurant"]["slug"], "ramenhuset")
        self.assertEqual(matches["results"][0]["menu"]["sourceUrl"], "https://example.org/menu/0")
        self.assertEqual(matches["results"][0]["menu"]["observedAt"], "2026-11-11T10:00:00Z")
        self.assertFalse(matches["realtime"])
        self.assertEqual(db.search(self.dbpath, "blåbær")["count"], 1)
        self.assertEqual(db.search(self.dbpath, "ramen", city="Bergen")["count"], 0)

    def test_bad_checksum_refuses_import_without_changing_existing_records(self):
        manifest, index = self.archive_files()
        db.import_fysen(self.dbpath, manifest, index)
        old = db.status(self.dbpath)
        self.archive_files(tamper=True)
        with self.assertRaises(ValueError):
            db.import_fysen(self.dbpath, manifest, index)
        self.assertEqual(db.status(self.dbpath), old)
        self.assertEqual(db.search(self.dbpath, "ramen")["count"], 1)

    def test_bad_quarantine_and_counts_fail_closed(self):
        manifest, index = self.archive_files(invalid_quarantine=True)
        with self.assertRaises(ValueError):
            db.import_fysen(self.dbpath, manifest, index)
        self.assertEqual(db.status(self.dbpath)["publicMenuItems"], 0)
        manifest, index = self.archive_files(invalid_count=True)
        with self.assertRaises(ValueError):
            db.import_fysen(self.dbpath, manifest, index)
        self.assertEqual(db.status(self.dbpath)["publicMenuItems"], 0)

    def test_search_parameterization_and_provenance(self):
        manifest, index = self.archive_files()
        db.import_fysen(self.dbpath, manifest, index)
        self.assertEqual(db.search(self.dbpath, "ramen' OR 1=1 --")["count"], 0)
        with self.assertRaises(ValueError):
            db.search(self.dbpath, "r")
        with self.assertRaises(ValueError):
            db.search(self.dbpath, "ramen", limit=10000)
        self.assertEqual(db.status(self.dbpath)["archiveDate"], "2026-11-12")

    def test_backup_checksum_and_new_path_restore(self):
        manifest, index = self.archive_files()
        db.import_fysen(self.dbpath, manifest, index)
        db.put(self.dbpath, "aha", "p:1", {"saved": True})
        backup_path = self.folder / "archive" / "backup.sqlite"
        details = db.backup(self.dbpath, backup_path)
        self.assertEqual(details["ok"], True)
        self.assertTrue(db.verify_backup(backup_path, Path(details["manifest"]))["ok"])
        restored = self.folder / "restored.sqlite"
        db.restore_backup(backup_path, Path(details["manifest"]), restored)
        self.assertEqual(db.get(restored, "aha", "p:1"), {"saved": True})
        self.assertEqual(db.search(restored, "ramen")["count"], 1)
        with self.assertRaises(FileExistsError):
            db.restore_backup(backup_path, Path(details["manifest"]), restored)
        with self.assertRaises(FileExistsError):
            db.backup(self.dbpath, backup_path)

    def test_corrupted_backup_hash_is_rejected_without_creating_restore(self):
        details = db.backup(self.dbpath, self.folder / "backup.sqlite")
        backup_path = Path(details["backup"])
        manifest = Path(details["manifest"])
        backup_path.write_bytes(backup_path.read_bytes() + b"tampered")
        target = self.folder / "restored.sqlite"
        with self.assertRaises(ValueError):
            db.restore_backup(backup_path, manifest, target)
        self.assertFalse(target.exists())

    def test_http_dashboard_is_loopback_read_only_and_exposes_no_private_documents(self):
        manifest, index = self.archive_files()
        db.import_fysen(self.dbpath, manifest, index)
        db.put(self.dbpath, "aha", "private", {"secret": "HIDDEN_PRIVATE_DOCUMENT"})
        server = ThreadingHTTPServer(("127.0.0.1", 0), db.make_handler(self.dbpath))
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        self.addCleanup(server.server_close)
        self.addCleanup(server.shutdown)
        port = server.server_port
        client = http.client.HTTPConnection("127.0.0.1", port, timeout=3)
        try:
            client.request("GET", "/", headers={"Host": f"localhost:{port}"})
            response = client.getresponse()
            body = response.read().decode("utf-8")
            self.assertEqual(response.status, 200)
            self.assertNotIn("HIDDEN_PRIVATE_DOCUMENT", body)
            self.assertIn("lokal pilot", body)
            client.request("GET", "/api/fysen/search?q=ramen", headers={"Host": f"localhost:{port}"})
            response = client.getresponse()
            obj = json.loads(response.read())
            self.assertEqual(obj["count"], 1)
            self.assertFalse(obj["realtime"])
            client.request("GET", "/api/aha/documents", headers={"Host": f"localhost:{port}"})
            response = client.getresponse()
            self.assertEqual(response.status, 404)
            response.read()
            client.request("POST", "/api/fysen/search", body="{}", headers={"Host": f"localhost:{port}"})
            response = client.getresponse()
            self.assertEqual(response.status, 405)
            response.read()
            client.request("GET", "/", headers={"Host": "evil.example"})
            response = client.getresponse()
            self.assertEqual(response.status, 403)
            response.read()
        finally:
            client.close()

    def test_admin_html_escapes_queries_and_outputs_public_source_dates(self):
        manifest, index = self.archive_files()
        db.import_fysen(self.dbpath, manifest, index)
        html = db.render_dashboard(self.dbpath, '<script>alert("x")</script>')
        self.assertNotIn('<script>', html)
        self.assertIn('&lt;script&gt;', html)
        page = db.render_dashboard(self.dbpath, "ramen")
        self.assertIn("2026-11-11T10:00:00Z", page)
        self.assertIn("Ingen sanntidsgaranti", page)

if __name__ == "__main__":
    unittest.main()
