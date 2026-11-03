#!/usr/bin/env python3
"""Generate PUBLIC last-known-good Fysen search index, never raw historical logs."""
import gzip, hashlib, json, sys
from pathlib import Path
src,out=Path(sys.argv[1]),Path(sys.argv[2]); out.mkdir(parents=True,exist_ok=True)
def read(t):
    with (src/(t+".jsonl")).open(encoding="utf-8") as f:
        for l in f: yield json.loads(l)
restaurants={r["id"]:r for r in read("restaurants")}
sources={s["id"]:s for s in read("menu_sources")}
latest={}
for s in read("menu_snapshots"):
    prev=latest.get(s["menu_source_id"])
    if prev is None or (s["fetched_at"],s["id"]) > (prev["fetched_at"],prev["id"]):
        latest[s["menu_source_id"]]=s
eligible=sorted((s for s in sources.values() if s["enabled"] and restaurants.get(s["restaurant_id"],{}).get("active") and s["id"] in latest and 200 <= latest[s["id"]]["http_status"] < 300),key=lambda s:(restaurants[s["restaurant_id"]]["slug"],s["url"]))
rmap={};rs=[]
for s in eligible:
    r=restaurants[s["restaurant_id"]]
    if r["id"] not in rmap:
        rmap[r["id"]]=len(rs)
        rs.append([r["name"],r["slug"],r["address"],r["city"],r["website_url"] or ""])
ss=[[rmap[s["restaurant_id"]],s["url"],latest[s["id"]]["fetched_at"]] for s in eligible]
snap_to_src={latest[s["id"]]["id"]:i for i,s in enumerate(eligible)}
items=[]
for it in read("menu_items"):
    i=snap_to_src.get(it["snapshot_id"])
    if i is not None:
        items.append([i,it["original_name"],it["normalized_name"],it["price_minor"],it.get("price_kind") or "exact",it.get("price_max_minor"),(it.get("description") or "")[:180],it.get("section_name") or ""])
if (len(restaurants),len(sources),len(rs),len(items)) != (1116,1154,973,47628):
    raise SystemExit("Unexpected source coverage: abort before publication")
data={"version":1,"archiveDate":"2026-11-02","restaurants":rs,"sources":ss,"items":items}
raw=json.dumps(data,ensure_ascii=False,separators=(",",":")).encode("utf-8")
gz=gzip.compress(raw,compresslevel=9,mtime=0)
(out/"index.json.gz").write_bytes(gz)
manifest={"version":1,"archiveDate":"2026-11-02","restaurants":len(rs),"sources":len(ss),"dishes":len(items),"bytes":len(gz),"sha256":hashlib.sha256(gz).hexdigest(),"disclaimer":"Historiske, sist verifiserte menyer. Ikke sanntid. Sjekk restauranten for dagens pris og tilgjengelighet."}
(out/"manifest.json").write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
print("Generated public menu-only index, %s restaurants, %s dishes, %s compressed bytes"%(len(rs),len(items),len(gz)))
