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
  },
  {
    "dishId": "tempura",
    "summary": "Japansk frityrrett med sjømat eller grønnsaker i lett, sprø røre.",
    "overview": "Råvarene dyppes i kald melrøre og friteres raskt.",
    "history": "Tempura ble utviklet i Japan med historiske forbindelser til portugisisk mattradisjon.",
    "flavor": "Lett, sprø og mild.",
    "technique": "Bland røren kort og hold den kald.",
    "essentials": [
      "200 g reker",
      "200 g grønnsaker",
      "100 g hvetemel"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–50 min",
      "ingredients": [
        "200 g reker",
        "200 g grønnsaker",
        "100 g hvetemel",
        "150 ml iskaldt vann",
        "1 egg",
        "frityrolje"
      ],
      "steps": [
        "Tørk råvarene godt.",
        "Bland egg, vann og mel kort.",
        "Dypp råvarene i røren.",
        "Friter i små omganger ved 170–180 °C til gjennomstekt og sprø."
      ]
    },
    "variants": [
      "Ebi tempura med reker og yasai tempura med grønnsaker."
    ],
    "serving": [
      "Server med tentsuyu eller salt."
    ],
    "commonMistakes": [
      "Ikke overarbeid røren."
    ],
    "relatedDishIds": [
      "udon",
      "katsu"
    ],
    "sources": []
  },
  {
    "dishId": "okonomiyaki",
    "summary": "Japansk matpannekake med kål, egg og ulike fyll.",
    "overview": "Osaka-varianten blander kål i røren, mens Hiroshima-varianten ofte bygges i lag.",
    "history": "Retten forbindes særlig med Osaka og Hiroshima.",
    "flavor": "Saftig, ristet og søt-salt fra sausen.",
    "technique": "Stek på middels varme til midten er ferdig.",
    "essentials": [
      "250 g kål",
      "150 g hvetemel",
      "150 ml dashi"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–50 min",
      "ingredients": [
        "250 g kål",
        "150 g hvetemel",
        "150 ml dashi",
        "2 egg",
        "150 g tynne svinekjøttskiver",
        "okonomiyakisaus",
        "majones"
      ],
      "steps": [
        "Bland mel, dashi og egg.",
        "Vend inn finsnittet kål.",
        "Form pannekaker i oljet panne og legg kjøtt på toppen.",
        "Vend og stek til kjøtt og røre er gjennomstekt."
      ]
    },
    "variants": [
      "Hiroshima-stil med lag og nudler."
    ],
    "serving": [
      "Topp med saus, majones og gjerne bonito og aonori."
    ],
    "commonMistakes": [
      "Ikke press pannekaken flat under steking."
    ],
    "relatedDishIds": [
      "takoyaki",
      "yakitori"
    ],
    "sources": []
  },
  {
    "dishId": "takoyaki",
    "summary": "Runde japanske småkaker med blekksprut, stekt i spesialpanne.",
    "overview": "Flytende dashi-røre fylles med kokt blekksprut og vendes i halvkuleformede fordypninger.",
    "history": "Takoyaki er særlig forbundet med Osakas gatemat.",
    "flavor": "Ristet utside og myk, varm kjerne.",
    "technique": "Bruk takoyakipanne og vend kulene gradvis.",
    "essentials": [
      "150 g hvetemel",
      "450 ml dashi",
      "2 egg"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–50 min",
      "ingredients": [
        "150 g hvetemel",
        "450 ml dashi",
        "2 egg",
        "150 g kokt blekksprut",
        "vårløk",
        "syltet ingefær",
        "olje"
      ],
      "steps": [
        "Bland mel, dashi og egg.",
        "Smør og varm takoyakipannen.",
        "Hell i røre og tilsett blekksprut og vårløk.",
        "Vend gradvis med en pinne til kulene er runde og gjennomstekte."
      ]
    },
    "variants": [
      "Hjemmevarianter kan bruke reker i stedet for blekksprut."
    ],
    "serving": [
      "Server med takoyakisaus, majones og bonito."
    ],
    "commonMistakes": [
      "Pass på at kjernen er svært varm ved servering."
    ],
    "relatedDishIds": [
      "okonomiyaki",
      "gyoza"
    ],
    "sources": []
  },
  {
    "dishId": "sukiyaki",
    "summary": "Japansk gryterett med tynt storfekjøtt, tofu og grønnsaker i søtlig soyasaus.",
    "overview": "Ingrediensene tilberedes i en grunn gryte med soyasaus, sukker og mirin.",
    "history": "Sukiyaki er en etablert japansk gryterett med regionale tilberedningsmåter.",
    "flavor": "Søt, salt og fyldig.",
    "technique": "Tilbered kjøttet raskt i den konsentrerte sausen.",
    "essentials": [
      "400 g tynne storfekjøttskiver",
      "200 g tofu",
      "200 g kinakål"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–50 min",
      "ingredients": [
        "400 g tynne storfekjøttskiver",
        "200 g tofu",
        "200 g kinakål",
        "100 g sopp",
        "shiratakinudler",
        "100 ml dashi",
        "4 ss soyasaus",
        "3 ss mirin",
        "1 ss sukker"
      ],
      "steps": [
        "Bland dashi, soyasaus, mirin og sukker.",
        "Brun kjøttet kort i gryten.",
        "Tilsett saus, tofu, sopp, nudler og kål.",
        "La trekke til grønnsakene er møre og kjøttet ferdig."
      ]
    },
    "variants": [
      "Kantō- og Kansai-stil har forskjellige fremgangsmåter."
    ],
    "serving": [
      "Server med ris; bruk pasteurisert egg dersom det skal serveres rått som dipp."
    ],
    "commonMistakes": [
      "Ikke la de tynne kjøttskivene koke unødvendig lenge."
    ],
    "relatedDishIds": [
      "shabu-shabu",
      "yakitori"
    ],
    "sources": []
  },
  {
    "dishId": "shabu-shabu",
    "summary": "Japansk grytemåltid der tynne kjøttskiver og grønnsaker trekkes i varm kraft.",
    "overview": "Ingrediensene tilberedes ved bordet og dyppes i saus.",
    "history": "Shabu-shabu er en kjent japansk nabemono- eller gryterett.",
    "flavor": "Mild kraft med frisk eller nøtteaktig dipp.",
    "technique": "Trekk små porsjoner kjøtt i varm kraft til ferdig.",
    "essentials": [
      "400 g tynne storfekjøttskiver",
      "1,5 l vann",
      "kombu"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–50 min",
      "ingredients": [
        "400 g tynne storfekjøttskiver",
        "1,5 l vann",
        "kombu",
        "200 g tofu",
        "kinakål",
        "sopp",
        "ponzu",
        "sesamsaus"
      ],
      "steps": [
        "Trekk kombu i vann og ta den ut før kraften koker.",
        "Tilsett tofu, sopp og grønnsaker.",
        "Trekk kjøttskivene i små omganger til ferdige.",
        "Server med ponzu og sesamsaus."
      ]
    },
    "variants": [
      "Varianter med svinekjøtt eller sjømat."
    ],
    "serving": [
      "Avslutt gjerne måltidet med nudler i kraften."
    ],
    "commonMistakes": [
      "Bruk separate redskaper til rått og ferdig kjøtt."
    ],
    "relatedDishIds": [
      "sukiyaki",
      "udon"
    ],
    "sources": []
  },
  {
    "dishId": "katsudon",
    "summary": "Japansk risbolle med panert svinekotelett, løk og egg.",
    "overview": "Tonkatsu trekkes kort i en søt-salt dashi- og soyablanding med egg.",
    "history": "Katsudon tilhører den japanske donburi-tradisjonen med topping over ris.",
    "flavor": "Fyldig, søt-salt og saftig.",
    "technique": "La det panerte kjøttet trekke kort i sausen før egget setter seg.",
    "essentials": [
      "4 svinekoteletter uten ben",
      "mel",
      "2 egg til panering"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30–50 min",
      "ingredients": [
        "4 svinekoteletter uten ben",
        "mel",
        "2 egg til panering",
        "panko",
        "olje",
        "600 g kokt ris",
        "1 løk",
        "200 ml dashi",
        "3 ss soyasaus",
        "2 ss mirin",
        "4 egg"
      ],
      "steps": [
        "Vend kotelettene i mel, egg og panko.",
        "Stek i olje til gjennomstekt og skjær i strimler.",
        "Kok løk i dashi, soyasaus og mirin.",
        "Legg kjøttet i sausen, hell over sammenvispet egg og la det sette seg.",
        "Server over varm ris."
      ]
    },
    "variants": [
      "Sauce katsudon serveres med saus uten eggblandingen."
    ],
    "serving": [
      "Topp gjerne med vårløk."
    ],
    "commonMistakes": [
      "Ikke la paneringen trekke så lenge at den går i oppløsning."
    ],
    "relatedDishIds": [
      "katsu",
      "sukiyaki"
    ],
    "sources": []
  },
  {
    "dishId": "kung-pao-chicken",
    "summary": "Sichuanrett med wokstekt kylling, tørket chili og peanøtter.",
    "overview": "Små kyllingbiter stekes raskt med aromater og en konsentrert sursøt saus.",
    "history": "Gong bao ji ding er en klassiker i Sichuan-kjøkkenet, med mange internasjonale restaurantvarianter.",
    "flavor": "Sterk, nøtteaktig, syrlig og lett bedøvende fra sichuanpepper.",
    "technique": "Klargjør alle ingrediensene før wokken varmes opp.",
    "essentials": [
      "500 g kyllinglårfilet",
      "60 g peanøtter",
      "tørket chili"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30 min",
      "ingredients": [
        "500 g kyllinglårfilet",
        "60 g peanøtter",
        "tørket chili",
        "1 ts sichuanpepper",
        "2 ss soyasaus",
        "1 ss svart riseddik",
        "1 ts sukker",
        "maisstivelse",
        "vårløk",
        "olje"
      ],
      "steps": [
        "Skjær kyllingen i små terninger og bland med litt soyasaus og stivelse.",
        "Bland eddik, sukker og resten av soyasausen.",
        "Fres chili og sichuanpepper kort, tilsett kylling og stek gjennom.",
        "Vend inn saus, vårløk og peanøtter."
      ]
    },
    "variants": [
      "Restaurantvarianter kan inneholde paprika eller andre grønnsaker."
    ],
    "serving": [
      "Server med dampet ris."
    ],
    "commonMistakes": [
      "Ikke la tørket chili svi seg."
    ],
    "relatedDishIds": [
      "mapo-tofu",
      "dan-dan-noodles"
    ],
    "sources": []
  },
  {
    "dishId": "xiaolongbao",
    "summary": "Dampede kinesiske deigpakker med kjøttfyll og varm kraft inni.",
    "overview": "Stivnet kraft blandes i fyllet og smelter under dampingen.",
    "history": "Xiaolongbao forbindes særlig med Jiangnan-regionen og Shanghai-området.",
    "flavor": "Saftig, mildt krydret og rik på umami.",
    "technique": "Avkjøl kraftgeléen godt og forsegl deigen omhyggelig.",
    "essentials": [
      "300 g hvetemel",
      "150 ml vann, omtrent",
      "300 g svinekjøttdeig"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min + kjøling av kraft",
      "ingredients": [
        "300 g hvetemel",
        "150 ml vann, omtrent",
        "300 g svinekjøttdeig",
        "200 g fast kraftgelé",
        "ingefær",
        "soyasaus",
        "vårløk"
      ],
      "steps": [
        "Elt mel og vann til en glatt deig og la hvile.",
        "Bland kjøtt med aromater og terninger av kald kraftgelé.",
        "Kjevle ut små tynne deigskiver, fyll og lukk med folder.",
        "Damp i kurv til kjøttfyllet er gjennomstekt."
      ]
    },
    "variants": [
      "Varianter med krabbe og svinekjøtt finnes."
    ],
    "serving": [
      "Server med svart eddik og ingefær; la den varme kraften kjølne litt før du spiser."
    ],
    "commonMistakes": [
      "Ikke bruk flytende kraft i fyllet eller lag hull i deigen."
    ],
    "relatedDishIds": [
      "dumplings",
      "bao"
    ],
    "sources": []
  },
  {
    "dishId": "char-siu",
    "summary": "Kantonesisk ovnsstekt svinekjøtt med søtlig, blank glasering.",
    "overview": "Kjøttet marineres med soyasaus og aromatiske krydder før steking.",
    "history": "Char siu er en del av den kantonesiske siu mei-tradisjonen med stekt kjøtt.",
    "flavor": "Søt-salt, aromatisk og ristet.",
    "technique": "Glaser kjøttet mot slutten for å unngå brent sukker.",
    "essentials": [
      "700 g svinenakke",
      "2 ss hoisinsaus",
      "2 ss soyasaus"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 1 time + marinering",
      "ingredients": [
        "700 g svinenakke",
        "2 ss hoisinsaus",
        "2 ss soyasaus",
        "1 ss honning",
        "1 ts five spice",
        "hvitløk"
      ],
      "steps": [
        "Bland marinaden og reserver en ren porsjon til glasering.",
        "Mariner kjøttet i kjøleskap i flere timer.",
        "Stek på rist ved 200 °C til kjøttet når minst 63 °C i kjernen; la hvile minst tre minutter.",
        "Pensle med reservert glasering mot slutten og skjær i skiver."
      ]
    },
    "variants": [
      "Ulike stykker av svin og forskjellige søtstoffer brukes."
    ],
    "serving": [
      "Server med ris, nudler eller i bao."
    ],
    "commonMistakes": [
      "Ikke bruk marinade som har vært i kontakt med rått kjøtt som ferdig glasering."
    ],
    "relatedDishIds": [
      "bao",
      "peking-duck"
    ],
    "sources": []
  },
  {
    "dishId": "chow-mein",
    "summary": "Kinesisk rett med stekte hvetenudler, grønnsaker og eventuelt kjøtt.",
    "overview": "Nudlene stekes med soyasaus og tilbehør; teksturen varierer fra myk til sprø.",
    "history": "Chow mein har mange former i kinesiske kjøkken og internasjonale kinesiske restauranttradisjoner.",
    "flavor": "Ristet, salt og aromatisk.",
    "technique": "Kok nudlene til akkurat møre og stek i små omganger.",
    "essentials": [
      "350 g eggnudler",
      "250 g kylling",
      "150 g kål"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30 min",
      "ingredients": [
        "350 g eggnudler",
        "250 g kylling",
        "150 g kål",
        "1 gulrot",
        "bønnespirer",
        "2 ss soyasaus",
        "1 ss østerssaus",
        "olje"
      ],
      "steps": [
        "Kok nudlene etter anvisning og la renne av.",
        "Skjær grønnsaker og kylling i tynne biter.",
        "Stek kyllingen gjennom og tilsett grønnsakene.",
        "Vend inn nudler og saus og stek raskt på høy varme."
      ]
    },
    "variants": [
      "Varianter med sprø nudler, sjømat eller tofu."
    ],
    "serving": [
      "Server straks fra wokken."
    ],
    "commonMistakes": [
      "Ikke overfyll pannen slik at nudlene dampkokes."
    ],
    "relatedDishIds": [
      "dan-dan-noodles",
      "pad-see-ew"
    ],
    "sources": []
  },
  {
    "dishId": "wonton-soup",
    "summary": "Kinesisk suppe med små fylte deigpakker i klar kraft.",
    "overview": "Tynne wontonark fylles med kjøtt eller reker og kokes.",
    "history": "Wontonsuppe finnes i flere kinesiske regionale tradisjoner, blant annet kantonesisk nudelsuppe.",
    "flavor": "Mild, aromatisk og fyldig med myke deigpakker.",
    "technique": "Forsegl arkene godt og kok wontonene separat hvis kraften skal holdes klar.",
    "essentials": [
      "24 wontonark",
      "250 g svinekjøttdeig",
      "100 g reker"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "24 wontonark",
        "250 g svinekjøttdeig",
        "100 g reker",
        "ingefær",
        "soyasaus",
        "1 l kyllingkraft",
        "pak choi",
        "vårløk"
      ],
      "steps": [
        "Finhakk rekene og bland med kjøtt, ingefær og soyasaus.",
        "Fyll wontonarkene og lukk kantene med litt vann.",
        "Kok wontonene til fyllet er gjennomstekt.",
        "Varm kraft med pak choi og server wontonene i suppen med vårløk."
      ]
    },
    "variants": [
      "Hongkong-stil serveres ofte med tynne eggnudler."
    ],
    "serving": [
      "Server med vårløk og eventuelt chiliolje."
    ],
    "commonMistakes": [
      "Ikke overfyll de tynne arkene."
    ],
    "relatedDishIds": [
      "dumplings",
      "xiaolongbao"
    ],
    "sources": []
  },
  {
    "dishId": "sweet-and-sour-pork",
    "summary": "Kinesisk rett med sprøstekt svinekjøtt i søt og syrlig saus.",
    "overview": "Kjøttbiter paneres og stekes før de vendes raskt med saus og grønnsaker.",
    "history": "Den kantonesiske varianten gu lou yuk har blitt utbredt på kinesiske restauranter internasjonalt.",
    "flavor": "Søt, syrlig og sprø med saftig kjøtt.",
    "technique": "Vend kjøttet i sausen rett før servering.",
    "essentials": [
      "500 g svinekjøtt i terninger",
      "1 egg",
      "maisstivelse"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min",
      "ingredients": [
        "500 g svinekjøtt i terninger",
        "1 egg",
        "maisstivelse",
        "1 paprika",
        "1 løk",
        "150 g ananas",
        "3 ss eddik",
        "2 ss sukker",
        "2 ss ketchup",
        "olje"
      ],
      "steps": [
        "Vend kjøttet i egg og stivelse.",
        "Stek i små omganger til gyllent og gjennomstekt.",
        "Fres paprika og løk, tilsett ananas, eddik, sukker og ketchup.",
        "La sausen tykne litt og vend inn kjøttet rett før servering."
      ]
    },
    "variants": [
      "Varianter med kylling eller andre frukter finnes; ananas er ikke obligatorisk."
    ],
    "serving": [
      "Server med ris."
    ],
    "commonMistakes": [
      "Ikke la det sprøstekte kjøttet ligge lenge i sausen."
    ],
    "relatedDishIds": [
      "char-siu",
      "kung-pao-chicken"
    ],
    "sources": []
  },
  {
    "dishId": "enchiladas",
    "summary": "Mais­tortillaer med fyll og chilisaus.",
    "overview": "Tortillaene fylles, rulles og dekkes med saus.",
    "history": "Enchiladas finnes i mange regionale meksikanske tradisjoner.",
    "flavor": "Fyldig, mildt syrlig og krydret.",
    "technique": "Myk opp tortillaene før de rulles.",
    "essentials": [
      "12 maistortillaer",
      "400 g kokt kylling",
      "400 ml rød enchiladasaus"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min",
      "ingredients": [
        "12 maistortillaer",
        "400 g kokt kylling",
        "400 ml rød enchiladasaus",
        "150 g ost",
        "1 løk"
      ],
      "steps": [
        "Varm tortillaene kort.",
        "Fyll med kylling og rull sammen.",
        "Legg i form med saus og ost.",
        "Stek ved 190 °C til gjennomvarmt."
      ]
    },
    "variants": [
      "Enchiladas verdes med grønn tomatillosaus."
    ],
    "serving": [
      "Server med løk og crema."
    ],
    "commonMistakes": [
      "Ikke bruk tørre tortillaer som sprekker."
    ],
    "relatedDishIds": [
      "quesadilla",
      "mole-poblano"
    ],
    "sources": []
  },
  {
    "dishId": "burrito",
    "summary": "Hvetetortilla rullet rundt kjøtt, bønner eller annet fyll.",
    "overview": "En stor, myk tortilla omslutter et konsentrert fyll.",
    "history": "Burrito forbindes med Nord-Mexico og har fått mange former i USA.",
    "flavor": "Myk, fyldig og krydret.",
    "technique": "Varm tortillaen og brett sidene inn før rulling.",
    "essentials": [
      "4 store hvetetortillaer",
      "300 g kokte bønner",
      "300 g kjøttdeig"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30 min",
      "ingredients": [
        "4 store hvetetortillaer",
        "300 g kokte bønner",
        "300 g kjøttdeig",
        "1 løk",
        "spisskummen",
        "salsa"
      ],
      "steps": [
        "Stek løk og kjøttdeig til gjennomstekt.",
        "Tilsett krydder og bønner.",
        "Varm tortillaene.",
        "Fordel fyll og salsa og rull tett."
      ]
    },
    "variants": [
      "Mission-burrito inneholder ofte ris og flere typer tilbehør."
    ],
    "serving": [
      "Server med salsa."
    ],
    "commonMistakes": [
      "Unngå for mye vått fyll."
    ],
    "relatedDishIds": [
      "quesadilla",
      "tacos-al-pastor"
    ],
    "sources": []
  },
  {
    "dishId": "tamales",
    "summary": "Dampede pakker av maisdeig med salt eller søtt fyll.",
    "overview": "Masa smøres på maisblad eller bananblad, fylles og dampes.",
    "history": "Tamales har førkolumbiske røtter i Mesoamerika og er viktige i mange festtradisjoner.",
    "flavor": "Myk maisdeig med aromatisk fyll.",
    "technique": "Bruk masa harina beregnet på tamales og damp til deigen slipper bladet.",
    "essentials": [
      "300 g masa harina",
      "250–350 ml kraft",
      "100 g mykt fett"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2 timer",
      "ingredients": [
        "300 g masa harina",
        "250–350 ml kraft",
        "100 g mykt fett",
        "1 ts bakepulver",
        "300 g kokt kylling",
        "salsa",
        "tørkede maisblad"
      ],
      "steps": [
        "Bløtlegg maisbladene i varmt vann.",
        "Pisk fett og bland med masa harina, bakepulver og kraft til myk deig.",
        "Smør deig på bladene, legg på kylling og salsa og brett.",
        "Damp i omtrent 60–90 minutter til deigen er fast og slipper bladene."
      ]
    },
    "variants": [
      "Tamales med mole, chili eller søtt fyll."
    ],
    "serving": [
      "Fjern bladet før servering."
    ],
    "commonMistakes": [
      "Ikke la dampgryten koke tørr."
    ],
    "relatedDishIds": [
      "enchiladas",
      "mole-poblano"
    ],
    "sources": []
  },
  {
    "dishId": "chilaquiles",
    "summary": "Maistortillachips vendt i rød eller grønn saus.",
    "overview": "Sprø tortillabiter myknes delvis i varm salsa.",
    "history": "Chilaquiles er en kjent meksikansk frokostrett.",
    "flavor": "Sprøtt og mykt, syrlig og krydret.",
    "technique": "Vend chipsene inn like før servering for å bevare noe sprøhet.",
    "essentials": [
      "200 g tortillachips",
      "400 ml salsa roja eller verde",
      "4 egg"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 20 min",
      "ingredients": [
        "200 g tortillachips",
        "400 ml salsa roja eller verde",
        "4 egg",
        "100 g queso fresco",
        "crema",
        "løk"
      ],
      "steps": [
        "Varm salsaen i en panne.",
        "Stek eggene separat.",
        "Vend chipsene i den varme sausen.",
        "Topp med egg, ost, crema og løk."
      ]
    },
    "variants": [
      "Røde og grønne varianter med egg eller kylling."
    ],
    "serving": [
      "Server straks."
    ],
    "commonMistakes": [
      "Ikke la chipsene koke lenge hvis du ønsker sprø tekstur."
    ],
    "relatedDishIds": [
      "enchiladas",
      "quesadilla"
    ],
    "sources": []
  },
  {
    "dishId": "mole-poblano",
    "summary": "Meksikansk saus med tørket chili, frø, krydder og ofte sjokolade.",
    "overview": "En rekke ristede ingredienser males og kokes sammen til en kompleks saus.",
    "history": "Mole poblano forbindes særlig med Puebla; opphavsfortellingene varierer.",
    "flavor": "Dyp, krydret, lett bitter og søtlig.",
    "technique": "Rist chiliene forsiktig og la sausen småkoke.",
    "essentials": [
      "4 tørkede anchochilier",
      "2 tørkede pasillachilier",
      "30 g sesamfrø"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 75 min",
      "ingredients": [
        "4 tørkede anchochilier",
        "2 tørkede pasillachilier",
        "30 g sesamfrø",
        "40 g mandler",
        "1 løk",
        "2 hvitløksfedd",
        "1 tomat",
        "400 ml kraft",
        "20 g mørk sjokolade",
        "kanel",
        "600 g kokt kylling"
      ],
      "steps": [
        "Fjern stilker og frø fra chiliene, rist kort og bløtlegg.",
        "Rist frø og mandler og stek løk, hvitløk og tomat.",
        "Miks med chili, kraft og krydder til glatt saus.",
        "Småkok sausen, rør inn sjokolade og varm kyllingen i den."
      ]
    },
    "variants": [
      "Oppskriften er en forenklet hjemmevariant av en omfattende sausetradisjon."
    ],
    "serving": [
      "Server med ris og sesamfrø."
    ],
    "commonMistakes": [
      "Ikke brenn chiliene eller la sjokoladen dominere."
    ],
    "relatedDishIds": [
      "enchiladas",
      "tamales"
    ],
    "sources": []
  },
  {
    "dishId": "ceviche",
    "summary": "Fisk eller sjømat med sitrus, løk og chili.",
    "overview": "I klassiske varianter marineres rå fisk i sitrus; syren endrer teksturen, men gjør ikke fisken mikrobiologisk trygg.",
    "history": "Ceviche har en særlig sentral plass i Peru og finnes i ulike former langs Latin-Amerikas kyster, blant annet i Mexico.",
    "flavor": "Frisk, syrlig, salt og aromatisk.",
    "technique": "Hold sjømaten kald; denne hjemmevarianten bruker gjennomkokte reker.",
    "essentials": [
      "400 g kokte, avkjølte reker",
      "4 lime",
      "1 rødløk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 20 min",
      "ingredients": [
        "400 g kokte, avkjølte reker",
        "4 lime",
        "1 rødløk",
        "chili",
        "koriander",
        "1 agurk",
        "salt"
      ],
      "steps": [
        "Skjær løk og agurk i små biter.",
        "Bland limesaft, chili og salt.",
        "Vend inn de kalde, kokte rekene og grønnsakene.",
        "Hold kjølig og server straks med koriander."
      ]
    },
    "variants": [
      "Peruanske fiskebaserte varianter og meksikanske varianter med reker, tomat eller avokado."
    ],
    "serving": [
      "Server med tostadas eller, i peruansk stil, mais og søtpotet."
    ],
    "commonMistakes": [
      "Ikke regn med at limejuice dreper parasitter eller sykdomsfremkallende bakterier."
    ],
    "relatedDishIds": [
      "fish-taco",
      "tostada"
    ],
    "sources": []
  },
  {
    "dishId": "lahmacun",
    "summary": "Tynt flatbrød med krydret kjøttdeig, tomat og urter.",
    "overview": "En finhakket kjøttblanding fordeles over tynn deig og stekes ved høy varme.",
    "history": "Lahmacun er utbredt i Tyrkia, med regionale varianter blant annet i Gaziantep og Şanlıurfa.",
    "flavor": "Sprø kanter, saftig fyll og aromatiske krydder.",
    "technique": "Kjevle deigen tynt og bruk et tynt lag fyll.",
    "essentials": [
      "300 g hvetemel",
      "170 ml vann",
      "salt"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 60 min",
      "ingredients": [
        "300 g hvetemel",
        "170 ml vann",
        "salt",
        "250 g kjøttdeig av lam eller storfe",
        "1 tomat",
        "1 løk",
        "persille",
        "paprikapulver"
      ],
      "steps": [
        "Elt mel, vann og salt til glatt deig og la hvile.",
        "Finhakk grønnsakene og bland med kjøtt og krydder.",
        "Del deigen i seks og kjevle tynt; fordel kjøttblandingen.",
        "Stek ved 240–250 °C til deigen er gyllen og kjøttfyllet gjennomstekt."
      ]
    },
    "variants": [
      "Krydder og mengden hvitløk varierer regionalt."
    ],
    "serving": [
      "Server med persille, løk og sitron."
    ],
    "commonMistakes": [
      "Ikke legg på et tykt, vått lag fyll."
    ],
    "relatedDishIds": [
      "pide",
      "doner"
    ],
    "sources": [
      {
        "label": "Go Türkiye – Lahmacun og tyrkiske mattradisjoner",
        "href": "https://goturkiye.com/gastronomy/blog/16-foods-you-have-to-try-on-your-trip-to-turkiye"
      }
    ]
  },
  {
    "dishId": "manti",
    "summary": "Små tyrkiske deigpakker med kjøttfyll, ofte med hvitløksyoghurt.",
    "overview": "Tynne deigbiter fylles, lukkes og kokes før saus tilsettes.",
    "history": "Kayseri er særlig kjent for sine små mantı; andre regioner har større varianter.",
    "flavor": "Myk deig, saftig fyll og syrlig yoghurt.",
    "technique": "Hold deigen dekket mens du former små pakker.",
    "essentials": [
      "300 g hvetemel",
      "1 egg",
      "vann og salt"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "300 g hvetemel",
        "1 egg",
        "vann og salt",
        "250 g kjøttdeig",
        "1 liten løk",
        "300 g yoghurt",
        "2 hvitløksfedd",
        "smør",
        "paprikaflak"
      ],
      "steps": [
        "Elt mel, egg, vann og salt til fast deig og la hvile.",
        "Bland kjøttdeig med revet løk og salt.",
        "Kjevle ut, skjær i små firkanter, fyll og forsegl.",
        "Kok til deigen er mør og kjøttet gjennomstekt; topp med hvitløksyoghurt og paprikasmør."
      ]
    },
    "variants": [
      "Kayseri mantısı og større hingel-varianter."
    ],
    "serving": [
      "Server varmt med kjølig yoghurt."
    ],
    "commonMistakes": [
      "Ikke overfyll de små deigpakkene."
    ],
    "relatedDishIds": [
      "dumplings",
      "lahmacun"
    ],
    "sources": [
      {
        "label": "Go Türkiye – Mantı: tradisjoner og regionale varianter",
        "href": "https://goturkiye.com/blog/turkish-manti"
      }
    ]
  },
  {
    "dishId": "doner",
    "summary": "Tyrkisk kebab av kjøtt stekt på roterende, stående spyd.",
    "overview": "Kjøttet skjæres av i tynne skiver etter hvert som overflaten blir stekt.",
    "history": "Döner er en etablert tyrkisk kjøtt- og gatemattradisjon og serveres også som tallerkenrett.",
    "flavor": "Ristet, saftig og krydret.",
    "technique": "Hjemmevarianten bruker tynne kjøttskiver i varm panne, ikke et roterende spyd.",
    "essentials": [
      "600 g benfri kyllinglårfilet",
      "2 ss yoghurt",
      "1 ss olje"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30 min + marinering",
      "ingredients": [
        "600 g benfri kyllinglårfilet",
        "2 ss yoghurt",
        "1 ss olje",
        "paprikapulver",
        "spisskummen",
        "hvitløk",
        "salt",
        "brød og salat"
      ],
      "steps": [
        "Skjær kyllingen i tynne strimler.",
        "Mariner med yoghurt, olje og krydder i kjøleskap.",
        "Stek i små omganger på høy varme til gjennomstekt.",
        "Server i brød eller på tallerken med salat."
      ]
    },
    "variants": [
      "Döner av lam, storfe eller kylling; dürüm i rullet flatbrød."
    ],
    "serving": [
      "Server med løk, tomat og ønsket saus."
    ],
    "commonMistakes": [
      "Ikke overfyll stekepannen eller bruk rå marinade som saus."
    ],
    "relatedDishIds": [
      "shawarma",
      "lahmacun"
    ],
    "sources": [
      {
        "label": "Go Türkiye – Döner: tilberedning og tradisjon",
        "href": "https://goturkiye.com/blog/doner"
      }
    ]
  },
  {
    "dishId": "kofte",
    "summary": "Tyrkiske kjøttboller eller kjøttkaker, ofte grillet.",
    "overview": "Kjøttdeig formes med løk og krydder; sammensetningen varierer regionalt.",
    "history": "Tyrkia har en rekke lokale köfte-tradisjoner, blant annet i Tekirdağ og Burdur.",
    "flavor": "Saftig, ristet og aromatisk.",
    "technique": "Form jevne kaker og stek til gjennomstekt.",
    "essentials": [
      "500 g kjøttdeig",
      "1 liten løk",
      "2 ss brødsmuler"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min",
      "ingredients": [
        "500 g kjøttdeig",
        "1 liten løk",
        "2 ss brødsmuler",
        "persille",
        "spisskummen",
        "pepper",
        "salt"
      ],
      "steps": [
        "Riv løken og bland med kjøtt og krydder.",
        "Form små, flate kjøttkaker.",
        "La hvile kjølig i 20 minutter.",
        "Grill eller pannestek til gjennomstekt."
      ]
    },
    "variants": [
      "Şiş köfte på spyd og İzmir köfte med tomatsaus."
    ],
    "serving": [
      "Server med salat, brød eller piyaz."
    ],
    "commonMistakes": [
      "Ikke stek på så høy varme at utsiden brenner før midten er ferdig."
    ],
    "relatedDishIds": [
      "doner",
      "shawarma"
    ],
    "sources": [
      {
        "label": "Go Türkiye – regionale köfte-tradisjoner",
        "href": "https://goturkiye.com/mediterranean/taste"
      }
    ]
  },
  {
    "dishId": "baba-ganoush",
    "summary": "Auberginedipp med røykpreg, sitron og ofte tahini.",
    "overview": "Auberginen grilles eller ovnsstekes til myk og blandes med smakstilsetninger.",
    "history": "Retten inngår i levantinske mezetradisjoner; navn og ingredienser varierer lokalt.",
    "flavor": "Røykfylt, syrlig og kremet.",
    "technique": "La den stekte auberginen renne av før den moses.",
    "essentials": [
      "2 store auberginer",
      "2 ss tahini",
      "1 sitron"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 50 min",
      "ingredients": [
        "2 store auberginer",
        "2 ss tahini",
        "1 sitron",
        "1 hvitløksfedd",
        "olivenolje",
        "salt"
      ],
      "steps": [
        "Prikk auberginene og stek ved 230 °C til helt myke.",
        "Avkjøl litt, del og skrap ut innmaten.",
        "La overflødig væske renne av.",
        "Mos med tahini, sitron, hvitløk og salt; topp med olje."
      ]
    },
    "variants": [
      "Tahini-baserte varianter omtales også som mutabbal i deler av Levanten."
    ],
    "serving": [
      "Server med pitabrød og andre småretter."
    ],
    "commonMistakes": [
      "Ikke bruk aubergine som fortsatt er fast inni."
    ],
    "relatedDishIds": [
      "hummus",
      "tabbouleh"
    ],
    "sources": [
      {
        "label": "The Mediterranean Dish – Baba ganoush",
        "href": "https://www.themediterraneandish.com/baba-ganoush-recipe/"
      }
    ]
  },
  {
    "dishId": "tabbouleh",
    "summary": "Levantinsk urtesalat med persille, tomat, bulgur og sitron.",
    "overview": "Finhakkede urter blandes med litt bulgur og en enkel sitron- og oljedressing.",
    "history": "Tabbouleh er særlig kjent fra libanesisk og syrisk matkultur og serveres ofte som meze.",
    "flavor": "Frisk, syrlig og urtepreget.",
    "technique": "Tørk urtene godt og finhakk dem med skarp kniv.",
    "essentials": [
      "2 store bunter bladpersille",
      "1 liten bunt mynte",
      "3 tomater"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 25 min",
      "ingredients": [
        "2 store bunter bladpersille",
        "1 liten bunt mynte",
        "3 tomater",
        "50 g fin bulgur",
        "2 vårløk",
        "1–2 sitroner",
        "3 ss olivenolje",
        "salt"
      ],
      "steps": [
        "Tilbered bulguren etter pakningen og la renne av.",
        "Vask og tørk urtene; finhakk dem.",
        "Skjær tomat og vårløk smått.",
        "Bland alt med sitronsaft, olivenolje og salt."
      ]
    },
    "variants": [
      "Forholdet mellom bulgur og urter varierer; persille dominerer i mange levantinske varianter."
    ],
    "serving": [
      "Server kjølig som meze eller til grillmat."
    ],
    "commonMistakes": [
      "Ikke la bulguren dominere salaten dersom du ønsker en urtepreget variant."
    ],
    "relatedDishIds": [
      "fattoush",
      "hummus"
    ],
    "sources": [
      {
        "label": "The Mediterranean Dish – Tabbouleh",
        "href": "https://www.themediterraneandish.com/tabouli-salad/"
      }
    ]
  },
  {
    "dishId": "farikal",
    "summary": "Lam eller fårekjøtt kokt mørt sammen med kål og hel pepper.",
    "overview": "Kjøtt og kål legges lagvis i en gryte med litt vann.",
    "history": "Fårikål er en norsk nasjonalrett og forbindes særlig med høstens lammesesong.",
    "flavor": "Mild kålsødme, kraftig kjøttsmak og pepper.",
    "technique": "La gryten trekke rolig under lokk til kjøttet løsner lett fra beinet.",
    "essentials": [
      "1,2 kg fårikålkjøtt",
      "1,2 kg hodekål",
      "2 ts hel svart pepper"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2,5 timer",
      "ingredients": [
        "1,2 kg fårikålkjøtt",
        "1,2 kg hodekål",
        "2 ts hel svart pepper",
        "salt",
        "300 ml vann"
      ],
      "steps": [
        "Skjær kålen i båter.",
        "Legg kjøtt og kål lagvis med salt og pepper.",
        "Tilsett vann og la trekke under lokk i omtrent to timer, til kjøttet er mørt.",
        "Smak til med salt."
      ]
    },
    "variants": [
      "Noen jevner kraften lett med mel."
    ],
    "serving": [
      "Server med kokte poteter."
    ],
    "commonMistakes": [
      "Unngå hard koking og for mye vann."
    ],
    "relatedDishIds": [
      "kjottkaker"
    ],
    "sources": [
      {
        "label": "MatPrat – Fårikål",
        "href": "https://www.matprat.no/oppskrifter/tradisjon/farikal/"
      }
    ]
  },
  {
    "dishId": "kjottkaker",
    "summary": "Norske kjøttkaker med brun saus, poteter og tradisjonelt tilbehør.",
    "overview": "Krydret kjøttfarse formes til flate kaker, brunes og trekkes ferdig i saus.",
    "history": "Kjøttkaker i brun saus er en etablert del av norsk husmannskost.",
    "flavor": "Fyldig kjøttsmak med mildt krydder og brunet saus.",
    "technique": "Spe farsen gradvis med kald melk og brun kakene før de trekkes ferdig.",
    "essentials": [
      "500 g kjøttdeig",
      "1 ts salt",
      "2 ss potetmel"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "500 g kjøttdeig",
        "1 ts salt",
        "2 ss potetmel",
        "150 ml melk",
        "pepper og muskat",
        "smør",
        "3 ss hvetemel",
        "500 ml kraft"
      ],
      "steps": [
        "Bland kjøttdeig med salt, potetmel og krydder; spe med melk.",
        "Form kaker og brun i smør.",
        "Brun mel i smør og visp gradvis inn kraft.",
        "La kjøttkakene trekke i sausen til gjennomstekte."
      ]
    },
    "variants": [
      "Serveres blant annet med kålstuing eller ertestuing."
    ],
    "serving": [
      "Server med poteter og tyttebær."
    ],
    "commonMistakes": [
      "Ikke tilsett all melken på én gang."
    ],
    "relatedDishIds": [
      "kottbullar",
      "farikal"
    ],
    "sources": [
      {
        "label": "MatPrat – Kjøttkaker med kålstuing",
        "href": "https://www.matprat.no/oppskrifter/tradisjon/kjottkaker/"
      }
    ]
  },
  {
    "dishId": "kottbullar",
    "summary": "Små svenske kjøttboller, ofte med fløtesaus, potetmos og tyttebær.",
    "overview": "Kjøttfarse med løk og oppbløtte brødsmuler rulles til små boller.",
    "history": "Köttbullar hører til svensk husmanskost og er også vanlig på julebordet.",
    "flavor": "Saftig, mildt krydret og fyldig.",
    "technique": "Form små, jevne boller og stek i omganger.",
    "essentials": [
      "500 g kjøttdeig",
      "1 liten løk",
      "50 g brødsmuler"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "500 g kjøttdeig",
        "1 liten løk",
        "50 g brødsmuler",
        "100 ml melk",
        "1 egg",
        "salt og pepper",
        "smør",
        "200 ml fløte",
        "200 ml kraft"
      ],
      "steps": [
        "La brødsmulene trekke i melken.",
        "Bland med kjøtt, finhakket løk, egg og krydder.",
        "Form små boller og stek til gjennomstekte.",
        "Kok ut pannen med kraft og fløte til saus."
      ]
    },
    "variants": [
      "Blandingsfarse av storfe og svin er vanlig."
    ],
    "serving": [
      "Server med potetmos, tyttebær og gjerne agurk."
    ],
    "commonMistakes": [
      "Ikke overfyll stekepannen."
    ],
    "relatedDishIds": [
      "kjottkaker",
      "kofte"
    ],
    "sources": [
      {
        "label": "Visit Sweden – Traditional Swedish meatballs",
        "href": "https://visitsweden.com/what-to-do/food-drink/recipes/traditional-swedish-meatballs-recipe/"
      }
    ]
  },
  {
    "dishId": "smorrebrod",
    "summary": "Åpent dansk smørbrød, ofte på rugbrød med pålegg og garnityr.",
    "overview": "Brødet toppes med gjennomtenkte kombinasjoner av fisk, kjøtt, egg eller grønnsaker.",
    "history": "Smørrebrød er en sentral del av dansk lunsj- og restaurantkultur.",
    "flavor": "Kontraster mellom kraftig rugbrød, kremet pålegg og friskt eller syrlig tilbehør.",
    "technique": "Velg pålegg som passer sammen, og monter like før servering.",
    "essentials": [
      "4 skiver rugbrød",
      "smør",
      "2 kokte egg"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 20 min",
      "ingredients": [
        "4 skiver rugbrød",
        "smør",
        "2 kokte egg",
        "150 g kokte reker",
        "majones",
        "sitron",
        "dill"
      ],
      "steps": [
        "Smør rugbrødet.",
        "Skjær eggene i skiver og legg på brødet.",
        "Fordel reker og litt majones.",
        "Pynt med dill og sitron."
      ]
    },
    "variants": [
      "Sild, roastbiff med remulade og leverpostei er andre vanlige varianter."
    ],
    "serving": [
      "Server som lunsj med kniv og gaffel."
    ],
    "commonMistakes": [
      "Unngå å la fuktig pålegg ligge lenge på brødet."
    ],
    "relatedDishIds": [
      "manakish"
    ],
    "sources": [
      {
        "label": "VisitDenmark – Traditional Danish food",
        "href": "https://www.visitdenmark.com/denmark/things-to-do/eat-drink/traditional-danish-food"
      }
    ]
  },
  {
    "dishId": "lohikeitto",
    "summary": "Finsk laksesuppe med poteter, dill og ofte fløte.",
    "overview": "Poteter og grønnsaker kokes i kraft før laksen tilsettes mot slutten.",
    "history": "Lohikeitto er en finsk fiskesuppe med både kremete og klare regionale varianter.",
    "flavor": "Mild, fyldig og frisk av dill.",
    "technique": "La laksen trekke forsiktig, uten langvarig koking.",
    "essentials": [
      "500 g laksefilet uten bein",
      "500 g poteter",
      "1 purre"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 35 min",
      "ingredients": [
        "500 g laksefilet uten bein",
        "500 g poteter",
        "1 purre",
        "2 gulrøtter",
        "800 ml fiskekraft",
        "200 ml fløte",
        "dill",
        "smør"
      ],
      "steps": [
        "Fres purre i smør.",
        "Tilsett kraft, poteter og gulrot og kok til møre.",
        "Tilsett fløte og laks i terninger; trekk til fisken er gjennomkokt.",
        "Smak til og tilsett dill."
      ]
    },
    "variants": [
      "I Kainuu finnes en variant uten fløte."
    ],
    "serving": [
      "Server med rugbrød."
    ],
    "commonMistakes": [
      "Ikke kok laksen så lenge at den blir tørr."
    ],
    "relatedDishIds": [
      "plokkfiskur"
    ],
    "sources": [
      {
        "label": "This is Finland – Northern Finnish recipes: Lohikeitto",
        "href": "https://finland.fi/life-society/delicacies-from-the-top-of-the-world-go-down-well-northern-finnish-recipes/"
      }
    ]
  },
  {
    "dishId": "plokkfiskur",
    "summary": "Islandsk fiskerett med kokt hvit fisk, poteter og lys saus.",
    "overview": "Flaket fisk og poteter vendes i en kremet saus med løk.",
    "history": "Plokkfiskur er tradisjonell islandsk hverdagsmat som også egner seg til å bruke fiskerester.",
    "flavor": "Mild, kremet og mettende.",
    "technique": "Vend fisken forsiktig inn i sausen så noe av flakstrukturen beholdes.",
    "essentials": [
      "500 g torsk eller hyse",
      "500 g poteter",
      "1 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min",
      "ingredients": [
        "500 g torsk eller hyse",
        "500 g poteter",
        "1 løk",
        "40 g smør",
        "40 g mel",
        "400 ml melk",
        "salt og pepper"
      ],
      "steps": [
        "Kok potetene møre og trekk fisken til gjennomkokt.",
        "Fres løk i smør og rør inn mel.",
        "Spe med melk og la sausen småkoke.",
        "Vend inn potetbiter og flaket fisk, varm gjennom og smak til."
      ]
    },
    "variants": [
      "Noen varianter gratineres med ost."
    ],
    "serving": [
      "Server med islandsk rugbrød eller annet mørkt brød."
    ],
    "commonMistakes": [
      "Ikke rør så hardt at fisken blir helt most."
    ],
    "relatedDishIds": [
      "lohikeitto"
    ],
    "sources": [
      {
        "label": "Iceland Food Centre – Icelandic fish stew",
        "href": "https://www.icelandfoodcentre.com/blog/icelandic-fish-stew-plokkfiskur"
      }
    ]
  },
  {
    "dishId": "boeuf-bourguignon",
    "summary": "Fransk storfekjøttgryte med rødvin, sopp og løk.",
    "overview": "Grytekjøtt braiseres langsomt i en aromatisk saus.",
    "history": "Retten forbindes med Bourgognes kjøkken og vintradisjon.",
    "flavor": "Dyp, fyldig og aromatisk.",
    "technique": "Brun kjøttet i omganger og la det trekke til mørt.",
    "essentials": [
      "800 g storfekjøtt til gryte",
      "100 g bacon",
      "2 gulrøtter"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 3 timer",
      "ingredients": [
        "800 g storfekjøtt til gryte",
        "100 g bacon",
        "2 gulrøtter",
        "1 løk",
        "400 ml rødvin",
        "250 ml kraft",
        "200 g sopp",
        "timian",
        "mel",
        "smør"
      ],
      "steps": [
        "Brun kjøttet og baconet.",
        "Fres løk og gulrot, dryss over litt mel og tilsett vin, kraft og timian.",
        "La trekke under lokk til kjøttet er mørt, omtrent to til tre timer.",
        "Stek soppen separat og vend den inn før servering."
      ]
    },
    "variants": [
      "Noen varianter bruker perleløk og vinmarinering over natten."
    ],
    "serving": [
      "Server med potetmos eller brød."
    ],
    "commonMistakes": [
      "Unngå hard koking."
    ],
    "relatedDishIds": [
      "rogan-josh",
      "ossobuco"
    ],
    "sources": [
      {
        "label": "Good Food – Bœuf bourguignon",
        "href": "https://www.bbcgoodfood.com/recipes/beef-bourguignon"
      }
    ]
  },
  {
    "dishId": "coq-au-vin",
    "summary": "Kylling braisert i vin med bacon, løk og sopp.",
    "overview": "Kyllingstykker brunes og trekkes i vinsaus med aromater.",
    "history": "Tradisjonelt kunne retten bruke eldre haner som trengte lang tilberedning; i dag brukes ofte kylling.",
    "flavor": "Fyldig, urtepreget og vinaktig.",
    "technique": "Brun kyllingen og la sausen småkoke forsiktig.",
    "essentials": [
      "1 kg kyllinglår",
      "100 g bacon",
      "200 g sopp"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "1 kg kyllinglår",
        "100 g bacon",
        "200 g sopp",
        "150 g små løk",
        "400 ml rødvin",
        "200 ml kraft",
        "timian",
        "hvitløk"
      ],
      "steps": [
        "Brun bacon og kylling i en gryte.",
        "Fres løk og hvitløk.",
        "Tilsett vin, kraft og timian og la kyllingen trekke til gjennomstekt og mør.",
        "Stek soppen og vend den inn."
      ]
    },
    "variants": [
      "Coq au riesling er en hvitvinsvariant."
    ],
    "serving": [
      "Server med poteter eller brød."
    ],
    "commonMistakes": [
      "Ikke kok kyllingen så hardt at kjøttet blir tørt."
    ],
    "relatedDishIds": [
      "boeuf-bourguignon"
    ],
    "sources": [
      {
        "label": "Good Food – Coq au vin",
        "href": "https://www.bbcgoodfood.com/recipes/coq-au-vin"
      }
    ]
  },
  {
    "dishId": "ratatouille",
    "summary": "Fransk grønnsaksgryte med aubergine, squash, paprika og tomat.",
    "overview": "Grønnsakene stekes og blandes i en aromatisk tomatbase.",
    "history": "Ratatouille forbindes med det sørfranske kjøkkenet, særlig Nice og Provence.",
    "flavor": "Fruktig, mild og urtefrisk.",
    "technique": "Stek grønnsakene i omganger for å bevare teksturen.",
    "essentials": [
      "1 aubergine",
      "2 squash",
      "2 paprika"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 50 min",
      "ingredients": [
        "1 aubergine",
        "2 squash",
        "2 paprika",
        "400 g tomater",
        "1 løk",
        "3 hvitløksfedd",
        "olivenolje",
        "basilikum"
      ],
      "steps": [
        "Skjær grønnsakene i biter.",
        "Brun aubergine, squash og paprika separat.",
        "Fres løk og hvitløk og tilsett tomat.",
        "Vend grønnsakene sammen og la småkoke til møre; smak til med basilikum."
      ]
    },
    "variants": [
      "Kan serveres rustikt i biter eller i ovnsbakte varianter."
    ],
    "serving": [
      "Server som hovedrett med brød eller som tilbehør."
    ],
    "commonMistakes": [
      "Ikke kok alle grønnsakene til mos."
    ],
    "relatedDishIds": [
      "aloo-gobi",
      "pasta-alla-norma"
    ],
    "sources": [
      {
        "label": "Good Food – Ratatouille",
        "href": "https://www.bbcgoodfood.com/recipes/ratatouille"
      }
    ]
  },
  {
    "dishId": "bouillabaisse",
    "summary": "Provençalsk fiskesuppe med aromatisk kraft, safran og ulike fiskeslag.",
    "overview": "Fisk trekkes i en kraft med fennikel, tomat og krydder.",
    "history": "Bouillabaisse er særlig knyttet til Marseilles fiskertradisjon.",
    "flavor": "Maritim, fyldig og aromatisk.",
    "technique": "Bygg opp kraften før fisken tilsettes, slik at fiskestykkene ikke overkokes.",
    "essentials": [
      "700 g hvit fisk",
      "1 l fiskekraft",
      "1 fennikel"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 60 min",
      "ingredients": [
        "700 g hvit fisk",
        "1 l fiskekraft",
        "1 fennikel",
        "1 løk",
        "400 g tomater",
        "hvitløk",
        "safran",
        "olivenolje"
      ],
      "steps": [
        "Fres fennikel, løk og hvitløk i olje.",
        "Tilsett tomat, safran og kraft og la småkoke.",
        "Skjær fisken i store stykker og trekk den forsiktig i kraften til gjennomkokt.",
        "Smak til og server med brød."
      ]
    },
    "variants": [
      "Tradisjonelle Marseille-varianter bruker flere lokale fiskeslag; dette er en forenklet hjemmevariant."
    ],
    "serving": [
      "Server med ristet brød og rouille."
    ],
    "commonMistakes": [
      "Ikke la fisken koke lenge i ferdig kraft."
    ],
    "relatedDishIds": [
      "lohikeitto",
      "plokkfiskur"
    ],
    "sources": [
      {
        "label": "Good Food – Bouillabaisse",
        "href": "https://www.bbcgoodfood.com/recipes/bouillabaisse"
      }
    ]
  },
  {
    "dishId": "quiche-lorraine",
    "summary": "Fransk pai med bacon og fyll av egg og fløte.",
    "overview": "En mørdeigsbunn fylles med en eggestand og stekes til den setter seg.",
    "history": "Quiche lorraine har røtter i Lorraine i det nordøstlige Frankrike.",
    "flavor": "Sprø bunn, kremet fyll og salt bacon.",
    "technique": "Forstek bunnen før fyllet helles i.",
    "essentials": [
      "1 paideig til 24 cm form",
      "150 g bacon",
      "4 egg"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 60 min",
      "ingredients": [
        "1 paideig til 24 cm form",
        "150 g bacon",
        "4 egg",
        "250 ml fløte",
        "100 ml melk",
        "muskat"
      ],
      "steps": [
        "Kle formen med paideig, prikk bunnen og forstek ved 190 °C.",
        "Stek baconet og la det renne av.",
        "Visp egg, fløte, melk og muskat sammen.",
        "Fordel bacon i bunnen, hell over eggestanden og stek ved 175 °C til fyllet har satt seg."
      ]
    },
    "variants": [
      "Mange nyere varianter tilsetter ost; den klassiske Lorraine-varianten trenger ikke ost."
    ],
    "serving": [
      "Server lun med grønn salat."
    ],
    "commonMistakes": [
      "Ikke hell fyllet i en uforstekt bunn dersom du ønsker en sprø bunn."
    ],
    "relatedDishIds": [
      "focaccia",
      "croque-monsieur"
    ],
    "sources": [
      {
        "label": "Good Food – Quiche lorraine",
        "href": "https://www.bbcgoodfood.com/recipes/quiche-lorraine"
      }
    ]
  },
  {
    "dishId": "croque-monsieur",
    "summary": "Fransk varm ostesmørbrød med skinke, ofte gratinert med béchamel.",
    "overview": "Brødskiver fylles med skinke og ost, toppes med saus og gratineres.",
    "history": "Croque monsieur er en kjent del av fransk kafé- og bistromat.",
    "flavor": "Sprøtt brød, salt skinke og smeltet ost.",
    "technique": "Bruk en tykk béchamel som ikke gjør brødet gjennomvått.",
    "essentials": [
      "8 skiver brød",
      "150 g kokt skinke",
      "160 g gruyère"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30 min",
      "ingredients": [
        "8 skiver brød",
        "150 g kokt skinke",
        "160 g gruyère",
        "25 g smør",
        "25 g mel",
        "250 ml melk",
        "dijonsennep"
      ],
      "steps": [
        "Lag en tykk béchamel av smør, mel og melk.",
        "Smør brødet med litt sennep og legg skinke og ost mellom skivene.",
        "Topp med béchamel og resten av osten.",
        "Gratiner ved 220 °C til gyllent og gjennomvarmt."
      ]
    },
    "variants": [
      "Croque madame toppes med stekt egg."
    ],
    "serving": [
      "Server med salat."
    ],
    "commonMistakes": [
      "Unngå for mye tynn saus."
    ],
    "relatedDishIds": [
      "quiche-lorraine",
      "smorrebrod"
    ],
    "sources": [
      {
        "label": "Good Food – Croque monsieur",
        "href": "https://www.bbcgoodfood.com/recipes/perfect-croque-monsieur"
      }
    ]
  },
  {
    "dishId": "paella-valenciana",
    "summary": "Risrett med kylling, kanin, bønner og safran.",
    "overview": "Ris tilberedes i en vid, grunn panne med kjøtt, grønnsaker og kraft.",
    "history": "Paella har røtter i Valencia-regionen, der lokale råvarer og risdyrking preger retten.",
    "flavor": "Fyldig, aromatisk og med mulig sprø risbunn, socarrat.",
    "technique": "Fordel risen jevnt og unngå omrøring etter at den er tilsatt.",
    "essentials": [
      "320 g rundkornet paellaris",
      "400 g kylling",
      "300 g kanin"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 75 min",
      "ingredients": [
        "320 g rundkornet paellaris",
        "400 g kylling",
        "300 g kanin",
        "200 g grønne bønner",
        "150 g kokte store hvite bønner",
        "150 g tomat",
        "1 l vann eller kraft, omtrent",
        "safran",
        "paprikapulver",
        "olivenolje"
      ],
      "steps": [
        "Brun kjøttstykkene i en vid panne.",
        "Fres grønne bønner og revet tomat, tilsett paprikapulver og vann eller kraft.",
        "La kjøttet trekke, tilsett safran, hvite bønner og ris.",
        "Kok risen uten omrøring til mør og kjøttet er gjennomstekt; juster væskemengden ved behov.",
        "La hvile noen minutter før servering."
      ]
    },
    "variants": [
      "Sjømatpaella er en annen paellatype, ikke den klassiske valencianske varianten."
    ],
    "serving": [
      "Server direkte fra pannen."
    ],
    "commonMistakes": [
      "Ikke rør som ved risotto."
    ],
    "relatedDishIds": [
      "risotto-alla-milanese",
      "arancini"
    ],
    "sources": [
      {
        "label": "Spain.info – Paella",
        "href": "https://www.spain.info/en/recipe/paella/"
      }
    ]
  },
  {
    "dishId": "patatas-bravas",
    "summary": "Sprø potetbiter med krydret bravas-saus.",
    "overview": "Poteter stekes eller friteres og toppes med en saus med paprika og chili.",
    "history": "Patatas bravas er en populær tapasrett i spanske barer.",
    "flavor": "Sprø, mildt søt og sterk fra sausen.",
    "technique": "Tørk potetene før steking og tilsett sausen rett før servering.",
    "essentials": [
      "700 g poteter",
      "olje",
      "1 ss olivenolje"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "700 g poteter",
        "olje",
        "1 ss olivenolje",
        "1 ss hvetemel",
        "1 ts søtt paprikapulver",
        "sterkt paprikapulver etter smak",
        "200 ml kraft",
        "salt"
      ],
      "steps": [
        "Skjær potetene i biter og tørk dem.",
        "Vend i litt olje og stek ved 220 °C til gylne og møre.",
        "Varm olivenolje, rør inn mel og paprika uten å svi krydderet.",
        "Spe med kraft og la sausen småkoke til passe tykk.",
        "Topp potetene med sausen."
      ]
    },
    "variants": [
      "Noen serverer tomatbasert saus, aioli eller begge deler."
    ],
    "serving": [
      "Server varmt som tapas."
    ],
    "commonMistakes": [
      "Ikke hell sausen på lenge før servering."
    ],
    "relatedDishIds": [
      "tortilla-espanola",
      "croquetas"
    ],
    "sources": [
      {
        "label": "Spain.info – Spanske vegetarretter og tapas",
        "href": "https://www.spain.info/en/discover-spain/vegetarian-dishes-spanish-cuisine/"
      }
    ]
  },
  {
    "dishId": "tortilla-espanola",
    "summary": "Tykk spansk omelett med poteter og eventuelt løk.",
    "overview": "Potetskiver myknes i olje og blandes med egg før omeletten stekes.",
    "history": "Potetomeletten er en spansk hverdagsklassiker; bruk av løk er et kjent stridsspørsmål.",
    "flavor": "Mild, saftig og fyldig.",
    "technique": "Stek potetene rolig før de blandes med egg.",
    "essentials": [
      "600 g poteter",
      "6 egg",
      "1 løk, valgfritt"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "600 g poteter",
        "6 egg",
        "1 løk, valgfritt",
        "olivenolje",
        "salt"
      ],
      "steps": [
        "Skrell potetene og skjær i tynne skiver.",
        "Stek potetene og eventuell løk forsiktig i olje til møre; la renne av.",
        "Bland med sammenvispede egg og salt.",
        "Stek i panne på middels lav varme, vend ved hjelp av en tallerken og stek til egget har satt seg."
      ]
    },
    "variants": [
      "Med eller uten løk, og ulike tykkelser."
    ],
    "serving": [
      "Server lun i stykker eller som tapas."
    ],
    "commonMistakes": [
      "Unngå høy varme som brenner utsiden før midten er ferdig."
    ],
    "relatedDishIds": [
      "patatas-bravas",
      "quiche-lorraine"
    ],
    "sources": [
      {
        "label": "Spain.info – Klassiske spanske retter",
        "href": "https://www.spain.info/en/top/most-famous-spanish-food-recipes/"
      }
    ]
  },
  {
    "dishId": "gazpacho",
    "summary": "Kald spansk grønnsakssuppe med tomat, agurk og paprika.",
    "overview": "Rå grønnsaker mikses med olje, eddik og eventuelt brød.",
    "history": "Gazpacho forbindes særlig med Andalusias kjøkken og serveres gjerne i varmt vær.",
    "flavor": "Frisk, syrlig og fruktig.",
    "technique": "Bruk modne tomater og avkjøl suppen før servering.",
    "essentials": [
      "800 g modne tomater",
      "1 agurk",
      "1 grønn paprika"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 20 min + kjøling",
      "ingredients": [
        "800 g modne tomater",
        "1 agurk",
        "1 grønn paprika",
        "1 hvitløksfedd",
        "40 g brød, valgfritt",
        "3 ss olivenolje",
        "1–2 ss vineddik",
        "salt",
        "kaldt vann etter behov"
      ],
      "steps": [
        "Vask og skjær grønnsakene.",
        "Bløtlegg brødet dersom det brukes.",
        "Miks grønnsaker, brød, olje og eddik til glatt suppe.",
        "Smak til, juster konsistensen med vann og avkjøl."
      ]
    },
    "variants": [
      "Salmorejo er en beslektet, tykkere tomatsuppe."
    ],
    "serving": [
      "Server kald med finhakkede grønnsaker."
    ],
    "commonMistakes": [
      "Ikke bruk umodne tomater hvis moden tomatsmak er ønsket."
    ],
    "relatedDishIds": [
      "ratatouille",
      "tabbouleh"
    ],
    "sources": [
      {
        "label": "Spain.info – Gazpacho",
        "href": "https://www.spain.info/en/recipe/gazpacho/"
      }
    ]
  },
  {
    "dishId": "gambas-al-ajillo",
    "summary": "Reker stekt i olivenolje med hvitløk og chili.",
    "overview": "Rekene tilberedes raskt i aromatisk olje og serveres varme.",
    "history": "Gambas al ajillo inngår i den spanske tapastradisjonen, blant annet i Madrid.",
    "flavor": "Søtlig sjømat, hvitløk og mild chilivarme.",
    "technique": "Varm oljen forsiktig med hvitløk før rekene tilsettes.",
    "essentials": [
      "400 g rå, rensede reker",
      "5 hvitløksfedd",
      "60 ml olivenolje"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 15 min",
      "ingredients": [
        "400 g rå, rensede reker",
        "5 hvitløksfedd",
        "60 ml olivenolje",
        "tørket chili",
        "salt",
        "persille"
      ],
      "steps": [
        "Tørk rekene og skjær hvitløken i skiver.",
        "Varm olje med hvitløk og chili uten at hvitløken brenner.",
        "Tilsett rekene og stek til gjennomstekte.",
        "Smak til med salt og persille."
      ]
    },
    "variants": [
      "Styrken kan justeres med ulike mengder chili."
    ],
    "serving": [
      "Server med brød til oljen."
    ],
    "commonMistakes": [
      "Ikke la rekene steke så lenge at de blir seige."
    ],
    "relatedDishIds": [
      "ceviche",
      "bouillabaisse"
    ],
    "sources": [
      {
        "label": "Spain.info – Matkultur i Madrid",
        "href": "https://www.spain.info/es/gastronomia/cocina-comunidad-madrid/"
      }
    ]
  },
  {
    "dishId": "croquetas",
    "summary": "Panerte kroketter med kremet béchamelfyll, ofte med skinke.",
    "overview": "En fast, avkjølt béchamelmasse formes, paneres og friteres.",
    "history": "Croquetas er en populær spansk tapasrett; skinke er et klassisk fyll.",
    "flavor": "Sprø utside og myk, kremet kjerne.",
    "technique": "Avkjøl fyllet grundig før forming og panering.",
    "essentials": [
      "60 g smør",
      "75 g hvetemel",
      "500 ml melk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 60 min + kjøling",
      "ingredients": [
        "60 g smør",
        "75 g hvetemel",
        "500 ml melk",
        "100 g finhakket skinke",
        "2 egg",
        "brødsmuler",
        "olje"
      ],
      "steps": [
        "Smelt smør, rør inn mel og spe gradvis med melk.",
        "Kok til en tykk masse, vend inn skinken og smak til.",
        "Fordel i en form og avkjøl raskt før flere timers kjøling.",
        "Form kroketter, vend i mel, egg og brødsmuler.",
        "Friter i små omganger ved 175 °C til gylne og gjennomvarme."
      ]
    },
    "variants": [
      "Fyll med sopp, ost eller torsk er også utbredt."
    ],
    "serving": [
      "Server varmt som tapas."
    ],
    "commonMistakes": [
      "Ikke form krokettene mens fyllet er varmt og løst."
    ],
    "relatedDishIds": [
      "arancini",
      "patatas-bravas"
    ],
    "sources": [
      {
        "label": "Spain.info – Populære spanske tapas",
        "href": "https://www.spain.info/es/top/tapas-recomendadas-populares-espana/"
      }
    ]
  }
];
