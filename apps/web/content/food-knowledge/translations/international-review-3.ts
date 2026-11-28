import type { FoodKnowledgeArticle } from "../types.ts";
import type { InternationalSummaryLocale } from "../../../lib/international-summary-drafts.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
// Review-only bodies. Compose with translated summaries and untouched original IDs/sources after review.
export const draftInternationalArticles3 = {
  "ratatouille": {
    "en": {
      "overview": "The vegetables are fried and combined in an aromatic tomato base.",
      "history": "Ratatouille is associated with southern French cuisine, especially Nice and Provence.",
      "flavor": "Fruity, mild and fresh with herbs.",
      "technique": "Fry the vegetables in batches to preserve their texture.",
      "essentials": [
        "1 aubergine",
        "2 courgettes",
        "2 bell peppers"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 50 min",
        "ingredients": [
          "1 aubergine",
          "2 courgettes",
          "2 bell peppers",
          "400 g tomatoes",
          "1 onion",
          "3 garlic cloves",
          "olive oil",
          "basil"
        ],
        "steps": [
          "Cut the vegetables into pieces.",
          "Brown the aubergine, courgettes and peppers separately.",
          "Fry the onion and garlic and add the tomatoes.",
          "Combine the vegetables and simmer until tender; season with basil."
        ]
      },
      "variants": [
        "It can be served in rustic pieces or in oven-baked versions."
      ],
      "serving": [
        "Serve as a main course with bread or as a side dish."
      ],
      "commonMistakes": [
        "Do not cook all the vegetables to a mush."
      ]
    },
    "fr": {
      "overview": "Les légumes sont revenus puis réunis dans une base de tomates aromatique.",
      "history": "La ratatouille est associée à la cuisine du sud de la France, notamment de Nice et de Provence.",
      "flavor": "Fruité, doux et frais grâce aux herbes.",
      "technique": "Faire revenir les légumes par petites quantités pour préserver leur texture.",
      "essentials": [
        "1 aubergine",
        "2 courgettes",
        "2 poivrons"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 50 min",
        "ingredients": [
          "1 aubergine",
          "2 courgettes",
          "2 poivrons",
          "400 g de tomates",
          "1 oignon",
          "3 gousses d’ail",
          "huile d’olive",
          "basilic"
        ],
        "steps": [
          "Couper les légumes en morceaux.",
          "Faire dorer séparément l’aubergine, les courgettes et les poivrons.",
          "Faire revenir l’oignon et l’ail, puis ajouter les tomates.",
          "Réunir les légumes et laisser mijoter jusqu’à tendreté ; assaisonner avec le basilic."
        ]
      },
      "variants": [
        "On peut la servir en morceaux rustiques ou dans des variantes cuites au four."
      ],
      "serving": [
        "Servir en plat principal avec du pain ou en accompagnement."
      ],
      "commonMistakes": [
        "Ne pas cuire tous les légumes jusqu’à ce qu’ils se défassent."
      ]
    },
    "pt": {
      "overview": "Os legumes são salteados e misturados numa base aromática de tomate.",
      "history": "A ratatouille está associada à cozinha do sul de França, em especial de Nice e da Provença.",
      "flavor": "Frutado, suave e fresco com ervas.",
      "technique": "Salteie os legumes em porções para preservar a textura.",
      "essentials": [
        "1 beringela",
        "2 curgetes",
        "2 pimentos"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 50 min",
        "ingredients": [
          "1 beringela",
          "2 curgetes",
          "2 pimentos",
          "400 g de tomate",
          "1 cebola",
          "3 dentes de alho",
          "azeite",
          "manjericão"
        ],
        "steps": [
          "Corte os legumes em pedaços.",
          "Doure separadamente a beringela, as curgetes e os pimentos.",
          "Salteie a cebola e o alho e junte o tomate.",
          "Junte os legumes e deixe cozinhar em lume brando até ficarem tenros; tempere com manjericão."
        ]
      },
      "variants": [
        "Pode ser servida em pedaços rústicos ou em versões assadas no forno."
      ],
      "serving": [
        "Sirva como prato principal com pão ou como acompanhamento."
      ],
      "commonMistakes": [
        "Não deixe todos os legumes desfazerem-se."
      ]
    },
    "es": {
      "overview": "Las verduras se saltean y se combinan en una base aromática de tomate.",
      "history": "El ratatouille se asocia con la cocina del sur de Francia, especialmente de Niza y Provenza.",
      "flavor": "Afrutado, suave y fresco por las hierbas.",
      "technique": "Saltea las verduras en tandas para conservar su textura.",
      "essentials": [
        "1 berenjena",
        "2 calabacines",
        "2 pimientos"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 50 min",
        "ingredients": [
          "1 berenjena",
          "2 calabacines",
          "2 pimientos",
          "400 g de tomates",
          "1 cebolla",
          "3 dientes de ajo",
          "aceite de oliva",
          "albahaca"
        ],
        "steps": [
          "Corta las verduras en trozos.",
          "Dora por separado la berenjena, los calabacines y los pimientos.",
          "Sofríe la cebolla y el ajo y añade los tomates.",
          "Junta las verduras y cuece a fuego lento hasta que estén tiernas; sazona con albahaca."
        ]
      },
      "variants": [
        "Puede servirse en trozos rústicos o en versiones al horno."
      ],
      "serving": [
        "Sirve como plato principal con pan o como guarnición."
      ],
      "commonMistakes": [
        "No cuezas todas las verduras hasta que se deshagan."
      ]
    },
    "de": {
      "overview": "Das Gemüse wird angebraten und in einer aromatischen Tomatenbasis vermischt.",
      "history": "Ratatouille ist mit der südfranzösischen Küche, besonders Nizza und der Provence, verbunden.",
      "flavor": "Fruchtig, mild und kräuterfrisch.",
      "technique": "Gemüse portionsweise braten, um die Konsistenz zu erhalten.",
      "essentials": [
        "1 Aubergine",
        "2 Zucchini",
        "2 Paprikaschoten"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 50 Min.",
        "ingredients": [
          "1 Aubergine",
          "2 Zucchini",
          "2 Paprikaschoten",
          "400 g Tomaten",
          "1 Zwiebel",
          "3 Knoblauchzehen",
          "Olivenöl",
          "Basilikum"
        ],
        "steps": [
          "Gemüse in Stücke schneiden.",
          "Aubergine, Zucchini und Paprika separat anbraten.",
          "Zwiebel und Knoblauch anschwitzen und Tomaten hinzufügen.",
          "Gemüse zusammengeben und weich köcheln lassen; mit Basilikum abschmecken."
        ]
      },
      "variants": [
        "Kann rustikal in Stücken oder in ofengebackenen Varianten serviert werden."
      ],
      "serving": [
        "Als Hauptgericht mit Brot oder als Beilage servieren."
      ],
      "commonMistakes": [
        "Nicht das gesamte Gemüse zu Brei kochen."
      ]
    }
  },
  "bouillabaisse": {
    "en": {
      "overview": "Fish is gently cooked in a broth with fennel, tomato and spices.",
      "history": "Bouillabaisse is particularly linked to Marseille’s fishing tradition.",
      "flavor": "Briny, rich and aromatic.",
      "technique": "Develop the broth before adding the fish so that the pieces do not overcook.",
      "essentials": [
        "700 g white fish",
        "1 l fish stock",
        "1 fennel bulb"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 60 min",
        "ingredients": [
          "700 g white fish",
          "1 l fish stock",
          "1 fennel bulb",
          "1 onion",
          "400 g tomatoes",
          "garlic",
          "saffron",
          "olive oil"
        ],
        "steps": [
          "Fry fennel, onion and garlic in oil.",
          "Add tomatoes, saffron and stock and simmer.",
          "Cut the fish into large pieces and poach gently in the broth until cooked through.",
          "Season and serve with bread."
        ]
      },
      "variants": [
        "Traditional Marseille versions use several local fish species; this is a simplified home version."
      ],
      "serving": [
        "Serve with toasted bread and rouille."
      ],
      "commonMistakes": [
        "Do not let the fish boil for a long time in the finished broth."
      ]
    },
    "fr": {
      "overview": "Le poisson est poché dans un bouillon au fenouil, à la tomate et aux épices.",
      "history": "La bouillabaisse est particulièrement liée à la tradition de pêche marseillaise.",
      "flavor": "Marin, généreux et aromatique.",
      "technique": "Préparer le bouillon avant d’ajouter le poisson pour éviter de trop cuire les morceaux.",
      "essentials": [
        "700 g de poisson blanc",
        "1 l de fumet de poisson",
        "1 bulbe de fenouil"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 60 min",
        "ingredients": [
          "700 g de poisson blanc",
          "1 l de fumet de poisson",
          "1 bulbe de fenouil",
          "1 oignon",
          "400 g de tomates",
          "ail",
          "safran",
          "huile d’olive"
        ],
        "steps": [
          "Faire revenir le fenouil, l’oignon et l’ail dans l’huile.",
          "Ajouter les tomates, le safran et le fumet, puis laisser mijoter.",
          "Couper le poisson en gros morceaux et le pocher délicatement dans le bouillon jusqu’à cuisson complète.",
          "Rectifier l’assaisonnement et servir avec du pain."
        ]
      },
      "variants": [
        "Les versions marseillaises traditionnelles utilisent plusieurs espèces locales de poissons ; il s’agit ici d’une version maison simplifiée."
      ],
      "serving": [
        "Servir avec du pain grillé et de la rouille."
      ],
      "commonMistakes": [
        "Ne pas laisser bouillir longtemps le poisson dans le bouillon préparé."
      ]
    },
    "pt": {
      "overview": "O peixe é cozinhado suavemente num caldo com funcho, tomate e especiarias.",
      "history": "A bouillabaisse está especialmente ligada à tradição piscatória de Marselha.",
      "flavor": "Marítimo, encorpado e aromático.",
      "technique": "Prepare o caldo antes de juntar o peixe para evitar cozer demasiado os pedaços.",
      "essentials": [
        "700 g de peixe branco",
        "1 l de caldo de peixe",
        "1 bolbo de funcho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 60 min",
        "ingredients": [
          "700 g de peixe branco",
          "1 l de caldo de peixe",
          "1 bolbo de funcho",
          "1 cebola",
          "400 g de tomate",
          "alho",
          "açafrão",
          "azeite"
        ],
        "steps": [
          "Salteie o funcho, a cebola e o alho em azeite.",
          "Junte tomate, açafrão e caldo e deixe cozinhar em lume brando.",
          "Corte o peixe em pedaços grandes e coza-o suavemente no caldo até estar bem cozinhado.",
          "Retifique os temperos e sirva com pão."
        ]
      },
      "variants": [
        "As versões tradicionais de Marselha usam várias espécies locais de peixe; esta é uma versão caseira simplificada."
      ],
      "serving": [
        "Sirva com pão torrado e rouille."
      ],
      "commonMistakes": [
        "Não deixe o peixe ferver durante muito tempo no caldo pronto."
      ]
    },
    "es": {
      "overview": "El pescado se cuece suavemente en un caldo con hinojo, tomate y especias.",
      "history": "La bullabesa está especialmente vinculada a la tradición pesquera de Marsella.",
      "flavor": "Marino, con cuerpo y aromático.",
      "technique": "Prepara el caldo antes de añadir el pescado para evitar que se cuezan demasiado los trozos.",
      "essentials": [
        "700 g de pescado blanco",
        "1 l de caldo de pescado",
        "1 bulbo de hinojo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 60 min",
        "ingredients": [
          "700 g de pescado blanco",
          "1 l de caldo de pescado",
          "1 bulbo de hinojo",
          "1 cebolla",
          "400 g de tomates",
          "ajo",
          "azafrán",
          "aceite de oliva"
        ],
        "steps": [
          "Sofríe el hinojo, la cebolla y el ajo en aceite.",
          "Añade tomate, azafrán y caldo y cuece a fuego lento.",
          "Corta el pescado en trozos grandes y cuécelo suavemente en el caldo hasta que esté hecho por dentro.",
          "Ajusta la sazón y sirve con pan."
        ]
      },
      "variants": [
        "Las versiones tradicionales de Marsella utilizan varias especies locales de pescado; esta es una versión casera simplificada."
      ],
      "serving": [
        "Sirve con pan tostado y rouille."
      ],
      "commonMistakes": [
        "No dejes que el pescado hierva mucho tiempo en el caldo preparado."
      ]
    },
    "de": {
      "overview": "Fisch wird in einer Brühe mit Fenchel, Tomaten und Gewürzen gar gezogen.",
      "history": "Bouillabaisse ist besonders mit der Fischereitradition von Marseille verbunden.",
      "flavor": "Maritim, vollmundig und aromatisch.",
      "technique": "Brühe vor Zugabe des Fisches zubereiten, damit die Fischstücke nicht verkochen.",
      "essentials": [
        "700 g weißfleischiger Fisch",
        "1 l Fischfond",
        "1 Fenchelknolle"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 60 Min.",
        "ingredients": [
          "700 g weißfleischiger Fisch",
          "1 l Fischfond",
          "1 Fenchelknolle",
          "1 Zwiebel",
          "400 g Tomaten",
          "Knoblauch",
          "Safran",
          "Olivenöl"
        ],
        "steps": [
          "Fenchel, Zwiebel und Knoblauch in Öl anschwitzen.",
          "Tomaten, Safran und Fond hinzufügen und köcheln lassen.",
          "Fisch in große Stücke schneiden und in der Brühe sanft vollständig gar ziehen lassen.",
          "Abschmecken und mit Brot servieren."
        ]
      },
      "variants": [
        "Traditionelle Marseiller Varianten verwenden mehrere lokale Fischarten; dies ist eine vereinfachte Hausvariante."
      ],
      "serving": [
        "Mit geröstetem Brot und Rouille servieren."
      ],
      "commonMistakes": [
        "Fisch nicht lange in der fertigen Brühe kochen lassen."
      ]
    }
  },
  "quiche-lorraine": {
    "en": {
      "overview": "A shortcrust pastry case is filled with an egg custard and baked until set.",
      "history": "Quiche lorraine has roots in Lorraine in northeastern France.",
      "flavor": "Crisp base, creamy filling and salty bacon.",
      "technique": "Blind-bake the base before pouring in the filling.",
      "essentials": [
        "1 pastry sheet for a 24 cm tin",
        "150 g bacon",
        "4 eggs"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 60 min",
        "ingredients": [
          "1 pastry sheet for a 24 cm tin",
          "150 g bacon",
          "4 eggs",
          "250 ml cream",
          "100 ml milk",
          "nutmeg"
        ],
        "steps": [
          "Line the tin with pastry, prick the base and blind-bake at 190 °C.",
          "Fry the bacon and let it drain.",
          "Whisk together eggs, cream, milk and nutmeg.",
          "Distribute the bacon over the base, pour over the egg mixture and bake at 175 °C until set."
        ]
      },
      "variants": [
        "Many newer versions add cheese; the classic Lorraine version does not require cheese."
      ],
      "serving": [
        "Serve warm with green salad."
      ],
      "commonMistakes": [
        "Do not pour the filling into an unbaked case if you want a crisp base."
      ]
    },
    "fr": {
      "overview": "Un fond de pâte brisée est garni d’un appareil aux œufs et cuit jusqu’à ce que celui-ci prenne.",
      "history": "La quiche lorraine trouve ses racines en Lorraine, dans le nord-est de la France.",
      "flavor": "Fond croustillant, garniture crémeuse et lardons salés.",
      "technique": "Précuire le fond à blanc avant d’y verser la garniture.",
      "essentials": [
        "1 pâte brisée pour un moule de 24 cm",
        "150 g de lardons",
        "4 œufs"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 60 min",
        "ingredients": [
          "1 pâte brisée pour un moule de 24 cm",
          "150 g de lardons",
          "4 œufs",
          "250 ml de crème",
          "100 ml de lait",
          "noix de muscade"
        ],
        "steps": [
          "Foncer le moule avec la pâte, piquer le fond et précuire à blanc à 190 °C.",
          "Faire revenir les lardons et les égoutter.",
          "Fouetter ensemble les œufs, la crème, le lait et la muscade.",
          "Répartir les lardons sur le fond, verser l’appareil aux œufs et cuire à 175 °C jusqu’à ce qu’il prenne."
        ]
      },
      "variants": [
        "De nombreuses variantes récentes ajoutent du fromage ; la version lorraine classique n’en nécessite pas."
      ],
      "serving": [
        "Servir tiède avec une salade verte."
      ],
      "commonMistakes": [
        "Ne pas verser la garniture sur un fond non précuit si l’on souhaite une base croustillante."
      ]
    },
    "pt": {
      "overview": "Uma base de massa quebrada é recheada com uma mistura de ovos e levada ao forno até solidificar.",
      "history": "A quiche lorraine tem raízes na Lorena, no nordeste de França.",
      "flavor": "Base crocante, recheio cremoso e bacon salgado.",
      "technique": "Pré-coza a base antes de verter o recheio.",
      "essentials": [
        "1 massa quebrada para forma de 24 cm",
        "150 g de bacon",
        "4 ovos"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 60 min",
        "ingredients": [
          "1 massa quebrada para forma de 24 cm",
          "150 g de bacon",
          "4 ovos",
          "250 ml de natas",
          "100 ml de leite",
          "noz-moscada"
        ],
        "steps": [
          "Forre a forma com a massa, pique a base e pré-coza a 190 °C.",
          "Frite o bacon e deixe escorrer.",
          "Bata os ovos, as natas, o leite e a noz-moscada.",
          "Distribua o bacon pela base, verta a mistura de ovos e leve ao forno a 175 °C até o recheio solidificar."
        ]
      },
      "variants": [
        "Muitas versões mais recentes incluem queijo; a versão clássica da Lorena não precisa de queijo."
      ],
      "serving": [
        "Sirva morna com salada verde."
      ],
      "commonMistakes": [
        "Não verta o recheio numa base crua se pretende uma base crocante."
      ]
    },
    "es": {
      "overview": "Una base de masa quebrada se rellena con una mezcla de huevo y se hornea hasta que cuaje.",
      "history": "La quiche lorraine tiene sus raíces en Lorena, en el noreste de Francia.",
      "flavor": "Base crujiente, relleno cremoso y beicon salado.",
      "technique": "Prehornea la base antes de verter el relleno.",
      "essentials": [
        "1 masa quebrada para molde de 24 cm",
        "150 g de beicon",
        "4 huevos"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 60 min",
        "ingredients": [
          "1 masa quebrada para molde de 24 cm",
          "150 g de beicon",
          "4 huevos",
          "250 ml de nata",
          "100 ml de leche",
          "nuez moscada"
        ],
        "steps": [
          "Forra el molde con la masa, pincha la base y prehornea a 190 °C.",
          "Fríe el beicon y déjalo escurrir.",
          "Bate los huevos, la nata, la leche y la nuez moscada.",
          "Reparte el beicon sobre la base, vierte la mezcla de huevo y hornea a 175 °C hasta que cuaje."
        ]
      },
      "variants": [
        "Muchas versiones recientes añaden queso; la versión clásica de Lorena no lo necesita."
      ],
      "serving": [
        "Sirve templada con ensalada verde."
      ],
      "commonMistakes": [
        "No viertas el relleno sobre una base sin prehornear si quieres que quede crujiente."
      ]
    },
    "de": {
      "overview": "Ein Mürbeteigboden wird mit einer Eiermasse gefüllt und gebacken, bis sie stockt.",
      "history": "Quiche Lorraine hat ihre Wurzeln in Lothringen im Nordosten Frankreichs.",
      "flavor": "Knuspriger Boden, cremige Füllung und salziger Speck.",
      "technique": "Boden blindbacken, bevor die Füllung hineingegossen wird.",
      "essentials": [
        "1 Mürbeteig für eine Form von 24 cm",
        "150 g Speck",
        "4 Eier"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 60 Min.",
        "ingredients": [
          "1 Mürbeteig für eine Form von 24 cm",
          "150 g Speck",
          "4 Eier",
          "250 ml Sahne",
          "100 ml Milch",
          "Muskat"
        ],
        "steps": [
          "Form mit Teig auslegen, Boden einstechen und bei 190 °C blindbacken.",
          "Speck braten und abtropfen lassen.",
          "Eier, Sahne, Milch und Muskat verquirlen.",
          "Speck auf dem Boden verteilen, Eiermasse darübergeben und bei 175 °C backen, bis sie stockt."
        ]
      },
      "variants": [
        "Viele neuere Varianten enthalten Käse; die klassische lothringische Variante braucht keinen Käse."
      ],
      "serving": [
        "Lauwarm mit grünem Salat servieren."
      ],
      "commonMistakes": [
        "Füllung nicht in einen ungebackenen Boden gießen, wenn er knusprig werden soll."
      ]
    }
  },
  "croque-monsieur": {
    "en": {
      "overview": "Bread slices are filled with ham and cheese, topped with sauce and gratinated.",
      "history": "Croque monsieur is a familiar part of French café and bistro cuisine.",
      "flavor": "Crisp bread, salty ham and melted cheese.",
      "technique": "Use a thick béchamel that will not soak the bread.",
      "essentials": [
        "8 slices of bread",
        "150 g cooked ham",
        "160 g Gruyère"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30 min",
        "ingredients": [
          "8 slices of bread",
          "150 g cooked ham",
          "160 g Gruyère",
          "25 g butter",
          "25 g flour",
          "250 ml milk",
          "Dijon mustard"
        ],
        "steps": [
          "Make a thick béchamel from butter, flour and milk.",
          "Spread a little mustard on the bread and place ham and cheese between the slices.",
          "Top with béchamel and the remaining cheese.",
          "Gratinate at 220 °C until golden and heated through."
        ]
      },
      "variants": [
        "Croque madame is topped with a fried egg."
      ],
      "serving": [
        "Serve with salad."
      ],
      "commonMistakes": [
        "Avoid using too much thin sauce."
      ]
    },
    "fr": {
      "overview": "Des tranches de pain sont garnies de jambon et de fromage, nappées de sauce et gratinées.",
      "history": "Le croque-monsieur est un classique des cafés et bistrots français.",
      "flavor": "Pain croustillant, jambon salé et fromage fondu.",
      "technique": "Utiliser une béchamel épaisse qui ne détrempe pas le pain.",
      "essentials": [
        "8 tranches de pain",
        "150 g de jambon cuit",
        "160 g de gruyère"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30 min",
        "ingredients": [
          "8 tranches de pain",
          "150 g de jambon cuit",
          "160 g de gruyère",
          "25 g de beurre",
          "25 g de farine",
          "250 ml de lait",
          "moutarde de Dijon"
        ],
        "steps": [
          "Préparer une béchamel épaisse avec le beurre, la farine et le lait.",
          "Tartiner le pain d’un peu de moutarde et placer le jambon et le fromage entre les tranches.",
          "Napper de béchamel et du reste de fromage.",
          "Faire gratiner à 220 °C jusqu’à ce que le dessus soit doré et l’ensemble bien chaud."
        ]
      },
      "variants": [
        "Le croque-madame est surmonté d’un œuf au plat."
      ],
      "serving": [
        "Servir avec de la salade."
      ],
      "commonMistakes": [
        "Éviter un excès de sauce liquide."
      ]
    },
    "pt": {
      "overview": "Fatias de pão são recheadas com fiambre e queijo, cobertas com molho e gratinadas.",
      "history": "O croque-monsieur é um prato conhecido dos cafés e bistrôs franceses.",
      "flavor": "Pão crocante, fiambre salgado e queijo derretido.",
      "technique": "Use um béchamel espesso que não encharque o pão.",
      "essentials": [
        "8 fatias de pão",
        "150 g de fiambre",
        "160 g de gruyère"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30 min",
        "ingredients": [
          "8 fatias de pão",
          "150 g de fiambre",
          "160 g de gruyère",
          "25 g de manteiga",
          "25 g de farinha",
          "250 ml de leite",
          "mostarda de Dijon"
        ],
        "steps": [
          "Prepare um béchamel espesso com manteiga, farinha e leite.",
          "Barre o pão com um pouco de mostarda e coloque fiambre e queijo entre as fatias.",
          "Cubra com béchamel e o restante queijo.",
          "Gratine a 220 °C até dourar e estar bem quente."
        ]
      },
      "variants": [
        "O croque-madame leva um ovo estrelado por cima."
      ],
      "serving": [
        "Sirva com salada."
      ],
      "commonMistakes": [
        "Evite demasiado molho líquido."
      ]
    },
    "es": {
      "overview": "Las rebanadas de pan se rellenan de jamón y queso, se cubren con salsa y se gratinan.",
      "history": "El croque-monsieur es un clásico de los cafés y bistrós franceses.",
      "flavor": "Pan crujiente, jamón salado y queso fundido.",
      "technique": "Usa una bechamel espesa que no empape el pan.",
      "essentials": [
        "8 rebanadas de pan",
        "150 g de jamón cocido",
        "160 g de gruyère"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30 min",
        "ingredients": [
          "8 rebanadas de pan",
          "150 g de jamón cocido",
          "160 g de gruyère",
          "25 g de mantequilla",
          "25 g de harina",
          "250 ml de leche",
          "mostaza de Dijon"
        ],
        "steps": [
          "Prepara una bechamel espesa con mantequilla, harina y leche.",
          "Unta el pan con un poco de mostaza y coloca jamón y queso entre las rebanadas.",
          "Cubre con bechamel y el resto del queso.",
          "Gratina a 220 °C hasta que esté dorado y bien caliente."
        ]
      },
      "variants": [
        "El croque-madame lleva un huevo frito encima."
      ],
      "serving": [
        "Sirve con ensalada."
      ],
      "commonMistakes": [
        "Evita demasiada salsa líquida."
      ]
    },
    "de": {
      "overview": "Brotscheiben werden mit Schinken und Käse gefüllt, mit Sauce bedeckt und überbacken.",
      "history": "Croque Monsieur ist ein bekannter Bestandteil der französischen Café- und Bistroküche.",
      "flavor": "Knuspriges Brot, salziger Schinken und geschmolzener Käse.",
      "technique": "Eine dicke Béchamel verwenden, die das Brot nicht durchweicht.",
      "essentials": [
        "8 Scheiben Brot",
        "150 g Kochschinken",
        "160 g Gruyère"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30 Min.",
        "ingredients": [
          "8 Scheiben Brot",
          "150 g Kochschinken",
          "160 g Gruyère",
          "25 g Butter",
          "25 g Mehl",
          "250 ml Milch",
          "Dijon-Senf"
        ],
        "steps": [
          "Dicke Béchamel aus Butter, Mehl und Milch zubereiten.",
          "Brot mit etwas Senf bestreichen und Schinken und Käse zwischen die Scheiben legen.",
          "Béchamel und restlichen Käse daraufgeben.",
          "Bei 220 °C goldbraun überbacken, bis alles durchgehend heiß ist."
        ]
      },
      "variants": [
        "Croque Madame wird mit einem Spiegelei belegt."
      ],
      "serving": [
        "Mit Salat servieren."
      ],
      "commonMistakes": [
        "Zu viel dünne Sauce vermeiden."
      ]
    }
  },
  "paella-valenciana": {
    "en": {
      "overview": "Rice is cooked in a wide, shallow pan with meat, vegetables and stock.",
      "history": "Paella has roots in the Valencia region, where local ingredients and rice cultivation shape the dish.",
      "flavor": "Rich and aromatic, with a possible crisp rice crust, socarrat.",
      "technique": "Distribute the rice evenly and avoid stirring after adding it.",
      "essentials": [
        "320 g round-grain paella rice",
        "400 g chicken",
        "300 g rabbit"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 75 min",
        "ingredients": [
          "320 g round-grain paella rice",
          "400 g chicken",
          "300 g rabbit",
          "200 g green beans",
          "150 g cooked large white beans",
          "150 g tomato",
          "1 l water or stock, approximately",
          "saffron",
          "paprika powder",
          "olive oil"
        ],
        "steps": [
          "Brown the meat pieces in a wide pan.",
          "Fry green beans and grated tomato, add paprika and water or stock.",
          "Simmer the meat, then add saffron, white beans and rice.",
          "Cook the rice without stirring until tender and the meat is cooked through; adjust the liquid as needed.",
          "Let rest for a few minutes before serving."
        ]
      },
      "variants": [
        "Seafood paella is another type of paella, not the classic Valencian version."
      ],
      "serving": [
        "Serve directly from the pan."
      ],
      "commonMistakes": [
        "Do not stir as you would a risotto."
      ]
    },
    "fr": {
      "overview": "Le riz cuit dans une poêle large et peu profonde avec de la viande, des légumes et du bouillon.",
      "history": "La paella trouve ses racines dans la région de Valence, où les ingrédients locaux et la riziculture façonnent le plat.",
      "flavor": "Généreuse et aromatique, avec éventuellement une croûte de riz croustillante, le socarrat.",
      "technique": "Répartir le riz uniformément et éviter de remuer après l’avoir ajouté.",
      "essentials": [
        "320 g de riz rond pour paella",
        "400 g de poulet",
        "300 g de lapin"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 75 min",
        "ingredients": [
          "320 g de riz rond pour paella",
          "400 g de poulet",
          "300 g de lapin",
          "200 g de haricots verts",
          "150 g de gros haricots blancs cuits",
          "150 g de tomate",
          "1 l d’eau ou de bouillon, environ",
          "safran",
          "paprika en poudre",
          "huile d’olive"
        ],
        "steps": [
          "Faire dorer les morceaux de viande dans une poêle large.",
          "Faire revenir les haricots verts et la tomate râpée, puis ajouter le paprika et l’eau ou le bouillon.",
          "Laisser mijoter la viande, puis ajouter le safran, les haricots blancs et le riz.",
          "Cuire le riz sans remuer jusqu’à ce qu’il soit tendre et la viande cuite à cœur ; ajuster la quantité de liquide si nécessaire.",
          "Laisser reposer quelques minutes avant de servir."
        ]
      },
      "variants": [
        "La paella aux fruits de mer est un autre type de paella, et non la version valencienne classique."
      ],
      "serving": [
        "Servir directement dans la poêle."
      ],
      "commonMistakes": [
        "Ne pas remuer comme pour un risotto."
      ]
    },
    "pt": {
      "overview": "O arroz é cozinhado numa frigideira larga e baixa com carne, legumes e caldo.",
      "history": "A paella tem raízes na região de Valência, onde os ingredientes locais e o cultivo do arroz marcam o prato.",
      "flavor": "Encorpada e aromática, com possível crosta crocante de arroz, o socarrat.",
      "technique": "Distribua o arroz uniformemente e evite mexer depois de o juntar.",
      "essentials": [
        "320 g de arroz de grão redondo para paella",
        "400 g de frango",
        "300 g de coelho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 75 min",
        "ingredients": [
          "320 g de arroz de grão redondo para paella",
          "400 g de frango",
          "300 g de coelho",
          "200 g de feijão-verde",
          "150 g de feijão branco grande cozido",
          "150 g de tomate",
          "1 l de água ou caldo, aproximadamente",
          "açafrão",
          "pimentão em pó",
          "azeite"
        ],
        "steps": [
          "Doure os pedaços de carne numa frigideira larga.",
          "Salteie o feijão-verde e o tomate ralado, junte pimentão e água ou caldo.",
          "Deixe a carne cozinhar em lume brando, junte açafrão, feijão branco e arroz.",
          "Coza o arroz sem mexer até ficar tenro e a carne estar bem cozinhada; ajuste o líquido se necessário.",
          "Deixe repousar alguns minutos antes de servir."
        ]
      },
      "variants": [
        "A paella de marisco é outro tipo de paella, não a versão valenciana clássica."
      ],
      "serving": [
        "Sirva diretamente da frigideira."
      ],
      "commonMistakes": [
        "Não mexa como num risotto."
      ]
    },
    "es": {
      "overview": "El arroz se cocina en una sartén ancha y poco profunda con carne, verduras y caldo.",
      "history": "La paella tiene sus raíces en la región valenciana, donde los ingredientes locales y el cultivo del arroz caracterizan el plato.",
      "flavor": "Intensa y aromática, con una posible costra crujiente de arroz, el socarrat.",
      "technique": "Reparte el arroz uniformemente y evita removerlo una vez añadido.",
      "essentials": [
        "320 g de arroz redondo para paella",
        "400 g de pollo",
        "300 g de conejo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 75 min",
        "ingredients": [
          "320 g de arroz redondo para paella",
          "400 g de pollo",
          "300 g de conejo",
          "200 g de judías verdes",
          "150 g de alubias blancas grandes cocidas",
          "150 g de tomate",
          "1 l de agua o caldo, aproximadamente",
          "azafrán",
          "pimentón",
          "aceite de oliva"
        ],
        "steps": [
          "Dora los trozos de carne en una sartén ancha.",
          "Sofríe las judías verdes y el tomate rallado, añade pimentón y agua o caldo.",
          "Cuece la carne a fuego lento, añade azafrán, alubias blancas y arroz.",
          "Cuece el arroz sin remover hasta que esté tierno y la carne hecha por dentro; ajusta el líquido si es necesario.",
          "Deja reposar unos minutos antes de servir."
        ]
      },
      "variants": [
        "La paella de marisco es otro tipo de paella, no la variante valenciana clásica."
      ],
      "serving": [
        "Sirve directamente de la paellera."
      ],
      "commonMistakes": [
        "No remuevas como si fuera un risotto."
      ]
    },
    "de": {
      "overview": "Reis wird in einer breiten, flachen Pfanne mit Fleisch, Gemüse und Brühe gegart.",
      "history": "Paella hat ihre Wurzeln in der Region Valencia, wo lokale Zutaten und Reisanbau das Gericht prägen.",
      "flavor": "Kräftig und aromatisch, mit einer möglichen knusprigen Reiskruste, Socarrat.",
      "technique": "Reis gleichmäßig verteilen und nach der Zugabe nicht mehr umrühren.",
      "essentials": [
        "320 g Rundkorn-Paellareis",
        "400 g Hähnchen",
        "300 g Kaninchen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 75 Min.",
        "ingredients": [
          "320 g Rundkorn-Paellareis",
          "400 g Hähnchen",
          "300 g Kaninchen",
          "200 g grüne Bohnen",
          "150 g gekochte große weiße Bohnen",
          "150 g Tomate",
          "1 l Wasser oder Brühe, ungefähr",
          "Safran",
          "Paprikapulver",
          "Olivenöl"
        ],
        "steps": [
          "Fleischstücke in einer breiten Pfanne anbräunen.",
          "Grüne Bohnen und geriebene Tomate anbraten, Paprikapulver und Wasser oder Brühe hinzufügen.",
          "Fleisch ziehen lassen, Safran, weiße Bohnen und Reis hinzufügen.",
          "Reis ohne Rühren weich garen, bis auch das Fleisch durchgegart ist; Flüssigkeitsmenge bei Bedarf anpassen.",
          "Vor dem Servieren einige Minuten ruhen lassen."
        ]
      },
      "variants": [
        "Meeresfrüchtepaella ist eine andere Paella-Art, nicht die klassische valencianische Variante."
      ],
      "serving": [
        "Direkt aus der Pfanne servieren."
      ],
      "commonMistakes": [
        "Nicht wie bei Risotto umrühren."
      ]
    }
  },
  "patatas-bravas": {
    "en": {
      "overview": "Potatoes are fried or deep-fried and topped with a sauce containing paprika and chilli.",
      "history": "Patatas bravas are a popular tapas dish in Spanish bars.",
      "flavor": "Crisp, slightly sweet and hot from the sauce.",
      "technique": "Dry the potatoes before cooking and add the sauce just before serving.",
      "essentials": [
        "700 g potatoes",
        "oil",
        "1 tbsp olive oil"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "700 g potatoes",
          "oil",
          "1 tbsp olive oil",
          "1 tbsp wheat flour",
          "1 tsp sweet paprika",
          "hot paprika to taste",
          "200 ml stock",
          "salt"
        ],
        "steps": [
          "Cut the potatoes into pieces and dry them.",
          "Toss in a little oil and bake at 220 °C until golden and tender.",
          "Heat the olive oil, stir in flour and paprika without burning the spices.",
          "Gradually add stock and simmer until the sauce reaches the desired thickness.",
          "Top the potatoes with the sauce."
        ]
      },
      "variants": [
        "Some serve a tomato-based sauce, aioli or both."
      ],
      "serving": [
        "Serve hot as tapas."
      ],
      "commonMistakes": [
        "Do not pour on the sauce long before serving."
      ]
    },
    "fr": {
      "overview": "Les pommes de terre sont poêlées ou frites, puis nappées d’une sauce au paprika et au piment.",
      "history": "Les patatas bravas sont des tapas populaires dans les bars espagnols.",
      "flavor": "Croustillantes, légèrement sucrées et piquantes grâce à la sauce.",
      "technique": "Sécher les pommes de terre avant la cuisson et ajouter la sauce juste avant de servir.",
      "essentials": [
        "700 g de pommes de terre",
        "huile",
        "1 c. à soupe d’huile d’olive"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "700 g de pommes de terre",
          "huile",
          "1 c. à soupe d’huile d’olive",
          "1 c. à soupe de farine de blé",
          "1 c. à café de paprika doux",
          "paprika fort selon le goût",
          "200 ml de bouillon",
          "sel"
        ],
        "steps": [
          "Couper les pommes de terre en morceaux et les sécher.",
          "Enrober d’un peu d’huile et cuire au four à 220 °C jusqu’à ce qu’elles soient dorées et tendres.",
          "Chauffer l’huile d’olive, incorporer la farine et le paprika sans brûler les épices.",
          "Incorporer progressivement le bouillon et laisser mijoter jusqu’à la consistance souhaitée.",
          "Napper les pommes de terre de sauce."
        ]
      },
      "variants": [
        "Certains servent une sauce à base de tomate, de l’aïoli ou les deux."
      ],
      "serving": [
        "Servir chaud en tapas."
      ],
      "commonMistakes": [
        "Ne pas verser la sauce longtemps avant de servir."
      ]
    },
    "pt": {
      "overview": "As batatas são salteadas ou fritas e cobertas com um molho de pimentão e malagueta.",
      "history": "As patatas bravas são tapas populares nos bares espanhóis.",
      "flavor": "Crocantes, ligeiramente doces e picantes devido ao molho.",
      "technique": "Seque as batatas antes de cozinhar e junte o molho imediatamente antes de servir.",
      "essentials": [
        "700 g de batatas",
        "óleo",
        "1 c. de sopa de azeite"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "700 g de batatas",
          "óleo",
          "1 c. de sopa de azeite",
          "1 c. de sopa de farinha de trigo",
          "1 c. de chá de pimentão doce",
          "pimentão picante a gosto",
          "200 ml de caldo",
          "sal"
        ],
        "steps": [
          "Corte as batatas em pedaços e seque-as.",
          "Envolva num pouco de óleo e leve ao forno a 220 °C até ficarem douradas e tenras.",
          "Aqueça o azeite, incorpore farinha e pimentão sem queimar as especiarias.",
          "Incorpore gradualmente o caldo e deixe o molho engrossar até à consistência desejada.",
          "Cubra as batatas com o molho."
        ]
      },
      "variants": [
        "Alguns servem molho de tomate, aioli ou ambos."
      ],
      "serving": [
        "Sirva quente como tapas."
      ],
      "commonMistakes": [
        "Não verta o molho muito antes de servir."
      ]
    },
    "es": {
      "overview": "Las patatas se doran o fríen y se cubren con una salsa de pimentón y chile.",
      "history": "Las patatas bravas son una tapa popular en los bares españoles.",
      "flavor": "Crujientes, ligeramente dulces y picantes por la salsa.",
      "technique": "Seca las patatas antes de cocinarlas y añade la salsa justo antes de servir.",
      "essentials": [
        "700 g de patatas",
        "aceite",
        "1 cucharada de aceite de oliva"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "700 g de patatas",
          "aceite",
          "1 cucharada de aceite de oliva",
          "1 cucharada de harina de trigo",
          "1 cucharadita de pimentón dulce",
          "pimentón picante al gusto",
          "200 ml de caldo",
          "sal"
        ],
        "steps": [
          "Corta las patatas en trozos y sécalas.",
          "Mezcla con un poco de aceite y hornea a 220 °C hasta que estén doradas y tiernas.",
          "Calienta el aceite de oliva, incorpora la harina y el pimentón sin quemar las especias.",
          "Incorpora poco a poco el caldo y cuece a fuego lento hasta obtener el espesor deseado.",
          "Cubre las patatas con la salsa."
        ]
      },
      "variants": [
        "Algunos sirven salsa de tomate, alioli o ambos."
      ],
      "serving": [
        "Sirve calientes como tapa."
      ],
      "commonMistakes": [
        "No añadas la salsa mucho antes de servir."
      ]
    },
    "de": {
      "overview": "Kartoffeln werden gebraten oder frittiert und mit einer Sauce aus Paprikapulver und Chili serviert.",
      "history": "Patatas Bravas sind beliebte Tapas in spanischen Bars.",
      "flavor": "Knusprig, leicht süß und durch die Sauce scharf.",
      "technique": "Kartoffeln vor dem Braten trocknen und Sauce erst kurz vor dem Servieren hinzufügen.",
      "essentials": [
        "700 g Kartoffeln",
        "Öl",
        "1 EL Olivenöl"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "700 g Kartoffeln",
          "Öl",
          "1 EL Olivenöl",
          "1 EL Weizenmehl",
          "1 TL edelsüßes Paprikapulver",
          "scharfes Paprikapulver nach Geschmack",
          "200 ml Brühe",
          "Salz"
        ],
        "steps": [
          "Kartoffeln in Stücke schneiden und trocknen.",
          "In etwas Öl wenden und bei 220 °C goldbraun und weich backen.",
          "Olivenöl erhitzen, Mehl und Paprikapulver einrühren, ohne die Gewürze zu verbrennen.",
          "Brühe nach und nach einrühren und Sauce bis zur gewünschten Dicke köcheln lassen.",
          "Sauce über die Kartoffeln geben."
        ]
      },
      "variants": [
        "Manche servieren eine Tomatensauce, Aioli oder beides."
      ],
      "serving": [
        "Heiß als Tapas servieren."
      ],
      "commonMistakes": [
        "Sauce nicht lange vor dem Servieren darübergeben."
      ]
    }
  },
  "tortilla-espanola": {
    "en": {
      "overview": "Potato slices are softened in oil and mixed with eggs before the omelette is cooked.",
      "history": "The potato omelette is a Spanish everyday classic; whether to use onion is a well-known debate.",
      "flavor": "Mild, juicy and rich.",
      "technique": "Cook the potatoes gently before mixing them with the eggs.",
      "essentials": [
        "600 g potatoes",
        "6 eggs",
        "1 onion, optional"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "600 g potatoes",
          "6 eggs",
          "1 onion, optional",
          "olive oil",
          "salt"
        ],
        "steps": [
          "Peel the potatoes and cut into thin slices.",
          "Gently cook the potatoes and optional onion in oil until tender; drain.",
          "Mix with beaten eggs and salt.",
          "Cook in a pan over medium-low heat, turn using a plate and cook until the egg has set."
        ]
      },
      "variants": [
        "With or without onion, and in different thicknesses."
      ],
      "serving": [
        "Serve warm in pieces or as tapas."
      ],
      "commonMistakes": [
        "Avoid high heat that burns the outside before the centre is done."
      ]
    },
    "fr": {
      "overview": "Des rondelles de pommes de terre sont attendries dans l’huile et mélangées aux œufs avant la cuisson de l’omelette.",
      "history": "L’omelette aux pommes de terre est un classique espagnol du quotidien ; l’ajout d’oignon fait l’objet d’un débat bien connu.",
      "flavor": "Douce, moelleuse et généreuse.",
      "technique": "Cuire doucement les pommes de terre avant de les mélanger aux œufs.",
      "essentials": [
        "600 g de pommes de terre",
        "6 œufs",
        "1 oignon, facultatif"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "600 g de pommes de terre",
          "6 œufs",
          "1 oignon, facultatif",
          "huile d’olive",
          "sel"
        ],
        "steps": [
          "Peler les pommes de terre et les couper en fines rondelles.",
          "Cuire doucement les pommes de terre et éventuellement l’oignon dans l’huile jusqu’à tendreté ; égoutter.",
          "Mélanger avec les œufs battus et le sel.",
          "Cuire à feu moyen-doux dans une poêle, retourner à l’aide d’une assiette et poursuivre jusqu’à ce que les œufs soient pris."
        ]
      },
      "variants": [
        "Avec ou sans oignon, et de différentes épaisseurs."
      ],
      "serving": [
        "Servir tiède en morceaux ou en tapas."
      ],
      "commonMistakes": [
        "Éviter un feu vif qui brûle l’extérieur avant que le centre soit cuit."
      ]
    },
    "pt": {
      "overview": "Rodelas de batata são amolecidas em azeite e misturadas com ovos antes de cozinhar a tortilha.",
      "history": "A tortilha de batata é um clássico espanhol do quotidiano; o uso de cebola é uma questão muito debatida.",
      "flavor": "Suave, suculenta e encorpada.",
      "technique": "Cozinhe as batatas suavemente antes de as misturar com os ovos.",
      "essentials": [
        "600 g de batatas",
        "6 ovos",
        "1 cebola, opcional"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "600 g de batatas",
          "6 ovos",
          "1 cebola, opcional",
          "azeite",
          "sal"
        ],
        "steps": [
          "Descasque as batatas e corte em rodelas finas.",
          "Cozinhe suavemente as batatas e a cebola, se usada, em azeite até ficarem tenras; escorra.",
          "Misture com os ovos batidos e sal.",
          "Cozinhe numa frigideira em lume médio-baixo, vire com a ajuda de um prato e cozinhe até o ovo solidificar."
        ]
      },
      "variants": [
        "Com ou sem cebola, e com diferentes espessuras."
      ],
      "serving": [
        "Sirva morna em pedaços ou como tapas."
      ],
      "commonMistakes": [
        "Evite lume forte que queime o exterior antes de o centro estar cozinhado."
      ]
    },
    "es": {
      "overview": "Las rodajas de patata se ablandan en aceite y se mezclan con huevo antes de cuajar la tortilla.",
      "history": "La tortilla de patatas es un clásico cotidiano español; el uso de cebolla es un conocido tema de debate.",
      "flavor": "Suave, jugosa y contundente.",
      "technique": "Cocina las patatas suavemente antes de mezclarlas con el huevo.",
      "essentials": [
        "600 g de patatas",
        "6 huevos",
        "1 cebolla, opcional"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "600 g de patatas",
          "6 huevos",
          "1 cebolla, opcional",
          "aceite de oliva",
          "sal"
        ],
        "steps": [
          "Pela las patatas y córtalas en rodajas finas.",
          "Cocina suavemente las patatas y la cebolla opcional en aceite hasta que estén tiernas; escurre.",
          "Mezcla con los huevos batidos y sal.",
          "Cocina en sartén a fuego medio-bajo, da la vuelta con ayuda de un plato y cocina hasta que cuaje el huevo."
        ]
      },
      "variants": [
        "Con o sin cebolla, y de diferentes grosores."
      ],
      "serving": [
        "Sirve templada en porciones o como tapa."
      ],
      "commonMistakes": [
        "Evita el fuego fuerte que quema el exterior antes de que el centro esté hecho."
      ]
    },
    "de": {
      "overview": "Kartoffelscheiben werden in Öl weich gegart und vor dem Braten des Omeletts mit Eiern vermischt.",
      "history": "Das Kartoffelomelett ist ein spanischer Alltagsklassiker; die Verwendung von Zwiebeln ist ein bekannter Streitpunkt.",
      "flavor": "Mild, saftig und gehaltvoll.",
      "technique": "Kartoffeln sanft garen, bevor sie mit Eiern vermischt werden.",
      "essentials": [
        "600 g Kartoffeln",
        "6 Eier",
        "1 Zwiebel, optional"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "600 g Kartoffeln",
          "6 Eier",
          "1 Zwiebel, optional",
          "Olivenöl",
          "Salz"
        ],
        "steps": [
          "Kartoffeln schälen und in dünne Scheiben schneiden.",
          "Kartoffeln und gegebenenfalls Zwiebel in Öl sanft weich garen; abtropfen lassen.",
          "Mit verquirlten Eiern und Salz mischen.",
          "Bei mittlerer bis niedriger Hitze in der Pfanne braten, mithilfe eines Tellers wenden und garen, bis das Ei gestockt ist."
        ]
      },
      "variants": [
        "Mit oder ohne Zwiebel und in unterschiedlicher Dicke."
      ],
      "serving": [
        "Lauwarm in Stücken oder als Tapas servieren."
      ],
      "commonMistakes": [
        "Hohe Hitze vermeiden, damit die Außenseite nicht verbrennt, bevor die Mitte gar ist."
      ]
    }
  },
  "gazpacho": {
    "en": {
      "overview": "Raw vegetables are blended with oil, vinegar and optionally bread.",
      "history": "Gazpacho is particularly associated with Andalusian cuisine and is often served in hot weather.",
      "flavor": "Fresh, tangy and fruity.",
      "technique": "Use ripe tomatoes and chill the soup before serving.",
      "essentials": [
        "800 g ripe tomatoes",
        "1 cucumber",
        "1 green bell pepper"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 20 min + chilling",
        "ingredients": [
          "800 g ripe tomatoes",
          "1 cucumber",
          "1 green bell pepper",
          "1 garlic clove",
          "40 g bread, optional",
          "3 tbsp olive oil",
          "1–2 tbsp wine vinegar",
          "salt",
          "cold water as needed"
        ],
        "steps": [
          "Wash and cut the vegetables.",
          "Soak the bread if using it.",
          "Blend vegetables, bread, oil and vinegar until smooth.",
          "Season, adjust the consistency with water and chill."
        ]
      },
      "variants": [
        "Salmorejo is a related, thicker tomato soup."
      ],
      "serving": [
        "Serve cold with finely chopped vegetables."
      ],
      "commonMistakes": [
        "Do not use unripe tomatoes if a ripe tomato flavour is desired."
      ]
    },
    "fr": {
      "overview": "Les légumes crus sont mixés avec de l’huile, du vinaigre et éventuellement du pain.",
      "history": "Le gaspacho est particulièrement associé à la cuisine andalouse et se sert volontiers par temps chaud.",
      "flavor": "Frais, acidulé et fruité.",
      "technique": "Utiliser des tomates mûres et réfrigérer la soupe avant de servir.",
      "essentials": [
        "800 g de tomates mûres",
        "1 concombre",
        "1 poivron vert"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 20 min + réfrigération",
        "ingredients": [
          "800 g de tomates mûres",
          "1 concombre",
          "1 poivron vert",
          "1 gousse d’ail",
          "40 g de pain, facultatif",
          "3 c. à soupe d’huile d’olive",
          "1–2 c. à soupe de vinaigre de vin",
          "sel",
          "eau froide selon les besoins"
        ],
        "steps": [
          "Laver et couper les légumes.",
          "Faire tremper le pain si on l’utilise.",
          "Mixer les légumes, le pain, l’huile et le vinaigre jusqu’à obtenir une soupe lisse.",
          "Rectifier l’assaisonnement, ajuster la consistance avec de l’eau et réfrigérer."
        ]
      },
      "variants": [
        "Le salmorejo est une soupe de tomates apparentée, plus épaisse."
      ],
      "serving": [
        "Servir froid avec des légumes finement hachés."
      ],
      "commonMistakes": [
        "Ne pas utiliser de tomates non mûres si l’on recherche la saveur de tomates mûres."
      ]
    },
    "pt": {
      "overview": "Os legumes crus são triturados com azeite, vinagre e, opcionalmente, pão.",
      "history": "O gaspacho está especialmente associado à cozinha andaluza e é frequentemente servido com tempo quente.",
      "flavor": "Fresco, ácido e frutado.",
      "technique": "Use tomates maduros e arrefeça a sopa antes de servir.",
      "essentials": [
        "800 g de tomates maduros",
        "1 pepino",
        "1 pimento verde"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 20 min + refrigeração",
        "ingredients": [
          "800 g de tomates maduros",
          "1 pepino",
          "1 pimento verde",
          "1 dente de alho",
          "40 g de pão, opcional",
          "3 c. de sopa de azeite",
          "1–2 c. de sopa de vinagre de vinho",
          "sal",
          "água fria conforme necessário"
        ],
        "steps": [
          "Lave e corte os legumes.",
          "Demolhe o pão se o utilizar.",
          "Triture os legumes, o pão, o azeite e o vinagre até obter uma sopa lisa.",
          "Retifique os temperos, ajuste a consistência com água e leve ao frigorífico."
        ]
      },
      "variants": [
        "O salmorejo é uma sopa de tomate semelhante, mais espessa."
      ],
      "serving": [
        "Sirva fria com legumes finamente picados."
      ],
      "commonMistakes": [
        "Não use tomates verdes se pretende o sabor de tomates maduros."
      ]
    },
    "es": {
      "overview": "Las verduras crudas se trituran con aceite, vinagre y, opcionalmente, pan.",
      "history": "El gazpacho se asocia especialmente con la cocina andaluza y se suele servir cuando hace calor.",
      "flavor": "Fresco, ácido y afrutado.",
      "technique": "Usa tomates maduros y enfría la sopa antes de servir.",
      "essentials": [
        "800 g de tomates maduros",
        "1 pepino",
        "1 pimiento verde"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 20 min + refrigeración",
        "ingredients": [
          "800 g de tomates maduros",
          "1 pepino",
          "1 pimiento verde",
          "1 diente de ajo",
          "40 g de pan, opcional",
          "3 cucharadas de aceite de oliva",
          "1–2 cucharadas de vinagre de vino",
          "sal",
          "agua fría según sea necesario"
        ],
        "steps": [
          "Lava y corta las verduras.",
          "Remoja el pan si lo utilizas.",
          "Tritura las verduras, el pan, el aceite y el vinagre hasta obtener una sopa lisa.",
          "Ajusta la sazón, la consistencia con agua y enfría."
        ]
      },
      "variants": [
        "El salmorejo es una sopa de tomate emparentada y más espesa."
      ],
      "serving": [
        "Sirve frío con verduras picadas finamente."
      ],
      "commonMistakes": [
        "No uses tomates inmaduros si buscas el sabor del tomate maduro."
      ]
    },
    "de": {
      "overview": "Rohes Gemüse wird mit Öl, Essig und gegebenenfalls Brot püriert.",
      "history": "Gazpacho ist besonders mit der andalusischen Küche verbunden und wird gern bei heißem Wetter serviert.",
      "flavor": "Frisch, säuerlich und fruchtig.",
      "technique": "Reife Tomaten verwenden und Suppe vor dem Servieren kühlen.",
      "essentials": [
        "800 g reife Tomaten",
        "1 Gurke",
        "1 grüne Paprikaschote"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 20 Min. + Kühlzeit",
        "ingredients": [
          "800 g reife Tomaten",
          "1 Gurke",
          "1 grüne Paprikaschote",
          "1 Knoblauchzehe",
          "40 g Brot, optional",
          "3 EL Olivenöl",
          "1–2 EL Weinessig",
          "Salz",
          "kaltes Wasser nach Bedarf"
        ],
        "steps": [
          "Gemüse waschen und schneiden.",
          "Brot einweichen, falls verwendet.",
          "Gemüse, Brot, Öl und Essig zu einer glatten Suppe pürieren.",
          "Abschmecken, Konsistenz mit Wasser anpassen und kühlen."
        ]
      },
      "variants": [
        "Salmorejo ist eine verwandte, dickere Tomatensuppe."
      ],
      "serving": [
        "Kalt mit fein gehacktem Gemüse servieren."
      ],
      "commonMistakes": [
        "Keine unreifen Tomaten verwenden, wenn reifer Tomatengeschmack gewünscht ist."
      ]
    }
  },
  "gambas-al-ajillo": {
    "en": {
      "overview": "The prawns are cooked quickly in aromatic oil and served hot.",
      "history": "Gambas al ajillo are part of the Spanish tapas tradition, including in Madrid.",
      "flavor": "Sweetish seafood, garlic and mild chilli heat.",
      "technique": "Gently heat the oil with garlic before adding the prawns.",
      "essentials": [
        "400 g raw, peeled prawns",
        "5 garlic cloves",
        "60 ml olive oil"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 15 min",
        "ingredients": [
          "400 g raw, peeled prawns",
          "5 garlic cloves",
          "60 ml olive oil",
          "dried chilli",
          "salt",
          "parsley"
        ],
        "steps": [
          "Dry the prawns and slice the garlic.",
          "Heat the oil with garlic and chilli without burning the garlic.",
          "Add the prawns and fry until cooked through.",
          "Season with salt and parsley."
        ]
      },
      "variants": [
        "The heat level can be adjusted by varying the amount of chilli."
      ],
      "serving": [
        "Serve with bread for dipping in the oil."
      ],
      "commonMistakes": [
        "Do not cook the prawns so long that they become tough."
      ]
    },
    "fr": {
      "overview": "Les crevettes sont cuites rapidement dans une huile aromatique et servies chaudes.",
      "history": "Les gambas al ajillo font partie de la tradition espagnole des tapas, notamment à Madrid.",
      "flavor": "Fruits de mer légèrement sucrés, ail et piquant modéré du piment.",
      "technique": "Chauffer doucement l’huile avec l’ail avant d’ajouter les crevettes.",
      "essentials": [
        "400 g de crevettes crues décortiquées",
        "5 gousses d’ail",
        "60 ml d’huile d’olive"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 15 min",
        "ingredients": [
          "400 g de crevettes crues décortiquées",
          "5 gousses d’ail",
          "60 ml d’huile d’olive",
          "piment séché",
          "sel",
          "persil"
        ],
        "steps": [
          "Sécher les crevettes et émincer l’ail.",
          "Chauffer l’huile avec l’ail et le piment sans brûler l’ail.",
          "Ajouter les crevettes et cuire à cœur.",
          "Assaisonner avec du sel et du persil."
        ]
      },
      "variants": [
        "Le piquant peut être ajusté en variant la quantité de piment."
      ],
      "serving": [
        "Servir avec du pain pour saucer l’huile."
      ],
      "commonMistakes": [
        "Ne pas cuire les crevettes si longtemps qu’elles deviennent caoutchouteuses."
      ]
    },
    "pt": {
      "overview": "O camarão é cozinhado rapidamente em azeite aromático e servido quente.",
      "history": "As gambas al ajillo fazem parte da tradição espanhola de tapas, nomeadamente em Madrid.",
      "flavor": "Marisco ligeiramente doce, alho e picante suave da malagueta.",
      "technique": "Aqueça suavemente o azeite com o alho antes de juntar o camarão.",
      "essentials": [
        "400 g de camarão cru descascado",
        "5 dentes de alho",
        "60 ml de azeite"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 15 min",
        "ingredients": [
          "400 g de camarão cru descascado",
          "5 dentes de alho",
          "60 ml de azeite",
          "malagueta seca",
          "sal",
          "salsa"
        ],
        "steps": [
          "Seque o camarão e corte o alho em lâminas.",
          "Aqueça o azeite com alho e malagueta sem deixar queimar o alho.",
          "Junte o camarão e cozinhe completamente.",
          "Tempere com sal e salsa."
        ]
      },
      "variants": [
        "O picante pode ser ajustado variando a quantidade de malagueta."
      ],
      "serving": [
        "Sirva com pão para molhar no azeite."
      ],
      "commonMistakes": [
        "Não cozinhe o camarão durante tanto tempo que fique rijo."
      ]
    },
    "es": {
      "overview": "Las gambas se cocinan rápidamente en aceite aromático y se sirven calientes.",
      "history": "Las gambas al ajillo forman parte de la tradición española de tapas, entre otros lugares en Madrid.",
      "flavor": "Marisco ligeramente dulce, ajo y picante suave del chile.",
      "technique": "Calienta suavemente el aceite con el ajo antes de añadir las gambas.",
      "essentials": [
        "400 g de gambas crudas peladas",
        "5 dientes de ajo",
        "60 ml de aceite de oliva"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 15 min",
        "ingredients": [
          "400 g de gambas crudas peladas",
          "5 dientes de ajo",
          "60 ml de aceite de oliva",
          "chile seco",
          "sal",
          "perejil"
        ],
        "steps": [
          "Seca las gambas y lamina el ajo.",
          "Calienta el aceite con ajo y chile sin quemar el ajo.",
          "Añade las gambas y cocina hasta que estén hechas por dentro.",
          "Sazona con sal y perejil."
        ]
      },
      "variants": [
        "El picante se puede ajustar variando la cantidad de chile."
      ],
      "serving": [
        "Sirve con pan para mojar en el aceite."
      ],
      "commonMistakes": [
        "No cocines las gambas tanto tiempo que queden correosas."
      ]
    },
    "de": {
      "overview": "Garnelen werden kurz in aromatischem Öl gegart und heiß serviert.",
      "history": "Gambas al Ajillo gehören zur spanischen Tapas-Tradition, unter anderem in Madrid.",
      "flavor": "Süßliche Meeresfrüchte, Knoblauch und milde Chilischärfe.",
      "technique": "Öl mit Knoblauch sanft erhitzen, bevor die Garnelen hinzukommen.",
      "essentials": [
        "400 g rohe, geschälte Garnelen",
        "5 Knoblauchzehen",
        "60 ml Olivenöl"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 15 Min.",
        "ingredients": [
          "400 g rohe, geschälte Garnelen",
          "5 Knoblauchzehen",
          "60 ml Olivenöl",
          "getrocknete Chili",
          "Salz",
          "Petersilie"
        ],
        "steps": [
          "Garnelen trocknen und Knoblauch in Scheiben schneiden.",
          "Öl mit Knoblauch und Chili erhitzen, ohne den Knoblauch zu verbrennen.",
          "Garnelen hinzufügen und vollständig durchgaren.",
          "Mit Salz und Petersilie abschmecken."
        ]
      },
      "variants": [
        "Die Schärfe lässt sich über die Chilimenge anpassen."
      ],
      "serving": [
        "Mit Brot zum Auftunken des Öls servieren."
      ],
      "commonMistakes": [
        "Garnelen nicht so lange braten, dass sie zäh werden."
      ]
    }
  },
  "croquetas": {
    "en": {
      "overview": "A firm, chilled béchamel mixture is shaped, breaded and deep-fried.",
      "history": "Croquetas are a popular Spanish tapas dish; ham is a classic filling.",
      "flavor": "Crisp outside and soft, creamy centre.",
      "technique": "Chill the filling thoroughly before shaping and breading.",
      "essentials": [
        "60 g butter",
        "75 g wheat flour",
        "500 ml milk"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 60 min + chilling",
        "ingredients": [
          "60 g butter",
          "75 g wheat flour",
          "500 ml milk",
          "100 g finely chopped ham",
          "2 eggs",
          "breadcrumbs",
          "oil"
        ],
        "steps": [
          "Melt the butter, stir in the flour and gradually add the milk.",
          "Cook until thick, fold in the ham and season.",
          "Spread in a dish and cool quickly before refrigerating for several hours.",
          "Shape croquettes and coat in flour, egg and breadcrumbs.",
          "Deep-fry in small batches at 175 °C until golden and heated through."
        ]
      },
      "variants": [
        "Fillings with mushrooms, cheese or cod are also widespread."
      ],
      "serving": [
        "Serve hot as tapas."
      ],
      "commonMistakes": [
        "Do not shape the croquettes while the filling is warm and loose."
      ]
    },
    "fr": {
      "overview": "Un appareil à béchamel ferme et refroidi est façonné, pané et frit.",
      "history": "Les croquetas sont des tapas espagnoles populaires ; le jambon est une garniture classique.",
      "flavor": "Extérieur croustillant et cœur tendre et crémeux.",
      "technique": "Bien refroidir la garniture avant de façonner et de paner.",
      "essentials": [
        "60 g de beurre",
        "75 g de farine de blé",
        "500 ml de lait"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 60 min + réfrigération",
        "ingredients": [
          "60 g de beurre",
          "75 g de farine de blé",
          "500 ml de lait",
          "100 g de jambon finement haché",
          "2 œufs",
          "chapelure",
          "huile"
        ],
        "steps": [
          "Faire fondre le beurre, incorporer la farine et ajouter progressivement le lait.",
          "Cuire jusqu’à obtenir une masse épaisse, incorporer le jambon et assaisonner.",
          "Étaler dans un plat et refroidir rapidement avant de réfrigérer plusieurs heures.",
          "Façonner les croquettes et les passer dans la farine, l’œuf et la chapelure.",
          "Frire par petites quantités à 175 °C jusqu’à ce qu’elles soient dorées et bien chaudes à cœur."
        ]
      },
      "variants": [
        "Les garnitures aux champignons, au fromage ou à la morue sont également courantes."
      ],
      "serving": [
        "Servir chaud en tapas."
      ],
      "commonMistakes": [
        "Ne pas façonner les croquettes tant que la garniture est chaude et molle."
      ]
    },
    "pt": {
      "overview": "Uma massa firme e fria de béchamel é moldada, panada e frita.",
      "history": "As croquetas são tapas espanholas populares; o presunto é um recheio clássico.",
      "flavor": "Exterior crocante e interior macio e cremoso.",
      "technique": "Arrefeça bem o recheio antes de moldar e panar.",
      "essentials": [
        "60 g de manteiga",
        "75 g de farinha de trigo",
        "500 ml de leite"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 60 min + refrigeração",
        "ingredients": [
          "60 g de manteiga",
          "75 g de farinha de trigo",
          "500 ml de leite",
          "100 g de presunto finamente picado",
          "2 ovos",
          "pão ralado",
          "óleo"
        ],
        "steps": [
          "Derreta a manteiga, incorpore a farinha e junte gradualmente o leite.",
          "Cozinhe até engrossar, envolva o presunto e tempere.",
          "Espalhe num recipiente e arrefeça rapidamente antes de refrigerar durante várias horas.",
          "Molde os croquetes e passe por farinha, ovo e pão ralado.",
          "Frite em pequenas porções a 175 °C até ficarem douradas e bem quentes no interior."
        ]
      },
      "variants": [
        "Recheios de cogumelos, queijo ou bacalhau também são comuns."
      ],
      "serving": [
        "Sirva quente como tapas."
      ],
      "commonMistakes": [
        "Não molde os croquetes enquanto o recheio estiver quente e pouco firme."
      ]
    },
    "es": {
      "overview": "Una masa firme y fría de bechamel se moldea, se empana y se fríe.",
      "history": "Las croquetas son una tapa española popular; el jamón es un relleno clásico.",
      "flavor": "Exterior crujiente e interior suave y cremoso.",
      "technique": "Enfría bien el relleno antes de moldear y empanar.",
      "essentials": [
        "60 g de mantequilla",
        "75 g de harina de trigo",
        "500 ml de leche"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 60 min + refrigeración",
        "ingredients": [
          "60 g de mantequilla",
          "75 g de harina de trigo",
          "500 ml de leche",
          "100 g de jamón picado fino",
          "2 huevos",
          "pan rallado",
          "aceite"
        ],
        "steps": [
          "Derrite la mantequilla, incorpora la harina y añade poco a poco la leche.",
          "Cocina hasta obtener una masa espesa, incorpora el jamón y sazona.",
          "Extiende en una fuente y enfría rápidamente antes de refrigerar durante varias horas.",
          "Forma las croquetas y pásalas por harina, huevo y pan rallado.",
          "Fríe en tandas pequeñas a 175 °C hasta que estén doradas y calientes por dentro."
        ]
      },
      "variants": [
        "Los rellenos de setas, queso o bacalao también son habituales."
      ],
      "serving": [
        "Sirve calientes como tapa."
      ],
      "commonMistakes": [
        "No formes las croquetas mientras la masa esté caliente y blanda."
      ]
    },
    "de": {
      "overview": "Eine feste, gekühlte Béchamelmasse wird geformt, paniert und frittiert.",
      "history": "Croquetas sind beliebte spanische Tapas; Schinken ist eine klassische Füllung.",
      "flavor": "Knusprige Außenseite und weicher, cremiger Kern.",
      "technique": "Füllung vor dem Formen und Panieren gründlich kühlen.",
      "essentials": [
        "60 g Butter",
        "75 g Weizenmehl",
        "500 ml Milch"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 60 Min. + Kühlzeit",
        "ingredients": [
          "60 g Butter",
          "75 g Weizenmehl",
          "500 ml Milch",
          "100 g fein gehackter Schinken",
          "2 Eier",
          "Semmelbrösel",
          "Öl"
        ],
        "steps": [
          "Butter schmelzen, Mehl einrühren und Milch nach und nach hinzufügen.",
          "Zu einer dicken Masse kochen, Schinken unterheben und abschmecken.",
          "In einer Form verteilen und rasch abkühlen, dann mehrere Stunden im Kühlschrank kühlen.",
          "Kroketten formen und in Mehl, Ei und Semmelbröseln wenden.",
          "Portionsweise bei 175 °C goldbraun und durchgehend heiß frittieren."
        ]
      },
      "variants": [
        "Füllungen mit Pilzen, Käse oder Kabeljau sind ebenfalls verbreitet."
      ],
      "serving": [
        "Heiß als Tapas servieren."
      ],
      "commonMistakes": [
        "Kroketten nicht formen, solange die Füllung warm und weich ist."
      ]
    }
  },
  "moussaka": {
    "en": {
      "overview": "In the Greek version, cooked vegetables and meat sauce are layered beneath a thick white sauce.",
      "history": "Moussaka belongs to a broader family of dishes in the eastern Mediterranean; the Greek baked version is particularly known for its béchamel layer.",
      "flavor": "Rich meat flavour, soft aubergine and mildly spiced sauce.",
      "technique": "Precook the aubergine and reduce the meat sauce before assembling.",
      "essentials": [
        "2 aubergines",
        "400 g minced meat",
        "1 onion"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 90 min",
        "ingredients": [
          "2 aubergines",
          "400 g minced meat",
          "1 onion",
          "400 g chopped tomatoes",
          "cinnamon",
          "40 g butter",
          "40 g flour",
          "500 ml milk",
          "60 g grated cheese"
        ],
        "steps": [
          "Slice the aubergines, brush with oil and bake at 220 °C until tender.",
          "Brown meat and onion, add tomato and a little cinnamon and reduce.",
          "Make béchamel from butter, flour and milk.",
          "Layer aubergine and meat sauce in a dish and top with béchamel and cheese.",
          "Bake at 190 °C until golden and heated through. Let rest before portioning."
        ]
      },
      "variants": [
        "Potatoes can be included in the layers; lentils can replace meat in a vegetarian version."
      ],
      "serving": [
        "Serve warm with green salad."
      ],
      "commonMistakes": [
        "Avoid watery meat sauce and raw aubergine."
      ]
    },
    "fr": {
      "overview": "Dans la version grecque, des légumes poêlés et une sauce à la viande sont disposés en couches sous une sauce blanche épaisse.",
      "history": "La moussaka appartient à une vaste famille de plats de la Méditerranée orientale ; la version grecque au four est particulièrement connue pour sa couche de béchamel.",
      "flavor": "Saveur prononcée de viande, aubergine tendre et sauce légèrement épicée.",
      "technique": "Précuire l’aubergine et faire réduire la sauce à la viande avant le montage.",
      "essentials": [
        "2 aubergines",
        "400 g de viande hachée",
        "1 oignon"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 90 min",
        "ingredients": [
          "2 aubergines",
          "400 g de viande hachée",
          "1 oignon",
          "400 g de tomates concassées",
          "cannelle",
          "40 g de beurre",
          "40 g de farine",
          "500 ml de lait",
          "60 g de fromage râpé"
        ],
        "steps": [
          "Couper les aubergines en tranches, les badigeonner d’huile et les cuire à 220 °C jusqu’à tendreté.",
          "Faire dorer la viande et l’oignon, ajouter les tomates et un peu de cannelle, puis faire réduire.",
          "Préparer une béchamel avec le beurre, la farine et le lait.",
          "Disposer l’aubergine et la sauce à la viande dans un plat, puis couvrir de béchamel et de fromage.",
          "Cuire à 190 °C jusqu’à ce que le dessus soit doré et l’ensemble bien chaud. Laisser reposer avant de découper."
        ]
      },
      "variants": [
        "Des pommes de terre peuvent entrer dans les couches ; des lentilles peuvent remplacer la viande dans une version végétarienne."
      ],
      "serving": [
        "Servir tiède avec une salade verte."
      ],
      "commonMistakes": [
        "Éviter une sauce à la viande trop liquide et l’aubergine crue."
      ]
    },
    "pt": {
      "overview": "Na versão grega, legumes previamente cozinhados e molho de carne são dispostos em camadas sob um molho branco espesso.",
      "history": "A moussaka pertence a uma família mais ampla de pratos do Mediterrâneo oriental; a versão grega de forno é especialmente conhecida pela camada de béchamel.",
      "flavor": "Sabor intenso a carne, beringela macia e molho suavemente condimentado.",
      "technique": "Pré-cozinhe a beringela e reduza o molho de carne antes de montar.",
      "essentials": [
        "2 beringelas",
        "400 g de carne picada",
        "1 cebola"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 90 min",
        "ingredients": [
          "2 beringelas",
          "400 g de carne picada",
          "1 cebola",
          "400 g de tomate picado",
          "canela",
          "40 g de manteiga",
          "40 g de farinha",
          "500 ml de leite",
          "60 g de queijo ralado"
        ],
        "steps": [
          "Corte as beringelas em fatias, pincele com azeite e leve ao forno a 220 °C até ficarem tenras.",
          "Doure a carne e a cebola, junte tomate e um pouco de canela e deixe reduzir.",
          "Prepare um béchamel com manteiga, farinha e leite.",
          "Disponha a beringela e o molho de carne em camadas num tabuleiro e cubra com béchamel e queijo.",
          "Leve ao forno a 190 °C até dourar e estar bem quente. Deixe repousar antes de cortar."
        ]
      },
      "variants": [
        "As batatas podem integrar as camadas; as lentilhas podem substituir a carne numa versão vegetariana."
      ],
      "serving": [
        "Sirva morna com salada verde."
      ],
      "commonMistakes": [
        "Evite molho de carne aguado e beringela crua."
      ]
    },
    "es": {
      "overview": "En la versión griega, las verduras cocinadas y la salsa de carne se disponen en capas bajo una salsa blanca espesa.",
      "history": "La musaca forma parte de una familia más amplia de platos del Mediterráneo oriental; la versión griega al horno es especialmente conocida por su capa de bechamel.",
      "flavor": "Sabor intenso a carne, berenjena tierna y salsa suavemente especiada.",
      "technique": "Cocina previamente la berenjena y reduce la salsa de carne antes de montar.",
      "essentials": [
        "2 berenjenas",
        "400 g de carne picada",
        "1 cebolla"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 90 min",
        "ingredients": [
          "2 berenjenas",
          "400 g de carne picada",
          "1 cebolla",
          "400 g de tomates troceados",
          "canela",
          "40 g de mantequilla",
          "40 g de harina",
          "500 ml de leche",
          "60 g de queso rallado"
        ],
        "steps": [
          "Corta las berenjenas en rodajas, pincela con aceite y hornea a 220 °C hasta que estén tiernas.",
          "Dora la carne y la cebolla, añade tomate y un poco de canela y deja reducir.",
          "Prepara una bechamel con mantequilla, harina y leche.",
          "Coloca la berenjena y la salsa de carne en una fuente y cubre con bechamel y queso.",
          "Hornea a 190 °C hasta que esté dorada y bien caliente. Deja reposar antes de cortar en porciones."
        ]
      },
      "variants": [
        "Las patatas pueden formar parte de las capas; las lentejas pueden sustituir la carne en una versión vegetariana."
      ],
      "serving": [
        "Sirve templada con ensalada verde."
      ],
      "commonMistakes": [
        "Evita una salsa de carne aguada y la berenjena cruda."
      ]
    },
    "de": {
      "overview": "In der griechischen Variante werden gebratene Gemüse und Fleischsauce unter einer dicken weißen Sauce geschichtet.",
      "history": "Moussaka gehört zu einer größeren Familie von Gerichten des östlichen Mittelmeerraums; die griechische Ofenvariante ist besonders für ihre Béchamelschicht bekannt.",
      "flavor": "Kräftiger Fleischgeschmack, weiche Aubergine und mild gewürzte Sauce.",
      "technique": "Auberginen vorgaren und Fleischsauce einkochen, bevor das Gericht geschichtet wird.",
      "essentials": [
        "2 Auberginen",
        "400 g Hackfleisch",
        "1 Zwiebel"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 90 Min.",
        "ingredients": [
          "2 Auberginen",
          "400 g Hackfleisch",
          "1 Zwiebel",
          "400 g gehackte Tomaten",
          "Zimt",
          "40 g Butter",
          "40 g Mehl",
          "500 ml Milch",
          "60 g geriebener Käse"
        ],
        "steps": [
          "Auberginen in Scheiben schneiden, mit Öl bestreichen und bei 220 °C weich backen.",
          "Fleisch und Zwiebel anbräunen, Tomaten und etwas Zimt hinzufügen und einkochen.",
          "Béchamel aus Butter, Mehl und Milch zubereiten.",
          "Auberginen und Fleischsauce in eine Form schichten, mit Béchamel und Käse bedecken.",
          "Bei 190 °C goldbraun und durchgehend heiß backen. Vor dem Portionieren ruhen lassen."
        ]
      },
      "variants": [
        "Kartoffeln können Teil der Schichten sein; Linsen können in einer vegetarischen Variante das Fleisch ersetzen."
      ],
      "serving": [
        "Lauwarm mit grünem Salat servieren."
      ],
      "commonMistakes": [
        "Wässrige Fleischsauce und rohe Auberginen vermeiden."
      ]
    }
  },
  "souvlaki": {
    "en": {
      "overview": "Small marinated pieces of meat are grilled on skewers and served with bread or on a plate.",
      "history": "Souvlaki is a widespread Greek street food; kalamaki is used in Athens, among other places, to refer to the meat skewer.",
      "flavor": "Juicy, tangy and herbal.",
      "technique": "Cut the meat into evenly sized pieces and grill until cooked through.",
      "essentials": [
        "600 g boneless chicken thigh",
        "2 tbsp olive oil",
        "1 lemon"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30 min + marinating",
        "ingredients": [
          "600 g boneless chicken thigh",
          "2 tbsp olive oil",
          "1 lemon",
          "2 garlic cloves",
          "2 tsp oregano",
          "salt",
          "pitta bread"
        ],
        "steps": [
          "Cut the meat into pieces and marinate in oil, lemon, garlic and oregano in the refrigerator.",
          "Thread the meat onto skewers.",
          "Grill or fry until cooked through.",
          "Serve with warm pitta bread, vegetables and tzatziki."
        ]
      },
      "variants": [
        "Pork is also common; other versions use lamb or vegetables."
      ],
      "serving": [
        "Serve with tomato, onion and tzatziki."
      ],
      "commonMistakes": [
        "Do not use marinade from raw meat as a cold sauce."
      ]
    },
    "fr": {
      "overview": "De petits morceaux de viande marinée sont grillés en brochettes et servis avec du pain ou à l’assiette.",
      "history": "Le souvlaki est un plat de rue grec répandu ; le terme kalamaki désigne la brochette de viande, notamment à Athènes.",
      "flavor": "Juteux, acidulé et herbacé.",
      "technique": "Couper la viande en morceaux réguliers et griller jusqu’à cuisson complète.",
      "essentials": [
        "600 g de hauts de cuisse de poulet désossés",
        "2 c. à soupe d’huile d’olive",
        "1 citron"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30 min + marinade",
        "ingredients": [
          "600 g de hauts de cuisse de poulet désossés",
          "2 c. à soupe d’huile d’olive",
          "1 citron",
          "2 gousses d’ail",
          "2 c. à café d’origan",
          "sel",
          "pain pita"
        ],
        "steps": [
          "Couper la viande en morceaux et la faire mariner au réfrigérateur avec de l’huile, du citron, de l’ail et de l’origan.",
          "Enfiler la viande sur des brochettes.",
          "Griller ou poêler jusqu’à cuisson complète.",
          "Servir avec du pain pita chaud, des légumes et du tzatziki."
        ]
      },
      "variants": [
        "Le porc est également courant ; d’autres variantes utilisent de l’agneau ou des légumes."
      ],
      "serving": [
        "Servir avec de la tomate, de l’oignon et du tzatziki."
      ],
      "commonMistakes": [
        "Ne pas utiliser comme sauce froide une marinade ayant été en contact avec de la viande crue."
      ]
    },
    "pt": {
      "overview": "Pequenos pedaços de carne marinada são grelhados em espetadas e servidos com pão ou no prato.",
      "history": "O souvlaki é uma comida de rua grega comum; o termo kalamaki designa a espetada de carne, nomeadamente em Atenas.",
      "flavor": "Suculento, ácido e com notas de ervas.",
      "technique": "Corte a carne em pedaços uniformes e grelhe até estar bem cozinhada.",
      "essentials": [
        "600 g de coxa de frango desossada",
        "2 c. de sopa de azeite",
        "1 limão"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30 min + marinada",
        "ingredients": [
          "600 g de coxa de frango desossada",
          "2 c. de sopa de azeite",
          "1 limão",
          "2 dentes de alho",
          "2 c. de chá de orégãos",
          "sal",
          "pão pita"
        ],
        "steps": [
          "Corte a carne em pedaços e marine no frigorífico com azeite, limão, alho e orégãos.",
          "Coloque a carne nos espetos.",
          "Grelhe ou frite até estar bem cozinhada.",
          "Sirva com pão pita quente, legumes e tzatziki."
        ]
      },
      "variants": [
        "A carne de porco também é comum; outras variantes usam borrego ou legumes."
      ],
      "serving": [
        "Sirva com tomate, cebola e tzatziki."
      ],
      "commonMistakes": [
        "Não use a marinada da carne crua como molho frio."
      ]
    },
    "es": {
      "overview": "Pequeños trozos de carne marinada se asan en brochetas y se sirven con pan o en plato.",
      "history": "El souvlaki es una comida callejera griega muy extendida; kalamaki designa la brocheta de carne, entre otros lugares en Atenas.",
      "flavor": "Jugoso, ácido y con notas de hierbas.",
      "technique": "Corta la carne en trozos iguales y asa hasta que esté hecha por dentro.",
      "essentials": [
        "600 g de contramuslo de pollo deshuesado",
        "2 cucharadas de aceite de oliva",
        "1 limón"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30 min + marinado",
        "ingredients": [
          "600 g de contramuslo de pollo deshuesado",
          "2 cucharadas de aceite de oliva",
          "1 limón",
          "2 dientes de ajo",
          "2 cucharaditas de orégano",
          "sal",
          "pan de pita"
        ],
        "steps": [
          "Corta la carne en trozos y marina en el frigorífico con aceite, limón, ajo y orégano.",
          "Ensarta la carne en brochetas.",
          "Asa o fríe hasta que esté hecha por dentro.",
          "Sirve con pan de pita caliente, verduras y tzatziki."
        ]
      },
      "variants": [
        "El cerdo también es habitual; otras variantes utilizan cordero o verduras."
      ],
      "serving": [
        "Sirve con tomate, cebolla y tzatziki."
      ],
      "commonMistakes": [
        "No uses el marinado de carne cruda como salsa fría."
      ]
    },
    "de": {
      "overview": "Kleine marinierte Fleischstücke werden auf Spießen gegrillt und mit Brot oder als Tellergericht serviert.",
      "history": "Souvlaki ist verbreitetes griechisches Streetfood; Kalamaki bezeichnet unter anderem in Athen den Fleischspieß.",
      "flavor": "Saftig, säuerlich und kräuterbetont.",
      "technique": "Fleisch in gleich große Stücke schneiden und vollständig durchgrillen.",
      "essentials": [
        "600 g Hähnchenschenkelfilet",
        "2 EL Olivenöl",
        "1 Zitrone"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30 Min. + Marinierzeit",
        "ingredients": [
          "600 g Hähnchenschenkelfilet",
          "2 EL Olivenöl",
          "1 Zitrone",
          "2 Knoblauchzehen",
          "2 TL Oregano",
          "Salz",
          "Pitabrot"
        ],
        "steps": [
          "Fleisch in Stücke schneiden und mit Öl, Zitrone, Knoblauch und Oregano im Kühlschrank marinieren.",
          "Fleisch auf Spieße stecken.",
          "Grillen oder vollständig durchbraten.",
          "Mit warmem Pitabrot, Gemüse und Tzatziki servieren."
        ]
      },
      "variants": [
        "Schweinefleisch ist ebenfalls verbreitet; andere Varianten verwenden Lamm oder Gemüse."
      ],
      "serving": [
        "Mit Tomate, Zwiebel und Tzatziki servieren."
      ],
      "commonMistakes": [
        "Marinade von rohem Fleisch nicht als kalte Sauce verwenden."
      ]
    }
  },
  "gyros": {
    "en": {
      "overview": "The meat is often served in pitta with onion, tomato and tzatziki.",
      "history": "Gyros is central to Greek grilling and street-food culture, with similarities to döner and shawarma.",
      "flavor": "Roasted, juicy and spiced.",
      "technique": "At home, thin marinated strips of meat can be fried over high heat; this imitates the flavour, not the grilling method itself.",
      "essentials": [
        "600 g boneless chicken thigh",
        "2 tbsp olive oil",
        "1 tbsp lemon juice"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 35 min + marinating",
        "ingredients": [
          "600 g boneless chicken thigh",
          "2 tbsp olive oil",
          "1 tbsp lemon juice",
          "garlic",
          "oregano",
          "paprika powder",
          "4 pitta breads",
          "tomato",
          "red onion",
          "tzatziki"
        ],
        "steps": [
          "Cut the meat into thin strips.",
          "Marinate in oil, lemon and spices in the refrigerator.",
          "Fry in small batches until cooked through and browned.",
          "Fill warm pitta with meat, vegetables and tzatziki."
        ]
      },
      "variants": [
        "Pork or chicken gyros is widespread; chips may be included in the pitta."
      ],
      "serving": [
        "Serve in pitta or as a plated dish."
      ],
      "commonMistakes": [
        "Do not overcrowd the pan."
      ]
    },
    "fr": {
      "overview": "La viande est souvent servie dans un pain pita avec de l’oignon, de la tomate et du tzatziki.",
      "history": "Le gyros occupe une place centrale dans la culture grecque des grillades et de la cuisine de rue, avec des similitudes avec le döner et le shawarma.",
      "flavor": "Grillé, juteux et épicé.",
      "technique": "À la maison, de fines lanières de viande marinée peuvent être saisies à feu vif ; cela imite la saveur, et non le mode de cuisson sur broche.",
      "essentials": [
        "600 g de hauts de cuisse de poulet désossés",
        "2 c. à soupe d’huile d’olive",
        "1 c. à soupe de jus de citron"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 35 min + marinade",
        "ingredients": [
          "600 g de hauts de cuisse de poulet désossés",
          "2 c. à soupe d’huile d’olive",
          "1 c. à soupe de jus de citron",
          "ail",
          "origan",
          "paprika en poudre",
          "4 pains pita",
          "tomate",
          "oignon rouge",
          "tzatziki"
        ],
        "steps": [
          "Couper la viande en fines lanières.",
          "Faire mariner au réfrigérateur avec de l’huile, du citron et des épices.",
          "Faire revenir par petites quantités jusqu’à ce que la viande soit cuite à cœur et dorée.",
          "Garnir le pain pita chaud de viande, de légumes et de tzatziki."
        ]
      },
      "variants": [
        "Le gyros au porc ou au poulet est répandu ; des frites peuvent garnir le pain pita."
      ],
      "serving": [
        "Servir dans un pain pita ou à l’assiette."
      ],
      "commonMistakes": [
        "Ne pas surcharger la poêle."
      ]
    },
    "pt": {
      "overview": "A carne é frequentemente servida em pão pita com cebola, tomate e tzatziki.",
      "history": "O gyros ocupa um lugar central na cultura grega de grelhados e comida de rua, com semelhanças ao döner e ao shawarma.",
      "flavor": "Tostado, suculento e condimentado.",
      "technique": "Em casa, tiras finas de carne marinada podem ser salteadas em lume forte; isto imita o sabor, não o próprio método de grelhar.",
      "essentials": [
        "600 g de coxa de frango desossada",
        "2 c. de sopa de azeite",
        "1 c. de sopa de sumo de limão"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 35 min + marinada",
        "ingredients": [
          "600 g de coxa de frango desossada",
          "2 c. de sopa de azeite",
          "1 c. de sopa de sumo de limão",
          "alho",
          "orégãos",
          "pimentão em pó",
          "4 pães pita",
          "tomate",
          "cebola roxa",
          "tzatziki"
        ],
        "steps": [
          "Corte a carne em tiras finas.",
          "Marine no frigorífico com azeite, limão e especiarias.",
          "Salteie em pequenas porções até a carne estar bem cozinhada e dourada.",
          "Recheie o pão pita quente com carne, legumes e tzatziki."
        ]
      },
      "variants": [
        "O gyros de porco ou frango é comum; a pita pode incluir batatas fritas."
      ],
      "serving": [
        "Sirva em pita ou no prato."
      ],
      "commonMistakes": [
        "Não encha demasiado a frigideira."
      ]
    },
    "es": {
      "overview": "La carne se suele servir en pita con cebolla, tomate y tzatziki.",
      "history": "El gyros ocupa un lugar central en la cultura griega de parrilla y comida callejera, con similitudes con el döner y el shawarma.",
      "flavor": "Tostado, jugoso y especiado.",
      "technique": "En casa se pueden saltear tiras finas de carne marinada a fuego fuerte; esto imita el sabor, no el propio método de asado.",
      "essentials": [
        "600 g de contramuslo de pollo deshuesado",
        "2 cucharadas de aceite de oliva",
        "1 cucharada de zumo de limón"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 35 min + marinado",
        "ingredients": [
          "600 g de contramuslo de pollo deshuesado",
          "2 cucharadas de aceite de oliva",
          "1 cucharada de zumo de limón",
          "ajo",
          "orégano",
          "pimentón",
          "4 panes de pita",
          "tomate",
          "cebolla morada",
          "tzatziki"
        ],
        "steps": [
          "Corta la carne en tiras finas.",
          "Marina en el frigorífico con aceite, limón y especias.",
          "Saltea en tandas pequeñas hasta que la carne esté hecha por dentro y dorada.",
          "Rellena la pita caliente con carne, verduras y tzatziki."
        ]
      },
      "variants": [
        "El gyros de cerdo o pollo es habitual; la pita puede llevar patatas fritas."
      ],
      "serving": [
        "Sirve en pita o en plato."
      ],
      "commonMistakes": [
        "No llenes demasiado la sartén."
      ]
    },
    "de": {
      "overview": "Das Fleisch wird häufig in Pita mit Zwiebeln, Tomaten und Tzatziki serviert.",
      "history": "Gyros ist ein zentraler Bestandteil der griechischen Grill- und Streetfood-Kultur und weist Ähnlichkeiten mit Döner und Schawarma auf.",
      "flavor": "Röstig, saftig und würzig.",
      "technique": "Zu Hause können dünne marinierte Fleischstreifen bei hoher Hitze gebraten werden; das ahmt den Geschmack nach, nicht die eigentliche Grillmethode.",
      "essentials": [
        "600 g Hähnchenschenkelfilet",
        "2 EL Olivenöl",
        "1 EL Zitronensaft"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 35 Min. + Marinierzeit",
        "ingredients": [
          "600 g Hähnchenschenkelfilet",
          "2 EL Olivenöl",
          "1 EL Zitronensaft",
          "Knoblauch",
          "Oregano",
          "Paprikapulver",
          "4 Pitabrote",
          "Tomate",
          "rote Zwiebel",
          "Tzatziki"
        ],
        "steps": [
          "Fleisch in dünne Streifen schneiden.",
          "Mit Öl, Zitrone und Gewürzen im Kühlschrank marinieren.",
          "Portionsweise vollständig durchbraten und bräunen.",
          "Warmes Pitabrot mit Fleisch, Gemüse und Tzatziki füllen."
        ]
      },
      "variants": [
        "Gyros aus Schweinefleisch oder Hähnchen ist verbreitet; Pommes frites können in der Pita enthalten sein."
      ],
      "serving": [
        "In Pita oder als Tellergericht servieren."
      ],
      "commonMistakes": [
        "Pfanne nicht überfüllen."
      ]
    }
  },
  "spanakopita": {
    "en": {
      "overview": "Thin pastry sheets enclose a salty, herb-flavoured filling.",
      "history": "Spanakopita belongs to the Greek tradition of filled pies, which come in many shapes and sizes.",
      "flavor": "Crisp layers, juicy spinach and salty feta.",
      "technique": "Squeeze excess liquid from the spinach and lightly brush the pastry sheets with oil.",
      "essentials": [
        "250 g filo pastry",
        "500 g spinach",
        "200 g feta"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 60 min",
        "ingredients": [
          "250 g filo pastry",
          "500 g spinach",
          "200 g feta",
          "3 spring onions",
          "dill",
          "2 eggs",
          "olive oil"
        ],
        "steps": [
          "Briefly heat the spinach until wilted; cool and squeeze out the liquid.",
          "Mix with crumbled feta, spring onions, dill and eggs.",
          "Lay several oil-brushed filo sheets in a dish, spread the filling and cover with the remaining sheets.",
          "Bake at 190 °C until golden and the filling has set."
        ]
      },
      "variants": [
        "It can be shaped into small triangles or a large pie."
      ],
      "serving": [
        "Serve warm or at room temperature after brief cooling."
      ],
      "commonMistakes": [
        "Do not let the filo pastry dry out while working."
      ]
    },
    "fr": {
      "overview": "De fines feuilles de pâte entourent une garniture salée aux herbes.",
      "history": "La spanakopita appartient à la tradition grecque des tourtes garnies, qui existent sous de nombreuses formes et tailles.",
      "flavor": "Feuilles croustillantes, épinards moelleux et feta salée.",
      "technique": "Presser les épinards pour retirer l’excédent d’eau et badigeonner légèrement les feuilles de pâte d’huile.",
      "essentials": [
        "250 g de pâte filo",
        "500 g d’épinards",
        "200 g de feta"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 60 min",
        "ingredients": [
          "250 g de pâte filo",
          "500 g d’épinards",
          "200 g de feta",
          "3 oignons nouveaux",
          "aneth",
          "2 œufs",
          "huile d’olive"
        ],
        "steps": [
          "Chauffer brièvement les épinards jusqu’à ce qu’ils tombent ; refroidir et presser pour retirer le liquide.",
          "Mélanger avec la feta émiettée, les oignons nouveaux, l’aneth et les œufs.",
          "Disposer plusieurs feuilles de filo badigeonnées d’huile dans un plat, répartir la garniture et couvrir avec le reste.",
          "Cuire à 190 °C jusqu’à ce que la pâte soit dorée et la garniture prise."
        ]
      },
      "variants": [
        "On peut la façonner en petits triangles ou en grande tourte."
      ],
      "serving": [
        "Servir tiède ou à température ambiante après un bref refroidissement."
      ],
      "commonMistakes": [
        "Ne pas laisser sécher la pâte filo pendant la préparation."
      ]
    },
    "pt": {
      "overview": "Folhas finas de massa envolvem um recheio salgado com ervas.",
      "history": "A spanakopita pertence à tradição grega de tartes recheadas, que existem em muitas formas e tamanhos.",
      "flavor": "Camadas crocantes, espinafres suculentos e feta salgada.",
      "technique": "Esprema o excesso de líquido dos espinafres e pincele ligeiramente as folhas de massa com azeite.",
      "essentials": [
        "250 g de massa filo",
        "500 g de espinafres",
        "200 g de feta"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 60 min",
        "ingredients": [
          "250 g de massa filo",
          "500 g de espinafres",
          "200 g de feta",
          "3 cebolinhas verdes",
          "endro",
          "2 ovos",
          "azeite"
        ],
        "steps": [
          "Aqueça brevemente os espinafres até murcharem; arrefeça e esprema o líquido.",
          "Misture com feta esfarelada, cebolinha verde, endro e ovos.",
          "Coloque várias folhas de filo pinceladas com azeite numa forma, distribua o recheio e cubra com as restantes.",
          "Leve ao forno a 190 °C até dourar e o recheio solidificar."
        ]
      },
      "variants": [
        "Pode ser moldada em pequenos triângulos ou numa tarte grande."
      ],
      "serving": [
        "Sirva morna ou à temperatura ambiente após arrefecer brevemente."
      ],
      "commonMistakes": [
        "Não deixe a massa filo secar durante a preparação."
      ]
    },
    "es": {
      "overview": "Unas láminas finas de masa envuelven un relleno salado con hierbas.",
      "history": "La spanakopita pertenece a la tradición griega de pasteles rellenos, que existen en muchas formas y tamaños.",
      "flavor": "Capas crujientes, espinacas jugosas y feta salado.",
      "technique": "Exprime el exceso de líquido de las espinacas y pincela ligeramente las láminas de masa con aceite.",
      "essentials": [
        "250 g de masa filo",
        "500 g de espinacas",
        "200 g de feta"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 60 min",
        "ingredients": [
          "250 g de masa filo",
          "500 g de espinacas",
          "200 g de feta",
          "3 cebolletas",
          "eneldo",
          "2 huevos",
          "aceite de oliva"
        ],
        "steps": [
          "Calienta brevemente las espinacas hasta que reduzcan su volumen; enfría y exprime el líquido.",
          "Mezcla con feta desmenuzado, cebolletas, eneldo y huevos.",
          "Coloca varias hojas de filo pinceladas con aceite en una fuente, reparte el relleno y cubre con las restantes.",
          "Hornea a 190 °C hasta que esté dorada y el relleno haya cuajado."
        ]
      },
      "variants": [
        "Puede formarse en triángulos pequeños o en un pastel grande."
      ],
      "serving": [
        "Sirve templada o a temperatura ambiente tras enfriar brevemente."
      ],
      "commonMistakes": [
        "No dejes que la masa filo se seque durante la preparación."
      ]
    },
    "de": {
      "overview": "Dünne Teigblätter umschließen eine salzige, kräuterbetonte Füllung.",
      "history": "Spanakopita gehört zur griechischen Tradition gefüllter Pasteten, die es in vielen Formen und Größen gibt.",
      "flavor": "Knusprige Schichten, saftiger Spinat und salziger Feta.",
      "technique": "Überschüssige Flüssigkeit aus dem Spinat drücken und die Teigblätter leicht mit Öl bestreichen.",
      "essentials": [
        "250 g Filoteig",
        "500 g Spinat",
        "200 g Feta"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 60 Min.",
        "ingredients": [
          "250 g Filoteig",
          "500 g Spinat",
          "200 g Feta",
          "3 Frühlingszwiebeln",
          "Dill",
          "2 Eier",
          "Olivenöl"
        ],
        "steps": [
          "Spinat kurz erhitzen, bis er zusammenfällt; abkühlen lassen und Flüssigkeit ausdrücken.",
          "Mit zerbröckeltem Feta, Frühlingszwiebeln, Dill und Eiern mischen.",
          "Mehrere mit Öl bestrichene Filoblätter in eine Form legen, Füllung verteilen und mit den restlichen Blättern bedecken.",
          "Bei 190 °C backen, bis der Teig goldbraun und die Füllung gestockt ist."
        ]
      },
      "variants": [
        "Kann als kleine Dreiecke oder große Pastete geformt werden."
      ],
      "serving": [
        "Nach kurzem Abkühlen lauwarm oder bei Zimmertemperatur servieren."
      ],
      "commonMistakes": [
        "Filoteig bei der Verarbeitung nicht austrocknen lassen."
      ]
    }
  },
  "tzatziki": {
    "en": {
      "overview": "Thick yoghurt is mixed with drained, grated cucumber and aromatics.",
      "history": "Tzatziki is served as mezze and with grilled food in Greek food culture; related yoghurt sauces exist in the region.",
      "flavor": "Fresh, creamy, tangy and garlicky.",
      "technique": "Remove excess liquid from the cucumber before mixing it in.",
      "essentials": [
        "400 g Greek yoghurt",
        "1 cucumber",
        "1–2 garlic cloves"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 15 min",
        "ingredients": [
          "400 g Greek yoghurt",
          "1 cucumber",
          "1–2 garlic cloves",
          "1 tbsp olive oil",
          "1 tbsp lemon juice",
          "dill, optional",
          "salt"
        ],
        "steps": [
          "Grate the cucumber and squeeze out the liquid.",
          "Mix yoghurt, cucumber and finely grated garlic.",
          "Add oil, lemon and salt to taste.",
          "Chill until serving."
        ]
      },
      "variants": [
        "Dill, mint or vinegar are used in different versions."
      ],
      "serving": [
        "Serve with bread, vegetables, souvlaki or gyros."
      ],
      "commonMistakes": [
        "Do not use cucumber without draining it."
      ]
    },
    "fr": {
      "overview": "Du yaourt épais est mélangé à du concombre râpé et égoutté ainsi qu’à des aromates.",
      "history": "Le tzatziki est servi en mezzé et avec des grillades dans la cuisine grecque ; des sauces au yaourt apparentées existent dans la région.",
      "flavor": "Frais, crémeux, acidulé et marqué par l’ail.",
      "technique": "Retirer l’excédent d’eau du concombre avant de l’incorporer.",
      "essentials": [
        "400 g de yaourt grec",
        "1 concombre",
        "1–2 gousses d’ail"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 15 min",
        "ingredients": [
          "400 g de yaourt grec",
          "1 concombre",
          "1–2 gousses d’ail",
          "1 c. à soupe d’huile d’olive",
          "1 c. à soupe de jus de citron",
          "aneth, facultatif",
          "sel"
        ],
        "steps": [
          "Râper le concombre et presser pour retirer le liquide.",
          "Mélanger le yaourt, le concombre et l’ail finement râpé.",
          "Ajouter l’huile, le citron et le sel selon le goût.",
          "Réfrigérer jusqu’au moment de servir."
        ]
      },
      "variants": [
        "L’aneth, la menthe ou le vinaigre sont utilisés dans différentes variantes."
      ],
      "serving": [
        "Servir avec du pain, des légumes, du souvlaki ou du gyros."
      ],
      "commonMistakes": [
        "Ne pas utiliser le concombre sans l’égoutter."
      ]
    },
    "pt": {
      "overview": "Iogurte espesso é misturado com pepino ralado e escorrido e aromáticos.",
      "history": "O tzatziki é servido como meze e com grelhados na cultura gastronómica grega; existem molhos de iogurte semelhantes na região.",
      "flavor": "Fresco, cremoso, ácido e com sabor a alho.",
      "technique": "Retire o excesso de líquido do pepino antes de o incorporar.",
      "essentials": [
        "400 g de iogurte grego",
        "1 pepino",
        "1–2 dentes de alho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 15 min",
        "ingredients": [
          "400 g de iogurte grego",
          "1 pepino",
          "1–2 dentes de alho",
          "1 c. de sopa de azeite",
          "1 c. de sopa de sumo de limão",
          "endro, opcional",
          "sal"
        ],
        "steps": [
          "Rale o pepino e esprema o líquido.",
          "Misture iogurte, pepino e alho finamente ralado.",
          "Junte azeite, limão e sal a gosto.",
          "Refrigere até servir."
        ]
      },
      "variants": [
        "Endro, hortelã ou vinagre são usados em diferentes versões."
      ],
      "serving": [
        "Sirva com pão, legumes, souvlaki ou gyros."
      ],
      "commonMistakes": [
        "Não use pepino sem o deixar escorrer."
      ]
    },
    "es": {
      "overview": "El yogur espeso se mezcla con pepino rallado y escurrido y aromáticos.",
      "history": "El tzatziki se sirve como mezze y con platos a la parrilla en la cocina griega; en la región existen salsas de yogur relacionadas.",
      "flavor": "Fresco, cremoso, ácido y con sabor a ajo.",
      "technique": "Retira el exceso de líquido del pepino antes de incorporarlo.",
      "essentials": [
        "400 g de yogur griego",
        "1 pepino",
        "1–2 dientes de ajo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 15 min",
        "ingredients": [
          "400 g de yogur griego",
          "1 pepino",
          "1–2 dientes de ajo",
          "1 cucharada de aceite de oliva",
          "1 cucharada de zumo de limón",
          "eneldo, opcional",
          "sal"
        ],
        "steps": [
          "Ralla el pepino y exprime el líquido.",
          "Mezcla yogur, pepino y ajo rallado fino.",
          "Añade aceite, limón y sal al gusto.",
          "Refrigera hasta servir."
        ]
      },
      "variants": [
        "Eneldo, menta o vinagre se utilizan en distintas variantes."
      ],
      "serving": [
        "Sirve con pan, verduras, souvlaki o gyros."
      ],
      "commonMistakes": [
        "No uses el pepino sin escurrirlo."
      ]
    },
    "de": {
      "overview": "Dicker Joghurt wird mit abgetropfter, geriebener Gurke und Aromaten vermischt.",
      "history": "Tzatziki wird in der griechischen Esskultur als Mezze und zu Grillgerichten serviert; verwandte Joghurtsaucen gibt es in der Region.",
      "flavor": "Frisch, cremig, säuerlich und knoblauchbetont.",
      "technique": "Überschüssige Flüssigkeit aus der Gurke entfernen, bevor sie untergemischt wird.",
      "essentials": [
        "400 g griechischer Joghurt",
        "1 Gurke",
        "1–2 Knoblauchzehen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 15 Min.",
        "ingredients": [
          "400 g griechischer Joghurt",
          "1 Gurke",
          "1–2 Knoblauchzehen",
          "1 EL Olivenöl",
          "1 EL Zitronensaft",
          "Dill, optional",
          "Salz"
        ],
        "steps": [
          "Gurke reiben und Flüssigkeit ausdrücken.",
          "Joghurt, Gurke und fein geriebenen Knoblauch verrühren.",
          "Öl, Zitrone und Salz nach Geschmack hinzufügen.",
          "Bis zum Servieren kühlen."
        ]
      },
      "variants": [
        "Dill, Minze oder Essig werden in verschiedenen Varianten verwendet."
      ],
      "serving": [
        "Mit Brot, Gemüse, Souvlaki oder Gyros servieren."
      ],
      "commonMistakes": [
        "Gurke nicht ohne Abtropfen verwenden."
      ]
    }
  },
  "pastitsio": {
    "en": {
      "overview": "Tubular pasta, meat sauce and white sauce are layered in a dish and gratinated.",
      "history": "Pastitsio is a well-known Greek family dish with features of Mediterranean baked-pasta traditions.",
      "flavor": "Rich, creamy and aromatic with warm spices.",
      "technique": "Cook the pasta for slightly less time than usual and let the meat sauce thicken.",
      "essentials": [
        "350 g tubular pasta",
        "400 g minced meat",
        "1 onion"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 90 min",
        "ingredients": [
          "350 g tubular pasta",
          "400 g minced meat",
          "1 onion",
          "400 g tomatoes",
          "cinnamon",
          "40 g butter",
          "40 g flour",
          "500 ml milk",
          "80 g grated cheese"
        ],
        "steps": [
          "Cook the pasta until almost tender and drain.",
          "Brown meat and onion, add tomato and cinnamon and reduce.",
          "Make béchamel from butter, flour and milk.",
          "Layer pasta, meat sauce and béchamel in a dish and top with cheese.",
          "Bake at 190 °C until golden and heated through; let rest before portioning."
        ]
      },
      "variants": [
        "Long pastitsio tubes are traditional, but other tubular pasta shapes can be used at home."
      ],
      "serving": [
        "Serve with salad."
      ],
      "commonMistakes": [
        "Do not overcook the pasta before baking."
      ]
    },
    "fr": {
      "overview": "Des pâtes tubulaires, une sauce à la viande et une sauce blanche sont disposées en couches dans un plat et gratinées.",
      "history": "Le pastitsio est un plat familial grec bien connu qui s’inscrit dans les traditions méditerranéennes des pâtes au four.",
      "flavor": "Généreux, crémeux et aromatique, aux épices chaudes.",
      "technique": "Cuire les pâtes un peu moins longtemps que d’habitude et laisser épaissir la sauce à la viande.",
      "essentials": [
        "350 g de pâtes tubulaires",
        "400 g de viande hachée",
        "1 oignon"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 90 min",
        "ingredients": [
          "350 g de pâtes tubulaires",
          "400 g de viande hachée",
          "1 oignon",
          "400 g de tomates",
          "cannelle",
          "40 g de beurre",
          "40 g de farine",
          "500 ml de lait",
          "80 g de fromage râpé"
        ],
        "steps": [
          "Cuire les pâtes jusqu’à ce qu’elles soient presque tendres, puis les égoutter.",
          "Faire dorer la viande et l’oignon, ajouter les tomates et la cannelle, puis faire réduire.",
          "Préparer une béchamel avec le beurre, la farine et le lait.",
          "Disposer les pâtes, la sauce à la viande et la béchamel en couches dans un plat, puis couvrir de fromage.",
          "Cuire à 190 °C jusqu’à ce que le dessus soit doré et l’ensemble bien chaud ; laisser reposer avant de découper."
        ]
      },
      "variants": [
        "Les longues pâtes tubulaires à pastitsio sont traditionnelles, mais d’autres pâtes tubulaires peuvent être utilisées à la maison."
      ],
      "serving": [
        "Servir avec de la salade."
      ],
      "commonMistakes": [
        "Ne pas trop cuire les pâtes avant le passage au four."
      ]
    },
    "pt": {
      "overview": "Massa tubular, molho de carne e molho branco são dispostos em camadas num tabuleiro e gratinados.",
      "history": "O pastitsio é um conhecido prato familiar grego com características das tradições mediterrânicas de massa no forno.",
      "flavor": "Encorpado, cremoso e aromático, com especiarias quentes.",
      "technique": "Coza a massa durante um pouco menos de tempo que o habitual e deixe engrossar o molho de carne.",
      "essentials": [
        "350 g de massa tubular",
        "400 g de carne picada",
        "1 cebola"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 90 min",
        "ingredients": [
          "350 g de massa tubular",
          "400 g de carne picada",
          "1 cebola",
          "400 g de tomate",
          "canela",
          "40 g de manteiga",
          "40 g de farinha",
          "500 ml de leite",
          "80 g de queijo ralado"
        ],
        "steps": [
          "Coza a massa até ficar quase tenra e escorra.",
          "Doure a carne e a cebola, junte tomate e canela e deixe reduzir.",
          "Prepare um béchamel com manteiga, farinha e leite.",
          "Disponha massa, molho de carne e béchamel em camadas num tabuleiro e cubra com queijo.",
          "Leve ao forno a 190 °C até dourar e estar bem quente; deixe repousar antes de cortar."
        ]
      },
      "variants": [
        "Os tubos longos de pastitsio são tradicionais, mas outros tipos de massa tubular podem ser usados em casa."
      ],
      "serving": [
        "Sirva com salada."
      ],
      "commonMistakes": [
        "Não coza demasiado a massa antes de a levar ao forno."
      ]
    },
    "es": {
      "overview": "La pasta tubular, la salsa de carne y la salsa blanca se disponen en capas en una fuente y se gratinan.",
      "history": "El pastitsio es un conocido plato familiar griego con rasgos de las tradiciones mediterráneas de pasta al horno.",
      "flavor": "Intenso, cremoso y aromático, con especias cálidas.",
      "technique": "Cuece la pasta un poco menos de lo habitual y deja espesar la salsa de carne.",
      "essentials": [
        "350 g de pasta tubular",
        "400 g de carne picada",
        "1 cebolla"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 90 min",
        "ingredients": [
          "350 g de pasta tubular",
          "400 g de carne picada",
          "1 cebolla",
          "400 g de tomates",
          "canela",
          "40 g de mantequilla",
          "40 g de harina",
          "500 ml de leche",
          "80 g de queso rallado"
        ],
        "steps": [
          "Cuece la pasta hasta que esté casi tierna y escurre.",
          "Dora la carne y la cebolla, añade tomate y canela y deja reducir.",
          "Prepara una bechamel con mantequilla, harina y leche.",
          "Coloca pasta, salsa de carne y bechamel en capas en una fuente y cubre con queso.",
          "Hornea a 190 °C hasta que esté dorado y bien caliente; deja reposar antes de cortar en porciones."
        ]
      },
      "variants": [
        "Los tubos largos de pastitsio son tradicionales, pero en casa pueden usarse otras pastas tubulares."
      ],
      "serving": [
        "Sirve con ensalada."
      ],
      "commonMistakes": [
        "No cuezas demasiado la pasta antes de hornearla."
      ]
    },
    "de": {
      "overview": "Röhrennudeln, Fleischsauce und weiße Sauce werden in einer Form geschichtet und überbacken.",
      "history": "Pastitsio ist ein bekanntes griechisches Familiengericht mit Merkmalen mediterraner Ofenpastatraditionen.",
      "flavor": "Kräftig, cremig und aromatisch mit warmen Gewürzen.",
      "technique": "Nudeln etwas kürzer als üblich kochen und Fleischsauce eindicken lassen.",
      "essentials": [
        "350 g Röhrennudeln",
        "400 g Hackfleisch",
        "1 Zwiebel"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 90 Min.",
        "ingredients": [
          "350 g Röhrennudeln",
          "400 g Hackfleisch",
          "1 Zwiebel",
          "400 g Tomaten",
          "Zimt",
          "40 g Butter",
          "40 g Mehl",
          "500 ml Milch",
          "80 g geriebener Käse"
        ],
        "steps": [
          "Nudeln fast weich kochen und abtropfen lassen.",
          "Fleisch und Zwiebel anbräunen, Tomaten und Zimt hinzufügen und einkochen.",
          "Béchamel aus Butter, Mehl und Milch zubereiten.",
          "Nudeln, Fleischsauce und Béchamel in einer Form schichten und mit Käse bestreuen.",
          "Bei 190 °C goldbraun und durchgehend heiß backen; vor dem Portionieren ruhen lassen."
        ]
      },
      "variants": [
        "Lange Pastitsio-Röhren sind traditionell, zu Hause können aber auch andere Röhrennudeln verwendet werden."
      ],
      "serving": [
        "Mit Salat servieren."
      ],
      "commonMistakes": [
        "Nudeln vor dem Überbacken nicht zu lange kochen."
      ]
    }
  },
  "nasi-goreng": {
    "en": {
      "overview": "Cooked rice is stir-fried with aromatics, kecap manis and a protein of choice.",
      "history": "Nasi goreng is a widespread Indonesian everyday dish with many local variations.",
      "flavor": "Sweetish, salty and roasted, with chilli to taste.",
      "technique": "Use cooled rice that has been stored safely and fry in small batches.",
      "essentials": [
        "600 g cooked rice",
        "2 shallots",
        "2 garlic cloves"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 25 min",
        "ingredients": [
          "600 g cooked rice",
          "2 shallots",
          "2 garlic cloves",
          "2 tbsp kecap manis",
          "chilli",
          "4 eggs",
          "oil",
          "cucumber"
        ],
        "steps": [
          "Fry the chopped shallots, garlic and chilli.",
          "Add the rice and fry until piping hot.",
          "Fold in the kecap manis and season to taste.",
          "Fry the eggs separately and serve with rice and cucumber."
        ]
      },
      "variants": [
        "Versions with chicken, seafood or goat meat."
      ],
      "serving": [
        "Serve with fried egg, cucumber and krupuk."
      ],
      "commonMistakes": [
        "Do not use rice that has been left at room temperature for a long time."
      ]
    },
    "fr": {
      "overview": "Le riz cuit est sauté au wok avec des aromates, du kecap manis et une source de protéines au choix.",
      "history": "Le nasi goreng est un plat indonésien courant du quotidien, aux nombreuses variantes locales.",
      "flavor": "Légèrement sucré, salé et grillé, avec du piment selon le goût.",
      "technique": "Utiliser du riz refroidi et conservé dans de bonnes conditions, puis le faire sauter par petites quantités.",
      "essentials": [
        "600 g de riz cuit",
        "2 échalotes",
        "2 gousses d’ail"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 25 min",
        "ingredients": [
          "600 g de riz cuit",
          "2 échalotes",
          "2 gousses d’ail",
          "2 c. à soupe de kecap manis",
          "piment",
          "4 œufs",
          "huile",
          "concombre"
        ],
        "steps": [
          "Faire revenir les échalotes, l’ail et le piment hachés.",
          "Ajouter le riz et le faire sauter jusqu’à ce qu’il soit bien chaud et fumant.",
          "Incorporer le kecap manis et rectifier l’assaisonnement.",
          "Cuire les œufs séparément à la poêle et servir avec le riz et le concombre."
        ]
      },
      "variants": [
        "Variantes au poulet, aux fruits de mer ou à la viande de chèvre."
      ],
      "serving": [
        "Servir avec un œuf au plat, du concombre et du krupuk."
      ],
      "commonMistakes": [
        "Ne pas utiliser de riz resté longtemps à température ambiante."
      ]
    },
    "pt": {
      "overview": "O arroz cozido é salteado no wok com aromáticos, kecap manis e uma fonte de proteína à escolha.",
      "history": "O nasi goreng é um prato indonésio comum do quotidiano, com muitas variantes locais.",
      "flavor": "Ligeiramente doce, salgado e tostado, com malagueta a gosto.",
      "technique": "Use arroz arrefecido e conservado em segurança e salteie em pequenas porções.",
      "essentials": [
        "600 g de arroz cozido",
        "2 chalotas",
        "2 dentes de alho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 25 min",
        "ingredients": [
          "600 g de arroz cozido",
          "2 chalotas",
          "2 dentes de alho",
          "2 c. de sopa de kecap manis",
          "malagueta",
          "4 ovos",
          "óleo",
          "pepino"
        ],
        "steps": [
          "Salteie as chalotas, o alho e a malagueta picados.",
          "Junte o arroz e salteie até estar bem quente e a fumegar.",
          "Envolva o kecap manis e tempere a gosto.",
          "Estrele os ovos separadamente e sirva com arroz e pepino."
        ]
      },
      "variants": [
        "Variantes com frango, marisco ou carne de cabra."
      ],
      "serving": [
        "Sirva com ovo estrelado, pepino e krupuk."
      ],
      "commonMistakes": [
        "Não use arroz que tenha ficado muito tempo à temperatura ambiente."
      ]
    },
    "es": {
      "overview": "El arroz cocido se saltea en wok con aromáticos, kecap manis y una proteína a elección.",
      "history": "El nasi goreng es un plato cotidiano indonesio muy extendido, con numerosas variantes locales.",
      "flavor": "Ligeramente dulce, salado y tostado, con chile al gusto.",
      "technique": "Usa arroz enfriado y conservado de forma segura y saltéalo en tandas pequeñas.",
      "essentials": [
        "600 g de arroz cocido",
        "2 chalotas",
        "2 dientes de ajo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 25 min",
        "ingredients": [
          "600 g de arroz cocido",
          "2 chalotas",
          "2 dientes de ajo",
          "2 cucharadas de kecap manis",
          "chile",
          "4 huevos",
          "aceite",
          "pepino"
        ],
        "steps": [
          "Sofríe las chalotas, el ajo y el chile picados.",
          "Añade el arroz y saltéalo hasta que esté bien caliente y humeante.",
          "Incorpora el kecap manis y ajusta la sazón.",
          "Fríe los huevos por separado y sirve con arroz y pepino."
        ]
      },
      "variants": [
        "Variantes con pollo, marisco o carne de cabra."
      ],
      "serving": [
        "Sirve con huevo frito, pepino y krupuk."
      ],
      "commonMistakes": [
        "No uses arroz que haya estado mucho tiempo a temperatura ambiente."
      ]
    },
    "de": {
      "overview": "Gekochter Reis wird mit Aromaten, Kecap Manis und einer Proteinquelle nach Wahl im Wok gebraten.",
      "history": "Nasi Goreng ist ein verbreitetes indonesisches Alltagsgericht mit vielen lokalen Varianten.",
      "flavor": "Süßlich, salzig und röstig, mit Chili nach Geschmack.",
      "technique": "Abgekühlten, sicher gelagerten Reis verwenden und portionsweise braten.",
      "essentials": [
        "600 g gekochter Reis",
        "2 Schalotten",
        "2 Knoblauchzehen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 25 Min.",
        "ingredients": [
          "600 g gekochter Reis",
          "2 Schalotten",
          "2 Knoblauchzehen",
          "2 EL Kecap Manis",
          "Chili",
          "4 Eier",
          "Öl",
          "Gurke"
        ],
        "steps": [
          "Gehackte Schalotten, Knoblauch und Chili anbraten.",
          "Reis hinzufügen und braten, bis er dampfend heiß ist.",
          "Kecap Manis unterheben und abschmecken.",
          "Eier separat braten und mit Reis und Gurke servieren."
        ]
      },
      "variants": [
        "Varianten mit Hähnchen, Meeresfrüchten oder Ziegenfleisch."
      ],
      "serving": [
        "Mit Spiegelei, Gurke und Krupuk servieren."
      ],
      "commonMistakes": [
        "Keinen Reis verwenden, der lange bei Zimmertemperatur gestanden hat."
      ]
    }
  },
  "mie-goreng": {
    "en": {
      "overview": "The noodles are stir-fried with aromatics and sauce; sweet soy sauce is common in Indonesian versions.",
      "history": "Fried noodles are found in many Southeast Asian traditions, including Indonesian mie goreng and Malaysian mee goreng.",
      "flavor": "Sweet-salty, aromatic and slightly hot.",
      "technique": "Prepare the noodles and sauce before heating the wok.",
      "essentials": [
        "350 g wheat noodles",
        "2 eggs",
        "200 g cabbage"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30 min",
        "ingredients": [
          "350 g wheat noodles",
          "2 eggs",
          "200 g cabbage",
          "1 carrot",
          "2 garlic cloves",
          "2 tbsp kecap manis",
          "1 tbsp soy sauce",
          "chilli",
          "oil"
        ],
        "steps": [
          "Cook the noodles according to the instructions and drain.",
          "Fry the garlic, chilli and vegetables.",
          "Add the eggs and cook until set.",
          "Fold in the noodles and sauce and fry quickly over high heat."
        ]
      },
      "variants": [
        "Malaysian mee goreng mamak has its own traditions of spices and ingredients."
      ],
      "serving": [
        "Serve with lime and spring onions."
      ],
      "commonMistakes": [
        "Avoid overcooked noodles and an overcrowded wok."
      ]
    },
    "fr": {
      "overview": "Les nouilles sont sautées au wok avec des aromates et de la sauce ; la sauce soja sucrée est courante dans les versions indonésiennes.",
      "history": "Les nouilles sautées existent dans de nombreuses traditions d’Asie du Sud-Est, notamment le mie goreng indonésien et le mee goreng malaisien.",
      "flavor": "Sucré-salé, aromatique et légèrement piquant.",
      "technique": "Préparer les nouilles et la sauce avant de chauffer le wok.",
      "essentials": [
        "350 g de nouilles de blé",
        "2 œufs",
        "200 g de chou"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30 min",
        "ingredients": [
          "350 g de nouilles de blé",
          "2 œufs",
          "200 g de chou",
          "1 carotte",
          "2 gousses d’ail",
          "2 c. à soupe de kecap manis",
          "1 c. à soupe de sauce soja",
          "piment",
          "huile"
        ],
        "steps": [
          "Cuire les nouilles selon les instructions et les égoutter.",
          "Faire revenir l’ail, le piment et les légumes.",
          "Ajouter les œufs et cuire jusqu’à ce qu’ils prennent.",
          "Incorporer les nouilles et la sauce, puis faire sauter rapidement à feu vif."
        ]
      },
      "variants": [
        "Le mee goreng mamak malaisien possède sa propre tradition d’épices et d’ingrédients."
      ],
      "serving": [
        "Servir avec du citron vert et des oignons nouveaux."
      ],
      "commonMistakes": [
        "Éviter les nouilles trop cuites et un wok surchargé."
      ]
    },
    "pt": {
      "overview": "Os noodles são salteados no wok com aromáticos e molho; o molho de soja doce é comum nas versões indonésias.",
      "history": "Os noodles salteados existem em muitas tradições do Sudeste Asiático, incluindo o mie goreng indonésio e o mee goreng malaio.",
      "flavor": "Doce-salgado, aromático e ligeiramente picante.",
      "technique": "Prepare os noodles e o molho antes de aquecer o wok.",
      "essentials": [
        "350 g de noodles de trigo",
        "2 ovos",
        "200 g de couve"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30 min",
        "ingredients": [
          "350 g de noodles de trigo",
          "2 ovos",
          "200 g de couve",
          "1 cenoura",
          "2 dentes de alho",
          "2 c. de sopa de kecap manis",
          "1 c. de sopa de molho de soja",
          "malagueta",
          "óleo"
        ],
        "steps": [
          "Coza os noodles de acordo com as instruções e escorra.",
          "Salteie o alho, a malagueta e os legumes.",
          "Junte os ovos e cozinhe até solidificarem.",
          "Envolva os noodles e o molho e salteie rapidamente em lume forte."
        ]
      },
      "variants": [
        "O mee goreng mamak malaio tem a sua própria tradição de especiarias e ingredientes."
      ],
      "serving": [
        "Sirva com lima e cebolinha verde."
      ],
      "commonMistakes": [
        "Evite noodles demasiado cozidos e um wok demasiado cheio."
      ]
    },
    "es": {
      "overview": "Los fideos se saltean en wok con aromáticos y salsa; la salsa de soja dulce es habitual en las versiones indonesias.",
      "history": "Los fideos salteados existen en muchas tradiciones del Sudeste Asiático, entre ellas el mie goreng indonesio y el mee goreng malasio.",
      "flavor": "Dulce-salado, aromático y ligeramente picante.",
      "technique": "Prepara los fideos y la salsa antes de calentar el wok.",
      "essentials": [
        "350 g de fideos de trigo",
        "2 huevos",
        "200 g de col"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30 min",
        "ingredients": [
          "350 g de fideos de trigo",
          "2 huevos",
          "200 g de col",
          "1 zanahoria",
          "2 dientes de ajo",
          "2 cucharadas de kecap manis",
          "1 cucharada de salsa de soja",
          "chile",
          "aceite"
        ],
        "steps": [
          "Cuece los fideos según las instrucciones y escúrrelos.",
          "Saltea el ajo, el chile y las verduras.",
          "Añade los huevos y cocina hasta que cuajen.",
          "Incorpora los fideos y la salsa y saltea rápidamente a fuego fuerte."
        ]
      },
      "variants": [
        "El mee goreng mamak malasio tiene su propia tradición de especias e ingredientes."
      ],
      "serving": [
        "Sirve con lima y cebolletas."
      ],
      "commonMistakes": [
        "Evita los fideos demasiado cocidos y un wok demasiado lleno."
      ]
    },
    "de": {
      "overview": "Nudeln werden mit Aromaten und Sauce im Wok gebraten; süße Sojasauce ist in indonesischen Varianten verbreitet.",
      "history": "Gebratene Nudeln gibt es in vielen südostasiatischen Traditionen, darunter indonesisches Mie Goreng und malaysisches Mee Goreng.",
      "flavor": "Süß-salzig, aromatisch und leicht scharf.",
      "technique": "Nudeln und Sauce vorbereiten, bevor der Wok erhitzt wird.",
      "essentials": [
        "350 g Weizennudeln",
        "2 Eier",
        "200 g Kohl"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30 Min.",
        "ingredients": [
          "350 g Weizennudeln",
          "2 Eier",
          "200 g Kohl",
          "1 Karotte",
          "2 Knoblauchzehen",
          "2 EL Kecap Manis",
          "1 EL Sojasauce",
          "Chili",
          "Öl"
        ],
        "steps": [
          "Nudeln nach Anleitung kochen und abtropfen lassen.",
          "Knoblauch, Chili und Gemüse anbraten.",
          "Eier hinzufügen und braten, bis sie stocken.",
          "Nudeln und Sauce unterheben und kurz bei hoher Hitze braten."
        ]
      },
      "variants": [
        "Malaysisches Mee Goreng Mamak hat eine eigene Gewürz- und Zutatentradition."
      ],
      "serving": [
        "Mit Limette und Frühlingszwiebeln servieren."
      ],
      "commonMistakes": [
        "Verkochte Nudeln und einen überfüllten Wok vermeiden."
      ]
    }
  },
  "rendang": {
    "en": {
      "overview": "Meat is simmered in aromatic coconut milk that is gradually reduced.",
      "history": "Rendang comes from the food culture of the Minangkabau people of West Sumatra and is associated with celebrations and hospitality.",
      "flavor": "Deep, spiced, rich and aromatic.",
      "technique": "Let the liquid reduce slowly and stir more often towards the end.",
      "essentials": [
        "700 g stewing beef",
        "600 ml coconut milk",
        "4 shallots"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 3–4 hours",
        "ingredients": [
          "700 g stewing beef",
          "600 ml coconut milk",
          "4 shallots",
          "3 garlic cloves",
          "galangal",
          "ginger",
          "lemongrass",
          "chilli",
          "makrut lime leaves"
        ],
        "steps": [
          "Grind the shallots, garlic, galangal, ginger and chilli into a paste.",
          "Fry the paste and add coconut milk, meat, lemongrass and lime leaves.",
          "Simmer until the meat is tender and the liquid has reduced.",
          "Stir regularly towards the end until the sauce coats the meat closely."
        ]
      },
      "variants": [
        "Kalio has more sauce than a drier rendang."
      ],
      "serving": [
        "Serve with rice and vegetables."
      ],
      "commonMistakes": [
        "Do not use such high heat that the concentrated spice mixture burns."
      ]
    },
    "fr": {
      "overview": "La viande mijote dans un lait de coco aromatique que l’on fait progressivement réduire.",
      "history": "Le rendang vient de la culture culinaire du peuple minangkabau de Sumatra occidental et est associé aux fêtes et à l’hospitalité.",
      "flavor": "Profond, épicé, généreux et aromatique.",
      "technique": "Laisser le liquide réduire lentement et remuer plus souvent en fin de cuisson.",
      "essentials": [
        "700 g de bœuf à mijoter",
        "600 ml de lait de coco",
        "4 échalotes"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 3–4 heures",
        "ingredients": [
          "700 g de bœuf à mijoter",
          "600 ml de lait de coco",
          "4 échalotes",
          "3 gousses d’ail",
          "galanga",
          "gingembre",
          "citronnelle",
          "piment",
          "feuilles de combava"
        ],
        "steps": [
          "Broyer les échalotes, l’ail, le galanga, le gingembre et le piment pour former une pâte.",
          "Faire revenir la pâte et ajouter le lait de coco, la viande, la citronnelle et les feuilles de combava.",
          "Laisser mijoter jusqu’à ce que la viande soit tendre et le liquide réduit.",
          "Remuer régulièrement en fin de cuisson jusqu’à ce que la sauce enrobe étroitement la viande."
        ]
      },
      "variants": [
        "Le kalio contient davantage de sauce qu’un rendang plus sec."
      ],
      "serving": [
        "Servir avec du riz et des légumes."
      ],
      "commonMistakes": [
        "Ne pas utiliser un feu si vif que le mélange d’épices concentré brûle."
      ]
    },
    "pt": {
      "overview": "A carne cozinha em lume brando em leite de coco aromático que se reduz gradualmente.",
      "history": "O rendang provém da cultura gastronómica do povo minangkabau de Sumatra Ocidental e está associado a festividades e hospitalidade.",
      "flavor": "Intenso, condimentado, encorpado e aromático.",
      "technique": "Deixe o líquido reduzir lentamente e mexa mais frequentemente perto do fim.",
      "essentials": [
        "700 g de carne de vaca para estufar",
        "600 ml de leite de coco",
        "4 chalotas"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 3–4 horas",
        "ingredients": [
          "700 g de carne de vaca para estufar",
          "600 ml de leite de coco",
          "4 chalotas",
          "3 dentes de alho",
          "galanga",
          "gengibre",
          "erva-príncipe",
          "malagueta",
          "folhas de lima-makrut"
        ],
        "steps": [
          "Triture as chalotas, o alho, a galanga, o gengibre e a malagueta até obter uma pasta.",
          "Salteie a pasta e junte leite de coco, carne, erva-príncipe e folhas de lima.",
          "Deixe cozinhar em lume brando até a carne ficar tenra e o líquido reduzir.",
          "Mexa regularmente perto do fim até o molho envolver bem a carne."
        ]
      },
      "variants": [
        "O kalio tem mais molho do que um rendang mais seco."
      ],
      "serving": [
        "Sirva com arroz e legumes."
      ],
      "commonMistakes": [
        "Não use lume tão forte que a mistura concentrada de especiarias queime."
      ]
    },
    "es": {
      "overview": "La carne se cuece a fuego lento en leche de coco aromática que se reduce gradualmente.",
      "history": "El rendang procede de la cultura culinaria del pueblo minangkabau de Sumatra Occidental y se asocia con festividades y hospitalidad.",
      "flavor": "Intenso, especiado, con cuerpo y aromático.",
      "technique": "Deja que el líquido se reduzca lentamente y remueve con más frecuencia hacia el final.",
      "essentials": [
        "700 g de carne de vacuno para guisar",
        "600 ml de leche de coco",
        "4 chalotas"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 3–4 horas",
        "ingredients": [
          "700 g de carne de vacuno para guisar",
          "600 ml de leche de coco",
          "4 chalotas",
          "3 dientes de ajo",
          "galanga",
          "jengibre",
          "hierba limón",
          "chile",
          "hojas de lima makrut"
        ],
        "steps": [
          "Tritura las chalotas, el ajo, la galanga, el jengibre y el chile hasta obtener una pasta.",
          "Sofríe la pasta y añade leche de coco, carne, hierba limón y hojas de lima.",
          "Cuece a fuego lento hasta que la carne esté tierna y el líquido se haya reducido.",
          "Remueve regularmente hacia el final hasta que la salsa recubra bien la carne."
        ]
      },
      "variants": [
        "El kalio tiene más salsa que un rendang más seco."
      ],
      "serving": [
        "Sirve con arroz y verduras."
      ],
      "commonMistakes": [
        "No uses un fuego tan fuerte que se queme la mezcla concentrada de especias."
      ]
    },
    "de": {
      "overview": "Fleisch wird in aromatischer Kokosmilch geschmort, die nach und nach eingekocht wird.",
      "history": "Rendang stammt aus der Esskultur der Minangkabau in Westsumatra und wird mit Festen und Gastfreundschaft verbunden.",
      "flavor": "Tiefgründig, würzig, kräftig und aromatisch.",
      "technique": "Flüssigkeit langsam einkochen und gegen Ende häufiger umrühren.",
      "essentials": [
        "700 g Rindfleisch zum Schmoren",
        "600 ml Kokosmilch",
        "4 Schalotten"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 3–4 Stunden",
        "ingredients": [
          "700 g Rindfleisch zum Schmoren",
          "600 ml Kokosmilch",
          "4 Schalotten",
          "3 Knoblauchzehen",
          "Galgant",
          "Ingwer",
          "Zitronengras",
          "Chili",
          "Makrutlimettenblätter"
        ],
        "steps": [
          "Schalotten, Knoblauch, Galgant, Ingwer und Chili zu einer Paste mahlen.",
          "Paste anbraten und Kokosmilch, Fleisch, Zitronengras und Limettenblätter hinzufügen.",
          "Köcheln lassen, bis das Fleisch weich und die Flüssigkeit eingekocht ist.",
          "Gegen Ende regelmäßig rühren, bis die Sauce das Fleisch dicht umhüllt."
        ]
      },
      "variants": [
        "Kalio hat mehr Sauce als ein trockeneres Rendang."
      ],
      "serving": [
        "Mit Reis und Gemüse servieren."
      ],
      "commonMistakes": [
        "Hitze nicht so hoch einstellen, dass die konzentrierte Gewürzmischung anbrennt."
      ]
    }
  },
  "satay": {
    "en": {
      "overview": "Marinated meat is grilled on skewers; peanut sauce is common but not universal.",
      "history": "Sate is an extensive Indonesian food tradition, and satay is also popular in Malaysia and other parts of Southeast Asia.",
      "flavor": "Roasted, aromatic and juicy.",
      "technique": "Cut evenly sized pieces of meat and keep raw marinade separate from the finished sauce.",
      "essentials": [
        "600 g boneless chicken thigh",
        "2 tbsp kecap manis",
        "1 tsp coriander seeds"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 35 min + marinating",
        "ingredients": [
          "600 g boneless chicken thigh",
          "2 tbsp kecap manis",
          "1 tsp coriander seeds",
          "garlic",
          "1 tbsp oil",
          "100 g peanut butter",
          "150 ml coconut milk",
          "lime",
          "chilli"
        ],
        "steps": [
          "Marinate the pieces of meat with soy sauce, coriander, garlic and oil in the refrigerator.",
          "Thread the meat onto skewers and grill until cooked through.",
          "Heat peanut butter, coconut milk and chilli in a separate saucepan.",
          "Season the sauce with lime and serve with the skewers."
        ]
      },
      "variants": [
        "Sate Padang and Balinese sate lilit are distinct regional variants."
      ],
      "serving": [
        "Serve with rice, cucumber and onion."
      ],
      "commonMistakes": [
        "Do not serve raw marinade as a dip."
      ]
    },
    "fr": {
      "overview": "La viande marinée est grillée en brochettes ; la sauce aux cacahuètes est courante mais pas systématique.",
      "history": "Le sate constitue une vaste tradition culinaire indonésienne ; le satay est aussi populaire en Malaisie et dans d’autres parties de l’Asie du Sud-Est.",
      "flavor": "Grillé, aromatique et juteux.",
      "technique": "Couper la viande en morceaux réguliers et séparer la marinade crue de la sauce prête à servir.",
      "essentials": [
        "600 g de hauts de cuisse de poulet désossés",
        "2 c. à soupe de kecap manis",
        "1 c. à café de graines de coriandre"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 35 min + marinade",
        "ingredients": [
          "600 g de hauts de cuisse de poulet désossés",
          "2 c. à soupe de kecap manis",
          "1 c. à café de graines de coriandre",
          "ail",
          "1 c. à soupe d’huile",
          "100 g de beurre de cacahuète",
          "150 ml de lait de coco",
          "citron vert",
          "piment"
        ],
        "steps": [
          "Faire mariner les morceaux de viande au réfrigérateur avec la sauce soja, la coriandre, l’ail et l’huile.",
          "Enfiler la viande sur des brochettes et griller jusqu’à cuisson complète.",
          "Chauffer le beurre de cacahuète, le lait de coco et le piment dans une casserole séparée.",
          "Assaisonner la sauce avec du citron vert et servir avec les brochettes."
        ]
      },
      "variants": [
        "Le sate Padang et le sate lilit balinais sont des variantes régionales distinctes."
      ],
      "serving": [
        "Servir avec du riz, du concombre et de l’oignon."
      ],
      "commonMistakes": [
        "Ne pas servir la marinade crue comme sauce à tremper."
      ]
    },
    "pt": {
      "overview": "A carne marinada é grelhada em espetadas; o molho de amendoim é comum, mas não universal.",
      "history": "O sate é uma vasta tradição gastronómica indonésia e o satay é também popular na Malásia e noutras partes do Sudeste Asiático.",
      "flavor": "Tostado, aromático e suculento.",
      "technique": "Corte a carne em pedaços uniformes e mantenha a marinada crua separada do molho pronto.",
      "essentials": [
        "600 g de coxa de frango desossada",
        "2 c. de sopa de kecap manis",
        "1 c. de chá de sementes de coentros"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 35 min + marinada",
        "ingredients": [
          "600 g de coxa de frango desossada",
          "2 c. de sopa de kecap manis",
          "1 c. de chá de sementes de coentros",
          "alho",
          "1 c. de sopa de óleo",
          "100 g de manteiga de amendoim",
          "150 ml de leite de coco",
          "lima",
          "malagueta"
        ],
        "steps": [
          "Marine os pedaços de carne no frigorífico com molho de soja, coentros, alho e óleo.",
          "Coloque a carne nos espetos e grelhe até estar bem cozinhada.",
          "Aqueça manteiga de amendoim, leite de coco e malagueta num tacho separado.",
          "Tempere o molho com lima e sirva com as espetadas."
        ]
      },
      "variants": [
        "O sate Padang e o sate lilit balinês são variantes regionais próprias."
      ],
      "serving": [
        "Sirva com arroz, pepino e cebola."
      ],
      "commonMistakes": [
        "Não sirva a marinada crua como molho para mergulhar."
      ]
    },
    "es": {
      "overview": "La carne marinada se asa en brochetas; la salsa de cacahuete es habitual, pero no universal.",
      "history": "El sate es una amplia tradición culinaria indonesia y el satay también es popular en Malasia y otras partes del Sudeste Asiático.",
      "flavor": "Tostado, aromático y jugoso.",
      "technique": "Corta la carne en trozos iguales y mantén el marinado crudo separado de la salsa lista para servir.",
      "essentials": [
        "600 g de contramuslo de pollo deshuesado",
        "2 cucharadas de kecap manis",
        "1 cucharadita de semillas de cilantro"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 35 min + marinado",
        "ingredients": [
          "600 g de contramuslo de pollo deshuesado",
          "2 cucharadas de kecap manis",
          "1 cucharadita de semillas de cilantro",
          "ajo",
          "1 cucharada de aceite",
          "100 g de crema de cacahuete",
          "150 ml de leche de coco",
          "lima",
          "chile"
        ],
        "steps": [
          "Marina los trozos de carne en el frigorífico con salsa de soja, cilantro, ajo y aceite.",
          "Ensarta la carne en brochetas y asa hasta que esté hecha por dentro.",
          "Calienta crema de cacahuete, leche de coco y chile en un cazo separado.",
          "Sazona la salsa con lima y sirve con las brochetas."
        ]
      },
      "variants": [
        "El sate Padang y el sate lilit balinés son variantes regionales distintas."
      ],
      "serving": [
        "Sirve con arroz, pepino y cebolla."
      ],
      "commonMistakes": [
        "No sirvas el marinado crudo como salsa para mojar."
      ]
    },
    "de": {
      "overview": "Mariniertes Fleisch wird auf Spießen gegrillt; Erdnusssauce ist verbreitet, aber nicht überall üblich.",
      "history": "Sate ist eine vielfältige indonesische Esstradition; Satay ist auch in Malaysia und anderen Teilen Südostasiens beliebt.",
      "flavor": "Röstig, aromatisch und saftig.",
      "technique": "Fleisch in gleich große Stücke schneiden und rohe Marinade von der fertigen Sauce getrennt halten.",
      "essentials": [
        "600 g Hähnchenschenkelfilet",
        "2 EL Kecap Manis",
        "1 TL Koriandersamen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 35 Min. + Marinierzeit",
        "ingredients": [
          "600 g Hähnchenschenkelfilet",
          "2 EL Kecap Manis",
          "1 TL Koriandersamen",
          "Knoblauch",
          "1 EL Öl",
          "100 g Erdnussbutter",
          "150 ml Kokosmilch",
          "Limette",
          "Chili"
        ],
        "steps": [
          "Fleischstücke mit Sojasauce, Koriander, Knoblauch und Öl im Kühlschrank marinieren.",
          "Fleisch auf Spieße stecken und vollständig durchgrillen.",
          "Erdnussbutter, Kokosmilch und Chili in einem separaten Topf erhitzen.",
          "Sauce mit Limette abschmecken und zu den Spießen servieren."
        ]
      },
      "variants": [
        "Sate Padang und balinesisches Sate Lilit sind eigenständige regionale Varianten."
      ],
      "serving": [
        "Mit Reis, Gurke und Zwiebel servieren."
      ],
      "commonMistakes": [
        "Rohe Marinade nicht als Dip servieren."
      ]
    }
  },
  "nasi-lemak": {
    "en": {
      "overview": "Coconut rice is the base of the meal; the accompaniments provide different flavours and textures.",
      "history": "Nasi lemak is a particularly well-known Malaysian dish and a common breakfast food.",
      "flavor": "Creamy, salty, hot and nutty.",
      "technique": "Adjust the amount of liquid to the type of rice and let the rice rest covered.",
      "essentials": [
        "300 g rice",
        "200 ml coconut milk",
        "water as needed"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40 min",
        "ingredients": [
          "300 g rice",
          "200 ml coconut milk",
          "water as needed",
          "1 pandan leaf, optional",
          "4 eggs",
          "1 cucumber",
          "60 g peanuts",
          "50 g ikan bilis",
          "sambal"
        ],
        "steps": [
          "Rinse the rice and cook with coconut milk, water, salt and optional pandan.",
          "Boil the eggs until firm.",
          "Toast the peanuts and fry the dried anchovies until crisp.",
          "Serve the coconut rice with sambal, cucumber, eggs and accompaniments."
        ]
      },
      "variants": [
        "It can also be served with rendang or fried chicken."
      ],
      "serving": [
        "Arrange the accompaniments around the rice."
      ],
      "commonMistakes": [
        "Do not let the sambal overpower the mild flavour of the coconut rice."
      ]
    },
    "fr": {
      "overview": "Le riz au lait de coco constitue la base du repas ; les accompagnements apportent différentes saveurs et textures.",
      "history": "Le nasi lemak est un plat malaisien particulièrement connu et un petit-déjeuner courant.",
      "flavor": "Crémeux, salé, piquant et aux notes de noix.",
      "technique": "Adapter la quantité de liquide au type de riz et laisser reposer à couvert.",
      "essentials": [
        "300 g de riz",
        "200 ml de lait de coco",
        "eau selon les besoins"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40 min",
        "ingredients": [
          "300 g de riz",
          "200 ml de lait de coco",
          "eau selon les besoins",
          "1 feuille de pandan, facultative",
          "4 œufs",
          "1 concombre",
          "60 g de cacahuètes",
          "50 g d’ikan bilis",
          "sambal"
        ],
        "steps": [
          "Rincer le riz et le cuire avec le lait de coco, l’eau, le sel et éventuellement le pandan.",
          "Cuire les œufs jusqu’à ce qu’ils soient durs.",
          "Griller les cacahuètes et faire frire les anchois séchés jusqu’à ce qu’ils soient croustillants.",
          "Servir le riz au lait de coco avec le sambal, le concombre, les œufs et les accompagnements."
        ]
      },
      "variants": [
        "On peut également le servir avec du rendang ou du poulet frit."
      ],
      "serving": [
        "Disposer les accompagnements autour du riz."
      ],
      "commonMistakes": [
        "Ne pas laisser le sambal masquer la saveur douce du riz au lait de coco."
      ]
    },
    "pt": {
      "overview": "O arroz de coco é a base da refeição; os acompanhamentos dão diferentes sabores e texturas.",
      "history": "O nasi lemak é um prato malaio especialmente conhecido e habitual ao pequeno-almoço.",
      "flavor": "Cremoso, salgado, picante e com notas de frutos secos.",
      "technique": "Ajuste a quantidade de líquido ao tipo de arroz e deixe repousar com tampa.",
      "essentials": [
        "300 g de arroz",
        "200 ml de leite de coco",
        "água conforme necessário"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40 min",
        "ingredients": [
          "300 g de arroz",
          "200 ml de leite de coco",
          "água conforme necessário",
          "1 folha de pandan, opcional",
          "4 ovos",
          "1 pepino",
          "60 g de amendoins",
          "50 g de ikan bilis",
          "sambal"
        ],
        "steps": [
          "Lave o arroz e coza com leite de coco, água, sal e, se desejar, pandan.",
          "Coza os ovos até ficarem firmes.",
          "Toste os amendoins e frite as anchovas secas até ficarem crocantes.",
          "Sirva o arroz de coco com sambal, pepino, ovos e acompanhamentos."
        ]
      },
      "variants": [
        "Também pode ser servido com rendang ou frango frito."
      ],
      "serving": [
        "Disponha os acompanhamentos à volta do arroz."
      ],
      "commonMistakes": [
        "Não deixe o sambal sobrepor-se ao sabor suave do arroz de coco."
      ]
    },
    "es": {
      "overview": "El arroz con coco es la base de la comida; los acompañamientos aportan distintos sabores y texturas.",
      "history": "El nasi lemak es un plato malasio especialmente conocido y habitual en el desayuno.",
      "flavor": "Cremoso, salado, picante y con notas de frutos secos.",
      "technique": "Ajusta la cantidad de líquido al tipo de arroz y deja reposar tapado.",
      "essentials": [
        "300 g de arroz",
        "200 ml de leche de coco",
        "agua según sea necesario"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40 min",
        "ingredients": [
          "300 g de arroz",
          "200 ml de leche de coco",
          "agua según sea necesario",
          "1 hoja de pandan, opcional",
          "4 huevos",
          "1 pepino",
          "60 g de cacahuetes",
          "50 g de ikan bilis",
          "sambal"
        ],
        "steps": [
          "Lava el arroz y cuécelo con leche de coco, agua, sal y, si quieres, pandan.",
          "Cuece los huevos hasta que estén firmes.",
          "Tuesta los cacahuetes y fríe las anchoas secas hasta que estén crujientes.",
          "Sirve el arroz con coco con sambal, pepino, huevos y acompañamientos."
        ]
      },
      "variants": [
        "También se puede servir con rendang o pollo frito."
      ],
      "serving": [
        "Coloca los acompañamientos alrededor del arroz."
      ],
      "commonMistakes": [
        "No dejes que el sambal enmascare el sabor suave del arroz con coco."
      ]
    },
    "de": {
      "overview": "Kokosreis bildet die Grundlage der Mahlzeit; die Beilagen sorgen für unterschiedliche Geschmäcker und Konsistenzen.",
      "history": "Nasi Lemak ist ein besonders bekanntes malaysisches Gericht und ein verbreitetes Frühstück.",
      "flavor": "Cremig, salzig, scharf und nussig.",
      "technique": "Flüssigkeitsmenge an die Reissorte anpassen und Reis zugedeckt ruhen lassen.",
      "essentials": [
        "300 g Reis",
        "200 ml Kokosmilch",
        "Wasser nach Bedarf"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40 Min.",
        "ingredients": [
          "300 g Reis",
          "200 ml Kokosmilch",
          "Wasser nach Bedarf",
          "1 Pandanblatt, optional",
          "4 Eier",
          "1 Gurke",
          "60 g Erdnüsse",
          "50 g Ikan Bilis",
          "Sambal"
        ],
        "steps": [
          "Reis waschen und mit Kokosmilch, Wasser, Salz und nach Wunsch Pandan kochen.",
          "Eier hart kochen.",
          "Erdnüsse rösten und getrocknete Sardellen knusprig braten.",
          "Kokosreis mit Sambal, Gurke, Eiern und Beilagen servieren."
        ]
      },
      "variants": [
        "Kann auch mit Rendang oder gebratenem Hähnchen serviert werden."
      ],
      "serving": [
        "Beilagen um den Reis anrichten."
      ],
      "commonMistakes": [
        "Sambal den milden Geschmack des Kokosreises nicht überdecken lassen."
      ]
    }
  },
  "laksa": {
    "en": {
      "overview": "Laksa encompasses different soup traditions; this home recipe is inspired by curry laksa.",
      "history": "Malaysia has several distinctive laksa variants, including tangy assam laksa and Sarawak laksa.",
      "flavor": "Curry laksa is rich, aromatic and often hot; assam laksa has a different, tangy fish-based profile.",
      "technique": "Cook the broth and prepare the noodles separately for a good texture.",
      "essentials": [
        "300 g rice noodles",
        "400 ml coconut milk",
        "600 ml stock"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40 min",
        "ingredients": [
          "300 g rice noodles",
          "400 ml coconut milk",
          "600 ml stock",
          "2 tbsp laksa or curry paste",
          "250 g raw, peeled prawns",
          "150 g tofu",
          "bean sprouts",
          "lime"
        ],
        "steps": [
          "Fry the paste in a little oil.",
          "Add stock and coconut milk and simmer.",
          "Add tofu and prawns and cook until the prawns are cooked through.",
          "Cook the noodles separately and serve with the soup, sprouts and lime."
        ]
      },
      "variants": [
        "Assam laksa, curry laksa and Sarawak laksa are distinct variants, not identical recipes."
      ],
      "serving": [
        "Serve with lime and herbs."
      ],
      "commonMistakes": [
        "Do not assume that all laksa variants contain coconut milk."
      ]
    },
    "fr": {
      "overview": "Le laksa englobe différentes traditions de soupes ; cette recette maison s’inspire du curry laksa.",
      "history": "La Malaisie possède plusieurs variantes marquantes de laksa, notamment l’assam laksa acidulé et le laksa de Sarawak.",
      "flavor": "Le curry laksa est généreux, aromatique et souvent piquant ; l’assam laksa présente un profil différent, acidulé et à base de poisson.",
      "technique": "Cuire le bouillon et préparer les nouilles séparément pour obtenir une bonne texture.",
      "essentials": [
        "300 g de nouilles de riz",
        "400 ml de lait de coco",
        "600 ml de bouillon"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40 min",
        "ingredients": [
          "300 g de nouilles de riz",
          "400 ml de lait de coco",
          "600 ml de bouillon",
          "2 c. à soupe de pâte de laksa ou de curry",
          "250 g de crevettes crues décortiquées",
          "150 g de tofu",
          "pousses de haricot",
          "citron vert"
        ],
        "steps": [
          "Faire revenir la pâte dans un peu d’huile.",
          "Ajouter le bouillon et le lait de coco, puis laisser mijoter.",
          "Ajouter le tofu et les crevettes et cuire jusqu’à cuisson complète des crevettes.",
          "Cuire les nouilles séparément et servir avec la soupe, les pousses et le citron vert."
        ]
      },
      "variants": [
        "L’assam laksa, le curry laksa et le laksa de Sarawak sont des variantes distinctes, et non des recettes identiques."
      ],
      "serving": [
        "Servir avec du citron vert et des herbes."
      ],
      "commonMistakes": [
        "Ne pas supposer que toutes les variantes de laksa contiennent du lait de coco."
      ]
    },
    "pt": {
      "overview": "O laksa abrange diferentes tradições de sopa; esta receita caseira inspira-se no curry laksa.",
      "history": "A Malásia tem várias variantes marcantes de laksa, incluindo o assam laksa ácido e o laksa de Sarawak.",
      "flavor": "O curry laksa é encorpado, aromático e frequentemente picante; o assam laksa tem um perfil diferente, ácido e à base de peixe.",
      "technique": "Coza o caldo e prepare os noodles separadamente para obter uma boa textura.",
      "essentials": [
        "300 g de noodles de arroz",
        "400 ml de leite de coco",
        "600 ml de caldo"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40 min",
        "ingredients": [
          "300 g de noodles de arroz",
          "400 ml de leite de coco",
          "600 ml de caldo",
          "2 c. de sopa de pasta de laksa ou caril",
          "250 g de camarão cru descascado",
          "150 g de tofu",
          "rebentos de feijão",
          "lima"
        ],
        "steps": [
          "Salteie a pasta num pouco de óleo.",
          "Junte o caldo e o leite de coco e deixe cozinhar em lume brando.",
          "Junte tofu e camarão e cozinhe até o camarão estar bem cozinhado.",
          "Coza os noodles separadamente e sirva com a sopa, os rebentos e a lima."
        ]
      },
      "variants": [
        "O assam laksa, o curry laksa e o laksa de Sarawak são variantes distintas, não receitas idênticas."
      ],
      "serving": [
        "Sirva com lima e ervas."
      ],
      "commonMistakes": [
        "Não suponha que todas as variantes de laksa contêm leite de coco."
      ]
    },
    "es": {
      "overview": "El laksa abarca distintas tradiciones de sopas; esta receta casera se inspira en el curry laksa.",
      "history": "Malasia tiene varias variantes destacadas de laksa, entre ellas el assam laksa ácido y el laksa de Sarawak.",
      "flavor": "El curry laksa tiene cuerpo, es aromático y suele ser picante; el assam laksa tiene un perfil distinto, ácido y a base de pescado.",
      "technique": "Cuece el caldo y prepara los fideos por separado para lograr una buena textura.",
      "essentials": [
        "300 g de fideos de arroz",
        "400 ml de leche de coco",
        "600 ml de caldo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40 min",
        "ingredients": [
          "300 g de fideos de arroz",
          "400 ml de leche de coco",
          "600 ml de caldo",
          "2 cucharadas de pasta de laksa o curri",
          "250 g de gambas crudas peladas",
          "150 g de tofu",
          "brotes de judía",
          "lima"
        ],
        "steps": [
          "Sofríe la pasta en un poco de aceite.",
          "Añade el caldo y la leche de coco y cuece a fuego lento.",
          "Añade tofu y gambas y cocina hasta que las gambas estén hechas por dentro.",
          "Cuece los fideos por separado y sirve con la sopa, los brotes y la lima."
        ]
      },
      "variants": [
        "El assam laksa, el curry laksa y el laksa de Sarawak son variantes distintas, no recetas idénticas."
      ],
      "serving": [
        "Sirve con lima y hierbas."
      ],
      "commonMistakes": [
        "No supongas que todas las variantes de laksa contienen leche de coco."
      ]
    },
    "de": {
      "overview": "Laksa umfasst unterschiedliche Suppentraditionen; dieses Hausrezept ist von Curry Laksa inspiriert.",
      "history": "Malaysia hat mehrere markante Laksa-Varianten, darunter säuerliches Assam Laksa und Sarawak Laksa.",
      "flavor": "Curry Laksa ist kräftig, aromatisch und oft scharf; Assam Laksa hat ein anderes, säuerliches, fischbasiertes Geschmacksprofil.",
      "technique": "Brühe kochen und Nudeln separat zubereiten, damit die Konsistenz stimmt.",
      "essentials": [
        "300 g Reisnudeln",
        "400 ml Kokosmilch",
        "600 ml Brühe"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40 Min.",
        "ingredients": [
          "300 g Reisnudeln",
          "400 ml Kokosmilch",
          "600 ml Brühe",
          "2 EL Laksa- oder Currypaste",
          "250 g rohe, geschälte Garnelen",
          "150 g Tofu",
          "Bohnensprossen",
          "Limette"
        ],
        "steps": [
          "Paste in etwas Öl anbraten.",
          "Brühe und Kokosmilch hinzufügen und köcheln lassen.",
          "Tofu und Garnelen hinzufügen und die Garnelen vollständig durchgaren.",
          "Nudeln separat kochen und mit Suppe, Sprossen und Limette servieren."
        ]
      },
      "variants": [
        "Assam Laksa, Curry Laksa und Sarawak Laksa sind unterschiedliche Varianten, keine identischen Rezepte."
      ],
      "serving": [
        "Mit Limette und Kräutern servieren."
      ],
      "commonMistakes": [
        "Nicht davon ausgehen, dass alle Laksa-Varianten Kokosmilch enthalten."
      ]
    }
  },
  "pork-adobo": {
    "en": {
      "overview": "Pork is braised until tender in a salty, tangy sauce.",
      "history": "Adobo is a Filipino cooking tradition that also encompasses fish, chicken and vegetables.",
      "flavor": "Tangy, salty and rich.",
      "technique": "Simmer the meat gently and season the sauce after reduction.",
      "essentials": [
        "600 g pork neck",
        "60 ml vinegar",
        "50 ml soy sauce"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 90 min",
        "ingredients": [
          "600 g pork neck",
          "60 ml vinegar",
          "50 ml soy sauce",
          "5 garlic cloves",
          "2 bay leaves",
          "1 tsp whole peppercorns",
          "200 ml water"
        ],
        "steps": [
          "Cut the meat into pieces and brown lightly.",
          "Add vinegar, soy sauce, garlic, bay leaves and water.",
          "Simmer covered until the meat is tender.",
          "Remove the lid and reduce the sauce to taste."
        ]
      },
      "variants": [
        "Adobong puti is made without soy sauce; chicken adobo is also common."
      ],
      "serving": [
        "Serve with steamed rice."
      ],
      "commonMistakes": [
        "Do not salt the sauce before it has reduced."
      ]
    },
    "fr": {
      "overview": "Le porc est braisé jusqu’à tendreté dans une sauce salée et acidulée.",
      "history": "L’adobo est une tradition culinaire philippine qui concerne aussi le poisson, le poulet et les légumes.",
      "flavor": "Acidulé, salé et généreux.",
      "technique": "Laisser mijoter doucement la viande et rectifier l’assaisonnement de la sauce après réduction.",
      "essentials": [
        "600 g d’échine de porc",
        "60 ml de vinaigre",
        "50 ml de sauce soja"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 90 min",
        "ingredients": [
          "600 g d’échine de porc",
          "60 ml de vinaigre",
          "50 ml de sauce soja",
          "5 gousses d’ail",
          "2 feuilles de laurier",
          "1 c. à café de grains de poivre",
          "200 ml d’eau"
        ],
        "steps": [
          "Couper la viande en morceaux et la faire légèrement dorer.",
          "Ajouter le vinaigre, la sauce soja, l’ail, le laurier et l’eau.",
          "Laisser mijoter à couvert jusqu’à tendreté de la viande.",
          "Retirer le couvercle et faire réduire la sauce selon le goût."
        ]
      },
      "variants": [
        "L’adobong puti se prépare sans sauce soja ; l’adobo au poulet est également courant."
      ],
      "serving": [
        "Servir avec du riz cuit à la vapeur."
      ],
      "commonMistakes": [
        "Ne pas saler la sauce avant qu’elle ait réduit."
      ]
    },
    "pt": {
      "overview": "A carne de porco é estufada até ficar tenra num molho salgado e ácido.",
      "history": "O adobo é uma tradição culinária filipina que também abrange peixe, frango e legumes.",
      "flavor": "Ácido, salgado e encorpado.",
      "technique": "Deixe a carne cozinhar em lume brando e tempere o molho depois de reduzir.",
      "essentials": [
        "600 g de cachaço de porco",
        "60 ml de vinagre",
        "50 ml de molho de soja"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 90 min",
        "ingredients": [
          "600 g de cachaço de porco",
          "60 ml de vinagre",
          "50 ml de molho de soja",
          "5 dentes de alho",
          "2 folhas de louro",
          "1 c. de chá de pimenta em grão",
          "200 ml de água"
        ],
        "steps": [
          "Corte a carne em pedaços e doure ligeiramente.",
          "Junte vinagre, molho de soja, alho, louro e água.",
          "Deixe cozinhar em lume brando com tampa até a carne ficar tenra.",
          "Retire a tampa e reduza o molho a gosto."
        ]
      },
      "variants": [
        "O adobong puti é feito sem molho de soja; o adobo de frango também é comum."
      ],
      "serving": [
        "Sirva com arroz cozido a vapor."
      ],
      "commonMistakes": [
        "Não tempere o molho com sal antes de reduzir."
      ]
    },
    "es": {
      "overview": "El cerdo se brasea hasta quedar tierno en una salsa salada y ácida.",
      "history": "El adobo es una tradición culinaria filipina que también incluye pescado, pollo y verduras.",
      "flavor": "Ácido, salado y con cuerpo.",
      "technique": "Cuece la carne suavemente a fuego lento y ajusta la sazón de la salsa después de reducirla.",
      "essentials": [
        "600 g de cabecero de lomo de cerdo",
        "60 ml de vinagre",
        "50 ml de salsa de soja"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 90 min",
        "ingredients": [
          "600 g de cabecero de lomo de cerdo",
          "60 ml de vinagre",
          "50 ml de salsa de soja",
          "5 dientes de ajo",
          "2 hojas de laurel",
          "1 cucharadita de pimienta en grano",
          "200 ml de agua"
        ],
        "steps": [
          "Corta la carne en trozos y dórala ligeramente.",
          "Añade vinagre, salsa de soja, ajo, laurel y agua.",
          "Cuece a fuego lento con tapa hasta que la carne esté tierna.",
          "Retira la tapa y reduce la salsa al gusto."
        ]
      },
      "variants": [
        "El adobong puti se prepara sin salsa de soja; el adobo de pollo también es habitual."
      ],
      "serving": [
        "Sirve con arroz al vapor."
      ],
      "commonMistakes": [
        "No sales la salsa antes de que se haya reducido."
      ]
    },
    "de": {
      "overview": "Schweinefleisch wird in einer salzig-säuerlichen Sauce weich geschmort.",
      "history": "Adobo ist eine philippinische Zubereitungstradition, die auch Fisch, Hähnchen und Gemüse umfasst.",
      "flavor": "Säuerlich, salzig und kräftig.",
      "technique": "Fleisch sanft schmoren und Sauce nach dem Einkochen abschmecken.",
      "essentials": [
        "600 g Schweinenacken",
        "60 ml Essig",
        "50 ml Sojasauce"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 90 Min.",
        "ingredients": [
          "600 g Schweinenacken",
          "60 ml Essig",
          "50 ml Sojasauce",
          "5 Knoblauchzehen",
          "2 Lorbeerblätter",
          "1 TL ganze Pfefferkörner",
          "200 ml Wasser"
        ],
        "steps": [
          "Fleisch in Stücke schneiden und leicht anbräunen.",
          "Essig, Sojasauce, Knoblauch, Lorbeer und Wasser hinzufügen.",
          "Zugedeckt schmoren, bis das Fleisch weich ist.",
          "Deckel abnehmen und Sauce nach Geschmack einkochen."
        ]
      },
      "variants": [
        "Adobong Puti wird ohne Sojasauce zubereitet; Hähnchen-Adobo ist ebenfalls verbreitet."
      ],
      "serving": [
        "Mit gedämpftem Reis servieren."
      ],
      "commonMistakes": [
        "Sauce erst nach dem Einkochen salzen."
      ]
    }
  },
  "sinigang": {
    "en": {
      "overview": "The broth acquires its characteristic fresh acidity, often from tamarind.",
      "history": "Sinigang is a Filipino soup tradition with different proteins and sour ingredients.",
      "flavor": "Tangy, fresh and rich.",
      "technique": "Let the meat become tender before adding vegetables that cook quickly.",
      "essentials": [
        "600 g pork ribs, cut into pieces",
        "1.5 l water",
        "2 tomatoes"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 90 min",
        "ingredients": [
          "600 g pork ribs, cut into pieces",
          "1.5 l water",
          "2 tomatoes",
          "1 onion",
          "150 g radish",
          "150 g green beans",
          "pak choi",
          "tamarind paste",
          "fish sauce"
        ],
        "steps": [
          "Bring the meat and water to a boil, skim off the foam and add onion and tomato.",
          "Simmer until the meat is tender.",
          "Add radish, beans and tamarind to taste.",
          "Fold in the pak choi towards the end and season with fish sauce."
        ]
      },
      "variants": [
        "Versions with prawns, fish or beef."
      ],
      "serving": [
        "Serve with rice."
      ],
      "commonMistakes": [
        "Do not add all the tamarind without tasting as you go."
      ]
    },
    "fr": {
      "overview": "Le bouillon acquiert son acidité fraîche caractéristique, souvent grâce au tamarin.",
      "history": "Le sinigang est une tradition de soupe philippine qui utilise différentes sources de protéines et des ingrédients acidulés.",
      "flavor": "Acidulé, frais et généreux.",
      "technique": "Laisser la viande s’attendrir avant d’ajouter les légumes à cuisson rapide.",
      "essentials": [
        "600 g de travers de porc en morceaux",
        "1,5 l d’eau",
        "2 tomates"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 90 min",
        "ingredients": [
          "600 g de travers de porc en morceaux",
          "1,5 l d’eau",
          "2 tomates",
          "1 oignon",
          "150 g de radis",
          "150 g de haricots verts",
          "pak choï",
          "pâte de tamarin",
          "sauce de poisson"
        ],
        "steps": [
          "Porter la viande et l’eau à ébullition, écumer et ajouter l’oignon et les tomates.",
          "Laisser mijoter jusqu’à tendreté de la viande.",
          "Ajouter le radis, les haricots verts et du tamarin selon le goût.",
          "Incorporer le pak choï en fin de cuisson et assaisonner avec la sauce de poisson."
        ]
      },
      "variants": [
        "Variantes aux crevettes, au poisson ou au bœuf."
      ],
      "serving": [
        "Servir avec du riz."
      ],
      "commonMistakes": [
        "Ne pas ajouter tout le tamarin sans goûter au fur et à mesure."
      ]
    },
    "pt": {
      "overview": "O caldo ganha a sua acidez fresca característica, frequentemente do tamarindo.",
      "history": "O sinigang é uma tradição filipina de sopa com diferentes proteínas e ingredientes ácidos.",
      "flavor": "Ácido, fresco e encorpado.",
      "technique": "Deixe a carne ficar tenra antes de juntar os legumes de cozedura rápida.",
      "essentials": [
        "600 g de entrecosto de porco em pedaços",
        "1,5 l de água",
        "2 tomates"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 90 min",
        "ingredients": [
          "600 g de entrecosto de porco em pedaços",
          "1,5 l de água",
          "2 tomates",
          "1 cebola",
          "150 g de rabanete",
          "150 g de feijão-verde",
          "pak choi",
          "pasta de tamarindo",
          "molho de peixe"
        ],
        "steps": [
          "Leve a carne e a água a ferver, retire a espuma e junte cebola e tomate.",
          "Deixe cozinhar em lume brando até a carne ficar tenra.",
          "Junte rabanete, feijão-verde e tamarindo a gosto.",
          "Envolva o pak choi perto do fim e tempere com molho de peixe."
        ]
      },
      "variants": [
        "Variantes com camarão, peixe ou carne de vaca."
      ],
      "serving": [
        "Sirva com arroz."
      ],
      "commonMistakes": [
        "Não junte todo o tamarindo sem ir provando."
      ]
    },
    "es": {
      "overview": "El caldo adquiere su característica acidez fresca, a menudo del tamarindo.",
      "history": "El sinigang es una tradición filipina de sopas con diferentes proteínas e ingredientes ácidos.",
      "flavor": "Ácido, fresco y con cuerpo.",
      "technique": "Deja que la carne quede tierna antes de añadir las verduras de cocción rápida.",
      "essentials": [
        "600 g de costillas de cerdo en trozos",
        "1,5 l de agua",
        "2 tomates"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 90 min",
        "ingredients": [
          "600 g de costillas de cerdo en trozos",
          "1,5 l de agua",
          "2 tomates",
          "1 cebolla",
          "150 g de rábano",
          "150 g de judías verdes",
          "pak choi",
          "pasta de tamarindo",
          "salsa de pescado"
        ],
        "steps": [
          "Lleva la carne y el agua a ebullición, retira la espuma y añade cebolla y tomate.",
          "Cuece a fuego lento hasta que la carne esté tierna.",
          "Añade rábano, judías verdes y tamarindo al gusto.",
          "Incorpora el pak choi hacia el final y sazona con salsa de pescado."
        ]
      },
      "variants": [
        "Variantes con gambas, pescado o carne de vacuno."
      ],
      "serving": [
        "Sirve con arroz."
      ],
      "commonMistakes": [
        "No añadas todo el tamarindo sin ir probando."
      ]
    },
    "de": {
      "overview": "Die Brühe erhält ihre charakteristische frische Säure, häufig durch Tamarinde.",
      "history": "Sinigang ist eine philippinische Suppentradition mit unterschiedlichen Proteinquellen und säuerlichen Zutaten.",
      "flavor": "Säuerlich, frisch und kräftig.",
      "technique": "Fleisch weich garen, bevor Gemüse mit kurzer Garzeit hinzukommt.",
      "essentials": [
        "600 g Schweinerippchen in Stücken",
        "1,5 l Wasser",
        "2 Tomaten"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 90 Min.",
        "ingredients": [
          "600 g Schweinerippchen in Stücken",
          "1,5 l Wasser",
          "2 Tomaten",
          "1 Zwiebel",
          "150 g Rettich",
          "150 g grüne Bohnen",
          "Pak Choi",
          "Tamarindenpaste",
          "Fischsauce"
        ],
        "steps": [
          "Fleisch und Wasser aufkochen, Schaum abschöpfen und Zwiebel und Tomaten hinzufügen.",
          "Köcheln lassen, bis das Fleisch weich ist.",
          "Rettich, Bohnen und Tamarinde nach Geschmack hinzufügen.",
          "Pak Choi gegen Ende unterheben und mit Fischsauce abschmecken."
        ]
      },
      "variants": [
        "Varianten mit Garnelen, Fisch oder Rindfleisch."
      ],
      "serving": [
        "Mit Reis servieren."
      ],
      "commonMistakes": [
        "Nicht die gesamte Tamarinde hinzufügen, ohne zwischendurch abzuschmecken."
      ]
    }
  },
  "sisig": {
    "en": {
      "overview": "Traditional pork sisig may use parts of the pig’s head and liver; this recipe uses pork as a readily available alternative.",
      "history": "Sisig is associated with Kapampangan food culture and exists in many modern forms.",
      "flavor": "Roasted, tangy and piquant.",
      "technique": "Fry the meat until crisp before chopping and mixing it with fresh ingredients.",
      "essentials": [
        "500 g pork belly",
        "1 red onion",
        "chilli to taste"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 60 min",
        "ingredients": [
          "500 g pork belly",
          "1 red onion",
          "chilli to taste",
          "2 tbsp calamansi or lime juice",
          "1 tbsp soy sauce",
          "oil"
        ],
        "steps": [
          "Cook the pork belly until cooked through and golden.",
          "Chop the meat into small pieces.",
          "Finely chop onion and chilli and mix with the meat and citrus juice.",
          "Heat briefly in a pan and season with soy sauce."
        ]
      },
      "variants": [
        "Versions with chicken, fish or tofu."
      ],
      "serving": [
        "Serve with rice or as a small dish."
      ],
      "commonMistakes": [
        "Do not add so much liquid that the meat loses all its crispness."
      ]
    },
    "fr": {
      "overview": "Le sisig de porc traditionnel peut utiliser des parties de la tête et du foie du porc ; cette recette utilise une viande de porc facile à trouver.",
      "history": "Le sisig est associé à la culture culinaire kapampangan et existe sous de nombreuses formes modernes.",
      "flavor": "Grillé, acidulé et piquant.",
      "technique": "Faire dorer la viande jusqu’à ce qu’elle soit croustillante avant de la hacher et de la mélanger aux ingrédients frais.",
      "essentials": [
        "500 g de poitrine de porc",
        "1 oignon rouge",
        "piment selon le goût"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 60 min",
        "ingredients": [
          "500 g de poitrine de porc",
          "1 oignon rouge",
          "piment selon le goût",
          "2 c. à soupe de jus de calamansi ou de citron vert",
          "1 c. à soupe de sauce soja",
          "huile"
        ],
        "steps": [
          "Cuire la poitrine de porc jusqu’à ce qu’elle soit dorée et cuite à cœur.",
          "Hacher la viande en petits morceaux.",
          "Hacher finement l’oignon et le piment, puis mélanger avec la viande et le jus d’agrumes.",
          "Réchauffer brièvement à la poêle et assaisonner avec la sauce soja."
        ]
      },
      "variants": [
        "Variantes au poulet, au poisson ou au tofu."
      ],
      "serving": [
        "Servir avec du riz ou en petite portion."
      ],
      "commonMistakes": [
        "Ne pas ajouter tant de liquide que la viande perde tout son croustillant."
      ]
    },
    "pt": {
      "overview": "O sisig de porco tradicional pode utilizar partes da cabeça e fígado do porco; aqui usa-se carne de porco como alternativa de fácil acesso.",
      "history": "O sisig está associado à cultura gastronómica kapampangan e existe em muitas formas modernas.",
      "flavor": "Tostado, ácido e picante.",
      "technique": "Cozinhe a carne até ficar crocante antes de a picar e misturar com os ingredientes frescos.",
      "essentials": [
        "500 g de barriga de porco",
        "1 cebola roxa",
        "malagueta a gosto"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 60 min",
        "ingredients": [
          "500 g de barriga de porco",
          "1 cebola roxa",
          "malagueta a gosto",
          "2 c. de sopa de sumo de calamansi ou lima",
          "1 c. de sopa de molho de soja",
          "óleo"
        ],
        "steps": [
          "Cozinhe a barriga de porco até estar bem cozinhada e dourada.",
          "Pique a carne em pedaços pequenos.",
          "Pique finamente a cebola e a malagueta e misture com a carne e o sumo de citrinos.",
          "Aqueça brevemente numa frigideira e tempere com molho de soja."
        ]
      },
      "variants": [
        "Variantes com frango, peixe ou tofu."
      ],
      "serving": [
        "Sirva com arroz ou como petisco."
      ],
      "commonMistakes": [
        "Não junte tanto líquido que a carne perca toda a crocância."
      ]
    },
    "es": {
      "overview": "El sisig tradicional de cerdo puede llevar partes de la cabeza y el hígado del cerdo; aquí se usa carne de cerdo como alternativa fácil de conseguir.",
      "history": "El sisig se asocia con la cultura culinaria kapampangan y existe en muchas formas modernas.",
      "flavor": "Tostado, ácido y picante.",
      "technique": "Cocina la carne hasta que esté crujiente antes de picarla y mezclarla con los ingredientes frescos.",
      "essentials": [
        "500 g de panceta de cerdo",
        "1 cebolla morada",
        "chile al gusto"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 60 min",
        "ingredients": [
          "500 g de panceta de cerdo",
          "1 cebolla morada",
          "chile al gusto",
          "2 cucharadas de zumo de calamansí o lima",
          "1 cucharada de salsa de soja",
          "aceite"
        ],
        "steps": [
          "Cocina la panceta hasta que esté hecha por dentro y dorada.",
          "Pica la carne en trozos pequeños.",
          "Pica finamente la cebolla y el chile y mezcla con la carne y el zumo de cítricos.",
          "Calienta brevemente en una sartén y sazona con salsa de soja."
        ]
      },
      "variants": [
        "Variantes con pollo, pescado o tofu."
      ],
      "serving": [
        "Sirve con arroz o como plato pequeño."
      ],
      "commonMistakes": [
        "No añadas tanto líquido que la carne pierda toda su textura crujiente."
      ]
    },
    "de": {
      "overview": "Traditionelles Sisig kann Teile des Schweinekopfs und Leber enthalten; hier wird leicht erhältliches Schweinefleisch verwendet.",
      "history": "Sisig ist mit der Kapampangan-Esskultur verbunden und kommt in vielen modernen Formen vor.",
      "flavor": "Röstig, säuerlich und pikant.",
      "technique": "Fleisch knusprig braten, bevor es gehackt und mit frischen Zutaten vermischt wird.",
      "essentials": [
        "500 g Schweinebauch",
        "1 rote Zwiebel",
        "Chili nach Geschmack"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 60 Min.",
        "ingredients": [
          "500 g Schweinebauch",
          "1 rote Zwiebel",
          "Chili nach Geschmack",
          "2 EL Calamansi- oder Limettensaft",
          "1 EL Sojasauce",
          "Öl"
        ],
        "steps": [
          "Schweinebauch vollständig durchgaren und goldbraun braten.",
          "Fleisch in kleine Stücke hacken.",
          "Zwiebel und Chili fein hacken und mit Fleisch und Zitrussaft mischen.",
          "Kurz in der Pfanne erhitzen und mit Sojasauce abschmecken."
        ]
      },
      "variants": [
        "Varianten mit Hähnchen, Fisch oder Tofu."
      ],
      "serving": [
        "Mit Reis oder als kleines Gericht servieren."
      ],
      "commonMistakes": [
        "Nicht so viel Flüssigkeit hinzufügen, dass das Fleisch seine Knusprigkeit völlig verliert."
      ]
    }
  },
  "lechon": {
    "en": {
      "overview": "A whole pig is traditionally roasted on a spit; this home version uses oven-roasted pork belly.",
      "history": "Lechon is known as festive food in the Philippines, including in Cebu.",
      "flavor": "Crisp, salty skin and rich meat.",
      "technique": "Dry the skin well and roast the meat gently before increasing the heat towards the end.",
      "essentials": [
        "1.2 kg pork belly with skin",
        "salt",
        "pepper"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 3 hours",
        "ingredients": [
          "1.2 kg pork belly with skin",
          "salt",
          "pepper",
          "garlic",
          "2 stalks lemongrass"
        ],
        "steps": [
          "Dry the skin and season the meat side with salt, pepper and aromatics.",
          "Place the meat skin-side up in a roasting dish.",
          "Roast at 160 °C until the meat is tender and cooked through.",
          "Increase the heat towards the end and watch carefully until the skin is crisp."
        ]
      },
      "variants": [
        "Lechon sa hurno is oven-roasted; lechon kawali is a distinct deep-fried variant."
      ],
      "serving": [
        "Serve with rice and your preferred sauce."
      ],
      "commonMistakes": [
        "Do not let the skin burn during the final high-heat stage."
      ]
    },
    "fr": {
      "overview": "Traditionnellement, un porc entier est rôti à la broche ; cette version maison utilise de la poitrine de porc au four.",
      "history": "Le lechon est un plat de fête connu aux Philippines, notamment à Cebu.",
      "flavor": "Couenne croustillante et salée, viande savoureuse.",
      "technique": "Bien sécher la couenne et cuire la viande doucement avant d’augmenter la température en fin de cuisson.",
      "essentials": [
        "1,2 kg de poitrine de porc avec couenne",
        "sel",
        "poivre"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 3 heures",
        "ingredients": [
          "1,2 kg de poitrine de porc avec couenne",
          "sel",
          "poivre",
          "ail",
          "2 tiges de citronnelle"
        ],
        "steps": [
          "Sécher la couenne et assaisonner le côté chair avec du sel, du poivre et des aromates.",
          "Disposer la viande dans un plat, couenne vers le haut.",
          "Rôtir à 160 °C jusqu’à ce que la viande soit tendre et cuite à cœur.",
          "Augmenter la température en fin de cuisson et surveiller attentivement jusqu’à ce que la couenne soit croustillante."
        ]
      },
      "variants": [
        "Le lechon sa hurno est rôti au four ; le lechon kawali est une variante distincte cuite en friture."
      ],
      "serving": [
        "Servir avec du riz et la sauce de son choix."
      ],
      "commonMistakes": [
        "Ne pas laisser brûler la couenne pendant la cuisson finale à haute température."
      ]
    },
    "pt": {
      "overview": "Tradicionalmente assa-se um porco inteiro no espeto; esta versão caseira usa barriga de porco no forno.",
      "history": "O lechon é conhecido como prato festivo nas Filipinas, nomeadamente em Cebu.",
      "flavor": "Pele crocante e salgada e carne de sabor intenso.",
      "technique": "Seque bem a pele e asse a carne lentamente antes de aumentar a temperatura perto do fim.",
      "essentials": [
        "1,2 kg de barriga de porco com pele",
        "sal",
        "pimenta"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 3 horas",
        "ingredients": [
          "1,2 kg de barriga de porco com pele",
          "sal",
          "pimenta",
          "alho",
          "2 talos de erva-príncipe"
        ],
        "steps": [
          "Seque a pele e tempere o lado da carne com sal, pimenta e aromáticos.",
          "Coloque a carne num tabuleiro com a pele virada para cima.",
          "Asse a 160 °C até a carne ficar tenra e bem cozinhada.",
          "Aumente a temperatura perto do fim e vigie atentamente até a pele ficar crocante."
        ]
      },
      "variants": [
        "O lechon sa hurno é assado no forno; o lechon kawali é uma variante distinta frita em imersão."
      ],
      "serving": [
        "Sirva com arroz e molho a gosto."
      ],
      "commonMistakes": [
        "Não deixe a pele queimar durante a fase final de temperatura elevada."
      ]
    },
    "es": {
      "overview": "Tradicionalmente se asa un cerdo entero en un espetón; esta versión casera usa panceta al horno.",
      "history": "El lechon es conocido como plato festivo en Filipinas, entre otros lugares en Cebú.",
      "flavor": "Piel crujiente y salada y carne de sabor intenso.",
      "technique": "Seca bien la piel y asa la carne suavemente antes de aumentar la temperatura hacia el final.",
      "essentials": [
        "1,2 kg de panceta con piel",
        "sal",
        "pimienta"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 3 horas",
        "ingredients": [
          "1,2 kg de panceta con piel",
          "sal",
          "pimienta",
          "ajo",
          "2 tallos de hierba limón"
        ],
        "steps": [
          "Seca la piel y sazona el lado de la carne con sal, pimienta y aromáticos.",
          "Coloca la carne en una fuente con la piel hacia arriba.",
          "Asa a 160 °C hasta que la carne esté tierna y hecha por dentro.",
          "Aumenta la temperatura hacia el final y vigila atentamente hasta que la piel esté crujiente."
        ]
      },
      "variants": [
        "El lechon sa hurno se asa al horno; el lechon kawali es una variante distinta frita en abundante aceite."
      ],
      "serving": [
        "Sirve con arroz y la salsa que prefieras."
      ],
      "commonMistakes": [
        "No dejes que la piel se queme durante la fase final a temperatura alta."
      ]
    },
    "de": {
      "overview": "Traditionell wird ein ganzes Schwein am Spieß gebraten; diese Hausvariante verwendet Schweinebauch aus dem Ofen.",
      "history": "Lechon ist auf den Philippinen, unter anderem auf Cebu, als Festessen bekannt.",
      "flavor": "Knusprige, salzige Schwarte und kräftiges Fleisch.",
      "technique": "Schwarte gut trocknen und Fleisch sanft braten, bevor gegen Ende die Hitze erhöht wird.",
      "essentials": [
        "1,2 kg Schweinebauch mit Schwarte",
        "Salz",
        "Pfeffer"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 3 Stunden",
        "ingredients": [
          "1,2 kg Schweinebauch mit Schwarte",
          "Salz",
          "Pfeffer",
          "Knoblauch",
          "2 Stängel Zitronengras"
        ],
        "steps": [
          "Schwarte trocknen und Fleischseite mit Salz, Pfeffer und Aromaten würzen.",
          "Fleisch mit der Schwarte nach oben in eine Bratform legen.",
          "Bei 160 °C braten, bis das Fleisch weich und vollständig gar ist.",
          "Gegen Ende die Hitze erhöhen und sorgfältig beobachten, bis die Schwarte knusprig ist."
        ]
      },
      "variants": [
        "Lechon sa Hurno wird im Ofen gebraten; Lechon Kawali ist eine eigenständige frittierte Variante."
      ],
      "serving": [
        "Mit Reis und Sauce nach Wahl servieren."
      ],
      "commonMistakes": [
        "Schwarte bei der abschließenden hohen Hitze nicht verbrennen lassen."
      ]
    }
  },
  "pancit": {
    "en": {
      "overview": "Pancit is an umbrella term; this recipe is a home version of pancit bihon with rice noodles.",
      "history": "Noodle dishes such as pancit are common both in everyday life and at Filipino celebrations.",
      "flavor": "Salty, aromatic and lightly roasted.",
      "technique": "Cook the noodles until just tender in flavourful stock.",
      "essentials": [
        "250 g bihon rice noodles",
        "250 g chicken",
        "1 carrot"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40 min",
        "ingredients": [
          "250 g bihon rice noodles",
          "250 g chicken",
          "1 carrot",
          "200 g cabbage",
          "1 onion",
          "2 garlic cloves",
          "400 ml stock",
          "soy sauce",
          "lime"
        ],
        "steps": [
          "Cut the chicken and vegetables into small pieces.",
          "Fry the onion, garlic and chicken until the chicken is cooked through; fold in the vegetables.",
          "Add stock and soy sauce and let the rice noodles soften according to the packet instructions.",
          "Combine everything and season with lime."
        ]
      },
      "variants": [
        "Pancit canton uses wheat noodles; pancit palabok has a different sauce and topping."
      ],
      "serving": [
        "Serve with calamansi or lime."
      ],
      "commonMistakes": [
        "Do not cook the noodles until they disintegrate."
      ]
    },
    "fr": {
      "overview": "Pancit est un terme générique ; cette recette est une version maison du pancit bihon aux nouilles de riz.",
      "history": "Les plats de nouilles comme le pancit sont courants au quotidien et lors des fêtes philippines.",
      "flavor": "Salé, aromatique et légèrement grillé.",
      "technique": "Cuire les nouilles juste à point dans un bouillon savoureux.",
      "essentials": [
        "250 g de nouilles de riz bihon",
        "250 g de poulet",
        "1 carotte"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40 min",
        "ingredients": [
          "250 g de nouilles de riz bihon",
          "250 g de poulet",
          "1 carotte",
          "200 g de chou",
          "1 oignon",
          "2 gousses d’ail",
          "400 ml de bouillon",
          "sauce soja",
          "citron vert"
        ],
        "steps": [
          "Couper le poulet et les légumes en petits morceaux.",
          "Faire revenir l’oignon, l’ail et le poulet jusqu’à cuisson complète du poulet ; incorporer les légumes.",
          "Ajouter le bouillon et la sauce soja, puis laisser les nouilles de riz s’attendrir selon les instructions du paquet.",
          "Mélanger le tout et assaisonner avec du citron vert."
        ]
      },
      "variants": [
        "Le pancit canton utilise des nouilles de blé ; le pancit palabok possède une sauce et une garniture différentes."
      ],
      "serving": [
        "Servir avec du calamansi ou du citron vert."
      ],
      "commonMistakes": [
        "Ne pas cuire les nouilles jusqu’à ce qu’elles se désagrègent."
      ]
    },
    "pt": {
      "overview": "Pancit é uma designação abrangente; esta receita é uma versão caseira de pancit bihon com noodles de arroz.",
      "history": "Pratos de noodles como o pancit são comuns no quotidiano e nas celebrações filipinas.",
      "flavor": "Salgado, aromático e ligeiramente tostado.",
      "technique": "Coza os noodles num caldo saboroso até ficarem apenas tenros.",
      "essentials": [
        "250 g de noodles de arroz bihon",
        "250 g de frango",
        "1 cenoura"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40 min",
        "ingredients": [
          "250 g de noodles de arroz bihon",
          "250 g de frango",
          "1 cenoura",
          "200 g de couve",
          "1 cebola",
          "2 dentes de alho",
          "400 ml de caldo",
          "molho de soja",
          "lima"
        ],
        "steps": [
          "Corte o frango e os legumes em pedaços pequenos.",
          "Salteie a cebola, o alho e o frango até este estar bem cozinhado; envolva os legumes.",
          "Junte caldo e molho de soja e deixe os noodles de arroz amolecer de acordo com as instruções da embalagem.",
          "Misture tudo e tempere com lima."
        ]
      },
      "variants": [
        "O pancit canton usa noodles de trigo; o pancit palabok tem outro molho e cobertura."
      ],
      "serving": [
        "Sirva com calamansi ou lima."
      ],
      "commonMistakes": [
        "Não coza os noodles até se desfazerem."
      ]
    },
    "es": {
      "overview": "Pancit es un término genérico; esta receta es una versión casera de pancit bihon con fideos de arroz.",
      "history": "Los platos de fideos como el pancit son habituales tanto a diario como en las celebraciones filipinas.",
      "flavor": "Salado, aromático y ligeramente tostado.",
      "technique": "Cuece los fideos en un caldo sabroso hasta que estén justo tiernos.",
      "essentials": [
        "250 g de fideos de arroz bihon",
        "250 g de pollo",
        "1 zanahoria"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40 min",
        "ingredients": [
          "250 g de fideos de arroz bihon",
          "250 g de pollo",
          "1 zanahoria",
          "200 g de col",
          "1 cebolla",
          "2 dientes de ajo",
          "400 ml de caldo",
          "salsa de soja",
          "lima"
        ],
        "steps": [
          "Corta el pollo y las verduras en trozos pequeños.",
          "Saltea la cebolla, el ajo y el pollo hasta que esté hecho por dentro; incorpora las verduras.",
          "Añade caldo y salsa de soja y deja que los fideos de arroz se ablanden según las instrucciones del envase.",
          "Mezcla todo y sazona con lima."
        ]
      },
      "variants": [
        "El pancit canton utiliza fideos de trigo; el pancit palabok tiene otra salsa y otros ingredientes por encima."
      ],
      "serving": [
        "Sirve con calamansí o lima."
      ],
      "commonMistakes": [
        "No cuezas los fideos hasta que se deshagan."
      ]
    },
    "de": {
      "overview": "Pancit ist ein Sammelbegriff; dieses Rezept ist eine Hausvariante von Pancit Bihon mit Reisnudeln.",
      "history": "Nudelgerichte wie Pancit sind sowohl im philippinischen Alltag als auch bei Festen verbreitet.",
      "flavor": "Salzig, aromatisch und leicht röstig.",
      "technique": "Nudeln in geschmackvoller Brühe gerade weich garen.",
      "essentials": [
        "250 g Bihon-Reisnudeln",
        "250 g Hähnchen",
        "1 Karotte"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40 Min.",
        "ingredients": [
          "250 g Bihon-Reisnudeln",
          "250 g Hähnchen",
          "1 Karotte",
          "200 g Kohl",
          "1 Zwiebel",
          "2 Knoblauchzehen",
          "400 ml Brühe",
          "Sojasauce",
          "Limette"
        ],
        "steps": [
          "Hähnchen und Gemüse in kleine Stücke schneiden.",
          "Zwiebel, Knoblauch und Hähnchen braten, bis das Hähnchen durchgegart ist; Gemüse unterheben.",
          "Brühe und Sojasauce hinzufügen und Reisnudeln nach Packungsanleitung darin gar ziehen lassen.",
          "Alles vermengen und mit Limette abschmecken."
        ]
      },
      "variants": [
        "Pancit Canton verwendet Weizennudeln; Pancit Palabok hat eine andere Sauce und Garnitur."
      ],
      "serving": [
        "Mit Calamansi oder Limette servieren."
      ],
      "commonMistakes": [
        "Nudeln nicht so lange garen, dass sie zerfallen."
      ]
    }
  },
  "kare-kare": {
    "en": {
      "overview": "Tender meat and vegetables are served in a nut-based sauce, often with fermented shrimp paste on the side.",
      "history": "Kare-kare is an established Filipino stew, often made with oxtail.",
      "flavor": "Mild, nutty and rich.",
      "technique": "Cook the meat until tender separately before preparing the sauce.",
      "essentials": [
        "800 g oxtail",
        "1 aubergine",
        "150 g long beans"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 3 hours",
        "ingredients": [
          "800 g oxtail",
          "1 aubergine",
          "150 g long beans",
          "pak choi",
          "100 g unsweetened peanut butter",
          "1 onion",
          "2 garlic cloves",
          "600 ml stock",
          "2 tbsp rice flour",
          "bagoong to taste"
        ],
        "steps": [
          "Simmer the oxtail in water until tender and reserve the stock.",
          "Fry onion and garlic, then add stock and peanut butter.",
          "Thicken with rice flour mixed with liquid and simmer.",
          "Add meat and vegetables and cook until the vegetables are tender."
        ]
      },
      "variants": [
        "Vegetarian versions can use tofu and mushrooms, vegetable stock and plant-based accompaniments instead of bagoong."
      ],
      "serving": [
        "Serve with rice and optionally bagoong."
      ],
      "commonMistakes": [
        "Do not boil the sauce so vigorously that it burns."
      ]
    },
    "fr": {
      "overview": "De la viande tendre et des légumes sont servis dans une sauce à base de fruits à coque ou d’arachides, souvent avec de la pâte de crevettes fermentée à part.",
      "history": "Le kare-kare est un ragoût philippin traditionnel, souvent préparé avec de la queue de bœuf.",
      "flavor": "Doux, aux notes de noix et généreux.",
      "technique": "Cuire la viande séparément jusqu’à tendreté avant de préparer la sauce.",
      "essentials": [
        "800 g de queue de bœuf",
        "1 aubergine",
        "150 g de haricots longs"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 3 heures",
        "ingredients": [
          "800 g de queue de bœuf",
          "1 aubergine",
          "150 g de haricots longs",
          "pak choï",
          "100 g de beurre de cacahuète non sucré",
          "1 oignon",
          "2 gousses d’ail",
          "600 ml de bouillon",
          "2 c. à soupe de farine de riz",
          "bagoong selon le goût"
        ],
        "steps": [
          "Laisser mijoter la queue de bœuf dans l’eau jusqu’à tendreté et conserver le bouillon.",
          "Faire revenir l’oignon et l’ail, puis ajouter le bouillon et le beurre de cacahuète.",
          "Épaissir avec de la farine de riz délayée et laisser mijoter.",
          "Ajouter la viande et les légumes et cuire jusqu’à tendreté des légumes."
        ]
      },
      "variants": [
        "Les variantes végétariennes peuvent utiliser du tofu et des champignons, du bouillon de légumes et un accompagnement végétal à la place du bagoong."
      ],
      "serving": [
        "Servir avec du riz et éventuellement du bagoong."
      ],
      "commonMistakes": [
        "Ne pas faire bouillir la sauce si fort qu’elle attache et brûle."
      ]
    },
    "pt": {
      "overview": "Carne tenra e legumes são servidos num molho à base de frutos secos ou amendoim, frequentemente com pasta de camarão fermentada à parte.",
      "history": "O kare-kare é um guisado filipino tradicional, frequentemente feito com rabo de boi.",
      "flavor": "Suave, com notas de frutos secos e encorpado.",
      "technique": "Coza a carne separadamente até ficar tenra antes de preparar o molho.",
      "essentials": [
        "800 g de rabo de boi",
        "1 beringela",
        "150 g de feijão-de-metro"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 3 horas",
        "ingredients": [
          "800 g de rabo de boi",
          "1 beringela",
          "150 g de feijão-de-metro",
          "pak choi",
          "100 g de manteiga de amendoim sem açúcar",
          "1 cebola",
          "2 dentes de alho",
          "600 ml de caldo",
          "2 c. de sopa de farinha de arroz",
          "bagoong a gosto"
        ],
        "steps": [
          "Coza o rabo de boi em lume brando até ficar tenro e reserve o caldo.",
          "Salteie a cebola e o alho, depois junte o caldo e a manteiga de amendoim.",
          "Engrosse com farinha de arroz dissolvida em líquido e deixe cozinhar em lume brando.",
          "Junte a carne e os legumes e cozinhe até os legumes ficarem tenros."
        ]
      },
      "variants": [
        "As variantes vegetarianas podem usar tofu e cogumelos, caldo de legumes e acompanhamentos vegetais em vez de bagoong."
      ],
      "serving": [
        "Sirva com arroz e, se desejar, bagoong."
      ],
      "commonMistakes": [
        "Não deixe o molho ferver tão intensamente que se queime."
      ]
    },
    "es": {
      "overview": "Carne tierna y verduras se sirven en una salsa a base de frutos secos o cacahuetes, a menudo con pasta de gambas fermentada aparte.",
      "history": "El kare-kare es un guiso filipino tradicional, a menudo preparado con rabo de vacuno.",
      "flavor": "Suave, con notas de frutos secos y con cuerpo.",
      "technique": "Cuece la carne por separado hasta que esté tierna antes de preparar la salsa.",
      "essentials": [
        "800 g de rabo de vacuno",
        "1 berenjena",
        "150 g de judías largas"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 3 horas",
        "ingredients": [
          "800 g de rabo de vacuno",
          "1 berenjena",
          "150 g de judías largas",
          "pak choi",
          "100 g de crema de cacahuete sin azúcar",
          "1 cebolla",
          "2 dientes de ajo",
          "600 ml de caldo",
          "2 cucharadas de harina de arroz",
          "bagoong al gusto"
        ],
        "steps": [
          "Cuece el rabo de vacuno a fuego lento en agua hasta que esté tierno y reserva el caldo.",
          "Sofríe la cebolla y el ajo, añade caldo y crema de cacahuete.",
          "Espesa con harina de arroz disuelta en líquido y cuece a fuego lento.",
          "Añade la carne y las verduras y cuece hasta que las verduras estén tiernas."
        ]
      },
      "variants": [
        "Las variantes vegetarianas pueden usar tofu y setas, caldo de verduras y acompañamientos vegetales en lugar de bagoong."
      ],
      "serving": [
        "Sirve con arroz y, si quieres, bagoong."
      ],
      "commonMistakes": [
        "No hiervas la salsa tan fuerte que se queme."
      ]
    },
    "de": {
      "overview": "Zartes Fleisch und Gemüse werden in einer nussbasierten Sauce serviert, oft mit fermentierter Garnelenpaste als Beilage.",
      "history": "Kare-Kare ist ein etabliertes philippinisches Schmorgericht, oft mit Ochsenschwanz zubereitet.",
      "flavor": "Mild, nussig und vollmundig.",
      "technique": "Fleisch separat weich garen, bevor die Sauce zubereitet wird.",
      "essentials": [
        "800 g Ochsenschwanz",
        "1 Aubergine",
        "150 g Meterbohnen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 3 Stunden",
        "ingredients": [
          "800 g Ochsenschwanz",
          "1 Aubergine",
          "150 g Meterbohnen",
          "Pak Choi",
          "100 g ungesüßte Erdnussbutter",
          "1 Zwiebel",
          "2 Knoblauchzehen",
          "600 ml Brühe",
          "2 EL Reismehl",
          "Bagoong nach Geschmack"
        ],
        "steps": [
          "Ochsenschwanz in Wasser weich schmoren und Brühe aufbewahren.",
          "Zwiebel und Knoblauch anschwitzen, Brühe und Erdnussbutter hinzufügen.",
          "Mit angerührtem Reismehl binden und köcheln lassen.",
          "Fleisch und Gemüse hinzufügen und garen, bis das Gemüse weich ist."
        ]
      },
      "variants": [
        "Vegetarische Varianten können Tofu und Pilze, Gemüsebrühe und pflanzliche Beilagen statt Bagoong verwenden."
      ],
      "serving": [
        "Mit Reis und nach Wunsch Bagoong servieren."
      ],
      "commonMistakes": [
        "Sauce nicht so stark kochen lassen, dass sie anbrennt."
      ]
    }
  },
  "injera": {
    "en": {
      "overview": "A fermented batter is cooked on one side so that small pores form on the surface.",
      "history": "Injera is fundamental to Ethiopian and Eritrean meals and serves both as a base and as a means of eating stews.",
      "flavor": "Tangy, slightly nutty and spongy.",
      "technique": "Use a smooth batter and cook on only one side under a lid.",
      "essentials": [
        "300 g teff flour",
        "100 g active teff sourdough starter",
        "500–650 ml water as needed"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min + fermentation",
        "ingredients": [
          "300 g teff flour",
          "100 g active teff sourdough starter",
          "500–650 ml water as needed",
          "salt"
        ],
        "steps": [
          "Mix flour, sourdough starter and water in a clean bowl.",
          "Let the batter ferment until distinctly tangy and bubbly, usually one to several days depending on the starter and temperature.",
          "Adjust to a runny pancake batter and add a little salt.",
          "Pour a thin layer into a hot non-stick pan, cover when pores form and cook until the surface is set.",
          "Lift out the bread without turning it and cool separately."
        ]
      },
      "variants": [
        "Other grains may be mixed with teff; this is a simplified sourdough version."
      ],
      "serving": [
        "Serve with wat, shiro or zigni."
      ],
      "commonMistakes": [
        "Do not turn the bread or stack it while wet and hot. Discard the batter if there are signs of mould."
      ]
    },
    "fr": {
      "overview": "Une pâte fermentée est cuite d’un seul côté afin que de petits pores se forment à la surface.",
      "history": "L’injera est au cœur des repas éthiopiens et érythréens et sert à la fois de support et à saisir les ragoûts.",
      "flavor": "Acidulé, légèrement noisetté et spongieux.",
      "technique": "Utiliser une pâte homogène et cuire d’un seul côté à couvert.",
      "essentials": [
        "300 g de farine de teff",
        "100 g de levain de teff actif",
        "500–650 ml d’eau selon les besoins"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min + fermentation",
        "ingredients": [
          "300 g de farine de teff",
          "100 g de levain de teff actif",
          "500–650 ml d’eau selon les besoins",
          "sel"
        ],
        "steps": [
          "Mélanger la farine, le levain et l’eau dans un bol propre.",
          "Laisser fermenter jusqu’à ce que la pâte soit nettement acidulée et pétillante, généralement un à plusieurs jours selon le levain et la température.",
          "Ajuster pour obtenir une pâte à crêpes fluide et ajouter un peu de sel.",
          "Verser une fine couche dans une poêle antiadhésive chaude, couvrir quand les pores se forment et cuire jusqu’à ce que la surface soit ferme.",
          "Retirer le pain sans le retourner et le laisser refroidir séparément."
        ]
      },
      "variants": [
        "D’autres céréales peuvent être mélangées au teff ; il s’agit ici d’une version simplifiée au levain."
      ],
      "serving": [
        "Servir avec du wat, du shiro ou du zigni."
      ],
      "commonMistakes": [
        "Ne pas retourner le pain ni l’empiler tant qu’il est humide et chaud. Jeter la pâte en présence de moisissure."
      ]
    },
    "pt": {
      "overview": "Uma massa fermentada é cozinhada apenas de um lado, formando pequenos poros à superfície.",
      "history": "A injera é fundamental nas refeições etíopes e eritreias e serve tanto de base como para comer os guisados.",
      "flavor": "Ácida, ligeiramente semelhante a frutos secos e esponjosa.",
      "technique": "Use uma massa homogénea e cozinhe apenas de um lado com tampa.",
      "essentials": [
        "300 g de farinha de teff",
        "100 g de massa-mãe de teff ativa",
        "500–650 ml de água conforme necessário"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min + fermentação",
        "ingredients": [
          "300 g de farinha de teff",
          "100 g de massa-mãe de teff ativa",
          "500–650 ml de água conforme necessário",
          "sal"
        ],
        "steps": [
          "Misture farinha, massa-mãe e água numa tigela limpa.",
          "Deixe a massa fermentar até estar nitidamente ácida e com bolhas, normalmente um a vários dias, consoante a massa-mãe e a temperatura.",
          "Ajuste até obter uma massa líquida de panquecas e junte um pouco de sal.",
          "Verta uma camada fina numa frigideira antiaderente quente, tape quando os poros se formarem e cozinhe até a superfície firmar.",
          "Retire o pão sem o virar e deixe arrefecer separadamente."
        ]
      },
      "variants": [
        "Outros cereais podem ser misturados com teff; esta é uma versão simplificada com massa-mãe."
      ],
      "serving": [
        "Sirva com wat, shiro ou zigni."
      ],
      "commonMistakes": [
        "Não vire o pão nem o empilhe enquanto estiver húmido e quente. Deite fora a massa se apresentar sinais de bolor."
      ]
    },
    "es": {
      "overview": "Una masa fermentada se cocina por un solo lado para que se formen pequeños poros en la superficie.",
      "history": "La injera es fundamental en las comidas etíopes y eritreas y sirve tanto de base como para comer los guisos.",
      "flavor": "Ácida, con ligeras notas de frutos secos y esponjosa.",
      "technique": "Usa una masa homogénea y cocina solo por un lado con tapa.",
      "essentials": [
        "300 g de harina de teff",
        "100 g de masa madre de teff activa",
        "500–650 ml de agua según sea necesario"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min + fermentación",
        "ingredients": [
          "300 g de harina de teff",
          "100 g de masa madre de teff activa",
          "500–650 ml de agua según sea necesario",
          "sal"
        ],
        "steps": [
          "Mezcla harina, masa madre y agua en un bol limpio.",
          "Deja fermentar hasta que la masa esté claramente ácida y burbujeante, normalmente de uno a varios días según la masa madre y la temperatura.",
          "Ajusta hasta obtener una masa líquida de tortitas y añade un poco de sal.",
          "Vierte una capa fina en una sartén antiadherente caliente, tapa cuando se formen los poros y cocina hasta que la superficie esté firme.",
          "Retira el pan sin darle la vuelta y deja enfriar por separado."
        ]
      },
      "variants": [
        "Se pueden mezclar otros cereales con teff; esta es una versión simplificada con masa madre."
      ],
      "serving": [
        "Sirve con wat, shiro o zigni."
      ],
      "commonMistakes": [
        "No des la vuelta al pan ni lo apiles mientras esté húmedo y caliente. Desecha la masa si presenta señales de moho."
      ]
    },
    "de": {
      "overview": "Ein fermentierter Teig wird einseitig gebacken, sodass sich kleine Poren an der Oberfläche bilden.",
      "history": "Injera ist ein Grundbestandteil äthiopischer und eritreischer Mahlzeiten und dient sowohl als Unterlage als auch zum Essen von Eintöpfen.",
      "flavor": "Säuerlich, leicht nussig und schwammartig.",
      "technique": "Einen gleichmäßigen Teig verwenden und nur auf einer Seite zugedeckt backen.",
      "essentials": [
        "300 g Teffmehl",
        "100 g aktiver Teff-Sauerteig",
        "500–650 ml Wasser nach Bedarf"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min. + Fermentation",
        "ingredients": [
          "300 g Teffmehl",
          "100 g aktiver Teff-Sauerteig",
          "500–650 ml Wasser nach Bedarf",
          "Salz"
        ],
        "steps": [
          "Mehl, Sauerteig und Wasser in einer sauberen Schüssel mischen.",
          "Teig fermentieren lassen, bis er deutlich säuerlich ist und Blasen bildet, meist einen bis mehrere Tage je nach Sauerteig und Temperatur.",
          "Konsistenz eines flüssigen Pfannkuchenteigs einstellen und etwas Salz hinzufügen.",
          "Eine dünne Schicht in eine heiße beschichtete Pfanne gießen, bei Porenbildung abdecken und backen, bis die Oberfläche fest ist.",
          "Fladen ohne Wenden herausheben und einzeln abkühlen lassen."
        ]
      },
      "variants": [
        "Andere Getreidesorten können mit Teff gemischt werden; dies ist eine vereinfachte Sauerteigvariante."
      ],
      "serving": [
        "Mit Wat, Shiro oder Zigni servieren."
      ],
      "commonMistakes": [
        "Fladen nicht wenden oder stapeln, solange er feucht und heiß ist. Teig bei Anzeichen von Schimmel entsorgen."
      ]
    }
  },
  "doro-wat": {
    "en": {
      "overview": "Finely chopped onions are reduced to a concentrated base before chicken and spices are added.",
      "history": "Doro wat is associated with festive meals and holidays in Ethiopia.",
      "flavor": "Rich, hot and aromatic.",
      "technique": "Let the onions soften and reduce before adding spices and chicken.",
      "essentials": [
        "800 g chicken thighs",
        "4 onions",
        "3 garlic cloves"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 2 hours",
        "ingredients": [
          "800 g chicken thighs",
          "4 onions",
          "3 garlic cloves",
          "ginger",
          "2 tbsp berbere, or to taste",
          "3 tbsp niter kibbeh or butter",
          "300 ml water",
          "4 hard-boiled eggs"
        ],
        "steps": [
          "Finely chop the onions and let them soften in a pot, stirring.",
          "Add butter, garlic, ginger and berbere.",
          "Add chicken and water and simmer covered until the chicken is cooked through and tender.",
          "Add peeled hard-boiled eggs and heat through."
        ]
      },
      "variants": [
        "Alicha doro wat is a milder version containing turmeric, among other spices."
      ],
      "serving": [
        "Serve with injera."
      ],
      "commonMistakes": [
        "Do not burn the onions or berbere."
      ]
    },
    "fr": {
      "overview": "Des oignons finement hachés sont réduits en une base concentrée avant d’ajouter le poulet et les épices.",
      "history": "Le doro wat est associé aux repas de fête et aux célébrations en Éthiopie.",
      "flavor": "Généreux, piquant et aromatique.",
      "technique": "Laisser les oignons s’attendrir et réduire avant d’ajouter les épices et le poulet.",
      "essentials": [
        "800 g de cuisses de poulet",
        "4 oignons",
        "3 gousses d’ail"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 2 heures",
        "ingredients": [
          "800 g de cuisses de poulet",
          "4 oignons",
          "3 gousses d’ail",
          "gingembre",
          "2 c. à soupe de berbere, ou selon le goût",
          "3 c. à soupe de niter kibbeh ou de beurre",
          "300 ml d’eau",
          "4 œufs durs"
        ],
        "steps": [
          "Hacher finement les oignons et les laisser s’attendrir dans une marmite en remuant.",
          "Ajouter le beurre, l’ail, le gingembre et le berbere.",
          "Ajouter le poulet et l’eau et laisser mijoter à couvert jusqu’à ce que le poulet soit cuit à cœur et tendre.",
          "Ajouter les œufs durs écalés et bien réchauffer."
        ]
      },
      "variants": [
        "L’alicha doro wat est une variante plus douce contenant notamment du curcuma."
      ],
      "serving": [
        "Servir avec de l’injera."
      ],
      "commonMistakes": [
        "Ne pas brûler les oignons ni le berbere."
      ]
    },
    "pt": {
      "overview": "Cebolas finamente picadas são cozinhadas até formarem uma base concentrada antes de juntar frango e especiarias.",
      "history": "O doro wat está associado a refeições festivas e celebrações na Etiópia.",
      "flavor": "Encorpado, picante e aromático.",
      "technique": "Deixe as cebolas amolecer e reduzir antes de juntar especiarias e frango.",
      "essentials": [
        "800 g de coxas de frango",
        "4 cebolas",
        "3 dentes de alho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 2 horas",
        "ingredients": [
          "800 g de coxas de frango",
          "4 cebolas",
          "3 dentes de alho",
          "gengibre",
          "2 c. de sopa de berbere, ou a gosto",
          "3 c. de sopa de niter kibbeh ou manteiga",
          "300 ml de água",
          "4 ovos cozidos"
        ],
        "steps": [
          "Pique finamente as cebolas e deixe amolecer num tacho, mexendo.",
          "Junte manteiga, alho, gengibre e berbere.",
          "Junte frango e água e deixe cozinhar em lume brando com tampa até o frango estar bem cozinhado e tenro.",
          "Junte os ovos cozidos descascados e aqueça bem."
        ]
      },
      "variants": [
        "O alicha doro wat é uma variante mais suave que contém, entre outras especiarias, curcuma."
      ],
      "serving": [
        "Sirva com injera."
      ],
      "commonMistakes": [
        "Não deixe queimar a cebola nem o berbere."
      ]
    },
    "es": {
      "overview": "La cebolla picada fina se reduce hasta formar una base concentrada antes de añadir pollo y especias.",
      "history": "El doro wat se asocia con comidas festivas y celebraciones en Etiopía.",
      "flavor": "Intenso, picante y aromático.",
      "technique": "Deja que la cebolla se ablande y reduzca antes de añadir especias y pollo.",
      "essentials": [
        "800 g de muslos de pollo",
        "4 cebollas",
        "3 dientes de ajo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 2 horas",
        "ingredients": [
          "800 g de muslos de pollo",
          "4 cebollas",
          "3 dientes de ajo",
          "jengibre",
          "2 cucharadas de berbere, o al gusto",
          "3 cucharadas de niter kibbeh o mantequilla",
          "300 ml de agua",
          "4 huevos duros"
        ],
        "steps": [
          "Pica finamente la cebolla y deja que se ablande en una olla, removiendo.",
          "Añade mantequilla, ajo, jengibre y berbere.",
          "Añade pollo y agua y cuece a fuego lento con tapa hasta que el pollo esté hecho por dentro y tierno.",
          "Añade los huevos duros pelados y calienta bien."
        ]
      },
      "variants": [
        "El alicha doro wat es una variante más suave que contiene, entre otras especias, cúrcuma."
      ],
      "serving": [
        "Sirve con injera."
      ],
      "commonMistakes": [
        "No quemes la cebolla ni el berbere."
      ]
    },
    "de": {
      "overview": "Fein gehackte Zwiebeln werden zu einer konzentrierten Basis eingekocht, bevor Hähnchen und Gewürze hinzukommen.",
      "history": "Doro Wat wird in Äthiopien mit Festessen und Feiertagen verbunden.",
      "flavor": "Kräftig, scharf und aromatisch.",
      "technique": "Zwiebeln weich werden und einkochen lassen, bevor Gewürze und Hähnchen hinzukommen.",
      "essentials": [
        "800 g Hähnchenschenkel",
        "4 Zwiebeln",
        "3 Knoblauchzehen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 2 Stunden",
        "ingredients": [
          "800 g Hähnchenschenkel",
          "4 Zwiebeln",
          "3 Knoblauchzehen",
          "Ingwer",
          "2 EL Berbere oder nach Geschmack",
          "3 EL Niter Kibbeh oder Butter",
          "300 ml Wasser",
          "4 hartgekochte Eier"
        ],
        "steps": [
          "Zwiebeln fein hacken und unter Rühren in einem Topf weich garen.",
          "Butter, Knoblauch, Ingwer und Berbere hinzufügen.",
          "Hähnchen und Wasser hinzufügen und zugedeckt schmoren, bis das Hähnchen durchgegart und zart ist.",
          "Geschälte hartgekochte Eier hinzufügen und durchwärmen."
        ]
      },
      "variants": [
        "Alicha Doro Wat ist eine mildere Variante unter anderem mit Kurkuma."
      ],
      "serving": [
        "Mit Injera servieren."
      ],
      "commonMistakes": [
        "Zwiebeln und Berbere nicht anbrennen lassen."
      ]
    }
  },
  "shiro": {
    "en": {
      "overview": "The flour is cooked with onion, garlic and spices until a smooth sauce forms.",
      "history": "Shiro is a common Ethiopian everyday dish and can be prepared entirely from plant ingredients for fasting days.",
      "flavor": "Mildly nutty, creamy and spiced.",
      "technique": "Gradually whisk the flour into the liquid to avoid lumps.",
      "essentials": [
        "100 g shiro flour or chickpea flour",
        "1 onion",
        "2 garlic cloves"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 35 min",
        "ingredients": [
          "100 g shiro flour or chickpea flour",
          "1 onion",
          "2 garlic cloves",
          "1 tomato",
          "2 tbsp oil",
          "berbere to taste",
          "500 ml water"
        ],
        "steps": [
          "Fry finely chopped onion and garlic in oil.",
          "Add tomato and berbere and reduce.",
          "Add water and gradually whisk in the flour.",
          "Simmer while stirring until the flour is thoroughly cooked and the sauce is smooth."
        ]
      },
      "variants": [
        "Tegabino shiro is a thicker version; bozena shiro contains meat."
      ],
      "serving": [
        "Serve with injera."
      ],
      "commonMistakes": [
        "Do not pour all the flour into the pot at once."
      ]
    },
    "fr": {
      "overview": "La farine cuit avec l’oignon, l’ail et les épices jusqu’à former une sauce lisse.",
      "history": "Le shiro est un plat éthiopien courant du quotidien qui peut être préparé entièrement avec des ingrédients végétaux pour les jours de jeûne.",
      "flavor": "Légèrement noisetté, crémeux et épicé.",
      "technique": "Incorporer progressivement la farine au liquide au fouet pour éviter les grumeaux.",
      "essentials": [
        "100 g de farine de shiro ou de pois chiches",
        "1 oignon",
        "2 gousses d’ail"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 35 min",
        "ingredients": [
          "100 g de farine de shiro ou de pois chiches",
          "1 oignon",
          "2 gousses d’ail",
          "1 tomate",
          "2 c. à soupe d’huile",
          "berbere selon le goût",
          "500 ml d’eau"
        ],
        "steps": [
          "Faire revenir l’oignon et l’ail finement hachés dans l’huile.",
          "Ajouter la tomate et le berbere et faire réduire.",
          "Ajouter l’eau et incorporer progressivement la farine au fouet.",
          "Laisser mijoter en remuant jusqu’à cuisson complète de la farine et obtention d’une sauce lisse."
        ]
      },
      "variants": [
        "Le tegabino shiro est une variante plus épaisse ; le bozena shiro contient de la viande."
      ],
      "serving": [
        "Servir avec de l’injera."
      ],
      "commonMistakes": [
        "Ne pas verser toute la farine dans la casserole en une seule fois."
      ]
    },
    "pt": {
      "overview": "A farinha é cozinhada com cebola, alho e especiarias até formar um molho liso.",
      "history": "O shiro é um prato etíope comum do quotidiano e pode ser preparado apenas com ingredientes vegetais para os dias de jejum.",
      "flavor": "Com ligeiras notas de frutos secos, cremoso e condimentado.",
      "technique": "Incorpore gradualmente a farinha no líquido, batendo para evitar grumos.",
      "essentials": [
        "100 g de farinha de shiro ou de grão-de-bico",
        "1 cebola",
        "2 dentes de alho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 35 min",
        "ingredients": [
          "100 g de farinha de shiro ou de grão-de-bico",
          "1 cebola",
          "2 dentes de alho",
          "1 tomate",
          "2 c. de sopa de óleo",
          "berbere a gosto",
          "500 ml de água"
        ],
        "steps": [
          "Salteie a cebola e o alho finamente picados em óleo.",
          "Junte tomate e berbere e deixe reduzir.",
          "Junte água e incorpore gradualmente a farinha, batendo.",
          "Deixe cozinhar em lume brando, mexendo, até a farinha estar bem cozida e o molho liso."
        ]
      },
      "variants": [
        "O tegabino shiro é uma variante mais espessa; o bozena shiro contém carne."
      ],
      "serving": [
        "Sirva com injera."
      ],
      "commonMistakes": [
        "Não verta toda a farinha no tacho de uma vez."
      ]
    },
    "es": {
      "overview": "La harina se cuece con cebolla, ajo y especias hasta formar una salsa lisa.",
      "history": "El shiro es un plato cotidiano etíope habitual y puede prepararse con ingredientes vegetales para los días de ayuno.",
      "flavor": "Con ligeras notas de frutos secos, cremoso y especiado.",
      "technique": "Incorpora poco a poco la harina al líquido con unas varillas para evitar grumos.",
      "essentials": [
        "100 g de harina de shiro o de garbanzos",
        "1 cebolla",
        "2 dientes de ajo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 35 min",
        "ingredients": [
          "100 g de harina de shiro o de garbanzos",
          "1 cebolla",
          "2 dientes de ajo",
          "1 tomate",
          "2 cucharadas de aceite",
          "berbere al gusto",
          "500 ml de agua"
        ],
        "steps": [
          "Sofríe la cebolla y el ajo picados finamente en aceite.",
          "Añade tomate y berbere y deja reducir.",
          "Añade agua e incorpora poco a poco la harina con unas varillas.",
          "Cuece a fuego lento removiendo hasta que la harina esté bien cocida y la salsa sea lisa."
        ]
      },
      "variants": [
        "El tegabino shiro es una variante más espesa; el bozena shiro contiene carne."
      ],
      "serving": [
        "Sirve con injera."
      ],
      "commonMistakes": [
        "No viertas toda la harina en la olla de golpe."
      ]
    },
    "de": {
      "overview": "Mehl wird mit Zwiebeln, Knoblauch und Gewürzen zu einer glatten Sauce gekocht.",
      "history": "Shiro ist ein verbreitetes äthiopisches Alltagsgericht und kann für Fastentage rein pflanzlich zubereitet werden.",
      "flavor": "Mild nussig, cremig und würzig.",
      "technique": "Mehl nach und nach in die Flüssigkeit einrühren, um Klumpen zu vermeiden.",
      "essentials": [
        "100 g Shiro-Mehl oder Kichererbsenmehl",
        "1 Zwiebel",
        "2 Knoblauchzehen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 35 Min.",
        "ingredients": [
          "100 g Shiro-Mehl oder Kichererbsenmehl",
          "1 Zwiebel",
          "2 Knoblauchzehen",
          "1 Tomate",
          "2 EL Öl",
          "Berbere nach Geschmack",
          "500 ml Wasser"
        ],
        "steps": [
          "Fein gehackte Zwiebel und Knoblauch in Öl anschwitzen.",
          "Tomate und Berbere hinzufügen und einkochen.",
          "Wasser hinzufügen und Mehl nach und nach mit dem Schneebesen einrühren.",
          "Unter Rühren köcheln lassen, bis das Mehl vollständig gegart und die Sauce glatt ist."
        ]
      },
      "variants": [
        "Tegabino Shiro ist eine dickere Variante; Bozena Shiro enthält Fleisch."
      ],
      "serving": [
        "Mit Injera servieren."
      ],
      "commonMistakes": [
        "Nicht das gesamte Mehl auf einmal in den Topf geben."
      ]
    }
  },
  "tibs": {
    "en": {
      "overview": "Beef or lamb is fried in small pieces with vegetables and seasoned fat.",
      "history": "Tibs is a well-known Ethiopian meat dish with many methods of preparation.",
      "flavor": "Roasted, juicy and spiced.",
      "technique": "Fry the meat in batches so the pan stays hot.",
      "essentials": [
        "600 g beef",
        "2 onions",
        "2 garlic cloves"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30 min",
        "ingredients": [
          "600 g beef",
          "2 onions",
          "2 garlic cloves",
          "1 green chilli",
          "2 tbsp oil or niter kibbeh",
          "rosemary",
          "salt"
        ],
        "steps": [
          "Cut the meat into evenly sized pieces and dry the surface.",
          "Fry the meat in small batches to the desired safe level of doneness.",
          "Fry onion, garlic, chilli and rosemary.",
          "Return the meat to the pan and season to taste."
        ]
      },
      "variants": [
        "Awaze tibs has a spiced chilli sauce; tibs can also be made with lamb."
      ],
      "serving": [
        "Serve with injera and vegetables."
      ],
      "commonMistakes": [
        "Do not overcrowd the pan."
      ]
    },
    "fr": {
      "overview": "Le bœuf ou l’agneau est sauté en petits morceaux avec des légumes et une matière grasse assaisonnée.",
      "history": "Le tibs est un plat de viande éthiopien bien connu, aux nombreuses méthodes de préparation.",
      "flavor": "Grillé, juteux et épicé.",
      "technique": "Faire revenir la viande par petites quantités pour maintenir la poêle bien chaude.",
      "essentials": [
        "600 g de bœuf",
        "2 oignons",
        "2 gousses d’ail"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30 min",
        "ingredients": [
          "600 g de bœuf",
          "2 oignons",
          "2 gousses d’ail",
          "1 piment vert",
          "2 c. à soupe d’huile ou de niter kibbeh",
          "romarin",
          "sel"
        ],
        "steps": [
          "Couper la viande en morceaux réguliers et sécher leur surface.",
          "Faire revenir la viande par petites quantités jusqu’au degré de cuisson souhaité, dans le respect des règles de sécurité alimentaire.",
          "Faire revenir l’oignon, l’ail, le piment et le romarin.",
          "Remettre la viande dans la poêle et rectifier l’assaisonnement."
        ]
      },
      "variants": [
        "L’awaze tibs comporte une sauce épicée au piment ; le tibs peut aussi se préparer avec de l’agneau."
      ],
      "serving": [
        "Servir avec de l’injera et des légumes."
      ],
      "commonMistakes": [
        "Ne pas surcharger la poêle."
      ]
    },
    "pt": {
      "overview": "Carne de vaca ou borrego é salteada em pedaços pequenos com legumes e gordura temperada.",
      "history": "O tibs é um conhecido prato etíope de carne com muitos métodos de preparação.",
      "flavor": "Tostado, suculento e condimentado.",
      "technique": "Salteie a carne em porções para manter a frigideira bem quente.",
      "essentials": [
        "600 g de carne de vaca",
        "2 cebolas",
        "2 dentes de alho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30 min",
        "ingredients": [
          "600 g de carne de vaca",
          "2 cebolas",
          "2 dentes de alho",
          "1 malagueta verde",
          "2 c. de sopa de óleo ou niter kibbeh",
          "alecrim",
          "sal"
        ],
        "steps": [
          "Corte a carne em pedaços uniformes e seque a superfície.",
          "Salteie a carne em pequenas porções até ao ponto desejado, garantindo uma cozedura segura.",
          "Salteie cebola, alho, malagueta e alecrim.",
          "Volte a colocar a carne na frigideira e tempere a gosto."
        ]
      },
      "variants": [
        "O awaze tibs tem um molho de malagueta condimentado; o tibs também pode ser feito com borrego."
      ],
      "serving": [
        "Sirva com injera e legumes."
      ],
      "commonMistakes": [
        "Não encha demasiado a frigideira."
      ]
    },
    "es": {
      "overview": "La carne de vacuno o cordero se saltea en trozos pequeños con verduras y grasa condimentada.",
      "history": "El tibs es un conocido plato etíope de carne con muchas formas de preparación.",
      "flavor": "Tostado, jugoso y especiado.",
      "technique": "Saltea la carne en tandas para que la sartén se mantenga bien caliente.",
      "essentials": [
        "600 g de carne de vacuno",
        "2 cebollas",
        "2 dientes de ajo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30 min",
        "ingredients": [
          "600 g de carne de vacuno",
          "2 cebollas",
          "2 dientes de ajo",
          "1 chile verde",
          "2 cucharadas de aceite o niter kibbeh",
          "romero",
          "sal"
        ],
        "steps": [
          "Corta la carne en trozos iguales y seca la superficie.",
          "Saltea la carne en tandas pequeñas hasta el punto deseado que garantice una cocción segura.",
          "Saltea cebolla, ajo, chile y romero.",
          "Devuelve la carne a la sartén y ajusta la sazón."
        ]
      },
      "variants": [
        "El awaze tibs lleva una salsa de chile especiada; el tibs también puede prepararse con cordero."
      ],
      "serving": [
        "Sirve con injera y verduras."
      ],
      "commonMistakes": [
        "No llenes demasiado la sartén."
      ]
    },
    "de": {
      "overview": "Rind- oder Lammfleisch wird in kleinen Stücken mit Gemüse und gewürztem Fett gebraten.",
      "history": "Tibs ist ein bekanntes äthiopisches Fleischgericht mit vielen Zubereitungsweisen.",
      "flavor": "Röstig, saftig und würzig.",
      "technique": "Fleisch portionsweise braten, damit die Pfanne heiß bleibt.",
      "essentials": [
        "600 g Rindfleisch",
        "2 Zwiebeln",
        "2 Knoblauchzehen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30 Min.",
        "ingredients": [
          "600 g Rindfleisch",
          "2 Zwiebeln",
          "2 Knoblauchzehen",
          "1 grüne Chilischote",
          "2 EL Öl oder Niter Kibbeh",
          "Rosmarin",
          "Salz"
        ],
        "steps": [
          "Fleisch in gleich große Stücke schneiden und die Oberfläche trocknen.",
          "Fleisch portionsweise bis zum gewünschten sicheren Gargrad braten.",
          "Zwiebeln, Knoblauch, Chili und Rosmarin anbraten.",
          "Fleisch zurück in die Pfanne geben und abschmecken."
        ]
      },
      "variants": [
        "Awaze Tibs hat eine würzige Chilisauce; Tibs kann auch aus Lammfleisch zubereitet werden."
      ],
      "serving": [
        "Mit Injera und Gemüse servieren."
      ],
      "commonMistakes": [
        "Pfanne nicht überfüllen."
      ]
    }
  },
  "kitfo": {
    "en": {
      "overview": "Traditional kitfo may be served raw or lightly cooked; the home recipe uses thoroughly cooked meat.",
      "history": "Kitfo is particularly associated with the food culture of the Gurage people in Ethiopia.",
      "flavor": "Rich, buttery and hot.",
      "technique": "Use fresh minced meat and cook to at least 71 °C throughout.",
      "essentials": [
        "500 g minced beef",
        "3 tbsp niter kibbeh or butter",
        "mitmita to taste"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 20 min",
        "ingredients": [
          "500 g minced beef",
          "3 tbsp niter kibbeh or butter",
          "mitmita to taste",
          "salt"
        ],
        "steps": [
          "Melt the butter gently.",
          "Add mitmita and minced meat.",
          "Fry while stirring until the meat is cooked through.",
          "Season to taste and serve hot."
        ]
      },
      "variants": [
        "Leb leb is a lightly cooked variant. Raw and undercooked minced meat can pose a risk of illness."
      ],
      "serving": [
        "Serve with injera, ayib and leafy green vegetables."
      ],
      "commonMistakes": [
        "Do not assume that spices or hot butter make raw minced meat safe."
      ]
    },
    "fr": {
      "overview": "Le kitfo traditionnel peut être servi cru ou légèrement cuit ; la recette maison utilise de la viande cuite à cœur.",
      "history": "Le kitfo est particulièrement associé à la culture culinaire du peuple gurage en Éthiopie.",
      "flavor": "Généreux, beurré et piquant.",
      "technique": "Utiliser de la viande hachée fraîche et cuire à au moins 71 °C dans toute la masse.",
      "essentials": [
        "500 g de bœuf haché",
        "3 c. à soupe de niter kibbeh ou de beurre",
        "mitmita selon le goût"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 20 min",
        "ingredients": [
          "500 g de bœuf haché",
          "3 c. à soupe de niter kibbeh ou de beurre",
          "mitmita selon le goût",
          "sel"
        ],
        "steps": [
          "Faire fondre doucement le beurre.",
          "Ajouter le mitmita et la viande hachée.",
          "Faire revenir en remuant jusqu’à cuisson complète de la viande.",
          "Rectifier l’assaisonnement et servir chaud."
        ]
      },
      "variants": [
        "Le leb leb est une variante légèrement cuite. La viande hachée crue ou insuffisamment cuite peut entraîner un risque de maladie."
      ],
      "serving": [
        "Servir avec de l’injera, de l’ayib et des légumes verts à feuilles."
      ],
      "commonMistakes": [
        "Ne pas supposer que les épices ou le beurre chaud rendent la viande hachée crue sûre."
      ]
    },
    "pt": {
      "overview": "O kitfo tradicional pode ser servido cru ou ligeiramente cozinhado; a receita caseira usa carne bem cozinhada.",
      "history": "O kitfo está especialmente associado à cultura gastronómica do povo gurage na Etiópia.",
      "flavor": "Encorpado, amanteigado e picante.",
      "technique": "Use carne picada fresca e cozinhe até atingir pelo menos 71 °C em toda a massa.",
      "essentials": [
        "500 g de carne de vaca picada",
        "3 c. de sopa de niter kibbeh ou manteiga",
        "mitmita a gosto"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 20 min",
        "ingredients": [
          "500 g de carne de vaca picada",
          "3 c. de sopa de niter kibbeh ou manteiga",
          "mitmita a gosto",
          "sal"
        ],
        "steps": [
          "Derreta suavemente a manteiga.",
          "Junte mitmita e carne picada.",
          "Salteie, mexendo, até a carne estar bem cozinhada.",
          "Tempere a gosto e sirva quente."
        ]
      },
      "variants": [
        "Leb leb é uma variante ligeiramente cozinhada. A carne picada crua ou mal cozinhada pode causar doença."
      ],
      "serving": [
        "Sirva com injera, ayib e legumes de folha verde."
      ],
      "commonMistakes": [
        "Não suponha que as especiarias ou a manteiga quente tornam segura a carne picada crua."
      ]
    },
    "es": {
      "overview": "El kitfo tradicional puede servirse crudo o ligeramente cocinado; la receta casera utiliza carne bien hecha.",
      "history": "El kitfo se asocia especialmente con la cultura culinaria del pueblo gurage en Etiopía.",
      "flavor": "Intenso, mantecoso y picante.",
      "technique": "Usa carne picada fresca y cocina hasta alcanzar al menos 71 °C en toda la mezcla.",
      "essentials": [
        "500 g de carne de vacuno picada",
        "3 cucharadas de niter kibbeh o mantequilla",
        "mitmita al gusto"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 20 min",
        "ingredients": [
          "500 g de carne de vacuno picada",
          "3 cucharadas de niter kibbeh o mantequilla",
          "mitmita al gusto",
          "sal"
        ],
        "steps": [
          "Derrite suavemente la mantequilla.",
          "Añade mitmita y carne picada.",
          "Saltea removiendo hasta que la carne esté bien hecha.",
          "Ajusta la sazón y sirve caliente."
        ]
      },
      "variants": [
        "Leb leb es una variante ligeramente cocinada. La carne picada cruda o poco hecha puede provocar enfermedades."
      ],
      "serving": [
        "Sirve con injera, ayib y verduras de hoja verde."
      ],
      "commonMistakes": [
        "No supongas que las especias o la mantequilla caliente hacen segura la carne picada cruda."
      ]
    },
    "de": {
      "overview": "Traditionelles Kitfo kann roh oder leicht gegart serviert werden; das Hausrezept verwendet vollständig durchgegartes Fleisch.",
      "history": "Kitfo ist besonders mit der Esskultur der Gurage in Äthiopien verbunden.",
      "flavor": "Kräftig, butterbetont und scharf.",
      "technique": "Frisches Hackfleisch verwenden und überall auf mindestens 71 °C erhitzen.",
      "essentials": [
        "500 g Rinderhackfleisch",
        "3 EL Niter Kibbeh oder Butter",
        "Mitmita nach Geschmack"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 20 Min.",
        "ingredients": [
          "500 g Rinderhackfleisch",
          "3 EL Niter Kibbeh oder Butter",
          "Mitmita nach Geschmack",
          "Salz"
        ],
        "steps": [
          "Butter sanft schmelzen.",
          "Mitmita und Hackfleisch hinzufügen.",
          "Unter Rühren vollständig durchbraten.",
          "Abschmecken und heiß servieren."
        ]
      },
      "variants": [
        "Leb Leb ist eine leicht gegarte Variante. Rohes oder unzureichend gegartes Hackfleisch kann ein Erkrankungsrisiko darstellen."
      ],
      "serving": [
        "Mit Injera, Ayib und grünem Blattgemüse servieren."
      ],
      "commonMistakes": [
        "Nicht davon ausgehen, dass Gewürze oder heiße Butter rohes Hackfleisch sicher machen."
      ]
    }
  },
  "zigni": {
    "en": {
      "overview": "Meat is simmered for a long time in a thick, aromatic red sauce.",
      "history": "Zigni is a well-known Eritrean stew often served with injera.",
      "flavor": "Deep, hot and rich.",
      "technique": "Reduce the onions before adding meat and liquid.",
      "essentials": [
        "700 g stewing beef",
        "3 onions",
        "3 garlic cloves"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 2 hours",
        "ingredients": [
          "700 g stewing beef",
          "3 onions",
          "3 garlic cloves",
          "2 tbsp berbere, or to taste",
          "400 g tomatoes",
          "300 ml water",
          "3 tbsp oil"
        ],
        "steps": [
          "Finely chop the onions and let them soften in oil.",
          "Add garlic, berbere and tomatoes and reduce.",
          "Add meat and water and simmer covered until the meat is tender.",
          "Reduce the sauce as needed and season with salt."
        ]
      },
      "variants": [
        "Versions with other kinds of meat exist."
      ],
      "serving": [
        "Serve with injera."
      ],
      "commonMistakes": [
        "Avoid burning the spices before adding the liquid."
      ]
    },
    "fr": {
      "overview": "La viande mijote longuement dans une sauce rouge épaisse et aromatique.",
      "history": "Le zigni est un ragoût érythréen bien connu, souvent servi avec de l’injera.",
      "flavor": "Profond, piquant et généreux.",
      "technique": "Faire réduire les oignons avant d’ajouter la viande et le liquide.",
      "essentials": [
        "700 g de bœuf à mijoter",
        "3 oignons",
        "3 gousses d’ail"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 2 heures",
        "ingredients": [
          "700 g de bœuf à mijoter",
          "3 oignons",
          "3 gousses d’ail",
          "2 c. à soupe de berbere, ou selon le goût",
          "400 g de tomates",
          "300 ml d’eau",
          "3 c. à soupe d’huile"
        ],
        "steps": [
          "Hacher finement les oignons et les laisser s’attendrir dans l’huile.",
          "Ajouter l’ail, le berbere et les tomates et faire réduire.",
          "Ajouter la viande et l’eau et laisser mijoter à couvert jusqu’à tendreté de la viande.",
          "Faire réduire la sauce si nécessaire et saler selon le goût."
        ]
      },
      "variants": [
        "Il existe des variantes avec d’autres viandes."
      ],
      "serving": [
        "Servir avec de l’injera."
      ],
      "commonMistakes": [
        "Éviter de brûler les épices avant d’ajouter le liquide."
      ]
    },
    "pt": {
      "overview": "A carne cozinha lentamente num molho vermelho espesso e aromático.",
      "history": "O zigni é um conhecido guisado eritreu, frequentemente servido com injera.",
      "flavor": "Intenso, picante e encorpado.",
      "technique": "Deixe as cebolas reduzir antes de juntar a carne e o líquido.",
      "essentials": [
        "700 g de carne de vaca para estufar",
        "3 cebolas",
        "3 dentes de alho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 2 horas",
        "ingredients": [
          "700 g de carne de vaca para estufar",
          "3 cebolas",
          "3 dentes de alho",
          "2 c. de sopa de berbere, ou a gosto",
          "400 g de tomate",
          "300 ml de água",
          "3 c. de sopa de óleo"
        ],
        "steps": [
          "Pique finamente as cebolas e deixe-as amolecer em óleo.",
          "Junte alho, berbere e tomate e deixe reduzir.",
          "Junte carne e água e deixe cozinhar em lume brando com tampa até a carne ficar tenra.",
          "Reduza o molho se necessário e tempere com sal."
        ]
      },
      "variants": [
        "Existem variantes com outros tipos de carne."
      ],
      "serving": [
        "Sirva com injera."
      ],
      "commonMistakes": [
        "Evite queimar as especiarias antes de juntar o líquido."
      ]
    },
    "es": {
      "overview": "La carne se cuece durante mucho tiempo a fuego lento en una salsa roja espesa y aromática.",
      "history": "El zigni es un conocido guiso eritreo que suele servirse con injera.",
      "flavor": "Intenso, picante y con cuerpo.",
      "technique": "Reduce la cebolla antes de añadir la carne y el líquido.",
      "essentials": [
        "700 g de carne de vacuno para guisar",
        "3 cebollas",
        "3 dientes de ajo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 2 horas",
        "ingredients": [
          "700 g de carne de vacuno para guisar",
          "3 cebollas",
          "3 dientes de ajo",
          "2 cucharadas de berbere, o al gusto",
          "400 g de tomates",
          "300 ml de agua",
          "3 cucharadas de aceite"
        ],
        "steps": [
          "Pica finamente la cebolla y deja que se ablande en aceite.",
          "Añade ajo, berbere y tomate y deja reducir.",
          "Añade carne y agua y cuece a fuego lento con tapa hasta que la carne esté tierna.",
          "Reduce la salsa si es necesario y ajusta la sal."
        ]
      },
      "variants": [
        "Existen variantes con otros tipos de carne."
      ],
      "serving": [
        "Sirve con injera."
      ],
      "commonMistakes": [
        "Evita quemar las especias antes de añadir el líquido."
      ]
    },
    "de": {
      "overview": "Fleisch wird lange in einer dicken, aromatischen roten Sauce geschmort.",
      "history": "Zigni ist ein bekanntes eritreisches Schmorgericht, das oft mit Injera serviert wird.",
      "flavor": "Tiefgründig, scharf und kräftig.",
      "technique": "Zwiebeln einkochen lassen, bevor Fleisch und Flüssigkeit hinzukommen.",
      "essentials": [
        "700 g Rindfleisch zum Schmoren",
        "3 Zwiebeln",
        "3 Knoblauchzehen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 2 Stunden",
        "ingredients": [
          "700 g Rindfleisch zum Schmoren",
          "3 Zwiebeln",
          "3 Knoblauchzehen",
          "2 EL Berbere oder nach Geschmack",
          "400 g Tomaten",
          "300 ml Wasser",
          "3 EL Öl"
        ],
        "steps": [
          "Zwiebeln fein hacken und in Öl weich dünsten.",
          "Knoblauch, Berbere und Tomaten hinzufügen und einkochen.",
          "Fleisch und Wasser hinzufügen und zugedeckt schmoren, bis das Fleisch weich ist.",
          "Sauce bei Bedarf einkochen und mit Salz abschmecken."
        ]
      },
      "variants": [
        "Es gibt Varianten mit anderen Fleischsorten."
      ],
      "serving": [
        "Mit Injera servieren."
      ],
      "commonMistakes": [
        "Gewürze vor Zugabe der Flüssigkeit nicht anbrennen lassen."
      ]
    }
  },
  "tajine": {
    "en": {
      "overview": "Meat or vegetables are simmered with spices under a lid. This version uses chicken, olives and preserved lemon.",
      "history": "Tajine is central to Moroccan food traditions, with many local variants.",
      "flavor": "Aromatic, salty-tangy and rich.",
      "technique": "Use a pot with a tight-fitting lid and simmer the ingredients gently.",
      "essentials": [
        "800 g chicken thighs",
        "2 onions",
        "3 garlic cloves"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 75 min",
        "ingredients": [
          "800 g chicken thighs",
          "2 onions",
          "3 garlic cloves",
          "1 tsp ginger",
          "1 tsp turmeric",
          "100 g olives",
          "½ preserved lemon",
          "200 ml water",
          "olive oil"
        ],
        "steps": [
          "Fry the onions and garlic in oil.",
          "Add spices, chicken and water.",
          "Simmer covered until the chicken is cooked through and tender.",
          "Add olives and preserved lemon towards the end."
        ]
      },
      "variants": [
        "Lamb with prunes and vegetable tajine are other variants."
      ],
      "serving": [
        "Serve with bread."
      ],
      "commonMistakes": [
        "Avoid vigorous boiling and unnecessarily large amounts of liquid."
      ]
    },
    "fr": {
      "overview": "La viande ou les légumes mijotent à couvert avec des épices. Cette version utilise du poulet, des olives et du citron confit au sel.",
      "history": "Le tajine occupe une place centrale dans les traditions culinaires marocaines, avec de nombreuses variantes locales.",
      "flavor": "Aromatique, salé-acidulé et généreux.",
      "technique": "Utiliser une cocotte avec un couvercle bien ajusté et laisser mijoter doucement les ingrédients.",
      "essentials": [
        "800 g de cuisses de poulet",
        "2 oignons",
        "3 gousses d’ail"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 75 min",
        "ingredients": [
          "800 g de cuisses de poulet",
          "2 oignons",
          "3 gousses d’ail",
          "1 c. à café de gingembre",
          "1 c. à café de curcuma",
          "100 g d’olives",
          "½ citron confit au sel",
          "200 ml d’eau",
          "huile d’olive"
        ],
        "steps": [
          "Faire revenir les oignons et l’ail dans l’huile.",
          "Ajouter les épices, le poulet et l’eau.",
          "Laisser mijoter à couvert jusqu’à ce que le poulet soit cuit à cœur et tendre.",
          "Ajouter les olives et le citron confit en fin de cuisson."
        ]
      },
      "variants": [
        "L’agneau aux pruneaux et le tajine de légumes sont d’autres variantes."
      ],
      "serving": [
        "Servir avec du pain."
      ],
      "commonMistakes": [
        "Éviter une forte ébullition et un excès de liquide."
      ]
    },
    "pt": {
      "overview": "Carne ou legumes são cozinhados em lume brando com especiarias e tampa. Esta versão usa frango, azeitonas e limão em conserva de sal.",
      "history": "O tajine é central nas tradições gastronómicas marroquinas, com muitas variantes locais.",
      "flavor": "Aromático, salgado-ácido e encorpado.",
      "technique": "Use um tacho com tampa bem ajustada e deixe os ingredientes cozinhar em lume brando.",
      "essentials": [
        "800 g de coxas de frango",
        "2 cebolas",
        "3 dentes de alho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 75 min",
        "ingredients": [
          "800 g de coxas de frango",
          "2 cebolas",
          "3 dentes de alho",
          "1 c. de chá de gengibre",
          "1 c. de chá de curcuma",
          "100 g de azeitonas",
          "½ limão em conserva de sal",
          "200 ml de água",
          "azeite"
        ],
        "steps": [
          "Salteie as cebolas e o alho em azeite.",
          "Junte especiarias, frango e água.",
          "Deixe cozinhar em lume brando com tampa até o frango estar bem cozinhado e tenro.",
          "Junte as azeitonas e o limão em conserva perto do fim."
        ]
      },
      "variants": [
        "Borrego com ameixas secas e tajine de legumes são outras variantes."
      ],
      "serving": [
        "Sirva com pão."
      ],
      "commonMistakes": [
        "Evite fervura intensa e excesso desnecessário de líquido."
      ]
    },
    "es": {
      "overview": "La carne o las verduras se cuecen a fuego lento con especias y tapa. Esta versión utiliza pollo, aceitunas y limón en conserva de sal.",
      "history": "El tajín ocupa un lugar central en las tradiciones culinarias marroquíes, con numerosas variantes locales.",
      "flavor": "Aromático, salado-ácido y con cuerpo.",
      "technique": "Usa una olla con tapa bien ajustada y cuece suavemente los ingredientes.",
      "essentials": [
        "800 g de muslos de pollo",
        "2 cebollas",
        "3 dientes de ajo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 75 min",
        "ingredients": [
          "800 g de muslos de pollo",
          "2 cebollas",
          "3 dientes de ajo",
          "1 cucharadita de jengibre",
          "1 cucharadita de cúrcuma",
          "100 g de aceitunas",
          "½ limón en conserva de sal",
          "200 ml de agua",
          "aceite de oliva"
        ],
        "steps": [
          "Sofríe la cebolla y el ajo en aceite.",
          "Añade especias, pollo y agua.",
          "Cuece a fuego lento con tapa hasta que el pollo esté hecho por dentro y tierno.",
          "Añade las aceitunas y el limón en conserva hacia el final."
        ]
      },
      "variants": [
        "El cordero con ciruelas pasas y el tajín de verduras son otras variantes."
      ],
      "serving": [
        "Sirve con pan."
      ],
      "commonMistakes": [
        "Evita la ebullición fuerte y el exceso innecesario de líquido."
      ]
    },
    "de": {
      "overview": "Fleisch oder Gemüse werden mit Gewürzen zugedeckt geschmort. Diese Variante verwendet Hähnchen, Oliven und Salzzitrone.",
      "history": "Tajine ist eine zentrale marokkanische Esstradition mit vielen lokalen Varianten.",
      "flavor": "Aromatisch, salzig-säuerlich und kräftig.",
      "technique": "Einen Topf mit dicht schließendem Deckel verwenden und die Zutaten sanft schmoren.",
      "essentials": [
        "800 g Hähnchenschenkel",
        "2 Zwiebeln",
        "3 Knoblauchzehen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 75 Min.",
        "ingredients": [
          "800 g Hähnchenschenkel",
          "2 Zwiebeln",
          "3 Knoblauchzehen",
          "1 TL Ingwer",
          "1 TL Kurkuma",
          "100 g Oliven",
          "½ Salzzitrone",
          "200 ml Wasser",
          "Olivenöl"
        ],
        "steps": [
          "Zwiebeln und Knoblauch in Öl anschwitzen.",
          "Gewürze, Hähnchen und Wasser hinzufügen.",
          "Zugedeckt schmoren, bis das Hähnchen durchgegart und zart ist.",
          "Oliven und Salzzitrone gegen Ende hinzufügen."
        ]
      },
      "variants": [
        "Lamm mit Trockenpflaumen und Gemüsetajine sind weitere Varianten."
      ],
      "serving": [
        "Mit Brot servieren."
      ],
      "commonMistakes": [
        "Starkes Kochen und unnötig viel Flüssigkeit vermeiden."
      ]
    }
  },
  "couscous": {
    "en": {
      "overview": "Traditionally the grains are steamed over a pot; instant couscous can be soaked in hot liquid.",
      "history": "Knowledge and practices associated with couscous were inscribed on UNESCO’s intangible cultural heritage list in 2020 following a joint nomination by Algeria, Mauritania, Morocco and Tunisia.",
      "flavor": "Light grains with rich broth and mildly spiced vegetables.",
      "technique": "Gently separate the grains with a fork and adjust the liquid to the product.",
      "essentials": [
        "300 g instant couscous",
        "2 carrots",
        "1 courgette"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "300 g instant couscous",
          "2 carrots",
          "1 courgette",
          "1 onion",
          "400 g cooked chickpeas",
          "400 g tomatoes",
          "500 ml vegetable stock",
          "cumin",
          "olive oil"
        ],
        "steps": [
          "Fry onion and spices in oil.",
          "Add tomatoes, stock and carrots and simmer.",
          "Add courgette and chickpeas and cook until tender.",
          "Prepare couscous separately according to the packet instructions and serve with vegetables and broth."
        ]
      },
      "variants": [
        "Versions with lamb, chicken or fish exist; couscous with seven vegetables is well known in Morocco."
      ],
      "serving": [
        "Serve the grains on a platter with the vegetables on top."
      ],
      "commonMistakes": [
        "Do not use too much liquid for instant couscous."
      ]
    },
    "fr": {
      "overview": "Traditionnellement, les grains sont cuits à la vapeur au-dessus d’une marmite ; le couscous précuit peut gonfler dans un liquide chaud.",
      "history": "Les savoirs et pratiques liés au couscous ont été inscrits sur la liste du patrimoine culturel immatériel de l’UNESCO en 2020 à la suite d’une candidature commune de l’Algérie, de la Mauritanie, du Maroc et de la Tunisie.",
      "flavor": "Grains légers, bouillon généreux et légumes légèrement épicés.",
      "technique": "Égrener délicatement à la fourchette et adapter la quantité de liquide au produit.",
      "essentials": [
        "300 g de couscous précuit",
        "2 carottes",
        "1 courgette"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "300 g de couscous précuit",
          "2 carottes",
          "1 courgette",
          "1 oignon",
          "400 g de pois chiches cuits",
          "400 g de tomates",
          "500 ml de bouillon de légumes",
          "cumin",
          "huile d’olive"
        ],
        "steps": [
          "Faire revenir l’oignon et les épices dans l’huile.",
          "Ajouter les tomates, le bouillon et les carottes et laisser mijoter.",
          "Ajouter la courgette et les pois chiches et cuire jusqu’à tendreté.",
          "Préparer le couscous séparément selon les instructions du paquet et servir avec les légumes et le bouillon."
        ]
      },
      "variants": [
        "Il existe des variantes à l’agneau, au poulet ou au poisson ; le couscous aux sept légumes est bien connu au Maroc."
      ],
      "serving": [
        "Servir les grains sur un plat, avec les légumes par-dessus."
      ],
      "commonMistakes": [
        "Ne pas utiliser trop de liquide pour le couscous précuit."
      ]
    },
    "pt": {
      "overview": "Tradicionalmente, os grãos são cozidos a vapor sobre um tacho; o cuscuz instantâneo pode hidratar em líquido quente.",
      "history": "Os saberes e práticas associados ao cuscuz foram inscritos na lista do património cultural imaterial da UNESCO em 2020 após uma candidatura conjunta da Argélia, Mauritânia, Marrocos e Tunísia.",
      "flavor": "Grãos leves com caldo encorpado e legumes suavemente condimentados.",
      "technique": "Separe cuidadosamente os grãos com um garfo e ajuste o líquido ao produto.",
      "essentials": [
        "300 g de cuscuz instantâneo",
        "2 cenouras",
        "1 curgete"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "300 g de cuscuz instantâneo",
          "2 cenouras",
          "1 curgete",
          "1 cebola",
          "400 g de grão-de-bico cozido",
          "400 g de tomate",
          "500 ml de caldo de legumes",
          "cominhos",
          "azeite"
        ],
        "steps": [
          "Salteie a cebola e as especiarias em azeite.",
          "Junte tomate, caldo e cenoura e deixe cozinhar em lume brando.",
          "Junte curgete e grão-de-bico e cozinhe até ficarem tenros.",
          "Prepare o cuscuz separadamente de acordo com as instruções da embalagem e sirva com legumes e caldo."
        ]
      },
      "variants": [
        "Existem variantes com borrego, frango ou peixe; em Marrocos é conhecido o cuscuz de sete legumes."
      ],
      "serving": [
        "Sirva os grãos numa travessa com os legumes por cima."
      ],
      "commonMistakes": [
        "Não use demasiado líquido no cuscuz instantâneo."
      ]
    },
    "es": {
      "overview": "Tradicionalmente, los granos se cuecen al vapor sobre una olla; el cuscús instantáneo puede hidratarse en líquido caliente.",
      "history": "Los conocimientos y prácticas relacionados con el cuscús se inscribieron en la lista del patrimonio cultural inmaterial de la UNESCO en 2020 tras una candidatura conjunta de Argelia, Mauritania, Marruecos y Túnez.",
      "flavor": "Granos ligeros con caldo sabroso y verduras suavemente especiadas.",
      "technique": "Separa suavemente los granos con un tenedor y ajusta el líquido al producto.",
      "essentials": [
        "300 g de cuscús instantáneo",
        "2 zanahorias",
        "1 calabacín"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "300 g de cuscús instantáneo",
          "2 zanahorias",
          "1 calabacín",
          "1 cebolla",
          "400 g de garbanzos cocidos",
          "400 g de tomates",
          "500 ml de caldo de verduras",
          "comino",
          "aceite de oliva"
        ],
        "steps": [
          "Sofríe la cebolla y las especias en aceite.",
          "Añade tomate, caldo y zanahoria y cuece a fuego lento.",
          "Añade calabacín y garbanzos y cuece hasta que estén tiernos.",
          "Prepara el cuscús por separado según las instrucciones del envase y sirve con verduras y caldo."
        ]
      },
      "variants": [
        "Existen variantes con cordero, pollo o pescado; en Marruecos es conocido el cuscús de siete verduras."
      ],
      "serving": [
        "Sirve los granos en una fuente con las verduras encima."
      ],
      "commonMistakes": [
        "No uses demasiado líquido para el cuscús instantáneo."
      ]
    },
    "de": {
      "overview": "Traditionell werden die Körner über einem Topf gedämpft; Instant-Couscous kann in heißer Flüssigkeit quellen.",
      "history": "Wissen und Praktiken rund um Couscous wurden 2020 nach einer gemeinsamen Nominierung durch Algerien, Mauretanien, Marokko und Tunesien in die UNESCO-Liste des immateriellen Kulturerbes aufgenommen.",
      "flavor": "Lockere Körner mit kräftiger Brühe und mild gewürztem Gemüse.",
      "technique": "Körner vorsichtig mit einer Gabel auflockern und Flüssigkeitsmenge an das Produkt anpassen.",
      "essentials": [
        "300 g Instant-Couscous",
        "2 Karotten",
        "1 Zucchini"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "300 g Instant-Couscous",
          "2 Karotten",
          "1 Zucchini",
          "1 Zwiebel",
          "400 g gekochte Kichererbsen",
          "400 g Tomaten",
          "500 ml Gemüsebrühe",
          "Kreuzkümmel",
          "Olivenöl"
        ],
        "steps": [
          "Zwiebel und Gewürze in Öl anschwitzen.",
          "Tomaten, Brühe und Karotten hinzufügen und köcheln lassen.",
          "Zucchini und Kichererbsen hinzufügen und weich garen.",
          "Couscous separat nach Packungsanleitung zubereiten und mit Gemüse und Brühe servieren."
        ]
      },
      "variants": [
        "Es gibt Varianten mit Lamm, Hähnchen oder Fisch; in Marokko ist Couscous mit sieben Gemüsesorten bekannt."
      ],
      "serving": [
        "Körner auf einer Platte anrichten und Gemüse daraufgeben."
      ],
      "commonMistakes": [
        "Für Instant-Couscous nicht zu viel Flüssigkeit verwenden."
      ]
    }
  },
  "harira": {
    "en": {
      "overview": "Legumes are cooked in an aromatic tomato broth, often thickened with flour.",
      "history": "Harira is particularly well known as a soup for breaking the daily fast during Ramadan, but is also eaten throughout the year.",
      "flavor": "Rich, tangy and herbal.",
      "technique": "Let the lentils become tender before adding any flour thickener.",
      "essentials": [
        "400 g tomatoes",
        "150 g dried lentils",
        "400 g cooked chickpeas"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 60 min",
        "ingredients": [
          "400 g tomatoes",
          "150 g dried lentils",
          "400 g cooked chickpeas",
          "1 onion",
          "2 celery stalks",
          "1.2 l stock",
          "ginger",
          "coriander",
          "parsley",
          "2 tbsp flour"
        ],
        "steps": [
          "Fry chopped onion, celery and ginger.",
          "Add tomatoes, stock and lentils and cook until the lentils are tender.",
          "Add chickpeas and chopped herbs.",
          "Whisk flour into cold water, add gradually and let the soup simmer."
        ]
      },
      "variants": [
        "Some versions contain meat, rice or vermicelli."
      ],
      "serving": [
        "Serve with lemon and bread, preferably with dates on the side."
      ],
      "commonMistakes": [
        "Do not add dry flour directly to hot soup to thicken it."
      ]
    },
    "fr": {
      "overview": "Les légumineuses cuisent dans un bouillon de tomates aromatique, souvent lié à la farine.",
      "history": "La harira est surtout connue comme soupe de rupture du jeûne pendant le ramadan, mais elle se consomme aussi le reste de l’année.",
      "flavor": "Généreuse, acidulée et herbacée.",
      "technique": "Laisser les lentilles s’attendrir avant d’ajouter éventuellement la liaison à la farine.",
      "essentials": [
        "400 g de tomates",
        "150 g de lentilles sèches",
        "400 g de pois chiches cuits"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 60 min",
        "ingredients": [
          "400 g de tomates",
          "150 g de lentilles sèches",
          "400 g de pois chiches cuits",
          "1 oignon",
          "2 branches de céleri",
          "1,2 l de bouillon",
          "gingembre",
          "coriandre",
          "persil",
          "2 c. à soupe de farine"
        ],
        "steps": [
          "Faire revenir l’oignon haché, le céleri et le gingembre.",
          "Ajouter les tomates, le bouillon et les lentilles et cuire jusqu’à ce que les lentilles soient tendres.",
          "Ajouter les pois chiches et les herbes hachées.",
          "Délayer la farine au fouet dans de l’eau froide, incorporer progressivement et laisser mijoter la soupe."
        ]
      },
      "variants": [
        "Certaines variantes contiennent de la viande, du riz ou des vermicelles."
      ],
      "serving": [
        "Servir avec du citron et du pain, de préférence avec des dattes à part."
      ],
      "commonMistakes": [
        "Ne pas verser de farine sèche directement dans la soupe chaude pour la lier."
      ]
    },
    "pt": {
      "overview": "As leguminosas são cozidas num caldo aromático de tomate, frequentemente engrossado com farinha.",
      "history": "A harira é especialmente conhecida como sopa para quebrar o jejum diário durante o Ramadão, mas também é consumida ao longo do ano.",
      "flavor": "Encorpada, ácida e com notas de ervas.",
      "technique": "Deixe as lentilhas ficar tenras antes de juntar uma eventual mistura de farinha para engrossar.",
      "essentials": [
        "400 g de tomate",
        "150 g de lentilhas secas",
        "400 g de grão-de-bico cozido"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 60 min",
        "ingredients": [
          "400 g de tomate",
          "150 g de lentilhas secas",
          "400 g de grão-de-bico cozido",
          "1 cebola",
          "2 talos de aipo",
          "1,2 l de caldo",
          "gengibre",
          "coentros",
          "salsa",
          "2 c. de sopa de farinha"
        ],
        "steps": [
          "Salteie a cebola picada, o aipo e o gengibre.",
          "Junte tomate, caldo e lentilhas e cozinhe até as lentilhas ficarem tenras.",
          "Junte o grão-de-bico e as ervas picadas.",
          "Dissolva a farinha em água fria, batendo, junte gradualmente e deixe a sopa cozinhar em lume brando."
        ]
      },
      "variants": [
        "Algumas variantes contêm carne, arroz ou aletria."
      ],
      "serving": [
        "Sirva com limão e pão, de preferência com tâmaras à parte."
      ],
      "commonMistakes": [
        "Não junte farinha seca diretamente à sopa quente para a engrossar."
      ]
    },
    "es": {
      "overview": "Las legumbres se cuecen en un caldo aromático de tomate, a menudo espesado con harina.",
      "history": "La harira es especialmente conocida como sopa para romper el ayuno diario durante el Ramadán, aunque también se consume el resto del año.",
      "flavor": "Con cuerpo, ácida y con notas de hierbas.",
      "technique": "Deja que las lentejas estén tiernas antes de añadir, si se utiliza, la mezcla de harina para espesar.",
      "essentials": [
        "400 g de tomates",
        "150 g de lentejas secas",
        "400 g de garbanzos cocidos"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 60 min",
        "ingredients": [
          "400 g de tomates",
          "150 g de lentejas secas",
          "400 g de garbanzos cocidos",
          "1 cebolla",
          "2 tallos de apio",
          "1,2 l de caldo",
          "jengibre",
          "cilantro",
          "perejil",
          "2 cucharadas de harina"
        ],
        "steps": [
          "Sofríe la cebolla picada, el apio y el jengibre.",
          "Añade tomate, caldo y lentejas y cuece hasta que las lentejas estén tiernas.",
          "Añade los garbanzos y las hierbas picadas.",
          "Disuelve la harina en agua fría con unas varillas, incorpora poco a poco y deja que la sopa cueza a fuego lento."
        ]
      },
      "variants": [
        "Algunas variantes contienen carne, arroz o fideos finos."
      ],
      "serving": [
        "Sirve con limón y pan, preferiblemente con dátiles aparte."
      ],
      "commonMistakes": [
        "No añadas harina seca directamente a la sopa caliente para espesarla."
      ]
    },
    "de": {
      "overview": "Hülsenfrüchte werden in einer aromatischen Tomatenbrühe gekocht, die oft mit Mehl gebunden wird.",
      "history": "Harira ist besonders als Suppe zum Fastenbrechen im Ramadan bekannt, wird aber auch das übrige Jahr gegessen.",
      "flavor": "Kräftig, säuerlich und kräuterbetont.",
      "technique": "Linsen weich garen, bevor gegebenenfalls die Mehlbindung hinzukommt.",
      "essentials": [
        "400 g Tomaten",
        "150 g getrocknete Linsen",
        "400 g gekochte Kichererbsen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 60 Min.",
        "ingredients": [
          "400 g Tomaten",
          "150 g getrocknete Linsen",
          "400 g gekochte Kichererbsen",
          "1 Zwiebel",
          "2 Stangen Sellerie",
          "1,2 l Brühe",
          "Ingwer",
          "Koriander",
          "Petersilie",
          "2 EL Mehl"
        ],
        "steps": [
          "Gehackte Zwiebel, Sellerie und Ingwer anschwitzen.",
          "Tomaten, Brühe und Linsen hinzufügen und kochen, bis die Linsen weich sind.",
          "Kichererbsen und gehackte Kräuter hinzufügen.",
          "Mehl in kaltem Wasser glatt rühren, nach und nach hinzufügen und Suppe köcheln lassen."
        ]
      },
      "variants": [
        "Einige Varianten enthalten Fleisch, Reis oder Fadennudeln."
      ],
      "serving": [
        "Mit Zitrone und Brot servieren, gerne mit Datteln als Beilage."
      ],
      "commonMistakes": [
        "Trockenes Mehl zum Binden nicht direkt in die heiße Suppe geben."
      ]
    }
  },
  "pastilla": {
    "en": {
      "overview": "Thin pastry sheets enclose a juicy filling; meat versions often combine savoury and sweet flavours.",
      "history": "Pastilla is known as Moroccan festive food and comes in versions with pigeon, chicken and seafood, among others.",
      "flavor": "Crisp, aromatic and sweet-salty.",
      "technique": "Reduce the filling and cool it before filling the pastry sheets.",
      "essentials": [
        "250 g filo pastry",
        "500 g boneless chicken thigh",
        "2 onions"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 90 min",
        "ingredients": [
          "250 g filo pastry",
          "500 g boneless chicken thigh",
          "2 onions",
          "3 eggs",
          "100 g almonds",
          "cinnamon",
          "ginger",
          "parsley",
          "butter",
          "icing sugar to taste"
        ],
        "steps": [
          "Fry onions and spices, add chicken and a little water and simmer until cooked through.",
          "Shred the meat and reduce the sauce; stir in the eggs until set.",
          "Cool the filling and toast and chop the almonds.",
          "Lay butter-brushed filo sheets in a dish, fill with meat, egg mixture and almonds, and fold closed.",
          "Bake at 190 °C until golden and heated through."
        ]
      },
      "variants": [
        "Seafood pastilla generally has a less sweet filling."
      ],
      "serving": [
        "Serve warm, optionally with a little icing sugar and cinnamon."
      ],
      "commonMistakes": [
        "Do not fill the pastry with a runny, hot sauce."
      ]
    },
    "fr": {
      "overview": "De fines feuilles de pâte entourent une garniture juteuse ; les versions à la viande associent souvent le salé et le sucré.",
      "history": "La pastilla est connue comme plat de fête marocain et se décline notamment au pigeon, au poulet et aux fruits de mer.",
      "flavor": "Croustillante, aromatique et sucrée-salée.",
      "technique": "Faire réduire la garniture et la laisser refroidir avant de garnir les feuilles de pâte.",
      "essentials": [
        "250 g de pâte filo",
        "500 g de hauts de cuisse de poulet désossés",
        "2 oignons"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 90 min",
        "ingredients": [
          "250 g de pâte filo",
          "500 g de hauts de cuisse de poulet désossés",
          "2 oignons",
          "3 œufs",
          "100 g d’amandes",
          "cannelle",
          "gingembre",
          "persil",
          "beurre",
          "sucre glace selon le goût"
        ],
        "steps": [
          "Faire revenir les oignons et les épices, ajouter le poulet et un peu d’eau, puis laisser mijoter jusqu’à cuisson complète.",
          "Effilocher la viande et faire réduire la sauce ; incorporer les œufs en remuant jusqu’à ce qu’ils prennent.",
          "Laisser refroidir la garniture, puis griller et hacher les amandes.",
          "Disposer les feuilles de filo badigeonnées de beurre dans un moule, garnir de viande, de préparation aux œufs et d’amandes, puis refermer.",
          "Cuire au four à 190 °C jusqu’à ce que la pâte soit dorée et l’ensemble bien chaud."
        ]
      },
      "variants": [
        "La pastilla aux fruits de mer a généralement une garniture moins sucrée."
      ],
      "serving": [
        "Servir tiède, éventuellement avec un peu de sucre glace et de cannelle."
      ],
      "commonMistakes": [
        "Ne pas garnir la pâte d’une sauce chaude et liquide."
      ]
    },
    "pt": {
      "overview": "Folhas finas de massa envolvem um recheio suculento; as versões de carne combinam frequentemente sabores salgados e doces.",
      "history": "A pastilla é conhecida como prato festivo marroquino e existe em versões com pombo, frango e marisco, entre outras.",
      "flavor": "Crocante, aromática e doce-salgada.",
      "technique": "Reduza o recheio e deixe-o arrefecer antes de rechear as folhas de massa.",
      "essentials": [
        "250 g de massa filo",
        "500 g de coxa de frango desossada",
        "2 cebolas"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 90 min",
        "ingredients": [
          "250 g de massa filo",
          "500 g de coxa de frango desossada",
          "2 cebolas",
          "3 ovos",
          "100 g de amêndoas",
          "canela",
          "gengibre",
          "salsa",
          "manteiga",
          "açúcar em pó a gosto"
        ],
        "steps": [
          "Salteie as cebolas e as especiarias, junte frango e um pouco de água e cozinhe em lume brando até estar bem cozinhado.",
          "Desfie a carne e reduza o molho; incorpore os ovos, mexendo até solidificarem.",
          "Deixe o recheio arrefecer e toste e pique as amêndoas.",
          "Coloque folhas de filo pinceladas com manteiga numa forma, recheie com carne, mistura de ovos e amêndoas e feche dobrando.",
          "Leve ao forno a 190 °C até dourar e estar bem quente."
        ]
      },
      "variants": [
        "A pastilla de marisco tem geralmente um recheio menos doce."
      ],
      "serving": [
        "Sirva morna, se desejar com um pouco de açúcar em pó e canela."
      ],
      "commonMistakes": [
        "Não recheie a massa com um molho quente e líquido."
      ]
    },
    "es": {
      "overview": "Unas láminas finas de masa envuelven un relleno jugoso; las versiones de carne suelen combinar sabores salados y dulces.",
      "history": "La pastela es conocida como plato festivo marroquí y existen versiones con pichón, pollo y marisco, entre otras.",
      "flavor": "Crujiente, aromática y dulce-salada.",
      "technique": "Reduce el relleno y deja que se enfríe antes de rellenar las láminas de masa.",
      "essentials": [
        "250 g de masa filo",
        "500 g de contramuslo de pollo deshuesado",
        "2 cebollas"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 90 min",
        "ingredients": [
          "250 g de masa filo",
          "500 g de contramuslo de pollo deshuesado",
          "2 cebollas",
          "3 huevos",
          "100 g de almendras",
          "canela",
          "jengibre",
          "perejil",
          "mantequilla",
          "azúcar glas al gusto"
        ],
        "steps": [
          "Sofríe la cebolla y las especias, añade pollo y un poco de agua y cuece a fuego lento hasta que esté hecho por dentro.",
          "Desmenuza la carne y reduce la salsa; incorpora los huevos removiendo hasta que cuajen.",
          "Deja enfriar el relleno y tuesta y pica las almendras.",
          "Coloca hojas de filo pinceladas con mantequilla en un molde, rellena con carne, mezcla de huevo y almendras y cierra doblando.",
          "Hornea a 190 °C hasta que esté dorada y bien caliente."
        ]
      },
      "variants": [
        "La pastela de marisco suele tener un relleno menos dulce."
      ],
      "serving": [
        "Sirve templada, si quieres con un poco de azúcar glas y canela."
      ],
      "commonMistakes": [
        "No rellenes la masa con una salsa caliente y líquida."
      ]
    },
    "de": {
      "overview": "Dünne Teigblätter umschließen eine saftige Füllung; Fleischvarianten verbinden häufig salzige und süße Aromen.",
      "history": "Pastilla ist als marokkanisches Festessen bekannt und wird unter anderem mit Taube, Hähnchen oder Meeresfrüchten zubereitet.",
      "flavor": "Knusprig, aromatisch und süß-salzig.",
      "technique": "Füllung einkochen und abkühlen lassen, bevor die Teigblätter gefüllt werden.",
      "essentials": [
        "250 g Filoteig",
        "500 g Hähnchenschenkelfilet",
        "2 Zwiebeln"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 90 Min.",
        "ingredients": [
          "250 g Filoteig",
          "500 g Hähnchenschenkelfilet",
          "2 Zwiebeln",
          "3 Eier",
          "100 g Mandeln",
          "Zimt",
          "Ingwer",
          "Petersilie",
          "Butter",
          "Puderzucker nach Geschmack"
        ],
        "steps": [
          "Zwiebeln und Gewürze anbraten, Hähnchen und etwas Wasser hinzufügen und vollständig gar schmoren.",
          "Fleisch zerpflücken und Sauce einkochen; Eier einrühren, bis sie stocken.",
          "Füllung abkühlen lassen, Mandeln rösten und hacken.",
          "Mit Butter bestrichene Filoblätter in eine Form legen, mit Fleisch, Eiermasse und Mandeln füllen und zusammenfalten.",
          "Bei 190 °C goldbraun und durchgehend heiß backen."
        ]
      },
      "variants": [
        "Meeresfrüchtepastilla hat meist eine weniger süße Füllung."
      ],
      "serving": [
        "Lauwarm servieren, nach Wunsch mit etwas Puderzucker und Zimt."
      ],
      "commonMistakes": [
        "Teig nicht mit einer flüssigen, heißen Sauce füllen."
      ]
    }
  },
  "shakshuka": {
    "en": {
      "overview": "A concentrated vegetable sauce forms the base for eggs cooked directly in the pan.",
      "history": "The dish has North African roots and is also widespread in parts of the Middle East. Its precise origin is disputed.",
      "flavor": "Tangy, fruity and spiced.",
      "technique": "Reduce the sauce before cracking the eggs into small wells.",
      "essentials": [
        "6 eggs",
        "800 g tomatoes",
        "1 onion"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 35 min",
        "ingredients": [
          "6 eggs",
          "800 g tomatoes",
          "1 onion",
          "1 bell pepper",
          "2 garlic cloves",
          "cumin",
          "paprika powder",
          "chilli",
          "olive oil"
        ],
        "steps": [
          "Fry onion, bell pepper and garlic.",
          "Add spices and tomatoes and reduce to a thick sauce.",
          "Make wells and crack the eggs into the sauce.",
          "Cover and cook until the eggs have set; cook completely through if needed."
        ]
      },
      "variants": [
        "Versions with merguez, green vegetables or other spices."
      ],
      "serving": [
        "Serve with bread."
      ],
      "commonMistakes": [
        "Do not add the eggs before the sauce has thickened."
      ]
    },
    "fr": {
      "overview": "Une sauce de légumes réduite sert de base à des œufs cuits directement dans la poêle.",
      "history": "Le plat a des racines nord-africaines et est aussi répandu dans certaines régions du Moyen-Orient. Son origine exacte fait débat.",
      "flavor": "Acidulée, fruitée et épicée.",
      "technique": "Faire réduire la sauce avant de casser les œufs dans de petits creux.",
      "essentials": [
        "6 œufs",
        "800 g de tomates",
        "1 oignon"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 35 min",
        "ingredients": [
          "6 œufs",
          "800 g de tomates",
          "1 oignon",
          "1 poivron",
          "2 gousses d’ail",
          "cumin",
          "paprika en poudre",
          "piment",
          "huile d’olive"
        ],
        "steps": [
          "Faire revenir l’oignon, le poivron et l’ail.",
          "Ajouter les épices et les tomates et faire réduire jusqu’à obtenir une sauce épaisse.",
          "Former des creux et y casser les œufs.",
          "Couvrir et cuire jusqu’à ce que les œufs aient pris ; les cuire entièrement si nécessaire."
        ]
      },
      "variants": [
        "Variantes aux merguez, aux légumes verts ou à d’autres épices."
      ],
      "serving": [
        "Servir avec du pain."
      ],
      "commonMistakes": [
        "Ne pas ajouter les œufs avant que la sauce ait épaissi."
      ]
    },
    "pt": {
      "overview": "Um molho concentrado de legumes serve de base para ovos cozinhados diretamente na frigideira.",
      "history": "O prato tem raízes norte-africanas e também é comum em partes do Médio Oriente. A sua origem exata é discutida.",
      "flavor": "Ácida, frutada e condimentada.",
      "technique": "Reduza o molho antes de partir os ovos em pequenas cavidades.",
      "essentials": [
        "6 ovos",
        "800 g de tomate",
        "1 cebola"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 35 min",
        "ingredients": [
          "6 ovos",
          "800 g de tomate",
          "1 cebola",
          "1 pimento",
          "2 dentes de alho",
          "cominhos",
          "pimentão em pó",
          "malagueta",
          "azeite"
        ],
        "steps": [
          "Salteie cebola, pimento e alho.",
          "Junte especiarias e tomate e reduza até obter um molho espesso.",
          "Faça cavidades e parta os ovos no molho.",
          "Tape e cozinhe até os ovos solidificarem; cozinhe-os completamente se necessário."
        ]
      },
      "variants": [
        "Variantes com merguez, legumes verdes ou outras especiarias."
      ],
      "serving": [
        "Sirva com pão."
      ],
      "commonMistakes": [
        "Não junte os ovos antes de o molho engrossar."
      ]
    },
    "es": {
      "overview": "Una salsa de verduras reducida sirve de base para huevos cocinados directamente en la sartén.",
      "history": "El plato tiene raíces norteafricanas y también está extendido en partes de Oriente Medio. Su origen exacto es objeto de debate.",
      "flavor": "Ácida, afrutada y especiada.",
      "technique": "Reduce la salsa antes de cascar los huevos en pequeños huecos.",
      "essentials": [
        "6 huevos",
        "800 g de tomates",
        "1 cebolla"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 35 min",
        "ingredients": [
          "6 huevos",
          "800 g de tomates",
          "1 cebolla",
          "1 pimiento",
          "2 dientes de ajo",
          "comino",
          "pimentón",
          "chile",
          "aceite de oliva"
        ],
        "steps": [
          "Sofríe la cebolla, el pimiento y el ajo.",
          "Añade especias y tomate y reduce hasta obtener una salsa espesa.",
          "Haz huecos y casca los huevos en la salsa.",
          "Tapa y cocina hasta que los huevos cuajen; hazlos por completo si es necesario."
        ]
      },
      "variants": [
        "Variantes con merguez, verduras verdes u otras especias."
      ],
      "serving": [
        "Sirve con pan."
      ],
      "commonMistakes": [
        "No añadas los huevos antes de que la salsa haya espesado."
      ]
    },
    "de": {
      "overview": "Eine eingekochte Gemüsesauce bildet die Grundlage für Eier, die direkt in der Pfanne gegart werden.",
      "history": "Das Gericht hat nordafrikanische Wurzeln und ist auch in Teilen des Nahen Ostens verbreitet. Seine genaue Herkunft ist umstritten.",
      "flavor": "Säuerlich, fruchtig und würzig.",
      "technique": "Sauce einkochen, bevor die Eier in kleine Mulden geschlagen werden.",
      "essentials": [
        "6 Eier",
        "800 g Tomaten",
        "1 Zwiebel"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 35 Min.",
        "ingredients": [
          "6 Eier",
          "800 g Tomaten",
          "1 Zwiebel",
          "1 Paprikaschote",
          "2 Knoblauchzehen",
          "Kreuzkümmel",
          "Paprikapulver",
          "Chili",
          "Olivenöl"
        ],
        "steps": [
          "Zwiebel, Paprika und Knoblauch anbraten.",
          "Gewürze und Tomaten hinzufügen und zu einer dicken Sauce einkochen.",
          "Mulden formen und Eier in die Sauce schlagen.",
          "Abdecken und garen, bis die Eier gestockt sind; bei Bedarf vollständig durchgaren."
        ]
      },
      "variants": [
        "Varianten mit Merguez, grünem Gemüse oder anderen Gewürzen."
      ],
      "serving": [
        "Mit Brot servieren."
      ],
      "commonMistakes": [
        "Eier erst hinzufügen, wenn die Sauce eingedickt ist."
      ]
    }
  },
  "merguez": {
    "en": {
      "overview": "The sausage is seasoned with chilli, paprika and cumin, among other spices, and grilled or fried.",
      "history": "Merguez is part of North African food traditions and is also used in shakshuka and other dishes.",
      "flavor": "Hot, aromatic and roasted.",
      "technique": "Cook fresh sausages over moderate heat until cooked through.",
      "essentials": [
        "500 g fresh merguez sausages",
        "1 onion",
        "2 bell peppers"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30 min",
        "ingredients": [
          "500 g fresh merguez sausages",
          "1 onion",
          "2 bell peppers",
          "1 tbsp olive oil",
          "lemon",
          "bread"
        ],
        "steps": [
          "Cut the onion and peppers into strips.",
          "Fry the vegetables in oil until tender.",
          "Grill or pan-fry the sausages until cooked through, at least 71 °C for minced lamb or beef.",
          "Serve with vegetables, lemon and bread."
        ]
      },
      "variants": [
        "Merguez can also be served with couscous or used as an ingredient in stews."
      ],
      "serving": [
        "Serve with harissa to taste."
      ],
      "commonMistakes": [
        "Do not cook the sausages over such high heat that they burn before the centre is done."
      ]
    },
    "fr": {
      "overview": "La saucisse est assaisonnée notamment de piment, de paprika et de cumin, puis grillée ou poêlée.",
      "history": "La merguez fait partie des traditions culinaires nord-africaines et entre aussi dans la shakshuka et d’autres plats.",
      "flavor": "Piquante, aromatique et grillée.",
      "technique": "Cuire les saucisses fraîches à feu modéré jusqu’à cuisson complète.",
      "essentials": [
        "500 g de merguez fraîches",
        "1 oignon",
        "2 poivrons"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30 min",
        "ingredients": [
          "500 g de merguez fraîches",
          "1 oignon",
          "2 poivrons",
          "1 c. à soupe d’huile d’olive",
          "citron",
          "pain"
        ],
        "steps": [
          "Couper l’oignon et les poivrons en lanières.",
          "Faire revenir les légumes dans l’huile jusqu’à tendreté.",
          "Griller ou poêler les saucisses jusqu’à cuisson complète, à au moins 71 °C pour la viande d’agneau ou de bœuf hachée.",
          "Servir avec les légumes, du citron et du pain."
        ]
      },
      "variants": [
        "Les merguez peuvent aussi être servies avec du couscous ou entrer dans des ragoûts."
      ],
      "serving": [
        "Servir avec de la harissa selon le goût."
      ],
      "commonMistakes": [
        "Ne pas cuire les saucisses à feu si vif qu’elles brûlent avant d’être cuites à cœur."
      ]
    },
    "pt": {
      "overview": "A salsicha é temperada com malagueta, pimentão e cominhos, entre outras especiarias, e grelhada ou frita.",
      "history": "A merguez faz parte das tradições gastronómicas norte-africanas e também é usada na shakshuka e noutros pratos.",
      "flavor": "Picante, aromática e tostada.",
      "technique": "Cozinhe as salsichas frescas em lume moderado até estarem bem cozinhadas.",
      "essentials": [
        "500 g de salsichas merguez frescas",
        "1 cebola",
        "2 pimentos"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30 min",
        "ingredients": [
          "500 g de salsichas merguez frescas",
          "1 cebola",
          "2 pimentos",
          "1 c. de sopa de azeite",
          "limão",
          "pão"
        ],
        "steps": [
          "Corte a cebola e os pimentos em tiras.",
          "Salteie os legumes em azeite até ficarem tenros.",
          "Grelhe ou frite as salsichas na frigideira até estarem bem cozinhadas, atingindo pelo menos 71 °C no caso de carne picada de borrego ou vaca.",
          "Sirva com legumes, limão e pão."
        ]
      },
      "variants": [
        "A merguez também pode ser servida com cuscuz ou usada como ingrediente em guisados."
      ],
      "serving": [
        "Sirva com harissa a gosto."
      ],
      "commonMistakes": [
        "Não cozinhe as salsichas em lume tão forte que queimem antes de o interior estar cozinhado."
      ]
    },
    "es": {
      "overview": "La salchicha se condimenta con chile, pimentón y comino, entre otras especias, y se asa o se fríe.",
      "history": "La merguez forma parte de las tradiciones culinarias norteafricanas y también se utiliza en la shakshuka y otros platos.",
      "flavor": "Picante, aromática y tostada.",
      "technique": "Cocina las salchichas frescas a fuego moderado hasta que estén hechas por dentro.",
      "essentials": [
        "500 g de salchichas merguez frescas",
        "1 cebolla",
        "2 pimientos"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30 min",
        "ingredients": [
          "500 g de salchichas merguez frescas",
          "1 cebolla",
          "2 pimientos",
          "1 cucharada de aceite de oliva",
          "limón",
          "pan"
        ],
        "steps": [
          "Corta la cebolla y los pimientos en tiras.",
          "Saltea las verduras en aceite hasta que estén tiernas.",
          "Asa o cocina las salchichas en sartén hasta que estén hechas por dentro, al menos a 71 °C si son de carne picada de cordero o vacuno.",
          "Sirve con verduras, limón y pan."
        ]
      },
      "variants": [
        "La merguez también puede servirse con cuscús o utilizarse como ingrediente en guisos."
      ],
      "serving": [
        "Sirve con harissa al gusto."
      ],
      "commonMistakes": [
        "No cocines las salchichas a fuego tan fuerte que se quemen antes de que el centro esté hecho."
      ]
    },
    "de": {
      "overview": "Die Wurst wird unter anderem mit Chili, Paprika und Kreuzkümmel gewürzt und gegrillt oder gebraten.",
      "history": "Merguez gehört zu den nordafrikanischen Esstraditionen und wird auch in Shakshuka und anderen Gerichten verwendet.",
      "flavor": "Scharf, aromatisch und röstig.",
      "technique": "Frische Würste bei mittlerer Hitze vollständig durchgaren.",
      "essentials": [
        "500 g frische Merguez-Würste",
        "1 Zwiebel",
        "2 Paprikaschoten"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30 Min.",
        "ingredients": [
          "500 g frische Merguez-Würste",
          "1 Zwiebel",
          "2 Paprikaschoten",
          "1 EL Olivenöl",
          "Zitrone",
          "Brot"
        ],
        "steps": [
          "Zwiebel und Paprika in Streifen schneiden.",
          "Gemüse in Öl weich braten.",
          "Würste grillen oder in der Pfanne vollständig durchbraten, bei Lamm- oder Rinderhackfleisch mindestens 71 °C erreichen.",
          "Mit Gemüse, Zitrone und Brot servieren."
        ]
      },
      "variants": [
        "Merguez kann auch mit Couscous serviert oder als Zutat in Eintöpfen verwendet werden."
      ],
      "serving": [
        "Mit Harissa nach Geschmack servieren."
      ],
      "commonMistakes": [
        "Würste nicht bei so hoher Hitze braten, dass sie verbrennen, bevor sie innen gar sind."
      ]
    }
  }
} as const satisfies Readonly<Record<string, Record<InternationalSummaryLocale, ArticleBody>>>;
