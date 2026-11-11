import { cuisines, discoveryDishesForCuisine } from "./cuisine-explorer-data";
import { dishSearchHref, foodKnowledgeHref, withPublicBasePath } from "../lib/public-path";
import { browseArchivedMenuDishes, type ArchivedMenuMatch, type PublicMenuArchive } from "../lib/verified-menu-archive";
import styles from "./verified-menu-archive-view.module.css";

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
    <section className={styles.surface} aria-label="Menytreff">
      <h3>{results.length} treff på «{query}»</h3>
      {results.length === 0 ? (
        <p>Ingen treff på denne retten. Prøv et annet søkeord.</p>
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
              <a href={result.sourceUrl} target="_blank" rel="noopener noreferrer">
                Se meny <span aria-hidden="true">↗</span>
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
    <section className={styles.surface} aria-label="Matlyst og retter">
      <div className={styles.browseHeading}>
        <h1>Alle retter i {city}</h1>
        <p>Utforsk restauranter og retter, velg kjøkken eller søk etter akkurat det du har lyst på.</p>
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
                  <a href={dishSearchHref(dish.query, city)}>Finn retten</a>
                  {dish.hasKnowledge ? (
                    <a href={foodKnowledgeHref(dish.id)}>Lær om retten</a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section aria-label="Utvalgte retter">
          <h2>Utforsk retter</h2>
          <p className={styles.meta}>Se hvor du finner rettene, eller bruk søkefeltet for å finne flere.</p>
          <div className={styles.dishList}>
            {archivedDishes.map((dish) => (
              <article className={styles.suggestion} key={dish.query}>
                <h3>{dish.name}</h3>
                <p className={styles.meta}>{dish.restaurantCount} {dish.restaurantCount === 1 ? "restaurant" : "restauranter"}</p>
                <a href={dishSearchHref(dish.query, city)}>Finn retten</a>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
