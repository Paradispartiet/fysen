import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath, URL } from "node:url";

const read = (relative) => readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

test("PWA manifest and installable app use brand PNG icons", () => {
  const manifest = read("../app/manifest.ts");
  const layout = read("../app/layout.tsx");
  const png = read("../app/pwa-icons/[size]/route.tsx");
  assert.match(manifest, /display: "standalone"/u);
  assert.match(manifest, /start_url: withPublicBasePath\("\/"\)/u);
  assert.match(manifest, /purpose: "any maskable"/u);
  assert.match(manifest, /pwa-icons\/512/u);
  assert.match(layout, /appleWebApp/u);
  assert.match(layout, /viewportFit: "cover"/u);
  assert.match(png, /BRAND_SRC/u);
  assert.match(png, /size !== 180 && size !== 192 && size !== 512/u);
});

test("Offline fallback does not cache or counterfeit live menus and search", () => {
  const sw = read("../public/sw.js");
  const offline = read("../public/offline.html");
  const register = read("../components/pwa-registration.tsx");
  assert.match(sw, /event\.request\.mode !== "navigate"/u);
  assert.match(sw, /fetch\(event\.request\)\.catch/u);
  assert.doesNotMatch(sw, /cache\.put\(event\.request/u);
  assert.match(offline, /viser ikke gamle restauranttreff/u);
  assert.match(register, /serviceWorker\.register/u);
});

test("Home and browse render without full menu catalog embedded in HTML", () => {
  const home = read("../app/page.tsx");
  const search = read("../app/search/page.tsx");
  const browse = read("../components/dish-browse.tsx");
  const client = read("../lib/client-dish-search.ts");
  assert.doesNotMatch(home, /await browseDishes/u);
  assert.match(home, /browseData=\{null\}/u);
  assert.doesNotMatch(search, /await loadBrowse/u);
  assert.match(search, /<DishBrowseLoader/u);
  assert.match(browse, /visibleLiveDishes\.slice\(0, visibleCount\)/u);
  assert.match(client, /homePreview/u);
  assert.match(client, /clientPreviewApiBaseUrl/u);
});

test("Device favorites are separate from paused AHA and hold no stale menu prices", () => {
  const favorites = read("../lib/device-favorites.ts");
  const page = read("../app/favoritter/page.tsx");
  const dish = read("../components/dish-result.tsx");
  const navigation = read("../components/mobile-tab-bar.tsx");
  assert.match(favorites, /FAVORITES_KEY/u);
  assert.doesNotMatch(favorites, /priceMinor|freshUntil|menuSource/u);
  assert.match(page, /synkroniseres ikke med AHA/u);
  assert.match(dish, /<FavoriteToggle/u);
  assert.match(navigation, /aria-label="Appnavigasjon"/u);
});
