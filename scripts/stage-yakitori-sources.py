#!/usr/bin/env python3
"""Review-only native Pexels yakitori candidates. No manifest or public image changes."""
from pathlib import Path
from io import BytesIO
from hashlib import sha256
from urllib.request import Request,urlopen
from PIL import Image,ImageOps
import json,time
ROOT=Path("assets/fysen-image-candidates/yakitori")
CANDIDATES=[
 ("airam-single-black-plate",30682903,(4000,5000),"Airam Dato-on / Pexels",
  "Authentic Japanese Yakitori Skewers on Plate; inspect whether all skewers are chicken, one complete plate."),
 ("airam-plate-assortment",30682935,(6000,4000),"Airam Dato-on / Pexels",
  "Assorted Yakitori Skewers on dark plate; inspect for other meat or chopped serving and complete edges."),
 ("airam-black-plates",30682902,(4000,6000),"Airam Dato-on / Pexels",
  "Yakitori Skewers on Black Plates; inspect for mixed meat, incomplete skewers, redundant plates."),
 ("airam-japanese-assortment",30682936,(5000,4000),"Airam Dato-on / Pexels",
  "Japanese yakitori assortment; check clear chicken, complete sticks and plate.")
]
def fetch(url):
  r=Request(url,headers={"User-Agent":"FysenAuthenticImageEditor/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*;q=0.8"})
  for i in range(3):
    try:
      with urlopen(r,timeout=90) as response:
        mime=response.headers.get("Content-Type","")
        raw=response.read(50*1024*1024+1)
      if not mime.startswith("image/") or not 0<len(raw)<=50*1024*1024:raise ValueError("Response not supported image")
      return raw
    except Exception:
      if i==2:raise
      time.sleep(2*(i+1))
success=0
for slug,pid,expected,credit,description in CANDIDATES:
  try:
    url=f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg"
    raw=fetch(url)
    with Image.open(BytesIO(raw)) as src:
      src.load()
      pic=ImageOps.exif_transpose(src).convert("RGB")
    w,h=pic.size
    if (w,h)!=expected:raise ValueError(f"Dimensions {w}x{h} unexpected, expected {expected}")
    p=ROOT/slug;p.mkdir(parents=True,exist_ok=True)
    (p/"source.jpeg").write_bytes(raw)
    small=pic.copy();small.thumbnail((1050,1050),Image.Resampling.LANCZOS)
    small.save(p/"preview.jpg",quality=93,optimize=True)
    pic.crop((w//2-700,h//2-700,w//2+700,h//2+700)).save(p/"detail-1400.jpg",quality=94,optimize=True)
    record=dict(dish_id="yakitori",catalog_id="yakitori",source_photo_author=credit,
      photo_page=f"https://www.pexels.com/photo/{pid}/",photo_source_url=url,
      photo_license="https://www.pexels.com/license/",native_width=w,native_height=h,
      source_sha256=sha256(raw).hexdigest(),notes=description,
      source_verified=True,no_upscale=True,visual_review_completed=False,approved_for_fysen=False,published=False,
      gate="Verify grilled CHICKEN skewers, not unrelated kebab/pork or mixed skewers. Complete sticks on a single serving; no invented pixels, retain all food against black background.")
    (p/"review.json").write_text(json.dumps(record,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    success+=1
    print(f"STAGED {slug} {w}x{h} SHA256={record['source_sha256']} unapproved")
  except Exception as e:print(f"REJECTED {slug}: {type(e).__name__} {e}")
assert success>=1,"Zero authentic sources; stop"
print(f"YAKITORI: {success} sources verified, zero approved or published")
