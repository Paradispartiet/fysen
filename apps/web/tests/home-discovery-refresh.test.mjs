import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, URL } from "node:url";

const web = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const read = (file) => readFileSync(path.join(web, file), "utf8");

const home = read("app/page.tsx");
const explorer = read("components/cuisine-explorer.tsx");
const gallery = read("components/dish-photo-gallery.tsx");
const css = read("styles/home-discovery-refresh.css");
const layout = read("app/layout.tsx");
const manifest = JSON.parse(read("public/dish-images/manifest.json"));

test("home page keeps dish search as the primary action", () => {
  assert.ok(home.indexOf("<DishSearch />") < home.indexOf("<CuisineExplorer"));
  assert.ok(home.includes("Hva har du lyst på?"));
  assert.match(css, /\.homePage \.homeHero/u);
});

test("Matlyst cuisine selection comes before the optional photo gallery", () => {
  assert.match(explorer, /Utforsk kjøkken og retter/u);
  assert.ok(explorer.indexOf('className="cuisineGrid"') < explorer.indexOf("<DishPhotoGallery />"));
  assert.match(explorer, /<RecentDishes/u);
  assert.match(explorer, /<PopularDishes/u);
});

test("Matlyst gallery is closed by default and shows all approved images only on request", () => {
  assert.match(gallery, /<details className="dishPhotos" aria-labelledby="dish-photos-title">/u);
  assert.doesNotMatch(gallery, /<details[^>]+\sopen(?:\s|>)/u);
  assert.match(gallery, /<summary className="dishPhotosPreview">/u);
  assert.match(gallery, /className="dishPhotosInside"/u);
  assert.ok(gallery.indexOf('className="dishPhotosInside"') < gallery.indexOf("illustratedDishes.map"));
  assert.ok(manifest.images.length >= 36, "Approved image count must not regress");
  assert.match(gallery, new RegExp(`Utforsk ${manifest.images.length} retter`, "u"));
});

test("gallery previews use one sharp standalone image and never enlarge old atlas thumbnails", () => {
  assert.match(css, /dishPhotosCover/u);
  assert.match(css, /tom-yum-512\.avif/u);
  assert.match(css, /\.dishPhotos \.dishPhotoCard \.dishPhotoThumb/u);
  assert.match(css, /max-width:\s*100px/u);
  assert.match(css, /max-width:\s*90px/u);
  assert.doesNotMatch(css, /image-rendering:\s*pixelated/u);
  assert.ok(layout.indexOf("home-discovery-refresh.css") > layout.indexOf("dish-photos.css"));
});

test("disclosure uses semantic HTML with no Javascript dependency or fake availability", () => {
  assert.match(gallery, /Illustrasjoner av rettetyper, ikke restaurantbilder/u);
  assert.match(gallery, /dishSearchHref\(dish\.query\)/u);
  assert.doesNotMatch(gallery, /Tilgjengelig nå|Åpent nå/u);
});
