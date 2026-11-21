#!/usr/bin/env python3
"""Promote the visually reviewed real ebi tempura udon photo to an unpublished PR.

Exact CC BY 4.0 source JPEG is SHA verified; crop/black mask retain real source
pixels, no interpolation to higher resolution, no generated food or menus.
"""
from pathlib import Path
from hashlib import sha256
import json,runpy
import cv2,numpy as np
from PIL import Image,ImageOps
import pillow_avif  # noqa:F401

BASE=Path(__file__).resolve().parents[1]
WEB=BASE/"apps/web"
PUBLIC=WEB/"public/dish-images"
C=BASE/"assets/fysen-image-candidates/udon-tempura/commons-bukkake-ebi"
SHA="fb863f80379bdaf330b88adbc96193c9d5fa4e19f81988cadc1e56fcf2a05ac3"
PAGE="https://commons.wikimedia.org/wiki/File:Bukkake_Udon_with_%E3%81%88%E3%81%B3%E5%A4%A9.jpg"
LICENSE="https://creativecommons.org/licenses/by/4.0/"
CREDIT="Immanuelle / Wikimedia Commons · CC BY 4.0"

def digest(p):return sha256(Path(p).read_bytes()).hexdigest()
def replace_once(path,old,new):
  path=Path(path);s=path.read_text(encoding="utf8")
  assert s.count(old)==1,f"Missing exact single anchor in {path}: {old[:90]}, matches {s.count(old)}"
  path.write_text(s.replace(old,new,1),encoding="utf8")

