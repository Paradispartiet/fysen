#!/usr/bin/env python3
"""Promote visually reviewed native steak photo to Matlyst in this PR only.

Review SHA locks the exact photo pixels. The public master and thumbnail are
distinct. This script does not deploy to Vercel or attribute the photo to a
specific restaurant.
"""
from __future__ import annotations
from hashlib import sha256
import json, runpy, shutil
from pathlib import Path
from PIL import Image,ImageOps
import pillow_avif

ROOT=Path(__file__).resolve().parents[1]
CANDIDATE=ROOT/"assets/fysen-image-candidates/grillet-biff/27643022"
PUBLIC=ROOT/"apps/web/public/dish-images"
WEB=ROOT/"apps/web"
SOURCE_SHA="5be970f862fb8a62e3abc9ca4337d41498385968297d61119cb9a832ab6fa3c6"
APPROVED_SHA="7ff8d4e6d7c20e30276d1e4cdf4c0ef105f9e97ac572c7d37a02ac2243dd1b52"

def digest(p:Path)->str:
    return sha256(p.read_bytes()).hexdigest()

def replace_once(path:Path,before:str,after:str)->None:
    s=path.read_text(encoding="utf8")
    assert s.count(before)==1,f"Expected one anchor in {path}: {before[:70]}"
    path.write_text(s.replace(before,after,1),encoding="utf8")

