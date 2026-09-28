import { chromium } from "playwright-core";
import process from "node:process";

const base = (process.env.FYSEN_PUBLIC_WEB_URL || "https://fysen.vercel.app").replace(/\/$/, "");
const browser = await chromium.launch({ channel: "chrome", headless: true, chromiumSandbox: true });
const journeys = [];

async function noHorizontalOverflow(page, surface) {
  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
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

  // 4. Food knowledge opens in a mobile dialog, shows fresh serving places, and closes back to results.
  await page.locator(".dishKnowledgeNote").getByRole("button", { name: "Lær om retten" }).click();
  const knowledge = page.locator(".dishKnowledgeDialog[open]");
  await knowledge.getByRole("heading", { name: /Hvor får du ramen i Oslo/u }).waitFor();
  await knowledge.locator(".dishKnowledgeRestaurantGrid a").first().waitFor({ timeout: 30_000 });
  await noHorizontalOverflow(page, "Ramen knowledge dialog");
  await knowledge.getByRole("button", { name: "Lukk kunnskap om Ramen" }).click();
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
  const example = await coveredDish.locator("li a strong").first().innerText();
  await coveredDish.locator("li a").first().click();
  await page.locator(".resultList .dishResult").first().waitFor({ timeout: 30_000 });
  await noHorizontalOverflow(page, "Matlyst dish results");
  journeys.push({ journey: "Matlyst → cuisine → dish → restaurant results", example });

  // 3. The live dish index leads to results for the selected dish.
  await page.goto(base, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.getByRole("link", { name: "Se alle retter i Oslo" }).click();
  const browse = page.locator(".dishBrowse");
  await browse.getByRole("heading", { name: "Alle retter i Oslo" }).waitFor();
  await browse.locator(".dishBrowseItemMain").first().waitFor({ timeout: 30_000 });
  await noHorizontalOverflow(page, "All dishes");
  const dish = await browse.locator(".dishBrowseItemMain strong").first().innerText();
  await browse.locator(".dishBrowseItemMain").first().click();
  await page.locator(".resultList .dishResult").first().waitFor({ timeout: 30_000 });
  await noHorizontalOverflow(page, "All dishes results");
  journeys.push({ journey: "all dishes → dish → results", dish });

  process.stdout.write(`${JSON.stringify({ status: "verified", viewport: "390x844", journeys }, null, 2)}\n`);
} finally {
  await browser.close();
}
