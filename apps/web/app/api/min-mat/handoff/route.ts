import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { issueAhaHandoff } from "../../../../lib/aha-min-mat-api";
import {
  AHA_FYSEN_HANDOFF_PAGE,
  FYSEN_AHA_SESSION_COOKIE,
} from "../../../../lib/aha-consumer-session";
import { withPublicBasePath } from "../../../../lib/public-path";

export async function POST(request: Request): Promise<NextResponse> {
  const token = (await cookies()).get(FYSEN_AHA_SESSION_COOKIE)?.value;
  if (!token) {
    const connect = `${withPublicBasePath("/api/aha/connect")}?returnTo=${encodeURIComponent(withPublicBasePath("/min-mat"))}`;
    return NextResponse.redirect(new URL(connect, request.url), 303);
  }
  try {
    const handoff = await issueAhaHandoff(token);
    const target = new URL(AHA_FYSEN_HANDOFF_PAGE);
    target.hash = `handoff=${encodeURIComponent(handoff.handoffToken)}`;
    return NextResponse.redirect(target, 303);
  } catch {
    return NextResponse.redirect(new URL(`${withPublicBasePath("/min-mat")}?handoff=failed`, request.url), 303);
  }
}
