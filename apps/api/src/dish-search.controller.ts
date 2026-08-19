import { BadRequestException, Controller, Get, Inject, Query } from "@nestjs/common";
import { dishBrowseQuerySchema, type DishBrowseQuery, type DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { dishSearchQuerySchema, type DishSearchQuery, type DishSearchResponse } from "@fysen/contracts";
import { DishSearchService } from "./dish-search.service.js";

export function parseDishBrowseQuery(value: unknown): DishBrowseQuery {
  const parsed = dishBrowseQuerySchema.safeParse(value);
  if (parsed.success) return parsed.data;

  throw new BadRequestException({
    code: "INVALID_DISH_BROWSE_QUERY",
    message: "Invalid dish browse query.",
    issues: parsed.error.issues.map((issue) => ({
      path: issue.path.join("."),
      code: issue.code,
      message: issue.message,
    })),
  });
}

export function parseDishSearchQuery(value: unknown): DishSearchQuery {
  const parsed = dishSearchQuerySchema.safeParse(value);
  if (parsed.success) return parsed.data;

  throw new BadRequestException({
    code: "INVALID_DISH_SEARCH_QUERY",
    message: "Invalid dish search query.",
    issues: parsed.error.issues.map((issue) => ({
      path: issue.path.join("."),
      code: issue.code,
      message: issue.message,
    })),
  });
}

@Controller("dishes")
export class DishSearchController {
  constructor(@Inject(DishSearchService) private readonly dishSearchService: DishSearchService) {}

  @Get("browse")
  async browse(@Query() query: unknown): Promise<DishBrowseResponse> {
    return this.dishSearchService.browse(parseDishBrowseQuery(query));
  }

  @Get("search")
  async search(@Query() query: unknown): Promise<DishSearchResponse> {
    return this.dishSearchService.search(parseDishSearchQuery(query));
  }
}
