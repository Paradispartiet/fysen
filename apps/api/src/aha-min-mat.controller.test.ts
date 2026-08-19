import { describe, expect, it } from "vitest";
import {
  parseAhaConsumerBearer,
  parseAhaHandoff,
  parseAhaSessionCreate,
  parseMinMatSave,
} from "./aha-min-mat.controller.js";

describe("AHA Min mat request boundaries", () => {
  it("accepts only the bounded AHA connect contract", () => {
    const parsed = parseAhaSessionCreate({
      authorizationCode: `${"a".repeat(80)}.${"b".repeat(43)}`,
      codeVerifier: "c".repeat(64),
      redirectUri: "https://fysen.example/api/aha/callback",
    });
    expect(parsed.redirectUri).toBe("https://fysen.example/api/aha/callback");
    expect(() => parseAhaSessionCreate({ ...parsed, redirectUri: "not-a-url" })).toThrow();
  });

  it("accepts only menuItemId for a Min mat save", () => {
    expect(parseMinMatSave({ menuItemId: "11111111-1111-4111-8111-111111111111" })).toEqual({
      menuItemId: "11111111-1111-4111-8111-111111111111",
    });
    expect(() => parseMinMatSave({ dishName: "Injected dish" })).toThrow();
  });

  it("keeps consumer and handoff capabilities as separate authorization schemes", () => {
    expect(parseAhaConsumerBearer(`Bearer ${"a".repeat(64)}`)).toHaveLength(64);
    expect(parseAhaHandoff(`Handoff ${"b".repeat(64)}`)).toHaveLength(64);
    expect(() => parseAhaConsumerBearer(`Handoff ${"a".repeat(64)}`)).toThrow();
    expect(() => parseAhaHandoff(`Bearer ${"b".repeat(64)}`)).toThrow();
  });
});
