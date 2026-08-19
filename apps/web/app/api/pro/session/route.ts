import { fysenProSetupRedeemSchema } from "@fysen/contracts/fysen-pro";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { redeemFysenProSetupToken, revokeFysenProSession } from "../../../../lib/fysen-api";
import { FYSEN_PRO_SESSION_COOKIE } from "../../../../lib/fysen-pro-session";

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ code: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = fysenProSetupRedeemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ code: "INVALID_PRO_SETUP_TOKEN" }, { status: 400 });
  }

  try {
    const receipt = await redeemFysenProSetupToken(parsed.data.setupToken);
    const response = NextResponse.json({ accepted: true }, { status: 201 });
    response.cookies.set(FYSEN_PRO_SESSION_COOKIE, receipt.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(receipt.expiresAt),
    });
    return response;
  } catch {
    return NextResponse.json({ code: "INVALID_OR_EXPIRED_PRO_SETUP_TOKEN" }, { status: 401 });
  }
}

export async function DELETE(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(FYSEN_PRO_SESSION_COOKIE)?.value;
  if (sessionToken) {
    try {
      await revokeFysenProSession(sessionToken);
    } catch {
      // Clearing the local HttpOnly session remains fail-closed even if API revocation is unavailable.
    }
  }

  const response = NextResponse.json({ accepted: true });
  response.cookies.set(FYSEN_PRO_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
  return response;
}
