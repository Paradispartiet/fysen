import type { FoodKnowledgeArticle } from "../types.ts";
import type { PreviewLocale } from "../../../lib/locale-messages.ts";
type ArticleBody = Omit<FoodKnowledgeArticle, "dishId" | "summary" | "relatedDishIds" | "sources">;
export const mapoTofuTranslations = {
  "nn": {
    "overview": "Mapo tofu byggjer på kontrast: mjuk tofu mot ein intens saus med chilihete og den sitrusaktige dovninga frå sichuanpepar. Kjøtdeig blir ofte brukt, men vegetarvariantar kan lagast med sopp.",
    "history": "Retten er knytt til Chengdu i Sichuan og er ein av dei mest kjende rettane frå regionen internasjonalt. Mange variantar utanfor Kina tonar ned både fermenterte bønner og sichuanpepar.",
    "flavor": "Sterk, salt, fermentert og umamirik, med den karakteristiske ma-la-kombinasjonen av chilihete og dovnande sichuanpepar.",
    "technique": "Tofuen blir behandla varsamt, og sausen blir laga før han blir vend inn. Sichuanpepar blir brukt både i sausen og gjerne nymalen til slutt.",
    "essentials": [
      "Fast eller silkemjuk tofu som toler lett trekking.",
      "Doubanjiang – fermentert chili- og bønnepasta.",
      "Sichuanpepar for ma-la-karakter.",
      "Kraft, soyasaus, aromatiske ingrediensar og litt stivelse for fylde."
    ],
    "recipe": {
      "label": "Mapo tofu for heimekjøkkenet",
      "yield": "4 porsjonar",
      "time": "ca. 30 min",
      "ingredients": [
        "500 g tofu i terningar",
        "200 g svinekjøtdeig eller finhakka sopp",
        "2 ss doubanjiang",
        "1 ts knust sichuanpepar",
        "2 kvitlauksfedd",
        "1 ss finhakka ingefær",
        "3 dl kylling- eller grønsakskraft",
        "1 ss soyasaus",
        "1 ts maisenna rørt ut i vatn",
        "vårlauk"
      ],
      "steps": [
        "Steik kjøt eller sopp godt i ei varm panne.",
        "Tilset doubanjiang, kvitlauk, ingefær og halvparten av sichuanpeparen og steik kort til det duftar.",
        "Hell på kraft og soyasaus og legg tofuen varsamt i sausen.",
        "Lat retten trekkje nokre minutt og jamn varsamt med maisennablandinga.",
        "Avslutt med vårlauk og resten av sichuanpeparen rett før servering."
      ]
    },
    "variants": [
      "Klassisk med kjøtdeig, ofte svin eller storfe.",
      "Vegetarisk med sopp og eventuelt fermenterte svarte bønner.",
      "Mildare restaurantvariantar med mindre chili og sichuanpepar."
    ],
    "serving": [
      "Blir servert med dampa ris som absorberer den intense sausen.",
      "Ei enkel grøn grønsak ved sida av gjev kontrast."
    ],
    "commonMistakes": [
      "Å erstatte doubanjiang med berre vanleg chilisaus.",
      "Å røre hardt og knuse tofuen.",
      "Å koke sichuanpepar lenge til aromaen blir flat."
    ]
  },
  "sv": {
    "overview": "Mapo tofu bygger på kontrast: mjuk tofu mot en intensiv sås med chilins hetta och sichuanpepparns citrusaktiga domning. Köttfärs används ofta, men vegetariska varianter kan göras med svamp.",
    "history": "Rätten förknippas med Chengdu i Sichuan och är en av regionens mest kända rätter internationellt. Många versioner utanför Kina tonar ner både fermenterade bönor och sichuanpeppar.",
    "flavor": "Stark, salt, fermenterad och umamirik, med den karakteristiska ma-la-kombinationen av chilihetta och bedövande sichuanpeppar.",
    "technique": "Tofun hanteras varsamt och såsen byggs upp innan tofun vänds ner. Sichuanpeppar används både i såsen och gärna nymalen på slutet.",
    "essentials": [
      "Fast eller silkesmjuk tofu som tål lätt sjudning.",
      "Doubanjiang – fermenterad chili- och bönpasta.",
      "Sichuanpeppar för ma-la-karaktär.",
      "Buljong, sojasås, aromatiska ingredienser och lite stärkelse för fyllighet."
    ],
    "recipe": {
      "label": "Mapo tofu för hemmaköket",
      "yield": "4 portioner",
      "time": "ca 30 min",
      "ingredients": [
        "500 g tofu i tärningar",
        "200 g fläskfärs eller finhackad svamp",
        "2 msk doubanjiang",
        "1 tsk krossad sichuanpeppar",
        "2 vitlöksklyftor",
        "1 msk finhackad ingefära",
        "3 dl kyckling- eller grönsaksbuljong",
        "1 msk sojasås",
        "1 tsk majsstärkelse utrörd i vatten",
        "salladslök"
      ],
      "steps": [
        "Stek kött eller svamp ordentligt i en het panna.",
        "Tillsätt doubanjiang, vitlök, ingefära och hälften av sichuanpepparn och stek kort tills det doftar.",
        "Häll på buljong och sojasås och lägg försiktigt tofun i såsen.",
        "Låt sjuda några minuter och red försiktigt med majsstärkelseblandningen.",
        "Avsluta med salladslök och resten av sichuanpepparn precis före servering."
      ]
    },
    "variants": [
      "Klassisk med köttfärs, ofta fläsk eller nöt.",
      "Vegetarisk med svamp och eventuellt fermenterade svarta bönor.",
      "Mildare restaurangversioner med mindre chili och sichuanpeppar."
    ],
    "serving": [
      "Serveras med ångkokt ris som absorberar den intensiva såsen.",
      "En enkel grön grönsak vid sidan av ger kontrast."
    ],
    "commonMistakes": [
      "Att ersätta doubanjiang med enbart vanlig chilisås.",
      "Att röra om kraftigt och krossa tofun.",
      "Att koka sichuanpepparn länge så att aromen blir platt."
    ]
  },
  "da": {
    "overview": "Mapo tofu bygger på kontrast: blød tofu mod en intens sauce med chiliens styrke og sichuanpeberens citrusagtige bedøvelse. Hakket kød bruges ofte, men vegetariske varianter kan laves med svampe.",
    "history": "Retten forbindes med Chengdu i Sichuan og er en af regionens mest kendte retter internationalt. Mange versioner uden for Kina nedtoner både fermenterede bønner og sichuanpeber.",
    "flavor": "Stærk, salt, fermenteret og umamierig med den karakteristiske ma-la-kombination af chilistyrke og bedøvende sichuanpeber.",
    "technique": "Tofuen behandles skånsomt, og saucen bygges op, før tofuen vendes i. Sichuanpeber bruges både i saucen og gerne friskmalet til sidst.",
    "essentials": [
      "Fast eller silkeblød tofu, der tåler let simring.",
      "Doubanjiang – fermenteret chili- og bønnepasta.",
      "Sichuanpeber for ma-la-karakter.",
      "Bouillon, sojasauce, aromatiske ingredienser og lidt stivelse til fylde."
    ],
    "recipe": {
      "label": "Mapo tofu til hjemmekøkkenet",
      "yield": "4 portioner",
      "time": "ca. 30 min",
      "ingredients": [
        "500 g tofu i tern",
        "200 g hakket svinekød eller finthakkede svampe",
        "2 spsk doubanjiang",
        "1 tsk knust sichuanpeber",
        "2 fed hvidløg",
        "1 spsk finthakket ingefær",
        "3 dl kyllinge- eller grøntsagsbouillon",
        "1 spsk sojasauce",
        "1 tsk majsstivelse rørt ud i vand",
        "forårsløg"
      ],
      "steps": [
        "Steg kød eller svampe godt på en varm pande.",
        "Tilsæt doubanjiang, hvidløg, ingefær og halvdelen af sichuanpeberen, og steg kort, til det dufter.",
        "Hæld bouillon og sojasauce på, og læg forsigtigt tofuen i saucen.",
        "Lad retten simre nogle minutter, og jævn forsigtigt med majsstivelsesblandingen.",
        "Afslut med forårsløg og resten af sichuanpeberen lige før servering."
      ]
    },
    "variants": [
      "Klassisk med hakket kød, ofte svin eller okse.",
      "Vegetarisk med svampe og eventuelt fermenterede sorte bønner.",
      "Mildere restaurantversioner med mindre chili og sichuanpeber."
    ],
    "serving": [
      "Serveres med dampede ris, som absorberer den intense sauce.",
      "En enkel grøn grøntsag ved siden af giver kontrast."
    ],
    "commonMistakes": [
      "At erstatte doubanjiang med almindelig chilisauce alene.",
      "At røre hårdt og knuse tofuen.",
      "At koge sichuanpeber længe, så aromaen bliver flad."
    ]
  },
  "fi": {
    "overview": "Mapo tofu perustuu kontrastiin: pehmeä tofu kohtaa voimakkaan kastikkeen, jossa yhdistyvät chilin tulisuus ja sichuaninpippurin sitruksinen, puuduttava vaikutus. Jauhelihaa käytetään usein, mutta kasvisversiossa sen voi korvata sienillä.",
    "history": "Ruokalaji yhdistetään Sichuanin Chengduun, ja se on alueen kansainvälisesti tunnetuimpia ruokia. Kiinan ulkopuolella monissa versioissa fermentoitujen papujen ja sichuaninpippurin makua lievennetään.",
    "flavor": "Tulinen, suolainen, fermentoitunut ja umamipitoinen, tunnusomaisena ma-la-yhdistelmänä chilin tulisuus ja puuduttava sichuaninpippuri.",
    "technique": "Tofua käsitellään varovasti, ja kastike valmistetaan ennen sen lisäämistä. Sichuaninpippuria käytetään kastikkeessa ja mielellään vastajauhettuna viimeistelyyn.",
    "essentials": [
      "Kiinteää tai silkkisen pehmeää tofua, joka kestää kevyen haudutuksen.",
      "Doubanjiang – fermentoitu chili-paputahna.",
      "Sichuaninpippuria ma-la-maun saamiseksi.",
      "Lientä, soijakastiketta, aromaattisia aineksia ja hieman tärkkelystä kastikkeen sakeuttamiseen."
    ],
    "recipe": {
      "label": "Mapo tofu kotikeittiöön",
      "yield": "4 annosta",
      "time": "n. 30 min",
      "ingredients": [
        "500 g tofua kuutioina",
        "200 g sianjauhelihaa tai hienonnettuja sieniä",
        "2 rkl doubanjiangia",
        "1 tl murskattua sichuaninpippuria",
        "2 valkosipulinkynttä",
        "1 rkl hienonnettua inkivääriä",
        "3 dl kana- tai kasvislientä",
        "1 rkl soijakastiketta",
        "1 tl maissitärkkelystä veteen sekoitettuna",
        "kevätsipulia"
      ],
      "steps": [
        "Paista liha tai sienet kunnolla kuumalla pannulla.",
        "Lisää doubanjiang, valkosipuli, inkivääri ja puolet sichuaninpippurista ja paista hetki, kunnes ainekset tuoksuvat.",
        "Lisää liemi ja soijakastike ja laita tofu varovasti kastikkeeseen.",
        "Hauduta muutama minuutti ja suurusta varovasti maissitärkkelysseoksella.",
        "Viimeistele kevätsipulilla ja lopulla sichuaninpippurilla juuri ennen tarjoilua."
      ]
    },
    "variants": [
      "Klassinen versio jauhelihalla, usein sian- tai naudanlihalla.",
      "Kasvisversio sienillä ja halutessa fermentoiduilla mustilla pavuilla.",
      "Miedommat ravintolaversiot, joissa on vähemmän chiliä ja sichuaninpippuria."
    ],
    "serving": [
      "Tarjoillaan höyrytetyn riisin kanssa, joka imee voimakasta kastiketta.",
      "Yksinkertainen vihreä kasvis lisukkeena tuo kontrastia."
    ],
    "commonMistakes": [
      "Doubanjiangin korvaaminen pelkällä tavallisella chilikastikkeella.",
      "Voimakas sekoittaminen, jolloin tofu murenee.",
      "Sichuaninpippurin pitkä keittäminen, jolloin aromi latistuu."
    ]
  },
  "is": {
    "overview": "Mapo tofu byggist á andstæðum: mjúkt tófú á móti kraftmikilli sósu með chili-hita og sítruskenndri deyfingu frá Sichuan-pipar. Hakk er oft notað en grænmetisútgáfur má gera með sveppum.",
    "history": "Rétturinn tengist Chengdu í Sichuan og er einn alþjóðlega þekktasti réttur svæðisins. Margar útgáfur utan Kína draga úr bragði gerjaðra bauna og Sichuan-pipars.",
    "flavor": "Sterkt, salt, gerjað og umamíríkt, með einkennandi ma-la samspili chili-hita og deyfandi Sichuan-pipars.",
    "technique": "Tófúið er meðhöndlað varlega og sósan útbúin áður en því er bætt við. Sichuan-pipar er notaður í sósuna og gjarnan nýmalaður í lokin.",
    "essentials": [
      "Stíft eða silkimjúkt tófú sem þolir hæga suðu.",
      "Doubanjiang – gerjað chili- og baunamauk.",
      "Sichuan-pipar fyrir ma-la-einkennið.",
      "Soð, sojasósa, ilmandi hráefni og dálítil sterkja til að þykkja sósuna."
    ],
    "recipe": {
      "label": "Mapo tofu fyrir heimiliseldhúsið",
      "yield": "4 skammtar",
      "time": "u.þ.b. 30 mín.",
      "ingredients": [
        "500 g tófú í teningum",
        "200 g svínahakk eða fínsaxaðir sveppir",
        "2 msk. doubanjiang",
        "1 tsk. mulinn Sichuan-pipar",
        "2 hvítlauksrif",
        "1 msk. fínsaxað engifer",
        "3 dl kjúklinga- eða grænmetissoð",
        "1 msk. sojasósa",
        "1 tsk. maíssterkja hrærð út í vatni",
        "vorlaukur"
      ],
      "steps": [
        "Steikið kjöt eða sveppi vel á heitri pönnu.",
        "Bætið doubanjiang, hvítlauk, engifer og helmingi Sichuan-piparsins við og steikið stutt þar til ilmur kemur fram.",
        "Hellið soði og sojasósu út í og leggið tófúið varlega í sósuna.",
        "Látið réttinn malla í nokkrar mínútur og þykkið varlega með maíssterkjublöndunni.",
        "Bætið vorlauk og afganginum af Sichuan-piparnum við rétt fyrir framreiðslu."
      ]
    },
    "variants": [
      "Klassísk útgáfa með hakki, oft svína- eða nautahakki.",
      "Grænmetisútgáfa með sveppum og mögulega gerjuðum svörtum baunum.",
      "Mildari veitingahúsaútgáfur með minna chili og Sichuan-pipar."
    ],
    "serving": [
      "Borið fram með gufusoðnum hrísgrjónum sem draga í sig kraftmikla sósuna.",
      "Einfalt grænt grænmeti til hliðar gefur andstæðu."
    ],
    "commonMistakes": [
      "Að nota aðeins venjulega chili-sósu í stað doubanjiang.",
      "Að hræra kröftuglega og mylja tófúið.",
      "Að sjóða Sichuan-pipar lengi svo ilmurinn dofni."
    ]
  },
  "en": {
    "overview": "Mapo tofu is built on contrast: soft tofu against an intense sauce with chilli heat and the citrus-like numbing sensation of Sichuan pepper. Minced meat is often used, but vegetarian versions can use mushrooms.",
    "history": "The dish is associated with Chengdu in Sichuan and is one of the region's best-known dishes internationally. Many versions outside China tone down both fermented beans and Sichuan pepper.",
    "flavor": "Hot, salty, fermented and rich in umami, with the characteristic ma-la combination of chilli heat and numbing Sichuan pepper.",
    "technique": "Handle the tofu gently and build the sauce before folding it in. Sichuan pepper is used in the sauce and preferably freshly ground as a finishing touch.",
    "essentials": [
      "Firm or silken tofu that withstands gentle simmering.",
      "Doubanjiang – fermented chilli and bean paste.",
      "Sichuan pepper for the ma-la character.",
      "Stock, soy sauce, aromatics and a little starch for the sauce's body."
    ],
    "recipe": {
      "label": "Mapo tofu for the home kitchen",
      "yield": "4 servings",
      "time": "approx. 30 min",
      "ingredients": [
        "500 g tofu, cubed",
        "200 g minced pork or finely chopped mushrooms",
        "2 tbsp doubanjiang",
        "1 tsp crushed Sichuan pepper",
        "2 garlic cloves",
        "1 tbsp finely chopped ginger",
        "3 dl chicken or vegetable stock",
        "1 tbsp soy sauce",
        "1 tsp cornflour mixed with water",
        "spring onions"
      ],
      "steps": [
        "Fry the meat or mushrooms well in a hot pan.",
        "Add doubanjiang, garlic, ginger and half the Sichuan pepper and fry briefly until fragrant.",
        "Pour in the stock and soy sauce and gently place the tofu in the sauce.",
        "Simmer for a few minutes and gently thicken with the cornflour mixture.",
        "Finish with spring onions and the remaining Sichuan pepper just before serving."
      ]
    },
    "variants": [
      "Classic version with minced meat, often pork or beef.",
      "Vegetarian with mushrooms and optionally fermented black beans.",
      "Milder restaurant versions with less chilli and Sichuan pepper."
    ],
    "serving": [
      "Serve with steamed rice to absorb the intense sauce.",
      "A simple green vegetable on the side provides contrast."
    ],
    "commonMistakes": [
      "Replacing doubanjiang with ordinary chilli sauce alone.",
      "Stirring vigorously and breaking up the tofu.",
      "Cooking Sichuan pepper for too long until its aroma becomes flat."
    ]
  }
} as const satisfies Record<Exclude<PreviewLocale, "nb">, ArticleBody>;
