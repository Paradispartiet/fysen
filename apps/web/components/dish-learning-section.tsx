"use client";

import { useEffect, useRef, useState } from "react";
import { dishSearchHref } from "../lib/public-path";
import { learningDishes, type DishLearningDetail } from "./dish-learning-data";

export function DishLearningSection() {
  const [selectedDish, setSelectedDish] = useState<DishLearningDetail | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedDish && dialog && !dialog.open) dialog.showModal();
  }, [selectedDish]);

  function openDish(dish: DishLearningDetail, trigger: HTMLButtonElement): void {
    triggerRef.current = trigger;
    setSelectedDish(dish);
  }

  function closeDish(): void {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setSelectedDish(null);
  }

  function restoreTriggerFocus(): void {
    setSelectedDish(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <section className="dishLearningSection" aria-labelledby="dish-learning-title">
      <div className="foodSectionHeading foodSectionHeadingLearning">
        <div>
          <p className="foodSectionEyebrow">Litt matkunnskap</p>
          <h2 id="dish-learning-title">Lær en ny rett</h2>
        </div>
        <p>Trykk på rettnavnet for å lære hva retten er og hvordan du kan lage den hjemme.</p>
      </div>

      <div className="dishLearningGrid">
        {learningDishes.map((dish) => (
          <article className="dishLearningCard" key={dish.name}>
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
            <a href={dishSearchHref(dish.query)}>Finn {dish.name.toLowerCase()} <span aria-hidden="true">→</span></a>
          </article>
        ))}
      </div>

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
                  <h3 id="dish-recipe-title">Slik lager du {selectedDish.name.toLowerCase()}</h3>
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
                <h3>Tips som gjør forskjell</h3>
                <ul className="dishKnowledgeList">
                  {selectedDish.tips.map((tip) => <li key={tip}>{tip}</li>)}
                </ul>
              </section>
            </div>

            <footer className="dishKnowledgeDialogFooter">
              <small>
                Generell matkunnskap og hjemmeoppskrift · ikke en påstand om ingrediensene hos en bestemt restaurant.
              </small>
              <a href={dishSearchHref(selectedDish.query)}>Finn {selectedDish.name.toLowerCase()} i Oslo <span aria-hidden="true">→</span></a>
            </footer>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
