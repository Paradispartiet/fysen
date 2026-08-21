"use client";

import type {
  DishBrowseItem,
  DishBrowseResponse,
  DishBrowseRestaurantExample,
} from "@fysen/contracts/dish-browse";
import { useEffect, useMemo, useRef, useState } from "react";
import { browseDishesClient } from "../lib/client-dish-search";
import { discoveryCoverage, normalizeDiscoveryText } from "../lib/dish-discovery";
import { dishSearchHref } from "../lib/public-path";
import {
  cuisines,
  foodMoods,
  type Cuisine,
  type CuisineArea,
  type DishSuggestion,
  type FoodMood,
} from "./cuisine-explorer-data";

type DishCoverage = {
  readonly dish: DishSuggestion;
  readonly restaurantCount: number;
  readonly restaurantExamples: readonly DishBrowseRestaurantExample[];
};

const COLLAPSED_CUISINE_COUNT = 6;

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

function cuisineFilterText(cuisine: Cuisine): string {
  return normalizeDiscoveryText([
    cuisine.name,
    cuisine.context,
    ...cuisine.areas.map((area) => area.name),
    ...cuisineCandidates(cuisine).flatMap((dish) => [dish.label, dish.query, ...dish.aliases]),
  ].join(" "));
}

function coverageForDish(dishes: readonly DishBrowseItem[], dish: DishSuggestion): DishCoverage {
  const coverage = discoveryCoverage(dishes, dish);
  return {
    dish,
    restaurantCount: coverage.restaurantCount,
    restaurantExamples: coverage.restaurantExamples,
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

function DiscoveryDishList({
  coverage,
  onOpenKnowledge,
}: {
  readonly coverage: readonly DishCoverage[];
  readonly onOpenKnowledge: (dishId: string) => void;
}) {
  return (
    <div className="cuisineExploreDishList">
      {coverage.map(({ dish, restaurantCount }) => (
        <article className="cuisineExploreDish" key={dish.id} data-has-coverage={restaurantCount > 0 ? "true" : "false"}>
          <div className="cuisineExploreDishHeading">
            <h4>{dish.label}</h4>
            <div className="cuisineExploreDishActions">
              {dish.hasKnowledge ? (
                <button type="button" onClick={() => onOpenKnowledge(dish.id)}>
                  Lær om retten <span aria-hidden="true">↗</span>
                </button>
              ) : null}
              <a href={dishSearchHref(dish.query)}>
                Se treff <span aria-hidden="true">→</span>
              </a>
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
  );
}

export function CuisineExplorer({ browseData }: { readonly browseData: DishBrowseResponse | null }) {
  const [previewBrowseData, setPreviewBrowseData] = useState<DishBrowseResponse | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const [selectedAreaName, setSelectedAreaName] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState<FoodMood | null>(null);
  const [cuisineDirectoryQuery, setCuisineDirectoryQuery] = useState("");
  const [isCuisineDirectoryExpanded, setIsCuisineDirectoryExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const moodDialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const moodTriggerRef = useRef<HTMLButtonElement | null>(null);
  const effectiveBrowseData = browseData ?? previewBrowseData;
  const liveDishes = effectiveBrowseData?.dishes ?? [];

  useEffect(() => {
    if (browseData) return;

    const controller = new AbortController();
    void browseDishesClient("Oslo", { signal: controller.signal })
      .then(setPreviewBrowseData)
      .catch(() => {
        if (!controller.signal.aborted) setPreviewBrowseData(null);
      });

    return () => controller.abort();
  }, [browseData]);

  const selectedArea = useMemo<CuisineArea | null>(() => {
    if (!selectedCuisine) return null;
    return selectedCuisine.areas.find((area) => area.name === selectedAreaName) ?? selectedCuisine.areas[0] ?? null;
  }, [selectedAreaName, selectedCuisine]);

  const selectedDishCoverage = useMemo(() => {
    if (!selectedArea) return [];
    return rankDishCoverage(selectedArea.dishes.map((dish) => coverageForDish(liveDishes, dish)));
  }, [liveDishes, selectedArea]);

  const selectedMoodDishCoverage = useMemo(() => {
    if (!selectedMood) return [];
    return rankDishCoverage(selectedMood.dishes.map((dish) => coverageForDish(liveDishes, dish)));
  }, [liveDishes, selectedMood]);

  const featured = useMemo(() => {
    return new Map(cuisines.map((cuisine) => [cuisine.name, featuredCoverage(cuisineCandidates(cuisine), liveDishes)]));
  }, [liveDishes]);

  const moodFeatured = useMemo(() => {
    return new Map(foodMoods.map((mood) => [mood.name, featuredCoverage(mood.dishes, liveDishes)]));
  }, [liveDishes]);

  const rankedCuisines = useMemo(() => {
    if (!effectiveBrowseData) return cuisines;
    return [...cuisines].sort((left, right) => {
      const leftCount = featured.get(left.name)?.restaurantCount ?? 0;
      const rightCount = featured.get(right.name)?.restaurantCount ?? 0;
      if (leftCount !== rightCount) return rightCount - leftCount;
      return cuisines.indexOf(left) - cuisines.indexOf(right);
    });
  }, [effectiveBrowseData, featured]);

  const filteredCuisines = useMemo(() => {
    const normalizedQuery = normalizeDiscoveryText(cuisineDirectoryQuery);
    if (!normalizedQuery) return rankedCuisines;
    return rankedCuisines.filter((cuisine) => cuisineFilterText(cuisine).includes(normalizedQuery));
  }, [cuisineDirectoryQuery, rankedCuisines]);

  const visibleCuisines = useMemo(
    () =>
      isCuisineDirectoryExpanded
        ? filteredCuisines
        : filteredCuisines.slice(0, COLLAPSED_CUISINE_COUNT),
    [filteredCuisines, isCuisineDirectoryExpanded],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedCuisine && dialog && !dialog.open) dialog.showModal();
  }, [selectedCuisine]);

  useEffect(() => {
    const dialog = moodDialogRef.current;
    if (selectedMood && dialog && !dialog.open) dialog.showModal();
  }, [selectedMood]);

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

  function openMood(mood: FoodMood, trigger: HTMLButtonElement): void {
    moodTriggerRef.current = trigger;
    setSelectedMood(mood);
  }

  function closeMood(): void {
    const dialog = moodDialogRef.current;
    if (dialog?.open) dialog.close();
    setSelectedMood(null);
  }

  function openFoodKnowledge(dishId: string): void {
    triggerRef.current = null;
    moodTriggerRef.current = null;
    if (dialogRef.current?.open) dialogRef.current.close();
    if (moodDialogRef.current?.open) moodDialogRef.current.close();
    setSelectedCuisine(null);
    setSelectedMood(null);
    window.location.hash = `learn-${encodeURIComponent(dishId)}`;
  }

  function restoreTriggerFocus(): void {
    setSelectedCuisine(null);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger) window.requestAnimationFrame(() => trigger.focus());
  }

  function restoreMoodTriggerFocus(): void {
    setSelectedMood(null);
    const trigger = moodTriggerRef.current;
    moodTriggerRef.current = null;
    if (trigger) window.requestAnimationFrame(() => trigger.focus());
  }

  return (
    <section className="cuisineExplorer" aria-labelledby="matlyst-title">
      <div className="foodSectionHeading matlystHeading">
        <div>
          <p className="foodSectionEyebrow">Matlyst</p>
          <h2 id="matlyst-title">Finn maten du faktisk har lyst på</h2>
        </div>
        <p>Start med et kjøkken, eller velg etter lyst hvis du ikke vet hvor retten kommer fra. Alt ender i den samme ferske Oslo-indeksen.</p>
      </div>

      <section className="matlystCuisineDirectory" aria-labelledby="all-cuisines-title">
        <header className="matlystCuisineDirectoryHeader">
          <p>Matkulturer</p>
          <h3 id="all-cuisines-title">Utforsk verden</h3>
          <span>{rankedCuisines.length} dokumenterte mattradisjoner, sortert med fersk Oslo-dekning først.</span>
        </header>

          <div className="matlystCuisineDirectorySearch">
            <label htmlFor="matlyst-cuisine-filter">Filtrer kjøkken</label>
            <input
              id="matlyst-cuisine-filter"
              type="search"
              autoComplete="off"
              value={cuisineDirectoryQuery}
              placeholder="Søk etter kjøkken eller rett …"
              onChange={(event) => {
                setCuisineDirectoryQuery(event.currentTarget.value);
                setIsCuisineDirectoryExpanded(false);
              }}
            />
          </div>

          <div className="matlystCuisineDirectoryMeta" aria-live="polite">
            <span>
              {visibleCuisines.length === filteredCuisines.length
                ? `${filteredCuisines.length} kjøkken`
                : `${visibleCuisines.length} av ${filteredCuisines.length} kjøkken`}
            </span>
            <small>Du kan søke på japansk, ramen, momo eller pierogi.</small>
          </div>

          {filteredCuisines.length > 0 ? (
            <div className="matlystCuisineDirectoryGrid" id="matlyst-cuisine-directory-grid">
              {visibleCuisines.map((cuisine) => {
                const firstArea = cuisine.areas[0];
                const preview = featured.get(cuisine.name) ?? null;
                if (!firstArea) return null;

                return (
                  <button
                    type="button"
                    className="matlystCuisineDirectoryCard"
                    key={cuisine.name}
                    aria-haspopup="dialog"
                    onClick={(event) => openCuisine(cuisine, firstArea, event.currentTarget)}
                  >
                    <span className="matlystCuisineDirectoryCardTopline">
                      <strong>{cuisine.name}</strong>
                      <span aria-hidden="true">→</span>
                    </span>
                    <small>{cuisine.context}</small>
                    <span className="cuisineRestaurantPreview">
                      <span className="cuisineRestaurantPreviewLabel">På menyen nå</span>
                      {!effectiveBrowseData ? (
                        <span className="cuisineRestaurantLoading">Henter ferske restauranttreff …</span>
                      ) : null}
                      {effectiveBrowseData && preview && preview.restaurantExamples.length > 0 ? (
                        <span className="cuisineRestaurantNames">
                          {preview.restaurantExamples.map((restaurant) => (
                            <span key={restaurant.id}>
                              <strong>{restaurant.name}</strong>
                              <small>{preview.dish.label} · {restaurant.address}</small>
                            </span>
                          ))}
                        </span>
                      ) : null}
                      {effectiveBrowseData && preview && preview.restaurantCount > 0 && preview.restaurantExamples.length === 0 ? (
                        <span className="cuisineRestaurantLoading">
                          {preview.dish.label} · minst {preview.restaurantCount} {preview.restaurantCount === 1 ? "sted" : "steder"} nå
                        </span>
                      ) : null}
                      {effectiveBrowseData && (!preview || preview.restaurantCount === 0) ? (
                        <span className="cuisineRestaurantLoading">Ingen prioriterte ferske treff akkurat nå.</span>
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="matlystCuisineDirectoryEmpty">Ingen aktive kjøkken eller representative retter matcher «{cuisineDirectoryQuery.trim()}».</p>
          )}

        {filteredCuisines.length > COLLAPSED_CUISINE_COUNT ? (
          <button
            type="button"
            className="matlystCuisineDirectoryToggle"
            aria-controls="matlyst-cuisine-directory-grid"
            aria-expanded={isCuisineDirectoryExpanded}
            onClick={() => setIsCuisineDirectoryExpanded((current) => !current)}
          >
            {isCuisineDirectoryExpanded ? "Vis færre kjøkken" : `Vis alle kjøkken (${filteredCuisines.length})`}
            <span aria-hidden="true">{isCuisineDirectoryExpanded ? "↑" : "↓"}</span>
          </button>
        ) : null}

        <p className="matlystCuisineDirectoryNote">Velg et kjøkken for å utforske konkrete retter og ferske serveringssteder i Oslo.</p>
      </section>

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
              <button
                type="button"
                className="matlystMoodCard"
                aria-haspopup="dialog"
                key={mood.name}
                onClick={(event) => openMood(mood, event.currentTarget)}
              >
                <span className="matlystMoodCardTopline">
                  <strong>{mood.name}</strong>
                  <span aria-hidden="true">→</span>
                </span>
                <small>{mood.context}</small>
                <span className="matlystMoodCoverage">
                  {!effectiveBrowseData ? "Henter ferske rettetreff …" : null}
                  {effectiveBrowseData && preview && preview.restaurantCount > 0
                    ? `${preview.dish.label}: minst ${preview.restaurantCount} ${preview.restaurantCount === 1 ? "sted" : "steder"} nå`
                    : null}
                  {effectiveBrowseData && (!preview || preview.restaurantCount === 0) ? "Utforsk retter i denne lysten" : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <dialog
        ref={moodDialogRef}
        className="cuisineExploreDialog matlystMoodDialog"
        aria-labelledby={selectedMood ? "mood-dialog-title" : undefined}
        onClose={restoreMoodTriggerFocus}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMood();
        }}
      >
        {selectedMood ? (
          <div className="cuisineExploreDialogShell">
            <button
              type="button"
              className="cuisineExploreDialogClose"
              aria-label={`Lukk ${selectedMood.name}`}
              onClick={closeMood}
            >
              <span aria-hidden="true">×</span>
            </button>

            <header className="cuisineExploreDialogHeader">
              <p>Hva frister?</p>
              <h2 id="mood-dialog-title">{selectedMood.name}</h2>
              <span>{selectedMood.context}</span>
            </header>

            <section className="cuisineExploreResults" aria-live="polite">
              <div className="cuisineExploreResultsHeading">
                <div>
                  <p>Retter i denne lysten</p>
                  <h3>Velg en konkret rett</h3>
                </div>
                <span>Fersk Oslo-dekning først</span>
              </div>

              <DiscoveryDishList coverage={selectedMoodDishCoverage} onOpenKnowledge={openFoodKnowledge} />
            </section>

            <footer className="cuisineExploreDialogFooter">
              Lysten er en oppdagelsesinngang, ikke en egen søkeindeks. Velg en konkret rett for å se vanlige Fysen-treff fra den samme ferske Oslo-indeksen.
            </footer>
          </div>
        ) : null}
      </dialog>

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

              <DiscoveryDishList coverage={selectedDishCoverage} onOpenKnowledge={openFoodKnowledge} />
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
