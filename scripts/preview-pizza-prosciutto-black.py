#!/usr/bin/env python3
"""Create a NON-approved black-background preview from the locked authentic pizza photo.

Original food pixels are unchanged, without generative edits or upscaling.
Only an alpha mask is produced at lower resolution, then applied to native pixels.
"""
from __future__ import annotations
import hashlib, json
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen
import cv2
import numpy as np
from PIL import Image, ImageOps

PHOTO_ID=18285316
P=Path(f"assets/fysen-image-candidates/pizza-prosciutto/{PHOTO_ID}")
review=json.loads((P/"review.json").read_text(encoding="utf-8"))
assert review["source_sha256"]=="ff1d08bd7b5b665ae15139a39c80dd0473a0d342338c89b95147df385278003d"
url=review["source_url"]
with urlopen(Request(url,headers={"User-Agent":"FysenEditorialPhotoReview/1.0","Accept":"image/jpeg"}),timeout=60) as res:
    raw=res.read(48*1024*1024+1)
assert len(raw)<48*1024*1024 and hashlib.sha256(raw).hexdigest()==review["source_sha256"],"Source changed; stop"
with Image.open(BytesIO(raw)) as im:
    im.load()
    source=ImageOps.exif_transpose(im).convert("RGB")
W,H=source.size
assert (W,H)==(5464,8192)
# Work on a small image for segmentation only. Never resize any food pixels for the master.
small=source.copy()
small.thumbnail((1500,1500),Image.Resampling.LANCZOS)
sw,sh=small.size
rgb=np.array(small)
bgr=cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR)
yy,xx=np.mgrid[:sh,:sw]
# Full pizza is centered roughly x=.50, y=.63; its full oval spans ~x=.04-.98, y=.30-.95.
distance=((xx/sw-0.505)/0.465)**2+((yy/sh-0.625)/0.325)**2
gc=np.full((sh,sw),cv2.GC_BGD,np.uint8)
gc[distance<1.27**2]=cv2.GC_PR_BGD
gc[distance<1.035**2]=cv2.GC_PR_FGD
gc[distance<0.75**2]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64)
fg=np.zeros((1,65),np.float64)
cv2.grabCut(bgr,gc,None,bg,fg,7,cv2.GC_INIT_WITH_MASK)
mask=np.where((gc==cv2.GC_FGD)|(gc==cv2.GC_PR_FGD),255,0).astype(np.uint8)
# Separate food from exterior. No interior holes in the pizza may turn black.
n,labels,stats,_=cv2.connectedComponentsWithStats(mask,8)
assert n>=2
main=1+np.argmax(stats[1:,cv2.CC_STAT_AREA])
mask=np.where(labels==main,255,0).astype(np.uint8)
kernel=cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(13,13))
mask=cv2.morphologyEx(mask,cv2.MORPH_CLOSE,kernel)
holes=np.zeros((sh+2,sw+2),np.uint8)
filled=mask.copy()
cv2.floodFill(filled,holes,(0,0),255)
mask=cv2.bitwise_or(mask,cv2.bitwise_not(filled))
native=np.array(source)
alpha=cv2.resize(mask,(W,H),interpolation=cv2.INTER_LINEAR).astype(np.float32)/255.0
alpha=cv2.GaussianBlur(alpha,(0,0),1.1)
result=np.clip(native.astype(np.float32)*alpha[...,None],0,255).astype(np.uint8)
# Crop background only; preserve the entire photographed pizza at full native pixel density.
y0,y1=2000,8000
result=result[y0:y1,:,:]
out=Image.fromarray(result,"RGB")
out.save(P/"black-native-master.png",compress_level=4)
preview=out.copy()
preview.thumbnail((1050,1050),Image.Resampling.LANCZOS)
preview.save(P/"black-preview.jpg",quality=91,optimize=True)
# 1:1 detail of real original pixels from the pizza center, not a thumbnail enlargement.
mid_x,mid_y=W//2, (5000-y0)
out.crop((mid_x-700,mid_y-700,mid_x+700,mid_y+700)).save(P/"black-native-detail-1400.jpg",quality=92,optimize=True)
metadata={
 "photo_id":PHOTO_ID,"source_sha256":review["source_sha256"],
 "native_source_dimensions":[W,H],"native_output_dimensions":list(out.size),
 "original_pixels_upscaled":False,"new_ingredients_generated":False,
 "mask_method":"cv2 GrabCut at 1500px; native pixels retained; crop background only",
 "mask_foreground_fraction":float(mask.mean()/255),
 "visual_review_completed":False,"approved_for_fysen":False,"published":False,
 "review_requirements":"Confirm entire crust is intact, pizza toppings not clipped, no hand/flower or table edges survive, pure black around pizza, native 1:1 sharpness."
}
(P/"black-review.json").write_text(json.dumps(metadata,indent=2)+"\n",encoding="utf-8")
print("Prosciutto native black preview staged only; NOT APPROVED",out.size)
