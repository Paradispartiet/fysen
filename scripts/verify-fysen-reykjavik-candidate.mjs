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
for(const [key,field,n] of [["restaurants","restaurants",3],["sources","sources",3],["items","dishes",77]]){
 assert.equal(next.meta[field],old.meta[field]+n);
 assert.deepEqual(next.index[key].slice(0,old.index[key].length),old.index[key]);
}
for(const [key,value] of Object.entries(old.meta))if(!["restaurants","sources","dishes","bytes","sha256"].includes(key))assert.deepEqual(next.meta[key],value);
const w=web.reconcileMenuVersions(web.parsePublicMenuArchive(next.meta,next.index),[]).archive;
const a=api.parseVerifiedPublicArchive(next.meta,next.index);
let checked=0,withheld=0;
for(const key of ["rok","gamla","krons"]){
 const p=read(reportsDir+"/"+key+".json");
 for(const item of p.items){
  const q=web.normalizeArchiveQuery(item.name);
  const wm=web.searchPublicMenuArchive(w,q,"Reykjavík",Infinity).find(r=>r.restaurantSlug===p.restaurant.slug&&r.name===item.name);
  const am=api.archivedPublicSearch(a,q,"Reykjavik",50,0).results.find(r=>r.restaurant.slug===p.restaurant.slug&&r.name===item.name);
  if(item.requiresPriceConfirmation){assert.ok(!wm&&!am,item.name);withheld++;continue;}
  for(const match of [wm,am]){
   assert.ok(match,item.name);assert.equal(match.priceMinor,item.priceMinor);
   assert.equal(match.priceMaxMinor,item.priceMaxMinor??null);assert.equal(match.currency,"ISK");
   assert.equal(match.priceNote??"",item.note??"");
  }
  assert.equal(wm.sourceUrl,p.sourceUrl);assert.equal(am.menu.sourceUrl,p.sourceUrl);
  assert.ok(web.searchPublicMenuArchive(w,q,"Oslo",Infinity).every(r=>r.restaurantSlug!==p.restaurant.slug));
  checked++;
 }
}
assert.equal(checked,77);assert.equal(withheld,4);
console.log(JSON.stringify({status:"candidate-not-published",checked,withheld,restaurants:next.meta.restaurants,dishes:next.meta.dishes,preservedExistingDishes:old.meta.dishes},null,2));
