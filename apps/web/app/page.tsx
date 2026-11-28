import type { DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { browseDishes } from "../lib/fysen-api";
import { archiveHasCity, getPublicMenuArchive, reconcileMenuVersions } from "../lib/verified-menu-archive";
import { summarizeArchivedMatlyst, type ArchivedMatlystCoverage } from "../lib/archived-matlyst-coverage";
import { homeCuisines } from "../components/cuisine-explorer-data";
import { nordicCities } from "../lib/public-path";
import { HomeCityContent } from "../components/home-city-content";

export default async function HomePage() {
  let browseData: DishBrowseResponse | null = null;
  try {
    browseData = await browseDishes({ city: "Oslo" });
    // A successful but empty live index should still expose the verified archive.
    if (browseData.dishes.length === 0 && !browseData.menuVersions) browseData = null;
  } catch {
    browseData = null;
  }

  const archiveCoverage: Record<string, ArchivedMatlystCoverage> = {};
  {
    try {
      const stored = await getPublicMenuArchive();
      const { archive, suppressedLiveIds } = reconcileMenuVersions(stored, browseData?.menuVersions ?? []);
      if (browseData) {
        const filtered = browseData.dishes.map((dish) => {
          const restaurantExamples = dish.restaurantExamples.filter((restaurant) => !suppressedLiveIds.has(restaurant.id));
          return { ...dish, restaurantExamples, restaurantCount: restaurantExamples.length };
        }).filter((dish) => dish.restaurantCount > 0);
        browseData = { ...browseData, dishes: filtered, count: filtered.length };
      }
      const dishes = homeCuisines.flatMap((cuisine) => cuisine.areas.flatMap((area) => area.dishes));
      for (const { name } of nordicCities) {
        if (name === "Oslo" || archiveHasCity(archive, name)) {
          archiveCoverage[name] = summarizeArchivedMatlyst(archive, dishes, name);
        }
      }
    } catch {
      // Show normal unavailable state when even the verified archive is down.
    }
  }

  return <HomeCityContent osloBrowseData={browseData} archiveCoverage={archiveCoverage} />;
}
