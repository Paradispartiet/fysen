#!/usr/bin/env python3
"""Build a deterministic, bounded Fysen public menu sample for a later D1 preview.

Offline-only: reads the SHA-verified public archive, generates a NEW SQL file.
Never connects to Cloudflare. Do NOT execute remotely without measured approval.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from paradisdb import hash_public_rows, verified_fysen_rows
from export_d1 import COLUMNS, MAX_ROWS_PER_INSERT, MAX_STATEMENT_BYTES, quote

MAX_SAMPLE_ROWS = 500
MAX_SQL_BYTES = 1_000_000
SAMPLE_TABLE = "fysen_sample_items"
FTS_TABLE = "fysen_sample_trigrams"


def sample_key(row: tuple) -> bytes:
    # Uniform deterministic sample of public menu rows, not first 500 in index.
    return hashlib.sha256(
        f"fysen-public-d1-sample-v1:{row[0]}:{row[2]}".encode("utf-8")
    ).digest()


def export_sample(manifest: Path, archive: Path, destination: Path, sample_rows: int = 500) -> dict:
    if type(sample_rows) is not int or not 1 <= sample_rows <= MAX_SAMPLE_ROWS:
        raise ValueError("Sample must contain between 1 and 500 rows")
    manifest, archive, destination = (p.expanduser().resolve() for p in
                                      (manifest, archive, destination))
    if destination.exists() or destination in (manifest, archive):
        raise FileExistsError("Output must be a new file, different from either source")
    # Entire source archive is validated (SHA, counts, quarantine identities,
    # dates and canonical row stream) BEFORE selecting any sample row.
    info, public_rows = verified_fysen_rows(manifest, archive)
    if sample_rows > len(public_rows):
        raise ValueError("Not enough verified public rows for the requested sample")

    selected = sorted(
        sorted(public_rows, key=lambda r: (sample_key(r), r[0]))[:sample_rows],
        key=lambda r: r[0],
    )
    digest = hash_public_rows(selected)
    unique_restaurants = len({r[2] for r in selected})
    unique_cities = sorted({r[4] for r in selected})

    lines = [
        "-- PREVIEW-ONLY Fysen D1 sample. NEVER import into paradisdb-fysen-public.",
        "-- Offline export; no Cloudflare credentials and no automatic remote operation.",
        f"-- Verified archive SHA256: {info['sha256']}",
        f"-- Selected canonical public-row SHA256: {digest}",
        "-- Refuse accidental use on an empty/permanent D1 lacking the four-row probe.",
        "SELECT item_index FROM fysen_probe_items WHERE item_index=1 LIMIT 1;",
        f"CREATE TABLE {SAMPLE_TABLE} (",
        " item_index INTEGER PRIMARY KEY,",
        " restaurant_name TEXT NOT NULL, restaurant_slug TEXT NOT NULL,",
        " address TEXT NOT NULL, city TEXT NOT NULL, dish_name TEXT NOT NULL,",
        " normalized_name TEXT NOT NULL, price_minor INTEGER,",
        " price_kind TEXT NOT NULL, price_max_minor INTEGER,",
        " source_url TEXT NOT NULL, observed_at TEXT NOT NULL",
        ");",
        "CREATE TABLE fysen_sample_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);",
    ]
    for key, value in (
        ("archive_sha256", info["sha256"]),
        ("public_rows_sha256", info["publicRowsSha256"]),
        ("sample_rows_sha256", digest),
        ("sample_count", sample_rows),
    ):
        lines.append(
            "INSERT INTO fysen_sample_meta(key,value) VALUES ("
            + quote(key) + "," + quote(str(value)) + ");"
        )
    prefix = f"INSERT INTO {SAMPLE_TABLE} ({','.join(COLUMNS)}) VALUES "
    batch: list[str] = []
    pending_bytes = len(prefix.encode("utf-8")) + 2
    for row in selected:
        encoded = "(" + ",".join(quote(value) for value in row) + ")"
        extra = len(encoded.encode("utf-8")) + (1 if batch else 0)
        if len(prefix.encode("utf-8")) + extra + 2 > MAX_STATEMENT_BYTES:
            raise ValueError("One sampled menu row exceeds allowed SQL size")
        if batch and (len(batch) >= MAX_ROWS_PER_INSERT
                      or pending_bytes + extra > MAX_STATEMENT_BYTES):
            lines.append(prefix + ",".join(batch) + ";")
            batch = []
            pending_bytes = len(prefix.encode("utf-8")) + 2
            extra = len(encoded.encode("utf-8"))
        batch.append(encoded)
        pending_bytes += extra
    if batch:
        lines.append(prefix + ",".join(batch) + ";")
    lines.extend([
        f"CREATE VIRTUAL TABLE {FTS_TABLE} USING fts5("
        f"normalized_name, content='{SAMPLE_TABLE}',"
        " content_rowid='item_index', tokenize='trigram');",
        f"INSERT INTO {FTS_TABLE}({FTS_TABLE}) VALUES('rebuild');",
        # This is only a sample marker. Never create "public_ready" in preview.
        "INSERT INTO fysen_sample_meta(key,value) VALUES ('sample_ready','true');",
    ])
    sql = "\n".join(lines) + "\n"
    if len(sql.encode("utf-8")) > MAX_SQL_BYTES:
        raise ValueError("Sample SQL output exceeds the 1 MB trial ceiling")
    destination.parent.mkdir(parents=True, exist_ok=True)
    try:
        with destination.open("x", encoding="utf-8", newline="\n") as out:
            out.write(sql)
    except Exception:
        destination.unlink(missing_ok=True)
        raise
    return {
        "ok": True, "mode": "offline-only", "remoteWrites": False,
        "sampleRows": sample_rows, "sourcePublicRows": len(public_rows),
        "sampleRestaurants": unique_restaurants, "sampleCities": unique_cities,
        "archiveSha256": info["sha256"],
        "publicRowsSha256": info["publicRowsSha256"],
        "sampleRowsSha256": digest,
        "sqlBytes": len(sql.encode("utf-8")),
        "output": str(destination),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Offline, public-only 1–500 row Fysen sample SQL.")
    parser.add_argument("manifest", type=Path)
    parser.add_argument("archive", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--rows", type=int, default=500)
    args = parser.parse_args()
    try:
        print(json.dumps(export_sample(args.manifest, args.archive, args.output, args.rows),
                         ensure_ascii=False, indent=2))
        return 0
    except (OSError, ValueError, TypeError) as error:
        print("Refusing Fysen sample export: " + str(error), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
