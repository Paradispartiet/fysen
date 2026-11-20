#!/usr/bin/env python3
"""Source-only review of two Commons kebab photographs. Never publishes food images."""
from __future__ import annotations
import hashlib
import json
import os
from io import BytesIO
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
from PIL import Image, ImageOps

ROOT = Path("assets/fysen-image-candidates/kebab-pita")
ORIGINALS = Path("/tmp/fysen-kebab-commons-source-review")
ORIGINALS.mkdir(parents=True, exist_ok=True)
SOURCES = [
    {
        "slug": "commons-amin-pita",
        "author": "Amin",
        "license": "CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Doner_kebab_shawarma_pita.jpg",
        "expected": [2448, 2968],
        "urls": [
            "https://upload.wikimedia.org/wikipedia/commons/b/b7/Doner_kebab_shawarma_pita.jpg",
            "https://commons.wikimedia.org/wiki/Special:FilePath/Doner_kebab_shawarma_pita.jpg",
        ],
    },
    {
        "slug": "commons-lauren-pita",
        "author": "Lauren Travis",
        "license": "CC BY 2.0",
        "page": "https://commons.wikimedia.org/wiki/File:Doener_Kebab_(9682662957).jpg",
        "expected": [4000, 3000],
        "urls": [
            "https://live.staticflickr.com/7408/9682662957_44a612be44_o.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/9/94/Doener_Kebab_%289682662957%29.jpg",
        ],
    },
]
MAX_BYTES = 20 * 1024 * 1024

def fetch_source(source):
    errors = []
    for url in source["urls"]:
        try:
            req = Request(url, headers={
                "User-Agent": "FysenSourceReview/1.0 (Paradispartiet/fysen; noncommercial visual review; contact via github.com/Paradispartiet/fysen)",
                "Accept": "image/jpeg,image/*;q=0.8,*/*;q=0.2",
            })
            with urlopen(req, timeout=35) as response:
                content_type = response.headers.get("Content-Type", "")
                raw = response.read(MAX_BYTES + 1)
                resolved = response.url
            if len(raw) > MAX_BYTES or not content_type.lower().startswith("image/"):
                raise ValueError(f"bad type/size: {content_type}, bytes={len(raw)}")
            with Image.open(BytesIO(raw)) as obj:
                obj.load()
                im = ImageOps.exif_transpose(obj).convert("RGB")
            if list(im.size) != source["expected"]:
                raise ValueError(f"decoded size {list(im.size)} != expected {source['expected']}")
            return raw, im, resolved, errors
        except (HTTPError, URLError, OSError, ValueError, TimeoutError) as err:
            errors.append(f"{url}: {type(err).__name__}: {err}")
    return None, None, None, errors

def stage(source, raw, img, resolved):
    slug = source["slug"]
    out = ROOT / slug
    out.mkdir(parents=True, exist_ok=True)
    raw_path = ORIGINALS / f"{slug}-source.jpg"
    raw_path.write_bytes(raw)
    thumb = img.copy()
    thumb.thumbnail((1024, 1024), Image.Resampling.LANCZOS)
    thumb.save(out / "preview.jpg", quality=91, optimize=True)
    w, h = img.size
    x, y = w // 2, h // 2
    img.crop((x - 700, y - 700, x + 700, y + 700)).save(
        out / "native-detail-1400.jpg", quality=92, optimize=True
    )
    evidence = {
        "dish_id": "kebab-pita", "slug": slug, "source_page": source["page"],
        "source_download_url": resolved, "photographer": source["author"],
        "license_claim": source["license"], "native_width": w,
        "native_height": h, "source_sha256": hashlib.sha256(raw).hexdigest(),
        "source_verified": True, "photographer_verified": False,
        "license_verified": False, "visual_review_completed": False,
        "whole_pita_verified": False, "wrapper_free_verified": False,
        "black_background_created": False, "ingredients_generated": False,
        "upscaled": False, "approved_for_fysen": False, "published": False,
        "review_required": (
            "Assess genuine whole kebab in a pita, not a wrap or plated meal; "
            "natural sharpness in the 1400px crop; wrapper, fingers and bread "
            "cut-off; can the real food be isolated to black without inventing pixels?"
        ),
    }
    (out / "review.json").write_text(
        json.dumps(evidence, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"STAGED {slug} {w}x{h}, SHA256={evidence['source_sha256']}; NOT APPROVED")
    return evidence

def main():
    results = []
    for src in SOURCES:
        raw, im, resolved, errors = fetch_source(src)
        if raw is None:
            results.append({"slug": src["slug"], "staged": False, "errors": errors})
            print("NOT FETCHED", src["slug"], "|".join(errors))
        else:
            evidence = stage(src, raw, im, resolved)
            results.append({"slug": src["slug"], "staged": True, "sha256": evidence["source_sha256"]})
    (ORIGINALS / "fetch-report.json").write_text(
        json.dumps(results, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    succeeded = sum(row["staged"] for row in results)
    print(f"Download complete: {succeeded}/2 staged for review, none approved")
    if succeeded == 0:
        raise SystemExit("Neither original downloaded. No candidate can be approved.")

if __name__ == "__main__":
    main()
