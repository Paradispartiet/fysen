#!/usr/bin/env python3
"""Stage genuine chana masala photo candidates, without approving or publishing."""
from __future__ import annotations
from pathlib import Path
from urllib.request import Request,urlopen
from hashlib import sha256
from io import BytesIO
from PIL import Image,ImageOps
import json,time
OUT=Path("assets/fysen-image-candidates/chana-masala")
SOURCES=[
 ("nazir-whole-bowl",9287039,(3814,3024),"Muhammad Khawar Nazir / Pexels","Complete curry surface, earthenware bowl on embroidered cloth; check upper rim"),
 ("nazir-closeup",9287035,(4032,3024),"Muhammad Khawar Nazir / Pexels","Chana masala closeup; bowl cropped at edges"),
 ("chait-goli-bowl",4149256,(4000,5000),"Chait Goli / Pexels","Tomato-red chickpea curry with onion and parsley, closeup with bread"),
]
def fetch(url):
  req=Request(url,headers={"User-Agent":"FysenEditorialReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*"})
  for n in range(3):
    try:
      with urlopen(req,timeout=75) as response:
        mime=response.headers.get("Content-Type","")
        raw=response.read(45*1024*1024+1)
      assert mime.startswith("image/") and 0<len(raw)<=45*1024*1024
      return raw
    except Exception:
      if n==2: raise
      time.sleep(2*(n+1))
def main():
  count=0
  for slug,photo_id,expected,author,notes in SOURCES:
    try:
      source=f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
      raw=fetch(source)
      with Image.open(BytesIO(raw)) as im:
        im.load()
        pic=ImageOps.exif_transpose(im).convert("RGB")
      w,h=pic.size
      assert (w,h)==expected,(slug,(w,h),expected)
      assert min(w,h)>=1600
      target=OUT/slug
      target.mkdir(parents=True,exist_ok=True)
      (target/"source.jpeg").write_bytes(raw)
      pre=pic.copy()
      pre.thumbnail((1050,1050),Image.Resampling.LANCZOS)
      pre.save(target/"preview.jpg",quality=92,optimize=True)
      pic.crop((w//2-700,h//2-700,w//2+700,h//2+700)).save(target/"native-detail-1400.jpg",quality=94,optimize=True)
      metadata=dict(dish_id="chana-masala",catalog_id="chana-masala",photo_author=author,
        photo_page=f"https://www.pexels.com/photo/{photo_id}/",photo_source_url=source,
        photo_license="https://www.pexels.com/license/",
        native_width=w,native_height=h,original_sha256=sha256(raw).hexdigest(),
        photographer_notes=notes,source_verified=True,no_upscale=True,
        visual_review_completed=False,approved_for_fysen=False,published=False,
        quality_gate="Authentic chickpeas in spiced curry, preferably intact complete serving bowl with visible rim; no backdrop, bread, unrelated servings, or synthetic food pixels after black background.")
      (target/"review.json").write_text(json.dumps(metadata,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
      print(f"STAGED {slug}: {w}x{h}, SHA={metadata['original_sha256']} not approved")
      count+=1
    except Exception as e:
      print(f"REJECTED {slug}: {type(e).__name__}: {e}")
  assert count>=1,"No real source verified; do not approve or import"
  print(f"STAGED {count}, APPROVED 0, PUBLIC 0")
if __name__=="__main__":main()
