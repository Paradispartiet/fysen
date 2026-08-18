"use client";

import { useMemo, useState } from "react";
import {
  findFoodDishByQuery,
  getFoodKnowledgeDish,
  type FoodKnowledgeDish,
} from "../content/food-knowledge";
import { DishKnowledgeDialog } from "./dish-knowledge-dialog";

type DishKnowledge = {
  readonly name: string;
  readonly origin: string;
  readonly summary: string;
  readonly dish: FoodKnowledgeDish | null;
};

const legacyKnowledge: Readonly<Record<string, Omit<DishKnowledge, "dish">>> = {
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
    if (dish) {
      return {
        name: dish.name,
        origin: `${dish.region} · ${dish.cuisine}`,
        summary: dish.summary,
        dish,
      };
    }
  }

  const legacy = legacyKnowledge[normalize(query)];
  return legacy ? { ...legacy, dish: null } : null;
}

export function DishKnowledgeNote({ query }: { query: string }) {
  const knowledge = useMemo(() => findKnowledge(query), [query]);
  const [selectedDish, setSelectedDish] = useState<FoodKnowledgeDish | null>(null);

  if (!knowledge) return null;

  return (
    <>
      <aside className="dishKnowledgeNote" aria-label={`Om retten ${knowledge.name}`}>
        <div className="dishKnowledgeTopline">
          <span>Om retten</span>
          <span>{knowledge.origin}</span>
        </div>
        <h2>{knowledge.name}</h2>
        <p>{knowledge.summary}</p>
        <div className="dishKnowledgeNoteBottomline">
          <small>Generell matkunnskap · ikke menybevis</small>
          {knowledge.dish ? (
            <button type="button" onClick={() => setSelectedDish(knowledge.dish)}>
              Lær om retten <span aria-hidden="true">↗</span>
            </button>
          ) : null}
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
