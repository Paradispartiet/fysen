import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import {
  AHA_FYSEN_AUTHORIZE_PAGE,
  FYSEN_AHA_PKCE_COOKIE,
  FYSEN_AHA_RETURN_COOKIE,
  FYSEN_AHA_STATE_COOKIE,
  ahaFysenCallbackUrl,
  safeLocalReturnTo,
} from "../../../../lib/aha-consumer-session";

const COOKIE_MAX_AGE = 10 * 60;

export async function GET(request: Request): Promise<NextResponse> {
  const requestUrl = new URL(request.url);
  const returnTo = safeLocalReturnTo(requestUrl.searchParams.get("returnTo"));
  const codeVerifier = randomBytes(32).toString("base64url");
  const codeChallenge = createHash("sha256").update(codeVerifier, "utf8").digest("base64url");
  const state = randomBytes(24).toString("base64url");
  const redirectUri = ahaFysenCallbackUrl();

  const target = new URL(AHA_FYSEN_AUTHORIZE_PAGE);
  target.searchParams.set("client_id", "fysen");
  target.searchParams.set("redirect_uri", redirectUri);
  target.searchParams.set("code_challenge", codeChallenge);
  target.searchParams.set("state", state);

  const response = NextResponse.redirect(target, 303);
  const common = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  };
  response.cookies.set(FYSEN_AHA_PKCE_COOKIE, codeVerifier, common);
  response.cookies.set(FYSEN_AHA_STATE_COOKIE, state, common);
  response.cookies.set(FYSEN_AHA_RETURN_COOKIE, returnTo, common);
  return response;
}
