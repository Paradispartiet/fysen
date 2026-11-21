#!/usr/bin/env python3
"""Verify genuine chicken katsu originals; stage review-only thumbnails and hashes."""
from __future__ import annotations
from io import BytesIO
from pathlib import Path
from hashlib import sha256
from urllib.request import Request,urlopen
from PIL import Image,ImageOps
import json,time
OUT=Path("assets/fysen-image-candidates/chicken-katsu")
SOURCES=[
  dict(slug="duc-trung-dao-katsu-cabbage",id=17692193,size=(4511,4496),
       author="Đức Trung Đào / Pexels",
       page="https://www.pexels.com/photo/nuggets-with-white-cabbage-and-a-dip-17692193/",
       notes="Pexels describes authentic fried chicken katsu with shredded cabbage, sauce and a square plate; verify whole chicken cutlet and plate"),
  dict(slug="cohesion-singapore-katsu-rice",id=15985538,size=(5472,3648),
       author="Cohesion Singapore / Pexels",
       page="https://www.pexels.com/photo/slices-of-katsu-teriyaki-and-white-rice-in-a-bowl-15985538/",
       notes="Pexels describes chicken katsu with white rice and savory topping; verify clear chicken cutlet and completeness"),
  dict(slug="jahra-tasfia-reza-katsu-rice",id=39853089,size=(4000,6000),
       author="Jahra Tasfia Reza / Pexels",
       page="https://www.pexels.com/photo/crispy-chicken-katsu-with-steamed-rice-39853089/",
       notes="Top-down breaded chicken katsu with rice and chopsticks, 2026 Pexels source; check full serving and source quality")
]
def fetch(url):
  req=Request(url,headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*;q=0.8"})
  for i in range(3):
    try:
      with urlopen(req,timeout=100) as res:
        mime=res.headers.get("Content-Type","")
        raw=res.read(50*1024*1024+1)
      assert mime.startswith("image/") and 0<len(raw)<=50*1024*1024
      return raw
    except Exception:
      if i==2:raise
      time.sleep(3*(i+1))
def stage(s):
  url=f"https://images.pexels.com/photos/{s['id']}/pexels-photo-{s['id']}.jpeg"
  raw=fetch(url)
  with Image.open(BytesIO(raw)) as pic:
    pic.load()
    original=ImageOps.exif_transpose(pic).convert("RGB")
  w,h=original.size
  assert (w,h)==s["size"],f"Source dimensions changed: {(w,h)} vs {s['size']}"
  assert min(w,h)>=1600
  root=OUT/s["slug"]
  root.mkdir(parents=True,exist_ok=True)
  (root/"source.jpeg").write_bytes(raw)
  prev=original.copy()
  prev.thumbnail((1080,1080),Image.Resampling.LANCZOS)
  prev.save(root/"preview.jpg",quality=92,optimize=True)
  cx,cy=w//2,h//2
  original.crop((cx-700,cy-700,cx+700,cy+700)).save(root/"native-detail-1400.jpg",quality=94,optimize=True)
  meta=dict(dish_id="katsu",catalog_id="katsu",variant="chicken katsu",source_photo_author=s["author"],
    photo_page=s["page"],photo_source_url=url,photo_license="https://www.pexels.com/license/",
    native_width=w,native_height=h,original_sha256=sha256(raw).hexdigest(),
    source_verified=True,no_upscale=True,inspection_notes=s["notes"],
    visual_review_completed=False,approved_for_fysen=False,published=False,
    acceptance_gate=("Genuine breaded CHICKEN cutlet, not pork tonkatsu, preferably whole cutlet and complete "
                     "serving with cabbage/rice and sauce, black-background source detail, no upscale or "
                     "generated food; no false attribution to a Fysen restaurant."))
  (root/"review.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  print("STAGED",s["slug"],w,h,meta["original_sha256"],"NOT APPROVED")
if __name__=="__main__":
  successful=0
  for source in SOURCES:
    try:stage(source);successful+=1
    except Exception as e:print(f"REJECTED {source['slug']}: {type(e).__name__}: {e}")
  assert successful>=1,"No genuine source qualified; do not continue"
  print(f"CHICKEN KATSU: {successful} source-verified; 0 approved; 0 published")
