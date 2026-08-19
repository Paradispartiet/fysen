import { minMatSaveInputSchema } from "@fysen/contracts/aha-min-mat";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getMinMat, saveMinMat } from "../../../../lib/aha-min-mat-api";
import { FYSEN_AHA_SESSION_COOKIE } from "../../../../lib/aha-consumer-session";

async function sessionToken(): Promise<string | null> {
  return (await cookies()).get(FYSEN_AHA_SESSION_COOKIE)?.value ?? null;
}

export async function GET(): Promise<NextResponse> {
  const token = await sessionToken();
  if (!token) return NextResponse.json({ code: "AHA_LOGIN_REQUIRED" }, { status: 401 });
  try {
    return NextResponse.json(await getMinMat(token));
  } catch {
    return NextResponse.json({ code: "INVALID_AHA_SESSION" }, { status: 401 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const token = await sessionToken();
  if (!token) return NextResponse.json({ code: "AHA_LOGIN_REQUIRED" }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ code: "INVALID_JSON" }, { status: 400 }); }
  const parsed = minMatSaveInputSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ code: "INVALID_MIN_MAT_SAVE" }, { status: 400 });
  try {
    return NextResponse.json(await saveMinMat(token, parsed.data.menuItemId), { status: 201 });
  } catch {
    return NextResponse.json({ code: "MIN_MAT_SAVE_FAILED" }, { status: 400 });
  }
}
