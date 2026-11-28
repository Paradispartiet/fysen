import type { FoodKnowledgeArticle } from "../types.ts";
import type { InternationalSummaryLocale } from "../../../lib/international-summary-drafts.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
// Review-only translations of Iranian dishes.
export const draftInternationalArticles5 = {
  "ghormeh-sabzi": {
    "en": {
      "overview": "Finely chopped herbs are sautéed and simmered with meat and beans to make a rich stew.",
      "history": "Ghormeh sabzi is a classic Iranian khoresh, usually served with rice.",
      "flavor": "Herbal, tangy and rich.",
      "technique": "Gently sauté the herbs and simmer the stew until the meat is tender.",
      "essentials": [
        "500 g stewing lamb",
        "300 g parsley, coriander and spring onions",
        "1 tsp dried fenugreek"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 2.5 hours",
        "ingredients": [
          "500 g stewing lamb",
          "300 g parsley, coriander and spring onions",
          "1 tsp dried fenugreek",
          "250 g cooked kidney beans",
          "2 dried limes",
          "1 onion",
          "turmeric",
          "oil",
          "water"
        ],
        "steps": [
          "Brown the onion and meat with turmeric.",
          "Finely chop the herbs and sauté separately in oil.",
          "Add the herbs, pierced dried limes and water to the meat. Simmer until tender.",
          "Add the cooked beans towards the end and season to taste."
        ]
      },
      "variants": [
        "Beef can replace lamb; the herb mixture varies."
      ],
      "serving": [
        "Serve with basmati rice."
      ],
      "commonMistakes": [
        "Do not scorch the herbs or use too much fenugreek."
      ]
    },
    "fr": {
      "overview": "Les herbes finement hachées sont revenues puis mijotées avec la viande et les haricots pour obtenir un ragoût généreux.",
      "history": "Le ghormeh sabzi est un khoresh iranien classique, généralement servi avec du riz.",
      "flavor": "Herbacé, acidulé et riche.",
      "technique": "Faire revenir doucement les herbes et laisser mijoter jusqu’à ce que la viande soit tendre.",
      "essentials": [
        "500 g d’agneau à mijoter",
        "300 g de persil, coriandre et oignons nouveaux",
        "1 c. à café de fenugrec séché"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 2,5 heures",
        "ingredients": [
          "500 g d’agneau à mijoter",
          "300 g de persil, coriandre et oignons nouveaux",
          "1 c. à café de fenugrec séché",
          "250 g de haricots rouges cuits",
          "2 citrons verts séchés",
          "1 oignon",
          "curcuma",
          "huile",
          "eau"
        ],
        "steps": [
          "Faire dorer l’oignon et la viande avec le curcuma.",
          "Hacher finement les herbes et les faire revenir séparément dans l’huile.",
          "Ajouter les herbes, les citrons verts séchés percés et l’eau à la viande. Laisser mijoter jusqu’à tendreté.",
          "Ajouter les haricots cuits en fin de cuisson et rectifier l’assaisonnement."
        ]
      },
      "variants": [
        "Le bœuf peut remplacer l’agneau ; le mélange d’herbes varie."
      ],
      "serving": [
        "Servir avec du riz basmati."
      ],
      "commonMistakes": [
        "Ne pas brûler les herbes ni mettre trop de fenugrec."
      ]
    },
    "pt": {
      "overview": "As ervas finamente picadas são salteadas e cozinhadas com carne e feijão até se obter um guisado encorpado.",
      "history": "O ghormeh sabzi é um khoresh iraniano clássico, geralmente servido com arroz.",
      "flavor": "Herbáceo, ácido e encorpado.",
      "technique": "Saltear suavemente as ervas e deixar o guisado cozinhar até a carne ficar tenra.",
      "essentials": [
        "500 g de borrego para guisar",
        "300 g de salsa, coentros e cebolinho-verde",
        "1 colher de chá de feno-grego seco"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 2,5 horas",
        "ingredients": [
          "500 g de borrego para guisar",
          "300 g de salsa, coentros e cebolinho-verde",
          "1 colher de chá de feno-grego seco",
          "250 g de feijão-vermelho cozido",
          "2 limas secas",
          "1 cebola",
          "curcuma",
          "óleo",
          "água"
        ],
        "steps": [
          "Alourar a cebola e a carne com a curcuma.",
          "Picar finamente as ervas e salteá-las separadamente em óleo.",
          "Juntar as ervas, as limas secas perfuradas e a água à carne. Cozinhar em lume brando até ficar tenra.",
          "Juntar o feijão cozido perto do final e retificar os temperos."
        ]
      },
      "variants": [
        "A carne de vaca pode substituir o borrego; a mistura de ervas varia."
      ],
      "serving": [
        "Servir com arroz basmati."
      ],
      "commonMistakes": [
        "Não deixar queimar as ervas nem usar demasiado feno-grego."
      ]
    },
    "es": {
      "overview": "Las hierbas finamente picadas se sofríen y se cuecen con carne y alubias hasta obtener un guiso sustancioso.",
      "history": "El ghormeh sabzi es un khoresh iraní clásico, que suele servirse con arroz.",
      "flavor": "Herbáceo, ácido e intenso.",
      "technique": "Sofreír suavemente las hierbas y cocinar el guiso a fuego lento hasta que la carne esté tierna.",
      "essentials": [
        "500 g de cordero para guisar",
        "300 g de perejil, cilantro y cebolleta",
        "1 cucharadita de fenogreco seco"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 2,5 horas",
        "ingredients": [
          "500 g de cordero para guisar",
          "300 g de perejil, cilantro y cebolleta",
          "1 cucharadita de fenogreco seco",
          "250 g de alubias rojas cocidas",
          "2 limas secas",
          "1 cebolla",
          "cúrcuma",
          "aceite",
          "agua"
        ],
        "steps": [
          "Dorar la cebolla y la carne con la cúrcuma.",
          "Picar finamente las hierbas y sofreírlas por separado en aceite.",
          "Añadir las hierbas, las limas secas perforadas y agua a la carne. Cocer a fuego lento hasta que esté tierna.",
          "Añadir las alubias cocidas al final y ajustar la sazón."
        ]
      },
      "variants": [
        "Se puede sustituir el cordero por ternera; la mezcla de hierbas varía."
      ],
      "serving": [
        "Servir con arroz basmati."
      ],
      "commonMistakes": [
        "No quemar las hierbas ni usar demasiado fenogreco."
      ]
    },
    "de": {
      "overview": "Fein gehackte Kräuter werden angebraten und mit Fleisch und Bohnen zu einem gehaltvollen Eintopf geschmort.",
      "history": "Ghormeh Sabzi ist ein klassisches iranisches Khoresh, das meist mit Reis serviert wird.",
      "flavor": "Kräuterbetont, säuerlich und gehaltvoll.",
      "technique": "Die Kräuter vorsichtig anbraten und den Eintopf köcheln lassen, bis das Fleisch zart ist.",
      "essentials": [
        "500 g Lammfleisch zum Schmoren",
        "300 g Petersilie, Koriander und Frühlingszwiebeln",
        "1 TL getrockneter Bockshornklee"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 2,5 Stunden",
        "ingredients": [
          "500 g Lammfleisch zum Schmoren",
          "300 g Petersilie, Koriander und Frühlingszwiebeln",
          "1 TL getrockneter Bockshornklee",
          "250 g gekochte Kidneybohnen",
          "2 getrocknete Limetten",
          "1 Zwiebel",
          "Kurkuma",
          "Öl",
          "Wasser"
        ],
        "steps": [
          "Zwiebel und Fleisch mit Kurkuma anbraten.",
          "Die Kräuter fein hacken und getrennt in Öl anbraten.",
          "Kräuter, angestochene getrocknete Limetten und Wasser zum Fleisch geben. Köcheln lassen, bis es zart ist.",
          "Die gekochten Bohnen gegen Ende hinzufügen und abschmecken."
        ]
      },
      "variants": [
        "Rindfleisch kann Lamm ersetzen; die Kräutermischung variiert."
      ],
      "serving": [
        "Mit Basmatireis servieren."
      ],
      "commonMistakes": [
        "Die Kräuter nicht anbrennen lassen und nicht zu viel Bockshornklee verwenden."
      ]
    }
  },
  "fesenjan": {
    "en": {
      "overview": "Chicken is simmered in a thick, dark walnut sauce with fruity acidity.",
      "history": "Fesenjan is an established Iranian khoresh often associated with festive meals.",
      "flavor": "Sweet and sour, nutty and rich.",
      "technique": "Finely grind the walnuts and simmer the sauce, stirring regularly.",
      "essentials": [
        "600 g chicken thighs",
        "200 g walnuts",
        "1 onion"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 90 min",
        "ingredients": [
          "600 g chicken thighs",
          "200 g walnuts",
          "1 onion",
          "4 tbsp pomegranate molasses",
          "500 ml water",
          "turmeric",
          "salt",
          "oil"
        ],
        "steps": [
          "Finely grind the walnuts.",
          "Brown the onion and chicken in a little oil.",
          "Add the nuts, water and pomegranate molasses and simmer gently until the chicken is cooked through and the sauce is thick.",
          "Adjust with more pomegranate molasses or a little sugar as needed."
        ]
      },
      "variants": [
        "Duck or meatballs are also used; sweetness and acidity vary."
      ],
      "serving": [
        "Serve with Persian rice."
      ],
      "commonMistakes": [
        "Do not use high heat that could scorch the walnut sauce."
      ]
    },
    "fr": {
      "overview": "Le poulet mijote dans une sauce aux noix épaisse et sombre, à l’acidité fruitée.",
      "history": "Le fesenjan est un khoresh iranien bien établi, souvent associé aux repas de fête.",
      "flavor": "Aigre-doux, riche et aux notes de noix.",
      "technique": "Moudre finement les noix et laisser mijoter la sauce en remuant régulièrement.",
      "essentials": [
        "600 g de cuisses de poulet",
        "200 g de noix",
        "1 oignon"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 90 min",
        "ingredients": [
          "600 g de cuisses de poulet",
          "200 g de noix",
          "1 oignon",
          "4 c. à soupe de mélasse de grenade",
          "500 ml d’eau",
          "curcuma",
          "sel",
          "huile"
        ],
        "steps": [
          "Moudre finement les noix.",
          "Faire dorer l’oignon et le poulet dans un peu d’huile.",
          "Ajouter les noix, l’eau et la mélasse de grenade et laisser mijoter doucement jusqu’à ce que le poulet soit bien cuit et la sauce épaisse.",
          "Rectifier avec davantage de mélasse de grenade ou un peu de sucre si nécessaire."
        ]
      },
      "variants": [
        "On utilise aussi du canard ou des boulettes de viande ; l’équilibre sucré-acide varie."
      ],
      "serving": [
        "Servir avec du riz persan."
      ],
      "commonMistakes": [
        "Éviter le feu vif qui risque de brûler la sauce aux noix."
      ]
    },
    "pt": {
      "overview": "O frango cozinha lentamente num molho espesso e escuro de nozes, com acidez frutada.",
      "history": "O fesenjan é um khoresh iraniano tradicional, muitas vezes associado a refeições festivas.",
      "flavor": "Agridoce, com sabor a noz e encorpado.",
      "technique": "Triturar finamente as nozes e deixar o molho apurar em lume brando, mexendo regularmente.",
      "essentials": [
        "600 g de coxas de frango",
        "200 g de nozes",
        "1 cebola"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 90 min",
        "ingredients": [
          "600 g de coxas de frango",
          "200 g de nozes",
          "1 cebola",
          "4 colheres de sopa de melaço de romã",
          "500 ml de água",
          "curcuma",
          "sal",
          "óleo"
        ],
        "steps": [
          "Triturar finamente as nozes.",
          "Alourar a cebola e o frango num pouco de óleo.",
          "Juntar as nozes, a água e o melaço de romã e cozinhar suavemente até o frango estar bem cozinhado e o molho espesso.",
          "Ajustar com mais melaço de romã ou um pouco de açúcar, se necessário."
        ]
      },
      "variants": [
        "Também se usa pato ou almôndegas; a doçura e a acidez variam."
      ],
      "serving": [
        "Servir com arroz persa."
      ],
      "commonMistakes": [
        "Não usar lume forte, que pode queimar o molho de nozes."
      ]
    },
    "es": {
      "overview": "El pollo se cuece a fuego lento en una salsa de nueces espesa y oscura, con acidez afrutada.",
      "history": "El fesenjan es un khoresh iraní tradicional, asociado a menudo a comidas festivas.",
      "flavor": "Agridulce, intenso y con sabor a nuez.",
      "technique": "Moler finamente las nueces y dejar que la salsa hierva suavemente, removiendo con regularidad.",
      "essentials": [
        "600 g de muslos de pollo",
        "200 g de nueces",
        "1 cebolla"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 90 min",
        "ingredients": [
          "600 g de muslos de pollo",
          "200 g de nueces",
          "1 cebolla",
          "4 cucharadas de melaza de granada",
          "500 ml de agua",
          "cúrcuma",
          "sal",
          "aceite"
        ],
        "steps": [
          "Moler finamente las nueces.",
          "Dorar la cebolla y el pollo en un poco de aceite.",
          "Añadir las nueces, el agua y la melaza de granada y cocer suavemente hasta que el pollo esté bien hecho y la salsa espesa.",
          "Ajustar con más melaza de granada o un poco de azúcar según sea necesario."
        ]
      },
      "variants": [
        "También se utiliza pato o albóndigas; el dulzor y la acidez varían."
      ],
      "serving": [
        "Servir con arroz persa."
      ],
      "commonMistakes": [
        "No usar fuego fuerte, pues puede quemar la salsa de nueces."
      ]
    },
    "de": {
      "overview": "Hähnchen wird in einer dicken, dunklen Walnusssauce mit fruchtiger Säure gegart.",
      "history": "Fesenjan ist ein traditionsreiches iranisches Khoresh, das oft zu Festessen gehört.",
      "flavor": "Süßsäuerlich, nussig und gehaltvoll.",
      "technique": "Walnüsse fein mahlen und die Sauce unter regelmäßigem Rühren köcheln lassen.",
      "essentials": [
        "600 g Hähnchenschenkel",
        "200 g Walnüsse",
        "1 Zwiebel"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 90 Min.",
        "ingredients": [
          "600 g Hähnchenschenkel",
          "200 g Walnüsse",
          "1 Zwiebel",
          "4 EL Granatapfelmelasse",
          "500 ml Wasser",
          "Kurkuma",
          "Salz",
          "Öl"
        ],
        "steps": [
          "Die Walnüsse fein mahlen.",
          "Zwiebel und Hähnchen in etwas Öl anbraten.",
          "Nüsse, Wasser und Granatapfelmelasse hinzufügen und sanft köcheln lassen, bis das Hähnchen durchgegart und die Sauce dick ist.",
          "Bei Bedarf mit mehr Granatapfelmelasse oder etwas Zucker abschmecken."
        ]
      },
      "variants": [
        "Auch Ente oder Fleischbällchen werden verwendet; Süße und Säure variieren."
      ],
      "serving": [
        "Mit persischem Reis servieren."
      ],
      "commonMistakes": [
        "Keine starke Hitze verwenden, bei der die Nusssauce anbrennt."
      ]
    }
  },
  "chelo-kebab": {
    "en": {
      "overview": "Chelo is rice typically steamed until fluffy; several types of kebab may accompany it. This home version uses minced-meat koobideh.",
      "history": "Kebab with rice is a classic combination in Iranian restaurant and food culture.",
      "flavor": "Juicy, charred meat with mild, aromatic rice.",
      "technique": "Squeeze the liquid from grated onion and shape the meat firmly around wide skewers or into elongated patties.",
      "essentials": [
        "500 g minced lamb or beef",
        "1 onion",
        "salt and pepper"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 60 min",
        "ingredients": [
          "500 g minced lamb or beef",
          "1 onion",
          "salt and pepper",
          "300 g basmati rice",
          "saffron to taste",
          "butter",
          "4 tomatoes",
          "sumac"
        ],
        "steps": [
          "Rinse the rice, boil until nearly tender and finish steaming under a lid.",
          "Grate the onion, squeeze out the liquid and mix with the meat and seasoning.",
          "Shape elongated kebabs and grill or fry until the centre reaches at least 71 °C.",
          "Grill the tomatoes separately and serve with the rice, a little butter, saffron and sumac."
        ]
      },
      "variants": [
        "Chelo kabab may be served with koobideh or barg made from whole cuts of meat, among others."
      ],
      "serving": [
        "Serve with grilled tomato and sumac."
      ],
      "commonMistakes": [
        "Do not use a meat mixture that is too wet."
      ]
    },
    "fr": {
      "overview": "Le chelo est un riz généralement cuit à la vapeur pour obtenir des grains légers ; il accompagne plusieurs types de kebabs. Cette version maison utilise du koobideh à base de viande hachée.",
      "history": "Le kebab accompagné de riz est un classique de la restauration et de la cuisine iraniennes.",
      "flavor": "Viande juteuse et grillée, accompagnée de riz doux et aromatique.",
      "technique": "Presser l’oignon râpé pour en extraire le liquide et façonner fermement la viande sur de larges brochettes ou en galettes allongées.",
      "essentials": [
        "500 g d’agneau ou de bœuf haché",
        "1 oignon",
        "sel et poivre"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 60 min",
        "ingredients": [
          "500 g d’agneau ou de bœuf haché",
          "1 oignon",
          "sel et poivre",
          "300 g de riz basmati",
          "safran selon le goût",
          "beurre",
          "4 tomates",
          "sumac"
        ],
        "steps": [
          "Rincer le riz, le faire bouillir jusqu’à ce qu’il soit presque tendre puis terminer la cuisson à la vapeur sous un couvercle.",
          "Râper l’oignon, en extraire le liquide et le mélanger à la viande et aux épices.",
          "Façonner des kebabs allongés et les griller ou les poêler jusqu’à au moins 71 °C à cœur.",
          "Griller les tomates séparément et servir avec le riz, un peu de beurre, du safran et du sumac."
        ]
      },
      "variants": [
        "Le chelo kabab peut notamment être servi avec du koobideh ou du barg préparé avec des morceaux entiers de viande."
      ],
      "serving": [
        "Servir avec une tomate grillée et du sumac."
      ],
      "commonMistakes": [
        "Ne pas utiliser une farce trop humide."
      ]
    },
    "pt": {
      "overview": "O chelo é arroz geralmente cozido a vapor até ficar solto; pode acompanhar vários tipos de kebab. Esta versão caseira utiliza koobideh de carne picada.",
      "history": "O kebab com arroz é uma combinação clássica da restauração e da cultura gastronómica iranianas.",
      "flavor": "Carne suculenta e tostada com arroz suave e aromático.",
      "technique": "Espremer a cebola ralada para retirar o líquido e moldar firmemente a carne em espetos largos ou em peças alongadas.",
      "essentials": [
        "500 g de carne picada de borrego ou vaca",
        "1 cebola",
        "sal e pimenta"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 60 min",
        "ingredients": [
          "500 g de carne picada de borrego ou vaca",
          "1 cebola",
          "sal e pimenta",
          "300 g de arroz basmati",
          "açafrão a gosto",
          "manteiga",
          "4 tomates",
          "sumagre"
        ],
        "steps": [
          "Lavar o arroz, cozer até estar quase tenro e acabar de cozinhar a vapor com o tacho tapado.",
          "Ralar a cebola, espremer o líquido e misturar com a carne e os temperos.",
          "Moldar kebabs alongados e grelhar ou fritar até atingirem pelo menos 71 °C no centro.",
          "Grelhar os tomates separadamente e servir com o arroz, um pouco de manteiga, açafrão e sumagre."
        ]
      },
      "variants": [
        "O chelo kabab pode ser servido, entre outros, com koobideh ou barg de peças inteiras de carne."
      ],
      "serving": [
        "Servir com tomate grelhado e sumagre."
      ],
      "commonMistakes": [
        "Não utilizar uma mistura de carne demasiado húmida."
      ]
    },
    "es": {
      "overview": "El chelo es arroz que suele terminarse al vapor hasta quedar suelto; puede acompañar distintos tipos de kebab. Esta versión casera utiliza koobideh de carne picada.",
      "history": "El kebab con arroz es una combinación clásica de la restauración y la gastronomía iraníes.",
      "flavor": "Carne jugosa y tostada con arroz suave y aromático.",
      "technique": "Escurrir el líquido de la cebolla rallada y compactar la carne en brochetas anchas o en piezas alargadas.",
      "essentials": [
        "500 g de carne picada de cordero o ternera",
        "1 cebolla",
        "sal y pimienta"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 60 min",
        "ingredients": [
          "500 g de carne picada de cordero o ternera",
          "1 cebolla",
          "sal y pimienta",
          "300 g de arroz basmati",
          "azafrán al gusto",
          "mantequilla",
          "4 tomates",
          "zumaque"
        ],
        "steps": [
          "Lavar el arroz, hervirlo hasta que esté casi tierno y terminar la cocción al vapor con tapa.",
          "Rallar la cebolla, escurrir el líquido y mezclar con la carne y los condimentos.",
          "Formar kebabs alargados y asarlos o freírlos hasta alcanzar al menos 71 °C en el centro.",
          "Asar los tomates por separado y servir con el arroz, un poco de mantequilla, azafrán y zumaque."
        ]
      },
      "variants": [
        "El chelo kabab puede servirse, entre otros, con koobideh o barg de piezas enteras de carne."
      ],
      "serving": [
        "Servir con tomate asado y zumaque."
      ],
      "commonMistakes": [
        "No utilizar una mezcla de carne demasiado húmeda."
      ]
    },
    "de": {
      "overview": "Chelo ist Reis, der meist locker gedämpft wird; dazu können verschiedene Kebabs serviert werden. Diese Hausvariante verwendet Koobideh aus Hackfleisch.",
      "history": "Kebab mit Reis ist eine klassische Kombination der iranischen Restaurant- und Esskultur.",
      "flavor": "Saftiges, geröstetes Fleisch mit mildem, aromatischem Reis.",
      "technique": "Die Flüssigkeit aus der geriebenen Zwiebel drücken und das Fleisch fest um breite Spieße oder zu länglichen Frikadellen formen.",
      "essentials": [
        "500 g Lamm- oder Rinderhackfleisch",
        "1 Zwiebel",
        "Salz und Pfeffer"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 60 Min.",
        "ingredients": [
          "500 g Lamm- oder Rinderhackfleisch",
          "1 Zwiebel",
          "Salz und Pfeffer",
          "300 g Basmatireis",
          "Safran nach Geschmack",
          "Butter",
          "4 Tomaten",
          "Sumach"
        ],
        "steps": [
          "Reis waschen, fast gar kochen und zugedeckt fertig dämpfen.",
          "Zwiebel reiben, Flüssigkeit ausdrücken und mit Fleisch und Gewürzen mischen.",
          "Längliche Kebabs formen und grillen oder braten, bis sie im Kern mindestens 71 °C erreichen.",
          "Tomaten getrennt grillen und mit Reis, etwas Butter, Safran und Sumach servieren."
        ]
      },
      "variants": [
        "Chelo Kabab kann unter anderem mit Koobideh oder Barg aus ganzen Fleischstücken serviert werden."
      ],
      "serving": [
        "Mit gegrillter Tomate und Sumach servieren."
      ],
      "commonMistakes": [
        "Keine zu feuchte Hackfleischmasse verwenden."
      ]
    }
  }
} as const satisfies Record<string, Record<InternationalSummaryLocale, ArticleBody>>;
