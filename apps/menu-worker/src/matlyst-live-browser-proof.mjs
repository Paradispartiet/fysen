import { chromium } from "playwright-core";

const base = (process.env.FYSEN_PUBLIC_WEB_URL || "https://fysen.vercel.app").replace(/\/$/, "");
const expectedCuisines = ["Asiatisk", "Indisk", "Fast food", "Italiensk", "Midtøsten", "Mexicansk"];
const browser = await chromium.launch({ channel: "chrome", headless: true, chromiumSandbox: true });

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto(base, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.locator(".cuisineCardInteractive").first().waitFor({ timeout: 30_000 });
  await page.locator(".cuisineCardInteractive .cuisineRestaurantNames").first().waitFor({ timeout: 30_000 });

  const cards = await page.locator(".cuisineCardInteractive").evaluateAll((elements) => elements.map((card) => ({
    cuisine: card.querySelector(".cuisineCardHeading strong")?.textContent?.trim() ?? "",
    restaurants: [...card.querySelectorAll(".cuisineRestaurantNames > span strong")]
      .map((name) => name.textContent?.trim() ?? "")
      .filter(Boolean),
  })));

  if (cards.length !== expectedCuisines.length) {
    throw new Error(`Expected ${expectedCuisines.length} Matlyst cards; found ${cards.length}`);
  }
  for (const [index, cuisine] of expectedCuisines.entries()) {
    const card = cards[index];
    if (card.cuisine !== cuisine || card.restaurants.length === 0) {
      throw new Error(`Missing live restaurant example for ${cuisine}: ${JSON.stringify(card)}`);
    }
  }

  process.stdout.write(`${JSON.stringify({ status: "verified", url: page.url(), viewport: "390x844", cards }, null, 2)}\n`);
} finally {
  await browser.close();
}
