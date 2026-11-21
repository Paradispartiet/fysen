#!/usr/bin/env python3
"""Create review-only black-background masks for authentic Pexels dosa platter.

A whole rolled dosa with a separate bowl of potato masala, coconut chutney,
sambar and red chutney. No claim that the dosa itself is filled with potato.
The original stays source-locked and full-size; only preview masks are committed.
"""
from __future__ import annotations
from pathlib import Path
from urllib.request import Request,urlopen
from io import BytesIO
from hashlib import sha256
import json
import cv2,numpy as np
from PIL import Image,ImageOps
C=Path("assets/fysen-image-candidates/masala-dosa/jack-baghel-dosa-dark")
meta=json.loads((C/"review.json").read_text(encoding="utf8"))
SHA="f21b2b545b16554ef593474aadeb9f761d3731b3470e26ad4b6c11e1b0f8d20c"
assert meta["original_sha256"]==SHA and meta["source_verified"] and meta["no_upscale"]
assert meta["catalog_id"]=="dosa" and not meta["approved_for_fysen"] and not meta["published"]
req=Request(meta["photo_source_url"],headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*"})
with urlopen(req,timeout=100) as res:raw=res.read(48*1024*1024+1)
assert sha256(raw).hexdigest()==SHA,"Source JPEG changed"
with Image.open(BytesIO(raw)) as p:
    p.load()
    photo=ImageOps.exif_transpose(p).convert("RGB")
W,H=photo.size
assert (W,H)==(9504,6336)
sw,sh=1350,900
small=np.asarray(photo.resize((sw,sh),Image.Resampling.LANCZOS))
sx,sy=sw/1080,sh/720
outline=np.zeros((sh,sw),np.uint8)
# Full rolled dosa, complete serving plate and small potato bowl.
main=np.array([(82,208),(90,162),(172,111),(345,56),(570,7),
               (707,0),(787,8),(800,71),(799,158),(778,292),
               (754,423),(717,485),(626,527),(476,531),
               (327,513),(238,470),(181,423),(108,359)],dtype=np.float32)
main[:,0]*=sx
main[:,1]*=sy
cv2.fillPoly(outline,[main.astype(np.int32)],255)
cv2.ellipse(outline,(round(838*sx),round(179*sy)),(round(76*sx),round(81*sy)),0,0,360,255,-1)
cv2.ellipse(outline,(round(917*sx),round(322*sy)),(round(144*sx),round(119*sy)),0,0,360,255,-1)
# Constrain to plate and food: all spoons outside outline are omitted.
inner=cv2.erode(outline,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(35,35)))
near=cv2.dilate(outline,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(43,43)))
classes=np.full((sh,sw),cv2.GC_BGD,np.uint8)
classes[near>0]=cv2.GC_PR_BGD
classes[outline>0]=cv2.GC_PR_FGD
classes[inner>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64)
fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(small,cv2.COLOR_RGB2BGR),classes,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
grab=(np.isin(classes,[cv2.GC_FGD,cv2.GC_PR_FGD])*255).astype(np.uint8)
# High-confidence background and contour avoid slate-grey table remnants.
bound=cv2.dilate(outline,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(23,23)))
clean=grab.copy()
clean[bound==0]=0
# Remove slate-grey table while preserving actual dosa/plate/bowls. Bright
# porcelain, cooked food and saturated herbs survive; the neutral dark cloth
# is rejected. Fill only *mask* holes (never invent/replace image pixels).
pix=small.astype(np.int16)
peak=pix.max(axis=2)
chroma=peak-pix.min(axis=2)
food_or_plate=((peak>=163)|((peak>=78)&(chroma>=43))).astype(np.uint8)*255
food_or_plate=cv2.bitwise_and(food_or_plate,clean)
food_or_plate=cv2.morphologyEx(food_or_plate,cv2.MORPH_CLOSE,
    cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(19,19)))
contours,_=cv2.findContours(food_or_plate,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
isolate=np.zeros_like(grab)
for contour in contours:
    if cv2.contourArea(contour)>=300:
        cv2.drawContours(isolate,[contour],-1,255,-1)
isolate=cv2.GaussianBlur(isolate,(0,0),0.6)
for label,mask in [("black-contour",outline),("black-grabcut",grab),("black-clean-grabcut",clean),
                    ("black-food-isolate",isolate)]:
    alpha=cv2.GaussianBlur(mask,(0,0),1).astype(np.float32)/255
    preview=np.clip(small.astype(np.float32)*alpha[:,:,None],0,255).astype(np.uint8)
    out=C/f"{label}-preview.jpg"
    Image.fromarray(preview,"RGB").save(out,quality=93,optimize=True)
    xa,ya=W//2-700,H//2-700
    src=np.asarray(photo.crop((xa,ya,xa+1400,ya+1400)))
    ys,xs=np.mgrid[ya:ya+1400,xa:xa+1400].astype(np.float32)
    am=cv2.remap(mask,xs*sw/W,ys*sh/H,cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT)
    a=cv2.GaussianBlur(am,(0,0),.7).astype(np.float32)/255
    cut=np.clip(src.astype(np.float32)*a[:,:,None],0,255).astype(np.uint8)
    Image.fromarray(cut,"RGB").save(C/f"{label}-native-detail-1400.jpg",quality=94,optimize=True)
    print(f"{label} coverage {(mask>127).mean():.3f}, preview sha {sha256(out.read_bytes()).hexdigest()}")
audit=dict(dish_id="dosa",photo_source_sha256=SHA,source_native_dimensions=[W,H],
           photographer=meta["source_photo_author"],photo_page=meta["photo_page"],
           license_url=meta["photo_license"],no_upscale=True,
           generated_food_pixels=False,variants=["black-contour","black-grabcut","black-clean-grabcut","black-food-isolate"],
           visual_review_completed=False,approved_for_fysen=False,published=False,
           warning=("Masala potato curry is clearly present in its OWN bowl; the image does NOT "
                    "verify a potato-stuffed dosa. Do not label that filling as inside the crepe. "
                    "Keep full dosa, plate, chutney and sambar. Omit cutlery and grey table."))
(C/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("MASALA DOSA: 3 unapproved masks only, 0 public images")
