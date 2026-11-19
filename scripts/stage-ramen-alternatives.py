#!/usr/bin/env python3
"""Fetch *alternative* licensed ramen originals for visual review, without publication.

The existing ramen original is sharp enough in pixel dimensions but soft at 1:1,
so it must not be promoted. The alternatives are reviewed independently.
"""
from __future__ import annotations
from io import BytesIO
from pathlib import Path
from hashlib import sha256
from urllib.request import Request, urlopen
import json
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "assets" / "fysen-image-candidates" / "ramen-alternatives"
CANDIDATES = [
    (4224213, "https://www.pexels.com/photo/ramen-in-close-up-4224213/"),
    (4224210, "https://www.pexels.com/photo/bowl-of-ramen-4224210/"),
    (35773142, "https://www.pexels.com/photo/delicious-bowl-of-traditional-japanese-ramen-35773142/"),
    (20954901, "https://www.pexels.com/photo/pork-with-noodles-and-egg-20954901/"),
]
MAX_BYTES = 30 * 1024 * 1024

def stage(photo_id: int, source_page: str) -> None:
    folder = DEST / str(photo_id)
    review_path = folder / "review.json"
    if review_path.exists():
        data = json.loads(review_path.read_text("utf8"))
        if data["photo_id"] == photo_id and data.get("source_verified"):
            print(f"ALREADY STAGED {photo_id}")
            return
        raise RuntimeError(f"Conflicting ramen photo review at {folder}")
    source_url = f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
    request = Request(source_url, headers={
        "User-Agent": "FysenImageQualityReview/1.0 (https://github.com/Paradispartiet/fysen)",
        "Accept": "image/jpeg",
    })
    with urlopen(request, timeout=35) as response:
        assert response.headers.get("Content-Type", "").lower().startswith("image/"), "Not image content"
        source_bytes = response.read(MAX_BYTES + 1)
    assert len(source_bytes) <= MAX_BYTES, "Image file exceeds size limit"
    assert source_bytes[:3] == bytes.fromhex("ffd8ff"), "Not JPEG"
    with Image.open(BytesIO(source_bytes)) as raw:
        raw.load()
        src = ImageOps.exif_transpose(raw).convert("RGB")
    width, height = src.size
    assert width >= 3000 and height >= 3000, f"Too small: {width}×{height}"
    folder.mkdir(parents=True, exist_ok=False)
    (folder / "source.jpeg").write_bytes(source_bytes)
    preview = src.copy()
    preview.thumbnail((1100, 1100), Image.Resampling.LANCZOS)
    preview.save(folder / "preview.jpg", quality=90, optimize=True)
    x, y = width // 2, height // 2
    # A native 1400px crop at 1:1 can expose over-sharpening and softness.
    box = (x - 700, y - 700, x + 700, y + 700)
    detail = src.crop(box)
    detail.save(folder / "native-detail-1400.jpg", quality=92, optimize=True)
    info = {
        "dish_id": "ramen",
        "photo_id": photo_id,
        "photographer": "alleksana" if photo_id in (4224210, 4224213) else "Connor Scott McManus" if photo_id == 35773142 else "Nadin Sh",
        "license": "Pexels License",
        "license_url": "https://www.pexels.com/license/",
        "source_page": source_page,
        "original_url": source_url,
        "actual_native_size": [width, height],
        "source_sha256": sha256(source_bytes).hexdigest(),
        "source_verified": True,
        "visual_review_completed": False,
        "approved_for_fysen": False,
        "published": False,
        "note": "Candidate for ramen with pork, egg and noodles; full-size sharpness, exact ingredient variant, background isolation and dish edges must be inspected before promotion.",
    }
    review_path.write_text(json.dumps(info, ensure_ascii=False, indent=2) + "\n", encoding="utf8")
    print(f"STAGED RAMEN {photo_id}: {width}x{height}; NOT APPROVED")

if __name__ == "__main__":
    success = 0
    for photo_id, source_page in CANDIDATES:
        try:
            stage(photo_id, source_page)
            success += 1
        except Exception as error:
            print(f"CANDIDATE REJECTED {photo_id}: {type(error).__name__}: {error}")
    if not success:
        raise SystemExit("No usable native photo candidates were downloaded")
    print(f"Staged {success}/{len(CANDIDATES)} alternate sources; no published media changed")
