import type { FoodKnowledgeArticle } from "../types.ts";
import type { InternationalSummaryLocale } from "../../../lib/international-summary-drafts.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
// Review-only bodies. Compose with translated summaries and untouched original IDs/sources after review.
export const draftInternationalArticles = {
  "sambar": {
    "en": {
      "overview": "Toor dal adds body, while tamarind provides acidity.",
      "history": "Sambar is a common accompaniment to rice, idli and dosa in South Indian cuisines.",
      "flavor": "Tangy, spiced and full-bodied.",
      "technique": "Cook the lentils until tender before adding tamarind; fry the spices separately.",
      "essentials": [
        "200 g toor dal",
        "300 g vegetables",
        "1 tbsp tamarind paste"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "200 g toor dal",
          "300 g vegetables",
          "1 tbsp tamarind paste",
          "2 tsp sambar masala",
          "1 tsp mustard seeds",
          "curry leaves",
          "oil and salt"
        ],
        "steps": [
          "Cook the lentils in water until tender.",
          "Cook the vegetables with spices and tamarind.",
          "Mix in the lentils and adjust the seasoning.",
          "Fry mustard seeds and curry leaves in oil and pour over the stew."
        ]
      },
      "variants": [
        "Udupi sambar and versions with coconut."
      ],
      "serving": [
        "Serve with rice, dosa or idli."
      ],
      "commonMistakes": [
        "Do not add tamarind before the lentils are tender."
      ]
    },
    "fr": {
      "overview": "Le toor dal apporte de la consistance, tandis que le tamarin apporte de l’acidité.",
      "history": "Le sambar accompagne couramment le riz, les idli et les dosa dans les cuisines du sud de l’Inde.",
      "flavor": "Acidulé, épicé et généreux.",
      "technique": "Cuire les lentilles jusqu’à tendreté avant d’ajouter le tamarin ; faire revenir les épices séparément.",
      "essentials": [
        "200 g de toor dal",
        "300 g de légumes",
        "1 c. à soupe de pâte de tamarin"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "200 g de toor dal",
          "300 g de légumes",
          "1 c. à soupe de pâte de tamarin",
          "2 c. à café de sambar masala",
          "1 c. à café de graines de moutarde",
          "feuilles de curry",
          "huile et sel"
        ],
        "steps": [
          "Cuire les lentilles dans l’eau jusqu’à tendreté.",
          "Cuire les légumes avec les épices et le tamarin.",
          "Incorporer les lentilles et rectifier l’assaisonnement.",
          "Faire revenir les graines de moutarde et les feuilles de curry dans l’huile et verser sur le ragoût."
        ]
      },
      "variants": [
        "Sambar d’Udupi et variantes à la noix de coco."
      ],
      "serving": [
        "Servir avec du riz, des dosa ou des idli."
      ],
      "commonMistakes": [
        "Ne pas ajouter le tamarin avant que les lentilles soient tendres."
      ]
    },
    "pt": {
      "overview": "O toor dal dá corpo, enquanto o tamarindo confere acidez.",
      "history": "O sambar é um acompanhamento comum de arroz, idli e dosa nas cozinhas do sul da Índia.",
      "flavor": "Ácido, condimentado e encorpado.",
      "technique": "Coza as lentilhas até ficarem tenras antes de juntar o tamarindo; salteie as especiarias separadamente.",
      "essentials": [
        "200 g de toor dal",
        "300 g de legumes",
        "1 c. de sopa de pasta de tamarindo"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "200 g de toor dal",
          "300 g de legumes",
          "1 c. de sopa de pasta de tamarindo",
          "2 c. de chá de sambar masala",
          "1 c. de chá de sementes de mostarda",
          "folhas de caril",
          "óleo e sal"
        ],
        "steps": [
          "Coza as lentilhas em água até ficarem tenras.",
          "Coza os legumes com as especiarias e o tamarindo.",
          "Misture as lentilhas e retifique os temperos.",
          "Salteie as sementes de mostarda e as folhas de caril em óleo e verta por cima."
        ]
      },
      "variants": [
        "Sambar de Udupi e variantes com coco."
      ],
      "serving": [
        "Sirva com arroz, dosa ou idli."
      ],
      "commonMistakes": [
        "Não junte o tamarindo antes de as lentilhas estarem tenras."
      ]
    },
    "es": {
      "overview": "El toor dal aporta cuerpo y el tamarindo, acidez.",
      "history": "El sambar acompaña habitualmente al arroz, los idli y las dosa en las cocinas del sur de la India.",
      "flavor": "Ácido, especiado y con cuerpo.",
      "technique": "Cuece las lentejas hasta que estén tiernas antes de añadir el tamarindo; sofríe las especias por separado.",
      "essentials": [
        "200 g de toor dal",
        "300 g de verduras",
        "1 cucharada de pasta de tamarindo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "200 g de toor dal",
          "300 g de verduras",
          "1 cucharada de pasta de tamarindo",
          "2 cucharaditas de sambar masala",
          "1 cucharadita de semillas de mostaza",
          "hojas de curri",
          "aceite y sal"
        ],
        "steps": [
          "Cuece las lentejas en agua hasta que estén tiernas.",
          "Cuece las verduras con especias y tamarindo.",
          "Incorpora las lentejas y ajusta la sazón.",
          "Sofríe las semillas de mostaza y las hojas de curri en aceite y vierte por encima."
        ]
      },
      "variants": [
        "Sambar de Udupi y variantes con coco."
      ],
      "serving": [
        "Sirve con arroz, dosa o idli."
      ],
      "commonMistakes": [
        "No añadas tamarindo antes de que las lentejas estén tiernas."
      ]
    },
    "de": {
      "overview": "Toor Dal sorgt für Fülle, Tamarinde für Säure.",
      "history": "Sambar ist in südindischen Küchen eine gängige Beilage zu Reis, Idli und Dosa.",
      "flavor": "Säuerlich, würzig und vollmundig.",
      "technique": "Linsen vor Zugabe der Tamarinde weich kochen; Gewürze separat anrösten.",
      "essentials": [
        "200 g Toor Dal",
        "300 g Gemüse",
        "1 EL Tamarindenpaste"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "200 g Toor Dal",
          "300 g Gemüse",
          "1 EL Tamarindenpaste",
          "2 TL Sambar Masala",
          "1 TL Senfkörner",
          "Curryblätter",
          "Öl und Salz"
        ],
        "steps": [
          "Linsen in Wasser weich kochen.",
          "Gemüse mit Gewürzen und Tamarinde kochen.",
          "Linsen untermischen und abschmecken.",
          "Senfkörner und Curryblätter in Öl anrösten und darübergeben."
        ]
      },
      "variants": [
        "Udupi-Sambar und Varianten mit Kokos."
      ],
      "serving": [
        "Mit Reis, Dosa oder Idli servieren."
      ],
      "commonMistakes": [
        "Tamarinde erst zugeben, wenn die Linsen weich sind."
      ]
    }
  },
  "idli": {
    "en": {
      "overview": "Fermented batter is steamed in small moulds without forming a browned crust.",
      "history": "Idli is a well-established breakfast dish in South India.",
      "flavor": "Mildly tangy and airy.",
      "technique": "Allow the batter to ferment before steaming.",
      "essentials": [
        "300 g idli rice",
        "100 g urad dal",
        "water"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min + soaking and fermentation",
        "ingredients": [
          "300 g idli rice",
          "100 g urad dal",
          "water",
          "salt"
        ],
        "steps": [
          "Soak rice and dal separately for four hours.",
          "Grind each separately with water, then combine.",
          "Ferment until the batter is airy.",
          "Steam in greased moulds for 10–15 minutes."
        ]
      },
      "variants": [
        "Rava idli made with semolina."
      ],
      "serving": [
        "Serve warm with sambar and coconut chutney."
      ],
      "commonMistakes": [
        "Do not overfill the steaming moulds."
      ]
    },
    "fr": {
      "overview": "La pâte fermentée est cuite à la vapeur dans de petits moules, sans croûte dorée.",
      "history": "L’idli est un plat de petit-déjeuner bien établi dans le sud de l’Inde.",
      "flavor": "Légèrement acidulé et aéré.",
      "technique": "Laisser fermenter la pâte avant la cuisson à la vapeur.",
      "essentials": [
        "300 g de riz à idli",
        "100 g d’urad dal",
        "eau"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min + trempage et fermentation",
        "ingredients": [
          "300 g de riz à idli",
          "100 g d’urad dal",
          "eau",
          "sel"
        ],
        "steps": [
          "Faire tremper le riz et le dal séparément pendant quatre heures.",
          "Broyer chaque partie séparément avec de l’eau, puis mélanger.",
          "Laisser fermenter jusqu’à ce que la pâte soit aérée.",
          "Cuire à la vapeur dans des moules graissés pendant 10–15 minutes."
        ]
      },
      "variants": [
        "Rava idli à la semoule."
      ],
      "serving": [
        "Servir chaud avec du sambar et du chutney de noix de coco."
      ],
      "commonMistakes": [
        "Ne pas trop remplir les moules de cuisson à la vapeur."
      ]
    },
    "pt": {
      "overview": "A massa fermentada é cozida a vapor em pequenas formas, sem formar crosta dourada.",
      "history": "O idli é um prato tradicional de pequeno-almoço no sul da Índia.",
      "flavor": "Ligeiramente ácido e leve.",
      "technique": "Deixe a massa fermentar antes de a cozer a vapor.",
      "essentials": [
        "300 g de arroz para idli",
        "100 g de urad dal",
        "água"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min + demolha e fermentação",
        "ingredients": [
          "300 g de arroz para idli",
          "100 g de urad dal",
          "água",
          "sal"
        ],
        "steps": [
          "Demolhe o arroz e o dal separadamente durante quatro horas.",
          "Triture cada parte separadamente com água e misture.",
          "Deixe fermentar até a massa ficar leve.",
          "Coza a vapor em formas untadas durante 10–15 minutos."
        ]
      },
      "variants": [
        "Rava idli de sêmola."
      ],
      "serving": [
        "Sirva quente com sambar e chutney de coco."
      ],
      "commonMistakes": [
        "Não encha demasiado as formas de cozer a vapor."
      ]
    },
    "es": {
      "overview": "La masa fermentada se cuece al vapor en moldes pequeños, sin formar corteza dorada.",
      "history": "El idli es un plato habitual del desayuno en el sur de la India.",
      "flavor": "Ligeramente ácido y esponjoso.",
      "technique": "Deja fermentar la masa antes de cocerla al vapor.",
      "essentials": [
        "300 g de arroz para idli",
        "100 g de urad dal",
        "agua"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min + remojo y fermentación",
        "ingredients": [
          "300 g de arroz para idli",
          "100 g de urad dal",
          "agua",
          "sal"
        ],
        "steps": [
          "Remoja el arroz y el dal por separado durante cuatro horas.",
          "Tritura cada parte por separado con agua y mezcla.",
          "Deja fermentar hasta que la masa esté esponjosa.",
          "Cuece al vapor en moldes engrasados durante 10–15 minutos."
        ]
      },
      "variants": [
        "Rava idli con sémola."
      ],
      "serving": [
        "Sirve caliente con sambar y chutney de coco."
      ],
      "commonMistakes": [
        "No llenes demasiado los moldes de vapor."
      ]
    },
    "de": {
      "overview": "Fermentierter Teig wird in kleinen Formen ohne Bratkruste gedämpft.",
      "history": "Idli ist ein etabliertes Frühstücksgericht in Südindien.",
      "flavor": "Mild säuerlich und luftig.",
      "technique": "Den Teig vor dem Dämpfen fermentieren lassen.",
      "essentials": [
        "300 g Idli-Reis",
        "100 g Urad Dal",
        "Wasser"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min. + Einweichen und Fermentation",
        "ingredients": [
          "300 g Idli-Reis",
          "100 g Urad Dal",
          "Wasser",
          "Salz"
        ],
        "steps": [
          "Reis und Dal vier Stunden getrennt einweichen.",
          "Beide Teile getrennt mit Wasser mahlen, dann mischen.",
          "Fermentieren lassen, bis der Teig luftig ist.",
          "In gefetteten Formen 10–15 Minuten dämpfen."
        ]
      },
      "variants": [
        "Rava Idli aus Grieß."
      ],
      "serving": [
        "Warm mit Sambar und Kokos-Chutney servieren."
      ],
      "commonMistakes": [
        "Dämpfformen nicht überfüllen."
      ]
    }
  },
  "vada": {
    "en": {
      "overview": "Medu vada is made from ground urad dal; other vada use other legumes.",
      "history": "Vada is common as a snack and breakfast in South India.",
      "flavor": "Crisp outside and soft, spiced centre.",
      "technique": "Use as little water as possible when grinding the dal.",
      "essentials": [
        "250 g urad dal",
        "1 green chilli",
        "ginger"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min + soaking",
        "ingredients": [
          "250 g urad dal",
          "1 green chilli",
          "ginger",
          "curry leaves",
          "salt",
          "frying oil"
        ],
        "steps": [
          "Soak the dal for four hours and drain.",
          "Grind into a thick batter and mix in the spices.",
          "Shape small rings with damp hands.",
          "Deep-fry in batches until golden and cooked through."
        ]
      },
      "variants": [
        "Masala vada made with chana dal."
      ],
      "serving": [
        "Serve with chutney or sambar."
      ],
      "commonMistakes": [
        "An overly wet batter makes the rings difficult to shape."
      ]
    },
    "fr": {
      "overview": "Le medu vada est préparé avec de l’urad dal moulu ; d’autres vada utilisent d’autres légumineuses.",
      "history": "Le vada est courant comme en-cas et au petit-déjeuner dans le sud de l’Inde.",
      "flavor": "Extérieur croustillant et cœur tendre et épicé.",
      "technique": "Utiliser le moins d’eau possible pour broyer le dal.",
      "essentials": [
        "250 g d’urad dal",
        "1 piment vert",
        "gingembre"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min + trempage",
        "ingredients": [
          "250 g d’urad dal",
          "1 piment vert",
          "gingembre",
          "feuilles de curry",
          "sel",
          "huile de friture"
        ],
        "steps": [
          "Faire tremper le dal pendant quatre heures, puis l’égoutter.",
          "Broyer en pâte épaisse et incorporer les épices.",
          "Former de petits anneaux avec les mains humides.",
          "Frire par petites quantités jusqu’à ce que les vada soient dorés et cuits à cœur."
        ]
      },
      "variants": [
        "Masala vada à base de chana dal."
      ],
      "serving": [
        "Servir avec du chutney ou du sambar."
      ],
      "commonMistakes": [
        "Une pâte trop humide rend les anneaux difficiles à former."
      ]
    },
    "pt": {
      "overview": "O medu vada é feito de urad dal triturado; outros vada utilizam outras leguminosas.",
      "history": "O vada é comum como snack e pequeno-almoço no sul da Índia.",
      "flavor": "Exterior crocante e interior macio e condimentado.",
      "technique": "Use o mínimo de água possível ao triturar o dal.",
      "essentials": [
        "250 g de urad dal",
        "1 malagueta verde",
        "gengibre"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min + demolha",
        "ingredients": [
          "250 g de urad dal",
          "1 malagueta verde",
          "gengibre",
          "folhas de caril",
          "sal",
          "óleo para fritar"
        ],
        "steps": [
          "Demolhe o dal durante quatro horas e escorra.",
          "Triture até obter uma massa espessa e misture as especiarias.",
          "Forme pequenas argolas com as mãos húmidas.",
          "Frite em porções até ficarem dourados e bem cozinhados."
        ]
      },
      "variants": [
        "Masala vada feito de chana dal."
      ],
      "serving": [
        "Sirva com chutney ou sambar."
      ],
      "commonMistakes": [
        "Uma massa demasiado húmida dificulta a formação das argolas."
      ]
    },
    "es": {
      "overview": "El medu vada se elabora con urad dal triturado; otros vada utilizan otras legumbres.",
      "history": "El vada es habitual como aperitivo y desayuno en el sur de la India.",
      "flavor": "Exterior crujiente e interior tierno y especiado.",
      "technique": "Usa la menor cantidad posible de agua al triturar el dal.",
      "essentials": [
        "250 g de urad dal",
        "1 chile verde",
        "jengibre"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min + remojo",
        "ingredients": [
          "250 g de urad dal",
          "1 chile verde",
          "jengibre",
          "hojas de curri",
          "sal",
          "aceite para freír"
        ],
        "steps": [
          "Remoja el dal durante cuatro horas y escúrrelo.",
          "Tritura hasta obtener una masa espesa e incorpora las especias.",
          "Forma pequeños aros con las manos húmedas.",
          "Fríe por tandas hasta que estén dorados y hechos por dentro."
        ]
      },
      "variants": [
        "Masala vada de chana dal."
      ],
      "serving": [
        "Sirve con chutney o sambar."
      ],
      "commonMistakes": [
        "Una masa demasiado húmeda dificulta formar los aros."
      ]
    },
    "de": {
      "overview": "Medu Vada wird aus gemahlenem Urad Dal hergestellt; andere Vada verwenden andere Hülsenfrüchte.",
      "history": "Vada ist in Südindien ein gängiger Snack und ein Frühstücksgericht.",
      "flavor": "Knusprige Außenseite und weicher, würziger Kern.",
      "technique": "Beim Mahlen des Dal möglichst wenig Wasser verwenden.",
      "essentials": [
        "250 g Urad Dal",
        "1 grüne Chili",
        "Ingwer"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min. + Einweichen",
        "ingredients": [
          "250 g Urad Dal",
          "1 grüne Chili",
          "Ingwer",
          "Curryblätter",
          "Salz",
          "Frittieröl"
        ],
        "steps": [
          "Dal vier Stunden einweichen und abtropfen lassen.",
          "Zu einem dicken Teig mahlen und Gewürze untermischen.",
          "Mit feuchten Händen kleine Ringe formen.",
          "Portionsweise goldbraun und vollständig durchfrittieren."
        ]
      },
      "variants": [
        "Masala Vada aus Chana Dal."
      ],
      "serving": [
        "Mit Chutney oder Sambar servieren."
      ],
      "commonMistakes": [
        "Zu feuchter Teig erschwert das Formen der Ringe."
      ]
    }
  },
  "naan": {
    "en": {
      "overview": "The dough is allowed to rise and cooked quickly over high heat.",
      "history": "Naan appears in several West, Central and South Asian bread traditions.",
      "flavor": "Soft with toasted spots.",
      "technique": "A very hot pan can mimic some of the heat of a tandoor.",
      "essentials": [
        "400 g wheat flour",
        "150 g yoghurt",
        "100 ml water"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40 min + rising",
        "ingredients": [
          "400 g wheat flour",
          "150 g yoghurt",
          "100 ml water",
          "1 tsp dried yeast",
          "1 tsp salt",
          "butter"
        ],
        "steps": [
          "Knead the flour, yoghurt, water, yeast and salt.",
          "Allow the dough to rise until airy.",
          "Divide into eight and roll out.",
          "Cook on both sides in a hot pan and brush with butter."
        ]
      },
      "variants": [
        "Garlic naan and butter naan."
      ],
      "serving": [
        "Serve warm with stews."
      ],
      "commonMistakes": [
        "Avoid cooking at too low a heat."
      ]
    },
    "fr": {
      "overview": "La pâte lève puis cuit rapidement à haute température.",
      "history": "Le naan appartient à plusieurs traditions boulangères d’Asie occidentale, centrale et méridionale.",
      "flavor": "Moelleux, avec des zones grillées.",
      "technique": "Une poêle très chaude peut reproduire une partie de la chaleur d’un tandoor.",
      "essentials": [
        "400 g de farine de blé",
        "150 g de yaourt",
        "100 ml d’eau"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40 min + levée",
        "ingredients": [
          "400 g de farine de blé",
          "150 g de yaourt",
          "100 ml d’eau",
          "1 c. à café de levure sèche",
          "1 c. à café de sel",
          "beurre"
        ],
        "steps": [
          "Pétrir la farine, le yaourt, l’eau, la levure et le sel.",
          "Laisser lever la pâte jusqu’à ce qu’elle soit aérée.",
          "Diviser en huit portions et les étaler au rouleau.",
          "Cuire des deux côtés dans une poêle chaude et badigeonner de beurre."
        ]
      },
      "variants": [
        "Naan à l’ail et naan au beurre."
      ],
      "serving": [
        "Servir chaud avec des plats mijotés."
      ],
      "commonMistakes": [
        "Éviter une température de cuisson trop basse."
      ]
    },
    "pt": {
      "overview": "A massa leveda e é cozinhada rapidamente a temperatura elevada.",
      "history": "O naan está presente em várias tradições de pão da Ásia Ocidental, Central e Meridional.",
      "flavor": "Macio, com manchas tostadas.",
      "technique": "Uma frigideira muito quente pode imitar parte do calor de um tandoor.",
      "essentials": [
        "400 g de farinha de trigo",
        "150 g de iogurte",
        "100 ml de água"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40 min + levedação",
        "ingredients": [
          "400 g de farinha de trigo",
          "150 g de iogurte",
          "100 ml de água",
          "1 c. de chá de fermento de padeiro seco",
          "1 c. de chá de sal",
          "manteiga"
        ],
        "steps": [
          "Amasse a farinha, o iogurte, a água, o fermento e o sal.",
          "Deixe a massa levedar até ficar leve.",
          "Divida em oito porções e estenda com o rolo.",
          "Cozinhe dos dois lados numa frigideira quente e pincele com manteiga."
        ]
      },
      "variants": [
        "Naan de alho e naan de manteiga."
      ],
      "serving": [
        "Sirva quente com guisados."
      ],
      "commonMistakes": [
        "Evite cozinhar a uma temperatura demasiado baixa."
      ]
    },
    "es": {
      "overview": "La masa fermenta y se cocina rápidamente a temperatura alta.",
      "history": "El naan forma parte de varias tradiciones panaderas de Asia occidental, central y meridional.",
      "flavor": "Suave, con zonas tostadas.",
      "technique": "Una sartén muy caliente puede imitar parte del calor de un tandoor.",
      "essentials": [
        "400 g de harina de trigo",
        "150 g de yogur",
        "100 ml de agua"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40 min + levado",
        "ingredients": [
          "400 g de harina de trigo",
          "150 g de yogur",
          "100 ml de agua",
          "1 cucharadita de levadura seca",
          "1 cucharadita de sal",
          "mantequilla"
        ],
        "steps": [
          "Amasa la harina, el yogur, el agua, la levadura y la sal.",
          "Deja levar la masa hasta que esté esponjosa.",
          "Divide en ocho porciones y estíralas con un rodillo.",
          "Cocina por ambos lados en una sartén caliente y pincela con mantequilla."
        ]
      },
      "variants": [
        "Naan de ajo y naan de mantequilla."
      ],
      "serving": [
        "Sirve caliente con guisos."
      ],
      "commonMistakes": [
        "Evita cocinar a temperatura demasiado baja."
      ]
    },
    "de": {
      "overview": "Der Teig geht auf und wird bei hoher Hitze schnell gebacken.",
      "history": "Naan ist in mehreren west-, zentral- und südasiatischen Brottraditionen verbreitet.",
      "flavor": "Weich mit gerösteten Stellen.",
      "technique": "Eine sehr heiße Pfanne kann die Hitze eines Tandoors teilweise nachahmen.",
      "essentials": [
        "400 g Weizenmehl",
        "150 g Joghurt",
        "100 ml Wasser"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40 Min. + Gehzeit",
        "ingredients": [
          "400 g Weizenmehl",
          "150 g Joghurt",
          "100 ml Wasser",
          "1 TL Trockenhefe",
          "1 TL Salz",
          "Butter"
        ],
        "steps": [
          "Mehl, Joghurt, Wasser, Hefe und Salz verkneten.",
          "Den Teig gehen lassen, bis er luftig ist.",
          "In acht Teile teilen und ausrollen.",
          "In einer heißen Pfanne beidseitig backen und mit Butter bestreichen."
        ]
      },
      "variants": [
        "Knoblauch-Naan und Butter-Naan."
      ],
      "serving": [
        "Warm zu Schmorgerichten servieren."
      ],
      "commonMistakes": [
        "Zu niedrige Backhitze vermeiden."
      ]
    }
  },
  "yakitori": {
    "en": {
      "overview": "Small pieces of chicken are grilled on skewers with salt or tare sauce.",
      "history": "Yakitori is common at Japanese izakaya and specialised grill restaurants.",
      "flavor": "Roasted, juicy and salty or slightly sweet.",
      "technique": "Cut evenly sized pieces and grill until cooked through.",
      "essentials": [
        "600 g boneless chicken thigh",
        "spring onions",
        "3 tbsp soy sauce"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "600 g boneless chicken thigh",
          "spring onions",
          "3 tbsp soy sauce",
          "3 tbsp mirin",
          "1 tbsp sugar"
        ],
        "steps": [
          "Cook the soy sauce, mirin and sugar until slightly syrupy.",
          "Thread the chicken and spring onions onto skewers.",
          "Grill, turning regularly.",
          "Brush with sauce towards the end and cook the chicken through."
        ]
      },
      "variants": [
        "Shio with salt and tare with sauce."
      ],
      "serving": [
        "Serve with lemon or shichimi."
      ],
      "commonMistakes": [
        "Do not brush cooked food with sauce that has come into contact with raw chicken."
      ]
    },
    "fr": {
      "overview": "De petits morceaux de poulet sont grillés en brochettes avec du sel ou de la sauce tare.",
      "history": "Le yakitori est courant dans les izakaya japonais et les restaurants spécialisés dans les grillades.",
      "flavor": "Grillé, juteux et salé ou légèrement sucré.",
      "technique": "Couper des morceaux de taille régulière et griller jusqu’à cuisson à cœur.",
      "essentials": [
        "600 g de hauts de cuisse de poulet désossés",
        "oignons nouveaux",
        "3 c. à soupe de sauce soja"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "600 g de hauts de cuisse de poulet désossés",
          "oignons nouveaux",
          "3 c. à soupe de sauce soja",
          "3 c. à soupe de mirin",
          "1 c. à soupe de sucre"
        ],
        "steps": [
          "Faire cuire la sauce soja, le mirin et le sucre jusqu’à obtenir une sauce légèrement sirupeuse.",
          "Enfiler le poulet et les oignons nouveaux sur des brochettes.",
          "Griller en retournant régulièrement.",
          "Badigeonner de sauce en fin de cuisson et cuire le poulet à cœur."
        ]
      },
      "variants": [
        "Shio au sel et tare à la sauce."
      ],
      "serving": [
        "Servir avec du citron ou du shichimi."
      ],
      "commonMistakes": [
        "Ne pas badigeonner les aliments cuits avec une sauce ayant été en contact avec du poulet cru."
      ]
    },
    "pt": {
      "overview": "Pequenos pedaços de frango são grelhados em espetadas com sal ou molho tare.",
      "history": "O yakitori é comum nos izakaya japoneses e em restaurantes especializados em grelhados.",
      "flavor": "Tostado, suculento e salgado ou ligeiramente doce.",
      "technique": "Corte pedaços uniformes e grelhe até ficarem bem cozinhados.",
      "essentials": [
        "600 g de coxa de frango desossada",
        "cebolinho verde",
        "3 c. de sopa de molho de soja"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "600 g de coxa de frango desossada",
          "cebolinho verde",
          "3 c. de sopa de molho de soja",
          "3 c. de sopa de mirin",
          "1 c. de sopa de açúcar"
        ],
        "steps": [
          "Coza o molho de soja, o mirin e o açúcar até obter um molho ligeiramente xaroposo.",
          "Enfie o frango e o cebolinho verde nos espetos.",
          "Grelhe, virando regularmente.",
          "Pincele com molho perto do fim e cozinhe completamente o frango."
        ]
      },
      "variants": [
        "Shio com sal e tare com molho."
      ],
      "serving": [
        "Sirva com limão ou shichimi."
      ],
      "commonMistakes": [
        "Não pincele alimentos cozinhados com molho que tenha estado em contacto com frango cru."
      ]
    },
    "es": {
      "overview": "Pequeños trozos de pollo se asan en brochetas con sal o salsa tare.",
      "history": "El yakitori es habitual en los izakaya japoneses y en establecimientos especializados en parrilla.",
      "flavor": "Tostado, jugoso y salado o ligeramente dulce.",
      "technique": "Corta trozos uniformes y ásalos hasta que estén hechos por dentro.",
      "essentials": [
        "600 g de contramuslo de pollo deshuesado",
        "cebolletas",
        "3 cucharadas de salsa de soja"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "600 g de contramuslo de pollo deshuesado",
          "cebolletas",
          "3 cucharadas de salsa de soja",
          "3 cucharadas de mirin",
          "1 cucharada de azúcar"
        ],
        "steps": [
          "Cuece la salsa de soja, el mirin y el azúcar hasta que tenga una consistencia ligeramente almibarada.",
          "Ensarta el pollo y las cebolletas en brochetas.",
          "Asa a la parrilla, dando la vuelta con regularidad.",
          "Pincela con salsa hacia el final y cocina el pollo por completo."
        ]
      },
      "variants": [
        "Shio con sal y tare con salsa."
      ],
      "serving": [
        "Sirve con limón o shichimi."
      ],
      "commonMistakes": [
        "No pinceles alimentos cocinados con salsa que haya estado en contacto con pollo crudo."
      ]
    },
    "de": {
      "overview": "Kleine Hähnchenstücke werden mit Salz oder Tare-Sauce am Spieß gegrillt.",
      "history": "Yakitori ist in japanischen Izakaya und spezialisierten Grillrestaurants verbreitet.",
      "flavor": "Röstig, saftig und salzig oder leicht süßlich.",
      "technique": "Gleich große Stücke schneiden und vollständig durchgrillen.",
      "essentials": [
        "600 g Hähnchenschenkelfilet",
        "Frühlingszwiebeln",
        "3 EL Sojasauce"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "600 g Hähnchenschenkelfilet",
          "Frühlingszwiebeln",
          "3 EL Sojasauce",
          "3 EL Mirin",
          "1 EL Zucker"
        ],
        "steps": [
          "Sojasauce, Mirin und Zucker zu einer leicht sirupartigen Sauce einkochen.",
          "Hähnchen und Frühlingszwiebeln auf Spieße stecken.",
          "Grillen und regelmäßig wenden.",
          "Gegen Ende mit Sauce bestreichen und das Hähnchen vollständig durchgaren."
        ]
      },
      "variants": [
        "Shio mit Salz und Tare mit Sauce."
      ],
      "serving": [
        "Mit Zitrone oder Shichimi servieren."
      ],
      "commonMistakes": [
        "Gegarte Speisen nicht mit Sauce bestreichen, die mit rohem Hähnchen in Kontakt war."
      ]
    }
  },
  "green-curry": {
    "en": {
      "overview": "Green curry paste provides aromas from chilli, lemongrass and herbs.",
      "history": "Kaeng khiao wan is a well-known type of Thai curry.",
      "flavor": "Creamy, aromatic and hot.",
      "technique": "Fry the curry paste before adding the rest of the coconut milk.",
      "essentials": [
        "400 ml coconut milk",
        "2 tbsp green curry paste",
        "400 g chicken"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "400 ml coconut milk",
          "2 tbsp green curry paste",
          "400 g chicken",
          "200 g aubergine",
          "fish sauce",
          "Thai basil"
        ],
        "steps": [
          "Fry the curry paste in a little coconut milk.",
          "Add the remaining coconut milk and the chicken.",
          "Simmer with the aubergine until the chicken is cooked through.",
          "Season with fish sauce and basil."
        ]
      },
      "variants": [
        "Versions with tofu or fish."
      ],
      "serving": [
        "Serve with jasmine rice."
      ],
      "commonMistakes": [
        "Avoid cooking the basil for a long time."
      ]
    },
    "fr": {
      "overview": "La pâte de curry vert apporte les arômes du piment, de la citronnelle et des herbes.",
      "history": "Le kaeng khiao wan est un type de curry thaïlandais bien connu.",
      "flavor": "Crémeux, aromatique et piquant.",
      "technique": "Faire revenir la pâte de curry avant d’ajouter le reste du lait de coco.",
      "essentials": [
        "400 ml de lait de coco",
        "2 c. à soupe de pâte de curry vert",
        "400 g de poulet"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "400 ml de lait de coco",
          "2 c. à soupe de pâte de curry vert",
          "400 g de poulet",
          "200 g d’aubergine",
          "sauce de poisson",
          "basilic thaï"
        ],
        "steps": [
          "Faire revenir la pâte de curry dans un peu de lait de coco.",
          "Ajouter le reste du lait de coco et le poulet.",
          "Laisser mijoter avec l’aubergine jusqu’à cuisson complète du poulet.",
          "Assaisonner avec la sauce de poisson et le basilic."
        ]
      },
      "variants": [
        "Variantes au tofu ou au poisson."
      ],
      "serving": [
        "Servir avec du riz jasmin."
      ],
      "commonMistakes": [
        "Éviter de cuire longtemps le basilic."
      ]
    },
    "pt": {
      "overview": "A pasta de caril verde dá aromas de malagueta, erva-príncipe e ervas.",
      "history": "O kaeng khiao wan é um tipo conhecido de caril tailandês.",
      "flavor": "Cremoso, aromático e picante.",
      "technique": "Salteie a pasta de caril antes de juntar o restante leite de coco.",
      "essentials": [
        "400 ml de leite de coco",
        "2 c. de sopa de pasta de caril verde",
        "400 g de frango"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "400 ml de leite de coco",
          "2 c. de sopa de pasta de caril verde",
          "400 g de frango",
          "200 g de beringela",
          "molho de peixe",
          "manjericão tailandês"
        ],
        "steps": [
          "Salteie a pasta de caril num pouco de leite de coco.",
          "Junte o restante leite de coco e o frango.",
          "Deixe cozinhar em lume brando com a beringela até o frango estar bem cozinhado.",
          "Tempere com molho de peixe e manjericão."
        ]
      },
      "variants": [
        "Variantes com tofu ou peixe."
      ],
      "serving": [
        "Sirva com arroz-jasmim."
      ],
      "commonMistakes": [
        "Evite cozer o manjericão durante muito tempo."
      ]
    },
    "es": {
      "overview": "La pasta de curri verde aporta aromas de chile, hierba limón y hierbas.",
      "history": "El kaeng khiao wan es un tipo conocido de curri tailandés.",
      "flavor": "Cremoso, aromático y picante.",
      "technique": "Sofríe la pasta de curri antes de añadir el resto de la leche de coco.",
      "essentials": [
        "400 ml de leche de coco",
        "2 cucharadas de pasta de curri verde",
        "400 g de pollo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "400 ml de leche de coco",
          "2 cucharadas de pasta de curri verde",
          "400 g de pollo",
          "200 g de berenjena",
          "salsa de pescado",
          "albahaca tailandesa"
        ],
        "steps": [
          "Sofríe la pasta de curri en un poco de leche de coco.",
          "Añade el resto de la leche de coco y el pollo.",
          "Cuece a fuego lento con la berenjena hasta que el pollo esté hecho por dentro.",
          "Sazona con salsa de pescado y albahaca."
        ]
      },
      "variants": [
        "Variantes con tofu o pescado."
      ],
      "serving": [
        "Sirve con arroz jazmín."
      ],
      "commonMistakes": [
        "Evita cocer la albahaca durante mucho tiempo."
      ]
    },
    "de": {
      "overview": "Grüne Currypaste liefert Aromen von Chili, Zitronengras und Kräutern.",
      "history": "Kaeng Khiao Wan ist eine bekannte thailändische Curryart.",
      "flavor": "Cremig, aromatisch und scharf.",
      "technique": "Currypaste anrösten, bevor die übrige Kokosmilch hinzugefügt wird.",
      "essentials": [
        "400 ml Kokosmilch",
        "2 EL grüne Currypaste",
        "400 g Hähnchen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "400 ml Kokosmilch",
          "2 EL grüne Currypaste",
          "400 g Hähnchen",
          "200 g Aubergine",
          "Fischsauce",
          "Thai-Basilikum"
        ],
        "steps": [
          "Currypaste in etwas Kokosmilch anrösten.",
          "Übrige Kokosmilch und Hähnchen zugeben.",
          "Mit der Aubergine köcheln lassen, bis das Hähnchen durchgegart ist.",
          "Mit Fischsauce und Basilikum abschmecken."
        ]
      },
      "variants": [
        "Varianten mit Tofu oder Fisch."
      ],
      "serving": [
        "Mit Jasminreis servieren."
      ],
      "commonMistakes": [
        "Basilikum nicht lange mitkochen."
      ]
    }
  },
  "udon": {
    "en": {
      "overview": "Udon is served in hot broth, cold with dipping sauce, or stir-fried.",
      "history": "Udon has a long tradition in Japan, with regional variations such as sanuki udon.",
      "flavor": "Mild wheat flavour, with a soft and springy texture.",
      "technique": "Cook the noodles separately and rinse if needed.",
      "essentials": [
        "400 g udon",
        "800 ml dashi",
        "2 tbsp soy sauce"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 2–4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "400 g udon",
          "800 ml dashi",
          "2 tbsp soy sauce",
          "2 tbsp mirin",
          "spring onions"
        ],
        "steps": [
          "Cook the noodles according to the instructions.",
          "Heat the dashi with soy sauce and mirin.",
          "Divide the noodles among bowls and pour over the broth."
        ]
      },
      "variants": [
        "Kake udon and yaki udon."
      ],
      "serving": [
        "Serve with spring onions or tempura."
      ],
      "commonMistakes": [
        "Do not leave the noodles in hot broth for a long time."
      ]
    },
    "fr": {
      "overview": "Les udon se servent dans un bouillon chaud, froides avec une sauce à tremper ou sautées.",
      "history": "Les udon ont une longue tradition au Japon, avec des variantes régionales comme les sanuki udon.",
      "flavor": "Goût doux de blé, texture souple et élastique.",
      "technique": "Cuire les nouilles séparément et les rincer si nécessaire.",
      "essentials": [
        "400 g d’udon",
        "800 ml de dashi",
        "2 c. à soupe de sauce soja"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 2–4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "400 g d’udon",
          "800 ml de dashi",
          "2 c. à soupe de sauce soja",
          "2 c. à soupe de mirin",
          "oignons nouveaux"
        ],
        "steps": [
          "Cuire les nouilles selon les instructions.",
          "Chauffer le dashi avec la sauce soja et le mirin.",
          "Répartir les nouilles dans des bols et verser le bouillon."
        ]
      },
      "variants": [
        "Kake udon et yaki udon."
      ],
      "serving": [
        "Servir avec des oignons nouveaux ou du tempura."
      ],
      "commonMistakes": [
        "Ne pas laisser longtemps les nouilles dans le bouillon chaud."
      ]
    },
    "pt": {
      "overview": "Os udon são servidos em caldo quente, frios com molho para mergulhar ou salteados.",
      "history": "Os udon têm uma longa tradição no Japão, com variantes regionais como sanuki udon.",
      "flavor": "Sabor suave a trigo, com textura macia e elástica.",
      "technique": "Coza os noodles separadamente e passe por água se necessário.",
      "essentials": [
        "400 g de udon",
        "800 ml de dashi",
        "2 c. de sopa de molho de soja"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 2–4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "400 g de udon",
          "800 ml de dashi",
          "2 c. de sopa de molho de soja",
          "2 c. de sopa de mirin",
          "cebolinho verde"
        ],
        "steps": [
          "Coza os noodles de acordo com as instruções.",
          "Aqueça o dashi com molho de soja e mirin.",
          "Distribua os noodles pelas tigelas e verta o caldo."
        ]
      },
      "variants": [
        "Kake udon e yaki udon."
      ],
      "serving": [
        "Sirva com cebolinho verde ou tempura."
      ],
      "commonMistakes": [
        "Não deixe os noodles muito tempo no caldo quente."
      ]
    },
    "es": {
      "overview": "Los udon se sirven en caldo caliente, fríos con salsa para mojar o salteados.",
      "history": "Los udon tienen una larga tradición en Japón, con variantes regionales como sanuki udon.",
      "flavor": "Sabor suave a trigo, con textura tierna y elástica.",
      "technique": "Cuece los fideos por separado y enjuágalos si es necesario.",
      "essentials": [
        "400 g de udon",
        "800 ml de dashi",
        "2 cucharadas de salsa de soja"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 2–4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "400 g de udon",
          "800 ml de dashi",
          "2 cucharadas de salsa de soja",
          "2 cucharadas de mirin",
          "cebolletas"
        ],
        "steps": [
          "Cuece los fideos según las instrucciones.",
          "Calienta el dashi con salsa de soja y mirin.",
          "Reparte los fideos en boles y vierte el caldo."
        ]
      },
      "variants": [
        "Kake udon y yaki udon."
      ],
      "serving": [
        "Sirve con cebolletas o tempura."
      ],
      "commonMistakes": [
        "No dejes los fideos mucho tiempo en el caldo caliente."
      ]
    },
    "de": {
      "overview": "Udon werden in heißer Brühe, kalt mit Dip oder gebraten serviert.",
      "history": "Udon haben in Japan eine lange Tradition, mit regionalen Varianten wie Sanuki Udon.",
      "flavor": "Milder Weizengeschmack, weiche und elastische Konsistenz.",
      "technique": "Nudeln getrennt kochen und bei Bedarf abspülen.",
      "essentials": [
        "400 g Udon",
        "800 ml Dashi",
        "2 EL Sojasauce"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 2–4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "400 g Udon",
          "800 ml Dashi",
          "2 EL Sojasauce",
          "2 EL Mirin",
          "Frühlingszwiebeln"
        ],
        "steps": [
          "Nudeln nach Anleitung kochen.",
          "Dashi mit Sojasauce und Mirin erhitzen.",
          "Nudeln auf Schalen verteilen und mit Brühe übergießen."
        ]
      },
      "variants": [
        "Kake Udon und Yaki Udon."
      ],
      "serving": [
        "Mit Frühlingszwiebeln oder Tempura servieren."
      ],
      "commonMistakes": [
        "Nudeln nicht lange in heißer Brühe stehen lassen."
      ]
    }
  },
  "dumplings": {
    "en": {
      "overview": "Chinese jiaozi often have a meat and vegetable filling.",
      "history": "Jiaozi are associated, among other things, with Chinese New Year celebrations.",
      "flavor": "Juicy filling and soft or crisp dough.",
      "technique": "Seal the edges well before boiling.",
      "essentials": [
        "24 dumpling wrappers",
        "300 g minced pork",
        "150 g Chinese cabbage"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 2–4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "24 dumpling wrappers",
          "300 g minced pork",
          "150 g Chinese cabbage",
          "ginger",
          "soy sauce"
        ],
        "steps": [
          "Finely chop the cabbage and squeeze out the liquid.",
          "Mix with the meat and seasonings.",
          "Fill the wrappers and seal the edges.",
          "Boil until the filling is cooked through."
        ]
      },
      "variants": [
        "Shuijiao and guotie."
      ],
      "serving": [
        "Serve with black vinegar and soy sauce."
      ],
      "commonMistakes": [
        "Do not overfill the wrappers."
      ]
    },
    "fr": {
      "overview": "Les jiaozi chinois contiennent souvent une farce de viande et de légumes.",
      "history": "Les jiaozi sont notamment associés aux festivités du Nouvel An chinois.",
      "flavor": "Farce juteuse et pâte tendre ou croustillante.",
      "technique": "Bien fermer les bords avant la cuisson à l’eau.",
      "essentials": [
        "24 feuilles de pâte à raviolis",
        "300 g de porc haché",
        "150 g de chou chinois"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 2–4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "24 feuilles de pâte à raviolis",
          "300 g de porc haché",
          "150 g de chou chinois",
          "gingembre",
          "sauce soja"
        ],
        "steps": [
          "Hacher finement le chou et presser pour en retirer le liquide.",
          "Mélanger avec la viande et les assaisonnements.",
          "Garnir les feuilles de pâte et souder les bords.",
          "Cuire à l’eau jusqu’à ce que la farce soit cuite à cœur."
        ]
      },
      "variants": [
        "Shuijiao et guotie."
      ],
      "serving": [
        "Servir avec du vinaigre noir et de la sauce soja."
      ],
      "commonMistakes": [
        "Ne pas trop garnir les feuilles de pâte."
      ]
    },
    "pt": {
      "overview": "Os jiaozi chineses têm frequentemente recheio de carne e legumes.",
      "history": "Os jiaozi estão associados, entre outras ocasiões, às celebrações do Ano Novo Chinês.",
      "flavor": "Recheio suculento e massa macia ou crocante.",
      "technique": "Sele bem as bordas antes de cozer em água.",
      "essentials": [
        "24 folhas de massa para dumplings",
        "300 g de carne de porco picada",
        "150 g de couve-chinesa"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 2–4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "24 folhas de massa para dumplings",
          "300 g de carne de porco picada",
          "150 g de couve-chinesa",
          "gengibre",
          "molho de soja"
        ],
        "steps": [
          "Pique finamente a couve e esprema o líquido.",
          "Misture com a carne e os temperos.",
          "Recheie as folhas de massa e sele as bordas.",
          "Coza em água até o recheio estar bem cozinhado."
        ]
      },
      "variants": [
        "Shuijiao e guotie."
      ],
      "serving": [
        "Sirva com vinagre preto e molho de soja."
      ],
      "commonMistakes": [
        "Não encha demasiado as folhas de massa."
      ]
    },
    "es": {
      "overview": "Los jiaozi chinos suelen llevar relleno de carne y verduras.",
      "history": "Los jiaozi se asocian, entre otras ocasiones, con las celebraciones del Año Nuevo chino.",
      "flavor": "Relleno jugoso y masa suave o crujiente.",
      "technique": "Sella bien los bordes antes de hervir.",
      "essentials": [
        "24 obleas para dumplings",
        "300 g de carne de cerdo picada",
        "150 g de col china"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 2–4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "24 obleas para dumplings",
          "300 g de carne de cerdo picada",
          "150 g de col china",
          "jengibre",
          "salsa de soja"
        ],
        "steps": [
          "Pica finamente la col y exprime el líquido.",
          "Mezcla con la carne y los condimentos.",
          "Rellena las obleas y sella los bordes.",
          "Hierve hasta que el relleno esté hecho por dentro."
        ]
      },
      "variants": [
        "Shuijiao y guotie."
      ],
      "serving": [
        "Sirve con vinagre negro y salsa de soja."
      ],
      "commonMistakes": [
        "No rellenes demasiado las obleas."
      ]
    },
    "de": {
      "overview": "Chinesische Jiaozi haben oft eine Fleisch-Gemüse-Füllung.",
      "history": "Jiaozi werden unter anderem mit dem chinesischen Neujahrsfest verbunden.",
      "flavor": "Saftige Füllung und weicher oder knuspriger Teig.",
      "technique": "Ränder vor dem Kochen gut verschließen.",
      "essentials": [
        "24 Teigblätter für Teigtaschen",
        "300 g Schweinehackfleisch",
        "150 g Chinakohl"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 2–4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "24 Teigblätter für Teigtaschen",
          "300 g Schweinehackfleisch",
          "150 g Chinakohl",
          "Ingwer",
          "Sojasauce"
        ],
        "steps": [
          "Kohl fein hacken und Flüssigkeit ausdrücken.",
          "Mit Fleisch und Gewürzen mischen.",
          "Teigblätter füllen und Ränder verschließen.",
          "Kochen, bis die Füllung vollständig durchgegart ist."
        ]
      },
      "variants": [
        "Shuijiao und Guotie."
      ],
      "serving": [
        "Mit schwarzem Essig und Sojasauce servieren."
      ],
      "commonMistakes": [
        "Teigblätter nicht überfüllen."
      ]
    }
  },
  "pad-kra-pao": {
    "en": {
      "overview": "Minced meat is quickly stir-fried with aromatics and sauce.",
      "history": "The dish is widespread in everyday Thai cooking and street food.",
      "flavor": "Hot, salty and herbal.",
      "technique": "Use high heat and add the basil towards the end.",
      "essentials": [
        "400 g minced meat",
        "4 garlic cloves",
        "chilli to taste"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 2–4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "400 g minced meat",
          "4 garlic cloves",
          "chilli to taste",
          "holy basil",
          "1 tbsp fish sauce",
          "1 tbsp oyster sauce",
          "rice"
        ],
        "steps": [
          "Briefly fry the chopped garlic and chilli.",
          "Add the meat and cook through.",
          "Season with the sauces.",
          "Fold in the basil just before serving."
        ]
      },
      "variants": [
        "Versions with chicken, pork or tofu."
      ],
      "serving": [
        "Serve with rice and, if desired, a fried egg."
      ],
      "commonMistakes": [
        "Do not confuse holy basil with ordinary sweet basil."
      ]
    },
    "fr": {
      "overview": "La viande hachée est rapidement sautée avec des aromates et de la sauce.",
      "history": "Ce plat est très répandu dans la cuisine quotidienne et la cuisine de rue thaïlandaises.",
      "flavor": "Piquant, salé et herbacé.",
      "technique": "Cuire à feu vif et ajouter le basilic en fin de cuisson.",
      "essentials": [
        "400 g de viande hachée",
        "4 gousses d’ail",
        "piment selon le goût"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 2–4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "400 g de viande hachée",
          "4 gousses d’ail",
          "piment selon le goût",
          "basilic sacré",
          "1 c. à soupe de sauce de poisson",
          "1 c. à soupe de sauce d’huître",
          "riz"
        ],
        "steps": [
          "Faire revenir brièvement l’ail et le piment hachés.",
          "Ajouter la viande et cuire à cœur.",
          "Assaisonner avec les sauces.",
          "Incorporer le basilic juste avant de servir."
        ]
      },
      "variants": [
        "Variantes au poulet, au porc ou au tofu."
      ],
      "serving": [
        "Servir avec du riz et éventuellement un œuf au plat."
      ],
      "commonMistakes": [
        "Ne pas confondre le basilic sacré avec le basilic doux ordinaire."
      ]
    },
    "pt": {
      "overview": "A carne picada é rapidamente salteada com aromáticos e molho.",
      "history": "O prato é muito comum na cozinha quotidiana e na comida de rua tailandesas.",
      "flavor": "Picante, salgado e herbáceo.",
      "technique": "Cozinhe em lume forte e junte o manjericão perto do fim.",
      "essentials": [
        "400 g de carne picada",
        "4 dentes de alho",
        "malagueta a gosto"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 2–4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "400 g de carne picada",
          "4 dentes de alho",
          "malagueta a gosto",
          "manjericão-sagrado",
          "1 c. de sopa de molho de peixe",
          "1 c. de sopa de molho de ostras",
          "arroz"
        ],
        "steps": [
          "Salteie rapidamente o alho e a malagueta picados.",
          "Junte a carne e cozinhe completamente.",
          "Tempere com os molhos.",
          "Envolva o manjericão imediatamente antes de servir."
        ]
      },
      "variants": [
        "Variantes com frango, porco ou tofu."
      ],
      "serving": [
        "Sirva com arroz e, se desejar, um ovo estrelado."
      ],
      "commonMistakes": [
        "Não confunda o manjericão-sagrado com o manjericão comum."
      ]
    },
    "es": {
      "overview": "La carne picada se saltea rápidamente con aromáticos y salsa.",
      "history": "El plato es muy común en la cocina cotidiana y callejera tailandesa.",
      "flavor": "Picante, salado y herbáceo.",
      "technique": "Cocina a fuego fuerte y añade la albahaca hacia el final.",
      "essentials": [
        "400 g de carne picada",
        "4 dientes de ajo",
        "chile al gusto"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 2–4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "400 g de carne picada",
          "4 dientes de ajo",
          "chile al gusto",
          "albahaca sagrada",
          "1 cucharada de salsa de pescado",
          "1 cucharada de salsa de ostras",
          "arroz"
        ],
        "steps": [
          "Sofríe brevemente el ajo y el chile picados.",
          "Añade la carne y cocina por completo.",
          "Sazona con las salsas.",
          "Incorpora la albahaca justo antes de servir."
        ]
      },
      "variants": [
        "Variantes con pollo, cerdo o tofu."
      ],
      "serving": [
        "Sirve con arroz y, si quieres, un huevo frito."
      ],
      "commonMistakes": [
        "No confundas la albahaca sagrada con la albahaca dulce común."
      ]
    },
    "de": {
      "overview": "Hackfleisch wird mit Aromaten und Sauce kurz und heiß angebraten.",
      "history": "Das Gericht ist in der thailändischen Alltagsküche und beim Streetfood weit verbreitet.",
      "flavor": "Scharf, salzig und kräuterbetont.",
      "technique": "Bei hoher Hitze braten und Basilikum gegen Ende zugeben.",
      "essentials": [
        "400 g Hackfleisch",
        "4 Knoblauchzehen",
        "Chili nach Geschmack"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 2–4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "400 g Hackfleisch",
          "4 Knoblauchzehen",
          "Chili nach Geschmack",
          "Heiliges Basilikum",
          "1 EL Fischsauce",
          "1 EL Austernsauce",
          "Reis"
        ],
        "steps": [
          "Gehackten Knoblauch und Chili kurz anbraten.",
          "Fleisch hinzufügen und vollständig durchgaren.",
          "Mit den Saucen abschmecken.",
          "Basilikum unmittelbar vor dem Servieren unterheben."
        ]
      },
      "variants": [
        "Varianten mit Hähnchen, Schweinefleisch oder Tofu."
      ],
      "serving": [
        "Mit Reis und nach Wunsch einem Spiegelei servieren."
      ],
      "commonMistakes": [
        "Heiliges Basilikum nicht mit gewöhnlichem süßem Basilikum verwechseln."
      ]
    }
  },
  "bun-cha": {
    "en": {
      "overview": "Grilled meat is served with a sweet-and-sour fish sauce mixture.",
      "history": "Bún chả is especially associated with Hanoi.",
      "flavor": "Smoky, sweet-and-sour and fresh.",
      "technique": "Grill the meat in small batches.",
      "essentials": [
        "400 g pork",
        "200 g rice noodles",
        "fish sauce"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 2–4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "400 g pork",
          "200 g rice noodles",
          "fish sauce",
          "lime",
          "sugar",
          "garlic",
          "fresh herbs"
        ],
        "steps": [
          "Marinate the meat with fish sauce, garlic and a little sugar.",
          "Grill until cooked through.",
          "Cook the noodles.",
          "Mix fish sauce, lime, water and sugar to make the dipping sauce."
        ]
      },
      "variants": [
        "Meatballs and slices of pork can be combined."
      ],
      "serving": [
        "Serve the noodles, herbs and meat with the dipping sauce."
      ],
      "commonMistakes": [
        "Do not make the fish sauce mixture too concentrated."
      ]
    },
    "fr": {
      "overview": "La viande grillée est servie avec un mélange aigre-doux à base de sauce de poisson.",
      "history": "Le bún chả est particulièrement associé à Hanoï.",
      "flavor": "Fumé, aigre-doux et frais.",
      "technique": "Griller la viande par petites quantités.",
      "essentials": [
        "400 g de porc",
        "200 g de nouilles de riz",
        "sauce de poisson"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 2–4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "400 g de porc",
          "200 g de nouilles de riz",
          "sauce de poisson",
          "citron vert",
          "sucre",
          "ail",
          "herbes fraîches"
        ],
        "steps": [
          "Faire mariner la viande avec la sauce de poisson, l’ail et un peu de sucre.",
          "Griller jusqu’à cuisson complète.",
          "Cuire les nouilles.",
          "Mélanger sauce de poisson, citron vert, eau et sucre pour préparer la sauce à tremper."
        ]
      },
      "variants": [
        "On peut associer des boulettes de viande et des tranches de porc."
      ],
      "serving": [
        "Servir les nouilles, les herbes et la viande avec la sauce à tremper."
      ],
      "commonMistakes": [
        "Ne pas préparer une sauce à tremper trop concentrée en sauce de poisson."
      ]
    },
    "pt": {
      "overview": "A carne grelhada é servida com uma mistura agridoce de molho de peixe.",
      "history": "O bún chả está especialmente associado a Hanói.",
      "flavor": "Fumado, agridoce e fresco.",
      "technique": "Grelhe a carne em pequenas porções.",
      "essentials": [
        "400 g de carne de porco",
        "200 g de noodles de arroz",
        "molho de peixe"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 2–4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "400 g de carne de porco",
          "200 g de noodles de arroz",
          "molho de peixe",
          "lima",
          "açúcar",
          "alho",
          "ervas frescas"
        ],
        "steps": [
          "Marine a carne com molho de peixe, alho e um pouco de açúcar.",
          "Grelhe até estar bem cozinhada.",
          "Coza os noodles.",
          "Misture molho de peixe, lima, água e açúcar para preparar o molho para mergulhar."
        ]
      },
      "variants": [
        "Podem combinar-se almôndegas e fatias de carne de porco."
      ],
      "serving": [
        "Sirva os noodles, as ervas e a carne com o molho para mergulhar."
      ],
      "commonMistakes": [
        "Não use molho de peixe demasiado concentrado no molho para mergulhar."
      ]
    },
    "es": {
      "overview": "La carne a la parrilla se sirve con una mezcla agridulce de salsa de pescado.",
      "history": "El bún chả se asocia especialmente con Hanói.",
      "flavor": "Ahumado, agridulce y fresco.",
      "technique": "Asa la carne en tandas pequeñas.",
      "essentials": [
        "400 g de carne de cerdo",
        "200 g de fideos de arroz",
        "salsa de pescado"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 2–4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "400 g de carne de cerdo",
          "200 g de fideos de arroz",
          "salsa de pescado",
          "lima",
          "azúcar",
          "ajo",
          "hierbas frescas"
        ],
        "steps": [
          "Marina la carne con salsa de pescado, ajo y un poco de azúcar.",
          "Asa hasta que esté hecha por dentro.",
          "Cuece los fideos.",
          "Mezcla salsa de pescado, lima, agua y azúcar para preparar la salsa para mojar."
        ]
      },
      "variants": [
        "Se pueden combinar albóndigas y láminas de cerdo."
      ],
      "serving": [
        "Sirve los fideos, las hierbas y la carne con la salsa para mojar."
      ],
      "commonMistakes": [
        "No uses una mezcla demasiado concentrada de salsa de pescado."
      ]
    },
    "de": {
      "overview": "Gegrilltes Fleisch wird mit einer süßsauren Fischsaucenmischung serviert.",
      "history": "Bún chả ist besonders mit Hanoi verbunden.",
      "flavor": "Rauchig, süßsauer und frisch.",
      "technique": "Fleisch in kleinen Portionen grillen.",
      "essentials": [
        "400 g Schweinefleisch",
        "200 g Reisnudeln",
        "Fischsauce"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 2–4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "400 g Schweinefleisch",
          "200 g Reisnudeln",
          "Fischsauce",
          "Limette",
          "Zucker",
          "Knoblauch",
          "frische Kräuter"
        ],
        "steps": [
          "Fleisch mit Fischsauce, Knoblauch und etwas Zucker marinieren.",
          "Vollständig durchgrillen.",
          "Nudeln kochen.",
          "Fischsauce, Limette, Wasser und Zucker zu einem Dip mischen."
        ]
      },
      "variants": [
        "Fleischbällchen und Schweinefleischscheiben lassen sich kombinieren."
      ],
      "serving": [
        "Nudeln, Kräuter und Fleisch mit dem Dip servieren."
      ],
      "commonMistakes": [
        "Den Dip nicht mit zu konzentrierter Fischsauce zubereiten."
      ]
    }
  },
  "vietnamese-spring-rolls": {
    "en": {
      "overview": "Gỏi cuốn are often filled with rice noodles, prawns, herbs and lettuce.",
      "history": "Fresh rice paper rolls are a familiar part of Vietnamese food culture.",
      "flavor": "Fresh and soft, with crunch from the vegetables.",
      "technique": "Moisten the rice paper briefly and roll tightly.",
      "essentials": [
        "12 rice paper sheets",
        "200 g cooked prawns",
        "100 g rice noodles"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 2–4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "12 rice paper sheets",
          "200 g cooked prawns",
          "100 g rice noodles",
          "lettuce",
          "mint",
          "cucumber"
        ],
        "steps": [
          "Cook and cool the noodles.",
          "Cut the vegetables.",
          "Moisten one sheet of rice paper at a time.",
          "Add the filling and roll up."
        ]
      },
      "variants": [
        "Tofu or cooked pork can be used as filling."
      ],
      "serving": [
        "Serve with peanut sauce or a fish sauce-based dip."
      ],
      "commonMistakes": [
        "Do not soak the rice paper for too long."
      ]
    },
    "fr": {
      "overview": "Les gỏi cuốn sont souvent garnis de nouilles de riz, de crevettes, d’herbes et de laitue.",
      "history": "Les rouleaux frais en feuilles de riz font partie de la culture culinaire vietnamienne.",
      "flavor": "Frais et tendres, avec le croquant des légumes.",
      "technique": "Humidifier brièvement la feuille de riz et rouler bien serré.",
      "essentials": [
        "12 feuilles de riz",
        "200 g de crevettes cuites",
        "100 g de nouilles de riz"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 2–4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "12 feuilles de riz",
          "200 g de crevettes cuites",
          "100 g de nouilles de riz",
          "laitue",
          "menthe",
          "concombre"
        ],
        "steps": [
          "Cuire puis refroidir les nouilles.",
          "Couper les légumes.",
          "Humidifier les feuilles de riz une par une.",
          "Disposer la garniture et rouler."
        ]
      },
      "variants": [
        "Le tofu ou le porc cuit peuvent servir de garniture."
      ],
      "serving": [
        "Servir avec une sauce aux cacahuètes ou une sauce à tremper à base de sauce de poisson."
      ],
      "commonMistakes": [
        "Ne pas laisser tremper trop longtemps les feuilles de riz."
      ]
    },
    "pt": {
      "overview": "Os gỏi cuốn são muitas vezes recheados com noodles de arroz, camarão, ervas e alface.",
      "history": "Os rolinhos frescos de papel de arroz são uma parte conhecida da cultura gastronómica vietnamita.",
      "flavor": "Frescos e macios, com o crocante dos legumes.",
      "technique": "Humedeça brevemente o papel de arroz e enrole firmemente.",
      "essentials": [
        "12 folhas de papel de arroz",
        "200 g de camarão cozido",
        "100 g de noodles de arroz"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 2–4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "12 folhas de papel de arroz",
          "200 g de camarão cozido",
          "100 g de noodles de arroz",
          "alface",
          "hortelã",
          "pepino"
        ],
        "steps": [
          "Coza e arrefeça os noodles.",
          "Corte os legumes.",
          "Humedeça uma folha de papel de arroz de cada vez.",
          "Coloque o recheio e enrole."
        ]
      },
      "variants": [
        "Pode usar tofu ou carne de porco cozinhada como recheio."
      ],
      "serving": [
        "Sirva com molho de amendoim ou um molho à base de molho de peixe."
      ],
      "commonMistakes": [
        "Não deixe o papel de arroz de molho demasiado tempo."
      ]
    },
    "es": {
      "overview": "Los gỏi cuốn suelen rellenarse de fideos de arroz, gambas, hierbas y lechuga.",
      "history": "Los rollitos frescos de papel de arroz forman parte de la cultura culinaria vietnamita.",
      "flavor": "Frescos y suaves, con el toque crujiente de las verduras.",
      "technique": "Humedece brevemente el papel de arroz y enrolla bien apretado.",
      "essentials": [
        "12 hojas de papel de arroz",
        "200 g de gambas cocidas",
        "100 g de fideos de arroz"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 2–4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "12 hojas de papel de arroz",
          "200 g de gambas cocidas",
          "100 g de fideos de arroz",
          "lechuga",
          "menta",
          "pepino"
        ],
        "steps": [
          "Cuece y enfría los fideos.",
          "Corta las verduras.",
          "Humedece una hoja de papel de arroz cada vez.",
          "Coloca el relleno y enrolla."
        ]
      },
      "variants": [
        "Se puede utilizar tofu o cerdo cocido como relleno."
      ],
      "serving": [
        "Sirve con salsa de cacahuete o una salsa para mojar a base de salsa de pescado."
      ],
      "commonMistakes": [
        "No dejes el papel de arroz en remojo demasiado tiempo."
      ]
    },
    "de": {
      "overview": "Gỏi cuốn werden oft mit Reisnudeln, Garnelen, Kräutern und Salat gefüllt.",
      "history": "Frische Reispapierrollen sind ein bekannter Bestandteil der vietnamesischen Esskultur.",
      "flavor": "Frisch und weich, mit knackigem Gemüse.",
      "technique": "Reispapier kurz anfeuchten und fest aufrollen.",
      "essentials": [
        "12 Reispapierblätter",
        "200 g gegarte Garnelen",
        "100 g Reisnudeln"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 2–4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "12 Reispapierblätter",
          "200 g gegarte Garnelen",
          "100 g Reisnudeln",
          "Salat",
          "Minze",
          "Gurke"
        ],
        "steps": [
          "Nudeln kochen und abkühlen lassen.",
          "Gemüse schneiden.",
          "Reispapierblätter einzeln anfeuchten.",
          "Füllung darauflegen und aufrollen."
        ]
      },
      "variants": [
        "Tofu oder gegartes Schweinefleisch können als Füllung dienen."
      ],
      "serving": [
        "Mit Erdnusssauce oder einem Dip auf Fischsaucenbasis servieren."
      ],
      "commonMistakes": [
        "Reispapier nicht zu lange einweichen."
      ]
    }
  },
  "pizza-marinara": {
    "en": {
      "overview": "A simple tomato pizza in which the dough and ingredients take centre stage.",
      "history": "Marinara belongs to the classic Neapolitan pizza tradition.",
      "flavor": "Fruity tomato, garlic and toasted dough.",
      "technique": "Bake on a very hot pizza stone or steel.",
      "essentials": [
        "500 g pizza dough",
        "250 g crushed tomatoes",
        "2 garlic cloves"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 2–4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "500 g pizza dough",
          "250 g crushed tomatoes",
          "2 garlic cloves",
          "oregano",
          "olive oil"
        ],
        "steps": [
          "Divide and shape the dough.",
          "Spread the tomatoes, garlic and oregano over the dough.",
          "Drizzle with oil.",
          "Bake on preheated pizza steel at the oven’s highest temperature until done."
        ]
      },
      "variants": [
        "The type of tomato and amount of garlic vary."
      ],
      "serving": [
        "Serve immediately after baking."
      ],
      "commonMistakes": [
        "Do not add too much wet sauce."
      ]
    },
    "fr": {
      "overview": "Une pizza simple à la tomate qui met en valeur la pâte et les ingrédients.",
      "history": "La marinara appartient à la tradition classique de la pizza napolitaine.",
      "flavor": "Tomate fruitée, ail et pâte grillée.",
      "technique": "Cuire sur une pierre ou une plaque d’acier à pizza très chaude.",
      "essentials": [
        "500 g de pâte à pizza",
        "250 g de tomates concassées",
        "2 gousses d’ail"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 2–4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "500 g de pâte à pizza",
          "250 g de tomates concassées",
          "2 gousses d’ail",
          "origan",
          "huile d’olive"
        ],
        "steps": [
          "Diviser et façonner la pâte.",
          "Répartir les tomates, l’ail et l’origan sur la pâte.",
          "Arroser d’un filet d’huile.",
          "Cuire sur une plaque d’acier à pizza préchauffée à la température maximale du four jusqu’à cuisson complète."
        ]
      },
      "variants": [
        "Le type de tomate et la quantité d’ail varient."
      ],
      "serving": [
        "Servir dès la sortie du four."
      ],
      "commonMistakes": [
        "Ne pas mettre trop de sauce liquide."
      ]
    },
    "pt": {
      "overview": "Uma pizza simples de tomate em que a massa e os ingredientes são o centro das atenções.",
      "history": "A marinara pertence à tradição clássica da pizza napolitana.",
      "flavor": "Tomate frutado, alho e massa tostada.",
      "technique": "Coza sobre uma pedra ou placa de aço para pizza muito quente.",
      "essentials": [
        "500 g de massa de pizza",
        "250 g de tomate triturado",
        "2 dentes de alho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 2–4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "500 g de massa de pizza",
          "250 g de tomate triturado",
          "2 dentes de alho",
          "orégãos",
          "azeite"
        ],
        "steps": [
          "Divida e molde a massa.",
          "Distribua o tomate, o alho e os orégãos pela massa.",
          "Regue com um fio de azeite.",
          "Coza sobre uma placa de aço para pizza pré-aquecida à temperatura máxima do forno até estar pronta."
        ]
      },
      "variants": [
        "O tipo de tomate e a quantidade de alho variam."
      ],
      "serving": [
        "Sirva imediatamente após a cozedura."
      ],
      "commonMistakes": [
        "Não coloque demasiado molho líquido."
      ]
    },
    "es": {
      "overview": "Una pizza sencilla de tomate en la que destacan la masa y los ingredientes.",
      "history": "La marinara pertenece a la tradición clásica de la pizza napolitana.",
      "flavor": "Tomate afrutado, ajo y masa tostada.",
      "technique": "Hornea sobre una piedra o plancha de acero para pizza muy caliente.",
      "essentials": [
        "500 g de masa de pizza",
        "250 g de tomate triturado",
        "2 dientes de ajo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 2–4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "500 g de masa de pizza",
          "250 g de tomate triturado",
          "2 dientes de ajo",
          "orégano",
          "aceite de oliva"
        ],
        "steps": [
          "Divide y da forma a la masa.",
          "Reparte el tomate, el ajo y el orégano sobre la masa.",
          "Rocía con un hilo de aceite.",
          "Hornea sobre una plancha de acero precalentada a la temperatura máxima del horno hasta que esté hecha."
        ]
      },
      "variants": [
        "El tipo de tomate y la cantidad de ajo varían."
      ],
      "serving": [
        "Sirve inmediatamente después de hornear."
      ],
      "commonMistakes": [
        "No añadas demasiada salsa líquida."
      ]
    },
    "de": {
      "overview": "Eine einfache Tomatenpizza, bei der Teig und Zutaten im Mittelpunkt stehen.",
      "history": "Marinara gehört zur klassischen neapolitanischen Pizzatradition.",
      "flavor": "Fruchtige Tomaten, Knoblauch und gerösteter Teig.",
      "technique": "Auf einem sehr heißen Pizzastein oder Backstahl backen.",
      "essentials": [
        "500 g Pizzateig",
        "250 g zerkleinerte Tomaten",
        "2 Knoblauchzehen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 2–4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "500 g Pizzateig",
          "250 g zerkleinerte Tomaten",
          "2 Knoblauchzehen",
          "Oregano",
          "Olivenöl"
        ],
        "steps": [
          "Teig teilen und formen.",
          "Tomaten, Knoblauch und Oregano darauf verteilen.",
          "Mit Öl beträufeln.",
          "Auf vorgeheiztem Backstahl bei höchster Ofentemperatur fertig backen."
        ]
      },
      "variants": [
        "Tomatensorte und Knoblauchmenge variieren."
      ],
      "serving": [
        "Sofort nach dem Backen servieren."
      ],
      "commonMistakes": [
        "Nicht zu viel feuchte Sauce auftragen."
      ]
    }
  },
  "peking-duck": {
    "en": {
      "overview": "The skin is dried before roasting to achieve a crisp surface.",
      "history": "Peking duck is particularly linked to Beijing’s restaurant tradition.",
      "flavor": "Rich duck meat, crisp skin and sweetish sauce.",
      "technique": "Dry the duck uncovered in the refrigerator and roast on a rack.",
      "essentials": [
        "1 whole duck",
        "salt",
        "thin Chinese pancakes"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 2–3 hours + overnight drying",
        "ingredients": [
          "1 whole duck",
          "salt",
          "thin Chinese pancakes",
          "cucumber",
          "spring onions",
          "sweet bean sauce"
        ],
        "steps": [
          "Dry the duck well and salt it.",
          "Leave uncovered in the refrigerator overnight.",
          "Roast on a rack at 180 °C until cooked through, at least 74 °C in the thickest part.",
          "Slice the meat and serve with pancakes and accompaniments."
        ]
      },
      "variants": [
        "The home version simplifies the traditional oven technique."
      ],
      "serving": [
        "Serve with cucumber, spring onions and sweet bean sauce."
      ],
      "commonMistakes": [
        "Do not cover the crisp skin so that steam softens it."
      ]
    },
    "fr": {
      "overview": "La peau est séchée avant la cuisson pour obtenir une surface croustillante.",
      "history": "Le canard laqué de Pékin est particulièrement lié à la tradition des restaurants pékinois.",
      "flavor": "Chair de canard savoureuse, peau croustillante et sauce légèrement sucrée.",
      "technique": "Faire sécher le canard à découvert au réfrigérateur et le rôtir sur une grille.",
      "essentials": [
        "1 canard entier",
        "sel",
        "fines crêpes chinoises"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 2–3 heures + séchage toute la nuit",
        "ingredients": [
          "1 canard entier",
          "sel",
          "fines crêpes chinoises",
          "concombre",
          "oignons nouveaux",
          "sauce sucrée aux haricots"
        ],
        "steps": [
          "Bien sécher le canard et le saler.",
          "Laisser à découvert au réfrigérateur toute la nuit.",
          "Rôtir sur une grille à 180 °C jusqu’à cuisson complète, au moins 74 °C dans la partie la plus épaisse.",
          "Découper la viande et servir avec les crêpes et les accompagnements."
        ]
      },
      "variants": [
        "La version maison simplifie la technique traditionnelle de cuisson au four."
      ],
      "serving": [
        "Servir avec concombre, oignons nouveaux et sauce sucrée aux haricots."
      ],
      "commonMistakes": [
        "Ne pas couvrir la peau croustillante au risque de la ramollir avec la vapeur."
      ]
    },
    "pt": {
      "overview": "A pele é seca antes de assar para obter uma superfície crocante.",
      "history": "O pato à Pequim está especialmente ligado à tradição dos restaurantes de Pequim.",
      "flavor": "Carne de pato rica, pele crocante e molho ligeiramente doce.",
      "technique": "Seque o pato destapado no frigorífico e asse sobre uma grelha.",
      "essentials": [
        "1 pato inteiro",
        "sal",
        "panquecas chinesas finas"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 2–3 horas + secagem durante a noite",
        "ingredients": [
          "1 pato inteiro",
          "sal",
          "panquecas chinesas finas",
          "pepino",
          "cebolinho verde",
          "molho doce de feijão"
        ],
        "steps": [
          "Seque bem o pato e tempere com sal.",
          "Deixe destapado no frigorífico durante a noite.",
          "Asse sobre uma grelha a 180 °C até estar bem cozinhado, pelo menos 74 °C na parte mais espessa.",
          "Corte a carne e sirva com panquecas e acompanhamentos."
        ]
      },
      "variants": [
        "A versão caseira simplifica a técnica tradicional de assadura."
      ],
      "serving": [
        "Sirva com pepino, cebolinho verde e molho doce de feijão."
      ],
      "commonMistakes": [
        "Não tape a pele crocante, para que o vapor não a amoleça."
      ]
    },
    "es": {
      "overview": "La piel se seca antes de asar para conseguir una superficie crujiente.",
      "history": "El pato laqueado de Pekín está especialmente ligado a la tradición de los restaurantes de Pekín.",
      "flavor": "Carne de pato sabrosa, piel crujiente y salsa ligeramente dulce.",
      "technique": "Seca el pato destapado en el frigorífico y ásalo sobre una rejilla.",
      "essentials": [
        "1 pato entero",
        "sal",
        "tortitas chinas finas"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 2–3 horas + secado durante la noche",
        "ingredients": [
          "1 pato entero",
          "sal",
          "tortitas chinas finas",
          "pepino",
          "cebolletas",
          "salsa dulce de judías"
        ],
        "steps": [
          "Seca bien el pato y sálalo.",
          "Deja destapado en el frigorífico durante la noche.",
          "Asa sobre una rejilla a 180 °C hasta que esté hecho por dentro, al menos 74 °C en la parte más gruesa.",
          "Corta la carne y sirve con las tortitas y los acompañamientos."
        ]
      },
      "variants": [
        "La versión casera simplifica la técnica tradicional de asado."
      ],
      "serving": [
        "Sirve con pepino, cebolletas y salsa dulce de judías."
      ],
      "commonMistakes": [
        "No tapes la piel crujiente para evitar que el vapor la ablande."
      ]
    },
    "de": {
      "overview": "Die Haut wird vor dem Braten getrocknet, damit sie knusprig wird.",
      "history": "Pekingente ist besonders mit der Pekinger Restauranttradition verbunden.",
      "flavor": "Kräftiges Entenfleisch, knusprige Haut und süßliche Sauce.",
      "technique": "Ente unbedeckt im Kühlschrank trocknen und auf einem Rost braten.",
      "essentials": [
        "1 ganze Ente",
        "Salz",
        "dünne chinesische Pfannkuchen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 2–3 Stunden + Trocknen über Nacht",
        "ingredients": [
          "1 ganze Ente",
          "Salz",
          "dünne chinesische Pfannkuchen",
          "Gurke",
          "Frühlingszwiebeln",
          "süße Bohnensauce"
        ],
        "steps": [
          "Ente gut abtrocknen und salzen.",
          "Über Nacht unbedeckt im Kühlschrank lassen.",
          "Auf einem Rost bei 180 °C vollständig durchgaren, mindestens 74 °C an der dicksten Stelle.",
          "Fleisch aufschneiden und mit Pfannkuchen und Beilagen servieren."
        ]
      },
      "variants": [
        "Die Hausvariante vereinfacht die traditionelle Ofentechnik."
      ],
      "serving": [
        "Mit Gurke, Frühlingszwiebeln und süßer Bohnensauce servieren."
      ],
      "commonMistakes": [
        "Knusprige Haut nicht abdecken, damit sie durch Dampf nicht weich wird."
      ]
    }
  },
  "dan-dan-noodles": {
    "en": {
      "overview": "Wheat noodles are mixed with a concentrated sauce and often fried minced meat.",
      "history": "The dish is associated with Sichuan street food and noodle traditions.",
      "flavor": "Hot, salty, nutty and slightly numbing from Sichuan pepper.",
      "technique": "Mix the sauce in the bowl before adding the hot noodles.",
      "essentials": [
        "300 g wheat noodles",
        "200 g minced pork",
        "2 tbsp chilli oil"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "300 g wheat noodles",
          "200 g minced pork",
          "2 tbsp chilli oil",
          "2 tbsp sesame paste",
          "soy sauce",
          "Sichuan pepper",
          "pickled mustard greens"
        ],
        "steps": [
          "Fry the minced meat with chopped mustard greens until cooked through.",
          "Mix chilli oil, sesame paste, soy sauce and Sichuan pepper.",
          "Cook the noodles and reserve a little cooking water.",
          "Divide the sauce, noodles and meat among bowls."
        ]
      },
      "variants": [
        "Versions with more broth or without meat."
      ],
      "serving": [
        "Serve with spring onions and mix before eating."
      ],
      "commonMistakes": [
        "Avoid adding so much sesame paste that it overwhelms the chilli and spices."
      ]
    },
    "fr": {
      "overview": "Les nouilles de blé sont mélangées à une sauce concentrée et souvent à de la viande hachée sautée.",
      "history": "Ce plat est associé à la cuisine de rue et aux traditions de nouilles du Sichuan.",
      "flavor": "Piquant, salé, aux notes de noix et légèrement anesthésiant grâce au poivre du Sichuan.",
      "technique": "Mélanger la sauce dans le bol avant d’ajouter les nouilles chaudes.",
      "essentials": [
        "300 g de nouilles de blé",
        "200 g de porc haché",
        "2 c. à soupe d’huile pimentée"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "300 g de nouilles de blé",
          "200 g de porc haché",
          "2 c. à soupe d’huile pimentée",
          "2 c. à soupe de pâte de sésame",
          "sauce soja",
          "poivre du Sichuan",
          "feuilles de moutarde marinées"
        ],
        "steps": [
          "Faire revenir la viande hachée avec les feuilles de moutarde hachées jusqu’à cuisson complète.",
          "Mélanger l’huile pimentée, la pâte de sésame, la sauce soja et le poivre du Sichuan.",
          "Cuire les nouilles et réserver un peu d’eau de cuisson.",
          "Répartir la sauce, les nouilles et la viande dans les bols."
        ]
      },
      "variants": [
        "Variantes avec davantage de bouillon ou sans viande."
      ],
      "serving": [
        "Servir avec des oignons nouveaux et mélanger avant de manger."
      ],
      "commonMistakes": [
        "Éviter de mettre tant de pâte de sésame qu’elle masque le piment et les épices."
      ]
    },
    "pt": {
      "overview": "Os noodles de trigo são misturados com um molho concentrado e frequentemente carne picada salteada.",
      "history": "O prato está associado à comida de rua e às tradições de noodles de Sichuan.",
      "flavor": "Picante, salgado, com notas de frutos secos e ligeiramente adormecedor devido à pimenta de Sichuan.",
      "technique": "Misture o molho na tigela antes de juntar os noodles quentes.",
      "essentials": [
        "300 g de noodles de trigo",
        "200 g de carne de porco picada",
        "2 c. de sopa de óleo de malagueta"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "300 g de noodles de trigo",
          "200 g de carne de porco picada",
          "2 c. de sopa de óleo de malagueta",
          "2 c. de sopa de pasta de sésamo",
          "molho de soja",
          "pimenta de Sichuan",
          "folhas de mostarda em conserva"
        ],
        "steps": [
          "Salteie a carne picada com as folhas de mostarda picadas até estar bem cozinhada.",
          "Misture óleo de malagueta, pasta de sésamo, molho de soja e pimenta de Sichuan.",
          "Coza os noodles e reserve um pouco da água da cozedura.",
          "Distribua o molho, os noodles e a carne pelas tigelas."
        ]
      },
      "variants": [
        "Variantes com mais caldo ou sem carne."
      ],
      "serving": [
        "Sirva com cebolinho verde e misture antes de comer."
      ],
      "commonMistakes": [
        "Evite usar tanta pasta de sésamo que se sobreponha à malagueta e às especiarias."
      ]
    },
    "es": {
      "overview": "Los fideos de trigo se mezclan con una salsa concentrada y a menudo carne picada salteada.",
      "history": "El plato se asocia con la comida callejera y la tradición de fideos de Sichuan.",
      "flavor": "Picante, salado, con notas de frutos secos y un ligero efecto adormecedor de la pimienta de Sichuan.",
      "technique": "Mezcla la salsa en el bol antes de añadir los fideos calientes.",
      "essentials": [
        "300 g de fideos de trigo",
        "200 g de carne de cerdo picada",
        "2 cucharadas de aceite de chile"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "300 g de fideos de trigo",
          "200 g de carne de cerdo picada",
          "2 cucharadas de aceite de chile",
          "2 cucharadas de pasta de sésamo",
          "salsa de soja",
          "pimienta de Sichuan",
          "hojas de mostaza encurtidas"
        ],
        "steps": [
          "Saltea la carne picada con las hojas de mostaza picadas hasta que esté hecha por dentro.",
          "Mezcla el aceite de chile, la pasta de sésamo, la salsa de soja y la pimienta de Sichuan.",
          "Cuece los fideos y reserva un poco del agua de cocción.",
          "Reparte la salsa, los fideos y la carne en boles."
        ]
      },
      "variants": [
        "Variantes con más caldo o sin carne."
      ],
      "serving": [
        "Sirve con cebolletas y mezcla antes de comer."
      ],
      "commonMistakes": [
        "Evita añadir tanta pasta de sésamo que enmascare el chile y las especias."
      ]
    },
    "de": {
      "overview": "Weizennudeln werden mit einer konzentrierten Sauce und häufig gebratenem Hackfleisch vermischt.",
      "history": "Das Gericht ist mit Sichuans Streetfood und Nudeltraditionen verbunden.",
      "flavor": "Scharf, salzig, nussig und durch Sichuanpfeffer leicht betäubend.",
      "technique": "Sauce in der Schale mischen, bevor die heißen Nudeln hinzukommen.",
      "essentials": [
        "300 g Weizennudeln",
        "200 g Schweinehackfleisch",
        "2 EL Chiliöl"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "300 g Weizennudeln",
          "200 g Schweinehackfleisch",
          "2 EL Chiliöl",
          "2 EL Sesampaste",
          "Sojasauce",
          "Sichuanpfeffer",
          "eingelegte Senfblätter"
        ],
        "steps": [
          "Hackfleisch mit gehackten Senfblättern vollständig durchbraten.",
          "Chiliöl, Sesampaste, Sojasauce und Sichuanpfeffer mischen.",
          "Nudeln kochen und etwas Kochwasser aufbewahren.",
          "Sauce, Nudeln und Fleisch auf Schalen verteilen."
        ]
      },
      "variants": [
        "Varianten mit mehr Brühe oder ohne Fleisch."
      ],
      "serving": [
        "Mit Frühlingszwiebeln servieren und vor dem Essen mischen."
      ],
      "commonMistakes": [
        "Nicht so viel Sesampaste verwenden, dass Chili und Gewürze überdeckt werden."
      ]
    }
  },
  "amatriciana": {
    "en": {
      "overview": "Pork jowl provides fat and flavour for a simple tomato sauce.",
      "history": "The dish is associated with Amatrice and also holds an important place in Roman food culture.",
      "flavor": "Salty, rich and fruity, often with a little chilli.",
      "technique": "Fry the guanciale slowly to render the fat.",
      "essentials": [
        "350 g bucatini",
        "150 g guanciale",
        "400 g tomatoes"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "350 g bucatini",
          "150 g guanciale",
          "400 g tomatoes",
          "80 g pecorino romano",
          "chilli"
        ],
        "steps": [
          "Cut the guanciale into strips and fry until golden.",
          "Add tomatoes and chilli and let the sauce simmer.",
          "Cook the pasta al dente and toss in the sauce.",
          "Top with grated pecorino."
        ]
      },
      "variants": [
        "Spaghetti can be used instead of bucatini."
      ],
      "serving": [
        "Serve hot with pecorino."
      ],
      "commonMistakes": [
        "Do not oversalt the sauce before adding the cheese."
      ]
    },
    "fr": {
      "overview": "La joue de porc apporte du gras et de la saveur à une sauce tomate simple.",
      "history": "Le plat est associé à Amatrice et occupe aussi une place importante dans la culture culinaire romaine.",
      "flavor": "Salé, généreux et fruité, souvent avec un peu de piment.",
      "technique": "Faire revenir lentement le guanciale pour faire fondre sa graisse.",
      "essentials": [
        "350 g de bucatini",
        "150 g de guanciale",
        "400 g de tomates"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "350 g de bucatini",
          "150 g de guanciale",
          "400 g de tomates",
          "80 g de pecorino romano",
          "piment"
        ],
        "steps": [
          "Couper le guanciale en lanières et faire revenir jusqu’à ce qu’il soit doré.",
          "Ajouter les tomates et le piment, puis laisser mijoter la sauce.",
          "Cuire les pâtes al dente et les mélanger à la sauce.",
          "Garnir de pecorino râpé."
        ]
      },
      "variants": [
        "Les spaghetti peuvent remplacer les bucatini."
      ],
      "serving": [
        "Servir chaud avec du pecorino."
      ],
      "commonMistakes": [
        "Ne pas trop saler la sauce avant d’ajouter le fromage."
      ]
    },
    "pt": {
      "overview": "A papada de porco fornece gordura e sabor a um molho de tomate simples.",
      "history": "O prato está associado a Amatrice e tem também um lugar importante na cultura gastronómica romana.",
      "flavor": "Salgado, rico e frutado, frequentemente com um pouco de malagueta.",
      "technique": "Salteie lentamente o guanciale para derreter a gordura.",
      "essentials": [
        "350 g de bucatini",
        "150 g de guanciale",
        "400 g de tomate"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "350 g de bucatini",
          "150 g de guanciale",
          "400 g de tomate",
          "80 g de pecorino romano",
          "malagueta"
        ],
        "steps": [
          "Corte o guanciale em tiras e salteie até dourar.",
          "Junte o tomate e a malagueta e deixe o molho apurar em lume brando.",
          "Coza a massa al dente e envolva no molho.",
          "Cubra com pecorino ralado."
        ]
      },
      "variants": [
        "Pode usar esparguete em vez de bucatini."
      ],
      "serving": [
        "Sirva quente com pecorino."
      ],
      "commonMistakes": [
        "Não tempere o molho com demasiado sal antes de juntar o queijo."
      ]
    },
    "es": {
      "overview": "La papada de cerdo aporta grasa y sabor a una sencilla salsa de tomate.",
      "history": "El plato se vincula con Amatrice y ocupa también un lugar importante en la cultura culinaria romana.",
      "flavor": "Salado, intenso y afrutado, a menudo con un poco de chile.",
      "technique": "Fríe lentamente el guanciale para que suelte la grasa.",
      "essentials": [
        "350 g de bucatini",
        "150 g de guanciale",
        "400 g de tomates"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "350 g de bucatini",
          "150 g de guanciale",
          "400 g de tomates",
          "80 g de pecorino romano",
          "chile"
        ],
        "steps": [
          "Corta el guanciale en tiras y fríe hasta que esté dorado.",
          "Añade el tomate y el chile y deja cocer la salsa a fuego lento.",
          "Cuece la pasta al dente y mézclala con la salsa.",
          "Cubre con pecorino rallado."
        ]
      },
      "variants": [
        "Se pueden usar espaguetis en lugar de bucatini."
      ],
      "serving": [
        "Sirve caliente con pecorino."
      ],
      "commonMistakes": [
        "No sales demasiado la salsa antes de añadir el queso."
      ]
    },
    "de": {
      "overview": "Schweinebacke liefert Fett und Geschmack für eine einfache Tomatensauce.",
      "history": "Das Gericht ist mit Amatrice verbunden und hat auch einen festen Platz in der römischen Esskultur.",
      "flavor": "Salzig, kräftig und fruchtig, gern mit etwas Chili.",
      "technique": "Guanciale langsam braten, damit das Fett austritt.",
      "essentials": [
        "350 g Bucatini",
        "150 g Guanciale",
        "400 g Tomaten"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "350 g Bucatini",
          "150 g Guanciale",
          "400 g Tomaten",
          "80 g Pecorino Romano",
          "Chili"
        ],
        "steps": [
          "Guanciale in Streifen schneiden und goldbraun braten.",
          "Tomaten und Chili hinzufügen und die Sauce köcheln lassen.",
          "Pasta al dente kochen und in der Sauce schwenken.",
          "Mit geriebenem Pecorino bestreuen."
        ]
      },
      "variants": [
        "Spaghetti können statt Bucatini verwendet werden."
      ],
      "serving": [
        "Heiß mit Pecorino servieren."
      ],
      "commonMistakes": [
        "Sauce vor Zugabe des Käses nicht zu stark salzen."
      ]
    }
  },
  "saltimbocca": {
    "en": {
      "overview": "The meat is quickly fried and served with a simple pan sauce.",
      "history": "Saltimbocca alla romana is a classic of Roman restaurant tradition.",
      "flavor": "Tender meat, salty ham and aromatic sage.",
      "technique": "Fry the thin slices briefly to keep them juicy.",
      "essentials": [
        "400 g thin veal slices",
        "8 slices of prosciutto",
        "8 sage leaves"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "400 g thin veal slices",
          "8 slices of prosciutto",
          "8 sage leaves",
          "butter",
          "100 ml white wine or stock"
        ],
        "steps": [
          "Place prosciutto and sage on the veal slices and secure with toothpicks.",
          "Fry briefly on both sides until the meat is done.",
          "Remove the meat and deglaze the pan with wine or stock.",
          "Stir in butter and serve the sauce over the meat."
        ]
      },
      "variants": [
        "Some home versions use chicken."
      ],
      "serving": [
        "Serve with vegetables or potatoes."
      ],
      "commonMistakes": [
        "Do not overcook the thin veal slices."
      ]
    },
    "fr": {
      "overview": "La viande est rapidement poêlée et servie avec un jus de cuisson simple.",
      "history": "Le saltimbocca alla romana est un classique des restaurants romains.",
      "flavor": "Viande tendre, jambon salé et sauge aromatique.",
      "technique": "Poêler brièvement les fines tranches pour préserver leur jutosité.",
      "essentials": [
        "400 g de fines tranches de veau",
        "8 tranches de prosciutto",
        "8 feuilles de sauge"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "400 g de fines tranches de veau",
          "8 tranches de prosciutto",
          "8 feuilles de sauge",
          "beurre",
          "100 ml de vin blanc ou de bouillon"
        ],
        "steps": [
          "Poser le prosciutto et la sauge sur les tranches de veau et fixer avec des cure-dents.",
          "Poêler brièvement des deux côtés jusqu’à ce que la viande soit cuite.",
          "Retirer la viande et déglacer la poêle avec du vin ou du bouillon.",
          "Incorporer le beurre et verser la sauce sur la viande."
        ]
      },
      "variants": [
        "Certaines versions maison utilisent du poulet."
      ],
      "serving": [
        "Servir avec des légumes ou des pommes de terre."
      ],
      "commonMistakes": [
        "Ne pas trop cuire les fines tranches de veau."
      ]
    },
    "pt": {
      "overview": "A carne é rapidamente salteada e servida com um molho simples dos sucos da frigideira.",
      "history": "O saltimbocca alla romana é um clássico da tradição dos restaurantes romanos.",
      "flavor": "Carne tenra, presunto salgado e salva aromática.",
      "technique": "Salteie brevemente as fatias finas para manter a suculência.",
      "essentials": [
        "400 g de fatias finas de vitela",
        "8 fatias de prosciutto",
        "8 folhas de salva"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "400 g de fatias finas de vitela",
          "8 fatias de prosciutto",
          "8 folhas de salva",
          "manteiga",
          "100 ml de vinho branco ou caldo"
        ],
        "steps": [
          "Coloque o prosciutto e a salva sobre as fatias de vitela e prenda com palitos.",
          "Salteie brevemente dos dois lados até a carne estar cozinhada.",
          "Retire a carne e deglace a frigideira com vinho ou caldo.",
          "Incorpore a manteiga e sirva o molho sobre a carne."
        ]
      },
      "variants": [
        "Algumas versões caseiras usam frango."
      ],
      "serving": [
        "Sirva com legumes ou batatas."
      ],
      "commonMistakes": [
        "Não cozinhe demasiado as fatias finas de vitela."
      ]
    },
    "es": {
      "overview": "La carne se fríe rápidamente y se sirve con una salsa sencilla de los jugos de cocción.",
      "history": "El saltimbocca alla romana es un clásico de la tradición de los restaurantes romanos.",
      "flavor": "Carne tierna, jamón salado y salvia aromática.",
      "technique": "Fríe brevemente las láminas finas para conservar su jugosidad.",
      "essentials": [
        "400 g de filetes finos de ternera",
        "8 lonchas de prosciutto",
        "8 hojas de salvia"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "400 g de filetes finos de ternera",
          "8 lonchas de prosciutto",
          "8 hojas de salvia",
          "mantequilla",
          "100 ml de vino blanco o caldo"
        ],
        "steps": [
          "Coloca el prosciutto y la salvia sobre los filetes de ternera y sujeta con palillos.",
          "Fríe brevemente por ambos lados hasta que la carne esté hecha.",
          "Retira la carne y desglasa la sartén con vino o caldo.",
          "Incorpora la mantequilla y sirve la salsa sobre la carne."
        ]
      },
      "variants": [
        "Algunas versiones caseras utilizan pollo."
      ],
      "serving": [
        "Sirve con verduras o patatas."
      ],
      "commonMistakes": [
        "No cocines demasiado los filetes finos de ternera."
      ]
    },
    "de": {
      "overview": "Das Fleisch wird kurz gebraten und mit einer einfachen Bratensauce serviert.",
      "history": "Saltimbocca alla romana ist ein Klassiker der römischen Restauranttradition.",
      "flavor": "Zartes Fleisch, salziger Schinken und aromatischer Salbei.",
      "technique": "Dünne Scheiben kurz braten, damit sie saftig bleiben.",
      "essentials": [
        "400 g dünne Kalbfleischscheiben",
        "8 Scheiben Prosciutto",
        "8 Salbeiblätter"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "400 g dünne Kalbfleischscheiben",
          "8 Scheiben Prosciutto",
          "8 Salbeiblätter",
          "Butter",
          "100 ml Weißwein oder Brühe"
        ],
        "steps": [
          "Prosciutto und Salbei auf die Kalbfleischscheiben legen und mit Zahnstochern befestigen.",
          "Beidseitig kurz braten, bis das Fleisch gar ist.",
          "Fleisch herausnehmen und den Bratensatz mit Wein oder Brühe ablöschen.",
          "Butter einrühren und die Sauce über dem Fleisch servieren."
        ]
      },
      "variants": [
        "Einige Hausvarianten verwenden Hähnchen."
      ],
      "serving": [
        "Mit Gemüse oder Kartoffeln servieren."
      ],
      "commonMistakes": [
        "Dünne Kalbfleischscheiben nicht zu lange braten."
      ]
    }
  }
} as const satisfies Readonly<Record<string, Record<InternationalSummaryLocale, ArticleBody>>>;
