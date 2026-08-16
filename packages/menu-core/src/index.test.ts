import { describe, expect, it } from "vitest";
import { createMenuFingerprint, normalizeDishName } from "./index.js";

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

  it("changes when a price changes", () => {
    const before = [{ name: "Ramen", priceMinor: 24900, currency: "NOK" }];
    const after = [{ name: "Ramen", priceMinor: 25900, currency: "NOK" }];

    expect(createMenuFingerprint(before)).not.toBe(createMenuFingerprint(after));
  });
});
