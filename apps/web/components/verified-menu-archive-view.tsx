import { BrowseText, CuisineText } from "./browse-text";
import { PageText } from "./page-text";
import { ArchivePrice, ArchiveResultText } from "./localized-archive-result";
import { cuisines, homeCuisines, discoveryDishesForCuisine } from "./cuisine-explorer-data";
import { dishSearchHref, foodKnowledgeHref, withPublicBasePath } from "../lib/public-path";
import { browseArchivedMenuDishes, normalizeArchiveQuery, type ArchivedMenuMatch, type PublicMenuArchive } from "../lib/verified-menu-archive";
import styles from "./verified-menu-archive-view.module.css";
import type { DishBrowseItem } from "@fysen/contracts/dish-browse";
import { FoodIllustration } from "./food-illustration";
import { CuisineCountryFlag } from "./cuisine-country-flag";
import { illustrationForDishName } from "./food-illustration-match";
import { regionalFlagUrl } from "./cuisine-explorer-taxonomy";
import { foodTypesForCuisine, matchingCuisineFoodType } from "./cuisine-food-type-data";

export function ArchivedMenuResults({
  results, query, city,
}: {
  readonly results: readonly ArchivedMenuMatch[];
  readonly query: string;
  readonly city: string;
}) {
  return (
    <section className={styles.surface} aria-label="Menytreff">
      <h3><ArchiveResultText kind="count" count={results.length} query={query} /></h3>
      {results.length === 0 ? (
        <p><ArchiveResultText kind="empty" /></p>
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
                <ArchivePrice priceMinor={result.priceMinor} priceMaxMinor={result.priceMaxMinor} kind={result.priceKind} currency={result.currency} />
              </div>
              {result.priceNote ? <p>{result.priceNote}</p> : null}
              <p className={styles.restaurant}>{result.restaurantName}</p>
              <p>{result.address}, {city}</p>
              <p><ArchiveResultText kind="recorded" /> <time dateTime={result.observedAt}>{result.observedAt.slice(0, 10)}</time></p>
              <a href={result.sourceUrl} target="_blank" rel="noopener noreferrer">
                <ArchiveResultText kind="menu" /> <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function ArchivedMenuBrowse({
  city, initialCuisineName, initialFoodTypeName = "", initialAreaName = "", archive, liveDishes = [],
}: {
  readonly city: string;
  readonly initialCuisineName: string;
  readonly initialFoodTypeName?: string;
  readonly initialAreaName?: string;
  readonly archive: PublicMenuArchive;
  readonly liveDishes?: readonly DishBrowseItem[];
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
  const archivedDishes = selectedCuisine ? [] : browseArchivedMenuDishes(archive, city, 48);
  const mergedDishes = new Map(archivedDishes.map((dish) => [dish.query, { ...dish }]));
  if (!selectedCuisine) {
    for (const dish of liveDishes) {
      const query = normalizeArchiveQuery(dish.query);
      const stored = mergedDishes.get(query);
      const dates = dish.restaurantExamples.flatMap((restaurant) => restaurant.observedAt ? [restaurant.observedAt] : []).sort();
      const newestObservedAt = [stored?.newestObservedAt ?? "", dates.at(-1) ?? ""].sort().at(-1) ?? "";
      mergedDishes.set(query, { name: stored?.name ?? dish.name, query,
        restaurantCount: (stored?.restaurantCount ?? 0) + dish.restaurantCount, newestObservedAt });
    }
  }
  const visibleDishes = [...mergedDishes.values()].sort((a, b) =>
    b.restaurantCount - a.restaurantCount || a.name.localeCompare(b.name, "nb-NO")).slice(0, 48);

  function cuisineHref(name: string, option?: { readonly region?: string; readonly mat?: string }): string {
    const params = new URLSearchParams({ city, cuisine: name });
    if (option?.region) params.set("region", option.region);
    if (option?.mat) params.set("mat", option.mat);
    return withPublicBasePath("/search") + "?" + params.toString();
  }

  return (
    <section className={styles.surface} aria-label="Matlyst og retter">
      <div className={styles.browseHeading}>
        <h1><BrowseText message="allCity" values={{city}} /></h1>
        <p><BrowseText message="archiveIntro" /></p>
      </div>
      <nav className={styles.cuisineList} aria-label="Utforsk verdens kjøkken">
        <a href={withPublicBasePath("/search") + "?city=" + encodeURIComponent(city)}
          aria-current={!selectedCuisine ? "page" : undefined}><BrowseText message="allKitchen" /></a>
        {homeCuisines.map((cuisine) => (
          <a href={cuisineHref(cuisine.name)} key={cuisine.name}
            aria-current={selectedCuisine?.name === cuisine.name ? "page" : undefined}>
            <CuisineText name={cuisine.name} />
          </a>
        ))}
      </nav>
      <nav className={styles.cuisineList} aria-label="Flere nasjonale kjøkken og mattradisjoner">
        {cuisines.filter((cuisine) =>
          !homeCuisines.some((main) => main.name === cuisine.name)
        ).map((cuisine) => (
          <a href={cuisineHref(cuisine.name)} key={cuisine.name}
            aria-current={selectedCuisine?.name === cuisine.name ? "page" : undefined}>
            <CuisineText name={cuisine.name} />
          </a>
        ))}
      </nav>

      {selectedCuisine ? (
        <section aria-label={"Retter fra " + selectedCuisine.name}>
          <h2><CuisineText name={selectedCuisine.name} /></h2>
          <p>{selectedCuisine.context}</p>
          {selectedAtlas ? (
            <div className={styles.italianAtlasSections}>
              <section aria-labelledby="archive-atlas-areas">
                <h3 id="archive-atlas-areas"><CuisineText name={selectedAtlas.areasLabel} /></h3>
                <p className={styles.meta}><BrowseText message="chooseRegion" /></p>
                <nav className={styles.italianAtlasTiles} aria-label={`Underkategorier i ${selectedAtlas.name}`}>
                  <a
                    className={styles.italianAtlasTile}
                    href={cuisineHref(selectedAtlas.name)}
                    aria-current={!selectedArea && !selectedFoodType ? "page" : undefined}
                  >
                    <span><BrowseText message="allSub" /></span>
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
                      <CuisineText name={area.name} />
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
                    <BrowseText message="flagSource" />
                  </a>
                ) : null}
              </section>
              {availableFoodTypes.length > 0 ? (
                <section aria-labelledby="archive-atlas-types">
                  <h3 id="archive-atlas-types"><BrowseText message="exploreTypes" /></h3>
                  <p className={styles.meta}><BrowseText message="acrossRegions" /></p>
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
                        <CuisineText name={type.name} />
                      </a>
                    ))}
                  </nav>
                </section>
              ) : null}
            </div>
          ) : null}
          {selectedAtlas ? (
            <p className={styles.italianAtlasStatus} role="status">
              {selectedFoodType ? <BrowseText message="type" cuisine={selectedFoodType.name} /> : selectedArea ? <BrowseText message="sub" cuisine={selectedArea.name} /> : <BrowseText message="allSubIn" cuisine={selectedAtlas.name} />}
              {" · "}<BrowseText message="suggestionOnly" />
            </p>
          ) : null}
          <div className={styles.dishList}>
            {visibleSuggestions.map(({ areaName, dish }) => (
              <article className={styles.suggestion} key={dish.id}>
                <p className={styles.meta}><CuisineText name={areaName} /></p>
                <div className={styles.dishNameWithArtwork}>
                  {illustrationForDishName(dish.label) ? (
                    <FoodIllustration name={illustrationForDishName(dish.label)!} className={styles.dishArtwork ?? ""} size={42} />
                  ) : null}
                  <h3>{dish.label}</h3>
                </div>
                <div className={styles.links}>
                  <a href={dishSearchHref(dish.query, city)}><PageText message="findDish" /></a>
                  {dish.hasKnowledge ? (
                    <a href={foodKnowledgeHref(dish.id)}><BrowseText message="aboutDish" values={{name:dish.label}} /></a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section aria-label="Utvalgte retter">
          <h2><BrowseText message="exploreDishes" /></h2>
          <p className={styles.meta}><BrowseText message="whereDishes" /></p>
          <div className={styles.dishList}>
            {visibleDishes.map((dish) => (
              <article className={styles.suggestion} key={dish.query}>
                <div className={styles.dishNameWithArtwork}>
                  {illustrationForDishName(dish.name) ? (
                    <FoodIllustration name={illustrationForDishName(dish.name)!} className={styles.dishArtwork ?? ""} size={42} />
                  ) : null}
                  <h3>{dish.name}</h3>
                </div>
                <p className={styles.meta}><BrowseText message={dish.restaurantCount === 1 ? "restaurantsOne" : "restaurantsMany"} values={{count:dish.restaurantCount}} /></p>
                <a href={dishSearchHref(dish.query, city)}><PageText message="findDish" /></a>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
