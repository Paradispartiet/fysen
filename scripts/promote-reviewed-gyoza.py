#!/usr/bin/env python3
"""Promote ONE visually approved gyoza photo to an unpublished draft PR branch."""
from __future__ import annotations
from hashlib import sha256
from pathlib import Path
import json,runpy,shutil
from PIL import Image,ImageOps
import pillow_avif  # noqa: F401

ROOT=Path(__file__).resolve().parents[1]
C=ROOT/"assets/fysen-image-candidates/gyoza/lara-bellens-pexels"
WEB=ROOT/"apps/web"
PUBLIC=WEB/"public/dish-images"
SRC_SHA="413f380af0bf03a2da46effa445cf47b85fed242882a214be2fc6863a5ceb5fc"
PAGE="https://www.pexels.com/photo/delicious-fried-dumplings-with-soy-sauce-dip-35583239/"
LICENSE="https://www.pexels.com/license/"
AUTHOR="Lara Bellens / Pexels"

def sha(path):
    return sha256(path.read_bytes()).hexdigest()
def patch(path,old,new):
    old_text=path.read_text(encoding="utf8")
    assert old_text.count(old)==1,f"Missing/non-unique anchor: {path} {old[:80]}"
    path.write_text(old_text.replace(old,new,1),encoding="utf8")

