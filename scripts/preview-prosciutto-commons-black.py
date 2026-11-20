#!/usr/bin/env python3
"""Photo-only black-background review for a native Wikimedia Commons prosciutto pizza.

No image assets, catalogs, or manifests are promoted. Food pixels are retained
at original resolution without synthesis/upscaling; only a mask is altered.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
import json,cv2
import numpy as np
from PIL import Image, ImageOps

F=Path("assets/fysen-image-candidates/pizza-prosciutto/commons/parma-ham-pizza-bangkok")
review=json.loads((F/"review.json").read_text(encoding="utf-8"))
EXPECTED="073df3775ede40db4cffb30413023f5ae5616d28f6e68ee8317ec95ed76b8efc"
assert review["source_sha256"]==EXPECTED
# Reuse the exact source bytes from the successful prior Actions staging run.
# This avoids Wikimedia 429 rate-limits and preserves the already verified SHA.
originals=list(Path("/tmp/fysen-commons-originals").rglob("source.bytes"))
sources=[p for p in originals if p.parent.name=="parma-ham-pizza-bangkok"]
assert len(sources)==1,f"Expected one saved Commons original, found: {originals}"
payload=sources[0].read_bytes()
assert sha256(payload).hexdigest()==EXPECTED,"Original source changed; halt"
with Image.open(BytesIO(payload)) as src:
    src.load()
    image=ImageOps.exif_transpose(src).convert("RGB")
W,H=image.size
assert (W,H)==(3949,2920)
native=np.array(image)
# The manually reviewed whole pizza occupies approximately this outline in
# a 1100x813 display preview. Clip only outside the original crust.
control=np.array([
 (20,379),(28,343),(44,311),(68,277),(104,237),(149,207),
 (213,174),(280,157),(347,143),(418,136),(485,136),
 (552,145),(613,159),(656,182),(696,222),(722,263),
 (730,314),(734,355),(734,424),(728,482),(712,529),
 (686,580),(646,627),(600,666),(550,697),(496,708),
 (434,717),(366,716),(301,708),(234,695),(174,676),
 (130,648),(90,618),(60,580),(37,531),(25,484),(21,430)],np.float32)
pts=control.copy()
pts[:,0]*=W/1100
pts[:,1]*=H/813
outline=np.zeros((H,W),np.uint8)
cv2.fillPoly(outline,[pts.astype(np.int32)],255)
# Both a conservative polygon-only approach and a texture-refined GrabCut
# approach are retained for human review; neither is approved automatically.
def export(name,alpha):
    alpha=np.clip(alpha.astype(np.float32),0,255)/255.0
    alpha=cv2.GaussianBlur(alpha,(0,0),1.3)
    out=np.clip(native*alpha[:,:,None],0,255).astype(np.uint8)
    pil=Image.fromarray(out,"RGB")
    pil.save(F/f"{name}-native-master.png",compress_level=4)
    view=pil.copy();view.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    view.save(F/f"{name}-preview.jpg",quality=92,optimize=True)
    cx,cy=W//2,H//2
    pil.crop((cx-700,cy-700,cx+700,cy+700)).save(F/f"{name}-native-detail-1400.jpg",quality=92,optimize=True)
    return float(np.mean(alpha>0.5))
frac=export("black-polygon",outline)
# More precise segmentation around the documented contour. Keep a broad
# inside core as sure foreground; outer pixels are sure background.
work=image.copy();work.thumbnail((1300,1300),Image.Resampling.LANCZOS)
cw,ch=work.size
small=cv2.resize(outline,(cw,ch),interpolation=cv2.INTER_NEAREST)
sure=cv2.erode(small,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(51,51)))
border=cv2.dilate(small,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(35,35)))
gc=np.full((ch,cw),cv2.GC_BGD,np.uint8)
gc[border>0]=cv2.GC_PR_BGD
gc[small>0]=cv2.GC_PR_FGD
gc[sure>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64);fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(np.asarray(work),cv2.COLOR_RGB2BGR),gc,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
seg=((gc==cv2.GC_FGD)|(gc==cv2.GC_PR_FGD)).astype(np.uint8)*255
# Fill holes so interior toppings cannot get cut out by segmentation.
n,l,stats,_=cv2.connectedComponentsWithStats(seg,8)
main=1+np.argmax(stats[1:,cv2.CC_STAT_AREA])
seg=np.where(l==main,255,0).astype(np.uint8)
inv=cv2.bitwise_not(seg)
flood=inv.copy();fmask=np.zeros((ch+2,cw+2),np.uint8)
cv2.floodFill(flood,fmask,(0,0),0)
seg=cv2.bitwise_or(seg,flood)
seg=cv2.resize(seg,(W,H),interpolation=cv2.INTER_LINEAR)
# Reject any connected wood pixels extending beyond the hand-traced crust.
seg=cv2.bitwise_and(seg,outline)
# A narrow wooden-board spur to the right of the upper crust survived GrabCut.
# Remove only its exterior area; do not inpaint or alter food pixels.
spur=np.array([(747,327),(780,327),(783,398),(748,389)],np.float32)
spur[:,0]*=W/1100
spur[:,1]*=H/813
cv2.fillPoly(seg,[spur.astype(np.int32)],0)
frac2=export("black-grabcut",seg)
meta={
 "original_page":review["source_page"],
 "original_sha256":EXPECTED,
 "photographer":"Amin","license":"CC BY-SA 4.0",
 "license_url":"https://creativecommons.org/licenses/by-sa/4.0/",
 "original_dimensions":[W,H],
 "food_pixels_upscaled":False,"synthetic_food_generated":False,
 "variant":"Prosciutto crudo pizza with burrata, rocket, cherry tomatoes",
 "polygon_foreground_fraction":frac,"grabcut_foreground_fraction":frac2,
 "review_required":"Inspect both black previews: all original crust intact, no wooden board/paper/cutlery retained, clean edges and natural food details at 1:1. No approval merely from a green technical run.",
 "approved_for_fysen":False,"visual_review_completed":False,"published":False
}
(F/"black-alternatives-review.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("Two FULL native source photo black previews staged, neither approved")
