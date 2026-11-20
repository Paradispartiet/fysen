#!/usr/bin/env python3
"""Promote visually inspected 8160px beef bibimbap to UNPUBLISHED editorial gallery.

Bibimbap is not a canonical food-knowledge catalog entry. Preserve catalogId
as null, and never map this image onto any restaurant's dishes.
"""
from __future__ import annotations
from hashlib import sha256
from pathlib import Path
import json,runpy,shutil
from PIL import Image,ImageOps
import pillow_avif  # noqa: F401

ROOT=Path(__file__).resolve().parents[1]
WEB=ROOT/"apps/web"
PUB=WEB/"public/dish-images"
C=ROOT/"assets/fysen-image-candidates/bibimbap/andy-li-saero-cc0"
SOURCE_SHA="087b46ba6e8c668ac13b6fd37ff7cbd74acc3b54fa003ee82511a4cf11b29c10"
SOURCE_URL="https://commons.wikimedia.org/wiki/File:Beef_Bibimbap_-_SAERO_2025-11-06.jpg"
LICENSE="https://creativecommons.org/publicdomain/zero/1.0/"

def hashfile(p):
  return sha256(p.read_bytes()).hexdigest()
def replace_one(path,old,new):
  text=path.read_text(encoding="utf8")
  assert text.count(old)==1, f"Required exact edit anchor not unique: {path} / {old[:80]}"
  path.write_text(text.replace(old,new,1),encoding="utf8")

