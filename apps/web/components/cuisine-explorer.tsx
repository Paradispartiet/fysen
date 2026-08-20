"use client";

import type { DishBrowseItem, DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { useEffect, useMemo, useRef, useState } from "react";
import { discoveryCoverage } from "../lib/dish-discovery";
import { dishSearchHref } from "../lib/public-path";
import { cuisines, foodMoods, type Cuisine, type CuisineArea, type DishSuggestion } from "./cuisine-explorer-data";

type DishCoverage = {
  readonly dish: DishSuggestion;
  readonly restaurantCount: number;
};

const DEFAULT_CUISINE_COUNT = 8;

function uniqueCandidates(dishes: readonly DishSuggestion[]): readonly DishSuggestion[] {
  const seen = new Set<string>();
  return dishes.filter((dish) => {
    if (seen.has(dish.id)) return false;
    seen.add(dish.id);
    return true;
  });
}

function cuisineCandidates(cuisine: Cuisine): readonly DishSuggestion[] {
  return uniqueCandidates(
    cuisine.areas
      .flatMap((area) => area.dishes)
      .sort((left, right) => right.explorerPriority - left.explorerPriority || left.label.localeCompare(right.label, "nb")),
  );
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

function featuredCoverage(dishesToCheck: readonly DishSuggestion[], dishes: readonly DishBrowseItem[]): DishCoverage | null {
  return rankDishCoverage(uniqueCandidates(dishesToCheck).map((dish) => coverageForDish(dishes, dish)))[0] ?? null;
}

export function CuisineExplorer({ browseData }: { readonly browseData: DishBrowseResponse | null }) {
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const [selectedAreaName, setSelectedAreaName] = useState<string>("");
  const [showAllCuisines, setShowAllCuisines] = useState(false);
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
    return new Map(cuisines.map((cuisine) => [cuisine.name, featuredCoverage(cuisineCandidates(cuisine), liveDishes)]));
  }, [liveDishes]);

  const moodFeatured = useMemo(() => {
    return new Map(foodMoods.map((mood) => [mood.name, featuredCoverage(mood.dishes, liveDishes)]));
  }, [liveDishes]);

  const rankedCuisines = useMemo(() => {
    if (!browseData) return cuisines;
    return [...cuisines].sort((left, right) => {
      const leftCount = featured.get(left.name)?.restaurantCount ?? 0;
      const rightCount = featured.get(right.name)?.restaurantCount ?? 0;
      if (leftCount !== rightCount) return rightCount - leftCount;
      return cuisines.indexOf(left) - cuisines.indexOf(right);
    });
  }, [browseData, featured]);

  const visibleCuisines = showAllCuisines ? rankedCuisines : rankedCuisines.slice(0, DEFAULT_CUISINE_COUNT);

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
    <section className="cuisineExplorer" aria-labelledby="matlyst-title">
      <div className="foodSectionHeading matlystHeading">
        <div>
          <p className="foodSectionEyebrow">Matlyst</p>
          <h2 id="matlyst-title">Finn maten du faktisk har lyst på</h2>
        </div>
        <p>Start med en smak eller en rettstype, eller gå videre til et kjøkken. Alt leder til den samme ferske Oslo-indeksen.</p>
      </div>

      <div className="matlystMoodBlock" aria-labelledby="matlyst-mood-title">
        <div className="matlystSubheading">
          <div>
            <span>Hva frister?</span>
            <h3 id="matlyst-mood-title">Velg etter lyst</h3>
          </div>
          <p>Du trenger ikke vite hvilket kjøkken retten kommer fra.</p>
        </div>

        <div className="matlystMoodGrid">
          {foodMoods.map((mood) => {
            const preview = moodFeatured.get(mood.name) ?? null;
            return (
              <a className="matlystMoodCard" href={dishSearchHref(mood.query)} key={mood.name}>
                <span className="matlystMoodCardTopline">
                  <strong>{mood.name}</strong>
                  <span aria-hidden="true">→</span>
                </span>
                <small>{mood.context}</small>
                <span className="matlystMoodCoverage">
                  {!browseData ? "Se ferske treff" : null}
                  {browseData && preview && preview.restaurantCount > 0
                    ? `${preview.dish.label}: minst ${preview.restaurantCount} ${preview.restaurantCount === 1 ? "sted" : "steder"} nå`
                    : null}
                  {browseData && (!preview || preview.restaurantCount === 0) ? "Se hva som finnes i Oslo nå" : null}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="matlystCuisineHeading">
        <div>
          <span>Kjøkken</span>
          <h3>Utforsk etter mattradisjon</h3>
        </div>
        <p>De best dekkede kjøkkenene vises først når live-data er tilgjengelig.</p>
      </div>

      <div className="cuisineGrid">
        {visibleCuisines.map((cuisine) => {
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

              {cuisine.areas.length > 1 ? (
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
              ) : null}
            </article>
          );
        })}
      </div>

      {rankedCuisines.length > DEFAULT_CUISINE_COUNT ? (
        <div className="matlystCuisineMore">
          <button type="button" aria-expanded={showAllCuisines} onClick={() => setShowAllCuisines((value) => !value)}>
            {showAllCuisines ? "Vis færre kjøkken" : `Flere kjøkken (${rankedCuisines.length - DEFAULT_CUISINE_COUNT})`}
            <span aria-hidden="true">{showAllCuisines ? "↑" : "↓"}</span>
          </button>
        </div>
      ) : null}

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

            {selectedCuisine.areas.length > 1 ? (
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
            ) : null}

            <section className="cuisineExploreResults" aria-live="polite">
              <div className="cuisineExploreResultsHeading">
                <div>
                  <p>{selectedCuisine.areas.length > 1 ? selectedArea.name : selectedCuisine.name}</p>
                  <h3>Retter å utforske</h3>
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
