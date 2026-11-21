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
import { menuEvidenceLabel, type MenuEvidenceKind } from "../lib/menu-evidence-label";
import type { ArchivedMatlystCoverage } from "../lib/archived-matlyst-coverage";
import { dishSearchHref } from "../lib/public-path";
import {
  homeCuisines,
  type Cuisine,
  type CuisineArea,
  type DishSuggestion,
} from "./cuisine-explorer-data";
import { regionalFlagUrl } from "./cuisine-explorer-taxonomy";
import { foodTypesForCuisine, matchingCuisineFoodType } from "./cuisine-food-type-data";
import { FoodIllustration } from "./food-illustration";
import { CuisineCountryFlag } from "./cuisine-country-flag";

type RestaurantExample = DishBrowseRestaurantExample & {
  /** Only archived examples have a verified original-menu URL and observation timestamp. */
  readonly sourceUrl?: string;
  readonly observedAt?: string;
};

type DishCoverage = {
  readonly dish: DishSuggestion;
  readonly restaurantCount: number;
  readonly restaurantExamples: readonly RestaurantExample[];
  readonly evidenceKind: MenuEvidenceKind;
};

function uniqueCandidates(dishes: readonly DishSuggestion[]): readonly DishSuggestion[] {
  const seenIds = new Set<string>();
  const seenNames = new Set<string>();
  return dishes.filter((dish) => {
    // Neighboring traditions can share a dish name without sharing catalog ids.
    // Preserve the highest-ranked suggestion, not duplicate cards.
    const name = dish.label.normalize("NFKD").toLocaleLowerCase("nb").trim();
    if (seenIds.has(dish.id) || seenNames.has(name)) return false;
    seenIds.add(dish.id);
    seenNames.add(name);
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
  if (area.flag) {
    return <CuisineCountryFlag emoji={area.flag} className="cuisineAreaFlag" />;
  }
  if (area.illustration) {
    return <FoodIllustration name={area.illustration} className="cuisineAreaArtwork" size={48} />;
  }
  return null;
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
  hasLiveData: boolean,
): DishCoverage {
  if (hasLiveData) {
    const coverage = discoveryCoverage(dishes, dish);
    return {
      dish,
      restaurantCount: coverage.restaurantCount,
      restaurantExamples: coverage.restaurantExamples,
      evidenceKind: "live",
    };
  }

  if (archiveCoverage) {
    // Supplemental type examples have no archive identity. A missing byDish
    // key is unexamined, not evidence that a restaurant doesn't serve it.
    const coverage = archiveCoverage.byDish[dish.id];
    return {
      dish,
      restaurantCount: coverage?.restaurantCount ?? 0,
      restaurantExamples: coverage?.restaurantExamples ?? [],
      evidenceKind: coverage ? "archive" : "unchecked",
    };
  }

  return {
    dish,
    restaurantCount: 0,
    restaurantExamples: [],
    evidenceKind: "unavailable",
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

function DiscoveryDishList({
  coverage,
  onOpenKnowledge,
}: {
  readonly coverage: readonly DishCoverage[];
  readonly onOpenKnowledge: (dishId: string) => void;
}) {
  return (
    <div className="cuisineExploreDishList">
      {coverage.map(({ dish, restaurantCount, restaurantExamples, evidenceKind }) => (
        <article
          className="cuisineExploreDish"
          key={dish.id}
          data-has-coverage={restaurantCount > 0 ? "true" : "false"}
        >
          <div className="cuisineExploreDishHeading">
            <div className="cuisineExploreDishIdentity">
              <DishPhotoThumbnail dishId={dish.id} label={dish.label} />
              <div className="cuisineExploreDishCopy">
                <h4>{dish.label}</h4>
                <p className="cuisineExploreDishEvidence">
                  {menuEvidenceLabel(evidenceKind, restaurantCount)}
                </p>
              </div>
            </div>
            <div className="cuisineExploreDishActions">
              {dish.hasKnowledge ? (
                <button type="button" onClick={() => onOpenKnowledge(dish.id)}>
                  Lær om retten <span aria-hidden="true">↗</span>
                </button>
              ) : null}
              <a href={dishSearchHref(dish.query)}>
                {restaurantCount > 0 && evidenceKind === "live" ? "Se menytreff" : "Søk etter retten"} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          {restaurantExamples.length > 0 ? (
            <details className="cuisineExploreRestaurantDetails">
              <summary>
                Vis {restaurantExamples.length} {restaurantExamples.length === 1 ? "restauranteksempel" : "restauranteksempler"}
              </summary>
              <ul>
                {restaurantExamples.map((restaurant) => (
                  <li key={restaurant.id}>
                    <span className="cuisineExploreRestaurantExample">
                      <strong>{restaurant.name}</strong>
                      <small>{restaurant.address}</small>
                      {restaurant.observedAt ? (
                        <small>Observert {restaurant.observedAt.slice(0, 10)}</small>
                      ) : null}
                      {restaurant.sourceUrl ? (
                        <a
                          className="cuisineExploreRestaurantSource"
                          href={restaurant.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Åpne menykilden <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="cuisineExploreRestaurantNote">
                {evidenceKind === "archive"
                  ? "Arkiverte menykilder er historiske. Kontroller gjeldende meny hos restauranten."
                  : "Eksempler fra menyoversikten. Bruk «Se menytreff» for å søke etter retten."}
              </p>
            </details>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function CuisineExplorer({
  browseData,
  archiveCoverage,
  archiveOnly = false,
}: {
  readonly browseData: DishBrowseResponse | null;
  readonly archiveCoverage: ArchivedMatlystCoverage | null;
  readonly archiveOnly?: boolean;
}) {
  const [previewBrowseData, setPreviewBrowseData] = useState<DishBrowseResponse | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const [selectedAreaName, setSelectedAreaName] = useState<string>("");
  const [selectedTypeName, setSelectedTypeName] = useState<string>("");
  const [showAllDishes, setShowAllDishes] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const effectiveBrowseData = browseData ?? previewBrowseData;
  const liveDishes = effectiveBrowseData?.dishes ?? [];
  const isArchived = archiveCoverage !== null && effectiveBrowseData === null;

  useEffect(() => {
    if (archiveOnly || browseData || archiveCoverage) return;

    const controller = new AbortController();
    void browseDishesClient("Oslo", { signal: controller.signal })
      .then((data) => {
        setPreviewBrowseData(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setPreviewBrowseData(null);
        }
      });

    return () => controller.abort();
  }, [archiveOnly, browseData, archiveCoverage]);

  const selectedArea = useMemo<CuisineArea | null>(() => {
    if (!selectedCuisine) return null;
    return selectedCuisine.areas.find((area) => area.name === selectedAreaName) ?? null;
  }, [selectedAreaName, selectedCuisine]);

  const availableFoodTypes = selectedCuisine ? foodTypesForCuisine(selectedCuisine.name) : [];
  const selectedFoodType = availableFoodTypes.find((type) => type.name === selectedTypeName) ?? null;
  const allAreasLabel = selectedCuisine?.areasLabel === "Nasjonale kjøkken"
    ? "Alle land"
    : selectedCuisine?.areasLabel === "Mattyper"
      ? "Alle mattyper"
      : "Alle regioner";

  const selectedDishCoverage = useMemo(() => {
    if (!selectedCuisine) return [];
    const matchingDishes = selectedFoodType
      ? cuisineCandidates(selectedCuisine).filter((dish) =>
          matchingCuisineFoodType(selectedCuisine.name, dish.label, selectedFoodType)
        )
      : selectedArea
        ? selectedArea.dishes
        : cuisineCandidates(selectedCuisine);
    // A mat-type selection can span several geographical regions.
    // When an example is not in a region's seed catalog, it remains a search
    // suggestion, never a claim that a restaurant serves it.
    const supplementalDishes: DishSuggestion[] = selectedFoodType
      ? selectedFoodType.dishNames
          .filter((label) => !matchingDishes.some((dish) =>
            dish.label.toLocaleLowerCase("nb") === label.toLocaleLowerCase("nb")
          ))
          .map((label, index) => ({
            id: `food-type-${selectedCuisine.name}-${selectedFoodType.name}-${index}`,
            label,
            query: label,
            aliases: [],
            hasKnowledge: false,
            explorerPriority: 10 - index,
          }))
      : [];
    return rankDishCoverage([...matchingDishes, ...supplementalDishes].map((dish) =>
      coverageForDish(liveDishes, dish, isArchived ? archiveCoverage : null, effectiveBrowseData !== null)
    ));
  }, [liveDishes, selectedArea, selectedCuisine, selectedFoodType, archiveCoverage, isArchived, effectiveBrowseData]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedCuisine && dialog && !dialog.open) dialog.showModal();
  }, [selectedCuisine]);

  function openCuisine(cuisine: Cuisine, trigger: HTMLButtonElement): void {
    triggerRef.current = trigger;
    setSelectedAreaName("");
    setSelectedTypeName("");
    setShowAllDishes(false);
    setSelectedCuisine(cuisine);
  }

  function closeCuisine(): void {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setSelectedCuisine(null);
    setSelectedTypeName("");
    setSelectedAreaName("");
    setShowAllDishes(false);
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
      <RecentDishes dishes={effectiveBrowseData?.recentDishes ?? []} />
      <PopularDishes dishes={effectiveBrowseData?.popularDishes ?? []} />

      <details className="cuisineBrowseDisclosure" aria-labelledby="cuisine-browse-title">
        <summary className="cuisineBrowsePreview">
          <span className="cuisineBrowsePreviewCopy">
            <span className="foodSectionEyebrow">Matlyst</span>
            <span className="cuisineBrowsePreviewTitle" id="cuisine-browse-title">Utforsk matretter</span>
            <span className="cuisineBrowsePreviewHint">Kjøkken, regioner og mattyper</span>
          </span>
          <span className="cuisineBrowsePreviewChevron" aria-hidden="true">⌄</span>
        </summary>
        <div className="cuisineBrowseInside">
          <ul className="cuisineBrowseList" aria-label="Velg kjøkken">
            {homeCuisines.map((cuisine) => (
                <li key={cuisine.name}>
                  <button
                    type="button"
                    className="cuisineBrowseChoice"
                    aria-haspopup="dialog"
                    onClick={(event) => openCuisine(cuisine, event.currentTarget)}
                  >
                    <span className="cuisineBrowseChoiceName">{cuisine.name}</span>
                    <span className="cuisineBrowseChoiceCount">
                      {cuisine.areas.length} {cuisine.areas.length === 1 ? "underkategori" : "underkategorier"}
                    </span>
                  </button>
                </li>
            ))}
          </ul>
        </div>
      </details>

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
        {selectedCuisine ? (
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

            <div className="cuisineExploreFilterGroup" aria-label="Velg hvordan du vil utforske">
              <details className="cuisineExploreFilter cuisineExploreAreas" name="cuisine-discovery-filter">
                <summary className="cuisineExploreFilterSummary">
                  <span>{selectedCuisine.areasLabel}</span>
                  <strong>{selectedFoodType ? "Velg land eller region" : selectedArea?.name ?? allAreasLabel}</strong>
                </summary>
                <div className="cuisineExploreAreaGrid" aria-label={selectedCuisine.areasLabel}>
                <button
                  type="button"
                  className="cuisineExploreResetChoice"
                  aria-pressed={!selectedFoodType && !selectedArea}
                  onClick={(event) => {
                    setSelectedAreaName("");
                    setSelectedTypeName("");
                    setShowAllDishes(false);
                    event.currentTarget.closest("details")?.removeAttribute("open");
                  }}
                >{allAreasLabel}</button>
                {selectedCuisine.areas.map((area) => (
                  <CuisineAreaTile
                    key={area.name}
                    area={area}
                    active={!selectedFoodType && area.name === selectedArea?.name}
                    onClick={(event) => {
                      setSelectedTypeName("");
                      setSelectedAreaName(area.name);
                      setShowAllDishes(false);
                      event.currentTarget.closest("details")?.removeAttribute("open");
                    }}
                  />
                ))}
                </div>
              </details>

              {availableFoodTypes.length > 0 ? (
                <details className="cuisineExploreFilter cuisineExploreFoodTypes" name="cuisine-discovery-filter">
                  <summary className="cuisineExploreFilterSummary">
                    <span>Mattype</span>
                    <strong>{selectedFoodType?.name ?? "Velg mattype"}</strong>
                  </summary>
                  <div className="cuisineExploreTypeGrid" aria-label={`Mattyper i ${selectedCuisine.name}`}>
                  <button
                    type="button"
                    className="cuisineExploreResetChoice"
                    aria-pressed={!selectedFoodType}
                    onClick={(event) => {
                      setSelectedTypeName("");
                      setSelectedAreaName("");
                      setShowAllDishes(false);
                      event.currentTarget.closest("details")?.removeAttribute("open");
                    }}
                  >Alle mattyper</button>
                  {availableFoodTypes.map((type) => (
                    <button
                      type="button"
                      key={type.name}
                      className={selectedTypeName === type.name ? "isActive" : undefined}
                      aria-pressed={selectedTypeName === type.name}
                      onClick={(event) => {
                        setSelectedTypeName(type.name);
                        setSelectedAreaName("");
                        setShowAllDishes(false);
                        event.currentTarget.closest("details")?.removeAttribute("open");
                      }}
                    >
                      <FoodIllustration name={type.illustration} className="cuisineItalianArtwork" size={38} />
                      <strong>{type.name}</strong>
                    </button>
                  ))}
                  </div>
                </details>
              ) : null}
            </div>

            <section className="cuisineExploreResults" aria-live="polite">
              <div className="cuisineExploreResultsHeading">
                <div>
                  <p>{selectedFoodType?.name ?? selectedArea?.name ?? allAreasLabel}</p>
                  <h3>Retter og hvor du kan få dem</h3>
                </div>
                <span>{selectedDishCoverage.length} rettforslag · Oslo</span>
              </div>

              <DiscoveryDishList
                coverage={showAllDishes ? selectedDishCoverage : selectedDishCoverage.slice(0, 12)}
                onOpenKnowledge={openFoodKnowledge}
              />
              {selectedDishCoverage.length > 12 ? (
                <button
                  type="button"
                  className="cuisineExploreShowMore"
                  aria-expanded={showAllDishes}
                  onClick={() => setShowAllDishes((value) => !value)}
                >
                  {showAllDishes ? "Vis færre retter" : `Vis alle ${selectedDishCoverage.length} rettforslag`}
                </button>
              ) : null}
            </section>

            <footer className="cuisineExploreDialogFooter">
              <span>Utforsk flere retter eller åpne restaurantens meny for nærmere informasjon.</span>
              {selectedArea?.flagFile && !selectedFoodType ? (
                <a
                  href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(selectedArea.flagFile)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Regionsflagg: kilde, opphav og lisens (Wikimedia Commons)
                </a>
              ) : null}
            </footer>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
