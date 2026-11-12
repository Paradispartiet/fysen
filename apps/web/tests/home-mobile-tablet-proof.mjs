/* global URL, process, document, Node, getComputedStyle */
import assert from "node:assert/strict";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const webRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const manifest = JSON.parse(readFileSync(path.join(webRoot, "public/dish-images/manifest.json"), "utf8"));
const base = (process.env.FYSEN_QA_BASE || "http://127.0.0.1:3000").replace(/\/$/u, "");
const output = process.env.FYSEN_QA_OUTPUT_DIR;
const viewports = [
  { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: "ipad-portrait", width: 820, height: 1180, isMobile: true, hasTouch: true },
  { name: "ipad-landscape", width: 1180, height: 820, isMobile: true, hasTouch: true },
];
const upgraded = manifest.images.slice(0, 5);
assert.deepEqual(upgraded.map((entry) => entry.id),
  ["pizza-margherita", "cheeseburger", "grillet-laks", "grillet-biff", "rekesmorbrod"]);
if (output) mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true, chromiumSandbox: true });
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      hasTouch: viewport.hasTouch,
      deviceScaleFactor: 1,
    });
    try {
      const page = await context.newPage();
      const response = await page.goto(base, { waitUntil: "domcontentloaded", timeout: 60_000 });
      assert.equal(response?.status(), 200, "Home page must respond HTTP 200");
      await page.getByRole("heading", { name: "Hva har du lyst på?" }).waitFor({ state: "visible" });
      await page.getByRole("searchbox", { name: "Retten du vil spise" }).waitFor({ state: "visible" });

      const details = page.locator("details.dishPhotos");
      await details.waitFor({ state: "visible", timeout: 30_000 });
      assert.equal(await details.getAttribute("open"), null, "Image gallery must be closed on first paint");
      assert.equal(await page.locator(".dishPhotosGrid").isVisible(), false,
        "Gallery grid must not overwhelm the front page before explicit opening");

      const ordering = await page.evaluate(() => {
        const cuisines = document.querySelector(".cuisineGrid");
        const gallery = document.querySelector(".dishPhotos");
        if (!cuisines || !gallery) return false;
        return Boolean(cuisines.compareDocumentPosition(gallery) & Node.DOCUMENT_POSITION_FOLLOWING);
      });
      assert.ok(ordering, "Cuisine choices must precede image gallery");

      async function checkOverflow(label) {
        const sizes = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          page: document.documentElement.scrollWidth,
        }));
        assert.ok(sizes.page <= sizes.viewport + 2,
          `${viewport.name} ${label}: unexpected horizontal overflow ${JSON.stringify(sizes)}`);
      }
      await checkOverflow("closed");
      if (output) await page.screenshot({ path: path.join(output, `${viewport.name}-closed.png`), animations: "disabled" });

      await page.locator(".dishPhotosPreview").click();
      assert.notEqual(await details.getAttribute("open"), null, "Gallery must open on click");
      assert.equal(await page.locator(".dishPhotoCard").count(), manifest.images.length);
      assert.equal(await page.locator(".dishPhotosGrid").isVisible(), true);
      await checkOverflow("expanded");
      for (const [index, entry] of upgraded.entries()) {
        const file = entry.atlas;
        assert.match(file, /\.avif$/u, `${entry.id} needs a standalone AVIF`);
        const thumb = page.locator(".dishPhotoCard").nth(index).locator(".dishPhotoThumb");
        await thumb.waitFor({ state: "visible" });
        const css = await thumb.evaluate((node) => getComputedStyle(node).backgroundImage);
        assert.ok(css.includes(file), `${entry.id} renders the wrong image: ${css}`);
        const asset = await page.request.get(`${base}/dish-images/${file}`);
        assert.equal(asset.status(), 200, `${file} must be served by the local Next app`);
        assert.match(asset.headers()["content-type"] || "", /image\/avif/u);
        const bytes = await asset.body();
        assert.ok(bytes.length > 7000, `${file} is unexpectedly small`);
        assert.equal(bytes.toString("ascii", 4, 12), "ftypavif");
      }
      if (output) await page.screenshot({ path: path.join(output, `${viewport.name}-expanded.png`), animations: "disabled" });

      await page.locator(".dishPhotosPreview").click();
      assert.equal(await details.getAttribute("open"), null, "Gallery should close again");
      assert.equal(await page.locator(".dishPhotosGrid").isVisible(), false);
      process.stdout.write(`PASS ${viewport.name} ${viewport.width}x${viewport.height}: search, closed gallery, correct order, 5 sharp AVIFs, no overflow\n`);
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
