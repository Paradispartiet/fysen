#!/usr/bin/env python3
"""Review-only chicken katsu bowl masking, using source-locked real Pexels pixels."""
from __future__ import annotations
from pathlib import Path
from hashlib import sha256
from io import BytesIO
from urllib.request import Request,urlopen
import json
import cv2,numpy as np
from PIL import Image,ImageOps
C=Path("assets/fysen-image-candidates/chicken-katsu/cohesion-singapore-katsu-rice")
meta=json.loads((C/"review.json").read_text(encoding="utf8"))
SHA="21ec19e88be0f70f9981dd7deda9cde59714b9d313d16c682c6a4c5fb1fd2269"
assert meta["source_verified"] and meta["no_upscale"] and meta["original_sha256"]==SHA
assert meta["catalog_id"]=="katsu" and meta["source_photo_author"]=="Cohesion Singapore / Pexels"
assert not meta["approved_for_fysen"] and not meta["published"]
req=Request(meta["photo_source_url"],headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*"})
with urlopen(req,timeout=100) as response:raw=response.read(50*1024*1024+1)
assert sha256(raw).hexdigest()==SHA,"JPEG source changed; review must stop"
with Image.open(BytesIO(raw)) as im:
    im.load()
    photo=ImageOps.exif_transpose(im).convert("RGB")
W,H=photo.size
assert (W,H)==(5472,3648)
sw,sh=1080,720
small=np.asarray(photo.resize((sw,sh),Image.Resampling.LANCZOS))
# Whole bowl and rim; the surrounding white table is not part of the serving.
# Points are in 1080x720 source preview coordinates. Do not trim food.
polygon=np.array([
 (229,309),(237,283),(262,255),(301,236),(348,230),(398,233),
 (466,239),(529,238),(604,236),(676,247),(743,262),(804,290),
 (830,319),(847,359),(844,407),(827,450),(799,492),(751,548),
 (688,600),(618,636),(548,651),(481,648),(414,630),(351,606),
 (301,567),(264,532),(239,484),(222,424),(222,363)
],np.int32)
contour=np.zeros((sh,sw),np.uint8)
cv2.fillPoly(contour,[polygon],255)
inner=cv2.erode(contour,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(35,35)))
outer=cv2.dilate(contour,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(35,35)))
classes=np.full((sh,sw),cv2.GC_BGD,np.uint8)
classes[outer>0]=cv2.GC_PR_BGD
classes[contour>0]=cv2.GC_PR_FGD
classes[inner>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64)
fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(small,cv2.COLOR_RGB2BGR),classes,None,bg,fg,7,cv2.GC_INIT_WITH_MASK)
grab=(np.isin(classes,(cv2.GC_FGD,cv2.GC_PR_FGD))*255).astype(np.uint8)
# Nearly-white studio background is removed conservatively, retaining real
# ceramic beige bowl (chroma/brightness differences) and all crisp chicken.
color=small.astype(np.int16)
mx=color.max(axis=2);mn=color.min(axis=2)
yy,xx=np.mgrid[0:sh,0:sw]
# A pale triangular piece of studio backdrop remains above the upper-left
# bowl rim. Restrict additional removal to that backdrop corner, not food.
neutral_bright=(mn>185)&((mx-mn)<21)&(((yy<325)&(xx<530))|((yy<405)&(xx<281)))
clean=grab.copy()
clean[neutral_bright]=0
clean=cv2.morphologyEx(clean,cv2.MORPH_CLOSE,
                       cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5)))
for variant,mask in [("black-contour",contour),("black-grabcut",grab),("black-clean-grabcut",clean)]:
    alpha=cv2.GaussianBlur(mask,(0,0),1.0).astype(np.float32)/255
    composite=np.clip(small.astype(np.float32)*alpha[:,:,None],0,255).astype(np.uint8)
    preview=C/f"{variant}-preview.jpg"
    Image.fromarray(composite,"RGB").save(preview,quality=93,optimize=True)
    xa,ya=W//2-700,H//2-700
    cropped=np.asarray(photo.crop((xa,ya,xa+1400,ya+1400)))
    yy,xx=np.mgrid[ya:ya+1400,xa:xa+1400].astype(np.float32)
    sample=cv2.remap(mask,xx*sw/W,yy*sh/H,cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT)
    a=cv2.GaussianBlur(sample,(0,0),.7).astype(np.float32)/255
    detail=np.clip(cropped.astype(np.float32)*a[:,:,None],0,255).astype(np.uint8)
    Image.fromarray(detail,"RGB").save(C/f"{variant}-native-detail-1400.jpg",
                                        quality=94,optimize=True)
    print(f"{variant}: preview SHA256={sha256(preview.read_bytes()).hexdigest()}")
audit=dict(dish_id="katsu",catalog_id="katsu",photo_author=meta["source_photo_author"],
  photo_page=meta["photo_page"],license_url=meta["photo_license"],
  source_original_sha256=SHA,source_native_dimensions=[W,H],
  variants=["black-contour","black-grabcut","black-clean-grabcut"],
  no_upscale=True,generated_food_pixels=False,visual_review_completed=False,
  approved_for_fysen=False,published=False,
  warnings=("Panko-breaded chicken slices topped with seaweed and green onion on rice "
            "in complete ceramic bowl. No cabbage visible; do not claim cabbage. "
            "Verify bowl edge and source-native meat texture before approval."))
(C/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("KATSU: 3 masking reviews only; 0 approved, 0 published")
