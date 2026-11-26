import { readFileSync } from "node:fs";
import { load } from "cheerio";
import { HttpMenuClient } from "./http-client.js";
import { parseNordicMenuPrice } from "./nordic-menu-price.js";

type Row={name:string;priceField:string;priceMinor:number;currency:string;sourceUrl:string;publishEligible:boolean};
type Review={status:string;menuIndex:string;restaurant:{slug:string;city:string;currency:string};items:Row[]};
const norm=(s:string)=>s.normalize("NFKC").replace(/\s+/gu," ").trim();
export function streetFoodPrice(raw:string) {
  // The restaurant uses Ikr, not a general currency abbreviation.
  return parseNordicMenuPrice(norm(raw).replace(/\s+Ikr$/iu," ISK"),"ISK");
}
async function main(){
 const review=JSON.parse(readFileSync(new URL("../../../docs/reykjavik-101-street-food-review.json",import.meta.url),"utf8")) as Review;
 if(review.status!=="manual-source-review-only-not-production"||review.restaurant.currency!=="ISK"||review.items.length!==8)throw new Error("Invalid reviewed source");
 const client=new HttpMenuClient();
 const get=async(url:string)=>{
   if(new URL(url).hostname!=="101reykjavikstreetfood.is")throw new Error("Unexpected source host");
   const response=await client.fetchSource({url,userAgent:"FysenMenuBot/0.1",etag:null,lastModified:null});
   if(response.kind!=="content")throw new Error("Expected source content");
   return response;
 };
 const index=await get(review.menuIndex);
 const $=load(index.body);
 const links=new Set($("a[href]").toArray().map(el=>{try{return new URL($(el).attr("href")!,review.menuIndex).href;}catch{return "";}}));
 const items=[];
 for(const row of review.items){
   if(row.publishEligible!==false||row.currency!=="ISK"||!links.has(row.sourceUrl))throw new Error("Unverified menu card: "+row.name);
   const page=await get(row.sourceUrl);
   const p=load(page.body);
   // Exact visible price strings or image alt text; no arbitrary number extraction.
   const fields=[...p("span,p,h1,h2,h3,h4,strong,div").toArray().map(el=>norm(p(el).text())),...p("img[alt]").toArray().map(el=>norm(p(el).attr("alt")??""))];
   const amounts=new Set<number>();
   for(const field of fields){
     const match=field.match(/(?:^|\s)(\d{1,7}|\d{1,3}(?:\.\d{3})+)\s+Ikr$/iu);
     if(!match)continue;
     const price=streetFoodPrice(match[1]+" Ikr");
     if(price)amounts.add(price.priceMinor);
   }
   if(amounts.size!==1||!amounts.has(row.priceMinor))throw new Error("Missing, changed or ambiguous dish price: "+row.name);
   items.push({...row,rawSha256:page.rawSha256,observedAt:page.fetchedAt});
 }
 console.log(JSON.stringify({status:"reviewed-rows-checked-not-completeness-proof",publication:"none",restaurant:review.restaurant,menuIndex:review.menuIndex,indexSha256:index.rawSha256,indexObservedAt:index.fetchedAt,items},null,2));
}
void main().catch((e:unknown)=>{console.error(e instanceof Error?e.message:String(e));process.exitCode=1;});
