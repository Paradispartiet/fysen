#!/usr/bin/env python3
"""Promote one visually reviewed genuine marinara photo into a DRAFT stack only.

No deployment, menu change, restaurant photograph claim, source upscale, or
unreviewed AVIF production. CC BY-SA 2.0 derivative terms retained.
"""
from __future__ import annotations
from hashlib import sha256
from pathlib import Path
import json, runpy, shutil
from PIL import Image, ImageOps
import pillow_avif  # noqa: F401

ROOT = Path(__file__).resolve().parents[1]
C = ROOT / "assets/fysen-image-candidates/pizza-marinara/classic-van-den-bossche-by-sa"
WEB = ROOT / "apps/web"
PUBLIC = WEB / "public/dish-images"
ORIGINAL_SHA = "5ba72af9c97fd3fbc7421ca21e48160e4359c623a0350d57dab56754cccecb7f"
SOURCE = "https://commons.wikimedia.org/wiki/File:Pizza_marinara.jpg"
LICENSE = "https://creativecommons.org/licenses/by-sa/2.0/"
AUTHOR = "Peter Van den Bossche / Wikimedia Commons"
ID = "pizza-marinara"

def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()

def patch(path: Path, before: str, after: str) -> None:
    content = path.read_text(encoding="utf-8")
    assert content.count(before) == 1, f"Unique edit anchor not found: {path}: {before[:75]}"
    path.write_text(content.replace(before, after, 1), encoding="utf-8")

