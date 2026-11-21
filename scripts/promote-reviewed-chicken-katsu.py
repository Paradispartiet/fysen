#!/usr/bin/env python3
"""Prepare exact native chicken katsu photo from visually inspected, locked source.

Run ONLY after successful source and black-preview review. Commits draft assets
through a separate GitHub workflow; never publishes to production.
"""
from __future__ import annotations
from hashlib import sha256
from pathlib import Path
import json,runpy
import cv2,numpy as np
from PIL import Image,ImageOps
import pillow_avif  # noqa: F401
ROOT=Path(__file__).resolve().parents[1]
WEB=ROOT/"apps/web"
PUBLIC=WEB/"public/dish-images"
C=ROOT/"assets/fysen-image-candidates/chicken-katsu/cohesion-singapore-katsu-rice"
SHA="21ec19e88be0f70f9981dd7deda9cde59714b9d313d16c682c6a4c5fb1fd2269"
AUTHOR="Cohesion Singapore / Pexels"
PHOTO="https://www.pexels.com/photo/slices-of-katsu-teriyaki-and-white-rice-in-a-bowl-15985538/"
LICENSE="https://www.pexels.com/license/"

def digest(p):return sha256(Path(p).read_bytes()).hexdigest()
def replace_once(path,old,new):
    p=Path(path)
    s=p.read_text(encoding="utf8")
    assert s.count(old)==1,f"Missing one unambiguous anchor in {p}: {old[:75]}"
    p.write_text(s.replace(old,new,1),encoding="utf8")

