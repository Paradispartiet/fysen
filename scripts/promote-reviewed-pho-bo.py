#!/usr/bin/env python3
"""Create approved native phở bò photo assets in DRAFT stack, not production.

The original source AND exact displayed preview are SHA-locked. This script
reproduces the preview, builds the native large image and separate thumbnail,
updates only the Matlyst gallery, license, review and focused tests.
"""
from __future__ import annotations
from hashlib import sha256
from pathlib import Path
import json
import runpy
import shutil

from PIL import Image, ImageOps
import pillow_avif  # noqa: F401

ROOT=Path(__file__).resolve().parents[1]
C=ROOT/"assets/fysen-image-candidates/pho-bo/undo-kim-pexels"
WEB=ROOT/"apps/web"
PUBLIC=WEB/"public/dish-images"
SOURCE_SHA="db5888021b873610a5a9987068008ef6a1d484d5ca0bc7454a9089c78df7b9e9"
SOURCE_PAGE="https://www.pexels.com/photo/delicious-bowl-of-traditional-vietnamese-pho-34683316/"
PHOTO_LICENSE="https://www.pexels.com/license/"
AUTHOR="UNDO KIM / Pexels"

def digest(file: Path) -> str:
    return sha256(file.read_bytes()).hexdigest()

def replace_unique(file: Path, before: str, after: str) -> None:
    content=file.read_text(encoding="utf8")
    assert content.count(before)==1,f"Expected one anchored replacement in {file}: {before[:100]}"
    file.write_text(content.replace(before,after,1),encoding="utf8")

