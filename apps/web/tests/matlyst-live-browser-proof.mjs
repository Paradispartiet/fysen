import assert from "node:assert/strict";
import { chromium } from "playwright-core";
import process from "node:process";

const base = (process.env.FYSEN_PUBLIC_WEB_URL || "https://fysen.vercel.app").replace(/\/$/, "");
const expectedCuisines = [
  "Asiatisk", "Indisk", "Fast food", "Italiensk", "Midtøsten", "Mexicansk",
  "Afrikansk", "Fransk", "Spansk", "Gresk", "Amerikansk", "Nordisk",
];
const devices = [
  { label: "mobile", width: 390, height: 844 },
  { label: "iPad", width: 820, height: 1180 },
];

async function assertNoHorizontalOverflow(page, context) {
  const sizes = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
  }));
  assert.ok(
    sizes.document <= sizes.viewport + 2,
    context + ": horizontal overflow " + sizes.document + " > " + sizes.viewport,
  );
}

const browser = await chromium.launch({ channel: "chrome", headless: true, chromiumSandbox: true });
const verified = [];
try {
  for (const device of devices) {
    const page = await browser.newPage({
      viewport: { width: device.width, height: device.height },
      isMobile: true,
      hasTouch: true,
    });
    try {
      await page.goto(base, { waitUntil: "domcontentloaded", timeout: 30_000 });
      const disclosure = page.locator("details.cuisineBrowseDisclosure");
      await disclosure.waitFor({ state: "visible", timeout: 30_000 });
      assert.equal(await disclosure.getAttribute("open"), null,
        device.label + ": cuisine list must be closed by default");
      await disclosure.locator("summary").click();
      await page.waitForFunction(() => document.querySelector("details.cuisineBrowseDisclosure")?.open === true);

      const buttons = disclosure.locator(".cuisineBrowseChoice");
      assert.equal(await buttons.count(), expectedCuisines.length,
        device.label + ": cuisine count must match the current taxonomy");
      const names = await buttons.locator(".cuisineBrowseChoiceName").allTextContents();
      assert.deepEqual(names.map((value) => value.trim()), expectedCuisines);
      await assertNoHorizontalOverflow(page, device.label + " open cuisine menu");

      const trigger = buttons.filter({ hasText: "Asiatisk" });
      await trigger.click();
      const dialog = page.locator("dialog.cuisineExploreDialog[open]");
      await dialog.getByRole("heading", { name: "Asiatisk" }).waitFor();
      const firstDish = dialog.locator(".cuisineExploreDish").first();
      await firstDish.waitFor({ state: "visible" });
      assert.ok((await firstDish.innerText()).length > 12,
        device.label + ": cuisine has no usable dish suggestions");
      await assertNoHorizontalOverflow(page, device.label + " cuisine dialog");

      await dialog.getByRole("button", { name: "Lukk Asiatisk" }).click();
      await dialog.waitFor({ state: "hidden" });
      assert.equal(await trigger.evaluate((button) => button === document.activeElement), true,
        device.label + ": focus not restored after closing cuisine");

      await trigger.click();
      const openDialog = page.locator("dialog.cuisineExploreDialog[open]");
      const link = openDialog.locator(".cuisineExploreDishHeading a[href*='/search?']").first();
      await link.waitFor({ state: "visible" });
      const href = await link.getAttribute("href");
      assert.ok(href, device.label + ": cuisine dish has no search link");
      const destination = new URL(href, base);
      assert.equal(destination.origin, new URL(base).origin);
      assert.equal(destination.pathname, "/search");
      const q = destination.searchParams.get("q");
      assert.ok(q && q.length >= 2, device.label + ": dish link loses its query");
      await link.click();
      await page.waitForURL((url) => url.pathname === "/search" && url.searchParams.get("q") === q,
        { timeout: 30_000 });
      await page.locator(".resultsIntro h1").waitFor({ state: "visible", timeout: 30_000 });
      assert.equal((await page.locator(".resultsIntro h1").innerText()).trim(), q);
      await assertNoHorizontalOverflow(page, device.label + " dish search");
      verified.push({ device: device.label, viewport: device.width + "x" + device.height,
        cuisineCount: names.length, dishQuery: q, destination: page.url() });
    } finally {
      await page.close();
    }
  }
  process.stdout.write(JSON.stringify({
    status: "verified",
    scope: "published Free UI: disclosure, cuisine dialog, keyboard focus, dish search on mobile and iPad",
    databaseVerified: false,
    liveBookingVerified: false,
    verified,
  }, null, 2) + "\n");
} finally {
  await browser.close();
}
