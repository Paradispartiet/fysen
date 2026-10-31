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
  // Browse labels may be longer than the search API's accepted query. A
  // source-title prefix still finds the full dish without changing its label.
  let searchQuery = query;
  if (query.length > 80) {
    searchQuery = query.slice(0, 80).replace(/[\uD800-\uDBFF]$/u, "");
    if (!/\s/u.test(query[searchQuery.length] ?? "")) {
      const boundary = searchQuery.search(/\s+\S*$/u);
      if (boundary > 1) searchQuery = searchQuery.slice(0, boundary);
    }
    searchQuery = searchQuery.trimEnd();
  }
  const params = new URLSearchParams({ q: searchQuery, city });
  return `${withPublicBasePath("/search")}?${params.toString()}`;
}

export function foodKnowledgeHref(dishId: string): string {
  return `${withPublicBasePath("/")}#learn-${encodeURIComponent(dishId)}`;
}

export function restaurantClaimHref(restaurantSlug: string): string {
  const params = new URLSearchParams({ restaurant: restaurantSlug });
  return `${withPublicBasePath("/claim")}?${params.toString()}`;
}
