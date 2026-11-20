#!/usr/bin/env python3
"""Integrate visually inspected genuine cacio e pepe into DRAFT only.

Source SHA + preview SHA locks ensure that the exact preview reviewed is the
source of the master. No public release, restaurant/menu edits or upscale.
"""
from __future__ import annotations
from hashlib import sha256
from pathlib import Path
import runpy, json, shutil
from PIL import Image, ImageOps
import pillow_avif  # noqa: F401

ROOT=Path(__file__).resolve().parents[1]
C=ROOT/"assets/fysen-image-candidates/cacio-e-pepe/docteurcosmos-commons"
WEB=ROOT/"apps/web"
PUBLIC=WEB/"public/dish-images"
SRC_SHA="0a1052ce8f629790850053aa7be8a52b53ee23a68b6914a8dd3199dba6418965"
SOURCE="https://commons.wikimedia.org/wiki/File:Spaghetti_cacio_e_pepe.jpg"
LICENSE="https://creativecommons.org/licenses/by-sa/3.0/"
CREDIT="DC (DocteurCosmos) / Wikimedia Commons, CC BY-SA 3.0 (bearbeidet)"

def sha(path):
    return sha256(Path(path).read_bytes()).hexdigest()

def patch(path,old,new):
    content=path.read_text(encoding="utf8")
    assert content.count(old)==1,f"Expected unique exact anchor for {path}: {old[:80]}"
    path.write_text(content.replace(old,new,1),encoding="utf8")

