import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath, URL } from "node:url";
import { browseDishDisplayName, sortBrowseDishesForDisplay } from "../lib/dish-browse-display.ts";

describe("Oslo live dish browse headings", () => {
  it("removes only noisy leading icon, number, quantity or punctuation prefixes", () => {
    const cases = [
      ["🍕 Margherita", "Margherita"],
      ["12. 🍔 Burger", "Burger"],
      ["• 03 - 🍜 Ramen", "Ramen"],
      ["- 150g Himeji A5 Wagyu Ribeye, Japan,", "Himeji A5 Wagyu Ribeye, Japan,"],
      ["🍤 2 stk. Nigiri", "Nigiri"],
      ["40% - Big Mac stor meny", "Big Mac stor meny"],
      ["🍜 4 Cheese Pizza", "Cheese Pizza"],
      ["🎌 海老天ぷら", "海老天ぷら"],
      ["Ærtesuppe", "Ærtesuppe"],
      ["Kylling A5 (2 stk)", "Kylling A5 (2 stk)"],
      ["  🍝 Carbonara  ", "Carbonara"],
      ["💰 159,-", ""],
      ["---", ""],
    ];
    for (const [original, expected] of cases) {
      assert.equal(browseDishDisplayName(original), expected, original);
    }
  });

  it("sorts by the cleaned Norwegian title, keeps original API items, and omits title fragments", () => {
    const dishes = [
      { id: "s", name: "🍣 Sushi", query: "sushi" },
      { id: "a", name: "Åpen sandwich", query: "åpen sandwich" },
      { id: "r", name: "12. Ramen", query: "12 ramen" },
      { id: "n", name: "159,-", query: "159" },
      { id: "b", name: "🍔 Burger", query: "burger" },
      { id: "h", name: "150g Himeji Wagyu", query: "150g himeji wagyu" },
      { id: "e", name: "Æblekage", query: "æblekage" },
    ];
    const sorted = sortBrowseDishesForDisplay(dishes);
    assert.deepEqual(sorted.map(({ id }) => id), ["b", "h", "r", "s", "e", "a"]);
    assert.equal(sorted[2], dishes[2]);
    assert.equal(sorted[2].name, "12. Ramen");
    assert.equal(sorted[2].query, "12 ramen");
    assert.equal(dishes[0].name, "🍣 Sushi");
    assert.equal(dishes.length, 7);
  });

  it("wires sorting and display-only names into the live browse while preserving search queries", () => {
    const path = fileURLToPath(new URL("../components/dish-browse.tsx", import.meta.url));
    const source = readFileSync(path, "utf8");
    assert.match(source, /return sortBrowseDishesForDisplay\(dishes\)/u);
    assert.match(source, /<strong>\{browseDishDisplayName\(dish\.name\)\}<\/strong>/u);
    assert.match(source, /dishSearchHref\(dish\.query, data\.city\)/u);
  });
});
