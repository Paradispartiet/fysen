import { minMatArchiveSaveInputSchema } from "@fysen/contracts/aha-min-mat";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ArchivedMinMatSaveError, saveArchivedMinMat } from "../../../../lib/aha-min-mat-api";
import { ahaMinMatPilotEnabled } from "../../../../lib/aha-min-mat-pilot";
import { FYSEN_AHA_SESSION_COOKIE } from "../../../../lib/aha-consumer-session";

export async function POST(request: Request): Promise<NextResponse> {
  if (!ahaMinMatPilotEnabled) return NextResponse.json({ code: "PILOT_DISABLED" }, { status: 403 });
  // This browser endpoint uses an HttpOnly same-site AHA cookie.
  // Require same-origin POSTs; the API never accepts a cookie as bearer proof.
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return NextResponse.json({ code: "INVALID_ORIGIN" }, { status: 403 });
  }
  const token = (await cookies()).get(FYSEN_AHA_SESSION_COOKIE)?.value ?? null;
  if (!token) return NextResponse.json({ code: "AHA_LOGIN_REQUIRED" }, { status: 401 });
  let raw: unknown;
  try { raw = await request.json(); }
  catch { return NextResponse.json({ code: "INVALID_JSON" }, { status: 400 }); }
  const evidence = minMatArchiveSaveInputSchema.safeParse(raw);
  if (!evidence.success) {
    return NextResponse.json({ code: "INVALID_ARCHIVE_REFERENCE" }, { status: 400 });
  }
  try {
    return NextResponse.json(await saveArchivedMinMat(token, evidence.data), { status: 201 });
  } catch (error) {
    if (error instanceof ArchivedMinMatSaveError) {
      if (error.status === 401) return NextResponse.json({ code: "AHA_LOGIN_REQUIRED" }, { status: 401 });
      if (error.status === 404) return NextResponse.json({ code: "ARCHIVED_MENU_UNAVAILABLE_FOR_SAVE" }, { status: 404 });
      if (error.status === 503) return NextResponse.json({ code: "ARCHIVE_UNAVAILABLE" }, { status: 503 });
    }
    return NextResponse.json({ code: "MIN_MAT_SAVE_FAILED" }, { status: 502 });
  }
}
