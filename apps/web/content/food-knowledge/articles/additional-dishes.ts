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
  },
  {
    "dishId": "moussaka",
    "summary": "Ovnsrett med aubergine, krydret kjøttsaus og béchamel.",
    "overview": "I den greske varianten legges stekte grønnsaker og kjøttsaus lagvis under en tykk hvit saus.",
    "history": "Moussaka inngår i en bredere familie av retter i det østlige Middelhavet; den greske ovnsvarianten er særlig kjent for béchamellaget.",
    "flavor": "Fyldig kjøttsmak, myk aubergine og mildt krydret saus.",
    "technique": "Forstek auberginen og reduser kjøttsausen før retten bygges opp.",
    "essentials": [
      "2 auberginer",
      "400 g kjøttdeig",
      "1 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "2 auberginer",
        "400 g kjøttdeig",
        "1 løk",
        "400 g hakkede tomater",
        "kanel",
        "40 g smør",
        "40 g mel",
        "500 ml melk",
        "60 g revet ost"
      ],
      "steps": [
        "Skjær auberginene i skiver, pensle med olje og stek ved 220 °C til møre.",
        "Brun kjøtt og løk, tilsett tomat og litt kanel og kok inn.",
        "Lag béchamel av smør, mel og melk.",
        "Legg aubergine og kjøttsaus i en form, topp med béchamel og ost.",
        "Stek ved 190 °C til gyllen og gjennomvarm. La hvile før oppdeling."
      ]
    },
    "variants": [
      "Poteter kan inngå i lagene; linser kan erstatte kjøttet i en vegetarvariant."
    ],
    "serving": [
      "Server lun med grønn salat."
    ],
    "commonMistakes": [
      "Unngå vannete kjøttsaus og rå aubergine."
    ],
    "relatedDishIds": [
      "pastitsio",
      "lasagne-alla-bolognese"
    ],
    "sources": [
      {
        "label": "My Greek Dish – Moussaka",
        "href": "https://www.mygreekdish.com/recipe/mousakas/"
      }
    ]
  },
  {
    "dishId": "souvlaki",
    "summary": "Greske grillspyd med kjøtt, sitron og oregano.",
    "overview": "Små marinerte kjøttstykker grilles på spyd og serveres med brød eller som tallerkenrett.",
    "history": "Souvlaki er en utbredt gresk gatematrett; kalamaki brukes blant annet i Athen om kjøttspydet.",
    "flavor": "Saftig, syrlig og urtepreget.",
    "technique": "Skjær kjøttet i jevnstore biter og grill til gjennomstekt.",
    "essentials": [
      "600 g kyllinglårfilet",
      "2 ss olivenolje",
      "1 sitron"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30 min + marinering",
      "ingredients": [
        "600 g kyllinglårfilet",
        "2 ss olivenolje",
        "1 sitron",
        "2 hvitløksfedd",
        "2 ts oregano",
        "salt",
        "pitabrød"
      ],
      "steps": [
        "Skjær kjøttet i biter og mariner i olje, sitron, hvitløk og oregano i kjøleskap.",
        "Tre kjøttet på spyd.",
        "Grill eller stek til gjennomstekt.",
        "Server med varmt pitabrød, grønnsaker og tzatziki."
      ]
    },
    "variants": [
      "Svinekjøtt er også vanlig; andre varianter bruker lam eller grønnsaker."
    ],
    "serving": [
      "Server med tomat, løk og tzatziki."
    ],
    "commonMistakes": [
      "Ikke bruk marinade fra rått kjøtt som kald saus."
    ],
    "relatedDishIds": [
      "gyros",
      "tzatziki"
    ],
    "sources": [
      {
        "label": "My Greek Dish – Souvlaki",
        "href": "https://www.mygreekdish.com/recipe/souvlaki-with-chicken-and-pita-breads/"
      }
    ]
  },
  {
    "dishId": "gyros",
    "summary": "Gresk kjøttrett med tynne skiver fra et roterende, vertikalt grillspyd.",
    "overview": "Kjøttet serveres gjerne i pita med løk, tomat og tzatziki.",
    "history": "Gyros er en sentral del av gresk grill- og gatematkultur, med likhetstrekk til döner og shawarma.",
    "flavor": "Ristet, saftig og krydret.",
    "technique": "Hjemme kan tynne, marinerte kjøttstrimler stekes på høy varme; dette etterligner smaken, ikke selve grillmetoden.",
    "essentials": [
      "600 g kyllinglårfilet",
      "2 ss olivenolje",
      "1 ss sitronsaft"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 35 min + marinering",
      "ingredients": [
        "600 g kyllinglårfilet",
        "2 ss olivenolje",
        "1 ss sitronsaft",
        "hvitløk",
        "oregano",
        "paprikapulver",
        "4 pitabrød",
        "tomat",
        "rødløk",
        "tzatziki"
      ],
      "steps": [
        "Skjær kjøttet i tynne strimler.",
        "Mariner i olje, sitron og krydder i kjøleskap.",
        "Stek i små omganger til gjennomstekt og brunet.",
        "Fyll varmt pitabrød med kjøtt, grønnsaker og tzatziki."
      ]
    },
    "variants": [
      "Gyros av svinekjøtt eller kylling er utbredt; pommes frites kan inngå i pitaen."
    ],
    "serving": [
      "Server som pita eller tallerkenrett."
    ],
    "commonMistakes": [
      "Ikke overfyll pannen."
    ],
    "relatedDishIds": [
      "doner",
      "souvlaki",
      "tzatziki"
    ],
    "sources": [
      {
        "label": "My Greek Dish – Gyros",
        "href": "https://www.mygreekdish.com/recipe/homemade-greek-chicken-gyro-recipe/"
      }
    ]
  },
  {
    "dishId": "spanakopita",
    "summary": "Gresk filodeigpai med spinat, feta og urter.",
    "overview": "Tynne deigark omslutter et salt, urtepreget fyll.",
    "history": "Spanakopita tilhører den greske tradisjonen med fylte paier, som finnes i mange former og størrelser.",
    "flavor": "Sprø flak, saftig spinat og salt feta.",
    "technique": "Press ut overflødig væske fra spinaten og pensle deigarkene lett med olje.",
    "essentials": [
      "250 g filodeig",
      "500 g spinat",
      "200 g feta"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 60 min",
      "ingredients": [
        "250 g filodeig",
        "500 g spinat",
        "200 g feta",
        "3 vårløk",
        "dill",
        "2 egg",
        "olivenolje"
      ],
      "steps": [
        "Varm spinaten kort til den faller sammen; avkjøl og press ut væske.",
        "Bland med smuldret feta, vårløk, dill og egg.",
        "Legg flere oljepenslede filoark i en form, fordel fyllet og dekk med resten.",
        "Stek ved 190 °C til gyllen og fyllet har satt seg."
      ]
    },
    "variants": [
      "Kan formes som små trekanter eller stor pai."
    ],
    "serving": [
      "Server lun eller romtemperert etter kort avkjøling."
    ],
    "commonMistakes": [
      "Ikke la filodeigen tørke ut under arbeidet."
    ],
    "relatedDishIds": [
      "quiche-lorraine",
      "tzatziki"
    ],
    "sources": [
      {
        "label": "My Greek Dish – Spanakopita",
        "href": "https://www.mygreekdish.com/recipe/spinach-feta-filo-pie/"
      }
    ]
  },
  {
    "dishId": "tzatziki",
    "summary": "Kald gresk yoghurtdipp med agurk og hvitløk.",
    "overview": "Tykk yoghurt blandes med avrent, revet agurk og aromater.",
    "history": "Tzatziki serveres som meze og til grillmat i gresk matkultur; beslektede yoghurtsauser finnes i regionen.",
    "flavor": "Frisk, kremet, syrlig og hvitløkspreget.",
    "technique": "Fjern overflødig væske fra agurken før den blandes inn.",
    "essentials": [
      "400 g gresk yoghurt",
      "1 agurk",
      "1–2 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 15 min",
      "ingredients": [
        "400 g gresk yoghurt",
        "1 agurk",
        "1–2 hvitløksfedd",
        "1 ss olivenolje",
        "1 ss sitronsaft",
        "dill, valgfritt",
        "salt"
      ],
      "steps": [
        "Riv agurken og press ut væsken.",
        "Rør sammen yoghurt, agurk og finrevet hvitløk.",
        "Tilsett olje, sitron og salt etter smak.",
        "Avkjøl til servering."
      ]
    },
    "variants": [
      "Dill, mynte eller eddik brukes i ulike varianter."
    ],
    "serving": [
      "Server med brød, grønnsaker, souvlaki eller gyros."
    ],
    "commonMistakes": [
      "Ikke bruk agurk uten å la den renne av."
    ],
    "relatedDishIds": [
      "souvlaki",
      "gyros",
      "baba-ganoush"
    ],
    "sources": [
      {
        "label": "My Greek Dish – Tzatziki",
        "href": "https://www.mygreekdish.com/recipe/authentic-greek-tzatziki-sauce-recipe/"
      }
    ]
  },
  {
    "dishId": "pastitsio",
    "summary": "Gresk ovnsbakt pasta med krydret kjøttsaus og béchamel.",
    "overview": "Rørformet pasta, kjøttsaus og hvit saus legges i en form og gratineres.",
    "history": "Pastitsio er en kjent gresk familiematrett med trekk fra middelhavets ovnsbakte pastatradisjoner.",
    "flavor": "Fyldig, kremet og aromatisk med varme krydder.",
    "technique": "Kok pastaen litt kortere enn vanlig og la kjøttsausen bli tykk.",
    "essentials": [
      "350 g rørformet pasta",
      "400 g kjøttdeig",
      "1 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "350 g rørformet pasta",
        "400 g kjøttdeig",
        "1 løk",
        "400 g tomater",
        "kanel",
        "40 g smør",
        "40 g mel",
        "500 ml melk",
        "80 g revet ost"
      ],
      "steps": [
        "Kok pastaen til nesten mør og la den renne av.",
        "Brun kjøtt og løk, tilsett tomat og kanel og kok inn.",
        "Lag béchamel av smør, mel og melk.",
        "Legg pasta, kjøttsaus og béchamel lagvis i en form og topp med ost.",
        "Stek ved 190 °C til gyllen og gjennomvarm; la hvile før oppdeling."
      ]
    },
    "variants": [
      "Lange pastitsiorør er tradisjonelle, men andre rørformede pastatyper kan brukes hjemme."
    ],
    "serving": [
      "Server med salat."
    ],
    "commonMistakes": [
      "Ikke la pastaen bli overkokt før ovnsstekingen."
    ],
    "relatedDishIds": [
      "moussaka",
      "lasagne-alla-bolognese"
    ],
    "sources": [
      {
        "label": "My Greek Dish – Pastitsio",
        "href": "https://www.mygreekdish.com/recipe/pastitsio/"
      }
    ]
  },
  {
    "dishId": "nasi-goreng",
    "summary": "Indonesisk stekt ris med søt soyasaus, krydder og ofte speilegg.",
    "overview": "Kokt ris wokstekes med aromater, kecap manis og valgfritt protein.",
    "history": "Nasi goreng er en utbredt indonesisk hverdagsrett med mange lokale varianter.",
    "flavor": "Søtlig, salt og ristet, med chili etter smak.",
    "technique": "Bruk avkjølt ris som har vært oppbevart forsvarlig, og stek i små omganger.",
    "essentials": [
      "600 g kokt ris",
      "2 sjalottløk",
      "2 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 25 min",
      "ingredients": [
        "600 g kokt ris",
        "2 sjalottløk",
        "2 hvitløksfedd",
        "2 ss kecap manis",
        "chili",
        "4 egg",
        "olje",
        "agurk"
      ],
      "steps": [
        "Fres hakket løk, hvitløk og chili.",
        "Tilsett risen og stek til rykende varm.",
        "Vend inn kecap manis og smak til.",
        "Stek eggene separat og server med ris og agurk."
      ]
    },
    "variants": [
      "Varianter med kylling, sjømat eller geitekjøtt."
    ],
    "serving": [
      "Server med speilegg, agurk og krupuk."
    ],
    "commonMistakes": [
      "Ikke bruk ris som har stått lenge i romtemperatur."
    ],
    "relatedDishIds": [
      "khao-pad",
      "mie-goreng"
    ],
    "sources": [
      {
        "label": "Indonesia Travel – Indonesiske mattradisjoner",
        "href": "https://www.indonesia.travel/id/en/travel-ideas/gastronomy/don-t-leave-indonesia-before-you-get-a-taste-of-these-12-favorite-local-foods"
      }
    ]
  },
  {
    "dishId": "mie-goreng",
    "summary": "Stekte hvetenudler med grønnsaker, egg og krydret saus.",
    "overview": "Nudlene wokstekes med aromater og saus; søt soyasaus er vanlig i indonesiske varianter.",
    "history": "Stekte nudler finnes i mange sørøstasiatiske tradisjoner, blant annet indonesisk mie goreng og malaysisk mee goreng.",
    "flavor": "Søt-salt, aromatisk og lett sterk.",
    "technique": "Klargjør nudlene og sausen før wokken varmes.",
    "essentials": [
      "350 g hvetenudler",
      "2 egg",
      "200 g kål"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30 min",
      "ingredients": [
        "350 g hvetenudler",
        "2 egg",
        "200 g kål",
        "1 gulrot",
        "2 hvitløksfedd",
        "2 ss kecap manis",
        "1 ss soyasaus",
        "chili",
        "olje"
      ],
      "steps": [
        "Kok nudlene etter anvisning og la dem renne av.",
        "Fres hvitløk, chili og grønnsaker.",
        "Tilsett egg og stek til de setter seg.",
        "Vend inn nudler og saus og stek raskt på høy varme."
      ]
    },
    "variants": [
      "Malaysisk mee goreng mamak har sin egen krydder- og ingredienstradisjon."
    ],
    "serving": [
      "Server med lime og vårløk."
    ],
    "commonMistakes": [
      "Unngå overkokte nudler og en overfylt wok."
    ],
    "relatedDishIds": [
      "nasi-goreng",
      "chow-mein"
    ],
    "sources": [
      {
        "label": "Tourism Malaysia – Mee goreng",
        "href": "https://www.malaysia.travel/explore/malaysian-food-52-top-picks-you-shouldn-t-miss"
      }
    ]
  },
  {
    "dishId": "rendang",
    "summary": "Langtidskokt kjøtt med kokosmelk og krydder til en konsentrert, mørk rett.",
    "overview": "Kjøtt trekkes i aromatisk kokosmelk som reduseres gradvis.",
    "history": "Rendang kommer fra Minangkabau-folkets matkultur i Vest-Sumatra og forbindes med høytider og gjestfrihet.",
    "flavor": "Dyp, krydret, fyldig og aromatisk.",
    "technique": "La væsken koke langsomt inn, og rør oftere mot slutten.",
    "essentials": [
      "700 g storfekjøtt til gryte",
      "600 ml kokosmelk",
      "4 sjalottløk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 3–4 timer",
      "ingredients": [
        "700 g storfekjøtt til gryte",
        "600 ml kokosmelk",
        "4 sjalottløk",
        "3 hvitløksfedd",
        "galangal",
        "ingefær",
        "sitrongress",
        "chili",
        "makrutlimeblader"
      ],
      "steps": [
        "Mal løk, hvitløk, galangal, ingefær og chili til pasta.",
        "Fres pastaen og tilsett kokosmelk, kjøtt, sitrongress og limeblader.",
        "La småkoke til kjøttet er mørt og væsken redusert.",
        "Rør jevnlig mot slutten til sausen omslutter kjøttet tett."
      ]
    },
    "variants": [
      "Kalio har mer saus enn en tørrere rendang."
    ],
    "serving": [
      "Server med ris og grønnsaker."
    ],
    "commonMistakes": [
      "Ikke bruk så høy varme at den konsentrerte krydderblandingen svir seg."
    ],
    "relatedDishIds": [
      "massaman-curry",
      "rogan-josh"
    ],
    "sources": [
      {
        "label": "Indonesia Travel – Rendang og Minangkabau-tradisjon",
        "href": "https://www.indonesia.travel/gb/en/travel-ideas/gastronomy/lezatnya-rendang-minangkabau-yang-mendunia"
      }
    ]
  },
  {
    "dishId": "satay",
    "summary": "Små grillede kjøttspyd, ofte servert med en krydret saus.",
    "overview": "Marinert kjøtt grilles på spyd; peanøttsaus er vanlig, men ikke universell.",
    "history": "Sate er en omfattende indonesisk mattradisjon og satay er også populært i Malaysia og andre deler av Sørøst-Asia.",
    "flavor": "Ristet, aromatisk og saftig.",
    "technique": "Skjær jevne kjøttbiter og hold rå marinade atskilt fra ferdig saus.",
    "essentials": [
      "600 g kyllinglårfilet",
      "2 ss kecap manis",
      "1 ts korianderfrø"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 35 min + marinering",
      "ingredients": [
        "600 g kyllinglårfilet",
        "2 ss kecap manis",
        "1 ts korianderfrø",
        "hvitløk",
        "1 ss olje",
        "100 g peanøttsmør",
        "150 ml kokosmelk",
        "lime",
        "chili"
      ],
      "steps": [
        "Mariner kjøttbitene i soyasaus, koriander, hvitløk og olje i kjøleskap.",
        "Tre kjøttet på spyd og grill til gjennomstekt.",
        "Varm peanøttsmør, kokosmelk og chili i en separat kjele.",
        "Smak sausen til med lime og server til spydene."
      ]
    },
    "variants": [
      "Sate Padang og balinesisk sate lilit er egne regionale varianter."
    ],
    "serving": [
      "Server med ris, agurk og løk."
    ],
    "commonMistakes": [
      "Ikke server rå marinade som dipp."
    ],
    "relatedDishIds": [
      "yakitori",
      "souvlaki"
    ],
    "sources": [
      {
        "label": "Indonesia Travel – Sate og regionale mattradisjoner",
        "href": "https://www.indonesia.travel/id/en/travel-ideas/gastronomy/don-t-leave-indonesia-before-you-get-a-taste-of-these-12-favorite-local-foods"
      }
    ]
  },
  {
    "dishId": "nasi-lemak",
    "summary": "Ris kokt med kokosmelk, servert med sambal, egg, agurk, peanøtter og ofte tørket ansjos.",
    "overview": "Kokosrisen er måltidets base; tilbehøret gir ulike smaker og teksturer.",
    "history": "Nasi lemak er en særlig kjent malaysisk rett og vanlig frokostmat.",
    "flavor": "Kremet, salt, sterk og nøtteaktig.",
    "technique": "Tilpass væskemengden til ristypen og la risen hvile under lokk.",
    "essentials": [
      "300 g ris",
      "200 ml kokosmelk",
      "vann etter behov"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min",
      "ingredients": [
        "300 g ris",
        "200 ml kokosmelk",
        "vann etter behov",
        "1 pandanblad, valgfritt",
        "4 egg",
        "1 agurk",
        "60 g peanøtter",
        "50 g ikan bilis",
        "sambal"
      ],
      "steps": [
        "Skyll risen og kok med kokosmelk, vann, salt og eventuelt pandan.",
        "Kok eggene til faste.",
        "Rist peanøtter og stek tørket ansjos til sprø.",
        "Server kokosrisen med sambal, agurk, egg og tilbehør."
      ]
    },
    "variants": [
      "Kan også serveres med rendang eller stekt kylling."
    ],
    "serving": [
      "Anrett tilbehøret rundt risen."
    ],
    "commonMistakes": [
      "Ikke la sambalen overskygge kokosrisens milde smak."
    ],
    "relatedDishIds": [
      "rendang",
      "nasi-goreng"
    ],
    "sources": [
      {
        "label": "Tourism Malaysia – Nasi lemak",
        "href": "https://www.malaysia.travel/index.php/explore/a-gastronomic-journey-through-penang-s-culinary-gems"
      }
    ]
  },
  {
    "dishId": "laksa",
    "summary": "Nudelsuppe med aromatisk kraft, i noen varianter med kokosmelk.",
    "overview": "Laksa omfatter ulike suppetradisjoner; denne hjemmeoppskriften er inspirert av curry laksa.",
    "history": "Malaysia har flere markante laksa-varianter, blant annet syrlig assam laksa og Sarawak laksa.",
    "flavor": "Curry laksa er fyldig, aromatisk og ofte sterk; assam laksa har en annen, syrlig fiskebasert profil.",
    "technique": "Kok kraften og tilbered nudlene separat for god tekstur.",
    "essentials": [
      "300 g risnudler",
      "400 ml kokosmelk",
      "600 ml kraft"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min",
      "ingredients": [
        "300 g risnudler",
        "400 ml kokosmelk",
        "600 ml kraft",
        "2 ss laksa- eller currypasta",
        "250 g rå, rensede reker",
        "150 g tofu",
        "bønnespirer",
        "lime"
      ],
      "steps": [
        "Fres pastaen i litt olje.",
        "Tilsett kraft og kokosmelk og la småkoke.",
        "Tilsett tofu og reker og kok til rekene er gjennomstekte.",
        "Kok nudlene separat og server med suppen, spirer og lime."
      ]
    },
    "variants": [
      "Assam laksa, curry laksa og Sarawak laksa er ulike varianter, ikke identiske oppskrifter."
    ],
    "serving": [
      "Server med lime og urter."
    ],
    "commonMistakes": [
      "Ikke anta at alle laksa-varianter inneholder kokosmelk."
    ],
    "relatedDishIds": [
      "tom-kha-gai",
      "bun-rieu"
    ],
    "sources": [
      {
        "label": "Tourism Malaysia – Laksa og curry mee",
        "href": "https://www.malaysia.travel/explore/malaysian-food-52-top-picks-you-shouldn-t-miss"
      }
    ]
  },
  {
    "dishId": "pork-adobo",
    "summary": "Filippinsk kjøttrett med eddik, hvitløk, pepper og ofte soyasaus.",
    "overview": "Svinekjøtt braiseres til mørt i en salt og syrlig saus.",
    "history": "Adobo er en filippinsk tilberedningstradisjon som også omfatter fisk, kylling og grønnsaker.",
    "flavor": "Syrlig, salt og fyldig.",
    "technique": "La kjøttet trekke rolig og smak til sausen etter reduksjon.",
    "essentials": [
      "600 g svinenakke",
      "60 ml eddik",
      "50 ml soyasaus"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "600 g svinenakke",
        "60 ml eddik",
        "50 ml soyasaus",
        "5 hvitløksfedd",
        "2 laurbærblad",
        "1 ts hel pepper",
        "200 ml vann"
      ],
      "steps": [
        "Skjær kjøttet i biter og brun det lett.",
        "Tilsett eddik, soyasaus, hvitløk, laurbær og vann.",
        "La trekke under lokk til kjøttet er mørt.",
        "Ta av lokket og reduser sausen etter smak."
      ]
    },
    "variants": [
      "Adobong puti lages uten soyasaus; kyllingadobo er også vanlig."
    ],
    "serving": [
      "Server med dampet ris."
    ],
    "commonMistakes": [
      "Ikke salt sausen før den har kokt inn."
    ],
    "relatedDishIds": [
      "rendang",
      "char-siu"
    ],
    "sources": [
      {
        "label": "Kawaling Pinoy – Pork adobo",
        "href": "https://www.kawalingpinoy.com/chicken-pork-adobo/"
      }
    ]
  },
  {
    "dishId": "sinigang",
    "summary": "Filippinsk syrlig suppe med kjøtt eller sjømat og grønnsaker.",
    "overview": "Kraften får en karakteristisk frisk syre, ofte fra tamarind.",
    "history": "Sinigang er en filippinsk suppetradisjon med forskjellige proteiner og syrlige råvarer.",
    "flavor": "Syrlig, frisk og fyldig.",
    "technique": "La kjøttet bli mørt før grønnsaker med kort koketid tilsettes.",
    "essentials": [
      "600 g svineribbe i biter",
      "1,5 l vann",
      "2 tomater"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "600 g svineribbe i biter",
        "1,5 l vann",
        "2 tomater",
        "1 løk",
        "150 g reddik",
        "150 g grønne bønner",
        "pak choi",
        "tamarindpasta",
        "fiskesaus"
      ],
      "steps": [
        "Kok opp kjøtt og vann, skum av og tilsett løk og tomat.",
        "La trekke til kjøttet er mørt.",
        "Tilsett reddik, bønner og tamarind etter smak.",
        "Vend inn pak choi mot slutten og smak til med fiskesaus."
      ]
    },
    "variants": [
      "Varianter med reker, fisk eller storfekjøtt."
    ],
    "serving": [
      "Server med ris."
    ],
    "commonMistakes": [
      "Ikke tilsett all tamarinden uten å smake til."
    ],
    "relatedDishIds": [
      "tom-yum",
      "bun-rieu"
    ],
    "sources": [
      {
        "label": "Kawaling Pinoy – Sinigang",
        "href": "https://www.kawalingpinoy.com/sinigang-na-baboy/"
      }
    ]
  },
  {
    "dishId": "sisig",
    "summary": "Finhakket, stekt eller grillet kjøtt med løk, chili og sitrus.",
    "overview": "Tradisjonell svinesisig kan bruke deler av grisehodet og lever; her brukes svinekjøtt som lett tilgjengelig alternativ.",
    "history": "Sisig forbindes med Kapampangan-matkulturen og finnes i mange moderne former.",
    "flavor": "Ristet, syrlig og pikant.",
    "technique": "Stek kjøttet sprøtt før det hakkes og blandes med friske ingredienser.",
    "essentials": [
      "500 g svineside",
      "1 rødløk",
      "chili etter smak"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 60 min",
      "ingredients": [
        "500 g svineside",
        "1 rødløk",
        "chili etter smak",
        "2 ss calamansijuice eller lime",
        "1 ss soyasaus",
        "olje"
      ],
      "steps": [
        "Stek svinesiden til gjennomstekt og gyllen.",
        "Hakk kjøttet i små biter.",
        "Finhakk løk og chili og bland med kjøtt og sitrus.",
        "Varm kort i panne og smak til med soyasaus."
      ]
    },
    "variants": [
      "Varianter med kylling, fisk eller tofu."
    ],
    "serving": [
      "Server med ris eller som smårett."
    ],
    "commonMistakes": [
      "Ikke bruk så mye væske at kjøttet mister all sprøhet."
    ],
    "relatedDishIds": [
      "lechon",
      "pork-adobo"
    ],
    "sources": [
      {
        "label": "Kawaling Pinoy – Sisig",
        "href": "https://www.kawalingpinoy.com/sisig/"
      }
    ]
  },
  {
    "dishId": "lechon",
    "summary": "Filippinsk helstekt gris med sprøtt skinn og saftig kjøtt.",
    "overview": "Hel gris stekes tradisjonelt på spyd; denne hjemmevarianten bruker svineside i ovn.",
    "history": "Lechon er kjent som festmat på Filippinene, blant annet i Cebu.",
    "flavor": "Sprøtt, salt skinn og fyldig kjøtt.",
    "technique": "Tørk skinnet godt og stek kjøttet rolig før høy varme mot slutten.",
    "essentials": [
      "1,2 kg svineside med svor",
      "salt",
      "pepper"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 3 timer",
      "ingredients": [
        "1,2 kg svineside med svor",
        "salt",
        "pepper",
        "hvitløk",
        "2 stilker sitrongress"
      ],
      "steps": [
        "Tørk svoren og krydre kjøttsiden med salt, pepper og aromater.",
        "Legg kjøttet med svoren opp i en form.",
        "Stek ved 160 °C til kjøttet er mørt og gjennomstekt.",
        "Øk varmen mot slutten og følg nøye med til svoren er sprø."
      ]
    },
    "variants": [
      "Lechon sa hurno er ovnsstekt; lechon kawali er en egen frityrstekt variant."
    ],
    "serving": [
      "Server med ris og ønsket saus."
    ],
    "commonMistakes": [
      "Ikke la svoren brenne under avsluttende høy varme."
    ],
    "relatedDishIds": [
      "sisig",
      "char-siu"
    ],
    "sources": [
      {
        "label": "Kawaling Pinoy – Lechon",
        "href": "https://www.kawalingpinoy.com/lechon-sa-hurno/"
      },
      {
        "label": "Travel Philippines – Cebu",
        "href": "https://app.philippines.travel/destinations/cebu-province"
      }
    ]
  },
  {
    "dishId": "pancit",
    "summary": "Filippinske nudelretter med grønnsaker, kjøtt eller sjømat.",
    "overview": "Pancit er en samlebetegnelse; denne oppskriften er en hjemmevariant av pancit bihon med risnudler.",
    "history": "Nudelretter som pancit er vanlige både til hverdags og ved filippinske feiringer.",
    "flavor": "Salt, aromatisk og mildt ristet.",
    "technique": "Kok nudlene akkurat møre i smakfull kraft.",
    "essentials": [
      "250 g bihon-risnudler",
      "250 g kylling",
      "1 gulrot"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min",
      "ingredients": [
        "250 g bihon-risnudler",
        "250 g kylling",
        "1 gulrot",
        "200 g kål",
        "1 løk",
        "2 hvitløksfedd",
        "400 ml kraft",
        "soyasaus",
        "lime"
      ],
      "steps": [
        "Skjær kylling og grønnsaker i små biter.",
        "Stek løk, hvitløk og kylling til gjennomstekt; vend inn grønnsakene.",
        "Tilsett kraft og soyasaus og la risnudlene trekke etter pakningsanvisningen.",
        "Vend alt sammen og smak til med lime."
      ]
    },
    "variants": [
      "Pancit canton bruker hvetenudler; pancit palabok har en annen saus og topping."
    ],
    "serving": [
      "Server med calamansi eller lime."
    ],
    "commonMistakes": [
      "Ikke la nudlene koke til de går i oppløsning."
    ],
    "relatedDishIds": [
      "mie-goreng",
      "chow-mein"
    ],
    "sources": [
      {
        "label": "Kawaling Pinoy – Pancit",
        "href": "https://www.kawalingpinoy.com/pancit-bihon-guisado/"
      }
    ]
  },
  {
    "dishId": "kare-kare",
    "summary": "Filippinsk gryterett med grønnsaker og en fyldig peanøttsaus.",
    "overview": "Mørt kjøtt og grønnsaker serveres i en nøttebasert saus, gjerne med fermentert rekepasta ved siden av.",
    "history": "Kare-kare er en etablert filippinsk gryterett, ofte laget med oksehale.",
    "flavor": "Mild, nøtteaktig og fyldig.",
    "technique": "Kok kjøttet mørt separat før sausen tilberedes.",
    "essentials": [
      "800 g oksehale",
      "1 aubergine",
      "150 g lange bønner"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 3 timer",
      "ingredients": [
        "800 g oksehale",
        "1 aubergine",
        "150 g lange bønner",
        "pak choi",
        "100 g usøtet peanøttsmør",
        "1 løk",
        "2 hvitløksfedd",
        "600 ml kraft",
        "2 ss rismel",
        "bagoong etter smak"
      ],
      "steps": [
        "Trekk oksehalen i vann til mør og behold kraften.",
        "Fres løk og hvitløk, tilsett kraft og peanøttsmør.",
        "Jevn med utrørt rismel og la småkoke.",
        "Tilsett kjøtt og grønnsaker og kok til grønnsakene er møre."
      ]
    },
    "variants": [
      "Vegetariske varianter kan bruke tofu og sopp, grønnsakskraft og plantebasert tilbehør i stedet for bagoong."
    ],
    "serving": [
      "Server med ris og eventuelt bagoong."
    ],
    "commonMistakes": [
      "Ikke la sausen koke så hardt at den svir seg."
    ],
    "relatedDishIds": [
      "massaman-curry",
      "satay"
    ],
    "sources": [
      {
        "label": "Kawaling Pinoy – Kare-kare",
        "href": "https://www.kawalingpinoy.com/kare-kare/"
      }
    ]
  },
  {
    "dishId": "injera",
    "summary": "Mykt, porøst og syrlig flatbrød, tradisjonelt laget av teff.",
    "overview": "En fermentert røre stekes på én side slik at små porer dannes i overflaten.",
    "history": "Injera er grunnleggende i etiopiske og eritreiske måltider og fungerer både som underlag og til å spise gryteretter med.",
    "flavor": "Syrlig, lett nøtteaktig og svampaktig.",
    "technique": "Bruk en jevn røre og stek bare på én side under lokk.",
    "essentials": [
      "300 g teffmel",
      "100 g aktiv teffsurdeig",
      "500–650 ml vann etter behov"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min + fermentering",
      "ingredients": [
        "300 g teffmel",
        "100 g aktiv teffsurdeig",
        "500–650 ml vann etter behov",
        "salt"
      ],
      "steps": [
        "Bland mel, surdeig og vann i en ren bolle.",
        "La røren fermentere til tydelig syrlig og boblende, normalt ett til flere døgn avhengig av surdeig og temperatur.",
        "Juster til en flytende pannekakerøre og tilsett litt salt.",
        "Hell et tynt lag i en varm panne med slippbelegg, dekk til når porene dannes og stek til overflaten er fast.",
        "Løft ut brødet uten å vende det og avkjøl separat."
      ]
    },
    "variants": [
      "Andre kornsorter kan blandes med teff; dette er en forenklet surdeigsvariant."
    ],
    "serving": [
      "Server med wat, shiro eller zigni."
    ],
    "commonMistakes": [
      "Ikke snu brødet eller stable det mens det er vått og varmt. Kast røren ved tegn på mugg."
    ],
    "relatedDishIds": [
      "doro-wat",
      "shiro",
      "zigni"
    ],
    "sources": [
      {
        "label": "Guide.et – Ethiopian food",
        "href": "https://guide.et/essentials/ethiopian-food"
      }
    ]
  },
  {
    "dishId": "doro-wat",
    "summary": "Etiopisk kyllinggryte med berbere, løk og kokte egg.",
    "overview": "Finhakket løk kokes inn til en konsentrert base før kylling og krydder tilsettes.",
    "history": "Doro wat forbindes med festmåltider og høytider i Etiopia.",
    "flavor": "Fyldig, sterk og aromatisk.",
    "technique": "La løken mykne og koke inn før krydder og kylling tilsettes.",
    "essentials": [
      "800 g kyllinglår",
      "4 løk",
      "3 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2 timer",
      "ingredients": [
        "800 g kyllinglår",
        "4 løk",
        "3 hvitløksfedd",
        "ingefær",
        "2 ss berbere, eller etter smak",
        "3 ss niter kibbeh eller smør",
        "300 ml vann",
        "4 hardkokte egg"
      ],
      "steps": [
        "Finhakk løken og la den mykne i en gryte under omrøring.",
        "Tilsett smør, hvitløk, ingefær og berbere.",
        "Tilsett kylling og vann og la trekke under lokk til kyllingen er gjennomstekt og mør.",
        "Legg i skrelte hardkokte egg og varm gjennom."
      ]
    },
    "variants": [
      "Alicha doro wat er en mildere variant med blant annet gurkemeie."
    ],
    "serving": [
      "Server med injera."
    ],
    "commonMistakes": [
      "Ikke svi løk eller berbere."
    ],
    "relatedDishIds": [
      "injera",
      "zigni"
    ],
    "sources": [
      {
        "label": "Ethiopian Food – Main dishes",
        "href": "https://ethiopian-food.org/recipes/main-dishes/"
      }
    ]
  },
  {
    "dishId": "shiro",
    "summary": "Kremet gryte basert på kikertmel eller annet belgfruktmel.",
    "overview": "Melet kokes med løk, hvitløk og krydder til en glatt saus.",
    "history": "Shiro er en vanlig etiopisk hverdagsrett og kan tilberedes plantebasert til fastedager.",
    "flavor": "Mildt nøtteaktig, kremet og krydret.",
    "technique": "Visp melet gradvis inn i væsken for å unngå klumper.",
    "essentials": [
      "100 g shiro-mel eller kikertmel",
      "1 løk",
      "2 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 35 min",
      "ingredients": [
        "100 g shiro-mel eller kikertmel",
        "1 løk",
        "2 hvitløksfedd",
        "1 tomat",
        "2 ss olje",
        "berbere etter smak",
        "500 ml vann"
      ],
      "steps": [
        "Fres finhakket løk og hvitløk i olje.",
        "Tilsett tomat og berbere og kok inn.",
        "Tilsett vann og visp inn melet gradvis.",
        "La småkoke under omrøring til melet er gjennomkokt og sausen glatt."
      ]
    },
    "variants": [
      "Tegabino shiro er en tykkere variant; bozena shiro inneholder kjøtt."
    ],
    "serving": [
      "Server med injera."
    ],
    "commonMistakes": [
      "Ikke hell alt melet i gryten samtidig."
    ],
    "relatedDishIds": [
      "injera",
      "doro-wat"
    ],
    "sources": [
      {
        "label": "Ethiopian Food – Main dishes",
        "href": "https://ethiopian-food.org/recipes/main-dishes/"
      }
    ]
  },
  {
    "dishId": "tibs",
    "summary": "Stekte kjøttbiter med løk, chili og aromatiske krydder.",
    "overview": "Storfe eller lam stekes i små biter med grønnsaker og krydret fett.",
    "history": "Tibs er en kjent etiopisk kjøttrett med mange tilberedningsmåter.",
    "flavor": "Ristet, saftig og krydret.",
    "technique": "Stek kjøttet i omganger slik at pannen holder høy varme.",
    "essentials": [
      "600 g storfekjøtt",
      "2 løk",
      "2 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30 min",
      "ingredients": [
        "600 g storfekjøtt",
        "2 løk",
        "2 hvitløksfedd",
        "1 grønn chili",
        "2 ss olje eller niter kibbeh",
        "rosmarin",
        "salt"
      ],
      "steps": [
        "Skjær kjøttet i jevne biter og tørk overflaten.",
        "Stek kjøttet i små omganger til ønsket trygg gjennomsteking.",
        "Fres løk, hvitløk, chili og rosmarin.",
        "Vend kjøttet tilbake i pannen og smak til."
      ]
    },
    "variants": [
      "Awaze tibs har en krydret chilisaus; tibs kan også lages av lam."
    ],
    "serving": [
      "Server med injera og grønnsaker."
    ],
    "commonMistakes": [
      "Ikke overfyll pannen."
    ],
    "relatedDishIds": [
      "kitfo",
      "injera"
    ],
    "sources": [
      {
        "label": "Guide.et – Ethiopian food",
        "href": "https://guide.et/essentials/ethiopian-food"
      }
    ]
  },
  {
    "dishId": "kitfo",
    "summary": "Finhakket storfekjøtt med krydret smør og mitmita.",
    "overview": "Tradisjonell kitfo kan serveres rå eller lett varmebehandlet; hjemmeoppskriften bruker gjennomstekt kjøtt.",
    "history": "Kitfo forbindes særlig med Gurage-folkets matkultur i Etiopia.",
    "flavor": "Fyldig, smørpreget og sterk.",
    "technique": "Bruk fersk kjøttdeig og stek til minst 71 °C i hele massen.",
    "essentials": [
      "500 g storfekjøttdeig",
      "3 ss niter kibbeh eller smør",
      "mitmita etter smak"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 20 min",
      "ingredients": [
        "500 g storfekjøttdeig",
        "3 ss niter kibbeh eller smør",
        "mitmita etter smak",
        "salt"
      ],
      "steps": [
        "Smelt smøret forsiktig.",
        "Tilsett mitmita og kjøttdeig.",
        "Stek under omrøring til kjøttet er gjennomstekt.",
        "Smak til og server varmt."
      ]
    },
    "variants": [
      "Leb leb er en lett varmebehandlet variant. Rå og utilstrekkelig varmebehandlet kjøttdeig kan medføre sykdomsrisiko."
    ],
    "serving": [
      "Server med injera, ayib og grønne bladgrønnsaker."
    ],
    "commonMistakes": [
      "Ikke anta at krydder eller varmt smør gjør rå kjøttdeig trygg."
    ],
    "relatedDishIds": [
      "tibs",
      "injera"
    ],
    "sources": [
      {
        "label": "Guide.et – Ethiopian food",
        "href": "https://guide.et/essentials/ethiopian-food"
      }
    ]
  },
  {
    "dishId": "zigni",
    "summary": "Sterk eritreisk kjøttgryte med berbere, løk og tomat.",
    "overview": "Kjøtt trekkes lenge i en tykk og aromatisk rød saus.",
    "history": "Zigni er en kjent eritreisk gryterett som gjerne serveres med injera.",
    "flavor": "Dyp, sterk og fyldig.",
    "technique": "La løken koke inn før kjøtt og væske tilsettes.",
    "essentials": [
      "700 g storfekjøtt til gryte",
      "3 løk",
      "3 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2 timer",
      "ingredients": [
        "700 g storfekjøtt til gryte",
        "3 løk",
        "3 hvitløksfedd",
        "2 ss berbere, eller etter smak",
        "400 g tomater",
        "300 ml vann",
        "3 ss olje"
      ],
      "steps": [
        "Finhakk løken og la den mykne i olje.",
        "Tilsett hvitløk, berbere og tomat og la koke inn.",
        "Tilsett kjøtt og vann og la trekke under lokk til kjøttet er mørt.",
        "Reduser sausen etter behov og smak til med salt."
      ]
    },
    "variants": [
      "Varianter med andre typer kjøtt finnes."
    ],
    "serving": [
      "Server med injera."
    ],
    "commonMistakes": [
      "Unngå å svi krydderne før væsken tilsettes."
    ],
    "relatedDishIds": [
      "doro-wat",
      "injera"
    ],
    "sources": [
      {
        "label": "The Foreign Fork – Zigni",
        "href": "https://foreignfork.com/zigni/"
      }
    ]
  },
  {
    "dishId": "tajine",
    "summary": "Langsomt tilberedt marokkansk gryterett, oppkalt etter kokekaret med konisk lokk.",
    "overview": "Kjøtt eller grønnsaker trekkes med krydder under lokk. Denne varianten bruker kylling, oliven og saltet sitron.",
    "history": "Tajine er en sentral marokkansk mattradisjon med mange lokale varianter.",
    "flavor": "Aromatisk, salt-syrlig og fyldig.",
    "technique": "Bruk en gryte med tett lokk og la ingrediensene trekke rolig.",
    "essentials": [
      "800 g kyllinglår",
      "2 løk",
      "3 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 75 min",
      "ingredients": [
        "800 g kyllinglår",
        "2 løk",
        "3 hvitløksfedd",
        "1 ts ingefær",
        "1 ts gurkemeie",
        "100 g oliven",
        "½ saltet sitron",
        "200 ml vann",
        "olivenolje"
      ],
      "steps": [
        "Fres løk og hvitløk i olje.",
        "Tilsett krydder, kylling og vann.",
        "La trekke under lokk til kyllingen er gjennomstekt og mør.",
        "Tilsett oliven og saltet sitron mot slutten."
      ]
    },
    "variants": [
      "Lam med svisker og grønnsakstajine er andre varianter."
    ],
    "serving": [
      "Server med brød."
    ],
    "commonMistakes": [
      "Unngå hard koking og unødvendig mye væske."
    ],
    "relatedDishIds": [
      "couscous",
      "harira"
    ],
    "sources": [
      {
        "label": "Taste of Maroc – Chicken with preserved lemon and olives",
        "href": "https://tasteofmaroc.com/moroccan-chicken-with-preserved-lemon-olives-daghmira/"
      }
    ]
  },
  {
    "dishId": "couscous",
    "summary": "Små gryn av durumhvete, ofte servert med grønnsaker og kjøtt eller belgfrukter.",
    "overview": "Tradisjonelt dampes grynene over en gryte; hurtigcouscous kan trekkes i varm væske.",
    "history": "Kunnskap og praksis knyttet til couscous ble innskrevet på UNESCOs liste over immateriell kulturarv i 2020 etter en felles nominasjon fra Algerie, Mauritania, Marokko og Tunisia.",
    "flavor": "Lette gryn med fyldig kraft og mildt krydrede grønnsaker.",
    "technique": "Skill grynene forsiktig med en gaffel og tilpass væsken til produktet.",
    "essentials": [
      "300 g hurtigcouscous",
      "2 gulrøtter",
      "1 squash"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "300 g hurtigcouscous",
        "2 gulrøtter",
        "1 squash",
        "1 løk",
        "400 g kokte kikerter",
        "400 g tomater",
        "500 ml grønnsakskraft",
        "spisskummen",
        "olivenolje"
      ],
      "steps": [
        "Fres løk og krydder i olje.",
        "Tilsett tomat, kraft og gulrot og la småkoke.",
        "Tilsett squash og kikerter og kok til møre.",
        "Tilbered couscous separat etter pakningen og server med grønnsaker og kraft."
      ]
    },
    "variants": [
      "Varianter med lam, kylling eller fisk; i Marokko er couscous med sju grønnsaker velkjent."
    ],
    "serving": [
      "Server grynene på et fat med grønnsakene over."
    ],
    "commonMistakes": [
      "Ikke bruk for mye væske i hurtigcouscous."
    ],
    "relatedDishIds": [
      "tajine",
      "harira"
    ],
    "sources": [
      {
        "label": "UNESCO – Couscous som immateriell kulturarv",
        "href": "https://ich.unesco.org/en/RL/knowledge-know-how-and-practices-pertaining-to-the-production-and-consumption-of-couscous-01602"
      }
    ]
  },
  {
    "dishId": "harira",
    "summary": "Marokkansk suppe med tomat, linser, kikerter og urter.",
    "overview": "Belgfrukter kokes i aromatisk tomatkraft, gjerne jevnet med mel.",
    "history": "Harira er særlig kjent som suppe ved fastens avslutning under ramadan, men spises også ellers i året.",
    "flavor": "Fyldig, syrlig og urtepreget.",
    "technique": "La linsene bli møre før eventuell meljevning tilsettes.",
    "essentials": [
      "400 g tomater",
      "150 g tørre linser",
      "400 g kokte kikerter"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 60 min",
      "ingredients": [
        "400 g tomater",
        "150 g tørre linser",
        "400 g kokte kikerter",
        "1 løk",
        "2 selleristilker",
        "1,2 l kraft",
        "ingefær",
        "koriander",
        "persille",
        "2 ss mel"
      ],
      "steps": [
        "Fres hakket løk, selleri og ingefær.",
        "Tilsett tomater, kraft og linser og kok til linsene er møre.",
        "Tilsett kikerter og hakkede urter.",
        "Visp mel ut i kaldt vann, tilsett gradvis og la suppen småkoke."
      ]
    },
    "variants": [
      "Noen varianter inneholder kjøtt, ris eller vermicelli."
    ],
    "serving": [
      "Server med sitron og brød, gjerne dadler ved siden av."
    ],
    "commonMistakes": [
      "Ikke tilsett tørr meljevning direkte i varm suppe."
    ],
    "relatedDishIds": [
      "couscous",
      "shiro"
    ],
    "sources": [
      {
        "label": "Taste of Maroc – Harira",
        "href": "https://tasteofmaroc.com/moroccan-harira-soup-recipe/"
      }
    ]
  },
  {
    "dishId": "pastilla",
    "summary": "Sprø, lagdelt marokkansk pai med krydret fyll, ofte kylling og mandler.",
    "overview": "Tynne deigark omslutter et saftig fyll; kjøttvarianter kombinerer ofte salt og søtt.",
    "history": "Pastilla er kjent som marokkansk festmat og finnes med blant annet due, kylling og sjømat.",
    "flavor": "Sprø, aromatisk og søt-salt.",
    "technique": "Kok inn fyllet og avkjøl det før deigarkene fylles.",
    "essentials": [
      "250 g filodeig",
      "500 g kyllinglårfilet",
      "2 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "250 g filodeig",
        "500 g kyllinglårfilet",
        "2 løk",
        "3 egg",
        "100 g mandler",
        "kanel",
        "ingefær",
        "persille",
        "smør",
        "melis etter smak"
      ],
      "steps": [
        "Fres løk og krydder, tilsett kylling og litt vann og trekk til gjennomstekt.",
        "Riv kjøttet i biter og kok inn sausen; rør inn egg til de har satt seg.",
        "Avkjøl fyllet og rist og hakk mandlene.",
        "Legg smørpenslede filoark i en form, fyll med kjøtt, eggestand og mandler og brett sammen.",
        "Stek ved 190 °C til gyllen og gjennomvarm."
      ]
    },
    "variants": [
      "Sjømatpastilla har gjerne et mindre søtlig fyll."
    ],
    "serving": [
      "Server lun, eventuelt med litt melis og kanel."
    ],
    "commonMistakes": [
      "Ikke fyll deigen med en rennende, varm saus."
    ],
    "relatedDishIds": [
      "spanakopita",
      "tajine"
    ],
    "sources": [
      {
        "label": "SBS Food – Moroccan cuisine",
        "href": "https://www.sbs.com.au/food/article/in-the-kitchen-moroccan/80kz6dyok"
      }
    ]
  },
  {
    "dishId": "shakshuka",
    "summary": "Egg tilberedt i en krydret saus av tomater og ofte paprika.",
    "overview": "En konsentrert grønnsakssaus danner grunnlaget for egg som tilberedes direkte i pannen.",
    "history": "Retten har nordafrikanske røtter og er også utbredt i deler av Midtøsten. Det nøyaktige opphavet er omdiskutert.",
    "flavor": "Syrlig, fruktig og krydret.",
    "technique": "Reduser sausen før eggene knekkes i små fordypninger.",
    "essentials": [
      "6 egg",
      "800 g tomater",
      "1 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 35 min",
      "ingredients": [
        "6 egg",
        "800 g tomater",
        "1 løk",
        "1 paprika",
        "2 hvitløksfedd",
        "spisskummen",
        "paprikapulver",
        "chili",
        "olivenolje"
      ],
      "steps": [
        "Fres løk, paprika og hvitløk.",
        "Tilsett krydder og tomat og kok inn til tykk saus.",
        "Lag fordypninger og knekk eggene i sausen.",
        "Legg på lokk og tilbered til eggene har satt seg; gjennomstek ved behov."
      ]
    },
    "variants": [
      "Varianter med merguez, grønne grønnsaker eller andre krydder."
    ],
    "serving": [
      "Server med brød."
    ],
    "commonMistakes": [
      "Ikke tilsett eggene før sausen har tyknet."
    ],
    "relatedDishIds": [
      "merguez"
    ],
    "sources": [
      {
        "label": "The Irish Times – Shakshuka og nordafrikanske mattradisjoner",
        "href": "https://www.irishtimes.com/life-and-style/food-and-drink/shakshuka-all-mixed-up-over-a-brilliant-breakfast-1.4526350"
      }
    ]
  },
  {
    "dishId": "merguez",
    "summary": "Krydret nordafrikansk pølse, vanligvis av lam eller storfe.",
    "overview": "Pølsen krydres med blant annet chili, paprika og spisskummen og grilles eller stekes.",
    "history": "Merguez inngår i nordafrikanske mattradisjoner og brukes også i shakshuka og andre retter.",
    "flavor": "Sterk, aromatisk og ristet.",
    "technique": "Stek ferske pølser på moderat varme til gjennomstekte.",
    "essentials": [
      "500 g ferske merguezpølser",
      "1 løk",
      "2 paprika"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30 min",
      "ingredients": [
        "500 g ferske merguezpølser",
        "1 løk",
        "2 paprika",
        "1 ss olivenolje",
        "sitron",
        "brød"
      ],
      "steps": [
        "Skjær løk og paprika i strimler.",
        "Stek grønnsakene i olje til møre.",
        "Grill eller pannestek pølsene til gjennomstekte, minst 71 °C for kjøttdeig av lam eller storfe.",
        "Server med grønnsaker, sitron og brød."
      ]
    },
    "variants": [
      "Merguez kan også serveres med couscous eller brukes som ingrediens i gryter."
    ],
    "serving": [
      "Server med harissa etter smak."
    ],
    "commonMistakes": [
      "Ikke stek pølsene på så høy varme at de brenner før midten er ferdig."
    ],
    "relatedDishIds": [
      "shakshuka",
      "couscous"
    ],
    "sources": [
      {
        "label": "Epicurious – Shakshouka with merguez",
        "href": "https://www.epicurious.com/recipes/food/views/shakshouka-with-merguez-373307"
      }
    ]
  },
  {
    "dishId": "feijoada",
    "summary": "Brasiliansk gryte med svarte bønner og ulike typer svinekjøtt.",
    "overview": "Bønnene kokes sammen med kjøtt og aromater til en tykk, mørk kraft.",
    "history": "Feijoada er en kjent brasiliansk fellesmåltidsrett. Fortellinger om dens nøyaktige opphav er omdiskuterte.",
    "flavor": "Fyldig, salt og jordaktig, ofte med røykpreg.",
    "technique": "Bløtlegg tørre bønner og kok dem godt møre; smak til med salt mot slutten.",
    "essentials": [
      "350 g tørre svarte bønner",
      "400 g svinenakke",
      "150 g røkt pølse"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2–3 timer + bløtlegging",
      "ingredients": [
        "350 g tørre svarte bønner",
        "400 g svinenakke",
        "150 g røkt pølse",
        "100 g bacon",
        "1 løk",
        "3 hvitløksfedd",
        "2 laurbærblad",
        "vann"
      ],
      "steps": [
        "Bløtlegg bønnene over natten i kjøleskap, hell av vannet og skyll.",
        "Brun kjøtt, bacon og løk lett i en gryte.",
        "Tilsett bønner, hvitløk, laurbær og vann til det dekker. Kok kraftig i minst 10 minutter, senk varmen og la småkoke til bønnene og kjøttet er møre.",
        "Tilsett pølsen mot slutten, kok til gjennomvarm og smak til."
      ]
    },
    "variants": [
      "Ulike kjøttstykker og saltede kjøttprodukter brukes; dette er en forenklet hjemmevariant."
    ],
    "serving": [
      "Server med ris, farofa, finsnittet grønnkål og appelsin."
    ],
    "commonMistakes": [
      "Ikke salt gryten tidlig dersom kjøttet allerede er salt."
    ],
    "relatedDishIds": [
      "rendang",
      "koshari"
    ],
    "sources": [
      {
        "label": "Panelinha – Feijoada",
        "href": "https://panelinha.com.br/receita/feijoada"
      },
      {
        "label": "Good Food – Feijoada",
        "href": "https://www.bbcgoodfood.com/recipes/feijoada"
      }
    ]
  },
  {
    "dishId": "moqueca",
    "summary": "Brasiliansk fiskerett med tomat, løk, koriander og regionale variasjoner.",
    "overview": "Fisk trekkes forsiktig sammen med grønnsaker; denne oppskriften er inspirert av moqueca baiana med kokosmelk og dendê.",
    "history": "Bahia og Espírito Santo har særegne moqueca-tradisjoner som ikke bør forveksles.",
    "flavor": "Saftig fisk, fruktig tomat og fyldig kokos i Bahia-varianten.",
    "technique": "Bygg grønnsaksbasen før fisken tilsettes; unngå kraftig omrøring.",
    "essentials": [
      "600 g fast hvit fisk",
      "1 lime",
      "2 tomater"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min",
      "ingredients": [
        "600 g fast hvit fisk",
        "1 lime",
        "2 tomater",
        "1 løk",
        "1 paprika",
        "200 ml kokosmelk",
        "1–2 ss dendê (rød palmeolje)",
        "koriander",
        "salt"
      ],
      "steps": [
        "Skjær fisken i store biter og vend med lime og litt salt.",
        "Legg løk, paprika og tomat lagvis i en gryte.",
        "Tilsett kokosmelk og dendê og la grønnsakene mykne.",
        "Legg fisken i gryten og trekk under lokk til gjennomkokt. Topp med koriander."
      ]
    },
    "variants": [
      "Moqueca capixaba bruker ikke dendê eller kokosmelk; urucum og olivenolje gir en annen profil."
    ],
    "serving": [
      "Server med ris og eventuelt pirão."
    ],
    "commonMistakes": [
      "Ikke rør hardt i gryten slik at fiskestykkene går i oppløsning."
    ],
    "relatedDishIds": [
      "bouillabaisse",
      "lohikeitto"
    ],
    "sources": [
      {
        "label": "Panelinha – Moqueca baiana",
        "href": "https://panelinha.com.br/receita/moqueca-de-peixe-baiana-revisitada"
      },
      {
        "label": "Panelinha – Moqueca capixaba",
        "href": "https://panelinha.com.br/receita/moqueca-capixaba"
      }
    ]
  },
  {
    "dishId": "coxinha",
    "summary": "Dråpeformet brasiliansk krokettsnack med revet kyllingfyll.",
    "overview": "En kokt meldeig omslutter krydret kylling før bitene paneres og friteres.",
    "history": "Coxinha er en utbredt brasiliansk salgadinho, kjent fra bakerier, snackbarer og selskaper.",
    "flavor": "Sprø panering og myk deig med saftig kylling.",
    "technique": "Avkjøl deigen og fyllet før forming og forsegl skjøten godt.",
    "essentials": [
      "300 g kokt revet kylling",
      "1 løk",
      "2 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 12 små coxinhas",
      "time": "ca. 75 min",
      "ingredients": [
        "300 g kokt revet kylling",
        "1 løk",
        "2 hvitløksfedd",
        "300 ml kyllingkraft",
        "200 g hvetemel",
        "25 g smør",
        "1 egg",
        "brødsmuler",
        "frityrolje"
      ],
      "steps": [
        "Fres løk og hvitløk, bland inn kyllingen og smak til. Avkjøl.",
        "Kok opp kraft og smør, rør inn melet og arbeid deigen til den slipper kjelen. Avkjøl til håndterbar.",
        "Form små deigskåler, fyll og lukk til dråpeform.",
        "Vend i sammenvispet egg og brødsmuler, friter ved omtrent 170 °C til gylne og gjennomvarme."
      ]
    },
    "variants": [
      "Coxinha med kremost i fyllet er en populær variant."
    ],
    "serving": [
      "Server varm som smårett."
    ],
    "commonMistakes": [
      "Unngå vått fyll eller hull i deigen."
    ],
    "relatedDishIds": [
      "croquetas",
      "arancini"
    ],
    "sources": [
      {
        "label": "Good Food – Coxinhas",
        "href": "https://www.bbcgoodfood.com/recipes/coxinhas"
      }
    ]
  },
  {
    "dishId": "pao-de-queijo",
    "summary": "Små brasilianske ostebrød bakt med maniokstivelse.",
    "overview": "En deig av polvilho, melk, egg, fett og ost formes til boller og stekes.",
    "history": "Pão de queijo forbindes særlig med Minas Gerais og spises gjerne til frokost eller kaffe.",
    "flavor": "Osteaktig, lett sprø utenpå og seig eller myk inni.",
    "technique": "Bruk maniokstivelse, ikke vanlig hvetemel, og juster egget etter deigens konsistens.",
    "essentials": [
      "250 g polvilho doce (tapiokastivelse)",
      "125 ml melk",
      "50 ml nøytral olje"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 16 små ostebrød",
      "time": "ca. 45 min",
      "ingredients": [
        "250 g polvilho doce (tapiokastivelse)",
        "125 ml melk",
        "50 ml nøytral olje",
        "1–2 egg",
        "120 g revet fast ost",
        "½ ts salt"
      ],
      "steps": [
        "Varm melk, olje og salt til kokepunktet.",
        "Hell over stivelsen og bland. La avkjøle litt.",
        "Arbeid inn ost og egg gradvis til en formbar deig.",
        "Form små boller og stek ved 200 °C til de er hevet og gylne, omtrent 20–30 minutter."
      ]
    },
    "variants": [
      "Polvilho azedo gir en annen smak og struktur enn polvilho doce."
    ],
    "serving": [
      "Server lune til kaffe eller som mellommåltid."
    ],
    "commonMistakes": [
      "Ikke tilsett all eggemassen på én gang."
    ],
    "relatedDishIds": [
      "focaccia",
      "coxinha"
    ],
    "sources": [
      {
        "label": "Panelinha – Pão de queijo",
        "href": "https://panelinha.com.br/receita/pao-de-queijo"
      },
      {
        "label": "Good Food – Brazilian cheese bread",
        "href": "https://www.bbcgoodfood.com/recipes/brazilian-cheese-bread-pao-de-queijo"
      }
    ]
  },
  {
    "dishId": "acaraje",
    "summary": "Afrobrasilianske friterte bønnekaker av svartøyebønner, løk og salt.",
    "overview": "En luftig bønnemasse friteres i dendê og serveres ofte med vatapá, tørkede reker og chili.",
    "history": "Acarajé har vestafrikanske røtter og er nært knyttet til afrobrasiliansk kultur og religiøse tradisjoner. Håndverket til baianas do acarajé er anerkjent som brasiliansk kulturarv.",
    "flavor": "Sprø, nøtteaktig og aromatisk.",
    "technique": "Fjern skallene fra bønnene og pisk massen luftig før fritering.",
    "essentials": [
      "300 g tørre svartøyebønner",
      "1 liten løk",
      "salt"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 8 små kaker",
      "time": "ca. 60 min + bløtlegging",
      "ingredients": [
        "300 g tørre svartøyebønner",
        "1 liten løk",
        "salt",
        "dendê (rød palmeolje) til fritering",
        "vatapá eller rekefyll etter ønske"
      ],
      "steps": [
        "Bløtlegg bønnene i kjøleskap, gni av skallene og skyll.",
        "Mal de avrente bønnene med løk og så lite vann som mulig.",
        "Pisk massen luftig og smak til med salt.",
        "Form med skje og friter i små omganger ved ca. 170 °C til gylne og gjennomstekte.",
        "Del og fyll med vatapá eller ferdig tilberedt rekefyll."
      ]
    },
    "variants": [
      "Abará er en beslektet rett som dampes i blad i stedet for å friteres."
    ],
    "serving": [
      "Server nystekt med fyll og chilisaus."
    ],
    "commonMistakes": [
      "Ikke tilsett så mye vann at massen blir for løs."
    ],
    "relatedDishIds": [
      "vada",
      "coxinha"
    ],
    "sources": [
      {
        "label": "IPAC Bahia – Ofício das Baianas do Acarajé",
        "href": "https://www.ba.gov.br/ipac/oficio-das-baianas-do-acaraje"
      },
      {
        "label": "Panelinha – Acarajé da Paloma",
        "href": "https://panelinha.com.br/receita/acaraje-da-paloma"
      }
    ]
  },
  {
    "dishId": "brigadeiro",
    "summary": "Små brasilianske sjokoladekuler av søtet kondensert melk, kakao og smør.",
    "overview": "Massen kokes inn, avkjøles, rulles i kuler og dekkes ofte med sjokoladestrø.",
    "history": "Brigadeiro er en velkjent del av brasilianske bursdager og andre feiringer.",
    "flavor": "Søt, myk, seig og sjokoladepreget.",
    "technique": "Rør kontinuerlig over lav til middels varme til massen slipper bunnen.",
    "essentials": [
      "1 boks søtet kondensert melk (ca. 395 g)",
      "2 ss usøtet kakao",
      "1 ss smør"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 20 kuler",
      "time": "ca. 25 min + avkjøling",
      "ingredients": [
        "1 boks søtet kondensert melk (ca. 395 g)",
        "2 ss usøtet kakao",
        "1 ss smør",
        "sjokoladestrø"
      ],
      "steps": [
        "Bland kondensert melk, kakao og smør i en tykkbunnet kjele.",
        "Varm forsiktig under konstant omrøring til massen tykner og bunnen blir synlig når du drar sleiven gjennom.",
        "Hell over på en smurt tallerken og avkjøl.",
        "Rull små kuler med smurte hender og vend i sjokoladestrø."
      ]
    },
    "variants": [
      "Brigadeiro de colher serveres mykere med skje."
    ],
    "serving": [
      "Server i små papirformer."
    ],
    "commonMistakes": [
      "Ikke bruk usøtet evaporert melk som erstatning for søtet kondensert melk."
    ],
    "relatedDishIds": [
      "tiramisu",
      "cannoli"
    ],
    "sources": [
      {
        "label": "Good Food – Brigadeiro",
        "href": "https://www.bbcgoodfood.com/recipes/brazilian-chocolate-truffles-brigadeiro"
      }
    ]
  },
  {
    "dishId": "bacalhau-a-bras",
    "summary": "Portugisisk klippfiskrett med tynne potetstrimler, løk og egg.",
    "overview": "Utvannet klippfisk flakes og blandes med stekt løk, sprø poteter og egg.",
    "history": "Retten forbindes særlig med Lisboa og den omfattende portugisiske klippfisktradisjonen.",
    "flavor": "Salt, fyldig og kremet med mild løksødme.",
    "technique": "Bruk ferdig utvannet klippfisk og la eggene sette seg forsiktig.",
    "essentials": [
      "400 g ferdig utvannet klippfisk",
      "300 g poteter",
      "1 stor løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min med utvannet fisk",
      "ingredients": [
        "400 g ferdig utvannet klippfisk",
        "300 g poteter",
        "1 stor løk",
        "2 hvitløksfedd",
        "5 egg",
        "olivenolje",
        "svarte oliven",
        "persille"
      ],
      "steps": [
        "Trekk fisken til gjennomkokt, fjern bein og skinn og del i flak.",
        "Skjær potetene i tynne strimler og stek til sprø.",
        "Fres løk og hvitløk i olje; vend inn fisk og poteter.",
        "Tilsett sammenvispede egg og rør over lav varme til de har satt seg.",
        "Topp med persille og oliven."
      ]
    },
    "variants": [
      "Ferdig batata palha kan brukes for å spare tid."
    ],
    "serving": [
      "Server straks med grønn salat."
    ],
    "commonMistakes": [
      "Ikke bruk klippfisk som fortsatt er for salt."
    ],
    "relatedDishIds": [
      "plokkfiskur",
      "tortilla-espanola"
    ],
    "sources": [
      {
        "label": "VisitPortugal – Portugisisk matkultur",
        "href": "https://www.visitportugal.com/en/content/the-portuguese-menu-fish-coriander-and-fantasy"
      },
      {
        "label": "Recipes.pt – Portugisiske retter",
        "href": "https://recipes.pt/pt/receitas/"
      }
    ]
  },
  {
    "dishId": "francesinha",
    "summary": "Varmt portugisisk smørbrød med kjøtt, smeltet ost og fyldig saus.",
    "overview": "Brød fylles med stekt kjøtt, skinke og pølse, dekkes med ost og serveres med varm saus.",
    "history": "Francesinha er særlig knyttet til Porto og byens kafé- og restaurantkultur.",
    "flavor": "Kraftig, salt, fyldig og lett pikant.",
    "technique": "Tilbered kjøtt og saus separat før smørbrødet gratineres.",
    "essentials": [
      "8 tykke brødskiver",
      "4 tynne storfebiffer",
      "150 g kokt skinke"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 50 min",
      "ingredients": [
        "8 tykke brødskiver",
        "4 tynne storfebiffer",
        "150 g kokt skinke",
        "200 g fersk pølse",
        "200 g ost i skiver",
        "300 ml kraft",
        "200 ml øl eller alkoholfritt øl",
        "150 g tomatpuré/passata",
        "chili etter smak"
      ],
      "steps": [
        "Kok kraft, øl og tomat til en fyldig saus; smak til med chili.",
        "Stek biff og pølse til ferdige, pølsen helt gjennomstekt.",
        "Legg kjøtt og skinke mellom brødskiver, dekk med ost.",
        "Gratiner ved 220 °C til osten smelter og hell varm saus over."
      ]
    },
    "variants": [
      "Francesinha especial serveres ofte med stekt egg og pommes frites."
    ],
    "serving": [
      "Server varm med kniv og gaffel."
    ],
    "commonMistakes": [
      "Ikke gjør sausen så tynn at brødet blir helt oppløst."
    ],
    "relatedDishIds": [
      "croque-monsieur",
      "bifana"
    ],
    "sources": [
      {
        "label": "VisitPortugal – Time to taste Portugal",
        "href": "https://www.visitportugal.com/en/content/time-to-taste-portugal"
      },
      {
        "label": "Recipes.pt – Portugisiske retter",
        "href": "https://recipes.pt/pt/receitas/"
      }
    ]
  },
  {
    "dishId": "caldo-verde",
    "summary": "Portugisisk suppe med potet, finsnittet bladkål og ofte chouriço.",
    "overview": "Potet og løk kokes og moses til en glatt base før grønne kålstrimler tilsettes.",
    "history": "Caldo verde har røtter i Nord-Portugal og serveres over hele landet, også ved folkefester.",
    "flavor": "Mild, fyldig og grønn med røkt pølse som kontrast.",
    "technique": "Skjær kålen svært fint og tilsett den etter at potetbasen er most.",
    "essentials": [
      "600 g poteter",
      "1 løk",
      "2 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min",
      "ingredients": [
        "600 g poteter",
        "1 løk",
        "2 hvitløksfedd",
        "1,2 l vann eller kraft",
        "200 g bladkål",
        "150 g chouriço",
        "olivenolje"
      ],
      "steps": [
        "Kok potet, løk og hvitløk i vann til møre.",
        "Mos suppen glatt og tilsett olivenolje.",
        "Tilsett finsnittet kål og la småkoke til mør.",
        "Varm pølseskivene i suppen til gjennomvarme, eller gjennomstek fersk pølse separat."
      ]
    },
    "variants": [
      "En plantebasert variant kan lages uten pølse."
    ],
    "serving": [
      "Server med brød og litt olivenolje."
    ],
    "commonMistakes": [
      "Ikke mos kålen sammen med potetene."
    ],
    "relatedDishIds": [
      "harira",
      "lohikeitto"
    ],
    "sources": [
      {
        "label": "VisitPortugal – Portugisisk matkultur",
        "href": "https://www.visitportugal.com/en/content/the-portuguese-menu-fish-coriander-and-fantasy"
      },
      {
        "label": "Recipes.pt – Portugisiske retter",
        "href": "https://recipes.pt/pt/receitas/"
      }
    ]
  },
  {
    "dishId": "arroz-de-marisco",
    "summary": "Saftig portugisisk risrett med skalldyr, tomat og sjømatkraft.",
    "overview": "Risen kokes i rikelig aromatisk kraft; sjømaten tilsettes etter koketid.",
    "history": "Arroz de marisco inngår i Portugals kystbaserte mattradisjoner.",
    "flavor": "Fyldig, maritim og frisk med koriander.",
    "technique": "Behold retten saftig, og tilsett reker og annen sjømat mot slutten.",
    "essentials": [
      "300 g rundkornet ris",
      "250 g rå rensede reker",
      "300 g blåskjell"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "300 g rundkornet ris",
        "250 g rå rensede reker",
        "300 g blåskjell",
        "200 g blekksprut i biter",
        "400 g tomater",
        "1 løk",
        "2 hvitløksfedd",
        "1 l sjømatkraft",
        "koriander",
        "olivenolje"
      ],
      "steps": [
        "Fres løk og hvitløk i olje og tilsett tomater.",
        "Tilsett kraft, ris og blekksprut og la småkoke til risen nesten er mør.",
        "Tilsett rensede blåskjell og reker; kok til sjømaten er ferdig. Kast skjell som ikke åpner seg.",
        "Juster med varm kraft til saftig konsistens og topp med koriander."
      ]
    },
    "variants": [
      "Sammensetningen av sjømat varierer etter tilgjengelighet."
    ],
    "serving": [
      "Server straks i dype tallerkener."
    ],
    "commonMistakes": [
      "Ikke la risen trekke til all væsken er borte."
    ],
    "relatedDishIds": [
      "paella-valenciana",
      "bouillabaisse"
    ],
    "sources": [
      {
        "label": "Recipes.pt – Portugisiske retter",
        "href": "https://recipes.pt/pt/receitas/"
      },
      {
        "label": "Visitus – Traditional Portuguese Food",
        "href": "https://www.visitus.pt/traditional-portuguese-food/"
      }
    ]
  },
  {
    "dishId": "bifana",
    "summary": "Portugisisk sandwich med tynne, krydrede skiver av svinekjøtt.",
    "overview": "Kjøttet marineres gjerne med hvitløk og vin før det stekes eller trekkes i saus.",
    "history": "Bifana er utbredt portugisisk kafé- og gatemat, med lokale varianter blant annet i Porto og Vendas Novas.",
    "flavor": "Saftig, salt og aromatisk.",
    "technique": "Skjær kjøttet tynt og unngå unødig lang steking.",
    "essentials": [
      "500 g svinefilet eller svinekam i tynne skiver",
      "3 hvitløksfedd",
      "100 ml hvitvin eller alkoholfri hvitvin"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 30 min + marinering",
      "ingredients": [
        "500 g svinefilet eller svinekam i tynne skiver",
        "3 hvitløksfedd",
        "100 ml hvitvin eller alkoholfri hvitvin",
        "1 ts paprikapulver",
        "1 laurbærblad",
        "olje",
        "4 rundstykker",
        "sennep etter smak"
      ],
      "steps": [
        "Mariner svinekjøttet med vin, hvitløk, paprika og laurbær i kjøleskap.",
        "Stek kjøttet i omganger; tilbered til minst 63 °C med tre minutters hvile for hele kjøttstykker.",
        "Kok opp marinaden separat dersom den skal brukes som saus, og la den koke godt gjennom.",
        "Fordel kjøttet i varme rundstykker og server."
      ]
    },
    "variants": [
      "Portovarianter serveres ofte med kjøtt i en krydret saus."
    ],
    "serving": [
      "Server med sennep eller litt chilisaus."
    ],
    "commonMistakes": [
      "Ikke server marinade som har vært i kontakt med rått kjøtt uten å koke den."
    ],
    "relatedDishIds": [
      "francesinha",
      "doner"
    ],
    "sources": [
      {
        "label": "VisitPortugal – Time to taste Portugal",
        "href": "https://www.visitportugal.com/en/content/time-to-taste-portugal"
      },
      {
        "label": "Recipes.pt – Portugisiske retter",
        "href": "https://recipes.pt/pt/receitas/"
      }
    ]
  },
  {
    "dishId": "pastel-de-nata",
    "summary": "Portugisisk butterdeigsterte med eggekrem og karamelliserte flekker.",
    "overview": "Tynn butterdeig fylles med eggekrem og stekes ved høy varme.",
    "history": "Pastéis de nata er en del av Portugals søtbaksttradisjon, særlig kjent fra Lisboa og Belém.",
    "flavor": "Sprø, kremet og søt med lett karamellpreg.",
    "technique": "Bruk kald butterdeig og en godt forvarmet ovn; dette er en tilpasset hjemmevariant.",
    "essentials": [
      "300 g butterdeig",
      "300 ml melk",
      "100 g sukker"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 12 små terter",
      "time": "ca. 50 min",
      "ingredients": [
        "300 g butterdeig",
        "300 ml melk",
        "100 g sukker",
        "4 eggeplommer",
        "1 ss maisstivelse",
        "sitronskall",
        "1 kanelstang"
      ],
      "steps": [
        "Varm melk med sitronskall og kanel. Fjern aromatene.",
        "Visp plommer, sukker og stivelse, spe gradvis med varm melk og varm under omrøring til kremen tykner. Avkjøl litt.",
        "Rull butterdeigen sammen, skjær i skiver og trykk ut i små terteformer.",
        "Fyll formene og stek ved 240–250 °C, innenfor ovnens og formenes temperaturgrense, til deigen er gyllen og kremen har satt seg."
      ]
    },
    "variants": [
      "Pastéis de Belém er et særskilt produkt fra Belém, ikke et generelt navn på alle pastéis de nata."
    ],
    "serving": [
      "Server lune med kanel og kaffe."
    ],
    "commonMistakes": [
      "Ikke fyll formene helt opp eller la butterdeigen bli varm før steking."
    ],
    "relatedDishIds": [
      "brigadeiro",
      "tiramisu"
    ],
    "sources": [
      {
        "label": "VisitPortugal – Tradisjonell oppskrift på pastéis de nata",
        "href": "https://www.visitportugal.com/en/content/traditional-portuguese-recipes-past%C3%A9is-de-nata-custard-tarts"
      },
      {
        "label": "VisitPortugal – Time to taste Portugal",
        "href": "https://www.visitportugal.com/en/content/time-to-taste-portugal"
      }
    ]
  },
  {
    "dishId": "pierogi",
    "summary": "Polske deigpakker med salt eller søtt fyll, vanligvis kokt.",
    "overview": "En tynn meldeig brettes rundt fyllet. Denne hjemmevarianten bruker potet og ferskost.",
    "history": "Pierogi er sentrale i polsk matkultur, med blant annet kål- og soppfyll til jul.",
    "flavor": "Myk deig og mildt, fyldig fyll.",
    "technique": "Kjevle deigen jevnt og klem kantene godt sammen.",
    "essentials": [
      "350 g hvetemel",
      "180 ml varmt vann",
      "1 ss olje"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "350 g hvetemel",
        "180 ml varmt vann",
        "1 ss olje",
        "400 g poteter",
        "200 g twaróg eller avrent cottage cheese",
        "1 løk",
        "salt og pepper"
      ],
      "steps": [
        "Elt mel, vann, olje og salt til glatt deig; la hvile.",
        "Kok potetene og mos dem med osten og stekt løk.",
        "Kjevle ut deigen, stikk ut sirkler, fyll og forsegl.",
        "Kok i omganger i saltet vann til deigen er gjennomkokt."
      ]
    },
    "variants": [
      "Pierogi med kjøtt, surkål og sopp eller frukt er andre varianter."
    ],
    "serving": [
      "Server med stekt løk og rømme."
    ],
    "commonMistakes": [
      "Ikke få fyll i skjøten når deigen lukkes."
    ],
    "relatedDishIds": [
      "varenyky",
      "manti"
    ],
    "sources": [
      {
        "label": "Culture.pl – Polish Food 101: Pierogi",
        "href": "https://culture.pl/en/work/polish-food-101-pierogi"
      }
    ]
  },
  {
    "dishId": "bigos",
    "summary": "Langtidskokt polsk gryte med surkål, fersk kål og kjøtt.",
    "overview": "Kål og kjøtt kokes sammen med sopp og krydder til en konsentrert gryte.",
    "history": "Bigos har en lang historie i polsk matkultur og er særlig kjent som vinter- og festmat.",
    "flavor": "Syrlig, fyldig og ofte røykpreget.",
    "technique": "La gryten trekke rolig over lang tid.",
    "essentials": [
      "500 g surkål",
      "400 g hodekål",
      "400 g svinenakke"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 3 timer",
      "ingredients": [
        "500 g surkål",
        "400 g hodekål",
        "400 g svinenakke",
        "200 g røkt pølse",
        "1 løk",
        "20 g tørket sopp",
        "2 laurbærblad",
        "pepper",
        "vann eller kraft"
      ],
      "steps": [
        "Bløtlegg soppen i varmt vann.",
        "Brun kjøtt og løk.",
        "Tilsett hakket kål, surkål, sopp, krydder og litt kraft.",
        "La småkoke under lokk til kjøttet og kålen er møre; tilsett pølse mot slutten og varm gjennom."
      ]
    },
    "variants": [
      "Tørkede svisker og forskjellige typer kjøtt brukes i noen varianter."
    ],
    "serving": [
      "Server med grovt brød."
    ],
    "commonMistakes": [
      "Ikke tilsett for mye salt før surkål og pølse er smakt til."
    ],
    "relatedDishIds": [
      "golabki",
      "feijoada"
    ],
    "sources": [
      {
        "label": "Culture.pl – Polish Food 101: Bigos",
        "href": "https://culture.pl/en/work/polish-food-101-bigos"
      }
    ]
  },
  {
    "dishId": "zurek",
    "summary": "Polsk syrlig suppe basert på fermentert mel, ofte rug.",
    "overview": "Kraften smaksettes med zakwas og serveres ofte med pølse og egg.",
    "history": "Żur og żurek har sterke tradisjoner i Polen, også ved påskefeiringen. Navnebruk og meltype varierer regionalt.",
    "flavor": "Syrlig, fyldig og aromatisk med merian.",
    "technique": "Bruk ferdig, egnet zakwas og smak til gradvis.",
    "essentials": [
      "1 l kraft",
      "300 ml ferdig rugzakwas til suppe",
      "300 g fersk hvit pølse"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "1 l kraft",
        "300 ml ferdig rugzakwas til suppe",
        "300 g fersk hvit pølse",
        "300 g poteter",
        "2 hvitløksfedd",
        "merian",
        "4 hardkokte egg",
        "rømme etter smak"
      ],
      "steps": [
        "Kok potetene i kraften til møre.",
        "Trekk pølsen til gjennomstekt og skjær den i skiver.",
        "Rør inn zakwas gradvis og la suppen småkoke.",
        "Smak til med hvitløk, merian og eventuell rømme; server med egg og pølse."
      ]
    },
    "variants": [
      "Varianter med røkt kjøtt eller uten kjøtt finnes; hvit barszcz er en beslektet suppe."
    ],
    "serving": [
      "Server med brød."
    ],
    "commonMistakes": [
      "Ikke tilsett all zakwas uten å smake til syren."
    ],
    "relatedDishIds": [
      "bigos",
      "borsjtsj"
    ],
    "sources": [
      {
        "label": "Culture.pl – Polish Food 101: Żur",
        "href": "https://culture.pl/en/work/polish-food-101-zur"
      }
    ]
  },
  {
    "dishId": "golabki",
    "summary": "Polske kålruller med fyll av kjøtt og ris.",
    "overview": "Myke kålblader brettes rundt fyllet og braiseres i kraft eller saus.",
    "history": "Gołąbki er en utbredt polsk variant av fylte kålblader, en tradisjon som finnes i mange europeiske kjøkken.",
    "flavor": "Mild kålsødme, fyldig kjøtt og syrlig tomatsaus.",
    "technique": "Myk opp bladene og skjær ned den tykke midtnerven før rulling.",
    "essentials": [
      "1 hodekål",
      "500 g kjøttdeig",
      "150 g kokt ris"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "1 hodekål",
        "500 g kjøttdeig",
        "150 g kokt ris",
        "1 løk",
        "400 g passata",
        "200 ml kraft",
        "salt og pepper"
      ],
      "steps": [
        "Forvell kålbladene til de er bøyelige.",
        "Bland kjøttdeig, kokt ris, finhakket løk og krydder.",
        "Fordel fyllet på bladene, brett inn sidene og rull.",
        "Legg rullene med skjøten ned i en gryte, tilsett kraft og passata og trekk under lokk til fyllet er gjennomstekt (minst 71 °C for storfe- eller svinefarse)."
      ]
    },
    "variants": [
      "Fyll med bokhvete eller sopp er andre varianter."
    ],
    "serving": [
      "Server med tomatsaus eller soppsaus."
    ],
    "commonMistakes": [
      "Ikke riv bladene ved å tvinge stive kålblader rundt fyllet."
    ],
    "relatedDishIds": [
      "bigos",
      "pierogi"
    ],
    "sources": [
      {
        "label": "Polish Your Kitchen – Gołąbki",
        "href": "https://www.polishyourkitchen.com/polish-cabbage-rolls-golabki/"
      }
    ]
  },
  {
    "dishId": "borsjtsj",
    "summary": "Rødbetebasert suppe med kraft, grønnsaker og ofte kjøtt.",
    "overview": "Rødbeter gir suppen farge og karakter; denne hjemmevarianten har potet, kål og bønner.",
    "history": "Kulturen rundt ukrainsk borsjtsj ble innskrevet på UNESCOs liste over immateriell kulturarv med behov for snarlig vern i 2022. Beslektede supper finnes i flere land.",
    "flavor": "Søtlig, syrlig og jordaktig.",
    "technique": "Smak til syren gradvis og la grønnsakene beholde noe struktur.",
    "essentials": [
      "400 g rødbeter",
      "300 g poteter",
      "200 g kål"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 60 min",
      "ingredients": [
        "400 g rødbeter",
        "300 g poteter",
        "200 g kål",
        "1 gulrot",
        "1 løk",
        "200 g kokte bønner",
        "1,2 l grønnsakskraft",
        "2 ss tomatpuré",
        "eddik etter smak",
        "dill"
      ],
      "steps": [
        "Fres løk, gulrot og revne rødbeter i litt olje med tomatpuré.",
        "Tilsett kraft og poteter og kok til nesten møre.",
        "Tilsett kål, rødbeteblanding og bønner; la småkoke til grønnsakene er møre.",
        "Smak til med eddik, salt og dill."
      ]
    },
    "variants": [
      "Varianter med kjøttkraft, svinekjøtt eller uten animalske råvarer finnes."
    ],
    "serving": [
      "Server med rømme og brød eller hvitløksboller."
    ],
    "commonMistakes": [
      "Ikke tilsett mye eddik uten å smake underveis."
    ],
    "relatedDishIds": [
      "zurek",
      "varenyky"
    ],
    "sources": [
      {
        "label": "UNESCO – Culture of Ukrainian borscht cooking",
        "href": "https://ich.unesco.org/en/USL/culture-of-ukrainian-borscht-cooking-01852"
      }
    ]
  },
  {
    "dishId": "varenyky",
    "summary": "Ukrainske fylte deigpakker som vanligvis kokes.",
    "overview": "En meldeig omslutter fyll av blant annet potet, ost, kål eller bær.",
    "history": "Varenyky er en sentral ukrainsk mattradisjon og har likhetstrekk med polske pierogi.",
    "flavor": "Myk deig og fyldig, mild smak i potetvarianten.",
    "technique": "La deigen hvile og lukk pakkene godt før koking.",
    "essentials": [
      "350 g hvetemel",
      "180 ml vann",
      "1 ss olje"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 80 min",
      "ingredients": [
        "350 g hvetemel",
        "180 ml vann",
        "1 ss olje",
        "500 g poteter",
        "2 løk",
        "salt",
        "rømme til servering"
      ],
      "steps": [
        "Elt mel, vann, olje og salt til glatt deig og la hvile.",
        "Kok potetene og mos dem med halvparten av den stekte løken.",
        "Kjevle ut deigen, stikk ut runde emner og brett rundt avkjølt fyll.",
        "Kok i omganger i saltet vann til deigen er gjennomkokt."
      ]
    },
    "variants": [
      "Fyll med surkål, ferskost eller kirsebær gir ulike salte og søte retter."
    ],
    "serving": [
      "Server potetvarenyky med stekt løk og rømme."
    ],
    "commonMistakes": [
      "Ikke overfyll pakkene."
    ],
    "relatedDishIds": [
      "pierogi",
      "borsjtsj"
    ],
    "sources": [
      {
        "label": "Yevhen Klopotenko – Varenyky med potet og brynza",
        "href": "https://klopotenko.com/doskonalyj-reczept-varenyky-z-kartopleyu-ta-brynzoyu-vid-yevgena-klopotenka/"
      },
      {
        "label": "Refugee Project Maastricht – Varenyky med potet og løk",
        "href": "https://refugeeprojectmaastricht.nl/a-cookbook-without-borders-interview-with-vasylyna-saievych/"
      }
    ]
  },
  {
    "dishId": "khachapuri",
    "summary": "Georgisk brød fylt med ost.",
    "overview": "Det finnes flere regionale former, blant annet runde ostefylte brød og båtformede brød fra Adsjaria.",
    "history": "Khachapuri er en sentral del av georgisk matkultur med tydelige regionale særpreg.",
    "flavor": "Fyldig, salt og mykt med gyllen brødskorpe.",
    "technique": "Bruk en elastisk gjærdeig og ost som smelter godt.",
    "essentials": [
      "400 g hvetemel",
      "250 ml vann",
      "5 g tørrgjær"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "2 brød",
      "time": "ca. 45 min + heving",
      "ingredients": [
        "400 g hvetemel",
        "250 ml vann",
        "5 g tørrgjær",
        "1 ts salt",
        "250 g mozzarella",
        "150 g feta",
        "2 egg",
        "smør"
      ],
      "steps": [
        "Elt mel, vann, gjær og salt og la deigen heve til omtrent dobbel størrelse.",
        "Del i to, kjevle ut og form båtformede brød med oppbrettede kanter.",
        "Fordel revet ost og stek ved 220 °C til gylne.",
        "Knekk et egg i hver båt mot slutten og stek videre til egget har satt seg. Topp med litt smør."
      ]
    },
    "variants": [
      "Imeruli er rundt og fylt med ost; adjaruli har åpen båtform. Mozzarella og feta er en hjemmetilpasning til georgiske oster."
    ],
    "serving": [
      "Server varmt, gjerne delt mellom flere."
    ],
    "commonMistakes": [
      "Ikke fyll brødene så mye at osten renner ut."
    ],
    "relatedDishIds": [
      "pide",
      "focaccia"
    ],
    "sources": [
      {
        "label": "Georgia Travel – Khachapuri",
        "href": "https://georgia.travel/rediscovering-khachapuri-georgias-must-try-classic"
      }
    ]
  },
  {
    "dishId": "khinkali",
    "summary": "Store kokte georgiske deigpakker med saftig fyll og kraft inni.",
    "overview": "En fast meldeig brettes i folder rundt kjøttfyll med tilsatt væske.",
    "history": "Khinkali har sterke tradisjoner i georgiske fjellregioner og finnes i flere regionale utgaver.",
    "flavor": "Saftig, pepperpreget og fyldig.",
    "technique": "Forsegl deigen godt og hold kjøttfyllet kjølig under formingen.",
    "essentials": [
      "400 g hvetemel",
      "200 ml vann",
      "1 ts salt"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "400 g hvetemel",
        "200 ml vann",
        "1 ts salt",
        "400 g kjøttdeig",
        "1 løk",
        "100 ml kald kraft",
        "pepper",
        "koriander etter smak"
      ],
      "steps": [
        "Elt mel, vann og salt til fast deig og la hvile.",
        "Bland kjøttdeig, finhakket løk, krydder og kald kraft gradvis.",
        "Kjevle ut deigen, stikk ut store sirkler, fyll og samle kantene i folder.",
        "Kok i omganger i saltet vann til deigen og kjøttfyllet er gjennomkokt (minst 71 °C for storfe- eller svinefarse)."
      ]
    },
    "variants": [
      "Fjellvarianter og byvarianter kan ha ulike urter og kjøttslag; soppfyll finnes også."
    ],
    "serving": [
      "Server med svart pepper. La kraften kjøle seg litt før første bit."
    ],
    "commonMistakes": [
      "Unngå hull i deigen og for mye væske i fyllet."
    ],
    "relatedDishIds": [
      "xiaolongbao",
      "manti"
    ],
    "sources": [
      {
        "label": "Georgia Travel – Georgisk matkultur",
        "href": "https://georgia.travel/georgian-cuisine"
      }
    ]
  },
  {
    "dishId": "lobio",
    "summary": "Georgisk bønnerett, gjerne med løk, koriander og krydder.",
    "overview": "Kokte bønner moses delvis til en tykk gryte med aromater.",
    "history": "Bønner har en etablert plass i georgisk matkultur, og lobio finnes i både varme og kalde former.",
    "flavor": "Jordaktig, urtepreget og fyldig.",
    "technique": "Bruk ferdigkokte bønner og behold litt av væsken til konsistensen.",
    "essentials": [
      "800 g kokte kidneybønner, avrent",
      "1 løk",
      "3 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 35 min",
      "ingredients": [
        "800 g kokte kidneybønner, avrent",
        "1 løk",
        "3 hvitløksfedd",
        "1 ts malt koriander",
        "frisk koriander",
        "2 ss olje",
        "150 ml vann",
        "vineddik etter smak"
      ],
      "steps": [
        "Fres finhakket løk og hvitløk i olje.",
        "Tilsett bønner, vann og malt koriander.",
        "La småkoke og mos noen av bønnene mot gryteveggen.",
        "Smak til med salt, eddik og frisk koriander."
      ]
    },
    "variants": [
      "Noen varianter inneholder valnøtter eller andre krydder; kalde bønnesalater finnes også."
    ],
    "serving": [
      "Server med maisbrød eller brød og syltede grønnsaker."
    ],
    "commonMistakes": [
      "Ikke bruk ukokte kidneybønner direkte i gryten."
    ],
    "relatedDishIds": [
      "feijoada",
      "shiro"
    ],
    "sources": [
      {
        "label": "Georgia Travel – Georgiske mattradisjoner",
        "href": "https://georgia.travel/why-georgia-come-with-us"
      }
    ]
  },
  {
    "dishId": "chakhokhbili",
    "summary": "Georgisk kyllinggryte med tomater, løk og friske urter.",
    "overview": "Kylling brunes og trekkes i en tomatbasert saus som avsluttes med urter.",
    "history": "Chakhokhbili inngår i det georgiske kjøkkenets gryterettstradisjon.",
    "flavor": "Fruktig tomatsmak, saftig kylling og friske urter.",
    "technique": "Brun kyllingen før den trekkes ferdig i sausen.",
    "essentials": [
      "800 g kyllinglår",
      "3 løk",
      "600 g tomater"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 60 min",
      "ingredients": [
        "800 g kyllinglår",
        "3 løk",
        "600 g tomater",
        "3 hvitløksfedd",
        "frisk koriander",
        "basilikum",
        "chili etter smak",
        "olje"
      ],
      "steps": [
        "Brun kyllingen i en gryte.",
        "Fres løken til myk og tilsett hakket tomat, hvitløk og chili.",
        "Legg kyllingen tilbake og la trekke under lokk til gjennomstekt og mør.",
        "Ta av lokket ved behov for å redusere sausen og tilsett urtene mot slutten."
      ]
    },
    "variants": [
      "Mengden chili og hvilke urter som brukes varierer."
    ],
    "serving": [
      "Server med brød eller ris."
    ],
    "commonMistakes": [
      "Ikke kok de friske urtene unødvendig lenge."
    ],
    "relatedDishIds": [
      "coq-au-vin",
      "doro-wat"
    ],
    "sources": [
      {
        "label": "Georgia Travel – Georgisk kjøkken",
        "href": "https://georgia.travel/why-georgia-delicious-cuisine"
      }
    ]
  },
  {
    "dishId": "khorovats",
    "summary": "Armensk grillmat, ofte kjøtt på spyd med grillede grønnsaker.",
    "overview": "Kjøtt grilles over sterk varme og serveres gjerne med brød, løk og urter.",
    "history": "Khorovats er en betydningsfull armensk grilltradisjon med egne matfestivaler.",
    "flavor": "Ristet, saftig og aromatisk.",
    "technique": "Skjær jevne stykker og grill kontrollert til ferdige.",
    "essentials": [
      "700 g svinenakke i biter",
      "2 løk",
      "salt og pepper"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min + marinering",
      "ingredients": [
        "700 g svinenakke i biter",
        "2 løk",
        "salt og pepper",
        "2 paprika",
        "1 aubergine",
        "lavash"
      ],
      "steps": [
        "Bland kjøttet med skivet løk og krydder og la marinere kjølig.",
        "Tre kjøttet på spyd og grill over moderat til sterk varme.",
        "Kontroller at hele svinekjøttstykker når minst 63 °C og får minst tre minutters hvile.",
        "Grill grønnsakene separat og server sammen med lavash."
      ]
    },
    "variants": [
      "Storfekjøtt, lam og grillede grønnsaker brukes også."
    ],
    "serving": [
      "Server med lavash, løk og friske urter."
    ],
    "commonMistakes": [
      "Ikke bruk rå marinade på ferdiggrillet kjøtt."
    ],
    "relatedDishIds": [
      "souvlaki",
      "kofte"
    ],
    "sources": [
      {
        "label": "Armenia Travel – Armensk matkultur",
        "href": "https://armenia.travel/things-to-do/armenian-cuisine/"
      },
      {
        "label": "Armenia Travel – Tradisjonelle retter",
        "href": "https://armenia.travel/articles/explore-armenias-must-try-dishes/"
      }
    ]
  },
  {
    "dishId": "dolma",
    "summary": "Fylte vinblader eller grønnsaker; her en armenskinspirert variant med kjøtt og ris.",
    "overview": "Vinblader brettes rundt krydret fyll og trekkes forsiktig i en gryte.",
    "history": "Tolma er en etablert armensk mattradisjon. Beslektede dolma-retter finnes i Kaukasus, Midtøsten og middelhavslandene.",
    "flavor": "Urtepreget, fyldig og lett syrlig.",
    "technique": "Skyll saltede vinblader godt og rull med plass til at risen sveller.",
    "essentials": [
      "30 vinblader på glass",
      "400 g kjøttdeig",
      "80 g ris"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "30 vinblader på glass",
        "400 g kjøttdeig",
        "80 g ris",
        "1 løk",
        "persille",
        "mynte",
        "400 ml kraft",
        "sitron"
      ],
      "steps": [
        "Skyll vinbladene og skjær bort harde stilker.",
        "Bland kjøttdeig med skylt ris, finhakket løk og urter.",
        "Fordel litt fyll på hvert blad og brett til små ruller.",
        "Legg rullene tett i gryten, tilsett kraft og trekk under lokk til risen er mør og kjøttfyllet gjennomstekt (minst 71 °C for storfe- eller svinefarse)."
      ]
    },
    "variants": [
      "Vegetariske varianter med ris, bønner eller linser finnes, blant annet armensk pasuts tolma."
    ],
    "serving": [
      "Server med yoghurt og sitron."
    ],
    "commonMistakes": [
      "Ikke rull så stramt at bladene sprekker når risen sveller."
    ],
    "relatedDishIds": [
      "golabki",
      "tabbouleh"
    ],
    "sources": [
      {
        "label": "Armenia Travel – Armensk matkultur",
        "href": "https://armenia.travel/things-to-do/armenian-cuisine/"
      },
      {
        "label": "Armenia Travel – Plantebaserte mattradisjoner",
        "href": "https://armenia.travel/articles/enjoy-your-trip-through-vegan-local-food-experiences/"
      }
    ]
  },
  {
    "dishId": "ghormeh-sabzi",
    "summary": "Persisk urtegryte med kjøtt, bønner og tørket lime.",
    "overview": "Finhakkede urter freses og trekkes med kjøtt og bønner til en fyldig gryte.",
    "history": "Ghormeh sabzi er en klassisk iransk khoresh, vanligvis servert med ris.",
    "flavor": "Urtepreget, syrlig og fyldig.",
    "technique": "Fres urtene forsiktig og la gryten trekke til kjøttet er mørt.",
    "essentials": [
      "500 g lammekjøtt til gryte",
      "300 g persille, koriander og vårløk",
      "1 ts tørket bukkehornkløver"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2,5 timer",
      "ingredients": [
        "500 g lammekjøtt til gryte",
        "300 g persille, koriander og vårløk",
        "1 ts tørket bukkehornkløver",
        "250 g kokte kidneybønner",
        "2 tørkede lime",
        "1 løk",
        "gurkemeie",
        "olje",
        "vann"
      ],
      "steps": [
        "Brun løk og kjøtt med gurkemeie.",
        "Finhakk og fres urtene separat i olje.",
        "Tilsett urter, gjennomhullede tørkede lime og vann til kjøttet. La småkoke til mørt.",
        "Tilsett kokte bønner mot slutten og smak til."
      ]
    },
    "variants": [
      "Storfe kan brukes i stedet for lam; urteblandingen varierer."
    ],
    "serving": [
      "Server med basmatiris."
    ],
    "commonMistakes": [
      "Ikke svi urtene eller bruke for mye bukkehornkløver."
    ],
    "relatedDishIds": [
      "rogan-josh",
      "lobio"
    ],
    "sources": [
      {
        "label": "Persian Mama – Ghormeh sabzi",
        "href": "https://persianmama.com/persian-herb-stew-ghormeh-sabzi-sabzi-ghorma/"
      }
    ]
  },
  {
    "dishId": "fesenjan",
    "summary": "Persisk gryterett med malte valnøtter og granateplemelasse.",
    "overview": "Kylling trekkes i en tykk, mørk nøttesaus med fruktig syre.",
    "history": "Fesenjan er en etablert iransk khoresh og forbindes ofte med festmåltider.",
    "flavor": "Søt-syrlig, nøtteaktig og fyldig.",
    "technique": "Mal valnøttene fint og la sausen småkoke under jevnlig omrøring.",
    "essentials": [
      "600 g kyllinglår",
      "200 g valnøtter",
      "1 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "600 g kyllinglår",
        "200 g valnøtter",
        "1 løk",
        "4 ss granateplemelasse",
        "500 ml vann",
        "gurkemeie",
        "salt",
        "olje"
      ],
      "steps": [
        "Mal valnøttene fint.",
        "Brun løk og kylling i litt olje.",
        "Tilsett nøtter, vann og granateplemelasse og la trekke forsiktig til kyllingen er gjennomstekt og sausen tykk.",
        "Smak til med mer granateplemelasse eller litt sukker etter behov."
      ]
    },
    "variants": [
      "And eller kjøttboller brukes også; sødme og syre varierer."
    ],
    "serving": [
      "Server med persisk ris."
    ],
    "commonMistakes": [
      "Ikke bruk høy varme som får nøttesausen til å svi seg."
    ],
    "relatedDishIds": [
      "kare-kare",
      "ghormeh-sabzi"
    ],
    "sources": [
      {
        "label": "Persian Mama – Persiske gryteretter",
        "href": "https://persianmama.com/khoreshs/"
      }
    ]
  },
  {
    "dishId": "chelo-kebab",
    "summary": "Persisk måltid med dampet ris og grillet kebab.",
    "overview": "Chelo er ris som gjerne dampes luftig; kebaben kan være av flere typer. Denne hjemmevarianten bruker koobideh av kjøttdeig.",
    "history": "Kebab med ris er en klassisk kombinasjon i iransk restaurant- og matkultur.",
    "flavor": "Saftig, ristet kjøtt med mild, aromatisk ris.",
    "technique": "Klem væsken ut av revet løk, og form kjøttet fast på brede spyd eller som avlange kaker.",
    "essentials": [
      "500 g kjøttdeig av lam eller storfe",
      "1 løk",
      "salt og pepper"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 60 min",
      "ingredients": [
        "500 g kjøttdeig av lam eller storfe",
        "1 løk",
        "salt og pepper",
        "300 g basmatiris",
        "safran etter smak",
        "smør",
        "4 tomater",
        "sumak"
      ],
      "steps": [
        "Skyll risen, kok nesten mør og damp ferdig under lokk.",
        "Riv løken, press ut væsken og bland med kjøtt og krydder.",
        "Form avlange kebaber og grill eller stek til minst 71 °C i kjernen.",
        "Grill tomater separat og server med risen, litt smør, safran og sumak."
      ]
    },
    "variants": [
      "Chelo kabab kan serveres med blant annet koobideh eller barg av hele kjøttstykker."
    ],
    "serving": [
      "Server med grillet tomat og sumak."
    ],
    "commonMistakes": [
      "Ikke bruk for våt kjøttfarse."
    ],
    "relatedDishIds": [
      "kofte",
      "khorovats"
    ],
    "sources": [
      {
        "label": "Persian Mama – Oppskriftsregister: koobideh og persisk ris",
        "href": "https://persianmama.com/recipe-index/"
      }
    ]
  },
  {
    "dishId": "kabuli-palaw",
    "summary": "Afghansk risrett med mørt kjøtt, gulrot og rosiner.",
    "overview": "Langkornet ris dampes med krydret kjøttkraft og toppes med stekte gulrotstrimler og rosiner.",
    "history": "Kabuli palaw regnes som en afghansk nasjonalrett og serveres ofte ved feiringer.",
    "flavor": "Aromatisk, fyldig og lett søtlig.",
    "technique": "Kok kjøttet mørt først og la risen dampe ferdig uten å bli grøtete.",
    "essentials": [
      "400 g basmatiris",
      "600 g lammekjøtt",
      "1 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 2 timer",
      "ingredients": [
        "400 g basmatiris",
        "600 g lammekjøtt",
        "1 løk",
        "2 gulrøtter",
        "75 g rosiner",
        "kardemomme",
        "spisskummen",
        "olje",
        "vann",
        "salt"
      ],
      "steps": [
        "Brun løk og kjøtt og trekk med vann og krydder til kjøttet er mørt. Ta vare på kraften.",
        "Stek gulrotstrimler og rosiner separat i litt olje.",
        "Skyll og forkok risen til nesten mør, hell av vannet og legg den over kjøttet med litt av kraften.",
        "Damp ferdig under tett lokk på lav varme. Server med gulrot og rosiner på toppen."
      ]
    },
    "variants": [
      "Storfekjøtt kan erstatte lam; nøtter kan brukes som topping."
    ],
    "serving": [
      "Server på et stort fat."
    ],
    "commonMistakes": [
      "Ikke tilsett mer kraft enn risen trenger for å dampe ferdig."
    ],
    "relatedDishIds": [
      "biryani",
      "chelo-kebab"
    ],
    "sources": [
      {
        "label": "Afghan Cooks – Kabuli pulao",
        "href": "https://afghancooks.com/kabuli-pulao-recipe/"
      }
    ]
  },
  {
    "dishId": "ashak",
    "summary": "Afghanske kokte deigpakker fylt med purre eller gandana.",
    "overview": "De tynne deigpakkene serveres gjerne med hvitløksyoghurt og en krydret saus av kjøtt eller linser.",
    "history": "Ashak er en kjent afghansk rett som også serveres ved større selskaper.",
    "flavor": "Mykt, urtepreget og syrlig fra yoghurt.",
    "technique": "Vask purren grundig og forsegl deigpakkene godt.",
    "essentials": [
      "300 g hvetemel",
      "150 ml vann",
      "300 g purre"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "300 g hvetemel",
        "150 ml vann",
        "300 g purre",
        "1 ss olje",
        "150 g tørre røde linser",
        "1 løk",
        "200 g hakkede tomater",
        "200 g yoghurt",
        "hvitløk",
        "spisskummen"
      ],
      "steps": [
        "Elt mel og vann med litt salt til glatt deig og la hvile.",
        "Vask og finsnitt purren, bland med litt olje og salt.",
        "Kjevle deigen tynt, skjær ut sirkler, fyll med purre og forsegl.",
        "Kok pakkene til deigen er mør. Kok linser med frest løk, tomat og krydder til gjennomkokt.",
        "Server med hvitløksyoghurt og linsesaus."
      ]
    },
    "variants": [
      "Kjøttsaus er også vanlig; gandana gir en annen smak enn vanlig purre."
    ],
    "serving": [
      "Server med litt tørket mynte."
    ],
    "commonMistakes": [
      "Ikke overfyll deigpakkene eller bruk sandete purre."
    ],
    "relatedDishIds": [
      "manti",
      "varenyky"
    ],
    "sources": [
      {
        "label": "Afghan Cooks – Ashak",
        "href": "https://afghancooks.com/afghan-ashak-or-aushak-afghan-dumplings/"
      }
    ]
  },
  {
    "dishId": "bolani",
    "summary": "Tynt afghansk flatbrød med fyll av blant annet potet, purre eller gresskar.",
    "overview": "Deigen brettes rundt et tynt lag fyll og stekes i panne.",
    "history": "Bolani inngår i afghansk brød- og smårettstradisjon.",
    "flavor": "Sprø, gyllen utside og mykt, krydret fyll.",
    "technique": "Kjevle deigen tynt og bruk avkjølt fyll.",
    "essentials": [
      "350 g hvetemel",
      "180 ml vann",
      "1 ts salt"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "6 brød",
      "time": "ca. 60 min",
      "ingredients": [
        "350 g hvetemel",
        "180 ml vann",
        "1 ts salt",
        "400 g poteter",
        "3 vårløk",
        "koriander",
        "chili etter smak",
        "olje"
      ],
      "steps": [
        "Elt mel, vann og salt til smidig deig og la hvile.",
        "Kok potetene, mos og bland med finhakket vårløk, koriander og chili. Avkjøl.",
        "Del deigen i seks, kjevle ut og fordel fyll på én halvdel. Brett og forsegl.",
        "Stek på begge sider i litt olje til deigen er gjennomstekt og gyllen."
      ]
    },
    "variants": [
      "Fyll med purre eller gresskar er andre vanlige varianter."
    ],
    "serving": [
      "Server med hvitløksyoghurt eller grønn chutney."
    ],
    "commonMistakes": [
      "Ikke legg på et tykt lag fyll som gjør brødet vanskelig å steke."
    ],
    "relatedDishIds": [
      "naan",
      "lahmacun"
    ],
    "sources": [
      {
        "label": "Afghan Cooks – Bolani",
        "href": "https://afghancooks.com/bolani-recipe-hot-pockets/"
      }
    ]
  },
  {
    "dishId": "mac-and-cheese",
    "summary": "Makaroni med kremet ostesaus, ofte gratinert.",
    "overview": "Kokt makaroni blandes med en saus av melk og ost. Ovnsvarianten får gyllen overflate.",
    "history": "Retten er en etablert amerikansk hverdags- og festrett, blant annet i sørstatenes mattradisjoner.",
    "flavor": "Kremet, salt og fyldig med mild nøttesmak fra ost.",
    "technique": "Smelt osten i varm saus uten kraftig koking.",
    "essentials": [
      "300 g makaroni",
      "40 g smør",
      "40 g hvetemel"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min",
      "ingredients": [
        "300 g makaroni",
        "40 g smør",
        "40 g hvetemel",
        "500 ml melk",
        "250 g cheddar",
        "salt",
        "pepper"
      ],
      "steps": [
        "Kok makaronien litt kortere enn pakningsanvisningen.",
        "Smelt smør, rør inn mel og spe med melk. La sausen småkoke til tykk.",
        "Ta kjelen av varmen og rør inn det meste av osten. Bland med makaronien.",
        "Fordel i form, topp med resten av osten og gratiner ved 200 °C til gyllen."
      ]
    },
    "variants": [
      "Kjelevarianten serveres uten gratinering; brødsmuler kan gi sprø topping."
    ],
    "serving": [
      "Server som hovedrett eller til grillmat."
    ],
    "commonMistakes": [
      "Ikke kok ostesausen hardt etter at osten er tilsatt."
    ],
    "relatedDishIds": [
      "cacio-e-pepe",
      "pastitsio"
    ],
    "sources": [
      {
        "label": "Serious Eats – Why mac and cheese turns grainy",
        "href": "https://www.seriouseats.com/how-to-fix-grainy-mac-and-cheese-11893813"
      },
      {
        "label": "Paula Deen – Baked Southern macaroni and cheese",
        "href": "https://www.pauladeen.com/recipe/baked-southern-macaroni-and-cheese-recipe/"
      }
    ]
  },
  {
    "dishId": "buffalo-wings",
    "summary": "Sprøstekte kyllingvinger vendt i en sterk, syrlig saus.",
    "overview": "Vingene stekes eller friteres og vendes i en saus basert på sterk chilisaus og smør.",
    "history": "Den kjente Buffalo-stilen forbindes med Anchor Bar på 1960-tallet, men byens kyllingvingetradisjon er eldre og opphavshistorien omdiskutert.",
    "flavor": "Sterk, syrlig og smørpreget med sprø overflate.",
    "technique": "Tørk vingene før steking og vend dem i sausen først ved servering.",
    "essentials": [
      "1 kg kyllingvinger",
      "1 ss olje",
      "salt"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 50 min",
      "ingredients": [
        "1 kg kyllingvinger",
        "1 ss olje",
        "salt",
        "80 ml sterk eddikbasert chilisaus",
        "40 g smør",
        "selleristenger",
        "blåmuggostdipp"
      ],
      "steps": [
        "Tørk vingene, vend med olje og salt og fordel på rist over stekebrett.",
        "Stek ved 220 °C til sprø og gjennomstekte, minst 74 °C i tykkeste kjøttdel uten å berøre beinet.",
        "Smelt smøret og bland med chilisausen.",
        "Vend vingene i sausen og server straks."
      ]
    },
    "variants": [
      "Hjemmevarianten er ovnsstekt; klassiske Buffalo wings friteres ofte."
    ],
    "serving": [
      "Server med selleri og blåmuggostdipp."
    ],
    "commonMistakes": [
      "Ikke la vingene ligge lenge i sausen hvis de skal holde seg sprø."
    ],
    "relatedDishIds": [
      "yakitori",
      "satay"
    ],
    "sources": [
      {
        "label": "Buffalo History Museum – Who served Buffalo’s first wings?",
        "href": "https://buffalohistory.org/who-served-buffalos-first-wings/"
      },
      {
        "label": "Visit Buffalo – Story of Buffalo wings",
        "href": "https://visitbuffalo.com/how-it-all-began-the-story-of-buffalo-wings/"
      }
    ]
  },
  {
    "dishId": "pulled-pork",
    "summary": "Langtidsstekt svinekjøtt som trekkes fra hverandre i saftige fibre.",
    "overview": "Svinebog eller nakke tilberedes langsomt til bindevevet blir mørt.",
    "history": "Pulled pork er en kjent del av amerikansk barbecuekultur, med ulike regionale sauser og tilberedningsmåter.",
    "flavor": "Fyldig, mørt og krydret; røykpreg ved tradisjonell røyking.",
    "technique": "Bruk et stykke med bindevev og fett, og la kjøttet bli mørt nok til å rives.",
    "essentials": [
      "1 kg svinebog eller svinenakke",
      "2 ts paprikapulver",
      "1 ts pepper"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 5–6 timer",
      "ingredients": [
        "1 kg svinebog eller svinenakke",
        "2 ts paprikapulver",
        "1 ts pepper",
        "1 ts hvitløkspulver",
        "salt",
        "1 dl eplejuice",
        "2 ss eplecidereddik",
        "barbecuesaus etter smak"
      ],
      "steps": [
        "Gni kjøttet med krydder.",
        "Legg i ildfast gryte med eplejuice og eddik, dekk til og stek ved 150 °C.",
        "Stek til kjøttet lett kan trekkes fra hverandre, ofte 4–6 timer avhengig av størrelsen.",
        "La hvile, riv med gafler og bland med litt stekesjy og ønsket saus."
      ]
    },
    "variants": [
      "Eddikbaserte og tomatbaserte sauser gir ulike profiler. Ovnsvarianten etterligner mørheten, ikke røykingen."
    ],
    "serving": [
      "Server i brød med kålsalat eller som tallerkenrett."
    ],
    "commonMistakes": [
      "Ikke avslutt stekingen bare fordi kjøttet har nådd trygg minimumstemperatur; det må også bli mørt."
    ],
    "relatedDishIds": [
      "bifana",
      "char-siu"
    ],
    "sources": [
      {
        "label": "Serious Eats – Pulled pork methods",
        "href": "https://www.seriouseats.com/pulled-pork-recipes-8637602"
      },
      {
        "label": "Food Network – Simple pulled pork",
        "href": "https://www.foodnetwork.com/recipes/food-network-kitchen/pulled-pork-7231580"
      }
    ]
  },
  {
    "dishId": "jambalaya",
    "summary": "Krydret risrett med kjøtt, grønnsaker og eventuelt sjømat.",
    "overview": "Ris kokes i samme gryte som aromater, kraft og andre ingredienser.",
    "history": "Jambalaya er en sentral Louisiana-rett med både cajun- og kreolske varianter.",
    "flavor": "Fyldig, krydret og aromatisk.",
    "technique": "Tilpass kraftmengden til risen og tilsett reker sent i kokingen.",
    "essentials": [
      "300 g langkornet ris",
      "300 g kyllinglårfilet",
      "150 g andouille eller annen røkt pølse"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 50 min",
      "ingredients": [
        "300 g langkornet ris",
        "300 g kyllinglårfilet",
        "150 g andouille eller annen røkt pølse",
        "1 løk",
        "1 paprika",
        "2 selleristilker",
        "2 hvitløksfedd",
        "400 g tomater",
        "600 ml kraft, omtrent",
        "cajunkrydder"
      ],
      "steps": [
        "Brun kylling og pølse i en stor gryte.",
        "Fres løk, paprika, selleri og hvitløk.",
        "Tilsett tomat, ris, kraft og krydder og la småkoke under lokk.",
        "Kok til risen er mør og kyllingen når minst 74 °C; juster kraftmengden ved behov."
      ]
    },
    "variants": [
      "Kreolske varianter bruker ofte tomat, mens mange cajunvarianter ikke gjør det."
    ],
    "serving": [
      "Server i dype tallerkener med vårløk."
    ],
    "commonMistakes": [
      "Ikke tilsett så mye kraft at risen blir grøtete."
    ],
    "relatedDishIds": [
      "gumbo",
      "paella-valenciana"
    ],
    "sources": [
      {
        "label": "Explore Louisiana – Louisiana's famous dishes",
        "href": "https://www.explorelouisiana.com/articles/louisianas-famous-dishes"
      },
      {
        "label": "Southern Living – Gumbo versus jambalaya",
        "href": "https://www.southernliving.com/food/seafood/gumbo-vs-jambalaya"
      }
    ]
  },
  {
    "dishId": "gumbo",
    "summary": "Fyldig Louisiana-gryte eller suppe, ofte med mørk jevning, kjøtt eller sjømat.",
    "overview": "Kraft bygges opp med aromatiske grønnsaker og jevning; retten serveres gjerne med ris ved siden av.",
    "history": "Gumbo gjenspeiler flere kulinariske tradisjoner i Louisiana og er delstatens offisielle rett.",
    "flavor": "Dyp, aromatisk og fyldig med ristet preg fra jevningen.",
    "technique": "Rør mel og olje jevnlig på kontrollert varme til ønsket farge uten å brenne blandingen.",
    "essentials": [
      "60 ml nøytral olje",
      "60 g hvetemel",
      "1 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 90 min",
      "ingredients": [
        "60 ml nøytral olje",
        "60 g hvetemel",
        "1 løk",
        "1 paprika",
        "2 selleristilker",
        "2 hvitløksfedd",
        "600 g kyllinglårfilet",
        "200 g røkt pølse",
        "1,2 l kraft",
        "timian",
        "kokt ris til servering"
      ],
      "steps": [
        "Varm olje og mel i tykkbunnet gryte. Rør forsiktig til jevningen er nøttebrun.",
        "Tilsett hakket løk, paprika og selleri og fres videre.",
        "Spe gradvis med kraft og tilsett kjøtt, pølse og krydder.",
        "La småkoke til kyllingen er mør og gjennomstekt, minst 74 °C."
      ]
    },
    "variants": [
      "Sjømatgumbo og varianter med okra eller filépulver har andre smaksprofiler."
    ],
    "serving": [
      "Server med kokt ris og vårløk."
    ],
    "commonMistakes": [
      "Ikke bruk svidd jevning; start heller på nytt."
    ],
    "relatedDishIds": [
      "jambalaya",
      "harira"
    ],
    "sources": [
      {
        "label": "Explore Louisiana – Louisiana Gumbo Guide",
        "href": "https://www.explorelouisiana.com/articles/louisiana-gumbo"
      },
      {
        "label": "Southern Living – Gumbo versus jambalaya",
        "href": "https://www.southernliving.com/food/seafood/gumbo-vs-jambalaya"
      }
    ]
  },
  {
    "dishId": "philly-cheesesteak",
    "summary": "Varm sandwich med tynne skiver storfekjøtt og smeltet ost.",
    "overview": "Kjøtt stekes raskt på varm plate og legges i et avlangt brød med ost og eventuelt løk.",
    "history": "Sandwichen forbindes med Philadelphia og Pat Olivieris kjøttsmørbrød fra rundt 1930; ost ble en del av retten senere.",
    "flavor": "Saftig, salt og fyldig.",
    "technique": "Skjær kjøttet svært tynt og stek det i små omganger.",
    "essentials": [
      "500 g entrecôte i tynne skiver",
      "1 stor løk",
      "150 g provolone eller annen smelteost"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 25 min",
      "ingredients": [
        "500 g entrecôte i tynne skiver",
        "1 stor løk",
        "150 g provolone eller annen smelteost",
        "4 avlange myke rundstykker",
        "olje",
        "salt og pepper"
      ],
      "steps": [
        "Skjær løken i skiver og stek til myk.",
        "Stek de tynne kjøttskivene raskt på varm plate eller panne til ferdige.",
        "Fordel osten over kjøttet og la den smelte.",
        "Fyll varme brød med kjøtt, ost og eventuell stekt løk."
      ]
    },
    "variants": [
      "Provolone, amerikansk smelteost og Cheez Whiz er vanlige valg."
    ],
    "serving": [
      "Server umiddelbart i brødet."
    ],
    "commonMistakes": [
      "Ikke bruk tykke biffstykker som gjør sandwichen vanskelig å spise."
    ],
    "relatedDishIds": [
      "francesinha",
      "bifana"
    ],
    "sources": [
      {
        "label": "Visit Philadelphia – Signature sandwiches",
        "href": "https://www.visitphilly.com/media-center/press-releases/phillys-signature-sandwiches-cheesesteaks-hoagies-roast-pork/"
      }
    ]
  },
  {
    "dishId": "lomo-saltado",
    "summary": "Peruansk wokrett med storfekjøtt, løk, tomat og pommes frites.",
    "overview": "Kjøtt og grønnsaker stekes raskt på høy varme med soyasaus og eddik.",
    "history": "Lomo saltado viser kinesisk innflytelse på matkulturen i Lima.",
    "flavor": "Ristet, salt og frisk med lett syre.",
    "technique": "Stek kjøttet i små omganger, og vend inn tomatene mot slutten.",
    "essentials": [
      "500 g biffkjøtt",
      "500 g poteter eller pommes frites",
      "1 rødløk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 40 min",
      "ingredients": [
        "500 g biffkjøtt",
        "500 g poteter eller pommes frites",
        "1 rødløk",
        "2 tomater",
        "1 ají amarillo eller mild chili",
        "2 ss soyasaus",
        "1 ss eddik",
        "olje",
        "kokt ris"
      ],
      "steps": [
        "Tilbered pommes frites separat.",
        "Skjær kjøtt, løk og tomat i strimler eller båter.",
        "Stek kjøttet raskt i varm panne til ferdig. Fres løk og chili.",
        "Vend inn tomat, kjøtt, soyasaus og eddik. Server med pommes frites og ris."
      ]
    },
    "variants": [
      "Kylling eller sopp kan brukes i hjemmevarianter."
    ],
    "serving": [
      "Server straks med ris og sprø poteter."
    ],
    "commonMistakes": [
      "Ikke overfyll pannen slik at kjøttet koker i egen væske."
    ],
    "relatedDishIds": [
      "chow-mein",
      "philly-cheesesteak"
    ],
    "sources": [
      {
        "label": "Peru Travel – Cuisine of Lima",
        "href": "https://www.peru.travel/gastronomy/en/peruvian-cuisine/cuisine-of-lima.html"
      },
      {
        "label": "Peru Travel – Main dishes",
        "href": "https://www.peru.travel/gastronomy/en/recipes/main-dishes.html"
      }
    ]
  },
  {
    "dishId": "aji-de-gallina",
    "summary": "Kremet peruansk kyllingrett med gul chili og brødjevnet saus.",
    "overview": "Revet kylling blandes med en saus av ají amarillo, melk, brød og aromater.",
    "history": "Retten er del av Limas kreolske kjøkken, med peruanske og spanske mattradisjoner.",
    "flavor": "Mildt sterk, kremet og fyldig.",
    "technique": "Bruk ají amarillo for karakteristisk smak; tilpass mengden etter styrke.",
    "essentials": [
      "600 g kyllingfilet",
      "1 løk",
      "2 hvitløksfedd"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 60 min",
      "ingredients": [
        "600 g kyllingfilet",
        "1 løk",
        "2 hvitløksfedd",
        "2–3 ss ají amarillo-pasta",
        "3 brødskiver",
        "250 ml melk",
        "200 ml kyllingkraft",
        "4 kokte poteter",
        "2 hardkokte egg",
        "oliven"
      ],
      "steps": [
        "Trekk kyllingen i kraft til minst 74 °C og riv den i strimler.",
        "Bløtlegg brødet i melk og mos til jevn masse.",
        "Fres løk, hvitløk og chilipasta; tilsett brødmassen og kraft gradvis.",
        "Vend inn kyllingen og la småkoke til sausen er fyldig. Server med poteter, egg og oliven."
      ]
    },
    "variants": [
      "Noen varianter bruker valnøtter eller ost i sausen."
    ],
    "serving": [
      "Server med hvit ris og kokte poteter."
    ],
    "commonMistakes": [
      "Ikke la melkebasen svi seg eller koke tørr."
    ],
    "relatedDishIds": [
      "fesenjan",
      "kare-kare"
    ],
    "sources": [
      {
        "label": "Peru Travel – Cuisine of Lima",
        "href": "https://www.peru.travel/gastronomy/en/peruvian-cuisine/cuisine-of-lima.html"
      },
      {
        "label": "Peru Travel – Main dishes",
        "href": "https://www.peru.travel/gastronomy/en/recipes/main-dishes.html"
      }
    ]
  },
  {
    "dishId": "anticuchos",
    "summary": "Peruanske grillspyd, tradisjonelt med storfehjerte marinert i ají panca.",
    "overview": "Små kjøttstykker marineres i krydder og eddik før grilling.",
    "history": "Anticuchos er en kjent del av Limas matkultur med afroperuansk innflytelse.",
    "flavor": "Ristet, aromatisk og lett syrlig.",
    "technique": "Rens kjøttet og skjær i jevne stykker; grill kontrollert.",
    "essentials": [
      "600 g renset storfehjerte",
      "2 ss ají panca-pasta",
      "2 ss eddik"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 35 min + marinering",
      "ingredients": [
        "600 g renset storfehjerte",
        "2 ss ají panca-pasta",
        "2 ss eddik",
        "3 hvitløksfedd",
        "1 ts spisskummen",
        "olje",
        "salt",
        "poteter"
      ],
      "steps": [
        "Fjern grove hinner og skjær kjøttet i jevne biter.",
        "Bland chilipasta, eddik, hvitløk, spisskummen og olje; mariner i kjøleskap.",
        "Tre kjøttet på spyd og grill til gjennomstekt, minst 71 °C for innmat.",
        "Server med kokte poteter. Kast rå marinade."
      ]
    },
    "variants": [
      "Vanlig biffkjøtt kan brukes i en tilpasset variant."
    ],
    "serving": [
      "Server med potet, mais og chilisaus."
    ],
    "commonMistakes": [
      "Ikke bruk rå marinade som ferdig saus."
    ],
    "relatedDishIds": [
      "satay",
      "khorovats"
    ],
    "sources": [
      {
        "label": "Peru Travel – Cuisine of Lima",
        "href": "https://www.peru.travel/gastronomy/en/peruvian-cuisine/cuisine-of-lima.html"
      },
      {
        "label": "Peru Travel – Lima gastronomy",
        "href": "https://www.peru.travel/news/peru-conquers-canada-and-awakens-the-world-a-destination-that-has-it-all"
      }
    ]
  },
  {
    "dishId": "empanadas",
    "summary": "Fylte deigbakverk, bakt eller fritert; her en argentinskinspirert kjøttvariant.",
    "overview": "Deigsirkler brettes rundt avkjølt fyll og lukkes før steking.",
    "history": "Empanadas har mange latinamerikanske tradisjoner. I Argentina varierer fyll og form mellom regionene.",
    "flavor": "Sprø eller mør deig med saftig, krydret fyll.",
    "technique": "Avkjøl fyllet og forsegl deigkantene godt.",
    "essentials": [
      "350 g hvetemel",
      "80 g smør",
      "150 ml vann, omtrent"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 12 empanadas",
      "time": "ca. 75 min",
      "ingredients": [
        "350 g hvetemel",
        "80 g smør",
        "150 ml vann, omtrent",
        "400 g kjøttdeig",
        "2 løk",
        "paprikapulver",
        "spisskummen",
        "2 hardkokte egg",
        "1 egg til pensling"
      ],
      "steps": [
        "Bland mel, smør, vann og salt til smidig deig og la hvile kjølig.",
        "Stek løk og kjøttdeig til gjennomstekt; krydre, avkjøl og bland med hakket kokt egg.",
        "Kjevle deigen ut og stikk ut sirkler. Fyll og brett kantene tett sammen.",
        "Pensle med egg og stek ved 200 °C til gylne og gjennomvarme."
      ]
    },
    "variants": [
      "Varianter med ost, kylling, mais eller grønnsaker finnes."
    ],
    "serving": [
      "Server lune som smårett eller måltid."
    ],
    "commonMistakes": [
      "Ikke bruk for vått eller varmt fyll."
    ],
    "relatedDishIds": [
      "coxinha",
      "pastilla"
    ],
    "sources": [
      {
        "label": "Visit Argentina – Gaucho traditions",
        "href": "https://www.argentina.travel/en/activities/tradiciones-gauchas"
      },
      {
        "label": "Visit Argentina – Argentinsk matkultur",
        "href": "https://www.argentina.travel/en/news/what-to-do-in-argentinas-most-sought-after-tourist-destinations"
      }
    ]
  },
  {
    "dishId": "asado",
    "summary": "Søramerikansk grilltradisjon med kjøtt tilberedt over glør.",
    "overview": "Ulike kjøttstykker grilles over kontrollert varme; asado betegner også det sosiale måltidet.",
    "history": "I Argentina er asado nært forbundet med gauchokultur og fellesmåltider.",
    "flavor": "Ristet, saftig og kjøttpreget.",
    "technique": "Bruk stabile glør og tilpass tid og varme til hvert kjøttstykke.",
    "essentials": [
      "800 g storfekjøtt, for eksempel entrecôte",
      "grovt salt",
      "persille"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 45 min",
      "ingredients": [
        "800 g storfekjøtt, for eksempel entrecôte",
        "grovt salt",
        "persille",
        "2 hvitløksfedd",
        "3 ss rødvinseddik",
        "5 ss olivenolje",
        "oregano"
      ],
      "steps": [
        "Lag chimichurri av hakket persille, hvitløk, eddik, olje og oregano.",
        "Klargjør grill med direkte og indirekte varme.",
        "Salt kjøttet og grill til ønsket trygg kjernetemperatur; hele storfekjøttstykker minst 63 °C med tre minutters hvile.",
        "La kjøttet hvile og server i skiver med chimichurri."
      ]
    },
    "variants": [
      "Tradisjonell asado kan omfatte ribbe, pølser og innmat; oppskriften er en enkel hjemmevariant."
    ],
    "serving": [
      "Server med brød, salat og chimichurri."
    ],
    "commonMistakes": [
      "Ikke la flammene svi kjøttet mens innsiden forblir uferdig."
    ],
    "relatedDishIds": [
      "khorovats",
      "pulled-pork"
    ],
    "sources": [
      {
        "label": "Visit Argentina – Gaucho traditions",
        "href": "https://www.argentina.travel/en/activities/tradiciones-gauchas"
      }
    ]
  },
  {
    "dishId": "pastel-de-choclo",
    "summary": "Chilensk ovnsrett med malt mais over et krydret kjøttfyll.",
    "overview": "Et fyll av kjøtt og løk, ofte med kylling, egg og oliven, dekkes med maispuré og stekes.",
    "history": "Pastel de choclo er en tradisjonell chilensk rett der maisen står sentralt.",
    "flavor": "Søtlig mais, fyldig kjøtt og mildt urtepreget topping.",
    "technique": "Kok maisblandingen inn før den fordeles over fyllet.",
    "essentials": [
      "700 g maiskorn",
      "100 ml melk",
      "basilikum"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 75 min",
      "ingredients": [
        "700 g maiskorn",
        "100 ml melk",
        "basilikum",
        "400 g kjøttdeig",
        "2 løk",
        "200 g kokt kylling",
        "2 hardkokte egg",
        "svarte oliven",
        "spisskummen",
        "olje"
      ],
      "steps": [
        "Stek løk og kjøttdeig til gjennomstekt, krydre med spisskummen.",
        "Mos mais med melk og basilikum og kok til en tykk puré.",
        "Fordel kjøttfyll, kylling, egg og oliven i ildfast form. Dekk med maispuré.",
        "Stek ved 200 °C til gyllen og gjennomvarm, minst 74 °C i midten."
      ]
    },
    "variants": [
      "Rosiner og litt sukker på toppen inngår i enkelte varianter."
    ],
    "serving": [
      "Server varm, gjerne med tomatsalat."
    ],
    "commonMistakes": [
      "Ikke bruk så tynn maispuré at den renner inn i fyllet."
    ],
    "relatedDishIds": [
      "moussaka",
      "pastitsio"
    ],
    "sources": [
      {
        "label": "Chile Travel – Día de la cocina chilena",
        "href": "https://chile.travel/blog/dia-de-la-cocina-chilena-a-que-sabe-chile/"
      },
      {
        "label": "Chile Travel – Typical cuisine",
        "href": "https://chile.travel/en/blog/typical-cuisine-a-journey-through-the-flavors-of-chile/"
      }
    ]
  },
  {
    "dishId": "kibbeh",
    "summary": "Krydret rett av bulgur og kjøtt, ofte formet som fylte, stekte kroketter.",
    "overview": "Bulgur og finmalt kjøtt danner et skall rundt krydret kjøttfyll. Denne hjemmevarianten bakes i form.",
    "history": "Kibbeh har sterke tradisjoner i blant annet Syria og Libanon, med mange ulike former og tilberedningsmåter.",
    "flavor": "Nøtteaktig, aromatisk og fyldig.",
    "technique": "Bruk fin bulgur og press lagene jevnt sammen uten å komprimere dem for hardt.",
    "essentials": [
      "200 g fin bulgur",
      "500 g kjøttdeig av lam eller storfe",
      "2 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 75 min",
      "ingredients": [
        "200 g fin bulgur",
        "500 g kjøttdeig av lam eller storfe",
        "2 løk",
        "50 g pinjekjerner",
        "allehånde",
        "spisskummen",
        "salt",
        "olje"
      ],
      "steps": [
        "Bløtlegg bulguren etter anvisning og press ut overflødig vann.",
        "Bland halvparten av kjøttet med bulgur, finrevet løk og krydder.",
        "Stek resten av kjøttet med hakket løk, krydder og pinjekjerner til gjennomstekt.",
        "Fordel halvparten av bulgurmassen i en smurt form, legg på fyllet og dekk med resten. Pensle med olje.",
        "Bak ved 190 °C til gyllen og minst 71 °C i kjøttmassen."
      ]
    },
    "variants": [
      "Fritert kibbeh og kibbeh i yoghurtsaus er andre varianter."
    ],
    "serving": [
      "Server med yoghurt og fattoush."
    ],
    "commonMistakes": [
      "Ikke bruk grov bulgur uten å tilpasse deigen."
    ],
    "relatedDishIds": [
      "fattoush",
      "kofte"
    ],
    "sources": [
      {
        "label": "Zaatar and Zaytoun – Kibbeh",
        "href": "https://zaatarandzaytoun.com/lebanese-kibbe-recipe-fried-kibbeh-morsels"
      }
    ]
  },
  {
    "dishId": "fattoush",
    "summary": "Frisk levantinsk salat med sprøtt flatbrød, grønnsaker og sumak.",
    "overview": "Tomat, agurk og urter blandes med syrlig dressing og ristede brødbiter.",
    "history": "Fattoush er kjent fra levantinsk matkultur, blant annet Libanon, og er en måte å bruke brødrester på.",
    "flavor": "Frisk, syrlig, urtepreget og sprø.",
    "technique": "Tilsett brødet rett før servering for å bevare sprøheten.",
    "essentials": [
      "2 pitabrød",
      "3 tomater",
      "1 agurk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 25 min",
      "ingredients": [
        "2 pitabrød",
        "3 tomater",
        "1 agurk",
        "6 reddiker",
        "1 hjertesalat",
        "persille",
        "mynte",
        "2 ss sitronsaft",
        "3 ss olivenolje",
        "1 ts sumak"
      ],
      "steps": [
        "Riv brødet i biter, vend med litt olje og rist i ovnen til sprøtt.",
        "Vask og skjær grønnsakene, og hakk urtene.",
        "Visp sitron, olje, sumak og salt til dressing.",
        "Bland salaten med dressingen og vend inn brødet ved servering."
      ]
    },
    "variants": [
      "Granateplemelasse kan gi ekstra syre og sødme."
    ],
    "serving": [
      "Server til grillmat eller mezze."
    ],
    "commonMistakes": [
      "Ikke la brødet trekke lenge i dressingen."
    ],
    "relatedDishIds": [
      "tabbouleh",
      "kibbeh"
    ],
    "sources": [
      {
        "label": "Gurmestan – Fattoush",
        "href": "https://gurmestan.com/en/recipes/fattoush-lubnan/"
      }
    ]
  },
  {
    "dishId": "masgouf",
    "summary": "Irakisk grillrett av hel, oppbrettet fisk, tradisjonelt ferskvannsfisk som karpe.",
    "overview": "Fisken åpnes og stekes langsomt nær glør; hjemme kan den tilberedes på grill med lokk.",
    "history": "Masgouf er særlig forbundet med Bagdad og elven Tigris, og omtales ofte som Iraks nasjonalrett.",
    "flavor": "Saftig fisk med ristet overflate og frisk sitrus.",
    "technique": "Bruk indirekte grillvarme og tilpass steketiden til fiskens tykkelse.",
    "essentials": [
      "1 hel renset karpe eller annen egnet hel fisk (ca. 1,2 kg)",
      "2 ss olje",
      "1 ts gurkemeie"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 60 min",
      "ingredients": [
        "1 hel renset karpe eller annen egnet hel fisk (ca. 1,2 kg)",
        "2 ss olje",
        "1 ts gurkemeie",
        "salt og pepper",
        "1 sitron",
        "2 tomater",
        "1 løk"
      ],
      "steps": [
        "Be fiskehandleren åpne fisken slik at den kan ligge flatt.",
        "Pensle med olje og krydre med salt, pepper og gurkemeie.",
        "Grill over indirekte varme med lokk til fisken er gjennomkokt, omtrent 63 °C i tykkeste del.",
        "Server med sitron, tomater og løk."
      ]
    },
    "variants": [
      "Tomatbasert topping og tamarind brukes i enkelte varianter."
    ],
    "serving": [
      "Server med flatt brød, urter og grønnsaker."
    ],
    "commonMistakes": [
      "Ikke plasser tykk fisk direkte over sterk varme gjennom hele stekingen."
    ],
    "relatedDishIds": [
      "moqueca",
      "arroz-de-marisco"
    ],
    "sources": [
      {
        "label": "Visit Iraq – Masgouf",
        "href": "https://visit-iraq.com/en/faq/what-is-masgouf-and-where-to-try-it"
      }
    ]
  },
  {
    "dishId": "kabsa",
    "summary": "Krydret langkornet ris med kjøtt eller kylling, kjent fra Saudi-Arabia.",
    "overview": "Ris kokes i aromatisk kraft med krydder; kylling og tomat inngår i mange varianter.",
    "history": "Kabsa er en sentral saudisk mattradisjon med regionale variasjoner.",
    "flavor": "Varmt krydret, fyldig og lett syrlig.",
    "technique": "Tilpass kraftmengden til risen og la risen hvile før servering.",
    "essentials": [
      "350 g basmatiris",
      "800 g kyllinglår",
      "1 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 75 min",
      "ingredients": [
        "350 g basmatiris",
        "800 g kyllinglår",
        "1 løk",
        "2 tomater",
        "2 hvitløksfedd",
        "kardemomme",
        "kanel",
        "spisskummen",
        "1 tørket lime",
        "600 ml kraft, omtrent",
        "olje"
      ],
      "steps": [
        "Skyll risen godt.",
        "Fres løk, hvitløk og krydder, og brun kyllingen lett.",
        "Tilsett tomat og kraft og trekk kyllingen til gjennomstekt (minst 74 °C).",
        "Ta ut kyllingen, kok risen i avmålt kraft under lokk til mør, og la hvile.",
        "Server kyllingen over risen, eventuelt etter kort gratinering."
      ]
    },
    "variants": [
      "Lam og andre typer kjøtt brukes også; krydderblandingen varierer."
    ],
    "serving": [
      "Server på stort fat med salat."
    ],
    "commonMistakes": [
      "Ikke tilsett for mye kraft uten å ta hensyn til ristypen."
    ],
    "relatedDishIds": [
      "mandi",
      "kabuli-palaw"
    ],
    "sources": [
      {
        "label": "Saudipedia – Saudiske risretter",
        "href": "https://saudipedia.com/en/list-of-five-saudi-dishes-made-with-rice"
      }
    ]
  },
  {
    "dishId": "mandi",
    "summary": "Risrett med langsomt tilberedt kjøtt og aromatiske krydder, med røykpreg i tradisjonell utgave.",
    "overview": "Tradisjonell mandi tilberedes i en lukket ovn eller grop. Hjemmevarianten bruker stekeovn og gjenskaper ikke den tradisjonelle røyksmaken fullt ut.",
    "history": "Mandi forbindes særlig med Hadramaut i Jemen og er utbredt på Den arabiske halvøy.",
    "flavor": "Mildt krydret, saftig og aromatisk.",
    "technique": "Stek kjøttet kontrollert over risen slik at kjøttsaften gir smak.",
    "essentials": [
      "350 g basmatiris",
      "800 g kyllinglår",
      "1 løk"
    ],
    "recipe": {
      "label": "Hjemmevariant",
      "yield": "ca. 4 porsjoner",
      "time": "ca. 80 min",
      "ingredients": [
        "350 g basmatiris",
        "800 g kyllinglår",
        "1 løk",
        "kardemomme",
        "spisskummen",
        "gurkemeie",
        "kanel",
        "600 ml kraft, omtrent",
        "olje",
        "salt"
      ],
      "steps": [
        "Skyll risen og fres løk og krydder i litt olje.",
        "Fordel ris, løk og tilpasset kraftmengde i en ildfast form.",
        "Krydre kyllingen og legg den på rist over formen, eller direkte oppå risen.",
        "Dekk løst med folie og stek ved 190 °C til risen er mør og kyllingen når minst 74 °C. Fjern folien mot slutten for gyllen overflate.",
        "La retten hvile kort før servering."
      ]
    },
    "variants": [
      "Lam er også vanlig. Tradisjonell gropovn gir en annen aroma enn vanlig stekeovn."
    ],
    "serving": [
      "Server med tomat- og chilisaus."
    ],
    "commonMistakes": [
      "Ikke bruk glødende kull innendørs for å etterligne røykpreg."
    ],
    "relatedDishIds": [
      "kabsa",
      "chelo-kebab"
    ],
    "sources": [
      {
        "label": "Saudipedia – Mandi og andre risretter",
        "href": "https://saudipedia.com/en/list-of-five-saudi-dishes-made-with-rice"
      },
      {
        "label": "Sekai Gohan – Yemeni mandi",
        "href": "https://sekaigohan.com/en/recipes/middle-east/yemen/mandi"
      }
    ]
  }
];
