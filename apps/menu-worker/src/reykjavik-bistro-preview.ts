import {parseNordicMenuPrice} from "./nordic-menu-price.js";
export type BistroRow={section:string;name:string;priceMinor:number;note?:string;publishEligible:boolean};
export type BistroMenu={service:string;heading:string;localServiceTime:{from:string;through:string};source:string;items:BistroRow[];excluded:{section:string;name:string;priceMinor:number;reason:string}[]};
const norm=(s:string)=>s.normalize("NFKC").replace(/[\u200b-\u200f\ufeff]/gu,"").replace(/\s+/gu," ").trim().toLowerCase();
export function bistroPrice(raw:string):number|null {
  // The English-language Wix menu uses an explicit ISK prefix and US thousands grouping.
  const match=/^ISK\s+(\d{1,7}|\d{1,3}(?:,\d{3})+)$/iu.exec(norm(raw));
  return match?parseNordicMenuPrice(match[1]!.replace(/,/gu,""),"ISK")?.priceMinor??null:null;
}
export function verifyBistroMenu(text:string,menu:BistroMenu){
  const lines=text.split(/\r?\n/u).map(norm).filter(Boolean);
  const time=norm(menu.service==="lunch"?"Served between 12:00 - 16:00":"Served daily from 16:00 - 21:30");
  const start=lines.findIndex((l,i)=>l===norm(menu.heading)&&lines[i+1]===time);
  const end=lines.findIndex((l,i)=>i>start&&l==="contact");
  if(start<0||end<0)throw new Error("Missing menu service boundaries: "+menu.service);
  const headings=[...new Set(menu.items.map(r=>r.section))];
  const scopes=new Map<string,string[]>();
  let section:string|undefined;
  for(const line of lines.slice(start+2,end)){
    const h=headings.find(s=>norm(s)===line);
    if(h){if(scopes.has(h))throw new Error("Repeated heading: "+h);scopes.set(h,[]);section=h;continue;}
    if(section)scopes.get(section)!.push(line);
  }
  const result=[];
  for(const h of headings){
    const scope=scopes.get(h);
    if(!scope)throw new Error("Missing section: "+h);
    const expected=menu.items.filter(r=>r.section===h);
    const excluded=menu.excluded.filter(r=>r.section===h);
    const all=[...expected,...excluded];
    if(h.toLowerCase().includes("childrens")&&!scope.some(l=>/12 years|12 years old/u.test(l)))throw new Error("Missing child age condition");
    const used=new Set<string>();
    let last=-1;
    for(let i=0;i<scope.length;i++){
      const price=bistroPrice(scope[i]!);
      if(price===null)continue;
      const title=scope.slice(last+1,i);
      const matches=all.filter(r=>title.includes(norm(r.name))&&r.priceMinor===price);
      if(matches.length!==1)throw new Error("Missing, changed or ambiguous dish price in "+h);
      const row=matches[0]!;
      if(used.has(row.name))throw new Error("Duplicate dish within section");
      used.add(row.name);
      if("publishEligible" in row){
        if(row.publishEligible!==false)throw new Error("Unexpected publication state");
        result.push({...row,currency:"ISK",service:menu.service});
      }
      last=i;
    }
    if(used.size!==all.length)throw new Error("Incomplete menu section: "+h);
  }
  return result;
}
