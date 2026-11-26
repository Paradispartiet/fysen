#!/usr/bin/env python3
"""Append verified reviewed Nordic rows to a COPY of v2, never publish."""
import argparse, copy, gzip, hashlib, json, re, unicodedata
from datetime import datetime, timezone, timedelta
from decimal import Decimal
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = {
    "puk": ("puk-vandkunsten-kobenhavn", "København", "DKK", {"lunch": 30, "dinner": 21}),
    "kvarnen": ("kvarnen-tjarhovsgatan-stockholm", "Stockholm", "SEK", {"a-la-carte": 35}),
    "taulu": ("taulu-kaivokatu-helsinki", "Helsinki", "EUR", {"a-la-carte": 24}),
}
NOTES = {
    "Remoulade variant": "Med remulade", "Shrimp variant": "Med reker",
    "Under 12 years only": "Kun barn under 12 år",
    "Two portion sizes": "To porsjonsstørrelser",
    "Selection varies": "Utvalget varierer",
    "Starter/main": "Forrett / hovedrett", "70g/120g": "70 g / 120 g",
    "Vegan variant available; confirm": "Vegansk variant – spør restauranten",
    "One/two scoops": "Én / to kuler",
}
def require(ok, message):
    if not ok:
        raise ValueError(message)
def load(path):
    return json.loads(path.read_text(encoding="utf-8"))
def digest(raw):
    return hashlib.sha256(raw).hexdigest()
def normalize(name):
    return " ".join(re.sub(r"[\W_]+", " ", unicodedata.normalize("NFKC", name).lower()).split())
def time(value):
    t = datetime.fromisoformat(value.replace("Z", "+00:00"))
    require(t.tzinfo is not None, "Missing observation timezone")
    return t
def amounts(field):
    parts = field.split("/")
    require(1 <= len(parts) <= 2 and all(re.fullmatch(r"\d{1,5}(?:[.,]\d{1,2})?", p) for p in parts), "Invalid reviewed price")
    nums = [int(Decimal(p.replace(",", ".")) * 100) for p in parts]
    require(nums[0] > 0 and (len(nums)==1 or nums[1]>nums[0]), "Invalid range")
    return nums[0], nums[1] if len(nums)==2 else None
def stage(meta, index, review, reports, now):
    require(meta["version"] == index["version"] == 2, "Expected v2 archive")
    require(meta["archiveDate"] == index["archiveDate"], "Archive date mismatch")
    require(review["status"] == "manual-source-review-only-not-production", "Unexpected review state")
    require(set(reports)==set(EXPECTED), "All three reports required")
    for key, count in (("restaurants","restaurants"),("sources","sources"),("items","dishes")):
        require(len(index[key]) == meta[count], "Count mismatch")
    require(all(len(row)==9 for row in index["items"]), "Invalid v2 row")
    out, m = copy.deepcopy(index), copy.deepcopy(meta)
    evidence = []
    for key,(slug,city,currency,counts) in EXPECTED.items():
        r = next(r for r in review["restaurants"] if r["restaurantSlug"]==slug)
        report = reports[key]
        require(r["city"]==report["city"]==city and r["currency"]==currency and report["restaurantSlug"]==slug, "Identity mismatch")
        require(report["status"]=="reviewed-rows-checked-not-completeness-proof" and report["publication"]=="none", "Invalid source report")
        require(not any(x[1]==slug for x in out["restaurants"]), "Restaurant already in archive; no duplicate append")
        require({x["service"]:len(x["items"]) for x in r["menus"]}==counts, "Unexpected review scope")
        require({x["service"]:len(x["items"]) for x in report["menus"]}==counts and len(report["menus"])==len(counts), "Incomplete live review")
        times = [time(x["observedAt"]) for x in report["menus"]]
        require(max(times)-min(times)<=timedelta(minutes=10), "Noncoherent service snapshot")
        require(all(timedelta(0)<=now-t<=timedelta(hours=2) for t in times), "Stale/future source evidence")
        snapshot = min(times).isoformat().replace("+00:00","Z")
        ri=len(out["restaurants"])
        out["restaurants"].append([r["name"],slug,r["address"],city,""])
        for menu in r["menus"]:
            service=menu["service"]
            actual=next(x for x in report["menus"] if x["service"]==service)
            require(actual["sourceUrl"]==menu["source"] and re.fullmatch(r"[0-9a-f]{64}",actual["rawSha256"]), "Invalid source proof")
            require(actual.get("sourceDeclaredPriceCheckDate")==menu.get("sourceDeclaredPriceCheckDate"), "Source price date mismatch")
            si=len(out["sources"])
            out["sources"].append([ri,menu["source"],snapshot])
            # Identical snapshot times retain simultaneous lunch and dinner sources.
            remaining=list(actual["items"])
            for row in menu["items"]:
                require(row["publishEligible"] is False, "Unexpected review state")
                p,mx=amounts(row["priceField"])
                want={"name":row["name"],"section":row["section"],"service":service,
                      "currency":currency,"priceMinor":p,"priceMaxMinor":mx,
                      "priceKind":"multiple" if mx is not None else "exact"}
                if "note" in row: want["note"]=row["note"]
                require(remaining.count(want)==1, "Missing/ambiguous reviewed row: "+row["name"])
                remaining.remove(want)
                label=[]
                if key=="puk": label.append("Lunsjmeny" if service=="lunch" else "Middagsmeny")
                if key in ("puk","kvarnen"): label.append("Sjekk servering i juleperioden")
                note=row.get("note")
                if note:
                    require(note in NOTES,"Unreviewed price condition")
                    label.append(NOTES[note])
                if menu.get("sourceDeclaredPriceCheckDate"):
                    label.append("Pris sjekket av kilden 19.10.2026")
                out["items"].append([si,row["name"],normalize(row["name"]),p,want["priceKind"],mx,"; ".join(label),"",currency])
            require(not remaining,"Unreviewed extra row")
            evidence.append({"slug":slug,"service":service,"sourceUrl":menu["source"],"observedAt":actual["observedAt"],"rawSha256":actual["rawSha256"],"count":len(menu["items"])})
    require(len(out["items"])==len(index["items"])+110,"Expected 110 appended offers")
    m.update(restaurants=len(out["restaurants"]),sources=len(out["sources"]),dishes=len(out["items"]))
    return m,out,evidence
def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument("archive",type=Path);p.add_argument("reports",type=Path);p.add_argument("output",type=Path)
    a=p.parse_args()
    require(not a.output.exists(),"Output already exists")
    meta=load(a.archive/"manifest.json")
    raw=(a.archive/"index.json.gz").read_bytes()
    require(len(raw)==meta["bytes"] and digest(raw)==meta["sha256"],"Archive integrity mismatch")
    index=json.loads(gzip.decompress(raw))
    m,i,e=stage(meta,index,load(ROOT/"docs/nordic-wave-2-menu-review.json"),{k:load(a.reports/(k+".json")) for k in EXPECTED},datetime.now(timezone.utc))
    data=gzip.compress(json.dumps(i,ensure_ascii=False,separators=(",",":")).encode(),compresslevel=9,mtime=0)
    require(len(data)<=4*1024*1024,"Archive reader size limit")
    m.update(bytes=len(data),sha256=digest(data))
    a.output.mkdir(parents=True,exist_ok=False)
    (a.output/"index.json.gz").write_bytes(data)
    for name,value in (("manifest.json",m),("proof.json",{"status":"reviewed-subset-candidate-not-published","publication":"none","evidence":e})):
        (a.output/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
if __name__=="__main__":
    main()
