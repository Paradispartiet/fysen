#!/usr/bin/env python3
"""Stage native tiramisu photographs for visual comparison. No deployment."""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
import json
from PIL import Image,ImageOps

OUT=Path("assets/fysen-image-candidates/tiramisu")
PHOTOS=[
 (34063078,"tiramisu-white-plate","Paulina Kłys"),
 (27305272,"tiramisu-valeria-slice","Valeria Boltneva"),
 (6403383,"tiramisu-classic-slice","Manu Madu"),
 (26838689,"tiramisu-mint-plate","Arian Fernandez"),
 (10170054,"tiramisu-minimalist-square","Cats Coming"),
 (34801388,"tiramisu-layered-portrait","Irene Ästhetik"),
 (19446144,"tiramisu-herb-garnish","Teresa Jang"),
 (29721409,"tiramisu-mascarpone","Anete Lusina"),
 (12035685,"tiramisu-two-plates","K Zoltan"),
]
def stage(photo_id,slug,photographer):
    url=f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
    req=Request(url,headers={"User-Agent":"FysenEditorialPhotoReview/1.0","Accept":"image/jpeg"})
    with urlopen(req,timeout=60) as res:
        raw=res.read(45*1024*1024+1)
        ctype=res.headers.get("Content-Type","")
    assert ctype.startswith("image/") and 0<len(raw)<=45*1024*1024
    with Image.open(BytesIO(raw)) as im:
        im.load()
        photo=ImageOps.exif_transpose(im).convert("RGB")
    w,h=photo.size
    assert min(w,h)>=1600,f"native size insufficient: {w}x{h}"
    target=OUT/slug
    target.mkdir(parents=True,exist_ok=True)
    (target/"source.jpeg").write_bytes(raw)
    view=photo.copy()
    view.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    view.save(target/"preview.jpg",quality=91,optimize=True)
    cx,cy=w//2,h//2
    photo.crop((cx-700,cy-700,cx+700,cy+700)).save(target/"native-detail-1400.jpg",quality=92,optimize=True)
    data={
      "dish_id":"tiramisu","photo_id":photo_id,"photographer_claim":photographer,
      "source_page":f"https://www.pexels.com/photo/{photo_id}/",
      "source_download_url":url,"license_url":"https://www.pexels.com/license/",
      "native_width":w,"native_height":h,"source_sha256":sha256(raw).hexdigest(),
      "source_verified":True,"photographer_verified":False,"license_verified":False,
      "visual_review_completed":False,"approved_for_fysen":False,"published":False,
      "gate":"One complete tiramisu slice showing clear mascarpone cream, coffee-soaked cake and cocoa powder. Sharp native details; unbroken visible dessert and plate, easy natural separation from black without a hand/table or multiple servings. No upscale or invented food."
    }
    (target/"review.json").write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(f"STAGED {slug} {w}x{h} SHA256={data['source_sha256']} NOT APPROVED")
if __name__=="__main__":
    count=0
    for item in PHOTOS:
        try:stage(*item);count+=1
        except Exception as error:print("REJECTED",item[1],type(error).__name__,error)
    assert count>=4,f"Not enough native photos: {count}"
    print(f"STAGED {count} native dessert source photos for manual review, NONE APPROVED")
