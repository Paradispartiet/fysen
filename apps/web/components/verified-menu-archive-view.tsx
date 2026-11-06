import { cuisines, discoveryDishesForCuisine } from "./cuisine-explorer-data";
import { dishSearchHref, foodKnowledgeHref, withPublicBasePath } from "../lib/public-path";
import type { ArchivedMenuMatch, PublicMenuArchive } from "../lib/verified-menu-archive";
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

function ArchiveIntro({ archive, city }: {
  readonly archive: PublicMenuArchive;
  readonly city: string;
}) {
  return (
    <header className={styles.intro}>
      <p className={styles.eyebrow}>Dokumenterte menyer · {city}</p>
      <h2>Menyarkiv mens ferske søk er utilgjengelige</h2>
      <p>
        Dette er historiske, sist kontrollerte menyer, ikke sanntidsinformasjon.
        Åpningstider, pris og tilgjengelighet kan ha endret seg.
        Kontroller opplysningene hos restauranten.
      </p>
      <p className={styles.meta}>
        Opprinnelig arkivdato: {archive.archiveDate}
        {archive.lastRefreshAt ? " · Siste katalogoppdatering: " + confirmedDate(archive.lastRefreshAt) : ""}
      </p>
    </header>
  );
}

export function ArchivedMenuResults({
  archive, results, query, city,
}: {
  readonly archive: PublicMenuArchive;
  readonly results: readonly ArchivedMenuMatch[];
  readonly query: string;
  readonly city: string;
}) {
  return (
    <section className={styles.surface} aria-label="Historiske menytreff">
      <ArchiveIntro archive={archive} city={city} />
      <h3>{results.length} arkivtreff på «{query}»</h3>
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
  archive, city, initialCuisineName,
}: {
  readonly archive: PublicMenuArchive;
  readonly city: string;
  readonly initialCuisineName: string;
}) {
  const selectedCuisine = cuisines.find((item) => item.name === initialCuisineName) ?? null;
  const suggestions = selectedCuisine ? discoveryDishesForCuisine(selectedCuisine.name) : [];

  function cuisineHref(name: string): string {
    const params = new URLSearchParams({ city, cuisine: name });
    return withPublicBasePath("/search") + "?" + params.toString();
  }

  return (
    <section className={styles.surface} aria-label="Matlyst og historiske menyer">
      <ArchiveIntro archive={archive} city={city} />
      <div className={styles.browseHeading}>
        <h1>Matlyst</h1>
        <p>Utforsk kjøkken, tradisjoner og retter. Menytreff åpnes i det sist kontrollerte arkivet.</p>
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
        <p className={styles.meta}>Velg et kjøkken for å se konkrete retter og matkunnskap.</p>
      )}
    </section>
  );
}
