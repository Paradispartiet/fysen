#!/usr/bin/env python3
"""Stage licensed Wikimedia Commons pizza photos; review only, not publication."""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen
import json
from PIL import Image, ImageOps

OUT=Path("assets/fysen-image-candidates/pizza-prosciutto/commons")
MAX=36*1024*1024
CANDIDATES=[
 ("Pizza Prosciutto Crudo.jpeg","pizza-prosciutto-crudo","Robot8A","CC BY-SA 4.0"),
 ("Prosciutto pizza (509128121).jpg","prosciutto-pizza-famoso","Simon Law","CC BY-SA 2.0"),
 ("Parma ham pizza Prosciutto crudo laliva restaurant bangkok.jpg","parma-ham-pizza-bangkok","license/author to verify","license to verify"),
 ("Pizza with eggs and crispy prosciutto - San Francisco.jpg","pizza-with-eggs-prosciutto","license/author to verify","CC0 claimed; verify"),
 ("Apple prosciutto pizza (3037559314).jpg","apple-prosciutto-pizza","license/author to verify","license to verify"),
]
def stage(filename,slug,author,license):
    name=quote(filename.replace(" ","_"),safe="()")
    page="https://commons.wikimedia.org/wiki/File:"+name
    url="https://commons.wikimedia.org/wiki/Special:FilePath/"+name
    req=Request(url,headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/png,*/*"})
    with urlopen(req,timeout=60) as res:
        payload=res.read(MAX+1)
        resolved=res.url
        content_type=res.headers.get("Content-Type","")
    assert len(payload)<=MAX and content_type.startswith("image/"),content_type
    with Image.open(BytesIO(payload)) as src:
        src.load()
        image=ImageOps.exif_transpose(src).convert("RGB")
    w,h=image.size
    assert min(w,h)>=1850,f"Too few original pixels {w}x{h}"
    target=OUT/slug
    target.mkdir(parents=True,exist_ok=True)
    (target/"source.bytes").write_bytes(payload)
    preview=image.copy()
    preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(target/"preview.jpg",quality=90,optimize=True)
    cx,cy=w//2,h//2
    image.crop((cx-700,cy-700,cx+700,cy+700)).save(target/"native-detail-1400.jpg",quality=91,optimize=True)
    data={"dish_id":"pizza-prosciutto","source_file":filename,"source_page":page,"source_url":resolved,"author_claim":author,"license_claim":license,
          "source_dimensions":[w,h],"source_sha256":sha256(payload).hexdigest(),
          "source_verified":True,"photographer_verified":False,"license_verified":False,
          "visual_review_completed":False,"approved_for_fysen":False,"published":False,
          "required":"Photographic pizza with prosciutto crudo, intact whole serving, good native 1:1 sharpness, black background feasible without masking the food, licensing verified."
         }
    (target/"review.json").write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(f"STAGED {slug} {w}x{h} sha256 {data['source_sha256']}; NOT APPROVED")
if __name__=="__main__":
    n=0
    for x in CANDIDATES:
        try: stage(*x);n+=1
        except Exception as exc: print(f"REJECTED {x[1]}: {type(exc).__name__}: {exc}")
    if n<2: raise SystemExit(f"Only {n} sources retrieved")
    print(f"{n}/{len(CANDIDATES)} Wikimedia native photographs staged for review only")
