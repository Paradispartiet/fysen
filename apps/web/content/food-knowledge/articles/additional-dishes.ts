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
  }
];
