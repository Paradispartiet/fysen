#!/usr/bin/env python3
"""Stage licensed margherita-pizza photograph candidates at native resolution.

This does not publish a photo or mark it sharp enough for full-size display.
The required human visual review takes place before any promotion.
"""
from __future__ import annotations

from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "fysen-image-candidates" / "pizza-margherita"
MAX_BYTES = 35 * 1024 * 1024
MIN_NATIVE_EDGE = 3000
PHOTOS = [
    (19102880, "Rene Strgar",
     "https://www.pexels.com/photo/cut-margherita-pizza-19102880/"),
    (35068608, "Rene Strgar",
     "https://www.pexels.com/photo/classic-margherita-pizza-on-marble-surface-35068608/"),
    (31136887, "KI Lee",
     "https://www.pexels.com/photo/delicious-margherita-pizza-with-fresh-basil-31136887/"),
]


def stage(photo_id: int, credit: str, source_page: str) -> None:
    folder = OUT / str(photo_id)
    metadata = folder / "review.json"
    if metadata.exists():
        previous = json.loads(metadata.read_text(encoding="utf-8"))
        if previous.get("photo_id") == photo_id and previous.get("source_verified"):
            print(f"Already staged photo {photo_id}")
            return
        raise RuntimeError(f"Conflicting existing review: {metadata}")

    url = f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
    request = Request(url, headers={
        "User-Agent": "FysenEditorialImageReview/1.0 (https://github.com/Paradispartiet/fysen)",
        "Accept": "image/jpeg",
    })
    with urlopen(request, timeout=50) as response:
        content_type = response.headers.get("Content-Type", "").lower()
        if not content_type.startswith("image/"):
            raise ValueError(f"Invalid content type: {content_type}")
        source = response.read(MAX_BYTES + 1)

    if len(source) > MAX_BYTES or not source.startswith(bytes.fromhex("ffd8ff")):
        raise ValueError("Invalid/oversized JPEG source")
    with Image.open(BytesIO(source)) as raw:
        raw.load()
        photo = ImageOps.exif_transpose(raw).convert("RGB")
    width, height = photo.size
    if min(width, height) < MIN_NATIVE_EDGE:
        raise ValueError(f"Insufficient original pixels: {width}x{height}")

    folder.mkdir(parents=True, exist_ok=False)
    # Original source is only placed in the short-lived CI artifact, not app/public.
    (folder / "source.jpeg").write_bytes(source)
    overview = photo.copy()
    overview.thumbnail((1100, 1100), Image.Resampling.LANCZOS)
    overview.save(folder / "preview.jpg", quality=88, optimize=True)

    # A real 1400x1400 source-pixel crop: never upscaled or artificially sharpened.
    cx, cy = width // 2, height // 2
    detail = photo.crop((cx - 700, cy - 700, cx + 700, cy + 700))
    detail.save(folder / "native-detail-1400.jpg", quality=92, optimize=True)

    result = {
        "dish_id": "pizza-margherita",
        "photo_id": photo_id,
        "photographer": credit,
        "source_page": source_page,
        "photo_url": url,
        "license": "Pexels License",
        "license_url": "https://www.pexels.com/license/",
        "source_original_width": width,
        "source_original_height": height,
        "source_sha256": sha256(source).hexdigest(),
        "source_verified": True,
        "visual_review_completed": False,
        "approved_for_fysen": False,
        "published": False,
        "criteria": [
            "one whole margherita pizza with tomato, mozzarella and basil",
            "crisp natural detail at native 1:1 pixels; no fake enlargement",
            "single isolated dish; background can be cleanly made pure black",
            "no extra topping that changes the dish variant",
            "separate AVIF thumbnail and master after approval",
        ],
        "note": "Editorial candidate, not a specific restaurant's serving. Do not activate largeViewEnabled or publish before individual full-size visual review.",
    }
    metadata.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n",
                        encoding="utf-8")
    print(f"STAGED pizza candidate {photo_id} {width}x{height} SHA={result['source_sha256']} NOT APPROVED")


def main() -> None:
    count = 0
    for photo_id, credit, page in PHOTOS:
        try:
            stage(photo_id, credit, page)
            count += 1
        except Exception as exc:
            print(f"CANDIDATE REJECTED {photo_id}: {type(exc).__name__}: {exc}")
    if not count:
        raise SystemExit("No usable original photograph candidates")
    print(f"{count}/{len(PHOTOS)} staged for manual source/detail review. App images remain unchanged.")


if __name__ == "__main__":
    main()
