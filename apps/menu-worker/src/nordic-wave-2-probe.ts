import { readFileSync } from "node:fs";
import { HttpMenuClient } from "./http-client.js";
import { verifyWave2Text, type ReviewedRow } from "./nordic-wave-2-preview.js";
import type { NordicCurrency } from "./nordic-menu-price.js";
type Review = {status:string;restaurants:{restaurantSlug:string;city:string;currency:NordicCurrency;menus:{service:string;source:string;sourceDeclaredPriceCheckDate?:string;items:ReviewedRow[]}[]}[]};
const keys = {puk:"puk-vandkunsten-kobenhavn",kvarnen:"kvarnen-tjarhovsgatan-stockholm",taulu:"taulu-kaivokatu-helsinki"} as const;
async function main() {
  const key = process.argv[2] as keyof typeof keys;
  if (!Object.hasOwn(keys,key)) throw new Error("Expected puk, kvarnen or taulu");
  const data = JSON.parse(readFileSync(new URL("../../../docs/nordic-wave-2-menu-review.json",import.meta.url),"utf8")) as Review;
  if (data.status !== "manual-source-review-only-not-production") throw new Error("Unexpected research status");
  const restaurant = data.restaurants.find(r=>r.restaurantSlug===keys[key]);
  if (!restaurant) throw new Error("Missing reviewed identity");
  const client = new HttpMenuClient();
  const menus=[];
  for (const menu of restaurant.menus) {
    const response=await client.fetchSource({url:menu.source,userAgent:"FysenMenuBot/0.1",etag:null,lastModified:null});
    if (response.kind!=="content") throw new Error("Expected full source");
    const items=verifyWave2Text(response.body,menu.service,restaurant.currency,menu.items,key);
    menus.push({service:menu.service,sourceUrl:menu.source,observedAt:response.fetchedAt,rawSha256:response.rawSha256,sourceDeclaredPriceCheckDate:menu.sourceDeclaredPriceCheckDate,items});
  }
  console.log(JSON.stringify({status:"reviewed-rows-checked-not-completeness-proof",publication:"none",restaurantSlug:restaurant.restaurantSlug,city:restaurant.city,menus},null,2));
}
void main().catch((e:unknown)=>{console.error(e instanceof Error?e.message:String(e));process.exitCode=1;});
