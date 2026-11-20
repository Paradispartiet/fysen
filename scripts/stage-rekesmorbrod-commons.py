#!/usr/bin/env python3
"""Stage Wikimedia Commons high-resolution Nordic shrimp sandwich photos.

Only previews and 1:1 source crops enter this review PR. Before promotion
manually verify exact file license, photographer, attribution and share-alike
requirements at the Commons source page; no Commons candidate is approved.
"""
from __future__ import annotations
from io import BytesIO
from hashlib import sha256
import json
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request,urlopen
from PIL import Image,ImageOps

OUT=Path("assets/fysen-image-candidates/rekesmorbrod/commons")
CANDIDATES=[
 ("Open Faced Shrimp Sandwich.jpg","open-faced-shrimp-sandwich"),
 ("Shrimp sandwich (30554581515).jpg","shrimp-sandwich-30554581515"),
 ("Shrimp sandwich (30442441141).jpg","shrimp-sandwich-30442441141"),
 ("Shrimp sandwich (29796272404).jpg","shrimp-sandwich-29796272404"),
 ("Räksmörgås.jpg","raksmorgas"),
 ("Räksmörgås Krabbenbrot Göteborg.jpg","raksmorgas-goteborg"),
]
MAX_BYTES=35*1024*1024

def stage(filename,slug):
    url="https://commons.wikimedia.org/wiki/Special:FilePath/"+quote(filename.replace(" ","_"),safe="()")
    source_page="https://commons.wikimedia.org/wiki/File:"+quote(filename.replace(" ","_"),safe="()")
    req=Request(url,headers={
       "User-Agent":"FysenEditorialResearch/1.0 (https://github.com/Paradispartiet/fysen)",
       "Accept":"image/jpeg,image/png,*/*",
    })
    with urlopen(req,timeout=45) as response:
        b=response.read(MAX_BYTES+1)
        mime=response.headers.get("Content-Type","")
        resolved_url=response.url
    assert len(b)<=MAX_BYTES and mime.startswith("image/"),f"Invalid media from {resolved_url}: {mime}"
    with Image.open(BytesIO(b)) as original:
        original.load()
        image=ImageOps.exif_transpose(original).convert("RGB")
    w,h=image.size
    assert min(w,h)>=2000,f"Not native high resolution: {w}x{h}"
    p=OUT/slug
    p.mkdir(parents=True,exist_ok=True)
    (p/"source.bytes").write_bytes(b)
    preview=image.copy()
    preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(p/"preview.jpg",quality=90,optimize=True)
    cx,cy=w//2,h//2
    image.crop((cx-700,cy-700,cx+700,cy+700)).save(
      p/"native-detail-1400.jpg",quality=92,optimize=True
    )
    meta={
      "dish_id":"rekesmorbrod",
      "file":filename,"source_page":source_page,"media_url":resolved_url,
      "source_native_width":w,"source_native_height":h,
      "sha256":sha256(b).hexdigest(),
      "license_verified":False,"license_review_required":True,
      "photographer_verified":False,"approved_for_fysen":False,"published":False,
      "review_criteria":"Real whole Nordic open shrimp sandwich, intact bread/egg/shrimp and no restaurant misattribution, crisp at native 1:1, background feasible to cleanly black out, Commons author/license and CC BY-SA derivatives checked before approval."
    }
    (p/"review.json").write_text(json.dumps(meta,indent=2,ensure_ascii=False)+"\n",encoding="utf8")
    print("STAGED",slug,w,h,meta["sha256"],"UNAPPROVED")

if __name__=="__main__":
    count=0
    for file,slug in CANDIDATES:
        try:
            stage(file,slug)
            count+=1
        except Exception as e:
            print("REJECTED",slug,type(e).__name__,str(e)[:350])
    if count==0:
        raise SystemExit("No accessible high-res Wikimedia Commons sources")
    print(f"{count}/{len(CANDIDATES)} candidate photos staged without publishing")
