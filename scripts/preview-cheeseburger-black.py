#!/usr/bin/env python3
"""Review-only black-background isolation of a Pexels bacon cheeseburger + fries.

Segment a 6000x4000 native photograph using a LOW-RES mask. Scale only
the segmentation mask, not the food pixels. No public Fysen files are changed.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request, urlopen
import cv2
import numpy as np
from PIL import Image, ImageOps

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"assets/fysen-image-candidates/cheeseburger/11812583"
PHOTO_ID=11812583
SOURCE_URL="https://images.pexels.com/photos/11812583/pexels-photo-11812583.jpeg"
SOURCE_SHA="c006decbc146c4edcc44ecdf27c5b0837f5afb57e727fe5fb613888ce01bbf78"
SOURCE_SIZE=(6000,4000)

request=Request(SOURCE_URL,headers={
 "User-Agent":"FysenEditorialImageReview/1.0 (https://github.com/Paradispartiet/fysen)",
 "Accept":"image/jpeg",
})
with urlopen(request,timeout=60) as response:
    source_bytes=response.read(38*1024*1024+1)
assert sha256(source_bytes).hexdigest()==SOURCE_SHA,"Source Pexels photo changed; require new review"
with Image.open(BytesIO(source_bytes)) as raw:
    raw.load()
    im=ImageOps.exif_transpose(raw).convert("RGB")
assert im.size==SOURCE_SIZE

# The outline coordinates below refer to the 1050x700 review preview of
# THIS photo. Both burger and fries are visible and keep their relative size.
preview_size=(1050,700)
preview=np.array(im.resize(preview_size,Image.Resampling.LANCZOS))
bgr=cv2.cvtColor(preview,cv2.COLOR_RGB2BGR)
h,w=bgr.shape[:2]
mask=np.full((h,w),cv2.GC_BGD,dtype=np.uint8)

burger_outline=np.array([
 [370,392],[413,331],[443,265],[450,202],[482,152],[546,122],[650,100],
 [810,108],[947,140],[1020,183],[1049,268],[1049,442],[1014,525],
 [969,578],[867,603],[593,611],[483,606],[450,577],[456,526],
 [454,459],[385,453]],np.int32)
fries_outline=np.array([
 [0,368],[42,385],[140,378],[228,383],[340,425],[419,490],
 [466,557],[461,618],[390,656],[298,695],[35,699],[0,681]],np.int32)
cv2.fillPoly(mask,[burger_outline,fries_outline],cv2.GC_PR_FGD)
# Confident background around separate subjects, especially brown wall.
bg_regions=[
 [(0,0),(1049,0),(1049,85),(0,85)],
 [(0,120),(270,120),(270,340),(0,340)],
 [(0,700),(1049,700),(1049,699),(0,699)]
]
for poly in bg_regions:
    cv2.fillPoly(mask,[np.array(poly,dtype=np.int32)],cv2.GC_BGD)
# Guaranteed food cores keep dark meat and overlapping layers in the foreground.
cv2.ellipse(mask,(720,348),(218,175),0,0,360,cv2.GC_FGD,-1)
cv2.ellipse(mask,(740,503),(200,70),0,0,360,cv2.GC_FGD,-1)
cv2.fillPoly(mask,[np.array([
 [29,458],[130,415],[268,446],[332,503],[318,564],[214,596],[75,595]
],dtype=np.int32)],cv2.GC_FGD)
cv2.grabCut(bgr,mask,None,np.zeros((1,65),np.float64),
           np.zeros((1,65),np.float64),7,cv2.GC_INIT_WITH_MASK)

binary=(np.isin(mask,[cv2.GC_PR_FGD,cv2.GC_FGD]).astype(np.uint8)*255)
# Keep the largest burger and fries masks; fill non-food holes caused by dark
# bacon/patty so no physical part disappears when shown against black.
n,labels,stats,_=cv2.connectedComponentsWithStats(binary,connectivity=8)
kept=np.zeros_like(binary)
for i in range(1,n):
    if stats[i,cv2.CC_STAT_AREA]>=300:
        kept[labels==i]=255
contours,_=cv2.findContours(kept,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
filled=np.zeros_like(kept)
cv2.drawContours(filled,contours,-1,255,thickness=cv2.FILLED)
filled=cv2.GaussianBlur(filled,(3,3),0.65)
alpha=Image.fromarray(filled,"L").resize(im.size,Image.Resampling.BILINEAR)
black=Image.composite(im,Image.new("RGB",im.size,(0,0,0)),alpha)

OUT.mkdir(parents=True,exist_ok=True)
native=OUT/"black-native-6000x4000.png"
black.save(native,optimize=True)
black.resize((1200,800),Image.Resampling.LANCZOS).save(
    OUT/"black-preview.jpg",quality=92,optimize=True)
# 1:1 pixel detail from center of burger; a crop cannot certify the whole image.
black.crop((3150,800,4550,2200)).save(
    OUT/"black-native-detail-1400.jpg",quality=92,optimize=True)
meta={
 "dish_id":"cheeseburger",
 "source_photo_id":PHOTO_ID,
 "photographer":"MARIANNE RIXHON / Pexels",
 "source_page":"https://www.pexels.com/photo/close-up-shot-of-burger-and-fries-11812583/",
 "license":"https://www.pexels.com/license/",
 "source_original_size":list(SOURCE_SIZE),
 "source_original_sha256":SOURCE_SHA,
 "native_black_size":list(black.size),
 "native_black_sha256":sha256(native.read_bytes()).hexdigest(),
 "method":"Pexels native pixels preserved; only foreground segmentation mask scaled",
 "variant":"beef cheeseburger with bacon, melted cheese, lettuce/tomato and fries",
 "visual_review_completed":False,
 "approved_for_fysen":False,
 "published":False,
 "review_note":"Check complete burger, fries, sharpness and no brown background along the edges before approval.",
}
(OUT/"black-review.json").write_text(json.dumps(meta,indent=2,ensure_ascii=False)+"\n",encoding="utf8")
print("STAGED native black cheeseburger with fries 6000x4000; review only, SHA="+meta["native_black_sha256"])
