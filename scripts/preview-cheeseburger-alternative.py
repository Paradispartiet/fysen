#!/usr/bin/env python3
"""Review a second Pexels bacon-cheeseburger photo with a native dark background.

This alternate photograph has no fries. The editorial variant will be
documented accurately if promoted, rather than pretending fries are shown.
Only genuinely dark background pixels are black-keyed. Nothing is upscaled.
"""
from __future__ import annotations

from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request, urlopen
import numpy as np
from PIL import Image,ImageOps

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"assets/fysen-image-candidates/cheeseburger/18713426"
SOURCE="https://images.pexels.com/photos/18713426/pexels-photo-18713426.jpeg"
SOURCE_SHA="ef35fee12f8adf8c34ac46c48dde19d6e57b714a1defd2a194fe7a2dc62dd198"
ORIGINAL_SIZE=(2185,3277)

request=Request(SOURCE,headers={"User-Agent":"FysenImageReview/1.0","Accept":"image/jpeg"})
with urlopen(request,timeout=50) as response:
    data=response.read(38*1024*1024+1)
assert sha256(data).hexdigest()==SOURCE_SHA,"Verified source changed"
with Image.open(BytesIO(data)) as raw:
    raw.load()
    img=ImageOps.exif_transpose(raw).convert("RGB")
assert img.size==ORIGINAL_SIZE
# Native-pixel crop preserves the whole burger, without stretching or
# hiding it behind a wooden table or generated black silhouette.
crop=img.crop((0,1450,2185,3250))
assert crop.size==(2185,1800)
arr=np.asarray(crop,dtype=np.uint8)
brightness=np.max(arr,axis=2).astype(np.float32)
# The source backdrop is nearly black. Key ONLY very dark background tones
# to true #000, with a gentle feather; food colors stay at native resolution.
alpha=np.clip((brightness-28.0)/30.0,0.0,1.0)
black=np.uint8(arr.astype(np.float32)*alpha[...,None])
# Remove the low floor reflection without touching the complete burger.
# A native-pixel opacity fade starts just below the bottom bun.
rows=np.arange(black.shape[0],dtype=np.float32)
floor_fade=np.clip((1650.0-rows)/110.0,0.0,1.0)
black=np.uint8(black.astype(np.float32)*floor_fade[:,None,None])
out=Image.fromarray(black,"RGB")
OUT.mkdir(parents=True,exist_ok=True)
master=OUT/"black-native-2185x1800.png"
out.save(master,optimize=True)
preview=out.copy()
preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
preview.save(OUT/"black-alt-preview.jpg",quality=91,optimize=True)
out.crop((385,220,1785,1620)).save(
    OUT/"black-alt-native-detail-1400.jpg",quality=93,optimize=True
)
review={
 "dish_id":"cheeseburger",
 "source_photo_id":18713426,
 "photographer":"Jonathan Borba / Pexels",
 "photoSource":"https://www.pexels.com/photo/cheeseburger-on-black-background-18713426/",
 "license":"https://www.pexels.com/license/",
 "source_size":list(ORIGINAL_SIZE),
 "source_sha256":SOURCE_SHA,
 "native_black_size":list(out.size),
 "native_black_sha256":sha256(master.read_bytes()).hexdigest(),
 "method":"native-pixel crop + low-light background black-key, no upscaling",
 "variant":"bacon cheeseburger with beef and melted cheese, no fries in this photo",
 "visual_review_completed":False,
 "approved_for_fysen":False,
 "published":False,
 "note":"Review whole burger in black background and actual sharp 1400px detail; don't claim french fries are depicted."
}
(OUT/"black-alt-review.json").write_text(json.dumps(review,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
print("Alternate 2185x1800 native bacon cheeseburger staged for review, SHA="+review["native_black_sha256"])
