import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "shawarma",
  summary: "Krydret kjøtt fra vertikalt roterende spidd, skåret i tynne biter og servert med brød, saus, salat og pickles.",
  overview: "Shawarma handler både om marinering og stekeflate. På et vertikalt spidd brunes det ytterste laget kontinuerlig mens kjøttet innenfor holder seg saftig, og kokken skjærer av tynne flak etter hvert som de blir ferdige.",
  history: "Teknikken med vertikalt roterende kjøtt utviklet seg i det osmanske området og fikk ulike lokale uttrykk, blant annet shawarma, döner og senere gyro. Shawarma er særlig utbredt i levantinske og arabiske matkulturer.",
  flavor: "Varmt krydret, stekt og saftig, ofte balansert av hvitløkssaus, tahini, syrlige pickles og friske grønnsaker.",
  technique: "Hjemme får man best resultat ved å marinere tynt kjøtt, steke hardt i porsjoner og så samle det raskt i ovn eller panne uten å koke det i egen væske.",
  essentials: ["Kylling, lam eller storfe skåret eller stablet for høy stekeflate.","Marinade med varme krydder, syre og aromater.","Flatbrød eller pita.","Saus og syrlig garnityr som toum, tahini og pickles."],
  recipe: { label: "Kyllingshawarma i panne", yield: "4 porsjoner", time: "ca. 45 min + marinering", ingredients: ["700 g kyllinglår i tynne strimler","2 ss yoghurt","2 ss sitronsaft","2 ss olivenolje","3 hvitløksfedd","1 ts spisskummen","1 ts paprika","1/2 ts gurkemeie","1/2 ts kanel eller allehånde","pita, salat og pickles","toum eller tahinisaus"], steps: ["Bland kyllingen med yoghurt, sitron, olje, hvitløk og krydder og mariner minst én time.","Tørk lett av overflødig marinade slik at kjøttet kan brunes.","Stek i svært varm panne i små porsjoner til kjøttet har mørke kanter og er gjennomstekt.","La kjøttet hvile kort og skjær eventuelt enda tynnere før en siste rask tur i pannen.","Server i varmt brød med saus, salat og syrlige pickles."] },
  variants: ["Kyllingshawarma med hvitløksrik toum.","Lam- eller storfeshawarma med tahinisaus.","Tallerkenservering med ris, salat og brød ved siden av."],
  serving: ["Brød og kjøtt bør serveres varmt mens pickles og salat er friske og kalde.","Syre og hvitløkssaus er viktige mot det rike kjøttet."],
  commonMistakes: ["For mye kjøtt i pannen slik at det koker i stedet for å brunes.","For tykk saus og for lite syrlig garnityr.","Å bruke magert kjøtt og steke det for lenge."],
  relatedDishIds: ["falafel","hummus","manakish","doner"],
  sources: [{ label: "Visit Jordan – Food and Drinks", href: "https://edutravel.visitjordan.com/en/page/79/Food-and-Drinks" }]
};
