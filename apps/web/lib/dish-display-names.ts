import type { PreviewLocale } from "./locale-messages.ts";

// Original international culinary names are retained unless there is a useful localized form.
// These labels are editorial display copy, NOT aliases in verified menu matching.
const names: Readonly<Record<string, readonly [string, string, string, string, string, string]>> = {
  "peking-duck": [
    "Pekingand",
    "Pekinganka",
    "Pekingand",
    "Pekingin ankka",
    "Pekingönd",
    "Peking duck"
  ],
  "dan-dan-noodles": [
    "Dan dan-nudlar",
    "Dan dan-nudlar",
    "Dan dan-nudler",
    "Dan dan -nuudelit",
    "Dan dan-núðlur",
    "Dan dan noodles"
  ],
  "green-curry": [
    "Grøn curry",
    "Grön curry",
    "Grøn karry",
    "Vihreä curry",
    "Grænt karrí",
    "Green curry"
  ],
  "vietnamese-spring-rolls": [
    "Vietnamesiske vårrullar",
    "Vietnamesiska vårrullar",
    "Vietnamesiske forårsruller",
    "Vietnamilaiset kevätkääryleet",
    "Víetnamskar vorrúllur",
    "Vietnamese spring rolls"
  ],
  "chicken-burger": [
    "Kyllingburger",
    "Kycklingburgare",
    "Kyllingeburger",
    "Kanahampurilainen",
    "Kjúklingaborgari",
    "Chicken burger"
  ],
  "veggie-burger": [
    "Vegetarburger",
    "Vegetarburgare",
    "Vegetarburger",
    "Kasvishampurilainen",
    "Grænmetisborgari",
    "Veggie burger"
  ],
  "fried-chicken": [
    "Fritert kylling",
    "Friterad kyckling",
    "Friteret kylling",
    "Friteerattu kana",
    "Djúpsteiktur kjúklingur",
    "Fried chicken"
  ],
  "chicken-wings": [
    "Kyllingvenger",
    "Kycklingvingar",
    "Kyllingevinger",
    "Kanansiivet",
    "Kjúklingavængir",
    "Chicken wings"
  ],
  "chicken-tenders": [
    "Kyllingstrimlar",
    "Kycklingstrimlor",
    "Kyllingestrimler",
    "Kanasuikaleet",
    "Kjúklingastrimlar",
    "Chicken tenders"
  ],
  "fish-taco": [
    "Fisketaco",
    "Fisktaco",
    "Fisketaco",
    "Kalataco",
    "Fisktaco",
    "Fish taco"
  ],
  "shrimp-taco": [
    "Reketaco",
    "Räktaco",
    "Rejetaco",
    "Katkaraputaco",
    "Rækjutaco",
    "Shrimp taco"
  ]
};
const indexes = { nn: 0, sv: 1, da: 2, fi: 3, is: 4, en: 5 } as const;
export function dishDisplayName(id: string, original: string, locale: PreviewLocale): string {
  return locale === "nb" || !Object.hasOwn(names, id) ? original : names[id]?.[indexes[locale]] ?? original;
}
