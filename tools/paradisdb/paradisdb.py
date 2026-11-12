#!/usr/bin/env python3
"""ParadisDB v0: local-only SQLite pilot. No cloud credentials or production writes."""
from __future__ import annotations

import argparse
import gzip
import hashlib
import html
import io
import json
import re
import sqlite3
import sys
import unicodedata
from datetime import date, datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

VERSION = 1
MAX_COMPRESSED = 4 * 1024 * 1024
MAX_UNCOMPRESSED = 32 * 1024 * 1024
MAX_DOCUMENT = 1 * 1024 * 1024
APPS = ("fysen", "aha", "historygo", "paradisavisa", "civication", "footballmanager")

SCHEMA = """
CREATE TABLE IF NOT EXISTS metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS documents (
    app TEXT NOT NULL, document_key TEXT NOT NULL, value_json TEXT NOT NULL,
    updated_at TEXT NOT NULL, PRIMARY KEY(app, document_key)
);
CREATE TABLE IF NOT EXISTS fysen_public_items (
    item_index INTEGER PRIMARY KEY, restaurant_name TEXT NOT NULL,
    restaurant_slug TEXT NOT NULL, address TEXT NOT NULL, city TEXT NOT NULL,
    dish_name TEXT NOT NULL, normalized_name TEXT NOT NULL,
    price_minor INTEGER, price_kind TEXT NOT NULL, price_max_minor INTEGER,
    source_url TEXT NOT NULL, observed_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_fysen_public_city_name
 ON fysen_public_items(city, normalized_name);
"""

def connect(path: Path, readonly: bool = False) -> sqlite3.Connection:
    path = path.expanduser().resolve()
    if readonly:
        if not path.is_file():
            raise FileNotFoundError("Database does not exist; initialize explicitly")
        con = sqlite3.connect(path.as_uri() + "?mode=ro", uri=True)
    else:
        if not path.is_file():
            raise FileNotFoundError("Database does not exist; initialize explicitly")
        con = sqlite3.connect(path)
    con.row_factory = sqlite3.Row
    con.execute("PRAGMA busy_timeout=5000")
    return con

def initialize(path: Path) -> dict:
    path = path.expanduser().resolve()
    if path.exists():
        raise FileExistsError("Refusing to overwrite existing database")
    path.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(path)
    try:
        with con:
            con.executescript(SCHEMA)
            con.execute("PRAGMA user_version=1")
            con.execute("INSERT INTO metadata VALUES ('format_version', '1')")
    except Exception:
        con.close()
        path.unlink(missing_ok=True)
        raise
    finally:
        con.close()
    return {"ok": True, "database": str(path), "format": VERSION, "mode": "local-only"}

def validate_app(app: str) -> str:
    if app not in APPS:
        raise ValueError("Unknown app namespace (allowed: " + ", ".join(APPS) + ")")
    return app

def put(path: Path, app: str, key: str, value: object) -> dict:
    validate_app(app)
    if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9_.:-]{0,119}", key):
        raise ValueError("Invalid document key")
    payload = json.dumps(value, ensure_ascii=False, separators=(",", ":"), allow_nan=False)
    if len(payload.encode("utf-8")) > MAX_DOCUMENT:
        raise ValueError("Document exceeds 1 MiB limit")
    con = connect(path)
    try:
        with con:
            con.execute(
                """INSERT INTO documents VALUES (?, ?, ?, ?)
                ON CONFLICT(app, document_key) DO UPDATE SET
                value_json=excluded.value_json, updated_at=excluded.updated_at""",
                (app, key, payload, datetime.now(timezone.utc).isoformat()),
            )
        return {"ok": True, "app": app, "key": key, "bytes": len(payload.encode("utf-8"))}
    finally:
        con.close()

def get(path: Path, app: str, key: str) -> object:
    validate_app(app)
    con = connect(path, readonly=True)
    try:
        row = con.execute("SELECT value_json FROM documents WHERE app=? AND document_key=?", (app, key)).fetchone()
        if not row:
            raise ValueError("Document not found")
        return json.loads(row["value_json"])
    finally:
        con.close()

def normalize(text: str) -> str:
    return " ".join(re.findall(r"[^\W_]+", unicodedata.normalize("NFKC", text).casefold(), flags=re.UNICODE))

def valid_date(value: object) -> bool:
    try:
        if not isinstance(value, str):
            return False
        date.fromisoformat(value[:10])
        return bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}.*", value))
    except ValueError:
        return False

