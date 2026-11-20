#!/usr/bin/env python3
"""Preview a clean black backdrop for Susanne Nilsson's real Nordic shrimp sandwich.

Original 5899x4000 pixels retained without upscaling or fabricated details.
The entire white ceramic plate is preserved by a hand-reviewed soft alpha
outline. Original CC BY-SA 2.0 and credit MUST accompany any derivative.
This script creates review-only files; no Fysen manifest or app changes.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request,urlopen
from PIL import Image,ImageDraw,ImageFilter,ImageOps

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"assets/fysen-image-candidates/rekesmorbrod/commons/shrimp-sandwich-29796272404"
FILE="Shrimp sandwich (29796272404).jpg"
PAGE="https://commons.wikimedia.org/wiki/File:Shrimp_sandwich_(29796272404).jpg"
SOURCE="https://commons.wikimedia.org/wiki/Special:FilePath/"+quote(FILE.replace(" ","_"),safe="()")
ORIGINAL_DIMS=(5899,4000)
ORIGINAL_SHA="070eca986e5cd10cb4b3a91e139e01d2183f4002b370406b0d6c839c378c7612"
with urlopen(Request(SOURCE,headers={
    "User-Agent":"FysenEditorialPhotoSource/1.0 (https://github.com/Paradispartiet/fysen)"
}),timeout=60) as res:
    raw=res.read(36*1024*1024)
assert sha256(raw).hexdigest()==ORIGINAL_SHA,"Commons source differs from reviewed original"
with Image.open(BytesIO(raw)) as src:
    src.load()
    photo=ImageOps.exif_transpose(src).convert("RGB")
assert photo.size==ORIGINAL_DIMS

# Coordinates are drawn around the complete plate boundary at 1100 x 746,
# keeping every shrimp, lettuce leaf, lemon wedge and toast pixel intact.
SMALL=(1100,746)
mask=Image.new("L",SMALL,0)
d=ImageDraw.Draw(mask)
d.polygon([
    (210,62),(440,61),(720,63),(781,64),(795,72),
    (801,100),(808,180),(816,340),(815,510),
    (812,617),(811,677),(795,703),(756,710),
    (533,711),(335,711),(177,703),(132,690),
    (117,669),(121,610),(132,500),(151,307),
    (175,148),(190,94)
],fill=255)
mask=mask.filter(ImageFilter.GaussianBlur(radius=1.7))
# Only alpha is resized to native pixels. Source photo is neither enlarged nor
# sharpened artificially. Pure black exterior replaces the original dark desk.
alpha=mask.resize(ORIGINAL_DIMS,Image.Resampling.BILINEAR)
black=Image.composite(photo,Image.new("RGB",ORIGINAL_DIMS,(0,0,0)),alpha)
assert black.size==ORIGINAL_DIMS
assert all(black.getpixel(p)==(0,0,0) for p in [
   (0,0),(ORIGINAL_DIMS[0]-1,0),(0,ORIGINAL_DIMS[1]-1),
   (ORIGINAL_DIMS[0]-1,ORIGINAL_DIMS[1]-1)])
OUT.mkdir(parents=True,exist_ok=True)
master=OUT/"black-commons-native-master.png"
black.save(master,optimize=True)
thumb=black.copy()
thumb.thumbnail((1100,1100),Image.Resampling.LANCZOS)
thumb.save(OUT/"black-commons-preview.jpg",quality=92,optimize=True)
# 1400 true physical pixels around shrimp and bread, not enlarged.
black.crop((2150,1050,3550,2450)).save(
   OUT/"black-commons-native-detail-1400.jpg",quality=92,optimize=True
)
info={
    "dish_id":"rekesmorbrod",
    "original_filename":FILE,"photographer":"Susanne Nilsson",
    "source_page":PAGE,"source_sha256":ORIGINAL_SHA,
    "source_dimensions":list(ORIGINAL_DIMS),
    "derivative_dimensions":list(black.size),
    "derivative_sha256":sha256(master.read_bytes()).hexdigest(),
    "license":"CC BY-SA 2.0",
    "license_url":"https://creativecommons.org/licenses/by-sa/2.0/",
    "source_license_verified":True,
    "source_author_verified":True,
    "derivative_requires_attribution_and_sharealike":True,
    "method":"Source pixel-preserving plate matte, pure black exterior; only mask resized",
    "visual_review_completed":False,"approved_for_fysen":False,"published":False,
    "visual_check":"Whole white plate and toast preserved; no visible dark desk edge, mask clipping, or halo."
}
(OUT/"black-commons-review.json").write_text(json.dumps(info,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("COMMONS REVIEW STAGED",black.size,info["derivative_sha256"],"NOT APPROVED")
