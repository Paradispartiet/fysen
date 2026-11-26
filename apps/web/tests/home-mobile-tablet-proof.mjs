/* global URL, process, document, Node, getComputedStyle, window */
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

      const header = page.locator(".globalHeader");
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForFunction(() => window.scrollY > 100);
      const headerBox = await header.boundingBox();
      assert.ok(headerBox && Math.abs(headerBox.y) <= 2, "Navigation stays at the viewport top while scrolling");
      const menu = header.locator("details.siteMenu");
      await menu.locator("summary").tap();
      assert.equal(await menu.locator(".siteMenuPanel").isVisible(), true, "Menu remains usable while scrolled");
      await menu.locator("summary").tap();
      await page.evaluate(() => window.scrollTo(0, 0));

      const kitchenMenu = page.locator("details.cuisineBrowseDisclosure");
      await kitchenMenu.waitFor({ state: "visible" });
      assert.equal(await kitchenMenu.getAttribute("open"), null,
        "Utforsk matretter must be closed on first paint");
      assert.equal(await page.locator(".cuisineBrowseList").isVisible(), false,
        "Kitchen choices must not clutter the homepage until explicitly expanded");

      await kitchenMenu.locator("summary").click();
      assert.notEqual(await kitchenMenu.getAttribute("open"), null,
        "Clicking the kitchen summary must expand its contents");
      assert.equal(await page.locator(".cuisineBrowseList").isVisible(), true);
      assert.equal(await page.locator(".cuisineBrowseChoice").count(), 12,
        "Opening the accordion must preserve all twelve cuisines");
      const kitchenHorizontalOverflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth + 2
      );
      assert.equal(kitchenHorizontalOverflow, false,
        "Expanded cuisine menu must not overflow on phones or iPads");
      await kitchenMenu.locator(".cuisineBrowseChoice").first().click();
      const kitchenDialog = page.locator(".cuisineExploreDialog");
      await kitchenDialog.waitFor({ state: "visible" });
      const regionFilter = kitchenDialog.locator("details.cuisineExploreAreas");
      const typeFilter = kitchenDialog.locator("details.cuisineExploreFoodTypes");
      assert.equal(await regionFilter.getAttribute("open"), null,
        "Region choices should be hidden on first kitchen selection");
      assert.equal(await typeFilter.getAttribute("open"), null,
        "Food-type choices should be hidden on first kitchen selection");
      assert.equal((await regionFilter.locator("summary strong").textContent())?.trim(), "Alle land",
        "Opening an Asian kitchen must show all countries rather than the first country");
      assert.equal((await kitchenDialog.locator(".cuisineExploreResultsHeading p").textContent())?.trim(),
        "Alle land");
      const initialDishCount = await kitchenDialog.locator(".cuisineExploreDish").count();
      assert.ok(initialDishCount > 0 && initialDishCount <= 12,
        "Overview should start with up to twelve suggestions");
      const preview = kitchenDialog.locator(".cuisineExploreRestaurantPreview").first();
      if (await preview.count()) {
        const names = preview.locator(":scope > .cuisineExploreRestaurantNames > li");
        const count = await names.count();
        assert.ok(count > 0 && count <= 4, "At most four restaurant names are shown initially");
        const restaurantDetails = preview.locator("details.cuisineExploreRestaurantDetails");
        if (await restaurantDetails.count()) {
          assert.equal(count, 4);
          assert.equal(await restaurantDetails.getAttribute("open"), null);
          await restaurantDetails.locator("summary").tap();
          assert.notEqual(await restaurantDetails.getAttribute("open"), null);
          assert.ok(await restaurantDetails.locator("li").count() > 0);
          await restaurantDetails.locator("summary").tap();
          assert.equal(await restaurantDetails.getAttribute("open"), null);
        }
        for (const link of await preview.locator("a.cuisineExploreRestaurantName").all()) {
          const href = await link.getAttribute("href");
          assert.ok(/^https?:\/\//u.test(href ?? ""), "Names only link to actual menu sources");
        }
      }
      await context.grantPermissions(["geolocation"]);
      await context.setGeolocation({ latitude: 59.91465, longitude: 10.72082 });
      await kitchenDialog.getByRole("button", { name: "Vis nærmest meg" }).tap();
      await kitchenDialog.getByRole("button", { name: "Slå av avstandssortering" }).waitFor({ state: "visible" });
      assert.match(await kitchenDialog.locator(".cuisineExploreLocation [role=status]").textContent() ?? "", /luftlinje/u);
      if (await preview.count()) {
        assert.ok(await preview.locator(":scope > .cuisineExploreRestaurantNames > li").count() <= 4);
        assert.ok(await preview.locator(".cuisineExploreDistanceNote").first().isVisible());
      }
      await kitchenDialog.getByRole("button", { name: "Slå av avstandssortering" }).tap();
      await kitchenDialog.getByRole("button", { name: "Vis nærmest meg" }).waitFor({ state: "visible" });
      const expandDishes = kitchenDialog.locator(".cuisineExploreShowMore");
      if (await expandDishes.count()) {
        await expandDishes.click();
        assert.ok((await kitchenDialog.locator(".cuisineExploreDish").count()) > initialDishCount);
        await expandDishes.click();
        assert.equal(await kitchenDialog.locator(".cuisineExploreDish").count(), initialDishCount);
      }
      await regionFilter.locator("summary").click();
      assert.notEqual(await regionFilter.getAttribute("open"), null);
      const region = regionFilter.locator("button.cuisineAreaTile").nth(1);
      const regionName = (await region.locator("span").last().textContent())?.trim();
      assert.ok(regionName);
      await region.click();
      assert.equal((await regionFilter.locator("summary strong").textContent())?.trim(), regionName);
      assert.equal(await regionFilter.getAttribute("open"), null,
        "Region choices should collapse after selecting a region");
      await typeFilter.locator("summary").click();
      assert.equal(await regionFilter.getAttribute("open"), null,
        "Opening food types should close the other filter group");
      const foodType = typeFilter.locator("button:not(.cuisineExploreResetChoice)").first();
      const typeName = (await foodType.locator("strong").textContent())?.trim();
      assert.ok(typeName);
      await foodType.click();
      assert.equal((await typeFilter.locator("summary strong").textContent())?.trim(), typeName);
      assert.equal((await kitchenDialog.locator(".cuisineExploreResultsHeading p").textContent())?.trim(), typeName);
      assert.equal(await typeFilter.getAttribute("open"), null,
        "Type choices should collapse after selecting a food type");
      await regionFilter.locator("summary").click();
      await regionFilter.locator(".cuisineExploreResetChoice").click();
      assert.equal((await kitchenDialog.locator(".cuisineExploreResultsHeading p").textContent())?.trim(),
        "Alle land",
        "The all-countries action must restore the full kitchen overview");
      const dialogSizes = await kitchenDialog.evaluate((dialog) => ({
        viewportWidth: document.documentElement.clientWidth,
        scrollWidth: dialog.scrollWidth,
        clientWidth: dialog.clientWidth,
      }));
      assert.ok(dialogSizes.scrollWidth <= dialogSizes.clientWidth + 2,
        `Kitchen dialog must not overflow: ${JSON.stringify(dialogSizes)}`);
      await page.locator(".cuisineExploreDialogClose").click();
      await kitchenMenu.locator("summary").click();
      assert.equal(await kitchenMenu.getAttribute("open"), null,
        "The user can fold kitchen exploration closed again");
      assert.equal(await page.locator(".cuisineBrowseList").isVisible(), false);

      const details = page.locator("details.dishPhotos");
      await details.waitFor({ state: "visible", timeout: 30_000 });
      assert.equal(await details.getAttribute("open"), null, "Image gallery must be closed on first paint");
      assert.equal(await page.locator(".dishPhotosGrid").isVisible(), false,
        "Gallery grid must not overwhelm the front page before explicit opening");

      const ordering = await page.evaluate(() => {
        const cuisines = document.querySelector(".cuisineBrowseList");
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
      const approved = manifest.images.filter((image) => image.largeViewEnabled === true);
      const cards = details.locator(".dishPhotosGrid .dishPhotoCard");
      assert.equal(await cards.getByRole("link", { name: /^Vis stort bilde av /u }).count(), 0);
      for (const [index, entry] of manifest.images.entries()) {
        const image = cards.nth(index).locator("img.dishEditorialImage");
        const file = entry.largeViewEnabled === true && entry.largeSource ? entry.largeSource : entry.atlas;
        assert.ok((await image.getAttribute("src")).endsWith(`/dish-images/${file}`), entry.id);
      }
      const prosciutto = approved.find((image) => image.id === "pizza-prosciutto");
      assert.ok(prosciutto);
      const card = cards.nth(manifest.images.indexOf(prosciutto));
      const image = card.locator("img");
      await image.scrollIntoViewIfNeeded();
      const dimensions = await image.evaluate(async (node) => {
        await node.decode();
        return [node.naturalWidth, node.naturalHeight];
      });
      assert.deepEqual(dimensions, [prosciutto.largeSourceNativeWidth, prosciutto.largeSourceNativeHeight]);
      const menuLink = card.getByRole("link", { name: /Pizza med prosciutto.*Se menytreff/u });
      const menuUrl = new URL(await menuLink.getAttribute("href"), base);
      assert.equal(menuUrl.pathname, "/search");
      assert.equal(menuUrl.searchParams.get("q"), "pizza prosciutto");
      if (output) await page.screenshot({ path: path.join(output, `${viewport.name}-expanded.png`), animations: "disabled" });

      await page.locator(".dishPhotosPreview").click();
      assert.equal(await details.getAttribute("open"), null, "Gallery should close again");
      assert.equal(await page.locator(".dishPhotosGrid").isVisible(), false);

      const dishSearch = await page.goto(`${base}/search?q=dal+makhani&city=Oslo`, { timeout: 60_000 });
      assert.equal(dishSearch?.status(), 200, "The Dal makhani search page must load");
      const note = page.getByRole("complementary", { name: "Om retten Dal makhani" });
      await note.waitFor({ state: "visible" });
      assert.match(await note.innerText(), /Fysen matleksikon[\s\S]*uradbønner/iu);
      const dishImage = note.locator("img.dishEditorialImage");
      await dishImage.waitFor({ state: "visible" });
      const dal = manifest.images.find((entry) => entry.id === "dal-makhani");
      const dalFile = dal.largeViewEnabled === true && dal.largeSource ? dal.largeSource : dal.atlas;
      assert.ok((await dishImage.getAttribute("src")).endsWith(`/dish-images/${dalFile}`));
      assert.equal((await page.request.get(`${base}/dish-images/${dalFile}`)).status(), 200);
      await checkOverflow("Dal makhani search");
      if (output) await note.screenshot({ path: path.join(output, `${viewport.name}-dish-search.png`), animations: "disabled" });

      await note.getByRole("button", { name: "Lær om retten" }).click();
      const knowledge = page.getByRole("dialog", { name: "Dal makhani" });
      await knowledge.getByRole("heading", { name: "Slik lager du dal makhani" }).waitFor({ state: "visible" });
      await knowledge.getByRole("button", { name: "Lukk kunnskap om Dal makhani" }).click();
      await knowledge.waitFor({ state: "hidden" });
      process.stdout.write(`PASS ${viewport.name} ${viewport.width}x${viewport.height}: gallery, Dal makhani image and Matleksikon, no overflow\n`);
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
