import { z } from "zod";

const httpsUrl = z
  .string()
  .trim()
  .max(2000)
  .url()
  .refine((value) => {
    try {
      const url = new URL(value);
      return value.startsWith("https://") && !url.username && !url.password;
    } catch {
      return false;
    }
  }, "Bruk en HTTPS-lenke uten brukernavn eller passord.");

const optionalHttpsUrl = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  httpsUrl.optional(),
);

export const restaurantIntakeRequestSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(200)
      .refine((value) => !/[\r\n]/u.test(value)),
    address: z
      .string()
      .trim()
      .min(5)
      .max(500)
      .regex(/\b\d{4}\s+Oslo$/iu, "Oppgi gateadresse, postnummer og Oslo."),
    websiteUrl: optionalHttpsUrl,
    menuUrl: httpsUrl,
    sourceType: z.enum(["html", "json_ld", "pdf", "api"]).default("html"),
    fetchMode: z.enum(["http", "browser"]).default("http"),
    bookingUrl: optionalHttpsUrl,
    orderUrl: optionalHttpsUrl,
    actionSourceUrl: optionalHttpsUrl,
    coverageNote: z.string().trim().min(20).max(1000),
  })
  .superRefine((value, context) => {
    if (
      value.fetchMode === "browser" &&
      !["html", "json_ld"].includes(value.sourceType)
    ) {
      context.addIssue({
        code: "custom",
        path: ["fetchMode"],
        message: "Nettleserhenting støtter HTML og JSON-LD.",
      });
    }
    if ((value.bookingUrl || value.orderUrl) && !value.actionSourceUrl) {
      context.addIssue({
        code: "custom",
        path: ["actionSourceUrl"],
        message: "Oppgi siden som publiserer booking-/bestillingslenkene.",
      });
    }
  });

export const restaurantIntakeReceiptSchema = z.object({
  status: z.literal("pending_validation"),
  pullRequestUrl: z.string().url(),
  seedPath: z.string(),
});

export type RestaurantIntakeRequest = z.infer<
  typeof restaurantIntakeRequestSchema
>;
