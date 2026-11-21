import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, URL } from "node:url";

const web = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const gallery = readFileSync(path.join(web, "components/dish-photo-gallery.tsx"), "utf8");
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
const isKebabPitaImage = readFileSync(path.join(web, "public/dish-images/kebab-pita-768.avif"));
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
const baoImage = readFileSync(path.join(web, "public/dish-images/bao-braised-pork-thumb-512.avif"));
const dumplingsImage = readFileSync(path.join(web, "public/dish-images/dumplings-thumb-512.avif"));
const mapoTofuImage = readFileSync(path.join(web, "public/dish-images/mapo-tofu-thumb-512.avif"));
const pekingDuckImage = readFileSync(path.join(web, "public/dish-images/peking-duck-768.avif"));
const danDanNoodlesImage = readFileSync(path.join(web, "public/dish-images/dan-dan-noodles-768.avif"));
const greenCurryImage = readFileSync(path.join(web, "public/dish-images/green-curry-768.avif"));
const shrimpPadThaiImage = readFileSync(path.join(web, "public/dish-images/pad-thai-reker-thumb-512.avif"));
const tiramisuImage = readFileSync(path.join(web, "public/dish-images/tiramisu-thumb-512.avif"));
const carbonaraImage = readFileSync(path.join(web, "public/dish-images/carbonara-thumb-512.avif"));
const butterChickenImage = readFileSync(path.join(web, "public/dish-images/butter-chicken-thumb-512.avif"));
const grilledSteak = readFileSync(path.join(web, "public/dish-images/grillet-biff-thumb-512.avif"));
const shrimpOpenSandwich = readFileSync(path.join(web, "public/dish-images/rekesmorbrod-thumb-512.avif"));
const series04 = readFileSync(path.join(web, "public/dish-images/series-04.avif"));
const tomYum = readFileSync(path.join(web, "public/dish-images/tom-yum-512.avif"));
const padKraPao = readFileSync(path.join(web, "public/dish-images/pad-kra-pao-384.avif"));
const banhMi = readFileSync(path.join(web, "public/dish-images/banh-mi-512.avif"));
const bunCha = readFileSync(path.join(web, "public/dish-images/bun-cha-512.avif"));
const goiCuon = readFileSync(path.join(web, "public/dish-images/goi-cuon-768.avif"));
const tandoori = readFileSync(path.join(web, "public/dish-images/tandoori-chicken-768.avif"));
const naan = readFileSync(path.join(web, "public/dish-images/naan-768.avif"));
const dalMakhani = readFileSync(path.join(web, "public/dish-images/dal-makhani-768.avif"));
const idli = readFileSync(path.join(web, "public/dish-images/idli-512.avif"));
const sambar = readFileSync(path.join(web, "public/dish-images/sambar-768.avif"));
const vada = readFileSync(path.join(web, "public/dish-images/medu-vada-768.avif"));
const pho = readFileSync(path.join(web, "public/dish-images/pho-bo-thumb-512.avif"));
const manifest = JSON.parse(readFileSync(path.join(web, "public/dish-images/manifest.json"), "utf8"));
const catalog = readFileSync(path.join(web, "content/food-knowledge/catalog.ts"), "utf8");

test("Matlyst has exactly forty-four distinct, curated dish illustrations", () => {
  const entries = [...gallery.matchAll(/\{ id: "([^"]+)", label: "([^"]+)", query: "([^"]+)" \}/gu)];
  assert.equal(entries.length, 44);
  assert.equal(new Set(entries.map((match) => match[1])).size, 44);
  assert.ok(entries.every((match) => match[2].length > 0 && match[3].length > 0));
  assert.match(gallery, /index % 6/u);
  assert.match(gallery, /Math\.floor\(index \/ 6\)/u);
  assert.match(gallery, /column \* 20/u);
  assert.match(gallery, /row \* 100\) \/ 3/u);
  assert.match(gallery, /index >= 24/u);
  assert.match(gallery, /column \* 50/u);
  assert.match(gallery, /row \* 50/u);
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
  assert.match(explorer, /<DishPhotoGallery \/>/u);
});

test("Image cards link to dish search rather than inventing restaurant availability", () => {
  assert.match(gallery, /dishSearchHref\(dish\.query\)/u);
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
  assert.match(gallery, /href="\/dish-images\/ramen-master-7364\.avif"/u);
  assert.match(css, /ramen-thumb-512\.avif/u);
  const original = readFileSync(path.join(web, "public/dish-images", ramen.largeSource));
  const index = original.indexOf(Buffer.from("ispe"));
  assert.ok(index > 0, "Ramen large AVIF must expose a valid ispe header");
  assert.equal(original.readUInt32BE(index + 8), 7364);
  assert.equal(original.readUInt32BE(index + 12), 4909);
});

