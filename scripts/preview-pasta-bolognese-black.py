#!/usr/bin/env python3
"""Review-only native bolognese photo on a true-black background.

Only an antialiased contour mask is resized; every food and plate pixel comes
from the unchanged 4000x3000 source. No AI reconstruction or enlargement.
"""
from __future__ import annotations

from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen
import json
from PIL import Image, ImageDraw, ImageFilter, ImageOps
import cv2
import numpy as np

OUT=Path("assets/fysen-image-candidates/pasta-bolognese/tagliatelle-trattoria-tony")
FILENAME="Tagliatelle al ragù Trattoria Tony.jpg"
SOURCE_PAGE="https://commons.wikimedia.org/wiki/File:"+quote(FILENAME.replace(" ","_"),safe="()")
SOURCE_URL="https://commons.wikimedia.org/wiki/Special:FilePath/"+quote(FILENAME.replace(" ","_"),safe="()")
EXPECTED_SHA="e3e9792287a5bf4c0bf0dd0d88cf063e501a69fea8d17d48c65802b190a54131"
DIMS=(4000,3000)

req=Request(SOURCE_URL,headers={"User-Agent":"FysenLicensedEditorialImageReview/1.0 (https://github.com/Paradispartiet/fysen)"})
with urlopen(req,timeout=60) as response:
    content=response.read(40*1024*1024+1)
assert sha256(content).hexdigest()==EXPECTED_SHA,"Original source file changed: review again"
with Image.open(BytesIO(content)) as source:
    source.load()
    native=ImageOps.exif_transpose(source).convert("RGB")
assert native.size==DIMS

# Segment the ORIGINAL plate edge at review resolution, rather than
# manually guessing its white, angled outline. GrabCut works on the
# segmentation mask ONLY; original pasta/plate pixels are never resized.
# The confidence core is deep inside the white plate, keeping all food.
small=np.asarray(native.resize((1100,825),Image.Resampling.LANCZOS))
h,w=small.shape[:2]
yy,xx=np.mgrid[0:h,0:w]
radial=np.sqrt(((xx-605.0)/461.0)**2+((yy-420.0)/331.0)**2)
mask_codes=np.where(radial>1.085,cv2.GC_BGD,cv2.GC_PR_BGD).astype(np.uint8)
mask_codes[radial<1.025]=cv2.GC_PR_FGD
mask_codes[radial<0.88]=cv2.GC_FGD
cv2.grabCut(cv2.cvtColor(small,cv2.COLOR_RGB2BGR),mask_codes,None,
            np.zeros((1,65),np.float64),np.zeros((1,65),np.float64),
            6,cv2.GC_INIT_WITH_MASK)
binary=np.uint8(np.isin(mask_codes,[cv2.GC_FGD,cv2.GC_PR_FGD]))*255
# The contour must remain single and include the entire food/plate.
n,labels,stats,centroids=cv2.connectedComponentsWithStats(binary,8)
assert n>=2
big=1+int(np.argmax(stats[1:,cv2.CC_STAT_AREA]))
component=np.uint8(labels==big)*255
contours,_=cv2.findContours(component,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
filled=np.zeros_like(component)
cv2.drawContours(filled,contours,-1,255,thickness=cv2.FILLED)
filled=cv2.GaussianBlur(filled,(5,5),0.9)
mask=Image.fromarray(filled,"L")
alpha=mask.resize(DIMS,Image.Resampling.BILINEAR)
black=Image.composite(native,Image.new("RGB",DIMS,(0,0,0)),alpha)
assert all(black.getpixel(q)==(0,0,0) for q in [(0,0),(3999,0),(0,2999),(3999,2999)])

OUT.mkdir(parents=True,exist_ok=True)
png=OUT/"black-native-master.png"
black.save(png,optimize=True)
small=black.copy()
small.thumbnail((1100,1100),Image.Resampling.LANCZOS)
small.save(OUT/"black-preview.jpg",quality=92,optimize=True)
black.crop((1320,770,2720,2170)).save(OUT/"black-native-detail-1400.jpg",quality=92,optimize=True)
data={
  "dish_id":"pasta-bolognese",
  "source_file":FILENAME,
  "source_page":SOURCE_PAGE,
  "photographer":"Alex Sirac / Wikimedia Commons",
  "source_original_sha256":EXPECTED_SHA,
  "license":"CC BY 4.0",
  "license_url":"https://creativecommons.org/licenses/by/4.0/",
  "original_dimensions":[4000,3000],
  "review_native_dimensions":[4000,3000],
  "review_native_sha256":sha256(png.read_bytes()).hexdigest(),
  "method":"Native photo pixels retained; separate traced mask excluding table/glassware is enlarged to source dimensions only",
  "original_pixels_upscaled":False,
  "visual_review_completed":False,
  "approved_for_fysen":False,
  "published":False,
  "review_required":"All pasta/plate preserved and in sharp focus, true black surrounding, no visible table arc, no white rim cut, no restaurant-specific menu claims"
}
(OUT/"black-review.json").write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print(f"STAGED native tagliatelle {black.size}, SHA={data['review_native_sha256']}, unapproved")
