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
import { dishSearchHref, foodKnowledgeHref } from "../lib/public-path";
import { SearchState } from "./search-state";

type CatalogDish = (typeof foodDishCatalog)[number];

type CatalogCoverage = {
  readonly dish: CatalogDish;
  readonly restaurantCount: number;
};

const cuisineNames = [...new Set(foodDishCatalog.map((dish) => dish.cuisine))].sort((left, right) => left.localeCompare(right, "nb"));

function descriptor(dish: CatalogDish): DiscoveryDishDescriptor {
  return {
    label: dish.name,
    query: dish.query,
    aliases: dish.aliases,
  };
}

function knowledgeDishForLiveItem(item: DishBrowseItem): CatalogDish | null {
  return [...foodDishCatalog]
    .filter((dish) => foodKnowledgeDishIdSet.has(dish.id) && liveDishMatchesDescriptor(item, descriptor(dish)))
    .sort((left, right) => right.explorerPriority - left.explorerPriority || left.name.localeCompare(right.name, "nb"))[0] ?? null;
}

function matchesText(values: readonly string[], query: string): boolean {
  if (!query) return true;
  return values.some((value) => normalizeDiscoveryText(value).includes(query));
}

function liveItemsForCatalogScope(items: readonly DishBrowseItem[], catalogScope: readonly CatalogDish[]): DishBrowseItem[] {
  if (catalogScope.length === 0) return [];
  return items.filter((item) => catalogScope.some((dish) => liveDishMatchesDescriptor(item, descriptor(dish))));
}