def valid_http_url(value: object) -> bool:
    if not isinstance(value, str):
        return False
    try:
        url = urlsplit(value)
        return url.scheme in ("https", "http") and bool(url.hostname) and not url.username and not url.password
    except ValueError:
        return False

def verified_fysen_rows(manifest_path: Path, compressed_path: Path) -> tuple[dict, list[tuple]]:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    if not isinstance(manifest, dict) or manifest.get("version") != 1:
        raise ValueError("Invalid Fysen archive manifest")
    blob = compressed_path.read_bytes()
    sha = hashlib.sha256(blob).hexdigest()
    if (not re.fullmatch(r"[a-f0-9]{64}", str(manifest.get("sha256", ""))) or
            manifest["sha256"] != sha or manifest.get("bytes") != len(blob) or
            not 100 <= len(blob) <= MAX_COMPRESSED):
        raise ValueError("Fysen archive SHA-256/size mismatch")
    with gzip.GzipFile(fileobj=io.BytesIO(blob)) as gz:
        raw = gz.read(MAX_UNCOMPRESSED + 1)
    if len(raw) > MAX_UNCOMPRESSED:
        raise ValueError("Fysen archive exceeds decompression limit")
    index = json.loads(raw)
    if (not isinstance(index, dict) or index.get("version") != 1 or
            not valid_date(manifest.get("archiveDate")) or
            index.get("archiveDate") != manifest["archiveDate"]):
        raise ValueError("Archive version/date mismatch")
    restaurants, sources, items = (index.get(k) for k in ("restaurants", "sources", "items"))
    if any(not isinstance(v, list) for v in (restaurants, sources, items)):
        raise ValueError("Invalid Fysen archive arrays")
    if (manifest.get("restaurants") != len(restaurants) or
            manifest.get("sources") != len(sources) or manifest.get("dishes") != len(items)):
        raise ValueError("Archive manifest row-count mismatch")
    for r in restaurants:
        if not isinstance(r, list) or len(r) < 5 or not all(isinstance(x, str) for x in r[:5]) or not r[0] or not r[1]:
            raise ValueError("Invalid restaurant record")
    for s in sources:
        if (not isinstance(s, list) or len(s) < 3 or type(s[0]) is not int or
                not 0 <= s[0] < len(restaurants) or not valid_http_url(s[1]) or not valid_date(s[2])):
            raise ValueError("Invalid source record")
    quarantine = manifest.get("sourceQuarantines")
    if not isinstance(quarantine, dict) or len(quarantine) < 4:
        raise ValueError("Missing required identity quarantine")
    hidden_sources, hidden_slugs = set(), set()
    for raw_index, entry in quarantine.items():
        if (not isinstance(entry, dict) or not re.fullmatch(r"0|[1-9]\d*", str(raw_index)) or
                not 0 <= int(raw_index) < len(sources) or entry.get("code") != "identity-unverified"):
            raise ValueError("Invalid identity quarantine")
        idx = int(raw_index)
        slug = restaurants[sources[idx][0]][1]
        if entry.get("slug") != slug:
            raise ValueError("Identity quarantine restaurant mismatch")
        hidden_sources.add(idx)
        hidden_slugs.add(slug)
    selected = []
    for index_id, item in enumerate(items):
        if (not isinstance(item, list) or len(item) < 8 or
                type(item[0]) is not int or not 0 <= item[0] < len(sources) or
                not isinstance(item[1], str) or not item[1].strip() or
                not isinstance(item[2], str) or not item[2].strip() or
                (item[3] is not None and (type(item[3]) is not int or item[3] < 0)) or
                item[4] not in ("exact", "from", "multiple") or
                (item[5] is not None and (type(item[5]) is not int or item[5] < 0)) or
                not isinstance(item[6], str) or not isinstance(item[7], str)):
            raise ValueError("Invalid dish record")
        sidx = item[0]
        restaurant = restaurants[sources[sidx][0]]
        if sidx in hidden_sources or restaurant[1] in hidden_slugs:
            continue
        source = sources[sidx]
        selected.append((
            index_id, restaurant[0], restaurant[1], restaurant[2], restaurant[3],
            item[1], item[2], item[3], item[4], item[5], source[1], source[2],
        ))
    info = {
        "sha256": sha, "archiveDate": manifest["archiveDate"],
        "lastRefreshAt": manifest.get("lastRefreshAt"),
        "restaurants": len(restaurants), "sources": len(sources),
        "originalItems": len(items), "publicItems": len(selected),
        "quarantinedSources": len(hidden_sources),
    }
    return info, selected

