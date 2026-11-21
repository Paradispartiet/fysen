#!/usr/bin/env python3
"""Promote vetted yakitori original photo ONLY to an unpublished draft PR.

The final image is created exclusively from the SHA-locked Pexels photograph.
Only the central plate with two grilled skewers and lemon is retained.
No generated food pixels, upscaling, menu/database edits or deployment.
"""
from __future__ import annotations
from pathlib import Path
from hashlib import sha256
import json,runpy
import cv2,numpy as np
from PIL import Image,ImageOps
import pillow_avif  # noqa
BASE=Path(__file__).resolve().parents[1]
WEB=BASE/"apps/web"
PUBLIC=WEB/"public/dish-images"
C=BASE/"assets/fysen-image-candidates/yakitori/airam-single-black-plate"
SOURCE_SHA="2efaeafc2a0da70b73c3707950d058b2b09126fd2d1f910f29bb55abaee3a401"
CREDIT="Airam Dato-on / Pexels"
PAGE="https://www.pexels.com/photo/authentic-japanese-yakitori-skewers-on-plate-30682903/"
LICENSE="https://www.pexels.com/license/"

def sha(p):return sha256(Path(p).read_bytes()).hexdigest()
def replace_once(path,old,new):
  path=Path(path);body=path.read_text(encoding="utf8")
  assert body.count(old)==1,f"Expected one matching anchor in {path}: {old[:85]} (actual {body.count(old)})"
  path.write_text(body.replace(old,new,1),encoding="utf8")

