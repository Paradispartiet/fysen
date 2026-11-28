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
  },
  "cannoli": {
    "en": {
      "overview": "Fried shells are filled with a cream of drained ricotta.",
      "history": "Cannoli are a familiar part of Sicily’s pastry-making tradition.",
      "flavor": "Crisp shell and mild, creamy sweetness.",
      "technique": "Drain the ricotta and fill the shells just before serving.",
      "essentials": [
        "12 ready-made cannoli shells",
        "500 g ricotta",
        "100 g icing sugar"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 20 min + draining",
        "ingredients": [
          "12 ready-made cannoli shells",
          "500 g ricotta",
          "100 g icing sugar",
          "50 g dark chocolate",
          "pistachios"
        ],
        "steps": [
          "Drain the ricotta in the refrigerator.",
          "Mix until smooth with icing sugar and chopped chocolate.",
          "Fill the shells using a piping bag.",
          "Decorate the ends with chopped pistachios."
        ]
      },
      "variants": [
        "Fill with candied orange peel or chocolate."
      ],
      "serving": [
        "Serve freshly filled as a dessert."
      ],
      "commonMistakes": [
        "Do not fill the shells long before serving."
      ]
    },
    "fr": {
      "overview": "Les coques frites sont garnies d’une crème de ricotta égouttée.",
      "history": "Les cannoli font partie de la tradition pâtissière sicilienne.",
      "flavor": "Coque croustillante et douceur crémeuse et délicate.",
      "technique": "Égoutter la ricotta et garnir les coques juste avant de servir.",
      "essentials": [
        "12 coques de cannoli prêtes à garnir",
        "500 g de ricotta",
        "100 g de sucre glace"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 20 min + égouttage",
        "ingredients": [
          "12 coques de cannoli prêtes à garnir",
          "500 g de ricotta",
          "100 g de sucre glace",
          "50 g de chocolat noir",
          "pistaches"
        ],
        "steps": [
          "Laisser égoutter la ricotta au réfrigérateur.",
          "Mélanger jusqu’à obtenir une texture lisse avec le sucre glace et le chocolat haché.",
          "Garnir les coques à l’aide d’une poche à douille.",
          "Décorer les extrémités de pistaches hachées."
        ]
      },
      "variants": [
        "Garnir d’écorces d’orange confites ou de chocolat."
      ],
      "serving": [
        "Servir en dessert, juste après avoir garni les coques."
      ],
      "commonMistakes": [
        "Ne pas garnir les coques longtemps à l’avance."
      ]
    },
    "pt": {
      "overview": "Os tubos fritos são recheados com um creme de ricotta escorrida.",
      "history": "Os cannoli fazem parte da tradição de pastelaria siciliana.",
      "flavor": "Casca crocante e doçura suave e cremosa.",
      "technique": "Deixe escorrer a ricotta e recheie os tubos imediatamente antes de servir.",
      "essentials": [
        "12 tubos de cannoli já preparados",
        "500 g de ricotta",
        "100 g de açúcar em pó"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 20 min + tempo para escorrer",
        "ingredients": [
          "12 tubos de cannoli já preparados",
          "500 g de ricotta",
          "100 g de açúcar em pó",
          "50 g de chocolate negro",
          "pistácios"
        ],
        "steps": [
          "Deixe a ricotta escorrer no frigorífico.",
          "Misture com o açúcar em pó e o chocolate picado até obter uma textura lisa.",
          "Recheie os tubos com um saco de pasteleiro.",
          "Decore as extremidades com pistácios picados."
        ]
      },
      "variants": [
        "Recheie com casca de laranja cristalizada ou chocolate."
      ],
      "serving": [
        "Sirva como sobremesa, acabados de rechear."
      ],
      "commonMistakes": [
        "Não recheie os tubos com muita antecedência."
      ]
    },
    "es": {
      "overview": "Los tubos fritos se rellenan con una crema de ricotta escurrida.",
      "history": "Los cannoli forman parte de la tradición pastelera siciliana.",
      "flavor": "Cubierta crujiente y dulzor suave y cremoso.",
      "technique": "Escurre la ricotta y rellena los tubos justo antes de servir.",
      "essentials": [
        "12 tubos de cannoli preparados",
        "500 g de ricotta",
        "100 g de azúcar glas"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 20 min + escurrido",
        "ingredients": [
          "12 tubos de cannoli preparados",
          "500 g de ricotta",
          "100 g de azúcar glas",
          "50 g de chocolate negro",
          "pistachos"
        ],
        "steps": [
          "Deja escurrir la ricotta en el frigorífico.",
          "Mezcla hasta obtener una crema lisa con el azúcar glas y el chocolate picado.",
          "Rellena los tubos con una manga pastelera.",
          "Decora los extremos con pistachos picados."
        ]
      },
      "variants": [
        "Rellena con piel de naranja confitada o chocolate."
      ],
      "serving": [
        "Sirve como postre, recién rellenos."
      ],
      "commonMistakes": [
        "No rellenes los tubos con demasiada antelación."
      ]
    },
    "de": {
      "overview": "Frittierte Hüllen werden mit einer Creme aus abgetropftem Ricotta gefüllt.",
      "history": "Cannoli sind ein bekannter Bestandteil der sizilianischen Konditoreitradition.",
      "flavor": "Knusprige Hülle und milde, cremige Süße.",
      "technique": "Ricotta abtropfen lassen und die Hüllen erst kurz vor dem Servieren füllen.",
      "essentials": [
        "12 fertige Cannoli-Hüllen",
        "500 g Ricotta",
        "100 g Puderzucker"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 20 Min. + Abtropfzeit",
        "ingredients": [
          "12 fertige Cannoli-Hüllen",
          "500 g Ricotta",
          "100 g Puderzucker",
          "50 g Zartbitterschokolade",
          "Pistazien"
        ],
        "steps": [
          "Ricotta im Kühlschrank abtropfen lassen.",
          "Mit Puderzucker und gehackter Schokolade glatt rühren.",
          "Die Hüllen mit einem Spritzbeutel füllen.",
          "Die Enden mit gehackten Pistazien verzieren."
        ]
      },
      "variants": [
        "Mit kandierter Orangenschale oder Schokolade füllen."
      ],
      "serving": [
        "Frisch gefüllt als Dessert servieren."
      ],
      "commonMistakes": [
        "Die Hüllen nicht lange vor dem Servieren füllen."
      ]
    }
  },
  "quesadilla": {
    "en": {
      "overview": "Cheese is common, but the filling and use of cheese vary by region.",
      "history": "Quesadillas exist in many forms in everyday Mexican cooking and street food.",
      "flavor": "Toasted tortilla with juicy filling and, optionally, melted cheese.",
      "technique": "Cook over medium heat so the tortilla does not burn before the filling is hot.",
      "essentials": [
        "8 tortillas",
        "250 g cheese suitable for melting",
        "150 g mushrooms"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "8 tortillas",
          "250 g cheese suitable for melting",
          "150 g mushrooms",
          "1 onion",
          "oil",
          "salsa"
        ],
        "steps": [
          "Fry the mushrooms and onion until the liquid has evaporated.",
          "Place the filling and cheese on the tortillas.",
          "Fold and cook on both sides.",
          "Cut into pieces and serve with salsa."
        ]
      },
      "variants": [
        "Fillings can include mushrooms, squash blossoms or meat; cheese is not required everywhere."
      ],
      "serving": [
        "Serve with salsa and, if desired, guacamole."
      ],
      "commonMistakes": [
        "Avoid overly wet or excessive filling."
      ]
    },
    "fr": {
      "overview": "Le fromage est courant, mais la garniture et l’utilisation du fromage varient selon les régions.",
      "history": "Les quesadillas se déclinent sous de nombreuses formes dans la cuisine quotidienne et de rue mexicaine.",
      "flavor": "Tortilla grillée à la garniture juteuse, éventuellement avec du fromage fondu.",
      "technique": "Cuire à feu moyen pour éviter que la tortilla brûle avant que la garniture soit chaude.",
      "essentials": [
        "8 tortillas",
        "250 g de fromage à faire fondre",
        "150 g de champignons"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "8 tortillas",
          "250 g de fromage à faire fondre",
          "150 g de champignons",
          "1 oignon",
          "huile",
          "salsa"
        ],
        "steps": [
          "Faire revenir les champignons et l’oignon jusqu’à évaporation du liquide.",
          "Répartir la garniture et le fromage sur les tortillas.",
          "Plier et faire dorer des deux côtés.",
          "Découper et servir avec de la salsa."
        ]
      },
      "variants": [
        "La garniture peut contenir des champignons, des fleurs de courge ou de la viande ; le fromage n’est pas obligatoire partout."
      ],
      "serving": [
        "Servir avec de la salsa et éventuellement du guacamole."
      ],
      "commonMistakes": [
        "Éviter une garniture trop humide ou trop abondante."
      ]
    },
    "pt": {
      "overview": "O queijo é comum, mas o recheio e o uso de queijo variam consoante a região.",
      "history": "As quesadillas existem em muitas formas na cozinha quotidiana e na comida de rua mexicanas.",
      "flavor": "Tortilha tostada com recheio suculento e, eventualmente, queijo derretido.",
      "technique": "Cozinhe em lume médio para que a tortilha não queime antes de o recheio estar quente.",
      "essentials": [
        "8 tortilhas",
        "250 g de queijo para derreter",
        "150 g de cogumelos"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "8 tortilhas",
          "250 g de queijo para derreter",
          "150 g de cogumelos",
          "1 cebola",
          "óleo",
          "salsa"
        ],
        "steps": [
          "Salteie os cogumelos e a cebola até o líquido evaporar.",
          "Coloque o recheio e o queijo nas tortilhas.",
          "Dobre e cozinhe dos dois lados.",
          "Corte em pedaços e sirva com salsa."
        ]
      },
      "variants": [
        "O recheio pode incluir cogumelos, flores de abóbora ou carne; o queijo não é obrigatório em todas as regiões."
      ],
      "serving": [
        "Sirva com salsa e, se desejar, guacamole."
      ],
      "commonMistakes": [
        "Evite um recheio demasiado húmido ou abundante."
      ]
    },
    "es": {
      "overview": "El queso es habitual, pero el relleno y el uso de queso varían según la región.",
      "history": "Las quesadillas tienen muchas formas en la cocina cotidiana y callejera mexicana.",
      "flavor": "Tortilla tostada con relleno jugoso y, en su caso, queso fundido.",
      "technique": "Cocina a fuego medio para que la tortilla no se queme antes de que el relleno esté caliente.",
      "essentials": [
        "8 tortillas",
        "250 g de queso para fundir",
        "150 g de setas"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "8 tortillas",
          "250 g de queso para fundir",
          "150 g de setas",
          "1 cebolla",
          "aceite",
          "salsa"
        ],
        "steps": [
          "Saltea las setas y la cebolla hasta que se evapore el líquido.",
          "Coloca el relleno y el queso sobre las tortillas.",
          "Dobla y cocina por ambos lados.",
          "Corta en porciones y sirve con salsa."
        ]
      },
      "variants": [
        "El relleno puede ser de setas, flores de calabaza o carne; el queso no es obligatorio en todas partes."
      ],
      "serving": [
        "Sirve con salsa y, si quieres, guacamole."
      ],
      "commonMistakes": [
        "Evita un relleno demasiado húmedo o abundante."
      ]
    },
    "de": {
      "overview": "Käse ist üblich, doch Füllung und Verwendung von Käse unterscheiden sich regional.",
      "history": "Quesadillas gibt es in vielen Formen in der mexikanischen Alltagsküche und beim Streetfood.",
      "flavor": "Geröstete Tortilla mit saftiger Füllung und gegebenenfalls geschmolzenem Käse.",
      "technique": "Bei mittlerer Hitze braten, damit die Tortilla nicht verbrennt, bevor die Füllung heiß ist.",
      "essentials": [
        "8 Tortillas",
        "250 g gut schmelzender Käse",
        "150 g Pilze"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "8 Tortillas",
          "250 g gut schmelzender Käse",
          "150 g Pilze",
          "1 Zwiebel",
          "Öl",
          "Salsa"
        ],
        "steps": [
          "Pilze und Zwiebel braten, bis die Flüssigkeit verdampft ist.",
          "Füllung und Käse auf die Tortillas geben.",
          "Zusammenklappen und beidseitig braten.",
          "In Stücke schneiden und mit Salsa servieren."
        ]
      },
      "variants": [
        "Die Füllung kann aus Pilzen, Kürbisblüten oder Fleisch bestehen; Käse ist nicht überall Pflicht."
      ],
      "serving": [
        "Mit Salsa und nach Wunsch Guacamole servieren."
      ],
      "commonMistakes": [
        "Zu feuchte oder zu reichliche Füllung vermeiden."
      ]
    }
  },
  "bibimbap": {
    "en": {
      "overview": "The ingredients are prepared separately and mixed with rice at the table.",
      "history": "Bibimbap has several regional forms, including in Jeonju.",
      "flavor": "Hot, nutty and fresh, with contrasts between the vegetables.",
      "technique": "Fry or blanch the vegetables separately.",
      "essentials": [
        "400 g cooked rice",
        "200 g spinach",
        "2 carrots"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "400 g cooked rice",
          "200 g spinach",
          "2 carrots",
          "150 g bean sprouts",
          "4 eggs",
          "gochujang",
          "sesame oil"
        ],
        "steps": [
          "Prepare the vegetables separately and season with sesame oil.",
          "Fry the eggs as desired.",
          "Divide hot rice among bowls and add the vegetables and eggs.",
          "Serve with gochujang and mix before eating."
        ]
      },
      "variants": [
        "Dolsot bibimbap is served in a hot stone bowl."
      ],
      "serving": [
        "Serve with kimchi."
      ],
      "commonMistakes": [
        "Avoid making all the vegetables soggy."
      ]
    },
    "fr": {
      "overview": "Les ingrédients sont préparés séparément et mélangés au riz à table.",
      "history": "Le bibimbap existe en plusieurs versions régionales, notamment à Jeonju.",
      "flavor": "Piquant, aux notes de noix et frais, avec des contrastes entre les légumes.",
      "technique": "Faire sauter ou blanchir les légumes séparément.",
      "essentials": [
        "400 g de riz cuit",
        "200 g d’épinards",
        "2 carottes"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "400 g de riz cuit",
          "200 g d’épinards",
          "2 carottes",
          "150 g de pousses de haricot",
          "4 œufs",
          "gochujang",
          "huile de sésame"
        ],
        "steps": [
          "Préparer les légumes séparément et assaisonner à l’huile de sésame.",
          "Cuire les œufs à la poêle selon les préférences.",
          "Répartir le riz chaud dans des bols et ajouter les légumes et les œufs.",
          "Servir avec du gochujang et mélanger avant de manger."
        ]
      },
      "variants": [
        "Le dolsot bibimbap est servi dans un bol de pierre chaud."
      ],
      "serving": [
        "Servir avec du kimchi."
      ],
      "commonMistakes": [
        "Éviter de ramollir tous les légumes."
      ]
    },
    "pt": {
      "overview": "Os ingredientes são preparados separadamente e misturados com o arroz à mesa.",
      "history": "O bibimbap tem várias formas regionais, nomeadamente em Jeonju.",
      "flavor": "Picante, com notas de frutos secos e fresco, com contrastes entre os legumes.",
      "technique": "Salteie ou escalde os legumes separadamente.",
      "essentials": [
        "400 g de arroz cozido",
        "200 g de espinafres",
        "2 cenouras"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "400 g de arroz cozido",
          "200 g de espinafres",
          "2 cenouras",
          "150 g de rebentos de feijão",
          "4 ovos",
          "gochujang",
          "óleo de sésamo"
        ],
        "steps": [
          "Prepare os legumes separadamente e tempere com óleo de sésamo.",
          "Estrele os ovos a gosto.",
          "Distribua o arroz quente pelas tigelas e junte os legumes e os ovos.",
          "Sirva com gochujang e misture antes de comer."
        ]
      },
      "variants": [
        "O dolsot bibimbap é servido numa tigela de pedra quente."
      ],
      "serving": [
        "Sirva com kimchi."
      ],
      "commonMistakes": [
        "Evite que todos os legumes fiquem demasiado moles."
      ]
    },
    "es": {
      "overview": "Los ingredientes se preparan por separado y se mezclan con el arroz en la mesa.",
      "history": "El bibimbap tiene varias formas regionales, entre ellas la de Jeonju.",
      "flavor": "Picante, con notas de frutos secos y fresco, con contrastes entre las verduras.",
      "technique": "Saltea o escalda las verduras por separado.",
      "essentials": [
        "400 g de arroz cocido",
        "200 g de espinacas",
        "2 zanahorias"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "400 g de arroz cocido",
          "200 g de espinacas",
          "2 zanahorias",
          "150 g de brotes de judía",
          "4 huevos",
          "gochujang",
          "aceite de sésamo"
        ],
        "steps": [
          "Prepara las verduras por separado y sazona con aceite de sésamo.",
          "Fríe los huevos al gusto.",
          "Reparte el arroz caliente en boles y añade las verduras y los huevos.",
          "Sirve con gochujang y mezcla antes de comer."
        ]
      },
      "variants": [
        "El dolsot bibimbap se sirve en un bol de piedra caliente."
      ],
      "serving": [
        "Sirve con kimchi."
      ],
      "commonMistakes": [
        "Evita que todas las verduras queden demasiado blandas."
      ]
    },
    "de": {
      "overview": "Die Zutaten werden getrennt zubereitet und am Tisch mit dem Reis vermischt.",
      "history": "Bibimbap gibt es in mehreren regionalen Varianten, unter anderem in Jeonju.",
      "flavor": "Scharf, nussig und frisch, mit Kontrasten zwischen den Gemüsesorten.",
      "technique": "Gemüse einzeln anbraten oder blanchieren.",
      "essentials": [
        "400 g gekochter Reis",
        "200 g Spinat",
        "2 Karotten"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "400 g gekochter Reis",
          "200 g Spinat",
          "2 Karotten",
          "150 g Bohnensprossen",
          "4 Eier",
          "Gochujang",
          "Sesamöl"
        ],
        "steps": [
          "Gemüse getrennt zubereiten und mit Sesamöl abschmecken.",
          "Eier nach Wunsch braten.",
          "Heißen Reis auf Schalen verteilen und Gemüse und Eier daraufgeben.",
          "Mit Gochujang servieren und vor dem Essen mischen."
        ]
      },
      "variants": [
        "Dolsot Bibimbap wird in einer heißen Steinschale serviert."
      ],
      "serving": [
        "Mit Kimchi servieren."
      ],
      "commonMistakes": [
        "Nicht alle Gemüsesorten weich werden lassen."
      ]
    }
  },
  "bulgogi": {
    "en": {
      "overview": "Soy sauce, garlic, sugar and sesame oil give the meat its characteristic flavour.",
      "history": "Bulgogi is a familiar part of Korean barbecue.",
      "flavor": "Slightly sweet, salty and roasted.",
      "technique": "Slice the meat thinly across the grain and fry in small batches.",
      "essentials": [
        "500 g beef",
        "3 tbsp soy sauce",
        "1 tbsp sugar"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 25 min + marinating",
        "ingredients": [
          "500 g beef",
          "3 tbsp soy sauce",
          "1 tbsp sugar",
          "2 garlic cloves",
          "1 tbsp sesame oil",
          "1 small pear",
          "spring onions"
        ],
        "steps": [
          "Grate the pear and mix the marinade.",
          "Slice the meat thinly and marinate in the refrigerator for 30 minutes.",
          "Fry in small batches until the meat is done.",
          "Top with spring onions."
        ]
      },
      "variants": [
        "Versions with pork or a hot marinade also exist."
      ],
      "serving": [
        "Serve with rice, lettuce leaves and banchan."
      ],
      "commonMistakes": [
        "Do not overcrowd the frying pan."
      ]
    },
    "fr": {
      "overview": "La sauce soja, l’ail, le sucre et l’huile de sésame donnent à la viande sa saveur caractéristique.",
      "history": "Le bulgogi fait partie des grillades coréennes classiques.",
      "flavor": "Légèrement sucré, salé et grillé.",
      "technique": "Couper la viande en fines tranches perpendiculairement aux fibres et la faire revenir par petites quantités.",
      "essentials": [
        "500 g de bœuf",
        "3 c. à soupe de sauce soja",
        "1 c. à soupe de sucre"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 25 min + marinade",
        "ingredients": [
          "500 g de bœuf",
          "3 c. à soupe de sauce soja",
          "1 c. à soupe de sucre",
          "2 gousses d’ail",
          "1 c. à soupe d’huile de sésame",
          "1 petite poire",
          "oignons nouveaux"
        ],
        "steps": [
          "Râper la poire et mélanger la marinade.",
          "Couper la viande en fines tranches et laisser mariner au réfrigérateur pendant 30 minutes.",
          "Faire revenir par petites quantités jusqu’à ce que la viande soit cuite.",
          "Garnir d’oignons nouveaux."
        ]
      },
      "variants": [
        "Il existe aussi des variantes au porc ou à la marinade piquante."
      ],
      "serving": [
        "Servir avec du riz, des feuilles de laitue et des banchan."
      ],
      "commonMistakes": [
        "Ne pas surcharger la poêle."
      ]
    },
    "pt": {
      "overview": "O molho de soja, o alho, o açúcar e o óleo de sésamo dão à carne o seu sabor característico.",
      "history": "O bulgogi é uma parte conhecida do churrasco coreano.",
      "flavor": "Ligeiramente doce, salgado e tostado.",
      "technique": "Corte a carne em fatias finas contra as fibras e salteie em pequenas porções.",
      "essentials": [
        "500 g de carne de vaca",
        "3 c. de sopa de molho de soja",
        "1 c. de sopa de açúcar"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 25 min + marinada",
        "ingredients": [
          "500 g de carne de vaca",
          "3 c. de sopa de molho de soja",
          "1 c. de sopa de açúcar",
          "2 dentes de alho",
          "1 c. de sopa de óleo de sésamo",
          "1 pera pequena",
          "cebolinha verde"
        ],
        "steps": [
          "Rale a pera e misture a marinada.",
          "Corte a carne em fatias finas e deixe marinar no frigorífico durante 30 minutos.",
          "Salteie em pequenas porções até a carne estar cozinhada.",
          "Cubra com cebolinha verde."
        ]
      },
      "variants": [
        "Também existem variantes com carne de porco ou marinada picante."
      ],
      "serving": [
        "Sirva com arroz, folhas de alface e banchan."
      ],
      "commonMistakes": [
        "Não encha demasiado a frigideira."
      ]
    },
    "es": {
      "overview": "La salsa de soja, el ajo, el azúcar y el aceite de sésamo dan a la carne su sabor característico.",
      "history": "El bulgogi es un plato conocido de la parrillada coreana.",
      "flavor": "Ligeramente dulce, salado y tostado.",
      "technique": "Corta la carne en láminas finas a contrapelo y saltéala en tandas pequeñas.",
      "essentials": [
        "500 g de carne de vacuno",
        "3 cucharadas de salsa de soja",
        "1 cucharada de azúcar"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 25 min + marinado",
        "ingredients": [
          "500 g de carne de vacuno",
          "3 cucharadas de salsa de soja",
          "1 cucharada de azúcar",
          "2 dientes de ajo",
          "1 cucharada de aceite de sésamo",
          "1 pera pequeña",
          "cebolletas"
        ],
        "steps": [
          "Ralla la pera y mezcla la marinada.",
          "Corta la carne en láminas finas y deja marinar en el frigorífico durante 30 minutos.",
          "Saltea en tandas pequeñas hasta que la carne esté hecha.",
          "Añade cebolletas por encima."
        ]
      },
      "variants": [
        "También existen variantes con cerdo o marinada picante."
      ],
      "serving": [
        "Sirve con arroz, hojas de lechuga y banchan."
      ],
      "commonMistakes": [
        "No llenes demasiado la sartén."
      ]
    },
    "de": {
      "overview": "Sojasauce, Knoblauch, Zucker und Sesamöl geben dem Fleisch seinen typischen Geschmack.",
      "history": "Bulgogi ist ein bekannter Bestandteil der koreanischen Grillküche.",
      "flavor": "Süßlich, salzig und röstig.",
      "technique": "Fleisch quer zur Faser dünn schneiden und portionsweise braten.",
      "essentials": [
        "500 g Rindfleisch",
        "3 EL Sojasauce",
        "1 EL Zucker"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 25 Min. + Marinierzeit",
        "ingredients": [
          "500 g Rindfleisch",
          "3 EL Sojasauce",
          "1 EL Zucker",
          "2 Knoblauchzehen",
          "1 EL Sesamöl",
          "1 kleine Birne",
          "Frühlingszwiebeln"
        ],
        "steps": [
          "Birne reiben und die Marinade mischen.",
          "Fleisch dünn schneiden und 30 Minuten im Kühlschrank marinieren.",
          "Portionsweise braten, bis das Fleisch gar ist.",
          "Mit Frühlingszwiebeln garnieren."
        ]
      },
      "variants": [
        "Es gibt auch Varianten mit Schweinefleisch oder scharfer Marinade."
      ],
      "serving": [
        "Mit Reis, Salatblättern und Banchan servieren."
      ],
      "commonMistakes": [
        "Die Pfanne nicht überfüllen."
      ]
    }
  },
  "japchae": {
    "en": {
      "overview": "The noodles are mixed with fried vegetables and, optionally, meat.",
      "history": "Japchae is served both on festive occasions and as everyday food in Korea.",
      "flavor": "Springy noodles, mild sweetness and sesame aroma.",
      "technique": "Prepare the vegetables separately to preserve their texture.",
      "essentials": [
        "200 g dangmyeon",
        "1 carrot",
        "1 onion"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "200 g dangmyeon",
          "1 carrot",
          "1 onion",
          "150 g spinach",
          "100 g mushrooms",
          "3 tbsp soy sauce",
          "sesame oil",
          "sugar"
        ],
        "steps": [
          "Cook the noodles according to the packet instructions.",
          "Fry the onion, carrot and mushrooms; blanch the spinach.",
          "Mix the noodles with the vegetables, soy sauce and a little sugar.",
          "Season with sesame oil."
        ]
      },
      "variants": [
        "Versions with beef or without meat."
      ],
      "serving": [
        "Serve lukewarm or at room temperature as part of the meal."
      ],
      "commonMistakes": [
        "Do not overcook the glass noodles."
      ]
    },
    "fr": {
      "overview": "Les nouilles sont mélangées à des légumes sautés et éventuellement à de la viande.",
      "history": "Le japchae est servi en Corée aussi bien lors des fêtes qu’au quotidien.",
      "flavor": "Nouilles élastiques, douceur légère et arôme de sésame.",
      "technique": "Préparer les légumes séparément pour préserver leur texture.",
      "essentials": [
        "200 g de dangmyeon",
        "1 carotte",
        "1 oignon"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "200 g de dangmyeon",
          "1 carotte",
          "1 oignon",
          "150 g d’épinards",
          "100 g de champignons",
          "3 c. à soupe de sauce soja",
          "huile de sésame",
          "sucre"
        ],
        "steps": [
          "Cuire les nouilles selon les instructions du paquet.",
          "Faire revenir l’oignon, la carotte et les champignons ; blanchir les épinards.",
          "Mélanger les nouilles avec les légumes, la sauce soja et un peu de sucre.",
          "Assaisonner à l’huile de sésame."
        ]
      },
      "variants": [
        "Variantes au bœuf ou sans viande."
      ],
      "serving": [
        "Servir tiède ou à température ambiante dans le cadre du repas."
      ],
      "commonMistakes": [
        "Ne pas trop cuire les vermicelles translucides."
      ]
    },
    "pt": {
      "overview": "Os noodles são misturados com legumes salteados e, eventualmente, carne.",
      "history": "O japchae é servido na Coreia tanto em ocasiões festivas como no quotidiano.",
      "flavor": "Noodles elásticos, doçura suave e aroma de sésamo.",
      "technique": "Prepare os legumes separadamente para preservar a textura.",
      "essentials": [
        "200 g de dangmyeon",
        "1 cenoura",
        "1 cebola"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "200 g de dangmyeon",
          "1 cenoura",
          "1 cebola",
          "150 g de espinafres",
          "100 g de cogumelos",
          "3 c. de sopa de molho de soja",
          "óleo de sésamo",
          "açúcar"
        ],
        "steps": [
          "Coza os noodles de acordo com as instruções da embalagem.",
          "Salteie a cebola, a cenoura e os cogumelos; escalde os espinafres.",
          "Misture os noodles com os legumes, o molho de soja e um pouco de açúcar.",
          "Tempere com óleo de sésamo."
        ]
      },
      "variants": [
        "Variantes com carne de vaca ou sem carne."
      ],
      "serving": [
        "Sirva morno ou à temperatura ambiente como parte da refeição."
      ],
      "commonMistakes": [
        "Não coza demasiado os noodles de vidro."
      ]
    },
    "es": {
      "overview": "Los fideos se mezclan con verduras salteadas y, opcionalmente, carne.",
      "history": "El japchae se sirve en Corea tanto en fiestas como en comidas cotidianas.",
      "flavor": "Fideos elásticos, dulzor suave y aroma de sésamo.",
      "technique": "Prepara las verduras por separado para conservar su textura.",
      "essentials": [
        "200 g de dangmyeon",
        "1 zanahoria",
        "1 cebolla"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "200 g de dangmyeon",
          "1 zanahoria",
          "1 cebolla",
          "150 g de espinacas",
          "100 g de setas",
          "3 cucharadas de salsa de soja",
          "aceite de sésamo",
          "azúcar"
        ],
        "steps": [
          "Cuece los fideos según las instrucciones del envase.",
          "Saltea la cebolla, la zanahoria y las setas; escalda las espinacas.",
          "Mezcla los fideos con las verduras, la salsa de soja y un poco de azúcar.",
          "Sazona con aceite de sésamo."
        ]
      },
      "variants": [
        "Variantes con carne de vacuno o sin carne."
      ],
      "serving": [
        "Sirve templado o a temperatura ambiente como parte de la comida."
      ],
      "commonMistakes": [
        "No cuezas demasiado los fideos de cristal."
      ]
    },
    "de": {
      "overview": "Die Nudeln werden mit gebratenem Gemüse und gegebenenfalls Fleisch vermischt.",
      "history": "Japchae wird in Korea sowohl zu Festen als auch im Alltag serviert.",
      "flavor": "Elastische Nudeln, milde Süße und Sesamaroma.",
      "technique": "Gemüse getrennt zubereiten, um die Konsistenz zu erhalten.",
      "essentials": [
        "200 g Dangmyeon",
        "1 Karotte",
        "1 Zwiebel"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "200 g Dangmyeon",
          "1 Karotte",
          "1 Zwiebel",
          "150 g Spinat",
          "100 g Pilze",
          "3 EL Sojasauce",
          "Sesamöl",
          "Zucker"
        ],
        "steps": [
          "Nudeln nach Packungsanleitung kochen.",
          "Zwiebel, Karotte und Pilze braten; Spinat blanchieren.",
          "Nudeln mit Gemüse, Sojasauce und etwas Zucker mischen.",
          "Mit Sesamöl abschmecken."
        ]
      },
      "variants": [
        "Varianten mit Rindfleisch oder ohne Fleisch."
      ],
      "serving": [
        "Lauwarm oder bei Zimmertemperatur als Teil der Mahlzeit servieren."
      ],
      "commonMistakes": [
        "Glasnudeln nicht zu lange kochen."
      ]
    }
  },
  "kimchi-jjigae": {
    "en": {
      "overview": "Mature kimchi gives the stew acidity, chilli heat and umami.",
      "history": "Kimchi jjigae is a common Korean home-cooked dish.",
      "flavor": "Tangy, hot and full-bodied.",
      "technique": "Use well-matured kimchi and let the stew simmer.",
      "essentials": [
        "300 g kimchi",
        "200 g tofu",
        "200 g pork"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "300 g kimchi",
          "200 g tofu",
          "200 g pork",
          "500 ml stock",
          "1 onion",
          "gochugaru"
        ],
        "steps": [
          "Briefly fry the pork and kimchi.",
          "Add stock, onion and chilli to taste.",
          "Simmer until the meat is cooked through.",
          "Add the tofu towards the end."
        ]
      },
      "variants": [
        "Versions with tuna or without meat."
      ],
      "serving": [
        "Serve with rice and small side dishes."
      ],
      "commonMistakes": [
        "Do not add salt before tasting the kimchi broth."
      ]
    },
    "fr": {
      "overview": "Le kimchi bien fermenté apporte au ragoût acidité, piquant et umami.",
      "history": "Le kimchi jjigae est un plat familial coréen courant.",
      "flavor": "Acidulé, piquant et généreux.",
      "technique": "Utiliser du kimchi bien fermenté et laisser mijoter le ragoût.",
      "essentials": [
        "300 g de kimchi",
        "200 g de tofu",
        "200 g de porc"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "300 g de kimchi",
          "200 g de tofu",
          "200 g de porc",
          "500 ml de bouillon",
          "1 oignon",
          "gochugaru"
        ],
        "steps": [
          "Faire revenir brièvement le porc et le kimchi.",
          "Ajouter le bouillon, l’oignon et du piment selon le goût.",
          "Laisser mijoter jusqu’à cuisson complète de la viande.",
          "Ajouter le tofu en fin de cuisson."
        ]
      },
      "variants": [
        "Variantes au thon ou sans viande."
      ],
      "serving": [
        "Servir avec du riz et de petits accompagnements."
      ],
      "commonMistakes": [
        "Ne pas saler avant d’avoir goûté le bouillon au kimchi."
      ]
    },
    "pt": {
      "overview": "O kimchi bem maturado dá ao guisado acidez, picante e umami.",
      "history": "O kimchi jjigae é um prato caseiro coreano comum.",
      "flavor": "Ácido, picante e encorpado.",
      "technique": "Use kimchi bem maturado e deixe o guisado cozinhar em lume brando.",
      "essentials": [
        "300 g de kimchi",
        "200 g de tofu",
        "200 g de carne de porco"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "300 g de kimchi",
          "200 g de tofu",
          "200 g de carne de porco",
          "500 ml de caldo",
          "1 cebola",
          "gochugaru"
        ],
        "steps": [
          "Salteie brevemente a carne de porco e o kimchi.",
          "Junte o caldo, a cebola e a malagueta a gosto.",
          "Deixe cozinhar em lume brando até a carne estar bem cozinhada.",
          "Junte o tofu perto do fim."
        ]
      },
      "variants": [
        "Variantes com atum ou sem carne."
      ],
      "serving": [
        "Sirva com arroz e pequenos acompanhamentos."
      ],
      "commonMistakes": [
        "Não junte sal antes de provar o caldo de kimchi."
      ]
    },
    "es": {
      "overview": "El kimchi bien madurado aporta al guiso acidez, picante y umami.",
      "history": "El kimchi jjigae es un plato casero coreano habitual.",
      "flavor": "Ácido, picante y con cuerpo.",
      "technique": "Usa kimchi bien madurado y deja cocer el guiso a fuego lento.",
      "essentials": [
        "300 g de kimchi",
        "200 g de tofu",
        "200 g de carne de cerdo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "300 g de kimchi",
          "200 g de tofu",
          "200 g de carne de cerdo",
          "500 ml de caldo",
          "1 cebolla",
          "gochugaru"
        ],
        "steps": [
          "Saltea brevemente el cerdo y el kimchi.",
          "Añade el caldo, la cebolla y el chile al gusto.",
          "Cuece a fuego lento hasta que la carne esté hecha por dentro.",
          "Añade el tofu hacia el final."
        ]
      },
      "variants": [
        "Variantes con atún o sin carne."
      ],
      "serving": [
        "Sirve con arroz y pequeños acompañamientos."
      ],
      "commonMistakes": [
        "No añadas sal antes de probar el caldo de kimchi."
      ]
    },
    "de": {
      "overview": "Gut gereifter Kimchi gibt dem Eintopf Säure, Chilischärfe und Umami.",
      "history": "Kimchi Jjigae ist ein gängiges koreanisches Hausgericht.",
      "flavor": "Säuerlich, scharf und vollmundig.",
      "technique": "Gut gereiften Kimchi verwenden und den Eintopf köcheln lassen.",
      "essentials": [
        "300 g Kimchi",
        "200 g Tofu",
        "200 g Schweinefleisch"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "300 g Kimchi",
          "200 g Tofu",
          "200 g Schweinefleisch",
          "500 ml Brühe",
          "1 Zwiebel",
          "Gochugaru"
        ],
        "steps": [
          "Schweinefleisch und Kimchi kurz anbraten.",
          "Brühe, Zwiebel und Chili nach Geschmack hinzufügen.",
          "Köcheln lassen, bis das Fleisch vollständig durchgegart ist.",
          "Tofu gegen Ende hinzufügen."
        ]
      },
      "variants": [
        "Varianten mit Thunfisch oder ohne Fleisch."
      ],
      "serving": [
        "Mit Reis und kleinen Beilagen servieren."
      ],
      "commonMistakes": [
        "Erst salzen, nachdem die Kimchi-Brühe probiert wurde."
      ]
    }
  },
  "tteokbokki": {
    "en": {
      "overview": "Cylindrical rice cakes are cooked in a sauce with gochujang.",
      "history": "The red, hot version is well known in Korean street food.",
      "flavor": "Chewy, soft, sweet and hot.",
      "technique": "Simmer the rice cakes until tender and the sauce thickens.",
      "essentials": [
        "400 g Korean rice cakes",
        "500 ml stock",
        "2 tbsp gochujang"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "400 g Korean rice cakes",
          "500 ml stock",
          "2 tbsp gochujang",
          "1 tbsp sugar",
          "1 tbsp soy sauce",
          "spring onions"
        ],
        "steps": [
          "Soak the rice cakes if needed, following the packet instructions.",
          "Bring the stock to a boil with gochujang, sugar and soy sauce.",
          "Add the rice cakes and simmer, stirring, until tender.",
          "Top with spring onions."
        ]
      },
      "variants": [
        "Gungjung tteokbokki uses a soy-based sauce."
      ],
      "serving": [
        "Serve with fish cakes or boiled egg if desired."
      ],
      "commonMistakes": [
        "Do not let the sauce boil dry before the rice cakes are tender."
      ]
    },
    "fr": {
      "overview": "Les gâteaux de riz cylindriques cuisent dans une sauce au gochujang.",
      "history": "La version rouge et piquante est bien connue dans la cuisine de rue coréenne.",
      "flavor": "Élastique, tendre, sucré et piquant.",
      "technique": "Laisser mijoter les gâteaux de riz jusqu’à ce qu’ils soient tendres et que la sauce épaississe.",
      "essentials": [
        "400 g de gâteaux de riz coréens",
        "500 ml de bouillon",
        "2 c. à soupe de gochujang"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "400 g de gâteaux de riz coréens",
          "500 ml de bouillon",
          "2 c. à soupe de gochujang",
          "1 c. à soupe de sucre",
          "1 c. à soupe de sauce soja",
          "oignons nouveaux"
        ],
        "steps": [
          "Faire tremper les gâteaux de riz si nécessaire, selon les instructions du paquet.",
          "Porter le bouillon à ébullition avec le gochujang, le sucre et la sauce soja.",
          "Ajouter les gâteaux de riz et laisser mijoter en remuant jusqu’à tendreté.",
          "Garnir d’oignons nouveaux."
        ]
      },
      "variants": [
        "Le gungjung tteokbokki utilise une sauce à base de soja."
      ],
      "serving": [
        "Servir éventuellement avec des galettes de poisson ou un œuf dur."
      ],
      "commonMistakes": [
        "Ne pas laisser la sauce s’évaporer complètement avant que les gâteaux de riz soient tendres."
      ]
    },
    "pt": {
      "overview": "Os bolinhos de arroz cilíndricos são cozidos num molho com gochujang.",
      "history": "A versão vermelha e picante é conhecida na comida de rua coreana.",
      "flavor": "Elástico, macio, doce e picante.",
      "technique": "Deixe os bolinhos de arroz cozinhar em lume brando até ficarem tenros e o molho engrossar.",
      "essentials": [
        "400 g de bolinhos de arroz coreanos",
        "500 ml de caldo",
        "2 c. de sopa de gochujang"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "400 g de bolinhos de arroz coreanos",
          "500 ml de caldo",
          "2 c. de sopa de gochujang",
          "1 c. de sopa de açúcar",
          "1 c. de sopa de molho de soja",
          "cebolinha verde"
        ],
        "steps": [
          "Demolhe os bolinhos de arroz, se necessário, de acordo com a embalagem.",
          "Leve o caldo a ferver com gochujang, açúcar e molho de soja.",
          "Junte os bolinhos de arroz e cozinhe em lume brando, mexendo, até ficarem tenros.",
          "Cubra com cebolinha verde."
        ]
      },
      "variants": [
        "O gungjung tteokbokki utiliza um molho à base de soja."
      ],
      "serving": [
        "Sirva, se desejar, com bolinhos de peixe ou ovo cozido."
      ],
      "commonMistakes": [
        "Não deixe o molho secar antes de os bolinhos de arroz estarem tenros."
      ]
    },
    "es": {
      "overview": "Los pastelitos de arroz cilíndricos se cuecen en una salsa con gochujang.",
      "history": "La versión roja y picante es conocida en la comida callejera coreana.",
      "flavor": "Elástico, tierno, dulce y picante.",
      "technique": "Cuece los pastelitos de arroz a fuego lento hasta que estén tiernos y la salsa espese.",
      "essentials": [
        "400 g de pastelitos de arroz coreanos",
        "500 ml de caldo",
        "2 cucharadas de gochujang"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "400 g de pastelitos de arroz coreanos",
          "500 ml de caldo",
          "2 cucharadas de gochujang",
          "1 cucharada de azúcar",
          "1 cucharada de salsa de soja",
          "cebolletas"
        ],
        "steps": [
          "Remoja los pastelitos de arroz si es necesario, según las instrucciones del envase.",
          "Lleva el caldo a ebullición con gochujang, azúcar y salsa de soja.",
          "Añade los pastelitos de arroz y cuece a fuego lento, removiendo, hasta que estén tiernos.",
          "Añade cebolletas por encima."
        ]
      },
      "variants": [
        "El gungjung tteokbokki utiliza una salsa a base de soja."
      ],
      "serving": [
        "Sirve, si quieres, con pasteles de pescado o huevo cocido."
      ],
      "commonMistakes": [
        "No dejes que la salsa se seque antes de que los pastelitos de arroz estén tiernos."
      ]
    },
    "de": {
      "overview": "Zylindrische Reiskuchen werden in einer Sauce mit Gochujang gegart.",
      "history": "Die rote, scharfe Variante ist aus dem koreanischen Streetfood bekannt.",
      "flavor": "Zäh-elastisch, weich und süß-scharf.",
      "technique": "Reiskuchen köcheln lassen, bis sie weich sind und die Sauce eindickt.",
      "essentials": [
        "400 g koreanische Reiskuchen",
        "500 ml Brühe",
        "2 EL Gochujang"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "400 g koreanische Reiskuchen",
          "500 ml Brühe",
          "2 EL Gochujang",
          "1 EL Zucker",
          "1 EL Sojasauce",
          "Frühlingszwiebeln"
        ],
        "steps": [
          "Reiskuchen bei Bedarf nach Packungsanleitung einweichen.",
          "Brühe mit Gochujang, Zucker und Sojasauce aufkochen.",
          "Reiskuchen zugeben und unter Rühren weich köcheln lassen.",
          "Mit Frühlingszwiebeln garnieren."
        ]
      },
      "variants": [
        "Gungjung Tteokbokki verwendet eine Sauce auf Sojabasis."
      ],
      "serving": [
        "Nach Wunsch mit Fischkuchen oder gekochtem Ei servieren."
      ],
      "commonMistakes": [
        "Sauce nicht einkochen lassen, bis sie trocken ist, bevor die Reiskuchen weich sind."
      ]
    }
  },
  "samgyeopsal": {
    "en": {
      "overview": "The meat is often grilled at the table and eaten with lettuce leaves and accompaniments.",
      "history": "Samgyeopsal is common in Korea’s social barbecue culture.",
      "flavor": "Rich and roasted, balanced by fresh accompaniments.",
      "technique": "Grill in moderate batches and allow the fat to drain.",
      "essentials": [
        "600 g sliced pork belly",
        "lettuce leaves",
        "garlic"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30–45 min",
        "ingredients": [
          "600 g sliced pork belly",
          "lettuce leaves",
          "garlic",
          "ssamjang",
          "kimchi",
          "rice"
        ],
        "steps": [
          "Grill the meat on a hot grill or pan until cooked through.",
          "Cut into bite-sized pieces with clean scissors or a knife.",
          "Place the meat, ssamjang and accompaniments in a lettuce leaf.",
          "Serve immediately."
        ]
      },
      "variants": [
        "The thickness of the meat slices varies; the meat may be served unmarinated."
      ],
      "serving": [
        "Serve with kimchi, rice and garlic."
      ],
      "commonMistakes": [
        "Avoid using the same utensils for raw and cooked meat without washing them."
      ]
    },
    "fr": {
      "overview": "La viande est souvent grillée à table et dégustée avec des feuilles de laitue et des accompagnements.",
      "history": "Le samgyeopsal est courant dans la culture coréenne des grillades conviviales.",
      "flavor": "Généreux et grillé, équilibré par des accompagnements frais.",
      "technique": "Griller par quantités modérées et laisser la graisse s’écouler.",
      "essentials": [
        "600 g de poitrine de porc en tranches",
        "feuilles de laitue",
        "ail"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30–45 min",
        "ingredients": [
          "600 g de poitrine de porc en tranches",
          "feuilles de laitue",
          "ail",
          "ssamjang",
          "kimchi",
          "riz"
        ],
        "steps": [
          "Griller la viande sur un gril ou dans une poêle chaude jusqu’à cuisson complète.",
          "Découper en bouchées avec des ciseaux propres ou un couteau propre.",
          "Déposer la viande, le ssamjang et les accompagnements dans une feuille de laitue.",
          "Servir immédiatement."
        ]
      },
      "variants": [
        "L’épaisseur des tranches varie ; la viande peut être servie sans marinade."
      ],
      "serving": [
        "Servir avec du kimchi, du riz et de l’ail."
      ],
      "commonMistakes": [
        "Éviter d’utiliser les mêmes ustensiles pour la viande crue et cuite sans les laver."
      ]
    },
    "pt": {
      "overview": "A carne é muitas vezes grelhada à mesa e comida com folhas de alface e acompanhamentos.",
      "history": "O samgyeopsal é comum na cultura coreana de churrasco em convívio.",
      "flavor": "Rico e tostado, equilibrado por acompanhamentos frescos.",
      "technique": "Grelhe em porções moderadas e deixe escorrer a gordura.",
      "essentials": [
        "600 g de barriga de porco em fatias",
        "folhas de alface",
        "alho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30–45 min",
        "ingredients": [
          "600 g de barriga de porco em fatias",
          "folhas de alface",
          "alho",
          "ssamjang",
          "kimchi",
          "arroz"
        ],
        "steps": [
          "Grelhe a carne numa grelha ou frigideira quente até estar bem cozinhada.",
          "Corte em pedaços de uma dentada com uma tesoura ou faca limpa.",
          "Coloque a carne, o ssamjang e os acompanhamentos numa folha de alface.",
          "Sirva imediatamente."
        ]
      },
      "variants": [
        "A espessura das fatias varia; a carne pode ser servida sem marinada."
      ],
      "serving": [
        "Sirva com kimchi, arroz e alho."
      ],
      "commonMistakes": [
        "Evite usar os mesmos utensílios para a carne crua e cozinhada sem os lavar."
      ]
    },
    "es": {
      "overview": "La carne se suele asar en la mesa y comer con hojas de lechuga y acompañamientos.",
      "history": "El samgyeopsal es habitual en la cultura coreana de la parrillada compartida.",
      "flavor": "Intenso y tostado, equilibrado por acompañamientos frescos.",
      "technique": "Asa en tandas moderadas y deja escurrir la grasa.",
      "essentials": [
        "600 g de panceta de cerdo en lonchas",
        "hojas de lechuga",
        "ajo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30–45 min",
        "ingredients": [
          "600 g de panceta de cerdo en lonchas",
          "hojas de lechuga",
          "ajo",
          "ssamjang",
          "kimchi",
          "arroz"
        ],
        "steps": [
          "Asa la carne en una parrilla o sartén caliente hasta que esté hecha por dentro.",
          "Corta en bocados con unas tijeras o un cuchillo limpios.",
          "Coloca la carne, el ssamjang y los acompañamientos en una hoja de lechuga.",
          "Sirve inmediatamente."
        ]
      },
      "variants": [
        "El grosor de las lonchas varía; la carne puede servirse sin marinar."
      ],
      "serving": [
        "Sirve con kimchi, arroz y ajo."
      ],
      "commonMistakes": [
        "Evita usar los mismos utensilios para carne cruda y cocinada sin lavarlos."
      ]
    },
    "de": {
      "overview": "Das Fleisch wird häufig am Tisch gegrillt und mit Salatblättern und Beilagen gegessen.",
      "history": "Samgyeopsal ist in Koreas geselliger Grillkultur verbreitet.",
      "flavor": "Kräftig und röstig, ausgeglichen durch frische Beilagen.",
      "technique": "In angemessenen Portionen grillen und das Fett ablaufen lassen.",
      "essentials": [
        "600 g Schweinebauch in Scheiben",
        "Salatblätter",
        "Knoblauch"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30–45 Min.",
        "ingredients": [
          "600 g Schweinebauch in Scheiben",
          "Salatblätter",
          "Knoblauch",
          "Ssamjang",
          "Kimchi",
          "Reis"
        ],
        "steps": [
          "Fleisch auf einem heißen Grill oder in einer heißen Pfanne vollständig durchgaren.",
          "Mit sauberer Schere oder sauberem Messer in mundgerechte Stücke schneiden.",
          "Fleisch, Ssamjang und Beilagen in ein Salatblatt geben.",
          "Sofort servieren."
        ]
      },
      "variants": [
        "Die Dicke der Fleischscheiben variiert; das Fleisch kann unmariniert serviert werden."
      ],
      "serving": [
        "Mit Kimchi, Reis und Knoblauch servieren."
      ],
      "commonMistakes": [
        "Dieselben Utensilien nicht ohne Reinigung für rohes und gegartes Fleisch verwenden."
      ]
    }
  },
  "banh-xeo": {
    "en": {
      "overview": "A thin batter is fried until crisp and folded over the filling.",
      "history": "The dish exists in several regional forms in Vietnam.",
      "flavor": "Crisp, mildly spiced and fresh with herbs.",
      "technique": "Use a hot pan and a thin layer of batter.",
      "essentials": [
        "200 g rice flour",
        "300 ml water",
        "100 ml coconut milk"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "200 g rice flour",
          "300 ml water",
          "100 ml coconut milk",
          "½ tsp turmeric",
          "200 g prawns",
          "150 g bean sprouts",
          "oil"
        ],
        "steps": [
          "Mix the flour, water, coconut milk and turmeric.",
          "Fry the prawns until cooked through.",
          "Pour a thin layer of batter into a hot oiled pan.",
          "Add the prawns and sprouts, fry until crisp and fold."
        ]
      },
      "variants": [
        "Small pancakes in central Vietnam and larger versions in the south."
      ],
      "serving": [
        "Serve with lettuce, herbs and nước chấm."
      ],
      "commonMistakes": [
        "Avoid overly thick batter."
      ]
    },
    "fr": {
      "overview": "Une pâte fluide est cuite jusqu’à devenir croustillante, puis repliée sur la garniture.",
      "history": "Le plat existe sous plusieurs formes régionales au Vietnam.",
      "flavor": "Croustillant, légèrement épicé et frais grâce aux herbes.",
      "technique": "Utiliser une poêle chaude et une fine couche de pâte.",
      "essentials": [
        "200 g de farine de riz",
        "300 ml d’eau",
        "100 ml de lait de coco"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "200 g de farine de riz",
          "300 ml d’eau",
          "100 ml de lait de coco",
          "½ c. à café de curcuma",
          "200 g de crevettes",
          "150 g de pousses de haricot",
          "huile"
        ],
        "steps": [
          "Mélanger la farine, l’eau, le lait de coco et le curcuma.",
          "Faire revenir les crevettes jusqu’à cuisson complète.",
          "Verser une fine couche de pâte dans une poêle chaude huilée.",
          "Ajouter les crevettes et les pousses, cuire jusqu’à ce que la pâte soit croustillante, puis replier."
        ]
      },
      "variants": [
        "Petites crêpes dans le centre du Vietnam et versions plus grandes dans le sud."
      ],
      "serving": [
        "Servir avec de la laitue, des herbes et du nước chấm."
      ],
      "commonMistakes": [
        "Éviter une pâte trop épaisse."
      ]
    },
    "pt": {
      "overview": "Uma massa fina é frita até ficar crocante e dobrada sobre o recheio.",
      "history": "O prato existe em várias formas regionais no Vietname.",
      "flavor": "Crocante, ligeiramente condimentado e fresco com ervas.",
      "technique": "Use uma frigideira quente e uma camada fina de massa.",
      "essentials": [
        "200 g de farinha de arroz",
        "300 ml de água",
        "100 ml de leite de coco"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "200 g de farinha de arroz",
          "300 ml de água",
          "100 ml de leite de coco",
          "½ c. de chá de curcuma",
          "200 g de camarão",
          "150 g de rebentos de feijão",
          "óleo"
        ],
        "steps": [
          "Misture a farinha, a água, o leite de coco e a curcuma.",
          "Salteie o camarão até estar bem cozinhado.",
          "Verta uma camada fina de massa numa frigideira quente untada com óleo.",
          "Junte o camarão e os rebentos, cozinhe até ficar crocante e dobre."
        ]
      },
      "variants": [
        "Panquecas pequenas no centro do Vietname e versões maiores no sul."
      ],
      "serving": [
        "Sirva com alface, ervas e nước chấm."
      ],
      "commonMistakes": [
        "Evite uma massa demasiado espessa."
      ]
    },
    "es": {
      "overview": "Una masa fina se fríe hasta quedar crujiente y se dobla sobre el relleno.",
      "history": "El plato existe en varias formas regionales en Vietnam.",
      "flavor": "Crujiente, ligeramente especiado y fresco gracias a las hierbas.",
      "technique": "Usa una sartén caliente y una capa fina de masa.",
      "essentials": [
        "200 g de harina de arroz",
        "300 ml de agua",
        "100 ml de leche de coco"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "200 g de harina de arroz",
          "300 ml de agua",
          "100 ml de leche de coco",
          "½ cucharadita de cúrcuma",
          "200 g de gambas",
          "150 g de brotes de judía",
          "aceite"
        ],
        "steps": [
          "Mezcla la harina, el agua, la leche de coco y la cúrcuma.",
          "Saltea las gambas hasta que estén hechas por dentro.",
          "Vierte una capa fina de masa en una sartén caliente con aceite.",
          "Añade las gambas y los brotes, cocina hasta que esté crujiente y dobla."
        ]
      },
      "variants": [
        "Tortitas pequeñas en el centro de Vietnam y versiones más grandes en el sur."
      ],
      "serving": [
        "Sirve con lechuga, hierbas y nước chấm."
      ],
      "commonMistakes": [
        "Evita una masa demasiado espesa."
      ]
    },
    "de": {
      "overview": "Ein dünner Teig wird knusprig gebraten und über der Füllung zusammengeklappt.",
      "history": "Das Gericht gibt es in Vietnam in mehreren regionalen Varianten.",
      "flavor": "Knusprig, mild gewürzt und frisch durch Kräuter.",
      "technique": "Eine heiße Pfanne und eine dünne Teigschicht verwenden.",
      "essentials": [
        "200 g Reismehl",
        "300 ml Wasser",
        "100 ml Kokosmilch"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "200 g Reismehl",
          "300 ml Wasser",
          "100 ml Kokosmilch",
          "½ TL Kurkuma",
          "200 g Garnelen",
          "150 g Bohnensprossen",
          "Öl"
        ],
        "steps": [
          "Mehl, Wasser, Kokosmilch und Kurkuma mischen.",
          "Garnelen vollständig durchbraten.",
          "Eine dünne Teigschicht in eine heiße, geölte Pfanne gießen.",
          "Garnelen und Sprossen hinzufügen, knusprig braten und zusammenklappen."
        ]
      },
      "variants": [
        "Kleine Pfannkuchen in Zentralvietnam und größere Varianten im Süden."
      ],
      "serving": [
        "Mit Salat, Kräutern und Nước chấm servieren."
      ],
      "commonMistakes": [
        "Zu dicken Teig vermeiden."
      ]
    }
  },
  "bun-bo-hue": {
    "en": {
      "overview": "Round rice noodles are served in aromatic meat stock, often with fermented shrimp paste.",
      "history": "The dish is associated with Huế in central Vietnam.",
      "flavor": "Hot, rich and citrusy.",
      "technique": "Let the stock infuse with lemongrass and adjust the seasoning gradually.",
      "essentials": [
        "500 g beef for simmering",
        "1,5 l stock",
        "3 stalks lemongrass"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 2 hours",
        "ingredients": [
          "500 g beef for simmering",
          "1,5 l stock",
          "3 stalks lemongrass",
          "300 g thick rice noodles",
          "chilli oil",
          "fish sauce",
          "shrimp paste to taste"
        ],
        "steps": [
          "Simmer the meat in stock with bruised lemongrass until tender.",
          "Season with fish sauce, chilli and a little shrimp paste.",
          "Cook the noodles separately.",
          "Slice the meat and serve in the broth with the noodles."
        ]
      },
      "variants": [
        "Traditional versions may also contain pork and other meat products."
      ],
      "serving": [
        "Serve with lime, herbs and sliced onion."
      ],
      "commonMistakes": [
        "Do not overpower the broth with too much shrimp paste."
      ]
    },
    "fr": {
      "overview": "Des nouilles de riz rondes sont servies dans un bouillon de viande aromatique, souvent avec de la pâte de crevettes fermentée.",
      "history": "Le plat est associé à Huế, dans le centre du Vietnam.",
      "flavor": "Piquant, riche et aux notes d’agrumes.",
      "technique": "Laisser infuser le bouillon avec la citronnelle et rectifier progressivement l’assaisonnement.",
      "essentials": [
        "500 g de bœuf à mijoter",
        "1,5 l de bouillon",
        "3 tiges de citronnelle"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 2 heures",
        "ingredients": [
          "500 g de bœuf à mijoter",
          "1,5 l de bouillon",
          "3 tiges de citronnelle",
          "300 g de nouilles de riz épaisses",
          "huile pimentée",
          "sauce de poisson",
          "pâte de crevettes selon le goût"
        ],
        "steps": [
          "Laisser mijoter la viande dans le bouillon avec la citronnelle écrasée jusqu’à tendreté.",
          "Assaisonner avec de la sauce de poisson, du piment et un peu de pâte de crevettes.",
          "Cuire les nouilles séparément.",
          "Découper la viande et servir dans le bouillon avec les nouilles."
        ]
      },
      "variants": [
        "Les versions traditionnelles peuvent aussi contenir du porc et d’autres produits carnés."
      ],
      "serving": [
        "Servir avec du citron vert, des herbes et de l’oignon émincé."
      ],
      "commonMistakes": [
        "Ne pas masquer le goût du bouillon avec trop de pâte de crevettes."
      ]
    },
    "pt": {
      "overview": "Os noodles de arroz redondos são servidos num caldo de carne aromático, frequentemente com pasta de camarão fermentada.",
      "history": "O prato está associado a Huế, no centro do Vietname.",
      "flavor": "Picante, encorpado e com notas cítricas.",
      "technique": "Deixe o caldo ganhar sabor com a erva-príncipe e ajuste os temperos gradualmente.",
      "essentials": [
        "500 g de carne de vaca para cozer",
        "1,5 l de caldo",
        "3 talos de erva-príncipe"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 2 horas",
        "ingredients": [
          "500 g de carne de vaca para cozer",
          "1,5 l de caldo",
          "3 talos de erva-príncipe",
          "300 g de noodles de arroz grossos",
          "óleo de malagueta",
          "molho de peixe",
          "pasta de camarão a gosto"
        ],
        "steps": [
          "Deixe a carne cozinhar em lume brando no caldo com a erva-príncipe esmagada até ficar tenra.",
          "Tempere com molho de peixe, malagueta e um pouco de pasta de camarão.",
          "Coza os noodles separadamente.",
          "Corte a carne e sirva no caldo com os noodles."
        ]
      },
      "variants": [
        "As versões tradicionais podem também incluir carne de porco e outros produtos de carne."
      ],
      "serving": [
        "Sirva com lima, ervas e cebola às fatias."
      ],
      "commonMistakes": [
        "Não sobreponha demasiado o sabor da pasta de camarão ao do caldo."
      ]
    },
    "es": {
      "overview": "Los fideos redondos de arroz se sirven en un caldo de carne aromático, a menudo con pasta de gambas fermentada.",
      "history": "El plato se asocia con Huế, en el centro de Vietnam.",
      "flavor": "Picante, intenso y con notas cítricas.",
      "technique": "Deja infusionar el caldo con hierba limón y ajusta la sazón poco a poco.",
      "essentials": [
        "500 g de carne de vacuno para cocer",
        "1,5 l de caldo",
        "3 tallos de hierba limón"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 2 horas",
        "ingredients": [
          "500 g de carne de vacuno para cocer",
          "1,5 l de caldo",
          "3 tallos de hierba limón",
          "300 g de fideos de arroz gruesos",
          "aceite de chile",
          "salsa de pescado",
          "pasta de gambas al gusto"
        ],
        "steps": [
          "Cuece la carne a fuego lento en el caldo con la hierba limón machacada hasta que esté tierna.",
          "Sazona con salsa de pescado, chile y un poco de pasta de gambas.",
          "Cuece los fideos por separado.",
          "Corta la carne y sirve en el caldo con los fideos."
        ]
      },
      "variants": [
        "Las versiones tradicionales también pueden contener cerdo y otros productos cárnicos."
      ],
      "serving": [
        "Sirve con lima, hierbas y cebolla en rodajas."
      ],
      "commonMistakes": [
        "No enmascares el sabor del caldo con demasiada pasta de gambas."
      ]
    },
    "de": {
      "overview": "Runde Reisnudeln werden in aromatischer Fleischbrühe serviert, oft mit fermentierter Garnelenpaste.",
      "history": "Das Gericht ist mit Huế in Zentralvietnam verbunden.",
      "flavor": "Scharf, kräftig und zitrusbetont.",
      "technique": "Brühe mit Zitronengras ziehen lassen und nach und nach abschmecken.",
      "essentials": [
        "500 g Rindfleisch zum Kochen",
        "1,5 l Brühe",
        "3 Stängel Zitronengras"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 2 Stunden",
        "ingredients": [
          "500 g Rindfleisch zum Kochen",
          "1,5 l Brühe",
          "3 Stängel Zitronengras",
          "300 g dicke Reisnudeln",
          "Chiliöl",
          "Fischsauce",
          "Garnelenpaste nach Geschmack"
        ],
        "steps": [
          "Fleisch in Brühe mit angedrücktem Zitronengras weich ziehen lassen.",
          "Mit Fischsauce, Chili und etwas Garnelenpaste abschmecken.",
          "Nudeln getrennt kochen.",
          "Fleisch aufschneiden und mit den Nudeln in der Brühe servieren."
        ]
      },
      "variants": [
        "Traditionelle Varianten können auch Schweinefleisch und weitere Fleischprodukte enthalten."
      ],
      "serving": [
        "Mit Limette, Kräutern und geschnittener Zwiebel servieren."
      ],
      "commonMistakes": [
        "Brühe nicht mit zu viel Garnelenpaste überdecken."
      ]
    }
  },
  "cao-lau": {
    "en": {
      "overview": "Firm noodles are served with a little stock, seasoned meat and vegetables.",
      "history": "Cao lầu is closely associated with the local food culture of Hội An.",
      "flavor": "Salty and fresh with herbs, with contrasts between soft and crisp textures.",
      "technique": "Use firm noodles and concentrated cooking juices; the home version approximates the dish.",
      "essentials": [
        "300 g thick rice noodles",
        "400 g pork",
        "2 tbsp soy sauce"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 2 hours",
        "ingredients": [
          "300 g thick rice noodles",
          "400 g pork",
          "2 tbsp soy sauce",
          "garlic",
          "200 ml stock",
          "bean sprouts",
          "herbs",
          "crisp rice paper"
        ],
        "steps": [
          "Braise the pork with soy sauce, garlic and stock until tender.",
          "Cook the noodles according to the instructions.",
          "Slice the meat and divide the noodles and vegetables among bowls.",
          "Add a little cooking juice and crisp rice paper."
        ]
      },
      "variants": [
        "The home version uses readily available noodles instead of local cao lầu noodles."
      ],
      "serving": [
        "Serve with fresh herbs and lime to taste."
      ],
      "commonMistakes": [
        "Do not fill the bowl with stock as for a soup."
      ]
    },
    "fr": {
      "overview": "Des nouilles fermes sont servies avec un peu de bouillon, de la viande assaisonnée et des légumes.",
      "history": "Le cao lầu est étroitement lié à la culture culinaire locale de Hội An.",
      "flavor": "Salé et frais grâce aux herbes, avec des contrastes entre textures tendres et croustillantes.",
      "technique": "Utiliser des nouilles fermes et un jus de cuisson concentré ; la version maison s’inspire du plat.",
      "essentials": [
        "300 g de nouilles de riz épaisses",
        "400 g de porc",
        "2 c. à soupe de sauce soja"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 2 heures",
        "ingredients": [
          "300 g de nouilles de riz épaisses",
          "400 g de porc",
          "2 c. à soupe de sauce soja",
          "ail",
          "200 ml de bouillon",
          "pousses de haricot",
          "herbes",
          "feuilles de riz croustillantes"
        ],
        "steps": [
          "Braiser le porc avec la sauce soja, l’ail et le bouillon jusqu’à tendreté.",
          "Cuire les nouilles selon les instructions.",
          "Découper la viande et répartir les nouilles et les légumes dans des bols.",
          "Ajouter un peu de jus de cuisson et des feuilles de riz croustillantes."
        ]
      },
      "variants": [
        "La version maison utilise des nouilles faciles à trouver à la place des nouilles locales de cao lầu."
      ],
      "serving": [
        "Servir avec des herbes fraîches et du citron vert selon le goût."
      ],
      "commonMistakes": [
        "Ne pas remplir le bol de bouillon comme pour une soupe."
      ]
    },
    "pt": {
      "overview": "Noodles firmes são servidos com pouco caldo, carne temperada e legumes.",
      "history": "O cao lầu está intimamente ligado à cultura gastronómica local de Hội An.",
      "flavor": "Salgado e fresco com ervas, com contrastes entre texturas macias e crocantes.",
      "technique": "Use noodles firmes e molho de cozedura concentrado; a versão caseira procura reproduzir o prato.",
      "essentials": [
        "300 g de noodles de arroz grossos",
        "400 g de carne de porco",
        "2 c. de sopa de molho de soja"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 2 horas",
        "ingredients": [
          "300 g de noodles de arroz grossos",
          "400 g de carne de porco",
          "2 c. de sopa de molho de soja",
          "alho",
          "200 ml de caldo",
          "rebentos de feijão",
          "ervas",
          "papel de arroz crocante"
        ],
        "steps": [
          "Estufe a carne de porco com molho de soja, alho e caldo até ficar tenra.",
          "Coza os noodles de acordo com as instruções.",
          "Corte a carne e distribua os noodles e os legumes pelas tigelas.",
          "Junte um pouco do molho de cozedura e papel de arroz crocante."
        ]
      },
      "variants": [
        "A versão caseira usa noodles disponíveis em vez dos noodles locais de cao lầu."
      ],
      "serving": [
        "Sirva com ervas frescas e lima a gosto."
      ],
      "commonMistakes": [
        "Não encha a tigela de caldo como se fosse uma sopa."
      ]
    },
    "es": {
      "overview": "Los fideos firmes se sirven con poco caldo, carne condimentada y verduras.",
      "history": "El cao lầu está estrechamente ligado a la cultura culinaria local de Hội An.",
      "flavor": "Salado y fresco por las hierbas, con contrastes entre texturas suaves y crujientes.",
      "technique": "Usa fideos firmes y jugos de cocción concentrados; la versión casera imita el plato.",
      "essentials": [
        "300 g de fideos de arroz gruesos",
        "400 g de carne de cerdo",
        "2 cucharadas de salsa de soja"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 2 horas",
        "ingredients": [
          "300 g de fideos de arroz gruesos",
          "400 g de carne de cerdo",
          "2 cucharadas de salsa de soja",
          "ajo",
          "200 ml de caldo",
          "brotes de judía",
          "hierbas",
          "papel de arroz crujiente"
        ],
        "steps": [
          "Brasea el cerdo con salsa de soja, ajo y caldo hasta que esté tierno.",
          "Cuece los fideos según las instrucciones.",
          "Corta la carne y reparte los fideos y las verduras en boles.",
          "Añade un poco de jugo de cocción y papel de arroz crujiente."
        ]
      },
      "variants": [
        "La versión casera usa fideos fáciles de conseguir en lugar de los fideos locales de cao lầu."
      ],
      "serving": [
        "Sirve con hierbas frescas y lima al gusto."
      ],
      "commonMistakes": [
        "No llenes el bol de caldo como si fuera una sopa."
      ]
    },
    "de": {
      "overview": "Feste Nudeln werden mit wenig Brühe, gewürztem Fleisch und Gemüse serviert.",
      "history": "Cao lầu ist eng mit der lokalen Esskultur von Hội An verbunden.",
      "flavor": "Salzig und kräuterfrisch, mit Kontrasten zwischen weich und knusprig.",
      "technique": "Feste Nudeln und konzentrierten Bratensaft verwenden; die Hausvariante ist eine Annäherung an das Gericht.",
      "essentials": [
        "300 g dicke Reisnudeln",
        "400 g Schweinefleisch",
        "2 EL Sojasauce"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 2 Stunden",
        "ingredients": [
          "300 g dicke Reisnudeln",
          "400 g Schweinefleisch",
          "2 EL Sojasauce",
          "Knoblauch",
          "200 ml Brühe",
          "Bohnensprossen",
          "Kräuter",
          "knuspriges Reispapier"
        ],
        "steps": [
          "Schweinefleisch mit Sojasauce, Knoblauch und Brühe weich schmoren.",
          "Nudeln nach Anleitung kochen.",
          "Fleisch aufschneiden, Nudeln und Gemüse auf Schalen verteilen.",
          "Etwas Bratensaft und knuspriges Reispapier hinzufügen."
        ]
      },
      "variants": [
        "Die Hausvariante verwendet erhältliche Nudeln anstelle der lokalen Cao-lầu-Nudeln."
      ],
      "serving": [
        "Mit frischen Kräutern und Limette nach Geschmack servieren."
      ],
      "commonMistakes": [
        "Die Schale nicht wie bei einer Suppe mit Brühe füllen."
      ]
    }
  },
  "com-tam": {
    "en": {
      "overview": "Small rice grains are served with meat, pickled vegetables and a fish sauce dressing.",
      "history": "Cơm tấm is particularly associated with southern Vietnam and Ho Chi Minh City.",
      "flavor": "Slightly sweet, salty, roasted and fresh.",
      "technique": "Marinate the meat and prepare the rice separately.",
      "essentials": [
        "300 g broken rice",
        "4 pork chops",
        "2 tbsp fish sauce"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min + marinating",
        "ingredients": [
          "300 g broken rice",
          "4 pork chops",
          "2 tbsp fish sauce",
          "1 tbsp sugar",
          "garlic",
          "cucumber",
          "pickled carrot"
        ],
        "steps": [
          "Marinate the chops in fish sauce, sugar and garlic in the refrigerator.",
          "Cook the rice according to the packet instructions.",
          "Grill the meat until done.",
          "Serve with cucumber, pickled carrot and dressing."
        ]
      },
      "variants": [
        "It can also be served with steamed egg and meat pudding or shredded pork skin."
      ],
      "serving": [
        "Serve with nước chấm and spring onion oil."
      ],
      "commonMistakes": [
        "Avoid burning the sugary marinade."
      ]
    },
    "fr": {
      "overview": "De petits grains de riz sont servis avec de la viande, des légumes marinés et un assaisonnement à base de sauce de poisson.",
      "history": "Le cơm tấm est particulièrement associé au sud du Vietnam et à Hô Chi Minh-Ville.",
      "flavor": "Légèrement sucré, salé, grillé et frais.",
      "technique": "Faire mariner la viande et préparer le riz séparément.",
      "essentials": [
        "300 g de riz brisé",
        "4 côtelettes de porc",
        "2 c. à soupe de sauce de poisson"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min + marinade",
        "ingredients": [
          "300 g de riz brisé",
          "4 côtelettes de porc",
          "2 c. à soupe de sauce de poisson",
          "1 c. à soupe de sucre",
          "ail",
          "concombre",
          "carotte marinée"
        ],
        "steps": [
          "Faire mariner les côtelettes au réfrigérateur avec la sauce de poisson, le sucre et l’ail.",
          "Cuire le riz selon les instructions du paquet.",
          "Griller la viande jusqu’à cuisson complète.",
          "Servir avec du concombre, de la carotte marinée et l’assaisonnement."
        ]
      },
      "variants": [
        "On peut aussi le servir avec un flan de viande et d’œufs cuit à la vapeur ou de la couenne de porc effilée."
      ],
      "serving": [
        "Servir avec du nước chấm et de l’huile aux oignons nouveaux."
      ],
      "commonMistakes": [
        "Éviter de brûler la marinade sucrée."
      ]
    },
    "pt": {
      "overview": "Os pequenos grãos de arroz são servidos com carne, legumes em conserva e um tempero de molho de peixe.",
      "history": "O cơm tấm está especialmente associado ao sul do Vietname e à Cidade de Ho Chi Minh.",
      "flavor": "Ligeiramente doce, salgado, tostado e fresco.",
      "technique": "Marine a carne e prepare o arroz separadamente.",
      "essentials": [
        "300 g de arroz partido",
        "4 costeletas de porco",
        "2 c. de sopa de molho de peixe"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min + marinada",
        "ingredients": [
          "300 g de arroz partido",
          "4 costeletas de porco",
          "2 c. de sopa de molho de peixe",
          "1 c. de sopa de açúcar",
          "alho",
          "pepino",
          "cenoura em conserva"
        ],
        "steps": [
          "Marine as costeletas no frigorífico com molho de peixe, açúcar e alho.",
          "Coza o arroz de acordo com as instruções da embalagem.",
          "Grelhe a carne até estar cozinhada.",
          "Sirva com pepino, cenoura em conserva e o tempero."
        ]
      },
      "variants": [
        "Também pode ser servido com pudim de ovo e carne cozido a vapor ou pele de porco cortada em tiras finas."
      ],
      "serving": [
        "Sirva com nước chấm e óleo de cebolinha verde."
      ],
      "commonMistakes": [
        "Evite queimar a marinada açucarada."
      ]
    },
    "es": {
      "overview": "Los granos pequeños de arroz se sirven con carne, verduras encurtidas y un aliño de salsa de pescado.",
      "history": "El cơm tấm se asocia especialmente con el sur de Vietnam y Ciudad Ho Chi Minh.",
      "flavor": "Ligeramente dulce, salado, tostado y fresco.",
      "technique": "Marina la carne y prepara el arroz por separado.",
      "essentials": [
        "300 g de arroz partido",
        "4 chuletas de cerdo",
        "2 cucharadas de salsa de pescado"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min + marinado",
        "ingredients": [
          "300 g de arroz partido",
          "4 chuletas de cerdo",
          "2 cucharadas de salsa de pescado",
          "1 cucharada de azúcar",
          "ajo",
          "pepino",
          "zanahoria encurtida"
        ],
        "steps": [
          "Marina las chuletas en el frigorífico con salsa de pescado, azúcar y ajo.",
          "Cuece el arroz según las instrucciones del envase.",
          "Asa la carne hasta que esté hecha.",
          "Sirve con pepino, zanahoria encurtida y el aliño."
        ]
      },
      "variants": [
        "También se puede servir con un pudin de huevo y carne al vapor o piel de cerdo en tiras finas."
      ],
      "serving": [
        "Sirve con nước chấm y aceite de cebolleta."
      ],
      "commonMistakes": [
        "Evita quemar la marinada azucarada."
      ]
    },
    "de": {
      "overview": "Kleine Reiskörner werden mit Fleisch, eingelegtem Gemüse und Fischsaucendressing serviert.",
      "history": "Cơm tấm ist besonders mit Südvietnam und Ho-Chi-Minh-Stadt verbunden.",
      "flavor": "Süßlich, salzig, röstig und frisch.",
      "technique": "Fleisch marinieren und Reis separat zubereiten.",
      "essentials": [
        "300 g Bruchreis",
        "4 Schweinekoteletts",
        "2 EL Fischsauce"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min. + Marinierzeit",
        "ingredients": [
          "300 g Bruchreis",
          "4 Schweinekoteletts",
          "2 EL Fischsauce",
          "1 EL Zucker",
          "Knoblauch",
          "Gurke",
          "eingelegte Karotte"
        ],
        "steps": [
          "Koteletts mit Fischsauce, Zucker und Knoblauch im Kühlschrank marinieren.",
          "Reis nach Packungsanleitung kochen.",
          "Fleisch fertig grillen.",
          "Mit Gurke, eingelegter Karotte und Dressing servieren."
        ]
      },
      "variants": [
        "Kann auch mit gedämpftem Eier-Fleisch-Pudding oder fein geschnittener Schweineschwarte serviert werden."
      ],
      "serving": [
        "Mit Nước chấm und Frühlingszwiebelöl servieren."
      ],
      "commonMistakes": [
        "Die zuckerhaltige Marinade nicht verbrennen lassen."
      ]
    }
  },
  "bun-rieu": {
    "en": {
      "overview": "The broth gets acidity from tomatoes and flavour from crab or other seafood products.",
      "history": "Bún riêu exists in several regional and local versions in Vietnam.",
      "flavor": "Tangy, fresh and rich in umami.",
      "technique": "Let the tomato broth simmer and add the crab mixture gently.",
      "essentials": [
        "300 g rice noodles",
        "1 l stock",
        "400 g tomatoes"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "300 g rice noodles",
          "1 l stock",
          "400 g tomatoes",
          "200 g crab meat",
          "2 eggs",
          "200 g tofu",
          "fish sauce"
        ],
        "steps": [
          "Cook the tomatoes in stock until soft.",
          "Mix the crab meat with the eggs and place small portions in the simmering broth.",
          "Cook the egg mixture through and add the tofu.",
          "Cook the noodles separately and serve with the broth."
        ]
      },
      "variants": [
        "Versions with snails, tofu or various meat products."
      ],
      "serving": [
        "Serve with herbs and lime."
      ],
      "commonMistakes": [
        "Do not stir vigorously while the crab mixture sets."
      ]
    },
    "fr": {
      "overview": "Le bouillon tire son acidité des tomates et sa saveur du crabe ou d’autres produits de la mer.",
      "history": "Le bún riêu existe en plusieurs variantes régionales et locales au Vietnam.",
      "flavor": "Acidulé, frais et riche en umami.",
      "technique": "Laisser mijoter le bouillon de tomates et ajouter délicatement le mélange au crabe.",
      "essentials": [
        "300 g de nouilles de riz",
        "1 l de bouillon",
        "400 g de tomates"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "300 g de nouilles de riz",
          "1 l de bouillon",
          "400 g de tomates",
          "200 g de chair de crabe",
          "2 œufs",
          "200 g de tofu",
          "sauce de poisson"
        ],
        "steps": [
          "Cuire les tomates dans le bouillon jusqu’à ce qu’elles soient tendres.",
          "Mélanger la chair de crabe avec les œufs et déposer de petites portions dans le bouillon frémissant.",
          "Laisser cuire complètement le mélange aux œufs et ajouter le tofu.",
          "Cuire les nouilles séparément et servir avec le bouillon."
        ]
      },
      "variants": [
        "Variantes aux escargots, au tofu ou à divers produits carnés."
      ],
      "serving": [
        "Servir avec des herbes et du citron vert."
      ],
      "commonMistakes": [
        "Ne pas remuer vigoureusement pendant que le mélange au crabe prend."
      ]
    },
    "pt": {
      "overview": "O caldo ganha acidez com o tomate e sabor com o caranguejo ou outros produtos do mar.",
      "history": "O bún riêu existe em várias versões regionais e locais no Vietname.",
      "flavor": "Ácido, fresco e rico em umami.",
      "technique": "Deixe o caldo de tomate cozinhar em lume brando e junte cuidadosamente a mistura de caranguejo.",
      "essentials": [
        "300 g de noodles de arroz",
        "1 l de caldo",
        "400 g de tomate"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "300 g de noodles de arroz",
          "1 l de caldo",
          "400 g de tomate",
          "200 g de carne de caranguejo",
          "2 ovos",
          "200 g de tofu",
          "molho de peixe"
        ],
        "steps": [
          "Coza o tomate no caldo até ficar macio.",
          "Misture a carne de caranguejo com os ovos e coloque pequenas porções no caldo em lume brando.",
          "Deixe a mistura de ovos cozer completamente e junte o tofu.",
          "Coza os noodles separadamente e sirva com o caldo."
        ]
      },
      "variants": [
        "Variantes com caracóis, tofu ou vários produtos de carne."
      ],
      "serving": [
        "Sirva com ervas e lima."
      ],
      "commonMistakes": [
        "Não mexa vigorosamente enquanto a mistura de caranguejo solidifica."
      ]
    },
    "es": {
      "overview": "El caldo obtiene acidez del tomate y sabor del cangrejo u otros productos del mar.",
      "history": "El bún riêu existe en varias versiones regionales y locales en Vietnam.",
      "flavor": "Ácido, fresco y rico en umami.",
      "technique": "Deja cocer el caldo de tomate a fuego lento y añade con cuidado la mezcla de cangrejo.",
      "essentials": [
        "300 g de fideos de arroz",
        "1 l de caldo",
        "400 g de tomates"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "300 g de fideos de arroz",
          "1 l de caldo",
          "400 g de tomates",
          "200 g de carne de cangrejo",
          "2 huevos",
          "200 g de tofu",
          "salsa de pescado"
        ],
        "steps": [
          "Cuece los tomates en el caldo hasta que estén blandos.",
          "Mezcla la carne de cangrejo con los huevos y deposita pequeñas porciones en el caldo a fuego lento.",
          "Deja que la mezcla de huevo se cocine por completo y añade el tofu.",
          "Cuece los fideos por separado y sirve con el caldo."
        ]
      },
      "variants": [
        "Variantes con caracoles, tofu o diversos productos cárnicos."
      ],
      "serving": [
        "Sirve con hierbas y lima."
      ],
      "commonMistakes": [
        "No remuevas enérgicamente mientras cuaja la mezcla de cangrejo."
      ]
    },
    "de": {
      "overview": "Die Brühe erhält Säure von Tomaten und Geschmack von Krabben oder anderen Meeresfrüchten.",
      "history": "Bún riêu gibt es in Vietnam in mehreren regionalen und lokalen Varianten.",
      "flavor": "Säuerlich, frisch und reich an Umami.",
      "technique": "Tomatenbrühe köcheln lassen und die Krabbenmasse vorsichtig hinzufügen.",
      "essentials": [
        "300 g Reisnudeln",
        "1 l Brühe",
        "400 g Tomaten"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "300 g Reisnudeln",
          "1 l Brühe",
          "400 g Tomaten",
          "200 g Krabbenfleisch",
          "2 Eier",
          "200 g Tofu",
          "Fischsauce"
        ],
        "steps": [
          "Tomaten in der Brühe weich kochen.",
          "Krabbenfleisch mit Eiern mischen und kleine Portionen in die köchelnde Brühe geben.",
          "Eiermasse vollständig durchgaren und Tofu hinzufügen.",
          "Nudeln separat kochen und mit der Brühe servieren."
        ]
      },
      "variants": [
        "Varianten mit Schnecken, Tofu oder verschiedenen Fleischprodukten."
      ],
      "serving": [
        "Mit Kräutern und Limette servieren."
      ],
      "commonMistakes": [
        "Nicht kräftig rühren, während die Krabbenmasse stockt."
      ]
    }
  },
  "banh-cuon": {
    "en": {
      "overview": "Soft rice sheets are filled with fried meat and finely chopped mushrooms.",
      "history": "The dish is particularly well known in northern Vietnamese breakfast traditions.",
      "flavor": "Soft, mild and aromatic, with a salty, tangy dip.",
      "technique": "Use thin batter and a short steaming time; a pan with a lid can be used at home.",
      "essentials": [
        "150 g rice flour",
        "50 g tapioca starch",
        "450 ml water"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "150 g rice flour",
          "50 g tapioca starch",
          "450 ml water",
          "250 g minced pork",
          "30 g dried wood ear mushrooms",
          "onion",
          "oil"
        ],
        "steps": [
          "Mix the flour, starch and water and let the batter rest.",
          "Soak the mushrooms and fry them with the onion and meat until cooked through.",
          "Pour a thin layer of batter into a lightly oiled pan, cover and steam until the sheet sets.",
          "Carefully lift out the sheet, fill and roll."
        ]
      },
      "variants": [
        "Bánh cuốn can also be served without a meat filling."
      ],
      "serving": [
        "Serve with fried shallots and nước chấm."
      ],
      "commonMistakes": [
        "Do not fry the rice sheets until crisp."
      ]
    },
    "fr": {
      "overview": "De tendres feuilles de riz sont garnies de viande poêlée et de champignons finement hachés.",
      "history": "Le plat est particulièrement connu dans les traditions du petit-déjeuner du nord du Vietnam.",
      "flavor": "Tendre, doux et aromatique, avec une sauce à tremper salée et acidulée.",
      "technique": "Utiliser une pâte fluide et une cuisson vapeur courte ; une poêle avec couvercle convient à la maison.",
      "essentials": [
        "150 g de farine de riz",
        "50 g de fécule de tapioca",
        "450 ml d’eau"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "150 g de farine de riz",
          "50 g de fécule de tapioca",
          "450 ml d’eau",
          "250 g de porc haché",
          "30 g de champignons noirs séchés",
          "oignon",
          "huile"
        ],
        "steps": [
          "Mélanger la farine, la fécule et l’eau, puis laisser reposer la pâte.",
          "Faire tremper les champignons et les faire revenir avec l’oignon et la viande jusqu’à cuisson complète.",
          "Verser une fine couche de pâte dans une poêle légèrement huilée, couvrir et cuire à la vapeur jusqu’à ce que la feuille prenne.",
          "Retirer délicatement la feuille, la garnir et la rouler."
        ]
      },
      "variants": [
        "Les bánh cuốn peuvent aussi être servis sans garniture de viande."
      ],
      "serving": [
        "Servir avec des échalotes frites et du nước chấm."
      ],
      "commonMistakes": [
        "Ne pas faire cuire les feuilles de riz jusqu’à ce qu’elles deviennent croustillantes."
      ]
    },
    "pt": {
      "overview": "Folhas macias de arroz são recheadas com carne salteada e cogumelos finamente picados.",
      "history": "O prato é especialmente conhecido na tradição de pequeno-almoço do norte do Vietname.",
      "flavor": "Macio, suave e aromático, com um molho salgado e ácido.",
      "technique": "Use uma massa fina e pouco tempo de cozedura a vapor; em casa pode usar uma frigideira com tampa.",
      "essentials": [
        "150 g de farinha de arroz",
        "50 g de amido de tapioca",
        "450 ml de água"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "150 g de farinha de arroz",
          "50 g de amido de tapioca",
          "450 ml de água",
          "250 g de carne de porco picada",
          "30 g de cogumelos orelha-de-judas secos",
          "cebola",
          "óleo"
        ],
        "steps": [
          "Misture a farinha, o amido e a água e deixe a massa repousar.",
          "Demolhe os cogumelos e salteie-os com a cebola e a carne até estarem bem cozinhados.",
          "Verta uma camada fina de massa numa frigideira ligeiramente untada, tape e coza a vapor até a folha firmar.",
          "Retire cuidadosamente a folha, recheie e enrole."
        ]
      },
      "variants": [
        "Os bánh cuốn também podem ser servidos sem recheio de carne."
      ],
      "serving": [
        "Sirva com chalotas fritas e nước chấm."
      ],
      "commonMistakes": [
        "Não cozinhe as folhas de arroz até ficarem crocantes."
      ]
    },
    "es": {
      "overview": "Las láminas suaves de arroz se rellenan con carne salteada y setas finamente picadas.",
      "history": "El plato es especialmente conocido en la tradición del desayuno del norte de Vietnam.",
      "flavor": "Suave, delicado y aromático, con una salsa salada y ácida para mojar.",
      "technique": "Usa una masa fina y un tiempo breve de cocción al vapor; en casa puedes usar una sartén con tapa.",
      "essentials": [
        "150 g de harina de arroz",
        "50 g de almidón de tapioca",
        "450 ml de agua"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "150 g de harina de arroz",
          "50 g de almidón de tapioca",
          "450 ml de agua",
          "250 g de carne de cerdo picada",
          "30 g de setas oreja de Judas secas",
          "cebolla",
          "aceite"
        ],
        "steps": [
          "Mezcla la harina, el almidón y el agua y deja reposar la masa.",
          "Remoja las setas y saltéalas con la cebolla y la carne hasta que estén hechas por dentro.",
          "Vierte una capa fina de masa en una sartén ligeramente aceitada, tapa y cuece al vapor hasta que cuaje la lámina.",
          "Retira con cuidado la lámina, rellena y enrolla."
        ]
      },
      "variants": [
        "Los bánh cuốn también pueden servirse sin relleno de carne."
      ],
      "serving": [
        "Sirve con chalotas fritas y nước chấm."
      ],
      "commonMistakes": [
        "No cocines las láminas de arroz hasta que queden crujientes."
      ]
    },
    "de": {
      "overview": "Weiche Reisblätter werden mit gebratenem Fleisch und fein gehackten Pilzen gefüllt.",
      "history": "Das Gericht ist besonders aus der nordvietnamesischen Frühstückstradition bekannt.",
      "flavor": "Weich, mild und aromatisch mit einem salzig-säuerlichen Dip.",
      "technique": "Dünnen Teig und kurze Dämpfzeit verwenden; zu Hause eignet sich eine Pfanne mit Deckel.",
      "essentials": [
        "150 g Reismehl",
        "50 g Tapiokastärke",
        "450 ml Wasser"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "150 g Reismehl",
          "50 g Tapiokastärke",
          "450 ml Wasser",
          "250 g Schweinehackfleisch",
          "30 g getrocknete Mu-Err-Pilze",
          "Zwiebel",
          "Öl"
        ],
        "steps": [
          "Mehl, Stärke und Wasser mischen und den Teig ruhen lassen.",
          "Pilze einweichen und mit Zwiebel und Fleisch vollständig durchbraten.",
          "Eine dünne Teigschicht in eine leicht geölte Pfanne gießen, abdecken und dämpfen, bis das Blatt fest wird.",
          "Das Blatt vorsichtig herausheben, füllen und aufrollen."
        ]
      },
      "variants": [
        "Bánh cuốn können auch ohne Fleischfüllung serviert werden."
      ],
      "serving": [
        "Mit gebratenen Schalotten und Nước chấm servieren."
      ],
      "commonMistakes": [
        "Reisblätter nicht knusprig braten."
      ]
    }
  },
  "massaman-curry": {
    "en": {
      "overview": "Meat and potatoes simmer in a rich sauce with massaman paste.",
      "history": "Massaman is a Thai curry tradition with Muslim and South Asian culinary connections.",
      "flavor": "Mildly hot, slightly sweet, tangy and nutty.",
      "technique": "Let the meat become tender before finishing the potatoes.",
      "essentials": [
        "500 g stewing beef",
        "400 ml coconut milk",
        "3 tbsp massaman paste"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 2 hours",
        "ingredients": [
          "500 g stewing beef",
          "400 ml coconut milk",
          "3 tbsp massaman paste",
          "300 g potatoes",
          "1 onion",
          "50 g peanuts",
          "tamarind and fish sauce"
        ],
        "steps": [
          "Fry the curry paste in a little coconut milk.",
          "Add the meat and the remaining coconut milk; simmer until tender.",
          "Add the potatoes and onion and cook until tender.",
          "Season with tamarind and fish sauce and top with peanuts."
        ]
      },
      "variants": [
        "Chicken and tofu can be used instead of beef."
      ],
      "serving": [
        "Serve with jasmine rice."
      ],
      "commonMistakes": [
        "Do not cook the potatoes as long as tough stewing meat."
      ]
    },
    "fr": {
      "overview": "La viande et les pommes de terre mijotent dans une sauce riche à la pâte de massaman.",
      "history": "Le massaman est une tradition de curry thaïlandaise liée aux cuisines musulmanes et sud-asiatiques.",
      "flavor": "Légèrement piquant, légèrement sucré, acidulé et aux notes de noix.",
      "technique": "Laisser la viande s’attendrir avant de terminer la cuisson des pommes de terre.",
      "essentials": [
        "500 g de bœuf à mijoter",
        "400 ml de lait de coco",
        "3 c. à soupe de pâte de massaman"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 2 heures",
        "ingredients": [
          "500 g de bœuf à mijoter",
          "400 ml de lait de coco",
          "3 c. à soupe de pâte de massaman",
          "300 g de pommes de terre",
          "1 oignon",
          "50 g de cacahuètes",
          "tamarin et sauce de poisson"
        ],
        "steps": [
          "Faire revenir la pâte de curry dans un peu de lait de coco.",
          "Ajouter la viande et le reste du lait de coco ; laisser mijoter jusqu’à tendreté.",
          "Ajouter les pommes de terre et l’oignon et cuire jusqu’à tendreté.",
          "Assaisonner avec le tamarin et la sauce de poisson, puis garnir de cacahuètes."
        ]
      },
      "variants": [
        "Le poulet et le tofu peuvent remplacer le bœuf."
      ],
      "serving": [
        "Servir avec du riz jasmin."
      ],
      "commonMistakes": [
        "Ne pas cuire les pommes de terre aussi longtemps qu’une viande à mijoter coriace."
      ]
    },
    "pt": {
      "overview": "A carne e as batatas cozinham em lume brando num molho rico com pasta massaman.",
      "history": "O massaman é uma tradição de caril tailandês com ligações culinárias muçulmanas e sul-asiáticas.",
      "flavor": "Ligeiramente picante, doce, ácido e com notas de frutos secos.",
      "technique": "Deixe a carne ficar tenra antes de terminar a cozedura das batatas.",
      "essentials": [
        "500 g de carne de vaca para estufar",
        "400 ml de leite de coco",
        "3 c. de sopa de pasta massaman"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 2 horas",
        "ingredients": [
          "500 g de carne de vaca para estufar",
          "400 ml de leite de coco",
          "3 c. de sopa de pasta massaman",
          "300 g de batatas",
          "1 cebola",
          "50 g de amendoins",
          "tamarindo e molho de peixe"
        ],
        "steps": [
          "Salteie a pasta de caril num pouco de leite de coco.",
          "Junte a carne e o restante leite de coco; deixe cozinhar em lume brando até ficar tenra.",
          "Junte as batatas e a cebola e coza até ficarem tenras.",
          "Tempere com tamarindo e molho de peixe e cubra com amendoins."
        ]
      },
      "variants": [
        "Pode usar frango e tofu em vez de carne de vaca."
      ],
      "serving": [
        "Sirva com arroz jasmim."
      ],
      "commonMistakes": [
        "Não coza as batatas durante tanto tempo como a carne rija de estufar."
      ]
    },
    "es": {
      "overview": "La carne y las patatas se cuecen a fuego lento en una salsa intensa con pasta massaman.",
      "history": "El massaman es una tradición de curri tailandés con vínculos culinarios musulmanes y del sur de Asia.",
      "flavor": "Ligeramente picante, dulce, ácido y con notas de frutos secos.",
      "technique": "Deja que la carne quede tierna antes de terminar de cocer las patatas.",
      "essentials": [
        "500 g de carne de vacuno para guisar",
        "400 ml de leche de coco",
        "3 cucharadas de pasta massaman"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 2 horas",
        "ingredients": [
          "500 g de carne de vacuno para guisar",
          "400 ml de leche de coco",
          "3 cucharadas de pasta massaman",
          "300 g de patatas",
          "1 cebolla",
          "50 g de cacahuetes",
          "tamarindo y salsa de pescado"
        ],
        "steps": [
          "Sofríe la pasta de curri en un poco de leche de coco.",
          "Añade la carne y el resto de la leche de coco; cuece a fuego lento hasta que esté tierna.",
          "Añade las patatas y la cebolla y cuece hasta que estén tiernas.",
          "Sazona con tamarindo y salsa de pescado y añade cacahuetes por encima."
        ]
      },
      "variants": [
        "Se puede usar pollo y tofu en lugar de carne de vacuno."
      ],
      "serving": [
        "Sirve con arroz jazmín."
      ],
      "commonMistakes": [
        "No cuezas las patatas tanto tiempo como la carne dura de guisar."
      ]
    },
    "de": {
      "overview": "Fleisch und Kartoffeln ziehen in einer reichhaltigen Sauce mit Massaman-Paste.",
      "history": "Massaman ist eine thailändische Currytradition mit muslimischen und südasiatischen kulinarischen Verbindungen.",
      "flavor": "Mild scharf, süßlich, säuerlich und nussig.",
      "technique": "Fleisch weich garen, bevor die Kartoffeln fertig gekocht werden.",
      "essentials": [
        "500 g Rindfleisch zum Schmoren",
        "400 ml Kokosmilch",
        "3 EL Massaman-Paste"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 2 Stunden",
        "ingredients": [
          "500 g Rindfleisch zum Schmoren",
          "400 ml Kokosmilch",
          "3 EL Massaman-Paste",
          "300 g Kartoffeln",
          "1 Zwiebel",
          "50 g Erdnüsse",
          "Tamarinde und Fischsauce"
        ],
        "steps": [
          "Currypaste in etwas Kokosmilch anbraten.",
          "Fleisch und übrige Kokosmilch hinzufügen und weich ziehen lassen.",
          "Kartoffeln und Zwiebel hinzufügen und weich kochen.",
          "Mit Tamarinde und Fischsauce abschmecken und mit Erdnüssen garnieren."
        ]
      },
      "variants": [
        "Hähnchen und Tofu können statt Rindfleisch verwendet werden."
      ],
      "serving": [
        "Mit Jasminreis servieren."
      ],
      "commonMistakes": [
        "Kartoffeln nicht so lange garen wie zähes Schmorfleisch."
      ]
    }
  },
  "panang-curry": {
    "en": {
      "overview": "Panang often has a thicker sauce than many other Thai curries.",
      "history": "The dish is an established part of Thai curry culture.",
      "flavor": "Creamy, salty, slightly sweet and aromatic.",
      "technique": "Gently reduce the coconut milk before adding the meat.",
      "essentials": [
        "400 g thinly sliced beef",
        "400 ml coconut milk",
        "2 tbsp panang paste"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 25–40 min",
        "ingredients": [
          "400 g thinly sliced beef",
          "400 ml coconut milk",
          "2 tbsp panang paste",
          "4 makrut lime leaves",
          "fish sauce",
          "palm sugar"
        ],
        "steps": [
          "Fry the paste in the thick part of the coconut milk.",
          "Add the rest of the milk and let the sauce thicken a little.",
          "Add the meat and cook until done.",
          "Season with fish sauce and sugar; top with finely sliced lime leaves."
        ]
      },
      "variants": [
        "Versions with chicken or tofu."
      ],
      "serving": [
        "Serve with rice."
      ],
      "commonMistakes": [
        "Do not unnecessarily dilute the sauce with a lot of water."
      ]
    },
    "fr": {
      "overview": "Le panang a souvent une sauce plus épaisse que beaucoup d’autres currys thaïlandais.",
      "history": "Le plat fait partie intégrante de la culture thaïlandaise du curry.",
      "flavor": "Crémeux, salé, légèrement sucré et aromatique.",
      "technique": "Faire réduire doucement le lait de coco avant d’ajouter la viande.",
      "essentials": [
        "400 g de bœuf en fines tranches",
        "400 ml de lait de coco",
        "2 c. à soupe de pâte de panang"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 25–40 min",
        "ingredients": [
          "400 g de bœuf en fines tranches",
          "400 ml de lait de coco",
          "2 c. à soupe de pâte de panang",
          "4 feuilles de combava",
          "sauce de poisson",
          "sucre de palme"
        ],
        "steps": [
          "Faire revenir la pâte dans la partie épaisse du lait de coco.",
          "Ajouter le reste du lait et laisser la sauce épaissir légèrement.",
          "Ajouter la viande et cuire jusqu’à ce qu’elle soit cuite.",
          "Assaisonner avec la sauce de poisson et le sucre ; garnir de feuilles de combava finement émincées."
        ]
      },
      "variants": [
        "Variantes au poulet ou au tofu."
      ],
      "serving": [
        "Servir avec du riz."
      ],
      "commonMistakes": [
        "Ne pas diluer inutilement la sauce avec beaucoup d’eau."
      ]
    },
    "pt": {
      "overview": "O panang tem geralmente um molho mais espesso do que muitos outros caris tailandeses.",
      "history": "O prato é uma parte estabelecida da cultura tailandesa do caril.",
      "flavor": "Cremoso, salgado, ligeiramente doce e aromático.",
      "technique": "Reduza suavemente o leite de coco antes de juntar a carne.",
      "essentials": [
        "400 g de carne de vaca em fatias finas",
        "400 ml de leite de coco",
        "2 c. de sopa de pasta panang"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 25–40 min",
        "ingredients": [
          "400 g de carne de vaca em fatias finas",
          "400 ml de leite de coco",
          "2 c. de sopa de pasta panang",
          "4 folhas de lima-makrut",
          "molho de peixe",
          "açúcar de palma"
        ],
        "steps": [
          "Salteie a pasta na parte espessa do leite de coco.",
          "Junte o restante leite e deixe o molho engrossar um pouco.",
          "Junte a carne e cozinhe até estar pronta.",
          "Tempere com molho de peixe e açúcar; cubra com folhas de lima cortadas finamente."
        ]
      },
      "variants": [
        "Variantes com frango ou tofu."
      ],
      "serving": [
        "Sirva com arroz."
      ],
      "commonMistakes": [
        "Não dilua desnecessariamente o molho com muita água."
      ]
    },
    "es": {
      "overview": "El panang suele tener una salsa más espesa que muchos otros curris tailandeses.",
      "history": "El plato forma parte consolidada de la cultura tailandesa del curri.",
      "flavor": "Cremoso, salado, ligeramente dulce y aromático.",
      "technique": "Reduce suavemente la leche de coco antes de añadir la carne.",
      "essentials": [
        "400 g de carne de vacuno en láminas finas",
        "400 ml de leche de coco",
        "2 cucharadas de pasta panang"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 25–40 min",
        "ingredients": [
          "400 g de carne de vacuno en láminas finas",
          "400 ml de leche de coco",
          "2 cucharadas de pasta panang",
          "4 hojas de lima makrut",
          "salsa de pescado",
          "azúcar de palma"
        ],
        "steps": [
          "Sofríe la pasta en la parte espesa de la leche de coco.",
          "Añade el resto de la leche y deja que la salsa espese un poco.",
          "Añade la carne y cocina hasta que esté hecha.",
          "Sazona con salsa de pescado y azúcar; añade hojas de lima cortadas en tiras finas."
        ]
      },
      "variants": [
        "Variantes con pollo o tofu."
      ],
      "serving": [
        "Sirve con arroz."
      ],
      "commonMistakes": [
        "No diluyas innecesariamente la salsa con mucha agua."
      ]
    },
    "de": {
      "overview": "Panang hat häufig eine dickere Sauce als viele andere thailändische Currys.",
      "history": "Das Gericht ist ein etablierter Bestandteil der thailändischen Currykultur.",
      "flavor": "Cremig, salzig, süßlich und aromatisch.",
      "technique": "Kokosmilch vorsichtig einkochen, bevor das Fleisch hinzukommt.",
      "essentials": [
        "400 g Rindfleisch in dünnen Scheiben",
        "400 ml Kokosmilch",
        "2 EL Panang-Paste"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 25–40 Min.",
        "ingredients": [
          "400 g Rindfleisch in dünnen Scheiben",
          "400 ml Kokosmilch",
          "2 EL Panang-Paste",
          "4 Makrutlimettenblätter",
          "Fischsauce",
          "Palmzucker"
        ],
        "steps": [
          "Paste im dickflüssigen Teil der Kokosmilch anbraten.",
          "Restliche Kokosmilch hinzufügen und die Sauce etwas eindicken lassen.",
          "Fleisch hinzufügen und fertig garen.",
          "Mit Fischsauce und Zucker abschmecken; mit fein geschnittenen Limettenblättern garnieren."
        ]
      },
      "variants": [
        "Varianten mit Hähnchen oder Tofu."
      ],
      "serving": [
        "Mit Reis servieren."
      ],
      "commonMistakes": [
        "Sauce nicht unnötig mit viel Wasser verdünnen."
      ]
    }
  }
} as const satisfies Readonly<Record<string, Record<InternationalSummaryLocale, ArticleBody>>>;
