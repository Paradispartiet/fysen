#!/usr/bin/env python3
"""Unapproved black-background previews from source-locked real yakitori photo.

Only the CENTRAL dish with two grilled skewers, black plate and lemon is
included, excluding all other unrelated plates in the source photograph.
"""
from pathlib import Path
from io import BytesIO
from urllib.request import Request,urlopen
from hashlib import sha256
import json
import cv2,numpy as np
from PIL import Image,ImageOps
ROOT=Path("assets/fysen-image-candidates/yakitori/airam-single-black-plate")
meta=json.loads((ROOT/"review.json").read_text(encoding="utf8"))
SOURCE_SHA="2efaeafc2a0da70b73c3707950d058b2b09126fd2d1f910f29bb55abaee3a401"
assert meta["source_sha256"]==SOURCE_SHA and meta["source_verified"] and meta["no_upscale"]
assert meta["catalog_id"]=="yakitori" and not meta["approved_for_fysen"] and not meta["published"]
req=Request(meta["photo_source_url"],headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*;q=0.8"})
with urlopen(req,timeout=110) as response:raw=response.read(50*1024*1024+1)
assert sha256(raw).hexdigest()==SOURCE_SHA,"Native JPEG changed"
with Image.open(BytesIO(raw)) as img:
  img.load()
  photo=ImageOps.exif_transpose(img).convert("RGB")
W,H=photo.size
assert (W,H)==(4000,5000)
sw,sh=840,1050
small=np.asarray(photo.resize((sw,sh),Image.Resampling.LANCZOS))
# Outline follows the full central black ceramic plate, slightly beyond the
# edges to allow GrabCut to refine on the black-on-white background.
p=np.array([
 (318,312),(361,311),(408,310),(451,312),(505,322),(555,343),
 (600,368),(639,397),(675,433),(697,468),(701,513),
 (684,551),(664,589),(630,627),(587,671),(535,709),
 (484,738),(426,745),(365,734),(310,723),(260,705),
 (213,679),(175,651),(147,617),(130,578),(123,537),
 (126,501),(136,463),(161,422),(196,386),(239,351),
 (275,330)],np.int32)
contour=np.zeros((sh,sw),np.uint8)
cv2.fillPoly(contour,[p],255)
# Both bamboo sticks extend just beyond upper plate edge. Preserve them.
cv2.line(contour,(367,258),(350,377),255,18)
cv2.line(contour,(494,270),(473,374),255,18)
inner=cv2.erode(contour,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(25,25)))
outer=cv2.dilate(contour,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(29,29)))
labels=np.full((sh,sw),cv2.GC_BGD,np.uint8)
labels[outer>0]=cv2.GC_PR_BGD
labels[contour>0]=cv2.GC_PR_FGD
labels[inner>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64);fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(small,cv2.COLOR_RGB2BGR),labels,None,bg,fg,7,cv2.GC_INIT_WITH_MASK)
grab=(np.isin(labels,(cv2.GC_FGD,cv2.GC_PR_FGD))*255).astype(np.uint8)
# Remove mostly-white paper/table leftovers without altering original food.
rgb=small.astype(np.int16)
bright=(rgb.min(axis=2)>185)&((rgb.max(axis=2)-rgb.min(axis=2))<35)
clean=grab.copy()
clean[bright]=0
# Do not remove the lemon: lemon is saturated yellow and not white.
clean=cv2.morphologyEx(clean,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(3,3)))
for variant,mask in [("black-contour",contour),("black-grabcut",grab),("black-clean-grabcut",clean)]:
  alpha=cv2.GaussianBlur(mask,(0,0),1).astype(np.float32)/255
  out=np.clip(small.astype(np.float32)*alpha[:,:,None],0,255).astype(np.uint8)
  preview=ROOT/f"{variant}-preview.jpg"
  Image.fromarray(out,"RGB").save(preview,quality=93,optimize=True)
  xa,ya=W//2-700,H//2-700
  crop=np.asarray(photo.crop((xa,ya,xa+1400,ya+1400)))
  yy,xx=np.mgrid[ya:ya+1400,xa:xa+1400].astype(np.float32)
  al=cv2.remap(mask,xx*sw/W,yy*sh/H,cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT)
  al=cv2.GaussianBlur(al,(0,0),.7).astype(np.float32)/255
  detail=np.clip(crop.astype(np.float32)*al[:,:,None],0,255).astype(np.uint8)
  Image.fromarray(detail,"RGB").save(ROOT/f"{variant}-detail-1400.jpg",quality=94,optimize=True)
  print(variant,sha256(preview.read_bytes()).hexdigest())
audit=dict(catalog_id="yakitori",selected_source=meta["photo_page"],
 original_sha256=SOURCE_SHA,native_dimensions=[W,H],photo_author=meta["source_photo_author"],
 photo_license=meta["photo_license"],variants=["black-contour","black-grabcut","black-clean-grabcut"],
 no_upscale=True,generated_food_pixels=False,visual_review_completed=False,
 approved_for_fysen=False,published=False,
 notes=("Review a single central black plate containing two grilled Japanese "
        "yakitori skewers and lemon. Other plates in original intentionally excluded. "
        "Chicken type sourced from photo description but exact cut cannot be inferred from image. "
        "Visually check full skewer sticks, black plate rim and nonempty small preview."))
(ROOT/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("3 yakitori preview-only masks; not approved/published")
