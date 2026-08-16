import { describe, expect, it } from "vitest";
import {
  assessExtraction,
  createMenuFingerprint,
  createMenuItemSourceKey,
  diffMenuItems,
  normalizeDishName,
  type MenuObservedItem,
} from "./index.js";

describe("normalizeDishName", () => {
  it("normalizes punctuation and whitespace without destroying Norwegian letters", () => {
    expect(normalizeDishName("  Biff-tartar   med Østers  ")).toBe("biff tartar med østers");
  });
});

describe("createMenuFingerprint", () => {
  it("is stable when menu item order changes", () => {
    const a = [
      { name: "Ramen", priceMinor: 24900, currency: "NOK" },
      { name: "Biff tartar", priceMinor: 22500, currency: "NOK" },
    ];
    const b = [...a].reverse();

    expect(createMenuFingerprint(a)).toBe(createMenuFingerprint(b));
  });

  it("changes when a price or description changes", () => {
    const before = [{ name: "Ramen", description: "Kylling", priceMinor: 24900, currency: "NOK" }];
    const after = [{ name: "Ramen", description: "Svinekjøtt", priceMinor: 25900, currency: "NOK" }];

    expect(createMenuFingerprint(before)).not.toBe(createMenuFingerprint(after));
  });
});

describe("diffMenuItems", () => {
  it("records price changes without changing the stable source key", () => {
    const sourceKey = createMenuItemSourceKey("Biff tartar", "Forretter");
    const item = (priceMinor: number): MenuObservedItem => ({
      sourceKey,
      name: "Biff tartar",
      normalizedName: "biff tartar",
      description: null,
      sectionName: "Forretter",
      priceMinor,
      currency: "NOK",
      position: 0,
      extractionMethod: "html_heuristic",
      confidence: 0.9,
      sourceExcerpt: "Biff tartar",
    });

    expect(diffMenuItems([item(22500)], [item(24500)]).map((change) => change.kind)).toEqual([
      "price_changed",
    ]);
  });
});

describe("assessExtraction", () => {
  it("quarantines a sudden large menu collapse", () => {
    expect(assessExtraction(20, 4, 1).code).toBe("suspicious_drop");
  });

  it("rejects extraction below the source minimum", () => {
    expect(assessExtraction(0, 2, 5).code).toBe("below_minimum");
  });
});
