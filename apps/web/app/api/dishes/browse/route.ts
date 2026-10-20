import { NextResponse } from "next/server";
import { browseDishes } from "../../../../lib/fysen-api";
import { homeCuisines } from "../../../../components/cuisine-explorer-data";
import { liveDishMatchesDescriptor } from "../../../../lib/dish-discovery";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const city = (url.searchParams.get("city") ?? "Oslo").trim() || "Oslo";
  if (city.length > 120) return NextResponse.json({ error: "Ugyldig by." }, { status: 400 });
  try {
    const data = await browseDishes({ city });
    if (url.searchParams.get("view") !== "home") {
      return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
    }
    const descriptors = homeCuisines.flatMap((cuisine) => cuisine.areas.flatMap((area) => area.dishes))
      .map((dish) => ({ label: dish.label, query: dish.query, aliases: dish.aliases }));
    const dishes = data.dishes.filter((dish) => descriptors.some((descriptor) => liveDishMatchesDescriptor(dish, descriptor)));
    return NextResponse.json({ ...data, count: dishes.length, dishes }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Kunne ikke hente ferske menyer." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
