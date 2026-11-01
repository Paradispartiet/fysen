import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";

const fixturePages = vi.hoisted(() => ({ pages: [] as unknown[][] }));
vi.mock("pdfjs-dist/legacy/build/pdf.mjs", () => ({
  getDocument: () => ({
    promise: Promise.resolve({
      get numPages() { return fixturePages.pages.length; },
      getPage: async (page: number) => ({
        getTextContent: async () => ({ items: fixturePages.pages[page - 1] }),
        cleanup() {},
      }),
    }),
    destroy: async () => {},
  }),
}));
import { extractScopedPdfMenu, scopePdfMenuItems } from "./pdf-source-extractor.js";
import { recoverTypographicPdfRows } from "./pdf-typographic-rows.js";
import { extractMenuItemsFromPdfLines } from "./pdf-extractor.js";

// Independently transcribed from the rendered October 2026 menu pages. All
// individually priced food is included, including the five optional side dishes.
const expected = [
  ["Dagens lunsjsuppe", 179], ["Klassisk rekesmørbrød", 285],
  ["Smørbrød med røkt ørret", 275], ["Egg B&P", 269], ["Grisens lapskaus", 265],
  ["HJEMMELAGET SVINESVOR (50g)", 185],
  ["Beer Brulee", 180], ["Grisens hvite sjokolade", 175], ["Ostekake", 195],
  ["Liten Grønn Salat", 142], ["Stekte poteter", 105], ["Grønnsaker", 105],
  ["Ekstra french fries", 110], ["Coleslaw", 75],
  ["Fish & Chips / Grisens Gryte", 215], ["Chevre Salat", 310], ["Fish & Chips", 310],
  ["Langgrillet svineknoke", 439], ["Langtidsstekt nakke av gris", 410],
  ["Grisens Gryte", 395], ["Grisens laaangtidsstekte BBQ Spareribs", 429],
  ["Flatbanka gris", 429], ["Einerrøkt ørret", 249], ["Lettrøkt hval fra Norskehavet", 205],
];

describe("typographic food rows", () => {
  it("binds every visual Norwegian dish to its own price across columns and wrapped translations", async () => {
    fixturePages.pages = [6, 7].map(page => JSON.parse(readFileSync(
      new URL(`./fixtures/pdf/glade-gris-food-${page}.json`, import.meta.url), "utf8")));
    const result = await extractScopedPdfMenu(new TextEncoder().encode("%PDF-fixture"));
    expect(result.items.map(item => [item.name, (item.priceMinor ?? 0) / 100])).toEqual(expected);
    expect(result.items.find(item => item.name === "HJEMMELAGET SVINESVOR (50g)")?.description).toContain("Homemade crackling pork skin");
    expect(result.items.find(item => item.name === "Klassisk rekesmørbrød")?.description).not.toContain("Øl / beer:");
    expect(result.items.find(item => item.name === "Coleslaw")?.sectionName).toBe("SIDERETTER");
    expect(result.items.find(item => item.name === "Fish & Chips / Grisens Gryte")?.sectionName).toBe("CHILDREN’S MENU");
  });

  it("falls back for unpositioned or non-emphasized text and rejects cross-column price binding", () => {
    const raw = JSON.parse(readFileSync(new URL("./fixtures/pdf/glade-gris-food-7.json", import.meta.url), "utf8"));
    expect(recoverTypographicPdfRows(raw.map((span: object) => ({ ...span, transform: undefined })))).toEqual([]);
    expect(recoverTypographicPdfRows(raw.map((span: { fontName: string }) => ({ ...span, fontName: "same" })))).toEqual([]);
    const crossed = raw.map((span: { str: string; transform: number[] }) => span.str === "Kr. 439"
      ? { ...span, transform: [...span.transform.slice(0, 4), 600, span.transform[5]] } : span);
    expect(recoverTypographicPdfRows(crossed).map(row => row.name)).not.toContain("Langgrillet svineknoke");
  });

  it("rejects two competing prices in the same typographic card", () => {
    const raw = JSON.parse(readFileSync(new URL("./fixtures/pdf/glade-gris-food-7.json", import.meta.url), "utf8"));
    const ambiguous = raw.flatMap((span: { str: string; transform: number[] }) => span.str === "Kr. 439"
      ? [{ ...span, str: "Kr. 349", transform: [...span.transform.slice(0, 5), span.transform[5]! + 12] }, span] : [span]);
    expect(recoverTypographicPdfRows(ambiguous).map(row => row.name)).not.toContain("Langgrillet svineknoke");
  });

  it("resumes food inside a beer list and excludes course bundles and subsequent drinks", () => {
    const lines = ["FATØL/DRAFT", "Local 4,6% 0,25/0,4 129/169", "SNACKS",
      "Crackling pork 185", "PALE ALE", "Unknown brewery 4,7% 0,33 155",
      "ONLY FOR LUNCH", "Soup 179", "CHEF’S MENU:",
      "3-retter med langgrillet svineknoke. 3 course recommendation!", "Kr. 628",
      "FORRETT", "Trout 249", "DRINKER", "Pink tonic 195"];
    expect(scopePdfMenuItems(lines.join("\n"), extractMenuItemsFromPdfLines(lines))
      .map(item => [item.name, item.priceMinor])).toEqual([
        ["Crackling pork", 18500], ["Soup", 17900], ["Trout", 24900],
      ]);
  });
});
