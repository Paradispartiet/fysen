import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "cochinita-pibil",
  summary: "Yucatán-rett med svinekjøtt marinert i achiote og sitrus, tradisjonelt langsomt tilberedt innpakket og svært mørt.",
  overview: "Cochinita pibil får sin karakteristiske rødfarge fra annatto i achiote og sin friskhet fra syrlig sitrus. Kjøttet tilberedes lenge og fuktig til det kan rives, mens syltet rødløk og sterk chili gir kontrast ved servering.",
  history: "Retten er tett knyttet til Yucatán og til pibil-teknikker der mat tilberedes innpakket i en jordovn. Moderne hjem- og restaurantversjoner bruker ofte vanlig ovn, men beholder achiote, sitrus og langsom tilberedning som kjerne.",
  flavor: "Jordlig og pepperaktig achiote, sitrus, hvitløk og varmt krydder rundt rikt svinekjøtt, balansert av svært syrlig rødløk.",
  technique: "Marinaden bør få tid til å trenge inn, og kjøttet tilberedes tett innpakket eller under lokk slik at det braiseres i egen væske. Høy temperatur mot slutten kan brukes kort for brunede kanter.",
  essentials: ["Svinebog eller nakke med nok fett og bindevev.","Achiotepasta eller annatto-basert recado rojo.","Syrlig sitrus og hvitløk.","Syltet rødløk og sterk chili som frisk topping."],
  recipe: { label: "Cochinita pibil i ovn", yield: "6 porsjoner", time: "ca. 4 timer + marinering", ingredients: ["1,5 kg svinebog","100 g achiotepasta","1,5 dl appelsinjuice","0,75 dl limejuice","4 hvitløksfedd","1 ts oregano","1/2 ts spisskummen","2 rødløk","1 dl eddik","maistortillaer","habanero etter smak"], steps: ["Bland achiote, sitrus, hvitløk og krydder og gni marinaden godt inn i svinekjøttet.","Mariner minst fire timer, gjerne over natten.","Legg kjøttet i tett gryte eller pakk det i bakepapir og folie og stek langsomt til det kan rives lett.","Skjær rødløk tynt og sylt den raskt i eddik, lime, salt og eventuelt litt habanero.","Riv kjøttet i stekesjyen og server i varme maistortillaer med syltet løk." ] },
  variants: ["Tradisjonell pibil-tilberedning i jordovn.","Hjemmevariant i tett gryte eller ovn.","Tacos, tortas og tallerkenserveringer med samme kjøttbase."],
  serving: ["Syltet rødløk er mer enn pynt – syren balanserer det rike kjøttet.","Maistortillaer og sterk salsa passer naturlig til."],
  commonMistakes: ["For magert kjøtt som tørker under lang tilberedning.","For lite syre i marinaden og tung, jordlig smak.","Å helle bort stekesjyen i stedet for å vende den tilbake i kjøttet."],
  relatedDishIds: ["tacos-al-pastor","birria","panuchos","sopa-de-lima"],
  sources: [{ label: "UNESCO – Traditional Mexican cuisine", href: "https://ich.unesco.org/en/lists?RL=00400" }]
};