def main():
  review_file=C/"review.json";audit_file=C/"black-review.json"
  record=json.loads(review_file.read_text(encoding="utf8"))
  audit=json.loads(audit_file.read_text(encoding="utf8"))
  assert record["source_sha256"]==SHA and record["source_verified"] and record["no_upscale"]
  assert record["license"]=="CC BY 4.0" and record["source_page"]==PAGE
  assert record["catalog_id"]==record["dish_id"]=="udon"
  assert (record["native_width"],record["native_height"])==(3024,4032)
  assert not record["approved_for_fysen"] and not record["published"]
  assert audit["source_original_sha256"]==SHA and audit["license"]=="CC BY 4.0"
  assert audit["no_upscale"] and not audit["generated_food_pixels"]
  assert not audit["approved_for_fysen"] and not audit["published"]
  # Reviewed final full-bowl contour, complete original shrimp and full ceramic rim.
  variant="black-clean-grabcut"
  preview=C/(variant+"-preview.jpg");detail=C/(variant+"-detail-1400.jpg")
  assert preview.is_file() and detail.is_file()
  reviewed_preview_sha=digest(preview)
  state=runpy.run_path(str(BASE/"scripts/preview-udon-tempura-black.py"),run_name="__main__")
  assert digest(preview)==reviewed_preview_sha,"Verified visual mask changed"
  W,H=state["W"],state["H"]
  assert (W,H)==(3024,4032)
  alpha=cv2.resize(state["clean"],(W,H),interpolation=cv2.INTER_LINEAR)
  alpha=cv2.GaussianBlur(alpha,(0,0),1.0)
  source=np.asarray(state["photo"])
  assert source.shape==(H,W,3)
  composite=((source.astype(np.uint16)*alpha[:,:,None].astype(np.uint16)+127)//255).astype(np.uint8)
  output=Image.fromarray(composite,"RGB")
  # Native crop: removes blank margins only; no pixel enlargement or resampling.
  output=output.crop((60,300,2960,3380))
  assert output.size==(2900,3080)
  for point in ((0,0),(2899,0),(0,3079),(2899,3079)):
      assert output.getpixel(point)==(0,0,0)
  processed=BASE/"assets/fysen-dish-originals/udon.png"
  master=PUBLIC/"udon-tempura-master-2900.avif"
  mini=PUBLIC/"udon-tempura-thumb-512.avif"
  license_notice=PUBLIC/"udon-tempura-LICENSE.txt"
  report=BASE/"docs/fysen-image-reviews/udon.md"
  for p in (processed,master,mini,license_notice,report):
      assert not p.exists(),f"Never overwrite existing image {p}"
  output.save(processed,format="PNG",compress_level=5)
  output.save(master,format="AVIF",quality=89,speed=6)
  ImageOps.pad(output,(512,512),method=Image.Resampling.LANCZOS,color=(0,0,0)).save(
      mini,format="AVIF",quality=86,speed=5)
  png_sha=digest(processed);avif_sha=digest(master)
  with Image.open(master) as pic:assert pic.size==(2900,3080)
  with Image.open(mini) as pic:assert pic.size==(512,512)
  manifest=PUBLIC/"manifest.json"
  data=json.loads(manifest.read_text(encoding="utf8"))
  assert len(data["images"])==44
  assert sum(x.get("largeViewEnabled") is True for x in data["images"])==25
  photo=data["images"][26]
  assert photo["id"]==photo["catalogId"]=="udon" and photo["index"]==26
  assert photo["kind"]=="AI-illustrasjon" and photo["atlas"]=="udon-tempura-768.avif"
  assert not photo.get("largeViewEnabled") and not photo.get("largeSource")
  photo.update({
    "atlas":mini.name,
    "kind":"Redaksjonelt rettfoto",
    "variantCaution":("Autentisk redaksjonelt foto av udonnudler i kraft med én tydelig "
        "reketempura og andre toppings i en hel blåhvit keramikkskål. "
        "Reketempuraen inneholder skalldyr; øvrige ingredienser og allergener "
        "kan variere. Frilagt og beskåret fra et foto i Japan, ikke restaurantfoto "
        "fra en bestemt restaurant i Fysen."),
    "largeSourceOriginalPath":"assets/fysen-dish-originals/udon.png",
    "largeSource":master.name,
    "largeSourceNativeWidth":2900,
    "largeSourceNativeHeight":3080,
    "largeSourceMethod":"independent-original",
    "largeSourceSha256":avif_sha,
    "largeSourceOriginalSha256":png_sha,
    "largeSourceReview":"docs/fysen-image-reviews/udon.md",
    "largeViewEnabled":True,
    "photoCredit":CREDIT,
    "photoSource":PAGE,
    "photoLicense":LICENSE,
    "photoLicenseNotice":"/dish-images/udon-tempura-LICENSE.txt"
  })
  manifest.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  license_notice.write_text(
    "Udon med reketempura – bearbeidet originalfoto\n"
    "Fotograf: Immanuelle / Wikimedia Commons\n"
    "Original: "+PAGE+"\n"
    "Lisens: Creative Commons Attribution 4.0 International, CC BY 4.0\n"
    "Lisenslenke: "+LICENSE+"\n"
    "Bearbeidelse: Frilagt en komplett blåhvit skål med udonnudler og én "
    "ekte reketempura mot helsvart bakgrunn, fjernet restaurantdisk og meny, "
    "beskåret originalen fra 3024 × 4032 til 2900 × 3080 kildetro piksler. "
    "Ingen KI-genererte ingredienser og ingen oppskalering. Egen 512 × 512 miniatyr.\n"
    "Ingen tilknytning til en bestemt restaurant i Fysen antydes.\n"
    "Kilde JPEG SHA-256: "+SHA+"\n"
    "Frilagt PNG SHA-256: "+png_sha+"\n",encoding="utf8")
  report.write_text(
    "# Udon med reketempura – kildeverifisert rettfoto på utkastgren\n\n"
    "Ett ekte foto av udon med reketempura. Hele skålen, kraft, "
    "udonnudler, reketempura og garnityr er beholdt, restaurantbakgrunnen "
    "frilagt mot helsvart uten syntetiske matpiksler.\n\n"
    "- Fotograf: Immanuelle, "+PAGE+"\n"
    "- CC BY 4.0: "+LICENSE+"\n"
    "- Original-JPEG: 3024 × 4032, SHA-256 "+SHA+"\n"
    "- Kildetro avgrensning (60,300)–(2960,3380) gir 2900 × 3080 AVIF-master. "
    "Originalfotoet er aldri oppskalert.\n"
    "- Sammenlignet tre Pexels-kandidater; valgt Commons fordi faktisk "
    "reketempura er dokumentert i samme udon-skål, ikke bare på separat fat.\n"
    "- Tre maskeforslag kontrollert og "+variant+" valgt. "
    "1400 × 1400 originaldetalj kontrollert.\n"
    "- Miniatyr: 512 × 512 AVIF.\n"
    "- Kun upublisert utkast, ingen meny-/database-/prisendringer.\n\n"
    "Reviewed for full-size display: yes\nNo collage crop or upscale: yes\n"
    "Correct dish and black background: yes\n\n"
    "Bearbeidet PNG SHA-256: "+png_sha+"\n"
    "Visuelt godkjent maske-preview SHA-256: "+reviewed_preview_sha+"\n",
    encoding="utf8")
  replace_once(WEB/"styles/dish-photos.css",
    'background: #000 url("/dish-images/udon-tempura-768.avif") center / cover no-repeat;',
    'background: #000 url("/dish-images/udon-tempura-thumb-512.avif") center / contain no-repeat;')
  gallery=WEB/"components/dish-photo-gallery.tsx"
  replace_once(gallery,
    '          <small>Yakitori-foto: Airam Dato-on / Pexels, <a href="/dish-images/yakitori-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>',
    '          <small>Yakitori-foto: Airam Dato-on / Pexels, <a href="/dish-images/yakitori-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>\n'
    '          <a href="/dish-images/udon-tempura-master-2900.avif" target="_blank" rel="noopener noreferrer">\n'
    '            Udon med reketempura <span aria-hidden="true">↗</span>\n'
    '          </a>\n'
    '          <small>Udon-foto: Immanuelle / Wikimedia Commons, CC BY 4.0, <a href="/dish-images/udon-tempura-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og endringer</a>.</small>')
  replace_once(gallery,
    'isYakitori ? "Redaksjonelt foto av to grillede yakitori-kyllingspyd med sitron, ikke restaurantfoto" : isPho ?',
    'isYakitori ? "Redaksjonelt foto av to grillede yakitori-kyllingspyd med sitron, ikke restaurantfoto" : isUdonTempura ? "Redaksjonelt foto av udon med reketempura i blåhvit skål, ikke restaurantfoto" : isPho ?')
  tests=WEB/"tests/dish-photo-gallery.test.mjs"
  s=tests.read_text(encoding="utf8")
  def edit(old,new):
    nonlocal s
    assert s.count(old)==1,f"Test anchor not unique: {old[:80]} matched {s.count(old)}"
    s=s.replace(old,new,1)
  edit('approved.length, 25','approved.length, 26')
  edit('chicken katsu and yakitori need approved full-size masters',
       'chicken katsu, yakitori and udon med reketempura need approved full-size masters')
  edit('index === 26 ? "udon-tempura-768.avif"',
       'index === 26 ? "udon-tempura-thumb-512.avif"')
  edit('[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].includes(index)',
       '[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26].includes(index)')
  edit('public/dish-images/udon-tempura-768.avif','public/dish-images/udon-tempura-thumb-512.avif')
  edit('file: "udon-tempura-768.avif"','file: "udon-tempura-thumb-512.avif"')
  start='test("Chicken katsu and yakitori use sharp original-photo thumbs; udon stays distinct", () => {'
  finish='test("Remaining six Asian dishes use their own AVIF images and matching catalog IDs"'
  assert s.count(start)==1 and s.count(finish)==1
  a=s.index(start);b=s.index(finish,a)
  section=s[a:b]
  section=section.replace("Chicken katsu and yakitori use sharp original-photo thumbs; udon stays distinct",
      "Chicken katsu, yakitori and udon have independent original-photo thumbnails")
  section=section.replace('[24,25].includes(entry.index) ? 10000 : 20000','[24,25,26].includes(entry.index) ? 10000 : 20000')
  section=section.replace('[24,25].includes(entry.index) ? 512 : 768','[24,25,26].includes(entry.index) ? 512 : 768')
  section=section.replace('    if (entry.index === 25) {',
    '''    if (entry.index === 26) {
      assert.equal(image.kind, "Redaksjonelt rettfoto");
      assert.equal(image.largeViewEnabled, true);
      assert.equal(image.largeSource, "udon-tempura-master-2900.avif");
      assert.equal(image.largeSourceNativeWidth, 2900);
      assert.equal(image.largeSourceNativeHeight, 3080);
      assert.match(image.photoCredit, /Immanuelle.*CC BY 4\\.0/u);
      assert.match(gallery, /href="\\/dish-images\\/udon-tempura-master-2900\\.avif"/u);
    }
    if (entry.index === 25) {''')
  s=s[:a]+section+s[b:]
  tests.write_text(s,encoding="utf8")
  quality=WEB/"tests/dish-image-large-view-quality.test.mjs"
  replace_once(quality,'    } else if (photo.id === "yakitori") {',
    '''    } else if (photo.id === "udon") {
      assert.equal(photo.catalogId, "udon");
      assert.match(photo.photoSource, /^https:\\/\\/commons\\.wikimedia\\.org\\/wiki\\/File:/u);
      assert.match(photo.photoCredit, /Immanuelle.*CC BY 4\\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/licenses/by/4.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/udon-tempura-LICENSE.txt");
      const notice=readFileSync(path.join(imageRoot,"udon-tempura-LICENSE.txt"),"utf8");
      assert.match(notice,/Fotograf: Immanuelle/u);
      assert.match(notice,/CC BY 4\\.0/u);
      assert.match(notice,/Bearbeidelse:/u);
    } else if (photo.id === "yakitori") {''')
  record.update({"visual_review_completed":True,"approved_for_fysen":True,"published":False})
  review_file.write_text(json.dumps(record,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  audit.update({"reviewed_variant":variant,"reviewed_preview_sha256":reviewed_preview_sha,
    "processed_original_sha256":png_sha,"master_avif_sha256":avif_sha,
    "visual_review_completed":True,"approved_for_fysen":True,"published":False})
  audit_file.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  print("UDON TEMPURA DRAFT: real 2900x3080 CC BY AVIF, 512 mini, 26/44 unmerged")
if __name__=="__main__":main()
