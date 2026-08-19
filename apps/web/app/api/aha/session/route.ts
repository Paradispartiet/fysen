import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revokeAhaConsumer } from "../../../../lib/aha-min-mat-api";
import { FYSEN_AHA_SESSION_COOKIE } from "../../../../lib/aha-consumer-session";

export async function DELETE(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(FYSEN_AHA_SESSION_COOKIE)?.value;
  if (sessionToken) {
    try { await revokeAhaConsumer(sessionToken); } catch {}
  }
  const response = NextResponse.json({ accepted: true });
  response.cookies.set(FYSEN_AHA_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
  return response;
}
