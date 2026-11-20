#!/usr/bin/env python3
"""Promote only the visually approved, SHA-locked white-fish photo within draft PR.

Reconstructs original-native image from previous source artifact; requires
byte-for-byte identity with manually inspected black preview. Writes a large
AVIF and own 512px mini, exact manifest/gallery and source evidence. No deploy.
"""
from __future__ import annotations
from hashlib import sha256
from pathlib import Path
import json,runpy,shutil
from PIL import Image,ImageOps
import pillow_avif  # noqa: F401: register AVIF format

ROOT=Path(__file__).resolve().parents[1]
C=ROOT/"assets/fysen-image-candidates/stekt-hvit-fisk/white-fish-mash-vegetables"
WEB=ROOT/"apps/web"
PUBLIC=WEB/"public/dish-images"
SRC_SHA="140b56c61214db9349e915ac01a6629a3f7a5139e3b8c91e20b44869cccfd3fc"
SOURCE_PAGE="https://www.pexels.com/photo/delicious-pan-seared-fish-with-vegetables-29653135/"
LICENSE="https://www.pexels.com/license/"

def digest(path:Path)->str:
    return sha256(path.read_bytes()).hexdigest()

def patch(path:Path,old:str,new:str):
    s=path.read_text(encoding="utf8")
    assert s.count(old)==1,f"Expected exactly one anchor in {path}: {old[:90]}"
    path.write_text(s.replace(old,new,1),encoding="utf8")

