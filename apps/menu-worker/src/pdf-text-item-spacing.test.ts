import { describe, expect, it } from "vitest";
import { reconstructPdfTextLines } from "./pdf-extractor.js";

describe("PDF text-item spacing", () => {
  it("joins adjacent intra-word PDF text fragments without collapsing real word spaces", () => {
    const lines = reconstructPdfTextLines([
      { str: "CÔTE DE BO", transform: [1, 0, 0, 1, 100, 700], width: 55 },
      { str: "EUF", transform: [1, 0, 0, 1, 155.5, 700], width: 18, hasEOL: true },
      { str: "BEEF", transform: [1, 0, 0, 1, 100, 680], width: 24 },
      { str: "TARTARE", transform: [1, 0, 0, 1, 128, 680], width: 42, hasEOL: true },
      { str: "D", transform: [1, 0, 0, 1, 100, 660], width: 7 },
      { str: "IJON", transform: [1, 0, 0, 1, 107.5, 660], width: 25, hasEOL: true },
      { str: "SAUCE", transform: [1, 0, 0, 1, 100, 640], width: 30 },
      { str: " BÉARNAISE", transform: [1, 0, 0, 1, 130.5, 640], width: 52, hasEOL: true },
    ]);

    expect(lines).toEqual([
      "CÔTE DE BOEUF",
      "BEEF TARTARE",
      "DIJON",
      "SAUCE BÉARNAISE",
    ]);
  });
});
