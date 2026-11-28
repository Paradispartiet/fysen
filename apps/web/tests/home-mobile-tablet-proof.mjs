/* global URL, process, document, Node, window */
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
      assert.equal(await menu.getByText("Velg by", { exact: true }).count(), 0);
      assert.equal(await menu.getByRole("link", { name: "København", exact: true }).count(), 0);
      const cityPicker = header.locator("details.cityMenu");
      await cityPicker.locator("summary").tap();
      assert.equal(await menu.locator(".siteMenuPanel").isVisible(), false, "City picker closes the main menu");
      assert.equal(await cityPicker.locator(".cityMenuPanel").isVisible(), true);
      assert.equal(await cityPicker.getByRole("link").count(), 5);
      assert.equal(await cityPicker.getByRole("link", { name: "Oslo", exact: true }).getAttribute("aria-current"), "true");
      const cityHref = await cityPicker.getByRole("link", { name: "København", exact: true }).getAttribute("href");
      assert.equal(new URL(cityHref, base).searchParams.get("city"), "København");
      assert.ok(new URL(cityHref, base).pathname.endsWith("/"), "City selection opens the homepage");
      const cityPanelBox = await cityPicker.locator(".cityMenuPanel").boundingBox();
      assert.ok(cityPanelBox && cityPanelBox.x >= 0 && cityPanelBox.x + cityPanelBox.width <= viewport.width + 2);
      await menu.locator("summary").tap();
      assert.equal(await cityPicker.locator(".cityMenuPanel").isVisible(), false, "Main menu closes the city picker");
      await menu.locator("summary").tap();
      await page.evaluate(() => window.scrollTo(0, 0));

      await cityPicker.locator("summary").tap();
      await cityPicker.getByRole("link", { name: "København", exact: true }).tap();
      await page.waitForURL(url => url.searchParams.get("city") === "København" && url.pathname.endsWith("/"));
      await page.getByRole("heading", { name: "Hva har du lyst på?" }).waitFor({ state: "visible" });
      await page.getByLabel("By: København. Bytt by").waitFor({ state: "visible" });
      assert.equal(await page.locator('form[role="search"] input[name="city"]').inputValue(), "København");
      assert.equal(await page.locator("a.homeDishBrowseLink").filter({ hasText: "Se alle retter" }).count(), 1);
      assert.equal(await page.getByRole("link", { name: /Se alle retter i København/ }).count(), 1);
      assert.equal(await page.getByRole("link", { name: /Se alle retter i Oslo/ }).count(), 0);
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.getByLabel("By: København. Bytt by").waitFor({ state: "visible" });
      await cityPicker.locator("summary").tap();
      await cityPicker.getByRole("link", { name: "Oslo", exact: true }).tap();
      await page.waitForURL(url => url.searchParams.get("city") === "Oslo" && url.pathname.endsWith("/"));
      await page.getByLabel("By: Oslo. Bytt by").waitFor({ state: "visible" });

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

      // Verify the compact encyclopedia cards independently of the gallery.
      const learning = page.locator(".dishLearningSection");
      const ramen = learning.locator("#learn-card-ramen");
      await ramen.scrollIntoViewIfNeeded();
      const picture = ramen.locator(".dishLearningCardHeader img.dishEditorialImage");
      await picture.waitFor({ state: "visible" });
      const geometry = await ramen.evaluate((card) => {
        const heading = card.querySelector(".dishLearningCardHeading").getBoundingClientRect();
        const photo = card.querySelector(".dishEditorialImage").getBoundingClientRect();
        const title = card.querySelector("h3").getBoundingClientRect();
        const summary = card.querySelector(":scope > p").getBoundingClientRect();
        return { headingRight: heading.right, photoLeft: photo.left, photoTop: photo.top,
          photoBottom: photo.bottom, photoWidth: photo.width, headingTop: heading.top,
          titleTop: title.top, titleBottom: title.bottom, summaryTop: summary.top };
      });
      assert.ok(geometry.photoLeft >= geometry.headingRight - 1, "Image must be beside, not above, the heading");
      assert.ok(Math.abs(geometry.photoTop - geometry.headingTop) <= 2, "Image and heading start on the same row");
      assert.ok(geometry.photoWidth > 0 && geometry.photoWidth <= 101, "Image must be compact");
      assert.ok(geometry.summaryTop >= Math.max(geometry.photoBottom, geometry.titleBottom) - 1);
      assert.equal(await learning.locator(".dishLearningCard .dishEditorialCredit").count(), 0);
      assert.ok((await picture.getAttribute("src")).endsWith("/" + (manifest.images.find((entry) => entry.id === "ramen").largeSource || manifest.images.find((entry) => entry.id === "ramen").atlas)));
      await checkOverflow("Matleksikon");
      if (output) await ramen.screenshot({ path: path.join(output, `${viewport.name}-matleksikon-card.png`), animations: "disabled" });
      await ramen.locator(".dishLearningTitleButton").click();
      const ramenDialog = page.getByRole("dialog", { name: "Ramen", exact: true });
      await ramenDialog.waitFor({ state: "visible" });
      async function checkKnowledgePhoto(dialog, entry) {
        assert.ok(entry?.largeViewEnabled && entry.largeSource, "Expected an approved master image");
        const photo = dialog.locator(".dishKnowledgeHeroPhoto img.dishEditorialImage");
        await photo.waitFor({ state: "visible" });
        assert.ok((await photo.getAttribute("src")).endsWith(`/dish-images/${entry.largeSource}`));
        const actual = await photo.evaluate(async (node) => {
          await node.decode();
          const image = node.getBoundingClientRect();
          const title = node.closest(".dishKnowledgeDialogHeader").querySelector("h2").getBoundingClientRect();
          const shell = node.closest(".dishKnowledgeDialogShell");
          return { width: node.naturalWidth, height: node.naturalHeight,
            imageLeft: image.left, imageRight: image.right, imageWidth: image.width, titleRight: title.right,
            clientWidth: shell.clientWidth, scrollWidth: shell.scrollWidth };
        });
        assert.deepEqual([actual.width, actual.height], [entry.largeSourceNativeWidth, entry.largeSourceNativeHeight]);
        assert.ok(actual.imageWidth > 0 && actual.imageLeft >= actual.titleRight - 2,
          "Detail image must be visible beside the heading");
        assert.ok(actual.imageRight <= viewport.width + 2 && actual.scrollWidth <= actual.clientWidth + 2,
          "Detail image must not cause horizontal overflow");
        assert.equal(await dialog.locator(".dishKnowledgeHeroPhoto figcaption").count(), 0);
      }
      await checkKnowledgePhoto(ramenDialog, manifest.images.find((entry) => entry.id === "ramen"));
      if (output) await ramenDialog.screenshot({ path: path.join(output, `${viewport.name}-matleksikon-detail.png`), animations: "disabled" });
      const credit = ramenDialog.getByRole("region", { name: "Bildekreditering" });
      assert.match(await credit.innerText(), /Pexels/u);
      assert.ok(await credit.getByRole("link", { name: "Lisens" }).count());
      await ramenDialog.getByRole("button", { name: "Lukk kunnskap om Ramen" }).click();
      await ramenDialog.waitFor({ state: "hidden" });

      const dishSearch = await page.goto(`${base}/search?q=dal+makhani&city=Oslo`, { timeout: 60_000 });
      assert.equal(dishSearch?.status(), 200, "The Dal makhani search page must load");
      const note = page.getByRole("complementary", { name: "Om retten Dal makhani" });
      await note.waitFor({ state: "visible" });
      const resultsCityPicker = page.getByRole("banner").locator("details.cityMenu");
      await resultsCityPicker.locator("summary").tap();
      const resultsCityHref = await resultsCityPicker.getByRole("link", { name: "Stockholm", exact: true }).getAttribute("href");
      const resultsCityUrl = new URL(resultsCityHref, base);
      assert.equal(resultsCityUrl.searchParams.get("city"), "Stockholm");
      assert.ok(resultsCityUrl.pathname.endsWith("/"), "City selection from search returns home");
      assert.equal(resultsCityUrl.searchParams.get("q"), "dal makhani", "City switching must preserve the active search");
      await resultsCityPicker.locator("summary").tap();
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
      await checkKnowledgePhoto(knowledge, dal);
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
