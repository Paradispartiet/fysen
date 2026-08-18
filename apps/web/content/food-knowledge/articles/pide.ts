import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "pide",
  summary: "Tyrkisk ovnsbakt flatbrød, ofte båtformet og toppet med kjøtt, ost, grønnsaker eller egg.",
  overview: "Pide kombinerer en myk, seig gjærdeig med topping som bakes samtidig. Den karakteristiske båten formes ved å brette kantene inn over fyllet, noe som holder saft og smeltet ost på plass uten å gjøre retten til en lukket pai.",
  history: "Pide finnes i mange regionale tyrkiske former og er en viktig del av bakeri- og restaurantmat. Navnet kan også brukes bredere om brød, men internasjonalt forbindes retten ofte med de toppede, avlange variantene.",
  flavor: "Ristet deig og brunede kanter møter salt ost, krydret kjøtt eller grønnsaker. Smør og egg brukes i enkelte varianter for mer fylde.",
  technique: "Deigen må være elastisk nok til å strekkes tynt i midten, mens kanten bevares tykkere. En svært varm stekeflate gir rask bunnfarge før toppingen tørker ut.",
  essentials: ["Gjærdeig med god strekkbarhet.","Avlang eller båtformet utforming.","Topping av ost, kjøtt, grønnsaker eller kombinasjoner.","Høy ovnstemperatur og varm stekeflate."],
  recipe: { label: "Pide med ost og urter", yield: "4 pide", time: "ca. 90 min", ingredients: ["500 g hvetemel","7 g tørrgjær","3 dl lunkent vann","1 ts sukker","1,5 ts salt","2 ss olivenolje","300 g revet mozzarella eller mild hvitost","150 g feta","persille","1 egg til pensling, valgfritt"], steps: ["Elt deigen til den er glatt og smidig og la den heve til nesten dobbel størrelse.","Del i fire emner og strekk hvert emne til en lang oval.","Fordel ost og urter i midten og la 2–3 cm kant stå fri.","Brett kantene inn og klem endene sammen slik at piden får båtform.","Bak på svært varm stein eller plate til bunnen er brun og osten bobler; pensle eventuelt kanten lett etter steking."] },
  variants: ["Kaşarlı pide med ost.","Kıymalı pide med krydret kjøttdeig.","Kuşbaşılı pide med små kjøttbiter.","Egg kan knekkes over enkelte varianter mot slutten av stekingen."],
  serving: ["Skjæres ofte i tverrgående biter og serveres varm.","Frisk salat, sitron eller ayran passer til rike kjøtt- og ostevarianter."],
  commonMistakes: ["For mye topping som gjør bunnen våt.","For lav steketemperatur som tørker deigen før den får farge.","Å forme kanten så tykk at den blir tung og brødaktig."],
  relatedDishIds: ["lahmacun","doner","manakish","manti"],
  sources: [{ label: "GoTürkiye – An Epicurean Journey into Anatolia", href: "https://gastronomy.goturkiye.com/an-epicurean-journey-into-anatolia" },{ label: "GoTürkiye – Aydın cuisine and local flavors", href: "https://goturkiye.com/aydin/taste" }]
};
