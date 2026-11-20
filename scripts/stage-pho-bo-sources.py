#!/usr/bin/env python3
"""Stage real phở bò photo originals for review. No automated approval."""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
from urllib.error import HTTPError
import json,time
from PIL import Image,ImageOps

ROOT=Path("assets/fysen-image-candidates/pho-bo")
SOURCES=[
 dict(slug="undo-kim-pexels",url="https://images.pexels.com/photos/34683316/pexels-photo-34683316.jpeg",
      page="https://www.pexels.com/photo/delicious-bowl-of-traditional-vietnamese-pho-34683316/",
      author="UNDO KIM / Pexels",license="https://www.pexels.com/license/",expected=(5472,3648)),
 dict(slug="eduardo-escalante-pexels",url="https://images.pexels.com/photos/29305882/pexels-photo-29305882.jpeg",
      page="https://www.pexels.com/photo/delicious-vietnamese-pho-bo-with-fresh-herbs-29305882/",
      author="Eduardo Escalante / Pexels",license="https://www.pexels.com/license/",expected=(3267,2178)),
 dict(slug="azzam-najib-pexels",url="https://images.pexels.com/photos/28712897/pexels-photo-28712897.jpeg",
      page="https://www.pexels.com/photo/delicious-bowl-of-vietnamese-pho-noodle-soup-28712897/",
      author="Azzam Najib / Pexels",license="https://www.pexels.com/license/",expected=(3472,4624)),
 dict(slug="pelican-commons",url="https://upload.wikimedia.org/wikipedia/commons/6/64/Beef_pho_%2814698023972%29.jpg",
      page="https://commons.wikimedia.org/wiki/File:Beef_pho_(14698023972).jpg",
      author="pelican / Wikimedia Commons",license="https://creativecommons.org/licenses/by-sa/2.0/",expected=(5472,3648)),
 dict(slug="pannet-commons",url="https://upload.wikimedia.org/wikipedia/commons/1/10/Noodle_soup_beef_Pho.jpg",
      page="https://commons.wikimedia.org/wiki/File:Noodle_soup_beef_Pho.jpg",
      author="Pannet / Wikimedia Commons",license="https://creativecommons.org/licenses/by/4.0/",expected=(3784,3264)),
]

def download(url):
  req=Request(url,headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*;q=0.8"})
  for i in range(3):
    try:
      with urlopen(req,timeout=55) as res:
        mime=res.headers.get("Content-Type","")
        raw=res.read(35*1024*1024+1)
      assert mime.startswith("image/"),f"Invalid mime {mime}"
      assert 0<len(raw)<=35*1024*1024
      return raw
    except HTTPError as e:
      if e.code not in (429,500,502,503,504) or i==2:raise
      time.sleep(4*(i+1))
  raise RuntimeError("Source unavailable")

def stage(s):
  raw=download(s["url"])
  with Image.open(BytesIO(raw)) as im:
    im.load()
    pic=ImageOps.exif_transpose(im).convert("RGB")
  w,h=pic.size
  assert (w,h)==s["expected"],f"Changed original {s['slug']}: {(w,h)}"
  assert min(w,h)>=1600
  target=ROOT/s["slug"]
  target.mkdir(parents=True,exist_ok=True)
  (target/"source.jpeg").write_bytes(raw)
  tiny=pic.copy()
  tiny.thumbnail((1100,1100),Image.Resampling.LANCZOS)
  tiny.save(target/"preview.jpg",quality=92,optimize=True)
  pic.crop((w//2-700,h//2-700,w//2+700,h//2+700)).save(
    target/"native-detail-1400.jpg",quality=93,optimize=True)
  info=dict(dish_id="pho",variant="phở bò (Vietnamese beef noodle soup)",
      source_page=s["page"],source_url=s["url"],author=s["author"],
      license_url=s["license"],native_width=w,native_height=h,
      source_sha256=sha256(raw).hexdigest(),download_verified=True,
      no_upscale=True,visual_review_completed=False,approved_for_fysen=False,
      published=False,visual_gate="Must show genuine beef phở with flat rice noodles, beef and broth, not vegetarian chicken pho or a different soup. Complete serving and ideally complete bowl; sharp native food pixels; no enlargement or invented content, black background natural after masking.")
  (target/"review.json").write_text(json.dumps(info,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  print("STAGED",s["slug"],w,h,info["source_sha256"],"review only")
if __name__=="__main__":
  ok=0
  for item in SOURCES:
    try:stage(item);ok+=1
    except Exception as exc:print("NOT STAGED",item["slug"],type(exc).__name__,str(exc))
  assert ok>=1,"No source can be verified"
  print(f"{ok} original native candidate photos staged; no approval/publication")
