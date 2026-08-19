import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectAhaConsumer } from "../../../../lib/aha-min-mat-api";
import {
  FYSEN_AHA_PKCE_COOKIE,
  FYSEN_AHA_RETURN_COOKIE,
  FYSEN_AHA_SESSION_COOKIE,
  FYSEN_AHA_STATE_COOKIE,
  ahaFysenCallbackUrl,
  safeLocalReturnTo,
} from "../../../../lib/aha-consumer-session";
import { withPublicBasePath } from "../../../../lib/public-path";

function same(left: string, right: string): boolean {
  const a = Buffer.from(left, "utf8");
  const b = Buffer.from(right, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

function clearTransient(response: NextResponse): void {
  for (const name of [FYSEN_AHA_PKCE_COOKIE, FYSEN_AHA_STATE_COOKIE, FYSEN_AHA_RETURN_COOKIE]) {
    response.cookies.set(name, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
      maxAge: 0,
    });
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const code = String(url.searchParams.get("code") ?? "").trim();
  const returnedState = String(url.searchParams.get("state") ?? "").trim();
  const cookieStore = await cookies();
  const expectedState = cookieStore.get(FYSEN_AHA_STATE_COOKIE)?.value ?? "";
  const verifier = cookieStore.get(FYSEN_AHA_PKCE_COOKIE)?.value ?? "";
  const returnTo = safeLocalReturnTo(cookieStore.get(FYSEN_AHA_RETURN_COOKIE)?.value);
  const failure = () => NextResponse.redirect(new URL(`${withPublicBasePath("/min-mat")}?aha=failed`, request.url), 303);

  if (!code || !returnedState || !expectedState || !verifier || !same(returnedState, expectedState)) {
    const response = failure();
    clearTransient(response);
    return response;
  }

  try {
    const receipt = await connectAhaConsumer({ authorizationCode: code, codeVerifier: verifier, redirectUri: ahaFysenCallbackUrl() });
    const response = NextResponse.redirect(new URL(returnTo, request.url), 303);
    response.cookies.set(FYSEN_AHA_SESSION_COOKIE, receipt.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(receipt.expiresAt),
    });
    clearTransient(response);
    return response;
  } catch {
    const response = failure();
    clearTransient(response);
    return response;
  }
}
