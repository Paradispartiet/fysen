import { describe, expect, it } from "vitest";
import {
  mapWithBoundedConcurrency,
  parseCatalogMaterializationConcurrency,
} from "./catalog-materialization.js";

describe("catalog materialization concurrency", () => {
  it("defaults to four workers and rejects invalid bounds", () => {
    expect(parseCatalogMaterializationConcurrency(undefined)).toBe(4);
    expect(parseCatalogMaterializationConcurrency(" 3 ")).toBe(3);
    expect(() => parseCatalogMaterializationConcurrency("0")).toThrow(/between 1 and 8/);
    expect(() => parseCatalogMaterializationConcurrency("9")).toThrow(/between 1 and 8/);
    expect(() => parseCatalogMaterializationConcurrency("4x")).toThrow(/integer between 1 and 8/);
  });

  it("preserves result order while never exceeding the worker bound", async () => {
    let active = 0;
    let maxActive = 0;

    const result = await mapWithBoundedConcurrency([0, 1, 2, 3, 4, 5], 3, async (value) => {
      active += 1;
      maxActive = Math.max(maxActive, active);
      await new Promise((resolve) => setTimeout(resolve, 8 + (5 - value)));
      active -= 1;
      return `item-${value}`;
    });

    expect(maxActive).toBe(3);
    expect(result).toEqual(["item-0", "item-1", "item-2", "item-3", "item-4", "item-5"]);
  });
});
