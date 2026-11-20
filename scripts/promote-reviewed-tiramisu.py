#!/usr/bin/env python3
"""Promote the visually inspected real tiramisu photo into draft PR only.

Verified original SHA, exact inspected preview, 6240x4160 native pixels and
separate 512px AVIF mini required. No production deploy or menu changes.
"""
from __future__ import annotations
from hashlib import sha256
from pathlib import Path
import json,runpy,shutil
from PIL import Image,ImageOps
import pillow_avif  # noqa: F401

ROOT=Path(__file__).resolve().parents[1]
C=ROOT/"assets/fysen-image-candidates/tiramisu/tiramisu-mint-plate"
WEB=ROOT/"apps/web"
PUBLIC=WEB/"public/dish-images"
SHA="33be6223822dcada5fbb335519da2f1ebbf95ca9860e262617330e7cdd9d14fc"
SOURCE="https://www.pexels.com/photo/piece-of-cake-on-a-plate-26838689/"
LICENSE="https://www.pexels.com/license/"
def digest(path):return sha256(Path(path).read_bytes()).hexdigest()
def patch(path,old,new):
    contents=path.read_text(encoding="utf8")
    assert contents.count(old)==1,f"Unique anchor missing in {path}: {old[:75]}"
    path.write_text(contents.replace(old,new,1),encoding="utf8")
