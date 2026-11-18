"use client";

import { useEffect, useState } from "react";
import type { ArchivedMenuMatch } from "../lib/verified-menu-archive";
import {
  browsePublicArchiveClient,
  searchPublicArchiveClient,
  type ArchiveBrowseSuggestion,
} from "../lib/client-public-archive";
import { clientPreviewApiBaseUrl } from "../lib/client-dish-search";
import { ArchivedMenuBrowse, ArchivedMenuResults } from "./verified-menu-archive-view";
import { DishKnowledgeNote } from "./dish-knowledge-note";
import { DishSearch } from "./dish-search";
import { GlobalHeader } from "./global-header";
import { SearchState } from "./search-state";

type QueryState = {
  q: string;
  city: string;
  cuisine: string;
};

function queryFromLocation(): QueryState {
  const params = new URLSearchParams(window.location.search);
  return {
    q: (params.get("q") ?? "").trim(),
    city: (params.get("city") ?? "Oslo").trim() || "Oslo",
    cuisine: (params.get("cuisine") ?? "").trim(),
  };
}

function productionSearchUrl(query: QueryState): string {
  const params = new URLSearchParams({ city: query.city });
  if (query.q) params.set("q", query.q);
  if (query.cuisine) params.set("cuisine", query.cuisine);
  return `https://fysen.vercel.app/search?${params.toString()}`;
}

export function StaticPreviewSearchPage() {
  const [query, setQuery] = useState<QueryState | null>(null);
  const [browseData, setBrowseData] = useState<readonly ArchiveBrowseSuggestion[] | null>(null);
  const [results, setResults] = useState<readonly ArchivedMenuMatch[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuery(queryFromLocation());
  }, []);

  useEffect(() => {
    if (!query) return;
    setBrowseData(null);
    setResults(null);
    setError(null);

    if (query.q.length === 1) {
      setLoading(false);
      setError("Skriv minst to tegn for å søke.");
      return;
    }

    if (!clientPreviewApiBaseUrl) {
      window.location.replace(productionSearchUrl(query));
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 7_000);
    let disposed = false;
    setLoading(true);

    // No menu read goes to PostgreSQL: both paths use the verified public API.
    const request = query.q.length === 0
      ? browsePublicArchiveClient(query.city, controller.signal)
          .then((browse) => ({ browse, search: null }))
      : searchPublicArchiveClient(query.q, query.city, controller.signal)
          .then((search) => ({ browse: null, search }));

    void request
      .then(({ browse, search }) => {
        if (disposed) return;
        // Empty archive results are valid: never fall back to the old database.
        setBrowseData(browse);
        setResults(search);
      })
      .catch(() => {
        if (disposed) return;
        // The canonical site reads the same archive directly and can survive
        // an API outage; no second database-dependent preview fetch is made.
        window.location.replace(productionSearchUrl(query));
      })
      .finally(() => {
        window.clearTimeout(timeout);
        if (!disposed) setLoading(false);
      });

    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const q = query?.q ?? "";
  const city = query?.city ?? "Oslo";
  const countLabel = results ? `${results.length} menytreff` : "Søk på retten du har lyst på.";

  return (
    <div className="resultsPage">
      <GlobalHeader results city={city}>
        <DishSearch
          key={`${q}-${city}`}
          defaultValue={q}
          city={city}
          buttonLabel="Finn retten"
          inputId="results-dish-query"
        />
      </GlobalHeader>

      <main className="resultsMain">
        <section className="resultsContent" aria-live="polite">
          {q.length === 0 ? (
            browseData ? (
              <ArchivedMenuBrowse city={city} initialCuisineName={query?.cuisine ?? ""} dishes={browseData} />
            ) : loading || query === null ? (
              <p className="dishBrowseStatus">Henter retter …</p>
            ) : (
              <SearchState title="Kunne ikke hente menyarkivet akkurat nå." />
            )
          ) : (
            <>
              <div className="resultsIntro">
                <p className="eyebrow">{city}</p>
                <h1>{q}</h1>
                <p className="resultsCount">{loading ? "Søker etter retter …" : countLabel}</p>
              </div>
              <DishKnowledgeNote query={q} />
              {loading ? (
                <div className="loadingResults" aria-label="Søker etter menytreff">
                  {[0, 1].map((index) => (
                    <div className="loadingResult" key={index}>
                      <div className="skeletonLine skeletonTitle" />
                      <div className="skeletonLine skeletonRestaurant" />
                      <div className="skeletonLine skeletonBody" />
                      <div className="skeletonLine skeletonMeta" />
                    </div>
                  ))}
                </div>
              ) : null}
              {!loading && error ? <SearchState title={error} /> : null}
              {!loading && results ? <ArchivedMenuResults results={results} query={q} city={city} /> : null}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
