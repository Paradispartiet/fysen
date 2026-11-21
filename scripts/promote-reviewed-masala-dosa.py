#!/usr/bin/env python3
"""Integrate reviewed authentic dosa platter on UNPUBLISHED Fysen draft only.

The photographed potato masala is in a separate bowl; filling inside the rolled
dosa is not visible and must never be claimed. Native source pixels are never
upscaled or synthesized.
"""
from __future__ import annotations
from pathlib import Path
from hashlib import sha256
import json,runpy
import cv2,numpy as np
from PIL import Image,ImageOps
import pillow_avif  # noqa:F401

ROOT=Path(__file__).resolve().parents[1]
WEB=ROOT/"apps/web"
PUBLIC=WEB/"public/dish-images"
C=ROOT/"assets/fysen-image-candidates/masala-dosa/jack-baghel-dosa-dark"
SOURCE_SHA="f21b2b545b16554ef593474aadeb9f761d3731b3470e26ad4b6c11e1b0f8d20c"
CREDIT="Jack Baghel / Pexels"
SOURCE_PAGE="https://www.pexels.com/photo/food-on-plate-with-bowls-of-sauces-20422129/"
LICENSE="https://www.pexels.com/license/"

def digest(path:Path):return sha256(path.read_bytes()).hexdigest()
def replace_once(path:Path,old:str,new:str):
    s=path.read_text(encoding="utf8")
    assert s.count(old)==1,f"Unique anchor missing in {path}: {old[:80]}"
    path.write_text(s.replace(old,new,1),encoding="utf8")

