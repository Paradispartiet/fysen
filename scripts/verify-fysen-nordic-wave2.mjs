import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {gunzipSync} from "node:zlib";
import {createHash} from "node:crypto";
import * as web from "../apps/web/lib/verified-menu-archive.ts";
import * as api from "../apps/api/src/verified-public-menu-archive.ts";
const [originalDir,candidateDir,reportsDir]=process.argv.slice(2);
const read=p=>JSON.parse(readFileSync(p,"utf8"));
function archive(dir){
 const meta=read(dir+"/manifest.json"), raw=readFileSync(dir+"/index.json.gz");
 assert.equal(raw.length,meta.bytes);assert.equal(createHash("sha256").update(raw).digest("hex"),meta.sha256);
 return {meta,index:JSON.parse(gunzipSync(raw))};
}
const old=archive(originalDir),next=archive(candidateDir);
assert.equal(next.meta.version,2);
for(const [key,field,add] of [["restaurants","restaurants",3],["sources","sources",4],["items","dishes",110]]){
 assert.equal(next.meta[field],old.meta[field]+add);
 assert.deepEqual(next.index[key].slice(0,old.index[key].length),old.index[key]);
}
for(const [key,value] of Object.entries(old.meta))if(!["restaurants","sources","dishes","bytes","sha256"].includes(key))assert.deepEqual(next.meta[key],value);
const w=web.reconcileMenuVersions(web.parsePublicMenuArchive(next.meta,next.index),[]).archive;
const a=api.parseVerifiedPublicArchive(next.meta,next.index);
let checked=0;
for(const key of ["puk","kvarnen","taulu"]){
 const report=read(reportsDir+"/"+key+".json");
 for(const menu of report.menus)for(const item of menu.items){
  const q=web.normalizeArchiveQuery(item.name);
  const match=r=>r.name===item.name&&r.priceMinor===item.priceMinor&&r.priceMaxMinor===item.priceMaxMinor&&r.currency===item.currency;
  const wm=web.searchPublicMenuArchive(w,q,report.city,Infinity).find(r=>r.restaurantSlug===report.restaurantSlug&&match(r)&&r.sourceUrl===menu.sourceUrl);
  const am=api.archivedPublicSearch(a,q,report.city,50,0).results.find(r=>r.restaurant.slug===report.restaurantSlug&&match(r)&&r.menu.sourceUrl===menu.sourceUrl);
  assert.ok(wm&&am,report.city+"/"+menu.service+"/"+item.name+"/"+item.priceMinor);
  assert.equal(wm.priceNote,am.priceNote);
  if(key==="puk")assert.ok(wm.priceNote.startsWith(menu.service==="lunch"?"Lunsjmeny":"Middagsmeny"));
  if(item.note)assert.ok(wm.priceNote);
  assert.ok(web.searchPublicMenuArchive(w,q,"Oslo",Infinity).every(r=>r.restaurantSlug!==report.restaurantSlug));
  checked++;
 }
}
assert.equal(checked,110);
console.log(JSON.stringify({status:"reviewed-subset-verified-not-published",preservedExistingDishes:old.meta.dishes,newOffers:checked,restaurants:next.meta.restaurants,dishes:next.meta.dishes},null,2));
