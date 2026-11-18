import { italianFoodTypes, type ItalianFoodType } from "./cuisine-explorer-taxonomy";

/**
 * Broad Italian dish families are a browsing convenience, not a geographic
 * origin claim. Filter ONLY already discovered menu dishes and editorial
 * suggestions; never fabricate restaurant offers from this classification.
 */
const italianDishFamilyPatterns: Readonly<Record<string, RegExp>> = {
  "Pizza": /\b(pizza|pizzetta|calzone|pinsa|margherita|marinara)\b/iu,
  "Pasta": /\b(pasta|spaghett\w*|linguine|tagliatelle|fettuccine|penne|rigatoni|lasagn\w*|tortellini|ravioli|carbonara|amatriciana|cacio e pepe|agnolotti|orecchiette|fileja|pesto alla genovese)\b/iu,
  "Risotto og ris": /\b(risotto|arancini|suppl[iì]|risi e bisi)\b/iu,
  "Forretter": /\b(antipast\w*|bruschetta|focaccia|caponata|frittatina|vitello tonnato|nduja)\b/iu,
  "Kjøtt og fisk": /\b(saltimbocca|bistecca|sarde in saor|ossobuco|osso buco|scaloppine|branzino|fritto misto)\b/iu,
  "Supper og gryter": /\b(ribollita|minestrone|pappa al pomodoro|cacciucco)\b/iu,
  "Bakverk og dessert": /\b(tiramisu|cannoli|panna cotta|gelato|sfogliatella|biscotti|panettone|semifreddo)\b/iu,
};

function normalizeItalianDish(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("nb");
}

export function matchesItalianFoodType(dishName: string, type: ItalianFoodType): boolean {
  const normalizedName = normalizeItalianDish(dishName);
  if (type.dishNames.some((canonical) => normalizeItalianDish(canonical) === normalizedName)) return true;
  return italianDishFamilyPatterns[type.name]?.test(normalizedName) ?? false;
}

export function italianFoodTypeByName(name: string | null): ItalianFoodType | null {
  return italianFoodTypes.find((item) => item.name === name) ?? null;
}
