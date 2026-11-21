#!/usr/bin/env python3
"""Stage genuine masala dosa photographs for visual editorial review, not publication."""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from urllib.request import Request,urlopen
import json,time
from PIL import Image,ImageOps
OUT=Path("assets/fysen-image-candidates/masala-dosa")
SOURCES=[
  dict(slug="jack-baghel-dosa-dark",id=20422129,size=(9504,6336),author="Jack Baghel / Pexels",page="https://www.pexels.com/photo/food-on-plate-with-bowls-of-sauces-20422129/",note="Crispy dosa with chutney, vegetable curry and sambar on dark backdrop. Verify potato filling: Pexels does not explicitly confirm it."),
  dict(slug="jack-baghel-dosa-top-view",id=20422123,size=(9504,6336),author="Jack Baghel / Pexels",page="https://www.pexels.com/photo/food-on-plate-and-soup-in-cup-20422123/",note="Top-down dosa meal with chutneys and sambar. Verify whole serving and potato filling."),
  dict(slug="nikhil-bhatia-banana-leaf",id=32229637,size=(2400,3200),author="Nikhil Bhatia / Pexels",page="https://www.pexels.com/photo/traditional-south-indian-masala-dosa-on-banana-leaf-32229637/",note="Explicitly labelled authentic masala dosa with coconut chutney in Mysuru, on banana leaf."),
  dict(slug="jack-baghel-triangular",id=20422133,size=(9504,6336),author="Jack Baghel / Pexels",page="https://www.pexels.com/photo/triangular-bread-on-plate-20422133/",note="Triangular dosa with chutneys and sambar; verify potato filling, full plate and no other meal.")
]
def fetch(url):
    req=Request(url,headers={"User-Agent":"FysenEditorialReview/1.0 (https://github.com/Paradispartiet/fysen)","Accept":"image/jpeg,image/*;q=0.8"})
    for n in range(3):
        try:
            with urlopen(req,timeout=100) as res:
                mime=res.headers.get("Content-Type","")
                raw=res.read(48*1024*1024+1)
            assert mime.startswith("image/") and 0<len(raw)<=48*1024*1024
            return raw
        except Exception:
            if n==2:raise
            time.sleep((n+1)*3)
def stage(x):
    url=f"https://images.pexels.com/photos/{x['id']}/pexels-photo-{x['id']}.jpeg"
    raw=fetch(url)
    with Image.open(BytesIO(raw)) as original:
        original.load()
        im=ImageOps.exif_transpose(original).convert("RGB")
    w,h=im.size
    assert (w,h)==x["size"],f"{x['slug']}: unexpected native dimensions {w,h}"
    assert min(w,h)>=1600
    root=OUT/x["slug"]
    root.mkdir(parents=True,exist_ok=True)
    (root/"source.jpeg").write_bytes(raw)
    preview=im.copy()
    preview.thumbnail((1080,1080),Image.Resampling.LANCZOS)
    preview.save(root/"preview.jpg",quality=92,optimize=True)
    im.crop((w//2-700,h//2-700,w//2+700,h//2+700)).save(root/"native-detail-1400.jpg",quality=94,optimize=True)
    meta=dict(dish_id="dosa",gallery_id="dosa",catalog_id="dosa",variant="masala dosa",
      source_photo_author=x["author"],photo_page=x["page"],photo_source_url=url,
      photo_license="https://www.pexels.com/license/",native_width=w,native_height=h,
      original_sha256=sha256(raw).hexdigest(),source_verified=True,no_upscale=True,
      candidate_notes=x["note"],visual_review_completed=False,approved_for_fysen=False,
      published=False,quality_gate="Real masala dosa, confirm spiced potato filling if visible, crisp complete crepe and appropriate chutney/sambar; authentic high resolution; a single complete serving on pure black after masking, no false restaurant claim.")
    (root/"review.json").write_text(json.dumps(meta,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(f"STAGED {x['slug']} {w}x{h} SHA={meta['original_sha256']} NOT APPROVED")
if __name__=="__main__":
    n=0
    for source in SOURCES:
        try:stage(source);n+=1
        except Exception as error:print(f"REJECTED {source['slug']}: {type(error).__name__}: {error}")
    assert n>=1,"No authentic source passed validation; do not continue"
    print(f"MASALA DOSA: {n} sources staged, approved 0, published 0")
