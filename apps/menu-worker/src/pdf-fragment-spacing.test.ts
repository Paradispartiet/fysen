import { describe, expect, it, vi } from "vitest";

vi.mock("pdfjs-dist/legacy/build/pdf.mjs", () => ({
  getDocument: () => ({
    promise: Promise.resolve({
      numPages: 1,
      getPage: async () => ({
        getTextContent: async () => ({
          items: [
            {
              str: "MAINS",
              transform: [10, 0, 0, 10, 72, 760],
              width: 35,
              hasEOL: true,
            },
            {
              str: "COTE DE BO",
              transform: [10, 0, 0, 10, 72, 730],
              width: 57,
            },
            {
              str: "EUF",
              transform: [10, 0, 0, 10, 129.4, 730],
              width: 18,
            },
            {
              str: "SERVED WITH GLAZED ONIONS",
              transform: [10, 0, 0, 10, 151, 730],
              width: 140,
              hasEOL: true,
            },
            {
              str: "2050",
              transform: [10, 0, 0, 10, 72, 710],
              width: 22,
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
  it("joins near-touching fragments inside a visual word without collapsing a real word gap", async () => {
    const extracted = await extractPdfMenu(
      new TextEncoder().encode("%PDF-mocked"),
    );

    expect(extracted.visibleText).toContain(
      "COTE DE BOEUF SERVED WITH GLAZED ONIONS",
    );
    expect(extracted.visibleText).not.toContain("BO EUF");
    expect(extracted.visibleText).toContain("EUF SERVED");
  });
});
