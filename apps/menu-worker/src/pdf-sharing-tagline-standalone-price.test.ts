import { describe, expect, it } from "vitest";
import { extractMenuItemsFromPdfLines } from "./pdf-extractor.js";
import { scopePdfMenuItems } from "./pdf-source-extractor.js";

describe("PDF sharing-tagline standalone prices", () => {
  it("preserves a sharing-tagged dish title immediately before its standalone price", () => {
    const lines = [
      "ANTIPASTI",
      "Antipasto all’Italiana Perfekt å dele! 299",
      "Et utvalg av italienske spesialiteter",
      "Manzo tonnato Perfekt å dele!",
      "295",
      "vår vri på den klassiske Vitello tonnato - tynne skiver av",
    ];

    const parsed = extractMenuItemsFromPdfLines(lines);

    expect(parsed.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Antipasto all’Italiana Perfekt å dele!", 29900],
      ["Manzo tonnato Perfekt å dele!", 29500],
    ]);
    expect(parsed[0]?.description).not.toContain("Manzo tonnato");

    const scoped = scopePdfMenuItems(lines.join("\n"), parsed);
    expect(scoped.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Antipasto all’Italiana", 29900],
      ["Manzo tonnato", 29500],
    ]);
  });

  it("still skips ordinary exclamation-ended description copy before a standalone price", () => {
    const lines = [
      "KALDE MEZE",
      "LABNE BIL TOUM",
      "Passer perfekt som en liten rett å dele!",
      "129,-",
    ];

    const parsed = extractMenuItemsFromPdfLines(lines);

    expect(parsed).toHaveLength(1);
    expect(parsed[0]).toMatchObject({
      name: "LABNE BIL TOUM",
      priceMinor: 12900,
      description: "Passer perfekt som en liten rett å dele!",
    });
  });
});
