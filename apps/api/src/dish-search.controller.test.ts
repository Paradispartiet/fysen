import { BadRequestException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import { parseDishSearchQuery } from "./dish-search.controller.js";

describe("dish search query parsing", () => {
  it("applies safe defaults and coerces the result limit", () => {
    expect(parseDishSearchQuery({ q: "  Biff tartar  " })).toEqual({
      q: "Biff tartar",
      city: "Oslo",
      limit: 20,
      sort: "relevance",
    });

    expect(parseDishSearchQuery({ q: "ramen", city: "Bergen", limit: "5" })).toEqual({
      q: "ramen",
      city: "Bergen",
      limit: 5,
      sort: "relevance",
    });
  });

  it("accepts an explicit location and distance sorting", () => {
    expect(
      parseDishSearchQuery({
        q: "tartar",
        lat: "59.9239",
        lon: "10.7522",
        sort: "distance",
      }),
    ).toEqual({
      q: "tartar",
      city: "Oslo",
      limit: 20,
      lat: 59.9239,
      lon: 10.7522,
      sort: "distance",
    });
  });

  it("rejects incomplete, invalid and ungrounded proximity parameters", () => {
    expect(() => parseDishSearchQuery({ q: "tartar", lat: "59.9" })).toThrow(BadRequestException);
    expect(() => parseDishSearchQuery({ q: "tartar", lon: "10.7" })).toThrow(BadRequestException);
    expect(() => parseDishSearchQuery({ q: "tartar", lat: "91", lon: "10.7" })).toThrow(BadRequestException);
    expect(() => parseDishSearchQuery({ q: "tartar", sort: "distance" })).toThrow(BadRequestException);
  });

  it("rejects missing, oversized and array-valued public query parameters", () => {
    expect(() => parseDishSearchQuery({})).toThrow(BadRequestException);
    expect(() => parseDishSearchQuery({ q: "a" })).toThrow(BadRequestException);
    expect(() => parseDishSearchQuery({ q: "ramen", limit: "500" })).toThrow(BadRequestException);
    expect(() => parseDishSearchQuery({ q: ["ramen", "tartar"] })).toThrow(BadRequestException);
  });
});
