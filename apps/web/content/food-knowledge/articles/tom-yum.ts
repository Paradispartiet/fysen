import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "tom-yum",
  summary: "Thai suppe med sitrongress, galangal, kaffirlimeblader, chili og tydelig syre, ofte med reker eller sopp.",
  overview: "Tom yum er en aromatisk suppe der kraften bærer en intensiv duft av urter og sitrus. Den skal være skarp og frisk snarere enn tung, selv når en kremet variant får chilipasta eller melk.",
  history: "Tom yum er tett knyttet til sentralthailandsk mat og finnes i mange varianter. Tom yum goong med reker er den internasjonalt mest kjente.",
  flavor: "Syrlig, sterk, salt og sitrusduftende, med sødme fra råvarer snarere enn en tung sukkerprofil.",
  technique: "Aromatene knuses lett og trekkes i kraften, men spises normalt ikke. Limejuice tilsettes mot slutten slik at friskheten ikke kokes bort.",
  essentials: ["Sitrongress, galangal og kaffirlimeblad.","Chili og fiskesaus.","Limejuice som frisk syre.","Reker, sopp eller andre råvarer som tilberedes raskt."],
  recipe: { label: "Tom yum goong-inspirert suppe", yield: "4 porsjoner", time: "ca. 30 min", ingredients: ["1,2 l kylling- eller sjømatkraft","2 stilker sitrongress","30 g galangal eller ingefær","4 kaffirlimeblader","2–4 thai-chili","250 g sopp","300 g rå reker","2 ss fiskesaus","3 ss limejuice","koriander"], steps: ["Knus sitrongress og galangal lett og la dem trekke med limeblad og chili i kraften i 10 minutter.","Tilsett sopp og la den bli mør.","Ha i rekene og trekk bare til de er gjennomkokte.","Ta gryten av varmen og smak til med fiskesaus og limejuice.","Server straks med koriander; aromatene kan siles av eller ligge igjen som duftgivere."] },
  variants: ["Tom yum goong med reker.","Tom yum gai med kylling.","Nam khon: kremet stil med chilipasta.","Klar nam sai uten kremende elementer."],
  serving: ["Serveres rykende varm som suppe eller del av et større måltid.","Ris ved siden av demper hete og syre."],
  commonMistakes: ["Å koke limejuice lenge og miste frisk aroma.","Å bruke store mengder sukker for å runde av syren.","Å overkoke reker eller sopp."],
  relatedDishIds: ["pad-thai","green-curry","pad-kra-pao","pho"],
  sources: []
};
