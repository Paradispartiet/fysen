import { BadRequestException, Injectable, type OnApplicationShutdown } from "@nestjs/common";
import {
  dishSearchResponseSchema,
  type DishSearchQuery,
  type DishSearchResponse,
} from "@fysen/contracts";
import { createDatabasePool, searchDishes } from "@fysen/database";
import { normalizeDishName } from "@fysen/menu-core";
import type { Pool } from "pg";

@Injectable()
export class DishSearchService implements OnApplicationShutdown {
  private pool: Pool | null = null;

  private database(): Pool {
    this.pool ??= createDatabasePool({ maxConnections: 10 });
    return this.pool;
  }

  async search(input: DishSearchQuery): Promise<DishSearchResponse> {
    const normalizedQuery = normalizeDishName(input.q);
    if (normalizedQuery.length === 0) {
      throw new BadRequestException({
        code: "EMPTY_NORMALIZED_DISH_QUERY",
        message: "Search query must contain letters or numbers.",
      });
    }

    const rows = await searchDishes(this.database(), {
      normalizedQuery,
      city: input.city,
      limit: input.limit,
    });

    return dishSearchResponseSchema.parse({
      query: input.q,
      normalizedQuery,
      city: input.city,
      count: rows.length,
      results: rows.map((row) => ({
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

  async onApplicationShutdown(): Promise<void> {
    if (!this.pool) return;
    const pool = this.pool;
    this.pool = null;
    await pool.end();
  }
}
