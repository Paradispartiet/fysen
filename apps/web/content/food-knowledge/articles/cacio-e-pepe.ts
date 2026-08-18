import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "cacio-e-pepe",
  summary: "Romersk pasta med pecorino romano og sort pepper, bundet til en kremet saus med stivelsesrikt pastavann.",
  overview: "Cacio e pepe er en av de tydeligste demonstrasjonene av pastateknikk: få ingredienser betyr at ost, temperatur og pastavann må arbeide perfekt sammen. Sausen er en emulsjon, ikke smeltet ost lagt oppå pastaen.",
  history: "Retten hører hjemme i Roma og Lazio og knyttes ofte til en enkel hyrde- og hverdagsmat basert på tørre, holdbare ingredienser. Moderne restaurantversjoner legger stor vekt på emulsjon og presis tekstur.",
  flavor: "Skarp og salt pecorino møter floral, varm pepper og sødmen i hvetepasta. Den skal være intens uten å bli tung.",
  technique: "Osten må møte væske som er varm nok til å smelte den, men ikke så varm at proteinene klumper. Finrevet ost og gradvis innrøring av pastavann gir kontroll.",
  essentials: ["Pasta med nok overflatestivelse, ofte tonnarelli eller spaghetti.","Finrevet pecorino romano.","Nykvernet sort pepper som ristes lett.","Stivelsesrikt pastavann som binder sausen."],
  recipe: { label: "Cacio e pepe", yield: "4 porsjoner", time: "ca. 25 min", ingredients: ["400 g spaghetti eller tonnarelli","150 g finrevet pecorino romano","2 ts grovknust sort pepper","salt","rikelig pastavann"], steps: ["Rist pepperen kort i en stor panne til den dufter.","Kok pasta i moderat saltet vann og spar flere desiliter pastavann.","Rør pecorino med litt avkjølt pastavann til en tykk, glatt krem.","Vend nesten ferdig pasta med pepper og litt pastavann i pannen og ta den av varmen.","Arbeid inn ostekremen gradvis og juster med pastavann til sausen er blank og omslutter pastaen."] },
  variants: ["Tonnarelli gir ekstra tyggemotstand og stivelse.","Spaghetti er en vanlig og tilgjengelig variant.","Noen kokker bruker pepper i flere grovheter for mer aroma."],
  serving: ["Server straks; sausen tykner raskt når den kjøles.","Ekstra pepper på toppen bør dufte, ikke overdøve osten."],
  commonMistakes: ["Å tilsette pecorino i en glovarm panne og få osteklumper.","For lite pastavann til å holde emulsjonen bevegelig.","For mye salt i kokevannet sammen med svært salt ost."],
  relatedDishIds: ["carbonara","amatriciana","pizza-margherita","pasta-alla-norma"],
  sources: [{ label: "Italia.it – Typical food and dishes in Lazio", href: "https://www.italia.it/en/lazio/things-to-do/typical-food-and-dishes-in-lazio-italy" }]
};