def main():
  review_file=C/"review.json";audit_file=C/"black-review.json"
  meta=json.loads(review_file.read_text(encoding="utf8"))
  audit=json.loads(audit_file.read_text(encoding="utf8"))
  assert meta["source_verified"] and meta["no_upscale"] and meta["source_sha256"]==SOURCE_SHA
  assert (meta["native_width"],meta["native_height"])==(4000,5000)
  assert meta["source_photo_author"]==CREDIT and meta["catalog_id"]=="yakitori"
  assert not meta["approved_for_fysen"] and not meta["published"]
  assert audit["original_sha256"]==SOURCE_SHA and audit["native_dimensions"]==[4000,5000]
  assert audit["no_upscale"] and not audit["generated_food_pixels"]
  assert not audit["approved_for_fysen"] and not audit["published"]
  selected="black-clean-grabcut"
  preview=C/(selected+"-preview.jpg")
  detail=C/(selected+"-detail-1400.jpg")
  assert preview.exists() and detail.exists(),"Cannot approve a mask without visual review"
  approved_sha=sha(preview)
  state=runpy.run_path(str(BASE/"scripts/preview-yakitori-black.py"),run_name="__main__")
  assert sha(preview)==approved_sha,"Visually inspected source mask changed"
  img=state["photo"];W,H=img.size
  assert (W,H)==(4000,5000)
  alpha=cv2.resize(state["clean"],(W,H),interpolation=cv2.INTER_LINEAR)
  alpha=cv2.GaussianBlur(alpha,(0,0),.9)
  rgb=np.asarray(img)
  photo=((rgb.astype(np.uint16)*alpha[:,:,None].astype(np.uint16)+127)//255).astype(np.uint8)
  output=Image.fromarray(photo,"RGB")
  for point in [(0,0),(W-1,0),(0,H-1),(W-1,H-1)]:
    assert output.getpixel(point)==(0,0,0)
  source=BASE/"assets/fysen-dish-originals/yakitori.png"
  master=PUBLIC/"yakitori-master-4000.avif"
  thumb=PUBLIC/"yakitori-thumb-512.avif"
  license_file=PUBLIC/"yakitori-LICENSE.txt"
  report=BASE/"docs/fysen-image-reviews/yakitori.md"
  for x in (source,master,thumb,license_file,report):
    assert not x.exists(),f"Refuse overwriting existing image: {x}"
  output.save(source,format="PNG",compress_level=5)
  output.save(master,format="AVIF",quality=89,speed=6)
  ImageOps.pad(output,(512,512),method=Image.Resampling.LANCZOS,
               color=(0,0,0)).save(thumb,format="AVIF",quality=87,speed=5)
  raw_sha=sha(source);avif_sha=sha(master)
  with Image.open(master) as image:assert image.size==(4000,5000)
  with Image.open(thumb) as image:assert image.size==(512,512)

  manifest=PUBLIC/"manifest.json"
  m=json.loads(manifest.read_text(encoding="utf8"))
  assert len(m["images"])==44
  assert sum(v.get("largeViewEnabled") is True for v in m["images"])==24
  t=m["images"][25]
  assert t["index"]==25 and t["id"]==t["catalogId"]=="yakitori"
  assert t["atlas"]=="yakitori-768.avif" and t["kind"]=="AI-illustrasjon"
  assert not t.get("largeViewEnabled") and not t.get("largeSource")
  t.update({
    "atlas":thumb.name,"kind":"Redaksjonelt rettfoto",
    "variantCaution":("Lisensiert redaksjonelt foto av to grillede japanske yakitori-kyllingspyd "
      "med sitronbåt på hel svart tallerken mot svart bakgrunn. "
      "Andre skåler og spyd i originalbildet er utelatt. Eksakt stykningsdel, "
      "sausingredienser og allergener kan ikke bekreftes fra fotografiet. "
      "Ikke restaurantfoto, ikke vegetarspyd."),
    "largeSourceOriginalPath":"assets/fysen-dish-originals/yakitori.png",
    "largeSource":master.name,
    "largeSourceNativeWidth":4000,"largeSourceNativeHeight":5000,
    "largeSourceMethod":"independent-original",
    "largeSourceSha256":avif_sha,
    "largeSourceOriginalSha256":raw_sha,
    "largeSourceReview":"docs/fysen-image-reviews/yakitori.md",
    "largeViewEnabled":True,
    "photoCredit":CREDIT,"photoSource":PAGE,"photoLicense":LICENSE,
    "photoLicenseNotice":"/dish-images/yakitori-LICENSE.txt"
  })
  manifest.write_text(json.dumps(m,ensure_ascii=False,indent=2)+"\n",encoding="utf8")

  license_file.write_text(
    "Yakitori – redaksjonelt bearbeidet ekte foto\n"
    "Fotograf: "+CREDIT+"\nOriginal: "+PAGE+"\nLisens: Pexels License, "+LICENSE+"\n"
    "Bildebehandling: Isolert midtservering med to grillede yakitori-spyd "
    "og sitron på hel svart tallerken. Andre serveringer og restaurantbordet "
    "er frilagt bort mot svart. Ingen nye matpiksler og ingen oppskalering. "
    "Egen native 4000 × 5000 AVIF og 512 × 512 AVIF-miniatyr.\n"
    "Ekte redaksjonelt rettfoto, ikke foto fra en bestemt Fysen-restaurant.\n"
    "Native JPEG SHA-256: "+SOURCE_SHA+"\nFrilagt PNG SHA-256: "+raw_sha+"\n",
    encoding="utf8")
  report.write_text(
    "# Yakitori – autentisk, godkjent bilde i upublisert PR\n\n"
    "To grillede japanske yakitori-spyd med sitron på én hel svart tallerken "
    "mot svart bakgrunn. Andre serveringer i kildens bakgrunn er ekskludert. "
    "Ingen dokumentasjon av eksakt kjøttstykke, sausingredienser eller restaurant.\n\n"
    "- Fotograf: "+CREDIT+", "+PAGE+"\n"
    "- Lisens: Pexels License, "+LICENSE+"\n"
    "- Fire ekte Pexels-originaler hentet, originaldimensjoner og SHA-256 verifisert.\n"
    "- Valgt original: 4000 × 5000 px JPEG, SHA-256 "+SOURCE_SHA+"\n"
    "- Tre maskeforslag, visuelt valgt "+selected+"; detaljutsnitt 1400 × 1400 inspisert.\n"
    "- Ekte native 4000 × 5000 AVIF-master, 512 × 512 AVIF-miniatyr; ingen oppskalering.\n"
    "- Ingen restaurant-/meny-/pris-/databaseendringer, ingen offentlig publisering.\n\n"
    "Reviewed for full-size display: yes\nNo collage crop or upscale: yes\n"
    "Correct dish and black background: yes\n\n"
    "Frilagt PNG SHA-256: "+raw_sha+"\n"
    "Visuelt kontrollert maskepreview SHA-256: "+approved_sha+"\n",
    encoding="utf8")
  css=WEB/"styles/dish-photos.css"
  replace_once(css,
    'background: #000 url("/dish-images/yakitori-768.avif") center / cover no-repeat;',
    'background: #000 url("/dish-images/yakitori-thumb-512.avif") center / contain no-repeat;')
  gallery=WEB/"components/dish-photo-gallery.tsx"
  replace_once(gallery,
    '          <small>Chicken katsu-foto: Cohesion Singapore / Pexels, <a href="/dish-images/chicken-katsu-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>',
    '          <small>Chicken katsu-foto: Cohesion Singapore / Pexels, <a href="/dish-images/chicken-katsu-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>\n'
    '          <a href="/dish-images/yakitori-master-4000.avif" target="_blank" rel="noopener noreferrer">\n'
    '            Yakitori <span aria-hidden="true">↗</span>\n'
    '          </a>\n'
    '          <small>Yakitori-foto: Airam Dato-on / Pexels, <a href="/dish-images/yakitori-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>')
  replace_once(gallery,
    'isChickenKatsu ? "Redaksjonelt foto av panert kyllingkatsu med ris og nori, ikke restaurantfoto" : isPho ?',
    'isChickenKatsu ? "Redaksjonelt foto av panert kyllingkatsu med ris og nori, ikke restaurantfoto" : isYakitori ? "Redaksjonelt foto av to grillede yakitori-kyllingspyd med sitron, ikke restaurantfoto" : isPho ?')

  tf=WEB/"tests/dish-photo-gallery.test.mjs"
  s=tf.read_text(encoding="utf8")
  def edit(old,new,expected=1):
    nonlocal s
    assert s.count(old)==expected,f"Test anchor mismatch {old[:70]} has {s.count(old)} matches"
    s=s.replace(old,new)
  edit('approved.length, 24','approved.length, 25')
  edit('masala dosa and chicken katsu need approved full-size masters',
       'masala dosa, chicken katsu and yakitori need approved full-size masters')
  edit('index === 25 ? "yakitori-768.avif"',
       'index === 25 ? "yakitori-thumb-512.avif"')
  edit('[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].includes(index)',
       '[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].includes(index)')
  edit('public/dish-images/yakitori-768.avif','public/dish-images/yakitori-thumb-512.avif')
  edit('file: "yakitori-768.avif"','file: "yakitori-thumb-512.avif"')
  start='test("Chicken katsu has native photo thumb, yakitori and shrimp tempura udon keep distinct AVIF", () => {'
  finish='test("Remaining six Asian dishes use their own AVIF images and matching catalog IDs"'
  assert s.count(start)==1 and s.count(finish)==1
  a=s.index(start);b=s.index(finish,a)
  sec=s[a:b]
  sec=sec.replace('Chicken katsu has native photo thumb, yakitori and shrimp tempura udon keep distinct AVIF',
                  'Chicken katsu and yakitori use sharp original-photo thumbs; udon stays distinct')
  sec=sec.replace('(entry.index === 24 ? 12000 : 20000)','([24,25].includes(entry.index) ? 10000 : 20000)')
  sec=sec.replace('entry.index === 24 ? 512 : 768','[24,25].includes(entry.index) ? 512 : 768')
  sec=sec.replace('    if (entry.index === 24) {',
    '''    if (entry.index === 25) {
      assert.equal(image.kind, "Redaksjonelt rettfoto");
      assert.equal(image.largeViewEnabled, true);
      assert.equal(image.largeSource, "yakitori-master-4000.avif");
      assert.equal(image.largeSourceNativeWidth, 4000);
      assert.equal(image.largeSourceNativeHeight, 5000);
      assert.match(image.photoCredit, /Airam Dato-on.*Pexels/u);
      assert.match(gallery, /href="\\/dish-images\\/yakitori-master-4000\\.avif"/u);
    }
    if (entry.index === 24) {''')
  s=s[:a]+sec+s[b:]
  tf.write_text(s,encoding="utf8")
  quality=WEB/"tests/dish-image-large-view-quality.test.mjs"
  replace_once(quality,'    } else if (photo.id === "katsu") {',
    '''    } else if (photo.id === "yakitori") {
      assert.equal(photo.catalogId, "yakitori");
      assert.equal(photo.photoLicense, "https://www.pexels.com/license/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/yakitori-LICENSE.txt");
      assert.match(photo.photoCredit, /Airam Dato-on.*Pexels/u);
      const notice = readFileSync(path.join(imageRoot,"yakitori-LICENSE.txt"),"utf8");
      assert.match(notice, /Fotograf: Airam Dato-on/u);
      assert.match(notice, /Pexels License/u);
    } else if (photo.id === "katsu") {''')
  meta.update({"visual_review_completed":True,"approved_for_fysen":True,"published":False})
  review_file.write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  audit.update({"reviewed_variant":selected,"reviewed_preview_sha256":approved_sha,
    "processed_original_sha256":raw_sha,"master_avif_sha256":avif_sha,
    "visual_review_completed":True,"approved_for_fysen":True,"published":False})
  audit_file.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  print("YAKITORI DRAFT: authentic 4000x5000 AVIF + 512 mini, 25/44 approved on PR only")
if __name__=="__main__":main()
