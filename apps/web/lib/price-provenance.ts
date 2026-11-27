import type { PreviewLocale } from "./locale-messages.ts";

const labels = {
  nb: ["Pris fra menykilden", "Wolt-leveringspris · kan avvike fra bordpris", "Foodora-leveringspris · kan avvike fra bordpris"],
  nn: ["Pris frå menykjelda", "Wolt-leveringspris · kan avvike frå bordpris", "Foodora-leveringspris · kan avvike frå bordpris"],
  sv: ["Pris från menykällan", "Wolt-leveranspris · kan avvika från restaurangpriset", "Foodora-leveranspris · kan avvika från restaurangpriset"],
  da: ["Pris fra menukilden", "Wolt-leveringspris · kan afvige fra restaurantprisen", "Foodora-leveringspris · kan afvige fra restaurantprisen"],
  fi: ["Hinta ruokalistalähteestä", "Woltin toimitushinta · voi poiketa ravintolahinnasta", "Foodoran toimitushinta · voi poiketa ravintolahinnasta"],
  is: ["Verð samkvæmt matseðilsheimild", "Wolt-verð fyrir heimsendingu · getur verið annað en verð á staðnum", "Foodora-verð fyrir heimsendingu · getur verið annað en verð á staðnum"],
  en: ["Price from menu source", "Wolt delivery price · may differ from dine-in price", "Foodora delivery price · may differ from dine-in price"],
} as const;

/** Display the channel for a sourced price without claiming it is a dine-in price. */
export function priceProvenanceLabel(sourceUrl: string, locale: PreviewLocale = "nb"): string {
  let hostname: string;
  try {
    hostname = new URL(sourceUrl).hostname.toLowerCase();
  } catch {
    return labels[locale][0];
  }

  if (hostname === "wolt.com" || hostname.endsWith(".wolt.com")) {
    return labels[locale][1];
  }
  if (hostname === "foodora.no" || hostname.endsWith(".foodora.no")) {
    return labels[locale][2];
  }
  return labels[locale][0];
}
