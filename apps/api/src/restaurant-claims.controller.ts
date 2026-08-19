import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
} from "@nestjs/common";
import {
  restaurantClaimRequestSchema,
  restaurantClaimSlugSchema,
  type RestaurantClaimContext,
  type RestaurantClaimReceipt,
  type RestaurantClaimRequest,
} from "@fysen/contracts/restaurant-claims";
import { RestaurantClaimsService } from "./restaurant-claims.service.js";

function badRequest(code: string, message: string, issues?: readonly unknown[]): never {
  throw new BadRequestException({ code, message, ...(issues ? { issues } : {}) });
}

export function parseRestaurantClaimSlug(value: unknown): string {
  const parsed = restaurantClaimSlugSchema.safeParse(value);
  if (parsed.success) return parsed.data;
  return badRequest("INVALID_RESTAURANT_SLUG", "Invalid restaurant slug.");
}

export function parseRestaurantClaimRequest(value: unknown): RestaurantClaimRequest {
  const parsed = restaurantClaimRequestSchema.safeParse(value);
  if (parsed.success) return parsed.data;
  return badRequest(
    "INVALID_RESTAURANT_CLAIM",
    "Invalid restaurant claim.",
    parsed.error.issues.map((issue) => ({
      path: issue.path.join("."),
      code: issue.code,
      message: issue.message,
    })),
  );
}

@Controller("restaurants")
export class RestaurantClaimsController {
  constructor(@Inject(RestaurantClaimsService) private readonly service: RestaurantClaimsService) {}

  @Get(":slug/claim")
  async context(@Param("slug") slug: string): Promise<RestaurantClaimContext> {
    return this.service.context(parseRestaurantClaimSlug(slug));
  }

  @Post(":slug/claims")
  @HttpCode(202)
  async request(
    @Param("slug") slug: string,
    @Body() body: unknown,
  ): Promise<RestaurantClaimReceipt> {
    return this.service.request(parseRestaurantClaimSlug(slug), parseRestaurantClaimRequest(body));
  }
}
