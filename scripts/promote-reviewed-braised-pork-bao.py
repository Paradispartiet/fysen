#!/usr/bin/env python3
"""Create native, source-verified braised pork gua-bao photo on draft only.

One complete genuine red-braised pork bao and plate is isolated from a CC0
original. Never invents food, upscales original food pixels or deploys to main.
"""
from pathlib import Path
from hashlib import sha256
import json,runpy
import numpy as np
import cv2
from PIL import Image,ImageOps
import pillow_avif  # noqa: F401

ROOT=Path(__file__).resolve().parents[1]
WEB=ROOT/"apps/web"
PUB=WEB/"public/dish-images"
C=ROOT/"assets/fysen-image-candidates/braised-pork-bao/andy-li-cc0"
SOURCE_SHA="d4221c32c6f554de5984b5c44877e07ebb5d817ec67c2a7a22315aa66d4b55cd"
AUTHOR="Andy Li / Wikimedia Commons · CC0 1.0"
PAGE="https://commons.wikimedia.org/wiki/File:Red_Braised_Pork_Belly_Bao_-_Tiger_Bites_Pig_2025-11-20.jpg"
LICENSE="https://creativecommons.org/publicdomain/zero/1.0/"

def digest(p):return sha256(Path(p).read_bytes()).hexdigest()
def replace_once(path,old,new):
  p=Path(path);s=p.read_text(encoding="utf8")
  assert s.count(old)==1,f"Cannot uniquely replace {old[:95]} in {p}: {s.count(old)} matches"
  p.write_text(s.replace(old,new,1),encoding="utf8")

