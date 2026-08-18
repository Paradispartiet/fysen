"use client";

import { useEffect, useRef, useState } from "react";
import { getFoodKnowledgeDish, type FoodKnowledgeDish } from "../content/food-knowledge";
import { dishSearchHref } from "../lib/public-path";
import { DishKnowledgeDialog } from "./dish-knowledge-dialog";
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

  function openRelatedDish(dish: FoodKnowledgeDish): void {
    triggerRef.current = null;
    setHash(dish.id);
    setSelectedDish(dish);
  }

  function restoreTriggerFocus(): void {
    clearHash();
    setSelectedDish(null);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger) window.requestAnimationFrame(() => trigger.focus());
  }

  const visibleDishes = showAll ? learningDishes : learningDishes.slice(0, featuredLearningDishCount);

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

      <DishKnowledgeDialog
        dish={selectedDish}
        onClosed={restoreTriggerFocus}
        onOpenDish={openRelatedDish}
      />
    </section>
  );
}
