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

def stage_reviewed_plate(dish, relative, digest, preview_size, points):
    base=ROOT/"assets/fysen-image-candidates"/dish/"licensed-native-20261128"
    if relative: base=base/relative
    out=base/"refined-v1"
    if out.exists(): return
    data=(base/"source.jpg").read_bytes()
    meta=json.loads((base/"review.json").read_text())
    assert hashlib.sha256(data).hexdigest()==meta["source_sha256"]==digest
    im=Image.open(io.BytesIO(data)).convert("RGB")
    assert list(im.size)==meta["size"]
    w,h=im.size
    pw,ph=preview_size
    mask=Image.new("L",im.size)
    ImageDraw.Draw(mask).polygon([(round(x*w/pw),round(y*h/ph)) for x,y in points],fill=255)
    a,b,c,d=mask.getbbox()
    pad=round(min(w,h)*.025)
    crop=(max(0,a-pad),max(0,b-pad),min(w,c+pad),min(h,d+pad))
    clean=Image.composite(im,Image.new("RGB",im.size),mask).crop(crop)
    assert min(clean.size)>=1600
    out.mkdir()
    clean.save(out/f"{dish}.png")
    mask.save(out/"native-mask.png")
    preview=clean.copy();preview.thumbnail((1000,1000),Image.Resampling.LANCZOS);preview.save(out/"preview.jpg",quality=95)
    thumb=clean.copy();thumb.thumbnail((512,512),Image.Resampling.LANCZOS)
    tile=Image.new("RGB",(512,512));tile.paste(thumb,((512-thumb.width)//2,(512-thumb.height)//2))
    master=out/f"{dish}-master-{clean.width}.avif"
    clean.save(master,format="AVIF",quality=88)
    thumbpath=out/f"{dish}-thumb-512.avif"
    tile.save(thumbpath,format="AVIF",quality=85);tile.save(out/"thumb-preview.png")
    assert Image.open(master).size==clean.size and Image.open(thumbpath).size==(512,512)
    files=[out/f"{dish}.png",out/"native-mask.png",master,thumbpath]
    (out/"review.json").write_text(json.dumps({**meta,"native_crop":list(crop),"native_size":list(clean.size),"sha256":{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in files},"modification":"Manual native-resolution plate contour; no upscale or generated food pixels","visual_review_completed":False,"approved_for_fysen":False,"published":False},indent=2)+"\n")
    print("STAGED PLATE",dish,clean.size)

# Trace the entire plate and the protruding original salad leaves.
SHAWARMA=[(104,396),(106,371),(111,346),(120,320),(131,294),(146,269),(163,245),(185,222),(210,200),(237,180),(265,161),(295,145),(328,130),(361,118),(394,109),(428,101),(463,95),(495,92),(500,85),(498,69),(507,63),(525,61),(540,67),(558,78),(575,87),(591,99),(618,107),(651,117),(683,129),(713,143),(745,158),(773,178),(800,198),(824,220),(845,244),(863,270),(877,295),(887,322),(893,349),(897,378),(897,406),(893,436),(886,464),(875,492),(861,519),(844,545),(823,570),(799,593),(771,614),(742,633),(710,650),(676,664),(641,676),(604,686),(567,693),(529,698),(490,700),(451,699),(412,695),(374,688),(337,678),(302,666),(269,651),(238,634),(209,615),(183,593),(160,569),(141,544),(126,517),(115,489),(108,460),(104,431)]
# Trace bowl plus basil and pasta protruding above its rim.
PASTA=[(72,383),(72,354),(76,324),(84,296),(95,270),(110,245),(129,223),(152,201),(179,182),(209,165),(240,150),(273,136),(309,124),(346,114),(386,107),(426,102),(470,99),(485,93),(497,69),(512,53),(530,41),(552,33),(575,26),(585,27),(592,36),(598,51),(600,68),(596,87),(591,101),(600,107),(618,105),(629,109),(636,121),(650,127),(682,140),(716,155),(749,173),(781,192),(810,214),(834,237),(855,263),(873,290),(887,318),(897,348),(903,377),(905,407),(901,437),(894,466),(883,494),(868,522),(850,548),(828,573),(802,595),(773,616),(741,634),(706,651),(670,664),(632,676),(591,686),(550,693),(508,698),(466,698),(424,695),(382,688),(341,678),(303,665),(267,650),(233,631),(201,609),(172,585),(146,559),(124,532),(106,503),(92,473),(82,443),(75,413)]
if __name__=="__main__":
    done=0
    for args in [
        ("shawarma","alternative-andy-li","cd9385263df218171e023358f1f467037125e169138fff1476af1133a16aec13",(1000,750),SHAWARMA),
        ("pasta-alla-norma","","1c0a5064fe855a9a8c8e12d24e3a3806cbb7fb325c4d9a98aa09baa3567b567b",(1000,719),PASTA)
    ]:
        try:stage_reviewed_plate(*args);done+=1
        except Exception as exc:print("BLOCKED",args[0],str(exc))
    if not done:raise SystemExit("No eligible plate candidates")
