import type { ArchivedMenuMatch } from "./verified-menu-archive";
import { clientPreviewApiBaseUrl } from "./client-dish-search";

export interface ArchiveBrowseSuggestion {
  readonly name: string;
  readonly query: string;
  readonly restaurantCount: number;
}

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid Fysen archive response");
  }
  return value as Record<string, unknown>;
}

function validText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validHttpUrl(value: unknown): value is string {
  if (!validText(value)) return false;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function validPrice(value: unknown): value is number | null {
  return value === null || (typeof value === "number" && Number.isSafeInteger(value) && value >= 0);
}

async function requestArchive(
  endpoint: "browse" | "search",
  params: URLSearchParams,
  signal?: AbortSignal,
): Promise<Record<string, unknown>> {
  if (!clientPreviewApiBaseUrl) throw new Error("Fysen archive API is not configured");
  const response = await fetch(
    `${clientPreviewApiBaseUrl}/v1/dishes/archive/${endpoint}?${params.toString()}`,
    { headers: { accept: "application/json" }, signal },
  );
  if (!response.ok) throw new Error(`Fysen archive API returned HTTP ${response.status}`);
  const body: unknown = await response.json();
  const result = object(body);
  if (result.source !== "verified-menu-archive" || result.realtime !== false) {
    throw new Error("Fysen archive provenance was not verified");
  }
  return result;
}

export async function browsePublicArchiveClient(
  city: string,
  signal?: AbortSignal,
): Promise<readonly ArchiveBrowseSuggestion[]> {
  const body = await requestArchive("browse", new URLSearchParams({ city }), signal);
  if (!Array.isArray(body.dishes) || !body.dishes.every((value: unknown) => {
    const dish = object(value);
    return validText(dish.name) && validText(dish.query) &&
      typeof dish.restaurantCount === "number" && Number.isInteger(dish.restaurantCount) && dish.restaurantCount >= 0;
  })) {
    throw new Error("Invalid Fysen archive browse data");
  }
  return body.dishes.map((value: unknown) => {
    const dish = object(value);
    return {
      name: dish.name as string,
      query: dish.query as string,
      restaurantCount: dish.restaurantCount as number,
    };
  });
}

export async function searchPublicArchiveClient(
  query: string,
  city: string,
  signal?: AbortSignal,
): Promise<readonly ArchivedMenuMatch[]> {
  const body = await requestArchive("search", new URLSearchParams({
    q: query, city, limit: "20", sort: "relevance",
  }), signal);
  if (!Array.isArray(body.results)) throw new Error("Invalid Fysen archive search data");
  return body.results.map((value: unknown): ArchivedMenuMatch => {
    const dish = object(value);
    const restaurant = object(dish.restaurant);
    const menu = object(dish.menu);
    if (!validText(dish.name) || !validText(restaurant.name) ||
        !validText(restaurant.slug) || !validText(restaurant.address) ||
        !validHttpUrl(menu.sourceUrl) ||
        !validText(menu.observedAt) || !Number.isFinite(Date.parse(menu.observedAt)) ||
        !validPrice(dish.priceMinor) || !validPrice(dish.priceMaxMinor) ||
        !["exact", "from", "multiple"].includes(String(dish.priceKind))) {
      throw new Error("Invalid Fysen archive menu evidence");
    }
    return {
      name: dish.name,
      restaurantName: restaurant.name,
      restaurantSlug: restaurant.slug,
      address: restaurant.address,
      priceMinor: dish.priceMinor,
      priceMaxMinor: dish.priceMaxMinor,
      priceKind: dish.priceKind,
      sourceUrl: menu.sourceUrl,
      observedAt: menu.observedAt,
    } as ArchivedMenuMatch;
  });
}
