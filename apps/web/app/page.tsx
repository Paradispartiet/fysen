import type { DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { CuisineExplorer } from "../components/cuisine-explorer";
import { DishLearningSection } from "../components/dish-learning-section";
import { DishSearch } from "../components/dish-search";
import { GlobalHeader } from "../components/global-header";
import { browseDishes } from "../lib/fysen-api";
import { getPublicMenuArchive, reconcileMenuVersions } from "../lib/verified-menu-archive";
import { summarizeArchivedMatlyst, type ArchivedMatlystCoverage } from "../lib/archived-matlyst-coverage";
import { homeCuisines } from "../components/cuisine-explorer-data";
import { dishBrowseHref } from "../lib/public-path";

export default async function HomePage() {
  let browseData: DishBrowseResponse | null = null;
  try {
    browseData = await browseDishes({ city: "Oslo" });
    // A successful but empty live index should still expose the verified archive.
    if (browseData.dishes.length === 0 && !browseData.menuVersions) browseData = null;
  } catch {
    browseData = null;
  }

  let archiveCoverage: ArchivedMatlystCoverage | null = null;
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
      archiveCoverage = summarizeArchivedMatlyst(archive, dishes);
    } catch {
      // Show normal unavailable state when even the verified archive is down.
    }
  }

  return (
    <div className="homePage">
      <GlobalHeader />
      <main className="homeMain">
        <section className="homeHero" aria-labelledby="fysen-title">
          <div className="homeHeroTopline">
            <div className="homeHeroContent">
              <h1 id="fysen-title">Hva har du lyst på?</h1>
            </div>
          </div>
          <div className="homeSearchWrap">
            <p className="searchProof">
              Søk etter en rett og finn restauranter som har den på menyen.
            </p>
            <DishSearch />
            <a className="homeDishBrowseLink" href={dishBrowseHref("Oslo")}>
              Se alle retter i Oslo
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
        <CuisineExplorer browseData={browseData} archiveCoverage={archiveCoverage} />
        <DishLearningSection />
      </main>
    </div>
  );
}
