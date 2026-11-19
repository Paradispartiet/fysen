#!/usr/bin/env python3
"""Make a review-only black-background pizza from a verified native Pexels photo.

The original food pixels are never upscaled. Segmentation is done at preview size
and only the mask is enlarged. No Fysen public files are changed by this tool.
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

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets/fysen-image-candidates/pizza-margherita/31136887"
PHOTO_ID = 31136887
EXPECTED_SOURCE_SHA = "15e2da86648369d75eab1814524e2967b39bbe8ffb9588a53b9a3bfd15461eed"
EXPECTED_SOURCE_SIZE = (5346, 3840)
SOURCE_URL = "https://images.pexels.com/photos/31136887/pexels-photo-31136887.jpeg"

request = Request(SOURCE_URL, headers={
    "User-Agent": "FysenEditorialImageReview/1.0 (https://github.com/Paradispartiet/fysen)",
    "Accept": "image/jpeg",
})
with urlopen(request, timeout=50) as response:
    src_bytes = response.read(35 * 1024 * 1024 + 1)
assert sha256(src_bytes).hexdigest() == EXPECTED_SOURCE_SHA, "Source changed since Pexels review"
with Image.open(BytesIO(src_bytes)) as raw:
    raw.load()
    source = ImageOps.exif_transpose(raw).convert("RGB")
assert source.size == EXPECTED_SOURCE_SIZE, f"Unexpected original resolution {source.size}"

width, height = source.size
review_width = 1100
review_height = int(round(height * review_width / width))
small = np.array(source.resize((review_width, review_height), Image.Resampling.LANCZOS))
yy, xx = np.ogrid[:review_height, :review_width]
center_x, center_y = 0.500 * review_width, 0.537 * review_height
radius_x, radius_y = 0.257 * review_width, 0.347 * review_height
radial = np.sqrt(((xx - center_x) / radius_x) ** 2 +
                 ((yy - center_y) / radius_y) ** 2)

# Three concentric regions constrain GrabCut to the pizza and exclude marble,
# parchment paper and the wooden peel. The segmentation remains review-only.
mask = np.where(radial > 1.07, cv2.GC_BGD, cv2.GC_PR_BGD).astype(np.uint8)
mask[radial < 1.04] = cv2.GC_PR_FGD
mask[radial < 0.82] = cv2.GC_FGD
bg_model = np.zeros((1, 65), dtype=np.float64)
fg_model = np.zeros((1, 65), dtype=np.float64)
cv2.grabCut(cv2.cvtColor(small, cv2.COLOR_RGB2BGR), mask, None,
            bg_model, fg_model, 6, cv2.GC_INIT_WITH_MASK)
selected = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
selected[radial > 1.055] = 0
n_components, component_labels, stats, _ = cv2.connectedComponentsWithStats(selected, connectivity=8)
if n_components < 2:
    raise RuntimeError("No isolated pizza foreground")
largest = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
selected = np.uint8(component_labels == largest) * 255
# Fill small holes within the pizza while retaining a natural outer silhouette.
contours, _ = cv2.findContours(selected, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
filled = np.zeros_like(selected)
cv2.drawContours(filled, contours, -1, 255, thickness=cv2.FILLED)
filled = cv2.GaussianBlur(filled, (3, 3), 0.6)

# Upscale ONLY the segmentation alpha. Original native food pixels are preserved.
alpha = Image.fromarray(filled, "L").resize((width, height), Image.Resampling.BILINEAR)
raw_pixels = np.array(source)
alpha_pixels = np.asarray(alpha, dtype=np.uint8)
black_pixels = (raw_pixels.astype(np.uint16) * alpha_pixels[..., None].astype(np.uint16) // 255).astype(np.uint8)
black = Image.fromarray(black_pixels, "RGB")

# True 3000x3000 source pixel crop with comfortable black space around the whole pizza.
center_native_x = int(0.5 * width)
center_native_y = int(0.537 * height)
size = 3000
left = center_native_x - size // 2
top = center_native_y - size // 2
master = black.crop((left, top, left + size, top + size))
assert master.size == (3000, 3000)

OUT.mkdir(parents=True, exist_ok=True)
master_path = OUT / "black-native-master-3000.png"
master.save(master_path, optimize=True)
preview = master.resize((1000, 1000), Image.Resampling.LANCZOS)
preview.save(OUT / "black-preview.jpg", quality=92, optimize=True)
detail = master.crop((800, 800, 2200, 2200))
detail.save(OUT / "black-native-detail-1400.jpg", quality=92, optimize=True)

metadata = {
    "dish_id": "pizza-margherita",
    "photo_id": PHOTO_ID,
    "original_source_sha256": EXPECTED_SOURCE_SHA,
    "original_source_size": list(EXPECTED_SOURCE_SIZE),
    "processed_native_size": [3000, 3000],
    "processed_native_sha256": sha256(master_path.read_bytes()).hexdigest(),
    "method": "native-pixel black-background segmentation; resized only mask; no photo upscale",
    "source_page": "https://www.pexels.com/photo/delicious-margherita-pizza-with-fresh-basil-31136887/",
    "photographer": "KI Lee",
    "license": "https://www.pexels.com/license/",
    "visual_review_completed": False,
    "approved_for_fysen": False,
    "published": False,
    "review_required": "Inspect entire black-background silhouette, native 1400px detail and food variant on iPad/mobile; fix edge artifacts before promotion",
}
(OUT / "black-review.json").write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf8")
print(f"CREATED REVIEW-ONLY PIZZA: 3000x3000 native pixels, SHA {metadata['processed_native_sha256']}")
