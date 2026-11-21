#!/usr/bin/env python3
"""Stage authentic tempura + udon Pexels originals for review only. No approvals."""
from __future__ import annotations
from pathlib import Path
from urllib.request import Request,urlopen
from io import BytesIO
from hashlib import sha256
from PIL import Image,ImageOps
import json,time
CANDIDATES=[
  ("loifotos-tempura-udon",35588672,(4000,6000),"Loifotos / Pexels",
   "Japanese cuisine assortment with udon, tempura and drink; verify visible prawn and bowl."),
  ("hanh-lee-udon-tempura",41057285,(3024,4032),"Hanh lee 02 / Pexels",
   "Asian meal with udon noodles, tempura and sides; verify whole udon serving and ebi tempura."),
  ("loifotos-fusion-tempura",35588670,None,"Loifotos / Pexels",
   "Tempura shrimp and udon in Japanese-Vietnamese assortment; verify whole serving and no unrelated dishes.")
]
OUT=Path("assets/fysen-image-candidates/udon-tempura")
def fetch(uri):
  req=Request(uri,headers={"User-Agent":"FysenEditorialReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/*"})
  for attempt in range(3):
    try:
      with urlopen(req,timeout=95) as res:
        raw=res.read(48*1024*1024+1)
        mime=res.headers.get("Content-Type","")
      assert mime.startswith("image/") and len(raw)<=48*1024*1024 and raw
      return raw
    except Exception:
      if attempt==2:raise
      time.sleep(3*(attempt+1))
success=0
for slug,pid,expected,author,notes in CANDIDATES:
  try:
    uri=f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg"
    raw=fetch(uri)
    with Image.open(BytesIO(raw)) as im:
      im.load()
      photo=ImageOps.exif_transpose(im).convert("RGB")
    w,h=photo.size
    assert min(w,h)>=2000,(w,h)
    if expected is not None: assert (w,h)==expected,(w,h,expected)
    dst=OUT/slug;dst.mkdir(parents=True,exist_ok=True)
    (dst/"source.jpeg").write_bytes(raw)
    preview=photo.copy()
    preview.thumbnail((1050,1050),Image.Resampling.LANCZOS)
    preview.save(dst/"preview.jpg",quality=92,optimize=True)
    photo.crop((w//2-700,h//2-700,w//2+700,h//2+700)).save(
      dst/"detail-1400.jpg",quality=94,optimize=True)
    record=dict(dish_id="udon",catalog_id="udon",variant="udon med reketempura",
      source_photo_author=author,photo_source_page=f"https://www.pexels.com/photo/{pid}/",
      photo_source_url=uri,photo_license="https://www.pexels.com/license/",
      original_sha256=sha256(raw).hexdigest(),native_width=w,native_height=h,
      source_verified=True,no_upscale=True,notes=notes,
      visual_review_completed=False,approved_for_fysen=False,published=False,
      review_gate=("Must visually confirm thick UDON noodles and breaded shrimp TEMPURA, "
      "not plain shrimp soup/soba. Must retain complete serving against black background, "
      "without generated ingredients, composite collage, upscaling or false restaurant attribution."))
    (dst/"review.json").write_text(json.dumps(record,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(f"STAGED {slug}: {w}x{h}, sha256={record['original_sha256']} unapproved")
    success+=1
  except Exception as error:
    print(f"REJECTED {slug}: {type(error).__name__}: {error}")
assert success>=1,"No original source passed validation"
print(f"UDON TEMPURA: {success} source-verified candidates, 0 approved/published")
