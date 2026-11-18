#!/usr/bin/env python3
"""Stage licensed high-resolution food photos for editorial review, without Runway.

Never writes to apps/web/public or silently approves the image.
A photo must pass visual review before integration into Fysen.
"""
from __future__ import annotations

import hashlib
import io
import json
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image
import pillow_avif  # noqa: F401 -- register AVIF codec

ROOT = Path(__file__).resolve().parents[1]
SOURCE = {
    "dish_id": "sushi",
    "photo_id": 36292343,
    "original_url": "https://images.pexels.com/photos/36292343/pexels-photo-36292343.jpeg",
    "source_page": "https://www.pexels.com/photo/delicious-assorted-sushi-platter-on-black-background-36292343/",
    "photographer": "Mony Cruz",
    "license": "Pexels License",
    "license_url": "https://www.pexels.com/legal-pages/license/",
    "advertised_native_size": [3000, 3000],
}
DISH = SOURCE["dish_id"]
OUTPUT = ROOT / "assets" / "fysen-image-candidates" / DISH
MAX_BYTES = 30 * 1024 * 1024

def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def main() -> None:
    req = Request(SOURCE["original_url"], headers={
        "User-Agent": "FysenEditorialImageReview/1.0 (https://github.com/Paradispartiet/fysen)",
        "Accept": "image/jpeg,image/*;q=0.9",
    })
    with urlopen(req, timeout=35) as response:
        content_type = response.headers.get("Content-Type", "")
        if not content_type.lower().startswith("image/"):
            raise RuntimeError(f"Expected image content, received {content_type}")
        blob = response.read(MAX_BYTES + 1)
    if len(blob) > MAX_BYTES:
        raise RuntimeError("Source exceeds 30 MB limit")
    if not blob.startswith(bytes.fromhex("ffd8ff")):
        raise RuntimeError("Invalid JPEG header")

    original = Image.open(io.BytesIO(blob))
    original.load()
    original = original.convert("RGB")
    width, height = original.size
    if width < 1600 or height < 1600:
        raise RuntimeError(f"Under-sized original {width}x{height}; required >= 1600x1600")
    if [width, height] != SOURCE["advertised_native_size"]:
        raise RuntimeError(f"Source size differs from licensed page: {width}x{height}")

    # Avoid mislabeled 'black background' images in source collection.
    sample_points = [(5,5),(width-6,5),(5,height-6),(width-6,height-6)]
    corners = [original.getpixel(point) for point in sample_points]
    median_brightness = sorted(sum(rgb) / 3 for rgb in corners)[len(corners)//2]
    if median_brightness > 68:
        raise RuntimeError(f"Background needs review; corner median brightness={median_brightness:.1f}")

    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / "source.jpeg").write_bytes(blob)
    # Convert without spatial enlargement. PNG retained for Fysen native
    # pixel provenance; AVIF is transport only.
    buffer = io.BytesIO()
    original.save(buffer, format="PNG", optimize=True)
    png = buffer.getvalue()
    (OUTPUT / f"{DISH}.png").write_bytes(png)
    original.save(OUTPUT / f"{DISH}-master-{width}.avif", format="AVIF", quality=88)
    original.thumbnail((256,256), Image.Resampling.LANCZOS)
    original.save(OUTPUT / f"{DISH}-thumb-256.avif", format="AVIF", quality=83)

    manifest = {
        **SOURCE,
        "actual_native_size": [width, height],
        "original_jpeg_sha256": sha256(blob),
        "retained_png_sha256": sha256(png),
        "file_names": [
            "source.jpeg", f"{DISH}.png", f"{DISH}-master-{width}.avif", f"{DISH}-thumb-256.avif"
        ],
        "source_verified": True,
        "visual_review_completed": False,
        "approved_for_fysen": False,
        "published": False,
        "notice": "Generic editorial dish photograph, not an individual restaurant's serving.",
    }
    (OUTPUT / "review.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+"\n")
    print(f"STAGED {DISH}: {width}x{height}; originals and AVIFs retained; NOT APPROVED / NOT PUBLISHED")

if __name__ == "__main__":
    main()
