import {describe,it,expect} from "vitest";
import {verifyWave2Text} from "./nordic-wave-2-preview.js";
const html=(lines:string[])=>lines.map(l=>"<p>"+l+"</p>").join("");
const row=(name:string,priceField:string,section:string)=>({name,priceField,section,publishEligible:false});
describe("Nordic second-wave reviewed-row checks",()=>{
  it("separates PUK variants and does not use the group menu price",()=>{
    const page=html(["Fish & Shellfish","Butter-Fried Fillet of Plaice","120","Remoulade","Butter-Fried Fillet of Plaice","135","Shrimps","Traditional Danish Favourites Menu","Butter-Fried Fillet of Plaice","999"]);
    const rows=[row("Butter-Fried Fillet of Plaice","120","Fish & Shellfish"),row("Butter-Fried Fillet of Plaice","135","Fish & Shellfish")];
    expect(verifyWave2Text(page,"lunch","DKK",rows,"puk").map(r=>r.priceMinor)).toEqual([12000,13500]);
    expect(()=>verifyWave2Text(page,"lunch","DKK",[row("Butter-Fried Fillet of Plaice","999","Fish & Shellfish")],"puk")).toThrow();
  });
  it("keeps Swedish two-size pricing and rejects a changed price",()=>{
    const page=html(["Förrätt","Råbiff","Dijonsenap","215 / 295 kr","Höstmeny 3-rätters","Råbiff","999 kr"]);
    expect(verifyWave2Text(page,"a-la-carte","SEK",[row("Råbiff","215/295","Förrätt")],"kvarnen")[0]?.priceMaxMinor).toBe(29500);
    expect(()=>verifyWave2Text(page,"a-la-carte","SEK",[row("Råbiff","215/300","Förrätt")],"kvarnen")).toThrow();
  });
  it("excludes editorial price summaries and preserves explicitly labelled ice cream portions",()=>{
    const page=html(["Starters","Main courses","Vegan vegetable balls 19,90","Tomato-herb sauce and mashed potatoes","Desserts","Artisan ice cream 5,90/1 scoop, 9,90/2 scoops","Please tell our staff about any allergies and special diets","Editorial summary","Vegan vegetable balls","19,90 €","Prices checked 19.10.2026"]);
    const rows=[row("Vegan vegetable balls","19,90","Starters and mains"),row("Artisan ice cream","5,90/9,90","Desserts")];
    const result=verifyWave2Text(page,"a-la-carte","EUR",rows,"taulu");
    expect(result.map(r=>[r.priceMinor,r.priceMaxMinor])).toEqual([[1990,null],[590,990]]);
    expect(()=>verifyWave2Text(page.replace("Vegan vegetable balls 19,90","Vegan vegetable balls 20,90"),"a-la-carte","EUR",rows,"taulu")).toThrow();
  });
  it("preserves Taulu's explicitly checked date and distinct soup portions",()=>{
    const page=html(["Starters","Salmon soup 12,90","Main courses","Salmon soup 22,90","Prices checked 19.10.2026"]);
    const rows=[row("Salmon soup","12,90/22,90","Starters and mains")];
    expect(verifyWave2Text(page,"a-la-carte","EUR",rows,"taulu")[0]?.priceMaxMinor).toBe(2290);
    expect(()=>verifyWave2Text(page.replace("19.10.2026","20.10.2026"),"a-la-carte","EUR",rows,"taulu")).toThrow();
  });
});
