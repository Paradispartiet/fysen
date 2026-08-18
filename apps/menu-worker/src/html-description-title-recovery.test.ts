import { describe, expect, it } from "vitest";
import type { MenuObservedItem } from "@fysen/menu-core";
import {
  HTML_DESCRIPTION_TITLE_RECOVERY_VERSION,
  recoverDescriptionNamedHtmlItems,
} from "./html-description-title-recovery.js";

function item(name: string, position: number, priceMinor: number): MenuObservedItem {
  return {
    sourceKey: `test:${position}`,
    name,
    normalizedName: name.toLocaleLowerCase("nb-NO"),
    description: null,
    sectionName: null,
    priceMinor,
    currency: "NOK",
    position,
    extractionMethod: "html_heuristic",
    confidence: 0.9,
    sourceExcerpt: `${name} — ${priceMinor / 100}`,
  };
}

describe("HTML description-title recovery", () => {
  it("recovers short and long Norwegian description lines from the preceding dish title", () => {
    const visibleText = [
      "À la carte",
      "Hummus (kikert-og sesampuré)",
      "Serveres med pitabrød",
      "119",
      "Hvitløkmarinerte kyllingvinger",
      "Serveres med salat",
      "290",
      "Gaza kebab",
      "Kan fås gluten- og laktosefri",
      "350",
      "Dønner kebab",
      "Godt krydret kjøtt av okse og lam. Serveres med salat",
      "350",
      "Kylling Tawok",
      "Marinert kyllingbryst som serveres med salat",
      "310",
    ].join("\n");

    const result = recoverDescriptionNamedHtmlItems(
      [
        item("Serveres med pitabrød", 2, 11900),
        item("Serveres med salat", 5, 29000),
        item("Kan fås gluten- og laktosefri", 8, 35000),
        item("Godt krydret kjøtt av okse og lam. Serveres med salat", 11, 35000),
        item("Marinert kyllingbryst som serveres med salat", 14, 31000),
      ],
      visibleText,
    );

    expect(HTML_DESCRIPTION_TITLE_RECOVERY_VERSION).toBe("titles-v2");
    expect(result.map((entry) => entry.name)).toEqual([
      "Hummus (kikert-og sesampuré)",
      "Hvitløkmarinerte kyllingvinger",
      "Gaza kebab",
      "Dønner kebab",
      "Kylling Tawok",
    ]);
    expect(result[0]?.description).toBe("Serveres med pitabrød");
  });

  it("recovers allergen-only metadata and a non-allergen parenthetical title qualifier", () => {
    const visibleText = [
      "Gaza kebab",
      "Hvete, laktose",
      "Kan fås gluten- og laktosefri",
      "350",
      "Mezah uten kjøtt (vegetar)",
      "350",
      "Egg og bacon",
      "189",
      "Pizza (H, M)",
      "199",
    ].join("\n");

    const result = recoverDescriptionNamedHtmlItems(
      [
        item("Hvete, laktose", 1, 35000),
        item("Mezah uten kjøtt", 4, 35000),
        item("Egg og bacon", 6, 18900),
        item("Pizza", 8, 19900),
      ],
      visibleText,
    );

    expect(result.map((entry) => entry.name)).toEqual([
      "Gaza kebab",
      "Mezah uten kjøtt (vegetar)",
      "Egg og bacon",
      "Pizza",
    ]);
    expect(result[0]?.description).toBe("Hvete, laktose");
  });

  it("leaves ordinary short dish names unchanged", () => {
    const result = recoverDescriptionNamedHtmlItems(
      [item("Gresk salat", 1, 22000), item("Mezah med kjøtt", 3, 39900)],
      ["Forretter", "Gresk salat", "220", "Mezah med kjøtt", "399"].join("\n"),
    );

    expect(result.map((entry) => entry.name)).toEqual(["Gresk salat", "Mezah med kjøtt"]);
  });
});
