import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { dishSearchQuerySchema, type DishSearchQuery, type DishSearchResponse } from "@fysen/contracts";
import { DishSearchService } from "./dish-search.service.js";

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
  constructor(private readonly dishSearchService: DishSearchService) {}

  @Get("search")
  async search(@Query() query: unknown): Promise<DishSearchResponse> {
    return this.dishSearchService.search(parseDishSearchQuery(query));
  }
}
