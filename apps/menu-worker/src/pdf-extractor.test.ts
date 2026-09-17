import { describe, expect, it } from "vitest";
import {
  PDF_EXTRACTOR_VERSION,
  extractMenuItemsFromPdfLines,
  extractMenuItemsFromPdfPages,
  extractPdfMenu,
} from "./pdf-extractor.js";

const syntheticPdfBase64 = "JVBERi0xLjMKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYSAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjEgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iagozIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcgL05hbWUgL0YyIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKNCAwIG9iago8PAovQ29udGVudHMgOCAwIFIgL01lZGlhQm94IFsgMCAwIDU5NS4yNzU2IDg0MS44ODk4IF0gL1BhcmVudCA3IDAgUiAvUmVzb3VyY2VzIDw8Ci9Gb250IDEgMCBSIC9Qcm9jU2V0IFsgL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSSBdCj4+IC9Sb3RhdGUgMCAvVHJhbnMgPDwKCj4+IAogIC9UeXBlIC9QYWdlCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9QYWdlTW9kZSAvVXNlTm9uZSAvUGFnZXMgNyAwIFIgL1R5cGUgL0NhdGFsb2cKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL0F1dGhvciAoYW5vbnltb3VzKSAvQ3JlYXRpb25EYXRlIChEOjIwMjYwODE3MTAzNzAwKzAwJzAwJykgL0NyZWF0b3IgKGFub255bW91cykgL0tleXdvcmRzICgpIC9Nb2REYXRlIChEOjIwMjYwODE3MTAzNzAwKzAwJzAwJykgL1Byb2R1Y2VyIChSZXBvcnRMYWIgUERGIExpYnJhcnkgLSBcKG9wZW5zb3VyY2VcKSkgCiAgL1N1YmplY3QgKHVuc3BlY2lmaWVkKSAvVGl0bGUgKHVudGl0bGVkKSAvVHJhcHBlZCAvRmFsc2UKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL0NvdW50IDEgL0tpZHMgWyA0IDAgUiBdIC9UeXBlIC9QYWdlcwo+PgplbmRvYmoKOCAwIG9iago8PAovRmlsdGVyIFsgL0FTQ0lJODVEZWNvZGUgL0ZsYXRlRGVjb2RlIF0gL0xlbmd0aCAyODEKPj4Kc3RyZWFtCkdhdD1kOy89JDYmOzhzPiglWiotaXBGXWlpaE0mPyVeXGRbNUIrYV9VTCNMLnFZU2ZZOG8wSjJFYztRLGNGNWwmJkVjUl8/VDkwPiRwRnFCXytXLS8oa08sW2tEbjBVPW4wJzFQIik+ZiZJQl5MSi91NS0wMFJqUWtxVE1uIjBdUFNDQyMyVihzI2BLU0NBKkttMHNpLlNGNmVgUl9QQk1xK3JtUFdQbmdKS1RZLjxtTW00SWFCUS0hT1dGIzAsMC1SZmNMK1B0Nk5xT2FicWYxMGgpVCtQSmltb3ElWSpuPWE0IiI7Xi8rcXE7OGFiakVsIVw5Rlw8bi4/cmhdYzUyJ0kuMzViSnAiJVltX0FvcGNKR182dH4+ZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgOQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwNjEgMDAwMDAgbiAKMDAwMDAwMDEwMiAwMDAwMCBuIAowMDAwMDAwMjA5IDAwMDAwIG4gCjAwMDAwMDAzMjEgMDAwMDAgbiAKMDAwMDAwMDUyNCAwMDAwMCBuIAowMDAwMDAwNTkyIDAwMDAwIG4gCjAwMDAwMDA4NTMgMDAwMDAgbiAKMDAwMDAwMDkxMiAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9JRCAKWzw0NDZmNTNlZjY4MTdkODIxODAyZTM3ZDJhYTk4ZDFiMj48NDQ2ZjUzZWY2ODE3ZDgyMTgwMmUzN2QyYWE5OGQxYjI+XQolIFJlcG9ydExhYiBnZW5lcmF0ZWQgUERGIGRvY3VtZW50IC0tIGRpZ2VzdCAob3BlbnNvdXJjZSkKCi9JbmZvIDYgMCBSCi9Sb290IDUgMCBSCi9TaXplIDkKPj4Kc3RhcnR4cmVmCjEyODMKJSVFT0YK";

