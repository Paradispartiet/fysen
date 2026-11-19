#!/usr/bin/env python3
"""Promote reviewed native high-res ramen on pure black; no Runway or pixel upscaling."""
from __future__ import annotations
import hashlib, io, json, subprocess, tempfile
from pathlib import Path
from PIL import Image, ImageDraw
import numpy as np
import cv2
import pillow_avif  # noqa: F401

ROOT = Path(__file__).resolve().parents[1]
DISH = "ramen"
PHOTO_ID = 35773142
SOURCE_DIR = ROOT / "assets/fysen-image-candidates/ramen-alternatives" / str(PHOTO_ID)
PUBLIC = ROOT / "apps/web/public/dish-images"
MANIFEST = PUBLIC / "manifest.json"
SOURCE_SHA = "4ff72f7137e0a5027e89b7f9dd583de76728738034fdd677152986eacf40be50"
NATIVE_SIZE = (7364, 4909)

# Carefully traced outline of the ramen bowl and nori, in 1100px source space.
# The surrounding table/chairs are never promoted to the black-background photo.
OUTLINE = [(445,39),(487,62),(531,115),(559,72),(589,91),(636,150),
           (698,203),(780,268),(829,220),(897,226),(966,272),(1005,316),
           (1035,381),(1034,445),(1012,505),(958,569),(872,629),(769,667),
           (639,695),(500,706),(371,687),(241,655),(151,606),(89,540),
           (51,465),(45,396),(57,331),(91,267),(142,217),(209,190),
           (283,182),(320,195),(338,193),(362,160),(410,83)]

def sha256(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()

def isolate_on_black(original: Image.Image) -> Image.Image:
    thumb = original.copy()
    thumb.thumbnail((1100, 900), Image.Resampling.LANCZOS)
    w, h = thumb.size
    assert (w, h) == (1100, 733), "Source geometry changed, manual alpha needs fresh review"
    rough = np.zeros((h, w), np.uint8)
    cv2.fillPoly(rough, [np.array(OUTLINE, np.int32)], 255)
    inner_distance = cv2.distanceTransform(rough, cv2.DIST_L2, cv2.DIST_MASK_PRECISE)
    pixels = np.asarray(thumb).astype(np.int16)
    red, green, blue = pixels[:,:,0], pixels[:,:,1], pixels[:,:,2]
    low = pixels.min(axis=2)
    high = pixels.max(axis=2)
    y, x = np.indices((h, w))
    # Near the outline, retain the actual white ceramic bowl but reject
    # brown furniture and pale fence fragments behind the nori.
    white_bowl = ((low > 145) & ((high - low) < 29)) | (low > 238)
    white_bowl &= ~((y < 240) & (x > 315) & (x < 810))
    seaweed = ((y < 310) & (x > 260) & (x < 840)
               & (blue < 143) & ((green-blue) > 22) & ((red-blue) > 25))
    accepted = (rough > 0) & ((inner_distance > 38) | white_bowl | seaweed)
    alpha = accepted.astype(np.uint8) * 255
    alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, np.ones((5,5),np.uint8))
    alpha = cv2.GaussianBlur(alpha, (0,0), 1.8)
    # Only alpha is scaled, the 7364×4909 source pixels are never upscaled.
    matte = Image.fromarray(alpha, "L").resize(original.size, Image.Resampling.BICUBIC)
    black = Image.new("RGB", original.size, (0, 0, 0))
    black.paste(original, (0, 0), matte)
    assert black.getpixel((0,0)) == (0,0,0)
    return black

def main() -> None:
    source = (SOURCE_DIR / "source.jpeg").read_bytes()
    assert sha256(source) == SOURCE_SHA, "Licenced source JPEG changed"
    metadata = json.loads((SOURCE_DIR / "review.json").read_text(encoding="utf8"))
    assert metadata["source_verified"] is True
    assert metadata["photo_id"] == PHOTO_ID
    assert metadata["actual_native_size"] == list(NATIVE_SIZE)
    review = (SOURCE_DIR / "approval.md").read_text(encoding="utf8")
    for evidence in (SOURCE_SHA, "Reviewed for full-size display: yes",
                     "No collage crop or upscale: yes",
                     "Correct dish and black background: yes"):
        assert evidence in review, "Missing reviewed evidence: " + evidence
    with Image.open(io.BytesIO(source)) as raw:
        raw.load()
        assert raw.size == NATIVE_SIZE
        original = raw.convert("RGB")
    result = isolate_on_black(original)
    assert result.size == NATIVE_SIZE
    manifest = json.loads(MANIFEST.read_text(encoding="utf8"))
    entry = next(image for image in manifest["images"] if image["id"] == DISH)
    assert not entry.get("largeSource"), "Ramen already has an approved master"
    with tempfile.TemporaryDirectory(prefix="fysen-ramen-photo-") as work:
        target = Path(work)
        png = target / "ramen.png"
        avif = target / "ramen-master-7364.avif"
        review_file = target / "ramen-review.md"
        result.save(png, format="PNG", optimize=True)
        result.save(avif, format="AVIF", quality=88)
        review_file.write_text(
            review + "\nActual native PNG SHA-256: " + sha256(png.read_bytes()) + "\n",
            encoding="utf8"
        )
        subprocess.run(["node", "scripts/import-dish-large-master.mjs", DISH,
                        str(png), str(avif), str(review_file), "independent-original"],
                       cwd=ROOT, check=True)
        # Square mini preview: crop source pixels, downsample only, black background.
        side = NATIVE_SIZE[1]
        left = (NATIVE_SIZE[0] - side) // 2
        square = result.crop((left,0,left+side,side))
        square.thumbnail((512,512), Image.Resampling.LANCZOS)
        assert square.size == (512,512)
        square.save(PUBLIC / "ramen-thumb-512.avif", format="AVIF", quality=84)
        preview = result.copy()
        preview.thumbnail((1100,850), Image.Resampling.LANCZOS)
        preview.save(SOURCE_DIR / "reviewed-black-preview.jpg", quality=88)
    manifest = json.loads(MANIFEST.read_text(encoding="utf8"))
    entry = next(image for image in manifest["images"] if image["id"] == DISH)
    entry.update({
        "atlas": "ramen-thumb-512.avif",
        "kind": "Redaksjonelt rettfoto",
        "largeViewEnabled": True,
        "photoCredit": "Connor Scott McManus / Pexels",
        "photoSource": metadata["source_page"],
        "photoLicense": metadata["license_url"],
        "variantCaution": (
            "Representativt redaksjonelt foto av ramen med chashu-svin,"
            " egg, nori, vårløk og kraft på helsvart bakgrunn. Ikke restaurantfoto."
        ),
    })
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+"\n",encoding="utf8")
    print("PROMOTED RAMEN: 7364x4909 original, 512px thumbnail, strict source review; NO UPSCALE")

if __name__ == "__main__":
    main()
