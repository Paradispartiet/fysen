import { matlystDiscoveryCatalog } from "../content/food-knowledge/matlyst-discovery-catalog";
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

export type CuisineDiscoveryDish = {
  readonly areaName: string;
  readonly dish: DishSuggestion;
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

export const featuredCuisineNames = [
  "Italiensk",
  "Japansk",
  "Tyrkisk",
  "Indisk",
  "Kinesisk",
  "Thai",
] as const;

const homeCuisineSpecs: readonly CuisineSpec[] = [
  {
    name: "Asiatisk",
    context: "Japan · Kina · Thailand · Vietnam",
    areasLabel: "Land og kjøkkentradisjoner",
    sourceCuisine: "Asiatisk",
    regions: ["Japan", "Kina", "Thailand", "Vietnam"],
  },
  {
    name: "Indisk",
    context: "Nord-India · Sør-India · Hyderabad",
    areasLabel: "Regioner og tradisjoner",
    sourceCuisine: "Indisk",
    regions: ["Nord-India", "Sør-India", "Hyderabad"],
  },
  {
    name: "Fast food",
    context: "Burger · fried chicken · hot dog",
    areasLabel: "Typer",
    sourceCuisine: "Fast food",
    regions: ["Burger", "Fried chicken", "Hot dog"],
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
    context: "Levanten · Egypt · Tyrkia",
    areasLabel: "Regioner og tradisjoner",
    sourceCuisine: "Midtøsten",
    regions: ["Levanten", "Egypt", "Tyrkia"],
  },
  {
    name: "Mexicansk",
    context: "Sentral-Mexico · Jalisco · Yucatán · Baja",
    areasLabel: "Regioner og tradisjoner",
    sourceCuisine: "Mexicansk",
    regions: ["Sentral-Mexico", "Jalisco", "Yucatán", "Baja"],
  },
];

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
    name: "Koreansk",
    context: "Bibimbap · bulgogi · tteokbokki · mandu",
    areasLabel: "Tradisjon",
    sourceCuisine: "Koreansk",
    regions: ["Korea"],
  },
  {
    name: "Filippinsk",
    context: "Sisig · adobo · inasal · kare-kare",
    areasLabel: "Tradisjon",
    sourceCuisine: "Filippinsk",
    regions: ["Filippinene"],
  },
  {
    name: "Indisk",
    context: "Nord-India · Sør-India · Hyderabad",
    areasLabel: "Regioner og tradisjoner",
    sourceCuisine: "Indisk",
    regions: ["Nord-India", "Sør-India", "Hyderabad"],
  },
  {
    name: "Pakistansk",
    context: "Karahi · chapli kebab · tikka masala",
    areasLabel: "Tradisjon",
    sourceCuisine: "Pakistansk",
    regions: ["Lahore"],
  },
  {
    name: "Nepalsk",
    context: "Momo · jhol momo · chowmein · sekuwa",
    areasLabel: "Tradisjon",
    sourceCuisine: "Nepalsk",
    regions: ["Nepal"],
  },
  {
    name: "Etiopisk",
    context: "Doro wat · tibs · firfir · shiro",
    areasLabel: "Tradisjon",
    sourceCuisine: "Etiopisk",
    regions: ["Etiopia"],
  },
  {
    name: "Italiensk",
    context: "Roma · Napoli · Sicilia",
    areasLabel: "Regioner og bytradisjoner",
    sourceCuisine: "Italiensk",
    regions: ["Roma", "Napoli", "Sicilia"],
  },
  {
    name: "Levantinsk",
    context: "Falafel · shawarma · hummus · manakish",
    areasLabel: "Tradisjon",
    sourceCuisine: "Midtøsten",
    regions: ["Levanten"],
  },
  {
    name: "Egyptisk",
    context: "Koshari · ta'ameya · ful medames · fattah",
    areasLabel: "Tradisjon",
    sourceCuisine: "Midtøsten",
    regions: ["Egypt"],
  },
  {
    name: "Tyrkisk",
    context: "Döner · pide · lahmacun · mantı",
    areasLabel: "Tradisjon",
    sourceCuisine: "Midtøsten",
    regions: ["Tyrkia"],
  },
  {
    name: "Persisk",
    context: "Koobideh · ghormeh sabzi · zereshk polo",
    areasLabel: "Tradisjon",
    sourceCuisine: "Persisk",
    regions: ["Iran"],
  },
  {
    name: "Usbekisk",
    context: "Plov · lagman · qazon kebab · manty",
    areasLabel: "Tradisjon",
    sourceCuisine: "Usbekisk",
    regions: ["Usbekistan"],
  },
  {
    name: "Mexicansk",
    context: "Sentral-Mexico · Jalisco · Yucatán · Baja",
    areasLabel: "Regioner og tradisjoner",
    sourceCuisine: "Mexicansk",
    regions: ["Sentral-Mexico", "Jalisco", "Yucatán", "Baja"],
  },
  {
    name: "Brasiliansk",
    context: "Pão de queijo · coxinha · mandioca · bacalhau",
    areasLabel: "Tradisjon",
    sourceCuisine: "Brasiliansk",
    regions: ["Brasil"],
  },
  {
    name: "Polsk",
    context: "Pierogi · bigos · schabowy · żur",
    areasLabel: "Tradisjon",
    sourceCuisine: "Polsk",
    regions: ["Polen"],
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
    dishIds: ["ramen", "udon", "dan-dan-noodles", "pad-thai", "pho", "nepali-chowmein", "lagman"],
  },
  {
    name: "Curry",
    context: "Butter chicken · grønn curry · masala",
    query: "curry",
    dishIds: ["butter-chicken", "green-curry", "chana-masala", "mirchi-ka-salan", "chicken-tikka-masala-pakistan"],
  },
  {
    name: "Dumplings",
    context: "Gyoza · jiaozi · momo · mantı",
    query: "dumplings",
    dishIds: ["gyoza", "dumplings", "manti", "momo", "jhol-momo", "mandu", "manty"],
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
    dishIds: ["fried-chicken", "chicken-wings", "chicken-tenders", "hot-chicken", "frango-a-passarinho"],
  },
  {
    name: "Vegetar",
    context: "Falafel · dosa · chana masala · vegetarburger",
    query: "vegetar",
    dishIds: ["falafel", "dosa", "chana-masala", "veggie-burger", "hummus", "kare-kare", "jhaneko-dal", "mesir-wat", "shiro"],
  },
  {
    name: "Grill",
    context: "Koobideh · chapli kebab · sekuwa · inasal",
    query: "grill",
    dishIds: ["koobideh", "chapli-kebab", "sekuwa", "chicken-inasal", "qazon-kebab", "tibs", "awaze-tibs"],
  },
  {
    name: "Street food",
    context: "Coxinha · momo · tteokbokki · siomai",
    query: "street food",
    dishIds: ["coxinha", "momo", "tteokbokki", "siomai", "pao-de-queijo"],
  },
  {
    name: "Risretter",
    context: "Bibimbap · biryani · plov · zereshk polo",
    query: "ris",
    dishIds: ["bibimbap", "biryani", "uzbek-plov", "zereshk-polo"],
  },
];

