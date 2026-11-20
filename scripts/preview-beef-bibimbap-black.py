#!/usr/bin/env python3
"""Preview only: isolate Andy Li's real beef bibimbap bowl on black, source-native.

Do not approve, deploy, add food, or map non-catalog bibimbap to restaurant dishes.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
import json,cv2,numpy as np
from PIL import Image,ImageOps

ROOT=Path("assets/fysen-image-candidates/bibimbap/andy-li-saero-cc0")
meta=json.loads((ROOT/"review.json").read_text(encoding="utf8"))
SHA="087b46ba6e8c668ac13b6fd37ff7cbd74acc3b54fa003ee82511a4cf11b29c10"
assert meta["original_sha256"]==SHA and meta["native_original_verified"]
assert (meta["original_width"],meta["original_height"])==(8160,6144)
assert meta["catalog_id"] is None and not meta["approved_for_fysen"]
req=Request(meta["download_url"],headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*;q=0.8"})
with urlopen(req,timeout=60) as response:
    raw=response.read(15*1024*1024+1)
assert sha256(raw).hexdigest()==SHA,"Source bytes changed"
with Image.open(BytesIO(raw)) as im:
    im.load()
    photo=ImageOps.exif_transpose(im).convert("RGB")
W,H=photo.size
assert (W,H)==(8160,6144)
src=np.asarray(photo)
# Manual silhouette tracing outer ceramic bowl, at 1100 × 828 displayed preview.
# Side dishes, chili bowl and soda can are outside this contour.
outline=np.array([
 (565,92),(646,103),(723,131),(790,174),(843,235),
 (880,302),(900,371),(897,447),(875,514),(826,579),
 (766,629),(687,658),(600,679),(504,674),(430,649),
 (365,604),(323,544),(295,474),(286,403),(293,334),
 (314,265),(356,198),(410,146),(478,111)
],dtype=np.float32)
def curve(p,n=10):
    out=[];count=len(p)
    for i in range(count):
      a,b,c,d=[p[j%count] for j in (i-1,i,i+1,i+2)]
      for t in np.linspace(0,1,n,endpoint=False):
        out.append(.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t))
    return np.asarray(out,dtype=np.float32)
points=curve(outline)
points[:,0]*=W/1100
points[:,1]*=H/828
mask=np.zeros((H,W),np.uint8)
cv2.fillPoly(mask,[points.astype(np.int32)],255)
def save(name,foreground):
    alpha=np.clip(cv2.GaussianBlur(foreground.astype(np.float32),(0,0),1.0)/255,0,1)
    dest=Image.fromarray(np.clip(src*alpha[:,:,None],0,255).astype(np.uint8))
    dest.save(ROOT/f"{name}-native.png",compress_level=4)
    view=dest.copy();view.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    view.save(ROOT/f"{name}-preview.jpg",quality=92,optimize=True)
    dest.crop((W//2-700,H//2-700,W//2+700,H//2+700)).save(
        ROOT/f"{name}-native-detail-1400.jpg",quality=93,optimize=True)
    return float(np.mean(alpha>0.5))
contour_area=save("black-contour",mask)
small=photo.copy();small.thumbnail((1100,1100),Image.Resampling.LANCZOS)
sw,sh=small.size
base=cv2.resize(mask,(sw,sh),interpolation=cv2.INTER_NEAREST)
inner=cv2.erode(base,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(35,35)))
near=cv2.dilate(base,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(33,33)))
cls=np.full((sh,sw),cv2.GC_BGD,np.uint8)
cls[near>0]=cv2.GC_PR_BGD
cls[base>0]=cv2.GC_PR_FGD
cls[inner>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64);fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(np.asarray(small),cv2.COLOR_RGB2BGR),
    cls,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
grabbed=np.isin(cls,[cv2.GC_FGD,cv2.GC_PR_FGD]).astype(np.uint8)*255
grabbed=cv2.resize(grabbed,(W,H),interpolation=cv2.INTER_LINEAR)
# Only the WHITE ceramic bowl should survive outside the interior ellipse.
# A few small pieces of warm wooden table were captured next to its lower
# edges. Remove them by color only OUTSIDE the genuine food/plate interior;
# never alter the beef, egg or vegetables inside the bowl.
rr=src[:,:,0].astype(np.int16)
gg=src[:,:,1].astype(np.int16)
bb=src[:,:,2].astype(np.int16)
xx=np.arange(W,dtype=np.float32)[None,:]*1100/W
yy=np.arange(H,dtype=np.float32)[:,None]*828/H
protect_food=((xx-592)/275)**2+((yy-389)/272)**2<1
brown_table=(rr>gg+13)&(gg>bb+6)&(rr<195)
grabbed[brown_table&~protect_food]=0
# Remove tiny isolated debris without cropping the ceramic outline.
grabbed=cv2.morphologyEx(grabbed,cv2.MORPH_OPEN,
    cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(7,7)))
grabcut_area=save("black-grabcut",grabbed)
audit=dict(dish_id="bibimbap",catalog_id=None,original_sha256=SHA,
    native_size=[W,H],source_page=meta["page"],
    photographer=meta["photographer"],license_url=meta["license_url"],
    no_upscale=True,food_pixels_generated=False,
    contour_area_fraction=contour_area,grabcut_area_fraction=grabcut_area,
    visual_review_completed=False,approved_for_fysen=False,published=False,
    gate="Whole authentic beef bibimbap bowl, beef rice vegetables and egg. No side bowls, plate, sauce dish, soda can or wooden table. Source-native pixels, clean black backdrop, no invention. Never attach bibimbap to catalog dishes.")
(ROOT/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("Two real 8160×6144 bibimbap black previews STAGED but not approved or published.")
