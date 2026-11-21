#!/usr/bin/env python3
"""Promote reviewed CC0 steamed dumplings to an UNPUBLISHED Fysen PR only.

All food RGB pixels come from the SHA-verified original JPEG; only the mask and
a smaller native crop change the composition. No synthetic food or upscaling.
"""
from __future__ import annotations
from pathlib import Path
from hashlib import sha256
import json,runpy
import numpy as np
import cv2
from PIL import Image,ImageOps
import pillow_avif  # noqa:F401

ROOT=Path(__file__).resolve().parents[1]
WEB=ROOT/"apps/web"
PUBLIC=WEB/"public/dish-images"
C=ROOT/"assets/fysen-image-candidates/dumplings/charles-deluvio-cc0"
SOURCE_SHA="9079ae416770e5654b66b0238998ab4f59394b16026530ea428d5ac9b92af994"
PHOTO_PAGE="https://commons.wikimedia.org/wiki/File:Dumplings_(Unsplash).jpg"
LICENSE="https://creativecommons.org/publicdomain/zero/1.0/"
CREDIT="Charles Deluvio / Wikimedia Commons · CC0 1.0"

def digest(path:Path):return sha256(path.read_bytes()).hexdigest()
def replace_once(path:Path,old:str,new:str):
    text=path.read_text(encoding="utf8")
    assert text.count(old)==1,f"Unique anchor not found in {path}: {old[:90]}; matches={text.count(old)}"
    path.write_text(text.replace(old,new,1),encoding="utf8")

