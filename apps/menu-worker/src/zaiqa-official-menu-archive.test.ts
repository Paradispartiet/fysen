import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { extractHtmlMenu } from "./html-extractor.js";

const archived = await readFile(
  new URL("../source-archives/zaiqa-dalsbergstien-20261104.html", import.meta.url),
  "utf8",
);

describe("Zaiqa dated official-menu evidence archive", () => {
  it("is explicitly a dated, non-live reconstruction with first-party provenance", () => {
    expect(archived).toContain('content="https://zaiqa.no/var-meny/"');
    expect(archived).toContain('content="2026-11-04"');
    expect(archived).toContain('content="manually-reviewed-historical-archive-not-live"');
  });
  it("extracts 52 distinct explicitly NOK-priced dishes with no copied descriptions", () => {
    const result = extractHtmlMenu(archived);
    expect(result.method).toBe("json_ld");
    expect(result.items).toHaveLength(52);
    expect(new Set(result.items.map((x) => x.normalizedName)).size).toBe(52);
    expect(result.items.every((x) => x.currency === "NOK" && x.priceMinor !== null)).toBe(true);
  });
  it("retains all eight independently source-verified Zaiqa price assertions", () => {
    const observed = extractHtmlMenu(archived).items;
    const proofs: ReadonlyArray<readonly [string, number]> = [
      ["Chicken Korma", 25900],
      ["Chicken Tikka Masala", 25900],
      ["Lam Korma", 27900],
      ["Lam Curry", 27900],
      ["Butter Paneer", 24900],
      ["Vegetable Biryani", 23900],
      ["Papadam", 4900],
      ["Plain Naan", 4900],
    ];
    for (const [name, priceMinor] of proofs) {
      expect(observed.some((x) => x.name === name && x.priceMinor === priceMinor)).toBe(true);
    }
  });
});