export function DishBrowse({
  city,
  data,
  loading = false,
  error = null,
}: {
  city: string;
  data: DishBrowseResponse | null;
  loading?: boolean;
  error?: string | null;
}) {
  const [filter, setFilter] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const normalizedFilter = normalizeDiscoveryText(filter);

  const regions = useMemo(() => {
    if (!selectedCuisine) return [];
    return [...new Set(foodDishCatalog.filter((dish) => dish.cuisine === selectedCuisine).map((dish) => dish.region))]
      .sort((left, right) => left.localeCompare(right, "nb"));
  }, [selectedCuisine]);

  const scopedCatalog = useMemo(() => {
    if (!data) return [];
    return foodDishCatalog
      .filter((dish) => !selectedCuisine || dish.cuisine === selectedCuisine)
      .filter((dish) => !selectedRegion || dish.region === selectedRegion)
      .filter((dish) => matchesText([dish.name, dish.query, ...dish.aliases], normalizedFilter))
      .map((dish): CatalogCoverage => ({
        dish,
        restaurantCount: discoveryCoverage(data.dishes, descriptor(dish)).restaurantCount,
      }))
      .sort((left, right) => {
        const leftCovered = left.restaurantCount > 0 ? 1 : 0;
        const rightCovered = right.restaurantCount > 0 ? 1 : 0;
        if (leftCovered !== rightCovered) return rightCovered - leftCovered;
        if (left.restaurantCount !== right.restaurantCount) return right.restaurantCount - left.restaurantCount;
        if (left.dish.explorerPriority !== right.dish.explorerPriority) return right.dish.explorerPriority - left.dish.explorerPriority;
        return left.dish.name.localeCompare(right.dish.name, "nb");
      });
  }, [data, normalizedFilter, selectedCuisine, selectedRegion]);

  const visibleLiveDishes = useMemo(() => {
    if (!data) return [];
    let dishes = data.dishes.filter((dish) => matchesText([dish.name, dish.query], normalizedFilter));

    if (selectedCuisine || selectedRegion) {
      const catalogScope = foodDishCatalog
        .filter((dish) => !selectedCuisine || dish.cuisine === selectedCuisine)
        .filter((dish) => !selectedRegion || dish.region === selectedRegion);
      const scopedIds = new Set(liveItemsForCatalogScope(data.dishes, catalogScope).map((dish) => dish.id));
      dishes = dishes.filter((dish) => scopedIds.has(dish.id));
    }

    return dishes;
  }, [data, normalizedFilter, selectedCuisine, selectedRegion]);

  function chooseCuisine(cuisine: string | null): void {
    setSelectedCuisine(cuisine);
    setSelectedRegion(null);
  }

  return (
    <section className="dishBrowse" aria-labelledby="dish-browse-title">
      <header className="dishBrowseHeader">
        <p className="eyebrow">{city}</p>
        <h1 id="dish-browse-title">Alle retter i {city}</h1>
        <p>
          Utforsk den samme ferske rettindeksen som Fysen søker i. Filtrer direkte på rett, eller gå via kjøkken og region. Klikk på en rett for å åpne den vanlige søkeresultatsiden.
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

            <div className="dishBrowseCuisineFilters" aria-label="Filtrer på kjøkken">
              <button type="button" className={!selectedCuisine ? "isActive" : undefined} aria-pressed={!selectedCuisine} onClick={() => chooseCuisine(null)}>
                Alle kjøkken
              </button>
              {cuisineNames.map((cuisine) => (
                <button
                  type="button"
                  key={cuisine}
                  className={selectedCuisine === cuisine ? "isActive" : undefined}
                  aria-pressed={selectedCuisine === cuisine}
                  onClick={() => chooseCuisine(cuisine)}
                >
                  {cuisine}
                </button>
              ))}
            </div>

            {selectedCuisine && regions.length > 0 ? (
              <div className="dishBrowseRegionFilters" aria-label={`Filtrer ${selectedCuisine} på region`}>
                <button type="button" className={!selectedRegion ? "isActive" : undefined} aria-pressed={!selectedRegion} onClick={() => setSelectedRegion(null)}>
                  Hele {selectedCuisine.toLocaleLowerCase("nb-NO")}
                </button>
                {regions.map((region) => (
                  <button
                    type="button"
                    key={region}
                    className={selectedRegion === region ? "isActive" : undefined}
                    aria-pressed={selectedRegion === region}
                    onClick={() => setSelectedRegion(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {selectedCuisine ? (
            <section className="dishBrowseEditorial" aria-labelledby="dish-browse-editorial-title">
              <div className="dishBrowseSectionHeading">
                <div>
                  <p className="eyebrow">Utforsk kjøkken</p>
                  <h2 id="dish-browse-editorial-title">{selectedRegion ?? selectedCuisine}</h2>
                </div>
                <p>Canonicale matprofiler med fersk Oslo-dekning først. «Lær om retten» vises bare der Food Knowledge finnes.</p>
              </div>

              {scopedCatalog.length > 0 ? (
                <div className="dishBrowseEditorialGrid">
                  {scopedCatalog.map(({ dish, restaurantCount }) => (
                    <article className="dishBrowseEditorialDish" key={dish.id} data-has-coverage={restaurantCount > 0 ? "true" : "false"}>
                      <div>
                        <span>{dish.region}</span>
                        <h3>{dish.name}</h3>
                        <p>
                          {restaurantCount > 0
                            ? `På fersk meny hos minst ${restaurantCount} ${restaurantCount === 1 ? "restaurant" : "restauranter"}.`
                            : "Ingen ferske Oslo-treff akkurat nå."}
                        </p>
                      </div>
                      <div className="dishBrowseEditorialActions">
                        <a href={dishSearchHref(dish.query, data.city)}>Se treff <span aria-hidden="true">→</span></a>
                        {foodKnowledgeDishIdSet.has(dish.id) ? (
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
              <p>{visibleLiveDishes.length} av {data.count} rettidentiteter</p>
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
                        <a className="dishBrowseKnowledgeLink" href={foodKnowledgeHref(knowledgeDish.id)} aria-label={`Lær om ${knowledgeDish.name}`}>
                          Lær <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="dishBrowseEmptyFilter">Ingen ferske rettidentiteter matcher filteret.</p>
            )}
          </section>
        </>
      ) : null}
    </section>
  );
}
