"use client";

import type { DishBrowseItem, DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { useEffect, useMemo, useRef, useState } from "react";
import { discoveryCoverage, normalizeDiscoveryText } from "../lib/dish-discovery";
import { dishSearchHref } from "../lib/public-path";
import {
  activeRegionCuisines,
  activeWorldCuisines,
  cuisineTaxonomyPath,
  culinaryWorlds,
  type CulinaryRegion,
  type CulinaryWorld,
} from "./culinary-taxonomy";
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
};

const frontPageWorlds = culinaryWorlds.filter((world) => activeWorldCuisines(world).length > 0);

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

function cuisinesCandidates(cuisinesToCheck: readonly Cuisine[]): readonly DishSuggestion[] {
  return uniqueCandidates(cuisinesToCheck.flatMap(cuisineCandidates));
}

function cuisineFilterText(cuisine: Cuisine): string {
  const taxonomyPath = cuisineTaxonomyPath(cuisine.name);
  return normalizeDiscoveryText([
    taxonomyPath?.worldName ?? "",
    taxonomyPath?.regionName ?? "",
    cuisine.name,
    cuisine.context,
    ...cuisine.areas.map((area) => area.name),
    ...cuisineCandidates(cuisine).flatMap((dish) => [dish.label, dish.query, ...dish.aliases]),
  ].join(" "));
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
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const [selectedAreaName, setSelectedAreaName] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState<FoodMood | null>(null);
  const [selectedWorld, setSelectedWorld] = useState<CulinaryWorld | null>(null);
  const [selectedCulinaryRegionId, setSelectedCulinaryRegionId] = useState("");
  const [cuisineDirectoryQuery, setCuisineDirectoryQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const moodDialogRef = useRef<HTMLDialogElement>(null);
  const worldDialogRef = useRef<HTMLDialogElement>(null);
  const cuisineDirectoryDialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const moodTriggerRef = useRef<HTMLButtonElement | null>(null);
  const worldTriggerRef = useRef<HTMLButtonElement | null>(null);
  const cuisineDirectoryTriggerRef = useRef<HTMLButtonElement | null>(null);
  const liveDishes = browseData?.dishes ?? [];

  const selectedArea = useMemo<CuisineArea | null>(() => {
    if (!selectedCuisine) return null;
    return selectedCuisine.areas.find((area) => area.name === selectedAreaName) ?? selectedCuisine.areas[0] ?? null;
  }, [selectedAreaName, selectedCuisine]);

  const selectedCulinaryRegion = useMemo<CulinaryRegion | null>(() => {
    if (!selectedWorld || !selectedCulinaryRegionId) return null;
    return selectedWorld.regions.find((region) => region.id === selectedCulinaryRegionId) ?? null;
  }, [selectedCulinaryRegionId, selectedWorld]);

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

  const worldFeatured = useMemo(() => {
    return new Map(frontPageWorlds.map((world) => [
      world.id,
      featuredCoverage(cuisinesCandidates(activeWorldCuisines(world)), liveDishes),
    ]));
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

  const filteredCuisines = useMemo(() => {
    const normalizedQuery = normalizeDiscoveryText(cuisineDirectoryQuery);
    if (!normalizedQuery) return rankedCuisines;
    return rankedCuisines.filter((cuisine) => cuisineFilterText(cuisine).includes(normalizedQuery));
  }, [cuisineDirectoryQuery, rankedCuisines]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedCuisine && dialog && !dialog.open) dialog.showModal();
  }, [selectedCuisine]);

  useEffect(() => {
    const dialog = moodDialogRef.current;
    if (selectedMood && dialog && !dialog.open) dialog.showModal();
  }, [selectedMood]);

  useEffect(() => {
    const dialog = worldDialogRef.current;
    if (selectedWorld && dialog && !dialog.open) dialog.showModal();
  }, [selectedWorld]);

  function openCuisineFromDirectory(cuisine: Cuisine, area: CuisineArea): void {
    const returnTrigger = cuisineDirectoryTriggerRef.current;
    cuisineDirectoryTriggerRef.current = null;
    const directoryDialog = cuisineDirectoryDialogRef.current;
    if (directoryDialog?.open) directoryDialog.close();
    triggerRef.current = returnTrigger;
    setSelectedAreaName(area.name);
    setSelectedCuisine(cuisine);
  }

  function openCuisineFromWorld(cuisine: Cuisine, area: CuisineArea): void {
    const returnTrigger = worldTriggerRef.current;
    worldTriggerRef.current = null;
    const dialog = worldDialogRef.current;
    if (dialog?.open) dialog.close();
    setSelectedWorld(null);
    setSelectedCulinaryRegionId("");
    triggerRef.current = returnTrigger;
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

  function openWorld(world: CulinaryWorld, trigger: HTMLButtonElement): void {
    worldTriggerRef.current = trigger;
    setSelectedCulinaryRegionId("");
    setSelectedWorld(world);
  }

  function closeWorld(): void {
    const dialog = worldDialogRef.current;
    if (dialog?.open) dialog.close();
    setSelectedWorld(null);
    setSelectedCulinaryRegionId("");
  }

  function openCuisineDirectory(trigger: HTMLButtonElement): void {
    cuisineDirectoryTriggerRef.current = trigger;
    const dialog = cuisineDirectoryDialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }

  function closeCuisineDirectory(): void {
    const dialog = cuisineDirectoryDialogRef.current;
    if (dialog?.open) dialog.close();
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

  function restoreWorldTriggerFocus(): void {
    setSelectedWorld(null);
    setSelectedCulinaryRegionId("");
    const trigger = worldTriggerRef.current;
    worldTriggerRef.current = null;
    if (trigger) window.requestAnimationFrame(() => trigger.focus());
  }

  function restoreCuisineDirectoryFocus(): void {
    setCuisineDirectoryQuery("");
    const trigger = cuisineDirectoryTriggerRef.current;
    cuisineDirectoryTriggerRef.current = null;
    if (trigger) window.requestAnimationFrame(() => trigger.focus());
  }

  return (
    <section className="cuisineExplorer" aria-labelledby="matlyst-title">
      <div className="foodSectionHeading matlystHeading">
        <div>
          <p className="foodSectionEyebrow">Matlyst</p>
          <h2 id="matlyst-title">Finn maten du faktisk har lyst på</h2>
        </div>
        <p>Start med en smak eller rettstype, eller utforsk matkulturer fra verdensdel til konkret kjøkken. Alt ender i den samme ferske Oslo-indeksen.</p>
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
                  {!browseData ? "Utforsk retter" : null}
                  {browseData && preview && preview.restaurantCount > 0
                    ? `${preview.dish.label}: minst ${preview.restaurantCount} ${preview.restaurantCount === 1 ? "sted" : "steder"} nå`
                    : null}
                  {browseData && (!preview || preview.restaurantCount === 0) ? "Utforsk retter i denne lysten" : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="matlystCuisineHeading">
        <div>
          <span>Matkulturer</span>
          <h3>Utforsk verden</h3>
        </div>
        <p>Verdensdel → kulinarisk region → kjøkken. Bare dokumenterte kjøkken blir aktive.</p>
      </div>

      <div className="matlystWorldGrid">
        {frontPageWorlds.map((world) => {
          const activeCuisines = activeWorldCuisines(world);
          const activeRegions = world.regions.filter((region) => activeRegionCuisines(region).length > 0);
          const preview = worldFeatured.get(world.id) ?? null;
          return (
            <button
              type="button"
              className="matlystWorldCard"
              aria-haspopup="dialog"
              key={world.id}
              onClick={(event) => openWorld(world, event.currentTarget)}
            >
              <span className="matlystWorldCardTopline">
                <strong>{world.name}</strong>
                <span aria-hidden="true">→</span>
              </span>
              <small>{world.context}</small>
              <span className="matlystWorldCardRegions">{activeRegions.map((region) => region.name).join(" · ")}</span>
              <span className="matlystWorldCoverage">
                {activeCuisines.length} aktive kjøkken
                {browseData && preview && preview.restaurantCount > 0
                  ? ` · ${preview.dish.label} hos minst ${preview.restaurantCount} ${preview.restaurantCount === 1 ? "sted" : "steder"} nå`
                  : ""}
              </span>
            </button>
          );
        })}
      </div>

      <div className="matlystCuisineMore">
        <button type="button" aria-haspopup="dialog" onClick={(event) => openCuisineDirectory(event.currentTarget)}>
          Alle kjøkken ({rankedCuisines.length})
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <dialog
        ref={worldDialogRef}
        className="cuisineExploreDialog matlystWorldDialog"
        aria-labelledby={selectedWorld ? "world-dialog-title" : undefined}
        onClose={restoreWorldTriggerFocus}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeWorld();
        }}
      >
        {selectedWorld ? (
          <div className="cuisineExploreDialogShell">
            <button type="button" className="cuisineExploreDialogClose" aria-label={`Lukk ${selectedWorld.name}`} onClick={closeWorld}>
              <span aria-hidden="true">×</span>
            </button>

            <header className="cuisineExploreDialogHeader">
              <p>{selectedCulinaryRegion ? selectedWorld.name : "Matkulturer"}</p>
              <h2 id="world-dialog-title">{selectedCulinaryRegion ? selectedCulinaryRegion.name : selectedWorld.name}</h2>
              <span>{selectedCulinaryRegion ? selectedCulinaryRegion.context : selectedWorld.context}</span>
            </header>

            {selectedCulinaryRegion ? (
              <>
                <button type="button" className="matlystWorldBack" onClick={() => setSelectedCulinaryRegionId("")}>
                  <span aria-hidden="true">←</span> Tilbake til {selectedWorld.name}
                </button>

                <section className="matlystTaxonomyLevel" aria-labelledby="taxonomy-cuisine-title">
                  <div className="cuisineExploreResultsHeading">
                    <div>
                      <p>Nivå 3 · kjøkken</p>
                      <h3 id="taxonomy-cuisine-title">Velg mattradisjon</h3>
                    </div>
                    <span>{activeRegionCuisines(selectedCulinaryRegion).length} aktive nå</span>
                  </div>

                  <div className="matlystTaxonomyCuisineGrid">
                    {selectedCulinaryRegion.cuisines.map((link) => {
                      const firstArea = link.cuisine?.areas[0] ?? null;
                      const preview = link.cuisine ? featured.get(link.cuisine.name) ?? null : null;
                      return link.cuisine && firstArea ? (
                        <button
                          type="button"
                          className="matlystTaxonomyCuisineCard"
                          data-active="true"
                          key={link.name}
                          onClick={() => openCuisineFromWorld(link.cuisine as Cuisine, firstArea)}
                        >
                          <span className="matlystTaxonomyCuisineTopline">
                            <strong>{link.name}</strong>
                            <span aria-hidden="true">→</span>
                          </span>
                          <small>{link.cuisine.context}</small>
                          <span className="matlystTaxonomyCuisineStatus">
                            {browseData && preview && preview.restaurantCount > 0
                              ? `${preview.dish.label} · minst ${preview.restaurantCount} ${preview.restaurantCount === 1 ? "sted" : "steder"} nå`
                              : "Dokumentert kjøkken · utforsk retter"}
                          </span>
                        </button>
                      ) : (
                        <div className="matlystTaxonomyCuisineCard" data-active="false" key={link.name}>
                          <span className="matlystTaxonomyCuisineTopline"><strong>{link.name}</strong></span>
                          <small>Taksonomisk plass er definert.</small>
                          <span className="matlystTaxonomyCuisineStatus">Aktiveres når canonical retter og Oslo-dekning er dokumentert.</span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </>
            ) : (
              <section className="matlystTaxonomyLevel" aria-labelledby="taxonomy-region-title">
                <div className="cuisineExploreResultsHeading">
                  <div>
                    <p>Nivå 2 · kulinarisk region</p>
                    <h3 id="taxonomy-region-title">Velg region</h3>
                  </div>
                  <span>Nivå 1: {selectedWorld.name}</span>
                </div>

                <div className="matlystRegionGrid">
                  {selectedWorld.regions.map((region) => {
                    const activeCuisines = activeRegionCuisines(region);
                    const preview = featuredCoverage(cuisinesCandidates(activeCuisines), liveDishes);
                    return (
                      <button
                        type="button"
                        className="matlystRegionCard"
                        key={region.id}
                        onClick={() => setSelectedCulinaryRegionId(region.id)}
                      >
                        <span className="matlystRegionCardTopline">
                          <strong>{region.name}</strong>
                          <span aria-hidden="true">→</span>
                        </span>
                        <small>{region.context}</small>
                        <span className="matlystRegionCuisineNames">{region.cuisines.map((link) => link.name).join(" · ")}</span>
                        <span className="matlystRegionCoverage">
                          {activeCuisines.length > 0
                            ? `${activeCuisines.length} aktive kjøkken${browseData && preview && preview.restaurantCount > 0 ? ` · ${preview.dish.label} på menyen nå` : ""}`
                            : "Taksonomi klar · ingen dokumentert Oslo-dekning ennå"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            <footer className="cuisineExploreDialogFooter">
              Verdensdel og kulinarisk region er navigasjonsnivåer. Bare kjøkken med canonical retter og dokumentert produksjonsgrunnlag blir aktive i Fysen.
            </footer>
          </div>
        ) : null}
      </dialog>

      <dialog
        ref={cuisineDirectoryDialogRef}
        className="cuisineExploreDialog matlystCuisineDirectoryDialog"
        aria-labelledby="all-cuisines-dialog-title"
        onClose={restoreCuisineDirectoryFocus}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeCuisineDirectory();
        }}
      >
        <div className="cuisineExploreDialogShell">
          <button type="button" className="cuisineExploreDialogClose" aria-label="Lukk alle kjøkken" onClick={closeCuisineDirectory}>
            <span aria-hidden="true">×</span>
          </button>

          <header className="cuisineExploreDialogHeader">
            <p>Kjøkken</p>
            <h2 id="all-cuisines-dialog-title">Alle aktive kjøkken i Matlyst</h2>
            <span>{rankedCuisines.length} dokumenterte mattradisjoner, sortert med fersk Oslo-dekning først.</span>
          </header>

          <div className="matlystCuisineDirectorySearch">
            <label htmlFor="matlyst-cuisine-filter">Filtrer kjøkken</label>
            <input
              id="matlyst-cuisine-filter"
              type="search"
              autoComplete="off"
              value={cuisineDirectoryQuery}
              placeholder="Søk etter verdensdel, region, kjøkken eller rett …"
              onChange={(event) => setCuisineDirectoryQuery(event.currentTarget.value)}
            />
          </div>

          <div className="matlystCuisineDirectoryMeta" aria-live="polite">
            <span>{filteredCuisines.length} kjøkken</span>
            <small>Du kan søke på Asia, Iberia, japansk, ramen, momo eller pierogi.</small>
          </div>

          {filteredCuisines.length > 0 ? (
            <div className="matlystCuisineDirectoryGrid">
              {filteredCuisines.map((cuisine) => {
                const firstArea = cuisine.areas[0];
                const preview = featured.get(cuisine.name) ?? null;
                const taxonomyPath = cuisineTaxonomyPath(cuisine.name);
                if (!firstArea) return null;

                return (
                  <button
                    type="button"
                    className="matlystCuisineDirectoryCard"
                    key={cuisine.name}
                    onClick={() => openCuisineFromDirectory(cuisine, firstArea)}
                  >
                    <span className="matlystCuisineDirectoryPath">
                      {taxonomyPath ? `${taxonomyPath.worldName} → ${taxonomyPath.regionName}` : "Matlyst"}
                    </span>
                    <span className="matlystCuisineDirectoryCardTopline">
                      <strong>{cuisine.name}</strong>
                      <span aria-hidden="true">→</span>
                    </span>
                    <small>{cuisine.context}</small>
                    <span className="matlystCuisineDirectoryCoverage">
                      {!browseData ? "Utforsk retter" : null}
                      {browseData && preview && preview.restaurantCount > 0
                        ? `${preview.dish.label} · minst ${preview.restaurantCount} ${preview.restaurantCount === 1 ? "sted" : "steder"} nå`
                        : null}
                      {browseData && (!preview || preview.restaurantCount === 0) ? "Ingen prioriterte ferske treff akkurat nå" : null}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="matlystCuisineDirectoryEmpty">Ingen aktive kjøkken eller representative retter matcher «{cuisineDirectoryQuery.trim()}».</p>
          )}

          <footer className="cuisineExploreDialogFooter">
            Katalogen viser bare aktive kjøkken. Hele verdensdel → region → kjøkken-taksonomien finnes i Matkulturer-utforskeren på forsiden.
          </footer>
        </div>
      </dialog>

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
