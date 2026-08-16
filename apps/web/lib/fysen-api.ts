import {
  dishSearchQuerySchema,
  dishSearchResponseSchema,
  type DishSearchQuery,
  type DishSearchResponse,
} from "@fysen/contracts";

function apiBaseUrl(): string {
  const configured = process.env.FYSEN_API_BASE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:3001";
  throw new Error("FYSEN_API_BASE_URL is required in production");
}

export async function searchDishes(input: DishSearchQuery): Promise<DishSearchResponse> {
  const query = dishSearchQuerySchema.parse(input);
  const params = new URLSearchParams({
    q: query.q,
    city: query.city,
    limit: String(query.limit),
  });

  const response = await fetch(`${apiBaseUrl()}/v1/dishes/search?${params.toString()}`, {
    cache: "no-store",
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`Fysen API dish search failed with HTTP ${response.status}`);
  }

  return dishSearchResponseSchema.parse(await response.json());
}
