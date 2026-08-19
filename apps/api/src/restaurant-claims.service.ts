import { Injectable, NotFoundException } from "@nestjs/common";
import type {
  RestaurantClaimContext,
  RestaurantClaimReceipt,
  RestaurantClaimRequest,
} from "@fysen/contracts";
import { getRestaurantClaimContext, requestRestaurantClaim } from "@fysen/database";
import { DatabaseService } from "./database.service.js";

@Injectable()
export class RestaurantClaimsService {
  constructor(private readonly database: DatabaseService) {}

  async context(slug: string): Promise<RestaurantClaimContext> {
    const context = await getRestaurantClaimContext(this.database.pool(), slug);
    if (!context) {
      throw new NotFoundException({ code: "RESTAURANT_NOT_FOUND", message: "Restaurant not found." });
    }
    return context;
  }

  async request(slug: string, input: RestaurantClaimRequest): Promise<RestaurantClaimReceipt> {
    const receipt = await requestRestaurantClaim(this.database.pool(), {
      restaurantSlug: slug,
      claimantName: input.claimantName,
      claimantEmail: input.claimantEmail,
      claimantRole: input.claimantRole,
      evidenceUrl: input.evidenceUrl,
      evidenceNote: input.evidenceNote,
    });
    if (!receipt) {
      throw new NotFoundException({ code: "RESTAURANT_NOT_FOUND", message: "Restaurant not found." });
    }
    return receipt;
  }
}
