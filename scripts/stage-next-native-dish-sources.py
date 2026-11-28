#!/usr/bin/env python3
"""Acquire three pre-researched licensed native photos; no approval or runtime edits."""
import hashlib, io, json
from pathlib import Path
from urllib.parse import quote, urlparse
from urllib.request import Request, urlopen
from PIL import Image, ImageDraw, ImageFilter, ImageChops
ROOT=Path(__file__).resolve().parents[1]
SOURCES=json.loads("[{\"id\":\"hummus\",\"filename\":\"صحن_حمص.JPG\",\"photographer\":\"Sheam k\",\"size\":[3072,2304],\"license\":\"CC BY-SA 3.0\",\"license_url\":\"https://creativecommons.org/licenses/by-sa/3.0/\",\"variant\":\"Hummus with olive oil and chickpeas\",\"slot\":\"alternative-sheam-k\"},{\"id\":\"shawarma\",\"filename\":\"Handmade_Chicken_Shawarma_Wrap_-_Lavash.jpg\",\"photographer\":\"Andy Li\",\"size\":[4032,3024],\"license\":\"CC0 1.0\",\"license_url\":\"https://creativecommons.org/publicdomain/zero/1.0/\",\"variant\":\"Chicken shawarma wrap\",\"slot\":\"alternative-andy-li\"},{\"id\":\"arancini\",\"filename\":\"The_famous_arancine.jpg\",\"photographer\":\"Madmartigand\",\"size\":[3647,2665],\"license\":\"CC BY-SA 2.0\",\"license_url\":\"https://creativecommons.org/licenses/by-sa/2.0/\",\"variant\":\"Sicilian arancine\"},{\"id\":\"pasta-alla-norma\",\"filename\":\"Pasta_alla_Norma_-_Wiki_Loves_Sicilia.jpg\",\"photographer\":\"8w9d\",\"size\":[3820,2747],\"license\":\"CC0 1.0\",\"license_url\":\"https://creativecommons.org/publicdomain/zero/1.0/\",\"variant\":\"Pasta alla Norma\"}]")
MAX_BYTES=30*1024*1024
def stage(row):
    filename=row["filename"]
    md5=hashlib.md5(filename.encode(),usedforsecurity=False).hexdigest()
    url=f"https://upload.wikimedia.org/wikipedia/commons/{md5[0]}/{md5[:2]}/{quote(filename)}"
    page="https://commons.wikimedia.org/wiki/File:"+quote(filename)
    out=ROOT/"assets/fysen-image-candidates"/row["id"]/"licensed-native-20261128"
    if row.get("slot"): out=out/row["slot"]
    if out.exists():
        print("Already staged",out);return
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
def stage_biryani():
    base=ROOT/"assets/fysen-image-candidates/biryani/licensed-native-20261128"
    out=base/"refined-v1"
    if out.exists(): return
    data=(base/"source.jpg").read_bytes()
    meta=json.loads((base/"review.json").read_text())
    assert hashlib.sha256(data).hexdigest()==meta["source_sha256"]=="1057a8f92fb82a32640c074d982eeebd097d97db15adaa64fe6797a751030425"
    im=Image.open(io.BytesIO(data)).convert("RGB");assert im.size==(4000,3000)
    # Plate contour traced from the reviewed 1000x750 preview, preserving all food.
    points=[(145,377),(146,347),(150,321),(156,298),(165,279),(170,258),(182,239),(190,218),(205,197),(215,178),(230,156),(242,136),(261,118),(281,105),(296,88),(316,73),(333,61),(352,49),(369,40),(391,30),(413,23),(436,17),(457,11),(484,8),(505,9),(525,8),(547,13),(567,13),(587,23),(607,31),(626,42),(647,55),(663,71),(684,84),(701,98),(720,115),(739,132),(756,151),(773,170),(788,191),(805,215),(819,239),(833,263),(844,289),(854,314),(864,337),(871,362),(874,387),(872,413),(867,439),(860,462),(851,486),(843,508),(831,530),(818,552),(804,572),(788,591),(771,610),(753,628),(735,645),(715,663),(695,678),(673,692),(651,704),(629,714),(605,722),(582,728),(558,730),(536,728),(515,730),(492,726),(470,726),(447,723),(425,718),(403,714),(382,707),(361,699),(341,690),(322,680),(302,668),(284,655),(266,642),(250,628),(235,613),(221,596),(208,579),(194,558),(183,537),(173,514),(165,493),(156,469),(150,446),(147,423),(144,400)]
    mask=Image.new("L",im.size);ImageDraw.Draw(mask).polygon([(x*4,y*4) for x,y in points],fill=255)
    # Remove patterned red cloth only inside a narrow band around the plate edge.
    inner=mask.filter(ImageFilter.MinFilter(31));edge=ImageChops.subtract(mask,inner)
    p=im.load();m=mask.load();e=edge.load();bb=edge.getbbox()
    for y in range(bb[1],bb[3]):
        for x in range(bb[0],bb[2]):
            if e[x,y]:
                r,g,b=p[x,y]
                if r>g*1.22 and r>b*1.15:m[x,y]=0
    crop=mask.getbbox();a,b,c,d=crop;pad=80
    crop=(max(0,a-pad),max(0,b-pad),min(im.width,c+pad),min(im.height,d+pad))
    clean=Image.composite(im,Image.new("RGB",im.size),mask).crop(crop)
    assert min(clean.size)>=1600
    out.mkdir()
    clean.save(out/"biryani.png");mask.save(out/"native-mask.png")
    preview=clean.copy();preview.thumbnail((1000,1000));preview.save(out/"preview.jpg",quality=95)
    thumb=clean.copy();thumb.thumbnail((512,512),Image.Resampling.LANCZOS)
    tile=Image.new("RGB",(512,512));tile.paste(thumb,((512-thumb.width)//2,(512-thumb.height)//2))
    master=out/f"biryani-master-{clean.width}.avif";clean.save(master,format="AVIF",quality=88)
    tile.save(out/"biryani-thumb-512.avif",format="AVIF",quality=85)
    tile.save(out/"thumb-preview.png")
    assert Image.open(master).size==clean.size and Image.open(out/"biryani-thumb-512.avif").size==(512,512)
    files=[out/"biryani.png",out/"native-mask.png",master,out/"biryani-thumb-512.avif"]
    (out/"review.json").write_text(json.dumps({**meta,"native_crop":list(crop),"native_size":list(clean.size),"sha256":{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in files},"modification":"Native manual plate contour; no upscale or generated food pixels","visual_review_completed":False,"approved_for_fysen":False,"published":False},indent=2)+"\n")
    print("STAGED BIRYANI MASK",clean.size)

if __name__=="__main__":
    completed=0
    try: stage_biryani();completed+=1
    except Exception as exc:print("BLOCKED biryani mask",str(exc))
    for row in SOURCES:
        try: stage(row);completed+=1
        except Exception as exc:print("BLOCKED",row["id"],str(exc))
    if not completed:raise SystemExit("No eligible originals acquired")
