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

    expect(HTML_DESCRIPTION_TITLE_RECOVERY_VERSION).toBe("titles-v6");
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

  it("leaves ordinary short dish names unchanged", () => {
    const result = recoverDescriptionNamedHtmlItems(
      [item("Gresk salat", 1, 22000), item("Mezah med kjøtt", 3, 39900)],
      ["Forretter", "Gresk salat", "220", "Mezah med kjøtt", "399"].join("\n"),
    );

    expect(result.map((entry) => entry.name)).toEqual(["Gresk salat", "Mezah med kjøtt"]);
  });
});
