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
const series04 = readFileSync(path.join(web, "public/dish-images/series-04.avif"));
const tomYum = readFileSync(path.join(web, "public/dish-images/tom-yum-512.avif"));
const padKraPao = readFileSync(path.join(web, "public/dish-images/pad-kra-pao-384.avif"));
const banhMi = readFileSync(path.join(web, "public/dish-images/banh-mi-512.avif"));
const bunCha = readFileSync(path.join(web, "public/dish-images/bun-cha-512.avif"));
const manifest = JSON.parse(readFileSync(path.join(web, "public/dish-images/manifest.json"), "utf8"));
const catalog = readFileSync(path.join(web, "content/food-knowledge/catalog.ts"), "utf8");

test("Matlyst has exactly thirty-seven distinct, curated dish illustrations", () => {
  const entries = [...gallery.matchAll(/\{ id: "([^"]+)", label: "([^"]+)", query: "([^"]+)" \}/gu)];
  assert.equal(entries.length, 37);
  assert.equal(new Set(entries.map((match) => match[1])).size, 37);
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
  assert.equal(mappedIds.length, 27);
  for (const id of mappedIds) assert.ok(catalogIds.has(id), `Editorial image has no catalog dish: ${id}`);
});

test("Every generated and approved image is represented in the published Matlyst gallery", () => {
  const entries = [...gallery.matchAll(/\{ id: "([^"]+)", label: "([^"]+)", query: "([^"]+)" \}/gu)];
  assert.equal(manifest.version, 1);
  assert.equal(manifest.images.length, 37);
  assert.deepEqual(manifest.images.map((entry) => entry.id), entries.map((match) => match[1]));
  for (const [index, image] of manifest.images.entries()) {
    assert.equal(image.index, index);
    assert.equal(image.atlas, index === 0 ? "pizza-margherita-512.avif" : index === 1 ? "cheeseburger-bacon-512.avif" : index < 24 ? "collection.avif" : index < 33 ? "series-04.avif" : index === 33 ? "tom-yum-512.avif" : index === 34 ? "pad-kra-pao-384.avif" : index === 35 ? "banh-mi-512.avif" : "bun-cha-512.avif");
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
