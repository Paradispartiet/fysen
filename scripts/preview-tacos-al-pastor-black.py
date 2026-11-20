#!/usr/bin/env python3
"""Create *unapproved* black-background taco masking previews from a locked source.

Both masks are review proposals, not published assets. No synthetic food or upscale.
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

ROOT = Path("assets/fysen-image-candidates/tacos-al-pastor/abner-velazquez-pexels")
meta = json.loads((ROOT / "review.json").read_text(encoding="utf8"))
SOURCE_SHA = "51994dfd3a610dad3b904ca567a007bf46cebc64746fde619a0c82c67c59acc9"
assert meta["original_sha256"] == SOURCE_SHA
assert meta["photo_author"] == "Abner Velázquez / Pexels"
assert meta["source_verified"] and meta["no_upscale"]
assert meta["catalog_id"] == "tacos-al-pastor"
assert not meta["approved_for_fysen"] and not meta["published"]
request = Request(meta["photo_source_url"], headers={
    "User-Agent": "FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)",
    "Accept": "image/jpeg,image/*;q=0.8"})
with urlopen(request, timeout=90) as response:
    raw = response.read(45 * 1024 * 1024 + 1)
assert sha256(raw).hexdigest() == SOURCE_SHA, "Original changed"
with Image.open(BytesIO(raw)) as im:
    im.load()
    photo = ImageOps.exif_transpose(im).convert("RGB")
W, H = photo.size
assert (W, H) == (7008, 4672)
sw, sh = 1200, 800
small = np.asarray(photo.resize((sw, sh), Image.Resampling.LANCZOS))
# Outer shape encloses all three original corn tortillas, onion, cilantro and lime.
# Coordinates manually laid out on the 1000x667 source image; contours must be
# visually inspected for lost herbs, food and harsh edges before any promotion.
outline = np.array([
    (129,202),(144,157),(183,102),(228,63),(281,36),(336,31),
    (391,45),(445,62),(487,29),(540,20),(594,39),(652,60),
    (698,87),(733,132),(760,178),(787,228),(805,287),
    (796,333),(782,380),(799,429),(769,493),(722,539),
    (673,562),(611,581),(558,577),(508,556),(454,523),
    (410,496),(363,460),(311,434),(249,405),(204,365),
    (164,324),(140,265)
], dtype=np.float32)
outline[:, 0] *= sw / 1000
outline[:, 1] *= sh / 667
contour = np.zeros((sh, sw), np.uint8)
cv2.fillPoly(contour, [outline.astype(np.int32)], 255)
inner = cv2.erode(contour, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (43,43)))
outer = cv2.dilate(contour, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (47,47)))
classes = np.full((sh,sw), cv2.GC_BGD, np.uint8)
classes[outer>0] = cv2.GC_PR_BGD
classes[contour>0] = cv2.GC_PR_FGD
classes[inner>0] = cv2.GC_FGD
bg = np.zeros((1,65),np.float64)
fg = np.zeros((1,65),np.float64)
cv2.grabCut(cv2.cvtColor(small,cv2.COLOR_RGB2BGR),
            classes,None,bg,fg,7,cv2.GC_INIT_WITH_MASK)
grabcut = (np.isin(classes,(cv2.GC_FGD,cv2.GC_PR_FGD))*255).astype(np.uint8)
# The dark slate plate overlaps some probable foreground pixels. Remove only
# low-value, low-chroma blue/grey plate-like areas, retaining warm meat,
# golden tortillas, green herbs and lime. Review the result before approval.
rgb = small.astype(np.int16)
high = rgb.max(axis=2)
low = rgb.min(axis=2)
plate_like = ((high < 145) & ((high-low) < 46)
              & (rgb[:,:,2] >= rgb[:,:,0] - 9)
              & (rgb[:,:,1] >= rgb[:,:,0] - 9)
              & (rgb[:,:,2] >= rgb[:,:,1] - 22))
clean = grabcut.copy()
clean[plate_like] = 0
for label, mask in [("black-contour",contour),("black-grabcut",grabcut),
                    ("black-clean-grabcut",clean)]:
    # Preview is intentionally not a shippable asset.
    alpha = cv2.GaussianBlur(mask, (0,0), 1.1).astype(np.float32) / 255
    review = np.clip(small.astype(np.float32)*alpha[:,:,None],0,255).astype(np.uint8)
    preview = ROOT / f"{label}-preview.jpg"
    Image.fromarray(review, "RGB").save(preview,quality=93,optimize=True)
    # True native 1400x1400 crop: image detail stays from source, not preview.
    xa, ya = W//2-700, H//2-700
    native_detail = np.asarray(photo.crop((xa,ya,xa+1400,ya+1400)))
    xs,ys = np.meshgrid(np.arange(xa,xa+1400,dtype=np.float32)*sw/W,
                        np.arange(ya,ya+1400,dtype=np.float32)*sh/H)
    native_alpha = cv2.remap(mask,xs,ys,cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT)
    native_alpha = cv2.GaussianBlur(native_alpha, (0,0), 0.7).astype(np.float32)/255
    detail = np.clip(native_detail.astype(np.float32)*native_alpha[:,:,None],0,255).astype(np.uint8)
    Image.fromarray(detail,"RGB").save(ROOT/f"{label}-native-detail-1400.jpg",
                                     quality=94,optimize=True)
    print(f"{label}: mask coverage {(mask>127).mean():.4f}; preview SHA256 {sha256(preview.read_bytes()).hexdigest()}")
audit = dict(dish_id="tacos-al-pastor", source_original_sha256=SOURCE_SHA,
             source_native_dimensions=[W,H], source_page=meta["photo_page"],
             photo_credit=meta["photo_author"], license_url=meta["photo_license"],
             review_variants=["black-contour","black-grabcut","black-clean-grabcut"],
             no_upscale=True, generated_food_pixels=False,
             visual_review_completed=False, approved_for_fysen=False,
             published=False,
             warning="Source has no clearly visible pineapple and a partly clipped plate rim; inspect all tortillas, cilantro and lime at full size. Masked previews are NOT approved.")
(ROOT/"black-review.json").write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n", encoding="utf8")
print("TACOS: 2 unapproved masks staged; no gallery or manifest changes")
