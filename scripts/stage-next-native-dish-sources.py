#!/usr/bin/env python3
"""Acquire three pre-researched licensed native photos; no approval or runtime edits."""
import hashlib, io, json
from pathlib import Path
from urllib.parse import quote, urlparse
from urllib.request import Request, urlopen
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
SOURCES=json.loads("[{\"id\":\"biryani\",\"filename\":\"Chicken_Biryani_in_plate.jpg\",\"photographer\":\"Chinchu.c\",\"size\":[4000,3000],\"license\":\"CC BY-SA 4.0\",\"license_url\":\"https://creativecommons.org/licenses/by-sa/4.0/\",\"variant\":\"Chicken biryani\"},{\"id\":\"hummus\",\"filename\":\"Hummus_dish_on_a_plate.jpg\",\"photographer\":\"Bykim2012\",\"size\":[4032,3024],\"license\":\"CC0 1.0\",\"license_url\":\"https://creativecommons.org/publicdomain/zero/1.0/\",\"variant\":\"Hummus\"},{\"id\":\"shawarma\",\"filename\":\"Chicken_Shawarma_Roll.jpg\",\"photographer\":\"Sannidhishetty\",\"size\":[3072,4080],\"license\":\"CC BY-SA 4.0\",\"license_url\":\"https://creativecommons.org/licenses/by-sa/4.0/\",\"variant\":\"Indian chicken shawarma roll; check compatibility with article\"}]")
MAX_BYTES=30*1024*1024
def stage(row):
    filename=row["filename"]
    md5=hashlib.md5(filename.encode(),usedforsecurity=False).hexdigest()
    url=f"https://upload.wikimedia.org/wikipedia/commons/{md5[0]}/{md5[:2]}/{quote(filename)}"
    page="https://commons.wikimedia.org/wiki/File:"+quote(filename)
    out=ROOT/"assets/fysen-image-candidates"/row["id"]/"licensed-native-20261128"
    if out.exists(): raise RuntimeError(f"Existing candidate must not be overwritten: {out}")
    with urlopen(Request(url,headers={"User-Agent":"FysenEditorialImageReview/1.0 (https://github.com/Paradispartiet/fysen)"}),timeout=45) as response:
        assert urlparse(response.geturl()).hostname=="upload.wikimedia.org"
        assert response.headers.get("Content-Type","").lower().startswith("image/jpeg")
        data=response.read(MAX_BYTES+1)
    assert len(data)<=MAX_BYTES and data.startswith(b"\xff\xd8\xff")
    im=Image.open(io.BytesIO(data));im.load()
    assert list(im.size)==row["size"], (row["id"],im.size)
    assert min(im.size)>=1600
    out.mkdir(parents=True)
    (out/"source.jpg").write_bytes(data)
    preview=im.convert("RGB");preview.thumbnail((1000,1000),Image.Resampling.LANCZOS)
    preview.save(out/"source-preview.jpg",quality=94)
    (out/"review.json").write_text(json.dumps({**row,"source_page":page,"original_url":url,"source_sha256":hashlib.sha256(data).hexdigest(),"visual_review_completed":False,"approved_for_fysen":False,"published":False},indent=2)+"\n")
    print("STAGED",row["id"],im.size)
if __name__=="__main__":
    completed=0
    for row in SOURCES:
        try: stage(row);completed+=1
        except Exception as exc:print("BLOCKED",row["id"],str(exc))
    if not completed:raise SystemExit("No eligible originals acquired")
