#!/usr/bin/env python3
"""Promote SHA-locked Susanne Nilsson shrimp sandwich photo in this PR only.

Modified photograph is distributed under CC BY-SA 2.0 with visible credit,
source/changes, license notice. No deployment is performed here.
"""
from __future__ import annotations
from hashlib import sha256
import json,runpy,shutil
from pathlib import Path
from PIL import Image,ImageOps
import pillow_avif

ROOT=Path(__file__).resolve().parents[1]
CAND=ROOT/"assets/fysen-image-candidates/rekesmorbrod/commons/shrimp-sandwich-29796272404"
PUBLIC=ROOT/"apps/web/public/dish-images"
WEB=ROOT/"apps/web"
ORIGINAL_SHA="070eca986e5cd10cb4b3a91e139e01d2183f4002b370406b0d6c839c378c7612"
REVIEWED_SHA="8c9c449a9a000631fdffe6b229c0f75bc603f5e7952f792529cb0d639bdb3197"
SOURCE="https://commons.wikimedia.org/wiki/File:Shrimp_sandwich_(29796272404).jpg"
LICENSE="https://creativecommons.org/licenses/by-sa/2.0/"

def digest(p:Path)->str:
    return sha256(p.read_bytes()).hexdigest()
def replace_once(path:Path,before:str,after:str)->None:
    content=path.read_text(encoding="utf-8")
    assert content.count(before)==1,f"Expected exactly one anchor in {path}: {before[:85]}"
    path.write_text(content.replace(before,after,1),encoding="utf-8")

