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

export const dishBrowseResponseSchema = z.object({
  city: z.string().trim().min(1).max(120),
  count: z.number().int().nonnegative(),
  dishes: z.array(dishBrowseItemSchema),
});

export type DishBrowseQuery = z.infer<typeof dishBrowseQuerySchema>;
export type DishBrowseItem = z.infer<typeof dishBrowseItemSchema>;
export type DishBrowseResponse = z.infer<typeof dishBrowseResponseSchema>;
