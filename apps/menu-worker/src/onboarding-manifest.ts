import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { z } from "zod";

const httpsUrl = z.string().url().refine((value) => value.startsWith("https://"), "URL must use HTTPS");

export const restaurantOnboardingManifestSchema = z.object({
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
    sourceType: z.enum(["html", "json_ld"]),
    userAgent: z.string().trim().min(1).max(300).default("FysenMenuBot/0.1"),
    checkIntervalMinutes: z.number().int().min(60).max(10080),
    minimumExpectedItems: z.number().int().min(1).max(500),
  }),
  hoursSource: z
    .object({
      url: httpsUrl,
      timeZone: z.string().trim().min(1).max(100),
      checkIntervalMinutes: z.number().int().min(60).max(10080),
      minimumExpectedIntervals: z.number().int().min(1).max(14),
    })
    .optional(),
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
  }),
});

export type RestaurantOnboardingManifest = z.infer<typeof restaurantOnboardingManifestSchema>;

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
