import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "fish-taco",
  summary: "Baja-inspirert taco med fisk, ofte sprøpanert eller grillet, i maistortilla med kål, kremet saus, salsa og lime.",
  overview: "Fish taco lever av kontrast: varm fisk, myk tortilla, sprø kål, syrlig lime og en saus som binder det sammen. I Baja-stiler er fritert fisk svært kjent, men grillede sjømatvarianter er også vanlige.",
  history: "Fisketaco forbindes særlig med Baja California og kystbyenes tilgang på fersk sjømat. Retten er senere blitt en av de mest internasjonalt synlige formene for nordvestmeksikansk gatemat.",
  flavor: "Frisk, salt og syrlig med ristet eller fritert fisk, kålcrunch, chili og kremet saus. Maisen i tortillaen skal fortsatt være tydelig.",
  technique: "Fisk trenger kort tilberedning. Ved fritering må røren være kald og oljen varm nok til en tynn sprø skorpe; ved grilling må fisken tørkes godt og stekes raskt.",
  essentials: ["Fast hvit fisk eller annen sjømat.","Små maistortillaer.","Finsnittet kål og frisk salsa.","Lime og en kremet, syrlig saus."],
  recipe: { label: "Baja-inspirerte fish tacos", yield: "12 tacos", time: "ca. 40 min", ingredients: ["700 g torsk, sei eller annen fast hvit fisk","150 g hvetemel","1 ts bakepulver","2 dl iskaldt kullsyrevann eller øl","salt og chili","nøytral olje til fritering","12 maistortillaer","300 g finsnittet kål","1 dl yoghurt eller majones","lime, koriander og salsa"], steps: ["Skjær fisken i avlange biter og tørk den godt.","Bland mel, bakepulver, krydder og iskald væske raskt til en lett røre.","Dypp fisken og friter i varm olje til skorpen er gyllen og fisken akkurat gjennomkokt.","Bland en enkel saus av yoghurt eller majones, lime og salt og varm tortillaene.","Bygg tacos med fisk, kål, saus, salsa, koriander og rikelig lime." ] },
  variants: ["Sprøfritert Baja-stil.","Grillet fisk med lettere salsa og kål.","Shrimp tacos bruker samme oppbygning med reker.","Tostada-servering med sjømat og lignende garnityr."],
  serving: ["Server fisken umiddelbart så skorpen ikke mykner.","Kål og lime bør være kalde og friske mot den varme fisken."],
  commonMistakes: ["Våt fisk som gjør frityrrøren løs og sprutende.","For lav oljetemperatur og fet skorpe.","For mye saus som skjuler fisk og gjør tortillaen bløt."],
  relatedDishIds: ["shrimp-taco","ceviche","tostada","tacos-al-pastor"],
  sources: [{ label: "UNESCO – Traditional Mexican cuisine", href: "https://ich.unesco.org/en/lists?RL=00400" }]
};