def main():
    meta_file=C/"review.json"
    audit_file=C/"black-review.json"
    meta=json.loads(meta_file.read_text(encoding="utf8"))
    audit=json.loads(audit_file.read_text(encoding="utf8"))
    assert meta["source_verified"] and meta["no_upscale"] and meta["original_sha256"]==SHA
    assert meta["source_photo_author"]==AUTHOR and meta["photo_page"]==PHOTO
    assert (meta["native_width"],meta["native_height"])==(5472,3648)
    assert meta["catalog_id"]==meta["dish_id"]=="katsu"
    assert not meta["approved_for_fysen"] and not meta["published"]
    assert audit["source_original_sha256"]==SHA and audit["source_native_dimensions"]==[5472,3648]
    assert audit["no_upscale"] and not audit["generated_food_pixels"]
    assert not audit["approved_for_fysen"] and not audit["published"]
    variant="black-clean-grabcut"
    preview=C/(variant+"-preview.jpg")
    detail=C/(variant+"-native-detail-1400.jpg")
    assert preview.is_file() and detail.is_file()
    inspected_sha=digest(preview)
    # Re-download the authentic original and deterministically regenerate masks.
    state=runpy.run_path(str(ROOT/"scripts/preview-chicken-katsu-black.py"),run_name="__main__")
    assert digest(preview)==inspected_sha,"Visually inspected preview has changed"
    photo=state["photo"]
    W,H=photo.size
    assert (W,H)==(5472,3648)
    mask=state["clean"]
    assert mask.shape==(720,1080)
    alpha=cv2.resize(mask,(W,H),interpolation=cv2.INTER_LINEAR)
    alpha=cv2.GaussianBlur(alpha,(0,0),1)
    source=np.asarray(photo)
    assert source.shape==(H,W,3)
    composite=((source.astype(np.uint16)*alpha[:,:,None].astype(np.uint16)+127)//255).astype(np.uint8)
    picture=Image.fromarray(composite,"RGB")
    for xy in [(0,0),(W-1,0),(0,H-1),(W-1,H-1)]:
        assert picture.getpixel(xy)==(0,0,0)
    original=ROOT/"assets/fysen-dish-originals/katsu.png"
    large=PUBLIC/"chicken-katsu-master-5472.avif"
    small=PUBLIC/"chicken-katsu-thumb-512.avif"
    notice=PUBLIC/"chicken-katsu-LICENSE.txt"
    review=ROOT/"docs/fysen-image-reviews/katsu.md"
    for file in (original,large,small,notice,review):
        assert not file.exists(),f"Refusing to overwrite existing asset {file}"
    picture.save(original,format="PNG",compress_level=5)
    picture.save(large,format="AVIF",quality=89,speed=6)
    ImageOps.pad(picture,(512,512),method=Image.Resampling.LANCZOS,
                 color=(0,0,0)).save(small,format="AVIF",quality=86,speed=5)
    png_sha=digest(original)
    avif_sha=digest(large)
    with Image.open(large) as im:assert im.size==(5472,3648)
    with Image.open(small) as im:assert im.size==(512,512)
    manifest=PUBLIC/"manifest.json"
    doc=json.loads(manifest.read_text(encoding="utf8"))
    assert len(doc["images"])==44
    assert sum(p.get("largeViewEnabled") is True for p in doc["images"])==23
    item=doc["images"][24]
    assert item["id"]==item["catalogId"]=="katsu" and item["index"]==24
    assert item["kind"]=="AI-illustrasjon" and item["atlas"]=="chicken-katsu-768.avif"
    assert not item.get("largeViewEnabled") and not item.get("largeSource")
    item.update({
      "atlas":small.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":("Lisensiert redaksjonelt foto av japansk chicken katsu med "
        "panko-panert kylling i skiver, ris, strimlet nori og vårløk i "
        "hel keramikkskål mot svart bakgrunn. Ikke svin eller vegetar. "
        "Strimlet kål er ikke synlig i denne serveringen; tilbehør og "
        "allergener kan variere. Ikke restaurantfoto."),
      "largeSourceOriginalPath":"assets/fysen-dish-originals/katsu.png",
      "largeSource":large.name,
      "largeSourceNativeWidth":5472,
      "largeSourceNativeHeight":3648,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":avif_sha,
      "largeSourceOriginalSha256":png_sha,
      "largeSourceReview":"docs/fysen-image-reviews/katsu.md",
      "largeViewEnabled":True,
      "photoCredit":AUTHOR,
      "photoSource":PHOTO,
      "photoLicense":LICENSE,
      "photoLicenseNotice":"/dish-images/chicken-katsu-LICENSE.txt"
    })
    manifest.write_text(json.dumps(doc,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    notice.write_text(
       "Chicken katsu – behandlet autentisk redaksjonelt fotografi\n"
       "Fotograf: "+AUTHOR+"\n"
       "Original: "+PHOTO+"\n"
       "Lisens: Pexels License, "+LICENSE+"\n"
       "Bearbeidelse: Virkelig 5472 × 3648 px original av panko-panert "
       "kyllingkatsu over ris med nori og vårløk i komplett skål. "
       "Hvit fotobakgrunn er fjernet mot svart; ingen matpiksler er generert "
       "og ingen oppskalering. Selvstendig originaloppløst AVIF og "
       "egen 512 × 512 AVIF-miniatyr. Ikke en bestemt Fysen-restaurant.\n"
       "Original JPEG SHA-256: "+SHA+"\n"
       "Frilagt PNG SHA-256: "+png_sha+"\n",encoding="utf8")
    review.write_text(
       "# Chicken katsu – autentisk foto kontrollert for upublisert utkast\n\n"
       "Panko-panert kylling i skiver med ris, nori og vårløk i en "
       "komplett skål mot svart bakgrunn. Ikke svin eller vegetar; "
       "kål er ikke synlig på kildefotoet. Ingen konkrete restaurantmenyer "
       "eller ingrediensopplysninger bekreftes av bildet.\n\n"
       "- Fotograf: "+AUTHOR+", "+PHOTO+"\n"
       "- Lisens: Pexels License, "+LICENSE+"\n"
       "- Verifisert ekte original: 5472 × 3648 JPEG, SHA-256 "+SHA+"\n"
       "- To ekte originale fotokandidater bestod kildekontroll. "
       "Cohesion Singapore er valgt fremfor Jahra Tasfia Reza fordi "
       "hele den autentiske skålen er lettere å frilegge.\n"
       "- Clean GrabCut-masken er gjennomgått visuelt på liten visning og "
       "på et virkelig originalt 1400 × 1400 detaljutsnitt.\n"
       "- Ingen syntetiske matpiksler, ingen collage eller oppskalering.\n"
       "- Selvstendig master: chicken-katsu-master-5472.avif (5472 × 3648); "
       "egen liten fil: chicken-katsu-thumb-512.avif (512 × 512).\n"
       "- PR fortsatt utkast: ingen merge eller deploy og ingen "
       "restaurantmeny-, søk-, pris- eller databaseendringer.\n\n"
       "Reviewed for full-size display: yes\n"
       "No collage crop or upscale: yes\n"
       "Correct dish and black background: yes\n\n"
       "Frilagt PNG SHA-256: "+png_sha+"\n"
       "Visuelt inspisert preview SHA-256: "+inspected_sha+"\n",encoding="utf8")
    replace_once(WEB/"styles/dish-photos.css",
       'background: #000 url("/dish-images/chicken-katsu-768.avif") center / cover no-repeat;',
       'background: #000 url("/dish-images/chicken-katsu-thumb-512.avif") center / contain no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    replace_once(gallery,
       '          <small>Masala dosa-foto: Jack Baghel / Pexels, <a href="/dish-images/masala-dosa-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>',
       '          <small>Masala dosa-foto: Jack Baghel / Pexels, <a href="/dish-images/masala-dosa-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>\n'
       '          <a href="/dish-images/chicken-katsu-master-5472.avif" target="_blank" rel="noopener noreferrer">\n'
       '            Chicken katsu <span aria-hidden="true">↗</span>\n'
       '          </a>\n'
       '          <small>Chicken katsu-foto: Cohesion Singapore / Pexels, <a href="/dish-images/chicken-katsu-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>')
    testpath=WEB/"tests/dish-photo-gallery.test.mjs"
    ts=testpath.read_text(encoding="utf8")
    def edit(old,new,count=1):
        nonlocal ts
        assert ts.count(old)==count,f"Unsafe test replacement in {testpath} {old[:72]}: {ts.count(old)}"
        ts=ts.replace(old,new)
    edit('approved.length, 23','approved.length, 24')
    edit('chana masala and masala dosa need approved full-size masters',
         'chana masala, masala dosa and chicken katsu need approved full-size masters')
    edit('index === 24 ? "chicken-katsu-768.avif"',
         'index === 24 ? "chicken-katsu-thumb-512.avif"')
    edit('[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23].includes(index)',
         '[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].includes(index)')
    edit('public/dish-images/chicken-katsu-768.avif',
         'public/dish-images/chicken-katsu-thumb-512.avif')
    edit('file: "chicken-katsu-768.avif"',
         'file: "chicken-katsu-thumb-512.avif"')
    start='test("Chicken katsu, yakitori and shrimp tempura udon each use their own 768px AVIF", () => {'
    end='test("Remaining six Asian dishes use their own AVIF images and matching catalog IDs"'
    assert ts.count(start)==1 and ts.count(end)==1
    a=ts.index(start);b=ts.index(end,a)
    section=ts[a:b]
    section=section.replace(
       "Chicken katsu, yakitori and shrimp tempura udon each use their own 768px AVIF",
       "Chicken katsu has native photo thumb, yakitori and shrimp tempura udon keep distinct AVIF")
    section=section.replace('assert.equal(entry.bytes.readUInt32BE(marker + 8), 768);',
                            'assert.equal(entry.bytes.readUInt32BE(marker + 8), entry.index === 24 ? 512 : 768);')
    section=section.replace('assert.equal(entry.bytes.readUInt32BE(marker + 12), 768);',
                            'assert.equal(entry.bytes.readUInt32BE(marker + 12), entry.index === 24 ? 512 : 768);')
    section=section.replace('    assert.ok(css.includes(entry.file));',
      '''    assert.ok(css.includes(entry.file));
    if (entry.index === 24) {
      assert.equal(image.kind, "Redaksjonelt rettfoto");
      assert.equal(image.largeViewEnabled, true);
      assert.equal(image.largeSource, "chicken-katsu-master-5472.avif");
      assert.equal(image.largeSourceNativeWidth, 5472);
      assert.equal(image.largeSourceNativeHeight, 3648);
      assert.match(image.photoCredit, /Cohesion Singapore.*Pexels/u);
      assert.match(gallery, /href="\\/dish-images\\/chicken-katsu-master-5472\\.avif"/u);
    }''')
    ts=ts[:a]+section+ts[b:]
    testpath.write_text(ts,encoding="utf8")
    quality=WEB/"tests/dish-image-large-view-quality.test.mjs"
    replace_once(quality,'    } else if (photo.id === "dosa") {',
      '''    } else if (photo.id === "katsu") {
      assert.equal(photo.catalogId,"katsu");
      assert.equal(photo.photoLicense,"https://www.pexels.com/license/");
      assert.equal(photo.photoLicenseNotice,"/dish-images/chicken-katsu-LICENSE.txt");
      assert.match(photo.photoCredit,/Cohesion Singapore.*Pexels/u);
      const notice=readFileSync(path.join(imageRoot,"chicken-katsu-LICENSE.txt"),"utf8");
      assert.match(notice,/Fotograf: Cohesion Singapore/u);
      assert.match(notice,/Pexels License/u);
    } else if (photo.id === "dosa") {''')
    meta.update({"visual_review_completed":True,"approved_for_fysen":True,"published":False})
    meta_file.write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    audit.update({"reviewed_variant":variant,"reviewed_preview_sha256":inspected_sha,
                  "original_processed_sha256":png_sha,"master_avif_sha256":avif_sha,
                  "visual_review_completed":True,"approved_for_fysen":True,
                  "published":False})
    audit_file.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("CHICKEN KATSU DRAFT: 5472x3648 full-size native AVIF + 512 mini; 24/44 unpublished")

if __name__=="__main__":main()
