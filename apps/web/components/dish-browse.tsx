"use client";

import type { DishBrowseItem, DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { useMemo, useState } from "react";
import { foodDishCatalog } from "../content/food-knowledge/catalog";
import {
  discoveryCoverage,
  liveDishMatchesDescriptor,
  normalizeDiscoveryText,
  type DiscoveryDishDescriptor,
} from "../lib/dish-discovery";
import { dishBrowseTaxonomyHref, dishSearchHref, foodKnowledgeHref } from "../lib/public-path";
import {
  cuisines,
  discoveryDishesForCuisine,
  type Cuisine,
  type CuisineDiscoveryDish,
  type DishSuggestion,
} from "./cuisine-explorer-data";
import {
  activeRegionCuisines,
  activeWorldCuisines,
  culinaryWorlds,
  type CulinaryRegion,
  type CulinaryWorld,
} from "./culinary-taxonomy";
import { SearchState } from "./search-state";

type KnowledgeDish = (typeof foodDishCatalog)[number];

type EditorialCoverage = CuisineDiscoveryDish & {
  readonly restaurantCount: number;
};

const cuisineByName = new Map(cuisines.map((cuisine) => [cuisine.name, cuisine] as const));
const activeWorlds = culinaryWorlds.filter((world) => activeWorldCuisines(world).length > 0);

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
    .filter((dish) => liveDishMatchesDescriptor(item, knowledgeDescriptor(dish)))
    .sort((left, right) => right.explorerPriority - left.explorerPriority || left.name.localeCompare(right.name, "nb"))[0] ?? null;
}

function matchesText(values: readonly string[], query: string): boolean {
  if (!query) return true;
  return values.some((value) => normalizeDiscoveryText(value).includes(query));
}

