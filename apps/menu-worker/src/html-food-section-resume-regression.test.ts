import { describe, expect, it } from "vitest";
import {
  createMenuItemSourceKey,
  normalizeDishName,
  type MenuObservedItem,
} from "@fysen/menu-core";
import {
  filterPlainTextBeverageSectionItems,
  HTML_TEXT_SECTION_SCOPE_VERSION,
} from "./html-text-section-scope.js";

function item(name: string, position: number, priceMinor: number): MenuObservedItem {
  return {
    sourceKey: createMenuItemSourceKey(name),
    name,
    normalizedName: normalizeDishName(name),
    description: null,
    sectionName: null,
    priceMinor,
    currency: "NOK",
    position,
    extractionMethod: "html_heuristic",
    confidence: 0.99,
    sourceExcerpt: `${name} — ${priceMinor / 100}`,
  };
}

describe("food section state recovery after beverage sections", () => {
  it("resumes food scope for common à-la-carte, kebab, chicken/lamb and mezah section labels", () => {
    const items = [
      item("Gin Tonic", 1, 15900),
      item("Hummus (kikert-og sesampuré)", 2, 11900),
      item("Gaza kebab", 3, 35000),
      item("Dønner kebab", 4, 35000),
      item("Kylling Tawok", 5, 31000),
      item("Mezah uten kjøtt (vegetar)", 6, 35000),
      item("Mezah med kjøtt", 7, 39900),
      item("Baklawa med pistasjhonning", 8, 13900),
    ];
    const visibleText = `
      Drikkemeny
      Gin Tonic
      159
      À la carte
      Hummus (kikert-og sesampuré)
      119
      Gaza-kebab
      Gaza kebab
      350
      Kylling og Lam
      Dønner kebab
      350
      Kylling Tawok
      310
      Mezah-retter
      Mezah uten kjøtt (vegetar)
      350
      Mezah med kjøtt
      399
      Dessert
      Baklawa med pistasjhonning
      139
    `;

    expect(HTML_TEXT_SECTION_SCOPE_VERSION).toBe("text-section-scope-v11");
    expect(
      filterPlainTextBeverageSectionItems(items, visibleText).map(
        (entry) => entry.name,
      ),
    ).toEqual([
      "Hummus (kikert-og sesampuré)",
      "Gaza kebab",
      "Dønner kebab",
      "Kylling Tawok",
      "Mezah uten kjøtt (vegetar)",
      "Mezah med kjøtt",
      "Baklawa med pistasjhonning",
    ]);
  });
});
