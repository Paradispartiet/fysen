"use client";

import type { DishBrowseResponse } from "@fysen/contracts/dish-browse";
import {
  dishSearchResponseSchema,
  type DishSearchResponse,
} from "@fysen/contracts";
import { useEffect, useMemo, useState } from "react";
import { browseDishesClient } from "../lib/client-dish-search";
import { DishBrowse } from "./dish-browse";
import { DishKnowledgeNote } from "./dish-knowledge-note";
import { DishResult } from "./dish-result";
import { DishSearch } from "./dish-search";
import { GlobalHeader } from "./global-header";
import { SearchState } from "./search-state";

type QueryState = {
  q: string;
  city: string;
};

const previewApiBaseUrl = process.env.NEXT_PUBLIC_FYSEN_API_BASE_URL?.trim().replace(/\/$/, "") ?? "";

function queryFromLocation(): QueryState {
  const params = new URLSearchParams(window.location.search);
  return {
    q: (params.get("q") ?? "").trim(),
    city: (params.get("city") ?? "Oslo").trim() || "Oslo",
  };
}

function previewSearchUrl(query: QueryState): string {
  const params = new URLSearchParams({
    q: query.q,
    city: query.city,
    limit: "20",
    sort: "relevance",
  });
  return `${previewApiBaseUrl}/v1/dishes/search?${params.toString()}`;
}

function productionSearchUrl(query: QueryState): string {
  const params = new URLSearchParams({ city: query.city });
  if (query.q) params.set("q", query.q);
  return `https://fysen.vercel.app/search?${params.toString()}`;
}

export function StaticPreviewSearchPage() {
  const [query, setQuery] = useState<QueryState | null>(null);
  const [browseData, setBrowseData] = useState<DishBrowseResponse | null>(null);
  const [data, setData] = useState<DishSearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuery(queryFromLocation());
  }, []);

  useEffect(() => {
    if (!query) return;

    setBrowseData(null);
    setData(null);
    setError(null);

    if (query.q.length === 1) {
      setLoading(false);
      setError("Skriv minst to tegn for å søke.");
      return;
    }

    if (!previewApiBaseUrl) {
      window.location.replace(productionSearchUrl(query));
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 7_000);
    let disposed = false;
    const browseMode = query.q.length === 0;
    setLoading(true);

    const request = browseMode
      ? browseDishesClient(query.city, { signal: controller.signal })
          .then((browse) => ({ browse, search: null }))
      : fetch(previewSearchUrl(query), {
          headers: { accept: "application/json" },
          signal: controller.signal,
        }).then(async (response) => {
          if (!response.ok) {
            throw new Error(`Fysen API request failed with HTTP ${response.status}`);
          }
          const payload: unknown = await response.json();
          return { browse: null, search: dishSearchResponseSchema.parse(payload) };
        });

    void request
      .then((response) => {
        if (disposed) return;
        setBrowseData(response.browse);
        setData(response.search);
      })
      .catch(() => {
        if (disposed) return;
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

  const primaryResults = useMemo(
    () => data?.results.filter((result) => result.match.type !== "fuzzy") ?? [],
    [data],
  );
  const nearResults = useMemo(
    () => data?.results.filter((result) => result.match.type === "fuzzy") ?? [],
    [data],
  );

  const q = query?.q ?? "";
  const city = query?.city ?? "Oslo";
  const countLabel = data
    ? primaryResults.length > 0
      ? `${primaryResults.length} menytreff`
      : nearResults.length > 0
        ? "Ingen sikre treff"
        : "Ingen ferske menytreff"
    : "Søk på retten du har lyst på.";

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
            <DishBrowse
              city={city}
              data={browseData}
              loading={query === null || loading}
              error={error}
            />
          ) : (
            <>
              <div className="resultsIntro">
                <p className="eyebrow">{city}</p>
                <h1>{q}</h1>
                <p className="resultsCount">{loading ? "Søker i ferske menyer …" : countLabel}</p>
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

              {!loading && error ? (
                <SearchState title={error} body={q.length > 1 ? "Prøv igjen om litt." : undefined} />
              ) : null}

              {!loading && !error && data && data.results.length === 0 ? (
                <SearchState
                  title={`Ingen ferske treff på «${q}»`}
                  body={`Vi finner ikke retten på en fersk meny i ${city} akkurat nå.`}
                />
              ) : null}

              {!loading && primaryResults.length > 0 ? (
                <div className="resultList">
                  {primaryResults.map((result) => <DishResult result={result} key={result.menuItemId} />)}
                </div>
              ) : null}

              {!loading && nearResults.length > 0 ? (
                <section className="nearResults" aria-labelledby="near-results-title">
                  {primaryResults.length === 0 ? (
                    <p className="nearResultsLead">Vi fant ikke et sikkert rettetreff, men disse menyoppføringene ligner.</p>
                  ) : null}
                  <h2 id="near-results-title">Nære treff</h2>
                  <div className="resultList">
                    {nearResults.map((result) => <DishResult result={result} key={result.menuItemId} />)}
                  </div>
                </section>
              ) : null}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