test("Only approved full-size dish masters can be opened separately without enlarging thumbnails", () => {
  const approved = manifest.images.filter((image) => image.largeViewEnabled === true);
  const linkedMasters = [...gallery.matchAll(/href="\/dish-images\/([^"]+-master-\d+\.avif)"/gu)]
    .map((match) => match[1]);
  assert.equal(approved.length, 29, "Pizza margherita, cheeseburger, grilled salmon, grilled steak, shrimp sandwich, sushi, ramen, bolognese, prosciutto, carbonara, butter chicken, shrimp pad thai, seared white fish, tiramisu, pizza marinara, cacio e pepe, gyoza, phở bò, bibimbap falafel and tacos al pastor, chana masala, masala dosa, chicken katsu, yakitori, udon med reketempura, braised pork bao, steamed dumplings and mapo tofu need approved full-size masters");
  assert.deepEqual(linkedMasters, approved.map((image) => image.largeSource));
  assert.match(gallery, /dishPhotosLargeLinks/u);
  assert.match(gallery, /target="_blank" rel="noopener noreferrer"/u);
  assert.match(gallery, /Se menytreff/u, "Do not replace menu-search links with image links");
  assert.match(homeGalleryCss, /\.dishPhotosLargeLinks/u);
  assert.match(homeGalleryCss, /grid-template-columns:\s*68px\s+minmax\(0,\s*1fr\)/u);
  for (const photo of approved) {
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
  assert.equal(manifest.images.length, 44);
  assert.deepEqual(manifest.images.map((entry) => entry.id), entries.map((match) => match[1]));
  for (const [index, image] of manifest.images.entries()) {
    assert.equal(image.index, index);
    assert.equal(image.atlas, index === 0 ? "pizza-margherita-thumb-512.avif" : index === 1 ? "cheeseburger-thumb-512.avif" : index === 2 ? "grillet-laks-thumb-512.avif" : index === 3 ? "grillet-biff-thumb-512.avif" : index === 4 ? "rekesmorbrod-thumb-512.avif" : index === 5 ? "sushi-thumb-512.avif" : index === 6 ? "ramen-thumb-512.avif" : index === 7 ? "pasta-bolognese-thumb-512.avif" : index === 8 ? "pizza-prosciutto-thumb-512.avif" : index === 9 ? "kebab-pita-768.avif" : index === 10 ? "carbonara-thumb-512.avif" : index === 11 ? "butter-chicken-thumb-512.avif" : index === 12 ? "pad-thai-reker-thumb-512.avif" : index === 13 ? "stekt-hvit-fisk-thumb-512.avif" : index === 14 ? "tiramisu-thumb-512.avif" : index === 15 ? "pizza-marinara-thumb-512.avif" : index === 16 ? "cacio-e-pepe-thumb-512.avif" : index === 17 ? "gyoza-thumb-512.avif" : index === 18 ? "pho-bo-thumb-512.avif" : index === 19 ? "bibimbap-thumb-512.avif" : index === 20 ? "falafel-thumb-512.avif" : index === 21 ? "tacos-al-pastor-thumb-512.avif" : index === 22 ? "chana-masala-thumb-512.avif" : index === 23 ? "masala-dosa-thumb-512.avif" : index === 24 ? "chicken-katsu-thumb-512.avif" : index === 25 ? "yakitori-thumb-512.avif" : index === 26 ? "udon-tempura-thumb-512.avif" : index === 27 ? "bao-braised-pork-thumb-512.avif" : index === 28 ? "dumplings-thumb-512.avif" : index === 29 ? "mapo-tofu-thumb-512.avif" : index === 30 ? "peking-duck-768.avif" : index === 31 ? "dan-dan-noodles-768.avif" : index === 32 ? "green-curry-768.avif" : index === 33 ? "tom-yum-512.avif" : index === 34 ? "pad-kra-pao-384.avif" : index === 35 ? "banh-mi-512.avif" : index === 36 ? "bun-cha-512.avif" : index === 37 ? "goi-cuon-768.avif" : index === 38 ? "tandoori-chicken-768.avif" : index === 39 ? "naan-768.avif" : index === 40 ? "dal-makhani-768.avif" : index === 41 ? "idli-512.avif" : index === 42 ? "sambar-768.avif" : "medu-vada-768.avif");
    assert.equal(image.surface, "Matlyst");
    assert.equal(image.kind, [0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].includes(index) ? "Redaksjonelt rettfoto" : "AI-illustrasjon");
  }
  assert.match(explorer, /<DishPhotoGallery \/>/u);
  assert.match(gallery, /dishSearchHref\(dish\.query\)/u);
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
  assert.match(css, /tom-yum-512\.avif/u);
  assert.ok(manifest.images.some((image) =>
    image.id === "tom-yum" && image.catalogId === "tom-yum" && image.variantCaution.includes("reker")));
});


test("Pad kra pao uses its own sharp 384px image and exact catalog ID", () => {
  assert.equal(padKraPao.toString("ascii", 4, 12), "ftypavif");
  assert.ok(padKraPao.length > 4000);
  const marker = padKraPao.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0, "AVIF size box required");
  assert.equal(padKraPao.readUInt32BE(marker + 8), 384);
  assert.equal(padKraPao.readUInt32BE(marker + 12), 384);
  assert.match(gallery, /id: "pad-kra-pao", label: "Pad kra pao med speilegg"/u);
  assert.match(gallery, /"pad-kra-pao": 34/u);
  assert.match(gallery, /index === 34/u);
  assert.match(css, /dishPhotoThumb\.dishPhotoPadKraPao/u);
  assert.match(css, /pad-kra-pao-384\.avif/u);
  assert.ok(manifest.images.some(image => image.id === "pad-kra-pao" &&
    image.catalogId === "pad-kra-pao" && image.variantCaution.includes("speilegg")));
});

