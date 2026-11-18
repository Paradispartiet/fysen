#!/usr/bin/env python3
"""Native 3000px licensed butter chicken on a true black background; no Runway."""
import hashlib, io, json, subprocess, tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import pillow_avif  # noqa: F401

ROOT = Path(__file__).resolve().parents[1]
DISH = "butter-chicken"
CANDIDATE = ROOT / "assets/fysen-image-candidates" / DISH
PUBLIC = ROOT / "apps/web/public/dish-images"
MANIFEST = PUBLIC / "manifest.json"
ORIGINAL_HASH = "7533da15eaae84a18e6cab3fd5257cd24ae7b5196ad88526edecca818251abdf"

def checksum(data):
    return hashlib.sha256(data).hexdigest()

def main():
    data = (CANDIDATE / "source.jpeg").read_bytes()
    assert checksum(data) == ORIGINAL_HASH, "Original photo changed"
    meta = json.loads((CANDIDATE / "review.json").read_text())
    assert meta["dish_id"] == DISH and meta["actual_native_size"] == [4608, 3456]
    assert meta["original_source_sha256"] == ORIGINAL_HASH
    review = (CANDIDATE / "approval.md").read_text()
    for required in (ORIGINAL_HASH, "Reviewed for full-size display: yes",
                     "No collage crop or upscale: yes",
                     "Correct dish and black background: yes"):
        assert required in review, "Missing visual review: " + required
    with Image.open(io.BytesIO(data)) as original:
        original.load()
        assert original.size == (4608, 3456)
        cropped = original.convert("RGB").crop((650, 190, 3650, 3190))
    assert cropped.size == (3000, 3000)
    mask = Image.new("L", (3000, 3000), 0)
    ImageDraw.Draw(mask).ellipse((300, 270, 2950, 2870), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(7))
    isolated = Image.new("RGB", (3000, 3000), "black")
    isolated.paste(cropped, (0, 0), mask)
    assert isolated.getpixel((0, 0)) == (0, 0, 0)
    manifest = json.loads(MANIFEST.read_text())
    entry = next(x for x in manifest["images"] if x["id"] == DISH)
    assert not entry.get("largeSource"), "Already promoted"
    with tempfile.TemporaryDirectory() as work:
        tmp = Path(work)
        png = tmp / "original.png"
        avif = tmp / "large.avif"
        evidence = tmp / "review.md"
        isolated.save(png, "PNG", optimize=True)
        isolated.save(avif, "AVIF", quality=88)
        evidence.write_text(review + "\nNative masked PNG SHA-256: " + checksum(png.read_bytes()) + "\n")
        subprocess.run(["node", "scripts/import-dish-large-master.mjs", DISH,
                        str(png), str(avif), str(evidence), "independent-original"], cwd=ROOT, check=True)
        thumbnail = isolated.copy()
        thumbnail.thumbnail((512, 512), Image.Resampling.LANCZOS)
        assert thumbnail.size == (512, 512)
        thumbnail.save(PUBLIC / "butter-chicken-thumb-512.avif", "AVIF", quality=84)
    manifest = json.loads(MANIFEST.read_text())
    entry = next(x for x in manifest["images"] if x["id"] == DISH)
    entry.update({
        "atlas": "butter-chicken-thumb-512.avif",
        "kind": "Redaksjonelt rettfoto",
        "largeViewEnabled": True,
        "photoCredit": "Prabal Pratap Singh / Pexels",
        "photoSource": meta["source_page"],
        "photoLicense": meta["license_url"],
        "variantCaution": "Redaksjonelt foto av butter chicken med et kyllinglår i kremet tomat- og kryddersaus, isolert på helsvart bakgrunn. Ikke foto fra en restaurant, og ikke en benfri variant.",
    })
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print("INTEGRATED: butter chicken 3000px native-detail master and 512px thumbnail")

if __name__ == "__main__":
    main()
