import { NextResponse } from "next/server";
import { browseDishes } from "../../../../lib/fysen-api";
import { canonicalCity } from "../../../../lib/public-path";

export async function GET(request: Request): Promise<NextResponse> {
  const city = canonicalCity(new URL(request.url).searchParams.get("city"));
  try {
    const result = await browseDishes({ city });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Kunne ikke hente menytreff akkurat nå." }, { status: 502 });
  }
}
