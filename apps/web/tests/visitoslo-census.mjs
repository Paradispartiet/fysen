import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";
import process from "node:process";

const SOURCE = "https://www.visitoslo.com/restaurants-nightlife/restaurants";
const EXPECTED = 330;
const PAGE_SIZE = 12;
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  chromiumSandbox: true,
});
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, locale: "en-US" });

function rangeFromText(text) {
  const match = text.match(/(?:Showing|Viser)\s+(\d+)\s*[–-]\s*(\d+)\s+(?:of|av)\s+(\d+)\s+(?:products|produkter)/iu);
  return match ? { from: Number(match[1]), to: Number(match[2]), total: Number(match[3]) } : null;
}

async function readRange() {
  const text = await page.locator("body").innerText();
  return rangeFromText(text);
}

async function waitForRange(expectedStart) {
  await page.waitForFunction((start) => {
    const match = document.body.innerText.match(/(?:Showing|Viser)\s+(\d+)\s*[–-]\s*(\d+)\s+(?:of|av)\s+(\d+)\s+(?:products|produkter)/iu);
    return !!match && Number(match[1]) === start;
  }, expectedStart, { timeout: 25000 });
}

async function pageItems() {
  return page.locator("h3").evaluateAll((nodes) => nodes
    .filter((node) => node.getClientRects().length > 0)
    .map((node) => {
      const name = node.textContent?.trim().replace(/\s+/gu, " ") || "";
      const anchor = node.closest("a") || node.querySelector("a") || node.parentElement?.querySelector("a[href]");
      return { name, url: anchor?.href || null };
    })
    .filter((item) => item.name));
}

async function clickNext() {
  for (const role of ["button", "link"]) {
    const candidate = page.getByRole(role, { name: /^(Next|Neste)$/iu }).first();
    if (await candidate.count() && await candidate.isVisible()) {
      await candidate.click({ timeout: 15000 });
      return;
    }
  }
  const candidate = page.getByText(/^(Next|Neste)$/iu).last();
  if (await candidate.count() && await candidate.isVisible()) {
    await candidate.click({ timeout: 15000 });
    return;
  }
  const controls = await page.locator("a,button").evaluateAll((nodes) => nodes
    .filter((node) => /next|neste|pagination/iu.test((node.textContent || "") + " " + (node.getAttribute("aria-label") || "")))
    .map((node) => ({ text: node.textContent?.trim(), aria: node.getAttribute("aria-label"), href: node.getAttribute("href") }))
    .slice(0, 20));
  throw new Error("Cannot locate Next pagination control: " + JSON.stringify(controls));
}

const batches = [];
try {
  const navigation = await page.goto(SOURCE, { waitUntil: "domcontentloaded", timeout: 45000 });
  process.stdout.write("VISITOSLO_NAVIGATION " + JSON.stringify({ status: navigation?.status(), url: page.url(), title: await page.title(), body: (await page.locator("body").innerText()).slice(0, 1100) }) + "\\n");
  try {
    await page.locator("#onetrust-accept-btn-handler").click({ timeout: 2000 });
  } catch { /* Cookie prompt absent or unobtrusive. */ }

  for (let index = 0; index < Math.ceil(EXPECTED / PAGE_SIZE); index++) {
    const from = index * PAGE_SIZE + 1;
    await waitForRange(from);
    const range = await readRange();
    const items = await pageItems();
    if (!range || range.total !== EXPECTED || range.from !== from) {
      throw new Error("Unexpected VisitOSLO range on page " + (index + 1) + ": " + JSON.stringify(range));
    }
    if (items.length !== range.to - range.from + 1) {
      throw new Error("Heading/card count mismatch on page " + (index + 1) +
        ": expected " + (range.to - range.from + 1) + ", got " + items.length +
        "; headings=" + JSON.stringify(items));
    }
    batches.push({ page: index + 1, ...range, items });
    process.stdout.write("VISITOSLO_PAGE " + JSON.stringify(batches.at(-1)) + "\n");
    if (range.to === EXPECTED) break;
    await clickNext();
    await page.waitForTimeout(350);
  }
  const all = batches.flatMap((batch) => batch.items);
  if (all.length !== EXPECTED || batches.length !== Math.ceil(EXPECTED / PAGE_SIZE)) {
    throw new Error("Incomplete pagination: " + batches.length + " pages, " + all.length + " of " + EXPECTED + " products");
  }
  const output = {
    source: SOURCE,
    fetchedAt: new Date().toISOString(),
    declaredCount: EXPECTED,
    pages: batches.length,
    products: all,
    batches,
  };
  const filename = process.env.VISITOSLO_CENSUS_OUTPUT || "visitoslo-census.json";
  writeFileSync(filename, JSON.stringify(output, null, 2) + "\n", "utf8");
  process.stdout.write("VISITOSLO_COMPLETE " + JSON.stringify({ count: all.length, pages: batches.length, file: filename }) + "\n");
} catch (error) {
  process.stderr.write("VISITOSLO_ERROR " + String(error) + "\n");
  process.stderr.write("VISITOSLO_DIAGNOSTIC " + JSON.stringify({
    url: page.url(),
    statusTitle: await page.title().catch(() => ""),
    visibleText: await page.locator("body").innerText().then((t) => t.slice(0, 2500)).catch(() => ""),
    range: await readRange().catch(() => null),
    headings: await page.locator("h3").allTextContents().catch(() => []),
    pagination: await page.locator("a,button").evaluateAll((nodes) => nodes
      .filter((node) => /next|neste|pagination|[0-9]/iu.test((node.textContent || "") + " " + (node.getAttribute("aria-label") || "")))
      .map((node) => ({ text: node.textContent?.trim().slice(0, 70), href: node.getAttribute("href"), aria: node.getAttribute("aria-label") }))
      .slice(-40)).catch(() => []),
  }) + "\n");
  process.exitCode = 1;
} finally {
  await browser.close();
}
