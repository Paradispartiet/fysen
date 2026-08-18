export type DishLearningDetail = {
  readonly name: string;
  readonly query: string;
  readonly region: string;
  readonly summary: string;
  readonly overview: string;
  readonly history: string;
  readonly essentials: readonly string[];
  readonly recipe: {
    readonly label: string;
    readonly yield: string;
    readonly time: string;
    readonly ingredients: readonly string[];
    readonly steps: readonly string[];
  };
  readonly variants: readonly string[];
  readonly tips: readonly string[];
};

export const learningDishes: readonly DishLearningDetail[] = [
  {
    name: "Ramen",
    query: "ramen",
    region: "Japan",
    summary: "Japansk nudelsuppe med røtter i kinesiske nudeltradisjoner, utviklet i mange regionale stiler.",
    overview:
      "Ramen er ikke én fast oppskrift, men en familie av nudelsupper. En bolle bygges vanligvis av kraft, en konsentrert smaksbase (tare), nudler, aromatisk fett eller olje og topping. Balansen mellom disse delene er viktigere enn én bestemt ingrediensliste.",
    history:
      "Retten utviklet seg i Japan med tydelig påvirkning fra kinesiske hvetenudler og ble gjennom 1900-tallet en stor del av japansk hverdags- og restaurantmat. I dag finnes det sterke lokale tradisjoner og svært ulike stiler fra by til by og region til region.",
    essentials: [
      "Kraft: for eksempel kylling, svin, sjømat, sopp eller grønnsaker.",
      "Tare: den konsentrerte smaksbasen som salter og definerer suppen, ofte bygget rundt soyasaus, miso eller salt.",
      "Nudler: hvetenudler med alkalisk preg og spenstig tekstur.",
      "Aromatisk olje eller fett: gir duft, fylde og et eget smakslag.",
      "Topping: kan være egg, vårløk, nori, sopp, mais, bambusskudd, kjøtt, tofu eller andre lokale valg.",
    ],
    recipe: {
      label: "En enkel shoyu-inspirert hjemmevariant",
      yield: "4 porsjoner",
      time: "ca. 60 min",
      ingredients: [
        "1,5 l god kylling- eller grønnsakskraft",
        "30 g ingefær, skivet",
        "4 hvitløksfedd, lett knust",
        "150–200 g sopp, gjerne shiitake eller aromasopp",
        "5 ss soyasaus",
        "1 ss riseddik",
        "1 ts sesamolje",
        "400 g ramen- eller andre gode hvetenudler",
        "4 egg, valgfritt",
        "2–3 vårløk, finsnittet",
        "Nori, sopp, tofu, kylling eller andre toppinger etter ønske",
      ],
      steps: [
        "Kok opp kraften med ingefær, hvitløk og sopp. La den trekke rolig i 25–30 minutter, og sil av hvis du vil ha en renere suppe.",
        "Rør sammen soyasaus, riseddik og sesamolje. Fordel denne enkle smaksbasen mellom serveringsbollene.",
        "Forbered toppingene. Hvis du bruker egg, kan de kokes 6–7 minutter, avkjøles i kaldt vann og deles rett før servering.",
        "Kok nudlene separat etter anvisningen. Hell dem godt av; stivelsesrikt kokevann skal ikke fortynne kraften.",
        "Hell varm kraft i bollene over smaksbasen, rør kort, legg i nudlene og avslutt med topping. Smak til før du salter mer.",
      ],
    },
    variants: [
      "Shoyu ramen: soyasauspreget tare og ofte en klarere kraft.",
      "Miso ramen: miso gir mer fylde, sødme og fermentert karakter.",
      "Shio ramen: saltbasert tare med et lettere og ofte mer transparent uttrykk.",
      "Tonkotsu: kraftig, emulsifisert svinekraft, særlig kjent fra Kyushu-tradisjoner.",
      "Vegetarisk ramen: kan bygges med kombu, tørket sopp, miso, sesam og grønnsakskraft.",
    ],
    tips: [
      "Kok nudlene helt til slutt. Ramen taper seg raskt når nudlene står lenge i varm kraft.",
      "Smak kraft og tare sammen i bollen før du justerer salt; hver del kan virke mild alene.",
      "Toppingene bør gi kontrast i tekstur og friskhet, ikke bare mer tyngde.",
    ],
  },
  {
    name: "Biryani",
    query: "biryani",
    region: "Sør-Asia",
    summary: "Aromatisk risrett med mange regionale varianter og ulike kombinasjoner av krydder, grønnsaker og proteiner.",
    overview:
      "Biryani er en stor familie av krydrede risretter der langkornet ris kombineres med kjøtt, fisk, egg eller grønnsaker. Det som kjennetegner mange biryanier er aromatisk basmatiris, lag med krydret fyll og en avsluttende, kontrollert damping som lar ris og fyll trekke smak av hverandre.",
    history:
      "Biryani forbindes med Sør-Asia og rommer både lokale og persisk-inspirerte mattradisjoner. Det finnes derfor ingen enkelt originaloppskrift: teknikk, krydder, protein, styrke og forholdet mellom ris og saus varierer betydelig mellom blant annet Hyderabad, Lucknow, Kolkata og andre regionale tradisjoner.",
    essentials: [
      "Ris: langkornet basmati skylles godt og blir ofte bare delvis kokt før retten legges sammen.",
      "Krydret fyll: kjøtt eller grønnsaker tilberedes med løk, ingefær, hvitløk, yoghurt eller andre syrlige/fyldige elementer og hele eller malte krydder.",
      "Aroma: urter, stekt løk, safran, rosevann eller kewra kan brukes, avhengig av stil.",
      "Lagdeling: mange varianter legger ris og fyll i lag før sluttkokingen.",
      "Dum: skånsom damping under tett lokk samler aromaene og gjør at risen ferdigkokes uten å bli grøtete.",
    ],
    recipe: {
      label: "En enkel kyllingbiryani for hjemmekjøkken",
      yield: "4–5 porsjoner",
      time: "ca. 90 min",
      ingredients: [
        "350 g basmatiris",
        "600 g kyllinglår uten bein, i store biter",
        "150 g naturell yoghurt",
        "2 store løk, tynt skivet",
        "4 hvitløksfedd, finrevet eller hakket",
        "30 g ingefær, finrevet",
        "1 ts malt spisskummen",
        "1 ts malt koriander",
        "1 ts garam masala",
        "1/2 ts gurkemeie og chili etter smak",
        "1 kanelstang og 4 kardemommekapsler, valgfritt",
        "En stor håndfull koriander og/eller mynte",
        "2 ss nøytral olje eller ghee",
        "Salt",
        "En klype safran trukket i 3 ss varmt vann, valgfritt",
      ],
      steps: [
        "Skyll risen til vannet er nesten klart og la den gjerne trekke i kaldt vann i 20–30 minutter.",
        "Bland kylling med yoghurt, halvparten av ingefær og hvitløk, de malte krydderne og litt salt. La den stå mens resten forberedes.",
        "Stek løken langsomt i olje eller ghee til den er dypt gyllen. Ta ut omtrent halvparten til topping.",
        "Tilsett resten av ingefær, hvitløk og eventuelle hele krydder. Ha i kyllingen og stek til den har fått farge og sausen begynner å samle seg.",
        "Kok risen i godt saltet vann til den er omtrent 70 prosent ferdig: myk ytterst, men fortsatt fast i kjernen. Hell av vannet.",
        "Legg ris og kylling i lag i en gryte. Fordel urter, stekt løk og eventuelt safranvann mellom lagene.",
        "Legg på tett lokk og damp på svært lav varme i 20–25 minutter. La retten hvile 10 minutter før du løsner risen forsiktig med en gaffel eller sleiv.",
      ],
    },
    variants: [
      "Hyderabadi biryani: kjent for tydelig krydring og både råmarinert og forkokt kjøtt som utgangspunkt, avhengig av metode.",
      "Lucknowi/Awadhi biryani: ofte mer subtilt krydret og bygget rundt en kontrollert lag- og dum-teknikk.",
      "Kolkata biryani: forbindes ofte med en mildere profil og potet som karakteristisk innslag.",
      "Vegetarbiryani: bruker samme ris-, aroma- og lagdelingsteknikk med grønnsaker, paneer eller belgvekster.",
    ],
    tips: [
      "Ikke kok risen ferdig før lagdelingen. Da blir den lett for myk under dampingen.",
      "Stekt løk gir både sødme og dybde; ta deg tid til å få den ordentlig gyllen uten å brenne den.",
      "Bland retten forsiktig ved servering slik at lange riskorn og tydelige lag ikke knuses.",
    ],
  },
  {
    name: "Falafel",
    query: "falafel",
    region: "Midtøsten",
    summary: "Friterte boller av kikerter eller favabønner; råvaren og krydringen varierer mellom tradisjoner.",
    overview:
      "Falafel er små, kraftig krydrede boller eller flate kaker av bløtlagte belgvekster, urter og aromater. De friteres slik at utsiden blir mørk og sprø mens innsiden forblir luftig og saftig. Kikerter er vanlige i mange levantinske varianter, mens favabønner står sterkt i egyptiske tradisjoner.",
    history:
      "Den nøyaktige opprinnelsen er omdiskutert. Retten har sterke historiske forbindelser til Egypt og Levanten og har over tid blitt en sentral del av matkulturen i store deler av Midtøsten. Derfor varierer både belgvekst, krydder, form og servering mellom steder og familier.",
    essentials: [
      "Belgvekster: tørre kikerter eller favabønner bløtlegges, men kokes normalt ikke først i klassisk falafeldeig.",
      "Urter og aromater: persille, koriander, løk og hvitløk gir friskhet og dybde.",
      "Krydder: spisskummen og korianderfrø er vanlige, men blandingen varierer.",
      "Tekstur: massen skal være grov nok til å bli luftig, men fin nok til å holde formen.",
      "Høy varme: fritering gir den karakteristiske sprø skorpen og gjennomvarme, saftige innsiden.",
    ],
    recipe: {
      label: "Kikertfalafel",
      yield: "ca. 18–20 falafler",
      time: "30 min + bløtlegging",
      ingredients: [
        "250 g tørre kikerter",
        "1 liten gul løk, grovhakket",
        "3 hvitløksfedd",
        "1 stor håndfull bladpersille",
        "1 liten håndfull koriander, valgfritt",
        "1 ts malt spisskummen",
        "1 ts malt koriander",
        "1/2 ts bakepulver",
        "1–1,5 ts salt",
        "1 ss sesamfrø, valgfritt",
        "Nøytral olje til fritering",
      ],
      steps: [
        "Legg de tørre kikertene i rikelig kaldt vann i 12–18 timer. De skal svelle kraftig. Hell av og tørk dem godt.",
        "Kjør kikerter, løk, hvitløk og urter i kjøkkenmaskin i korte pulser. Massen skal ligne grove, fuktige smuler – ikke hummus.",
        "Bland inn krydder, bakepulver, salt og eventuelt sesamfrø. Sett massen kaldt i 20–30 minutter.",
        "Form små boller eller flate kaker. Hvis massen smuldrer, press den sammen litt fastere; unngå å gjøre den våt.",
        "Varm olje til omtrent 175–180 °C. Friter noen få falafler om gangen i 3–4 minutter til de er dypt gyldne og gjennomvarme.",
        "La dem renne av kort og server med én gang, gjerne med pita, tahinisaus, tomat, agurk, syltede grønnsaker og urter.",
      ],
    },
    variants: [
      "Ta'amiya: egyptisk variant som tradisjonelt forbindes sterkt med favabønner og ofte får en svært grønn urteprofil.",
      "Levantinsk kikertfalafel: ofte basert på kikerter med persille, koriander, spisskummen og andre lokale kryddervalg.",
      "Blandet belgvekst: noen oppskrifter kombinerer kikerter og favabønner for annen smak og tekstur.",
      "Ovnsbakt eller airfryer: praktiske hjemmevarianter, men de gir ikke helt samme skorpe og saftighet som fritering.",
    ],
    tips: [
      "Bruk tørre, bløtlagte kikerter – ferdigkokte kikerter gir vanligvis en mykere masse som lettere faller fra hverandre.",
      "Ikke kjør massen helt glatt. Litt grov struktur gir luftigere falafel.",
      "Hold oljetemperaturen stabil; for kald olje gir fet falafel, for varm olje kan svi utsiden før midten er ferdig.",
    ],
  },
];
