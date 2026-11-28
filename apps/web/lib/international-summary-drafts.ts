// Review-only article summaries; original English entries are preserved verbatim.
// Editorial copy only, not verified menu evidence or search aliases.
export const internationalSummaryLocales = ["en", "fr", "pt", "es", "de"] as const;
export type InternationalSummaryLocale = (typeof internationalSummaryLocales)[number];
export const draftInternationalSummaries = {
  "ramen": {
    "en": "Japanese noodle soup built from separate layers of broth, tare, noodles, aromatic oil and toppings.",
    "fr": "Soupe de nouilles japonaise composée de couches distinctes de bouillon, de tare, de nouilles, d’huile aromatique et de garnitures.",
    "pt": "Sopa japonesa de noodles composta por camadas distintas de caldo, tare, noodles, óleo aromático e guarnições.",
    "es": "Sopa japonesa de fideos compuesta por capas diferenciadas de caldo, tare, fideos, aceite aromático y guarniciones.",
    "de": "Japanische Nudelsuppe aus getrennten Schichten von Brühe, Tare, Nudeln, Aromaöl und Einlagen."
  },
  "biryani": {
    "en": "Aromatic South Asian rice dish in which basmati, spiced filling, herbs and often meat or vegetables come together through layering and steaming.",
    "fr": "Plat de riz aromatique d’Asie du Sud associant riz basmati, garniture épicée, herbes et souvent viande ou légumes, disposés en couches et cuits à la vapeur.",
    "pt": "Prato aromático de arroz do sul da Ásia que combina basmati, recheio condimentado, ervas e, frequentemente, carne ou legumes, dispostos em camadas e cozidos a vapor.",
    "es": "Plato aromático de arroz del sur de Asia que combina basmati, relleno especiado, hierbas y a menudo carne o verduras, dispuestos en capas y cocidos al vapor.",
    "de": "Aromatisches südasiatisches Reisgericht, bei dem Basmatireis, gewürzte Füllung, Kräuter und oft Fleisch oder Gemüse geschichtet und gedämpft werden."
  },
  "falafel": {
    "en": "Deep-fried balls or flat patties of soaked legumes, herbs and spices, with a crisp crust and airy centre.",
    "fr": "Boulettes ou galettes frites de légumineuses trempées, d’herbes et d’épices, à la croûte croustillante et au cœur aéré.",
    "pt": "Bolinhas ou discos fritos de leguminosas demolhadas, ervas e especiarias, com exterior crocante e interior leve.",
    "es": "Bolas o tortitas fritas de legumbres remojadas, hierbas y especias, con corteza crujiente e interior aireado.",
    "de": "Frittierte Bällchen oder flache Bratlinge aus eingeweichten Hülsenfrüchten, Kräutern und Gewürzen mit knuspriger Kruste und lockerem Inneren."
  },
  "carbonara": {
    "en": "Roman pasta dish in which eggs, pecorino, guanciale and black pepper are emulsified with pasta water into a glossy sauce.",
    "fr": "Plat de pâtes romain où œufs, pecorino, guanciale et poivre noir sont émulsionnés avec l’eau de cuisson pour obtenir une sauce brillante.",
    "pt": "Prato romano de massa em que ovos, pecorino, guanciale e pimenta-preta são emulsionados com a água da cozedura para obter um molho brilhante.",
    "es": "Plato romano de pasta en el que huevos, pecorino, guanciale y pimienta negra se emulsionan con agua de cocción para formar una salsa brillante.",
    "de": "Römisches Pastagericht, bei dem Eier, Pecorino, Guanciale und schwarzer Pfeffer mit Nudelwasser zu einer glänzenden Sauce emulgiert werden."
  },
  "tacos-al-pastor": {
    "en": "Central Mexican tacos with marinated pork cooked on a vertical spit, thinly sliced and served in corn tortillas with onion and coriander.",
    "fr": "Tacos du centre du Mexique garnis de porc mariné cuit à la broche verticale, finement tranché et servi dans des tortillas de maïs avec oignon et coriandre.",
    "pt": "Tacos do centro do México com carne de porco marinada, assada num espeto vertical, cortada em fatias finas e servida em tortilhas de milho com cebola e coentros.",
    "es": "Tacos del centro de México con cerdo marinado cocinado en un asador vertical, cortado en láminas finas y servido en tortillas de maíz con cebolla y cilantro.",
    "de": "Zentralmexikanische Tacos mit mariniertem Schweinefleisch vom Vertikalspieß, dünn geschnitten und in Maistortillas mit Zwiebeln und Koriander serviert."
  },
  "pad-thai": {
    "en": "Thai stir-fry of rice noodles, sweet-sour-salty sauce, eggs and toppings such as peanuts, lime and bean sprouts.",
    "fr": "Plat thaïlandais sauté au wok avec nouilles de riz, sauce sucrée, acidulée et salée, œufs et garnitures comme cacahuètes, citron vert et pousses de haricot mungo.",
    "pt": "Prato tailandês salteado no wok com noodles de arroz, molho doce, ácido e salgado, ovos e guarnições como amendoins, lima e rebentos de feijão-mungo.",
    "es": "Salteado tailandés de fideos de arroz, salsa dulce, ácida y salada, huevos y guarniciones como cacahuetes, lima y brotes de judía mungo.",
    "de": "Thailändisches Wokgericht mit Reisnudeln, süß-säuerlich-salziger Sauce, Eiern und Garnituren wie Erdnüssen, Limette und Mungbohnensprossen."
  },
  "dal-makhani": {
    "en": "Creamy dal from Punjab with whole black urad beans and red kidney beans. The beans simmer with tomato and spices before the dish is finished with butter and cream.",
    "fr": "Dal crémeux du Pendjab à base de haricots urad noirs entiers et de haricots rouges, mijotés avec tomates et épices puis enrichis de beurre et de crème.",
    "pt": "Dal cremoso do Punjab com urad preto inteiro e feijão-vermelho, cozinhados lentamente com tomate e especiarias, finalizado com manteiga e natas.",
    "es": "Dal cremoso del Punyab con urad negro entero y alubias rojas, cocidos lentamente con tomate y especias y acabados con mantequilla y nata.",
    "de": "Cremiges Dal aus dem Punjab mit ganzen schwarzen Uradbohnen und Kidneybohnen, mit Tomaten und Gewürzen gekocht und mit Butter und Sahne verfeinert."
  },
  "sushi": {
    "en": "Japanese family of dishes built around vinegared rice, combined with fish, seafood, vegetables or other ingredients.",
    "fr": "Famille de plats japonais à base de riz vinaigré, associé à du poisson, des fruits de mer, des légumes ou d’autres ingrédients.",
    "pt": "Família de pratos japoneses à base de arroz avinagrado, combinado com peixe, marisco, legumes ou outros ingredientes.",
    "es": "Familia de platos japoneses a base de arroz avinagrado, combinado con pescado, marisco, verduras u otros ingredientes.",
    "de": "Japanische Gerichtfamilie auf Grundlage von Essigreis, kombiniert mit Fisch, Meeresfrüchten, Gemüse oder anderen Zutaten."
  },
  "gyoza": {
    "en": "Japanese dumplings with thin wrappers and juicy filling, often pan-fried until crisp underneath and steamed to finish in the same pan.",
    "fr": "Raviolis japonais à pâte fine et garniture juteuse, souvent dorés à la poêle puis cuits à la vapeur dans la même poêle.",
    "pt": "Dumplings japoneses de massa fina e recheio suculento, muitas vezes dourados na frigideira e acabados a vapor na mesma frigideira.",
    "es": "Dumplings japoneses de masa fina y relleno jugoso, a menudo dorados en sartén y terminados al vapor en la misma sartén.",
    "de": "Japanische Teigtaschen mit dünner Hülle und saftiger Füllung, oft unten knusprig angebraten und anschließend in derselben Pfanne gedämpft."
  },
  "tom-yum": {
    "en": "Thai soup with lemongrass, galangal, makrut lime leaves, chilli and pronounced acidity, often with prawns or mushrooms.",
    "fr": "Soupe thaïlandaise à la citronnelle, au galanga, aux feuilles de combava et au piment, très acidulée, souvent avec crevettes ou champignons.",
    "pt": "Sopa tailandesa com erva-príncipe, galanga, folhas de lima-makrut e malagueta, de acidez pronunciada, muitas vezes com camarão ou cogumelos.",
    "es": "Sopa tailandesa con hierba limón, galanga, hojas de lima makrut y chile, de marcada acidez, a menudo con gambas o setas.",
    "de": "Thailändische Suppe mit Zitronengras, Galgant, Makrutlimettenblättern, Chili und ausgeprägter Säure, oft mit Garnelen oder Pilzen."
  },
  "pho": {
    "en": "Vietnamese noodle soup with clear aromatic broth, rice noodles, herbs and often beef or chicken.",
    "fr": "Soupe vietnamienne de nouilles de riz au bouillon clair et aromatique, avec herbes et souvent bœuf ou poulet.",
    "pt": "Sopa vietnamita de noodles de arroz com caldo límpido e aromático, ervas e frequentemente carne de vaca ou frango.",
    "es": "Sopa vietnamita de fideos de arroz con caldo claro y aromático, hierbas y a menudo carne de vacuno o pollo.",
    "de": "Vietnamesische Reisnudelsuppe mit klarer aromatischer Brühe, Kräutern und oft Rindfleisch oder Hähnchen."
  },
  "banh-mi": {
    "en": "Vietnamese baguette sandwich combining crisp bread with pickled vegetables, herbs, chilli and a variety of meat or tofu fillings.",
    "fr": "Sandwich vietnamien en baguette croustillante, avec légumes marinés, herbes, piment et diverses garnitures de viande ou de tofu.",
    "pt": "Sanduíche vietnamita de baguete crocante com legumes em conserva avinagrada, ervas, malagueta e recheios variados de carne ou tofu.",
    "es": "Bocadillo vietnamita de baguette crujiente con verduras encurtidas, hierbas, chile y diversos rellenos de carne o tofu.",
    "de": "Vietnamesisches Baguettesandwich mit knusprigem Brot, eingelegtem Gemüse, Kräutern, Chili und verschiedenen Fleisch- oder Tofufüllungen."
  },
  "katsu": {
    "en": "Japanese breaded and deep-fried cutlet or fillet, known for its exceptionally crisp panko crust and juicy centre.",
    "fr": "Escalope ou filet japonais pané et frit, à la croûte de panko particulièrement croustillante et au cœur juteux.",
    "pt": "Escalope ou filete japonês panado e frito, conhecido pela crosta de panko muito crocante e pelo interior suculento.",
    "es": "Filete o escalope japonés empanado y frito, de corteza de panko especialmente crujiente e interior jugoso.",
    "de": "Japanisches paniertes und frittiertes Schnitzel oder Filet mit besonders knuspriger Pankokruste und saftigem Inneren."
  },
  "bao": {
    "en": "Soft steamed wheat buns from Chinese traditions, either sealed around a filling or open around meat, tofu and vegetables.",
    "fr": "Petits pains chinois moelleux à la farine de blé, cuits à la vapeur, fermés autour d’une farce ou ouverts et garnis de viande, tofu et légumes.",
    "pt": "Pãezinhos chineses de trigo, macios e cozidos a vapor, fechados sobre um recheio ou abertos com carne, tofu e legumes.",
    "es": "Panecillos chinos de trigo, suaves y cocidos al vapor, cerrados alrededor de un relleno o abiertos con carne, tofu y verduras.",
    "de": "Weiche gedämpfte chinesische Weizenbrötchen, entweder geschlossen gefüllt oder offen mit Fleisch, Tofu und Gemüse belegt."
  },
  "mapo-tofu": {
    "en": "Sichuan dish of silky tofu in a hot, aromatic sauce with chilli, fermented beans and Sichuan pepper.",
    "fr": "Plat du Sichuan composé de tofu soyeux dans une sauce piquante et aromatique au piment, aux haricots fermentés et au poivre du Sichuan.",
    "pt": "Prato de Sichuan com tofu sedoso num molho picante e aromático com malagueta, feijão fermentado e pimenta de Sichuan.",
    "es": "Plato de Sichuan con tofu sedoso en una salsa picante y aromática con chile, legumbres fermentadas y pimienta de Sichuan.",
    "de": "Sichuan-Gericht mit seidigem Tofu in scharfer, aromatischer Sauce mit Chili, fermentierten Bohnen und Sichuanpfeffer."
  },
  "butter-chicken": {
    "en": "North Indian chicken dish in a rich tomato and butter sauce with warming spices, known as murgh makhani.",
    "fr": "Plat de poulet du nord de l’Inde dans une sauce riche à la tomate, au beurre et aux épices chaudes, appelé murgh makhani.",
    "pt": "Prato de frango do norte da Índia num molho rico de tomate, manteiga e especiarias quentes, conhecido como murgh makhani.",
    "es": "Plato de pollo del norte de la India en una salsa rica de tomate, mantequilla y especias cálidas, conocido como murgh makhani.",
    "de": "Nordindisches Hähnchengericht in reichhaltiger Tomaten-Butter-Sauce mit wärmenden Gewürzen, bekannt als Murgh Makhani."
  },
  "tandoori": {
    "en": "North Indian cooking method in which marinated meat or other ingredients are cooked at high heat in a cylindrical tandoor.",
    "fr": "Technique de cuisson du nord de l’Inde où viandes marinées ou autres ingrédients sont cuits à très haute température dans un four cylindrique appelé tandoor.",
    "pt": "Método de confeção do norte da Índia em que carne marinada ou outros ingredientes são cozinhados a alta temperatura num forno cilíndrico chamado tandoor.",
    "es": "Método de cocción del norte de la India en el que carne marinada u otros ingredientes se cocinan a alta temperatura en un horno cilíndrico llamado tandoor.",
    "de": "Nordindische Garmethode, bei der mariniertes Fleisch oder andere Zutaten bei hoher Hitze im zylindrischen Tandoor gegart werden."
  },
  "chana-masala": {
    "en": "Spiced chickpea dish from North Indian and Punjabi culinary traditions, with tomato, onion, ginger and tangy seasoning.",
    "fr": "Plat de pois chiches épicés du nord de l’Inde et du Pendjab, avec tomate, oignon, gingembre et assaisonnement acidulé.",
    "pt": "Prato condimentado de grão-de-bico das tradições do norte da Índia e do Punjab, com tomate, cebola, gengibre e temperos ácidos.",
    "es": "Plato especiado de garbanzos del norte de la India y del Punyab, con tomate, cebolla, jengibre y condimentos ácidos.",
    "de": "Würziges Kichererbsengericht aus nordindischen und Punjabi-Küchentraditionen mit Tomate, Zwiebel, Ingwer und säuerlicher Würzung."
  },
  "dosa": {
    "en": "South Indian thin, crisp pancake made from fermented rice and lentil batter, often served with sambar and chutney.",
    "fr": "Fine crêpe croustillante du sud de l’Inde à base de pâte fermentée de riz et de lentilles, souvent servie avec sambar et chutney.",
    "pt": "Panqueca fina e crocante do sul da Índia feita de massa fermentada de arroz e lentilhas, frequentemente servida com sambar e chutney.",
    "es": "Crepe fina y crujiente del sur de la India hecha con masa fermentada de arroz y lentejas, a menudo servida con sambar y chutney.",
    "de": "Dünner, knuspriger südindischer Pfannkuchen aus fermentiertem Reis-Linsen-Teig, oft mit Sambar und Chutney serviert."
  },
  "cacio-e-pepe": {
    "en": "Roman pasta with pecorino romano and black pepper, brought together into a creamy sauce with starchy pasta water.",
    "fr": "Pâtes romaines au pecorino romano et au poivre noir, liés en une sauce crémeuse avec l’eau de cuisson riche en amidon.",
    "pt": "Massa romana com pecorino romano e pimenta-preta, ligados num molho cremoso com a água da cozedura rica em amido.",
    "es": "Pasta romana con pecorino romano y pimienta negra, ligados en una salsa cremosa con agua de cocción rica en almidón.",
    "de": "Römische Pasta mit Pecorino Romano und schwarzem Pfeffer, durch stärkehaltiges Nudelwasser zu einer cremigen Sauce verbunden."
  },
  "pizza-margherita": {
    "en": "Neapolitan pizza in which fermented dough, tomato, mozzarella, basil and olive oil are cooked briefly at very high heat.",
    "fr": "Pizza napolitaine à pâte fermentée, tomate, mozzarella, basilic et huile d’olive, cuite brièvement à très haute température.",
    "pt": "Pizza napolitana de massa fermentada, tomate, mozzarella, manjericão e azeite, cozida brevemente a temperatura muito elevada.",
    "es": "Pizza napolitana de masa fermentada, tomate, mozzarella, albahaca y aceite de oliva, horneada brevemente a temperatura muy alta.",
    "de": "Neapolitanische Pizza aus fermentiertem Teig, Tomate, Mozzarella, Basilikum und Olivenöl, kurz bei sehr hoher Hitze gebacken."
  },
  "arancini": {
    "en": "Sicilian deep-fried rice balls or cones with crisp breading and fillings such as ragù, cheese or vegetables.",
    "fr": "Boulettes ou cônes de riz siciliens frits, à la panure croustillante et garnis de ragù, de fromage ou de légumes.",
    "pt": "Bolinhas ou cones sicilianos de arroz fritos, com panado crocante e recheios como ragù, queijo ou legumes.",
    "es": "Bolas o conos sicilianos de arroz fritos, con empanado crujiente y rellenos como ragú, queso o verduras.",
    "de": "Frittierte sizilianische Reisbällchen oder -kegel mit knuspriger Panade und Füllungen wie Ragù, Käse oder Gemüse."
  },
  "pasta-alla-norma": {
    "en": "Sicilian pasta with tomato, aubergine, basil and salted ricotta, particularly associated with Catania.",
    "fr": "Pâtes siciliennes à la tomate, à l’aubergine, au basilic et à la ricotta salée, particulièrement associées à Catane.",
    "pt": "Massa siciliana com tomate, beringela, manjericão e ricotta salgada, particularmente associada a Catânia.",
    "es": "Pasta siciliana con tomate, berenjena, albahaca y ricotta salada, especialmente asociada a Catania.",
    "de": "Sizilianische Pasta mit Tomate, Aubergine, Basilikum und gesalzenem Ricotta, besonders mit Catania verbunden."
  },
  "hummus": {
    "en": "Creamy chickpea and tahini dish from eastern Mediterranean traditions, flavoured with lemon, garlic and olive oil.",
    "fr": "Préparation crémeuse de pois chiches et de tahini issue des traditions de la Méditerranée orientale, parfumée au citron, à l’ail et à l’huile d’olive.",
    "pt": "Preparação cremosa de grão-de-bico e tahini das tradições do Mediterrâneo oriental, aromatizada com limão, alho e azeite.",
    "es": "Preparación cremosa de garbanzos y tahini de las tradiciones del Mediterráneo oriental, aromatizada con limón, ajo y aceite de oliva.",
    "de": "Cremiges Gericht aus Kichererbsen und Tahini aus dem östlichen Mittelmeerraum, mit Zitrone, Knoblauch und Olivenöl abgeschmeckt."
  },
  "shawarma": {
    "en": "Spiced meat from a vertical rotating spit, thinly sliced and served with bread, sauce, salad and pickles.",
    "fr": "Viande épicée cuite sur une broche verticale rotative, tranchée finement et servie avec pain, sauce, salade et légumes marinés.",
    "pt": "Carne condimentada assada num espeto vertical rotativo, cortada em fatias finas e servida com pão, molho, salada e pickles.",
    "es": "Carne especiada asada en un espetón vertical giratorio, cortada en láminas finas y servida con pan, salsa, ensalada y encurtidos.",
    "de": "Gewürztes Fleisch vom rotierenden Vertikalspieß, dünn geschnitten und mit Brot, Sauce, Salat und eingelegtem Gemüse serviert."
  },
  "manakish": {
    "en": "Levantine flatbread baked with za'atar, cheese, meat or other toppings, often eaten for breakfast or as a quick meal.",
    "fr": "Pain plat levantin cuit au four avec zaatar, fromage, viande ou autres garnitures, souvent consommé au petit-déjeuner ou comme repas rapide.",
    "pt": "Pão achatado levantino assado com zaatar, queijo, carne ou outras coberturas, frequentemente consumido ao pequeno-almoço ou como refeição rápida.",
    "es": "Pan plano levantino horneado con zaatar, queso, carne u otras coberturas, habitual en el desayuno o como comida rápida.",
    "de": "Levantinisches Fladenbrot, mit Zaatar, Käse, Fleisch oder anderen Belägen gebacken, oft zum Frühstück oder als schnelle Mahlzeit."
  },
  "koshari": {
    "en": "Egyptian everyday and street food of rice, lentils, pasta and chickpeas topped with tomato sauce, garlic vinegar and crisp fried onions.",
    "fr": "Plat quotidien et de rue égyptien composé de riz, lentilles, pâtes et pois chiches, garni de sauce tomate, de vinaigre à l’ail et d’oignons frits croustillants.",
    "pt": "Comida quotidiana e de rua egípcia de arroz, lentilhas, massa e grão-de-bico, com molho de tomate, vinagre de alho e cebola frita crocante.",
    "es": "Comida cotidiana y callejera egipcia de arroz, lentejas, pasta y garbanzos, con salsa de tomate, vinagre con ajo y cebolla frita crujiente.",
    "de": "Ägyptisches Alltags- und Streetfood aus Reis, Linsen, Pasta und Kichererbsen mit Tomatensauce, Knoblauchessig und knusprigen Röstzwiebeln."
  },
  "pide": {
    "en": "Turkish oven-baked flatbread, often boat-shaped and topped with meat, cheese, vegetables or eggs.",
    "fr": "Pain plat turc cuit au four, souvent en forme de barque et garni de viande, fromage, légumes ou œufs.",
    "pt": "Pão achatado turco assado no forno, muitas vezes em forma de barco, com carne, queijo, legumes ou ovos.",
    "es": "Pan plano turco horneado, a menudo en forma de barca, con carne, queso, verduras o huevos.",
    "de": "Türkisches Ofenfladenbrot, oft schiffchenförmig und mit Fleisch, Käse, Gemüse oder Eiern belegt."
  },
  "birria": {
    "en": "Dish from Jalisco featuring slow-cooked, chilli-marinated meat and concentrated broth, served as a stew or in tacos.",
    "fr": "Plat du Jalisco à base de viande marinée au piment et mijotée lentement dans un bouillon concentré, servi en ragoût ou dans des tacos.",
    "pt": "Prato de Jalisco com carne marinada em malagueta e cozinhada lentamente, com caldo concentrado, servido como guisado ou em tacos.",
    "es": "Plato de Jalisco de carne marinada en chile y cocinada lentamente con caldo concentrado, servido como guiso o en tacos.",
    "de": "Gericht aus Jalisco mit langsam gegartem, chilimariniertem Fleisch und konzentrierter Brühe, als Eintopf oder in Tacos serviert."
  },
  "cochinita-pibil": {
    "en": "Dish from Yucatán of pork marinated in achiote and citrus, traditionally wrapped and slow-cooked until very tender.",
    "fr": "Plat du Yucatán à base de porc mariné à l’achiote et aux agrumes, traditionnellement enveloppé et cuit lentement jusqu’à devenir très tendre.",
    "pt": "Prato do Iucatão de carne de porco marinada em achiote e citrinos, tradicionalmente embrulhada e cozinhada lentamente até ficar muito tenra.",
    "es": "Plato de Yucatán de cerdo marinado en achiote y cítricos, tradicionalmente envuelto y cocinado lentamente hasta quedar muy tierno.",
    "de": "Gericht aus Yucatán mit in Achiote und Zitrusfrüchten mariniertem Schweinefleisch, traditionell eingewickelt und langsam sehr zart gegart."
  },
  "pozole": {
    "en": "Mexican soup or stew built around nixtamalised maize, or hominy, with meat or other ingredients and a wide variety of fresh toppings.",
    "fr": "Soupe ou ragoût mexicain à base de maïs nixtamalisé, ou hominy, avec viande ou autres ingrédients et de nombreuses garnitures fraîches.",
    "pt": "Sopa ou guisado mexicano à base de milho nixtamalizado, ou hominy, com carne ou outros ingredientes e muitas guarnições frescas.",
    "es": "Sopa o guiso mexicano a base de maíz nixtamalizado, con carne u otros ingredientes y gran variedad de guarniciones frescas.",
    "de": "Mexikanische Suppe oder Eintopf aus nixtamalisiertem Mais, auch Hominy genannt, mit Fleisch oder anderen Zutaten und zahlreichen frischen Garnituren."
  },
  "fish-taco": {
    "en": "Baja-inspired fish taco, often crisp-battered or grilled, in a corn tortilla with cabbage, creamy sauce, salsa and lime.",
    "fr": "Taco inspiré de la Basse-Californie, au poisson souvent frit en pâte croustillante ou grillé, dans une tortilla de maïs avec chou, sauce crémeuse, salsa et citron vert.",
    "pt": "Taco inspirado na Baixa Califórnia, com peixe frequentemente frito em polme crocante ou grelhado, em tortilha de milho com couve, molho cremoso, salsa e lima.",
    "es": "Taco inspirado en Baja California, con pescado a menudo rebozado y crujiente o a la parrilla, en tortilla de maíz con col, salsa cremosa, salsa y lima.",
    "de": "Von Baja inspirierter Fisch-Taco, oft knusprig ausgebacken oder gegrillt, in einer Maistortilla mit Kohl, cremiger Sauce, Salsa und Limette."
  },
  "smashburger": {
    "en": "Burger style in which a loosely formed ball of meat is pressed firmly onto a very hot cooking surface for maximum browned crust and thin, juicy patties.",
    "fr": "Style de burger où une boule de viande peu tassée est fortement pressée sur une plaque très chaude pour obtenir une croûte bien dorée et un steak fin et juteux.",
    "pt": "Estilo de hambúrguer em que uma bola de carne pouco compactada é pressionada com força sobre uma chapa muito quente, para obter uma crosta bem dourada e um hambúrguer fino e suculento.",
    "es": "Estilo de hamburguesa en el que una bola de carne poco compactada se aplasta con fuerza sobre una plancha muy caliente para lograr una corteza bien dorada y una pieza fina y jugosa.",
    "de": "Burgerstil, bei dem eine locker geformte Fleischkugel fest auf eine sehr heiße Bratfläche gedrückt wird, um eine möglichst kräftige Bräunung und dünne, saftige Patties zu erhalten."
  },
  "sambar": {
    "en": "South Indian lentil stew with vegetables, tamarind and spices.",
    "fr": "Ragoût de lentilles du sud de l’Inde aux légumes, au tamarin et aux épices.",
    "pt": "Guisado de lentilhas do sul da Índia com legumes, tamarindo e especiarias.",
    "es": "Guiso de lentejas del sur de la India con verduras, tamarindo y especias.",
    "de": "Südindischer Linseneintopf mit Gemüse, Tamarinde und Gewürzen."
  },
  "idli": {
    "en": "Soft steamed rice cakes made from fermented rice and urad dal.",
    "fr": "Galettes de riz moelleuses cuites à la vapeur, à base de riz fermenté et d’urad dal.",
    "pt": "Bolinhos de arroz macios, cozidos a vapor, feitos de arroz fermentado e urad dal.",
    "es": "Pastelitos de arroz suaves y cocidos al vapor, de arroz fermentado y urad dal.",
    "de": "Weiche gedämpfte Reisküchlein aus fermentiertem Reis und Urad Dal."
  },
  "vada": {
    "en": "Crisp South Indian legume fritters, often with a hole in the centre.",
    "fr": "Beignets croustillants de légumineuses du sud de l’Inde, souvent percés au centre.",
    "pt": "Fritos crocantes de leguminosas do sul da Índia, muitas vezes com um orifício no centro.",
    "es": "Buñuelos crujientes de legumbres del sur de la India, a menudo con un agujero en el centro.",
    "de": "Knusprige südindische Hülsenfruchtküchlein, oft mit einem Loch in der Mitte."
  },
  "naan": {
    "en": "Soft oven-baked wheat flatbread.",
    "fr": "Pain plat moelleux de blé cuit au four.",
    "pt": "Pão achatado macio de farinha de trigo, cozido no forno.",
    "es": "Pan plano y suave de trigo horneado.",
    "de": "Weiches, im Ofen gebackenes Weizenfladenbrot."
  },
  "yakitori": {
    "en": "Japanese grilled chicken skewers.",
    "fr": "Brochettes japonaises de poulet grillé.",
    "pt": "Espetadas japonesas de frango grelhado.",
    "es": "Brochetas japonesas de pollo a la parrilla.",
    "de": "Japanische gegrillte Hähnchenspieße."
  },
  "green-curry": {
    "en": "Thai curry with green chilli paste and coconut milk.",
    "fr": "Curry thaïlandais à la pâte de piment vert et au lait de coco.",
    "pt": "Caril tailandês com pasta de malagueta verde e leite de coco.",
    "es": "Curri tailandés con pasta de chile verde y leche de coco.",
    "de": "Thailändisches Curry mit grüner Chilipaste und Kokosmilch."
  },
  "udon": {
    "en": "Thick Japanese wheat noodles with a springy texture.",
    "fr": "Épaisses nouilles japonaises de blé à la texture élastique.",
    "pt": "Noodles japoneses grossos de trigo com textura elástica.",
    "es": "Fideos japoneses gruesos de trigo de textura elástica.",
    "de": "Dicke japanische Weizennudeln mit elastischer Konsistenz."
  },
  "dumplings": {
    "en": "Small filled dough parcels, boiled, steamed or fried.",
    "fr": "Petits chaussons de pâte farcis, bouillis, cuits à la vapeur ou poêlés.",
    "pt": "Pequenas porções de massa recheada, cozidas em água, a vapor ou fritas.",
    "es": "Pequeños paquetes de masa rellena, hervidos, al vapor o fritos.",
    "de": "Kleine gefüllte Teigtaschen, gekocht, gedämpft oder gebraten."
  },
  "pad-kra-pao": {
    "en": "Thai stir-fry with holy basil, chilli and garlic.",
    "fr": "Plat thaïlandais sauté au basilic sacré, au piment et à l’ail.",
    "pt": "Salteado tailandês com manjericão-sagrado, malagueta e alho.",
    "es": "Salteado tailandés con albahaca sagrada, chile y ajo.",
    "de": "Thailändisches Wokgericht mit heiligem Basilikum, Chili und Knoblauch."
  },
  "bun-cha": {
    "en": "Vietnamese grilled pork with rice noodles, herbs and dipping sauce.",
    "fr": "Porc grillé vietnamien accompagné de nouilles de riz, d’herbes et de sauce à tremper.",
    "pt": "Carne de porco grelhada vietnamita com noodles de arroz, ervas e molho para mergulhar.",
    "es": "Cerdo a la parrilla vietnamita con fideos de arroz, hierbas y salsa para mojar.",
    "de": "Vietnamesisches gegrilltes Schweinefleisch mit Reisnudeln, Kräutern und Dipsauce."
  },
  "vietnamese-spring-rolls": {
    "en": "Fresh Vietnamese spring rolls in rice paper.",
    "fr": "Rouleaux de printemps vietnamiens frais en feuilles de riz.",
    "pt": "Rolinhos vietnamitas frescos em papel de arroz.",
    "es": "Rollitos vietnamitas frescos en papel de arroz.",
    "de": "Frische vietnamesische Sommerrollen in Reispapier."
  },
  "pizza-marinara": {
    "en": "Neapolitan pizza with tomato, garlic, oregano and olive oil, without cheese.",
    "fr": "Pizza napolitaine à la tomate, à l’ail, à l’origan et à l’huile d’olive, sans fromage.",
    "pt": "Pizza napolitana com tomate, alho, orégãos e azeite, sem queijo.",
    "es": "Pizza napolitana con tomate, ajo, orégano y aceite de oliva, sin queso.",
    "de": "Neapolitanische Pizza mit Tomate, Knoblauch, Oregano und Olivenöl, ohne Käse."
  },
  "peking-duck": {
    "en": "Chinese roast duck with crisp skin, often served in thin pancakes.",
    "fr": "Canard rôti chinois à la peau croustillante, souvent servi dans de fines crêpes.",
    "pt": "Pato assado chinês com pele crocante, muitas vezes servido em panquecas finas.",
    "es": "Pato asado chino de piel crujiente, a menudo servido en tortitas finas.",
    "de": "Chinesische gebratene Ente mit knuspriger Haut, oft in dünnen Pfannkuchen serviert."
  },
  "dan-dan-noodles": {
    "en": "Sichuan noodles with chilli oil, spiced meat and aromatic sauce.",
    "fr": "Nouilles du Sichuan à l’huile pimentée, à la viande épicée et à la sauce aromatique.",
    "pt": "Noodles de Sichuan com óleo de malagueta, carne condimentada e molho aromático.",
    "es": "Fideos de Sichuan con aceite de chile, carne especiada y salsa aromática.",
    "de": "Sichuan-Nudeln mit Chiliöl, gewürztem Fleisch und aromatischer Sauce."
  },
  "amatriciana": {
    "en": "Italian pasta with tomato, guanciale and pecorino.",
    "fr": "Pâtes italiennes à la tomate, au guanciale et au pecorino.",
    "pt": "Massa italiana com tomate, guanciale e pecorino.",
    "es": "Pasta italiana con tomate, guanciale y pecorino.",
    "de": "Italienische Pasta mit Tomate, Guanciale und Pecorino."
  },
  "saltimbocca": {
    "en": "Thin slices of veal with prosciutto and sage.",
    "fr": "Fines tranches de veau au prosciutto et à la sauge.",
    "pt": "Fatias finas de vitela com prosciutto e salva.",
    "es": "Filetes finos de ternera con prosciutto y salvia.",
    "de": "Dünne Kalbfleischscheiben mit Prosciutto und Salbei."
  },
  "cannoli": {
    "en": "Crisp Sicilian pastry tubes filled with sweetened ricotta.",
    "fr": "Tubes de pâte siciliens croustillants garnis de ricotta sucrée.",
    "pt": "Canudos sicilianos de massa crocante recheados com ricotta adoçada.",
    "es": "Tubos sicilianos de masa crujiente rellenos de ricotta endulzada.",
    "de": "Knusprige sizilianische Teigröllchen mit gesüßter Ricottafüllung."
  },
  "quesadilla": {
    "en": "Mexican tortilla with filling, folded and heated on a griddle.",
    "fr": "Tortilla mexicaine garnie, pliée et chauffée sur une plaque.",
    "pt": "Tortilha mexicana recheada, dobrada e aquecida numa chapa.",
    "es": "Tortilla mexicana rellena, doblada y calentada en una plancha.",
    "de": "Gefüllte mexikanische Tortilla, gefaltet und auf einer Grillplatte erhitzt."
  },
  "bibimbap": {
    "en": "Korean rice dish with vegetables, gochujang and often egg or meat.",
    "fr": "Plat coréen de riz aux légumes, au gochujang et souvent à l’œuf ou à la viande.",
    "pt": "Prato coreano de arroz com legumes, gochujang e muitas vezes ovo ou carne.",
    "es": "Plato coreano de arroz con verduras, gochujang y a menudo huevo o carne.",
    "de": "Koreanisches Reisgericht mit Gemüse, Gochujang und oft Ei oder Fleisch."
  },
  "bulgogi": {
    "en": "Thin slices of marinated Korean beef, fried or grilled.",
    "fr": "Fines tranches de bœuf mariné à la coréenne, poêlées ou grillées.",
    "pt": "Fatias finas de carne de vaca marinada à coreana, salteadas ou grelhadas.",
    "es": "Láminas finas de carne de vacuno marinada al estilo coreano, salteadas o a la parrilla.",
    "de": "Dünne Scheiben marinierten koreanischen Rindfleischs, gebraten oder gegrillt."
  },
  "japchae": {
    "en": "Korean sweet potato starch glass noodles with vegetables and soy-sesame sauce.",
    "fr": "Vermicelles coréens translucides à base d’amidon de patate douce, avec légumes et sauce au soja et au sésame.",
    "pt": "Noodles coreanos transparentes de amido de batata-doce, com legumes e molho de soja e sésamo.",
    "es": "Fideos coreanos transparentes de almidón de boniato, con verduras y salsa de soja y sésamo.",
    "de": "Koreanische Glasnudeln aus Süßkartoffelstärke mit Gemüse und Soja-Sesam-Sauce."
  },
  "kimchi-jjigae": {
    "en": "Korean stew with fermented kimchi, tofu and often pork.",
    "fr": "Ragoût coréen au kimchi fermenté, au tofu et souvent au porc.",
    "pt": "Guisado coreano com kimchi fermentado, tofu e muitas vezes carne de porco.",
    "es": "Guiso coreano con kimchi fermentado, tofu y a menudo cerdo.",
    "de": "Koreanischer Eintopf mit fermentiertem Kimchi, Tofu und oft Schweinefleisch."
  },
  "tteokbokki": {
    "en": "Korean rice cakes in a sweetish, hot chilli sauce.",
    "fr": "Gâteaux de riz coréens dans une sauce pimentée, légèrement sucrée.",
    "pt": "Bolinhos de arroz coreanos num molho de malagueta picante e ligeiramente doce.",
    "es": "Pastelitos de arroz coreanos en salsa de chile picante y ligeramente dulce.",
    "de": "Koreanische Reiskuchen in einer süßlichen, scharfen Chilisauce."
  },
  "samgyeopsal": {
    "en": "Korean barbecue dish of sliced pork belly.",
    "fr": "Barbecue coréen de tranches de poitrine de porc.",
    "pt": "Prato de churrasco coreano de fatias de barriga de porco.",
    "es": "Parrillada coreana de lonchas de panceta de cerdo.",
    "de": "Koreanisches Grillgericht aus Schweinebauchscheiben."
  },
  "banh-xeo": {
    "en": "Crisp Vietnamese rice pancake with turmeric, bean sprouts and often prawns or pork.",
    "fr": "Crêpe de riz vietnamienne croustillante au curcuma, aux pousses de haricot mungo et souvent aux crevettes ou au porc.",
    "pt": "Panqueca vietnamita crocante de arroz com curcuma, rebentos de feijão e frequentemente camarão ou porco.",
    "es": "Crepe vietnamita crujiente de arroz con cúrcuma, brotes de judía y a menudo gambas o cerdo.",
    "de": "Knuspriger vietnamesischer Reispfannkuchen mit Kurkuma, Bohnensprossen und oft Garnelen oder Schweinefleisch."
  },
  "bun-bo-hue": {
    "en": "Spicy Vietnamese noodle soup with beef, lemongrass and chilli.",
    "fr": "Soupe vietnamienne de nouilles épicée au bœuf, à la citronnelle et au piment.",
    "pt": "Sopa vietnamita picante de noodles com carne de vaca, erva-príncipe e malagueta.",
    "es": "Sopa vietnamita picante de fideos con carne de vacuno, hierba limón y chile.",
    "de": "Scharfe vietnamesische Nudelsuppe mit Rindfleisch, Zitronengras und Chili."
  },
  "cao-lau": {
    "en": "Noodle dish from Hội An with pork, herbs and crisp accompaniments.",
    "fr": "Plat de nouilles de Hội An au porc, aux herbes et aux garnitures croustillantes.",
    "pt": "Prato de noodles de Hội An com carne de porco, ervas e acompanhamentos crocantes.",
    "es": "Plato de fideos de Hội An con cerdo, hierbas y acompañamientos crujientes.",
    "de": "Nudelgericht aus Hội An mit Schweinefleisch, Kräutern und knusprigen Beilagen."
  },
  "com-tam": {
    "en": "Vietnamese broken rice, often with a grilled pork chop.",
    "fr": "Riz brisé vietnamien, souvent accompagné d’une côte de porc grillée.",
    "pt": "Arroz partido vietnamita, muitas vezes com costeleta de porco grelhada.",
    "es": "Arroz partido vietnamita, a menudo con chuleta de cerdo a la parrilla.",
    "de": "Vietnamesischer Bruchreis, oft mit gegrilltem Schweinekotelett."
  },
  "bun-rieu": {
    "en": "Vietnamese rice noodle soup with tomato and often a crab mixture.",
    "fr": "Soupe vietnamienne de nouilles de riz à la tomate et souvent à la préparation de crabe.",
    "pt": "Sopa vietnamita de noodles de arroz com tomate e muitas vezes preparado de caranguejo.",
    "es": "Sopa vietnamita de fideos de arroz con tomate y a menudo preparado de cangrejo.",
    "de": "Vietnamesische Reisnudelsuppe mit Tomate und oft einer Krabbenmasse."
  },
  "banh-cuon": {
    "en": "Thin steamed rice sheets, often rolled around pork and mushrooms.",
    "fr": "Fines feuilles de riz cuites à la vapeur, souvent roulées autour de porc et de champignons.",
    "pt": "Folhas finas de arroz cozidas a vapor, muitas vezes enroladas com porco e cogumelos.",
    "es": "Láminas finas de arroz al vapor, a menudo enrolladas con cerdo y setas.",
    "de": "Dünne gedämpfte Reisblätter, oft um Schweinefleisch und Pilze gerollt."
  },
  "massaman-curry": {
    "en": "Thai curry with coconut milk, potatoes, peanuts and warm spices.",
    "fr": "Curry thaïlandais au lait de coco, aux pommes de terre, aux cacahuètes et aux épices chaudes.",
    "pt": "Caril tailandês com leite de coco, batatas, amendoins e especiarias quentes.",
    "es": "Curri tailandés con leche de coco, patatas, cacahuetes y especias cálidas.",
    "de": "Thailändisches Curry mit Kokosmilch, Kartoffeln, Erdnüssen und wärmenden Gewürzen."
  },
  "panang-curry": {
    "en": "Rich Thai curry with coconut milk, panang curry paste and makrut lime leaves.",
    "fr": "Curry thaïlandais onctueux au lait de coco, à la pâte de curry panang et aux feuilles de combava.",
    "pt": "Caril tailandês rico com leite de coco, pasta de caril panang e folhas de lima-makrut.",
    "es": "Curri tailandés untuoso con leche de coco, pasta de curri panang y hojas de lima makrut.",
    "de": "Reichhaltiges thailändisches Curry mit Kokosmilch, Panang-Currypaste und Makrutlimettenblättern."
  },
  "som-tam": {
    "en": "Thai shredded green papaya salad with lime, chilli and fish sauce.",
    "fr": "Salade thaïlandaise de papaye verte râpée au citron vert, au piment et à la sauce de poisson.",
    "pt": "Salada tailandesa de papaia verde ralada com lima, malagueta e molho de peixe.",
    "es": "Ensalada tailandesa de papaya verde rallada con lima, chile y salsa de pescado.",
    "de": "Thailändischer Salat aus grünen Papayastreifen mit Limette, Chili und Fischsauce."
  },
  "tom-kha-gai": {
    "en": "Thai coconut soup with chicken, galangal and lemongrass.",
    "fr": "Soupe thaïlandaise au lait de coco, au poulet, au galanga et à la citronnelle.",
    "pt": "Sopa tailandesa de coco com frango, galanga e erva-príncipe.",
    "es": "Sopa tailandesa de coco con pollo, galanga y hierba limón.",
    "de": "Thailändische Kokossuppe mit Hähnchen, Galgant und Zitronengras."
  },
  "pad-see-ew": {
    "en": "Wide Thai rice noodles stir-fried with soy sauce, egg and vegetables.",
    "fr": "Larges nouilles de riz thaïlandaises sautées à la sauce soja, à l’œuf et aux légumes.",
    "pt": "Noodles largos tailandeses de arroz salteados com molho de soja, ovo e legumes.",
    "es": "Fideos anchos tailandeses de arroz salteados con salsa de soja, huevo y verduras.",
    "de": "Breite thailändische Reisnudeln, mit Sojasauce, Ei und Gemüse gebraten."
  },
  "khao-pad": {
    "en": "Thai fried rice with egg, vegetables and often meat or seafood.",
    "fr": "Riz sauté thaïlandais à l’œuf, aux légumes et souvent à la viande ou aux fruits de mer.",
    "pt": "Arroz frito tailandês com ovo, legumes e muitas vezes carne ou marisco.",
    "es": "Arroz frito tailandés con huevo, verduras y a menudo carne o marisco.",
    "de": "Thailändischer gebratener Reis mit Ei, Gemüse und oft Fleisch oder Meeresfrüchten."
  },
  "chicken-tikka-masala-pakistan": {
    "en": "Marinated grilled chicken pieces in a spiced tomato-based sauce.",
    "fr": "Morceaux de poulet marinés et grillés dans une sauce épicée à base de tomate.",
    "pt": "Pedaços de frango marinados e grelhados num molho condimentado à base de tomate.",
    "es": "Trozos de pollo marinados y asados en salsa especiada a base de tomate.",
    "de": "Marinierte gegrillte Hähnchenstücke in einer gewürzten Tomatensauce."
  },
  "palak-paneer": {
    "en": "North Indian dish of paneer in a spiced spinach sauce.",
    "fr": "Plat du nord de l’Inde composé de paneer dans une sauce épicée aux épinards.",
    "pt": "Prato do norte da Índia de paneer num molho condimentado de espinafres.",
    "es": "Plato del norte de la India de paneer en salsa especiada de espinacas.",
    "de": "Nordindisches Gericht aus Paneer in gewürzter Spinatsauce."
  },
  "rogan-josh": {
    "en": "Aromatic Kashmiri meat stew, often with lamb or goat.",
    "fr": "Ragoût de viande aromatique du Cachemire, souvent à l’agneau ou à la chèvre.",
    "pt": "Guisado aromático de carne de Caxemira, muitas vezes de borrego ou cabra.",
    "es": "Guiso aromático de carne de Cachemira, a menudo de cordero o cabra.",
    "de": "Aromatischer Fleischeintopf aus Kaschmir, oft mit Lamm- oder Ziegenfleisch."
  },
  "vindaloo": {
    "en": "Tangy, spiced stew from Goa, traditionally often made with pork.",
    "fr": "Ragoût acidulé et épicé de Goa, traditionnellement souvent préparé avec du porc.",
    "pt": "Guisado ácido e condimentado de Goa, tradicionalmente muitas vezes feito com porco.",
    "es": "Guiso ácido y especiado de Goa, tradicionalmente a menudo preparado con cerdo.",
    "de": "Säuerlich-würziges Schmorgericht aus Goa, traditionell oft mit Schweinefleisch."
  },
  "malai-kofta": {
    "en": "Indian dish of soft vegetable or paneer balls in a rich sauce.",
    "fr": "Plat indien de boulettes moelleuses de légumes ou de paneer dans une sauce onctueuse.",
    "pt": "Prato indiano de bolinhas macias de legumes ou paneer num molho rico.",
    "es": "Plato indio de bolas tiernas de verduras o paneer en una salsa untuosa.",
    "de": "Indisches Gericht aus weichen Gemüse- oder Paneerbällchen in reichhaltiger Sauce."
  },
  "aloo-gobi": {
    "en": "Indian vegetable dish with potatoes, cauliflower and spices.",
    "fr": "Plat indien de légumes aux pommes de terre, au chou-fleur et aux épices.",
    "pt": "Prato indiano de legumes com batatas, couve-flor e especiarias.",
    "es": "Plato indio de verduras con patatas, coliflor y especias.",
    "de": "Indisches Gemüsegericht mit Kartoffeln, Blumenkohl und Gewürzen."
  },
  "lasagne-alla-bolognese": {
    "en": "Oven-baked pasta with layers of ragù, béchamel and Parmesan.",
    "fr": "Pâtes au four en couches de ragù, de béchamel et de parmesan.",
    "pt": "Massa de forno com camadas de ragù, béchamel e parmesão.",
    "es": "Pasta al horno con capas de ragú, bechamel y parmesano.",
    "de": "Ofengebackene Pasta mit Schichten aus Ragù, Béchamel und Parmesan."
  },
  "risotto-alla-milanese": {
    "en": "Creamy risotto from Milan with saffron and Parmesan.",
    "fr": "Risotto crémeux de Milan au safran et au parmesan.",
    "pt": "Risoto cremoso de Milão com açafrão e parmesão.",
    "es": "Risotto cremoso de Milán con azafrán y parmesano.",
    "de": "Cremiges Risotto aus Mailand mit Safran und Parmesan."
  },
  "ossobuco": {
    "en": "Slow-braised veal shank, often served with gremolata.",
    "fr": "Jarret de veau longuement braisé, souvent accompagné de gremolata.",
    "pt": "Chambão de vitela estufado lentamente, muitas vezes com gremolata.",
    "es": "Jarrete de ternera braseado lentamente, a menudo con gremolata.",
    "de": "Langsam geschmorte Kalbshaxe, oft mit Gremolata."
  },
  "gnocchi-al-pesto": {
    "en": "Soft potato gnocchi tossed in basil pesto.",
    "fr": "Gnocchis moelleux de pomme de terre enrobés de pesto au basilic.",
    "pt": "Gnocchi macios de batata envolvidos em pesto de manjericão.",
    "es": "Ñoquis tiernos de patata mezclados con pesto de albahaca.",
    "de": "Weiche Kartoffelgnocchi in Basilikumpesto geschwenkt."
  },
  "tiramisu": {
    "en": "Italian dessert with coffee, savoiardi, mascarpone and cocoa.",
    "fr": "Dessert italien au café, aux biscuits savoiardi, au mascarpone et au cacao.",
    "pt": "Sobremesa italiana com café, palitos la reine, mascarpone e cacau.",
    "es": "Postre italiano con café, bizcochos de soletilla, mascarpone y cacao.",
    "de": "Italienisches Dessert mit Kaffee, Löffelbiskuits, Mascarpone und Kakao."
  },
  "focaccia": {
    "en": "Italian flatbread with olive oil, often topped with salt.",
    "fr": "Pain plat italien à l’huile d’olive, souvent garni de sel.",
    "pt": "Pão achatado italiano com azeite, muitas vezes coberto com sal.",
    "es": "Pan plano italiano con aceite de oliva, a menudo cubierto de sal.",
    "de": "Italienisches Fladenbrot mit Olivenöl, oft mit Salz bestreut."
  },
  "tempura": {
    "en": "Japanese deep-fried seafood or vegetables in a light, crisp batter.",
    "fr": "Friture japonaise de fruits de mer ou de légumes dans une pâte légère et croustillante.",
    "pt": "Marisco ou legumes fritos à japonesa num polme leve e crocante.",
    "es": "Fritura japonesa de marisco o verduras en un rebozado ligero y crujiente.",
    "de": "Japanisch frittierte Meeresfrüchte oder Gemüse in einem leichten, knusprigen Teig."
  },
  "okonomiyaki": {
    "en": "Japanese savoury pancake with cabbage, egg and various fillings.",
    "fr": "Crêpe salée japonaise au chou, à l’œuf et à diverses garnitures.",
    "pt": "Panqueca salgada japonesa com couve, ovo e recheios variados.",
    "es": "Tortita salada japonesa con col, huevo y diversos rellenos.",
    "de": "Herzhafter japanischer Pfannkuchen mit Kohl, Ei und verschiedenen Füllungen."
  },
  "takoyaki": {
    "en": "Round Japanese octopus cakes cooked in a special pan.",
    "fr": "Boulettes japonaises au poulpe cuites dans une poêle spéciale.",
    "pt": "Bolinhos japoneses redondos de polvo, cozinhados numa frigideira especial.",
    "es": "Bolas japonesas de pulpo cocinadas en una sartén especial.",
    "de": "Runde japanische Oktopusbällchen, in einer Spezialpfanne gebacken."
  },
  "sukiyaki": {
    "en": "Japanese hot pot of thinly sliced beef, tofu and vegetables in a sweetish soy sauce.",
    "fr": "Marmite japonaise de fines tranches de bœuf, de tofu et de légumes dans une sauce soja légèrement sucrée.",
    "pt": "Guisado japonês de carne de vaca em fatias finas, tofu e legumes num molho de soja ligeiramente doce.",
    "es": "Guiso japonés de ternera en láminas finas, tofu y verduras en salsa de soja ligeramente dulce.",
    "de": "Japanisches Topfgericht mit dünnem Rindfleisch, Tofu und Gemüse in süßlicher Sojasauce."
  },
  "shabu-shabu": {
    "en": "Japanese hot pot in which thin slices of meat and vegetables are cooked in hot broth.",
    "fr": "Fondue japonaise où de fines tranches de viande et des légumes cuisent dans un bouillon chaud.",
    "pt": "Refeição japonesa de tacho em que fatias finas de carne e legumes são cozinhados em caldo quente.",
    "es": "Olla japonesa en la que se cuecen láminas finas de carne y verduras en caldo caliente.",
    "de": "Japanisches Topfgericht, bei dem dünne Fleischscheiben und Gemüse in heißer Brühe gar ziehen."
  },
  "katsudon": {
    "en": "Japanese rice bowl topped with breaded pork cutlet, onion and egg.",
    "fr": "Bol de riz japonais garni d’une côtelette de porc panée, d’oignon et d’œuf.",
    "pt": "Tigela japonesa de arroz com costeleta de porco panada, cebola e ovo.",
    "es": "Bol japonés de arroz con chuleta de cerdo empanada, cebolla y huevo.",
    "de": "Japanische Reisschale mit paniertem Schweinekotelett, Zwiebeln und Ei."
  },
  "kung-pao-chicken": {
    "en": "Sichuan stir-fried chicken with dried chillies and peanuts.",
    "fr": "Poulet sauté du Sichuan aux piments séchés et aux cacahuètes.",
    "pt": "Frango salteado de Sichuan com malaguetas secas e amendoins.",
    "es": "Pollo salteado de Sichuan con chiles secos y cacahuetes.",
    "de": "Sichuan-Wokgericht mit Hähnchen, getrockneten Chilis und Erdnüssen."
  },
  "xiaolongbao": {
    "en": "Steamed Chinese dumplings filled with meat and hot broth.",
    "fr": "Raviolis chinois cuits à la vapeur, garnis de viande et de bouillon chaud.",
    "pt": "Dumplings chineses cozidos a vapor, recheados com carne e caldo quente.",
    "es": "Dumplings chinos al vapor rellenos de carne y caldo caliente.",
    "de": "Gedämpfte chinesische Teigtaschen mit Fleischfüllung und heißer Brühe."
  },
  "char-siu": {
    "en": "Cantonese oven-roasted pork with a sweetish, glossy glaze.",
    "fr": "Porc rôti cantonais au glaçage brillant et légèrement sucré.",
    "pt": "Carne de porco cantonesa assada no forno com cobertura brilhante e ligeiramente doce.",
    "es": "Cerdo cantonés asado al horno con glaseado brillante y ligeramente dulce.",
    "de": "Kantonesischer Schweinebraten mit süßlicher, glänzender Glasur."
  },
  "chow-mein": {
    "en": "Chinese stir-fried wheat noodles with vegetables and optional meat.",
    "fr": "Nouilles chinoises de blé sautées avec légumes et éventuellement viande.",
    "pt": "Noodles chineses de trigo salteados com legumes e, eventualmente, carne.",
    "es": "Fideos chinos de trigo salteados con verduras y, opcionalmente, carne.",
    "de": "Chinesische gebratene Weizennudeln mit Gemüse und gegebenenfalls Fleisch."
  },
  "wonton-soup": {
    "en": "Chinese soup of small filled dumplings in clear broth.",
    "fr": "Soupe chinoise de petits raviolis farcis dans un bouillon clair.",
    "pt": "Sopa chinesa de pequenos dumplings recheados em caldo límpido.",
    "es": "Sopa china de pequeños dumplings rellenos en caldo claro.",
    "de": "Chinesische Suppe mit kleinen gefüllten Teigtaschen in klarer Brühe."
  },
  "sweet-and-sour-pork": {
    "en": "Chinese dish of crisp fried pork in sweet and sour sauce.",
    "fr": "Plat chinois de porc frit croustillant en sauce aigre-douce.",
    "pt": "Prato chinês de porco frito crocante em molho agridoce.",
    "es": "Plato chino de cerdo frito crujiente en salsa agridulce.",
    "de": "Chinesisches Gericht aus knusprig gebratenem Schweinefleisch in süßsaurer Sauce."
  },
  "enchiladas": {
    "en": "Corn tortillas with filling and chilli sauce.",
    "fr": "Tortillas de maïs garnies, nappées de sauce pimentée.",
    "pt": "Tortilhas de milho com recheio e molho de malagueta.",
    "es": "Tortillas de maíz con relleno y salsa de chile.",
    "de": "Maistortillas mit Füllung und Chilisauce."
  },
  "burrito": {
    "en": "Wheat tortilla wrapped around meat, beans or other fillings.",
    "fr": "Tortilla de blé roulée autour de viande, de haricots ou d’autres garnitures.",
    "pt": "Tortilha de trigo enrolada com carne, feijão ou outros recheios.",
    "es": "Tortilla de trigo enrollada con carne, frijoles u otros rellenos.",
    "de": "Weizentortilla, um Fleisch, Bohnen oder andere Füllungen gewickelt."
  },
  "tamales": {
    "en": "Steamed parcels of maize dough with savoury or sweet fillings.",
    "fr": "Papillotes de pâte de maïs cuites à la vapeur, à garniture salée ou sucrée.",
    "pt": "Trouxas de massa de milho cozidas a vapor, com recheios salgados ou doces.",
    "es": "Paquetes de masa de maíz al vapor con rellenos salados o dulces.",
    "de": "Gedämpfte Maisteigpäckchen mit herzhafter oder süßer Füllung."
  },
  "chilaquiles": {
    "en": "Corn tortilla chips tossed in red or green sauce.",
    "fr": "Chips de tortillas de maïs mélangées à une sauce rouge ou verte.",
    "pt": "Chips de tortilha de milho envolvidas em molho vermelho ou verde.",
    "es": "Totopos de tortilla de maíz mezclados con salsa roja o verde.",
    "de": "Maistortillachips in roter oder grüner Sauce."
  },
  "mole-poblano": {
    "en": "Mexican sauce made with dried chillies, seeds, spices and often chocolate.",
    "fr": "Sauce mexicaine aux piments séchés, graines, épices et souvent chocolat.",
    "pt": "Molho mexicano de malaguetas secas, sementes, especiarias e frequentemente chocolate.",
    "es": "Salsa mexicana de chiles secos, semillas, especias y a menudo chocolate.",
    "de": "Mexikanische Sauce aus getrockneten Chilis, Samen, Gewürzen und oft Schokolade."
  },
  "ceviche": {
    "en": "Fish or seafood with citrus, onion and chilli.",
    "fr": "Poisson ou fruits de mer aux agrumes, à l’oignon et au piment.",
    "pt": "Peixe ou marisco com citrinos, cebola e malagueta.",
    "es": "Pescado o marisco con cítricos, cebolla y chile.",
    "de": "Fisch oder Meeresfrüchte mit Zitrusfrüchten, Zwiebeln und Chili."
  },
  "lahmacun": {
    "en": "Thin flatbread topped with spiced minced meat, tomato and herbs.",
    "fr": "Pain plat fin garni de viande hachée épicée, de tomate et d’herbes.",
    "pt": "Pão achatado fino com carne picada condimentada, tomate e ervas.",
    "es": "Pan plano fino con carne picada especiada, tomate y hierbas.",
    "de": "Dünnes Fladenbrot mit gewürztem Hackfleisch, Tomate und Kräutern."
  },
  "manti": {
    "en": "Small Turkish dumplings filled with meat, often served with garlic yoghurt.",
    "fr": "Petits raviolis turcs à la viande, souvent servis avec du yaourt à l’ail.",
    "pt": "Pequenos dumplings turcos recheados com carne, muitas vezes servidos com iogurte de alho.",
    "es": "Pequeñas empanadillas turcas rellenas de carne, a menudo con yogur de ajo.",
    "de": "Kleine türkische Teigtaschen mit Fleischfüllung, oft mit Knoblauchjoghurt."
  },
  "doner": {
    "en": "Turkish kebab made from meat cooked on a rotating vertical spit.",
    "fr": "Kebab turc de viande cuite sur une broche verticale rotative.",
    "pt": "Kebab turco de carne assada num espeto vertical rotativo.",
    "es": "Kebab turco de carne asada en un espetón vertical giratorio.",
    "de": "Türkischer Kebab aus Fleisch vom rotierenden Vertikalspieß."
  },
  "kofte": {
    "en": "Turkish meatballs or patties, often grilled.",
    "fr": "Boulettes ou galettes de viande turques, souvent grillées.",
    "pt": "Almôndegas ou hambúrgueres turcos de carne, muitas vezes grelhados.",
    "es": "Albóndigas o tortitas turcas de carne, a menudo a la parrilla.",
    "de": "Türkische Fleischbällchen oder Hackfleischbratlinge, oft gegrillt."
  },
  "baba-ganoush": {
    "en": "Smoky aubergine dip with lemon and often tahini.",
    "fr": "Purée d’aubergine au goût fumé, au citron et souvent au tahini.",
    "pt": "Pasta de beringela com sabor fumado, limão e frequentemente tahini.",
    "es": "Crema de berenjena de sabor ahumado, con limón y a menudo tahini.",
    "de": "Rauchiger Auberginendip mit Zitrone und oft Tahini."
  },
  "tabbouleh": {
    "en": "Levantine herb salad with parsley, tomato, bulgur and lemon.",
    "fr": "Salade d’herbes levantine au persil, à la tomate, au boulgour et au citron.",
    "pt": "Salada levantina de ervas com salsa, tomate, bulgur e limão.",
    "es": "Ensalada levantina de hierbas con perejil, tomate, bulgur y limón.",
    "de": "Levantinischer Kräutersalat mit Petersilie, Tomate, Bulgur und Zitrone."
  },
  "farikal": {
    "en": "Lamb or mutton simmered until tender with cabbage and whole peppercorns.",
    "fr": "Agneau ou mouton mijoté jusqu’à tendreté avec du chou et des grains de poivre.",
    "pt": "Borrego ou carneiro cozido até ficar tenro com couve e grãos de pimenta.",
    "es": "Cordero o carne de oveja cocidos hasta quedar tiernos con col y pimienta en grano.",
    "de": "Lamm- oder Hammelfleisch, mit Kohl und ganzen Pfefferkörnern weich gekocht."
  },
  "kjottkaker": {
    "en": "Norwegian meat patties with brown gravy, potatoes and traditional accompaniments.",
    "fr": "Galettes de viande norvégiennes avec sauce brune, pommes de terre et garnitures traditionnelles.",
    "pt": "Bolinhos de carne noruegueses com molho escuro, batatas e acompanhamentos tradicionais.",
    "es": "Tortitas de carne noruegas con salsa oscura, patatas y acompañamientos tradicionales.",
    "de": "Norwegische Frikadellen mit brauner Sauce, Kartoffeln und traditionellen Beilagen."
  },
  "kottbullar": {
    "en": "Small Swedish meatballs, often with cream sauce, mashed potatoes and lingonberries.",
    "fr": "Petites boulettes de viande suédoises, souvent avec sauce à la crème, purée de pommes de terre et airelles rouges.",
    "pt": "Pequenas almôndegas suecas, muitas vezes com molho de natas, puré de batata e arandos vermelhos.",
    "es": "Pequeñas albóndigas suecas, a menudo con salsa de nata, puré de patata y arándanos rojos.",
    "de": "Kleine schwedische Fleischbällchen, oft mit Sahnesauce, Kartoffelpüree und Preiselbeeren."
  },
  "smorrebrod": {
    "en": "Danish open sandwich, often on rye bread with toppings and garnish.",
    "fr": "Tartine danoise, souvent sur pain de seigle avec garniture et décoration.",
    "pt": "Sanduíche aberta dinamarquesa, muitas vezes em pão de centeio com recheios e guarnições.",
    "es": "Bocadillo abierto danés, a menudo sobre pan de centeno con ingredientes y guarniciones.",
    "de": "Offenes dänisches belegtes Brot, oft auf Roggenbrot mit Belag und Garnitur."
  },
  "lohikeitto": {
    "en": "Finnish salmon soup with potatoes, dill and often cream.",
    "fr": "Soupe finlandaise au saumon, aux pommes de terre, à l’aneth et souvent à la crème.",
    "pt": "Sopa finlandesa de salmão com batatas, endro e frequentemente natas.",
    "es": "Sopa finlandesa de salmón con patatas, eneldo y a menudo nata.",
    "de": "Finnische Lachssuppe mit Kartoffeln, Dill und oft Sahne."
  },
  "plokkfiskur": {
    "en": "Icelandic dish of boiled white fish, potatoes and a light-coloured sauce.",
    "fr": "Plat islandais de poisson blanc cuit à l’eau, de pommes de terre et de sauce blanche.",
    "pt": "Prato islandês de peixe branco cozido, batatas e molho claro.",
    "es": "Plato islandés de pescado blanco cocido, patatas y salsa clara.",
    "de": "Isländisches Gericht aus gekochtem Weißfisch, Kartoffeln und heller Sauce."
  },
  "boeuf-bourguignon": {
    "en": "French beef stew with red wine, mushrooms and onions.",
    "fr": "Ragoût français de bœuf au vin rouge, aux champignons et aux oignons.",
    "pt": "Guisado francês de carne de vaca com vinho tinto, cogumelos e cebolas.",
    "es": "Guiso francés de carne de vacuno con vino tinto, setas y cebollas.",
    "de": "Französischer Rindfleischeintopf mit Rotwein, Pilzen und Zwiebeln."
  },
  "coq-au-vin": {
    "en": "Chicken braised in wine with bacon, onions and mushrooms.",
    "fr": "Poulet braisé au vin avec lardons, oignons et champignons.",
    "pt": "Frango estufado em vinho com bacon, cebolas e cogumelos.",
    "es": "Pollo braseado en vino con beicon, cebollas y setas.",
    "de": "In Wein geschmortes Hähnchen mit Speck, Zwiebeln und Pilzen."
  },
  "ratatouille": {
    "en": "French vegetable stew with aubergine, courgette, peppers and tomato.",
    "fr": "Ragoût de légumes français aux aubergines, courgettes, poivrons et tomates.",
    "pt": "Guisado francês de legumes com beringela, curgete, pimento e tomate.",
    "es": "Guiso francés de verduras con berenjena, calabacín, pimiento y tomate.",
    "de": "Französisches Gemüsegericht mit Aubergine, Zucchini, Paprika und Tomate."
  },
  "bouillabaisse": {
    "en": "Provençal fish soup with aromatic broth, saffron and various kinds of fish.",
    "fr": "Soupe de poisson provençale au bouillon aromatique, au safran et à diverses espèces de poisson.",
    "pt": "Sopa de peixe provençal com caldo aromático, açafrão e vários tipos de peixe.",
    "es": "Sopa de pescado provenzal con caldo aromático, azafrán y distintos pescados.",
    "de": "Provenzalische Fischsuppe mit aromatischer Brühe, Safran und verschiedenen Fischarten."
  },
  "quiche-lorraine": {
    "en": "French savoury tart with bacon and an egg-and-cream filling.",
    "fr": "Tarte salée française aux lardons, garnie d’un appareil aux œufs et à la crème.",
    "pt": "Tarte salgada francesa com bacon e recheio de ovos e natas.",
    "es": "Tarta salada francesa con beicon y relleno de huevo y nata.",
    "de": "Französische herzhafte Tarte mit Speck und Eier-Sahne-Füllung."
  },
  "croque-monsieur": {
    "en": "French hot cheese and ham sandwich, often gratinated with béchamel.",
    "fr": "Sandwich chaud français au fromage et au jambon, souvent gratiné à la béchamel.",
    "pt": "Sanduíche quente francesa de queijo e fiambre, muitas vezes gratinada com béchamel.",
    "es": "Sándwich caliente francés de queso y jamón, a menudo gratinado con bechamel.",
    "de": "Französisches warmes Käse-Schinken-Sandwich, oft mit Béchamel überbacken."
  },
  "paella-valenciana": {
    "en": "Rice dish with chicken, rabbit, beans and saffron.",
    "fr": "Plat de riz au poulet, au lapin, aux haricots et au safran.",
    "pt": "Prato de arroz com frango, coelho, feijão e açafrão.",
    "es": "Plato de arroz con pollo, conejo, judías y azafrán.",
    "de": "Reisgericht mit Hähnchen, Kaninchen, Bohnen und Safran."
  },
  "patatas-bravas": {
    "en": "Crisp potato pieces with spiced bravas sauce.",
    "fr": "Morceaux de pommes de terre croustillants avec sauce brava épicée.",
    "pt": "Pedaços crocantes de batata com molho bravas condimentado.",
    "es": "Trozos de patata crujientes con salsa brava especiada.",
    "de": "Knusprige Kartoffelstücke mit würziger Bravas-Sauce."
  },
  "tortilla-espanola": {
    "en": "Thick Spanish omelette with potatoes and optional onion.",
    "fr": "Omelette espagnole épaisse aux pommes de terre, avec ou sans oignon.",
    "pt": "Omeleta espanhola espessa com batatas e, opcionalmente, cebola.",
    "es": "Tortilla española gruesa con patatas y, opcionalmente, cebolla.",
    "de": "Dickes spanisches Omelett mit Kartoffeln und gegebenenfalls Zwiebeln."
  },
  "gazpacho": {
    "en": "Cold Spanish vegetable soup with tomato, cucumber and peppers.",
    "fr": "Soupe froide espagnole de légumes à la tomate, au concombre et au poivron.",
    "pt": "Sopa fria espanhola de legumes com tomate, pepino e pimento.",
    "es": "Sopa fría española de verduras con tomate, pepino y pimiento.",
    "de": "Kalte spanische Gemüsesuppe mit Tomate, Gurke und Paprika."
  },
  "gambas-al-ajillo": {
    "en": "Prawns fried in olive oil with garlic and chilli.",
    "fr": "Crevettes poêlées à l’huile d’olive, à l’ail et au piment.",
    "pt": "Camarões salteados em azeite com alho e malagueta.",
    "es": "Gambas salteadas en aceite de oliva con ajo y chile.",
    "de": "In Olivenöl gebratene Garnelen mit Knoblauch und Chili."
  },
  "croquetas": {
    "en": "Breaded croquettes with a creamy béchamel filling, often with ham.",
    "fr": "Croquettes panées à la béchamel crémeuse, souvent au jambon.",
    "pt": "Croquetes panados com recheio cremoso de béchamel, muitas vezes com fiambre.",
    "es": "Croquetas empanadas con relleno cremoso de bechamel, a menudo con jamón.",
    "de": "Panierte Kroketten mit cremiger Béchamelfüllung, oft mit Schinken."
  },
  "moussaka": {
    "en": "Oven-baked dish of aubergine, spiced meat sauce and béchamel.",
    "fr": "Plat au four d’aubergines, de sauce à la viande épicée et de béchamel.",
    "pt": "Prato de forno com beringela, molho de carne condimentado e béchamel.",
    "es": "Plato al horno con berenjena, salsa de carne especiada y bechamel.",
    "de": "Ofengericht mit Aubergine, gewürzter Fleischsauce und Béchamel."
  },
  "souvlaki": {
    "en": "Greek grilled meat skewers with lemon and oregano.",
    "fr": "Brochettes grecques de viande grillée au citron et à l’origan.",
    "pt": "Espetadas gregas de carne grelhada com limão e orégãos.",
    "es": "Brochetas griegas de carne a la parrilla con limón y orégano.",
    "de": "Griechische Fleischspieße vom Grill mit Zitrone und Oregano."
  },
  "gyros": {
    "en": "Greek meat dish of thin slices from a rotating vertical spit.",
    "fr": "Plat grec de fines tranches de viande découpées sur une broche verticale rotative.",
    "pt": "Prato grego de fatias finas de carne de um espeto vertical rotativo.",
    "es": "Plato griego de láminas finas de carne de un asador vertical giratorio.",
    "de": "Griechisches Fleischgericht mit dünnen Scheiben vom rotierenden Vertikalspieß."
  },
  "spanakopita": {
    "en": "Greek filo pastry pie with spinach, feta and herbs.",
    "fr": "Tourte grecque en pâte filo aux épinards, à la feta et aux herbes.",
    "pt": "Tarte grega de massa filo com espinafres, feta e ervas.",
    "es": "Pastel griego de masa filo con espinacas, feta y hierbas.",
    "de": "Griechische Filoteigpastete mit Spinat, Feta und Kräutern."
  },
  "tzatziki": {
    "en": "Cold Greek yoghurt dip with cucumber and garlic.",
    "fr": "Sauce grecque froide au yaourt, au concombre et à l’ail.",
    "pt": "Molho frio grego de iogurte com pepino e alho.",
    "es": "Salsa fría griega de yogur con pepino y ajo.",
    "de": "Kalter griechischer Joghurtdip mit Gurke und Knoblauch."
  },
  "pastitsio": {
    "en": "Greek baked pasta with spiced meat sauce and béchamel.",
    "fr": "Gratin grec de pâtes à la sauce de viande épicée et à la béchamel.",
    "pt": "Massa grega de forno com molho de carne condimentado e béchamel.",
    "es": "Pasta griega al horno con salsa de carne especiada y bechamel.",
    "de": "Griechischer Nudelauflauf mit gewürzter Fleischsauce und Béchamel."
  },
  "nasi-goreng": {
    "en": "Indonesian fried rice with sweet soy sauce, spices and often a fried egg.",
    "fr": "Riz sauté indonésien à la sauce soja sucrée, aux épices et souvent à l’œuf au plat.",
    "pt": "Arroz frito indonésio com molho de soja doce, especiarias e muitas vezes ovo estrelado.",
    "es": "Arroz frito indonesio con salsa de soja dulce, especias y a menudo huevo frito.",
    "de": "Indonesischer gebratener Reis mit süßer Sojasauce, Gewürzen und oft Spiegelei."
  },
  "mie-goreng": {
    "en": "Fried wheat noodles with vegetables, egg and spiced sauce.",
    "fr": "Nouilles de blé sautées aux légumes, à l’œuf et à la sauce épicée.",
    "pt": "Noodles de trigo salteados com legumes, ovo e molho condimentado.",
    "es": "Fideos de trigo salteados con verduras, huevo y salsa especiada.",
    "de": "Gebratene Weizennudeln mit Gemüse, Ei und würziger Sauce."
  },
  "rendang": {
    "en": "Meat slow-cooked with coconut milk and spices into a concentrated, dark dish.",
    "fr": "Viande longuement mijotée au lait de coco et aux épices jusqu’à obtenir un plat foncé et concentré.",
    "pt": "Carne cozinhada lentamente com leite de coco e especiarias até obter um prato escuro e concentrado.",
    "es": "Carne cocinada lentamente con leche de coco y especias hasta obtener un plato oscuro y concentrado.",
    "de": "Mit Kokosmilch und Gewürzen langsam gegartes Fleisch, bis ein dunkles, konzentriertes Gericht entsteht."
  },
  "satay": {
    "en": "Small grilled meat skewers, often served with a spiced sauce.",
    "fr": "Petites brochettes de viande grillées, souvent accompagnées d’une sauce épicée.",
    "pt": "Pequenas espetadas de carne grelhada, muitas vezes servidas com molho condimentado.",
    "es": "Pequeñas brochetas de carne a la parrilla, a menudo servidas con salsa especiada.",
    "de": "Kleine gegrillte Fleischspieße, oft mit würziger Sauce serviert."
  },
  "nasi-lemak": {
    "en": "Rice cooked in coconut milk, served with sambal, egg, cucumber, peanuts and often dried anchovies.",
    "fr": "Riz cuit au lait de coco, servi avec sambal, œuf, concombre, cacahuètes et souvent anchois séchés.",
    "pt": "Arroz cozido em leite de coco, servido com sambal, ovo, pepino, amendoins e frequentemente anchovas secas.",
    "es": "Arroz cocido en leche de coco, servido con sambal, huevo, pepino, cacahuetes y a menudo anchoas secas.",
    "de": "In Kokosmilch gekochter Reis, serviert mit Sambal, Ei, Gurke, Erdnüssen und oft getrockneten Sardellen."
  },
  "laksa": {
    "en": "Noodle soup with aromatic broth, in some versions made with coconut milk.",
    "fr": "Soupe de nouilles au bouillon aromatique, au lait de coco dans certaines variantes.",
    "pt": "Sopa de noodles com caldo aromático, em algumas variantes com leite de coco.",
    "es": "Sopa de fideos con caldo aromático, en algunas variantes con leche de coco.",
    "de": "Nudelsuppe mit aromatischer Brühe, in manchen Varianten mit Kokosmilch."
  },
  "pork-adobo": {
    "en": "Filipino meat dish with vinegar, garlic, pepper and often soy sauce.",
    "fr": "Plat de viande philippin au vinaigre, à l’ail, au poivre et souvent à la sauce soja.",
    "pt": "Prato filipino de carne com vinagre, alho, pimenta e frequentemente molho de soja.",
    "es": "Plato filipino de carne con vinagre, ajo, pimienta y a menudo salsa de soja.",
    "de": "Philippinisches Fleischgericht mit Essig, Knoblauch, Pfeffer und oft Sojasauce."
  },
  "sinigang": {
    "en": "Sour Filipino soup with meat or seafood and vegetables.",
    "fr": "Soupe philippine acidulée à la viande ou aux fruits de mer et aux légumes.",
    "pt": "Sopa filipina ácida com carne ou marisco e legumes.",
    "es": "Sopa filipina ácida con carne o marisco y verduras.",
    "de": "Säuerliche philippinische Suppe mit Fleisch oder Meeresfrüchten und Gemüse."
  },
  "sisig": {
    "en": "Finely chopped fried or grilled meat with onion, chilli and citrus.",
    "fr": "Viande finement hachée, poêlée ou grillée, à l’oignon, au piment et aux agrumes.",
    "pt": "Carne finamente picada, frita ou grelhada, com cebola, malagueta e citrinos.",
    "es": "Carne finamente picada, frita o a la parrilla, con cebolla, chile y cítricos.",
    "de": "Fein gehacktes, gebratenes oder gegrilltes Fleisch mit Zwiebeln, Chili und Zitrusfrüchten."
  },
  "lechon": {
    "en": "Filipino whole roast pig with crisp skin and juicy meat.",
    "fr": "Cochon entier rôti philippin à la peau croustillante et à la chair juteuse.",
    "pt": "Porco inteiro assado filipino, com pele crocante e carne suculenta.",
    "es": "Cerdo entero asado filipino con piel crujiente y carne jugosa.",
    "de": "Philippinisches ganzes Spanferkel mit knuspriger Haut und saftigem Fleisch."
  },
  "pancit": {
    "en": "Filipino noodle dishes with vegetables, meat or seafood.",
    "fr": "Plats de nouilles philippins aux légumes, à la viande ou aux fruits de mer.",
    "pt": "Pratos filipinos de noodles com legumes, carne ou marisco.",
    "es": "Platos filipinos de fideos con verduras, carne o marisco.",
    "de": "Philippinische Nudelgerichte mit Gemüse, Fleisch oder Meeresfrüchten."
  },
  "kare-kare": {
    "en": "Filipino stew with vegetables and a rich peanut sauce.",
    "fr": "Ragoût philippin aux légumes et à la sauce onctueuse aux cacahuètes.",
    "pt": "Guisado filipino com legumes e molho rico de amendoim.",
    "es": "Guiso filipino con verduras y salsa espesa de cacahuete.",
    "de": "Philippinischer Eintopf mit Gemüse und reichhaltiger Erdnusssauce."
  },
  "injera": {
    "en": "Soft, porous, tangy flatbread traditionally made with teff.",
    "fr": "Pain plat moelleux, poreux et acidulé, traditionnellement préparé avec du teff.",
    "pt": "Pão achatado macio, poroso e ácido, tradicionalmente feito de teff.",
    "es": "Pan plano suave, poroso y ácido, tradicionalmente elaborado con teff.",
    "de": "Weiches, poröses, säuerliches Fladenbrot, traditionell aus Teff hergestellt."
  },
  "doro-wat": {
    "en": "Ethiopian chicken stew with berbere, onions and boiled eggs.",
    "fr": "Ragoût éthiopien de poulet au berbéré, aux oignons et aux œufs durs.",
    "pt": "Guisado etíope de frango com berbere, cebola e ovos cozidos.",
    "es": "Guiso etíope de pollo con berbere, cebolla y huevos cocidos.",
    "de": "Äthiopischer Hähncheneintopf mit Berbere, Zwiebeln und gekochten Eiern."
  },
  "shiro": {
    "en": "Creamy stew based on chickpea flour or other legume flour.",
    "fr": "Ragoût crémeux à base de farine de pois chiches ou d’autres légumineuses.",
    "pt": "Guisado cremoso à base de farinha de grão-de-bico ou de outras leguminosas.",
    "es": "Guiso cremoso a base de harina de garbanzo u otras legumbres.",
    "de": "Cremiger Eintopf auf Basis von Kichererbsenmehl oder anderem Hülsenfruchtmehl."
  },
  "tibs": {
    "en": "Fried pieces of meat with onions, chilli and aromatic spices.",
    "fr": "Morceaux de viande sautés aux oignons, au piment et aux épices aromatiques.",
    "pt": "Pedaços de carne salteados com cebola, malagueta e especiarias aromáticas.",
    "es": "Trozos de carne salteados con cebolla, chile y especias aromáticas.",
    "de": "Gebratene Fleischstücke mit Zwiebeln, Chili und aromatischen Gewürzen."
  },
  "kitfo": {
    "en": "Finely minced beef with spiced butter and mitmita.",
    "fr": "Bœuf finement haché au beurre épicé et au mitmita.",
    "pt": "Carne de vaca finamente picada com manteiga condimentada e mitmita.",
    "es": "Carne de vacuno finamente picada con mantequilla especiada y mitmita.",
    "de": "Fein gehacktes Rindfleisch mit Gewürzbutter und Mitmita."
  },
  "zigni": {
    "en": "Hot Eritrean meat stew with berbere, onions and tomatoes.",
    "fr": "Ragoût érythréen de viande piquant au berbéré, aux oignons et aux tomates.",
    "pt": "Guisado eritreu picante de carne com berbere, cebola e tomate.",
    "es": "Guiso eritreo picante de carne con berbere, cebolla y tomate.",
    "de": "Scharfer eritreischer Fleischeintopf mit Berbere, Zwiebeln und Tomaten."
  },
  "tajine": {
    "en": "Slow-cooked Moroccan stew named after its cooking vessel with a conical lid.",
    "fr": "Ragoût marocain mijoté lentement, nommé d’après son récipient de cuisson à couvercle conique.",
    "pt": "Guisado marroquino de cozedura lenta, cujo nome deriva do recipiente com tampa cónica.",
    "es": "Guiso marroquí cocinado lentamente, llamado así por el recipiente con tapa cónica.",
    "de": "Langsam gegartes marokkanisches Schmorgericht, benannt nach dem Gefäß mit kegelförmigem Deckel."
  },
  "couscous": {
    "en": "Small grains of durum wheat, often served with vegetables and meat or legumes.",
    "fr": "Petits grains de blé dur, souvent servis avec des légumes et de la viande ou des légumineuses.",
    "pt": "Pequenos grãos de trigo duro, muitas vezes servidos com legumes e carne ou leguminosas.",
    "es": "Pequeños granos de trigo duro, a menudo servidos con verduras y carne o legumbres.",
    "de": "Kleine Hartweizengrießkörnchen, oft mit Gemüse und Fleisch oder Hülsenfrüchten serviert."
  },
  "harira": {
    "en": "Moroccan soup with tomatoes, lentils, chickpeas and herbs.",
    "fr": "Soupe marocaine aux tomates, aux lentilles, aux pois chiches et aux herbes.",
    "pt": "Sopa marroquina com tomate, lentilhas, grão-de-bico e ervas.",
    "es": "Sopa marroquí con tomate, lentejas, garbanzos y hierbas.",
    "de": "Marokkanische Suppe mit Tomaten, Linsen, Kichererbsen und Kräutern."
  },
  "pastilla": {
    "en": "Crisp layered Moroccan pie with a spiced filling, often chicken and almonds.",
    "fr": "Tourte marocaine croustillante à plusieurs couches, garnie d’une farce épicée, souvent au poulet et aux amandes.",
    "pt": "Tarte marroquina crocante em camadas, com recheio condimentado, muitas vezes de frango e amêndoas.",
    "es": "Pastel marroquí crujiente de varias capas con relleno especiado, a menudo de pollo y almendras.",
    "de": "Knusprige marokkanische Schichtpastete mit würziger Füllung, oft aus Hähnchen und Mandeln."
  },
  "shakshuka": {
    "en": "Eggs cooked in a spiced tomato sauce, often with peppers.",
    "fr": "Œufs cuits dans une sauce tomate épicée, souvent avec des poivrons.",
    "pt": "Ovos cozinhados num molho de tomate condimentado, muitas vezes com pimentos.",
    "es": "Huevos cocinados en salsa de tomate especiada, a menudo con pimientos.",
    "de": "Eier in würziger Tomatensauce, oft mit Paprika."
  },
  "merguez": {
    "en": "Spiced North African sausage, usually made with lamb or beef.",
    "fr": "Saucisse épicée nord-africaine, généralement à base d’agneau ou de bœuf.",
    "pt": "Salsicha condimentada do Norte de África, geralmente de borrego ou vaca.",
    "es": "Salchicha especiada norteafricana, normalmente de cordero o vacuno.",
    "de": "Würzige nordafrikanische Wurst, meist aus Lamm- oder Rindfleisch."
  },
  "feijoada": {
    "en": "Brazilian stew of black beans and various cuts of pork.",
    "fr": "Ragoût brésilien de haricots noirs et de différents morceaux de porc.",
    "pt": "Guisado brasileiro de feijão-preto e vários tipos de carne de porco.",
    "es": "Guiso brasileño de frijoles negros y distintos cortes de cerdo.",
    "de": "Brasilianischer Eintopf aus schwarzen Bohnen und verschiedenen Schweinefleischstücken."
  },
  "moqueca": {
    "en": "Brazilian fish dish with tomatoes, onions, coriander and regional variations.",
    "fr": "Plat brésilien de poisson aux tomates, aux oignons et à la coriandre, avec des variantes régionales.",
    "pt": "Prato brasileiro de peixe com tomate, cebola, coentros e variações regionais.",
    "es": "Plato brasileño de pescado con tomate, cebolla, cilantro y variantes regionales.",
    "de": "Brasilianisches Fischgericht mit Tomaten, Zwiebeln, Koriander und regionalen Varianten."
  },
  "coxinha": {
    "en": "Teardrop-shaped Brazilian croquette snack filled with shredded chicken.",
    "fr": "Croquette brésilienne en forme de goutte, garnie de poulet effiloché.",
    "pt": "Croquete brasileiro em forma de gota, recheado com frango desfiado.",
    "es": "Croqueta brasileña en forma de gota, rellena de pollo desmenuzado.",
    "de": "Tropfenförmiger brasilianischer Kroketten-Snack mit gezupfter Hähnchenfüllung."
  },
  "pao-de-queijo": {
    "en": "Small Brazilian cheese breads baked with cassava starch.",
    "fr": "Petits pains brésiliens au fromage, cuits au four et préparés avec de la fécule de manioc.",
    "pt": "Pequenos pães de queijo brasileiros, feitos com polvilho de mandioca.",
    "es": "Panecillos brasileños de queso horneados con almidón de mandioca.",
    "de": "Kleine brasilianische Käsebrötchen aus Maniokstärke."
  },
  "acaraje": {
    "en": "Afro-Brazilian fried bean cakes made from black-eyed peas, onion and salt.",
    "fr": "Beignets afro-brésiliens de haricots à œil noir, d’oignon et de sel.",
    "pt": "Bolinhos afro-brasileiros fritos de feijão-frade, cebola e sal.",
    "es": "Buñuelos afrobrasileños de frijol de ojo negro, cebolla y sal.",
    "de": "Frittierte afrobrasilianische Bohnenküchlein aus Schwarzaugenbohnen, Zwiebeln und Salz."
  },
  "brigadeiro": {
    "en": "Small Brazilian chocolate balls made with sweetened condensed milk, cocoa and butter.",
    "fr": "Petites boules chocolatées brésiliennes au lait concentré sucré, au cacao et au beurre.",
    "pt": "Pequenos doces brasileiros de chocolate feitos com leite condensado açucarado, cacau e manteiga.",
    "es": "Pequeñas bolas brasileñas de chocolate hechas con leche condensada azucarada, cacao y mantequilla.",
    "de": "Kleine brasilianische Schokoladenkugeln aus gezuckerter Kondensmilch, Kakao und Butter."
  },
  "bacalhau-a-bras": {
    "en": "Portuguese salt cod dish with thin potato strips, onions and eggs.",
    "fr": "Plat portugais de morue salée aux fines lamelles de pommes de terre, aux oignons et aux œufs.",
    "pt": "Prato português de bacalhau com batata-palha, cebola e ovos.",
    "es": "Plato portugués de bacalao salado con patatas paja, cebolla y huevos.",
    "de": "Portugiesisches Stockfischgericht mit feinen Kartoffelstreifen, Zwiebeln und Eiern."
  },
  "francesinha": {
    "en": "Hot Portuguese sandwich with meat, melted cheese and a rich sauce.",
    "fr": "Sandwich chaud portugais à la viande, au fromage fondu et à la sauce généreuse.",
    "pt": "Sanduíche quente portuguesa com carne, queijo derretido e molho rico.",
    "es": "Sándwich caliente portugués con carne, queso fundido y salsa intensa.",
    "de": "Warmes portugiesisches Sandwich mit Fleisch, geschmolzenem Käse und reichhaltiger Sauce."
  },
  "caldo-verde": {
    "en": "Portuguese soup with potatoes, finely shredded leafy cabbage and often chouriço.",
    "fr": "Soupe portugaise aux pommes de terre, au chou vert finement émincé et souvent au chouriço.",
    "pt": "Sopa portuguesa com batata, couve-galega cortada em juliana fina e frequentemente chouriço.",
    "es": "Sopa portuguesa con patata, berza cortada en tiras finas y a menudo chouriço.",
    "de": "Portugiesische Suppe mit Kartoffeln, fein geschnittenem Blattkohl und oft Chouriço."
  },
  "arroz-de-marisco": {
    "en": "Moist Portuguese rice dish with shellfish, tomato and seafood stock.",
    "fr": "Plat portugais de riz généreusement mouillé, aux crustacés ou coquillages, à la tomate et au fumet de fruits de mer.",
    "pt": "Arroz português malandrinho com marisco, tomate e caldo de marisco.",
    "es": "Arroz caldoso portugués con marisco, tomate y caldo de marisco.",
    "de": "Saftiges portugiesisches Reisgericht mit Schalen- oder Krustentieren, Tomaten und Meeresfrüchtefond."
  },
  "bifana": {
    "en": "Portuguese sandwich with thin slices of seasoned pork.",
    "fr": "Sandwich portugais aux fines tranches de porc assaisonné.",
    "pt": "Sanduíche portuguesa com bifes finos de porco temperados.",
    "es": "Bocadillo portugués con filetes finos de cerdo condimentado.",
    "de": "Portugiesisches Sandwich mit dünnen Scheiben gewürzten Schweinefleischs."
  },
  "pastel-de-nata": {
    "en": "Portuguese puff pastry tart with egg custard and caramelised spots.",
    "fr": "Tartelette portugaise en pâte feuilletée, à la crème aux œufs et aux taches caramélisées.",
    "pt": "Pastel português de massa folhada com creme de ovos e manchas caramelizadas.",
    "es": "Tartaleta portuguesa de hojaldre con crema de huevo y zonas caramelizadas.",
    "de": "Portugiesisches Blätterteigtörtchen mit Eiercreme und karamellisierten Stellen."
  },
  "pierogi": {
    "en": "Polish dumplings with savoury or sweet fillings, usually boiled.",
    "fr": "Raviolis polonais à garniture salée ou sucrée, généralement bouillis.",
    "pt": "Dumplings polacos com recheios salgados ou doces, geralmente cozidos em água.",
    "es": "Empanadillas polacas con relleno salado o dulce, normalmente hervidas.",
    "de": "Polnische Teigtaschen mit herzhafter oder süßer Füllung, meist gekocht."
  },
  "bigos": {
    "en": "Slow-cooked Polish stew with sauerkraut, fresh cabbage and meat.",
    "fr": "Ragoût polonais longuement mijoté à la choucroute, au chou frais et à la viande.",
    "pt": "Guisado polaco de cozedura lenta com chucrute, couve fresca e carne.",
    "es": "Guiso polaco cocinado lentamente con chucrut, col fresca y carne.",
    "de": "Langsam gegarter polnischer Eintopf mit Sauerkraut, frischem Kohl und Fleisch."
  },
  "zurek": {
    "en": "Sour Polish soup based on fermented flour, often rye.",
    "fr": "Soupe polonaise acidulée à base de farine fermentée, souvent de seigle.",
    "pt": "Sopa polaca ácida à base de farinha fermentada, frequentemente de centeio.",
    "es": "Sopa polaca ácida a base de harina fermentada, a menudo de centeno.",
    "de": "Säuerliche polnische Suppe auf Basis von fermentiertem Mehl, oft Roggen."
  },
  "golabki": {
    "en": "Polish cabbage rolls filled with meat and rice.",
    "fr": "Rouleaux de chou polonais farcis de viande et de riz.",
    "pt": "Rolos de couve polacos recheados com carne e arroz.",
    "es": "Rollos de col polacos rellenos de carne y arroz.",
    "de": "Polnische Kohlrouladen mit Fleisch- und Reisfüllung."
  },
  "borsjtsj": {
    "en": "Beetroot-based soup with stock, vegetables and often meat.",
    "fr": "Soupe à base de betteraves, de bouillon, de légumes et souvent de viande.",
    "pt": "Sopa à base de beterraba, caldo, legumes e frequentemente carne.",
    "es": "Sopa a base de remolacha, caldo, verduras y a menudo carne.",
    "de": "Rote-Bete-Suppe mit Brühe, Gemüse und oft Fleisch."
  },
  "varenyky": {
    "en": "Ukrainian filled dumplings that are usually boiled.",
    "fr": "Raviolis ukrainiens farcis, généralement bouillis.",
    "pt": "Dumplings ucranianos recheados, geralmente cozidos em água.",
    "es": "Empanadillas ucranianas rellenas que suelen hervirse.",
    "de": "Gefüllte ukrainische Teigtaschen, die meist gekocht werden."
  },
  "khachapuri": {
    "en": "Georgian bread filled with cheese.",
    "fr": "Pain géorgien fourré au fromage.",
    "pt": "Pão georgiano recheado com queijo.",
    "es": "Pan georgiano relleno de queso.",
    "de": "Georgisches Brot mit Käsefüllung."
  },
  "khinkali": {
    "en": "Large boiled Georgian dumplings with a juicy filling and broth inside.",
    "fr": "Grands raviolis géorgiens bouillis, à la farce juteuse et au bouillon intérieur.",
    "pt": "Grandes dumplings georgianos cozidos em água, com recheio suculento e caldo no interior.",
    "es": "Grandes empanadillas georgianas hervidas, con relleno jugoso y caldo en su interior.",
    "de": "Große gekochte georgische Teigtaschen mit saftiger Füllung und Brühe im Inneren."
  },
  "lobio": {
    "en": "Georgian bean dish, often with onions, coriander and spices.",
    "fr": "Plat géorgien de haricots, souvent aux oignons, à la coriandre et aux épices.",
    "pt": "Prato georgiano de feijão, muitas vezes com cebola, coentros e especiarias.",
    "es": "Plato georgiano de alubias, a menudo con cebolla, cilantro y especias.",
    "de": "Georgisches Bohnengericht, oft mit Zwiebeln, Koriander und Gewürzen."
  },
  "chakhokhbili": {
    "en": "Georgian chicken stew with tomatoes, onions and fresh herbs.",
    "fr": "Ragoût géorgien de poulet aux tomates, aux oignons et aux herbes fraîches.",
    "pt": "Guisado georgiano de frango com tomate, cebola e ervas frescas.",
    "es": "Guiso georgiano de pollo con tomate, cebolla y hierbas frescas.",
    "de": "Georgischer Hähncheneintopf mit Tomaten, Zwiebeln und frischen Kräutern."
  },
  "khorovats": {
    "en": "Armenian barbecue, often meat skewers with grilled vegetables.",
    "fr": "Barbecue arménien, souvent composé de brochettes de viande et de légumes grillés.",
    "pt": "Churrasco arménio, muitas vezes com espetadas de carne e legumes grelhados.",
    "es": "Parrillada armenia, a menudo de brochetas de carne con verduras asadas.",
    "de": "Armenische Grillgerichte, oft Fleischspieße mit gegrilltem Gemüse."
  },
  "dolma": {
    "en": "Stuffed vine leaves or vegetables; here, an Armenian-inspired version with meat and rice.",
    "fr": "Feuilles de vigne ou légumes farcis ; ici, une version d’inspiration arménienne à la viande et au riz.",
    "pt": "Folhas de videira ou legumes recheados; aqui, uma versão de inspiração arménia com carne e arroz.",
    "es": "Hojas de parra o verduras rellenas; aquí, una versión de inspiración armenia con carne y arroz.",
    "de": "Gefüllte Weinblätter oder Gemüse; hier eine armenisch inspirierte Variante mit Fleisch und Reis."
  },
  "ghormeh-sabzi": {
    "en": "Persian herb stew with meat, beans and dried limes.",
    "fr": "Ragoût persan aux herbes, à la viande, aux haricots et aux citrons verts séchés.",
    "pt": "Guisado persa de ervas com carne, feijão e limas secas.",
    "es": "Guiso persa de hierbas con carne, alubias y limas secas.",
    "de": "Persischer Kräutereintopf mit Fleisch, Bohnen und getrockneten Limetten."
  },
  "fesenjan": {
    "en": "Persian stew with ground walnuts and pomegranate molasses.",
    "fr": "Ragoût persan aux noix moulues et à la mélasse de grenade.",
    "pt": "Guisado persa com nozes moídas e melaço de romã.",
    "es": "Guiso persa con nueces molidas y melaza de granada.",
    "de": "Persisches Schmorgericht mit gemahlenen Walnüssen und Granatapfelmelasse."
  },
  "chelo-kebab": {
    "en": "Persian meal of steamed rice and grilled kebab.",
    "fr": "Repas persan composé de riz cuit à la vapeur et de kebab grillé.",
    "pt": "Refeição persa de arroz cozido a vapor e kebab grelhado.",
    "es": "Comida persa de arroz al vapor y kebab a la parrilla.",
    "de": "Persisches Gericht aus gedämpftem Reis und gegrilltem Kebab."
  },
  "kabuli-palaw": {
    "en": "Afghan rice dish with tender meat, carrots and raisins.",
    "fr": "Plat afghan de riz à la viande tendre, aux carottes et aux raisins secs.",
    "pt": "Prato afegão de arroz com carne tenra, cenoura e passas.",
    "es": "Plato afgano de arroz con carne tierna, zanahoria y pasas.",
    "de": "Afghanisches Reisgericht mit zartem Fleisch, Karotten und Rosinen."
  },
  "ashak": {
    "en": "Boiled Afghan dumplings filled with leeks or gandana.",
    "fr": "Raviolis afghans bouillis, farcis de poireaux ou de gandana.",
    "pt": "Dumplings afegãos cozidos em água, recheados com alho-francês ou gandana.",
    "es": "Empanadillas afganas hervidas, rellenas de puerro o gandana.",
    "de": "Gekochte afghanische Teigtaschen mit Lauch- oder Gandana-Füllung."
  },
  "bolani": {
    "en": "Thin Afghan flatbread filled with ingredients such as potato, leek or pumpkin.",
    "fr": "Pain plat afghan fin, farci notamment de pommes de terre, de poireaux ou de courge.",
    "pt": "Pão achatado afegão fino, recheado, por exemplo, com batata, alho-francês ou abóbora.",
    "es": "Pan plano afgano fino, relleno, entre otros ingredientes, de patata, puerro o calabaza.",
    "de": "Dünnes afghanisches Fladenbrot mit Füllungen etwa aus Kartoffeln, Lauch oder Kürbis."
  },
  "mac-and-cheese": {
    "en": "Macaroni with a creamy cheese sauce, often baked until golden.",
    "fr": "Macaronis à la sauce crémeuse au fromage, souvent gratinés.",
    "pt": "Macarrão com molho cremoso de queijo, muitas vezes gratinado.",
    "es": "Macarrones con salsa cremosa de queso, a menudo gratinados.",
    "de": "Makkaroni mit cremiger Käsesauce, oft überbacken."
  },
  "buffalo-wings": {
    "en": "Crisp fried chicken wings tossed in a hot, tangy sauce.",
    "fr": "Ailes de poulet frites croustillantes, enrobées d’une sauce piquante et acidulée.",
    "pt": "Asas de frango fritas e crocantes, envolvidas num molho picante e ácido.",
    "es": "Alitas de pollo fritas y crujientes, bañadas en una salsa picante y ácida.",
    "de": "Knusprig frittierte Hähnchenflügel in scharfer, säuerlicher Sauce."
  },
  "pulled-pork": {
    "en": "Slow-roasted pork pulled apart into juicy strands.",
    "fr": "Porc rôti lentement, effiloché en fibres juteuses.",
    "pt": "Carne de porco assada lentamente e desfiada em fibras suculentas.",
    "es": "Cerdo asado lentamente y desmenuzado en fibras jugosas.",
    "de": "Langsam gegartes Schweinefleisch, das in saftige Fasern gezupft wird."
  },
  "jambalaya": {
    "en": "Spiced rice dish with meat, vegetables and optional seafood.",
    "fr": "Plat de riz épicé avec viande, légumes et éventuellement fruits de mer.",
    "pt": "Prato de arroz condimentado com carne, legumes e, eventualmente, marisco.",
    "es": "Plato de arroz especiado con carne, verduras y, opcionalmente, marisco.",
    "de": "Würziges Reisgericht mit Fleisch, Gemüse und gegebenenfalls Meeresfrüchten."
  },
  "gumbo": {
    "en": "Rich Louisiana stew or soup, often with dark roux, meat or seafood.",
    "fr": "Ragoût ou soupe généreuse de Louisiane, souvent avec un roux brun, de la viande ou des fruits de mer.",
    "pt": "Guisado ou sopa rica da Luisiana, muitas vezes com roux escuro, carne ou marisco.",
    "es": "Guiso o sopa consistente de Luisiana, a menudo con roux oscuro, carne o marisco.",
    "de": "Reichhaltiger Eintopf oder Suppe aus Louisiana, oft mit dunkler Mehlschwitze, Fleisch oder Meeresfrüchten."
  },
  "philly-cheesesteak": {
    "en": "Hot sandwich with thinly sliced beef and melted cheese.",
    "fr": "Sandwich chaud aux fines tranches de bœuf et au fromage fondu.",
    "pt": "Sanduíche quente com fatias finas de carne de vaca e queijo derretido.",
    "es": "Bocadillo caliente con láminas finas de carne de vacuno y queso fundido.",
    "de": "Warmes Sandwich mit dünn geschnittenem Rindfleisch und geschmolzenem Käse."
  },
  "lomo-saltado": {
    "en": "Peruvian stir-fry with beef, onions, tomatoes and chips.",
    "fr": "Sauté péruvien de bœuf aux oignons, aux tomates et aux frites.",
    "pt": "Salteado peruano de carne de vaca com cebola, tomate e batatas fritas.",
    "es": "Salteado peruano de carne de vacuno con cebolla, tomate y patatas fritas.",
    "de": "Peruanisches Wokgericht mit Rindfleisch, Zwiebeln, Tomaten und Pommes frites."
  },
  "aji-de-gallina": {
    "en": "Creamy Peruvian chicken dish with yellow chilli and a bread-thickened sauce.",
    "fr": "Plat péruvien crémeux de poulet au piment jaune et à la sauce épaissie au pain.",
    "pt": "Prato peruano cremoso de frango com malagueta amarela e molho engrossado com pão.",
    "es": "Plato peruano cremoso de pollo con ají amarillo y salsa espesada con pan.",
    "de": "Cremiges peruanisches Hähnchengericht mit gelber Chili und einer mit Brot gebundenen Sauce."
  },
  "anticuchos": {
    "en": "Peruvian grilled skewers, traditionally made with beef heart marinated in ají panca.",
    "fr": "Brochettes péruviennes grillées, traditionnellement au cœur de bœuf mariné à l’ají panca.",
    "pt": "Espetadas peruanas grelhadas, tradicionalmente de coração de vaca marinado em ají panca.",
    "es": "Brochetas peruanas a la parrilla, tradicionalmente de corazón de res marinado en ají panca.",
    "de": "Peruanische Grillspieße, traditionell mit in Ají Panca mariniertem Rinderherz."
  },
  "empanadas": {
    "en": "Filled pastries, baked or fried; here, an Argentine-inspired meat version.",
    "fr": "Chaussons farcis, cuits au four ou frits ; ici, une version à la viande d’inspiration argentine.",
    "pt": "Pastéis de massa recheada, assados ou fritos; aqui, uma versão de carne de inspiração argentina.",
    "es": "Empanadas rellenas, horneadas o fritas; aquí, una versión de carne de inspiración argentina.",
    "de": "Gefüllte Teiggebäcke, gebacken oder frittiert; hier eine argentinisch inspirierte Fleischvariante."
  },
  "asado": {
    "en": "South American barbecue tradition of cooking meat over embers.",
    "fr": "Tradition sud-américaine de grillade de viande sur les braises.",
    "pt": "Tradição sul-americana de churrasco com carne cozinhada sobre brasas.",
    "es": "Tradición sudamericana de asar carne sobre brasas.",
    "de": "Südamerikanische Grilltradition, bei der Fleisch über Glut gegart wird."
  },
  "pastel-de-choclo": {
    "en": "Chilean baked dish with ground maize over a spiced meat filling.",
    "fr": "Plat chilien cuit au four, composé de maïs moulu sur une farce de viande épicée.",
    "pt": "Prato chileno de forno com milho moído sobre um recheio de carne condimentada.",
    "es": "Plato chileno al horno con maíz molido sobre un relleno de carne especiada.",
    "de": "Chilenischer Auflauf mit gemahlenem Mais über einer gewürzten Fleischfüllung."
  },
  "kibbeh": {
    "en": "Spiced dish of bulgur and meat, often shaped into filled fried croquettes.",
    "fr": "Plat épicé de boulgour et de viande, souvent façonné en croquettes farcies et frites.",
    "pt": "Prato condimentado de bulgur e carne, muitas vezes moldado em croquetes recheados e fritos.",
    "es": "Plato especiado de bulgur y carne, a menudo en forma de croquetas rellenas y fritas.",
    "de": "Würziges Gericht aus Bulgur und Fleisch, oft als gefüllte, frittierte Kroketten geformt."
  },
  "fattoush": {
    "en": "Fresh Levantine salad with crisp flatbread, vegetables and sumac.",
    "fr": "Salade levantine fraîche au pain plat croustillant, aux légumes et au sumac.",
    "pt": "Salada levantina fresca com pão achatado crocante, legumes e sumagre.",
    "es": "Ensalada levantina fresca con pan plano crujiente, verduras y sumac.",
    "de": "Frischer levantinischer Salat mit knusprigem Fladenbrot, Gemüse und Sumach."
  },
  "masgouf": {
    "en": "Iraqi barbecue dish of a whole butterflied fish, traditionally freshwater fish such as carp.",
    "fr": "Poisson entier ouvert en portefeuille et grillé à l’irakienne, traditionnellement un poisson d’eau douce comme la carpe.",
    "pt": "Prato iraquiano de peixe inteiro aberto e grelhado, tradicionalmente de água doce, como a carpa.",
    "es": "Plato iraquí de pescado entero abierto y asado, tradicionalmente de agua dulce, como la carpa.",
    "de": "Irakisches Grillgericht aus einem ganzen, aufgeklappten Fisch, traditionell einem Süßwasserfisch wie Karpfen."
  },
  "kabsa": {
    "en": "Spiced long-grain rice with meat or chicken, associated with Saudi Arabia.",
    "fr": "Riz à grains longs épicé, accompagné de viande ou de poulet, associé à l’Arabie saoudite.",
    "pt": "Arroz de grão longo condimentado com carne ou frango, associado à Arábia Saudita.",
    "es": "Arroz de grano largo especiado con carne o pollo, asociado a Arabia Saudí.",
    "de": "Gewürzter Langkornreis mit Fleisch oder Hähnchen, bekannt aus Saudi-Arabien."
  },
  "mandi": {
    "en": "Rice dish with slow-cooked meat and aromatic spices, traditionally with a smoky flavour.",
    "fr": "Plat de riz à la viande cuite lentement et aux épices aromatiques, traditionnellement au goût fumé.",
    "pt": "Prato de arroz com carne cozinhada lentamente e especiarias aromáticas, tradicionalmente com sabor fumado.",
    "es": "Plato de arroz con carne cocinada lentamente y especias aromáticas, tradicionalmente con sabor ahumado.",
    "de": "Reisgericht mit langsam gegartem Fleisch und aromatischen Gewürzen, traditionell mit rauchigem Aroma."
  }
} as const satisfies Readonly<Record<string, Record<InternationalSummaryLocale, string>>>;
