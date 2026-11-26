"use client";

import { usePreviewLocale } from "./language-preview";
import { knowledgeText, type KnowledgeKey } from "../lib/knowledge-messages";
import { localizedSummary } from "../lib/dish-summary-translations";
import { resultText } from "../lib/result-messages";

import { useMemo, useState } from "react";
import {
  findFoodDishByQuery,
  getFoodKnowledgeDish,
  type FoodKnowledgeDish,
} from "../content/food-knowledge";
import { DishKnowledgeDialog } from "./dish-knowledge-dialog";
import { DishPhotoThumbnail, hasDishPhotoThumbnail } from "./dish-photo-gallery";

type DishKnowledge = {
  readonly name: string;
  readonly origin: string;
  readonly summary: string | null;
  readonly dish: FoodKnowledgeDish | null;
  readonly imageDishId: string | null;
};

const legacyKnowledge: Readonly<Record<string, Omit<DishKnowledge, "dish" | "imageDishId">>> = {
  tartar: {
    name: "Tartar",
    origin: "Europeisk restauranttradisjon",
    summary: "Tartar serveres vanligvis rå og finhakket. Navnet brukes også om varianter med fisk eller andre råvarer.",
  },
  "biff tartar": {
    name: "Tartar",
    origin: "Europeisk restauranttradisjon",
    summary: "Tartar serveres vanligvis rå og finhakket. Navnet brukes også om varianter med fisk eller andre råvarer.",
  },
  "beef tartare": {
    name: "Tartar",
    origin: "Europeisk restauranttradisjon",
    summary: "Tartar serveres vanligvis rå og finhakket. Navnet brukes også om varianter med fisk eller andre råvarer.",
  },
};

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase("nb-NO").replace(/\s+/g, " ");
}

function findKnowledge(query: string): DishKnowledge | null {
  const canonical = findFoodDishByQuery(query);
  if (canonical) {
    const dish = getFoodKnowledgeDish(canonical.id);
    const hasImage = hasDishPhotoThumbnail(canonical.id);
    if (dish || hasImage) {
      return {
        name: canonical.name,
        origin: `${canonical.region} · ${canonical.cuisine}`,
        summary: dish?.summary ?? null,
        dish,
        imageDishId: hasImage ? canonical.id : null,
      };
    }
  }

  const legacy = legacyKnowledge[normalize(query)];
  return legacy ? { ...legacy, dish: null, imageDishId: null } : null;
}

export function DishKnowledgeNote({ query }: { query: string }) {
  const locale = usePreviewLocale();
  const t = (key: KnowledgeKey, values?: Record<string, string | number>) => knowledgeText(locale, key, values);
  const knowledge = useMemo(() => findKnowledge(query), [query]);
  const [selectedDish, setSelectedDish] = useState<FoodKnowledgeDish | null>(null);

  if (!knowledge) return null;

  return (
    <>
      <aside
        className={knowledge.imageDishId ? "dishKnowledgeNote dishKnowledgeNoteWithImage" : "dishKnowledgeNote"}
        aria-label={`${t("aboutDish")} · ${knowledge.name}`}
      >
        {knowledge.imageDishId ? <DishPhotoThumbnail dishId={knowledge.imageDishId} label={knowledge.name} /> : null}
        <div className="dishKnowledgeNoteContent">
          <div className="dishKnowledgeTopline">
            <span>{knowledge.dish ? t("lexicon") : t("aboutDish")}</span>
            <span>{knowledge.origin}</span>
          </div>
          <h2>{knowledge.name}</h2>
          {knowledge.summary ? <p lang={localizedSummary(knowledge.dish?.id ?? "", knowledge.summary, locale).lang}>{localizedSummary(knowledge.dish?.id ?? "", knowledge.summary, locale).text}</p> : null}
          <div className="dishKnowledgeNoteBottomline">
            <small>{knowledge.imageDishId ? t("picture") : t("general")} · {t("notEvidence")}</small>
            {knowledge.dish ? (
              <button type="button" onClick={() => setSelectedDish(knowledge.dish)}>
                {resultText(locale, "learnDish")} <span aria-hidden="true">↗</span>
              </button>
            ) : null}
          </div>
        </div>
      </aside>

      <DishKnowledgeDialog
        dish={selectedDish}
        onClosed={() => setSelectedDish(null)}
        onOpenDish={setSelectedDish}
      />
    </>
  );
}
