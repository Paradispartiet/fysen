import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "biryani",
  summary: "Aromatisk sørasiatisk risrett der basmati, krydret fyll, urter og ofte kjøtt eller grønnsaker møtes gjennom lagdeling og damping.",
  overview: "Biryani er en stor rettfamilie med betydelige regionale forskjeller. Mange varianter bygger på delvis kokt basmatiris, et konsentrert krydret fyll og en avsluttende dum-prosess der gryten lukkes slik at ris og fyll trekker aroma av hverandre.",
  history: "Biryani har en sammensatt historie med både lokale sørasiatiske og persisk-inspirerte mattradisjoner. Hyderabad, Lucknow, Kolkata og flere andre steder har utviklet tydelige egne stiler, så én oppskrift kan ikke representere hele retten.",
  flavor: "Duftende og lagdelt snarere enn bare sterk: kardemomme, kanel, urter, stekt løk og safran kan ligge over en dypere krydderbase.",
  technique: "Risen skal være delvis kokt før lagdeling, ellers blir den lett grøtete. En tett gryte og lav varme lar dampen ferdigsteke risen uten aggressiv omrøring.",
  essentials: ["Langkornet basmatiris som skylles og ofte bløtlegges.","Krydret kjøtt-, fisk- eller grønnsaksfyll.","Stekt løk, urter og hele varme krydder.","Lagdeling og rolig dum-damping under tett lokk."],
  recipe: { label: "Kyllingbiryani for hjemmekjøkken", yield: "4–5 porsjoner", time: "ca. 90 min", ingredients: ["350 g basmatiris","600 g kyllinglår i biter","150 g yoghurt","2 store løk i tynne skiver","4 hvitløksfedd","30 g ingefær","1 ts spisskummen","1 ts koriander","1 ts garam masala","1 kanelstang og 4 kardemommekapsler","mynte og koriander","safranvann, valgfritt"], steps: ["Skyll risen godt og bløtlegg den 20–30 minutter.","Mariner kyllingen med yoghurt, ingefær, hvitløk, krydder og salt.","Stek løken dypt gyllen og ta av noe til topping før kyllingen tilberedes i resten.","Kok risen i saltet vann til den er omtrent 70 prosent ferdig og hell av.","Legg ris, kylling, urter og stekt løk i lag, tett gryten og damp på svært lav varme i 20–25 minutter før hvile."] },
  variants: ["Hyderabadi: kraftig aromatisk og ofte tett knyttet til dum-teknikk.","Lucknowi/Awadhi: gjerne mer tilbakeholden krydring og svært presis lagdeling.","Kolkata: ofte mildere og kjent for potet i mange versjoner.","Vegetarbiryani med grønnsaker, paneer eller belgvekster."],
  serving: ["Serveres ofte med raita, salat eller syrlig tilbehør.","Risen løsnes forsiktig ved servering slik at de lange kornene og lagene beholdes."],
  commonMistakes: ["Å koke risen helt ferdig før dum-steget.","For vått fyll som gjør bunnen grøtete.","Å røre hardt etter damping og knuse riskornene."],
  relatedDishIds: ["butter-chicken","chana-masala","dosa","naan"],
  sources: [{ label: "Incredible India – Food and Cuisine, Delhi", href: "https://www.prod.incredibleindia.gov.in/content/incredible-india-v2/en/destinations/delhi/food-and-cuisine.html" },{ label: "Incredible India – Hyderabad local foods", href: "https://www.incredibleindia.gov.in/en/telangana/hyderabad/the-best-local-foods-in-hyderabad" }]
};
