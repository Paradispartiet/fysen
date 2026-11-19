#!/usr/bin/env python3
"""Stage source-verified native salmon photographs for an editorial image review.

Never publishes photos. Full-size original photos stay in short-lived Actions
artifacts; only 1:1 detail crops and previews are committed to the review PR.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "assets/fysen-image-candidates/grillet-laks"
LIMIT = 40 * 1024 * 1024
CANDIDATES = [
 (15716236, "Nanda Mends", "https://www.pexels.com/photo/delicious-fish-on-black-plate-15716236/"),
 (29149758, "Nano Erdozain", "https://www.pexels.com/photo/gourmet-salmon-dish-with-fresh-vegetables-29149758/"),
 (5531039, "Rachel Claire", "https://www.pexels.com/photo/cooked-food-on-black-ceramic-plate-5531039/"),
 (31043029, "Giovanna Kamimura", "https://www.pexels.com/photo/delicious-grilled-salmon-fillets-on-plate-31043029/"),
]
def stage(photo_id:int, photographer:str, source_page:str)->None:
    folder=DEST/str(photo_id)
    review=folder/"review.json"
    if review.exists():
        data=json.loads(review.read_text(encoding="utf8"))
        assert data["photo_id"]==photo_id and data["source_verified"]
        return
    url=f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
    req=Request(url,headers={
      "User-Agent":"FysenNativeSourceReview/1.0 (https://github.com/Paradispartiet/fysen)",
      "Accept":"image/jpeg"
    })
    with urlopen(req,timeout=50) as response:
        assert response.headers.get("Content-Type","").lower().startswith("image/")
        raw_bytes=response.read(LIMIT+1)
    assert len(raw_bytes)<=LIMIT and raw_bytes.startswith(bytes.fromhex("ffd8ff"))
    with Image.open(BytesIO(raw_bytes)) as raw:
        raw.load()
        picture=ImageOps.exif_transpose(raw).convert("RGB")
    width,height=picture.size
    assert min(width,height)>=2500,f"Insufficient native resolution {picture.size}"
    folder.mkdir(parents=True,exist_ok=False)
    (folder/"source.jpeg").write_bytes(raw_bytes)
    preview=picture.copy()
    preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(folder/"preview.jpg",quality=90,optimize=True)
    cx,cy=width//2,height//2
    picture.crop((cx-700,cy-700,cx+700,cy+700)).save(
        folder/"native-detail-1400.jpg",quality=92,optimize=True)
    result={
      "dish_id":"grillet-laks",
      "photo_id":photo_id,
      "photographer":photographer,
      "source_page":source_page,
      "license":"Pexels License",
      "license_url":"https://www.pexels.com/license/",
      "original_url":url,
      "source_native_width":width,
      "source_native_height":height,
      "source_sha256":sha256(raw_bytes).hexdigest(),
      "source_verified":True,
      "visual_review_completed":False,
      "approved_for_fysen":False,
      "published":False,
      "criteria":"Grilled salmon recognisable, crisp at native 1:1, one whole serving, solid black background, realistic plating, no plate or cutlery falsely removed, no upscaling.",
      "caution":"Editorial example only, never restaurant-specific. Do not claim accompaniment not visible."
    }
    review.write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(f"STAGED {photo_id} {width}x{height} {result['source_sha256']} (not approved)")
if __name__=="__main__":
    count=0
    for photo_id, credit, page in CANDIDATES:
        try:
            stage(photo_id,credit,page)
            count+=1
        except Exception as error:
            print(f"REJECTED {photo_id}: {type(error).__name__}: {error}")
    if not count:
        raise SystemExit("No usable native salmon photos")
    print(f"{count}/{len(CANDIDATES)} licensed candidates staged; no public Fysen photo touched")
