#!/usr/bin/env python3
"""Make review-only true-black salmon presentations from two verified originals.

Only the mask fades the original pixels to black. Native food pixels are never
upscaled or re-created, and neither image is approved or published here.
"""
from __future__ import annotations
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request,urlopen
import numpy as np
from PIL import Image,ImageOps

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"assets/fysen-image-candidates/grillet-laks"
SOURCES={
 29149758:{
  "source_size":(3489,5234),
  "source_sha":"9a5c7a4d24b3d43a3b8efe25f1912a872489ee630563c28957304de8bc52a3ab",
  "photographer":"Nano Erdozain",
  "page":"https://www.pexels.com/photo/gourmet-salmon-dish-with-fresh-vegetables-29149758/",
  "variant":"Grilled salmon with tomato, bell pepper, green herbs and sauce, on dark ceramic plate",
 },
}
def create(photo_id:int,src_data:dict):
    url=f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
    req=Request(url,headers={"User-Agent":"FysenEditorialNativeReview/1.0 (https://github.com/Paradispartiet/fysen)"})
    with urlopen(req,timeout=50) as response:
        content=response.read(40*1024*1024+1)
    assert sha256(content).hexdigest()==src_data["source_sha"],f"{photo_id} source SHA changed"
    with Image.open(BytesIO(content)) as raw:
        raw.load()
        original=ImageOps.exif_transpose(raw).convert("RGB")
    assert original.size==src_data["source_size"]
    if photo_id==29149758:
        # The fish sits centrally in the original 3489x5234 portrait. This
        # crop keeps all of the serving. Only the far-outside wood fades away.
        img=original.crop((0,1100,3489,4550))
        width,height=img.size
        yy,xx=np.ogrid[:height,:width]
        radial=((xx-1770.0)/1920.0)**2+((yy-1800.0)/1640.0)**2
        alpha=np.clip((1.18-radial)/0.24,0.0,1.0)
        # The dark ceramic plate is near neutral grey, but the wood table is
        # brown (red/orange). Black-key only background-colored pixels OUTSIDE
        # the salmon and colorful vegetables, preserving all native food.
        rgb=np.asarray(img,dtype=np.float32)
        r,g,b=rgb[:,:,0],rgb[:,:,1],rgb[:,:,2]
        wood=(r>g*1.22)&(g>b*1.07)&(r>45)
        protected=(xx>510)&(xx<2900)&(yy>380)&(yy<2550)
        alpha=np.where(wood & ~protected,alpha*0.08,alpha)
        # Fade the remaining wooden tabletop below the dark plate.
        lower_fade=np.clip((3120.0-yy)/580.0,0.0,1.0)
        alpha*=lower_fade
        # Plate and foreground stay full-source-pixel detail; only the
        # non-food background is matted darker.
    else:
        img=original
        width,height=img.size
        yy,xx=np.ogrid[:height,:width]
        # Hand-measured elliptical rim of white oval serving plate in original.
        radial=((xx-2515.0)/2540.0)**2+((yy-2090.0)/1190.0)**2
        alpha=np.clip((1.13-radial)/0.16,0.0,1.0)
        # White plate and two fillets are protected; exterior wood goes black.
    rgb=np.asarray(img,dtype=np.uint8)
    black=np.uint8(rgb.astype(np.float32)*alpha[:,:,None])
    out=Image.fromarray(black,"RGB")
    assert min(out.size)>=3000
    folder=OUT/str(photo_id)
    folder.mkdir(parents=True,exist_ok=True)
    png=folder/"black-native-master.png"
    out.save(png,optimize=True)
    thumb=out.copy()
    thumb.thumbnail((1050,1050),Image.Resampling.LANCZOS)
    thumb.save(folder/"black-preview.jpg",quality=92,optimize=True)
    cx,cy=out.width//2,out.height//2
    out.crop((cx-700,cy-700,cx+700,cy+700)).save(
      folder/"black-native-detail-1400.jpg",quality=92,optimize=True)
    info={
      "dish_id":"grillet-laks","photo_id":photo_id,
      "photographer":src_data["photographer"],
      "source_page":src_data["page"],
      "license":"https://www.pexels.com/license/",
      "source_size":list(src_data["source_size"]),
      "source_sha256":src_data["source_sha"],
      "review_native_size":list(out.size),
      "review_native_sha256":sha256(png.read_bytes()).hexdigest(),
      "variant":src_data["variant"],
      "method":"native source-pixel crop (when needed) and black background matte; no upscaling",
      "visual_review_completed":False,"approved_for_fysen":False,"published":False,
    }
    (folder/"black-review.json").write_text(json.dumps(info,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print(f"STAGED {photo_id} {out.size} native SHA {info['review_native_sha256']} / NOT APPROVED")
if __name__=="__main__":
    for id,data in SOURCES.items():
        create(id,data)
