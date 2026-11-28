"use client";

import { usePreviewLocale } from "./language-preview";
import { browseText, type BrowseKey } from "../lib/browse-messages";
import { cuisineLabel } from "../lib/cuisine-labels";
import { resultText } from "../lib/result-messages";
import { pageText } from "../lib/page-messages";

import type { DishBrowseItem, DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { useMemo, useState } from "react";
import { foodDishCatalog } from "../content/food-knowledge/catalog";
import { foodKnowledgeDishIdSet } from "../content/food-knowledge/manifest";
import { browseDishDisplayName, sortBrowseDishesForDisplay } from "../lib/dish-browse-display";
import {
  discoveryCoverage,
  createDiscoveryMatcher,
  liveDishMatchesDescriptor,
  normalizeDiscoveryText,
  type DiscoveryDishDescriptor,
} from "../lib/dish-discovery";
import { dishBrowseCuisineHref, dishSearchHref, foodKnowledgeHref } from "../lib/public-path";
import {
  cuisines,
  homeCuisines,
  discoveryDishesForCuisine,
  type Cuisine,
  type CuisineDiscoveryDish,
} from "./cuisine-explorer-data";
import { SearchState } from "./search-state";
import { DishPhotoThumbnail } from "./dish-photo-gallery";
import { FoodIllustration } from "./food-illustration";
import { CuisineCountryFlag } from "./cuisine-country-flag";
import { regionalFlagUrl } from "./cuisine-explorer-taxonomy";
import { foodTypesForCuisine, matchingCuisineFoodType } from "./cuisine-food-type-data";

type KnowledgeDish = (typeof foodDishCatalog)[number];

type EditorialCoverage = CuisineDiscoveryDish & {
  readonly restaurantCount: number;
};

const cuisineOptions = [
  ...homeCuisines,
  ...cuisines.filter((cuisine) => !homeCuisines.some((main) => main.name === cuisine.name)),
];
const cuisineByName = new Map(cuisineOptions.map((cuisine) => [cuisine.name, cuisine] as const));

function knowledgeDescriptor(dish: KnowledgeDish): DiscoveryDishDescriptor {
  return {
    label: dish.name,
    query: dish.query,
    aliases: dish.aliases,
  };
}

const matchKnowledgeDish = createDiscoveryMatcher(
  [...foodDishCatalog]
    .filter((dish) => foodKnowledgeDishIdSet.has(dish.id))
    .sort((left, right) => right.explorerPriority - left.explorerPriority || left.name.localeCompare(right.name, "nb"))
    .map((dish) => ({ ...knowledgeDescriptor(dish), dish })),
);

function knowledgeDishForLiveItem(item: DishBrowseItem): KnowledgeDish | null {
  return matchKnowledgeDish(item)?.dish ?? null;
}

function matchesText(values: readonly string[], query: string): boolean {
  if (!query) return true;
  return values.some((value) => normalizeDiscoveryText(value).includes(query));
}

function discoveryScopeForCuisines(cuisineScope: readonly Cuisine[]): CuisineDiscoveryDish[] {
  const seen = new Set<string>();
  return cuisineScope
    .flatMap((cuisine) => homeCuisines.includes(cuisine)
      ? cuisine.areas.flatMap((area) =>
          area.dishes.map((dish) => ({ areaName: area.name, dish }))
        )
      : discoveryDishesForCuisine(cuisine.name))
    .filter(({ dish }) => {
      if (seen.has(dish.id)) return false;
      seen.add(dish.id);
      return true;
    });
}

function liveItemsForDiscoveryScope(items: readonly DishBrowseItem[], scope: readonly CuisineDiscoveryDish[]): DishBrowseItem[] {
  if (scope.length === 0) return [];
  return items.filter((item) => scope.some(({ dish }) => liveDishMatchesDescriptor(item, dish)));
}

export function DishBrowse({
  city,
  data,
  loading = false,
  error = null,
  initialCuisineName = "",
  initialAreaName = "",
  initialFoodTypeName = "",
}: {
  city: string;
  data: DishBrowseResponse | null;
  loading?: boolean;
  error?: string | null;
  initialCuisineName?: string;
  initialAreaName?: string;
  initialFoodTypeName?: string;
}) {
  const locale = usePreviewLocale();
  const t = (key: BrowseKey, values?: Record<string,string|number>) => browseText(locale,key,values);
  const initialCuisine = cuisineByName.get(initialCuisineName) ?? null;
  const initialAtlas = homeCuisines.find((cuisine) => cuisine.name === initialCuisine?.name) ?? null;
  const initialType = initialAtlas
    ? foodTypesForCuisine(initialAtlas.name).find((type) => type.name === initialFoodTypeName) ?? null
    : null;
  const initialArea = initialAtlas && !initialType
    ? initialAtlas.areas.find((area) => area.name === initialAreaName) ?? null
    : null;

  const [filter, setFilter] = useState("");
  const [selectedCuisineName, setSelectedCuisineName] = useState<string | null>(initialCuisine?.name ?? null);
  const [selectedCuisineArea, setSelectedCuisineArea] = useState<string | null>(initialArea?.name ?? null);
  const [selectedFoodTypeName, setSelectedFoodTypeName] = useState<string | null>(initialType?.name ?? null);
  const normalizedFilter = normalizeDiscoveryText(filter);

  const selectedCuisine = useMemo(
    () => selectedCuisineName ? cuisineByName.get(selectedCuisineName) ?? null : null,
    [selectedCuisineName],
  );

  const selectedAtlas = selectedCuisine
    ? homeCuisines.find((cuisine) => cuisine.name === selectedCuisine.name) ?? null
    : null;
  const availableFoodTypes = selectedAtlas ? foodTypesForCuisine(selectedAtlas.name) : [];
  const selectedFoodType = availableFoodTypes.find((type) => type.name === selectedFoodTypeName) ?? null;

  const cuisineAreas = useMemo(() => {
    if (!selectedCuisine) return [];
    return selectedAtlas
      ? selectedAtlas.areas.map((area) => area.name)
      : [...new Set(discoveryDishesForCuisine(selectedCuisine.name).map((entry) => entry.areaName))]
          .sort((left, right) => left.localeCompare(right, "nb"));
  }, [selectedAtlas, selectedCuisine]);

  const cuisineDiscoveryScope = useMemo(() => {
    const all = selectedCuisine ? discoveryScopeForCuisines([selectedCuisine]) : [];
    const scoped = all
      .filter((entry) => !selectedCuisineArea || entry.areaName === selectedCuisineArea)
      .filter(({ dish }) => !selectedFoodType || !selectedCuisine || matchingCuisineFoodType(
        selectedCuisine.name, dish.label, selectedFoodType,
      ));

    // Food types can span several geographic origins. Show missing catalog
    // examples as search suggestions, never as an assertion that a restaurant
    // has a verified menu item.
    if (!selectedFoodType || !selectedCuisine) return scoped;
    const seen = new Set(scoped.map(({ dish }) => normalizeDiscoveryText(dish.label)));
    const additions: CuisineDiscoveryDish[] = selectedFoodType.dishNames
      .filter((label) => !seen.has(normalizeDiscoveryText(label)))
      .map((label, index) => ({
        areaName: "Mattype",
        dish: {
          id: `dish-food-type-${selectedCuisine.name}-${selectedFoodType.name}-${index}`,
          label,
          query: label,
          aliases: [],
          hasKnowledge: false,
          explorerPriority: 0,
        },
      }));
    return [...scoped, ...additions];
  }, [selectedCuisine, selectedCuisineArea, selectedFoodType]);

  const editorialDishes = useMemo<EditorialCoverage[]>(() => {
    if (!data || !selectedCuisine) return [];
    return cuisineDiscoveryScope
      .filter(({ dish }) => matchesText([dish.label, dish.query, ...dish.aliases], normalizedFilter))
      .map((entry) => ({
        ...entry,
        restaurantCount: discoveryCoverage(data.dishes, entry.dish).restaurantCount,
      }))
      .sort((left, right) => {
        const leftCovered = left.restaurantCount > 0 ? 1 : 0;
        const rightCovered = right.restaurantCount > 0 ? 1 : 0;
        if (leftCovered !== rightCovered) return rightCovered - leftCovered;
        if (left.restaurantCount !== right.restaurantCount) return right.restaurantCount - left.restaurantCount;
        if (left.dish.explorerPriority !== right.dish.explorerPriority) {
          return right.dish.explorerPriority - left.dish.explorerPriority;
        }
        return left.dish.label.localeCompare(right.dish.label, "nb");
      });
  }, [data, normalizedFilter, selectedCuisine, cuisineDiscoveryScope]);

  const visibleLiveDishes = useMemo(() => {
    if (!data) return [];
    let dishes = data.dishes.filter((dish) => !normalizedFilter || matchesText([dish.name, dish.query, browseDishDisplayName(dish.name)], normalizedFilter));

    if (selectedCuisine) {
      const scopedIds = new Set(liveItemsForDiscoveryScope(data.dishes, cuisineDiscoveryScope).map((dish) => dish.id));
      dishes = dishes.filter((dish) => scopedIds.has(dish.id));
    }

    if (selectedFoodType && selectedCuisine) {
      dishes = dishes.filter((dish) => matchingCuisineFoodType(
        selectedCuisine.name, dish.name, selectedFoodType,
      ));
    }

    return sortBrowseDishesForDisplay(dishes);
  }, [cuisineDiscoveryScope, data, normalizedFilter, selectedCuisine, selectedFoodType]);

  const cuisinePath = [selectedCuisine?.name, selectedCuisineArea, selectedFoodType?.name]
    .filter((value): value is string => Boolean(value));

  function replaceBrowseUrl(
    cuisineName?: string,
    selection?: { readonly region?: string; readonly mat?: string },
  ): void {
    window.history.replaceState(null, "", dishBrowseCuisineHref(city, cuisineName, selection));
  }

  function chooseCuisine(cuisine: Cuisine | null): void {
    setSelectedCuisineName(cuisine?.name ?? null);
    setSelectedCuisineArea(null);
    setSelectedFoodTypeName(null);
    replaceBrowseUrl(cuisine?.name);
  }

  function chooseArea(name: string | null): void {
    setSelectedCuisineArea(name);
    setSelectedFoodTypeName(null);
    replaceBrowseUrl(selectedCuisine?.name, name ? { region: name } : undefined);
  }

  function chooseFoodType(name: string | null): void {
    setSelectedCuisineArea(null);
    setSelectedFoodTypeName(name);
    replaceBrowseUrl(selectedCuisine?.name, name ? { mat: name } : undefined);
  }

  return (
    <section className="dishBrowse" aria-labelledby="dish-browse-title">
      <header className="dishBrowseHeader">
        <p className="eyebrow">{city}</p>
        <h1 id="dish-browse-title">{t("allCity",{city})}</h1>
        <p>
          {t("liveIntro")}
        </p>
      </header>

      {loading ? <p className="dishBrowseStatus">{t("loading")}</p> : null}

      {!loading && error ? (
        <SearchState title={t("loadError")} body={pageText(locale,"retryLater")} />
      ) : null}

      {!loading && !error && data && data.dishes.length === 0 ? (
        <SearchState
          title={t("noneCity",{city})}
          body={t("tryOther")}
        />
      ) : null}

      {!loading && !error && data && data.dishes.length > 0 ? (
        <>
          <div className="dishBrowseControls">
            <label className="dishBrowseFilter">
              <span>{t("findDish")}</span>
              <input
                type="search"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="Ramen, carbonara, kebab …"
                autoComplete="off"
              />
            </label>

            <div className="dishBrowseTaxonomyLevel">
              <span>{t("kitchen")}</span>
              <div className="dishBrowseCuisineFilters" aria-label={t("filterKitchen")}>
                <button type="button" className={!selectedCuisine ? "isActive" : undefined} aria-pressed={!selectedCuisine} onClick={() => chooseCuisine(null)}>
                  {t("allKitchen")}
                </button>
                {cuisineOptions.map((cuisine) => (
                  <button
                    type="button"
                    key={cuisine.name}
                    className={selectedCuisine?.name === cuisine.name ? "isActive" : undefined}
                    aria-pressed={selectedCuisine?.name === cuisine.name}
                    onClick={() => chooseCuisine(cuisine)}
                  >
                    {cuisineLabel(cuisine.name,locale)}
                  </button>
                ))}
              </div>
            </div>

            {selectedCuisine && cuisineAreas.length > 1 ? (
              <div className="dishBrowseTaxonomyLevel">
                <span>{cuisineLabel(selectedCuisine.areasLabel,locale)}</span>
                <div className="dishBrowseRegionFilters" aria-label={t("regionFilter",{name:cuisineLabel(selectedCuisine.name,locale)})}>
                  <button
                    type="button"
                    className={!selectedCuisineArea ? "isActive" : undefined}
                    aria-pressed={!selectedCuisineArea}
                    onClick={() => chooseArea(null)}
                  >
                    {t("allOf",{name:cuisineLabel(selectedCuisine.name,locale)})}
                  </button>
                  {cuisineAreas.map((areaName) => {
                    const area = selectedAtlas?.areas.find((item) => item.name === areaName);
                    return (
                      <button
                        type="button"
                        key={areaName}
                        className={[
                          selectedAtlas ? "atlasRegionTile" : "",
                          selectedCuisineArea === areaName ? "isActive" : "",
                        ].filter(Boolean).join(" ")}
                        aria-pressed={selectedCuisineArea === areaName}
                        onClick={() => chooseArea(areaName)}
                      >
                        {area?.flagFile ? (
                          <img src={regionalFlagUrl(area.flagFile)}
                            className="dishBrowseRegionFlag" alt="" aria-hidden="true"
                            loading="lazy" width="46" height="31" />
                        ) : area?.flag ? (
                          <CuisineCountryFlag emoji={area.flag} className="dishBrowseCountryFlag" />
                        ) : area?.illustration ? (
                          <FoodIllustration name={area.illustration}
                            className="dishBrowseAreaArtwork" size={38} />
                        ) : null}
                        <span>{cuisineLabel(areaName,locale)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {availableFoodTypes.length > 0 ? (
              <div className="dishBrowseTaxonomyLevel">
                <span>{t("chooseType",{name:cuisineLabel(selectedCuisine?.name ?? "",locale)})}</span>
                <div className="dishBrowseItalianTypes" aria-label={t("typeFilter",{name:cuisineLabel(selectedCuisine?.name ?? "",locale)})}>
                  <button
                    type="button"
                    className={!selectedFoodType ? "isActive" : undefined}
                    aria-pressed={!selectedFoodType}
                    onClick={() => chooseFoodType(null)}
                  >
                    {cuisineLabel("Alle mattyper",locale)}
                  </button>
                  {availableFoodTypes.map((type) => (
                    <button
                      type="button"
                      key={type.name}
                      className={selectedFoodTypeName === type.name ? "isActive" : undefined}
                      aria-pressed={selectedFoodTypeName === type.name}
                      onClick={() => chooseFoodType(type.name)}
                    >
                      <FoodIllustration name={type.illustration} className="dishBrowseTypeArtwork" size={30} />
                      <span>{cuisineLabel(type.name,locale)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {cuisinePath.length > 0 ? (
              <p className="dishBrowseTaxonomyPath" aria-live="polite">{cuisinePath.map(name=>cuisineLabel(name,locale)).join(" → ")}</p>
            ) : null}
          </div>

          {selectedCuisine ? (
            <section className="dishBrowseEditorial" aria-labelledby="dish-browse-editorial-title">
              <div className="dishBrowseSectionHeading">
                <div>
                  <p className="eyebrow">{t("kitchen")}</p>
                  <h2 id="dish-browse-editorial-title">{cuisineLabel(selectedFoodType?.name ?? selectedCuisineArea ?? selectedCuisine.name,locale)}</h2>
                </div>
                <p>{t("editorialIntro")}</p>
              </div>

              {editorialDishes.length > 0 ? (
                <div className="dishBrowseEditorialGrid">
                  {editorialDishes.map(({ areaName, dish, restaurantCount }) => (
                    <article className="dishBrowseEditorialDish" key={dish.id} data-has-coverage={restaurantCount > 0 ? "true" : "false"}>
                      <div>
                        <span>{areaName}</span>
                        <h3>{dish.label}</h3>
                        <p>
                          {restaurantCount > 0
                            ? t(restaurantCount === 1 ? "foundOne" : "foundMany",{count:restaurantCount})
                            : t("noDish")}
                        </p>
                      </div>
                      <DishPhotoThumbnail dishId={dish.id} label={dish.label} />
                      <div className="dishBrowseEditorialActions">
                        <a href={dishSearchHref(dish.query, data.city)}>{resultText(locale,"menuMatches")} <span aria-hidden="true">→</span></a>
                        {dish.hasKnowledge ? (
                          <a href={foodKnowledgeHref(dish.id)}>{resultText(locale,"learnDish")} <span aria-hidden="true">↗</span></a>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="dishBrowseEmptyFilter">{t("emptyFilter")}</p>
              )}
            </section>
          ) : null}

          <section className="dishBrowseLive" aria-labelledby="dish-browse-live-title">
            <div className="dishBrowseSectionHeading dishBrowseLiveHeading">
              <div>
                <p className="eyebrow">{t("dishes")}</p>
                <h2 id="dish-browse-live-title">{t("findDish")}</h2>
              </div>
              <div className="dishBrowseMeta">
                <p>{t("count",{visible:visibleLiveDishes.length,total:data.count})}</p>
              </div>
            </div>

            {visibleLiveDishes.length > 0 ? (
              <div className="dishBrowseList">
                {visibleLiveDishes.map((dish) => {
                  const knowledgeDish = knowledgeDishForLiveItem(dish);
                  // The matcher may recognize a family from variants or aliases.
                  // A photo is safe here only if the visible live name exactly
                  // equals the canonical name or query, never by substring.
                  const exactPhotoDish = knowledgeDish && [knowledgeDish.name, knowledgeDish.query].some(
                    (candidate) => normalizeDiscoveryText(candidate) === normalizeDiscoveryText(dish.name),
                  ) ? knowledgeDish : null;
                  return (
                    <div className="dishBrowseItem" key={dish.id}>
                      <a className="dishBrowseItemMain" href={dishSearchHref(dish.query, data.city)}>
                        {exactPhotoDish ? <DishPhotoThumbnail dishId={exactPhotoDish.id} label={exactPhotoDish.name} /> : null}
                        <div className="dishBrowseItemContent">
                          <strong>{browseDishDisplayName(dish.name)}</strong>
                          <span>{t(dish.restaurantCount === 1 ? "restaurantsOne" : "restaurantsMany",{count:dish.restaurantCount})}</span>
                        </div>
                      </a>
                      {knowledgeDish ? (
                        <a className="dishBrowseKnowledgeLink" href={foodKnowledgeHref(knowledgeDish.id)} aria-label={t("aboutDish",{name:knowledgeDish.name})}>
                          {resultText(locale,"learnDish")} <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="dishBrowseEmptyFilter">{t("canonicalEmpty")}</p>
            )}
          </section>
        </>
      ) : null}
    </section>
  );
}