def main() -> None:
    review_path = C / "review.json"
    black_path = C / "black-review.json"
    review = json.loads(review_path.read_text(encoding="utf-8"))
    black = json.loads(black_path.read_text(encoding="utf-8"))
    assert review["source_sha256"] == ORIGINAL_SHA
    assert review["native_width"] == 2848 and review["native_height"] == 2136
    assert not review["approved_for_fysen"] and not review["published"]
    assert black["source_sha256"] == ORIGINAL_SHA and black["native_dimensions"] == [2848, 2136]
    assert not black["approved_for_fysen"] and not black["published"]
    assert not black["native_pixels_upscaled"] and not black["food_pixels_generated"]
    selected = C / "black-grabcut-preview.jpg"
    selected_sha = digest(selected)
    # Exact same source-locked preview must be reproducible byte for byte.
    runpy.run_path(str(ROOT / "scripts/preview-pizza-marinara-black.py"), run_name="__main__")
    assert digest(selected) == selected_sha, "Regeneration differs from visually inspected and SHA-locked preview"
    original_native = C / "black-grabcut-native.png"
    assert original_native.is_file()
    archive = ROOT / "assets/fysen-dish-originals/pizza-marinara.png"
    master = PUBLIC / "pizza-marinara-master-2848.avif"
    thumb = PUBLIC / "pizza-marinara-thumb-512.avif"
    notice = PUBLIC / "pizza-marinara-LICENSE.txt"
    note = ROOT / "docs/fysen-image-reviews/pizza-marinara.md"
    for dest in [archive, master, thumb, notice, note]:
        assert not dest.exists(), f"Already exists, avoid replacing approved file: {dest}"
    with Image.open(original_native) as source:
        source.load()
        assert source.mode == "RGB" and source.size == (2848, 2136)
        assert all(source.getpixel(pt) == (0,0,0) for pt in [
            (0,0), (2847,0), (0,2135), (2847,2135)])
        source.save(master, format="AVIF", quality=89, speed=5)
        ImageOps.pad(source, (512,512), method=Image.Resampling.LANCZOS,
                     color=(0,0,0)).save(thumb, format="AVIF", quality=86, speed=5)
    shutil.copyfile(original_native, archive)
    native_sha, master_sha = digest(archive), digest(master)
    with Image.open(master) as im: assert im.size == (2848,2136)
    with Image.open(thumb) as im: assert im.size == (512,512)

    manifest_path = PUBLIC / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    assert len(manifest["images"]) == 44
    assert sum(x.get("largeViewEnabled") is True for x in manifest["images"]) == 14
    photo = next(x for x in manifest["images"] if x["id"] == ID)
    assert photo["index"] == 15 and photo["atlas"] == "pizza-marinara-768.avif"
    assert photo["catalogId"] == ID and photo["kind"] == "AI-illustrasjon"
    assert not photo.get("largeSource") and not photo.get("largeViewEnabled")
    photo.update({
      "atlas": thumb.name,
      "kind": "Redaksjonelt rettfoto",
      "variantCaution": ("Lisensiert redaksjonelt foto av hel napolitansk pizza marinara "
          "uten ost, med tomatsaus, hvitløk, oregano og olje på svart bakgrunn. "
          "Ikke restaurantfoto; ikke bruk som pizza margherita."),
      "largeSourceOriginalPath": "assets/fysen-dish-originals/pizza-marinara.png",
      "largeSource": master.name,
      "largeSourceNativeWidth": 2848,
      "largeSourceNativeHeight": 2136,
      "largeSourceMethod": "independent-original",
      "largeSourceSha256": master_sha,
      "largeSourceOriginalSha256": native_sha,
      "largeSourceReview": "docs/fysen-image-reviews/pizza-marinara.md",
      "largeViewEnabled": True,
      "photoCredit": AUTHOR + ", CC BY-SA 2.0 (bearbeidet)",
      "photoSource": SOURCE,
      "photoLicense": LICENSE,
      "photoLicenseNotice": "/dish-images/pizza-marinara-LICENSE.txt"
    })
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")

    notice.write_text(
      "Pizza marinara – redaksjonelt fotografi (tilpasset fra original)\n"
      "Foto: Peter Van den Bossche / Wikimedia Commons\n"
      "Original: " + SOURCE + "\n"
      "Lisens: Creative Commons Navngivelse-DelPåSammeVilkår 2.0 (CC BY-SA 2.0), " + LICENSE + "\n"
      "Endringer: Originalfoto i ekte 2848 × 2136 piksler er frilagt mot helsvart bakgrunn. "
      "Ingen ny mat er generert, ingen kildepiksler oppskalert. Egen AVIF-storfil og "
      "512 × 512 AVIF-miniatyr. Bearbeidet bildefil er lisensiert under CC BY-SA 2.0; "
      "krediter fotograf, oppgi kilde og angitt lisens, og viderefør samme lisens "
      "ved bearbeiding og deling.\n"
      "Dette er representativt rettfoto, ikke en bestemt restaurants servering.\n"
      "Original JPEG SHA-256: " + ORIGINAL_SHA + "\n"
      "Bearbeidet PNG SHA-256: " + native_sha + "\n",
      encoding="utf-8")

    note.write_text(
      "# Pizza marinara – kildeverifisert, skarp original (20. november 2026)\n\n"
      "**Vurdering:** Korrekt marinara uten ost og oliven, hel pizza på svart bakgrunn. "
      "Ikke representasjon av en bestemt Fysen-restaurant.\n\n"
      "- Fotograf: Peter Van den Bossche / Wikimedia Commons, " + SOURCE + "\n"
      "- Lisens: CC BY-SA 2.0, " + LICENSE + ", bearbeidelse på samme vilkår.\n"
      "- Original fotografi: 2848 × 2136 JPEG, SHA-256 " + ORIGINAL_SHA + "\n"
      "- Alternative 6016 × 4016 Ruthven/CC0 ble avvist fordi pizzakanten er beskåret nederst.\n"
      "- Originale 1400 × 1400 ekte-pikselutsnitt kontrollert, ingen collage eller oppskalering.\n"
      "- Svart bakgrunn: GrabCut + punktvis fjerning av kald, lys tallerkenrest; "
      "pizzaens fulle kant beholdt. Detaljer og originalfarger fra kildeopptak bevart.\n"
      "- Separat pizza-marinara-master-2848.avif og pizza-marinara-thumb-512.avif.\n"
      "- Bearbeidet PNG er bevart utenfor public; originalkilde SHA-låst.\n"
      "- Ikke publisert i Vercel/main; mobil-/iPad-produksjonstest er ikke kjørt.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Retained reviewed PNG SHA-256: " + native_sha + "\n"
      "Matched inspected black preview SHA-256: " + selected_sha + "\n",
      encoding="utf-8")

    patch(WEB / "styles/dish-photos.css",
          '  background: #000 url("/dish-images/pizza-marinara-768.avif") center / cover no-repeat;',
          '  background: #000 url("/dish-images/pizza-marinara-thumb-512.avif") center / contain no-repeat;')
    gallery = WEB / "components/dish-photo-gallery.tsx"
    patch(gallery,
          '          <small>Tiramisu-foto: Arian Fernandez / Pexels, <a href="/dish-images/tiramisu-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>',
          '          <small>Tiramisu-foto: Arian Fernandez / Pexels, <a href="/dish-images/tiramisu-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>\n'
          '          <a href="/dish-images/pizza-marinara-master-2848.avif" target="_blank" rel="noopener noreferrer">\n'
          '            Pizza marinara <span aria-hidden="true">↗</span>\n'
          '          </a>\n'
          '          <small>Pizza marinara-foto: Peter Van den Bossche / Wikimedia Commons, <a href="/dish-images/pizza-marinara-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-SA 2.0 og kilde</a>.</small>')
    patch(gallery,
          ': isButterChicken ? "Redaksjonelt foto av butter chicken med kyllinglår i kremet saus, ikke restaurantfoto" : `KI-illustrasjon av ${illustratedVariant}, ikke restaurantfoto`',
          ': isButterChicken ? "Redaksjonelt foto av butter chicken med kyllinglår i kremet saus, ikke restaurantfoto" : isPizzaMarinara ? "Redaksjonelt foto av pizza marinara uten ost, ikke restaurantfoto" : `KI-illustrasjon av ${illustratedVariant}, ikke restaurantfoto`')

    testfile = WEB / "tests/dish-photo-gallery.test.mjs"
    test = testfile.read_text(encoding="utf-8")
    assert "approved.length, 14" in test
    test = test.replace("approved.length, 14", "approved.length, 15", 1)
    test = test.replace(
        "seared white fish and tiramisu need approved full-size masters",
        "seared white fish, tiramisu and pizza marinara need approved full-size masters",1)
    test = test.replace('index === 15 ? "pizza-marinara-768.avif"',
                        'index === 15 ? "pizza-marinara-thumb-512.avif"',1)
    assert "[0,1,2,3,4,5,6,7,8,10,11,12,13,14].includes(index)" in test
    test = test.replace("[0,1,2,3,4,5,6,7,8,10,11,12,13,14].includes(index)",
                        "[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15].includes(index)",1)
    test = test.replace('const marinaraImage = readFileSync(path.join(web, "public/dish-images/pizza-marinara-768.avif"));',
                        'const marinaraImage = readFileSync(path.join(web, "public/dish-images/pizza-marinara-thumb-512.avif"));',1)
    old_test = 'test("Pizza marinara and falafel use exact dedicated 768px illustration assets", () => {'
    assert old_test in test
    test = test.replace(old_test, 'test("Falafel keeps its own dedicated 768px illustration", () => {',1)
    old_row = '    { index: 15, id: "pizza-marinara", file: "pizza-marinara-768.avif", bytes: marinaraImage, className: "dishPhotoPizzaMarinara" },\n'
    assert old_row in test
    test = test.replace(old_row,"",1)
    testfile.write_text(test, encoding="utf-8")
    tests = testfile.read_text(encoding="utf-8")
    anchor = 'test("Falafel keeps its own dedicated 768px illustration", () => {'
    assert tests.count(anchor) == 1
    new_test = '''test("Pizza marinara uses a separate authentic native master and compact 512 AVIF", () => {
  const p = manifest.images[15];
  assert.equal(p.id, "pizza-marinara");
  assert.equal(p.catalogId, "pizza-marinara");
  assert.equal(p.kind, "Redaksjonelt rettfoto");
  assert.equal(p.largeViewEnabled, true);
  assert.equal(p.atlas, "pizza-marinara-thumb-512.avif");
  assert.equal(p.largeSource, "pizza-marinara-master-2848.avif");
  assert.equal(p.largeSourceNativeWidth, 2848);
  assert.equal(p.largeSourceNativeHeight, 2136);
  assert.match(p.photoCredit, /Peter Van den Bossche.*CC BY-SA 2\\.0/u);
  assert.match(p.photoSource, /commons\\.wikimedia\\.org/u);
  assert.match(p.variantCaution, /uten ost/u);
  assert.match(p.variantCaution, /ikke bruk som pizza margherita/iu);
  const marker = marinaraImage.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(marinaraImage.readUInt32BE(marker + 8), 512);
  assert.equal(marinaraImage.readUInt32BE(marker + 12), 512);
  assert.match(gallery, /href="\\/dish-images\\/pizza-marinara-master-2848\\.avif"/u);
  assert.match(css, /pizza-marinara-thumb-512\\.avif/u);
  assert.match(gallery, /pizza marinara uten ost/u);
});

'''
    tests = tests.replace(anchor,new_test+anchor,1)
    testfile.write_text(tests,encoding="utf-8")
    black["reviewed_variant"] = "black-grabcut"
    black["reviewed_preview_sha256"] = selected_sha
    black["retained_native_sha256"] = native_sha
    black["full_avif_sha256"] = master_sha
    black["visual_review_completed"] = True
    black["approved_for_fysen"] = True
    black["published"] = False
    black_path.write_text(json.dumps(black, ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    review["visual_review_completed"] = True
    review["license_verified"] = True
    review["approved_for_fysen"] = True
    review["published"] = False
    review_path.write_text(json.dumps(review,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print("PROMOTED ONLY into draft branch: genuine pizza marinara, 2848x2136 and 512x512, SHA-locked, unpublished. Expected 15/44 draft; main remains 10/44.")

if __name__ == "__main__":
    main()
