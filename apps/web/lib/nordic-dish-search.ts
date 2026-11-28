// Editorial, exact dish-name equivalences. Do not add broad ingredients,
// cuisine names, preparation variants or translated menu descriptions here.
// Independent of UI language and city. Never alters the source menu.
export const nordicDishAliases = [
  [
    "peking-duck",
    "peking duck",
    [
      "pekingand",
      "pekinganka",
      "pekingin ankka",
      "pekingönd"
    ]
  ],
  [
    "dan-dan-noodles",
    "dan dan noodles",
    [
      "dan dan-nudler",
      "dan dan-nudlar",
      "dan dan -nuudelit",
      "dan dan-núðlur"
    ]
  ],
  [
    "green-curry",
    "green curry",
    [
      "grønn curry",
      "grøn curry",
      "grön curry",
      "grøn karry",
      "vihreä curry",
      "grænt karrí"
    ]
  ],
  [
    "vietnamese-spring-rolls",
    "vietnamese spring rolls",
    [
      "vietnamesiske vårruller",
      "vietnamesiske vårrullar",
      "vietnamesiska vårrullar",
      "vietnamesiske forårsruller",
      "vietnamilaiset kevätkääryleet",
      "víetnamskar vorrúllur",
      "gỏi cuốn",
      "goi cuon"
    ]
  ],
  [
    "chicken-burger",
    "chicken burger",
    [
      "kyllingburger",
      "kycklingburgare",
      "kyllingeburger",
      "kanahampurilainen",
      "kjúklingaborgari"
    ]
  ],
  [
    "veggie-burger",
    "veggie burger",
    [
      "vegetarburger",
      "vegetarburgare",
      "kasvishampurilainen",
      "grænmetisborgari"
    ]
  ],
  [
    "fried-chicken",
    "fried chicken",
    [
      "fritert kylling",
      "friterad kyckling",
      "friteret kylling",
      "friteerattu kana",
      "djúpsteiktur kjúklingur"
    ]
  ],
  [
    "chicken-wings",
    "chicken wings",
    [
      "kyllingvinger",
      "kyllingvenger",
      "kycklingvingar",
      "kyllingevinger",
      "kanansiivet",
      "kjúklingavængir"
    ]
  ],
  [
    "fish-taco",
    "fish taco",
    [
      "fish tacos",
      "fisketaco",
      "fisketacos",
      "fisktaco",
      "fisktacos",
      "kalataco",
      "kalatacot",
      "fiskitaco"
    ]
  ],
  [
    "shrimp-taco",
    "shrimp taco",
    [
      "shrimp tacos",
      "reketaco",
      "reketacos",
      "räktaco",
      "räktacos",
      "rejetaco",
      "rejetacos",
      "katkaraputaco",
      "katkaraputacot",
      "rækjutaco"
    ]
  ],
  [
    "cheeseburger",
    "cheeseburger",
    [
      "osteburger",
      "ostburgare",
      "juustohampurilainen",
      "ostborgari"
    ]
  ],
  [
    "smashburger",
    "smashburger",
    [
      "smash burger"
    ]
  ],
  [
    "pho",
    "pho",
    [
      "phở"
    ]
  ],
  [
    "banh-mi",
    "banh mi",
    [
      "bánh mì"
    ]
  ],
  [
    "bun-cha",
    "bun cha",
    [
      "bún chả"
    ]
  ],
  [
    "doner",
    "doner",
    [
      "döner"
    ]
  ],
  [
    "manti",
    "manti",
    [
      "mantı"
    ]
  ]
] as const;

export function normalizeNordicDishQuery(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("nb-NO")
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim().replace(/\s+/gu, " ");
}

const byTerm = new Map<string, (typeof nordicDishAliases)[number]>();
for (const group of nordicDishAliases) {
  for (const term of [group[1], ...group[2]]) {
    const key = normalizeNordicDishQuery(term);
    const previous = byTerm.get(key);
    if (previous && previous[0] !== group[0]) throw new Error("Ambiguous Nordic dish alias: " + term);
    byTerm.set(key, group);
  }
}

export function resolveNordicDishQuery(query: string): { id: string; canonicalQuery: string; alternatives: string[] } | null {
  const normalized = normalizeNordicDishQuery(query);
  const group = byTerm.get(normalized);
  if (!group) return null;
  return { id: group[0], canonicalQuery: group[1], alternatives: [...new Set([group[1], ...group[2]].map(normalizeNordicDishQuery))].filter(term => term !== normalized) };
}

// Match added synonyms as complete token sequences, never as word fragments.
export function matchesNordicDishAlternative(normalizedMenuName: string, alternatives: readonly string[]): boolean {
  const padded = " " + normalizedMenuName + " ";
  return alternatives.some(term => term.length >= 2 && padded.includes(" " + term + " "));
}
