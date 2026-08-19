import { describe, expect, it } from "vitest";
import { OpeningHoursExtractionError } from "./opening-hours-extractor.js";
import {
  OPENING_HOURS_DUPLICATE_SECTION_RECOVERY_VERSION,
  extractKitchenOpeningHoursWithIdenticalSectionRecovery,
} from "./opening-hours-duplicate-section-recovery.js";

describe("duplicate opening-hours section recovery", () => {
  it("accepts repeated responsive sections only when they resolve to the same canonical week", () => {
    const extracted = extractKitchenOpeningHoursWithIdenticalSectionRecovery([
      "Åpningstider",
      "Mandag - Søndag | 11:00 - 22:00",
      "Kontakt oss",
      "Åpningstider",
      "Mandag - Søndag | 11:00 - 22:00",
    ]);

    expect(OPENING_HOURS_DUPLICATE_SECTION_RECOVERY_VERSION).toBe("scope-duplicates-v1");
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

  it("compares only duplicated sections that match an explicit scope hint", () => {
    const extracted = extractKitchenOpeningHoursWithIdenticalSectionRecovery(
      [
        "Åpningstider CUE",
        "Mandag - Søndag | 12:00 - 02:00",
        "Åpningstider PIZZERIA",
        "Mandag - Søndag | 18:00 - 23:00",
        "Åpningstider CUE",
        "Mandag - Søndag | 12:00 - 02:00",
        "Åpningstider PIZZERIA",
        "Mandag - Søndag | 18:00 - 23:00",
      ],
      ["Pizzeria"],
    );

    expect(extracted.intervals).toHaveLength(7);
    expect(extracted.intervals.every((item) => item.opensAt === "18:00" && item.closesAt === "23:00")).toBe(true);
  });

  it("fails closed when duplicated sections inside the requested scope disagree", () => {
    expect(() =>
      extractKitchenOpeningHoursWithIdenticalSectionRecovery(
        [
          "Åpningstider CUE",
          "Mandag - Søndag | 12:00 - 02:00",
          "Åpningstider PIZZERIA",
          "Mandag - Søndag | 18:00 - 23:00",
          "Åpningstider CUE",
          "Mandag - Søndag | 12:00 - 02:00",
          "Åpningstider PIZZERIA",
          "Mandag - Søndag | 18:30 - 23:00",
        ],
        ["Pizzeria"],
      ),
    ).toThrow(OpeningHoursExtractionError);
  });
});
