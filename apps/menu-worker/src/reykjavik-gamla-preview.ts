import {parseNordicMenuPrice} from "./nordic-menu-price.js";
type Row={section:string;name:string;priceMinor:number;priceMaxMinor:number|null;note?:string;publishEligible?:boolean;reason?:string};
const norm=(s:string)=>s.normalize("NFKC").replace(/[\u200b-\u200f\ufeff]/gu,"").replace(/\s+/gu," ").trim().toLowerCase();
export function verifyGamlaMenu(text:string,rows:readonly Row[],excluded:readonly Row[]){
 const lines=text.split(/\r?\n/u).map(norm).filter(Boolean);
 const start=lines.findIndex(l=>l==="the menu");
 const end=lines.findIndex((l,i)=>i>start&&(/^(?:the bar|catering|04 the bar)$/u.test(l)));
 if(start<0||end<0)throw new Error("Missing Gamla food menu boundaries");
 const headings=[...new Set(rows.map(r=>r.section))];
 const scopes=new Map<string,string[]>();
 let section:string|undefined;
 for(const line of lines.slice(start+1,end)){
   const h=headings.find(h=>norm(h)===line);
   if(h){if(scopes.has(h))throw new Error("Repeated Gamla menu section");scopes.set(h,[]);section=h;continue;}
   if(section)scopes.get(section)!.push(line);
 }
 const result=[];
 for(const h of headings){
   const scope=scopes.get(h);
   if(!scope)throw new Error("Missing Gamla section: "+h);
   const expected=[...rows,...excluded].filter(r=>r.section===h);
   const used=new Set<string>();
   for(let i=0;i<scope.length;i++){
     // Only explicitly priced lines, accepting name + price or separate fields.
     const match=scope[i]!.match(/^(.*?)(\d{1,7}|\d{1,3}(?:\.\d{3})+)(?:\s*\/\s*(\d{1,7}|\d{1,3}(?:\.\d{3})+))?\s+kr\.?$/u);
     if(!match)continue;
     const title=match[1]!.trim()||scope[i-1];
     const price=parseNordicMenuPrice(match[2]!+(match[3]?"/"+match[3]:""),"ISK");
     const row=expected.find(r=>norm(r.name)===title);
     if(!row||!price||price.priceMinor!==row.priceMinor||price.priceMaxMinor!==row.priceMaxMinor||used.has(row.name))throw new Error("Unexpected or changed Gamla menu price in "+h);
     if(row.note&&!scope.slice(i+1,i+3).some(l=>l.includes("regular or loaded fries")))throw new Error("Missing fries variant condition");
     used.add(row.name);
     if(row.publishEligible===false)result.push({...row,currency:"ISK"});
   }
   if(used.size!==expected.length)throw new Error("Incomplete Gamla section: "+h);
 }
 return result;
}
