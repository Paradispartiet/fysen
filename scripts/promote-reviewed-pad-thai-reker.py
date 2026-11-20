#!/usr/bin/env python3
"""Promote visually reviewed full-native shrimp pad Thai photo only inside draft PR.

Regenerates from SHA-locked source and requires byte-identical reviewed preview.
Adds full AVIF, distinct 512 AVIF, license evidence, exact manifest/gallery
mapping and only focused test updates. Never merges, deploys or alters menus.
"""
from __future__ import annotations
from hashlib import sha256
import json,runpy,shutil
from pathlib import Path
from PIL import Image, ImageOps
import pillow_avif # noqa: F401 registers AVIF

ROOT=Path(__file__).resolve().parents[1]
CANDIDATE=ROOT/"assets/fysen-image-candidates/pad-thai-reker/34723306"
WEB=ROOT/"apps/web"
PUBLIC=WEB/"public/dish-images"
ORIGINAL_SHA="00831ee288e15f9e273fbc3e0eea5598b74e7c3d1e1fd46ffc48f5665378bd54"
SOURCE_PAGE="https://www.pexels.com/photo/delicious-pad-thai-noodles-on-rustic-background-34723306/"
LICENSE="https://www.pexels.com/legal-pages/license/"
def digest(path:Path):return sha256(path.read_bytes()).hexdigest()
def patch(path:Path,old:str,new:str):
    text=path.read_text(encoding="utf8")
    assert text.count(old)==1, f"Exactly one anchored match required in {path}: {old[:65]}"
    path.write_text(text.replace(old,new,1),encoding="utf8")
