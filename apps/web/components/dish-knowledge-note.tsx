import { findFoodDishByQuery, getFoodKnowledgeDish } from "../content/food-knowledge";

type DishKnowledge = {
  readonly name: string;
  readonly origin: string;
  readonly summary: string;
};

const legacyKnowledge: Readonly<Record<string, DishKnowledge>> = {
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
    const knowledge = getFoodKnowledgeDish(canonical.id);
    if (knowledge) {
      return {
        name: knowledge.name,
        origin: `${knowledge.region} · ${knowledge.cuisine}`,
        summary: knowledge.summary,
      };
    }
  }

  return legacyKnowledge[normalize(query)] ?? null;
}

export function DishKnowledgeNote({ query }: { query: string }) {
  const knowledge = findKnowledge(query);
  if (!knowledge) return null;

  return (
    <aside className="dishKnowledgeNote" aria-label={`Om retten ${knowledge.name}`}>
      <div className="dishKnowledgeTopline">
        <span>Om retten</span>
        <span>{knowledge.origin}</span>
      </div>
      <h2>{knowledge.name}</h2>
      <p>{knowledge.summary}</p>
      <small>Generell matkunnskap · ikke menybevis</small>
    </aside>
  );
}
