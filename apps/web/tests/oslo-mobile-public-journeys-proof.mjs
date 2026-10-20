import { chromium } from "playwright-core";
import process from "node:process";
import { URL } from "node:url";

const base = (process.env.FYSEN_PUBLIC_WEB_URL || "https://fysen.vercel.app").replace(/\/$/, "");
const browser = await chromium.launch({ channel: "chrome", headless: true, chromiumSandbox: true });
const journeys = [];

async function noHorizontalOverflow(page, surface) {
  const dimensions = await page.evaluate(() => ({
    viewport: globalThis.innerWidth,
    document: globalThis.document.documentElement.scrollWidth,
  }));
  if (dimensions.document > dimensions.viewport + 1) {
    throw new Error(`${surface} overflows horizontally: ${JSON.stringify(dimensions)}`);
  }
}

async function externalDestination(link, label) {
  await link.waitFor({ state: "visible", timeout: 30_000 });
  const href = await link.getAttribute("href");
  if (!href || !/^https:\/\/[^/]+/u.test(href)) {
    throw new Error(`${label} lacks an HTTPS destination: ${href}`);
  }
  return href;
}

async function assertDishDestination(page, href, label) {
  if (!href) throw new Error(`${label} lacks a search link`);
  const destination = new URL(href, base);
  const query = destination.searchParams.get("q");
  if (destination.origin !== new URL(base).origin || destination.pathname !== "/search" || !query) {
    throw new Error(`${label} has an invalid dish search destination: ${href}`);
  }
  await page.waitForURL(
    (url) => url.origin === destination.origin && url.pathname === destination.pathname && url.searchParams.get("q") === query,
    { timeout: 30_000 },
  );
  const heading = (await page.locator(".resultsIntro h1").innerText()).trim();
  if (heading !== query) throw new Error(`${label} reached ${heading} instead of ${query}`);
  return query;
}

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  // 1. Search, restaurant, menu evidence and a booking destination on the same result.
  await page.goto(base, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.getByRole("searchbox", { name: "Retten du vil spise" }).fill("ramen");
  await page.getByRole("button", { name: "Finn retten" }).click();
  const ramenResult = page.locator(".resultList .dishResult")
    .filter({ has: page.locator(".restaurantName", { hasText: "Hrimnir Ramen Storgata" }) }).first();
  await ramenResult.waitFor({ timeout: 30_000 });
  const restaurant = await externalDestination(ramenResult.locator(".restaurantLink"), "Restaurant");
  const menu = await externalDestination(ramenResult.getByRole("link", { name: "Meny" }), "Menybevis");
  const booking = await externalDestination(ramenResult.getByRole("link", { name: "Bestill bord" }), "Booking");
  if (!(await ramenResult.innerText()).includes("Sjekket")) throw new Error("Restaurant result lacks menu freshness");
  await noHorizontalOverflow(page, "Ramen results");
  journeys.push({ journey: "search → result → restaurant/menu/booking", restaurant, menu, booking });
  // Mobile map navigation must choose the actual restaurant, not just the first map result.
  await ramenResult.getByRole("button", { name: "Vis Hrimnir Ramen Storgata på kart" }).click();
  const map = page.getByRole("region", { name: "Kart over restauranter i de viste treffene" });
  await map.getByTitle("Kart: Hrimnir Ramen Storgata").waitFor({ state: "visible" });
  const backToDish = map.getByRole("link", { name: "Til rettetreffet" });
  const returnHref = await backToDish.getAttribute("href");
  if (returnHref !== "#" + await ramenResult.getAttribute("id")) {
    throw new Error("Map did not link back to the selected restaurant's dish");
  }
  await noHorizontalOverflow(page, "Restaurant-specific map at 390px");
  await page.setViewportSize({ width: 320, height: 720 });
  await noHorizontalOverflow(page, "Restaurant-specific map at 320px");
  await page.getByRole("button", { name: "Skjul kart" }).click();
  await map.waitFor({ state: "hidden" });
  await page.setViewportSize({ width: 390, height: 844 });
  journeys.push({ journey: "restaurant card → selected map → same dish", viewportWidths: [390, 320] });


  // 4. Food knowledge opens in a mobile dialog, shows fresh serving places, and closes back to results.
  await page.locator(".dishKnowledgeNote").getByRole("button", { name: "Lær om retten" }).click();
  const knowledge = page.locator(".dishKnowledgeDialog[open]");
  await knowledge.getByRole("heading", { name: /Hvor får du ramen i Oslo/u }).waitFor();
  await knowledge.locator(".dishKnowledgeRestaurantGrid a").first().waitFor({ timeout: 30_000 });
  await noHorizontalOverflow(page, "Ramen knowledge dialog");
  await knowledge.getByRole("button", { name: "Lukk kunnskap om Ramen" }).click();
  await knowledge.waitFor({ state: "hidden", timeout: 30_000 });
  await ramenResult.waitFor({ state: "visible" });
  journeys.push({ journey: "search → knowledge → serving places → results" });

  // 2. Matlyst, cuisine, a covered dish and a restaurant example lead to current results.
  await page.goto(base, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.locator(".cuisineCardInteractive")
    .filter({ has: page.locator(".cuisineCardHeading strong", { hasText: "Asiatisk" }) })
    .locator(".cuisineCardTrigger").click();
  const cuisine = page.locator(".cuisineExploreDialog[open]");
  const coveredDish = cuisine.locator('.cuisineExploreDish[data-has-coverage="true"]')
    .filter({ has: page.locator("li a strong") }).first();
  await coveredDish.waitFor({ timeout: 30_000 });
  const dishLabel = await coveredDish.locator(".cuisineExploreDishHeading h4").innerText();
  const dishHref = await coveredDish.locator(".cuisineExploreDishHeading a").getAttribute("href");
  const exampleLink = coveredDish.locator("li a").first();
  const exampleHref = await exampleLink.getAttribute("href");
  const example = await exampleLink.locator("strong").innerText();
  if (!dishHref || !exampleHref || new URL(dishHref, base).searchParams.get("q") !== new URL(exampleHref, base).searchParams.get("q")) {
    throw new Error(`Matlyst restaurant example does not point to the selected dish ${dishLabel}`);
  }
  await exampleLink.click();
  const query = await assertDishDestination(page, exampleHref, `Matlyst ${dishLabel}`);
  await page.locator(".resultList .dishResult").first().waitFor({ timeout: 30_000 });
  await noHorizontalOverflow(page, "Matlyst dish results");
  journeys.push({ journey: "Matlyst → cuisine → dish → restaurant results", dish: dishLabel, example, query });

  // 3. The live dish index leads to results for the selected dish.
  await page.goto(base, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.getByRole("link", { name: "Se alle retter i Oslo" }).click();
  const browse = page.locator(".dishBrowse");
  await browse.getByRole("heading", { name: "Alle retter i Oslo" }).waitFor();
  await browse.locator(".dishBrowseItemMain").first().waitFor({ timeout: 30_000 });
  await noHorizontalOverflow(page, "All dishes");
  const dishLink = browse.locator(".dishBrowseItemMain").first();
  const dish = await dishLink.locator("strong").innerText();
  const browseDishHref = await dishLink.getAttribute("href");
  await dishLink.click();
  const browseQuery = await assertDishDestination(page, browseDishHref, `All dishes ${dish}`);
  await page.locator(".resultList .dishResult").first().waitFor({ timeout: 30_000 });
  await noHorizontalOverflow(page, "All dishes results");
  journeys.push({ journey: "all dishes → dish → results", dish, query: browseQuery });

  process.stdout.write(`${JSON.stringify({ status: "verified", viewport: "390x844", journeys }, null, 2)}\n`);
} finally {
  await browser.close();
}
