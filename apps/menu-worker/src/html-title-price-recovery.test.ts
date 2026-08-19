import { describe, expect, it } from "vitest";
import {
  HTML_TITLE_PRICE_RECOVERY_VERSION,
  recoverTitlePriceHtmlItems,
} from "./html-title-price-recovery.js";

describe("HTML title-price card recovery", () => {
  it("recovers title-price-description cards", () => {
    const visibleText = [
      "Forretter",
      "1.",
      "Dagens Suppe",
      "199,-",
      "Spør din servitør om dagens suppe",
      "2.",
      "Friterte Calamares",
      "129,-",
      "Serveres med aioli og sitron",
      "3.",
      "Spansk Gambas",
      "159,-",
      "Scampi med hvitløk og chili",
    ].join("\n");

    const items = recoverTitlePriceHtmlItems(visibleText);

    expect(HTML_TITLE_PRICE_RECOVERY_VERSION).toBe("title-price-v1");
    expect(items.map((item) => item.name)).toEqual([
      "Dagens Suppe",
      "Friterte Calamares",
      "Spansk Gambas",
    ]);
    expect(items.map((item) => item.priceMinor)).toEqual([19900, 12900, 15900]);
    expect(items[1]?.description).toContain("aioli");
  });

  it("stops a description before the next title-price card", () => {
    const visibleText = [
      "Tagliere Italiano",
      "245,-",
      "Italienske spekemat og oster",
      "Insalata Nicoise",
      "215,-",
      "Tunfisk, egg og grønnsaker",
      "Pizza Rucola",
      "245,-",
      "Ruccola og parmesan",
    ].join("\n");

    const items = recoverTitlePriceHtmlItems(visibleText);

    expect(items).toHaveLength(3);
    expect(items[0]?.description).toBe("Italienske spekemat og oster");
    expect(items[1]?.name).toBe("Insalata Nicoise");
  });

  it("does not activate on sparse incidental price matches", () => {
    const visibleText = [
      "Åpningstider",
      "Kontakt",
      "Dagens Suppe",
      "199,-",
      "Beskrivelse",
      "Telefon",
      "Parkering",
      "500,-",
      "Adresse",
      "Gavekort",
      "1000,-",
      "Kontakt oss",
      "Historie",
      "2026",
    ].join("\n");

    expect(recoverTitlePriceHtmlItems(visibleText)).toEqual([]);
  });
});
