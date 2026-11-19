#!/usr/bin/env python3
"""Promote a reviewed full-size pizza photograph in the SAME Fysen PR.

Only the visual-review-locked native SHA is accepted. This script never deploys.
"""
from __future__ import annotations

from hashlib import sha256
import json
from pathlib import Path
import runpy
import shutil

from PIL import Image
import pillow_avif  # Registers AVIF codec for Pillow

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets/fysen-image-candidates/pizza-margherita/31136887"
IMAGE_DIR = ROOT / "apps/web/public/dish-images"
WEB_DIR = ROOT / "apps/web"
REVIEW_DIR = ROOT / "docs/fysen-image-reviews"
NATIVE_SHA_APPROVED = "4b1b3a490557b6bca232c962009f36b245442134038c8e2142b1b55efbc88494"
SOURCE_PHOTO_SHA = "15e2da86648369d75eab1814524e2967b39bbe8ffb9588a53b9a3bfd15461eed"


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def replace_exact(path: Path, before: str, after: str) -> None:
    text = path.read_text(encoding="utf8")
    if text.count(before) != 1:
        raise RuntimeError(f"Expected exactly one anchor at {path}: {before!r}")
    path.write_text(text.replace(before, after, 1), encoding="utf8")


def main() -> None:
    metadata = json.loads((SOURCE_DIR / "black-review.json").read_text(encoding="utf8"))
    assert metadata["processed_native_size"] == [3000, 3000]
    assert metadata["original_source_sha256"] == SOURCE_PHOTO_SHA
    assert metadata["processed_native_sha256"] == NATIVE_SHA_APPROVED, "Unreviewed mask revision"
    assert metadata["visual_review_completed"] is False
    assert metadata["approved_for_fysen"] is False

    # Reproduce the same source-pixel-preserving isolation at the reviewed SHA.
    runpy.run_path(str(ROOT / "scripts/preview-pizza-margherita-black.py"))
    source_native = SOURCE_DIR / "black-native-master-3000.png"
    assert digest(source_native) == NATIVE_SHA_APPROVED, "Native pixels differ from visual review"

    archive = ROOT / "assets/fysen-dish-originals/pizza-margherita.png"
    master = IMAGE_DIR / "pizza-margherita-master-3000.avif"
    thumb = IMAGE_DIR / "pizza-margherita-thumb-512.avif"
    review = REVIEW_DIR / "pizza-margherita.md"
    for new_file in (archive, master, thumb, review):
        assert not new_file.exists(), f"Do not overwrite reviewed media: {new_file}"

    with Image.open(source_native) as img:
        img.load()
        assert img.size == (3000, 3000) and img.mode == "RGB"
        img.save(master, format="AVIF", quality=88, speed=5)
        img.resize((512, 512), Image.Resampling.LANCZOS).save(
            thumb, format="AVIF", quality=84, speed=5
        )
    shutil.copyfile(source_native, archive)
    native_sha, master_sha = digest(archive), digest(master)
    assert native_sha == NATIVE_SHA_APPROVED

    manifest_path = IMAGE_DIR / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf8"))
    entry = next(img for img in manifest["images"] if img["id"] == "pizza-margherita")
    assert entry["atlas"] == "pizza-margherita-512.avif"
    assert "largeSource" not in entry
    entry.update({
        "atlas": thumb.name,
        "kind": "Redaksjonelt rettfoto",
        "variantCaution": "Lisensiert redaksjonelt foto av hel pizza margherita med tomat, mozzarella og basilikum på svart bakgrunn. Dette er ikke faktisk restaurantfoto eller dokumentasjon av serveringen hos en konkret restaurant.",
        "largeSourceOriginalPath": "assets/fysen-dish-originals/pizza-margherita.png",
        "largeSource": master.name,
        "largeSourceNativeWidth": 3000,
        "largeSourceNativeHeight": 3000,
        "largeSourceMethod": "independent-original",
        "largeSourceSha256": master_sha,
        "largeSourceOriginalSha256": native_sha,
        "largeSourceReview": "docs/fysen-image-reviews/pizza-margherita.md",
        "largeViewEnabled": True,
        "photoCredit": "KI Lee / Pexels",
        "photoSource": "https://www.pexels.com/photo/delicious-margherita-pizza-with-fresh-basil-31136887/",
        "photoLicense": "https://www.pexels.com/license/",
    })
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                             encoding="utf8")

    review.write_text(
        "# Pizza margherita – kontrollert storbilde (19. november 2026)\n\n"
        "**Beslutning:** Godkjent som representativt redaksjonelt rettfoto, ikke "
        "som fotografi av en bestemt restaurantrett.\n\n"
        "- Rett-ID: pizza-margherita\n"
        "- Fotograf: KI Lee / Pexels\n"
        "- Kilde: https://www.pexels.com/photo/delicious-margherita-pizza-with-fresh-basil-31136887/\n"
        "- Lisens: https://www.pexels.com/license/\n"
        "- Originalt foto: 5346 × 3840 JPEG. Original SHA-256: " + SOURCE_PHOTO_SHA + "\n"
        "- Prosess: pizza isolert fra underlag med kildepikselbevarende maskering; "
        "kun masken ble skalert, aldri matens piksler. Ekte beskåret original "
        "3000 × 3000, ingen forstørrelse eller atlasutsnitt.\n"
        "- Visuell kontroll: hel pizza med tomat, mozzarella og basilikum. "
        "Native detalj på 1400 × 1400 undersøkt; skarp tekstur og ren svart "
        "bakgrunn i godkjent utsnitt.\n"
        "- Egne leveranser: pizza-margherita-master-3000.avif og "
        "pizza-margherita-thumb-512.avif.\n"
        "- Offentlig HTTP-/assetkontroll, mobil og iPad gjenstår til "
        "Vercel-deploy kan gjennomføres.\n\n"
        "Reviewed for full-size display: yes\n"
        "No collage crop or upscale: yes\n"
        "Correct dish and black background: yes\n\n"
        "Retained reviewed PNG SHA-256: " + native_sha + "\n",
        encoding="utf8",
    )

    css = WEB_DIR / "styles/dish-photos.css"
    replace_exact(css,
        'background: #000 url("/dish-images/pizza-margherita-512.avif") center / cover no-repeat;',
        'background: #000 url("/dish-images/pizza-margherita-thumb-512.avif") center / cover no-repeat;'
    )
    replace_exact(css,
        "/* Dedicated 512px pizza illustration; no enlargement of atlas slot 0.",
        "/* Dedicated 512px licensed pizza thumbnail; never enlarge atlas slot 0."
    )

    gallery = WEB_DIR / "components/dish-photo-gallery.tsx"
    replace_exact(gallery,
        '<nav className="dishPhotosLargeLinks" aria-label="Godkjente rettbilder i full størrelse">\n          <span>Se skarpe originalbilder:</span>',
        '<nav className="dishPhotosLargeLinks" aria-label="Godkjente rettbilder i full størrelse">\n          <span>Se skarpe originalbilder:</span>\n          <a href="/dish-images/pizza-margherita-master-3000.avif" target="_blank" rel="noopener noreferrer">\n            Pizza margherita <span aria-hidden="true">↗</span>\n          </a>'
    )

    tests = WEB_DIR / "tests/dish-photo-gallery.test.mjs"
    old = tests.read_text(encoding="utf8")
    assert old.count("pizza-margherita-512") >= 4
    new = old.replace("pizza-margherita-512", "pizza-margherita-thumb-512")
    assert 'approved.length, 4' in new
    new = new.replace('approved.length, 4', 'approved.length, 5', 1)
    new = new.replace(
        "Sushi, ramen, carbonara and butter chicken need approved full-size masters",
        "Pizza margherita, sushi, ramen, carbonara and butter chicken need approved full-size masters",
        1
    )
    assert "[5,6,10,11].includes(index)" in new
    new = new.replace("[5,6,10,11].includes(index)", "[0,5,6,10,11].includes(index)", 1)
    tests.write_text(new, encoding="utf8")

    evidence = SOURCE_DIR / "black-review.json"
    evidence_data = json.loads(evidence.read_text(encoding="utf8"))
    evidence_data["visual_review_completed"] = True
    evidence_data["approved_for_fysen"] = True
    evidence_data["published"] = False
    evidence_data["final_native_png_sha256"] = native_sha
    evidence_data["final_large_avif_sha256"] = master_sha
    evidence.write_text(json.dumps(evidence_data, ensure_ascii=False, indent=2) + "\n",
                        encoding="utf8")
    print("PROMOTED reviewed native pizza; still not deployed to Vercel")


if __name__ == "__main__":
    main()
