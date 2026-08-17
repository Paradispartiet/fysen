import { z } from "zod";

const uuid = z.string().uuid();
const isoDateTime = z.string().datetime({ offset: true });
const sha256 = z.string().regex(/^[a-f0-9]{64}$/);

export const restaurantSchema = z.object({
  id: uuid,
  name: z.string().trim().min(1).max(200),
  websiteUrl: z.string().url().nullable(),
  address: z.string().trim().min(1).max(500),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const menuSourceTypeSchema = z.enum(["html", "json_ld", "pdf", "image", "api"]);

export const menuSourceSchema = z.object({
  id: uuid,
  restaurantId: uuid,
  url: z.string().url(),
  type: menuSourceTypeSchema,
  userAgent: z.string().trim().min(1).max(300),
  checkIntervalMinutes: z.number().int().min(5).max(10080),
  minimumExpectedItems: z.number().int().positive(),
  etag: z.string().nullable(),
  lastModified: z.string().nullable(),
  lastMenuFingerprint: sha256.nullable(),
  lastCheckedAt: isoDateTime.nullable(),
  lastChangedAt: isoDateTime.nullable(),
  enabled: z.boolean(),
});

export const menuSnapshotSchema = z.object({
  id: uuid,
  menuSourceId: uuid,
  fetchedAt: isoDateTime,
  httpStatus: z.number().int().min(100).max(599),
  responseContentType: z.string().nullable(),
  rawSha256: sha256,
  normalizedSha256: sha256,
  robotsAllowed: z.boolean(),
  fetchDurationMs: z.number().int().nonnegative(),
  extractorVersion: z.string().trim().min(1).max(100),
});

export const dishSchema = z.object({
  id: uuid,
  canonicalName: z.string().trim().min(1).max(200),
  aliases: z.array(z.string().trim().min(1).max(200)).default([]),
});

export const extractionMethodSchema = z.enum(["json_ld", "html_heuristic", "manual", "api"]);

export const menuItemSchema = z.object({
  id: uuid,
  snapshotId: uuid,
  sourceKey: sha256,
  originalName: z.string().trim().min(1).max(300),
  normalizedName: z.string().trim().min(1).max(300),
  description: z.string().trim().max(2000).nullable(),
  sectionName: z.string().trim().max(300).nullable(),
  priceMinor: z.number().int().nonnegative().nullable(),
  currency: z.string().length(3).default("NOK"),
  position: z.number().int().nonnegative(),
  extractionMethod: extractionMethodSchema,
  confidence: z.number().min(0).max(1),
  sourceExcerpt: z.string().max(2000).nullable(),
});

export const menuChangeKindSchema = z.enum(["added", "removed", "price_changed", "content_changed"]);

export const menuChangeSchema = z.object({
  id: uuid,
  menuSourceId: uuid,
  previousSnapshotId: uuid.nullable(),
  currentSnapshotId: uuid,
  itemSourceKey: sha256.nullable(),
  kind: menuChangeKindSchema,
  detectedAt: isoDateTime,
  before: z.unknown().nullable(),
  after: z.unknown().nullable(),
});

export const menuWatchOutcomeSchema = z.enum([
  "changed",
  "unchanged",
  "not_modified",
  "blocked_by_robots",
  "fetch_error",
  "extraction_error",
  "quarantined",
]);

const optionalCoordinate = (minimum: number, maximum: number) =>
  z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.coerce.number().finite().min(minimum).max(maximum).optional(),
  );

export const dishSearchSortSchema = z.enum(["relevance", "distance"]);

export const dishSearchQuerySchema = z
  .object({
    q: z.string().trim().min(2).max(80),
    city: z.string().trim().min(1).max(120).default("Oslo"),
    limit: z.coerce.number().int().min(1).max(50).default(20),
    lat: optionalCoordinate(-90, 90),
    lon: optionalCoordinate(-180, 180),
    sort: dishSearchSortSchema.default("relevance"),
  })
  .superRefine((value, context) => {
    const hasLatitude = value.lat !== undefined;
    const hasLongitude = value.lon !== undefined;

    if (hasLatitude !== hasLongitude) {
      context.addIssue({
        code: "custom",
        path: hasLatitude ? ["lon"] : ["lat"],
        message: "Latitude and longitude must be supplied together.",
      });
    }

    if (value.sort === "distance" && (!hasLatitude || !hasLongitude)) {
      context.addIssue({
        code: "custom",
        path: ["sort"],
        message: "Distance sorting requires latitude and longitude.",
      });
    }
  });

export const dishSearchMatchTypeSchema = z.enum(["exact", "prefix", "contains", "fuzzy"]);

export const restaurantActionSchema = z.object({
  url: z.string().url(),
  sourceUrl: z.string().url(),
  provider: z.string().trim().min(1).max(120).nullable(),
  verifiedAt: isoDateTime,
  expiresAt: isoDateTime,
});

export const restaurantOpeningStateSchema = z.enum(["open", "closed", "unknown"]);

export const restaurantOpeningSchema = z.object({
  state: restaurantOpeningStateSchema,
  serviceType: z.literal("kitchen"),
  sourceUrl: z.string().url().nullable(),
  verifiedAt: isoDateTime.nullable(),
  freshUntil: isoDateTime.nullable(),
});

export const dishSearchResultSchema = z.object({
  impressionId: uuid.nullable(),
  menuItemId: uuid,
  snapshotId: uuid,
  menuSourceId: uuid,
  distanceMeters: z.number().nonnegative().nullable().default(null),
  dish: z.object({
    name: z.string().trim().min(1).max(300),
    normalizedName: z.string().trim().min(1).max(300),
    description: z.string().trim().max(2000).nullable(),
    sectionName: z.string().trim().max(300).nullable(),
    priceMinor: z.number().int().nonnegative().nullable(),
    currency: z.string().length(3),
    confidence: z.number().min(0).max(1),
  }),
  restaurant: z.object({
    id: uuid,
    slug: z.string().trim().min(1).max(160),
    name: z.string().trim().min(1).max(200),
    websiteUrl: z.string().url().nullable(),
    address: z.string().trim().min(1).max(500),
    city: z.string().trim().min(1).max(120),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
  menu: z.object({
    sourceUrl: z.string().url(),
    observedAt: isoDateTime,
    lastCheckedAt: isoDateTime,
    freshUntil: isoDateTime,
  }),
  opening: restaurantOpeningSchema.default({
    state: "unknown",
    serviceType: "kitchen",
    sourceUrl: null,
    verifiedAt: null,
    freshUntil: null,
  }),
  actions: z
    .object({
      booking: restaurantActionSchema.nullable(),
      order: restaurantActionSchema.nullable(),
    })
    .default({ booking: null, order: null }),
  match: z.object({
    type: dishSearchMatchTypeSchema,
    score: z.number().min(0).max(1),
  }),
});

export const dishSearchResponseSchema = z.object({
  searchId: uuid.nullable(),
  query: z.string().trim().min(2).max(80),
  normalizedQuery: z.string().trim().min(1).max(300),
  city: z.string().trim().min(1).max(120),
  sort: dishSearchSortSchema.default("relevance"),
  count: z.number().int().nonnegative(),
  results: z.array(dishSearchResultSchema),
});

export const conversionEventTypeSchema = z.enum([
  "menu_clicked",
  "restaurant_clicked",
  "directions_clicked",
  "booking_clicked",
  "order_clicked",
]);

export const conversionEventInputSchema = z.object({
  clientEventId: uuid,
  impressionId: uuid,
  eventType: conversionEventTypeSchema,
});

export const conversionEventReceiptSchema = z.object({
  accepted: z.literal(true),
  eventId: uuid,
});

export type Restaurant = z.infer<typeof restaurantSchema>;
export type MenuSource = z.infer<typeof menuSourceSchema>;
export type MenuSnapshot = z.infer<typeof menuSnapshotSchema>;
export type Dish = z.infer<typeof dishSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type MenuChange = z.infer<typeof menuChangeSchema>;
export type MenuWatchOutcome = z.infer<typeof menuWatchOutcomeSchema>;
export type DishSearchQuery = z.infer<typeof dishSearchQuerySchema>;
export type DishSearchSort = z.infer<typeof dishSearchSortSchema>;
export type DishSearchMatchType = z.infer<typeof dishSearchMatchTypeSchema>;
export type RestaurantAction = z.infer<typeof restaurantActionSchema>;
export type RestaurantOpeningState = z.infer<typeof restaurantOpeningStateSchema>;
export type RestaurantOpening = z.infer<typeof restaurantOpeningSchema>;
export type DishSearchResult = z.infer<typeof dishSearchResultSchema>;
export type DishSearchResponse = z.infer<typeof dishSearchResponseSchema>;
export type ConversionEventType = z.infer<typeof conversionEventTypeSchema>;
export type ConversionEventInput = z.infer<typeof conversionEventInputSchema>;
export type ConversionEventReceipt = z.infer<typeof conversionEventReceiptSchema>;
