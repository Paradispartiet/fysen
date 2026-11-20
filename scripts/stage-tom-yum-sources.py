#!/usr/bin/env python3
"""Fetch three licensed Tom yum goong photo sources for source-only review.

No background isolation, image approval, public asset, or production deploy.
The actual native photo is only a short-lived GitHub Actions artifact.
"""
from __future__ import annotations
import hashlib
import json
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageOps

ROOT = Path("assets/fysen-image-candidates/tom-yum")
MAX_BYTES = 40 * 1024 * 1024
SOURCES = [
    (34699476, "UNDO KIM", "Traditional Tom yum soup with shrimp on a decorative bowl"),
    (34699478, "UNDO KIM", "Tom yum goong soup with prawns, herbs and mushrooms"),
    (34699480, "UNDO KIM", "Thai Tom yum with shrimp, herbs and broth"),
]

def stage(photo_id: int, photographer: str, description: str) -> None:
    target = ROOT / str(photo_id)
    if (target / "review.json").exists():
        print("ALREADY_STAGED", photo_id)
        return
    url = f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
    req = Request(
        url,
        headers={"User-Agent": "FysenNativeFoodImageReview/1.0 (github.com/Paradispartiet/fysen)",
                 "Accept": "image/jpeg"},
    )
    with urlopen(req, timeout=60) as response:
        blob = response.read(MAX_BYTES + 1)
        content_type = response.headers.get("Content-Type", "").lower()
    assert content_type.startswith("image/"), f"Unrecognised MIME {content_type}"
    assert 100_000 < len(blob) <= MAX_BYTES, f"Unsafe source size {len(blob)}"
    with Image.open(BytesIO(blob)) as original:
        original.load()
        image = ImageOps.exif_transpose(original).convert("RGB")
    width, height = image.size
    assert min(width, height) >= 1600, f"Not enough real native pixels: {image.size}"
    target.mkdir(parents=True, exist_ok=True)
    (target / "source.jpeg").write_bytes(blob)
    preview = image.copy()
    preview.thumbnail((1100, 1100), Image.Resampling.LANCZOS)
    preview.save(target / "preview.jpg", quality=90, optimize=True)
    cx, cy = width // 2, height // 2
    image.crop((cx-700, cy-700, cx+700, cy+700)).save(
        target / "native-detail-1400.jpg", quality=92, optimize=True
    )
    metadata = {
        "dish_id": "tom-yum",
        "source_photo_id": photo_id,
        "photographer": photographer,
        "description": description,
        "photo_page": f"https://www.pexels.com/photo/{photo_id}/",
        "original_url": url,
        "license": "https://www.pexels.com/license/",
        "original_dimensions": [width, height],
        "original_sha256": hashlib.sha256(blob).hexdigest(),
        "photo_is_representative": True,
        "visual_review_completed": False,
        "approved_for_fysen": False,
        "published": False,
        "required_checks": [
            "whole shrimp soup bowl visible, real prawns/mushrooms/lemongrass identifiable",
            "native 1:1 focus and food texture, no AI pixels or upscaling",
            "clean matte black background and complete bowl edge after masking",
            "independent 512px thumbnail and >=1600px original only after explicit approval",
            "no assertion that this is the serving of a Fysen-listed restaurant"
        ]
    }
    (target / "review.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print("STAGED", photo_id, width, height, metadata["original_sha256"], "NOT APPROVED")

if __name__ == "__main__":
    valid = 0
    for item in SOURCES:
        try:
            stage(*item)
            valid += 1
        except Exception as error:
            print("REJECTED", item[0], type(error).__name__, str(error)[:250])
    if valid < 2:
        raise SystemExit(f"Need 2 authentic Tom yum candidates; got {valid}")
    print(f"{valid} source photos staged only for manual visual review; no publication")
