#!/usr/bin/env python3
"""Stage authentic full-resolution falafel-with-hummus food photos for editorial review only.

No image is automatically approved and no catalog, menus, or public gallery assets change.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
from urllib.error import HTTPError
import json,time
from PIL import Image,ImageOps

OUT=Path("assets/fysen-image-candidates/falafel")
SOURCES=[
 dict(slug="furkanfdemir-bowl-pexels",url="https://images.pexels.com/photos/8286755/pexels-photo-8286755.jpeg",
      page="https://www.pexels.com/photo/cooked-food-in-the-bowl-8286755/",
      author="furkanfdemir / Pexels",license="https://www.pexels.com/license/",size=(4160,6240)),
 dict(slug="saya-p-bowl-pexels",url="https://images.pexels.com/photos/39976633/pexels-photo-39976633.jpeg",
      page="https://www.pexels.com/nb-no/bilde/deilig-falafelbolle-med-hummus-og-salat-39976633/",
      author="Saya P / Pexels",license="https://www.pexels.com/license/",size=(4284,5712)),
]

def fetch(url):
  req=Request(url,headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*;q=0.8"})
  for attempt in range(3):
    try:
      with urlopen(req,timeout=60) as res:
        content_type=res.headers.get("Content-Type","")
        raw=res.read(35*1024*1024+1)
      assert content_type.startswith("image/"),f"Unexpected mime {content_type}"
      assert 0<len(raw)<=35*1024*1024
      return raw
    except HTTPError as exc:
      if attempt==2 or exc.code not in (429,500,502,503,504):raise
      time.sleep((attempt+1)*4)
  raise RuntimeError("Unable to fetch")
def stage(entry):
  raw=fetch(entry["url"])
  with Image.open(BytesIO(raw)) as im:
    im.load()
    photo=ImageOps.exif_transpose(im).convert("RGB")
  w,h=photo.size
  assert (w,h)==entry["size"],f"Native dimensions unexpected: {entry['slug']} {(w,h)}"
  assert min(w,h)>=1600
  target=OUT/entry["slug"];target.mkdir(parents=True,exist_ok=True)
  (target/"source.jpeg").write_bytes(raw)
  pre=photo.copy();pre.thumbnail((1100,1100),Image.Resampling.LANCZOS)
  pre.save(target/"preview.jpg",quality=93,optimize=True)
  photo.crop((w//2-700,h//2-700,w//2+700,h//2+700)).save(
     target/"native-detail-1400.jpg",quality=94,optimize=True)
  obj=dict(dish_id="falafel",catalog_id="falafel",variant="falafel with hummus",
    photo_author=entry["author"],photo_page=entry["page"],photo_source_url=entry["url"],
    photo_license=entry["license"],native_width=w,native_height=h,
    original_sha256=sha256(raw).hexdigest(),download_verified=True,
    no_upscale=True,visual_review_completed=False,approved_for_fysen=False,published=False,
    quality_gate="Whole falafel serving with actual falafel balls and hummus; natural sharp original detail, preferably complete plate. Black backdrop after masking must contain no table, cut off food or spurious objects. No synthetic food, no menu/restaurant-specific claims.")
  (target/"review.json").write_text(json.dumps(obj,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  print(f"STAGED {entry['slug']} {w}x{h}, SHA256 {obj['original_sha256']} UNAPPROVED")
if __name__=="__main__":
  successes=0
  for entry in SOURCES:
    try:stage(entry);successes+=1
    except Exception as error:print(f"SOURCE REJECTED {entry['slug']}: {type(error).__name__}: {error}")
  assert successes>=1,"No authentic image source verified; do not continue"
  print(f"STAGED: {successes} genuine originals; approved 0, published 0")
