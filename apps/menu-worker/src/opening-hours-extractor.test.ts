import { describe, expect, it } from "vitest";
import { OpeningHoursExtractionError, extractKitchenOpeningHours } from "./opening-hours-extractor.js";

describe("opening hours extractor", () => {
  it("uses an explicit kitchen close when the restaurant says late", () => {
    const extracted = extractKitchenOpeningHours(`
      <html><body>
        <h2>Hours</h2>
        <p>Dinner Tuesday - Saturday 17.00 - late (*kitchen closes at 21.30)</p>
      </body></html>
    `);

    expect(extracted.intervals).toEqual([
      { isoWeekday: 2, opensAt: "17:00", closesAt: "21:30", closesNextDay: false },
      { isoWeekday: 3, opensAt: "17:00", closesAt: "21:30", closesNextDay: false },
      { isoWeekday: 4, opensAt: "17:00", closesAt: "21:30", closesNextDay: false },
      { isoWeekday: 5, opensAt: "17:00", closesAt: "21:30", closesNextDay: false },
      { isoWeekday: 6, opensAt: "17:00", closesAt: "21:30", closesNextDay: false },
    ]);
  });

  it("supports standard weekday ranges and hour-only clocks", () => {
    const extracted = extractKitchenOpeningHours(`
      <html><body>
        <h3>Opening Hours</h3>
        <p>Tuesday-Friday: 16-22</p>
        <p>Saturday: 14-22</p>
        <p>Sunday & Monday: Closed</p>
      </body></html>
    `);
    expect(extracted.intervals).toEqual([
      { isoWeekday: 2, opensAt: "16:00", closesAt: "22:00", closesNextDay: false },
      { isoWeekday: 3, opensAt: "16:00", closesAt: "22:00", closesNextDay: false },
      { isoWeekday: 4, opensAt: "16:00", closesAt: "22:00", closesNextDay: false },
      { isoWeekday: 5, opensAt: "16:00", closesAt: "22:00", closesNextDay: false },
      { isoWeekday: 6, opensAt: "14:00", closesAt: "22:00", closesNextDay: false },
    ]);
  });

  it("supports exact closing times and overnight intervals", () => {
    const extracted = extractKitchenOpeningHours(`
      <html><body><p>Dinner Friday - Saturday 18:00 - 01:00</p></body></html>
    `);
    expect(extracted.intervals).toEqual([
      { isoWeekday: 5, opensAt: "18:00", closesAt: "01:00", closesNextDay: true },
      { isoWeekday: 6, opensAt: "18:00", closesAt: "01:00", closesNextDay: true },
    ]);
  });

  it("fails closed when a late closing time has no exact kitchen cutoff", () => {
    expect(() => extractKitchenOpeningHours("<p>Dinner Tuesday - Saturday 17.00 - late</p>")).toThrow(
      OpeningHoursExtractionError,
    );
    try {
      extractKitchenOpeningHours("<p>Dinner Tuesday - Saturday 17.00 - late</p>");
    } catch (error) {
      expect(error).toMatchObject({ code: "AMBIGUOUS_CLOSE_TIME" });
    }
  });
});
