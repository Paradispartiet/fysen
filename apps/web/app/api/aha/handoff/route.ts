import { NextResponse } from "next/server";
import { redeemAhaHandoff } from "../../../../lib/aha-min-mat-api";
import { AHA_GITHUB_PAGES_ORIGIN } from "../../../../lib/aha-consumer-session";

const corsHeaders = {
  "Access-Control-Allow-Origin": AHA_GITHUB_PAGES_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Accept",
  "Access-Control-Max-Age": "600",
  "Cache-Control": "no-store",
  Vary: "Origin",
};

function allowed(request: Request): boolean {
  return request.headers.get("origin") === AHA_GITHUB_PAGES_ORIGIN;
}

export async function OPTIONS(request: Request): Promise<NextResponse> {
  if (!allowed(request)) return new NextResponse(null, { status: 403, headers: { "Cache-Control": "no-store" } });
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!allowed(request)) return NextResponse.json({ error: { code: "ORIGIN_NOT_ALLOWED", message: "Origin not allowed." } }, { status: 403, headers: corsHeaders });
  const authorization = request.headers.get("authorization") ?? "";
  const token = /^Handoff ([A-Za-z0-9_-]{43,200})$/.exec(authorization)?.[1];
  if (!token) return NextResponse.json({ error: { code: "INVALID_AHA_HANDOFF", message: "Missing or invalid handoff." } }, { status: 401, headers: corsHeaders });
  try {
    const data = await redeemAhaHandoff(token);
    return NextResponse.json({ data }, { status: 200, headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: { code: "INVALID_AHA_HANDOFF", message: "Invalid, expired or already used handoff." } }, { status: 401, headers: corsHeaders });
  }
}
