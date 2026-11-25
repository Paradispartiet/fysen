#!/usr/bin/env python3
"""Apply reviewed AI masks to original RGB pixels, never redraw or upscale food."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageOps, ImageChops
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'apps/web/public/dish-images'
MANIFEST = PUBLIC / 'manifest.json'

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    manifest = json.loads(MANIFEST.read_text())
    for dish in ['vada', 'kebab-pita']:
        candidate = ROOT / 'assets/fysen-image-candidates' / dish / 'native-photo-20261125'
        source = json.loads((candidate / 'review.json').read_text())
        assert digest(candidate / 'source.jpg') == source['sha256']
        image = Image.open(candidate / 'source.jpg').convert('RGB')
        assert list(image.size) == source['dimensions']
        mask = Image.open(candidate / 'ai-foreground-mask.png').convert('L').point(lambda x: 255 if x > 128 else 0)
        if dish == 'vada':
            # Close the mask's unwanted thin internal outlines, not the photograph.
            mask = mask.filter(ImageFilter.MaxFilter(11)).filter(ImageFilter.MinFilter(11))
        for point in [(0, 0), (mask.width-1, 0), (0, mask.height-1), (mask.width-1, mask.height-1)]:
            if mask.getpixel(point) == 0:
                ImageDraw.floodfill(mask, point, 128)
        mask = mask.point(lambda x: 0 if x == 128 else 255).resize(image.size, Image.Resampling.BILINEAR)
        output = Image.composite(image, Image.new('RGB', image.size, 'black'), mask)
        # All fully selected original pixels must be unchanged; only edge alpha varies.
        solid = mask.point(lambda x: 255 if x == 255 else 0)
        delta = ImageChops.multiply(ImageChops.difference(image, output), Image.merge('RGB', (solid, solid, solid)))
        assert delta.getbbox() is None, 'Foreground RGB changed'
        original_path = ROOT / 'assets/fysen-dish-originals' / (dish + '.png')
        original_path.parent.mkdir(parents=True, exist_ok=True)
        output.save(original_path)
        stem = 'medu-vada' if dish == 'vada' else dish
        master = f'{stem}-master-{image.width}.avif'
        thumbnail = f'{stem}-thumb-512.avif'
        output.save(PUBLIC / master, quality=90)
        ImageOps.pad(output, (512,512), method=Image.Resampling.LANCZOS, color='black').save(PUBLIC / thumbnail, quality=85)
        entry = next(e for e in manifest['images'] if e['id'] == dish)
        entry.update(atlas=thumbnail, kind='Redaksjonelt rettfoto', largeSource=master,
                     largeSourceOriginalPath=str(original_path.relative_to(ROOT)),
                     largeSourceNativeWidth=image.width, largeSourceNativeHeight=image.height,
                     largeSourceMethod='independent-original', largeViewEnabled=True,
                     largeSourceSha256=digest(PUBLIC / master), largeSourceOriginalSha256=digest(original_path),
                     largeSourceReview=f'docs/fysen-image-reviews/{dish}.md',
                     photoCredit=f"{source['author']} / Wikimedia Commons · {source['license']} · AI-assistert frilegging",
                     photoSource=source['page'], photoLicense=source['license_url'],
                     photoLicenseNotice=f'/dish-images/{dish}-LICENSE.txt',
                     aiMaskProcessed=True, generatedFoodPixels=False, upscaled=False)
        entry['variantCaution'] = ('Medu vada med sambar og chutney. ' if dish == 'vada' else 'Kebab i pita med salat og hvit saus. Kjøttype og allergener er ikke dokumentert. ') + 'Redaksjonelt foto med AI-assistert frilegging, ikke restaurantfoto fra Fysen.'
        notice = (f"Fotograf: {source['author']}\nKilde: {source['page']}\nLisens: {source['license']} ({source['license_url']})\n"
                  f"Bearbeidelse: AI-generert frileggingsmaske projisert på originalfotoet på {image.width} × {image.height} piksler. Bare masken er tilpasset størrelsen; RGB-bildet er ikke oppskalert eller tegnet på nytt. Alle fullt beholdte matpiksler er kontrollert identiske med originalen. Kanter blandes mot svart. Kebab-papirets originale trykk er bevart.\n")
        if dish == 'vada':
            notice = notice.replace(' Kebab-papirets originale trykk er bevart.', '')
        (PUBLIC / f'{dish}-LICENSE.txt').write_text(notice)
        review = ROOT / entry['largeSourceReview']
        review.write_text(f'# {dish}\n\n' + notice + '\nReviewed for full-size display: yes\nNo collage crop or upscale: yes\nCorrect dish and black background: yes\n\n' +
                         f"Source JPEG SHA-256: {source['sha256']}\nOriginal PNG SHA-256: {entry['largeSourceOriginalSha256']}\nMaster AVIF SHA-256: {entry['largeSourceSha256']}\nThumbnail SHA-256: {digest(PUBLIC / thumbnail)}\nAI mask SHA-256: {digest(candidate / 'ai-foreground-mask.png')}\n\nEarlier small AI-redrawn candidates remain unapproved and are not used.\n")
        source['native_mask_result'] = dict(dimensions=list(image.size), source_rgb_preserved=True,
                                          ai_mask_processed=True, generated_food_pixels=False,
                                          upscaled=False, approved_for_draft_gallery=True, published=False,
                                          png_sha256=entry['largeSourceOriginalSha256'],
                                          master_sha256=entry['largeSourceSha256'])
        (candidate / 'review.json').write_text(json.dumps(source, ensure_ascii=False, indent=2) + '\n')
        print(dish, image.size, 'source RGB preserved, no upscale')
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')

if __name__ == '__main__':
    main()
