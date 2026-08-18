"use client";

import { useEffect, useRef, useState } from "react";
import { getFoodKnowledgeDish, getRelatedFoodDishes } from "../content/food-knowledge";
import { dishSearchHref } from "../lib/public-path";
import {
  featuredLearningDishCount,
  learningDishes,
  type DishLearningDetail,
} from "./dish-learning-data";

const learnHashPrefix = "#learn-";

function learningHash(dishId: string): string {
  return `${learnHashPrefix}${encodeURIComponent(dishId)}`;
}

export function DishLearningSection() {
  const [selectedDish, setSelectedDish] = useState<DishLearningDetail | null>(null);
  const [showAll, setShowAll] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function openFromHash(): void {
      if (!window.location.hash.startsWith(learnHashPrefix)) return;
      const dishId = decodeURIComponent(window.location.hash.slice(learnHashPrefix.length));
      const dish = getFoodKnowledgeDish(dishId);
      if (!dish) return;
      triggerRef.current = null;
      setSelectedDish(dish);
    }

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedDish && dialog && !dialog.open) dialog.showModal();
    if (selectedDish && dialog?.open) {
      dialog.querySelector<HTMLElement>(".dishKnowledgeDialogShell")?.scrollTo({ top: 0 });
    }
  }, [selectedDish]);

  function setHash(dishId: string): void {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${learningHash(dishId)}`);
  }

  function clearHash(): void {
    if (!window.location.hash.startsWith(learnHashPrefix)) return;
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }

  function openDish(dish: DishLearningDetail, trigger: HTMLButtonElement): void {
    triggerRef.current = trigger;
    setHash(dish.id);
    setSelectedDish(dish);
  }

  function openRelatedDish(dish: DishLearningDetail): void {
    triggerRef.current = null;
    setHash(dish.id);
    setSelectedDish(dish);
  }

  function closeDish(): void {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  }

  function restoreTriggerFocus(): void {
    clearHash();
    setSelectedDish(null);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger) window.requestAnimationFrame(() => trigger.focus());
  }

  const visibleDishes = showAll ? learningDishes : learningDishes.slice(0, featuredLearningDishCount);
  const relatedDishes = selectedDish ? getRelatedFoodDishes(selectedDish) : [];

  return (
    <section className="dishLearningSection" aria-labelledby="dish-learning-title">
      <div className="foodSectionHeading foodSectionHeadingLearning">
        <div>
          <p className="foodSectionEyebrow">Fysen matleksikon</p>
          <h2 id="dish-learning-title">Lær en ny rett</h2>
        </div>
        <p>Forstå retten, smakene og teknikken, lær å lage den hjemme — og finn hvem som faktisk har den på menyen.</p>
      </div>

      <div className={`dishLearningGrid${showAll ? " dishLearningGridExpanded" : ""}`}>
        {visibleDishes.map((dish) => (
          <article className="dishLearningCard" id={`learn-card-${dish.id}`} key={dish.id}>
            <span className="dishLearningRegion">{dish.region}</span>
            <h3>
              <button
                type="button"
                className="dishLearningTitleButton"
                aria-haspopup="dialog"
                onClick={(event) => openDish(dish, event.currentTarget)}
              >
                <span>{dish.name}</span>
                <span className="dishLearningOpenHint">Lær om retten <span aria-hidden="true">↗</span></span>
              </button>
            </h3>
            <p>{dish.summary}</p>
            <a href={dishSearchHref(dish.query)}>Finn {dish.name.toLocaleLowerCase("nb-NO")} <span aria-hidden="true">→</span></a>
          </article>
        ))}
      </div>

      {learningDishes.length > featuredLearningDishCount ? (
        <div className="dishLearningMoreWrap">
          <button type="button" className="dishLearningMore" onClick={() => setShowAll((value) => !value)}>
            {showAll ? "Vis færre retter" : `Vis alle ${learningDishes.length} retter`}
            <span aria-hidden="true">{showAll ? " ↑" : " ↓"}</span>
          </button>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        className="dishKnowledgeDialog"
        aria-labelledby={selectedDish ? "dish-knowledge-title" : undefined}
        aria-describedby={selectedDish ? "dish-knowledge-summary" : undefined}
        onClose={restoreTriggerFocus}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDish();
        }}
      >
        {selectedDish ? (
          <div className="dishKnowledgeDialogShell">
            <button
              type="button"
              className="dishKnowledgeDialogClose"
              aria-label={`Lukk kunnskap om ${selectedDish.name}`}
              onClick={closeDish}
            >
              <span aria-hidden="true">×</span>
            </button>

            <header className="dishKnowledgeDialogHeader">
              <p className="dishKnowledgeDialogEyebrow">Fysen matleksikon · {selectedDish.region}</p>
              <h2 id="dish-knowledge-title">{selectedDish.name}</h2>
              <p id="dish-knowledge-summary">{selectedDish.summary}</p>
              <div className="dishKnowledgeRecipeMeta" aria-label="Oppskriftsinformasjon">
                <span>{selectedDish.recipe.yield}</span>
                <span>{selectedDish.recipe.time}</span>
              </div>
            </header>

            <div className="dishKnowledgeIntroGrid">
              <section>
                <h3>Hva er {selectedDish.name}?</h3>
                <p>{selectedDish.overview}</p>
              </section>
              <section>
                <h3>Bakgrunn og matkultur</h3>
                <p>{selectedDish.history}</p>
              </section>
            </div>

            <div className="dishKnowledgeFocusGrid">
              <section>
                <p className="dishKnowledgeMiniEyebrow">Når du spiser den</p>
                <h3>Smak og tekstur</h3>
                <p>{selectedDish.flavor}</p>
              </section>
              <section>
                <p className="dishKnowledgeMiniEyebrow">Det som gjør forskjell</p>
                <h3>Teknikken</h3>
                <p>{selectedDish.technique}</p>
              </section>
            </div>

            <section className="dishKnowledgeSection">
              <h3>Hva består retten av?</h3>
              <ul className="dishKnowledgeList">
                {selectedDish.essentials.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section className="dishKnowledgeRecipe" aria-labelledby="dish-recipe-title">
              <div className="dishKnowledgeRecipeHeading">
                <div>
                  <p>Lag den hjemme</p>
                  <h3 id="dish-recipe-title">Slik lager du {selectedDish.name.toLocaleLowerCase("nb-NO")}</h3>
                </div>
                <span>{selectedDish.recipe.label}</span>
              </div>

              <div className="dishKnowledgeRecipeGrid">
                <div>
                  <h4>Ingredienser</h4>
                  <ul className="dishKnowledgeList">
                    {selectedDish.recipe.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
                  </ul>
                </div>
                <div>
                  <h4>Fremgangsmåte</h4>
                  <ol className="dishKnowledgeSteps">
                    {selectedDish.recipe.steps.map((step) => <li key={step}>{step}</li>)}
                  </ol>
                </div>
              </div>
            </section>

            <div className="dishKnowledgeBottomGrid">
              <section>
                <h3>Vanlige varianter</h3>
                <ul className="dishKnowledgeList">
                  {selectedDish.variants.map((variant) => <li key={variant}>{variant}</li>)}
                </ul>
              </section>
              <section>
                <h3>Slik serveres den</h3>
                <ul className="dishKnowledgeList">
                  {selectedDish.serving.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            </div>

            <div className="dishKnowledgeBottomGrid">
              <section>
                <h3>Vanlige feil</h3>
                <ul className="dishKnowledgeList dishKnowledgeMistakes">
                  {selectedDish.commonMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
                </ul>
              </section>
              <section>
                <h3>Hvis du liker denne, prøv også</h3>
                <div className="dishKnowledgeRelated">
                  {relatedDishes.map((dish) => {
                    const relatedKnowledge = getFoodKnowledgeDish(dish.id);
                    return relatedKnowledge ? (
                      <button type="button" key={dish.id} onClick={() => openRelatedDish(relatedKnowledge)}>
                        {dish.name}
                      </button>
                    ) : (
                      <a href={dishSearchHref(dish.query)} key={dish.id}>{dish.name}</a>
                    );
                  })}
                </div>
              </section>
            </div>

            <section className="dishKnowledgeSources" aria-labelledby="dish-knowledge-sources-title">
              <h3 id="dish-knowledge-sources-title">Kilder til matkunnskap</h3>
              <ul>
                {selectedDish.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a>
                  </li>
                ))}
              </ul>
            </section>

            <footer className="dishKnowledgeDialogFooter">
              <small>
                Generell matkunnskap og hjemmeoppskrift · ikke en påstand om ingrediensene hos en bestemt restaurant.
              </small>
              <a href={dishSearchHref(selectedDish.query)}>Finn {selectedDish.name.toLocaleLowerCase("nb-NO")} i Oslo <span aria-hidden="true">→</span></a>
            </footer>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
