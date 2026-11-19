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

test("Utforsk matretter is a closed-by-default accordion before the optional photo gallery", () => {
  assert.match(explorer, /<details className="cuisineBrowseDisclosure" aria-labelledby="cuisine-browse-title">/u);
  assert.match(explorer, /<summary className="cuisineBrowsePreview">/u);
  assert.match(explorer, /Utforsk matretter/u);
  assert.doesNotMatch(explorer, /<details className="cuisineBrowseDisclosure"[^>]*\sopen(?:\s|>)/u);
  assert.ok(explorer.indexOf('className="cuisineBrowseList"') < explorer.indexOf("<DishPhotoGallery />"));
  assert.match(explorer, /<details className="cuisineBrowseDisclosure"/u);
  assert.match(explorer, /<summary className="cuisineBrowsePreview"/u);
  assert.match(explorer, /homeCuisines\.map/u);
  assert.doesNotMatch(explorer, /className="cuisineCard cuisineCardInteractive"/u);
  assert.ok(explorer.indexOf("<RecentDishes") < explorer.indexOf('className="cuisineBrowseDisclosure"'));
  assert.ok(explorer.indexOf("<PopularDishes") < explorer.indexOf('className="cuisineBrowseDisclosure"'));
  assert.match(css, /\.cuisineBrowseDisclosure\[open\] \.cuisineBrowsePreviewChevron/u);
  assert.match(css, /\.cuisineBrowsePreview:focus-visible/u);
});

test("kitchen dialog keeps regions and illustrated food types behind separate closed accordions", () => {
  assert.match(explorer, /<details className="cuisineExploreFilter cuisineExploreAreas" name="cuisine-discovery-filter">/u);
  assert.match(explorer, /<details className="cuisineExploreFilter cuisineExploreFoodTypes" name="cuisine-discovery-filter">/u);
  assert.doesNotMatch(explorer, /<details className="cuisineExploreFilter[^>]*\sopen(?:\s|>)/u);
  assert.ok(explorer.indexOf('className="cuisineExploreFilterGroup"') < explorer.indexOf('className="cuisineExploreResults"'));
  assert.match(explorer, /setSelectedTypeName\(" "\)/u.test(explorer) ? /setSelectedTypeName/u : /setSelectedAreaName/u);
  assert.match(css, /\.cuisineBrowseChoice/u);
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

test("Matlyst gallery uses compact side thumbnails across desktop, iPad and phone", () => {
  assert.match(css, /dishPhotosCover/u);
  assert.match(css, /tom-yum-512\.avif/u);
  assert.match(css, /\.dishPhotos \.dishPhotoCard \.dishPhotoThumb/u);
  assert.match(css, /grid-template-columns:\s*68px\s+minmax\(0,\s*1fr\)/u);
  assert.match(css, /grid-row:\s*1\s*\/\s*span\s*2/u);
  assert.match(css, /grid-template-columns:\s*60px\s+minmax\(0,\s*1fr\)/u);
  assert.match(css, /grid-template-columns:\s*50px\s+minmax\(0,\s*1fr\)/u);
  assert.match(css, /max-width:\s*68px/u);
  assert.match(css, /max-width:\s*60px/u);
  assert.match(css, /max-width:\s*50px/u);
  assert.doesNotMatch(css, /image-rendering:\s*pixelated/u);
  assert.ok(layout.indexOf("home-discovery-refresh.css") > layout.indexOf("dish-photos.css"));
  assert.match(gallery, /<a href=\{dishSearchHref\(dish\.query\)\} key=\{dish\.id\} className="dishPhotoCard">/u);
});

test("disclosure uses semantic HTML with no Javascript dependency or fake availability", () => {
  assert.match(gallery, /Illustrasjoner og foto av rettetyper, ikke restaurantbilder/u);
  assert.match(gallery, /dishSearchHref\(dish\.query\)/u);
  assert.doesNotMatch(gallery, /Tilgjengelig nå|Åpent nå/u);
});
