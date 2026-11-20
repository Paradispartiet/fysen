#!/usr/bin/env python3
"""Stage real pizza marinara originals for editorial review; NEVER approve or publish."""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError
import json, time
from PIL import Image, ImageOps

OUT = Path("assets/fysen-image-candidates/pizza-marinara")
SOURCES = [
    {
        "slug": "napoli-ruthven-cc0",
        "download": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Pizza_marinara_%28Napoli%29.jpg",
        "page": "https://commons.wikimedia.org/wiki/File:Pizza_marinara_(Napoli).jpg",
        "author": "Ruthven / Wikimedia Commons",
        "license": "https://creativecommons.org/publicdomain/zero/1.0/",
        "expected_size": (6016, 4016),
        "preliminary_note": "Photo shows correct tomato, garlic and oregano; foreground crust approaches lower frame. Check that COMPLETE crust is visible before considering promotion.",
    },
    {
        "slug": "classic-van-den-bossche-by-sa",
        "download": "https://upload.wikimedia.org/wikipedia/commons/1/11/Pizza_marinara.jpg",
        "page": "https://commons.wikimedia.org/wiki/File:Pizza_marinara.jpg",
        "author": "Peter Van den Bossche / Wikimedia Commons",
        "license": "https://creativecommons.org/licenses/by-sa/2.0/",
        "expected_size": (2848, 2136),
        "preliminary_note": "Entire plain tomato-and-oregano pizza shown, but older photograph: check true native detail sharpness before approval. Modified derivative must preserve CC BY-SA terms.",
    },
]

def download(url: str) -> bytes:
    req = Request(url, headers={
        "User-Agent": "FysenEditorialReview/1.0 (https://github.com/Paradispartiet/fysen; public noncommercial source audit)",
        "Accept": "image/jpeg,image/*;q=0.8",
    })
    for attempt in range(3):
        try:
            with urlopen(req, timeout=50) as response:
                ctype = response.headers.get("Content-Type", "")
                payload = response.read(35 * 1024 * 1024 + 1)
            assert ctype.startswith("image/"), f"Unexpected Content-Type: {ctype}"
            assert 0 < len(payload) <= 35 * 1024 * 1024
            return payload
        except HTTPError as e:
            if e.code not in (429, 500, 502, 503, 504) or attempt == 2:
                raise
            time.sleep(4 * (attempt + 1))
    raise RuntimeError("Could not fetch source")

def stage(item: dict) -> None:
    raw = download(item["download"])
    with Image.open(BytesIO(raw)) as im:
        im.load()
        photo = ImageOps.exif_transpose(im).convert("RGB")
    w, h = photo.size
    assert (w, h) == item["expected_size"], f"Source unexpectedly changed: {w}x{h}"
    assert min(w, h) >= 1600
    target = OUT / item["slug"]
    target.mkdir(parents=True, exist_ok=True)
    (target / "source.jpeg").write_bytes(raw)
    thumb = photo.copy()
    thumb.thumbnail((1100, 1100), Image.Resampling.LANCZOS)
    thumb.save(target / "preview.jpg", quality=92, optimize=True)
    photo.crop((w // 2 - 700, h // 2 - 700, w // 2 + 700, h // 2 + 700)).save(
        target / "native-detail-1400.jpg", quality=93, optimize=True)
    metadata = {
        "dish_id": "pizza-marinara",
        "source_page": item["page"],
        "source_download_url": item["download"],
        "photographer": item["author"],
        "license_url": item["license"],
        "native_width": w,
        "native_height": h,
        "source_sha256": sha256(raw).hexdigest(),
        "native_pixels_upscaled": False,
        "source_download_verified": True,
        "visual_review_completed": False,
        "approved_for_fysen": False,
        "published": False,
        "preliminary_note": item["preliminary_note"],
        "quality_gate": "Traditional pizza marinara with tomato, garlic, oregano and oil. NO cheese, olives or other nontraditional toppings. Entire pizza/crust intact. Sharp at native 1400px detail. Preserve ALL real food pixels on black background with no generated additions. Reject if cutting the photographed pizza or incorrect food.",
    }
    (target / "review.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"STAGED {item['slug']} {w}x{h} sha256={metadata['source_sha256']}; NOT APPROVED")

if __name__ == "__main__":
    staged = 0
    for source in SOURCES:
        try:
            stage(source)
            staged += 1
        except Exception as error:
            print(f"SOURCE UNAVAILABLE/REJECTED {source['slug']}: {type(error).__name__}: {error}")
    assert staged >= 1, "No source originals fetched; do not approve or create photos"
    print(f"STAGED {staged} real-photo source candidates; no black output, no approval, no publication")
