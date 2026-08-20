import { foodDishCatalog } from "../content/food-knowledge/catalog";
import { foodKnowledgeDishIdSet } from "../content/food-knowledge/manifest";

export type DishSuggestion = {
  readonly id: string;
  readonly label: string;
  readonly query: string;
  readonly aliases: readonly string[];
  readonly hasKnowledge: boolean;
  readonly explorerPriority: number;
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

export type FoodMood = {
  readonly name: string;
  readonly context: string;
  readonly query: string;
  readonly dishes: readonly DishSuggestion[];
};

type CuisineSpec = {
  readonly name: string;
  readonly context: string;
  readonly areasLabel: string;
  readonly sourceCuisine: string;
  readonly regions: readonly string[];
};

type FoodMoodSpec = {
  readonly name: string;
  readonly context: string;
  readonly query: string;
  readonly dishIds: readonly string[];
};

const cuisineSpecs: readonly CuisineSpec[] = [
  {
    name: "Japansk",
    context: "Ramen · sushi · gyoza · katsu",
    areasLabel: "Tradisjon",
    sourceCuisine: "Asiatisk",
    regions: ["Japan"],
  },
  {
    name: "Kinesisk",
    context: "Bao · dumplings · mapo tofu · nudler",
    areasLabel: "Tradisjon",
    sourceCuisine: "Asiatisk",
    regions: ["Kina"],
  },
  {
    name: "Thai",
    context: "Pad thai · curry · tom yum",
    areasLabel: "Tradisjon",
    sourceCuisine: "Asiatisk",
    regions: ["Thailand"],
  },
  {
    name: "Vietnamesisk",
    context: "Phở · bánh mì · vårruller",
    areasLabel: "Tradisjon",
    sourceCuisine: "Asiatisk",
    regions: ["Vietnam"],
  },
  {
    name: "Indisk",
    context: "Nord-India · Sør-India · Hyderabad",
    areasLabel: "Regioner og tradisjoner",
    sourceCuisine: "Indisk",
    regions: ["Nord-India", "Sør-India", "Hyderabad"],
  },
  {
    name: "Italiensk",
    context: "Roma · Napoli · Sicilia",
    areasLabel: "Regioner og bytradisjoner",
    sourceCuisine: "Italiensk",
    regions: ["Roma", "Napoli", "Sicilia"],
  },
  {
    name: "Midtøsten",
    context: "Levanten · Egypt",
    areasLabel: "Regioner og tradisjoner",
    sourceCuisine: "Midtøsten",
    regions: ["Levanten", "Egypt"],
  },
  {
    name: "Tyrkisk",
    context: "Döner · pide · lahmacun · mantı",
    areasLabel: "Tradisjon",
    sourceCuisine: "Midtøsten",
    regions: ["Tyrkia"],
  },
  {
    name: "Mexicansk",
    context: "Sentral-Mexico · Jalisco · Yucatán · Baja",
    areasLabel: "Regioner og tradisjoner",
    sourceCuisine: "Mexicansk",
    regions: ["Sentral-Mexico", "Jalisco", "Yucatán", "Baja"],
  },
];

const foodMoodSpecs: readonly FoodMoodSpec[] = [
  {
    name: "Pizza",
    context: "Margherita · marinara · napolitansk",
    query: "pizza",
    dishIds: ["pizza-margherita", "pizza-marinara"],
  },
  {
    name: "Burger",
    context: "Cheeseburger · smashburger · kylling",
    query: "burger",
    dishIds: ["cheeseburger", "smashburger", "chicken-burger", "veggie-burger"],
  },
  {
    name: "Nudler",
    context: "Ramen · udon · pad thai · phở",
    query: "nudler",
    dishIds: ["ramen", "udon", "dan-dan-noodles", "pad-thai", "pho"],
  },
  {
    name: "Curry",
    context: "Butter chicken · grønn curry · masala",
    query: "curry",
    dishIds: ["butter-chicken", "green-curry", "chana-masala", "mirchi-ka-salan"],
  },
  {
    name: "Dumplings",
    context: "Gyoza · jiaozi · mantı",
    query: "dumplings",
    dishIds: ["gyoza", "dumplings", "manti"],
  },
  {
    name: "Tacos",
    context: "Al pastor · fisk · reker",
    query: "taco",
    dishIds: ["tacos-al-pastor", "fish-taco", "shrimp-taco"],
  },
  {
    name: "Fried chicken",
    context: "Fritert kylling · wings · tenders",
    query: "fried chicken",
    dishIds: ["fried-chicken", "chicken-wings", "chicken-tenders", "hot-chicken"],
  },
  {
    name: "Vegetar",
    context: "Falafel · dosa · chana masala · vegetarburger",
    query: "vegetar",
    dishIds: ["falafel", "dosa", "chana-masala", "veggie-burger", "hummus"],
  },
];

function toDishSuggestion(dish: (typeof foodDishCatalog)[number]): DishSuggestion {
  return {
    id: dish.id,
    label: dish.name,
    query: dish.query,
    aliases: dish.aliases,
    hasKnowledge: foodKnowledgeDishIdSet.has(dish.id),
    explorerPriority: dish.explorerPriority,
  };
}

function dishesForArea(sourceCuisine: string, region: string): readonly DishSuggestion[] {
  return foodDishCatalog
    .filter((dish) => dish.cuisine === sourceCuisine && dish.region === region)
    .sort((left, right) => right.explorerPriority - left.explorerPriority || left.name.localeCompare(right.name, "nb"))
    .slice(0, 8)
    .map(toDishSuggestion);
}

function dishesForIds(ids: readonly string[]): readonly DishSuggestion[] {
  return ids.map((id) => {
    const dish = foodDishCatalog.find((candidate) => candidate.id === id);
    if (!dish) throw new Error(`Matlyst mood references unknown canonical dish: ${id}`);
    return toDishSuggestion(dish);
  });
}

export const cuisines: readonly Cuisine[] = cuisineSpecs.map((spec) => ({
  name: spec.name,
  context: spec.context,
  areasLabel: spec.areasLabel,
  areas: spec.regions.map((region) => {
    const dishes = dishesForArea(spec.sourceCuisine, region);
    if (dishes.length === 0) throw new Error(`Cuisine explorer area has no canonical dishes: ${spec.name} / ${region}`);
    return { name: region, dishes };
  }),
}));

export const foodMoods: readonly FoodMood[] = foodMoodSpecs.map((spec) => ({
  name: spec.name,
  context: spec.context,
  query: spec.query,
  dishes: dishesForIds(spec.dishIds),
}));