test("Banh mi is a sharp 512px illustration with exact catalog ID and variant caution", () => {
  assert.equal(banhMi.toString("ascii", 4, 12), "ftypavif");
  assert.ok(banhMi.length > 15000);
  const pos = banhMi.indexOf(Buffer.from("ispe"));
  assert.ok(pos > 0);
  assert.equal(banhMi.readUInt32BE(pos + 8), 512);
  assert.equal(banhMi.readUInt32BE(pos + 12), 512);
  assert.match(gallery, /id: "banh-mi", label: "Bánh mì med kjøtt og syltede grønnsaker"/u);
  assert.match(gallery, /"banh-mi": 35/u);
  assert.match(gallery, /index === 35/u);
  assert.match(gallery, /dishPhotoBanhMi/u);
  assert.match(css, /banh-mi-512\.avif/u);
  assert.ok(manifest.images.some((image) => image.id === "banh-mi" &&
    image.catalogId === "banh-mi" && image.variantCaution.includes("pâté")));
});

test("Phở bò uses source-verified full master and separate 512px thumbnail", () => {
  assert.equal(pho.toString("ascii", 4, 12), "ftypavif");
  assert.ok(pho.length > 20000);
  const marker = pho.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(pho.readUInt32BE(marker + 8), 512);
  assert.equal(pho.readUInt32BE(marker + 12), 512);
  assert.match(gallery, /isPho = index === 18/u);
  assert.match(gallery, /dishPhotoThumb dishPhotoPho/u);
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
  assert.match(gallery, /href="\/dish-images\/pho-bo-master-5472\.avif"/u);
  assert.match(photo.variantCaution, /storfekjøtt/u);
});

test("Bún chả has its own sharp 512px image with correct editorial identity", () => {
  assert.equal(bunCha.toString("ascii", 4, 12), "ftypavif");
  assert.ok(bunCha.length > 25000);
  const marker = bunCha.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(bunCha.readUInt32BE(marker + 8), 512);
  assert.equal(bunCha.readUInt32BE(marker + 12), 512);
  assert.match(gallery, /id: "bun-cha", label: "Bún chả med grillet svinekjøtt"/u);
  assert.match(gallery, /"bun-cha": 36/u);
  assert.match(gallery, /index === 36/u);
  assert.match(css, /dishPhotoThumb\.dishPhotoBunCha/u);
  assert.match(css, /bun-cha-512\.avif/u);
  assert.ok(manifest.images.some((entry) =>
    entry.id === "bun-cha" && entry.catalogId === "bun-cha"
    && entry.variantCaution.includes("svinekjøtt")));
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
  assert.match(gallery, /isPizzaMargherita = index === 0/u);
  assert.match(gallery, /dishPhotoThumb dishPhotoPizzaMargherita/u);
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
  assert.match(gallery, /isCheeseburger = index === 1/u);
  assert.match(gallery, /dishPhotoThumb dishPhotoCheeseburger/u);
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
  assert.match(gallery, /isGrilledSalmon = index === 2/u);
  assert.match(gallery, /dishPhotoThumb dishPhotoGrilledSalmon/u);
  assert.match(css, /grillet-laks-thumb-512\.avif/u);
  const mapping = gallery.slice(gallery.indexOf("const editorialPhotoIndex"), gallery.indexOf("export function DishPhotoThumbnail"));
  assert.doesNotMatch(mapping, /^\s*"?grillet-laks"?:/mu);
});

