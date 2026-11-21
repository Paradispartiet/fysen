#!/usr/bin/env python3
"""Stage an authentic, correctly licensed braised pork gua-bao photo, without approval."""
from pathlib import Path
from urllib.request import Request,urlopen
from io import BytesIO
from hashlib import sha256
import json,time
from PIL import Image,ImageOps
P=Path("assets/fysen-image-candidates/braised-pork-bao/andy-li-cc0")
URL="https://upload.wikimedia.org/wikipedia/commons/6/64/Red_Braised_Pork_Belly_Bao_-_Tiger_Bites_Pig_2025-11-20.jpg"
PAGE="https://commons.wikimedia.org/wiki/File:Red_Braised_Pork_Belly_Bao_-_Tiger_Bites_Pig_2025-11-20.jpg"
headers={"User-Agent":"FysenOriginalImageReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*"}
for attempt in range(3):
  try:
    with urlopen(Request(URL,headers=headers),timeout=100) as r:
      raw=r.read(20*1024*1024+1)
      content_type=r.headers.get("Content-Type","")
    assert content_type.startswith("image/") and 0<len(raw)<20*1024*1024
    break
  except Exception:
    if attempt==2: raise
    time.sleep(3*(attempt+1))
with Image.open(BytesIO(raw)) as o:
  o.load()
  photo=ImageOps.exif_transpose(o).convert("RGB")
w,h=photo.size
assert (w,h)==(8160,6144),f"Not original resolution: {w}×{h}"
P.mkdir(parents=True,exist_ok=True)
(P/"source.jpeg").write_bytes(raw)
small=photo.copy();small.thumbnail((1200,1200),Image.Resampling.LANCZOS)
assert small.size==(1200,904) or small.size==(1200,903) or small.size==(1200,904)
small.save(P/"source-preview.jpg",quality=94,optimize=True)
photo.crop((w//2-700,h//2-700,w//2+700,h//2+700)).save(P/"detail-1400.jpg",quality=94,optimize=True)
r=dict(dish_id="bao",catalog_id="bao",variant="bao med braisert svinekjøtt",
  author="Andy Li / Wikimedia Commons",source_page=PAGE,source_url=URL,
  license="CC0 1.0",license_url="https://creativecommons.org/publicdomain/zero/1.0/",
  native_width=w,native_height=h,original_sha256=sha256(raw).hexdigest(),
  source_verified=True,no_upscale=True,visual_review_completed=False,
  approved_for_fysen=False,published=False,
  photo_context="A real red-braised pork belly bao with picked mustard greens, crushed peanuts and coriander, photographed at Tiger Bites Pig in Brighton. It is NOT a photograph from any restaurant in Fysen.",
  note="Must retain one whole folded bao and full serving plate, remove printed menu, glasses and wood table against black; source ingredients must remain truthful.")
(P/"review.json").write_text(json.dumps(r,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("BRAISED PORK BAO: source verified 8160x6144 SHA256="+r["original_sha256"]+" NOT APPROVED")