def main():
  meta_file=C/"review.json";audit_file=C/"black-review.json"
  meta=json.loads(meta_file.read_text(encoding="utf8"))
  audit=json.loads(audit_file.read_text(encoding="utf8"))
  assert meta["source_verified"] and meta["no_upscale"] and meta["original_sha256"]==SOURCE_SHA
  assert meta["catalog_id"]==meta["dish_id"]=="bao"
  assert meta["source_page"]==PAGE and meta["license"]=="CC0 1.0"
  assert (meta["native_width"],meta["native_height"])==(8160,6144)
  assert not meta["approved_for_fysen"] and not meta["published"]
  assert audit["source_original_sha256"]==SOURCE_SHA and audit["license"]=="CC0 1.0"
  assert audit["no_upscale"] and not audit["generated_food_pixels"]
  assert not audit["approved_for_fysen"] and not audit["published"]
  variant="black-clean-grabcut"
  preview=C/(variant+"-preview.jpg")
  detail=C/(variant+"-detail-1400.jpg")
  assert preview.is_file() and detail.is_file()
  reviewed_preview_sha=digest(preview)
  state=runpy.run_path(str(ROOT/"scripts/preview-braised-pork-bao-black.py"),run_name="__main__")
  assert digest(preview)==reviewed_preview_sha,"Reviewed photo mask differs from committed preview"
  original_photo=state["photo"]
  W,H=original_photo.size
  assert (W,H)==(8160,6144)
  # Crop ONLY (no enlargement) around the complete ceramic plate and bao.
  crop_box=(1500,1350,6660,4750)
  cx1,cy1,cx2,cy2=crop_box
  assert (cx2-cx1,cy2-cy1)==(5160,3400)
  src=np.asarray(original_photo.crop(crop_box))
  native_mask=cv2.resize(state["clean"],(W,H),interpolation=cv2.INTER_LINEAR)[cy1:cy2,cx1:cx2]
  native_mask=cv2.GaussianBlur(native_mask,(0,0),0.8)
  out=((src.astype(np.uint16)*native_mask[:,:,None].astype(np.uint16)+127)//255).astype(np.uint8)
  photo=Image.fromarray(out)
  assert photo.size==(5160,3400)
  for point in ((0,0),(5159,0),(0,3399),(5159,3399)):
    assert photo.getpixel(point)==(0,0,0),"A backdrop leaked into the crop margin"

  original=ROOT/"assets/fysen-dish-originals/bao.png"
  large=PUB/"bao-braised-pork-master-5160.avif"
  mini=PUB/"bao-braised-pork-thumb-512.avif"
  notice=PUB/"bao-braised-pork-LICENSE.txt"
  report=ROOT/"docs/fysen-image-reviews/bao.md"
  for p in (original,large,mini,notice,report):
    assert not p.exists(),f"Refusing to overwrite an existing final asset: {p}"
  photo.save(original,format="PNG",compress_level=5)
  photo.save(large,format="AVIF",quality=89,speed=6)
  ImageOps.pad(photo,(512,512),method=Image.Resampling.LANCZOS,
               color=(0,0,0)).save(mini,format="AVIF",quality=86,speed=5)
  original_sha=digest(original);large_sha=digest(large)
  with Image.open(large) as image: assert image.size==(5160,3400)
  with Image.open(mini) as image:assert image.size==(512,512)

  manifest=PUB/"manifest.json"
  m=json.loads(manifest.read_text(encoding="utf8"))
  assert len(m["images"])==44
  assert sum(x.get("largeViewEnabled") is True for x in m["images"])==26
  item=m["images"][27]
  assert item["id"]==item["catalogId"]=="bao" and item["index"]==27
  assert item["kind"]=="AI-illustrasjon" and item["atlas"]=="bao-768.avif"
  assert not item.get("largeViewEnabled") and not item.get("largeSource")
  item.update({
    "atlas":mini.name,
    "kind":"Redaksjonelt rettfoto",
    "variantCaution":("Autentisk foto av taiwansk gua bao med rødbraisert svinekjøtt "
       "og synlige syltede sennepsblader, knuste peanøtter og koriander. "
       "Dette er ikke vegetarisk. Kilden oppgir også soya; allergener må kontrolleres "
       "hos hver enkelt restaurant. Bildet er tatt hos Tiger Bites Pig i Brighton, "
       "ikke restaurantfoto fra Fysen. Ingen påstand om agurk eller syltet rødløk."),
    "largeSourceOriginalPath":"assets/fysen-dish-originals/bao.png",
    "largeSource":large.name,
    "largeSourceNativeWidth":5160,
    "largeSourceNativeHeight":3400,
    "largeSourceMethod":"independent-original",
    "largeSourceSha256":large_sha,
    "largeSourceOriginalSha256":original_sha,
    "largeSourceReview":"docs/fysen-image-reviews/bao.md",
    "largeViewEnabled":True,
    "photoCredit":AUTHOR,
    "photoSource":PAGE,
    "photoLicense":LICENSE,
    "photoLicenseNotice":"/dish-images/bao-braised-pork-LICENSE.txt"
  })
  manifest.write_text(json.dumps(m,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  notice.write_text(
    "Bao med braisert svinekjøtt – redaksjonelt bearbeidet originalfoto\n"
    "Fotograf: Andy Li / Wikimedia Commons\n"
    "Original: "+PAGE+"\n"
    "Lisens: CC0 1.0 Universal Public Domain Dedication\n"
    "Lisenslenke: "+LICENSE+"\n"
    "Bearbeidelse: Ekte rødbraisert pork belly gua-bao, syltede sennepsblader, "
    "knuste peanøtter og koriander isolert med hel brun tallerken; trykt meny, "
    "glass og restaurantbord fjernet mot ren svart bakgrunn. "
    "Original JPEG 8160 x 6144 kildetro beskåret til 5160 x 3400. "
    "Ingen oppskalering eller syntetiske matpiksler. Egen 512 x 512 AVIF-miniatyr.\n"
    "Kildebildet ble fotografert hos Tiger Bites Pig i Brighton. Dette er "
    "ikke dokumentasjon for servering hos noen restaurant i Fysen.\n"
    "Original JPEG SHA-256: "+SOURCE_SHA+"\n"
    "Frilagt PNG SHA-256: "+original_sha+"\n",encoding="utf8")
  report.write_text(
    "# Bao med braisert svinekjøtt – ekte rettfoto i upublisert utkast\n\n"
    "Ett ekte red-braised pork belly gua bao på hel brun keramikkplate. "
    "Fotografiets egen meny beskriver syltede sennepsblader, soya, knuste "
    "peanøtter og koriander; agurk og rødløk er **ikke** dokumentert. "
    "Fotoet er fra Brighton og må ikke feilaktig knyttes til Fysen-restauranter.\n\n"
    "- Kilde: "+PAGE+"\n"
    "- Fotograf: Andy Li; CC0 1.0: "+LICENSE+"\n"
    "- Original-JPEG: 8160 x 6144, SHA-256 "+SOURCE_SHA+"\n"
    "- Beskåret kildetro til 5160 x 3400 AVIF og egen 512 x 512 AVIF-miniatyr.\n"
    "- "+variant+" valgt etter visuell gjennomgang; 1400 x 1400 kildetro detalj kontrollert.\n"
    "- Ingen nye matpiksler eller oppskalering, ingen tabell/meny/databaseendringer.\n"
    "- Kun draft: ingen merge, ingen produksjonspublisering.\n\n"
    "Reviewed for full-size display: yes\n"
    "No collage crop or upscale: yes\n"
    "Correct dish and black background: yes\n\n"
    "Bearbeidet PNG SHA-256: "+original_sha+"\n"
    "Godkjent maskepreview SHA-256: "+reviewed_preview_sha+"\n",encoding="utf8")

  css=WEB/"styles/dish-photos.css"
  replace_once(css,
    '.dishPhotoSmall.dishPhotoBao { background: #000 url("/dish-images/bao-768.avif") center / cover no-repeat; }',
    '.dishPhotoSmall.dishPhotoBao { background: #000 url("/dish-images/bao-braised-pork-thumb-512.avif") center / contain no-repeat; }')
  gallery=WEB/"components/dish-photo-gallery.tsx"
  replace_once(gallery,
    '          <small>Udon-foto: Immanuelle / Wikimedia Commons, CC BY 4.0, <a href="/dish-images/udon-tempura-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og endringer</a>.</small>',
    '          <small>Udon-foto: Immanuelle / Wikimedia Commons, CC BY 4.0, <a href="/dish-images/udon-tempura-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og endringer</a>.</small>\n'
    '          <a href="/dish-images/bao-braised-pork-master-5160.avif" target="_blank" rel="noopener noreferrer">\n'
    '            Bao med braisert kjøtt <span aria-hidden="true">↗</span>\n'
    '          </a>\n'
    '          <small>Bao-foto: Andy Li / Wikimedia Commons, CC0 1.0, <a href="/dish-images/bao-braised-pork-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og bearbeiding</a>.</small>')
  replace_once(gallery,
    'isUdonTempura ? "Redaksjonelt foto av udon med reketempura i blåhvit skål, ikke restaurantfoto" : isPho ?',
    'isUdonTempura ? "Redaksjonelt foto av udon med reketempura i blåhvit skål, ikke restaurantfoto" : isBao ? "Redaksjonelt foto av bao med rødbraisert svinekjøtt og grønt på hel tallerken, ikke restaurantfoto fra Fysen" : isPho ?')

  testfile=WEB/"tests/dish-photo-gallery.test.mjs"
  ts=testfile.read_text(encoding="utf8")
  def edit(old,new):
    nonlocal ts
    assert ts.count(old)==1,f"Expected one gallery-test anchor: {old[:80]}, found {ts.count(old)}"
    ts=ts.replace(old,new,1)
  edit('public/dish-images/bao-768.avif','public/dish-images/bao-braised-pork-thumb-512.avif')
  edit('approved.length, 26','approved.length, 27')
  edit('yakitori and udon med reketempura need approved full-size masters',
       'yakitori, udon med reketempura and braised pork bao need approved full-size masters')
  edit('index === 27 ? "bao-768.avif"','index === 27 ? "bao-braised-pork-thumb-512.avif"')
  edit('[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26].includes(index)',
       '[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27].includes(index)')
  edit('test("Remaining six Asian dishes use their own AVIF images and matching catalog IDs"',
       'test("Remaining five Asian dishes use their own AVIF images and matching catalog IDs"')
  edit('    { index: 27, id: "bao", file: "bao-768.avif", bytes: baoImage, cls: "Bao", ingredient: /svinekjøtt/iu },\n','')
  separate='''test("Bao with braised pork has genuine CC0 original and a separate sharp 512 thumbnail", () => {
  const p=manifest.images[27];
  assert.equal(p.id,"bao");
  assert.equal(p.catalogId,"bao");
  assert.equal(p.kind,"Redaksjonelt rettfoto");
  assert.equal(p.largeViewEnabled,true);
  assert.equal(p.atlas,"bao-braised-pork-thumb-512.avif");
  assert.equal(p.largeSource,"bao-braised-pork-master-5160.avif");
  assert.equal(p.largeSourceNativeWidth,5160);
  assert.equal(p.largeSourceNativeHeight,3400);
  assert.match(p.photoCredit,/Andy Li.*CC0 1\\.0/u);
  assert.match(p.variantCaution,/svinekjøtt/u);
  assert.match(p.variantCaution,/ikke vegetarisk/u);
  assert.match(p.variantCaution,/ikke restaurantfoto/iu);
  assert.equal(baoImage.toString("ascii",4,12),"ftypavif");
  assert.ok(baoImage.length>10000,"Bao thumbnail must not be placeholder");
  const marker=baoImage.indexOf(Buffer.from("ispe"));
  assert.ok(marker>0);
  assert.equal(baoImage.readUInt32BE(marker+8),512);
  assert.equal(baoImage.readUInt32BE(marker+12),512);
  assert.match(gallery,/href="\\/dish-images\\/bao-braised-pork-master-5160\\.avif"/u);
  assert.match(gallery,/isBao = index === 27/u);
  assert.ok(css.includes("bao-braised-pork-thumb-512.avif"));
  assert.ok(css.includes("center / contain no-repeat"));
});

'''
  needle='test("Remaining five Asian dishes use their own AVIF images and matching catalog IDs"'
  assert ts.count(needle)==1
  ts=ts.replace(needle,separate+needle,1)
  testfile.write_text(ts,encoding="utf8")

  quality=WEB/"tests/dish-image-large-view-quality.test.mjs"
  replace_once(quality,'    } else if (photo.id === "udon") {',
    '''    } else if (photo.id === "bao") {
      assert.equal(photo.catalogId, "bao");
      assert.match(photo.photoSource, /^https:\\/\\/commons\\.wikimedia\\.org\\/wiki\\/File:/u);
      assert.match(photo.photoCredit, /Andy Li.*CC0 1\\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/publicdomain/zero/1.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/bao-braised-pork-LICENSE.txt");
      const notice=readFileSync(path.join(imageRoot,"bao-braised-pork-LICENSE.txt"),"utf8");
      assert.match(notice,/Fotograf: Andy Li/u);
      assert.match(notice,/CC0 1\\.0/u);
      assert.match(notice,/Bearbeidelse:/u);
    } else if (photo.id === "udon") {''')
  meta.update({"visual_review_completed":True,"approved_for_fysen":True,"published":False})
  meta_file.write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  audit.update({"reviewed_variant":variant,"reviewed_preview_sha256":reviewed_preview_sha,
    "processed_original_sha256":original_sha,"master_avif_sha256":large_sha,
    "visual_review_completed":True,"approved_for_fysen":True,"published":False})
  audit_file.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
  print("BRAISED PORK BAO DRAFT: native 5160x3400 AVIF, 512 mini, 27/44 UNPUBLISHED")
if __name__=="__main__":main()
