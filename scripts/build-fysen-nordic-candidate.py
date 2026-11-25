#!/usr/bin/env python3
"""Build an isolated Nordic v2 archive candidate; never publish or overwrite input."""
import argparse
import copy
import gzip
import hashlib
import json
import re
import unicodedata
from datetime import datetime, timedelta
from decimal import Decimal
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCES = {
    "savotta": ("savotta-aleksanterinkatu-helsinki", "Helsinki", "EUR", 22),
    "pelikan": ("pelikan-blekingegatan-stockholm", "Stockholm", "SEK", 33),
    "schonnemann": ("schonnemann-hauser-plads-kobenhavn", "København", "DKK", 69),
}

def require(ok, message):
    if not ok:
        raise ValueError(message)

def digest(raw):
    return hashlib.sha256(raw).hexdigest()

def valid_digest(value):
    return isinstance(value, str) and re.fullmatch(r"[0-9a-f]{64}", value) is not None

def when(value):
    t = datetime.fromisoformat(value.replace("Z", "+00:00"))
    require(t.tzinfo is not None, "Observation must have a timezone")
    return t

def normalized(value):
    return " ".join(re.sub(r"[\W_]+", " ", unicodedata.normalize("NFKC", value).lower()).split())

def stage_report(key, report, review, identity, source_map):
    """Validate a complete reviewed restaurant report; local row IDs start at zero."""
    slug, city, currency, expected_count = SOURCES[key]
    out = {"restaurants": [], "sources": [], "items": []}
    provenance = {}
    require(review["status"] == "review-only-not-runtime" and identity["status"] == "reviewed-samples-not-production",
            "Unrecognized review data")
    menu = next(m for m in review["menus"] if m["restaurantSlug"] == slug)
    restaurant = next(r for r in identity["restaurants"] if r["slug"] == slug)
    require(menu["city"] == restaurant["city"] == city and menu["currency"] == restaurant["currency"] == currency,
            "Identity/currency mismatch")
    require(all(r["publishEligible"] is False for r in menu["items"]), "Unexpected review status")
    require(report["status"] == "review-required" and report["publication"] == "none", "Not a read-only source report")
    require(report.get("city", city) == city and report["priceChanges"] == [], "City mismatch or unreviewed price change")
    expected = {r["name"]: r for r in menu["items"]}
    actual = report["items"]
    require(len(expected) == len(actual) == expected_count and {r["name"] for r in actual} == set(expected),
            "Incomplete or duplicate menu")
    if key == "schonnemann":
        evidence = report["evidence"]
        sections = {s["sourceUrl"]: s["listedItems"] for s in source_map["sections"]}
        require(len(evidence) == len(sections) and {e["sourceUrl"]: e["items"] for e in evidence} == sections,
                "Incomplete category proof")
        require(valid_digest(report["menuIndexSha256"]), "Missing menu index proof")
        require(report["validFrom"] == source_map["validFrom"] and report["validThrough"] == source_map["validThrough"],
                "Wrong seasonal scope")
    else:
        require(report["sourceUrl"] == menu["source"], "Source URL mismatch")
        if key == "pelikan":
            require(report["menuPage"] == restaurant["menuPage"] and valid_digest(report["menuPageSha256"]),
                    "Missing first-party PDF link proof")
        evidence = [{"sourceUrl": report["sourceUrl"], "observedAt": report["observedAt"],
                     "rawSha256": report["rawSha256"], "items": expected_count}]
    require(all(valid_digest(e["rawSha256"]) for e in evidence), "Missing source digest")
    times = [when(e["observedAt"]) for e in evidence]
    require(max(times) - min(times) <= timedelta(minutes=10), "Category snapshot not coherent")
    # One conservative snapshot timestamp groups all category pages into a
    # complete menu. Exact per-page timestamps remain in the private proof.
    snapshot = min(times).isoformat().replace("+00:00", "Z")
    require(not any(r[1] == slug for r in out["restaurants"]), "Restaurant already exists")
    ri = len(out["restaurants"])
    out["restaurants"].append([restaurant["name"], slug, restaurant["address"], city, ""])
    source_ids = {}
    for e in evidence:
        source_ids[e["sourceUrl"]] = len(out["sources"])
        out["sources"].append([ri, e["sourceUrl"], snapshot])
    flags = []
    for item in actual:
        name = item["name"]
        previous = expected[name]
        source = previous.get("sourceUrl", menu["source"])
        require(source in source_ids, "Unknown item source")
        if key == "schonnemann":
            require(set(item["sourceUrls"]) == {source, *previous.get("alternateSourceUrls", [])}, "Item provenance mismatch")
        price = item["priceMinor"]
        max_price = item["priceMaxMinor"]
        kind = item["priceKind"]
        require(item["currency"] == currency and type(price) is int and price > 0, "Invalid local price")
        require((kind == "exact" and max_price is None) or
                (kind == "multiple" and type(max_price) is int and max_price > price), "Invalid price range")
        # Recheck the reviewed price fields independently; do not rely solely
        # on the probe's empty priceChanges list.
        parts = previous["priceField"].split("/")
        require(1 <= len(parts) <= 2 and all(re.fullmatch(r"\d{1,5}(?:[.,]\d{1,2})?", p.strip()) for p in parts),
                "Invalid reviewed price field")
        amounts = [int(Decimal(p.strip().replace(",", ".")) * 100) for p in parts]
        require(price == amounts[0] and max_price == (amounts[1] if len(amounts) == 2 else None),
                "Reviewed price mismatch")
        # A small, reviewed display vocabulary; never copy raw source HTML.
        note = previous.get("note")
        label = {
            "second price full portion": "Liten og stor porsjon",
            "per person; source 3,50/hlö": "Pris per person",
            "confirm availability with staff": "Spør restauranten om tilgjengelighet",
            "Alternative portion prices; preserve original slash notation.": "Alternative porsjonspriser",
            "Shared portion for two people; price is for platter.": "Pris for fat til to personer",
        }.get(note, "")
        require(not note or bool(label), "Unreviewed public price condition")
        if key == "savotta":
            require(bool(item.get("perPerson")) == (label == "Pris per person") and
                    bool(item.get("requiresAvailabilityConfirmation")) == (label == "Spør restauranten om tilgjengelighet"),
                    "Changed serving or availability condition")
        out["items"].append([source_ids[source], name, normalized(name), price, kind, max_price, label, "", currency])
        if previous.get("note") or item.get("perPerson") or item.get("requiresAvailabilityConfirmation"):
            flags.append({"name": name, "reviewNote": previous.get("note"), "perPerson": bool(item.get("perPerson")),
                          "requiresAvailabilityConfirmation": bool(item.get("requiresAvailabilityConfirmation"))})
    provenance[key] = {"slug": slug, "snapshotAt": snapshot, "evidence": evidence, "flags": flags}
    return out, provenance[key]

