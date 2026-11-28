"use client";

import type { DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { useEffect, useState } from "react";
import type { ArchivedMatlystCoverage } from "../lib/archived-matlyst-coverage";
import { canonicalCity, dishBrowseHref, withPublicBasePath } from "../lib/public-path";
import { CuisineExplorer } from "./cuisine-explorer";
import { DishLearningSection } from "./dish-learning-section";
import { DishSearch } from "./dish-search";
import { GlobalHeader } from "./global-header";

export function HomeCityContent({ osloBrowseData, archiveCoverage }: {
  osloBrowseData: DishBrowseResponse | null;
  archiveCoverage: Readonly<Record<string, ArchivedMatlystCoverage>>;
}) {
  const [selection, setSelection] = useState({ city: "Oslo", query: "" });
  // Read the URL in the browser so the same homepage works in static Pages exports.
  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      setSelection({ city: canonicalCity(params.get("city")), query: (params.get("q") ?? "").slice(0, 80) });
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const { city, query } = selection;
  return (
    <div className="homePage">
      <GlobalHeader city={city} query={query} />
      <main className="homeMain">
        <section className="homeHero" aria-labelledby="fysen-title">
          <div className="homeHeroTopline">
            <div className="homeHeroContent">
              <h1 id="fysen-title">Hva har du lyst på?</h1>
            </div>
          </div>
          <div className="homeSearchWrap">
            <p className="searchProof">Søk etter en rett og finn restauranter som har den på menyen.</p>
            <DishSearch key={city + query} city={city} defaultValue={query} />
            <nav aria-label="Finn retter i valgt by">
              {city === "Oslo" ? <a className="homeDishBrowseLink" href={withPublicBasePath("/kart")}>Utforsk Oslo på kartet <span aria-hidden="true">→</span></a> : null}
              <a className="homeDishBrowseLink" href={dishBrowseHref(city)}>
                Se alle retter i {city} <span aria-hidden="true">→</span>
              </a>
            </nav>
          </div>
        </section>
        <CuisineExplorer key={city} city={city} browseData={city === "Oslo" ? osloBrowseData : null} archiveCoverage={archiveCoverage[city] ?? null} />
        <DishLearningSection key={city} city={city} />
      </main>
    </div>
  );
}
