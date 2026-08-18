import { describe, expect, it } from "vitest";
import { OpeningHoursExtractionError } from "./opening-hours-extractor.js";
import {
  extractCanonicalOpeningHours,
  OPENING_HOURS_SOURCE_EXTRACTOR_VERSION,
} from "./opening-hours-source-extractor.js";

describe("canonical opening-hours source extractor", () => {
  it("derives a relative kitchen cutoff from each weekday closing time and normalizes plural weekdays", () => {
    const extracted = extractCanonicalOpeningHours(`
      <html><body>
        <p>Man til tors: 11:30-21:00</p>
        <p>Fredager: 11:30-22:00</p>
        <p>Lørdager: 12:00-22:00</p>
        <p>Søndager: 14:00-21:00</p>
        <p>Kjøkkenet stenger 30 min før stengetid</p>
      </body></html>
    `);

    expect(OPENING_HOURS_SOURCE_EXTRACTOR_VERSION).toBe("hours-visible-v10");
    expect(extracted.intervals).toEqual([
      { isoWeekday: 1, opensAt: "11:30", closesAt: "20:30", closesNextDay: false },
      { isoWeekday: 2, opensAt: "11:30", closesAt: "20:30", closesNextDay: false },
      { isoWeekday: 3, opensAt: "11:30", closesAt: "20:30", closesNextDay: false },
      { isoWeekday: 4, opensAt: "11:30", closesAt: "20:30", closesNextDay: false },
      { isoWeekday: 5, opensAt: "11:30", closesAt: "21:30", closesNextDay: false },
      { isoWeekday: 6, opensAt: "12:00", closesAt: "21:30", closesNextDay: false },
      { isoWeekday: 7, opensAt: "14:00", closesAt: "20:30", closesNextDay: false },
    ]);
    expect(extracted.sourceExcerpt).toContain("Kjøkkenet stenger 30 min før stengetid");
  });

  it("supports the equivalent English relative-close wording", () => {
    const extracted = extractCanonicalOpeningHours(`
      <html><body>
        <p>Monday-Friday: 11:00-23:00</p>
        <p>Saturday-Sunday: 12:00-22:00</p>
        <p>Kitchen closes 45 minutes before closing</p>
      </body></html>
    `);

    expect(extracted.intervals[0]).toMatchObject({ opensAt: "11:00", closesAt: "22:15" });
    expect(extracted.intervals[6]).toMatchObject({ opensAt: "12:00", closesAt: "21:15" });
  });

  it("keeps identical repeated relative-close notices deterministic", () => {
    const extracted = extractCanonicalOpeningHours(`
      <html><body>
        <p>Mandag-Søndag: 12:00-21:00</p>
        <p>Kjøkkenet stenger 30 min før stengetid</p>
        <p>Kjøkkenet stenger 30 min før stengetid</p>
      </body></html>
    `);

    expect(extracted.intervals).toHaveLength(7);
    expect(extracted.intervals.every((item) => item.closesAt === "20:30")).toBe(true);
  });

  it("fails closed on conflicting relative offsets", () => {
    expect(() =>
      extractCanonicalOpeningHours(`
        <html><body>
          <p>Mandag-Søndag: 12:00-21:00</p>
          <p>Kjøkkenet stenger 30 min før stengetid</p>
          <p>Kjøkkenet stenger 45 min før stengetid</p>
        </body></html>
      `),
    ).toThrow(OpeningHoursExtractionError);
  });

  it("fails closed when relative and absolute kitchen-close regimes coexist", () => {
    expect(() =>
      extractCanonicalOpeningHours(`
        <html><body>
          <p>Mandag-Søndag: 12:00-22:00</p>
          <p>Kjøkkenet stenger 30 min før stengetid</p>
          <p>Kjøkkenet stenger 21:00 mandag-søndag</p>
        </body></html>
      `),
    ).toThrow(OpeningHoursExtractionError);
  });
});
