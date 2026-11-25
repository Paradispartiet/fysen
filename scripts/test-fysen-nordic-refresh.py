#!/usr/bin/env python3
"""Exercise atomic updates on the actual v2 candidate with recorded proof.

Newer timestamps below are synthetic solely to test replacement semantics.
No synthetic observation is exported, uploaded or published.
"""
import copy
import gzip
import json
import runpy
import sys
from datetime import timedelta
from pathlib import Path

mod = runpy.run_path(str(Path(__file__).with_name("refresh-fysen-nordic-candidate.py")))
refresh, load, ROOT, when = (mod[k] for k in ("refresh_one", "load", "ROOT", "when"))
archive, reports = map(Path, sys.argv[1:])
meta = load(archive / "manifest.json")
index = json.loads(gzip.decompress((archive / "index.json.gz").read_bytes()))
review = load(ROOT / "docs/nordic-pilot-reviewed-food-menus.json")
identity = load(ROOT / "docs/nordic-pilot-source-review.json")
source_map = load(ROOT / "docs/nordic-schonnemann-source-map.json")

def apply(key, report, base_meta=meta, base_index=index):
    return refresh(base_meta, base_index, key, report, review, identity, source_map)

def shift(value, seconds):
    return (when(value) + timedelta(seconds=seconds)).isoformat().replace("+00:00", "Z")

def reject(fn, message):
    try:
        fn()
    except ValueError as e:
        assert message in str(e), str(e)
    else:
        raise AssertionError("Expected rejection: " + message)

for key in ("savotta", "pelikan", "schonnemann"):
    original = load(reports / (key + ".json"))
    assert apply(key, original)[2]["status"] == "unchanged"
    newer = copy.deepcopy(original)
    if key == "schonnemann":
        for evidence in newer["evidence"]:
            evidence["observedAt"] = shift(evidence["observedAt"], 60)
    else:
        newer["observedAt"] = shift(newer["observedAt"], 60)
    m, i, proof = apply(key, newer)
    assert proof["status"] == "refreshed"
    ri = next(n for n, r in enumerate(index["restaurants"]) if r[1] == proof["proof"]["slug"])
    ids = {n for n, source in enumerate(index["sources"]) if source[0] == ri}
    assert len(i["items"]) == len(index["items"])
    assert i["restaurants"] == index["restaurants"]
    assert m["sourceQuarantines"] == meta["sourceQuarantines"]
    assert all(i["sources"][n] == r for n, r in enumerate(index["sources"]) if n not in ids)
    assert all(i["sources"][n][2] == proof["proof"]["snapshotAt"] for n in ids)
    assert [r for r in i["items"] if r[0] not in ids] == [r for r in index["items"] if r[0] not in ids]
    assert [r for r in i["items"] if r[0] in ids] == [r for r in index["items"] if r[0] in ids]
    reject(lambda: apply(key, original, m, i), "Stale")
    incomplete = copy.deepcopy(newer)
    incomplete["items"].pop()
    reject(lambda: apply(key, incomplete), "Incomplete")
    wrong = copy.deepcopy(newer)
    wrong["items"][0]["priceMinor"] += 100
    reject(lambda: apply(key, wrong), "Reviewed price mismatch")
    wrong = copy.deepcopy(newer)
    wrong["items"][0]["currency"] = "NOK"
    reject(lambda: apply(key, wrong), "Invalid local price")
    if key == "schonnemann":
        incomplete = copy.deepcopy(newer)
        incomplete["evidence"].pop()
        reject(lambda: apply(key, incomplete), "Incomplete category proof")
    assert apply(key, newer, m, i)[2]["status"] == "unchanged"
    print("Atomic refresh, replay, stale/partial/price/currency rejection: " + key)
print("3/3 restaurant snapshots tested; no synthetic output written.")
