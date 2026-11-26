import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const phoTranslations = {
  "nn": {
    "overview": "Phở er ein rett der krafta står i sentrum. Den klare suppa blir bygd opp med rista aromatiske ingrediensar og varme krydder, medan risnudlar og kjøt blir tillaga slik at skåla held på både friskheit og rein smak.",
    "history": "Phở er særleg knytt til Nord-Vietnam og utvikla seg tidleg på 1900-talet før ulike regionale stilar voks fram. Nordlege variantar har ofte meir varsamt garnityr, medan sørlege serveringar kan ha eit større utval urter og tilbehøyr.",
    "flavor": "Aromatisk, lett søtleg og umamirik med duft av stjerneanis, kanel og rista lauk. Friske urter, lime og chili blir tilsette etter smak.",
    "technique": "Ei rein kraft krev varsam trekking og skumming. Krydder og aromatiske ingrediensar blir rista før dei får trekkje, og nudlane blir haldne separat fram til servering.",
    "essentials": [
      "Klar kraft av storfe eller kylling.",
      "Rista lauk og ingefær.",
      "Stjerneanis, kanel og andre varme krydder.",
      "Flate risnudlar, urter og friskt garnityr."
    ],
    "recipe": {
      "label": "Forenkla phở gà",
      "yield": "4 porsjonar",
      "time": "ca. 75 min",
      "ingredients": [
        "1,5 l god kyllingkraft",
        "400 g kyllinglår",
        "1 lauk, delt",
        "50 g ingefær",
        "2 stjerneanis",
        "1 lita kanelstong",
        "2 ss fiskesaus",
        "300 g flate risnudlar",
        "vårlauk og koriander",
        "lime og chili"
      ],
      "steps": [
        "Rist lauk og ingefær i tørr panne til snittflatene får mørke flekkar.",
        "Lat kraft, kylling, lauk, ingefær og krydder trekkje roleg til kyllingen er mør.",
        "Ta ut kyllingen, sil krafta og smak til med fiskesaus.",
        "Tillag risnudlane separat og fordel dei i varme skåler med kylling i skiver.",
        "Hell over kokande varm kraft og server med urter, lime og chili."
      ]
    },
    "variants": [
      "Phở bò med storfe.",
      "Phở gà med kylling.",
      "Nordleg stil med enklare garnityr og varsam sødme.",
      "Sørleg stil med fleire urter og spirer ved bordet."
    ],
    "serving": [
      "Urter og lime blir tilsette i små mengder undervegs.",
      "Krafta må vere svært varm når ho blir helt over i skåla."
    ],
    "commonMistakes": [
      "Å fosskoke krafta og gjere henne uklar.",
      "Å la krydder dominere slik at suppa blir tung.",
      "Å la ferdigkokte risnudlar stå lenge og klebe saman."
    ]
  },
  "sv": {
    "overview": "Phở är en rätt där buljongen står i centrum. Den klara soppan byggs upp med rostade aromatiska ingredienser och värmande kryddor, medan risnudlar och kött tillagas så att skålen behåller både friskhet och ren smak.",
    "history": "Phở förknippas särskilt med norra Vietnam och utvecklades tidigt under 1900-talet innan olika regionala stilar växte fram. Nordliga varianter har ofta mer återhållsam garnering, medan sydliga serveringar kan ha ett större urval örter och tillbehör.",
    "flavor": "Aromatisk, lätt söt och umamirik med doft av stjärnanis, kanel och rostad lök. Färska örter, lime och chili tillsätts efter smak.",
    "technique": "En klar buljong kräver varsam sjudning och skumning. Kryddor och aromatiska ingredienser rostas innan de får dra, och nudlarna hålls separata fram till servering.",
    "essentials": [
      "Klar buljong av nötkött eller kyckling.",
      "Rostad lök och ingefära.",
      "Stjärnanis, kanel och andra värmande kryddor.",
      "Platta risnudlar, örter och färsk garnering."
    ],
    "recipe": {
      "label": "Förenklad phở gà",
      "yield": "4 portioner",
      "time": "ca 75 min",
      "ingredients": [
        "1,5 l god kycklingbuljong",
        "400 g kycklinglår",
        "1 lök, delad",
        "50 g ingefära",
        "2 stjärnanis",
        "1 liten kanelstång",
        "2 msk fisksås",
        "300 g platta risnudlar",
        "salladslök och koriander",
        "lime och chili"
      ],
      "steps": [
        "Rosta lök och ingefära i torr panna tills snittytorna får mörka fläckar.",
        "Låt buljong, kyckling, lök, ingefära och kryddor sjuda försiktigt tills kycklingen är mör.",
        "Ta upp kycklingen, sila buljongen och smaka av med fisksås.",
        "Tillaga risnudlarna separat och fördela dem i varma skålar med skivad kyckling.",
        "Häll över kokhet buljong och servera med örter, lime och chili."
      ]
    },
    "variants": [
      "Phở bò med nötkött.",
      "Phở gà med kyckling.",
      "Nordlig stil med enklare garnering och återhållsam sötma.",
      "Sydlig stil med fler örter och groddar vid bordet."
    ],
    "serving": [
      "Örter och lime tillsätts i små mängder under måltiden.",
      "Buljongen måste vara mycket varm när den hälls i skålen."
    ],
    "commonMistakes": [
      "Att stormkoka buljongen så att den blir grumlig.",
      "Att låta kryddorna dominera så att soppan blir tung.",
      "Att låta färdigkokta risnudlar stå länge och klibba ihop."
    ]
  },
  "da": {
    "overview": "Phở er en ret, hvor bouillonen er i centrum. Den klare suppe bygges op med ristede aromatiske ingredienser og varmende krydderier, mens risnudler og kød tilberedes, så skålen bevarer både friskhed og ren smag.",
    "history": "Phở forbindes især med Nordvietnam og udviklede sig tidligt i 1900-tallet, før forskellige regionale stilarter voksede frem. Nordlige varianter har ofte mere afdæmpet pynt, mens sydlige serveringer kan have et større udvalg af urter og tilbehør.",
    "flavor": "Aromatisk, let sødlig og umamierig med duft af stjerneanis, kanel og ristede løg. Friske urter, lime og chili tilsættes efter smag.",
    "technique": "En klar bouillon kræver skånsom simring og afskumning. Krydderier og aromatiske ingredienser ristes, før de trækker, og nudlerne holdes separat indtil servering.",
    "essentials": [
      "Klar bouillon af oksekød eller kylling.",
      "Ristede løg og ingefær.",
      "Stjerneanis, kanel og andre varmende krydderier.",
      "Flade risnudler, urter og frisk pynt."
    ],
    "recipe": {
      "label": "Forenklet phở gà",
      "yield": "4 portioner",
      "time": "ca. 75 min",
      "ingredients": [
        "1,5 l god kyllingebouillon",
        "400 g kyllingelår",
        "1 løg, delt",
        "50 g ingefær",
        "2 stjerneanis",
        "1 lille kanelstang",
        "2 spsk fiskesauce",
        "300 g flade risnudler",
        "forårsløg og koriander",
        "lime og chili"
      ],
      "steps": [
        "Rist løg og ingefær på en tør pande, til snitfladerne får mørke pletter.",
        "Lad bouillon, kylling, løg, ingefær og krydderier simre roligt, til kyllingen er mør.",
        "Tag kyllingen op, si bouillonen, og smag til med fiskesauce.",
        "Tilbered risnudlerne separat, og fordel dem i varme skåle med kylling i skiver.",
        "Hæld kogende varm bouillon over, og servér med urter, lime og chili."
      ]
    },
    "variants": [
      "Phở bò med oksekød.",
      "Phở gà med kylling.",
      "Nordlig stil med enklere pynt og afdæmpet sødme.",
      "Sydlig stil med flere urter og spirer ved bordet."
    ],
    "serving": [
      "Urter og lime tilsættes i små mængder under måltidet.",
      "Bouillonen skal være meget varm, når den hældes i skålen."
    ],
    "commonMistakes": [
      "At bulderkoge bouillonen og gøre den uklar.",
      "At lade krydderierne dominere, så suppen bliver tung.",
      "At lade færdigkogte risnudler stå længe og klistre sammen."
    ]
  },
  "fi": {
    "overview": "Phở on liemikeskeinen ruokalaji. Kirkas liemi rakentuu paahdetuista aromaattisista aineksista ja lämmittävistä mausteista, ja riisinuudelit sekä liha valmistetaan niin, että annos säilyttää raikkautensa ja puhtaan makunsa.",
    "history": "Phở yhdistetään erityisesti Pohjois-Vietnamiin, ja se kehittyi 1900-luvun alussa ennen alueellisten tyylien syntymistä. Pohjoisissa muunnelmissa lisukkeet ovat usein hillitympiä, kun taas etelässä tarjolla voi olla enemmän yrttejä ja lisukkeita.",
    "flavor": "Aromaattinen, hieman makea ja umamipitoinen, tähtianiksen, kanelin ja paahdetun sipulin tuoksuinen. Tuoreita yrttejä, limeä ja chiliä lisätään maun mukaan.",
    "technique": "Kirkas liemi edellyttää hellävaraista hauduttamista ja vaahdon kuorimista. Mausteet ja aromaattiset ainekset paahdetaan ennen hauduttamista, ja nuudelit pidetään erillään tarjoiluun asti.",
    "essentials": [
      "Kirkasta naudanliha- tai kanalientä.",
      "Paahdettua sipulia ja inkivääriä.",
      "Tähtianista, kanelia ja muita lämmittäviä mausteita.",
      "Litteitä riisinuudeleita, yrttejä ja raikkaita lisukkeita."
    ],
    "recipe": {
      "label": "Yksinkertaistettu phở gà",
      "yield": "4 annosta",
      "time": "n. 75 min",
      "ingredients": [
        "1,5 l hyvää kanalientä",
        "400 g kanan reisilihaa",
        "1 sipuli, halkaistuna",
        "50 g inkivääriä",
        "2 tähtianista",
        "1 pieni kanelitanko",
        "2 rkl kalakastiketta",
        "300 g litteitä riisinuudeleita",
        "kevätsipulia ja korianteria",
        "limeä ja chiliä"
      ],
      "steps": [
        "Paahda sipulia ja inkivääriä kuivalla pannulla, kunnes leikkauspinnoille tulee tummia laikkuja.",
        "Hauduta lientä, kanaa, sipulia, inkivääriä ja mausteita hiljalleen, kunnes kana on mureaa.",
        "Nosta kana pois, siivilöi liemi ja mausta kalakastikkeella.",
        "Valmista riisinuudelit erikseen ja jaa ne lämpimiin kulhoihin viipaloidun kanan kanssa.",
        "Kaada päälle kiehuvan kuuma liemi ja tarjoile yrttien, limen ja chilin kanssa."
      ]
    },
    "variants": [
      "Phở bò naudanlihalla.",
      "Phở gà kanalla.",
      "Pohjoinen tyyli, jossa on yksinkertaisemmat lisukkeet ja hillitty makeus.",
      "Eteläinen tyyli, jossa pöydässä on enemmän yrttejä ja ituja."
    ],
    "serving": [
      "Yrttejä ja limeä lisätään vähitellen ruokailun aikana.",
      "Liemen on oltava erittäin kuumaa, kun se kaadetaan kulhoon."
    ],
    "commonMistakes": [
      "Liemen voimakas keittäminen, jolloin se samenee.",
      "Mausteiden liiallinen korostuminen, jolloin keitosta tulee raskas.",
      "Kypsien riisinuudeleiden seisottaminen pitkään, jolloin ne tarttuvat yhteen."
    ]
  },
  "is": {
    "overview": "Phở er réttur þar sem soðið er í aðalhlutverki. Tæra súpan byggist á ristuðu, ilmandi hráefni og hlýjum kryddum, en hrísgrjónanúðlur og kjöt eru elduð þannig að skálin haldi ferskleika og hreinu bragði.",
    "history": "Phở tengist einkum Norður-Víetnam og þróaðist snemma á 20. öld áður en ólíkir svæðisbundnir stílar urðu til. Norðlægar útgáfur hafa oft hófstilltara meðlæti en í suðri er gjarnan meira úrval kryddjurta og meðlætis.",
    "flavor": "Ilmandi, örlítið sætt og umamíríkt með ilm af stjörnuanís, kanil og ristuðum lauk. Ferskum kryddjurtum, límónu og chili er bætt við eftir smekk.",
    "technique": "Tært soð krefst hægrar suðu og þess að froða sé fleytt ofan af. Krydd og ilmandi hráefni eru ristuð áður en þau eru látin liggja í soðinu, og núðlunum er haldið aðskildum fram að framreiðslu.",
    "essentials": [
      "Tært nauta- eða kjúklingasoð.",
      "Ristaður laukur og engifer.",
      "Stjörnuanís, kanill og önnur hlý krydd.",
      "Flatar hrísgrjónanúðlur, kryddjurtir og ferskt meðlæti."
    ],
    "recipe": {
      "label": "Einfölduð phở gà",
      "yield": "4 skammtar",
      "time": "u.þ.b. 75 mín.",
      "ingredients": [
        "1,5 l gott kjúklingasoð",
        "400 g kjúklingalæri",
        "1 laukur, skorinn í tvennt",
        "50 g engifer",
        "2 stjörnuanís",
        "1 lítil kanilstöng",
        "2 msk. fiskisósa",
        "300 g flatar hrísgrjónanúðlur",
        "vorlaukur og kóríander",
        "límóna og chili"
      ],
      "steps": [
        "Ristið lauk og engifer á þurri pönnu þar til dökkir blettir myndast á skurðflötunum.",
        "Látið soð, kjúkling, lauk, engifer og krydd malla rólega þar til kjúklingurinn er meyr.",
        "Takið kjúklinginn upp, síið soðið og smakkið til með fiskisósu.",
        "Eldið hrísgrjónanúðlurnar sérstaklega og skiptið þeim í heitar skálar með kjúklingi í sneiðum.",
        "Hellið sjóðheitu soði yfir og berið fram með kryddjurtum, límónu og chili."
      ]
    },
    "variants": [
      "Phở bò með nautakjöti.",
      "Phở gà með kjúklingi.",
      "Norðlægur stíll með einfaldara meðlæti og hóflegri sætu.",
      "Suðlægur stíll með fleiri kryddjurtum og spírum á borðinu."
    ],
    "serving": [
      "Kryddjurtum og límónu er bætt við í litlu magni meðan borðað er.",
      "Soðið þarf að vera mjög heitt þegar því er hellt í skálina."
    ],
    "commonMistakes": [
      "Að láta soðið bullsjóða svo það verði gruggugt.",
      "Að láta kryddin yfirgnæfa bragðið svo súpan verði þung.",
      "Að láta soðnar hrísgrjónanúðlur standa lengi og límast saman."
    ]
  },
  "en": {
    "overview": "Phở is a broth-led dish. The clear soup is built with toasted aromatics and warming spices, while the rice noodles and meat are prepared to preserve both freshness and clean flavours in the bowl.",
    "history": "Phở is particularly associated with northern Vietnam and developed in the early twentieth century before distinct regional styles emerged. Northern versions often have more restrained garnishes, while southern servings may feature a wider selection of herbs and accompaniments.",
    "flavor": "Aromatic, slightly sweet and rich in umami, with the fragrance of star anise, cinnamon and toasted onion. Fresh herbs, lime and chilli are added to taste.",
    "technique": "A clear broth requires gentle simmering and skimming. Spices and aromatics are toasted before steeping, and the noodles are kept separate until serving.",
    "essentials": [
      "Clear beef or chicken stock.",
      "Toasted onion and ginger.",
      "Star anise, cinnamon and other warming spices.",
      "Flat rice noodles, herbs and fresh garnishes."
    ],
    "recipe": {
      "label": "Simplified phở gà",
      "yield": "4 servings",
      "time": "approx. 75 min",
      "ingredients": [
        "1.5 l good chicken stock",
        "400 g chicken thighs",
        "1 onion, halved",
        "50 g ginger",
        "2 star anise",
        "1 small cinnamon stick",
        "2 tbsp fish sauce",
        "300 g flat rice noodles",
        "spring onions and coriander",
        "lime and chilli"
      ],
      "steps": [
        "Toast the onion and ginger in a dry pan until the cut surfaces develop dark spots.",
        "Gently simmer the stock, chicken, onion, ginger and spices until the chicken is tender.",
        "Remove the chicken, strain the broth and season with fish sauce.",
        "Prepare the rice noodles separately and divide them between warm bowls with sliced chicken.",
        "Pour over boiling-hot broth and serve with herbs, lime and chilli."
      ]
    },
    "variants": [
      "Phở bò with beef.",
      "Phở gà with chicken.",
      "Northern style with simpler garnishes and restrained sweetness.",
      "Southern style with more herbs and sprouts at the table."
    ],
    "serving": [
      "Add herbs and lime in small amounts as you eat.",
      "The broth must be very hot when poured into the bowl."
    ],
    "commonMistakes": [
      "Boiling the broth vigorously and making it cloudy.",
      "Allowing the spices to dominate, making the soup heavy.",
      "Leaving cooked rice noodles standing for too long so that they stick together."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
