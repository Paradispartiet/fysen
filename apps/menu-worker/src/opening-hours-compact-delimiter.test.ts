import { describe, expect, it } from "vitest";
import { OpeningHoursExtractionError, extractKitchenOpeningHours } from "./opening-hours-extractor.js";

describe("opening-hours compact delimiter spacing", () => {
  it("parses colon-delimited schedules when HTML removes whitespace after the colon", () => {
    const extracted = extractKitchenOpeningHours(`
      <section>
        <h2>Åpningstider</h2>
        <p>Mandag - fredag:kl. 10 - 21</p>
        <p>Lørdag:kl. 09 - 19</p>
        <p>Søndag:kl. 13 - 19</p>
      </section>
    `);

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

  it("keeps whitespace mandatory when there is no explicit colon or pipe delimiter", () => {
    expect(() =>
      extractKitchenOpeningHours(`
        <h2>Åpningstider</h2>
        <p>Mandagkl. 10 - 21</p>
      `),
    ).toThrow(OpeningHoursExtractionError);
  });

  it("continues to accept ordinary whitespace-separated schedules without a delimiter", () => {
    const extracted = extractKitchenOpeningHours(`
      <h2>Åpningstider</h2>
      <p>Mandag 10 - 21</p>
    `);
    expect(extracted.intervals).toEqual([
      { isoWeekday: 1, opensAt: "10:00", closesAt: "21:00", closesNextDay: false },
    ]);
  });
});
