#!/usr/bin/env python3
"""Review-only black presentation of authentic native seared-fish photo.

The source SHA and true pixels are immutable; only the outside-plate alpha
mask is computed. This script never edits public assets or approves the photo.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
import json
import cv2
import numpy as np
from PIL import Image,ImageOps
P=Path("assets/fysen-image-candidates/stekt-hvit-fisk/white-fish-mash-vegetables")
evidence=json.loads((P/"review.json").read_text(encoding="utf8"))
SHA="140b56c61214db9349e915ac01a6629a3f7a5139e3b8c91e20b44869cccfd3fc"
assert evidence["source_sha256"]==SHA
copies=[p for p in Path("/tmp/fysen-white-fish-originals").rglob("source.jpeg") if p.parent.name=="white-fish-mash-vegetables"]
assert len(copies)==1,f"Missing exact original: {copies}"
raw=copies[0].read_bytes()
assert sha256(raw).hexdigest()==SHA
with Image.open(BytesIO(raw)) as source:
    source.load()
    native=ImageOps.exif_transpose(source).convert("RGB")
W,H=native.size
assert (W,H)==(5464,7120)
array=np.asarray(native)
# Hand-checked plate outline at 844 × 1100 preview size; no food lies
# outside this border. Original pixel data and aspect ratio are unchanged.
vertices=np.array([
 (363,10),(450,8),(540,21),(636,62),(714,134),(773,218),
 (814,322),(843,416),(843,570),(828,706),(787,829),
 (714,922),(629,1000),(521,1067),(415,1096),(291,1083),
 (173,1032),(87,951),(26,835),(0,695),(0,486),
 (22,350),(80,219),(156,116),(260,47)],np.float32)
v=vertices.copy()
v[:,0]*=W/844
v[:,1]*=H/1100
outline=np.zeros((H,W),np.uint8)
cv2.fillPoly(outline,[v.astype(np.int32)],255)
def export(name,mask):
    alpha=cv2.GaussianBlur(mask.astype(np.float32),(0,0),1.3)/255.0
    result=np.clip(array*alpha[:,:,None],0,255).astype(np.uint8)
    im=Image.fromarray(result,"RGB")
    im.save(P/f"{name}-native.png",compress_level=4)
    preview=im.copy()
    preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(P/f"{name}-preview.jpg",quality=92,optimize=True)
    cx,cy=W//2,H//2
    im.crop((cx-700,cy-700,cx+700,cy+700)).save(P/f"{name}-native-detail-1400.jpg",quality=92,optimize=True)
    return float(np.mean(mask>127))
frac1=export("black-contour",outline)
# A texture-refined version for comparison; never automatically approve.
small=native.copy()
small.thumbnail((1100,1100),Image.Resampling.LANCZOS)
sw,sh=small.size
scaled=cv2.resize(outline,(sw,sh),interpolation=cv2.INTER_NEAREST)
inside=cv2.erode(scaled,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(61,61)))
outside=cv2.dilate(scaled,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(21,21)))
mask=np.full((sh,sw),cv2.GC_BGD,np.uint8)
mask[outside>0]=cv2.GC_PR_BGD
mask[scaled>0]=cv2.GC_PR_FGD
mask[inside>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64);fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(np.asarray(small),cv2.COLOR_RGB2BGR),mask,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
out=np.where((mask==cv2.GC_FGD)|(mask==cv2.GC_PR_FGD),255,0).astype(np.uint8)
# Preserve all interior fish, mashed potato and garnish.
count,labels,stats,_=cv2.connectedComponentsWithStats(out,8)
main=1+np.argmax(stats[1:,cv2.CC_STAT_AREA])
out=np.where(labels==main,255,0).astype(np.uint8)
# Fill mask holes enclosed inside entire plate.
flood=out.copy()
ffmask=np.zeros((sh+2,sw+2),np.uint8)
cv2.floodFill(flood,ffmask,(0,0),255)
out=cv2.bitwise_or(out,cv2.bitwise_not(flood))
out=cv2.resize(out,(W,H),interpolation=cv2.INTER_LINEAR)
frac2=export("black-grabcut",out)
meta={
 "dish_id":"stekt-hvit-fisk","photo_id":29653135,
 "original_sha256":SHA,"original_dimensions":[W,H],
 "photographer":"Valeria Boltneva",
 "source_page":"https://www.pexels.com/photo/delicious-pan-seared-fish-with-vegetables-29653135/",
 "license_url":"https://www.pexels.com/license/",
 "black_contour_area_fraction":frac1,"black_grabcut_area_fraction":frac2,
 "original_pixels_upscaled":False,"new_food_generated":False,
 "visual_review_completed":False,"approved_for_fysen":False,"published":False,
 "review_required":"Entire cooked fish and all sides intact; dark plate blends into pure black with no wood/table fragments, no unnatural cut edge, 1:1 sharpness; do not claim a specific fish species."
}
(P/"black-review.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("Black seared white fish previews completed at 5464x7120 native; NOT APPROVED")
