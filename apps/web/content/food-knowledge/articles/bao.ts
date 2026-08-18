import type { FoodKnowledgeArticle } from "../types";

export const article: FoodKnowledgeArticle = {
  dishId: "bao",
  summary: "Myke, dampede hveteboller fra kinesiske tradisjoner, enten fylte og lukket eller åpne rundt kjøtt, tofu og grønnsaker.",
  overview: "Bao brukes internasjonalt som samlebetegnelse på flere dampede boller. Baozi er typisk lukket rundt et fyll, mens den åpne, brettede varianten mange restauranter kaller bao ofte minner om gua bao.",
  history: "Dampede hveteboller har lange tradisjoner i Kina og finnes i mange regionale former. Moderne restaurantmenyer utenfor Kina bruker ofte ordet bao bredere enn det ville blitt brukt lokalt.",
  flavor: "Deigen er mild, lett søtlig og luftig, og fungerer som myk kontrast til salte, krydrede eller syrlige fyll.",
  technique: "Deigen trenger god gjæring og skånsom damping. Kondens som drypper ned på bollene kan gi våte flekker, så lokket kan pakkes i et rent kjøkkenhåndkle.",
  essentials: ["Hvetedeig med gjær og ofte litt sukker.","Damping fremfor baking.","Fyll med tydelig salt, syre eller krydder.","Friske elementer som agurk, urter eller syltede grønnsaker."],
  recipe: { label: "Enkle brettede bao", yield: "10–12 stk.", time: "ca. 2 timer", ingredients: ["350 g hvetemel","7 g tørrgjær","2 ss sukker","2 dl lunkent vann","1 ss nøytral olje","1/2 ts salt","sesamolje til pensling","valgfritt fyll av tofu, svinekjøtt eller sopp","agurk og vårløk","hoisin eller chilisaus"], steps: ["Elt mel, gjær, sukker, vann, olje og salt til en glatt deig og hev til nesten dobbel størrelse.","Del deigen i emner, kjevle ovalt og pensle lett med olje før de brettes.","Etterhev 20–30 minutter på små biter bakepapir.","Damp bollene i porsjoner til de er oppblåste og gjennomkokte.","Fyll rett før servering slik at deigen forblir myk og lett."] },
  variants: ["Baozi: lukket bolle med fyll inni.","Gua bao-lignende åpne boller med fyll etter damping.","Søte bao med bønnepasta eller andre dessertfyll."],
  serving: ["Serveres varme direkte fra dampkurven.","Syltede grønnsaker og friske urter balanserer rike fyll."],
  commonMistakes: ["Å overfylle dampkurven slik at bollene kleber sammen.","For kort hevetid som gir kompakt deig.","Å åpne lokket gjentatte ganger under damping og miste jevn varme."],
  relatedDishIds: ["dumplings","gyoza","mapo-tofu","peking-duck"],
  sources: []
};
