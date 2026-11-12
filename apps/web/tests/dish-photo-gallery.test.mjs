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
const atlas = readFileSync(path.join(web, "public/dish-images/collection.avif"));
const pizzaMargherita = readFileSync(path.join(web, "public/dish-images/pizza-margherita-512.avif"));
const cheeseburger = readFileSync(path.join(web, "public/dish-images/cheeseburger-bacon-512.avif"));
const grilledSalmon = readFileSync(path.join(web, "public/dish-images/grillet-laks-512.avif"));
const sushiImage = readFileSync(path.join(web, "public/dish-images/sushi-768.avif"));
const ramenImage = readFileSync(path.join(web, "public/dish-images/ramen-768.avif"));
const carbonaraImage = readFileSync(path.join(web, "public/dish-images/carbonara-768.avif"));
const butterChickenImage = readFileSync(path.join(web, "public/dish-images/butter-chicken-768.avif"));
const grilledSteak = readFileSync(path.join(web, "public/dish-images/grillet-biff-512.avif"));
const shrimpOpenSandwich = readFileSync(path.join(web, "public/dish-images/rekesmorbrod-512.avif"));
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
const pho = readFileSync(path.join(web, "public/dish-images/pho-512.avif"));
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
  assert.match(gallery, /Illustrasjoner av rettetyper, ikke restaurantbilder/u);
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
    assert.equal(image.atlas, index === 0 ? "pizza-margherita-512.avif" : index === 1 ? "cheeseburger-bacon-512.avif" : index === 2 ? "grillet-laks-512.avif" : index === 3 ? "grillet-biff-512.avif" : index === 4 ? "rekesmorbrod-512.avif" : index === 5 ? "sushi-768.avif" : index === 6 ? "ramen-768.avif" : index === 10 ? "carbonara-768.avif" : index === 11 ? "butter-chicken-768.avif" : index === 18 ? "pho-512.avif" : index < 24 ? "collection.avif" : index < 33 ? "series-04.avif" : index === 33 ? "tom-yum-512.avif" : index === 34 ? "pad-kra-pao-384.avif" : index === 35 ? "banh-mi-512.avif" : index === 36 ? "bun-cha-512.avif" : index === 37 ? "goi-cuon-768.avif" : index === 38 ? "tandoori-chicken-768.avif" : index === 39 ? "naan-768.avif" : index === 40 ? "dal-makhani-768.avif" : index === 41 ? "idli-512.avif" : index === 42 ? "sambar-768.avif" : "medu-vada-768.avif");
    assert.equal(image.surface, "Matlyst");
    assert.equal(image.kind, "AI-illustrasjon");
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