test("Gỏi cuốn uses a dedicated 768px image and only the exact shrimp variant", () => {
  assert.equal(goiCuon.toString("ascii", 4, 12), "ftypavif");
  assert.ok(goiCuon.length > 30000, "Use the real optimized illustration, not a placeholder");
  const marker = goiCuon.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0, "AVIF spatial size box must exist");
  assert.equal(goiCuon.readUInt32BE(marker + 8), 768);
  assert.equal(goiCuon.readUInt32BE(marker + 12), 768);
  assert.match(gallery, /id: "vietnamese-spring-rolls", label: "Gỏi cuốn med reker"/u);
  assert.match(gallery, /"vietnamese-spring-rolls": 37/u);
  assert.match(gallery, /isGoiCuon = index === 37/u);
  assert.ok(gallery.includes(`Utforsk ${manifest.images.length} retter`), "Gallery teaser must match the image manifest");
  assert.match(gallery, /dishPhotoThumb dishPhotoGoiCuon/u);
  assert.match(gallery, /dishPhotoSmall dishPhotoGoiCuon/u);
  assert.match(css, /goi-cuon-768\.avif/u);
  const image = manifest.images[37];
  assert.equal(image.id, "vietnamese-spring-rolls");
  assert.equal(image.catalogId, "vietnamese-spring-rolls");
  assert.equal(image.atlas, "goi-cuon-768.avif");
  assert.match(image.variantCaution, /reker/u);
  assert.match(image.variantCaution, /peanøttsaus/u);
  assert.match(image.variantCaution, /vegetariske/u);
});

test("Steak and shrimp sandwich use separate, sharp 512px gallery originals", () => {
  for (const [bytes, index, id, className, file] of [
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
    assert.ok(gallery.includes(className));
    assert.ok(css.includes(file));
  }
  const mapping = gallery.slice(gallery.indexOf("const editorialPhotoIndex"), gallery.indexOf("export function DishPhotoThumbnail"));
  assert.doesNotMatch(mapping, /^\s*"?grillet-biff"?:/mu);
  assert.doesNotMatch(mapping, /^\s*"?rekesmorbrod"?:/mu);
});

test("Tandoori chicken is a 768px exact-match chicken-only illustration", () => {
  assert.equal(tandoori.toString("ascii", 4, 12), "ftypavif");
  assert.ok(tandoori.length > 30000, "Tandoori must use a real illustration, not an empty placeholder");
  const marker = tandoori.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(tandoori.readUInt32BE(marker + 8), 768);
  assert.equal(tandoori.readUInt32BE(marker + 12), 768);
  assert.match(gallery, /id: "tandoori", label: "Tandoorikylling"/u);
  assert.match(gallery, /tandoori: 38/u);
  assert.match(gallery, /isTandoori = index === 38/u);
  assert.match(gallery, /dishPhotoThumb dishPhotoTandoori/u);
  assert.match(gallery, /dishPhotoSmall dishPhotoTandoori/u);
  assert.match(css, /tandoori-chicken-768\.avif/u);
  const image = manifest.images[38];
  assert.equal(image.catalogId, "tandoori");
  assert.equal(image.atlas, "tandoori-chicken-768.avif");
  assert.match(image.variantCaution, /kylling/u);
  assert.match(image.variantCaution, /vegetarisk/u);
  assert.match(image.variantCaution, /restaurant/u);
});

test("Naan has a dedicated 768px food image on black with a precise catalog ID", () => {
  assert.equal(naan.toString("ascii", 4, 12), "ftypavif");
  assert.ok(naan.length > 30000, "Naan image must contain the real optimized illustration");
  const marker = naan.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0, "AVIF spatial image marker is required");
  assert.equal(naan.readUInt32BE(marker + 8), 768);
  assert.equal(naan.readUInt32BE(marker + 12), 768);
  assert.match(gallery, /id: "naan", label: "Naan med smør og urter"/u);
  assert.match(gallery, /naan: 39/u);
  assert.match(gallery, /isNaan = index === 39/u);
  assert.ok(gallery.includes(`Utforsk ${manifest.images.length} retter`), "Gallery teaser must match the image manifest");
  assert.match(gallery, /dishPhotoThumb dishPhotoNaan/u);
  assert.match(gallery, /dishPhotoSmall dishPhotoNaan/u);
  assert.match(css, /naan-768\.avif/u);
  const image = manifest.images[39];
  assert.equal(image.id, "naan");
  assert.equal(image.catalogId, "naan");
  assert.equal(image.atlas, "naan-768.avif");
  assert.match(image.variantCaution, /smør/u);
  assert.match(image.variantCaution, /melkeallergi/u);
});

