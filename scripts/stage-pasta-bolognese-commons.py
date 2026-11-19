#!/usr/bin/env python3
"""Source-only review of licensed, native-resolution tagliatelle al ragù photography.

The original photo is kept in a short-lived Actions artifact, NOT committed
to the repository until its author, license and image quality are confirmed.
"""
from __future__ import annotations

from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen
from PIL import Image, ImageOps

OUT=Path("assets/fysen-image-candidates/pasta-bolognese")
CANDIDATES=[
 ("Pasta Bolognese (CC) (10140854694).jpg","pasta-bolognese-cc"),
 ("Happy Luca tagliatelle al ragù.jpg","happy-luca-tagliatelle"),
 ("Tagliatelle al ragù 03.jpg","tagliatelle-ragu-03"),
 ("Tagliatelle al ragù Trattoria Tony.jpg","tagliatelle-trattoria-tony"),
 ("Tagliatelle bolognese at Il Forno.jpg","tagliatelle-il-forno"),
]
MAX_BYTES=40*1024*1024
def stage(filename,slug):
    base="https://commons.wikimedia.org/wiki/"
    file_name=quote(filename.replace(" ","_"),safe="()")
    file_page=base+"File:"+file_name
    url=base+"Special:FilePath/"+file_name
    with urlopen(Request(url,headers={
      "User-Agent":"FysenEditorialResearch/1.0 (https://github.com/Paradispartiet/fysen)",
      "Accept":"image/jpeg,image/png,*/*",
    }),timeout=55) as response:
        raw=response.read(MAX_BYTES+1)
        ctype=response.headers.get("Content-Type","")
        resolved=response.url
    assert len(raw)<=MAX_BYTES and ctype.startswith("image/"),f"Not image: {ctype}"
    with Image.open(BytesIO(raw)) as src:
        src.load()
        im=ImageOps.exif_transpose(src).convert("RGB")
    width,height=im.size
    assert min(width,height)>=2200,f"Native resolution inadequate: {im.size}"
    folder=OUT/slug
    folder.mkdir(parents=True,exist_ok=True)
    (folder/"source.bytes").write_bytes(raw)
    preview=im.copy()
    preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(folder/"preview.jpg",quality=90,optimize=True)
    cx,cy=width//2,height//2
    im.crop((cx-700,cy-700,cx+700,cy+700)).save(folder/"native-detail-1400.jpg",quality=91,optimize=True)
    meta={
      "dish_id":"pasta-bolognese","source_file":filename,
      "source_page":file_page,"media_url":resolved,
      "source_width":width,"source_height":height,
      "source_sha256":sha256(raw).hexdigest(),
      "source_verified":True,"license_verified":False,"photographer_verified":False,
      "visual_review_completed":False,"approved_for_fysen":False,"published":False,
      "review_criteria":"Real tagliatelle ribbons with beef/pork ragù; identifiable sauce, high native sharpness, whole bowl/plate, clean black background feasible without deleting pasta. Correct author/license CC BY or BY-SA with visible credit and change notice."
    }
    (folder/"review.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(f"STAGED {slug} {width}x{height} SHA {meta['source_sha256']} NOT APPROVED")
if __name__=="__main__":
    n=0
    for filename,slug in CANDIDATES:
        try:
            stage(filename,slug)
            n+=1
        except Exception as err:
            print(f"REJECTED {slug}: {type(err).__name__}: {err}")
    if n<2: raise SystemExit(f"Only {n} sources fetched")
    print(f"{n} candidate originals staged for human review; public Fysen untouched")
