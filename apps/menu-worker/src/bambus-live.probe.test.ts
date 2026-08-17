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

describe("Bambus Lambertseter live source probe v4", () => {
  it(
    "proves live menu price semantics and reconstructed dish-name quality",
    async () => {
      const client = new HttpMenuClient({ timeoutMs: 15_000, minHostDelayMs: 0 });
      const response = await client.fetchSource(source(menuUrl), { maxResponseBytes: 8 * 1024 * 1024 });
      if (response.kind !== "content") throw new Error("Bambus menu unexpectedly returned 304");
      const menu = await extractPdfMenu(response.bodyBytes);
      const byName = new Map(menu.items.map((item) => [item.normalizedName, item]));

      const diagnostic = {
        itemCount: menu.items.length,
        bambusSignatur: byName.get(normalizeDishName("Bambus Signatur")) ?? null,
        kaengPhetGai: byName.get(normalizeDishName("Kaeng Phet Gai")) ?? null,
        compositeNames: {
          spicyTempuraScampi: byName.has(normalizeDishName("Spicy Tempura Scampi")),
          vegetarVarruller: byName.has(normalizeDishName("Vegetar Vårruller 4 stk.")),
        },
        forbiddenFragments: {
          spicy: byName.has("spicy"),
          vegetar: byName.has("vegetar"),
        },
        suspiciousOneWordNames: menu.items
          .filter((item) => item.normalizedName.split(" ").length === 1)
          .map((item) => item.name),
      };
      console.log("BAMBUS_MENU_PROBE", JSON.stringify(diagnostic));

      expect(menu.items.length).toBeGreaterThanOrEqual(30);
      expect(diagnostic.bambusSignatur).toMatchObject({
        priceMinor: 28500,
        priceKind: "multiple",
        priceMaxMinor: 30900,
      });
      expect(diagnostic.kaengPhetGai).toMatchObject({
        priceMinor: 19500,
        priceKind: "multiple",
        priceMaxMinor: 22900,
      });
      expect(diagnostic.forbiddenFragments.spicy).toBe(false);
      expect(diagnostic.forbiddenFragments.vegetar).toBe(false);
      expect(diagnostic.compositeNames.spicyTempuraScampi).toBe(true);
      expect(diagnostic.compositeNames.vegetarVarruller).toBe(true);
    },
    30_000,
  );

  it(
    "proves seven opening intervals and reachable first-party-linked takeaway",
    async () => {
      const client = new HttpMenuClient({ timeoutMs: 15_000, minHostDelayMs: 0 });
      const restaurantResponse = await client.fetchSource(source(restaurantUrl));
      if (restaurantResponse.kind !== "content") throw new Error("Bambus restaurant page unexpectedly returned 304");
      const hours = extractKitchenOpeningHours(restaurantResponse.body, [
        restaurantUrl,
        "bambus-lambertseter-oslo",
        "Bambus Lambertseter",
      ]);

      const orderResponse = await client.fetchSource(source(orderUrl));
      if (orderResponse.kind !== "content") throw new Error("Bambus order page unexpectedly returned 304");

      console.log(
        "BAMBUS_METADATA_PROBE",
        JSON.stringify({ hours: hours.intervals, orderStatus: orderResponse.status }),
      );
      expect(hours.intervals).toHaveLength(7);
      expect(orderResponse.status).toBeGreaterThanOrEqual(200);
      expect(orderResponse.status).toBeLessThan(400);
    },
    30_000,
  );
});
