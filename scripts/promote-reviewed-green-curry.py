#!/usr/bin/env python3
"""Integrate SOURCE-LOCKED green chicken curry only on an UNPUBLISHED draft branch.

Input: Max Griss / Pexels, exact 3017×3771 original JPEG SHA-256.
Manual bowl mask is identical to visually checked PR #1283 preview v3.
No restaurant menu, price, database or Vercel code is touched.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen
import json
import tempfile
from PIL import Image, ImageDraw, ImageFilter, ImageOps
import pillow_avif  # noqa: F401

ROOT=Path(__file__).resolve().parents[1]
WEB=ROOT/"apps/web"
PUBLIC=WEB/"public/dish-images"
SOURCE_URL="https://www.pexels.com/photo/delicious-thai-green-curry-with-chicken-38906797/"
SOURCE_JPEG="https://images.pexels.com/photos/38906797/pexels-photo-38906797.jpeg"
LICENSE="https://www.pexels.com/license/"
SOURCE_SHA="105814ed9d3638846610fdc3735327c4bc1530b33a5590ebb84872c1562a5a25"
REVIEW_PNG_SHA="1d95031531c32f45777b8533846bda81fa2eb79b9f4b827614a76fcc5e661a26"
REVIEW_PREVIEW_SHA="5a16d0e1b716fb179df4e703216f68e1526bc0efd3566a4dbf1517d8e4ad230c"
CREDIT="Max Griss / Pexels"
OUTLINE=[
    (103,480),(117,445),(145,411),(190,384),(248,360),(317,345),
    (389,336),(462,332),(535,337),(609,347),(677,366),
    (731,393),(775,428),(805,467),(827,521),(838,573),
    (838,628),(826,681),(805,735),(779,784),(742,826),
    (690,862),(627,892),(551,915),(476,932),(396,936),
    (318,927),(245,907),(181,879),(134,842),(103,794),
    (83,743),(72,689),(71,628),(78,565),(87,508),
]

def digest(path:Path)->str:
    return sha256(path.read_bytes()).hexdigest()

def replace_once(path:Path,old:str,new:str)->None:
    value=path.read_text(encoding="utf8")
    assert value.count(old)==1,f"Nonunique edit anchor in {path}: {old[:100]}"
    path.write_text(value.replace(old,new,1),encoding="utf8")

def main():
    original=ROOT/"assets/fysen-dish-originals/green-curry.png"
    master=PUBLIC/"green-curry-master-3017.avif"
    thumb=PUBLIC/"green-curry-thumb-512.avif"
    license_notice=PUBLIC/"green-curry-LICENSE.txt"
    report=ROOT/"docs/fysen-image-reviews/green-curry.md"
    for path in (original,master,thumb,license_notice,report):
        assert not path.exists(),f"Do not replace an existing asset: {path}"
    req=Request(SOURCE_JPEG,headers={
        "User-Agent":"FysenEditorialReview/1.0 (https://github.com/Paradispartiet/fysen)",
        "Accept":"image/jpeg,image/*;q=0.8"})
    with urlopen(req,timeout=75) as response:
        raw=response.read(42*1024*1024+1)
    assert sha256(raw).hexdigest()==SOURCE_SHA,"Original source bytes changed; reject"
    with Image.open(BytesIO(raw)) as photo:
        photo.load()
        src=ImageOps.exif_transpose(photo).convert("RGB")
    w,h=src.size
    assert (w,h)==(3017,3771)
    mask=Image.new("L",(w,h),0)
    ImageDraw.Draw(mask).polygon(
        [(round(x*w/880),round(y*h/1100)) for x,y in OUTLINE],fill=255)
    mask=mask.filter(ImageFilter.GaussianBlur(radius=2.8))
    native=Image.composite(src,Image.new("RGB",(w,h),(0,0,0)),mask)
    with tempfile.TemporaryDirectory(prefix="fysen-green-curry-") as temp:
        tmp=Path(temp)
        native_file=tmp/"black-polygon-native.png"
        preview_file=tmp/"black-polygon-preview.jpg"
        native.save(native_file,compress_level=4)
        preview=native.copy()
        preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
        preview.save(preview_file,quality=94,optimize=True)
        assert digest(native_file)==REVIEW_PNG_SHA,"Rendered original differs from inspected native PNG"
        assert digest(preview_file)==REVIEW_PREVIEW_SHA,"Rendered thumbnail differs from visually inspected v3"
        original.parent.mkdir(parents=True,exist_ok=True)
        original.write_bytes(native_file.read_bytes())
    assert all(native.getpixel(pt)==(0,0,0) for pt in
               [(0,0),(w-1,0),(0,h-1),(w-1,h-1)])
    native.save(master,format="AVIF",quality=89,speed=5)
    ImageOps.pad(native,(512,512),method=Image.Resampling.LANCZOS,
                 color=(0,0,0)).save(thumb,format="AVIF",quality=86,speed=5)
    with Image.open(master) as m:
        assert m.size==(3017,3771)
    with Image.open(thumb) as t:
        assert t.size==(512,512)
    large_sha=digest(master)
    png_sha=digest(original)

    manifest_path=PUBLIC/"manifest.json"
    manifest=json.loads(manifest_path.read_text(encoding="utf8"))
    assert len(manifest["images"])==44
    assert sum(x.get("largeViewEnabled") is True for x in manifest["images"])==24
    photo=manifest["images"][32]
    assert photo["id"]==photo["catalogId"]=="green-curry"
    assert photo["index"]==32 and photo["atlas"]=="green-curry-768.avif"
    assert photo["kind"]=="AI-illustrasjon"
    assert not photo.get("largeViewEnabled") and not photo.get("largeSource")
    photo.update({
        "atlas":thumb.name,
        "kind":"Redaksjonelt rettfoto",
        "variantCaution":("Lisensiert redaksjonelt foto av grønn curry med synlige kyllingstykker "
             "og thaibasilikum i grønn saus, servert i hel mørk skål mot svart bakgrunn. "
             "Ikke restaurantfoto eller dokumentasjon av en bestemt restaurantservering. "
             "Ingredienser og tilbehør kan variere; ingen ris er dokumentert på dette bildet."),
        "largeSourceOriginalPath":"assets/fysen-dish-originals/green-curry.png",
        "largeSource":master.name,
        "largeSourceNativeWidth":3017,
        "largeSourceNativeHeight":3771,
        "largeSourceMethod":"independent-original",
        "largeSourceSha256":large_sha,
        "largeSourceOriginalSha256":png_sha,
        "largeSourceReview":"docs/fysen-image-reviews/green-curry.md",
        "largeViewEnabled":True,
        "photoCredit":CREDIT,
        "photoSource":SOURCE_URL,
        "photoLicense":LICENSE,
        "photoLicenseNotice":"/dish-images/green-curry-LICENSE.txt"
    })
    assert sum(x.get("largeViewEnabled") is True for x in manifest["images"])==25
    assert next(x for x in manifest["images"] if x["id"]=="tom-yum").get("largeViewEnabled")
    manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf8")

    license_notice.write_text(
      "Grønn curry med kylling – redaksjonelt bearbeidet fotografi\n"
      "Fotograf: Max Griss / Pexels\n"
      "Original: "+SOURCE_URL+"\n"
      "Lisens: Pexels License, "+LICENSE+"\n"
      "Bearbeidet: Hel original skål frilagt mot svart bakgrunn ved kildepikselmaskering, "
      "3017 × 3771 px. Ingen matpiksler generert eller oppskalert. "
      "Separat AVIF-storbilde og 512 × 512 miniatyr.\n"
      "Dette er et representativt rettfoto, ikke et fotografi av noen Fysen-restaurant.\n"
      "Original JPEG SHA-256: "+SOURCE_SHA+"\n"
      "Frilagt PNG SHA-256: "+png_sha+"\n",encoding="utf8")
    report.parent.mkdir(parents=True,exist_ok=True)
    report.write_text(
      "# Grønn curry med kylling – høyoppløselig fotokandidat på utkastgren\n\n"
      "Redaksjonelt foto av grønn saus, kylling og thaibasilikum i en hel mørk bolle "
      "på svart bakgrunn. En sekundær bolle, bordet og en lys bakgrunn er utelatt. "
      "Ingen matpiksler syntetisert, og motivet er ikke zoomet eller oppskalert.\n\n"
      "- Fotograf og kilde: "+CREDIT+" – "+SOURCE_URL+"\n"
      "- Lisens: Pexels License – "+LICENSE+"\n"
      "- Original JPEG: 3017 × 3771 px; SHA-256 "+SOURCE_SHA+"\n"
      "- Eksakt visuelt inspisert v3-forhåndsvisning: SHA-256 "+REVIEW_PREVIEW_SHA+"\n"
      "- Maskert original PNG SHA-256: "+png_sha+"\n"
      "- AVIF-master "+master.name+" (3017 × 3771 px) SHA-256 "+large_sha+"\n"
      "- Miniatyr "+thumb.name+" (512 × 512 px), ingen oppskalering.\n"
      "- Faktisk 1400 × 1400 native-detalj kontrollert i kilde-PR #1283.\n"
      "- Fotoet er ikke et restaurantfoto; ris, kokosmelk eller andre tilbehør "
      "som ikke sees er ikke påstått.\n\n"
      "Status: visuelt vurdert som egnet i draft; produksjonspublisering IKKE utført. "
      "Ikke merge før de foregående bilde-PR-ene er kontrollert.\n",encoding="utf8")

    css=WEB/"styles/dish-photos.css"
    replace_once(css,
        'background: #000 url("/dish-images/green-curry-768.avif") center / cover no-repeat;',
        'background: #000 url("/dish-images/green-curry-thumb-512.avif") center / contain no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    replace_once(gallery,
        '          <a href="/dish-images/tom-yum-master-3334.avif"',
        '          <a href="/dish-images/green-curry-master-3017.avif" target="_blank" rel="noopener noreferrer">\n'
        '            Grønn curry med kylling <span aria-hidden="true">↗</span>\n'
        '          </a>\n'
        '          <small>Grønn curry-foto: Max Griss / Pexels, <a href="/dish-images/green-curry-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>\n'
        '          <a href="/dish-images/tom-yum-master-3334.avif"')
    replace_once(gallery,
        ' : isTomYum ? "Redaksjonelt foto av tom yum med reker, sopp og koriander, ikke restaurantfoto" : ',
        ' : isTomYum ? "Redaksjonelt foto av tom yum med reker, sopp og koriander, ikke restaurantfoto" : isGreenCurry ? "Redaksjonelt foto av grønn curry med kylling og thaibasilikum, ikke restaurantfoto" : ')

    test_path=WEB/"tests/dish-photo-gallery.test.mjs"
    tests=test_path.read_text(encoding="utf8")
    def test_replace(a,b):
        nonlocal tests
        assert tests.count(a)==1,f"Test edit anchor not unique: {a[:90]}"
        tests=tests.replace(a,b,1)
    test_replace('public/dish-images/green-curry-768.avif',
                 'public/dish-images/green-curry-thumb-512.avif')
    test_replace('assert.equal(approved.length, 24, "19 original masters plus Bibimbap, Falafel, Tacos al pastor, Chana masala and Masala dosa must be available");',
                 'assert.equal(approved.length, 25, "19 original masters plus Bibimbap, Falafel, Tacos al pastor, Chana masala, Masala dosa and Green curry must be available");')
    test_replace('index === 32 ? "green-curry-768.avif"',
                 'index === 32 ? "green-curry-thumb-512.avif"')
    test_replace('[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,33].includes(index)',
                 '[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,32,33].includes(index)')
    test_replace('file: "green-curry-768.avif"',
                 'file: "green-curry-thumb-512.avif"')
    start='test("Remaining six Asian dishes use their own AVIF images and matching catalog IDs", () => {'
    end='  assert.equal(manifest.images.length, 44);'
    a=tests.index(start);b=tests.index(end,a+len(start))
    assert a>=0 and b>a
    segment=tests[a:b]
    for dimension in (8,12):
        old=f'assert.equal(entry.bytes.readUInt32BE(marker + {dimension}), 768);'
        assert segment.count(old)==1
        segment=segment.replace(old,f'assert.equal(entry.bytes.readUInt32BE(marker + {dimension}), entry.index === 32 ? 512 : 768);',1)
    tests=tests[:a]+segment+tests[b:]
    green_test=r'''test("Green chicken curry is a source-locked native editorial photo, not a menu photo", () => {
  const photo = manifest.images[32];
  assert.equal(photo.id, "green-curry");
  assert.equal(photo.catalogId, "green-curry");
  assert.equal(photo.kind, "Redaksjonelt rettfoto");
  assert.equal(photo.largeViewEnabled, true);
  assert.equal(photo.largeSource, "green-curry-master-3017.avif");
  assert.equal(photo.largeSourceNativeWidth, 3017);
  assert.equal(photo.largeSourceNativeHeight, 3771);
  assert.equal(photo.photoCredit, "Max Griss / Pexels");
  assert.equal(photo.photoLicense, "https://www.pexels.com/license/");
  assert.match(photo.variantCaution, /kylling/iu);
  assert.match(photo.variantCaution, /ikke restaurantfoto/iu);
  assert.ok(gallery.includes('href="/dish-images/green-curry-master-3017.avif"'));
  assert.match(gallery, /Redaksjonelt foto av grønn curry med kylling/u);
  assert.ok(css.includes("green-curry-thumb-512.avif"));
});

'''
    test_replace(start,green_test+start)
    test_path.write_text(tests,encoding="utf8")

    quality=WEB/"tests/dish-image-large-view-quality.test.mjs"
    replace_once(quality,
       '    } else if (photo.id === "falafel") {',
       '''    } else if (photo.id === "green-curry") {
      assert.equal(photo.catalogId,"green-curry");
      assert.equal(photo.photoLicense,"https://www.pexels.com/license/");
      assert.equal(photo.photoLicenseNotice,"/dish-images/green-curry-LICENSE.txt");
      assert.match(photo.photoCredit,/Max Griss.*Pexels/u);
      const notice=readFileSync(path.join(imageRoot,"green-curry-LICENSE.txt"),"utf8");
      assert.match(notice,/Fotograf: Max Griss/u);
      assert.match(notice,/Pexels License/u);
    } else if (photo.id === "falafel") {''')
    print("GREEN_CURRY DRAFT READY: 25/44 source-native masters, no deploy, original PNG SHA",png_sha,flush=True)

if __name__=="__main__":
    main()
