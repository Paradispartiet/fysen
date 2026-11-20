#!/usr/bin/env python3
"""Stage authentic licensed shrimp open-sandwich photo candidates for Fysen.

Never approve sources blindly. Save native JPEG only in temporary GitHub
Actions artifacts; keep preview, exact 1:1 native crop and provenance in PR.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen
import json

from PIL import Image, ImageOps

OUT=Path("assets/fysen-image-candidates/rekesmorbrod")
LIMIT=48*1024*1024
CANDIDATES=[
 (40853857,"Ida Jigfelt","https://www.pexels.com/photo/elegant-shrimp-sandwich-with-white-wine-40853857/"),
 (10506707,"Ingrid Klasema-van Dongen","https://www.pexels.com/photo/close-up-of-appetizers-10506707/"),
 (37245559,"Caio Niceas","https://www.pexels.com/photo/gourmet-shrimp-sandwich-with-juicy-cocktail-37245559/"),
 (34583972,"Petra Nesti","https://www.pexels.com/photo/appetizing-seafood-dinner-with-shrimp-and-salad-34583972/"),
 (7111475,"Pexels contributor (verify credit on source page)","https://www.pexels.com/photo/cooked-food-on-the-plate-7111475/"),
 (26587331,"Luiz Henrique Mendes","https://www.pexels.com/photo/plate-of-french-toast-with-shrimp-in-sauce-26587331/"),
]
def stage(photo_id:int,photographer:str,page:str):
    url=f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
    req=Request(url,headers={"User-Agent":"FysenLicensedNativeImageReview/1.0 (github.com/Paradispartiet/fysen)","Accept":"image/jpeg"})
    with urlopen(req,timeout=60) as response:
        assert response.headers.get("Content-Type","").lower().startswith("image/")
        payload=response.read(LIMIT+1)
    assert len(payload)<=LIMIT and payload.startswith(bytes.fromhex("ffd8ff"))
    with Image.open(BytesIO(payload)) as raw:
        raw.load()
        original=ImageOps.exif_transpose(raw).convert("RGB")
    w,h=original.size
    assert min(w,h)>=2300, f"Insufficient source {w}x{h}"
    folder=OUT/str(photo_id)
    folder.mkdir(parents=True,exist_ok=True)
    (folder/"source.jpeg").write_bytes(payload)
    preview=original.copy()
    preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(folder/"preview.jpg",quality=91,optimize=True)
    cx,cy=w//2,h//2
    original.crop((cx-700,cy-700,cx+700,cy+700)).save(folder/"native-detail-1400.jpg",quality=92,optimize=True)
    metadata={
       "dish_id":"rekesmorbrod","photo_id":photo_id,
       "photographer":photographer,"source_page":page,"source_url":url,
       "license_url":"https://www.pexels.com/license/",
       "source_sha256":sha256(payload).hexdigest(),
       "source_width":w,"source_height":h,"source_verified":True,
       "visual_review_completed":False,"approved_for_fysen":False,"published":False,
       "required_variant":"open-faced Norwegian shrimp sandwich on visible bread with peeled shrimps and simple garnish",
       "review_criteria":"Correct dish, crisp shrimp and bread at original 1:1 pixels, intact serving, solid black surrounding background with no missing food or edge artifacts. No fabricated ingredients or restaurant association."
    }
    (folder/"review.json").write_text(json.dumps(metadata,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(f"STAGED {photo_id} {w}x{h} {metadata['source_sha256']}; NOT APPROVED")
if __name__=="__main__":
    count=0
    for entry in CANDIDATES:
        try:
            stage(*entry)
            count+=1
        except Exception as exc:
            print(f"REJECTED {entry[0]}: {type(exc).__name__}: {exc}")
    if count<2:
        raise SystemExit(f"Too few high-resolution shrimp sandwich sources: {count}")
    print(f"{count}/{len(CANDIDATES)} original photographs staged; nothing public changed")
