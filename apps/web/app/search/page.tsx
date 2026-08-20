import type { DishBrowseResponse } from "@fysen/contracts/dish-browse";
import type { DishSearchResponse, DishSearchSort } from "@fysen/contracts";
import { DishBrowse } from "../../components/dish-browse";
import { DishKnowledgeNote } from "../../components/dish-knowledge-note";
import { DishResult } from "../../components/dish-result";
import { DishSearch } from "../../components/dish-search";
import { GlobalHeader } from "../../components/global-header";
import { LocationControls } from "../../components/location-controls";
import { SearchState } from "../../components/search-state";
import { browseDishes, searchDishes } from "../../lib/fysen-api";
import { withPublicBasePath } from "../../lib/public-path";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function coordinate(value: string | string[] | undefined, minimum: number, maximum: number): number | null {
  const raw = first(value);
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= minimum && parsed <= maximum ? parsed : null;
}

function searchHref(
  q: string,
  city: string,
  latitude: number | null,
  longitude: number | null,
  sort: DishSearchSort,
): string {
  const params = new URLSearchParams({ q, city, sort });
  if (latitude !== null && longitude !== null) {
    params.set("lat", String(latitude));
    params.set("lon", String(longitude));
  }
  return `${withPublicBasePath("/search")}?${params.toString()}`;
}

async function loadBrowse(city: string): Promise<{
  data: DishBrowseResponse | null;
  error: string | null;
}> {
  try {
    return { data: await browseDishes({ city }), error: null };
  } catch {
    return { data: null, error: "Prøv igjen om litt." };
  }
}

async function loadResults(
  q: string,
  city: string,
  latitude: number | null,
  longitude: number | null,
  sort: DishSearchSort,
): Promise<{
  data: DishSearchResponse | null;
  error: string | null;
}> {
  if (q.length < 2) {
    return { data: null, error: q.length === 0 ? null : "Skriv minst to tegn for å søke." };
  }

  try {
    const location = latitude !== null && longitude !== null ? { lat: latitude, lon: longitude } : {};
    const data = await searchDishes({ q, city, limit: 20, sort, ...location });
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
  const latitude = coordinate(params.lat, -90, 90);
  const longitude = coordinate(params.lon, -180, 180);
  const hasLocation = latitude !== null && longitude !== null;
  const requestedSort = first(params.sort);
  const sort: DishSearchSort = requestedSort === "distance" && hasLocation ? "distance" : "relevance";
  const browseState = q.length === 0 ? await loadBrowse(city) : { data: null, error: null };
  const searchState = q.length === 0
    ? { data: null, error: null }
    : await loadResults(q, city, latitude, longitude, sort);
  const data = searchState.data;
  const error = searchState.error;
  const primaryResults = data?.results.filter((result) => result.match.type !== "fuzzy") ?? [];
  const nearResults = data?.results.filter((result) => result.match.type === "fuzzy") ?? [];

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
              data={browseState.data}
              error={browseState.error}
              initialCuisineName={first(params.cuisine)}
            />
          ) : (
            <>
              <div className="resultsIntro">
                <p className="eyebrow">{city}</p>
                <h1>{q}</h1>
                <p className="resultsCount">{countLabel}</p>
                {q.length >= 2 ? <LocationControls hasLocation={hasLocation} sort={sort} /> : null}
              </div>

              <DishKnowledgeNote query={q} />

              {error ? (
                <SearchState
                  title={error}
                  body={q.length === 1 ? undefined : "Prøv igjen om litt."}
                  actionHref={
                    q.length > 1
                      ? searchHref(q, city, latitude, longitude, sort)
                      : undefined
                  }
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
            </>
          )}
        </section>
      </main>
    </div>
  );
}
