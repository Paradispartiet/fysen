import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "carbonara",
  summary: "Romersk pastarett der egg, pecorino, guanciale og sort pepper emulgeres med pastavann til en blank saus.",
  overview: "Carbonara er teknisk mer enn den er ingredienstung. Den kremete følelsen kommer fra emulsjon mellom egg, ost, fett fra guanciale og stivelsesrikt pastavann – ikke fra en tung fløtesaus.",
  history: "Carbonara forbindes sterkt med Roma og Lazio, men den nøyaktige opprinnelseshistorien diskuteres. Retten slik den er kjent i dag ble særlig synlig i etterkrigstiden og har siden fått en tydelig romersk identitet.",
  flavor: "Salt, pepperaktig og dypt umamirik med sødme og nøttepreg fra stekt guanciale og skarphet fra pecorino romano.",
  technique: "Temperaturkontroll er alt: egg- og osteblandingen skal møte varm pasta uten direkte høy varme. Pastavann justerer både salt, temperatur og emulsjon.",
  essentials: ["Pasta, ofte spaghetti eller rigatoni.","Egg eller en blanding av egg og ekstra eggeplommer.","Pecorino romano og rikelig sort pepper.","Guanciale som stekes til fettet smelter ut og kantene blir sprø."],
  recipe: { label: "Romersk-inspirert carbonara", yield: "4 porsjoner", time: "ca. 30 min", ingredients: ["400 g spaghetti eller rigatoni","150 g guanciale","3 egg","2 eggeplommer","100 g finrevet pecorino romano","grovmalt sort pepper","salt til pastavann"], steps: ["Skjær guanciale i biter og stek rolig til fettet er smeltet ut og kjøttet er gyllent.","Visp egg, eggeplommer, pecorino og rikelig pepper til en tykk masse.","Kok pasta litt fastere enn al dente og spar mye pastavann.","Vend pastaen i guancialefettet, ta pannen av varmen og la temperaturen falle noen sekunder.","Rør inn eggemassen og små mengder pastavann energisk til sausen blir blank og kremet uten at egget koagulerer til eggerøre."] },
  variants: ["Spaghetti carbonara – den mest ikoniske formen.","Rigatoni gir større flater og hulrom for saus og guanciale.","Forholdet mellom hele egg og eggeplommer varierer mellom kokker."],
  serving: ["Serveres umiddelbart med mer pecorino og pepper.","Sausen skal være blank og flytende nok til å omslutte pastaen, ikke stå som en tykk klump."],
  commonMistakes: ["Å tilsette egg over direkte høy varme.","Å bruke for lite pastavann til å skape emulsjon.","Å oversalte pastavannet når både pecorino og guanciale allerede er svært salte."],
  relatedDishIds: ["cacio-e-pepe","amatriciana","pizza-margherita","arancini"],
  sources: [{ label: "Italia.it – Italian pasta types and recipes", href: "https://www.italia.it/en/italy/things-to-do/pasta-types-italian-formats-and-recipes" },{ label: "Italia.it – Typical food and dishes in Lazio", href: "https://www.italia.it/en/lazio/things-to-do/typical-food-and-dishes-in-lazio-italy" }]
};
