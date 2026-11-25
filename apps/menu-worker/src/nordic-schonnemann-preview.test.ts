import { describe, expect, it } from "vitest";
import { extractSchonnemannCategory, extractSchonnemannHtmlCategory, mergeSchonnemannCategories } from "./nordic-schonnemann-preview.js";

const url = "https://example.org/category";
const footer = "\nRestaurant Schønnemann\nHauser Plads 16\n1127 København K\n33120785";
const text = "Rødspættefilet\nIllustration without price\nIntroduction\nRødspættefilet\n– beskrivelse\n173\nTartelet/ter\n– beskrivelse\n118/173" + footer;

describe("Schønnemann seasonal source preview", () => {
  it("uses priced rows, ignores illustrated duplicates and preserves Danish portions", () => {
    const names = ["Rødspættefilet", "Tartelet/ter"];
    const result = extractSchonnemannCategory(text, names, url);
    expect(result.map((item) => item.priceMinor)).toEqual([17300, 11800]);
    expect(result[1]?.priceMaxMinor).toBe(17300);
    expect(result.every((item) => item.currency === "DKK")).toBe(true);
    const html = "<html><body>" + text.split("\n").map((line) => "<p>" + line + "</p>").join("") + "</body></html>";
    expect(extractSchonnemannHtmlCategory(html, names, url)).toEqual(result);
  });
  it("rejects missing, extra or ambiguous prices and changed identity", () => {
    expect(() => extractSchonnemannCategory(text.replace("173\nTartelet", "Tartelet"), ["Rødspættefilet", "Tartelet/ter"], url)).toThrow();
    expect(() => extractSchonnemannCategory(text.replace(footer, "\nUnknown\n99" + footer), ["Rødspættefilet", "Tartelet/ter"], url)).toThrow(/Unmapped/u);
    expect(() => extractSchonnemannCategory(text.replace("Hauser Plads 16", "Other address"), ["Rødspættefilet", "Tartelet/ter"], url)).toThrow(/identity/u);
    expect(() => extractSchonnemannCategory("Other overview" + footer, [], url)).toThrow(/overview/u);
    expect(extractSchonnemannCategory("Julen er traditionernes tid\nOverview\n138 - 243" + footer, [], url)).toEqual([]);
  });
  it("deduplicates equal prices without losing source links and rejects conflicts", () => {
    const a = extractSchonnemannCategory("Madam Schønnemann\n178" + footer, ["Madam Schønnemann"], url);
    const b = extractSchonnemannCategory("Madam Schønnemann\n178" + footer, ["Madam Schønnemann"], url + "/other");
    expect(mergeSchonnemannCategories([a, b])[0]?.sourceUrls).toEqual([url, url + "/other"]);
    const c = extractSchonnemannCategory("Madam Schønnemann\n179" + footer, ["Madam Schønnemann"], url);
    expect(() => mergeSchonnemannCategories([a, c])).toThrow(/Conflicting/u);
  });
});