def import_fysen(path: Path, manifest_path: Path, compressed_path: Path) -> dict:
    info, rows = verified_fysen_rows(manifest_path, compressed_path)
    con = connect(path)
    try:
        # Validate the entire archive before opening the destructive part of
        # this transaction. Roll back every row and metadata on any failure.
        with con:
            con.execute("DELETE FROM fysen_public_items")
            con.executemany(
                """INSERT INTO fysen_public_items VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""", rows,
            )
            for key, value in info.items():
                con.execute(
                    "INSERT INTO metadata VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
                    ("fysen_" + key, json.dumps(value, ensure_ascii=False)),
                )
        return {"ok": True, "source": "verified-menu-archive", "realtime": False, **info}
    finally:
        con.close()

def status(path: Path) -> dict:
    con = connect(path, readonly=True)
    try:
        meta = {r["key"]: r["value"] for r in con.execute("SELECT key, value FROM metadata")}
        counts = {app: 0 for app in APPS}
        for row in con.execute("SELECT app, COUNT(*) AS total FROM documents GROUP BY app"):
            counts[row["app"]] = row["total"]
        public = con.execute("SELECT COUNT(*) FROM fysen_public_items").fetchone()[0]
        return {
            "format": VERSION, "mode": "local-only", "source": "verified-menu-archive",
            "realtime": False, "databaseBytes": path.stat().st_size,
            "apps": counts, "publicMenuItems": public,
            "archiveDate": json.loads(meta.get("fysen_archiveDate", "null")),
            "lastRefreshAt": json.loads(meta.get("fysen_lastRefreshAt", "null")),
            "archiveSha256": json.loads(meta.get("fysen_sha256", "null")),
        }
    finally:
        con.close()

def search(path: Path, query: str, city: str = "Oslo", limit: int = 20) -> dict:
    needle = normalize(query.strip())
    if len(needle) < 2 or len(needle) > 80:
        raise ValueError("Search query must be 2–80 normalized characters")
    if not 1 <= limit <= 50 or len(city) > 80:
        raise ValueError("Invalid city or result limit")
    con = connect(path, readonly=True)
    try:
        rows = con.execute(
            """SELECT *, CASE WHEN normalized_name=? THEN 3
                          WHEN substr(normalized_name, 1, length(?))=? THEN 2 ELSE 1 END AS relevance
               FROM fysen_public_items
               WHERE lower(city)=? AND instr(normalized_name, ?) > 0
               ORDER BY relevance DESC, observed_at DESC, restaurant_name, dish_name
               LIMIT 5000""",
            (needle, needle, needle, city.casefold(), needle),
        ).fetchall()
        result, seen, per_restaurant = [], set(), {}
        for r in rows:
            marker = (r["restaurant_slug"], r["normalized_name"], r["price_minor"])
            if marker in seen or per_restaurant.get(r["restaurant_slug"], 0) >= 2:
                continue
            seen.add(marker)
            per_restaurant[r["restaurant_slug"]] = per_restaurant.get(r["restaurant_slug"], 0) + 1
            result.append({
                "name": r["dish_name"], "normalizedName": r["normalized_name"],
                "priceMinor": r["price_minor"], "priceKind": r["price_kind"],
                "priceMaxMinor": r["price_max_minor"], "currency": "NOK",
                "restaurant": {
                    "name": r["restaurant_name"], "slug": r["restaurant_slug"],
                    "address": r["address"], "city": r["city"],
                },
                "menu": {"sourceUrl": r["source_url"], "observedAt": r["observed_at"]},
            })
            if len(result) >= limit:
                break
        info = status(path)
        return {
            "source": "verified-menu-archive", "realtime": False,
            "archiveDate": info["archiveDate"], "query": query, "city": city,
            "count": len(result), "results": result,
        }
    finally:
        con.close()

def backup(path: Path, destination: Path) -> dict:
    source = connect(path, readonly=True)
    destination = destination.expanduser().resolve()
    manifest = Path(str(destination) + ".sha256.json")
    if destination.exists() or manifest.exists():
        source.close()
        raise FileExistsError("Backup or checksum manifest already exists; refusing overwrite")
    destination.parent.mkdir(parents=True, exist_ok=True)
    try:
        target = sqlite3.connect(destination)
        try:
            source.backup(target)
        finally:
            target.close()
        if not verify_integrity(destination):
            raise ValueError("SQLite backup integrity check failed")
        digest = hashlib.sha256(destination.read_bytes()).hexdigest()
        details = {"format": VERSION, "sha256": digest, "bytes": destination.stat().st_size}
        manifest.write_text(json.dumps(details, indent=2) + "\n", encoding="utf-8")
        return {"ok": True, "backup": str(destination), "manifest": str(manifest), **details}
    except Exception:
        destination.unlink(missing_ok=True)
        manifest.unlink(missing_ok=True)
        raise
    finally:
        source.close()