def main():
    meta_path=C/"review.json"
    audit_path=C/"black-review.json"
    meta=json.loads(meta_path.read_text(encoding="utf8"))
    audit=json.loads(audit_path.read_text(encoding="utf8"))
    assert meta["source_verified"] and meta["no_upscale"]
    assert meta["source_sha256"]==SOURCE_SHA and meta["source_page"]==PHOTO_PAGE
    assert meta["license"]=="CC0 1.0" and meta["catalog_id"]==meta["dish_id"]=="dumplings"
    assert (meta["source_native_width"],meta["source_native_height"])==(5472,3648)
    assert not meta["approved_for_fysen"] and not meta["published"]
    assert audit["source_sha256"]==SOURCE_SHA and audit["license"]=="CC0 1.0"
    assert audit["no_upscale"] and not audit["generated_food_pixels"]
    assert not audit["approved_for_fysen"] and not audit["published"]
    # Final original-photo variant: verified full wooden bowl and both chopsticks.
    selected="black-clean-grabcut"
    preview=C/f"{selected}-preview.jpg"
    detail=C/f"{selected}-detail-1400.jpg"
    assert preview.is_file() and detail.is_file(),"Unreviewed mask cannot be approved"
    reviewed_preview_sha=digest(preview)

    state=runpy.run_path(str(ROOT/"scripts/preview-dumplings-black.py"),run_name="__main__")
    assert digest(preview)==reviewed_preview_sha,"Mask differs from visually inspected and committed preview"
    original=state["photo"]
    W,H=original.size
    assert (W,H)==(5472,3648)
    mask=cv2.resize(state["clean"],(W,H),interpolation=cv2.INTER_LINEAR)
    mask=cv2.GaussianBlur(mask,(0,0),.7)
    # Source-native crop leaves room for the whole round bowl and BOTH sticks.
    crop=(800,200,4900,3400)
    left,top,right,bottom=crop
    assert (right-left,bottom-top)==(4100,3200)
    source=np.asarray(original.crop(crop))
    al=mask[top:bottom,left:right]
    composed=((source.astype(np.uint16)*al[:,:,None].astype(np.uint16)+127)//255).astype(np.uint8)
    photo=Image.fromarray(composed,"RGB")
    assert photo.size==(4100,3200)
    for point in [(0,0),(4099,0),(0,3199),(4099,3199)]:
        assert photo.getpixel(point)==(0,0,0),"Backdrop leaks into black crop edge"

    processed=ROOT/"assets/fysen-dish-originals/dumplings.png"
    large=PUBLIC/"dumplings-master-4100.avif"
    mini=PUBLIC/"dumplings-thumb-512.avif"
    license_notice=PUBLIC/"dumplings-LICENSE.txt"
    report=ROOT/"docs/fysen-image-reviews/dumplings.md"
    for p in (processed,large,mini,license_notice,report):
        assert not p.exists(),f"Never overwrite an existing approved image {p}"

    photo.save(processed,format="PNG",compress_level=5)
    photo.save(large,format="AVIF",quality=89,speed=6)
    ImageOps.pad(photo,(512,512),method=Image.Resampling.LANCZOS,
                 color=(0,0,0)).save(mini,format="AVIF",quality=86,speed=5)
    png_sha=digest(processed);avif_sha=digest(large)
    with Image.open(large) as image: assert image.size==(4100,3200)
    with Image.open(mini) as image: assert image.size==(512,512)

    manifest=PUBLIC/"manifest.json"
    data=json.loads(manifest.read_text(encoding="utf8"))
    assert len(data["images"])==44
    assert sum(x.get("largeViewEnabled") is True for x in data["images"])==27
    dish=data["images"][28]
    assert dish["id"]==dish["catalogId"]=="dumplings" and dish["index"]==28
    assert dish["atlas"]=="dumplings-768.avif" and dish["kind"]=="AI-illustrasjon"
    assert not dish.get("largeViewEnabled") and not dish.get("largeSource")
    dish.update({
        "atlas":mini.name,
        "kind":"Redaksjonelt rettfoto",
        "variantCaution":("Lisensiert, autentisk redaksjonelt foto av tre dampede dumplings "
            "med svarte sesamfrø i hel treskål med spisepinner, mot svart bakgrunn. "
            "Fyllet er ikke dokumentert: kjøtt, vegetarstatus og allergener må sjekkes "
            "hos restauranten. Kildebildet viser ikke chili- eller soyadipp. "
            "Dette er ikke restaurantfoto fra en bestemt Fysen-restaurant."),
        "largeSourceOriginalPath":"assets/fysen-dish-originals/dumplings.png",
        "largeSource":large.name,
        "largeSourceNativeWidth":4100,
        "largeSourceNativeHeight":3200,
        "largeSourceMethod":"independent-original",
        "largeSourceSha256":avif_sha,
        "largeSourceOriginalSha256":png_sha,
        "largeSourceReview":"docs/fysen-image-reviews/dumplings.md",
        "largeViewEnabled":True,
        "photoCredit":CREDIT,
        "photoSource":PHOTO_PAGE,
        "photoLicense":LICENSE,
        "photoLicenseNotice":"/dish-images/dumplings-LICENSE.txt"
    })
    manifest.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")

    license_notice.write_text(
        "Dumplings – originalfoto, redaksjonelt frilagt mot svart\n"
        "Fotograf: Charles Deluvio / Wikimedia Commons (opprinnelig Unsplash 2017)\n"
        "Original: "+PHOTO_PAGE+"\n"
        "Lisens: Creative Commons CC0 1.0 Universal\n"
        "Lisenslenke: "+LICENSE+"\n"
        "Bearbeidelse: Autentiske tre dampede dumplings i hel treskål, med "
        "svart sesam og begge spisepinner bevart; lys fotobakgrunn fjernet "
        "uten oppskalering eller KI-genererte matpiksler. Originalen på "
        "5472 x 3648 piksler er beskåret til native 4100 x 3200 piksler; "
        "en separat 512 x 512 AVIF-miniatyr er laget. Kilden viser ikke "
        "soyadipp og dokumenterer ikke fyllet.\n"
        "Dette er ikke foto fra en bestemt Fysen-restaurant.\n"
        "Original JPEG SHA-256: "+SOURCE_SHA+"\n"
        "Frilagt PNG SHA-256: "+png_sha+"\n",encoding="utf8")
    report.write_text(
        "# Dumplings – ekte CC0-foto i upublisert bildeutkast\n\n"
        "Tre hele dampede dumplings med svarte sesamfrø i én hel treskål og "
        "to hele spisepinner. Ulikt tidligere pan-fried gyoza-foto. Ingen "
        "synlig dip eller dokumenterte ingredienser i fyllet. "
        "Ikke foto av en bestemt Fysen-restaurant.\n\n"
        "- Fotograf: Charles Deluvio; kilde: "+PHOTO_PAGE+"\n"
        "- CC0 1.0: "+LICENSE+"\n"
        "- Ekte original-JPEG: 5472 x 3648, SHA-256 "+SOURCE_SHA+"\n"
        "- Opprinnelig CC0-publisert på Unsplash før juni 2017.\n"
        "- 3 svartbakgrunnsmasker visuelt kontrollert, valgte "+selected+".\n"
        "- Ekte 1400 x 1400 detaljutsnitt inspisert, ingen oppskalering.\n"
        "- Native crop 4100 x 3200 stor AVIF, separat 512 x 512 AVIF-mini.\n"
        "- Ingen meny-, pris- eller databaseendringer, ingen merge/deploy.\n\n"
        "Reviewed for full-size display: yes\n"
        "No collage crop or upscale: yes\n"
        "Correct dish and black background: yes\n\n"
        "Behandlet PNG SHA-256: "+png_sha+"\n"
        "Godkjent maskepreview SHA-256: "+reviewed_preview_sha+"\n",
        encoding="utf8")

    css=WEB/"styles/dish-photos.css"
    replace_once(css,
       '.dishPhotoSmall.dishPhotoDumplings { background: #000 url("/dish-images/dumplings-768.avif") center / cover no-repeat; }',
       '.dishPhotoSmall.dishPhotoDumplings { background: #000 url("/dish-images/dumplings-thumb-512.avif") center / contain no-repeat; }')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    replace_once(gallery,
       '          <small>Bao-foto: Andy Li / Wikimedia Commons, CC0 1.0, <a href="/dish-images/bao-braised-pork-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og bearbeiding</a>.</small>',
       '          <small>Bao-foto: Andy Li / Wikimedia Commons, CC0 1.0, <a href="/dish-images/bao-braised-pork-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og bearbeiding</a>.</small>\n'
       '          <a href="/dish-images/dumplings-master-4100.avif" target="_blank" rel="noopener noreferrer">\n'
       '            Dumplings <span aria-hidden="true">↗</span>\n'
       '          </a>\n'
       '          <small>Dumplings-foto: Charles Deluvio / Wikimedia Commons, CC0 1.0, <a href="/dish-images/dumplings-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>')
    replace_once(gallery,
      'isBao ? "Redaksjonelt foto av bao med rødbraisert svinekjøtt og grønt på hel tallerken, ikke restaurantfoto fra Fysen" : isPho ?',
      'isBao ? "Redaksjonelt foto av bao med rødbraisert svinekjøtt og grønt på hel tallerken, ikke restaurantfoto fra Fysen" : isDumplings ? "Redaksjonelt foto av tre dampede dumplings med sesam i treskål og spisepinner, ikke restaurantfoto" : isPho ?')

    testfile=WEB/"tests/dish-photo-gallery.test.mjs"
    tests=testfile.read_text(encoding="utf8")
    def edit(old:str,new:str):
        nonlocal tests
        assert tests.count(old)==1,f"Test anchor missing/non-unique: {old[:80]}, matches={tests.count(old)}"
        tests=tests.replace(old,new,1)
    edit('public/dish-images/dumplings-768.avif','public/dish-images/dumplings-thumb-512.avif')
    edit('approved.length, 27','approved.length, 28')
    edit('udon med reketempura and braised pork bao need approved full-size masters',
         'udon med reketempura, braised pork bao and steamed dumplings need approved full-size masters')
    edit('index === 28 ? "dumplings-768.avif"','index === 28 ? "dumplings-thumb-512.avif"')
    edit('[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27].includes(index)',
         '[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].includes(index)')
    edit('test("Remaining five Asian dishes use their own AVIF images and matching catalog IDs"',
         'test("Remaining four Asian dishes use their own AVIF images and matching catalog IDs"')
    edit('    { index: 28, id: "dumplings", file: "dumplings-768.avif", bytes: dumplingsImage, cls: "Dumplings", ingredient: /fyllet/iu },\n','')
    custom=r'''test("Steamed dumplings use verified CC0 full-size photo and distinct 512px mini", () => {
  const item=manifest.images[28];
  assert.equal(item.id, "dumplings");
  assert.equal(item.catalogId, "dumplings");
  assert.equal(item.kind, "Redaksjonelt rettfoto");
  assert.equal(item.largeViewEnabled, true);
  assert.equal(item.atlas, "dumplings-thumb-512.avif");
  assert.equal(item.largeSource, "dumplings-master-4100.avif");
  assert.equal(item.largeSourceNativeWidth, 4100);
  assert.equal(item.largeSourceNativeHeight, 3200);
  assert.match(item.photoCredit,/Charles Deluvio.*CC0 1\.0/u);
  assert.match(item.variantCaution,/Fyllet er ikke dokumentert/u);
  assert.match(item.variantCaution,/ikke restaurantfoto/u);
  assert.match(item.variantCaution,/ikke chili- eller soyadipp/u);
  assert.equal(dumplingsImage.toString("ascii",4,12), "ftypavif");
  assert.ok(dumplingsImage.length>10000, "512px dumplings thumbnail should be sharp, not placeholder");
  const pos=dumplingsImage.indexOf(Buffer.from("ispe"));
  assert.ok(pos>0);
  assert.equal(dumplingsImage.readUInt32BE(pos+8),512);
  assert.equal(dumplingsImage.readUInt32BE(pos+12),512);
  assert.match(gallery,/href="\/dish-images\/dumplings-master-4100\.avif"/u);
  assert.match(gallery,/isDumplings = index === 28/u);
  assert.ok(css.includes("dumplings-thumb-512.avif"));
  assert.ok(css.includes("center / contain no-repeat"));
});

'''
    marker='test("Remaining four Asian dishes use their own AVIF images and matching catalog IDs"'
    assert tests.count(marker)==1
    tests=tests.replace(marker,custom+marker,1)
    testfile.write_text(tests,encoding="utf8")
    quality=WEB/"tests/dish-image-large-view-quality.test.mjs"
    replace_once(quality,'    } else if (photo.id === "bao") {',
      r'''    } else if (photo.id === "dumplings") {
      assert.equal(photo.catalogId, "dumplings");
      assert.match(photo.photoSource, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/u);
      assert.match(photo.photoCredit, /Charles Deluvio.*CC0 1\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/publicdomain/zero/1.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/dumplings-LICENSE.txt");
      const notice=readFileSync(path.join(imageRoot,"dumplings-LICENSE.txt"),"utf8");
      assert.match(notice,/Fotograf: Charles Deluvio/u);
      assert.match(notice,/CC0 1\.0/u);
      assert.match(notice,/Bearbeidelse:/u);
    } else if (photo.id === "bao") {''')
    meta.update({"visual_review_completed":True,"approved_for_fysen":True,"published":False})
    meta_path.write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    audit.update({"reviewed_variant":selected,"reviewed_preview_sha256":reviewed_preview_sha,
                  "processed_original_sha256":png_sha,"master_avif_sha256":avif_sha,
                  "visual_review_completed":True,"approved_for_fysen":True,"published":False})
    audit_path.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("DUMPLINGS DRAFT: native 4100x3200 AVIF and 512 mini; 28/44 UNPUBLISHED")

if __name__=="__main__":main()
