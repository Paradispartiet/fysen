#!/usr/bin/env python3
"""Integrate only the image visually approved in the existing Fysen PR.

The source bytes are SHA-locked and reused from the existing GitHub Actions
artifact. A fresh preview MUST byte-match the committed, visually reviewed
preview before any full-size AVIF is integrated. No production deploy.
"""
from __future__ import annotations
from hashlib import sha256
from pathlib import Path
import json, runpy, shutil
from PIL import Image, ImageOps
import pillow_avif  # noqa: F401; AVIF codec

ROOT=Path(__file__).resolve().parents[1]
CANDIDATE=ROOT/"assets/fysen-image-candidates/pizza-prosciutto/commons/parma-ham-pizza-bangkok"
PUBLIC=ROOT/"apps/web/public/dish-images"
WEB=ROOT/"apps/web"
ORIGINAL_SHA="073df3775ede40db4cffb30413023f5ae5616d28f6e68ee8317ec95ed76b8efc"
SOURCE_PAGE="https://commons.wikimedia.org/wiki/File:Parma_ham_pizza_Prosciutto_crudo_laliva_restaurant_bangkok.jpg"
LICENSE="https://creativecommons.org/licenses/by-sa/4.0/"
def digest(path:Path):
    return sha256(path.read_bytes()).hexdigest()
def patch(path:Path,old:str,new:str):
    t=path.read_text(encoding="utf8")
    assert t.count(old)==1,f"Missing/duplicate unique anchor {path}: {old[:65]}"
    path.write_text(t.replace(old,new,1),encoding="utf8")