def main():
  review=C/"review.json"
  mask_review=C/"black-review.json"
  source=json.loads(review.read_text(encoding="utf8"))
  black=json.loads(mask_review.read_text(encoding="utf8"))
  assert source["original_sha256"]==SOURCE_SHA and source["catalog_id"] is None
  assert source["native_original_verified"] and source["no_upscale"]
  assert (source["original_width"],source["original_height"])==(8160,6144)
  assert not source["approved_for_fysen"] and not source["published"]
  assert black["original_sha256"]==SOURCE_SHA and black["native_size"]==[8160,6144]
  assert black["catalog_id"] is None and black["no_upscale"]
  assert not black["approved_for_fysen"] and not black["published"]
  selected="black-grabcut"
  preview=C/f"{selected}-preview.jpg"
  assert preview.is_file() and (C/f"{selected}-native-detail-1400.jpg").is_file()
  inspected_hash=hashfile(preview)
  runpy.run_path(str(ROOT/"scripts/preview-beef-bibimbap-black.py"),run_name="__main__")
  assert hashfile(preview)==inspected_hash,"Visual preview changed during source regeneration"

  native=C/f"{selected}-native.png"
  original=ROOT/"assets/fysen-dish-originals/bibimbap.png"
  large=PUB/"bibimbap-master-8160.avif"
  small=PUB/"bibimbap-thumb-512.avif"
  notice=PUB/"bibimbap-LICENSE.txt"
  report=ROOT/"docs/fysen-image-reviews/bibimbap.md"
  for p in (original,large,small,notice,report):
    assert not p.exists(), f"Original/asset already exists, do not overwrite: {p}"
  with Image.open(native) as im:
    im.load()
    assert im.mode=="RGB" and im.size==(8160,6144)
    assert all(im.getpixel(pt)==(0,0,0) for pt in
               [(0,0),(8159,0),(0,6143),(8159,6143)])
    im.save(large,format="AVIF",quality=88,speed=5)
    ImageOps.pad(im,(512,512),method=Image.Resampling.LANCZOS,
                 color=(0,0,0)).save(small,format="AVIF",quality=86,speed=5)
  shutil.copyfile(native,original)
  original_hash=hashfile(original)
  large_hash=hashfile(large)
  with Image.open(large) as im: assert im.size==(8160,6144)
  with Image.open(small) as im: assert im.size==(512,512)

  mf=PUB/"manifest.json"
  m=json.loads(mf.read_text(encoding="utf8"))
  assert len(m["images"])==44
  assert sum(p.get("largeViewEnabled") is True for p in m["images"])==18
  dish=next(p for p in m["images"] if p["id"]=="bibimbap")
  assert dish["index"]==19 and dish["catalogId"] is None
  assert dish["kind"]=="AI-illustrasjon" and dish["atlas"]=="bibimbap-768.avif"
  assert not dish.get("largeSource") and not dish.get("largeViewEnabled")
  dish.update({
    "atlas":small.name,
    "kind":"Redaksjonelt rettfoto",
    "variantCaution":"Ekte redaksjonelt foto av bibimbap med storfekjøtt, ris, grønnsaker, sesam og stekt egg på svart bakgrunn. Kjøttvariant, ikke vegetarisk, ikke restaurantfoto og ikke dokumentasjon av en bestemt restaurantservering.",
    "largeSourceOriginalPath":"assets/fysen-dish-originals/bibimbap.png",
    "largeSource":large.name,
    "largeSourceNativeWidth":8160,
    "largeSourceNativeHeight":6144,
    "largeSourceMethod":"independent-original",
    "largeSourceSha256":large_hash,
    "largeSourceOriginalSha256":original_hash,
    "largeSourceReview":"docs/fysen-image-reviews/bibimbap.md",
    "largeViewEnabled":True,
    "photoCredit":"Andy Li / Wikimedia Commons, CC0 1.0",
    "photoSource":SOURCE_URL,
    "photoLicense":LICENSE,
    "photoLicenseNotice":"/dish-images/bibimbap-LICENSE.txt"
  })
  assert dish["catalogId"] is None
  mf.write_text(json.dumps(m,ensure_ascii=False,indent=2)+"\n",encoding="utf8")

  notice.write_text(
    "Bibimbap – bearbeidet redaksjonelt foto\n"
    "Fotograf: Andy Li / Wikimedia Commons\n"
    "Kilde: "+SOURCE_URL+"\n"
    "Lisens: Creative Commons Zero (CC0 1.0), "+LICENSE+"\n"
    "Endringer: Autentisk foto 8160 × 6144 av bibimbap med storfekjøtt, egg, ris og grønnsaker "
    "er frilagt mot svart bakgrunn. Bord og andre serveringer er fjernet; ingen mat er "
    "syntetisert, lagt til eller oppskalert. Separat AVIF-master og 512 × 512 AVIF-mini.\n"
    "Dette er ikke foto fra en Fysen-restaurant eller bildebevis for restaurantens retter.\n"
    "Original JPEG SHA-256: "+SOURCE_SHA+"\n"
    "Bearbeidet PNG SHA-256: "+original_hash+"\n",
    encoding="utf8")
  report.write_text(
    "# Bibimbap – kontrollert native foto, kun redaksjonelt Matlyst-galleri\n\n"
    "Komplett bibimbap-bolle med storfekjøtt, ris, grønnsaker og stekt egg "
    "på svart bakgrunn. Ingen annen mat/retter er lagt til.\n"
    "Katalog-ID er fremdeles null. Ingen restaurantfoto- eller menytilordning.\n\n"
    "- Fotograf: Andy Li / Wikimedia Commons, "+SOURCE_URL+"\n"
    "- Lisens: CC0 1.0, "+LICENSE+"\n"
    "- Kilde-original 8160 × 6144 JPEG, SHA-256 "+SOURCE_SHA+"\n"
    "- Fire uavhengige kildeoriginaler kontrollert. Denne er valgt fordi hele bollen "
    "og kjøttvarianten er synlige.\n"
    "- GrabCut og konservativ nedre kantfrilegging fra ekte piksler. Ingen syntetiske matpiksler.\n"
    "- Ekte 1400 × 1400 originaldetalj inspisert, ingen oppskalering.\n"
    "- Master bibimbap-master-8160.avif (8160 × 6144), egen mini "
    "bibimbap-thumb-512.avif (512 × 512).\n"
    "- Ingen publisering til main, ingen fysisk iPad-test etter release.\n\n"
    "Reviewed for full-size display: yes\n"
    "No collage crop or upscale: yes\n"
    "Correct dish and black background: yes\n\n"
    "Reviewed PNG SHA-256: "+original_hash+"\n"
    "Reviewed preview SHA-256: "+inspected_hash+"\n",
    encoding="utf8")

  css=WEB/"styles/dish-photos.css"
  replace_one(css,
    'background: #000 url("/dish-images/bibimbap-768.avif") center / cover no-repeat;',
    'background: #000 url("/dish-images/bibimbap-thumb-512.avif") center / contain no-repeat;')
  gallery=WEB/"components/dish-photo-gallery.tsx"
  replace_one(gallery,
    '          <small>Phở bò-foto: UNDO KIM / Pexels, <a href="/dish-images/pho-bo-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>',
    '          <small>Phở bò-foto: UNDO KIM / Pexels, <a href="/dish-images/pho-bo-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>\n'
    '          <a href="/dish-images/bibimbap-master-8160.avif" target="_blank" rel="noopener noreferrer">\n'
    '            Bibimbap med storfekjøtt <span aria-hidden="true">↗</span>\n'
    '          </a>\n'
    '          <small>Bibimbap-foto: Andy Li / Wikimedia Commons, <a href="/dish-images/bibimbap-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC0 1.0, kilde</a>.</small>')

  tst=WEB/"tests/dish-photo-gallery.test.mjs"
  st=tst.read_text(encoding="utf8")
  def ch(old,new):
    nonlocal st
    assert st.count(old)==1,f"Expected unique gallery test anchor: {old[:85]}"
    st=st.replace(old,new,1)
  ch("approved.length, 18","approved.length, 19")
  ch("gyoza and phở bò need approved full-size masters",
     "gyoza, phở bò and bibimbap need approved full-size masters")
  ch('index === 19 ? "bibimbap-768.avif"',
     'index === 19 ? "bibimbap-thumb-512.avif"')
  ch('[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18].includes(index)',
     '[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19].includes(index)')
  ch('const bibimbapImage = readFileSync(path.join(web, "public/dish-images/bibimbap-768.avif"));',
     'const bibimbapImage = readFileSync(path.join(web, "public/dish-images/bibimbap-thumb-512.avif"));')
  ch('{ index: 19, id: "bibimbap", file: "bibimbap-768.avif",',
     '{ index: 19, id: "bibimbap", file: "bibimbap-thumb-512.avif",')
  ch('assert.equal(bytes.readUInt32BE(marker + 8), index === 13 ? 512 : 768);',
     'assert.equal(bytes.readUInt32BE(marker + 8), [13,19].includes(index) ? 512 : 768);')
  ch('assert.equal(bytes.readUInt32BE(marker + 12), index === 13 ? 512 : 768);',
     'assert.equal(bytes.readUInt32BE(marker + 12), [13,19].includes(index) ? 512 : 768);')
  ch('test("White fish, beef bibimbap and pork tacos al pastor have exact separate dish images", () => {',
    '''test("Bibimbap photo is CC0 original at 8160px, with compact 512px thumb and no catalog link", () => {
  const b=manifest.images[19];
  assert.equal(b.catalogId,null);
  assert.equal(b.kind,"Redaksjonelt rettfoto");
  assert.equal(b.largeViewEnabled,true);
  assert.equal(b.largeSource,"bibimbap-master-8160.avif");
  assert.equal(b.largeSourceNativeWidth,8160);
  assert.equal(b.largeSourceNativeHeight,6144);
  assert.match(b.photoCredit,/Andy Li.*CC0 1\\.0/u);
  assert.equal(b.photoLicense,"https://creativecommons.org/publicdomain/zero/1.0/");
  assert.match(gallery,/href="\\/dish-images\\/bibimbap-master-8160\\.avif"/u);
  const mapped=gallery.slice(gallery.indexOf("const editorialPhotoIndex:"),gallery.indexOf("const illustratedVariants"));
  assert.doesNotMatch(mapped,/bibimbap/u);
});

test("White fish, beef bibimbap and pork tacos al pastor have exact separate dish images", () => {''')
  tst.write_text(st,encoding="utf8")
  q=WEB/"tests/dish-image-large-view-quality.test.mjs"
  replace_one(q,'    } else if (photo.id === "pizza-prosciutto") {',
   '''    } else if (photo.id === "bibimbap") {
      assert.equal(photo.catalogId, null);
      assert.match(photo.photoSource, /^https:\\/\\/commons\\.wikimedia\\.org\\/wiki\\/File:/u);
      assert.match(photo.photoCredit, /Andy Li.*CC0 1\\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/publicdomain/zero/1.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/bibimbap-LICENSE.txt");
      const notice=readFileSync(path.join(imageRoot, "bibimbap-LICENSE.txt"), "utf8");
      assert.match(notice, /Fotograf: Andy Li/u);
      assert.match(notice, /CC0 1\\.0/u);
    } else if (photo.id === "pizza-prosciutto") {''')

  black.update({"chosen_variant":selected,"inspected_preview_sha256":inspected_hash,
                "reviewed_native_sha256":original_hash,"large_avif_sha256":large_hash,
                "visual_review_completed":True,"approved_for_fysen":True,"published":False})
  mask_review.write_text(json.dumps(black,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  source.update({"visual_review_completed":True,"approved_for_fysen":True,"published":False})
  review.write_text(json.dumps(source,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  print("DRAFT ONLY: 19/44 reviewed native photos; bibimbap catalogId=null unchanged")

if __name__=="__main__":
  main()
