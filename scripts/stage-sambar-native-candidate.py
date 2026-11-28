#!/usr/bin/env python3
"""Native-resolution Sambar contour and AVIF export. Review before activation."""
import hashlib, json
from pathlib import Path
from PIL import Image, ImageDraw, ImageChops
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/"assets/fysen-image-candidates/sambar/raksanand-cc-by-sa-4"
OUT=BASE/"refined-v3"
# Trace directly against the uncropped 799 x 1000 source preview.
P=[(51,237),(52,216),(57,194),(65,172),(77,150),(91,130),(108,110),(127,92),(149,75),(173,60),(198,47),(225,36),(254,27),(284,20),(314,16),(346,15),(378,17),(409,21),(440,28),(470,37),(499,49),(523,62),(545,77),(552,54),(561,37),(570,31),(581,29),(592,31),(602,37),(610,47),(616,59),(624,65),(637,76),(648,90),(656,105),(659,115),(654,120),(648,117),(642,108),(636,98),(628,88),(620,81),(617,95),(626,114),(635,136),(644,161),(651,187),(657,214),(660,241),(660,271),(657,302),(651,333),(641,364),(628,393),(612,421),(593,445),(572,465),(550,483),(524,500),(529,516),(537,540),(543,562),(547,584),(547,607),(543,629),(535,650),(522,671),(505,690),(485,706),(462,719),(437,731),(410,739),(382,744),(353,746),(324,745),(296,742),(268,735),(242,725),(218,713),(195,699),(175,682),(158,663),(145,643),(135,621),(128,598),(125,574),(125,550),(128,526),(134,504),(141,483),(144,473),(138,465),(130,467),(119,461),(109,454),(97,444),(87,432),(82,420),(81,409),(83,399),(90,390),(79,377),(71,361),(63,340),(57,320),(53,298),(51,275),(50,256)]
H=[[(576,58),(580,55),(587,56),(592,61),(591,67),(584,69),(579,73),(576,68)],[(94,407),(98,402),(106,405),(116,414),(124,428),(130,442),(124,447),(115,442),(105,434),(97,424),(93,415)]]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
    assert not OUT.exists()
    source=BASE/"source.jpg"
    meta=json.loads((BASE/"review.json").read_text())
    assert sha(source)==meta["source_sha256"]=="1b0f2bb11a461e3839b465f34101dcdb06d1d48f0a527a031f52c1e88c34b405"
    im=Image.open(source).convert("RGB");assert im.size==(3264,4084)
    def pts(a):return [(round(x*im.width/799),round(y*im.height/1000)) for x,y in a]
    mask=Image.new("L",im.size);d=ImageDraw.Draw(mask);d.polygon(pts(P),fill=255)
    for hole in H:d.polygon(pts(hole),fill=0)
    # Remove residual green leaf pixels only near the contour, never in the food.
    from PIL import ImageFilter
    inner=mask.filter(ImageFilter.MinFilter(15))
    band=ImageChops.subtract(mask,inner)
    bb=band.getbbox(); px=im.load(); mp=mask.load(); bp=band.load()
    for y in range(bb[1],bb[3]):
        for x in range(bb[0],bb[2]):
            if bp[x,y]:
                r,g,b=px[x,y]
                if g>r*1.13 and g>b*1.05:mp[x,y]=0
    clean=Image.composite(im,Image.new("RGB",im.size),mask)
    a,b,c,d=mask.getbbox();pad=round(im.width*.035);crop=(max(0,a-pad),max(0,b-pad),min(im.width,c+pad),min(im.height,d+pad))
    clean=clean.crop(crop);assert min(clean.size)>=1600
    OUT.mkdir()
    clean.save(OUT/"sambar.png")
    mask.save(OUT/"native-mask.png")
    preview=clean.copy();preview.thumbnail((1000,1000),Image.Resampling.LANCZOS);preview.save(OUT/"preview.jpg",quality=95)
    thumb=clean.copy();thumb.thumbnail((512,512),Image.Resampling.LANCZOS)
    tile=Image.new("RGB",(512,512));tile.paste(thumb,((512-thumb.width)//2,(512-thumb.height)//2))
    master=OUT/f"sambar-master-{clean.width}.avif"
    clean.save(master,format="AVIF",quality=88)
    tile.save(OUT/"sambar-thumb-512.avif",format="AVIF",quality=85)
    tile.save(OUT/"thumb-preview.png")
    assert Image.open(master).size==clean.size
    assert Image.open(OUT/"sambar-thumb-512.avif").size==(512,512)
    (OUT/"review.json").write_text(json.dumps({**meta,"mask_candidate_size":list(clean.size),"mask_candidate_sha256":sha(OUT/"sambar.png"),"native_mask_sha256":sha(OUT/"native-mask.png"),"master_file":master.name,"master_sha256":sha(master),"thumbnail_sha256":sha(OUT/"sambar-thumb-512.avif"),"source_pixels_unchanged":True,"crop":list(crop),"modification":"Native manual contour with leaf-edge cleanup, no upscale or generated food pixels","visual_review_completed":False,"approved_for_fysen":False,"published":False},indent=2)+"\n")
    print("Native AVIF candidate:",clean.size)
if __name__=="__main__":main()
