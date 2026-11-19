#!/usr/bin/env python3
"""Try foreground/background-constrained GrabCut on real shrimp sandwich pixels.

No image generation or upscaling. All edits change only the alpha mask, never
original food pixels. Preview only, with publication and approval both false.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request,urlopen
import cv2
import numpy as np
from PIL import Image,ImageOps,ImageDraw,ImageFilter

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"assets/fysen-image-candidates/rekesmorbrod/40853857"
PHOTO="https://images.pexels.com/photos/40853857/pexels-photo-40853857.jpeg"
SHA="de9b42bd81dafda2cabc3551db63162f29119fdb4af61469b9a601cdc289fdf7"
ORIGINAL=(4284,5712)
SMALL=(825,1100)
CROP=(150,2180,4100,5520)
with urlopen(Request(PHOTO,headers={"User-Agent":"FysenImageSourceReview/1.0"}),timeout=60) as r:
    b=r.read(48*1024*1024+1)
assert sha256(b).hexdigest()==SHA
with Image.open(BytesIO(b)) as p:
    p.load()
    source=ImageOps.exif_transpose(p).convert("RGB")
assert source.size==ORIGINAL
small=np.asarray(source.resize(SMALL,Image.Resampling.LANCZOS))
rgb=small.astype(np.float32)
r,g,blue=rgb[:,:,0],rgb[:,:,1],rgb[:,:,2]
y,x=np.mgrid[0:1100,0:825]
mask=np.full((1100,825),cv2.GC_BGD,np.uint8)
def polygon(coords,value):
    cv2.fillPoly(mask,[np.array(coords,dtype=np.int32)],value)
# Only upper garnish region can possibly be the foreground. Wine glass,
# tabletop and window outside the tight hand-reviewed contour remain sure BG.
polygon([
 (329,673),(333,614),(350,571),(359,529),(371,496),
 (381,468),(406,450),(444,450),(480,468),(504,493),
 (526,518),(544,560),(555,618),(548,671),(470,692)
],cv2.GC_PR_BGD)
# A small probable foreground region around actual garnishes, not the wall.
polygon([
 (353,635),(363,596),(382,563),(411,536),(441,519),
 (472,527),(504,556),(525,597),(518,656),(464,683),
 (392,676)
],cv2.GC_PR_FGD)
# Confident foreground cores: cucumber, lemon, red onion and dense dill.
polygon([(374,578),(397,563),(435,571),(467,596),
         (448,624),(393,621)],cv2.GC_FGD)
polygon([(482,544),(509,551),(515,580),(513,612),
         (490,620),(478,596)],cv2.GC_FGD)
polygon([(401,629),(422,609),(475,608),(494,636),
         (474,656),(411,658)],cv2.GC_FGD)
# Individual green and yellow photographic pixels are more reliable
# foreground seeds than a broad ellipse through tan drywall.
dill_color=(g>r*1.055)&(g>blue*1.09)&(g>53)
lemon_color=(r>162)&(g>121)&(blue<g*0.84)&(r>g*0.95)
color_core=(dill_color|lemon_color)&(x>354)&(x<533)&(y>454)&(y<612)
mask[color_core]=cv2.GC_FGD
# Exclude known disjoint glass and room, including the stem at left.
mask[(x<344)&(y<656)]=cv2.GC_BGD
mask[(x>558)&(y<638)]=cv2.GC_BGD
mask[y<443]=cv2.GC_BGD
# The full plate/food below is integrated by deterministic protection later.
image_bgr=cv2.cvtColor(small,cv2.COLOR_RGB2BGR)
cv2.grabCut(image_bgr,mask,None,np.zeros((1,65),np.float64),
           np.zeros((1,65),np.float64),7,cv2.GC_INIT_WITH_MASK)
cut=np.uint8(np.isin(mask,[cv2.GC_FGD,cv2.GC_PR_FGD]))*255
cut=cv2.morphologyEx(cut,cv2.MORPH_CLOSE,np.ones((3,3),np.uint8))
cut=cv2.GaussianBlur(cut,(3,3),0.65)
# The source has a straight tan window edge behind dill and lemon. A
# foreground GMM can retain that distinct rectangle despite foreground
# markers. In only this small right-upper region, retain green needles and
# yellow lemon pixels but discard neutral tan/white window pixels.
top_right=(x>480)&(x<548)&(y<638)&(y>444)
is_green=(g>r*1.03)&(g>blue*1.10)&(g>42)
is_yellow=(r>150)&(g>119)&(blue<g*0.89)&(r>g*0.95)
is_pink=(r>115)&(r>g*1.2)&(blue>g*0.91)&(blue>74)
food_colors=np.uint8(is_green|is_yellow|is_pink)*255
food_colors=cv2.GaussianBlur(cv2.dilate(food_colors,np.ones((3,3),np.uint8)),(3,3),0.65)
cut[top_right]=(cut[top_right].astype(np.uint16)*food_colors[top_right].astype(np.uint16)//255).astype(np.uint8)
# Remove the small brown table wedge *outside the plate*, at its upper-left
# edge. Its warm dark brown is unlike the cyan plate; keep green lettuce.
wood=(r>g*1.22)&(g>blue*1.07)&(r>65)
edge_wood=(x<340)&(y>628)&(y<667)&wood
cut[edge_wood]=0
# Plate and food remain untouched in lower half, including scattered shrimp.
plate=Image.new("L",SMALL,0)
draw=ImageDraw.Draw(plate)
draw.ellipse((49,622,757,1035),fill=255)
draw.polygon([
 (255,681),(286,612),(331,561),(368,533),(405,521),
 (458,531),(512,562),(559,626),(575,688),(556,753),
 (297,778)
],fill=255)
plate=np.asarray(plate.filter(ImageFilter.GaussianBlur(2.0)),dtype=np.float32)/255.0
blend=np.clip((y.astype(np.float32)-644.0)/36.0,0.0,1.0)
alpha_small=np.uint8(np.clip(np.maximum(cut.astype(np.float32)/255.0*(1.0-blend),
                                          plate*blend),0.0,1.0)*255)
alpha=Image.fromarray(alpha_small,"L").resize(ORIGINAL,Image.Resampling.BILINEAR).crop(CROP)
native=source.crop(CROP)
black=Image.composite(native,Image.new("RGB",native.size,(0,0,0)),alpha)
assert black.size==(3950,3340)
for xy in ((0,0),(3949,0),(0,3339),(3949,3339)):
    assert black.getpixel(xy)==(0,0,0)
OUT.mkdir(parents=True,exist_ok=True)
full=OUT/"black-grabcut-native-master.png"
black.save(full,optimize=True)
preview=black.copy()
preview.thumbnail((1050,1050),Image.Resampling.LANCZOS)
preview.save(OUT/"black-grabcut-preview.jpg",quality=91,optimize=True)
black.crop((1180,740,2580,2140)).save(OUT/"black-grabcut-detail-1400.jpg",quality=92,optimize=True)
record={
 "dish_id":"rekesmorbrod",
 "photo_id":40853857,
 "photo_source":"https://www.pexels.com/photo/elegant-shrimp-sandwich-with-white-wine-40853857/",
 "license_url":"https://www.pexels.com/license/",
 "source_native_size":list(ORIGINAL),"source_sha256":SHA,
 "output_native_size":list(black.size),"output_sha256":sha256(full.read_bytes()).hexdigest(),
 "method":"Non-generative GrabCut foreground with hand-annotated foreground/background seeds, protected plate, and resized alpha mask only",
 "visual_review_completed":False,"approved_for_fysen":False,"published":False,
 "check":"No wine glass, wall, black holes, clipped lemon or garnish, or nonblack surrounding background"
}
(OUT/"black-grabcut-review.json").write_text(json.dumps(record,indent=2,ensure_ascii=False)+"\n",encoding="utf8")
print("REVIEW ONLY",record["output_native_size"],record["output_sha256"])