def main() -> None:
    review_file=C/"review.json"
    black_file=C/"black-review.json"
    metadata=json.loads(review_file.read_text(encoding="utf8"))
    audit=json.loads(black_file.read_text(encoding="utf8"))
    assert metadata["source_sha256"]==SOURCE_SHA and metadata["download_verified"]
    assert (metadata["native_width"],metadata["native_height"])==(5472,3648)
    assert metadata["no_upscale"] and metadata["published"] is False
    assert not metadata["approved_for_fysen"]
    assert audit["source_sha256"]==SOURCE_SHA and audit["source_native_dimensions"]==[5472,3648]
    assert audit["no_upscale"] and not audit["food_pixels_generated"]
    assert not audit["approved_for_fysen"] and not audit["published"]

    selected="black-grabcut"
    preview=C/f"{selected}-preview.jpg"
    assert preview.is_file() and (C/f"{selected}-native-detail-1400.jpg").is_file()
    approved_preview_hash=digest(preview)
    # Recreate directly from SHA-locked ORIGINAL, not from resized preview.
    runpy.run_path(str(ROOT/"scripts/preview-pho-bo-black.py"),run_name="__main__")
    assert digest(preview)==approved_preview_hash,"Regenerated preview differs from inspected candidate."
    source_native=C/f"{selected}-native.png"

    archive=ROOT/"assets/fysen-dish-originals/pho-bo.png"
    full=PUBLIC/"pho-bo-master-5472.avif"
    small=PUBLIC/"pho-bo-thumb-512.avif"
    license_notice=PUBLIC/"pho-bo-LICENSE.txt"
    review_note=ROOT/"docs/fysen-image-reviews/pho-bo.md"
    for file in (archive,full,small,license_notice,review_note):
        assert not file.exists(),f"Would overwrite a prior approved asset: {file}"

    with Image.open(source_native) as im:
        im.load()
        assert im.mode=="RGB" and im.size==(5472,3648)
        assert all(im.getpixel(pt)==(0,0,0) for pt in
                   ((0,0),(5471,0),(0,3647),(5471,3647)))
        im.save(full,format="AVIF",quality=89,speed=5)
        ImageOps.pad(im,(512,512),method=Image.Resampling.LANCZOS,
                     color=(0,0,0)).save(small,format="AVIF",quality=86,speed=5)
    shutil.copyfile(source_native,archive)
    original_native_sha=digest(archive)
    avif_sha=digest(full)
    with Image.open(full) as im: assert im.size==(5472,3648)
    with Image.open(small) as im: assert im.size==(512,512)

    manifest_file=PUBLIC/"manifest.json"
    manifest=json.loads(manifest_file.read_text(encoding="utf8"))
    assert len(manifest["images"])==44
    assert sum(x.get("largeViewEnabled") is True for x in manifest["images"])==17
    photo=next(x for x in manifest["images"] if x["id"]=="pho")
    assert photo["index"]==18 and photo["catalogId"]=="pho"
    assert photo["kind"]=="AI-illustrasjon" and photo["atlas"]=="pho-512.avif"
    assert not photo.get("largeViewEnabled") and not photo.get("largeSource")
    photo.update({
        "atlas":small.name,
        "kind":"Redaksjonelt rettfoto",
        "variantCaution":("Lisensiert redaksjonelt foto av phở bò med storfekjøtt, "
           "risnudler, brun kraft, bønnespirer og grønt i hel hvit skål på sort "
           "bakgrunn. Ikke bruk som kylling- eller vegetarphở og ikke som "
           "dokumentasjon av en bestemt restaurants servering."),
        "largeSourceOriginalPath":"assets/fysen-dish-originals/pho-bo.png",
        "largeSource":full.name,
        "largeSourceNativeWidth":5472,
        "largeSourceNativeHeight":3648,
        "largeSourceMethod":"independent-original",
        "largeSourceSha256":avif_sha,
        "largeSourceOriginalSha256":original_native_sha,
        "largeSourceReview":"docs/fysen-image-reviews/pho-bo.md",
        "largeViewEnabled":True,
        "photoCredit":AUTHOR,
        "photoSource":SOURCE_PAGE,
        "photoLicense":PHOTO_LICENSE,
        "photoLicenseNotice":"/dish-images/pho-bo-LICENSE.txt",
    })
    manifest_file.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf8")

    license_notice.write_text(
       "Phở bò – bearbeidet redaksjonelt fotografi\n"
       "Fotograf: "+AUTHOR+"\n"
       "Original: "+SOURCE_PAGE+"\n"
       "Lisens: Pexels License, "+PHOTO_LICENSE+"\n"
       "Endringer: Originaloppløselig foto (5472 × 3648) er forsiktig frilagt "
       "fra trebord, duk og spisepinner slik at én hel skål phở bò står mot "
       "svart bakgrunn. Ingen mat er generert, lagt til eller forstørret. "
       "Separat originaloppløst AVIF-master og 512 × 512 AVIF-miniatyr.\n"
       "Representativt rettfoto, ikke restaurantservering.\n"
       "Original JPEG SHA-256: "+SOURCE_SHA+"\n"
       "Bearbeidet PNG SHA-256: "+original_native_sha+"\n",
       encoding="utf8")

    review_note.write_text(
       "# Phở bò – kvalitetssikret ekte storbilde (20. november 2026)\n\n"
       "**Valgt:** Én hel phở bò-skål med storfekjøtt, nudler, kraft, bønnespirer "
       "og vårløk på svart bakgrunn; ingen fremmed duk eller spisepinner.\n\n"
       "- Fotograf: "+AUTHOR+", "+SOURCE_PAGE+"\n"
       "- Lisens: Pexels License, "+PHOTO_LICENSE+"\n"
       "- Ekte kildefoto: 5472 × 3648, JPEG SHA-256 "+SOURCE_SHA+"\n"
       "- Fem kildefotografier gjennomgått. UNDO KIM valgt for synlig full "
       "skål med riktig storfekjøtt-variant. De andre er ikke promotert.\n"
       "- Naturlig svarte kontur- og GrabCut-varianter gjennomgått. "
       "Valgt GrabCut, med fjerning av utenforliggende blå duk og mørkt trebord.\n"
       "- Originalt 1400 × 1400 kildepikselutsnitt kontrollert, ingen oppskalering "
       "eller generering av mat.\n"
       "- Full master: pho-bo-master-5472.avif (5472 × 3648). "
       "Separat thumb: pho-bo-thumb-512.avif (512 × 512).\n"
       "- Illustrativt rettfoto, ikke bevis for en restaurants meny.\n"
       "- Ingen produksjonspublisering eller main-merge. "
       "Fysisk nettlesertest på iPad er ikke gjennomført.\n\n"
       "Reviewed for full-size display: yes\n"
       "No collage crop or upscale: yes\n"
       "Correct beef-phở dish and black background: yes\n\n"
       "Reviewed source-native PNG SHA-256: "+original_native_sha+"\n"
       "Visually inspected preview SHA-256: "+approved_preview_hash+"\n",
       encoding="utf8")

    css=WEB/"styles/dish-photos.css"
    replace_unique(css,
      "/* Dedicated sharp Phở bò image: exact catalog ID only. */",
      "/* Phở bò: genuine source-verified photographic thumbnail for this exact dish ID. */")
    replace_unique(css,
      'background: #000 url("/dish-images/pho-512.avif") center / cover no-repeat;',
      'background: #000 url("/dish-images/pho-bo-thumb-512.avif") center / contain no-repeat;')

    gallery=WEB/"components/dish-photo-gallery.tsx"
    replace_unique(gallery,
      '          <small>Gyoza-foto: Lara Bellens / Pexels, <a href="/dish-images/gyoza-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>',
      '          <small>Gyoza-foto: Lara Bellens / Pexels, <a href="/dish-images/gyoza-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>\n'
      '          <a href="/dish-images/pho-bo-master-5472.avif" target="_blank" rel="noopener noreferrer">\n'
      '            Phở bò <span aria-hidden="true">↗</span>\n'
      '          </a>\n'
      '          <small>Phở bò-foto: UNDO KIM / Pexels, <a href="/dish-images/pho-bo-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>')
    replace_unique(gallery,
      ': isGyoza ? "Redaksjonelt foto av seks pannestekte gyoza med soyadipp, ikke restaurantfoto" : ',
      ': isGyoza ? "Redaksjonelt foto av seks pannestekte gyoza med soyadipp, ikke restaurantfoto" : isPho ? "Redaksjonelt foto av phở bò med storfekjøtt, nudler og kraft, ikke restaurantfoto" : ')

    test_path=WEB/"tests/dish-photo-gallery.test.mjs"
    tests=test_path.read_text(encoding="utf8")
    def edit(old,new):
        nonlocal tests
        assert tests.count(old)==1,f"Gallery test unique anchor missing: {old[:85]}"
        tests=tests.replace(old,new,1)

    edit('approved.length, 17','approved.length, 18')
    edit('cacio e pepe and gyoza need approved full-size masters',
         'cacio e pepe, gyoza and phở bò need approved full-size masters')
    edit('index === 18 ? "pho-512.avif"','index === 18 ? "pho-bo-thumb-512.avif"')
    edit('[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17].includes(index)',
         '[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18].includes(index)')
    edit('const pho = readFileSync(path.join(web, "public/dish-images/pho-512.avif"));',
         'const pho = readFileSync(path.join(web, "public/dish-images/pho-bo-thumb-512.avif"));')
    edit('test("Phở bò uses dedicated sharp 512px art without adding a false gallery entry", () => {',
         'test("Phở bò uses source-verified full master and separate 512px thumbnail", () => {')
    edit('assert.match(css, /pho-512\\.avif/u);',
         'assert.match(css, /pho-bo-thumb-512\\.avif/u);')
    edit('assert.equal(photo.atlas, "pho-512.avif");',
         '''assert.equal(photo.atlas, "pho-bo-thumb-512.avif");
  assert.equal(photo.kind, "Redaksjonelt rettfoto");
  assert.equal(photo.largeViewEnabled, true);
  assert.equal(photo.largeSource, "pho-bo-master-5472.avif");
  assert.equal(photo.largeSourceNativeWidth, 5472);
  assert.equal(photo.largeSourceNativeHeight, 3648);
  assert.match(photo.photoCredit, /UNDO KIM.*Pexels/u);
  assert.match(photo.photoSource, /^https:\\/\\/www\\.pexels\\.com\\/photo\\//u);
  assert.match(gallery, /href="\\/dish-images\\/pho-bo-master-5472\\.avif"/u);''')
    test_path.write_text(tests,encoding="utf8")

    audit.update({"reviewed_variant":selected,"visually_inspected_preview_sha256":approved_preview_hash,
                  "retained_native_sha256":original_native_sha,"large_avif_sha256":avif_sha,
                  "visual_review_completed":True,"approved_for_fysen":True,"published":False})
    black_file.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    metadata.update({"visual_review_completed":True,"approved_for_fysen":True,"published":False})
    review_file.write_text(json.dumps(metadata,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("DRAFT ONLY: 18/44 approved sharp full-size phở bò photos in PR; main unchanged.")

if __name__=="__main__":
    main()
