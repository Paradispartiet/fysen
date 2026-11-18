import type { FoodIllustrationName } from "./food-illustration-data";

/**
 * Deliberately conservative illustration lookup: the icon represents the
 * ingredient named in the actual recipe, never a restaurant's ingredients.
 */
const ingredientIllustrationRules: readonly [RegExp, FoodIllustrationName][] = [
  [/\b(tomat|tomatpur[eé]|tomatsaus|tomato|passata)/iu, "tomato"],
  [/\b(chili|chilli|jalape[nñ]o|paprikapulver|cayenne)/iu, "chili"],
  [/\b(kokos|coconut)/iu, "coconut"],
  [/\b(basilikum|basil)/iu, "basil"],
  [/\b(oliven|olivenolje|olive)/iu, "olive"],
  [/\b(mozzarella|parmesan|pecorino|cheddar|ricotta|ost)/iu, "cheese"],
  [/\b(fisk|torsk|laks|sei|ansjos|sardiner|fish)/iu, "fish"],
  [/\b(kylling|chicken)/iu, "chicken"],
  [/\b(storfekjøtt|oksekjøtt|biff|steak)/iu, "steak"],
  [/\b(ris|risotto|basmati|jasminris)/iu, "rice"],
  [/\b(koriander|karri|curry|garam|kardemomme|kanel|spisskummen|safran|nellik)/iu, "spice"],
  [/\b(spinat|salatblader|ruccola|grønnkål|pak choi)/iu, "greens"],
  [/\b(appelsin|orange)/iu, "orange"],
  [/\b(pasta|spaghetti|tagliatelle|penne|rigatoni)/iu, "pasta"],
  [/\b(pizzabunn|pizza)/iu, "pizza"],
  [/\b(naan|flatbrød|tortilla|lefse)/iu, "flatbread"],
];

export function illustrationForIngredient(value: string): FoodIllustrationName | null {
  for (const [pattern, illustration] of ingredientIllustrationRules) {
    if (pattern.test(value)) return illustration;
  }
  return null;
}

const dishIllustrationRules: readonly [RegExp, FoodIllustrationName][] = [
  [/\b(pizza|margherita|marinara)/iu, "pizza"],
  [/\b(pasta|carbonara|cacio e pepe|amatriciana|lasagne|tortellini|spaghetti)/iu, "pasta"],
  [/\b(burger|smashburger)/iu, "burger"],
  [/\b(tacos?|birria)/iu, "taco"],
  [/\b(pho|ramen|suppe|tom yum|sambar)/iu, "soup"],
  [/\b(curry|butter chicken|masala|mapo tofu)/iu, "curry"],
  [/\b(biryani|bibimbap|risotto|arancini)/iu, "rice"],
  [/\b(kebab|shawarma|doner|döner)/iu, "kebab"],
  [/\b(gyoza|dumplings|bao|dosa|naan)/iu, "flatbread"],
  [/\b(sushi|fisk|laks|fish)/iu, "fish"],
  [/\b(falafel|hummus)/iu, "greens"],
  [/\b(cannoli|tiramisu|dessert)/iu, "cake"],
];

export function illustrationForDishName(value: string): FoodIllustrationName | null {
  for (const [pattern, illustration] of dishIllustrationRules) {
    if (pattern.test(value)) return illustration;
  }
  return null;
}
