import assert from "node:assert/strict";
import test from "node:test";
import * as discovery from "../lib/dish-discovery.ts";

const descriptors = [
  { label: "Tandoori", query: "tandoori", aliases: ["murgh tandoori"] },
  { label: "Butter Chicken", query: "butter chicken", aliases: ["murgh makhani"] },
  { label: "Ærtesuppe", query: "ærtesuppe", aliases: ["grønnsakssuppe"] },
];

// Catch lost Unicode/alias normalization, phrase boundaries, and stale item values.
test("prepared matching retains aliases, Unicode normalization, and phrase boundaries across items", () => {
  const match = discovery.createDiscoveryMatcher(descriptors);
  const cases = [
    [{ name: "MURGH—MAKHANI", query: "other" }, "Butter Chicken"],
    [{ name: "Café", query: "GRØNNSAKSSUPPE" }, "Ærtesuppe"],
    [{ name: "ÆRTESUPPE", query: "" }, "Ærtesuppe"],
    [{ name: "Chicken tandoori special", query: "" }, "Tandoori"],
    [{ name: "Tandoori chicken", query: "" }, "Tandoori"],
    [{ name: "Chicken tandoori", query: "" }, "Tandoori"],
    [{ name: "pretandoorified", query: "" }, null],
    [{ name: "", query: "" }, null],
    [{ name: "Butter Chicken", query: "" }, "Butter Chicken"],
  ];
  for (const [item, expected] of cases) {
    assert.equal(match(item)?.label ?? null, expected, JSON.stringify(item));
  }
});

// Catch accidentally ranking exact matches ahead of the caller's priority order.
test("first descriptor order wins even when a later descriptor matches exactly", () => {
  const preferred = { label: "Chicken", query: "chicken" };
  const exact = { label: "Butter Chicken", query: "butter chicken" };
  const item = { name: "Butter Chicken", query: "butter chicken" };
  assert.equal(discovery.createDiscoveryMatcher([preferred, exact])(item), preferred);
  assert.equal(discovery.createDiscoveryMatcher([exact, preferred])(item), exact);
  assert.equal(discovery.createDiscoveryMatcher([])(item), null);
});

// The existing matcher is the compatibility oracle; literals above independently
// cover the boundary cases that a shared matching regression could otherwise hide.
test("prepared matching agrees with existing matching for every descriptor and item", () => {
  const items = [
    { name: "Tandoori Butter Chicken", query: "murgh makhani" },
    { name: "Grønnsakssuppe", query: "ærtEsuppe" },
    { name: "Tandoorified", query: "nothing" },
    { name: "Murgh Tandoori", query: "" },
    { name: "", query: "" },
  ];
  for (const descriptor of [...descriptors, { label: "", query: "", aliases: ["", " "] }]) {
    const match = discovery.createDiscoveryMatcher([descriptor]);
    for (const item of items) {
      assert.equal(match(item) !== null, discovery.liveDishMatchesDescriptor(item, descriptor));
    }
  }
});