test("Dal makhani has its own 768px image with precise catalog ID and dairy caution", () => {
  assert.equal(dalMakhani.toString("ascii", 4, 12), "ftypavif");
  assert.ok(dalMakhani.length > 30000, "Dal makhani must contain a real sharp image");
  const marker = dalMakhani.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(dalMakhani.readUInt32BE(marker + 8), 768);
  assert.equal(dalMakhani.readUInt32BE(marker + 12), 768);
  assert.match(gallery, /id: "dal-makhani", label: "Dal makhani med smør og fløte"/u);
  assert.match(gallery, /"dal-makhani": 40/u);
  assert.match(gallery, /isDalMakhani = index === 40/u);
  assert.ok(gallery.includes(`Utforsk ${manifest.images.length} retter`));
  assert.match(gallery, /dishPhotoThumb dishPhotoDalMakhani/u);
  assert.match(gallery, /dishPhotoSmall dishPhotoDalMakhani/u);
  assert.match(css, /dal-makhani-768\.avif/u);
  const image = manifest.images[40];
  assert.equal(image.id, "dal-makhani");
  assert.equal(image.catalogId, "dal-makhani");
  assert.equal(image.atlas, "dal-makhani-768.avif");
  assert.match(image.variantCaution, /smør/u);
  assert.match(image.variantCaution, /fløte/u);
  assert.match(image.variantCaution, /melkeallergi/u);
});

test("Idli is a high-density black-background image with correct variant ID", () => {
  assert.equal(idli.toString("ascii", 4, 12), "ftypavif");
  assert.ok(idli.length > 6000, "Image must contain an actual illustration, not a placeholder");
  const marker = idli.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(idli.readUInt32BE(marker + 8), 512);
  assert.equal(idli.readUInt32BE(marker + 12), 512);
  assert.match(gallery, /id: "idli", label: "Idli med sambar og chutney"/u);
  assert.match(gallery, /idli: 41/u);
  assert.match(gallery, /isIdli = index === 41/u);
  assert.match(css, /idli-512\.avif/u);
  const image = manifest.images[41];
  assert.equal(image.id, "idli");
  assert.equal(image.catalogId, "idli");
  assert.equal(image.atlas, "idli-512.avif");
  assert.match(image.variantCaution, /sambar/u);
  assert.match(image.variantCaution, /restaurantfoto/u);
});

test("Sambar has its own accurate 768px illustration with exact catalog ID", () => {
  assert.equal(sambar.toString("ascii", 4, 12), "ftypavif");
  assert.ok(sambar.length > 25000, "Sambar needs a real food image, not a placeholder");
  const marker = sambar.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(sambar.readUInt32BE(marker + 8), 768);
  assert.equal(sambar.readUInt32BE(marker + 12), 768);
  assert.match(gallery, /id: "sambar", label: "Sambar med linser og grønnsaker"/u);
  assert.match(gallery, /sambar: 42/u);
  assert.match(gallery, /isSambar = index === 42/u);
  assert.match(gallery, /dishPhotoThumb dishPhotoSambar/u);
  assert.match(gallery, /dishPhotoSmall dishPhotoSambar/u);
  assert.match(css, /sambar-768\.avif/u);
  assert.ok(gallery.includes(`Utforsk ${manifest.images.length} retter`));
  const image = manifest.images[42];
  assert.equal(image.id, "sambar");
  assert.equal(image.catalogId, "sambar");
  assert.equal(image.atlas, "sambar-768.avif");
  assert.match(image.variantCaution, /linse/u);
  assert.match(image.variantCaution, /restaurantfoto/u);
});

