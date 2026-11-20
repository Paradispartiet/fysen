#!/usr/bin/env python3
"""Review-only true source pixels of phở bò, isolated against black.

Does not claim acceptance or publish any imagery.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
import json,cv2,numpy as np
from PIL import Image,ImageOps

ROOT=Path("assets/fysen-image-candidates/pho-bo/undo-kim-pexels")
meta=json.loads((ROOT/"review.json").read_text(encoding="utf8"))
SHA="db5888021b873610a5a9987068008ef6a1d484d5ca0bc7454a9089c78df7b9e9"
assert meta["source_sha256"]==SHA and meta["download_verified"]
assert (meta["native_width"],meta["native_height"])==(5472,3648)
assert not meta["approved_for_fysen"] and not meta["published"]
request=Request(meta["source_url"],headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*;q=0.8"})
with urlopen(request,timeout=60) as response:
  raw=response.read(30*1024*1024+1)
assert sha256(raw).hexdigest()==SHA,"SOURCE CHANGED; no approval"
with Image.open(BytesIO(raw)) as im:
  im.load()
  original=ImageOps.exif_transpose(im).convert("RGB")
W,H=original.size
assert (W,H)==(5472,3648)
src=np.asarray(original)
# Photo: white rounded phở bowl is fully inside the image.
# Contour recorded in 1100 x 733 preview coordinates.
outline=np.array([
 (553,78),(653,83),(758,108),(836,152),(907,218),
 (947,291),(958,362),(943,435),(907,505),(841,566),
 (750,607),(653,635),(543,647),(435,641),(331,610),
 (249,561),(185,500),(151,424),(143,346),(162,267),
 (202,199),(284,140),(372,99),(460,83)
],dtype=np.float32)
def curve(pts,steps=12):
  result=[];n=len(pts)
  for i in range(n):
    a,b,c,d=[pts[j%n] for j in (i-1,i,i+1,i+2)]
    for t in np.linspace(0,1,steps,endpoint=False):
      result.append(.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t))
  return np.asarray(result,dtype=np.float32)
points=curve(outline)
points[:,0]*=W/1100
points[:,1]*=H/733
mask=np.zeros((H,W),np.uint8)
cv2.fillPoly(mask,[points.astype(np.int32)],255)
def save(name,foreground):
  alpha=np.clip(cv2.GaussianBlur(foreground.astype(np.float32),(0,0),1.05)/255,0,1)
  black=Image.fromarray(np.clip(src*alpha[:,:,None],0,255).astype(np.uint8))
  black.save(ROOT/f"{name}-native.png",compress_level=4)
  preview=black.copy();preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
  preview.save(ROOT/f"{name}-preview.jpg",quality=92,optimize=True)
  black.crop((W//2-700,H//2-700,W//2+700,H//2+700)).save(
    ROOT/f"{name}-native-detail-1400.jpg",quality=92,optimize=True)
  return float(np.mean(alpha>0.5))
contour_area=save("black-contour",mask)

small=original.copy();small.thumbnail((1100,1100),Image.Resampling.LANCZOS)
sw,sh=small.size
reduced=cv2.resize(mask,(sw,sh),interpolation=cv2.INTER_NEAREST)
inside=cv2.erode(reduced,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(35,35)))
near=cv2.dilate(reduced,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(33,33)))
labels=np.full((sh,sw),cv2.GC_BGD,np.uint8)
labels[near>0]=cv2.GC_PR_BGD
labels[reduced>0]=cv2.GC_PR_FGD
labels[inside>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64);fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(np.asarray(small),cv2.COLOR_RGB2BGR),labels,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
seg=(np.isin(labels,[cv2.GC_FGD,cv2.GC_PR_FGD]).astype(np.uint8)*255)
seg=cv2.resize(seg,(W,H),interpolation=cv2.INTER_LINEAR)
# A cyan textile is tucked underneath the bowl. It is NOT part of the meal.
# Remove only cool saturated textile pixels below the soup (not ceramics,
# broth, green herbs or beef) while preserving full original food pixels.
rr=src[:,:,0].astype(np.int16)
gg=src[:,:,1].astype(np.int16)
bb=src[:,:,2].astype(np.int16)
yy=np.arange(H)[:,None]
blue_textile=(bb>rr+15)&(gg>rr+9)&(bb>gg-9)&(rr<180)
blue_textile &= yy > H*.46
# Suppress tiny cyan cloth fibers at the edge, without eroding white bowl.
blue_textile=cv2.dilate(blue_textile.astype(np.uint8),
   cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(9,9)))>0
seg[blue_textile]=0
# A tiny piece of dark, warm-colored wooden table remains immediately
# outside the bowl's left edge. Only erase it in that EXTERIOR corner;
# do not touch brown broth or beef in the bowl interior.
xx=np.arange(W)[None,:]
warm_wood=(rr>gg+12)&(gg>=bb+2)&(rr<155)
wood_outside_left=(xx<W*0.21)&(yy>H*.47)&(yy<H*.78)
seg[warm_wood&wood_outside_left]=0
grabcut_area=save("black-grabcut",seg)
audit=dict(dish_id="pho",variant="phở bò",source_page=meta["source_page"],
 source_sha256=SHA,source_native_dimensions=[W,H],
 photographer=meta["author"],license_url=meta["license_url"],
 no_upscale=True,food_pixels_generated=False,
 contour_area_fraction=contour_area,grabcut_area_fraction=grabcut_area,
 visual_review_completed=False,approved_for_fysen=False,published=False,
 gate="One complete genuine beef pho bowl with beef, broth and rice noodles. No wood, chopsticks, napkin, blue cloth, white halo, clipped rim or image enlargement. Inspect both previews and native 1400px detail.")
(ROOT/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("SOURCE LOCKED: two full-native phở bò black previews for review; NONE APPROVED")
