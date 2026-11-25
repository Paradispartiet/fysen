import {describe,it,expect} from "vitest";
import {bistroPrice,verifyBistroMenu,type BistroMenu} from "./reykjavik-bistro-preview.js";
describe("Bistro ISK and service constraints",()=>{
  it("accepts English thousands notation only with explicit ISK",()=>{
    expect(bistroPrice("ISK 2,900")).toBe(290000);
    expect(bistroPrice("2,900")).toBeNull();
    expect(bistroPrice("ISK 29,00")).toBeNull();
    expect(bistroPrice("EUR 2,900")).toBeNull();
  });
  const menu:BistroMenu={service:"lunch",heading:"Lunch Offers",localServiceTime:{from:"12:00",through:"16:00"},source:"https://example.org",excluded:[],items:[{section:"MAIN COURSES",name:"Fish and Chips",priceMinor:290000,publishEligible:false},{section:"Childrens menu",name:"Fish and Chips",priceMinor:190000,note:"Barn til og med 12 år",publishEligible:false}]};
  const source=["Lunch Offers","Served between 12:00 - 16:00","MAIN COURSES","Fish and Chips","ISK 2,900","Childrens menu","Only served to 12 years old or younger","Fish and Chips","ISK 1,900","Contact"].join("\n");
  it("preserves age-limited variant and rejects service or price drift",()=>{
    expect(verifyBistroMenu(source,menu)).toHaveLength(2);
    expect(()=>verifyBistroMenu(source.replace("12 years","14 years"),menu)).toThrow();
    expect(()=>verifyBistroMenu(source.replace("2,900","3,900"),menu)).toThrow();
    expect(()=>verifyBistroMenu(source.replace("12:00","11:00"),menu)).toThrow();
  });
});
