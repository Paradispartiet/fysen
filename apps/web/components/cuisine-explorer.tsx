"use client";

import type { DishSearchResult } from "@fysen/contracts";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchDishesClient } from "../lib/client-dish-search";
import { dishSearchHref } from "../lib/public-path";
import { cuisines, type Cuisine, type CuisineArea, type DishSuggestion } from "./cuisine-explorer-data";

type FeaturedRestaurants = {
  readonly dish: DishSuggestion;
  readonly results: readonly DishSearchResult[];
  readonly loaded: boolean;
};

type DishResults = {
  readonly dish: DishSuggestion;
  readonly results: readonly DishSearchResult[];
};

function primaryRestaurantResults(results: readonly DishSearchResult[], limit: number): DishSearchResult[] {
  const seen = new Set<string>();
  const selected: DishSearchResult[] = [];

  for (const result of results) {
    if (result.match.type === "fuzzy" || seen.has(result.restaurant.id)) continue;
    seen.add(result.restaurant.id);
    selected.push(result);
    if (selected.length >= limit) break;
  }

  return selected;
}

function cuisinePreviewDishes(cuisine: Cuisine): readonly DishSuggestion[] {
  return cuisine.areas.map((area) => area.dishes[0]).filter((dish): dish is DishSuggestion => Boolean(dish)).slice(0, 4);
}

