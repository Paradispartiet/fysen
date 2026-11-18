"use client";

import type {
  DishBrowseItem,
  DishBrowseResponse,
  DishBrowseRestaurantExample,
} from "@fysen/contracts/dish-browse";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { browseDishesClient } from "../lib/client-dish-search";
import { RecentDishes } from "./recent-dishes";
import { PopularDishes } from "./popular-dishes";
import { DishPhotoGallery, DishPhotoThumbnail } from "./dish-photo-gallery";
import { discoveryCoverage } from "../lib/dish-discovery";
import type { ArchivedMatlystCoverage } from "../lib/archived-matlyst-coverage";
import { dishSearchHref } from "../lib/public-path";
import {
  homeCuisines,
  type Cuisine,
  type CuisineArea,
  type DishSuggestion,
} from "./cuisine-explorer-data";
import { italianFoodTypes, regionalFlagUrl } from "./cuisine-explorer-taxonomy";

type DishCoverage = {
  readonly dish: DishSuggestion;
  readonly restaurantCount: number;
  readonly restaurantExamples: readonly DishBrowseRestaurantExample[];
};

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

function CuisineAreaSymbol({ area }: { readonly area: CuisineArea }) {
  if (area.flagFile) {
    return (
      <img
        className="cuisineAreaFlag"
        src={regionalFlagUrl(area.flagFile)}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width="52"
        height="36"
      />
    );
  }
  return (
    <span className="cuisineAreaEmoji" aria-hidden="true">
      {area.flag ?? area.symbol ?? "🍽️"}
    </span>
  );
}

function CuisineAreaTile({
  area,
  onClick,
  active = false,
}: {
  readonly area: CuisineArea;
  readonly onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  readonly active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`cuisineAreaTile${active ? " isActive" : ""}`}
      onClick={onClick}
      aria-pressed={active}
      title={area.flagRegion ? `${area.name} · regionsflagg for ${area.flagRegion}` : area.name}
    >
      <CuisineAreaSymbol area={area} />
      <span>{area.name}</span>
    </button>
  );
}

function coverageForDish(
  dishes: readonly DishBrowseItem[],
  dish: DishSuggestion,
  archiveCoverage: ArchivedMatlystCoverage | null,
): DishCoverage {
  const coverage = archiveCoverage
    ? archiveCoverage.byDish[dish.id] ?? { restaurantCount: 0, restaurantExamples: [] }
    : discoveryCoverage(dishes, dish);
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

function featuredCoverage(
  dishesToCheck: readonly DishSuggestion[],
  dishes: readonly DishBrowseItem[],
  archiveCoverage: ArchivedMatlystCoverage | null,
): DishCoverage | null {
  return rankDishCoverage(uniqueCandidates(dishesToCheck).map((dish) =>
    coverageForDish(dishes, dish, archiveCoverage)
  ))[0] ?? null;
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
      {coverage.map(({ dish, restaurantCount, restaurantExamples }) => (
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
                Se alle treff <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <DishPhotoThumbnail dishId={dish.id} label={dish.label} />

          {restaurantExamples.length > 0 ? (
            <ul>
              {restaurantExamples.map((restaurant) => (
                <li key={restaurant.id}>
                  <a href={dishSearchHref(dish.query)}>
                    <strong>{restaurant.name}</strong>
                    <span>{dish.label}</span>
                    <small>{restaurant.address}</small>
                  </a>
                </li>
              ))}
            </ul>
          ) : restaurantCount > 0 ? (
            <p>Finnes hos {restaurantCount} {restaurantCount === 1 ? "restaurant" : "restauranter"} i Oslo.</p>
          ) : (
            <p>Ingen treff på denne retten akkurat nå.</p>
          )}
        </article>
      ))}
    </div>
  );
}