function activeRegions(world: CulinaryWorld): readonly CulinaryRegion[] {
  return world.regions.filter((region) => activeRegionCuisines(region).length > 0);
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

function selectedWorldFromId(worldId: string): CulinaryWorld | null {
  return activeWorlds.find((world) => world.id === worldId) ?? null;
}

export function DishBrowse({
  city,
  data,
  loading = false,
  error = null,
  initialWorldId = "",
  initialRegionId = "",
  initialCuisineName = "",
}: {
  city: string;
  data: DishBrowseResponse | null;
  loading?: boolean;
  error?: string | null;
  initialWorldId?: string;
  initialRegionId?: string;
  initialCuisineName?: string;
}) {
  const initialWorld = selectedWorldFromId(initialWorldId);
  const initialRegion = initialWorld
    ? activeRegions(initialWorld).find((region) => region.id === initialRegionId) ?? null
    : null;
  const initialCuisine = initialRegion
    ? activeRegionCuisines(initialRegion).find((cuisine) => cuisine.name === initialCuisineName) ?? null
    : null;

  const [filter, setFilter] = useState("");
  const [selectedWorldId, setSelectedWorldId] = useState<string | null>(initialWorld?.id ?? null);
  const [selectedCulinaryRegionId, setSelectedCulinaryRegionId] = useState<string | null>(initialRegion?.id ?? null);
  const [selectedCuisineName, setSelectedCuisineName] = useState<string | null>(initialCuisine?.name ?? null);
  const [selectedCuisineArea, setSelectedCuisineArea] = useState<string | null>(null);
  const normalizedFilter = normalizeDiscoveryText(filter);

  const selectedWorld = useMemo(
    () => activeWorlds.find((world) => world.id === selectedWorldId) ?? null,
    [selectedWorldId],
  );

  const availableRegions = useMemo(
    () => selectedWorld ? activeRegions(selectedWorld) : [],
    [selectedWorld],
  );

  const selectedCulinaryRegion = useMemo(
    () => availableRegions.find((region) => region.id === selectedCulinaryRegionId) ?? null,
    [availableRegions, selectedCulinaryRegionId],
  );

  const availableCuisines = useMemo(
    () => selectedCulinaryRegion ? activeRegionCuisines(selectedCulinaryRegion) : [],
    [selectedCulinaryRegion],
  );

  const selectedCuisine = useMemo(
    () => selectedCuisineName ? cuisineByName.get(selectedCuisineName) ?? null : null,
    [selectedCuisineName],
  );

  const cuisineAreas = useMemo(() => {
    if (!selectedCuisine) return [];
    return [...new Set(discoveryDishesForCuisine(selectedCuisine.name).map((entry) => entry.areaName))]
      .sort((left, right) => left.localeCompare(right, "nb"));
  }, [selectedCuisine]);

  const taxonomyCuisineScope = useMemo<readonly Cuisine[]>(() => {
    if (selectedCuisine) return [selectedCuisine];
    if (selectedCulinaryRegion) return activeRegionCuisines(selectedCulinaryRegion);
    if (selectedWorld) return activeWorldCuisines(selectedWorld);
    return [];
  }, [selectedCuisine, selectedCulinaryRegion, selectedWorld]);

  const taxonomyDiscoveryScope = useMemo(() => {
    const scope = discoveryScopeForCuisines(taxonomyCuisineScope);
    return selectedCuisineArea ? scope.filter((entry) => entry.areaName === selectedCuisineArea) : scope;
  }, [selectedCuisineArea, taxonomyCuisineScope]);

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

    if (selectedWorld) {
      const scopedIds = new Set(liveItemsForDiscoveryScope(data.dishes, taxonomyDiscoveryScope).map((dish) => dish.id));
      dishes = dishes.filter((dish) => scopedIds.has(dish.id));
    }

    return dishes;
  }, [data, normalizedFilter, selectedWorld, taxonomyDiscoveryScope]);

  const taxonomyPath = [selectedWorld?.name, selectedCulinaryRegion?.name, selectedCuisine?.name, selectedCuisineArea]
    .filter((value): value is string => Boolean(value));

  function replaceBrowseUrl(worldId?: string, regionId?: string, cuisineName?: string): void {
    window.history.replaceState(
      null,
      "",
      dishBrowseTaxonomyHref(city, { worldId, regionId, cuisineName }),
    );
  }

  function chooseWorld(world: CulinaryWorld | null): void {
    setSelectedWorldId(world?.id ?? null);
    setSelectedCulinaryRegionId(null);
    setSelectedCuisineName(null);
    setSelectedCuisineArea(null);
    replaceBrowseUrl(world?.id);
  }

  function chooseCulinaryRegion(region: CulinaryRegion | null): void {
    setSelectedCulinaryRegionId(region?.id ?? null);
    setSelectedCuisineName(null);
    setSelectedCuisineArea(null);
    replaceBrowseUrl(selectedWorld?.id, region?.id);
  }

  function chooseCuisine(cuisine: Cuisine | null): void {
    setSelectedCuisineName(cuisine?.name ?? null);
    setSelectedCuisineArea(null);
    replaceBrowseUrl(selectedWorld?.id, selectedCulinaryRegion?.id, cuisine?.name);
  }

  return (
    <section className="dishBrowse" aria-labelledby="dish-browse-title">
      <header className="dishBrowseHeader">
        <p className="eyebrow">{city}</p>
        <h1 id="dish-browse-title">Alle retter i {city}</h1>
        <p>
          Utforsk den samme ferske rettindeksen som Fysen søker i. Matlyst v3 organiserer oppdagelsen som verdensdel → kulinarisk region → kjøkken, uten å lage en separat menyindeks.
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
              <span>1 · Verdensdel</span>
              <div className="dishBrowseWorldFilters" aria-label="Filtrer på verdensdel">
                <button type="button" className={!selectedWorld ? "isActive" : undefined} aria-pressed={!selectedWorld} onClick={() => chooseWorld(null)}>
                  Hele verden
                </button>
                {activeWorlds.map((world) => (
                  <button
                    type="button"
                    key={world.id}
                    className={selectedWorld?.id === world.id ? "isActive" : undefined}
                    aria-pressed={selectedWorld?.id === world.id}
                    onClick={() => chooseWorld(world)}
                  >
                    {world.name}
                  </button>
                ))}
              </div>
            </div>

            {selectedWorld ? (
              <div className="dishBrowseTaxonomyLevel">
                <span>2 · Kulinarisk region</span>
                <div className="dishBrowseCulinaryRegionFilters" aria-label={`Filtrer ${selectedWorld.name} på kulinarisk region`}>
                  <button
                    type="button"
                    className={!selectedCulinaryRegion ? "isActive" : undefined}
                    aria-pressed={!selectedCulinaryRegion}
                    onClick={() => chooseCulinaryRegion(null)}
                  >
                    Hele {selectedWorld.name}
                  </button>
                  {availableRegions.map((region) => (
                    <button
                      type="button"
                      key={region.id}
                      className={selectedCulinaryRegion?.id === region.id ? "isActive" : undefined}
                      aria-pressed={selectedCulinaryRegion?.id === region.id}
                      onClick={() => chooseCulinaryRegion(region)}
                    >
                      {region.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {selectedCulinaryRegion ? (
              <div className="dishBrowseTaxonomyLevel">
                <span>3 · Kjøkken</span>
                <div className="dishBrowseCuisineFilters" aria-label={`Filtrer ${selectedCulinaryRegion.name} på kjøkken`}>
                  <button
                    type="button"
                    className={!selectedCuisine ? "isActive" : undefined}
                    aria-pressed={!selectedCuisine}
                    onClick={() => chooseCuisine(null)}
                  >
                    Hele {selectedCulinaryRegion.name}
                  </button>
                  {availableCuisines.map((cuisine) => (
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
            ) : null}

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

            {taxonomyPath.length > 0 ? (
              <p className="dishBrowseTaxonomyPath" aria-live="polite">{taxonomyPath.join(" → ")}</p>
            ) : null}
          </div>

          {selectedCuisine ? (
            <section className="dishBrowseEditorial" aria-labelledby="dish-browse-editorial-title">
              <div className="dishBrowseSectionHeading">
                <div>
                  <p className="eyebrow">{[selectedWorld?.name, selectedCulinaryRegion?.name].filter(Boolean).join(" · ")}</p>
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