def main():
    evidence_path=CAND/"black-commons-review.json"
    evidence=json.loads(evidence_path.read_text(encoding="utf-8"))
    assert evidence["source_sha256"]==ORIGINAL_SHA
    assert evidence["derivative_sha256"]==REVIEWED_SHA
    assert evidence["derivative_dimensions"]==[5899,4000]
    assert evidence["source_author_verified"] is True
    assert evidence["source_license_verified"] is True
    assert evidence["derivative_requires_attribution_and_sharealike"] is True
    assert evidence["visual_review_completed"] is False
    assert evidence["approved_for_fysen"] is False

    # Must reproduce exactly the chosen physical source pixels and mask.
    runpy.run_path(str(ROOT/"scripts/preview-rekesmorbrod-commons-black.py"),run_name="__main__")
    raw=CAND/"black-commons-native-master.png"
    assert digest(raw)==REVIEWED_SHA,"Reviewed pixels changed"
    archive=ROOT/"assets/fysen-dish-originals/rekesmorbrod.png"
    master=PUBLIC/"rekesmorbrod-master-5899.avif"
    mini=PUBLIC/"rekesmorbrod-thumb-512.avif"
    review=ROOT/"docs/fysen-image-reviews/rekesmorbrod.md"
    license_notice=PUBLIC/"rekesmorbrod-LICENSE.txt"
    for output in (archive,master,mini,review,license_notice):
        assert not output.exists(),f"Cannot overwrite existing image/source rights: {output}"
    with Image.open(raw) as img:
        img.load()
        assert img.mode=="RGB" and img.size==(5899,4000)
        for corner in ((0,0),(5898,0),(0,3999),(5898,3999)):
            assert img.getpixel(corner)==(0,0,0)
        img.save(master,format="AVIF",quality=88,speed=5)
        ImageOps.pad(img,(512,512),method=Image.Resampling.LANCZOS,color=(0,0,0)).save(
            mini,format="AVIF",quality=84,speed=5)
    shutil.copyfile(raw,archive)
    assert digest(archive)==REVIEWED_SHA
    master_sha=digest(master)

    manifest_path=PUBLIC/"manifest.json"
    manifest=json.loads(manifest_path.read_text(encoding="utf-8"))
    dish=next(e for e in manifest["images"] if e["id"]=="rekesmorbrod")
    assert dish["atlas"]=="rekesmorbrod-512.avif"
    assert dish["catalogId"] is None
    assert "largeSource" not in dish
    dish.update({
      "atlas":mini.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":"Redaksjonelt foto av nordisk rekesmørbrød på rugbrød med rensede reker, sitron, salat, reddik og grønnsaker på hvit tallerken. Ikke et faktisk restaurantfoto; serveringen kan variere. Bearbeidet fra CC BY-SA 2.0-original.",
      "largeSourceOriginalPath":"assets/fysen-dish-originals/rekesmorbrod.png",
      "largeSource":master.name,
      "largeSourceNativeWidth":5899,
      "largeSourceNativeHeight":4000,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":master_sha,
      "largeSourceOriginalSha256":REVIEWED_SHA,
      "largeSourceReview":"docs/fysen-image-reviews/rekesmorbrod.md",
      "largeViewEnabled":True,
      "photoCredit":"Susanne Nilsson / Wikimedia Commons, CC BY-SA 2.0 (bearbeidet)",
      "photoSource":SOURCE,
      "photoLicense":LICENSE,
      "photoLicenseNotice":"/dish-images/rekesmorbrod-LICENSE.txt",
    })
    manifest_path.write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")

    review.write_text(
      "# Rekesmørbrød – kontrollert fotografisk storbilde (19. november 2026)\n\n"
      "**Beslutning:** Kvalitetsgodkjent representativt rettfoto, ikke en konkret restaurants servering.\n\n"
      "- Fotograf: **Susanne Nilsson**; kilde: "+SOURCE+"\n"
      "- Rettigheter: **CC BY-SA 2.0** "+LICENSE+" (frigitt og kildekontrollert på Wikimedia Commons).\n"
      "- Modifikasjon: beholdt fotografiets ekte 5899 × 4000 kildepiksler; "
      "bare bordbakgrunnen utenfor tallerkenen ble maskert til helsvart. "
      "Ingen KI-generering, oppskalering, collager eller nye matdetaljer.\n"
      "- Opphavsfoto SHA-256: "+ORIGINAL_SHA+"\n"
      "- Retinert bearbeidet PNG SHA-256: "+REVIEWED_SHA+"\n"
      "- Hele firkantede tallerkenen, brødet, reker, salat, sitron, reddik og pynt er bevart. "
      "1400 × 1400 faktiske kildepiksler kontrollert for naturlig detalj.\n"
      "- Stor-AVIF: rekesmorbrod-master-5899.avif, 5899 × 4000.\n"
      "- Separat miniatyr: rekesmorbrod-thumb-512.avif, 512 × 512, full servering synlig.\n"
      "- Bearbeidede PNG/AVIF-filer deles under **samme CC BY-SA 2.0**. "
      "Kilde, kreditering, endringsbeskrivelse og lisens finnes også i "
      "/dish-images/rekesmorbrod-LICENSE.txt for nettstedets besøkende.\n"
      "- Offentlig HTTP, mobil og iPad kan først kontrolleres ved en senere, særskilt Vercel-publisering.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Retained reviewed PNG SHA-256: "+REVIEWED_SHA+"\n",
      encoding="utf-8"
    )
    license_notice.write_text(
      "REKESMØRBRØD – FOTO, KILDE OG BEARBEIDELSE\n"
      "Foto: Susanne Nilsson\n"
      "Original: "+SOURCE+"\n"
      "Lisens: Creative Commons Attribution-ShareAlike 2.0 Generic (CC BY-SA 2.0)\n"
      "Lisenslenke: "+LICENSE+"\n"
      "Endringer: mørk bordbakgrunn utenfor hele tallerkenen erstattet med helsvart "
      "ved myk maske. Kildepikslene i maten er bevart, ingen oppskalering.\n"
      "Dette fotografiet og bearbeidede versjoner (PNG/AVIF) er tilgjengelige under "
      "CC BY-SA 2.0. Behold navn, kilde, endringsbeskrivelse og samme eller kompatibel "
      "lisens ved videre bearbeiding.\n",
      encoding="utf-8"
    )

    css=WEB/"styles/dish-photos.css"
    replace_once(css,
      '.dishPhotoThumb.dishPhotoShrimpOpenSandwich {\n  background: #000 url("/dish-images/rekesmorbrod-512.avif") center / cover no-repeat;',
      '.dishPhotoThumb.dishPhotoShrimpOpenSandwich {\n  background: #000 url("/dish-images/rekesmorbrod-thumb-512.avif") center / contain no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    replace_once(gallery,
      '          <a href="/dish-images/sushi-master-2100.avif" target="_blank" rel="noopener noreferrer">',
      '          <a href="/dish-images/rekesmorbrod-master-5899.avif" target="_blank" rel="noopener noreferrer">\n            Rekesmørbrød <span aria-hidden="true">↗</span>\n          </a>\n          <small>Rekesmørbrød-foto: Susanne Nilsson, <a href="/dish-images/rekesmorbrod-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-SA 2.0 (bearbeidet, kilde og lisens)</a>.</small>\n          <a href="/dish-images/sushi-master-2100.avif" target="_blank" rel="noopener noreferrer">'
    )
    tests=WEB/"tests/dish-photo-gallery.test.mjs"
    code=tests.read_text(encoding="utf-8")
    assert "rekesmorbrod-512" in code and "approved.length, 8" in code
    code=code.replace("rekesmorbrod-512","rekesmorbrod-thumb-512")
    code=code.replace("approved.length, 8","approved.length, 9",1)
    code=code.replace("[0,1,2,3,5,6,10,11].includes(index)",
                      "[0,1,2,3,4,5,6,10,11].includes(index)",1)
    code=code.replace(
      "Pizza margherita, cheeseburger, grilled salmon, grilled steak, sushi, ramen, carbonara and butter chicken need approved full-size masters",
      "Pizza margherita, cheeseburger, grilled salmon, grilled steak, shrimp sandwich, sushi, ramen, carbonara and butter chicken need approved full-size masters",
      1)
    tests.write_text(code,encoding="utf-8")
    quality=WEB/"tests/dish-image-large-view-quality.test.mjs"
    replace_once(quality,
      r'''    assert.match(photo.photoSource, /^https:\/\/www\.pexels\.com\/photo\//u);
    assert.match(photo.photoCredit, /Pexels/u);
    assert.match(photo.photoLicense, /^https:\/\//u);''',
      r'''    assert.match(photo.photoLicense, /^https:\/\//u);
    if (photo.id === "rekesmorbrod") {
      assert.match(photo.photoSource, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/u);
      assert.match(photo.photoCredit, /Susanne Nilsson.*CC BY-SA 2\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/licenses/by-sa/2.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/rekesmorbrod-LICENSE.txt");
      const notice = readFileSync(path.join(imageRoot, "rekesmorbrod-LICENSE.txt"), "utf8");
      assert.match(notice, /Foto: Susanne Nilsson/u);
      assert.match(notice, /CC BY-SA 2\.0/u);
    } else {
      assert.match(photo.photoSource, /^https:\/\/www\.pexels\.com\/photo\//u);
      assert.match(photo.photoCredit, /Pexels/u);
    }''')
    evidence_data=json.loads(evidence_path.read_text(encoding="utf-8"))
    evidence_data["visual_review_completed"]=True
    evidence_data["approved_for_fysen"]=True
    evidence_data["published"]=False
    evidence_data["final_native_png_sha256"]=REVIEWED_SHA
    evidence_data["final_master_avif_sha256"]=master_sha
    evidence_path.write_text(json.dumps(evidence_data,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print("PROMOTED CC BY-SA 2.0 licensed 5899x4000 shrimp sandwich + 512 mini, not deployed")

if __name__=="__main__":
    main()
