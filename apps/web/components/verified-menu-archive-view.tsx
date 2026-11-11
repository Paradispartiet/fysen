import { cuisines, discoveryDishesForCuisine } from "./cuisine-explorer-data";
import { dishSearchHref, foodKnowledgeHref, withPublicBasePath } from "../lib/public-path";
import { browseArchivedMenuDishes, type ArchivedMenuMatch, type PublicMenuArchive } from "../lib/verified-menu-archive";
import styles from "./verified-menu-archive-view.module.css";

function confirmedDate(value: string): string {
  if (!Number.isFinite(Date.parse(value))) return value;
  return new Intl.DateTimeFormat("nb-NO", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Oslo",
  }).format(new Date(value));
}

function priceLabel(priceMinor: number | null, priceMaxMinor: number | null, kind: string): string {
  if (priceMinor === null) return "Pris ikke oppgitt";
  const price = new Intl.NumberFormat("nb-NO", {
    style: "currency", currency: "NOK", maximumFractionDigits: 2,
  }).format(priceMinor / 100);
  if (kind === "multiple") {
    const max = priceMaxMinor === null ? null : new Intl.NumberFormat("nb-NO", {
      style: "currency", currency: "NOK", maximumFractionDigits: 2,
    }).format(priceMaxMinor / 100);
    return max ? price + " – " + max : "Flere priser fra " + price;
  }
  return kind === "from" ? "Fra " + price : price;
}

export function ArchivedMenuResults({
  results, query, city,
}: {
  readonly results: readonly ArchivedMenuMatch[];
  readonly query: string;
  readonly city: string;
}) {
  return (
    <section className={styles.surface} aria-label="Dokumenterte menytreff">
      <h3>{results.length} arkivtreff på «{query}»</h3>
      <p className={styles.meta}>Dokumenterte menyer med individuelle kontrolldatoer. Ikke sanntid – kontroller restaurantens meny før du bestiller.</p>
      {results.length === 0 ? (
        <p>Ingen treff i det sist godkjente menyarkivet. Dette sier ikke noe om dagens menyer.</p>
      ) : (
        <div className={styles.results}>
          {results.map((result, index) => (
            <article className={styles.result} key={result.restaurantSlug + ":" + result.name + ":" + index}>
              <div className={styles.resultHeading}>
                <h4>{result.name}</h4>
                <strong>{priceLabel(result.priceMinor, result.priceMaxMinor, result.priceKind)}</strong>
              </div>
              <p className={styles.restaurant}>{result.restaurantName}</p>
              <p>{result.address}, {city}</p>
              <p className={styles.sourceDate}>Meny sist kontrollert {confirmedDate(result.observedAt)}</p>
              <a href={result.sourceUrl} target="_blank" rel="noopener noreferrer">
                Kontroller restaurantens meny <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function ArchivedMenuBrowse({
  city, initialCuisineName, archive,
}: {
  readonly city: string;
  readonly initialCuisineName: string;
  readonly archive: PublicMenuArchive;
}) {
  const selectedCuisine = cuisines.find((item) => item.name === initialCuisineName) ?? null;
  const suggestions = selectedCuisine ? discoveryDishesForCuisine(selectedCuisine.name) : [];
  const archivedDishes = selectedCuisine ? [] : browseArchivedMenuDishes(archive, city, 48);

  function cuisineHref(name: string): string {
    const params = new URLSearchParams({ city, cuisine: name });
    return withPublicBasePath("/search") + "?" + params.toString();
  }

  return (
    <section className={styles.surface} aria-label="Matlyst og dokumenterte menyer">
      <div className={styles.browseHeading}>
        <h1>Dokumenterte retter i {city}</h1>
        <p>Fersksøket har ingen treff akkurat nå, men Fysen har mange dokumenterte restaurantmenyer. Se rettene og datoen hver menykilde sist ble kontrollert. Utvalg og priser må bekreftes hos restauranten.</p>
        <p className={styles.meta}>Menyindeks sist oppdatert {archive.lastRefreshAt ? confirmedDate(archive.lastRefreshAt) : "ukjent dato"}. Dette er tidspunktet for indeksen, ikke siste kontroll av hver enkelt meny. Grunnarkiv fra {confirmedDate(archive.archiveDate)}.</p>
      </div>
      <nav className={styles.cuisineList} aria-label="Velg kjøkken i Matlyst">
        <a href={withPublicBasePath("/search") + "?city=" + encodeURIComponent(city)}
          aria-current={!selectedCuisine ? "page" : undefined}>Alle kjøkken</a>
        {cuisines.map((cuisine) => (
          <a href={cuisineHref(cuisine.name)} key={cuisine.name}
            aria-current={selectedCuisine?.name === cuisine.name ? "page" : undefined}>
            {cuisine.name}
          </a>
        ))}
      </nav>

      {selectedCuisine ? (
        <section aria-label={"Retter fra " + selectedCuisine.name}>
          <h2>{selectedCuisine.name}</h2>
          <p>{selectedCuisine.context}</p>
          <div className={styles.dishList}>
            {suggestions.map(({ areaName, dish }) => (
              <article className={styles.suggestion} key={dish.id}>
                <p className={styles.meta}>{areaName}</p>
                <h3>{dish.label}</h3>
                <div className={styles.links}>
                  <a href={dishSearchHref(dish.query, city)}>Søk i menyarkivet</a>
                  {dish.hasKnowledge ? (
                    <a href={foodKnowledgeHref(dish.id)}>Lær om retten</a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section aria-label="Retter fra menyarkivet">
          <h2>Et utvalg dokumenterte retter</h2>
          <p className={styles.meta}>Sortert etter antall restauranter med dokumentert menytreff. Kildedatoene kan variere mellom restauranter. Bruk søkefeltet for å finne flere retter.</p>
          <div className={styles.dishList}>
            {archivedDishes.map((dish) => (
              <article className={styles.suggestion} key={dish.query}>
                <h3>{dish.name}</h3>
                <p className={styles.meta}>Dokumentert hos {dish.restaurantCount} {dish.restaurantCount === 1 ? "restaurant" : "restauranter"}.</p>
                <p className={styles.sourceDate}>Nyeste kildekontroll: {confirmedDate(dish.newestObservedAt)}. Datoene kan variere mellom restaurantene.</p>
                <a href={dishSearchHref(dish.query, city)}>Finn i menyarkivet</a>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
