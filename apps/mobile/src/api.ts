import type { DishSearchResponse } from "@fysen/contracts";
import type { PopularDishItem, RecentlyAddedDishItem } from "@fysen/contracts/dish-browse";

const BASE = "https://fysen-api.vercel.app";
const REQUEST_TIMEOUT_MS = 12000;

export type FeaturedResponse = {
  city: string;
  count: number;
  recentDishes: RecentlyAddedDishItem[];
  popularDishes: PopularDishItem[];
};

async function getJson(path: string, signal?: AbortSignal): Promise<unknown> {
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  signal?.addEventListener("abort", onAbort, { once: true });
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(BASE + path, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    return (await response.json()) as unknown;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", onAbort);
  }
}

export async function searchDishes(term: string, signal?: AbortSignal): Promise<DishSearchResponse> {
  const params = new URLSearchParams({
    q: term,
    city: "Oslo",
    limit: "20",
    sort: "relevance",
  });
  const data = await getJson("/v1/dishes/search?" + params.toString(), signal);
  if (!data || typeof data !== "object" || !("results" in data) || !Array.isArray(data.results)) {
    throw new Error("Ugyldig svar fra søket.");
  }
  return data as DishSearchResponse;
}

export async function loadFeatured(signal?: AbortSignal): Promise<FeaturedResponse> {
  const data = await getJson("/v1/dishes/featured?city=Oslo", signal);
  if (
    !data || typeof data !== "object" ||
    !("recentDishes" in data) || !Array.isArray(data.recentDishes) ||
    !("popularDishes" in data) || !Array.isArray(data.popularDishes)
  ) {
    throw new Error("Matlyst er ikke tilgjengelig.");
  }
  return data as FeaturedResponse;
}
