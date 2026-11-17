import { describe, expect, it } from "vitest";
import {
  groceryDirectoryResponseSchema,
  groceryProductListingSchema,
  publicGroceryStatus,
} from "@fysen/contracts/grocery";

const evidence = {
  sourceUrl: "https://example.org/butikk/varer",
  checkedAt: "2026-11-17T09:00:00+01:00",
  validUntil: "2026-11-18T09:00:00+01:00",
};
const listing = {
  id: "listing-1",
  storeId: "store-1",
  productId: "product-1",
  name: "Havregryn",
  unitLabel: "1 kg",
  listingEvidence: evidence,
  priceMinor: 2590,
  currency: "NOK",
  priceEvidence: evidence,
  stockState: "unknown",
  stockEvidence: null,
} as const;

describe("grocery evidence contract", () => {
  it("keeps public retail separate from restaurant menus and private routes", () => {
    const result = groceryDirectoryResponseSchema.parse({
      version: "grocery-directory-v1",
      city: "Oslo",
      stores: [{
        id: "store-1", retailerId: "retailer-1", name: "Eksempelbutikk",
        address: "Eksempelveien 1, Oslo, Norge", latitude: 59.91, longitude: 10.75,
        locationEvidence: evidence,
      }],
      listings: [listing],
    });
    expect(result.listings).toHaveLength(1);
    expect(result.listings[0]?.stockState).toBe("unknown");
    expect("homeAddress" in result).toBe(false);
    expect("commute" in result).toBe(false);
  });

  it("rejects unsupported prices or stock claims", () => {
    expect(groceryProductListingSchema.safeParse({ ...listing, priceEvidence: null }).success).toBe(false);
    expect(groceryProductListingSchema.safeParse({
      ...listing, stockState: "confirmed_available", stockEvidence: null,
    }).success).toBe(false);
    expect(groceryProductListingSchema.safeParse({
      ...listing, priceEvidence: { ...evidence, validUntil: evidence.checkedAt },
    }).success).toBe(false);
  });

  it("removes expired price and stock availability claims", () => {
    const withStock = groceryProductListingSchema.parse({
      ...listing, stockState: "confirmed_available", stockEvidence: evidence,
    });
    expect(publicGroceryStatus(withStock, new Date("2026-11-17T11:00:00Z"))).toEqual({
      priceMinor: 2590, stockState: "confirmed_available",
    });
    expect(publicGroceryStatus(withStock, new Date("2026-11-18T09:00:00Z"))).toEqual({
      priceMinor: null, stockState: "unknown",
    });
  });

  it("never treats a missing price or unknown inventory as in-stock", () => {
    const unknown = groceryProductListingSchema.parse({
      ...listing, priceMinor: null, priceEvidence: null, stockState: "unknown", stockEvidence: null,
    });
    expect(publicGroceryStatus(unknown, new Date("2026-11-17T11:00:00Z"))).toEqual({
      priceMinor: null, stockState: "unknown",
    });
  });
  it("hides price and stock when the underlying product listing has expired", () => {
    const oldListing = groceryProductListingSchema.parse({
      ...listing,
      listingEvidence: { ...evidence, validUntil: "2026-11-17T10:00:00+01:00" },
      stockState: "confirmed_available", stockEvidence: evidence,
    });
    expect(publicGroceryStatus(oldListing, new Date("2026-11-17T11:00:00Z"))).toEqual({
      priceMinor: null, stockState: "unknown",
    });
  });

  it("rejects a store address without location evidence", () => {
    const missingLocationSource = groceryDirectoryResponseSchema.safeParse({
      version: "grocery-directory-v1", city: "Oslo",
      stores: [{
        id: "store-1", retailerId: "retailer-1", name: "Eksempelbutikk",
        address: "Eksempelveien 1, Oslo, Norge", latitude: 59.91, longitude: 10.75,
      }],
      listings: [],
    });
    expect(missingLocationSource.success).toBe(false);
  });

});
