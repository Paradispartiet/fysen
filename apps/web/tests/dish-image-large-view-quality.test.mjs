import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, URL } from "node:url";

const web = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const imageRoot = path.join(web, "public", "dish-images");
const repoRoot = path.resolve(web, "../..");
const manifest = JSON.parse(readFileSync(path.join(imageRoot, "manifest.json"), "utf8"));
const reusedPhotoProvenance = {
  "kebab-pita": ["https://commons.wikimedia.org/wiki/File:Doener_Kebab_(9682662957).jpg","Lauren Travis / Wikimedia Commons · CC BY 2.0 · AI-assistert frilegging","https://creativecommons.org/licenses/by/2.0/","/dish-images/kebab-pita-LICENSE.txt"],
  "bao": [
    "https://commons.wikimedia.org/wiki/File:Red_Braised_Pork_Belly_Bao_-_Tiger_Bites_Pig_2025-11-20.jpg",
    "Andy Li / Wikimedia Commons · CC0 1.0",
    "https://creativecommons.org/publicdomain/zero/1.0/",
    "/dish-images/bao-braised-pork-LICENSE.txt"
  ],
  "dumplings": [
    "https://commons.wikimedia.org/wiki/File:Dumplings_(Unsplash).jpg",
    "Charles Deluvio / Wikimedia Commons · CC0 1.0",
    "https://creativecommons.org/publicdomain/zero/1.0/",
    "/dish-images/dumplings-LICENSE.txt"
  ],
  "mapo-tofu": [
    "https://commons.wikimedia.org/wiki/File:Chen_Mapo_Tofu.jpg",
    "ZhengZhou / Wikimedia Commons · CC BY-SA 4.0",
    "https://creativecommons.org/licenses/by-sa/4.0/",
    "/dish-images/mapo-tofu-LICENSE.txt"
  ],
  "peking-duck": [
    "https://commons.wikimedia.org/wiki/File:Peking_Duck_and_Chinese_pancake_from_Duck_Victoria.jpg",
    "Peachyeung316 / Wikimedia Commons · CC BY-SA 4.0",
    "https://creativecommons.org/licenses/by-sa/4.0/",
    "/dish-images/peking-duck-LICENSE.txt"
  ],
  "dan-dan-noodles": [
    "https://commons.wikimedia.org/wiki/File:Dandan_Noodles.jpg",
    "ZhengZhou / Wikimedia Commons · CC BY-SA 4.0",
    "https://creativecommons.org/licenses/by-sa/4.0/",
    "/dish-images/dan-dan-noodles-LICENSE.txt"
  ],
  "green-curry": [
    "https://commons.wikimedia.org/wiki/File:Thai_green_chicken_curry_at_Highgate_Cricket_Club,_Crouch_End,_London_1.jpg",
    "Acabashi / Wikimedia Commons · CC BY-SA 4.0",
    "https://creativecommons.org/licenses/by-sa/4.0/",
    "/dish-images/green-curry-LICENSE.txt"
  ],
  "pad-kra-pao": [
    "https://commons.wikimedia.org/wiki/File:%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%A3%E0%B8%B2%E0%B8%94%E0%B8%9C%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B9%84%E0%B8%82%E0%B9%88%E0%B8%94%E0%B8%B2%E0%B8%A7.jpg",
    "Vee Satayamas / Wikimedia Commons · CC BY 4.0",
    "https://creativecommons.org/licenses/by/4.0/",
    "/dish-images/pad-kra-pao-LICENSE.txt"
  ],
  "banh-mi": [
    "https://commons.wikimedia.org/wiki/File:20240704_%E8%B6%8A%E5%BC%8F%E7%83%A4%E8%B1%AC%E8%82%89%E6%B3%95%E5%9C%8B%E9%BA%B5%E5%8C%85.jpg",
    "Junyu-K / Wikimedia Commons · CC BY-SA 4.0",
    "https://creativecommons.org/licenses/by-sa/4.0/",
    "/dish-images/banh-mi-LICENSE.txt"
  ],
  "bun-cha": [
    "https://commons.wikimedia.org/wiki/File:B%C3%BAn_ch%E1%BA%A3_with_chili_peppers_and_fresh_garlic.jpg",
    "Kiraface / Wikimedia Commons · CC BY-SA 4.0",
    "https://creativecommons.org/licenses/by-sa/4.0/",
    "/dish-images/bun-cha-LICENSE.txt"
  ],
  "vietnamese-spring-rolls": [
    "https://commons.wikimedia.org/wiki/File:G%E1%BB%8Fi_cu%E1%BB%91n,_Hai_Duong_restaurant,_Eden_Center.jpg",
    "Ser Amantio di Nicolao / Wikimedia Commons · CC BY-SA 4.0",
    "https://creativecommons.org/licenses/by-sa/4.0/",
    "/dish-images/goi-cuon-LICENSE.txt"
  ],
  "tandoori": [
    "https://www.pexels.com/photo/delicious-tandoori-chicken-on-a-sizzling-plate-9738994/",
    "Alberta Studios / Pexels · Pexels-lisensen",
    "https://www.pexels.com/license/",
    "/dish-images/tandoori-chicken-LICENSE.txt"
  ],
  "naan": [
    "https://www.pexels.com/photo/flavorful-garlic-naan-bread-close-up-30203311/",
    "Nosh Caterers / Pexels · Pexels-lisensen",
    "https://www.pexels.com/license/",
    "/dish-images/naan-LICENSE.txt"
  ],
  "dal-makhani": [
    "https://www.pexels.com/photo/dal-makhani-on-a-white-bowl-12737916/",
    "dhiraj jain / Pexels · Pexels-lisensen",
    "https://www.pexels.com/license/",
    "/dish-images/dal-makhani-LICENSE.txt"
  ],
  "idli": [
    "https://commons.wikimedia.org/wiki/File:Idly_Chutney_Sambar.jpg",
    "Sarathprabhavu / Wikimedia Commons · CC BY 4.0",
    "https://creativecommons.org/licenses/by/4.0/",
    "/dish-images/idli-LICENSE.txt"
  ],
  "vada": [
    "https://commons.wikimedia.org/wiki/File:Medu_Vada_-_Calcutta_16_2026-07-11.jpg",
    "Andy Li / Wikimedia Commons · CC0 1.0 · AI-assistert frilegging",
    "https://creativecommons.org/publicdomain/zero/1.0/",
    "/dish-images/vada-LICENSE.txt"
  ]
};

