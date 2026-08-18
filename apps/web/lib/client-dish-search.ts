import { dishSearchResponseSchema, type DishSearchResponse } from "@fysen/contracts";

const configuredBasePath = process.env.NEXT_PUBLIC_FYSEN_BASE_PATH?.trim() ?? "";
const configuredPreviewApi = process.env.NEXT_PUBLIC_FYSEN_API_BASE_URL?.trim().replace(/\/$/, "") ?? "";

function clientSearchUrl(query: string, city: string, limit: number): string {
  const params = new URLSearchParams({
    q: query,
    city,
    limit: String(limit),
    sort: "relevance",
  });

  if (configuredBasePath && configuredPreviewApi) {
    return `${configuredPreviewApi}/v1/dishes/search?${params.toString()}`;
  }

  return `/api/dishes/search?${params.toString()}`;
}

export async function searchDishesClient(
  query: string,
  options: { readonly city?: string; readonly limit?: number; readonly signal?: AbortSignal } = {},
): Promise<DishSearchResponse> {
  const city = options.city?.trim() || "Oslo";
  const limit = options.limit ?? 6;
  const requestInit: RequestInit = {
    headers: { accept: "application/json" },
  };
  if (options.signal) requestInit.signal = options.signal;

  const response = await fetch(clientSearchUrl(query, city, limit), requestInit);

  if (!response.ok) {
    throw new Error(`Fysen dish exploration failed with HTTP ${response.status}`);
  }

  return dishSearchResponseSchema.parse(await response.json());
}
