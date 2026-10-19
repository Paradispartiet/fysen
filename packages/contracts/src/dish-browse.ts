import { z } from "zod";

export const dishBrowseQuerySchema = z.object({
  city: z.string().trim().min(1).max(120).default("Oslo"),
});

export const dishBrowseRestaurantExampleSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(200),
  address: z.string().trim().min(1).max(500),
});

export const dishBrowseItemSchema = z.object({
  id: z.string().trim().min(1).max(360),
  name: z.string().trim().min(1).max(300),
  query: z.string().trim().min(1).max(300),
  restaurantCount: z.number().int().positive(),
  restaurantExamples: z.array(dishBrowseRestaurantExampleSchema).max(2).default([]),
});

export const recentlyAddedDishSchema = z.object({
  id: z.string().trim().min(1).max(165),
  name: z.string().trim().min(1).max(300),
  query: z.string().trim().min(1).max(300),
  restaurantName: z.string().trim().min(1).max(200),
  restaurantAddress: z.string().trim().min(1).max(500),
  priceMinor: z.number().int().nonnegative().nullable(),
  priceKind: z.enum(["exact", "from", "multiple"]),
  priceMaxMinor: z.number().int().nonnegative().nullable(),
  currency: z.string().length(3),
  sourceUrl: z.string().url(),
  detectedAt: z.string().datetime({ offset: true }),
});

export const popularDishSchema = z.object({
  id: z.string().trim().min(1).max(360),
  name: z.string().trim().min(1).max(300),
  query: z.string().trim().min(1).max(300),
  restaurantCount: z.number().int().positive(),
  searchCount: z.number().int().min(3),
});

export const dishBrowseQualitySchema = z.object({
  filterVersion: z.literal("consumer-v1"),
  rawItemCount: z.number().int().nonnegative(),
  validItemCount: z.number().int().nonnegative(),
  excludedItemCount: z.number().int().nonnegative(),
  deduplicatedItemCount: z.number().int().nonnegative(),
  exclusions: z.object({
    beverage: z.number().int().nonnegative(),
    sauce_or_side: z.number().int().nonnegative(),
    modifier: z.number().int().nonnegative(),
    allergen_or_information: z.number().int().nonnegative(),
    menu_heading: z.number().int().nonnegative(),
    invalid_fragment: z.number().int().nonnegative(),
  }),
});

export const dishBrowseResponseSchema = z.object({
  city: z.string().trim().min(1).max(120),
  count: z.number().int().nonnegative(),
  dishes: z.array(dishBrowseItemSchema),
  // Optional while older API versions are rolling out.
  recentDishes: z.array(recentlyAddedDishSchema).max(8).optional(),
  popularDishes: z.array(popularDishSchema).max(6).optional(),
  quality: dishBrowseQualitySchema,
});

export type DishBrowseQuery = z.infer<typeof dishBrowseQuerySchema>;
export type DishBrowseRestaurantExample = z.infer<typeof dishBrowseRestaurantExampleSchema>;
export type DishBrowseItem = z.infer<typeof dishBrowseItemSchema>;
export type DishBrowseResponse = z.infer<typeof dishBrowseResponseSchema>;

export type RecentlyAddedDishItem = z.infer<typeof recentlyAddedDishSchema>;
export type PopularDishItem = z.infer<typeof popularDishSchema>;
