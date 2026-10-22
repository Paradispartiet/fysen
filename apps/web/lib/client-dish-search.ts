import { dishSearchResponseSchema, type DishSearchResponse } from "@fysen/contracts";
import { dishBrowseResponseSchema, type DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { withPublicBasePath } from "./public-path";

const configuredBasePath = process.env.NEXT_PUBLIC_FYSEN_BASE_PATH?.trim() ?? "";
const defaultPreviewApiBaseUrl = "https://fysen-api.vercel.app";

export const clientPreviewApiBaseUrl = (
  process.env.NEXT_PUBLIC_FYSEN_API_BASE_URL?.trim()
  || (configuredBasePath ? defaultPreviewApiBaseUrl : "")
).replace(/\/$/, "");

function clientSearchUrl(query: string, city: string, limit: number): string {
  const params = new URLSearchParams({
    q: query,
    city,
    limit: String(limit),
    sort: "relevance",
  });

  if (configuredBasePath && clientPreviewApiBaseUrl) {
    return `${clientPreviewApiBaseUrl}/v1/dishes/search?${params.toString()}`;
  }

  return `/api/dishes/search?${params.toString()}`;
}

export async function browseDishesClient(
  city = "Oslo",
  options: { readonly signal?: AbortSignal; readonly homePreview?: boolean } = {},
): Promise<DishBrowseResponse> {
  const params = new URLSearchParams({ city: city.trim() || "Oslo" });
  if (options.homePreview) params.set("view", "home");
  const requestInit: RequestInit = {
    headers: { accept: "application/json" },
    cache: "no-store",
  };
  if (options.signal) requestInit.signal = options.signal;

  const url = configuredBasePath && clientPreviewApiBaseUrl
    ? `${clientPreviewApiBaseUrl}/v1/dishes/browse?${params.toString()}`
    : `${withPublicBasePath("/api/dishes/browse")}?${params.toString()}`;
  const response = await fetch(url, requestInit);
  if (!response.ok) {
    throw new Error(`Fysen dish browse failed with HTTP ${response.status}`);
  }

  return dishBrowseResponseSchema.parse(await response.json());
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
