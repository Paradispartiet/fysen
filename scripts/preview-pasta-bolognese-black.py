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

# Source image preview is 1100x825. Measured contour encloses the WHOLE
# white oval serving plate without including the table/glassware behind it.
# Use no interior holes: all beef ragù, pasta and plate remain original.
contour=[
  (652,120),(734,126),(822,151),(893,193),(965,252),
  (1013,316),(1055,389),(1064,470),(1053,541),(1021,607),
  (966,666),(900,714),(816,752),(723,775),
  (610,789),(495,781),(383,762),(292,724),
  (218,675),(174,617),(142,552),(136,477),
  (149,408),(177,336),(222,273),(279,221),
  (355,180),(451,149),(546,130)
]
mask=Image.new("L",(1100,825),0)
ImageDraw.Draw(mask).polygon(contour,fill=255)
mask=mask.filter(ImageFilter.GaussianBlur(1.8))
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
