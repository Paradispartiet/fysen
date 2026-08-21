import { describe, expect, it } from "vitest";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";
import { filterPlainTextBeverageSectionItems } from "./html-text-section-scope.js";
import { extractMenuSource } from "./menu-source-runtime.js";

function item(name: string, priceMinor: number): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor,
    currency: "NOK",
    position: 0,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt: name,
  };
}

function fetchedHtml(body: string) {
  return {
    kind: "content" as const,
    fetchedAt: "2026-08-21T00:00:00.000Z",
    status: 200,
    contentType: "text/html",
    body,
    bodyBytes: new TextEncoder().encode(body),
    rawSha256: "a".repeat(64),
    etag: null,
    lastModified: null,
    durationMs: 1,
    robotsAllowed: true as const,
  };
}

describe("Batch 02 structural output cleanup", () => {
  it("prefers a repeated direct dish heading immediately before price over section and brand lines", () => {
    const html = `
      <html><body>
        <p>Restaurant Brand</p>
        <h2>TANDOORI</h2>
        <div><h3>CHICKEN PERI PERI TIKKA</h3><p>299.0</p></div>
        <div><h3>MIX GRILL</h3><p>305.0</p></div>
        <h2>TASTING MENU</h2>
        <div><h3>LEN DEG TILBAKE OG LA OSS SETTE SAMMEN ET MÅLTID FOR DEG!</h3><p>595.0</p></div>
        <p>Restaurant Brand</p>
        <h2>SWEET DISHES</h2>
        <div><h3>MALAI AAM</h3><p>119,-</p></div>
        <div><h3>GULAB JAMUN</h3><p>129,-</p></div>
      </body></html>
    `;

    expect(extractScopedHtmlMenu(html).items.map((entry) => entry.name)).toEqual([
      "CHICKEN PERI PERI TIKKA",
      "MIX GRILL",
      "LEN DEG TILBAKE OG LA OSS SETTE SAMMEN ET MÅLTID FOR DEG!",
      "MALAI AAM",
      "GULAB JAMUN",
    ]);
  });

  it("prefers an uppercase dish-like line immediately before price over an earlier section or brand line", () => {
    const html = `
      <html><body>
        <h2>TANDOORI</h2>
        <p>CHICKEN PERI PERI TIKKA (M, N, G)</p>
        <p>299.0</p>
        <p>Restaurant Brand</p>
        <p>SWEET DISHES</p>
        <p>MALAI AAM</p>
        <p>119,-</p>
      </body></html>
    `;

    expect(extractScopedHtmlMenu(html).items.map((entry) => entry.name)).toEqual([
      "CHICKEN PERI PERI TIKKA",
      "MALAI AAM",
    ]);
  });

  it("matches beverage evidence after trailing allergen codes are removed from the item name", () => {
    const items = [item("Kulfi", 12900), item("CUPPUCINO", 5500)];
    const visibleText = `
      DESSERT
      KULFI (M, N)
      129
      KAFFE / COFFEE
      CUPPUCINO (M)
      55
    `;
    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map((entry) => entry.name),
    ).toEqual(["Kulfi"]);
  });

  it("uses full-page beverage evidence after full-HTML recoveries add drink cards", async () => {
    const html = `
      <html><body>
        <h2>DESSERTS</h2>
        <div><h3>BROWNIE</h3><p>169</p></div>
        <div><h3>CHEESECAKE</h3><p>169</p></div>
        <div><h3>AFFOGATO</h3><p>89</p></div>
        <h2>SOFT DRINKS</h2>
        <div><h5>Thomas Henry Ginger Ale</h5><p>49</p></div>
        <div><h5>Fresh ginger beer from Example Press</h5><p>79</p></div>
        <div><h5>Apple puree from Example Press</h5><p>79</p></div>
      </body></html>
    `;

    const extracted = await extractMenuSource("html", fetchedHtml(html));
    expect(extracted.items.map((entry) => entry.name)).toEqual([
      "BROWNIE",
      "CHEESECAKE",
      "AFFOGATO",
    ]);
  });
});
