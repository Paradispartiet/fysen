#!/usr/bin/env python3
"""Review three masks for one braised pork gua-bao on its complete ceramic plate.

Only original pixels survive. CC0 Wikimedia JPEG is hash-locked; paper and
restaurant table are removed, and food/toppings are not fabricated.
"""
from pathlib import Path
from urllib.request import Request,urlopen
from io import BytesIO
from hashlib import sha256
import json
import cv2,numpy as np
from PIL import Image,ImageOps
D=Path("assets/fysen-image-candidates/braised-pork-bao/andy-li-cc0")
meta=json.loads((D/"review.json").read_text(encoding="utf8"))
assert meta["source_verified"] and meta["no_upscale"]
assert meta["catalog_id"]=="bao" and meta["license"]=="CC0 1.0"
assert not meta["approved_for_fysen"] and not meta["published"]
r=Request(meta["source_url"],headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*"})
with urlopen(r,timeout=110) as response: raw=response.read(18*1024*1024+1)
assert sha256(raw).hexdigest()==meta["original_sha256"],"Source JPEG changed"
with Image.open(BytesIO(raw)) as origin:
  origin.load()
  photo=ImageOps.exif_transpose(origin).convert("RGB")
W,H=photo.size
assert (W,H)==(8160,6144)
sw,sh=1200,904
small=np.asarray(photo.resize((sw,sh),Image.Resampling.LANCZOS))
# True outline of round brown ceramic plate from the source preview.
# The entire folded steamed bao, braised pork and garnish lie within the plate.
coords=np.array([
 (236,296),(249,266),(283,235),(332,216),(393,204),
 (465,195),(542,196),(611,208),(676,227),(725,267),
 (750,312),(756,373),(740,428),(700,471),(647,507),
 (582,528),(516,531),(431,528),(345,506),(290,474),
 (245,439),(224,394),(220,343)],dtype=np.float32)
coords[:,0]*=sw/1000
coords[:,1]*=sh/750
contour=np.zeros((sh,sw),np.uint8)
cv2.fillPoly(contour,[coords.astype(np.int32)],255)
inner=cv2.erode(contour,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(37,37)))
outer=cv2.dilate(contour,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(37,37)))
classes=np.full((sh,sw),cv2.GC_BGD,np.uint8)
classes[outer>0]=cv2.GC_PR_BGD
classes[contour>0]=cv2.GC_PR_FGD
classes[inner>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64)
fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(small,cv2.COLOR_RGB2BGR),classes,None,bg,fg,6,cv2.GC_INIT_WITH_MASK)
grab=np.isin(classes,(cv2.GC_FGD,cv2.GC_PR_FGD)).astype(np.uint8)*255
# Keep contour inside plate, to exclude printed restaurant menu and glass;
# remove remote detached pieces with connected-component cleanup.
clean=grab.copy()
clean=cv2.bitwise_and(clean,outer)
cnt,labels,stats,centroids=cv2.connectedComponentsWithStats((clean>0).astype(np.uint8),8)
if cnt>1:
  best=1+np.argmax(stats[1:,cv2.CC_STAT_AREA])
  clean[labels!=best]=0
variants={"black-contour":contour,"black-grabcut":grab,"black-clean-grabcut":clean}
for name,mask in variants.items():
  alpha=cv2.GaussianBlur(mask,(0,0),0.9).astype(np.float32)/255
  preview=np.uint8(np.clip(small.astype(np.float32)*alpha[:,:,None],0,255))
  path=D/(name+"-preview.jpg")
  Image.fromarray(preview).save(path,quality=93,optimize=True)
  # Native (not upscaled) 1400×1400 detail of pork and folded bao.
  xa,ya=3320,1800
  pixels=np.asarray(photo.crop((xa,ya,xa+1400,ya+1400)))
  ys,xs=np.mgrid[ya:ya+1400,xa:xa+1400].astype(np.float32)
  am=cv2.remap(mask,xs*sw/W,ys*sh/H,cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT)
  a=cv2.GaussianBlur(am,(0,0),0.7).astype(np.float32)/255
  cut=np.uint8(np.clip(pixels.astype(np.float32)*a[:,:,None],0,255))
  Image.fromarray(cut).save(D/(name+"-detail-1400.jpg"),quality=94,optimize=True)
  print(name,"SHA256",sha256(path.read_bytes()).hexdigest())
audit=dict(dish_id="bao",catalog_id="bao",source_original_sha256=meta["original_sha256"],
  source_native_dimensions=[W,H],photo_credit=meta["author"],photo_source=meta["source_page"],
  license="CC0 1.0",license_url=meta["license_url"],
  variants=list(variants.keys()),no_upscale=True,generated_food_pixels=False,
  visual_review_completed=False,approved_for_fysen=False,published=False,
  caution="Photo is of an actual dish at Tiger Bites Pig in Brighton, not Fysen restaurant. Visible red-braised pork belly, mustard greens, peanuts and coriander in a full gua bao; reject unrelated drink/menu/table outside plate.")
(D/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("3 BAO preview masks, no approval or public images")
