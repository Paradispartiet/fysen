#!/usr/bin/env python3
"""Stage genuine cacio e pepe photos for human visual approval only.

Fetch source original bytes; never enlarge, generate food, approve, or publish.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
from urllib.error import HTTPError
import json,time
from PIL import Image,ImageOps

OUT=Path("assets/fysen-image-candidates/cacio-e-pepe")
PHOTOS=[
  dict(slug="luca-volpe-pexels",url="https://images.pexels.com/photos/34797458/pexels-photo-34797458.jpeg",
       page="https://www.pexels.com/photo/cacio-e-pepe-italian-pasta-dish-top-view-34797458/",
       author="Luca Volpe Productions / Pexels", license="https://www.pexels.com/license/",
       expected=(3024,4032)),
  dict(slug="popo-le-chien-commons",url="https://upload.wikimedia.org/wikipedia/commons/9/99/Cacio_e_pepe.jpg",
       page="https://commons.wikimedia.org/wiki/File:Cacio_e_pepe.jpg",
       author="Popo le Chien / Wikimedia Commons",license="https://creativecommons.org/licenses/by-sa/3.0/",
       expected=(3794,2136)),
  dict(slug="der-zahir-commons",url="https://upload.wikimedia.org/wikipedia/commons/0/0d/Spaghetti_cacio_e_pepe_%28creamy_as_it_should_be%29.jpg",
       page="https://commons.wikimedia.org/wiki/File:Spaghetti_cacio_e_pepe_(creamy_as_it_should_be).jpg",
       author="Der Zahir / Wikimedia Commons",license="https://creativecommons.org/licenses/by-sa/4.0/",
       expected=(3008,2000)),
]
def fetch(url):
    req=Request(url,headers={
      "User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)",
      "Accept":"image/jpeg,image/*;q=0.8"})
    for i in range(3):
      try:
        with urlopen(req,timeout=55) as response:
          content_type=response.headers.get("Content-Type","")
          raw=response.read(35*1024*1024+1)
        assert content_type.startswith("image/"),f"Invalid Content-Type {content_type}"
        assert 0<len(raw)<=35*1024*1024
        return raw
      except HTTPError as e:
        if i==2 or e.code not in (429,500,502,503,504):raise
        time.sleep(3*(i+1))
    raise RuntimeError("Cannot download")
def stage(photo):
    raw=fetch(photo["url"])
    with Image.open(BytesIO(raw)) as im:
      im.load()
      pic=ImageOps.exif_transpose(im).convert("RGB")
    w,h=pic.size
    assert (w,h)==photo["expected"],f"Native photo dimensions changed: {w}×{h}"
    assert min(w,h)>=1600
    folder=OUT/photo["slug"]
    folder.mkdir(parents=True,exist_ok=True)
    (folder/"source.jpeg").write_bytes(raw)
    preview=pic.copy()
    preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(folder/"preview.jpg",quality=91,optimize=True)
    native=pic.crop((w//2-700,h//2-700,w//2+700,h//2+700))
    native.save(folder/"native-detail-1400.jpg",quality=92,optimize=True)
    meta=dict(dish_id="cacio-e-pepe",source_page=photo["page"],
       source_download_url=photo["url"],photographer_claim=photo["author"],
       license_claim=photo["license"],native_width=w,native_height=h,
       source_sha256=sha256(raw).hexdigest(),
       source_download_verified=True,visual_review_completed=False,
       attribution_verified=False,approved_for_fysen=False,published=False,
       quality_gate=("Cacio e pepe: clearly identifiable spaghetti/tonnarelli "
       "with pecorino and black pepper. Whole pasta serving and ideally "
       "whole plate visible; clean natural separation against solid black "
       "background. No added tomatoes, meat, eggs, cream, or invented food. "
       "Native 1400px detail sharp, source at least 1600x1600. No upscaling."),
       consideration="Visually inspect dish fidelity, whole plate, separation difficulty, and native texture. Do not auto-approve.")
    (folder/"review.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("STAGED",photo["slug"],w,h,"SHA",meta["source_sha256"],"REVIEW ONLY")
if __name__=="__main__":
  successes=0
  for item in PHOTOS:
    try: stage(item); successes+=1
    except Exception as e: print("SOURCE_UNAVAILABLE",item["slug"],type(e).__name__,str(e))
  assert successes>=1,"No verified native source; cannot proceed"
  print(f"{successes} genuine photo candidates staged, 0 approved, no publication")
