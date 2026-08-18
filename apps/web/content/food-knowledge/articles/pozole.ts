import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "pozole",
  summary: "Meksikansk suppe eller gryte bygget rundt nixtamalisert mais – hominy – med kjøtt eller andre råvarer og et stort bord av friske toppinger.",
  overview: "Pozole handler like mye om maisen som om kraften. Store hominy-korn får en tydelig, nesten blomsteraktig maisaroma og fast tekstur, mens den varme gryten balanseres ved bordet med kål, reddik, løk, lime, chili og oregano.",
  history: "Pozole har dype røtter i førkolumbianske maistradisjoner og finnes i en rekke regionale former i Mexico. Rød, grønn og hvit pozole viser hvordan samme grunnidé endres med lokale chilier, urter og tilberedningsmåter.",
  flavor: "Dyp og varm kraft med tydelig maissmak, løftet av frisk syre og rå grønnsakstekstur ved servering.",
  technique: "Hominy må være helt mørt uten å gå i oppløsning, og kjøttet trekkes skånsomt slik at kraften forblir ren. Toppingene legges på ved bordet, ikke kokes inn i gryten.",
  essentials: ["Hominy eller pozolemais.","Kraft og ofte svinekjøtt eller kylling.","Chili- eller urtebase etter regional stil.","Rikelig frisk topping: kål, reddik, løk, lime og oregano."],
  recipe: { label: "Pozole rojo-inspirert gryte", yield: "6 porsjoner", time: "ca. 2,5 timer", ingredients: ["1,2 kg svinebog i store biter","2 store bokser hominy, skylt","4 guajillo-chili","2 ancho-chili","1 løk","4 hvitløksfedd","2 l vann eller kraft","oregano","kål og reddik","lime og tostadas til servering"], steps: ["Trekk svinekjøtt, halv løk og hvitløk rolig i kraft til kjøttet er mørt.","Rist og bløtlegg chiliene og kjør dem med litt kraft til en glatt saus.","Sil chilisausen inn i gryten og tilsett hominy.","La alt småkoke til maisen er mør og kraften godt samlet, og riv eller del kjøttet.","Server med skåler av finsnittet kål, reddik, løk, oregano, lime og sprø tostadas." ] },
  variants: ["Pozole blanco uten en dominerende chili- eller urtefarge.","Pozole rojo med røde tørkede chilier.","Pozole verde med grønne chilier, urter og regionale ingredienser."],
  serving: ["Hver gjest bygger sin egen balanse av varme, syre og crunch ved bordet.","Tostadas eller andre sprø maisprodukter gir ekstra tekstur."],
  commonMistakes: ["Å bruke vanlig mais i stedet for hominy og miste rettens kjerne.","Å koke toppingen i gryten slik at friskheten forsvinner.","For hard koking som gjør kjøttet tørt og kraften uklar."],
  relatedDishIds: ["tacos-al-pastor","birria","pozole-rojo","quesadilla"],
  sources: [{ label: "UNESCO – Traditional Mexican cuisine", href: "https://ich.unesco.org/en/lists?RL=00400" }]
};
