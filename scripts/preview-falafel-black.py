#!/usr/bin/env python3
"""Source-native falafel/hummus bowl against black: PREVIEW ONLY.

The photograph is never enlarged or synthesized. Actual source SHA must match.
Output remains unapproved until human visual review of plate border and food.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
import json
import cv2
import numpy as np
from PIL import Image,ImageOps

ROOT=Path("assets/fysen-image-candidates/falafel/saya-p-bowl-pexels")
meta=json.loads((ROOT/"review.json").read_text(encoding="utf8"))
SHA="71c3b13a73f29715bb618be69738a2fcca2f2abd1ce7f2f279b2526f8232cfa4"
assert meta["original_sha256"]==SHA and meta["download_verified"]
assert (meta["native_width"],meta["native_height"])==(4284,5712)
assert meta["catalog_id"]=="falafel" and not meta["approved_for_fysen"] and not meta["published"]
request=Request(meta["photo_source_url"],headers={
    "User-Agent":"FysenPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)",
    "Accept":"image/jpeg,image/*;q=0.8"})
with urlopen(request,timeout=60) as response: raw=response.read(32*1024*1024+1)
assert sha256(raw).hexdigest()==SHA,"Exact source JPEG changed: reject"
with Image.open(BytesIO(raw)) as im:
    im.load()
    original=ImageOps.exif_transpose(im).convert("RGB")
W,H=original.size
assert (W,H)==(4284,5712)
src=np.asarray(original)
# Outer oval rim in 825 × 1100 preview pixel coordinates, tracing ONLY the
# central falafel/hummus plate. Other plates and a glass are not in this mask.
# Top/left/right/bottom approximate 286/76/730/935. Source food untouched.
outline=np.array([
 (403,286),(451,290),(500,299),(544,313),(585,334),
 (627,369),(668,415),(700,466),(720,524),(733,582),
 (729,641),(716,701),(692,757),(657,810),(614,854),
 (565,892),(506,920),(449,933),(403,936),(344,934),
 (294,918),(240,890),(192,854),(152,809),(120,759),
 (96,704),(81,650),(77,593),(82,533),(97,472),
 (123,421),(157,376),(203,336),(250,308),(299,290),
 (352,284)
],dtype=np.float32)
def spline(points,steps=10):
    out=[];count=len(points)
    for i in range(count):
      a,b,c,d=[points[j%count] for j in (i-1,i,i+1,i+2)]
      for t in np.linspace(0,1,steps,endpoint=False):
        out.append(.5*((2*b)+(-a+c)*t+
                        (2*a-5*b+4*c-d)*t*t+
                        (-a+3*b-3*c+d)*t*t*t))
    return np.asarray(out,np.float32)
points=spline(outline)
points[:,0]*=W/825
points[:,1]*=H/1100
mask=np.zeros((H,W),np.uint8)
cv2.fillPoly(mask,[points.astype(np.int32)],255)

def save_variant(label,fg):
    alpha=np.clip(cv2.GaussianBlur(fg.astype(np.float32),(0,0),1.0)/255,0,1)
    image=Image.fromarray(np.clip(src*alpha[:,:,None],0,255).astype(np.uint8),"RGB")
    image.save(ROOT/f"{label}-native.png",compress_level=4)
    preview=image.copy()
    preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(ROOT/f"{label}-preview.jpg",quality=92,optimize=True)
    image.crop((W//2-700,H//2-700,W//2+700,H//2+700)).save(
        ROOT/f"{label}-native-detail-1400.jpg",quality=93,optimize=True)
    return float(np.mean(alpha>.5))

contour_fraction=save_variant("black-contour",mask)
small=original.copy()
small.thumbnail((1100,1100),Image.Resampling.LANCZOS)
sw,sh=small.size
reduced=cv2.resize(mask,(sw,sh),interpolation=cv2.INTER_NEAREST)
inside=cv2.erode(reduced,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(29,29)))
near=cv2.dilate(reduced,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(27,27)))
classes=np.full((sh,sw),cv2.GC_BGD,np.uint8)
classes[near>0]=cv2.GC_PR_BGD
classes[reduced>0]=cv2.GC_PR_FGD
classes[inside>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64)
fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(np.asarray(small),cv2.COLOR_RGB2BGR),classes,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
result=(np.isin(classes,[cv2.GC_FGD,cv2.GC_PR_FGD]).astype(np.uint8)*255)
result=cv2.resize(result,(W,H),interpolation=cv2.INTER_LINEAR)
grabcut_fraction=save_variant("black-grabcut",result)
audit=dict(dish_id="falafel",catalog_id="falafel",
    source_original_sha256=SHA,source_native_dimensions=[W,H],
    photo_page=meta["photo_page"],photographer=meta["photo_author"],
    license_url=meta["photo_license"],
    no_upscale=True,generated_food_pixels=False,
    contour_fraction=contour_fraction,grabcut_fraction=grabcut_fraction,
    visual_review_completed=False,approved_for_fysen=False,published=False,
    quality_gate="One complete round bowl of falafel and hummus with intact original ceramic rim; no white extra plate, glass, wood, clipped balls, holes or halos. Native source image only.")
(ROOT/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("FALAFEL: source locked, two 4284x5712 black originals generated, 0 approved")
