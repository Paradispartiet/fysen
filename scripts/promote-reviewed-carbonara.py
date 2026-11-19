#!/usr/bin/env python3
"""Native 2600px carbonara with preserved source detail on black; no Runway."""
import hashlib, io, json, subprocess, tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import pillow_avif  # noqa: F401

ROOT = Path(__file__).resolve().parents[1]
DISH = "pasta-carbonara"
CANDIDATE = ROOT / "assets/fysen-image-candidates" / DISH
PUBLIC = ROOT / "apps/web/public/dish-images"
MANIFEST = PUBLIC / "manifest.json"
EXPECTED_HASH = "109eb4523f27aa3131f91ddd7397678a50e2e3b0378b83802930f3670740f384"

def sha256(data):
    return hashlib.sha256(data).hexdigest()

def main():
    source = (CANDIDATE / "source.jpeg").read_bytes()
    assert sha256(source) == EXPECTED_HASH, "Licensed Pexels source changed"
    meta = json.loads((CANDIDATE / "review.json").read_text(encoding="utf8"))
    assert meta["dish_id"] == DISH
    assert meta["actual_native_size"] == [2768, 3460]
    assert meta["original_source_sha256"] == EXPECTED_HASH
    review = (CANDIDATE / "approval.md").read_text(encoding="utf8")
    for phrase in (EXPECTED_HASH, "Reviewed for full-size display: yes",
                   "No collage crop or upscale: yes",
                   "Correct dish and black background: yes"):
        assert phrase in review, "Missing photo provenance / approval: " + phrase

    with Image.open(io.BytesIO(source)) as raw:
        raw.load()
        assert raw.size == (2768, 3460)
        photo = raw.convert("RGB").crop((84, 180, 2684, 2780))
    assert photo.size == (2600, 2600)
    # Isolate only the nearly-black surrounding background, retaining full native
    # pixel detail on the pasta, bacon and plate. No synthetic or upscaled food.
    vignette = Image.new("L", (2600, 2600), 0)
    ImageDraw.Draw(vignette).ellipse((12, 0, 2588, 2575), fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(18))
    isolated = Image.new("RGB", (2600, 2600), "black")
    isolated.paste(photo, (0, 0), vignette)
    assert isolated.getpixel((0, 0)) == (0, 0, 0)

    manifest = json.loads(MANIFEST.read_text(encoding="utf8"))
    entry = next(x for x in manifest["images"] if x["id"] == DISH)
    assert not entry.get("largeSource"), "An earlier carbonara master exists"

    with tempfile.TemporaryDirectory(prefix="fysen-carbonara-") as work:
        tmp = Path(work)
        png = tmp / "original.png"
        avif = tmp / "large.avif"
        evidence = tmp / "review.md"
        isolated.save(png, "PNG", optimize=True)
        isolated.save(avif, "AVIF", quality=88)
        evidence.write_text(review + "\nRetained PNG SHA-256: " + sha256(png.read_bytes()) + "\n", encoding="utf8")
        subprocess.run(["node", "scripts/import-dish-large-master.mjs", DISH,
                        str(png), str(avif), str(evidence), "independent-original"], cwd=ROOT, check=True)
        thumb = isolated.copy()
        thumb.thumbnail((512, 512), Image.Resampling.LANCZOS)
        assert thumb.size == (512, 512)
        thumb.save(PUBLIC / "carbonara-thumb-512.avif", "AVIF", quality=84)

    manifest = json.loads(MANIFEST.read_text(encoding="utf8"))
    entry = next(x for x in manifest["images"] if x["id"] == DISH)
    entry.update({
        "atlas": "carbonara-thumb-512.avif",
        "kind": "Redaksjonelt rettfoto",
        "largeViewEnabled": True,
        "photoCredit": "Froimar Andrea Rodriguez / Pexels",
        "photoSource": meta["source_page"],
        "photoLicense": meta["license_url"],
        "variantCaution": "Representativt foto av spaghetti carbonara med bacon, eggesaus, ost og pepper. Ikke restaurantfoto eller garanti for guanciale / annen rettvariant.",
    })
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf8")
    print("INTEGRATED: carbonara 2600x2600 native photo and 512px thumbnail")

if __name__ == "__main__":
    main()
