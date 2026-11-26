import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";

type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const dalMakhaniTranslations = {
  "nn": {
    "overview": "Dal makhani er ei fyldig belgvekstgryte. Dei heile uradbønnene gjev den mørke fargen og ein kremete konsistens når dei blir kokte mjuke, medan dei raude bønnene gjev litt tyggjemotstand.",
    "history": "Dal makhani høyrer til det punjabiske kjøkkenet i Nord-India. Retten blir laga både heime og på restaurantar, der ein fyldig versjon med smør og fløyte er vanleg.",
    "flavor": "Uradbønnene smakar jordleg, tomaten gjev syre, og smør og fløyte dempar varmen frå chili og ingefær. Nokre restaurantvariantar har òg ein lett røyksmak.",
    "technique": "Kok dei bløytte uradbønnene heilt mjuke før dei blir blanda med den innkokte tomat- og krydderbasen. Mos nokre bønner mot grytekanten og lat blandinga småkoke til ho tjuknar.",
    "essentials": [
      "Heile svarte uradbønner (sabut urad dal).",
      "Raude kidneybønner (rajma).",
      "Tomat, ingefær, spisskummen og chili.",
      "Smør og fløyte gjev retten den karakteristiske fylden."
    ],
    "recipe": {
      "label": "Dal makhani med urad og rajma",
      "yield": "4 porsjonar",
      "time": "ca. 1 t 30 min + bløytlegging",
      "ingredients": [
        "160 g heile svarte uradbønner, bløytte over natta",
        "120 g kokte raude kidneybønner frå boks, avrente",
        "1 liten lauk, finhakka",
        "2 kvitlauksfedd og 2 cm ingefær, finrive",
        "250 g passerte tomatar",
        "1 ts spisskummenfrø, ½ ts chilipulver og ½ ts garam masala",
        "2 ss smør, ½ dl fløyte og salt"
      ],
      "steps": [
        "Skyl uradbønnene og kok dei i nytt vatn til dei er heilt mjuke. Ta vare på noko av kokevatnet.",
        "Varm smøret i ei gryte. Lat spisskummen frese kort, steik lauken mjuk og tilset kvitlauk og ingefær.",
        "Rør inn tomat og chili. Lat det koke inn til ein tjukk base.",
        "Tilset uradbønnene, kidneybønnene og litt kokevatn. Mos nokre av bønnene og lat gryta småkoke i 20–30 minutt. Rør innimellom.",
        "Rør inn garam masala og fløyte mot slutten, og smak til med salt."
      ]
    },
    "variants": [
      "Heimeversjonar med mindre fløyte.",
      "Fyldigare restaurantversjonar med ekstra smør eller mild røyksmak."
    ],
    "serving": [
      "Server varm med naan, roti eller ris.",
      "Litt fløyte eller frisk koriander kan brukast som garnityr."
    ],
    "commonMistakes": [
      "Å tilsetje uradbønnene før dei er gjennomkokte.",
      "Å spe med for mykje vatn slik at gryta blir tynn."
    ]
  },
  "sv": {
    "overview": "Dal makhani är en fyllig baljväxtgryta. De hela uradbönorna ger den mörka färgen och en krämig konsistens när de kokas mjuka, medan kidneybönorna ger lite tuggmotstånd.",
    "history": "Dal makhani hör till det punjabiska köket i norra Indien. Rätten lagas både hemma och på restauranger, där en fyllig version med smör och grädde är vanlig.",
    "flavor": "Uradbönorna har en jordig smak, tomaten ger syra och smör och grädde dämpar hettan från chili och ingefära. Vissa restaurangvarianter har också en lätt rökig smak.",
    "technique": "Koka de blötlagda uradbönorna helt mjuka innan de blandas med den nedkokta tomat- och kryddbasen. Mosa några bönor mot grytans kant och låt blandningen sjuda tills den tjocknar.",
    "essentials": [
      "Hela svarta uradbönor (sabut urad dal).",
      "Röda kidneybönor (rajma).",
      "Tomat, ingefära, spiskummin och chili.",
      "Smör och grädde ger rätten dess karakteristiska fyllighet."
    ],
    "recipe": {
      "label": "Dal makhani med urad och rajma",
      "yield": "4 portioner",
      "time": "ca 1 tim 30 min + blötläggning",
      "ingredients": [
        "160 g hela svarta uradbönor, blötlagda över natten",
        "120 g kokta röda kidneybönor från burk, avrunna",
        "1 liten lök, finhackad",
        "2 vitlöksklyftor och 2 cm ingefära, finrivna",
        "250 g passerade tomater",
        "1 tsk spiskumminfrön, ½ tsk chilipulver och ½ tsk garam masala",
        "2 msk smör, ½ dl grädde och salt"
      ],
      "steps": [
        "Skölj uradbönorna och koka dem i nytt vatten tills de är helt mjuka. Spara lite av kokvattnet.",
        "Värm smöret i en gryta. Fräs spiskumminen kort, stek löken mjuk och tillsätt vitlök och ingefära.",
        "Rör ner tomat och chili. Låt koka ihop till en tjock bas.",
        "Tillsätt uradbönorna, kidneybönorna och lite kokvatten. Mosa några av bönorna och låt grytan sjuda i 20–30 minuter. Rör om då och då.",
        "Rör ner garam masala och grädde mot slutet och smaka av med salt."
      ]
    },
    "variants": [
      "Hemlagade varianter med mindre grädde.",
      "Fylligare restaurangvarianter med extra smör eller mild röksmak."
    ],
    "serving": [
      "Servera varm med naan, roti eller ris.",
      "Lite grädde eller färsk koriander kan användas som garnering."
    ],
    "commonMistakes": [
      "Att tillsätta uradbönorna innan de är genomkokta.",
      "Att späda med för mycket vatten så att grytan blir tunn."
    ]
  },
  "da": {
    "overview": "Dal makhani er en fyldig bælgfrugtgryde. De hele uradbønner giver den mørke farve og en cremet konsistens, når de koges møre, mens de røde bønner giver lidt tyggemodstand.",
    "history": "Dal makhani hører til det punjabiske køkken i Nordindien. Retten laves både hjemme og på restauranter, hvor en fyldig version med smør og fløde er almindelig.",
    "flavor": "Uradbønnerne har en jordagtig smag, tomaten giver syre, og smør og fløde dæmper styrken fra chili og ingefær. Nogle restaurantvarianter har også en let røget smag.",
    "technique": "Kog de udblødte uradbønner helt møre, før de blandes med den indkogte tomat- og krydderibase. Mos nogle bønner mod grydens kant, og lad blandingen simre, til den tykner.",
    "essentials": [
      "Hele sorte uradbønner (sabut urad dal).",
      "Røde kidneybønner (rajma).",
      "Tomat, ingefær, spidskommen og chili.",
      "Smør og fløde giver retten dens karakteristiske fylde."
    ],
    "recipe": {
      "label": "Dal makhani med urad og rajma",
      "yield": "4 portioner",
      "time": "ca. 1 t 30 min + udblødning",
      "ingredients": [
        "160 g hele sorte uradbønner, udblødt natten over",
        "120 g kogte røde kidneybønner fra dåse, afdryppede",
        "1 lille løg, finthakket",
        "2 fed hvidløg og 2 cm ingefær, fintrevet",
        "250 g passerede tomater",
        "1 tsk spidskommenfrø, ½ tsk chilipulver og ½ tsk garam masala",
        "2 spsk smør, ½ dl fløde og salt"
      ],
      "steps": [
        "Skyl uradbønnerne, og kog dem i nyt vand, til de er helt møre. Gem lidt af kogevandet.",
        "Varm smørret i en gryde. Svits spidskommen kort, steg løget mørt, og tilsæt hvidløg og ingefær.",
        "Rør tomat og chili i. Lad det koge ind til en tyk base.",
        "Tilsæt uradbønner, kidneybønner og lidt kogevand. Mos nogle af bønnerne, og lad gryden simre i 20–30 minutter. Rør af og til.",
        "Rør garam masala og fløde i mod slutningen, og smag til med salt."
      ]
    },
    "variants": [
      "Hjemmeversioner med mindre fløde.",
      "Fyldigere restaurantversioner med ekstra smør eller mild røgsmag."
    ],
    "serving": [
      "Servér varm med naan, roti eller ris.",
      "Lidt fløde eller frisk koriander kan bruges som pynt."
    ],
    "commonMistakes": [
      "At tilsætte uradbønnerne, før de er gennemkogte.",
      "At fortynde med for meget vand, så gryderetten bliver tynd."
    ]
  },
  "fi": {
    "overview": "Dal makhani on täyteläinen palkokasvipata. Kokonaiset uradpavut antavat ruoalle tumman värin ja kermaisen rakenteen, kun ne keitetään pehmeiksi, ja punaiset pavut tuovat hieman purutuntumaa.",
    "history": "Dal makhani kuuluu Pohjois-Intian Punjabin ruokaperinteeseen. Sitä valmistetaan sekä kotona että ravintoloissa, joissa runsas voita ja kermaa sisältävä versio on yleinen.",
    "flavor": "Uradpavuissa on maanläheinen maku, tomaatti tuo hapokkuutta ja voi sekä kerma lieventävät chilin ja inkiväärin tulisuutta. Joissakin ravintolaversioissa on myös kevyt savun maku.",
    "technique": "Keitä liotetut uradpavut täysin pehmeiksi ennen kuin yhdistät ne kokoon keitettyyn tomaatti-maustepohjaan. Muussaa osa pavuista kattilan reunaa vasten ja anna seoksen hautua, kunnes se sakenee.",
    "essentials": [
      "Kokonaisia mustia uradpapuja (sabut urad dal).",
      "Punaisia kidneypapuja (rajma).",
      "Tomaattia, inkivääriä, juustokuminaa ja chiliä.",
      "Voi ja kerma antavat ruoalle sen ominaisen täyteläisyyden."
    ],
    "recipe": {
      "label": "Dal makhani urad- ja rajmapavuista",
      "yield": "4 annosta",
      "time": "n. 1 t 30 min + liotus",
      "ingredients": [
        "160 g kokonaisia mustia uradpapuja, liotettu yön yli",
        "120 g kypsiä punaisia kidneypapuja säilyketölkistä, valutettuina",
        "1 pieni sipuli, hienonnettuna",
        "2 valkosipulinkynttä ja 2 cm inkivääriä, hienoksi raastettuina",
        "250 g paseerattua tomaattia",
        "1 tl juustokuminan siemeniä, ½ tl chilijauhetta ja ½ tl garam masalaa",
        "2 rkl voita, ½ dl kermaa ja suolaa"
      ],
      "steps": [
        "Huuhtele uradpavut ja keitä ne uudessa vedessä täysin pehmeiksi. Säästä osa keitinvedestä.",
        "Kuumenna voi kattilassa. Kuullota juustokuminaa hetki, paista sipuli pehmeäksi ja lisää valkosipuli ja inkivääri.",
        "Sekoita joukkoon tomaatti ja chili. Keitä kokoon paksuksi pohjaksi.",
        "Lisää uradpavut, kidneypavut ja hieman keitinvettä. Muussaa osa pavuista ja anna padan hautua 20–30 minuuttia. Sekoita välillä.",
        "Sekoita garam masala ja kerma joukkoon loppuvaiheessa ja mausta suolalla."
      ]
    },
    "variants": [
      "Kotiversioita, joissa on vähemmän kermaa.",
      "Täyteläisempiä ravintolaversioita, joissa on enemmän voita tai mieto savun maku."
    ],
    "serving": [
      "Tarjoile kuumana naanin, rotin tai riisin kanssa.",
      "Koristeeksi voi käyttää hieman kermaa tai tuoretta korianteria."
    ],
    "commonMistakes": [
      "Uradpapujen lisääminen ennen kuin ne ovat täysin kypsiä.",
      "Liian runsas veden lisääminen, jolloin padasta tulee ohut."
    ]
  },
  "is": {
    "overview": "Dal makhani er matarmikill belgjurtaréttur. Heilu urad-baunirnar gefa réttinum dökkan lit og rjómakennda áferð þegar þær eru soðnar mjúkar, en rauðu baunirnar gefa dálítið bit.",
    "history": "Dal makhani tilheyrir matargerð Punjab í Norður-Indlandi. Rétturinn er eldaður bæði heima og á veitingastöðum, þar sem ríkuleg útgáfa með smjöri og rjóma er algeng.",
    "flavor": "Urad-baunirnar hafa jarðbundið bragð, tómatar gefa sýru og smjör og rjómi milda hitann frá chili og engifer. Sumar veitingahúsaútgáfur hafa einnig örlítið reykbragð.",
    "technique": "Sjóðið bleyttu urad-baunirnar þar til þær eru alveg mjúkar áður en þeim er blandað við niðursoðinn tómat- og kryddgrunninn. Merjið nokkrar baunir við pottbrúnina og látið blönduna malla þar til hún þykknar.",
    "essentials": [
      "Heilar svartar urad-baunir (sabut urad dal).",
      "Rauðar nýrnabaunir (rajma).",
      "Tómatar, engifer, kúmín og chili.",
      "Smjör og rjómi gefa réttinum einkennandi fyllingu."
    ],
    "recipe": {
      "label": "Dal makhani með urad og rajma",
      "yield": "4 skammtar",
      "time": "u.þ.b. 1 klst. 30 mín. + bleyting",
      "ingredients": [
        "160 g heilar svartar urad-baunir, lagðar í bleyti yfir nótt",
        "120 g soðnar rauðar nýrnabaunir úr dós, án vökvans",
        "1 lítill laukur, smátt saxaður",
        "2 hvítlauksrif og 2 cm engifer, fínt rifin",
        "250 g maukaðir og sigtaðir tómatar",
        "1 tsk. kúmínfræ, ½ tsk. chiliduft og ½ tsk. garam masala",
        "2 msk. smjör, ½ dl rjómi og salt"
      ],
      "steps": [
        "Skolið urad-baunirnar og sjóðið þær í nýju vatni þar til þær eru alveg mjúkar. Geymið hluta af suðuvatninu.",
        "Hitið smjörið í potti. Steikið kúmínfræin stutt, mýkið laukinn og bætið hvítlauk og engifer út í.",
        "Hrærið tómötum og chili saman við. Látið sjóða niður í þykkan grunn.",
        "Bætið urad-baunum, nýrnabaunum og dálitlu suðuvatni út í. Merjið nokkrar baunir og látið réttinn malla í 20–30 mínútur. Hrærið öðru hvoru.",
        "Hrærið garam masala og rjóma saman við undir lokin og smakkið til með salti."
      ]
    },
    "variants": [
      "Heimaútgáfur með minni rjóma.",
      "Ríkulegri veitingahúsaútgáfur með meira smjöri eða mildu reykbragði."
    ],
    "serving": [
      "Berið fram heitt með naan, roti eða hrísgrjónum.",
      "Nota má dálítinn rjóma eða ferskan kóríander til skrauts."
    ],
    "commonMistakes": [
      "Að bæta urad-baununum út í áður en þær eru fullsoðnar.",
      "Að þynna með of miklu vatni svo rétturinn verði þunnur."
    ]
  },
  "en": {
    "overview": "Dal makhani is a rich legume stew. Whole urad beans give it its dark colour and creamy consistency when cooked until soft, while the red beans provide a little bite.",
    "history": "Dal makhani belongs to the Punjabi cuisine of northern India. It is made both at home and in restaurants, where a rich version with butter and cream is common.",
    "flavor": "The urad beans have an earthy flavour, tomato adds acidity, and butter and cream soften the heat of chilli and ginger. Some restaurant versions also have a mild smoky flavour.",
    "technique": "Cook the soaked urad beans until completely soft before mixing them with the reduced tomato and spice base. Mash some beans against the side of the pot and simmer until the mixture thickens.",
    "essentials": [
      "Whole black urad beans (sabut urad dal).",
      "Red kidney beans (rajma).",
      "Tomato, ginger, cumin and chilli.",
      "Butter and cream give the dish its characteristic richness."
    ],
    "recipe": {
      "label": "Dal makhani with urad and rajma",
      "yield": "4 servings",
      "time": "approx. 1 hr 30 min + soaking",
      "ingredients": [
        "160 g whole black urad beans, soaked overnight",
        "120 g cooked red kidney beans from a tin, drained",
        "1 small onion, finely chopped",
        "2 garlic cloves and 2 cm ginger, finely grated",
        "250 g tomato passata",
        "1 tsp cumin seeds, ½ tsp chilli powder and ½ tsp garam masala",
        "2 tbsp butter, ½ dl cream and salt"
      ],
      "steps": [
        "Rinse the urad beans and cook them in fresh water until completely soft. Reserve some of the cooking water.",
        "Heat the butter in a pot. Briefly fry the cumin seeds, cook the onion until soft and add the garlic and ginger.",
        "Stir in the tomato and chilli. Reduce to a thick base.",
        "Add the urad beans, kidney beans and a little cooking water. Mash some of the beans and simmer for 20–30 minutes. Stir occasionally.",
        "Stir in the garam masala and cream towards the end, and season with salt."
      ]
    },
    "variants": [
      "Home versions with less cream.",
      "Richer restaurant versions with extra butter or a mild smoky flavour."
    ],
    "serving": [
      "Serve hot with naan, roti or rice.",
      "A little cream or fresh coriander can be used as a garnish."
    ],
    "commonMistakes": [
      "Adding the urad beans before they are fully cooked.",
      "Adding too much water, leaving the stew thin."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
