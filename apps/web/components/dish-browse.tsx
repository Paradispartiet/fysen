"use client";

import type { DishBrowseItem, DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { useMemo, useState } from "react";
import { foodDishCatalog } from "../content/food-knowledge/catalog";
import { foodKnowledgeDishIdSet } from "../content/food-knowledge/manifest";
import {
  discoveryCoverage,
  liveDishMatchesDescriptor,
  normalizeDiscoveryText,
  type DiscoveryDishDescriptor,
} from "../lib/dish-discovery";
import { dishBrowseCuisineHref, dishSearchHref, foodKnowledgeHref } from "../lib/public-path";
import {
  cuisines,
  discoveryDishesForCuisine,
  type Cuisine,
  type CuisineDiscoveryDish,
  type DishSuggestion,
} from "./cuisine-explorer-data";
import { SearchState } from "./search-state";

type KnowledgeDish = (typeof foodDishCatalog)[number];

type EditorialCoverage = CuisineDiscoveryDish & {
  readonly restaurantCount: number;
};

const cuisineByName = new Map(cuisines.map((cuisine) => [cuisine.name, cuisine] as const));

function knowledgeDescriptor(dish: KnowledgeDish): DiscoveryDishDescriptor {
  return {
    label: dish.name,
    query: dish.query,
    aliases: dish.aliases,
  };
}

function suggestionDescriptor(dish: DishSuggestion): DiscoveryDishDescriptor {
  return {
    label: dish.label,
    query: dish.query,
    aliases: dish.aliases,
  };
}

function knowledgeDishForLiveItem(item: DishBrowseItem): KnowledgeDish | null {
  return [...foodDishCatalog]
    .filter((dish) => foodKnowledgeDishIdSet.has(dish.id) && liveDishMatchesDescriptor(item, knowledgeDescriptor(dish)))
    .sort((left, right) => right.explorerPriority - left.explorerPriority || left.name.localeCompare(right.name, "nb"))[0] ?? null;
}

function matchesText(values: readonly string[], query: string): boolean {
  if (!query) return true;
  return values.some((value) => normalizeDiscoveryText(value).includes(query));
}

function discoveryScopeForCuisines(cuisineScope: readonly Cuisine[]): CuisineDiscoveryDish[] {
  const seen = new Set<string>();
  return cuisineScope
    .flatMap((cuisine) => discoveryDishesForCuisine(cuisine.name))
    .filter(({ dish }) => {
      if (seen.has(dish.id)) return false;
      seen.add(dish.id);
      return true;
    });
}

function liveItemsForDiscoveryScope(items: readonly DishBrowseItem[], scope: readonly CuisineDiscoveryDish[]): DishBrowseItem[] {
  if (scope.length === 0) return [];
  return items.filter((item) => scope.some(({ dish }) => liveDishMatchesDescriptor(item, suggestionDescriptor(dish))));
}

export function DishBrowse({
  city,
  data,
  loading = false,
  error = null,
  initialCuisineName = "",
}: {
  city: string;
  data: DishBrowseResponse | null;
  loading?: boolean;
  error?: string | null;
  initialCuisineName?: string;
}) {
  const initialCuisine = cuisineByName.get(initialCuisineName) ?? null;

  const [filter, setFilter] = useState("");
  const [selectedCuisineName, setSelectedCuisineName] = useState<string | null>(initialCuisine?.name ?? null);
  const [selectedCuisineArea, setSelectedCuisineArea] = useState<string | null>(null);
  const normalizedFilter = normalizeDiscoveryText(filter);

  const selectedCuisine = useMemo(
    () => selectedCuisineName ? cuisineByName.get(selectedCuisineName) ?? null : null,
    [selectedCuisineName],
  );

  const cuisineAreas = useMemo(() => {
    if (!selectedCuisine) return [];
    return [...new Set(discoveryDishesForCuisine(selectedCuisine.name).map((entry) => entry.areaName))]
      .sort((left, right) => left.localeCompare(right, "nb"));
  }, [selectedCuisine]);

  const cuisineDiscoveryScope = useMemo(() => {
    const scope = selectedCuisine ? discoveryScopeForCuisines([selectedCuisine]) : [];
    return selectedCuisineArea ? scope.filter((entry) => entry.areaName === selectedCuisineArea) : scope;
  }, [selectedCuisine, selectedCuisineArea]);

  const editorialDishes = useMemo<EditorialCoverage[]>(() => {
    if (!data || !selectedCuisine) return [];
    return discoveryDishesForCuisine(selectedCuisine.name)
      .filter((entry) => !selectedCuisineArea || entry.areaName === selectedCuisineArea)
      .filter(({ dish }) => matchesText([dish.label, dish.query, ...dish.aliases], normalizedFilter))
      .map((entry) => ({
        ...entry,
        restaurantCount: discoveryCoverage(data.dishes, suggestionDescriptor(entry.dish)).restaurantCount,
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
  }, [data, normalizedFilter, selectedCuisine, selectedCuisineArea]);

  const visibleLiveDishes = useMemo(() => {
    if (!data) return [];
    let dishes = data.dishes.filter((dish) => matchesText([dish.name, dish.query], normalizedFilter));

    if (selectedCuisine) {
      const scopedIds = new Set(liveItemsForDiscoveryScope(data.dishes, cuisineDiscoveryScope).map((dish) => dish.id));
      dishes = dishes.filter((dish) => scopedIds.has(dish.id));
    }

    return dishes;
  }, [cuisineDiscoveryScope, data, normalizedFilter, selectedCuisine]);

  const cuisinePath = [selectedCuisine?.name, selectedCuisineArea]
    .filter((value): value is string => Boolean(value));

  function replaceBrowseUrl(cuisineName?: string): void {
    window.history.replaceState(
      null,
      "",
      dishBrowseCuisineHref(city, cuisineName),
    );
  }

  function chooseCuisine(cuisine: Cuisine | null): void {
    setSelectedCuisineName(cuisine?.name ?? null);
    setSelectedCuisineArea(null);
    replaceBrowseUrl(cuisine?.name);
  }

  return (
    <section className="dishBrowse" aria-labelledby="dish-browse-title">
      <header className="dishBrowseHeader">
        <p className="eyebrow">{city}</p>
        <h1 id="dish-browse-title">Alle retter i {city}</h1>
        <p>
          Utforsk den samme ferske rettindeksen som Fysen søker i. Filtrer direkte på kjøkken eller søk etter en konkret rett.
        </p>
      </header>

      {loading ? <p className="dishBrowseStatus">Henter retter fra ferske menyer …</p> : null}

      {!loading && error ? (
        <SearchState title="Kunne ikke hente rettene akkurat nå." body={error} />
      ) : null}

      {!loading && !error && data && data.dishes.length === 0 ? (
        <SearchState
          title={`Ingen ferske retter i ${city} akkurat nå.`}
          body="Når Fysen har ferske menydata i byen, vises rettene her."
        />
      ) : null}

      {!loading && !error && data && data.dishes.length > 0 ? (
        <>
          <div className="dishBrowseControls">
            <label className="dishBrowseFilter">
              <span>Finn en rett</span>
              <input
                type="search"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="Ramen, carbonara, kebab …"
                autoComplete="off"
              />
            </label>

            <div className="dishBrowseTaxonomyLevel">
              <span>Kjøkken</span>
              <div className="dishBrowseCuisineFilters" aria-label="Filtrer på kjøkken">
                <button type="button" className={!selectedCuisine ? "isActive" : undefined} aria-pressed={!selectedCuisine} onClick={() => chooseCuisine(null)}>
                  Alle kjøkken
                </button>
                {cuisines.map((cuisine) => (
                  <button
                    type="button"
                    key={cuisine.name}
                    className={selectedCuisine?.name === cuisine.name ? "isActive" : undefined}
                    aria-pressed={selectedCuisine?.name === cuisine.name}
                    onClick={() => chooseCuisine(cuisine)}
                  >
                    {cuisine.name}
                  </button>
                ))}
              </div>
            </div>

            {selectedCuisine && cuisineAreas.length > 1 ? (
              <div className="dishBrowseTaxonomyLevel">
                <span>{selectedCuisine.areasLabel}</span>
                <div className="dishBrowseRegionFilters" aria-label={`Filtrer ${selectedCuisine.name} på tradisjon`}>
                  <button
                    type="button"
                    className={!selectedCuisineArea ? "isActive" : undefined}
                    aria-pressed={!selectedCuisineArea}
                    onClick={() => setSelectedCuisineArea(null)}
                  >
                    Hele {selectedCuisine.name.toLocaleLowerCase("nb-NO")}
                  </button>
                  {cuisineAreas.map((areaName) => (
                    <button
                      type="button"
                      key={areaName}
                      className={selectedCuisineArea === areaName ? "isActive" : undefined}
                      aria-pressed={selectedCuisineArea === areaName}
                      onClick={() => setSelectedCuisineArea(areaName)}
                    >
                      {areaName}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {cuisinePath.length > 0 ? (
              <p className="dishBrowseTaxonomyPath" aria-live="polite">{cuisinePath.join(" → ")}</p>
            ) : null}
          </div>

          {selectedCuisine ? (
            <section className="dishBrowseEditorial" aria-labelledby="dish-browse-editorial-title">
              <div className="dishBrowseSectionHeading">
                <div>
                  <p className="eyebrow">Kjøkken</p>
                  <h2 id="dish-browse-editorial-title">{selectedCuisineArea ?? selectedCuisine.name}</h2>
                </div>
                <p>Production-backed canonical Matlyst-retter med fersk Oslo-dekning først. «Lær om retten» vises bare der Food Knowledge finnes.</p>
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
                            ? `På fersk meny hos minst ${restaurantCount} ${restaurantCount === 1 ? "restaurant" : "restauranter"}.`
                            : "Ingen ferske Oslo-treff akkurat nå."}
                        </p>
                      </div>
                      <div className="dishBrowseEditorialActions">
                        <a href={dishSearchHref(dish.query, data.city)}>Se treff <span aria-hidden="true">→</span></a>
                        {dish.hasKnowledge ? (
                          <a href={foodKnowledgeHref(dish.id)}>Lær om retten <span aria-hidden="true">↗</span></a>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="dishBrowseEmptyFilter">Ingen canonicale retter matcher dette filteret.</p>
              )}
            </section>
          ) : null}

          <section className="dishBrowseLive" aria-labelledby="dish-browse-live-title">
            <div className="dishBrowseSectionHeading dishBrowseLiveHeading">
              <div>
                <p className="eyebrow">Ferske menyer</p>
                <h2 id="dish-browse-live-title">På menyen nå</h2>
              </div>
              <div className="dishBrowseMeta">
                <p>{visibleLiveDishes.length} av {data.count} canonicale retter</p>
                <p>{data.quality.rawItemCount} rå oppføringer · {data.quality.excludedItemCount} skjult · {data.quality.deduplicatedItemCount} slått sammen</p>
              </div>
            </div>

            {visibleLiveDishes.length > 0 ? (
              <div className="dishBrowseList">
                {visibleLiveDishes.map((dish) => {
                  const knowledgeDish = knowledgeDishForLiveItem(dish);
                  return (
                    <div className="dishBrowseItem" key={dish.id}>
                      <a className="dishBrowseItemMain" href={dishSearchHref(dish.query, data.city)}>
                        <strong>{dish.name}</strong>
                        <span>{dish.restaurantCount} {dish.restaurantCount === 1 ? "restaurant" : "restauranter"}</span>
                      </a>
                      {knowledgeDish ? (
                        <a className="dishBrowseKnowledgeLink" href={foodKnowledgeHref(knowledgeDish.id)} aria-label={`Om ${knowledgeDish.name}`}>
                          Om retten <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="dishBrowseEmptyFilter">Ingen canonicale retter matcher filteret.</p>
            )}
          </section>
        </>
      ) : null}
    </section>
  );
}
