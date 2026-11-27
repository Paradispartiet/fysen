import type { PreviewLocale } from "./locale-messages.ts";

/**
 * Matlyst claims are about the inspected data only. A catalog suggestion is
 * not proof that a restaurant currently serves the dish.
 */
export type MenuEvidenceKind = "live" | "archive" | "unchecked" | "unavailable";

const labels = {
  "nb": [
    "Rettforslag · menydekning utilgjengelig",
    "Rettforslag · ikke kontrollert mot menyarkivet",
    "Rettforslag · ikke funnet i det kontrollerte menyarkivet",
    "Rettforslag · ingen treff i de hentede menyene",
    "Registrert hos {count} restaurant",
    "Registrert hos {count} restauranter"
  ],
  "nn": [
    "Rettforslag · menydekning utilgjengeleg",
    "Rettforslag · ikkje kontrollert mot menyarkivet",
    "Rettforslag · ikkje funne i det kontrollerte menyarkivet",
    "Rettforslag · ingen treff i dei henta menyane",
    "Registrert hos {count} restaurant",
    "Registrert hos {count} restaurantar"
  ],
  "sv": [
    "Rättförslag · menytäckning saknas",
    "Rättförslag · inte kontrollerat mot menyarkivet",
    "Rättförslag · inte hittat i det kontrollerade menyarkivet",
    "Rättförslag · inga träffar i hämtade menyer",
    "Registrerat hos {count} restaurang",
    "Registrerat hos {count} restauranger"
  ],
  "da": [
    "Retforslag · menudækning utilgængelig",
    "Retforslag · ikke kontrolleret mod menuarkivet",
    "Retforslag · ikke fundet i det kontrollerede menuarkiv",
    "Retforslag · ingen resultater i de hentede menuer",
    "Registreret hos {count} restaurant",
    "Registreret hos {count} restauranter"
  ],
  "fi": [
    "Ruokalajiehdotus · ruokalistojen kattavuustietoa ei ole saatavilla",
    "Ruokalajiehdotus · ei tarkistettu ruokalista-arkistosta",
    "Ruokalajiehdotus · ei löytynyt tarkistetusta ruokalista-arkistosta",
    "Ruokalajiehdotus · ei osumia haetuilla ruokalistoilla",
    "Tallennettu {count} ravintolan ruokalistalle",
    "Tallennettu {count} ravintolan ruokalistoille"
  ],
  "is": [
    "Réttatillaga · upplýsingar um þekju matseðla ekki tiltækar",
    "Réttatillaga · ekki athuguð í matseðilssafninu",
    "Réttatillaga · fannst ekki í yfirförnu matseðilssafni",
    "Réttatillaga · engar niðurstöður á sóttum matseðlum",
    "Skráð hjá {count} veitingastað",
    "Skráð hjá {count} veitingastöðum"
  ],
  "en": [
    "Dish suggestion · menu coverage unavailable",
    "Dish suggestion · not checked against the menu archive",
    "Dish suggestion · not found in the checked menu archive",
    "Dish suggestion · no matches in retrieved menus",
    "Recorded at {count} restaurant",
    "Recorded at {count} restaurants"
  ]
} as const;
export function menuEvidenceLabel(kind: MenuEvidenceKind, restaurantCount: number, locale: PreviewLocale = "nb"): string {
 const row=labels[locale];
 if(kind==="unavailable") return row[0];
 if(kind==="unchecked") return row[1];
 if(restaurantCount===0) return row[kind==="archive"?2:3];
 return row[restaurantCount===1?4:5].replace("{count}",String(restaurantCount));
}
