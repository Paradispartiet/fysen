import type { Metadata } from "next";
import { GlobalHeader } from "../../components/global-header";
import { RestaurantMap } from "../../components/restaurant-map";
import { restaurantCoordinateRows } from "../../lib/restaurant-coordinate-data";

export const metadata: Metadata = { title: "Restaurantkart Oslo – Fysen" };

export default function MapPage() {
  return <div className="homePage">
    <GlobalHeader city="Oslo" />
    <main><RestaurantMap rows={restaurantCoordinateRows} /></main>
  </div>;
}
