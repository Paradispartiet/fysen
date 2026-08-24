import { describe, expect, it } from "vitest";
import { extractMenuItemsFromPdfLines } from "./pdf-extractor.js";
import {
  PDF_SOURCE_EXTRACTOR_VERSION,
  disambiguateConflictingPdfSourceKeys,
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

    expect(PDF_SOURCE_EXTRACTOR_VERSION).toBe("pdf-text-v15");
    expect(scoped.map((item) => item.name)).toEqual([
      "Phở bò tái / Pho beef noodle soup",
      "Kem yuzu / Yuzu ice cream",
    ]);
    expect(scoped.map((item) => item.position)).toEqual([0, 1]);
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

    const disambiguated = disambiguateConflictingPdfSourceKeys(visibleText, parsed);
    const scopedSalmon = disambiguated.filter((item) => item.normalizedName === "laks");
    expect(scopedSalmon.map((item) => [item.sectionName, item.priceMinor])).toEqual([
      ["KLASSISK Sashimi", 13900],
      ["Klassisk Nigiri", 15900],
    ]);
    expect(new Set(scopedSalmon.map((item) => item.sourceKey)).size).toBe(2);
  });

  it("fails closed when conflicting same-name prices cannot be bound to distinct menu sections", () => {
    const lines = ["LAKS 139", "LAKS 159"];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const disambiguated = disambiguateConflictingPdfSourceKeys(lines.join("\n"), parsed);

    expect(disambiguated.map((item) => item.sourceKey)).toEqual(
      parsed.map((item) => item.sourceKey),
    );
  });

  it("drops standalone currency-price rows that PDF column ordering can expose as pseudo dish names", () => {
    const lines = [
      "HOVEDRETTER",
      "Kofta (arabisk gryterett med kjøttboller)",
      "kr. 310",
      "kr. 290",
      "Kylling Tawok",
      "kr. 310",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Kofta (arabisk gryterett med kjøttboller)", 31000],
      ["Kylling Tawok", 31000],
    ]);
    expect(scoped.some((item) => /^(?:kr\.?|nok)\s*\d/iu.test(item.name))).toBe(false);
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
      "Cà ri gà / Chicken curry 239",
    ];
    const parsed = extractMenuItemsFromPdfLines(lines);
    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);

    expect(scoped.map((item) => item.name)).toEqual(["Cà ri gà / Chicken curry"]);
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

    expect(scoped.map((item) => item.name)).toEqual(["Beer battered fish", "Coffee caramel cake"]);
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
