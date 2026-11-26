import {describe,it,expect} from "vitest";
import {verifyKronsMenu} from "./reykjavik-krons-preview.js";
describe("Kröns homepage dinner menu",()=>{
 it("preserves current prices, excludes set menus and rejects older menu items",()=>{
  const rows=[{section:"Appetizers",name:"Scallop",priceMinor:360000,priceMaxMinor:null,publishEligible:false},{section:"Mains",name:"Lamb",priceMinor:660000,priceMaxMinor:null,publishEligible:false}];
  const text=["Dinner menu","All prices in ISK.","Tasting menu 8.990","Appetizers","Scallop3.600","Mains","Lamb","6.600","Cocktail bar"].join("\n");
  expect(verifyKronsMenu(text,rows)).toHaveLength(2);
  expect(()=>verifyKronsMenu(text.replace("3.600","3.700"),rows)).toThrow();
  expect(()=>verifyKronsMenu(text.replace("Mains","Beef tartare 4.490\nMains"),rows)).toThrow();
  expect(()=>verifyKronsMenu(text.replace("All prices in ISK.","All prices in EUR."),rows)).toThrow();
 });
});
