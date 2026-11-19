#!/usr/bin/env python3
"""Preview neural foreground matting of the EXISTING licensed shrimp photograph.

Pexels source pixels are never enlarged or generatively changed. The trained
U2Net model produces an alpha mask at low resolution, which is then combined
with an exact manual plate protection area. The result is review-only: no
approval, no public media update, and no deployment.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request, urlopen
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps
from rembg import new_session, remove

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"assets/fysen-image-candidates/rekesmorbrod/40853857"
URL="https://images.pexels.com/photos/40853857/pexels-photo-40853857.jpeg"
EXPECTED="de9b42bd81dafda2cabc3551db63162f29119fdb4af61469b9a601cdc289fdf7"
ORIGINAL=(4284,5712)
NATIVE_CROP=(150,2180,4100,5520)
SMALL=(825,1100)

req=Request(URL,headers={"User-Agent":"FysenSourceVerifiedFoodPhoto/1.0","Accept":"image/jpeg"})
with urlopen(req,timeout=60) as response:
    data=response.read(48*1024*1024+1)
assert sha256(data).hexdigest()==EXPECTED, "Pexels source changed"
with Image.open(BytesIO(data)) as inp:
    inp.load()
    source=ImageOps.exif_transpose(inp).convert("RGB")
assert source.size==ORIGINAL

# Run a non-generative segmentation model on 825x1100, maintaining camera
# pixels as-is. This alpha mask is not a generated picture.
small=source.resize(SMALL,Image.Resampling.LANCZOS)
session=new_session("u2net")
predicted=remove(small,session=session,only_mask=True)
if predicted.mode != "L":
    predicted=predicted.convert("L")
foreground=np.asarray(predicted,dtype=np.float32)/255.0

# A conservative edit region ensures the model cannot label the wine bottle,
# glass or tall room background as food. It leaves transparent gaps within
# fine dill strands where the model detects the real photo foreground.
region=Image.new("L",SMALL,0)
draw=ImageDraw.Draw(region)
draw.polygon([
 (236,765),(248,695),(278,626),(319,555),(342,515),
 (363,482),(382,463),(408,452),(438,447),(469,467),
 (500,498),(543,542),(570,597),(597,663),(616,727),
 (570,785),(400,794),(285,788)
],fill=255)
coarse=np.asarray(region.filter(ImageFilter.GaussianBlur(1.8)),dtype=np.float32)/255.0
fore_alpha=foreground*coarse

# Guaranteed untouched plate and food foreground. These are native pixels
# of the image, not artificial recolouring, and protect ALL loose shrimp.
plate=Image.new("L",SMALL,0)
pdraw=ImageDraw.Draw(plate)
pdraw.ellipse((49,618,757,1035),fill=255)
pdraw.polygon([
 (246,674),(278,609),(314,559),(354,526),(383,523),
 (433,525),(472,537),(506,568),(549,606),(573,653),
 (571,728),(514,774),(288,782)
],fill=255)
plate_a=np.asarray(plate.filter(ImageFilter.GaussianBlur(2.0)),dtype=np.float32)/255.0
yy=np.arange(SMALL[1],dtype=np.float32)[:,None]
plate_blend=np.clip((yy-632.0)/40.0,0.0,1.0)
# Model is entrusted ONLY with complex dill/lemon garnish above the plate.
# Do not allow protected plate to reintroduce the window or wine glass above it.
final=np.clip(np.maximum(fore_alpha*(1.0-plate_blend),
                          plate_a*plate_blend),0.0,1.0)
mask=Image.fromarray(np.uint8(final*255),"L")
alpha_full=mask.resize(ORIGINAL,Image.Resampling.BILINEAR)

native=source.crop(NATIVE_CROP)
alpha=alpha_full.crop(NATIVE_CROP)
assert native.size==(3950,3340)
black=Image.composite(native,Image.new("RGB",native.size,(0,0,0)),alpha)
assert all(black.getpixel(xy)==(0,0,0) for xy in ((0,0),(3949,0),(0,3339),(3949,3339)))
OUT.mkdir(parents=True,exist_ok=True)
original_file=OUT/"black-neural-native-master.png"
black.save(original_file,optimize=True)
overview=black.copy()
overview.thumbnail((1050,1050),Image.Resampling.LANCZOS)
overview.save(OUT/"black-neural-preview.jpg",quality=91,optimize=True)
black.crop((1180,740,2580,2140)).save(
    OUT/"black-neural-detail-1400.jpg",quality=92,optimize=True)
evidence={
 "dish_id":"rekesmorbrod",
 "photo_id":40853857,
 "source_sha256":EXPECTED,
 "source_original_dimensions":list(ORIGINAL),
 "crop_native_dimensions":[3950,3340],
 "output_sha256":sha256(original_file.read_bytes()).hexdigest(),
 "mask_method":"U2Net foreground segmentation on thumbnail + hand-protected plate and sandwich alpha; only alpha mask was resized",
 "native_food_pixels_resized":False,
 "visual_review_completed":False,"approved_for_fysen":False,"published":False,
 "source_page":"https://www.pexels.com/photo/elegant-shrimp-sandwich-with-white-wine-40853857/",
 "license_url":"https://www.pexels.com/license/",
 "photographer":"Ida Jigfelt / Pexels",
 "review_required":"Inspect fine dill and lemon edges, entire shrimp and turquoise plate, absence of wine glass, brown wall and other halo before approval."
}
(OUT/"black-neural-review.json").write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("NEURAL PREVIEW ready",black.size,evidence["output_sha256"],"NOT APPROVED")
