const configuredBasePath = process.env.NEXT_PUBLIC_FYSEN_BASE_PATH?.trim() ?? "";

const publicBasePath = configuredBasePath && configuredBasePath !== "/"
  ? `${configuredBasePath.startsWith("/") ? "" : "/"}${configuredBasePath}`.replace(/\/+$/, "")
  : "";

export function withPublicBasePath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${publicBasePath}${normalizedPath}`;
}

export function dishBrowseHref(city = "Oslo"): string {
  const params = new URLSearchParams({ city });
  return `${withPublicBasePath("/search")}?${params.toString()}`;
}

export function dishBrowseCuisineHref(city = "Oslo", cuisineName?: string): string {
  const params = new URLSearchParams({ city });
  if (cuisineName) params.set("cuisine", cuisineName);
  return `${withPublicBasePath("/search")}?${params.toString()}`;
}

export function dishSearchHref(query: string, city = "Oslo"): string {
  const params = new URLSearchParams({ q: query, city });
  return `${withPublicBasePath("/search")}?${params.toString()}`;
}

export function foodKnowledgeHref(dishId: string): string {
  return `${withPublicBasePath("/")}#learn-${encodeURIComponent(dishId)}`;
}

export function restaurantClaimHref(restaurantSlug: string): string {
  const params = new URLSearchParams({ restaurant: restaurantSlug });
  return `${withPublicBasePath("/claim")}?${params.toString()}`;
}
