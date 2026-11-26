import {describe,it,expect} from "vitest";
import {verifyGamlaMenu} from "./reykjavik-gamla-preview.js";
describe("Gamla menu scope",()=>{
 it("preserves a price range and excludes a separately reviewed combo",()=>{
  const rows=[{section:"Small Courses",name:"Fries",priceMinor:199000,priceMaxMinor:269000,note:"Vanlig eller med topping",publishEligible:false}];
  const excluded=[{section:"Small Courses",name:"Combo",priceMinor:299000,priceMaxMinor:null,reason:"combo"}];
  const text=["The Menu","Small Courses","Fries 1.990 / 2.690 kr","Regular or loaded fries","Combo","2.990 kr","Catering","Feast 3.575 kr"].join("\n");
  expect(verifyGamlaMenu(text,rows,excluded)).toHaveLength(1);
  expect(()=>verifyGamlaMenu(text.replace("2.690","2.790"),rows,excluded)).toThrow();
  expect(()=>verifyGamlaMenu(text.replace("Regular or loaded fries","Fries"),rows,excluded)).toThrow();
 });
});
