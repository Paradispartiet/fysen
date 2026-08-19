import { describe, expect, it } from "vitest";
import { extractCanonicalOpeningHours } from "./opening-hours-source-extractor.js";

describe("grouped weekday opening-hours normalization", () => {
  it("expands consecutive comma-and weekday lists and word time ranges", () => {
    const extracted = extractCanonicalOpeningHours(`
      <html><body>
        <p>Kitchen Open: Tuesday, Wednesday and Thursday 07:00 PM to 10:00 PM | Friday, Saturday and Sunday: 03:00 PM to 10:00 PM</p>
      </body></html>
    `);

    expect(extracted.intervals).toEqual([
      { isoWeekday: 2, opensAt: "19:00", closesAt: "22:00", closesNextDay: false },
      { isoWeekday: 3, opensAt: "19:00", closesAt: "22:00", closesNextDay: false },
      { isoWeekday: 4, opensAt: "19:00", closesAt: "22:00", closesNextDay: false },
      { isoWeekday: 5, opensAt: "15:00", closesAt: "22:00", closesNextDay: false },
      { isoWeekday: 6, opensAt: "15:00", closesAt: "22:00", closesNextDay: false },
      { isoWeekday: 7, opensAt: "15:00", closesAt: "22:00", closesNextDay: false },
    ]);
  });

  it("does not collapse a non-consecutive weekday list into a range", () => {
    const extracted = extractCanonicalOpeningHours(`
      <html><body>
        <p>Kitchen: Monday, Wednesday and Friday 17:00 to 20:00</p>
      </body></html>
    `);

    expect(extracted.intervals.some((item) => item.isoWeekday === 2 || item.isoWeekday === 4)).toBe(false);
  });
});
