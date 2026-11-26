"use client";

import { useMemo, useState } from "react";
import {
  findFoodDishByQuery,
  getFoodKnowledgeDish,
  type FoodKnowledgeDish,
} from "../content/food-knowledge";
import { DishKnowledgeDialog } from "./dish-knowledge-dialog";
import { DishEditorialImage, findDishImage } from "./dish-editorial-image";

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
    const image = findDishImage(canonical.id, query);
    const hasImage = Boolean(image);
    if (dish || hasImage) {
      return {
        name: canonical.name,
        origin: `${canonical.region} · ${canonical.cuisine}`,
        summary: dish?.summary ?? null,
        dish,
        imageDishId: image?.id ?? null,
      };
    }
  }

  const image = findDishImage(null, query);
  if (image) return { name: image.label, origin: "", summary: null, dish: null, imageDishId: image.id };
  const legacy = legacyKnowledge[normalize(query)];
  return legacy ? { ...legacy, dish: null, imageDishId: null } : null;
}

export function DishKnowledgeNote({ query }: { query: string }) {
  const knowledge = useMemo(() => findKnowledge(query), [query]);
  const [selectedDish, setSelectedDish] = useState<FoodKnowledgeDish | null>(null);

  if (!knowledge) return null;

  return (
    <>
      <aside
        className={knowledge.imageDishId ? "dishKnowledgeNote dishKnowledgeNoteWithImage" : "dishKnowledgeNote"}
        aria-label={`Om retten ${knowledge.name}`}
      >
        {knowledge.imageDishId ? <DishEditorialImage dishId={knowledge.imageDishId} priority /> : null}
        <div className="dishKnowledgeNoteContent">
          <div className="dishKnowledgeTopline">
            <span>{knowledge.dish ? "Fysen matleksikon" : "Om retten"}</span>
            {knowledge.origin ? <span>{knowledge.origin}</span> : null}
          </div>
          <h2>{knowledge.name}</h2>
          {knowledge.summary ? <p>{knowledge.summary}</p> : null}
          <div className="dishKnowledgeNoteBottomline">
            <small>{knowledge.imageDishId ? "Rettbilde og generell matkunnskap" : "Generell matkunnskap"} · ikke menybevis</small>
            {knowledge.dish ? (
              <button type="button" onClick={() => setSelectedDish(knowledge.dish)}>
                Lær om retten <span aria-hidden="true">↗</span>
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
