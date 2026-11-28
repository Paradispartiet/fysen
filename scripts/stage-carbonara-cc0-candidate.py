#!/usr/bin/env python3
"""Prepare an unapproved photo cutout for visual inspection only."""
import hashlib
import io
import json
import urllib.request
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

SOURCE = "https://pd.w.org/2025/01/480677d1272174f53.55239039-scaled.jpg"
PAGE = "https://wordpress.org/photos/photo/480677d127/"
OUT = Path("assets/fysen-image-candidates/pasta-carbonara-cc0")
OUT.mkdir(parents=True, exist_ok=True)

request = urllib.request.Request(SOURCE, headers={"User-Agent": "Fysen editorial photo review/1.0"})
with urllib.request.urlopen(request, timeout=60) as response:
    data = response.read(12 * 1024 * 1024)
raw = Image.open(io.BytesIO(data)).convert("RGB")
assert raw.size == (3200, 2133), raw.size
(OUT / "source.jpeg").write_bytes(data)

# Hand-guided boundary from the inspected source at a 1000x667 reference
# scale. GrabCut refines the boundary, not the food pixels. This is a
# candidate mask, not evidence of completed visual approval.
outline = [(176,333),(194,297),(193,276),(216,262),(263,248),(252,232),
           (274,215),(291,210),(280,186),(314,174),(336,160),(373,144),
           (419,145),(457,130),(497,128),(539,120),(563,120),(583,142),
           (608,145),(630,159),(654,155),(678,169),(710,190),(728,203),
           (758,208),(782,224),(789,242),(812,258),(821,282),(827,305),
           (843,331),(828,354),(829,379),(835,398),(806,428),(789,455),
           (761,477),(727,493),(690,510),(654,522),(618,539),(580,547),
           (544,540),(507,535),(468,527),(436,518),(406,521),(371,507),
           (337,493),(310,480),(287,465),(269,450),(249,428),(230,410),
           (230,389),(247,366),(245,352),(223,338)]
small = np.asarray(raw.resize((1000, 667), Image.Resampling.LANCZOS))
region = np.zeros((667, 1000), np.uint8)
cv2.fillPoly(region, [np.asarray(outline, dtype=np.int32)], 255)
outer = cv2.dilate(region, np.ones((25, 25), np.uint8))
inner = cv2.erode(region, np.ones((29, 29), np.uint8))
mask = np.full(region.shape, cv2.GC_BGD, np.uint8)
mask[outer > 0] = cv2.GC_PR_BGD
mask[region > 0] = cv2.GC_PR_FGD
mask[inner > 0] = cv2.GC_FGD
cv2.setRNGSeed(42)
cv2.grabCut(cv2.cvtColor(small, cv2.COLOR_RGB2BGR), mask, None,
            np.zeros((1,65),np.float64), np.zeros((1,65),np.float64), 5,
            cv2.GC_INIT_WITH_MASK)
alpha = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
alpha = Image.fromarray(alpha).resize(raw.size, Image.Resampling.BILINEAR)
# Keep a native-pixel canvas; no generated or retouched food, no upscaling.
isolated = Image.new("RGB", raw.size, "black")
isolated.paste(raw, (0,0), alpha)
# Crop only excess empty canvas, keeping the entire segmented region.
bounds = alpha.getbbox()
assert bounds
crop = (max(0,bounds[0]-120), max(0,bounds[1]-120),
        min(raw.width,bounds[2]+120), min(raw.height,bounds[3]+120))
# Keep at least 1600 native pixels in each dimension.
if crop[3]-crop[1] < 1600:
    center = (crop[1]+crop[3])//2
    top = max(0,min(raw.height-1600,center-800))
    crop = (crop[0],top,crop[2],top+1600)
isolated = isolated.crop(crop)
assert min(isolated.size) >= 1600, isolated.size
assert isolated.getpixel((0,0)) == (0,0,0)
isolated.save(OUT / "candidate.png", optimize=True)
isolated.save(OUT / "candidate.avif", quality=88)
thumb = isolated.copy()
thumb.thumbnail((512,512), Image.Resampling.LANCZOS)
square = Image.new("RGB",(512,512),"black")
square.paste(thumb,((512-thumb.width)//2,(512-thumb.height)//2))
square.save(OUT / "candidate-thumb-512.avif",quality=84)
alpha.save(OUT / "mask.png")
review = {
    "dish_id":"pasta-carbonara", "source_page":PAGE, "original_url":SOURCE,
    "photographer":"Nilo Velez", "license":"CC0",
    "license_url":"https://creativecommons.org/publicdomain/zero/1.0/",
    "actual_native_size":list(raw.size), "candidate_size":list(isolated.size),
    "source_sha256":hashlib.sha256(data).hexdigest(), "crop":list(crop),
    "processing":"Hand-guided GrabCut segmentation, black background, native pixel crop",
    "source_verified":True, "visual_review_completed":False,
    "approved_for_fysen":False, "published":False
}
(OUT/"review.json").write_text(json.dumps(review,indent=2)+"\n")
print(json.dumps(review,indent=2))
