"use client";

import type { DishSearchResult } from "@fysen/contracts";
import { useEffect, useRef, useState } from "react";
import {
  getFoodKnowledgeDish,
  getRelatedFoodDishes,
  type FoodKnowledgeDish,
} from "../content/food-knowledge";
import { searchDishesClient } from "../lib/client-dish-search";
import { dishSearchHref } from "../lib/public-path";

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

export function DishKnowledgeDialog({
  dish,
  onClosed,
  onOpenDish,
}: {
  dish: FoodKnowledgeDish | null;
  onClosed: () => void;
  onOpenDish: (dish: FoodKnowledgeDish) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [restaurantResults, setRestaurantResults] = useState<readonly DishSearchResult[]>([]);
  const [restaurantLoading, setRestaurantLoading] = useState(false);
  const [restaurantError, setRestaurantError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dish && dialog && !dialog.open) dialog.showModal();
    if (dish && dialog?.open) {
      dialog.querySelector<HTMLElement>(".dishKnowledgeDialogShell")?.scrollTo({ top: 0 });
    }
  }, [dish]);

  useEffect(() => {
    setRestaurantResults([]);
    setRestaurantError(null);
    if (!dish) {
      setRestaurantLoading(false);
      return;
    }

    const controller = new AbortController();
    setRestaurantLoading(true);
    void searchDishesClient(dish.query, { limit: 10, signal: controller.signal })
      .then((response) => {
        if (!controller.signal.aborted) {
          setRestaurantResults(primaryRestaurantResults(response.results, 4));
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setRestaurantError("Kunne ikke hente ferske restauranttreff akkurat nå.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setRestaurantLoading(false);
      });

    return () => controller.abort();
  }, [dish]);

  function close(): void {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  }

  const relatedDishes = dish ? getRelatedFoodDishes(dish) : [];

  return (
    <dialog
      ref={dialogRef}
      className="dishKnowledgeDialog"
      aria-labelledby={dish ? "dish-knowledge-title" : undefined}
      aria-describedby={dish ? "dish-knowledge-summary" : undefined}
      onClose={onClosed}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      {dish ? (
        <div className="dishKnowledgeDialogShell">
          <button
            type="button"
            className="dishKnowledgeDialogClose"
            aria-label={`Lukk kunnskap om ${dish.name}`}
            onClick={close}
          >
            <span aria-hidden="true">×</span>
          </button>

          <header className="dishKnowledgeDialogHeader">
            <p className="dishKnowledgeDialogEyebrow">Fysen matleksikon · {dish.region}</p>
            <h2 id="dish-knowledge-title">{dish.name}</h2>
            <p id="dish-knowledge-summary">{dish.summary}</p>
            <div className="dishKnowledgeRecipeMeta" aria-label="Oppskriftsinformasjon">
              <span>{dish.recipe.yield}</span>
              <span>{dish.recipe.time}</span>
            </div>
          </header>

          <div className="dishKnowledgeIntroGrid">
            <section>
              <h3>Hva er {dish.name}?</h3>
              <p>{dish.overview}</p>
            </section>
            <section>
              <h3>Bakgrunn og matkultur</h3>
              <p>{dish.history}</p>
            </section>
          </div>

          <div className="dishKnowledgeFocusGrid">
            <section>
              <p className="dishKnowledgeMiniEyebrow">Når du spiser den</p>
              <h3>Smak og tekstur</h3>
              <p>{dish.flavor}</p>
            </section>
            <section>
              <p className="dishKnowledgeMiniEyebrow">Det som gjør forskjell</p>
              <h3>Teknikken</h3>
              <p>{dish.technique}</p>
            </section>
          </div>

          <section className="dishKnowledgeSection">
            <h3>Hva består retten av?</h3>
            <ul className="dishKnowledgeList">
              {dish.essentials.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section className="dishKnowledgeRecipe" aria-labelledby="dish-recipe-title">
            <div className="dishKnowledgeRecipeHeading">
              <div>
                <p>Lag den hjemme</p>
                <h3 id="dish-recipe-title">Slik lager du {dish.name.toLocaleLowerCase("nb-NO")}</h3>
              </div>
              <span>{dish.recipe.label}</span>
            </div>

            <div className="dishKnowledgeRecipeGrid">
              <div>
                <h4>Ingredienser</h4>
                <ul className="dishKnowledgeList">
                  {dish.recipe.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
                </ul>
              </div>
              <div>
                <h4>Fremgangsmåte</h4>
                <ol className="dishKnowledgeSteps">
                  {dish.recipe.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </div>
            </div>
          </section>

          <div className="dishKnowledgeBottomGrid">
            <section>
              <h3>Vanlige varianter</h3>
              <ul className="dishKnowledgeList">
                {dish.variants.map((variant) => <li key={variant}>{variant}</li>)}
              </ul>
            </section>
            <section>
              <h3>Slik serveres den</h3>
              <ul className="dishKnowledgeList">
                {dish.serving.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          </div>

          <div className="dishKnowledgeBottomGrid">
            <section>
              <h3>Vanlige feil</h3>
              <ul className="dishKnowledgeList dishKnowledgeMistakes">
                {dish.commonMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
              </ul>
            </section>
            <section>
              <h3>Hvis du liker denne, prøv også</h3>
              <div className="dishKnowledgeRelated">
                {relatedDishes.map((relatedDish) => {
                  const relatedKnowledge = getFoodKnowledgeDish(relatedDish.id);
                  return relatedKnowledge ? (
                    <button type="button" key={relatedDish.id} onClick={() => onOpenDish(relatedKnowledge)}>
                      {relatedDish.name}
                    </button>
                  ) : (
                    <a href={dishSearchHref(relatedDish.query)} key={relatedDish.id}>{relatedDish.name}</a>
                  );
                })}
              </div>
            </section>
          </div>

          <section className="dishKnowledgeRestaurants" aria-labelledby="dish-knowledge-restaurants-title">
            <div className="dishKnowledgeRestaurantsHeading">
              <div>
                <p className="dishKnowledgeMiniEyebrow">Ferske menytreff</p>
                <h3 id="dish-knowledge-restaurants-title">Hvor får du {dish.name.toLocaleLowerCase("nb-NO")} i Oslo?</h3>
              </div>
              <a href={dishSearchHref(dish.query)}>Se alle treff <span aria-hidden="true">→</span></a>
            </div>

            {restaurantLoading ? <p className="dishKnowledgeRestaurantStatus">Henter restauranter …</p> : null}
            {!restaurantLoading && restaurantError ? <p className="dishKnowledgeRestaurantStatus">{restaurantError}</p> : null}
            {!restaurantLoading && !restaurantError && restaurantResults.length === 0 ? (
              <p className="dishKnowledgeRestaurantStatus">Ingen ferske, sikre menytreff på denne retten i Oslo akkurat nå.</p>
            ) : null}
            {!restaurantLoading && !restaurantError && restaurantResults.length > 0 ? (
              <div className="dishKnowledgeRestaurantGrid">
                {restaurantResults.map((result) => (
                  <a href={dishSearchHref(dish.query)} key={result.restaurant.id}>
                    <strong>{result.restaurant.name}</strong>
                    <span>{result.dish.name}</span>
                    <small>{result.restaurant.address}</small>
                  </a>
                ))}
              </div>
            ) : null}
            <small className="dishKnowledgeRestaurantProof">Vises bare fra ferske, ikke-fuzzy Fysen-menytreff.</small>
          </section>

          {dish.sources.length > 0 ? (
            <section className="dishKnowledgeSources" aria-labelledby="dish-knowledge-sources-title">
              <h3 id="dish-knowledge-sources-title">Kilder til matkunnskap</h3>
              <ul>
                {dish.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <footer className="dishKnowledgeDialogFooter">
            <small>
              Generell matkunnskap og hjemmeoppskrift · ikke en påstand om ingrediensene hos en bestemt restaurant.
            </small>
            <a href={dishSearchHref(dish.query)}>Finn {dish.name.toLocaleLowerCase("nb-NO")} i Oslo <span aria-hidden="true">→</span></a>
          </footer>
        </div>
      ) : null}
    </dialog>
  );
}
