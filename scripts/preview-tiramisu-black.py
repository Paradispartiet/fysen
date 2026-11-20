#!/usr/bin/env python3
"""Generate native-pixel, unapproved black-background tiramisu previews.

Manual plate/cake shape and GrabCut texture-refinement are both candidates.
Never alter food pixels or approve automatically. The source is SHA-locked
and reused from a successful earlier original-photo Actions artifact.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
import json, cv2
import numpy as np
from PIL import Image, ImageOps

P=Path("assets/fysen-image-candidates/tiramisu/tiramisu-mint-plate")
source=json.loads((P/"review.json").read_text(encoding="utf8"))
SRC_SHA="33be6223822dcada5fbb335519da2f1ebbf95ca9860e262617330e7cdd9d14fc"
assert source["source_sha256"]==SRC_SHA
matches=[p for p in Path("/tmp/fysen-tiramisu-originals").rglob("source.jpeg") if p.parent.name=="tiramisu-mint-plate"]
assert len(matches)==1,f"Expected one exact source: {matches}"
raw=matches[0].read_bytes()
assert sha256(raw).hexdigest()==SRC_SHA
with Image.open(BytesIO(raw)) as img:
    img.load()
    photo=ImageOps.exif_transpose(img).convert("RGB")
W,H=photo.size
assert (W,H)==(6240,4160)
rgb=np.asarray(photo)
# Point coordinates from 1100x733 source preview. Plate is a broad oval, while
# the cake and its fresh mint project above its rear rim. Both are kept intact.
plate=np.array([
  (103,382),(128,337),(186,297),(251,271),(326,250),
  (422,240),(547,241),(656,251),(755,273),(842,303),
  (904,347),(940,391),(948,445),(934,492),(897,540),
  (826,574),(736,604),(615,624),(489,625),(365,614),
  (264,589),(183,556),(128,520),(95,473),(90,423)
],np.float32)
cake=np.array([
  (309,342),(305,272),(303,229),(315,197),(342,172),
  (379,159),(405,157),(407,130),(418,103),(448,92),
  (468,97),(485,121),(497,130),(532,127),(555,135),
  (564,155),(596,156),(646,169),(689,192),(713,230),
  (732,282),(741,349),(733,401),(714,442),(653,485),
  (555,510),(439,515),(355,492),(315,455)
],np.float32)
def spline(p,steps=9):
    ans=[];n=len(p)
    for i in range(n):
        a,b,c,d=[p[j%n] for j in (i-1,i,i+1,i+2)]
        for t in np.linspace(0,1,steps,endpoint=False):
            ans.append(.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t))
    return np.array(ans,dtype=np.float32)
def to_native(p):
    out=p.copy();out[:,0]*=W/1100;out[:,1]*=H/733
    return out.astype(np.int32)
mask=np.zeros((H,W),np.uint8)
cv2.fillPoly(mask,[to_native(spline(plate))],255)
# Fill separately: OpenCV uses even-odd polygon parity for a single multi-ring
# fill, which otherwise punches a false hole through the overlapping cake.
cv2.fillPoly(mask,[to_native(spline(cake))],255)
# The mint stems project above the plate. Behind them the source has a
# turquoise table. Remove only that visually verified background color in
# the upper zone; preserve all original food, cocoa and green-leaf pixels.
r=rgb[:,:,0].astype(np.int16)
g=rgb[:,:,1].astype(np.int16)
b=rgb[:,:,2].astype(np.int16)
upper=np.arange(H)[:,None] < H*250/733
turquoise=(g>105)&(g>r*1.28)&(b>r*1.38)&(b>g*.73)
turquoise &= upper
turquoise=cv2.morphologyEx(turquoise.astype(np.uint8),cv2.MORPH_CLOSE,
    cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(7,7)))
mask[turquoise>0]=0
def export(prefix,foreground):
    alpha=cv2.GaussianBlur(foreground.astype(np.float32),(0,0),1.2)/255.
    pic=np.clip(rgb*alpha[:,:,None],0,255).astype(np.uint8)
    native=Image.fromarray(pic,"RGB")
    native.save(P/f"{prefix}-native.png",compress_level=4)
    view=native.copy();view.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    view.save(P/f"{prefix}-preview.jpg",quality=91,optimize=True)
    native.crop((W//2-700,H//2-700,W//2+700,H//2+700)).save(
      P/f"{prefix}-native-detail-1400.jpg",quality=92,optimize=True)
    return float(np.mean(foreground>127))
contour_area=export("black-contour",mask)
# GrabCut may make the rim more natural; treat its result as a second candidate.
small=photo.copy();small.thumbnail((1200,1200),Image.Resampling.LANCZOS)
sw,sh=small.size
sp=cv2.resize(mask,(sw,sh),interpolation=cv2.INTER_NEAREST)
inner=cv2.erode(sp,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(41,41)))
outer=cv2.dilate(sp,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(25,25)))
labels=np.full((sh,sw),cv2.GC_BGD,np.uint8)
labels[outer>0]=cv2.GC_PR_BGD
labels[sp>0]=cv2.GC_PR_FGD
labels[inner>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64);fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(np.asarray(small),cv2.COLOR_RGB2BGR),labels,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
g=np.where((labels==cv2.GC_FGD)|(labels==cv2.GC_PR_FGD),255,0).astype(np.uint8)
g=cv2.resize(g,(W,H),interpolation=cv2.INTER_LINEAR)
grabcut_area=export("black-grabcut",g)
audit={
  "dish_id":"tiramisu","photo_id":26838689,
  "source_original_sha256":SRC_SHA,"original_dimensions":[W,H],
  "source_page":"https://www.pexels.com/photo/piece-of-cake-on-a-plate-26838689/",
  "photographer":"Arian Fernandez","license_url":"https://www.pexels.com/license/",
  "native_pixels_upscaled":False,"food_pixels_generated":False,
  "black_contour_area_fraction":contour_area,"black_grabcut_area_fraction":grabcut_area,
  "visual_review_completed":False,"approved_for_fysen":False,"published":False,
  "visual_review_check":"A single complete layered tiramisu with mint and cocoa on one intact plate; all table, secondary desserts and extraneous background black; edges smooth and natural, native 1400px detail sharp. Reject any part of cake or mint clipped."
}
(P/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("Two black native tiramisu review previews staged; neither automatically approved")
