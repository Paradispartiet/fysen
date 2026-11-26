#!/usr/bin/env python3
"""Read-only Icelandic reviewed menu candidate; exclude unresolved bilingual prices."""
import argparse, copy, gzip, hashlib, json, re, unicodedata
from datetime import datetime, timezone, timedelta
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
EXPECTED={
 "rok":("rok-frakkastigur-reykjavik","https://www.rokrestaurant.is/dinner",34,30),
 "gamla":("gamla-reykjavik-austurstraeti","https://www.gamlareykjavik.is/en",24,24),
 "krons":("krons-laugavegur-reykjavik","https://krons.is/",23,23),
}
def require(ok,msg):
 if not ok: raise ValueError(msg)
def load(p): return json.loads(p.read_text(encoding="utf-8"))
def digest(raw): return hashlib.sha256(raw).hexdigest()
def norm(s): return " ".join(re.sub(r"[\W_]+"," ",unicodedata.normalize("NFKC",s).lower()).split())
def stage(meta,index,reviews,reports,now):
 require(meta["version"]==index["version"]==2,"Expected v2 archive")
 require(meta["archiveDate"]==index["archiveDate"],"Archive date mismatch")
 for k,c in (("restaurants","restaurants"),("sources","sources"),("items","dishes")):
  require(len(index[k])==meta[c],"Archive count mismatch")
 require(all(len(x)==9 for x in index["items"]),"Invalid archive row")
 require(set(reviews)==set(reports)==set(EXPECTED),"Missing reviewed source")
 m,out=copy.deepcopy(meta),copy.deepcopy(index)
 evidence=[]
 for key,(slug,url,reviewed_count,public_count) in EXPECTED.items():
  r,p=reviews[key],reports[key]
  identity=r["restaurant"]
  require(r["status"]=="manual-source-review-only-not-production" and p["status"]=="reviewed-ordinary-menu-not-published" and p["publication"]=="none","Unexpected evidence state")
  require(identity==p["restaurant"] and identity["slug"]==slug and identity["city"]=="Reykjavík" and identity["currency"]=="ISK" and identity["countryCode"]=="IS","Identity mismatch")
  require(r["source"]==p["sourceUrl"]==url and re.fullmatch(r"[0-9a-f]{64}",p["rawSha256"]),"Source mismatch")
  observed=datetime.fromisoformat(p["observedAt"].replace("Z","+00:00"))
  require(observed.tzinfo is not None and timedelta(0)<=now-observed<=timedelta(hours=2),"Stale/future observation")
  require(not any(x[1]==slug for x in out["restaurants"]),"Restaurant already present")
  require(len(r["items"])==len(p["items"])==reviewed_count,"Missing reviewed item")
  require(len({x["name"] for x in r["items"]})==reviewed_count,"Duplicate item name")
  remaining=list(p["items"])
  ri,si=len(out["restaurants"]),len(out["sources"])
  out["restaurants"].append([identity["name"],slug,identity["address"],"Reykjavík",""])
  out["sources"].append([ri,url,p["observedAt"]])
  added=0; withheld=[]
  for row in r["items"]:
   require(row["publishEligible"] is False,"Unexpected review state")
   expected=dict(row,currency="ISK")
   require(remaining.count(expected)==1,"Missing/changed reviewed item: "+row["name"])
   remaining.remove(expected)
   price,mx=row["priceMinor"],row.get("priceMaxMinor")
   require(type(price) is int and price>0 and price%100==0,"Invalid whole ISK")
   require(mx is None or type(mx) is int and mx>price and mx%100==0,"Invalid ISK range")
   if row.get("requiresPriceConfirmation") is True:
    require(key=="rok" and row["englishPriceMinor"]!=price,"Unexpected conflict")
    withheld.append(row["name"]);continue
   note=row.get("note","")
   require(note in ("","Vanlig eller med topping","Dagens suppe; spør restauranten","Dagens fangst","Delingsdessert","Dagens salat"),"Unreviewed price condition")
   out["items"].append([si,row["name"],norm(row["name"]),price,"multiple" if mx is not None else "exact",mx,note,"","ISK"])
   added+=1
  require(not remaining and added==public_count and len(withheld)==reviewed_count-public_count,"Wrong publication subset")
  evidence.append({"slug":slug,"sourceUrl":url,"observedAt":p["observedAt"],"rawSha256":p["rawSha256"],"reviewed":reviewed_count,"candidate":added,"withheld":withheld})
 require(len(out["items"])==len(index["items"])+77,"Expected 77 verified nonconflicting items")
 m.update(restaurants=len(out["restaurants"]),sources=len(out["sources"]),dishes=len(out["items"]))
 return m,out,evidence
def main():
 p=argparse.ArgumentParser(description=__doc__)
 p.add_argument("archive",type=Path);p.add_argument("reports",type=Path);p.add_argument("output",type=Path)
 a=p.parse_args();require(not a.output.exists(),"Output already exists")
 meta=load(a.archive/"manifest.json")
 raw=(a.archive/"index.json.gz").read_bytes()
 require(len(raw)==meta["bytes"] and digest(raw)==meta["sha256"],"Archive integrity mismatch")
 index=json.loads(gzip.decompress(raw))
 m,i,e=stage(meta,index,{k:load(ROOT/"docs"/("reykjavik-"+k+"-review.json")) for k in EXPECTED},{k:load(a.reports/(k+".json")) for k in EXPECTED},datetime.now(timezone.utc))
 data=gzip.compress(json.dumps(i,ensure_ascii=False,separators=(",",":")).encode(),compresslevel=9,mtime=0)
 require(len(data)<=4*1024*1024,"Archive size limit")
 m.update(bytes=len(data),sha256=digest(data))
 a.output.mkdir(parents=True,exist_ok=False)
 (a.output/"index.json.gz").write_bytes(data)
 for name,value in (("manifest.json",m),("proof.json",{"status":"candidate-not-published","publication":"none","evidence":e})):
  (a.output/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
if __name__=="__main__": main()