test("Pad Thai uses only the known shrimp illustration, not a blurry new crop", () => {
  assert.match(gallery, /"pad-thai": 12/u);
  assert.match(gallery, /"pad-thai": "pad thai med reker"/u);
  assert.doesNotMatch(gallery, /dishPhotoPadThai/u);
  assert.doesNotMatch(css, /pad-thai\\.avif/u);
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

test("Phở bò uses dedicated sharp 512px art without adding a false gallery entry", () => {
  assert.equal(pho.toString("ascii", 4, 12), "ftypavif");
  assert.ok(pho.length > 20000);
  const marker = pho.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(pho.readUInt32BE(marker + 8), 512);
  assert.equal(pho.readUInt32BE(marker + 12), 512);
  assert.match(gallery, /isPho = index === 18/u);
  assert.match(gallery, /dishPhotoThumb dishPhotoPho/u);
  assert.match(gallery, /dishPhotoSmall dishPhotoPho/u);
  assert.match(css, /pho-512\.avif/u);
  const photo = manifest.images.find((entry) => entry.id === "pho");
  assert.equal(photo.atlas, "pho-512.avif");
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
  assert.equal(manifest.images[0].atlas, "pizza-margherita-512.avif");
  assert.match(manifest.images[0].variantCaution, /ikke faktisk restaurantfoto/u);
  assert.match(gallery, /isPizzaMargherita = index === 0/u);
  assert.match(gallery, /dishPhotoThumb dishPhotoPizzaMargherita/u);
  assert.match(gallery, /dishPhotoSmall dishPhotoPizzaMargherita/u);
  assert.match(css, /dishPhotoThumb\.dishPhotoPizzaMargherita/u);
  assert.match(css, /dishPhotoSmall\.dishPhotoPizzaMargherita/u);
  assert.match(css, /pizza-margherita-512\.avif/u);
});

test("Bacon cheeseburger has a dedicated sharp source without a fabricated catalog/restaurant photo mapping", () => {
  assert.equal(cheeseburger.toString("ascii", 4, 12), "ftypavif");
  assert.ok(cheeseburger.length > 8000);
  const marker = cheeseburger.indexOf(Buffer.from("ispe"));
  assert.ok(marker > 0);
  assert.equal(cheeseburger.readUInt32BE(marker + 8), 512);
  assert.equal(cheeseburger.readUInt32BE(marker + 12), 512);
  assert.equal(manifest.images[1].id, "cheeseburger");
  assert.equal(manifest.images[1].atlas, "cheeseburger-bacon-512.avif");
  assert.match(manifest.images[1].variantCaution, /ikke et faktisk restaurantfoto/u);
  assert.match(gallery, /isCheeseburger = index === 1/u);
  assert.match(gallery, /dishPhotoThumb dishPhotoCheeseburger/u);
  assert.match(css, /dishPhotoThumb\.dishPhotoCheeseburger/u);
  assert.match(css, /cheeseburger-bacon-512\.avif/u);
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
  assert.equal(manifest.images[2].atlas, "grillet-laks-512.avif");
  assert.equal(manifest.images[2].catalogId, null);
  assert.match(manifest.images[2].variantCaution, /ikke faktisk restaurantfoto/iu);
  assert.match(gallery, /isGrilledSalmon = index === 2/u);
  assert.match(gallery, /dishPhotoThumb dishPhotoGrilledSalmon/u);
  assert.match(css, /grillet-laks-512\.avif/u);
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
    [grilledSteak, 3, "grillet-biff", "dishPhotoGrilledSteak", "grillet-biff-512.avif"],
    [shrimpOpenSandwich, 4, "rekesmorbrod", "dishPhotoShrimpOpenSandwich", "rekesmorbrod-512.avif"],
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


test("Four standalone 768px images preserve exact dish variants and source quality", () => {
  for (const {index, id, file, bytes, cssClass, catalogId} of [
    {index: 5, id: "sushi", file: "sushi-768.avif", bytes: sushiImage, cssClass: "dishPhotoSushi", catalogId: "sushi"},
    {index: 6, id: "ramen", file: "ramen-768.avif", bytes: ramenImage, cssClass: "dishPhotoRamen", catalogId: "ramen"},
    {index: 10, id: "pasta-carbonara", file: "carbonara-768.avif", bytes: carbonaraImage, cssClass: "dishPhotoCarbonara", catalogId: null},
    {index: 11, id: "butter-chicken", file: "butter-chicken-768.avif", bytes: butterChickenImage, cssClass: "dishPhotoButterChicken", catalogId: "butter-chicken"}
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
    assert.equal(bytes.readUInt32BE(marker + 8), 768);
    assert.equal(bytes.readUInt32BE(marker + 12), 768);
    assert.ok(css.includes(".dishPhotoThumb." + cssClass));
    assert.ok(css.includes(".dishPhotoSmall." + cssClass));
    assert.ok(css.includes(file));
    assert.ok(gallery.includes("index === " + index));
    assert.ok(gallery.includes(cssClass));
  }
  assert.match(gallery, /chashu-svinekjøtt/u);
  assert.match(gallery, /spaghetti carbonara med speket svinekjøtt/u);
});
