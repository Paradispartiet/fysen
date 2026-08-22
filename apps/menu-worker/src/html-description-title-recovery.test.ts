import { describe, expect, it } from "vitest";
import type { MenuObservedItem } from "@fysen/menu-core";
import {
  HTML_DESCRIPTION_TITLE_RECOVERY_VERSION,
  recoverDescriptionNamedHtmlItems,
} from "./html-description-title-recovery.js";

function item(
  name: string,
  position: number,
  priceMinor: number,
): MenuObservedItem {
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
        item(
          "Godt krydret kjøtt av okse og lam. Serveres med salat",
          11,
          35000,
        ),
        item("Marinert kyllingbryst som serveres med salat", 14, 31000),
      ],
      visibleText,
    );

    expect(HTML_DESCRIPTION_TITLE_RECOVERY_VERSION).toBe("titles-v14");
    expect(result.map((entry) => entry.name)).toEqual([
      "Hummus (kikert-og sesampuré)",
      "Hvitløkmarinerte kyllingvinger",
      "Gaza kebab",
      "Dønner kebab",
      "Kylling Tawok",
    ]);
    expect(result[0]?.description).toBe("Serveres med pitabrød");
  });

  it("recovers titles before short fried, steamed and mini-mezah descriptions", () => {
    const visibleText = [
      "Mrs. Fish",
      "Helfritert makirull med laks",
      "164",
      "Rainbow",
      "Fritert scampi med avokado",
      "169",
      "Mezah med en grill rett",
      "Mini-mezah med valgfri grillrett",
      "459",
    ].join("\n");

    const result = recoverDescriptionNamedHtmlItems(
      [
        item("Helfritert makirull med laks", 1, 16400),
        item("Fritert scampi med avokado", 4, 16900),
        item("Mini-mezah med valgfri grillrett", 7, 45900),
      ],
      visibleText,
    );

    expect(result.map((entry) => [entry.name, entry.priceMinor])).toEqual([
      ["Mrs. Fish", 16400],
      ["Rainbow", 16900],
      ["Mezah med en grill rett", 45900],
    ]);
  });

  it("treats a multiword colon introduction as description", () => {
    const result = recoverDescriptionNamedHtmlItems(
      [item("Den palestinske mezahen har sine særtrekk:", 1, 35000)],
      ["Gaza kebab", "Den palestinske mezahen har sine særtrekk:", "350"].join("\n"),
    );

    expect(result[0]?.name).toBe("Gaza kebab");
  });

  it("prefers a structurally anchored dish after a section intro in the same price block", () => {
    const pizza = {
      ...item("Pizza", 0, 25900),
      description:
        "Rykende fersk italiensk pizza fra steinovnen Diavola Tomatsaus, ost, ventricina, oliven, rødløk, ruccola, chili",
      sourceExcerpt:
        "Pizza — Rykende fersk italiensk pizza fra steinovnen — Diavola — Tomatsaus, ost, ventricina, oliven, rødløk, ruccola, chili — 259",
    };

    const result = recoverDescriptionNamedHtmlItems(
      [pizza],
      [
        "Pizza",
        "Rykende fersk italiensk pizza fra steinovnen",
        "Diavola",
        "Tomatsaus, ost, ventricina, oliven, rødløk, ruccola, chili",
        "259",
      ].join("\n"),
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Diavola");
  });

  it("does not guess when two section-block candidates are each structurally title-like", () => {
    const pizza = {
      ...item("Pizza", 0, 25900),
      sourceExcerpt:
        "Pizza — Special One — Tomatsaus, ost, chili, løk, oliven — Special Two — Creme fraiche, ost, sopp, løk, urter — 259",
    };

    const result = recoverDescriptionNamedHtmlItems([pizza], "Pizza\n259");

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Pizza");
  });

  it("treats a comma-rich ingredient line as description and preserves a short question-mark dish title", () => {
    const ingredientLine = "Tomatsaus, ost, biff, rødløk, sjampinjong, aioli";
    const result = recoverDescriptionNamedHtmlItems(
      [item(ingredientLine, 1, 26900)],
      ["Wanna Beef?", ingredientLine, "269"].join("\n"),
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Wanna Beef?");
    expect(result[0]?.description).toBe(ingredientLine);
  });

  it("still treats a long question sentence as description rather than a dish title", () => {
    const question = "Er du klar for en skikkelig spicy pizza?";
    const result = recoverDescriptionNamedHtmlItems(
      [item(question, 1, 25900)],
      ["Diavola", question, "259"].join("\n"),
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Diavola");
    expect(result[0]?.description).toBe(question);
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

  it("treats a short standalone allergen-code list as metadata and recovers the preceding dish title", () => {
    const result = recoverDescriptionNamedHtmlItems(
      [item("H, SO, L", 1, 23500)],
      ["Vegetar BURGER -", "H, SO, L", "235"].join("\n"),
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Vegetar BURGER -");
    expect(result[0]?.description).toBe("H, SO, L");
    expect(result[0]?.priceMinor).toBe(23500);
  });

  it("joins a split parenthetical dish heading instead of keeping the continuation as a dish", () => {
    const visibleText = [
      "Kofta (arabisk gryterett",
      "med kjøttboller)",
      "Godt krydret kjøtt av okse og lam. Serveres med salat, oliven, pitabrød og bulgur",
      "310",
    ].join("\n");

    const result = recoverDescriptionNamedHtmlItems(
      [item("med kjøttboller)", 1, 31000)],
      visibleText,
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Kofta (arabisk gryterett med kjøttboller)");
    expect(result[0]?.description).toBeNull();
  });

  it("joins a forward continuation even when scoped extraction shifted the observed position", () => {
    const visibleText = [
      "Forretter",
      "Gaza kebab",
      "Kofta (arabisk gryterett",
      "med kjøttboller)",
      "Godt krydret kjøtt av okse og lam. Serveres med salat, oliven, pitabrød og bulgur",
      "310",
    ].join("\n");

    const result = recoverDescriptionNamedHtmlItems(
      [item("Kofta (arabisk gryterett", 0, 31000)],
      visibleText,
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Kofta (arabisk gryterett med kjøttboller)");
  });

  it("uses the item-anchored source excerpt when scoped visible text no longer exposes the continuation", () => {
    const kofta = {
      ...item("Kofta (arabisk gryterett", 99, 31000),
      sourceExcerpt:
        "Kofta (arabisk gryterett — med kjøttboller) — Godt krydret kjøtt av okse og lam. Serveres med salat — 310",
    };

    const result = recoverDescriptionNamedHtmlItems(
      [kofta],
      ["Hovedretter", "Gaza kebab", "350", "Lammegryte", "330"].join("\n"),
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Kofta (arabisk gryterett med kjøttboller)");
  });

  it("does not guess when the same incomplete title has conflicting continuations", () => {
    const visibleText = [
      "Kofta (gryterett",
      "med kjøttboller)",
      "310",
      "Kofta (gryterett",
      "med lam)",
      "320",
    ].join("\n");

    const result = recoverDescriptionNamedHtmlItems(
      [item("Kofta (gryterett", 99, 31000)],
      visibleText,
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Kofta (gryterett");
  });

  it("recovers the canonical heading across several description lines for per-person pricing", () => {
    const visibleText = [
      "Mezah med en grill rett",
      "Mini-mezah. Jo flere som best bestiller, jo større blir variasjonene",
      "Serveres med hvitløksbrød og pitabrød",
      "Grillede spyd med Gaza Kebab og marinert grillet kyllingbryst med hvitløk",
      "Pr. person Kr. 459,-",
    ].join("\n");

    const result = recoverDescriptionNamedHtmlItems(
      [item("Pr. person", 4, 45900)],
      visibleText,
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Mezah med en grill rett");
    expect(result[0]?.description).toBeNull();
  });

  it("preserves a directly priced dish title even when its leading verb resembles description prose", () => {
    const grilled = {
      ...item("GRILLED VEGETABLE PLATE", 2, 15900),
      sourceExcerpt: "GRILLED VEGETABLE PLATE — 159,-",
    };
    const result = recoverDescriptionNamedHtmlItems(
      [grilled],
      ["CHILDREN MENU", "GRILLED VEGETABLE PLATE", "159,-"].join("\n"),
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("GRILLED VEGETABLE PLATE");
    expect(result[0]?.confidence).toBe(0.9);
  });

  it("preserves a long directly priced title instead of replacing it with an earlier section label", () => {
    const offer = {
      ...item("LET THE KITCHEN BUILD A SHARING MENU FOR THE WHOLE TABLE", 2, 59500),
      sourceExcerpt:
        "LET THE KITCHEN BUILD A SHARING MENU FOR THE WHOLE TABLE — 595.0",
    };
    const result = recoverDescriptionNamedHtmlItems(
      [offer],
      [
        "TASTING MENU",
        "LET THE KITCHEN BUILD A SHARING MENU FOR THE WHOLE TABLE",
        "595.0",
      ].join("\n"),
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe(
      "LET THE KITCHEN BUILD A SHARING MENU FOR THE WHOLE TABLE",
    );
    expect(result[0]?.confidence).toBe(0.9);
  });

  it("leaves ordinary short dish names unchanged", () => {
    const result = recoverDescriptionNamedHtmlItems(
      [item("Gresk salat", 1, 22000), item("Mezah med kjøtt", 3, 39900)],
      ["Forretter", "Gresk salat", "220", "Mezah med kjøtt", "399"].join("\n"),
    );

    expect(result.map((entry) => entry.name)).toEqual([
      "Gresk salat",
      "Mezah med kjøtt",
    ]);
  });
});
