#!/usr/bin/env python3
"""Offline FTS5 trigram search cost candidate over real, verified public rows.

Build the index on an isolated copy, never on the production/archive database.
This is a *benchmark and compatibility gate*, not a Worker search migration.
"""
from __future__ import annotations

import json
import shutil
import sqlite3
import sys
import tempfile
from pathlib import Path

CHECKS = ("ramen", "burger", "pizza", "sushi", "pasta", "salat", "taco", "tofu")

def rowids(con: sqlite3.Connection, name: str) -> set[int]:
    return {r[0] for r in con.execute(
        "SELECT item_index FROM fysen_public_items WHERE instr(normalized_name, ?) > 0",
        (name,),
    )}

def trigram_ids(con: sqlite3.Connection, name: str) -> set[int]:
    return {r[0] for r in con.execute(
        "SELECT rowid FROM fysen_public_trigrams WHERE normalized_name LIKE ?",
        ("%" + name + "%",),
    )}

def main(path: Path) -> dict:
    if not path.is_file():
        raise FileNotFoundError("Real public SQLite/D1 fixture missing")
    with tempfile.TemporaryDirectory(prefix="paradisdb-fts5-") as tmp:
        candidate = Path(tmp) / "candidate.sqlite"
        shutil.copyfile(path, candidate)
        con = sqlite3.connect(candidate)
        try:
            con.execute("PRAGMA busy_timeout=10000")
            initial = con.execute("SELECT COUNT(*) FROM fysen_public_items").fetchone()[0]
            if initial != 47265:
                raise ValueError("Expected exactly 47,265 real public rows")
            baseline_plan = con.execute(
                "EXPLAIN QUERY PLAN SELECT item_index FROM fysen_public_items"
                " WHERE instr(normalized_name, 'ramen') > 0"
            ).fetchall()
            con.execute(
                "CREATE VIRTUAL TABLE fysen_public_trigrams USING fts5("
                "normalized_name, content='fysen_public_items',"
                "content_rowid='item_index', tokenize='trigram')"
            )
            con.execute(
                "INSERT INTO fysen_public_trigrams(fysen_public_trigrams) VALUES('rebuild')"
            )
            con.commit()
            indexed_plan = con.execute(
                "EXPLAIN QUERY PLAN SELECT rowid FROM fysen_public_trigrams"
                " WHERE normalized_name LIKE '%ramen%'"
            ).fetchall()
            if not any("VIRTUAL TABLE INDEX" in str(row[-1]) for row in indexed_plan):
                raise AssertionError("Expected FTS5 virtual-table indexed query plan")
            for term in CHECKS:
                raw, indexed = rowids(con, term), trigram_ids(con, term)
                if raw != indexed:
                    raise AssertionError(
                        "FTS5 parity failure for %r: missing=%s unexpected=%s" %
                        (term, sorted(raw - indexed)[:8], sorted(indexed - raw)[:8])
                    )
            size = candidate.stat().st_size
            # Even an isolated 47k-record pilot must leave substantial headroom
            # below the current 500 MB per-database Cloudflare D1 Free limit.
            if size > 400_000_000:
                raise ValueError("FTS5 index exceeded the 400 MB budget guard")
            return {
                "ok": True,
                "publicRows": initial,
                "indexedTermsChecked": len(CHECKS),
                "filenameBytes": size,
                "baselinePlan": [r[-1] for r in baseline_plan],
                "fts5Plan": [r[-1] for r in indexed_plan],
                "mode": "isolated-offline-sqlite-candidate",
                "productionChanged": False,
            }
        finally:
            con.close()

if __name__ == "__main__":
    try:
        report = main(Path(sys.argv[1]))
        print(json.dumps(report, ensure_ascii=False, indent=2))
    except Exception as error:
        print("FTS5 candidate stopped: " + str(error), file=sys.stderr)
        raise SystemExit(1)
