import { NextResponse } from "next/server";
import { archivedRestaurantMenu, getPublicMenuArchive } from "../../../../lib/verified-menu-archive";
import { archivedMenuPriceLabel } from "../../../../lib/archived-menu-price";
import { restaurantCoordinateRows } from "../../../../lib/restaurant-coordinate-data";
import { safeMapMenuUrl } from "../../../../lib/map-menu-evidence";

export async function GET(request: Request): Promise<NextResponse> {
  const slug = new URL(request.url).searchParams.get("restaurant") ?? "";
  if (!slug || slug.length > 160 || !restaurantCoordinateRows.some(row => row[0] === slug)) {
    return NextResponse.json({ error: "Ukjent spisested." }, { status: 404 });
  }
  try {
    const archive = await getPublicMenuArchive();
    const items = archivedRestaurantMenu(archive, slug).filter(item => safeMapMenuUrl(item.sourceUrl)).map(item => ({
      name: item.name, price: archivedMenuPriceLabel(item.priceMinor, item.priceMaxMinor, item.priceKind, item.currency),
      sourceUrl: item.sourceUrl, date: item.observedAt,
    }));
    return NextResponse.json({ restaurant: slug, items, realtime: false }, { headers: { "Cache-Control": "public, max-age=60" } });
  } catch {
    return NextResponse.json({ error: "Menyen kunne ikke hentes." }, { status: 502 });
  }
}
