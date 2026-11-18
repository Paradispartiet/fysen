#!/usr/bin/env python3
"""Promote ONLY the visually reviewed sushi Pexels photo to native 2100px AVIF.

All other licensed photo candidates are held outside public/ until separately
reviewed. No Runway, no resizing of original detail, no restaurant claims.
"""
from __future__ import annotations

import hashlib
import io
import json
import subprocess
import tempfile
from pathlib import Path
from shutil import copyfile
from PIL import Image
import pillow_avif  # noqa: F401 - registers AVIF

ROOT = Path(__file__).resolve().parents[1]
DISH = "sushi"
CANDIDATE = ROOT / "assets/fysen-image-candidates" / DISH
PUBLIC = ROOT / "apps/web/public/dish-images"
MANIFEST = PUBLIC / "manifest.json"
APPROVAL = CANDIDATE / "approval.md"
CROP = (450, 500, 2550, 2600)
MIN_PIXELS = 1600
EXPECTED_ORIGINAL = "d535726173a2e49c68c4668f809e57efe8523adc4d65578784d9ace9f7d1e6ce"

def sha256(contents: bytes) -> str:
    return hashlib.sha256(contents).hexdigest()

def main() -> None:
    review = APPROVAL.read_text(encoding="utf8")
    for required in (
        "Reviewed for full-size display: yes",
        "No collage crop or upscale: yes",
        "Correct dish and black background: yes",
        EXPECTED_ORIGINAL,
    ):
        assert required in review, "Missing reviewed evidence: " + required
    metadata = json.loads((CANDIDATE / "review.json").read_text(encoding="utf8"))
    assert metadata["dish_id"] == DISH
    assert metadata["actual_native_size"] == [3000, 3000]
    assert not metadata["approved_for_fysen"] and not metadata["published"]
    source = (CANDIDATE / "source.jpeg").read_bytes()
    assert sha256(source) == EXPECTED_ORIGINAL
    manifest = json.loads(MANIFEST.read_text(encoding="utf8"))
    dish = next(x for x in manifest["images"] if x["id"] == DISH)
    assert not dish.get("largeSource"), "Already imported: do not overwrite approved master"

    with Image.open(io.BytesIO(source)) as raw:
        raw.load()
        assert raw.size == (3000, 3000)
        cropped = raw.convert("RGB").crop(CROP)
    assert cropped.size[0] >= MIN_PIXELS and cropped.size[1] >= MIN_PIXELS
    assert cropped.size == (2100, 2100)
    with tempfile.TemporaryDirectory(prefix="fysen-reviewed-sushi-") as directory:
        destination = Path(directory)
        png = destination / "sushi.png"
        avif = destination / "sushi-master-2100.avif"
        cropped.save(png, format="PNG", optimize=True)
        cropped.save(avif, format="AVIF", quality=88)
        # The review is not a substitution for the source: the importer
        # checks the exact saved cropped PNG SHA and full-size AVIF dimensions.
        review_input = destination / "sushi-review.md"
        review_input.write_text(
            review + "\nRetained reviewed PNG SHA-256: " + sha256(png.read_bytes()) + "\n",
            encoding="utf8",
        )
        subprocess.run(
            [
                "node", "scripts/import-dish-large-master.mjs",
                DISH, str(png), str(avif), str(review_input),
                "independent-original",
            ],
            cwd=ROOT,
            check=True,
        )
        thumb = cropped.copy()
        thumb.thumbnail((512, 512), Image.Resampling.LANCZOS)
        assert thumb.size == (512, 512)
        thumb.save(PUBLIC / "sushi-thumb-512.avif", format="AVIF", quality=84)

    manifest = json.loads(MANIFEST.read_text(encoding="utf8"))
    dish = next(x for x in manifest["images"] if x["id"] == DISH)
    dish["atlas"] = "sushi-thumb-512.avif"
    dish["kind"] = "Redaksjonelt rettfoto"
    dish["photoCredit"] = "Mony Cruz / Pexels"
    dish["photoSource"] = metadata["source_page"]
    dish["photoLicense"] = metadata["license_url"]
    dish["variantCaution"] = (
        "Lisensiert redaksjonelt fotografi av sushi assortert med laksefisk,"
        " maki, nori og ris. Ikke restaurantfoto; det dokumenterer ikke"
        " ingrediensene hos en konkret restaurant."
    )
    manifest["purpose"] = (
        "Representative, lisensierte rettfotografier og KI-illustrasjoner "
        "med korrekt rett-ID, kildestatus og sporbar publisering."
    )
    manifest["sourceType"] = (
        "Blanding av lisensierte redaksjonelle rettfoto og KI-illustrasjoner; "
        "ikke bilder av konkrete restaurantserveringer."
    )
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+"\n", encoding="utf8")
    print("PROMOTED REVIEWED SUSHI: native crop 2100×2100, thumbnail 512×512, photo provenance retained")

if __name__ == "__main__":
    main()