def main():
    evidence_path=C/"review.json"; black_path=C/"black-review.json"
    evidence=json.loads(evidence_path.read_text(encoding="utf8"))
    black=json.loads(black_path.read_text(encoding="utf8"))
    assert evidence["source_sha256"]==SHA and (evidence["native_width"],evidence["native_height"])==(6240,4160)
    assert not evidence["approved_for_fysen"] and not evidence["published"]
    assert black["source_original_sha256"]==SHA
    assert black["original_dimensions"]==[6240,4160]
    assert not black["native_pixels_upscaled"] and not black["food_pixels_generated"]
    assert not black["approved_for_fysen"] and not black["published"]
    preview=C/"black-grabcut-preview.jpg"
    locked_preview_sha=digest(preview)
    runpy.run_path(str(ROOT/"scripts/preview-tiramisu-black.py"),run_name="__main__")
    assert digest(preview)==locked_preview_sha,"Photo differs from inspected and approved native preview"
    native=C/"black-grabcut-native.png"
    native_sha=digest(native)
    archive=ROOT/"assets/fysen-dish-originals/tiramisu.png"
    full=PUBLIC/"tiramisu-master-6240.avif"
    mini=PUBLIC/"tiramisu-thumb-512.avif"
    notice=PUBLIC/"tiramisu-LICENSE.txt"
    review=ROOT/"docs/fysen-image-reviews/tiramisu.md"
    for p in [archive,full,mini,notice,review]:
        assert not p.exists(),f"Do not overwrite established reviewed asset: {p}"
    with Image.open(native) as image:
        image.load()
        assert image.mode=="RGB" and image.size==(6240,4160)
        assert all(image.getpixel(pt)==(0,0,0) for pt in [(0,0),(6239,0),(0,4159),(6239,4159)])
        image.save(full,format="AVIF",quality=89,speed=5)
        ImageOps.pad(image,(512,512),method=Image.Resampling.LANCZOS,color=(0,0,0)).save(
            mini,format="AVIF",quality=86,speed=5)
    shutil.copyfile(native,archive)
    assert digest(archive)==native_sha
    full_sha=digest(full)
    with Image.open(full) as im: assert im.size==(6240,4160)
    with Image.open(mini) as im: assert im.size==(512,512)

    manifest_path=PUBLIC/"manifest.json"
    manifest=json.loads(manifest_path.read_text(encoding="utf8"))
    assert sum(x.get("largeViewEnabled") is True for x in manifest["images"])==13
    photo=next(x for x in manifest["images"] if x["id"]=="tiramisu")
    assert photo["index"]==14 and photo["atlas"]=="tiramisu-768.avif"
    assert photo["catalogId"] is None and not photo.get("largeViewEnabled") and not photo.get("largeSource")
    photo.update({
      "atlas":mini.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":"Lisensiert redaksjonelt foto av en tiramisu med mascarpone, kaffetrukne kjekslag, kakao og myntepynt på tallerken. Ikke restaurantfoto fra Fysen, ikke dokumentasjon av en bestemt menyservering.",
      "largeSourceOriginalPath":"assets/fysen-dish-originals/tiramisu.png",
      "largeSource":full.name,
      "largeSourceNativeWidth":6240,"largeSourceNativeHeight":4160,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":full_sha,
      "largeSourceOriginalSha256":native_sha,
      "largeSourceReview":"docs/fysen-image-reviews/tiramisu.md",
      "largeViewEnabled":True,
      "photoCredit":"Arian Fernandez / Pexels (bearbeidet)",
      "photoSource":SOURCE,
      "photoLicense":LICENSE,
      "photoLicenseNotice":"/dish-images/tiramisu-LICENSE.txt"
    })
    manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    notice.write_text(
      "Tiramisu – redaksjonelt fotografi\n"
      "Fotograf: Arian Fernandez / Pexels\n"
      "Original: "+SOURCE+"\n"
      "Lisens: Pexels License, "+LICENSE+"\n"
      "Endringer: Originalfoto 6240 x 4160 er frilagt mot helsvart bakgrunn "
      "med kontur- og GrabCut-maske. Den hele tiramisu-kaken med mascarponekrem, "
      "kakaodryss og mynte, samt tallerkenen, er beholdt i native oppløsning. "
      "Ingen KI-generert mat eller oppskalering. Egen stor AVIF og separat "
      "512 x 512 AVIF-miniatyr er produsert.\n"
      "Illustrerende rettfoto, ikke restaurantmenyfoto i Fysen.\n"
      "Original JPEG SHA-256: "+SHA+"\n"
      "Bearbeidet PNG SHA-256: "+native_sha+"\n",
      encoding="utf8")
    review.write_text(
      "# Tiramisu – kvalitetsgodkjent stort redaksjonelt foto (20. november 2026)\n\n"
      "**Resultat:** Godkjent representativt ekte tiramisu-foto, ingen "
      "restaurantspesifikk kobling.\n\n"
      "- Fotograf: Arian Fernandez / Pexels, kilde: "+SOURCE+"\n"
      "- Pexels License: "+LICENSE+"; bearbeidelsen og kreditten ligger også i offentlig lisensnotis.\n"
      "- Original: 6240 × 4160 JPEG, SHA-256 "+SHA+"\n"
      "- Første maskeforsøk hadde teknisk tomt hull i midten av kaken ved "
      "overlappende konturer; dette ble rettet før ny forhåndsvisning. "
      "Påfølgende blågrønn bakgrunnsrest bak mynten ble fjernet selektivt. "
      "Det inspiserte GrabCut-resultatet har hele kaken, mynten og tallerkenen "
      "mot helsvart bakgrunn, uten manglende serveringsdeler.\n"
      "- Native 1400 × 1400 detaljer viser originale kaffetrukne kjeks, krem "
      "og kakaostøv med reell sensor-/kildeskarphet. Ingen KI-generert mat, "
      "collage, syntetiske deler eller oppskalering.\n"
      "- Leveranser: tiramisu-master-6240.avif (6240 × 4160), "
      "tiramisu-thumb-512.avif (512 × 512), revidert PNG-original utenfor offentlig web.\n"
      "- Offentlig Vercel-/mobil-/iPad-kontroll forutsetter separat godkjent utrulling.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Retained reviewed PNG SHA-256: "+native_sha+"\n"
      "Matched visually reviewed preview SHA-256: "+locked_preview_sha+"\n",
      encoding="utf8"
    )
    css=WEB/"styles/dish-photos.css"
    patch(css,
      '  background: #000 url("/dish-images/tiramisu-768.avif") center / cover no-repeat;',
      '  background: #000 url("/dish-images/tiramisu-thumb-512.avif") center / contain no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    patch(gallery,
      '          <small>Hvit fisk-foto: Valeria Boltneva / Pexels, <a href="/dish-images/stekt-hvit-fisk-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>',
      '          <small>Hvit fisk-foto: Valeria Boltneva / Pexels, <a href="/dish-images/stekt-hvit-fisk-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>\n'
      '          <a href="/dish-images/tiramisu-master-6240.avif" target="_blank" rel="noopener noreferrer">\n'
      '            Tiramisu <span aria-hidden="true">↗</span>\n'
      '          </a>\n'
      '          <small>Tiramisu-foto: Arian Fernandez / Pexels, <a href="/dish-images/tiramisu-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>'
    )
    tests=WEB/"tests/dish-photo-gallery.test.mjs"
    test=tests.read_text(encoding="utf8")
    assert "approved.length, 13" in test
    test=test.replace("approved.length, 13","approved.length, 14",1)
    test=test.replace("shrimp pad thai and seared white fish need approved full-size masters",
       "shrimp pad thai, seared white fish and tiramisu need approved full-size masters",1)
    test=test.replace("tiramisu-768.avif","tiramisu-thumb-512.avif")
    test=test.replace("[0,1,2,3,4,5,6,7,8,10,11,12,13].includes(index)",
                       "[0,1,2,3,4,5,6,7,8,10,11,12,13,14].includes(index)",1)
    start=test.index('test("Shrimp pad thai and tiramisu are dedicated Retina-safe')
    end=test.find("\ntest(",start+5)
    if end<0:end=len(test)
    block=test[start:end]
    assert block.count("index === 12 ? 512 : 768")==2
    block=block.replace("index === 12 ? 512 : 768","[12,14].includes(index) ? 512 : 768")
    test=test[:start]+block+test[end:]
    tests.write_text(test,encoding="utf8")
    black["visual_review_completed"]=True
    black["approved_for_fysen"]=True
    black["published"]=False
    black["reviewed_variant"]="black-grabcut"
    black["reviewed_preview_sha256"]=locked_preview_sha
    black["retained_native_sha256"]=native_sha
    black["full_avif_sha256"]=full_sha
    black_path.write_text(json.dumps(black,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    evidence["photographer_verified"]=True
    evidence["license_verified"]=True
    evidence["visual_review_completed"]=True
    evidence["approved_for_fysen"]=True
    evidence["published"]=False
    evidence_path.write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("PROMOTED original tiramisu 6240x4160 and separate 512 mini into draft PR, NO PRODUCTION DEPLOY")

if __name__=="__main__":
    main()
