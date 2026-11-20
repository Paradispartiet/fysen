#!/usr/bin/env python3
"""Create NON-APPROVED black previews from exact genuine marinara source pixels."""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
import json
import numpy as np
import cv2
from PIL import Image,ImageOps

ROOT=Path("assets/fysen-image-candidates/pizza-marinara/classic-van-den-bossche-by-sa")
meta=json.loads((ROOT/"review.json").read_text(encoding="utf8"))
SHA="5ba72af9c97fd3fbc7421ca21e48160e4359c623a0350d57dab56754cccecb7f"
assert meta["source_sha256"]==SHA
assert not meta["approved_for_fysen"] and not meta["published"]
req=Request(meta["source_download_url"],headers={
    "User-Agent":"FysenEditorialReview/1.0 (https://github.com/Paradispartiet/fysen)",
    "Accept":"image/jpeg,image/*;q=0.8"})
with urlopen(req,timeout=60) as response:
    raw=response.read(20*1024*1024+1)
assert sha256(raw).hexdigest()==SHA, "Source changed, STOP"
with Image.open(BytesIO(raw)) as im:
    im.load()
    photo=ImageOps.exif_transpose(im).convert("RGB")
W,H=photo.size
assert (W,H)==(2848,2136)
src=np.asarray(photo)
# Original 1100x825 preview: contour deliberately slightly outside full pizza
# to avoid cropping bread. Manual and GrabCut alternatives both need inspection.
outline=np.array([
  (510,94),(599,96),(683,103),(765,122),(832,150),(903,194),
  (959,249),(1000,317),(1028,379),(1042,445),(1038,494),
  (1011,549),(966,591),(906,631),(819,664),(734,684),
  (639,699),(533,704),(429,690),(342,670),(253,638),
  (184,597),(127,552),(85,508),(65,455),(68,398),
  (88,341),(121,287),(166,234),(227,186),(297,146),
  (366,119),(435,103)
],dtype=np.float32)
def smooth_polygon(points,steps=11):
    out=[]
    n=len(points)
    for i in range(n):
        a,b,c,d=[points[j%n] for j in (i-1,i,i+1,i+2)]
        for t in np.linspace(0,1,steps,endpoint=False):
            out.append(.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t))
    return np.array(out,dtype=np.float32)
pts=smooth_polygon(outline)
pts[:,0]*=W/1100
pts[:,1]*=H/825
mask=np.zeros((H,W),np.uint8)
cv2.fillPoly(mask,[pts.astype(np.int32)],255)

def export(name,alpha):
    # Feather only the outer 1-2 original pixels; never fill/add food.
    a=np.clip(alpha.astype(np.float32)/255,0,1)
    original=np.clip(src.astype(np.float32)*a[:,:,None],0,255).astype(np.uint8)
    native=Image.fromarray(original,"RGB")
    native.save(ROOT/f"{name}-native.png",compress_level=4)
    preview=native.copy()
    preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(ROOT/f"{name}-preview.jpg",quality=92,optimize=True)
    native.crop((W//2-700,H//2-700,W//2+700,H//2+700)).save(
        ROOT/f"{name}-native-detail-1400.jpg",quality=93,optimize=True)
    return float(np.mean(a>0.5))
manual_area=export("black-contour",cv2.GaussianBlur(mask,(0,0),1.0))

# Conservative GrabCut only as a review alternative: original crust may have
# colors similar to the table; any missing crust requires REJECTION.
small=photo.copy()
small.thumbnail((1100,1100),Image.Resampling.LANCZOS)
sw,sh=small.size
m=cv2.resize(mask,(sw,sh),interpolation=cv2.INTER_NEAREST)
inside=cv2.erode(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(35,35)))
near=cv2.dilate(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(31,31)))
labels=np.full((sh,sw),cv2.GC_BGD,np.uint8)
labels[near>0]=cv2.GC_PR_BGD
labels[m>0]=cv2.GC_PR_FGD
labels[inside>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64)
fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(np.asarray(small),cv2.COLOR_RGB2BGR),
    labels,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
seg=(np.isin(labels,[cv2.GC_PR_FGD,cv2.GC_FGD]).astype(np.uint8)*255)
seg=cv2.resize(seg,(W,H),interpolation=cv2.INTER_LINEAR)
grabcut_area=export("black-grabcut",seg)
audit={
 "dish_id":"pizza-marinara",
 "source_page":meta["source_page"],
 "source_sha256":SHA,
 "native_dimensions":[W,H],
 "photographer":meta["photographer"],
 "license_url":meta["license_url"],
 "modified_work_share_alike_required":True,
 "native_pixels_upscaled":False,
 "food_pixels_generated":False,
 "black_contour_area_fraction":manual_area,
 "black_grabcut_area_fraction":grabcut_area,
 "visual_review_completed":False,
 "approved_for_fysen":False,
 "published":False,
 "review_gate":"Full crust intact, no plate/table/white halo, no invented food, natural black background and native detail sharp. Reject any clipped crust, especially GrabCut right edge."
}
(ROOT/"black-review.json").write_text(
    json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("Two black-background pizza previews generated from source-locked genuine photograph. REVIEW ONLY.")
