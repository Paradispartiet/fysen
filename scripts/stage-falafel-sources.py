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
 dict(slug="shameel-mukkath-pexels",url="https://images.pexels.com/photos/14883756/pexels-photo-14883756.jpeg",
      page="https://www.pexels.com/photo/top-view-of-falafel-on-a-plate-with-a-sauce-on-the-side-14883756/",
      author="Shameel mukkath / Pexels",license="https://www.pexels.com/license/",size=(6720,4480)),
 dict(slug="nataliya-vaitkevich-platter-pexels",url="https://images.pexels.com/photos/6275183/pexels-photo-6275183.jpeg",
      page="https://www.pexels.com/photo/overhead-shot-of-fried-falafels-beside-pita-bread-6275183/",
      author="Nataliya Vaitkevich / Pexels",license="https://www.pexels.com/license/",size=(4160,6240)),
 dict(slug="nataliya-vaitkevich-bowl-pexels",url="https://images.pexels.com/photos/6275220/pexels-photo-6275220.jpeg",
      page="https://www.pexels.com/photo/falafel-in-ceramic-bowl-on-black-surface-6275220/",
      author="Nataliya Vaitkevich / Pexels",license="https://www.pexels.com/license/",size=(4160,6240)),
 dict(slug="ali-dashti-pexels",url="https://images.pexels.com/photos/29253319/pexels-photo-29253319.jpeg",
      page="https://www.pexels.com/photo/middle-eastern-cuisine-with-hummus-and-falafel-29253319/",
      author="Ali Dashti / Pexels",license="https://www.pexels.com/license/",size=(6336,7920))
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