def main():
    source_path=C/"review.json"
    black_path=C/"black-review.json"
    evidence=json.loads(source_path.read_text(encoding="utf8"))
    meta=json.loads(black_path.read_text(encoding="utf8"))
    assert evidence["source_sha256"]==SRC_SHA
    assert (evidence["native_width"],evidence["native_height"])==(5464,7120)
    assert not evidence["approved_for_fysen"] and not evidence["published"]
    assert meta["original_sha256"]==SRC_SHA
    assert meta["original_dimensions"]==[5464,7120]
    assert not meta["original_pixels_upscaled"] and not meta["new_food_generated"]
    assert not meta["approved_for_fysen"] and not meta["published"]
    preview=C/"black-contour-preview.jpg"
    original_preview_sha=digest(preview)
    runpy.run_path(str(ROOT/"scripts/preview-hvit-fisk-black.py"),run_name="__main__")
    assert digest(preview)==original_preview_sha,"Output differs from visually inspected black contour photo"
    native=C/"black-contour-native.png"
    native_sha=digest(native)
    archive=ROOT/"assets/fysen-dish-originals/stekt-hvit-fisk.png"
    full=PUBLIC/"stekt-hvit-fisk-master-5464.avif"
    thumb=PUBLIC/"stekt-hvit-fisk-thumb-512.avif"
    notice=PUBLIC/"stekt-hvit-fisk-LICENSE.txt"
    review=ROOT/"docs/fysen-image-reviews/stekt-hvit-fisk.md"
    for path in [archive,full,thumb,notice,review]:
        assert not path.exists(),f"Never overwrite already reviewed image: {path}"
    with Image.open(native) as img:
        img.load()
        assert img.mode=="RGB" and img.size==(5464,7120)
        assert all(img.getpixel(p)==(0,0,0) for p in [(0,0),(5463,0),(0,7119),(5463,7119)])
        img.save(full,format="AVIF",quality=88,speed=5)
        ImageOps.pad(img,(512,512),method=Image.Resampling.LANCZOS,color=(0,0,0)).save(
            thumb,format="AVIF",quality=85,speed=5)
    shutil.copyfile(native,archive)
    assert digest(archive)==native_sha
    full_sha=digest(full)
    with Image.open(full) as im: assert im.size==(5464,7120)
    with Image.open(thumb) as im: assert im.size==(512,512)

    manifest=PUBLIC/"manifest.json"
    catalog=json.loads(manifest.read_text(encoding="utf8"))
    assert sum(x.get("largeViewEnabled") is True for x in catalog["images"])==12
    photo=next(x for x in catalog["images"] if x["id"]=="stekt-hvit-fisk")
    assert photo["index"]==13 and photo["atlas"]=="stekt-hvit-fisk-768.avif"
    assert photo["catalogId"] is None and not photo.get("largeViewEnabled")
    assert not photo.get("largeSource")
    photo.update({
      "atlas":thumb.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":"Redaksjonelt foto av stekt hvit fiskefilet med potetmos, brokkoli, rosenkål, tomat, sitron og saus. Fiskeart er ikke bekreftet. Ikke restaurantfoto fra en konkret Fysen-meny.",
      "largeSourceOriginalPath":"assets/fysen-dish-originals/stekt-hvit-fisk.png",
      "largeSource":full.name,
      "largeSourceNativeWidth":5464,
      "largeSourceNativeHeight":7120,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":full_sha,
      "largeSourceOriginalSha256":native_sha,
      "largeSourceReview":"docs/fysen-image-reviews/stekt-hvit-fisk.md",
      "largeViewEnabled":True,
      "photoCredit":"Valeria Boltneva / Pexels (bearbeidet)",
      "photoSource":SOURCE_PAGE,
      "photoLicense":LICENSE,
      "photoLicenseNotice":"/dish-images/stekt-hvit-fisk-LICENSE.txt"
    })
    manifest.write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    notice.write_text(
      "Stekt hvit fisk – redaksjonelt foto\n"
      "Fotograf: Valeria Boltneva / Pexels\n"
      "Original: "+SOURCE_PAGE+"\n"
      "Lisens: Pexels License – "+LICENSE+"\n"
      "Endringer: Bilde fra originalen på 5464 x 7120 piksler. Mørk keramisk "
      "tallerken med hele den stekte fiskefileten, potetmos, brokkoli, rosenkål, "
      "tomat, sitron og saus ble isolert mot svart bakgrunn ved glatt, kontrollert "
      "konturmaske. Matpiksler er ikke syntetisert eller oppskalert. "
      "Egen fulloppløselig AVIF og separat 512px AVIF-miniatyr.\n"
      "Fiskearten er ikke identifisert. Dette er et representativt redaksjonelt "
      "rettfoto, ikke dokumentasjon på servering eller ingredienser hos "
      "bestemte restauranter oppført i Fysen.\n"
      "Original JPEG SHA-256: "+SRC_SHA+"\n"
      "Bearbeidet full-native PNG SHA-256: "+native_sha+"\n",
      encoding="utf8"
    )
    review.write_text(
      "# Stekt hvit fisk – foto i storvisning (20. november 2026)\n\n"
      "**Beslutning:** Kvalitetsgodkjent fotografi av stekt hvit fiskefilet, "
      "uten påstand om konkret fiskeart eller restaurantrett.\n\n"
      "- Fotograf: Valeria Boltneva / Pexels; kilde: "+SOURCE_PAGE+"\n"
      "- Pexels License: "+LICENSE+"; endringer og fotograf også dokumentert offentlig.\n"
      "- Native original JPEG: 5464 × 7120, SHA-256 "+SRC_SHA+"\n"
      "- Visuell 1400 × 1400 kildepikselkontroll: skarpe skjell/brunet skinn, "
      "fisk og tilbehør, mørk tallerken isolert mot svart; uten bord-/bestikkrester.\n"
      "- Frilegging: manuelt oppmålt, splineglattet kontur. GrabCut-forsøket "
      "ble avvist fordi det beholdt bordrester; ingen oppskalering, ingen "
      "KI-genererte ingredienser, ingen flermotivscollage. "
      "Tallerkenen går tett mot opprinnelig bildekant.\n"
      "- Stor master: stekt-hvit-fisk-master-5464.avif (5464 × 7120), "
      "egen miniatyr: stekt-hvit-fisk-thumb-512.avif (512 × 512), "
      "verifiserbar PNG-arkivoriginal utenfor web.\n"
      "- Bare Matlyst-redaksjonelt rettbilde, ikke bilde av en konkret Fysen-restaurant.\n"
      "- Offentlig Vercel/mobil/iPad-visning krever separat godkjent produksjonsutrulling.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Retained reviewed PNG SHA-256: "+native_sha+"\n"
      "Matched visually reviewed preview SHA-256: "+original_preview_sha+"\n",
      encoding="utf8"
    )
    css=WEB/"styles/dish-photos.css"
    patch(css,
       '.dishPhotoThumb.dishPhotoWhiteFish { background: #000 url("/dish-images/stekt-hvit-fisk-768.avif") center / cover no-repeat; }',
       '.dishPhotoThumb.dishPhotoWhiteFish { background: #000 url("/dish-images/stekt-hvit-fisk-thumb-512.avif") center / contain no-repeat; }'
    )
    gallery=WEB/"components/dish-photo-gallery.tsx"
    patch(gallery,
      '          <small>Pad thai-foto: UNDO KIM / Pexels, <a href="/dish-images/pad-thai-reker-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>',
      '          <small>Pad thai-foto: UNDO KIM / Pexels, <a href="/dish-images/pad-thai-reker-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>\n'
      '          <a href="/dish-images/stekt-hvit-fisk-master-5464.avif" target="_blank" rel="noopener noreferrer">\n'
      '            Stekt hvit fisk <span aria-hidden="true">↗</span>\n'
      '          </a>\n'
      '          <small>Hvit fisk-foto: Valeria Boltneva / Pexels, <a href="/dish-images/stekt-hvit-fisk-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>'
    )
    test=WEB/"tests/dish-photo-gallery.test.mjs"
    s=test.read_text(encoding="utf8")
    assert "approved.length, 12" in s
    s=s.replace("approved.length, 12","approved.length, 13",1)
    s=s.replace("butter chicken and shrimp pad thai need approved full-size masters",
                "butter chicken, shrimp pad thai and seared white fish need approved full-size masters",1)
    s=s.replace("stekt-hvit-fisk-768.avif","stekt-hvit-fisk-thumb-512.avif")
    s=s.replace("[0,1,2,3,4,5,6,7,8,10,11,12].includes(index)",
                "[0,1,2,3,4,5,6,7,8,10,11,12,13].includes(index)",1)
    # Change dimensions check only for the white-fish entry. Other photos retain 768px.
    start=s.index('test("White fish, beef bibimbap and pork tacos al pastor')
    end=s.find("\ntest(",start+5)
    if end<0: end=len(s)
    block=s[start:end]
    assert block.count("    assert.equal(bytes.readUInt32BE(marker + 8), 768);")==1
    assert block.count("    assert.equal(bytes.readUInt32BE(marker + 12), 768);")==1
    block=block.replace(
       'test("White fish, beef bibimbap and pork tacos al pastor have real 768px dish-specific assets"',
       'test("White fish, beef bibimbap and pork tacos al pastor have exact separate dish images"',1)
    block=block.replace("    assert.equal(bytes.readUInt32BE(marker + 8), 768);",
                        "    assert.equal(bytes.readUInt32BE(marker + 8), index === 13 ? 512 : 768);",1)
    block=block.replace("    assert.equal(bytes.readUInt32BE(marker + 12), 768);",
                        "    assert.equal(bytes.readUInt32BE(marker + 12), index === 13 ? 512 : 768);",1)
    s=s[:start]+block+s[end:]
    test.write_text(s,encoding="utf8")
    meta["visual_review_completed"]=True
    meta["approved_for_fysen"]=True
    meta["published"]=False
    meta["reviewed_variant"]="black-contour"
    meta["reviewed_preview_sha256"]=original_preview_sha
    meta["native_png_sha256"]=native_sha
    meta["full_avif_sha256"]=full_sha
    black_path.write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    evidence["photographer_verified"]=True
    evidence["license_verified"]=True
    evidence["visual_review_completed"]=True
    evidence["approved_for_fysen"]=True
    evidence["published"]=False
    source_path.write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("PROMOTED seared white fish 5464x7120 native and own 512px mini to draft PR ONLY, no Vercel deploy")

if __name__=="__main__":
    main()
