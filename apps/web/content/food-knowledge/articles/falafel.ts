import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "falafel",
  summary: "Friterte boller eller flate kaker av bløtlagte belgvekster, urter og krydder, med sprø skorpe og luftig kjerne.",
  overview: "Falafel bygges vanligvis på ukokte, bløtlagte kikerter eller favabønner som males med urter og aromater. Når massen er riktig grov og tørr nok, ekspanderer den i frityren og gir en kjerne som er saftig og porøs i stedet for kompakt.",
  history: "Den nøyaktige opprinnelsen er omdiskutert, men falafel har sterke historiske forbindelser til Egypt og Levanten. Råvare, krydring, form og servering varierer mellom land, byer og familier.",
  flavor: "Nøtteaktige belgvekster, spisskummen, koriander, hvitløk og friske urter, med tydelig ristet smak fra friteringen.",
  technique: "Tørre belgvekster bløtlegges, men kokes normalt ikke før maling. Massen skal ligne grove, fuktige smuler og hvile før forming; for fin puré gir tett falafel.",
  essentials: ["Tørre kikerter eller favabønner som bløtlegges lenge.","Persille, koriander, løk og hvitløk.","Spisskummen og andre regionale krydder.","Høy nok frityrtemperatur til at skorpen setter seg raskt."],
  recipe: { label: "Kikertfalafel", yield: "18–20 stk.", time: "ca. 35 min + 12–18 t bløtlegging", ingredients: ["250 g tørre kikerter","1 liten løk","3 hvitløksfedd","1 stor håndfull persille","1 liten håndfull koriander","1 ts spisskummen","1 ts malt koriander","1/2 ts bakepulver","1–1,5 ts salt","nøytral olje til fritering"], steps: ["Bløtlegg kikertene i rikelig kaldt vann 12–18 timer og tørk dem godt.","Kjør kikerter, løk, hvitløk og urter i korte pulser til grove, fuktige smuler.","Bland inn krydder, bakepulver og salt og la massen hvile minst 20 minutter.","Form små boller eller flate kaker og test én i oljen før resten friteres.","Friter til mørkt gyllen og sprø utenpå og gjennomvarm inni, og la dem renne på rist."] },
  variants: ["Levantinsk kikertfalafel.","Egyptisk ta'ameya med favabønner og ofte svært grønn urteprofil.","Sesamdekket falafel.","Ovnsbakte varianter finnes, men får en annen tekstur enn fritert falafel."],
  serving: ["Serveres i pita eller som del av mezze med tahinisaus, salat og pickles.","Syrlig og frisk garnityr er viktig mot den friterte skorpen."],
  commonMistakes: ["Å bruke ferdigkokte kikerter og få en løs eller grøtete masse.","Å kjøre massen til hummuskonsistens.","For kald olje som gjør falafelen tung og fet."],
  relatedDishIds: ["hummus","shawarma","manakish","taameya"],
  sources: [{ label: "Visit Jordan – Food and Drinks", href: "https://edutravel.visitjordan.com/en/page/79/Food-and-Drinks" }]
};
