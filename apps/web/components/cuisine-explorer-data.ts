import { foodDishCatalog } from "../content/food-knowledge/catalog";
import { foodKnowledgeDishIdSet } from "../content/food-knowledge/manifest";

export type DishSuggestion = {
  readonly id: string;
  readonly label: string;
  readonly query: string;
  readonly hasKnowledge: boolean;
};

export type CuisineArea = {
  readonly name: string;
  readonly dishes: readonly DishSuggestion[];
};

export type Cuisine = {
  readonly name: string;
  readonly context: string;
  readonly areasLabel: string;
  readonly areas: readonly CuisineArea[];
};

type CuisineSpec = {
  readonly name: string;
  readonly context: string;
  readonly areasLabel: string;
  readonly regions: readonly string[];
};

const cuisineSpecs: readonly CuisineSpec[] = [
  {
    name: "Asiatisk",
    context: "Japan · Kina · Thailand · Vietnam",
    areasLabel: "Land og kjøkkentradisjoner",
    regions: ["Japan", "Kina", "Thailand", "Vietnam"],
  },
  {
    name: "Indisk",
    context: "Nord-India · Sør-India · Hyderabad",
    areasLabel: "Regioner og tradisjoner",
    regions: ["Nord-India", "Sør-India", "Hyderabad"],
  },
  {
    name: "Fast food",
    context: "Burger · fried chicken · hot dog",
    areasLabel: "Typer",
    regions: ["Burger", "Fried chicken", "Hot dog"],
  },
  {
    name: "Italiensk",
    context: "Roma · Napoli · Sicilia",
    areasLabel: "Regioner og bytradisjoner",
    regions: ["Roma", "Napoli", "Sicilia"],
  },
  {
    name: "Midtøsten",
    context: "Levanten · Egypt · Tyrkia",
    areasLabel: "Regioner og tradisjoner",
    regions: ["Levanten", "Egypt", "Tyrkia"],
  },
  {
    name: "Mexicansk",
    context: "Sentral-Mexico · Jalisco · Yucatán · Baja",
    areasLabel: "Regioner og tradisjoner",
    regions: ["Sentral-Mexico", "Jalisco", "Yucatán", "Baja"],
  },
];

function dishesForArea(cuisine: string, region: string): readonly DishSuggestion[] {
  return foodDishCatalog
    .filter((dish) => dish.cuisine === cuisine && dish.region === region)
    .sort((left, right) => right.explorerPriority - left.explorerPriority || left.name.localeCompare(right.name, "nb"))
    .slice(0, 8)
    .map((dish) => ({
      id: dish.id,
      label: dish.name,
      query: dish.query,
      hasKnowledge: foodKnowledgeDishIdSet.has(dish.id),
    }));
}

export const cuisines: readonly Cuisine[] = cuisineSpecs.map((spec) => ({
  name: spec.name,
  context: spec.context,
  areasLabel: spec.areasLabel,
  areas: spec.regions.map((region) => {
    const dishes = dishesForArea(spec.name, region);
    if (dishes.length === 0) throw new Error(`Cuisine explorer area has no canonical dishes: ${spec.name} / ${region}`);
    return { name: region, dishes };
  }),
}));
