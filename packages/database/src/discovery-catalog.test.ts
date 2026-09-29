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
    ["159,- /", null, "invalid_fragment"],
    ["159,- / 2 biter", "A LA CARTA", "invalid_fragment"],
    ["30 g - NOK 420 / 50 g - NOK 620 /", null, "invalid_fragment"],
    ["30 g - NOK 420 / 50 g - NOK 620 / 100g", null, "invalid_fragment"],
    ["NOK", null, "invalid_fragment"],
    ["7Up 33 cl", null, "beverage"],
    ["Faxe Kondi 0,5 l", null, "beverage"],
    ["Mariestads Alkoholfri Øl 0,33L", null, "beverage"],
    ["0% Heineken", null, "beverage"],
    ["Chocolate Shake 0,45 l", null, "beverage"],
    ["Egekilde citrus m/brus 33 cl", null, "beverage"],
    ["Reggiano Lambrusco Roter Perlwine 1,5 l", null, "beverage"],
    ["Sportdryck Mountain Blast Zero Sugar 50cl - Powerade", null, "beverage"],
    ["mini wine package (3 glasses) :", null, "beverage"],
    ["Premium Wine Pairing (5 glasses) :", null, "beverage"],
    ["Lettmelk 0,5% Fett", null, "beverage"],
    ["Banan milkshake", null, "beverage"],
    ["Milkshake Jordbærsmak", null, "beverage"],
    ["Ginger Shot", null, "beverage"],
    ["Turmeric Shot", null, "beverage"],
    ["Cloudy Apple Sparkling Fruit Drink", null, "beverage"],
    ["Jack Daniel's Old N°7 Tennessee Whiskey 0,7 l", null, "beverage"],
    ["Johnnie Walker Red Label Old Scotch Whisky 0,7 l", null, "beverage"],
    ["Menu med milkshake", null, "dish"],
    ["Big Shot", null, "dish"],
    ["Pani Puri Shot", null, "dish"],
    ["FridaysTM Signature Whiskey-Glazed Ribs", null, "dish"],
    ["Bearnaisesås 10 cl", null, "sauce_or_side"],
    ["Blandad kebabsås 20 cl", null, "sauce_or_side"],
    ["KIMBO Dumpling Sauce Hot 190ml 水饺酱", null, "sauce_or_side"],
    ["Grillet Andefilet flambert med kinesisk ØL", "Middag", "dish"],
    ["Hamburger 160g Meny m/ Pommes og 0,5L Drikke", "Middag", "dish"],
    ["40% - Big Mac stor meny", "Middag", "dish"],
    ["Ben & Jerry's Cookie Dough 465ml", null, "dish"],
    ["Classic 350ml", null, "dish"],
  ])("classifies %s as %s", (name, sectionName, expected) => {
    expect(classifyDiscoveryCandidate(candidate(name, sectionName, sectionName === null ? null : 19900))).toBe(expected);
  });

  it("canonicalizes harmless menu variants without broad semantic merging", () => {
    expect(canonicalMenuDishName("11. Margherita (H)")).toBe("Margherita");
    expect(canonicalMenuDishIdentity("Margherita 4 stk")).toBe("margherita");
    expect(canonicalMenuDishIdentity("Adamame")).toBe("edamame");
    expect(canonicalMenuDishIdentity("Pizza Margherita")).toBe("pizza margherita");
    expect(canonicalMenuDishName("- 150g Himeji A5 Wagyu Ribeye, Japan,")).toBe("150g Himeji A5 Wagyu Ribeye, Japan");
    expect(canonicalMenuDishIdentity("- 150g Himeji A5 Wagyu Ribeye, Japan,")).toBe("150g himeji a5 wagyu ribeye japan");
    expect(canonicalMenuDishName("Chili Laks -")).toBe("Chili Laks");
    expect(canonicalMenuDishName("Egg og bacon:")).toBe("Egg og bacon");
    expect(canonicalMenuDishName("Signature Black Caviar Maki: Tuna Tartare Maki")).toBe("Signature Black Caviar Maki: Tuna Tartare Maki");
    expect(canonicalMenuDishName("Fine No.3 - classic")).toBe("Fine No.3 - classic");
  });
});
