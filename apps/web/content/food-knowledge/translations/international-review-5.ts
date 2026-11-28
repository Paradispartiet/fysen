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
  },
  "kabuli-palaw": {
    "en": {
      "overview": "Long-grain rice is steamed with spiced meat stock and topped with fried carrot strips and raisins.",
      "history": "Kabuli palaw is regarded as an Afghan national dish and is often served at celebrations.",
      "flavor": "Aromatic, rich and slightly sweet.",
      "technique": "Cook the meat until tender first and finish steaming the rice without letting it become mushy.",
      "essentials": [
        "400 g basmati rice",
        "600 g lamb",
        "1 onion"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 2 hours",
        "ingredients": [
          "400 g basmati rice",
          "600 g lamb",
          "1 onion",
          "2 carrots",
          "75 g raisins",
          "cardamom",
          "cumin",
          "oil",
          "water",
          "salt"
        ],
        "steps": [
          "Brown the onion and meat and simmer with water and spices until tender. Reserve the stock.",
          "Fry the carrot strips and raisins separately in a little oil.",
          "Rinse and parboil the rice until nearly tender, drain and place over the meat with some stock.",
          "Finish steaming under a tight lid over low heat. Serve topped with carrots and raisins."
        ]
      },
      "variants": [
        "Beef can replace lamb; nuts may be used as a topping."
      ],
      "serving": [
        "Serve on a large platter."
      ],
      "commonMistakes": [
        "Do not add more stock than the rice needs to finish steaming."
      ]
    },
    "fr": {
      "overview": "Le riz à grains longs est cuit à la vapeur avec un bouillon de viande épicé, puis garni de carottes en julienne et de raisins secs revenus à l’huile.",
      "history": "Le kabuli palaw est considéré comme un plat national afghan et se sert souvent lors des fêtes.",
      "flavor": "Aromatique, généreux et légèrement sucré.",
      "technique": "Cuire d’abord la viande jusqu’à tendreté, puis terminer la cuisson du riz à la vapeur sans le laisser devenir pâteux.",
      "essentials": [
        "400 g de riz basmati",
        "600 g d’agneau",
        "1 oignon"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 2 heures",
        "ingredients": [
          "400 g de riz basmati",
          "600 g d’agneau",
          "1 oignon",
          "2 carottes",
          "75 g de raisins secs",
          "cardamome",
          "cumin",
          "huile",
          "eau",
          "sel"
        ],
        "steps": [
          "Faire dorer l’oignon et la viande, puis mijoter avec l’eau et les épices jusqu’à tendreté. Réserver le bouillon.",
          "Faire revenir séparément les carottes en julienne et les raisins secs dans un peu d’huile.",
          "Rincer et précuire le riz jusqu’à ce qu’il soit presque tendre, l’égoutter et le disposer sur la viande avec un peu de bouillon.",
          "Terminer à la vapeur à feu doux sous un couvercle hermétique. Servir garni de carottes et de raisins secs."
        ]
      },
      "variants": [
        "Le bœuf peut remplacer l’agneau ; des fruits à coque peuvent servir de garniture."
      ],
      "serving": [
        "Servir dans un grand plat."
      ],
      "commonMistakes": [
        "Ne pas ajouter plus de bouillon que nécessaire pour terminer la cuisson du riz."
      ]
    },
    "pt": {
      "overview": "O arroz de grão longo é cozido a vapor com caldo de carne aromatizado com especiarias e guarnecido com tiras de cenoura e passas salteadas.",
      "history": "O kabuli palaw é considerado um prato nacional afegão e é frequentemente servido em celebrações.",
      "flavor": "Aromático, encorpado e ligeiramente doce.",
      "technique": "Cozer primeiro a carne até ficar tenra e acabar de cozinhar o arroz a vapor sem o deixar empapar.",
      "essentials": [
        "400 g de arroz basmati",
        "600 g de borrego",
        "1 cebola"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 2 horas",
        "ingredients": [
          "400 g de arroz basmati",
          "600 g de borrego",
          "1 cebola",
          "2 cenouras",
          "75 g de passas",
          "cardamomo",
          "cominhos",
          "óleo",
          "água",
          "sal"
        ],
        "steps": [
          "Alourar a cebola e a carne e cozinhar em lume brando com água e especiarias até ficar tenra. Reservar o caldo.",
          "Saltear separadamente as tiras de cenoura e as passas num pouco de óleo.",
          "Lavar e pré-cozer o arroz até estar quase tenro, escorrer e colocar sobre a carne com um pouco do caldo.",
          "Acabar de cozer a vapor em lume brando, com a tampa bem fechada. Servir com a cenoura e as passas por cima."
        ]
      },
      "variants": [
        "A carne de vaca pode substituir o borrego; podem usar-se frutos secos como guarnição."
      ],
      "serving": [
        "Servir numa travessa grande."
      ],
      "commonMistakes": [
        "Não juntar mais caldo do que o necessário para acabar de cozinhar o arroz."
      ]
    },
    "es": {
      "overview": "El arroz de grano largo se cuece al vapor con caldo de carne especiado y se cubre con tiras de zanahoria y pasas salteadas.",
      "history": "El kabuli palaw se considera un plato nacional afgano y suele servirse en celebraciones.",
      "flavor": "Aromático, intenso y ligeramente dulce.",
      "technique": "Cocinar primero la carne hasta que esté tierna y terminar el arroz al vapor sin que se apelmace.",
      "essentials": [
        "400 g de arroz basmati",
        "600 g de cordero",
        "1 cebolla"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 2 horas",
        "ingredients": [
          "400 g de arroz basmati",
          "600 g de cordero",
          "1 cebolla",
          "2 zanahorias",
          "75 g de pasas",
          "cardamomo",
          "comino",
          "aceite",
          "agua",
          "sal"
        ],
        "steps": [
          "Dorar la cebolla y la carne y cocer a fuego lento con agua y especias hasta que esté tierna. Reservar el caldo.",
          "Saltear por separado las tiras de zanahoria y las pasas en un poco de aceite.",
          "Lavar y precocer el arroz hasta que esté casi tierno, escurrirlo y colocarlo sobre la carne con un poco del caldo.",
          "Terminar la cocción al vapor a fuego bajo con una tapa bien ajustada. Servir con la zanahoria y las pasas por encima."
        ]
      },
      "variants": [
        "La ternera puede sustituir al cordero; se pueden añadir frutos secos como cobertura."
      ],
      "serving": [
        "Servir en una fuente grande."
      ],
      "commonMistakes": [
        "No añadir más caldo del que necesita el arroz para terminar de cocerse."
      ]
    },
    "de": {
      "overview": "Langkornreis wird mit gewürzter Fleischbrühe gedämpft und mit gebratenen Karottenstreifen und Rosinen garniert.",
      "history": "Kabuli Palaw gilt als afghanisches Nationalgericht und wird häufig bei Feiern serviert.",
      "flavor": "Aromatisch, gehaltvoll und leicht süßlich.",
      "technique": "Zuerst das Fleisch zart garen und den Reis fertig dämpfen, ohne dass er matschig wird.",
      "essentials": [
        "400 g Basmatireis",
        "600 g Lammfleisch",
        "1 Zwiebel"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 2 Stunden",
        "ingredients": [
          "400 g Basmatireis",
          "600 g Lammfleisch",
          "1 Zwiebel",
          "2 Karotten",
          "75 g Rosinen",
          "Kardamom",
          "Kreuzkümmel",
          "Öl",
          "Wasser",
          "Salz"
        ],
        "steps": [
          "Zwiebel und Fleisch anbraten und mit Wasser und Gewürzen köcheln lassen, bis das Fleisch zart ist. Brühe aufbewahren.",
          "Karottenstreifen und Rosinen getrennt in etwas Öl anbraten.",
          "Reis waschen, fast gar vorkochen, abgießen und mit etwas Brühe auf das Fleisch geben.",
          "Bei schwacher Hitze unter dicht schließendem Deckel fertig dämpfen. Mit Karotten und Rosinen garniert servieren."
        ]
      },
      "variants": [
        "Rindfleisch kann Lamm ersetzen; Nüsse können als Garnitur dienen."
      ],
      "serving": [
        "Auf einer großen Platte servieren."
      ],
      "commonMistakes": [
        "Nicht mehr Brühe zugeben, als der Reis zum Fertigdämpfen braucht."
      ]
    }
  },
  "ashak": {
    "en": {
      "overview": "The thin dumplings are usually served with garlic yoghurt and a spiced meat or lentil sauce.",
      "history": "Ashak is a well-known Afghan dish also served at large gatherings.",
      "flavor": "Soft, herbaceous and tangy from the yoghurt.",
      "technique": "Wash the leeks thoroughly and seal the dumplings well.",
      "essentials": [
        "300 g wheat flour",
        "150 ml water",
        "300 g leeks"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 90 min",
        "ingredients": [
          "300 g wheat flour",
          "150 ml water",
          "300 g leeks",
          "1 tbsp oil",
          "150 g dried red lentils",
          "1 onion",
          "200 g chopped tomatoes",
          "200 g yoghurt",
          "garlic",
          "cumin"
        ],
        "steps": [
          "Knead flour and water with a little salt into a smooth dough and leave to rest.",
          "Wash and finely slice the leeks, then mix with a little oil and salt.",
          "Roll the dough thinly, cut out circles, fill with leeks and seal.",
          "Boil the dumplings until the dough is tender. Cook the lentils with sautéed onion, tomatoes and spices until fully cooked.",
          "Serve with garlic yoghurt and lentil sauce."
        ]
      },
      "variants": [
        "Meat sauce is also common; gandana has a different flavour from ordinary leeks."
      ],
      "serving": [
        "Serve with a little dried mint."
      ],
      "commonMistakes": [
        "Do not overfill the dumplings or use gritty leeks."
      ]
    },
    "fr": {
      "overview": "Ces raviolis à pâte fine sont généralement servis avec du yaourt à l’ail et une sauce épicée à la viande ou aux lentilles.",
      "history": "L’ashak est un plat afghan bien connu, également servi lors de grandes réceptions.",
      "flavor": "Tendre, herbacé et acidulé grâce au yaourt.",
      "technique": "Bien laver les poireaux et fermer soigneusement les raviolis.",
      "essentials": [
        "300 g de farine de blé",
        "150 ml d’eau",
        "300 g de poireaux"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 90 min",
        "ingredients": [
          "300 g de farine de blé",
          "150 ml d’eau",
          "300 g de poireaux",
          "1 c. à soupe d’huile",
          "150 g de lentilles corail sèches",
          "1 oignon",
          "200 g de tomates concassées",
          "200 g de yaourt",
          "ail",
          "cumin"
        ],
        "steps": [
          "Pétrir la farine et l’eau avec un peu de sel jusqu’à obtenir une pâte lisse, puis laisser reposer.",
          "Laver et émincer finement les poireaux, puis mélanger avec un peu d’huile et de sel.",
          "Étaler finement la pâte, découper des disques, garnir de poireaux et refermer.",
          "Cuire les raviolis à l’eau jusqu’à ce que la pâte soit tendre. Cuire les lentilles avec l’oignon revenu, les tomates et les épices jusqu’à cuisson complète.",
          "Servir avec le yaourt à l’ail et la sauce aux lentilles."
        ]
      },
      "variants": [
        "La sauce à la viande est également courante ; le gandana a une saveur différente du poireau ordinaire."
      ],
      "serving": [
        "Servir avec un peu de menthe séchée."
      ],
      "commonMistakes": [
        "Ne pas trop garnir les raviolis ni utiliser de poireaux mal lavés."
      ]
    },
    "pt": {
      "overview": "Os pastéis de massa fina são geralmente servidos com iogurte de alho e um molho de carne ou lentilhas com especiarias.",
      "history": "O ashak é um prato afegão conhecido, também servido em grandes convívios.",
      "flavor": "Macio, herbáceo e acidulado pelo iogurte.",
      "technique": "Lavar bem o alho-francês e fechar bem os pastéis.",
      "essentials": [
        "300 g de farinha de trigo",
        "150 ml de água",
        "300 g de alho-francês"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 90 min",
        "ingredients": [
          "300 g de farinha de trigo",
          "150 ml de água",
          "300 g de alho-francês",
          "1 colher de sopa de óleo",
          "150 g de lentilhas vermelhas secas",
          "1 cebola",
          "200 g de tomate picado",
          "200 g de iogurte",
          "alho",
          "cominhos"
        ],
        "steps": [
          "Amassar a farinha e a água com um pouco de sal até obter uma massa lisa e deixar repousar.",
          "Lavar e cortar finamente o alho-francês e misturar com um pouco de óleo e sal.",
          "Estender a massa finamente, cortar círculos, rechear com alho-francês e fechar.",
          "Cozer os pastéis em água até a massa ficar tenra. Cozer as lentilhas com cebola refogada, tomate e especiarias até estarem completamente cozidas.",
          "Servir com iogurte de alho e molho de lentilhas."
        ]
      },
      "variants": [
        "O molho de carne também é comum; a gandana tem um sabor diferente do alho-francês comum."
      ],
      "serving": [
        "Servir com um pouco de hortelã seca."
      ],
      "commonMistakes": [
        "Não encher demasiado os pastéis nem usar alho-francês com areia."
      ]
    },
    "es": {
      "overview": "Las empanadillas de masa fina suelen servirse con yogur al ajo y una salsa especiada de carne o lentejas.",
      "history": "El ashak es un plato afgano conocido que también se sirve en grandes reuniones.",
      "flavor": "Suave, herbáceo y ácido por el yogur.",
      "technique": "Lavar bien los puerros y sellar bien las empanadillas.",
      "essentials": [
        "300 g de harina de trigo",
        "150 ml de agua",
        "300 g de puerros"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 90 min",
        "ingredients": [
          "300 g de harina de trigo",
          "150 ml de agua",
          "300 g de puerros",
          "1 cucharada de aceite",
          "150 g de lentejas rojas secas",
          "1 cebolla",
          "200 g de tomates picados",
          "200 g de yogur",
          "ajo",
          "comino"
        ],
        "steps": [
          "Amasar la harina y el agua con un poco de sal hasta obtener una masa lisa y dejar reposar.",
          "Lavar y cortar finamente los puerros, y mezclar con un poco de aceite y sal.",
          "Estirar la masa fina, cortar círculos, rellenar con puerros y sellar.",
          "Hervir las empanadillas hasta que la masa esté tierna. Cocer las lentejas con cebolla sofrita, tomate y especias hasta que estén completamente hechas.",
          "Servir con yogur al ajo y salsa de lentejas."
        ]
      },
      "variants": [
        "La salsa de carne también es habitual; la gandana tiene un sabor distinto al puerro común."
      ],
      "serving": [
        "Servir con un poco de menta seca."
      ],
      "commonMistakes": [
        "No rellenar demasiado las empanadillas ni usar puerros con tierra."
      ]
    },
    "de": {
      "overview": "Die dünnen Teigtaschen werden meist mit Knoblauchjoghurt und einer gewürzten Fleisch- oder Linsensauce serviert.",
      "history": "Ashak ist ein bekanntes afghanisches Gericht, das auch bei größeren Festen serviert wird.",
      "flavor": "Weich, kräuterbetont und durch den Joghurt säuerlich.",
      "technique": "Den Lauch gründlich waschen und die Teigtaschen gut verschließen.",
      "essentials": [
        "300 g Weizenmehl",
        "150 ml Wasser",
        "300 g Lauch"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 90 Min.",
        "ingredients": [
          "300 g Weizenmehl",
          "150 ml Wasser",
          "300 g Lauch",
          "1 EL Öl",
          "150 g getrocknete rote Linsen",
          "1 Zwiebel",
          "200 g gehackte Tomaten",
          "200 g Joghurt",
          "Knoblauch",
          "Kreuzkümmel"
        ],
        "steps": [
          "Mehl und Wasser mit etwas Salz zu einem glatten Teig kneten und ruhen lassen.",
          "Lauch waschen, fein schneiden und mit etwas Öl und Salz vermischen.",
          "Teig dünn ausrollen, Kreise ausstechen, mit Lauch füllen und verschließen.",
          "Teigtaschen kochen, bis der Teig gar ist. Linsen mit angebratener Zwiebel, Tomaten und Gewürzen vollständig garen.",
          "Mit Knoblauchjoghurt und Linsensauce servieren."
        ]
      },
      "variants": [
        "Fleischsauce ist ebenfalls üblich; Gandana schmeckt anders als gewöhnlicher Lauch."
      ],
      "serving": [
        "Mit etwas getrockneter Minze servieren."
      ],
      "commonMistakes": [
        "Teigtaschen nicht überfüllen und keinen sandigen Lauch verwenden."
      ]
    }
  },
  "bolani": {
    "en": {
      "overview": "The dough is folded around a thin layer of filling and pan-fried.",
      "history": "Bolani is part of Afghan bread and snack traditions.",
      "flavor": "Crisp, golden exterior and soft, spiced filling.",
      "technique": "Roll the dough thinly and use cooled filling.",
      "essentials": [
        "350 g wheat flour",
        "180 ml water",
        "1 tsp salt"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "6 flatbreads",
        "time": "approx. 60 min",
        "ingredients": [
          "350 g wheat flour",
          "180 ml water",
          "1 tsp salt",
          "400 g potatoes",
          "3 spring onions",
          "coriander",
          "chilli to taste",
          "oil"
        ],
        "steps": [
          "Knead flour, water and salt into a supple dough and leave to rest.",
          "Boil and mash the potatoes, mix with finely chopped spring onions, coriander and chilli. Leave to cool.",
          "Divide the dough into six, roll out and spread filling over one half. Fold and seal.",
          "Fry on both sides in a little oil until the dough is cooked through and golden."
        ]
      },
      "variants": [
        "Leek or pumpkin fillings are other common variations."
      ],
      "serving": [
        "Serve with garlic yoghurt or green chutney."
      ],
      "commonMistakes": [
        "Do not add a thick layer of filling that makes the bread difficult to cook."
      ]
    },
    "fr": {
      "overview": "La pâte est repliée autour d’une fine couche de farce et cuite à la poêle.",
      "history": "Le bolani fait partie des traditions afghanes du pain et des petits plats.",
      "flavor": "Extérieur croustillant et doré, farce tendre et épicée.",
      "technique": "Étaler finement la pâte et utiliser une farce refroidie.",
      "essentials": [
        "350 g de farine de blé",
        "180 ml d’eau",
        "1 c. à café de sel"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "6 pains plats",
        "time": "env. 60 min",
        "ingredients": [
          "350 g de farine de blé",
          "180 ml d’eau",
          "1 c. à café de sel",
          "400 g de pommes de terre",
          "3 oignons nouveaux",
          "coriandre",
          "piment selon le goût",
          "huile"
        ],
        "steps": [
          "Pétrir la farine, l’eau et le sel jusqu’à obtenir une pâte souple et laisser reposer.",
          "Cuire et écraser les pommes de terre, puis mélanger avec les oignons nouveaux finement hachés, la coriandre et le piment. Laisser refroidir.",
          "Diviser la pâte en six, l’étaler et répartir la farce sur une moitié. Replier et fermer.",
          "Cuire des deux côtés dans un peu d’huile jusqu’à ce que la pâte soit bien cuite et dorée."
        ]
      },
      "variants": [
        "Les farces aux poireaux ou au potiron sont d’autres variantes courantes."
      ],
      "serving": [
        "Servir avec du yaourt à l’ail ou du chutney vert."
      ],
      "commonMistakes": [
        "Ne pas mettre une couche de farce trop épaisse qui rendrait la cuisson difficile."
      ]
    },
    "pt": {
      "overview": "A massa é dobrada sobre uma camada fina de recheio e cozinhada numa frigideira.",
      "history": "O bolani faz parte da tradição afegã de pão e petiscos.",
      "flavor": "Exterior dourado e estaladiço, recheio macio e temperado.",
      "technique": "Estender a massa finamente e utilizar recheio arrefecido.",
      "essentials": [
        "350 g de farinha de trigo",
        "180 ml de água",
        "1 colher de chá de sal"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "6 pães achatados",
        "time": "cerca de 60 min",
        "ingredients": [
          "350 g de farinha de trigo",
          "180 ml de água",
          "1 colher de chá de sal",
          "400 g de batatas",
          "3 cebolinhas-verdes",
          "coentros",
          "malagueta a gosto",
          "óleo"
        ],
        "steps": [
          "Amassar a farinha, a água e o sal até obter uma massa maleável e deixar repousar.",
          "Cozer e esmagar as batatas, misturar com cebolinha-verde finamente picada, coentros e malagueta. Deixar arrefecer.",
          "Dividir a massa em seis partes, estender e espalhar o recheio sobre uma metade. Dobrar e fechar.",
          "Fritar de ambos os lados num pouco de óleo até a massa estar cozinhada e dourada."
        ]
      },
      "variants": [
        "Os recheios de alho-francês ou abóbora são outras variantes comuns."
      ],
      "serving": [
        "Servir com iogurte de alho ou chutney verde."
      ],
      "commonMistakes": [
        "Não colocar uma camada espessa de recheio que dificulte a cozedura do pão."
      ]
    },
    "es": {
      "overview": "La masa se dobla alrededor de una capa fina de relleno y se cocina en la sartén.",
      "history": "El bolani forma parte de la tradición afgana de panes y aperitivos.",
      "flavor": "Exterior crujiente y dorado, relleno suave y especiado.",
      "technique": "Estirar la masa fina y utilizar el relleno frío.",
      "essentials": [
        "350 g de harina de trigo",
        "180 ml de agua",
        "1 cucharadita de sal"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "6 panes planos",
        "time": "aprox. 60 min",
        "ingredients": [
          "350 g de harina de trigo",
          "180 ml de agua",
          "1 cucharadita de sal",
          "400 g de patatas",
          "3 cebolletas",
          "cilantro",
          "chile al gusto",
          "aceite"
        ],
        "steps": [
          "Amasar la harina, el agua y la sal hasta obtener una masa flexible y dejar reposar.",
          "Cocer y aplastar las patatas, mezclar con cebolletas picadas finamente, cilantro y chile. Dejar enfriar.",
          "Dividir la masa en seis partes, estirarla y repartir el relleno sobre una mitad. Doblar y sellar.",
          "Freír por ambos lados en un poco de aceite hasta que la masa esté cocida y dorada."
        ]
      },
      "variants": [
        "Los rellenos de puerro o calabaza son otras variantes habituales."
      ],
      "serving": [
        "Servir con yogur al ajo o chutney verde."
      ],
      "commonMistakes": [
        "No poner una capa gruesa de relleno que dificulte la cocción del pan."
      ]
    },
    "de": {
      "overview": "Der Teig wird um eine dünne Schicht Füllung gefaltet und in der Pfanne gebraten.",
      "history": "Bolani gehört zur afghanischen Brot- und Imbisstradition.",
      "flavor": "Knusprige, goldbraune Außenseite und weiche, gewürzte Füllung.",
      "technique": "Den Teig dünn ausrollen und abgekühlte Füllung verwenden.",
      "essentials": [
        "350 g Weizenmehl",
        "180 ml Wasser",
        "1 TL Salz"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "6 Fladenbrote",
        "time": "ca. 60 Min.",
        "ingredients": [
          "350 g Weizenmehl",
          "180 ml Wasser",
          "1 TL Salz",
          "400 g Kartoffeln",
          "3 Frühlingszwiebeln",
          "Koriander",
          "Chili nach Geschmack",
          "Öl"
        ],
        "steps": [
          "Mehl, Wasser und Salz zu einem geschmeidigen Teig kneten und ruhen lassen.",
          "Kartoffeln kochen, zerstampfen und mit fein gehackten Frühlingszwiebeln, Koriander und Chili mischen. Abkühlen lassen.",
          "Den Teig in sechs Teile teilen, ausrollen und die Füllung auf einer Hälfte verteilen. Zusammenklappen und verschließen.",
          "Auf beiden Seiten in etwas Öl braten, bis der Teig durchgegart und goldbraun ist."
        ]
      },
      "variants": [
        "Füllungen mit Lauch oder Kürbis sind weitere übliche Varianten."
      ],
      "serving": [
        "Mit Knoblauchjoghurt oder grünem Chutney servieren."
      ],
      "commonMistakes": [
        "Keine dicke Füllungsschicht auftragen, die das Ausbacken erschwert."
      ]
    }
  },
  "mac-and-cheese": {
    "en": {
      "overview": "Cooked macaroni is mixed with a milk and cheese sauce. The baked version has a golden top.",
      "history": "The dish is an established American everyday and festive dish, including in Southern food traditions.",
      "flavor": "Creamy, salty and rich, with a mild nutty flavour from the cheese.",
      "technique": "Melt the cheese into the hot sauce without boiling vigorously.",
      "essentials": [
        "300 g macaroni",
        "40 g butter",
        "40 g wheat flour"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40 min",
        "ingredients": [
          "300 g macaroni",
          "40 g butter",
          "40 g wheat flour",
          "500 ml milk",
          "250 g cheddar",
          "salt",
          "pepper"
        ],
        "steps": [
          "Cook the macaroni slightly less than the packet instructions suggest.",
          "Melt the butter, stir in the flour and gradually add milk. Simmer until thickened.",
          "Remove the pan from the heat and stir in most of the cheese. Mix with the macaroni.",
          "Transfer to a baking dish, top with the remaining cheese and bake at 200 °C until golden."
        ]
      },
      "variants": [
        "The stovetop version is served without baking; breadcrumbs can provide a crisp topping."
      ],
      "serving": [
        "Serve as a main dish or alongside barbecue food."
      ],
      "commonMistakes": [
        "Do not boil the cheese sauce vigorously after adding the cheese."
      ]
    },
    "fr": {
      "overview": "Les macaronis cuits sont mélangés à une sauce au lait et au fromage. La version au four présente une surface dorée.",
      "history": "Ce plat américain bien établi se sert au quotidien comme lors des fêtes, notamment dans les traditions culinaires du Sud.",
      "flavor": "Crémeux, salé et riche, avec une légère note de noisette apportée par le fromage.",
      "technique": "Faire fondre le fromage dans la sauce chaude sans ébullition forte.",
      "essentials": [
        "300 g de macaronis",
        "40 g de beurre",
        "40 g de farine de blé"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40 min",
        "ingredients": [
          "300 g de macaronis",
          "40 g de beurre",
          "40 g de farine de blé",
          "500 ml de lait",
          "250 g de cheddar",
          "sel",
          "poivre"
        ],
        "steps": [
          "Cuire les macaronis un peu moins longtemps que l’indique le paquet.",
          "Faire fondre le beurre, incorporer la farine puis ajouter progressivement le lait. Laisser mijoter jusqu’à épaississement.",
          "Retirer du feu et incorporer la majeure partie du fromage. Mélanger aux macaronis.",
          "Verser dans un plat, couvrir du fromage restant et gratiner à 200 °C jusqu’à coloration dorée."
        ]
      },
      "variants": [
        "La version à la casserole se sert sans gratiner ; la chapelure peut apporter du croustillant."
      ],
      "serving": [
        "Servir en plat principal ou avec des grillades."
      ],
      "commonMistakes": [
        "Ne pas faire bouillir fortement la sauce après l’ajout du fromage."
      ]
    },
    "pt": {
      "overview": "O macarrão cozido é misturado com um molho de leite e queijo. A versão de forno fica com uma superfície dourada.",
      "history": "É um prato americano consolidado, tanto quotidiano como festivo, nomeadamente nas tradições culinárias do Sul.",
      "flavor": "Cremoso, salgado e encorpado, com um ligeiro sabor a noz do queijo.",
      "technique": "Derreter o queijo no molho quente sem deixar ferver intensamente.",
      "essentials": [
        "300 g de macarrão",
        "40 g de manteiga",
        "40 g de farinha de trigo"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40 min",
        "ingredients": [
          "300 g de macarrão",
          "40 g de manteiga",
          "40 g de farinha de trigo",
          "500 ml de leite",
          "250 g de cheddar",
          "sal",
          "pimenta"
        ],
        "steps": [
          "Cozer o macarrão durante um pouco menos de tempo do que o indicado na embalagem.",
          "Derreter a manteiga, misturar a farinha e juntar o leite aos poucos. Deixar cozinhar em lume brando até engrossar.",
          "Retirar o tacho do lume e incorporar a maior parte do queijo. Misturar com o macarrão.",
          "Colocar num tabuleiro, cobrir com o restante queijo e gratinar a 200 °C até dourar."
        ]
      },
      "variants": [
        "A versão de tacho é servida sem gratinar; o pão ralado pode dar uma cobertura estaladiça."
      ],
      "serving": [
        "Servir como prato principal ou a acompanhar grelhados."
      ],
      "commonMistakes": [
        "Não deixar o molho ferver intensamente depois de juntar o queijo."
      ]
    },
    "es": {
      "overview": "Los macarrones cocidos se mezclan con una salsa de leche y queso. La versión al horno adquiere una superficie dorada.",
      "history": "Es un plato estadounidense habitual tanto a diario como en celebraciones, especialmente en las tradiciones culinarias del Sur.",
      "flavor": "Cremoso, salado e intenso, con un suave sabor a frutos secos aportado por el queso.",
      "technique": "Fundir el queso en la salsa caliente sin hervirla con fuerza.",
      "essentials": [
        "300 g de macarrones",
        "40 g de mantequilla",
        "40 g de harina de trigo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40 min",
        "ingredients": [
          "300 g de macarrones",
          "40 g de mantequilla",
          "40 g de harina de trigo",
          "500 ml de leche",
          "250 g de cheddar",
          "sal",
          "pimienta"
        ],
        "steps": [
          "Cocer los macarrones algo menos de lo que indica el paquete.",
          "Derretir la mantequilla, incorporar la harina y añadir la leche poco a poco. Cocer suavemente hasta espesar.",
          "Retirar del fuego e incorporar la mayor parte del queso. Mezclar con los macarrones.",
          "Poner en una fuente, cubrir con el queso restante y gratinar a 200 °C hasta dorar."
        ]
      },
      "variants": [
        "La versión de cazuela se sirve sin gratinar; el pan rallado puede aportar una cobertura crujiente."
      ],
      "serving": [
        "Servir como plato principal o con carnes a la parrilla."
      ],
      "commonMistakes": [
        "No hervir la salsa con fuerza después de añadir el queso."
      ]
    },
    "de": {
      "overview": "Gekochte Makkaroni werden mit einer Milch-Käse-Sauce vermischt. Die Ofenvariante bekommt eine goldbraune Oberfläche.",
      "history": "Das Gericht ist ein etabliertes amerikanisches Alltags- und Festessen, unter anderem in der Küche der Südstaaten.",
      "flavor": "Cremig, salzig und gehaltvoll, mit einer milden nussigen Käsenote.",
      "technique": "Den Käse in der heißen Sauce schmelzen, ohne sie stark kochen zu lassen.",
      "essentials": [
        "300 g Makkaroni",
        "40 g Butter",
        "40 g Weizenmehl"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40 Min.",
        "ingredients": [
          "300 g Makkaroni",
          "40 g Butter",
          "40 g Weizenmehl",
          "500 ml Milch",
          "250 g Cheddar",
          "Salz",
          "Pfeffer"
        ],
        "steps": [
          "Makkaroni etwas kürzer kochen als auf der Packung angegeben.",
          "Butter schmelzen, Mehl einrühren und nach und nach Milch zugeben. Sauce köcheln lassen, bis sie eindickt.",
          "Topf vom Herd nehmen und den größten Teil des Käses einrühren. Mit den Makkaroni mischen.",
          "In eine Auflaufform geben, mit restlichem Käse bestreuen und bei 200 °C goldbraun überbacken."
        ]
      },
      "variants": [
        "Die Topfvariante wird ohne Überbacken serviert; Semmelbrösel können eine knusprige Kruste ergeben."
      ],
      "serving": [
        "Als Hauptgericht oder zu Grillgerichten servieren."
      ],
      "commonMistakes": [
        "Die Käsesauce nach Zugabe des Käses nicht stark kochen lassen."
      ]
    }
  },
  "buffalo-wings": {
    "en": {
      "overview": "The wings are baked or deep-fried and tossed in a sauce made with hot chilli sauce and butter.",
      "history": "The familiar Buffalo style is associated with Anchor Bar in the 1960s, but the city's chicken-wing tradition is older and the origin story is disputed.",
      "flavor": "Hot, tangy and buttery, with a crisp exterior.",
      "technique": "Dry the wings before cooking and toss them in the sauce just before serving.",
      "essentials": [
        "1 kg chicken wings",
        "1 tbsp oil",
        "salt"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 50 min",
        "ingredients": [
          "1 kg chicken wings",
          "1 tbsp oil",
          "salt",
          "80 ml hot vinegar-based chilli sauce",
          "40 g butter",
          "celery sticks",
          "blue cheese dip"
        ],
        "steps": [
          "Pat the wings dry, toss with oil and salt and arrange on a rack over a baking tray.",
          "Bake at 220 °C until crisp and cooked through, at least 74 °C in the thickest meat without touching the bone.",
          "Melt the butter and mix with the chilli sauce.",
          "Toss the wings in the sauce and serve immediately."
        ]
      },
      "variants": [
        "The home version is oven-baked; classic Buffalo wings are often deep-fried."
      ],
      "serving": [
        "Serve with celery and blue cheese dip."
      ],
      "commonMistakes": [
        "Do not leave the wings in the sauce for long if they are to stay crisp."
      ]
    },
    "fr": {
      "overview": "Les ailes sont cuites au four ou frites, puis enrobées d’une sauce à base de sauce pimentée et de beurre.",
      "history": "Le style Buffalo bien connu est associé à l’Anchor Bar dans les années 1960, mais la tradition locale des ailes de poulet est plus ancienne et le récit des origines est discuté.",
      "flavor": "Piquant, acidulé et beurré, avec une surface croustillante.",
      "technique": "Sécher les ailes avant cuisson et les enrober de sauce juste avant de servir.",
      "essentials": [
        "1 kg d’ailes de poulet",
        "1 c. à soupe d’huile",
        "sel"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 50 min",
        "ingredients": [
          "1 kg d’ailes de poulet",
          "1 c. à soupe d’huile",
          "sel",
          "80 ml de sauce pimentée forte à base de vinaigre",
          "40 g de beurre",
          "bâtonnets de céleri",
          "sauce au fromage bleu"
        ],
        "steps": [
          "Sécher les ailes, les mélanger avec l’huile et le sel, puis les disposer sur une grille au-dessus d’une plaque.",
          "Cuire à 220 °C jusqu’à ce qu’elles soient croustillantes et bien cuites, au moins 74 °C dans la partie la plus épaisse sans toucher l’os.",
          "Faire fondre le beurre et mélanger à la sauce pimentée.",
          "Enrober les ailes de sauce et servir aussitôt."
        ]
      },
      "variants": [
        "La version maison est cuite au four ; les Buffalo wings classiques sont souvent frites."
      ],
      "serving": [
        "Servir avec du céleri et une sauce au fromage bleu."
      ],
      "commonMistakes": [
        "Ne pas laisser les ailes longtemps dans la sauce si elles doivent rester croustillantes."
      ]
    },
    "pt": {
      "overview": "As asas são assadas ou fritas e envolvidas num molho à base de molho picante de malagueta e manteiga.",
      "history": "O conhecido estilo Buffalo está associado ao Anchor Bar na década de 1960, mas a tradição de asas de frango da cidade é mais antiga e a história da sua origem é contestada.",
      "flavor": "Picante, ácido e amanteigado, com exterior estaladiço.",
      "technique": "Secar as asas antes de cozinhar e envolvê-las no molho apenas na altura de servir.",
      "essentials": [
        "1 kg de asas de frango",
        "1 colher de sopa de óleo",
        "sal"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 50 min",
        "ingredients": [
          "1 kg de asas de frango",
          "1 colher de sopa de óleo",
          "sal",
          "80 ml de molho picante de malagueta à base de vinagre",
          "40 g de manteiga",
          "palitos de aipo",
          "molho de queijo azul"
        ],
        "steps": [
          "Secar as asas, envolver em óleo e sal e distribuir numa grelha sobre um tabuleiro de forno.",
          "Assar a 220 °C até ficarem estaladiças e bem cozinhadas, com pelo menos 74 °C na parte mais espessa da carne, sem tocar no osso.",
          "Derreter a manteiga e misturar com o molho picante.",
          "Envolver as asas no molho e servir de imediato."
        ]
      },
      "variants": [
        "A versão caseira é assada no forno; as Buffalo wings clássicas são frequentemente fritas em óleo abundante."
      ],
      "serving": [
        "Servir com aipo e molho de queijo azul."
      ],
      "commonMistakes": [
        "Não deixar as asas muito tempo no molho se se pretende que fiquem estaladiças."
      ]
    },
    "es": {
      "overview": "Las alitas se asan o se fríen y se mezclan con una salsa a base de salsa picante de chile y mantequilla.",
      "history": "El conocido estilo Buffalo se asocia al Anchor Bar en la década de 1960, pero la tradición local de alitas de pollo es anterior y su origen es objeto de debate.",
      "flavor": "Picante, ácido y con sabor a mantequilla, con un exterior crujiente.",
      "technique": "Secar las alitas antes de cocinarlas y mezclarlas con la salsa justo al servir.",
      "essentials": [
        "1 kg de alitas de pollo",
        "1 cucharada de aceite",
        "sal"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 50 min",
        "ingredients": [
          "1 kg de alitas de pollo",
          "1 cucharada de aceite",
          "sal",
          "80 ml de salsa picante de chile a base de vinagre",
          "40 g de mantequilla",
          "bastones de apio",
          "salsa de queso azul"
        ],
        "steps": [
          "Secar las alitas, mezclarlas con aceite y sal y colocarlas en una rejilla sobre una bandeja de horno.",
          "Hornear a 220 °C hasta que estén crujientes y bien hechas, con al menos 74 °C en la parte más gruesa de la carne sin tocar el hueso.",
          "Derretir la mantequilla y mezclar con la salsa picante.",
          "Mezclar las alitas con la salsa y servir inmediatamente."
        ]
      },
      "variants": [
        "La versión casera se hornea; las Buffalo wings clásicas suelen freírse en abundante aceite."
      ],
      "serving": [
        "Servir con apio y salsa de queso azul."
      ],
      "commonMistakes": [
        "No dejar las alitas mucho tiempo en la salsa si se quiere que sigan crujientes."
      ]
    },
    "de": {
      "overview": "Die Flügel werden gebacken oder frittiert und in einer Sauce aus scharfer Chilisauce und Butter gewendet.",
      "history": "Der bekannte Buffalo-Stil wird mit der Anchor Bar in den 1960er-Jahren in Verbindung gebracht, doch die Chicken-Wings-Tradition der Stadt ist älter und die Ursprungsgeschichte umstritten.",
      "flavor": "Scharf, säuerlich und buttrig mit knuspriger Oberfläche.",
      "technique": "Die Flügel vor dem Garen trocknen und erst beim Servieren in der Sauce wenden.",
      "essentials": [
        "1 kg Hähnchenflügel",
        "1 EL Öl",
        "Salz"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 50 Min.",
        "ingredients": [
          "1 kg Hähnchenflügel",
          "1 EL Öl",
          "Salz",
          "80 ml scharfe essigbasierte Chilisauce",
          "40 g Butter",
          "Selleriestangen",
          "Blauschimmelkäse-Dip"
        ],
        "steps": [
          "Flügel trocken tupfen, in Öl und Salz wenden und auf einem Rost über einem Backblech verteilen.",
          "Bei 220 °C knusprig und durchgaren, bis an der dicksten Fleischstelle mindestens 74 °C erreicht sind, ohne den Knochen zu berühren.",
          "Butter schmelzen und mit der Chilisauce mischen.",
          "Flügel in der Sauce wenden und sofort servieren."
        ]
      },
      "variants": [
        "Die Hausvariante wird im Ofen gebacken; klassische Buffalo Wings werden oft frittiert."
      ],
      "serving": [
        "Mit Sellerie und Blauschimmelkäse-Dip servieren."
      ],
      "commonMistakes": [
        "Die Flügel nicht lange in der Sauce liegen lassen, wenn sie knusprig bleiben sollen."
      ]
    }
  }
} as const satisfies Record<string, Record<InternationalSummaryLocale, ArticleBody>>;
