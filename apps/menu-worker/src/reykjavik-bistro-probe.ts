import {readFileSync} from "node:fs";
import {HttpMenuClient} from "./http-client.js";
import {extractHtmlVisibleText} from "./html-extractor.js";
import {verifyBistroMenu,type BistroMenu} from "./reykjavik-bistro-preview.js";
type Review={status:string;restaurant:{city:string;slug:string;currency:string};menus:BistroMenu[]};
async function main(){
  const review=JSON.parse(readFileSync(new URL("../../../docs/reykjavik-bistro-review.json",import.meta.url),"utf8")) as Review;
  if(review.status!=="manual-source-review-only-not-production"||review.restaurant.currency!=="ISK"||review.menus.length!==2)throw new Error("Invalid reviewed source");
  const client=new HttpMenuClient();
  const menus=[];
  for(const m of review.menus){
    if(new URL(m.source).hostname!=="www.reykjavikbistro.com")throw new Error("Unexpected source host");
    const response=await client.fetchSource({url:m.source,userAgent:"FysenMenuBot/0.1",etag:null,lastModified:null});
    if(response.kind!=="content")throw new Error("Expected complete source");
    const items=verifyBistroMenu(extractHtmlVisibleText(response.body),m);
    menus.push({service:m.service,localServiceTime:m.localServiceTime,sourceUrl:m.source,observedAt:response.fetchedAt,rawSha256:response.rawSha256,items});
  }
  console.log(JSON.stringify({status:"reviewed-service-menus-not-published",publication:"none",restaurant:review.restaurant,menus},null,2));
}
void main().catch((e:unknown)=>{console.error(e instanceof Error?e.message:String(e));process.exitCode=1;});
