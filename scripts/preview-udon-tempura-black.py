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
# Outer ring of the udon bowl. Precise polygon avoids the background menus,
# restaurant counter, drink and napkin.
bowl=np.array([
 (82,466),(104,399),(149,345),(205,311),(270,285),
 (345,274),(439,267),(535,275),(625,293),(712,323),
 (790,363),(851,417),(883,473),(899,542),(891,620),
 (849,690),(792,745),(710,782),(612,802),(520,807),
 (429,803),(351,785),(272,760),(197,719),(134,670),
 (96,613),(69,541)],dtype=np.int32)
contour=np.zeros((sh,sw),np.uint8)
cv2.fillPoly(contour,[bowl],255)
# One ebi prawn extends upward from the bowl rim, from x160..315.
shrimp=np.array([(145,399),(143,340),(146,267),(165,183),(189,119),
                 (207,99),(237,113),(255,153),(273,223),
                 (300,306),(320,397),(324,498),(211,544),(139,492)],dtype=np.int32)
cv2.fillPoly(contour,[shrimp],255)
near=cv2.dilate(contour,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(39,39)))
inner=cv2.erode(contour,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(45,45)))
labels=np.full((sh,sw),cv2.GC_BGD,np.uint8)
labels[near>0]=cv2.GC_PR_BGD
labels[contour>0]=cv2.GC_PR_FGD
labels[inner>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64)
fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(small,cv2.COLOR_RGB2BGR),labels,None,bg,fg,7,cv2.GC_INIT_WITH_MASK)
grab=(np.isin(labels,(cv2.GC_FGD,cv2.GC_PR_FGD))*255).astype(np.uint8)
# Keep original ceramic and tempura pixels. Avoid bright paper/menu if grabbed.
bright=(small.min(axis=2)>196)&((small.max(axis=2).astype(np.int16)-small.min(axis=2))<24)
clean=grab.copy()
# Restrict paper removal to ABOVE the actual bowl and outside the prawn.
yy,xx=np.mgrid[0:sh,0:sw]
paper=bright&(yy<353)&((xx<140)|(xx>325))
clean[paper]=0
for name,mask in (("black-contour",contour),("black-grabcut",grab),("black-clean-grabcut",clean)):
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
