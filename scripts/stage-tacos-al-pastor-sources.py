#!/usr/bin/env python3
"""Stage verified authentic tacos al pastor photos for editorial review only.

Produces small inspection previews and hashes. No public images or approvals change.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError
import json
import time
from PIL import Image, ImageOps

OUT = Path("assets/fysen-image-candidates/tacos-al-pastor")
SOURCES = [
    dict(slug="abner-velazquez-pexels", photo_id=34289264, size=(7008, 4672),
         author="Abner Velázquez / Pexels",
         page="https://www.pexels.com/photo/delicious-tacos-al-pastor-with-fresh-garnish-34289264/",
         notes="Three tacos, onion, coriander and lime on dark plate. Pineapple is not visibly identifiable; plate rim partly out of frame."),
    dict(slug="davis-arenas-pexels", photo_id=14006131, size=(2102, 3552),
         author="Davis Arenas / Pexels",
         page="https://www.pexels.com/photo/tacos-al-pastor-on-paper-plate-14006131/",
         notes="Five tacos with pineapple and coriander on patterned plate; check whether tacos are all the same filling."),
    dict(slug="cesar-oneill-pexels", photo_id=39545213, size=(4000, 5185),
         author="César O'neill / Pexels",
         page="https://www.pexels.com/photo/39545213/",
         notes="One taco with pineapple; visible branding on plate liner must be excluded to avoid implied commercial affiliation."),
]

def fetch(url):
    req = Request(url, headers={
        "User-Agent": "FysenEditorialPhotoReview/1.0 (https://github.com/Paradispartiet/fysen)",
        "Accept": "image/jpeg,image/*;q=0.8"
    })
    for attempt in range(3):
        try:
            with urlopen(req, timeout=75) as res:
                mime = res.headers.get("Content-Type", "")
                raw = res.read(45 * 1024 * 1024 + 1)
            assert mime.startswith("image/"), f"Not an image: {mime}"
            assert 0 < len(raw) <= 45 * 1024 * 1024
            return raw
        except HTTPError as err:
            if attempt == 2 or err.code not in (429, 500, 502, 503, 504):
                raise
            time.sleep((attempt + 1) * 4)
    raise RuntimeError("Photo fetch failed")

def stage(entry):
    i = entry["photo_id"]
    url = f"https://images.pexels.com/photos/{i}/pexels-photo-{i}.jpeg"
    raw = fetch(url)
    with Image.open(BytesIO(raw)) as source:
        source.load()
        photo = ImageOps.exif_transpose(source).convert("RGB")
    w, h = photo.size
    assert (w, h) == entry["size"], f"Dimension mismatch: {(w, h)}, expected {entry['size']}"
    assert min(w, h) >= 1600
    root = OUT / entry["slug"]
    root.mkdir(parents=True, exist_ok=True)
    (root / "source.jpeg").write_bytes(raw)
    preview = photo.copy()
    preview.thumbnail((1100, 1100), Image.Resampling.LANCZOS)
    preview.save(root / "preview.jpg", quality=92, optimize=True)
    cx, cy = w // 2, h // 2
    photo.crop((cx - 700, cy - 700, cx + 700, cy + 700)).save(
        root / "native-detail-1400.jpg", quality=94, optimize=True)
    report = dict(
        dish_id="tacos-al-pastor", catalog_id="tacos-al-pastor",
        photo_author=entry["author"], photo_page=entry["page"],
        photo_source_url=url, photo_license="https://www.pexels.com/license/",
        native_width=w, native_height=h, original_sha256=sha256(raw).hexdigest(),
        source_verified=True, no_upscale=True, inspection_notes=entry["notes"],
        visual_review_completed=False, approved_for_fysen=False, published=False,
        quality_gate=("Authentic al pastor pork tacos with complete tortillas, preferably pineapple. "
                      "No incorrect fillings, cut-off food, unwanted logos, plates or table after black background. "
                      "Native source detail; no generated food, no upscale, no restaurant-specific implication.")
    )
    (root / "review.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf8")
    print(f"STAGED {entry['slug']} {w}x{h} SHA256={report['original_sha256']} not approved")

if __name__ == "__main__":
    ok = 0
    for source in SOURCES:
        try:
            stage(source)
            ok += 1
        except Exception as exc:
            print(f"REJECTED {source['slug']}: {type(exc).__name__}: {exc}")
    assert ok >= 1, "No source verified; stop without approval"
    print(f"{ok} candidates staged. 0 approved, 0 published.")
