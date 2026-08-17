import type { DishSearchResponse } from "@fysen/contracts";
import { DishResult } from "../../components/dish-result";
import { DishSearch } from "../../components/dish-search";
import { GlobalHeader } from "../../components/global-header";
import { SearchState } from "../../components/search-state";
import { searchDishes } from "../../lib/fysen-api";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

async function loadResults(q: string, city: string): Promise<{
  data: DishSearchResponse | null;
  error: string | null;
}> {
  if (q.length < 2) {
    return { data: null, error: q.length === 0 ? null : "Skriv minst to tegn for å søke." };
  }

  try {
    const data = await searchDishes({ q, city, limit: 20 });
    return { data, error: null };
  } catch {
    return {
      data: null,
      error: "Søket virker ikke akkurat nå.",
    };
  }
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = first(params.q);
  const city = first(params.city) || "Oslo";
  const { data, error } = await loadResults(q, city);
  const primaryResults = data?.results.filter((result) => result.match.type !== "fuzzy") ?? [];
  const nearResults = data?.results.filter((result) => result.match.type === "fuzzy") ?? [];

  const countLabel = data
    ? primaryResults.length > 0
      ? `${primaryResults.length} ${primaryResults.length === 1 ? "menytreff" : "menytreff"}`
      : nearResults.length > 0
        ? "Ingen sikre treff"
        : "Ingen ferske menytreff"
    : "Søk på retten du har lyst på.";

  return (
    <div className="resultsPage">
      <GlobalHeader results city={city}>
        <DishSearch
          defaultValue={q}
          city={city}
          compact
          buttonLabel="Søk"
          inputId="results-dish-query"
        />
      </GlobalHeader>

      <main className="resultsMain">
        <section className="resultsContent" aria-live="polite">
          <div className="resultsIntro">
            <p className="eyebrow">{city}</p>
            <h1>{q || "Finn en rett"}</h1>
            <p className="resultsCount">{countLabel}</p>
          </div>

          {error ? (
            <SearchState
              title={error}
              body={q.length === 1 ? undefined : "Prøv igjen om litt."}
              actionHref={q.length > 1 ? `/search?q=${encodeURIComponent(q)}&city=${encodeURIComponent(city)}` : undefined}
              actionLabel={q.length > 1 ? "Prøv igjen" : undefined}
            />
          ) : null}

          {!error && data && data.results.length === 0 ? (
            <SearchState
              title={`Ingen ferske treff på «${q}»`}
              body={`Vi finner ikke retten på en fersk meny i ${city} akkurat nå.`}
            />
          ) : null}

          {primaryResults.length > 0 ? (
            <div className="resultList">
              {primaryResults.map((result) => <DishResult result={result} key={result.menuItemId} />)}
            </div>
          ) : null}

          {nearResults.length > 0 ? (
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
        </section>
      </main>
    </div>
  );
}
