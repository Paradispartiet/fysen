#!/usr/bin/env python3
"""Promote verified chana masala photo ONLY to unpublished Matlyst draft."""
from __future__ import annotations
from hashlib import sha256
from pathlib import Path
import json,runpy
import numpy as np
import cv2
from PIL import Image,ImageOps
import pillow_avif  # noqa: F401

ROOT=Path(__file__).resolve().parents[1]
C=ROOT/"assets/fysen-image-candidates/chana-masala/nazir-whole-bowl"
PUBLIC=ROOT/"apps/web/public/dish-images"
WEB=ROOT/"apps/web"
SOURCE_SHA="3acb2c0e55258b84b83ea37488282bd67b873f710b4afdff5b0a1d39afabf7ca"
AUTHOR="Muhammad Khawar Nazir / Pexels"
PHOTO_URL="https://www.pexels.com/photo/overhead-shot-of-chana-masala-9287039/"
LICENSE="https://www.pexels.com/license/"

def digest(p:Path)->str:return sha256(p.read_bytes()).hexdigest()
def edit_once(path:Path,old:str,new:str):
    text=path.read_text(encoding="utf8")
    assert text.count(old)==1,f"Expected exactly one anchor in {path}: {old[:70]}"
    path.write_text(text.replace(old,new,1),encoding="utf8")

