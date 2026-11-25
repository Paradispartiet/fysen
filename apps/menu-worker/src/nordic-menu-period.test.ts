import { describe, expect, it } from "vitest";
import { assertOrdinaryMenuPeriod, localMenuDate } from "./nordic-menu-period.js";
const period = {
  validFrom: "2026-09-08", validThrough: "2027-04-07",
  overridePeriod: { from: "2026-12-21", through: "2027-01-03" },
};
describe("Nordic menu season boundary", () => {
  it("uses local calendar dates, including Finnish midnight", () => {
    expect(localMenuDate(new Date("2026-12-20T22:30:00Z"), "Europe/Helsinki")).toBe("2026-12-21");
    expect(localMenuDate(new Date("2026-12-20T22:30:00Z"), "Europe/Copenhagen")).toBe("2026-12-20");
  });
  it("rejects seasonal overrides and expired or impossible dates", () => {
    for (const day of ["2026-12-20", "2027-01-04", "2027-04-07"]) {
      expect(() => assertOrdinaryMenuPeriod(day, period)).not.toThrow();
    }
    for (const day of ["2026-12-21", "2026-12-31", "2027-01-03"]) {
      expect(() => assertOrdinaryMenuPeriod(day, period)).toThrow(/override/u);
    }
    for (const day of ["2027-04-08", "2026-09-07", "2026-11-31"]) {
      expect(() => assertOrdinaryMenuPeriod(day, period)).toThrow(/validity/u);
    }
  });
});