def main():
    src=json.loads((CANDIDATE/"review.json").read_text(encoding="utf8"))
    black=json.loads((CANDIDATE/"black-alternatives-review.json").read_text(encoding="utf8"))
    assert src["source_sha256"]==ORIGINAL_SHA
    assert src["license_verified"] is True and src["photographer_verified"] is True
    assert src["approved_for_fysen"] is False and src["published"] is False
    assert black["original_sha256"]==ORIGINAL_SHA
    assert black["original_dimensions"]==[3949,2920]
    assert black["approved_for_fysen"] is False and black["published"] is False
    assert black["food_pixels_upscaled"] is False and black["synthetic_food_generated"] is False
    # The approved preview on the branch is the identity of the image reviewed.
    preview=CANDIDATE/"black-grabcut-preview.jpg"
    locked_preview_sha=digest(preview)
    runpy.run_path(str(ROOT/"scripts/preview-prosciutto-commons-black.py"),run_name="__main__")
    assert digest(preview)==locked_preview_sha,"Regenerated photo differs from the visually reviewed preview"
    native=CANDIDATE/"black-grabcut-native-master.png"
    native_sha=digest(native)
    archive=ROOT/"assets/fysen-dish-originals/pizza-prosciutto.png"
    master=PUBLIC/"pizza-prosciutto-master-3949.avif"
    thumb=PUBLIC/"pizza-prosciutto-thumb-512.avif"
    notice=PUBLIC/"pizza-prosciutto-LICENSE.txt"
    for p in (archive,master,thumb,notice):
        assert not p.exists(),f"Never overwrite an audited asset: {p}"
    with Image.open(native) as im:
        im.load()
        assert im.mode=="RGB" and im.size==(3949,2920)
        assert all(im.getpixel(point)==(0,0,0) for point in [(0,0),(3948,0),(0,2919),(3948,2919)])
        im.save(master,format="AVIF",quality=89,speed=5)
        ImageOps.pad(im,(512,512),method=Image.Resampling.LANCZOS,color=(0,0,0)).save(
            thumb,format="AVIF",quality=86,speed=5)
    shutil.copyfile(native,archive)
    assert digest(archive)==native_sha
    master_sha=digest(master)
    manifest=PUBLIC/"manifest.json"
    entries=json.loads(manifest.read_text(encoding="utf8"))
    photo=next(x for x in entries["images"] if x["id"]=="pizza-prosciutto")
    assert photo["atlas"]=="pizza-prosciutto-768.avif" and photo["catalogId"] is None
    assert not photo.get("largeSource") and not photo.get("largeViewEnabled")
    assert sum(x.get("largeViewEnabled",False) for x in entries["images"])==10
    photo.update({
      "atlas":thumb.name,
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":"Lisensiert redaksjonelt foto av prosciutto crudo-pizza med burrata, ruccola og små tomater, fotografert i Bangkok. Ikke et faktisk Fysen-restaurantfoto eller garanti for en bestemt menyrett; denne foto-varianten er ikke nødvendigvis den samme som restaurantens prosciuttopizza.",
      "largeSourceOriginalPath":"assets/fysen-dish-originals/pizza-prosciutto.png",
      "largeSource":master.name,
      "largeSourceNativeWidth":3949,"largeSourceNativeHeight":2920,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":master_sha,
      "largeSourceOriginalSha256":native_sha,
      "largeSourceReview":"docs/fysen-image-reviews/pizza-prosciutto.md",
      "largeViewEnabled":True,
      "photoCredit":"Amin / Wikimedia Commons, CC BY-SA 4.0 (bearbeidet)",
      "photoSource":SOURCE_PAGE,
      "photoLicense":LICENSE,
      "photoLicenseNotice":"/dish-images/pizza-prosciutto-LICENSE.txt"
    })
    manifest.write_text(json.dumps(entries,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    notice.write_text(
       "Pizza med prosciutto crudo – redaksjonelt foto\n"
       "Foto: Amin / Wikimedia Commons\n"
       "Original: "+SOURCE_PAGE+"\n"
       "Lisens for original og denne bearbeidelsen: CC BY-SA 4.0, "+LICENSE+"\n"
       "Endringer: Original JPEG 3949 x 2920, beskjært ved å isolere pizzaen mot svart bakgrunn med en kontrollert GrabCut-/konturmaske. Ingen endringer i matens originale bildepiksler, ingen KI-generering, ingen oppskalering. Egen AVIF i kildens oppløsning og separat 512 x 512 AVIF-miniatyr.\n"
       "Bildet viser en pizza på La Liva i Bangkok og er kun representativt for rettetypen, ikke dokumentasjon for noen restaurant eller meny i Fysen.\n"
       "Kildeoriginal SHA-256: "+ORIGINAL_SHA+"\n"
       "Bearbeidet PNG SHA-256: "+native_sha+"\n"
       "Bearbeidede foto/AVIF-filer distribueres på samme CC BY-SA 4.0-vilkår.\n",
       encoding="utf8"
    )
    review=ROOT/"docs/fysen-image-reviews/pizza-prosciutto.md"
    assert review.exists()
    with Image.open(thumb) as img: assert img.size==(512,512)
    with Image.open(master) as img: assert img.size==(3949,2920)
    review.write_text(
      "# Pizza prosciutto – fullstørrelses foto (19. november 2026)\n\n"
      "**Beslutning:** Godkjent redaksjonelt foto av retten, ikke restaurantmenybilde. Representativ variant med burrata og tomater; ikke den generiske mozzarella-/ruccola-varianten.\n\n"
      "- Fotograf: Amin / Wikimedia Commons. Kilde: "+SOURCE_PAGE+"\n"
      "- CC BY-SA 4.0: "+LICENSE+"; kilde og bearbeidelse krediteres i offentlig lisensnotis.\n"
      "- Original: 3949 × 2920 JPEG, SHA-256 "+ORIGINAL_SHA+"\n"
      "- Bildet er manuelt vurdert: hele pizzaen er synlig, naturlig skarp i faktisk 1400 × 1400 originalutnitt, helsvart bakgrunn uten trebrett. Kun alfamasken er endret, ingen generativ mat eller oppskalering.\n"
      "- Produsert stor AVIF i 3949 × 2920 og egen 512 × 512 AVIF-miniatyr. PNG-master bevart utenfor offentlig katalog.\n"
      "- Ikke offentlig Vercel-utplassert; mobil-/iPad-kontroll skjer ved en separat publisering.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n\n"
      "Retained reviewed PNG SHA-256: "+native_sha+"\n"
      "Matched reviewed preview SHA-256: "+locked_preview_sha+"\n",
      encoding="utf8"
    )
    css=WEB/"styles/dish-photos.css"
    patch(css,
      '.dishPhotoThumb.dishPhotoProsciutto { background: #000 url("/dish-images/pizza-prosciutto-768.avif") center / cover no-repeat; }',
      '.dishPhotoThumb.dishPhotoProsciutto { background: #000 url("/dish-images/pizza-prosciutto-thumb-512.avif") center / contain no-repeat; }')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    patch(gallery,
      '          <a href="/dish-images/pasta-carbonara-master-2600.avif" target="_blank" rel="noopener noreferrer">',
      '          <a href="/dish-images/pizza-prosciutto-master-3949.avif" target="_blank" rel="noopener noreferrer">\n'
      '            Pizza med prosciutto <span aria-hidden="true">↗</span>\n'
      '          </a>\n'
      '          <small>Prosciutto-foto: Amin, <a href="/dish-images/pizza-prosciutto-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0 (bearbeidet, kilde og lisens)</a>.</small>\n'
      '          <a href="/dish-images/pasta-carbonara-master-2600.avif" target="_blank" rel="noopener noreferrer>')
    test=WEB/"tests/dish-photo-gallery.test.mjs"
    t=test.read_text(encoding="utf8")
    assert 'approved.length, 10' in t
    t=t.replace("approved.length, 10","approved.length, 11",1)
    t=t.replace("ramen, bolognese, carbonara and butter chicken", "ramen, bolognese, prosciutto, carbonara and butter chicken",1)
    t=t.replace("pizza-prosciutto-768.avif","pizza-prosciutto-thumb-512.avif")
    t=t.replace("[0,1,2,3,4,5,6,7,10,11].includes(index)","[0,1,2,3,4,5,6,7,8,10,11].includes(index)",1)
    t=t.replace("entry.index === 7 ? 512 : 768","[7,8].includes(entry.index) ? 512 : 768")
    t=t.replace("Bolognese, prosciutto and kebab have distinct correctly sized gallery AVIF images",
                "Bolognese, prosciutto and kebab retain distinct correctly sized gallery AVIF images",1)
    test.write_text(t,encoding="utf8")
    quality=WEB/"tests/dish-image-large-view-quality.test.mjs"
    t=quality.read_text(encoding="utf8")
    marker='    } else {\n      assert.match(photo.photoSource, /^https:\\/\\/www\\.pexels\\.com\\/photo\\//u);'
    assert marker in t
    patch(quality,marker,
      '    } else if (photo.id === "pizza-prosciutto") {\n'
      '      assert.match(photo.photoSource, /^https:\\/\\/commons\\.wikimedia\\.org\\/wiki\\/File:/u);\n'
      '      assert.match(photo.photoCredit, /Amin.*CC BY-SA 4\\.0/u);\n'
      '      assert.equal(photo.photoLicense, "https://creativecommons.org/licenses/by-sa/4.0/");\n'
      '      assert.equal(photo.photoLicenseNotice, "/dish-images/pizza-prosciutto-LICENSE.txt");\n'
      '      const notice = readFileSync(path.join(imageRoot, "pizza-prosciutto-LICENSE.txt"), "utf8");\n'
      '      assert.match(notice, /Foto: Amin/u);\n'
      '      assert.match(notice, /CC BY-SA 4\\.0/u);\n'
      +marker)
    black["visual_review_completed"]=True
    black["approved_for_fysen"]=True
    black["published"]=False
    black["full_avif_sha256"]=master_sha
    black["retained_native_sha256"]=native_sha
    black["matched_preview_sha256"]=locked_preview_sha
    (CANDIDATE/"black-alternatives-review.json").write_text(
      json.dumps(black,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    src["visual_review_completed"]=True
    src["approved_for_fysen"]=True
    src["published"]=False
    (CANDIDATE/"review.json").write_text(
      json.dumps(src,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("PROMOTED image #11: source-locked authentic prosciutto 3949x2920 + 512 mini to PR only, NO PUBLIC DEPLOY")

if __name__=="__main__":
    main()
