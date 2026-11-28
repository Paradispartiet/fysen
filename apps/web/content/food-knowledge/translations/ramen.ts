import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";

type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const ramenTranslations = {
  "nn": {
    "overview": "Ramen er ein familie av nudelsupper, ikkje éi oppskrift. Ei god skål handlar om balansen mellom fylden i krafta, det salte og umamirike konsentratet i tare, tyggjemotstanden i nudlane og ei aromatisk olje som bind saman duft og smak.",
    "history": "Ramen utvikla seg i Japan med tydeleg påverknad frå kinesiske kveitenudlar. Gjennom 1900-talet voks lokale stilar fram over heile landet, og namnet rommar i dag alt frå klare shoyu- og shio-supper til kraftige tonkotsu- og misovariantar.",
    "flavor": "Smaken kan vere lett og salt, djup og fermentert eller svært fyldig. Felles er eit tydeleg umamilag og kontrasten mellom varm suppe, spenstige nudlar og topping.",
    "technique": "Tenk i komponentar: lag kraft, tare og aromatisk olje kvar for seg og juster dei i skåla. Nudlane blir kokte heilt til slutt og skal ikkje stå og trekkje i suppa før servering.",
    "essentials": [
      "Kraft av kylling, svin, sjømat, sopp eller grønsaker.",
      "Tare – konsentrert smaksbase med soyasaus, miso eller salt som utgangspunkt.",
      "Alkaliske kveitenudlar med tydeleg spenst.",
      "Aromatisk olje og topping som egg, vårlauk, nori, sopp eller kjøt."
    ],
    "recipe": {
      "label": "Shoyu-inspirert heimevariant",
      "yield": "4 porsjonar",
      "time": "ca. 60 min",
      "ingredients": [
        "1,5 l kylling- eller grønsakskraft",
        "30 g ingefær, i skiver",
        "4 kvitlauksfedd, lett knuste",
        "150 g shiitake eller annan sopp",
        "5 ss soyasaus",
        "1 ss riseddik",
        "1 ts sesamolje",
        "400 g ramen- eller kveitenudlar",
        "4 egg, valfritt",
        "vårlauk, nori og ønskt topping"
      ],
      "steps": [
        "Lat kraft, ingefær, kvitlauk og sopp trekkje roleg i 25–30 minutt.",
        "Bland soyasaus, riseddik og sesamolje og fordel dette som enkel tare i fire skåler.",
        "Førebu topping og kok eventuelle egg 6–7 minutt før dei blir raskt avkjølte.",
        "Kok nudlane separat rett før servering og lat dei renne godt av.",
        "Hell varm kraft over tare, legg i nudlar og topping og smak til før du eventuelt saltar meir."
      ]
    },
    "variants": [
      "Shoyu: soyasausprega tare og ofte klarare kraft.",
      "Miso: fyldigare, fermentert karakter og ofte meir fylde.",
      "Tonkotsu: emulgert svinekraft med svært rik munnkjensle.",
      "Shio: saltbasert tare med lett og presist uttrykk."
    ],
    "serving": [
      "Blir servert rykande varm og eten med ein gong nudlane kjem i suppa.",
      "Toppingane bør gje kontrast – til dømes eit mjukt egg, frisk vårlauk og sprø nori."
    ],
    "commonMistakes": [
      "Å koke nudlane i sjølve krafta og gjere suppa stivelsesrik.",
      "Å salte krafta fullt ut før tare blir tilsett.",
      "Å lesse for mykje topping i skåla slik at suppa mistar balansen."
    ]
  },
  "sv": {
    "overview": "Ramen är en familj av nudelsoppor, inte ett enda recept. En bra skål bygger på balansen mellan buljongens fyllighet, tarens salta och umamirika koncentrat, nudlarnas tuggmotstånd och en aromatisk olja som förenar doft och smak.",
    "history": "Ramen utvecklades i Japan med tydlig påverkan från kinesiska vetenudlar. Under 1900-talet växte lokala stilar fram över hela landet, och namnet omfattar i dag allt från klara shoyu- och shiosoppor till kraftiga tonkotsu- och misovarianter.",
    "flavor": "Smaken kan vara lätt och salt, djup och fermenterad eller mycket fyllig. Gemensamt är ett tydligt lager av umami och kontrasten mellan varm soppa, spänstiga nudlar och topping.",
    "technique": "Tänk i komponenter: gör buljong, tare och aromatisk olja separat och justera dem i skålen. Nudlarna kokas allra sist och ska inte ligga och dra i soppan före servering.",
    "essentials": [
      "Buljong av kyckling, fläsk, skaldjur, svamp eller grönsaker.",
      "Tare – koncentrerad smakbas med sojasås, miso eller salt som utgångspunkt.",
      "Alkaliska vetenudlar med tydlig spänst.",
      "Aromatisk olja och topping som ägg, salladslök, nori, svamp eller kött."
    ],
    "recipe": {
      "label": "Shoyu-inspirerad hemmavariant",
      "yield": "4 portioner",
      "time": "ca 60 min",
      "ingredients": [
        "1,5 l kyckling- eller grönsaksbuljong",
        "30 g ingefära, skivad",
        "4 vitlöksklyftor, lätt krossade",
        "150 g shiitake eller annan svamp",
        "5 msk sojasås",
        "1 msk risvinäger",
        "1 tsk sesamolja",
        "400 g ramen- eller vetenudlar",
        "4 ägg, valfritt",
        "salladslök, nori och önskad topping"
      ],
      "steps": [
        "Låt buljong, ingefära, vitlök och svamp sjuda försiktigt i 25–30 minuter.",
        "Blanda sojasås, risvinäger och sesamolja och fördela blandningen som enkel tare i fyra skålar.",
        "Förbered toppingen och koka eventuella ägg i 6–7 minuter innan de kyls snabbt.",
        "Koka nudlarna separat precis före servering och låt dem rinna av ordentligt.",
        "Häll varm buljong över tare, lägg i nudlar och topping och smaka av innan du eventuellt saltar mer."
      ]
    },
    "variants": [
      "Shoyu: tare med sojasåskaraktär och ofta klarare buljong.",
      "Miso: fylligare, fermenterad karaktär och ofta mer kropp.",
      "Tonkotsu: emulgerad fläskbuljong med mycket rik munkänsla.",
      "Shio: saltbaserad tare med lätt och precis karaktär."
    ],
    "serving": [
      "Serveras rykande varm och äts så snart nudlarna hamnat i soppan.",
      "Toppingen bör ge kontrast – exempelvis ett mjukt ägg, färsk salladslök och krispig nori."
    ],
    "commonMistakes": [
      "Att koka nudlarna i själva buljongen och göra soppan stärkelserik.",
      "Att salta buljongen fullt ut innan tare tillsätts.",
      "Att överlasta skålen med topping så att soppan förlorar balansen."
    ]
  },
  "da": {
    "overview": "Ramen er en familie af nudelsupper, ikke én opskrift. En god skål handler om balancen mellem bouillonens fylde, tarens salte og umamirige koncentrat, nudlernes bid og en aromatisk olie, der binder duft og smag sammen.",
    "history": "Ramen udviklede sig i Japan med tydelig påvirkning fra kinesiske hvedenudler. Gennem 1900-tallet opstod lokale stilarter over hele landet, og navnet dækker i dag alt fra klare shoyu- og shiosupper til kraftige tonkotsu- og misovarianter.",
    "flavor": "Smagen kan være let og salt, dyb og fermenteret eller meget fyldig. Fælles er et tydeligt lag af umami og kontrasten mellem varm suppe, spændstige nudler og topping.",
    "technique": "Tænk i komponenter: lav bouillon, tare og aromatisk olie hver for sig, og justér dem i skålen. Nudlerne koges til sidst og må ikke stå og trække i suppen inden servering.",
    "essentials": [
      "Bouillon af kylling, svin, fisk og skaldyr, svampe eller grøntsager.",
      "Tare – koncentreret smagsbase med sojasauce, miso eller salt som udgangspunkt.",
      "Alkaliske hvedenudler med tydelig spændstighed.",
      "Aromatisk olie og topping som æg, forårsløg, nori, svampe eller kød."
    ],
    "recipe": {
      "label": "Shoyu-inspireret hjemmevariant",
      "yield": "4 portioner",
      "time": "ca. 60 min",
      "ingredients": [
        "1,5 l kyllinge- eller grøntsagsbouillon",
        "30 g ingefær, i skiver",
        "4 fed hvidløg, let knuste",
        "150 g shiitake eller andre svampe",
        "5 spsk sojasauce",
        "1 spsk riseddike",
        "1 tsk sesamolie",
        "400 g ramen- eller hvedenudler",
        "4 æg, valgfrit",
        "forårsløg, nori og ønsket topping"
      ],
      "steps": [
        "Lad bouillon, ingefær, hvidløg og svampe simre roligt i 25–30 minutter.",
        "Bland sojasauce, riseddike og sesamolie, og fordel blandingen som enkel tare i fire skåle.",
        "Forbered topping, og kog eventuelle æg i 6–7 minutter, inden de køles hurtigt ned.",
        "Kog nudlerne separat lige før servering, og lad dem dryppe godt af.",
        "Hæld varm bouillon over tare, tilsæt nudler og topping, og smag til, før du eventuelt salter mere."
      ]
    },
    "variants": [
      "Shoyu: tare præget af sojasauce og ofte klarere bouillon.",
      "Miso: fyldigere, fermenteret karakter og ofte mere fylde.",
      "Tonkotsu: emulgeret svinebouillon med meget fyldig mundfornemmelse.",
      "Shio: saltbaseret tare med et let og præcist udtryk."
    ],
    "serving": [
      "Serveres rygende varm og spises, så snart nudlerne kommer i suppen.",
      "Toppingerne bør give kontrast – eksempelvis et blødt æg, friske forårsløg og sprød nori."
    ],
    "commonMistakes": [
      "At koge nudlerne i selve bouillonen og gøre suppen stivelsesrig.",
      "At salte bouillonen fuldt ud, før tare tilsættes.",
      "At overfylde skålen med topping, så suppen mister balancen."
    ]
  },
  "fi": {
    "overview": "Ramen on nuudelikeittojen perhe, ei yksi resepti. Hyvässä kulhossa liemen täyteläisyys, tare-maustetiivisteen suolaisuus ja umami, nuudelien purutuntuma sekä tuoksuja ja makuja yhdistävä aromaattinen öljy ovat tasapainossa.",
    "history": "Ramen kehittyi Japanissa kiinalaisten vehnänuudeleiden vaikutuksesta. Paikallisia tyylejä syntyi eri puolille maata 1900-luvun aikana, ja nykyään nimi kattaa kaiken kirkkaista shoyu- ja shio-keitoista täyteläisiin tonkotsu- ja misoversioihin.",
    "flavor": "Maku voi olla kevyt ja suolainen, syvä ja fermentoitunut tai hyvin täyteläinen. Yhteisiä piirteitä ovat selvä umamin maku sekä kuuman keiton, kimmoisien nuudeleiden ja täytteiden välinen kontrasti.",
    "technique": "Valmista liemi, tare ja aromaattinen öljy erikseen ja säädä niiden suhteet kulhossa. Keitä nuudelit aivan viimeiseksi, äläkä anna niiden seistä keitossa ennen tarjoilua.",
    "essentials": [
      "Kana-, sianliha-, merenelävä-, sieni- tai kasvisliemi.",
      "Tare – tiivistetty maustepohja, jonka lähtökohtana on soijakastike, miso tai suola.",
      "Emäksiset, kimmoisat vehnänuudelit.",
      "Aromaattinen öljy ja täytteet, kuten kananmuna, kevätsipuli, nori, sienet tai liha."
    ],
    "recipe": {
      "label": "Shoyu-tyylinen kotiversio",
      "yield": "4 annosta",
      "time": "n. 60 min",
      "ingredients": [
        "1,5 l kana- tai kasvislientä",
        "30 g inkivääriä viipaleina",
        "4 valkosipulinkynttä kevyesti murskattuina",
        "150 g siitakesieniä tai muita sieniä",
        "5 rkl soijakastiketta",
        "1 rkl riisiviinietikkaa",
        "1 tl seesamiöljyä",
        "400 g ramen- tai vehnänuudeleita",
        "4 kananmunaa, halutessasi",
        "kevätsipulia, noria ja haluamiasi täytteitä"
      ],
      "steps": [
        "Anna liemen, inkiväärin, valkosipulin ja sienten hautua hiljalleen 25–30 minuuttia.",
        "Sekoita soijakastike, riisiviinietikka ja seesamiöljy ja jaa seos yksinkertaiseksi tareksi neljään kulhoon.",
        "Valmistele täytteet ja keitä halutessasi kananmunat 6–7 minuuttia, minkä jälkeen jäähdytä ne nopeasti.",
        "Keitä nuudelit erikseen juuri ennen tarjoilua ja valuta ne huolellisesti.",
        "Kaada kuuma liemi taren päälle, lisää nuudelit ja täytteet ja maista ennen kuin lisäät tarvittaessa suolaa."
      ]
    },
    "variants": [
      "Shoyu: soijakastikepainotteinen tare ja usein kirkkaampi liemi.",
      "Miso: täyteläisempi, fermentoitunut luonne ja usein runsaampi suutuntuma.",
      "Tonkotsu: emulgoitu sianlihaliemi, jossa on hyvin täyteläinen suutuntuma.",
      "Shio: suolapohjainen tare, jonka maku on kevyt ja selkeä."
    ],
    "serving": [
      "Tarjoillaan höyryävän kuumana ja syödään heti, kun nuudelit on lisätty keittoon.",
      "Täytteiden tulisi tarjota vastakohtia – esimerkiksi pehmeä kananmuna, tuore kevätsipuli ja rapea nori."
    ],
    "commonMistakes": [
      "Nuudeleiden keittäminen itse liemessä, jolloin keitosta tulee tärkkelyspitoinen.",
      "Liemen suolaaminen lopulliseen vahvuuteen ennen taren lisäämistä.",
      "Liian monen täytteen kasaaminen kulhoon niin, että keiton tasapaino katoaa."
    ]
  },
  "is": {
    "overview": "Ramen er fjölskylda núðlusúpna, ekki ein uppskrift. Góð skál byggist á jafnvægi milli fyllingar soðsins, salts og umamíríks tare-kryddgrunns, bits núðlanna og ilmandi olíu sem tengir saman ilm og bragð.",
    "history": "Ramen þróaðist í Japan undir greinilegum áhrifum kínverskra hveitinúðla. Á 1900-öldinni urðu til staðbundnir stílar um allt land og í dag nær heitið yfir allt frá tærum shoyu- og shio-súpum til kraftmikilla tonkotsu- og miso-afbrigða.",
    "flavor": "Bragðið getur verið létt og salt, djúpt og gerjað eða mjög fyllt. Sameiginleg einkenni eru greinilegt umamíbragð og andstæður heitrar súpu, stinnra núðla og áleggs.",
    "technique": "Vinnið með aðskilda þætti: útbúið soð, tare og ilmandi olíu hvert í sínu lagi og stillið hlutföllin í skálinni. Sjóðið núðlurnar alveg í lokin og látið þær ekki liggja í súpunni fyrir framreiðslu.",
    "essentials": [
      "Soð úr kjúklingi, svínakjöti, sjávarfangi, sveppum eða grænmeti.",
      "Tare – þéttur bragðgrunnur úr sojasósu, miso eða salti.",
      "Basískar hveitinúðlur með greinilegu biti.",
      "Ilmandi olía og álegg á borð við egg, vorlauk, nori, sveppi eða kjöt."
    ],
    "recipe": {
      "label": "Shoyu-innblásin heimaútgáfa",
      "yield": "4 skammtar",
      "time": "u.þ.b. 60 mín.",
      "ingredients": [
        "1,5 l kjúklinga- eða grænmetissoð",
        "30 g engifer, í sneiðum",
        "4 hvítlauksrif, lítillega marin",
        "150 g shiitake eða aðrir sveppir",
        "5 msk. sojasósa",
        "1 msk. hrísgrjónaedik",
        "1 tsk. sesamolía",
        "400 g ramen- eða hveitinúðlur",
        "4 egg, valfrjálst",
        "vorlaukur, nori og álegg að eigin vali"
      ],
      "steps": [
        "Látið soð, engifer, hvítlauk og sveppi malla rólega í 25–30 mínútur.",
        "Blandið sojasósu, hrísgrjónaediki og sesamolíu saman og skiptið blöndunni sem einföldum tare-grunni í fjórar skálar.",
        "Undirbúið áleggið og sjóðið eggin, ef þau eru notuð, í 6–7 mínútur áður en þau eru kæld hratt.",
        "Sjóðið núðlurnar sérstaklega rétt fyrir framreiðslu og látið renna vel af þeim.",
        "Hellið heitu soði yfir tare, bætið núðlum og áleggi við og smakkið til áður en meira salti er hugsanlega bætt við."
      ]
    },
    "variants": [
      "Shoyu: tare með áberandi sojasósubragði og oft tærara soði.",
      "Miso: fyllra, gerjað bragð og oft meiri fylling.",
      "Tonkotsu: þeytt svínasoð með mjög ríkulegri áferð í munni.",
      "Shio: tare-grunnur úr salti með léttu og skýru bragði."
    ],
    "serving": [
      "Borið fram rjúkandi heitt og borðað um leið og núðlurnar fara í súpuna.",
      "Áleggið ætti að skapa andstæður – til dæmis mjúkt egg, ferskur vorlaukur og stökkt nori."
    ],
    "commonMistakes": [
      "Að sjóða núðlurnar í soðinu sjálfu og gera súpuna sterkjuríka.",
      "Að fullsalta soðið áður en tare er bætt við.",
      "Að setja svo mikið álegg í skálina að jafnvægi súpunnar raskist."
    ]
  },
  "en": {
    "overview": "Ramen is a family of noodle soups, not a single recipe. A good bowl depends on the balance between the body of the broth, the salty, umami-rich tare concentrate, the chew of the noodles and an aromatic oil that brings fragrance and flavour together.",
    "history": "Ramen developed in Japan under clear influence from Chinese wheat noodles. Throughout the 1900s, local styles emerged across the country, and today the name covers everything from clear shoyu and shio soups to rich tonkotsu and miso variants.",
    "flavor": "The flavour can be light and salty, deep and fermented or very rich. Common to all is a distinct layer of umami and the contrast between hot soup, springy noodles and toppings.",
    "technique": "Think in components: prepare the broth, tare and aromatic oil separately and adjust them in the bowl. Cook the noodles right at the end; do not leave them sitting in the soup before serving.",
    "essentials": [
      "Broth made from chicken, pork, seafood, mushrooms or vegetables.",
      "Tare – a concentrated seasoning base made with soy sauce, miso or salt.",
      "Alkaline wheat noodles with a distinct springy texture.",
      "Aromatic oil and toppings such as eggs, spring onions, nori, mushrooms or meat."
    ],
    "recipe": {
      "label": "Shoyu-inspired home version",
      "yield": "4 servings",
      "time": "approx. 60 min",
      "ingredients": [
        "1.5 l chicken or vegetable stock",
        "30 g ginger, sliced",
        "4 garlic cloves, lightly crushed",
        "150 g shiitake or other mushrooms",
        "5 tbsp soy sauce",
        "1 tbsp rice vinegar",
        "1 tsp sesame oil",
        "400 g ramen or wheat noodles",
        "4 eggs, optional",
        "spring onions, nori and toppings of your choice"
      ],
      "steps": [
        "Gently simmer the stock, ginger, garlic and mushrooms for 25–30 minutes.",
        "Mix the soy sauce, rice vinegar and sesame oil and divide this simple tare between four bowls.",
        "Prepare the toppings and, if using eggs, boil them for 6–7 minutes before cooling them quickly.",
        "Cook the noodles separately just before serving and drain them well.",
        "Pour hot broth over the tare, add noodles and toppings, then taste before adding more salt if needed."
      ]
    },
    "variants": [
      "Shoyu: soy sauce-based tare and often a clearer broth.",
      "Miso: richer, fermented character and often more body.",
      "Tonkotsu: emulsified pork broth with a very rich mouthfeel.",
      "Shio: salt-based tare with a light, precise character."
    ],
    "serving": [
      "Serve piping hot and eat as soon as the noodles meet the soup.",
      "Toppings should provide contrast – for example, a soft egg, fresh spring onions and crisp nori."
    ],
    "commonMistakes": [
      "Cooking the noodles in the broth itself, making the soup starchy.",
      "Fully salting the broth before adding the tare.",
      "Overloading the bowl with toppings so the soup loses its balance."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
