"use client";

import type {
  DishBrowseItem,
  DishBrowseResponse,
  DishBrowseRestaurantExample,
} from "@fysen/contracts/dish-browse";
import { browseText } from "../lib/browse-messages";
import { visualText } from "../lib/visual-messages";
import { usePreviewLocale } from "./language-preview";
import { resultText } from "../lib/result-messages";
import { dishDisplayName } from "../lib/dish-display-names";
import { cuisineLabel } from "../lib/cuisine-labels";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { browseDishesClient } from "../lib/client-dish-search";
import { RecentDishes } from "./recent-dishes";
import { PopularDishes } from "./popular-dishes";
import { DishPhotoGallery, DishPhotoThumbnail } from "./dish-photo-gallery";
import { discoveryCoverage } from "../lib/dish-discovery";
import { menuEvidenceLabel, type MenuEvidenceKind } from "../lib/menu-evidence-label";
import type { ArchivedMatlystCoverage } from "../lib/archived-matlyst-coverage";
import { dishSearchHref, withPublicBasePath } from "../lib/public-path";
import { restaurantVisuals } from "../lib/restaurant-visuals";
import { rankRestaurantsByDistance, type Coordinates } from "../lib/restaurant-distance";
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
  /** Verified archive examples include the original menu URL. Both sources may include a menu date. */
  readonly sourceUrl?: string;
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
  const locale = usePreviewLocale();
  return (
    <button
      type="button"
      className={`cuisineAreaTile${active ? " isActive" : ""}`}
      onClick={onClick}
      aria-pressed={active}
      title={area.flagRegion ? `${area.name} · regionsflagg for ${area.flagRegion}` : area.name}
    >
      <CuisineAreaSymbol area={area} />
      <span lang={locale}>{cuisineLabel(area.name, locale)}</span>
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
    const stored = archiveCoverage?.byDish[dish.id];
    // Archive identity uses slugs; live identity uses UUIDs. Deduplicate across
    // sources by normalized restaurant name and address, preserving dated evidence.
    const key = (restaurant: RestaurantExample) =>
      (restaurant.name + " " + restaurant.address).normalize("NFKC")
        .toLocaleLowerCase("nb-NO").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    const restaurants = new Map<string, RestaurantExample>();
    for (const restaurant of coverage.restaurantExamples) restaurants.set(key(restaurant), restaurant);
    for (const restaurant of stored?.restaurantExamples ?? []) {
      const identity = key(restaurant);
      const existing = restaurants.get(identity);
      if (!existing || !existing.observedAt || Date.parse(existing.observedAt) <= Date.parse(restaurant.observedAt)) {
        restaurants.set(identity, restaurant);
      }
    }
    const restaurantExamples = [...restaurants.values()];
    return {
      dish,
      restaurantCount: Math.max(coverage.restaurantCount, stored?.restaurantCount ?? 0, restaurantExamples.length),
      restaurantExamples,
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

const restaurantPreviewLimit = 4;

/** A restaurant identity, not an imitation of its official logo. */
function restaurantInitials(name: string): string {
  const words = name.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? [];
  return words.slice(0, 2).map((word) => Array.from(word)[0]).join("").toLocaleUpperCase("nb-NO") || "R";
}

function RestaurantCard({ restaurant }: { readonly restaurant: RestaurantExample }) {
  const locale = usePreviewLocale();
  const visuals = restaurantVisuals(restaurant);
  const [failedLogo, setFailedLogo] = useState<string | null>(null);
  const identity = (
    <>
      {visuals && failedLogo !== visuals.logo ? (
        <img className="cuisineExploreRestaurantLogo" src={withPublicBasePath(visuals.logo)}
          alt="" width={64} height={38} loading="lazy" decoding="async"
          onError={() => setFailedLogo(visuals.logo)} />
      ) : (
        <span className="cuisineExploreRestaurantMonogram" aria-hidden="true">{restaurantInitials(restaurant.name)}</span>
      )}
      <span className="cuisineExploreRestaurantCopy">
        <strong>{restaurant.name}</strong>
        {restaurant.address ? <small>{restaurant.address}</small> : null}
      </span>
    </>
  );
  return (
    <li>
      {restaurant.sourceUrl ? (
        <a className="cuisineExploreRestaurantName" href={restaurant.sourceUrl} target="_blank" rel="noopener noreferrer">
          {identity}
        </a>
      ) : <div className="cuisineExploreRestaurantName">{identity}</div>}
      {visuals ? (
        <div className="cuisineExploreRestaurantArtwork">
          <div className="cuisineExploreRestaurantScenes">
            <figure>
              <img src={withPublicBasePath(visuals.exterior)} alt={visualText(locale, "exteriorAlt", { name: restaurant.name })} width={1536} height={1024} loading="lazy" decoding="async" />
              <figcaption>{visualText(locale, "exterior")}</figcaption>
            </figure>
            {visuals.interior ? (
            <figure>
              <img src={withPublicBasePath(visuals.interior)} alt={visualText(locale, "interiorAlt", { name: restaurant.name })} width={1536} height={1024} loading="lazy" decoding="async" />
              <figcaption>{visualText(locale, "interior")}</figcaption>
            </figure>
            ) : null}
          </div>
          <a className="cuisineExploreRestaurantArtSource" href={visuals.sourceUrl} target="_blank" rel="noopener noreferrer">
            {visualText(locale, "restaurantSource")}
          </a>
        </div>
      ) : null}
    </li>
  );
}

function RestaurantNames({ restaurants }: { readonly restaurants: readonly RestaurantExample[] }) {
  return (
    <ul className="cuisineExploreRestaurantNames">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </ul>
  );
}

function RestaurantPreview({ restaurants, dishLabel, location }: {
  readonly restaurants: readonly RestaurantExample[];
  readonly dishLabel: string;
  readonly location: Coordinates | null;
}) {
  const locale = usePreviewLocale();
  const { known, unknown } = rankRestaurantsByDistance(restaurants, location);
  const ranked = known.length > 0;
  const preview = (ranked ? known : restaurants).slice(0, restaurantPreviewLimit);
  const remaining = ranked ? [...known.slice(restaurantPreviewLimit), ...unknown] : restaurants.slice(restaurantPreviewLimit);
  return (
    <div className="cuisineExploreRestaurantPreview">
      {location ? (
        <p className="cuisineExploreDistanceNote">
          {ranked
            ? browseText(locale,"nearestKnown",{count:known.length}) + (unknown.length ? ` · ${unknown.length} ${browseText(locale,"distanceUnknown").toLocaleLowerCase(locale)}` : "")
            : browseText(locale,"noDistance")}
        </p>
      ) : null}
      <RestaurantNames restaurants={preview} />
      {remaining.length > 0 ? (
        <details className="cuisineExploreRestaurantDetails">
          <summary aria-label={browseText(locale,"moreRestaurants",{name:dishLabel})}>
            <span className="cuisineExploreRestaurantMoreLabel">{browseText(locale,"more",{count:remaining.length})}</span>
            <span className="cuisineExploreRestaurantLessLabel">{browseText(locale,"less")}</span>
            <span className="cuisineExploreRestaurantChevron" aria-hidden="true">⌄</span>
          </summary>
          {ranked ? (
            <>
              {known.length > restaurantPreviewLimit ? <RestaurantNames restaurants={known.slice(restaurantPreviewLimit)} /> : null}
              {unknown.length > 0 ? (
                <>
                  <p className="cuisineExploreDistanceNote">{browseText(locale,"distanceUnknown")}</p>
                  <RestaurantNames restaurants={unknown} />
                </>
              ) : null}
            </>
          ) : <RestaurantNames restaurants={remaining} />}
        </details>
      ) : null}
    </div>
  );
}

function DiscoveryDishList({
  coverage,
  onOpenKnowledge,
  location,
}: {
  readonly coverage: readonly DishCoverage[];
  readonly location: Coordinates | null;
  readonly onOpenKnowledge: (dishId: string) => void;
}) {
  const locale = usePreviewLocale();
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
                <h4 lang={locale}>{dishDisplayName(dish.id, dish.label, locale)}</h4>
                <p className="cuisineExploreDishEvidence">
                  {menuEvidenceLabel(evidenceKind, restaurantCount, locale)}
                </p>
              </div>
            </div>
            <div className="cuisineExploreDishActions">
              {dish.hasKnowledge ? (
                <button type="button" onClick={() => onOpenKnowledge(dish.id)}>
                  {resultText(locale, "learnDish")} <span aria-hidden="true">↗</span>
                </button>
              ) : null}
              <a href={dishSearchHref(dish.query)}>
                {restaurantCount > 0 ? resultText(locale, "menuMatches") : resultText(locale, "searchDish")} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          {restaurantExamples.length > 0 ? (
            <RestaurantPreview restaurants={restaurantExamples} dishLabel={dish.label} location={location} />
          ) : null}
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
  const locale = usePreviewLocale();
  const [previewBrowseData, setPreviewBrowseData] = useState<DishBrowseResponse | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const [selectedAreaName, setSelectedAreaName] = useState<string>("");
  const [selectedTypeName, setSelectedTypeName] = useState<string>("");
  const [showAllDishes, setShowAllDishes] = useState(false);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const effectiveBrowseData = browseData ?? previewBrowseData;
  const liveDishes = effectiveBrowseData?.dishes ?? [];

  useEffect(() => {
    if (browseData || archiveCoverage) return;

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
  }, [browseData, archiveCoverage]);

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
      coverageForDish(liveDishes, dish, archiveCoverage, effectiveBrowseData !== null)
    ));
  }, [liveDishes, selectedArea, selectedCuisine, selectedFoodType, archiveCoverage, effectiveBrowseData]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedCuisine && dialog && !dialog.open) dialog.showModal();
  }, [selectedCuisine]);

  function requestLocation(): void {
    if (!navigator.geolocation) {
      setLocationStatus("Posisjon støttes ikke i denne nettleseren.");
      return;
    }
    setLocating(true);
    setLocationStatus("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        // Position is used only in memory in this browser; no API call or storage.
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
        setLocating(false);
      },
      () => {
        setLocationStatus("Kunne ikke hente posisjon. Du kan fortsatt utforske alle retter.");
        setLocating(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  }

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
            <span className="cuisineBrowsePreviewTitle" id="cuisine-browse-title" lang={locale}>{resultText(locale, "explore")}</span>
            <span className="cuisineBrowsePreviewHint" lang={locale}>{resultText(locale, "exploreHint")}</span>
          </span>
          <span className="cuisineBrowsePreviewChevron" aria-hidden="true">⌄</span>
        </summary>
        <div className="cuisineBrowseInside">
          <ul className="cuisineBrowseList" lang={locale} aria-label={resultText(locale, "chooseCuisine")}>
            {homeCuisines.map((cuisine) => (
                <li key={cuisine.name}>
                  <button
                    type="button"
                    className="cuisineBrowseChoice"
                    aria-haspopup="dialog"
                    onClick={(event) => openCuisine(cuisine, event.currentTarget)}
                  >
                    <span className="cuisineBrowseChoiceName">{cuisineLabel(cuisine.name, locale)}</span>
                    <span className="cuisineBrowseChoiceCount">
                      {browseText(locale,cuisine.areas.length === 1 ? "subOne" : "subMany",{count:cuisine.areas.length})}
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
              aria-label={browseText(locale,"close",{name:cuisineLabel(selectedCuisine.name,locale)})}
              onClick={closeCuisine}
            >
              <span aria-hidden="true">×</span>
            </button>

            <header className="cuisineExploreDialogHeader">
              <p lang={locale}>{resultText(locale, "exploreCuisine")}</p>
              <h2 id="cuisine-dialog-title" lang={locale}>{cuisineLabel(selectedCuisine.name, locale)}</h2>
              <span>{selectedCuisine.context}</span>
            </header>

            <div className="cuisineExploreFilterGroup" aria-label={browseText(locale,"exploreHow")}>
              <details className="cuisineExploreFilter cuisineExploreAreas" name="cuisine-discovery-filter">
                <summary className="cuisineExploreFilterSummary">
                  <span lang={locale}>{cuisineLabel(selectedCuisine.areasLabel, locale)}</span>
                  <strong>{selectedFoodType ? "Velg land eller region" : cuisineLabel(selectedArea?.name ?? allAreasLabel, locale)}</strong>
                </summary>
                <div className="cuisineExploreAreaGrid" aria-label={cuisineLabel(selectedCuisine.areasLabel, locale)}>
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
                >{cuisineLabel(allAreasLabel, locale)}</button>
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
                    <strong>{selectedFoodType ? cuisineLabel(selectedFoodType.name, locale) : "Velg mattype"}</strong>
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
                  >{cuisineLabel("Alle mattyper", locale)}</button>
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
                      <strong lang={locale}>{cuisineLabel(type.name, locale)}</strong>
                    </button>
                  ))}
                  </div>
                </details>
              ) : null}
            </div>

            <section className="cuisineExploreResults" aria-live="polite">
              <div className="cuisineExploreResultsHeading">
                <div>
                  <p lang={locale}>{cuisineLabel(selectedFoodType?.name ?? selectedArea?.name ?? allAreasLabel, locale)}</p>
                  <h3 lang={locale}>{resultText(locale, "dishesWhere")}</h3>
                </div>
                <span>{browseText(locale,"proposals",{count:selectedDishCoverage.length})}</span>
              </div>

              <div className="cuisineExploreLocation">
                <button type="button" disabled={locating} onClick={location ? () => { setLocation(null); setLocationStatus(""); } : requestLocation}>
                  {location ? browseText(locale,"disableDistance") : locating ? "Henter posisjon …" : browseText(locale,"nearestHere")}
                </button>
                <span role="status">{location ? browseText(locale,"sortedDistance") : locationStatus || browseText(locale,"localOnly")}</span>
              </div>
              <DiscoveryDishList
                location={location}
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
                  {showAllDishes ? browseText(locale,"showFewer") : browseText(locale,"showAll",{count:selectedDishCoverage.length})}
                </button>
              ) : null}
            </section>

            <footer className="cuisineExploreDialogFooter">
              <span>{browseText(locale,"sourceNote")}</span>
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
