import { CuisineExplorer } from "../components/cuisine-explorer";
import { DishLearningSection } from "../components/dish-learning-section";
import { DishSearch } from "../components/dish-search";
import { GlobalHeader } from "../components/global-header";
import { getPublicMenuArchive } from "../lib/verified-menu-archive";
import { summarizeArchivedMatlyst, type ArchivedMatlystCoverage } from "../lib/archived-matlyst-coverage";
import { homeCuisines } from "../components/cuisine-explorer-data";
import { dishBrowseHref } from "../lib/public-path";

export default async function HomePage() {
  // The public homepage never needs to read menu rows from PostgreSQL.
  // Archive provenance and quarantine checks are enforced by this loader.
  let archiveCoverage: ArchivedMatlystCoverage | null = null;
  try {
    const archive = await getPublicMenuArchive();
    const dishes = homeCuisines.flatMap((cuisine) => cuisine.areas.flatMap((area) => area.dishes));
    archiveCoverage = summarizeArchivedMatlyst(archive, dishes);
  } catch {
    // Fail closed rather than presenting old database rows as verified menus.
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
        <CuisineExplorer browseData={null} archiveCoverage={archiveCoverage} archiveOnly />
        <DishLearningSection />
      </main>
    </div>
  );
}
