import { describe, expect, it, vi } from "vitest";

vi.mock("pdfjs-dist/legacy/build/pdf.mjs", () => ({
  getDocument: () => ({
    promise: Promise.resolve({
      numPages: 1,
      getPage: async () => ({
        getTextContent: async () => ({
          items: [
            {
              str: "TERRINE AV SVINEKJAKE MED DIJON SENNEP",
              transform: [9, 0, 0, 9, 72, 760],
              width: 180,
              hasEOL: true,
            },
            {
              str: "ØSTERS MED SITRON OG CHAMPAGNE EDDIK",
              transform: [9, 0, 0, 9, 72, 740],
              width: 190,
              hasEOL: true,
            },
            {
              str: "TERRINE OF PORK CHEEKS WITH D",
              transform: [9, 0, 0, 9, 72, 720],
              width: 125,
            },
            {
              str: " ",
              transform: [9, 0, 0, 9, 197, 720],
              width: 21,
            },
            {
              str: "IJON MUSTARD AND FRISSEE",
              transform: [9, 0, 0, 9, 218, 720],
              width: 105,
              hasEOL: true,
            },
            {
              str: "BELUGA - TASTE PROFI",
              transform: [8, 0, 0, 8, 72, 700],
              width: 95,
            },
            {
              str: " ",
              transform: [8, 0, 0, 8, 167, 700],
              width: 5.8,
            },
            {
              str: "LE: CREAM, BUTTER",
              transform: [8, 0, 0, 8, 172.8, 700],
              width: 72,
              hasEOL: true,
            },
            {
              str: "OSCIETRA - TASTE PROFI",
              transform: [8, 0, 0, 8, 72, 680],
              width: 104,
            },
            {
              str: " ",
              transform: [8, 0, 0, 8, 176, 680],
              width: 5.8,
            },
            {
              str: "LE: BUTTER, NUTS",
              transform: [8, 0, 0, 8, 181.8, 680],
              width: 68,
              hasEOL: true,
            },
            {
              str: "COTE DE",
              transform: [9, 0, 0, 9, 72, 660],
              width: 31.5,
            },
            {
              str: " ",
              transform: [9, 0, 0, 9, 103.5, 660],
              width: 7.8,
            },
            {
              str: "BO",
              transform: [9, 0, 0, 9, 111.3, 660],
              width: 10.8,
            },
            {
              str: " ",
              transform: [9, 0, 0, 9, 122.1, 660],
              width: 2.2,
            },
            {
              str: "EU",
              transform: [9, 0, 0, 9, 124.3, 660],
              width: 10.2,
            },
            {
              str: " ",
              transform: [9, 0, 0, 9, 134.5, 660],
              width: 1.1,
            },
            {
              str: "F SERVED WITH",
              transform: [9, 0, 0, 9, 135.6, 660],
              width: 57,
            },
            {
              str: " ",
              transform: [9, 0, 0, 9, 192.6, 660],
              width: 10.4,
            },
            {
              str: "GLAZED ONIONS AND SAUCE B",
              transform: [9, 0, 0, 9, 203, 660],
              width: 120,
            },
            {
              str: " ",
              transform: [9, 0, 0, 9, 323, 660],
              width: 6.2,
            },
            {
              str: "É",
              transform: [9, 0, 0, 9, 329.2, 660],
              width: 4.4,
            },
            {
              str: "ARNAISE",
              transform: [9, 0, 0, 9, 334.3, 660],
              width: 32,
              hasEOL: true,
            },
            {
              str: "RIBEYE WITH SAUCE B",
              transform: [12, 0, 0, 12, 72, 640],
              width: 100,
            },
            {
              str: " ",
              transform: [12, 0, 0, 12, 172, 640],
              width: 6.2,
            },
            {
              str: "É",
              transform: [12, 0, 0, 12, 178.2, 640],
              width: 5.9,
            },
            {
              str: "ARNAISE",
              transform: [12, 0, 0, 12, 184.9, 640],
              width: 42.5,
              hasEOL: true,
            },
            {
              str: "(m,sen,su)",
              transform: [9.96, 0, 0, 9.96, 72, 610],
              width: 42.32,
            },
            {
              str: " ",
              transform: [9.96, 0, 0, 9.96, 114.32, 610],
              width: 2.35,
            },
            {
              str: "1500,- kg",
              transform: [11.04, 0, 0, 11.04, 116.67, 610],
              width: 41.06,
              hasEOL: true,
            },
            {
              str: "OYSTERS WITH CHAMPAG",
              transform: [9, 0, 0, 9, 72, 620],
              width: 100,
            },
            {
              str: " ",
              transform: [9, 0, 0, 9, 172, 620],
              width: 37,
            },
            {
              str: "N",
              transform: [9, 0, 0, 9, 209, 620],
              width: 5.8,
            },
            {
              str: "E VINEGAR",
              transform: [9, 0, 0, 9, 215.7, 620],
              width: 40,
              hasEOL: true,
            },
          ],
        }),
        cleanup: () => undefined,
      }),
    }),
    destroy: async () => undefined,
  }),
}));

import { extractPdfMenu } from "./pdf-extractor.js";

describe("PDF positioned fragment spacing", () => {
  it("repairs document-backed synthetic spaces without collapsing real word gaps", async () => {
    const extracted = await extractPdfMenu(
      new TextEncoder().encode("%PDF-mocked"),
    );

    expect(extracted.visibleText).toContain(
      "TERRINE OF PORK CHEEKS WITH DIJON MUSTARD AND FRISSEE",
    );
    expect(extracted.visibleText).toContain(
      "BELUGA - TASTE PROFILE: CREAM, BUTTER",
    );
    expect(extracted.visibleText).toContain(
      "OSCIETRA - TASTE PROFILE: BUTTER, NUTS",
    );
    expect(extracted.visibleText).toContain(
      "COTE DE BOEUF SERVED WITH GLAZED ONIONS AND SAUCE BÉARNAISE",
    );
    expect(extracted.visibleText).toContain(
      "RIBEYE WITH SAUCE BÉARNAISE",
    );
    expect(extracted.visibleText).toContain(
      "OYSTERS WITH CHAMPAGNE VINEGAR",
    );

    expect(extracted.visibleText).not.toContain("D IJON");
    expect(extracted.visibleText).not.toContain("PROFI LE");
    expect(extracted.visibleText).not.toContain("BO EUF");
    expect(extracted.visibleText).not.toContain("B ÉARNAISE");
    expect(extracted.visibleText).not.toContain("CHAMPAG NE");
    expect(extracted.visibleText).toContain("(m,sen,su) 1500,- kg");
    expect(extracted.visibleText).not.toContain("(m,sen,su)1500,- kg");
    expect(extracted.visibleText).toContain("DE BOEUF");
    expect(extracted.visibleText).toContain("BOEUF SERVED");
  });
});
