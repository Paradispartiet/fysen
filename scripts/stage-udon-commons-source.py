#!/usr/bin/env python3
"""Stage correctly-labelled real ebi-tempura udon original from Wikimedia Commons."""
from pathlib import Path
from urllib.request import Request,urlopen
from io import BytesIO
from hashlib import sha256
from PIL import Image,ImageOps
import json
C=Path("assets/fysen-image-candidates/udon-tempura/commons-bukkake-ebi")
URL="https://upload.wikimedia.org/wikipedia/commons/3/37/Bukkake_Udon_with_%E3%81%88%E3%81%B3%E5%A4%A9.jpg"
PAGE="https://commons.wikimedia.org/wiki/File:Bukkake_Udon_with_%E3%81%88%E3%81%B3%E5%A4%A9.jpg"
req=Request(URL,headers={"User-Agent":"FysenEditorialReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*"})
with urlopen(req,timeout=110) as response:
  raw=response.read(16*1024*1024+1)
  mime=response.headers.get("Content-Type","")
assert mime.startswith("image/") and 0<len(raw)<16*1024*1024,(mime,len(raw))
with Image.open(BytesIO(raw)) as src:
  src.load()
  picture=ImageOps.exif_transpose(src).convert("RGB")
w,h=picture.size
assert (w,h)==(3024,4032),(w,h)
C.mkdir(parents=True,exist_ok=True)
(C/"source.jpeg").write_bytes(raw)
prev=picture.copy()
prev.thumbnail((1050,1050),Image.Resampling.LANCZOS)
prev.save(C/"preview.jpg",quality=94,optimize=True)
cx,cy=w//2,h//2
picture.crop((cx-700,cy-700,cx+700,cy+700)).save(C/"detail-1400.jpg",quality=94,optimize=True)
data=dict(dish_id="udon",catalog_id="udon",variant="udon med reketempura",
  author="Immanuelle / Wikimedia Commons",source_page=PAGE,source_url=URL,
  photo_license="https://creativecommons.org/licenses/by/4.0/",
  license="CC BY 4.0",source_sha256=sha256(raw).hexdigest(),
  native_width=w,native_height=h,source_verified=True,
  no_upscale=True,notes="Single traditional udon bowl with one clearly visible ebi tempura prawn protruding above rim, spring onions and fish cake; attribution and transformed-image disclosure required.",
  visual_review_completed=False,approved_for_fysen=False,published=False)
(C/"review.json").write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print(f"WIKIMEDIA UDON: authentic original {w}x{h}, sha256 {data['source_sha256']}, CC BY 4.0, unapproved")
