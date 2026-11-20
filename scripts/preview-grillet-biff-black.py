#!/usr/bin/env python3
"""Create a review-only black-background steak photograph from native Pexels pixels.

The original photo is 6000x4000. Only an anti-aliased *mask* is resized,
never the original beef/fries pixels. Nothing is approved or deployed here.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request,urlopen
from PIL import Image,ImageDraw,ImageFilter

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"assets/fysen-image-candidates/grillet-biff/27643022"
SOURCE="https://images.pexels.com/photos/27643022/pexels-photo-27643022.jpeg"
SOURCE_SHA="5be970f862fb8a62e3abc9ca4337d41498385968297d61119cb9a832ab6fa3c6"
EXPECTED=(6000,4000)
REQ=Request(SOURCE,headers={"User-Agent":"FysenEditorialReview/1.0","Accept":"image/jpeg"})
with urlopen(REQ,timeout=50) as res:
    raw=res.read(45*1024*1024+1)
assert sha256(raw).hexdigest()==SOURCE_SHA,"Pexels source changed since verification"
with Image.open(BytesIO(raw)) as p:
    p.load()
    original=p.convert("RGB")
assert original.size==EXPECTED
# Matting coordinates follow the 1100x733 review view of this exact source.
# Black iron plate and the food are protected together, removing the wooden
# serving tray surrounding it. The second region retains fries at the top.
mask=Image.new("L",(1100,733),0)
draw=ImageDraw.Draw(mask)
draw.polygon([
 (54,385),(74,349),(128,310),(208,275),(336,242),(462,220),
 (585,208),(745,197),(914,210),(991,238),(1035,284),
 (1052,335),(1040,445),(1003,495),(949,546),(830,586),
 (684,612),(532,630),(364,606),(217,572),(113,529),(55,481)
],fill=255)
draw.polygon([
 (357,292),(421,228),(479,179),(534,139),(608,113),
 (780,109),(899,143),(990,195),(1031,253),(990,304),
 (840,335),(570,328)
],fill=255)
mask=mask.filter(ImageFilter.GaussianBlur(radius=6.5))
alpha=mask.resize(EXPECTED,Image.Resampling.BICUBIC)
# Native food pixels retained; background becomes exact RGB(0,0,0).
native=Image.composite(original,Image.new("RGB",EXPECTED,(0,0,0)),alpha)
OUT.mkdir(parents=True,exist_ok=True)
original_path=OUT/"black-native-master.png"
native.save(original_path,optimize=True)
preview=native.copy()
preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
preview.save(OUT/"black-preview.jpg",quality=90,optimize=True)
native.crop((2200,1300,3600,2700)).save(
    OUT/"black-native-detail-1400.jpg",quality=92,optimize=True)
result={
 "dish_id":"grillet-biff","photo_id":27643022,
 "photographer":"Nano Erdozain / Pexels",
 "source_page":"https://www.pexels.com/photo/a-steak-and-fries-on-a-plate-with-a-fork-27643022/",
 "license_url":"https://www.pexels.com/license/",
 "source_size":[6000,4000],"source_sha256":SOURCE_SHA,
 "native_review_size":[6000,4000],
 "native_review_sha256":sha256(original_path.read_bytes()).hexdigest(),
 "description":"Grilled steak with french fries, small green peppers and dark serving platter; no tomatoes or sliced medium-rare claim",
 "method":"Black-background editorial matte; original food pixels unchanged; only matte scaled",
 "visual_review_completed":False,"approved_for_fysen":False,"published":False,
 "review_required":"Inspect entire platter silhouette, fries, peppers and steak rim at full view; verify no wooden board remnants, clipping or artificial softening."
}
(OUT/"black-review.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print(f"STAGED 6000x4000 native steak for visual review, SHA {result['native_review_sha256']} (not approved)")
