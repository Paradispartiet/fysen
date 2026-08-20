import { describe, expect, it } from "vitest";
import { OpeningHoursExtractionError } from "./opening-hours-extractor.js";
import { extractCanonicalOpeningHours } from "./opening-hours-source-extractor.js";

const multiLocationHours = `
  <html><body>
    <h2>Åpningstider Fredensborg</h2>
    <p>Mandag-Lørdag: 13:00-22:30</p>
    <p>Kjøkken til 21:00</p>
    <p>Søndag: 13:00-21:30</p>
    <p>Kjøkken til 20:00</p>

    <h2>Åpningstider Storgata</h2>
    <p>Søndag-Torsdag: 12:00-22:00</p>
    <p>Kjøkken til 21:00</p>
    <p>Fredag-Lørdag: 12:00-23:00</p>
    <p>Kjøkken til 21:00</p>
  </body></html>
`;

describe("opening-hours source scoping", () => {
  it("scopes absolute kitchen cutoffs before analyzing a hinted location", () => {
    const extracted = extractCanonicalOpeningHours(multiLocationHours, ["Storgata"]);

    expect(extracted.intervals).toHaveLength(7);
    expect(extracted.intervals.every((item) => item.opensAt === "12:00")).toBe(true);
    expect(extracted.intervals.every((item) => item.closesAt === "21:00")).toBe(true);
    expect(extracted.sourceExcerpt).toContain("Kjøkken til 21:00");
  });

  it("still fails closed when conflicting location cutoffs have no unique scope hint", () => {
    try {
      extractCanonicalOpeningHours(multiLocationHours);
      throw new Error("Expected opening-hours extraction to fail closed");
    } catch (error) {
      expect(error).toBeInstanceOf(OpeningHoursExtractionError);
      expect((error as OpeningHoursExtractionError).code).toBe("AMBIGUOUS_ABSOLUTE_KITCHEN_CUTOFF");
    }
  });
});
