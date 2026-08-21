import { describe, expect, it } from "vitest";
import { OpeningHoursExtractionError } from "./opening-hours-extractor.js";
import { extractCanonicalOpeningHours } from "./opening-hours-source-extractor.js";
import {
  normalizeRedundantAbsoluteKitchenCloseHtml,
  OPENING_HOURS_REDUNDANT_CUTOFF_NORMALIZER_VERSION,
} from "./opening-hours-redundant-cutoff-normalizer.js";

describe("redundant absolute kitchen cutoff normalization", () => {
  it("canonicalizes repeated identical cutoffs only inside the selected location scope", () => {
    const html = `
      <html><body>
        <p>Åpningstider Fredensborg:Mandag - Lørdag: 13:00 - 22:30 (Kjøkken til 21:00) Søndag: 13:00 - 21:30 (Kjøkken til 20:00)</p>
        <p>Åpningstider Storgata:</p>
        <p>Søndag til Torsdag: 12:00 - 22.00 (Kjøkken til 21:00)</p>
        <p>Fredag - Lørdag: 12:00 - 23.00(Kjøkken til 21:00)</p>
      </body></html>
    `;
    const normalized = normalizeRedundantAbsoluteKitchenCloseHtml(html, [
      "Storgata",
    ]);

    expect(OPENING_HOURS_REDUNDANT_CUTOFF_NORMALIZER_VERSION).toBe(
      "redundant-absolute-v4",
    );
    expect(normalized).toContain("Kjøkken til 20:00");
    expect(normalized.match(/Kjøkken til 21:00/gu)).toHaveLength(1);
    const extracted = extractCanonicalOpeningHours(normalized, ["Storgata"]);
    expect(extracted.intervals).toHaveLength(7);
    expect(extracted.intervals.every((item) => item.opensAt === "12:00")).toBe(
      true,
    );
    expect(extracted.intervals.every((item) => item.closesAt === "21:00")).toBe(
      true,
    );
  });

  it("does not hide conflicting cutoffs inside the selected scope", () => {
    const html = `
      <html><body>
        <p>Åpningstider Fredensborg:Mandag-Søndag: 12:00-22:00 (Kjøkken til 19:00)</p>
        <p>Åpningstider Storgata:</p>
        <p>Søndag til Torsdag: 12:00 - 22.00 (Kjøkken til 20:30)</p>
        <p>Fredag - Lørdag: 12:00 - 23.00(Kjøkken til 21:00)</p>
      </body></html>
    `;
    const normalized = normalizeRedundantAbsoluteKitchenCloseHtml(html, [
      "Storgata",
    ]);
    expect(normalized).toBe(html);
    expect(() => extractCanonicalOpeningHours(normalized, ["Storgata"])).toThrow(
      OpeningHoursExtractionError,
    );
  });

  it("does nothing when a scope contains only one absolute cutoff occurrence", () => {
    const html = `
      <html><body>
        <p>Åpningstider Storgata:</p>
        <p>Mandag-Søndag: 12:00-22:00</p>
        <p>Kjøkkenet stenger 21:00</p>
      </body></html>
    `;
    expect(
      normalizeRedundantAbsoluteKitchenCloseHtml(html, ["Storgata"]),
    ).toBe(html);
  });
});
