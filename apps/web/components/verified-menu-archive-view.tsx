import { cuisines, homeCuisines, discoveryDishesForCuisine } from "./cuisine-explorer-data";
import { dishSearchHref, foodKnowledgeHref, withPublicBasePath } from "../lib/public-path";
import { browseArchivedMenuDishes, type ArchivedMenuMatch, type PublicMenuArchive } from "../lib/verified-menu-archive";
import styles from "./verified-menu-archive-view.module.css";
import { FoodIllustration } from "./food-illustration";
import { illustrationForDishName } from "./food-illustration-match";
import { italianFoodTypes, regionalFlagUrl } from "./cuisine-explorer-taxonomy";
import { italianFoodTypeByName, matchesItalianFoodType } from "./italian-food-type-filter";

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
                <div className={styles.dishNameWithArtwork}>
                  {illustrationForDishName(result.name) ? (
                    <FoodIllustration name={illustrationForDishName(result.name)!} className={styles.dishArtwork ?? ""} size={42} />
                  ) : null}
                  <h4>{result.name}</h4>
                </div>
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
  city, initialCuisineName, initialItalianTypeName = "", initialItalianRegionName = "", archive,
}: {
  readonly city: string;
  readonly initialCuisineName: string;
  readonly initialItalianTypeName?: string;
  readonly initialItalianRegionName?: string;
  readonly archive: PublicMenuArchive;
}) {
  const selectedCuisine = cuisines.find((item) => item.name === initialCuisineName) ?? null;
  const italianAtlas = homeCuisines.find((cuisine) => cuisine.name === "Italiensk") ?? null;
  const italianActive = selectedCuisine?.name === "Italiensk" && italianAtlas !== null;
  // Query parameters are accepted only when they match a known food type or region.
  // Choosing a food type supersedes a regional selection, never both at once.
  const selectedItalianType = italianActive ? italianFoodTypeByName(initialItalianTypeName) : null;
  const selectedItalianRegion = italianActive && !selectedItalianType
    ? italianAtlas.areas.find((area) => area.name === initialItalianRegionName) ?? null
    : null;
  const suggestions = selectedCuisine
    ? italianActive
      ? italianAtlas.areas
          .filter((area) => !selectedItalianRegion || area.name === selectedItalianRegion.name)
          .flatMap((area) => area.dishes.map((dish) => ({ areaName: area.name, dish })))
          .filter(({ dish }) => !selectedItalianType || matchesItalianFoodType(dish.label, selectedItalianType))
      : discoveryDishesForCuisine(selectedCuisine.name)
    : [];
  const archivedDishes = selectedCuisine ? [] : browseArchivedMenuDishes(archive, city, 48);

  function cuisineHref(name: string, option?: { readonly region?: string; readonly mat?: string }): string {
    const params = new URLSearchParams({ city, cuisine: name });
    if (option?.region) params.set("region", option.region);
    if (option?.mat) params.set("mat", option.mat);
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
          {italianActive ? (
            <div className={styles.italianAtlasSections}>
              <section aria-labelledby="archive-italian-regions">
                <h3 id="archive-italian-regions">Regionale kjøkken</h3>
                <p className={styles.meta}>Velg en mattradisjon med tydelig geografisk tilknytning.</p>
                <nav className={styles.italianAtlasTiles} aria-label="Italienske regioner">
                  <a
                    className={styles.italianAtlasTile}
                    href={cuisineHref("Italiensk")}
                    aria-current={!selectedItalianRegion && !selectedItalianType ? "page" : undefined}
                  >
                    <span>Alle regioner</span>
                  </a>
                  {italianAtlas.areas.map((area) => (
                    <a
                      className={styles.italianAtlasTile}
                      href={cuisineHref("Italiensk", { region: area.name })}
                      aria-current={selectedItalianRegion?.name === area.name ? "page" : undefined}
                      key={area.name}
                    >
                      {area.flagFile ? (
                        <img
                          className={styles.italianRegionFlag}
                          src={regionalFlagUrl(area.flagFile)}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          width="46"
                          height="32"
                        />
                      ) : null}
                      <span>{area.name}</span>
                    </a>
                  ))}
                </nav>
                {selectedItalianRegion?.flagFile ? (
                  <a
                    className={styles.italianFlagSource}
                    href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(selectedItalianRegion.flagFile)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kilde og lisens for regionsflagget
                  </a>
                ) : null}
              </section>
              <section aria-labelledby="archive-italian-types">
                <h3 id="archive-italian-types">Eller utforsk mattyper</h3>
                <p className={styles.meta}>Pizza, pasta og andre retter – uavhengig av region.</p>
                <nav className={styles.italianAtlasTiles} aria-label="Italienske mattyper">
                  {italianFoodTypes.map((type) => (
                    <a
                      className={styles.italianAtlasTile}
                      key={type.name}
                      href={cuisineHref("Italiensk", { mat: type.name })}
                      aria-current={selectedItalianType?.name === type.name ? "page" : undefined}
                    >
                      <FoodIllustration name={type.illustration} className={styles.italianTypeIllustration ?? ""} size={40} />
                      <span>{type.name}</span>
                    </a>
                  ))}
                </nav>
              </section>
            </div>
          ) : null}
          {italianActive ? (
            <p className={styles.italianAtlasStatus} role="status">
              {selectedItalianType
                ? `Mattyper: ${selectedItalianType.name}`
                : selectedItalianRegion
                  ? `Region: ${selectedItalianRegion.name}`
                  : "Alle de ti italienske regionene"}
              {" · "}Rettene er forslag til utforskning, ikke bekreftede menytreff.
            </p>
          ) : null}
          <div className={styles.dishList}>
            {suggestions.map(({ areaName, dish }) => (
              <article className={styles.suggestion} key={dish.id}>
                <p className={styles.meta}>{areaName}</p>
                <div className={styles.dishNameWithArtwork}>
                  {illustrationForDishName(dish.label) ? (
                    <FoodIllustration name={illustrationForDishName(dish.label)!} className={styles.dishArtwork ?? ""} size={42} />
                  ) : null}
                  <h3>{dish.label}</h3>
                </div>
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
                <div className={styles.dishNameWithArtwork}>
                  {illustrationForDishName(dish.name) ? (
                    <FoodIllustration name={illustrationForDishName(dish.name)!} className={styles.dishArtwork ?? ""} size={42} />
                  ) : null}
                  <h3>{dish.name}</h3>
                </div>
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