def main():
    record_file=C/"review.json"
    audit_file=C/"black-review.json"
    record=json.loads(record_file.read_text(encoding="utf8"))
    audit=json.loads(audit_file.read_text(encoding="utf8"))
    assert record["source_verified"] and record["no_upscale"] and record["original_sha256"]==SOURCE_SHA
    assert record["source_photo_author"]==CREDIT and record["photo_page"]==SOURCE_PAGE
    assert record["catalog_id"]==record["gallery_id"]==record["dish_id"]=="dosa"
    assert (record["native_width"],record["native_height"])==(9504,6336)
    assert not record["approved_for_fysen"] and not record["published"]
    assert audit["photo_source_sha256"]==SOURCE_SHA
    assert audit["source_native_dimensions"]==[9504,6336]
    assert audit["no_upscale"] and not audit["generated_food_pixels"]
    assert not audit["approved_for_fysen"] and not audit["published"]
    variant="black-food-isolate"
    preview=C/(variant+"-preview.jpg")
    native_detail=C/(variant+"-native-detail-1400.jpg")
    assert preview.is_file() and native_detail.is_file()
    reviewed_sha=digest(preview)
    state=runpy.run_path(str(ROOT/"scripts/preview-masala-dosa-black.py"),run_name="__main__")
    assert digest(preview)==reviewed_sha,"Reviewed native-source photo mask changed"
    photo=state["photo"]
    W,H=photo.size
    assert (W,H)==(9504,6336)
    mask=state["isolate"]
    assert mask.shape==(900,1350)
    alpha=cv2.resize(mask,(W,H),interpolation=cv2.INTER_LINEAR)
    alpha=cv2.GaussianBlur(alpha,(0,0),1)
    src=np.asarray(photo)
    assert src.shape==(H,W,3)
    composite=((src.astype(np.uint16)*alpha[:,:,None].astype(np.uint16)+127)//255).astype(np.uint8)
    pic=Image.fromarray(composite,"RGB")
    assert pic.size==(W,H)
    for point in [(0,0),(W-1,0),(0,H-1),(W-1,H-1)]:
        assert pic.getpixel(point)==(0,0,0)
    original=ROOT/"assets/fysen-dish-originals/dosa.png"
    large=PUBLIC/"masala-dosa-master-9504.avif"
    mini=PUBLIC/"masala-dosa-thumb-512.avif"
    notice=PUBLIC/"masala-dosa-LICENSE.txt"
    report=ROOT/"docs/fysen-image-reviews/dosa.md"
    for path in (original,large,mini,notice,report):
        assert not path.exists(),f"Existing image cannot be overwritten: {path}"
    pic.save(original,format="PNG",compress_level=5)
    pic.save(large,format="AVIF",quality=86,speed=7)
    ImageOps.pad(pic,(512,512),method=Image.Resampling.LANCZOS,
                 color=(0,0,0)).save(mini,format="AVIF",quality=84,speed=5)
    original_sha=digest(original)
    large_sha=digest(large)
    with Image.open(large) as im:assert im.size==(9504,6336)
    with Image.open(mini) as im:assert im.size==(512,512)
    manifest=PUBLIC/"manifest.json"
    doc=json.loads(manifest.read_text(encoding="utf8"))
    assert len(doc["images"])==44
    assert sum(p.get("largeViewEnabled") is True for p in doc["images"])==22
    t=doc["images"][23]
    assert t["id"]==t["catalogId"]=="dosa" and t["index"]==23
    assert t["atlas"]=="masala-dosa-768.avif" and t["kind"]=="AI-illustrasjon"
    assert not t.get("largeViewEnabled") and not t.get("largeSource")
    t.update({
      "atlas":mini.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":("Lisensiert redaksjonelt foto av sprø dosa på hel hvit tallerken "
        "med potetmasala i egen skål, kokoschutney, sambar og ekstra chutney mot "
        "helsvart bakgrunn. Potetfyll inne i selve dosaen er ikke dokumentert "
        "på fotoet. Ikke restaurantfoto, og ingredienser varierer mellom serveringer."),
      "largeSourceOriginalPath":"assets/fysen-dish-originals/dosa.png",
      "largeSource":large.name,
      "largeSourceNativeWidth":9504,
      "largeSourceNativeHeight":6336,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":large_sha,
      "largeSourceOriginalSha256":original_sha,
      "largeSourceReview":"docs/fysen-image-reviews/dosa.md",
      "largeViewEnabled":True,
      "photoCredit":CREDIT,
      "photoSource":SOURCE_PAGE,
      "photoLicense":LICENSE,
      "photoLicenseNotice":"/dish-images/masala-dosa-LICENSE.txt"
    })
    manifest.write_text(json.dumps(doc,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    notice.write_text(
      "Masala dosa – bearbeidet redaksjonelt foto av dosa med potetmasala\n"
      "Fotograf: "+CREDIT+"\n"
      "Original: "+SOURCE_PAGE+"\n"
      "Lisens: Pexels License, "+LICENSE+"\n"
      "Bearbeidelse: Kildeverifisert 9504 × 6336 JPEG med hel sprø dosa, "
      "potetmasala i separat skål, kokoschutney, sambar og annen chutney; "
      "grå duk og bestikk fjernet med fargemaskering mot svart bakgrunn. "
      "Potetfyll i selve dosaen kan ikke bekreftes. Ingen KI-genererte matpiksler "
      "eller oppskalering. Ekte 9504 × 6336 AVIF og egen 512 × 512 AVIF-mini.\n"
      "Ikke foto fra en bestemt Fysen-restaurant.\n"
      "Original JPEG SHA-256: "+SOURCE_SHA+"\n"
      "Frilagt PNG SHA-256: "+original_sha+"\n",encoding="utf8")
    report.write_text(
      "# Dosa med potetmasala – autentisk original godkjent i utkastkjeden\n\n"
      "Sprø hel dosa på tallerken, potetmasala i separat skål, kokoschutney "
      "og sambar mot helsvart bakgrunn. Ikke hevdet at det er synlig potetfyll "
      "inne i selve pannekaken. Fotoet er en representativ redaksjonell "
      "servering, ikke et konkret restaurantfoto.\n\n"
      "- Fotograf: "+CREDIT+", "+SOURCE_PAGE+"\n"
      "- Lisens: Pexels License, "+LICENSE+"\n"
      "- Ekte kilde: JPEG 9504 × 6336, SHA-256 "+SOURCE_SHA+"\n"
      "- Fire kildevarianter vurdert, Nikhil Bhatias PNG med synlig potetfyll "
      "og tre av Jack Baghels originaler. Valgt servering har komplett dosa, "
      "potetmasala ved siden av og separate sauser.\n"
      "- Frilegging: black-food-isolate, original mat og original tallerken. "
      "Grå duk og bestikk fjernet; ingen genererte piksler eller oppskalering.\n"
      "- Faktisk originaldetalj 1400 × 1400 inspisert.\n"
      "- Native storbilde: masala-dosa-master-9504.avif (9504 × 6336); "
      "separat masala-dosa-thumb-512.avif (512 × 512).\n"
      "- Utkast: ingen merge, ingen publisering, ingen meny- eller databaseendringer.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Frilagt PNG SHA-256: "+original_sha+"\n"
      "Visuelt inspisert preview SHA-256: "+reviewed_sha+"\n",encoding="utf8")
    replace_once(WEB/"styles/dish-photos.css",
      'background: #000 url("/dish-images/masala-dosa-768.avif") center / cover no-repeat;',
      'background: #000 url("/dish-images/masala-dosa-thumb-512.avif") center / contain no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    replace_once(gallery,
      '          <small>Chana masala-foto: Muhammad Khawar Nazir / Pexels, <a href="/dish-images/chana-masala-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>',
      '          <small>Chana masala-foto: Muhammad Khawar Nazir / Pexels, <a href="/dish-images/chana-masala-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>\n'
      '          <a href="/dish-images/masala-dosa-master-9504.avif" target="_blank" rel="noopener noreferrer">\n'
      '            Masala dosa <span aria-hidden="true">↗</span>\n'
      '          </a>\n'
      '          <small>Masala dosa-foto: Jack Baghel / Pexels, <a href="/dish-images/masala-dosa-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>')
    tests=WEB/"tests/dish-photo-gallery.test.mjs"
    s=tests.read_text(encoding="utf8")
    def edit(old,new,expected=1):
        nonlocal s
        assert s.count(old)==expected,f"Missing exact test edit anchor {old[:75]} count={s.count(old)}"
        s=s.replace(old,new)
    edit('approved.length, 22','approved.length, 23')
    edit('tacos al pastor and chana masala need approved full-size masters',
         'tacos al pastor, chana masala and masala dosa need approved full-size masters')
    edit('index === 23 ? "masala-dosa-768.avif"',
         'index === 23 ? "masala-dosa-thumb-512.avif"')
    edit('[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22].includes(index)',
         '[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23].includes(index)')
    edit('public/dish-images/masala-dosa-768.avif',
         'public/dish-images/masala-dosa-thumb-512.avif')
    edit('file: "masala-dosa-768.avif"','file: "masala-dosa-thumb-512.avif"')
    begin='test("Chana original-photo thumbnail and separate dosa illustration preserve cuisine identity", () => {'
    finish='test("Bolognese, prosciutto and kebab retain distinct correctly sized gallery AVIF images"'
    assert s.count(begin)==1 and s.count(finish)==1
    a=s.index(begin);b=s.index(finish,a)
    sec=s[a:b]
    sec=sec.replace("Chana original-photo thumbnail and separate dosa illustration preserve cuisine identity",
                    "Chana and masala dosa have dedicated sharp native photo thumbnails")
    sec=sec.replace('index === 22 ? 512 : 768','512')
    sec=sec.replace('    if (index === 22) {','''    if (index === 23) {
      assert.equal(item.kind, "Redaksjonelt rettfoto");
      assert.equal(item.largeViewEnabled, true);
      assert.equal(item.largeSource, "masala-dosa-master-9504.avif");
      assert.equal(item.largeSourceNativeWidth, 9504);
      assert.equal(item.largeSourceNativeHeight, 6336);
      assert.match(item.photoCredit, /Jack Baghel.*Pexels/u);
      assert.match(gallery, /href="\\/dish-images\\/masala-dosa-master-9504\\.avif"/u);
    }
    if (index === 22) {''')
    s=s[:a]+sec+s[b:]
    tests.write_text(s,encoding="utf8")
    q=WEB/"tests/dish-image-large-view-quality.test.mjs"
    replace_once(q,'    } else if (photo.id === "chana-masala") {',
      '''    } else if (photo.id === "dosa") {
      assert.equal(photo.catalogId,"dosa");
      assert.equal(photo.photoLicense,"https://www.pexels.com/license/");
      assert.equal(photo.photoLicenseNotice,"/dish-images/masala-dosa-LICENSE.txt");
      assert.match(photo.photoCredit,/Jack Baghel.*Pexels/u);
      const notice=readFileSync(path.join(imageRoot,"masala-dosa-LICENSE.txt"),"utf8");
      assert.match(notice,/Fotograf: Jack Baghel/u);
      assert.match(notice,/Pexels License/u);
    } else if (photo.id === "chana-masala") {''')
    record.update({"visual_review_completed":True,"approved_for_fysen":True,"published":False})
    record_file.write_text(json.dumps(record,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    audit.update({"reviewed_variant":variant,"reviewed_preview_sha256":reviewed_sha,
         "original_processed_sha256":original_sha,"master_avif_sha256":large_sha,
         "visual_review_completed":True,"approved_for_fysen":True,"published":False})
    audit_file.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("DOSA DRAFT: 9504x6336 native AVIF + 512 mini; 23/44 unpublished")

if __name__=="__main__":main()
