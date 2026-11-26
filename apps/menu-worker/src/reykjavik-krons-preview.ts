import {parseNordicMenuPrice} from "./nordic-menu-price.js";
type Row={section:string;name:string;priceMinor:number;priceMaxMinor:null;note?:string;publishEligible:boolean};
const norm=(s:string)=>s.normalize("NFKC").replace(/[\u200b-\u200f\ufeff]/gu,"").replace(/\s+/gu," ").trim().toLowerCase();
const priceField=String.raw`\d{1,3}(?:\.\d{3})+`;
export function verifyKronsMenu(text:string,rows:readonly Row[]){
 const lines=text.split(/\r?\n/u).map(norm).filter(Boolean);
 const start=lines.findIndex(l=>l==="appetizers");
 const end=lines.findIndex((l,i)=>i>start&&["cocktail bar","drinks & happy hour"].includes(l));
 if(start<0||end<0||!lines.slice(0,start).some(l=>l.startsWith("all prices in isk")))throw new Error("Missing Kröns menu bounds or currency statement");
 const headings=[...new Set(rows.map(r=>r.section))];
 const sections=new Map<string,string[]>();
 let section:string|undefined;
 for(const line of lines.slice(start,end)){
  const h=headings.find(h=>norm(h)===line);
  if(h){if(sections.has(h))throw new Error("Repeated Kröns section");sections.set(h,[]);section=h;continue;}
  if(section)sections.get(section)!.push(line);
 }
 const result=[];
 for(const h of headings){
  const scope=sections.get(h);
  if(!scope)throw new Error("Missing Kröns section: "+h);
  const expected=rows.filter(r=>r.section===h);
  const used=new Set<string>();
  const priceAtEnd=new RegExp("^(.*?)\\s*("+priceField+")$","u");
  for(let i=0;i<scope.length;i++){
   const line=scope[i]!;
   const match=priceAtEnd.exec(line);
   if(!match)continue;
   const title=match[1]!.trim()||scope[i-1];
   const price=parseNordicMenuPrice(match[2]!,"ISK");
   const row=expected.find(r=>norm(r.name)===title);
   if(!row||row.publishEligible!==false||!price||price.priceMinor!==row.priceMinor||used.has(row.name)){
     throw new Error("Unknown or changed price in Kröns "+h+"; observed="+match[2]);
   }
   used.add(row.name);
   result.push({...row,currency:"ISK"});
  }
  if(used.size!==expected.length)throw new Error("Incomplete Kröns section: "+h+" ("+used.size+"/"+expected.length+")");
 }
 return result;
}
