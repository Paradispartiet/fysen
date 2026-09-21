import { writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const sourceUrl = "https://www.visitoslo.com/restaurants-nightlife/restaurants";
const outputPath = "research/visitoslo-catalogue-2026-09-21.snapshot.json";

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  chromiumSandbox: true
});

try {
  const context = await browser.newContext({ serviceWorkers: "block" });
  try {
    const page = await context.newPage();
    page.setDefaultTimeout(30_000);
    page.setDefaultNavigationTimeout(60_000);

    await page.goto(sourceUrl, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() =>
      /Showing\s+\d+\s*[–-]\s*\d+\s+of\s+\d+\s+products/i.test(document.body.innerText)
    );

    const pages = [];
    let expectedTotal = null;
    let previousEnd = 0;

    for (let pageNumber = 1; pageNumber <= 40; pageNumber += 1) {
      await page.waitForTimeout(500);

      const bodyText = await page.locator("body").innerText();
      const match = bodyText.match(/Showing\s+(\d+)\s*[–-]\s*(\d+)\s+of\s+(\d+)\s+products/i);
      if (!match) {
        throw new Error(`Page ${pageNumber}: could not find VisitOSLO product range`);
      }

      const start = Number(match[1]);
      const end = Number(match[2]);
      const total = Number(match[3]);
      if (expectedTotal === null) expectedTotal = total;
      if (total !== expectedTotal) {
        throw new Error(`Page ${pageNumber}: total drifted from ${expectedTotal} to ${total}`);
      }
      if (start !== previousEnd + 1) {
        throw new Error(`Page ${pageNumber}: expected range to start at ${previousEnd + 1}, got ${start}`);
      }

      const products = await page.locator("h3:visible").evaluateAll((nodes) =>
        nodes
          .map((node) => {
            const name = (node.textContent ?? "").replace(/\s+/g, " ").trim();
            if (!name) return null;

            let href = node.closest("a[href]")?.getAttribute("href") ?? null;
            if (!href) {
              let parent = node.parentElement;
              for (let depth = 0; parent && depth < 5 && !href; depth += 1, parent = parent.parentElement) {
                const anchors = Array.from(parent.querySelectorAll("a[href]"));
                const matching = anchors.find((anchor) =>
                  (anchor.textContent ?? "").replace(/\s+/g, " ").trim().includes(name)
                );
                href = matching?.getAttribute("href") ?? null;
              }
            }
            return { name, href };
          })
          .filter(Boolean)
      );

      const expectedOnPage = end - start + 1;
      if (products.length !== expectedOnPage) {
        const visibleHeadings = await page.locator("h1:visible, h2:visible, h3:visible, h4:visible").allTextContents();
        throw new Error(
          `Page ${pageNumber}: expected ${expectedOnPage} product h3 headings, found ${products.length}. Headings: ${JSON.stringify(visibleHeadings)}`
        );
      }

      pages.push({
        page: pageNumber,
        url: page.url(),
        start,
        end,
        total,
        products
      });

      console.log(
        JSON.stringify({
          page: pageNumber,
          range: `${start}-${end}/${total}`,
          products: products.map((product) => product.name)
        })
      );

      previousEnd = end;
      if (end >= total) break;

      const next = page
        .locator("a:visible")
        .filter({ hasText: /^\s*Next\s*$/i })
        .first();

      if ((await next.count()) !== 1) {
        throw new Error(`Page ${pageNumber}: visible Next link not found`);
      }

      const nextHref = await next.getAttribute("href");
      const previousRange = `${start}-${end}`;
      if (nextHref && nextHref !== "#" && !nextHref.toLowerCase().startsWith("javascript:")) {
        await page.goto(new URL(nextHref, page.url()).href, { waitUntil: "domcontentloaded" });
      } else {
        await next.click();
      }

      await page.waitForFunction(
        ({ previousRange }) => {
          const match = document.body.innerText.match(
            /Showing\s+(\d+)\s*[–-]\s*(\d+)\s+of\s+(\d+)\s+products/i
          );
          return Boolean(match && `${match[1]}-${match[2]}` !== previousRange);
        },
        { previousRange }
      );
    }

    const products = pages.flatMap((entry) =>
      entry.products.map((product, index) => ({
        ordinal: entry.start + index,
        page: entry.page,
        name: product.name,
        href: product.href
          ? new URL(product.href, entry.url).href
          : null
      }))
    );

    if (expectedTotal === null || products.length !== expectedTotal) {
      throw new Error(
        `VisitOSLO enumeration incomplete: expected ${String(expectedTotal)}, captured ${products.length}`
      );
    }

    const snapshot = {
      version: 1,
      source: sourceUrl,
      capturedAt: new Date().toISOString(),
      total: expectedTotal,
      pageCount: pages.length,
      products,
      pages
    };

    await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
    console.log(`Captured ${products.length}/${expectedTotal} VisitOSLO products across ${pages.length} pages.`);
  } finally {
    await context.close();
  }
} finally {
  await browser.close();
}
