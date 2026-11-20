#!/usr/bin/env python3
"""Two native-pixel black-background previews, never approved or published."""
from pathlib import Path
from hashlib import sha256
import json,cv2,numpy as np
from PIL import Image,ImageOps
P=Path("assets/fysen-image-candidates/kebab-pita/commons-lauren-pita")
s=list(Path("/tmp/fysen-kebab-commons-download").rglob("commons-lauren-pita-source.jpg"))
assert len(s)==1,s
raw=s[0].read_bytes()
e=json.loads((P/"review.json").read_text(encoding="utf-8"))
assert sha256(raw).hexdigest()==e["source_sha256"]=="257d6f340413eff6ca615c65661a75ae7be9834a218077509a32f009b3e89baa"
with Image.open(s[0]) as f:
 f.load();img=ImageOps.exif_transpose(f).convert("RGB")
W,H=img.size
assert (W,H)==(4000,3000)
arr=np.asarray(img)
# Measured against a 1024x768 full-source preview, with paper excluded.
coords=[(307,216),(327,205),(350,198),(388,191),(431,190),(471,192),
(515,197),(552,198),(591,210),(633,221),(681,235),(724,244),
(777,252),(828,262),(858,277),(869,293),(854,305),(839,313),
(821,330),(815,350),(828,370),(832,391),(820,409),(804,428),
(802,459),(790,491),(773,520),(746,548),(706,570),(666,577),
(624,581),(572,582),(525,588),(474,585),(433,587),(387,583),
(340,576),(316,575),(289,572),(270,564),(247,579),(224,583),
(206,574),(190,556),(185,539),(193,517),(181,495),(176,462),
(172,427),(182,385),(197,352),(216,328),(242,313),(266,291),
(285,260),(297,234)]
points=np.asarray(coords,np.float64)
points[:,0]*=W/1024
points[:,1]*=H/768
poly=np.zeros((H,W),np.uint8)
cv2.fillPoly(poly,[points.astype(np.int32)],255)
NATIVE=Path("/tmp/fysen-kebab-commons-black");NATIVE.mkdir(parents=True,exist_ok=True)
def export(name,mask):
 alpha=cv2.GaussianBlur(mask,(0,0),1.8).astype(np.float32)/255
 composed=np.rint(arr.astype(np.float32)*alpha[:,:,None]).astype(np.uint8)
 crop=Image.fromarray(composed[630:2500,620:3500])
 square=Image.new("RGB",(2880,2880),(0,0,0))
 square.paste(crop,(0,505))
 square.save(NATIVE/(name+"-native-2880.png"),compress_level=4)
 th=square.copy();th.thumbnail((1000,1000),Image.Resampling.LANCZOS)
 th.save(P/(name+"-preview.jpg"),quality=91,optimize=True)
 square.crop((740,740,2140,2140)).save(P/(name+"-detail-1400.jpg"),quality=92,optimize=True)
export("black-contour",poly)
small=img.copy();small.thumbnail((1300,1300),Image.Resampling.LANCZOS)
sw,sh=small.size
sp=cv2.resize(poly,(sw,sh),interpolation=cv2.INTER_NEAREST)
inner=cv2.erode(sp,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(45,45)))
outer=cv2.dilate(sp,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(31,31)))
m=np.full((sh,sw),cv2.GC_BGD,np.uint8)
m[outer>0]=cv2.GC_PR_BGD;m[sp>0]=cv2.GC_PR_FGD;m[inner>0]=cv2.GC_FGD
bg=np.zeros((1,65),np.float64);fg=np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(np.array(small),cv2.COLOR_RGB2BGR),m,None,bg,fg,5,cv2.GC_INIT_WITH_MASK)
mask=np.where((m==cv2.GC_FGD)|(m==cv2.GC_PR_FGD),255,0).astype(np.uint8)
mask=cv2.resize(mask,(W,H),interpolation=cv2.INTER_NEAREST)
export("black-grabcut",cv2.bitwise_and(mask,poly))
proof={"source_sha256":e["source_sha256"],"source_size":[W,H],"food_pixels_upscaled":False,
"ingredients_generated":False,"visual_review_completed":False,"paper_removed_verified":False,
"full_pita_verified":False,"approved_for_fysen":False,"published":False,
"review":"Assess exact edges, intact bread and visible wrapper/plate; reject if masking cuts the food."}
(P/"black-review.json").write_text(json.dumps(proof,indent=2)+"\n",encoding="utf-8")
print("Prepared two source-locked, unapproved 2880px reviews")