export function CuisineExplorer({
  browseData,
  archiveCoverage,
}: {
  readonly browseData: DishBrowseResponse | null;
  readonly archiveCoverage: ArchivedMatlystCoverage | null;
}) {
  const [previewBrowseData, setPreviewBrowseData] = useState<DishBrowseResponse | null>(null);
  const [previewBrowseFailed, setPreviewBrowseFailed] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const [selectedAreaName, setSelectedAreaName] = useState<string>("");
  const [selectedTypeName, setSelectedTypeName] = useState<string>("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const effectiveBrowseData = browseData ?? previewBrowseData;
  const liveDishes = effectiveBrowseData?.dishes ?? [];
  const isArchived = archiveCoverage !== null && effectiveBrowseData === null;
  const coverageReady = effectiveBrowseData !== null || isArchived;

  useEffect(() => {
    if (browseData || archiveCoverage) return;

    const controller = new AbortController();
    void browseDishesClient("Oslo", { signal: controller.signal })
      .then((data) => {
        setPreviewBrowseData(data);
        setPreviewBrowseFailed(false);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setPreviewBrowseData(null);
          setPreviewBrowseFailed(true);
        }
      });

    return () => controller.abort();
  }, [browseData, archiveCoverage]);

  const selectedArea = useMemo<CuisineArea | null>(() => {
    if (!selectedCuisine) return null;
    return selectedCuisine.areas.find((area) => area.name === selectedAreaName) ?? selectedCuisine.areas[0] ?? null;
  }, [selectedAreaName, selectedCuisine]);

  const selectedItalianType = selectedCuisine?.name === "Italiensk"
    ? italianFoodTypes.find((type) => type.name === selectedTypeName) ?? null
    : null;

  const selectedDishCoverage = useMemo(() => {
    if (!selectedArea || !selectedCuisine) return [];
    const matchingDishes = selectedItalianType
      ? cuisineCandidates(selectedCuisine).filter((dish) =>
          selectedItalianType.dishNames.some((name) => name.toLocaleLowerCase("nb") === dish.label.toLocaleLowerCase("nb"))
        )
      : selectedArea.dishes;
    return rankDishCoverage(matchingDishes.map((dish) =>
      coverageForDish(liveDishes, dish, isArchived ? archiveCoverage : null)
    ));
  }, [liveDishes, selectedArea, selectedCuisine, selectedItalianType, archiveCoverage, isArchived]);

  const featured = useMemo(() => {
    return new Map(homeCuisines.map((cuisine) => [
      cuisine.name, featuredCoverage(
        // Generic kebab matches should not mislabel a kebab house as an Indian restaurant.
        cuisineCandidates(cuisine).filter((dish) => dish.id !== "kebab-india"),
        liveDishes,
        isArchived ? archiveCoverage : null,
      )
    ]));
  }, [liveDishes, archiveCoverage, isArchived]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedCuisine && dialog && !dialog.open) dialog.showModal();
  }, [selectedCuisine]);

  function openCuisine(cuisine: Cuisine, area: CuisineArea, trigger: HTMLButtonElement): void {
    triggerRef.current = trigger;
    setSelectedAreaName(area.name);
    setSelectedTypeName("");
    setSelectedCuisine(cuisine);
  }

  function closeCuisine(): void {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setSelectedCuisine(null);
    setSelectedTypeName("");
  }

  function openFoodKnowledge(dishId: string): void {
    triggerRef.current = null;
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setSelectedCuisine(null);
    setSelectedTypeName("");
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
          <h2>Utforsk kjøkken og retter</h2>
        </div>
        <p>Velg det du har lyst på. Finn retter og se hvilke restauranter som tilbyr dem.</p>
      </div>

      <RecentDishes dishes={effectiveBrowseData?.recentDishes ?? []} />
      <PopularDishes dishes={effectiveBrowseData?.popularDishes ?? []} />
      <div className="cuisineGrid">
        {homeCuisines.map((cuisine) => {
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

                <span className="cuisineCardBrowseLabel">Velg et underkjøkken nedenfor</span>

                <span className="cuisineRestaurantPreview">
                  <span className="cuisineRestaurantPreviewLabel">Restauranter og retter</span>
                  {!coverageReady && !previewBrowseFailed ? (
                    <span className="cuisineRestaurantLoading">Henter restauranter …</span>
                  ) : null}
                  {!coverageReady && previewBrowseFailed ? (
                    <span className="cuisineRestaurantLoading">Kunne ikke hente restaurantene akkurat nå.</span>
                  ) : null}
                  {coverageReady && preview && preview.restaurantExamples.length > 0 ? (
                    <span className="cuisineRestaurantNames">
                      {preview.restaurantExamples.map((restaurant) => (
                        <span key={restaurant.id}>
                          <strong>{restaurant.name}</strong>
                          <small>{preview.dish.label} · {restaurant.address}</small>
                        </span>
                      ))}
                    </span>
                  ) : null}
                  {coverageReady && preview && preview.restaurantCount > 0 && preview.restaurantExamples.length === 0 ? (
                    <span className="cuisineRestaurantLoading">
                      {preview.dish.label} · {preview.restaurantCount} {preview.restaurantCount === 1 ? "sted" : "steder"}
                    </span>
                  ) : null}
                  {coverageReady && (!preview || preview.restaurantCount === 0) ? (
                    <span className="cuisineRestaurantLoading">Ingen treff i dette utvalget.</span>
                  ) : null}
                </span>
              </button>

              <div className="cuisineAreaList" aria-label={`${cuisine.areasLabel} i ${cuisine.name}`}>
                {cuisine.areas.slice(0, 6).map((area) => (
                  <CuisineAreaTile
                    key={area.name}
                    area={area}
                    onClick={(event) => openCuisine(cuisine, area, event.currentTarget)}
                  />
                ))}
                {cuisine.areas.length > 6 ? (
                  <button
                    type="button"
                    className="cuisineAreaSeeMore"
                    onClick={(event) => openCuisine(cuisine, firstArea, event.currentTarget)}
                  >
                    Se alle {cuisine.areas.length}
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      <DishPhotoGallery />

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
              <div className="cuisineExploreAreaGrid">
                {selectedCuisine.areas.map((area) => (
                  <CuisineAreaTile
                    key={area.name}
                    area={area}
                    active={!selectedItalianType && area.name === selectedArea.name}
                    onClick={() => {
                      setSelectedTypeName("");
                      setSelectedAreaName(area.name);
                    }}
                  />
                ))}
              </div>
            </section>

            {selectedCuisine.name === "Italiensk" ? (
              <section className="cuisineExploreFoodTypes" aria-labelledby="italian-types-title">
                <h3 id="italian-types-title">Eller utforsk italienske mattyper</h3>
                <div className="cuisineExploreTypeGrid">
                  {italianFoodTypes.map((type) => (
                    <button
                      type="button"
                      key={type.name}
                      className={selectedTypeName === type.name ? "isActive" : undefined}
                      aria-pressed={selectedTypeName === type.name}
                      onClick={() => setSelectedTypeName(type.name)}
                    >
                      <span aria-hidden="true">{type.symbol}</span>
                      <strong>{type.name}</strong>
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="cuisineExploreResults" aria-live="polite">
              <div className="cuisineExploreResultsHeading">
                <div>
                  <p>{selectedItalianType?.name ?? selectedArea.name}</p>
                  <h3>Retter og hvor du kan få dem</h3>
                </div>
                <span>Restauranter i Oslo</span>
              </div>

              <DiscoveryDishList coverage={selectedDishCoverage} onOpenKnowledge={openFoodKnowledge} />
            </section>

            <footer className="cuisineExploreDialogFooter">
              Utforsk flere retter eller åpne restaurantens meny for nærmere informasjon.
            </footer>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
