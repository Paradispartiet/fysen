import { BadRequestException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import { parseDishSearchQuery } from "./dish-search.controller.js";

describe("dish search query parsing", () => {
  it("applies safe defaults and coerces the result limit", () => {
    expect(parseDishSearchQuery({ q: "  Biff tartar  " })).toEqual({
      q: "Biff tartar",
      city: "Oslo",
      limit: 20,
    });

    expect(parseDishSearchQuery({ q: "ramen", city: "Bergen", limit: "5" })).toEqual({
      q: "ramen",
      city: "Bergen",
      limit: 5,
    });
  });

  it("rejects missing, oversized and array-valued public query parameters", () => {
    expect(() => parseDishSearchQuery({})).toThrow(BadRequestException);
    expect(() => parseDishSearchQuery({ q: "a" })).toThrow(BadRequestException);
    expect(() => parseDishSearchQuery({ q: "ramen", limit: "500" })).toThrow(BadRequestException);
    expect(() => parseDishSearchQuery({ q: ["ramen", "tartar"] })).toThrow(BadRequestException);
  });
});
