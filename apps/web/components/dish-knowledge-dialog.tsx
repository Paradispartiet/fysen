"use client";

import { usePreviewLocale } from "./language-preview";
import { knowledgeText, type KnowledgeKey } from "../lib/knowledge-messages";
import { dishDisplayName } from "../lib/dish-display-names";
import { localizedSummary } from "../lib/dish-summary-translations";

import type { DishSearchResult } from "@fysen/contracts";
import { useEffect, useRef, useState } from "react";
import {
  getFoodKnowledgeDish,
  getRelatedFoodDishes,
  type FoodKnowledgeDish,
} from "../content/food-knowledge";
import { searchDishesClient } from "../lib/client-dish-search";
import { formatDishPrice } from "../lib/dish-price";
import { dishSearchHref } from "../lib/public-path";
import { FoodIllustration } from "./food-illustration";
import { illustrationForDishName, illustrationForIngredient } from "./food-illustration-match";

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
  const locale = usePreviewLocale();
  const t = (key: KnowledgeKey, values?: Record<string, string | number>) => knowledgeText(locale, key, values);
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
        if (!controller.signal.aborted) setRestaurantError("Kunne ikke hente restaurantene akkurat nå.");
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
            aria-label={t("close", { name: dishDisplayName(dish.id, dish.name, locale) })}
            onClick={close}
          >
            <span aria-hidden="true">×</span>
          </button>

          <header className="dishKnowledgeDialogHeader">
            <p className="dishKnowledgeDialogEyebrow">{t("lexicon")} · {dish.region}</p>
            <div className="dishKnowledgeTitleWithArtwork">
              <h2 id="dish-knowledge-title">{dishDisplayName(dish.id, dish.name, locale)}</h2>
              {illustrationForDishName(dish.name) ? (
                <FoodIllustration
                  name={illustrationForDishName(dish.name)!}
                  className="dishKnowledgeTitleArtwork"
                  size={68}
                />
              ) : null}
            </div>
            <p id="dish-knowledge-summary" lang={localizedSummary(dish.id, dish.summary, locale).lang}>{localizedSummary(dish.id, dish.summary, locale).text}</p>
            {locale !== "nb" ? <small lang={locale}>{t("originalText")}</small> : null}
            <div className="dishKnowledgeRecipeMeta" aria-label={t("recipeInfo")}>
              <span>{dish.recipe.yield}</span>
              <span>{dish.recipe.time}</span>
            </div>
          </header>

          <div className="dishKnowledgeIntroGrid">
            <section>
              <h3>{t("what", { name: dishDisplayName(dish.id, dish.name, locale) })}</h3>
              <p>{dish.overview}</p>
            </section>
            <section>
              <h3>{t("history")}</h3>
              <p>{dish.history}</p>
            </section>
          </div>

          <div className="dishKnowledgeFocusGrid">
            <section>
              <p className="dishKnowledgeMiniEyebrow">Når du spiser den</p>
              <h3>{t("taste")}</h3>
              <p>{dish.flavor}</p>
            </section>
            <section>
              <p className="dishKnowledgeMiniEyebrow">Det som gjør forskjell</p>
              <h3>{t("technique")}</h3>
              <p>{dish.technique}</p>
            </section>
          </div>

          <section className="dishKnowledgeSection">
            <h3>{t("contents")}</h3>
            <ul className="dishKnowledgeList">
              {dish.essentials.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section className="dishKnowledgeRecipe" aria-labelledby="dish-recipe-title">
            <div className="dishKnowledgeRecipeHeading">
              <div>
                <p>{t("makeHome")}</p>
                <h3 id="dish-recipe-title">{t("recipe", { name: dishDisplayName(dish.id, dish.name, locale).toLocaleLowerCase(locale) })}</h3>
              </div>
              <span>{dish.recipe.label}</span>
            </div>

            <div className="dishKnowledgeRecipeGrid">
              <div>
                <h4>{t("ingredients")}</h4>
                <ul className="dishKnowledgeList">
                  {dish.recipe.ingredients.map((ingredient) => {
                    const illustration = illustrationForIngredient(ingredient);
                    return (
                      <li
                        key={ingredient}
                        className={illustration ? "dishKnowledgeIngredientWithArt" : undefined}
                      >
                        {illustration ? (
                          <FoodIllustration name={illustration} className="dishKnowledgeIngredientArtwork" size={28} />
                        ) : null}
                        <span>{ingredient}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h4>{t("steps")}</h4>
                <ol className="dishKnowledgeSteps">
                  {dish.recipe.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </div>
            </div>
          </section>

          <div className="dishKnowledgeBottomGrid">
            <section>
              <h3>{t("variants")}</h3>
              <ul className="dishKnowledgeList">
                {dish.variants.map((variant) => <li key={variant}>{variant}</li>)}
              </ul>
            </section>
            <section>
              <h3>{t("serving")}</h3>
              <ul className="dishKnowledgeList">
                {dish.serving.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          </div>

          <div className="dishKnowledgeBottomGrid">
            <section>
              <h3>{t("mistakes")}</h3>
              <ul className="dishKnowledgeList dishKnowledgeMistakes">
                {dish.commonMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
              </ul>
            </section>
            <section>
              <h3>{t("related")}</h3>
              <div className="dishKnowledgeRelated">
                {relatedDishes.map((relatedDish) => {
                  const relatedKnowledge = getFoodKnowledgeDish(relatedDish.id);
                  return relatedKnowledge ? (
                    <button type="button" key={relatedDish.id} onClick={() => onOpenDish(relatedKnowledge)}>
                      {dishDisplayName(relatedDish.id, relatedDish.name, locale)}
                    </button>
                  ) : (
                    <a href={dishSearchHref(relatedDish.query)} key={relatedDish.id}>{dishDisplayName(relatedDish.id, relatedDish.name, locale)}</a>
                  );
                })}
              </div>
            </section>
          </div>

          <section className="dishKnowledgeRestaurants" aria-labelledby="dish-knowledge-restaurants-title">
            <div className="dishKnowledgeRestaurantsHeading">
              <div>
                <p className="dishKnowledgeMiniEyebrow">{t("restaurants")}</p>
                <h3 id="dish-knowledge-restaurants-title">{t("where", { name: dishDisplayName(dish.id, dish.name, locale).toLocaleLowerCase(locale) })}</h3>
              </div>
              <a href={dishSearchHref(dish.query)}>{t("allMatches")} <span aria-hidden="true">→</span></a>
            </div>

            {restaurantLoading ? <p className="dishKnowledgeRestaurantStatus">{t("loading")}</p> : null}
            {!restaurantLoading && restaurantError ? <p className="dishKnowledgeRestaurantStatus">{t("error")}</p> : null}
            {!restaurantLoading && !restaurantError && restaurantResults.length === 0 ? (
              <p className="dishKnowledgeRestaurantStatus">{t("noMatches")}</p>
            ) : null}
            {!restaurantLoading && !restaurantError && restaurantResults.length > 0 ? (
              <div className="dishKnowledgeRestaurantGrid">
                {restaurantResults.map((result) => (
                  <a href={dishSearchHref(dish.query)} key={result.restaurant.id}>
                    <strong>{result.restaurant.name}</strong>
                    <span>{result.dish.name}</span>
                    <small>
                      {result.dish.priceMinor !== null ? `${formatDishPrice(result.dish)} · ` : ""}
                      {result.restaurant.address}
                    </small>
                  </a>
                ))}
              </div>
            ) : null}
            <small className="dishKnowledgeRestaurantProof">Pris vises bare når den er oppgitt i restaurantens menykilde.</small>
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
