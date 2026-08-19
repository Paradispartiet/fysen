import { minMatSavedItemIdSchema } from "@fysen/contracts/aha-min-mat";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { removeMinMat } from "../../../../../lib/aha-min-mat-api";
import { FYSEN_AHA_SESSION_COOKIE } from "../../../../../lib/aha-consumer-session";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ savedItemId: string }> },
): Promise<NextResponse> {
  const token = (await cookies()).get(FYSEN_AHA_SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ code: "AHA_LOGIN_REQUIRED" }, { status: 401 });
  const parsed = minMatSavedItemIdSchema.safeParse((await context.params).savedItemId);
  if (!parsed.success) return NextResponse.json({ code: "INVALID_MIN_MAT_ITEM_ID" }, { status: 400 });
  try {
    return NextResponse.json(await removeMinMat(token, parsed.data));
  } catch {
    return NextResponse.json({ code: "MIN_MAT_REMOVE_FAILED" }, { status: 400 });
  }
}
