import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "chrome", headless: true, chromiumSandbox: true });
try {
  const context = await browser.newContext({ serviceWorkers: "block" });
  try {
    const page = await context.newPage();
    await page.setContent("<!doctype html><html><body><main id='smoke'>browser-ok</main></body></html>");
    const value = await page.locator("#smoke").textContent();
    if (value !== "browser-ok") throw new Error(`Unexpected browser smoke value: ${String(value)}`);
    console.log(JSON.stringify({ browser: "chrome", rendered: value }));
  } finally {
    await context.close();
  }
} finally {
  await browser.close();
}
