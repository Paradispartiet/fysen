#!/usr/bin/env python3
"""Stage a genuine CC0 steamed dumpling photograph for editorial approval only."""
from __future__ import annotations
from pathlib import Path
from urllib.request import Request,urlopen
from io import BytesIO
from hashlib import sha256
from PIL import Image,ImageOps
import json,time
DIR=Path("assets/fysen-image-candidates/dumplings/charles-deluvio-cc0")
URL="https://upload.wikimedia.org/wikipedia/commons/a/a0/Dumplings_%28Unsplash%29.jpg"
PAGE="https://commons.wikimedia.org/wiki/File:Dumplings_(Unsplash).jpg"
req=Request(URL,headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*"})
for attempt in range(3):
  try:
    with urlopen(req,timeout=100) as r:
      raw=r.read(16*1024*1024+1)
      mime=r.headers.get("Content-Type","")
    assert mime.startswith("image/") and 0<len(raw)<16*1024*1024
    break
  except Exception:
    if attempt==2:raise
    time.sleep(3*(attempt+1))
with Image.open(BytesIO(raw)) as o:
  o.load()
  picture=ImageOps.exif_transpose(o).convert("RGB")
w,h=picture.size
assert (w,h)==(5472,3648),f"Original no longer 5472 x 3648: {w} x {h}"
DIR.mkdir(parents=True,exist_ok=True)
(DIR/"source.jpeg").write_bytes(raw)
preview=picture.copy();preview.thumbnail((1200,1200),Image.Resampling.LANCZOS)
preview.save(DIR/"source-preview.jpg",quality=94,optimize=True)
x,y=w//2,h//2
picture.crop((x-700,y-700,x+700,y+700)).save(DIR/"detail-1400.jpg",quality=94,optimize=True)
meta=dict(dish_id="dumplings",catalog_id="dumplings",
  source_title="Dumplings (Unsplash)",author="Charles Deluvio / Wikimedia Commons",
  source_page=PAGE,source_original_url=URL,
  license="CC0 1.0",license_url="https://creativecommons.org/publicdomain/zero/1.0/",
  source_native_width=w,source_native_height=h,
  source_sha256=sha256(raw).hexdigest(),source_verified=True,no_upscale=True,
  photo_description="Three soft steamed dumplings in one whole round wooden serving bowl with dark sesame and chopsticks, on light background. No dipping sauce visible, no proof of filling ingredients.",
  visual_review_completed=False,approved_for_fysen=False,published=False)
(DIR/"review.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print(f"STAGED authentic dumplings {w}x{h} SHA256={meta['source_sha256']} CC0 NOT APPROVED")
