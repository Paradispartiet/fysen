#!/usr/bin/env python3
"""Create a BLACK-BACKGROUND CANDIDATE for green curry, not an approved dish image.

Only original Pexels source pixels are used, with a hand-reviewed approximate bowl outline.
Full original stays in temporary GitHub Actions artifact; no public images are changed.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen
import json
from PIL import Image, ImageDraw, ImageFilter, ImageOps

HERE = Path("assets/fysen-image-candidates/green-curry/max-griss-chicken-pexels")
review = json.loads((HERE/"review.json").read_text(encoding="utf8"))
ORIGINAL_SHA = "105814ed9d3638846610fdc3735327c4bc1530b33a5590ebb84872c1562a5a25"
assert review["dish_id"] == review["catalog_id"] == "green-curry"
assert review["original_sha256"] == ORIGINAL_SHA
assert review["source_download_verified"] and review["no_upscale"]
assert not review["visual_review_completed"]
assert not review["approved_for_fysen"] and not review["published"]

req=Request(review["original_url"], headers={
    "User-Agent":"FysenEditorialReview/1.0 (https://github.com/Paradispartiet/fysen)",
    "Accept":"image/jpeg,image/*;q=0.8",
})
with urlopen(req,timeout=75) as response:
    raw=response.read(42*1024*1024+1)
assert sha256(raw).hexdigest() == ORIGINAL_SHA, "Source changed: reject before processing"
with Image.open(BytesIO(raw)) as photo:
    photo.load()
    src=ImageOps.exif_transpose(photo).convert("RGB")
w,h=src.size
assert (w,h)==(3017,3771)
# Coordinates are in the same 880 × 1100 coordinate system as the original
# no-upscale staging preview. The polygon surrounds the complete main bowl,
# excluding the second bowl at the right edge, table and out-of-focus sides.
# This is intentionally a preview mask, NOT yet an approved final silhouette.
outline=[
    (98,464),(114,424),(145,390),(190,362),(248,342),(317,331),
    (389,327),(462,328),(535,336),(609,347),(677,366),
    (731,393),(775,428),(805,467),(827,521),(838,573),
    (838,628),(826,681),(805,735),(779,784),(742,826),
    (690,862),(627,892),(551,915),(476,932),(396,936),
    (318,927),(245,907),(181,879),(134,842),(103,794),
    (83,743),(72,689),(71,628),(78,565),(87,508),
]
scale_x=w/880
scale_y=h/1100
coords=[(round(x*scale_x),round(y*scale_y)) for x,y in outline]
mask=Image.new("L",(w,h),0)
draw=ImageDraw.Draw(mask)
draw.polygon(coords,fill=255)
mask=mask.filter(ImageFilter.GaussianBlur(radius=2.8))
out=Image.composite(src,Image.new("RGB",(w,h),(0,0,0)),mask)
# Never stretch; previews are downsampled, detail comes directly from native pixels.
out.save(HERE/"black-polygon-native.png",compress_level=4)
preview=out.copy()
preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
preview.save(HERE/"black-polygon-preview.jpg",quality=94,optimize=True)
cx=int(w*.50);cy=int(h*.58)
box=(cx-700,cy-700,cx+700,cy+700)
assert box[0]>=0 and box[1]>=0 and box[2]<=w and box[3]<=h
out.crop(box).save(HERE/"black-polygon-detail-1400.jpg",quality=94,optimize=True)
quality={
 "dish_id":"green-curry","catalog_id":"green-curry",
 "source_original_sha256":ORIGINAL_SHA,"source_native_dimensions":[w,h],
 "mask_method":"manual-bowl-boundary-preview","outline_preview_frame":[880,1100],
 "mask_is_approved":False,"visual_review_completed":False,
 "approved_for_fysen":False,"published":False,
 "no_upscale":True,"generated_food_pixels":False,
 "candidate_dimensions":[w,h],
 "candidate_sha256":sha256((HERE/"black-polygon-native.png").read_bytes()).hexdigest(),
 "preview_sha256":sha256((HERE/"black-polygon-preview.jpg").read_bytes()).hexdigest(),
 "review_gate":"Verify bowl outline at 1400px native: no cropped rim, no included second bowl, no green-sauce edge removed. Confirm exact chicken green curry; black backdrop. No approval or publication before visual inspection."
}
(HERE/"black-polygon-review.json").write_text(json.dumps(quality,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("BLACK_POLYGON_STAGED",w,h,quality["candidate_sha256"],"APPROVED=NO",flush=True)
