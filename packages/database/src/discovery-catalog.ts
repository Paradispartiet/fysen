import { normalizeDishName } from "@fysen/menu-core";

export const discoveryExclusionCategories = [
  "beverage",
  "sauce_or_side",
  "modifier",
  "allergen_or_information",
  "menu_heading",
  "invalid_fragment",
] as const;

export type DiscoveryExclusionCategory = (typeof discoveryExclusionCategories)[number];
export type DiscoveryItemCategory = "dish" | DiscoveryExclusionCategory;

export interface DiscoveryCandidate {
  readonly name: string;
  readonly normalizedName: string;
  readonly description: string | null;
  readonly sectionName: string | null;
  readonly priceMinor: number | null;
}

function normalized(value: string | null): string {
  return (value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("nb-NO")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function matches(value: string, expressions: readonly RegExp[]): boolean {
  return expressions.some((expression) => expression.test(value));
}

export function classifyDiscoveryCandidate(candidate: DiscoveryCandidate): DiscoveryItemCategory {
  const name = normalized(candidate.name);
  const section = normalized(candidate.sectionName);
  const description = normalized(candidate.description);

  if (!/[a-z]/.test(name) || matches(name, [/^\d+\s*(stk|cl|ml|l|g|kg|biter|pieces?|bottles?)?$/, /^(n a|null|undefined|ukjent)$/])) {
    return "invalid_fragment";
  }
  if (matches(name, [/^allergen/, /^inneholder\b/, /^kan inneholde\b/, /^informasjon\b/, /^les mer\b/]) || matches(description, [/^allergen/])) {
    return "allergen_or_information";
  }
  if (matches(name, [/^(velg|choose|valg|ekstra|extra|tilvalg|add on)\b/, /^per stk$/, /^chefs? spesialitet$/])) {
    return "modifier";
  }
  if (matches(section, [/\b(drikke|drinks?|beverage|vin|wine|ol|beer|cocktail|sprit|spirits?)\b/]) || matches(name, [
    /\b(vann|water|cola|fanta|sprite|pepsi|solo|juice|limonade|lemonade|kaffe|coffee|espresso|cappuccino|latte|te|tea)\b/,
    /\b(ol|beer|pils|ipa|lager|vin|wine|prosecco|champagne|cava|cocktail|gin|vodka|whisk(?:e)?y|cognac|akevitt|aperol spritz)\b/,
    /^\d+[,.]?\d*\s*(cl|ml|liter|l)\b/,
  ])) {
    return "beverage";
  }
  if (matches(section, [/\b(saus|sauce|tilbehor|sides?|extras?)\b/]) || matches(name, [
    /^(aioli|majones|mayo|chimichurri|chiliolje|chili oil|tzatziki|dressing|saus|sauce|ris|rice|bulgur|pommes frites|fries|coleslaw|agurk|cucumber)$/,
  ])) {
    return "sauce_or_side";
  }
  if (candidate.priceMinor === null && matches(name, [/^(forrett(?:er)?|starter(?:s)?|hovedrett(?:er)?|main courses?|dessert(?:er|s)?|meny|menu|smaretter|small plates)$/])) {
    return "menu_heading";
  }
  return "dish";
}

export function canonicalMenuDishName(value: string): string {
  const withoutNoise = value
    .replace(/^\s*\d+[.)-]\s*/, "")
    .replace(/\s*\([A-ZÆØÅ](?:\s*,\s*[A-ZÆØÅ])*\)\s*$/u, "")
    .replace(/\s+\d+\s*(?:stk|biter|pieces?|g|gram)\s*$/iu, "")
    .replace(/\s+/g, " ")
    .trim();
  return withoutNoise || value.trim();
}

export function canonicalMenuDishIdentity(value: string): string {
  return normalizeDishName(canonicalMenuDishName(value))
    .replace(/^adamame\b/, "edamame")
    .replace(/^marg?erita\b/, "margherita");
}
