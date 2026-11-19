import { cuisines, homeCuisines, discoveryDishesForCuisine } from "./cuisine-explorer-data";
import { dishSearchHref, foodKnowledgeHref, withPublicBasePath } from "../lib/public-path";
import type { ArchivedMenuMatch } from "../lib/verified-menu-archive";
import styles from "./verified-menu-archive-view.module.css";
import { FoodIllustration } from "./food-illustration";
import { CuisineCountryFlag } from "./cuisine-country-flag";
import { SaveArchivedMinMatButton } from "./save-archived-min-mat-button";
import { ahaMinMatPilotEnabled } from "../lib/aha-min-mat-pilot";

import { illustrationForDishName } from "./food-illustration-match";
import { regionalFlagUrl } from "./cuisine-explorer-taxonomy";
import { foodTypesForCuisine, matchingCuisineFoodType } from "./cuisine-food-type-data";

function normalizeSavedArchiveName(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("nb-NO")
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim().replace(/\s+/gu, " ");
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
              {ahaMinMatPilotEnabled ? <SaveArchivedMinMatButton evidence={{
                restaurantSlug: result.restaurantSlug,
                sourceUrl: result.sourceUrl,
                observedAt: result.observedAt,
                normalizedName: normalizeSavedArchiveName(result.name),
                priceMinor: result.priceMinor,
                priceKind: result.priceKind as "exact" | "from" | "multiple",
                priceMaxMinor: result.priceMaxMinor,
              }} /> : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function ArchivedMenuBrowse({
  city, initialCuisineName, initialFoodTypeName = "", initialAreaName = "", dishes,
}: {
  readonly city: string;
  readonly initialCuisineName: string;
  readonly initialFoodTypeName?: string;
  readonly initialAreaName?: string;
  readonly dishes: readonly {
    readonly name: string;
    readonly query: string;
    readonly restaurantCount: number;
  }[];
}) {
  // The twelve main kitchen families and their 101 undercategories are
  // discoverable in archive fallback as well as the live-API homepage.
  // The original 19 smaller traditions remain selectable for compatibility.
  const selectedAtlas = homeCuisines.find((cuisine) => cuisine.name === initialCuisineName) ?? null;
  const selectedCuisine = selectedAtlas ??
    cuisines.find((item) => item.name === initialCuisineName) ?? null;

  // URL values may only select registered areas or food families.
  // Areas and food types are alternative dimensions, never simultaneous filters.
  const availableFoodTypes = selectedAtlas ? foodTypesForCuisine(selectedAtlas.name) : [];
  const selectedFoodType = availableFoodTypes.find((item) => item.name === initialFoodTypeName) ?? null;
  const selectedArea = selectedAtlas && !selectedFoodType
    ? selectedAtlas.areas.find((area) => area.name === initialAreaName) ?? null
    : null;

  const rawSuggestions = selectedAtlas
    ? selectedAtlas.areas
        .filter((area) => !selectedArea || area.name === selectedArea.name)
        .flatMap((area) => area.dishes.map((dish) => ({ areaName: area.name, dish })))
        .filter(({ dish }) => !selectedFoodType ||
          matchingCuisineFoodType(selectedAtlas.name, dish.label, selectedFoodType))
    : selectedCuisine ? discoveryDishesForCuisine(selectedCuisine.name) : [];

  // Shared dishes such as Maqluba may appear in multiple national traditions;
  // show a dish once rather than implying one exclusive place of origin.
  const seenSuggestionNames = new Set<string>();
  const suggestions = rawSuggestions.filter(({ dish }) => {
    const key = dish.label.normalize("NFKD").toLocaleLowerCase("nb");
    if (seenSuggestionNames.has(key)) return false;
    seenSuggestionNames.add(key);
    return true;
  });

  // Editorial recommendations are not historical menu matches. Add missing
  // food-family seeds only as links to the actual menu search endpoint.
  const supplementalFoodTypeDishes = selectedAtlas && selectedFoodType
    ? selectedFoodType.dishNames
        .filter((label) => !seenSuggestionNames.has(label.normalize("NFKD").toLocaleLowerCase("nb")))
        .map((label, index) => ({
          areaName: `${selectedAtlas.name} · mattype`,
          dish: {
            id: `atlas-food-type-${selectedAtlas.name}-${selectedFoodType.name}-${index}`,
            label,
            query: label,
            aliases: [] as readonly string[],
            hasKnowledge: false,
            explorerPriority: 0,
          },
        }))
    : [];
  const visibleSuggestions = [...suggestions, ...supplementalFoodTypeDishes];
  const archivedDishes = selectedCuisine ? [] : dishes;

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
      <nav className={styles.cuisineList} aria-label="Utforsk verdens kjøkken">
        <a href={withPublicBasePath("/search") + "?city=" + encodeURIComponent(city)}
          aria-current={!selectedCuisine ? "page" : undefined}>Alle kjøkken</a>
        {homeCuisines.map((cuisine) => (
          <a href={cuisineHref(cuisine.name)} key={cuisine.name}
            aria-current={selectedCuisine?.name === cuisine.name ? "page" : undefined}>
            {cuisine.name}
          </a>
        ))}
      </nav>
      <nav className={styles.cuisineList} aria-label="Flere nasjonale kjøkken og mattradisjoner">
        {cuisines.filter((cuisine) =>
          !homeCuisines.some((main) => main.name === cuisine.name)
        ).map((cuisine) => (
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
          {selectedAtlas ? (
            <div className={styles.italianAtlasSections}>
              <section aria-labelledby="archive-atlas-areas">
                <h3 id="archive-atlas-areas">{selectedAtlas.areasLabel}</h3>
                <p className={styles.meta}>Velg en nasjonal eller regional mattradisjon, eller en type hurtigmat.</p>
                <nav className={styles.italianAtlasTiles} aria-label={`Underkategorier i ${selectedAtlas.name}`}>
                  <a
                    className={styles.italianAtlasTile}
                    href={cuisineHref(selectedAtlas.name)}
                    aria-current={!selectedArea && !selectedFoodType ? "page" : undefined}
                  >
                    <span>Alle underkategorier</span>
                  </a>
                  {selectedAtlas.areas.map((area) => (
                    <a
                      className={styles.italianAtlasTile}
                      href={cuisineHref(selectedAtlas.name, { region: area.name })}
                      aria-current={selectedArea?.name === area.name ? "page" : undefined}
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
                      ) : area.flag ? (
                        <CuisineCountryFlag emoji={area.flag} className={styles.atlasCountryFlag ?? ""} />
                      ) : area.illustration ? (
                        <FoodIllustration name={area.illustration}
                          className={styles.italianTypeIllustration ?? ""} size={40} />
                      ) : null}
                      <span>{area.name}</span>
                    </a>
                  ))}
                </nav>
                {selectedArea?.flagFile ? (
                  <a
                    className={styles.italianFlagSource}
                    href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(selectedArea.flagFile)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kilde og lisens for regionsflagget
                  </a>
                ) : null}
              </section>
              {availableFoodTypes.length > 0 ? (
                <section aria-labelledby="archive-atlas-types">
                  <h3 id="archive-atlas-types">Eller utforsk mattyper</h3>
                  <p className={styles.meta}>Mattyper går på tvers av land og regioner.</p>
                  <nav className={styles.italianAtlasTiles}
                    aria-label={`Mattyper i ${selectedAtlas.name}`}>
                    {availableFoodTypes.map((type) => (
                      <a
                        className={styles.italianAtlasTile}
                        key={type.name}
                        href={cuisineHref(selectedAtlas.name, { mat: type.name })}
                        aria-current={selectedFoodType?.name === type.name ? "page" : undefined}
                      >
                        <FoodIllustration name={type.illustration}
                          className={styles.italianTypeIllustration ?? ""} size={40} />
                        <span>{type.name}</span>
                      </a>
                    ))}
                  </nav>
                </section>
              ) : null}
            </div>
          ) : null}
          {selectedAtlas ? (
            <p className={styles.italianAtlasStatus} role="status">
              {selectedFoodType
                ? `Mattype: ${selectedFoodType.name}`
                : selectedArea
                  ? `Underkategori: ${selectedArea.name}`
                  : `Alle underkategorier i ${selectedAtlas.name}`}
              {" · "}Rettene er forslag til utforskning, ikke bekreftede menytreff.
            </p>
          ) : null}
          <div className={styles.dishList}>
            {visibleSuggestions.map(({ areaName, dish }) => (
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
