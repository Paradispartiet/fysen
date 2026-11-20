#!/usr/bin/env python3
"""Integrate visually inspected tacos al pastor original into UNPUBLISHED draft.

Recreate the exact reviewed black-background mask from the SHA-locked real Pexels
photograph, preserve native source detail, and run only photo tests. Never deploy.
"""
from __future__ import annotations
from hashlib import sha256
from pathlib import Path
import json, runpy
import numpy as np
import cv2
from PIL import Image, ImageOps
import pillow_avif  # noqa: F401

ROOT=Path(__file__).resolve().parents[1]
C=ROOT/"assets/fysen-image-candidates/tacos-al-pastor/abner-velazquez-pexels"
PUBLIC=ROOT/"apps/web/public/dish-images"
WEB=ROOT/"apps/web"
SOURCE_SHA="51994dfd3a610dad3b904ca567a007bf46cebc64746fde619a0c82c67c59acc9"
PHOTO_PAGE="https://www.pexels.com/photo/delicious-tacos-al-pastor-with-fresh-garnish-34289264/"
LICENSE="https://www.pexels.com/license/"
CREDIT="Abner Velázquez / Pexels"
LABEL="tacos-al-pastor"

def digest(p:Path)->str:
    return sha256(p.read_bytes()).hexdigest()

def unique_replace(p:Path,old:str,new:str):
    text=p.read_text(encoding="utf8")
    assert text.count(old)==1,f"Invalid unique replacement in {p}: {old[:90]}"
    p.write_text(text.replace(old,new,1),encoding="utf8")

