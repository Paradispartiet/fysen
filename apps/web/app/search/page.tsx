import type { DishBrowseResponse } from "@fysen/contracts/dish-browse";
import type { DishSearchResponse, DishSearchSort } from "@fysen/contracts";
import { DishBrowse } from "../../components/dish-browse";
import { ArchivedMenuBrowse, ArchivedMenuResults } from "../../components/verified-menu-archive-view";
import { archiveHasCity, getPublicMenuArchive, searchPublicMenuArchive, reconcileMenuVersions, type ArchivedMenuMatch, type PublicMenuArchive } from "../../lib/verified-menu-archive";
import { DishKnowledgeNote } from "../../components/dish-knowledge-note";
import { SearchResults } from "../../components/search-results";
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
    const data = await searchDishes({ q, city, limit: 20, all: "true", sort, ...location });
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
  let archive: PublicMenuArchive | null = null;
  let archiveMatches: ArchivedMenuMatch[] = [];
  let suppressedLiveSlugs = new Set<string>();
  let suppressedLiveIds = new Set<string>();
  // Registered menus remain searchable even when the live index has some results.
  if (q.length !== 1) {
    try {
      const stored = await getPublicMenuArchive();
      if (archiveHasCity(stored, city)) {
      const versions = q.length === 0 ? browseState.data?.menuVersions : data?.menuVersions;
      const selected = reconcileMenuVersions(stored, versions ?? []);
      archive = selected.archive;
      suppressedLiveSlugs = selected.suppressedLiveSlugs;
      suppressedLiveIds = selected.suppressedLiveIds;
      if (q.length >= 2) archiveMatches = searchPublicMenuArchive(archive, q, city, Infinity);
      }
    } catch {
      // Preserve the existing clear unavailable state, never invent menu data.
      archive = null;
    }
  }
  const eligibleLive = (data?.results ?? []).filter((result) => !suppressedLiveSlugs.has(result.restaurant.slug));
  const primaryResults = eligibleLive.filter((result) => result.match.type !== "fuzzy");
  const nearResults = eligibleLive.filter((result) => result.match.type === "fuzzy");
  const countLabel = archive && q.length >= 2
    ? `${archiveMatches.length + primaryResults.length} menytreff`
    : data
    ? primaryResults.length > 0
      ? `${primaryResults.length} menytreff${data.complete !== true && data.results.length >= 20 ? " blant de hentede treffene" : ""}`
      : nearResults.length > 0
        ? "Ingen eksakte treff"
        : "Ingen treff"
    : "Søk på retten du har lyst på.";

  return (
    <div className="resultsPage">
      <GlobalHeader results city={city} query={q}>
        <DishSearch
          defaultValue={q}
          city={city}
          buttonLabel="Finn retten"
          inputId="results-dish-query"
          latitude={hasLocation ? latitude : null}
          longitude={hasLocation ? longitude : null}
          sort={sort}
        />
      </GlobalHeader>

      <main className="resultsMain">
        <section className="resultsContent" aria-live="polite">
          {q.length === 0 ? (
            archive ? (
              <ArchivedMenuBrowse
                city={city}
                initialCuisineName={first(params.cuisine)}
                initialFoodTypeName={first(params.mat)}
                initialAreaName={first(params.region)}
                archive={archive}
                liveDishes={(browseState.data?.dishes ?? []).map((dish) => {
                  const restaurantExamples = dish.restaurantExamples.filter((restaurant) => !suppressedLiveIds.has(restaurant.id));
                  return { ...dish, restaurantExamples, restaurantCount: restaurantExamples.length };
                }).filter((dish) => dish.restaurantCount > 0)}
              />
            ) : (
              <DishBrowse
                city={city}
                data={browseState.data}
                error={browseState.error}
                initialCuisineName={first(params.cuisine)}
                initialAreaName={first(params.region)}
                initialFoodTypeName={first(params.mat)}
              />
            )
          ) : (
            <>
              <div className="resultsIntro">
                <p className="eyebrow">{city}</p>
                <h1>{q}</h1>
                <p className="resultsCount">{countLabel}</p>
                {q.length >= 2 ? <LocationControls hasLocation={hasLocation} sort={sort} /> : null}
              </div>

              <DishKnowledgeNote query={q} />

              {archive && (archiveMatches.length > 0 || !eligibleLive.length) ? (
                <ArchivedMenuResults results={archiveMatches} query={q} city={city} />
              ) : null}

              {error && !archive ? (
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

              {!error && data && data.results.length === 0 && !archive ? (
                <SearchState
                  title={`Ingen treff på «${q}»`}
                  body="Prøv et annet rettnavn eller se alle retter."
                />
              ) : null}

              {data && eligibleLive.length > 0 ? (
                <SearchResults
                  primaryResults={primaryResults}
                  nearResults={nearResults}
                  hasLocation={hasLocation}
                  searchLimitReached={data.complete !== true && data.results.length >= 20}
                />
              ) : null}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
