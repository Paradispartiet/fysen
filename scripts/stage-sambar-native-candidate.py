#!/usr/bin/env python3
"""Second-pass hand-traced Sambar mask; preserve original source and first review."""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "assets/fysen-image-candidates/sambar/raksanand-cc-by-sa-4"
OUT = BASE / "refined-v2"
# Contour traced against the actual 855 x 1000 first-pass review image.
# Coordinates map back to the unmodified source, not to the preview pixels.
OUTLINE = [
 (28,299),(29,272),(36,244),(47,219),(61,193),(78,167),(100,141),(127,116),
 (156,94),(190,75),(224,59),(260,46),(300,35),(340,28),(382,22),(422,20),
 (462,22),(502,28),(542,37),(581,51),(618,68),(650,87),(670,103),
 (677,82),(684,66),(695,52),(708,44),(722,42),(738,44),(750,49),
 (763,56),(774,67),(781,78),(790,88),(803,101),(812,111),(808,117),
 (797,108),(788,103),(782,100),(789,121),(799,149),(806,178),(815,214),
 (819,251),(821,286),(817,325),(810,361),(799,398),(785,434),(768,470),
 (747,507),(725,539),(701,568),(678,590),(657,610),(642,623),(638,635),
 (646,653),(653,675),(661,701),(667,729),(671,759),(671,783),(666,810),
 (655,835),(640,858),(621,879),(595,900),(565,919),(533,935),(496,948),
 (457,959),(414,966),(370,970),(332,972),(293,967),(257,959),(225,948),
 (196,934),(173,917),(153,896),(139,874),(130,849),(124,827),(125,806),
 (129,782),(137,754),(147,726),(151,705),(149,683),(145,660),(140,638),
 (126,621),(113,606),(102,591),(91,573),(81,553),(74,533),(69,513),
 (66,494),(68,472),(62,452),(53,432),(44,409),(37,387),(32,362),(29,331)
]
HOLE = [(721,77),(727,73),(736,74),(741,80),(743,89),(737,92),(731,90),(724,95),(721,92),(719,85)]
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
    if OUT.exists(): raise SystemExit("Refined candidate already exists; no overwrite")
    source = BASE / "source.jpg"
    first = json.loads((BASE / "review.json").read_text())
    assert sha(source) == first["source_sha256"] == "1b0f2bb11a461e3839b465f34101dcdb06d1d48f0a527a031f52c1e88c34b405"
    im=Image.open(source).convert("RGB")
    assert im.size==(3264,4084)
    # Original first-pass crop origin is (127,0). Dimensions are locked by first review.
    assert first["mask_candidate_size"] == [2665,3117]
    def map_point(p): return (round(127 + p[0]*2665/855), round(p[1]*3117/1000))
    mask=Image.new("L",im.size)
    draw=ImageDraw.Draw(mask)
    draw.polygon([map_point(p) for p in OUTLINE],fill=255)
    draw.polygon([map_point(p) for p in HOLE],fill=0)
    black=Image.new("RGB",im.size)
    clean=Image.composite(im,black,mask)
    # A crop with 3% breathing room, no resizing of the retained source pixels.
    a,b,c,d=mask.getbbox(); pad=round(im.width*.03)
    crop=(max(0,a-pad),max(0,b-pad),min(im.width,c+pad),min(im.height,d+pad))
    clean=clean.crop(crop)
    assert min(clean.size)>=1600
    OUT.mkdir()
    clean.save(OUT/"sambar-refined.png")
    mask.save(OUT/"native-mask.png")
    original=im.copy(); original.thumbnail((855,1000),Image.Resampling.LANCZOS)
    original.save(OUT/"source-preview.jpg",quality=92)
    preview=clean.copy(); preview.thumbnail((1000,1000),Image.Resampling.LANCZOS)
    preview.save(OUT/"preview.jpg",quality=95)
    thumb=clean.copy(); thumb.thumbnail((512,512),Image.Resampling.LANCZOS)
    tile=Image.new("RGB",(512,512)); tile.paste(thumb,((512-thumb.width)//2,(512-thumb.height)//2))
    tile.save(OUT/"thumb-preview.png")
    # Prove every retained source pixel is exact, every excluded pixel black.
    import PIL.ImageChops as chops
    reconstructed=Image.composite(im,black,mask).crop(crop)
    assert chops.difference(clean,reconstructed).getbbox() is None
    (OUT/"review.json").write_text(json.dumps({**first,"mask_candidate_size":list(clean.size),"mask_candidate_sha256":sha(OUT/"sambar-refined.png"),"native_mask_sha256":sha(OUT/"native-mask.png"),"source_pixels_unchanged":True,"crop":list(crop),"modification":"Second-pass manual native-resolution mask and crop; no upscale or generated food pixels","visual_review_completed":False,"approved_for_fysen":False,"published":False},indent=2)+"\n")
    print("Refined candidate:",clean.size)
if __name__=="__main__": main()
