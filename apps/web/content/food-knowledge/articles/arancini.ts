import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "arancini",
  summary: "Sicilianske friterte risboller eller riskjegler med sprø panering og fyll som ragù, ost eller grønnsaker.",
  overview: "Arancini gjør kokt ris til håndholdt gatemat: risen avkjøles, formes rundt et konsentrert fyll, paneres og friteres. Innsiden skal være saftig og sammenhengende, mens skorpen må være tørr og sprø.",
  history: "Fylte og friterte risretter har lange tradisjoner på Sicilia, og formen og navnet varierer regionalt – blant annet arancini og arancine. I dag finnes de både som klassisk gatemat og i moderne restauranttolkninger.",
  flavor: "Mild og stivelsesrik ris balanserer et salt, ofte tomat- og kjøttbasert fyll, smeltet ost og ristet panering.",
  technique: "Risen må være klebrig nok til å holde form, men ikke våt. Fyllet må være konsentrert og kaldt, og bollene bør kjøles før panering og fritering.",
  essentials: ["Avkjølt ris, gjerne kokt med kraft og litt safran etter stil.","Et fast fyll som ragù, ost, erter eller sopp.","Mel eller røre og brødsmuler som tett panering.","Fritering ved stabil temperatur for tørr skorpe."],
  recipe: { label: "Arancini med mozzarella og tomatragù", yield: "10–12 stk.", time: "ca. 90 min + avkjøling", ingredients: ["350 g risottoris","9 dl kraft","1 liten klype safran, valgfritt","40 g parmesan","250 g tykk kjøtt- eller linseragù","150 g mozzarella i terninger","80 g hvetemel","2 egg","150 g brødsmuler","nøytral olje til fritering"], steps: ["Kok risen med kraft til den er mør og ganske tørr, rør inn parmesan og avkjøl helt på et brett.","Sørg for at ragùen er tykk og kald og at mozzarellaen er godt avrent.","Form ris rundt litt ragù og mozzarella og press til faste boller eller kjegler.","Vend i mel, egg og brødsmuler og kjøl aranciniene i minst 20 minutter.","Friter til jevnt gyllen skorpe og la dem renne kort av på rist før servering."] },
  variants: ["Al ragù med kjøttsaus, erter og ost.","Al burro med ost og ofte skinke eller béchamel-lignende fyll.","Vegetariske varianter med sopp, aubergine eller spinat."],
  serving: ["Serveres varme, men gjerne etter et par minutters hvile slik at fyllet setter seg.","Passer som snack, antipasto eller gatemat."],
  commonMistakes: ["For våt ris som kollapser under fritering.","Varmt eller tynt fyll som lekker ut.","For lav frityrtemperatur som gir oljeholdig panering."],
  relatedDishIds: ["pizza-margherita","pasta-alla-norma","caponata","carbonara"],
  sources: [{ label: "Italia.it – Italian cuisine", href: "https://www.italia.it/en/italy/things-to-do/italian-cuisine-unesco-heritage" }]
};
