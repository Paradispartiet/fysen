#!/usr/bin/env python3
"""Promote reviewed native falafel/hummus photo into DRAFT Matlyst gallery only.

Exact source JPEG SHA-256 and inspected preview hash are required. Never add
food pixels, upscale, publish, map to specific restaurants or change menus.
"""
from __future__ import annotations
from hashlib import sha256
from pathlib import Path
import json,runpy,shutil

from PIL import Image,ImageOps
import pillow_avif  # noqa: F401

ROOT=Path(__file__).resolve().parents[1]
C=ROOT/"assets/fysen-image-candidates/falafel/saya-p-bowl-pexels"
WEB=ROOT/"apps/web"
PUBLIC=WEB/"public/dish-images"
SOURCE_SHA="71c3b13a73f29715bb618be69738a2fcca2f2abd1ce7f2f279b2526f8232cfa4"
SOURCE_URL="https://www.pexels.com/photo/delicious-falafel-bowl-with-hummus-and-salad-39976633/"
LICENSE="https://www.pexels.com/license/"
CREDIT="Saya P / Pexels"

def digest(file:Path)->str:
    return sha256(file.read_bytes()).hexdigest()

def replace_once(path:Path,old:str,new:str)->None:
    current=path.read_text(encoding="utf8")
    assert current.count(old)==1,f"Expected one unique edit anchor {path}: {old[:90]}"
    path.write_text(current.replace(old,new,1),encoding="utf8")

