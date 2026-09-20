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
  it("drops synthetic PDF.js whitespace boundaries that raw PDF text does not contain", () => {
    const lines = reconstructPdfTextLines(
      [
        { str: "CÔTE D", transform: [1, 0, 0, 1, 100, 700], width: 36 },
        { str: " ", transform: [1, 0, 0, 1, 136, 700], width: 6 },
        { str: "E", transform: [1, 0, 0, 1, 142, 700], width: 5 },
        { str: " ", transform: [1, 0, 0, 1, 147, 700], width: 3 },
        { str: "BO", transform: [1, 0, 0, 1, 150, 700], width: 14 },
        { str: " ", transform: [1, 0, 0, 1, 164, 700], width: 3 },
        { str: "EU", transform: [1, 0, 0, 1, 167, 700], width: 13 },
        { str: " ", transform: [1, 0, 0, 1, 180, 700], width: 1 },
        { str: "F", transform: [1, 0, 0, 1, 181, 700], width: 5 },
        { str: " ", transform: [1, 0, 0, 1, 186, 700], width: 4 },
        { str: "MED", transform: [1, 0, 0, 1, 190, 700], width: 20, hasEOL: true },
        { str: "SAUS B", transform: [1, 0, 0, 1, 100, 680], width: 35 },
        { str: " ", transform: [1, 0, 0, 1, 135, 680], width: 6 },
        { str: "É", transform: [1, 0, 0, 1, 141, 680], width: 5 },
        { str: "ARNAISE", transform: [1, 0, 0, 1, 146, 680], width: 42, hasEOL: true },
      ],
      1,
      "CÔTE DE BOEUF MED SAUS BÉARNAISE",
    );

    expect(lines).toEqual(["CÔTE DE BOEUF MED", "SAUS BÉARNAISE"]);
  });

});
