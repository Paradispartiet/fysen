import { z } from "zod";

export const dishBrowseQuerySchema = z.object({
  city: z.string().trim().min(1).max(120).default("Oslo"),
});

export const dishBrowseItemSchema = z.object({
  id: z.string().trim().min(1).max(360),
  name: z.string().trim().min(1).max(300),
  query: z.string().trim().min(1).max(300),
  restaurantCount: z.number().int().positive(),
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
  quality: dishBrowseQualitySchema,
});

export type DishBrowseQuery = z.infer<typeof dishBrowseQuerySchema>;
export type DishBrowseItem = z.infer<typeof dishBrowseItemSchema>;
export type DishBrowseResponse = z.infer<typeof dishBrowseResponseSchema>;
