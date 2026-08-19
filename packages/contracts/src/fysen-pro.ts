import { z } from "zod";

export const fysenProSetupRedeemSchema = z.object({
  setupToken: z.string().trim().min(32).max(200),
});

export const fysenProSessionReceiptSchema = z.object({
  sessionToken: z.string().min(32).max(200),
  expiresAt: z.string().datetime(),
});

export const fysenProClickBreakdownSchema = z.object({
  menu: z.number().int().nonnegative(),
  restaurant: z.number().int().nonnegative(),
  directions: z.number().int().nonnegative(),
  booking: z.number().int().nonnegative(),
  order: z.number().int().nonnegative(),
});

export const fysenProDashboardSchema = z.object({
  restaurant: z.object({
    slug: z.string().min(1),
    name: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
  }),
  periodDays: z.literal(30),
  metrics: z.object({
    impressions: z.number().int().nonnegative(),
    clicks: z.number().int().nonnegative(),
    ctr: z.number().min(0).max(1),
    clickBreakdown: fysenProClickBreakdownSchema,
  }),
  topDishes: z.array(z.object({
    name: z.string().min(1),
    impressions: z.number().int().nonnegative(),
    clicks: z.number().int().nonnegative(),
  })).max(10),
  menuSources: z.array(z.object({
    url: z.string().url(),
    enabled: z.boolean(),
    lastCheckedAt: z.string().datetime().nullable(),
    freshUntil: z.string().datetime().nullable(),
    consecutiveFailures: z.number().int().nonnegative(),
    latestOutcome: z.string().nullable(),
  })),
  actions: z.array(z.object({
    type: z.enum(["booking", "order"]),
    enabled: z.boolean(),
    verifiedAt: z.string().datetime(),
    expiresAt: z.string().datetime(),
    publishable: z.boolean(),
  })),
  cityDemandGaps: z.array(z.object({
    query: z.string().min(1),
    searches7d: z.number().int().min(3),
    signal: z.enum(["zero_result", "fuzzy_only", "zero_and_fuzzy"]),
  })).max(5),
});

export const fysenProLogoutReceiptSchema = z.object({ accepted: z.literal(true) });

export type FysenProSetupRedeem = z.infer<typeof fysenProSetupRedeemSchema>;
export type FysenProSessionReceipt = z.infer<typeof fysenProSessionReceiptSchema>;
export type FysenProDashboard = z.infer<typeof fysenProDashboardSchema>;
export type FysenProLogoutReceipt = z.infer<typeof fysenProLogoutReceiptSchema>;
