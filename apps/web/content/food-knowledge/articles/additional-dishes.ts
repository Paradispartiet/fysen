import type { FoodKnowledgeArticle } from "../types";

export const additionalDishes: readonly FoodKnowledgeArticle[] = [
  {
    "dishId": "sambar",
    "summary": "Sørindisk linsegryte med grønnsaker, tamarind og krydder.",
    "overview": "Toor dal gir fylde, mens tamarind gir syrlighet.",
    "history": "Sambar er et vanlig følge til ris, idli og dosa i sørindiske kjøkken.",
    "flavor": "Syrlig, krydret og fyldig.",
    "technique": "Kok linsene møre før tamarind tilsettes; fres krydder separat.",
    "essentials": [
      "200 g toor dal",
      "300 g grønnsaker",
      "1 ss tamarindpasta"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "200 g toor dal",
        "300 g grønnsaker",
        "1 ss tamarindpasta",
        "2 ts sambar masala",
        "1 ts sennepsfrø",
        "karriblader",
        "olje og salt"
      ],
      "steps": [
        "Kok linsene møre i vann.",
        "Kok grønnsakene med krydder og tamarind.",
        "Bland inn linsene og smak til.",
        "Fres sennepsfrø og karriblader i olje og hell over."
      ]
    },
    "variants": [
      "Udupi-sambar og varianter med kokos."
    ],
    "serving": [
      "Server med ris, dosa eller idli."
    ],
    "commonMistakes": [
      "Tilsett ikke tamarind før linsene er møre."
    ],
    "relatedDishIds": [
      "idli",
      "dosa",
      "vada"
    ],
    "sources": []
  },
  {
    "dishId": "idli",
    "summary": "Myke, dampede riskaker av fermentert ris og urad dal.",
    "overview": "Fermentert røre dampes i små former uten stekeskorpe.",
    "history": "Idli er en etablert frokostrett i Sør-India.",
    "flavor": "Mildt syrlig og luftig.",
    "technique": "La røren fermentere før den dampes.",
    "essentials": [
      "300 g idliris",
      "100 g urad dal",
      "vann"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min + bløtlegging og fermentering",
      "ingredients": [
        "300 g idliris",
        "100 g urad dal",
        "vann",
        "salt"
      ],
      "steps": [
        "Bløtlegg ris og dal separat i fire timer.",
        "Mal hver del med vann og bland.",
        "Fermenter til røren er luftig.",
        "Damp i smurte former i 10–15 minutter."
      ]
    },
    "variants": [
      "Rava idli med semulegryn."
    ],
    "serving": [
      "Server varm med sambar og kokoschutney."
    ],
    "commonMistakes": [
      "Ikke overfyll dampformene."
    ],
    "relatedDishIds": [
      "sambar",
      "dosa",
      "vada"
    ],
    "sources": []
  },
  {
    "dishId": "vada",
    "summary": "Sprø sørindiske fritter av belgfrukter, ofte med et hull i midten.",
    "overview": "Medu vada lages av malt urad dal; andre vada bruker andre belgfrukter.",
    "history": "Vada er vanlig som snacks og frokost i Sør-India.",
    "flavor": "Sprø utside og myk, krydret kjerne.",
    "technique": "Bruk minst mulig vann når dal males.",
    "essentials": [
      "250 g urad dal",
      "1 grønn chili",
      "ingefær"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min + bløtlegging",
      "ingredients": [
        "250 g urad dal",
        "1 grønn chili",
        "ingefær",
        "karriblader",
        "salt",
        "frityrolje"
      ],
      "steps": [
        "Bløtlegg dal i fire timer og la den renne av.",
        "Mal til tykk røre og bland inn krydder.",
        "Form små ringer med fuktige hender.",
        "Friter i omganger til gyllen og gjennomstekt."
      ]
    },
    "variants": [
      "Masala vada av chana dal."
    ],
    "serving": [
      "Server med chutney eller sambar."
    ],
    "commonMistakes": [
      "For våt røre gjør ringene vanskelige å forme."
    ],
    "relatedDishIds": [
      "sambar",
      "idli",
      "dosa"
    ],
    "sources": []
  },
  {
    "dishId": "naan",
    "summary": "Mykt, ovnsbakt flatbrød av hvetemel.",
    "overview": "Deigen heves og stekes raskt ved høy varme.",
    "history": "Naan finnes i flere vest-, sentral- og sørasiatiske brødtradisjoner.",
    "flavor": "Mykt med ristede flekker.",
    "technique": "En svært varm panne kan etterligne noe av varmen fra en tandoor.",
    "essentials": [
      "400 g hvetemel",
      "150 g yoghurt",
      "100 ml vann"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min + heving",
      "ingredients": [
        "400 g hvetemel",
        "150 g yoghurt",
        "100 ml vann",
        "1 ts tørrgjær",
        "1 ts salt",
        "smør"
      ],
      "steps": [
        "Elt mel, yoghurt, vann, gjær og salt.",
        "La deigen heve til luftig.",
        "Del i åtte og kjevle ut.",
        "Stek i varm panne på begge sider og pensle med smør."
      ]
    },
    "variants": [
      "Garlic naan og butter naan."
    ],
    "serving": [
      "Server varmt til gryteretter."
    ],
    "commonMistakes": [
      "Unngå for lav stekevarme."
    ],
    "relatedDishIds": [
      "butter-chicken",
      "dal-makhani"
    ],
    "sources": []
  },
  {
    "dishId": "yakitori",
    "summary": "Japanske grillspyd med kylling.",
    "overview": "Små kyllingbiter grilles på spyd med salt eller tare-saus.",
    "history": "Yakitori er vanlig på japanske izakaya og spesialiserte grillsteder.",
    "flavor": "Ristet, saftig og salt eller søtlig.",
    "technique": "Skjær jevne biter og grill til gjennomstekt.",
    "essentials": [
      "600 g kyllinglårfilet",
      "vårløk",
      "3 ss soyasaus"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "600 g kyllinglårfilet",
        "vårløk",
        "3 ss soyasaus",
        "3 ss mirin",
        "1 ss sukker"
      ],
      "steps": [
        "Kok soyasaus, mirin og sukker til lett sirupsaktig saus.",
        "Tre kylling og vårløk på spyd.",
        "Grill og vend jevnlig.",
        "Pensle med saus mot slutten og stek kyllingen gjennom."
      ]
    },
    "variants": [
      "Shio med salt og tare med saus."
    ],
    "serving": [
      "Server med sitron eller shichimi."
    ],
    "commonMistakes": [
      "Ikke pensle ferdig mat med saus som har vært i kontakt med rå kylling."
    ],
    "relatedDishIds": [
      "katsu",
      "ramen"
    ],
    "sources": []
  },
  {
    "dishId": "green-curry",
    "summary": "Thailandsk curry med grønn chilipasta og kokosmelk.",
    "overview": "Grønn currypasta gir aroma fra chili, sitrongress og urter.",
    "history": "Kaeng khiao wan er en kjent thailandsk currytype.",
    "flavor": "Kremet, aromatisk og sterk.",
    "technique": "Fres currypasta før resten av kokosmelken tilsettes.",
    "essentials": [
      "400 ml kokosmelk",
      "2 ss grønn currypasta",
      "400 g kylling"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "400 ml kokosmelk",
        "2 ss grønn currypasta",
        "400 g kylling",
        "200 g aubergine",
        "fiskesaus",
        "thaibasilikum"
      ],
      "steps": [
        "Fres currypasta i litt kokosmelk.",
        "Tilsett resten av melken og kyllingen.",
        "La småkoke med aubergine til kyllingen er gjennomstekt.",
        "Smak til med fiskesaus og basilikum."
      ]
    },
    "variants": [
      "Varianter med tofu eller fisk."
    ],
    "serving": [
      "Server med jasminris."
    ],
    "commonMistakes": [
      "Unngå å koke basilikumen lenge."
    ],
    "relatedDishIds": [
      "tom-yum",
      "pad-thai"
    ],
    "sources": []
  },
  {
    "dishId": "udon",
    "summary": "Tykke japanske hvetenudler med elastisk konsistens.",
    "overview": "Udon serveres i varm kraft, kalde med dipp eller stekt.",
    "history": "Udon har lange tradisjoner i Japan, med regionale variasjoner som sanuki udon.",
    "flavor": "Mild hvete, myk og spenstig tekstur.",
    "technique": "Kok nudlene separat og skyll ved behov.",
    "essentials": [
      "400 g udon",
      "800 ml dashi",
      "2 ss soyasaus"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 2–4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "400 g udon",
        "800 ml dashi",
        "2 ss soyasaus",
        "2 ss mirin",
        "vårløk"
      ],
      "steps": [
        "Kok nudlene etter anvisning.",
        "Varm dashi med soyasaus og mirin.",
        "Fordel nudlene i skåler og hell over kraften."
      ]
    },
    "variants": [
      "Kake udon og yaki udon."
    ],
    "serving": [
      "Server med vårløk eller tempura."
    ],
    "commonMistakes": [
      "Ikke la nudlene stå lenge i varm kraft."
    ],
    "relatedDishIds": [
      "ramen",
      "gyoza"
    ],
    "sources": []
  },
  {
    "dishId": "dumplings",
    "summary": "Små fylte deigpakker, kokt, dampet eller stekt.",
    "overview": "Kinesiske jiaozi har ofte fyll av kjøtt og grønnsaker.",
    "history": "Jiaozi forbindes blant annet med kinesisk nyttårsfeiring.",
    "flavor": "Saftig fyll og myk eller sprø deig.",
    "technique": "Lukk kantene godt før koking.",
    "essentials": [
      "24 dumplingark",
      "300 g svinekjøttdeig",
      "150 g kinakål"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 2–4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "24 dumplingark",
        "300 g svinekjøttdeig",
        "150 g kinakål",
        "ingefær",
        "soyasaus"
      ],
      "steps": [
        "Finhakk kål og klem ut væske.",
        "Bland med kjøtt og krydder.",
        "Fyll arkene og forsegl kantene.",
        "Kok til fyllet er gjennomstekt."
      ]
    },
    "variants": [
      "Shuijiao og guotie."
    ],
    "serving": [
      "Server med svart eddik og soyasaus."
    ],
    "commonMistakes": [
      "Ikke overfyll deigen."
    ],
    "relatedDishIds": [
      "gyoza",
      "bao"
    ],
    "sources": []
  },
  {
    "dishId": "pad-kra-pao",
    "summary": "Thailandsk wokrett med hellig basilikum, chili og hvitløk.",
    "overview": "Hakket kjøtt stekes raskt med aromater og saus.",
    "history": "Retten er utbredt i thailandske hverdagskjøkken og gatemat.",
    "flavor": "Sterk, salt og urtepreget.",
    "technique": "Bruk høy varme og tilsett basilikum mot slutten.",
    "essentials": [
      "400 g kjøttdeig",
      "4 hvitløksfedd",
      "chili etter smak"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 2–4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "400 g kjøttdeig",
        "4 hvitløksfedd",
        "chili etter smak",
        "hellig basilikum",
        "1 ss fiskesaus",
        "1 ss østerssaus",
        "ris"
      ],
      "steps": [
        "Stek hakket hvitløk og chili raskt.",
        "Tilsett kjøtt og stek gjennom.",
        "Smak til med sausene.",
        "Vend inn basilikum rett før servering."
      ]
    },
    "variants": [
      "Varianter med kylling, svin eller tofu."
    ],
    "serving": [
      "Server med ris og gjerne stekt egg."
    ],
    "commonMistakes": [
      "Ikke forveksle hellig basilikum med vanlig søt basilikum."
    ],
    "relatedDishIds": [
      "pad-thai",
      "green-curry"
    ],
    "sources": []
  },
  {
    "dishId": "bun-cha",
    "summary": "Vietnamesisk grillet svinekjøtt med risnudler, urter og dipsaus.",
    "overview": "Grillet kjøtt serveres med en søt-syrlig fiskesausblanding.",
    "history": "Bún chả er særlig forbundet med Hanoi.",
    "flavor": "Røykfylt, søt-syrlig og frisk.",
    "technique": "Grill kjøttet i små porsjoner.",
    "essentials": [
      "400 g svinekjøtt",
      "200 g risnudler",
      "fiskesaus"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 2–4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "400 g svinekjøtt",
        "200 g risnudler",
        "fiskesaus",
        "lime",
        "sukker",
        "hvitløk",
        "friske urter"
      ],
      "steps": [
        "Mariner kjøttet med fiskesaus, hvitløk og litt sukker.",
        "Grill til gjennomstekt.",
        "Kok nudlene.",
        "Bland fiskesaus, lime, vann og sukker til dipsaus."
      ]
    },
    "variants": [
      "Kjøttboller og skiver av svinekjøtt kan kombineres."
    ],
    "serving": [
      "Server nudler, urter og kjøtt med dipsaus."
    ],
    "commonMistakes": [
      "Ikke bruk for konsentrert fiskesaus i dippen."
    ],
    "relatedDishIds": [
      "pho",
      "banh-mi"
    ],
    "sources": []
  },
  {
    "dishId": "vietnamese-spring-rolls",
    "summary": "Ferske vietnamesiske vårruller i rispapir.",
    "overview": "Gỏi cuốn fylles ofte med risnudler, reker, urter og salat.",
    "history": "Ferske rispapirruller er en kjent del av vietnamesisk matkultur.",
    "flavor": "Frisk, myk og sprø fra grønnsakene.",
    "technique": "Fukt rispapiret kort og rull stramt.",
    "essentials": [
      "12 rispapirark",
      "200 g kokte reker",
      "100 g risnudler"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 2–4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "12 rispapirark",
        "200 g kokte reker",
        "100 g risnudler",
        "salat",
        "mynte",
        "agurk"
      ],
      "steps": [
        "Kok og avkjøl nudlene.",
        "Skjær grønnsakene.",
        "Fukt ett rispapirark av gangen.",
        "Legg på fyll og rull sammen."
      ]
    },
    "variants": [
      "Tofu eller kokt svinekjøtt kan brukes som fyll."
    ],
    "serving": [
      "Server med peanøttsaus eller fiskesausbasert dipp."
    ],
    "commonMistakes": [
      "Ikke bløtlegg rispapiret for lenge."
    ],
    "relatedDishIds": [
      "pho",
      "bun-cha"
    ],
    "sources": []
  },
  {
    "dishId": "pizza-marinara",
    "summary": "Napolitansk pizza med tomat, hvitløk, oregano og olivenolje, uten ost.",
    "overview": "En enkel tomatpizza der deig og råvarer står i sentrum.",
    "history": "Marinara tilhører den klassiske napolitanske pizzatradisjonen.",
    "flavor": "Fruktig tomat, hvitløk og ristet deig.",
    "technique": "Stek på svært varm pizzastein eller stål.",
    "essentials": [
      "500 g pizzadeig",
      "250 g knuste tomater",
      "2 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 2–4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "500 g pizzadeig",
        "250 g knuste tomater",
        "2 hvitløksfedd",
        "oregano",
        "olivenolje"
      ],
      "steps": [
        "Del og form deigen.",
        "Fordel tomat, hvitløk og oregano.",
        "Drypp over olje.",
        "Stek på forvarmet pizzastål ved ovnens høyeste temperatur til ferdig."
      ]
    },
    "variants": [
      "Tomattype og mengden hvitløk varierer."
    ],
    "serving": [
      "Server straks etter steking."
    ],
    "commonMistakes": [
      "Ikke legg på for mye våt saus."
    ],
    "relatedDishIds": [
      "pizza-margherita",
      "carbonara"
    ],
    "sources": []
  },
  {
    "dishId": "peking-duck",
    "summary": "Kinesisk stekt and med sprøtt skinn, ofte servert i tynne pannekaker.",
    "overview": "Skinnet tørkes før steking for å få en sprø overflate.",
    "history": "Pekingand er særlig knyttet til Beijings restauranttradisjon.",
    "flavor": "Rikt andekjøtt, sprøtt skinn og søtlig saus.",
    "technique": "Tørk anden utildekket i kjøleskap og stek på rist.",
    "essentials": [
      "1 hel and",
      "salt",
      "tynne kinesiske pannekaker"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2–3 timer + tørking over natten",
      "ingredients": [
        "1 hel and",
        "salt",
        "tynne kinesiske pannekaker",
        "agurk",
        "vårløk",
        "søt bønnesaus"
      ],
      "steps": [
        "Tørk anden godt og salt den.",
        "La den stå utildekket i kjøleskap over natten.",
        "Stek på rist ved 180 °C til gjennomstekt, minst 74 °C i tykkeste del.",
        "Skjær kjøttet og server med pannekaker og tilbehør."
      ]
    },
    "variants": [
      "Hjemmevarianten forenkler den tradisjonelle ovnsteknikken."
    ],
    "serving": [
      "Server med agurk, vårløk og søt bønnesaus."
    ],
    "commonMistakes": [
      "Ikke pakk inn det sprø skinnet slik at dampen gjør det mykt."
    ],
    "relatedDishIds": [
      "bao",
      "dumplings"
    ],
    "sources": []
  },
  {
    "dishId": "dan-dan-noodles",
    "summary": "Nudler fra Sichuan med chiliolje, krydret kjøtt og aromatisk saus.",
    "overview": "Hvetenudler blandes med en konsentrert saus og gjerne stekt kjøttdeig.",
    "history": "Retten forbindes med Sichuans gatemat og nudeltradisjon.",
    "flavor": "Sterk, salt, nøtteaktig og lett bedøvende fra sichuanpepper.",
    "technique": "Bland sausen i skålen før varme nudler tilsettes.",
    "essentials": [
      "300 g hvetenudler",
      "200 g svinekjøttdeig",
      "2 ss chiliolje"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "300 g hvetenudler",
        "200 g svinekjøttdeig",
        "2 ss chiliolje",
        "2 ss sesampasta",
        "soyasaus",
        "sichuanpepper",
        "syltede sennepsblader"
      ],
      "steps": [
        "Stek kjøttdeigen gjennom med hakkede sennepsblader.",
        "Bland chiliolje, sesampasta, soyasaus og sichuanpepper.",
        "Kok nudlene og spar litt kokevann.",
        "Fordel saus, nudler og kjøtt i skåler."
      ]
    },
    "variants": [
      "Varianter med mer kraft eller uten kjøtt."
    ],
    "serving": [
      "Server med vårløk og bland før du spiser."
    ],
    "commonMistakes": [
      "Unngå så mye sesampasta at chilien og krydderet overdøves."
    ],
    "relatedDishIds": [
      "mapo-tofu",
      "dumplings"
    ],
    "sources": []
  },
  {
    "dishId": "amatriciana",
    "summary": "Italiensk pasta med tomat, guanciale og pecorino.",
    "overview": "Svinekjake gir fett og smak til en enkel tomatsaus.",
    "history": "Retten knyttes til Amatrice og har også en sterk plass i romersk matkultur.",
    "flavor": "Salt, fyldig og fruktig, gjerne med litt chili.",
    "technique": "Stek guanciale langsomt slik at fettet smelter.",
    "essentials": [
      "350 g bucatini",
      "150 g guanciale",
      "400 g tomater"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "350 g bucatini",
        "150 g guanciale",
        "400 g tomater",
        "80 g pecorino romano",
        "chili"
      ],
      "steps": [
        "Skjær guanciale i strimler og stek til gyllen.",
        "Tilsett tomat og chili og la sausen småkoke.",
        "Kok pasta al dente og vend inn i sausen.",
        "Topp med revet pecorino."
      ]
    },
    "variants": [
      "Spaghetti kan brukes i stedet for bucatini."
    ],
    "serving": [
      "Server varm med pecorino."
    ],
    "commonMistakes": [
      "Ikke salt sausen for mye før osten er tilsatt."
    ],
    "relatedDishIds": [
      "carbonara",
      "cacio-e-pepe"
    ],
    "sources": []
  },
  {
    "dishId": "saltimbocca",
    "summary": "Tynne kalveskiver med prosciutto og salvie.",
    "overview": "Kjøttet stekes raskt og serveres med en enkel sjysaus.",
    "history": "Saltimbocca alla romana er en klassiker i romersk restauranttradisjon.",
    "flavor": "Mørt kjøtt, salt skinke og aromatisk salvie.",
    "technique": "Stek de tynne skivene kort for å bevare saftigheten.",
    "essentials": [
      "400 g tynne kalveskiver",
      "8 skiver prosciutto",
      "8 salvieblader"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "400 g tynne kalveskiver",
        "8 skiver prosciutto",
        "8 salvieblader",
        "smør",
        "100 ml hvitvin eller kraft"
      ],
      "steps": [
        "Legg prosciutto og salvie på kalveskivene og fest med tannpirker.",
        "Stek kort på begge sider til kjøttet er ferdig.",
        "Ta ut kjøttet og kok ut pannen med vin eller kraft.",
        "Rør inn smør og server sausen over kjøttet."
      ]
    },
    "variants": [
      "Enkelte hjemmevarianter bruker kylling."
    ],
    "serving": [
      "Server med grønnsaker eller poteter."
    ],
    "commonMistakes": [
      "Ikke stek tynne kalveskiver for lenge."
    ],
    "relatedDishIds": [
      "carbonara",
      "amatriciana"
    ],
    "sources": []
  },
  {
    "dishId": "cannoli",
    "summary": "Sicilianske sprø deigrør fylt med søtet ricotta.",
    "overview": "Friterte skall fylles med en krem av avrent ricotta.",
    "history": "Cannoli er en kjent del av Sicilias konditortradisjon.",
    "flavor": "Sprøtt skall og mild, kremet sødme.",
    "technique": "La ricotta renne av og fyll skallene rett før servering.",
    "essentials": [
      "12 ferdige cannoliskall",
      "500 g ricotta",
      "100 g melis"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 20 min + avrenning",
      "ingredients": [
        "12 ferdige cannoliskall",
        "500 g ricotta",
        "100 g melis",
        "50 g mørk sjokolade",
        "pistasjnøtter"
      ],
      "steps": [
        "La ricotta renne av i kjøleskap.",
        "Rør glatt med melis og hakket sjokolade.",
        "Fyll skallene med sprøytepose.",
        "Pynt endene med hakkede pistasjnøtter."
      ]
    },
    "variants": [
      "Fyll med kandisert appelsinskall eller sjokolade."
    ],
    "serving": [
      "Server ferskfylt som dessert."
    ],
    "commonMistakes": [
      "Ikke fyll skallene lenge før servering."
    ],
    "relatedDishIds": [
      "arancini",
      "pasta-alla-norma"
    ],
    "sources": []
  },
  {
    "dishId": "quesadilla",
    "summary": "Meksikansk tortilla med fyll, brettet og varmet på stekeplate.",
    "overview": "Ost er vanlig, men fyllet og bruken av ost varierer regionalt.",
    "history": "Quesadilla finnes i mange former i meksikansk hverdagsmat og gatemat.",
    "flavor": "Ristet tortilla med saftig fyll og eventuelt smeltet ost.",
    "technique": "Stek på middels varme slik at tortillaen ikke brenner før fyllet er varmt.",
    "essentials": [
      "8 tortillas",
      "250 g smelteost",
      "150 g sopp"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "8 tortillas",
        "250 g smelteost",
        "150 g sopp",
        "1 løk",
        "olje",
        "salsa"
      ],
      "steps": [
        "Stek sopp og løk til væsken er fordampet.",
        "Legg fyll og ost på tortillaene.",
        "Brett og stek på begge sider.",
        "Skjær opp og server med salsa."
      ]
    },
    "variants": [
      "Fyll kan være sopp, squashblomster eller kjøtt; ost er ikke obligatorisk alle steder."
    ],
    "serving": [
      "Server med salsa og eventuelt guacamole."
    ],
    "commonMistakes": [
      "Unngå for vått eller stort fyll."
    ],
    "relatedDishIds": [
      "tacos-al-pastor",
      "birria"
    ],
    "sources": []
  },
  {
    "dishId": "bibimbap",
    "summary": "Koreansk risrett med grønnsaker, gochujang og ofte egg eller kjøtt.",
    "overview": "Ingrediensene tilberedes separat og blandes med ris ved bordet.",
    "history": "Bibimbap finnes i flere regionale former, blant annet i Jeonju.",
    "flavor": "Sterk, nøtteaktig og frisk, med kontraster mellom grønnsakene.",
    "technique": "Stek eller blancher grønnsakene hver for seg.",
    "essentials": [
      "400 g kokt ris",
      "200 g spinat",
      "2 gulrøtter"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "400 g kokt ris",
        "200 g spinat",
        "2 gulrøtter",
        "150 g bønnespirer",
        "4 egg",
        "gochujang",
        "sesamolje"
      ],
      "steps": [
        "Tilbered grønnsakene separat og smak til med sesamolje.",
        "Stek eggene etter ønske.",
        "Fordel varm ris i skåler og legg på grønnsaker og egg.",
        "Server med gochujang og bland før måltidet."
      ]
    },
    "variants": [
      "Dolsot bibimbap serveres i en varm steinskål."
    ],
    "serving": [
      "Server med kimchi."
    ],
    "commonMistakes": [
      "Unngå å gjøre alle grønnsakene bløte."
    ],
    "relatedDishIds": [
      "bulgogi",
      "japchae"
    ],
    "sources": []
  },
  {
    "dishId": "bulgogi",
    "summary": "Tynne skiver marinert koreansk storfekjøtt, stekt eller grillet.",
    "overview": "Soyasaus, hvitløk, sukker og sesamolje gir kjøttet karakteristisk smak.",
    "history": "Bulgogi er en kjent del av koreansk grillmat.",
    "flavor": "Søtlig, salt og ristet.",
    "technique": "Skjær kjøttet tynt på tvers av fibrene og stek i små omganger.",
    "essentials": [
      "500 g storfekjøtt",
      "3 ss soyasaus",
      "1 ss sukker"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 25 min + marinering",
      "ingredients": [
        "500 g storfekjøtt",
        "3 ss soyasaus",
        "1 ss sukker",
        "2 hvitløksfedd",
        "1 ss sesamolje",
        "1 liten pære",
        "vårløk"
      ],
      "steps": [
        "Riv pæren og bland marinaden.",
        "Skjær kjøttet tynt og mariner i kjøleskap i 30 minutter.",
        "Stek i små omganger til kjøttet er ferdig.",
        "Topp med vårløk."
      ]
    },
    "variants": [
      "Varianter med svin eller sterk marinade finnes også."
    ],
    "serving": [
      "Server med ris, salatblader og banchan."
    ],
    "commonMistakes": [
      "Ikke overfyll stekepannen."
    ],
    "relatedDishIds": [
      "bibimbap",
      "samgyeopsal"
    ],
    "sources": []
  },
  {
    "dishId": "japchae",
    "summary": "Koreanske glassnudler av søtpotetstivelse med grønnsaker og soyasesamsaus.",
    "overview": "Nudlene blandes med stekte grønnsaker og eventuelt kjøtt.",
    "history": "Japchae serveres både til fest og som hverdagsmat i Korea.",
    "flavor": "Elastiske nudler, mild sødme og sesamaroma.",
    "technique": "Tilbered grønnsakene separat for å bevare teksturen.",
    "essentials": [
      "200 g dangmyeon",
      "1 gulrot",
      "1 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "200 g dangmyeon",
        "1 gulrot",
        "1 løk",
        "150 g spinat",
        "100 g sopp",
        "3 ss soyasaus",
        "sesamolje",
        "sukker"
      ],
      "steps": [
        "Kok nudlene etter pakningsanvisningen.",
        "Stek løk, gulrot og sopp; blancher spinaten.",
        "Bland nudlene med grønnsakene, soyasaus og litt sukker.",
        "Smak til med sesamolje."
      ]
    },
    "variants": [
      "Varianter med storfekjøtt eller uten kjøtt."
    ],
    "serving": [
      "Server lun eller ved romtemperatur som del av måltidet."
    ],
    "commonMistakes": [
      "Ikke overkok glassnudlene."
    ],
    "relatedDishIds": [
      "bibimbap",
      "bulgogi"
    ],
    "sources": []
  },
  {
    "dishId": "kimchi-jjigae",
    "summary": "Koreansk gryte med fermentert kimchi, tofu og ofte svinekjøtt.",
    "overview": "Moden kimchi gir gryten syre, chili og umami.",
    "history": "Kimchi jjigae er en vanlig koreansk hjemmerett.",
    "flavor": "Syrlig, sterk og fyldig.",
    "technique": "Bruk godt modnet kimchi og la gryten småkoke.",
    "essentials": [
      "300 g kimchi",
      "200 g tofu",
      "200 g svinekjøtt"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "300 g kimchi",
        "200 g tofu",
        "200 g svinekjøtt",
        "500 ml kraft",
        "1 løk",
        "gochugaru"
      ],
      "steps": [
        "Stek svinekjøtt og kimchi kort.",
        "Tilsett kraft, løk og chili etter smak.",
        "La småkoke til kjøttet er gjennomstekt.",
        "Tilsett tofu mot slutten."
      ]
    },
    "variants": [
      "Varianter med tunfisk eller uten kjøtt."
    ],
    "serving": [
      "Server med ris og små sideretter."
    ],
    "commonMistakes": [
      "Ikke salt før du har smakt på kimchikraften."
    ],
    "relatedDishIds": [
      "bibimbap",
      "samgyeopsal"
    ],
    "sources": []
  },
  {
    "dishId": "tteokbokki",
    "summary": "Koreanske riskaker i en søtlig og sterk chilisaus.",
    "overview": "Sylindriske riskaker kokes i en saus med gochujang.",
    "history": "Den røde, sterke varianten er kjent fra koreansk gatemat.",
    "flavor": "Seig, myk og søtsterk.",
    "technique": "La riskakene småkoke til de blir møre og sausen tykner.",
    "essentials": [
      "400 g koreanske riskaker",
      "500 ml kraft",
      "2 ss gochujang"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "400 g koreanske riskaker",
        "500 ml kraft",
        "2 ss gochujang",
        "1 ss sukker",
        "1 ss soyasaus",
        "vårløk"
      ],
      "steps": [
        "Bløtlegg riskakene ved behov etter pakningen.",
        "Kok opp kraft med gochujang, sukker og soyasaus.",
        "Tilsett riskakene og småkok under omrøring til møre.",
        "Topp med vårløk."
      ]
    },
    "variants": [
      "Gungjung tteokbokki bruker en soyabasert saus."
    ],
    "serving": [
      "Server gjerne med fiskekaker eller kokt egg."
    ],
    "commonMistakes": [
      "Ikke la sausen koke tørr før riskakene er møre."
    ],
    "relatedDishIds": [
      "japchae",
      "kimchi-jjigae"
    ],
    "sources": []
  },
  {
    "dishId": "samgyeopsal",
    "summary": "Koreansk grillrett av skiver av svinebuk.",
    "overview": "Kjøttet grilles gjerne ved bordet og spises med salatblader og tilbehør.",
    "history": "Samgyeopsal er vanlig i koreansk sosial grillmatkultur.",
    "flavor": "Fyldig og ristet, balansert av friskt tilbehør.",
    "technique": "Grill i moderate omganger og la fettet renne av.",
    "essentials": [
      "600 g svinebuk i skiver",
      "salatblader",
      "hvitløk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–45 min",
      "ingredients": [
        "600 g svinebuk i skiver",
        "salatblader",
        "hvitløk",
        "ssamjang",
        "kimchi",
        "ris"
      ],
      "steps": [
        "Grill kjøttet på varm grill eller panne til gjennomstekt.",
        "Skjær i munnfuller med ren saks eller kniv.",
        "Legg kjøtt, ssamjang og tilbehør i salatblad.",
        "Server straks."
      ]
    },
    "variants": [
      "Tykkelsen på kjøttskivene varierer; kjøttet kan serveres umarinert."
    ],
    "serving": [
      "Server med kimchi, ris og hvitløk."
    ],
    "commonMistakes": [
      "Unngå å bruke samme redskap til rått og ferdig kjøtt uten vask."
    ],
    "relatedDishIds": [
      "bulgogi",
      "kimchi-jjigae"
    ],
    "sources": []
  },
  {
    "dishId": "banh-xeo",
    "summary": "Sprø vietnamesisk rispannekake med gurkemeie, bønnespirer og ofte reker eller svin.",
    "overview": "En tynn røre stekes sprø og brettes over fyllet.",
    "history": "Retten finnes i flere regionale former i Vietnam.",
    "flavor": "Sprø, mildt krydret og frisk med urter.",
    "technique": "Bruk en varm panne og et tynt lag røre.",
    "essentials": [
      "200 g rismel",
      "300 ml vann",
      "100 ml kokosmelk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "200 g rismel",
        "300 ml vann",
        "100 ml kokosmelk",
        "½ ts gurkemeie",
        "200 g reker",
        "150 g bønnespirer",
        "olje"
      ],
      "steps": [
        "Bland mel, vann, kokosmelk og gurkemeie.",
        "Stek rekene til gjennomstekte.",
        "Hell et tynt lag røre i varm oljet panne.",
        "Tilsett reker og spirer, stek til sprø og brett."
      ]
    },
    "variants": [
      "Små pannekaker i sentrale Vietnam og større varianter i sør."
    ],
    "serving": [
      "Server med salat, urter og nước chấm."
    ],
    "commonMistakes": [
      "Unngå for tykk røre."
    ],
    "relatedDishIds": [
      "vietnamese-spring-rolls",
      "banh-mi"
    ],
    "sources": []
  },
  {
    "dishId": "bun-bo-hue",
    "summary": "Sterk vietnamesisk nudelsuppe med storfekjøtt, sitrongress og chili.",
    "overview": "Runde risnudler serveres i aromatisk kjøttkraft, ofte med fermentert rekepasta.",
    "history": "Retten er knyttet til Huế i det sentrale Vietnam.",
    "flavor": "Sterk, fyldig og sitruspreget.",
    "technique": "La kraften trekke med sitrongress og smak til gradvis.",
    "essentials": [
      "500 g storfekjøtt til koking",
      "1,5 l kraft",
      "3 stilker sitrongress"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2 timer",
      "ingredients": [
        "500 g storfekjøtt til koking",
        "1,5 l kraft",
        "3 stilker sitrongress",
        "300 g tykke risnudler",
        "chiliolje",
        "fiskesaus",
        "rekepasta etter smak"
      ],
      "steps": [
        "La kjøttet trekke i kraft med banket sitrongress til mørt.",
        "Smak til med fiskesaus, chili og litt rekepasta.",
        "Kok nudlene separat.",
        "Skjær kjøttet og server i kraften med nudler."
      ]
    },
    "variants": [
      "Tradisjonelle varianter kan også inneholde svinekjøtt og andre kjøttprodukter."
    ],
    "serving": [
      "Server med lime, urter og skivet løk."
    ],
    "commonMistakes": [
      "Ikke overdøv kraften med for mye rekepasta."
    ],
    "relatedDishIds": [
      "pho",
      "bun-cha"
    ],
    "sources": []
  },
  {
    "dishId": "cao-lau",
    "summary": "Nudelrett fra Hội An med svinekjøtt, urter og sprøtt tilbehør.",
    "overview": "Faste nudler serveres med lite kraft, krydret kjøtt og grønnsaker.",
    "history": "Cao lầu er nært forbundet med Hội Ans lokale matkultur.",
    "flavor": "Salt, urtefrisk og med kontraster mellom mykt og sprøtt.",
    "technique": "Bruk faste nudler og konsentrert sjy; hjemmevarianten etterligner retten.",
    "essentials": [
      "300 g tykke risnudler",
      "400 g svinekjøtt",
      "2 ss soyasaus"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2 timer",
      "ingredients": [
        "300 g tykke risnudler",
        "400 g svinekjøtt",
        "2 ss soyasaus",
        "hvitløk",
        "200 ml kraft",
        "bønnespirer",
        "urter",
        "sprøtt rispapir"
      ],
      "steps": [
        "Braiser svinekjøttet med soyasaus, hvitløk og kraft til mørt.",
        "Kok nudlene etter anvisning.",
        "Skjær kjøttet og fordel nudler og grønnsaker i skåler.",
        "Tilsett litt sjy og sprøtt rispapir."
      ]
    },
    "variants": [
      "Hjemmevarianten bruker tilgjengelige nudler i stedet for lokale cao lầu-nudler."
    ],
    "serving": [
      "Server med friske urter og lime etter smak."
    ],
    "commonMistakes": [
      "Ikke fyll skålen med kraft som en suppe."
    ],
    "relatedDishIds": [
      "pho",
      "bun-cha"
    ],
    "sources": []
  },
  {
    "dishId": "com-tam",
    "summary": "Vietnamesisk brutt ris, ofte med grillet svinekotelett.",
    "overview": "Små riskorn serveres med kjøtt, syltede grønnsaker og fiskesausdressing.",
    "history": "Cơm tấm forbindes særlig med sørlige Vietnam og Ho Chi Minh-byen.",
    "flavor": "Søtlig, salt, ristet og frisk.",
    "technique": "Mariner kjøttet og tilbered risen separat.",
    "essentials": [
      "300 g brutt ris",
      "4 svinekoteletter",
      "2 ss fiskesaus"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min + marinering",
      "ingredients": [
        "300 g brutt ris",
        "4 svinekoteletter",
        "2 ss fiskesaus",
        "1 ss sukker",
        "hvitløk",
        "agurk",
        "syltet gulrot"
      ],
      "steps": [
        "Mariner kotelettene i fiskesaus, sukker og hvitløk i kjøleskap.",
        "Kok risen etter pakningen.",
        "Grill kjøttet til ferdig.",
        "Server med agurk, syltet gulrot og dressing."
      ]
    },
    "variants": [
      "Kan også serveres med dampet egg- og kjøttpudding eller strimlet svineskinn."
    ],
    "serving": [
      "Server med nước chấm og vårløkolje."
    ],
    "commonMistakes": [
      "Unngå å brenne den sukkerholdige marinaden."
    ],
    "relatedDishIds": [
      "bun-cha",
      "banh-mi"
    ],
    "sources": []
  },
  {
    "dishId": "bun-rieu",
    "summary": "Vietnamesisk risnudelsuppe med tomat og ofte krabbefyll.",
    "overview": "Kraften får syre fra tomater og smak fra krabbe eller andre sjømatprodukter.",
    "history": "Bún riêu finnes i flere regionale og lokale varianter i Vietnam.",
    "flavor": "Syrlig, frisk og rik på umami.",
    "technique": "La tomatkraften småkoke og tilsett krabbeblandingen forsiktig.",
    "essentials": [
      "300 g risnudler",
      "1 l kraft",
      "400 g tomater"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "300 g risnudler",
        "1 l kraft",
        "400 g tomater",
        "200 g krabbekjøtt",
        "2 egg",
        "200 g tofu",
        "fiskesaus"
      ],
      "steps": [
        "Kok tomater i kraft til myke.",
        "Bland krabbekjøtt med egg og legg små porsjoner i småkokende kraft.",
        "La eggblandingen bli gjennomkokt og tilsett tofu.",
        "Kok nudler separat og server med kraften."
      ]
    },
    "variants": [
      "Varianter med snegler, tofu eller ulike kjøttprodukter."
    ],
    "serving": [
      "Server med urter og lime."
    ],
    "commonMistakes": [
      "Ikke rør kraftig mens krabbeblandingen setter seg."
    ],
    "relatedDishIds": [
      "pho",
      "bun-bo-hue"
    ],
    "sources": []
  },
  {
    "dishId": "banh-cuon",
    "summary": "Tynne dampede risplater, ofte rullet rundt svinekjøtt og sopp.",
    "overview": "Myke risplater fylles med stekt kjøtt og finhakket sopp.",
    "history": "Retten er særlig kjent fra nordvietnamesisk frokosttradisjon.",
    "flavor": "Myk, mild og aromatisk med salt-syrlig dipp.",
    "technique": "Bruk tynn røre og kort damptid; en panne med lokk kan brukes hjemme.",
    "essentials": [
      "150 g rismel",
      "50 g tapiokastivelse",
      "450 ml vann"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "150 g rismel",
        "50 g tapiokastivelse",
        "450 ml vann",
        "250 g svinekjøttdeig",
        "30 g tørket tresopp",
        "løk",
        "olje"
      ],
      "steps": [
        "Bland mel, stivelse og vann og la røren hvile.",
        "Bløtlegg soppen og stek den med løk og kjøtt til gjennomstekt.",
        "Hell et tynt lag røre i lett oljet panne, dekk til og damp til platen setter seg.",
        "Løft platen forsiktig ut, fyll og rull."
      ]
    },
    "variants": [
      "Bánh cuốn kan også serveres uten kjøttfyll."
    ],
    "serving": [
      "Server med stekt sjalottløk og nước chấm."
    ],
    "commonMistakes": [
      "Ikke stek risplatene til de blir sprø."
    ],
    "relatedDishIds": [
      "vietnamese-spring-rolls",
      "banh-xeo"
    ],
    "sources": []
  },
  {
    "dishId": "massaman-curry",
    "summary": "Thailandsk curry med kokosmelk, poteter, peanøtter og varme krydder.",
    "overview": "Kjøtt og poteter trekkes i en fyldig saus med massamanpasta.",
    "history": "Massaman er en thailandsk currytradisjon med muslimske og sørasiatiske kulinariske forbindelser.",
    "flavor": "Mildt sterk, søtlig, syrlig og nøtteaktig.",
    "technique": "La kjøttet bli mørt før potetene kokes ferdig.",
    "essentials": [
      "500 g storfekjøtt til gryte",
      "400 ml kokosmelk",
      "3 ss massamanpasta"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2 timer",
      "ingredients": [
        "500 g storfekjøtt til gryte",
        "400 ml kokosmelk",
        "3 ss massamanpasta",
        "300 g poteter",
        "1 løk",
        "50 g peanøtter",
        "tamarind og fiskesaus"
      ],
      "steps": [
        "Fres currypasta i litt kokosmelk.",
        "Tilsett kjøtt og resten av kokosmelken; la trekke til mørt.",
        "Tilsett poteter og løk og kok til møre.",
        "Smak til med tamarind og fiskesaus, topp med peanøtter."
      ]
    },
    "variants": [
      "Kylling og tofu kan brukes i stedet for storfekjøtt."
    ],
    "serving": [
      "Server med jasminris."
    ],
    "commonMistakes": [
      "Ikke kok potetene like lenge som seigt grytekjøtt."
    ],
    "relatedDishIds": [
      "green-curry",
      "panang-curry"
    ],
    "sources": []
  },
  {
    "dishId": "panang-curry",
    "summary": "Fyldig thailandsk curry med kokosmelk, rød currypasta og makrutlimeblader.",
    "overview": "Panang har gjerne en tykkere saus enn mange andre thailandske curryer.",
    "history": "Retten er en etablert del av thailandsk currykultur.",
    "flavor": "Kremet, salt, søtlig og aromatisk.",
    "technique": "Reduser kokosmelken forsiktig før kjøttet tilsettes.",
    "essentials": [
      "400 g storfekjøtt i tynne skiver",
      "400 ml kokosmelk",
      "2 ss panangpasta"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 25–40 min",
      "ingredients": [
        "400 g storfekjøtt i tynne skiver",
        "400 ml kokosmelk",
        "2 ss panangpasta",
        "4 makrutlimeblader",
        "fiskesaus",
        "palmesukker"
      ],
      "steps": [
        "Fres pastaen i den tykke delen av kokosmelken.",
        "Tilsett resten av melken og la sausen tykne litt.",
        "Tilsett kjøttet og kok til ferdig.",
        "Smak til med fiskesaus og sukker; topp med finsnittede limeblader."
      ]
    },
    "variants": [
      "Varianter med kylling eller tofu."
    ],
    "serving": [
      "Server med ris."
    ],
    "commonMistakes": [
      "Ikke fortynn sausen unødvendig med mye vann."
    ],
    "relatedDishIds": [
      "massaman-curry",
      "green-curry"
    ],
    "sources": []
  },
  {
    "dishId": "som-tam",
    "summary": "Thailandsk salat av strimlet grønn papaya med lime, chili og fiskesaus.",
    "overview": "Papayaen vendes med en dressing som støtes sammen i morter.",
    "history": "Grønn papayasalat har sterke tradisjoner i Laos og nordøstlige Thailand, med flere lokale former.",
    "flavor": "Sprø, syrlig, sterk og salt.",
    "technique": "Støt dressingen lett og vend inn papayaen uten å knuse den.",
    "essentials": [
      "400 g grønn papaya",
      "2 lime",
      "2 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 25–40 min",
      "ingredients": [
        "400 g grønn papaya",
        "2 lime",
        "2 hvitløksfedd",
        "chili etter smak",
        "2 ss fiskesaus",
        "1 ss palmesukker",
        "cherrytomater",
        "peanøtter"
      ],
      "steps": [
        "Skrell og strimle papayaen.",
        "Støt hvitløk og chili i morter.",
        "Bland inn lime, fiskesaus og sukker.",
        "Vend inn tomater, papaya og peanøtter."
      ]
    },
    "variants": [
      "Som tam Thai og varianter med fermentert fisk."
    ],
    "serving": [
      "Server med klebrig ris og grillmat."
    ],
    "commonMistakes": [
      "Unngå moden, søt papaya dersom målet er sprø grønn papayasalat."
    ],
    "relatedDishIds": [
      "pad-kra-pao",
      "khao-pad"
    ],
    "sources": []
  },
  {
    "dishId": "tom-kha-gai",
    "summary": "Thailandsk kokossuppe med kylling, galangal og sitrongress.",
    "overview": "Kokosmelk gir fylde mens galangal og lime gir karakteristisk aroma.",
    "history": "Tom kha er en kjent thailandsk suppetype; gai betegner kylling.",
    "flavor": "Kremet, syrlig og aromatisk med moderat chilivarme.",
    "technique": "Trekk aromatene i kraften og tilsett limesaft til slutt.",
    "essentials": [
      "400 g kylling",
      "400 ml kokosmelk",
      "500 ml kraft"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 25–40 min",
      "ingredients": [
        "400 g kylling",
        "400 ml kokosmelk",
        "500 ml kraft",
        "galangal",
        "2 stilker sitrongress",
        "makrutlimeblader",
        "150 g sopp",
        "lime",
        "fiskesaus"
      ],
      "steps": [
        "Varm kraft med galangal, sitrongress og limeblader.",
        "Tilsett kokosmelk, kylling og sopp.",
        "La småkoke til kyllingen er gjennomstekt.",
        "Smak til med lime og fiskesaus."
      ]
    },
    "variants": [
      "Tom kha med sopp eller sjømat."
    ],
    "serving": [
      "Server med ris eller som del av et større måltid."
    ],
    "commonMistakes": [
      "Ikke erstatt galangal med ingefær uten å regne med en annen smak."
    ],
    "relatedDishIds": [
      "tom-yum",
      "green-curry"
    ],
    "sources": []
  },
  {
    "dishId": "pad-see-ew",
    "summary": "Thailandske brede risnudler stekt med soyasaus, egg og grønnsaker.",
    "overview": "Nudlene wokstekes med mørk soyasaus, ofte sammen med kinesisk brokkoli og kjøtt.",
    "history": "Retten tilhører thailandsk nudelmat med kinesisk kulinarisk innflytelse.",
    "flavor": "Salt, lett søt og ristet.",
    "technique": "Stek små porsjoner på høy varme slik at nudlene får stekeskorpe.",
    "essentials": [
      "400 g brede risnudler",
      "250 g kylling",
      "2 egg"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 25–40 min",
      "ingredients": [
        "400 g brede risnudler",
        "250 g kylling",
        "2 egg",
        "200 g gai lan",
        "2 ss soyasaus",
        "1 ss mørk soyasaus",
        "hvitløk",
        "olje"
      ],
      "steps": [
        "Klargjør nudlene etter pakningen.",
        "Stek hvitløk og kylling til gjennomstekt.",
        "Tilsett egg og grønnsaker.",
        "Vend inn nudler og soyasaus og stek raskt på høy varme."
      ]
    },
    "variants": [
      "Varianter med svin, storfekjøtt eller tofu."
    ],
    "serving": [
      "Server med chili i eddik etter smak."
    ],
    "commonMistakes": [
      "Ikke overfyll woken eller rør så hardt at nudlene går i stykker."
    ],
    "relatedDishIds": [
      "pad-thai",
      "khao-pad"
    ],
    "sources": []
  },
  {
    "dishId": "khao-pad",
    "summary": "Thailandsk stekt ris med egg, grønnsaker og ofte kjøtt eller sjømat.",
    "overview": "Kokt ris stekes med aromater og smakstilsetninger i varm panne.",
    "history": "Khao pad er en utbredt thailandsk hverdags- og restaurantrett.",
    "flavor": "Mildt salt, aromatisk og ristet.",
    "technique": "Bruk avkjølt ris som er oppbevart forsvarlig, og stek raskt ved høy varme.",
    "essentials": [
      "600 g kokt ris",
      "2 egg",
      "250 g kylling"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 25–40 min",
      "ingredients": [
        "600 g kokt ris",
        "2 egg",
        "250 g kylling",
        "2 hvitløksfedd",
        "1 løk",
        "vårløk",
        "fiskesaus",
        "lime"
      ],
      "steps": [
        "Stek hvitløk, løk og kylling til gjennomstekt.",
        "Tilsett egg og rør til de setter seg.",
        "Vend inn risen og stek til rykende varm.",
        "Smak til med fiskesaus og topp med vårløk."
      ]
    },
    "variants": [
      "Khao pad goong med reker og khao pad gai med kylling."
    ],
    "serving": [
      "Server med lime, agurk og eventuelt chili i fiskesaus."
    ],
    "commonMistakes": [
      "Ikke bruk ris som har stått lenge i romtemperatur."
    ],
    "relatedDishIds": [
      "pad-see-ew",
      "pad-kra-pao"
    ],
    "sources": []
  },
  {
    "dishId": "chicken-tikka-masala-pakistan",
    "summary": "Marinerte, grillede kyllingbiter i en krydret tomatbasert saus.",
    "overview": "Kylling tikka kombineres med en kremet masalasaus.",
    "history": "Retten har sørasiatiske røtter og er særlig kjent fra britisk curryrestauranttradisjon. Det nøyaktige opphavet er omdiskutert.",
    "flavor": "Fyldig, lett syrlig og aromatisk.",
    "technique": "Mariner kyllingen, grill den separat og la den bli ferdig i sausen.",
    "essentials": [
      "600 g kyllinglårfilet",
      "150 g yoghurt",
      "garam masala"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min + marinering",
      "ingredients": [
        "600 g kyllinglårfilet",
        "150 g yoghurt",
        "garam masala",
        "ingefær og hvitløk",
        "400 g tomater",
        "1 løk",
        "100 ml fløte"
      ],
      "steps": [
        "Mariner kyllingen i yoghurt og krydder i kjøleskap.",
        "Grill kyllingen under ovnsgrill.",
        "Stek løk, ingefær og hvitløk, tilsett tomat og krydder og la småkoke.",
        "Tilsett kylling og fløte og kok til kyllingen er gjennomstekt."
      ]
    },
    "variants": [
      "Styrke og mengde fløte varierer."
    ],
    "serving": [
      "Server med ris eller naan."
    ],
    "commonMistakes": [
      "Ikke bruk rå marinade som ferdig saus."
    ],
    "relatedDishIds": [
      "butter-chicken",
      "tandoori"
    ],
    "sources": []
  },
  {
    "dishId": "palak-paneer",
    "summary": "Nordindisk rett med paneer i krydret spinatsaus.",
    "overview": "Spinat pureres til en grønn saus som omgir terninger av ferskost.",
    "history": "Palak paneer forbindes med nordindisk, særlig punjabisk, matkultur.",
    "flavor": "Mild, jordaktig og kremet.",
    "technique": "Forvell spinaten kort for å bevare fargen.",
    "essentials": [
      "400 g spinat",
      "250 g paneer",
      "1 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40–60 min",
      "ingredients": [
        "400 g spinat",
        "250 g paneer",
        "1 løk",
        "2 hvitløksfedd",
        "ingefær",
        "spisskummen",
        "garam masala",
        "olje"
      ],
      "steps": [
        "Forvell spinaten kort og kjør til puré.",
        "Fres løk, hvitløk, ingefær og krydder.",
        "Tilsett spinat og la småkoke kort.",
        "Vend inn paneer og varm gjennom."
      ]
    },
    "variants": [
      "Saag paneer kan inneholde andre bladgrønnsaker enn spinat."
    ],
    "serving": [
      "Server med roti, naan eller ris."
    ],
    "commonMistakes": [
      "Ikke kok spinaten unødvendig lenge."
    ],
    "relatedDishIds": [
      "naan",
      "dal-makhani"
    ],
    "sources": []
  },
  {
    "dishId": "rogan-josh",
    "summary": "Aromatisk kashmirsk kjøttgryte, ofte med lam eller geit.",
    "overview": "Kjøttet braiseres med krydder og chili som gir sausen en rød farge.",
    "history": "Rogan josh har en sentral plass i kashmirsk matkultur, med ulike kryddertradisjoner.",
    "flavor": "Rik, aromatisk og varm uten nødvendigvis å være svært sterk.",
    "technique": "Braiser kjøttet på lav varme til mørt.",
    "essentials": [
      "600 g lammekjøtt til gryte",
      "150 g yoghurt",
      "2 ts kashmirchili"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2 timer",
      "ingredients": [
        "600 g lammekjøtt til gryte",
        "150 g yoghurt",
        "2 ts kashmirchili",
        "1 ts fennikelfrø",
        "tørket ingefær",
        "kardemomme",
        "nellik",
        "olje"
      ],
      "steps": [
        "Brun kjøttet i olje.",
        "Fres krydderne forsiktig.",
        "Rør inn yoghurt gradvis og tilsett litt vann.",
        "La trekke under lokk til kjøttet er mørt."
      ]
    },
    "variants": [
      "Kashmirske varianter varierer blant annet i bruk av løk og hvitløk."
    ],
    "serving": [
      "Server med ris."
    ],
    "commonMistakes": [
      "Ikke la krydderne svi seg i oljen."
    ],
    "relatedDishIds": [
      "biryani",
      "vindaloo"
    ],
    "sources": []
  },
  {
    "dishId": "vindaloo",
    "summary": "Syrlig og krydret gryterett fra Goa, tradisjonelt ofte med svinekjøtt.",
    "overview": "Eddik, hvitløk og chili preger marinaden og sausen.",
    "history": "Vindaloo har forbindelser til portugisisk marineringstradisjon, tilpasset lokale råvarer og krydder i Goa.",
    "flavor": "Syrlig, sterk og aromatisk.",
    "technique": "Mariner kjøttet og braiser det forsiktig.",
    "essentials": [
      "600 g svinekjøtt til gryte",
      "3 ss eddik",
      "5 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2 timer + marinering",
      "ingredients": [
        "600 g svinekjøtt til gryte",
        "3 ss eddik",
        "5 hvitløksfedd",
        "tørket chili",
        "spisskummen",
        "korianderfrø",
        "1 løk",
        "olje"
      ],
      "steps": [
        "Mal chili og krydder med eddik og hvitløk.",
        "Mariner kjøttet i kjøleskap.",
        "Fres løk og tilsett kjøtt og marinade.",
        "Tilsett litt vann og braiser til mørt."
      ]
    },
    "variants": [
      "Restaurantvarianter bruker også kylling eller lam."
    ],
    "serving": [
      "Server med ris eller brød."
    ],
    "commonMistakes": [
      "Ikke gjør retten til bare en sterk chilisaus; syren er viktig."
    ],
    "relatedDishIds": [
      "rogan-josh",
      "biryani"
    ],
    "sources": []
  },
  {
    "dishId": "malai-kofta",
    "summary": "Indisk rett med myke grønnsaks- eller paneerboller i en fyldig saus.",
    "overview": "Boller av potet og paneer stekes eller friteres og serveres med kremet saus.",
    "history": "Retten er kjent fra nordindisk restaurant- og festmat.",
    "flavor": "Mildt krydret, kremet og myk.",
    "technique": "Hold koftabollene forholdsvis tørre før steking.",
    "essentials": [
      "300 g kokte poteter",
      "200 g paneer",
      "2 ss maisstivelse"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40–60 min",
      "ingredients": [
        "300 g kokte poteter",
        "200 g paneer",
        "2 ss maisstivelse",
        "1 løk",
        "300 g tomater",
        "50 g cashewnøtter",
        "100 ml fløte",
        "garam masala",
        "olje"
      ],
      "steps": [
        "Mos potet og paneer, bland med stivelse og form boller.",
        "Stek eller friter bollene til gylne.",
        "Kok løk, tomater og cashewnøtter og kjør glatt.",
        "Smak sausen til med krydder og fløte; legg i bollene rett før servering."
      ]
    },
    "variants": [
      "Kofta kan også lages med andre grønnsaker."
    ],
    "serving": [
      "Server med naan eller ris."
    ],
    "commonMistakes": [
      "Ikke la bollene ligge lenge i sausen før servering."
    ],
    "relatedDishIds": [
      "palak-paneer",
      "naan"
    ],
    "sources": []
  },
  {
    "dishId": "aloo-gobi",
    "summary": "Indisk grønnsaksrett med poteter, blomkål og krydder.",
    "overview": "Poteter og blomkål stekes eller trekkes sammen med aromater.",
    "history": "Aloo gobi er vanlig i nordindisk og pakistansk hjemmemat.",
    "flavor": "Jordaktig, mildt sterk og aromatisk.",
    "technique": "Tilpass koketiden slik at blomkålen beholder formen.",
    "essentials": [
      "400 g poteter",
      "1 liten blomkål",
      "1 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40–60 min",
      "ingredients": [
        "400 g poteter",
        "1 liten blomkål",
        "1 løk",
        "2 tomater",
        "ingefær",
        "spisskummen",
        "gurkemeie",
        "koriander",
        "olje"
      ],
      "steps": [
        "Fres spisskummen, løk og ingefær.",
        "Tilsett tomat og krydder.",
        "Vend inn potetbiter og litt vann; la trekke under lokk.",
        "Tilsett blomkål og kok til grønnsakene er møre."
      ]
    },
    "variants": [
      "Tørre og mer sausete varianter finnes."
    ],
    "serving": [
      "Server med roti og dal."
    ],
    "commonMistakes": [
      "Ikke tilsett for mye vann eller kok blomkålen til mos."
    ],
    "relatedDishIds": [
      "chana-masala",
      "palak-paneer"
    ],
    "sources": []
  },
  {
    "dishId": "lasagne-alla-bolognese",
    "summary": "Ovnsbakt pasta med lag av ragù, béchamel og parmesan.",
    "overview": "Pastaplater legges lagvis med kjøttsaus og hvit saus.",
    "history": "Retten forbindes med Bologna og Emilia-Romagnas tradisjon for fersk pasta.",
    "flavor": "Fyldig, kremet og med gratinert overflate.",
    "technique": "Kok ragùen langsomt og fordel sausene jevnt.",
    "essentials": [
      "250 g lasagneplater",
      "400 g kjøttdeig",
      "1 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2 timer",
      "ingredients": [
        "250 g lasagneplater",
        "400 g kjøttdeig",
        "1 løk",
        "1 gulrot",
        "1 selleristilk",
        "400 g tomater",
        "500 ml melk",
        "40 g smør",
        "40 g mel",
        "80 g parmesan"
      ],
      "steps": [
        "Fres finhakkede grønnsaker og brun kjøttet.",
        "Tilsett tomater og la sausen småkoke i minst en time.",
        "Lag béchamel av smør, mel og melk.",
        "Legg sausene og pastaplatene lagvis i en form, topp med parmesan.",
        "Stek ved 190 °C til pastaen er mør og toppen gyllen."
      ]
    },
    "variants": [
      "Grønne spinatpastaplater brukes tradisjonelt i Bologna."
    ],
    "serving": [
      "La lasagnen hvile før den skjæres opp."
    ],
    "commonMistakes": [
      "Ikke la tørre pastaplater ligge uten tilstrekkelig saus."
    ],
    "relatedDishIds": [
      "carbonara",
      "amatriciana"
    ],
    "sources": []
  },
  {
    "dishId": "risotto-alla-milanese",
    "summary": "Kremet risotto fra Milano med safran og parmesan.",
    "overview": "Ris kokes gradvis med kraft og avsluttes med smør og ost.",
    "history": "Safranrisotto er en klassisk rett i Milano, ofte servert sammen med ossobuco.",
    "flavor": "Mildt nøtteaktig, aromatisk og fyldig.",
    "technique": "Bruk varm kraft og avslutt med smør og ost utenfor varmen.",
    "essentials": [
      "320 g carnaroliris",
      "1 liten løk",
      "1 l varm kraft"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 35 min",
      "ingredients": [
        "320 g carnaroliris",
        "1 liten løk",
        "1 l varm kraft",
        "1 dl hvitvin eller ekstra kraft",
        "safran",
        "50 g smør",
        "60 g parmesan"
      ],
      "steps": [
        "Fres løk i litt smør og tilsett risen.",
        "Tilsett vin eller kraft og la væsken trekke inn.",
        "Tilsett varm kraft gradvis under omrøring.",
        "Rør inn safran mot slutten og kok til risen er al dente.",
        "Ta av varmen og rør inn smør og parmesan."
      ]
    },
    "variants": [
      "Tradisjonelle varianter kan inneholde oksemarg."
    ],
    "serving": [
      "Server straks, alene eller med ossobuco."
    ],
    "commonMistakes": [
      "Ikke kok risen til grøt eller la risottoen bli tørr."
    ],
    "relatedDishIds": [
      "ossobuco",
      "arancini"
    ],
    "sources": []
  },
  {
    "dishId": "ossobuco",
    "summary": "Langtidsbraisert kalveskank, gjerne med gremolata.",
    "overview": "Skanken braiseres med grønnsaker og kraft til kjøttet blir mørt.",
    "history": "Ossobuco alla milanese hører til Milanos klassiske kjøkken.",
    "flavor": "Fyldig kjøttsmak med frisk sitron og persille.",
    "technique": "Braiser på lav varme under lokk.",
    "essentials": [
      "4 skiver kalveskank",
      "1 løk",
      "1 gulrot"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2,5 timer",
      "ingredients": [
        "4 skiver kalveskank",
        "1 løk",
        "1 gulrot",
        "1 selleristilk",
        "500 ml kraft",
        "mel",
        "olje",
        "persille",
        "sitron",
        "hvitløk"
      ],
      "steps": [
        "Vend skankene lett i mel og brun dem.",
        "Fres hakkede grønnsaker og tilsett kraft.",
        "Legg kjøttet tilbake og braiser under lokk til mørt, rundt to timer.",
        "Bland hakket persille, sitronskall og hvitløk og strø over."
      ]
    },
    "variants": [
      "Varianter med tomat finnes, mens lyse sauser også er tradisjonelle."
    ],
    "serving": [
      "Server med risotto alla milanese eller polenta."
    ],
    "commonMistakes": [
      "Unngå hard koking som kan gjøre kjøttet tørt."
    ],
    "relatedDishIds": [
      "risotto-alla-milanese",
      "saltimbocca"
    ],
    "sources": []
  },
  {
    "dishId": "gnocchi-al-pesto",
    "summary": "Myke potetgnocchi vendt i basilikumpesto.",
    "overview": "Potetbaserte deigputer kombineres med pesto av basilikum, pinjekjerner, ost og olivenolje.",
    "history": "Pesto alla genovese har røtter i Liguria, mens gnocchi finnes i mange italienske regioner.",
    "flavor": "Urtefrisk, nøtteaktig og myk.",
    "technique": "Bruk lite mel i potetdeigen og vend pestoen inn uten sterk varme.",
    "essentials": [
      "600 g melne poteter",
      "150 g hvetemel, omtrent",
      "1 egg"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 60 min",
      "ingredients": [
        "600 g melne poteter",
        "150 g hvetemel, omtrent",
        "1 egg",
        "40 g basilikum",
        "25 g pinjekjerner",
        "50 g parmesan",
        "1 hvitløksfedd",
        "olivenolje"
      ],
      "steps": [
        "Kok potetene møre, skrell og mos dem.",
        "Bland forsiktig med egg og akkurat nok mel til en formbar deig.",
        "Rull ut, skjær i biter og kok til de flyter opp.",
        "Støt eller miks pestoingrediensene og vend inn med litt kokevann."
      ]
    },
    "variants": [
      "Pesto kan også inneholde pecorino i tillegg til parmesan."
    ],
    "serving": [
      "Server med revet ost."
    ],
    "commonMistakes": [
      "Ikke elt inn så mye mel at gnocchiene blir tunge."
    ],
    "relatedDishIds": [
      "pasta-alla-norma",
      "cacio-e-pepe"
    ],
    "sources": []
  },
  {
    "dishId": "tiramisu",
    "summary": "Italiensk dessert med kaffe, savoiardi, mascarpone og kakao.",
    "overview": "Kjeks dyppes kort i kaffe og legges lagvis med mascarponekrem.",
    "history": "Tiramisu forbindes særlig med det nordøstlige Italia; opphavet er omdiskutert.",
    "flavor": "Kremet, søtlig og bittersøt fra kaffe og kakao.",
    "technique": "Bruk avkjølt kaffe og la desserten sette seg i kjøleskap.",
    "essentials": [
      "250 g savoiardi",
      "500 g mascarpone",
      "250 ml kremfløte"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 25 min + 4 timer kjøling",
      "ingredients": [
        "250 g savoiardi",
        "500 g mascarpone",
        "250 ml kremfløte",
        "70 g sukker",
        "250 ml sterk kaffe",
        "kakao"
      ],
      "steps": [
        "Pisk fløte og sukker og vend forsiktig inn mascarpone.",
        "Dypp kjeksene raskt i kald kaffe.",
        "Legg kjeks og krem lagvis i en form.",
        "Avkjøl i minst fire timer og sikt kakao over før servering."
      ]
    },
    "variants": [
      "Denne hjemmevarianten er uten rå egg; klassiske varianter bruker ofte egg."
    ],
    "serving": [
      "Server kald i porsjoner."
    ],
    "commonMistakes": [
      "Ikke bløtlegg kjeksene så lenge at de går i oppløsning."
    ],
    "relatedDishIds": [
      "cannoli"
    ],
    "sources": []
  },
  {
    "dishId": "focaccia",
    "summary": "Italiensk flatbrød med olivenolje, ofte toppet med salt.",
    "overview": "En hevet deig presses ut i en oljet form og får karakteristiske groper.",
    "history": "Focaccia finnes i mange italienske regioner; den genovesiske varianten er særlig kjent.",
    "flavor": "Myk, luftig og salt med gyllen skorpe.",
    "technique": "La deigen heve godt og bruk olivenolje i formen.",
    "essentials": [
      "500 g hvetemel",
      "380 ml vann",
      "5 g tørrgjær"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min + heving",
      "ingredients": [
        "500 g hvetemel",
        "380 ml vann",
        "5 g tørrgjær",
        "10 g salt",
        "olivenolje",
        "flaksalt"
      ],
      "steps": [
        "Bland mel, vann, gjær og salt til en klebrig deig.",
        "La heve til luftig, gjerne med noen brettinger underveis.",
        "Fordel i oljet form og la etterheve.",
        "Lag groper med oljede fingre, drypp over olje og strø salt.",
        "Stek ved 220 °C til gyllen."
      ]
    },
    "variants": [
      "Focaccia barese toppes ofte med tomater og oliven."
    ],
    "serving": [
      "Server som brød til måltidet eller som mellommåltid."
    ],
    "commonMistakes": [
      "Ikke press ut all luften under formingen."
    ],
    "relatedDishIds": [
      "pizza-margherita",
      "pizza-marinara"
    ],
    "sources": []
  }
];
