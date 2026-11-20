#!/usr/bin/env python3
"""Prepare a SHA-locked native Tom yum photo for the DRAFT Fysen image PR.

No restaurant/menu claims, no new food pixels, no upscaling and no deployment.
"""
from __future__ import annotations
import hashlib,json
from pathlib import Path
import cv2,numpy as np
from PIL import Image,ImageOps
import pillow_avif

ROOT=Path(__file__).resolve().parents[1]
WEB=ROOT/"apps/web"
PUBLIC=WEB/"public/dish-images"
SOURCE=Path("/tmp/fysen-tom-yum-originals/34699478/source.jpeg")
EVIDENCE=ROOT/"assets/fysen-image-candidates/tom-yum/34699478/review.json"
SRC_SHA="9379a3c633b7024a865bbdba9c03220a854d20af0ff491500455426603bf6203"
PAGE="https://www.pexels.com/photo/delicious-tom-yum-goong-soup-on-rustic-table-34699478/"
LICENSE="https://www.pexels.com/license/"
SIDE=3334

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def patch(path,old,new):
    p=Path(path);s=p.read_text(encoding="utf8")
    if s.count(old)!=1:raise AssertionError(f"Expected one instance in {path}: {old[:70]}")
    p.write_text(s.replace(old,new,1),encoding="utf8")

