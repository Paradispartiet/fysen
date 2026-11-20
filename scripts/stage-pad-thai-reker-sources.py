#!/usr/bin/env python3
"""Stage authentic, native-resolution shrimp pad thai photographs for QA only.

DO NOT approve or publish. Only evidence previews enter the source-review PR.
"""
from __future__ import annotations
import hashlib,json
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
from PIL import Image,ImageOps

ROOT=Path("assets/fysen-image-candidates/pad-thai-reker")
MAX_BYTES=48*1024*1024
PHOTOS=[
  (31029750,"Sai Kuen Leung","Delicious Thai Shrimp Pad Thai with Fresh Ingredients"),
  (19062750,"Nadin Sh","Tagliatelle with Prawns and Salad (Pad Thai)"),
  (34723306,"UNDO KIM","Delicious Pad Thai Noodles on Rustic Background"),
  (34723307,"UNDO KIM","Delicious Shrimp Pad Thai on White Plate"),
  (34723308,"UNDO KIM","Delicious Thai Shrimp Pad Thai with Toppings"),
]
def stage(photo,author,label):
    target=ROOT/str(photo)
    if (target/"review.json").exists():
        print("ALREADY STAGED",photo);return
    src=f"https://images.pexels.com/photos/{photo}/pexels-photo-{photo}.jpeg"
    with urlopen(Request(src,headers={"User-Agent":"FysenPhotoReview/1.0 (github.com/Paradispartiet/fysen)","Accept":"image/jpeg"}),timeout=60) as response:
        payload=response.read(MAX_BYTES+1)
        ct=response.headers.get("Content-Type","")
    assert len(payload)<=MAX_BYTES and ct.lower().startswith("image/")
    with Image.open(BytesIO(payload)) as original:
        original.load()
        im=ImageOps.exif_transpose(original).convert("RGB")
    w,h=im.size
    assert min(w,h)>=1800,f"{photo} insufficient {w}x{h}"
    target.mkdir(parents=True,exist_ok=True)
    (target/"source.jpeg").write_bytes(payload)
    view=im.copy();view.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    view.save(target/"preview.jpg",quality=91,optimize=True)
    x,y=w//2,h//2
    im.crop((x-700,y-700,x+700,y+700)).save(target/"native-detail-1400.jpg",quality=93,optimize=True)
    review={
       "dish_id":"pad-thai-reker","photo_id":photo,"photographer_claim":author,
       "description":label,"source_page":f"https://www.pexels.com/photo/{photo}/",
       "source_url":src,"license_url":"https://www.pexels.com/license/",
       "original_width":w,"original_height":h,"source_sha256":hashlib.sha256(payload).hexdigest(),
       "source_verified":True,"photographer_verified":False,"license_verified":False,
       "approved_for_fysen":False,"visual_review_completed":False,"published":False,
       "review_criteria":"Entire plate/bowl with real shrimp and flat pad-thai rice noodles, sharp actual source 1:1 details, black background without table/utensils, no inpainted ingredients or upscaling."
    }
    (target/"review.json").write_text(json.dumps(review,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(f"STAGED {photo} {w}x{h} {review['source_sha256']} NOT APPROVED")
if __name__=="__main__":
    n=0
    for args in PHOTOS:
        try:stage(*args);n+=1
        except Exception as e:print(f"REJECTED {args[0]} {type(e).__name__}: {e}")
    if n<2:raise SystemExit(f"Only {n} candidate photographs retrieved")
    print(f"{n} high-resolution original shrimp pad thai photos available for visual source review; none approved")