def make_candidate(manifest, index, reports, review, identity, source_map):
    require(manifest["version"] == index["version"] == 1, "Expected untouched v1 Oslo archive")
    require(manifest["archiveDate"] == index["archiveDate"], "Archive date mismatch")
    for key, count_key in (("restaurants", "restaurants"), ("sources", "sources"), ("items", "dishes")):
        require(len(index[key]) == manifest[count_key], "Archive count mismatch: " + key)
    require(bool(manifest.get("sourceQuarantines")), "Missing quarantine metadata")
    for key, record in manifest["sourceQuarantines"].items():
        source = index["sources"][int(key)]
        require(index["restaurants"][source[0]][1] == record["slug"] and record["code"] == "identity-unverified",
                "Quarantine identity mismatch")
    require(all(len(row) == 8 and index["restaurants"][index["sources"][row[0]][0]][3].strip().lower() == "oslo"
                for row in index["items"]), "Unexpected non-Oslo or non-v1 data")
    require(set(reports) == set(SOURCES), "All three successful source reports are required")
    out = copy.deepcopy(index)
    meta = copy.deepcopy(manifest)
    out["version"] = meta["version"] = 2
    out["items"] = [row + ["NOK"] for row in out["items"]]
    provenance = {}
    require(review["status"] == "review-only-not-runtime" and identity["status"] == "reviewed-samples-not-production",
            "Unrecognized review data")
    for key in SOURCES:
        staged, proof = stage_report(key, reports[key], review, identity, source_map)
        restaurant = staged["restaurants"][0]
        require(not any(r[1] == restaurant[1] for r in out["restaurants"]), "Restaurant already exists")
        ri, si = len(out["restaurants"]), len(out["sources"])
        out["restaurants"].append(restaurant)
        out["sources"].extend([[ri, row[1], row[2]] for row in staged["sources"]])
        out["items"].extend([[row[0] + si, *row[1:]] for row in staged["items"]])
        provenance[key] = proof
    meta.update(restaurants=len(out["restaurants"]), sources=len(out["sources"]), dishes=len(out["items"]))
    return meta, out, {"status": "candidate-not-published", "publication": "none", "sources": provenance}

def load(path):
    return json.loads(path.read_text(encoding="utf-8"))

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive", type=Path, help="Read-only copy of v1 archive")
    parser.add_argument("reports", type=Path, help="Directory containing three successful probe JSON reports")
    parser.add_argument("output", type=Path, help="New candidate directory, never the public index")
    args = parser.parse_args()
    require(not args.output.exists(), "Output directory must not exist")
    meta = load(args.archive / "manifest.json")
    raw = (args.archive / "index.json.gz").read_bytes()
    require(len(raw) == meta["bytes"] and digest(raw) == meta["sha256"], "Archive integrity mismatch")
    index = json.loads(gzip.decompress(raw))
    reports = {key: load(args.reports / (key + ".json")) for key in SOURCES}
    m, i, proof = make_candidate(meta, index, reports,
        load(ROOT / "docs/nordic-pilot-reviewed-food-menus.json"),
        load(ROOT / "docs/nordic-pilot-source-review.json"),
        load(ROOT / "docs/nordic-schonnemann-source-map.json"))
    data = gzip.compress(json.dumps(i, ensure_ascii=False, separators=(",", ":")).encode(), compresslevel=9, mtime=0)
    require(len(data) <= 4 * 1024 * 1024, "Compressed archive exceeds reader limit")
    m.update(bytes=len(data), sha256=digest(data))
    args.output.mkdir(parents=True, exist_ok=False)
    (args.output / "index.json.gz").write_bytes(data)
    for name, value in (("manifest.json", m), ("nordic-preview-proof.json", proof)):
        (args.output / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Candidate only: %d restaurants, %d dishes; no public writes." % (m["restaurants"], m["dishes"]))

if __name__ == "__main__":
    main()
