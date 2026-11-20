#!/usr/bin/env python3
"""Produce black-backdrop source-native previews for six Japanese gyoza.

This ONLY produces a review candidate. Does not approve, publish or edit food.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
import json
import cv2
import numpy as np
from PIL import Image,ImageOps

ROOT=Path("assets/fysen-image-candidates/gyoza/lara-bellens-pexels")
meta=json.loads((ROOT/"review.json").read_text(encoding="utf8"))
SHA="413f380af0bf03a2da46effa445cf47b85fed242882a214be2fc6863a5ceb5fc"
assert meta["original_sha256"]==SHA and meta["download_verified"]
assert (meta["native_width"],meta["native_height"])==(4937,3662)
assert not meta["approved_for_fysen"] and not meta["published"]
request=Request(meta["source_url"],headers={"User-Agent":"FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*;q=0.8"})
with urlopen(request,timeout=60) as response:
    payload=response.read(25*1024*1024+1)
assert sha256(payload).hexdigest()==SHA,"SOURCE CHANGED, STOP"
with Image.open(BytesIO(payload)) as im:
    im.load()
    original=ImageOps.exif_transpose(im).convert("RGB")
W,H=original.size
assert (W,H)==(4937,3662)
source=np.asarray(original)
# 1100 x 816 coordinate system, plates + dumpling that protrudes above top rim.
# Polygon is intentionally conservative (OUTSIDE plate); GrabCut may remove
# table pixels outside the true plate. Inspect ALL food edges at native zoom.
outline=np.array([
 (440,55),(459,53),(470,55),
 # Narrow food-only projection above the plate's upper edge.
 (479,47),(488,32),(507,22),(529,22),(545,38),(551,59),
 (580,73),(650,105),(714,150),(761,206),(794,276),
 (809,350),(811,430),(792,512),(750,592),(690,663),
 (614,720),(534,754),(438,778),(341,766),(250,739),
 (177,698),(113,632),(75,552),(55,458),(56,375),
 (84,286),(129,209),(196,142),(286,95),(364,67)
],dtype=np.float32)

def catmull(points,steps=8):
    out=[];n=len(points)
    for i in range(n):
      a,b,c,d=[points[j%n] for j in (i-1,i,i+1,i+2)]
      for t in np.linspace(0,1,steps,endpoint=False):
        out.append(.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+
                       (-a+3*b-3*c+d)*t*t*t))
    return np.asarray(out,np.float32)
points=catmull(outline)
points[:,0]*=W/1100
points[:,1]*=H/816
mask=np.zeros((H,W),np.uint8)
cv2.fillPoly(mask,[points.astype(np.int32)],255)

def make(name,foreground):
    alpha=np.clip(cv2.GaussianBlur(foreground,(0,0),1.0).astype(np.float32)/255,0,1)
    img=Image.fromarray(np.clip(source*alpha[:,:,None],0,255).astype(np.uint8))
    img.save(ROOT/f"{name}-native.png",compress_level=4)
    tiny=img.copy()
    tiny.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    tiny.save(ROOT/f"{name}-preview.jpg",quality=93,optimize=True)
    img.crop((W//2-700,H//2-700,W//2+700,H//2+700)).save(
      ROOT/f"{name}-native-detail-1400.jpg",quality=93,optimize=True)
    return float(np.mean(alpha>0.5))

contour_area=make("black-contour",mask)
small=original.copy()
small.thumbnail((1100,1100),Image.Resampling.LANCZOS)
sw,sh=small.size
reduced=cv2.resize(mask,(sw,sh),interpolation=cv2.INTER_NEAREST)
inside=cv2.erode(reduced,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(43,43)))
outside=cv2.dilate(reduced,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(29,29)))
classes=np.full((sh,sw),cv2.GC_BGD,np.uint8)
classes[outside>0]=cv2.GC_PR_BGD
classes[reduced>0]=cv2.GC_PR_FGD
classes[inside>0]=cv2.GC_FGD
background=np.zeros((1,65),np.float64)
foreground=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(np.asarray(small),cv2.COLOR_RGB2BGR),
    classes,None,background,foreground,5,cv2.GC_INIT_WITH_MASK)
extracted=(np.isin(classes,[cv2.GC_FGD,cv2.GC_PR_FGD]).astype(np.uint8)*255)
extracted=cv2.resize(extracted,(W,H),interpolation=cv2.INTER_LINEAR)
# Wood and plate are separable by color at the OUTER boundary. The plate
# is cold blue-gray while table wood is warm brown. Do not remove warm food:
# conserve the main plate region and both protruding upper dumplings.
rr=source[:,:,0].astype(np.int16)
gg=source[:,:,1].astype(np.int16)
bb=source[:,:,2].astype(np.int16)
xx=np.arange(W,dtype=np.float32)[None,:]*1100/W
yy=np.arange(H,dtype=np.float32)[:,None]*816/H
inner_plate=((xx-438)/361)**2+((yy-415)/348)**2<=1.0
top_dumpling=(xx>=474)&(xx<=586)&(yy>=15)&(yy<=290)
right_dumpling=(xx>=548)&(xx<=790)&(yy>=147)&(yy<=349)
wood=(rr>gg+19)&(gg>bb+8)&(rr>72)
extracted[wood &~(inner_plate|top_dumpling|right_dumpling)]=0
grabcut_area=make("black-grabcut",extracted)
audit={
 "dish_id":"gyoza","source_original_sha256":SHA,
 "source_page":meta["source_page"],"original_native_dimensions":[W,H],
 "photographer":meta["photographer"],"photo_license":meta["license_url"],
 "unscaled_native":True,"generated_food_pixels":False,
 "black_contour_area_fraction":contour_area,"black_grabcut_area_fraction":grabcut_area,
 "visual_review_completed":False,"approved_for_fysen":False,"published":False,
 "quality_gate":"Six pan-seared dumplings, full blue plate and soy dipping bowl, no wooden table, no clipping, artifacts or artificial food. Always inspect source 1400px center before authorizing approval."
}
(ROOT/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("GYOZA: source SHA confirmed; two black native variants prepared; 0 approved/published.")