def main():
    source_path=CANDIDATE/"review.json"
    evidence=json.loads(source_path.read_text(encoding="utf8"))
    mask_path=CANDIDATE/"black-review.json"
    meta=json.loads(mask_path.read_text(encoding="utf8"))
    assert evidence["source_sha256"]==ORIGINAL_SHA
    assert evidence["original_width"]==5472 and evidence["original_height"]==3648
    assert not evidence["approved_for_fysen"] and not evidence["published"]
    assert meta["source_sha256"]==ORIGINAL_SHA and meta["source_original_dimensions"]==[5472,3648]
    assert meta["black_corners"] and not meta["upscaled_source_pixels"] and not meta["generated_food_pixels"]
    assert not meta["approved_for_fysen"] and not meta["published"]
    # This is a regression guard against promoting another mask than the one inspected.
    locked_preview_sha=digest(CANDIDATE/"black-preview.jpg")
    runpy.run_path(str(ROOT/"scripts/preview-pad-thai-reker-black.py"),run_name="__main__")
    assert digest(CANDIDATE/"black-preview.jpg")==locked_preview_sha, "Visual preview is not byte-identical to reviewed photo"
    native=CANDIDATE/"black-native-master.png"
    native_sha=digest(native)
    archive=ROOT/"assets/fysen-dish-originals/pad-thai-reker.png"
    master=PUBLIC/"pad-thai-reker-master-5472.avif"
    mini=PUBLIC/"pad-thai-reker-thumb-512.avif"
    notice=PUBLIC/"pad-thai-reker-LICENSE.txt"
    for p in (archive,master,mini,notice):
        assert not p.exists(),f"Never replace an existing audited photo: {p}"
    with Image.open(native) as im:
        im.load()
        assert im.mode=="RGB" and im.size==(5472,3648)
        assert all(im.getpixel(p)==(0,0,0) for p in [(0,0),(5471,0),(0,3647),(5471,3647)])
        im.save(master,format="AVIF",quality=89,speed=5)
        ImageOps.pad(im,(512,512),method=Image.Resampling.LANCZOS,color=(0,0,0)).save(
            mini,format="AVIF",quality=86,speed=5
        )
    shutil.copyfile(native,archive)
    assert digest(archive)==native_sha
    large_sha=digest(master)
    manifest=PUBLIC/"manifest.json"
    data=json.loads(manifest.read_text(encoding="utf8"))
    assert sum(x.get("largeViewEnabled") is True for x in data["images"])==11
    row=next(x for x in data["images"] if x["id"]=="pad-thai-reker")
    assert row["index"]==12 and row["atlas"]=="pad-thai-reker-768.avif"
    assert row["catalogId"] is None and not row.get("largeViewEnabled")
    row.update({
      "atlas":mini.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":"Redaksjonelt foto av pad thai med reker, flate risnudler, bønnespirer, hakkede peanøtter og lime. Inneholder skalldyr og peanøtter. Ikke et generelt bilde av vegetarisk pad thai og ikke restaurantfoto fra en konkret Fysen-meny.",
      "largeSourceOriginalPath":"assets/fysen-dish-originals/pad-thai-reker.png",
      "largeSource":master.name,
      "largeSourceNativeWidth":5472,"largeSourceNativeHeight":3648,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":large_sha,
      "largeSourceOriginalSha256":native_sha,
      "largeSourceReview":"docs/fysen-image-reviews/pad-thai-reker.md",
      "largeViewEnabled":True,
      "photoCredit":"UNDO KIM / Pexels (bearbeidet)",
      "photoSource":SOURCE_PAGE,
      "photoLicense":LICENSE,
      "photoLicenseNotice":"/dish-images/pad-thai-reker-LICENSE.txt"
    })
    manifest.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    notice.write_text(
      "Pad thai med reker – redaksjonelt fotografi\n"
      "Fotograf: UNDO KIM / Pexels\n"
      "Original: "+SOURCE_PAGE+"\n"
      "Lisens: Pexels License, "+LICENSE+"\n"
      "Bearbeidelse: Opprinnelig foto 5472 x 3648 med hel, rund, hvit tallerken mot treunderlag. Bakgrunnen er frilagt til ren svart ved kontrollert maskering av tallerkenen. Matens faktiske bildepiksler er beholdt uten KI, oppskalering eller oppdiktede ingredienser. Separat 5472 x 3648 AVIF og 512 x 512 AVIF-miniatyr er produsert.\n"
      "Lisensen gjelder for Pexels-fotoet; navngitt fotograf og kildeside er bevart. Dette er ikke dokumentasjon for noen faktisk restaurantservering i Fysen.\n"
      "Original JPEG SHA-256: "+ORIGINAL_SHA+"\n"
      "Bearbeidet full-native PNG SHA-256: "+native_sha+"\n",
      encoding="utf8")
    review=ROOT/"docs/fysen-image-reviews/pad-thai-reker.md"
    assert not review.exists()
    review.write_text(
      "# Pad thai med reker – kilde- og fullstørrelseskontroll, 20. november 2026\n\n"
      "**Resultat:** Kvalitetsgodkjent autentisk rettfoto med hel servering, ikke restaurantmenyfoto.\n\n"
      "- Fotograf: UNDO KIM / Pexels. Kilde: "+SOURCE_PAGE+"\n"
      "- Pexels-lisens: "+LICENSE+". Foto og bearbeidelse krediteres i offentlig lisensnotis.\n"
      "- Original kildefoto: 5472 × 3648 JPEG, SHA-256 "+ORIGINAL_SHA+"\n"
      "- Originale reker, risnudler, peanøtter og tallerken kontrollerte ved 1400 × 1400 native bildepikslers utsnitt; alle kanter av hvit tallerken bevart.\n"
      "- Svart bakgrunn laget ved ellipsebasert GrabCut på lavere oppløsning; bare alfamasken skalert og ferdig bilde beholdt i native størrelse. Ingen KI-generert mat, collage eller oppskalering.\n"
      "- Eksport: pad-thai-reker-master-5472.avif (5472 × 3648) + pad-thai-reker-thumb-512.avif (512 × 512) og ikke-offentlig PNG originalarkiv.\n"
      "- Kun redaksjonelt illustrerende rettbilde; fotoet skal ikke knyttes til en faktisk Fysen-restaurant eller hevde priser/menytilgjengelighet.\n"
      "- Offentlig Vercel-/mobil-/iPad-visning må kontrolleres ved separat godkjent publisering.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Retained reviewed PNG SHA-256: "+native_sha+"\n"
      "Matched previously approved preview SHA-256: "+locked_preview_sha+"\n",
      encoding="utf8")
    css=WEB/"styles/dish-photos.css"
    patch(css,
      'background: #000 url("/dish-images/pad-thai-reker-768.avif") center / cover no-repeat;',
      'background: #000 url("/dish-images/pad-thai-reker-thumb-512.avif") center / contain no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    patch(gallery,
      '          <a href="/dish-images/butter-chicken-master-3000.avif" target="_blank" rel="noopener noreferrer">\n            Butter chicken <span aria-hidden="true">↗</span>\n          </a>',
      '          <a href="/dish-images/butter-chicken-master-3000.avif" target="_blank" rel="noopener noreferrer">\n            Butter chicken <span aria-hidden="true">↗</span>\n          </a>\n'
      '          <a href="/dish-images/pad-thai-reker-master-5472.avif" target="_blank" rel="noopener noreferrer">\n            Pad thai med reker <span aria-hidden="true">↗</span>\n          </a>\n'
      '          <small>Pad thai-foto: UNDO KIM / Pexels, <a href="/dish-images/pad-thai-reker-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>')
    tests=WEB/"tests/dish-photo-gallery.test.mjs"
    t=tests.read_text(encoding="utf8")
    assert "approved.length, 11" in t
    t=t.replace("approved.length, 11","approved.length, 12",1)
    t=t.replace("prosciutto, carbonara and butter chicken need approved full-size masters","prosciutto, carbonara, butter chicken and shrimp pad thai need approved full-size masters",1)
    t=t.replace("pad-thai-reker-768.avif","pad-thai-reker-thumb-512.avif")
    t=t.replace("[0,1,2,3,4,5,6,7,8,10,11].includes(index)",
                "[0,1,2,3,4,5,6,7,8,10,11,12].includes(index)",1)
    # Existing joint pad thai/tiramisu format test must account for new 512 mini.
    old='    assert.equal(image.readUInt32BE(ispe + 8), 768);\n    assert.equal(image.readUInt32BE(ispe + 12), 768);'
    # Other tests share this exact block. Patch within only the shrimp/tiramisu test.
    start=t.index('test("Shrimp pad thai and tiramisu are dedicated Retina-safe')
    end=t.index('\ntest(',start+2)
    block=t[start:end]
    assert block.count(old)==1
    block=block.replace(old,'    assert.equal(image.readUInt32BE(ispe + 8), index === 12 ? 512 : 768);\n    assert.equal(image.readUInt32BE(ispe + 12), index === 12 ? 512 : 768);',1)
    t=t[:start]+block+t[end:]
    t=t.replace(
      'test("Pad Thai uses only the known shrimp illustration, not a blurry new crop", () => {',
      'test("Pad Thai uses the source-verified shrimp photo only for the correct variant", () => {',1)
    t=t.replace(
      '  assert.doesNotMatch(css, /pad-thai\\\\.avif/u);',
      '  assert.match(css, /pad-thai-reker-thumb-512\\\\.avif/u);\n  assert.equal(manifest.images[12].kind, "Redaksjonelt rettfoto");',1)
    tests.write_text(t,encoding="utf8")
    # Generic Pexels photo source requirements are already verified in the
    # separate quality test, no changes to its general thresholds.
    for p,expected in [(master,(5472,3648)),(mini,(512,512))]:
        with Image.open(p) as im:assert im.size==expected
    meta["visual_review_completed"]=True
    meta["approved_for_fysen"]=True
    meta["published"]=False
    meta["retained_native_sha256"]=native_sha
    meta["full_avif_sha256"]=large_sha
    meta["reviewed_preview_sha256"]=locked_preview_sha
    mask_path.write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    evidence["photographer_verified"]=True
    evidence["license_verified"]=True
    evidence["visual_review_completed"]=True
    evidence["approved_for_fysen"]=True
    evidence["published"]=False
    source_path.write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("PROMOTED shrimp pad thai 5472x3648 with independent 512 mini, source-locked, PR ONLY, NO PROD DEPLOY")
if __name__=="__main__":main()
