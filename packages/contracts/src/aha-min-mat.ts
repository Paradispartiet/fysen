import { z } from "zod";

const uuid = z.string().uuid();
const isoDateTime = z.string().datetime({ offset: true });
const token = z.string().regex(/^[A-Za-z0-9_-]{43,200}$/);
const pkce = z.string().regex(/^[A-Za-z0-9_-]{43,128}$/);

export const ahaFysenScopesSchema = z.tuple([
  z.literal("fysen:min_mat"),
  z.literal("fysen:analysis_handoff"),
]);

export const ahaConsumerSessionCreateSchema = z.object({
  authorizationCode: z.string().min(32).max(4096).regex(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/),
  codeVerifier: pkce,
  redirectUri: z.string().url().max(500),
});

export const ahaAuthorizationExchangeSchema = z.object({
  authorizationId: uuid,
  subject: z.string().trim().min(1).max(512),
  provider: z.string().trim().min(1).max(120),
  scopes: ahaFysenScopesSchema,
  policyVersion: z.literal("aha_fysen_connection_v1"),
  expiresAt: isoDateTime,
});

export const ahaConsumerSessionReceiptSchema = z.object({
  sessionToken: token,
  expiresAt: isoDateTime,
  scopes: ahaFysenScopesSchema,
  policyVersion: z.literal("aha_fysen_connection_v1"),
});

export const ahaConsumerLogoutReceiptSchema = z.object({ accepted: z.literal(true) });

export const minMatSaveInputSchema = z.object({ menuItemId: uuid });
export const minMatSavedItemIdSchema = uuid;

export const minMatItemSchema = z.object({
  savedItemId: uuid,
  menuItemId: uuid,
  snapshotId: uuid,
  restaurantId: uuid,
  dishName: z.string().trim().min(1).max(300),
  restaurantName: z.string().trim().min(1).max(200),
  restaurantSlug: z.string().trim().min(1).max(160),
  city: z.string().trim().min(1).max(120),
  priceMinor: z.number().int().nonnegative().nullable(),
  currency: z.string().length(3),
  savedAt: isoDateTime,
});

export const minMatListSchema = z.object({ items: z.array(minMatItemSchema).max(500) });

export const ahaAnalysisHandoffReceiptSchema = z.object({
  handoffToken: token,
  expiresAt: isoDateTime,
  itemCount: z.number().int().min(1).max(50),
});

export const fysenFoodCollectionV1Schema = z.object({
  version: z.literal("fysen_food_collection_v1"),
  source: z.literal("fysen"),
  purpose: z.literal("user_requested_analysis"),
  generatedAt: isoDateTime,
  privacy: z.object({
    scope: z.literal("private_user"),
    includesSearchHistory: z.literal(false),
    publicSharing: z.literal(false),
    modelTrainingAllowed: z.literal(false),
  }).strict(),
  items: z.array(z.object({
    savedItemId: uuid,
    menuItemId: uuid,
    dishName: z.string().trim().min(1).max(300),
    restaurantName: z.string().trim().min(1).max(200),
    restaurantSlug: z.string().trim().min(1).max(160),
    city: z.string().trim().min(1).max(120),
    priceMinor: z.number().int().nonnegative().nullable(),
    currency: z.string().length(3),
    savedAt: isoDateTime,
  }).strict()).max(50),
}).strict();

export type AhaConsumerSessionCreate = z.infer<typeof ahaConsumerSessionCreateSchema>;
export type AhaAuthorizationExchange = z.infer<typeof ahaAuthorizationExchangeSchema>;
export type AhaConsumerSessionReceipt = z.infer<typeof ahaConsumerSessionReceiptSchema>;
export type AhaConsumerLogoutReceipt = z.infer<typeof ahaConsumerLogoutReceiptSchema>;
export type MinMatSaveInput = z.infer<typeof minMatSaveInputSchema>;
export type MinMatItem = z.infer<typeof minMatItemSchema>;
export type MinMatList = z.infer<typeof minMatListSchema>;
export type AhaAnalysisHandoffReceipt = z.infer<typeof ahaAnalysisHandoffReceiptSchema>;
export type FysenFoodCollectionV1 = z.infer<typeof fysenFoodCollectionV1Schema>;
