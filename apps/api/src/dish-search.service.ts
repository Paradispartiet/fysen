import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import {
  dishSearchResponseSchema,
  type DishSearchQuery,
  type DishSearchResponse,
} from "@fysen/contracts";
import { recordSearchFunnel, searchDishes } from "@fysen/database";
import { normalizeDishName } from "@fysen/menu-core";
import { DatabaseService } from "./database.service.js";

@Injectable()
export class DishSearchService {
  constructor(@Inject(DatabaseService) private readonly databaseService: DatabaseService) {}

  async search(input: DishSearchQuery): Promise<DishSearchResponse> {
    const normalizedQuery = normalizeDishName(input.q);
    if (normalizedQuery.length === 0) {
      throw new BadRequestException({
        code: "EMPTY_NORMALIZED_DISH_QUERY",
        message: "Search query must contain letters or numbers.",
      });
    }

    const rows = await searchDishes(this.databaseService.pool(), {
      normalizedQuery,
      city: input.city,
      limit: input.limit,
    });

    let searchId: string | null = null;
    let impressionIdsByMenuItemId: Readonly<Record<string, string>> = {};
    try {
      const recorded = await recordSearchFunnel(this.databaseService.pool(), {
        normalizedQuery,
        city: input.city,
        impressions: rows.map((row, index) => ({
          menuItemId: row.menuItemId,
          restaurantId: row.restaurantId,
          rank: index + 1,
          matchType: row.matchType,
          matchScore: row.score,
        })),
      });
      searchId = recorded.searchId;
      impressionIdsByMenuItemId = recorded.impressionIdsByMenuItemId;
    } catch (error) {
      console.error("Fysen revenue funnel search attribution failed", error);
    }

    return dishSearchResponseSchema.parse({
      searchId,
      query: input.q,
      normalizedQuery,
      city: input.city,
      count: rows.length,
      results: rows.map((row) => ({
        impressionId: impressionIdsByMenuItemId[row.menuItemId] ?? null,
        menuItemId: row.menuItemId,
        snapshotId: row.snapshotId,
        menuSourceId: row.menuSourceId,
        dish: {
          name: row.dishName,
          normalizedName: row.normalizedName,
          description: row.description,
          sectionName: row.sectionName,
          priceMinor: row.priceMinor,
          currency: row.currency,
          confidence: row.confidence,
        },
        restaurant: {
          id: row.restaurantId,
          slug: row.restaurantSlug,
          name: row.restaurantName,
          websiteUrl: row.restaurantWebsiteUrl,
          address: row.restaurantAddress,
          city: row.restaurantCity,
          latitude: row.latitude,
          longitude: row.longitude,
        },
        menu: {
          sourceUrl: row.sourceUrl,
          observedAt: row.observedAt,
          lastCheckedAt: row.lastCheckedAt,
          freshUntil: row.freshUntil,
        },
        match: {
          type: row.matchType,
          score: row.score,
        },
      })),
    });
  }
}
