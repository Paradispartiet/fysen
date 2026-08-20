import { describe, expect, it } from "vitest";
import {
  OPENING_HOURS_MARKER_NORMALIZER_VERSION,
  normalizeOpeningHoursMarkerLines,
} from "./opening-hours-marker-normalizer.js";

describe("opening-hours marker normalizer", () => {
  it("removes decorative prefixes only when they expose a real hours marker", () => {
    expect(OPENING_HOURS_MARKER_NORMALIZER_VERSION).toBe("hours-marker-v3");
    expect(
      normalizeOpeningHoursMarkerLines([
        "* * * ÅPNINGSTIDER CUE",
        "Mandag: 15:00 - 01:00",
        "* * * Velkommen til oss",
      ]),
    ).toEqual([
      "ÅPNINGSTIDER CUE",
      "Mandag: 15:00 - 01:00",
      "* * * Velkommen til oss",
    ]);
  });

  it("joins a short following scope label to an unlabeled hours marker", () => {
    expect(
      normalizeOpeningHoursMarkerLines([
        "ÅPNINGSTIDER",
        "PIZZERIA",
        "Mandag: 18:00 - 23:30",
      ]),
    ).toEqual([
      "ÅPNINGSTIDER PIZZERIA",
      "Mandag: 18:00 - 23:30",
    ]);
  });

  it("does not consume a weekday schedule as a scope label", () => {
    expect(
      normalizeOpeningHoursMarkerLines([
        "ÅPNINGSTIDER",
        "Mandag - Søndag | 11:00 - 22:00",
      ]),
    ).toEqual([
      "ÅPNINGSTIDER",
      "Mandag - Søndag | 11:00 - 22:00",
    ]);
  });

  it.each(["MondayClosed", "TuesdayOpen", "MandagStengt", "OnsdagÅpen"])(
    "does not consume glued weekday schedule text %s as a scope label",
    (schedule) => {
      expect(normalizeOpeningHoursMarkerLines(["Opening Hours", schedule])).toEqual([
        "Opening Hours",
        schedule,
      ]);
    },
  );

  it("normalizes Norwegian and English half-hour kitchen cutoffs to numeric relative offsets", () => {
    expect(
      normalizeOpeningHoursMarkerLines([
        "Kjøkkenet stenger halvtime før stengetid",
        "Kjøkkenet stenger en halv time før stengetid",
        "Kitchen closes half an hour before closing",
        "Kitchen closes a half hour before close time",
      ]),
    ).toEqual([
      "Kjøkkenet stenger 30 min før stengetid",
      "Kjøkkenet stenger 30 min før stengetid",
      "Kitchen closes 30 minutes before closing",
      "Kitchen closes 30 minutes before close time",
    ]);
  });
});
