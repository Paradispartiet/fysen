#!/usr/bin/env python3
"""Export ONLY verified public Fysen rows from a local ParadisDB SQLite to D1 SQL.

No network, no Cloudflare credentials, no remote side effects.
The generated SQL is for an EMPTY isolated D1 database, not for live overwrite.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import sqlite3
from pathlib import Path

PUBLIC_SCHEMA = """
CREATE TABLE IF NOT EXISTS public_archive_meta (
    key TEXT PRIMARY KEY, value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS fysen_public_items (
    item_index INTEGER PRIMARY KEY,
    restaurant_name TEXT NOT NULL,
    restaurant_slug TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    dish_name TEXT NOT NULL,
    normalized_name TEXT NOT NULL,
    price_minor INTEGER,
    price_kind TEXT NOT NULL,
    price_max_minor INTEGER,
    source_url TEXT NOT NULL,
    observed_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_fysen_public_city_name
 ON fysen_public_items(city, normalized_name);
"""

COLUMNS = ("item_index", "restaurant_name", "restaurant_slug", "address", "city",
           "dish_name", "normalized_name", "price_minor", "price_kind", "price_max_minor",
           "source_url", "observed_at")
METADATA = ("archiveDate", "lastRefreshAt", "sha256", "publicRowsSha256", "restaurants", "sources",
            "originalItems", "publicItems", "quarantinedSources")
MAX_STATEMENT_BYTES = 64000

def quote(value: object) -> str:
    if value is None:
        return "NULL"
    if type(value) is int:
        return str(value)
    if type(value) is str:
        if "\x00" in value:
            raise ValueError("NUL not allowed in SQL export")
        return "'" + value.replace("'", "''") + "'"
    raise ValueError("Unexpected public row type")

def export_public(source: Path, destination: Path) -> dict:
    source = source.expanduser().resolve()
    destination = destination.expanduser().resolve()
    if not source.is_file() or destination.exists():
        raise FileExistsError("Source absent or SQL output exists; refusing overwrite")
    if source == destination:
        raise ValueError("Output must differ from database")
    from sqlite3 import connect
    con = connect(source.as_uri() + "?mode=ro", uri=True)
    con.row_factory = sqlite3.Row
    try:
        if con.execute("PRAGMA integrity_check").fetchone()[0] != "ok":
            raise ValueError("Source database failed SQLite integrity check")
        if con.execute("PRAGMA user_version").fetchone()[0] != 1:
            raise ValueError("Unsupported ParadisDB format")
        raw = {r["key"]: r["value"] for r in con.execute(
            "SELECT key,value FROM metadata WHERE key LIKE 'fysen_%'")}
        meta = {}
        for key in METADATA:
            raw_value = raw.get("fysen_" + key)
            if raw_value is None:
                raise ValueError("Missing verified Fysen archive metadata: " + key)
            meta[key] = json.loads(raw_value)
        count = con.execute("SELECT count(*) FROM fysen_public_items").fetchone()[0]
        if (not re.fullmatch("[a-f0-9]{64}", str(meta["sha256"])) or
            type(meta["publicItems"]) is not int or meta["publicItems"] != count or
            type(meta["originalItems"]) is not int or not count <= meta["originalItems"] or
            type(meta["quarantinedSources"]) is not int or
            meta["quarantinedSources"] < 4 or count < 1):
            raise ValueError("Public export is not backed by matching verified archive counts")
        # Recompute the actual canonical public row digest before writing any
        # export. A matching row count is not enough: a modified dish, price,
        # source date or restaurant can otherwise acquire a stale source hash.
        if not re.fullmatch("[a-f0-9]{64}", str(meta["publicRowsSha256"])):
            raise ValueError("Missing or invalid canonical public row digest")
        query = "SELECT " + ",".join(COLUMNS) + " FROM fysen_public_items ORDER BY item_index"
        digest = hashlib.sha256()
        for row in con.execute(query):
            digest.update(json.dumps(list(row), ensure_ascii=False, separators=(",", ":")).encode("utf-8"))
            digest.update(b"\n")
        if digest.hexdigest() != meta["publicRowsSha256"]:
            raise ValueError("Public row digest mismatch: local SQLite archive was modified after verification")
        destination.parent.mkdir(parents=True, exist_ok=True)
        # Write exclusively to a new path. An incomplete file is removed.
        try:
            with destination.open("x", encoding="utf-8", newline="\n") as out:
                out.write("-- ParadisDB public-only Fysen export; empty target required.\n")
                out.write("-- Contains only verified public menu records.\n")
                out.write(PUBLIC_SCHEMA + "\n")
                for key in METADATA:
                    out.write("INSERT INTO public_archive_meta(key,value) VALUES (" +
                              quote(key) + "," + quote(json.dumps(meta[key], ensure_ascii=False)) + ");\n")
                for row in con.execute(query):
                    values = ",".join(quote(row[k]) for k in COLUMNS)
                    statement = "INSERT INTO fysen_public_items VALUES (" + values + ");\n"
                    if len(statement.encode("utf-8")) > MAX_STATEMENT_BYTES:
                        raise ValueError("One public row is too large for the D1 export")
                    out.write(statement)
                # This is the final statement: a partial D1 import remains
                # unservable (503), rather than quietly exposing incomplete data.
                out.write("INSERT INTO public_archive_meta(key,value) VALUES ('public_ready','true');\n")
        except Exception:
            destination.unlink(missing_ok=True)
            raise
        return {
            "ok": True, "output": str(destination), "publicOnly": True,
            "restaurants": meta["restaurants"], "menuItems": count,
            "quarantinedSources": meta["quarantinedSources"],
            "realtime": False, "archiveSha256": meta["sha256"],
            "publicRowsSha256": meta["publicRowsSha256"],
            "bytes": destination.stat().st_size,
        }
    finally:
        con.close()

def main() -> int:
    parser = argparse.ArgumentParser(description="Export PUBLIC local ParadisDB archive for isolated D1 testing.")
    parser.add_argument("sqlite", type=Path)
    parser.add_argument("sql_output", type=Path)
    args = parser.parse_args()
    try:
        print(json.dumps(export_public(args.sqlite, args.sql_output),
                         ensure_ascii=False, indent=2))
        return 0
    except (OSError, ValueError, sqlite3.Error, TypeError) as error:
        import sys
        print("ParadisDB D1 export stopped safely: " + str(error), file=sys.stderr)
        return 1

if __name__ == "__main__":
    raise SystemExit(main())
