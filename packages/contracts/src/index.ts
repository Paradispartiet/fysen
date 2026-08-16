import { z } from "zod";

const uuid = z.string().uuid();
const isoDateTime = z.string().datetime({ offset: true });

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
  lastCheckedAt: isoDateTime.nullable(),
  lastChangedAt: isoDateTime.nullable(),
  enabled: z.boolean(),
});

export const dishSchema = z.object({
  id: uuid,
  canonicalName: z.string().trim().min(1).max(200),
  aliases: z.array(z.string().trim().min(1).max(200)).default([]),
});

export const menuItemSchema = z.object({
  id: uuid,
  restaurantId: uuid,
  menuSourceId: uuid,
  dishId: uuid.nullable(),
  originalName: z.string().trim().min(1).max(300),
  description: z.string().trim().max(2000).nullable(),
  priceMinor: z.number().int().nonnegative().nullable(),
  currency: z.string().length(3).default("NOK"),
  available: z.boolean(),
  firstSeenAt: isoDateTime,
  lastSeenAt: isoDateTime,
  lastVerifiedAt: isoDateTime,
  sourceUrl: z.string().url(),
  confidence: z.number().min(0).max(1),
});

export const menuChangeKindSchema = z.enum(["added", "removed", "price_changed", "content_changed"]);

export const menuChangeSchema = z.object({
  id: uuid,
  menuSourceId: uuid,
  menuItemId: uuid.nullable(),
  kind: menuChangeKindSchema,
  detectedAt: isoDateTime,
  before: z.unknown().nullable(),
  after: z.unknown().nullable(),
});

export type Restaurant = z.infer<typeof restaurantSchema>;
export type MenuSource = z.infer<typeof menuSourceSchema>;
export type Dish = z.infer<typeof dishSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type MenuChange = z.infer<typeof menuChangeSchema>;
