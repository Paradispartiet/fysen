import assert from "node:assert/strict";
import { chromium } from "playwright-core";
import process from "node:process";
import { URL } from "node:url";

// Independent public search / archive resilience proof.
// It does NOT replace the strict live-DB + booking production proof.
const webBase = (process.env.FYSEN_PUBLIC_WEB_URL || "https://fysen.vercel.app").replace(/\/$/, "");
const apiBase = (process.env.FYSEN_PUBLIC_API_URL || "https://fysen-api.vercel.app").replace(/\/$/, "");

async function visibleResult(page) {
  await page.waitForFunction(() => Boolean(
    document.querySelector('section[aria-label="Menytreff"] article, .resultList .dishResult'),
  ), null, { timeout: 30_000 });
  const archived = page.locator('section[aria-label="Menytreff"] article');
  if (await archived.count()) {
    const first = archived.first();
    const link = first.getByRole("link", { name: "Se meny" });
    const href = await link.getAttribute("href");
    assert.ok(href && /^https?:\/\/[^/]+/u.test(href), "Archived menu must link to its actual source");
    assert.ok((await first.innerText()).trim().length > 15, "Archived result must identify a dish and restaurant");
    assert.equal(await first.getByRole("link", { name: "Bestill bord" }).count(), 0,
      "Archive cannot invent a booking destination");
    return { mode: "archive", sourceUrl: href };
  }

  const live = page.locator(".resultList .dishResult").first();
  await live.waitFor({ state: "visible" });
  const name = (await live.locator(".restaurantName").first().innerText()).trim();
  assert.ok(name, "Live result must identify its restaurant");
  return { mode: "live", restaurant: name };
}

async function mobileWidth(page, label) {
  const { viewport, documentWidth } = await page.evaluate(() => ({
    viewport: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));
  assert.ok(documentWidth <= viewport + 2,
    label + " overflows the mobile viewport: " + documentWidth + " > " + viewport);
}

const statusResponse = await fetch(apiBase + "/v1/dishes/archive/status", {
  headers: { accept: "application/json" },
  signal: AbortSignal.timeout(20_000),
});
assert.equal(statusResponse.status, 200, "The independent archive API must be public");
const status = await statusResponse.json();
assert.equal(status.source, "verified-menu-archive");
assert.equal(status.realtime, false);
assert.ok(status.restaurants >= 900 && status.menuItems >= 40_000);
assert.ok(status.identityQuarantines >= 4);

const browser = await chromium.launch({ channel: "chrome", headless: true, chromiumSandbox: true });
try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  await page.goto(webBase, { waitUntil: "domcontentloaded", timeout: 30_000 });
  const input = page.getByRole("searchbox", { name: "Retten du vil spise" });
  await input.fill("ramen");
  await page.getByRole("button", { name: "Finn retten" }).click();
  await page.waitForURL((url) =>
    url.pathname === "/search" && url.searchParams.get("q") === "ramen", { timeout: 30_000 });
  const search = await visibleResult(page);
  await mobileWidth(page, "Ramen search");

  await page.goto(webBase, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.getByRole("link", { name: "Se alle retter i Oslo" }).click();
  await page.waitForFunction(() => Boolean(
    document.querySelector('.dishBrowseItemMain, section[aria-label="Utvalgte retter"] article a'),
  ), null, { timeout: 30_000 });

  const archivedLinks = page.locator('section[aria-label="Utvalgte retter"] article a');
  const link = (await archivedLinks.count()) ? archivedLinks.first() :
    page.locator(".dishBrowseItemMain").first();
  const href = await link.getAttribute("href");
  assert.ok(href, "All dishes needs a navigable dish result");
  const destination = new URL(href, webBase);
  assert.equal(destination.origin, new URL(webBase).origin);
  assert.equal(destination.pathname, "/search");
  const q = destination.searchParams.get("q");
  assert.ok(q && q.length >= 2, "Dish browse must preserve its selected query");
  await mobileWidth(page, "All dishes");
  await link.click();
  await page.waitForURL((url) => url.pathname === "/search" && url.searchParams.get("q") === q,
    { timeout: 30_000 });
  const browseSearch = await visibleResult(page);
  await mobileWidth(page, "Browse-to-search");

  process.stdout.write(JSON.stringify({
    status: "verified",
    proof: "public read-only mobile search, not live database or booking availability",
    archiveApi: { restaurants: status.restaurants, menuItems: status.menuItems },
    viewport: "390x844",
    ramen: search,
    browseQuery: q,
    browseSearch,
  }, null, 2) + "\n");
} finally {
  await browser.close();
}