const shuffledSingleColumnPdfBase64 = "JVBERi0xLjMKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMSAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0NvbnRlbnRzIDcgMCBSIC9NZWRpYUJveCBbIDAgMCA1OTUuMjc1NiA4NDEuODg5OCBdIC9QYXJlbnQgNiAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKNCAwIG9iago8PAovUGFnZU1vZGUgL1VzZU5vbmUgL1BhZ2VzIDYgMCBSIC9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9BdXRob3IgKGFub255bW91cykgL0NyZWF0aW9uRGF0ZSAoRDoyMDI2MDkxNjA5MzE1NyswMCcwMCcpIC9DcmVhdG9yIChhbm9ueW1vdXMpIC9LZXl3b3JkcyAoKSAvTW9kRGF0ZSAoRDoyMDI2MDkxNjA5MzE1NyswMCcwMCcpIC9Qcm9kdWNlciAoUmVwb3J0TGFiIFBERiBMaWJyYXJ5IC0gXChvcGVuc291cmNlXCkpIAogIC9TdWJqZWN0ICh1bnNwZWNpZmllZCkgL1RpdGxlICh1bnRpdGxlZCkgL1RyYXBwZWQgL0ZhbHNlCj4+CmVuZG9iago2IDAgb2JqCjw8Ci9Db3VudCAxIC9LaWRzIFsgMyAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL0ZpbHRlciBbIC9BU0NJSTg1RGVjb2RlIC9GbGF0ZURlY29kZSBdIC9MZW5ndGggMTQ5Cj4+CnN0cmVhbQpHYXMzKzBhYFMhJSMqWnM7blIuWWZNLXNtW0xTNj83TVtnPiYxZVUwSipXYWMkN2daQWlRS1E/MzUiXioiaGBnQzBOX11qMy5MKkY3QmUmb3E0bzI7PHRLMmViRShJOSJcaURpPUVdSDdUZj0yc21MUDJfT3EtISVTU0JqJ3I9NDhTOmokZUBhSkZjKSInJFd0LmZ+PmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDgKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDYxIDAwMDAwIG4gCjAwMDAwMDAwOTIgMDAwMDAgbiAKMDAwMDAwMDE5OSAwMDAwMCBuIAowMDAwMDAwNDAyIDAwMDAwIG4gCjAwMDAwMDA0NzAgMDAwMDAgbiAKMDAwMDAwMDczMSAwMDAwMCBuIAowMDAwMDAwNzkwIDAwMDAwIG4gCnRyYWlsZXIKPDwKL0lEIApbPDdmZjU2MjZjYmRmNTUyY2RjZWRhMTlhYWU3NzMwYTRmPjw3ZmY1NjI2Y2JkZjU1MmNkY2VkYTE5YWFlNzczMGE0Zj5dCiUgUmVwb3J0TGFiIGdlbmVyYXRlZCBQREYgZG9jdW1lbnQgLS0gZGlnZXN0IChvcGVuc291cmNlKQoKL0luZm8gNSAwIFIKL1Jvb3QgNCAwIFIKL1NpemUgOAo+PgpzdGFydHhyZWYKMTAyOQolJUVPRgo=";


