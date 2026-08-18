import { NextResponse } from "next/server";
import { searchDishes } from "../../../../lib/fysen-api";

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") ?? "").trim();
  const city = (url.searchParams.get("city") ?? "Oslo").trim() || "Oslo";
  const requestedLimit = Number(url.searchParams.get("limit") ?? 6);
  const limit = Number.isInteger(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 12) : 6;

  if (query.length < 2) {
    return NextResponse.json({ error: "Skriv minst to tegn for å søke." }, { status: 400 });
  }

  try {
    const result = await searchDishes({ q: query, city, limit, sort: "relevance" });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Kunne ikke hente menytreff akkurat nå." }, { status: 502 });
  }
}
