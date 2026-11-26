import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const padThaiTranslations = {
  "nn": {
    "overview": "Pad thai lukkast når nudlane er elastiske og sausen festar seg til dei utan å gjere retten våt. Tamarind gjev den sentrale syra, medan fiskesaus og sukker gjev salt og sødme.",
    "history": "Retten fekk ei tydeleg nasjonal rolle i Thailand på 1900-talet og er i dag blant dei mest kjende rettane i landet internasjonalt. Restaurantvariantane varierer mykje i sødme og bruk av protein.",
    "flavor": "Søt, syrleg, salt og umamirik med nøttepreg og frisk lime. Chili blir ofte servert som valfri ekstra varme.",
    "technique": "Risnudlane blir bløytte heller enn kokte heilt ferdige på førehand. Woken må vere varm, og sausen bør vere ferdig blanda før steikinga byrjar.",
    "essentials": [
      "Flate risnudlar.",
      "Tamarind, fiskesaus og sukker i sausbasen.",
      "Egg, tofu, reker eller kylling etter variant.",
      "Bønnespirer, peanøtter, lime og gjerne kvitlauksgraslauk."
    ],
    "recipe": {
      "label": "Pad thai med tofu og reker",
      "yield": "4 porsjonar",
      "time": "ca. 35 min",
      "ingredients": [
        "300 g flate risnudlar",
        "3 ss tamarindkonsentrat",
        "3 ss fiskesaus",
        "2–3 ss palmesukker eller brunt sukker",
        "2 egg",
        "200 g fast tofu",
        "200 g reinsa reker, valfritt",
        "150 g bønnespirer",
        "60 g rista peanøtter",
        "lime og vårlauk"
      ],
      "steps": [
        "Bløytlegg nudlane til dei er bøyelege, men framleis faste.",
        "Varm tamarind, fiskesaus og sukker saman til ein jamn saus.",
        "Steik tofu og eventuelle reker raskt i varm wok og skyv dei til sida.",
        "Ha i egg, deretter nudlar og saus, og vend raskt til nudlane er møre og blanke.",
        "Vend inn mesteparten av spirene og server med peanøtter, lime og vårlauk."
      ]
    },
    "variants": [
      "Med reker, ein vanleg restaurantvariant.",
      "Med kylling eller tofu.",
      "Vegetarisk med soyasaus i staden for fiskesaus og ekstra tofu."
    ],
    "serving": [
      "Blir servert med lime, peanøtter og chili slik at gjesten kan justere sjølv.",
      "Bønnespirene bør halde på den tydelege sprøheita."
    ],
    "commonMistakes": [
      "Å koke risnudlane heilt ferdige før woksteikinga.",
      "For mykje saus som gjer retten søt og klissete.",
      "For lita eller kald panne som dampar i staden for å woksteikje."
    ]
  },
  "sv": {
    "overview": "Pad thai lyckas när nudlarna är elastiska och såsen fäster vid dem utan att göra rätten blöt. Tamarind ger den centrala syran, medan fisksås och socker bidrar med sälta och sötma.",
    "history": "Rätten fick en tydlig nationell roll i Thailand under 1900-talet och är i dag en av landets mest kända rätter internationellt. Restaurangversionerna varierar mycket i sötma och val av protein.",
    "flavor": "Söt, syrlig, salt och umamirik med nötighet och frisk lime. Chili serveras ofta som valfri extra hetta.",
    "technique": "Risnudlarna blötläggs i stället för att kokas helt färdiga i förväg. Woken måste vara het, och såsen bör vara färdigblandad innan stekningen börjar.",
    "essentials": [
      "Platta risnudlar.",
      "Tamarind, fisksås och socker i såsbasen.",
      "Ägg, tofu, räkor eller kyckling beroende på variant.",
      "Böngroddar, jordnötter, lime och gärna vitlöksgräslök."
    ],
    "recipe": {
      "label": "Pad thai med tofu och räkor",
      "yield": "4 portioner",
      "time": "ca 35 min",
      "ingredients": [
        "300 g platta risnudlar",
        "3 msk tamarindkoncentrat",
        "3 msk fisksås",
        "2–3 msk palmsocker eller brunt socker",
        "2 ägg",
        "200 g fast tofu",
        "200 g skalade räkor, valfritt",
        "150 g böngroddar",
        "60 g rostade jordnötter",
        "lime och salladslök"
      ],
      "steps": [
        "Blötlägg nudlarna tills de är böjliga men fortfarande fasta.",
        "Värm tamarind, fisksås och socker tillsammans till en jämn sås.",
        "Stek tofu och eventuella räkor snabbt i en het wok och skjut dem åt sidan.",
        "Tillsätt ägg, sedan nudlar och sås, och vänd runt snabbt tills nudlarna är mjuka och blanka.",
        "Vänd ner merparten av groddarna och servera med jordnötter, lime och salladslök."
      ]
    },
    "variants": [
      "Med räkor, en vanlig restaurangvariant.",
      "Med kyckling eller tofu.",
      "Vegetarisk med sojasås i stället för fisksås och extra tofu."
    ],
    "serving": [
      "Serveras med lime, jordnötter och chili så att gästen själv kan justera smaken.",
      "Böngroddarna bör behålla sin tydliga krispighet."
    ],
    "commonMistakes": [
      "Att koka risnudlarna helt färdiga före wokningen.",
      "För mycket sås, som gör rätten söt och klibbig.",
      "En för liten eller kall panna som ångkokar i stället för att woka."
    ]
  },
  "da": {
    "overview": "Pad thai lykkes, når nudlerne er elastiske, og saucen hænger ved uden at gøre retten våd. Tamarind giver den centrale syre, mens fiskesauce og sukker bidrager med salt og sødme.",
    "history": "Retten fik en tydelig national rolle i Thailand i 1900-tallet og er i dag blandt landets mest kendte retter internationalt. Restaurantversioner varierer meget i sødme og valg af protein.",
    "flavor": "Sød, syrlig, salt og umamierig med nøddepræg og frisk lime. Chili serveres ofte som valgfri ekstra styrke.",
    "technique": "Risnudlerne udblødes frem for at blive kogt helt færdige på forhånd. Wokken skal være varm, og saucen bør være færdigblandet, før stegningen starter.",
    "essentials": [
      "Flade risnudler.",
      "Tamarind, fiskesauce og sukker i saucebasen.",
      "Æg, tofu, rejer eller kylling efter variant.",
      "Bønnespirer, jordnødder, lime og gerne hvidløgspurløg."
    ],
    "recipe": {
      "label": "Pad thai med tofu og rejer",
      "yield": "4 portioner",
      "time": "ca. 35 min",
      "ingredients": [
        "300 g flade risnudler",
        "3 spsk tamarindkoncentrat",
        "3 spsk fiskesauce",
        "2–3 spsk palmesukker eller brunt sukker",
        "2 æg",
        "200 g fast tofu",
        "200 g rensede rejer, valgfrit",
        "150 g bønnespirer",
        "60 g ristede jordnødder",
        "lime og forårsløg"
      ],
      "steps": [
        "Udblød nudlerne, til de er bøjelige, men stadig faste.",
        "Varm tamarind, fiskesauce og sukker sammen til en ensartet sauce.",
        "Steg tofu og eventuelle rejer hurtigt i en varm wok, og skub dem til siden.",
        "Tilsæt æg, derefter nudler og sauce, og vend hurtigt rundt, til nudlerne er møre og blanke.",
        "Vend størstedelen af spirerne i, og servér med jordnødder, lime og forårsløg."
      ]
    },
    "variants": [
      "Med rejer, en almindelig restaurantvariant.",
      "Med kylling eller tofu.",
      "Vegetarisk med sojasauce i stedet for fiskesauce og ekstra tofu."
    ],
    "serving": [
      "Serveres med lime, jordnødder og chili, så gæsten selv kan justere smagen.",
      "Bønnespirerne bør bevare deres tydelige sprødhed."
    ],
    "commonMistakes": [
      "At koge risnudlerne helt færdige før wokstegningen.",
      "For meget sauce, som gør retten sød og klistret.",
      "En for lille eller kold pande, som damper i stedet for at wokstege."
    ]
  },
  "fi": {
    "overview": "Pad thai onnistuu, kun nuudelit ovat kimmoisia ja kastike tarttuu niihin tekemättä ruoasta vetistä. Tamarindi tuo keskeisen happamuuden, kalakastike ja sokeri puolestaan suolaisuuden ja makeuden.",
    "history": "Ruokalaji sai selvän kansallisen aseman Thaimaassa 1900-luvulla ja kuuluu nykyään maan kansainvälisesti tunnetuimpiin ruokiin. Ravintolaversioiden makeus ja proteiinin lähteet vaihtelevat paljon.",
    "flavor": "Makea, hapan, suolainen ja umamipitoinen, pähkinäisiä sävyjä ja raikasta limeä. Chiliä tarjotaan usein erikseen lisätuliseksi mausteeksi.",
    "technique": "Riisinuudelit liotetaan sen sijaan, että ne keitettäisiin täysin kypsiksi etukäteen. Wokkipannun on oltava kuuma, ja kastike kannattaa sekoittaa valmiiksi ennen paistamista.",
    "essentials": [
      "Litteitä riisinuudeleita.",
      "Tamarindia, kalakastiketta ja sokeria kastikepohjaan.",
      "Kananmunaa, tofua, katkarapuja tai kanaa muunnelman mukaan.",
      "Pavunituja, maapähkinöitä, limeä ja mielellään kiinansipulia."
    ],
    "recipe": {
      "label": "Pad thai tofulla ja katkaravuilla",
      "yield": "4 annosta",
      "time": "n. 35 min",
      "ingredients": [
        "300 g litteitä riisinuudeleita",
        "3 rkl tamarinditiivistettä",
        "3 rkl kalakastiketta",
        "2–3 rkl palmusokeria tai ruskeaa sokeria",
        "2 kananmunaa",
        "200 g kiinteää tofua",
        "200 g kuorittuja katkarapuja, halutessasi",
        "150 g pavunituja",
        "60 g paahdettuja maapähkinöitä",
        "limeä ja kevätsipulia"
      ],
      "steps": [
        "Liota nuudeleita, kunnes ne taipuvat mutta ovat vielä kiinteitä.",
        "Kuumenna tamarindi, kalakastike ja sokeri tasaiseksi kastikkeeksi.",
        "Paista tofu ja mahdolliset katkaravut nopeasti kuumassa wokkipannussa ja siirrä ne sivuun.",
        "Lisää kananmunat, sitten nuudelit ja kastike, ja kääntele nopeasti, kunnes nuudelit ovat kypsiä ja kiiltäviä.",
        "Kääntele suurin osa iduista joukkoon ja tarjoile maapähkinöiden, limen ja kevätsipulin kanssa."
      ]
    },
    "variants": [
      "Katkaravuilla, yleinen ravintolaversio.",
      "Kanalla tai tofulla.",
      "Kasvisversio, jossa kalakastike korvataan soijakastikkeella ja lisätään tofua."
    ],
    "serving": [
      "Tarjoillaan limen, maapähkinöiden ja chilin kanssa, jotta ruokailija voi itse säätää makua.",
      "Pavunitujen tulisi säilyä selvästi rapeina."
    ],
    "commonMistakes": [
      "Riisinuudeleiden keittäminen täysin kypsiksi ennen wokkaamista.",
      "Liian runsas kastike, joka tekee ruoasta makeaa ja tahmeaa.",
      "Liian pieni tai viileä pannu, jolla ainekset höyrystyvät paistumisen sijaan."
    ]
  },
  "is": {
    "overview": "Pad thai tekst vel þegar núðlurnar eru fjaðrandi og sósan loðir við þær án þess að gera réttinn blautan. Tamarind gefur megin­sýruna en fiskisósa og sykur sjá um seltu og sætu.",
    "history": "Rétturinn fékk skýrt þjóðlegt hlutverk í Taílandi á 20. öld og er nú meðal þekktustu rétta landsins á alþjóðavísu. Veitingahúsaútgáfur eru mjög mismunandi hvað varðar sætu og val á próteingjafa.",
    "flavor": "Sætt, súrt, salt og umamíríkt með hnetukeim og ferskri límónu. Chili er oft borið fram sérstaklega fyrir þá sem vilja meiri styrk.",
    "technique": "Hrísgrjónanúðlurnar eru lagðar í bleyti fremur en fullsoðnar fyrirfram. Wok-pannan þarf að vera heit og sósan tilbúin áður en steiking hefst.",
    "essentials": [
      "Flatar hrísgrjónanúðlur.",
      "Tamarind, fiskisósa og sykur í sósugrunninn.",
      "Egg, tófú, rækjur eða kjúklingur eftir útgáfu.",
      "Baunaspírur, jarðhnetur, límóna og helst hvítlauksgraslaukur."
    ],
    "recipe": {
      "label": "Pad thai með tófúi og rækjum",
      "yield": "4 skammtar",
      "time": "u.þ.b. 35 mín.",
      "ingredients": [
        "300 g flatar hrísgrjónanúðlur",
        "3 msk. tamarind-þykkni",
        "3 msk. fiskisósa",
        "2–3 msk. pálmasykur eða púðursykur",
        "2 egg",
        "200 g stíft tófú",
        "200 g hreinsaðar rækjur, valfrjálst",
        "150 g baunaspírur",
        "60 g ristaðar jarðhnetur",
        "límóna og vorlaukur"
      ],
      "steps": [
        "Leggið núðlurnar í bleyti þar til þær eru sveigjanlegar en enn stinnar.",
        "Hitið tamarind, fiskisósu og sykur saman í jafna sósu.",
        "Steikið tófú og rækjur, ef þær eru notaðar, hratt á heitri wok-pönnu og ýtið til hliðar.",
        "Bætið eggjum við, síðan núðlum og sósu, og veltið hratt þar til núðlurnar eru mjúkar og gljáandi.",
        "Blandið flestum spírunum saman við og berið fram með jarðhnetum, límónu og vorlauk."
      ]
    },
    "variants": [
      "Með rækjum, algeng veitingahúsaútgáfa.",
      "Með kjúklingi eða tófúi.",
      "Grænmetisútgáfa með sojasósu í stað fiskisósu og meira tófúi."
    ],
    "serving": [
      "Borið fram með límónu, jarðhnetum og chili svo gesturinn geti stillt bragðið sjálfur.",
      "Baunaspírurnar ættu að halda greinilegri stökkri áferð."
    ],
    "commonMistakes": [
      "Að fullsjóða hrísgrjónanúðlurnar fyrir wok-steikingu.",
      "Of mikil sósa sem gerir réttinn sætan og klístraðan.",
      "Of lítil eða köld panna sem gufusýður í stað þess að steikja."
    ]
  },
  "en": {
    "overview": "Pad thai works when the noodles are springy and the sauce coats them without making the dish wet. Tamarind provides the main acidity, while fish sauce and sugar build saltiness and sweetness.",
    "history": "The dish acquired a distinct national role in Thailand in the twentieth century and is now among the country's best-known dishes internationally. Restaurant versions vary widely in sweetness and choice of protein.",
    "flavor": "Sweet, sour, salty and rich in umami, with nutty notes and fresh lime. Chilli is often served separately for optional extra heat.",
    "technique": "Rice noodles are soaked rather than fully cooked in advance. The wok must be hot, and the sauce should be mixed before frying begins.",
    "essentials": [
      "Flat rice noodles.",
      "Tamarind, fish sauce and sugar in the sauce base.",
      "Eggs, tofu, prawns or chicken depending on the variant.",
      "Bean sprouts, peanuts, lime and preferably garlic chives."
    ],
    "recipe": {
      "label": "Pad thai with tofu and prawns",
      "yield": "4 servings",
      "time": "approx. 35 min",
      "ingredients": [
        "300 g flat rice noodles",
        "3 tbsp tamarind concentrate",
        "3 tbsp fish sauce",
        "2–3 tbsp palm sugar or brown sugar",
        "2 eggs",
        "200 g firm tofu",
        "200 g peeled prawns, optional",
        "150 g bean sprouts",
        "60 g roasted peanuts",
        "lime and spring onions"
      ],
      "steps": [
        "Soak the noodles until pliable but still firm.",
        "Heat the tamarind, fish sauce and sugar together into a smooth sauce.",
        "Quickly fry the tofu and any prawns in a hot wok and push them to one side.",
        "Add the eggs, then the noodles and sauce, and toss quickly until the noodles are tender and glossy.",
        "Fold in most of the sprouts and serve with peanuts, lime and spring onions."
      ]
    },
    "variants": [
      "With prawns, a common restaurant version.",
      "With chicken or tofu.",
      "Vegetarian with soy sauce instead of fish sauce and extra tofu."
    ],
    "serving": [
      "Serve with lime, peanuts and chilli so diners can adjust the flavour themselves.",
      "The bean sprouts should retain a distinct crunch."
    ],
    "commonMistakes": [
      "Fully cooking the rice noodles before stir-frying.",
      "Too much sauce, making the dish sweet and sticky.",
      "A pan that is too small or cold, steaming rather than stir-frying."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
