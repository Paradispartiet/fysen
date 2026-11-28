import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const sushiTranslations = {
  "nn": {
    "overview": "Sushi handlar først og fremst om risen. Den krydra sushirisen er grunnlaget for nigiri, maki, chirashi og mange andre former, medan rå fisk berre er éin av fleire moglege toppingar og fyll.",
    "history": "Sushi har lange historiske røter i konservering av fisk med fermentert ris, men moderne Edomae-sushi utvikla seg i Edo, dagens Tokyo, som rask servering med ferskare råvarer. Dagens sushi rommar både svært tradisjonelle og moderne stilar.",
    "flavor": "God sushi balanserer mild syre og sødme i risen med salt, umami og råvara sin eigen karakter. Temperatur og tekstur er like viktige som smak.",
    "technique": "Risen blir skylja, kokt presist og vend med eddikblanding utan å bli mosa. Nigiri blir forma lett; han skal halde saman, men ikkje vere kompakt.",
    "essentials": [
      "Kortkorna japansk ris med rett klebrigenskap.",
      "Riseddik, sukker og salt som blir vende inn medan risen er varm.",
      "Fisk, sjømat, egg eller grønsaker valde etter stil.",
      "Nori, wasabi, soyasaus og garnityr blir brukte med måte."
    ],
    "recipe": {
      "label": "Enkel maki heime",
      "yield": "4 rullar",
      "time": "ca. 50 min",
      "ingredients": [
        "300 g sushiris",
        "3,5 dl vatn",
        "4 ss riseddik",
        "2 ss sukker",
        "1 ts salt",
        "4 ark nori",
        "avokado og agurk i stavar",
        "200 g varmebehandla laks eller annan trygg topping",
        "soyasaus og sylta ingefær"
      ],
      "steps": [
        "Skyl risen til vatnet nesten er klart og lat han renne av før koking.",
        "Kok risen etter pakkerettleiinga og lat han kvile under lok.",
        "Løys sukker og salt i riseddiken og vend blandinga varsamt inn i varm ris.",
        "Fordel eit tynt lag ris på nori, legg fyll i ei linje og rull fast med bambusmatte eller bakepapir.",
        "Lat rullane kvile eit par minutt og skjer med ein fukta, skarp kniv."
      ]
    },
    "variants": [
      "Nigiri: handforma ris med topping på toppen.",
      "Maki: ris og fyll rulla i nori.",
      "Chirashi: sushiris servert i skål med topping fordelt over.",
      "Temaki: handrulla nori forma som ei kjegle."
    ],
    "serving": [
      "Sushi er best når risen ikkje er kjøleskapskald.",
      "Soyasaus blir brukt som krydder, ikkje som bad; delikate bitar treng lite."
    ],
    "commonMistakes": [
      "For våt ris som blir grautete.",
      "For mykje ris i makirullen.",
      "Å presse risen hardt saman slik at teksturen forsvinn."
    ]
  },
  "sv": {
    "overview": "Sushi handlar först och främst om riset. Det kryddade sushiriset är grunden för nigiri, maki, chirashi och många andra former, medan rå fisk bara är en av flera möjliga toppingar och fyllningar.",
    "history": "Sushi har långa historiska rötter i konservering av fisk med fermenterat ris, men modern Edomae-sushi utvecklades i Edo, dagens Tokyo, som snabb servering med färskare råvaror. Dagens sushi omfattar både mycket traditionella och moderna stilar.",
    "flavor": "God sushi balanserar risets milda syra och sötma med sälta, umami och råvarans egen karaktär. Temperatur och konsistens är lika viktiga som smak.",
    "technique": "Riset sköljs, kokas noggrant och vänds med vinägerblandning utan att mosas. Nigiri formas försiktigt; den ska hålla ihop men inte vara kompakt.",
    "essentials": [
      "Kortkornigt japanskt ris med rätt klibbighet.",
      "Risvinäger, socker och salt som vänds ner medan riset är varmt.",
      "Fisk, skaldjur, ägg eller grönsaker valda efter stil.",
      "Nori, wasabi, sojasås och garnering används med måtta."
    ],
    "recipe": {
      "label": "Enkel maki hemma",
      "yield": "4 rullar",
      "time": "ca 50 min",
      "ingredients": [
        "300 g sushiris",
        "3,5 dl vatten",
        "4 msk risvinäger",
        "2 msk socker",
        "1 tsk salt",
        "4 ark nori",
        "avokado och gurka i stavar",
        "200 g tillagad lax eller annan säker topping",
        "sojasås och inlagd ingefära"
      ],
      "steps": [
        "Skölj riset tills vattnet nästan är klart och låt det rinna av före kokning.",
        "Koka riset enligt förpackningens anvisningar och låt det vila under lock.",
        "Lös upp socker och salt i risvinägern och vänd försiktigt ner blandningen i varmt ris.",
        "Fördela ett tunt lager ris på nori, lägg fyllningen i en rad och rulla fast med bambumatta eller bakplåtspapper.",
        "Låt rullarna vila ett par minuter och skär med en fuktad, vass kniv."
      ]
    },
    "variants": [
      "Nigiri: handformat ris med topping ovanpå.",
      "Maki: ris och fyllning rullade i nori.",
      "Chirashi: sushiris i en skål med topping fördelad ovanpå.",
      "Temaki: handrullad nori formad till en strut."
    ],
    "serving": [
      "Sushi är bäst när riset inte är kylskåpskallt.",
      "Sojasås används som krydda, inte som bad; delikata bitar behöver lite."
    ],
    "commonMistakes": [
      "För blött ris som blir grötigt.",
      "För mycket ris i makirullen.",
      "Att pressa ihop riset hårt så att konsistensen försvinner."
    ]
  },
  "da": {
    "overview": "Sushi handler først og fremmest om risene. De krydrede sushiris er grundlaget for nigiri, maki, chirashi og mange andre former, mens rå fisk blot er én af flere mulige toppings og fyld.",
    "history": "Sushi har lange historiske rødder i konservering af fisk med fermenterede ris, men moderne Edomae-sushi udviklede sig i Edo, nutidens Tokyo, som hurtig servering med friskere råvarer. Nutidens sushi rummer både meget traditionelle og moderne stilarter.",
    "flavor": "God sushi balancerer mild syre og sødme i risene med salt, umami og råvarens egen karakter. Temperatur og tekstur er lige så vigtige som smag.",
    "technique": "Risene skylles, koges præcist og vendes med eddikeblanding uden at blive most. Nigiri formes let; den skal hænge sammen, men ikke være kompakt.",
    "essentials": [
      "Kortkornede japanske ris med den rette klæbrighed.",
      "Riseddike, sukker og salt, der vendes i, mens risene er varme.",
      "Fisk, skaldyr, æg eller grøntsager valgt efter stil.",
      "Nori, wasabi, sojasauce og pynt bruges med måde."
    ],
    "recipe": {
      "label": "Enkel maki derhjemme",
      "yield": "4 ruller",
      "time": "ca. 50 min",
      "ingredients": [
        "300 g sushiris",
        "3,5 dl vand",
        "4 spsk riseddike",
        "2 spsk sukker",
        "1 tsk salt",
        "4 ark nori",
        "avocado og agurk i stave",
        "200 g varmebehandlet laks eller anden sikker topping",
        "sojasauce og syltet ingefær"
      ],
      "steps": [
        "Skyl risene, til vandet næsten er klart, og lad dem dryppe af før kogning.",
        "Kog risene efter pakkens anvisning, og lad dem hvile under låg.",
        "Opløs sukker og salt i riseddiken, og vend forsigtigt blandingen i de varme ris.",
        "Fordel et tyndt lag ris på nori, læg fyldet i en linje, og rul fast med bambusmåtte eller bagepapir.",
        "Lad rullerne hvile et par minutter, og skær med en fugtig, skarp kniv."
      ]
    },
    "variants": [
      "Nigiri: håndformede ris med topping ovenpå.",
      "Maki: ris og fyld rullet i nori.",
      "Chirashi: sushiris serveret i en skål med topping fordelt ovenpå.",
      "Temaki: håndrullet nori formet som et kræmmerhus."
    ],
    "serving": [
      "Sushi er bedst, når risene ikke er køleskabskolde.",
      "Sojasauce bruges som krydderi, ikke som bad; delikate stykker behøver kun lidt."
    ],
    "commonMistakes": [
      "For våde ris, som bliver grødagtige.",
      "For mange ris i makirullen.",
      "At presse risene hårdt sammen, så teksturen forsvinder."
    ]
  },
  "fi": {
    "overview": "Sushissa tärkeintä on riisi. Maustettu sushiriisi on nigirin, makin, chirashin ja monien muiden muotojen perusta, ja raaka kala on vain yksi monista mahdollisista päällysteistä ja täytteistä.",
    "history": "Sushilla on pitkät historialliset juuret kalan säilömisessä fermentoidun riisin avulla. Moderni Edomae-sushi kehittyi kuitenkin Edossa, nykyisessä Tokiossa, nopeasti tarjottavaksi ruoaksi tuoreemmista aineksista. Nykyinen sushi kattaa sekä hyvin perinteisiä että moderneja tyylejä.",
    "flavor": "Hyvä sushi tasapainottaa riisin miedon hapokkuuden ja makeuden suolaisuudella, umamilla ja raaka-aineen omalla maulla. Lämpötila ja rakenne ovat yhtä tärkeitä kuin maku.",
    "technique": "Riisi huuhdellaan, keitetään tarkasti ja sekoitetaan etikkaseokseen murskaamatta jyviä. Nigiri muotoillaan kevyesti: sen tulee pysyä koossa olematta tiivis.",
    "essentials": [
      "Lyhytjyväistä japanilaista riisiä, jonka tahmeus on sopiva.",
      "Riisiviinietikkaa, sokeria ja suolaa, jotka sekoitetaan riisiin sen ollessa lämmintä.",
      "Kala, merenelävät, kananmuna tai kasvikset tyylin mukaan.",
      "Noria, wasabia, soijakastiketta ja koristeita käytetään maltillisesti."
    ],
    "recipe": {
      "label": "Helppo kotitekoinen maki",
      "yield": "4 rullaa",
      "time": "n. 50 min",
      "ingredients": [
        "300 g sushiriisiä",
        "3,5 dl vettä",
        "4 rkl riisiviinietikkaa",
        "2 rkl sokeria",
        "1 tl suolaa",
        "4 noriarkkia",
        "avokadoa ja kurkkua suikaleina",
        "200 g kypsennettyä lohta tai muuta turvallista täytettä",
        "soijakastiketta ja pikkelöityä inkivääriä"
      ],
      "steps": [
        "Huuhtele riisiä, kunnes vesi on lähes kirkasta, ja valuta ennen keittämistä.",
        "Keitä riisi pakkauksen ohjeen mukaan ja anna sen levätä kannen alla.",
        "Liuota sokeri ja suola riisiviinietikkaan ja kääntele seos varovasti lämpimään riisiin.",
        "Levitä ohut kerros riisiä norille, aseta täyte riviin ja rullaa napakasti bambumaton tai leivinpaperin avulla.",
        "Anna rullien levätä pari minuuttia ja leikkaa kostutetulla, terävällä veitsellä."
      ]
    },
    "variants": [
      "Nigiri: käsin muotoiltu riisi, jonka päällä on päällyste.",
      "Maki: riisi ja täyte rullattu norin sisään.",
      "Chirashi: kulhossa tarjoiltu sushiriisi, jonka päälle on jaettu täytteitä.",
      "Temaki: käsin kartioksi rullattu nori."
    ],
    "serving": [
      "Sushi on parhaimmillaan, kun riisi ei ole jääkaappikylmää.",
      "Soijakastiketta käytetään mausteena, ei kylpynä; herkille suupaloille riittää pieni määrä."
    ],
    "commonMistakes": [
      "Liian märkä riisi, josta tulee puuromaista.",
      "Liikaa riisiä makirullassa.",
      "Riisin puristaminen liian tiiviiksi, jolloin rakenne katoaa."
    ]
  },
  "is": {
    "overview": "Sushi snýst fyrst og fremst um hrísgrjónin. Kryddað sushi-hrísgrjón eru grunnur nigiri, maki, chirashi og margra annarra gerða, en hrár fiskur er aðeins ein af mörgum mögulegum fyllingum og áleggstegundum.",
    "history": "Sushi á sér langar sögulegar rætur í varðveislu fisks með gerjuðum hrísgrjónum, en nútíma Edomae-sushi þróaðist í Edo, Tókýó nútímans, sem fljótleg framreiðsla með ferskara hráefni. Sushi í dag spannar bæði mjög hefðbundna og nútímalega stíla.",
    "flavor": "Gott sushi vegur milda sýru og sætu hrísgrjónanna á móti seltu, umami og sérkennum hráefnisins. Hitastig og áferð eru jafn mikilvæg og bragð.",
    "technique": "Hrísgrjónin eru skoluð, soðin nákvæmlega og blönduð edikblöndu án þess að merja þau. Nigiri er mótað létt; það á að halda saman án þess að vera þétt.",
    "essentials": [
      "Stuttkorna japönsk hrísgrjón með hæfilegri viðloðun.",
      "Hrísgrjónaedik, sykur og salt sem blandað er saman við meðan grjónin eru heit.",
      "Fiskur, sjávarfang, egg eða grænmeti eftir stíl.",
      "Nori, wasabi, sojasósa og skraut eru notuð í hófi."
    ],
    "recipe": {
      "label": "Einfalt maki heima",
      "yield": "4 rúllur",
      "time": "u.þ.b. 50 mín.",
      "ingredients": [
        "300 g sushi-hrísgrjón",
        "3,5 dl vatn",
        "4 msk. hrísgrjónaedik",
        "2 msk. sykur",
        "1 tsk. salt",
        "4 nori-blöð",
        "avókadó og gúrka í stöngum",
        "200 g eldaður lax eða annað öruggt álegg",
        "sojasósa og súrsað engifer"
      ],
      "steps": [
        "Skolið hrísgrjónin þar til vatnið er næstum tært og látið renna af þeim fyrir suðu.",
        "Sjóðið hrísgrjónin samkvæmt leiðbeiningum á umbúðum og látið þau hvíla undir loki.",
        "Leysið sykur og salt upp í hrísgrjónaedikinu og blandið varlega saman við heit grjónin.",
        "Dreifið þunnu lagi af hrísgrjónum á nori, leggið fyllinguna í röð og rúllið þétt með bambusmottu eða bökunarpappír.",
        "Látið rúllurnar hvíla í nokkrar mínútur og skerið með rökum, beittum hníf."
      ]
    },
    "variants": [
      "Nigiri: handmótuð hrísgrjón með áleggi ofan á.",
      "Maki: hrísgrjónum og fyllingu rúllað í nori.",
      "Chirashi: sushi-hrísgrjón í skál með áleggi dreift yfir.",
      "Temaki: nori handrúllað í keilu."
    ],
    "serving": [
      "Sushi er best þegar hrísgrjónin eru ekki ísskápsköld.",
      "Sojasósa er notuð sem krydd en ekki til að drekkja bitunum í; viðkvæmir bitar þurfa lítið."
    ],
    "commonMistakes": [
      "Of blaut hrísgrjón sem verða grautarkennd.",
      "Of mikil hrísgrjón í maki-rúllunni.",
      "Að þjappa hrísgrjónunum svo þétt að áferðin glatist."
    ]
  },
  "en": {
    "overview": "Sushi is primarily about the rice. Seasoned sushi rice forms the basis of nigiri, maki, chirashi and many other forms, while raw fish is only one of several possible toppings and fillings.",
    "history": "Sushi has long historical roots in preserving fish with fermented rice, but modern Edomae sushi developed in Edo, present-day Tokyo, as a quick way to serve fresher ingredients. Sushi today encompasses both very traditional and modern styles.",
    "flavor": "Good sushi balances the mild acidity and sweetness of the rice with salt, umami and the character of the ingredients. Temperature and texture are just as important as flavour.",
    "technique": "The rice is rinsed, cooked precisely and folded with the vinegar mixture without crushing it. Nigiri is shaped lightly; it should hold together without being compact.",
    "essentials": [
      "Short-grain Japanese rice with the right stickiness.",
      "Rice vinegar, sugar and salt folded in while the rice is warm.",
      "Fish, seafood, eggs or vegetables chosen according to the style.",
      "Nori, wasabi, soy sauce and garnishes used sparingly."
    ],
    "recipe": {
      "label": "Simple homemade maki",
      "yield": "4 rolls",
      "time": "approx. 50 min",
      "ingredients": [
        "300 g sushi rice",
        "3.5 dl water",
        "4 tbsp rice vinegar",
        "2 tbsp sugar",
        "1 tsp salt",
        "4 sheets of nori",
        "avocado and cucumber cut into sticks",
        "200 g cooked salmon or another safe topping",
        "soy sauce and pickled ginger"
      ],
      "steps": [
        "Rinse the rice until the water is almost clear and drain before cooking.",
        "Cook the rice according to the packet instructions and let it rest with the lid on.",
        "Dissolve the sugar and salt in the rice vinegar and gently fold the mixture into the warm rice.",
        "Spread a thin layer of rice over the nori, arrange the filling in a line and roll firmly using a bamboo mat or baking paper.",
        "Let the rolls rest for a couple of minutes and slice with a damp, sharp knife."
      ]
    },
    "variants": [
      "Nigiri: hand-shaped rice with a topping.",
      "Maki: rice and filling rolled in nori.",
      "Chirashi: sushi rice served in a bowl with toppings scattered over it.",
      "Temaki: hand-rolled nori shaped into a cone."
    ],
    "serving": [
      "Sushi is best when the rice is not fridge-cold.",
      "Soy sauce is used as seasoning, not as a bath; delicate pieces need little."
    ],
    "commonMistakes": [
      "Rice that is too wet and becomes mushy.",
      "Too much rice in the maki roll.",
      "Compressing the rice too tightly so that its texture is lost."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
