#!/usr/bin/env python3
"""Unapproved native-source chana masala black background masking previews only."""
from __future__ import annotations
from pathlib import Path
from urllib.request import Request,urlopen
from hashlib import sha256
from io import BytesIO
import json,cv2,numpy as np
from PIL import Image,ImageOps

C=Path("assets/fysen-image-candidates/chana-masala/nazir-whole-bowl")
meta=json.loads((C/"review.json").read_text(encoding="utf8"))
assert meta["source_verified"] and meta["no_upscale"] and meta["catalog_id"]=="chana-masala"
assert not meta["approved_for_fysen"] and not meta["published"]
request=Request(meta["photo_source_url"],headers={"User-Agent":"FysenPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*"})
with urlopen(request,timeout=90) as response: raw=response.read(45*1024*1024+1)
assert sha256(raw).hexdigest()==meta["original_sha256"],"Original photo changed"
with Image.open(BytesIO(raw)) as im:
    im.load()
    photo=ImageOps.exif_transpose(im).convert("RGB")
W,H=photo.size
assert (W,H)==(3814,3024)
sw,sh=1000,round(1000*H/W)
small=np.asarray(photo.resize((sw,sh),Image.Resampling.LANCZOS))
# User-facing inspection first: ellipse includes chickpeas, all visible earthen
# bowl, leaves patterned tablecloth out. Upper bowl rim is near photograph edge.
outline=np.zeros((sh,sw),np.uint8)
cv2.ellipse(outline,(485,276),(325,294),0,0,360,255,-1,cv2.LINE_AA)
inner=cv2.erode(outline,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(43,43)))
outer=cv2.dilate(outline,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(39,39)))
classes=np.full((sh,sw),cv2.GC_BGD,np.uint8)
classes[outer>0]=cv2.GC_PR_BGD
classes[outline>0]=cv2.GC_PR_FGD
classes[inner>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64)
fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(small,cv2.COLOR_RGB2BGR),classes,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
grab=(np.isin(classes,(cv2.GC_FGD,cv2.GC_PR_FGD)).astype(np.uint8)*255)
for label,mask in [("black-contour",outline),("black-grabcut",grab)]:
  alpha=cv2.GaussianBlur(mask,(0,0),1.0).astype(np.float32)/255
  composite=np.clip(small.astype(np.float32)*alpha[:,:,None],0,255).astype(np.uint8)
  preview=C/f"{label}-preview.jpg"
  Image.fromarray(composite,"RGB").save(preview,quality=93,optimize=True)
  native=np.asarray(photo.crop((W//2-700,H//2-700,W//2+700,H//2+700)))
  yy,xx=np.mgrid[H//2-700:H//2+700,W//2-700:W//2+700].astype(np.float32)
  native_alpha=cv2.remap(mask,xx*sw/W,yy*sh/H,cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT)
  native_alpha=cv2.GaussianBlur(native_alpha,(0,0),0.7).astype(np.float32)/255
  detail=np.clip(native.astype(np.float32)*native_alpha[:,:,None],0,255).astype(np.uint8)
  Image.fromarray(detail,"RGB").save(C/f"{label}-native-detail-1400.jpg",quality=94,optimize=True)
  print(label,"preview_sha256",sha256(preview.read_bytes()).hexdigest())
audit=dict(dish_id="chana-masala",source_original_sha256=meta["original_sha256"],
  native_width=W,native_height=H,photo_author=meta["photo_author"],
  photo_page=meta["photo_page"],license_url=meta["photo_license"],no_upscale=True,
  generated_food_pixels=False,variants=["black-contour","black-grabcut"],
  visual_review_completed=False,approved_for_fysen=False,published=False,
  warning="Curry is golden yellow, not red; upper bowl edge appears partly close to source photo frame. Verify visible bowl rim and absence of cloth before final approval.")
(C/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("CHANA: two source-locked preview masks, zero approved, zero published")
