import { BadRequestException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import { parseDishBrowseQuery } from "./dish-search.controller.js";

describe("dish browse query parsing", () => {
  it("defaults to Oslo and trims an explicit city", () => {
    expect(parseDishBrowseQuery({})).toEqual({ city: "Oslo" });
    expect(parseDishBrowseQuery({ city: "  Bergen  " })).toEqual({ city: "Bergen" });
  });

  it("rejects empty, oversized and array-valued city parameters", () => {
    expect(() => parseDishBrowseQuery({ city: "" })).toThrow(BadRequestException);
    expect(() => parseDishBrowseQuery({ city: "x".repeat(121) })).toThrow(BadRequestException);
    expect(() => parseDishBrowseQuery({ city: ["Oslo", "Bergen"] })).toThrow(BadRequestException);
  });
});