def main():
    review_json=C/"review.json"
    audit_json=C/"black-review.json"
    review=json.loads(review_json.read_text(encoding="utf8"))
    audit=json.loads(audit_json.read_text(encoding="utf8"))
    assert review["original_sha256"]==SRC_SHA and review["download_verified"]
    assert (review["native_width"],review["native_height"])==(4937,3662)
    assert review["no_upscale"] and not review["approved_for_fysen"] and not review["published"]
    assert audit["source_original_sha256"]==SRC_SHA
    assert audit["original_native_dimensions"]==[4937,3662]
    assert audit["unscaled_native"] and not audit["generated_food_pixels"]
    assert not audit["approved_for_fysen"] and not audit["published"]
    chosen="black-grabcut"
    preview=C/f"{chosen}-preview.jpg"
    inspected_sha=sha(preview)
    assert (C/f"{chosen}-native-detail-1400.jpg").is_file()
    # Validate that the output EXACTLY matches the previously visually reviewed preview.
    runpy.run_path(str(ROOT/"scripts/preview-gyoza-black.py"),run_name="__main__")
    assert sha(preview)==inspected_sha,"Source pixels/preview differ from inspected candidate"
    native=C/f"{chosen}-native.png"
    archive=ROOT/"assets/fysen-dish-originals/gyoza.png"
    master=PUBLIC/"gyoza-master-4937.avif"
    thumbnail=PUBLIC/"gyoza-thumb-512.avif"
    notice=PUBLIC/"gyoza-LICENSE.txt"
    review_md=ROOT/"docs/fysen-image-reviews/gyoza.md"
    for dest in (archive,master,thumbnail,notice,review_md):
        assert not dest.exists(),f"Do not overwrite existing source/asset: {dest}"
    with Image.open(native) as im:
        im.load()
        assert im.mode=="RGB" and im.size==(4937,3662)
        assert all(im.getpixel(pt)==(0,0,0) for pt in [(0,0),(4936,0),(0,3661),(4936,3661)])
        im.save(master,format="AVIF",quality=88,speed=5)
        ImageOps.pad(im,(512,512),method=Image.Resampling.LANCZOS,
                     color=(0,0,0)).save(thumbnail,format="AVIF",quality=86,speed=5)
    shutil.copyfile(native,archive)
    native_sha,master_sha=sha(archive),sha(master)
    with Image.open(master) as im: assert im.size==(4937,3662)
    with Image.open(thumbnail) as im: assert im.size==(512,512)

    manifest_path=PUBLIC/"manifest.json"
    manifest=json.loads(manifest_path.read_text(encoding="utf8"))
    assert len(manifest["images"])==44
    assert sum(img.get("largeViewEnabled") is True for img in manifest["images"])==16
    photo=next(i for i in manifest["images"] if i["id"]=="gyoza")
    assert photo["index"]==17 and photo["catalogId"]=="gyoza"
    assert photo["kind"]=="AI-illustrasjon" and photo["atlas"]=="gyoza-768.avif"
    assert not photo.get("largeSource") and not photo.get("largeViewEnabled")
    photo.update({
      "atlas":thumbnail.name,"kind":"Redaksjonelt rettfoto",
      "variantCaution":("Lisensiert redaksjonelt foto av seks pannestekte gyoza "
      "med soyadipp, sesam og grønt på blå tallerken mot sort bakgrunn. "
      "Fyllet er ikke dokumentert: må ikke regnes som vegetarisk. "
      "Ikke restaurantfoto eller dokumentasjon av en bestemt meny."),
      "largeSourceOriginalPath":"assets/fysen-dish-originals/gyoza.png",
      "largeSource":master.name,
      "largeSourceNativeWidth":4937,"largeSourceNativeHeight":3662,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":master_sha,
      "largeSourceOriginalSha256":native_sha,
      "largeSourceReview":"docs/fysen-image-reviews/gyoza.md",
      "largeViewEnabled":True,
      "photoCredit":AUTHOR,"photoSource":PAGE,"photoLicense":LICENSE,
      "photoLicenseNotice":"/dish-images/gyoza-LICENSE.txt"
    })
    manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf8")

    notice.write_text(
      "Gyoza – bearbeidet redaksjonelt matfoto\n"
      "Fotograf: Lara Bellens / Pexels\n"
      "Original: "+PAGE+"\n"
      "Lisens: Pexels License, "+LICENSE+"\n"
      "Bearbeidelse: Faktisk 4937 × 3662 pikslers fotografi av seks gyoza med "
      "soyadipp på en hel blå tallerken er frilagt mot svart bakgrunn uten "
      "å lage matpiksler eller oppskalere. Egen fulloppløselig AVIF og "
      "512×512 AVIF-miniatyr. Redaksjonelt illustrasjonsfoto av rettetype, "
      "ikke foto fra en bestemt restaurant.\n"
      "Original JPEG SHA-256: "+SRC_SHA+"\n"
      "Bearbeidet PNG SHA-256: "+native_sha+"\n",
      encoding="utf8")
    review_md.write_text(
      "# Gyoza – originalkilde og kvalitetsgodkjenning (20. november 2026)\n\n"
      "**Resultat:** Seks gylne japanske pannestekte gyoza med soyadipp i en liten "
      "metallskål, på en hel blå tallerken mot helsvart bakgrunn. Matens fyllet "
      "er ikke kjent og må ikke feilaktig kalles vegetarisk. Ikke restaurantfoto.\n\n"
      "- Fotograf: Lara Bellens / Pexels, "+PAGE+"\n"
      "- Lisens: Pexels License, "+LICENSE+"\n"
      "- Ekte 4937 × 3662 kilde-JPEG, SHA-256 "+SRC_SHA+"\n"
      "- Fire originalbilder bestod kildekontroll; ett annet originalforsøk "
      "ble avvist. Beste helservering valgt etter faktisk visuell kontroll.\n"
      "- 1400 × 1400 originale piksler inspisert. Ingen oppskalering/collage/generert mat.\n"
      "- Svart bakgrunn frilagt via kontrollert GrabCut og utvendig fjerning "
      "av varme trefarger, med både gyozaene, metallskålen og blå tallerken bevart.\n"
      "- AVIF-master gyoza-master-4937.avif (4937×3662) og separat "
      "gyoza-thumb-512.avif (512×512).\n"
      "- Ingen endringer i restaurantmenyer, priser eller databaser.\n"
      "- Ikke publisert på main/Vercel. Fysisk iPad/mobiltest gjenstår.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Original processed PNG SHA-256: "+native_sha+"\n"
      "Visual preview SHA-256: "+inspected_sha+"\n",encoding="utf8")

    css=WEB/"styles/dish-photos.css"
    patch(css,
      "/* Gyoza: sharp single-dish illustration for its exact editorial ID only. */",
      "/* Gyoza: real source-verified photo, compact standalone AVIF, exact editorial dish only. */")
    patch(css,
      'background: #000 url("/dish-images/gyoza-768.avif") center / cover no-repeat;',
      'background: #000 url("/dish-images/gyoza-thumb-512.avif") center / contain no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    patch(gallery,
      '          <small>Cacio e pepe-foto: DC (DocteurCosmos) / Wikimedia Commons, <a href="/dish-images/cacio-e-pepe-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0 og kilde</a>.</small>',
      '          <small>Cacio e pepe-foto: DC (DocteurCosmos) / Wikimedia Commons, <a href="/dish-images/cacio-e-pepe-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0 og kilde</a>.</small>\n'
      '          <a href="/dish-images/gyoza-master-4937.avif" target="_blank" rel="noopener noreferrer">\n'
      '            Gyoza <span aria-hidden="true">↗</span>\n'
      '          </a>\n'
      '          <small>Gyoza-foto: Lara Bellens / Pexels, <a href="/dish-images/gyoza-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>')
    patch(gallery,
      ': isCacioEPepe ? "Redaksjonelt foto av cacio e pepe med pecorino og sort pepper, ikke restaurantfoto" : ',
      ': isCacioEPepe ? "Redaksjonelt foto av cacio e pepe med pecorino og sort pepper, ikke restaurantfoto" : isGyoza ? "Redaksjonelt foto av seks pannestekte gyoza med soyadipp, ikke restaurantfoto" : ')

    testfile=WEB/"tests/dish-photo-gallery.test.mjs"
    content=testfile.read_text(encoding="utf8")
    def edit(before,after):
        nonlocal content
        assert content.count(before)==1,f"Test anchor missing/nonunique {before[:80]}"
        content=content.replace(before,after,1)
    edit("approved.length, 16","approved.length, 17")
    edit("pizza marinara and cacio e pepe need approved full-size masters",
         "pizza marinara, cacio e pepe and gyoza need approved full-size masters")
    edit('index === 17 ? "gyoza-768.avif"','index === 17 ? "gyoza-thumb-512.avif"')
    edit('[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16].includes(index)',
         '[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17].includes(index)')
    edit('const gyozaImage = readFileSync(path.join(web, "public/dish-images/gyoza-768.avif"));',
         'const gyozaImage = readFileSync(path.join(web, "public/dish-images/gyoza-thumb-512.avif"));')
    edit('test("Gyoza illustration is a full standalone 768px image with exact dish ID and no invented filling", () => {',
         'test("Gyoza is a real source-verified 4937px photo with 512px mini and no invented filling", () => {')
    gyoza_old='''  assert.equal(gyozaImage.readUInt32BE(ispe + 8), 768);
  assert.equal(gyozaImage.readUInt32BE(ispe + 12), 768);'''
    gyoza_new='''  assert.equal(gyozaImage.readUInt32BE(ispe + 8), 512);
  assert.equal(gyozaImage.readUInt32BE(ispe + 12), 512);'''
    edit(gyoza_old,gyoza_new)
    edit('assert.equal(item.atlas, "gyoza-768.avif");',
         '''assert.equal(item.atlas, "gyoza-thumb-512.avif");
  assert.equal(item.kind, "Redaksjonelt rettfoto");
  assert.equal(item.largeViewEnabled, true);
  assert.equal(item.largeSource, "gyoza-master-4937.avif");
  assert.equal(item.largeSourceNativeWidth, 4937);
  assert.equal(item.largeSourceNativeHeight, 3662);
  assert.match(item.photoCredit, /Lara Bellens.*Pexels/u);
  assert.match(item.photoSource, /^https:\\/\\/www\\.pexels\\.com\\/photo\\//u);
  assert.match(gallery, /href="\\/dish-images\\/gyoza-master-4937\\.avif"/u);''')
    edit('assert.ok(css.includes("gyoza-768.avif"));',
         'assert.ok(css.includes("gyoza-thumb-512.avif"));')
    testfile.write_text(content,encoding="utf8")
    audit.update({
      "reviewed_variant":chosen,"preview_sha256":inspected_sha,
      "native_processed_sha256":native_sha,"avif_master_sha256":master_sha,
      "visual_review_completed":True,"approved_for_fysen":True,"published":False
    })
    audit_json.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    review.update({"visual_review_completed":True,"approved_for_fysen":True,
                   "published":False})
    review_json.write_text(json.dumps(review,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("DRAFT GYOZA: 4937x3662 native AVIF + 512x512 mini, 17/44 in PR, NO PRODUCTION RELEASE")

if __name__=="__main__":
    main()
