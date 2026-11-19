#!/usr/bin/env python3
"""Stage genuine, non-upscaled prosciutto-pizza photographs for visual review only.

All originals remain in a short-lived Actions artifact. No Fysen manifests,
catalog records or production deployments are touched by this stage.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen
import json
from PIL import Image, ImageOps

OUT=Path("assets/fysen-image-candidates/pizza-prosciutto")
LIMIT=48*1024*1024
CANDIDATES=[
 (16677739,"Valeria Boltneva","https://www.pexels.com/photo/pizza-with-prosciutto-and-arugula-16677739/"),
 (14866675,"Samir","https://www.pexels.com/photo/photo-of-pizza-14866675/"),
 (4748451,"Regina Ferraz","https://www.pexels.com/photo/prosciutto-pizza-on-wooden-chopping-board-4748451/"),
 (5903268,"ROMAN ODINTSOV","https://www.pexels.com/photo/close-up-shot-of-pizza-5903268/"),
 (32764492,"Alexey Demidov","https://www.pexels.com/photo/authentic-italian-pizza-with-prosciutto-and-arugula-32764492/"),
 (16677744,"Valeria Boltneva","https://www.pexels.com/photo/pizza-with-dry-cured-ham-and-rucola-on-a-wooden-table-16677744/"),
 (16677733,"Valeria Boltneva","https://www.pexels.com/photo/pizza-with-arugula-ham-and-black-olives-16677733/"),
 (4748439,"Regina Ferraz","https://www.pexels.com/photo/prosciutto-pizza-on-wooden-chopping-board-4748439/"),
 (18285316,"Valeria Boltneva","https://www.pexels.com/photo/delicious-pizza-on-board-on-wooden-table-18285316/"),
]
def stage(photo_id:int,photographer:str,page:str):
    url=f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
    req=Request(url,headers={
        "User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)",
        "Accept":"image/jpeg"
    })
    with urlopen(req,timeout=60) as response:
        assert response.headers.get("Content-Type","").lower().startswith("image/")
        payload=response.read(LIMIT+1)
    assert len(payload)<=LIMIT and payload[:3]==bytes.fromhex("ffd8ff")
    with Image.open(BytesIO(payload)) as raw:
        raw.load()
        im=ImageOps.exif_transpose(raw).convert("RGB")
    w,h=im.size
    assert min(w,h)>=1800,f"Native pixels too few: {w}x{h}"
    folder=OUT/str(photo_id)
    folder.mkdir(parents=True,exist_ok=True)
    (folder/"source.jpeg").write_bytes(payload)
    preview=im.copy()
    preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(folder/"preview.jpg",quality=90,optimize=True)
    cx,cy=w//2,h//2
    im.crop((cx-700,cy-700,cx+700,cy+700)).save(folder/"native-detail-1400.jpg",quality=91,optimize=True)
    meta={
      "dish_id":"pizza-prosciutto","photo_id":photo_id,
      "photographer":photographer,"source_page":page,"source_url":url,
      "license_url":"https://www.pexels.com/license/",
      "source_sha256":sha256(payload).hexdigest(),
      "source_width":w,"source_height":h,
      "source_verified":True,"license_verified":False,"visual_review_completed":False,
      "approved_for_fysen":False,"published":False,
      "target":"Entire pizza with visible prosciutto, mozzarella and greens; real sharp source pixels and pure black surrounding background without artifacts.",
      "review_criteria":"Do not approve close-ups with cut-off pizza, weak source detail, unsightly isolation, invented ingredients, or incorrect photo rights. No upscaling and no restaurant-specific claims."
    }
    (folder/"review.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(f"STAGED {photo_id} {w}x{h} SHA256 {meta['source_sha256']}, NOT APPROVED")
if __name__=="__main__":
    n=0
    for entry in CANDIDATES:
        try:
            stage(*entry); n+=1
        except Exception as exc:
            print(f"REJECTED {entry[0]}: {type(exc).__name__}: {exc}")
    if n<2: raise SystemExit(f"Only {n} real source photos retrieved; review requires >=2")
    print(f"{n} real high-resolution photo candidates staged; no public assets modified")
