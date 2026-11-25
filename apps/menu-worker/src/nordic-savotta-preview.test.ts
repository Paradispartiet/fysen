import { describe, expect, it } from "vitest";
import { extractSavottaHtmlPreview, extractSavottaPreview } from "./nordic-savotta-preview.js";

const text = [
  "Perinnemenu", "Testikeitto L,G 99,00", "Savotan Ruokalista", "Eturuuat",
  "Testikeitto L,(G),(VE) 7,90/12,50", "Talon leipä L 3,50/hlö",
  "Varsinaiset", "Testipata L,G 29,90", "(Tarkista saatavuus henkilökunnalta)",
  "Jälkimakiat", "Testijälkiruoka 8,50", "A la carte (PDF)", "Testipata 99,00",
].join("\n");
const names = ["Testikeitto", "Talon leipä", "Testipata", "Testijälkiruoka"];

describe("Savotta source-scoped preview", () => {
  it("extracts local prices, portion alternatives and caveats without publishing", () => {
    const result = extractSavottaPreview(text, names);
    expect(result.status).toBe("review-required");
    expect(result.items.map((item) => item.priceMinor)).toEqual([790, 350, 2990, 850]);
    expect(result.items.every((item) => item.currency === "EUR")).toBe(true);
    expect(result.items[0]?.priceMaxMinor).toBe(1250);
    expect(result.items[1]?.perPerson).toBe(true);
    expect(result.items[2]?.requiresAvailabilityConfirmation).toBe(true);
    expect(result.items[3]?.section).toBe("Jälkimakiat");
  });
  it("stops on missing, conflicting, unscoped or incorrectly formatted entries", () => {
    expect(() => extractSavottaPreview(text.replace("29,90", "29,90 NOK"), names)).toThrow(/missing priced rows/u);
    expect(() => extractSavottaPreview(text.replace("Savotan Ruokalista", "Other menu"), names)).toThrow(/scope/u);
    expect(() => extractSavottaPreview(text.replace("Testipata L,G 29,90", "Testipata L,G 29,90\nTestipata L,G 30,90"), names)).toThrow(/duplicate/u);
    expect(() => extractSavottaPreview(text, [...names, "Missing dish"])).toThrow(/missing/u);
  });
  it("extracts real HTML text layout rather than hidden scripts", () => {
    const html = "<html><body><script>Testipata 99,00</script>" +
      text.split("\n").map((line) => "<p>" + line + "</p>").join("") + "</body></html>";
    expect(extractSavottaHtmlPreview(html, names).items[2]?.priceMinor).toBe(2990);
  });
});