def verify_integrity(path: Path) -> bool:
    con = connect(path, readonly=True)
    try:
        return con.execute("PRAGMA integrity_check").fetchone()[0] == "ok" and con.execute("PRAGMA user_version").fetchone()[0] == VERSION
    finally:
        con.close()

def verify_backup(source: Path, manifest: Path) -> dict:
    data = json.loads(manifest.read_text(encoding="utf-8"))
    if not isinstance(data, dict) or data.get("format") != VERSION:
        raise ValueError("Unsupported backup manifest")
    if source.stat().st_size != data.get("bytes") or hashlib.sha256(source.read_bytes()).hexdigest() != data.get("sha256"):
        raise ValueError("Backup size/checksum mismatch")
    if not verify_integrity(source):
        raise ValueError("Backup is corrupt or has an incompatible schema")
    return {"ok": True, "sha256": data["sha256"], "bytes": data["bytes"]}

def restore_backup(source: Path, manifest: Path, destination: Path) -> dict:
    proof = verify_backup(source, manifest)
    destination = destination.expanduser().resolve()
    if destination.exists():
        raise FileExistsError("Restore target already exists; refusing overwrite")
    destination.parent.mkdir(parents=True, exist_ok=True)
    original = connect(source, readonly=True)
    try:
        target = sqlite3.connect(destination)
        try:
            original.backup(target)
        finally:
            target.close()
        if not verify_integrity(destination):
            raise ValueError("Restored database failed integrity validation")
        return {"ok": True, "restored": str(destination), **proof}
    except Exception:
        destination.unlink(missing_ok=True)
        raise
    finally:
        original.close()

CSS = """body{font:16px/1.5 system-ui;background:#0e131b;color:#ecf3fc;max-width:1080px;margin:0 auto;padding:25px}
h1{font-size:clamp(1.6rem,4vw,2.4rem)}p{color:#b3c7d6}.card{background:#171f2b;border:1px solid #364559;border-radius:12px;padding:20px;margin:15px 0}
input,button{padding:11px;font:inherit;border-radius:8px;border:1px solid #73839b}input{background:#0b1019;color:white;width:min(80%,420px)}button{background:#b7dcff;cursor:pointer}
a{color:#a6d7fc}small{color:#a4bacc}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}strong{color:white}"""
def render_dashboard(path: Path, query: str = "") -> str:
    info = status(path)
    results = search(path, query, "Oslo", 20)["results"] if 2 <= len(normalize(query)) <= 80 else []
    app_cards = "".join(
        f'<div class="card"><strong>{html.escape(app)}</strong><p>{count} lokale dokumenter</p></div>'
        for app, count in info["apps"].items()
    )
    cards = "".join(
        '<article class="card"><strong>' + html.escape(r["name"]) + '</strong><p>'
        + html.escape(r["restaurant"]["name"]) + ' · ' + html.escape(r["restaurant"]["city"])
        + '</p><small>Arkivert ' + html.escape(r["menu"]["observedAt"])
        + ' · Ikke sanntid</small><p><a target="_blank" rel="noopener noreferrer" href="'
        + html.escape(r["menu"]["sourceUrl"], quote=True) + '">Dokumentert menykilde</a></p></article>'
        for r in results
    )
    return f"""<!doctype html><html lang="no"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ParadisDB – lokal kontroll</title><style>{CSS}</style></head><body>
<h1>ParadisDB <small>lokal pilot v1</small></h1>
<p>Åpent lagringsformat · Ingen abonnement · Ingen skytilkobling · Kun denne maskinen.</p>
<section class="card"><h2>Systemstatus</h2>
<p>Fysen: {info["publicMenuItems"]} offentlige menyregistreringer · Arkivdato: {html.escape(str(info["archiveDate"] or "ikke importert"))}</p>
<p>Database: {info["databaseBytes"]:,} byte · <strong>Ingen sanntidsgaranti</strong></p>
</section><h2>Apper</h2><div class="grid">{app_cards}</div>
<section class="card"><h2>Fysen: søk i verifisert arkiv</h2>
<form action="/" method="get"><label for="q">Rett</label><p>
<input id="q" name="q" maxlength="80" required value="{html.escape(query, quote=True)}" placeholder="f.eks. ramen">
<button type="submit">Søk</button></p></form>
<p>Kun kildebelagte, ikke-karantenerte arkivposter. Ingen automatisk innlogging eller dataopplasting.</p></section>
<h2>Resultater ({len(results)})</h2>{cards or '<p>Ingen resultater. Importer et kontrollert Fysen-arkiv for å starte.</p>'}
</body></html>"""