def main():
    evidence=CANDIDATE/"black-review.json"
    review=json.loads(evidence.read_text(encoding="utf8"))
    assert review["source_sha256"]==SOURCE_SHA
    assert review["native_review_size"]==[6000,4000]
    assert review["native_review_sha256"]==APPROVED_SHA
    assert review["visual_review_completed"] is False
    assert review["approved_for_fysen"] is False
    assert review["published"] is False

    runpy.run_path(str(ROOT/"scripts/preview-grillet-biff-black.py"),run_name="__main__")
    native=CANDIDATE/"black-native-master.png"
    assert digest(native)==APPROVED_SHA,"Native image differs from reviewed pixels"
    archived=ROOT/"assets/fysen-dish-originals/grillet-biff.png"
    master=PUBLIC/"grillet-biff-master-6000.avif"
    thumb=PUBLIC/"grillet-biff-thumb-512.avif"
    document=ROOT/"docs/fysen-image-reviews/grillet-biff.md"
    for p in (archived,master,thumb,document):
        assert not p.exists(),f"Do not overwrite existing output {p}"
    with Image.open(native) as photo:
        photo.load()
        assert photo.size==(6000,4000) and photo.mode=="RGB"
        # Corners must truly be pitch black; no fake canvas or black-border claim.
        for loc in ((0,0),(5999,0),(0,3999),(5999,3999)):
            assert photo.getpixel(loc)==(0,0,0)
        photo.save(master,format="AVIF",quality=87,speed=5)
        ImageOps.pad(photo,(512,512),method=Image.Resampling.LANCZOS,
                     color=(0,0,0)).save(thumb,format="AVIF",quality=83,speed=5)
    shutil.copyfile(native,archived)
    assert digest(archived)==APPROVED_SHA
    large_sha=digest(master)

    manifest_path=PUBLIC/"manifest.json"
    manifest=json.loads(manifest_path.read_text(encoding="utf8"))
    dish=next(i for i in manifest["images"] if i["id"]=="grillet-biff")
    assert dish["atlas"]=="grillet-biff-512.avif"
    assert dish["catalogId"] is None
    assert "largeSource" not in dish
    dish.update({
      "atlas":thumb.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":"Lisensiert redaksjonelt foto av grillet biff med stekeskorpe, potetbåter og små grønne paprika på mørkt fat. Ingen tomater eller dokumentert medium-rare stekegrad. Dette er ikke et faktisk restaurantfoto.",
      "largeSourceOriginalPath":"assets/fysen-dish-originals/grillet-biff.png",
      "largeSource":master.name,
      "largeSourceNativeWidth":6000,
      "largeSourceNativeHeight":4000,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":large_sha,
      "largeSourceOriginalSha256":APPROVED_SHA,
      "largeSourceReview":"docs/fysen-image-reviews/grillet-biff.md",
      "largeViewEnabled":True,
      "photoCredit":"Nano Erdozain / Pexels",
      "photoSource":"https://www.pexels.com/photo/a-steak-and-fries-on-a-plate-with-a-fork-27643022/",
      "photoLicense":"https://www.pexels.com/license/",
    })
    manifest_path.write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+"\n",encoding="utf8")

    document.write_text(
      "# Grillet biff – kilde- og skarphetskontroll (19. november 2026)\n\n"
      "Beslutning: **Godkjent som representativt redaksjonelt rettfoto**, "
      "ikke som faktisk bilde av en navngitt restaurants servering.\n\n"
      "- Fotograf: Nano Erdozain / Pexels\n"
      "- Kilde: https://www.pexels.com/photo/a-steak-and-fries-on-a-plate-with-a-fork-27643022/\n"
      "- Lisens: https://www.pexels.com/license/\n"
      "- Originalfoto: 6000 × 4000 ekte kildepiksler, SHA-256 "+SOURCE_SHA+"\n"
      "- Matens kildepiksler er beholdt ved 1:1; kun masken ble skalert "
      "for å fjerne trebakgrunnen. Ingen oppskalering, collage eller KI-rekonstruksjon.\n"
      "- Visuell kontroll: hele biffen, potetbåter og små grønne paprika bevart "
      "på mørkt fat mot svart bakgrunn, naturlig steketekstur ved 1400×1400 detaljutnitt.\n"
      "- Ingen påstand om tomater, stekegrad i kjernen eller en bestemt restaurant.\n"
      "- Stororiginal: grillet-biff-master-6000.avif (6000 × 4000).\n"
      "- Separat miniatyr: grillet-biff-thumb-512.avif (512 × 512), "
      "hele serveringen bevart i rammen.\n"
      "- Offentlig HTTP-/mobil-/iPad-kontroll gjenstår til neste Vercel-publisering.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Retained reviewed PNG SHA-256: "+APPROVED_SHA+"\n",
      encoding="utf8"
    )

    css=WEB/"styles/dish-photos.css"
    replace_once(css,
      '.dishPhotoThumb.dishPhotoGrilledSteak {\n  background: #000 url("/dish-images/grillet-biff-512.avif") center / cover no-repeat;',
      '.dishPhotoThumb.dishPhotoGrilledSteak {\n  background: #000 url("/dish-images/grillet-biff-thumb-512.avif") center / contain no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    replace_once(gallery,
      '          <a href="/dish-images/sushi-master-2100.avif" target="_blank" rel="noopener noreferrer">',
      '          <a href="/dish-images/grillet-biff-master-6000.avif" target="_blank" rel="noopener noreferrer">\n            Grillet biff <span aria-hidden="true">↗</span>\n          </a>\n          <a href="/dish-images/sushi-master-2100.avif" target="_blank" rel="noopener noreferrer">'
    )
    tests=WEB/"tests/dish-photo-gallery.test.mjs"
    s=tests.read_text(encoding="utf8")
    assert "grillet-biff-512" in s and "approved.length, 7" in s
    s=s.replace("grillet-biff-512","grillet-biff-thumb-512")
    s=s.replace("approved.length, 7","approved.length, 8",1)
    s=s.replace("[0,1,2,5,6,10,11].includes(index)",
                "[0,1,2,3,5,6,10,11].includes(index)",1)
    s=s.replace("Pizza margherita, cheeseburger, grilled salmon, sushi, ramen, carbonara and butter chicken need approved full-size masters",
                "Pizza margherita, cheeseburger, grilled salmon, grilled steak, sushi, ramen, carbonara and butter chicken need approved full-size masters",1)
    tests.write_text(s,encoding="utf8")

    evidence_data=json.loads(evidence.read_text(encoding="utf8"))
    evidence_data["visual_review_completed"]=True
    evidence_data["approved_for_fysen"]=True
    evidence_data["published"]=False
    evidence_data["final_native_png_sha256"]=APPROVED_SHA
    evidence_data["final_master_avif_sha256"]=large_sha
    evidence.write_text(json.dumps(evidence_data,indent=2,ensure_ascii=False)+"\n",encoding="utf8")
    print("APPROVED native 6000x4000 steak and separate 512px AVIF; NOT DEPLOYED")

if __name__=="__main__":
    main()
