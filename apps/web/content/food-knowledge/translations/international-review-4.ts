import type { FoodKnowledgeArticle } from "../types.ts";
import type { InternationalSummaryLocale } from "../../../lib/international-summary-drafts.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
// Review-only bodies. Compose with translated summaries and untouched original IDs/sources after review.
export const draftInternationalArticles4 = {
  "feijoada": {
    "en": {
      "overview": "Beans are cooked with meat and aromatics to form a thick, dark broth.",
      "history": "Feijoada is a well-known Brazilian communal meal. Accounts of its precise origins are disputed.",
      "flavor": "Rich, salty and earthy, often smoky.",
      "technique": "Soak dried beans and cook until very tender; season with salt towards the end.",
      "essentials": [
        "350 g dried black beans",
        "400 g pork neck",
        "150 g smoked sausage"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 2–3 hours + soaking",
        "ingredients": [
          "350 g dried black beans",
          "400 g pork neck",
          "150 g smoked sausage",
          "100 g bacon",
          "1 onion",
          "3 garlic cloves",
          "2 bay leaves",
          "water"
        ],
        "steps": [
          "Soak the beans overnight in the refrigerator, drain and rinse.",
          "Lightly brown the meat, bacon and onion in a pot.",
          "Add beans, garlic, bay leaves and enough water to cover. Boil vigorously for at least 10 minutes, reduce the heat and simmer until beans and meat are tender.",
          "Add the sausage towards the end, cook until heated through and season."
        ]
      },
      "variants": [
        "Different cuts and salted meat products are used; this is a simplified home version."
      ],
      "serving": [
        "Serve with rice, farofa, finely sliced kale and orange."
      ],
      "commonMistakes": [
        "Do not salt the stew early if the meat is already salty."
      ]
    },
    "fr": {
      "overview": "Les haricots cuisent avec la viande et les aromates pour former un bouillon épais et sombre.",
      "history": "La feijoada est un plat brésilien convivial bien connu. Les récits de son origine exacte sont controversés.",
      "flavor": "Généreuse, salée et terreuse, souvent fumée.",
      "technique": "Faire tremper les haricots secs et les cuire jusqu’à ce qu’ils soient bien tendres ; saler en fin de cuisson.",
      "essentials": [
        "350 g de haricots noirs secs",
        "400 g d’échine de porc",
        "150 g de saucisse fumée"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 2–3 heures + trempage",
        "ingredients": [
          "350 g de haricots noirs secs",
          "400 g d’échine de porc",
          "150 g de saucisse fumée",
          "100 g de bacon",
          "1 oignon",
          "3 gousses d’ail",
          "2 feuilles de laurier",
          "eau"
        ],
        "steps": [
          "Faire tremper les haricots toute la nuit au réfrigérateur, les égoutter et les rincer.",
          "Faire légèrement dorer la viande, le bacon et l’oignon dans une marmite.",
          "Ajouter les haricots, l’ail, le laurier et de l’eau à hauteur. Faire bouillir vivement au moins 10 minutes, puis réduire le feu et laisser mijoter jusqu’à tendreté des haricots et de la viande.",
          "Ajouter la saucisse en fin de cuisson, bien réchauffer et assaisonner."
        ]
      },
      "variants": [
        "On utilise différents morceaux et produits de viande salés ; il s’agit ici d’une version maison simplifiée."
      ],
      "serving": [
        "Servir avec du riz, de la farofa, du chou vert finement émincé et de l’orange."
      ],
      "commonMistakes": [
        "Ne pas saler trop tôt si la viande est déjà salée."
      ]
    },
    "pt": {
      "overview": "O feijão é cozido com carne e aromáticos até formar um caldo espesso e escuro.",
      "history": "A feijoada é um conhecido prato brasileiro de convívio. Os relatos sobre a sua origem exata são controversos.",
      "flavor": "Encorpada, salgada e terrosa, frequentemente fumada.",
      "technique": "Demolhe o feijão seco e coza até ficar bem tenro; tempere com sal perto do fim.",
      "essentials": [
        "350 g de feijão-preto seco",
        "400 g de cachaço de porco",
        "150 g de enchido fumado"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 2–3 horas + demolha",
        "ingredients": [
          "350 g de feijão-preto seco",
          "400 g de cachaço de porco",
          "150 g de enchido fumado",
          "100 g de bacon",
          "1 cebola",
          "3 dentes de alho",
          "2 folhas de louro",
          "água"
        ],
        "steps": [
          "Demolhe o feijão durante a noite no frigorífico, escorra e passe por água.",
          "Doure ligeiramente a carne, o bacon e a cebola num tacho.",
          "Junte feijão, alho, louro e água até cobrir. Ferva vigorosamente durante pelo menos 10 minutos, reduza o lume e deixe cozinhar até o feijão e a carne ficarem tenros.",
          "Junte o enchido perto do fim, cozinhe até estar bem quente e retifique os temperos."
        ]
      },
      "variants": [
        "Usam-se diferentes cortes e produtos de carne salgada; esta é uma versão caseira simplificada."
      ],
      "serving": [
        "Sirva com arroz, farofa, couve finamente cortada e laranja."
      ],
      "commonMistakes": [
        "Não adicione sal no início se a carne já for salgada."
      ]
    },
    "es": {
      "overview": "Los frijoles se cuecen con carne y aromáticos hasta formar un caldo espeso y oscuro.",
      "history": "La feijoada es un conocido plato brasileño para compartir. Los relatos sobre su origen exacto son discutidos.",
      "flavor": "Intensa, salada y terrosa, a menudo ahumada.",
      "technique": "Remoja los frijoles secos y cuécelos hasta que estén muy tiernos; ajusta la sal hacia el final.",
      "essentials": [
        "350 g de frijoles negros secos",
        "400 g de cabecero de lomo de cerdo",
        "150 g de salchicha ahumada"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 2–3 horas + remojo",
        "ingredients": [
          "350 g de frijoles negros secos",
          "400 g de cabecero de lomo de cerdo",
          "150 g de salchicha ahumada",
          "100 g de beicon",
          "1 cebolla",
          "3 dientes de ajo",
          "2 hojas de laurel",
          "agua"
        ],
        "steps": [
          "Remoja los frijoles durante la noche en el frigorífico, escúrrelos y enjuágalos.",
          "Dora ligeramente la carne, el beicon y la cebolla en una olla.",
          "Añade frijoles, ajo, laurel y agua hasta cubrir. Hierve enérgicamente durante al menos 10 minutos, baja el fuego y cuece hasta que los frijoles y la carne estén tiernos.",
          "Añade la salchicha hacia el final, cuece hasta que esté bien caliente y sazona."
        ]
      },
      "variants": [
        "Se utilizan distintos cortes y productos cárnicos salados; esta es una versión casera simplificada."
      ],
      "serving": [
        "Sirve con arroz, farofa, col verde cortada fina y naranja."
      ],
      "commonMistakes": [
        "No sales el guiso al principio si la carne ya es salada."
      ]
    },
    "de": {
      "overview": "Bohnen werden mit Fleisch und Aromaten zu einer dicken, dunklen Brühe gekocht.",
      "history": "Feijoada ist ein bekanntes brasilianisches Gemeinschaftsessen. Berichte über ihre genaue Herkunft sind umstritten.",
      "flavor": "Kräftig, salzig und erdig, oft rauchig.",
      "technique": "Getrocknete Bohnen einweichen und sehr weich kochen; gegen Ende mit Salz abschmecken.",
      "essentials": [
        "350 g getrocknete schwarze Bohnen",
        "400 g Schweinenacken",
        "150 g geräucherte Wurst"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 2–3 Stunden + Einweichen",
        "ingredients": [
          "350 g getrocknete schwarze Bohnen",
          "400 g Schweinenacken",
          "150 g geräucherte Wurst",
          "100 g Speck",
          "1 Zwiebel",
          "3 Knoblauchzehen",
          "2 Lorbeerblätter",
          "Wasser"
        ],
        "steps": [
          "Bohnen über Nacht im Kühlschrank einweichen, abgießen und abspülen.",
          "Fleisch, Speck und Zwiebel in einem Topf leicht anbräunen.",
          "Bohnen, Knoblauch, Lorbeer und ausreichend Wasser zum Bedecken hinzufügen. Mindestens 10 Minuten sprudelnd kochen, Hitze reduzieren und köcheln lassen, bis Bohnen und Fleisch weich sind.",
          "Wurst gegen Ende hinzufügen, durchwärmen und abschmecken."
        ]
      },
      "variants": [
        "Verschiedene Fleischstücke und gepökelte Fleischprodukte werden verwendet; dies ist eine vereinfachte Hausvariante."
      ],
      "serving": [
        "Mit Reis, Farofa, fein geschnittenem Grünkohl und Orange servieren."
      ],
      "commonMistakes": [
        "Eintopf nicht früh salzen, wenn das Fleisch bereits salzig ist."
      ]
    }
  },
  "moqueca": {
    "en": {
      "overview": "Fish is gently simmered with vegetables; this recipe is inspired by moqueca baiana with coconut milk and dendê.",
      "history": "Bahia and Espírito Santo have distinct moqueca traditions that should not be confused.",
      "flavor": "Juicy fish, fruity tomato and rich coconut in the Bahian version.",
      "technique": "Build the vegetable base before adding the fish; avoid vigorous stirring.",
      "essentials": [
        "600 g firm white fish",
        "1 lime",
        "2 tomatoes"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40 min",
        "ingredients": [
          "600 g firm white fish",
          "1 lime",
          "2 tomatoes",
          "1 onion",
          "1 bell pepper",
          "200 ml coconut milk",
          "1–2 tbsp dendê (red palm oil)",
          "coriander",
          "salt"
        ],
        "steps": [
          "Cut the fish into large pieces and toss with lime and a little salt.",
          "Layer onion, pepper and tomatoes in a pot.",
          "Add coconut milk and dendê and let the vegetables soften.",
          "Add fish and simmer covered until cooked through. Top with coriander."
        ]
      },
      "variants": [
        "Moqueca capixaba uses neither dendê nor coconut milk; urucum and olive oil give it a different profile."
      ],
      "serving": [
        "Serve with rice and optionally pirão."
      ],
      "commonMistakes": [
        "Do not stir vigorously enough to break up the fish pieces."
      ]
    },
    "fr": {
      "overview": "Le poisson est poché doucement avec des légumes ; cette recette s’inspire de la moqueca baiana au lait de coco et au dendê.",
      "history": "Bahia et Espírito Santo possèdent des traditions de moqueca distinctes qu’il ne faut pas confondre.",
      "flavor": "Poisson juteux, tomate fruitée et richesse de la noix de coco dans la version bahianaise.",
      "technique": "Préparer la base de légumes avant d’ajouter le poisson ; éviter de remuer vigoureusement.",
      "essentials": [
        "600 g de poisson blanc à chair ferme",
        "1 citron vert",
        "2 tomates"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40 min",
        "ingredients": [
          "600 g de poisson blanc à chair ferme",
          "1 citron vert",
          "2 tomates",
          "1 oignon",
          "1 poivron",
          "200 ml de lait de coco",
          "1–2 c. à soupe de dendê (huile de palme rouge)",
          "coriandre",
          "sel"
        ],
        "steps": [
          "Couper le poisson en gros morceaux et mélanger avec du citron vert et un peu de sel.",
          "Disposer l’oignon, le poivron et les tomates en couches dans une marmite.",
          "Ajouter le lait de coco et le dendê et laisser les légumes s’attendrir.",
          "Ajouter le poisson et laisser pocher à couvert jusqu’à cuisson complète. Garnir de coriandre."
        ]
      },
      "variants": [
        "La moqueca capixaba n’utilise ni dendê ni lait de coco ; le roucou et l’huile d’olive lui donnent un profil différent."
      ],
      "serving": [
        "Servir avec du riz et éventuellement du pirão."
      ],
      "commonMistakes": [
        "Ne pas remuer si vigoureusement que les morceaux de poisson se désagrègent."
      ]
    },
    "pt": {
      "overview": "O peixe é cozinhado suavemente com legumes; esta receita inspira-se na moqueca baiana com leite de coco e dendê.",
      "history": "A Bahia e o Espírito Santo têm tradições próprias de moqueca que não devem ser confundidas.",
      "flavor": "Peixe suculento, tomate frutado e sabor rico a coco na versão baiana.",
      "technique": "Prepare a base de legumes antes de juntar o peixe; evite mexer com força.",
      "essentials": [
        "600 g de peixe branco de carne firme",
        "1 lima",
        "2 tomates"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40 min",
        "ingredients": [
          "600 g de peixe branco de carne firme",
          "1 lima",
          "2 tomates",
          "1 cebola",
          "1 pimento",
          "200 ml de leite de coco",
          "1–2 c. de sopa de azeite de dendê (óleo de palma vermelho)",
          "coentros",
          "sal"
        ],
        "steps": [
          "Corte o peixe em pedaços grandes e envolva com lima e um pouco de sal.",
          "Disponha cebola, pimento e tomate em camadas num tacho.",
          "Junte leite de coco e dendê e deixe os legumes amolecer.",
          "Junte o peixe e coza suavemente com tampa até estar bem cozinhado. Termine com coentros."
        ]
      },
      "variants": [
        "A moqueca capixaba não usa dendê nem leite de coco; o urucum e o azeite conferem-lhe outro perfil."
      ],
      "serving": [
        "Sirva com arroz e, se desejar, pirão."
      ],
      "commonMistakes": [
        "Não mexa com tanta força que os pedaços de peixe se desfaçam."
      ]
    },
    "es": {
      "overview": "El pescado se cuece suavemente con verduras; esta receta se inspira en la moqueca baiana con leche de coco y dendê.",
      "history": "Bahía y Espírito Santo tienen tradiciones propias de moqueca que no deben confundirse.",
      "flavor": "Pescado jugoso, tomate afrutado y sabor intenso a coco en la versión bahiana.",
      "technique": "Prepara la base de verduras antes de añadir el pescado; evita remover enérgicamente.",
      "essentials": [
        "600 g de pescado blanco de carne firme",
        "1 lima",
        "2 tomates"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40 min",
        "ingredients": [
          "600 g de pescado blanco de carne firme",
          "1 lima",
          "2 tomates",
          "1 cebolla",
          "1 pimiento",
          "200 ml de leche de coco",
          "1–2 cucharadas de dendê (aceite de palma rojo)",
          "cilantro",
          "sal"
        ],
        "steps": [
          "Corta el pescado en trozos grandes y mezcla con lima y un poco de sal.",
          "Coloca cebolla, pimiento y tomate en capas en una olla.",
          "Añade leche de coco y dendê y deja que las verduras se ablanden.",
          "Añade el pescado y cuece suavemente con tapa hasta que esté hecho por dentro. Añade cilantro."
        ]
      },
      "variants": [
        "La moqueca capixaba no lleva dendê ni leche de coco; el achiote y el aceite de oliva le dan otro perfil."
      ],
      "serving": [
        "Sirve con arroz y, si quieres, pirão."
      ],
      "commonMistakes": [
        "No remuevas con tanta fuerza que se deshagan los trozos de pescado."
      ]
    },
    "de": {
      "overview": "Fisch wird sanft mit Gemüse gegart; dieses Rezept ist von Moqueca Baiana mit Kokosmilch und Dendê inspiriert.",
      "history": "Bahia und Espírito Santo haben eigene Moqueca-Traditionen, die nicht verwechselt werden sollten.",
      "flavor": "Saftiger Fisch, fruchtige Tomaten und kräftige Kokosnote in der Bahia-Variante.",
      "technique": "Gemüsebasis vor Zugabe des Fisches zubereiten; kräftiges Rühren vermeiden.",
      "essentials": [
        "600 g festfleischiger weißer Fisch",
        "1 Limette",
        "2 Tomaten"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40 Min.",
        "ingredients": [
          "600 g festfleischiger weißer Fisch",
          "1 Limette",
          "2 Tomaten",
          "1 Zwiebel",
          "1 Paprikaschote",
          "200 ml Kokosmilch",
          "1–2 EL Dendê (rotes Palmöl)",
          "Koriander",
          "Salz"
        ],
        "steps": [
          "Fisch in große Stücke schneiden und mit Limette und etwas Salz vermengen.",
          "Zwiebel, Paprika und Tomaten in einem Topf schichten.",
          "Kokosmilch und Dendê hinzufügen und Gemüse weich werden lassen.",
          "Fisch hinzufügen und zugedeckt vollständig gar ziehen lassen. Mit Koriander garnieren."
        ]
      },
      "variants": [
        "Moqueca Capixaba verwendet weder Dendê noch Kokosmilch; Annatto und Olivenöl ergeben ein anderes Profil."
      ],
      "serving": [
        "Mit Reis und nach Wunsch Pirão servieren."
      ],
      "commonMistakes": [
        "Nicht so kräftig rühren, dass die Fischstücke zerfallen."
      ]
    }
  },
  "coxinha": {
    "en": {
      "overview": "A cooked flour dough encloses seasoned chicken before the pieces are breaded and deep-fried.",
      "history": "Coxinha is a widespread Brazilian salgadinho, familiar from bakeries, snack bars and parties.",
      "flavor": "Crisp breading and soft dough with juicy chicken.",
      "technique": "Cool the dough and filling before shaping and seal the seam well.",
      "essentials": [
        "300 g cooked shredded chicken",
        "1 onion",
        "2 garlic cloves"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 12 small coxinhas",
        "time": "approx. 75 min",
        "ingredients": [
          "300 g cooked shredded chicken",
          "1 onion",
          "2 garlic cloves",
          "300 ml chicken stock",
          "200 g wheat flour",
          "25 g butter",
          "1 egg",
          "breadcrumbs",
          "frying oil"
        ],
        "steps": [
          "Fry onion and garlic, mix in chicken and season. Let cool.",
          "Bring stock and butter to a boil, stir in flour and work the dough until it pulls away from the pan. Cool until manageable.",
          "Shape small dough cups, fill and close into teardrop shapes.",
          "Coat in beaten egg and breadcrumbs, deep-fry at about 170 °C until golden and heated through."
        ]
      },
      "variants": [
        "Coxinha with cream cheese in the filling is a popular version."
      ],
      "serving": [
        "Serve hot as a snack."
      ],
      "commonMistakes": [
        "Avoid wet filling or holes in the dough."
      ]
    },
    "fr": {
      "overview": "Une pâte cuite à base de farine enveloppe du poulet assaisonné avant que les pièces soient panées et frites.",
      "history": "La coxinha est un salgadinho brésilien très répandu, connu dans les boulangeries, les snacks et les fêtes.",
      "flavor": "Panure croustillante et pâte tendre avec du poulet juteux.",
      "technique": "Laisser refroidir la pâte et la farce avant le façonnage et bien souder la fermeture.",
      "essentials": [
        "300 g de poulet cuit effiloché",
        "1 oignon",
        "2 gousses d’ail"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 12 petites coxinhas",
        "time": "env. 75 min",
        "ingredients": [
          "300 g de poulet cuit effiloché",
          "1 oignon",
          "2 gousses d’ail",
          "300 ml de bouillon de poulet",
          "200 g de farine de blé",
          "25 g de beurre",
          "1 œuf",
          "chapelure",
          "huile de friture"
        ],
        "steps": [
          "Faire revenir l’oignon et l’ail, incorporer le poulet et assaisonner. Laisser refroidir.",
          "Porter le bouillon et le beurre à ébullition, incorporer la farine et travailler la pâte jusqu’à ce qu’elle se détache de la casserole. Laisser refroidir jusqu’à pouvoir la manipuler.",
          "Former de petites coupelles de pâte, garnir et fermer en forme de goutte.",
          "Passer dans l’œuf battu et la chapelure, puis frire à environ 170 °C jusqu’à ce que les pièces soient dorées et chaudes à cœur."
        ]
      },
      "variants": [
        "La coxinha au fromage frais dans la farce est une variante populaire."
      ],
      "serving": [
        "Servir chaud en en-cas."
      ],
      "commonMistakes": [
        "Éviter une farce humide ou des trous dans la pâte."
      ]
    },
    "pt": {
      "overview": "Uma massa cozida de farinha envolve frango temperado antes de as peças serem panadas e fritas.",
      "history": "A coxinha é um salgadinho brasileiro muito comum, conhecido nas padarias, lanchonetes e festas.",
      "flavor": "Panado crocante e massa macia com frango suculento.",
      "technique": "Arrefeça a massa e o recheio antes de moldar e feche bem a junção.",
      "essentials": [
        "300 g de frango cozido desfiado",
        "1 cebola",
        "2 dentes de alho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 12 coxinhas pequenas",
        "time": "cerca de 75 min",
        "ingredients": [
          "300 g de frango cozido desfiado",
          "1 cebola",
          "2 dentes de alho",
          "300 ml de caldo de frango",
          "200 g de farinha de trigo",
          "25 g de manteiga",
          "1 ovo",
          "pão ralado",
          "óleo para fritar"
        ],
        "steps": [
          "Salteie cebola e alho, junte o frango e tempere. Deixe arrefecer.",
          "Ferva o caldo com a manteiga, incorpore a farinha e trabalhe a massa até se soltar do tacho. Deixe arrefecer até poder manuseá-la.",
          "Molde pequenas taças de massa, recheie e feche em forma de gota.",
          "Passe por ovo batido e pão ralado, frite a cerca de 170 °C até dourar e estar bem quente no interior."
        ]
      },
      "variants": [
        "A coxinha com queijo creme no recheio é uma variante popular."
      ],
      "serving": [
        "Sirva quente como petisco."
      ],
      "commonMistakes": [
        "Evite recheio húmido ou buracos na massa."
      ]
    },
    "es": {
      "overview": "Una masa cocida de harina envuelve pollo condimentado antes de empanar y freír las piezas.",
      "history": "La coxinha es un salgadinho brasileño muy extendido, típico de panaderías, cafeterías y fiestas.",
      "flavor": "Empanado crujiente y masa suave con pollo jugoso.",
      "technique": "Enfría la masa y el relleno antes de moldear y sella bien la unión.",
      "essentials": [
        "300 g de pollo cocido desmenuzado",
        "1 cebolla",
        "2 dientes de ajo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 12 coxinhas pequeñas",
        "time": "aprox. 75 min",
        "ingredients": [
          "300 g de pollo cocido desmenuzado",
          "1 cebolla",
          "2 dientes de ajo",
          "300 ml de caldo de pollo",
          "200 g de harina de trigo",
          "25 g de mantequilla",
          "1 huevo",
          "pan rallado",
          "aceite para freír"
        ],
        "steps": [
          "Sofríe cebolla y ajo, incorpora el pollo y sazona. Deja enfriar.",
          "Hierve caldo y mantequilla, incorpora harina y trabaja la masa hasta que se despegue del cazo. Deja enfriar hasta poder manejarla.",
          "Forma pequeños cuencos de masa, rellena y cierra en forma de gota.",
          "Pasa por huevo batido y pan rallado, fríe a unos 170 °C hasta que estén doradas y calientes por dentro."
        ]
      },
      "variants": [
        "La coxinha con queso crema en el relleno es una variante popular."
      ],
      "serving": [
        "Sirve caliente como aperitivo."
      ],
      "commonMistakes": [
        "Evita un relleno húmedo o agujeros en la masa."
      ]
    },
    "de": {
      "overview": "Ein gekochter Mehlteig umschließt gewürztes Hähnchen, bevor die Stücke paniert und frittiert werden.",
      "history": "Coxinha ist ein verbreitetes brasilianisches Salgadinho, bekannt aus Bäckereien, Imbissen und von Feiern.",
      "flavor": "Knusprige Panade und weicher Teig mit saftigem Hähnchen.",
      "technique": "Teig und Füllung vor dem Formen abkühlen lassen und die Naht gut verschließen.",
      "essentials": [
        "300 g gegartes, zerpflücktes Hähnchen",
        "1 Zwiebel",
        "2 Knoblauchzehen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 12 kleine Coxinhas",
        "time": "ca. 75 Min.",
        "ingredients": [
          "300 g gegartes, zerpflücktes Hähnchen",
          "1 Zwiebel",
          "2 Knoblauchzehen",
          "300 ml Hühnerbrühe",
          "200 g Weizenmehl",
          "25 g Butter",
          "1 Ei",
          "Semmelbrösel",
          "Frittieröl"
        ],
        "steps": [
          "Zwiebel und Knoblauch anschwitzen, Hähnchen untermischen und abschmecken. Abkühlen lassen.",
          "Brühe und Butter aufkochen, Mehl einrühren und Teig bearbeiten, bis er sich vom Topf löst. Abkühlen lassen, bis er formbar ist.",
          "Kleine Teigschalen formen, füllen und tropfenförmig verschließen.",
          "In verquirltem Ei und Semmelbröseln wenden und bei etwa 170 °C goldbraun und durchgehend heiß frittieren."
        ]
      },
      "variants": [
        "Coxinha mit Frischkäse in der Füllung ist eine beliebte Variante."
      ],
      "serving": [
        "Heiß als Snack servieren."
      ],
      "commonMistakes": [
        "Feuchte Füllung und Löcher im Teig vermeiden."
      ]
    }
  },
  "pao-de-queijo": {
    "en": {
      "overview": "A dough of polvilho, milk, egg, fat and cheese is shaped into balls and baked.",
      "history": "Pão de queijo is particularly associated with Minas Gerais and is often eaten at breakfast or with coffee.",
      "flavor": "Cheesy, slightly crisp outside and chewy or soft inside.",
      "technique": "Use cassava starch, not ordinary wheat flour, and adjust the amount of egg to the dough consistency.",
      "essentials": [
        "250 g polvilho doce (tapioca starch)",
        "125 ml milk",
        "50 ml neutral oil"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 16 small cheese breads",
        "time": "approx. 45 min",
        "ingredients": [
          "250 g polvilho doce (tapioca starch)",
          "125 ml milk",
          "50 ml neutral oil",
          "1–2 eggs",
          "120 g grated firm cheese",
          "½ tsp salt"
        ],
        "steps": [
          "Heat milk, oil and salt to boiling point.",
          "Pour over the starch and mix. Let cool slightly.",
          "Gradually work in cheese and eggs until a shapeable dough forms.",
          "Shape small balls and bake at 200 °C until risen and golden, about 20–30 minutes."
        ]
      },
      "variants": [
        "Polvilho azedo gives a different flavour and texture from polvilho doce."
      ],
      "serving": [
        "Serve warm with coffee or as a snack."
      ],
      "commonMistakes": [
        "Do not add all the egg mixture at once."
      ]
    },
    "fr": {
      "overview": "Une pâte à base de polvilho, de lait, d’œuf, de matière grasse et de fromage est façonnée en boules et cuite au four.",
      "history": "Le pão de queijo est particulièrement associé au Minas Gerais et se déguste souvent au petit-déjeuner ou avec du café.",
      "flavor": "Fromagé, légèrement croustillant à l’extérieur et élastique ou tendre à l’intérieur.",
      "technique": "Utiliser de la fécule de manioc, non de la farine de blé ordinaire, et ajuster la quantité d’œuf à la consistance de la pâte.",
      "essentials": [
        "250 g de polvilho doce (fécule de tapioca)",
        "125 ml de lait",
        "50 ml d’huile neutre"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 16 petits pains au fromage",
        "time": "env. 45 min",
        "ingredients": [
          "250 g de polvilho doce (fécule de tapioca)",
          "125 ml de lait",
          "50 ml d’huile neutre",
          "1–2 œufs",
          "120 g de fromage à pâte ferme râpé",
          "½ c. à café de sel"
        ],
        "steps": [
          "Chauffer le lait, l’huile et le sel jusqu’à ébullition.",
          "Verser sur la fécule et mélanger. Laisser refroidir légèrement.",
          "Incorporer progressivement le fromage et les œufs jusqu’à obtenir une pâte façonnable.",
          "Former de petites boules et cuire à 200 °C jusqu’à ce qu’elles soient gonflées et dorées, environ 20–30 minutes."
        ]
      },
      "variants": [
        "Le polvilho azedo donne une saveur et une texture différentes du polvilho doce."
      ],
      "serving": [
        "Servir tiède avec du café ou en en-cas."
      ],
      "commonMistakes": [
        "Ne pas ajouter tous les œufs en une seule fois."
      ]
    },
    "pt": {
      "overview": "Uma massa de polvilho, leite, ovo, gordura e queijo é moldada em bolinhas e assada.",
      "history": "O pão de queijo está especialmente associado a Minas Gerais e come-se frequentemente ao pequeno-almoço ou com café.",
      "flavor": "Com sabor a queijo, ligeiramente crocante por fora e elástico ou macio por dentro.",
      "technique": "Use amido de mandioca, não farinha de trigo comum, e ajuste o ovo à consistência da massa.",
      "essentials": [
        "250 g de polvilho doce (amido de tapioca)",
        "125 ml de leite",
        "50 ml de óleo neutro"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 16 pães de queijo pequenos",
        "time": "cerca de 45 min",
        "ingredients": [
          "250 g de polvilho doce (amido de tapioca)",
          "125 ml de leite",
          "50 ml de óleo neutro",
          "1–2 ovos",
          "120 g de queijo firme ralado",
          "½ c. de chá de sal"
        ],
        "steps": [
          "Aqueça leite, óleo e sal até ao ponto de ebulição.",
          "Verta sobre o polvilho e misture. Deixe arrefecer um pouco.",
          "Incorpore gradualmente queijo e ovos até obter uma massa moldável.",
          "Molde bolinhas e asse a 200 °C até crescerem e dourarem, cerca de 20–30 minutos."
        ]
      },
      "variants": [
        "O polvilho azedo dá sabor e textura diferentes do polvilho doce."
      ],
      "serving": [
        "Sirva morno com café ou como lanche."
      ],
      "commonMistakes": [
        "Não junte toda a mistura de ovos de uma vez."
      ]
    },
    "es": {
      "overview": "Una masa de polvilho, leche, huevo, grasa y queso se moldea en bolas y se hornea.",
      "history": "El pão de queijo se asocia especialmente con Minas Gerais y suele comerse en el desayuno o con café.",
      "flavor": "Con sabor a queso, ligeramente crujiente por fuera y elástico o suave por dentro.",
      "technique": "Usa almidón de mandioca, no harina de trigo común, y ajusta el huevo según la consistencia de la masa.",
      "essentials": [
        "250 g de polvilho doce (almidón de tapioca)",
        "125 ml de leche",
        "50 ml de aceite neutro"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 16 panecillos de queso",
        "time": "aprox. 45 min",
        "ingredients": [
          "250 g de polvilho doce (almidón de tapioca)",
          "125 ml de leche",
          "50 ml de aceite neutro",
          "1–2 huevos",
          "120 g de queso firme rallado",
          "½ cucharadita de sal"
        ],
        "steps": [
          "Calienta leche, aceite y sal hasta el punto de ebullición.",
          "Vierte sobre el almidón y mezcla. Deja enfriar un poco.",
          "Incorpora poco a poco queso y huevos hasta obtener una masa moldeable.",
          "Forma bolas pequeñas y hornea a 200 °C hasta que crezcan y se doren, unos 20–30 minutos."
        ]
      },
      "variants": [
        "El polvilho azedo aporta un sabor y una textura distintos del polvilho doce."
      ],
      "serving": [
        "Sirve templado con café o como tentempié."
      ],
      "commonMistakes": [
        "No añadas toda la mezcla de huevo de golpe."
      ]
    },
    "de": {
      "overview": "Ein Teig aus Polvilho, Milch, Ei, Fett und Käse wird zu Bällchen geformt und gebacken.",
      "history": "Pão de Queijo ist besonders mit Minas Gerais verbunden und wird oft zum Frühstück oder zum Kaffee gegessen.",
      "flavor": "Käsig, außen leicht knusprig und innen elastisch oder weich.",
      "technique": "Maniokstärke statt normalem Weizenmehl verwenden und die Eimenge an die Teigkonsistenz anpassen.",
      "essentials": [
        "250 g Polvilho Doce (Tapiokastärke)",
        "125 ml Milch",
        "50 ml neutrales Öl"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 16 kleine Käsebrötchen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "250 g Polvilho Doce (Tapiokastärke)",
          "125 ml Milch",
          "50 ml neutrales Öl",
          "1–2 Eier",
          "120 g geriebener fester Käse",
          "½ TL Salz"
        ],
        "steps": [
          "Milch, Öl und Salz bis zum Siedepunkt erhitzen.",
          "Über die Stärke gießen und mischen. Etwas abkühlen lassen.",
          "Käse und Eier nach und nach einarbeiten, bis ein formbarer Teig entsteht.",
          "Kleine Bällchen formen und bei 200 °C etwa 20–30 Minuten backen, bis sie aufgegangen und goldbraun sind."
        ]
      },
      "variants": [
        "Polvilho Azedo ergibt einen anderen Geschmack und eine andere Konsistenz als Polvilho Doce."
      ],
      "serving": [
        "Lauwarm zum Kaffee oder als Snack servieren."
      ],
      "commonMistakes": [
        "Eimasse nicht auf einmal hinzufügen."
      ]
    }
  },
  "acaraje": {
    "en": {
      "overview": "An airy bean mixture is deep-fried in dendê and often served with vatapá, dried prawns and chilli.",
      "history": "Acarajé has West African roots and is closely linked to Afro-Brazilian culture and religious traditions. The craft of the baianas do acarajé is recognised as Brazilian cultural heritage.",
      "flavor": "Crisp, nutty and aromatic.",
      "technique": "Remove the bean skins and whip the mixture until airy before frying.",
      "essentials": [
        "300 g dried black-eyed peas",
        "1 small onion",
        "salt"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 8 small fritters",
        "time": "approx. 60 min + soaking",
        "ingredients": [
          "300 g dried black-eyed peas",
          "1 small onion",
          "salt",
          "dendê (red palm oil) for frying",
          "vatapá or prawn filling as desired"
        ],
        "steps": [
          "Soak the beans in the refrigerator, rub off the skins and rinse.",
          "Grind the drained beans with onion and as little water as possible.",
          "Whip the mixture until airy and season with salt.",
          "Shape with a spoon and deep-fry in small batches at about 170 °C until golden and cooked through.",
          "Split and fill with vatapá or prepared prawn filling."
        ]
      },
      "variants": [
        "Abará is a related dish steamed in leaves instead of deep-fried."
      ],
      "serving": [
        "Serve freshly fried with filling and chilli sauce."
      ],
      "commonMistakes": [
        "Do not add so much water that the mixture becomes too loose."
      ]
    },
    "fr": {
      "overview": "Une pâte de haricots aérée est frite dans le dendê et souvent servie avec du vatapá, des crevettes séchées et du piment.",
      "history": "L’acarajé a des racines ouest-africaines et est étroitement lié à la culture afro-brésilienne et aux traditions religieuses. Le savoir-faire des baianas do acarajé est reconnu comme patrimoine culturel brésilien.",
      "flavor": "Croustillant, aux notes de noix et aromatique.",
      "technique": "Retirer la peau des haricots et battre la pâte pour l’aérer avant la friture.",
      "essentials": [
        "300 g de haricots cornille secs",
        "1 petit oignon",
        "sel"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 8 petits beignets",
        "time": "env. 60 min + trempage",
        "ingredients": [
          "300 g de haricots cornille secs",
          "1 petit oignon",
          "sel",
          "dendê (huile de palme rouge) pour la friture",
          "vatapá ou garniture aux crevettes selon le goût"
        ],
        "steps": [
          "Faire tremper les haricots au réfrigérateur, retirer leur peau en les frottant et les rincer.",
          "Broyer les haricots égouttés avec l’oignon et le moins d’eau possible.",
          "Battre la pâte pour l’aérer et saler.",
          "Former à la cuillère et frire par petites quantités à environ 170 °C jusqu’à ce qu’ils soient dorés et cuits à cœur.",
          "Ouvrir et garnir de vatapá ou de farce aux crevettes déjà préparée."
        ]
      },
      "variants": [
        "L’abará est un plat apparenté, cuit à la vapeur dans des feuilles plutôt que frit."
      ],
      "serving": [
        "Servir tout juste frit avec la garniture et de la sauce pimentée."
      ],
      "commonMistakes": [
        "Ne pas ajouter tant d’eau que la pâte devienne trop liquide."
      ]
    },
    "pt": {
      "overview": "Uma massa de feijão batida e leve é frita em dendê e servida frequentemente com vatapá, camarão seco e malagueta.",
      "history": "O acarajé tem raízes na África Ocidental e está estreitamente ligado à cultura afro-brasileira e às tradições religiosas. O ofício das baianas de acarajé é reconhecido como património cultural brasileiro.",
      "flavor": "Crocante, com notas de frutos secos e aromático.",
      "technique": "Retire as peles do feijão e bata a massa até ficar leve antes de fritar.",
      "essentials": [
        "300 g de feijão-frade seco",
        "1 cebola pequena",
        "sal"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 8 bolinhos",
        "time": "cerca de 60 min + demolha",
        "ingredients": [
          "300 g de feijão-frade seco",
          "1 cebola pequena",
          "sal",
          "azeite de dendê (óleo de palma vermelho) para fritar",
          "vatapá ou recheio de camarão a gosto"
        ],
        "steps": [
          "Demolhe o feijão no frigorífico, esfregue para retirar as peles e passe por água.",
          "Triture o feijão escorrido com cebola e o mínimo de água possível.",
          "Bata a massa até ficar leve e tempere com sal.",
          "Molde com uma colher e frite em pequenas porções a cerca de 170 °C até dourarem e estarem bem cozinhados.",
          "Abra e recheie com vatapá ou recheio de camarão já preparado."
        ]
      },
      "variants": [
        "O abará é um prato semelhante, cozido a vapor em folhas em vez de frito."
      ],
      "serving": [
        "Sirva acabado de fritar com recheio e molho de malagueta."
      ],
      "commonMistakes": [
        "Não junte tanta água que a massa fique demasiado mole."
      ]
    },
    "es": {
      "overview": "Una masa aireada de frijoles se fríe en dendê y suele servirse con vatapá, gambas secas y chile.",
      "history": "El acarajé tiene raíces en África Occidental y está estrechamente ligado a la cultura afrobrasileña y las tradiciones religiosas. El oficio de las baianas do acarajé está reconocido como patrimonio cultural brasileño.",
      "flavor": "Crujiente, con notas de frutos secos y aromático.",
      "technique": "Retira la piel de los frijoles y bate la masa hasta airearla antes de freír.",
      "essentials": [
        "300 g de frijoles de ojo negro secos",
        "1 cebolla pequeña",
        "sal"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 8 tortitas pequeñas",
        "time": "aprox. 60 min + remojo",
        "ingredients": [
          "300 g de frijoles de ojo negro secos",
          "1 cebolla pequeña",
          "sal",
          "dendê (aceite de palma rojo) para freír",
          "vatapá o relleno de gambas al gusto"
        ],
        "steps": [
          "Remoja los frijoles en el frigorífico, frota para quitar la piel y enjuaga.",
          "Tritura los frijoles escurridos con cebolla y la menor cantidad de agua posible.",
          "Bate la masa hasta airearla y sazona con sal.",
          "Forma con una cuchara y fríe en tandas pequeñas a unos 170 °C hasta que estén dorados y hechos por dentro.",
          "Abre y rellena con vatapá o relleno de gambas ya preparado."
        ]
      },
      "variants": [
        "El abará es un plato emparentado que se cuece al vapor en hojas en lugar de freírse."
      ],
      "serving": [
        "Sirve recién frito con relleno y salsa de chile."
      ],
      "commonMistakes": [
        "No añadas tanta agua que la masa quede demasiado líquida."
      ]
    },
    "de": {
      "overview": "Eine luftige Bohnenmasse wird in Dendê frittiert und oft mit Vatapá, getrockneten Garnelen und Chili serviert.",
      "history": "Acarajé hat westafrikanische Wurzeln und ist eng mit afrobrasilianischer Kultur und religiösen Traditionen verbunden. Das Handwerk der Baianas do Acarajé ist als brasilianisches Kulturerbe anerkannt.",
      "flavor": "Knusprig, nussig und aromatisch.",
      "technique": "Bohnenschalen entfernen und die Masse vor dem Frittieren luftig aufschlagen.",
      "essentials": [
        "300 g getrocknete Augenbohnen",
        "1 kleine Zwiebel",
        "Salz"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 8 kleine Küchlein",
        "time": "ca. 60 Min. + Einweichen",
        "ingredients": [
          "300 g getrocknete Augenbohnen",
          "1 kleine Zwiebel",
          "Salz",
          "Dendê (rotes Palmöl) zum Frittieren",
          "Vatapá oder Garnelenfüllung nach Wunsch"
        ],
        "steps": [
          "Bohnen im Kühlschrank einweichen, Schalen abreiben und abspülen.",
          "Abgetropfte Bohnen mit Zwiebel und möglichst wenig Wasser mahlen.",
          "Masse luftig aufschlagen und mit Salz abschmecken.",
          "Mit einem Löffel formen und portionsweise bei etwa 170 °C goldbraun und vollständig gar frittieren.",
          "Aufschneiden und mit Vatapá oder fertig zubereiteter Garnelenfüllung füllen."
        ]
      },
      "variants": [
        "Abará ist ein verwandtes Gericht, das in Blättern gedämpft statt frittiert wird."
      ],
      "serving": [
        "Frisch frittiert mit Füllung und Chilisauce servieren."
      ],
      "commonMistakes": [
        "Nicht so viel Wasser hinzufügen, dass die Masse zu flüssig wird."
      ]
    }
  },
  "brigadeiro": {
    "en": {
      "overview": "The mixture is cooked down, cooled, rolled into balls and often covered with chocolate sprinkles.",
      "history": "Brigadeiro is a familiar part of Brazilian birthdays and other celebrations.",
      "flavor": "Sweet, soft, chewy and chocolatey.",
      "technique": "Stir continuously over low to medium heat until the mixture pulls away from the bottom.",
      "essentials": [
        "1 can sweetened condensed milk (approx. 395 g)",
        "2 tbsp unsweetened cocoa",
        "1 tbsp butter"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 20 balls",
        "time": "approx. 25 min + cooling",
        "ingredients": [
          "1 can sweetened condensed milk (approx. 395 g)",
          "2 tbsp unsweetened cocoa",
          "1 tbsp butter",
          "chocolate sprinkles"
        ],
        "steps": [
          "Mix condensed milk, cocoa and butter in a heavy-bottomed saucepan.",
          "Heat gently, stirring constantly until the mixture thickens and the bottom becomes visible when you draw the spoon through it.",
          "Transfer to a greased plate and let cool.",
          "Roll small balls with greased hands and coat in chocolate sprinkles."
        ]
      },
      "variants": [
        "Brigadeiro de colher is served softer, with a spoon."
      ],
      "serving": [
        "Serve in small paper cases."
      ],
      "commonMistakes": [
        "Do not substitute unsweetened evaporated milk for sweetened condensed milk."
      ]
    },
    "fr": {
      "overview": "La préparation est réduite, refroidie, roulée en boules et souvent enrobée de vermicelles de chocolat.",
      "history": "Le brigadeiro fait partie des anniversaires et autres fêtes brésiliennes.",
      "flavor": "Sucré, tendre, légèrement élastique et chocolaté.",
      "technique": "Remuer sans arrêt à feu doux à moyen jusqu’à ce que la préparation se détache du fond.",
      "essentials": [
        "1 boîte de lait concentré sucré (env. 395 g)",
        "2 c. à soupe de cacao non sucré",
        "1 c. à soupe de beurre"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 20 boules",
        "time": "env. 25 min + refroidissement",
        "ingredients": [
          "1 boîte de lait concentré sucré (env. 395 g)",
          "2 c. à soupe de cacao non sucré",
          "1 c. à soupe de beurre",
          "vermicelles de chocolat"
        ],
        "steps": [
          "Mélanger le lait concentré, le cacao et le beurre dans une casserole à fond épais.",
          "Chauffer doucement en remuant constamment jusqu’à épaississement et jusqu’à ce que le fond apparaisse au passage de la cuillère.",
          "Verser sur une assiette graissée et laisser refroidir.",
          "Former de petites boules avec les mains graissées et les rouler dans les vermicelles de chocolat."
        ]
      },
      "variants": [
        "Le brigadeiro de colher est servi plus souple, à la cuillère."
      ],
      "serving": [
        "Servir dans de petites caissettes en papier."
      ],
      "commonMistakes": [
        "Ne pas remplacer le lait concentré sucré par du lait concentré non sucré."
      ]
    },
    "pt": {
      "overview": "A massa é cozinhada até engrossar, arrefecida, enrolada em bolinhas e frequentemente coberta com granulado de chocolate.",
      "history": "O brigadeiro é uma presença habitual nos aniversários brasileiros e noutras celebrações.",
      "flavor": "Doce, macio, ligeiramente elástico e com sabor a chocolate.",
      "technique": "Mexa continuamente em lume baixo a médio até a massa se soltar do fundo.",
      "essentials": [
        "1 lata de leite condensado açucarado (cerca de 395 g)",
        "2 c. de sopa de cacau sem açúcar",
        "1 c. de sopa de manteiga"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 20 bolinhas",
        "time": "cerca de 25 min + arrefecimento",
        "ingredients": [
          "1 lata de leite condensado açucarado (cerca de 395 g)",
          "2 c. de sopa de cacau sem açúcar",
          "1 c. de sopa de manteiga",
          "granulado de chocolate"
        ],
        "steps": [
          "Misture leite condensado, cacau e manteiga num tacho de fundo grosso.",
          "Aqueça suavemente, mexendo sempre até a massa engrossar e o fundo ficar visível ao passar a colher.",
          "Verta para um prato untado e deixe arrefecer.",
          "Enrole bolinhas com as mãos untadas e passe pelo granulado de chocolate."
        ]
      },
      "variants": [
        "O brigadeiro de colher é servido mais mole, à colher."
      ],
      "serving": [
        "Sirva em pequenas formas de papel."
      ],
      "commonMistakes": [
        "Não substitua o leite condensado açucarado por leite evaporado sem açúcar."
      ]
    },
    "es": {
      "overview": "La mezcla se reduce, se enfría, se enrolla en bolitas y suele cubrirse de fideos de chocolate.",
      "history": "El brigadeiro es habitual en cumpleaños brasileños y otras celebraciones.",
      "flavor": "Dulce, suave, ligeramente elástico y con sabor a chocolate.",
      "technique": "Remueve continuamente a fuego bajo a medio hasta que la masa se despegue del fondo.",
      "essentials": [
        "1 lata de leche condensada azucarada (aprox. 395 g)",
        "2 cucharadas de cacao sin azúcar",
        "1 cucharada de mantequilla"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 20 bolitas",
        "time": "aprox. 25 min + enfriamiento",
        "ingredients": [
          "1 lata de leche condensada azucarada (aprox. 395 g)",
          "2 cucharadas de cacao sin azúcar",
          "1 cucharada de mantequilla",
          "fideos de chocolate"
        ],
        "steps": [
          "Mezcla leche condensada, cacao y mantequilla en un cazo de fondo grueso.",
          "Calienta suavemente, removiendo constantemente hasta que espese y se vea el fondo al pasar la cuchara.",
          "Vierte en un plato engrasado y deja enfriar.",
          "Forma bolitas con las manos engrasadas y pásalas por fideos de chocolate."
        ]
      },
      "variants": [
        "El brigadeiro de colher se sirve más blando, con cuchara."
      ],
      "serving": [
        "Sirve en pequeñas cápsulas de papel."
      ],
      "commonMistakes": [
        "No sustituyas la leche condensada azucarada por leche evaporada sin azúcar."
      ]
    },
    "de": {
      "overview": "Die Masse wird eingekocht, abgekühlt, zu Kugeln gerollt und oft in Schokoladenstreuseln gewälzt.",
      "history": "Brigadeiro gehört zu brasilianischen Geburtstagen und anderen Feiern.",
      "flavor": "Süß, weich, zäh und schokoladig.",
      "technique": "Bei niedriger bis mittlerer Hitze ständig rühren, bis sich die Masse vom Boden löst.",
      "essentials": [
        "1 Dose gezuckerte Kondensmilch (ca. 395 g)",
        "2 EL ungesüßter Kakao",
        "1 EL Butter"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 20 Kugeln",
        "time": "ca. 25 Min. + Abkühlen",
        "ingredients": [
          "1 Dose gezuckerte Kondensmilch (ca. 395 g)",
          "2 EL ungesüßter Kakao",
          "1 EL Butter",
          "Schokoladenstreusel"
        ],
        "steps": [
          "Kondensmilch, Kakao und Butter in einem Topf mit dickem Boden mischen.",
          "Sanft erhitzen und ständig rühren, bis die Masse eindickt und beim Durchziehen des Kochlöffels der Boden sichtbar wird.",
          "Auf einen eingefetteten Teller geben und abkühlen lassen.",
          "Mit eingefetteten Händen kleine Kugeln rollen und in Schokoladenstreuseln wenden."
        ]
      },
      "variants": [
        "Brigadeiro de Colher wird weicher mit einem Löffel serviert."
      ],
      "serving": [
        "In kleinen Papierförmchen servieren."
      ],
      "commonMistakes": [
        "Gezuckerte Kondensmilch nicht durch ungezuckerte Kondensmilch ersetzen."
      ]
    }
  },
  "bacalhau-a-bras": {
    "en": {
      "overview": "Desalted salt cod is flaked and mixed with fried onion, crisp potatoes and eggs.",
      "history": "The dish is particularly associated with Lisbon and Portugal’s extensive salt cod tradition.",
      "flavor": "Salty, rich and creamy, with mild onion sweetness.",
      "technique": "Use already desalted cod and allow the eggs to set gently.",
      "essentials": [
        "400 g desalted salt cod",
        "300 g potatoes",
        "1 large onion"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min with desalted fish",
        "ingredients": [
          "400 g desalted salt cod",
          "300 g potatoes",
          "1 large onion",
          "2 garlic cloves",
          "5 eggs",
          "olive oil",
          "black olives",
          "parsley"
        ],
        "steps": [
          "Poach the fish until cooked through, remove bones and skin and flake.",
          "Cut the potatoes into thin strips and fry until crisp.",
          "Fry onion and garlic in oil; fold in the fish and potatoes.",
          "Add beaten eggs and stir over low heat until set.",
          "Top with parsley and olives."
        ]
      },
      "variants": [
        "Ready-made batata palha can be used to save time."
      ],
      "serving": [
        "Serve immediately with green salad."
      ],
      "commonMistakes": [
        "Do not use salt cod that is still too salty."
      ]
    },
    "fr": {
      "overview": "La morue dessalée est effeuillée et mélangée à des oignons revenus, des pommes de terre croustillantes et des œufs.",
      "history": "Le plat est particulièrement associé à Lisbonne et à la vaste tradition portugaise de la morue salée.",
      "flavor": "Salé, généreux et crémeux, avec la douceur légère de l’oignon.",
      "technique": "Utiliser de la morue déjà dessalée et laisser les œufs prendre doucement.",
      "essentials": [
        "400 g de morue dessalée",
        "300 g de pommes de terre",
        "1 gros oignon"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min avec du poisson dessalé",
        "ingredients": [
          "400 g de morue dessalée",
          "300 g de pommes de terre",
          "1 gros oignon",
          "2 gousses d’ail",
          "5 œufs",
          "huile d’olive",
          "olives noires",
          "persil"
        ],
        "steps": [
          "Pocher la morue jusqu’à cuisson complète, retirer les arêtes et la peau et l’effeuiller.",
          "Couper les pommes de terre en fines allumettes et faire frire jusqu’à ce qu’elles soient croustillantes.",
          "Faire revenir l’oignon et l’ail dans l’huile ; incorporer la morue et les pommes de terre.",
          "Ajouter les œufs battus et remuer à feu doux jusqu’à ce qu’ils prennent.",
          "Garnir de persil et d’olives."
        ]
      },
      "variants": [
        "On peut utiliser des batatas palha prêtes à l’emploi pour gagner du temps."
      ],
      "serving": [
        "Servir immédiatement avec une salade verte."
      ],
      "commonMistakes": [
        "Ne pas utiliser de morue encore trop salée."
      ]
    },
    "pt": {
      "overview": "O bacalhau demolhado é lascado e misturado com cebola refogada, batata crocante e ovos.",
      "history": "O prato está especialmente associado a Lisboa e à vasta tradição portuguesa do bacalhau.",
      "flavor": "Salgado, encorpado e cremoso, com a doçura suave da cebola.",
      "technique": "Use bacalhau já demolhado e deixe os ovos coagular suavemente.",
      "essentials": [
        "400 g de bacalhau demolhado",
        "300 g de batatas",
        "1 cebola grande"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min com bacalhau demolhado",
        "ingredients": [
          "400 g de bacalhau demolhado",
          "300 g de batatas",
          "1 cebola grande",
          "2 dentes de alho",
          "5 ovos",
          "azeite",
          "azeitonas pretas",
          "salsa"
        ],
        "steps": [
          "Coza o bacalhau até estar bem cozido, retire espinhas e pele e lasque.",
          "Corte as batatas em palitos finos e frite até ficarem crocantes.",
          "Refogue a cebola e o alho em azeite; envolva o bacalhau e as batatas.",
          "Junte os ovos batidos e mexa em lume brando até coagularem.",
          "Finalize com salsa e azeitonas."
        ]
      },
      "variants": [
        "Pode usar batata palha de compra para poupar tempo."
      ],
      "serving": [
        "Sirva imediatamente com salada verde."
      ],
      "commonMistakes": [
        "Não use bacalhau que ainda esteja demasiado salgado."
      ]
    },
    "es": {
      "overview": "El bacalao desalado se desmenuza y se mezcla con cebolla sofrita, patatas crujientes y huevos.",
      "history": "El plato se asocia especialmente con Lisboa y la amplia tradición portuguesa del bacalao salado.",
      "flavor": "Salado, intenso y cremoso, con un dulzor suave de cebolla.",
      "technique": "Usa bacalao ya desalado y deja que los huevos cuajen suavemente.",
      "essentials": [
        "400 g de bacalao desalado",
        "300 g de patatas",
        "1 cebolla grande"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min con pescado desalado",
        "ingredients": [
          "400 g de bacalao desalado",
          "300 g de patatas",
          "1 cebolla grande",
          "2 dientes de ajo",
          "5 huevos",
          "aceite de oliva",
          "aceitunas negras",
          "perejil"
        ],
        "steps": [
          "Cuece el bacalao suavemente hasta que esté hecho, retira espinas y piel y desmenúzalo.",
          "Corta las patatas en tiras finas y fríe hasta que estén crujientes.",
          "Sofríe cebolla y ajo en aceite; incorpora el pescado y las patatas.",
          "Añade huevos batidos y remueve a fuego bajo hasta que cuajen.",
          "Añade perejil y aceitunas por encima."
        ]
      },
      "variants": [
        "Puedes usar batata palha preparada para ahorrar tiempo."
      ],
      "serving": [
        "Sirve inmediatamente con ensalada verde."
      ],
      "commonMistakes": [
        "No uses bacalao que siga demasiado salado."
      ]
    },
    "de": {
      "overview": "Entsalzener Klippfisch wird zerpflückt und mit gebratenen Zwiebeln, knusprigen Kartoffeln und Eiern vermischt.",
      "history": "Das Gericht ist besonders mit Lissabon und der vielfältigen portugiesischen Klippfischtradition verbunden.",
      "flavor": "Salzig, kräftig und cremig mit milder Zwiebelsüße.",
      "technique": "Bereits entsalzten Klippfisch verwenden und die Eier sanft stocken lassen.",
      "essentials": [
        "400 g entsalzener Klippfisch",
        "300 g Kartoffeln",
        "1 große Zwiebel"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min. mit entsalztem Fisch",
        "ingredients": [
          "400 g entsalzener Klippfisch",
          "300 g Kartoffeln",
          "1 große Zwiebel",
          "2 Knoblauchzehen",
          "5 Eier",
          "Olivenöl",
          "schwarze Oliven",
          "Petersilie"
        ],
        "steps": [
          "Fisch vollständig gar ziehen lassen, Gräten und Haut entfernen und zerpflücken.",
          "Kartoffeln in dünne Streifen schneiden und knusprig braten.",
          "Zwiebel und Knoblauch in Öl anschwitzen; Fisch und Kartoffeln unterheben.",
          "Verquirlte Eier hinzufügen und bei niedriger Hitze rühren, bis sie stocken.",
          "Mit Petersilie und Oliven garnieren."
        ]
      },
      "variants": [
        "Fertige Batata Palha kann Zeit sparen."
      ],
      "serving": [
        "Sofort mit grünem Salat servieren."
      ],
      "commonMistakes": [
        "Keinen noch zu salzigen Klippfisch verwenden."
      ]
    }
  },
  "francesinha": {
    "en": {
      "overview": "Bread is filled with cooked meat, ham and sausage, covered with cheese and served with hot sauce.",
      "history": "Francesinha is particularly linked to Porto and the city’s café and restaurant culture.",
      "flavor": "Robust, salty, rich and slightly piquant.",
      "technique": "Prepare the meat and sauce separately before gratinating the sandwich.",
      "essentials": [
        "8 thick slices of bread",
        "4 thin beef steaks",
        "150 g cooked ham"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 50 min",
        "ingredients": [
          "8 thick slices of bread",
          "4 thin beef steaks",
          "150 g cooked ham",
          "200 g fresh sausage",
          "200 g sliced cheese",
          "300 ml stock",
          "200 ml beer or alcohol-free beer",
          "150 g tomato purée/passata",
          "chilli to taste"
        ],
        "steps": [
          "Cook stock, beer and tomato into a rich sauce; season with chilli.",
          "Cook the steaks and sausage until done, ensuring the sausage is fully cooked through.",
          "Layer meat and ham between slices of bread and cover with cheese.",
          "Gratinate at 220 °C until the cheese melts and pour hot sauce over the sandwich."
        ]
      },
      "variants": [
        "Francesinha especial is often served with a fried egg and chips."
      ],
      "serving": [
        "Serve hot with a knife and fork."
      ],
      "commonMistakes": [
        "Do not make the sauce so thin that the bread completely disintegrates."
      ]
    },
    "fr": {
      "overview": "Le pain est garni de viande cuite, de jambon et de saucisse, recouvert de fromage et servi avec une sauce chaude.",
      "history": "La francesinha est particulièrement liée à Porto et à la culture des cafés et restaurants de la ville.",
      "flavor": "Puissante, salée, généreuse et légèrement piquante.",
      "technique": "Préparer la viande et la sauce séparément avant de gratiner le sandwich.",
      "essentials": [
        "8 tranches épaisses de pain",
        "4 steaks de bœuf fins",
        "150 g de jambon cuit"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 50 min",
        "ingredients": [
          "8 tranches épaisses de pain",
          "4 steaks de bœuf fins",
          "150 g de jambon cuit",
          "200 g de saucisse fraîche",
          "200 g de fromage en tranches",
          "300 ml de bouillon",
          "200 ml de bière ou de bière sans alcool",
          "150 g de purée de tomates/passata",
          "piment selon le goût"
        ],
        "steps": [
          "Faire réduire le bouillon, la bière et la tomate en une sauce généreuse ; assaisonner de piment.",
          "Cuire les steaks et la saucisse, en veillant à ce que celle-ci soit cuite à cœur.",
          "Disposer la viande et le jambon entre les tranches de pain et couvrir de fromage.",
          "Faire gratiner à 220 °C jusqu’à ce que le fromage fonde et verser la sauce chaude sur le sandwich."
        ]
      },
      "variants": [
        "La francesinha especial est souvent servie avec un œuf au plat et des frites."
      ],
      "serving": [
        "Servir chaud avec un couteau et une fourchette."
      ],
      "commonMistakes": [
        "Ne pas préparer une sauce si liquide que le pain se désagrège complètement."
      ]
    },
    "pt": {
      "overview": "O pão é recheado com carne grelhada, fiambre e salsicha, coberto com queijo e servido com molho quente.",
      "history": "A francesinha está especialmente ligada ao Porto e à cultura de cafés e restaurantes da cidade.",
      "flavor": "Intensa, salgada, encorpada e ligeiramente picante.",
      "technique": "Prepare a carne e o molho separadamente antes de gratinar a sanduíche.",
      "essentials": [
        "8 fatias grossas de pão",
        "4 bifes finos de vaca",
        "150 g de fiambre"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 50 min",
        "ingredients": [
          "8 fatias grossas de pão",
          "4 bifes finos de vaca",
          "150 g de fiambre",
          "200 g de salsicha fresca",
          "200 g de queijo em fatias",
          "300 ml de caldo",
          "200 ml de cerveja ou cerveja sem álcool",
          "150 g de puré de tomate/passata",
          "malagueta a gosto"
        ],
        "steps": [
          "Coza caldo, cerveja e tomate até obter um molho encorpado; tempere com malagueta.",
          "Grelhe os bifes e a salsicha até estarem prontos, garantindo que a salsicha fica bem cozinhada.",
          "Coloque carne e fiambre entre fatias de pão e cubra com queijo.",
          "Gratine a 220 °C até o queijo derreter e verta o molho quente por cima."
        ]
      },
      "variants": [
        "A francesinha especial é frequentemente servida com ovo estrelado e batatas fritas."
      ],
      "serving": [
        "Sirva quente com faca e garfo."
      ],
      "commonMistakes": [
        "Não faça um molho tão líquido que o pão se desfaça por completo."
      ]
    },
    "es": {
      "overview": "El pan se rellena de carne cocinada, jamón y salchicha, se cubre con queso y se sirve con salsa caliente.",
      "history": "La francesinha está especialmente vinculada a Oporto y a la cultura de sus cafés y restaurantes.",
      "flavor": "Intensa, salada, contundente y ligeramente picante.",
      "technique": "Prepara la carne y la salsa por separado antes de gratinar el sándwich.",
      "essentials": [
        "8 rebanadas gruesas de pan",
        "4 filetes finos de vacuno",
        "150 g de jamón cocido"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 50 min",
        "ingredients": [
          "8 rebanadas gruesas de pan",
          "4 filetes finos de vacuno",
          "150 g de jamón cocido",
          "200 g de salchicha fresca",
          "200 g de queso en lonchas",
          "300 ml de caldo",
          "200 ml de cerveza o cerveza sin alcohol",
          "150 g de puré de tomate/passata",
          "chile al gusto"
        ],
        "steps": [
          "Cuece caldo, cerveza y tomate hasta obtener una salsa con cuerpo; sazona con chile.",
          "Cocina los filetes y la salchicha hasta que estén hechos, asegurándote de que la salchicha se cocine por completo.",
          "Coloca carne y jamón entre rebanadas de pan y cubre con queso.",
          "Gratina a 220 °C hasta que se funda el queso y vierte la salsa caliente por encima."
        ]
      },
      "variants": [
        "La francesinha especial suele servirse con huevo frito y patatas fritas."
      ],
      "serving": [
        "Sirve caliente con cuchillo y tenedor."
      ],
      "commonMistakes": [
        "No hagas una salsa tan líquida que el pan se deshaga completamente."
      ]
    },
    "de": {
      "overview": "Brot wird mit gebratenem Fleisch, Schinken und Wurst gefüllt, mit Käse bedeckt und mit heißer Sauce serviert.",
      "history": "Francesinha ist besonders mit Porto und der Café- und Restaurantkultur der Stadt verbunden.",
      "flavor": "Kräftig, salzig, gehaltvoll und leicht pikant.",
      "technique": "Fleisch und Sauce getrennt zubereiten, bevor das Sandwich überbacken wird.",
      "essentials": [
        "8 dicke Scheiben Brot",
        "4 dünne Rindersteaks",
        "150 g Kochschinken"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 50 Min.",
        "ingredients": [
          "8 dicke Scheiben Brot",
          "4 dünne Rindersteaks",
          "150 g Kochschinken",
          "200 g frische Wurst",
          "200 g Käse in Scheiben",
          "300 ml Brühe",
          "200 ml Bier oder alkoholfreies Bier",
          "150 g Tomatenpüree/passierte Tomaten",
          "Chili nach Geschmack"
        ],
        "steps": [
          "Brühe, Bier und Tomaten zu einer kräftigen Sauce einkochen; mit Chili abschmecken.",
          "Steaks und Wurst fertig braten, dabei die Wurst vollständig durchgaren.",
          "Fleisch und Schinken zwischen Brotscheiben legen und mit Käse bedecken.",
          "Bei 220 °C überbacken, bis der Käse schmilzt, und heiße Sauce darübergeben."
        ]
      },
      "variants": [
        "Francesinha Especial wird oft mit Spiegelei und Pommes frites serviert."
      ],
      "serving": [
        "Heiß mit Messer und Gabel servieren."
      ],
      "commonMistakes": [
        "Sauce nicht so dünn machen, dass das Brot vollständig zerfällt."
      ]
    }
  },
  "caldo-verde": {
    "en": {
      "overview": "Potatoes and onion are boiled and blended into a smooth base before strips of greens are added.",
      "history": "Caldo verde has roots in northern Portugal and is served throughout the country, including at popular festivals.",
      "flavor": "Mild, hearty and green, with smoked sausage as a contrast.",
      "technique": "Slice the greens very finely and add after blending the potato base.",
      "essentials": [
        "600 g potatoes",
        "1 onion",
        "2 garlic cloves"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 40 min",
        "ingredients": [
          "600 g potatoes",
          "1 onion",
          "2 garlic cloves",
          "1.2 l water or stock",
          "200 g collard greens",
          "150 g chouriço",
          "olive oil"
        ],
        "steps": [
          "Boil potatoes, onion and garlic in water until tender.",
          "Blend the soup until smooth and add olive oil.",
          "Add finely sliced greens and simmer until tender.",
          "Heat the sausage slices in the soup until piping hot, or cook fresh sausage separately until fully done."
        ]
      },
      "variants": [
        "A plant-based version can be made without sausage."
      ],
      "serving": [
        "Serve with bread and a little olive oil."
      ],
      "commonMistakes": [
        "Do not blend the greens with the potatoes."
      ]
    },
    "fr": {
      "overview": "Les pommes de terre et l’oignon sont cuits puis mixés avant l’ajout de fines lanières de chou vert.",
      "history": "Le caldo verde trouve ses racines dans le nord du Portugal et se sert dans tout le pays, notamment lors des fêtes populaires.",
      "flavor": "Doux, généreux et vert, contrastant avec la saucisse fumée.",
      "technique": "Émincer très finement le chou et l’ajouter après avoir mixé la base de pommes de terre.",
      "essentials": [
        "600 g de pommes de terre",
        "1 oignon",
        "2 gousses d’ail"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 40 min",
        "ingredients": [
          "600 g de pommes de terre",
          "1 oignon",
          "2 gousses d’ail",
          "1,2 l d’eau ou de bouillon",
          "200 g de chou cavalier",
          "150 g de chouriço",
          "huile d’olive"
        ],
        "steps": [
          "Cuire les pommes de terre, l’oignon et l’ail dans l’eau jusqu’à tendreté.",
          "Mixer la soupe jusqu’à ce qu’elle soit lisse et ajouter l’huile d’olive.",
          "Ajouter le chou finement émincé et laisser mijoter jusqu’à tendreté.",
          "Réchauffer les rondelles de saucisse dans la soupe jusqu’à ce qu’elles soient bien chaudes, ou cuire la saucisse fraîche séparément à cœur."
        ]
      },
      "variants": [
        "Une version végétale peut être préparée sans saucisse."
      ],
      "serving": [
        "Servir avec du pain et un peu d’huile d’olive."
      ],
      "commonMistakes": [
        "Ne pas mixer le chou avec les pommes de terre."
      ]
    },
    "pt": {
      "overview": "As batatas e a cebola são cozidas e trituradas até obter uma base lisa, antes de juntar a couve cortada em tiras.",
      "history": "O caldo verde tem raízes no norte de Portugal e é servido em todo o país, incluindo nas festas populares.",
      "flavor": "Suave, encorpado e verde, com o chouriço fumado a criar contraste.",
      "technique": "Corte a couve muito finamente e junte-a depois de triturar a base de batata.",
      "essentials": [
        "600 g de batatas",
        "1 cebola",
        "2 dentes de alho"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 40 min",
        "ingredients": [
          "600 g de batatas",
          "1 cebola",
          "2 dentes de alho",
          "1,2 l de água ou caldo",
          "200 g de couve-galega",
          "150 g de chouriço",
          "azeite"
        ],
        "steps": [
          "Coza as batatas, a cebola e o alho em água até ficarem tenros.",
          "Triture a sopa até ficar lisa e junte azeite.",
          "Junte a couve cortada finamente e deixe cozinhar em lume brando até ficar tenra.",
          "Aqueça as rodelas de chouriço na sopa até estarem bem quentes, ou cozinhe completamente a salsicha fresca em separado."
        ]
      },
      "variants": [
        "Pode preparar-se uma versão vegetal sem chouriço."
      ],
      "serving": [
        "Sirva com pão e um pouco de azeite."
      ],
      "commonMistakes": [
        "Não triture a couve juntamente com as batatas."
      ]
    },
    "es": {
      "overview": "Las patatas y la cebolla se cuecen y trituran hasta obtener una base lisa antes de añadir tiras de col verde.",
      "history": "El caldo verde tiene sus raíces en el norte de Portugal y se sirve en todo el país, también en fiestas populares.",
      "flavor": "Suave, con cuerpo y verde, con el contraste del chorizo ahumado.",
      "technique": "Corta la col muy fina y añádela después de triturar la base de patata.",
      "essentials": [
        "600 g de patatas",
        "1 cebolla",
        "2 dientes de ajo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 40 min",
        "ingredients": [
          "600 g de patatas",
          "1 cebolla",
          "2 dientes de ajo",
          "1,2 l de agua o caldo",
          "200 g de berza",
          "150 g de chouriço",
          "aceite de oliva"
        ],
        "steps": [
          "Cuece las patatas, la cebolla y el ajo en agua hasta que estén tiernos.",
          "Tritura la sopa hasta que quede lisa y añade aceite de oliva.",
          "Añade la col cortada fina y cuece a fuego lento hasta que esté tierna.",
          "Calienta las rodajas de chouriço en la sopa hasta que estén bien calientes, o cocina completamente la salchicha fresca por separado."
        ]
      },
      "variants": [
        "Se puede preparar una versión vegetal sin chorizo."
      ],
      "serving": [
        "Sirve con pan y un poco de aceite de oliva."
      ],
      "commonMistakes": [
        "No tritures la col junto con las patatas."
      ]
    },
    "de": {
      "overview": "Kartoffeln und Zwiebeln werden gekocht und glatt püriert, bevor grüne Kohlstreifen hinzukommen.",
      "history": "Caldo Verde stammt aus Nordportugal und wird im ganzen Land serviert, auch bei Volksfesten.",
      "flavor": "Mild, gehaltvoll und grün, mit geräucherter Wurst als Kontrast.",
      "technique": "Kohl sehr fein schneiden und nach dem Pürieren der Kartoffelbasis hinzufügen.",
      "essentials": [
        "600 g Kartoffeln",
        "1 Zwiebel",
        "2 Knoblauchzehen"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 40 Min.",
        "ingredients": [
          "600 g Kartoffeln",
          "1 Zwiebel",
          "2 Knoblauchzehen",
          "1,2 l Wasser oder Brühe",
          "200 g Blattkohl",
          "150 g Chouriço",
          "Olivenöl"
        ],
        "steps": [
          "Kartoffeln, Zwiebel und Knoblauch in Wasser weich kochen.",
          "Suppe glatt pürieren und Olivenöl hinzufügen.",
          "Fein geschnittenen Kohl hinzufügen und weich köcheln lassen.",
          "Wurstscheiben in der Suppe vollständig erhitzen oder frische Wurst separat durchgaren."
        ]
      },
      "variants": [
        "Eine pflanzliche Variante lässt sich ohne Wurst zubereiten."
      ],
      "serving": [
        "Mit Brot und etwas Olivenöl servieren."
      ],
      "commonMistakes": [
        "Kohl nicht zusammen mit den Kartoffeln pürieren."
      ]
    }
  },
  "arroz-de-marisco": {
    "en": {
      "overview": "The rice is cooked in plenty of aromatic stock; seafood is added according to its cooking time.",
      "history": "Arroz de marisco is part of Portugal’s coastal culinary traditions.",
      "flavor": "Rich, briny and fresh with coriander.",
      "technique": "Keep the dish moist and add prawns and other seafood towards the end.",
      "essentials": [
        "300 g round-grain rice",
        "250 g raw peeled prawns",
        "300 g mussels"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "300 g round-grain rice",
          "250 g raw peeled prawns",
          "300 g mussels",
          "200 g squid in pieces",
          "400 g tomatoes",
          "1 onion",
          "2 garlic cloves",
          "1 l seafood stock",
          "coriander",
          "olive oil"
        ],
        "steps": [
          "Fry onion and garlic in oil and add tomatoes.",
          "Add stock, rice and squid and simmer until the rice is almost tender.",
          "Add cleaned mussels and prawns; cook until the seafood is done. Discard mussels that do not open.",
          "Adjust with hot stock to a moist consistency and top with coriander."
        ]
      },
      "variants": [
        "The seafood selection varies with availability."
      ],
      "serving": [
        "Serve immediately in deep plates."
      ],
      "commonMistakes": [
        "Do not let the rice absorb all the liquid."
      ]
    },
    "fr": {
      "overview": "Le riz cuit dans une quantité généreuse de bouillon aromatique ; les fruits de mer sont ajoutés selon leur temps de cuisson.",
      "history": "L’arroz de marisco fait partie des traditions culinaires du littoral portugais.",
      "flavor": "Généreux, marin et frais grâce à la coriandre.",
      "technique": "Garder le plat bien juteux et ajouter les crevettes et autres fruits de mer en fin de cuisson.",
      "essentials": [
        "300 g de riz rond",
        "250 g de crevettes crues décortiquées",
        "300 g de moules"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "300 g de riz rond",
          "250 g de crevettes crues décortiquées",
          "300 g de moules",
          "200 g de calamar en morceaux",
          "400 g de tomates",
          "1 oignon",
          "2 gousses d’ail",
          "1 l de bouillon de fruits de mer",
          "coriandre",
          "huile d’olive"
        ],
        "steps": [
          "Faire revenir l’oignon et l’ail dans l’huile et ajouter les tomates.",
          "Ajouter le bouillon, le riz et le calamar et laisser mijoter jusqu’à ce que le riz soit presque tendre.",
          "Ajouter les moules nettoyées et les crevettes ; cuire jusqu’à cuisson complète des fruits de mer. Jeter les moules qui ne s’ouvrent pas.",
          "Ajuster la consistance avec du bouillon chaud pour garder le riz juteux et garnir de coriandre."
        ]
      },
      "variants": [
        "Le choix des fruits de mer varie selon leur disponibilité."
      ],
      "serving": [
        "Servir immédiatement dans des assiettes creuses."
      ],
      "commonMistakes": [
        "Ne pas laisser le riz absorber tout le liquide."
      ]
    },
    "pt": {
      "overview": "O arroz é cozido em bastante caldo aromático; o marisco é adicionado de acordo com o tempo de cozedura.",
      "history": "O arroz de marisco faz parte das tradições gastronómicas do litoral português.",
      "flavor": "Encorpado, com sabor a mar e frescura dos coentros.",
      "technique": "Mantenha o arroz malandrinho e junte o camarão e o restante marisco perto do fim.",
      "essentials": [
        "300 g de arroz de grão redondo",
        "250 g de camarão cru descascado",
        "300 g de mexilhões"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "300 g de arroz de grão redondo",
          "250 g de camarão cru descascado",
          "300 g de mexilhões",
          "200 g de lulas em pedaços",
          "400 g de tomate",
          "1 cebola",
          "2 dentes de alho",
          "1 l de caldo de marisco",
          "coentros",
          "azeite"
        ],
        "steps": [
          "Refogue a cebola e o alho em azeite e junte o tomate.",
          "Junte caldo, arroz e lulas e deixe cozinhar em lume brando até o arroz estar quase tenro.",
          "Junte os mexilhões limpos e o camarão; cozinhe até o marisco estar pronto. Deite fora os mexilhões que não abrirem.",
          "Ajuste com caldo quente até obter uma consistência malandrinha e finalize com coentros."
        ]
      },
      "variants": [
        "A composição do marisco varia conforme a disponibilidade."
      ],
      "serving": [
        "Sirva imediatamente em pratos fundos."
      ],
      "commonMistakes": [
        "Não deixe o arroz absorver todo o líquido."
      ]
    },
    "es": {
      "overview": "El arroz se cuece en abundante caldo aromático; el marisco se añade según su tiempo de cocción.",
      "history": "El arroz de marisco forma parte de las tradiciones culinarias costeras de Portugal.",
      "flavor": "Con cuerpo, sabor a mar y frescura del cilantro.",
      "technique": "Mantén el arroz caldoso y añade las gambas y demás marisco hacia el final.",
      "essentials": [
        "300 g de arroz de grano redondo",
        "250 g de gambas crudas peladas",
        "300 g de mejillones"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "300 g de arroz de grano redondo",
          "250 g de gambas crudas peladas",
          "300 g de mejillones",
          "200 g de calamar en trozos",
          "400 g de tomates",
          "1 cebolla",
          "2 dientes de ajo",
          "1 l de caldo de marisco",
          "cilantro",
          "aceite de oliva"
        ],
        "steps": [
          "Sofríe la cebolla y el ajo en aceite y añade los tomates.",
          "Añade caldo, arroz y calamar y cuece a fuego lento hasta que el arroz esté casi tierno.",
          "Añade los mejillones limpios y las gambas; cuece hasta que el marisco esté hecho. Desecha los mejillones que no se abran.",
          "Ajusta con caldo caliente hasta obtener una consistencia caldosa y añade cilantro."
        ]
      },
      "variants": [
        "La selección de marisco varía según la disponibilidad."
      ],
      "serving": [
        "Sirve inmediatamente en platos hondos."
      ],
      "commonMistakes": [
        "No dejes que el arroz absorba todo el líquido."
      ]
    },
    "de": {
      "overview": "Reis wird in reichlich aromatischer Brühe gekocht; Meeresfrüchte kommen entsprechend ihrer Garzeit hinzu.",
      "history": "Arroz de Marisco gehört zu den kulinarischen Traditionen der portugiesischen Küste.",
      "flavor": "Vollmundig, maritim und frisch durch Koriander.",
      "technique": "Gericht saftig halten und Garnelen sowie andere Meeresfrüchte gegen Ende hinzufügen.",
      "essentials": [
        "300 g Rundkornreis",
        "250 g rohe geschälte Garnelen",
        "300 g Miesmuscheln"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "300 g Rundkornreis",
          "250 g rohe geschälte Garnelen",
          "300 g Miesmuscheln",
          "200 g Tintenfisch in Stücken",
          "400 g Tomaten",
          "1 Zwiebel",
          "2 Knoblauchzehen",
          "1 l Meeresfrüchtefond",
          "Koriander",
          "Olivenöl"
        ],
        "steps": [
          "Zwiebel und Knoblauch in Öl anschwitzen und Tomaten hinzufügen.",
          "Fond, Reis und Tintenfisch hinzufügen und köcheln lassen, bis der Reis fast gar ist.",
          "Gereinigte Miesmuscheln und Garnelen hinzufügen und garen. Muscheln entsorgen, die sich nicht öffnen.",
          "Mit heißem Fond eine saftige Konsistenz einstellen und mit Koriander garnieren."
        ]
      },
      "variants": [
        "Die Auswahl der Meeresfrüchte variiert je nach Verfügbarkeit."
      ],
      "serving": [
        "Sofort in tiefen Tellern servieren."
      ],
      "commonMistakes": [
        "Reis nicht die gesamte Flüssigkeit aufsaugen lassen."
      ]
    }
  },
  "bifana": {
    "en": {
      "overview": "The meat is often marinated with garlic and wine before frying or simmering in sauce.",
      "history": "Bifana is widespread Portuguese café and street food, with local versions including those of Porto and Vendas Novas.",
      "flavor": "Juicy, salty and aromatic.",
      "technique": "Slice the meat thinly and avoid cooking it longer than necessary.",
      "essentials": [
        "500 g pork tenderloin or loin in thin slices",
        "3 garlic cloves",
        "100 ml white wine or alcohol-free white wine"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 30 min + marinating",
        "ingredients": [
          "500 g pork tenderloin or loin in thin slices",
          "3 garlic cloves",
          "100 ml white wine or alcohol-free white wine",
          "1 tsp paprika powder",
          "1 bay leaf",
          "oil",
          "4 bread rolls",
          "mustard to taste"
        ],
        "steps": [
          "Marinate the pork with wine, garlic, paprika and bay leaf in the refrigerator.",
          "Fry the meat in batches; for whole cuts cook to at least 63 °C and rest for three minutes.",
          "If using the marinade as sauce, bring it to a boil separately and boil it thoroughly.",
          "Divide the meat among warm rolls and serve."
        ]
      },
      "variants": [
        "Porto versions are often served with meat in a spiced sauce."
      ],
      "serving": [
        "Serve with mustard or a little chilli sauce."
      ],
      "commonMistakes": [
        "Do not serve marinade that has touched raw meat without boiling it."
      ]
    },
    "fr": {
      "overview": "La viande est souvent marinée avec de l’ail et du vin avant d’être poêlée ou mijotée dans une sauce.",
      "history": "La bifana est un en-cas courant des cafés et de la cuisine de rue portugaise, avec des variantes locales notamment à Porto et Vendas Novas.",
      "flavor": "Juteuse, salée et aromatique.",
      "technique": "Couper la viande en fines tranches et éviter de la cuire plus longtemps que nécessaire.",
      "essentials": [
        "500 g de filet ou de longe de porc en fines tranches",
        "3 gousses d’ail",
        "100 ml de vin blanc ou de vin blanc sans alcool"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 30 min + marinade",
        "ingredients": [
          "500 g de filet ou de longe de porc en fines tranches",
          "3 gousses d’ail",
          "100 ml de vin blanc ou de vin blanc sans alcool",
          "1 c. à café de paprika",
          "1 feuille de laurier",
          "huile",
          "4 petits pains",
          "moutarde selon le goût"
        ],
        "steps": [
          "Faire mariner le porc au réfrigérateur avec le vin, l’ail, le paprika et le laurier.",
          "Cuire la viande par petites quantités ; pour les morceaux entiers, atteindre au moins 63 °C et laisser reposer trois minutes.",
          "Si la marinade sert de sauce, la porter séparément à ébullition et bien la faire bouillir.",
          "Répartir la viande dans les petits pains chauds et servir."
        ]
      },
      "variants": [
        "Les variantes de Porto sont souvent servies avec la viande dans une sauce épicée."
      ],
      "serving": [
        "Servir avec de la moutarde ou un peu de sauce pimentée."
      ],
      "commonMistakes": [
        "Ne pas servir une marinade ayant été en contact avec de la viande crue sans la faire bouillir."
      ]
    },
    "pt": {
      "overview": "A carne é frequentemente marinada com alho e vinho antes de ser frita ou cozinhada em molho.",
      "history": "A bifana é comum nos cafés e na comida de rua portuguesa, com variantes locais, nomeadamente no Porto e em Vendas Novas.",
      "flavor": "Suculenta, salgada e aromática.",
      "technique": "Corte a carne em fatias finas e evite cozinhá-la mais tempo do que o necessário.",
      "essentials": [
        "500 g de lombo ou lombinho de porco em fatias finas",
        "3 dentes de alho",
        "100 ml de vinho branco ou vinho branco sem álcool"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 30 min + marinada",
        "ingredients": [
          "500 g de lombo ou lombinho de porco em fatias finas",
          "3 dentes de alho",
          "100 ml de vinho branco ou vinho branco sem álcool",
          "1 c. de chá de pimentão em pó",
          "1 folha de louro",
          "óleo",
          "4 carcaças",
          "mostarda a gosto"
        ],
        "steps": [
          "Marine a carne de porco no frigorífico com vinho, alho, pimentão e louro.",
          "Frite a carne em porções; para peças inteiras, cozinhe até pelo menos 63 °C e deixe repousar três minutos.",
          "Se usar a marinada como molho, leve-a separadamente à ebulição e deixe ferver bem.",
          "Distribua a carne pelos pães quentes e sirva."
        ]
      },
      "variants": [
        "As variantes do Porto são frequentemente servidas com a carne num molho condimentado."
      ],
      "serving": [
        "Sirva com mostarda ou um pouco de molho de malagueta."
      ],
      "commonMistakes": [
        "Não sirva marinada que tenha estado em contacto com carne crua sem a ferver."
      ]
    },
    "es": {
      "overview": "La carne suele marinarse con ajo y vino antes de freírse o cocerse en salsa.",
      "history": "La bifana es habitual en los cafés y la comida callejera portuguesa, con variantes locales, entre ellas las de Oporto y Vendas Novas.",
      "flavor": "Jugosa, salada y aromática.",
      "technique": "Corta la carne en lonchas finas y evita cocinarla más tiempo del necesario.",
      "essentials": [
        "500 g de solomillo o lomo de cerdo en lonchas finas",
        "3 dientes de ajo",
        "100 ml de vino blanco o vino blanco sin alcohol"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 30 min + marinado",
        "ingredients": [
          "500 g de solomillo o lomo de cerdo en lonchas finas",
          "3 dientes de ajo",
          "100 ml de vino blanco o vino blanco sin alcohol",
          "1 cucharadita de pimentón",
          "1 hoja de laurel",
          "aceite",
          "4 panecillos",
          "mostaza al gusto"
        ],
        "steps": [
          "Marina el cerdo en el frigorífico con vino, ajo, pimentón y laurel.",
          "Fríe la carne en tandas; para cortes enteros, cocina hasta al menos 63 °C y deja reposar tres minutos.",
          "Si vas a usar el marinado como salsa, llévalo a ebullición por separado y hiérvelo bien.",
          "Reparte la carne entre los panecillos calientes y sirve."
        ]
      },
      "variants": [
        "Las variantes de Oporto suelen servirse con la carne en una salsa especiada."
      ],
      "serving": [
        "Sirve con mostaza o un poco de salsa de chile."
      ],
      "commonMistakes": [
        "No sirvas marinado que haya estado en contacto con carne cruda sin hervirlo."
      ]
    },
    "de": {
      "overview": "Das Fleisch wird häufig mit Knoblauch und Wein mariniert, bevor es gebraten oder in Sauce gegart wird.",
      "history": "Bifana ist in portugiesischen Cafés und als Streetfood verbreitet, mit lokalen Varianten unter anderem in Porto und Vendas Novas.",
      "flavor": "Saftig, salzig und aromatisch.",
      "technique": "Fleisch dünn schneiden und nicht länger als nötig braten.",
      "essentials": [
        "500 g Schweinefilet oder Schweinerücken in dünnen Scheiben",
        "3 Knoblauchzehen",
        "100 ml Weißwein oder alkoholfreier Weißwein"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 30 Min. + Marinierzeit",
        "ingredients": [
          "500 g Schweinefilet oder Schweinerücken in dünnen Scheiben",
          "3 Knoblauchzehen",
          "100 ml Weißwein oder alkoholfreier Weißwein",
          "1 TL Paprikapulver",
          "1 Lorbeerblatt",
          "Öl",
          "4 Brötchen",
          "Senf nach Geschmack"
        ],
        "steps": [
          "Schweinefleisch mit Wein, Knoblauch, Paprika und Lorbeer im Kühlschrank marinieren.",
          "Fleisch portionsweise braten; ganze Fleischstücke auf mindestens 63 °C erhitzen und drei Minuten ruhen lassen.",
          "Marinade bei Verwendung als Sauce separat aufkochen und gründlich durchkochen.",
          "Fleisch auf warme Brötchen verteilen und servieren."
        ]
      },
      "variants": [
        "Porto-Varianten werden oft mit Fleisch in einer würzigen Sauce serviert."
      ],
      "serving": [
        "Mit Senf oder etwas Chilisauce servieren."
      ],
      "commonMistakes": [
        "Marinade, die mit rohem Fleisch in Kontakt war, nicht ungekocht servieren."
      ]
    }
  },
  "pastel-de-nata": {
    "en": {
      "overview": "Thin puff pastry is filled with egg custard and baked at high heat.",
      "history": "Pastéis de nata are part of Portugal’s sweet pastry tradition, particularly associated with Lisbon and Belém.",
      "flavor": "Crisp, creamy and sweet, with a light caramel note.",
      "technique": "Use cold puff pastry and a well-preheated oven; this is an adapted home version.",
      "essentials": [
        "300 g puff pastry",
        "300 ml milk",
        "100 g sugar"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 12 small tarts",
        "time": "approx. 50 min",
        "ingredients": [
          "300 g puff pastry",
          "300 ml milk",
          "100 g sugar",
          "4 egg yolks",
          "1 tbsp cornflour",
          "lemon zest",
          "1 cinnamon stick"
        ],
        "steps": [
          "Heat the milk with lemon zest and cinnamon. Remove the aromatics.",
          "Whisk yolks, sugar and starch, gradually add warm milk and heat while stirring until the custard thickens. Cool slightly.",
          "Roll up the puff pastry, slice it and press into small tart tins.",
          "Fill the tins and bake at 240–250 °C, within the temperature limits of the oven and tins, until the pastry is golden and the custard is set."
        ]
      },
      "variants": [
        "Pastéis de Belém are a specific product from Belém, not a general name for all pastéis de nata."
      ],
      "serving": [
        "Serve warm with cinnamon and coffee."
      ],
      "commonMistakes": [
        "Do not fill the tins completely or let the pastry warm up before baking."
      ]
    },
    "fr": {
      "overview": "Une fine pâte feuilletée est garnie de crème aux œufs et cuite à haute température.",
      "history": "Les pastéis de nata font partie de la tradition pâtissière portugaise, particulièrement connue à Lisbonne et à Belém.",
      "flavor": "Croustillant, crémeux et sucré, avec une légère note caramélisée.",
      "technique": "Utiliser une pâte feuilletée froide et un four bien préchauffé ; il s’agit d’une version maison adaptée.",
      "essentials": [
        "300 g de pâte feuilletée",
        "300 ml de lait",
        "100 g de sucre"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 12 petites tartelettes",
        "time": "env. 50 min",
        "ingredients": [
          "300 g de pâte feuilletée",
          "300 ml de lait",
          "100 g de sucre",
          "4 jaunes d’œufs",
          "1 c. à soupe de fécule de maïs",
          "zeste de citron",
          "1 bâton de cannelle"
        ],
        "steps": [
          "Chauffer le lait avec le zeste de citron et la cannelle. Retirer les aromates.",
          "Fouetter les jaunes, le sucre et la fécule, incorporer progressivement le lait chaud et chauffer en remuant jusqu’à épaississement. Laisser tiédir.",
          "Rouler la pâte feuilletée, la couper en rondelles et la presser dans de petits moules à tartelettes.",
          "Remplir les moules et cuire à 240–250 °C, dans les limites de température du four et des moules, jusqu’à ce que la pâte soit dorée et la crème prise."
        ]
      },
      "variants": [
        "Les pastéis de Belém sont un produit spécifique de Belém, et non le nom générique de tous les pastéis de nata."
      ],
      "serving": [
        "Servir tiède avec de la cannelle et du café."
      ],
      "commonMistakes": [
        "Ne pas remplir les moules à ras bord ni laisser la pâte se réchauffer avant la cuisson."
      ]
    },
    "pt": {
      "overview": "Uma massa folhada fina é recheada com creme de ovos e cozida a temperatura elevada.",
      "history": "Os pastéis de nata fazem parte da doçaria portuguesa, sendo particularmente conhecidos em Lisboa e Belém.",
      "flavor": "Crocante, cremoso e doce, com uma leve nota de caramelo.",
      "technique": "Use massa folhada fria e um forno bem pré-aquecido; esta é uma versão caseira adaptada.",
      "essentials": [
        "300 g de massa folhada",
        "300 ml de leite",
        "100 g de açúcar"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 12 pastéis pequenos",
        "time": "cerca de 50 min",
        "ingredients": [
          "300 g de massa folhada",
          "300 ml de leite",
          "100 g de açúcar",
          "4 gemas",
          "1 c. de sopa de amido de milho",
          "casca de limão",
          "1 pau de canela"
        ],
        "steps": [
          "Aqueça o leite com casca de limão e canela. Retire os aromáticos.",
          "Bata as gemas, o açúcar e o amido, junte gradualmente o leite quente e aqueça, mexendo até o creme engrossar. Deixe arrefecer um pouco.",
          "Enrole a massa folhada, corte em rodelas e pressione em formas pequenas de pastéis.",
          "Encha as formas e coza a 240–250 °C, respeitando os limites de temperatura do forno e das formas, até a massa dourar e o creme firmar."
        ]
      },
      "variants": [
        "Os pastéis de Belém são um produto específico de Belém, não uma designação genérica de todos os pastéis de nata."
      ],
      "serving": [
        "Sirva mornos com canela e café."
      ],
      "commonMistakes": [
        "Não encha as formas até ao topo nem deixe a massa folhada aquecer antes de cozer."
      ]
    },
    "es": {
      "overview": "Una masa de hojaldre fina se rellena con crema de huevo y se hornea a temperatura alta.",
      "history": "Los pastéis de nata forman parte de la repostería portuguesa, especialmente conocida en Lisboa y Belém.",
      "flavor": "Crujiente, cremoso y dulce, con una ligera nota de caramelo.",
      "technique": "Usa hojaldre frío y un horno bien precalentado; esta es una versión casera adaptada.",
      "essentials": [
        "300 g de hojaldre",
        "300 ml de leche",
        "100 g de azúcar"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 12 tartaletas pequeñas",
        "time": "aprox. 50 min",
        "ingredients": [
          "300 g de hojaldre",
          "300 ml de leche",
          "100 g de azúcar",
          "4 yemas de huevo",
          "1 cucharada de almidón de maíz",
          "piel de limón",
          "1 rama de canela"
        ],
        "steps": [
          "Calienta la leche con piel de limón y canela. Retira los aromáticos.",
          "Bate las yemas, el azúcar y el almidón, incorpora poco a poco la leche caliente y calienta removiendo hasta que espese. Deja enfriar un poco.",
          "Enrolla el hojaldre, córtalo en rodajas y presiónalo en moldes pequeños para tartaletas.",
          "Rellena los moldes y hornea a 240–250 °C, respetando los límites de temperatura del horno y de los moldes, hasta que el hojaldre esté dorado y la crema haya cuajado."
        ]
      },
      "variants": [
        "Los pastéis de Belém son un producto específico de Belém, no un nombre genérico para todos los pastéis de nata."
      ],
      "serving": [
        "Sirve templados con canela y café."
      ],
      "commonMistakes": [
        "No llenes los moldes hasta arriba ni dejes que el hojaldre se caliente antes de hornear."
      ]
    },
    "de": {
      "overview": "Dünner Blätterteig wird mit Eiercreme gefüllt und bei hoher Hitze gebacken.",
      "history": "Pastéis de Nata gehören zur portugiesischen Süßgebäcktradition und sind besonders aus Lissabon und Belém bekannt.",
      "flavor": "Knusprig, cremig und süß mit leichter Karamellnote.",
      "technique": "Kalten Blätterteig und einen gut vorgeheizten Ofen verwenden; dies ist eine angepasste Hausvariante.",
      "essentials": [
        "300 g Blätterteig",
        "300 ml Milch",
        "100 g Zucker"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 12 kleine Törtchen",
        "time": "ca. 50 Min.",
        "ingredients": [
          "300 g Blätterteig",
          "300 ml Milch",
          "100 g Zucker",
          "4 Eigelb",
          "1 EL Maisstärke",
          "Zitronenschale",
          "1 Zimtstange"
        ],
        "steps": [
          "Milch mit Zitronenschale und Zimt erhitzen. Aromaten entfernen.",
          "Eigelb, Zucker und Stärke verquirlen, warme Milch nach und nach einrühren und unter Rühren erhitzen, bis die Creme eindickt. Etwas abkühlen lassen.",
          "Blätterteig aufrollen, in Scheiben schneiden und in kleine Törtchenformen drücken.",
          "Formen füllen und bei 240–250 °C innerhalb der Temperaturgrenzen von Ofen und Formen backen, bis der Teig goldbraun und die Creme gestockt ist."
        ]
      },
      "variants": [
        "Pastéis de Belém sind ein spezifisches Produkt aus Belém, keine allgemeine Bezeichnung für alle Pastéis de Nata."
      ],
      "serving": [
        "Lauwarm mit Zimt und Kaffee servieren."
      ],
      "commonMistakes": [
        "Formen nicht randvoll füllen und Blätterteig vor dem Backen nicht warm werden lassen."
      ]
    }
  },
  "pierogi": {
    "en": {
      "overview": "A thin flour dough is folded around the filling. This home version uses potato and fresh cheese.",
      "history": "Pierogi are central to Polish food culture, with cabbage and mushroom fillings among those served at Christmas.",
      "flavor": "Soft dough and a mild, rich filling.",
      "technique": "Roll the dough out evenly and pinch the edges firmly together.",
      "essentials": [
        "350 g wheat flour",
        "180 ml warm water",
        "1 tbsp oil"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 90 min",
        "ingredients": [
          "350 g wheat flour",
          "180 ml warm water",
          "1 tbsp oil",
          "400 g potatoes",
          "200 g twaróg or drained cottage cheese",
          "1 onion",
          "salt and pepper"
        ],
        "steps": [
          "Knead flour, water, oil and salt into a smooth dough; let rest.",
          "Boil the potatoes and mash them with the cheese and fried onion.",
          "Roll out the dough, cut out circles, fill and seal.",
          "Boil in batches in salted water until the dough is cooked through."
        ]
      },
      "variants": [
        "Pierogi with meat, sauerkraut and mushrooms, or fruit are other variants."
      ],
      "serving": [
        "Serve with fried onion and sour cream."
      ],
      "commonMistakes": [
        "Keep filling out of the seam when closing the dough."
      ]
    },
    "fr": {
      "overview": "Une fine pâte de farine est repliée autour de la farce. Cette version maison utilise des pommes de terre et du fromage frais.",
      "history": "Les pierogi occupent une place centrale dans la cuisine polonaise, avec notamment des farces au chou et aux champignons à Noël.",
      "flavor": "Pâte tendre et farce douce et généreuse.",
      "technique": "Étaler la pâte uniformément et bien pincer les bords.",
      "essentials": [
        "350 g de farine de blé",
        "180 ml d’eau tiède",
        "1 c. à soupe d’huile"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 90 min",
        "ingredients": [
          "350 g de farine de blé",
          "180 ml d’eau tiède",
          "1 c. à soupe d’huile",
          "400 g de pommes de terre",
          "200 g de twaróg ou de cottage cheese égoutté",
          "1 oignon",
          "sel et poivre"
        ],
        "steps": [
          "Pétrir la farine, l’eau, l’huile et le sel pour obtenir une pâte lisse ; laisser reposer.",
          "Cuire les pommes de terre et les écraser avec le fromage et l’oignon revenu.",
          "Étaler la pâte, découper des disques, garnir et fermer.",
          "Cuire par fournées dans de l’eau salée jusqu’à cuisson complète de la pâte."
        ]
      },
      "variants": [
        "Les pierogi à la viande, à la choucroute et aux champignons, ou aux fruits sont d’autres variantes."
      ],
      "serving": [
        "Servir avec de l’oignon revenu et de la crème aigre."
      ],
      "commonMistakes": [
        "Éviter de mettre de la farce sur les bords au moment de fermer la pâte."
      ]
    },
    "pt": {
      "overview": "Uma massa fina de farinha é dobrada em torno do recheio. Esta versão caseira usa batata e queijo fresco.",
      "history": "Os pierogi são centrais na cultura gastronómica polaca, incluindo recheios de couve e cogumelos no Natal.",
      "flavor": "Massa macia e recheio suave e encorpado.",
      "technique": "Estenda a massa uniformemente e aperte bem as bordas.",
      "essentials": [
        "350 g de farinha de trigo",
        "180 ml de água morna",
        "1 c. de sopa de óleo"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 90 min",
        "ingredients": [
          "350 g de farinha de trigo",
          "180 ml de água morna",
          "1 c. de sopa de óleo",
          "400 g de batatas",
          "200 g de twaróg ou queijo cottage escorrido",
          "1 cebola",
          "sal e pimenta"
        ],
        "steps": [
          "Amasse farinha, água, óleo e sal até obter uma massa lisa; deixe repousar.",
          "Coza as batatas e esmague-as com o queijo e a cebola refogada.",
          "Estenda a massa, recorte círculos, recheie e feche.",
          "Coza em porções em água salgada até a massa estar bem cozida."
        ]
      },
      "variants": [
        "Pierogi com carne, chucrute e cogumelos ou fruta são outras variantes."
      ],
      "serving": [
        "Sirva com cebola frita e natas ácidas."
      ],
      "commonMistakes": [
        "Evite deixar recheio na junção ao fechar a massa."
      ]
    },
    "es": {
      "overview": "Una masa fina de harina se dobla alrededor del relleno. Esta versión casera utiliza patata y queso fresco.",
      "history": "Los pierogi ocupan un lugar central en la cultura culinaria polaca, con rellenos de col y setas, entre otros, en Navidad.",
      "flavor": "Masa suave y relleno suave y contundente.",
      "technique": "Estira la masa uniformemente y pellizca bien los bordes para cerrarlos.",
      "essentials": [
        "350 g de harina de trigo",
        "180 ml de agua templada",
        "1 cucharada de aceite"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 90 min",
        "ingredients": [
          "350 g de harina de trigo",
          "180 ml de agua templada",
          "1 cucharada de aceite",
          "400 g de patatas",
          "200 g de twaróg o queso cottage escurrido",
          "1 cebolla",
          "sal y pimienta"
        ],
        "steps": [
          "Amasa harina, agua, aceite y sal hasta obtener una masa lisa; deja reposar.",
          "Cuece las patatas y aplástalas con el queso y la cebolla sofrita.",
          "Estira la masa, corta círculos, rellena y sella.",
          "Cuece en tandas en agua salada hasta que la masa esté bien cocida."
        ]
      },
      "variants": [
        "Los pierogi de carne, chucrut y setas o fruta son otras variantes."
      ],
      "serving": [
        "Sirve con cebolla frita y crema agria."
      ],
      "commonMistakes": [
        "Evita que quede relleno en la unión al cerrar la masa."
      ]
    },
    "de": {
      "overview": "Ein dünner Mehlteig wird um die Füllung gefaltet. Diese Hausvariante verwendet Kartoffeln und Frischkäse.",
      "history": "Pierogi sind zentral für die polnische Esskultur, unter anderem mit Kohl- und Pilzfüllung zu Weihnachten.",
      "flavor": "Weicher Teig und milde, gehaltvolle Füllung.",
      "technique": "Teig gleichmäßig ausrollen und Ränder fest zusammendrücken.",
      "essentials": [
        "350 g Weizenmehl",
        "180 ml warmes Wasser",
        "1 EL Öl"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 90 Min.",
        "ingredients": [
          "350 g Weizenmehl",
          "180 ml warmes Wasser",
          "1 EL Öl",
          "400 g Kartoffeln",
          "200 g Twaróg oder abgetropfter Hüttenkäse",
          "1 Zwiebel",
          "Salz und Pfeffer"
        ],
        "steps": [
          "Mehl, Wasser, Öl und Salz zu einem glatten Teig kneten; ruhen lassen.",
          "Kartoffeln kochen und mit Käse und gebratener Zwiebel zerdrücken.",
          "Teig ausrollen, Kreise ausstechen, füllen und verschließen.",
          "Portionsweise in Salzwasser kochen, bis der Teig vollständig gar ist."
        ]
      },
      "variants": [
        "Pierogi mit Fleisch, Sauerkraut und Pilzen oder Obst sind weitere Varianten."
      ],
      "serving": [
        "Mit gebratenen Zwiebeln und saurer Sahne servieren."
      ],
      "commonMistakes": [
        "Beim Verschließen keine Füllung in die Teignaht gelangen lassen."
      ]
    }
  },
  "bigos": {
    "en": {
      "overview": "Cabbage and meat are cooked together with mushrooms and spices into a concentrated stew.",
      "history": "Bigos has a long history in Polish food culture and is especially known as winter and festive food.",
      "flavor": "Tangy, rich and often smoky.",
      "technique": "Let the stew simmer gently for a long time.",
      "essentials": [
        "500 g sauerkraut",
        "400 g white cabbage",
        "400 g pork neck"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 3 hours",
        "ingredients": [
          "500 g sauerkraut",
          "400 g white cabbage",
          "400 g pork neck",
          "200 g smoked sausage",
          "1 onion",
          "20 g dried mushrooms",
          "2 bay leaves",
          "pepper",
          "water or stock"
        ],
        "steps": [
          "Soak the mushrooms in warm water.",
          "Brown the meat and onion.",
          "Add chopped cabbage, sauerkraut, mushrooms, spices and a little stock.",
          "Simmer covered until meat and cabbage are tender; add sausage towards the end and heat through."
        ]
      },
      "variants": [
        "Some variants use prunes and different types of meat."
      ],
      "serving": [
        "Serve with wholegrain bread."
      ],
      "commonMistakes": [
        "Do not add too much salt before tasting the sauerkraut and sausage."
      ]
    },
    "fr": {
      "overview": "Le chou et la viande mijotent avec des champignons et des épices pour former un ragoût concentré.",
      "history": "Le bigos a une longue histoire dans la cuisine polonaise et est particulièrement connu comme plat d’hiver et de fête.",
      "flavor": "Acidulé, généreux et souvent fumé.",
      "technique": "Laisser le ragoût mijoter doucement et longuement.",
      "essentials": [
        "500 g de choucroute",
        "400 g de chou blanc",
        "400 g d’échine de porc"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 3 heures",
        "ingredients": [
          "500 g de choucroute",
          "400 g de chou blanc",
          "400 g d’échine de porc",
          "200 g de saucisse fumée",
          "1 oignon",
          "20 g de champignons séchés",
          "2 feuilles de laurier",
          "poivre",
          "eau ou bouillon"
        ],
        "steps": [
          "Faire tremper les champignons dans de l’eau chaude.",
          "Faire dorer la viande et l’oignon.",
          "Ajouter le chou haché, la choucroute, les champignons, les épices et un peu de bouillon.",
          "Laisser mijoter à couvert jusqu’à tendreté de la viande et du chou ; ajouter la saucisse en fin de cuisson et bien réchauffer."
        ]
      },
      "variants": [
        "Certaines variantes utilisent des pruneaux et différentes viandes."
      ],
      "serving": [
        "Servir avec du pain complet."
      ],
      "commonMistakes": [
        "Ne pas trop saler avant d’avoir goûté la choucroute et la saucisse."
      ]
    },
    "pt": {
      "overview": "A couve e a carne são cozinhadas com cogumelos e especiarias até formar um guisado concentrado.",
      "history": "O bigos tem uma longa história na cultura gastronómica polaca e é especialmente conhecido como prato de inverno e de festa.",
      "flavor": "Ácido, encorpado e frequentemente fumado.",
      "technique": "Deixe o guisado cozinhar lentamente em lume brando.",
      "essentials": [
        "500 g de chucrute",
        "400 g de couve branca",
        "400 g de cachaço de porco"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 3 horas",
        "ingredients": [
          "500 g de chucrute",
          "400 g de couve branca",
          "400 g de cachaço de porco",
          "200 g de enchido fumado",
          "1 cebola",
          "20 g de cogumelos secos",
          "2 folhas de louro",
          "pimenta",
          "água ou caldo"
        ],
        "steps": [
          "Demolhe os cogumelos em água quente.",
          "Doure a carne e a cebola.",
          "Junte couve picada, chucrute, cogumelos, especiarias e um pouco de caldo.",
          "Deixe cozinhar em lume brando com tampa até a carne e a couve ficarem tenras; junte o enchido perto do fim e aqueça bem."
        ]
      },
      "variants": [
        "Algumas variantes usam ameixas secas e diferentes tipos de carne."
      ],
      "serving": [
        "Sirva com pão integral."
      ],
      "commonMistakes": [
        "Não junte demasiado sal antes de provar o chucrute e o enchido."
      ]
    },
    "es": {
      "overview": "La col y la carne se cuecen con setas y especias hasta formar un guiso concentrado.",
      "history": "El bigos tiene una larga historia en la cultura culinaria polaca y es especialmente conocido como plato de invierno y de fiesta.",
      "flavor": "Ácido, con cuerpo y a menudo ahumado.",
      "technique": "Deja cocer el guiso a fuego lento durante bastante tiempo.",
      "essentials": [
        "500 g de chucrut",
        "400 g de col blanca",
        "400 g de cabecero de lomo de cerdo"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 3 horas",
        "ingredients": [
          "500 g de chucrut",
          "400 g de col blanca",
          "400 g de cabecero de lomo de cerdo",
          "200 g de salchicha ahumada",
          "1 cebolla",
          "20 g de setas secas",
          "2 hojas de laurel",
          "pimienta",
          "agua o caldo"
        ],
        "steps": [
          "Remoja las setas en agua caliente.",
          "Dora la carne y la cebolla.",
          "Añade col picada, chucrut, setas, especias y un poco de caldo.",
          "Cuece a fuego lento con tapa hasta que la carne y la col estén tiernas; añade la salchicha hacia el final y calienta bien."
        ]
      },
      "variants": [
        "Algunas variantes utilizan ciruelas pasas y distintos tipos de carne."
      ],
      "serving": [
        "Sirve con pan integral."
      ],
      "commonMistakes": [
        "No añadas demasiada sal antes de probar el chucrut y la salchicha."
      ]
    },
    "de": {
      "overview": "Kohl und Fleisch werden mit Pilzen und Gewürzen zu einem konzentrierten Eintopf gekocht.",
      "history": "Bigos hat eine lange Geschichte in der polnischen Esskultur und ist besonders als Winter- und Festessen bekannt.",
      "flavor": "Säuerlich, kräftig und oft rauchig.",
      "technique": "Eintopf lange sanft schmoren lassen.",
      "essentials": [
        "500 g Sauerkraut",
        "400 g Weißkohl",
        "400 g Schweinenacken"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 3 Stunden",
        "ingredients": [
          "500 g Sauerkraut",
          "400 g Weißkohl",
          "400 g Schweinenacken",
          "200 g geräucherte Wurst",
          "1 Zwiebel",
          "20 g getrocknete Pilze",
          "2 Lorbeerblätter",
          "Pfeffer",
          "Wasser oder Brühe"
        ],
        "steps": [
          "Pilze in warmem Wasser einweichen.",
          "Fleisch und Zwiebel anbräunen.",
          "Gehackten Kohl, Sauerkraut, Pilze, Gewürze und etwas Brühe hinzufügen.",
          "Zugedeckt schmoren, bis Fleisch und Kohl weich sind; Wurst gegen Ende hinzufügen und durchwärmen."
        ]
      },
      "variants": [
        "Einige Varianten verwenden Trockenpflaumen und verschiedene Fleischsorten."
      ],
      "serving": [
        "Mit Vollkornbrot servieren."
      ],
      "commonMistakes": [
        "Nicht zu viel Salz hinzufügen, bevor Sauerkraut und Wurst abgeschmeckt wurden."
      ]
    }
  },
  "zurek": {
    "en": {
      "overview": "The broth is flavoured with zakwas and often served with sausage and eggs.",
      "history": "Żur and żurek have strong traditions in Poland, including at Easter. Names and flour types vary regionally.",
      "flavor": "Tangy, rich and aromatic with marjoram.",
      "technique": "Use suitable ready-made zakwas and adjust the taste gradually.",
      "essentials": [
        "1 l stock",
        "300 ml ready-made rye zakwas for soup",
        "300 g fresh white sausage"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 45 min",
        "ingredients": [
          "1 l stock",
          "300 ml ready-made rye zakwas for soup",
          "300 g fresh white sausage",
          "300 g potatoes",
          "2 garlic cloves",
          "marjoram",
          "4 hard-boiled eggs",
          "sour cream to taste"
        ],
        "steps": [
          "Cook the potatoes in the stock until tender.",
          "Poach the sausage until fully cooked and slice it.",
          "Gradually stir in the zakwas and let the soup simmer.",
          "Season with garlic, marjoram and optional sour cream; serve with eggs and sausage."
        ]
      },
      "variants": [
        "Versions with smoked meat or without meat exist; white barszcz is a related soup."
      ],
      "serving": [
        "Serve with bread."
      ],
      "commonMistakes": [
        "Do not add all the zakwas without tasting the acidity."
      ]
    },
    "fr": {
      "overview": "Le bouillon est relevé de zakwas et souvent servi avec de la saucisse et des œufs.",
      "history": "Le żur et le żurek sont bien ancrés dans les traditions polonaises, notamment à Pâques. Les noms et les farines varient selon les régions.",
      "flavor": "Acidulé, généreux et aromatique grâce à la marjolaine.",
      "technique": "Utiliser un zakwas adapté, prêt à l’emploi, et ajuster progressivement le goût.",
      "essentials": [
        "1 l de bouillon",
        "300 ml de zakwas de seigle prêt à l’emploi pour soupe",
        "300 g de saucisse blanche fraîche"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 45 min",
        "ingredients": [
          "1 l de bouillon",
          "300 ml de zakwas de seigle prêt à l’emploi pour soupe",
          "300 g de saucisse blanche fraîche",
          "300 g de pommes de terre",
          "2 gousses d’ail",
          "marjolaine",
          "4 œufs durs",
          "crème aigre selon le goût"
        ],
        "steps": [
          "Cuire les pommes de terre dans le bouillon jusqu’à tendreté.",
          "Pocher la saucisse jusqu’à cuisson complète et la couper en rondelles.",
          "Incorporer progressivement le zakwas et laisser mijoter la soupe.",
          "Assaisonner avec l’ail, la marjolaine et éventuellement la crème aigre ; servir avec les œufs et la saucisse."
        ]
      },
      "variants": [
        "Il existe des variantes à la viande fumée ou sans viande ; le barszcz blanc est une soupe apparentée."
      ],
      "serving": [
        "Servir avec du pain."
      ],
      "commonMistakes": [
        "Ne pas ajouter tout le zakwas sans vérifier l’acidité en goûtant."
      ]
    },
    "pt": {
      "overview": "O caldo é aromatizado com zakwas e servido frequentemente com salsicha e ovos.",
      "history": "O żur e o żurek têm fortes tradições na Polónia, incluindo na Páscoa. As designações e os tipos de farinha variam regionalmente.",
      "flavor": "Ácido, encorpado e aromático com manjerona.",
      "technique": "Use zakwas adequado, já preparado, e ajuste o sabor gradualmente.",
      "essentials": [
        "1 l de caldo",
        "300 ml de zakwas de centeio preparado para sopa",
        "300 g de salsicha branca fresca"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 45 min",
        "ingredients": [
          "1 l de caldo",
          "300 ml de zakwas de centeio preparado para sopa",
          "300 g de salsicha branca fresca",
          "300 g de batatas",
          "2 dentes de alho",
          "manjerona",
          "4 ovos cozidos",
          "natas ácidas a gosto"
        ],
        "steps": [
          "Coza as batatas no caldo até ficarem tenras.",
          "Coza a salsicha suavemente até estar bem cozinhada e corte-a em rodelas.",
          "Incorpore gradualmente o zakwas e deixe a sopa cozinhar em lume brando.",
          "Tempere com alho, manjerona e, se desejar, natas ácidas; sirva com ovos e salsicha."
        ]
      },
      "variants": [
        "Existem variantes com carne fumada ou sem carne; o barszcz branco é uma sopa semelhante."
      ],
      "serving": [
        "Sirva com pão."
      ],
      "commonMistakes": [
        "Não junte todo o zakwas sem provar a acidez."
      ]
    },
    "es": {
      "overview": "El caldo se sazona con zakwas y suele servirse con salchicha y huevos.",
      "history": "El żur y el żurek tienen una fuerte tradición en Polonia, también en Pascua. Los nombres y tipos de harina varían según la región.",
      "flavor": "Ácido, con cuerpo y aromático por la mejorana.",
      "technique": "Usa zakwas adecuado ya preparado y ajusta el sabor poco a poco.",
      "essentials": [
        "1 l de caldo",
        "300 ml de zakwas de centeno preparado para sopa",
        "300 g de salchicha blanca fresca"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 45 min",
        "ingredients": [
          "1 l de caldo",
          "300 ml de zakwas de centeno preparado para sopa",
          "300 g de salchicha blanca fresca",
          "300 g de patatas",
          "2 dientes de ajo",
          "mejorana",
          "4 huevos duros",
          "crema agria al gusto"
        ],
        "steps": [
          "Cuece las patatas en el caldo hasta que estén tiernas.",
          "Cuece la salchicha suavemente hasta que esté hecha por dentro y córtala en rodajas.",
          "Incorpora poco a poco el zakwas y deja cocer la sopa a fuego lento.",
          "Sazona con ajo, mejorana y crema agria opcional; sirve con huevos y salchicha."
        ]
      },
      "variants": [
        "Existen variantes con carne ahumada o sin carne; el barszcz blanco es una sopa emparentada."
      ],
      "serving": [
        "Sirve con pan."
      ],
      "commonMistakes": [
        "No añadas todo el zakwas sin probar la acidez."
      ]
    },
    "de": {
      "overview": "Die Brühe wird mit Zakwas aromatisiert und oft mit Wurst und Eiern serviert.",
      "history": "Żur und Żurek haben in Polen eine starke Tradition, auch zu Ostern. Bezeichnungen und Mehlsorten variieren regional.",
      "flavor": "Säuerlich, kräftig und aromatisch durch Majoran.",
      "technique": "Geeigneten fertigen Zakwas verwenden und nach und nach abschmecken.",
      "essentials": [
        "1 l Brühe",
        "300 ml fertiger Roggen-Zakwas für Suppe",
        "300 g frische weiße Wurst"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 45 Min.",
        "ingredients": [
          "1 l Brühe",
          "300 ml fertiger Roggen-Zakwas für Suppe",
          "300 g frische weiße Wurst",
          "300 g Kartoffeln",
          "2 Knoblauchzehen",
          "Majoran",
          "4 hartgekochte Eier",
          "saure Sahne nach Geschmack"
        ],
        "steps": [
          "Kartoffeln in der Brühe weich kochen.",
          "Wurst vollständig gar ziehen lassen und in Scheiben schneiden.",
          "Zakwas nach und nach einrühren und Suppe köcheln lassen.",
          "Mit Knoblauch, Majoran und nach Wunsch saurer Sahne abschmecken; mit Eiern und Wurst servieren."
        ]
      },
      "variants": [
        "Es gibt Varianten mit geräuchertem Fleisch oder ohne Fleisch; weißer Barszcz ist eine verwandte Suppe."
      ],
      "serving": [
        "Mit Brot servieren."
      ],
      "commonMistakes": [
        "Nicht den gesamten Zakwas hinzufügen, ohne die Säure abzuschmecken."
      ]
    }
  },
  "golabki": {
    "en": {
      "overview": "Soft cabbage leaves are folded around the filling and braised in stock or sauce.",
      "history": "Gołąbki are a widespread Polish version of stuffed cabbage leaves, a tradition found in many European cuisines.",
      "flavor": "Mild cabbage sweetness, rich meat and tangy tomato sauce.",
      "technique": "Soften the leaves and trim down the thick central rib before rolling.",
      "essentials": [
        "1 white cabbage",
        "500 g minced meat",
        "150 g cooked rice"
      ],
      "recipe": {
        "label": "Home version",
        "yield": "approx. 4 servings",
        "time": "approx. 90 min",
        "ingredients": [
          "1 white cabbage",
          "500 g minced meat",
          "150 g cooked rice",
          "1 onion",
          "400 g passata",
          "200 ml stock",
          "salt and pepper"
        ],
        "steps": [
          "Blanch the cabbage leaves until pliable.",
          "Mix minced meat, cooked rice, finely chopped onion and seasoning.",
          "Divide the filling among the leaves, fold in the sides and roll up.",
          "Place the rolls seam-side down in a pot, add stock and passata and simmer covered until the filling is cooked through (at least 71 °C for minced beef or pork)."
        ]
      },
      "variants": [
        "Fillings with buckwheat or mushrooms are other variants."
      ],
      "serving": [
        "Serve with tomato or mushroom sauce."
      ],
      "commonMistakes": [
        "Do not tear the leaves by forcing stiff cabbage leaves around the filling."
      ]
    },
    "fr": {
      "overview": "Des feuilles de chou assouplies sont repliées autour de la farce et braisées dans du bouillon ou de la sauce.",
      "history": "Les gołąbki sont une variante polonaise répandue des feuilles de chou farcies, une tradition présente dans de nombreuses cuisines européennes.",
      "flavor": "Douceur légère du chou, viande savoureuse et sauce tomate acidulée.",
      "technique": "Assouplir les feuilles et amincir la grosse nervure centrale avant de rouler.",
      "essentials": [
        "1 chou blanc",
        "500 g de viande hachée",
        "150 g de riz cuit"
      ],
      "recipe": {
        "label": "Version maison",
        "yield": "env. 4 portions",
        "time": "env. 90 min",
        "ingredients": [
          "1 chou blanc",
          "500 g de viande hachée",
          "150 g de riz cuit",
          "1 oignon",
          "400 g de passata",
          "200 ml de bouillon",
          "sel et poivre"
        ],
        "steps": [
          "Blanchir les feuilles de chou jusqu’à ce qu’elles soient souples.",
          "Mélanger la viande hachée, le riz cuit, l’oignon finement haché et l’assaisonnement.",
          "Répartir la farce sur les feuilles, rabattre les côtés et rouler.",
          "Disposer les rouleaux dans une marmite, fermeture vers le bas, ajouter le bouillon et la passata et laisser mijoter à couvert jusqu’à cuisson complète de la farce (au moins 71 °C pour le bœuf ou le porc haché)."
        ]
      },
      "variants": [
        "Les farces au sarrasin ou aux champignons sont d’autres variantes."
      ],
      "serving": [
        "Servir avec de la sauce tomate ou aux champignons."
      ],
      "commonMistakes": [
        "Ne pas déchirer les feuilles en forçant des feuilles de chou rigides autour de la farce."
      ]
    },
    "pt": {
      "overview": "Folhas de couve amolecidas são dobradas em torno do recheio e estufadas em caldo ou molho.",
      "history": "Os gołąbki são uma variante polaca comum de folhas de couve recheadas, tradição presente em muitas cozinhas europeias.",
      "flavor": "Doçura suave da couve, carne de sabor intenso e molho de tomate ácido.",
      "technique": "Amoleça as folhas e apare a nervura central grossa antes de enrolar.",
      "essentials": [
        "1 couve branca",
        "500 g de carne picada",
        "150 g de arroz cozido"
      ],
      "recipe": {
        "label": "Versão caseira",
        "yield": "cerca de 4 porções",
        "time": "cerca de 90 min",
        "ingredients": [
          "1 couve branca",
          "500 g de carne picada",
          "150 g de arroz cozido",
          "1 cebola",
          "400 g de passata",
          "200 ml de caldo",
          "sal e pimenta"
        ],
        "steps": [
          "Escalde as folhas de couve até ficarem flexíveis.",
          "Misture carne picada, arroz cozido, cebola finamente picada e temperos.",
          "Distribua o recheio pelas folhas, dobre as laterais para dentro e enrole.",
          "Coloque os rolos num tacho com a junção virada para baixo, junte caldo e passata e cozinhe em lume brando com tampa até o recheio estar bem cozinhado (pelo menos 71 °C para carne picada de vaca ou porco)."
        ]
      },
      "variants": [
        "Recheios de trigo-sarraceno ou cogumelos são outras variantes."
      ],
      "serving": [
        "Sirva com molho de tomate ou de cogumelos."
      ],
      "commonMistakes": [
        "Não rasgue as folhas ao forçar folhas de couve rígidas em torno do recheio."
      ]
    },
    "es": {
      "overview": "Las hojas de col ablandadas se doblan alrededor del relleno y se brasean en caldo o salsa.",
      "history": "Los gołąbki son una variante polaca extendida de hojas de col rellenas, una tradición presente en muchas cocinas europeas.",
      "flavor": "Dulzor suave de la col, carne sabrosa y salsa de tomate ácida.",
      "technique": "Ablanda las hojas y rebaja el nervio central grueso antes de enrollar.",
      "essentials": [
        "1 col blanca",
        "500 g de carne picada",
        "150 g de arroz cocido"
      ],
      "recipe": {
        "label": "Versión casera",
        "yield": "aprox. 4 raciones",
        "time": "aprox. 90 min",
        "ingredients": [
          "1 col blanca",
          "500 g de carne picada",
          "150 g de arroz cocido",
          "1 cebolla",
          "400 g de passata",
          "200 ml de caldo",
          "sal y pimienta"
        ],
        "steps": [
          "Escalda las hojas de col hasta que estén flexibles.",
          "Mezcla carne picada, arroz cocido, cebolla picada fina y condimentos.",
          "Reparte el relleno entre las hojas, dobla los lados hacia dentro y enrolla.",
          "Coloca los rollos en una olla con la unión hacia abajo, añade caldo y passata y cuece a fuego lento con tapa hasta que el relleno esté hecho por dentro (al menos 71 °C para carne picada de vacuno o cerdo)."
        ]
      },
      "variants": [
        "Los rellenos de trigo sarraceno o setas son otras variantes."
      ],
      "serving": [
        "Sirve con salsa de tomate o de setas."
      ],
      "commonMistakes": [
        "No rasgues las hojas al forzar hojas de col rígidas alrededor del relleno."
      ]
    },
    "de": {
      "overview": "Weiche Kohlblätter werden um die Füllung gefaltet und in Brühe oder Sauce geschmort.",
      "history": "Gołąbki sind eine verbreitete polnische Variante gefüllter Kohlblätter, einer Tradition vieler europäischer Küchen.",
      "flavor": "Milde Kohlsüße, kräftiges Fleisch und säuerliche Tomatensauce.",
      "technique": "Blätter weich machen und die dicke Mittelrippe vor dem Aufrollen flach schneiden.",
      "essentials": [
        "1 Weißkohl",
        "500 g Hackfleisch",
        "150 g gekochter Reis"
      ],
      "recipe": {
        "label": "Hausgemachte Variante",
        "yield": "ca. 4 Portionen",
        "time": "ca. 90 Min.",
        "ingredients": [
          "1 Weißkohl",
          "500 g Hackfleisch",
          "150 g gekochter Reis",
          "1 Zwiebel",
          "400 g passierte Tomaten",
          "200 ml Brühe",
          "Salz und Pfeffer"
        ],
        "steps": [
          "Kohlblätter blanchieren, bis sie biegsam sind.",
          "Hackfleisch, gekochten Reis, fein gehackte Zwiebel und Gewürze mischen.",
          "Füllung auf die Blätter verteilen, Seiten einschlagen und aufrollen.",
          "Rouladen mit der Naht nach unten in einen Topf legen, Brühe und passierte Tomaten hinzufügen und zugedeckt gar ziehen lassen, bis die Füllung durchgegart ist (mindestens 71 °C bei Rinder- oder Schweinehackfleisch)."
        ]
      },
      "variants": [
        "Füllungen mit Buchweizen oder Pilzen sind weitere Varianten."
      ],
      "serving": [
        "Mit Tomaten- oder Pilzsauce servieren."
      ],
      "commonMistakes": [
        "Blätter nicht durch gewaltsames Wickeln steifer Kohlblätter um die Füllung zerreißen."
      ]
    }
  }
} as const satisfies Readonly<Record<string, Record<InternationalSummaryLocale, ArticleBody>>>;
