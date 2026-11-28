#!/usr/bin/env python3
"""Prepare a review-only Sambar photo from the licensed original. No runtime edits."""
import hashlib
import io
import json
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets/fysen-image-candidates/sambar/raksanand-cc-by-sa-4"
URL = "https://upload.wikimedia.org/wikipedia/commons/6/60/Tiffin_sambar.jpg"
PAGE = "https://commons.wikimedia.org/wiki/File:Tiffin_sambar.jpg"
LICENSE = "https://creativecommons.org/licenses/by-sa/4.0/"
# Trace of the entire copper serving vessel, based on the 500x626 source preview.
# This is a first-pass mask, NOT visual approval.
POINTS = [(34,112),(38,85),(49,60),(68,39),(95,24),(131,15),(178,10),
          (226,10),(270,17),(311,32),(338,46),(343,27),(356,19),(369,20),
          (383,29),(393,40),(408,43),(415,51),(412,60),(401,57),(395,54),
          (405,83),(412,111),(413,148),(405,181),(393,211),(377,241),
          (356,267),(332,289),(335,310),(340,338),(341,366),(334,392),
          (318,414),(293,433),(260,449),(220,460),(182,465),(150,461),
          (124,451),(100,435),(82,415),(74,393),(77,368),(85,344),
          (92,322),(90,307),(76,286),(62,267),(54,249),(51,234),
          (53,217),(44,196),(36,166),(32,140)]
def digest(data):
    return hashlib.sha256(data).hexdigest()
def main():
    if OUT.exists():
        raise SystemExit("Candidate already exists; never overwrite reviewed files")
    req = Request(URL, headers={"User-Agent": "FysenEditorialImageReview/1.0 (https://github.com/Paradispartiet/fysen)"})
    with urlopen(req, timeout=45) as resp:
        if not resp.headers.get("Content-Type","").lower().startswith("image/jpeg"):
            raise RuntimeError("Unexpected content type")
        data = resp.read(30*1024*1024+1)
    if len(data) > 30*1024*1024 or not data.startswith(b"\xff\xd8\xff"):
        raise RuntimeError("Invalid or oversized JPEG")
    src = Image.open(io.BytesIO(data))
    src.load()
    src = src.convert("RGB")
    if src.size != (3264,4084):
        raise RuntimeError(f"Source dimensions changed: {src.size}")
    w,h=src.size
    mask=Image.new("L",src.size,0)
    ImageDraw.Draw(mask).polygon([(round(x*w/500),round(y*h/626)) for x,y in POINTS],fill=255)
    isolated=Image.composite(src,Image.new("RGB",src.size,(0,0,0)),mask)
    bbox=mask.getbbox()
    pad=round(w*.025)
    bbox=(max(0,bbox[0]-pad),max(0,bbox[1]-pad),min(w,bbox[2]+pad),min(h,bbox[3]+pad))
    isolated=isolated.crop(bbox)
    if min(isolated.size)<1600: raise RuntimeError("Insufficient native detail")
    OUT.mkdir(parents=True)
    (OUT/"source.jpg").write_bytes(data)
    isolated.save(OUT/"sambar-mask-candidate.png")
    preview=isolated.copy(); preview.thumbnail((1000,1000),Image.Resampling.LANCZOS)
    preview.save(OUT/"preview.jpg",quality=94)
    thumb=isolated.copy(); thumb.thumbnail((512,512),Image.Resampling.LANCZOS)
    square=Image.new("RGB",(512,512)); square.paste(thumb,((512-thumb.width)//2,(512-thumb.height)//2))
    square.save(OUT/"thumb-preview.png")
    (OUT/"review.json").write_text(json.dumps({"dish_id":"sambar","source_page":PAGE,"original_url":URL,"photographer":"Raksanand","license":"CC BY-SA 4.0","license_url":LICENSE,"source_size":[w,h],"source_sha256":digest(data),"mask_candidate_size":list(isolated.size),"mask_candidate_sha256":digest((OUT/"sambar-mask-candidate.png").read_bytes()),"variant":"Tiffin sambar, breakfast accompaniment","modification":"First-pass manual mask and crop, no generated food pixels or upscale","visual_review_completed":False,"approved_for_fysen":False,"published":False},indent=2)+"\n")
    print("Staged unapproved source and preview:",isolated.size)
if __name__=="__main__": main()
