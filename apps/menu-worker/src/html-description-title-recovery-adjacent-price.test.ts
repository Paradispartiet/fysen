import { describe, expect, it } from "vitest";
import type { MenuObservedItem } from "@fysen/menu-core";
import {
  HTML_DESCRIPTION_TITLE_RECOVERY_VERSION,
  recoverDescriptionNamedHtmlItems,
} from "./html-description-title-recovery.js";

function item(overrides: Partial<MenuObservedItem>): MenuObservedItem {
  return {
    sourceKey: "fixture",
    name: "Ground peas",
    normalizedName: "ground peas",
    description: "onion, garlic, oil, served with teff injera",
    sectionName: null,
    priceMinor: 29000,
    currency: "NOK",
    position: 2,
    extractionMethod: "html_heuristic",
    confidence: 0.78,
    sourceExcerpt: "Ground peas, onion, garlic, oil, served with teff injera — 290 NOK",
    ...overrides,
  };
}

describe("description title recovery across an adjacent price", () => {
  it("recovers a comma-bearing dish heading when an ingredient fragment is misread as the item name", () => {
    const recovered = recoverDescriptionNamedHtmlItems(
      [item({})],
      [
        "Shiro, Meser",
        "290 NOK",
        "Ground peas, onion, garlic, oil, served with teff injera",
      ].join("\n"),
    );

    expect(HTML_DESCRIPTION_TITLE_RECOVERY_VERSION).toBe("titles-v10");
    expect(recovered.map((candidate) => [candidate.name, candidate.priceMinor])).toEqual([
      ["Shiro, Meser", 29000],
    ]);
  });

  it("does not replace a real next dish title merely because the previous dish ended with a price", () => {
    const recovered = recoverDescriptionNamedHtmlItems(
      [
        item({
          sourceKey: "garden-salad",
          name: "Garden Salad",
          normalizedName: "garden salad",
          description: "lettuce, tomato, onion, cucumber, carrot and herbs",
          priceMinor: 16500,
          position: 2,
          sourceExcerpt: "Garden Salad — 165 NOK",
        }),
      ],
      [
        "Previous Dish",
        "290 NOK",
        "Garden Salad",
        "165 NOK",
        "Lettuce, tomato, onion, cucumber, carrot and herbs",
      ].join("\n"),
    );

    expect(recovered[0]?.name).toBe("Garden Salad");
    expect(recovered[0]?.priceMinor).toBe(16500);
  });
});
