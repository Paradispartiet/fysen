import { describe, expect, it } from "vitest";
import { extractPelikanColumns, pelikanColumnLines, type PelikanFragment } from "./nordic-pelikan-preview.js";
const expected = [
  {name:"Toast Skagen",section:"Förrätter"},
  {name:"Pelikans köttbullar",section:"Huvudrätter"},
  {name:"Pelikans smågodis",section:"Efterrätter"},
];
const columns = [
  ["FÖRRÄTTER","toast skagen 195, 1/1 295","description","APERITIF","drink 195"],
  ["HUVUDRÄTTER","pelikans köttbullar 285","GROSSHANDLARMIDDAG*","1199"],
  ["EFTERRÄTTER","Pelikans smågodis (tryffel & kaka) 75","BRÄNNVIN per cl","drink 29"],
];
describe("Pelikan PDF scoped Swedish price extraction", () => {
  it("handles half/full prices and does not include drinks or packages", () => {
    const items = extractPelikanColumns(columns, expected);
    expect(items.map((r) => r.priceMinor)).toEqual([19500,28500,7500]);
    expect(items[0]?.priceMaxMinor).toBe(29500);
    expect(items.every((r) => r.currency === "SEK" && r.page === 1)).toBe(true);
  });
  it("separates horizontally adjacent price columns", () => {
    const fragments: PelikanFragment[] = [
      {text:"toast skagen",x:.02,y:.73},{text:"195, 1/1 295",x:.23,y:.73},
      {text:"pelikans köttbullar",x:.35,y:.73},{text:"285",x:.63,y:.73},
      {text:"Pelikans smågodis",x:.67,y:.73},{text:"75",x:.96,y:.73},
    ];
    expect(pelikanColumnLines(fragments)).toEqual([
      ["toast skagen 195, 1/1 295"],["pelikans köttbullar 285"],["Pelikans smågodis 75"],
    ]);
  });
  it("rejects unknown rows, missing headings and missing or duplicate prices", () => {
    expect(() => extractPelikanColumns([["FÖRRÄTTER","unknown 123","APERITIF"],columns[1]!,columns[2]!],expected)).toThrow(/Unreviewed/u);
    expect(() => extractPelikanColumns([["toast skagen 195","APERITIF"],columns[1]!,columns[2]!],expected)).toThrow(/boundaries/u);
    expect(() => extractPelikanColumns([["FÖRRÄTTER","APERITIF"],columns[1]!,columns[2]!],expected)).toThrow(/Missing/u);
    expect(() => extractPelikanColumns([["FÖRRÄTTER","toast skagen 195","toast skagen 196","APERITIF"],columns[1]!,columns[2]!],expected)).toThrow(/Duplicate/u);
  });
});
