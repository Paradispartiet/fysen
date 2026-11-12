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
const series04 = readFileSync(path.join(web, "public/dish-images/series-04.avif"));
const manifest = JSON.parse(readFileSync(path.join(web, "public/dish-images/manifest.json"), "utf8"));
const catalog = readFileSync(path.join(web, "content/food-knowledge/catalog.ts"), "utf8");

test("Matlyst has exactly thirty-three distinct, curated dish illustrations", () => {
  const entries = [...gallery.matchAll(/\{ id: "([^"]+)", label: "([^"]+)", query: "([^"]+)" \}/gu)];
  assert.equal(entries.length, 33);
  assert.equal(new Set(entries.map((match) => match[1])).size, 33);
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
  assert.equal(mappedIds.length, 23);
  for (const id of mappedIds) assert.ok(catalogIds.has(id), `Editorial image has no catalog dish: ${id}`);
});

test("Every generated and approved image is represented in the published Matlyst gallery", () => {
  const entries = [...gallery.matchAll(/\{ id: "([^"]+)", label: "([^"]+)", query: "([^"]+)" \}/gu)];
  assert.equal(manifest.version, 1);
  assert.equal(manifest.images.length, 33);
  assert.deepEqual(manifest.images.map((entry) => entry.id), entries.map((match) => match[1]));
  for (const [index, image] of manifest.images.entries()) {
    assert.equal(image.index, index);
    assert.equal(image.atlas, index < 24 ? "collection.avif" : "series-04.avif");
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
