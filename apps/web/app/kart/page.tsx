import type { Metadata } from "next";
import { GlobalHeader } from "../../components/global-header";
import { RestaurantMap } from "../../components/restaurant-map";
import { restaurantMenuSources } from "../../lib/restaurant-menu-source-data";
import { safeMapMenuUrl, type MapEvidenceBySlug } from "../../lib/map-menu-evidence";
import { restaurantCoordinateRows } from "../../lib/restaurant-coordinate-data";

export const metadata: Metadata = { title: "Restaurantkart Oslo – Fysen" };

export default function MapPage() {
  const evidence: MapEvidenceBySlug = Object.fromEntries(restaurantMenuSources.filter(([, url]) => safeMapMenuUrl(url)).map(([slug, sourceUrl]) => [slug, [{ name: "Registrert menykilde", sourceUrl, date: "", origin: "catalog" as const }]]));
  return <div className="homePage">
    <GlobalHeader city="Oslo" />
    <main><RestaurantMap rows={restaurantCoordinateRows} evidence={evidence} /></main>
  </div>;
}
