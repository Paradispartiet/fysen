#!/usr/bin/env python3
"""Promote the visually approved 4000px tagliatelle al ragù into Fysen.

Only the reviewed SHA-locked native photo is accepted. Writes separate large
AVIF and 512px AVIF, exact dish manifest, visible CC BY 4.0 attribution,
review evidence and focused-gallery test updates. NEVER deploys to Vercel.
"""
from __future__ import annotations

from hashlib import sha256
import json
from pathlib import Path
import runpy
import shutil

from PIL import Image, ImageOps
import pillow_avif  # noqa: F401; registers AVIF encoder

ROOT=Path(__file__).resolve().parents[1]
CANDIDATE=ROOT/"assets/fysen-image-candidates/pasta-bolognese/tagliatelle-trattoria-tony"
PUBLIC=ROOT/"apps/web/public/dish-images"
WEB=ROOT/"apps/web"
SOURCE_SHA="e3e9792287a5bf4c0bf0dd0d88cf063e501a69fea8d17d48c65802b190a54131"
REVIEWED_SHA="ffb735fd218a6607bee6515b1a770a8bc56402403730fbf01288824ef8688d80"
SOURCE_PAGE="https://commons.wikimedia.org/wiki/File:Tagliatelle_al_rag%C3%B9_Trattoria_Tony.jpg"
LICENSE="https://creativecommons.org/licenses/by/4.0/"

def digest(path:Path)->str:
    return sha256(path.read_bytes()).hexdigest()

def patch_once(path:Path, old:str, new:str)->None:
    src=path.read_text(encoding="utf8")
    assert src.count(old)==1,f"Unique anchor missing in {path}: {old[:80]}"
    path.write_text(src.replace(old,new,1),encoding="utf8")

