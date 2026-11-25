#!/usr/bin/env python3
"""Stage a complete Nordic restaurant refresh against v2, never overwrite input."""
import argparse
import copy
import gzip
import json
import runpy
from pathlib import Path

BUILD = runpy.run_path(str(Path(__file__).with_name("build-fysen-nordic-candidate.py")))
require, when, digest = (BUILD[name] for name in ("require", "when", "digest"))
stage_report, load, SOURCES, ROOT = (BUILD[name] for name in ("stage_report", "load", "SOURCES", "ROOT"))

def refresh_one(manifest, index, key, report, review, identity, source_map):
    """Validate first; then replace all rows and timestamps of one complete menu.

    No partial category update, implicit identity change, stale observation,
    or unreviewed price change is accepted. Other sources remain byte-for-byte
    equal at the row level. The caller may keep the previous candidate on error.
    """
    require(manifest["version"] == index["version"] == 2, "Expected v2 archive")
    require(manifest["archiveDate"] == index["archiveDate"], "Archive date mismatch")
    for key_name, count_key in (("restaurants", "restaurants"), ("sources", "sources"), ("items", "dishes")):
        require(len(index[key_name]) == manifest[count_key], "Archive count mismatch")
    staged, proof = stage_report(key, report, review, identity, source_map)
    restaurant = staged["restaurants"][0]
    matches = [i for i, row in enumerate(index["restaurants"]) if row[1] == restaurant[1]]
    require(len(matches) == 1, "Unknown or ambiguous restaurant")
    ri = matches[0]
    require(index["restaurants"][ri] == restaurant, "Restaurant identity changed")
    existing = [(i, row) for i, row in enumerate(index["sources"]) if row[0] == ri]
    existing_urls = {row[1]: i for i, row in existing}
    require(len(existing_urls) == len(existing) == len(staged["sources"]), "Ambiguous source set")
    require(set(existing_urls) == {row[1] for row in staged["sources"]}, "Source set changed; review migration")
    source_ids = set(existing_urls.values())
    quarantines = manifest.get("sourceQuarantines")
    require(bool(quarantines), "Missing quarantine metadata")
    require(not any(int(i) in source_ids or entry["slug"] == restaurant[1]
                    for i, entry in quarantines.items()), "Cannot refresh quarantined identity")
    new_at = when(proof["snapshotAt"])
    previous_times = [when(row[2]) for _, row in existing]
    require(all(new_at >= old for old in previous_times), "Stale or partial source report")
    remapped = [[existing_urls[staged["sources"][row[0]][1]], *row[1:]] for row in staged["items"]]
    previous = [row for row in index["items"] if row[0] in source_ids]
    # Same observation is an idempotent replay, never a chance to rewrite rows.
    if all(new_at == old for old in previous_times):
        require(sorted(previous, key=lambda r: (r[0], r[1])) ==
                sorted(remapped, key=lambda r: (r[0], r[1])), "Conflicting same-time menu")
        return manifest, index, {"status": "unchanged", "source": key, "proof": proof}
    require(all(new_at > old for old in previous_times), "Mixed observation timestamps")
    out, meta = copy.deepcopy(index), copy.deepcopy(manifest)
    for i in source_ids:
        out["sources"][i][2] = proof["snapshotAt"]
    out["items"] = [row for row in out["items"] if row[0] not in source_ids] + remapped
    meta["dishes"] = len(out["items"])
    # Preserve global archive refresh date; exact per-source observation time
    # is authoritative. Do not advance other restaurants' dates.
    return meta, out, {"status": "refreshed", "source": key, "proof": proof}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive", type=Path)
    parser.add_argument("source", choices=SOURCES)
    parser.add_argument("report", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    require(not args.output.exists(), "Output must be a new directory")
    meta = load(args.archive / "manifest.json")
    raw = (args.archive / "index.json.gz").read_bytes()
    require(len(raw) == meta["bytes"] and digest(raw) == meta["sha256"], "Archive integrity mismatch")
    index = json.loads(gzip.decompress(raw))
    m, i, proof = refresh_one(meta, index, args.source, load(args.report),
        load(ROOT / "docs/nordic-pilot-reviewed-food-menus.json"),
        load(ROOT / "docs/nordic-pilot-source-review.json"),
        load(ROOT / "docs/nordic-schonnemann-source-map.json"))
    data = gzip.compress(json.dumps(i, ensure_ascii=False, separators=(",", ":")).encode(), compresslevel=9, mtime=0)
    require(len(data) <= 4 * 1024 * 1024, "Compressed archive exceeds reader limit")
    m = {**m, "bytes": len(data), "sha256": digest(data)}
    args.output.mkdir(parents=True, exist_ok=False)
    (args.output / "index.json.gz").write_bytes(data)
    for name, value in (("manifest.json", m), ("nordic-refresh-proof.json", {"publication":"none", **proof})):
        (args.output / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Candidate only: " + proof["status"] + " " + args.source)

if __name__ == "__main__":
    main()
