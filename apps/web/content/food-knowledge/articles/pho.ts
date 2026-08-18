import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "pho",
  summary: "Vietnamesisk nudelsuppe med klar, aromatisk kraft, risnudler, urter og ofte storfe eller kylling.",
  overview: "Phở er en kraftdrevet rett. Den klare suppen bygges med ristede aromater og varme krydder, mens risnudler og kjøtt tilberedes slik at bollen beholder både friskhet og renhet.",
  history: "Phở forbindes særlig med Nord-Vietnam og utviklet seg tidlig på 1900-tallet før ulike regionale stiler vokste fram. Nordlige varianter er ofte mer tilbakeholdne i garnityr, mens sørlige serveringer kan ha et større utvalg urter og tilbehør.",
  flavor: "Aromatisk, lett sødmefull og umamirik med duft av stjerneanis, kanel og ristet løk. Friske urter, lime og chili legges til etter smak.",
  technique: "En ren kraft krever skånsom trekking og avskumming. Krydder og aromater ristes før de trekkes, og nudlene holdes separat frem til servering.",
  essentials: ["Klar kraft av storfe eller kylling.","Ristet løk og ingefær.","Stjerneanis, kanel og andre varme krydder.","Flate risnudler, urter og frisk garnityr."],
  recipe: { label: "Forenklet phở gà", yield: "4 porsjoner", time: "ca. 75 min", ingredients: ["1,5 l god kyllingkraft","400 g kyllinglår","1 løk, delt","50 g ingefær","2 stjerneanis","1 liten kanelstang","2 ss fiskesaus","300 g flate risnudler","vårløk og koriander","lime og chili"], steps: ["Rist løk og ingefær i tørr panne til snittflatene får mørke flekker.","La kraft, kylling, løk, ingefær og krydder trekke rolig til kyllingen er mør.","Ta ut kyllingen, sil kraften og smak til med fiskesaus.","Tilbered risnudlene separat og fordel dem i varme boller med skivet kylling.","Hell over kokende varm kraft og server med urter, lime og chili."] },
  variants: ["Phở bò med storfe.","Phở gà med kylling.","Nordlig stil med renere garnityr og tilbakeholden sødme.","Sørlig stil med flere urter og spirer ved bordet."],
  serving: ["Urter og lime tilsettes i små mengder underveis.","Kraften må være svært varm når den helles over bollen."],
  commonMistakes: ["Å fosskoke kraften og gjøre den uklar.","Å la krydder dominere slik at suppen blir tung.","Å la ferdigkokte risnudler stå lenge og klebe sammen."],
  relatedDishIds: ["banh-mi","bun-cha","vietnamese-spring-rolls","ramen"],
  sources: []
};