def main():
    candidate_path=C/"review.json"
    audit_path=C/"black-review.json"
    candidate=json.loads(candidate_path.read_text(encoding="utf8"))
    audit=json.loads(audit_path.read_text(encoding="utf8"))
    assert candidate["original_sha256"]==SOURCE_SHA and candidate["download_verified"]
    assert candidate["catalog_id"]=="falafel" and candidate["no_upscale"]
    assert (candidate["native_width"],candidate["native_height"])==(4284,5712)
    assert not candidate["approved_for_fysen"] and not candidate["published"]
    assert audit["source_original_sha256"]==SOURCE_SHA
    assert audit["source_native_dimensions"]==[4284,5712]
    assert audit["no_upscale"] and not audit["generated_food_pixels"]
    assert not audit["approved_for_fysen"] and not audit["published"]

    variant="black-grabcut"
    preview=C/f"{variant}-preview.jpg"
    assert preview.is_file() and (C/f"{variant}-native-detail-1400.jpg").is_file()
    reviewed_preview_sha=digest(preview)
    runpy.run_path(str(ROOT/"scripts/preview-falafel-black.py"),run_name="__main__")
    assert digest(preview)==reviewed_preview_sha,"Regeneration changed visually inspected preview"
    native=C/f"{variant}-native.png"
    original=ROOT/"assets/fysen-dish-originals/falafel.png"
    large=PUBLIC/"falafel-master-4284.avif"
    mini=PUBLIC/"falafel-thumb-512.avif"
    notice=PUBLIC/"falafel-LICENSE.txt"
    report=ROOT/"docs/fysen-image-reviews/falafel.md"
    for path in (original,large,mini,notice,report):
        assert not path.exists(),f"Existing asset must not be overwritten: {path}"

    with Image.open(native) as pic:
        pic.load()
        assert pic.size==(4284,5712) and pic.mode=="RGB"
        assert all(pic.getpixel(pt)==(0,0,0) for pt in
                   [(0,0),(4283,0),(0,5711),(4283,5711)])
        pic.save(large,format="AVIF",quality=89,speed=5)
        ImageOps.pad(pic,(512,512),method=Image.Resampling.LANCZOS,
                     color=(0,0,0)).save(mini,format="AVIF",quality=86,speed=5)
    shutil.copyfile(native,original)
    original_sha=digest(original)
    large_sha=digest(large)
    with Image.open(large) as i: assert i.size==(4284,5712)
    with Image.open(mini) as i: assert i.size==(512,512)

    manifest_path=PUBLIC/"manifest.json"
    data=json.loads(manifest_path.read_text(encoding="utf8"))
    assert len(data["images"])==44
    assert sum(x.get("largeViewEnabled") is True for x in data["images"])==19
    p=next(x for x in data["images"] if x["id"]=="falafel")
    assert p["index"]==20 and p["catalogId"]=="falafel"
    assert p["atlas"]=="falafel-768.avif" and p["kind"]=="AI-illustrasjon"
    assert not p.get("largeViewEnabled") and not p.get("largeSource")
    p.update({
      "atlas":mini.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":("Lisensiert redaksjonelt foto av falafel med hummus, salat, "
        "sesamfrø og en oransje grønnsaksdipp i hel rund serveringsbolle mot "
        "svart bakgrunn. Ikke restaurantfoto eller dokumentasjon av en bestemt "
        "restaurantservering; tilbehør og allergener varierer."),
      "largeSourceOriginalPath":"assets/fysen-dish-originals/falafel.png",
      "largeSource":large.name,
      "largeSourceNativeWidth":4284,
      "largeSourceNativeHeight":5712,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":large_sha,
      "largeSourceOriginalSha256":original_sha,
      "largeSourceReview":"docs/fysen-image-reviews/falafel.md",
      "largeViewEnabled":True,
      "photoCredit":CREDIT,
      "photoSource":SOURCE_URL,
      "photoLicense":LICENSE,
      "photoLicenseNotice":"/dish-images/falafel-LICENSE.txt"
    })
    manifest_path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")

    notice.write_text(
      "Falafel med hummus – bearbeidet redaksjonelt fotografi\n"
      "Fotograf: Saya P / Pexels\n"
      "Original: "+SOURCE_URL+"\n"
      "Lisens: Pexels License, "+LICENSE+"\n"
      "Bearbeidet: Ekte 4284 × 5712 originalfoto med full bolle falafel, hummus "
      "og salat er frilagt fra trebord, ekstra tallerkener og glass mot ren svart "
      "bakgrunn. Ingen matpiksler generert, ingen kildepiksler oppskalert. "
      "Separate AVIF-filer: originaloppløst storbilde og 512 × 512 miniatyr.\n"
      "Representativt redaksjonelt rettfoto, ikke et bilde av en Fysen-restaurant.\n"
      "Original JPEG SHA-256: "+SOURCE_SHA+"\n"
      "Frilagt PNG SHA-256: "+original_sha+"\n",
      encoding="utf8")
    report.write_text(
      "# Falafel – kvalitetsgodkjent autentisk original i PR-kjeden\n\n"
      "En hel rund serveringsbolle med falafel, hummus og salat, "
      "mot svart bakgrunn. Mat og opprinnelige farger bevart. "
      "Ikke fotografi fra noen konkret Fysen-restaurant.\n\n"
      "- Fotograf: Saya P / Pexels, "+SOURCE_URL+"\n"
      "- Lisens: Pexels License, "+LICENSE+"\n"
      "- Ekte original JPEG: 4284 × 5712, SHA-256 "+SOURCE_SHA+"\n"
      "- Seks ulike autentiske fotokandidater vurdert. Kilder med utydelig "
      "hummus eller flere separate serveringer ble ikke valgt.\n"
      "- GrabCut-variant valgt etter visuell kontroll av komplett mat og hel "
      "hvit skålkant, uten ekstra tallerkener/glass eller trebord.\n"
      "- Ekte 1400 × 1400 detaljutsnitt inspeksjon, ingen oppskalering "
      "eller KI-generert mat.\n"
      "- AVIF-master falafel-master-4284.avif (4284 × 5712); separat "
      "falafel-thumb-512.avif (512 × 512).\n"
      "- Ingen endringer i restaurantmenyer, priser eller databaser.\n"
      "- Draft only; ingen merge til main og ingen offentlig deploy.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Frilagt PNG SHA-256: "+original_sha+"\n"
      "Visuelt inspisert preview SHA-256: "+reviewed_preview_sha+"\n",
      encoding="utf8")

    css=WEB/"styles/dish-photos.css"
    replace_once(css,
      'background: #000 url("/dish-images/falafel-768.avif") center / cover no-repeat;',
      'background: #000 url("/dish-images/falafel-thumb-512.avif") center / contain no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    replace_once(gallery,
      '          <small>Bibimbap-foto: Andy Li / Wikimedia Commons, <a href="/dish-images/bibimbap-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC0 1.0, kilde</a>.</small>',
      '          <small>Bibimbap-foto: Andy Li / Wikimedia Commons, <a href="/dish-images/bibimbap-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC0 1.0, kilde</a>.</small>\n'
      '          <a href="/dish-images/falafel-master-4284.avif" target="_blank" rel="noopener noreferrer">\n'
      '            Falafel med hummus <span aria-hidden="true">↗</span>\n'
      '          </a>\n'
      '          <small>Falafel-foto: Saya P / Pexels, <a href="/dish-images/falafel-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>')

    testfile=WEB/"tests/dish-photo-gallery.test.mjs"
    tests=testfile.read_text(encoding="utf8")
    def edit(old,new):
        nonlocal tests
        assert tests.count(old)==1, f"Missing exact unique test anchor: {old[:90]}"
        tests=tests.replace(old,new,1)
    edit("approved.length, 19","approved.length, 20")
    edit("phở bò and bibimbap need approved full-size masters",
         "phở bò, bibimbap and falafel need approved full-size masters")
    edit('index === 20 ? "falafel-768.avif"',
         'index === 20 ? "falafel-thumb-512.avif"')
    edit('[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19].includes(index)',
         '[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20].includes(index)')
    edit('const falafelImage = readFileSync(path.join(web, "public/dish-images/falafel-768.avif"));',
         'const falafelImage = readFileSync(path.join(web, "public/dish-images/falafel-thumb-512.avif"));')
    begin='test("Falafel keeps its own dedicated 768px illustration", () => {'
    finish='test("Cacio e pepe has verified 4577px native master'
    assert tests.count(begin)==1 and tests.count(finish)==1
    a=tests.index(begin);b=tests.index(finish,a)
    section=tests[a:b]
    section=section.replace("Falafel keeps its own dedicated 768px illustration",
          "Falafel has a real native master and 512px original-photo thumbnail")
    section=section.replace('file: "falafel-768.avif"',
          'file: "falafel-thumb-512.avif"')
    assert section.count("assert.equal(bytes.readUInt32BE(marker + 8), 768);")==1
    assert section.count("assert.equal(bytes.readUInt32BE(marker + 12), 768);")==1
    section=section.replace("assert.equal(bytes.readUInt32BE(marker + 8), 768);",
                            "assert.equal(bytes.readUInt32BE(marker + 8), 512);")
    section=section.replace("assert.equal(bytes.readUInt32BE(marker + 12), 768);",
                            "assert.equal(bytes.readUInt32BE(marker + 12), 512);")
    section=section.replace("assert.match(gallery, /falafel med kikerter/u);",
      """assert.match(gallery, /falafel med kikerter/u);
  const photo=manifest.images[20];
  assert.equal(photo.kind, "Redaksjonelt rettfoto");
  assert.equal(photo.largeViewEnabled, true);
  assert.equal(photo.largeSource, "falafel-master-4284.avif");
  assert.equal(photo.largeSourceNativeWidth, 4284);
  assert.equal(photo.largeSourceNativeHeight, 5712);
  assert.match(photo.photoCredit, /Saya P.*Pexels/u);
  assert.match(photo.photoSource, /pexels\\.com\\/photo\\/delicious-falafel/u);
  assert.match(gallery, /href="\\/dish-images\\/falafel-master-4284\\.avif"/u);""")
    tests=tests[:a]+section+tests[b:]
    testfile.write_text(tests,encoding="utf8")
    quality=WEB/"tests/dish-image-large-view-quality.test.mjs"
    replace_once(quality,
      '    } else if (photo.id === "pizza-prosciutto") {',
      '''    } else if (photo.id === "falafel") {
      assert.equal(photo.catalogId,"falafel");
      assert.equal(photo.photoLicense,"https://www.pexels.com/license/");
      assert.equal(photo.photoLicenseNotice,"/dish-images/falafel-LICENSE.txt");
      assert.match(photo.photoCredit,/Saya P.*Pexels/u);
      const notice=readFileSync(path.join(imageRoot,"falafel-LICENSE.txt"),"utf8");
      assert.match(notice,/Fotograf: Saya P/u);
      assert.match(notice,/Pexels License/u);
    } else if (photo.id === "pizza-prosciutto") {''')

    candidate.update({"visual_review_completed":True,"approved_for_fysen":True,"published":False})
    candidate_path.write_text(json.dumps(candidate,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    audit.update({"reviewed_variant":variant,"reviewed_preview_sha256":reviewed_preview_sha,
         "original_processed_sha256":original_sha,"master_avif_sha256":large_sha,
         "visual_review_completed":True,"approved_for_fysen":True,"published":False})
    audit_path.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("FALAFEL draft: native 4284x5712, distinct 512x512, 20/44 preview-approved, main unchanged, no publish")

if __name__=="__main__":
    main()
