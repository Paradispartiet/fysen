import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { z } from "zod";

const httpsUrl = z.string().url().refine((value) => value.startsWith("https://"), "URL must use HTTPS");
const httpsOrigin = z.string().url().transform((value, context) => {
  const parsed = new URL(value);
  if (
    parsed.protocol !== "https:" ||
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash
  ) {
    context.addIssue({
      code: "custom",
      message: "Support origin must be an exact HTTPS origin without credentials, path, query or fragment",
    });
    return z.NEVER;
  }
  return parsed.origin;
});

const sourceSupportSchema = z
  .object({
    redirectOrigins: z.array(httpsOrigin).max(2).default([]),
    browserDataOrigins: z.array(httpsOrigin).max(3).default([]),
  })
  .default({ redirectOrigins: [], browserDataOrigins: [] });

const requiredDishVariantSchema = z
  .object({
    name: z.string().trim().min(2).max(300),
    sectionName: z.string().trim().min(1).max(300).optional(),
    priceMinor: z.number().int().nonnegative().optional(),
    priceKind: z.enum(["exact", "from", "multiple"]).optional(),
    priceMaxMinor: z.number().int().nonnegative().optional(),
  })
  .superRefine((variant, context) => {
    if (variant.priceKind === "multiple") {
      if (variant.priceMinor === undefined) {
        context.addIssue({ code: "custom", path: ["priceMinor"], message: "multiple price assertion requires priceMinor" });
      }
      if (variant.priceMaxMinor === undefined) {
        context.addIssue({ code: "custom", path: ["priceMaxMinor"], message: "multiple price assertion requires priceMaxMinor" });
      }
      if (
        variant.priceMinor !== undefined &&
        variant.priceMaxMinor !== undefined &&
        variant.priceMaxMinor < variant.priceMinor
      ) {
        context.addIssue({ code: "custom", path: ["priceMaxMinor"], message: "priceMaxMinor must be >= priceMinor" });
      }
    } else if (variant.priceMaxMinor !== undefined) {
      context.addIssue({
        code: "custom",
        path: ["priceMaxMinor"],
        message: "priceMaxMinor is only valid for multiple price assertions",
      });
    }

    if (variant.priceKind === "from" && variant.priceMinor === undefined) {
      context.addIssue({ code: "custom", path: ["priceMinor"], message: "from price assertion requires priceMinor" });
    }
  });

const hoursVerificationSchema = z.object({
  status: z.enum(["provisional", "unverified"]),
  checkedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "checkedAt must use YYYY-MM-DD"),
  note: z.string().trim().min(1).max(1000),
});