def main():
    record=C/"review.json"
    audit_file=C/"black-review.json"
    candidate=json.loads(record.read_text(encoding="utf8"))
    audit=json.loads(audit_file.read_text(encoding="utf8"))
    assert candidate["original_sha256"]==SOURCE_SHA and candidate["source_verified"]
    assert candidate["photo_author"]==CREDIT and candidate["photo_page"]==PHOTO_PAGE
    assert candidate["catalog_id"]==LABEL and candidate["no_upscale"]
    assert (candidate["native_width"],candidate["native_height"])==(7008,4672)
    assert not candidate["approved_for_fysen"] and not candidate["published"]
    assert audit["source_original_sha256"]==SOURCE_SHA
    assert audit["source_native_dimensions"]==[7008,4672]
    assert audit["no_upscale"] and not audit["generated_food_pixels"]
    assert not audit["approved_for_fysen"] and not audit["published"]
    choice="black-clean-grabcut"
    before=C/f"{choice}-preview.jpg"
    detail=C/f"{choice}-native-detail-1400.jpg"
    assert before.is_file() and detail.is_file()
    inspected_sha=digest(before)
    # Regenerate from source JPEG and refuse changed pixels or a different mask.
    state=runpy.run_path(str(ROOT/"scripts/preview-tacos-al-pastor-black.py"),run_name="__main__")
    assert digest(before)==inspected_sha, "Visually inspected preview changed"
    W,H=state["W"],state["H"]
    assert (W,H)==(7008,4672)
    photo=state["photo"]
    mask=state["clean"]
    assert mask.shape==(800,1200)
    full_alpha=cv2.resize(mask,(W,H),interpolation=cv2.INTER_LINEAR)
    full_alpha=cv2.GaussianBlur(full_alpha,(0,0),1.0)
    source=np.asarray(photo)
    assert source.shape==(H,W,3)
    composite=((source.astype(np.uint16)*full_alpha[:,:,None].astype(np.uint16)+127)//255).astype(np.uint8)
    result=Image.fromarray(composite,"RGB")
    assert result.size==(W,H)
    for pixel in ((0,0),(W-1,0),(0,H-1),(W-1,H-1)):
        assert result.getpixel(pixel)==(0,0,0)
    original=ROOT/"assets/fysen-dish-originals/tacos-al-pastor.png"
    master=PUBLIC/"tacos-al-pastor-master-7008.avif"
    thumb=PUBLIC/"tacos-al-pastor-thumb-512.avif"
    notice=PUBLIC/"tacos-al-pastor-LICENSE.txt"
    review=ROOT/"docs/fysen-image-reviews/tacos-al-pastor.md"
    for file in (original,master,thumb,notice,review):
        assert not file.exists(),f"Refuse replacing existing asset {file}"
    result.save(original,format="PNG",compress_level=5,optimize=False)
    result.save(master,format="AVIF",quality=89,speed=6)
    ImageOps.pad(result,(512,512),method=Image.Resampling.LANCZOS,
                 color=(0,0,0)).save(thumb,format="AVIF",quality=86,speed=5)
    original_sha=digest(original)
    master_sha=digest(master)
    with Image.open(master) as p: assert p.size==(7008,4672)
    with Image.open(thumb) as p: assert p.size==(512,512)

    manifest=PUBLIC/"manifest.json"
    data=json.loads(manifest.read_text(encoding="utf8"))
    assert len(data["images"])==44
    assert sum(x.get("largeViewEnabled") is True for x in data["images"])==20
    target=next(p for p in data["images"] if p["id"]==LABEL)
    assert target["index"]==21 and target["catalogId"]==LABEL
    assert target["atlas"]=="tacos-al-pastor-768.avif"
    assert target["kind"]=="AI-illustrasjon"
    assert not target.get("largeViewEnabled") and not target.get("largeSource")
    target.update({
       "atlas":thumb.name,
       "kind":"Redaksjonelt rettfoto",
       "variantCaution":("Lisensiert redaksjonelt foto av tre hele tacos al pastor "
           "med marinert svinekjøtt, løk, koriander og lime mot svart bakgrunn. "
           "Ananas er ikke synlig på dette bildet. Ikke restaurantfoto eller "
           "dokumentasjon av en bestemt servering; ingredienser kan variere."),
       "largeSourceOriginalPath":"assets/fysen-dish-originals/tacos-al-pastor.png",
       "largeSource":master.name,
       "largeSourceNativeWidth":7008,
       "largeSourceNativeHeight":4672,
       "largeSourceMethod":"independent-original",
       "largeSourceSha256":master_sha,
       "largeSourceOriginalSha256":original_sha,
       "largeSourceReview":"docs/fysen-image-reviews/tacos-al-pastor.md",
       "largeViewEnabled":True,
       "photoCredit":CREDIT,
       "photoSource":PHOTO_PAGE,
       "photoLicense":LICENSE,
       "photoLicenseNotice":"/dish-images/tacos-al-pastor-LICENSE.txt"
    })
    manifest.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")

    notice.write_text(
       "Tacos al pastor – bearbeidet redaksjonelt fotografi\n"
       "Fotograf: "+CREDIT+"\n"
       "Original: "+PHOTO_PAGE+"\n"
       "Lisens: Pexels License, "+LICENSE+"\n"
       "Bearbeidet: Tre hele tacos, løk, koriander og lime er frilagt fra en "
       "delvis synlig mørk tallerken mot helsvart bakgrunn. Ananas er ikke "
       "synlig. Ingen genererte matpiksler og ingen oppskalering. "
       "Egen native 7008 × 4672 AVIF-master og 512 × 512 miniatyr.\n"
       "Kun redaksjonelt rettfoto, ikke fotografi av en Fysen-restaurant.\n"
       "Original JPEG SHA-256: "+SOURCE_SHA+"\n"
       "Frilagt PNG SHA-256: "+original_sha+"\n",encoding="utf8")
    review.write_text(
       "# Tacos al pastor – kildeverifisert og visuelt gjennomgått\n\n"
       "Tre hele tacos med svinekjøtt, løk, koriander og lime frilagt "
       "mot ren svart bakgrunn. Ingen synlig ananas; fotoet hevdes ikke å "
       "vise en bestemt restaurants servering.\n\n"
       "- Fotograf: "+CREDIT+", "+PHOTO_PAGE+"\n"
       "- Lisens: Pexels License, "+LICENSE+"\n"
       "- Native JPEG-kilde: 7008 × 4672, SHA-256 "+SOURCE_SHA+"\n"
       "- Tre autentiske fotokandidater kontrollert, hver med originale "
       "piksler, SHA-256 og egne previews.\n"
       "- Black-clean-grabcut valgt etter sammenligning med contour og "
       "grabcut; mørke tallerkenrester fjernet, hele tacos og lime beholdt.\n"
       "- Ekte native 1400 × 1400 detaljutsnitt kontrollert uten oppskalering.\n"
       "- Master: tacos-al-pastor-master-7008.avif (7008 × 4672); "
       "egen miniatyr: tacos-al-pastor-thumb-512.avif (512 × 512).\n"
       "- Ingen restaurantdata, menyer, priser, database eller offentlig "
       "publisering endres. PR er fortsatt utkast.\n\n"
       "Reviewed for full-size display: yes\n"
       "No collage crop or upscale: yes\n"
       "Correct dish and black background: yes\n\n"
       "Frilagt PNG SHA-256: "+original_sha+"\n"
       "Visuelt inspisert preview SHA-256: "+inspected_sha+"\n",
       encoding="utf8")
    unique_replace(WEB/"styles/dish-photos.css",
       'background: #000 url("/dish-images/tacos-al-pastor-768.avif") center / cover no-repeat;',
       'background: #000 url("/dish-images/tacos-al-pastor-thumb-512.avif") center / contain no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    unique_replace(gallery,
      '          <small>Falafel-foto: Saya P / Pexels, <a href="/dish-images/falafel-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>',
      '          <small>Falafel-foto: Saya P / Pexels, <a href="/dish-images/falafel-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>\n'
      '          <a href="/dish-images/tacos-al-pastor-master-7008.avif" target="_blank" rel="noopener noreferrer">\n'
      '            Tacos al pastor <span aria-hidden="true">↗</span>\n'
      '          </a>\n'
      '          <small>Tacos al pastor-foto: Abner Velázquez / Pexels, <a href="/dish-images/tacos-al-pastor-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>')

    tests=WEB/"tests/dish-photo-gallery.test.mjs"
    t=tests.read_text(encoding="utf8")
    def edit(old,new,expected=1):
        nonlocal t
        assert t.count(old)==expected,f"Bad test anchor {old[:65]}: {t.count(old)}"
        t=t.replace(old,new)
    edit('approved.length, 20','approved.length, 21')
    edit('and falafel need approved full-size masters',
         'falafel and tacos al pastor need approved full-size masters')
    edit('index === 21 ? "tacos-al-pastor-768.avif"',
         'index === 21 ? "tacos-al-pastor-thumb-512.avif"')
    edit('[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20].includes(index)',
         '[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21].includes(index)')
    edit('"public/dish-images/tacos-al-pastor-768.avif"',
         '"public/dish-images/tacos-al-pastor-thumb-512.avif"')
    edit('file: "tacos-al-pastor-768.avif"',
         'file: "tacos-al-pastor-thumb-512.avif"')
    edit('[13,19].includes(index) ? 512 : 768',
         '[13,19,21].includes(index) ? 512 : 768',2)
    edit('  assert.match(manifest.images[21].variantCaution, /ananas/iu);',
         '''  assert.match(manifest.images[21].variantCaution, /ananas/iu);
  assert.equal(manifest.images[21].kind, "Redaksjonelt rettfoto");
  assert.equal(manifest.images[21].largeViewEnabled, true);
  assert.equal(manifest.images[21].largeSource, "tacos-al-pastor-master-7008.avif");
  assert.equal(manifest.images[21].largeSourceNativeWidth, 7008);
  assert.equal(manifest.images[21].largeSourceNativeHeight, 4672);
  assert.match(manifest.images[21].photoCredit, /Abner Velázquez.*Pexels/u);
  assert.match(gallery, /href="\\/dish-images\\/tacos-al-pastor-master-7008\\.avif"/u);''')
    tests.write_text(t,encoding="utf8")

    quality=WEB/"tests/dish-image-large-view-quality.test.mjs"
    unique_replace(quality,'    } else if (photo.id === "falafel") {',
        '''    } else if (photo.id === "tacos-al-pastor") {
      assert.equal(photo.catalogId, "tacos-al-pastor");
      assert.equal(photo.photoLicense, "https://www.pexels.com/license/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/tacos-al-pastor-LICENSE.txt");
      assert.match(photo.photoCredit, /Abner Velázquez.*Pexels/u);
      const notice = readFileSync(path.join(imageRoot, "tacos-al-pastor-LICENSE.txt"), "utf8");
      assert.match(notice, /Fotograf: Abner Velázquez/u);
      assert.match(notice, /Pexels License/u);
    } else if (photo.id === "falafel") {''')

    candidate.update({"visual_review_completed":True,"approved_for_fysen":True,"published":False})
    record.write_text(json.dumps(candidate,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    audit.update({"reviewed_variant":choice,"reviewed_preview_sha256":inspected_sha,
                  "original_processed_sha256":original_sha,
                  "master_avif_sha256":master_sha,
                  "visual_review_completed":True,"approved_for_fysen":True,
                  "published":False})
    audit_file.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("TACOS DRAFT: 7008x4672 authentic full-size AVIF, 512 mini, 21/44 in draft, 0 published")

if __name__=="__main__":
    main()
