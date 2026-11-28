import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, URL } from "node:url";

const web = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const gallery = readFileSync(path.join(web, "components/dish-photo-gallery.tsx"), "utf8");
const editorialImage = readFileSync(path.join(web, "components/dish-editorial-image.tsx"), "utf8");
const originalGalleryIds = [...gallery.matchAll(/\{ id: "([^"]+)", label: "([^"]+)", query: "([^"]+)" \}/gu)].map((match) => match[1]);
const explorer = readFileSync(path.join(web, "components/cuisine-explorer.tsx"), "utf8");
const layout = readFileSync(path.join(web, "app/layout.tsx"), "utf8");
const browse = readFileSync(path.join(web, "components/dish-browse.tsx"), "utf8");
const browseStyles = readFileSync(path.join(web, "styles/dish-browse.css"), "utf8");
const css = readFileSync(path.join(web, "styles/dish-photos.css"), "utf8");
const homeGalleryCss = readFileSync(path.join(web, "styles/home-discovery-refresh.css"), "utf8");
const atlas = readFileSync(path.join(web, "public/dish-images/collection.avif"));
const pizzaMargherita = readFileSync(path.join(web, "public/dish-images/pizza-margherita-thumb-512.avif"));
const cheeseburger = readFileSync(path.join(web, "public/dish-images/cheeseburger-thumb-512.avif"));
const grilledSalmon = readFileSync(path.join(web, "public/dish-images/grillet-laks-thumb-512.avif"));
const sushiImage = readFileSync(path.join(web, "public/dish-images/sushi-thumb-512.avif"));
const ramenImage = readFileSync(path.join(web, "public/dish-images/ramen-thumb-512.avif"));
const isBologneseImage = readFileSync(path.join(web, "public/dish-images/pasta-bolognese-thumb-512.avif"));
const isProsciuttoImage = readFileSync(path.join(web, "public/dish-images/pizza-prosciutto-thumb-512.avif"));
const isKebabPitaImage = readFileSync(path.join(web, "public/dish-images/kebab-pita-thumb-512.avif"));
const whiteFishImage = readFileSync(path.join(web, "public/dish-images/stekt-hvit-fisk-thumb-512.avif"));
const bibimbapImage = readFileSync(path.join(web, "public/dish-images/bibimbap-thumb-512.avif"));
const tacosAlPastorImage = readFileSync(path.join(web, "public/dish-images/tacos-al-pastor-thumb-512.avif"));
const gyozaImage = readFileSync(path.join(web, "public/dish-images/gyoza-thumb-512.avif"));
const marinaraImage = readFileSync(path.join(web, "public/dish-images/pizza-marinara-thumb-512.avif"));
const falafelImage = readFileSync(path.join(web, "public/dish-images/falafel-thumb-512.avif"));
const cacioEPepeImage = readFileSync(path.join(web, "public/dish-images/cacio-e-pepe-thumb-512.avif"));
const chanaMasalaImage = readFileSync(path.join(web, "public/dish-images/chana-masala-thumb-512.avif"));
const masalaDosaImage = readFileSync(path.join(web, "public/dish-images/masala-dosa-thumb-512.avif"));
const chickenKatsuImage = readFileSync(path.join(web, "public/dish-images/chicken-katsu-thumb-512.avif"));
const yakitoriImage = readFileSync(path.join(web, "public/dish-images/yakitori-thumb-512.avif"));
const udonTempuraImage = readFileSync(path.join(web, "public/dish-images/udon-tempura-thumb-512.avif"));
const shrimpPadThaiImage = readFileSync(path.join(web, "public/dish-images/pad-thai-reker-thumb-512.avif"));
const tiramisuImage = readFileSync(path.join(web, "public/dish-images/tiramisu-thumb-512.avif"));
const carbonaraImage = readFileSync(path.join(web, "public/dish-images/carbonara-thumb-512.avif"));
const butterChickenImage = readFileSync(path.join(web, "public/dish-images/butter-chicken-thumb-512.avif"));
const grilledSteak = readFileSync(path.join(web, "public/dish-images/grillet-biff-thumb-512.avif"));
const shrimpOpenSandwich = readFileSync(path.join(web, "public/dish-images/rekesmorbrod-thumb-512.avif"));
const series04 = readFileSync(path.join(web, "public/dish-images/series-04.avif"));
const tomYum = readFileSync(path.join(web, "public/dish-images/tom-yum-thumb-512.avif"));
const sambar = readFileSync(path.join(web, "public/dish-images/sambar-thumb-512.avif"));
const pho = readFileSync(path.join(web, "public/dish-images/pho-bo-thumb-512.avif"));
const manifest = JSON.parse(readFileSync(path.join(web, "public/dish-images/manifest.json"), "utf8"));
const catalog = readFileSync(path.join(web, "content/food-knowledge/catalog.ts"), "utf8");
const galleryIds = [...originalGalleryIds, ...manifest.images.slice(originalGalleryIds.length).map(image => image.id)];

test("Matlyst preserves the original forty-four curated images and allows reviewed additions", () => {
  const entries = [...gallery.matchAll(/\{ id: "([^"]+)", label: "([^"]+)", query: "([^"]+)" \}/gu)];
  assert.equal(entries.length, 44);
  assert.equal(new Set(entries.map((match) => match[1])).size, 44);
  assert.ok(entries.every((match) => match[2].length > 0 && match[3].length > 0));
  assert.deepEqual(originalGalleryIds, manifest.images.slice(0, 44).map(image => image.id));
  assert.deepEqual(galleryIds, manifest.images.map((image) => image.id));
  assert.match(gallery, /manifest\.images\.slice\(originalIllustratedDishes\.length\)/u);
  assert.match(gallery, /Utforsk \{illustratedDishes\.length\} retter/u);
  assert.match(gallery, /<DishEditorialImage dishId=\{dish\.id\}/u);
});

test("Dish illustrations are available and explicitly not restaurant photographs", () => {
  assert.equal(atlas.toString("ascii", 4, 12), "ftypavif");
  assert.ok(statSync(path.join(web, "public/dish-images/collection.avif")).size > 80000);
  assert.match(gallery, /Illustrasjoner og foto av rettetyper, ikke restaurantbilder/u);
  assert.doesNotMatch(gallery, /restaurantName|restaurantId|sourceUrl/u);
  assert.match(css, /background:\s*#000 url\("\/dish-images\/collection\.avif\?v=7a428369"\)/u);
  assert.match(css, /600% 400%/u);
  const ispeIndex = atlas.indexOf(Buffer.from("ispe"));
  assert.ok(ispeIndex > 0, "AVIF image spatial extents box must exist");
  assert.equal(atlas.readUInt32BE(ispeIndex + 8), 1920);
  assert.equal(atlas.readUInt32BE(ispeIndex + 12), 1280);
  assert.equal(series04.toString("ascii", 4, 12), "ftypavif");
  assert.ok(statSync(path.join(web, "public/dish-images/series-04.avif")).size > 45000);
  const series04ExtentIndex = series04.indexOf(Buffer.from("ispe"));
  assert.ok(series04ExtentIndex > 0);
  assert.equal(series04.readUInt32BE(series04ExtentIndex + 8), 1152);
  assert.equal(series04.readUInt32BE(series04ExtentIndex + 12), 1152);
  assert.match(css, /dishPhotoThumb\.dishPhotoSeries04/u);
  assert.match(css, /300% 300%/u);
  assert.match(layout, /dish-photos\.css/u);
  assert.match(explorer, /<DishPhotoGallery city=\{city\} \/>/u);
});

test("Image cards link to dish search rather than inventing restaurant availability", () => {
  assert.match(gallery, /dishSearchHref\(dish\.query, city\)/u);
  assert.match(gallery, /Se menytreff/u);
  assert.doesNotMatch(gallery, /Åpent nå|Tilgjengelig nå/u);
});

test("Ramen photo is a true 7364x4909 master with a separate compact thumbnail and exact license", () => {
  const ramen = manifest.images.find((item) => item.id === "ramen");
  assert.ok(ramen, "Ramen entry is required");
  assert.equal(ramen.kind, "Redaksjonelt rettfoto");
  assert.equal(ramen.largeViewEnabled, true);
  assert.equal(ramen.largeSource, "ramen-master-7364.avif");
  assert.equal(ramen.atlas, "ramen-thumb-512.avif");
  assert.equal(ramen.largeSourceNativeWidth, 7364);
  assert.equal(ramen.largeSourceNativeHeight, 4909);
  assert.match(ramen.photoSource, /35773142/u);
  assert.match(ramen.photoCredit, /Connor Scott McManus.*Pexels/u);
  assert.ok(manifest.images.some((entry) => entry.largeViewEnabled === true && entry.largeSource === "ramen-master-7364.avif" && galleryIds.includes(entry.id)));
  assert.match(css, /ramen-thumb-512\.avif/u);
  const original = readFileSync(path.join(web, "public/dish-images", ramen.largeSource));
  const index = original.indexOf(Buffer.from("ispe"));
  assert.ok(index > 0, "Ramen large AVIF must expose a valid ispe header");
  assert.equal(original.readUInt32BE(index + 8), 7364);
  assert.equal(original.readUInt32BE(index + 12), 4909);
});

test("Only approved full-size dish masters render inline, without enlarging thumbnails", () => {
  const approved = manifest.images.filter((image) => image.largeViewEnabled === true);
  assert.ok(approved.length >= 27, "Previously approved masters must not regress");
  assert.match(gallery, /<DishEditorialImage dishId=\{dish\.id\}/u);
  assert.match(editorialImage, /image\.largeViewEnabled === true && image\.largeSource/u);
  assert.match(editorialImage, /master \|\| image\.atlas/u);
  assert.match(editorialImage, /src=\{withPublicBasePath/u);
  assert.match(editorialImage, /image\.photoCredit/u);
  assert.match(editorialImage, /image\.photoLicense/u);
  assert.doesNotMatch(gallery, /Vis stort bilde|dishPhotosLargeLinks/u);
  assert.match(gallery, /Se menytreff/u);
  assert.match(homeGalleryCss, /object-fit: contain/u);
  for (const photo of approved) {
    assert.ok(galleryIds.includes(photo.id));
    assert.notEqual(photo.atlas, photo.largeSource, "Small thumbnails and full-size masters must be distinct");
    const fullSize = readFileSync(path.join(web, "public/dish-images", photo.largeSource));
    const header = fullSize.indexOf(Buffer.from("ispe"));
    assert.ok(header > 0, photo.id + ": valid AVIF spatial dimensions");
    assert.ok(fullSize.readUInt32BE(header + 8) >= 1600);
    assert.ok(fullSize.readUInt32BE(header + 12) >= 1600);
  }
});

test("Existing Matlyst editorial cards use only explicitly mapped illustration IDs", () => {
  assert.match(gallery, /const editorialPhotoIndex/u);
  assert.match(gallery, /if \(index === undefined\) return null/u);
  assert.match(gallery, /ikke restaurantfoto/u);
  assert.match(explorer, /<DishPhotoThumbnail dishId=\{dish\.id\} label=\{dish\.label\} \/>/u);
  assert.match(browse, /<DishPhotoThumbnail dishId=\{dish\.id\} label=\{dish\.label\} \/>/u);
  assert.doesNotMatch(gallery, /fuzzyMatch|includes\(dish\.name\)/u);
});

test("New editorial imagery maps only real catalog dishes, not non-catalog bibimbap", () => {
  const mapped = gallery.slice(gallery.indexOf("const editorialPhotoIndex:"), gallery.indexOf("export function DishPhotoThumbnail"));
  for (const id of ["pizza-marinara", "cacio-e-pepe", "gyoza", "pho", "falafel", "tacos-al-pastor", "chana-masala", "dosa"]) {
    assert.ok(mapped.includes(id), `Missing exact editorial mapping for ${id}`);
  }
  assert.doesNotMatch(mapped, /bibimbap/u);
});

test("Every exact editorial image maps to a genuine food knowledge dish", () => {
  const catalogIds = new Set([...catalog.matchAll(/\bid:\s*"([^"]+)"/gu)].map((match) => match[1]));
  const mappingBlock = gallery.slice(gallery.indexOf("const editorialPhotoIndex"), gallery.indexOf("export function DishPhotoThumbnail"));
  const mappedIds = [...mappingBlock.matchAll(/^\s*(?:"([^"]+)"|([a-z][a-z0-9-]*)):\s*\d+,/gmu)].map((match) => match[1] || match[2]);
  assert.equal(new Set(mappedIds).size, mappedIds.length, "Duplicate editorial image IDs");
  assert.equal(mappedIds.length, 34);
  for (const id of mappedIds) assert.ok(catalogIds.has(id), `Editorial image has no catalog dish: ${id}`);
});

test("Every generated and approved image is represented in the published Matlyst gallery", () => {
  const entries = [...gallery.matchAll(/\{ id: "([^"]+)", label: "([^"]+)", query: "([^"]+)" \}/gu)];
  assert.equal(manifest.version, 1);
  assert.ok(manifest.images.length >= 44);
  assert.deepEqual(manifest.images.slice(0, 44).map((entry) => entry.id), entries.map((match) => match[1]));
  for (const [index, image] of manifest.images.slice(0, 44).entries()) {
    assert.equal(image.index, index);
    assert.equal(image.atlas, index === 0 ? "pizza-margherita-thumb-512.avif" : index === 1 ? "cheeseburger-thumb-512.avif" : index === 2 ? "grillet-laks-thumb-512.avif" : index === 3 ? "grillet-biff-thumb-512.avif" : index === 4 ? "rekesmorbrod-thumb-512.avif" : index === 5 ? "sushi-thumb-512.avif" : index === 6 ? "ramen-thumb-512.avif" : index === 7 ? "pasta-bolognese-thumb-512.avif" : index === 8 ? "pizza-prosciutto-thumb-512.avif" : index === 9 ? "kebab-pita-thumb-512.avif" : index === 10 ? "carbonara-thumb-512.avif" : index === 11 ? "butter-chicken-thumb-512.avif" : index === 12 ? "pad-thai-reker-thumb-512.avif" : index === 13 ? "stekt-hvit-fisk-thumb-512.avif" : index === 14 ? "tiramisu-thumb-512.avif" : index === 15 ? "pizza-marinara-thumb-512.avif" : index === 16 ? "cacio-e-pepe-thumb-512.avif" : index === 17 ? "gyoza-thumb-512.avif" : index === 18 ? "pho-bo-thumb-512.avif" : index === 19 ? "bibimbap-thumb-512.avif" : index === 20 ? "falafel-thumb-512.avif" : index === 21 ? "tacos-al-pastor-thumb-512.avif" : index === 22 ? "chana-masala-thumb-512.avif" : index === 23 ? "masala-dosa-thumb-512.avif" : index === 24 ? "chicken-katsu-thumb-512.avif" : index === 25 ? "yakitori-thumb-512.avif" : index === 26 ? "udon-tempura-thumb-512.avif" : index === 27 ? "bao-braised-pork-thumb-512.avif" : index === 28 ? "dumplings-thumb-512.avif" : index === 29 ? "mapo-tofu-thumb-512.avif" : index === 30 ? "peking-duck-thumb-512.avif" : index === 31 ? "dan-dan-noodles-thumb-512.avif" : index === 32 ? "green-curry-thumb-512.avif" : index === 33 ? "tom-yum-thumb-512.avif" : index === 34 ? "pad-kra-pao-thumb-512.avif" : index === 35 ? "banh-mi-thumb-512.avif" : index === 36 ? "bun-cha-thumb-512.avif" : index === 37 ? "goi-cuon-thumb-512.avif" : index === 38 ? "tandoori-chicken-thumb-512.avif" : index === 39 ? "naan-thumb-512.avif" : index === 40 ? "dal-makhani-thumb-512.avif" : index === 41 ? "idli-thumb-512.avif" : index === 42 ? "sambar-thumb-512.avif" : "medu-vada-thumb-512.avif");
    assert.equal(image.surface, "Matlyst");
    assert.equal(image.kind, "Redaksjonelt rettfoto");
  }
  assert.match(explorer, /<DishPhotoGallery city=\{city\} \/>/u);
  assert.match(gallery, /dishSearchHref\(dish\.query, city\)/u);
  assert.match(gallery, /dishPhotoSeries04/u);
});

test("The nine newly produced dishes are visible and maintain variant-specific alt text", () => {
  for (const id of ["katsu", "yakitori", "udon", "bao", "dumplings",
    "mapo-tofu", "peking-duck", "dan-dan-noodles", "green-curry"]) {
    assert.ok(gallery.includes(`id: "${id}"`));
    assert.match(gallery, new RegExp(`\\b${id}\\b`, "u"));
  }
  assert.match(gallery, /illustratedVariants/u);
  assert.match(gallery, /restaurantfoto/u);
  assert.match(css, /series-04\.avif/u);
});

test("Live All Dishes lists display photos only for exact canonical dish names", () => {
  assert.match(browse, /const exactPhotoDish = knowledgeDish/u);
  assert.match(browse, /normalizeDiscoveryText\(candidate\) === normalizeDiscoveryText\(dish\.name\)/u);
  assert.match(browse, /<DishPhotoThumbnail dishId=\{exactPhotoDish\.id\} label=\{exactPhotoDish\.name\} \/>/u);
  assert.match(browse, /<div className="dishBrowseItemContent">/u);
  assert.match(browseStyles, /\.dishBrowseItemMain > \.dishPhotoSmall/u);
  assert.match(browseStyles, /background-color:\s*#000/u);
  assert.doesNotMatch(browse, /includes\(dish\.name\).*DishPhotoThumbnail/u);
});

test("Pad Thai uses the source-verified shrimp photo only for the correct variant", () => {
  assert.match(gallery, /"pad-thai": 12/u);
  assert.match(gallery, /"pad-thai": "pad thai med reker"/u);
  assert.doesNotMatch(gallery, /dishPhotoPadThai/u);
  assert.match(css, /pad-thai-reker-thumb-512[.]avif/u);
  assert.equal(manifest.images[12].kind, "Redaksjonelt rettfoto");
});


test("High-resolution food photos remain sharp on phones and iPads", () => {
  assert.equal(atlas.readUInt32BE(atlas.indexOf(Buffer.from("ispe")) + 8) / 6, 320);
  assert.equal(series04.readUInt32BE(series04.indexOf(Buffer.from("ispe")) + 8) / 3, 384);
  assert.match(css, /max-width:\s*150px/u);
  assert.match(css, /max-width:\s*144px/u);
  assert.match(css, /collection\.avif\?v=7a428369/u);
  assert.match(css, /series-04\.avif\?v=ae60b6f1/u);
  assert.match(css, /\.dishPhotoCard \.dishPhotoThumb/u);
  assert.doesNotMatch(css, /grid-template-columns:\s*64px\s+minmax/u);
  assert.doesNotMatch(css, /image-rendering:\s*pixelated/u);
});

test("Tom yum is a dedicated, sharp 512px image with precise editorial placement", () => {
  assert.equal(tomYum.toString("ascii", 4, 12), "ftypavif");
  assert.ok(tomYum.length > 15000);
  const marker = tomYum.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0, "AVIF image size marker is required");
  assert.equal(tomYum.readUInt32BE(marker + 8), 512);
  assert.equal(tomYum.readUInt32BE(marker + 12), 512);
  assert.match(gallery, /id: "tom-yum", label: "Tom yum med reker"/u);
  assert.match(gallery, /"tom-yum": 33/u);
  assert.match(gallery, /index === 33/u);
  assert.match(css, /dishPhotoThumb\.dishPhotoTomYum/u);
  assert.match(css, /tom-yum-thumb-512\.avif/u);
  assert.ok(manifest.images.some((image) =>
    image.id === "tom-yum" && image.catalogId === "tom-yum" && image.variantCaution.includes("reker")));
});


test("Phở bò uses source-verified full master and separate 512px thumbnail", () => {
  assert.equal(pho.toString("ascii", 4, 12), "ftypavif");
  assert.ok(pho.length > 20000);
  const marker = pho.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(pho.readUInt32BE(marker + 8), 512);
  assert.equal(pho.readUInt32BE(marker + 12), 512);
  assert.equal(galleryIds[18], manifest.images[18].id);

  assert.match(gallery, /dishPhotoSmall dishPhotoPho/u);
  assert.match(css, /pho-bo-thumb-512\.avif/u);
  const photo = manifest.images.find((entry) => entry.id === "pho");
  assert.equal(photo.atlas, "pho-bo-thumb-512.avif");
  assert.equal(photo.kind, "Redaksjonelt rettfoto");
  assert.equal(photo.largeViewEnabled, true);
  assert.equal(photo.largeSource, "pho-bo-master-5472.avif");
  assert.equal(photo.largeSourceNativeWidth, 5472);
  assert.equal(photo.largeSourceNativeHeight, 3648);
  assert.match(photo.photoCredit, /UNDO KIM.*Pexels/u);
  assert.match(photo.photoSource, /^https:\/\/www\.pexels\.com\/photo\//u);
  assert.ok(manifest.images.some((entry) => entry.largeViewEnabled === true && entry.largeSource === "pho-bo-master-5472.avif" && galleryIds.includes(entry.id)));
  assert.match(photo.variantCaution, /storfekjøtt/u);
});

test("Pizza margherita uses its own sharp 512px source instead of atlas slot zero", () => {
  assert.equal(pizzaMargherita.toString("ascii", 4, 12), "ftypavif");
  assert.ok(pizzaMargherita.length > 8500);
  const marker = pizzaMargherita.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0, "Dedicated AVIF requires its own spatial size metadata");
  assert.equal(pizzaMargherita.readUInt32BE(marker + 8), 512);
  assert.equal(pizzaMargherita.readUInt32BE(marker + 12), 512);
  assert.equal(manifest.images[0].id, "pizza-margherita");
  assert.equal(manifest.images[0].atlas, "pizza-margherita-thumb-512.avif");
  assert.match(manifest.images[0].variantCaution, /ikke faktisk restaurantfoto/u);
  assert.equal(galleryIds[0], manifest.images[0].id);

  assert.match(gallery, /dishPhotoSmall dishPhotoPizzaMargherita/u);
  assert.match(css, /dishPhotoThumb\.dishPhotoPizzaMargherita/u);
  assert.match(css, /dishPhotoSmall\.dishPhotoPizzaMargherita/u);
  assert.match(css, /pizza-margherita-thumb-512\.avif/u);
});

test("Bacon cheeseburger has a dedicated sharp source without a fabricated catalog/restaurant photo mapping", () => {
  assert.equal(cheeseburger.toString("ascii", 4, 12), "ftypavif");
  assert.ok(cheeseburger.length > 8000);
  const marker = cheeseburger.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(cheeseburger.readUInt32BE(marker + 8), 512);
  assert.equal(cheeseburger.readUInt32BE(marker + 12), 512);
  assert.equal(manifest.images[1].id, "cheeseburger");
  assert.equal(manifest.images[1].atlas, "cheeseburger-thumb-512.avif");
  assert.match(manifest.images[1].variantCaution, /ikke et faktisk restaurantfoto/u);
  assert.equal(galleryIds[1], manifest.images[1].id);

  assert.match(css, /dishPhotoThumb\.dishPhotoCheeseburger/u);
  assert.match(css, /cheeseburger-thumb-512\.avif/u);
  const mapping = gallery.slice(gallery.indexOf("const editorialPhotoIndex"), gallery.indexOf("const illustratedVariants"));
  assert.doesNotMatch(mapping, /^\s*cheeseburger:/mu);
});

test("Grilled salmon has a standalone 512px image and no invented restaurant or editorial-catalog identity", () => {
  assert.equal(grilledSalmon.toString("ascii", 4, 12), "ftypavif");
  assert.ok(grilledSalmon.length > 8000);
  const marker = grilledSalmon.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(grilledSalmon.readUInt32BE(marker + 8), 512);
  assert.equal(grilledSalmon.readUInt32BE(marker + 12), 512);
  assert.equal(manifest.images[2].id, "grillet-laks");
  assert.equal(manifest.images[2].atlas, "grillet-laks-thumb-512.avif");
  assert.equal(manifest.images[2].catalogId, null);
  assert.match(manifest.images[2].variantCaution, /ikke faktisk restaurantfoto/iu);
  assert.equal(galleryIds[2], manifest.images[2].id);

  assert.match(css, /grillet-laks-thumb-512\.avif/u);
  const mapping = gallery.slice(gallery.indexOf("const editorialPhotoIndex"), gallery.indexOf("export function DishPhotoThumbnail"));
  assert.doesNotMatch(mapping, /^\s*"?grillet-laks"?:/mu);
});

test("Steak and shrimp sandwich use separate, sharp 512px gallery originals", () => {
  for (const [bytes, index, id, , file] of [
    [grilledSteak, 3, "grillet-biff", "dishPhotoGrilledSteak", "grillet-biff-thumb-512.avif"],
    [shrimpOpenSandwich, 4, "rekesmorbrod", "dishPhotoShrimpOpenSandwich", "rekesmorbrod-thumb-512.avif"],
  ]) {
    assert.equal(bytes.toString("ascii", 4, 12), "ftypavif");
    assert.ok(bytes.length > 7000);
    const marker = bytes.indexOf(Buffer.from("ispe"));
    assert.ok(marker > 0);
    assert.equal(bytes.readUInt32BE(marker + 8), 512);
    assert.equal(bytes.readUInt32BE(marker + 12), 512);
    assert.equal(manifest.images[index].id, id);
    assert.equal(manifest.images[index].atlas, file);
    assert.equal(manifest.images[index].catalogId, null);
    assert.match(manifest.images[index].variantCaution, /ikke .*restaurant/iu);
    assert.equal(galleryIds[index], manifest.images[index].id);
    assert.ok(css.includes(file));
  }
  const mapping = gallery.slice(gallery.indexOf("const editorialPhotoIndex"), gallery.indexOf("export function DishPhotoThumbnail"));
  assert.doesNotMatch(mapping, /^\s*"?grillet-biff"?:/mu);
  assert.doesNotMatch(mapping, /^\s*"?rekesmorbrod"?:/mu);
});

test("Sambar uses its reviewed native photo and independent 512px thumbnail", () => {
  const image = manifest.images[42];
  assert.equal(image.id, "sambar");
  assert.equal(image.catalogId, "sambar");
  assert.equal(image.kind, "Redaksjonelt rettfoto");
  assert.equal(image.atlas, "sambar-thumb-512.avif");
  assert.equal(image.largeSource, "sambar-master-2721.avif");
  assert.equal(image.largeViewEnabled, true);
  assert.equal(image.photoCredit, "Raksanand / Wikimedia Commons · CC BY-SA 4.0 · manuell frilegging");
  assert.equal(image.photoSource, "https://commons.wikimedia.org/wiki/File:Tiffin_sambar.jpg");
  assert.equal(image.photoLicense, "https://creativecommons.org/licenses/by-sa/4.0/");
  assert.equal(image.variantCaution, "Tiffin sambar, sørindisk linsegryte i kobberkar, med koriander. Serveringsvariant; ikke restaurantfoto fra Fysen. Ingredienser og allergener kan ikke utledes fra bildet.");
  const master = readFileSync(path.join(web, "public/dish-images", image.largeSource));
  for (const [bytes, width, height, sha] of [[sambar, 512, 512, "3851e78ccd54bf2c4086592dee832d3f1a0f5ceb54bddc36c311f7cf64392c63"], [master, 2721, 3162, "625135bf1e8bf6289b9fdc622d663031e895113897b4f324262f41fd31ea8b78"]]) {
    assert.equal(bytes.toString("ascii", 4, 12), "ftypavif");
    const marker = bytes.indexOf(Buffer.from("ispe"));
    assert.ok(marker > 0);
    assert.equal(bytes.readUInt32BE(marker + 8), width);
    assert.equal(bytes.readUInt32BE(marker + 12), height);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), sha);
  }
  assert.match(gallery, /id: "sambar", label: "Tiffin sambar med linser"/u);
  assert.match(gallery, /sambar: 42/u);
  assert.equal(galleryIds[42], image.id);
  assert.match(css, /sambar-thumb-512\.avif/u);
  assert.match(gallery, /Utforsk \{illustratedDishes\.length\} retter/u);

});

test("Four standalone dish photos preserve exact variants and suitable native thumbnails", () => {
  for (const {index, id, file, bytes, cssClass, catalogId} of [
    {index: 5, id: "sushi", file: "sushi-thumb-512.avif", bytes: sushiImage, cssClass: "dishPhotoSushi", catalogId: "sushi"},
    {index: 6, id: "ramen", file: "ramen-thumb-512.avif", bytes: ramenImage, cssClass: "dishPhotoRamen", catalogId: "ramen"},
    {index: 10, id: "pasta-carbonara", file: "carbonara-thumb-512.avif", bytes: carbonaraImage, cssClass: "dishPhotoCarbonara", catalogId: null},
    {index: 11, id: "butter-chicken", file: "butter-chicken-thumb-512.avif", bytes: butterChickenImage, cssClass: "dishPhotoButterChicken", catalogId: "butter-chicken"}
  ]) {
    const item = manifest.images[index];
    assert.equal(item.id, id);
    assert.equal(item.atlas, file);
    assert.equal(item.catalogId, catalogId);
    assert.match(item.variantCaution, /ikke restaurantfoto/iu);
    assert.equal(bytes.toString("ascii", 4, 12), "ftypavif");
    assert.ok(bytes.length > 15000);
    const marker = bytes.indexOf(Buffer.from("ispe"));
    assert.ok(marker > 0);
    assert.equal(bytes.readUInt32BE(marker + 8), [5,6,10,11].includes(index) ? 512 : 768);
    assert.equal(bytes.readUInt32BE(marker + 12), [5,6,10,11].includes(index) ? 512 : 768);
    assert.ok(css.includes(".dishPhotoThumb." + cssClass));
    assert.ok(css.includes(".dishPhotoSmall." + cssClass));
    assert.ok(css.includes(file));
    assert.ok(gallery.includes("index === " + index));
    assert.equal(galleryIds[index], manifest.images[index].id);
  }
  assert.match(gallery, /chashu-svinekjøtt/u);
  assert.match(gallery, /spaghetti carbonara med bacon, egg, ost og pepper/u);
});

test("Gyoza is a real source-verified 4937px photo with 512px mini and no invented filling", () => {
  assert.equal(gyozaImage.toString("ascii", 4, 12), "ftypavif");
  assert.ok(gyozaImage.length > 18000);
  const ispe = gyozaImage.indexOf(Buffer.from("ispe"));
  assert.ok(ispe > 0);
  assert.equal(gyozaImage.readUInt32BE(ispe + 8), 512);
  assert.equal(gyozaImage.readUInt32BE(ispe + 12), 512);
  const item = manifest.images[17];
  assert.equal(item.id, "gyoza");
  assert.equal(item.catalogId, "gyoza");
  assert.equal(item.atlas, "gyoza-thumb-512.avif");
  assert.equal(item.kind, "Redaksjonelt rettfoto");
  assert.equal(item.largeViewEnabled, true);
  assert.equal(item.largeSource, "gyoza-master-4937.avif");
  assert.equal(item.largeSourceNativeWidth, 4937);
  assert.equal(item.largeSourceNativeHeight, 3662);
  assert.match(item.photoCredit, /Lara Bellens.*Pexels/u);
  assert.match(item.photoSource, /^https:\/\/www\.pexels\.com\/photo\//u);
  assert.ok(manifest.images.some((entry) => entry.largeViewEnabled === true && entry.largeSource === "gyoza-master-4937.avif" && galleryIds.includes(entry.id)));
  assert.match(item.variantCaution, /fyllet er ikke dokumentert/iu);
  assert.match(item.variantCaution, /ikke.*restaurantfoto/iu);
  assert.equal(galleryIds[17], manifest.images[17].id);

  assert.ok(css.includes(".dishPhotoThumb.dishPhotoGyoza"));
  assert.ok(css.includes("gyoza-thumb-512.avif"));
});

test("Shrimp pad thai and tiramisu are dedicated Retina-safe gallery images with accurate variants", () => {
  for (const { index, id, file, image, cssClass } of [
    { index: 12, id: "pad-thai-reker", file: "pad-thai-reker-thumb-512.avif", image: shrimpPadThaiImage, cssClass: "dishPhotoShrimpPadThai" },
    { index: 14, id: "tiramisu", file: "tiramisu-thumb-512.avif", image: tiramisuImage, cssClass: "dishPhotoTiramisu" },
  ]) {
    assert.equal(image.toString("ascii", 4, 12), "ftypavif");
    assert.ok(image.length > 18000, id + " unexpectedly small");
    const ispe = image.indexOf(Buffer.from("ispe"));
    assert.ok(ispe > 0);
    assert.equal(image.readUInt32BE(ispe + 8), [12,14].includes(index) ? 512 : 768);
    assert.equal(image.readUInt32BE(ispe + 12), [12,14].includes(index) ? 512 : 768);
    const item = manifest.images[index];
    assert.equal(item.id, id);
    assert.equal(item.atlas, file);
    assert.equal(item.catalogId, null, "Generic restaurant dishes must not inherit an unverified image variant");
    assert.match(item.variantCaution, /ikke restaurantfoto/iu);
    assert.equal(galleryIds[index], manifest.images[index].id);
    assert.ok(css.includes(".dishPhotoThumb." + cssClass));
    assert.ok(css.includes(file));
  }
  assert.match(manifest.images[12].variantCaution, /reker|skalldyr/iu);
  assert.match(manifest.images[12].variantCaution, /ikke et generelt bilde/iu);
  assert.match(manifest.images[14].variantCaution, /mascarpone/iu);
  assert.equal(galleryIds[12], manifest.images[12].id);
  assert.equal(galleryIds[14], manifest.images[14].id);
  assert.doesNotMatch(css, /\.dishPhotoSmall\.dishPhotoShrimpPadThai/u);
});

test("Pizza marinara uses a separate authentic native master and compact 512 AVIF", () => {
  const p = manifest.images[15];
  assert.equal(p.id, "pizza-marinara");
  assert.equal(p.catalogId, "pizza-marinara");
  assert.equal(p.kind, "Redaksjonelt rettfoto");
  assert.equal(p.largeViewEnabled, true);
  assert.equal(p.atlas, "pizza-marinara-thumb-512.avif");
  assert.equal(p.largeSource, "pizza-marinara-master-2848.avif");
  assert.equal(p.largeSourceNativeWidth, 2848);
  assert.equal(p.largeSourceNativeHeight, 2136);
  assert.match(p.photoCredit, /Peter Van den Bossche.*CC BY-SA 2\.0/u);
  assert.match(p.photoSource, /commons\.wikimedia\.org/u);
  assert.match(p.variantCaution, /uten ost/u);
  assert.match(p.variantCaution, /ikke bruk som pizza margherita/iu);
  const marker = marinaraImage.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(marinaraImage.readUInt32BE(marker + 8), 512);
  assert.equal(marinaraImage.readUInt32BE(marker + 12), 512);
  assert.ok(manifest.images.some((entry) => entry.largeViewEnabled === true && entry.largeSource === "pizza-marinara-master-2848.avif" && galleryIds.includes(entry.id)));
  assert.match(css, /pizza-marinara-thumb-512\.avif/u);
  assert.match(gallery, /pizza marinara uten ost/u);
});

test("Falafel has a real native master and 512px original-photo thumbnail", () => {
  for (const { index, id, file, bytes, className } of [
    { index: 20, id: "falafel", file: "falafel-thumb-512.avif", bytes: falafelImage, className: "dishPhotoFalafel" },
  ]) {
    assert.equal(bytes.toString("ascii", 4, 12), "ftypavif");
    assert.ok(bytes.length > 30000, id + " image is unexpectedly tiny");
    const marker = bytes.indexOf(Buffer.from("ispe"));
    assert.ok(marker > 0);
    assert.equal(bytes.readUInt32BE(marker + 8), 512);
    assert.equal(bytes.readUInt32BE(marker + 12), 512);
    const item = manifest.images[index];
    assert.equal(item.id, id);
    assert.equal(item.catalogId, id);
    assert.equal(item.atlas, file);
    assert.match(item.variantCaution, /ikke restaurantfoto/iu);
    assert.ok(gallery.includes("index === " + index));

    assert.ok(gallery.includes("dishPhotoSmall " + className));
    assert.ok(css.includes(".dishPhotoThumb." + className));
    assert.ok(css.includes(".dishPhotoSmall." + className));
    assert.ok(css.includes(file));
  }
  assert.match(manifest.images[15].variantCaution, /uten ost/iu);
  assert.match(manifest.images[15].variantCaution, /ikke bruk som pizza margherita/iu);
  assert.match(gallery, /pizza marinara uten ost/u);
  assert.match(manifest.images[20].variantCaution, /hummus/u);
  assert.match(gallery, /falafel med kikerter/u);
  const photo=manifest.images[20];
  assert.equal(photo.kind, "Redaksjonelt rettfoto");
  assert.equal(photo.largeViewEnabled, true);
  assert.equal(photo.largeSource, "falafel-master-4284.avif");
  assert.equal(photo.largeSourceNativeWidth, 4284);
  assert.equal(photo.largeSourceNativeHeight, 5712);
  assert.match(photo.photoCredit, /Saya P.*Pexels/u);
  assert.match(photo.photoSource, /pexels\.com\/photo\/delicious-falafel/u);
  assert.ok(manifest.images.some((entry) => entry.largeViewEnabled === true && entry.largeSource === "falafel-master-4284.avif" && galleryIds.includes(entry.id)));
});

test("Cacio e pepe has verified 4577px native master, genuine credit, and a separate 512px thumbnail", () => {
  const photo = manifest.images[16];
  assert.equal(photo.id, "cacio-e-pepe");
  assert.equal(photo.kind, "Redaksjonelt rettfoto");
  assert.equal(photo.catalogId, "cacio-e-pepe");
  assert.equal(photo.atlas, "cacio-e-pepe-thumb-512.avif");
  assert.equal(photo.largeSource, "cacio-e-pepe-master-4577.avif");
  assert.equal(photo.largeSourceNativeWidth, 4577);
  assert.equal(photo.largeSourceNativeHeight, 2498);
  assert.equal(photo.largeViewEnabled, true);
  assert.match(photo.photoCredit, /DocteurCosmos.*CC BY-SA 3\.0/u);
  assert.match(photo.photoSource, /commons\.wikimedia\.org/u);
  assert.match(photo.variantCaution, /pecorino/u);
  assert.match(photo.variantCaution, /ikke restaurantfoto/iu);
  const ispe = cacioEPepeImage.indexOf(Buffer.from("ispe"));
  assert.ok(ispe > 0);
  assert.equal(cacioEPepeImage.readUInt32BE(ispe + 8), 512);
  assert.equal(cacioEPepeImage.readUInt32BE(ispe + 12), 512);
  assert.ok(manifest.images.some((entry) => entry.largeViewEnabled === true && entry.largeSource === "cacio-e-pepe-master-4577.avif" && galleryIds.includes(entry.id)));
  assert.match(css, /cacio-e-pepe-thumb-512\.avif/u);
});

test("Chana and masala dosa have dedicated sharp native photo thumbnails", () => {
  for (const { index, id, file, bytes, cssClass, keyword } of [
    { index: 22, id: "chana-masala", file: "chana-masala-thumb-512.avif", bytes: chanaMasalaImage, cssClass: "ChanaMasala", keyword: /kikerter/u },
    { index: 23, id: "dosa", file: "masala-dosa-thumb-512.avif", bytes: masalaDosaImage, cssClass: "MasalaDosa", keyword: /potetfyll/u },
  ]) {
    const item = manifest.images[index];
    assert.equal(item.id, id);
    assert.equal(item.atlas, file);
    assert.equal(item.catalogId, id);
    assert.match(item.variantCaution, keyword);
    assert.match(item.variantCaution, /ikke restaurantfoto/iu);
    assert.equal(bytes.toString("ascii", 4, 12), "ftypavif");
    assert.ok(bytes.length > 20000, id + " appears to be a placeholder");
    const ispe = bytes.indexOf(Buffer.from("ispe"));
    assert.ok(ispe > 0, id + " lacks an AVIF spatial extent marker");
    assert.equal(bytes.readUInt32BE(ispe + 8), 512);
    assert.equal(bytes.readUInt32BE(ispe + 12), 512);
    assert.equal(galleryIds[index], manifest.images[index].id);

    assert.ok(gallery.includes("dishPhotoSmall dishPhoto" + cssClass));
    assert.ok(css.includes("dishPhotoThumb.dishPhoto" + cssClass));
    assert.ok(css.includes("dishPhotoSmall.dishPhoto" + cssClass));
    assert.ok(css.includes(file));
    if (index === 23) {
      assert.equal(item.kind, "Redaksjonelt rettfoto");
      assert.equal(item.largeViewEnabled, true);
      assert.equal(item.largeSource, "masala-dosa-master-9504.avif");
      assert.equal(item.largeSourceNativeWidth, 9504);
      assert.equal(item.largeSourceNativeHeight, 6336);
      assert.match(item.photoCredit, /Jack Baghel.*Pexels/u);
      assert.ok(manifest.images.some((entry) => entry.largeViewEnabled === true && entry.largeSource === "masala-dosa-master-9504.avif" && galleryIds.includes(entry.id)));
    }
    if (index === 22) {
      assert.equal(item.kind, "Redaksjonelt rettfoto");
      assert.equal(item.largeViewEnabled, true);
      assert.equal(item.largeSource, "chana-masala-master-3814.avif");
      assert.equal(item.largeSourceNativeWidth, 3814);
      assert.equal(item.largeSourceNativeHeight, 3024);
      assert.match(item.photoCredit, /Muhammad Khawar Nazir.*Pexels/u);
      assert.ok(manifest.images.some((entry) => entry.largeViewEnabled === true && entry.largeSource === "chana-masala-master-3814.avif" && galleryIds.includes(entry.id)));
    }
  }
});

test("Bolognese, prosciutto and kebab retain distinct correctly sized gallery AVIF images", () => {
  const expected = [
    { index: 7, id: "pasta-bolognese", file: "pasta-bolognese-thumb-512.avif", bytes: isBologneseImage, cls: "dishPhotoBolognese", selector: "isBolognese" },
    { index: 8, id: "pizza-prosciutto", file: "pizza-prosciutto-thumb-512.avif", bytes: isProsciuttoImage, cls: "dishPhotoProsciutto", selector: "isProsciutto" },
    { index: 9, id: "kebab-pita", file: "kebab-pita-thumb-512.avif", bytes: isKebabPitaImage, cls: "dishPhotoKebabPita", selector: "isKebabPita" }
  ];
  for (const entry of expected) {
    assert.equal(entry.bytes.toString("ascii", 4, 12), "ftypavif");
    if (entry.index === 9) {
      // Verify the exact source-masked native photo thumbnail.
      assert.ok(entry.bytes.length > 5000);
      assert.equal(createHash("sha256").update(entry.bytes).digest("hex"),
        "509a0f41ba9c652610538d9572c8322abfc5faf41a6c0c5e698aabfbe03554de");
      assert.equal(manifest.images[9].largeViewEnabled, true);
      assert.equal(manifest.images[9].largeSource, "kebab-pita-master-4000.avif");
      assert.equal(manifest.images[9].kind, "Redaksjonelt rettfoto");
    } else {
      assert.ok(entry.bytes.length > (entry.index === 7 ? 12000 : 25000));
    }
    const ispe = entry.bytes.indexOf(Buffer.from("ispe"));
    assert.ok(ispe > 0);
    assert.equal(entry.bytes.readUInt32BE(ispe + 8), [7,8,9].includes(entry.index) ? 512 : 768);
    assert.equal(entry.bytes.readUInt32BE(ispe + 12), [7,8,9].includes(entry.index) ? 512 : 768);
    const row = manifest.images[entry.index];
    assert.equal(row.id, entry.id);
    assert.equal(row.atlas, entry.file);
    assert.equal(row.catalogId, null);
    assert.match(row.variantCaution, /ikke restaurantfoto/iu);
    assert.ok(css.includes(".dishPhotoThumb." + entry.cls));
    assert.ok(css.includes(entry.file));
    assert.equal(galleryIds[entry.index], entry.id);

    assert.ok(!css.includes(".dishPhotoSmall." + entry.cls));
  }
  const catalog = gallery.slice(gallery.indexOf("const editorialPhotoIndex"), gallery.indexOf("const illustratedVariants"));
  assert.doesNotMatch(catalog, /"pasta-bolognese"|"pizza-prosciutto"|"kebab-pita"/u);
});


test("Bibimbap photo is CC0 original at 8160px, with compact 512px thumb and no catalog link", () => {
  const b=manifest.images[19];
  assert.equal(b.catalogId,null);
  assert.equal(b.kind,"Redaksjonelt rettfoto");
  assert.equal(b.largeViewEnabled,true);
  assert.equal(b.largeSource,"bibimbap-master-8160.avif");
  assert.equal(b.largeSourceNativeWidth,8160);
  assert.equal(b.largeSourceNativeHeight,6144);
  assert.match(b.photoCredit,/Andy Li.*CC0 1\.0/u);
  assert.equal(b.photoLicense,"https://creativecommons.org/publicdomain/zero/1.0/");
  assert.ok(manifest.images.some((entry) => entry.largeViewEnabled === true && entry.largeSource === "bibimbap-master-8160.avif" && galleryIds.includes(entry.id)));
  const mapped=gallery.slice(gallery.indexOf("const editorialPhotoIndex:"),gallery.indexOf("const illustratedVariants"));
  assert.doesNotMatch(mapped,/bibimbap/u);
});

test("White fish, beef bibimbap and pork tacos al pastor have exact separate dish images", () => {
  for (const { index, id, file, bytes, thumb, catalogId, ingredient } of [
    { index: 13, id: "stekt-hvit-fisk", file: "stekt-hvit-fisk-thumb-512.avif", bytes: whiteFishImage, thumb: "WhiteFish", catalogId: null, ingredient: /fisk/u },
    { index: 19, id: "bibimbap", file: "bibimbap-thumb-512.avif", bytes: bibimbapImage, thumb: "Bibimbap", catalogId: null, ingredient: /storfekjøtt/u },
    { index: 21, id: "tacos-al-pastor", file: "tacos-al-pastor-thumb-512.avif", bytes: tacosAlPastorImage, thumb: "TacosAlPastor", catalogId: "tacos-al-pastor", ingredient: /svinekjøtt/u },
  ]) {
    assert.equal(bytes.toString("ascii", 4, 12), "ftypavif");
    assert.ok(bytes.length > 20000, id + " must contain meaningful picture data");
    const marker = bytes.indexOf(Buffer.from("ispe"));
    assert.ok(marker > 0);
    assert.equal(bytes.readUInt32BE(marker + 8), [13,19,21].includes(index) ? 512 : 768);
    assert.equal(bytes.readUInt32BE(marker + 12), [13,19,21].includes(index) ? 512 : 768);
    const item = manifest.images[index];
    assert.equal(item.id, id);
    assert.equal(item.atlas, file);
    assert.equal(item.catalogId, catalogId);
    assert.match(item.variantCaution, ingredient);
    assert.match(item.variantCaution, /ikke restaurantfoto/iu);
    assert.equal(galleryIds[index], id);

    assert.ok(css.includes(".dishPhotoThumb.dishPhoto" + thumb));
    assert.ok(css.includes(file));
  }
  assert.match(manifest.images[13].variantCaution, /fiskeart.*ikke bekreftet/iu);
  assert.match(manifest.images[19].variantCaution, /ikke vegetarisk/iu);
  assert.match(manifest.images[21].variantCaution, /ananas/iu);
  assert.equal(manifest.images[21].kind, "Redaksjonelt rettfoto");
  assert.equal(manifest.images[21].largeViewEnabled, true);
  assert.equal(manifest.images[21].largeSource, "tacos-al-pastor-master-7008.avif");
  assert.equal(manifest.images[21].largeSourceNativeWidth, 7008);
  assert.equal(manifest.images[21].largeSourceNativeHeight, 4672);
  assert.match(manifest.images[21].photoCredit, /Abner Velázquez.*Pexels/u);
  assert.ok(manifest.images.some((entry) => entry.largeViewEnabled === true && entry.largeSource === "tacos-al-pastor-master-7008.avif" && galleryIds.includes(entry.id)));
  assert.ok(gallery.includes("dishPhotoSmall dishPhotoTacosAlPastor"));
  assert.ok(css.includes(".dishPhotoSmall.dishPhotoTacosAlPastor"));
  assert.match(gallery, /"tacos-al-pastor": "tacos al pastor med marinert svinekjøtt/u);
  assert.doesNotMatch(css, /\.dishPhotoSmall\.dishPhotoWhiteFish/u);
  assert.doesNotMatch(css, /\.dishPhotoSmall\.dishPhotoBibimbap/u);
  const mapped = gallery.slice(gallery.indexOf("const editorialPhotoIndex:"), gallery.indexOf("const illustratedVariants"));
  assert.doesNotMatch(mapped, /bibimbap|stekt-hvit-fisk/u);
});


test("Chicken katsu, yakitori and udon have independent original-photo thumbnails", () => {
  const cases = [
    { index: 24, id: "katsu", file: "chicken-katsu-thumb-512.avif", bytes: chickenKatsuImage, cls: "ChickenKatsu", variant: /kylling/u },
    { index: 25, id: "yakitori", file: "yakitori-thumb-512.avif", bytes: yakitoriImage, cls: "Yakitori", variant: /kyllingspyd/u },
    { index: 26, id: "udon", file: "udon-tempura-thumb-512.avif", bytes: udonTempuraImage, cls: "UdonTempura", variant: /reketempura|skalldyr/u }
  ];
  for (const entry of cases) {
    const image = manifest.images[entry.index];
    assert.equal(image.id, entry.id);
    assert.equal(image.catalogId, entry.id);
    assert.equal(image.atlas, entry.file);
    assert.match(image.variantCaution, entry.variant);
    assert.match(image.variantCaution, /ikke restaurantfoto/iu);
    assert.equal(entry.bytes.toString("ascii", 4, 12), "ftypavif");
    assert.ok(entry.bytes.length > ([24,25,26].includes(entry.index) ? 10000 : 20000), entry.file + " is unexpectedly small");
    const marker = entry.bytes.indexOf(Buffer.from("ispe"));
    assert.ok(marker > 0);
    assert.equal(entry.bytes.readUInt32BE(marker + 8), [24,25,26].includes(entry.index) ? 512 : 768);
    assert.equal(entry.bytes.readUInt32BE(marker + 12), [24,25,26].includes(entry.index) ? 512 : 768);
    const selector = "is" + entry.cls + " = index === " + entry.index;
    assert.equal(galleryIds[entry.index], entry.id, selector);
    for (const scope of [".dishPhotoThumb.", ".dishPhotoSmall."]) {
      const classname = "dishPhoto" + entry.cls;
      assert.ok(css.includes(scope + classname));
      if (scope === ".dishPhotoSmall.") assert.ok(gallery.includes("dishPhotoSmall " + classname));
    }
    assert.ok(css.includes(entry.file));
    if (entry.index === 26) {
      assert.equal(image.kind, "Redaksjonelt rettfoto");
      assert.equal(image.largeViewEnabled, true);
      assert.equal(image.largeSource, "udon-tempura-master-2900.avif");
      assert.equal(image.largeSourceNativeWidth, 2900);
      assert.equal(image.largeSourceNativeHeight, 3080);
      assert.match(image.photoCredit, /Immanuelle.*CC BY 4\.0/u);
      assert.ok(manifest.images.some((entry) => entry.largeViewEnabled === true && entry.largeSource === "udon-tempura-master-2900.avif" && galleryIds.includes(entry.id)));
    }
    if (entry.index === 25) {
      assert.equal(image.kind, "Redaksjonelt rettfoto");
      assert.equal(image.largeViewEnabled, true);
      assert.equal(image.largeSource, "yakitori-master-4000.avif");
      assert.equal(image.largeSourceNativeWidth, 4000);
      assert.equal(image.largeSourceNativeHeight, 5000);
      assert.match(image.photoCredit, /Airam Dato-on.*Pexels/u);
      assert.ok(manifest.images.some((entry) => entry.largeViewEnabled === true && entry.largeSource === "yakitori-master-4000.avif" && galleryIds.includes(entry.id)));
    }
    if (entry.index === 24) {
      assert.equal(image.kind, "Redaksjonelt rettfoto");
      assert.equal(image.largeViewEnabled, true);
      assert.equal(image.largeSource, "chicken-katsu-master-5472.avif");
      assert.equal(image.largeSourceNativeWidth, 5472);
      assert.equal(image.largeSourceNativeHeight, 3648);
      assert.match(image.photoCredit, /Cohesion Singapore.*Pexels/u);
      assert.ok(manifest.images.some((entry) => entry.largeViewEnabled === true && entry.largeSource === "chicken-katsu-master-5472.avif" && galleryIds.includes(entry.id)));
    }
  }
  assert.match(manifest.images[24].variantCaution, /ikke svin|ikke vegetar/iu);
  assert.match(manifest.images[26].variantCaution, /ikke vegansk/u);
});

test("Integrating native photos must preserve approved Tom yum, kebab and the gallery API", () => {
  const tomYum = manifest.images.find((photo) => photo.id === "tom-yum");
  assert.ok(tomYum);
  assert.equal(tomYum.largeSource, "tom-yum-master-3334.avif");
  assert.equal(tomYum.largeSourceSha256, "724dd7286e4fb7b09f1f0e1a33fdc8ede679becd046fcdd0f6b582dbb07c30ae");
  assert.equal(tomYum.largeSourceOriginalSha256, "a5a6e255d32995dd9da84b9c7bd899d9107cfd50ddfe2a3809c009e531e686d4");
  assert.match(gallery, /aria-label="Redaksjonelt foto av tom yum med reker og sopp, ikke restaurantfoto"/u);

  const kebab = manifest.images.find((photo) => photo.id === "kebab-pita");
  assert.ok(kebab);
  assert.equal(kebab.atlas, "kebab-pita-thumb-512.avif");
  assert.equal(kebab.kind, "Redaksjonelt rettfoto");
  assert.equal(kebab.largeViewEnabled, true);
  assert.equal(kebab.largeSourceSha256, "5e5dde9494b8d7825dca03ab4d6c80b32f4f4a4c3f4793a4120a78752d15d1e9");
  assert.equal(kebab.largeSourceOriginalSha256, "010b26762efa2628ed12dc7ff9b2f971a3c81e7a4c42a0678429b4ef05fad4e2");
  assert.equal(kebab.aiMaskProcessed, true);
  assert.equal(kebab.generatedFoodPixels, false);
  assert.equal(kebab.upscaled, false);
  assert.match(css, /dishPhotoKebabPita[^\n]*kebab-pita-thumb-512\.avif/u);
  assert.match(gallery, /export function hasDishPhotoThumbnail\(dishId: string\): boolean/u);
});

test("Reused 15 dish photos retain exact identity, separate 512px thumbnails and verified native masters", () => {
  const cases = [
  {
    "id": "bao",
    "index": 27,
    "atlas": "bao-braised-pork-thumb-512.avif",
    "master": "bao-braised-pork-master-5160.avif",
    "catalogId": "bao",
    "width": 5160,
    "height": 3400,
    "sha": "60c0aefea89c6530c0e7d3c61fb79241eca4033546cfd60182a2e36716867519",
    "caution": "Autentisk foto av taiwansk gua bao med rødbraisert svinekjøtt og synlige syltede sennepsblader, knuste peanøtter og koriander. Dette er ikke vegetarisk. Kilden oppgir også soya; allergener må kontrolleres hos hver enkelt restaurant. Bildet er tatt hos Tiger Bites Pig i Brighton, ikke restaurantfoto fra Fysen. Ingen påstand om agurk eller syltet rødløk."
  },
  {
    "id": "dumplings",
    "index": 28,
    "atlas": "dumplings-thumb-512.avif",
    "master": "dumplings-master-4100.avif",
    "catalogId": "dumplings",
    "width": 4100,
    "height": 3200,
    "sha": "9b8b25920dfe230ac55f314bd21b84f68ce95f7ee76918007f6ab00241031a4d",
    "caution": "Lisensiert, autentisk redaksjonelt foto av tre dampede dumplings med svarte sesamfrø i hel treskål med spisepinner, mot svart bakgrunn. Fyllet er ikke dokumentert: kjøtt, vegetarstatus og allergener må sjekkes hos restauranten. Kildebildet viser ikke chili- eller soyadipp. Dette er ikke restaurantfoto fra en bestemt Fysen-restaurant."
  },
  {
    "id": "mapo-tofu",
    "index": 29,
    "atlas": "mapo-tofu-thumb-512.avif",
    "master": "mapo-tofu-master-3825.avif",
    "catalogId": "mapo-tofu",
    "width": 3825,
    "height": 2868,
    "sha": "cad3785b7c835ab7c0e347e6f45932bac64393c954ab7a016bf35db3416722f1",
    "caution": "Redaksjonelt foto av mapo tofu i hel svart skål med tofu, rød saus og grønt. Fotoet er ikke restaurantfoto fra Fysen. Kjøttype og allergener må sjekkes hos restauranten."
  },
  {
    "id": "peking-duck",
    "index": 30,
    "atlas": "peking-duck-thumb-512.avif",
    "master": "peking-duck-master-4800.avif",
    "catalogId": "peking-duck",
    "width": 4800,
    "height": 2940,
    "sha": "ffff9d8dcfe0ce6384c989dd3a5a107ddf1c66208775863e564573b8d3857b15",
    "caution": "Redaksjonelt foto av pekingand med tynne pannekaker, agurk og mørk saus. Fotoet viser en servering fra Duck Victoria. Innhold i sausen varierer mellom restauranter."
  },
  {
    "id": "dan-dan-noodles",
    "index": 31,
    "atlas": "dan-dan-noodles-thumb-512.avif",
    "master": "dan-dan-noodles-master-3600.avif",
    "catalogId": "dan-dan-noodles",
    "width": 3600,
    "height": 2940,
    "sha": "eb7068004cd3d9ec914ff8b2fc34230376686352f5643350fa88f47f71526fc1",
    "caution": "Redaksjonelt foto av dan dan-nudler med kjøttdeig i rød saus. Fotoet er ikke restaurantfoto fra Fysen. Kjøttype, peanøtter og øvrige allergener må sjekkes hos restauranten."
  },
  {
    "id": "green-curry",
    "index": 32,
    "atlas": "green-curry-thumb-512.avif",
    "master": "green-curry-master-3300.avif",
    "catalogId": "green-curry",
    "width": 3300,
    "height": 2750,
    "sha": "516bf8d1ef61ea082ba4b5734530cb1bf4cfe7b231c80232f5c57ea0fda46b3e",
    "caution": "Redaksjonelt foto av grønn curry med kylling, grønnsaker og ris. Fotoet er ikke restaurantfoto fra Fysen."
  },
  {
    "id": "pad-kra-pao",
    "index": 34,
    "atlas": "pad-kra-pao-thumb-512.avif",
    "master": "pad-kra-pao-master-3940.avif",
    "catalogId": "pad-kra-pao",
    "width": 3940,
    "height": 2960,
    "sha": "f8637b9ecf422943a5e25730d1651ceccb9ff8f4ece6b70c925051ef629343b3",
    "caution": "Redaksjonelt foto av pad kra pao med svinekjøtt, hellig basilikum, ris og speilegg. Fotoet er ikke restaurantfoto fra Fysen."
  },
  {
    "id": "banh-mi",
    "index": 35,
    "atlas": "banh-mi-thumb-512.avif",
    "master": "banh-mi-master-5056.avif",
    "catalogId": "banh-mi",
    "width": 5056,
    "height": 2816,
    "sha": "1626701fc42f0d2aff3a3ee6d48439dbdec06104c076a672d8461388a1ec7c67",
    "caution": "Redaksjonelt foto av bánh mì med stekt svinekjøtt og vietnamesisk karridressing. Fotoet viser én variant av retten."
  },
  {
    "id": "bun-cha",
    "index": 36,
    "atlas": "bun-cha-thumb-512.avif",
    "master": "bun-cha-master-3488.avif",
    "catalogId": "bun-cha",
    "width": 3488,
    "height": 2640,
    "sha": "2854f36db0ae80d8275a2eb0599e12c2556b547072892ca974200cf76df20626",
    "caution": "Redaksjonelt foto av bún chả med grillet svinekjøtt, risnudler, urter, chili og hvitløk."
  },
  {
    "id": "vietnamese-spring-rolls",
    "index": 37,
    "atlas": "goi-cuon-thumb-512.avif",
    "master": "goi-cuon-master-6960.avif",
    "catalogId": "vietnamese-spring-rolls",
    "width": 6960,
    "height": 3940,
    "sha": "b8c806f0a0319dbf427bae9fbdf749e3a693d38946a4b568e5b6eb6d073fd3d3",
    "caution": "Redaksjonelt foto av to ferske rispapirruller med reker og urter, servert med dipp."
  },
  {
    "id": "tandoori",
    "index": 38,
    "atlas": "tandoori-chicken-thumb-512.avif",
    "master": "tandoori-chicken-master-3815.avif",
    "catalogId": "tandoori",
    "width": 3815,
    "height": 1930,
    "sha": "2cecc6284b189d602b8b02edc0ef29af69a7f3167d973a3583d95c577df9cdf9",
    "caution": "Redaksjonelt foto av tandoorigrillet kylling med salat og sitron i serveringspanne."
  },
  {
    "id": "naan",
    "index": 39,
    "atlas": "naan-thumb-512.avif",
    "master": "naan-master-3752.avif",
    "catalogId": "naan",
    "width": 3752,
    "height": 2496,
    "sha": "b48b7c966ed6c44828f40f993e807d0ec5e578960feedccbb0903cae6da91f94",
    "caution": "Redaksjonelt foto av hvitløksnaan med urter. Inneholder vanligvis hvete og kan inneholde melk."
  },
  {
    "id": "dal-makhani",
    "index": 40,
    "atlas": "dal-makhani-thumb-512.avif",
    "master": "dal-makhani-master-3520.avif",
    "catalogId": "dal-makhani",
    "width": 3520,
    "height": 2880,
    "sha": "66809187972b53949e99df5c86005caf423b3ca9167f858b84a36209a80c9536",
    "caution": "Redaksjonelt foto av dal makhani med smør og fløte. Inneholder melk og er uegnet ved melkeallergi."
  },
  {
    "id": "idli",
    "index": 41,
    "atlas": "idli-thumb-512.avif",
    "master": "idli-master-3072.avif",
    "catalogId": "idli",
    "width": 3072,
    "height": 3072,
    "sha": "06a57e8f3a8d5d6399899172bee0f715bee0fd76b1c7b55cab8a38edad7034b2",
    "caution": "Redaksjonelt foto av dampede ris- og linsekaker med sambar og kokoschutney. Serveringsvariant, ikke restaurantfoto."
  },
  {
    "id": "vada",
    "index": 43,
    "atlas": "medu-vada-thumb-512.avif",
    "master": "medu-vada-master-8160.avif",
    "catalogId": "vada",
    "width": 8160,
    "height": 6144,
    "sha": "ad4f401725daa1d7aa5b94e0b3c480187e33d5edce862bbd079837a6b2c9320d",
    "caution": "Medu vada med sambar og chutney. Redaksjonelt foto med AI-assistert frilegging, ikke restaurantfoto fra Fysen."
  }
];
  for (const expected of cases) {
    const image = manifest.images[expected.index];
    assert.equal(galleryIds[expected.index], expected.id);
    assert.equal(image.id, expected.id);
    assert.equal(image.catalogId, expected.catalogId);
    assert.equal(image.kind, "Redaksjonelt rettfoto");
    assert.equal(image.atlas, expected.atlas);
    assert.equal(image.largeSource, expected.master);
    assert.equal(image.largeViewEnabled, true);
    assert.equal(image.variantCaution, expected.caution);
    const thumbnail = readFileSync(path.join(web, "public/dish-images", expected.atlas));
    const master = readFileSync(path.join(web, "public/dish-images", expected.master));
    for (const [bytes, width, height] of [[thumbnail, 512, 512], [master, expected.width, expected.height]]) {
      assert.equal(bytes.toString("ascii", 4, 12), "ftypavif", expected.id);
      const marker = bytes.indexOf(Buffer.from("ispe"));
      assert.ok(marker > 0);
      assert.equal(bytes.readUInt32BE(marker + 8), width);
      assert.equal(bytes.readUInt32BE(marker + 12), height);
    }
    assert.equal(createHash("sha256").update(master).digest("hex"), expected.sha);
  }
  assert.ok(manifest.images.length >= 44);
  assert.equal(manifest.images.filter((row) => ["series-04.avif", "collection.avif"].includes(row.atlas)).length, 0);
});

test("New image slots use canonical identities, registered thumbnails and separate full-size assets", () => {
  const catalogIds = new Set([...catalog.matchAll(/(?:\bid|"id")\s*:\s*"([^"]+)"/gu)].map(match => match[1]));
  assert.match(gallery, /image\.catalogId === dishId && image\.id === dishId/u);
  assert.match(gallery, /additional\.atlas/u);
  assert.match(css, /\.dishPhotoSmall\.dishPhotoRegistered/u);
  for (const [index, image] of manifest.images.entries()) {
    assert.equal(image.index, index);
    if (index < 44) continue;
    assert.equal(image.id, image.catalogId);
    assert.ok(catalogIds.has(image.id));
    assert.equal(image.surface, "Matlyst");
    assert.equal(image.largeViewEnabled, true);
    assert.notEqual(image.atlas, image.largeSource);
    const bytes = readFileSync(path.join(web, "public/dish-images", image.atlas));
    const marker = bytes.indexOf(Buffer.from("ispe"));
    assert.ok(marker > 0);
    assert.equal(bytes.readUInt32BE(marker + 8), 512);
    assert.equal(bytes.readUInt32BE(marker + 12), 512);
  }
});
