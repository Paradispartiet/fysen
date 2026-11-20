#!/usr/bin/env python3
"""Stage native Pexels white-fish food photographs for review, never publication."""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request,urlopen
from PIL import Image,ImageOps

SOURCES=[
 (29653135,"white-fish-mash-vegetables","Valeria Boltneva"),
 (29653144,"white-fish-gourmet-plate","Valeria Boltneva"),
 (19748960,"fried-fish-potatoes-lemon","Nicu Cobasnean"),
 (18663959,"fish-herb-potatoes","Jacob Yavin"),
 (18663958,"fish-lemon-basil","Jacob Yavin"),
 (12932683,"roasted-fish-vegetables","Atlantic Ambience"),
 (5638528,"fried-fish-vegetables","Shameel mukkath"),
 (16273766,"fish-potatoes-dip","Nadin Sh"),
]
ROOT=Path("assets/fysen-image-candidates/stekt-hvit-fisk")
def stage(photo_id,slug,credit):
    target=ROOT/slug
    if (target/"review.json").exists():
        print("EXISTING",slug);return
    url=f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
    with urlopen(Request(url,headers={"User-Agent":"FysenEditorialPhotoReview/1.0","Accept":"image/jpeg"}),timeout=60) as response:
        data=response.read(42*1024*1024+1)
        ct=response.headers.get("Content-Type","")
    assert ct.startswith("image/") and 0<len(data)<=42*1024*1024
    with Image.open(BytesIO(data)) as raw:
        raw.load()
        im=ImageOps.exif_transpose(raw).convert("RGB")
    w,h=im.size
    assert min(w,h)>=1600,f"Native dimensions {w}x{h} are insufficient"
    target.mkdir(parents=True,exist_ok=True)
    (target/"source.jpeg").write_bytes(data)
    preview=im.copy()
    preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(target/"preview.jpg",quality=90,optimize=True)
    cx,cy=w//2,h//2
    im.crop((cx-700,cy-700,cx+700,cy+700)).save(target/"native-detail-1400.jpg",quality=91,optimize=True)
    review={
      "dish_id":"stekt-hvit-fisk","photo_id":photo_id,"photographer_claim":credit,
      "source_page":f"https://www.pexels.com/photo/{photo_id}/",
      "source_download_url":url,"license_url":"https://www.pexels.com/license/",
      "source_sha256":sha256(data).hexdigest(),"native_width":w,"native_height":h,
      "photographer_verified":False,"license_verified":False,"visual_review_completed":False,
      "approved_for_fysen":False,"published":False,
      "gate":"A single cooked WHITE-fish fillet (not salmon/tuna/whole fish), on a complete plate; attractive native 1:1 sharpness, no upscale; clean black isolation must keep whole meal. Do not claim actual species or specific restaurant."
    }
    (target/"review.json").write_text(json.dumps(review,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(f"STAGED {slug} {w}x{h} SHA={review['source_sha256']}, NOT APPROVED")
if __name__=="__main__":
    count=0
    for entry in SOURCES:
        try:stage(*entry);count+=1
        except Exception as error:print("REJECTED",entry[1],type(error).__name__,error)
    assert count>=3,f"Insufficient new sources {count}"
    print(f"{count} high-resolution fish photos queued for visual review; no publication")
