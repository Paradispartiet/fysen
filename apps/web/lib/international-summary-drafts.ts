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
  }
} as const satisfies Readonly<Record<string, Record<InternationalSummaryLocale, string>>>;
