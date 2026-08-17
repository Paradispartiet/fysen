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

  it("scopes a multi-branch page to the branch identified by the page itself", () => {
    const extracted = extractKitchenOpeningHours(`
      <html><body>
        <h1>Hrimnir Storgata</h1>
        <p>Meny og booking</p>
        <h3>Åpningstider Fredensborg:</h3>
        <p>Tirsdag til Lørdag: 17:00 - 23.00 (Kjøkken til 21:30)</p>
        <h3>Åpningstider Storgata:</h3>
        <p>Søndag til Torsdag: 12:00 - 22.00 (Kjøkken til 21:00)</p>
        <p>Fredag - Lørdag: 12:00 - 23.00 (Kjøkken til 21:00)</p>
      </body></html>
    `);

    expect(extracted.intervals).toEqual([
      { isoWeekday: 1, opensAt: "12:00", closesAt: "21:00", closesNextDay: false },
      { isoWeekday: 2, opensAt: "12:00", closesAt: "21:00", closesNextDay: false },
      { isoWeekday: 3, opensAt: "12:00", closesAt: "21:00", closesNextDay: false },
      { isoWeekday: 4, opensAt: "12:00", closesAt: "21:00", closesNextDay: false },
      { isoWeekday: 5, opensAt: "12:00", closesAt: "21:00", closesNextDay: false },
      { isoWeekday: 6, opensAt: "12:00", closesAt: "21:00", closesNextDay: false },
      { isoWeekday: 7, opensAt: "12:00", closesAt: "21:00", closesNextDay: false },
    ]);
    expect(extracted.sourceExcerpt).toContain("Søndag til Torsdag");
    expect(extracted.sourceExcerpt).not.toContain("Tirsdag til Lørdag: 17:00");
  });

  it("uses canonical source hints when the page identity mentions multiple branches", () => {
    const html = `
      <html><body>
        <h1>Hrimnir Ramen</h1>
        <p>Besøk oss på Fredensborg eller Storgata.</p>
        <p>Booking Fredensborg · Booking Storgata</p>
        <h3>Åpningstider Fredensborg:</h3>
        <p>Tirsdag til Lørdag: 17:00 - 23.00 (Kjøkken til 21:30)</p>
        <h3>Åpningstider Storgata:</h3>
        <p>Søndag til Torsdag: 12:00 - 22.00 (Kjøkken til 21:00)</p>
        <p>Fredag - Lørdag: 12:00 - 23.00 (Kjøkken til 21:00)</p>
      </body></html>
    `;

    const extracted = extractKitchenOpeningHours(html, [
      "https://www.hrimnir-ramen.no/meny-storgata",
      "hrimnir-ramen-storgata",
      "Hrimnir Ramen Storgata",
    ]);

    expect(extracted.intervals).toHaveLength(7);
    expect(extracted.intervals.every((item) => item.opensAt === "12:00" && item.closesAt === "21:00")).toBe(true);
    expect(extracted.sourceExcerpt).toContain("Søndag til Torsdag");
    expect(extracted.sourceExcerpt).not.toContain("Tirsdag til Lørdag: 17:00");
  });

  it("fails closed when a multi-branch page cannot be scoped to exactly one branch", () => {
    expect(() =>
      extractKitchenOpeningHours(`
        <html><body>
          <h1>Hrimnir Ramen</h1>
          <h3>Åpningstider Fredensborg:</h3>
          <p>Tirsdag til Lørdag: 17:00 - 23.00</p>
          <h3>Åpningstider Storgata:</h3>
          <p>Søndag til Torsdag: 12:00 - 22.00</p>
        </body></html>
      `),
    ).toThrow(OpeningHoursExtractionError);
    try {
      extractKitchenOpeningHours(`
        <html><body>
          <h1>Hrimnir Ramen</h1>
          <h3>Åpningstider Fredensborg:</h3>
          <p>Tirsdag til Lørdag: 17:00 - 23.00</p>
          <h3>Åpningstider Storgata:</h3>
          <p>Søndag til Torsdag: 12:00 - 22.00</p>
        </body></html>
      `);
    } catch (error) {
      expect(error).toMatchObject({ code: "AMBIGUOUS_HOURS_SECTION" });
    }
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
