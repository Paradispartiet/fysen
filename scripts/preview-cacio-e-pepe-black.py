#!/usr/bin/env python3
"""Draft-only source-locked cacio e pepe previews with natural black backdrop.

Both variants remain unapproved until inspected at native resolution.
"""
from __future__ import annotations
from pathlib import Path
from hashlib import sha256
from urllib.request import Request,urlopen
from io import BytesIO
import json, numpy as np, cv2
from PIL import Image,ImageOps

C=Path("assets/fysen-image-candidates/cacio-e-pepe/docteurcosmos-commons")
m=json.loads((C/"review.json").read_text(encoding="utf8"))
SHA="0a1052ce8f629790850053aa7be8a52b53ee23a68b6914a8dd3199dba6418965"
assert m["source_sha256"]==SHA
assert m["native_width"]==4577 and m["native_height"]==2498
assert not m["approved_for_fysen"] and not m["published"]
req=Request(m["source_download_url"],headers={
  "User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)",
  "Accept":"image/jpeg,image/*;q=0.8"})
with urlopen(req,timeout=60) as res: raw=res.read(20*1024*1024+1)
assert sha256(raw).hexdigest()==SHA,"Origin changed. No preview."
with Image.open(BytesIO(raw)) as im:
    im.load()
    photo=ImageOps.exif_transpose(im).convert("RGB")
W,H=photo.size
assert (W,H)==(4577,2498)
rgb=np.asarray(photo)
# Approximate full PLATE outline, 1100 x 600 preview coordinates, not food.
# Spline contour includes the original entire serving but excludes tableware.
outline=np.array([
  (50,275),(67,226),(97,181),(145,139),(210,107),(290,88),
  (385,75),(488,72),(595,78),(708,86),(813,107),(906,135),
  (982,176),(1026,223),(1051,278),(1042,328),(1005,371),
  (954,416),(881,453),(785,478),(688,501),(578,519),
  (469,522),(359,510),(266,486),(182,453),(116,415),
  (72,375),(43,326)
],dtype=np.float32)
def spline(p,steps=9):
    out=[];n=len(p)
    for i in range(n):
      a,b,c,d=[p[j%n] for j in (i-1,i,i+1,i+2)]
      for t in np.linspace(0,1,steps,endpoint=False):
        out.append(.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+
                        (-a+3*b-3*c+d)*t*t*t))
    return np.asarray(out,np.float32)
points=spline(outline)
points[:,0]*=W/1100
points[:,1]*=H/600
mask=np.zeros((H,W),np.uint8)
cv2.fillPoly(mask,[points.astype(np.int32)],255)

def export(name,mask):
    alpha=np.clip(cv2.GaussianBlur(mask.astype(np.float32),(0,0),1.1)/255.,0,1)
    black=np.clip(rgb*alpha[:,:,None],0,255).astype(np.uint8)
    pic=Image.fromarray(black,"RGB")
    pic.save(C/f"{name}-native.png",compress_level=4)
    preview=pic.copy();preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(C/f"{name}-preview.jpg",quality=92,optimize=True)
    pic.crop((W//2-700,H//2-700,W//2+700,H//2+700)).save(
      C/f"{name}-native-detail-1400.jpg",quality=92,optimize=True)
    return float(np.mean(alpha>0.5))
fraction1=export("black-contour",mask)

small=photo.copy();small.thumbnail((1100,1100),Image.Resampling.LANCZOS)
sw,sh=small.size
preview_mask=cv2.resize(mask,(sw,sh),interpolation=cv2.INTER_NEAREST)
inside=cv2.erode(preview_mask,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(41,41)))
outside=cv2.dilate(preview_mask,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(35,35)))
labels=np.full((sh,sw),cv2.GC_BGD,np.uint8)
labels[outside>0]=cv2.GC_PR_BGD
labels[preview_mask>0]=cv2.GC_PR_FGD
labels[inside>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64);fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(np.asarray(small),cv2.COLOR_RGB2BGR),labels,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
foreground=np.where(np.isin(labels,[cv2.GC_FGD,cv2.GC_PR_FGD]),255,0).astype(np.uint8)
foreground=cv2.resize(foreground,(W,H),interpolation=cv2.INTER_LINEAR)
fraction2=export("black-grabcut",foreground)
audit={
 "dish_id":"cacio-e-pepe",
 "source_page":m["source_page"],
 "source_original_sha256":SHA,
 "source_dimensions":[W,H],
 "photographer":m["photographer_claim"],
 "license_url":m["license_claim"],
 "native_pixels_upscaled":False,
 "food_pixels_generated":False,
 "black_contour_area_fraction":fraction1,
 "black_grabcut_area_fraction":fraction2,
 "visual_review_completed":False,
 "approved_for_fysen":False,
 "published":False,
 "review_gate":"One full authentic cacio e pepe serving and whole plate. No glass, cutlery, white tabletop or halo retained. Correct pecorino, pasta and pepper; no upscaling."
}
(C/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("STAGED two genuine 4577x2498 black previews; NONE APPROVED.")
