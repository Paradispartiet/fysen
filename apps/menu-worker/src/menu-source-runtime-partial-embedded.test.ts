import { describe, expect, it } from "vitest";
import { extractMenuSource } from "./menu-source-runtime.js";

const embedded = {
  menu: {
    categories: [{ name: "Sushi", item_ids: ["a", "b", "c", "d"] }],
    items: [
      { id: "a", name: "Hydrated Bento A", price: 19900 },
      { id: "b", name: "Hydrated Bento B", price: 20900 },
      { id: "c", name: "Hydrated Bento C", price: 21900 },
      { id: "d", name: "Hydrated Bento D", price: 22900 },
    ],
  },
};

const embeddedScript = `<script type="application/json">${JSON.stringify(embedded)}</script>`;

async function extract(html: string) {
  return extractMenuSource("html", {
    kind: "content",
    fetchedAt: "2026-10-19T00:00:00.000Z",
    status: 200,
    contentType: "text/html; charset=utf-8",
    body: html,
    bodyBytes: new TextEncoder().encode(html),
    rawSha256: "fixture",
    etag: null,
    lastModified: null,
    durationMs: 1,
    robotsAllowed: true,
  });
}

describe("partial embedded menu fallback", () => {
  it("preserves structured category-bound items when no visible priced menu exists", async () => {
    const result = await extract(`<html><body>${embeddedScript}</body></html>`);
    expect(result.items.map((item) => item.name)).toEqual([
      "Hydrated Bento A",
      "Hydrated Bento B",
      "Hydrated Bento C",
      "Hydrated Bento D",
    ]);
  });

  it("prefers a substantially larger independently priced visible sushi menu over a four-item embedded fragment", async () => {
    const titles = [
      ["4A Laks Maki - 8 Biter", 109],
      ["4B Spicy Laks Maki - 8 biter", 109],
      ["4C Spicy Tuna Maki - 8 Biter", 109],
      ["4D Tempura Scampi Maki - 8 Biter", 109],
      ["4E Flambert Maki - 8 biter", 139],
      ["4F Kamshell Maki - 8 biter", 119],
      ["4G Uramaki Dragon - 8 biter", 139],
      ["4H California maki - 8 biter", 119],
      ["4I Rainbow Maki - 8 biter", 129],
      ["4K Kylling Maki - 8 biter", 119],
    ] as const;
    const html = `<html><body>
      ${embeddedScript}
      <main><h2>Uramaki 8 Biter</h2>
        ${titles.map(([name, price]) => `<article><h3>${name}</h3><p>NOK ${price}.00</p></article>`).join("")}
      </main>
    </body></html>`;

    const result = await extract(html);
    expect(result.items.length).toBeGreaterThanOrEqual(8);
    expect(result.items.map((item) => [item.name, item.priceMinor])).toContainEqual([
      "4H California maki - 8 biter",
      11900,
    ]);
    expect(result.items.some((item) => item.name === "Hydrated Bento A")).toBe(false);
  });
});
