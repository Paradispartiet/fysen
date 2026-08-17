import { describe, expect, it } from "vitest";
import { OpeningHoursExtractionError, extractKitchenOpeningHours } from "./opening-hours-extractor.js";

describe("opening-hours clock prefixes", () => {
  it("parses explicit Norwegian kl. ranges with whole hours", () => {
    const extracted = extractKitchenOpeningHours(`
      <section>
        <h2>Åpningstider</h2>
        <p>Mandag - fredag: kl. 10 - 21</p>
        <p>Lørdag: kl. 09 - 19</p>
        <p>Søndag: kl. 13 - 19</p>
      </section>
    `);

    expect(extracted.intervals).toHaveLength(7);
    expect(extracted.intervals).toEqual([
      { isoWeekday: 1, opensAt: "10:00", closesAt: "21:00", closesNextDay: false },
      { isoWeekday: 2, opensAt: "10:00", closesAt: "21:00", closesNextDay: false },
      { isoWeekday: 3, opensAt: "10:00", closesAt: "21:00", closesNextDay: false },
      { isoWeekday: 4, opensAt: "10:00", closesAt: "21:00", closesNextDay: false },
      { isoWeekday: 5, opensAt: "10:00", closesAt: "21:00", closesNextDay: false },
      { isoWeekday: 6, opensAt: "09:00", closesAt: "19:00", closesNextDay: false },
      { isoWeekday: 7, opensAt: "13:00", closesAt: "19:00", closesNextDay: false },
    ]);
  });

  it("also accepts klokka and a clock prefix before the closing time", () => {
    const extracted = extractKitchenOpeningHours(`
      <h2>Opening Hours</h2>
      <p>Mandag: klokka 10:30 - kl. 22:15</p>
    `);
    expect(extracted.intervals).toEqual([
      { isoWeekday: 1, opensAt: "10:30", closesAt: "22:15", closesNextDay: false },
    ]);
  });

  it("does not reinterpret unrelated numeric ranges without an explicit weekday schedule", () => {
    expect(() =>
      extractKitchenOpeningHours(`
        <h2>Kontakt</h2>
        <p>Telefon 22 10 21 19</p>
        <p>Prisnivå 100 - 250</p>
        <p>Historie 1998 - 2026</p>
      `),
    ).toThrow(OpeningHoursExtractionError);
  });
});
