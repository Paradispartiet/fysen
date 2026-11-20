#!/usr/bin/env python3
"""Fetch authentic source-resolution gyoza photographs for VISUAL REVIEW ONLY.

Never upscale, invent food, approve a photo, or deploy this source stage.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
from urllib.error import HTTPError
import json,time
from PIL import Image,ImageOps

ROOT=Path("assets/fysen-image-candidates/gyoza")
SOURCES=[
 dict(slug="douglas-perkins-commons",url="https://upload.wikimedia.org/wikipedia/commons/b/b7/Gyoza.jpg",
    page="https://commons.wikimedia.org/wiki/File:Gyoza.jpg",
    author="Douglas Paul Perkins / Wikimedia Commons",license="https://creativecommons.org/licenses/by/3.0/",
    expected=(4000,3000)),
 dict(slug="adryan-villanueva-commons",url="https://upload.wikimedia.org/wikipedia/commons/3/30/Japanese_pan_fried_gyoza.jpg",
    page="https://commons.wikimedia.org/wiki/File:Japanese_pan_fried_gyoza.jpg",
    author="Adryan R. Villanueva / Wikimedia Commons",license="https://creativecommons.org/licenses/by-sa/4.0/",
    expected=(5472,3648)),
 dict(slug="misaochan-commons",url="https://upload.wikimedia.org/wikipedia/commons/3/3b/Gyoza.jpeg",
    page="https://commons.wikimedia.org/wiki/File:Gyoza.jpeg",
    author="Misaochan / Wikimedia Commons",license="https://creativecommons.org/licenses/by-sa/3.0/",
    expected=(4128,3096)),
 dict(slug="ominae-commons",url="https://upload.wikimedia.org/wikipedia/commons/2/27/Four_Gyozas_on_plate.jpg",
    page="https://commons.wikimedia.org/wiki/File:Four_Gyozas_on_plate.jpg",
    author="Ominae / Wikimedia Commons",license="https://creativecommons.org/licenses/by-sa/4.0/",
    expected=(3024,4032)),
 dict(slug="lara-bellens-pexels",url="https://images.pexels.com/photos/35583239/pexels-photo-35583239.jpeg",
    page="https://www.pexels.com/photo/delicious-fried-dumplings-with-soy-sauce-dip-35583239/",
    author="Lara Bellens / Pexels",license="https://www.pexels.com/license/",
    expected=(4937,3662)),
]
def fetch(url):
  req=Request(url,headers={"User-Agent":"FysenPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*;q=0.8"})
  for attempt in range(3):
    try:
      with urlopen(req,timeout=55) as response:
        mime=response.headers.get("Content-Type","")
        data=response.read(35*1024*1024+1)
      assert mime.startswith("image/"),f"Unexpected source MIME {mime}"
      assert 0<len(data)<=35*1024*1024
      return data
    except HTTPError as e:
      if attempt==2 or e.code not in (429,500,502,503,504):raise
      time.sleep(4*(attempt+1))
  raise RuntimeError("No original found")
def stage(item):
  raw=fetch(item["url"])
  with Image.open(BytesIO(raw)) as im:
    im.load()
    photo=ImageOps.exif_transpose(im).convert("RGB")
  w,h=photo.size
  assert (w,h)==item["expected"],f"Source dimensions changed {w}x{h} for {item['slug']}"
  assert min(w,h)>=1600
  out=ROOT/item["slug"]
  out.mkdir(parents=True,exist_ok=True)
  (out/"source.jpeg").write_bytes(raw)
  preview=photo.copy()
  preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
  preview.save(out/"preview.jpg",quality=93,optimize=True)
  photo.crop((w//2-700,h//2-700,w//2+700,h//2+700)).save(
    out/"native-detail-1400.jpg",quality=94,optimize=True)
  review=dict(dish_id="gyoza",source_page=item["page"],source_url=item["url"],
    photographer=item["author"],license_url=item["license"],native_width=w,native_height=h,
    original_sha256=sha256(raw).hexdigest(),download_verified=True,
    no_upscale=True,visual_review_completed=False,approved_for_fysen=False,published=False,
    gate="Genuine Japanese pan-fried gyoza. All dumplings and plate must be present, no missing food or invented filling; natural sharp 1400px detail; separate black background without plate clipping, green/wood remnants or halo. Do not claim filling is vegetarian or a particular Fysen restaurant dish.")
  (out/"review.json").write_text(json.dumps(review,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  print(f"STAGED {item['slug']}: {w}x{h}, SHA256={review['original_sha256']}, REVIEW ONLY")
if __name__=="__main__":
  count=0
  for item in SOURCES:
    try:
      stage(item)
      count+=1
    except Exception as error:
      print(f"SOURCE REJECTED: {item['slug']}: {type(error).__name__}: {error}")
  assert count>=1,"No original source could be verified, do not produce imagery."
  print(f"STAGED {count} full-original candidate sources; 0 approved, 0 published.")
