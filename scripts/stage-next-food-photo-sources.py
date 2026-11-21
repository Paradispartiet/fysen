#!/usr/bin/env python3
"""Stage authentic food-photo originals for GREEN CURRY and BÁNH MÌ review ONLY.

No approved image, published gallery assets, restaurant catalog, or prices change.
Never describe a variant as verified based solely on photo filename or search text.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen
import json
import time
from PIL import Image, ImageOps

ROOT = Path("assets/fysen-image-candidates")
SOURCES = [
    dict(dish="green-curry", slug="max-griss-chicken-pexels",
         url="https://images.pexels.com/photos/38906797/pexels-photo-38906797.jpeg",
         page="https://www.pexels.com/photo/delicious-thai-green-curry-with-chicken-38906797/",
         photographer="Max Griss / Pexels", license="https://www.pexels.com/license/",
         size=(3017,3771), variant="Thai green curry with chicken",
         caution="Verify that chicken, green curry and an entire suitable bowl are visible. Reject a close-up if food or bowl is cropped."),
    dict(dish="banh-mi", slug="theodore-nguyen-meat-pexels",
         url="https://images.pexels.com/photos/26619988/pexels-photo-26619988.jpeg",
         page="https://www.pexels.com/photo/a-sandwich-with-meat-and-vegetables-on-top-of-a-paper-bag-26619988/",
         photographer="Theodore Nguyen / Pexels", license="https://www.pexels.com/license/",
         size=(4000,6000), variant="Vietnamese bánh mì with meat and vegetables",
         caution="Confirm whole baguette and actual filling; do not claim pork, pâté or chili without visually verifying."),
    dict(dish="banh-mi", slug="hau-mai-banh-mi-pexels",
         url="https://images.pexels.com/photos/32961648/pexels-photo-32961648.jpeg",
         page="https://www.pexels.com/photo/vibrant-vietnamese-banh-mi-sandwich-close-up-32961648/",
         photographer="Hậu Mai / Pexels", license="https://www.pexels.com/license/",
         size=(6000,4000), variant="Vietnamese bánh mì with vegetables",
         caution="Check meat and pâté against exact dish description. Do not use if the baguette is cropped or contents ambiguous."),
    dict(dish="banh-mi", slug="andy-li-special-baguette-cc0",
         url="https://upload.wikimedia.org/wikipedia/commons/8/89/Special_Baguette_%28B%C3%A1nh_m%C3%AC%29_-_Banh_Mi_Ancient_Saigon_2024-12-20.jpg",
         page="https://commons.wikimedia.org/wiki/File:Special_Baguette_(B%C3%A1nh_m%C3%AC)_-_Banh_Mi_Ancient_Saigon_2024-12-20.jpg",
         photographer="Andy Li / Wikimedia Commons", license="https://creativecommons.org/publicdomain/zero/1.0/",
         size=(8160,6144), variant="Bánh mì with pork belly, pork roll and pâté",
         caution="CC0 restaurant-origin photo: isolate the baguette only, excluding drinks, table, people and wrappers where possible. Never imply it is served by a Fysen-listed restaurant."),
    dict(dish="banh-mi", slug="hau-mai-newspaper-single-pexels",
         url="https://images.pexels.com/photos/32961651/pexels-photo-32961651.jpeg",
         page="https://www.pexels.com/photo/traditional-vietnamese-banh-mi-on-newspaper-32961651/",
         photographer="Hậu Mai / Pexels", license="https://www.pexels.com/license/",
         size=(3519,5279), variant="Vietnamese bánh mì with herbs, on newspaper",
         caution="Find ONE complete baguette. Reject if paper intersects the bread, bread ends are cut or ingredients cannot be identified."),
    dict(dish="banh-mi", slug="hau-mai-newspaper-food-pexels",
         url="https://images.pexels.com/photos/32961654/pexels-photo-32961654.jpeg",
         page="https://www.pexels.com/photo/delicious-vietnamese-banh-mi-sandwich-on-newspaper-32961654/",
         photographer="Hậu Mai / Pexels", license="https://www.pexels.com/license/",
         size=(5491,3661), variant="Vietnamese bánh mì with fresh ingredients, on newspaper",
         caution="Require one complete baguette with visible meat and pickles. Reject if photo is clipped or surrounding objects cannot be excluded."),
    dict(dish="banh-mi", slug="robby-mccullough-paper-pexels",
         url="https://images.pexels.com/photos/36156594/pexels-photo-36156594.jpeg",
         page="https://www.pexels.com/photo/fresh-vietnamese-banh-mi-sandwich-close-up-36156594/",
         photographer="Robby McCullough / Pexels", license="https://www.pexels.com/license/",
         size=(3237,2560), variant="Vietnamese bánh mì sandwich with fresh ingredients",
         caution="Full baguette required with clean outline and no paper crossing the visible food; reject if partly out of frame."),
]
def download(url):
    req=Request(url,headers={
        "User-Agent":"FysenEditorialReview/1.0 (https://github.com/Paradispartiet/fysen)",
        "Accept":"image/jpeg,image/*;q=0.8"})
    for attempt in range(3):
        try:
            with urlopen(req,timeout=75) as response:
                typ=response.headers.get("Content-Type","")
                raw=response.read(42*1024*1024+1)
            assert typ.startswith("image/"),f"Non-image content: {typ}"
            assert 0<len(raw)<=42*1024*1024, "Missing or oversized source"
            return raw
        except (HTTPError,TimeoutError) as exc:
            if attempt==2 or isinstance(exc,HTTPError) and exc.code not in (429,500,502,503,504):
                raise
            time.sleep((attempt+1)*3)
    raise RuntimeError("Original unavailable")
def stage(item):
    raw=download(item["url"])
    with Image.open(BytesIO(raw)) as image:
        image.load()
        native=ImageOps.exif_transpose(image).convert("RGB")
    w,h=native.size
    assert (w,h)==item["size"],f"Original size drift: {(w,h)} vs {item['size']}"
    assert min(w,h)>=1600, "Insufficient native detail"
    out=ROOT/item["dish"]/item["slug"]
    out.mkdir(parents=True,exist_ok=True)
    (out/"source.jpeg").write_bytes(raw)
    preview=native.copy()
    preview.thumbnail((1100,1100),Image.Resampling.LANCZOS)
    preview.save(out/"preview.jpg",quality=90,optimize=True)
    x0=(w-1400)//2;y0=(h-1400)//2
    native.crop((x0,y0,x0+1400,y0+1400)).save(
        out/"native-detail-1400.jpg",quality=93,optimize=True)
    review=dict(
        dish_id=item["dish"],catalog_id=item["dish"],
        photo_page=item["page"],original_url=item["url"],
        photographer=item["photographer"],photo_license=item["license"],
        claimed_variant=item["variant"],review_caution=item["caution"],
        native_width=w,native_height=h,original_sha256=sha256(raw).hexdigest(),
        source_download_verified=True,no_upscale=True,
        visual_review_completed=False,approved_for_fysen=False,published=False,
        quality_gate="Whole clearly identifiable single dish; original-native 1400px detail; no false ingredient/variant claims. Isolated full dish on genuine black background without synthetic food, objects or zoomed cropping. Licenses and source credit documented. No restaurant menu/price mapping.")
    (out/"review.json").write_text(
        json.dumps(review,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("STAGED",item["dish"],item["slug"],f"{w}x{h}",
          "sha256="+review["original_sha256"],"APPROVED=NO PUBLISHED=NO",flush=True)
if __name__=="__main__":
    counts={"green-curry":0,"banh-mi":0}
    for item in SOURCES:
        try:
            stage(item);counts[item["dish"]]+=1
        except Exception as exc:
            print("SOURCE_REJECTED",item["dish"],item["slug"],type(exc).__name__,str(exc),flush=True)
    assert all(counts.values()),f"At least one authentic original required per dish: {counts}"
    print("STAGED_UNAPPROVED",counts,"NO gallery changes",flush=True)
