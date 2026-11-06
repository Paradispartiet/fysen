import type { DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { CuisineExplorer } from "../components/cuisine-explorer";
import { DishLearningSection } from "../components/dish-learning-section";
import { DishSearch } from "../components/dish-search";
import { GlobalHeader } from "../components/global-header";
import { browseDishes } from "../lib/fysen-api";
import { getPublicMenuArchive } from "../lib/verified-menu-archive";
import { dishBrowseHref } from "../lib/public-path";

export default async function HomePage() {
  let browseData: DishBrowseResponse | null = null;
  try {
    browseData = await browseDishes({ city: "Oslo" });
  } catch {
    browseData = null;
  }

  let archiveReady = false;
  if (!browseData) {
    try {
      await getPublicMenuArchive();
      archiveReady = true;
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
              {browseData
                ? "Søk etter en rett og se hvilke restauranter som har den på menyen nå."
                : "Ferske søk er midlertidig utilgjengelige. Du kan fortsatt utforske rettene og matkunnskapen."}
            </p>
            <DishSearch />
            <a className="homeDishBrowseLink" href={dishBrowseHref("Oslo")}>
              {archiveReady ? "Utforsk sist bekreftede menyer (ikke sanntid)" : "Se alle retter i Oslo"}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
        <CuisineExplorer browseData={browseData} />
        <DishLearningSection />
      </main>
    </div>
  );
}
