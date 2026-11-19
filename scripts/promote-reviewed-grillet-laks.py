#!/usr/bin/env python3
"""Promote a source-verified, visually reviewed full-size grilled salmon photo.

Exact SHA guards prevent unreviewed backgrounds from entering public Fysen.
No Vercel deployment; the gallery thumbnail remains independent.
"""
from __future__ import annotations
from hashlib import sha256
import json, runpy, shutil
from pathlib import Path
from PIL import Image, ImageOps
import pillow_avif

ROOT=Path(__file__).resolve().parents[1]
CANDIDATE=ROOT/"assets/fysen-image-candidates/grillet-laks/29149758"
IMAGE_DIR=ROOT/"apps/web/public/dish-images"
WEB=ROOT/"apps/web"
SOURCE_SHA="9a5c7a4d24b3d43a3b8efe25f1912a872489ee630563c28957304de8bc52a3ab"
APPROVED_SHA="36b3534b7f0c601f4685095424f4213b345eda505aa3ed7b9265a51b7c9e2a60"

def digest(path:Path)->str:
    return sha256(path.read_bytes()).hexdigest()

def replace_one(path:Path,old:str,new:str)->None:
    text=path.read_text(encoding="utf8")
    assert text.count(old)==1,f"Expected exactly one anchor in {path}: {old[:60]}"
    path.write_text(text.replace(old,new,1),encoding="utf8")

