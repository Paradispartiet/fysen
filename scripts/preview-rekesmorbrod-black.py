#!/usr/bin/env python3
"""Prepare a black-background editorial shrimp open sandwich from licensed pixels.

Only the soft *foreground mask* is resized. Real shrimp, bread, dill, lemon,
onion and plate keep native camera pixels, with no generative changes.
Review-only: no public media or approvals written here.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
import json
import numpy as np
from PIL import Image, ImageOps, ImageDraw, ImageFilter

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"assets/fysen-image-candidates/rekesmorbrod/40853857"
SRC_URL="https://images.pexels.com/photos/40853857/pexels-photo-40853857.jpeg"
SRC_SHA="de9b42bd81dafda2cabc3551db63162f29119fdb4af61469b9a601cdc289fdf7"
SRC_DIMS=(4284,5712)
REQ=Request(SRC_URL,headers={"User-Agent":"FysenNativeImageReview/1.0 (github.com/Paradispartiet/fysen)","Accept":"image/jpeg"})
with urlopen(REQ,timeout=55) as response:
    raw=response.read(48*1024*1024+1)
assert sha256(raw).hexdigest()==SRC_SHA,"Source changed since native review"
with Image.open(BytesIO(raw)) as src:
    src.load()
    original=ImageOps.exif_transpose(src).convert("RGB")
assert original.size==SRC_DIMS

# Coordinates were hand-reviewed against the 825x1100 photo preview.
# Keep the turquoise plate and whole shrimp sandwich including loose shrimp.
# The narrow upper foreground contour keeps the lemon and dill but excludes
# window, wine bottle, wine glass and most of the wooden restaurant table.
mask_small=Image.new("L",(825,1100),0)
draw=ImageDraw.Draw(mask_small)
draw.ellipse((49,618,757,1035),fill=255)
draw.polygon([
    (252,655),(287,606),(327,555),(351,514),(371,479),
    (390,463),(417,464),(446,466),(470,488),(493,514),
    (521,536),(548,573),(573,623),(590,681),(569,732),
    (287,739)
],fill=255)
# In the upper garnish area a hand-drawn silhouette alone retains a tan
# window/wall triangle and the wine-glass stem. Key only natural GREEN, lemon
# YELLOW and shrimp/onion PINK colors there, and never key the plate or bread.
# This uses original photographic colors; it does not modify a food pixel.
mask_small=mask_small.filter(ImageFilter.GaussianBlur(radius=2.2))
small=np.asarray(original.resize((825,1100),Image.Resampling.LANCZOS),dtype=np.float32)
r,g,b=small[:,:,0],small[:,:,1],small[:,:,2]
green=(g>r*1.08)&(g>b*1.06)&(g>37)
lemon=(r>160)&(g>123)&(b<g*0.82)&(r>=g*0.95)
shrimp_onion=(r>108)&(r>g*1.17)&(b>g*0.90)&(b>73)
lemon_light=(r>210)&(g>190)&(b>118)&(r>b*1.16)
subject=np.uint8(green|lemon|shrimp_onion|lemon_light)*255
subject=Image.fromarray(subject,"L").filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.15))
base=np.asarray(mask_small,dtype=np.float32)
color_alpha=np.asarray(subject,dtype=np.float32)/255.0
# The lime, yellow lemon and pickled onion share highlights with the original
# window. Protect only their tightly bounded physical area, not the wall or
# the glass to the left. Green dill needles above remain color-keyed.
protected=Image.new("L",(825,1100),0)
protect_draw=ImageDraw.Draw(protected)
protect_draw.polygon([
    (353,609),(366,567),(393,544),(430,533),(466,529),
    (503,537),(527,559),(548,592),(558,631),
    (533,658),(390,664),(348,649)
],fill=255)
protect_alpha=np.asarray(protected.filter(ImageFilter.GaussianBlur(3.0)),dtype=np.float32)/255.0
color_alpha=np.maximum(color_alpha,protect_alpha)
ys=np.arange(1100,dtype=np.float32)[:,None]
# Keep wine stem masked until the upper lip of the plate, where the full
# original-pixel plate matte takes over without changing food details.
plate_blend=np.clip((ys-646.0)/22.0,0.0,1.0)
alpha_small=np.uint8(np.clip(base*(color_alpha*(1.0-plate_blend)+plate_blend),0,255))
mask_small=Image.fromarray(alpha_small,"L")
alpha_native=mask_small.resize(SRC_DIMS,Image.Resampling.BILINEAR)
# Crop only original source pixels (not enlargement) to make a wide black frame.
crop=(150,2180,4100,5520)
assert crop[2]-crop[0]==3950 and crop[3]-crop[1]==3340
photo=original.crop(crop)
alpha=alpha_native.crop(crop)
black=Image.composite(photo,Image.new("RGB",photo.size,(0,0,0)),alpha)
assert black.size==(3950,3340)
for xy in ((0,0),(3949,0),(0,3339),(3949,3339)):
    assert black.getpixel(xy)==(0,0,0),f"Unexpected image-corner pixels at {xy}"
OUT.mkdir(parents=True,exist_ok=True)
master=OUT/"black-native-master.png"
black.save(master,optimize=True)
preview=black.copy()
preview.thumbnail((1050,1050),Image.Resampling.LANCZOS)
preview.save(OUT/"black-preview.jpg",quality=91,optimize=True)
# True 1400x1400 pixel crop around shrimp, bread and dill, not resized.
black.crop((1180,740,2580,2140)).save(
    OUT/"black-native-detail-1400.jpg",quality=92,optimize=True
)
review={
 "dish_id":"rekesmorbrod","photo_id":40853857,
 "photographer":"Ida Jigfelt / Pexels",
 "source_page":"https://www.pexels.com/photo/elegant-shrimp-sandwich-with-white-wine-40853857/",
 "license_url":"https://www.pexels.com/license/",
 "source_original_size":list(SRC_DIMS),"source_sha256":SRC_SHA,
 "review_native_size":list(black.size),
 "review_native_sha256":sha256(master.read_bytes()).hexdigest(),
 "method":"Native pixel crop and hand-drawn foreground/plate alpha matte; only mask scaled, not food",
 "description":"Open-faced shrimp sandwich with peeled prawns, lemon, dill, pickled red onion on visible bread; turquoise serving plate",
 "visual_review_completed":False,"approved_for_fysen":False,"published":False,
 "visual_review_required":"Inspect all loose shrimp, dill and lemon for intact edges, plate outline for table leftovers, and native 1:1 detail before promotion."
}
(OUT/"black-review.json").write_text(json.dumps(review,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print(f"STAGED native shrimp sandwich {black.size} SHA={review['review_native_sha256']} / UNAPPROVED")