test("Medu vada is its own sharp 768px dish photo with exact catalog ID", () => {
  assert.equal(vada.toString("ascii", 4, 12), "ftypavif");
  assert.ok(vada.length > 25000, "Vada should contain a real image, not a placeholder");
  const marker = vada.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(vada.readUInt32BE(marker + 8), 768);
  assert.equal(vada.readUInt32BE(marker + 12), 768);
  assert.match(gallery, /id: "vada", label: "Medu vada med sambar og chutney"/u);
  assert.match(gallery, /vada: 43/u);
  assert.match(gallery, /isVada = index === 43/u);
  assert.match(gallery, /dishPhotoThumb dishPhotoVada/u);
  assert.match(gallery, /dishPhotoSmall dishPhotoVada/u);
  assert.match(css, /medu-vada-768\.avif/u);
  const entry = manifest.images[43];
  assert.equal(entry.id, "vada");
  assert.equal(entry.catalogId, "vada");
  assert.equal(entry.atlas, "medu-vada-768.avif");
  assert.match(entry.variantCaution, /Medu vada/u);
  assert.match(entry.variantCaution, /restaurant/u);
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
    assert.ok(gallery.includes(cssClass));
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
  assert.match(gallery, /href="\/dish-images\/gyoza-master-4937\.avif"/u);
  assert.match(item.variantCaution, /fyllet er ikke dokumentert/iu);
  assert.match(item.variantCaution, /ikke.*restaurantfoto/iu);
  assert.match(gallery, /isGyoza = index === 17/u);
  assert.match(gallery, /dishPhotoThumb dishPhotoGyoza/u);
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
    assert.ok(gallery.includes(cssClass));
    assert.ok(css.includes(".dishPhotoThumb." + cssClass));
    assert.ok(css.includes(file));
  }
  assert.match(manifest.images[12].variantCaution, /reker|skalldyr/iu);
  assert.match(manifest.images[12].variantCaution, /ikke et generelt bilde/iu);
  assert.match(manifest.images[14].variantCaution, /mascarpone/iu);
  assert.match(gallery, /isShrimpPadThai = index === 12/u);
  assert.match(gallery, /isTiramisu = index === 14/u);
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
  assert.match(gallery, /href="\/dish-images\/pizza-marinara-master-2848\.avif"/u);
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
    assert.ok(gallery.includes("dishPhotoThumb " + className));
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
  assert.match(gallery, /href="\/dish-images\/falafel-master-4284\.avif"/u);
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
  assert.match(gallery, /href="\/dish-images\/cacio-e-pepe-master-4577\.avif"/u);
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
    assert.match(gallery, new RegExp("is" + cssClass + " = index === " + index));
    assert.ok(gallery.includes("dishPhotoThumb dishPhoto" + cssClass));
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
      assert.match(gallery, /href="\/dish-images\/masala-dosa-master-9504\.avif"/u);
    }
    if (index === 22) {
      assert.equal(item.kind, "Redaksjonelt rettfoto");
      assert.equal(item.largeViewEnabled, true);
      assert.equal(item.largeSource, "chana-masala-master-3814.avif");
      assert.equal(item.largeSourceNativeWidth, 3814);
      assert.equal(item.largeSourceNativeHeight, 3024);
      assert.match(item.photoCredit, /Muhammad Khawar Nazir.*Pexels/u);
      assert.match(gallery, /href="\/dish-images\/chana-masala-master-3814\.avif"/u);
    }
  }
});

