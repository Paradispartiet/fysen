#!/usr/bin/env python3
"""Create source-native BLACK BÁNH MÌ preview from Andy Li's CC0 original.

Candidate only: does NOT approve any dish image or modify Matlyst/public assets.
Preserve original food pixels; no synthesized content, no upscaling. Reject source
bytes if the CC0 JPEG changes. Preview and native 1400px crop require visual QA.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen
import json
import cv2
import numpy as np
from PIL import Image, ImageOps

ROOT=Path("assets/fysen-image-candidates/banh-mi/andy-li-special-baguette-cc0")
ORIGINAL_URL="https://upload.wikimedia.org/wikipedia/commons/8/89/Special_Baguette_%28B%C3%A1nh_m%C3%AC%29_-_Banh_Mi_Ancient_Saigon_2024-12-20.jpg"
SOURCE_SHA="a767191b3c4acf116b6dd9ea88d6568225eaaa214b8c09d2414fe37478b2b27a"
PHOTO_PAGE="https://commons.wikimedia.org/wiki/File:Special_Baguette_(B%C3%A1nh_m%C3%AC)_-_Banh_Mi_Ancient_Saigon_2024-12-20.jpg"
REVIEW=json.loads((ROOT/"review.json").read_text(encoding="utf8"))
assert REVIEW["dish_id"]==REVIEW["catalog_id"]=="banh-mi"
assert REVIEW["original_sha256"]==SOURCE_SHA and REVIEW["source_download_verified"]
assert not REVIEW["approved_for_fysen"] and not REVIEW["visual_review_completed"] and not REVIEW["published"]
assert REVIEW["native_width"]==8160 and REVIEW["native_height"]==6144
req=Request(ORIGINAL_URL,headers={
    "User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)",
    "Accept":"image/jpeg,image/*;q=0.8"})
with urlopen(req,timeout=90) as response:
    raw=response.read(40*1024*1024+1)
assert sha256(raw).hexdigest()==SOURCE_SHA,"Original CC0 photo changed"
with Image.open(BytesIO(raw)) as image:
    image.load()
    orig=ImageOps.exif_transpose(image).convert("RGB")
W,H=orig.size
assert (W,H)==(8160,6144)
# Pixel-space design refers to original's 1000 x 753 preview:
# two fully visible baguette halves centered around (400,352) and (565,365).
# Segment on a smaller image to reduce memory, then upsample only the ALPHA
# (NOT the original food pixels) to source-native resolution.
pw,ph=1000,753
small=np.asarray(orig.resize((pw,ph),Image.Resampling.LANCZOS))
bgr=cv2.cvtColor(small,cv2.COLOR_RGB2BGR)
mask=np.full((ph,pw),cv2.GC_BGD,dtype=np.uint8)
left=np.array([
    (345,201),(373,197),(411,199),(456,210),(488,221),(509,253),
    (513,293),(506,353),(492,414),(474,463),(453,496),
    (415,506),(369,503),(330,484),(301,456),(303,419),
    (319,378),(323,334),(330,278),(340,230)
],dtype=np.int32)
right=np.array([
    (521,206),(560,208),(607,216),(647,234),(671,267),
    (675,310),(667,359),(653,416),(637,462),(610,500),
    (581,522),(539,523),(499,518),(474,492),(476,451),
    (490,402),(500,351),(502,296),(507,241)
],dtype=np.int32)
# Tentative source-food silhouettes; surround uncertain edges with probable BG.
for polygon in [left,right]:
    cv2.fillPoly(mask,[polygon],cv2.GC_PR_FGD)
# Positive seeds MUST be internal sandwich pixels rather than white paper.
for box in [(409,243,479,436),(337,309,401,445),
            (579,252,633,418),(511,321,577,452)]:
    x0,y0,x1,y1=box
    mask[y0:y1,x0:x1]=cv2.GC_FGD
# Keep likely paper far from the bread as reliable BG.
cv2.rectangle(mask,(0,0),(pw-1,183),cv2.GC_BGD,-1)
cv2.rectangle(mask,(0,565),(pw-1,ph-1),cv2.GC_BGD,-1)
bg=np.zeros((1,65),np.float64)
fg=np.zeros((1,65),np.float64)
cv2.grabCut(bgr,mask,None,bg,fg,8,cv2.GC_INIT_WITH_MASK)
foreground=np.where((mask==cv2.GC_FGD)|(mask==cv2.GC_PR_FGD),255,0).astype(np.uint8)
foreground=cv2.morphologyEx(foreground,cv2.MORPH_CLOSE,np.ones((3,3),np.uint8),iterations=1)
# Flatten tiny disconnected noise only; preserve the baguette and its herbs.
num,lab,stats,_=cv2.connectedComponentsWithStats(foreground,8)
refined=np.zeros_like(foreground)
for idx in range(1,num):
    if int(stats[idx,cv2.CC_STAT_AREA])>=85:
        refined[lab==idx]=255
# Soft feathering at 2 native pixels, and preserve an untouched source-native
# rectangular canvas with black exterior; no cropped sandwich, no resize.
from PIL import ImageFilter
alpha=Image.fromarray(refined,mode="L").resize((W,H),Image.Resampling.BILINEAR)
alpha=alpha.filter(ImageFilter.GaussianBlur(1.8))
original_canvas=Image.composite(orig,Image.new("RGB",(W,H),(0,0,0)),alpha)
# Crop only *outer canvas* and entirely empty black margins. No food pixels
# cut; 500px source-native padding past the foreground's bounding rectangle.
yy,xx=np.nonzero(refined)
assert len(xx)>=15000 and len(yy)>=15000,"Failed to preserve both sandwiches"
l=max(0,int(xx.min()*W/pw)-450)
t=max(0,int(yy.min()*H/ph)-450)
r=min(W,int((xx.max()+1)*W/pw)+450)
b=min(H,int((yy.max()+1)*H/ph)+450)
assert (r-l)>=2000 and (b-t)>=2000
candidate=original_canvas.crop((l,t,r,b))
assert min(candidate.size)>=2000
assert all(candidate.getpixel(p)==(0,0,0) for p in
    [(0,0),(candidate.width-1,0),(0,candidate.height-1),(candidate.width-1,candidate.height-1)])
# High-quality source-composition preview and a genuine pixel-level detail.
native=ROOT/"black-grabcut-native.png"
preview=ROOT/"black-grabcut-preview.jpg"
detail=ROOT/"black-grabcut-detail-1400.jpg"
candidate.save(native,compress_level=4)
p=candidate.copy()
p.thumbnail((1100,1100),Image.Resampling.LANCZOS)
p.save(preview,quality=94,optimize=True)
cx,cy=candidate.width//2,candidate.height//2
assert cx>=700 and cy>=700 and cx+700<=candidate.width and cy+700<=candidate.height
candidate.crop((cx-700,cy-700,cx+700,cy+700)).save(detail,quality=94,optimize=True)
review=dict(
 dish_id="banh-mi",catalog_id="banh-mi",source_original_sha256=SOURCE_SHA,
 original_image_size=[W,H],crop_rect_in_original=[l,t,r,b],
 processed_native_dimensions=[candidate.width,candidate.height],
 candidate_png_sha256=sha256(native.read_bytes()).hexdigest(),
 preview_sha256=sha256(preview.read_bytes()).hexdigest(),
 candidate_method="source-locked-mask-only-grabcut-native-cc0",
 photographer="Andy Li / Wikimedia Commons",source=PHOTO_PAGE,
 license="https://creativecommons.org/publicdomain/zero/1.0/",
 no_upscale=True,generated_food_pixels=False,
 visual_review_completed=False,approved_for_fysen=False,published=False,
 quality_gate="Visually check both whole bread halves, filling, herb and crust silhouettes, no paper/basket/white background remains; black outside and sharp native 1400px detail. Reject damaged edges or any missing ingredients.")
(ROOT/"black-grabcut-review.json").write_text(json.dumps(review,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("BÁNH_MÌ PREVIEW ONLY",candidate.size,review["candidate_png_sha256"],
      "source SHA verified, approved 0, published 0",flush=True)
