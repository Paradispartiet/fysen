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

    expect(OPENING_HOURS_SOURCE_EXTRACTOR_VERSION).toBe("hours-visible-v14");
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

  it("normalizes decorative and split opening-hours markers before applying explicit scope hints", () => {
    const extracted = extractCanonicalOpeningHours(
      `
        <html><body>
          <p>* * * ÅPNINGSTIDER CUE</p>
          <p>Mandag - Søndag | 15:00 - 01:00</p>
          <div>
            <p>ÅPNINGSTIDER</p>
            <p>PIZZERIA</p>
            <p>Mandag - Søndag | 18:00 - 23:30</p>
          </div>
        </body></html>
      `,
      ["Pizzeria"],
    );

    expect(extracted.intervals).toHaveLength(7);
    expect(extracted.intervals.every((item) => item.opensAt === "18:00" && item.closesAt === "23:30")).toBe(true);
    expect(extracted.visibleText).toContain("ÅPNINGSTIDER CUE");
    expect(extracted.visibleText).toContain("ÅPNINGSTIDER PIZZERIA");
  });

  it("applies one explicit global absolute kitchen close to the parsed weekday schedule", () => {
    const extracted = extractCanonicalOpeningHours(`
      <html><body>
        <p>Man - Lør 12:00 - 22:00</p>
        <p>Søn 14:00 - 22:00</p>
        <p>kjøkkenet stenger 21:00</p>
      </body></html>
    `);

    expect(extracted.intervals).toHaveLength(7);
    expect(extracted.intervals.slice(0, 6).every((item) => item.opensAt === "12:00")).toBe(true);
    expect(extracted.intervals[6]).toMatchObject({ opensAt: "14:00", closesAt: "21:00" });
    expect(extracted.intervals.every((item) => item.closesAt === "21:00")).toBe(true);
    expect(extracted.sourceExcerpt).toContain("kjøkkenet stenger 21:00");
  });

  it("does not extend a day that already closes before the global kitchen close", () => {
    const extracted = extractCanonicalOpeningHours(`
      <html><body>
        <p>Mandag-Fredag: 11:00-20:00</p>
        <p>Lørdag-Søndag: 12:00-22:00</p>
        <p>Kjøkkenet stenger 21:00</p>
      </body></html>
    `);

    expect(extracted.intervals.slice(0, 5).every((item) => item.closesAt === "20:00")).toBe(true);
    expect(extracted.intervals.slice(5).every((item) => item.closesAt === "21:00")).toBe(true);
  });

  it("fails closed on conflicting global absolute kitchen-close times", () => {
    expect(() =>
      extractCanonicalOpeningHours(`
        <html><body>
          <p>Mandag-Søndag: 12:00-22:00</p>
          <p>Kjøkkenet stenger 21:00</p>
          <p>Kitchen closes at 20:30</p>
        </body></html>
      `),
    ).toThrow(OpeningHoursExtractionError);
  });

  it("normalizes common English weekday abbreviations without changing the canonical schedule grammar", () => {
    const extracted = extractCanonicalOpeningHours(`
      <html><body>
        <h2>Opening Hours</h2>
        <p>Mon–Thu: 11:00–20:00</p>
        <p>Fri: 11:00–22:00</p>
        <p>Sat: 12:00–22:00</p>
        <p>Sun: 12:00–20:00</p>
      </body></html>
    `);

    expect(extracted.intervals).toEqual([
      { isoWeekday: 1, opensAt: "11:00", closesAt: "20:00", closesNextDay: false },
      { isoWeekday: 2, opensAt: "11:00", closesAt: "20:00", closesNextDay: false },
      { isoWeekday: 3, opensAt: "11:00", closesAt: "20:00", closesNextDay: false },
      { isoWeekday: 4, opensAt: "11:00", closesAt: "20:00", closesNextDay: false },
      { isoWeekday: 5, opensAt: "11:00", closesAt: "22:00", closesNextDay: false },
      { isoWeekday: 6, opensAt: "12:00", closesAt: "22:00", closesNextDay: false },
      { isoWeekday: 7, opensAt: "12:00", closesAt: "20:00", closesNextDay: false },
    ]);
  });

  it("supports dotted and alternate English weekday abbreviations", () => {
    const extracted = extractCanonicalOpeningHours(`
      <html><body>
        <p>Mon.-Thurs.: 10:00-19:00</p>
        <p>Fri.-Sun.: 10:00-20:00</p>
      </body></html>
    `);

    expect(extracted.intervals).toHaveLength(7);
    expect(extracted.intervals.slice(0, 4).every((item) => item.closesAt === "19:00")).toBe(true);
    expect(extracted.intervals.slice(4).every((item) => item.closesAt === "20:00")).toBe(true);
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
