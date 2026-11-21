"""Build the reviewed Mapo tofu picture from the exact Commons original."""
import json
import re
from hashlib import sha256
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageOps

DISH = "mapo-tofu"
SOURCE = "https://commons.wikimedia.org/wiki/File:Chen_Mapo_Tofu.jpg"
SOURCE_SHA = "988dbc1f8a9daf2f27304fcb401249e461f4badc8affb484f2722e80baea1f52"
LICENSE = "https://creativecommons.org/licenses/by-sa/4.0/"
CREDIT = "ZhengZhou / Wikimedia Commons · CC BY-SA 4.0"
DIMENSIONS = (3825, 2868)
CONTOUR = """
M 479,40
C 656,28 798,119 850,241 C 864,274 868,297 870,326
C 880,347 902,399 914,444 C 923,471 914,491 899,508
C 878,527 850,541 824,564 C 789,623 730,675 654,701
C 591,724 519,735 454,728 C 315,724 209,683 147,615
C 121,589 100,574 79,547 C 60,533 59,517 65,492
L 92,370 C 96,352 100,340 101,329 C 100,252 138,184 196,132
C 273,66 371,45 479,40
"""


def black_background(source):
    """Rasterize the hand-traced bowl and holder at source resolution."""
    tokens = iter(re.findall(r"[MCL]|\d+", CONTOUR))

    def point():
        return int(next(tokens)), int(next(tokens))

    assert next(tokens) == "M"
    current = point()
    points = [current]
    for command in tokens:
        if command == "L":
            current = point()
            points.append(current)
        else:
            assert command == "C"
            first, second, end = point(), point(), point()
            for step in range(1, 81):
                t = step / 80
                s = 1 - t
                points.append(tuple(
                    s**3 * p + 3*s*s*t * a + 3*s*t*t * b + t**3 * c
                    for p, a, b, c in zip(current, first, second, end)
                ))
            current = end

    mask = Image.new("L", source.size)
    ImageDraw.Draw(mask).polygon([
        (round(x * source.width / 1000), round(y * source.height / 750))
        for x, y in points
    ], fill=255)
    photo = Image.new("RGB", source.size)
    photo.paste(source, mask=mask.filter(ImageFilter.GaussianBlur(1.4)))
    return photo


def digest(path):
    return sha256(path.read_bytes()).hexdigest()


def main():
    root = Path(__file__).resolve().parents[1]
    public = root / "apps/web/public/dish-images"
    manifest = public / "manifest.json"
    data = json.loads(manifest.read_text(encoding="utf-8"))
    entry = data["images"][29]
    assert len(data["images"]) == 44
    assert entry["id"] == entry["catalogId"] == DISH
    assert entry["index"] == 29 and entry["atlas"] == "mapo-tofu-768.avif"
    assert sum(item.get("largeViewEnabled") is True for item in data["images"]) == 28

    original = (root / "assets/fysen-dish-originals/mapo-tofu-source.jpg").read_bytes()
    assert sha256(original).hexdigest() == SOURCE_SHA
    with Image.open(BytesIO(original)) as source:
        assert source.format == "JPEG" and source.size == DIMENSIONS
        photo = black_background(source.convert("RGB"))
    assert photo.size == DIMENSIONS and photo.getpixel((0, 0)) == (0, 0, 0)

    png_path = f"assets/fysen-dish-originals/{DISH}.png"
    review_path = f"docs/fysen-image-reviews/{DISH}.md"
    large = public / f"{DISH}-master-3825.avif"
    thumb = public / f"{DISH}-thumb-512.avif"
    notice = public / f"{DISH}-LICENSE.txt"
    assert not any(path.exists() for path in (root / png_path, root / review_path, large, thumb, notice))

    photo.save(root / png_path)
    photo.save(large, quality=89)
    ImageOps.pad(photo, (512, 512), method=Image.Resampling.LANCZOS, color="black").save(thumb, quality=86)
    for path, size in ((large, DIMENSIONS), (thumb, (512, 512))):
        with Image.open(path) as encoded:
            assert encoded.format == "AVIF" and encoded.size == size

    png_sha = digest(root / png_path)
    large_sha = digest(large)
    entry.update({
        "atlas": thumb.name,
        "kind": "Redaksjonelt rettfoto",
        "variantCaution": "Redaksjonelt foto av mapo tofu i hel svart skål med tofu, rød saus og grønt. Fotoet er ikke restaurantfoto fra Fysen. Kjøttype og allergener må sjekkes hos restauranten.",
        "largeSourceOriginalPath": png_path,
        "largeSource": large.name,
        "largeSourceNativeWidth": DIMENSIONS[0],
        "largeSourceNativeHeight": DIMENSIONS[1],
        "largeSourceMethod": "independent-original",
        "largeSourceSha256": large_sha,
        "largeSourceOriginalSha256": png_sha,
        "largeSourceReview": review_path,
        "largeViewEnabled": True,
        "photoCredit": CREDIT,
        "photoSource": SOURCE,
        "photoLicense": LICENSE,
        "photoLicenseNotice": f"/dish-images/{notice.name}",
    })
    assert sum(item.get("largeViewEnabled") is True for item in data["images"]) == 29
    manifest.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    attribution = (
        f"Fotograf: ZhengZhou / Wikimedia Commons\n"
        f"Original: {SOURCE}\n"
        f"Lisens for foto og bearbeidede bilder: CC BY-SA 4.0 ({LICENSE})\n"
        "Bearbeidelse: Bordbakgrunnen er erstattet med helsvart. Skålen og holderen er bevart. "
        "Originalens 3825 × 2868 piksler er beholdt, og egen 512 × 512 AVIF-miniatyr er eksportert.\n"
    )
    notice.write_text(attribution, encoding="utf-8")
    (root / review_path).write_text(
        "# Mapo tofu\n\n" + attribution
        + "\nHele serveringen ble kontrollert visuelt mot svart bakgrunn. Fotografiet fra Chengdu viser tofubiter i rød saus. Kjøttype er ikke dokumentert i fotokilden.\n\n"
        + "Reviewed for full-size display: yes\n"
        + "No collage crop or upscale: yes\n"
        + "Correct dish and black background: yes\n\n"
        + f"Original JPEG SHA-256: {SOURCE_SHA}\nFrilagt PNG SHA-256: {png_sha}\nStorbilde AVIF SHA-256: {large_sha}\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
