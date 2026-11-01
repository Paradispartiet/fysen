import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HTML_PARAGRAPH_TITLE_PRICE_RECOVERY_VERSION, recoverParagraphTitlePriceHtmlCards, hasPricesOutsideParagraphTitleCards } from "./html-paragraph-title-price-recovery.js";
import { extractMenuSource } from "./menu-source-runtime.js";

const currentMenu = readFileSync(new URL("./fixtures/gamle-raadhus-kveldsmeny-20261031.html", import.meta.url), "utf8");
const card = (name: string, price = "kr 390", extra = "") => `<p><strong>${name}<br>Poteter og urter</strong> (M)<br>English translation<br>${extra}<strong>${price}</strong></p>`;

describe("paragraph title-price recovery", () => {
  it("recovers every current source title, price and source section instead of translations or ingredients", () => {
    const items = recoverParagraphTitlePriceHtmlCards(currentMenu);
    expect(HTML_PARAGRAPH_TITLE_PRICE_RECOVERY_VERSION).toBe("paragraph-title-price-card-v1");
    expect(items.map(({ name, priceMinor, sectionName }) => [name, priceMinor, sectionName])).toEqual([
      ["Rakfisk fra Hande i Valdres", 39500, "Forretter - Starters"],
      ["Tynne skiver av røkelaks fra Bergen", 39000, "Forretter - Starters"],
      ["Saltbakte beter fra Hasle gård på Rygge, laget som en tartar", 37500, "Forretter - Starters"],
      ["Vår lutefisk (WP3) - servert 2 ganger", 87500, "Hovedretter - Main courses"],
      ["Rakfisk fra Hande i Valdres - servert 2 ganger", 79500, "Hovedretter - Main courses"],
      ["Ovnsbakt villkveite fra norskekysten", 59000, "Hovedretter - Main courses"],
      ["Pinnekjøtt av lam fra Tynset - servert 2 ganger", 87500, "Hovedretter - Main courses"],
      ["Langtidsbakt kalvenakke fra Hallingdal", 58500, "Hovedretter - Main courses"],
      ["Byggotto på byggryn fra Sjåk med norsk hardost", 48500, "Hovedretter - Main courses"],
      ["Gamle Raadhus sin klassiske Crème Brûlée", 29500, "Dessert - Desserts"],
      ["Vår egen «sjokoladefløterand» laget på melkesjokolade", 29500, "Dessert - Desserts"],
      ["En smak av husets egen is og sorbet", 27500, "Dessert - Desserts"],
      ["Norske oster", 32000, "Dessert - Desserts"],
      ["Små søtsaker fra vårt dessertkjøkken", 23000, "Dessert - Desserts"],
    ]);
    expect(items[0]?.description).toContain("Hjemmesyltede rødbeter");
    expect(items[0]?.description).toContain("Fermented trout from Valdres");
    expect(items[3]?.priceKind).toBe("exact");
    expect(items[3]?.description).toContain("served twice");
    expect(items.every((item) => item.sourceExcerpt?.includes(item.name))).toBe(true);
  });

  it("binds only local first emphasized titles and never borrows a following paragraph's price", () => {
    const html = `<h2>Mains</h2><p><strong>Unpriced fish<br>Herbs</strong></p><p><strong>kr 300</strong></p>${card("Roast beetroot")}`;
    expect(recoverParagraphTitlePriceHtmlCards(html).map((item) => item.name)).toEqual(["Roast beetroot"]);
  });

  it.each(["kr 390 / 490", "fra kr 390", "kr 390 per kg", "kr 390–490", "390", "kr 390 kr 490"])("rejects ambiguous or unsupported price %s", (price) => {
    expect(recoverParagraphTitlePriceHtmlCards(`<h2>Mains</h2>${card("Fish", price)}`)).toEqual([]);
  });

  it("rejects additional prices, two dish titles and trailing content in one card", () => {
    for (const html of [card("Fish", "kr 390", "Extra sauce kr 40<br>"), card("Fish", "kr 390", "Grilled salmon 590<br>"), card("Fish", "kr 390", "Extra sauce EUR 20<br>"), card("Fish", "kr 390", "<strong>Meat</strong><br>"), `${card("Fish").slice(0, -4)}<br>Another item</p>`]) {
      expect(recoverParagraphTitlePriceHtmlCards(`<h2>Mains</h2>${html}`)).toEqual([]);
    }
  });

  it("requires a nearby food heading, stops at unrelated headings, and excludes hidden and navigation content", () => {
    const html = `${card("No heading")}<h2>Mains</h2><nav>${card("Navigation")}</nav><div hidden>${card("Hidden")}</div><div style="display: none">${card("Hidden style")}</div>${card("Visible fish")}<h2>Contact</h2>${card("Contact card")}`;
    expect(recoverParagraphTitlePriceHtmlCards(html).map((item) => item.name)).toEqual(["Visible fish"]);
  });

  it("supports inline title markup and equivalent article cards without duplicating nested paragraphs", () => {
    const html = `<h3>Forretter / Starters</h3><article>${card("<span>Smoked</span> trout")}</article><article><b>Grilled <em>leek</em><br>Herbs</b><br><b>NOK 180</b></article>`;
    expect(recoverParagraphTitlePriceHtmlCards(html).map((item) => [item.name, item.priceMinor])).toEqual([["Smoked trout", 39000], ["Grilled leek", 18000]]);
  });

  it("preserves separate section identities and rejects conflicting same-section duplicates", () => {
    const html = `<h2>Starters</h2>${card("Fish")}<h2>Mains</h2>${card("Fish", "kr 590")}`;
    const items = recoverParagraphTitlePriceHtmlCards(html);
    expect(items).toHaveLength(2);
    expect(items[0]?.sourceKey).not.toBe(items[1]?.sourceKey);
    expect(recoverParagraphTitlePriceHtmlCards(`<h2>Mains</h2>${card("Fish")}${card("Fish", "kr 590")}`)).toEqual([]);
  });

  it("authorizes a structural replacement only when every visible currency price is bound", () => {
    expect(hasPricesOutsideParagraphTitleCards(currentMenu)).toBe(false);
    expect(hasPricesOutsideParagraphTitleCards(`<h2>Mains</h2>${card("Fish")}<p>Other dish kr 590</p>`)).toBe(true);
    expect(hasPricesOutsideParagraphTitleCards(`<h2>Mains</h2>${card("Fish", "kr 390 / 590")}`)).toBe(true);
    expect(hasPricesOutsideParagraphTitleCards(`<h2>Mains</h2>${card("Fish")}${card("Fish", "kr 590")}`)).toBe(true);
    expect(hasPricesOutsideParagraphTitleCards(`<script>"kr 590"</script><nav>kr 590</nav><h2>Mains</h2>${card("Fish")}<p>Gjelder fra 29. oktober 2026</p><footer>Tel 12345678</footer>`)).toBe(false);
  });

  it("rejects a second unmarked standalone price inside the card", () => {
    expect(recoverParagraphTitlePriceHtmlCards(`<h2>Mains</h2>${card("Fish", "kr 390", "490<br>")}`)).toEqual([]);
  });

  it("blocks replacement when another visible card has an unmarked or foreign price", () => {
    for (const amount of ["590", "EUR 590", "590 €", "Grilled salmon 590", "Grilled salmon 590 (F)"]) {
      expect(hasPricesOutsideParagraphTitleCards(`<h2>Mains</h2>${card("Fish")}<p>Another meal<br>${amount}</p>`)).toBe(true);
    }
  });

  it("preserves all source titles and sections through production extraction", async () => {
    const result = await extractMenuSource("html", { body: currentMenu } as never);
    expect(result.items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Rakfisk fra Hande i Valdres", 39500],
      ["Tynne skiver av røkelaks fra Bergen", 39000],
      ["Saltbakte beter fra Hasle gård på Rygge, laget som en tartar", 37500],
      ["Vår lutefisk (WP3) - servert 2 ganger", 87500],
      ["Rakfisk fra Hande i Valdres - servert 2 ganger", 79500],
      ["Ovnsbakt villkveite fra norskekysten", 59000],
      ["Pinnekjøtt av lam fra Tynset - servert 2 ganger", 87500],
      ["Langtidsbakt kalvenakke fra Hallingdal", 58500],
      ["Byggotto på byggryn fra Sjåk med norsk hardost", 48500],
      ["Gamle Raadhus sin klassiske Crème Brûlée", 29500],
      ["Vår egen «sjokoladefløterand» laget på melkesjokolade", 29500],
      ["En smak av husets egen is og sorbet", 27500],
      ["Norske oster", 32000],
      ["Små søtsaker fra vårt dessertkjøkken", 23000],
    ]);
    expect(result.items.filter((item) => item.sectionName === "Hovedretter - Main courses")).toHaveLength(6);
  });
});
