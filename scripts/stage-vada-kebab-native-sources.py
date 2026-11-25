#!/usr/bin/env python3
"""Retain two verified native photo candidates, without changing public images."""
from pathlib import Path
from urllib.request import Request, urlopen
from hashlib import sha256
from io import BytesIO
import json
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCES = json.loads(r'''[{"id":"vada","filename":"Medu_Vada_-_Calcutta_16_2026-07-11.jpg","url":"https://upload.wikimedia.org/wikipedia/commons/b/b3/Medu_Vada_-_Calcutta_16_2026-07-11.jpg","page":"https://commons.wikimedia.org/wiki/File:Medu_Vada_-_Calcutta_16_2026-07-11.jpg","author":"Andy Li","license":"CC0 1.0","license_url":"https://creativecommons.org/publicdomain/zero/1.0/","dimensions":[8160,6144],"sha256":"e1de8c0584c5f5157a8173f1ec016e216abf895ccdf6f1c369fb84040725f16d","variant":"Tre medu vada med sambar og tre chutney-varianter. Originalfotoets restaurant er ikke en Fysen-restaurantkobling."},{"id":"kebab-pita","filename":"Doener_Kebab_(9682662957).jpg","url":"https://upload.wikimedia.org/wikipedia/commons/9/94/Doener_Kebab_%289682662957%29.jpg","page":"https://commons.wikimedia.org/wiki/File:Doener_Kebab_(9682662957).jpg","author":"Lauren Travis","license":"CC BY 2.0","license_url":"https://creativecommons.org/licenses/by/2.0/","dimensions":[4000,3000],"sha256":"257d6f340413eff6ca615c65661a75ae7be9834a218077509a32f009b3e89baa","variant":"Döner i brød med kjøtt, salat og hvit saus. Kjøttype og allergener er ikke dokumentert. Originalfotoets restaurant er ikke en Fysen-restaurantkobling."}]''')

def main():
    for source in SOURCES:
        root = ROOT / "assets/fysen-image-candidates" / source["id"] / "native-photo-20261125"
        root.mkdir(parents=True, exist_ok=True)
        target = root / "source.jpg"
        if target.exists():
            raw = target.read_bytes()
        else:
            request = Request(source["url"], headers={"User-Agent": "FysenEditorialImageReview/1.0"})
            with urlopen(request, timeout=60) as response:
                raw = response.read(20 * 1024 * 1024 + 1)
        assert len(raw) <= 20 * 1024 * 1024
        assert sha256(raw).hexdigest() == source["sha256"], "Source bytes changed"
        with Image.open(BytesIO(raw)) as image:
            image.load()
            assert list(image.size) == source["dimensions"]
            assert min(image.size) >= 1600
            preview = ImageOps.exif_transpose(image).convert("RGB")
            preview.thumbnail((960, 960), Image.Resampling.LANCZOS)
            preview.save(root / "source-preview.jpg", quality=92)
        target.write_bytes(raw)
        review = dict(source, source_verified=True, no_upscale=True,
                      original_photo_visual_review_completed=True,
                      black_background=False, black_background_review_completed=False,
                      approved_for_fysen=False, published=False,
                      ai_processed=False, generated_food_pixels=False)
        (root / "review.json").write_text(json.dumps(review, ensure_ascii=False, indent=2) + "\n", encoding="utf8")
        (root / "LICENSE.txt").write_text(
            "Fotograf: " + source["author"] + "\nKilde: " + source["page"] +
            "\nLisens: " + source["license"] + " (" + source["license_url"] + ")" +
            "\nBearbeidelse: Original-JPEG uendret. Forhåndsvisning kun nedskalert." +
            "\nIngen oppskalering, ingen KI-bearbeiding. Ikke publisert på Fysen.\n", encoding="utf8")
        print(source["id"], source["dimensions"], source["sha256"])

if __name__ == "__main__":
    main()
