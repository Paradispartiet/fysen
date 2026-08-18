import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "koshari",
  summary: "Egyptisk hverdags- og gatemat med ris, linser, pasta og kikerter toppet med tomatsaus, hvitløkseddik og sprøstekt løk.",
  overview: "Koshari er et lagmåltid der rimelige basisvarer får kontrast gjennom saus og topping. Ris, linser og pasta er milde og mettende, mens den krydrede tomatsausen, syrlig hvitløkseddik og mørk sprøløk gir karakter.",
  history: "Koshari regnes bredt som en av Egypts mest kjente nasjonale retter og er tett forbundet med rimelig gatemat og spesialiserte koshari-steder. Retten speiler også hvordan ris, linser og pasta er blitt kombinert i moderne egyptisk bymat.",
  flavor: "Mettende og jordlig base med frisk tomatsyre, hvitløk, chili og søtlig, nesten nøtteaktig sprøstekt løk.",
  technique: "Komponentene kokes separat slik at ris, linser og pasta beholder riktig tekstur. Løken må stekes langt nok til å bli ordentlig sprø, og sausen bør være konsentrert nok til å krydre hele bollen.",
  essentials: ["Ris, brune linser og små pastatyper.","Kikerter som ekstra tekstur og protein.","Krydret tomatsaus.","Hvitløkseddik og sprøstekt løk som avgjørende topping."],
  recipe: { label: "Koshari hjemme", yield: "6 porsjoner", time: "ca. 70 min", ingredients: ["250 g ris","200 g brune linser","200 g små pasta eller makaroni","1 boks kikerter","4 store løk i tynne skiver","1 boks hakkede tomater","4 hvitløksfedd","2 ss eddik","spisskummen og chili","nøytral olje"], steps: ["Kok linser til de er nesten møre og kok ris separat eller sammen etter ønsket metode.","Kok pasta al dente og varm kikertene.","Stek løken i porsjoner til den er dypt gyllen og sprø og la den renne på rist.","Kok tomat med hvitløk, spisskummen og chili til en konsentrert saus; bland litt hvitløk og eddik som syrlig dressing.","Bygg boller med ris, linser, pasta og kikerter, deretter tomatsaus, eddik og rikelig sprøløk."] },
  variants: ["Forholdet mellom ris, linser og pasta varierer fra sted til sted.","Chilisaus kan serveres separat for justerbar styrke.","Noen serveringer bruker vermicelli sammen med risen."],
  serving: ["Serveres varmt i lag slik at den sprø løken bevarer tekstur.","Ekstra eddik- og chilisaus står ofte på bordet."],
  commonMistakes: ["Å koke alle stivelsene sammen og få ujevn tekstur.","Løk som bare er myk og brun, ikke ordentlig sprø.","For mild tomatsaus som forsvinner i den store mengden ris og pasta."],
  relatedDishIds: ["taameya","ful-medames","falafel","hummus"],
  sources: [{ label: "Experience Egypt – Culture and Egyptian food favorites", href: "https://www.experienceegypt.eg/en/home/Culture" }]
};
