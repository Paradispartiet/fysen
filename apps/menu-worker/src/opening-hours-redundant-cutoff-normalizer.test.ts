import { describe, expect, it } from "vitest";
import { OpeningHoursExtractionError } from "./opening-hours-extractor.js";
import { extractCanonicalOpeningHours } from "./opening-hours-source-extractor.js";
import {
  normalizeRedundantAbsoluteKitchenCloseHtml,
  OPENING_HOURS_REDUNDANT_CUTOFF_NORMALIZER_VERSION,
} from "./opening-hours-redundant-cutoff-normalizer.js";

describe("redundant absolute kitchen cutoff normalization", () => {
  it("collapses identical weekday-specific and global cutoffs without changing venue hours", () => {
    const normalized = normalizeRedundantAbsoluteKitchenCloseHtml(`
      <html><body>
        <h2>Åpningstider Storgata</h2>
        <p>Søndag til Torsdag: 12:00 - 22.00 (Kjøkken til 21:00)</p>
        <p>Fredag - Lørdag: 12:00 - 23.00</p>
        <p>(Kjøkken til 21:00)</p>
      </body></html>
    `);

    expect(OPENING_HOURS_REDUNDANT_CUTOFF_NORMALIZER_VERSION).toBe(
      "redundant-absolute-v1",
    );
    const extracted = extractCanonicalOpeningHours(normalized, ["Storgata"]);
    expect(extracted.intervals).toHaveLength(7);
    expect(extracted.intervals.every((item) => item.opensAt === "12:00")).toBe(true);
    expect(extracted.intervals.every((item) => item.closesAt === "21:00")).toBe(true);
  });

  it("does not hide a conflicting weekday-specific cutoff", () => {
    const html = `
      <html><body>
        <h2>Åpningstider Storgata</h2>
        <p>Søndag til Torsdag: 12:00 - 22.00 (Kjøkken til 20:30)</p>
        <p>Fredag - Lørdag: 12:00 - 23.00</p>
        <p>(Kjøkken til 21:00)</p>
      </body></html>
    `;
    const normalized = normalizeRedundantAbsoluteKitchenCloseHtml(html);
    expect(normalized).toBe(html);
    expect(() => extractCanonicalOpeningHours(normalized, ["Storgata"])).toThrow(
      OpeningHoursExtractionError,
    );
  });

  it("does nothing when only a global cutoff is present", () => {
    const html = `
      <html><body>
        <p>Mandag-Søndag: 12:00-22:00</p>
        <p>Kjøkkenet stenger 21:00</p>
      </body></html>
    `;
    expect(normalizeRedundantAbsoluteKitchenCloseHtml(html)).toBe(html);
  });
});
