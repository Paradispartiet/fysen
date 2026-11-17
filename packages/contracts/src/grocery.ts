import { z } from "zod";

// Retail is a separate domain from Fysen's verified restaurant menu items.
// No personal commute route, home/work address or weekly plan is sent here.
const isoDateTime = z.string().datetime({ offset: true });
const id = z.string().trim().min(1).max(160);

export const groceryEvidenceSchema = z.object({
  sourceUrl: z.string().url(),
  checkedAt: isoDateTime,
  validUntil: isoDateTime,
}).superRefine((value, context) => {
  if (Date.parse(value.validUntil) <= Date.parse(value.checkedAt)) {
    context.addIssue({
      code: "custom", path: ["validUntil"],
      message: "Verification expires after the observation, not before.",
    });
  }
});

export const groceryStoreSchema = z.object({
  id,
  retailerId: id,
  name: z.string().trim().min(1).max(200),
  address: z.string().trim().min(1).max(500),
  latitude: z.number().finite().min(-90).max(90),
  longitude: z.number().finite().min(-180).max(180),
});

export const groceryProductListingSchema = z.object({
  id,
  storeId: id,
  productId: id,
  name: z.string().trim().min(1).max(300),
  unitLabel: z.string().trim().min(1).max(100),
  // A documented online listing is not a claim about physical shelf stock.
  listingEvidence: groceryEvidenceSchema,
  priceMinor: z.number().int().nonnegative().nullable(),
  currency: z.literal("NOK"),
  priceEvidence: groceryEvidenceSchema.nullable(),
  stockState: z.enum(["unknown", "confirmed_available", "confirmed_unavailable"]),
  stockEvidence: groceryEvidenceSchema.nullable(),
  // Discounts and campaign prices require a separate verified promotional contract.
}).superRefine((value, context) => {
  if (value.priceMinor !== null && !value.priceEvidence) {
    context.addIssue({
      code: "custom", path: ["priceEvidence"],
      message: "A quoted store price requires its own source and expiry.",
    });
  }
  if (value.stockState !== "unknown" && !value.stockEvidence) {
    context.addIssue({
      code: "custom", path: ["stockEvidence"],
      message: "Claiming stock availability requires explicit evidence.",
    });
  }
});

export const groceryDirectoryResponseSchema = z.object({
  version: z.literal("grocery-directory-v1"),
  city: z.string().trim().min(1).max(120),
  stores: z.array(groceryStoreSchema).max(100),
  listings: z.array(groceryProductListingSchema).max(500),
});

// Fail closed on expired data even if a previous crawl had a price or stock claim.
// Consumers may still show a store location and the published product name.
export function publicGroceryStatus(
  listing: GroceryProductListing,
  now: Date = new Date(),
): { priceMinor: number | null; stockState: GroceryProductListing["stockState"] } {
  const fresh = (evidence: GroceryEvidence | null) =>
    Boolean(evidence && Number.isFinite(now.getTime())
      && Date.parse(evidence.checkedAt) <= now.getTime()
      && Date.parse(evidence.validUntil) > now.getTime());
  return {
    priceMinor: fresh(listing.priceEvidence) ? listing.priceMinor : null,
    stockState: fresh(listing.stockEvidence) ? listing.stockState : "unknown",
  };
}

export type GroceryEvidence = z.infer<typeof groceryEvidenceSchema>;
export type GroceryStore = z.infer<typeof groceryStoreSchema>;
export type GroceryProductListing = z.infer<typeof groceryProductListingSchema>;
export type GroceryDirectoryResponse = z.infer<typeof groceryDirectoryResponseSchema>;
