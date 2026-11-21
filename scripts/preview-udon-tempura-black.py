#!/usr/bin/env python3
"""Source-locked, preview-only masks for REAL prawn tempura udon photographed by Immanuelle.

Keep one complete bowl and its protruding shrimp tempura. The original JPEG is
always SHA-256 verified and no new food pixels are generated.
"""
from pathlib import Path
from urllib.request import Request,urlopen
from io import BytesIO
from hashlib import sha256
import json
import cv2
import numpy as np
from PIL import Image,ImageOps
C=Path("assets/fysen-image-candidates/udon-tempura/commons-bukkake-ebi")
rec=json.loads((C/"review.json").read_text(encoding="utf8"))
assert rec["source_verified"] and rec["no_upscale"]
assert rec["catalog_id"]=="udon" and rec["license"]=="CC BY 4.0"
assert not rec["approved_for_fysen"] and not rec["published"]
request=Request(rec["source_url"],headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*"})
with urlopen(request,timeout=110) as response:raw=response.read(16*1024*1024+1)
assert sha256(raw).hexdigest()==rec["source_sha256"],"CC BY original changed"
with Image.open(BytesIO(raw)) as source:
    source.load()
    photo=ImageOps.exif_transpose(source).convert("RGB")
W,H=photo.size
assert (W,H)==(3024,4032)
sw,sh=960,1280
small=np.asarray(photo.resize((sw,sh),Image.Resampling.LANCZOS))
# The source preview is 788×1050. Manually follow the actual outer bowl rim,
# NOT the paper/menu behind it, and keep all of the bottom ceramic outline.
fX,fY=sw/788,sh/1050
bowl_pts=np.array([
 (11,500),(22,458),(42,418),(70,387),(105,354),
 (151,328),(207,307),(271,290),(337,285),(398,287),
 (470,298),(546,319),(618,350),(681,392),(721,451),
 (741,517),(741,589),(724,658),(696,719),(646,776),
 (586,815),(508,846),(430,858),(348,855),(265,842),
 (186,814),(119,772),(61,708),(28,640),(12,573)
],dtype=np.float32)
bowl_pts[:,0]*=fX;bowl_pts[:,1]*=fY
bowl=np.zeros((sh,sw),np.uint8)
cv2.fillPoly(bowl,[bowl_pts.astype(np.int32)],255)
# The shrimp tail protrudes above the rim. Source-derived color separation is
# confined to this one shrimp, rejecting neutral paper. All output RGB values
# still come from the real source, never reconstructed or synthesized.
upper=np.zeros((sh,sw),np.uint8)
shrimp_poly=np.array([
 (132,322),(128,287),(130,239),(143,195),(157,152),
 (177,108),(201,98),(226,110),(249,148),(266,190),
 (276,244),(293,291),(310,340),(300,371),(243,393),
 (175,381)
],dtype=np.float32)
shrimp_poly[:,0]*=fX;shrimp_poly[:,1]*=fY
cv2.fillPoly(upper,[shrimp_poly.astype(np.int32)],255)
rgb=small.astype(np.int16)
rr,gg,bb=rgb[:,:,0],rgb[:,:,1],rgb[:,:,2]
gold=((rr>135)&(gg>85)&(rr-gg>10)&(rr-bb>40)&(gg-bb>14))
shrimp=((upper>0)&gold).astype(np.uint8)*255
shrimp=cv2.morphologyEx(shrimp,cv2.MORPH_CLOSE,
                         cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(13,13)))
# Keep the bowl complete, with an additional source-colored shrimp contour.
precise=cv2.bitwise_or(bowl,shrimp)
precise=cv2.GaussianBlur(precise,(0,0),.65)
# A second proposal refines the shrimp with GrabCut, but has the entire
# manually verified bowl as a hard keep-region to avoid food loss.
near=cv2.dilate(upper,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(23,23)))
labels=np.full((sh,sw),cv2.GC_BGD,np.uint8)
labels[near>0]=cv2.GC_PR_BGD
labels[upper>0]=cv2.GC_PR_FGD
seed=cv2.erode(shrimp,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(7,7)))
labels[seed>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64);fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(small,cv2.COLOR_RGB2BGR),labels,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
grab_tail=(np.isin(labels,(cv2.GC_FGD,cv2.GC_PR_FGD))*255).astype(np.uint8)
grab=cv2.bitwise_or(bowl,cv2.bitwise_and(grab_tail,upper))
clean=precise.copy()
for name,mask in (("black-contour",precise),("black-grabcut",grab),("black-clean-grabcut",clean)):
  alpha=cv2.GaussianBlur(mask,(0,0),1.1).astype(np.float32)/255.
  preview=np.clip(small.astype(np.float32)*alpha[:,:,None],0,255).astype(np.uint8)
  out=C/(name+"-preview.jpg")
  Image.fromarray(preview,"RGB").save(out,quality=94,optimize=True)
  xa,ya=W//2-700,H//2-700
  cropped=np.asarray(photo.crop((xa,ya,xa+1400,ya+1400)))
  ys,xs=np.mgrid[ya:ya+1400,xa:xa+1400].astype(np.float32)
  ma=cv2.remap(mask,xs*sw/W,ys*sh/H,cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT)
  ma=cv2.GaussianBlur(ma,(0,0),.7).astype(np.float32)/255.
  result=np.clip(cropped.astype(np.float32)*ma[:,:,None],0,255).astype(np.uint8)
  Image.fromarray(result,"RGB").save(C/(name+"-detail-1400.jpg"),quality=94,optimize=True)
  print(name,sha256(out.read_bytes()).hexdigest())
audit=dict(catalog_id="udon",source_original_sha256=rec["source_sha256"],
  source_dimensions=[W,H],source_page=rec["source_page"],author=rec["author"],
  license=rec["license"],license_url=rec["photo_license"],
  variants=["black-contour","black-grabcut","black-clean-grabcut"],
  no_upscale=True,generated_food_pixels=False,visual_review_completed=False,
  approved_for_fysen=False,published=False,
  caution="Single bowl of bukkake udon with ebi tempura and other toppings. Actual original photo is of a restaurant meal, but not of any specific Fysen-listed restaurant. Mask must preserve entire prawn, noodles, toppings and whole plate rim.")
(C/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("UDON: 3 review masks, 0 approved, 0 published")