test("Bolognese, prosciutto and kebab retain distinct correctly sized gallery AVIF images", () => {
  const expected = [
    { index: 7, id: "pasta-bolognese", file: "pasta-bolognese-thumb-512.avif", bytes: isBologneseImage, cls: "dishPhotoBolognese", selector: "isBolognese" },
    { index: 8, id: "pizza-prosciutto", file: "pizza-prosciutto-thumb-512.avif", bytes: isProsciuttoImage, cls: "dishPhotoProsciutto", selector: "isProsciutto" },
    { index: 9, id: "kebab-pita", file: "kebab-pita-768.avif", bytes: isKebabPitaImage, cls: "dishPhotoKebabPita", selector: "isKebabPita" }
  ];
  for (const entry of expected) {
    assert.equal(entry.bytes.toString("ascii", 4, 12), "ftypavif");
    assert.ok(entry.bytes.length > (entry.index === 7 ? 12000 : 25000));
    const ispe = entry.bytes.indexOf(Buffer.from("ispe"));
    assert.ok(ispe > 0);
    assert.equal(entry.bytes.readUInt32BE(ispe + 8), [7,8].includes(entry.index) ? 512 : 768);
    assert.equal(entry.bytes.readUInt32BE(ispe + 12), [7,8].includes(entry.index) ? 512 : 768);
    const row = manifest.images[entry.index];
    assert.equal(row.id, entry.id);
    assert.equal(row.atlas, entry.file);
    assert.equal(row.catalogId, null);
    assert.match(row.variantCaution, /ikke restaurantfoto/iu);
    assert.ok(css.includes(".dishPhotoThumb." + entry.cls));
    assert.ok(css.includes(entry.file));
    assert.ok(gallery.includes("const " + entry.selector + " = index === " + entry.index));
    assert.ok(gallery.includes("dishPhotoThumb " + entry.cls));
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
  assert.match(gallery,/href="\/dish-images\/bibimbap-master-8160\.avif"/u);
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
    assert.ok(gallery.includes("is" + thumb + " = index === " + index));
    assert.ok(gallery.includes("dishPhotoThumb dishPhoto" + thumb));
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
  assert.match(gallery, /href="\/dish-images\/tacos-al-pastor-master-7008\.avif"/u);
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
    assert.ok(gallery.includes(selector), selector);
    for (const scope of [".dishPhotoThumb.", ".dishPhotoSmall."]) {
      const classname = "dishPhoto" + entry.cls;
      assert.ok(css.includes(scope + classname));
      assert.ok(gallery.includes(scope.endsWith("Thumb.") ? "dishPhotoThumb " + classname : "dishPhotoSmall " + classname));
    }
    assert.ok(css.includes(entry.file));
    if (entry.index === 26) {
      assert.equal(image.kind, "Redaksjonelt rettfoto");
      assert.equal(image.largeViewEnabled, true);
      assert.equal(image.largeSource, "udon-tempura-master-2900.avif");
      assert.equal(image.largeSourceNativeWidth, 2900);
      assert.equal(image.largeSourceNativeHeight, 3080);
      assert.match(image.photoCredit, /Immanuelle.*CC BY 4\.0/u);
      assert.match(gallery, /href="\/dish-images\/udon-tempura-master-2900\.avif"/u);
    }
    if (entry.index === 25) {
      assert.equal(image.kind, "Redaksjonelt rettfoto");
      assert.equal(image.largeViewEnabled, true);
      assert.equal(image.largeSource, "yakitori-master-4000.avif");
      assert.equal(image.largeSourceNativeWidth, 4000);
      assert.equal(image.largeSourceNativeHeight, 5000);
      assert.match(image.photoCredit, /Airam Dato-on.*Pexels/u);
      assert.match(gallery, /href="\/dish-images\/yakitori-master-4000\.avif"/u);
    }
    if (entry.index === 24) {
      assert.equal(image.kind, "Redaksjonelt rettfoto");
      assert.equal(image.largeViewEnabled, true);
      assert.equal(image.largeSource, "chicken-katsu-master-5472.avif");
      assert.equal(image.largeSourceNativeWidth, 5472);
      assert.equal(image.largeSourceNativeHeight, 3648);
      assert.match(image.photoCredit, /Cohesion Singapore.*Pexels/u);
      assert.match(gallery, /href="\/dish-images\/chicken-katsu-master-5472\.avif"/u);
    }
  }
  assert.match(manifest.images[24].variantCaution, /ikke svin|ikke vegetar/iu);
  assert.match(manifest.images[26].variantCaution, /ikke vegansk/u);
});

test("Bao with braised pork has genuine CC0 original and a separate sharp 512 thumbnail", () => {
  const p=manifest.images[27];
  assert.equal(p.id,"bao");
  assert.equal(p.catalogId,"bao");
  assert.equal(p.kind,"Redaksjonelt rettfoto");
  assert.equal(p.largeViewEnabled,true);
  assert.equal(p.atlas,"bao-braised-pork-thumb-512.avif");
  assert.equal(p.largeSource,"bao-braised-pork-master-5160.avif");
  assert.equal(p.largeSourceNativeWidth,5160);
  assert.equal(p.largeSourceNativeHeight,3400);
  assert.match(p.photoCredit,/Andy Li.*CC0 1\.0/u);
  assert.match(p.variantCaution,/svinekjøtt/u);
  assert.match(p.variantCaution,/ikke vegetarisk/u);
  assert.match(p.variantCaution,/ikke restaurantfoto/iu);
  assert.equal(baoImage.toString("ascii",4,12),"ftypavif");
  assert.ok(baoImage.length>10000,"Bao thumbnail must not be placeholder");
  const marker=baoImage.indexOf(Buffer.from("ispe"));
  assert.ok(marker>0);
  assert.equal(baoImage.readUInt32BE(marker+8),512);
  assert.equal(baoImage.readUInt32BE(marker+12),512);
  assert.match(gallery,/href="\/dish-images\/bao-braised-pork-master-5160\.avif"/u);
  assert.match(gallery,/isBao = index === 27/u);
  assert.ok(css.includes("bao-braised-pork-thumb-512.avif"));
  assert.ok(css.includes("center / contain no-repeat"));
});

