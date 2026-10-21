export type NativeDestination =
  | { tab: "search"; query: string | null }
  | { tab: "matlyst" }
  | { tab: "favorites" };

/**
 * Only accept Fysen-owned deep links. An arbitrary URL must never cause an
 * external navigation or trigger an unbounded search request.
 *
 * Examples: fysen://matlyst, fysen://favorites, fysen://search?q=ramen.
 */
export function parseFysenDeepLink(raw: string | null): NativeDestination | null {
  if (typeof raw !== "string" || raw.length > 512) return null;
  try {
    const value = new URL(raw);
    if (value.protocol !== "fysen:" || value.port || value.username || value.password) return null;
    if (value.pathname !== "" && value.pathname !== "/") return null;

    if (value.hostname === "matlyst") return { tab: "matlyst" };
    if (value.hostname === "favorites") return { tab: "favorites" };
    if (value.hostname !== "search") return null;

    const candidate = value.searchParams.get("q")?.trim() ?? null;
    if (candidate === null || candidate === "") return { tab: "search", query: null };
    if (candidate.length < 2 || candidate.length > 80) return null;
    return { tab: "search", query: candidate };
  } catch {
    return null;
  }
}
