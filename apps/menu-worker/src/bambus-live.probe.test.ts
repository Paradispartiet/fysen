import { describe, expect, it } from "vitest";
import { normalizeDishName } from "@fysen/menu-core";
import { HttpMenuClient } from "./http-client.js";
import { extractKitchenOpeningHours } from "./opening-hours-extractor.js";
import { extractPdfMenu } from "./pdf-extractor.js";

const userAgent = "FysenMenuBot/0.1";
const menuUrl = "https://www.bambussushi.no/media/fdihneyo/meny-2.pdf";
const restaurantUrl = "https://www.bambussushi.no/restauranter/lambertseter-senter/";
const orderUrl = "https://bambussushi.munu.shop/articles/r200006483-lambertseter-senter--o200007464-take-away";

function source(url: string) {
  return { url, userAgent, etag: null, lastModified: null };
}

describe("Bambus Lambertseter live source probe", () => {
  it(
    "proves menu price semantics, name quality, hours and order reachability",
    async () => {
      const client = new HttpMenuClient({ timeoutMs: 15_000, minHostDelayMs: 0 });

      const menuResponse = await client.fetchSource(source(menuUrl), { maxResponseBytes: 8 * 1024 * 1024 });
      if (menuResponse.kind !== "content") throw new Error("Bambus menu unexpectedly returned 304");
      const menu = await extractPdfMenu(menuResponse.bodyBytes);
      const byName = new Map(menu.items.map((item) => [item.normalizedName, item]));

      expect(menu.items.length).toBeGreaterThanOrEqual(30);
      expect(byName.get(normalizeDishName("Bambus Signatur"))).toMatchObject({
        priceMinor: 28500,
        priceKind: "multiple",
        priceMaxMinor: 30900,
      });
      expect(byName.get(normalizeDishName("Kaeng Phet Gai"))).toMatchObject({
        priceMinor: 19500,
        priceKind: "multiple",
        priceMaxMinor: 22900,
      });

      expect(byName.has("spicy")).toBe(false);
      expect(byName.has("vegetar")).toBe(false);
      expect(byName.has(normalizeDishName("Spicy Tempura Scampi"))).toBe(true);
      expect(byName.has(normalizeDishName("Vegetar Vårruller 4 stk."))).toBe(true);

      const restaurantResponse = await client.fetchSource(source(restaurantUrl));
      if (restaurantResponse.kind !== "content") throw new Error("Bambus restaurant page unexpectedly returned 304");
      const hours = extractKitchenOpeningHours(restaurantResponse.body, [
        restaurantUrl,
        "bambus-lambertseter-oslo",
        "Bambus Lambertseter",
      ]);
      expect(hours.intervals).toHaveLength(7);

      const orderResponse = await client.fetchSource(source(orderUrl));
      if (orderResponse.kind !== "content") throw new Error("Bambus order page unexpectedly returned 304");
      expect(orderResponse.status).toBeGreaterThanOrEqual(200);
      expect(orderResponse.status).toBeLessThan(400);

      console.log(
        "BAMBUS_LIVE_PROBE",
        JSON.stringify({
          itemCount: menu.items.length,
          bambusSignatur: byName.get(normalizeDishName("Bambus Signatur")),
          kaengPhetGai: byName.get(normalizeDishName("Kaeng Phet Gai")),
          compositeNames: {
            spicyTempuraScampi: byName.has(normalizeDishName("Spicy Tempura Scampi")),
            vegetarVarruller: byName.has(normalizeDishName("Vegetar Vårruller 4 stk.")),
          },
          suspiciousNames: menu.items
            .filter((item) => item.normalizedName.split(" ").length === 1)
            .map((item) => item.name),
          hours: hours.intervals,
          orderStatus: orderResponse.status,
        }),
      );
    },
    30_000,
  );
});
