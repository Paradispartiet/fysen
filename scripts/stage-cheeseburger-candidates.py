#!/usr/bin/env python3
"""Stage native-resolution licensed bacon cheeseburger photos for Matlyst review.

No public image files are changed, no source is approved automatically,
and the low-res thumbnails are never treated as approved full-size images.
"""
from __future__ import annotations

from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "assets/fysen-image-candidates/cheeseburger"
MAX_SIZE = 38 * 1024 * 1024
CANDIDATES = [
    (11812583, "MARIANNE RIXHON", "https://www.pexels.com/photo/close-up-shot-of-burger-and-fries-11812583/"),
    (12538057, "Lucas Andrade", "https://www.pexels.com/photo/a-close-up-shot-of-a-cheeseburger-with-bacon-12538057/"),
    (39019902, "DΛVΞ GΛRCIΛ", "https://www.pexels.com/photo/juicy-cheeseburger-with-bacon-and-fries-close-up-39019902/"),
    (18713426, "Jonathan Borba", "https://www.pexels.com/photo/cheeseburger-on-black-background-18713426/"),
]

def stage(photo_id, photographer, source_page):
    path = DEST / str(photo_id)
    review_file = path / "review.json"
    if review_file.exists():
        info = json.loads(review_file.read_text(encoding="utf-8"))
        if info.get("photo_id") == photo_id and info.get("source_verified"):
            print("ALREADY STAGED", photo_id)
            return
        raise RuntimeError(f"Conflicting evidence: {review_file}")
    original_url = f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
    request = Request(original_url, headers={
        "User-Agent": "FysenImageReview/1.0 (https://github.com/Paradispartiet/fysen)",
        "Accept": "image/jpeg",
    })
    with urlopen(request, timeout=50) as response:
        assert response.headers.get("Content-Type", "").lower().startswith("image/")
        content = response.read(MAX_SIZE + 1)
    assert len(content) <= MAX_SIZE and content.startswith(bytes.fromhex("ffd8ff")), "Invalid source JPEG"
    with Image.open(BytesIO(content)) as src:
        src.load()
        img = ImageOps.exif_transpose(src).convert("RGB")
    width, height = img.size
    assert width >= 2000 and height >= 2000, f"Native source too small: {width}x{height}"
    path.mkdir(parents=True, exist_ok=False)
    (path / "source.jpeg").write_bytes(content)
    preview = img.copy()
    preview.thumbnail((1050, 1050), Image.Resampling.LANCZOS)
    preview.save(path / "preview.jpg", quality=90, optimize=True)
    cx, cy = width//2, height//2
    img.crop((cx-700, cy-700, cx+700, cy+700)).save(
        path / "native-detail-1400.jpg", quality=91, optimize=True
    )
    review_file.write_text(json.dumps({
        "dish_id":"cheeseburger",
        "photo_id":photo_id,
        "photographer":photographer,
        "source_page":source_page,
        "original_url":original_url,
        "photo_license":"https://www.pexels.com/license/",
        "source_verified":True,
        "source_original_width":width,
        "source_original_height":height,
        "source_sha256":sha256(content).hexdigest(),
        "visual_review_completed":False,
        "approved_for_fysen":False,
        "published":False,
        "required_variant":"beef cheeseburger with melted cheese, visible bacon and french fries",
        "visual_criteria":"Whole burger and fries preserved, realistic sharp texture at 1:1, solid black background, no unrelated toppings, no hands, no crop pretending to be a large native original.",
        "note":"Representational editorial dish image, never a photograph of any named restaurant's serving.",
    },ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(f"STAGED {photo_id} {width}x{height}; NOT APPROVED")

if __name__ == "__main__":
    succeeded = 0
    for p,c,s in CANDIDATES:
        try:
            stage(p,c,s)
            succeeded += 1
        except Exception as error:
            print(f"REJECTED {p}: {type(error).__name__}: {error}")
    if not succeeded:
        raise SystemExit("No high-resolution cheeseburger candidates were retrieved")
    print(f"{succeeded}/{len(CANDIDATES)} reviewed-source candidates staged; no public images changed")