def main():
    review_path=CANDIDATE/"black-review.json"
    evidence=json.loads(review_path.read_text(encoding="utf8"))
    assert evidence["source_sha256"]==SOURCE_SHA
    assert evidence["review_native_size"]==[3489,3450]
    assert evidence["review_native_sha256"]==APPROVED_SHA,"Unreviewed salmon image"
    assert evidence["approved_for_fysen"] is False
    runpy.run_path(str(ROOT/"scripts/preview-grillet-laks-black.py"))
    native=CANDIDATE/"black-native-master.png"
    assert digest(native)==APPROVED_SHA,"Reproduction does not match approved image"

    archive=ROOT/"assets/fysen-dish-originals/grillet-laks.png"
    master=IMAGE_DIR/"grillet-laks-master-3489.avif"
    thumb=IMAGE_DIR/"grillet-laks-thumb-512.avif"
    review=ROOT/"docs/fysen-image-reviews/grillet-laks.md"
    for item in (archive,master,thumb,review):
        assert not item.exists(),f"Not overwriting existing media: {item}"
    with Image.open(native) as photo:
        photo.load()
        assert photo.size==(3489,3450) and photo.mode=="RGB"
        photo.save(master,format="AVIF",quality=88,speed=5)
        ImageOps.pad(photo,(512,512),method=Image.Resampling.LANCZOS,color=(0,0,0)).save(
            thumb,format="AVIF",quality=84,speed=5)
    shutil.copyfile(native,archive)
    assert digest(archive)==APPROVED_SHA
    master_sha=digest(master)

    manifest_path=IMAGE_DIR/"manifest.json"
    manifest=json.loads(manifest_path.read_text(encoding="utf8"))
    dish=next(img for img in manifest["images"] if img["id"]=="grillet-laks")
    assert dish["atlas"]=="grillet-laks-512.avif"
    assert dish["catalogId"] is None
    assert "largeSource" not in dish
    dish.update({
      "atlas":thumb.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":"Lisensiert foto av grillet laks med grønt, paprika, tomat og saus på mørk tallerken. Dette er ikke faktisk restaurantfoto; tilbehøret er et eksempel, ikke dokumentasjon av en bestemt meny.",
      "largeSourceOriginalPath":"assets/fysen-dish-originals/grillet-laks.png",
      "largeSource":master.name,
      "largeSourceNativeWidth":3489,
      "largeSourceNativeHeight":3450,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":master_sha,
      "largeSourceOriginalSha256":APPROVED_SHA,
      "largeSourceReview":"docs/fysen-image-reviews/grillet-laks.md",
      "largeViewEnabled":True,
      "photoCredit":"Nano Erdozain / Pexels",
      "photoSource":"https://www.pexels.com/photo/gourmet-salmon-dish-with-fresh-vegetables-29149758/",
      "photoLicense":"https://www.pexels.com/license/",
    })
    manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf8")

    review.write_text(
      "# Grillet laks – kilde- og skarphetsvurdering (19. november 2026)\n\n"
      "Beslutning: Godkjent som representativt redaksjonelt rettfoto. "
      "Ikke fotografi av en bestemt restaurants servering.\n\n"
      "- Fotograf: Nano Erdozain / Pexels\n"
      "- Kilde: https://www.pexels.com/photo/gourmet-salmon-dish-with-fresh-vegetables-29149758/\n"
      "- Lisens: https://www.pexels.com/license/\n"
      "- Verifisert JPEG-original: 3489 × 5234, SHA-256 "+SOURCE_SHA+"\n"
      "- Ekte kildepiksel-beskjæring til 3489 × 3450 med svart bakgrunnsmaske; "
      "matens piksler er ikke oppskalert eller generert på nytt.\n"
      "- Motiv: Laks med grønt, paprika, tomat og saus på mørk tallerken. "
      "Bakgrunnen er mørklagt mot svart rundt serveringen, uten hull i maten.\n"
      "- Faktiske native 1400×1400 kildepiksler gjennomgått: tydelig stekeskorpe og tekstur.\n"
      "- Stor-AVIF: grillet-laks-master-3489.avif. "
      "Separat 512px miniatyr: grillet-laks-thumb-512.avif.\n"
      "- Ingen tilordning til konkrete restauranter. Offentlig HTTP-kontroll, "
      "mobil og iPad gjenstår til senere Vercel-deploy.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Retained reviewed PNG SHA-256: "+APPROVED_SHA+"\n",
      encoding="utf8")

    css=WEB/"styles/dish-photos.css"
    replace_one(css,
      '.dishPhotoThumb.dishPhotoGrilledSalmon {\n  background: #000 url("/dish-images/grillet-laks-512.avif") center / cover no-repeat;',
      '.dishPhotoThumb.dishPhotoGrilledSalmon {\n  background: #000 url("/dish-images/grillet-laks-thumb-512.avif") center / contain no-repeat;'
    )
    replace_one(css,
      "/* Dedicated sharp grilled-salmon editorial illustration. Only the generic",
      "/* Dedicated licensed grilled-salmon photo. Only the generic"
    )
    gallery=WEB/"components/dish-photo-gallery.tsx"
    replace_one(gallery,
      '          <a href="/dish-images/sushi-master-2100.avif" target="_blank" rel="noopener noreferrer">',
      '          <a href="/dish-images/grillet-laks-master-3489.avif" target="_blank" rel="noopener noreferrer">\n            Grillet laks <span aria-hidden="true">↗</span>\n          </a>\n          <a href="/dish-images/sushi-master-2100.avif" target="_blank" rel="noopener noreferrer">'
    )
    test=WEB/"tests/dish-photo-gallery.test.mjs"
    content=test.read_text(encoding="utf8")
    assert "grillet-laks-512" in content and "approved.length, 6" in content
    content=content.replace("grillet-laks-512","grillet-laks-thumb-512")
    content=content.replace("approved.length, 6","approved.length, 7",1)
    content=content.replace("[0,1,5,6,10,11].includes(index)",
                            "[0,1,2,5,6,10,11].includes(index)",1)
    content=content.replace(
      "Pizza margherita, cheeseburger, sushi, ramen, carbonara and butter chicken need approved full-size masters",
      "Pizza margherita, cheeseburger, grilled salmon, sushi, ramen, carbonara and butter chicken need approved full-size masters",
      1)
    test.write_text(content,encoding="utf8")
    final=json.loads(review_path.read_text(encoding="utf8"))
    final["visual_review_completed"]=True
    final["approved_for_fysen"]=True
    final["published"]=False
    final["final_native_png_sha256"]=APPROVED_SHA
    final["final_master_sha256"]=master_sha
    review_path.write_text(json.dumps(final,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("APPROVED 3489x3450 native salmon + 512px AVIF mini; NOT DEPLOYED")

if __name__=="__main__":
    main()
