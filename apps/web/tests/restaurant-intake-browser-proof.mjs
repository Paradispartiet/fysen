import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import console from "node:console";
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath, URL } from "node:url";
import { chromium } from "playwright-core";

const require = createRequire(import.meta.url);
const webRoot = fileURLToPath(new URL("..", import.meta.url));
const origin = "http://127.0.0.1:4317";
const output =
  process.env.FYSEN_INTAKE_PROOF_OUTPUT_DIRECTORY ?? "/tmp/fysen-intake-proof";
const { fetch } = globalThis;
const server = spawn(
  process.execPath,
  [
    require.resolve("next/dist/bin/next"),
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "4317",
  ],
  {
    cwd: webRoot,
    env: {
      ...process.env,
      FYSEN_RESTAURANT_INTAKE_OPERATOR_TOKEN: "",
      FYSEN_RESTAURANT_INTAKE_GITHUB_TOKEN: "",
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
let serverLog = "";
server.stdout.on("data", (data) => {
  serverLog += data;
});
server.stderr.on("data", (data) => {
  serverLog += data;
});
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      ready = (await fetch(`${origin}/admin/restaurants/new`)).ok;
    } catch {
      /* Server is still starting. */
    }
    if (ready) break;
    await delay(200);
  }
  assert.ok(ready, `Local production server did not start: ${serverLog}`);
  browser = await chromium.launch({
    ...(process.env.FYSEN_BROWSER_EXECUTABLE_PATH
      ? { executablePath: process.env.FYSEN_BROWSER_EXECUTABLE_PATH }
      : {}),
    args: [
      "--no-sandbox",
      "--no-zygote",
      "--single-process",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-software-rasterizer",
      "--use-gl=disabled",
    ],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`${origin}/admin/restaurants/new`);
  await page
    .getByRole("heading", { name: "Registrer en restaurant" })
    .waitFor();
  const colors = await page.locator(".claimCard").evaluate((element) => {
    const styles = globalThis.getComputedStyle(element);
    return { foreground: styles.color, background: styles.backgroundColor };
  });
  function luminance(rgb) {
    const channels = rgb
      .match(/\d+/gu)
      .slice(0, 3)
      .map((part) => Number(part) / 255)
      .map((part) =>
        part <= 0.04045 ? part / 12.92 : ((part + 0.055) / 1.055) ** 2.4,
      );
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  }
  const light = luminance(colors.foreground);
  const dark = luminance(colors.background);
  assert.ok(
    (Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05) >= 4.5,
    "Registration text contrast",
  );
  await mkdir(output, { recursive: true });
  for (const [label, width, height] of [
    ["mobile", 390, 844],
    ["ipad", 820, 1180],
  ]) {
    await page.setViewportSize({ width, height });
    assert.equal(
      await page.evaluate(
        () =>
          globalThis.document.documentElement.scrollWidth >
          globalThis.innerWidth,
      ),
      false,
      `${label} horizontal overflow`,
    );
    await page.screenshot({
      path: join(output, `${label}.png`),
      fullPage: true,
    });
  }
  const disabled = await page.request.post(
    `${origin}/api/admin/restaurant-intake`,
    { data: {} },
  );
  assert.equal(disabled.status(), 503);
  let captured;
  await page.route("**/api/admin/restaurant-intake", async (route) => {
    captured = route.request().postDataJSON();
    await route.fulfill({
      status: 202,
      json: {
        status: "pending_validation",
        pullRequestUrl: "https://github.com/Paradispartiet/fysen/pull/123",
        seedPath: "apps/menu-worker/research/operator-proof.seed.json",
      },
    });
  });
  async function fill() {
    await page
      .getByLabel("Restaurantnavn", { exact: true })
      .fill("Prøvekjøkken");
    await page
      .getByLabel("Adresse i Oslo", { exact: true })
      .fill("Testgata 1, 0123 Oslo");
    await page
      .getByLabel("Meny-URL", { exact: true })
      .fill("https://restaurant.example/meny");
    await page
      .getByLabel("Hva tilfører stedet?", { exact: true })
      .fill("Gir regional rettdekning i et område med få alternativer.");
    await page
      .getByLabel("Operatørnøkkel", { exact: true })
      .fill("test-only-operator-key-with-at-least-32-characters");
  }
  await fill();
  await page
    .getByRole("button", { name: "Send til kontroll", exact: true })
    .click();
  await page
    .getByText("Restauranten er sendt til kontroll.", { exact: true })
    .waitFor();
  assert.equal(
    await page
      .getByRole("link", { name: "Følg registreringen" })
      .getAttribute("href"),
    "https://github.com/Paradispartiet/fysen/pull/123",
  );
  assert.equal(captured.name, "Prøvekjøkken");
  assert.equal(captured.sourceType, "html");
  assert.equal(captured.fetchMode, "http");
  assert.equal(Object.hasOwn(captured, "operatorToken"), false);
  await page
    .getByRole("button", { name: "Registrer en til", exact: true })
    .click();
  await page.unroute("**/api/admin/restaurant-intake");
  await page.route("**/api/admin/restaurant-intake", async (route) => {
    await route.fulfill({
      status: 502,
      json: {
        status: "needs_review",
        branchUrl:
          "https://github.com/Paradispartiet/fysen/tree/restaurant-intake/proof",
        seedPath: "apps/menu-worker/research/operator-proof.seed.json",
      },
    });
  });
  await fill();
  await page
    .getByRole("button", { name: "Send til kontroll", exact: true })
    .click();
  await page.locator(".claimError[role=alert]").waitFor();
  assert.match(
    await page.locator(".claimError[role=alert]").innerText(),
    /Kontroller registreringen/u,
  );
  assert.equal(
    await page.getByLabel("Operatørnøkkel", { exact: true }).inputValue(),
    "",
  );
  assert.ok(
    await page
      .getByRole("link", { name: "Kontroller registreringen" })
      .isVisible(),
  );
  await page.goto(origin);
  assert.ok((await page.locator("body").innerText()).length > 0);
  assert.deepEqual(errors, []);
  console.log(
    JSON.stringify({
      mobile: "passed",
      ipad: "passed",
      submission: "mocked PR receipt passed",
      partialFailure: "passed",
      disabledEndpoint: "503",
      home: "passed",
      pageErrors: errors,
      screenshots: output,
    }),
  );
} finally {
  if (browser) await browser.close();
  server.kill("SIGTERM");
}
