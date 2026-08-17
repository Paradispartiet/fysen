import { dishSearchResponseSchema } from "@fysen/contracts";
import { describe, expect, it } from "vitest";

describe("dish search rolling deploy compatibility", () => {
  it("defaults additive restaurant and canonical data from older API contracts", () => {
    const response = dishSearchResponseSchema.parse({
      searchId: "d1a09b35-a225-45bf-9f74-d80fed5f919f",
      query: "tartar",
      normalizedQuery: "tartar",
      city: "Oslo",
      count: 1,
      results: [
        {
          impressionId: "83f13af7-577e-42e3-b2b9-470c6ec5cd23",
          menuItemId: "96eda258-6cd1-4cb3-b50a-91fa7c33b550",
          snapshotId: "b5875695-0f29-4280-9eba-0f0909460009",
          menuSourceId: "d4ebb33f-32e6-4b16-8d56-de7fb5c035fd",
          dish: {
            name: "Tartar av okse",
            normalizedName: "tartar av okse",
            description: "steinsopp & sylta kantareller",
            sectionName: null,
            priceMinor: 26500,
            currency: "NOK",
            confidence: 0.78,
          },
          restaurant: {
            id: "cefb3f75-6d92-4cb3-b17b-ce0325498613",
            slug: "rodeo-oslo",
            name: "Rodeo",
            websiteUrl: "https://www.rodeooslo.no/",
            address: "Sannergata 2",
            city: "Oslo",
            latitude: 59.9285684,
            longitude: 10.758157,
          },
          menu: {
            sourceUrl: "https://www.rodeooslo.no/",
            observedAt: "2026-08-16T21:01:42.818Z",
            lastCheckedAt: "2026-08-17T03:15:22.523Z",
            freshUntil: "2026-08-18T03:15:22.523Z",
          },
          match: {
            type: "prefix",
            score: 0.95,
          },
        },
      ],
    });

    expect(response.results[0]?.actions).toEqual({ booking: null, order: null });
    expect(response.results[0]?.opening).toEqual({
      state: "unknown",
      serviceType: "kitchen",
      sourceUrl: null,
      verifiedAt: null,
      freshUntil: null,
    });
    expect(response.results[0]?.distanceMeters).toBeNull();
    expect(response.results[0]?.match.canonicalDish).toBeNull();
  });
});
