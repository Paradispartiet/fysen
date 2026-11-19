#!/usr/bin/env python3
"""Promote reviewed native bacon cheeseburger in same PR; no deploy."""
from __future__ import annotations
from hashlib import sha256
import json, runpy, shutil
from pathlib import Path
from PIL import Image, ImageOps
import pillow_avif

ROOT=Path(__file__).resolve().parents[1]
CANDIDATE=ROOT/"assets/fysen-image-candidates/cheeseburger/18713426"
IMAGES=ROOT/"apps/web/public/dish-images"
WEB=ROOT/"apps/web"
SOURCE_SHA="ef35fee12f8adf8c34ac46c48dde19d6e57b714a1defd2a194fe7a2dc62dd198"
APPROVED_SHA="47def19fdd584410a304a7acb0ae19129b110b0afd23c42bc5502f91d2d998e4"

def digest(path):
    return sha256(path.read_bytes()).hexdigest()

def replace_once(path,old,new):
    s=path.read_text(encoding="utf8")
    assert s.count(old)==1,(path,old)
    path.write_text(s.replace(old,new,1),encoding="utf8")

def main():
    evidence_path=CANDIDATE/"black-alt-review.json"
    evidence=json.loads(evidence_path.read_text(encoding="utf8"))
    assert evidence["native_black_size"]==[2185,1800]
    assert evidence["native_black_sha256"]==APPROVED_SHA
    assert evidence["source_sha256"]==SOURCE_SHA
    assert evidence["approved_for_fysen"] is False
    runpy.run_path(str(ROOT/"scripts/preview-cheeseburger-alternative.py"))
    native=CANDIDATE/"black-native-2185x1800.png"
    assert digest(native)==APPROVED_SHA,"Output differs from reviewed source"
    archived=ROOT/"assets/fysen-dish-originals/cheeseburger.png"
    master=IMAGES/"cheeseburger-master-2185.avif"
    thumb=IMAGES/"cheeseburger-thumb-512.avif"
    review=ROOT/"docs/fysen-image-reviews/cheeseburger.md"
    for p in (archived,master,thumb,review):
        assert not p.exists(),f"Existing reviewed file: {p}"
    with Image.open(native) as image:
        image.load()
        assert image.mode=="RGB" and image.size==(2185,1800)
        image.save(master,format="AVIF",quality=88,speed=5)
        ImageOps.pad(image,(512,512),method=Image.Resampling.LANCZOS,color=(0,0,0)).save(
            thumb,format="AVIF",quality=84,speed=5)
    shutil.copyfile(native,archived)
    assert digest(archived)==APPROVED_SHA
    master_sha=digest(master)
    path=IMAGES/"manifest.json"
    manifest=json.loads(path.read_text(encoding="utf8"))
    entry=next(item for item in manifest["images"] if item["id"]=="cheeseburger")
    assert entry["atlas"]=="cheeseburger-bacon-512.avif"
    assert "largeSource" not in entry
    entry.update({
      "atlas":thumb.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":"Lisensiert rettfoto av bacon-cheeseburger med storfekjøtt og smeltet ost, uten pommes frites. Dette er ikke et faktisk restaurantfoto eller en bestemt restaurants servering.",
      "largeSourceOriginalPath":"assets/fysen-dish-originals/cheeseburger.png",
      "largeSource":master.name,
      "largeSourceNativeWidth":2185,
      "largeSourceNativeHeight":1800,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":master_sha,
      "largeSourceOriginalSha256":APPROVED_SHA,
      "largeSourceReview":"docs/fysen-image-reviews/cheeseburger.md",
      "largeViewEnabled":True,
      "photoCredit":"Jonathan Borba / Pexels",
      "photoSource":"https://www.pexels.com/photo/cheeseburger-on-black-background-18713426/",
      "photoLicense":"https://www.pexels.com/license/",
    })
    path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    review.write_text(
      "# Cheeseburger med bacon – visuell kvalitetskontroll (19. november 2026)\n\n"
      "Godkjent som representativt redaksjonelt rettfoto, ikke restaurantfoto.\n\n"
      "- Fotograf: Jonathan Borba / Pexels\n"
      "- Kilde: https://www.pexels.com/photo/cheeseburger-on-black-background-18713426/\n"
      "- Lisens: https://www.pexels.com/license/\n"
      "- Verifisert 2185 × 3277 kilde-JPEG, SHA-256 "+SOURCE_SHA+"\n"
      "- Native beskjæring (0,1450) til (2185,3250): 2185 × 1800 ekte piksler.\n"
      "- Kun mørke bakgrunnspiksler svartlagt; gulvrefleks tonet bort under bunnbrødet.\n"
      "- Ingen oppskalering, atlasutsnitt eller kollasj.\n"
      "- Motivet viser hel burger, storfekjøtt, bacon og ost; ikke pommes frites.\n"
      "- 1400px originaldetalj vurdert ved faktisk 1:1, synlig kjøtt- og bacontekstur.\n"
      "- 2185px AVIF-storbilde og selvstendig 512px AVIF-miniatyr.\n"
      "- Offentlig bilde-URL og iPad/mobil-test gjenstår til neste Vercel-deploy.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Retained reviewed PNG SHA-256: "+APPROVED_SHA+"\n",
      encoding="utf8"
    )
    css=WEB/"styles/dish-photos.css"
    replace_once(css,
      '.dishPhotoThumb.dishPhotoCheeseburger {\n  background: #000 url("/dish-images/cheeseburger-bacon-512.avif") center / cover no-repeat;',
      '.dishPhotoThumb.dishPhotoCheeseburger,\n.dishPhotoSmall.dishPhotoCheeseburger {\n  background: #000 url("/dish-images/cheeseburger-thumb-512.avif") center / cover no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    replace_once(gallery,
      '          <a href="/dish-images/sushi-master-2100.avif" target="_blank" rel="noopener noreferrer">',
      '          <a href="/dish-images/cheeseburger-master-2185.avif" target="_blank" rel="noopener noreferrer">\n            Cheeseburger med bacon <span aria-hidden="true">↗</span>\n          </a>\n          <a href="/dish-images/sushi-master-2100.avif" target="_blank" rel="noopener noreferrer">')
    tests=WEB/"tests/dish-photo-gallery.test.mjs"
    s=tests.read_text(encoding="utf8")
    assert "cheeseburger-bacon-512" in s
    s=s.replace("cheeseburger-bacon-512","cheeseburger-thumb-512")
    assert "approved.length, 5" in s and "[0,5,6,10,11].includes(index)" in s
    s=s.replace("approved.length, 5","approved.length, 6",1)
    s=s.replace("[0,5,6,10,11].includes(index)","[0,1,5,6,10,11].includes(index)",1)
    s=s.replace("Pizza margherita, sushi, ramen, carbonara and butter chicken need approved full-size masters",
                "Pizza margherita, cheeseburger, sushi, ramen, carbonara and butter chicken need approved full-size masters",1)
    tests.write_text(s,encoding="utf8")
    evidence=json.loads(evidence_path.read_text(encoding="utf8"))
    evidence["visual_review_completed"]=True
    evidence["approved_for_fysen"]=True
    evidence["published"]=False
    evidence["final_native_png_sha256"]=APPROVED_SHA
    evidence["final_master_sha256"]=master_sha
    evidence_path.write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("PROMOTED reviewed cheeseburger native image with 512px thumb; not deployed")

if __name__=="__main__":
    main()
