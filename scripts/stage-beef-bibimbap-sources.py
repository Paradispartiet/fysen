#!/usr/bin/env python3
"""Stage genuine beef bibimbap source originals for VISUAL REVIEW ONLY.

Bibimbap is an editorial gallery image, NOT a canonical Fysen catalog dish.
Never map a new photo to restaurant items or change catalogId=null.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
from urllib.error import HTTPError
import json,time
from PIL import Image,ImageOps

OUT=Path("assets/fysen-image-candidates/bibimbap")
SOURCES=[
 dict(slug="andy-li-saero-cc0",url="https://upload.wikimedia.org/wikipedia/commons/9/90/Beef_Bibimbap_-_SAERO_2025-11-06.jpg",
      page="https://commons.wikimedia.org/wiki/File:Beef_Bibimbap_-_SAERO_2025-11-06.jpg",
      photographer="Andy Li / Wikimedia Commons",license="https://creativecommons.org/publicdomain/zero/1.0/",
      size=(8160,6144)),
 dict(slug="andy-li-kimchi-cc0",url="https://upload.wikimedia.org/wikipedia/commons/9/92/Seoul_Bibimbap_%28beef%29_-_Time_For_Kimchi.jpg",
      page="https://commons.wikimedia.org/wiki/File:Seoul_Bibimbap_(beef)_-_Time_For_Kimchi.jpg",
      photographer="Andy Li / Wikimedia Commons",license="https://creativecommons.org/publicdomain/zero/1.0/",
      size=(4032,3024)),
 dict(slug="luis-becerra-pexels",url="https://images.pexels.com/photos/5774005/pexels-photo-5774005.jpeg",
      page="https://www.pexels.com/photo/close-up-photo-of-scrumptious-meat-dish-topped-on-rice-5774005/",
      photographer="Luis Becerra Fotógrafo / Pexels",license="https://www.pexels.com/license/",
      size=(6000,4000)),
 dict(slug="pauline-verganio-pexels",url="https://images.pexels.com/photos/35901111/pexels-photo-35901111.jpeg",
      page="https://www.pexels.com/photo/delicious-korean-bibimbap-in-wooden-bowl-35901111/",
      photographer="Pauline Verganio / Pexels",license="https://www.pexels.com/license/",
      size=(3024,4032)),
]
def download(url):
  req=Request(url,headers={
    "User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)",
    "Accept":"image/jpeg,image/*;q=0.8"})
  for i in range(3):
    try:
      with urlopen(req,timeout=60) as response:
        mime=response.headers.get("Content-Type","")
        raw=response.read(35*1024*1024+1)
      assert mime.startswith("image/"),f"Not an image: {mime}"
      assert 0<len(raw)<=35*1024*1024
      return raw
    except HTTPError as e:
      if i==2 or e.code not in (429,500,502,503,504):raise
      time.sleep(4*(i+1))
  raise RuntimeError("Failed original download")
def stage(item):
  raw=download(item["url"])
  with Image.open(BytesIO(raw)) as im:
    im.load()
    photo=ImageOps.exif_transpose(im).convert("RGB")
  w,h=photo.size
  assert (w,h)==item["size"],f"Original changed: {item['slug']} {w}×{h} (expected {item['size']})"
  assert min(w,h)>=1600
  dest=OUT/item["slug"];dest.mkdir(parents=True,exist_ok=True)
  (dest/"source.jpeg").write_bytes(raw)
  small=photo.copy();small.thumbnail((1100,1100),Image.Resampling.LANCZOS)
  small.save(dest/"preview.jpg",quality=92,optimize=True)
  photo.crop((w//2-700,h//2-700,w//2+700,h//2+700)).save(
    dest/"native-detail-1400.jpg",quality=93,optimize=True)
  review={
    "dish_id":"bibimbap",
    "catalog_id":None,
    "variant":"bibimbap with beef, rice, vegetables and egg",
    "photographer":item["photographer"],"page":item["page"],"download_url":item["url"],
    "license_url":item["license"],"original_width":w,"original_height":h,
    "original_sha256":sha256(raw).hexdigest(),
    "native_original_verified":True,"no_upscale":True,
    "visual_review_completed":False,"approved_for_fysen":False,"published":False,
    "quality_gate":"Clearly identifiable beef bibimbap (not vegetarian or chicken): beef, rice, colorful vegetables, egg. Complete bowl and all food intact; sharp native detail; no invented ingredients, no enlarged pixels; black backdrop without other food or table fragments. Editorial gallery only, never restaurant menu mapping."
  }
  (dest/"review.json").write_text(json.dumps(review,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  print(f"STAGED {item['slug']}: {w}×{h} sha256={review['original_sha256']} UNAPPROVED")
if __name__=="__main__":
  count=0
  for item in SOURCES:
    try:stage(item);count+=1
    except Exception as error:print("SOURCE_UNAVAILABLE",item["slug"],type(error).__name__,str(error))
  assert count>=1,"No authentic source verified; nothing to promote"
  print(f"Native originals: {count}; approved: 0; published: 0; bibimbap still non-catalog")
