import { describe, expect, it } from "vitest";
import { extractMenuItemsFromPdfLines } from "./pdf-extractor.js";
import {
  PDF_SOURCE_EXTRACTOR_VERSION,
  disambiguateConflictingPdfSourceKeys,
  filterPdfConflictMetadataItems,
  recoverExplicitLowPerItemPdfRows,
  scopePdfMenuItems,
} from "./pdf-source-extractor.js";

describe("PDF source scope", () => {
  it("excludes generic beverage sections and resumes at a later dessert section", () => {
    const lines = [
      "MÓN NƯỚC / NOODLE SOUPS",
      "Phở bò tái / Pho beef noodle soup 229",
      "BIA VÀ RƯỢU / BEER & SPIRITS",
      "Saigon bottle 0,33L *Hvetemel, sulfit 119",
      "GIẢI KHÁT / NON-ALCOHOL",
      "Cà Phê Sữa Đá / Iced coffee 75",
      "RƯỢU PHA / COCKTAILS",
      "Rosegarden 155",
      "Yuzu Sake Sour 165",
      "KHÔNG CỒN / MOCKTAILS",
      "Mango daquiri 105",
      "ĐỒ NGỌT / DESSERT",
      "Kem yuzu / Yuzu ice cream 69",
    ];
    const visibleText = lines.join("\n");
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(visibleText, parsed);

    expect(PDF_SOURCE_EXTRACTOR_VERSION).toBe("pdf-text-v33");
    expect(scoped.map((item) => item.name)).toEqual([
      "Phở bò tái / Pho beef noodle soup",
      "Kem yuzu / Yuzu ice cream",
    ]);
    expect(scoped.map((item) => item.position)).toEqual([0, 1]);
  });

  it("drops bottle and vintage-price labels that are not dish names", () => {
    const lines = [
      "SPECIALS",
      "fl 1065,-",
      "1997 fl 5690,-",
      "fl 835,-/gl 185,-",
      "Roasted lamb 495,-",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => item.name)).toEqual(["Roasted lamb"]);
  });

  it("drops bilingual food section headings that the low-level PDF parser can price-bind", () => {
    const lines = [
      "HOVEDRETTER / MAIN COURSES",
      "495,-",
      "Roasted lamb 495,-",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    expect(parsed.map((item) => item.name)).toContain(
      "HOVEDRETTER / MAIN COURSES",
    );

    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);
    expect(scoped.map((item) => item.name)).toEqual(["Roasted lamb"]);
  });

  it("disambiguates a same-name PDF dish with conflicting prices only when distinct nearby menu sections exist", () => {
    const lines = [
      "KLASSISK Sashimi",
      "LAKS 139",
      "Klassisk Nigiri",
      "LAKS 159",
      "Maki",
      "TEMPURA MAKI 189",
    ];
    const visibleText = lines.join("\n");
    const parsed = extractMenuItemsFromPdfLines(lines);
    const salmon = parsed.filter((item) => item.normalizedName === "laks");

    expect(salmon).toHaveLength(2);
    expect(new Set(salmon.map((item) => item.sourceKey)).size).toBe(1);

    const disambiguated = disambiguateConflictingPdfSourceKeys(
      visibleText,
      parsed,
    );
    const scopedSalmon = disambiguated.filter(
      (item) => item.normalizedName === "laks",
    );
    expect(
      scopedSalmon.map((item) => [item.sectionName, item.priceMinor]),
    ).toEqual([
      ["KLASSISK Sashimi", 13900],
      ["Klassisk Nigiri", 15900],
    ]);
    expect(new Set(scopedSalmon.map((item) => item.sourceKey)).size).toBe(2);
  });

  it("disambiguates same-name lunch and dinner PDF dishes by service context", () => {
    const lines = [
      "LUNSJMENY, 11:30 – 22:00",
      "ANTIPASTI",
      "KRABBE 195",
      "KVELDSMENY 17:00-22:00",
      "ANTIPASTI",
      "KRABBE 210",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const crab = parsed.filter((item) => item.normalizedName === "krabbe");
    expect(new Set(crab.map((item) => item.sourceKey)).size).toBe(1);

    const disambiguated = disambiguateConflictingPdfSourceKeys(
      lines.join("\n"),
      parsed,
    );
    const scopedCrab = disambiguated.filter(
      (item) => item.normalizedName === "krabbe",
    );
    expect(
      scopedCrab.map((item) => [item.sectionName, item.priceMinor]),
    ).toEqual([
      ["LUNSJMENY, 11:30 – 22:00", 19500],
      ["KVELDSMENY 17:00-22:00", 21000],
    ]);
    expect(new Set(scopedCrab.map((item) => item.sourceKey)).size).toBe(2);
  });

  it("drops PDF ABV-volume rows and lowercase sentence fragments without hiding real dishes", () => {
    const lines = [
      "HOVEDRETTER",
      "Grisens burger 295",
      "Grisens Bayer 5,0% 0,25/0,4 95 / 137",
      "Små Vesen Vette 4,7% Hveteøl 0,25/0,4 95 / 137",
      "Bådin Kjerringøy 4,7% Pale Ale 0,33 139",
      "Add bacon to any dish for 35",
      "marinated in Erling Skakke XO Cognac. 265",
      "tartar sauce. 295",
      "Beer battered fish 249",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);
    expect(scoped.map((item) => item.name)).toEqual([
      "Grisens burger",
      "Beer battered fish",
    ]);
  });

  it("drops parenthetical allergen-only PDF rows without hiding real dishes", () => {
    const lines = [
      "PIZZA AL FORNO DA LEGNA",
      "DI MARE 220",
      "(Fisk, skalldyr) 220",
      "SKUR 33 185",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.some((item) => item.name === "(Fisk, skalldyr)")).toBe(false);
    expect(scoped.some((item) => item.name === "DI MARE")).toBe(true);
    expect(scoped.some((item) => item.name === "SKUR 33")).toBe(true);
  });

  it("filters split parenthetical allergen-code fragments before source-key conflict resolution", () => {
    const lines = [
      "RESTAURANT MENU",
      "(M, 189",
      "(M, 255",
      "Braised duck 325",
      "Apple tart 165",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const fragments = parsed.filter((item) => item.name === "(M,");
    expect(fragments).toHaveLength(2);
    expect(new Set(fragments.map((item) => item.sourceKey)).size).toBe(1);

    const eligible = filterPdfConflictMetadataItems(parsed);
    expect(eligible.some((item) => item.name === "(M,")).toBe(false);
    expect(eligible.map((item) => item.name)).toContain("Braised duck");
    expect(eligible.map((item) => item.name)).toContain("Apple tart");

    const disambiguated = disambiguateConflictingPdfSourceKeys(
      lines.join("\n"),
      eligible,
    );
    expect(disambiguated.map((item) => item.name)).toEqual([
      "Braised duck",
      "Apple tart",
    ]);
  });

  it("recognizes documented Norwegian allergen abbreviations in split parenthetical fragments", () => {
    const lines = [
      "(H, R, BY, 190",
      "(HN, VN, SP, C, LU, S, 210",
      "Braised duck 325",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    expect(parsed.map((item) => item.name)).toEqual([
      "(H, R, BY,",
      "(HN, VN, SP, C, LU, S,",
      "Braised duck",
    ]);

    const eligible = filterPdfConflictMetadataItems(parsed);
    expect(eligible.map((item) => item.name)).toEqual(["Braised duck"]);
  });

  it("does not move ordinary description filtering ahead of source-key conflict resolution", () => {
    const lines = [
      "Add bacon to any dish for 35",
      "marinated in Erling Skakke XO Cognac. 265",
      "Braised duck 325",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const eligible = filterPdfConflictMetadataItems(parsed);

    expect(eligible.map((item) => item.name)).toEqual(
      parsed.map((item) => item.name),
    );
  });

  it("keeps ordinary unresolved dish conflicts fail-closed after metadata prefiltering", () => {
    const lines = ["LAKS 139", "LAKS 159"];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const eligible = filterPdfConflictMetadataItems(parsed);
    expect(eligible).toHaveLength(2);
    const disambiguated = disambiguateConflictingPdfSourceKeys(
      lines.join("\n"),
      eligible,
    );
    expect(disambiguated.map((item) => item.sourceKey)).toEqual(
      eligible.map((item) => item.sourceKey),
    );
  });

  it("fails closed when conflicting same-name prices cannot be bound to distinct menu sections", () => {
    const lines = ["LAKS 139", "LAKS 159"];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const disambiguated = disambiguateConflictingPdfSourceKeys(
      lines.join("\n"),
      parsed,
    );

    expect(disambiguated.map((item) => item.sourceKey)).toEqual(
      parsed.map((item) => item.sourceKey),
    );
  });

  it("does not apply split-fragment-only allergen codes to low-price dish-name recovery", () => {
    const visibleText = [
      "DESSERT",
      "Special BY",
      "35,-",
    ].join("\n");

    const recovered = recoverExplicitLowPerItemPdfRows(visibleText, []);
    expect(recovered.map((item) => item.name)).toEqual(["Special BY"]);
  });

  it("recovers an explicit low per-item price from the next PDF text line", () => {
    const visibleText = [
      "DESSERT // Dessert",
      "178. Noe søtt til kaffe? Macaron HNE",
      "kr.35 (pr.stk)",
      "(spør gjerne servitøren din om dagens utvalg)",
    ].join("\n");

    const recovered = recoverExplicitLowPerItemPdfRows(visibleText, []);
    expect(recovered.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Noe søtt til kaffe? Macaron", 3500],
    ]);
  });

  it("recovers an explicit low PDF price with a visible currency-style suffix", () => {
    const visibleText = [
      "ALL DAY",
      "BISCOTTO",
      "35,-",
    ].join("\n");

    const recovered = recoverExplicitLowPerItemPdfRows(visibleText, []);
    expect(recovered.map((item) => [item.name, item.priceMinor])).toEqual([
      ["BISCOTTO", 3500],
    ]);
  });

  it("does not recover low bare-number or non-per-item price lines", () => {
    const visibleText = [
      "DESSERT",
      "Cheap metadata",
      "35",
      "Ordinary low line",
      "kr.35",
    ].join("\n");
    expect(recoverExplicitLowPerItemPdfRows(visibleText, [])).toEqual([]);
  });

  it("excludes a child-drink section and resumes at Italian desserts", () => {
    const lines = [
      "Menu per bambini",
      "Bambino Margerita 95",
      "Barnedrinker",
      "Smurf 68",
      "Villa Paradiso 68",
      "Dolci",
      "Tiramisù 145",
      "Panna cotta 145",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => item.name)).toEqual([
      "Bambino Margerita",
      "Tiramisù",
      "Panna cotta",
    ]);
  });

  it("drops generic per-person pricing metadata without restaurant-specific rules", () => {
    const lines = [
      "SHARING MENU",
      "Minimum 2 personer, pris per person 479",
      "1 pers 355,- 2 pers 675,- 3 pers 989,-",
      "Cà ri gà / Chicken curry 239",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => item.name)).toEqual([
      "Cà ri gà / Chicken curry",
    ]);
  });

  it("does not reopen beverage scope when a spirit name completes a food-pairing phrase", () => {
    const lines = [
      "S N A C K S",
      "GRILLED FOCACCIA 105,-",
      "P E R F E C T W I T H",
      "V O D K A !",
      "PIGGVAR - TURBOT 595,-",
      "RICOTTA RAVIOLI 245,-",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => item.name)).toEqual([
      "GRILLED FOCACCIA",
      "PIGGVAR - TURBOT",
      "RICOTTA RAVIOLI",
    ]);
  });

  it("resumes food scope at service headings and blocks common spirit section families", () => {
    const lines = [
      "SPECIALS",
      "225,-",
      "COCKTAILS",
      "House Martini 195",
      "ALL DAY",
      "Avocado Toast 279",
      "Chicken Caesar Salad 325",
      "SINGLE MALT WHISKY",
      "Highland 12y 215",
      "VODKA",
      "House Vodka 135",
      "GIN",
      "London Dry 145",
      "RUM",
      "Dark Rum 155",
      "TEQUILA & MEZCAL",
      "Reposado 165",
      "AQUAVIT",
      "Linie 145",
      "LIQUEURS",
      "Amaretto 109",
      "CALVADOS",
      "Apple Brandy 129",
      "ARMAGNAC",
      "House Armagnac 155",
      "GRAPPA",
      "Aged Grappa 169",
      "EVENING",
      "Salted Cucumber 95",
      "Spanish Anchovies 125",
      "WINE BY THE GLASS",
      "House White 175",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => item.name)).toEqual([
      "Avocado Toast",
      "Chicken Caesar Salad",
      "Salted Cucumber",
      "Spanish Anchovies",
    ]);
  });

  it("blocks interleaved wine recommendation/pairing rows and resumes at bilingual course headings", () => {
    const lines = [
      "Vinanbefaling / Wine recomendation",
      "Riesling Charm Georg Breuer Rheingau Germany 178 NOK",
      "Forrett / Starter",
      "Beef tenderloin 445 NOK",
      "VINPAKKE / WINE PAIRING",
      "Pinot Grigio Elena Walch Alto Adige Italy 178 NOK",
      "Mellomrett / Middle course",
      "Pan fried cod 395 NOK",
      "Wine recommendation",
      "Barbera d’Alba Paolo Scavino Italy 178 NOK",
      "Hovedrett / Main course",
      "Roasted lamb 495 NOK",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => item.name)).toEqual([
      "Beef tenderloin",
      "Pan fried cod",
      "Roasted lamb",
    ]);
  });

  it("blocks bilingual beverage sections and resumes at a bilingual dinner-menu heading", () => {
    const lines = [
      "Musserende / Sparkling Glass Bottle",
      "House Brut 155",
      "Hvitvin / White Wine Glass Bottle",
      "House White 165",
      "Rødvin / Red Wine Glass Bottle",
      "House Red 175",
      "Øl / Beer",
      "House Lager 129",
      "Alkoholfrie alternativ / Non-Alcoholic alternative Glass Bottle",
      "House Zero 89",
      "Varm drikke / Hot beverage",
      "House Coffee 65",
      "Middagsmeny / Dinner menu",
      "Beef tartare 295",
      "Roasted cod 395",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => item.name)).toEqual([
      "Beef tartare",
      "Roasted cod",
    ]);
  });

  it("drops generic fixed-course menu prices while preserving priced dishes", () => {
    const lines = [
      "Middagsmeny / Dinner menu",
      "3 retters middagsmeny 845",
      "3 course dinner menu 845",
      "Crudo av kveite 259",
      "5 retters middag 1190",
      "5 course dinner 1190",
      "Sjokoladeterte 189",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => item.name)).toEqual([
      "Crudo av kveite",
      "Sjokoladeterte",
    ]);
  });

  it("excludes branded cocktail sections, quantity-price fragments and resumes at sides", () => {
    const lines = [
      "Oysters",
      "1 for 50,-",
      "12 for 600,-",
      "Atlas Cocktails",
      "Spicy Peach Margarita 189,-",
      "Negroni 189,-",
      "Sides",
      "Romano Salad 75,-",
      "Truffle Mac & Cheese 149,-",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => item.name)).toEqual([
      "Romano Salad",
      "Truffle Mac & Cheese",
    ]);
  });

  it("recognizes letter-spaced predrinks and rejects compound wine-pairing price rows", () => {
    const lines = [
      "M A I N S",
      "Norda steak & fries 535,-",
      "P R E D R I N K S 1 8 9 ,-",
      "Dry Martini 189,-",
      "SET M E N U S",
      "Chef’s 3 course menu 935,- / Wine pairing 595,-",
      "Chef’s 5 course menu 1185,- / Wine pairing 825,-",
      "ST A R TE R S",
      "Marinated kingfish 295,-",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => item.name)).toEqual([
      "Norda steak & fries",
      "Marinated kingfish",
    ]);
  });

  it("does not remove an ordinary priced dish merely because its name contains drink-like words", () => {
    const lines = [
      "HOVEDRETTER",
      "Beer battered fish 249",
      "DESSERT",
      "Coffee caramel cake 129",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => item.name)).toEqual([
      "Beer battered fish",
      "Coffee caramel cake",
    ]);
  });

  it("strips trailing sharing taglines while preserving semantic sharing words inside a dish name", () => {
    const lines = [
      "ANTIPASTI",
      "Antipasto all’Italiana Perfekt å dele! 299",
      "Sharing platter 349",
      "Perfect for sharing pie 259",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => item.name)).toEqual([
      "Antipasto all’Italiana",
      "Sharing platter",
      "Perfect for sharing pie",
    ]);
  });
});