function toDishSuggestion(dish: (typeof matlystDiscoveryCatalog)[number]): DishSuggestion {
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
  return matlystDiscoveryCatalog
    .filter((dish) => dish.cuisine === sourceCuisine && dish.region === region)
    .sort((left, right) => right.explorerPriority - left.explorerPriority || left.name.localeCompare(right.name, "nb"))
    .slice(0, 8)
    .map(toDishSuggestion);
}

function dishesForIds(ids: readonly string[]): readonly DishSuggestion[] {
  return ids.map((id) => {
    const dish = matlystDiscoveryCatalog.find((candidate) => candidate.id === id);
    if (!dish) throw new Error(`Matlyst mood references unknown canonical dish: ${id}`);
    return toDishSuggestion(dish);
  });
}

function buildCuisines(specs: readonly CuisineSpec[]): readonly Cuisine[] {
  return specs.map((spec) => ({
    name: spec.name,
    context: spec.context,
    areasLabel: spec.areasLabel,
    areas: spec.regions.map((region) => {
      const dishes = dishesForArea(spec.sourceCuisine, region);
      if (dishes.length === 0) throw new Error(`Cuisine explorer area has no canonical dishes: ${spec.name} / ${region}`);
      return { name: region, dishes };
    }),
  }));
}

export function discoveryDishesForCuisine(cuisineName: string): readonly CuisineDiscoveryDish[] {
  const spec = cuisineSpecs.find((candidate) => candidate.name === cuisineName);
  if (!spec) return [];
  return matlystDiscoveryCatalog
    .filter((dish) => dish.cuisine === spec.sourceCuisine && spec.regions.includes(dish.region))
    .sort((left, right) => right.explorerPriority - left.explorerPriority || left.name.localeCompare(right.name, "nb"))
    .map((dish) => ({ areaName: dish.region, dish: toDishSuggestion(dish) }));
}

export const homeCuisines: readonly Cuisine[] = buildCuisines(homeCuisineSpecs);
export const cuisines: readonly Cuisine[] = buildCuisines(cuisineSpecs);

export const foodMoods: readonly FoodMood[] = foodMoodSpecs.map((spec) => ({
  name: spec.name,
  context: spec.context,
  query: spec.query,
  dishes: dishesForIds(spec.dishIds),
}));
