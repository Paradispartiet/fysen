import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "tandoori",
  summary: "Nordindisk tilberedning der marinert kjøtt eller andre råvarer stekes ved høy varme i en sylindrisk tandoor.",
  overview: "Tandoori beskriver først og fremst en teknikk. Råvaren marineres gjerne med yoghurt, syre og krydder før den får intens varme i en tandoor, som gir rask steking, røstede kanter og saftig innside.",
  history: "Tandoorovner har lange tradisjoner i Sør- og Sentral-Asia. Tandoori chicken er særlig tett forbundet med nordindisk og punjabisk restaurantmat og ble en svært synlig del av moderne indisk matkultur gjennom 1900-tallet.",
  flavor: "Syrlig yoghurt, aromatiske krydder, røyk og brente kanter gir en intens, men ikke nødvendigvis svært sterk smak. Sitron, løk og chutney gir frisk kontrast.",
  technique: "Marinaden må få tid til å virke, men overflaten bør ikke være våt når råvaren møter høy varme. Hjemme fungerer svært varm ovn, grill eller grillfunksjon best når råvaren ligger luftig og får farge raskt.",
  essentials: ["Yoghurt som bærer krydder og bidrar til mørhet.", "Ingefær, hvitløk og krydder som spisskummen, koriander og garam masala.", "Syre fra sitron eller lime.", "Høy, direkte varme som gir røstede kanter uten å tørke ut innsiden."],
  recipe: { label: "Tandoori-inspirert kylling hjemme", yield: "4 porsjoner", time: "45 min + marinering", ingredients: ["700 g kyllinglår uten bein", "150 g naturell yoghurt", "2 ss sitronsaft", "3 hvitløksfedd, revet", "20 g ingefær, revet", "1 ts spisskummen", "1 ts malt koriander", "1 ts garam masala", "1 ts paprika eller kashmiri chili", "salt", "1 ss nøytral olje"], steps: ["Bland yoghurt, sitron, ingefær, hvitløk, krydder og salt.", "Vend kyllingen i marinaden og la den stå minst 2 timer, gjerne over natten.", "Varm ovnen så høyt den går, helst med grillfunksjon eller en varm bakestein/stålplate.", "Legg kyllingen luftig på rist eller brett og stek til den har mørke kanter og er gjennomstekt.", "La kjøttet hvile kort og server med sitron, løk, koriander og chutney."] },
  variants: ["Tandoori chicken: klassisk restaurantvariant med kylling.", "Paneer tikka: paneer og grønnsaker stekt med lignende marinade og høy varme.", "Fish tikka: fastere fisk marinert kortere og stekt raskt.", "Tandoori grønnsaker: blomkål, sopp eller paprika egner seg godt til teknikken."],
  serving: ["Server gjerne med naan eller ris, rå løk, sitron og grønn chutney.", "Tandoori kan være hovedrett eller del av en større samling retter."],
  commonMistakes: ["For lav varme, som gjør at råvaren koker i marinaden i stedet for å røstes.", "For mye våt marinade på overflaten.", "Å bruke magert kjøtt og steke det for lenge."],
  relatedDishIds: ["butter-chicken", "naan", "chana-masala", "biryani"],
  sources: [{ label: "Incredible India – Food and Cuisine, Delhi", href: "https://www.prod.incredibleindia.gov.in/content/incredible-india-v2/en/destinations/delhi/food-and-cuisine.html" }, { label: "Incredible India – Patiala culinary heritage", href: "https://www.incredibleindia.gov.in/en/punjab/patiala/a-flavourful-journey-awaits-in-patiala" }]
};
