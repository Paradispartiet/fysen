import { describe, expect, it } from "vitest";
import { OpeningHoursExtractionError } from "./opening-hours-extractor.js";
import { extractKitchenOpeningHoursWithIdenticalSectionRecovery } from "./opening-hours-duplicate-section-recovery.js";

describe("duplicate opening-hours section recovery", () => {
  it("accepts repeated responsive sections only when they resolve to the same canonical week", () => {
    const extracted = extractKitchenOpeningHoursWithIdenticalSectionRecovery([
      "Åpningstider",
      "Mandag - Søndag | 11:00 - 22:00",
      "Kontakt oss",
      "Åpningstider",
      "Mandag - Søndag | 11:00 - 22:00",
    ]);

    expect(extracted.intervals).toHaveLength(7);
    expect(extracted.intervals.every((item) => item.opensAt === "11:00" && item.closesAt === "22:00")).toBe(true);
  });

  it("still fails closed when repeated opening-hours sections disagree", () => {
    expect(() =>
      extractKitchenOpeningHoursWithIdenticalSectionRecovery([
        "Åpningstider",
        "Mandag - Søndag | 11:00 - 22:00",
        "Åpningstider",
        "Mandag - Søndag | 14:00 - 22:00",
      ]),
    ).toThrow(OpeningHoursExtractionError);
  });
});
