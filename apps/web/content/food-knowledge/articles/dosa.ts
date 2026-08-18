import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "dosa",
  summary: "Sørindisk, tynn og sprø pannekake av fermentert ris- og linsebatter, ofte servert med sambar og chutney.",
  overview: "Dosa får karakteren sin fra fermentering: ris og urad dal males til en glatt batter som utvikler syre, aroma og evne til å bli både sprø og lett. Den kan serveres naturell eller fylles, særlig med krydret potet i masala dosa.",
  history: "Dosa har lange tradisjoner i Sør-India og finnes i et stort antall regionale former. Moderne restaurantmenyer spenner fra papirtynne paper dosa til tykkere, mykere eller kornbaserte varianter.",
  flavor: "Mildt syrlig, nøtteaktig og ristet, med en tydelig sprø tekstur som balanseres av saftig sambar og kremete chutneys.",
  technique: "Fermenteringen må få nok tid, og stekepannen må være varm men ikke så het at batteret setter seg før det kan spres tynt. Fett tilsettes rundt kanten etter at dosaen er smurt utover.",
  essentials: ["Ris og urad dal som bløtlegges separat.","Fermentering som gir syre, luftighet og stekeegenskaper.","En flat, godt oppvarmet panne eller tawa.","Sambar, kokoschutney og eventuelt potetfyll som klassisk følge."],
  recipe: { label: "Masala dosa hjemme", yield: "8–10 dosa", time: "ca. 45 min + bløtlegging og fermentering", ingredients: ["300 g ris","100 g urad dal","1/2 ts bukkehornkløverfrø, valgfritt","salt","nøytral olje eller ghee","500 g kokte poteter","1 løk","1 ts sennepsfrø","gurkemeie og chili","karriblader, valgfritt"], steps: ["Bløtlegg ris og urad dal separat i minst fire timer og mal dem med vann til et glatt batter.","Bland og la batteret fermentere lunt til det er tydelig luftig og lett syrlig.","Stek løk, sennepsfrø og krydder og vend inn grovknuste poteter til et tørt fyll.","Hell batter på varm panne og spre det raskt i tynne sirkler før litt olje tilsettes rundt kanten.","Når dosaen er sprø og slipper pannen, legg på potetfyll, brett og server straks."] },
  variants: ["Plain dosa uten fyll.","Masala dosa med krydret potet.","Paper dosa – ekstra stor og svært tynn.","Neer dosa og andre regionale varianter bruker andre batter og teknikker."],
  serving: ["Serveres direkte fra pannen mens overflaten fortsatt er sprø.","Sambar og chutney gir både væske, syre og krydder til den tørre sprø dosaen."],
  commonMistakes: ["For kort fermentering som gir flat smak og svak tekstur.","For tykkt batter som ikke kan spres tynt.","Å stable ferdige dosa oppå hverandre slik at damp gjør dem myke."],
  relatedDishIds: ["idli","sambar","vada","biryani"],
  sources: [{ label: "Incredible India – Food and Cuisine, Mysore", href: "https://www.prod.incredibleindia.gov.in/content/incredible-india-v2/en/destinations/mysore/food-and-cuisine/rasam-papad.html" },{ label: "Incredible India – Food and Cuisine, Kanchipuram", href: "https://www.prod.incredibleindia.gov.in/content/incredible-india-v2/en/destinations/kanchipuram/food-and-cuisine.html" }]
};
