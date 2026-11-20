#!/usr/bin/env python3
"""Stage real native photographs of kebab-in-pita for editorial inspection.

Do not publish or mark any candidate approved. No AI-generated food, no upscaling,
no changes to the catalogue or to public assets.
"""
from __future__ import annotations
import hashlib, json
from io import BytesIO
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request,urlopen
from PIL import Image,ImageOps

ROOT=Path("assets/fysen-image-candidates/kebab-pita")
MAX_BYTES=35*1024*1024
SOURCES=[
 ("commons","Doner kebab shawarma pita.jpg","doner-kebab-shawarma-pita","Amin","CC BY-SA 4.0"),
 ("commons","Gyros pita.jpg","gyros-pita-budapest","Christo","CC BY-SA 4.0"),
 ("commons","An Arab kebab.jpg","arab-kebab-sandwich","License to verify","License to verify"),
 ("commons","Kebab-french-fries.jpg","kebab-fries","TGCGG","CC0 1.0"),
 ("commons","20120628 pita-kebap.jpg","pita-gyros","License to verify","CC BY-SA 3.0"),
 ("commons","Beef and Chicken Kebab and Pita.jpg","beef-chicken-kebab-pita","License to verify","CC BY-SA 4.0"),
 ("pexels",29306504,"doner-fresh-vegetables","Pexels, verify","Pexels License"),
 ("pexels",29306499,"doner-fries-drink","Pexels, verify","Pexels License"),
 ("pexels",29306496,"chicken-kebab-fries","Pexels, verify","Pexels License"),
 ("pexels",18330027,"doner-closeup","Valeria Boltneva","Pexels License"),
 ("pexels",18330009,"doner-meat-vegetables","Valeria Boltneva","Pexels License"),
 ("pexels",10839496,"pita-tacos-fries","Pexels, verify","Pexels License"),
 ("pexels",17429554,"pita-sandwich-juice","Jonathan Reynaga","Pexels License"),
 ("pexels",6419697,"jerusalem-mixed-grill","Polina Tankilevitch","Pexels License"),
 ("pexels",28897047,"shawarma-wraps-vegetables","ahmed kh. jami","Pexels License"),
 ("pexels",34318137,"beef-shawarma-wood-board","Bia Metidieri","Pexels License"),
 ("pexels",5779364,"shawarma-halved-closeup","RDNE Stock project","Pexels License"),
 ("pexels",6941000,"gyro-pita-with-fries","Pexels, verify","Pexels License"),
 ("pexels",5191848,"grilled-kebab-on-pita","Shameel mukkath","Pexels License"),

 ("wikimedia-upload","https://upload.wikimedia.org/wikipedia/commons/d/d8/Doener_auf_die_hand.JPG","commons-doner-hand","Mediatrotter / Raphael Markert","CC BY-SA 4.0"),
 ("wikimedia-upload","https://upload.wikimedia.org/wikipedia/commons/9/94/Doener_Kebab_%289682662957%29.jpg","commons-doner-plate","Lauren Travis","CC BY 2.0"),
 ("wikimedia-upload","https://upload.wikimedia.org/wikipedia/commons/c/c7/Bolsillo-Cordero.jpg","commons-lamb-pocket","Tamorlan","CC BY-SA 3.0"),
]
def download(kind,src):
    if kind=="commons":
        enc=quote(src.replace(" ","_"),safe="()")
        url="https://commons.wikimedia.org/wiki/Special:FilePath/"+enc
        page="https://commons.wikimedia.org/wiki/File:"+enc
    elif kind=="wikimedia-upload":
        url=src
        filename=src.rsplit("/",1)[-1]
        page="https://commons.wikimedia.org/wiki/File:"+filename
    else:
        url=f"https://images.pexels.com/photos/{src}/pexels-photo-{src}.jpeg"
        page=f"https://www.pexels.com/photo/{src}/"
    req=Request(url,headers={"User-Agent":"FysenPhotoReview/1.0 (GitHub: Paradispartiet/fysen; educational editorial photo evaluation)","Accept":"image/jpeg,image/png,*/*"})
    with urlopen(req,timeout=65) as res:
        raw=res.read(MAX_BYTES+1)
        resolved=res.url
        ct=res.headers.get("Content-Type","")
    if len(raw)>MAX_BYTES or not ct.lower().startswith("image/"):
        raise ValueError(f"Not a valid <= {MAX_BYTES} byte photo: {ct}")
    with Image.open(BytesIO(raw)) as im:
        im.load()
        img=ImageOps.exif_transpose(im).convert("RGB")
    return raw,img,page,resolved
def stage(kind,src,slug,author,license):
    if (ROOT/slug/"review.json").exists():
        print("PREVIOUSLY STAGED",slug,"already available; no refetch")
        return
    raw,img,page,resolved=download(kind,src)
    w,h=img.size
    if min(w,h)<1800: raise ValueError(f"Native size {w}x{h} below required 1800px")
    target=ROOT/slug
    target.mkdir(parents=True,exist_ok=True)
    (target/"native-source.bytes").write_bytes(raw)
    preview=img.copy()
    preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(target/"preview.jpg",quality=90,optimize=True)
    cx,cy=w//2,h//2
    img.crop((cx-700,cy-700,cx+700,cy+700)).save(target/"native-detail-1400.jpg",quality=91,optimize=True)
    data={
      "dish_id":"kebab-pita",
      "slug":slug,"source_kind":kind,"source_file":src,
      "source_page":page,"source_download_url":resolved,
      "author_claim":author,"license_claim":license,
      "native_width":w,"native_height":h,
      "source_sha256":hashlib.sha256(raw).hexdigest(),
      "source_verified":True,"photographer_verified":False,"license_verified":False,
      "visual_review_completed":False,"approved_for_fysen":False,"published":False,
      "reject_if":"Not a single stuffed pita / no identifiable kebab meat / wrong variant, cut-off pita, blurry native detail, intrusive hands, cannot isolate a natural whole serving on black."
    }
    (target/"review.json").write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(f"STAGED {slug} {w}x{h}, SHA256={data['source_sha256']}; NOT APPROVED")
def main():
    count=0
    for row in SOURCES:
        if row[0]=="commons":
            print("SKIP Wikimedia until existing HTTP 429 rate limit clears:",row[2]);continue
        try: stage(*row);count+=1
        except Exception as error:
            print("REJECTED",row[2],type(error).__name__,str(error))
    if count<2: raise SystemExit(f"Only {count} sources retrieved; at least two required")
    print(f"{count} original photos saved to 7-day Actions artifact for visual inspection, none approved")
if __name__=="__main__":main()
