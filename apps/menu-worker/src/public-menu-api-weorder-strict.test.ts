import { describe, expect, it } from "vitest";
import { extractPublicMenuApi } from "./public-menu-api-extractor.js";

function payload(entries: readonly Record<string, unknown>[], extraMenus: readonly Record<string, unknown>[] = []) {
  return JSON.stringify({
    data: {
      id: 22743,
      menuStructure: 9,
      menuVersion: "22743.406",
      menu: [
        {
          id: 1,
          name: "Restaurant Curries",
          type: "food",
          categories: [{ id: 11, name: "Restaurant Curries", entries }],
        },
        ...extraMenus,
      ],
    },
    success: true,
    messages: [],
  });
}

describe("public menu API WeOrder strict boundary", () => {
  it("fails the whole extraction when one positive numeric price disagrees with dPrice", () => {
    expect(() =>
      extractPublicMenuApi(
        payload([
          { name: "Butter Chicken", price: 279, dPrice: "279,-", isAlcohol: false },
          { name: "Chicken Korma", price: 279, dPrice: "299,-", isAlcohol: false },
        ]),
      ),
    ).toThrow("numeric/display price conflict for Chicken Korma");
  });

  it("fails the whole extraction when a positive numeric price lacks NOK display evidence", () => {
    expect(() =>
      extractPublicMenuApi(
        payload([
          { name: "Butter Chicken", price: 279, dPrice: "279,-", isAlcohol: false },
          { name: "Chicken Korma", price: 279, isAlcohol: false },
        ]),
      ),
    ).toThrow("price lacks NOK display evidence for Chicken Korma");
  });

  it("accepts only type=food and ignores drinks and misc even when they contain priced rows", () => {
    const items = extractPublicMenuApi(
      payload(
        [{ name: "Butter Chicken", price: 279, dPrice: "279,-", isAlcohol: false }],
        [
          {
            id: 2,
            name: "Drikke",
            type: "drinks",
            categories: [{ name: "Mineralvann", entries: [{ name: "Cola", price: 55, dPrice: "55,-" }] }],
          },
          {
            id: 3,
            name: "Menu",
            type: "misc",
            categories: [{ name: "TIPS", entries: [{ name: "Samosa-CHTNY", price: 145, dPrice: "145,-" }] }],
          },
        ],
      ),
    );
    expect(items.map((item) => item.name)).toEqual(["Butter Chicken"]);
  });
});
