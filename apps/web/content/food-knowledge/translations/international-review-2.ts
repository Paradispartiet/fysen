import type { FoodKnowledgeArticle } from "../types.ts";
import type { InternationalSummaryLocale } from "../../../lib/international-summary-drafts.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
// Review-only bodies. Compose with translated summaries and untouched original IDs/sources after review.
export const draftInternationalArticles2 = {
  "malai-kofta": {
    "en": {
      "overview": "Potato and paneer balls are fried or deep-fried and served with a creamy sauce.",
      "history": "The dish is known from North Indian restaurant and festive cuisine.",
      "flavor": "Mildly spiced, creamy and soft.",
      "technique": "Keep the kofta balls relatively dry before frying.",
      "essentials": [
        "300 g cooked potatoes",
        "200 g paneer",
        "2 tbsp cornflour"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40–60 min",
        "ingredients": [
          "300 g cooked potatoes",
          "200 g paneer",
          "2 tbsp cornflour",
          "1 onion",
          "300 g tomatoes",
          "50 g cashews",
          "100 ml cream",
          "garam masala",
          "oil"
        ],
        "steps": [
          "Mash the potatoes and paneer, mix with the starch and form balls.",
          "Fry or deep-fry the balls until golden.",
          "Cook the onion, tomatoes and cashews and blend until smooth.",
          "Season the sauce with spices and cream; add the balls just before serving."
        ]
      },
      "variants": [
        "Kofta can also be made with other vegetables."
      ],
      "serving": [
        "Serve with naan or rice."
      ],
      "commonMistakes": [
        "Do not leave the balls in the sauce for a long time before serving."
      ]
    },
    "fr": {
      "overview": "Des boulettes de pommes de terre et de paneer sont poêlées ou frites et servies avec une sauce crémeuse.",
      "history": "Le plat est connu dans la cuisine festive et les restaurants du nord de l’Inde.",
      "flavor": "Légèrement épicé, crémeux et tendre.",
      "technique": "Veiller à ce que les boulettes de kofta soient relativement sèches avant la cuisson.",
      "essentials": [
        "300 g de pommes de terre cuites",
        "200 g de paneer",
        "2 c. à soupe de fécule de maïs"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40–60 min",
        "ingredients": [
          "300 g de pommes de terre cuites",
          "200 g de paneer",
          "2 c. à soupe de fécule de maïs",
          "1 oignon",
          "300 g de tomates",
          "50 g de noix de cajou",
          "100 ml de crème",
          "garam masala",
          "huile"
        ],
        "steps": [
          "Écraser les pommes de terre et le paneer, mélanger avec la fécule et former des boulettes.",
          "Faire dorer les boulettes à la poêle ou en friture.",
          "Cuire l’oignon, les tomates et les noix de cajou, puis mixer jusqu’à obtenir une sauce lisse.",
          "Assaisonner la sauce avec les épices et la crème ; ajouter les boulettes juste avant de servir."
        ]
      },
      "variants": [
        "Les kofta peuvent aussi être préparées avec d’autres légumes."
      ],
      "serving": [
        "Servir avec du naan ou du riz."
      ],
      "commonMistakes": [
        "Ne pas laisser les boulettes longtemps dans la sauce avant de servir."
      ]
    },
    "pt": {
      "overview": "Bolinhas de batata e paneer são salteadas ou fritas e servidas com um molho cremoso.",
      "history": "O prato é conhecido na cozinha festiva e de restaurante do norte da Índia.",
      "flavor": "Ligeiramente condimentado, cremoso e macio.",
      "technique": "Mantenha as bolinhas de kofta relativamente secas antes de fritar.",
      "essentials": [
        "300 g de batatas cozidas",
        "200 g de paneer",
        "2 c. de sopa de amido de milho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40–60 min",
        "ingredients": [
          "300 g de batatas cozidas",
          "200 g de paneer",
          "2 c. de sopa de amido de milho",
          "1 cebola",
          "300 g de tomate",
          "50 g de cajus",
          "100 ml de natas",
          "garam masala",
          "óleo"
        ],
        "steps": [
          "Esmague as batatas e o paneer, misture com o amido e forme bolinhas.",
          "Salteie ou frite as bolinhas até dourarem.",
          "Coza a cebola, o tomate e os cajus e triture até obter um creme liso.",
          "Tempere o molho com especiarias e natas; junte as bolinhas imediatamente antes de servir."
        ]
      },
      "variants": [
        "As kofta também podem ser feitas com outros legumes."
      ],
      "serving": [
        "Sirva com naan ou arroz."
      ],
      "commonMistakes": [
        "Não deixe as bolinhas muito tempo no molho antes de servir."
      ]
    },
    "es": {
      "overview": "Las bolas de patata y paneer se doran o fríen y se sirven con una salsa cremosa.",
      "history": "El plato es conocido en la cocina festiva y de restaurante del norte de la India.",
      "flavor": "Suavemente especiado, cremoso y tierno.",
      "technique": "Mantén las bolas de kofta relativamente secas antes de freírlas.",
      "essentials": [
        "300 g de patatas cocidas",
        "200 g de paneer",
        "2 cucharadas de almidón de maíz"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40–60 min",
        "ingredients": [
          "300 g de patatas cocidas",
          "200 g de paneer",
          "2 cucharadas de almidón de maíz",
          "1 cebolla",
          "300 g de tomates",
          "50 g de anacardos",
          "100 ml de nata",
          "garam masala",
          "aceite"
        ],
        "steps": [
          "Tritura las patatas y el paneer, mezcla con el almidón y forma bolas.",
          "Dora o fríe las bolas hasta que estén doradas.",
          "Cuece la cebolla, los tomates y los anacardos y tritura hasta obtener una crema lisa.",
          "Sazona la salsa con especias y nata; añade las bolas justo antes de servir."
        ]
      },
      "variants": [
        "Las kofta también pueden prepararse con otras verduras."
      ],
      "serving": [
        "Sirve con naan o arroz."
      ],
      "commonMistakes": [
        "No dejes las bolas mucho tiempo en la salsa antes de servir."
      ]
    },
    "de": {
      "overview": "Kartoffel-Paneer-Bällchen werden gebraten oder frittiert und mit einer cremigen Sauce serviert.",
      "history": "Das Gericht ist aus der nordindischen Restaurant- und Festküche bekannt.",
      "flavor": "Mild gewürzt, cremig und weich.",
      "technique": "Kofta-Bällchen vor dem Braten möglichst trocken halten.",
      "essentials": [
        "300 g gekochte Kartoffeln",
        "200 g Paneer",
        "2 EL Maisstärke"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40–60 Min.",
        "ingredients": [
          "300 g gekochte Kartoffeln",
          "200 g Paneer",
          "2 EL Maisstärke",
          "1 Zwiebel",
          "300 g Tomaten",
          "50 g Cashewkerne",
          "100 ml Sahne",
          "Garam Masala",
          "Öl"
        ],
        "steps": [
          "Kartoffeln und Paneer zerdrücken, mit Stärke mischen und Bällchen formen.",
          "Bällchen goldbraun braten oder frittieren.",
          "Zwiebel, Tomaten und Cashewkerne kochen und glatt pürieren.",
          "Sauce mit Gewürzen und Sahne abschmecken; Bällchen erst kurz vor dem Servieren hineingeben."
        ]
      },
      "variants": [
        "Kofta können auch aus anderem Gemüse zubereitet werden."
      ],
      "serving": [
        "Mit Naan oder Reis servieren."
      ],
      "commonMistakes": [
        "Bällchen vor dem Servieren nicht lange in der Sauce liegen lassen."
      ]
    }
  },
  "aloo-gobi": {
    "en": {
      "overview": "Potatoes and cauliflower are fried or simmered together with aromatics.",
      "history": "Aloo gobi is common in North Indian and Pakistani home cooking.",
      "flavor": "Earthy, mildly hot and aromatic.",
      "technique": "Adjust the cooking time so the cauliflower retains its shape.",
      "essentials": [
        "400 g potatoes",
        "1 small cauliflower",
        "1 onion"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40–60 min",
        "ingredients": [
          "400 g potatoes",
          "1 small cauliflower",
          "1 onion",
          "2 tomatoes",
          "ginger",
          "cumin",
          "turmeric",
          "coriander",
          "oil"
        ],
        "steps": [
          "Fry the cumin, onion and ginger.",
          "Add the tomatoes and spices.",
          "Fold in the potato pieces and a little water; simmer covered.",
          "Add the cauliflower and cook until the vegetables are tender."
        ]
      },
      "variants": [
        "Dry and saucier versions exist."
      ],
      "serving": [
        "Serve with roti and dal."
      ],
      "commonMistakes": [
        "Do not add too much water or cook the cauliflower until mushy."
      ]
    },
    "fr": {
      "overview": "Les pommes de terre et le chou-fleur sont sautés ou mijotés avec des aromates.",
      "history": "L’aloo gobi est courant dans la cuisine familiale du nord de l’Inde et du Pakistan.",
      "flavor": "Terreux, légèrement piquant et aromatique.",
      "technique": "Adapter le temps de cuisson pour que le chou-fleur conserve sa forme.",
      "essentials": [
        "400 g de pommes de terre",
        "1 petit chou-fleur",
        "1 oignon"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40–60 min",
        "ingredients": [
          "400 g de pommes de terre",
          "1 petit chou-fleur",
          "1 oignon",
          "2 tomates",
          "gingembre",
          "cumin",
          "curcuma",
          "coriandre",
          "huile"
        ],
        "steps": [
          "Faire revenir le cumin, l’oignon et le gingembre.",
          "Ajouter les tomates et les épices.",
          "Incorporer les morceaux de pommes de terre et un peu d’eau ; laisser mijoter à couvert.",
          "Ajouter le chou-fleur et cuire jusqu’à ce que les légumes soient tendres."
        ]
      },
      "variants": [
        "Il existe des variantes sèches et d’autres plus riches en sauce."
      ],
      "serving": [
        "Servir avec du roti et du dal."
      ],
      "commonMistakes": [
        "Ne pas ajouter trop d’eau ni cuire le chou-fleur jusqu’à ce qu’il se défasse."
      ]
    },
    "pt": {
      "overview": "As batatas e a couve-flor são salteadas ou cozinhadas em lume brando com aromáticos.",
      "history": "O aloo gobi é comum na cozinha caseira do norte da Índia e do Paquistão.",
      "flavor": "Terroso, ligeiramente picante e aromático.",
      "technique": "Ajuste o tempo de cozedura para que a couve-flor mantenha a forma.",
      "essentials": [
        "400 g de batatas",
        "1 couve-flor pequena",
        "1 cebola"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40–60 min",
        "ingredients": [
          "400 g de batatas",
          "1 couve-flor pequena",
          "1 cebola",
          "2 tomates",
          "gengibre",
          "cominhos",
          "curcuma",
          "coentros",
          "óleo"
        ],
        "steps": [
          "Salteie os cominhos, a cebola e o gengibre.",
          "Junte o tomate e as especiarias.",
          "Envolva os pedaços de batata e um pouco de água; deixe cozinhar em lume brando com tampa.",
          "Junte a couve-flor e coza até os legumes ficarem tenros."
        ]
      },
      "variants": [
        "Existem versões secas e outras com mais molho."
      ],
      "serving": [
        "Sirva com roti e dal."
      ],
      "commonMistakes": [
        "Não junte demasiada água nem deixe a couve-flor desfazer-se."
      ]
    },
    "es": {
      "overview": "Las patatas y la coliflor se saltean o cuecen a fuego lento con aromáticos.",
      "history": "El aloo gobi es habitual en la cocina casera del norte de la India y de Pakistán.",
      "flavor": "Terroso, ligeramente picante y aromático.",
      "technique": "Ajusta el tiempo de cocción para que la coliflor conserve su forma.",
      "essentials": [
        "400 g de patatas",
        "1 coliflor pequeña",
        "1 cebolla"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40–60 min",
        "ingredients": [
          "400 g de patatas",
          "1 coliflor pequeña",
          "1 cebolla",
          "2 tomates",
          "jengibre",
          "comino",
          "cúrcuma",
          "cilantro",
          "aceite"
        ],
        "steps": [
          "Sofríe el comino, la cebolla y el jengibre.",
          "Añade los tomates y las especias.",
          "Incorpora los trozos de patata y un poco de agua; cuece a fuego lento con tapa.",
          "Añade la coliflor y cuece hasta que las verduras estén tiernas."
        ]
      },
      "variants": [
        "Existen versiones secas y otras con más salsa."
      ],
      "serving": [
        "Sirve con roti y dal."
      ],
      "commonMistakes": [
        "No añadas demasiada agua ni cuezas la coliflor hasta que se deshaga."
      ]
    },
    "de": {
      "overview": "Kartoffeln und Blumenkohl werden mit Aromaten gebraten oder sanft gegart.",
      "history": "Aloo Gobi ist in der nordindischen und pakistanischen Hausmannskost verbreitet.",
      "flavor": "Erdig, mild scharf und aromatisch.",
      "technique": "Garzeit so anpassen, dass der Blumenkohl seine Form behält.",
      "essentials": [
        "400 g Kartoffeln",
        "1 kleiner Blumenkohl",
        "1 Zwiebel"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40–60 Min.",
        "ingredients": [
          "400 g Kartoffeln",
          "1 kleiner Blumenkohl",
          "1 Zwiebel",
          "2 Tomaten",
          "Ingwer",
          "Kreuzkümmel",
          "Kurkuma",
          "Koriander",
          "Öl"
        ],
        "steps": [
          "Kreuzkümmel, Zwiebel und Ingwer anbraten.",
          "Tomaten und Gewürze hinzufügen.",
          "Kartoffelstücke und etwas Wasser unterheben; zugedeckt ziehen lassen.",
          "Blumenkohl hinzufügen und das Gemüse weich garen."
        ]
      },
      "variants": [
        "Es gibt trockene Varianten und solche mit mehr Sauce."
      ],
      "serving": [
        "Mit Roti und Dal servieren."
      ],
      "commonMistakes": [
        "Nicht zu viel Wasser zugeben und Blumenkohl nicht zu Brei kochen."
      ]
    }
  },
  "lasagne-alla-bolognese": {
    "en": {
      "overview": "Pasta sheets are layered with meat sauce and white sauce.",
      "history": "The dish is associated with Bologna and the fresh pasta tradition of Emilia-Romagna.",
      "flavor": "Rich and creamy, with a gratinated surface.",
      "technique": "Cook the ragù slowly and distribute the sauces evenly.",
      "essentials": [
        "250 g lasagne sheets",
        "400 g minced meat",
        "1 onion"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 2 hours",
        "ingredients": [
          "250 g lasagne sheets",
          "400 g minced meat",
          "1 onion",
          "1 carrot",
          "1 celery stalk",
          "400 g tomatoes",
          "500 ml milk",
          "40 g butter",
          "40 g flour",
          "80 g Parmesan"
        ],
        "steps": [
          "Fry the finely chopped vegetables and brown the meat.",
          "Add the tomatoes and simmer the sauce for at least an hour.",
          "Make béchamel from butter, flour and milk.",
          "Layer the sauces and pasta sheets in a baking dish and top with Parmesan.",
          "Bake at 190 °C until the pasta is tender and the top is golden."
        ]
      },
      "variants": [
        "Green spinach pasta sheets are traditionally used in Bologna."
      ],
      "serving": [
        "Let the lasagne rest before slicing."
      ],
      "commonMistakes": [
        "Do not leave dry pasta sheets without sufficient sauce."
      ]
    },
    "fr": {
      "overview": "Les feuilles de pâte sont disposées en couches avec de la sauce à la viande et de la sauce blanche.",
      "history": "Le plat est associé à Bologne et à la tradition des pâtes fraîches d’Émilie-Romagne.",
      "flavor": "Généreux et crémeux, avec une surface gratinée.",
      "technique": "Faire mijoter lentement le ragù et répartir les sauces uniformément.",
      "essentials": [
        "250 g de feuilles de lasagne",
        "400 g de viande hachée",
        "1 oignon"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 2 heures",
        "ingredients": [
          "250 g de feuilles de lasagne",
          "400 g de viande hachée",
          "1 oignon",
          "1 carotte",
          "1 branche de céleri",
          "400 g de tomates",
          "500 ml de lait",
          "40 g de beurre",
          "40 g de farine",
          "80 g de parmesan"
        ],
        "steps": [
          "Faire revenir les légumes finement hachés et dorer la viande.",
          "Ajouter les tomates et laisser mijoter la sauce pendant au moins une heure.",
          "Préparer une béchamel avec le beurre, la farine et le lait.",
          "Disposer les sauces et les feuilles de pâte en couches dans un plat, puis couvrir de parmesan.",
          "Cuire au four à 190 °C jusqu’à ce que les pâtes soient tendres et le dessus doré."
        ]
      },
      "variants": [
        "Les feuilles de pâte verte aux épinards sont traditionnellement utilisées à Bologne."
      ],
      "serving": [
        "Laisser reposer les lasagnes avant de les découper."
      ],
      "commonMistakes": [
        "Ne pas laisser les feuilles de pâte sèches sans suffisamment de sauce."
      ]
    },
    "pt": {
      "overview": "As folhas de massa são dispostas em camadas com molho de carne e molho branco.",
      "history": "O prato está associado a Bolonha e à tradição de massa fresca da Emília-Romanha.",
      "flavor": "Encorpado e cremoso, com superfície gratinada.",
      "technique": "Cozinhe o ragù lentamente e distribua os molhos uniformemente.",
      "essentials": [
        "250 g de folhas de lasanha",
        "400 g de carne picada",
        "1 cebola"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 2 horas",
        "ingredients": [
          "250 g de folhas de lasanha",
          "400 g de carne picada",
          "1 cebola",
          "1 cenoura",
          "1 talo de aipo",
          "400 g de tomate",
          "500 ml de leite",
          "40 g de manteiga",
          "40 g de farinha",
          "80 g de parmesão"
        ],
        "steps": [
          "Salteie os legumes finamente picados e doure a carne.",
          "Junte o tomate e deixe o molho cozinhar em lume brando durante pelo menos uma hora.",
          "Prepare um molho béchamel com manteiga, farinha e leite.",
          "Disponha os molhos e as folhas de massa em camadas num tabuleiro e cubra com parmesão.",
          "Leve ao forno a 190 °C até a massa estar tenra e a superfície dourada."
        ]
      },
      "variants": [
        "Em Bolonha usam-se tradicionalmente folhas de massa verde com espinafres."
      ],
      "serving": [
        "Deixe a lasanha repousar antes de a cortar."
      ],
      "commonMistakes": [
        "Não deixe folhas de massa secas sem molho suficiente."
      ]
    },
    "es": {
      "overview": "Las láminas de pasta se colocan en capas con salsa de carne y salsa blanca.",
      "history": "El plato se asocia con Bolonia y la tradición de pasta fresca de Emilia-Romaña.",
      "flavor": "Intenso y cremoso, con una superficie gratinada.",
      "technique": "Cuece el ragú lentamente y reparte las salsas de manera uniforme.",
      "essentials": [
        "250 g de láminas de lasaña",
        "400 g de carne picada",
        "1 cebolla"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 2 horas",
        "ingredients": [
          "250 g de láminas de lasaña",
          "400 g de carne picada",
          "1 cebolla",
          "1 zanahoria",
          "1 tallo de apio",
          "400 g de tomates",
          "500 ml de leche",
          "40 g de mantequilla",
          "40 g de harina",
          "80 g de parmesano"
        ],
        "steps": [
          "Sofríe las verduras finamente picadas y dora la carne.",
          "Añade los tomates y cuece la salsa a fuego lento durante al menos una hora.",
          "Prepara una bechamel con mantequilla, harina y leche.",
          "Coloca las salsas y las láminas de pasta en capas en una fuente y cubre con parmesano.",
          "Hornea a 190 °C hasta que la pasta esté tierna y la superficie dorada."
        ]
      },
      "variants": [
        "En Bolonia se utilizan tradicionalmente láminas de pasta verde de espinacas."
      ],
      "serving": [
        "Deja reposar la lasaña antes de cortarla."
      ],
      "commonMistakes": [
        "No dejes láminas de pasta secas sin suficiente salsa."
      ]
    },
    "de": {
      "overview": "Nudelplatten werden mit Fleischsauce und weißer Sauce geschichtet.",
      "history": "Das Gericht ist mit Bologna und der Frischpastatradition der Emilia-Romagna verbunden.",
      "flavor": "Kräftig und cremig mit überbackener Oberfläche.",
      "technique": "Ragù langsam kochen und die Saucen gleichmäßig verteilen.",
      "essentials": [
        "250 g Lasagneplatten",
        "400 g Hackfleisch",
        "1 Zwiebel"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 2 Stunden",
        "ingredients": [
          "250 g Lasagneplatten",
          "400 g Hackfleisch",
          "1 Zwiebel",
          "1 Karotte",
          "1 Stange Sellerie",
          "400 g Tomaten",
          "500 ml Milch",
          "40 g Butter",
          "40 g Mehl",
          "80 g Parmesan"
        ],
        "steps": [
          "Fein gehacktes Gemüse anbraten und Fleisch bräunen.",
          "Tomaten hinzufügen und die Sauce mindestens eine Stunde köcheln lassen.",
          "Béchamel aus Butter, Mehl und Milch zubereiten.",
          "Saucen und Nudelplatten in einer Auflaufform schichten und mit Parmesan bestreuen.",
          "Bei 190 °C backen, bis die Nudeln weich und die Oberfläche goldbraun sind."
        ]
      },
      "variants": [
        "In Bologna werden traditionell grüne Spinat-Nudelplatten verwendet."
      ],
      "serving": [
        "Lasagne vor dem Anschneiden ruhen lassen."
      ],
      "commonMistakes": [
        "Trockene Nudelplatten nicht ohne ausreichend Sauce lassen."
      ]
    }
  },
  "risotto-alla-milanese": {
    "en": {
      "overview": "Rice is cooked gradually with stock and finished with butter and cheese.",
      "history": "Saffron risotto is a classic Milanese dish, often served with ossobuco.",
      "flavor": "Mildly nutty, aromatic and rich.",
      "technique": "Use hot stock and finish with butter and cheese off the heat.",
      "essentials": [
        "320 g Carnaroli rice",
        "1 small onion",
        "1 l hot stock"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 35 min",
        "ingredients": [
          "320 g Carnaroli rice",
          "1 small onion",
          "1 l hot stock",
          "1 dl white wine or extra stock",
          "saffron",
          "50 g butter",
          "60 g Parmesan"
        ],
        "steps": [
          "Fry the onion in a little butter and add the rice.",
          "Add wine or stock and let the liquid absorb.",
          "Gradually add hot stock while stirring.",
          "Stir in the saffron towards the end and cook until the rice is al dente.",
          "Remove from the heat and stir in butter and Parmesan."
        ]
      },
      "variants": [
        "Traditional versions may contain beef marrow."
      ],
      "serving": [
        "Serve immediately, on its own or with ossobuco."
      ],
      "commonMistakes": [
        "Do not cook the rice into mush or let the risotto become dry."
      ]
    },
    "fr": {
      "overview": "Le riz cuit progressivement avec le bouillon, puis est lié au beurre et au fromage.",
      "history": "Le risotto au safran est un classique de Milan, souvent servi avec de l’ossobuco.",
      "flavor": "Légèrement noisetté, aromatique et généreux.",
      "technique": "Utiliser du bouillon chaud et incorporer le beurre et le fromage hors du feu.",
      "essentials": [
        "320 g de riz carnaroli",
        "1 petit oignon",
        "1 l de bouillon chaud"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 35 min",
        "ingredients": [
          "320 g de riz carnaroli",
          "1 petit oignon",
          "1 l de bouillon chaud",
          "1 dl de vin blanc ou de bouillon supplémentaire",
          "safran",
          "50 g de beurre",
          "60 g de parmesan"
        ],
        "steps": [
          "Faire revenir l’oignon dans un peu de beurre et ajouter le riz.",
          "Ajouter le vin ou le bouillon et laisser le riz absorber le liquide.",
          "Ajouter progressivement le bouillon chaud en remuant.",
          "Incorporer le safran en fin de cuisson et cuire jusqu’à ce que le riz soit al dente.",
          "Retirer du feu et incorporer le beurre et le parmesan."
        ]
      },
      "variants": [
        "Les versions traditionnelles peuvent contenir de la moelle de bœuf."
      ],
      "serving": [
        "Servir immédiatement, seul ou avec de l’ossobuco."
      ],
      "commonMistakes": [
        "Ne pas cuire le riz jusqu’à ce qu’il devienne pâteux ni laisser le risotto se dessécher."
      ]
    },
    "pt": {
      "overview": "O arroz é cozinhado gradualmente com caldo e finalizado com manteiga e queijo.",
      "history": "O risoto de açafrão é um clássico de Milão, muitas vezes servido com ossobuco.",
      "flavor": "Com ligeiras notas de frutos secos, aromático e encorpado.",
      "technique": "Use caldo quente e finalize com manteiga e queijo fora do lume.",
      "essentials": [
        "320 g de arroz carnaroli",
        "1 cebola pequena",
        "1 l de caldo quente"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 35 min",
        "ingredients": [
          "320 g de arroz carnaroli",
          "1 cebola pequena",
          "1 l de caldo quente",
          "1 dl de vinho branco ou caldo adicional",
          "açafrão",
          "50 g de manteiga",
          "60 g de parmesão"
        ],
        "steps": [
          "Salteie a cebola num pouco de manteiga e junte o arroz.",
          "Junte o vinho ou o caldo e deixe o líquido ser absorvido.",
          "Junte gradualmente o caldo quente, mexendo.",
          "Junte o açafrão perto do fim e cozinhe até o arroz estar al dente.",
          "Retire do lume e incorpore a manteiga e o parmesão."
        ]
      },
      "variants": [
        "As versões tradicionais podem conter tutano de vaca."
      ],
      "serving": [
        "Sirva imediatamente, simples ou com ossobuco."
      ],
      "commonMistakes": [
        "Não deixe o arroz desfazer-se nem deixe o risoto ficar seco."
      ]
    },
    "es": {
      "overview": "El arroz se cuece gradualmente con caldo y se termina con mantequilla y queso.",
      "history": "El risotto de azafrán es un clásico de Milán, a menudo servido con ossobuco.",
      "flavor": "Con ligeras notas de frutos secos, aromático y con cuerpo.",
      "technique": "Usa caldo caliente y termina con mantequilla y queso fuera del fuego.",
      "essentials": [
        "320 g de arroz carnaroli",
        "1 cebolla pequeña",
        "1 l de caldo caliente"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 35 min",
        "ingredients": [
          "320 g de arroz carnaroli",
          "1 cebolla pequeña",
          "1 l de caldo caliente",
          "1 dl de vino blanco o caldo adicional",
          "azafrán",
          "50 g de mantequilla",
          "60 g de parmesano"
        ],
        "steps": [
          "Sofríe la cebolla en un poco de mantequilla y añade el arroz.",
          "Añade el vino o el caldo y deja que se absorba el líquido.",
          "Añade gradualmente el caldo caliente sin dejar de remover.",
          "Incorpora el azafrán hacia el final y cuece hasta que el arroz esté al dente.",
          "Retira del fuego e incorpora la mantequilla y el parmesano."
        ]
      },
      "variants": [
        "Las versiones tradicionales pueden contener tuétano de vacuno."
      ],
      "serving": [
        "Sirve inmediatamente, solo o con ossobuco."
      ],
      "commonMistakes": [
        "No cuezas el arroz hasta que se deshaga ni dejes que el risotto se seque."
      ]
    },
    "de": {
      "overview": "Reis wird nach und nach mit Brühe gegart und mit Butter und Käse vollendet.",
      "history": "Safranrisotto ist ein Mailänder Klassiker, oft zusammen mit Ossobuco serviert.",
      "flavor": "Mild nussig, aromatisch und vollmundig.",
      "technique": "Heiße Brühe verwenden und Butter und Käse abseits der Hitze einrühren.",
      "essentials": [
        "320 g Carnaroli-Reis",
        "1 kleine Zwiebel",
        "1 l heiße Brühe"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 35 Min.",
        "ingredients": [
          "320 g Carnaroli-Reis",
          "1 kleine Zwiebel",
          "1 l heiße Brühe",
          "1 dl Weißwein oder zusätzliche Brühe",
          "Safran",
          "50 g Butter",
          "60 g Parmesan"
        ],
        "steps": [
          "Zwiebel in etwas Butter anschwitzen und Reis hinzufügen.",
          "Wein oder Brühe hinzufügen und die Flüssigkeit aufnehmen lassen.",
          "Heiße Brühe nach und nach unter Rühren hinzufügen.",
          "Safran gegen Ende einrühren und Reis al dente garen.",
          "Vom Herd nehmen und Butter und Parmesan einrühren."
        ]
      },
      "variants": [
        "Traditionelle Varianten können Rindermark enthalten."
      ],
      "serving": [
        "Sofort servieren, allein oder mit Ossobuco."
      ],
      "commonMistakes": [
        "Reis nicht zu Brei kochen und Risotto nicht trocken werden lassen."
      ]
    }
  },
  "ossobuco": {
    "en": {
      "overview": "The shank is braised with vegetables and stock until the meat becomes tender.",
      "history": "Ossobuco alla milanese belongs to Milan’s classic cuisine.",
      "flavor": "Rich meat flavour with fresh lemon and parsley.",
      "technique": "Braise over low heat with a lid.",
      "essentials": [
        "4 slices of veal shank",
        "1 onion",
        "1 carrot"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 2.5 hours",
        "ingredients": [
          "4 slices of veal shank",
          "1 onion",
          "1 carrot",
          "1 celery stalk",
          "500 ml stock",
          "flour",
          "oil",
          "parsley",
          "lemon",
          "garlic"
        ],
        "steps": [
          "Lightly coat the shanks in flour and brown them.",
          "Fry the chopped vegetables and add the stock.",
          "Return the meat and braise covered until tender, around two hours.",
          "Mix chopped parsley, lemon zest and garlic and sprinkle over the dish."
        ]
      },
      "variants": [
        "Versions with tomato exist, while light sauces are also traditional."
      ],
      "serving": [
        "Serve with risotto alla milanese or polenta."
      ],
      "commonMistakes": [
        "Avoid vigorous boiling, which can dry out the meat."
      ]
    },
    "fr": {
      "overview": "Le jarret est braisé avec des légumes et du bouillon jusqu’à ce que la viande soit tendre.",
      "history": "L’ossobuco alla milanese fait partie de la cuisine classique de Milan.",
      "flavor": "Saveur riche de viande, relevée de citron frais et de persil.",
      "technique": "Braiser à feu doux et à couvert.",
      "essentials": [
        "4 tranches de jarret de veau",
        "1 oignon",
        "1 carotte"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 2,5 heures",
        "ingredients": [
          "4 tranches de jarret de veau",
          "1 oignon",
          "1 carotte",
          "1 branche de céleri",
          "500 ml de bouillon",
          "farine",
          "huile",
          "persil",
          "citron",
          "ail"
        ],
        "steps": [
          "Fariner légèrement les tranches de jarret et les faire dorer.",
          "Faire revenir les légumes hachés et ajouter le bouillon.",
          "Remettre la viande et braiser à couvert jusqu’à tendreté, environ deux heures.",
          "Mélanger le persil haché, le zeste de citron et l’ail, puis parsemer le plat."
        ]
      },
      "variants": [
        "Il existe des variantes à la tomate, mais les sauces claires sont également traditionnelles."
      ],
      "serving": [
        "Servir avec du risotto alla milanese ou de la polenta."
      ],
      "commonMistakes": [
        "Éviter une forte ébullition, qui risque de dessécher la viande."
      ]
    },
    "pt": {
      "overview": "O chambão é estufado com legumes e caldo até a carne ficar tenra.",
      "history": "O ossobuco alla milanese pertence à cozinha clássica de Milão.",
      "flavor": "Sabor intenso a carne com a frescura do limão e da salsa.",
      "technique": "Estufe em lume brando com tampa.",
      "essentials": [
        "4 rodelas de chambão de vitela",
        "1 cebola",
        "1 cenoura"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 2,5 horas",
        "ingredients": [
          "4 rodelas de chambão de vitela",
          "1 cebola",
          "1 cenoura",
          "1 talo de aipo",
          "500 ml de caldo",
          "farinha",
          "óleo",
          "salsa",
          "limão",
          "alho"
        ],
        "steps": [
          "Passe ligeiramente as rodelas de chambão por farinha e doure-as.",
          "Salteie os legumes picados e junte o caldo.",
          "Volte a colocar a carne e estufe com tampa até ficar tenra, cerca de duas horas.",
          "Misture salsa picada, raspa de limão e alho e espalhe por cima."
        ]
      },
      "variants": [
        "Existem variantes com tomate, mas os molhos claros também são tradicionais."
      ],
      "serving": [
        "Sirva com risoto alla milanese ou polenta."
      ],
      "commonMistakes": [
        "Evite uma fervura intensa, que pode secar a carne."
      ]
    },
    "es": {
      "overview": "El jarrete se brasea con verduras y caldo hasta que la carne esté tierna.",
      "history": "El ossobuco alla milanese pertenece a la cocina clásica de Milán.",
      "flavor": "Sabor intenso a carne con el frescor del limón y el perejil.",
      "technique": "Brasea a fuego lento con tapa.",
      "essentials": [
        "4 rodajas de jarrete de ternera",
        "1 cebolla",
        "1 zanahoria"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 2,5 horas",
        "ingredients": [
          "4 rodajas de jarrete de ternera",
          "1 cebolla",
          "1 zanahoria",
          "1 tallo de apio",
          "500 ml de caldo",
          "harina",
          "aceite",
          "perejil",
          "limón",
          "ajo"
        ],
        "steps": [
          "Enharina ligeramente las rodajas de jarrete y dóralas.",
          "Sofríe las verduras picadas y añade el caldo.",
          "Vuelve a incorporar la carne y brasea con tapa hasta que esté tierna, unas dos horas.",
          "Mezcla perejil picado, ralladura de limón y ajo y espolvorea por encima."
        ]
      },
      "variants": [
        "Existen variantes con tomate, aunque las salsas claras también son tradicionales."
      ],
      "serving": [
        "Sirve con risotto alla milanese o polenta."
      ],
      "commonMistakes": [
        "Evita una ebullición fuerte, que puede resecar la carne."
      ]
    },
    "de": {
      "overview": "Die Haxe wird mit Gemüse und Brühe geschmort, bis das Fleisch zart ist.",
      "history": "Ossobuco alla milanese gehört zur klassischen Mailänder Küche.",
      "flavor": "Kräftiger Fleischgeschmack mit frischer Zitrone und Petersilie.",
      "technique": "Bei niedriger Hitze zugedeckt schmoren.",
      "essentials": [
        "4 Scheiben Kalbshaxe",
        "1 Zwiebel",
        "1 Karotte"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 2,5 Stunden",
        "ingredients": [
          "4 Scheiben Kalbshaxe",
          "1 Zwiebel",
          "1 Karotte",
          "1 Stange Sellerie",
          "500 ml Brühe",
          "Mehl",
          "Öl",
          "Petersilie",
          "Zitrone",
          "Knoblauch"
        ],
        "steps": [
          "Haxenscheiben leicht in Mehl wenden und anbräunen.",
          "Gehacktes Gemüse anbraten und Brühe hinzufügen.",
          "Fleisch zurückgeben und zugedeckt etwa zwei Stunden weich schmoren.",
          "Gehackte Petersilie, Zitronenschale und Knoblauch mischen und darüberstreuen."
        ]
      },
      "variants": [
        "Es gibt Varianten mit Tomate; helle Saucen sind ebenfalls traditionell."
      ],
      "serving": [
        "Mit Risotto alla milanese oder Polenta servieren."
      ],
      "commonMistakes": [
        "Starkes Kochen vermeiden, da das Fleisch trocken werden kann."
      ]
    }
  },
  "gnocchi-al-pesto": {
    "en": {
      "overview": "Potato-based dough pillows are combined with a pesto of basil, pine nuts, cheese and olive oil.",
      "history": "Pesto alla genovese has roots in Liguria, while gnocchi are found in many Italian regions.",
      "flavor": "Fresh with herbs, nutty and soft.",
      "technique": "Use little flour in the potato dough and fold in the pesto without high heat.",
      "essentials": [
        "600 g floury potatoes",
        "150 g wheat flour, approximately",
        "1 egg"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 60 min",
        "ingredients": [
          "600 g floury potatoes",
          "150 g wheat flour, approximately",
          "1 egg",
          "40 g basil",
          "25 g pine nuts",
          "50 g Parmesan",
          "1 garlic clove",
          "olive oil"
        ],
        "steps": [
          "Boil the potatoes until tender, peel and mash them.",
          "Mix gently with the egg and just enough flour to form a workable dough.",
          "Roll out, cut into pieces and boil until they float to the surface.",
          "Pound or blend the pesto ingredients and fold in with a little cooking water."
        ]
      },
      "variants": [
        "Pesto can also contain pecorino in addition to Parmesan."
      ],
      "serving": [
        "Serve with grated cheese."
      ],
      "commonMistakes": [
        "Do not knead in so much flour that the gnocchi become heavy."
      ]
    },
    "fr": {
      "overview": "De petits coussins de pâte à base de pommes de terre sont associés à un pesto de basilic, pignons, fromage et huile d’olive.",
      "history": "Le pesto alla genovese a ses racines en Ligurie, tandis que les gnocchis se retrouvent dans de nombreuses régions italiennes.",
      "flavor": "Frais et herbacé, aux notes de noix et tendre.",
      "technique": "Utiliser peu de farine dans la pâte de pommes de terre et incorporer le pesto sans chaleur forte.",
      "essentials": [
        "600 g de pommes de terre farineuses",
        "150 g de farine de blé, environ",
        "1 œuf"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 60 min",
        "ingredients": [
          "600 g de pommes de terre farineuses",
          "150 g de farine de blé, environ",
          "1 œuf",
          "40 g de basilic",
          "25 g de pignons",
          "50 g de parmesan",
          "1 gousse d’ail",
          "huile d’olive"
        ],
        "steps": [
          "Cuire les pommes de terre jusqu’à tendreté, les peler et les écraser.",
          "Mélanger délicatement avec l’œuf et juste assez de farine pour obtenir une pâte façonnable.",
          "Rouler la pâte, couper en morceaux et cuire à l’eau jusqu’à ce qu’ils remontent à la surface.",
          "Piler ou mixer les ingrédients du pesto et incorporer avec un peu d’eau de cuisson."
        ]
      },
      "variants": [
        "Le pesto peut aussi contenir du pecorino en plus du parmesan."
      ],
      "serving": [
        "Servir avec du fromage râpé."
      ],
      "commonMistakes": [
        "Ne pas incorporer tant de farine que les gnocchis deviennent lourds."
      ]
    },
    "pt": {
      "overview": "Pequenas almofadas de massa de batata são combinadas com pesto de manjericão, pinhões, queijo e azeite.",
      "history": "O pesto alla genovese tem raízes na Ligúria, enquanto os gnocchi existem em muitas regiões italianas.",
      "flavor": "Fresco com ervas, com notas de frutos secos e macio.",
      "technique": "Use pouca farinha na massa de batata e envolva o pesto sem calor intenso.",
      "essentials": [
        "600 g de batatas farinhentas",
        "150 g de farinha de trigo, aproximadamente",
        "1 ovo"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 60 min",
        "ingredients": [
          "600 g de batatas farinhentas",
          "150 g de farinha de trigo, aproximadamente",
          "1 ovo",
          "40 g de manjericão",
          "25 g de pinhões",
          "50 g de parmesão",
          "1 dente de alho",
          "azeite"
        ],
        "steps": [
          "Coza as batatas até ficarem tenras, descasque-as e esmague-as.",
          "Misture cuidadosamente com o ovo e apenas a farinha necessária para obter uma massa moldável.",
          "Enrole a massa, corte em pedaços e coza até subirem à superfície.",
          "Pise ou triture os ingredientes do pesto e envolva com um pouco da água da cozedura."
        ]
      },
      "variants": [
        "O pesto também pode incluir pecorino além do parmesão."
      ],
      "serving": [
        "Sirva com queijo ralado."
      ],
      "commonMistakes": [
        "Não amasse com tanta farinha que os gnocchi fiquem pesados."
      ]
    },
    "es": {
      "overview": "Pequeñas piezas de masa de patata se combinan con pesto de albahaca, piñones, queso y aceite de oliva.",
      "history": "El pesto alla genovese tiene sus raíces en Liguria, mientras que los ñoquis se encuentran en muchas regiones italianas.",
      "flavor": "Fresco por las hierbas, con notas de frutos secos y tierno.",
      "technique": "Usa poca harina en la masa de patata e incorpora el pesto sin calor intenso.",
      "essentials": [
        "600 g de patatas harinosas",
        "150 g de harina de trigo, aproximadamente",
        "1 huevo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 60 min",
        "ingredients": [
          "600 g de patatas harinosas",
          "150 g de harina de trigo, aproximadamente",
          "1 huevo",
          "40 g de albahaca",
          "25 g de piñones",
          "50 g de parmesano",
          "1 diente de ajo",
          "aceite de oliva"
        ],
        "steps": [
          "Cuece las patatas hasta que estén tiernas, pélalas y tritúralas.",
          "Mezcla suavemente con el huevo y solo la harina necesaria para obtener una masa moldeable.",
          "Forma rollos, corta en trozos y cuece hasta que suban a la superficie.",
          "Maja o tritura los ingredientes del pesto e incorpora con un poco de agua de cocción."
        ]
      },
      "variants": [
        "El pesto también puede contener pecorino además de parmesano."
      ],
      "serving": [
        "Sirve con queso rallado."
      ],
      "commonMistakes": [
        "No amases con tanta harina que los ñoquis queden pesados."
      ]
    },
    "de": {
      "overview": "Kleine Kartoffelteigkissen werden mit Pesto aus Basilikum, Pinienkernen, Käse und Olivenöl kombiniert.",
      "history": "Pesto alla genovese hat seine Wurzeln in Ligurien, während Gnocchi in vielen italienischen Regionen verbreitet sind.",
      "flavor": "Kräuterfrisch, nussig und weich.",
      "technique": "Wenig Mehl im Kartoffelteig verwenden und Pesto ohne starke Hitze unterheben.",
      "essentials": [
        "600 g mehligkochende Kartoffeln",
        "150 g Weizenmehl, ungefähr",
        "1 Ei"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 60 Min.",
        "ingredients": [
          "600 g mehligkochende Kartoffeln",
          "150 g Weizenmehl, ungefähr",
          "1 Ei",
          "40 g Basilikum",
          "25 g Pinienkerne",
          "50 g Parmesan",
          "1 Knoblauchzehe",
          "Olivenöl"
        ],
        "steps": [
          "Kartoffeln weich kochen, schälen und zerdrücken.",
          "Vorsichtig mit dem Ei und gerade so viel Mehl mischen, dass ein formbarer Teig entsteht.",
          "Teig ausrollen, in Stücke schneiden und kochen, bis sie aufsteigen.",
          "Pestozutaten zerstoßen oder mixen und mit etwas Kochwasser unterheben."
        ]
      },
      "variants": [
        "Pesto kann neben Parmesan auch Pecorino enthalten."
      ],
      "serving": [
        "Mit geriebenem Käse servieren."
      ],
      "commonMistakes": [
        "Nicht so viel Mehl einkneten, dass die Gnocchi schwer werden."
      ]
    }
  },
  "tiramisu": {
    "en": {
      "overview": "Biscuits are briefly dipped in coffee and layered with mascarpone cream.",
      "history": "Tiramisu is particularly associated with northeastern Italy; its origin is disputed.",
      "flavor": "Creamy, slightly sweet and bittersweet from coffee and cocoa.",
      "technique": "Use cooled coffee and let the dessert set in the refrigerator.",
      "essentials": [
        "250 g savoiardi",
        "500 g mascarpone",
        "250 ml whipping cream"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 25 min + 4 hours chilling",
        "ingredients": [
          "250 g savoiardi",
          "500 g mascarpone",
          "250 ml whipping cream",
          "70 g sugar",
          "250 ml strong coffee",
          "cocoa"
        ],
        "steps": [
          "Whip the cream and sugar and gently fold in the mascarpone.",
          "Quickly dip the biscuits in cold coffee.",
          "Layer the biscuits and cream in a dish.",
          "Chill for at least four hours and sift cocoa over the top before serving."
        ]
      },
      "variants": [
        "This home version contains no raw eggs; classic versions often use eggs."
      ],
      "serving": [
        "Serve cold in portions."
      ],
      "commonMistakes": [
        "Do not soak the biscuits so long that they fall apart."
      ]
    },
    "fr": {
      "overview": "Les biscuits sont brièvement trempés dans le café et disposés en couches avec la crème au mascarpone.",
      "history": "Le tiramisu est particulièrement associé au nord-est de l’Italie ; son origine fait débat.",
      "flavor": "Crémeux, légèrement sucré et doux-amer grâce au café et au cacao.",
      "technique": "Utiliser du café refroidi et laisser prendre le dessert au réfrigérateur.",
      "essentials": [
        "250 g de biscuits savoiardi",
        "500 g de mascarpone",
        "250 ml de crème à fouetter"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 25 min + 4 heures au frais",
        "ingredients": [
          "250 g de biscuits savoiardi",
          "500 g de mascarpone",
          "250 ml de crème à fouetter",
          "70 g de sucre",
          "250 ml de café fort",
          "cacao"
        ],
        "steps": [
          "Fouetter la crème avec le sucre et incorporer délicatement le mascarpone.",
          "Tremper rapidement les biscuits dans le café froid.",
          "Disposer les biscuits et la crème en couches dans un plat.",
          "Réfrigérer au moins quatre heures et tamiser du cacao sur le dessus avant de servir."
        ]
      },
      "variants": [
        "Cette version maison ne contient pas d’œufs crus ; les versions classiques utilisent souvent des œufs."
      ],
      "serving": [
        "Servir froid en portions."
      ],
      "commonMistakes": [
        "Ne pas laisser tremper les biscuits si longtemps qu’ils se désagrègent."
      ]
    },
    "pt": {
      "overview": "Os biscoitos são mergulhados brevemente em café e dispostos em camadas com creme de mascarpone.",
      "history": "O tiramisu está especialmente associado ao nordeste de Itália; a sua origem é controversa.",
      "flavor": "Cremoso, ligeiramente doce e agridoce pelo café e cacau.",
      "technique": "Use café arrefecido e deixe a sobremesa firmar no frigorífico.",
      "essentials": [
        "250 g de palitos la reine",
        "500 g de mascarpone",
        "250 ml de natas para bater"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 25 min + 4 horas de refrigeração",
        "ingredients": [
          "250 g de palitos la reine",
          "500 g de mascarpone",
          "250 ml de natas para bater",
          "70 g de açúcar",
          "250 ml de café forte",
          "cacau"
        ],
        "steps": [
          "Bata as natas com o açúcar e envolva cuidadosamente o mascarpone.",
          "Mergulhe rapidamente os biscoitos no café frio.",
          "Disponha os biscoitos e o creme em camadas numa forma.",
          "Leve ao frigorífico durante pelo menos quatro horas e peneire cacau por cima antes de servir."
        ]
      },
      "variants": [
        "Esta versão caseira não contém ovos crus; as versões clássicas usam frequentemente ovos."
      ],
      "serving": [
        "Sirva frio em porções."
      ],
      "commonMistakes": [
        "Não demolhe os biscoitos durante tanto tempo que se desfaçam."
      ]
    },
    "es": {
      "overview": "Los bizcochos se mojan brevemente en café y se colocan en capas con crema de mascarpone.",
      "history": "El tiramisú se asocia especialmente con el noreste de Italia; su origen es objeto de debate.",
      "flavor": "Cremoso, ligeramente dulce y agridulce por el café y el cacao.",
      "technique": "Usa café frío y deja que el postre se asiente en el frigorífico.",
      "essentials": [
        "250 g de bizcochos de soletilla",
        "500 g de mascarpone",
        "250 ml de nata para montar"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 25 min + 4 horas de refrigeración",
        "ingredients": [
          "250 g de bizcochos de soletilla",
          "500 g de mascarpone",
          "250 ml de nata para montar",
          "70 g de azúcar",
          "250 ml de café fuerte",
          "cacao"
        ],
        "steps": [
          "Monta la nata con el azúcar e incorpora suavemente el mascarpone.",
          "Moja rápidamente los bizcochos en café frío.",
          "Coloca los bizcochos y la crema en capas en una fuente.",
          "Refrigera durante al menos cuatro horas y tamiza cacao por encima antes de servir."
        ]
      },
      "variants": [
        "Esta versión casera no contiene huevos crudos; las versiones clásicas suelen usar huevos."
      ],
      "serving": [
        "Sirve frío en porciones."
      ],
      "commonMistakes": [
        "No remojes los bizcochos tanto tiempo que se deshagan."
      ]
    },
    "de": {
      "overview": "Biskuits werden kurz in Kaffee getaucht und mit Mascarponecreme geschichtet.",
      "history": "Tiramisu ist besonders mit Nordostitalien verbunden; seine Herkunft ist umstritten.",
      "flavor": "Cremig, süßlich und durch Kaffee und Kakao bittersüß.",
      "technique": "Abgekühlten Kaffee verwenden und das Dessert im Kühlschrank fest werden lassen.",
      "essentials": [
        "250 g Löffelbiskuits",
        "500 g Mascarpone",
        "250 ml Schlagsahne"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 25 Min. + 4 Stunden Kühlzeit",
        "ingredients": [
          "250 g Löffelbiskuits",
          "500 g Mascarpone",
          "250 ml Schlagsahne",
          "70 g Zucker",
          "250 ml starker Kaffee",
          "Kakao"
        ],
        "steps": [
          "Sahne und Zucker aufschlagen und Mascarpone vorsichtig unterheben.",
          "Biskuits kurz in kalten Kaffee tauchen.",
          "Biskuits und Creme in einer Form schichten.",
          "Mindestens vier Stunden kühlen und vor dem Servieren Kakao darübersieben."
        ]
      },
      "variants": [
        "Diese Hausvariante enthält keine rohen Eier; klassische Varianten verwenden häufig Eier."
      ],
      "serving": [
        "Kalt in Portionen servieren."
      ],
      "commonMistakes": [
        "Biskuits nicht so lange einweichen, dass sie zerfallen."
      ]
    }
  },
  "focaccia": {
    "en": {
      "overview": "A risen dough is pressed into an oiled baking tin and given its characteristic dimples.",
      "history": "Focaccia is found in many Italian regions; the Genoese version is particularly well known.",
      "flavor": "Soft, airy and salty, with a golden crust.",
      "technique": "Let the dough rise well and use olive oil in the tin.",
      "essentials": [
        "500 g wheat flour",
        "380 ml water",
        "5 g dried yeast"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40 min + rising",
        "ingredients": [
          "500 g wheat flour",
          "380 ml water",
          "5 g dried yeast",
          "10 g salt",
          "olive oil",
          "flaky salt"
        ],
        "steps": [
          "Mix flour, water, yeast and salt into a sticky dough.",
          "Let rise until airy, preferably folding the dough a few times along the way.",
          "Spread in an oiled tin and allow to rise again.",
          "Make dimples with oiled fingers, drizzle with oil and sprinkle with salt.",
          "Bake at 220 °C until golden."
        ]
      },
      "variants": [
        "Focaccia barese is often topped with tomatoes and olives."
      ],
      "serving": [
        "Serve as bread with a meal or as a snack."
      ],
      "commonMistakes": [
        "Do not press out all the air while shaping."
      ]
    },
    "fr": {
      "overview": "Une pâte levée est étalée dans un moule huilé et marquée de ses creux caractéristiques.",
      "history": "La focaccia est présente dans de nombreuses régions italiennes ; la version génoise est particulièrement connue.",
      "flavor": "Moelleuse, aérée et salée, avec une croûte dorée.",
      "technique": "Laisser bien lever la pâte et utiliser de l’huile d’olive dans le moule.",
      "essentials": [
        "500 g de farine de blé",
        "380 ml d’eau",
        "5 g de levure sèche"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40 min + levée",
        "ingredients": [
          "500 g de farine de blé",
          "380 ml d’eau",
          "5 g de levure sèche",
          "10 g de sel",
          "huile d’olive",
          "sel en flocons"
        ],
        "steps": [
          "Mélanger la farine, l’eau, la levure et le sel pour obtenir une pâte collante.",
          "Laisser lever jusqu’à ce que la pâte soit aérée, de préférence en effectuant quelques rabats en cours de route.",
          "Étaler dans un moule huilé et laisser lever de nouveau.",
          "Former des creux avec les doigts huilés, arroser d’huile et parsemer de sel.",
          "Cuire au four à 220 °C jusqu’à ce que la focaccia soit dorée."
        ]
      },
      "variants": [
        "La focaccia barese est souvent garnie de tomates et d’olives."
      ],
      "serving": [
        "Servir comme pain d’accompagnement ou comme en-cas."
      ],
      "commonMistakes": [
        "Ne pas chasser tout l’air lors du façonnage."
      ]
    },
    "pt": {
      "overview": "Uma massa levedada é espalhada numa forma untada com azeite e marcada com as suas cavidades características.",
      "history": "A focaccia existe em muitas regiões italianas; a versão genovesa é especialmente conhecida.",
      "flavor": "Macia, leve e salgada, com crosta dourada.",
      "technique": "Deixe a massa levedar bem e use azeite na forma.",
      "essentials": [
        "500 g de farinha de trigo",
        "380 ml de água",
        "5 g de fermento de padeiro seco"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40 min + levedação",
        "ingredients": [
          "500 g de farinha de trigo",
          "380 ml de água",
          "5 g de fermento de padeiro seco",
          "10 g de sal",
          "azeite",
          "sal em flocos"
        ],
        "steps": [
          "Misture farinha, água, fermento e sal até obter uma massa pegajosa.",
          "Deixe levedar até ficar leve, de preferência fazendo algumas dobras durante o processo.",
          "Espalhe numa forma untada com azeite e deixe levedar novamente.",
          "Faça cavidades com os dedos untados, regue com azeite e polvilhe com sal.",
          "Leve ao forno a 220 °C até dourar."
        ]
      },
      "variants": [
        "A focaccia barese é frequentemente coberta com tomate e azeitonas."
      ],
      "serving": [
        "Sirva como pão a acompanhar a refeição ou como lanche."
      ],
      "commonMistakes": [
        "Não retire todo o ar ao moldar a massa."
      ]
    },
    "es": {
      "overview": "Una masa fermentada se extiende en un molde aceitado y se le hacen sus hendiduras características.",
      "history": "La focaccia se encuentra en muchas regiones italianas; la versión genovesa es especialmente conocida.",
      "flavor": "Suave, esponjosa y salada, con una corteza dorada.",
      "technique": "Deja que la masa leve bien y usa aceite de oliva en el molde.",
      "essentials": [
        "500 g de harina de trigo",
        "380 ml de agua",
        "5 g de levadura seca"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40 min + levado",
        "ingredients": [
          "500 g de harina de trigo",
          "380 ml de agua",
          "5 g de levadura seca",
          "10 g de sal",
          "aceite de oliva",
          "sal en escamas"
        ],
        "steps": [
          "Mezcla harina, agua, levadura y sal hasta obtener una masa pegajosa.",
          "Deja levar hasta que esté esponjosa, preferiblemente haciendo algunos pliegues durante el proceso.",
          "Extiende en un molde aceitado y deja levar de nuevo.",
          "Haz hendiduras con los dedos aceitados, rocía con aceite y espolvorea sal.",
          "Hornea a 220 °C hasta que esté dorada."
        ]
      },
      "variants": [
        "La focaccia barese suele cubrirse con tomates y aceitunas."
      ],
      "serving": [
        "Sirve como pan para acompañar la comida o como tentempié."
      ],
      "commonMistakes": [
        "No expulse todo el aire al dar forma a la masa."
      ]
    },
    "de": {
      "overview": "Ein aufgegangener Teig wird in eine geölte Form gedrückt und mit den charakteristischen Vertiefungen versehen.",
      "history": "Focaccia gibt es in vielen italienischen Regionen; die genuesische Variante ist besonders bekannt.",
      "flavor": "Weich, luftig und salzig mit goldbrauner Kruste.",
      "technique": "Teig gut aufgehen lassen und Olivenöl in der Form verwenden.",
      "essentials": [
        "500 g Weizenmehl",
        "380 ml Wasser",
        "5 g Trockenhefe"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40 Min. + Gehzeit",
        "ingredients": [
          "500 g Weizenmehl",
          "380 ml Wasser",
          "5 g Trockenhefe",
          "10 g Salz",
          "Olivenöl",
          "Salzflocken"
        ],
        "steps": [
          "Mehl, Wasser, Hefe und Salz zu einem klebrigen Teig mischen.",
          "Aufgehen lassen, bis der Teig luftig ist, dabei möglichst einige Male falten.",
          "In einer geölten Form verteilen und nochmals gehen lassen.",
          "Mit geölten Fingern Vertiefungen eindrücken, mit Öl beträufeln und Salz darüberstreuen.",
          "Bei 220 °C goldbraun backen."
        ]
      },
      "variants": [
        "Focaccia barese wird oft mit Tomaten und Oliven belegt."
      ],
      "serving": [
        "Als Brot zur Mahlzeit oder als Zwischenmahlzeit servieren."
      ],
      "commonMistakes": [
        "Beim Formen nicht die gesamte Luft herausdrücken."
      ]
    }
  },
  "tempura": {
    "en": {
      "overview": "Ingredients are dipped in cold flour batter and quickly deep-fried.",
      "history": "Tempura developed in Japan with historical links to Portuguese cooking traditions.",
      "flavor": "Light, crisp and mild.",
      "technique": "Mix the batter briefly and keep it cold.",
      "essentials": [
        "200 g prawns",
        "200 g vegetables",
        "100 g wheat flour"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–50 min",
        "ingredients": [
          "200 g prawns",
          "200 g vegetables",
          "100 g wheat flour",
          "150 ml ice-cold water",
          "1 egg",
          "frying oil"
        ],
        "steps": [
          "Dry the ingredients thoroughly.",
          "Briefly mix the egg, water and flour.",
          "Dip the ingredients in the batter.",
          "Deep-fry in small batches at 170–180 °C until cooked through and crisp."
        ]
      },
      "variants": [
        "Ebi tempura with prawns and yasai tempura with vegetables."
      ],
      "serving": [
        "Serve with tentsuyu or salt."
      ],
      "commonMistakes": [
        "Do not overmix the batter."
      ]
    },
    "fr": {
      "overview": "Les ingrédients sont plongés dans une pâte froide à base de farine et frits rapidement.",
      "history": "La tempura s’est développée au Japon avec des liens historiques avec la cuisine portugaise.",
      "flavor": "Légère, croustillante et douce.",
      "technique": "Mélanger brièvement la pâte et la garder froide.",
      "essentials": [
        "200 g de crevettes",
        "200 g de légumes",
        "100 g de farine de blé"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–50 min",
        "ingredients": [
          "200 g de crevettes",
          "200 g de légumes",
          "100 g de farine de blé",
          "150 ml d’eau glacée",
          "1 œuf",
          "huile de friture"
        ],
        "steps": [
          "Bien sécher les ingrédients.",
          "Mélanger brièvement l’œuf, l’eau et la farine.",
          "Plonger les ingrédients dans la pâte.",
          "Frire par petites quantités à 170–180 °C jusqu’à cuisson complète et jusqu’à ce que les ingrédients soient croustillants."
        ]
      },
      "variants": [
        "Ebi tempura aux crevettes et yasai tempura aux légumes."
      ],
      "serving": [
        "Servir avec du tentsuyu ou du sel."
      ],
      "commonMistakes": [
        "Ne pas trop travailler la pâte."
      ]
    },
    "pt": {
      "overview": "Os ingredientes são mergulhados num polme frio de farinha e fritos rapidamente.",
      "history": "A tempura desenvolveu-se no Japão com ligações históricas à tradição culinária portuguesa.",
      "flavor": "Leve, crocante e suave.",
      "technique": "Misture brevemente o polme e mantenha-o frio.",
      "essentials": [
        "200 g de camarão",
        "200 g de legumes",
        "100 g de farinha de trigo"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–50 min",
        "ingredients": [
          "200 g de camarão",
          "200 g de legumes",
          "100 g de farinha de trigo",
          "150 ml de água gelada",
          "1 ovo",
          "óleo para fritar"
        ],
        "steps": [
          "Seque bem os ingredientes.",
          "Misture brevemente o ovo, a água e a farinha.",
          "Mergulhe os ingredientes no polme.",
          "Frite em pequenas porções a 170–180 °C até estarem bem cozinhadas e crocantes."
        ]
      },
      "variants": [
        "Ebi tempura com camarão e yasai tempura com legumes."
      ],
      "serving": [
        "Sirva com tentsuyu ou sal."
      ],
      "commonMistakes": [
        "Não mexa demasiado o polme."
      ]
    },
    "es": {
      "overview": "Los ingredientes se sumergen en una masa fría de harina y se fríen rápidamente.",
      "history": "La tempura se desarrolló en Japón con vínculos históricos con la tradición culinaria portuguesa.",
      "flavor": "Ligera, crujiente y suave.",
      "technique": "Mezcla brevemente la masa y mantenla fría.",
      "essentials": [
        "200 g de gambas",
        "200 g de verduras",
        "100 g de harina de trigo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–50 min",
        "ingredients": [
          "200 g de gambas",
          "200 g de verduras",
          "100 g de harina de trigo",
          "150 ml de agua helada",
          "1 huevo",
          "aceite para freír"
        ],
        "steps": [
          "Seca bien los ingredientes.",
          "Mezcla brevemente el huevo, el agua y la harina.",
          "Sumerge los ingredientes en la masa.",
          "Fríe en tandas pequeñas a 170–180 °C hasta que estén hechas por dentro y crujientes."
        ]
      },
      "variants": [
        "Ebi tempura con gambas y yasai tempura con verduras."
      ],
      "serving": [
        "Sirve con tentsuyu o sal."
      ],
      "commonMistakes": [
        "No trabajes demasiado la masa."
      ]
    },
    "de": {
      "overview": "Die Zutaten werden in kalten Mehlteig getaucht und kurz frittiert.",
      "history": "Tempura entwickelte sich in Japan mit historischen Verbindungen zur portugiesischen Küche.",
      "flavor": "Leicht, knusprig und mild.",
      "technique": "Teig kurz verrühren und kalt halten.",
      "essentials": [
        "200 g Garnelen",
        "200 g Gemüse",
        "100 g Weizenmehl"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–50 Min.",
        "ingredients": [
          "200 g Garnelen",
          "200 g Gemüse",
          "100 g Weizenmehl",
          "150 ml eiskaltes Wasser",
          "1 Ei",
          "Frittieröl"
        ],
        "steps": [
          "Zutaten gründlich trocknen.",
          "Ei, Wasser und Mehl kurz verrühren.",
          "Zutaten in den Teig tauchen.",
          "In kleinen Portionen bei 170–180 °C vollständig gar und knusprig frittieren."
        ]
      },
      "variants": [
        "Ebi Tempura mit Garnelen und Yasai Tempura mit Gemüse."
      ],
      "serving": [
        "Mit Tentsuyu oder Salz servieren."
      ],
      "commonMistakes": [
        "Teig nicht zu lange rühren."
      ]
    }
  },
  "okonomiyaki": {
    "en": {
      "overview": "The Osaka version mixes cabbage into the batter, while the Hiroshima version is often assembled in layers.",
      "history": "The dish is particularly associated with Osaka and Hiroshima.",
      "flavor": "Juicy, roasted and sweet-salty from the sauce.",
      "technique": "Cook over medium heat until the centre is done.",
      "essentials": [
        "250 g cabbage",
        "150 g wheat flour",
        "150 ml dashi"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–50 min",
        "ingredients": [
          "250 g cabbage",
          "150 g wheat flour",
          "150 ml dashi",
          "2 eggs",
          "150 g thin slices of pork",
          "okonomiyaki sauce",
          "mayonnaise"
        ],
        "steps": [
          "Mix flour, dashi and eggs.",
          "Fold in the finely sliced cabbage.",
          "Shape pancakes in an oiled pan and place the meat on top.",
          "Turn and cook until the meat and batter are cooked through."
        ]
      },
      "variants": [
        "Hiroshima style with layers and noodles."
      ],
      "serving": [
        "Top with sauce, mayonnaise and, if desired, bonito flakes and aonori."
      ],
      "commonMistakes": [
        "Do not press the pancake flat while cooking."
      ]
    },
    "fr": {
      "overview": "Dans la version d’Osaka, le chou est mélangé à la pâte, tandis que celle d’Hiroshima est souvent montée en couches.",
      "history": "Le plat est particulièrement associé à Osaka et à Hiroshima.",
      "flavor": "Juteux, grillé et sucré-salé grâce à la sauce.",
      "technique": "Cuire à feu moyen jusqu’à cuisson complète au centre.",
      "essentials": [
        "250 g de chou",
        "150 g de farine de blé",
        "150 ml de dashi"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–50 min",
        "ingredients": [
          "250 g de chou",
          "150 g de farine de blé",
          "150 ml de dashi",
          "2 œufs",
          "150 g de fines tranches de porc",
          "sauce okonomiyaki",
          "mayonnaise"
        ],
        "steps": [
          "Mélanger la farine, le dashi et les œufs.",
          "Incorporer le chou finement émincé.",
          "Former des crêpes dans une poêle huilée et déposer la viande dessus.",
          "Retourner et cuire jusqu’à cuisson complète de la viande et de la pâte."
        ]
      },
      "variants": [
        "Style d’Hiroshima, avec des couches et des nouilles."
      ],
      "serving": [
        "Garnir de sauce, de mayonnaise et, si souhaité, de flocons de bonite et d’aonori."
      ],
      "commonMistakes": [
        "Ne pas aplatir la crêpe pendant la cuisson."
      ]
    },
    "pt": {
      "overview": "A versão de Osaka mistura a couve na massa, enquanto a de Hiroshima é frequentemente montada em camadas.",
      "history": "O prato está especialmente associado a Osaka e Hiroshima.",
      "flavor": "Suculento, tostado e doce-salgado devido ao molho.",
      "technique": "Cozinhe em lume médio até o centro estar bem cozinhado.",
      "essentials": [
        "250 g de couve",
        "150 g de farinha de trigo",
        "150 ml de dashi"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–50 min",
        "ingredients": [
          "250 g de couve",
          "150 g de farinha de trigo",
          "150 ml de dashi",
          "2 ovos",
          "150 g de fatias finas de carne de porco",
          "molho okonomiyaki",
          "maionese"
        ],
        "steps": [
          "Misture farinha, dashi e ovos.",
          "Envolva a couve cortada em tiras finas.",
          "Forme panquecas numa frigideira untada com óleo e coloque a carne por cima.",
          "Vire e cozinhe até a carne e a massa estarem bem cozinhadas."
        ]
      },
      "variants": [
        "Estilo de Hiroshima, com camadas e noodles."
      ],
      "serving": [
        "Cubra com molho, maionese e, se desejar, flocos de bonito e aonori."
      ],
      "commonMistakes": [
        "Não achate a panqueca durante a cozedura."
      ]
    },
    "es": {
      "overview": "La versión de Osaka mezcla la col con la masa, mientras que la de Hiroshima suele montarse en capas.",
      "history": "El plato se asocia especialmente con Osaka e Hiroshima.",
      "flavor": "Jugoso, tostado y dulce-salado por la salsa.",
      "technique": "Cocina a fuego medio hasta que el centro esté hecho.",
      "essentials": [
        "250 g de col",
        "150 g de harina de trigo",
        "150 ml de dashi"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–50 min",
        "ingredients": [
          "250 g de col",
          "150 g de harina de trigo",
          "150 ml de dashi",
          "2 huevos",
          "150 g de lonchas finas de cerdo",
          "salsa okonomiyaki",
          "mayonesa"
        ],
        "steps": [
          "Mezcla la harina, el dashi y los huevos.",
          "Incorpora la col cortada fina.",
          "Forma tortitas en una sartén aceitada y coloca la carne encima.",
          "Da la vuelta y cocina hasta que la carne y la masa estén hechas por dentro."
        ]
      },
      "variants": [
        "Estilo de Hiroshima, con capas y fideos."
      ],
      "serving": [
        "Cubre con salsa, mayonesa y, si quieres, copos de bonito y aonori."
      ],
      "commonMistakes": [
        "No aplastes la tortita durante la cocción."
      ]
    },
    "de": {
      "overview": "Bei der Osaka-Variante wird Kohl unter den Teig gemischt, während die Hiroshima-Variante oft geschichtet wird.",
      "history": "Das Gericht ist besonders mit Osaka und Hiroshima verbunden.",
      "flavor": "Saftig, röstig und durch die Sauce süß-salzig.",
      "technique": "Bei mittlerer Hitze braten, bis die Mitte gar ist.",
      "essentials": [
        "250 g Kohl",
        "150 g Weizenmehl",
        "150 ml Dashi"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–50 Min.",
        "ingredients": [
          "250 g Kohl",
          "150 g Weizenmehl",
          "150 ml Dashi",
          "2 Eier",
          "150 g dünne Schweinefleischscheiben",
          "Okonomiyaki-Sauce",
          "Mayonnaise"
        ],
        "steps": [
          "Mehl, Dashi und Eier mischen.",
          "Fein geschnittenen Kohl unterheben.",
          "Pfannkuchen in einer geölten Pfanne formen und Fleisch darauflegen.",
          "Wenden und braten, bis Fleisch und Teig vollständig gar sind."
        ]
      },
      "variants": [
        "Hiroshima-Stil mit Schichten und Nudeln."
      ],
      "serving": [
        "Mit Sauce, Mayonnaise und nach Wunsch Bonitoflocken und Aonori garnieren."
      ],
      "commonMistakes": [
        "Pfannkuchen beim Braten nicht flach drücken."
      ]
    }
  },
  "takoyaki": {
    "en": {
      "overview": "Runny dashi batter is filled with cooked octopus and turned in hemispherical moulds.",
      "history": "Takoyaki is particularly associated with Osaka’s street food.",
      "flavor": "Toasted outside and soft, hot centre.",
      "technique": "Use a takoyaki pan and gradually turn the balls.",
      "essentials": [
        "150 g wheat flour",
        "450 ml dashi",
        "2 eggs"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–50 min",
        "ingredients": [
          "150 g wheat flour",
          "450 ml dashi",
          "2 eggs",
          "150 g cooked octopus",
          "spring onions",
          "pickled ginger",
          "oil"
        ],
        "steps": [
          "Mix flour, dashi and eggs.",
          "Grease and heat the takoyaki pan.",
          "Pour in the batter and add octopus and spring onions.",
          "Gradually turn with a skewer until the balls are round and cooked through."
        ]
      },
      "variants": [
        "Home versions can use prawns instead of octopus."
      ],
      "serving": [
        "Serve with takoyaki sauce, mayonnaise and bonito flakes."
      ],
      "commonMistakes": [
        "Be aware that the centre is very hot when served."
      ]
    },
    "fr": {
      "overview": "Une pâte liquide au dashi est garnie de poulpe cuit et retournée dans des alvéoles hémisphériques.",
      "history": "Les takoyaki sont particulièrement associés à la cuisine de rue d’Osaka.",
      "flavor": "Extérieur doré et cœur tendre et chaud.",
      "technique": "Utiliser une poêle à takoyaki et retourner progressivement les boulettes.",
      "essentials": [
        "150 g de farine de blé",
        "450 ml de dashi",
        "2 œufs"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–50 min",
        "ingredients": [
          "150 g de farine de blé",
          "450 ml de dashi",
          "2 œufs",
          "150 g de poulpe cuit",
          "oignons nouveaux",
          "gingembre mariné",
          "huile"
        ],
        "steps": [
          "Mélanger la farine, le dashi et les œufs.",
          "Huiler et chauffer la poêle à takoyaki.",
          "Verser la pâte et ajouter le poulpe et les oignons nouveaux.",
          "Retourner progressivement à l’aide d’une pique jusqu’à ce que les boulettes soient rondes et cuites à cœur."
        ]
      },
      "variants": [
        "Les versions maison peuvent remplacer le poulpe par des crevettes."
      ],
      "serving": [
        "Servir avec de la sauce takoyaki, de la mayonnaise et des flocons de bonite."
      ],
      "commonMistakes": [
        "Attention, le cœur est très chaud au moment de servir."
      ]
    },
    "pt": {
      "overview": "Uma massa líquida de dashi é recheada com polvo cozido e virada em cavidades hemisféricas.",
      "history": "O takoyaki está especialmente associado à comida de rua de Osaka.",
      "flavor": "Exterior tostado e interior macio e quente.",
      "technique": "Use uma frigideira de takoyaki e vire as bolinhas gradualmente.",
      "essentials": [
        "150 g de farinha de trigo",
        "450 ml de dashi",
        "2 ovos"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–50 min",
        "ingredients": [
          "150 g de farinha de trigo",
          "450 ml de dashi",
          "2 ovos",
          "150 g de polvo cozido",
          "cebolinha verde",
          "gengibre em conserva",
          "óleo"
        ],
        "steps": [
          "Misture farinha, dashi e ovos.",
          "Unte e aqueça a frigideira de takoyaki.",
          "Verta a massa e junte polvo e cebolinha verde.",
          "Vire gradualmente com um palito até as bolinhas estarem redondas e bem cozinhadas."
        ]
      },
      "variants": [
        "As versões caseiras podem usar camarão em vez de polvo."
      ],
      "serving": [
        "Sirva com molho takoyaki, maionese e flocos de bonito."
      ],
      "commonMistakes": [
        "Tenha cuidado, pois o interior está muito quente ao servir."
      ]
    },
    "es": {
      "overview": "Una masa líquida de dashi se rellena de pulpo cocido y se gira en cavidades semiesféricas.",
      "history": "El takoyaki se asocia especialmente con la comida callejera de Osaka.",
      "flavor": "Exterior tostado e interior suave y caliente.",
      "technique": "Usa una sartén de takoyaki y gira las bolas gradualmente.",
      "essentials": [
        "150 g de harina de trigo",
        "450 ml de dashi",
        "2 huevos"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–50 min",
        "ingredients": [
          "150 g de harina de trigo",
          "450 ml de dashi",
          "2 huevos",
          "150 g de pulpo cocido",
          "cebolletas",
          "jengibre encurtido",
          "aceite"
        ],
        "steps": [
          "Mezcla la harina, el dashi y los huevos.",
          "Engrasa y calienta la sartén de takoyaki.",
          "Vierte la masa y añade pulpo y cebolletas.",
          "Gira gradualmente con un palillo hasta que las bolas estén redondas y hechas por dentro."
        ]
      },
      "variants": [
        "Las versiones caseras pueden usar gambas en lugar de pulpo."
      ],
      "serving": [
        "Sirve con salsa takoyaki, mayonesa y copos de bonito."
      ],
      "commonMistakes": [
        "Ten cuidado: el interior está muy caliente al servir."
      ]
    },
    "de": {
      "overview": "Flüssiger Dashi-Teig wird mit gegartem Oktopus gefüllt und in halbkugelförmigen Vertiefungen gewendet.",
      "history": "Takoyaki ist besonders mit Osakas Streetfood verbunden.",
      "flavor": "Geröstete Außenseite und weicher, heißer Kern.",
      "technique": "Takoyaki-Pfanne verwenden und die Kugeln nach und nach wenden.",
      "essentials": [
        "150 g Weizenmehl",
        "450 ml Dashi",
        "2 Eier"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–50 Min.",
        "ingredients": [
          "150 g Weizenmehl",
          "450 ml Dashi",
          "2 Eier",
          "150 g gegarter Oktopus",
          "Frühlingszwiebeln",
          "eingelegter Ingwer",
          "Öl"
        ],
        "steps": [
          "Mehl, Dashi und Eier mischen.",
          "Takoyaki-Pfanne einfetten und erhitzen.",
          "Teig eingießen und Oktopus und Frühlingszwiebeln hinzufügen.",
          "Mit einem Stäbchen nach und nach wenden, bis die Kugeln rund und vollständig gar sind."
        ]
      },
      "variants": [
        "Hausvarianten können Garnelen statt Oktopus verwenden."
      ],
      "serving": [
        "Mit Takoyaki-Sauce, Mayonnaise und Bonitoflocken servieren."
      ],
      "commonMistakes": [
        "Vorsicht: Der Kern ist beim Servieren sehr heiß."
      ]
    }
  },
  "sukiyaki": {
    "en": {
      "overview": "The ingredients are cooked in a shallow pot with soy sauce, sugar and mirin.",
      "history": "Sukiyaki is an established Japanese hot-pot dish with regional cooking methods.",
      "flavor": "Sweet, salty and rich.",
      "technique": "Cook the meat quickly in the concentrated sauce.",
      "essentials": [
        "400 g thinly sliced beef",
        "200 g tofu",
        "200 g Chinese cabbage"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–50 min",
        "ingredients": [
          "400 g thinly sliced beef",
          "200 g tofu",
          "200 g Chinese cabbage",
          "100 g mushrooms",
          "shirataki noodles",
          "100 ml dashi",
          "4 tbsp soy sauce",
          "3 tbsp mirin",
          "1 tbsp sugar"
        ],
        "steps": [
          "Mix dashi, soy sauce, mirin and sugar.",
          "Briefly brown the meat in the pot.",
          "Add sauce, tofu, mushrooms, noodles and cabbage.",
          "Simmer until the vegetables are tender and the meat is done."
        ]
      },
      "variants": [
        "Kantō and Kansai styles use different methods."
      ],
      "serving": [
        "Serve with rice; use pasteurised egg if it is to be served raw as a dip."
      ],
      "commonMistakes": [
        "Do not cook the thin slices of meat longer than necessary."
      ]
    },
    "fr": {
      "overview": "Les ingrédients cuisent dans une marmite peu profonde avec de la sauce soja, du sucre et du mirin.",
      "history": "Le sukiyaki est un plat japonais en marmite bien établi, avec des méthodes de préparation régionales.",
      "flavor": "Sucré, salé et généreux.",
      "technique": "Cuire rapidement la viande dans la sauce concentrée.",
      "essentials": [
        "400 g de bœuf en fines tranches",
        "200 g de tofu",
        "200 g de chou chinois"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–50 min",
        "ingredients": [
          "400 g de bœuf en fines tranches",
          "200 g de tofu",
          "200 g de chou chinois",
          "100 g de champignons",
          "nouilles shirataki",
          "100 ml de dashi",
          "4 c. à soupe de sauce soja",
          "3 c. à soupe de mirin",
          "1 c. à soupe de sucre"
        ],
        "steps": [
          "Mélanger le dashi, la sauce soja, le mirin et le sucre.",
          "Faire brièvement dorer la viande dans la marmite.",
          "Ajouter la sauce, le tofu, les champignons, les nouilles et le chou.",
          "Laisser mijoter jusqu’à ce que les légumes soient tendres et la viande cuite."
        ]
      },
      "variants": [
        "Les styles du Kantō et du Kansai suivent des méthodes différentes."
      ],
      "serving": [
        "Servir avec du riz ; utiliser un œuf pasteurisé s’il doit être servi cru comme sauce à tremper."
      ],
      "commonMistakes": [
        "Ne pas cuire les fines tranches de viande plus longtemps que nécessaire."
      ]
    },
    "pt": {
      "overview": "Os ingredientes são cozinhados num tacho baixo com molho de soja, açúcar e mirin.",
      "history": "O sukiyaki é um prato japonês de tacho tradicional, com métodos regionais de preparação.",
      "flavor": "Doce, salgado e encorpado.",
      "technique": "Cozinhe rapidamente a carne no molho concentrado.",
      "essentials": [
        "400 g de carne de vaca em fatias finas",
        "200 g de tofu",
        "200 g de couve-chinesa"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–50 min",
        "ingredients": [
          "400 g de carne de vaca em fatias finas",
          "200 g de tofu",
          "200 g de couve-chinesa",
          "100 g de cogumelos",
          "noodles shirataki",
          "100 ml de dashi",
          "4 c. de sopa de molho de soja",
          "3 c. de sopa de mirin",
          "1 c. de sopa de açúcar"
        ],
        "steps": [
          "Misture dashi, molho de soja, mirin e açúcar.",
          "Doure brevemente a carne no tacho.",
          "Junte molho, tofu, cogumelos, noodles e couve.",
          "Deixe cozinhar em lume brando até os legumes ficarem tenros e a carne estar cozinhada."
        ]
      },
      "variants": [
        "Os estilos de Kantō e Kansai têm métodos diferentes."
      ],
      "serving": [
        "Sirva com arroz; use ovo pasteurizado se for servido cru como molho para mergulhar."
      ],
      "commonMistakes": [
        "Não coza as fatias finas de carne durante mais tempo do que o necessário."
      ]
    },
    "es": {
      "overview": "Los ingredientes se cocinan en una olla poco profunda con salsa de soja, azúcar y mirin.",
      "history": "El sukiyaki es un plato japonés de olla consolidado, con métodos regionales de preparación.",
      "flavor": "Dulce, salado e intenso.",
      "technique": "Cocina rápidamente la carne en la salsa concentrada.",
      "essentials": [
        "400 g de carne de vacuno en láminas finas",
        "200 g de tofu",
        "200 g de col china"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–50 min",
        "ingredients": [
          "400 g de carne de vacuno en láminas finas",
          "200 g de tofu",
          "200 g de col china",
          "100 g de setas",
          "fideos shirataki",
          "100 ml de dashi",
          "4 cucharadas de salsa de soja",
          "3 cucharadas de mirin",
          "1 cucharada de azúcar"
        ],
        "steps": [
          "Mezcla dashi, salsa de soja, mirin y azúcar.",
          "Dora brevemente la carne en la olla.",
          "Añade salsa, tofu, setas, fideos y col.",
          "Cuece a fuego lento hasta que las verduras estén tiernas y la carne hecha."
        ]
      },
      "variants": [
        "Los estilos de Kantō y Kansai emplean métodos distintos."
      ],
      "serving": [
        "Sirve con arroz; usa huevo pasteurizado si se va a servir crudo para mojar."
      ],
      "commonMistakes": [
        "No cuezas las láminas finas de carne más tiempo del necesario."
      ]
    },
    "de": {
      "overview": "Die Zutaten werden in einem flachen Topf mit Sojasauce, Zucker und Mirin gegart.",
      "history": "Sukiyaki ist ein etabliertes japanisches Topfgericht mit regionalen Zubereitungsweisen.",
      "flavor": "Süß, salzig und vollmundig.",
      "technique": "Fleisch kurz in der konzentrierten Sauce garen.",
      "essentials": [
        "400 g Rindfleisch in dünnen Scheiben",
        "200 g Tofu",
        "200 g Chinakohl"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–50 Min.",
        "ingredients": [
          "400 g Rindfleisch in dünnen Scheiben",
          "200 g Tofu",
          "200 g Chinakohl",
          "100 g Pilze",
          "Shirataki-Nudeln",
          "100 ml Dashi",
          "4 EL Sojasauce",
          "3 EL Mirin",
          "1 EL Zucker"
        ],
        "steps": [
          "Dashi, Sojasauce, Mirin und Zucker mischen.",
          "Fleisch kurz im Topf anbräunen.",
          "Sauce, Tofu, Pilze, Nudeln und Kohl hinzufügen.",
          "Ziehen lassen, bis das Gemüse weich und das Fleisch gar ist."
        ]
      },
      "variants": [
        "Kantō- und Kansai-Stil haben unterschiedliche Zubereitungsweisen."
      ],
      "serving": [
        "Mit Reis servieren; pasteurisiertes Ei verwenden, wenn es roh als Dip gereicht wird."
      ],
      "commonMistakes": [
        "Dünne Fleischscheiben nicht länger als nötig kochen."
      ]
    }
  },
  "shabu-shabu": {
    "en": {
      "overview": "The ingredients are cooked at the table and dipped in sauce.",
      "history": "Shabu-shabu is a well-known Japanese nabemono or hot-pot dish.",
      "flavor": "Mild broth with a fresh or nutty dipping sauce.",
      "technique": "Cook small portions of meat in hot broth until done.",
      "essentials": [
        "400 g thinly sliced beef",
        "1.5 l water",
        "kombu"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–50 min",
        "ingredients": [
          "400 g thinly sliced beef",
          "1.5 l water",
          "kombu",
          "200 g tofu",
          "Chinese cabbage",
          "mushrooms",
          "ponzu",
          "sesame sauce"
        ],
        "steps": [
          "Infuse the kombu in water and remove it before the broth boils.",
          "Add tofu, mushrooms and vegetables.",
          "Cook the meat slices in small batches until done.",
          "Serve with ponzu and sesame sauce."
        ]
      },
      "variants": [
        "Versions with pork or seafood."
      ],
      "serving": [
        "Finish the meal with noodles in the broth if desired."
      ],
      "commonMistakes": [
        "Use separate utensils for raw and cooked meat."
      ]
    },
    "fr": {
      "overview": "Les ingrédients sont cuits à table et trempés dans une sauce.",
      "history": "Le shabu-shabu est un nabemono japonais bien connu, un plat cuit en marmite.",
      "flavor": "Bouillon doux avec une sauce à tremper fraîche ou aux notes de noix.",
      "technique": "Cuire de petites portions de viande dans le bouillon chaud jusqu’à cuisson complète.",
      "essentials": [
        "400 g de bœuf en fines tranches",
        "1,5 l d’eau",
        "kombu"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–50 min",
        "ingredients": [
          "400 g de bœuf en fines tranches",
          "1,5 l d’eau",
          "kombu",
          "200 g de tofu",
          "chou chinois",
          "champignons",
          "ponzu",
          "sauce au sésame"
        ],
        "steps": [
          "Faire infuser le kombu dans l’eau et le retirer avant ébullition du bouillon.",
          "Ajouter le tofu, les champignons et les légumes.",
          "Cuire les tranches de viande par petites quantités jusqu’à cuisson complète.",
          "Servir avec du ponzu et une sauce au sésame."
        ]
      },
      "variants": [
        "Variantes au porc ou aux fruits de mer."
      ],
      "serving": [
        "Terminer éventuellement le repas avec des nouilles dans le bouillon."
      ],
      "commonMistakes": [
        "Utiliser des ustensiles distincts pour la viande crue et la viande cuite."
      ]
    },
    "pt": {
      "overview": "Os ingredientes são cozinhados à mesa e mergulhados em molho.",
      "history": "O shabu-shabu é um conhecido nabemono japonês, ou prato de tacho.",
      "flavor": "Caldo suave com molho fresco ou com notas de frutos secos.",
      "technique": "Coza pequenas porções de carne em caldo quente até estarem prontas.",
      "essentials": [
        "400 g de carne de vaca em fatias finas",
        "1,5 l de água",
        "kombu"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–50 min",
        "ingredients": [
          "400 g de carne de vaca em fatias finas",
          "1,5 l de água",
          "kombu",
          "200 g de tofu",
          "couve-chinesa",
          "cogumelos",
          "ponzu",
          "molho de sésamo"
        ],
        "steps": [
          "Deixe o kombu em infusão na água e retire-o antes de o caldo ferver.",
          "Junte tofu, cogumelos e legumes.",
          "Coza as fatias de carne em pequenas porções até estarem prontas.",
          "Sirva com ponzu e molho de sésamo."
        ]
      },
      "variants": [
        "Variantes com carne de porco ou marisco."
      ],
      "serving": [
        "Se desejar, termine a refeição com noodles no caldo."
      ],
      "commonMistakes": [
        "Use utensílios separados para carne crua e cozinhada."
      ]
    },
    "es": {
      "overview": "Los ingredientes se cocinan en la mesa y se mojan en salsa.",
      "history": "El shabu-shabu es un conocido nabemono japonés, o plato de olla.",
      "flavor": "Caldo suave con salsa para mojar fresca o con notas de frutos secos.",
      "technique": "Cuece pequeñas porciones de carne en caldo caliente hasta que estén hechas.",
      "essentials": [
        "400 g de carne de vacuno en láminas finas",
        "1,5 l de agua",
        "kombu"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–50 min",
        "ingredients": [
          "400 g de carne de vacuno en láminas finas",
          "1,5 l de agua",
          "kombu",
          "200 g de tofu",
          "col china",
          "setas",
          "ponzu",
          "salsa de sésamo"
        ],
        "steps": [
          "Deja infusionar el kombu en agua y retíralo antes de que hierva el caldo.",
          "Añade tofu, setas y verduras.",
          "Cuece las láminas de carne en tandas pequeñas hasta que estén hechas.",
          "Sirve con ponzu y salsa de sésamo."
        ]
      },
      "variants": [
        "Variantes con cerdo o marisco."
      ],
      "serving": [
        "Si quieres, termina la comida con fideos en el caldo."
      ],
      "commonMistakes": [
        "Usa utensilios distintos para carne cruda y cocinada."
      ]
    },
    "de": {
      "overview": "Die Zutaten werden am Tisch gegart und in Sauce getaucht.",
      "history": "Shabu-Shabu ist ein bekanntes japanisches Nabemono- oder Topfgericht.",
      "flavor": "Milde Brühe mit frischem oder nussigem Dip.",
      "technique": "Kleine Fleischportionen in heißer Brühe fertig garen.",
      "essentials": [
        "400 g Rindfleisch in dünnen Scheiben",
        "1,5 l Wasser",
        "Kombu"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–50 Min.",
        "ingredients": [
          "400 g Rindfleisch in dünnen Scheiben",
          "1,5 l Wasser",
          "Kombu",
          "200 g Tofu",
          "Chinakohl",
          "Pilze",
          "Ponzu",
          "Sesamsauce"
        ],
        "steps": [
          "Kombu in Wasser ziehen lassen und vor dem Aufkochen der Brühe herausnehmen.",
          "Tofu, Pilze und Gemüse hinzufügen.",
          "Fleischscheiben in kleinen Portionen fertig garen.",
          "Mit Ponzu und Sesamsauce servieren."
        ]
      },
      "variants": [
        "Varianten mit Schweinefleisch oder Meeresfrüchten."
      ],
      "serving": [
        "Die Mahlzeit nach Wunsch mit Nudeln in der Brühe abschließen."
      ],
      "commonMistakes": [
        "Getrennte Utensilien für rohes und gegartes Fleisch verwenden."
      ]
    }
  },
  "katsudon": {
    "en": {
      "overview": "Tonkatsu is briefly simmered in a sweet-salty dashi and soy mixture with egg.",
      "history": "Katsudon belongs to the Japanese donburi tradition of toppings over rice.",
      "flavor": "Rich, sweet-salty and juicy.",
      "technique": "Let the breaded meat simmer briefly in the sauce before the egg sets.",
      "essentials": [
        "4 boneless pork chops",
        "flour",
        "2 eggs for breading"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–50 min",
        "ingredients": [
          "4 boneless pork chops",
          "flour",
          "2 eggs for breading",
          "panko",
          "oil",
          "600 g cooked rice",
          "1 onion",
          "200 ml dashi",
          "3 tbsp soy sauce",
          "2 tbsp mirin",
          "4 eggs"
        ],
        "steps": [
          "Coat the chops in flour, egg and panko.",
          "Fry in oil until cooked through and cut into strips.",
          "Cook the onion in dashi, soy sauce and mirin.",
          "Place the meat in the sauce, pour over beaten egg and let it set.",
          "Serve over hot rice."
        ]
      },
      "variants": [
        "Sauce katsudon is served with sauce without the egg mixture."
      ],
      "serving": [
        "Top with spring onions if desired."
      ],
      "commonMistakes": [
        "Do not let the breading soak so long that it disintegrates."
      ]
    },
    "fr": {
      "overview": "Le tonkatsu mijote brièvement dans un mélange sucré-salé de dashi et de sauce soja avec de l’œuf.",
      "history": "Le katsudon appartient à la tradition japonaise du donburi, où des garnitures recouvrent le riz.",
      "flavor": "Généreux, sucré-salé et juteux.",
      "technique": "Laisser la viande panée mijoter brièvement dans la sauce avant que l’œuf ne prenne.",
      "essentials": [
        "4 côtelettes de porc désossées",
        "farine",
        "2 œufs pour la panure"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–50 min",
        "ingredients": [
          "4 côtelettes de porc désossées",
          "farine",
          "2 œufs pour la panure",
          "panko",
          "huile",
          "600 g de riz cuit",
          "1 oignon",
          "200 ml de dashi",
          "3 c. à soupe de sauce soja",
          "2 c. à soupe de mirin",
          "4 œufs"
        ],
        "steps": [
          "Passer les côtelettes dans la farine, l’œuf et le panko.",
          "Frire dans l’huile jusqu’à cuisson complète et couper en lanières.",
          "Cuire l’oignon dans le dashi, la sauce soja et le mirin.",
          "Déposer la viande dans la sauce, verser les œufs battus et laisser prendre.",
          "Servir sur du riz chaud."
        ]
      },
      "variants": [
        "Le sauce katsudon est servi avec une sauce sans le mélange aux œufs."
      ],
      "serving": [
        "Garnir éventuellement d’oignons nouveaux."
      ],
      "commonMistakes": [
        "Ne pas laisser tremper la panure si longtemps qu’elle se désagrège."
      ]
    },
    "pt": {
      "overview": "O tonkatsu é cozinhado brevemente numa mistura doce-salgada de dashi e soja com ovo.",
      "history": "O katsudon pertence à tradição japonesa do donburi, com coberturas sobre arroz.",
      "flavor": "Encorpado, doce-salgado e suculento.",
      "technique": "Deixe a carne panada cozinhar brevemente no molho antes de o ovo solidificar.",
      "essentials": [
        "4 costeletas de porco sem osso",
        "farinha",
        "2 ovos para panar"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–50 min",
        "ingredients": [
          "4 costeletas de porco sem osso",
          "farinha",
          "2 ovos para panar",
          "panko",
          "óleo",
          "600 g de arroz cozido",
          "1 cebola",
          "200 ml de dashi",
          "3 c. de sopa de molho de soja",
          "2 c. de sopa de mirin",
          "4 ovos"
        ],
        "steps": [
          "Passe as costeletas por farinha, ovo e panko.",
          "Frite em óleo até estarem bem cozinhadas e corte em tiras.",
          "Coza a cebola em dashi, molho de soja e mirin.",
          "Coloque a carne no molho, verta o ovo batido por cima e deixe solidificar.",
          "Sirva sobre arroz quente."
        ]
      },
      "variants": [
        "O sauce katsudon é servido com molho sem a mistura de ovos."
      ],
      "serving": [
        "Se desejar, cubra com cebolinha verde."
      ],
      "commonMistakes": [
        "Não deixe o panado absorver molho durante tanto tempo que se desfaça."
      ]
    },
    "es": {
      "overview": "El tonkatsu se cuece brevemente en una mezcla dulce-salada de dashi y soja con huevo.",
      "history": "El katsudon pertenece a la tradición japonesa del donburi, con ingredientes sobre arroz.",
      "flavor": "Intenso, dulce-salado y jugoso.",
      "technique": "Deja que la carne empanada cueza brevemente en la salsa antes de que cuaje el huevo.",
      "essentials": [
        "4 chuletas de cerdo deshuesadas",
        "harina",
        "2 huevos para empanar"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–50 min",
        "ingredients": [
          "4 chuletas de cerdo deshuesadas",
          "harina",
          "2 huevos para empanar",
          "panko",
          "aceite",
          "600 g de arroz cocido",
          "1 cebolla",
          "200 ml de dashi",
          "3 cucharadas de salsa de soja",
          "2 cucharadas de mirin",
          "4 huevos"
        ],
        "steps": [
          "Pasa las chuletas por harina, huevo y panko.",
          "Fríe en aceite hasta que estén hechas por dentro y corta en tiras.",
          "Cuece la cebolla en dashi, salsa de soja y mirin.",
          "Coloca la carne en la salsa, vierte el huevo batido y deja cuajar.",
          "Sirve sobre arroz caliente."
        ]
      },
      "variants": [
        "El sauce katsudon se sirve con salsa sin la mezcla de huevo."
      ],
      "serving": [
        "Si quieres, añade cebolletas por encima."
      ],
      "commonMistakes": [
        "No dejes que el empanado se empape tanto que se deshaga."
      ]
    },
    "de": {
      "overview": "Tonkatsu zieht kurz in einer süß-salzigen Dashi-Soja-Mischung mit Ei.",
      "history": "Katsudon gehört zur japanischen Donburi-Tradition mit Belägen auf Reis.",
      "flavor": "Kräftig, süß-salzig und saftig.",
      "technique": "Paniertes Fleisch kurz in der Sauce ziehen lassen, bevor das Ei stockt.",
      "essentials": [
        "4 Schweinekoteletts ohne Knochen",
        "Mehl",
        "2 Eier zum Panieren"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–50 Min.",
        "ingredients": [
          "4 Schweinekoteletts ohne Knochen",
          "Mehl",
          "2 Eier zum Panieren",
          "Panko",
          "Öl",
          "600 g gekochter Reis",
          "1 Zwiebel",
          "200 ml Dashi",
          "3 EL Sojasauce",
          "2 EL Mirin",
          "4 Eier"
        ],
        "steps": [
          "Koteletts in Mehl, Ei und Panko wenden.",
          "In Öl vollständig durchbraten und in Streifen schneiden.",
          "Zwiebel in Dashi, Sojasauce und Mirin kochen.",
          "Fleisch in die Sauce legen, verquirltes Ei darübergeben und stocken lassen.",
          "Auf heißem Reis servieren."
        ]
      },
      "variants": [
        "Sauce Katsudon wird mit Sauce ohne Eimischung serviert."
      ],
      "serving": [
        "Nach Wunsch mit Frühlingszwiebeln garnieren."
      ],
      "commonMistakes": [
        "Panade nicht so lange einweichen lassen, dass sie zerfällt."
      ]
    }
  },
  "kung-pao-chicken": {
    "en": {
      "overview": "Small pieces of chicken are quickly fried with aromatics and a concentrated sweet-and-sour sauce.",
      "history": "Gong bao ji ding is a classic of Sichuan cuisine, with many international restaurant versions.",
      "flavor": "Hot, nutty, tangy and slightly numbing from Sichuan pepper.",
      "technique": "Prepare all ingredients before heating the wok.",
      "essentials": [
        "500 g boneless chicken thigh",
        "60 g peanuts",
        "dried chilli"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30 min",
        "ingredients": [
          "500 g boneless chicken thigh",
          "60 g peanuts",
          "dried chilli",
          "1 tsp Sichuan pepper",
          "2 tbsp soy sauce",
          "1 tbsp black rice vinegar",
          "1 tsp sugar",
          "cornflour",
          "spring onions",
          "oil"
        ],
        "steps": [
          "Cut the chicken into small cubes and mix with a little soy sauce and starch.",
          "Mix vinegar, sugar and the remaining soy sauce.",
          "Briefly fry chilli and Sichuan pepper, add chicken and cook through.",
          "Fold in the sauce, spring onions and peanuts."
        ]
      },
      "variants": [
        "Restaurant versions may contain peppers or other vegetables."
      ],
      "serving": [
        "Serve with steamed rice."
      ],
      "commonMistakes": [
        "Do not let the dried chilli burn."
      ]
    },
    "fr": {
      "overview": "De petits morceaux de poulet sont rapidement sautés avec des aromates et une sauce aigre-douce concentrée.",
      "history": "Le gong bao ji ding est un classique de la cuisine du Sichuan, avec de nombreuses variantes internationales de restaurant.",
      "flavor": "Piquant, aux notes de noix, acidulé et légèrement anesthésiant grâce au poivre du Sichuan.",
      "technique": "Préparer tous les ingrédients avant de chauffer le wok.",
      "essentials": [
        "500 g de hauts de cuisse de poulet désossés",
        "60 g de cacahuètes",
        "piment séché"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30 min",
        "ingredients": [
          "500 g de hauts de cuisse de poulet désossés",
          "60 g de cacahuètes",
          "piment séché",
          "1 c. à café de poivre du Sichuan",
          "2 c. à soupe de sauce soja",
          "1 c. à soupe de vinaigre de riz noir",
          "1 c. à café de sucre",
          "fécule de maïs",
          "oignons nouveaux",
          "huile"
        ],
        "steps": [
          "Couper le poulet en petits dés et mélanger avec un peu de sauce soja et de fécule.",
          "Mélanger le vinaigre, le sucre et le reste de la sauce soja.",
          "Faire revenir brièvement le piment et le poivre du Sichuan, ajouter le poulet et cuire à cœur.",
          "Incorporer la sauce, les oignons nouveaux et les cacahuètes."
        ]
      },
      "variants": [
        "Les versions de restaurant peuvent contenir des poivrons ou d’autres légumes."
      ],
      "serving": [
        "Servir avec du riz cuit à la vapeur."
      ],
      "commonMistakes": [
        "Ne pas laisser brûler le piment séché."
      ]
    },
    "pt": {
      "overview": "Pequenos pedaços de frango são rapidamente salteados com aromáticos e um molho agridoce concentrado.",
      "history": "O gong bao ji ding é um clássico da cozinha de Sichuan, com muitas versões internacionais de restaurante.",
      "flavor": "Picante, com notas de frutos secos, ácido e ligeiramente anestesiante devido à pimenta de Sichuan.",
      "technique": "Prepare todos os ingredientes antes de aquecer o wok.",
      "essentials": [
        "500 g de coxa de frango desossada",
        "60 g de amendoins",
        "malagueta seca"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30 min",
        "ingredients": [
          "500 g de coxa de frango desossada",
          "60 g de amendoins",
          "malagueta seca",
          "1 c. de chá de pimenta de Sichuan",
          "2 c. de sopa de molho de soja",
          "1 c. de sopa de vinagre de arroz preto",
          "1 c. de chá de açúcar",
          "amido de milho",
          "cebolinha verde",
          "óleo"
        ],
        "steps": [
          "Corte o frango em pequenos cubos e misture com um pouco de molho de soja e amido.",
          "Misture o vinagre, o açúcar e o restante molho de soja.",
          "Salteie brevemente a malagueta e a pimenta de Sichuan, junte o frango e cozinhe completamente.",
          "Envolva o molho, a cebolinha verde e os amendoins."
        ]
      },
      "variants": [
        "As versões de restaurante podem conter pimentos ou outros legumes."
      ],
      "serving": [
        "Sirva com arroz cozido a vapor."
      ],
      "commonMistakes": [
        "Não deixe a malagueta seca queimar."
      ]
    },
    "es": {
      "overview": "Pequeños trozos de pollo se saltean rápidamente con aromáticos y una salsa agridulce concentrada.",
      "history": "El gong bao ji ding es un clásico de la cocina de Sichuan, con muchas versiones internacionales de restaurante.",
      "flavor": "Picante, con notas de frutos secos, ácido y ligeramente adormecedor por la pimienta de Sichuan.",
      "technique": "Prepara todos los ingredientes antes de calentar el wok.",
      "essentials": [
        "500 g de contramuslo de pollo deshuesado",
        "60 g de cacahuetes",
        "chile seco"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30 min",
        "ingredients": [
          "500 g de contramuslo de pollo deshuesado",
          "60 g de cacahuetes",
          "chile seco",
          "1 cucharadita de pimienta de Sichuan",
          "2 cucharadas de salsa de soja",
          "1 cucharada de vinagre de arroz negro",
          "1 cucharadita de azúcar",
          "almidón de maíz",
          "cebolletas",
          "aceite"
        ],
        "steps": [
          "Corta el pollo en dados pequeños y mezcla con un poco de salsa de soja y almidón.",
          "Mezcla el vinagre, el azúcar y el resto de la salsa de soja.",
          "Sofríe brevemente el chile y la pimienta de Sichuan, añade el pollo y cocina por completo.",
          "Incorpora la salsa, las cebolletas y los cacahuetes."
        ]
      },
      "variants": [
        "Las versiones de restaurante pueden contener pimientos u otras verduras."
      ],
      "serving": [
        "Sirve con arroz al vapor."
      ],
      "commonMistakes": [
        "No dejes que el chile seco se queme."
      ]
    },
    "de": {
      "overview": "Kleine Hähnchenstücke werden mit Aromaten und einer konzentrierten süßsauren Sauce kurz gebraten.",
      "history": "Gong Bao Ji Ding ist ein Klassiker der Sichuan-Küche mit vielen internationalen Restaurantvarianten.",
      "flavor": "Scharf, nussig, säuerlich und durch Sichuanpfeffer leicht betäubend.",
      "technique": "Alle Zutaten vorbereiten, bevor der Wok erhitzt wird.",
      "essentials": [
        "500 g Hähnchenschenkelfilet",
        "60 g Erdnüsse",
        "getrocknete Chili"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30 Min.",
        "ingredients": [
          "500 g Hähnchenschenkelfilet",
          "60 g Erdnüsse",
          "getrocknete Chili",
          "1 TL Sichuanpfeffer",
          "2 EL Sojasauce",
          "1 EL schwarzer Reisessig",
          "1 TL Zucker",
          "Maisstärke",
          "Frühlingszwiebeln",
          "Öl"
        ],
        "steps": [
          "Hähnchen klein würfeln und mit etwas Sojasauce und Stärke mischen.",
          "Essig, Zucker und übrige Sojasauce mischen.",
          "Chili und Sichuanpfeffer kurz anrösten, Hähnchen hinzufügen und vollständig durchgaren.",
          "Sauce, Frühlingszwiebeln und Erdnüsse unterheben."
        ]
      },
      "variants": [
        "Restaurantvarianten können Paprika oder anderes Gemüse enthalten."
      ],
      "serving": [
        "Mit gedämpftem Reis servieren."
      ],
      "commonMistakes": [
        "Getrocknete Chili nicht verbrennen lassen."
      ]
    }
  },
  "xiaolongbao": {
    "en": {
      "overview": "Set stock is mixed into the filling and melts during steaming.",
      "history": "Xiaolongbao are particularly associated with the Jiangnan region and the Shanghai area.",
      "flavor": "Juicy, mildly spiced and rich in umami.",
      "technique": "Chill the stock jelly thoroughly and seal the dough carefully.",
      "essentials": [
        "300 g wheat flour",
        "150 ml water, approximately",
        "300 g minced pork"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 90 min + stock chilling",
        "ingredients": [
          "300 g wheat flour",
          "150 ml water, approximately",
          "300 g minced pork",
          "200 g firm stock jelly",
          "ginger",
          "soy sauce",
          "spring onions"
        ],
        "steps": [
          "Knead flour and water into a smooth dough and let it rest.",
          "Mix the meat with aromatics and cubes of cold stock jelly.",
          "Roll out small, thin dough discs, fill and seal with pleats.",
          "Steam in a basket until the meat filling is cooked through."
        ]
      },
      "variants": [
        "Versions with crab and pork exist."
      ],
      "serving": [
        "Serve with black vinegar and ginger; let the hot broth cool slightly before eating."
      ],
      "commonMistakes": [
        "Do not use liquid stock in the filling or make holes in the dough."
      ]
    },
    "fr": {
      "overview": "Du bouillon gélifié est incorporé à la farce et fond pendant la cuisson à la vapeur.",
      "history": "Les xiaolongbao sont particulièrement associés à la région du Jiangnan et aux environs de Shanghai.",
      "flavor": "Juteux, légèrement épicés et riches en umami.",
      "technique": "Bien refroidir la gelée de bouillon et fermer soigneusement la pâte.",
      "essentials": [
        "300 g de farine de blé",
        "150 ml d’eau, environ",
        "300 g de porc haché"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 90 min + refroidissement du bouillon",
        "ingredients": [
          "300 g de farine de blé",
          "150 ml d’eau, environ",
          "300 g de porc haché",
          "200 g de gelée de bouillon ferme",
          "gingembre",
          "sauce soja",
          "oignons nouveaux"
        ],
        "steps": [
          "Pétrir la farine et l’eau pour obtenir une pâte lisse, puis laisser reposer.",
          "Mélanger la viande avec les aromates et des dés de gelée de bouillon froide.",
          "Étaler de petits disques de pâte fins, les garnir et les fermer en formant des plis.",
          "Cuire dans un panier vapeur jusqu’à cuisson complète de la farce à la viande."
        ]
      },
      "variants": [
        "Il existe des variantes au crabe et au porc."
      ],
      "serving": [
        "Servir avec du vinaigre noir et du gingembre ; laisser le bouillon chaud refroidir légèrement avant de manger."
      ],
      "commonMistakes": [
        "Ne pas utiliser de bouillon liquide dans la farce ni percer la pâte."
      ]
    },
    "pt": {
      "overview": "O caldo gelificado é misturado no recheio e derrete durante a cozedura a vapor.",
      "history": "Os xiaolongbao estão especialmente associados à região de Jiangnan e à zona de Xangai.",
      "flavor": "Suculentos, ligeiramente condimentados e ricos em umami.",
      "technique": "Arrefeça bem a gelatina de caldo e sele cuidadosamente a massa.",
      "essentials": [
        "300 g de farinha de trigo",
        "150 ml de água, aproximadamente",
        "300 g de carne de porco picada"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 90 min + refrigeração do caldo",
        "ingredients": [
          "300 g de farinha de trigo",
          "150 ml de água, aproximadamente",
          "300 g de carne de porco picada",
          "200 g de caldo gelificado firme",
          "gengibre",
          "molho de soja",
          "cebolinha verde"
        ],
        "steps": [
          "Amasse a farinha e a água até obter uma massa lisa e deixe repousar.",
          "Misture a carne com aromáticos e cubos de caldo gelificado frio.",
          "Estenda pequenos discos finos de massa, recheie e feche com pregas.",
          "Coza a vapor num cesto até o recheio de carne estar bem cozinhado."
        ]
      },
      "variants": [
        "Existem variantes com caranguejo e carne de porco."
      ],
      "serving": [
        "Sirva com vinagre preto e gengibre; deixe o caldo quente arrefecer um pouco antes de comer."
      ],
      "commonMistakes": [
        "Não use caldo líquido no recheio nem faça furos na massa."
      ]
    },
    "es": {
      "overview": "El caldo gelificado se mezcla con el relleno y se derrite durante la cocción al vapor.",
      "history": "Los xiaolongbao se asocian especialmente con la región de Jiangnan y la zona de Shanghái.",
      "flavor": "Jugosos, ligeramente especiados y ricos en umami.",
      "technique": "Enfría bien la gelatina de caldo y sella cuidadosamente la masa.",
      "essentials": [
        "300 g de harina de trigo",
        "150 ml de agua, aproximadamente",
        "300 g de carne de cerdo picada"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 90 min + refrigeración del caldo",
        "ingredients": [
          "300 g de harina de trigo",
          "150 ml de agua, aproximadamente",
          "300 g de carne de cerdo picada",
          "200 g de gelatina de caldo firme",
          "jengibre",
          "salsa de soja",
          "cebolletas"
        ],
        "steps": [
          "Amasa la harina y el agua hasta obtener una masa lisa y deja reposar.",
          "Mezcla la carne con aromáticos y dados de gelatina de caldo fría.",
          "Estira discos pequeños y finos de masa, rellena y cierra formando pliegues.",
          "Cuece al vapor en una cesta hasta que el relleno de carne esté hecho por dentro."
        ]
      },
      "variants": [
        "Existen variantes con cangrejo y cerdo."
      ],
      "serving": [
        "Sirve con vinagre negro y jengibre; deja que el caldo caliente se enfríe un poco antes de comer."
      ],
      "commonMistakes": [
        "No uses caldo líquido en el relleno ni hagas agujeros en la masa."
      ]
    },
    "de": {
      "overview": "Gelierter Fond wird unter die Füllung gemischt und schmilzt beim Dämpfen.",
      "history": "Xiaolongbao sind besonders mit der Jiangnan-Region und dem Raum Shanghai verbunden.",
      "flavor": "Saftig, mild gewürzt und reich an Umami.",
      "technique": "Fondgelée gut kühlen und den Teig sorgfältig verschließen.",
      "essentials": [
        "300 g Weizenmehl",
        "150 ml Wasser, ungefähr",
        "300 g Schweinehackfleisch"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 90 Min. + Kühlzeit für die Brühe",
        "ingredients": [
          "300 g Weizenmehl",
          "150 ml Wasser, ungefähr",
          "300 g Schweinehackfleisch",
          "200 g feste Fondgelée",
          "Ingwer",
          "Sojasauce",
          "Frühlingszwiebeln"
        ],
        "steps": [
          "Mehl und Wasser zu einem glatten Teig kneten und ruhen lassen.",
          "Fleisch mit Aromaten und Würfeln kalter Fondgelée mischen.",
          "Kleine dünne Teigscheiben ausrollen, füllen und mit Falten verschließen.",
          "Im Dämpfkorb garen, bis die Fleischfüllung vollständig durchgegart ist."
        ]
      },
      "variants": [
        "Es gibt Varianten mit Krabbenfleisch und Schweinefleisch."
      ],
      "serving": [
        "Mit schwarzem Essig und Ingwer servieren; die heiße Brühe vor dem Essen etwas abkühlen lassen."
      ],
      "commonMistakes": [
        "Keine flüssige Brühe in der Füllung verwenden und keine Löcher in den Teig machen."
      ]
    }
  },
  "char-siu": {
    "en": {
      "overview": "The meat is marinated with soy sauce and aromatic spices before roasting.",
      "history": "Char siu is part of the Cantonese siu mei tradition of roasted meats.",
      "flavor": "Sweet-salty, aromatic and roasted.",
      "technique": "Glaze the meat towards the end to avoid burning the sugar.",
      "essentials": [
        "700 g pork neck",
        "2 tbsp hoisin sauce",
        "2 tbsp soy sauce"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 1 hour + marinating",
        "ingredients": [
          "700 g pork neck",
          "2 tbsp hoisin sauce",
          "2 tbsp soy sauce",
          "1 tbsp honey",
          "1 tsp five-spice powder",
          "garlic"
        ],
        "steps": [
          "Mix the marinade and reserve a clean portion for glazing.",
          "Marinate the meat in the refrigerator for several hours.",
          "Roast on a rack at 200 °C until the core reaches at least 63 °C; let rest for at least three minutes.",
          "Brush with the reserved glaze towards the end and slice."
        ]
      },
      "variants": [
        "Different cuts of pork and different sweeteners are used."
      ],
      "serving": [
        "Serve with rice, noodles or in bao."
      ],
      "commonMistakes": [
        "Do not use marinade that has touched raw meat as a finishing glaze."
      ]
    },
    "fr": {
      "overview": "La viande est marinée dans de la sauce soja et des épices aromatiques avant d’être rôtie.",
      "history": "Le char siu fait partie de la tradition cantonaise du siu mei, consacrée aux viandes rôties.",
      "flavor": "Sucré-salé, aromatique et grillé.",
      "technique": "Glacer la viande en fin de cuisson pour éviter de brûler le sucre.",
      "essentials": [
        "700 g d’échine de porc",
        "2 c. à soupe de sauce hoisin",
        "2 c. à soupe de sauce soja"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 1 heure + marinade",
        "ingredients": [
          "700 g d’échine de porc",
          "2 c. à soupe de sauce hoisin",
          "2 c. à soupe de sauce soja",
          "1 c. à soupe de miel",
          "1 c. à café de mélange cinq-épices",
          "ail"
        ],
        "steps": [
          "Mélanger la marinade et en réserver une portion propre pour le glaçage.",
          "Faire mariner la viande au réfrigérateur pendant plusieurs heures.",
          "Rôtir sur une grille à 200 °C jusqu’à une température à cœur d’au moins 63 °C ; laisser reposer au moins trois minutes.",
          "Badigeonner du glaçage réservé en fin de cuisson et couper en tranches."
        ]
      },
      "variants": [
        "On utilise différents morceaux de porc et différents ingrédients sucrants."
      ],
      "serving": [
        "Servir avec du riz, des nouilles ou dans des bao."
      ],
      "commonMistakes": [
        "Ne pas utiliser comme glaçage final une marinade ayant été en contact avec de la viande crue."
      ]
    },
    "pt": {
      "overview": "A carne é marinada com molho de soja e especiarias aromáticas antes de ser assada.",
      "history": "O char siu faz parte da tradição cantonesa de carnes assadas siu mei.",
      "flavor": "Doce-salgado, aromático e tostado.",
      "technique": "Pincele a carne com o glacê perto do fim para evitar queimar o açúcar.",
      "essentials": [
        "700 g de cachaço de porco",
        "2 c. de sopa de molho hoisin",
        "2 c. de sopa de molho de soja"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 1 hora + marinada",
        "ingredients": [
          "700 g de cachaço de porco",
          "2 c. de sopa de molho hoisin",
          "2 c. de sopa de molho de soja",
          "1 c. de sopa de mel",
          "1 c. de chá de mistura de cinco especiarias",
          "alho"
        ],
        "steps": [
          "Misture a marinada e reserve uma porção limpa para pincelar.",
          "Marine a carne no frigorífico durante várias horas.",
          "Asse sobre uma grelha a 200 °C até atingir pelo menos 63 °C no interior; deixe repousar pelo menos três minutos.",
          "Pincele com o glacê reservado perto do fim e corte em fatias."
        ]
      },
      "variants": [
        "Usam-se diferentes cortes de porco e diferentes adoçantes."
      ],
      "serving": [
        "Sirva com arroz, noodles ou em bao."
      ],
      "commonMistakes": [
        "Não use como glacê final marinada que tenha estado em contacto com carne crua."
      ]
    },
    "es": {
      "overview": "La carne se marina con salsa de soja y especias aromáticas antes de asarla.",
      "history": "El char siu forma parte de la tradición cantonesa de carnes asadas siu mei.",
      "flavor": "Dulce-salado, aromático y tostado.",
      "technique": "Glasea la carne hacia el final para evitar que se queme el azúcar.",
      "essentials": [
        "700 g de cabecero de lomo de cerdo",
        "2 cucharadas de salsa hoisin",
        "2 cucharadas de salsa de soja"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 1 hora + marinado",
        "ingredients": [
          "700 g de cabecero de lomo de cerdo",
          "2 cucharadas de salsa hoisin",
          "2 cucharadas de salsa de soja",
          "1 cucharada de miel",
          "1 cucharadita de cinco especias",
          "ajo"
        ],
        "steps": [
          "Mezcla la marinada y reserva una porción limpia para glasear.",
          "Marina la carne en el frigorífico durante varias horas.",
          "Asa sobre una rejilla a 200 °C hasta alcanzar al menos 63 °C en el centro; deja reposar al menos tres minutos.",
          "Pincela con el glaseado reservado hacia el final y corta en lonchas."
        ]
      },
      "variants": [
        "Se utilizan distintos cortes de cerdo y distintos endulzantes."
      ],
      "serving": [
        "Sirve con arroz, fideos o dentro de bao."
      ],
      "commonMistakes": [
        "No uses como glaseado final marinada que haya estado en contacto con carne cruda."
      ]
    },
    "de": {
      "overview": "Das Fleisch wird vor dem Braten mit Sojasauce und aromatischen Gewürzen mariniert.",
      "history": "Char Siu gehört zur kantonesischen Siu-Mei-Tradition der Bratengerichte.",
      "flavor": "Süß-salzig, aromatisch und röstig.",
      "technique": "Fleisch gegen Ende glasieren, damit der Zucker nicht verbrennt.",
      "essentials": [
        "700 g Schweinenacken",
        "2 EL Hoisinsauce",
        "2 EL Sojasauce"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 1 Stunde + Marinierzeit",
        "ingredients": [
          "700 g Schweinenacken",
          "2 EL Hoisinsauce",
          "2 EL Sojasauce",
          "1 EL Honig",
          "1 TL Fünf-Gewürze-Pulver",
          "Knoblauch"
        ],
        "steps": [
          "Marinade mischen und eine saubere Portion zum Glasieren zurückbehalten.",
          "Fleisch mehrere Stunden im Kühlschrank marinieren.",
          "Auf einem Rost bei 200 °C braten, bis die Kerntemperatur mindestens 63 °C erreicht; mindestens drei Minuten ruhen lassen.",
          "Gegen Ende mit der zurückbehaltenen Glasur bestreichen und in Scheiben schneiden."
        ]
      },
      "variants": [
        "Verschiedene Schweinefleischstücke und Süßungsmittel werden verwendet."
      ],
      "serving": [
        "Mit Reis, Nudeln oder in Bao servieren."
      ],
      "commonMistakes": [
        "Keine Marinade, die mit rohem Fleisch in Kontakt war, als fertige Glasur verwenden."
      ]
    }
  },
  "chow-mein": {
    "en": {
      "overview": "The noodles are fried with soy sauce and other ingredients; the texture varies from soft to crisp.",
      "history": "Chow mein has many forms in Chinese cuisines and international Chinese restaurant traditions.",
      "flavor": "Roasted, salty and aromatic.",
      "technique": "Cook the noodles until just tender and fry in small batches.",
      "essentials": [
        "350 g egg noodles",
        "250 g chicken",
        "150 g cabbage"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30 min",
        "ingredients": [
          "350 g egg noodles",
          "250 g chicken",
          "150 g cabbage",
          "1 carrot",
          "bean sprouts",
          "2 tbsp soy sauce",
          "1 tbsp oyster sauce",
          "oil"
        ],
        "steps": [
          "Cook the noodles according to the instructions and drain.",
          "Cut the vegetables and chicken into thin pieces.",
          "Cook the chicken through and add the vegetables.",
          "Fold in the noodles and sauce and fry quickly over high heat."
        ]
      },
      "variants": [
        "Versions with crisp noodles, seafood or tofu."
      ],
      "serving": [
        "Serve immediately from the wok."
      ],
      "commonMistakes": [
        "Do not overcrowd the pan, or the noodles will steam instead of fry."
      ]
    },
    "fr": {
      "overview": "Les nouilles sont sautées avec de la sauce soja et des garnitures ; leur texture varie de tendre à croustillante.",
      "history": "Le chow mein existe sous de nombreuses formes dans les cuisines chinoises et les traditions des restaurants chinois à l’étranger.",
      "flavor": "Grillé, salé et aromatique.",
      "technique": "Cuire les nouilles juste à point et les faire sauter par petites quantités.",
      "essentials": [
        "350 g de nouilles aux œufs",
        "250 g de poulet",
        "150 g de chou"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30 min",
        "ingredients": [
          "350 g de nouilles aux œufs",
          "250 g de poulet",
          "150 g de chou",
          "1 carotte",
          "pousses de haricot",
          "2 c. à soupe de sauce soja",
          "1 c. à soupe de sauce d’huître",
          "huile"
        ],
        "steps": [
          "Cuire les nouilles selon les instructions et les égoutter.",
          "Couper les légumes et le poulet en morceaux fins.",
          "Cuire le poulet à cœur et ajouter les légumes.",
          "Incorporer les nouilles et la sauce, puis faire sauter rapidement à feu vif."
        ]
      },
      "variants": [
        "Variantes aux nouilles croustillantes, aux fruits de mer ou au tofu."
      ],
      "serving": [
        "Servir immédiatement à la sortie du wok."
      ],
      "commonMistakes": [
        "Ne pas surcharger la poêle, sinon les nouilles cuiront à la vapeur plutôt que de sauter."
      ]
    },
    "pt": {
      "overview": "Os noodles são salteados com molho de soja e outros ingredientes; a textura varia de macia a crocante.",
      "history": "O chow mein tem muitas formas nas cozinhas chinesas e nas tradições internacionais de restaurantes chineses.",
      "flavor": "Tostado, salgado e aromático.",
      "technique": "Coza os noodles até ficarem apenas tenros e salteie em pequenas porções.",
      "essentials": [
        "350 g de noodles de ovo",
        "250 g de frango",
        "150 g de couve"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30 min",
        "ingredients": [
          "350 g de noodles de ovo",
          "250 g de frango",
          "150 g de couve",
          "1 cenoura",
          "rebentos de feijão",
          "2 c. de sopa de molho de soja",
          "1 c. de sopa de molho de ostras",
          "óleo"
        ],
        "steps": [
          "Coza os noodles de acordo com as instruções e escorra.",
          "Corte os legumes e o frango em pedaços finos.",
          "Cozinhe completamente o frango e junte os legumes.",
          "Envolva os noodles e o molho e salteie rapidamente em lume forte."
        ]
      },
      "variants": [
        "Variantes com noodles crocantes, marisco ou tofu."
      ],
      "serving": [
        "Sirva imediatamente, diretamente do wok."
      ],
      "commonMistakes": [
        "Não encha demasiado a frigideira, para que os noodles não cozam a vapor."
      ]
    },
    "es": {
      "overview": "Los fideos se saltean con salsa de soja y otros ingredientes; la textura varía de suave a crujiente.",
      "history": "El chow mein tiene muchas formas en las cocinas chinas y en las tradiciones internacionales de restaurantes chinos.",
      "flavor": "Tostado, salado y aromático.",
      "technique": "Cuece los fideos hasta que estén justo tiernos y saltéalos en tandas pequeñas.",
      "essentials": [
        "350 g de fideos de huevo",
        "250 g de pollo",
        "150 g de col"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30 min",
        "ingredients": [
          "350 g de fideos de huevo",
          "250 g de pollo",
          "150 g de col",
          "1 zanahoria",
          "brotes de judía",
          "2 cucharadas de salsa de soja",
          "1 cucharada de salsa de ostras",
          "aceite"
        ],
        "steps": [
          "Cuece los fideos según las instrucciones y escúrrelos.",
          "Corta las verduras y el pollo en trozos finos.",
          "Cocina el pollo por completo y añade las verduras.",
          "Incorpora los fideos y la salsa y saltea rápidamente a fuego fuerte."
        ]
      },
      "variants": [
        "Variantes con fideos crujientes, marisco o tofu."
      ],
      "serving": [
        "Sirve inmediatamente del wok."
      ],
      "commonMistakes": [
        "No llenes demasiado la sartén, pues los fideos se cocerán al vapor."
      ]
    },
    "de": {
      "overview": "Nudeln werden mit Sojasauce und weiteren Zutaten gebraten; die Konsistenz reicht von weich bis knusprig.",
      "history": "Chow Mein gibt es in vielen Formen in chinesischen Küchen und internationalen chinesischen Restauranttraditionen.",
      "flavor": "Röstig, salzig und aromatisch.",
      "technique": "Nudeln gerade weich kochen und portionsweise braten.",
      "essentials": [
        "350 g Eiernudeln",
        "250 g Hähnchen",
        "150 g Kohl"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30 Min.",
        "ingredients": [
          "350 g Eiernudeln",
          "250 g Hähnchen",
          "150 g Kohl",
          "1 Karotte",
          "Bohnensprossen",
          "2 EL Sojasauce",
          "1 EL Austernsauce",
          "Öl"
        ],
        "steps": [
          "Nudeln nach Anleitung kochen und abtropfen lassen.",
          "Gemüse und Hähnchen in dünne Stücke schneiden.",
          "Hähnchen vollständig durchgaren und Gemüse hinzufügen.",
          "Nudeln und Sauce unterheben und kurz bei hoher Hitze braten."
        ]
      },
      "variants": [
        "Varianten mit knusprigen Nudeln, Meeresfrüchten oder Tofu."
      ],
      "serving": [
        "Sofort aus dem Wok servieren."
      ],
      "commonMistakes": [
        "Pfanne nicht überfüllen, damit die Nudeln nicht gedämpft statt gebraten werden."
      ]
    }
  },
  "wonton-soup": {
    "en": {
      "overview": "Thin wonton wrappers are filled with meat or prawns and boiled.",
      "history": "Wonton soup exists in several regional Chinese traditions, including Cantonese noodle soup.",
      "flavor": "Mild, aromatic and rich, with soft dumplings.",
      "technique": "Seal the wrappers well and boil the wontons separately if the broth should remain clear.",
      "essentials": [
        "24 wonton wrappers",
        "250 g minced pork",
        "100 g prawns"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "24 wonton wrappers",
          "250 g minced pork",
          "100 g prawns",
          "ginger",
          "soy sauce",
          "1 l chicken stock",
          "pak choi",
          "spring onions"
        ],
        "steps": [
          "Finely chop the prawns and mix with meat, ginger and soy sauce.",
          "Fill the wonton wrappers and seal the edges with a little water.",
          "Boil the wontons until the filling is cooked through.",
          "Heat the stock with pak choi and serve the wontons in the soup with spring onions."
        ]
      },
      "variants": [
        "Hong Kong style is often served with thin egg noodles."
      ],
      "serving": [
        "Serve with spring onions and optionally chilli oil."
      ],
      "commonMistakes": [
        "Do not overfill the thin wrappers."
      ]
    },
    "fr": {
      "overview": "De fines feuilles de pâte à wonton sont garnies de viande ou de crevettes et cuites à l’eau.",
      "history": "La soupe de wontons existe dans plusieurs traditions régionales chinoises, notamment dans les soupes de nouilles cantonaises.",
      "flavor": "Douce, aromatique et généreuse, avec des raviolis tendres.",
      "technique": "Bien fermer les feuilles de pâte et cuire les wontons séparément si l’on souhaite garder le bouillon clair.",
      "essentials": [
        "24 feuilles de pâte à wonton",
        "250 g de porc haché",
        "100 g de crevettes"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "24 feuilles de pâte à wonton",
          "250 g de porc haché",
          "100 g de crevettes",
          "gingembre",
          "sauce soja",
          "1 l de bouillon de poulet",
          "pak choï",
          "oignons nouveaux"
        ],
        "steps": [
          "Hacher finement les crevettes et les mélanger avec la viande, le gingembre et la sauce soja.",
          "Garnir les feuilles de wonton et souder les bords avec un peu d’eau.",
          "Cuire les wontons à l’eau jusqu’à cuisson complète de la farce.",
          "Chauffer le bouillon avec le pak choï et servir les wontons dans la soupe avec des oignons nouveaux."
        ]
      },
      "variants": [
        "Le style de Hong Kong est souvent servi avec de fines nouilles aux œufs."
      ],
      "serving": [
        "Servir avec des oignons nouveaux et éventuellement de l’huile pimentée."
      ],
      "commonMistakes": [
        "Ne pas trop garnir les fines feuilles de pâte."
      ]
    },
    "pt": {
      "overview": "Folhas finas de wonton são recheadas com carne ou camarão e cozidas em água.",
      "history": "A sopa de wonton existe em várias tradições regionais chinesas, incluindo a sopa cantonesa de noodles.",
      "flavor": "Suave, aromática e encorpada, com dumplings macios.",
      "technique": "Sele bem as folhas e coza os wontons separadamente se quiser manter o caldo límpido.",
      "essentials": [
        "24 folhas de massa para wonton",
        "250 g de carne de porco picada",
        "100 g de camarão"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "24 folhas de massa para wonton",
          "250 g de carne de porco picada",
          "100 g de camarão",
          "gengibre",
          "molho de soja",
          "1 l de caldo de frango",
          "pak choi",
          "cebolinha verde"
        ],
        "steps": [
          "Pique finamente o camarão e misture com a carne, gengibre e molho de soja.",
          "Recheie as folhas de wonton e sele as bordas com um pouco de água.",
          "Coza os wontons em água até o recheio estar bem cozinhado.",
          "Aqueça o caldo com pak choi e sirva os wontons na sopa com cebolinha verde."
        ]
      },
      "variants": [
        "A versão de Hong Kong é frequentemente servida com noodles finos de ovo."
      ],
      "serving": [
        "Sirva com cebolinha verde e, se desejar, óleo de malagueta."
      ],
      "commonMistakes": [
        "Não encha demasiado as folhas finas de massa."
      ]
    },
    "es": {
      "overview": "Las obleas finas de wonton se rellenan de carne o gambas y se cuecen en agua.",
      "history": "La sopa de wonton existe en varias tradiciones regionales chinas, incluida la sopa cantonesa de fideos.",
      "flavor": "Suave, aromática y con cuerpo, con dumplings tiernos.",
      "technique": "Sella bien las obleas y cuece los wonton por separado si quieres mantener el caldo claro.",
      "essentials": [
        "24 obleas de wonton",
        "250 g de carne de cerdo picada",
        "100 g de gambas"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "24 obleas de wonton",
          "250 g de carne de cerdo picada",
          "100 g de gambas",
          "jengibre",
          "salsa de soja",
          "1 l de caldo de pollo",
          "pak choi",
          "cebolletas"
        ],
        "steps": [
          "Pica finamente las gambas y mezcla con la carne, el jengibre y la salsa de soja.",
          "Rellena las obleas y sella los bordes con un poco de agua.",
          "Cuece los wonton hasta que el relleno esté hecho por dentro.",
          "Calienta el caldo con pak choi y sirve los wonton en la sopa con cebolletas."
        ]
      },
      "variants": [
        "La versión de Hong Kong suele servirse con fideos finos de huevo."
      ],
      "serving": [
        "Sirve con cebolletas y, si quieres, aceite de chile."
      ],
      "commonMistakes": [
        "No rellenes demasiado las obleas finas."
      ]
    },
    "de": {
      "overview": "Dünne Wonton-Teigblätter werden mit Fleisch oder Garnelen gefüllt und gekocht.",
      "history": "Wonton-Suppe gibt es in mehreren regionalen chinesischen Traditionen, darunter kantonesische Nudelsuppen.",
      "flavor": "Mild, aromatisch und vollmundig, mit weichen Teigtaschen.",
      "technique": "Teigblätter gut verschließen und Wontons separat kochen, wenn die Brühe klar bleiben soll.",
      "essentials": [
        "24 Wonton-Teigblätter",
        "250 g Schweinehackfleisch",
        "100 g Garnelen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "24 Wonton-Teigblätter",
          "250 g Schweinehackfleisch",
          "100 g Garnelen",
          "Ingwer",
          "Sojasauce",
          "1 l Hühnerbrühe",
          "Pak Choi",
          "Frühlingszwiebeln"
        ],
        "steps": [
          "Garnelen fein hacken und mit Fleisch, Ingwer und Sojasauce mischen.",
          "Wonton-Teigblätter füllen und die Ränder mit etwas Wasser verschließen.",
          "Wontons kochen, bis die Füllung vollständig durchgegart ist.",
          "Brühe mit Pak Choi erhitzen und Wontons in der Suppe mit Frühlingszwiebeln servieren."
        ]
      },
      "variants": [
        "Die Hongkong-Variante wird oft mit dünnen Eiernudeln serviert."
      ],
      "serving": [
        "Mit Frühlingszwiebeln und nach Wunsch Chiliöl servieren."
      ],
      "commonMistakes": [
        "Dünne Teigblätter nicht überfüllen."
      ]
    }
  },
  "sweet-and-sour-pork": {
    "en": {
      "overview": "Pieces of meat are coated and fried before being quickly tossed with sauce and vegetables.",
      "history": "The Cantonese version gu lou yuk has become widespread in Chinese restaurants internationally.",
      "flavor": "Sweet, tangy and crisp, with juicy meat.",
      "technique": "Toss the meat in the sauce just before serving.",
      "essentials": [
        "500 g diced pork",
        "1 egg",
        "cornflour"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40 min",
        "ingredients": [
          "500 g diced pork",
          "1 egg",
          "cornflour",
          "1 bell pepper",
          "1 onion",
          "150 g pineapple",
          "3 tbsp vinegar",
          "2 tbsp sugar",
          "2 tbsp ketchup",
          "oil"
        ],
        "steps": [
          "Coat the meat in egg and starch.",
          "Fry in small batches until golden and cooked through.",
          "Fry bell pepper and onion, then add pineapple, vinegar, sugar and ketchup.",
          "Let the sauce thicken slightly and toss in the meat just before serving."
        ]
      },
      "variants": [
        "Versions with chicken or other fruits exist; pineapple is not obligatory."
      ],
      "serving": [
        "Serve with rice."
      ],
      "commonMistakes": [
        "Do not leave the crisp fried meat in the sauce for long."
      ]
    },
    "fr": {
      "overview": "Les morceaux de viande sont enrobés et frits avant d’être rapidement mélangés à la sauce et aux légumes.",
      "history": "La variante cantonaise gu lou yuk s’est répandue dans les restaurants chinois du monde entier.",
      "flavor": "Sucré, acidulé et croustillant, avec une viande juteuse.",
      "technique": "Mélanger la viande à la sauce juste avant de servir.",
      "essentials": [
        "500 g de porc en dés",
        "1 œuf",
        "fécule de maïs"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40 min",
        "ingredients": [
          "500 g de porc en dés",
          "1 œuf",
          "fécule de maïs",
          "1 poivron",
          "1 oignon",
          "150 g d’ananas",
          "3 c. à soupe de vinaigre",
          "2 c. à soupe de sucre",
          "2 c. à soupe de ketchup",
          "huile"
        ],
        "steps": [
          "Enrober la viande d’œuf et de fécule.",
          "Faire frire par petites quantités jusqu’à ce que la viande soit dorée et cuite à cœur.",
          "Faire revenir le poivron et l’oignon, puis ajouter l’ananas, le vinaigre, le sucre et le ketchup.",
          "Laisser la sauce épaissir légèrement et incorporer la viande juste avant de servir."
        ]
      },
      "variants": [
        "Il existe des variantes au poulet ou à d’autres fruits ; l’ananas n’est pas obligatoire."
      ],
      "serving": [
        "Servir avec du riz."
      ],
      "commonMistakes": [
        "Ne pas laisser longtemps la viande croustillante dans la sauce."
      ]
    },
    "pt": {
      "overview": "Os pedaços de carne são panados e fritos antes de serem rapidamente envolvidos no molho e nos legumes.",
      "history": "A variante cantonesa gu lou yuk tornou-se comum em restaurantes chineses de todo o mundo.",
      "flavor": "Doce, ácido e crocante, com carne suculenta.",
      "technique": "Envolva a carne no molho imediatamente antes de servir.",
      "essentials": [
        "500 g de carne de porco em cubos",
        "1 ovo",
        "amido de milho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40 min",
        "ingredients": [
          "500 g de carne de porco em cubos",
          "1 ovo",
          "amido de milho",
          "1 pimento",
          "1 cebola",
          "150 g de ananás",
          "3 c. de sopa de vinagre",
          "2 c. de sopa de açúcar",
          "2 c. de sopa de ketchup",
          "óleo"
        ],
        "steps": [
          "Passe a carne por ovo e amido.",
          "Frite em pequenas porções até a carne dourar e estar bem cozinhada.",
          "Salteie o pimento e a cebola, junte ananás, vinagre, açúcar e ketchup.",
          "Deixe o molho engrossar um pouco e envolva a carne imediatamente antes de servir."
        ]
      },
      "variants": [
        "Existem variantes com frango ou outras frutas; o ananás não é obrigatório."
      ],
      "serving": [
        "Sirva com arroz."
      ],
      "commonMistakes": [
        "Não deixe a carne frita e crocante muito tempo no molho."
      ]
    },
    "es": {
      "overview": "Los trozos de carne se rebozan y fríen antes de mezclarlos rápidamente con la salsa y las verduras.",
      "history": "La variante cantonesa gu lou yuk se ha extendido por los restaurantes chinos de todo el mundo.",
      "flavor": "Dulce, ácido y crujiente, con carne jugosa.",
      "technique": "Mezcla la carne con la salsa justo antes de servir.",
      "essentials": [
        "500 g de cerdo en dados",
        "1 huevo",
        "almidón de maíz"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40 min",
        "ingredients": [
          "500 g de cerdo en dados",
          "1 huevo",
          "almidón de maíz",
          "1 pimiento",
          "1 cebolla",
          "150 g de piña",
          "3 cucharadas de vinagre",
          "2 cucharadas de azúcar",
          "2 cucharadas de kétchup",
          "aceite"
        ],
        "steps": [
          "Reboza la carne con huevo y almidón.",
          "Fríe en tandas pequeñas hasta que la carne esté dorada y hecha por dentro.",
          "Saltea el pimiento y la cebolla, añade piña, vinagre, azúcar y kétchup.",
          "Deja que la salsa espese un poco e incorpora la carne justo antes de servir."
        ]
      },
      "variants": [
        "Existen variantes con pollo u otras frutas; la piña no es obligatoria."
      ],
      "serving": [
        "Sirve con arroz."
      ],
      "commonMistakes": [
        "No dejes la carne frita crujiente mucho tiempo en la salsa."
      ]
    },
    "de": {
      "overview": "Fleischstücke werden paniert und gebraten, bevor sie kurz mit Sauce und Gemüse vermischt werden.",
      "history": "Die kantonesische Variante Gu Lou Yuk ist in chinesischen Restaurants weltweit verbreitet.",
      "flavor": "Süß, säuerlich und knusprig mit saftigem Fleisch.",
      "technique": "Fleisch erst kurz vor dem Servieren in der Sauce wenden.",
      "essentials": [
        "500 g gewürfeltes Schweinefleisch",
        "1 Ei",
        "Maisstärke"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40 Min.",
        "ingredients": [
          "500 g gewürfeltes Schweinefleisch",
          "1 Ei",
          "Maisstärke",
          "1 Paprikaschote",
          "1 Zwiebel",
          "150 g Ananas",
          "3 EL Essig",
          "2 EL Zucker",
          "2 EL Ketchup",
          "Öl"
        ],
        "steps": [
          "Fleisch in Ei und Stärke wenden.",
          "Portionsweise goldbraun und vollständig durchbraten.",
          "Paprika und Zwiebel anbraten, Ananas, Essig, Zucker und Ketchup hinzufügen.",
          "Sauce etwas eindicken lassen und Fleisch kurz vor dem Servieren unterheben."
        ]
      },
      "variants": [
        "Es gibt Varianten mit Hähnchen oder anderen Früchten; Ananas ist nicht zwingend."
      ],
      "serving": [
        "Mit Reis servieren."
      ],
      "commonMistakes": [
        "Knusprig gebratenes Fleisch nicht lange in der Sauce liegen lassen."
      ]
    }
  },
  "enchiladas": {
    "en": {
      "overview": "The tortillas are filled, rolled and covered with sauce.",
      "history": "Enchiladas exist in many regional Mexican traditions.",
      "flavor": "Rich, mildly tangy and spiced.",
      "technique": "Soften the tortillas before rolling them.",
      "essentials": [
        "12 corn tortillas",
        "400 g cooked chicken",
        "400 ml red enchilada sauce"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40 min",
        "ingredients": [
          "12 corn tortillas",
          "400 g cooked chicken",
          "400 ml red enchilada sauce",
          "150 g cheese",
          "1 onion"
        ],
        "steps": [
          "Briefly warm the tortillas.",
          "Fill with chicken and roll up.",
          "Place in a baking dish with sauce and cheese.",
          "Bake at 190 °C until heated through."
        ]
      },
      "variants": [
        "Enchiladas verdes with green tomatillo sauce."
      ],
      "serving": [
        "Serve with onion and crema."
      ],
      "commonMistakes": [
        "Do not use dry tortillas that crack."
      ]
    },
    "fr": {
      "overview": "Les tortillas sont garnies, roulées et nappées de sauce.",
      "history": "Les enchiladas existent dans de nombreuses traditions régionales mexicaines.",
      "flavor": "Généreuses, légèrement acidulées et épicées.",
      "technique": "Assouplir les tortillas avant de les rouler.",
      "essentials": [
        "12 tortillas de maïs",
        "400 g de poulet cuit",
        "400 ml de sauce rouge pour enchiladas"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40 min",
        "ingredients": [
          "12 tortillas de maïs",
          "400 g de poulet cuit",
          "400 ml de sauce rouge pour enchiladas",
          "150 g de fromage",
          "1 oignon"
        ],
        "steps": [
          "Réchauffer brièvement les tortillas.",
          "Garnir de poulet et rouler.",
          "Disposer dans un plat avec la sauce et le fromage.",
          "Cuire au four à 190 °C jusqu’à ce que l’ensemble soit bien chaud."
        ]
      },
      "variants": [
        "Enchiladas verdes à la sauce verte de tomatillos."
      ],
      "serving": [
        "Servir avec de l’oignon et de la crema."
      ],
      "commonMistakes": [
        "Ne pas utiliser de tortillas sèches qui se fissurent."
      ]
    },
    "pt": {
      "overview": "As tortilhas são recheadas, enroladas e cobertas com molho.",
      "history": "As enchiladas existem em muitas tradições regionais mexicanas.",
      "flavor": "Encorpadas, ligeiramente ácidas e condimentadas.",
      "technique": "Amoleça as tortilhas antes de as enrolar.",
      "essentials": [
        "12 tortilhas de milho",
        "400 g de frango cozinhado",
        "400 ml de molho vermelho para enchiladas"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40 min",
        "ingredients": [
          "12 tortilhas de milho",
          "400 g de frango cozinhado",
          "400 ml de molho vermelho para enchiladas",
          "150 g de queijo",
          "1 cebola"
        ],
        "steps": [
          "Aqueça brevemente as tortilhas.",
          "Recheie com frango e enrole.",
          "Coloque numa forma com molho e queijo.",
          "Leve ao forno a 190 °C até estar bem quente."
        ]
      },
      "variants": [
        "Enchiladas verdes com molho verde de tomatillo."
      ],
      "serving": [
        "Sirva com cebola e crema."
      ],
      "commonMistakes": [
        "Não use tortilhas secas que se partam."
      ]
    },
    "es": {
      "overview": "Las tortillas se rellenan, se enrollan y se cubren con salsa.",
      "history": "Las enchiladas existen en muchas tradiciones regionales mexicanas.",
      "flavor": "Intensas, ligeramente ácidas y especiadas.",
      "technique": "Ablanda las tortillas antes de enrollarlas.",
      "essentials": [
        "12 tortillas de maíz",
        "400 g de pollo cocinado",
        "400 ml de salsa roja para enchiladas"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40 min",
        "ingredients": [
          "12 tortillas de maíz",
          "400 g de pollo cocinado",
          "400 ml de salsa roja para enchiladas",
          "150 g de queso",
          "1 cebolla"
        ],
        "steps": [
          "Calienta brevemente las tortillas.",
          "Rellena con pollo y enrolla.",
          "Coloca en una fuente con salsa y queso.",
          "Hornea a 190 °C hasta que todo esté bien caliente."
        ]
      },
      "variants": [
        "Enchiladas verdes con salsa verde de tomatillo."
      ],
      "serving": [
        "Sirve con cebolla y crema."
      ],
      "commonMistakes": [
        "No uses tortillas secas que se agrieten."
      ]
    },
    "de": {
      "overview": "Tortillas werden gefüllt, aufgerollt und mit Sauce bedeckt.",
      "history": "Enchiladas gibt es in vielen regionalen mexikanischen Traditionen.",
      "flavor": "Kräftig, mild säuerlich und würzig.",
      "technique": "Tortillas vor dem Aufrollen weich machen.",
      "essentials": [
        "12 Maistortillas",
        "400 g gegartes Hähnchen",
        "400 ml rote Enchiladasauce"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40 Min.",
        "ingredients": [
          "12 Maistortillas",
          "400 g gegartes Hähnchen",
          "400 ml rote Enchiladasauce",
          "150 g Käse",
          "1 Zwiebel"
        ],
        "steps": [
          "Tortillas kurz erwärmen.",
          "Mit Hähnchen füllen und aufrollen.",
          "Mit Sauce und Käse in eine Auflaufform legen.",
          "Bei 190 °C backen, bis alles durchgehend heiß ist."
        ]
      },
      "variants": [
        "Enchiladas Verdes mit grüner Tomatillosauce."
      ],
      "serving": [
        "Mit Zwiebeln und Crema servieren."
      ],
      "commonMistakes": [
        "Keine trockenen Tortillas verwenden, die brechen."
      ]
    }
  },
  "burrito": {
    "en": {
      "overview": "A large, soft tortilla encloses a concentrated filling.",
      "history": "Burritos are associated with northern Mexico and have taken many forms in the United States.",
      "flavor": "Soft, rich and spiced.",
      "technique": "Warm the tortilla and fold in the sides before rolling.",
      "essentials": [
        "4 large wheat tortillas",
        "300 g cooked beans",
        "300 g minced meat"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30 min",
        "ingredients": [
          "4 large wheat tortillas",
          "300 g cooked beans",
          "300 g minced meat",
          "1 onion",
          "cumin",
          "salsa"
        ],
        "steps": [
          "Fry onion and minced meat until the meat is cooked through.",
          "Add spices and beans.",
          "Warm the tortillas.",
          "Distribute the filling and salsa and roll tightly."
        ]
      },
      "variants": [
        "Mission burritos often contain rice and several kinds of accompaniments."
      ],
      "serving": [
        "Serve with salsa."
      ],
      "commonMistakes": [
        "Avoid too much wet filling."
      ]
    },
    "fr": {
      "overview": "Une grande tortilla souple enveloppe une garniture concentrée.",
      "history": "Le burrito est associé au nord du Mexique et a pris de nombreuses formes aux États-Unis.",
      "flavor": "Moelleux, généreux et épicé.",
      "technique": "Réchauffer la tortilla et rabattre les côtés avant de la rouler.",
      "essentials": [
        "4 grandes tortillas de blé",
        "300 g de haricots cuits",
        "300 g de viande hachée"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30 min",
        "ingredients": [
          "4 grandes tortillas de blé",
          "300 g de haricots cuits",
          "300 g de viande hachée",
          "1 oignon",
          "cumin",
          "salsa"
        ],
        "steps": [
          "Faire revenir l’oignon et la viande hachée jusqu’à cuisson complète de la viande.",
          "Ajouter les épices et les haricots.",
          "Réchauffer les tortillas.",
          "Répartir la garniture et la salsa, puis rouler bien serré."
        ]
      },
      "variants": [
        "Les burritos Mission contiennent souvent du riz et plusieurs sortes de garnitures."
      ],
      "serving": [
        "Servir avec de la salsa."
      ],
      "commonMistakes": [
        "Éviter une garniture trop humide et abondante."
      ]
    },
    "pt": {
      "overview": "Uma tortilha grande e macia envolve um recheio concentrado.",
      "history": "O burrito está associado ao norte do México e ganhou muitas formas nos Estados Unidos.",
      "flavor": "Macio, encorpado e condimentado.",
      "technique": "Aqueça a tortilha e dobre as laterais para dentro antes de enrolar.",
      "essentials": [
        "4 tortilhas grandes de trigo",
        "300 g de feijão cozido",
        "300 g de carne picada"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30 min",
        "ingredients": [
          "4 tortilhas grandes de trigo",
          "300 g de feijão cozido",
          "300 g de carne picada",
          "1 cebola",
          "cominhos",
          "salsa"
        ],
        "steps": [
          "Salteie a cebola e a carne picada até a carne estar bem cozinhada.",
          "Junte as especiarias e o feijão.",
          "Aqueça as tortilhas.",
          "Distribua o recheio e a salsa e enrole firmemente."
        ]
      },
      "variants": [
        "Os burritos Mission incluem frequentemente arroz e vários acompanhamentos."
      ],
      "serving": [
        "Sirva com salsa."
      ],
      "commonMistakes": [
        "Evite demasiado recheio húmido."
      ]
    },
    "es": {
      "overview": "Una tortilla grande y suave envuelve un relleno concentrado.",
      "history": "El burrito se asocia con el norte de México y ha adquirido muchas formas en Estados Unidos.",
      "flavor": "Suave, contundente y especiado.",
      "technique": "Calienta la tortilla y dobla los lados hacia dentro antes de enrollar.",
      "essentials": [
        "4 tortillas grandes de trigo",
        "300 g de frijoles cocidos",
        "300 g de carne picada"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30 min",
        "ingredients": [
          "4 tortillas grandes de trigo",
          "300 g de frijoles cocidos",
          "300 g de carne picada",
          "1 cebolla",
          "comino",
          "salsa"
        ],
        "steps": [
          "Saltea la cebolla y la carne picada hasta que la carne esté hecha por dentro.",
          "Añade las especias y los frijoles.",
          "Calienta las tortillas.",
          "Reparte el relleno y la salsa y enrolla bien apretado."
        ]
      },
      "variants": [
        "Los burritos Mission suelen llevar arroz y varios tipos de acompañamientos."
      ],
      "serving": [
        "Sirve con salsa."
      ],
      "commonMistakes": [
        "Evita demasiado relleno húmedo."
      ]
    },
    "de": {
      "overview": "Eine große, weiche Tortilla umschließt eine konzentrierte Füllung.",
      "history": "Burritos werden mit Nordmexiko verbunden und haben in den USA viele Formen angenommen.",
      "flavor": "Weich, kräftig und würzig.",
      "technique": "Tortilla erwärmen und die Seiten vor dem Aufrollen einschlagen.",
      "essentials": [
        "4 große Weizentortillas",
        "300 g gekochte Bohnen",
        "300 g Hackfleisch"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30 Min.",
        "ingredients": [
          "4 große Weizentortillas",
          "300 g gekochte Bohnen",
          "300 g Hackfleisch",
          "1 Zwiebel",
          "Kreuzkümmel",
          "Salsa"
        ],
        "steps": [
          "Zwiebel und Hackfleisch braten, bis das Fleisch vollständig durchgegart ist.",
          "Gewürze und Bohnen hinzufügen.",
          "Tortillas erwärmen.",
          "Füllung und Salsa verteilen und fest aufrollen."
        ]
      },
      "variants": [
        "Mission-Burritos enthalten oft Reis und mehrere Arten von Beilagen."
      ],
      "serving": [
        "Mit Salsa servieren."
      ],
      "commonMistakes": [
        "Zu viel feuchte Füllung vermeiden."
      ]
    }
  },
  "tamales": {
    "en": {
      "overview": "Masa is spread on corn husks or banana leaves, filled and steamed.",
      "history": "Tamales have pre-Columbian roots in Mesoamerica and are important in many festive traditions.",
      "flavor": "Soft maize dough with aromatic filling.",
      "technique": "Use masa harina intended for tamales and steam until the dough releases from the leaf.",
      "essentials": [
        "300 g masa harina",
        "250–350 ml stock",
        "100 g softened fat"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 2 hours",
        "ingredients": [
          "300 g masa harina",
          "250–350 ml stock",
          "100 g softened fat",
          "1 tsp baking powder",
          "300 g cooked chicken",
          "salsa",
          "dried corn husks"
        ],
        "steps": [
          "Soak the corn husks in warm water.",
          "Beat the fat and mix with masa harina, baking powder and stock to form a soft dough.",
          "Spread the dough on the husks, add chicken and salsa, and fold.",
          "Steam for approximately 60–90 minutes until the dough is firm and releases from the husks."
        ]
      },
      "variants": [
        "Tamales with mole, chilli or sweet filling."
      ],
      "serving": [
        "Remove the leaf before serving."
      ],
      "commonMistakes": [
        "Do not let the steamer boil dry."
      ]
    },
    "fr": {
      "overview": "La masa est étalée sur des feuilles de maïs ou de bananier, garnie et cuite à la vapeur.",
      "history": "Les tamales ont des racines précolombiennes en Mésoamérique et jouent un rôle important dans de nombreuses traditions festives.",
      "flavor": "Pâte de maïs tendre avec une garniture aromatique.",
      "technique": "Utiliser de la masa harina destinée aux tamales et cuire à la vapeur jusqu’à ce que la pâte se détache de la feuille.",
      "essentials": [
        "300 g de masa harina",
        "250–350 ml de bouillon",
        "100 g de matière grasse ramollie"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 2 heures",
        "ingredients": [
          "300 g de masa harina",
          "250–350 ml de bouillon",
          "100 g de matière grasse ramollie",
          "1 c. à café de levure chimique",
          "300 g de poulet cuit",
          "salsa",
          "feuilles de maïs séchées"
        ],
        "steps": [
          "Faire tremper les feuilles de maïs dans de l’eau chaude.",
          "Fouetter la matière grasse et mélanger avec la masa harina, la levure chimique et le bouillon pour obtenir une pâte souple.",
          "Étaler la pâte sur les feuilles, ajouter le poulet et la salsa, puis replier.",
          "Cuire à la vapeur environ 60–90 minutes jusqu’à ce que la pâte soit ferme et se détache des feuilles."
        ]
      },
      "variants": [
        "Tamales au mole, au piment ou à garniture sucrée."
      ],
      "serving": [
        "Retirer la feuille avant de servir."
      ],
      "commonMistakes": [
        "Ne pas laisser toute l’eau du cuiseur vapeur s’évaporer."
      ]
    },
    "pt": {
      "overview": "A masa é espalhada sobre folhas de milho ou de bananeira, recheada e cozida a vapor.",
      "history": "Os tamales têm raízes pré-colombianas na Mesoamérica e são importantes em muitas tradições festivas.",
      "flavor": "Massa de milho macia com recheio aromático.",
      "technique": "Use masa harina própria para tamales e coza a vapor até a massa se soltar da folha.",
      "essentials": [
        "300 g de masa harina",
        "250–350 ml de caldo",
        "100 g de gordura amolecida"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 2 horas",
        "ingredients": [
          "300 g de masa harina",
          "250–350 ml de caldo",
          "100 g de gordura amolecida",
          "1 c. de chá de fermento em pó",
          "300 g de frango cozinhado",
          "salsa",
          "folhas de milho secas"
        ],
        "steps": [
          "Demolhe as folhas de milho em água quente.",
          "Bata a gordura e misture com masa harina, fermento em pó e caldo até obter uma massa macia.",
          "Espalhe a massa nas folhas, junte frango e salsa e dobre.",
          "Coza a vapor durante cerca de 60–90 minutos até a massa estar firme e se soltar das folhas."
        ]
      },
      "variants": [
        "Tamales com mole, malagueta ou recheio doce."
      ],
      "serving": [
        "Retire a folha antes de servir."
      ],
      "commonMistakes": [
        "Não deixe a panela de vapor ficar sem água."
      ]
    },
    "es": {
      "overview": "La masa se extiende sobre hojas de maíz o de plátano, se rellena y se cuece al vapor.",
      "history": "Los tamales tienen raíces precolombinas en Mesoamérica y son importantes en muchas tradiciones festivas.",
      "flavor": "Masa de maíz suave con relleno aromático.",
      "technique": "Usa masa harina para tamales y cuece al vapor hasta que la masa se desprenda de la hoja.",
      "essentials": [
        "300 g de masa harina",
        "250–350 ml de caldo",
        "100 g de grasa blanda"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 2 horas",
        "ingredients": [
          "300 g de masa harina",
          "250–350 ml de caldo",
          "100 g de grasa blanda",
          "1 cucharadita de levadura química",
          "300 g de pollo cocinado",
          "salsa",
          "hojas de maíz secas"
        ],
        "steps": [
          "Remoja las hojas de maíz en agua caliente.",
          "Bate la grasa y mezcla con masa harina, levadura química y caldo hasta obtener una masa suave.",
          "Extiende la masa sobre las hojas, añade pollo y salsa y dobla.",
          "Cuece al vapor durante unos 60–90 minutos hasta que la masa esté firme y se desprenda de las hojas."
        ]
      },
      "variants": [
        "Tamales con mole, chile o relleno dulce."
      ],
      "serving": [
        "Retira la hoja antes de servir."
      ],
      "commonMistakes": [
        "No dejes que la vaporera se quede sin agua."
      ]
    },
    "de": {
      "overview": "Masa wird auf Mais- oder Bananenblätter gestrichen, gefüllt und gedämpft.",
      "history": "Tamales haben präkolumbische Wurzeln in Mesoamerika und sind in vielen Festtraditionen wichtig.",
      "flavor": "Weicher Maisteig mit aromatischer Füllung.",
      "technique": "Masa Harina für Tamales verwenden und dämpfen, bis sich der Teig vom Blatt löst.",
      "essentials": [
        "300 g Masa Harina",
        "250–350 ml Brühe",
        "100 g weiches Fett"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 2 Stunden",
        "ingredients": [
          "300 g Masa Harina",
          "250–350 ml Brühe",
          "100 g weiches Fett",
          "1 TL Backpulver",
          "300 g gegartes Hähnchen",
          "Salsa",
          "getrocknete Maisblätter"
        ],
        "steps": [
          "Maisblätter in warmem Wasser einweichen.",
          "Fett aufschlagen und mit Masa Harina, Backpulver und Brühe zu einem weichen Teig mischen.",
          "Teig auf die Blätter streichen, Hähnchen und Salsa daraufgeben und zusammenfalten.",
          "Etwa 60–90 Minuten dämpfen, bis der Teig fest ist und sich von den Blättern löst."
        ]
      },
      "variants": [
        "Tamales mit Mole, Chili oder süßer Füllung."
      ],
      "serving": [
        "Blatt vor dem Servieren entfernen."
      ],
      "commonMistakes": [
        "Dämpftopf nicht trocken kochen lassen."
      ]
    }
  },
  "chilaquiles": {
    "en": {
      "overview": "Crisp tortilla pieces are partly softened in warm salsa.",
      "history": "Chilaquiles are a well-known Mexican breakfast dish.",
      "flavor": "Crisp and soft, tangy and spiced.",
      "technique": "Fold in the chips just before serving to retain some crispness.",
      "essentials": [
        "200 g tortilla chips",
        "400 ml salsa roja or verde",
        "4 eggs"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 20 min",
        "ingredients": [
          "200 g tortilla chips",
          "400 ml salsa roja or verde",
          "4 eggs",
          "100 g queso fresco",
          "crema",
          "onion"
        ],
        "steps": [
          "Warm the salsa in a pan.",
          "Fry the eggs separately.",
          "Toss the chips in the warm sauce.",
          "Top with eggs, cheese, crema and onion."
        ]
      },
      "variants": [
        "Red and green versions with eggs or chicken."
      ],
      "serving": [
        "Serve immediately."
      ],
      "commonMistakes": [
        "Do not cook the chips for long if you want a crisp texture."
      ]
    },
    "fr": {
      "overview": "Des morceaux de tortilla croustillants sont partiellement ramollis dans une salsa chaude.",
      "history": "Les chilaquiles sont un plat de petit-déjeuner mexicain bien connu.",
      "flavor": "Croustillants et tendres, acidulés et épicés.",
      "technique": "Incorporer les chips juste avant de servir pour préserver un peu de croustillant.",
      "essentials": [
        "200 g de chips de tortilla",
        "400 ml de salsa roja ou verde",
        "4 œufs"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 20 min",
        "ingredients": [
          "200 g de chips de tortilla",
          "400 ml de salsa roja ou verde",
          "4 œufs",
          "100 g de queso fresco",
          "crema",
          "oignon"
        ],
        "steps": [
          "Chauffer la salsa dans une poêle.",
          "Cuire les œufs séparément à la poêle.",
          "Incorporer les chips à la sauce chaude.",
          "Garnir d’œufs, de fromage, de crema et d’oignon."
        ]
      },
      "variants": [
        "Variantes rouges et vertes avec des œufs ou du poulet."
      ],
      "serving": [
        "Servir immédiatement."
      ],
      "commonMistakes": [
        "Ne pas cuire longtemps les chips si l’on souhaite une texture croustillante."
      ]
    },
    "pt": {
      "overview": "Pedaços crocantes de tortilha são parcialmente amolecidos em salsa quente.",
      "history": "Os chilaquiles são um conhecido prato mexicano de pequeno-almoço.",
      "flavor": "Crocantes e macios, ácidos e condimentados.",
      "technique": "Envolva os chips imediatamente antes de servir para manter alguma crocância.",
      "essentials": [
        "200 g de chips de tortilha",
        "400 ml de salsa roja ou verde",
        "4 ovos"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 20 min",
        "ingredients": [
          "200 g de chips de tortilha",
          "400 ml de salsa roja ou verde",
          "4 ovos",
          "100 g de queso fresco",
          "crema",
          "cebola"
        ],
        "steps": [
          "Aqueça a salsa numa frigideira.",
          "Estrele os ovos separadamente.",
          "Envolva os chips no molho quente.",
          "Cubra com ovos, queijo, crema e cebola."
        ]
      },
      "variants": [
        "Versões vermelhas e verdes com ovos ou frango."
      ],
      "serving": [
        "Sirva imediatamente."
      ],
      "commonMistakes": [
        "Não cozinhe os chips durante muito tempo se quiser uma textura crocante."
      ]
    },
    "es": {
      "overview": "Los trozos crujientes de tortilla se ablandan parcialmente en salsa caliente.",
      "history": "Los chilaquiles son un conocido plato mexicano de desayuno.",
      "flavor": "Crujientes y suaves, ácidos y especiados.",
      "technique": "Incorpora los totopos justo antes de servir para conservar algo de textura crujiente.",
      "essentials": [
        "200 g de totopos de tortilla",
        "400 ml de salsa roja o verde",
        "4 huevos"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 20 min",
        "ingredients": [
          "200 g de totopos de tortilla",
          "400 ml de salsa roja o verde",
          "4 huevos",
          "100 g de queso fresco",
          "crema",
          "cebolla"
        ],
        "steps": [
          "Calienta la salsa en una sartén.",
          "Fríe los huevos por separado.",
          "Mezcla los totopos con la salsa caliente.",
          "Cubre con huevos, queso, crema y cebolla."
        ]
      },
      "variants": [
        "Versiones rojas y verdes con huevos o pollo."
      ],
      "serving": [
        "Sirve inmediatamente."
      ],
      "commonMistakes": [
        "No cuezas los totopos mucho tiempo si quieres una textura crujiente."
      ]
    },
    "de": {
      "overview": "Knusprige Tortillastücke werden in warmer Salsa teilweise aufgeweicht.",
      "history": "Chilaquiles sind ein bekanntes mexikanisches Frühstücksgericht.",
      "flavor": "Knusprig und weich, säuerlich und würzig.",
      "technique": "Chips erst kurz vor dem Servieren unterheben, damit sie etwas knusprig bleiben.",
      "essentials": [
        "200 g Tortillachips",
        "400 ml Salsa Roja oder Verde",
        "4 Eier"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 20 Min.",
        "ingredients": [
          "200 g Tortillachips",
          "400 ml Salsa Roja oder Verde",
          "4 Eier",
          "100 g Queso Fresco",
          "Crema",
          "Zwiebel"
        ],
        "steps": [
          "Salsa in einer Pfanne erwärmen.",
          "Eier separat braten.",
          "Chips in der warmen Sauce wenden.",
          "Mit Eiern, Käse, Crema und Zwiebeln garnieren."
        ]
      },
      "variants": [
        "Rote und grüne Varianten mit Eiern oder Hähnchen."
      ],
      "serving": [
        "Sofort servieren."
      ],
      "commonMistakes": [
        "Chips nicht lange kochen, wenn eine knusprige Konsistenz gewünscht ist."
      ]
    }
  },
  "mole-poblano": {
    "en": {
      "overview": "A range of toasted ingredients are ground and cooked together into a complex sauce.",
      "history": "Mole poblano is particularly associated with Puebla; accounts of its origins vary.",
      "flavor": "Deep, spiced, slightly bitter and sweetish.",
      "technique": "Toast the chillies carefully and let the sauce simmer.",
      "essentials": [
        "4 dried ancho chillies",
        "2 dried pasilla chillies",
        "30 g sesame seeds"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 75 min",
        "ingredients": [
          "4 dried ancho chillies",
          "2 dried pasilla chillies",
          "30 g sesame seeds",
          "40 g almonds",
          "1 onion",
          "2 garlic cloves",
          "1 tomato",
          "400 ml stock",
          "20 g dark chocolate",
          "cinnamon",
          "600 g cooked chicken"
        ],
        "steps": [
          "Remove the stems and seeds from the chillies, toast briefly and soak.",
          "Toast the seeds and almonds and fry the onion, garlic and tomato.",
          "Blend with the chillies, stock and spices until smooth.",
          "Simmer the sauce, stir in the chocolate and heat the chicken in it."
        ]
      },
      "variants": [
        "This recipe is a simplified home version of an extensive sauce tradition."
      ],
      "serving": [
        "Serve with rice and sesame seeds."
      ],
      "commonMistakes": [
        "Do not burn the chillies or let the chocolate dominate."
      ]
    },
    "fr": {
      "overview": "Divers ingrédients grillés sont broyés et cuits ensemble pour obtenir une sauce complexe.",
      "history": "Le mole poblano est particulièrement associé à Puebla ; les récits de son origine varient.",
      "flavor": "Profond, épicé, légèrement amer et sucré.",
      "technique": "Griller les piments avec précaution et laisser mijoter la sauce.",
      "essentials": [
        "4 piments ancho séchés",
        "2 piments pasilla séchés",
        "30 g de graines de sésame"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 75 min",
        "ingredients": [
          "4 piments ancho séchés",
          "2 piments pasilla séchés",
          "30 g de graines de sésame",
          "40 g d’amandes",
          "1 oignon",
          "2 gousses d’ail",
          "1 tomate",
          "400 ml de bouillon",
          "20 g de chocolat noir",
          "cannelle",
          "600 g de poulet cuit"
        ],
        "steps": [
          "Retirer les tiges et les graines des piments, les griller brièvement et les faire tremper.",
          "Griller les graines et les amandes, puis faire revenir l’oignon, l’ail et la tomate.",
          "Mixer avec les piments, le bouillon et les épices jusqu’à obtenir une sauce lisse.",
          "Laisser mijoter la sauce, incorporer le chocolat et y réchauffer le poulet."
        ]
      },
      "variants": [
        "Cette recette est une version maison simplifiée d’une vaste tradition de sauces."
      ],
      "serving": [
        "Servir avec du riz et des graines de sésame."
      ],
      "commonMistakes": [
        "Ne pas brûler les piments ni laisser le chocolat dominer."
      ]
    },
    "pt": {
      "overview": "Vários ingredientes tostados são triturados e cozinhados em conjunto para obter um molho complexo.",
      "history": "O mole poblano está especialmente associado a Puebla; os relatos sobre a sua origem variam.",
      "flavor": "Intenso, condimentado, ligeiramente amargo e doce.",
      "technique": "Toste cuidadosamente as malaguetas e deixe o molho cozinhar em lume brando.",
      "essentials": [
        "4 malaguetas ancho secas",
        "2 malaguetas pasilla secas",
        "30 g de sementes de sésamo"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 75 min",
        "ingredients": [
          "4 malaguetas ancho secas",
          "2 malaguetas pasilla secas",
          "30 g de sementes de sésamo",
          "40 g de amêndoas",
          "1 cebola",
          "2 dentes de alho",
          "1 tomate",
          "400 ml de caldo",
          "20 g de chocolate negro",
          "canela",
          "600 g de frango cozinhado"
        ],
        "steps": [
          "Retire os pés e as sementes das malaguetas, toste brevemente e demolhe.",
          "Toste as sementes e as amêndoas e salteie a cebola, o alho e o tomate.",
          "Triture com as malaguetas, o caldo e as especiarias até obter um molho liso.",
          "Deixe o molho cozinhar em lume brando, incorpore o chocolate e aqueça nele o frango."
        ]
      },
      "variants": [
        "Esta receita é uma versão caseira simplificada de uma vasta tradição de molhos."
      ],
      "serving": [
        "Sirva com arroz e sementes de sésamo."
      ],
      "commonMistakes": [
        "Não queime as malaguetas nem deixe o chocolate dominar."
      ]
    },
    "es": {
      "overview": "Diversos ingredientes tostados se muelen y se cuecen juntos para obtener una salsa compleja.",
      "history": "El mole poblano se asocia especialmente con Puebla; los relatos sobre su origen varían.",
      "flavor": "Intenso, especiado, ligeramente amargo y dulce.",
      "technique": "Tuesta los chiles con cuidado y deja cocer la salsa a fuego lento.",
      "essentials": [
        "4 chiles ancho secos",
        "2 chiles pasilla secos",
        "30 g de semillas de sésamo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 75 min",
        "ingredients": [
          "4 chiles ancho secos",
          "2 chiles pasilla secos",
          "30 g de semillas de sésamo",
          "40 g de almendras",
          "1 cebolla",
          "2 dientes de ajo",
          "1 tomate",
          "400 ml de caldo",
          "20 g de chocolate negro",
          "canela",
          "600 g de pollo cocinado"
        ],
        "steps": [
          "Retira los tallos y las semillas de los chiles, tuéstalos brevemente y remójalos.",
          "Tuesta las semillas y las almendras y sofríe la cebolla, el ajo y el tomate.",
          "Tritura con los chiles, el caldo y las especias hasta obtener una salsa lisa.",
          "Cuece la salsa a fuego lento, incorpora el chocolate y calienta el pollo en ella."
        ]
      },
      "variants": [
        "Esta receta es una versión casera simplificada de una amplia tradición de salsas."
      ],
      "serving": [
        "Sirve con arroz y semillas de sésamo."
      ],
      "commonMistakes": [
        "No quemes los chiles ni dejes que domine el chocolate."
      ]
    },
    "de": {
      "overview": "Verschiedene geröstete Zutaten werden gemahlen und zu einer komplexen Sauce gekocht.",
      "history": "Mole Poblano ist besonders mit Puebla verbunden; die Ursprungserzählungen variieren.",
      "flavor": "Tiefgründig, würzig, leicht bitter und süßlich.",
      "technique": "Chilis vorsichtig rösten und die Sauce köcheln lassen.",
      "essentials": [
        "4 getrocknete Ancho-Chilis",
        "2 getrocknete Pasilla-Chilis",
        "30 g Sesamsamen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 75 Min.",
        "ingredients": [
          "4 getrocknete Ancho-Chilis",
          "2 getrocknete Pasilla-Chilis",
          "30 g Sesamsamen",
          "40 g Mandeln",
          "1 Zwiebel",
          "2 Knoblauchzehen",
          "1 Tomate",
          "400 ml Brühe",
          "20 g Zartbitterschokolade",
          "Zimt",
          "600 g gegartes Hähnchen"
        ],
        "steps": [
          "Stiele und Samen der Chilis entfernen, kurz rösten und einweichen.",
          "Samen und Mandeln rösten, Zwiebel, Knoblauch und Tomate anbraten.",
          "Mit Chilis, Brühe und Gewürzen glatt pürieren.",
          "Sauce köcheln lassen, Schokolade einrühren und Hähnchen darin erwärmen."
        ]
      },
      "variants": [
        "Das Rezept ist eine vereinfachte Hausvariante einer umfangreichen Saucen-Tradition."
      ],
      "serving": [
        "Mit Reis und Sesamsamen servieren."
      ],
      "commonMistakes": [
        "Chilis nicht verbrennen und Schokolade nicht dominieren lassen."
      ]
    }
  },
  "ceviche": {
    "en": {
      "overview": "In classic versions, raw fish is marinated in citrus; the acid changes the texture but does not make the fish microbiologically safe.",
      "history": "Ceviche holds a particularly important place in Peru and exists in various forms along Latin America's coasts, including Mexico.",
      "flavor": "Fresh, tangy, salty and aromatic.",
      "technique": "Keep the seafood cold; this home version uses fully cooked prawns.",
      "essentials": [
        "400 g cooked, chilled prawns",
        "4 limes",
        "1 red onion"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 20 min",
        "ingredients": [
          "400 g cooked, chilled prawns",
          "4 limes",
          "1 red onion",
          "chilli",
          "coriander",
          "1 cucumber",
          "salt"
        ],
        "steps": [
          "Cut the onion and cucumber into small pieces.",
          "Mix lime juice, chilli and salt.",
          "Fold in the cold, cooked prawns and vegetables.",
          "Keep chilled and serve immediately with coriander."
        ]
      },
      "variants": [
        "Peruvian fish-based versions and Mexican versions with prawns, tomato or avocado."
      ],
      "serving": [
        "Serve with tostadas or, Peruvian style, maize and sweet potato."
      ],
      "commonMistakes": [
        "Do not rely on lime juice to kill parasites or disease-causing bacteria."
      ]
    },
    "fr": {
      "overview": "Dans les versions classiques, le poisson cru est mariné dans du jus d’agrumes ; l’acidité modifie sa texture mais ne garantit pas sa sécurité microbiologique.",
      "history": "Le ceviche occupe une place particulièrement importante au Pérou et existe sous diverses formes le long des côtes d’Amérique latine, notamment au Mexique.",
      "flavor": "Frais, acidulé, salé et aromatique.",
      "technique": "Garder les fruits de mer au froid ; cette version maison utilise des crevettes entièrement cuites.",
      "essentials": [
        "400 g de crevettes cuites et refroidies",
        "4 citrons verts",
        "1 oignon rouge"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 20 min",
        "ingredients": [
          "400 g de crevettes cuites et refroidies",
          "4 citrons verts",
          "1 oignon rouge",
          "piment",
          "coriandre",
          "1 concombre",
          "sel"
        ],
        "steps": [
          "Couper l’oignon et le concombre en petits morceaux.",
          "Mélanger le jus de citron vert, le piment et le sel.",
          "Incorporer les crevettes cuites et froides et les légumes.",
          "Garder au frais et servir immédiatement avec de la coriandre."
        ]
      },
      "variants": [
        "Variantes péruviennes à base de poisson et variantes mexicaines aux crevettes, à la tomate ou à l’avocat."
      ],
      "serving": [
        "Servir avec des tostadas ou, à la péruvienne, avec du maïs et de la patate douce."
      ],
      "commonMistakes": [
        "Ne pas compter sur le jus de citron vert pour tuer les parasites ou les bactéries pathogènes."
      ]
    },
    "pt": {
      "overview": "Nas versões clássicas, o peixe cru é marinado em citrinos; a acidez altera a textura, mas não torna o peixe microbiologicamente seguro.",
      "history": "O ceviche ocupa um lugar particularmente importante no Peru e existe em várias formas nas costas da América Latina, incluindo no México.",
      "flavor": "Fresco, ácido, salgado e aromático.",
      "technique": "Mantenha o marisco frio; esta versão caseira utiliza camarão completamente cozido.",
      "essentials": [
        "400 g de camarão cozido e arrefecido",
        "4 limas",
        "1 cebola roxa"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 20 min",
        "ingredients": [
          "400 g de camarão cozido e arrefecido",
          "4 limas",
          "1 cebola roxa",
          "malagueta",
          "coentros",
          "1 pepino",
          "sal"
        ],
        "steps": [
          "Corte a cebola e o pepino em pedaços pequenos.",
          "Misture sumo de lima, malagueta e sal.",
          "Envolva o camarão cozido e frio e os legumes.",
          "Mantenha refrigerado e sirva imediatamente com coentros."
        ]
      },
      "variants": [
        "Variantes peruanas à base de peixe e mexicanas com camarão, tomate ou abacate."
      ],
      "serving": [
        "Sirva com tostadas ou, ao estilo peruano, com milho e batata-doce."
      ],
      "commonMistakes": [
        "Não conte com o sumo de lima para eliminar parasitas ou bactérias patogénicas."
      ]
    },
    "es": {
      "overview": "En las versiones clásicas, el pescado crudo se marina en cítricos; el ácido cambia la textura, pero no garantiza su seguridad microbiológica.",
      "history": "El ceviche ocupa un lugar especialmente importante en Perú y existe en distintas formas a lo largo de las costas de América Latina, también en México.",
      "flavor": "Fresco, ácido, salado y aromático.",
      "technique": "Mantén el marisco frío; esta versión casera utiliza gambas completamente cocidas.",
      "essentials": [
        "400 g de gambas cocidas y enfriadas",
        "4 limas",
        "1 cebolla morada"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 20 min",
        "ingredients": [
          "400 g de gambas cocidas y enfriadas",
          "4 limas",
          "1 cebolla morada",
          "chile",
          "cilantro",
          "1 pepino",
          "sal"
        ],
        "steps": [
          "Corta la cebolla y el pepino en trozos pequeños.",
          "Mezcla zumo de lima, chile y sal.",
          "Incorpora las gambas cocidas y frías y las verduras.",
          "Mantén refrigerado y sirve inmediatamente con cilantro."
        ]
      },
      "variants": [
        "Variantes peruanas a base de pescado y mexicanas con gambas, tomate o aguacate."
      ],
      "serving": [
        "Sirve con tostadas o, al estilo peruano, con maíz y boniato."
      ],
      "commonMistakes": [
        "No confíes en el zumo de lima para eliminar parásitos o bacterias patógenas."
      ]
    },
    "de": {
      "overview": "Bei klassischen Varianten wird roher Fisch in Zitrussaft mariniert; die Säure verändert die Konsistenz, macht den Fisch aber nicht mikrobiologisch sicher.",
      "history": "Ceviche hat in Peru einen besonders hohen Stellenwert und kommt in unterschiedlichen Formen an den Küsten Lateinamerikas vor, unter anderem in Mexiko.",
      "flavor": "Frisch, säuerlich, salzig und aromatisch.",
      "technique": "Meeresfrüchte kühl halten; diese Hausvariante verwendet vollständig gegarte Garnelen.",
      "essentials": [
        "400 g gegarte, gekühlte Garnelen",
        "4 Limetten",
        "1 rote Zwiebel"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 20 Min.",
        "ingredients": [
          "400 g gegarte, gekühlte Garnelen",
          "4 Limetten",
          "1 rote Zwiebel",
          "Chili",
          "Koriander",
          "1 Gurke",
          "Salz"
        ],
        "steps": [
          "Zwiebel und Gurke klein schneiden.",
          "Limettensaft, Chili und Salz mischen.",
          "Kalte, gegarte Garnelen und Gemüse unterheben.",
          "Kühl halten und sofort mit Koriander servieren."
        ]
      },
      "variants": [
        "Peruanische Fischvarianten und mexikanische Varianten mit Garnelen, Tomate oder Avocado."
      ],
      "serving": [
        "Mit Tostadas oder nach peruanischer Art mit Mais und Süßkartoffeln servieren."
      ],
      "commonMistakes": [
        "Nicht darauf verlassen, dass Limettensaft Parasiten oder krankheitserregende Bakterien abtötet."
      ]
    }
  },
  "lahmacun": {
    "en": {
      "overview": "A finely minced meat mixture is spread over thin dough and baked at high heat.",
      "history": "Lahmacun is widespread in Türkiye, with regional versions including those of Gaziantep and Şanlıurfa.",
      "flavor": "Crisp edges, juicy topping and aromatic spices.",
      "technique": "Roll the dough thinly and use a thin layer of topping.",
      "essentials": [
        "300 g wheat flour",
        "170 ml water",
        "salt"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 60 min",
        "ingredients": [
          "300 g wheat flour",
          "170 ml water",
          "salt",
          "250 g minced lamb or beef",
          "1 tomato",
          "1 onion",
          "parsley",
          "paprika powder"
        ],
        "steps": [
          "Knead the flour, water and salt into a smooth dough and let it rest.",
          "Finely chop the vegetables and mix with meat and spices.",
          "Divide the dough into six and roll thinly; spread the meat mixture over it.",
          "Bake at 240–250 °C until the dough is golden and the meat topping is cooked through."
        ]
      },
      "variants": [
        "Spices and the amount of garlic vary by region."
      ],
      "serving": [
        "Serve with parsley, onion and lemon."
      ],
      "commonMistakes": [
        "Do not add a thick, wet layer of topping."
      ]
    },
    "fr": {
      "overview": "Un mélange de viande finement hachée est réparti sur une pâte fine et cuit à haute température.",
      "history": "Le lahmacun est répandu en Turquie, avec des variantes régionales notamment à Gaziantep et Şanlıurfa.",
      "flavor": "Bords croustillants, garniture juteuse et épices aromatiques.",
      "technique": "Étaler finement la pâte et utiliser une fine couche de garniture.",
      "essentials": [
        "300 g de farine de blé",
        "170 ml d’eau",
        "sel"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 60 min",
        "ingredients": [
          "300 g de farine de blé",
          "170 ml d’eau",
          "sel",
          "250 g d’agneau ou de bœuf haché",
          "1 tomate",
          "1 oignon",
          "persil",
          "paprika en poudre"
        ],
        "steps": [
          "Pétrir la farine, l’eau et le sel pour obtenir une pâte lisse, puis laisser reposer.",
          "Hacher finement les légumes et les mélanger à la viande et aux épices.",
          "Diviser la pâte en six et l’étaler finement ; répartir le mélange de viande.",
          "Cuire à 240–250 °C jusqu’à ce que la pâte soit dorée et la viande cuite à cœur."
        ]
      },
      "variants": [
        "Les épices et la quantité d’ail varient selon les régions."
      ],
      "serving": [
        "Servir avec du persil, de l’oignon et du citron."
      ],
      "commonMistakes": [
        "Ne pas mettre une couche épaisse et humide de garniture."
      ]
    },
    "pt": {
      "overview": "Uma mistura de carne finamente picada é espalhada sobre massa fina e cozida a temperatura elevada.",
      "history": "O lahmacun é comum na Turquia, com variantes regionais, nomeadamente em Gaziantep e Şanlıurfa.",
      "flavor": "Bordos crocantes, recheio suculento e especiarias aromáticas.",
      "technique": "Estenda a massa finamente e use uma camada fina de recheio.",
      "essentials": [
        "300 g de farinha de trigo",
        "170 ml de água",
        "sal"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 60 min",
        "ingredients": [
          "300 g de farinha de trigo",
          "170 ml de água",
          "sal",
          "250 g de carne picada de borrego ou vaca",
          "1 tomate",
          "1 cebola",
          "salsa",
          "pimentão em pó"
        ],
        "steps": [
          "Amasse a farinha, a água e o sal até obter uma massa lisa e deixe repousar.",
          "Pique finamente os legumes e misture com a carne e as especiarias.",
          "Divida a massa em seis e estenda finamente; distribua a mistura de carne.",
          "Coza a 240–250 °C até a massa estar dourada e a carne bem cozinhada."
        ]
      },
      "variants": [
        "As especiarias e a quantidade de alho variam por região."
      ],
      "serving": [
        "Sirva com salsa, cebola e limão."
      ],
      "commonMistakes": [
        "Não coloque uma camada grossa e húmida de recheio."
      ]
    },
    "es": {
      "overview": "Una mezcla de carne finamente picada se extiende sobre masa fina y se hornea a temperatura alta.",
      "history": "El lahmacun está muy extendido en Turquía, con variantes regionales, entre ellas las de Gaziantep y Şanlıurfa.",
      "flavor": "Bordes crujientes, relleno jugoso y especias aromáticas.",
      "technique": "Estira la masa fina y utiliza una capa fina de relleno.",
      "essentials": [
        "300 g de harina de trigo",
        "170 ml de agua",
        "sal"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 60 min",
        "ingredients": [
          "300 g de harina de trigo",
          "170 ml de agua",
          "sal",
          "250 g de carne picada de cordero o vacuno",
          "1 tomate",
          "1 cebolla",
          "perejil",
          "pimentón"
        ],
        "steps": [
          "Amasa harina, agua y sal hasta obtener una masa lisa y deja reposar.",
          "Pica finamente las verduras y mezcla con la carne y las especias.",
          "Divide la masa en seis y estírala fina; reparte la mezcla de carne.",
          "Hornea a 240–250 °C hasta que la masa esté dorada y la carne hecha por dentro."
        ]
      },
      "variants": [
        "Las especias y la cantidad de ajo varían según la región."
      ],
      "serving": [
        "Sirve con perejil, cebolla y limón."
      ],
      "commonMistakes": [
        "No pongas una capa gruesa y húmeda de relleno."
      ]
    },
    "de": {
      "overview": "Eine fein gehackte Fleischmischung wird auf dünnem Teig verteilt und bei hoher Hitze gebacken.",
      "history": "Lahmacun ist in der Türkei weit verbreitet, mit regionalen Varianten unter anderem in Gaziantep und Şanlıurfa.",
      "flavor": "Knusprige Ränder, saftiger Belag und aromatische Gewürze.",
      "technique": "Teig dünn ausrollen und den Belag dünn auftragen.",
      "essentials": [
        "300 g Weizenmehl",
        "170 ml Wasser",
        "Salz"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 60 Min.",
        "ingredients": [
          "300 g Weizenmehl",
          "170 ml Wasser",
          "Salz",
          "250 g Lamm- oder Rinderhackfleisch",
          "1 Tomate",
          "1 Zwiebel",
          "Petersilie",
          "Paprikapulver"
        ],
        "steps": [
          "Mehl, Wasser und Salz zu einem glatten Teig kneten und ruhen lassen.",
          "Gemüse fein hacken und mit Fleisch und Gewürzen mischen.",
          "Teig in sechs Teile teilen und dünn ausrollen; Fleischmischung darauf verteilen.",
          "Bei 240–250 °C backen, bis der Teig goldbraun und der Fleischbelag durchgegart ist."
        ]
      },
      "variants": [
        "Gewürze und Knoblauchmenge variieren regional."
      ],
      "serving": [
        "Mit Petersilie, Zwiebel und Zitrone servieren."
      ],
      "commonMistakes": [
        "Keine dicke, feuchte Schicht Belag auftragen."
      ]
    }
  },
  "manti": {
    "en": {
      "overview": "Thin pieces of dough are filled, sealed and boiled before sauce is added.",
      "history": "Kayseri is particularly known for its small mantı; other regions have larger versions.",
      "flavor": "Soft dough, juicy filling and tangy yoghurt.",
      "technique": "Keep the dough covered while shaping small parcels.",
      "essentials": [
        "300 g wheat flour",
        "1 egg",
        "water and salt"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 90 min",
        "ingredients": [
          "300 g wheat flour",
          "1 egg",
          "water and salt",
          "250 g minced meat",
          "1 small onion",
          "300 g yoghurt",
          "2 garlic cloves",
          "butter",
          "paprika flakes"
        ],
        "steps": [
          "Knead flour, egg, water and salt into a firm dough and let it rest.",
          "Mix the minced meat with grated onion and salt.",
          "Roll out, cut into small squares, fill and seal.",
          "Boil until the dough is tender and the meat cooked through; top with garlic yoghurt and paprika butter."
        ]
      },
      "variants": [
        "Kayseri mantısı and larger hingel versions."
      ],
      "serving": [
        "Serve hot with cool yoghurt."
      ],
      "commonMistakes": [
        "Do not overfill the small dough parcels."
      ]
    },
    "fr": {
      "overview": "De fins morceaux de pâte sont garnis, fermés et cuits à l’eau avant d’ajouter la sauce.",
      "history": "Kayseri est particulièrement connue pour ses petits mantı ; d’autres régions en proposent de plus grands.",
      "flavor": "Pâte tendre, farce juteuse et yaourt acidulé.",
      "technique": "Garder la pâte couverte pendant le façonnage des petits raviolis.",
      "essentials": [
        "300 g de farine de blé",
        "1 œuf",
        "eau et sel"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 90 min",
        "ingredients": [
          "300 g de farine de blé",
          "1 œuf",
          "eau et sel",
          "250 g de viande hachée",
          "1 petit oignon",
          "300 g de yaourt",
          "2 gousses d’ail",
          "beurre",
          "flocons de paprika"
        ],
        "steps": [
          "Pétrir la farine, l’œuf, l’eau et le sel pour obtenir une pâte ferme, puis laisser reposer.",
          "Mélanger la viande hachée avec l’oignon râpé et le sel.",
          "Étaler, découper en petits carrés, garnir et fermer.",
          "Cuire à l’eau jusqu’à ce que la pâte soit tendre et la viande cuite à cœur ; garnir de yaourt à l’ail et de beurre au paprika."
        ]
      },
      "variants": [
        "Kayseri mantısı et variantes de hingel plus grandes."
      ],
      "serving": [
        "Servir chaud avec du yaourt frais."
      ],
      "commonMistakes": [
        "Ne pas trop garnir les petits raviolis."
      ]
    },
    "pt": {
      "overview": "Pedaços finos de massa são recheados, fechados e cozidos antes de juntar o molho.",
      "history": "Kayseri é especialmente conhecida pelos seus pequenos mantı; outras regiões têm versões maiores.",
      "flavor": "Massa macia, recheio suculento e iogurte ácido.",
      "technique": "Mantenha a massa tapada enquanto molda os pequenos embrulhos.",
      "essentials": [
        "300 g de farinha de trigo",
        "1 ovo",
        "água e sal"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 90 min",
        "ingredients": [
          "300 g de farinha de trigo",
          "1 ovo",
          "água e sal",
          "250 g de carne picada",
          "1 cebola pequena",
          "300 g de iogurte",
          "2 dentes de alho",
          "manteiga",
          "flocos de pimentão"
        ],
        "steps": [
          "Amasse farinha, ovo, água e sal até obter uma massa firme e deixe repousar.",
          "Misture a carne picada com cebola ralada e sal.",
          "Estenda, corte em pequenos quadrados, recheie e feche.",
          "Coza até a massa estar tenra e a carne bem cozinhada; cubra com iogurte de alho e manteiga de pimentão."
        ]
      },
      "variants": [
        "Kayseri mantısı e variantes maiores de hingel."
      ],
      "serving": [
        "Sirva quente com iogurte fresco."
      ],
      "commonMistakes": [
        "Não encha demasiado os pequenos embrulhos de massa."
      ]
    },
    "es": {
      "overview": "Las piezas finas de masa se rellenan, se cierran y se cuecen antes de añadir la salsa.",
      "history": "Kayseri es especialmente conocida por sus pequeños mantı; otras regiones tienen variantes mayores.",
      "flavor": "Masa suave, relleno jugoso y yogur ácido.",
      "technique": "Mantén la masa cubierta mientras formas los pequeños paquetes.",
      "essentials": [
        "300 g de harina de trigo",
        "1 huevo",
        "agua y sal"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 90 min",
        "ingredients": [
          "300 g de harina de trigo",
          "1 huevo",
          "agua y sal",
          "250 g de carne picada",
          "1 cebolla pequeña",
          "300 g de yogur",
          "2 dientes de ajo",
          "mantequilla",
          "copos de pimentón"
        ],
        "steps": [
          "Amasa harina, huevo, agua y sal hasta obtener una masa firme y deja reposar.",
          "Mezcla la carne picada con cebolla rallada y sal.",
          "Estira, corta en cuadrados pequeños, rellena y sella.",
          "Cuece hasta que la masa esté tierna y la carne hecha por dentro; cubre con yogur de ajo y mantequilla de pimentón."
        ]
      },
      "variants": [
        "Kayseri mantısı y variantes mayores de hingel."
      ],
      "serving": [
        "Sirve caliente con yogur frío."
      ],
      "commonMistakes": [
        "No rellenes demasiado los pequeños paquetes de masa."
      ]
    },
    "de": {
      "overview": "Dünne Teigstücke werden gefüllt, verschlossen und gekocht, bevor Sauce hinzugefügt wird.",
      "history": "Kayseri ist besonders für kleine Mantı bekannt; andere Regionen haben größere Varianten.",
      "flavor": "Weicher Teig, saftige Füllung und säuerlicher Joghurt.",
      "technique": "Teig beim Formen der kleinen Taschen abgedeckt halten.",
      "essentials": [
        "300 g Weizenmehl",
        "1 Ei",
        "Wasser und Salz"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 90 Min.",
        "ingredients": [
          "300 g Weizenmehl",
          "1 Ei",
          "Wasser und Salz",
          "250 g Hackfleisch",
          "1 kleine Zwiebel",
          "300 g Joghurt",
          "2 Knoblauchzehen",
          "Butter",
          "Paprikaflocken"
        ],
        "steps": [
          "Mehl, Ei, Wasser und Salz zu einem festen Teig kneten und ruhen lassen.",
          "Hackfleisch mit geriebener Zwiebel und Salz mischen.",
          "Ausrollen, in kleine Quadrate schneiden, füllen und verschließen.",
          "Kochen, bis der Teig weich und das Fleisch durchgegart ist; Knoblauchjoghurt und Paprikabutter darübergeben."
        ]
      },
      "variants": [
        "Kayseri Mantısı und größere Hingel-Varianten."
      ],
      "serving": [
        "Heiß mit kühlem Joghurt servieren."
      ],
      "commonMistakes": [
        "Kleine Teigtaschen nicht überfüllen."
      ]
    }
  },
  "doner": {
    "en": {
      "overview": "The meat is sliced off thinly as the surface cooks.",
      "history": "Döner is an established Turkish meat and street-food tradition and is also served as a plated dish.",
      "flavor": "Roasted, juicy and spiced.",
      "technique": "The home version uses thin slices of meat in a hot pan rather than a rotating spit.",
      "essentials": [
        "600 g boneless chicken thigh",
        "2 tbsp yoghurt",
        "1 tbsp oil"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30 min + marinating",
        "ingredients": [
          "600 g boneless chicken thigh",
          "2 tbsp yoghurt",
          "1 tbsp oil",
          "paprika powder",
          "cumin",
          "garlic",
          "salt",
          "bread and salad"
        ],
        "steps": [
          "Cut the chicken into thin strips.",
          "Marinate with yoghurt, oil and spices in the refrigerator.",
          "Fry in small batches over high heat until cooked through.",
          "Serve in bread or on a plate with salad."
        ]
      },
      "variants": [
        "Lamb, beef or chicken döner; dürüm in rolled flatbread."
      ],
      "serving": [
        "Serve with onion, tomato and your preferred sauce."
      ],
      "commonMistakes": [
        "Do not overcrowd the pan or use raw marinade as sauce."
      ]
    },
    "fr": {
      "overview": "La viande est découpée en fines tranches à mesure que sa surface cuit.",
      "history": "Le döner appartient à une tradition turque établie de viande et de cuisine de rue ; il est aussi servi à l’assiette.",
      "flavor": "Grillé, juteux et épicé.",
      "technique": "La version maison utilise de fines tranches de viande dans une poêle chaude, plutôt qu’une broche rotative.",
      "essentials": [
        "600 g de hauts de cuisse de poulet désossés",
        "2 c. à soupe de yaourt",
        "1 c. à soupe d’huile"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30 min + marinade",
        "ingredients": [
          "600 g de hauts de cuisse de poulet désossés",
          "2 c. à soupe de yaourt",
          "1 c. à soupe d’huile",
          "paprika en poudre",
          "cumin",
          "ail",
          "sel",
          "pain et salade"
        ],
        "steps": [
          "Couper le poulet en fines lanières.",
          "Faire mariner au réfrigérateur avec du yaourt, de l’huile et des épices.",
          "Faire revenir par petites quantités à feu vif jusqu’à cuisson complète.",
          "Servir dans du pain ou à l’assiette avec de la salade."
        ]
      },
      "variants": [
        "Döner à l’agneau, au bœuf ou au poulet ; dürüm dans un pain plat roulé."
      ],
      "serving": [
        "Servir avec de l’oignon, de la tomate et la sauce de son choix."
      ],
      "commonMistakes": [
        "Ne pas surcharger la poêle ni utiliser la marinade crue comme sauce."
      ]
    },
    "pt": {
      "overview": "A carne é cortada em fatias finas à medida que a superfície cozinha.",
      "history": "O döner é uma tradição turca consolidada de carne e comida de rua e também é servido no prato.",
      "flavor": "Tostado, suculento e condimentado.",
      "technique": "A versão caseira usa fatias finas de carne numa frigideira quente, não um espeto rotativo.",
      "essentials": [
        "600 g de coxa de frango desossada",
        "2 c. de sopa de iogurte",
        "1 c. de sopa de óleo"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30 min + marinada",
        "ingredients": [
          "600 g de coxa de frango desossada",
          "2 c. de sopa de iogurte",
          "1 c. de sopa de óleo",
          "pimentão em pó",
          "cominhos",
          "alho",
          "sal",
          "pão e salada"
        ],
        "steps": [
          "Corte o frango em tiras finas.",
          "Marine no frigorífico com iogurte, óleo e especiarias.",
          "Salteie em pequenas porções em lume forte até estar bem cozinhado.",
          "Sirva no pão ou no prato com salada."
        ]
      },
      "variants": [
        "Döner de borrego, vaca ou frango; dürüm em pão achatado enrolado."
      ],
      "serving": [
        "Sirva com cebola, tomate e molho a gosto."
      ],
      "commonMistakes": [
        "Não encha demasiado a frigideira nem use a marinada crua como molho."
      ]
    },
    "es": {
      "overview": "La carne se corta en lonchas finas a medida que se cocina la superficie.",
      "history": "El döner es una tradición turca consolidada de carne y comida callejera y también se sirve en plato.",
      "flavor": "Tostado, jugoso y especiado.",
      "technique": "La versión casera utiliza lonchas finas de carne en una sartén caliente, no un asador giratorio.",
      "essentials": [
        "600 g de contramuslo de pollo deshuesado",
        "2 cucharadas de yogur",
        "1 cucharada de aceite"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30 min + marinado",
        "ingredients": [
          "600 g de contramuslo de pollo deshuesado",
          "2 cucharadas de yogur",
          "1 cucharada de aceite",
          "pimentón",
          "comino",
          "ajo",
          "sal",
          "pan y ensalada"
        ],
        "steps": [
          "Corta el pollo en tiras finas.",
          "Marina en el frigorífico con yogur, aceite y especias.",
          "Saltea en tandas pequeñas a fuego fuerte hasta que esté hecho por dentro.",
          "Sirve en pan o en plato con ensalada."
        ]
      },
      "variants": [
        "Döner de cordero, vacuno o pollo; dürüm en pan plano enrollado."
      ],
      "serving": [
        "Sirve con cebolla, tomate y la salsa que prefieras."
      ],
      "commonMistakes": [
        "No llenes demasiado la sartén ni uses la marinada cruda como salsa."
      ]
    },
    "de": {
      "overview": "Das Fleisch wird in dünnen Scheiben abgeschnitten, sobald die Oberfläche gar ist.",
      "history": "Döner ist eine etablierte türkische Fleisch- und Streetfood-Tradition und wird auch als Tellergericht serviert.",
      "flavor": "Röstig, saftig und würzig.",
      "technique": "Die Hausvariante verwendet dünne Fleischscheiben in einer heißen Pfanne statt eines Drehspießes.",
      "essentials": [
        "600 g Hähnchenschenkelfilet ohne Knochen",
        "2 EL Joghurt",
        "1 EL Öl"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30 Min. + Marinierzeit",
        "ingredients": [
          "600 g Hähnchenschenkelfilet ohne Knochen",
          "2 EL Joghurt",
          "1 EL Öl",
          "Paprikapulver",
          "Kreuzkümmel",
          "Knoblauch",
          "Salz",
          "Brot und Salat"
        ],
        "steps": [
          "Hähnchen in dünne Streifen schneiden.",
          "Mit Joghurt, Öl und Gewürzen im Kühlschrank marinieren.",
          "Portionsweise bei hoher Hitze vollständig durchbraten.",
          "Im Brot oder auf einem Teller mit Salat servieren."
        ]
      },
      "variants": [
        "Döner aus Lamm, Rind oder Hähnchen; Dürüm im gerollten Fladenbrot."
      ],
      "serving": [
        "Mit Zwiebel, Tomate und Sauce nach Wahl servieren."
      ],
      "commonMistakes": [
        "Pfanne nicht überfüllen und rohe Marinade nicht als Sauce verwenden."
      ]
    }
  },
  "kofte": {
    "en": {
      "overview": "Minced meat is shaped with onion and spices; the composition varies by region.",
      "history": "Türkiye has numerous local köfte traditions, including in Tekirdağ and Burdur.",
      "flavor": "Juicy, roasted and aromatic.",
      "technique": "Shape evenly sized patties and cook through.",
      "essentials": [
        "500 g minced meat",
        "1 small onion",
        "2 tbsp breadcrumbs"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40 min",
        "ingredients": [
          "500 g minced meat",
          "1 small onion",
          "2 tbsp breadcrumbs",
          "parsley",
          "cumin",
          "pepper",
          "salt"
        ],
        "steps": [
          "Grate the onion and mix with the meat and spices.",
          "Shape small, flat patties.",
          "Let rest chilled for 20 minutes.",
          "Grill or pan-fry until cooked through."
        ]
      },
      "variants": [
        "Şiş köfte on skewers and İzmir köfte with tomato sauce."
      ],
      "serving": [
        "Serve with salad, bread or piyaz."
      ],
      "commonMistakes": [
        "Do not cook over such high heat that the outside burns before the centre is done."
      ]
    },
    "fr": {
      "overview": "La viande hachée est façonnée avec de l’oignon et des épices ; la composition varie selon les régions.",
      "history": "La Turquie compte de nombreuses traditions locales de köfte, notamment à Tekirdağ et Burdur.",
      "flavor": "Juteux, grillé et aromatique.",
      "technique": "Former des galettes de taille régulière et les cuire à cœur.",
      "essentials": [
        "500 g de viande hachée",
        "1 petit oignon",
        "2 c. à soupe de chapelure"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40 min",
        "ingredients": [
          "500 g de viande hachée",
          "1 petit oignon",
          "2 c. à soupe de chapelure",
          "persil",
          "cumin",
          "poivre",
          "sel"
        ],
        "steps": [
          "Râper l’oignon et mélanger avec la viande et les épices.",
          "Former de petites galettes plates.",
          "Laisser reposer au frais pendant 20 minutes.",
          "Griller ou poêler jusqu’à cuisson complète."
        ]
      },
      "variants": [
        "Şiş köfte en brochettes et İzmir köfte à la sauce tomate."
      ],
      "serving": [
        "Servir avec de la salade, du pain ou du piyaz."
      ],
      "commonMistakes": [
        "Ne pas cuire à feu si vif que l’extérieur brûle avant que le centre soit cuit."
      ]
    },
    "pt": {
      "overview": "A carne picada é moldada com cebola e especiarias; a composição varia por região.",
      "history": "A Turquia tem várias tradições locais de köfte, nomeadamente em Tekirdağ e Burdur.",
      "flavor": "Suculento, tostado e aromático.",
      "technique": "Forme bolinhos de tamanho uniforme e cozinhe completamente.",
      "essentials": [
        "500 g de carne picada",
        "1 cebola pequena",
        "2 c. de sopa de pão ralado"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40 min",
        "ingredients": [
          "500 g de carne picada",
          "1 cebola pequena",
          "2 c. de sopa de pão ralado",
          "salsa",
          "cominhos",
          "pimenta",
          "sal"
        ],
        "steps": [
          "Rale a cebola e misture com a carne e as especiarias.",
          "Forme pequenos bolinhos achatados.",
          "Deixe repousar no frio durante 20 minutos.",
          "Grelhe ou frite na frigideira até estarem bem cozinhados."
        ]
      },
      "variants": [
        "Şiş köfte em espetadas e İzmir köfte com molho de tomate."
      ],
      "serving": [
        "Sirva com salada, pão ou piyaz."
      ],
      "commonMistakes": [
        "Não cozinhe em lume tão forte que o exterior queime antes de o centro estar cozinhado."
      ]
    },
    "es": {
      "overview": "La carne picada se moldea con cebolla y especias; la composición varía según la región.",
      "history": "Turquía tiene numerosas tradiciones locales de köfte, entre ellas las de Tekirdağ y Burdur.",
      "flavor": "Jugoso, tostado y aromático.",
      "technique": "Forma tortitas de tamaño uniforme y cocina por completo.",
      "essentials": [
        "500 g de carne picada",
        "1 cebolla pequeña",
        "2 cucharadas de pan rallado"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40 min",
        "ingredients": [
          "500 g de carne picada",
          "1 cebolla pequeña",
          "2 cucharadas de pan rallado",
          "perejil",
          "comino",
          "pimienta",
          "sal"
        ],
        "steps": [
          "Ralla la cebolla y mezcla con la carne y las especias.",
          "Forma pequeñas tortitas planas.",
          "Deja reposar en frío durante 20 minutos.",
          "Asa a la parrilla o fríe en sartén hasta que estén hechas por dentro."
        ]
      },
      "variants": [
        "Şiş köfte en brochetas e İzmir köfte con salsa de tomate."
      ],
      "serving": [
        "Sirve con ensalada, pan o piyaz."
      ],
      "commonMistakes": [
        "No cocines a fuego tan fuerte que el exterior se queme antes de que el centro esté hecho."
      ]
    },
    "de": {
      "overview": "Hackfleisch wird mit Zwiebeln und Gewürzen geformt; die Zusammensetzung variiert regional.",
      "history": "In der Türkei gibt es zahlreiche lokale Köfte-Traditionen, unter anderem in Tekirdağ und Burdur.",
      "flavor": "Saftig, röstig und aromatisch.",
      "technique": "Gleich große Frikadellen formen und vollständig durchgaren.",
      "essentials": [
        "500 g Hackfleisch",
        "1 kleine Zwiebel",
        "2 EL Semmelbrösel"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40 Min.",
        "ingredients": [
          "500 g Hackfleisch",
          "1 kleine Zwiebel",
          "2 EL Semmelbrösel",
          "Petersilie",
          "Kreuzkümmel",
          "Pfeffer",
          "Salz"
        ],
        "steps": [
          "Zwiebel reiben und mit Fleisch und Gewürzen mischen.",
          "Kleine flache Frikadellen formen.",
          "20 Minuten kühl ruhen lassen.",
          "Grillen oder in der Pfanne vollständig durchbraten."
        ]
      },
      "variants": [
        "Şiş Köfte am Spieß und İzmir Köfte mit Tomatensauce."
      ],
      "serving": [
        "Mit Salat, Brot oder Piyaz servieren."
      ],
      "commonMistakes": [
        "Nicht bei so hoher Hitze braten, dass die Außenseite verbrennt, bevor die Mitte gar ist."
      ]
    }
  },
  "baba-ganoush": {
    "en": {
      "overview": "The aubergine is grilled or roasted until soft and mixed with seasonings.",
      "history": "The dish belongs to Levantine mezze traditions; names and ingredients vary locally.",
      "flavor": "Smoky, tangy and creamy.",
      "technique": "Let the cooked aubergine drain before mashing it.",
      "essentials": [
        "2 large aubergines",
        "2 tbsp tahini",
        "1 lemon"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 50 min",
        "ingredients": [
          "2 large aubergines",
          "2 tbsp tahini",
          "1 lemon",
          "1 garlic clove",
          "olive oil",
          "salt"
        ],
        "steps": [
          "Prick the aubergines and roast at 230 °C until completely soft.",
          "Cool slightly, split and scoop out the flesh.",
          "Let excess liquid drain off.",
          "Mash with tahini, lemon, garlic and salt; top with oil."
        ]
      },
      "variants": [
        "Tahini-based versions are also called mutabbal in parts of the Levant."
      ],
      "serving": [
        "Serve with pitta bread and other small dishes."
      ],
      "commonMistakes": [
        "Do not use aubergine that is still firm inside."
      ]
    },
    "fr": {
      "overview": "L’aubergine est grillée ou rôtie jusqu’à tendreté, puis mélangée aux assaisonnements.",
      "history": "Le plat fait partie des traditions levantines du mezzé ; les noms et ingrédients varient localement.",
      "flavor": "Fumé, acidulé et crémeux.",
      "technique": "Laisser égoutter l’aubergine cuite avant de l’écraser.",
      "essentials": [
        "2 grosses aubergines",
        "2 c. à soupe de tahini",
        "1 citron"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 50 min",
        "ingredients": [
          "2 grosses aubergines",
          "2 c. à soupe de tahini",
          "1 citron",
          "1 gousse d’ail",
          "huile d’olive",
          "sel"
        ],
        "steps": [
          "Piquer les aubergines et les rôtir à 230 °C jusqu’à ce qu’elles soient complètement tendres.",
          "Laisser refroidir légèrement, couper en deux et prélever la chair.",
          "Laisser s’écouler l’excédent de liquide.",
          "Écraser avec le tahini, le citron, l’ail et le sel ; arroser d’huile."
        ]
      },
      "variants": [
        "Les variantes à base de tahini sont aussi appelées mutabbal dans certaines parties du Levant."
      ],
      "serving": [
        "Servir avec du pain pita et d’autres petits plats."
      ],
      "commonMistakes": [
        "Ne pas utiliser d’aubergine encore ferme à l’intérieur."
      ]
    },
    "pt": {
      "overview": "A beringela é grelhada ou assada até ficar macia e misturada com temperos.",
      "history": "O prato faz parte das tradições levantinas de meze; os nomes e ingredientes variam localmente.",
      "flavor": "Fumado, ácido e cremoso.",
      "technique": "Deixe a beringela cozinhada escorrer antes de a esmagar.",
      "essentials": [
        "2 beringelas grandes",
        "2 c. de sopa de tahini",
        "1 limão"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 50 min",
        "ingredients": [
          "2 beringelas grandes",
          "2 c. de sopa de tahini",
          "1 limão",
          "1 dente de alho",
          "azeite",
          "sal"
        ],
        "steps": [
          "Pique as beringelas e asse a 230 °C até ficarem completamente macias.",
          "Deixe arrefecer um pouco, abra e retire a polpa.",
          "Deixe escorrer o excesso de líquido.",
          "Esmague com tahini, limão, alho e sal; regue com azeite."
        ]
      },
      "variants": [
        "As variantes com tahini também são chamadas mutabbal em partes do Levante."
      ],
      "serving": [
        "Sirva com pão pita e outros pratos pequenos."
      ],
      "commonMistakes": [
        "Não use beringela ainda firme no interior."
      ]
    },
    "es": {
      "overview": "La berenjena se asa a la parrilla o al horno hasta quedar tierna y se mezcla con condimentos.",
      "history": "El plato forma parte de las tradiciones levantinas de mezze; los nombres e ingredientes varían localmente.",
      "flavor": "Ahumado, ácido y cremoso.",
      "technique": "Deja escurrir la berenjena asada antes de triturarla.",
      "essentials": [
        "2 berenjenas grandes",
        "2 cucharadas de tahini",
        "1 limón"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 50 min",
        "ingredients": [
          "2 berenjenas grandes",
          "2 cucharadas de tahini",
          "1 limón",
          "1 diente de ajo",
          "aceite de oliva",
          "sal"
        ],
        "steps": [
          "Pincha las berenjenas y ásalas a 230 °C hasta que estén completamente tiernas.",
          "Deja enfriar un poco, abre y extrae la pulpa.",
          "Deja escurrir el exceso de líquido.",
          "Tritura con tahini, limón, ajo y sal; añade aceite por encima."
        ]
      },
      "variants": [
        "Las variantes a base de tahini también se llaman mutabbal en algunas zonas del Levante."
      ],
      "serving": [
        "Sirve con pan de pita y otros platos pequeños."
      ],
      "commonMistakes": [
        "No uses berenjena que siga firme por dentro."
      ]
    },
    "de": {
      "overview": "Auberginen werden weich gegrillt oder im Ofen gebacken und mit Würzzutaten gemischt.",
      "history": "Das Gericht gehört zu den levantinischen Mezze-Traditionen; Namen und Zutaten variieren lokal.",
      "flavor": "Rauchig, säuerlich und cremig.",
      "technique": "Gegarte Auberginen vor dem Zerdrücken abtropfen lassen.",
      "essentials": [
        "2 große Auberginen",
        "2 EL Tahini",
        "1 Zitrone"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 50 Min.",
        "ingredients": [
          "2 große Auberginen",
          "2 EL Tahini",
          "1 Zitrone",
          "1 Knoblauchzehe",
          "Olivenöl",
          "Salz"
        ],
        "steps": [
          "Auberginen einstechen und bei 230 °C ganz weich backen.",
          "Etwas abkühlen lassen, aufschneiden und das Fruchtfleisch herauslösen.",
          "Überschüssige Flüssigkeit abtropfen lassen.",
          "Mit Tahini, Zitrone, Knoblauch und Salz zerdrücken; mit Öl beträufeln."
        ]
      },
      "variants": [
        "Varianten mit Tahini werden in Teilen der Levante auch Mutabbal genannt."
      ],
      "serving": [
        "Mit Pitabrot und anderen kleinen Gerichten servieren."
      ],
      "commonMistakes": [
        "Keine Auberginen verwenden, die innen noch fest sind."
      ]
    }
  },
  "tabbouleh": {
    "en": {
      "overview": "Finely chopped herbs are mixed with a little bulgur and a simple lemon and oil dressing.",
      "history": "Tabbouleh is particularly well known in Lebanese and Syrian food culture and is often served as mezze.",
      "flavor": "Fresh, tangy and herbal.",
      "technique": "Dry the herbs well and finely chop with a sharp knife.",
      "essentials": [
        "2 large bunches flat-leaf parsley",
        "1 small bunch mint",
        "3 tomatoes"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 25 min",
        "ingredients": [
          "2 large bunches flat-leaf parsley",
          "1 small bunch mint",
          "3 tomatoes",
          "50 g fine bulgur",
          "2 spring onions",
          "1–2 lemons",
          "3 tbsp olive oil",
          "salt"
        ],
        "steps": [
          "Prepare the bulgur according to the packet instructions and drain.",
          "Wash and dry the herbs; finely chop them.",
          "Finely chop the tomatoes and spring onions.",
          "Mix everything with lemon juice, olive oil and salt."
        ]
      },
      "variants": [
        "The ratio of bulgur to herbs varies; parsley dominates in many Levantine versions."
      ],
      "serving": [
        "Serve chilled as mezze or with grilled food."
      ],
      "commonMistakes": [
        "Do not let the bulgur dominate the salad if you want an herb-forward version."
      ]
    },
    "fr": {
      "overview": "Des herbes finement hachées sont mélangées à un peu de boulgour et à un assaisonnement simple au citron et à l’huile.",
      "history": "Le taboulé est particulièrement connu dans les cultures culinaires libanaise et syrienne et souvent servi en mezzé.",
      "flavor": "Frais, acidulé et herbacé.",
      "technique": "Bien sécher les herbes et les hacher finement avec un couteau tranchant.",
      "essentials": [
        "2 gros bouquets de persil plat",
        "1 petit bouquet de menthe",
        "3 tomates"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 25 min",
        "ingredients": [
          "2 gros bouquets de persil plat",
          "1 petit bouquet de menthe",
          "3 tomates",
          "50 g de boulgour fin",
          "2 oignons nouveaux",
          "1–2 citrons",
          "3 c. à soupe d’huile d’olive",
          "sel"
        ],
        "steps": [
          "Préparer le boulgour selon les instructions du paquet et l’égoutter.",
          "Laver et sécher les herbes ; les hacher finement.",
          "Couper les tomates et les oignons nouveaux en petits morceaux.",
          "Mélanger le tout avec le jus de citron, l’huile d’olive et le sel."
        ]
      },
      "variants": [
        "La proportion de boulgour et d’herbes varie ; le persil domine dans de nombreuses variantes levantines."
      ],
      "serving": [
        "Servir frais en mezzé ou avec des grillades."
      ],
      "commonMistakes": [
        "Ne pas laisser le boulgour dominer la salade si l’on souhaite une version riche en herbes."
      ]
    },
    "pt": {
      "overview": "Ervas finamente picadas são misturadas com um pouco de bulgur e um molho simples de limão e azeite.",
      "history": "O tabule é especialmente conhecido nas culturas gastronómicas libanesa e síria e é frequentemente servido como meze.",
      "flavor": "Fresco, ácido e herbáceo.",
      "technique": "Seque bem as ervas e pique-as finamente com uma faca afiada.",
      "essentials": [
        "2 molhos grandes de salsa de folha lisa",
        "1 molho pequeno de hortelã",
        "3 tomates"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 25 min",
        "ingredients": [
          "2 molhos grandes de salsa de folha lisa",
          "1 molho pequeno de hortelã",
          "3 tomates",
          "50 g de bulgur fino",
          "2 cebolinhas verdes",
          "1–2 limões",
          "3 c. de sopa de azeite",
          "sal"
        ],
        "steps": [
          "Prepare o bulgur de acordo com as instruções da embalagem e escorra.",
          "Lave e seque as ervas; pique-as finamente.",
          "Corte o tomate e a cebolinha verde em pedaços pequenos.",
          "Misture tudo com sumo de limão, azeite e sal."
        ]
      },
      "variants": [
        "A proporção de bulgur e ervas varia; a salsa predomina em muitas variantes levantinas."
      ],
      "serving": [
        "Sirva fresco como meze ou com grelhados."
      ],
      "commonMistakes": [
        "Não deixe o bulgur dominar a salada se pretende uma versão rica em ervas."
      ]
    },
    "es": {
      "overview": "Las hierbas finamente picadas se mezclan con un poco de bulgur y un aliño sencillo de limón y aceite.",
      "history": "El tabulé es especialmente conocido en las culturas culinarias libanesa y siria y suele servirse como mezze.",
      "flavor": "Fresco, ácido y herbáceo.",
      "technique": "Seca bien las hierbas y pícalas finamente con un cuchillo afilado.",
      "essentials": [
        "2 manojos grandes de perejil de hoja plana",
        "1 manojo pequeño de menta",
        "3 tomates"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 25 min",
        "ingredients": [
          "2 manojos grandes de perejil de hoja plana",
          "1 manojo pequeño de menta",
          "3 tomates",
          "50 g de bulgur fino",
          "2 cebolletas",
          "1–2 limones",
          "3 cucharadas de aceite de oliva",
          "sal"
        ],
        "steps": [
          "Prepara el bulgur según las instrucciones del envase y escúrrelo.",
          "Lava y seca las hierbas; pícalas finamente.",
          "Corta los tomates y las cebolletas en trozos pequeños.",
          "Mezcla todo con zumo de limón, aceite de oliva y sal."
        ]
      },
      "variants": [
        "La proporción de bulgur y hierbas varía; el perejil predomina en muchas variantes levantinas."
      ],
      "serving": [
        "Sirve frío como mezze o con alimentos a la parrilla."
      ],
      "commonMistakes": [
        "No dejes que el bulgur domine la ensalada si buscas una versión rica en hierbas."
      ]
    },
    "de": {
      "overview": "Fein gehackte Kräuter werden mit etwas Bulgur und einem einfachen Zitronen-Öl-Dressing vermischt.",
      "history": "Taboulé ist besonders aus der libanesischen und syrischen Esskultur bekannt und wird oft als Mezze serviert.",
      "flavor": "Frisch, säuerlich und kräuterbetont.",
      "technique": "Kräuter gut trocknen und mit einem scharfen Messer fein hacken.",
      "essentials": [
        "2 große Bund glatte Petersilie",
        "1 kleines Bund Minze",
        "3 Tomaten"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 25 Min.",
        "ingredients": [
          "2 große Bund glatte Petersilie",
          "1 kleines Bund Minze",
          "3 Tomaten",
          "50 g feiner Bulgur",
          "2 Frühlingszwiebeln",
          "1–2 Zitronen",
          "3 EL Olivenöl",
          "Salz"
        ],
        "steps": [
          "Bulgur nach Packungsanleitung zubereiten und abtropfen lassen.",
          "Kräuter waschen, trocknen und fein hacken.",
          "Tomaten und Frühlingszwiebeln klein schneiden.",
          "Alles mit Zitronensaft, Olivenöl und Salz vermischen."
        ]
      },
      "variants": [
        "Das Verhältnis von Bulgur zu Kräutern variiert; Petersilie dominiert in vielen levantinischen Varianten."
      ],
      "serving": [
        "Kühl als Mezze oder zu Grillgerichten servieren."
      ],
      "commonMistakes": [
        "Bulgur im Salat nicht dominieren lassen, wenn eine kräuterbetonte Variante gewünscht ist."
      ]
    }
  },
  "farikal": {
    "en": {
      "overview": "Meat and cabbage are layered in a pot with a little water.",
      "history": "Fårikål is a Norwegian national dish, particularly associated with the autumn lamb season.",
      "flavor": "Mild cabbage sweetness, rich meat flavour and pepper.",
      "technique": "Simmer gently with the lid on until the meat comes away easily from the bone.",
      "essentials": [
        "1.2 kg bone-in lamb or mutton for fårikål",
        "1.2 kg white cabbage",
        "2 tsp whole black peppercorns"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 2.5 hours",
        "ingredients": [
          "1.2 kg bone-in lamb or mutton for fårikål",
          "1.2 kg white cabbage",
          "2 tsp whole black peppercorns",
          "salt",
          "300 ml water"
        ],
        "steps": [
          "Cut the cabbage into wedges.",
          "Layer the meat and cabbage with salt and pepper.",
          "Add water and simmer covered for about two hours, until the meat is tender.",
          "Season with salt."
        ]
      },
      "variants": [
        "Some people thicken the broth lightly with flour."
      ],
      "serving": [
        "Serve with boiled potatoes."
      ],
      "commonMistakes": [
        "Avoid vigorous boiling and too much water."
      ]
    },
    "fr": {
      "overview": "La viande et le chou sont disposés en couches dans une marmite avec un peu d’eau.",
      "history": "Le fårikål est un plat national norvégien, particulièrement associé à la saison de l’agneau en automne.",
      "flavor": "Douceur légère du chou, saveur prononcée de viande et poivre.",
      "technique": "Laisser mijoter doucement à couvert jusqu’à ce que la viande se détache facilement de l’os.",
      "essentials": [
        "1,2 kg d’agneau ou de mouton avec os pour fårikål",
        "1,2 kg de chou blanc",
        "2 c. à café de grains de poivre noir"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 2,5 heures",
        "ingredients": [
          "1,2 kg d’agneau ou de mouton avec os pour fårikål",
          "1,2 kg de chou blanc",
          "2 c. à café de grains de poivre noir",
          "sel",
          "300 ml d’eau"
        ],
        "steps": [
          "Couper le chou en quartiers.",
          "Disposer la viande et le chou en couches avec du sel et du poivre.",
          "Ajouter l’eau et laisser mijoter à couvert environ deux heures, jusqu’à ce que la viande soit tendre.",
          "Rectifier l’assaisonnement en sel."
        ]
      },
      "variants": [
        "Certains épaississent légèrement le bouillon avec de la farine."
      ],
      "serving": [
        "Servir avec des pommes de terre bouillies."
      ],
      "commonMistakes": [
        "Éviter une forte ébullition et un excès d’eau."
      ]
    },
    "pt": {
      "overview": "A carne e a couve são dispostas em camadas num tacho com um pouco de água.",
      "history": "O fårikål é um prato nacional norueguês, especialmente associado à época do borrego no outono.",
      "flavor": "Doçura suave da couve, sabor intenso a carne e pimenta.",
      "technique": "Deixe cozinhar suavemente com tampa até a carne se soltar facilmente do osso.",
      "essentials": [
        "1,2 kg de borrego ou carneiro com osso para fårikål",
        "1,2 kg de couve branca",
        "2 c. de chá de pimenta-preta em grão"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 2,5 horas",
        "ingredients": [
          "1,2 kg de borrego ou carneiro com osso para fårikål",
          "1,2 kg de couve branca",
          "2 c. de chá de pimenta-preta em grão",
          "sal",
          "300 ml de água"
        ],
        "steps": [
          "Corte a couve em gomos.",
          "Disponha a carne e a couve em camadas com sal e pimenta.",
          "Junte água e deixe cozinhar em lume brando com tampa durante cerca de duas horas, até a carne ficar tenra.",
          "Tempere com sal."
        ]
      },
      "variants": [
        "Algumas pessoas engrossam ligeiramente o caldo com farinha."
      ],
      "serving": [
        "Sirva com batatas cozidas."
      ],
      "commonMistakes": [
        "Evite ferver intensamente e usar demasiada água."
      ]
    },
    "es": {
      "overview": "La carne y la col se disponen en capas en una olla con un poco de agua.",
      "history": "El fårikål es un plato nacional noruego, especialmente asociado con la temporada otoñal del cordero.",
      "flavor": "Dulzor suave de la col, sabor intenso a carne y pimienta.",
      "technique": "Cuece suavemente con tapa hasta que la carne se desprenda fácilmente del hueso.",
      "essentials": [
        "1,2 kg de cordero u oveja con hueso para fårikål",
        "1,2 kg de col blanca",
        "2 cucharaditas de pimienta negra en grano"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 2,5 horas",
        "ingredients": [
          "1,2 kg de cordero u oveja con hueso para fårikål",
          "1,2 kg de col blanca",
          "2 cucharaditas de pimienta negra en grano",
          "sal",
          "300 ml de agua"
        ],
        "steps": [
          "Corta la col en gajos.",
          "Coloca la carne y la col en capas con sal y pimienta.",
          "Añade agua y cuece a fuego lento con tapa durante unas dos horas, hasta que la carne esté tierna.",
          "Ajusta la sal."
        ]
      },
      "variants": [
        "Algunas personas espesan ligeramente el caldo con harina."
      ],
      "serving": [
        "Sirve con patatas cocidas."
      ],
      "commonMistakes": [
        "Evita la ebullición fuerte y el exceso de agua."
      ]
    },
    "de": {
      "overview": "Fleisch und Kohl werden mit etwas Wasser in einem Topf geschichtet.",
      "history": "Fårikål ist ein norwegisches Nationalgericht, das besonders mit der Lammfleischsaison im Herbst verbunden ist.",
      "flavor": "Milde Kohlsüße, kräftiger Fleischgeschmack und Pfeffer.",
      "technique": "Zugedeckt sanft garen, bis sich das Fleisch leicht vom Knochen löst.",
      "essentials": [
        "1,2 kg Lamm- oder Hammelfleisch mit Knochen für Fårikål",
        "1,2 kg Weißkohl",
        "2 TL schwarze Pfefferkörner"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 2,5 Stunden",
        "ingredients": [
          "1,2 kg Lamm- oder Hammelfleisch mit Knochen für Fårikål",
          "1,2 kg Weißkohl",
          "2 TL schwarze Pfefferkörner",
          "Salz",
          "300 ml Wasser"
        ],
        "steps": [
          "Kohl in Spalten schneiden.",
          "Fleisch und Kohl mit Salz und Pfeffer schichten.",
          "Wasser hinzufügen und zugedeckt etwa zwei Stunden sanft garen, bis das Fleisch weich ist.",
          "Mit Salz abschmecken."
        ]
      },
      "variants": [
        "Manche binden die Brühe leicht mit Mehl."
      ],
      "serving": [
        "Mit Salzkartoffeln servieren."
      ],
      "commonMistakes": [
        "Starkes Kochen und zu viel Wasser vermeiden."
      ]
    }
  },
  "kjottkaker": {
    "en": {
      "overview": "Seasoned minced meat is shaped into flat patties, browned and finished in sauce.",
      "history": "Kjøttkaker in brown gravy are an established part of Norwegian home cooking.",
      "flavor": "Rich meat flavour with mild seasoning and browned gravy.",
      "technique": "Gradually incorporate cold milk into the minced mixture and brown the patties before simmering them until done.",
      "essentials": [
        "500 g minced meat",
        "1 tsp salt",
        "2 tbsp potato starch"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "500 g minced meat",
          "1 tsp salt",
          "2 tbsp potato starch",
          "150 ml milk",
          "pepper and nutmeg",
          "butter",
          "3 tbsp wheat flour",
          "500 ml stock"
        ],
        "steps": [
          "Mix the minced meat with salt, potato starch and spices; gradually add the milk.",
          "Shape patties and brown in butter.",
          "Brown flour in butter and gradually whisk in stock.",
          "Simmer the patties in the gravy until cooked through."
        ]
      },
      "variants": [
        "They are served, among other things, with creamed cabbage or mashed peas."
      ],
      "serving": [
        "Serve with potatoes and lingonberries."
      ],
      "commonMistakes": [
        "Do not add all the milk at once."
      ]
    },
    "fr": {
      "overview": "La viande hachée assaisonnée est façonnée en galettes, dorée puis cuite dans une sauce.",
      "history": "Les kjøttkaker en sauce brune font partie de la cuisine familiale norvégienne traditionnelle.",
      "flavor": "Saveur prononcée de viande, assaisonnement doux et sauce brune.",
      "technique": "Incorporer progressivement le lait froid à la farce et dorer les galettes avant de terminer leur cuisson à feu doux.",
      "essentials": [
        "500 g de viande hachée",
        "1 c. à café de sel",
        "2 c. à soupe de fécule de pomme de terre"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "500 g de viande hachée",
          "1 c. à café de sel",
          "2 c. à soupe de fécule de pomme de terre",
          "150 ml de lait",
          "poivre et noix de muscade",
          "beurre",
          "3 c. à soupe de farine de blé",
          "500 ml de bouillon"
        ],
        "steps": [
          "Mélanger la viande hachée avec le sel, la fécule et les épices ; incorporer progressivement le lait.",
          "Former des galettes et les faire dorer au beurre.",
          "Faire brunir la farine dans le beurre et incorporer progressivement le bouillon au fouet.",
          "Laisser mijoter les galettes dans la sauce jusqu’à cuisson complète."
        ]
      },
      "variants": [
        "On les sert notamment avec du chou à la crème ou une purée de petits pois."
      ],
      "serving": [
        "Servir avec des pommes de terre et des airelles rouges."
      ],
      "commonMistakes": [
        "Ne pas ajouter tout le lait en une seule fois."
      ]
    },
    "pt": {
      "overview": "A carne picada temperada é moldada em bolinhos achatados, dourada e acabada de cozinhar no molho.",
      "history": "Os kjøttkaker em molho castanho fazem parte da cozinha caseira norueguesa tradicional.",
      "flavor": "Sabor intenso a carne com tempero suave e molho escuro.",
      "technique": "Incorpore gradualmente leite frio na mistura de carne e doure os bolinhos antes de acabar a cozedura em lume brando.",
      "essentials": [
        "500 g de carne picada",
        "1 c. de chá de sal",
        "2 c. de sopa de fécula de batata"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "500 g de carne picada",
          "1 c. de chá de sal",
          "2 c. de sopa de fécula de batata",
          "150 ml de leite",
          "pimenta e noz-moscada",
          "manteiga",
          "3 c. de sopa de farinha de trigo",
          "500 ml de caldo"
        ],
        "steps": [
          "Misture a carne picada com sal, fécula de batata e especiarias; incorpore gradualmente o leite.",
          "Forme bolinhos achatados e doure-os em manteiga.",
          "Doure a farinha na manteiga e incorpore gradualmente o caldo, batendo.",
          "Deixe os bolinhos cozinhar em lume brando no molho até estarem bem cozinhados."
        ]
      },
      "variants": [
        "São servidos, entre outros acompanhamentos, com couve em molho cremoso ou puré de ervilhas."
      ],
      "serving": [
        "Sirva com batatas e arandos-vermelhos."
      ],
      "commonMistakes": [
        "Não junte todo o leite de uma vez."
      ]
    },
    "es": {
      "overview": "La carne picada condimentada se moldea en tortitas planas, se dora y se termina de cocinar en salsa.",
      "history": "Los kjøttkaker en salsa marrón forman parte de la cocina casera tradicional noruega.",
      "flavor": "Sabor intenso a carne con condimentos suaves y salsa dorada.",
      "technique": "Incorpora gradualmente leche fría a la mezcla de carne y dora las tortitas antes de terminar de cocerlas a fuego lento.",
      "essentials": [
        "500 g de carne picada",
        "1 cucharadita de sal",
        "2 cucharadas de fécula de patata"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "500 g de carne picada",
          "1 cucharadita de sal",
          "2 cucharadas de fécula de patata",
          "150 ml de leche",
          "pimienta y nuez moscada",
          "mantequilla",
          "3 cucharadas de harina de trigo",
          "500 ml de caldo"
        ],
        "steps": [
          "Mezcla la carne picada con sal, fécula de patata y especias; incorpora la leche poco a poco.",
          "Forma tortitas y dóralas en mantequilla.",
          "Dora la harina en mantequilla e incorpora poco a poco el caldo con unas varillas.",
          "Cuece las tortitas a fuego lento en la salsa hasta que estén hechas por dentro."
        ]
      },
      "variants": [
        "Se sirven, entre otros acompañamientos, con col en salsa cremosa o puré de guisantes."
      ],
      "serving": [
        "Sirve con patatas y arándanos rojos de montaña."
      ],
      "commonMistakes": [
        "No añadas toda la leche de golpe."
      ]
    },
    "de": {
      "overview": "Gewürztes Hackfleisch wird zu flachen Frikadellen geformt, angebraten und in Sauce fertig gegart.",
      "history": "Kjøttkaker in brauner Sauce sind ein fester Bestandteil der norwegischen Hausmannskost.",
      "flavor": "Kräftiger Fleischgeschmack mit milder Würzung und brauner Sauce.",
      "technique": "Kalte Milch nach und nach in die Hackmasse einarbeiten und die Frikadellen anbraten, bevor sie fertig gegart werden.",
      "essentials": [
        "500 g Hackfleisch",
        "1 TL Salz",
        "2 EL Kartoffelstärke"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "500 g Hackfleisch",
          "1 TL Salz",
          "2 EL Kartoffelstärke",
          "150 ml Milch",
          "Pfeffer und Muskat",
          "Butter",
          "3 EL Weizenmehl",
          "500 ml Brühe"
        ],
        "steps": [
          "Hackfleisch mit Salz, Kartoffelstärke und Gewürzen mischen; Milch nach und nach einarbeiten.",
          "Frikadellen formen und in Butter anbraten.",
          "Mehl in Butter bräunen und nach und nach Brühe mit dem Schneebesen einrühren.",
          "Frikadellen in der Sauce ziehen lassen, bis sie vollständig durchgegart sind."
        ]
      },
      "variants": [
        "Sie werden unter anderem mit Rahmkohl oder Erbsenpüree serviert."
      ],
      "serving": [
        "Mit Kartoffeln und Preiselbeeren servieren."
      ],
      "commonMistakes": [
        "Nicht die gesamte Milch auf einmal hinzufügen."
      ]
    }
  },
  "kottbullar": {
    "en": {
      "overview": "A minced meat mixture with onion and soaked breadcrumbs is rolled into small balls.",
      "history": "Köttbullar belong to Swedish home cooking and are also common on the Christmas buffet.",
      "flavor": "Juicy, mildly spiced and rich.",
      "technique": "Shape small, evenly sized balls and fry in batches.",
      "essentials": [
        "500 g minced meat",
        "1 small onion",
        "50 g breadcrumbs"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "500 g minced meat",
          "1 small onion",
          "50 g breadcrumbs",
          "100 ml milk",
          "1 egg",
          "salt and pepper",
          "butter",
          "200 ml cream",
          "200 ml stock"
        ],
        "steps": [
          "Soak the breadcrumbs in the milk.",
          "Mix with meat, finely chopped onion, egg and spices.",
          "Shape small balls and fry until cooked through.",
          "Deglaze the pan with stock and cream to make a sauce."
        ]
      },
      "variants": [
        "A mixture of minced beef and pork is common."
      ],
      "serving": [
        "Serve with mashed potatoes, lingonberries and optionally cucumber."
      ],
      "commonMistakes": [
        "Do not overcrowd the pan."
      ]
    },
    "fr": {
      "overview": "Une farce de viande hachée, d’oignon et de chapelure trempée est roulée en petites boulettes.",
      "history": "Les köttbullar font partie de la cuisine familiale suédoise et sont aussi courants sur le buffet de Noël.",
      "flavor": "Juteux, légèrement épicés et généreux.",
      "technique": "Former de petites boulettes régulières et les faire revenir par fournées.",
      "essentials": [
        "500 g de viande hachée",
        "1 petit oignon",
        "50 g de chapelure"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "500 g de viande hachée",
          "1 petit oignon",
          "50 g de chapelure",
          "100 ml de lait",
          "1 œuf",
          "sel et poivre",
          "beurre",
          "200 ml de crème",
          "200 ml de bouillon"
        ],
        "steps": [
          "Faire tremper la chapelure dans le lait.",
          "Mélanger avec la viande, l’oignon finement haché, l’œuf et les épices.",
          "Former de petites boulettes et les faire cuire à cœur.",
          "Déglacer la poêle avec le bouillon et la crème pour former une sauce."
        ]
      },
      "variants": [
        "Un mélange de bœuf et de porc hachés est courant."
      ],
      "serving": [
        "Servir avec de la purée de pommes de terre, des airelles rouges et éventuellement du concombre."
      ],
      "commonMistakes": [
        "Ne pas surcharger la poêle."
      ]
    },
    "pt": {
      "overview": "Uma mistura de carne picada, cebola e pão ralado demolhado é moldada em pequenas almôndegas.",
      "history": "As köttbullar fazem parte da cozinha caseira sueca e são também comuns no bufete de Natal.",
      "flavor": "Suculentas, suavemente condimentadas e encorpadas.",
      "technique": "Forme pequenas almôndegas uniformes e frite em porções.",
      "essentials": [
        "500 g de carne picada",
        "1 cebola pequena",
        "50 g de pão ralado"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "500 g de carne picada",
          "1 cebola pequena",
          "50 g de pão ralado",
          "100 ml de leite",
          "1 ovo",
          "sal e pimenta",
          "manteiga",
          "200 ml de natas",
          "200 ml de caldo"
        ],
        "steps": [
          "Deixe o pão ralado absorver o leite.",
          "Misture com carne, cebola finamente picada, ovo e especiarias.",
          "Forme pequenas almôndegas e frite até estarem bem cozinhadas.",
          "Deglace a frigideira com caldo e natas para fazer um molho."
        ]
      },
      "variants": [
        "É comum usar uma mistura de carne picada de vaca e porco."
      ],
      "serving": [
        "Sirva com puré de batata, arandos-vermelhos e, se desejar, pepino."
      ],
      "commonMistakes": [
        "Não encha demasiado a frigideira."
      ]
    },
    "es": {
      "overview": "Una mezcla de carne picada, cebolla y pan rallado remojado se moldea en pequeñas albóndigas.",
      "history": "Las köttbullar forman parte de la cocina casera sueca y también son habituales en el bufé navideño.",
      "flavor": "Jugosas, suavemente especiadas y sabrosas.",
      "technique": "Forma albóndigas pequeñas y uniformes y fríelas en tandas.",
      "essentials": [
        "500 g de carne picada",
        "1 cebolla pequeña",
        "50 g de pan rallado"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "500 g de carne picada",
          "1 cebolla pequeña",
          "50 g de pan rallado",
          "100 ml de leche",
          "1 huevo",
          "sal y pimienta",
          "mantequilla",
          "200 ml de nata",
          "200 ml de caldo"
        ],
        "steps": [
          "Deja que el pan rallado absorba la leche.",
          "Mezcla con carne, cebolla finamente picada, huevo y especias.",
          "Forma albóndigas pequeñas y fríelas hasta que estén hechas por dentro.",
          "Desglasa la sartén con caldo y nata para preparar una salsa."
        ]
      },
      "variants": [
        "Es habitual usar una mezcla de carne picada de vacuno y cerdo."
      ],
      "serving": [
        "Sirve con puré de patatas, arándanos rojos de montaña y, si quieres, pepino."
      ],
      "commonMistakes": [
        "No llenes demasiado la sartén."
      ]
    },
    "de": {
      "overview": "Eine Hackfleischmasse mit Zwiebeln und eingeweichten Semmelbröseln wird zu kleinen Bällchen gerollt.",
      "history": "Köttbullar gehören zur schwedischen Hausmannskost und sind auch auf dem Weihnachtsbuffet verbreitet.",
      "flavor": "Saftig, mild gewürzt und kräftig.",
      "technique": "Kleine gleichmäßige Bällchen formen und portionsweise braten.",
      "essentials": [
        "500 g Hackfleisch",
        "1 kleine Zwiebel",
        "50 g Semmelbrösel"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "500 g Hackfleisch",
          "1 kleine Zwiebel",
          "50 g Semmelbrösel",
          "100 ml Milch",
          "1 Ei",
          "Salz und Pfeffer",
          "Butter",
          "200 ml Sahne",
          "200 ml Brühe"
        ],
        "steps": [
          "Semmelbrösel in Milch einweichen.",
          "Mit Fleisch, fein gehackter Zwiebel, Ei und Gewürzen mischen.",
          "Kleine Bällchen formen und vollständig durchbraten.",
          "Bratensatz mit Brühe und Sahne ablöschen und eine Sauce zubereiten."
        ]
      },
      "variants": [
        "Gemischtes Hackfleisch aus Rind und Schwein ist üblich."
      ],
      "serving": [
        "Mit Kartoffelpüree, Preiselbeeren und nach Wunsch Gurke servieren."
      ],
      "commonMistakes": [
        "Pfanne nicht überfüllen."
      ]
    }
  },
  "smorrebrod": {
    "en": {
      "overview": "The bread is topped with carefully chosen combinations of fish, meat, eggs or vegetables.",
      "history": "Smørrebrød is central to Danish lunch and restaurant culture.",
      "flavor": "Contrasts between robust rye bread, creamy toppings and fresh or tangy accompaniments.",
      "technique": "Choose complementary toppings and assemble just before serving.",
      "essentials": [
        "4 slices of rye bread",
        "butter",
        "2 boiled eggs"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 20 min",
        "ingredients": [
          "4 slices of rye bread",
          "butter",
          "2 boiled eggs",
          "150 g cooked prawns",
          "mayonnaise",
          "lemon",
          "dill"
        ],
        "steps": [
          "Butter the rye bread.",
          "Slice the eggs and place on the bread.",
          "Distribute the prawns and a little mayonnaise.",
          "Garnish with dill and lemon."
        ]
      },
      "variants": [
        "Herring, roast beef with remoulade and liver pâté are other common versions."
      ],
      "serving": [
        "Serve for lunch with a knife and fork."
      ],
      "commonMistakes": [
        "Avoid leaving moist toppings on the bread for a long time."
      ]
    },
    "fr": {
      "overview": "Le pain est garni d’associations soignées de poisson, de viande, d’œufs ou de légumes.",
      "history": "Le smørrebrød occupe une place centrale dans la culture danoise du déjeuner et de la restauration.",
      "flavor": "Contrastes entre le pain de seigle au goût prononcé, les garnitures crémeuses et les accompagnements frais ou acidulés.",
      "technique": "Choisir des garnitures harmonieuses et les assembler juste avant de servir.",
      "essentials": [
        "4 tranches de pain de seigle",
        "beurre",
        "2 œufs durs"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 20 min",
        "ingredients": [
          "4 tranches de pain de seigle",
          "beurre",
          "2 œufs durs",
          "150 g de crevettes cuites",
          "mayonnaise",
          "citron",
          "aneth"
        ],
        "steps": [
          "Beurrer le pain de seigle.",
          "Couper les œufs en rondelles et les disposer sur le pain.",
          "Répartir les crevettes et un peu de mayonnaise.",
          "Garnir d’aneth et de citron."
        ]
      },
      "variants": [
        "Le hareng, le rosbif à la rémoulade et le pâté de foie sont d’autres variantes courantes."
      ],
      "serving": [
        "Servir au déjeuner avec un couteau et une fourchette."
      ],
      "commonMistakes": [
        "Éviter de laisser longtemps les garnitures humides sur le pain."
      ]
    },
    "pt": {
      "overview": "O pão é coberto com combinações bem escolhidas de peixe, carne, ovos ou legumes.",
      "history": "O smørrebrød ocupa um lugar central na cultura dinamarquesa do almoço e dos restaurantes.",
      "flavor": "Contrastes entre pão de centeio de sabor intenso, coberturas cremosas e acompanhamentos frescos ou ácidos.",
      "technique": "Escolha coberturas que combinem e monte imediatamente antes de servir.",
      "essentials": [
        "4 fatias de pão de centeio",
        "manteiga",
        "2 ovos cozidos"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 20 min",
        "ingredients": [
          "4 fatias de pão de centeio",
          "manteiga",
          "2 ovos cozidos",
          "150 g de camarão cozido",
          "maionese",
          "limão",
          "endro"
        ],
        "steps": [
          "Barre o pão de centeio com manteiga.",
          "Corte os ovos em rodelas e coloque sobre o pão.",
          "Distribua o camarão e um pouco de maionese.",
          "Decore com endro e limão."
        ]
      },
      "variants": [
        "Arenque, rosbife com remoulade e patê de fígado são outras variantes comuns."
      ],
      "serving": [
        "Sirva ao almoço com faca e garfo."
      ],
      "commonMistakes": [
        "Evite deixar coberturas húmidas muito tempo sobre o pão."
      ]
    },
    "es": {
      "overview": "El pan se cubre con combinaciones cuidadosamente elegidas de pescado, carne, huevo o verduras.",
      "history": "El smørrebrød ocupa un lugar central en la cultura danesa del almuerzo y los restaurantes.",
      "flavor": "Contrastes entre pan de centeno intenso, coberturas cremosas y acompañamientos frescos o ácidos.",
      "technique": "Elige ingredientes que combinen y monta justo antes de servir.",
      "essentials": [
        "4 rebanadas de pan de centeno",
        "mantequilla",
        "2 huevos cocidos"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 20 min",
        "ingredients": [
          "4 rebanadas de pan de centeno",
          "mantequilla",
          "2 huevos cocidos",
          "150 g de gambas cocidas",
          "mayonesa",
          "limón",
          "eneldo"
        ],
        "steps": [
          "Unta el pan de centeno con mantequilla.",
          "Corta los huevos en rodajas y colócalos sobre el pan.",
          "Reparte las gambas y un poco de mayonesa.",
          "Decora con eneldo y limón."
        ]
      },
      "variants": [
        "El arenque, el rosbif con remoulade y el paté de hígado son otras variantes habituales."
      ],
      "serving": [
        "Sirve para el almuerzo con cuchillo y tenedor."
      ],
      "commonMistakes": [
        "Evita dejar ingredientes húmedos mucho tiempo sobre el pan."
      ]
    },
    "de": {
      "overview": "Das Brot wird mit abgestimmten Kombinationen aus Fisch, Fleisch, Eiern oder Gemüse belegt.",
      "history": "Smørrebrød ist ein zentraler Bestandteil der dänischen Mittags- und Restaurantkultur.",
      "flavor": "Kontraste zwischen kräftigem Roggenbrot, cremigem Belag und frischen oder säuerlichen Beilagen.",
      "technique": "Passende Beläge auswählen und erst kurz vor dem Servieren anrichten.",
      "essentials": [
        "4 Scheiben Roggenbrot",
        "Butter",
        "2 gekochte Eier"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 20 Min.",
        "ingredients": [
          "4 Scheiben Roggenbrot",
          "Butter",
          "2 gekochte Eier",
          "150 g gegarte Garnelen",
          "Mayonnaise",
          "Zitrone",
          "Dill"
        ],
        "steps": [
          "Roggenbrot mit Butter bestreichen.",
          "Eier in Scheiben schneiden und auf das Brot legen.",
          "Garnelen und etwas Mayonnaise verteilen.",
          "Mit Dill und Zitrone garnieren."
        ]
      },
      "variants": [
        "Hering, Roastbeef mit Remoulade und Leberpastete sind weitere verbreitete Varianten."
      ],
      "serving": [
        "Als Mittagessen mit Messer und Gabel servieren."
      ],
      "commonMistakes": [
        "Feuchte Beläge nicht lange auf dem Brot liegen lassen."
      ]
    }
  },
  "lohikeitto": {
    "en": {
      "overview": "Potatoes and vegetables are cooked in stock before salmon is added towards the end.",
      "history": "Lohikeitto is a Finnish fish soup with both creamy and clear regional versions.",
      "flavor": "Mild, rich and fresh with dill.",
      "technique": "Poach the salmon gently, without prolonged boiling.",
      "essentials": [
        "500 g boneless salmon fillet",
        "500 g potatoes",
        "1 leek"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 35 min",
        "ingredients": [
          "500 g boneless salmon fillet",
          "500 g potatoes",
          "1 leek",
          "2 carrots",
          "800 ml fish stock",
          "200 ml cream",
          "dill",
          "butter"
        ],
        "steps": [
          "Fry the leek in butter.",
          "Add stock, potatoes and carrots and cook until tender.",
          "Add cream and diced salmon; simmer gently until the fish is cooked through.",
          "Season and add dill."
        ]
      },
      "variants": [
        "In Kainuu there is a version without cream."
      ],
      "serving": [
        "Serve with rye bread."
      ],
      "commonMistakes": [
        "Do not cook the salmon so long that it becomes dry."
      ]
    },
    "fr": {
      "overview": "Les pommes de terre et les légumes cuisent dans le bouillon avant d’ajouter le saumon en fin de cuisson.",
      "history": "Le lohikeitto est une soupe de poisson finlandaise aux variantes régionales crémeuses ou claires.",
      "flavor": "Douce, généreuse et fraîche grâce à l’aneth.",
      "technique": "Pocher délicatement le saumon, sans ébullition prolongée.",
      "essentials": [
        "500 g de filet de saumon sans arêtes",
        "500 g de pommes de terre",
        "1 poireau"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 35 min",
        "ingredients": [
          "500 g de filet de saumon sans arêtes",
          "500 g de pommes de terre",
          "1 poireau",
          "2 carottes",
          "800 ml de fumet de poisson",
          "200 ml de crème",
          "aneth",
          "beurre"
        ],
        "steps": [
          "Faire revenir le poireau dans le beurre.",
          "Ajouter le bouillon, les pommes de terre et les carottes, puis cuire jusqu’à tendreté.",
          "Ajouter la crème et le saumon en dés ; laisser pocher jusqu’à cuisson complète du poisson.",
          "Rectifier l’assaisonnement et ajouter l’aneth."
        ]
      },
      "variants": [
        "Dans le Kainuu, il existe une variante sans crème."
      ],
      "serving": [
        "Servir avec du pain de seigle."
      ],
      "commonMistakes": [
        "Ne pas cuire le saumon si longtemps qu’il se dessèche."
      ]
    },
    "pt": {
      "overview": "As batatas e os legumes são cozidos em caldo antes de juntar o salmão perto do fim.",
      "history": "O lohikeitto é uma sopa de peixe finlandesa com variantes regionais cremosas e de caldo claro.",
      "flavor": "Suave, encorpada e fresca com endro.",
      "technique": "Coza o salmão suavemente, sem fervura prolongada.",
      "essentials": [
        "500 g de filete de salmão sem espinhas",
        "500 g de batatas",
        "1 alho-francês"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 35 min",
        "ingredients": [
          "500 g de filete de salmão sem espinhas",
          "500 g de batatas",
          "1 alho-francês",
          "2 cenouras",
          "800 ml de caldo de peixe",
          "200 ml de natas",
          "endro",
          "manteiga"
        ],
        "steps": [
          "Salteie o alho-francês em manteiga.",
          "Junte o caldo, as batatas e as cenouras e coza até ficarem tenras.",
          "Junte as natas e o salmão em cubos; cozinhe suavemente até o peixe estar bem cozinhado.",
          "Retifique os temperos e junte o endro."
        ]
      },
      "variants": [
        "Em Kainuu existe uma variante sem natas."
      ],
      "serving": [
        "Sirva com pão de centeio."
      ],
      "commonMistakes": [
        "Não coza o salmão durante tanto tempo que fique seco."
      ]
    },
    "es": {
      "overview": "Las patatas y las verduras se cuecen en caldo antes de añadir el salmón hacia el final.",
      "history": "El lohikeitto es una sopa de pescado finlandesa con variantes regionales cremosas y de caldo claro.",
      "flavor": "Suave, con cuerpo y fresca por el eneldo.",
      "technique": "Cuece el salmón suavemente, sin hervirlo durante mucho tiempo.",
      "essentials": [
        "500 g de filete de salmón sin espinas",
        "500 g de patatas",
        "1 puerro"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 35 min",
        "ingredients": [
          "500 g de filete de salmón sin espinas",
          "500 g de patatas",
          "1 puerro",
          "2 zanahorias",
          "800 ml de caldo de pescado",
          "200 ml de nata",
          "eneldo",
          "mantequilla"
        ],
        "steps": [
          "Sofríe el puerro en mantequilla.",
          "Añade caldo, patatas y zanahorias y cuece hasta que estén tiernas.",
          "Añade nata y salmón en dados; cuece suavemente hasta que el pescado esté hecho por dentro.",
          "Ajusta la sazón y añade eneldo."
        ]
      },
      "variants": [
        "En Kainuu existe una variante sin nata."
      ],
      "serving": [
        "Sirve con pan de centeno."
      ],
      "commonMistakes": [
        "No cuezas el salmón tanto tiempo que se reseque."
      ]
    },
    "de": {
      "overview": "Kartoffeln und Gemüse werden in Brühe gekocht, bevor gegen Ende der Lachs hinzukommt.",
      "history": "Lohikeitto ist eine finnische Fischsuppe mit cremigen und klaren regionalen Varianten.",
      "flavor": "Mild, vollmundig und frisch durch Dill.",
      "technique": "Lachs sanft gar ziehen lassen, ohne ihn lange zu kochen.",
      "essentials": [
        "500 g Lachsfilet ohne Gräten",
        "500 g Kartoffeln",
        "1 Stange Lauch"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 35 Min.",
        "ingredients": [
          "500 g Lachsfilet ohne Gräten",
          "500 g Kartoffeln",
          "1 Stange Lauch",
          "2 Karotten",
          "800 ml Fischfond",
          "200 ml Sahne",
          "Dill",
          "Butter"
        ],
        "steps": [
          "Lauch in Butter anschwitzen.",
          "Brühe, Kartoffeln und Karotten hinzufügen und weich kochen.",
          "Sahne und Lachswürfel hinzufügen und sanft ziehen lassen, bis der Fisch vollständig gar ist.",
          "Abschmecken und Dill hinzufügen."
        ]
      },
      "variants": [
        "In Kainuu gibt es eine Variante ohne Sahne."
      ],
      "serving": [
        "Mit Roggenbrot servieren."
      ],
      "commonMistakes": [
        "Lachs nicht so lange garen, dass er trocken wird."
      ]
    }
  },
  "plokkfiskur": {
    "en": {
      "overview": "Flaked fish and potatoes are folded into a creamy sauce with onion.",
      "history": "Plokkfiskur is traditional Icelandic everyday food and is also suitable for using leftover fish.",
      "flavor": "Mild, creamy and filling.",
      "technique": "Fold the fish gently into the sauce to retain some of its flaky texture.",
      "essentials": [
        "500 g cod or haddock",
        "500 g potatoes",
        "1 onion"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40 min",
        "ingredients": [
          "500 g cod or haddock",
          "500 g potatoes",
          "1 onion",
          "40 g butter",
          "40 g flour",
          "400 ml milk",
          "salt and pepper"
        ],
        "steps": [
          "Boil the potatoes until tender and poach the fish until cooked through.",
          "Fry the onion in butter and stir in the flour.",
          "Gradually add the milk and let the sauce simmer.",
          "Fold in potato pieces and flaked fish, heat through and season."
        ]
      },
      "variants": [
        "Some versions are gratinated with cheese."
      ],
      "serving": [
        "Serve with Icelandic rye bread or other dark bread."
      ],
      "commonMistakes": [
        "Do not stir so vigorously that the fish is completely mashed."
      ]
    },
    "fr": {
      "overview": "Le poisson effeuillé et les pommes de terre sont incorporés à une sauce crémeuse aux oignons.",
      "history": "Le plokkfiskur est un plat islandais traditionnel du quotidien qui permet aussi d’utiliser les restes de poisson.",
      "flavor": "Doux, crémeux et rassasiant.",
      "technique": "Incorporer délicatement le poisson à la sauce pour conserver une partie de sa texture en lamelles.",
      "essentials": [
        "500 g de cabillaud ou d’églefin",
        "500 g de pommes de terre",
        "1 oignon"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40 min",
        "ingredients": [
          "500 g de cabillaud ou d’églefin",
          "500 g de pommes de terre",
          "1 oignon",
          "40 g de beurre",
          "40 g de farine",
          "400 ml de lait",
          "sel et poivre"
        ],
        "steps": [
          "Cuire les pommes de terre jusqu’à tendreté et pocher le poisson jusqu’à cuisson complète.",
          "Faire revenir l’oignon dans le beurre et incorporer la farine.",
          "Incorporer progressivement le lait et laisser mijoter la sauce.",
          "Incorporer les morceaux de pommes de terre et le poisson effeuillé, bien réchauffer et assaisonner."
        ]
      },
      "variants": [
        "Certaines variantes sont gratinées au fromage."
      ],
      "serving": [
        "Servir avec du pain de seigle islandais ou un autre pain noir."
      ],
      "commonMistakes": [
        "Ne pas remuer si vigoureusement que le poisson se transforme en purée."
      ]
    },
    "pt": {
      "overview": "O peixe em lascas e as batatas são envolvidos num molho cremoso com cebola.",
      "history": "O plokkfiskur é um prato tradicional islandês do quotidiano que também permite aproveitar sobras de peixe.",
      "flavor": "Suave, cremoso e saciante.",
      "technique": "Envolva cuidadosamente o peixe no molho para manter parte da textura em lascas.",
      "essentials": [
        "500 g de bacalhau fresco ou arinca",
        "500 g de batatas",
        "1 cebola"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40 min",
        "ingredients": [
          "500 g de bacalhau fresco ou arinca",
          "500 g de batatas",
          "1 cebola",
          "40 g de manteiga",
          "40 g de farinha",
          "400 ml de leite",
          "sal e pimenta"
        ],
        "steps": [
          "Coza as batatas até ficarem tenras e o peixe suavemente até estar bem cozinhado.",
          "Salteie a cebola em manteiga e incorpore a farinha.",
          "Incorpore gradualmente o leite e deixe o molho cozinhar em lume brando.",
          "Envolva os pedaços de batata e o peixe em lascas, aqueça bem e tempere."
        ]
      },
      "variants": [
        "Algumas variantes são gratinadas com queijo."
      ],
      "serving": [
        "Sirva com pão de centeio islandês ou outro pão escuro."
      ],
      "commonMistakes": [
        "Não mexa com tanta força que o peixe fique completamente desfeito."
      ]
    },
    "es": {
      "overview": "El pescado en lascas y las patatas se incorporan a una salsa cremosa con cebolla.",
      "history": "El plokkfiskur es un plato tradicional islandés de diario que también permite aprovechar sobras de pescado.",
      "flavor": "Suave, cremoso y saciante.",
      "technique": "Incorpora suavemente el pescado a la salsa para conservar parte de su textura en lascas.",
      "essentials": [
        "500 g de bacalao fresco o eglefino",
        "500 g de patatas",
        "1 cebolla"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40 min",
        "ingredients": [
          "500 g de bacalao fresco o eglefino",
          "500 g de patatas",
          "1 cebolla",
          "40 g de mantequilla",
          "40 g de harina",
          "400 ml de leche",
          "sal y pimienta"
        ],
        "steps": [
          "Cuece las patatas hasta que estén tiernas y el pescado suavemente hasta que esté hecho por dentro.",
          "Sofríe la cebolla en mantequilla e incorpora la harina.",
          "Incorpora gradualmente la leche y deja cocer la salsa a fuego lento.",
          "Incorpora los trozos de patata y el pescado en lascas, calienta bien y sazona."
        ]
      },
      "variants": [
        "Algunas variantes se gratinan con queso."
      ],
      "serving": [
        "Sirve con pan de centeno islandés u otro pan oscuro."
      ],
      "commonMistakes": [
        "No remuevas con tanta fuerza que el pescado quede completamente triturado."
      ]
    },
    "de": {
      "overview": "Zerpflückter Fisch und Kartoffeln werden unter eine cremige Zwiebelsauce gehoben.",
      "history": "Plokkfiskur ist ein traditionelles isländisches Alltagsgericht, das sich auch zur Verwertung von Fischresten eignet.",
      "flavor": "Mild, cremig und sättigend.",
      "technique": "Fisch vorsichtig unter die Sauce heben, damit ein Teil seiner blättrigen Struktur erhalten bleibt.",
      "essentials": [
        "500 g Kabeljau oder Schellfisch",
        "500 g Kartoffeln",
        "1 Zwiebel"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40 Min.",
        "ingredients": [
          "500 g Kabeljau oder Schellfisch",
          "500 g Kartoffeln",
          "1 Zwiebel",
          "40 g Butter",
          "40 g Mehl",
          "400 ml Milch",
          "Salz und Pfeffer"
        ],
        "steps": [
          "Kartoffeln weich kochen und Fisch vollständig gar ziehen lassen.",
          "Zwiebel in Butter anschwitzen und Mehl einrühren.",
          "Milch nach und nach einrühren und die Sauce köcheln lassen.",
          "Kartoffelstücke und zerpflückten Fisch unterheben, durchwärmen und abschmecken."
        ]
      },
      "variants": [
        "Einige Varianten werden mit Käse überbacken."
      ],
      "serving": [
        "Mit isländischem Roggenbrot oder anderem dunklem Brot servieren."
      ],
      "commonMistakes": [
        "Nicht so kräftig rühren, dass der Fisch völlig zerfällt."
      ]
    }
  },
  "boeuf-bourguignon": {
    "en": {
      "overview": "Stewing beef is slowly braised in an aromatic sauce.",
      "history": "The dish is associated with Burgundy’s cuisine and wine tradition.",
      "flavor": "Deep, rich and aromatic.",
      "technique": "Brown the meat in batches and simmer until tender.",
      "essentials": [
        "800 g stewing beef",
        "100 g bacon",
        "2 carrots"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 3 hours",
        "ingredients": [
          "800 g stewing beef",
          "100 g bacon",
          "2 carrots",
          "1 onion",
          "400 ml red wine",
          "250 ml stock",
          "200 g mushrooms",
          "thyme",
          "flour",
          "butter"
        ],
        "steps": [
          "Brown the beef and bacon.",
          "Fry the onion and carrots, sprinkle with a little flour and add wine, stock and thyme.",
          "Simmer covered until the meat is tender, about two to three hours.",
          "Fry the mushrooms separately and fold them in before serving."
        ]
      },
      "variants": [
        "Some versions use pearl onions and overnight marinating in wine."
      ],
      "serving": [
        "Serve with mashed potatoes or bread."
      ],
      "commonMistakes": [
        "Avoid vigorous boiling."
      ]
    },
    "fr": {
      "overview": "La viande de bœuf à mijoter est braisée lentement dans une sauce aromatique.",
      "history": "Le plat est associé à la cuisine et à la tradition viticole de Bourgogne.",
      "flavor": "Profond, généreux et aromatique.",
      "technique": "Faire dorer la viande par petites quantités et laisser mijoter jusqu’à tendreté.",
      "essentials": [
        "800 g de bœuf à mijoter",
        "100 g de lardons",
        "2 carottes"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 3 heures",
        "ingredients": [
          "800 g de bœuf à mijoter",
          "100 g de lardons",
          "2 carottes",
          "1 oignon",
          "400 ml de vin rouge",
          "250 ml de bouillon",
          "200 g de champignons",
          "thym",
          "farine",
          "beurre"
        ],
        "steps": [
          "Faire dorer le bœuf et les lardons.",
          "Faire revenir l’oignon et les carottes, saupoudrer d’un peu de farine et ajouter le vin, le bouillon et le thym.",
          "Laisser mijoter à couvert jusqu’à tendreté de la viande, environ deux à trois heures.",
          "Faire revenir les champignons séparément et les incorporer avant de servir."
        ]
      },
      "variants": [
        "Certaines variantes utilisent des petits oignons grelots et une marinade au vin toute la nuit."
      ],
      "serving": [
        "Servir avec de la purée de pommes de terre ou du pain."
      ],
      "commonMistakes": [
        "Éviter une forte ébullition."
      ]
    },
    "pt": {
      "overview": "A carne de vaca para estufar é cozinhada lentamente num molho aromático.",
      "history": "O prato está associado à cozinha e à tradição vinícola da Borgonha.",
      "flavor": "Intenso, encorpado e aromático.",
      "technique": "Doure a carne em porções e deixe cozinhar em lume brando até ficar tenra.",
      "essentials": [
        "800 g de carne de vaca para estufar",
        "100 g de bacon",
        "2 cenouras"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 3 horas",
        "ingredients": [
          "800 g de carne de vaca para estufar",
          "100 g de bacon",
          "2 cenouras",
          "1 cebola",
          "400 ml de vinho tinto",
          "250 ml de caldo",
          "200 g de cogumelos",
          "tomilho",
          "farinha",
          "manteiga"
        ],
        "steps": [
          "Doure a carne e o bacon.",
          "Salteie a cebola e as cenouras, polvilhe com um pouco de farinha e junte vinho, caldo e tomilho.",
          "Deixe cozinhar em lume brando com tampa até a carne ficar tenra, cerca de duas a três horas.",
          "Salteie os cogumelos separadamente e envolva-os antes de servir."
        ]
      },
      "variants": [
        "Algumas variantes usam cebolinhas e marinada em vinho durante a noite."
      ],
      "serving": [
        "Sirva com puré de batata ou pão."
      ],
      "commonMistakes": [
        "Evite uma fervura intensa."
      ]
    },
    "es": {
      "overview": "La carne de vacuno para guisar se brasea lentamente en una salsa aromática.",
      "history": "El plato se asocia con la cocina y la tradición vinícola de Borgoña.",
      "flavor": "Intenso, con cuerpo y aromático.",
      "technique": "Dora la carne en tandas y cuece a fuego lento hasta que esté tierna.",
      "essentials": [
        "800 g de carne de vacuno para guisar",
        "100 g de beicon",
        "2 zanahorias"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 3 horas",
        "ingredients": [
          "800 g de carne de vacuno para guisar",
          "100 g de beicon",
          "2 zanahorias",
          "1 cebolla",
          "400 ml de vino tinto",
          "250 ml de caldo",
          "200 g de setas",
          "tomillo",
          "harina",
          "mantequilla"
        ],
        "steps": [
          "Dora la carne y el beicon.",
          "Sofríe la cebolla y las zanahorias, espolvorea un poco de harina y añade vino, caldo y tomillo.",
          "Cuece a fuego lento con tapa hasta que la carne esté tierna, unas dos a tres horas.",
          "Saltea las setas por separado e incorpóralas antes de servir."
        ]
      },
      "variants": [
        "Algunas variantes usan cebollitas y marinado en vino durante la noche."
      ],
      "serving": [
        "Sirve con puré de patatas o pan."
      ],
      "commonMistakes": [
        "Evita la ebullición fuerte."
      ]
    },
    "de": {
      "overview": "Schmorfleisch vom Rind wird langsam in einer aromatischen Sauce geschmort.",
      "history": "Das Gericht ist mit der Küche und Weintradition des Burgunds verbunden.",
      "flavor": "Tiefgründig, kräftig und aromatisch.",
      "technique": "Fleisch portionsweise anbräunen und weich schmoren.",
      "essentials": [
        "800 g Rindfleisch zum Schmoren",
        "100 g Speck",
        "2 Karotten"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 3 Stunden",
        "ingredients": [
          "800 g Rindfleisch zum Schmoren",
          "100 g Speck",
          "2 Karotten",
          "1 Zwiebel",
          "400 ml Rotwein",
          "250 ml Brühe",
          "200 g Pilze",
          "Thymian",
          "Mehl",
          "Butter"
        ],
        "steps": [
          "Rindfleisch und Speck anbräunen.",
          "Zwiebel und Karotten anschwitzen, mit etwas Mehl bestäuben und Wein, Brühe und Thymian hinzufügen.",
          "Zugedeckt etwa zwei bis drei Stunden schmoren, bis das Fleisch weich ist.",
          "Pilze separat braten und vor dem Servieren unterheben."
        ]
      },
      "variants": [
        "Einige Varianten verwenden Perlzwiebeln und marinieren das Fleisch über Nacht in Wein."
      ],
      "serving": [
        "Mit Kartoffelpüree oder Brot servieren."
      ],
      "commonMistakes": [
        "Starkes Kochen vermeiden."
      ]
    }
  },
  "coq-au-vin": {
    "en": {
      "overview": "Chicken pieces are browned and simmered in wine sauce with aromatics.",
      "history": "Traditionally, older roosters requiring long cooking could be used; today chicken is often used.",
      "flavor": "Rich, herbal and wine-forward.",
      "technique": "Brown the chicken and let the sauce simmer gently.",
      "essentials": [
        "1 kg chicken thighs",
        "100 g bacon",
        "200 g mushrooms"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 90 min",
        "ingredients": [
          "1 kg chicken thighs",
          "100 g bacon",
          "200 g mushrooms",
          "150 g small onions",
          "400 ml red wine",
          "200 ml stock",
          "thyme",
          "garlic"
        ],
        "steps": [
          "Brown the bacon and chicken in a pot.",
          "Fry the onions and garlic.",
          "Add wine, stock and thyme and simmer the chicken until cooked through and tender.",
          "Fry the mushrooms and fold them in."
        ]
      },
      "variants": [
        "Coq au riesling is a white wine version."
      ],
      "serving": [
        "Serve with potatoes or bread."
      ],
      "commonMistakes": [
        "Do not boil the chicken so vigorously that the meat becomes dry."
      ]
    },
    "fr": {
      "overview": "Les morceaux de poulet sont dorés et mijotés dans une sauce au vin avec des aromates.",
      "history": "Traditionnellement, on pouvait utiliser des coqs âgés nécessitant une longue cuisson ; aujourd’hui, on utilise souvent du poulet.",
      "flavor": "Généreux, herbacé et marqué par le vin.",
      "technique": "Faire dorer le poulet et laisser mijoter doucement la sauce.",
      "essentials": [
        "1 kg de cuisses de poulet",
        "100 g de lardons",
        "200 g de champignons"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 90 min",
        "ingredients": [
          "1 kg de cuisses de poulet",
          "100 g de lardons",
          "200 g de champignons",
          "150 g de petits oignons",
          "400 ml de vin rouge",
          "200 ml de bouillon",
          "thym",
          "ail"
        ],
        "steps": [
          "Faire dorer les lardons et le poulet dans une cocotte.",
          "Faire revenir les oignons et l’ail.",
          "Ajouter le vin, le bouillon et le thym, puis laisser mijoter le poulet jusqu’à ce qu’il soit cuit à cœur et tendre.",
          "Faire revenir les champignons et les incorporer."
        ]
      },
      "variants": [
        "Le coq au riesling est une variante au vin blanc."
      ],
      "serving": [
        "Servir avec des pommes de terre ou du pain."
      ],
      "commonMistakes": [
        "Ne pas faire bouillir le poulet si fort que la viande se dessèche."
      ]
    },
    "pt": {
      "overview": "Os pedaços de frango são dourados e cozinhados em lume brando num molho de vinho com aromáticos.",
      "history": "Tradicionalmente podiam usar-se galos mais velhos que exigiam uma cozedura prolongada; hoje usa-se frequentemente frango.",
      "flavor": "Encorpado, com notas de ervas e vinho.",
      "technique": "Doure o frango e deixe o molho cozinhar suavemente em lume brando.",
      "essentials": [
        "1 kg de coxas de frango",
        "100 g de bacon",
        "200 g de cogumelos"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 90 min",
        "ingredients": [
          "1 kg de coxas de frango",
          "100 g de bacon",
          "200 g de cogumelos",
          "150 g de cebolas pequenas",
          "400 ml de vinho tinto",
          "200 ml de caldo",
          "tomilho",
          "alho"
        ],
        "steps": [
          "Doure o bacon e o frango num tacho.",
          "Salteie as cebolas e o alho.",
          "Junte vinho, caldo e tomilho e deixe o frango cozinhar em lume brando até estar bem cozinhado e tenro.",
          "Salteie os cogumelos e envolva-os."
        ]
      },
      "variants": [
        "O coq au riesling é uma variante com vinho branco."
      ],
      "serving": [
        "Sirva com batatas ou pão."
      ],
      "commonMistakes": [
        "Não deixe o frango ferver tão intensamente que a carne fique seca."
      ]
    },
    "es": {
      "overview": "Los trozos de pollo se doran y se cuecen a fuego lento en una salsa de vino con aromáticos.",
      "history": "Tradicionalmente se podían usar gallos viejos que requerían una cocción prolongada; hoy se suele usar pollo.",
      "flavor": "Con cuerpo, con notas de hierbas y vino.",
      "technique": "Dora el pollo y deja cocer la salsa suavemente a fuego lento.",
      "essentials": [
        "1 kg de contramuslos de pollo",
        "100 g de beicon",
        "200 g de setas"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 90 min",
        "ingredients": [
          "1 kg de contramuslos de pollo",
          "100 g de beicon",
          "200 g de setas",
          "150 g de cebollitas",
          "400 ml de vino tinto",
          "200 ml de caldo",
          "tomillo",
          "ajo"
        ],
        "steps": [
          "Dora el beicon y el pollo en una olla.",
          "Sofríe las cebollas y el ajo.",
          "Añade vino, caldo y tomillo y cuece el pollo a fuego lento hasta que esté hecho por dentro y tierno.",
          "Saltea las setas e incorpóralas."
        ]
      },
      "variants": [
        "El coq au riesling es una variante con vino blanco."
      ],
      "serving": [
        "Sirve con patatas o pan."
      ],
      "commonMistakes": [
        "No hiervas el pollo tan fuerte que la carne se reseque."
      ]
    },
    "de": {
      "overview": "Hähnchenstücke werden angebraten und mit Aromaten in Weinsauce geschmort.",
      "history": "Traditionell konnten ältere Hähne verwendet werden, die lange gegart werden mussten; heute wird oft Hähnchen verwendet.",
      "flavor": "Kräftig, kräuterbetont und weinig.",
      "technique": "Hähnchen anbräunen und Sauce sanft köcheln lassen.",
      "essentials": [
        "1 kg Hähnchenschenkel",
        "100 g Speck",
        "200 g Pilze"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 90 Min.",
        "ingredients": [
          "1 kg Hähnchenschenkel",
          "100 g Speck",
          "200 g Pilze",
          "150 g kleine Zwiebeln",
          "400 ml Rotwein",
          "200 ml Brühe",
          "Thymian",
          "Knoblauch"
        ],
        "steps": [
          "Speck und Hähnchen in einem Topf anbräunen.",
          "Zwiebeln und Knoblauch anschwitzen.",
          "Wein, Brühe und Thymian hinzufügen und Hähnchen sanft schmoren, bis es durchgegart und zart ist.",
          "Pilze anbraten und unterheben."
        ]
      },
      "variants": [
        "Coq au Riesling ist eine Weißweinvariante."
      ],
      "serving": [
        "Mit Kartoffeln oder Brot servieren."
      ],
      "commonMistakes": [
        "Hähnchen nicht so stark kochen, dass das Fleisch trocken wird."
      ]
    }
  }
} as const satisfies Readonly<Record<string, Record<InternationalSummaryLocale, ArticleBody>>>;
