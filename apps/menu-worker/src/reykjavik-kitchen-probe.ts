import {readFileSync} from "node:fs";
import {HttpMenuClient} from "./http-client.js";
import {extractHtmlVisibleText} from "./html-extractor.js";
import {parseNordicMenuPrice} from "./nordic-menu-price.js";
type Row={section:string;name:string;localName:string;priceMinor:number;priceMaxMinor:number|null;note?:string;publishEligible:boolean};
type Review={status:string;source:string;restaurant:{slug:string;city:string;currency:string};items:Row[]};
const norm=(s:string)=>s.normalize("NFKC").replace(/\s+/gu," ").trim().toLowerCase();
export function verifyKitchenMenu(text:string,rows:readonly Row[]){
 const lines=text.split(/\r?\n/u).map(norm).filter(Boolean);
 const headings=[...new Set(rows.map(r=>r.section))];
 const start=lines.findIndex(l=>l===norm(headings[0]??""));
 if(start<0)throw new Error("Missing à la carte boundary");
 const scopes=new Map<string,string[]>();
 let current:string|undefined;
 for(const line of lines.slice(start)){
   if(["drinks","photos"].includes(line))break;
   const heading=headings.find(h=>norm(h)===line);
   if(heading){if(scopes.has(heading))throw new Error("Repeated section");current=heading;scopes.set(heading,[]);continue;}
   if(current)scopes.get(current)!.push(line);
 }
 const results=[];
 for(const section of headings){
   const scope=scopes.get(section);
   if(!scope)throw new Error("Missing menu section: "+section);
   const expected=rows.filter(r=>r.section===section);
   const priceLines=scope.map((line,index)=>({line,index})).filter(r=>/^kr\.\s*\d/u.test(r.line));
   if(priceLines.length!==expected.length)throw new Error("Unexpected price count: "+section);
   let last=-1;
   for(let i=0;i<expected.length;i++){
     const row=expected[i]!,p=priceLines[i]!;
     const title=scope.slice(last+1,p.index).join(" ");
     const values=[...p.line.matchAll(/(\d{1,3}(?:\.\d{3})*|\d{1,7}),-/gu)].map(m=>parseNordicMenuPrice(m[1]!,"ISK")?.priceMinor);
     if(row.publishEligible!==false||!title.startsWith(norm(row.name))||!title.includes(norm(row.localName))||
       values.length!==(row.priceMaxMinor===null?1:2)||values[0]!==row.priceMinor||(values[1]??null)!==row.priceMaxMinor||
       (row.priceMaxMinor!==null&&(!p.line.includes("250 ml")||!p.line.includes("400 ml"))))throw new Error("Changed or missing dish/portion: "+row.name);
     results.push({...row,currency:"ISK"});
     last=p.index;
   }
 }
 return results;
}
async function main(){
 const review=JSON.parse(readFileSync(new URL("../../../docs/reykjavik-kitchen-review.json",import.meta.url),"utf8")) as Review;
 if(review.status!=="manual-source-review-only-not-production"||review.source!=="https://www.reykjavikkitchen.is/"||review.restaurant.currency!=="ISK"||review.items.length!==19)throw new Error("Invalid review");
 const response=await new HttpMenuClient().fetchSource({url:review.source,userAgent:"FysenMenuBot/0.1",etag:null,lastModified:null});
 if(response.kind!=="content")throw new Error("Expected complete source");
 const items=verifyKitchenMenu(extractHtmlVisibleText(response.body),review.items);
 console.log(JSON.stringify({status:"reviewed-ordinary-menu-not-published",publication:"none",restaurant:review.restaurant,sourceUrl:review.source,observedAt:response.fetchedAt,rawSha256:response.rawSha256,items},null,2));
}
void main().catch((e:unknown)=>{console.error(e instanceof Error?e.message:String(e));process.exitCode=1;});