def main():
    review_path=CANDIDATE/"black-review.json"
    evidence=json.loads(review_path.read_text(encoding="utf8"))
    assert evidence["source_original_sha256"]==SOURCE_SHA
    assert evidence["review_native_dimensions"]==[4000,3000]
    assert evidence["review_native_sha256"]==REVIEWED_SHA
    assert evidence["visual_review_completed"] is False
    assert evidence["approved_for_fysen"] is False
    assert evidence["published"] is False

    runpy.run_path(str(ROOT/"scripts/preview-pasta-bolognese-black.py"),run_name="__main__")
    native=CANDIDATE/"black-native-master.png"
    assert digest(native)==REVIEWED_SHA,"Photo differs from visually approved preview"
    archive=ROOT/"assets/fysen-dish-originals/pasta-bolognese.png"
    full=PUBLIC/"pasta-bolognese-master-4000.avif"
    mini=PUBLIC/"pasta-bolognese-thumb-512.avif"
    notice=PUBLIC/"pasta-bolognese-LICENSE.txt"
    review=ROOT/"docs/fysen-image-reviews/pasta-bolognese.md"
    for path in (archive,full,mini,notice,review):
        assert not path.exists(),f"Never overwrite a prior audited image: {path}"
    with Image.open(native) as image:
        image.load()
        assert image.size==(4000,3000) and image.mode=="RGB"
        assert all(image.getpixel(pos)==(0,0,0) for pos in [(0,0),(3999,0),(0,2999),(3999,2999)])
        image.save(full,format="AVIF",quality=87,speed=5)
        ImageOps.pad(image,(512,512),method=Image.Resampling.LANCZOS,color=(0,0,0)).save(
            mini,format="AVIF",quality=84,speed=5
        )
    shutil.copyfile(native,archive)
    assert digest(archive)==REVIEWED_SHA
    full_sha=digest(full)

    manifest_path=PUBLIC/"manifest.json"
    manifest=json.loads(manifest_path.read_text(encoding="utf8"))
    entry=next(img for img in manifest["images"] if img["id"]=="pasta-bolognese")
    assert entry["atlas"]=="pasta-bolognese-768.avif" and entry["catalogId"] is None
    assert "largeSource" not in entry
    entry.update({
      "atlas":mini.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":"Lisensiert foto av tagliatelle al ragù med brede pastabånd og kjøttragù på lys tallerken, tatt på Trattoria Tony i Bologna. Dette er ikke restaurantfoto fra Fysen og dokumenterer ingen konkret menyservering i tjenesten.",
      "largeSourceOriginalPath":"assets/fysen-dish-originals/pasta-bolognese.png",
      "largeSource":full.name,
      "largeSourceNativeWidth":4000,
      "largeSourceNativeHeight":3000,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":full_sha,
      "largeSourceOriginalSha256":REVIEWED_SHA,
      "largeSourceReview":"docs/fysen-image-reviews/pasta-bolognese.md",
      "largeViewEnabled":True,
      "photoCredit":"Alex Sirac / Wikimedia Commons, CC BY 4.0 (bearbeidet)",
      "photoSource":SOURCE_PAGE,
      "photoLicense":LICENSE,
      "photoLicenseNotice":"/dish-images/pasta-bolognese-LICENSE.txt"
    })
    manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf8")

    notice.write_text(
      "Tagliatelle al ragù (bolognese) – redaksjonelt foto\n"
      "Fotograf: Alex Sirac (Wikimedia Commons-bruker Exilexi)\n"
      "Original: "+SOURCE_PAGE+"\n"
      "Lisens for original og bearbeidelse: CC BY 4.0, "+LICENSE+"\n"
      "Endringer: Den opprinnelige 4000 x 3000 JPEG-fotografien er frilagt fra "
      "restaurantbordet med kontursegmentering. Mat og tallerken består av "
      "uoppskalerte originale bildepiksler. Egen stor AVIF og 512 x 512 AVIF "
      "er laget fra samme bearbeidede original.\n"
      "Fotografiet viser en servering ved Trattoria Tony i Bologna, Italia. "
      "Dette er kun et illustrerende foto av rettetypen, ikke bevis for menyer "
      "eller serveringer på noen restaurant oppført i Fysen.\n"
      "Kildeoriginal SHA-256: "+SOURCE_SHA+"\n"
      "Bearbeidet PNG SHA-256: "+REVIEWED_SHA+"\n",
      encoding="utf8"
    )
    review.write_text(
      "# Tagliatelle bolognese – skarphets- og kildegodkjenning (19. november 2026)\n\n"
      "**Beslutning:** Kvalitetsgodkjent representativt redaksjonelt foto, "
      "ikke restaurantfoto fra en konkret Fysen-meny.\n\n"
      "- Fotograf: Alex Sirac / Wikimedia Commons, fotografert ved Trattoria Tony i Bologna\n"
      "- Kilde: "+SOURCE_PAGE+"\n"
      "- Lisens: CC BY 4.0 "+LICENSE+", kilde og bearbeidelse dokumentert også i offentlig lisensnotis.\n"
      "- Original kildefoto: 4000 × 3000 JPEG, SHA-256 "+SOURCE_SHA+"\n"
      "- Bearbeiding: den lyse tallerkenen maskert mot helsvart bakgrunn ved "
      "kontrollert foreground-segmentering. Originale matpiksler er beholdt "
      "uten generativ redigering eller oppskalering. Bare alfamasken er skalert.\n"
      "- Visuell kontroll: hele tallerkenen og pastaen beholdt, bred tagliatelle "
      "og kjøttragù tydelig ved 1400 × 1400 kildepikselkontroll, svart bakgrunn uten bord.\n"
      "- Leveranser: pasta-bolognese-master-4000.avif (4000 × 3000), "
      "pasta-bolognese-thumb-512.avif (512 × 512) og kildebevarende PNG-arkiv.\n"
      "- Ingen kobling til en bestemt Fysen-restaurant. "
      "Offentlig Vercel-/mobil-/iPad-kontroll skjer ved separat utrulling.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Retained reviewed PNG SHA-256: "+REVIEWED_SHA+"\n",
      encoding="utf8"
    )
    css=WEB/"styles/dish-photos.css"
    patch_once(css,
      '.dishPhotoThumb.dishPhotoBolognese { background: #000 url("/dish-images/pasta-bolognese-768.avif") center / cover no-repeat; }',
      '.dishPhotoThumb.dishPhotoBolognese { background: #000 url("/dish-images/pasta-bolognese-thumb-512.avif") center / contain no-repeat; }'
    )
    gallery=WEB/"components/dish-photo-gallery.tsx"
    patch_once(gallery,
      '          <a href="/dish-images/pasta-carbonara-master-2600.avif" target="_blank" rel="noopener noreferrer">',
      '          <a href="/dish-images/pasta-bolognese-master-4000.avif" target="_blank" rel="noopener noreferrer">\n            Tagliatelle bolognese <span aria-hidden="true">↗</span>\n          </a>\n          <small>Tagliatelle-foto: Alex Sirac, <a href="/dish-images/pasta-bolognese-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY 4.0 (bearbeidet, kilde og lisens)</a>.</small>\n          <a href="/dish-images/pasta-carbonara-master-2600.avif" target="_blank" rel="noopener noreferrer">'
    )
    test=WEB/"tests/dish-photo-gallery.test.mjs"
    original=test.read_text(encoding="utf8")
    assert "approved.length, 9" in original
    updated=original.replace("approved.length, 9","approved.length, 10",1)
    updated=updated.replace(
      "grilled steak, shrimp sandwich, sushi, ramen, carbonara and butter chicken need approved full-size masters",
      "grilled steak, shrimp sandwich, sushi, ramen, bolognese, carbonara and butter chicken need approved full-size masters",1)
    updated=updated.replace('pasta-bolognese-768.avif','pasta-bolognese-thumb-512.avif')
    updated=updated.replace("[0,1,2,3,4,5,6,10,11].includes(index)",
                            "[0,1,2,3,4,5,6,7,10,11].includes(index)",1)
    updated=updated.replace("Bolognese, prosciutto and kebab have accurate 768px gallery-only AVIF images",
                            "Bolognese, prosciutto and kebab have distinct correctly sized gallery AVIF images",1)
    updated=updated.replace('assert.equal(entry.bytes.readUInt32BE(ispe + 8), 768);',
                            'assert.equal(entry.bytes.readUInt32BE(ispe + 8), entry.index === 7 ? 512 : 768);',1)
    updated=updated.replace('assert.equal(entry.bytes.readUInt32BE(ispe + 12), 768);',
                            'assert.equal(entry.bytes.readUInt32BE(ispe + 12), entry.index === 7 ? 512 : 768);',1)
    assert 'pasta-bolognese-thumb-512.avif' in updated
    test.write_text(updated,encoding="utf8")
    evidence=json.loads(review_path.read_text(encoding="utf8"))
    evidence["visual_review_completed"]=True
    evidence["approved_for_fysen"]=True
    evidence["published"]=False
    evidence["license_verified"]=True
    evidence["photographer_verified"]=True
    evidence["full_avif_sha256"]=full_sha
    evidence["license_notice"]=str(notice.relative_to(ROOT))
    review_path.write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("PROMOTED source-locked tagliatelle bolognese 4000×3000 and own 512px mini; NO PUBLIC DEPLOY")

if __name__=="__main__":
    main()