describe("PDF menu extractor", () => {
  it("keeps same-name dishes separate by section and price", () => {
    const items = extractMenuItemsFromPdfLines([
      "PRIMI PIATTI",
      "Pasta carbonara 260",
      "Guanciale, pecorino og egg",
      "BAMBINI For barn opp til 12 år",
      "Pasta carbonara h, m, e 125",
      "Mild carbonara for barn",
    ]);

    const carbonara = items.filter((item) => item.normalizedName === "pasta carbonara");
    expect(carbonara).toHaveLength(2);
    expect(carbonara.map((item) => [item.sectionName, item.priceMinor])).toEqual([
      ["PRIMI PIATTI", 26000],
      ["BAMBINI", 12500],
    ]);
    expect(carbonara.every((item) => (item.priceKind ?? "exact") === "exact")).toBe(true);
    expect(carbonara.every((item) => (item.priceMaxMinor ?? null) === null)).toBe(true);
    expect(carbonara[0]?.sourceKey).not.toBe(carbonara[1]?.sourceKey);
    expect(carbonara.every((item) => item.extractionMethod === "pdf_text")).toBe(true);
  });

  it("keeps two observed PDF prices on one dish instead of inventing one exact price", () => {
    const items = extractMenuItemsFromPdfLines([
      "SIGNATUR",
      "BAMBUS SIGNATUR 285 / 309",
      "Biff, grønnsaker og saus",
      "KAENG PHET GAI",
      "195 / 229",
      "Kylling i rød curry",
    ]);

    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({
      name: "BAMBUS SIGNATUR",
      priceMinor: 28500,
      priceKind: "multiple",
      priceMaxMinor: 30900,
      description: "Biff, grønnsaker og saus",
    });
    expect(items[1]).toMatchObject({
      name: "KAENG PHET GAI",
      priceMinor: 19500,
      priceKind: "multiple",
      priceMaxMinor: 22900,
      description: "Kylling i rød curry",
    });
    expect(items[0]?.sourceExcerpt).toContain("285 / 309 NOK");
  });

  it("accepts an explicit low inline price marker but rejects the same bare low number", () => {
    const marked = extractMenuItemsFromPdfLines([
      "ALL DAY",
      "BISCOTTO 35,-",
      "AVOCADO TOAST 279,-",
      "TOAST SKAGEN 335,-",
      "STEAK TARTARE 345,-",
    ]);
    expect(marked.map((item) => [item.name, item.priceMinor])).toContainEqual([
      "BISCOTTO",
      3500,
    ]);

    const bare = extractMenuItemsFromPdfLines([
      "ALL DAY",
      "BISCOTTO 35",
      "AVOCADO TOAST 279",
      "TOAST SKAGEN 335",
      "STEAK TARTARE 345",
    ]);
    expect(bare.some((item) => item.name === "BISCOTTO")).toBe(false);
  });

  it("parses punctuated multiple prices without leaving the first price in the dish name", () => {
    const items = extractMenuItemsFromPdfLines([
      "EVENING",
      "3 OR 6 OYSTERS 190,- / 380,-",
    ]);

    expect(PDF_EXTRACTOR_VERSION).toBe("pdf-text-v15");
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      name: "3 OR 6 OYSTERS",
      priceMinor: 19000,
      priceKind: "multiple",
      priceMaxMinor: 38000,
    });
  });

  it("binds a standalone price after descriptive copy to the preceding dish title", () => {
    const items = extractMenuItemsFromPdfLines([
      "KALDE MEZE",
      "LABNE BIL TOUM",
      "Libanesisk kremost med hvitløk, mynte og olivenolje.",
      "129,-",
      "TABBOLISALAT",
      "Hakket persille, tomater, løk, bulgur, sitron og olivenolje.",
      "139,-",
    ]);

    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["LABNE BIL TOUM", 12900],
      ["TABBOLISALAT", 13900],
    ]);
    expect(items[0]).toMatchObject({
      sectionName: "KALDE MEZE",
      description: "Libanesisk kremost med hvitløk, mynte og olivenolje.",
    });
    expect(items[1]?.description).toContain("Hakket persille");
  });

  it("does not misclassify a long dish title containing with as descriptive copy", () => {
    const items = extractMenuItemsFromPdfLines([
      "Chevresalat med variasjon av beter",
      "Goat cheese salad with a variation of beets",
      "385,-",
    ]);

    expect(items.map((item) => [item.name, item.priceMinor])).toContainEqual([
      "Goat cheese salad with a variation of beets",
      38500,
    ]);
    expect(items.some((item) => item.name === "Chevresalat med variasjon av beter")).toBe(false);
  });

  it("does not bind a standalone price across a PDF page boundary", () => {
    const items = extractMenuItemsFromPdfPages([["LUNSJ"], ["230"]]);

    expect(items).toEqual([]);
  });

  it("uses visual order for a clearly shuffled single-column PDF page", async () => {
    const bytes = new Uint8Array(
      Buffer.from(shuffledSingleColumnPdfBase64, "base64"),
    );
    const extracted = await extractPdfMenu(bytes);

    expect(extracted.items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["GRILLET BLOMKAL", 18500],
      ["BRISSEL", 28500],
    ]);
  });

  it("reconstructs a wrapped dish name when the first line ends with a conjunction", () => {
    const items = extractMenuItemsFromPdfLines([
      "ALL DAY",
      "MACAROONS &",
      "CHOCOLATE TRUFFLES 145,-",
    ]);

    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      name: "MACAROONS & CHOCOLATE TRUFFLES",
      priceMinor: 14500,
      priceKind: "exact",
      priceMaxMinor: null,
    });
  });

  it("reconstructs strictly qualified wrapped dish names without publishing fragments", () => {
    const items = extractMenuItemsFromPdfLines([
      "MAKI",
      "SPICY 125 / 135",
      "TEMPURA SCAMPI",
      "Fritert scampi, avokado og chilimajones",
      "VEGETAR 119 / 129",
      "VÅRRULLER 4 stk.",
      "Grønnsaker og sweet chili",
    ]);

    expect(items.map((item) => item.normalizedName)).toEqual([
      "spicy tempura scampi",
      "vegetar vårruller 4 stk",
    ]);
    expect(items[0]).toMatchObject({
      name: "SPICY TEMPURA SCAMPI",
      priceMinor: 12500,
      priceKind: "multiple",
      priceMaxMinor: 13500,
      description: "Fritert scampi, avokado og chilimajones",
    });
    expect(items[1]).toMatchObject({
      name: "VEGETAR VÅRRULLER 4 stk.",
      priceMinor: 11900,
      priceKind: "multiple",
      priceMaxMinor: 12900,
      description: "Grønnsaker og sweet chili",
    });
  });

  it("does not merge an ordinary one-word dish into the following section", () => {
    const items = extractMenuItemsFromPdfLines([
      "DESSERT",
      "TIRAMISU 149",
      "Kremet mascarpone og kaffe",
      "KAKER",
      "PANNA COTTA 159",
      "Vanilje og bær",
    ]);

    expect(items.map((item) => item.name)).toEqual(["TIRAMISU", "PANNA COTTA"]);
    expect(items[0]?.description).toBe("Kremet mascarpone og kaffe");
  });

  it("fails closed on a qualifier fragment when no safe continuation follows", () => {
    const items = extractMenuItemsFromPdfLines([
      "MAKI",
      "SPICY 125 / 135",
      "129 / 139",
      "TEMPURA SCAMPI",
    ]);
    expect(items.some((item) => item.normalizedName === "spicy")).toBe(false);
  });

  it("collapses identical duplicate prices back to exact semantics", () => {
    const items = extractMenuItemsFromPdfLines(["SIGNATUR", "BAMBUS SIGNATUR 285 / 285"]);
    expect(items[0]).toMatchObject({
      priceMinor: 28500,
      priceKind: "exact",
      priceMaxMinor: null,
    });
  });

  it("stops descriptions before the next standalone name and price candidate", () => {
    const items = extractMenuItemsFromPdfLines([
      "PRIMI PIATTI",
      "Pasta carbonara",
      "260",
      "Guanciale, pecorino og egg",
      "Pasta di manzo",
      "299",
      "Tagliatelle med indrefilet",
      "BAMBINI For barn opp til 12 år",
      "Pasta carbonara h, m, e",
      "125",
      "Pasta pollo ubriaco h, m",
      "125",
    ]);

    const carbonara = items.filter((item) => item.normalizedName === "pasta carbonara");
    expect(carbonara).toHaveLength(2);
    expect(carbonara[0]).toMatchObject({
      sectionName: "PRIMI PIATTI",
      priceMinor: 26000,
      description: "Guanciale, pecorino og egg",
    });
    expect(carbonara[0]?.description).not.toContain("Pasta di manzo");
    expect(carbonara[1]).toMatchObject({
      sectionName: "BAMBINI",
      priceMinor: 12500,
      description: null,
    });
  });

  it("strips repeated dotted PDF leaders while preserving the dish and exact price", () => {
    const items = extractMenuItemsFromPdfLines([
      "SNACKS",
      "GUACAMOLE CLÁSICO . . . . . . . . . . . . 189,-",
      "Most avokado med lime og koriander",
      "TACO DE PESCADO ................. 189,-",
    ]);

    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["GUACAMOLE CLÁSICO", 18900],
      ["TACO DE PESCADO", 18900],
    ]);
  });

  it("rejects allergen-only, size-grid, set-menu and copyright metadata without hiding real dishes", () => {
    const items = extractMenuItemsFromPdfLines([
      "HOVEDRETTER",
      "BRISKET NORTEÑO",
      "E,",
      "449,-",
      "COYO BLÅSKJELL",
      "500gr 349,- 800gr 469,-",
      "Set menu 850,-",
      "Med forebehold om prisendringer og skrivefeil © Coyo 2026",
      "DESSERT",
      "CHURROS . . . . . . . 189,-",
    ]);

    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([["CHURROS", 18900]]);
    expect(items.some((item) => /^(?:E,|Set menu|500gr|Med forebehold)/iu.test(item.name))).toBe(false);
  });

  it("joins a comma-ended PDF dish name with one lowercase continuation line", () => {
    const items = extractMenuItemsFromPdfLines([
      "SMÅRETTER / SMALLER COURSES",
      "Sweetbreads with pickled lingonberries,",
      "dried reindeer heart and gribiche sauce",
      "(H, E, M)",
      "285",
    ]);

    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      [
        "Sweetbreads with pickled lingonberries, dried reindeer heart and gribiche sauce",
        28500,
      ],
    ]);
  });
  it("skips parenthetical allergen notes between a dish name and standalone price", () => {
    const items = extractMenuItemsFromPdfLines([
      "DANSKE SMØRREBRØD",
      "Smoked eel, soft boiled egg",
      "(H, R, BY, E. F, M) - kan lages glutenfri",
      "230",
    ]);

    expect(items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Smoked eel, soft boiled egg", 23000],
    ]);
  });

  it("does not publish a quantity-only label as a dish name", () => {
    const items = extractMenuItemsFromPdfLines([
      "DESSERT",
      "Petit four",
      "3 stk / 112",
    ]);

    expect(items.some((item) => item.name === "3 stk /")).toBe(false);
  });

  it("uses PDF.js text extraction without OCR", async () => {
    const bytes = new Uint8Array(Buffer.from(syntheticPdfBase64, "base64"));
    const extracted = await extractPdfMenu(bytes);
    expect(extracted.pageCount).toBe(1);
    expect(extracted.method).toBe("pdf_text");
    expect(extracted.visibleText).toContain("PRIMI PIATTI");
    expect(extracted.visibleText).toContain("Pasta carbonara");
    expect(extracted.items.filter((item) => item.normalizedName === "pasta carbonara")).toHaveLength(2);
  });

  it("rejects non-PDF bytes before parsing", async () => {
    await expect(extractPdfMenu(new TextEncoder().encode("<html>not pdf</html>"))).rejects.toThrow(
      "PDF source did not start with a PDF signature",
    );
  });
});
