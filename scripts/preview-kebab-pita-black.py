#!/usr/bin/env python3
"""Review-only isolation of an authentic Pexels kebab pita native photograph.

No publication or generated ingredients. Source SHA must match a previously
archived native JPEG. Export both contour and CV segmentation for visual QA.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
import json,cv2
import numpy as np
from PIL import Image,ImageOps

F=Path("assets/fysen-image-candidates/kebab-pita/doner-fresh-vegetables")
evidence=json.loads((F/"review.json").read_text(encoding="utf8"))
EXPECTED="17b367c89b9ec073b1da27505dae02c3e2641f34db586b66028ee8ac1bc4b750"
assert evidence["source_sha256"]==EXPECTED
sources=[p for p in Path("/tmp/fysen-kebab-originals").rglob("native-source.bytes") if p.parent.name=="doner-fresh-vegetables"]
assert len(sources)==1, f"Original source missing: {sources}"
raw=sources[0].read_bytes()
assert sha256(raw).hexdigest()==EXPECTED
with Image.open(BytesIO(raw)) as src:
    src.load()
    im=ImageOps.exif_transpose(src).convert("RGB")
W,H=im.size
assert (W,H)==(4000,7112)
native=np.array(im)
# Coordinates on 619x1100 reference preview, sketched around *food only*.
control=np.array([
 (165,332),(224,314),(310,309),(403,317),(467,342),
 (503,385),(522,435),(541,488),(570,540),(578,592),
 (573,644),(556,690),(529,738),(489,760),(420,771),
 (337,772),(250,762),(177,744),(105,721),(50,679),
 (30,626),(47,567),(80,515),(120,467),(145,388)],np.float32)
points=control.copy()
points[:,0]*=W/619
points[:,1]*=H/1100
poly=np.zeros((H,W),np.uint8)
cv2.fillPoly(poly,[points.astype(np.int32)],255)
def export(name,mask):
    alpha=cv2.GaussianBlur(mask.astype(np.float32),(0,0),1.2)/255.0
    img=np.clip(native*alpha[:,:,None],0,255).astype(np.uint8)
    # Crop only empty bottom and upper space; retain native food pixel scale.
    y0,y1=int(H*0.25),int(H*0.79)
    out=Image.fromarray(img[y0:y1,:,:],"RGB")
    out.save(F/f"{name}-native.png",compress_level=4)
    preview=out.copy();preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(F/f"{name}-preview.jpg",quality=91,optimize=True)
    sx,sy=W//2,(y0+y1)//2-y0
    if sy+700 < out.height: out.crop((sx-700,sy-700,sx+700,sy+700)).save(F/f"{name}-detail-1400.jpg",quality=92,optimize=True)
    return [out.width,out.height]
poly_size=export("black-contour",poly)
# Bounding mask and sure food. For difficult areas inside overhanging salad,
# segmentation must still be judged visually before it can be released.
small=im.copy();small.thumbnail((1500,1500),Image.Resampling.LANCZOS)
sw,sh=small.size
sp=cv2.resize(poly,(sw,sh),interpolation=cv2.INTER_NEAREST)
inner=cv2.erode(sp,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(53,53)))
outer=cv2.dilate(sp,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(31,31)))
gc=np.full((sh,sw),cv2.GC_BGD,np.uint8)
gc[outer>0]=cv2.GC_PR_BGD
gc[sp>0]=cv2.GC_PR_FGD
gc[inner>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64);fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(np.asarray(small),cv2.COLOR_RGB2BGR),gc,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
mask=np.where((gc==cv2.GC_FGD)|(gc==cv2.GC_PR_FGD),255,0).astype(np.uint8)
mask=cv2.resize(mask,(W,H),interpolation=cv2.INTER_LINEAR)
mask=cv2.bitwise_and(mask,poly)
grabcut_size=export("black-grabcut",mask)
metadata={
 "source_sha256":EXPECTED,"source_url":"https://www.pexels.com/photo/delicious-doner-kebab-with-fresh-vegetables-29306504/",
 "photographer":"Nano Erdozain","license_claim":"Pexels License",
 "source_dimensions":[W,H],"contour_native_dimensions":poly_size,"grabcut_native_dimensions":grabcut_size,
 "pixel_upscaled":False,"ingredients_generated":False,"published":False,
 "visual_review_completed":False,"approved_for_fysen":False,
 "review": "Entire actual stuffed pita? Branded wrapper, paper, dish and fingers must be absent. Correct meat/vegetable variant and true 1:1 sharpness; no clipped bread, no dangling isolated food. Reject if poor."
}
(F/"black-review.json").write_text(json.dumps(metadata,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("Two black review previews staged from source-locked 4000×7112 kebab; NOT APPROVED.")
