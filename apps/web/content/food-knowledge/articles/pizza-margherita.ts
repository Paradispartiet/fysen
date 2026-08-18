import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "pizza-margherita",
  summary: "Napolitansk pizza der fermentert deig, tomat, mozzarella, basilikum og olivenolje får svært høy varme og kort steketid.",
  overview: "Margherita ser enkel ut, men avslører kvaliteten på hvert element. Deigen skal være elastisk med luftig kant, midten tynn og myk, tomaten frisk og osten smeltet uten å gjøre bunnen vannmettet.",
  history: "Pizza har sterke historiske røtter i Napoli, mens historien om navnet Margherita og dronningbesøket er blitt fortalt i flere versjoner. Det sikre er at kombinasjonen tomat, mozzarella og basilikum er blitt et globalt symbol på napolitansk pizza.",
  flavor: "Syrlig tomat, melkeaktig mozzarella, frisk basilikum og ristet deig. Smaken skal være direkte og råvaredrevet.",
  technique: "Lang nok fermentering utvikler aroma og strekkbarhet. Deigen formes med hendene slik at gassen bevares i kanten, og pizzaen stekes så varmt og raskt som hjemmekjøkkenet tillater.",
  essentials: ["God hvetedeig med kontrollert fermentering.","Knuste tomater med ren smak og moderat væske.","Mozzarella som får renne av før bruk.","Basilikum, olivenolje og høy steketemperatur."],
  recipe: { label: "Margherita på hjemmestein eller stål", yield: "4 pizzaer", time: "ca. 45 min + 8–24 t fermentering", ingredients: ["600 g pizzamel eller sterkt hvetemel","390 g vann","15 g salt","2 g tørrgjær","1 boks gode hele tomater","400 g mozzarella","basilikum","extra virgin olivenolje"], steps: ["Bland mel, vann, gjær og salt til en smidig deig og la den fermentere kjølig eller ved romtemperatur etter tidsplan.","Del i fire emner og la dem tempereres til de er myke og luftige.","Forvarm pizzastål eller stein på ovnens høyeste temperatur i minst 45 minutter.","Form deigen med hendene, legg på et tynt lag tomat og moderat mengde mozzarella.","Stek så raskt som mulig til kanten er godt brunet og avslutt med basilikum og olivenolje."] },
  variants: ["Pizza marinara uten ost, med tomat, hvitløk, oregano og olje.","Napolitansk stil med myk midte og luftig cornicione.","Hjemmeovn-variant på stål med litt lavere hydrering for lettere håndtering."],
  serving: ["Serveres umiddelbart mens kanten fortsatt er sprø utenpå og myk inni.","For mye topping er unødvendig; Margherita lever av balansen mellom få råvarer."],
  commonMistakes: ["For våt mozzarella som gjør midten bløt.","Å bruke kjevle og presse all gass ut av kanten.","For kald stekeflate som tørker pizzaen før den får farge."],
  relatedDishIds: ["pizza-marinara","carbonara","arancini","pasta-alla-norma"],
  sources: [{ label: "Italia.it – The Traditional Pizza in Italy", href: "https://www.italia.it/en/campania/naples/things-to-do/pizza" },{ label: "Italia.it – Different types of pizza in Italy", href: "https://www.italia.it/en/italy/things-to-do/types-of-pizza-italy" }]
};