def main():
    source=C/"review.json"
    audit=C/"black-review.json"
    evidence=json.loads(source.read_text(encoding="utf8"))
    black=json.loads(audit.read_text(encoding="utf8"))
    assert evidence["source_sha256"]==SRC_SHA
    assert (evidence["native_width"],evidence["native_height"])==(4577,2498)
    assert evidence["source_download_verified"] and not evidence["approved_for_fysen"]
    assert evidence["published"] is False and not evidence["visual_review_completed"]
    assert black["source_original_sha256"]==SRC_SHA
    assert black["source_dimensions"]==[4577,2498]
    assert not black["approved_for_fysen"] and not black["published"]
    assert not black["native_pixels_upscaled"] and not black["food_pixels_generated"]
    chosen=C/"black-contour-preview.jpg"
    inspected_sha=sha(chosen)
    assert (C/"black-contour-native-detail-1400.jpg").is_file()
    # Regenerate from exact same source bytes. Stop if pixels are not repeatable.
    runpy.run_path(str(ROOT/"scripts/preview-cacio-e-pepe-black.py"),run_name="__main__")
    assert sha(chosen)==inspected_sha,"BLACK PREVIEW changed from visually inspected version"
    native=C/"black-contour-native.png"
    archive=ROOT/"assets/fysen-dish-originals/cacio-e-pepe.png"
    large=PUBLIC/"cacio-e-pepe-master-4577.avif"
    mini=PUBLIC/"cacio-e-pepe-thumb-512.avif"
    notice=PUBLIC/"cacio-e-pepe-LICENSE.txt"
    review=ROOT/"docs/fysen-image-reviews/cacio-e-pepe.md"
    for path in (archive,large,mini,notice):
        assert not path.exists(),f"Cannot overwrite prior photo: {path}"
    with Image.open(native) as im:
        im.load()
        assert im.mode=="RGB" and im.size==(4577,2498)
        assert all(im.getpixel(pt)==(0,0,0) for pt in ((0,0),(4576,0),(0,2497),(4576,2497)))
        im.save(large,format="AVIF",quality=89,speed=5)
        ImageOps.pad(im,(512,512),method=Image.Resampling.LANCZOS,
                     color=(0,0,0)).save(mini,format="AVIF",quality=86,speed=5)
    shutil.copyfile(native,archive)
    native_sha=sha(archive)
    full_sha=sha(large)
    with Image.open(large) as im:assert im.size==(4577,2498)
    with Image.open(mini) as im:assert im.size==(512,512)

    manifest_path=PUBLIC/"manifest.json"
    manifest=json.loads(manifest_path.read_text(encoding="utf8"))
    assert len(manifest["images"])==44
    assert sum(x.get("largeViewEnabled") is True for x in manifest["images"])==15
    photo=next(x for x in manifest["images"] if x["id"]=="cacio-e-pepe")
    assert photo["index"]==16 and photo["catalogId"]=="cacio-e-pepe"
    assert photo["kind"]=="AI-illustrasjon" and photo["atlas"]=="cacio-e-pepe-768.avif"
    assert not photo.get("largeSource") and not photo.get("largeViewEnabled")
    photo.update({
      "atlas":mini.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":"Lisensiert redaksjonelt rettfoto av cacio e pepe med spaghetti, pecorino og sort pepper på en hel tallerken, mot svart bakgrunn. Inneholder melk. Ikke restaurantfoto fra Fysen og ikke dokumentasjon av en bestemt meny.",
      "largeSourceOriginalPath":"assets/fysen-dish-originals/cacio-e-pepe.png",
      "largeSource":large.name,
      "largeSourceNativeWidth":4577,
      "largeSourceNativeHeight":2498,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":full_sha,
      "largeSourceOriginalSha256":native_sha,
      "largeSourceReview":"docs/fysen-image-reviews/cacio-e-pepe.md",
      "largeViewEnabled":True,
      "photoCredit":CREDIT,
      "photoSource":SOURCE,
      "photoLicense":LICENSE,
      "photoLicenseNotice":"/dish-images/cacio-e-pepe-LICENSE.txt"
    })
    manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    notice.write_text(
      "Cacio e pepe – bearbeidet redaksjonelt rettfoto\n"
      "Foto: DC (DocteurCosmos) / Wikimedia Commons\n"
      "Original: "+SOURCE+"\n"
      "Lisens: Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0), "+LICENSE+"\n"
      "Endringer: Originalfotografiet (4577 x 2498) er frilagt med kontrollert "
      "tallerkenkontur mot helsvart bakgrunn. Hele pastaen og tallerkenen "
      "beholdt uten oppskalering, collage eller generert mat. Eget AVIF-storbilde "
      "og 512 x 512 AVIF-miniatyr. Bearbeidelsen distribueres under CC BY-SA 3.0: "
      "krediter fotograf, lenk til kilde og lisens, oppgi endringer og viderefør "
      "samme eller kompatibel ShareAlike-lisens.\n"
      "Representativt rettfoto, ikke fotografi av en Fysen-restaurant eller en dokumentert Fysen-meny.\n"
      "Original JPEG SHA-256: "+SRC_SHA+"\n"
      "Bearbeidet PNG SHA-256: "+native_sha+"\n",encoding="utf8")
    review.write_text(
      "# Cacio e pepe – kvalitetsgodkjent autentisk storfoto (20. november 2026)\n\n"
      "**Resultat:** Ekte spaghetti med ost og pepper, hel porsjon og hel tallerken "
      "på svart bakgrunn, uten annen mat eller bakgrunnsobjekter. Ikke et "
      "foto fra en konkret restaurant i Fysen.\n\n"
      "- Fotograf: DC (DocteurCosmos) / Wikimedia Commons, "+SOURCE+"\n"
      "- Lisens: CC BY-SA 3.0, "+LICENSE+", bearbeidelse under samme vilkår.\n"
      "- Original: 4577 × 2498 JPEG, SHA-256 "+SRC_SHA+"\n"
      "- Fire ekte fotokilder ble vurdert. DocteurCosmos har komplett tallerken "
      "og kildebevist original detalj. De tre andre ble ikke godkjent som hel servering.\n"
      "- Kontur- og GrabCut-frilegging ble inspisert. Den valgte konturvarianten "
      "har naturlig hel tallerken uten glass eller gule maskebiter. GrabCut avvist.\n"
      "- Ekte 1400 × 1400 originalpiksler kontrollert. Ingen oppskalering eller KI-mat.\n"
      "- AVIF-master cacio-e-pepe-master-4577.avif (4577 × 2498) og egen "
      "512 × 512 mini cacio-e-pepe-thumb-512.avif.\n"
      "- Redaksjonelt representativt rettfoto, ikke kilde for restaurantenes menyer.\n"
      "- Ingen Vercel-/main-publisering. Fysisk iPad-/mobiltest ikke gjennomført.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Retained reviewed PNG SHA-256: "+native_sha+"\n"
      "Matched visually inspected preview SHA-256: "+inspected_sha+"\n",
      encoding="utf8")

    patch(WEB/"styles/dish-photos.css",
      'background: #000 url("/dish-images/cacio-e-pepe-768.avif") center / cover no-repeat;',
      'background: #000 url("/dish-images/cacio-e-pepe-thumb-512.avif") center / contain no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    patch(gallery,
      '          <small>Pizza marinara-foto: Peter Van den Bossche / Wikimedia Commons, <a href="/dish-images/pizza-marinara-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-SA 2.0 og kilde</a>.</small>',
      '          <small>Pizza marinara-foto: Peter Van den Bossche / Wikimedia Commons, <a href="/dish-images/pizza-marinara-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-SA 2.0 og kilde</a>.</small>\n'
      '          <a href="/dish-images/cacio-e-pepe-master-4577.avif" target="_blank" rel="noopener noreferrer">\n'
      '            Cacio e pepe <span aria-hidden="true">↗</span>\n'
      '          </a>\n'
      '          <small>Cacio e pepe-foto: DC (DocteurCosmos) / Wikimedia Commons, <a href="/dish-images/cacio-e-pepe-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0 og kilde</a>.</small>')
    patch(gallery,
      ': isPizzaMarinara ? "Redaksjonelt foto av pizza marinara uten ost, ikke restaurantfoto" : ',
      ': isPizzaMarinara ? "Redaksjonelt foto av pizza marinara uten ost, ikke restaurantfoto" : isCacioEPepe ? "Redaksjonelt foto av cacio e pepe med pecorino og sort pepper, ikke restaurantfoto" : ')

    test_path=WEB/"tests/dish-photo-gallery.test.mjs"
    tests=test_path.read_text(encoding="utf8")
    assert tests.count("approved.length, 15")==1
    tests=tests.replace("approved.length, 15","approved.length, 16",1)
    tests=tests.replace("tiramisu and pizza marinara need approved full-size masters",
                        "tiramisu, pizza marinara and cacio e pepe need approved full-size masters",1)
    assert tests.count('index === 16 ? "cacio-e-pepe-768.avif"')==1
    tests=tests.replace('index === 16 ? "cacio-e-pepe-768.avif"',
                        'index === 16 ? "cacio-e-pepe-thumb-512.avif"',1)
    old_list='[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15].includes(index)'
    assert tests.count(old_list)==1
    tests=tests.replace(old_list,'[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16].includes(index)',1)
    assert tests.count('const cacioEPepeImage = readFileSync(path.join(web, "public/dish-images/cacio-e-pepe-768.avif"));')==1
    tests=tests.replace('const cacioEPepeImage = readFileSync(path.join(web, "public/dish-images/cacio-e-pepe-768.avif"));',
                        'const cacioEPepeImage = readFileSync(path.join(web, "public/dish-images/cacio-e-pepe-thumb-512.avif"));',1)
    assert tests.count('test("Three exact editorial 768px images preserve cuisine identity and original file quality", () => {')==1
    tests=tests.replace('test("Three exact editorial 768px images preserve cuisine identity and original file quality", () => {',
                        'test("Two exact editorial 768px images preserve cuisine identity and original file quality", () => {',1)
    old_row='    { index: 16, id: "cacio-e-pepe", file: "cacio-e-pepe-768.avif", bytes: cacioEPepeImage, cssClass: "CacioEPepe", keyword: /pecorino|ost/u },\n'
    assert tests.count(old_row)==1
    tests=tests.replace(old_row,"",1)
    anchor='test("Two exact editorial 768px images preserve cuisine identity and original file quality", () => {'
    added=r'''test("Cacio e pepe has verified 4577px native master, genuine credit, and a separate 512px thumbnail", () => {
  const photo = manifest.images[16];
  assert.equal(photo.id, "cacio-e-pepe");
  assert.equal(photo.kind, "Redaksjonelt rettfoto");
  assert.equal(photo.catalogId, "cacio-e-pepe");
  assert.equal(photo.atlas, "cacio-e-pepe-thumb-512.avif");
  assert.equal(photo.largeSource, "cacio-e-pepe-master-4577.avif");
  assert.equal(photo.largeSourceNativeWidth, 4577);
  assert.equal(photo.largeSourceNativeHeight, 2498);
  assert.equal(photo.largeViewEnabled, true);
  assert.match(photo.photoCredit, /DocteurCosmos.*CC BY-SA 3\.0/u);
  assert.match(photo.photoSource, /commons\.wikimedia\.org/u);
  assert.match(photo.variantCaution, /pecorino/u);
  assert.match(photo.variantCaution, /ikke restaurantfoto/u);
  const ispe = cacioEPepeImage.indexOf(Buffer.from("ispe"));
  assert.ok(ispe > 0);
  assert.equal(cacioEPepeImage.readUInt32BE(ispe + 8), 512);
  assert.equal(cacioEPepeImage.readUInt32BE(ispe + 12), 512);
  assert.match(gallery, /href="\/dish-images\/cacio-e-pepe-master-4577\.avif"/u);
  assert.match(css, /cacio-e-pepe-thumb-512\.avif/u);
});

'''
    tests=tests.replace(anchor,added+anchor,1)
    test_path.write_text(tests,encoding="utf8")
    quality=WEB/"tests/dish-image-large-view-quality.test.mjs"
    patch(quality,'    } else if (photo.id === "pizza-prosciutto") {',
      '''    } else if (photo.id === "cacio-e-pepe") {
      assert.match(photo.photoSource, /^https:\\/\\/commons\\.wikimedia\\.org\\/wiki\\/File:/u);
      assert.match(photo.photoCredit, /DocteurCosmos.*CC BY-SA 3\\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/licenses/by-sa/3.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/cacio-e-pepe-LICENSE.txt");
      const notice = readFileSync(path.join(imageRoot, "cacio-e-pepe-LICENSE.txt"), "utf8");
      assert.match(notice, /Foto: DC \\(DocteurCosmos\\)/u);
      assert.match(notice, /CC BY-SA 3\\.0/u);
    } else if (photo.id === "pizza-prosciutto") {''')
    black["approved_for_fysen"]=True
    black["visual_review_completed"]=True
    black["published"]=False
    black["reviewed_variant"]="black-contour"
    black["reviewed_preview_sha256"]=inspected_sha
    black["retained_native_sha256"]=native_sha
    black["full_avif_sha256"]=full_sha
    audit.write_text(json.dumps(black,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    evidence["approved_for_fysen"]=True
    evidence["visual_review_completed"]=True
    evidence["attribution_verified"]=True
    evidence["published"]=False
    source.write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("Cacio e pepe DRAFT integrates 4577x2498 and 512x512 authentic photo, 16/44 on PR; main unchanged 10/44.")

if __name__=="__main__":
    main()
