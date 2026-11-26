import { readFileSync } from "node:fs";
import { HttpMenuClient } from "./http-client.js";
import { extractHtmlVisibleText } from "./html-extractor.js";
import { parseNordicMenuPrice } from "./nordic-menu-price.js";
type Row={section:string;name:string;priceField:string;priceMinor:number;englishPriceMinor?:number;requiresPriceConfirmation?:boolean;publishEligible:boolean};
type Review={status:string;source:string;restaurant:{slug:string;city:string;currency:string};items:Row[]};
const norm=(s:string)=>s.normalize("NFKC").replace(/[\u200B-\u200F\uFEFF"„“”]/gu,"").replace(/\s+/gu," ").trim().toLowerCase();
export function verifyRokMenu(text:string, rows:readonly Row[]){
 const lines=text.split(/\r?\n/u).map(norm).filter(Boolean);
 const start=lines.findIndex(l=>l==="grænt");
 const end=lines.findIndex((l,i)=>i>start&&l==="kampavíns happy hour");
 if(start<0||end<0)throw new Error("Missing ordinary-menu boundaries");
 const body=lines.slice(start,end);
 const sections=new Map<string,string[]>();
 let current:string|undefined;
 for(const line of body){
   const heading=rows.find(r=>norm(r.section).replace(/\s/gu,"")===line.replace(/\s/gu,""));
   if(heading){current=heading.section;if(sections.has(current))throw new Error("Repeated menu heading");sections.set(current,[]);continue;}
   if(current)sections.get(current)!.push(line);
 }
 const result=[];
 for(const [section,scope] of sections){
   const expected=rows.filter(r=>r.section===section);
   const priceIndices=scope.map((line,i)=>({i,price:parseNordicMenuPrice(line,"ISK")})).filter(x=>x.price!==null);
   if(priceIndices.length!==expected.length)throw new Error("Unexpected price count in "+section);
   let previous=-1;
   for(let i=0;i<priceIndices.length;i++){
     const entry=priceIndices[i]!;
     const row=expected[i]!;
     const title=scope.slice(previous+1,entry.i).join(" ");
     if(row.publishEligible!==false||!title.startsWith(norm(row.name))||entry.price?.priceMinor!==row.priceMinor)
       throw new Error("Changed or missing reviewed dish: "+row.name);
     result.push({...row,currency:"ISK"});
     previous=entry.i;
   }
 }
 if(result.length!==rows.length)throw new Error("Missing menu sections");
 return result;
}
async function main(){
 const review=JSON.parse(readFileSync(new URL("../../../docs/reykjavik-rok-review.json",import.meta.url),"utf8")) as Review;
 if(review.status!=="manual-source-review-only-not-production"||review.source!=="https://www.rokrestaurant.is/dinner"||review.restaurant.currency!=="ISK"||review.items.length!==34)throw new Error("Invalid reviewed menu");
 const response=await new HttpMenuClient().fetchSource({url:review.source,userAgent:"FysenMenuBot/0.1",etag:null,lastModified:null});
 if(response.kind!=="content")throw new Error("Expected full source");
 const items=verifyRokMenu(extractHtmlVisibleText(response.body),review.items);
 console.log(JSON.stringify({status:"reviewed-ordinary-menu-not-published",publication:"none",restaurant:review.restaurant,sourceUrl:review.source,observedAt:response.fetchedAt,rawSha256:response.rawSha256,items},null,2));
}
void main().catch((e:unknown)=>{console.error(e instanceof Error?e.message:String(e));process.exitCode=1;});
