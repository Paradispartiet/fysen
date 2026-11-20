#!/usr/bin/env python3
"""Source-locked native-pixel black-background SHRIMP pad thai photo preview only.

Never promotes an unreviewed photo. Photo RGB pixels are unchanged in foreground.
Only the alpha mask is inferred at lower resolution and upscaled as a mask.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
import json,cv2
import numpy as np
from PIL import Image,ImageOps

ROOT=Path("assets/fysen-image-candidates/pad-thai-reker/34723306")
SOURCE_SHA="00831ee288e15f9e273fbc3e0eea5598b74e7c3d1e1fd46ffc48f5665378bd54"
source=json.loads((ROOT/"review.json").read_text(encoding="utf8"))
assert source["source_sha256"]==SOURCE_SHA and source["original_width"]==5472
originals=[p for p in Path("/tmp/fysen-pad-thai-originals").rglob("source.jpeg") if p.parent.name=="34723306"]
assert len(originals)==1,f"Original source missing: {originals}"
payload=originals[0].read_bytes()
assert sha256(payload).hexdigest()==SOURCE_SHA,"Pexels source mismatch; abort"
with Image.open(BytesIO(payload)) as src:
    src.load()
    photo=ImageOps.exif_transpose(src).convert("RGB")
W,H=photo.size
assert (W,H)==(5472,3648)
native=np.asarray(photo)
# Elliptical bounds are calibrated to the displayed 1100x733 original preview:
# entire circular ceramic plate, centered near x=563 y=373, radii approx 323x317.
small=photo.copy();small.thumbnail((1500,1500),Image.Resampling.LANCZOS)
sw,sh=small.size
xx,yy=np.meshgrid(np.arange(sw,dtype=np.float32),np.arange(sh,dtype=np.float32))
d=((xx/sw-0.512)/0.295)**2 + ((yy/sh-0.508)/0.44)**2
gc=np.full((sh,sw),cv2.GC_BGD,np.uint8)
gc[d<1.12**2]=cv2.GC_PR_BGD
gc[d<1.055**2]=cv2.GC_PR_FGD
gc[d<0.83**2]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64)
fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(np.array(small),cv2.COLOR_RGB2BGR),gc,None,bg,fg,7,cv2.GC_INIT_WITH_MASK)
binary=np.where((gc==cv2.GC_PR_FGD)|(gc==cv2.GC_FGD),255,0).astype(np.uint8)
# Fill entire white plate, even where noodles cast shadows.
contours,_=cv2.findContours(binary,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
assert contours
best=max(contours,key=cv2.contourArea)
mask=np.zeros((sh,sw),np.uint8)
cv2.drawContours(mask,[best],-1,255,thickness=-1)
# Relax only tiny segmentation gaps around the ceramic rim.
mask=cv2.morphologyEx(mask,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(7,7)))
assert 0.20<float(np.mean(mask)/255)<0.85
alpha=cv2.resize(mask,(W,H),interpolation=cv2.INTER_LINEAR).astype(np.float32)/255.0
alpha=cv2.GaussianBlur(alpha,(0,0),1.0)
rgb=(native.astype(np.float32)*alpha[...,None]).clip(0,255).astype(np.uint8)
master=Image.fromarray(rgb,"RGB")
master.save(ROOT/"black-native-master.png",compress_level=4)
view=master.copy()
view.thumbnail((1100,1100),Image.Resampling.LANCZOS)
view.save(ROOT/"black-preview.jpg",quality=92,optimize=True)
cx,cy=W//2,H//2
master.crop((cx-700,cy-700,cx+700,cy+700)).save(ROOT/"black-native-detail-1400.jpg",quality=93,optimize=True)
meta={
 "source_photo_id":34723306,"source_sha256":SOURCE_SHA,
 "source_original_dimensions":[W,H],
 "candidate_file":"black-native-master.png",
 "mask_method":"GrabCut 1500px ellipse-supervised, filled whole plate, alpha only interpolated to source",
 "foreground_fraction":float(np.mean(mask)/255),
 "black_corners":all(master.getpixel(point)==(0,0,0) for point in [(0,0),(W-1,0),(0,H-1),(W-1,H-1)]),
 "upscaled_source_pixels":False,"generated_food_pixels":False,
 "visual_review_completed":False,"approved_for_fysen":False,"published":False,
 "review_requirements":"Confirm entire ceramic plate rim retained, no dark wood patches outside rim, real shrimp/noodles clear at 1:1 detail, pure black background. Any failure must stop promotion."
}
(ROOT/"black-review.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print(f"REVIEW PREVIEW ONLY: {W}x{H} native photograph; black corners {meta['black_corners']}; fraction {meta['foreground_fraction']:.3f}; NO APPROVAL")
