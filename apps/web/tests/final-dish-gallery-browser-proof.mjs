/* global document, getComputedStyle, Image, process, URL, console */
import assert from "node:assert/strict";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const base = (process.env.FYSEN_QA_BASE || "http://127.0.0.1:3000").replace(/\/$/u, "");
const output = process.env.FYSEN_QA_OUTPUT_DIR || "/tmp/fysen-final-dish-qa";
mkdirSync(output, { recursive: true });
const manifest = JSON.parse(readFileSync(new URL("../public/dish-images/manifest.json", import.meta.url), "utf8"));
assert.equal(manifest.images.length, 44);
const cases = [
  { name: "mobile", width: 390, height: 844 },
  { name: "ipad-portrait", width: 820, height: 1180 },
  { name: "ipad-landscape", width: 1180, height: 820 },
];
const evidence = [];
const browser = await chromium.launch({ channel: "chrome", headless: true, chromiumSandbox: true });
try {
  for (const viewport of cases) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    try {
      const response = await page.goto(base, { waitUntil: "domcontentloaded", timeout: 60000 });
      assert.equal(response.status(), 200);
      const gallery = page.locator("details.dishPhotos");
      await gallery.waitFor({ state: "visible" });
      assert.equal(await gallery.getAttribute("open"), null, "Gallery starts closed");
      await gallery.locator("summary").click();
      assert.notEqual(await gallery.getAttribute("open"), null);
      const cards = gallery.locator(".dishPhotoCard");
      assert.equal(await cards.count(), 44);
      for (const entry of manifest.images) {
        const card = cards.nth(entry.index);
        assert.equal(await card.locator("strong").innerText(), entry.label);
        const styles = await card.locator(".dishPhotoThumb").evaluate(node => ({
          image: getComputedStyle(node).backgroundImage,
          size: getComputedStyle(node).backgroundSize,
        }));
        assert.ok(styles.image.includes(entry.atlas), entry.id + " thumbnail mismatch");
        if (["sambar", "vada", "kebab-pita"].includes(entry.id)) assert.equal(styles.size, "contain", entry.id + " must not crop its image");
        const url = new URL(await card.getAttribute("href"), base);
        assert.equal(url.pathname, "/search");
        assert.equal(url.searchParams.get("q"), entry.query);
        const asset = await page.request.get(base + "/dish-images/" + entry.atlas);
        assert.equal(asset.status(), 200, entry.atlas);
        const bytes = await asset.body();
        assert.equal(bytes.toString("ascii", 4, 12), "ftypavif");
        // Decode real AVIF bytes in Chrome rather than relying only on CSS URLs.
        const size = await page.evaluate(async src => {
          const image = new Image();
          image.src = src;
          await image.decode();
          return [image.naturalWidth, image.naturalHeight];
        }, base + "/dish-images/" + entry.atlas);
        assert.deepEqual(size, [512, 512], entry.id + " thumbnail dimensions");
      }
      const masters = [];
      for (const id of ["sambar", "vada", "kebab-pita"]) {
        const entry = manifest.images.find(image => image.id === id);
        const file = entry.largeSource || entry.upscaledSource;
        const link = gallery.locator('a[href="/dish-images/' + file + '"]');
        assert.equal(await link.count(), 1, id + " full-size link");
        assert.equal(await link.getAttribute("target"), "_blank");
        const notice = entry.photoLicenseNotice || entry.processingNotice;
        assert.equal(await gallery.locator('a[href="' + notice + '"]').count(), 1);
        const noticeResponse = await page.request.get(base + notice);
        assert.equal(noticeResponse.status(), 200);
        assert.match(await noticeResponse.text(), /AI|KI/u);
        const [popup] = await Promise.all([context.waitForEvent("page"), link.click()]);
        await popup.waitForLoadState("domcontentloaded");
        await popup.locator("img").waitFor({ state: "visible", timeout: 30000 });
        const dimensions = await popup.locator("img").evaluate(async image => {
          await image.decode();
          return [image.naturalWidth, image.naturalHeight];
        });
        const expected = id === "sambar" ? [3072,3072] : [entry.largeSourceNativeWidth,entry.largeSourceNativeHeight];
        assert.deepEqual(dimensions, expected, id + " actual full-size browser image");
        masters.push({ id, file, dimensions });
        await popup.close();
      }
      assert.match(await gallery.innerText(), /Sambar – AI-bearbeidet og oppskalert/u);
      assert.match(await gallery.innerText(), /AI-assistert frilegging, uten oppskalering/u);
      const overflow = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
      assert.ok(overflow.scroll <= overflow.client + 2, JSON.stringify(overflow));
      await cards.nth(43).scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(output, viewport.name + "-vada.png"), animations: "disabled" });
      await cards.nth(9).scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(output, viewport.name + "-kebab.png"), animations: "disabled" });
      // Follow the Vada card to verify that gallery search navigation is usable.
      await cards.nth(43).click();
      await page.waitForURL(url => url.pathname === "/search" && url.searchParams.get("q") === "vada");
      await page.goBack({ waitUntil: "domcontentloaded" });
      const restored = page.locator("details.dishPhotos");
      if (await restored.getAttribute("open") === null) await restored.locator("summary").click();
      await restored.locator("summary").click();
      assert.equal(await restored.getAttribute("open"), null);
      assert.deepEqual(errors, [], "Browser JavaScript errors");
      evidence.push({ viewport, thumbnails: 44, masters, overflow, javascriptErrors: errors, status: "passed" });
      console.log("PASS", viewport.name, "44 decoded thumbnails; Sambar, Vada and kebab open at expected dimensions; search navigation; no overflow/errors");
    } catch (error) {
      await page.screenshot({ path: path.join(output, viewport.name + "-failure.png"), fullPage: true }).catch(() => {});
      writeFileSync(path.join(output, viewport.name + "-failure.json"), JSON.stringify({ message: error.message, stack: error.stack, javascriptErrors: errors, url: page.url() }, null, 2));
      throw error;
    } finally {
      await context.close();
    }
  }
} finally {
  writeFileSync(path.join(output, "results.json"), JSON.stringify(evidence, null, 2));
  await browser.close();
}
