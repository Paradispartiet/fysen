import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "gyoza",
  summary: "Japanske dumplings med tynt deigskall og saftig fyll, ofte stekt sprø under og dampet ferdig i samme panne.",
  overview: "Gyoza kjennes igjen på kontrasten mellom en brun og sprø underside og et mykt, dampet deigskall. Fyllet er ofte svinekjøtt og kål, men grønnsaks-, kylling- og sjømatvarianter er vanlige.",
  history: "Japansk gyoza er nært beslektet med kinesisk jiaozi. Retten fikk stor utbredelse i Japan på 1900-tallet og utviklet en egen, ofte tynnere og mer hvitløkspreget stil.",
  flavor: "Saftig, salt og aromatisk fyll møter mild deig og tydelig stekeskorpe. En enkel dip med soyasaus og eddik gir syre og balanse.",
  technique: "Den klassiske pannemetoden kombinerer steking og damping: først farge i olje, så litt vann under lokk, og til slutt tørrsteking for å gjenopprette sprøheten.",
  essentials: ["Tynne gyoza- eller dumplingark.","Finhakket kål og aromater som ingefær, hvitløk og vårløk.","Fyll av svin, kylling, sopp eller grønnsaker.","Soyasaus, sesamolje og riseddik for smak og dip."],
  recipe: { label: "Pannestekte gyoza", yield: "ca. 28 stk.", time: "ca. 55 min", ingredients: ["28 gyozaark","300 g svinekjøttdeig","200 g finsnittet hodekål","2 vårløk","1 ss revet ingefær","1 hvitløksfedd","1,5 ss soyasaus","1 ts sesamolje","nøytral olje","1 dl vann"], steps: ["Salt kålen lett, la den stå ti minutter og press ut overflødig væske.","Bland kål, kjøtt, vårløk, ingefær, hvitløk, soyasaus og sesamolje.","Legg en liten skje fyll på hvert ark, fukt kanten og brett tett.","Stek gyoza i olje til undersiden er gyllen, tilsett vann og legg på lokk.","Damp til fyllet er gjennomstekt, ta av lokket og la bunnen bli sprø igjen."] },
  variants: ["Yaki gyoza: pannestekt og dampet.","Sui gyoza: kokt i vann eller kraft.","Age gyoza: fritert og gjennomgående sprø."],
  serving: ["Serveres rett fra pannen med soyasaus og riseddik.","Chiliolje kan tilsettes dippen for mer varme."],
  commonMistakes: ["For mye fyll som gjør at dumplingen ikke kan forsegles.","Vått kålfyll som sprenger deigen under steking.","Å hoppe over siste tørrsteking og miste den sprø bunnen."],
  relatedDishIds: ["dumplings","ramen","sushi","bao"],
  sources: [{ label: "MAFF – Japanese Cuisine", href: "https://www.maff.go.jp/e/policies/market/japan-cuisine/index.html" }]
};
