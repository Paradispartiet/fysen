import type { DishSearchResponse } from "@fysen/contracts";
import { searchDishes } from "../../lib/fysen-api.js";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function formatPrice(priceMinor: number | null, currency: string): string {
  if (priceMinor === null) return "Pris ikke oppgitt";
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency,
    maximumFractionDigits: priceMinor % 100 === 0 ? 0 : 2,
  }).format(priceMinor / 100);
}

function formatCheckedAt(value: string): string {
  return new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Oslo",
  }).format(new Date(value));
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
      error: "Søket er midlertidig utilgjengelig. Menydataene er ikke endret eller slettet.",
    };
  }
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = first(params.q);
  const city = first(params.city) || "Oslo";
  const { data, error } = await loadResults(q, city);

  return (
    <main className="resultsShell">
      <header className="resultsHeader">
        <a className="brand brandLink" href="/" aria-label="Fysen forsiden">fysen.</a>
        <form className="search searchCompact" role="search" action="/search">
          <label className="srOnly" htmlFor="dish-query">Retten du vil spise</label>
          <input
            id="dish-query"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Biff tartar, ramen, carbonara …"
            autoComplete="off"
          />
          <input type="hidden" name="city" value={city} />
          <button type="submit">Søk</button>
        </form>
      </header>

      <section className="resultsContent" aria-live="polite">
        <div className="resultsIntro">
          <p className="eyebrow">{city}</p>
          <h1 className="resultsTitle">{q ? `«${q}»` : "Finn en rett"}</h1>
          {data ? (
            <p className="resultsCount">
              {data.count === 0
                ? "Ingen ferske menytreff akkurat nå."
                : `${data.count} ${data.count === 1 ? "treff" : "treff"} i ferske menyer.`}
            </p>
          ) : (
            <p className="resultsCount">Søk på retten du har lyst på akkurat nå.</p>
          )}
          {error ? <p className="searchError" role="alert">{error}</p> : null}
        </div>

        {data?.results.length ? (
          <div className="resultList">
            {data.results.map((result) => (
              <article className="resultCard" key={result.menuItemId}>
                <div className="resultTopline">
                  <div>
                    <p className="restaurantName">{result.restaurant.name}</p>
                    <h2>{result.dish.name}</h2>
                  </div>
                  <p className="price">{formatPrice(result.dish.priceMinor, result.dish.currency)}</p>
                </div>

                {result.dish.description ? <p className="dishDescription">{result.dish.description}</p> : null}

                <div className="resultMeta">
                  <span>{result.restaurant.address}, {result.restaurant.city}</span>
                  <span>Sjekket {formatCheckedAt(result.menu.lastCheckedAt)}</span>
                  {result.dish.sectionName ? <span>{result.dish.sectionName}</span> : null}
                </div>

                <div className="resultActions">
                  <a href={result.menu.sourceUrl} target="_blank" rel="noreferrer">
                    Se menygrunnlag
                  </a>
                  {result.restaurant.websiteUrl ? (
                    <a href={result.restaurant.websiteUrl} target="_blank" rel="noreferrer">
                      Restaurantens nettside
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
