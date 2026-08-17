const configuredBasePath = process.env.NEXT_PUBLIC_FYSEN_BASE_PATH?.trim() ?? "";

const publicBasePath = configuredBasePath && configuredBasePath !== "/"
  ? `${configuredBasePath.startsWith("/") ? "" : "/"}${configuredBasePath}`.replace(/\/+$/, "")
  : "";

export function withPublicBasePath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${publicBasePath}${normalizedPath}`;
}

export function dishSearchHref(query: string, city = "Oslo"): string {
  const params = new URLSearchParams({ q: query, city });
  return `${withPublicBasePath("/search")}?${params.toString()}`;
}
