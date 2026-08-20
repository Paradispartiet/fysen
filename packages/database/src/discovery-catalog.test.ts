import { describe, expect, it } from "vitest";
import { canonicalMenuDishIdentity, canonicalMenuDishName, classifyDiscoveryCandidate } from "./discovery-catalog.js";

const candidate = (name: string, sectionName: string | null = "Middag", priceMinor: number | null = 19900) => ({
  name,
  normalizedName: name.toLocaleLowerCase("nb-NO"),
  description: null,
  sectionName,
  priceMinor,
});

describe("consumer discovery catalog", () => {
  it.each<[string, string | null, string]>([
    ["Ramen", "Middag", "dish"],
    ["Aperol Spritz", "Cocktails", "beverage"],
    ["Chimichurri", "Sauser", "sauce_or_side"],
    ["Velg styrke", "Middag", "modifier"],
    ["Allergener: melk, gluten", null, "allergen_or_information"],
    ["Hovedretter", null, "menu_heading"],
    ["16 STK", null, "invalid_fragment"],
  ])("classifies %s as %s", (name, sectionName, expected) => {
    expect(classifyDiscoveryCandidate(candidate(name, sectionName, sectionName === null ? null : 19900))).toBe(expected);
  });

  it("canonicalizes harmless menu variants without broad semantic merging", () => {
    expect(canonicalMenuDishName("11. Margherita (H)")).toBe("Margherita");
    expect(canonicalMenuDishIdentity("Margherita 4 stk")).toBe("margherita");
    expect(canonicalMenuDishIdentity("Adamame")).toBe("edamame");
    expect(canonicalMenuDishIdentity("Pizza Margherita")).toBe("pizza margherita");
  });
});
