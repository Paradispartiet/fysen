import { withPublicBasePath } from "./public-path";

export const FYSEN_AHA_SESSION_COOKIE = "fysen_aha_session";
export const FYSEN_AHA_PKCE_COOKIE = "fysen_aha_pkce";
export const FYSEN_AHA_STATE_COOKIE = "fysen_aha_state";
export const FYSEN_AHA_RETURN_COOKIE = "fysen_aha_return";

export const AHA_FYSEN_AUTHORIZE_PAGE = "https://paradispartiet.github.io/AHA-EchoNet/authorize-fysen.html";
export const AHA_FYSEN_HANDOFF_PAGE = "https://paradispartiet.github.io/AHA-EchoNet/fysen.html";
export const AHA_GITHUB_PAGES_ORIGIN = "https://paradispartiet.github.io";

export function fysenPublicWebOrigin(): string {
  const configured = process.env.FYSEN_PUBLIC_WEB_URL?.trim();
  if (configured) return new URL(configured).origin;
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return "https://fysen-matsgran-8572s-projects.vercel.app";
}

export function ahaFysenCallbackUrl(): string {
  return new URL(withPublicBasePath("/api/aha/callback"), fysenPublicWebOrigin()).toString();
}

export function safeLocalReturnTo(value: string | null | undefined, fallback = withPublicBasePath("/min-mat")): string {
  const candidate = String(value ?? "").trim();
  if (!candidate || candidate.length > 1000 || !candidate.startsWith("/") || candidate.startsWith("//") || candidate.includes("\\")) {
    return fallback;
  }
  try {
    const parsed = new URL(candidate, "https://fysen.invalid");
    if (parsed.origin !== "https://fysen.invalid") return fallback;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}
