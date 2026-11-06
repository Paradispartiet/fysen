import { describe, expect, it } from "vitest";
import {
  parsePublicMenuArchive,
  searchPublicMenuArchive,
  normalizeArchiveQuery,
} from "./verified-menu-archive.js";

const metadata = {
  version: 1,
  archiveDate: "2026-11-02",
  lastRefreshAt: "2026-11-06T01:44:08Z",
  restaurants: 3,
  sources: 3,
  dishes: 4,
  sourceQuarantines: {
    0: {
      slug: "falafel-station-brugata-oslo",
      code: "identity-unverified",
    },
  },
};

const index = {
  version: 1,
  archiveDate: "2026-11-02",
  restaurants: [
    ["Unverified Falafel Station", "falafel-station-brugata-oslo", "Brugata 1", "Oslo", ""],
    ["King Falafel", "king-falafel-brugata-oslo", "Brugata 2", "Oslo", ""],
    ["Another Ramen Place", "another-ramen-place-oslo", "Rettgata 2", "Oslo", ""],
  ],
  sources: [
    [0, "https://example.org/falafel", "2026-11-05T09:00:00Z"],
    [1, "https://example.org/king", "2026-11-02T11:00:00Z"],
    [2, "https://example.org/ramen", "2026-11-04T12:00:00Z"],
  ],
  items: [
    [0, "Ramen", "ramen", 19000, "exact", null, "", ""],
    [1, "Ramen", "ramen", 20000, "exact", null, "", ""],
    [2, "Spicy ramen", "spicy ramen", 24900, "exact", null, "", ""],
    [2, "Ramen", "ramen", 23500, "exact", null, "", ""],
  ],
};

describe("public verified menu archive fallback", () => {
  it("never reopens an identity quarantine and does not suppress valid nearby restaurants", () => {
    const archive = parsePublicMenuArchive(metadata, index);
    const matches = searchPublicMenuArchive(archive, "ramen");
    expect(matches).toHaveLength(3);
    expect(matches.every((item) => item.restaurantSlug !== "falafel-station-brugata-oslo")).toBe(true);
    expect(matches.some((item) => item.restaurantSlug === "king-falafel-brugata-oslo")).toBe(true);
    expect(matches.map((item) => item.observedAt)).toContain("2026-11-02T11:00:00Z");
    expect(archive.archiveDate).toBe("2026-11-02");
  });

  it("fails closed if source quarantine metadata is absent", () => {
    expect(() => parsePublicMenuArchive({
      ...metadata,
      sourceQuarantines: {},
    }, index)).toThrow(/quarantine/u);
  });

  it("fails closed if the downloaded archive does not match the manifest", () => {
    expect(() => parsePublicMenuArchive({
      ...metadata,
      dishes: 5,
    }, index)).toThrow(/mismatch/u);
  });

  it("never broadens short or wrong-city searches", () => {
    const archive = parsePublicMenuArchive(metadata, index);
    expect(searchPublicMenuArchive(archive, "r")).toEqual([]);
    expect(searchPublicMenuArchive(archive, "ramen", "Bergen")).toEqual([]);
    expect(normalizeArchiveQuery("  RåMEN!!! ")).toBe("råmen");
  });
});