// Large viewing means up to 800 CSS px on a 2x iPad screen. Files sized for
// 50–150px thumbnails cannot be treated as full-size originals.
const largeViewCssPixels = 800;
const largeViewDevicePixelRatio = 2;
const minimumNativePixels = largeViewCssPixels * largeViewDevicePixelRatio;

// Retain source PNGs outside public/ so a full-size asset can be audited
// without shipping an uncompressed multi-megabyte master to every visitor.
function originalPngEvidence(imageId, originalPath) {
  const expectedPath = `assets/fysen-dish-originals/${imageId}.png`;
  assert.equal(originalPath, expectedPath, `${imageId}: original source must use the canonical per-dish path`);
  const bytes = readFileSync(path.join(repoRoot, expectedPath));
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a",
    `${imageId}: original source must be a real PNG, not an AVIF re-export or a collage filename`);
  assert.equal(bytes.toString("ascii", 12, 16), "IHDR", `${imageId}: missing PNG dimensions`);
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
}

function avifDimensions(filename) {
  const bytes = readFileSync(path.join(imageRoot, filename));
  assert.equal(bytes.toString("ascii", 4, 12), "ftypavif", `${filename}: invalid AVIF format`);
  const index = bytes.indexOf(Buffer.from("ispe"));
  assert.ok(index >= 0 && bytes.length >= index + 16, `${filename}: missing AVIF image dimensions`);
  return {
    width: bytes.readUInt32BE(index + 8),
    height: bytes.readUInt32BE(index + 12),
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
}

test("Every enabled Matlyst large view requires a source-verified sharp 1600px master", () => {
  const failures = [];
  const seenMasters = new Set();
  let acceptedCount = 0;

  for (const image of manifest.images) {
    const failuresBeforeDish = failures.length;
    const master = image.largeSource;
    if (!master && image.largeViewEnabled !== true) {
      // This dish remains thumbnail-only; it must not opt into large display.
      continue;
    }
    if (typeof master !== "string" || !/^[a-z0-9-]+\.avif$/u.test(master)) {
      failures.push(`${image.id}: largeViewEnabled requires largeSource AVIF (>= ${minimumNativePixels}px)`);
      continue;
    }
    if (image.largeViewEnabled !== true) {
      failures.push(`${image.id}: largeSource exists but largeViewEnabled is not true`);
      continue;
    }

    if (master === image.atlas || /^(collection|series-04)\.avif$/u.test(master)) {
      failures.push(`${image.id}: largeSource must be a distinct full-size image, never an atlas or thumbnail`);
      continue;
    }
    if (seenMasters.has(master)) {
      failures.push(`${image.id}: full-size master ${master} is reused for multiple dish IDs`);
      continue;
    }
    seenMasters.add(master);

    let dimensions;
    try {
      dimensions = avifDimensions(master);
    } catch (error) {
      failures.push(`${image.id}: ${error.message}`);
      continue;
    }
    if (dimensions.width < minimumNativePixels || dimensions.height < minimumNativePixels) {
      failures.push(`${image.id}: ${master} is ${dimensions.width}x${dimensions.height}, need >= ${minimumNativePixels}x${minimumNativePixels}`);
    }

    // Export size alone is insufficient. A 700px crop re-exported as 1600px
    // is not a high-resolution source. These native-detail figures must come
    // from reviewed production evidence, never from the AVIF header.
    if (!Number.isInteger(image.largeSourceNativeWidth) ||
        !Number.isInteger(image.largeSourceNativeHeight) ||
        image.largeSourceNativeWidth < minimumNativePixels ||
        image.largeSourceNativeHeight < minimumNativePixels) {
      failures.push(`${image.id}: source-native detail >= ${minimumNativePixels}px not documented`);
    }
    if (Number.isInteger(image.largeSourceNativeWidth) && Number.isInteger(image.largeSourceNativeHeight) &&
        (dimensions.width > image.largeSourceNativeWidth || dimensions.height > image.largeSourceNativeHeight)) {
      failures.push(`${image.id}: AVIF is larger than native original; apparent resolution may be upscaled`);
    }
    // Verify the original bytes, not merely an unsubstantiated field in the manifest.
    try {
      const original = originalPngEvidence(image.id, image.largeSourceOriginalPath);
      if (original.width !== image.largeSourceNativeWidth || original.height !== image.largeSourceNativeHeight) {
        failures.push(`${image.id}: claimed native dimensions do not match retained PNG source`);
      }
      if (original.width < minimumNativePixels || original.height < minimumNativePixels) {
        failures.push(`${image.id}: original PNG is only ${original.width}x${original.height}`);
      }
      if (original.sha256 !== image.largeSourceOriginalSha256) {
        failures.push(`${image.id}: original source SHA-256 does not match retained source bytes`);
      }
    } catch (error) {
      failures.push(`${image.id}: original source evidence missing or invalid (${error.code ?? error.message})`);
    }
    if (!["independent-original", "high-resolution-redraw"].includes(image.largeSourceMethod)) {
      failures.push(`${image.id}: dedicated source method/review is missing; upscale and collage crops do not qualify`);
    }
    if (typeof image.largeSourceSha256 !== "string" || image.largeSourceSha256 !== dimensions.sha256) {
      failures.push(`${image.id}: reviewed large-source SHA-256 missing or does not match the actual AVIF bytes`);
    }
    if (typeof image.largeSourceOriginalSha256 !== "string" || !/^[a-f0-9]{64}$/u.test(image.largeSourceOriginalSha256)) {
      failures.push(`${image.id}: original source SHA-256 missing`);
    }
    const expectedReview = `docs/fysen-image-reviews/${image.id}.md`;
    if (image.largeSourceReview !== expectedReview) {
      failures.push(`${image.id}: exact dish review document is missing`);
    } else {
      try {
        const review = readFileSync(path.join(repoRoot, expectedReview), "utf8");
        if (!review.includes(image.largeSourceOriginalSha256) ||
            !/^Reviewed for full-size display:\s*yes\s*$/imu.test(review) ||
            !/^No collage crop or upscale:\s*yes\s*$/imu.test(review) ||
            !/^Correct dish and black background:\s*yes\s*$/imu.test(review)) {
          failures.push(`${image.id}: source review or no-upscale verification is incomplete`);
        }
      } catch (error) {
        failures.push(`${image.id}: cannot read review evidence (${error.code ?? error.message})`);
      }
    }
    if (failures.length === failuresBeforeDish) acceptedCount += 1;
  }

  assert.ok(acceptedCount > 0, "No verified full-size originals. Only thumbnail-only dishes may remain without largeSource.");
  assert.deepEqual(failures, [], `Large-view release blocked: ${acceptedCount}/${manifest.images.length} photos verified for optional full-size display.\n${failures.join("\n")}`);
});


test("Editorial food photos are only large-view enabled with real provenance and separate thumbnails", () => {
  const photos = manifest.images.filter((image) => image.kind === "Redaksjonelt rettfoto");
  assert.ok(photos.length >= 2, "Both sushi and butter chicken need separate full-size masters");
  assert.ok(photos.some((photo) => photo.id === "sushi"));
  assert.ok(photos.some((photo) => photo.id === "butter-chicken"));
  for (const photo of photos) {
    assert.equal(photo.largeViewEnabled, true, photo.id + " must pass full-size gate");
    assert.match(photo.atlas, /-thumb-\d+\.avif$/u);
    assert.match(photo.largeSource, /-master-\d+\.avif$/u);
    assert.notEqual(photo.atlas, photo.largeSource);
    assert.match(photo.photoLicense, /^https:\/\//u);
    if (photo.id === "rekesmorbrod") {
      assert.match(photo.photoSource, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/u);
      assert.match(photo.photoCredit, /Susanne Nilsson.*CC BY-SA 2\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/licenses/by-sa/2.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/rekesmorbrod-LICENSE.txt");
      const notice = readFileSync(path.join(imageRoot, "rekesmorbrod-LICENSE.txt"), "utf8");
      assert.match(notice, /Foto: Susanne Nilsson/u);
      assert.match(notice, /CC BY-SA 2\.0/u);
    } else if (photo.id === "pasta-bolognese") {
      assert.match(photo.photoSource, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/u);
      assert.match(photo.photoCredit, /Alex Sirac.*CC BY 4\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/licenses/by/4.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/pasta-bolognese-LICENSE.txt");
      const notice = readFileSync(path.join(imageRoot, "pasta-bolognese-LICENSE.txt"), "utf8");
      assert.match(notice, /Fotograf: Alex Sirac/u);
      assert.match(notice, /CC BY 4\.0/u);
    } else if (photo.id === "pizza-marinara") {
      assert.match(photo.photoSource, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/u);
      assert.match(photo.photoCredit, /Peter Van den Bossche.*CC BY-SA 2\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/licenses/by-sa/2.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/pizza-marinara-LICENSE.txt");
      const notice = readFileSync(path.join(imageRoot, "pizza-marinara-LICENSE.txt"), "utf8");
      assert.match(notice, /Foto: Peter Van den Bossche/u);
      assert.match(notice, /CC BY-SA 2\.0/u);
    } else if (photo.id === "cacio-e-pepe") {
      assert.match(photo.photoSource, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/u);
      assert.match(photo.photoCredit, /DocteurCosmos.*CC BY-SA 3\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/licenses/by-sa/3.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/cacio-e-pepe-LICENSE.txt");
      const notice = readFileSync(path.join(imageRoot, "cacio-e-pepe-LICENSE.txt"), "utf8");
      assert.match(notice, /Foto: DC \(DocteurCosmos\)/u);
      assert.match(notice, /CC BY-SA 3\.0/u);
    } else if (photo.id === "bibimbap") {
      assert.equal(photo.catalogId, null);
      assert.match(photo.photoSource, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/u);
      assert.match(photo.photoCredit, /Andy Li.*CC0 1\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/publicdomain/zero/1.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/bibimbap-LICENSE.txt");
      const notice=readFileSync(path.join(imageRoot, "bibimbap-LICENSE.txt"), "utf8");
      assert.match(notice, /Fotograf: Andy Li/u);
      assert.match(notice, /CC0 1\.0/u);
    } else if (photo.id === "udon") {
      assert.equal(photo.catalogId, "udon");
      assert.match(photo.photoSource, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/u);
      assert.match(photo.photoCredit, /Immanuelle.*CC BY 4\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/licenses/by/4.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/udon-tempura-LICENSE.txt");
      const notice=readFileSync(path.join(imageRoot,"udon-tempura-LICENSE.txt"),"utf8");
      assert.match(notice,/Fotograf: Immanuelle/u);
      assert.match(notice,/CC BY 4\.0/u);
      assert.match(notice,/Bearbeidelse:/u);
    } else if (photo.id === "yakitori") {
      assert.equal(photo.catalogId, "yakitori");
      assert.equal(photo.photoLicense, "https://www.pexels.com/license/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/yakitori-LICENSE.txt");
      assert.match(photo.photoCredit, /Airam Dato-on.*Pexels/u);
      const notice = readFileSync(path.join(imageRoot,"yakitori-LICENSE.txt"),"utf8");
      assert.match(notice, /Fotograf: Airam Dato-on/u);
      assert.match(notice, /Pexels License/u);
    } else if (photo.id === "katsu") {
      assert.equal(photo.catalogId,"katsu");
      assert.equal(photo.photoLicense,"https://www.pexels.com/license/");
      assert.equal(photo.photoLicenseNotice,"/dish-images/chicken-katsu-LICENSE.txt");
      assert.match(photo.photoCredit,/Cohesion Singapore.*Pexels/u);
      const notice=readFileSync(path.join(imageRoot,"chicken-katsu-LICENSE.txt"),"utf8");
      assert.match(notice,/Fotograf: Cohesion Singapore/u);
      assert.match(notice,/Pexels License/u);
    } else if (photo.id === "dosa") {
      assert.equal(photo.catalogId,"dosa");
      assert.equal(photo.photoLicense,"https://www.pexels.com/license/");
      assert.equal(photo.photoLicenseNotice,"/dish-images/masala-dosa-LICENSE.txt");
      assert.match(photo.photoCredit,/Jack Baghel.*Pexels/u);
      const notice=readFileSync(path.join(imageRoot,"masala-dosa-LICENSE.txt"),"utf8");
      assert.match(notice,/Fotograf: Jack Baghel/u);
      assert.match(notice,/Pexels License/u);
    } else if (photo.id === "chana-masala") {
      assert.equal(photo.catalogId,"chana-masala");
      assert.equal(photo.photoLicense,"https://www.pexels.com/license/");
      assert.equal(photo.photoLicenseNotice,"/dish-images/chana-masala-LICENSE.txt");
      assert.match(photo.photoCredit,/Muhammad Khawar Nazir.*Pexels/u);
      const notice=readFileSync(path.join(imageRoot,"chana-masala-LICENSE.txt"),"utf8");
      assert.match(notice,/Fotograf: Muhammad Khawar Nazir/u);
      assert.match(notice,/Pexels License/u);
    } else if (photo.id === "tacos-al-pastor") {
      assert.equal(photo.catalogId, "tacos-al-pastor");
      assert.equal(photo.photoLicense, "https://www.pexels.com/license/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/tacos-al-pastor-LICENSE.txt");
      assert.match(photo.photoCredit, /Abner Velázquez.*Pexels/u);
      const notice = readFileSync(path.join(imageRoot, "tacos-al-pastor-LICENSE.txt"), "utf8");
      assert.match(notice, /Fotograf: Abner Velázquez/u);
      assert.match(notice, /Pexels License/u);
    } else if (photo.id === "falafel") {
      assert.equal(photo.catalogId,"falafel");
      assert.equal(photo.photoLicense,"https://www.pexels.com/license/");
      assert.equal(photo.photoLicenseNotice,"/dish-images/falafel-LICENSE.txt");
      assert.match(photo.photoCredit,/Saya P.*Pexels/u);
      const notice=readFileSync(path.join(imageRoot,"falafel-LICENSE.txt"),"utf8");
      assert.match(notice,/Fotograf: Saya P/u);
      assert.match(notice,/Pexels License/u);
    } else if (photo.id === "pizza-prosciutto") {
      assert.match(photo.photoSource, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/u);
      assert.match(photo.photoCredit, /Amin.*CC BY-SA 4\.0/u);
      assert.equal(photo.photoLicense, "https://creativecommons.org/licenses/by-sa/4.0/");
      assert.equal(photo.photoLicenseNotice, "/dish-images/pizza-prosciutto-LICENSE.txt");
      const notice = readFileSync(path.join(imageRoot, "pizza-prosciutto-LICENSE.txt"), "utf8");
      assert.match(notice, /Foto: Amin/u);
      assert.match(notice, /CC BY-SA 4\.0/u);
    } else if (Object.hasOwn(reusedPhotoProvenance, photo.id)) {
      const [source, credit, license, noticePath] = reusedPhotoProvenance[photo.id];
      assert.equal(photo.photoSource, source);
      assert.equal(photo.photoCredit, credit);
      assert.equal(photo.photoLicense, license);
      assert.equal(photo.photoLicenseNotice, noticePath);
      const notice = readFileSync(path.join(imageRoot, path.basename(noticePath)), "utf8");
      assert.ok(notice.includes(source), photo.id + " source notice");
      assert.ok(notice.includes(license), photo.id + " license notice");
    } else if (photo.index >= 44) {
      // New photos may use a documented licensed source other than Pexels.
      assert.match(photo.photoSource, /^https:\/\//u);
      assert.match(photo.photoLicense, /^https:\/\//u);
      assert.ok(photo.photoCredit?.trim());
      assert.match(photo.photoLicenseNotice, /^\/dish-images\/[a-z0-9-]+-LICENSE\.txt$/u);
      const notice = readFileSync(path.join(imageRoot, path.basename(photo.photoLicenseNotice)), "utf8");
      assert.ok(notice.includes(photo.photoSource), photo.id + ": exact source notice");
      assert.ok(notice.includes(photo.photoLicense), photo.id + ": exact license notice");
    } else {
      assert.match(photo.photoSource, /^https:\/\/www\.pexels\.com\/photo\//u);
      assert.match(photo.photoCredit, /Pexels/u);
    }
  }
});