test("Steamed dumplings use verified CC0 full-size photo and distinct 512px mini", () => {
  const item=manifest.images[28];
  assert.equal(item.id, "dumplings");
  assert.equal(item.catalogId, "dumplings");
  assert.equal(item.kind, "Redaksjonelt rettfoto");
  assert.equal(item.largeViewEnabled, true);
  assert.equal(item.atlas, "dumplings-thumb-512.avif");
  assert.equal(item.largeSource, "dumplings-master-4100.avif");
  assert.equal(item.largeSourceNativeWidth, 4100);
  assert.equal(item.largeSourceNativeHeight, 3200);
  assert.match(item.photoCredit,/Charles Deluvio.*CC0 1\.0/u);
  assert.match(item.variantCaution,/Fyllet er ikke dokumentert/u);
  assert.match(item.variantCaution,/ikke restaurantfoto/u);
  assert.match(item.variantCaution,/ikke chili- eller soyadipp/u);
  assert.equal(dumplingsImage.toString("ascii",4,12), "ftypavif");
  assert.ok(dumplingsImage.length>10000, "512px dumplings thumbnail should be sharp, not placeholder");
  const pos=dumplingsImage.indexOf(Buffer.from("ispe"));
  assert.ok(pos>0);
  assert.equal(dumplingsImage.readUInt32BE(pos+8),512);
  assert.equal(dumplingsImage.readUInt32BE(pos+12),512);
  assert.match(gallery,/href="\/dish-images\/dumplings-master-4100\.avif"/u);
  assert.match(gallery,/isDumplings = index === 28/u);
  assert.ok(css.includes("dumplings-thumb-512.avif"));
  assert.ok(css.includes("center / contain no-repeat"));
});

test("Mapo tofu uses a separate 512px photo thumbnail and full-size gallery link", () => {
  const item = manifest.images[29];
  assert.equal(item.id, "mapo-tofu");
  assert.equal(item.catalogId, "mapo-tofu");
  assert.equal(item.largeSource, "mapo-tofu-master-3825.avif");
  assert.match(item.photoCredit, /ZhengZhou.*CC BY-SA 4\.0/u);
  assert.equal(item.photoLicense, "https://creativecommons.org/licenses/by-sa/4.0/");
  assert.equal(mapoTofuImage.toString("ascii", 4, 12), "ftypavif");
  const marker = mapoTofuImage.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(mapoTofuImage.readUInt32BE(marker + 8), 512);
  assert.equal(mapoTofuImage.readUInt32BE(marker + 12), 512);
  assert.ok(gallery.includes('href="/dish-images/mapo-tofu-master-3825.avif"'));
  assert.ok(css.includes('url("/dish-images/mapo-tofu-thumb-512.avif") center / contain'));
});

test("Remaining three Asian dishes use their own AVIF images and matching catalog IDs", () => {
  const cases = [
    { index: 30, id: "peking-duck", file: "peking-duck-768.avif", bytes: pekingDuckImage, cls: "PekingDuck", ingredient: /andekjøtt/iu },
    { index: 31, id: "dan-dan-noodles", file: "dan-dan-noodles-768.avif", bytes: danDanNoodlesImage, cls: "DanDanNoodles", ingredient: /peanøtter/iu },
    { index: 32, id: "green-curry", file: "green-curry-768.avif", bytes: greenCurryImage, cls: "GreenCurry", ingredient: /kylling/iu },
  ];
  for (const entry of cases) {
    const item = manifest.images[entry.index];
    assert.equal(item.id, entry.id);
    assert.equal(item.catalogId, entry.id);
    assert.equal(item.atlas, entry.file);
    assert.match(item.variantCaution, /ikke restaurantfoto/iu);
    assert.match(item.variantCaution, entry.ingredient);
    assert.equal(entry.bytes.toString("ascii", 4, 12), "ftypavif");
    assert.ok(entry.bytes.length > 20000, entry.file + " is unexpectedly small");
    const marker = entry.bytes.indexOf(Buffer.from("ispe"));
    assert.ok(marker > 0);
    assert.equal(entry.bytes.readUInt32BE(marker + 8), 768);
    assert.equal(entry.bytes.readUInt32BE(marker + 12), 768);
    assert.match(gallery, new RegExp("is" + entry.cls + " = index === " + entry.index));
    assert.ok(gallery.includes("dishPhotoThumb dishPhoto" + entry.cls));
    assert.ok(gallery.includes("dishPhotoSmall dishPhoto" + entry.cls));
    assert.ok(css.includes(".dishPhotoThumb.dishPhoto" + entry.cls));
    assert.ok(css.includes(".dishPhotoSmall.dishPhoto" + entry.cls));
    assert.ok(css.includes(entry.file));
  }
  assert.equal(manifest.images.length, 44);
  assert.equal(manifest.images.filter((row) => ["series-04.avif", "collection.avif"].includes(row.atlas)).length, 0);
});