def generate():
    evidence=json.loads(EVIDENCE.read_text())
    assert evidence["source_photo_id"]==34699478 and evidence["dish_id"]=="tom-yum"
    assert evidence["original_dimensions"]==[3648,5472] and evidence["original_sha256"]==SRC_SHA
    assert evidence["approved_for_fysen"] is False and evidence["published"] is False
    assert sha(SOURCE)==SRC_SHA
    with Image.open(SOURCE) as im:
        im.load();src=ImageOps.exif_transpose(im).convert("RGB")
    assert src.size==(3648,5472)
    sm=src.resize((733,1100),Image.Resampling.LANCZOS)
    yy,xx=np.mgrid[:1100,:733].astype(np.float32)
    dist=((xx-370)/268)**2+((yy-681)/269)**2
    gc=np.full((1100,733),cv2.GC_BGD,np.uint8)
    gc[dist<1.09**2]=cv2.GC_PR_BGD
    gc[dist<1.02**2]=cv2.GC_PR_FGD
    gc[dist<0.82**2]=cv2.GC_FGD
    bg=np.zeros((1,65),np.float64);fg=np.zeros((1,65),np.float64)
    cv2.grabCut(cv2.cvtColor(np.asarray(sm),cv2.COLOR_RGB2BGR),gc,None,bg,fg,7,cv2.GC_INIT_WITH_MASK)
    raw=np.where((gc==cv2.GC_FGD)|(gc==cv2.GC_PR_FGD),255,0).astype(np.uint8)
    c,_=cv2.findContours(raw,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
    assert c
    mask=np.zeros((1100,733),np.uint8)
    cv2.drawContours(mask,[max(c,key=cv2.contourArea)],-1,255,-1)
    assert .22<mask.mean()/255<.33
    mask=cv2.GaussianBlur(mask,(0,0),0.7)
    alpha=Image.fromarray(mask,"L").resize(src.size,Image.Resampling.BICUBIC)
    cx=round(370*src.width/733);cy=round(681*src.height/1100)
    side=round(670*src.width/733)
    assert side==SIDE
    box=(cx-side//2,cy-side//2,cx-side//2+side,cy-side//2+side)
    img=Image.composite(src.crop(box),Image.new("RGB",(side,side),"black"),alpha.crop(box))
    assert all(img.getpixel(p)==(0,0,0) for p in ((0,0),(SIDE-1,0),(0,SIDE-1),(SIDE-1,SIDE-1)))
    png=ROOT/"assets/fysen-dish-originals/tom-yum.png"
    master=PUBLIC/"tom-yum-master-3334.avif"
    mini=PUBLIC/"tom-yum-thumb-512.avif"
    assert not png.exists() and not master.exists() and not mini.exists()
    png.parent.mkdir(parents=True,exist_ok=True)
    img.save(png,compress_level=3)
    img.save(master,format="AVIF",quality=89,speed=5)
    img.resize((512,512),Image.Resampling.LANCZOS).save(mini,format="AVIF",quality=86,speed=5)
    img.resize((900,900),Image.Resampling.LANCZOS).save(
      ROOT/"assets/fysen-image-candidates/tom-yum/34699478/black-preview.jpg",quality=91,optimize=True)
    return sha(png),sha(master)

def integrate(png_sha,master_sha):
    p=PUBLIC/"manifest.json"
    data=json.loads(p.read_text(encoding="utf8"))
    assert len(data["images"])==44 and sum(x.get("largeViewEnabled") is True for x in data["images"])==15
    x=data["images"][33]
    assert x["id"]=="tom-yum" and x["catalogId"]=="tom-yum" and x["atlas"]=="tom-yum-512.avif"
    assert not x.get("largeViewEnabled")
    x.update({
      "atlas":"tom-yum-thumb-512.avif",
      "kind":"Redaksjonelt rettfoto",
      "variantCaution":"Representativt redaksjonelt foto av tom yum goong med reker, sopp og koriander i en hel keramisk skål. Ikke restaurantfoto eller dokumentasjon av en konkret Fysen-meny. Ikke bruk for kylling eller vegetarisk tom yum.",
      "largeSourceOriginalPath":"assets/fysen-dish-originals/tom-yum.png",
      "largeSource":"tom-yum-master-3334.avif",
      "largeSourceNativeWidth":3334,
      "largeSourceNativeHeight":3334,
      "largeSourceMethod":"independent-original",
      "largeSourceSha256":master_sha,
      "largeSourceOriginalSha256":png_sha,
      "largeSourceReview":"docs/fysen-image-reviews/tom-yum.md",
      "largeViewEnabled":True,
      "photoCredit":"UNDO KIM / Pexels (bearbeidet)",
      "photoSource":PAGE,
      "photoLicense":LICENSE,
      "photoLicenseNotice":"/dish-images/tom-yum-LICENSE.txt"
    })
    p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    (PUBLIC/"tom-yum-LICENSE.txt").write_text(
      "Tom yum med reker – redaksjonelt foto\nFotograf: UNDO KIM / Pexels\n"
      f"Original: {PAGE}\nLisens: Pexels License, {LICENSE}\n"
      "Bearbeidelse: 3648 × 5472 original JPEG, kvadratisk 3334 × 3334 utsnitt i ekte kildepiksler. Hele skålen med reker, sopp og koriander beholdes, mens bord, duk og skje isoleres bort til svart bakgrunn med en kontrollert alfamaske. Ingen oppskalering, kunstige ingredienser eller endrede matpiksler. Separat AVIF master og 512px AVIF mini.\n"
      "Dette dokumenterer ingen konkret restaurants servering i Fysen.\n"
      f"Fotokilde JPEG SHA-256: {SRC_SHA}\nBearbeidet PNG SHA-256: {png_sha}\n",
      encoding="utf8")
    review=ROOT/"docs/fysen-image-reviews/tom-yum.md"
    assert not review.exists()
    review.write_text(
      "# Tom yum – ekte foto med svart bakgrunn, 20.11.2026\n\n"
      f"- Fotograf: UNDO KIM / Pexels. Kilde: {PAGE}\n"
      f"- Lisens: {LICENSE}. Kreditering og endringer dokumentert i tom-yum-LICENSE.txt.\n"
      f"- Ekte original JPEG 3648 × 5472; SHA-256 {SRC_SHA}\n"
      f"- Ekte full-native kvadratutsnitt 3334 × 3334 PNG; SHA-256 {png_sha}\n"
      f"- AVIF SHA-256 {master_sha}; egen 512px miniatyr.\n"
      "- Visuelt vurdert: hele skålen, synlige reker, soppskiver og koriander; skarpt 1:1 utsnitt, svart bakgrunn uten bord/duk/skje.\n"
      "- Oppdelte bildeatlas og oppskalering er ikke brukt. Bare alfamasken er interpolert, matens originalpiksler bevart.\n"
      "- Kun den eksakte rett-ID-en tom-yum. Aldri en påstand om et faktisk restaurantfoto.\n"
      "- Status: draft-PR, ikke produksjonspublisert; mobil-/iPad-verifikasjon kreves etter eventuell release.\n\n"
      "Reviewed for full-size display: yes\n"
      "No collage crop or upscale: yes\n"
      "Correct dish and black background: yes\n",encoding="utf8")
    patch(WEB/"styles/dish-photos.css",
      'background: #000 url("/dish-images/tom-yum-512.avif") center / cover no-repeat;',
      'background: #000 url("/dish-images/tom-yum-thumb-512.avif") center / contain no-repeat;')
    patch(WEB/"styles/home-discovery-refresh.css",
      'background: #000 url("/dish-images/tom-yum-512.avif") center / cover no-repeat;',
      'background: #000 url("/dish-images/tom-yum-thumb-512.avif") center / contain no-repeat;')
    gallery=WEB/"components/dish-photo-gallery.tsx"
    patch(gallery,'aria-label="KI-illustrasjon av tom yum med reker, ikke restaurantfoto"',
      'aria-label="Redaksjonelt foto av tom yum med reker og sopp, ikke restaurantfoto"')
    patch(gallery,
      ': isPizzaMarinara ? "Redaksjonelt foto av pizza marinara uten ost, ikke restaurantfoto" :',
      ': isPizzaMarinara ? "Redaksjonelt foto av pizza marinara uten ost, ikke restaurantfoto" : isTomYum ? "Redaksjonelt foto av tom yum med reker, sopp og koriander, ikke restaurantfoto" :')
    anchor='          <small>Pizza marinara-foto: Peter Van den Bossche / Wikimedia Commons, <a href="/dish-images/pizza-marinara-LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-SA 2.0 og kilde</a>.</small>'
    patch(gallery,anchor,anchor+'\n'
      '          <a href="/dish-images/tom-yum-master-3334.avif" target="_blank" rel="noopener noreferrer">\n'
      '            Tom yum med reker <span aria-hidden="true">↗</span>\n'
      '          </a>\n'
      '          <small>Tom yum-foto: UNDO KIM / Pexels, <a href="/dish-images/tom-yum-LICENSE.txt" target="_blank" rel="noopener noreferrer">lisens og kilde</a>.</small>')
    tests=WEB/"tests/dish-photo-gallery.test.mjs"
    t=tests.read_text(encoding="utf8")
    assert t.count("approved.length, 15")==1
    t=t.replace("approved.length, 15","approved.length, 16",1)
    t=t.replace("tiramisu and pizza marinara need approved full-size masters",
                "tiramisu, pizza marinara and tom yum need approved full-size masters",1)
    t=t.replace("tom-yum-512.avif","tom-yum-thumb-512.avif")
    t=t.replace("tom-yum-512\\.avif","tom-yum-thumb-512\\.avif")
    needle="[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15].includes(index)"
    assert t.count(needle)==1
    t=t.replace(needle,"[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,33].includes(index)",1)
    tests.write_text(t,encoding="utf8")
    assert (PUBLIC/"tom-yum-512.avif").is_file(), "Existing thumbnail must be kept for rollback"
    print("DRAFT 16/44 full-size images; no database, menu, merge, or deployment.")

if __name__=="__main__":
    a,b=generate()
    integrate(a,b)
