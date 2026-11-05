import { describe, expect, it } from "vitest";
import { recoverFestningenBilingualDinner } from "./html-festningen-bilingual-dinner.js";

const card = (english: string, norwegian: string, price: string) =>
  "<p>" + english + "</p><p>" + norwegian + "</p><p>beskrivelse (melk, egg)</p>" +
  "<p>" + english + "</p><p>description (milk, eggs)</p><p>" + price + "</p>";

const source = "<html><body><h1>FESTNINGEN RESTAURANT</h1>" +
  "<h2>MIDDAG // DINNER</h2><h3>CHEF’S MENU</h3><p>3 course menu kr 895,-</p>" +
  "<h3>SNACKS</h3><p>Kr 150,-</p><p>SPEKEMAT</p><p>CURED MEAT</p><p>Kr 150,-</p>" +
  card("ANNA DUTCH CAVIAR", "ANNA DUTCH KAVIAR", "30g/kr 750,-") +
  "<h3>FORRETTER // STARTERS</h3>" +
  card("DILL CURED TROUT", "DILLGRAVET ØRRET", "kr 275,-") +
  card("BEEF TARTARE", "BIFF TARTAR", "Kr 275,-") +
  card("RISOTTO", "RISOTTO", "Kr 295,-") +
  "<h3>HOVEDRETTER // MAINS</h3>" +
  card("GRILLED VENISON", "GRILLET HJORT", "Kr 445,-") +
  card("COD", "TORSK FRA VESTLANDET", "Kr 455,-") +
  card("GRILLED REINDEER", "GRILLET REINSDYR", "Kr 465,-") +
  card("GRILLED MONKFISH", "GRILLET BREIFLABB", "Kr 435,-") +
  "<h3>DESSERT OG OST // DESSERT & CHEESE</h3>" +
  card("MOCHA CREAM", "MOKKAKREM", "Kr 185,-") +
  card("CHEESECAKE", "OSTEKAKE", "Kr 185,-") +
  card("BROWNED BUTTER ICE CREAM AND JERUSALEM ARTICHOKE ICE CREAM AND CAVIAR",
    "JORDKOKK IS OG KAVIAR", "butterscotch sauce and lemon thyme (milk, egg, fish)+Kr 195,-") +
  "<p>PETITS FOURS</p><p>85,-</p>" +
  card("SELECTION OF CHEESE", "UTVALG AV OSTER", "Kr 245,-") +
  "<p>GAVEKORT</p></body></html>";

describe("first-party bilingual Festningen dinner source", () => {
  it("recovers real menu titles and prices without promoting surrounding text", () => {
    const items = recoverFestningenBilingualDinner(source);
    expect(items).not.toBeNull();
    const indexed = new Map(items!.map((row) => [row.name, row.priceMinor]));
    const assertions = [
      ["SPEKEMAT", 15000], ["ANNA DUTCH CAVIAR", 75000],
      ["BEEF TARTARE", 27500], ["RISOTTO", 29500],
      ["GRILLED VENISON", 44500], ["COD", 45500],
      ["GRILLED REINDEER", 46500], ["GRILLED MONKFISH", 43500],
      ["MOCHA CREAM", 18500], ["CHEESECAKE", 18500],
      ["BROWNED BUTTER ICE CREAM AND JERUSALEM ARTICHOKE ICE CREAM AND CAVIAR", 19500],
      ["PETITS FOURS", 8500], ["SELECTION OF CHEESE", 24500],
    ] as const;
    for (const [title, price] of assertions) expect(indexed.get(title)).toBe(price);
    expect(items?.every((row) => row.currency === "NOK" && row.priceMinor !== null)).toBe(true);
    expect(items?.some((row) => /30g\/kr|butterscotch sauce|chef.s menu|DAGENS RETT/iu.test(row.name))).toBe(false);
  });

  it("never activates for unrelated sources or incomplete changed layouts", () => {
    expect(recoverFestningenBilingualDinner(source.replace("FESTNINGEN RESTAURANT", "OTHER RESTAURANT"))).toBeNull();
    expect(recoverFestningenBilingualDinner(source.replace("MIDDAG // DINNER", "LUNSJMENY"))).toBeNull();
    expect(recoverFestningenBilingualDinner("<p>SPEKEMAT 150 kr</p>")).toBeNull();
    expect(recoverFestningenBilingualDinner(source.replace(/Kr 185,-/g, "Pris ved forespørsel")
      .replace("kr 275,-", "pris mangler").replace("Kr 275,-", "pris mangler")
      .replace("Kr 295,-", "pris mangler").replace("Kr 445,-", "pris mangler"))).toBeNull();
  });

  it("does not invent a price for an unpriced dish or collapse multiple-size offers", () => {
    const extended = source.replace("<p>GAVEKORT</p>",
      "<p>FINE DE CLAIRE OYSTERS</p><p>FINE DE CLAIRE ØSTERS</p>" +
      "<p>FINE DE CLAIRE OYSTERS</p><p>kr 195,- / kr 375,-</p>" +
      "<p>UNPRICED SEASONAL DISH</p><p>GAVEKORT</p>");
    const items = recoverFestningenBilingualDinner(extended)!;
    expect(items.some((row) => row.name === "FINE DE CLAIRE OYSTERS")).toBe(false);
    expect(items.some((row) => row.name === "UNPRICED SEASONAL DISH")).toBe(false);
  });
});
