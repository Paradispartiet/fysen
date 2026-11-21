#!/usr/bin/env python3
"""Unapproved black-background masks for real CC0 steamed dumplings.

The entire wooden serving bowl and the pair of real wooden chopsticks are
preserved as photographed. No food pixels are generated or enlarged.
"""
from __future__ import annotations
from pathlib import Path
from urllib.request import Request,urlopen
from io import BytesIO
from hashlib import sha256
import json
import cv2,numpy as np
from PIL import Image,ImageOps
P=Path("assets/fysen-image-candidates/dumplings/charles-deluvio-cc0")
meta=json.loads((P/"review.json").read_text(encoding="utf8"))
assert meta["source_verified"] and meta["no_upscale"] and meta["license"]=="CC0 1.0"
assert meta["catalog_id"]=="dumplings" and not meta["approved_for_fysen"] and not meta["published"]
req=Request(meta["source_original_url"],headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*"})
with urlopen(req,timeout=110) as response:raw=response.read(16*1024*1024+1)
assert sha256(raw).hexdigest()==meta["source_sha256"],"CC0 original changed"
with Image.open(BytesIO(raw)) as src:
    src.load()
    photo=ImageOps.exif_transpose(src).convert("RGB")
W,H=photo.size
assert (W,H)==(5472,3648)
sw,sh=1200,800
small=np.asarray(photo.resize((sw,sh),Image.Resampling.LANCZOS))
# A centered, completely intact round wooden bowl from source preview.
bowl=np.zeros((sh,sw),np.uint8)
cv2.ellipse(bowl,(613,391),(269,286),0,0,360,255,-1,cv2.LINE_AA)
inner=np.zeros_like(bowl)
cv2.ellipse(inner,(613,391),(244,262),0,0,360,255,-1)
outer=np.zeros_like(bowl)
cv2.ellipse(outer,(613,391),(297,309),0,0,360,255,-1)
# The exact two original chopsticks are distinct diagonal lines. Their source
# wood is warm/yellow relative to the cool white background.
sticks_corridor=np.zeros((sh,sw),np.uint8)
for a,b in [((375,74),(1025,409)),((387,112),(1043,428))]:
    cv2.line(sticks_corridor,a,b,255,22,cv2.LINE_AA)
rgb=small.astype(np.int16)
r,g,b=rgb[:,:,0],rgb[:,:,1],rgb[:,:,2]
wood=(r>100)&(r-b>28)&(g-b>19)&(r-g>0)
sticks=((sticks_corridor>0)&wood).astype(np.uint8)*255
sticks=cv2.morphologyEx(sticks,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5)))
composite_silhouette=cv2.bitwise_or(bowl,sticks)
# GrabCut uses conservative certainty within the plate and wood regions.
classes=np.full((sh,sw),cv2.GC_BGD,np.uint8)
classes[outer>0]=cv2.GC_PR_BGD
classes[bowl>0]=cv2.GC_PR_FGD
classes[inner>0]=cv2.GC_FGD
classes[sticks_corridor>0]=cv2.GC_PR_BGD
classes[sticks>0]=cv2.GC_PR_FGD
# Keep real wood pixels and the bowl center; nothing outside either is added.
seed=cv2.erode(sticks,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(3,3)))
classes[seed>0]=cv2.GC_FGD
classes[inner>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64);fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(small,cv2.COLOR_RGB2BGR),classes,None,bg,fg,6,cv2.GC_INIT_WITH_MASK)
grab=np.isin(classes,[cv2.GC_FGD,cv2.GC_PR_FGD]).astype(np.uint8)*255
# Final variant: GrabCut keeps both chopsticks complete. Remove ONLY the
# thin off-white paper arc above the wooden bowl, safely above the dumplings.
# The chopstick wood is yellow and high-chroma; do not make black holes in it.
clean=grab.copy()
ys,xs=np.mgrid[0:sh,0:sw]
hi=rgb.max(axis=2)
lo=rgb.min(axis=2)
paper_arc=(ys<217)&(xs>388)&(xs<876)&(lo>198)&((hi-lo)<33)
clean[paper_arc]=0
# Avoid disconnected background scraps without altering any original food RGB.
n,lab,stats,_=cv2.connectedComponentsWithStats((clean>0).astype(np.uint8),8)
for component in range(1,n):
    if stats[component,cv2.CC_STAT_AREA]<18: clean[lab==component]=0
for name,mask in [
 ("black-contour",composite_silhouette),
 ("black-grabcut",grab),
 ("black-clean-grabcut",clean)
]:
    alpha=cv2.GaussianBlur(mask,(0,0),.7).astype(np.float32)/255
    final=np.uint8(np.clip(small.astype(np.float32)*alpha[:,:,None],0,255))
    preview=P/(name+"-preview.jpg")
    Image.fromarray(final).save(preview,quality=94,optimize=True)
    xa,ya=2036,1124
    native=np.asarray(photo.crop((xa,ya,xa+1400,ya+1400)))
    ys,xs=np.mgrid[ya:ya+1400,xa:xa+1400].astype(np.float32)
    ma=cv2.remap(mask,xs*sw/W,ys*sh/H,cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT)
    am=cv2.GaussianBlur(ma,(0,0),.7).astype(np.float32)/255
    detail=np.uint8(np.clip(native.astype(np.float32)*am[:,:,None],0,255))
    Image.fromarray(detail).save(P/(name+"-detail-1400.jpg"),quality=94,optimize=True)
    print(name,sha256(preview.read_bytes()).hexdigest())
audit=dict(dish_id="dumplings",catalog_id="dumplings",source_sha256=meta["source_sha256"],
    source_native_dimensions=[W,H],photo_credit=meta["author"],photo_source=meta["source_page"],
    license="CC0 1.0",license_url=meta["license_url"],
    variants=["black-contour","black-grabcut","black-clean-grabcut"],
    no_upscale=True,generated_food_pixels=False,visual_review_completed=False,
    approved_for_fysen=False,published=False,
    note="Three steamed dumplings on a whole wooden dish with black sesame and chopsticks. No dip in photo, no verified filling; do not confuse with pan-fried gyoza. Inspect bowl/chopstick contours.")
(P/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("DUMPLINGS: 3 unapproved masks only")
