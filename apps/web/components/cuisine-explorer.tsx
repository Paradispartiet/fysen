"use client";

import type { DishBrowseItem, DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { useEffect, useMemo, useRef, useState } from "react";
import { discoveryCoverage } from "../lib/dish-discovery";
import { dishSearchHref } from "../lib/public-path";
import { cuisines, type Cuisine, type CuisineArea, type DishSuggestion } from "./cuisine-explorer-data";

type DishCoverage = {
  readonly dish: DishSuggestion;
  readonly restaurantCount: number;
};

function cuisineCandidates(cuisine: Cuisine): readonly DishSuggestion[] {
  const seen = new Set<string>();
  return cuisine.areas
    .flatMap((area) => area.dishes)
    .sort((left, right) => right.explorerPriority - left.explorerPriority || left.label.localeCompare(right.label, "nb"))
    .filter((dish) => {
      if (seen.has(dish.id)) return false;
      seen.add(dish.id);
      return true;
    });
}

function cuisinePreviewDishes(cuisine: Cuisine): readonly DishSuggestion[] {
  return cuisineCandidates(cuisine).slice(0, 4);
}

function coverageForDish(dishes: readonly DishBrowseItem[], dish: DishSuggestion): DishCoverage {
  return {
    dish,
    restaurantCount: discoveryCoverage(dishes, dish).restaurantCount,
  };
}

function rankDishCoverage(coverage: readonly DishCoverage[]): DishCoverage[] {
  return [...coverage].sort((left, right) => {
    const leftHasCoverage = left.restaurantCount > 0 ? 1 : 0;
    const rightHasCoverage = right.restaurantCount > 0 ? 1 : 0;
    if (leftHasCoverage !== rightHasCoverage) return rightHasCoverage - leftHasCoverage;
    if (left.restaurantCount !== right.restaurantCount) return right.restaurantCount - left.restaurantCount;
    if (left.dish.explorerPriority !== right.dish.explorerPriority) {
      return right.dish.explorerPriority - left.dish.explorerPriority;
    }
    return left.dish.label.localeCompare(right.dish.label, "nb");
  });
}

function featuredCoverage(cuisine: Cuisine, dishes: readonly DishBrowseItem[]): DishCoverage | null {
  return rankDishCoverage(cuisineCandidates(cuisine).map((dish) => coverageForDish(dishes, dish)))[0] ?? null;
}

export function CuisineExplorer({ browseData }: { readonly browseData: DishBrowseResponse | null }) {
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const [selectedAreaName, setSelectedAreaName] = useState<string>("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const liveDishes = browseData?.dishes ?? [];

  const selectedArea = useMemo<CuisineArea | null>(() => {
    if (!selectedCuisine) return null;
    return selectedCuisine.areas.find((area) => area.name === selectedAreaName) ?? selectedCuisine.areas[0] ?? null;
  }, [selectedAreaName, selectedCuisine]);

  const selectedDishCoverage = useMemo(() => {
    if (!selectedArea) return [];
    return rankDishCoverage(selectedArea.dishes.map((dish) => coverageForDish(liveDishes, dish)));
  }, [liveDishes, selectedArea]);

  const featured = useMemo(() => {
    return new Map(cuisines.map((cuisine) => [cuisine.name, featuredCoverage(cuisine, liveDishes)]));
  }, [liveDishes]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedCuisine && dialog && !dialog.open) dialog.showModal();
  }, [selectedCuisine]);

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

  function openFoodKnowledge(dishId: string): void {
    triggerRef.current = null;
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setSelectedCuisine(null);
    window.location.hash = `learn-${encodeURIComponent(dishId)}`;
  }

  function restoreTriggerFocus(): void {
    setSelectedCuisine(null);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger) window.requestAnimationFrame(() => trigger.focus());
  }

  return (
    <section className="cuisineExplorer" aria-label="Matlyst">
      <div className="foodSectionHeading">
        <div>
          <p className="foodSectionEyebrow">Matlyst</p>
        </div>
        <p>Velg et kjøkken eller en region, oppdag relevante retter, og se hvilke som faktisk har fersk Oslo-dekning nå.</p>
      </div>

      <div className="cuisineGrid">
        {cuisines.map((cuisine) => {
          const firstArea = cuisine.areas[0];
          const preview = featured.get(cuisine.name) ?? null;
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
                  {cuisinePreviewDishes(cuisine).map((dish) => <span key={dish.id}>{dish.label}</span>)}
                </span>

                <span className="cuisineRestaurantPreview">
                  <span className="cuisineRestaurantPreviewLabel">På menyen nå</span>
                  {!browseData ? <span className="cuisineRestaurantLoading">Live-dekning kunne ikke hentes akkurat nå.</span> : null}
                  {browseData && preview && preview.restaurantCount > 0 ? (
                    <span className="cuisineRestaurantNames">
                      <span>
                        <strong>{preview.dish.label}</strong>
                        <small>Minst {preview.restaurantCount} {preview.restaurantCount === 1 ? "restaurant" : "restauranter"} med ferske menytreff</small>
                      </span>
                    </span>
                  ) : null}
                  {browseData && (!preview || preview.restaurantCount === 0) ? (
                    <span className="cuisineRestaurantLoading">Ingen ferske treff på de prioriterte rettene akkurat nå.</span>
                  ) : null}
                </span>
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
                  <h3>Retter i området</h3>
                </div>
                <span>Fersk Oslo-dekning først</span>
              </div>

              <div className="cuisineExploreDishList">
                {selectedDishCoverage.map(({ dish, restaurantCount }) => (
                  <article className="cuisineExploreDish" key={dish.id} data-has-coverage={restaurantCount > 0 ? "true" : "false"}>
                    <div className="cuisineExploreDishHeading">
                      <h4>{dish.label}</h4>
                      <div className="cuisineExploreDishActions">
                        {dish.hasKnowledge ? (
                          <button type="button" onClick={() => openFoodKnowledge(dish.id)}>Lær om retten <span aria-hidden="true">↗</span></button>
                        ) : null}
                        <a href={dishSearchHref(dish.query)}>Se treff <span aria-hidden="true">→</span></a>
                      </div>
                    </div>

                    {restaurantCount > 0 ? (
                      <p>På fersk meny hos minst {restaurantCount} {restaurantCount === 1 ? "restaurant" : "restauranter"} i Oslo.</p>
                    ) : (
                      <p>Ingen ferske menytreff på denne retten i Oslo akkurat nå.</p>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <footer className="cuisineExploreDialogFooter">
              Dekningen kommer fra den samme ferske browse-indeksen som «Alle retter». Discovery-kall registreres ikke som brukersøk. Når flere menyvarianter kan overlappe, viser Fysen et konservativt minimumstall i stedet for å summere dem.
            </footer>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
