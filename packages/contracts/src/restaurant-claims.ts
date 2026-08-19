import { z } from "zod";

const uuid = z.string().uuid();
const optionalHttpsUrl = z.preprocess(
  (value) => (value === "" || value === undefined || value === null ? null : value),
  z.string().url().refine((value) => value.startsWith("https://"), "Evidence URL must use HTTPS.").nullable(),
);
const optionalEvidenceNote = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : value ?? null),
  z.string().trim().min(20).max(2000).nullable(),
);

export const restaurantClaimSlugSchema = z.string().trim().min(1).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const restaurantClaimRoleSchema = z.enum(["owner", "manager", "authorized_agent"]);
export const restaurantClaimStateSchema = z.enum(["unclaimed", "under_review", "claimed"]);

export const restaurantClaimRequestSchema = z
  .object({
    claimantName: z.string().trim().min(2).max(160),
    claimantEmail: z.string().trim().toLowerCase().email().max(320),
    claimantRole: restaurantClaimRoleSchema,
    evidenceUrl: optionalHttpsUrl,
    evidenceNote: optionalEvidenceNote,
  })
  .superRefine((value, context) => {
    if (value.evidenceUrl || value.evidenceNote) return;
    context.addIssue({
      code: "custom",
      path: ["evidenceNote"],
      message: "Add a verification URL or describe how the affiliation can be verified.",
    });
  });

export const restaurantClaimContextSchema = z.object({
  restaurant: z.object({
    slug: restaurantClaimSlugSchema,
    name: z.string().trim().min(1).max(200),
    address: z.string().trim().min(1).max(500),
    city: z.string().trim().min(1).max(120),
  }),
  claimState: restaurantClaimStateSchema,
});

export const restaurantClaimReceiptSchema = z.object({
  claimId: uuid,
  status: z.literal("pending"),
  duplicate: z.boolean(),
});

export type RestaurantClaimRole = z.infer<typeof restaurantClaimRoleSchema>;
export type RestaurantClaimState = z.infer<typeof restaurantClaimStateSchema>;
export type RestaurantClaimRequest = z.infer<typeof restaurantClaimRequestSchema>;
export type RestaurantClaimContext = z.infer<typeof restaurantClaimContextSchema>;
export type RestaurantClaimReceipt = z.infer<typeof restaurantClaimReceiptSchema>;
