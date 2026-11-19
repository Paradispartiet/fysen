#!/usr/bin/env python3
"""Inspect native, licensed grilled steak photos. Never change public media."""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
import json
from PIL import Image,ImageOps

OUT=Path("assets/fysen-image-candidates/grillet-biff")
LIMIT=45*1024*1024
CANDIDATES=[
  (1352264,"Lukas Blazek","https://www.pexels.com/photo/grilled-beef-with-fries-and-sauce-on-black-ceramic-plate-1352264/"),
  (1639563,"Valeria Boltneva","https://www.pexels.com/photo/plate-of-beef-with-herbs-1639563/"),
  (25389777,"Valeria Boltneva","https://www.pexels.com/photo/close-up-of-a-steak-served-with-vegetables-25389777/"),
  (33144660,"Busenur Demirkan","https://www.pexels.com/photo/delicious-grilled-steak-with-vegetables-and-mashed-potatoes-33144660/"),
  (27643022,"Pexels contributor (see source page)","https://www.pexels.com/photo/a-steak-and-fries-on-a-plate-with-a-fork-27643022/"),
]
def stage(photo_id,credit,page):
    url=f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
    request=Request(url,headers={"User-Agent":"FysenEditorialPhotoReview/1.0","Accept":"image/jpeg"})
    with urlopen(request,timeout=50) as res:
        assert res.headers.get("Content-Type","").lower().startswith("image/")
        raw=res.read(LIMIT+1)
    assert len(raw)<=LIMIT and raw.startswith(bytes.fromhex("ffd8ff"))
    with Image.open(BytesIO(raw)) as image:
        image.load()
        im=ImageOps.exif_transpose(image).convert("RGB")
    width,height=im.size
    assert min(width,height)>=2400,f"Native pixels insufficient: {width}x{height}"
    base=OUT/str(photo_id)
    base.mkdir(parents=True,exist_ok=True)
    (base/"source.jpeg").write_bytes(raw)
    p=im.copy()
    p.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    p.save(base/"preview.jpg",quality=90,optimize=True)
    cx,cy=width//2,height//2
    im.crop((cx-700,cy-700,cx+700,cy+700)).save(
        base/"native-detail-1400.jpg",quality=92,optimize=True)
    info={
       "dish_id":"grillet-biff","photo_id":photo_id,"credit":credit,"source_page":page,
       "license_url":"https://www.pexels.com/license/","source_url":url,
       "source_sha256":sha256(raw).hexdigest(),"source_width":width,"source_height":height,
       "source_verified":True,"visual_review_completed":False,
       "approved_for_fysen":False,"published":False,
       "acceptance":"One grilled beef steak meal sharp at native 1:1; clean black background, all food intact, no photo enlargement or false restaurant claims."
    }
    (base/"review.json").write_text(json.dumps(info,indent=2,ensure_ascii=False)+"\n",encoding="utf8")
    print(f"STAGED {photo_id}: {width}x{height} sha {info['source_sha256']} NOT APPROVED")
if __name__=="__main__":
    successes=0
    for args in CANDIDATES:
        try:
            stage(*args)
            successes+=1
        except Exception as e:
            print(f"REJECTED {args[0]}: {type(e).__name__}: {e}")
    if successes<2: raise SystemExit(f"Need at least two native sources, only {successes} found")
    print(f"{successes} source candidates inspected; nothing deployed")
