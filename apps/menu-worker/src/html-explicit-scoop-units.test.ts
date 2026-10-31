import { describe, expect, it } from "vitest";
import { createMenuItemSourceKey, normalizeDishName, type MenuObservedItem } from "@fysen/menu-core";
import { reconcileExplicitScoopUnits as reconcile } from "./html-source-priced-qa.js";
function item(name: string, priceMinor = 5500): MenuObservedItem {
 return {name, normalizedName:normalizeDishName(name), sourceKey:createMenuItemSourceKey(name),description:"Vanilje", sectionName:"Dessert",priceMinor,currency:"NOK",position:0,extractionMethod:"json_ld",confidence:0.99,sourceExcerpt:name};
}
const card=(name: string, price: string)=>`<div class="box"><div class="info"><div class="name">${name}</div><div class="description">Vanilje</div><div class="allergens"><abbr>m</abbr></div></div><div class="price">${price}</div></div>`;
describe("explicit scoop-unit provenance",()=>{
 it("preserves each source-local per-scoop price in name, description and evidence",()=>{
  const out=reconcile([item("Iskrem"),item("Sorbet")],card("Iskrem","55 per kule")+card("Sorbet","55 per scoop"));
  expect(out.map(i=>[i.name,i.priceMinor])).toEqual([["Iskrem (per kule)",5500],["Sorbet (per scoop)",5500]]);
  for(const i of out){expect(i.description).toMatch(/per (kule|scoop)/);expect(i.sourceExcerpt).toMatch(/55 per (kule|scoop)/);expect(i.normalizedName).toBe(normalizeDishName(i.name));expect(i.sourceKey).toBe(createMenuItemSourceKey(i.name,i.sectionName));}
 });
 it("does not borrow the adjacent dessert's unit or infer units from food names",()=>{
  const out=reconcile([item("Iskrem"),item("Sorbet")],card("Iskrem","55")+card("Sorbet","55 per kule"));
  expect(out.map(i=>i.name)).toEqual(["Iskrem","Sorbet (per kule)"]);
 });
 it("quarantines a conflicting same-title unit or price instead of choosing one",()=>{
  for(const second of ["65 per kule","55 per scoop","55"]){
   expect(reconcile([item("Iskrem")],card("Iskrem","55 per kule")+card("Iskrem",second))).toEqual([]);
  }
  expect(reconcile([item("Iskrem",6500)],card("Iskrem","55 per kule"))).toEqual([]);
 });
 it("does not combine a detached unit with another card or recognize per-kilogram scalars",()=>{
  const html=`<section>${card("Iskrem","55")}<div class="price">55 per kule</div>${card("Sorbet","55 per kg")}</section>`;
  expect(reconcile([item("Iskrem"),item("Sorbet")],html).map(i=>i.name)).toEqual(["Iskrem","Sorbet"]);
 });
 it("rejects ambiguous cards with multiple titles instead of borrowing a unit",()=>{
  const html='<div class="box"><div class="name">Iskrem</div><div class="name">Sorbet</div><div class="price">55 per kule</div></div>';
  expect(reconcile([item("Iskrem"),item("Sorbet")],html)).toEqual([]);
 });
 it("quarantines a locally explicit scoop unit with an ambiguous scalar price",()=>{
  expect(reconcile([item("Iskrem")],card("Iskrem","55 / 65 per kule"))).toEqual([]);
 });
});

it("carries explicit scoop units through structured production extraction", async () => {
 const {extractMenuSource}=await import("./menu-source-runtime.js");
 const structured={"@context":"https://schema.org","@type":"Menu",hasMenuItem:["Iskrem","Sorbet"].map(name=>({"@type":"MenuItem",name,offers:{"@type":"Offer",price:55,priceCurrency:"NOK"}}))};
 const html='<script type="application/ld+json">'+JSON.stringify(structured)+'</script>'+card("Iskrem","55 per kule")+card("Sorbet","55 per kule");
 const result=await extractMenuSource("html",{body:html} as never);
 expect(result.items.map(i=>[i.name,i.priceMinor])).toEqual([["Iskrem (per kule)",5500],["Sorbet (per kule)",5500]]);
});

it("quarantines unit-bearing cards with multiple price fields",()=>{
 const html='<div><h3>Sorbet</h3><span class="price">55 per kule</span><span class="price">60</span></div>';
 expect(reconcile([item("Sorbet")],html)).toEqual([]);
});

it("does not use explicitly hidden scoop-price cards as provenance",()=>{
 for(const attrs of ['style="display:none"','style="visibility: hidden"','class="w-condition-invisible"']){
  expect(reconcile([item("Sorbet")],card("Sorbet","55")+`<div ${attrs}>${card("Sorbet","65 per kule")}</div>`).map(i=>i.name)).toEqual(["Sorbet"]);
 }
});