def main():
    review_path=C/"review.json"
    audit_path=C/"black-review.json"
    review=json.loads(review_path.read_text(encoding="utf8"))
    audit=json.loads(audit_path.read_text(encoding="utf8"))
    assert review["original_sha256"]==SOURCE_SHA and review["source_verified"]
    assert review["catalog_id"]==review["dish_id"]=="chana-masala"
    assert review["photo_author"]==AUTHOR and review["no_upscale"]
    assert (review["native_width"],review["native_height"])==(3814,3024)
    assert not review["approved_for_fysen"] and not review["published"]
    assert audit["source_original_sha256"]==SOURCE_SHA
    assert audit["no_upscale"] and not audit["generated_food_pixels"]
    assert not audit["approved_for_fysen"] and not audit["published"]
    selected="black-grabcut"
    preview=C/(selected+"-preview.jpg")
    detail=C/(selected+"-native-detail-1400.jpg")
    assert preview.is_file() and detail.is_file()
    preview_sha=digest(preview)
    state=runpy.run_path(str(ROOT/"scripts/preview-chana-masala-black.py"),run_name="__main__")
    assert digest(preview)==preview_sha,"Selected reviewed mask has changed"
    photo=state["photo"]
    W,H=photo.size
    assert (W,H)==(3814,3024)
    mask=state["grab"]
    alpha=cv2.resize(mask,(W,H),interpolation=cv2.INTER_LINEAR)
    alpha=cv2.GaussianBlur(alpha,(0,0),1.0)
    src=np.asarray(photo)
    composite=((src.astype(np.uint16)*alpha[:,:,None].astype(np.uint16)+127)//255).astype(np.uint8)
    output=Image.fromarray(composite,"RGB")
    for point in [(0,0),(W-1,0),(0,H-1),(W-1,H-1)]:
        assert output.getpixel(point)==(0,0,0)
    original=ROOT/"assets/fysen-dish-originals/chana-masala.png"
    master=PUBLIC/"chana-masala-master-3814.avif"
    mini=PUBLIC/"chana-masala-thumb-512.avif"
    notice=PUBLIC/"chana-masala-LICENSE.txt"
    report=ROOT/"docs/fysen-image-reviews/chana-masala.md"
    for f in [original,master,mini,notice,report]:
        assert not f.exists(),f"Must not overwrite existing image: {f}"
    output.save(original,format="PNG",compress_level=5)
    output.save(master,format="AVIF",quality=89,speed=6)
    ImageOps.pad(output,(512,512),method=Image.Resampling.LANCZOS,
                 color=(0,0,0)).save(mini,format="AVIF",quality=86,speed=5)
    orig_sha=digest(original);master_sha=digest(master)
    with Image.open(master) as p:assert p.size==(3814,3024)
    with Image.open(mini) as p:assert p.size==(512,512)

    manifest=PUBLIC/"manifest.json"
    data=json.loads(manifest.read_text(encoding="utf8"))
    assert len(data["images"])==44
    assert sum(x.get("largeViewEnabled") is True for x in data["images"])==21
    chana=data["images"][22]
    assert chana["id"]==chana["catalogId"]=="chana-masala" and chana["index"]==22
    assert chana["atlas"]=="chana-masala-768.avif" and chana["kind"]=="AI-illustrasjon"
    assert not chana.get("largeViewEnabled") and not chana.get("largeSource")
    chana.update({
      "atlas":mini.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":("Lisensiert redaksjonelt foto av chana masala med kikerter i gyllengul "
        "krydret saus, løk og grønne urter i keramikkskål mot svart bakgrunn. "
        "Øverste skålkant er litt beskåret i kildefotoet. Ikke restaurantfoto "
        "eller dokumentasjon av en bestemt restaurantservering; ingredienser varierer."),
      "largeSourceOriginalPath":"assets/fysen-dish-originals/chana-masala.png",
      "largeSource":master.name,
      "largeSourceNativeWidth":3814,
      "largeSourceNativeHeight":3024,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":master_sha,
      "largeSourceOriginalSha256":orig_sha,
      "largeSourceReview":"docs/fysen-image-reviews/chana-masala.md",
      "largeViewEnabled":True,
      "photoCredit":AUTHOR,
      "photoSource":PHOTO_URL,
      "photoLicense":LICENSE,
      "photoLicenseNotice":"/dish-images/chana-masala-LICENSE.txt"
    })
    manifest.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    notice.write_text(
      "Chana masala – bearbeidet redaksjonelt fotografi\n"
      "Fotograf: "+AUTHOR+"\n"
      "Original: "+PHOTO_URL+"\n"
      "Lisens: Pexels License, "+LICENSE+"\n"
      "Bearbeidet: Ekte 3814 × 3024 Pexels-original med kikerter i gyllengul krydret saus "
      "og urter, skålen frilagt fra brodert duk mot ren svart bakgrunn. "
      "Øverste kant er litt beskåret i opprinnelig kilde. Ingen matpiksler generert, "
      "ingen oppskalering. Eget 3814 × 3024 AVIF-storbilde og 512 × 512 miniatyr.\n"
      "Redaksjonelt foto, ikke en faktisk Fysen-restaurantservering.\n"
      "Original JPEG SHA-256: "+SOURCE_SHA+"\n"
      "Frilagt PNG SHA-256: "+orig_sha+"\n",encoding="utf8")
    report.write_text(
      "# Chana masala – ekte kilde kontrollert og godkjent i utkastkjeden\n\n"
      "Frilagt original av chana masala, kikerter i gul krydret saus med grønt og løk, "
      "mot svart bakgrunn. Kildebildet beskjærer litt av øverste skålkant. "
      "Ikke restaurantfoto.\n\n"
      "- Fotograf: "+AUTHOR+", "+PHOTO_URL+"\n"
      "- Lisens: Pexels License, "+LICENSE+"\n"
      "- Faktisk JPEG original: 3814 × 3024, SHA-256 "+SOURCE_SHA+"\n"
      "- Tre ekte originale fotokandidater kontrollert; to andre brukt kun til sammenligning.\n"
      "- GrabCut valgt etter forhåndsvisning av contour og grabcut; ingen duk eller "
      "andre retter beholdt. Originalkilde bevart uten genererte matpiksler eller oppskalering.\n"
      "- Ekte 1400 × 1400 detaljutsnitt inspisert.\n"
      "- AVIF master: chana-masala-master-3814.avif (3814 × 3024), "
      "egen miniatyr: chana-masala-thumb-512.avif (512 × 512).\n"
      "- Ingen database, meny, pris eller produksjonspublisering endret.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Frilagt PNG SHA-256: "+orig_sha+"\n"
      "Visuelt inspisert preview SHA-256: "+preview_sha+"\n",encoding="utf8")
    css=WEB/"styles/dish-photos.css"
    edit_once(css,
       'background: #000 url("/dish-images/chana-masala-768.avif") center / cover no-repeat;',
       'background: #000 url("/dish-images/chana-masala-thumb-512.avif") center / contain no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    edit_once(gallery,
       '          <small>Tacos al pastor-foto: Abner Velázquez / Pexels, <a href="/dish-images/tacos-al-pastor-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>',
       '          <small>Tacos al pastor-foto: Abner Velázquez / Pexels, <a href="/dish-images/tacos-al-pastor-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>\n'
       '          <a href="/dish-images/chana-masala-master-3814.avif" target="_blank" rel="noopener noreferrer">\n'
       '            Chana masala <span aria-hidden="true">↗</span>\n'
       '          </a>\n'
       '          <small>Chana masala-foto: Muhammad Khawar Nazir / Pexels, <a href="/dish-images/chana-masala-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>')
    testfile=WEB/"tests/dish-photo-gallery.test.mjs"
    t=testfile.read_text(encoding="utf8")
    def edit(old,new,expected=1):
        nonlocal t
        assert t.count(old)==expected,f"Invalid test anchor {old[:80]}, count={t.count(old)}"
        t=t.replace(old,new)
    edit('approved.length, 21','approved.length, 22')
    edit('tacos al pastor need approved full-size masters',
         'tacos al pastor and chana masala need approved full-size masters')
    edit('index === 22 ? "chana-masala-768.avif"',
         'index === 22 ? "chana-masala-thumb-512.avif"')
    edit('[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21].includes(index)',
         '[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22].includes(index)')
    edit('public/dish-images/chana-masala-768.avif',
         'public/dish-images/chana-masala-thumb-512.avif')
    edit('file: "chana-masala-768.avif"','file: "chana-masala-thumb-512.avif"')
    start='test("Two exact editorial 768px images preserve cuisine identity and original file quality", () => {'
    next_start='test("Bolognese, prosciutto and kebab retain distinct correctly sized gallery AVIF images"'
    assert t.count(start)==1 and t.count(next_start)==1
    a=t.index(start);b=t.index(next_start,a)
    section=t[a:b]
    section=section.replace("Two exact editorial 768px images preserve cuisine identity and original file quality",
                            "Chana original-photo thumbnail and separate dosa illustration preserve cuisine identity")
    section=section.replace('assert.equal(bytes.readUInt32BE(ispe + 8), 768);',
                            'assert.equal(bytes.readUInt32BE(ispe + 8), index === 22 ? 512 : 768);')
    section=section.replace('assert.equal(bytes.readUInt32BE(ispe + 12), 768);',
                            'assert.equal(bytes.readUInt32BE(ispe + 12), index === 22 ? 512 : 768);')
    assert 'index === 22 ? 512 : 768' in section
    section=section.replace('    assert.ok(css.includes(file));',
                            '''    assert.ok(css.includes(file));
    if (index === 22) {
      assert.equal(item.kind, "Redaksjonelt rettfoto");
      assert.equal(item.largeViewEnabled, true);
      assert.equal(item.largeSource, "chana-masala-master-3814.avif");
      assert.equal(item.largeSourceNativeWidth, 3814);
      assert.equal(item.largeSourceNativeHeight, 3024);
      assert.match(item.photoCredit, /Muhammad Khawar Nazir.*Pexels/u);
      assert.match(gallery, /href="\\/dish-images\\/chana-masala-master-3814\\.avif"/u);
    }''')
    t=t[:a]+section+t[b:]
    testfile.write_text(t,encoding="utf8")
    quality=WEB/"tests/dish-image-large-view-quality.test.mjs"
    edit_once(quality,'    } else if (photo.id === "tacos-al-pastor") {',
      '''    } else if (photo.id === "chana-masala") {
      assert.equal(photo.catalogId,"chana-masala");
      assert.equal(photo.photoLicense,"https://www.pexels.com/license/");
      assert.equal(photo.photoLicenseNotice,"/dish-images/chana-masala-LICENSE.txt");
      assert.match(photo.photoCredit,/Muhammad Khawar Nazir.*Pexels/u);
      const notice=readFileSync(path.join(imageRoot,"chana-masala-LICENSE.txt"),"utf8");
      assert.match(notice,/Fotograf: Muhammad Khawar Nazir/u);
      assert.match(notice,/Pexels License/u);
    } else if (photo.id === "tacos-al-pastor") {''')
    review.update({"visual_review_completed":True,"approved_for_fysen":True,"published":False})
    review_path.write_text(json.dumps(review,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    audit.update({"reviewed_variant":selected,"reviewed_preview_sha256":preview_sha,
        "original_processed_sha256":orig_sha,"master_avif_sha256":master_sha,
        "visual_review_completed":True,"approved_for_fysen":True,"published":False})
    audit_path.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("CHANA MASALA DRAFT: 3814x3024 native AVIF + 512 mini; 22/44 unpublished")

if __name__=="__main__":main()
