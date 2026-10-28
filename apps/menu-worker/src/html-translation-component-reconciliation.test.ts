import { describe, expect, it } from "vitest";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { reconcileUnpricedMenuDescriptionRows } from "./html-description-title-recovery.js";

function dish(name: string, kroner: number): MenuObservedItem {
  return { name, normalizedName: normalizeDishName(name), sourceKey: createMenuItemSourceKey(name),
    description: null, sectionName: null, priceMinor: kroner * 100, priceKind: "exact",
    currency: "NOK", position: 0, extractionMethod: "html_heuristic",
    confidence: 0.95, sourceExcerpt: name + " — " + kroner,
  };
}

describe("bilingual and priced platter card layout", () => {
  it("does not turn English translations after allergen notes into new priced dishes", () => {
    const lines = ["Sjøkrepssuppe kr 315", "allergener: skalldyr, melk, selleri",
      "Langustine soup with fennel", "Gratinert kongekrabbe kr 345"];
    const source = [dish("Sjøkrepssuppe", 315), dish("Langustine soup with fennel", 315)];
    expect(reconcileUnpricedMenuDescriptionRows(source, lines.join("\n")).map((x) => x.name))
      .toEqual(["Sjøkrepssuppe"]);
  });

  it("restores a uniquely priced all-caps platter title from its following component list", () => {
    const lines = ["SHELLFISH", "555,-", "SMALL SHELLFISH PLATTER",
      "Shrimps - mussels - 1/2 lobster from Maine", "555,-", "Allergens: shellfish"];
    const source = [dish("Shrimps - mussels - 1/2 lobster from Maine", 555)];
    const result = reconcileUnpricedMenuDescriptionRows(source, lines.join("\n"));
    expect(result.map((x) => [x.name, x.priceMinor]))
      .toEqual([["SMALL SHELLFISH PLATTER", 55500]]);
    expect(result[0]?.description).toContain("Shrimps - mussels");
  });

  it("preserves different-price and multiply occurring layouts as uncertain", () => {
    const description = dish("Shrimps - mussels - 1/2 lobster from Maine", 645);
    const layout = ["555,-", "SMALL SHELLFISH PLATTER", description.name].join("\\n");
    expect(reconcileUnpricedMenuDescriptionRows([description], layout)[0]?.name).toBe(description.name);
    const dup = ["555,-", "SMALL SHELLFISH PLATTER", description.name,
      "555,-", "SMALL SHELLFISH PLATTER", description.name].join("\\n");
    expect(reconcileUnpricedMenuDescriptionRows([dish(description.name, 555)], dup)[0]?.name)
      .toBe(description.name);
  });

  it("does not allow an inherited price to turn a section title into a dish", () => {
    expect(reconcileUnpricedMenuDescriptionRows([dish("DESSERTS", 235)], "DESSERTS\n235,-"))
      .toEqual([]);
  });

  it("keeps the real lunch dish while moving serving hours into its description", () => {
    const result = reconcileUnpricedMenuDescriptionRows(
      [dish("Laks Benedict Serveres 11.30–15.00", 255)],
      "Laks Benedict Serveres 11.30–15.00",
    );
    expect(result.map((x) => x.name)).toEqual(["Laks Benedict"]);
    expect(result[0]?.description).toContain("11.30–15.00");
  });

  it("rejects numbered three-course menu bundles rather than individual dishes", () => {
    const items = [dish("Meny 1", 635), dish("Meny 2", 715), dish("Meny 3", 790)];
    expect(reconcileUnpricedMenuDescriptionRows(items, items.map((x) => x.name).join("\n")))
      .toEqual([]);
  });

  it("sanitizes JSON-LD labels without using HTML line proximity", () => {
    const input = [dish("Meny 1", 635), dish("Meny 2", 715),
      dish("Laks Benedict Serveres 11.30–15.00", 255), dish("Laks trilogi", 245)];
    const result = reconcileUnpricedMenuDescriptionRows(input, "");
    expect(result.map((x) => [x.name, x.priceMinor])).toEqual([
      ["Laks Benedict", 25500], ["Laks trilogi", 24500],
    ]);
  });

  it("uses the true all-caps dessert title, not its repeated-word description", () => {
    const visible = ["245,-", "CRÈME BRÛLÉE", "Spicy pumpkin crème brûlée", "245,-",
      "Allergens: milk, gluten, berries"].join("\\n");
    const result = reconcileUnpricedMenuDescriptionRows(
      [dish("Spicy pumpkin crème brûlée", 245)], visible);
    expect(result.map((item) => [item.name, item.priceMinor]))
      .toEqual([["CRÈME BRÛLÉE", 24500]]);
  });

  it("quarantines explicitly per-kilogram lobster prices rather than claiming plate prices", () => {
    const visible = ["1550,-", "FRESH LOBSTER", "Fished straight from the aquarium.",
      "1550,-", "Price per kg.", "Allergens: shellfish, egg, soy"].join("\\n");
    expect(reconcileUnpricedMenuDescriptionRows([dish("FRESH LOBSTER", 1550)], visible))
      .toEqual([]);
  });

  it("quarantines a kg-priced source card even when the scoped menu omits its unit note", () => {
    const scoped = "SHELLFISH\\n1550,-\\nFRESH LOBSTER\\n1550,-";
    const full = ["SHELLFISH", "1550,-", "FRESH LOBSTER",
      "Fished straight from the aquarium.", "1550,-", "Price per kg.",
      "Allergens: shellfish, egg, soy"].join("\\n");
    expect(reconcileUnpricedMenuDescriptionRows(
      [dish("FRESH LOBSTER", 1550)], scoped, full,
    )).toEqual([]);
  });

  it("does not quarantine a per-plate price when the unit evidence conflicts", () => {
    const mixed = ["1550,-", "FRESH LOBSTER", "1550,-", "Price per kg.",
      "1550,-", "FRESH LOBSTER", "1550,-", "Served with bread"].join("\\n");
    expect(reconcileUnpricedMenuDescriptionRows(
      [dish("FRESH LOBSTER", 1550)], mixed, mixed,
    )).toHaveLength(1);
  });

  it("preserves ordinary directly-priced dishes after allergen notes", () => {
    const name = "Boknatorsk med kremstuede rotgrønnsaker";
    const lines = ["allergener: melk, fisk", name + " kr 455"];
    expect(reconcileUnpricedMenuDescriptionRows([dish(name, 455)], lines.join("\n")))
      .toHaveLength(1);
  });
});