def make_handler(path: Path):
    class Handler(BaseHTTPRequestHandler):
        def send_body(self, code: int, content: bytes, content_type: str) -> None:
            self.send_response(code)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(content)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("X-Frame-Options", "DENY")
            self.send_header("Referrer-Policy", "no-referrer")
            self.send_header("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'")
            self.end_headers()
            self.wfile.write(content)
        def do_GET(self):
            host = self.headers.get("Host", "")
            port = self.server.server_address[1]
            if host not in (f"localhost:{port}", f"127.0.0.1:{port}"):
                return self.send_body(403, b"Forbidden", "text/plain")
            request = urlsplit(self.path)
            params = parse_qs(request.query)
            try:
                if request.path == "/":
                    data = render_dashboard(path, params.get("q", [""])[0]).encode("utf-8")
                    return self.send_body(200, data, "text/html; charset=utf-8")
                if request.path == "/api/status":
                    data = status(path)
                elif request.path == "/api/fysen/search":
                    data = search(path, params.get("q", [""])[0], params.get("city", ["Oslo"])[0],
                                  int(params.get("limit", ["20"])[0]))
                else:
                    return self.send_body(404, b"Not Found", "text/plain")
                return self.send_body(200, json.dumps(data, ensure_ascii=False).encode("utf-8"), "application/json; charset=utf-8")
            except (ValueError, sqlite3.Error):
                return self.send_body(400, b"Invalid request", "text/plain")
        def do_POST(self):
            self.send_body(405, b"Read-only preview: no HTTP writes", "text/plain")
        def log_message(self, _format, *_args):
            pass  # Avoid query/visitor logs even on the local preview.
    return Handler

def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description="ParadisDB: local, portable SQLite pilot (no Supabase).")
    sub = parser.add_subparsers(dest="command", required=True)
    for name in ("init", "status"):
        sub.add_parser(name).add_argument("db", type=Path)
    p = sub.add_parser("put"); p.add_argument("db", type=Path); p.add_argument("app"); p.add_argument("key"); p.add_argument("json_file", type=Path)
    p = sub.add_parser("get"); p.add_argument("db", type=Path); p.add_argument("app"); p.add_argument("key")
    p = sub.add_parser("import-fysen"); p.add_argument("db", type=Path); p.add_argument("manifest", type=Path); p.add_argument("index_gz", type=Path)
    p = sub.add_parser("search"); p.add_argument("db", type=Path); p.add_argument("q"); p.add_argument("--city", default="Oslo"); p.add_argument("--limit", type=int, default=20)
    p = sub.add_parser("backup"); p.add_argument("db", type=Path); p.add_argument("destination", type=Path)
    p = sub.add_parser("verify-backup"); p.add_argument("backup", type=Path); p.add_argument("manifest", type=Path)
    p = sub.add_parser("restore"); p.add_argument("backup", type=Path); p.add_argument("manifest", type=Path); p.add_argument("destination", type=Path)
    p = sub.add_parser("serve"); p.add_argument("db", type=Path); p.add_argument("--port", type=int, default=8765)
    args = parser.parse_args(argv)
    try:
        if args.command == "init": result = initialize(args.db)
        elif args.command == "status": result = status(args.db)
        elif args.command == "put": result = put(args.db, args.app, args.key, json.loads(args.json_file.read_text(encoding="utf-8")))
        elif args.command == "get": result = get(args.db, args.app, args.key)
        elif args.command == "import-fysen": result = import_fysen(args.db, args.manifest, args.index_gz)
        elif args.command == "search": result = search(args.db, args.q, args.city, args.limit)
        elif args.command == "backup": result = backup(args.db, args.destination)
        elif args.command == "verify-backup": result = verify_backup(args.backup, args.manifest)
        elif args.command == "restore": result = restore_backup(args.backup, args.manifest, args.destination)
        elif args.command == "serve":
            # No public network listener, no remote writes, no hosted service.
            connect(args.db, readonly=True).close()
            with ThreadingHTTPServer(("127.0.0.1", args.port), make_handler(args.db)) as server:
                print(f"ParadisDB local admin: http://127.0.0.1:{server.server_port}/")
                server.serve_forever()
            return 0
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0
    except (OSError, ValueError, KeyError, sqlite3.Error, TypeError) as error:
        print("ParadisDB stopped safely: " + str(error), file=sys.stderr)
        return 1

if __name__ == "__main__":
    raise SystemExit(main())
