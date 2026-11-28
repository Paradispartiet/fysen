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
  }
} as const satisfies Readonly<Record<string, Record<InternationalSummaryLocale, ArticleBody>>>;
