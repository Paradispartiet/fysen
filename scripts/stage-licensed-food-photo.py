#!/usr/bin/env python3
"""Stage externally licensed native high-resolution photos for Fysen review.

No Runway, no large-view approval by metadata alone, and no public deployment.
"""
from __future__ import annotations

import hashlib
import io
import json
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image
import pillow_avif  # noqa: F401 -- registers AVIF codec

ROOT = Path(__file__).resolve().parents[1]
SOURCES = [
    {
        "dish_id": "sushi",
        "photo_id": 36292343,
        "source_page": "https://www.pexels.com/photo/delicious-assorted-sushi-platter-on-black-background-36292343/",
        "photographer": "Mony Cruz",
        "expected_native_size": [3000, 3000],
        "variant_note": "Representative assorted sushi; verify nigiri and maki in review.",
    },
    {
        "dish_id": "ramen",
        "photo_id": 19555232,
        "source_page": "https://www.pexels.com/photo/bowl-of-soup-19555232/",
        "photographer": "Su La Pyae",
        "expected_native_size": None,
        "variant_note": "Ramen with pork, egg, and scallions; verify non-vegetarian variant.",
    },
    {
        "dish_id": "pasta-carbonara",
        "photo_id": 12116165,
        "source_page": "https://www.pexels.com/photo/spaghetti-carbonara-on-plate-12116165/",
        "original_url": "https://images.pexels.com/photos/12116165/pexels-photo-12116165.png?cs=srgb&fm=jpg",
        "photographer": "Froimar Andrea Rodriguez",
        "expected_native_size": None,
        "variant_note": "Pasta carbonara with bacon and cheese; verify before publishing.",
    },
]
LICENSE = "Pexels License"
LICENSE_URL = "https://www.pexels.com/legal-pages/license/"
MAX_BYTES = 30 * 1024 * 1024

def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def stage(source: dict) -> bool:
    dish_id = source["dish_id"]
    output = ROOT / "assets" / "fysen-image-candidates" / dish_id
    if (output / "review.json").exists():
        existing = json.loads((output / "review.json").read_text())
        if existing.get("photo_id") == source["photo_id"] and existing.get("source_verified"):
            print(f"EXISTING {dish_id}: previously staged, not overwriting")
            return True
        raise RuntimeError(f"{dish_id}: existing candidate differs; manual review is required")

    photo_id = source["photo_id"]
    image_url = source.get("original_url") or f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
    request = Request(image_url, headers={
        "User-Agent": "FysenEditorialImageReview/1.0 (https://github.com/Paradispartiet/fysen)",
        "Accept": "image/jpeg,image/*;q=0.9",
    })
    with urlopen(request, timeout=35) as response:
        content_type = response.headers.get("Content-Type", "")
        if not content_type.lower().startswith("image/"):
            raise RuntimeError(f"{dish_id}: expected image, got {content_type}")
        blob = response.read(MAX_BYTES + 1)
    if len(blob) > MAX_BYTES:
        raise RuntimeError(f"{dish_id}: source exceeds 30 MB")
    if blob.startswith(bytes.fromhex("ffd8ff")):
        source_name = "source.jpeg"
    elif blob.startswith(bytes.fromhex("89504e470d0a1a0a")):
        source_name = "source.png"
    else:
        raise RuntimeError(f"{dish_id}: invalid JPEG/PNG bytes")

    original = Image.open(io.BytesIO(blob))
    original.load()
    original = original.convert("RGB")
    width, height = original.size
    if width < 1600 or height < 1600:
        raise RuntimeError(f"{dish_id}: source {width}x{height} below 1600x1600 minimum")
    expected = source["expected_native_size"]
    if expected and [width, height] != expected:
        raise RuntimeError(f"{dish_id}: {width}x{height} does not match licensed page {expected}")

    points = [(5,5),(width-6,5),(5,height-6),(width-6,height-6)]
    corners = [original.getpixel(point) for point in points]
    corner_median = sorted(sum(rgb) / 3 for rgb in corners)[len(corners)//2]
    if corner_median > 68:
        raise RuntimeError(f"{dish_id}: corners not sufficiently dark ({corner_median:.1f}); review source")

    output.mkdir(parents=True, exist_ok=True)
    (output / source_name).write_bytes(blob)
    png_buffer = io.BytesIO()
    original.save(png_buffer, format="PNG", optimize=True)
    png = png_buffer.getvalue()
    (output / f"{dish_id}.png").write_bytes(png)
    original.save(output / f"{dish_id}-master-{width}.avif", format="AVIF", quality=88)
    original.thumbnail((256,256), Image.Resampling.LANCZOS)
    original.save(output / f"{dish_id}-thumb-256.avif", format="AVIF", quality=83)

    metadata = {
        **source,
        "original_url": image_url,
        "license": LICENSE,
        "license_url": LICENSE_URL,
        "actual_native_size": [width, height],
        "original_source_sha256": sha256(blob),
        "retained_png_sha256": sha256(png),
        "file_names": [
            source_name, f"{dish_id}.png",
            f"{dish_id}-master-{width}.avif", f"{dish_id}-thumb-256.avif"
        ],
        "source_verified": True,
        "visual_review_completed": False,
        "approved_for_fysen": False,
        "published": False,
        "notice": "Representative editorial dish photo, not any named restaurant's serving.",
    }
    (output / "review.json").write_text(json.dumps(metadata, ensure_ascii=False, indent=2)+"\n")
    print(f"STAGED {dish_id}: {width}x{height}; not approved / not published")
    return True

if __name__ == "__main__":
    successful = 0
    for source in SOURCES:
        try:
            if stage(source):
                successful += 1
        except Exception as exc:
            print(f"UNAPPROVED {source['dish_id']}: {type(exc).__name__}: {exc}")
    if not successful:
        raise SystemExit("No qualified candidates staged")
    print(f"Staged or retained {successful}/{len(SOURCES)} candidates; none are approved automatically.")