export const restaurantOnboardingManifestSchema = z
  .object({
    version: z.literal(1),
    restaurant: z.object({
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(160),
      name: z.string().trim().min(1).max(200),
      websiteUrl: httpsUrl.nullable(),
      address: z.string().trim().min(1).max(500),
      city: z.string().trim().min(1).max(120),
      countryCode: z.string().regex(/^[A-Z]{2}$/),
      latitude: z.number().finite().min(-90).max(90),
      longitude: z.number().finite().min(-180).max(180),
    }),
    menuSource: z.object({
      url: httpsUrl,
      sourceType: z.enum(["html", "json_ld", "pdf"]),
      fetchMode: z.enum(["http", "browser"]).default("http"),
      userAgent: z.string().trim().min(1).max(300).default("FysenMenuBot/0.1"),
      checkIntervalMinutes: z.number().int().min(60).max(10080),
      minimumExpectedItems: z.number().int().min(1).max(500),
      sourceSupport: sourceSupportSchema,
    }),
    hoursSource: z
      .object({
        url: httpsUrl,
        timeZone: z.string().trim().min(1).max(100),
        checkIntervalMinutes: z.number().int().min(60).max(10080),
        minimumExpectedIntervals: z.number().int().min(1).max(14),
        scopeHints: z.array(z.string().trim().min(1).max(80)).max(8).default([]),
      })
      .optional(),
    verification: z
      .object({
        hours: hoursVerificationSchema.optional(),
      })
      .default({}),
    actions: z
      .array(
        z.object({
          type: z.enum(["booking", "order"]),
          url: httpsUrl,
          sourceUrl: httpsUrl,
          provider: z.string().trim().min(1).max(120).nullable().default(null),
        }),
      )
      .max(2)
      .default([]),
    qualityAssertions: z.object({
      requiredDishNames: z.array(z.string().trim().min(2).max(300)).min(1).max(20),
      requiredDishVariants: z.array(requiredDishVariantSchema).max(20).default([]),
      forbiddenDishNames: z.array(z.string().trim().min(2).max(300)).max(20).default([]),
    }),
  })
  .superRefine((manifest, context) => {
    if (manifest.menuSource.fetchMode === "browser" && manifest.menuSource.sourceType === "pdf") {
      context.addIssue({
        code: "custom",
        path: ["menuSource", "fetchMode"],
        message: "Browser fetch mode only supports HTML/JSON-LD sources",
      });
    }

    const sourceOrigin = new URL(manifest.menuSource.url).origin;
    const support = manifest.menuSource.sourceSupport;
    for (const [field, origins] of [
      ["redirectOrigins", support.redirectOrigins],
      ["browserDataOrigins", support.browserDataOrigins],
    ] as const) {
      if (new Set(origins).size !== origins.length) {
        context.addIssue({
          code: "custom",
          path: ["menuSource", "sourceSupport", field],
          message: "Support origins must be unique",
        });
      }
      if (origins.includes(sourceOrigin)) {
        context.addIssue({
          code: "custom",
          path: ["menuSource", "sourceSupport", field],
          message: "The declared menu source origin is already allowed and must not be repeated",
        });
      }
    }
    if (manifest.menuSource.fetchMode !== "browser" && support.browserDataOrigins.length > 0) {
      context.addIssue({
        code: "custom",
        path: ["menuSource", "sourceSupport", "browserDataOrigins"],
        message: "browserDataOrigins require browser fetch mode",
      });
    }
    if (support.redirectOrigins.some((origin) => support.browserDataOrigins.includes(origin))) {
      context.addIssue({
        code: "custom",
        path: ["menuSource", "sourceSupport"],
        message: "A redirect origin already permits browser data and must not also be listed as browserDataOrigins",
      });
    }

    if (manifest.verification.hours?.status === "provisional" && !manifest.hoursSource) {
      context.addIssue({
        code: "custom",
        path: ["verification", "hours", "status"],
        message: "Provisional opening hours require an hoursSource to keep monitoring",
      });
    }
  });

export type RestaurantOnboardingManifest = z.infer<typeof restaurantOnboardingManifestSchema>;
export type MenuSourceSupport = RestaurantOnboardingManifest["menuSource"]["sourceSupport"];
export type HoursVerificationStatus = "verified" | "provisional" | "unverified";

export function getHoursVerificationStatus(manifest: RestaurantOnboardingManifest): HoursVerificationStatus {
  return manifest.verification.hours?.status ?? "verified";
}

export function isHoursVerificationBlocking(manifest: RestaurantOnboardingManifest): boolean {
  return getHoursVerificationStatus(manifest) === "verified";
}

export async function readRestaurantOnboardingManifest(path: string): Promise<RestaurantOnboardingManifest> {
  const raw = await readFile(path, "utf8");
  return restaurantOnboardingManifestSchema.parse(JSON.parse(raw) as unknown);
}

export async function listRestaurantOnboardingManifests(
  directory = resolve(process.cwd(), "catalog"),
): Promise<readonly { readonly path: string; readonly manifest: RestaurantOnboardingManifest }[]> {
  const fileNames = (await readdir(directory)).filter((fileName) => fileName.endsWith(".json")).sort();
  const manifests = [];
  for (const fileName of fileNames) {
    const path = resolve(directory, fileName);
    manifests.push({ path, manifest: await readRestaurantOnboardingManifest(path) });
  }
  return manifests;
}