export function CuisineExplorer() {
  const [featured, setFeatured] = useState<Record<string, FeaturedRestaurants>>({});
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const [selectedAreaName, setSelectedAreaName] = useState<string>("");
  const [dishResults, setDishResults] = useState<readonly DishResults[]>([]);
  const [loadingArea, setLoadingArea] = useState(false);
  const [areaError, setAreaError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const selectedArea = useMemo<CuisineArea | null>(() => {
    if (!selectedCuisine) return null;
    return selectedCuisine.areas.find((area) => area.name === selectedAreaName) ?? selectedCuisine.areas[0] ?? null;
  }, [selectedAreaName, selectedCuisine]);

  useEffect(() => {
    const controller = new AbortController();

    for (const cuisine of cuisines) {
      const dish = cuisine.areas[0]?.dishes[0];
      if (!dish) continue;

      void searchDishesClient(dish.query, { limit: 5, signal: controller.signal })
        .then((response) => {
          setFeatured((current) => ({
            ...current,
            [cuisine.name]: {
              dish,
              results: primaryRestaurantResults(response.results, 2),
              loaded: true,
            },
          }));
        })
        .catch(() => {
          if (controller.signal.aborted) return;
          setFeatured((current) => ({
            ...current,
            [cuisine.name]: { dish, results: [], loaded: true },
          }));
        });
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedCuisine && dialog && !dialog.open) dialog.showModal();
  }, [selectedCuisine]);

  useEffect(() => {
    if (!selectedCuisine || !selectedArea) return;

    const controller = new AbortController();
    setDishResults([]);
    setAreaError(null);
    setLoadingArea(true);

    void Promise.all(
      selectedArea.dishes.map(async (dish): Promise<DishResults> => {
        const response = await searchDishesClient(dish.query, { limit: 8, signal: controller.signal });
        return {
          dish,
          results: primaryRestaurantResults(response.results, 3),
        };
      }),
    )
      .then((results) => {
        if (!controller.signal.aborted) setDishResults(results);
      })
      .catch(() => {
        if (!controller.signal.aborted) setAreaError("Kunne ikke hente ferske restauranttreff akkurat nå.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingArea(false);
      });

    return () => controller.abort();
  }, [selectedArea, selectedCuisine]);

  function openCuisine(cuisine: Cuisine, area: CuisineArea, trigger: HTMLButtonElement): void {
    triggerRef.current = trigger;
    setSelectedAreaName(area.name);
    setSelectedCuisine(cuisine);
  }

  function closeCuisine(): void {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setSelectedCuisine(null);
  }

  function restoreTriggerFocus(): void {
    setSelectedCuisine(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <section className="cuisineExplorer" aria-labelledby="cuisine-explorer-title">
      <div className="foodSectionHeading">
        <div>
          <p className="foodSectionEyebrow">Matlyst</p>
          <h2 id="cuisine-explorer-title">Utforsk kjøkken</h2>
        </div>
        <p>Velg et kjøkken eller en region, finn retter du har lyst på, og se hvem som faktisk har dem på menyen.</p>
      </div>

      <div className="cuisineGrid">
        {cuisines.map((cuisine) => {
          const firstArea = cuisine.areas[0];
          const preview = featured[cuisine.name];
          if (!firstArea) return null;

          return (
            <article className="cuisineCard cuisineCardInteractive" key={cuisine.name}>
              <button
                type="button"
                className="cuisineCardTrigger"
                aria-haspopup="dialog"
                onClick={(event) => openCuisine(cuisine, firstArea, event.currentTarget)}
              >
                <span className="cuisineCardHeading">
                  <strong>{cuisine.name}</strong>
                  <span>{cuisine.context}</span>
                </span>

                <span className="cuisineDishPreview" aria-label={`Eksempler på retter i ${cuisine.name}`}>
                  {cuisinePreviewDishes(cuisine).map((dish) => <span key={dish.query}>{dish.label}</span>)}
                </span>

                <span className="cuisineRestaurantPreview">
                  <span className="cuisineRestaurantPreviewLabel">På menyen nå</span>
                  {!preview?.loaded ? <span className="cuisineRestaurantLoading">Henter ferske restauranttreff …</span> : null}
                  {preview?.loaded && preview.results.length > 0 ? (
                    <span className="cuisineRestaurantNames">
                      {preview.results.map((result) => (
                        <span key={result.restaurant.id}>
                          <strong>{result.restaurant.name}</strong>
                          <small>{preview.dish.label} · {result.restaurant.address}</small>
                        </span>
                      ))}
                    </span>
                  ) : null}
                  {preview?.loaded && preview.results.length === 0 ? (
                    <span className="cuisineRestaurantLoading">Ingen ferske treff på {preview.dish.label.toLowerCase()} akkurat nå.</span>
                  ) : null}
                </span>

                <span className="cuisineCardOpenHint">Åpne retter og restauranter <span aria-hidden="true">→</span></span>
              </button>

              <div className="cuisineAreaList" aria-label={`${cuisine.areasLabel} i ${cuisine.name}`}>
                {cuisine.areas.map((area) => (
                  <button
                    type="button"
                    key={area.name}
                    onClick={(event) => openCuisine(cuisine, area, event.currentTarget)}
                  >
                    {area.name}
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        className="cuisineExploreDialog"
        aria-labelledby={selectedCuisine ? "cuisine-dialog-title" : undefined}
        onClose={restoreTriggerFocus}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeCuisine();
        }}
      >
        {selectedCuisine && selectedArea ? (
          <div className="cuisineExploreDialogShell">
            <button
              type="button"
              className="cuisineExploreDialogClose"
              aria-label={`Lukk ${selectedCuisine.name}`}
              onClick={closeCuisine}
            >
              <span aria-hidden="true">×</span>
            </button>

            <header className="cuisineExploreDialogHeader">
              <p>Utforsk kjøkken</p>
              <h2 id="cuisine-dialog-title">{selectedCuisine.name}</h2>
              <span>{selectedCuisine.context}</span>
            </header>

            <section className="cuisineExploreAreas" aria-labelledby="cuisine-area-title">
              <h3 id="cuisine-area-title">{selectedCuisine.areasLabel}</h3>
              <div>
                {selectedCuisine.areas.map((area) => (
                  <button
                    type="button"
                    className={area.name === selectedArea.name ? "isActive" : undefined}
                    aria-pressed={area.name === selectedArea.name}
                    key={area.name}
                    onClick={() => setSelectedAreaName(area.name)}
                  >
                    {area.name}
                  </button>
                ))}
              </div>
            </section>

            <section className="cuisineExploreResults" aria-live="polite">
              <div className="cuisineExploreResultsHeading">
                <div>
                  <p>{selectedArea.name}</p>
                  <h3>Retter og hvor du kan få dem</h3>
                </div>
                <span>Ferske menytreff i Oslo</span>
              </div>

              {loadingArea ? <p className="cuisineExploreStatus">Henter retter og restauranter …</p> : null}
              {!loadingArea && areaError ? <p className="cuisineExploreStatus">{areaError}</p> : null}

              {!loadingArea && !areaError ? (
                <div className="cuisineExploreDishList">
                  {dishResults.map(({ dish, results }) => (
                    <article className="cuisineExploreDish" key={dish.query}>
                      <div className="cuisineExploreDishHeading">
                        <h4>{dish.label}</h4>
                        <a href={dishSearchHref(dish.query)}>Se alle treff <span aria-hidden="true">→</span></a>
                      </div>

                      {results.length > 0 ? (
                        <ul>
                          {results.map((result) => (
                            <li key={result.restaurant.id}>
                              <a href={dishSearchHref(dish.query)}>
                                <strong>{result.restaurant.name}</strong>
                                <span>{result.dish.name}</span>
                                <small>{result.restaurant.address}</small>
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Ingen ferske menytreff på denne retten i Oslo akkurat nå.</p>
                      )}
                    </article>
                  ))}
                </div>
              ) : null}
            </section>

            <footer className="cuisineExploreDialogFooter">
              Restaurantene vises bare når Fysen har et ferskt, ikke-fuzzy menytreff på retten.
            </footer>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
